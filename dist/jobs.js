/**
 * Cognitive Jobs related methods
 * This file it is a part of the Pandora Pyrrha Javascript library
 * 
 * @file jobs.js
 * @author Kostiantyn Smyrnov <kostysh@gmail.com>
 * @date 2018
 */
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.eventJobStateChanged = exports.eventCognitiveJobCreated = exports.fetchAll = exports.create = exports.fetchJobsIds = exports.fetchJobDetails = exports.fetchServiceInfo = exports.fetchCompletedJobsCount = exports.fetchActiveJobsCount = exports.fetchJobControllerAddress = void 0;

var expect = _interopRequireWildcard(require("./helpers/expect"));

var _errors = _interopRequireWildcard(require("./helpers/errors"));

var _kernels = require("./kernels");

var _datasets = require("./datasets");

var _workers = require("./workers");

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

const localCache = new Map();
/**
 * Get job controller address
 * 
 * @param {Object} config Library config (provided by the proxy but can be overridden)
 * @returns {Promise<{String}>} 
 */

const fetchJobControllerAddress = async (config = {}) => {
  expect.all(config, {
    'web3': {
      type: 'object',
      code: _errors.WEB3_REQUIRED
    },
    'addresses.Pandora': {
      type: 'address',
      code: _errors.ADDRESS_REQUIRED,
      args: ['Pandora']
    },
    'contracts.Pandora.abi': {
      type: 'object',
      code: _errors.CONTRACT_REQUIRED,
      args: ['Pandora']
    }
  });
  const pan = new config.web3.eth.Contract(config.contracts.Pandora.abi, config.addresses.Pandora);
  const jobController = await pan.methods.jobController().call(); // save for later use

  localCache.set('jobController', jobController);
  return jobController;
};
/**
 * Get active jobs count 
 * 
 * @param {Object} config Library config (provided by the proxy but can be overridden)
 * @returns {Promise<{Number}>} 
 */


exports.fetchJobControllerAddress = fetchJobControllerAddress;

const fetchActiveJobsCount = async (config = {}) => {
  expect.all(config, {
    'web3': {
      type: 'object',
      code: _errors.WEB3_REQUIRED
    },
    'contracts.CognitiveJobController.abi': {
      type: 'object',
      code: _errors.CONTRACT_REQUIRED,
      args: ['CognitiveJobController']
    }
  });
  let jobController = localCache.get('jobController');

  if (!jobController) {
    jobController = await fetchJobControllerAddress(config);
  }

  const jctrl = new config.web3.eth.Contract(config.contracts.CognitiveJobController.abi, jobController);
  const count = await jctrl.methods.activeJobsCount().call();
  return Number.parseInt(count, 10);
};
/**
 * Get completed jobs count 
 * 
 * @param {Object} config Library config (provided by the proxy but can be overridden)
 * @returns {Promise<{Number}>} 
 */


exports.fetchActiveJobsCount = fetchActiveJobsCount;

const fetchCompletedJobsCount = async (config = {}) => {
  expect.all(config, {
    'web3': {
      type: 'object',
      code: _errors.WEB3_REQUIRED
    },
    'contracts.CognitiveJobController.abi': {
      type: 'object',
      code: _errors.CONTRACT_REQUIRED,
      args: ['CognitiveJobController']
    }
  });
  let jobController = localCache.get('jobController');

  if (!jobController) {
    jobController = await fetchJobControllerAddress(config);
  }

  const jctrl = new config.web3.eth.Contract(config.contracts.CognitiveJobController.abi, jobController);
  const count = await jctrl.methods.completedJobsCount().call();
  return Number.parseInt(count, 10);
};
/**
 * Get job service info 
 * 
 * @param {String} address Job address
 * @param {Object} config Library config (provided by the proxy but can be overridden)
 * @returns {Promise<{Number}>} 
 */


exports.fetchCompletedJobsCount = fetchCompletedJobsCount;

const fetchServiceInfo = async (address, config = {}) => {
  expect.all(config, {
    'web3': {
      type: 'object',
      code: _errors.WEB3_REQUIRED
    },
    'contracts.CognitiveJobController.abi': {
      type: 'object',
      code: _errors.CONTRACT_REQUIRED,
      args: ['CognitiveJobController']
    }
  });
  let jobController = localCache.get('jobController');

  if (!jobController) {
    jobController = await fetchJobControllerAddress(config);
  }

  const jctrl = new config.web3.eth.Contract(config.contracts.CognitiveJobController.abi, jobController);
  const {
    responseTimestamps,
    responseFlags
  } = await jctrl.methods.getCognitiveJobServiceInfo(address).call();
  return {
    responseTimestamps,
    responseFlags
  };
};
/**
 * Get job details 
 * 
 * @param {String} address Job address
 * @param {Object} config Library config (provided by the proxy but can be overridden)
 * @returns {Promise<{Number}>} 
 */


exports.fetchServiceInfo = fetchServiceInfo;

const fetchJobDetails = async (address, config = {}) => {
  expect.all(config, {
    'web3': {
      type: 'object',
      code: _errors.WEB3_REQUIRED
    },
    'contracts.CognitiveJobController.abi': {
      type: 'object',
      code: _errors.CONTRACT_REQUIRED,
      args: ['CognitiveJobController']
    }
  });
  let jobController = localCache.get('jobController');

  if (!jobController) {
    jobController = await fetchJobControllerAddress(config);
  }

  const jctrl = new config.web3.eth.Contract(config.contracts.CognitiveJobController.abi, jobController);
  const {
    kernel,
    dataset,
    complexity,
    description,
    activeWorkers,
    state
  } = await jctrl.methods.getCognitiveJobDetails(address).call();
  const kernelIpfs = await (0, _kernels.fetchIpfsAddress)(kernel, config);
  const datasetIpfs = await (0, _datasets.fetchIpfsAddress)(dataset, config);
  const ipfsResults = await Promise.all(activeWorkers.map((_, index) => jctrl.methods.getCognitiveJobResults(address, index).call()));
  const utf8description = description ? config.web3.utils.hexToUtf8(description) : '';
  const serviceInfo = await fetchServiceInfo(address, config);
  const progress = Math.ceil(ipfsResults.reduce(async (progressPromise, result, index) => {
    const commonProgress = await progressPromise;
    let partProgress = 100 / ipfsResults.length;

    if (!result) {
      // If result not been provided by the worker 
      // then we fetching progress value from its contract
      partProgress = await (0, _workers.fetchJobProgress)(activeWorkers[index], config);
    }

    return commonProgress + partProgress;
  }, Promise.resolve(0)));
  return {
    address,
    kernel,
    kernelIpfs,
    dataset,
    datasetIpfs,
    activeWorkers,
    ipfsResults: ipfsResults.map(result => result ? config.web3.utils.hexToUtf8(result) : result).filter(res => res),
    complexity: Number(complexity),
    progress: progress > 100 ? 100 : progress,
    state: Number(state),
    description: utf8description.substr(2),
    jobType: utf8description.substr(0, 1),
    serviceInfo
  };
};
/**
 * Get jobs Id from the "source"
 * 
 * @param {String} from source activeJobs or completedJobs
 * @param {Number} count
 * @param {Object} options
 * @returns {Promise<[{String}]>} 
 */


exports.fetchJobDetails = fetchJobDetails;

const fetchJobsIds = async (source, count = 0, config = {}) => {
  expect.all({
    source
  }, {
    'source': {
      type: 'enum',
      values: ['activeJobs', 'completedJobs']
    }
  });
  expect.all(config, {
    'web3': {
      type: 'object',
      code: _errors.WEB3_REQUIRED
    },
    'contracts.CognitiveJobController.abi': {
      type: 'object',
      code: _errors.CONTRACT_REQUIRED,
      args: ['CognitiveJobController']
    }
  });
  let jobController = localCache.get('jobController');

  if (!jobController) {
    jobController = await fetchJobControllerAddress(config);
  } // numbers sequence from 0 to count


  const counts = [...Array(count).keys()];
  const jctrl = new config.web3.eth.Contract(config.contracts.CognitiveJobController.abi, jobController);
  const addresses = await Promise.all(counts.map(index => jctrl.methods.getJobId(index, source === 'activeJobs').call()));
  return addresses;
};
/**
 * Create cognitive job contract
 * 
 * @param {Object} options
 * @param {String} from Publisher address
 * @param {Object} config Library config (provided by the proxy but can be overridden)
 * @returns {Promise} Promise object resolved to add status (boolean)
 */


exports.fetchJobsIds = fetchJobsIds;

const create = ({
  kernel,
  dataset,
  complexity,
  jobType,
  description,
  deposit
}, from, config = {}) => new Promise(async (resolve, reject) => {
  expect.all({
    kernel,
    dataset,
    complexity,
    jobType,
    description,
    deposit,
    from
  }, {
    'kernel': {
      type: 'address'
    },
    'dataset': {
      type: 'address'
    },
    'complexity': {
      type: 'number'
    },
    'jobType': {
      type: 'string'
    },
    'description': {
      type: 'string'
    },
    'deposit': {
      type: 'number'
    },
    'from': {
      type: 'address'
    }
  });
  expect.all(config, {
    'web3': {
      type: 'object',
      code: _errors.WEB3_REQUIRED
    },
    'contracts.Pandora.abi': {
      type: 'object',
      code: _errors.CONTRACT_REQUIRED,
      args: ['Pandora']
    },
    'addresses.Pandora': {
      type: 'address',
      code: _errors.ADDRESS_REQUIRED,
      args: ['Pandora']
    }
  });
  const pan = new config.web3.eth.Contract(config.contracts.Pandora.abi, config.addresses.Pandora);
  const gasPrice = await config.web3.eth.getGasPrice();
  pan.methods.createCognitiveJob(kernel, dataset, complexity, config.web3.utils.utf8ToHex(`${jobType};${description.trim()}`)).send({
    value: config.web3.utils.toWei(String(deposit)),
    from,
    gasPrice,
    gas: 6700000 // because this workflow is too greedy

  }).on('error', reject).on('receipt', receipt => {
    try {
      if (Number(receipt.status) === 0) {
        return reject((0, _errors.default)(_errors.TRANSACTION_UNSUCCESSFUL));
      }

      if (receipt.events.CognitiveJobQueued) {
        return resolve(receipt.events.CognitiveJobQueued.returnValues.jobId);
      }

      resolve(receipt.events.CognitiveJobCreated.returnValues.jobId);
    } catch (err) {
      reject(err);
    }
  });
});
/**
 * Get all jobs
 * 
 * @param {Object} config Library config (provided by the proxy but can be overridden)
 * @returns {Promise} A Promise object represents the {Object[]} 
 */


exports.create = create;

const fetchAll = async (config = {}) => {
  let records = [];
  let error = [];

  try {
    const [activeCount, completedCount] = await Promise.all([fetchActiveJobsCount(config), fetchCompletedJobsCount(config)]);
    const [activeJobsIds, completedJobsIds] = await Promise.all([fetchJobsIds('activeJobs', activeCount, config), fetchJobsIds('completedJobs', completedCount, config)]);
    const allJobsIds = [...activeJobsIds, ...completedJobsIds];
    records = await Promise.all(allJobsIds.map(jobId => fetchJobDetails(jobId, config)));
  } catch (err) {
    error.push({
      error: err.message
    });
  }

  return {
    records,
    error
  };
};
/**
 * Handle event CognitiveJobCreated
 * 
 * @param {Object} options Event handler options
 * @param {Object} config Library config (provided by the proxy but can be overridden)
 * @returns {Object} Object with chained callbacks #data and #error
 */


exports.fetchAll = fetchAll;

const eventCognitiveJobCreated = (options = {}, config = {}) => {
  expect.all({
    options
  }, {
    'options': {
      type: 'object'
    }
  });
  expect.all(config, {
    'web3': {
      type: 'object',
      code: _errors.WEB3_REQUIRED
    },
    'contracts.Pandora.abi': {
      type: 'object',
      code: _errors.CONTRACT_REQUIRED,
      args: ['Pandora']
    },
    'addresses.Pandora': {
      type: 'address',
      code: _errors.ADDRESS_REQUIRED,
      args: ['Pandora']
    }
  });
  const callbacks = {
    onData: () => {},
    onError: () => {}
  };
  const chain = {
    data: (cb = () => {}) => {
      callbacks.onData = cb;
      return chain;
    },
    error: (cb = () => {}) => {
      callbacks.onError = cb;
      return chain;
    }
  };
  const pan = new config.web3.eth.Contract(config.contracts.Pandora.abi, config.addresses.Pandora);
  chain.event = pan.events.CognitiveJobCreated(options).on('data', async event => {
    try {
      const jobDetails = await fetchJobDetails(event.returnValues.jobId, config);
      callbacks.onData({
        records: [jobDetails],
        event
      });
    } catch (err) {
      callbacks.onError(err);
    }
  }).on('error', callbacks.onError);
  return chain;
};
/**
 * Handle event JobStateChanged
 * 
 * @param {Object} options Event handler options
 * @param {Object} config Library config (provided by the proxy but can be overridden)
 * @returns {Object} Object with chained callbacks #data and #error
 */


exports.eventCognitiveJobCreated = eventCognitiveJobCreated;

const eventJobStateChanged = (options = {}, config = {}) => {
  expect.all({
    options
  }, {
    'options': {
      type: 'object'
    }
  });
  expect.all(config, {
    'web3': {
      type: 'object',
      code: _errors.WEB3_REQUIRED
    },
    'contracts.Pandora.abi': {
      type: 'object',
      code: _errors.CONTRACT_REQUIRED,
      args: ['Pandora']
    },
    'addresses.Pandora': {
      type: 'address',
      code: _errors.ADDRESS_REQUIRED,
      args: ['Pandora']
    }
  });
  const callbacks = {
    onData: () => {},
    onError: () => {}
  };
  const chain = {
    data: (cb = () => {}) => {
      callbacks.onData = cb;
      return chain;
    },
    error: (cb = () => {}) => {
      callbacks.onError = cb;
      return chain;
    }
  };

  const eventHandler = async event => {
    try {
      const jobDetails = await fetchJobDetails(event.returnValues.jobId, config);
      callbacks.onData({
        records: [jobDetails],
        event
      });
    } catch (err) {
      callbacks.onError(err);
    }
  };

  (async () => {
    let jobController = localCache.get('jobController');

    if (!jobController) {
      jobController = await fetchJobControllerAddress(config);
    }

    const jctrl = new config.web3.eth.Contract(config.contracts.CognitiveJobController.abi, jobController); // We listen for two events because of their nature means almost the same

    chain.event = [];
    chain.event.push(jctrl.events.JobStateChanged(options).on('data', eventHandler).on('error', callbacks.onError));
    chain.event.push(jctrl.events.CognitionProgressed(options).on('data', eventHandler).on('error', callbacks.onError));
  })();

  return chain;
};

exports.eventJobStateChanged = eventJobStateChanged;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9qb2JzLmpzIl0sIm5hbWVzIjpbImxvY2FsQ2FjaGUiLCJNYXAiLCJmZXRjaEpvYkNvbnRyb2xsZXJBZGRyZXNzIiwiY29uZmlnIiwiZXhwZWN0IiwiYWxsIiwidHlwZSIsImNvZGUiLCJXRUIzX1JFUVVJUkVEIiwiQUREUkVTU19SRVFVSVJFRCIsImFyZ3MiLCJDT05UUkFDVF9SRVFVSVJFRCIsInBhbiIsIndlYjMiLCJldGgiLCJDb250cmFjdCIsImNvbnRyYWN0cyIsIlBhbmRvcmEiLCJhYmkiLCJhZGRyZXNzZXMiLCJqb2JDb250cm9sbGVyIiwibWV0aG9kcyIsImNhbGwiLCJzZXQiLCJmZXRjaEFjdGl2ZUpvYnNDb3VudCIsImdldCIsImpjdHJsIiwiQ29nbml0aXZlSm9iQ29udHJvbGxlciIsImNvdW50IiwiYWN0aXZlSm9ic0NvdW50IiwiTnVtYmVyIiwicGFyc2VJbnQiLCJmZXRjaENvbXBsZXRlZEpvYnNDb3VudCIsImNvbXBsZXRlZEpvYnNDb3VudCIsImZldGNoU2VydmljZUluZm8iLCJhZGRyZXNzIiwicmVzcG9uc2VUaW1lc3RhbXBzIiwicmVzcG9uc2VGbGFncyIsImdldENvZ25pdGl2ZUpvYlNlcnZpY2VJbmZvIiwiZmV0Y2hKb2JEZXRhaWxzIiwia2VybmVsIiwiZGF0YXNldCIsImNvbXBsZXhpdHkiLCJkZXNjcmlwdGlvbiIsImFjdGl2ZVdvcmtlcnMiLCJzdGF0ZSIsImdldENvZ25pdGl2ZUpvYkRldGFpbHMiLCJrZXJuZWxJcGZzIiwiZGF0YXNldElwZnMiLCJpcGZzUmVzdWx0cyIsIlByb21pc2UiLCJtYXAiLCJfIiwiaW5kZXgiLCJnZXRDb2duaXRpdmVKb2JSZXN1bHRzIiwidXRmOGRlc2NyaXB0aW9uIiwidXRpbHMiLCJoZXhUb1V0ZjgiLCJzZXJ2aWNlSW5mbyIsInByb2dyZXNzIiwiTWF0aCIsImNlaWwiLCJyZWR1Y2UiLCJwcm9ncmVzc1Byb21pc2UiLCJyZXN1bHQiLCJjb21tb25Qcm9ncmVzcyIsInBhcnRQcm9ncmVzcyIsImxlbmd0aCIsInJlc29sdmUiLCJmaWx0ZXIiLCJyZXMiLCJzdWJzdHIiLCJqb2JUeXBlIiwiZmV0Y2hKb2JzSWRzIiwic291cmNlIiwidmFsdWVzIiwiY291bnRzIiwiQXJyYXkiLCJrZXlzIiwiZ2V0Sm9iSWQiLCJjcmVhdGUiLCJkZXBvc2l0IiwiZnJvbSIsInJlamVjdCIsImdhc1ByaWNlIiwiZ2V0R2FzUHJpY2UiLCJjcmVhdGVDb2duaXRpdmVKb2IiLCJ1dGY4VG9IZXgiLCJ0cmltIiwic2VuZCIsInZhbHVlIiwidG9XZWkiLCJTdHJpbmciLCJnYXMiLCJvbiIsInJlY2VpcHQiLCJzdGF0dXMiLCJUUkFOU0FDVElPTl9VTlNVQ0NFU1NGVUwiLCJldmVudHMiLCJDb2duaXRpdmVKb2JRdWV1ZWQiLCJyZXR1cm5WYWx1ZXMiLCJqb2JJZCIsIkNvZ25pdGl2ZUpvYkNyZWF0ZWQiLCJlcnIiLCJmZXRjaEFsbCIsInJlY29yZHMiLCJlcnJvciIsImFjdGl2ZUNvdW50IiwiY29tcGxldGVkQ291bnQiLCJhY3RpdmVKb2JzSWRzIiwiY29tcGxldGVkSm9ic0lkcyIsImFsbEpvYnNJZHMiLCJwdXNoIiwibWVzc2FnZSIsImV2ZW50Q29nbml0aXZlSm9iQ3JlYXRlZCIsIm9wdGlvbnMiLCJjYWxsYmFja3MiLCJvbkRhdGEiLCJvbkVycm9yIiwiY2hhaW4iLCJkYXRhIiwiY2IiLCJldmVudCIsImpvYkRldGFpbHMiLCJldmVudEpvYlN0YXRlQ2hhbmdlZCIsImV2ZW50SGFuZGxlciIsIkpvYlN0YXRlQ2hhbmdlZCIsIkNvZ25pdGlvblByb2dyZXNzZWQiXSwibWFwcGluZ3MiOiJBQUFBOzs7Ozs7OztBQVNBOzs7Ozs7O0FBRUE7O0FBQ0E7O0FBT0E7O0FBSUE7O0FBR0E7Ozs7QUFJQSxNQUFNQSxVQUFVLEdBQUcsSUFBSUMsR0FBSixFQUFuQjtBQUVBOzs7Ozs7O0FBTU8sTUFBTUMseUJBQXlCLEdBQUcsT0FBT0MsTUFBTSxHQUFHLEVBQWhCLEtBQXVCO0FBRTVEQyxFQUFBQSxNQUFNLENB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LGVBQWIsQ0FBNkJYLE9BQTdCLEVBQ1pyQixFQURZLENBQ1QsTUFEUyxFQUNEK0IsWUFEQyxFQUVaL0IsRUFGWSxDQUVULE9BRlMsRUFFQXNCLFNBQVMsQ0FBQ0UsT0FGVixDQUFqQjtBQUdBQyxJQUFBQSxLQUFLLENBQUNHLEtBQU4sQ0FBWVYsSUFBWixDQUFpQnRGLEtBQUssQ0FBQ3dFLE1BQU4sQ0FBYTZCLG1CQUFiLENBQWlDWixPQUFqQyxFQUNackIsRUFEWSxDQUNULE1BRFMsRUFDRCtCLFlBREMsRUFFWi9CLEVBRlksQ0FFVCxPQUZTLEVBRUFzQixTQUFTLENBQUNFLE9BRlYsQ0FBakI7QUFHSCxHQW5CRDs7QUFxQkEsU0FBT0MsS0FBUDtBQUNILENBN0VNIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBDb2duaXRpdmUgSm9icyByZWxhdGVkIG1ldGhvZHNcbiAqIFRoaXMgZmlsZSBpdCBpcyBhIHBhcnQgb2YgdGhlIFBhbmRvcmEgUHlycmhhIEphdmFzY3JpcHQgbGlicmFyeVxuICogXG4gKiBAZmlsZSBqb2JzLmpzXG4gKiBAYXV0aG9yIEtvc3RpYW50eW4gU215cm5vdiA8a29zdHlzaEBnbWFpbC5jb20+XG4gKiBAZGF0ZSAyMDE4XG4gKi9cblxuJ3VzZSBzdHJpY3QnO1xuXG5pbXBvcnQgKiBhcyBleHBlY3QgZnJvbSAnLi9oZWxwZXJzL2V4cGVjdCc7XG5pbXBvcnQgcGpzRXJyb3IsIHtcbiAgICBDT05UUkFDVF9SRVFVSVJFRCxcbiAgICBBRERSRVNTX1JFUVVJUkVELFxuICAgIFdFQjNfUkVRVUlSRUQsXG4gICAgVFJBTlNBQ1RJT05fVU5TVUNDRVNTRlVMXG59IGZyb20gJy4vaGVscGVycy9lcnJvcnMnO1xuXG5pbXBvcnQge1xuICAgIGZldGNoSXBmc0FkZHJlc3MgYXMgZmV0Y2hJcGZzQWRkcmVzc0J5S2VybmVsQWRkcmVzc1xufSBmcm9tICcuL2tlcm5lbHMnO1xuXG5pbXBvcnQge1xuICAgIGZldGNoSXBmc0FkZHJlc3MgYXMgZmV0Y2hJcGZzQWRkcmVzc0J5RGF0YXNldEFkZHJlc3Ncbn0gZnJvbSAnLi9kYXRhc2V0cyc7XG5pbXBvcnQge1xuICAgIGZldGNoSm9iUHJvZ3Jlc3MgYXMgZmV0Y2hXb3JrZXJzQWN0aXZlSm9iUHJvZ3Jlc3Ncbn0gZnJvbSAnLi93b3JrZXJzJztcblxuY29uc3QgbG9jYWxDYWNoZSA9IG5ldyBNYXAoKTtcblxuLyoqXG4gKiBHZXQgam9iIGNvbnRyb2xsZXIgYWRkcmVzc1xuICogXG4gKiBAcGFyYW0ge09iamVjdH0gY29uZmlnIExpYnJhcnkgY29uZmlnIChwcm92aWRlZCBieSB0aGUgcHJveHkgYnV0IGNhbiBiZSBvdmVycmlkZGVuKVxuICogQHJldHVybnMge1Byb21pc2U8e1N0cmluZ30+fSBcbiAqL1xuZXhwb3J0IGNvbnN0IGZldGNoSm9iQ29udHJvbGxlckFkZHJlc3MgPSBhc3luYyAoY29uZmlnID0ge30pID0+IHtcblxuICAgIGV4cGVjdC5hbGwoY29uZmlnLCB7XG4gICAgICAgICd3ZWIzJzoge1xuICAgICAgICAgICAgdHlwZTogJ29iamVjdCcsXG4gICAgICAgICAgICBjb2RlOiBXRUIzX1JFUVVJUkVEXG4gICAgICAgIH0sXG4gICAgICAgICdhZGRyZXNzZXMuUGFuZG9yYSc6IHtcbiAgICAgICAgICAgIHR5cGU6ICdhZGRyZXNzJyxcbiAgICAgICAgICAgIGNvZGU6IEFERFJFU1NfUkVRVUlSRUQsXG4gICAgICAgICAgICBhcmdzOiBbJ1BhbmRvcmEnXVxuICAgICAgICB9LFxuICAgICAgICAnY29udHJhY3RzLlBhbmRvcmEuYWJpJzoge1xuICAgICAgICAgICAgdHlwZTogJ29iamVjdCcsXG4gICAgICAgICAgICBjb2RlOiBDT05UUkFDVF9SRVFVSVJFRCxcbiAgICAgICAgICAgIGFyZ3M6IFsnUGFuZG9yYSddXG4gICAgICAgIH1cbiAgICB9KTtcblxuICAgIGNvbnN0IHBhbiA9IG5ldyBjb25maWcud2ViMy5ldGguQ29udHJhY3QoY29uZmlnLmNvbnRyYWN0cy5QYW5kb3JhLmFiaSwgY29uZmlnLmFkZHJlc3Nlcy5QYW5kb3JhKTtcbiAgICBjb25zdCBqb2JDb250cm9sbGVyID0gYXdhaXQgcGFuLm1ldGhvZHNcbiAgICAgICAgLmpvYkNvbnRyb2xsZXIoKVxuICAgICAgICAuY2FsbCgpO1xuXG4gICAgLy8gc2F2ZSBmb3IgbGF0ZXIgdXNlXG4gICAgbG9jYWxDYWNoZS5zZXQoJ2pvYkNvbnRyb2xsZXInLCBqb2JDb250cm9sbGVyKTtcbiAgICAgICAgXG4gICAgcmV0dXJuIGpvYkNvbnRyb2xsZXI7XG59O1xuXG4vKipcbiAqIEdldCBhY3RpdmUgam9icyBjb3VudCBcbiAqIFxuICogQHBhcmFtIHtPYmplY3R9IGNvbmZpZyBMaWJyYXJ5IGNvbmZpZyAocHJvdmlkZWQgYnkgdGhlIHByb3h5IGJ1dCBjYW4gYmUgb3ZlcnJpZGRlbilcbiAqIEByZXR1cm5zIHtQcm9taXNlPHtOdW1iZXJ9Pn0gXG4gKi9cbmV4cG9ydCBjb25zdCBmZXRjaEFjdGl2ZUpvYnNDb3VudCA9IGFzeW5jIChjb25maWcgPSB7fSkgPT4ge1xuXG4gICAgZXhwZWN0LmFsbChjb25maWcsIHtcbiAgICAgICAgJ3dlYjMnOiB7XG4gICAgICAgICAgICB0eXBlOiAnb2JqZWN0JyxcbiAgICAgICAgICAgIGNvZGU6IFdFQjNfUkVRVUlSRURcbiAgICAgICAgfSxcbiAgICAgICAgJ2NvbnRyYWN0cy5Db2duaXRpdmVKb2JDb250cm9sbGVyLmFiaSc6IHtcbiAgICAgICAgICAgIHR5cGU6ICdvYmplY3QnLFxuICAgICAgICAgICAgY29kZTogQ09OVFJBQ1RfUkVRVUlSRUQsXG4gICAgICAgICAgICBhcmdzOiBbJ0NvZ25pdGl2ZUpvYkNvbnRyb2xsZXInXVxuICAgICAgICB9XG4gICAgfSk7XG5cbiAgICBsZXQgam9iQ29udHJvbGxlciA9IGxvY2FsQ2FjaGUuZ2V0KCdqb2JDb250cm9sbGVyJyk7XG5cbiAgICBpZiAoIWpvYkNvbnRyb2xsZXIpIHtcblxuICAgICAgICBqb2JDb250cm9sbGVyID0gYXdhaXQgZmV0Y2hKb2JDb250cm9sbGVyQWRkcmVzcyhjb25maWcpO1xuICAgIH1cblxuICAgIGNvbnN0IGpjdHJsID0gbmV3IGNvbmZpZy53ZWIzLmV0aC5Db250cmFjdChjb25maWcuY29udHJhY3RzLkNvZ25pdGl2ZUpvYkNvbnRyb2xsZXIuYWJpLCBqb2JDb250cm9sbGVyKTtcbiAgICBjb25zdCBjb3VudCA9IGF3YWl0IGpjdHJsLm1ldGhvZHNcbiAgICAgICAgLmFjdGl2ZUpvYnNDb3VudCgpXG4gICAgICAgIC5jYWxsKCk7XG4gICAgICAgIFxuICAgIHJldHVybiBOdW1iZXIucGFyc2VJbnQoY291bnQsIDEwKTtcbn07XG5cbi8qKlxuICogR2V0IGNvbXBsZXRlZCBqb2JzIGNvdW50IFxuICogXG4gKiBAcGFyYW0ge09iamVjdH0gY29uZmlnIExpYnJhcnkgY29uZmlnIChwcm92aWRlZCBieSB0aGUgcHJveHkgYnV0IGNhbiBiZSBvdmVycmlkZGVuKVxuICogQHJldHVybnMge1Byb21pc2U8e051bWJlcn0+fSBcbiAqL1xuZXhwb3J0IGNvbnN0IGZldGNoQ29tcGxldGVkSm9ic0NvdW50ID0gYXN5bmMgKGNvbmZpZyA9IHt9KSA9PiB7XG5cbiAgICBleHBlY3QuYWxsKGNvbmZpZywge1xuICAgICAgICAnd2ViMyc6IHtcbiAgICAgICAgICAgIHR5cGU6ICdvYmplY3QnLFxuICAgICAgICAgICAgY29kZTogV0VCM19SRVFVSVJFRFxuICAgICAgICB9LFxuICAgICAgICAnY29udHJhY3RzLkNvZ25pdGl2ZUpvYkNvbnRyb2xsZXIuYWJpJzoge1xuICAgICAgICAgICAgdHlwZTogJ29iamVjdCcsXG4gICAgICAgICAgICBjb2RlOiBDT05UUkFDVF9SRVFVSVJFRCxcbiAgICAgICAgICAgIGFyZ3M6IFsnQ29nbml0aXZlSm9iQ29udHJvbGxlciddXG4gICAgICAgIH1cbiAgICB9KTtcblxuICAgIGxldCBqb2JDb250cm9sbGVyID0gbG9jYWxDYWNoZS5nZXQoJ2pvYkNvbnRyb2xsZXInKTtcblxuICAgIGlmICgham9iQ29udHJvbGxlcikge1xuXG4gICAgICAgIGpvYkNvbnRyb2xsZXIgPSBhd2FpdCBmZXRjaEpvYkNvbnRyb2xsZXJBZGRyZXNzKGNvbmZpZyk7XG4gICAgfVxuXG4gICAgY29uc3QgamN0cmwgPSBuZXcgY29uZmlnLndlYjMuZXRoLkNvbnRyYWN0KGNvbmZpZy5jb250cmFjdHMuQ29nbml0aXZlSm9iQ29udHJvbGxlci5hYmksIGpvYkNvbnRyb2xsZXIpO1xuICAgIGNvbnN0IGNvdW50ID0gYXdhaXQgamN0cmwubWV0aG9kc1xuICAgICAgICAuY29tcGxldGVkSm9ic0NvdW50KClcbiAgICAgICAgLmNhbGwoKTtcbiAgICAgICAgXG4gICAgcmV0dXJuIE51bWJlci5wYXJzZUludChjb3VudCwgMTApO1xufTtcblxuLyoqXG4gKiBHZXQgam9iIHNlcnZpY2UgaW5mbyBcbiAqIFxuICogQHBhcmFtIHtTdHJpbmd9IGFkZHJlc3MgSm9iIGFkZHJlc3NcbiAqIEBwYXJhbSB7T2JqZWN0fSBjb25maWcgTGlicmFyeSBjb25maWcgKHByb3ZpZGVkIGJ5IHRoZSBwcm94eSBidXQgY2FuIGJlIG92ZXJyaWRkZW4pXG4gKiBAcmV0dXJucyB7UHJvbWlzZTx7TnVtYmVyfT59IFxuICovXG5leHBvcnQgY29uc3QgZmV0Y2hTZXJ2aWNlSW5mbyA9IGFzeW5jIChhZGRyZXNzLCBjb25maWcgPSB7fSkgPT4ge1xuXG4gICAgZXhwZWN0LmFsbChjb25maWcsIHtcbiAgICAgICAgJ3dlYjMnOiB7XG4gICAgICAgICAgICB0eXBlOiAnb2JqZWN0JyxcbiAgICAgICAgICAgIGNvZGU6IFdFQjNfUkVRVUlSRURcbiAgICAgICAgfSxcbiAgICAgICAgJ2NvbnRyYWN0cy5Db2duaXRpdmVKb2JDb250cm9sbGVyLmFiaSc6IHtcbiAgICAgICAgICAgIHR5cGU6ICdvYmplY3QnLFxuICAgICAgICAgICAgY29kZTogQ09OVFJBQ1RfUkVRVUlSRUQsXG4gICAgICAgICAgICBhcmdzOiBbJ0NvZ25pdGl2ZUpvYkNvbnRyb2xsZXInXVxuICAgICAgICB9XG4gICAgfSk7XG5cbiAgICBsZXQgam9iQ29udHJvbGxlciA9IGxvY2FsQ2FjaGUuZ2V0KCdqb2JDb250cm9sbGVyJyk7XG5cbiAgICBpZiAoIWpvYkNvbnRyb2xsZXIpIHtcblxuICAgICAgICBqb2JDb250cm9sbGVyID0gYXdhaXQgZmV0Y2hKb2JDb250cm9sbGVyQWRkcmVzcyhjb25maWcpO1xuICAgIH1cblxuICAgIGNvbnN0IGpjdHJsID0gbmV3IGNvbmZpZy53ZWIzLmV0aC5Db250cmFjdChjb25maWcuY29udHJhY3RzLkNvZ25pdGl2ZUpvYkNvbnRyb2xsZXIuYWJpLCBqb2JDb250cm9sbGVyKTtcblxuICAgIGNvbnN0IHsgcmVzcG9uc2VUaW1lc3RhbXBzLCByZXNwb25zZUZsYWdzIH0gPSBhd2FpdCBqY3RybC5tZXRob2RzXG4gICAgICAgIC5nZXRDb2duaXRpdmVKb2JTZXJ2aWNlSW5mbyhhZGRyZXNzKVxuICAgICAgICAuY2FsbCgpO1xuXG4gICAgcmV0dXJuIHsgXG4gICAgICAgIHJlc3BvbnNlVGltZXN0YW1wcywgXG4gICAgICAgIHJlc3BvbnNlRmxhZ3MgXG4gICAgfTtcbn07XG5cbi8qKlxuICogR2V0IGpvYiBkZXRhaWxzIFxuICogXG4gKiBAcGFyYW0ge1N0cmluZ30gYWRkcmVzcyBKb2IgYWRkcmVzc1xuICogQHBhcmFtIHtPYmplY3R9IGNvbmZpZyBMaWJyYXJ5IGNvbmZpZyAocHJvdmlkZWQgYnkgdGhlIHByb3h5IGJ1dCBjYW4gYmUgb3ZlcnJpZGRlbilcbiAqIEByZXR1cm5zIHtQcm9taXNlPHtOdW1iZXJ9Pn0gXG4gKi9cbmV4cG9ydCBjb25zdCBmZXRjaEpvYkRldGFpbHMgPSBhc3luYyAoYWRkcmVzcywgY29uZmlnID0ge30pID0+IHtcblxuICAgIGV4cGVjdC5hbGwoY29uZmlnLCB7XG4gICAgICAgICd3ZWIzJzoge1xuICAgICAgICAgICAgdHlwZTogJ29iamVjdCcsXG4gICAgICAgICAgICBjb2RlOiBXRUIzX1JFUVVJUkVEXG4gICAgICAgIH0sXG4gICAgICAgICdjb250cmFjdHMuQ29nbml0aXZlSm9iQ29udHJvbGxlci5hYmknOiB7XG4gICAgICAgICAgICB0eXBlOiAnb2JqZWN0JyxcbiAgICAgICAgICAgIGNvZGU6IENPTlRSQUNUX1JFUVVJUkVELFxuICAgICAgICAgICAgYXJnczogWydDb2duaXRpdmVKb2JDb250cm9sbGVyJ11cbiAgICAgICAgfVxuICAgIH0pO1xuXG4gICAgbGV0IGpvYkNvbnRyb2xsZXIgPSBsb2NhbENhY2hlLmdldCgnam9iQ29udHJvbGxlcicpO1xuXG4gICAgaWYgKCFqb2JDb250cm9sbGVyKSB7XG5cbiAgICAgICAgam9iQ29udHJvbGxlciA9IGF3YWl0IGZldGNoSm9iQ29udHJvbGxlckFkZHJlc3MoY29uZmlnKTtcbiAgICB9XG5cbiAgICBjb25zdCBqY3RybCA9IG5ldyBjb25maWcud2ViMy5ldGguQ29udHJhY3QoY29uZmlnLmNvbnRyYWN0cy5Db2duaXRpdmVKb2JDb250cm9sbGVyLmFiaSwgam9iQ29udHJvbGxlcik7XG4gICAgXG4gICAgY29uc3QgeyBrZXJuZWwsIGRhdGFzZXQsIGNvbXBsZXhpdHksIGRlc2NyaXB0aW9uLCBhY3RpdmVXb3JrZXJzLCBzdGF0ZSB9ID0gYXdhaXQgamN0cmwubWV0aG9kc1xuICAgICAgICAuZ2V0Q29nbml0aXZlSm9iRGV0YWlscyhhZGRyZXNzKVxuICAgICAgICAuY2FsbCgpO1xuICAgIGNvbnN0IGtlcm5lbElwZnMgPSBhd2FpdCBmZXRjaElwZnNBZGRyZXNzQnlLZXJuZWxBZGRyZXNzKGtlcm5lbCwgY29uZmlnKTtcbiAgICBjb25zdCBkYXRhc2V0SXBmcyA9IGF3YWl0IGZldGNoSXBmc0FkZHJlc3NCeURhdGFzZXRBZGRyZXNzKGRhdGFzZXQsIGNvbmZpZyk7XG4gICAgY29uc3QgaXBmc1Jlc3VsdHMgPSBhd2FpdCBQcm9taXNlLmFsbChhY3RpdmVXb3JrZXJzLm1hcCgoXywgaW5kZXgpID0+IGpjdHJsLm1ldGhvZHMuZ2V0Q29nbml0aXZlSm9iUmVzdWx0cyhhZGRyZXNzLCBpbmRleCkuY2FsbCgpKSk7ICAgIFxuICAgIGNvbnN0IHV0ZjhkZXNjcmlwdGlvbiA9IGRlc2NyaXB0aW9uID8gY29uZmlnLndlYjMudXRpbHMuaGV4VG9VdGY4KGRlc2NyaXB0aW9uKSA6ICcnO1xuICAgIGNvbnN0IHNlcnZpY2VJbmZvID0gYXdhaXQgZmV0Y2hTZXJ2aWNlSW5mbyhhZGRyZXNzLCBjb25maWcpO1xuXG4gICAgY29uc3QgcHJvZ3Jlc3MgPSBNYXRoLmNlaWwoaXBmc1Jlc3VsdHMucmVkdWNlKGFzeW5jIChwcm9ncmVzc1Byb21pc2UsIHJlc3VsdCwgaW5kZXgpID0+IHtcbiAgICAgICAgY29uc3QgY29tbW9uUHJvZ3Jlc3MgPSBhd2FpdCBwcm9ncmVzc1Byb21pc2U7XG4gICAgICAgIGxldCBwYXJ0UHJvZ3Jlc3MgPSAxMDAgLyBpcGZzUmVzdWx0cy5sZW5ndGg7XG5cbiAgICAgICAgaWYgKCFyZXN1bHQpIHtcblxuICAgICAgICAgICAgLy8gSWYgcmVzdWx0IG5vdCBiZWVuIHByb3ZpZGVkIGJ5IHRoZSB3b3JrZXIgXG4gICAgICAgICAgICAvLyB0aGVuIHdlIGZldGNoaW5nIHByb2dyZXNzIHZhbHVlIGZyb20gaXRzIGNvbnRyYWN0XG4gICAgICAgICAgICBwYXJ0UHJvZ3Jlc3MgPSBhd2FpdCBmZXRjaFdvcmtlcnNBY3RpdmVKb2JQcm9ncmVzcyhhY3RpdmVXb3JrZXJzW2luZGV4XSwgY29uZmlnKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiBjb21tb25Qcm9ncmVzcyArIHBhcnRQcm9ncmVzcztcbiAgICB9LCBQcm9taXNlLnJlc29sdmUoMCkpKTtcblxuICAgIHJldHVybiB7XG4gICAgICAgIGFkZHJlc3MsIFxuICAgICAgICBrZXJuZWwsXG4gICAgICAgIGtlcm5lbElwZnMsXG4gICAgICAgIGRhdGFzZXQsXG4gICAgICAgIGRhdGFzZXRJcGZzLFxuICAgICAgICBhY3RpdmVXb3JrZXJzLFxuICAgICAgICBpcGZzUmVzdWx0czogaXBmc1Jlc3VsdHMubWFwKHJlc3VsdCA9PiByZXN1bHQgPyBjb25maWcud2ViMy51dGlscy5oZXhUb1V0ZjgocmVzdWx0KSA6IHJlc3VsdCkuZmlsdGVyKHJlcyA9PiByZXMpLFxuICAgICAgICBjb21wbGV4aXR5OiBOdW1iZXIoY29tcGxleGl0eSksXG4gICAgICAgIHByb2dyZXNzOiBwcm9ncmVzcyA+IDEwMCA/IDEwMCA6IHByb2dyZXNzLFxuICAgICAgICBzdGF0ZTogTnVtYmVyKHN0YXRlKSxcbiAgICAgICAgZGVzY3JpcHRpb246IHV0ZjhkZXNjcmlwdGlvbi5zdWJzdHIoMiksXG4gICAgICAgIGpvYlR5cGU6IHV0ZjhkZXNjcmlwdGlvbi5zdWJzdHIoMCwgMSksXG4gICAgICAgIHNlcnZpY2VJbmZvXG4gICAgfTtcbn07XG5cbi8qKlxuICogR2V0IGpvYnMgSWQgZnJvbSB0aGUgXCJzb3VyY2VcIlxuICogXG4gKiBAcGFyYW0ge1N0cmluZ30gZnJvbSBzb3VyY2UgYWN0aXZlSm9icyBvciBjb21wbGV0ZWRKb2JzXG4gKiBAcGFyYW0ge051bWJlcn0gY291bnRcbiAqIEBwYXJhbSB7T2JqZWN0fSBvcHRpb25zXG4gKiBAcmV0dXJucyB7UHJvbWlzZTxbe1N0cmluZ31dPn0gXG4gKi9cbmV4cG9ydCBjb25zdCBmZXRjaEpvYnNJZHMgPSBhc3luYyAoc291cmNlLCBjb3VudCA9IDAsIGNvbmZpZyA9IHt9KSA9PiB7XG5cbiAgICBleHBlY3QuYWxsKHsgc291cmNlIH0sIHtcbiAgICAgICAgJ3NvdXJjZSc6IHtcbiAgICAgICAgICAgIHR5cGU6ICdlbnVtJyxcbiAgICAgICAgICAgIHZhbHVlczogWydhY3RpdmVKb2JzJywgJ2NvbXBsZXRlZEpvYnMnXVxuICAgICAgICB9XG4gICAgfSk7XG5cbiAgICBleHBlY3QuYWxsKGNvbmZpZywge1xuICAgICAgICAnd2ViMyc6IHtcbiAgICAgICAgICAgIHR5cGU6ICdvYmplY3QnLFxuICAgICAgICAgICAgY29kZTogV0VCM19SRVFVSVJFRFxuICAgICAgICB9LFxuICAgICAgICAnY29udHJhY3RzLkNvZ25pdGl2ZUpvYkNvbnRyb2xsZXIuYWJpJzoge1xuICAgICAgICAgICAgdHlwZTogJ29iamVjdCcsXG4gICAgICAgICAgICBjb2RlOiBDT05UUkFDVF9SRVFVSVJFRCxcbiAgICAgICAgICAgIGFyZ3M6IFsnQ29nbml0aXZlSm9iQ29udHJvbGxlciddXG4gICAgICAgIH1cbiAgICB9KTsgICAgXG5cbiAgICBsZXQgam9iQ29udHJvbGxlciA9IGxvY2FsQ2FjaGUuZ2V0KCdqb2JDb250cm9sbGVyJyk7XG5cbiAgICBpZiAoIWpvYkNvbnRyb2xsZXIpIHtcblxuICAgICAgICBqb2JDb250cm9sbGVyID0gYXdhaXQgZmV0Y2hKb2JDb250cm9sbGVyQWRkcmVzcyhjb25maWcpO1xuICAgIH1cblxuICAgIC8vIG51bWJlcnMgc2VxdWVuY2UgZnJvbSAwIHRvIGNvdW50XG4gICAgY29uc3QgY291bnRzID0gWy4uLkFycmF5KGNvdW50KS5rZXlzKCldO1xuXG4gICAgY29uc3QgamN0cmwgPSBuZXcgY29uZmlnLndlYjMuZXRoLkNvbnRyYWN0KGNvbmZpZy5jb250cmFjdHMuQ29nbml0aXZlSm9iQ29udHJvbGxlci5hYmksIGpvYkNvbnRyb2xsZXIpO1xuICAgIGNvbnN0IGFkZHJlc3NlcyA9IGF3YWl0IFByb21pc2UuYWxsKGNvdW50cy5tYXAoaW5kZXggPT4gamN0cmwubWV0aG9kcy5nZXRKb2JJZChpbmRleCwgc291cmNlID09PSAnYWN0aXZlSm9icycpLmNhbGwoKSkpO1xuICAgICAgICBcbiAgICByZXR1cm4gYWRkcmVzc2VzO1xufTtcblxuLyoqXG4gKiBDcmVhdGUgY29nbml0aXZlIGpvYiBjb250cmFjdFxuICogXG4gKiBAcGFyYW0ge09iamVjdH0gb3B0aW9uc1xuICogQHBhcmFtIHtTdHJpbmd9IGZyb20gUHVibGlzaGVyIGFkZHJlc3NcbiAqIEBwYXJhbSB7T2JqZWN0fSBjb25maWcgTGlicmFyeSBjb25maWcgKHByb3ZpZGVkIGJ5IHRoZSBwcm94eSBidXQgY2FuIGJlIG92ZXJyaWRkZW4pXG4gKiBAcmV0dXJucyB7UHJvbWlzZX0gUHJvbWlzZSBvYmplY3QgcmVzb2x2ZWQgdG8gYWRkIHN0YXR1cyAoYm9vbGVhbilcbiAqL1xuZXhwb3J0IGNvbnN0IGNyZWF0ZSA9ICh7a2VybmVsLCBkYXRhc2V0LCBjb21wbGV4aXR5LCBqb2JUeXBlLCBkZXNjcmlwdGlvbiwgZGVwb3NpdH0sIGZyb20sIGNvbmZpZyA9IHt9KSA9PiBuZXcgUHJvbWlzZShhc3luYyAocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG5cbiAgICBleHBlY3QuYWxsKHsga2VybmVsLCBkYXRhc2V0LCBjb21wbGV4aXR5LCBqb2JUeXBlLCBkZXNjcmlwdGlvbiwgZGVwb3NpdCwgZnJvbSB9LCB7XG4gICAgICAgICdrZXJuZWwnOiB7XG4gICAgICAgICAgICB0eXBlOiAnYWRkcmVzcydcbiAgICAgICAgfSxcbiAgICAgICAgJ2RhdGFzZXQnOiB7XG4gICAgICAgICAgICB0eXBlOiAnYWRkcmVzcydcbiAgICAgICAgfSxcbiAgICAgICAgJ2NvbXBsZXhpdHknOiB7XG4gICAgICAgICAgICB0eXBlOiAnbnVtYmVyJ1xuICAgICAgICB9LFxuICAgICAgICAnam9iVHlwZSc6IHtcbiAgICAgICAgICAgIHR5cGU6ICdzdHJpbmcnXG4gICAgICAgIH0sXG4gICAgICAgICdkZXNjcmlwdGlvbic6IHtcbiAgICAgICAgICAgIHR5cGU6ICdzdHJpbmcnXG4gICAgICAgIH0sXG4gICAgICAgICdkZXBvc2l0Jzoge1xuICAgICAgICAgICAgdHlwZTogJ251bWJlcidcbiAgICAgICAgfSxcbiAgICAgICAgJ2Zyb20nOiB7XG4gICAgICAgICAgICB0eXBlOiAnYWRkcmVzcydcbiAgICAgICAgfVxuICAgIH0pO1xuXG4gICAgZXhwZWN0LmFsbChjb25maWcsIHtcbiAgICAgICAgJ3dlYjMnOiB7XG4gICAgICAgICAgICB0eXBlOiAnb2JqZWN0JyxcbiAgICAgICAgICAgIGNvZGU6IFdFQjNfUkVRVUlSRURcbiAgICAgICAgfSxcbiAgICAgICAgJ2NvbnRyYWN0cy5QYW5kb3JhLmFiaSc6IHtcbiAgICAgICAgICAgIHR5cGU6ICdvYmplY3QnLFxuICAgICAgICAgICAgY29kZTogQ09OVFJBQ1RfUkVRVUlSRUQsXG4gICAgICAgICAgICBhcmdzOiBbJ1BhbmRvcmEnXVxuICAgICAgICB9LFxuICAgICAgICAnYWRkcmVzc2VzLlBhbmRvcmEnOiB7XG4gICAgICAgICAgICB0eXBlOiAnYWRkcmVzcycsXG4gICAgICAgICAgICBjb2RlOiBBRERSRVNTX1JFUVVJUkVELFxuICAgICAgICAgICAgYXJnczogWydQYW5kb3JhJ11cbiAgICAgICAgfVxuICAgIH0pO1xuXG4gICAgY29uc3QgcGFuID0gbmV3IGNvbmZpZy53ZWIzLmV0aC5Db250cmFjdChjb25maWcuY29udHJhY3RzLlBhbmRvcmEuYWJpLCBjb25maWcuYWRkcmVzc2VzLlBhbmRvcmEpO1xuICAgIGNvbnN0IGdhc1ByaWNlID0gYXdhaXQgY29uZmlnLndlYjMuZXRoLmdldEdhc1ByaWNlKCk7XG4gICAgcGFuLm1ldGhvZHNcbiAgICAgICAgLmNyZWF0ZUNvZ25pdGl2ZUpvYihrZXJuZWwsIGRhdGFzZXQsIGNvbXBsZXhpdHksIGNvbmZpZy53ZWIzLnV0aWxzLnV0ZjhUb0hleChgJHtqb2JUeXBlfTske2Rlc2NyaXB0aW9uLnRyaW0oKX1gKSlcbiAgICAgICAgLnNlbmQoe1xuICAgICAgICAgICAgdmFsdWU6IGNvbmZpZy53ZWIzLnV0aWxzLnRvV2VpKFN0cmluZyhkZXBvc2l0KSksXG4gICAgICAgICAgICBmcm9tLFxuICAgICAgICAgICAgZ2FzUHJpY2UsXG4gICAgICAgICAgICBnYXM6IDY3MDAwMDAvLyBiZWNhdXNlIHRoaXMgd29ya2Zsb3cgaXMgdG9vIGdyZWVkeVxuICAgICAgICB9KVxuICAgICAgICAub24oJ2Vycm9yJywgcmVqZWN0KVxuICAgICAgICAub24oJ3JlY2VpcHQnLCByZWNlaXB0ID0+IHtcblxuICAgICAgICAgICAgdHJ5IHtcblxuICAgICAgICAgICAgICAgIGlmIChOdW1iZXIocmVjZWlwdC5zdGF0dXMpID09PSAwKSB7XG5cbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHJlamVjdChwanNFcnJvcihUUkFOU0FDVElPTl9VTlNVQ0NFU1NGVUwpKTtcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICBpZiAocmVjZWlwdC5ldmVudHMuQ29nbml0aXZlSm9iUXVldWVkKSB7XG4gICAgXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiByZXNvbHZlKHJlY2VpcHQuZXZlbnRzLkNvZ25pdGl2ZUpvYlF1ZXVlZC5yZXR1cm5WYWx1ZXMuam9iSWQpO1xuICAgICAgICAgICAgICAgIH1cbiAgICBcbiAgICAgICAgICAgICAgICByZXNvbHZlKHJlY2VpcHQuZXZlbnRzLkNvZ25pdGl2ZUpvYkNyZWF0ZWQucmV0dXJuVmFsdWVzLmpvYklkKTtcbiAgICAgICAgICAgIH0gY2F0Y2ggKGVycikge1xuICAgICAgICAgICAgICAgIHJlamVjdChlcnIpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbn0pO1xuXG4vKipcbiAqIEdldCBhbGwgam9ic1xuICogXG4gKiBAcGFyYW0ge09iamVjdH0gY29uZmlnIExpYnJhcnkgY29uZmlnIChwcm92aWRlZCBieSB0aGUgcHJveHkgYnV0IGNhbiBiZSBvdmVycmlkZGVuKVxuICogQHJldHVybnMge1Byb21pc2V9IEEgUHJvbWlzZSBvYmplY3QgcmVwcmVzZW50cyB0aGUge09iamVjdFtdfSBcbiAqL1xuZXhwb3J0IGNvbnN0IGZldGNoQWxsID0gYXN5bmMgKGNvbmZpZyA9IHt9KSA9PiB7XG4gICAgbGV0IHJlY29yZHMgPSBbXTtcbiAgICBsZXQgZXJyb3IgPSBbXTtcblxuICAgIHRyeSB7XG5cbiAgICAgICAgY29uc3QgW1xuICAgICAgICAgICAgYWN0aXZlQ291bnQsXG4gICAgICAgICAgICBjb21wbGV0ZWRDb3VudFxuICAgICAgICBdID0gYXdhaXQgUHJvbWlzZS5hbGwoW1xuICAgICAgICAgICAgZmV0Y2hBY3RpdmVKb2JzQ291bnQoY29uZmlnKSxcbiAgICAgICAgICAgIGZldGNoQ29tcGxldGVkSm9ic0NvdW50KGNvbmZpZylcbiAgICAgICAgXSk7XG5cbiAgICAgICAgY29uc3QgW1xuICAgICAgICAgICAgYWN0aXZlSm9ic0lkcyxcbiAgICAgICAgICAgIGNvbXBsZXRlZEpvYnNJZHNcbiAgICAgICAgXSA9IGF3YWl0IFByb21pc2UuYWxsKFtcbiAgICAgICAgICAgIGZldGNoSm9ic0lkcygnYWN0aXZlSm9icycsIGFjdGl2ZUNvdW50LCBjb25maWcpLFxuICAgICAgICAgICAgZmV0Y2hKb2JzSWRzKCdjb21wbGV0ZWRKb2JzJywgY29tcGxldGVkQ291bnQsIGNvbmZpZylcbiAgICAgICAgXSk7XG5cbiAgICAgICAgY29uc3QgYWxsSm9ic0lkcyA9IFtcbiAgICAgICAgICAgIC4uLmFjdGl2ZUpvYnNJZHMsXG4gICAgICAgICAgICAuLi5jb21wbGV0ZWRKb2JzSWRzXG4gICAgICAgIF07XG5cbiAgICAgICAgcmVjb3JkcyA9IGF3YWl0IFByb21pc2UuYWxsKGFsbEpvYnNJZHMubWFwKGpvYklkID0+IGZldGNoSm9iRGV0YWlscyhqb2JJZCwgY29uZmlnKSkpO1xuICAgICAgICBcbiAgICB9IGNhdGNoKGVycikge1xuICAgICAgICBlcnJvci5wdXNoKHtcbiAgICAgICAgICAgIGVycm9yOiBlcnIubWVzc2FnZVxuICAgICAgICB9KTtcbiAgICB9ICAgXG5cbiAgICByZXR1cm4ge1xuICAgICAgICByZWNvcmRzLFxuICAgICAgICBlcnJvclxuICAgIH07XG59O1xuXG4vKipcbiAqIEhhbmRsZSBldmVudCBDb2duaXRpdmVKb2JDcmVhdGVkXG4gKiBcbiAqIEBwYXJhbSB7T2JqZWN0fSBvcHRpb25zIEV2ZW50IGhhbmRsZXIgb3B0aW9uc1xuICogQHBhcmFtIHtPYmplY3R9IGNvbmZpZyBMaWJyYXJ5IGNvbmZpZyAocHJvdmlkZWQgYnkgdGhlIHByb3h5IGJ1dCBjYW4gYmUgb3ZlcnJpZGRlbilcbiAqIEByZXR1cm5zIHtPYmplY3R9IE9iamVjdCB3aXRoIGNoYWluZWQgY2FsbGJhY2tzICNkYXRhIGFuZCAjZXJyb3JcbiAqL1xuZXhwb3J0IGNvbnN0IGV2ZW50Q29nbml0aXZlSm9iQ3JlYXRlZCA9IChvcHRpb25zID0ge30sIGNvbmZpZyA9IHt9KSA9PiB7XG5cbiAgICBleHBlY3QuYWxsKHsgb3B0aW9ucyB9LCB7XG4gICAgICAgICdvcHRpb25zJzoge1xuICAgICAgICAgICAgdHlwZTogJ29iamVjdCdcbiAgICAgICAgfVxuICAgIH0pO1xuXG4gICAgZXhwZWN0LmFsbChjb25maWcsIHtcbiAgICAgICAgJ3dlYjMnOiB7XG4gICAgICAgICAgICB0eXBlOiAnb2JqZWN0JyxcbiAgICAgICAgICAgIGNvZGU6IFdFQjNfUkVRVUlSRURcbiAgICAgICAgfSxcbiAgICAgICAgJ2NvbnRyYWN0cy5QYW5kb3JhLmFiaSc6IHtcbiAgICAgICAgICAgIHR5cGU6ICdvYmplY3QnLFxuICAgICAgICAgICAgY29kZTogQ09OVFJBQ1RfUkVRVUlSRUQsXG4gICAgICAgICAgICBhcmdzOiBbJ1BhbmRvcmEnXVxuICAgICAgICB9LFxuICAgICAgICAnYWRkcmVzc2VzLlBhbmRvcmEnOiB7XG4gICAgICAgICAgICB0eXBlOiAnYWRkcmVzcycsXG4gICAgICAgICAgICBjb2RlOiBBRERSRVNTX1JFUVVJUkVELFxuICAgICAgICAgICAgYXJnczogWydQYW5kb3JhJ11cbiAgICAgICAgfVxuICAgIH0pO1xuXG4gICAgY29uc3QgY2FsbGJhY2tzID0ge1xuICAgICAgICBvbkRhdGE6ICgpID0+IHt9LFxuICAgICAgICBvbkVycm9yOiAoKSA9PiB7fVxuICAgIH07XG5cbiAgICBjb25zdCBjaGFpbiA9IHtcbiAgICAgICAgZGF0YTogKGNiID0gKCkgPT4ge30pID0+IHtcbiAgICAgICAgICAgIGNhbGxiYWNrcy5vbkRhdGEgPSBjYjtcbiAgICAgICAgICAgIHJldHVybiBjaGFpbjtcbiAgICAgICAgfSxcbiAgICAgICAgZXJyb3I6IChjYiA9ICgpID0+IHt9KSA9PiB7XG4gICAgICAgICAgICBjYWxsYmFja3Mub25FcnJvciA9IGNiO1xuICAgICAgICAgICAgcmV0dXJuIGNoYWluO1xuICAgICAgICB9XG4gICAgfTtcblxuICAgIGNvbnN0IHBhbiA9IG5ldyBjb25maWcud2ViMy5ldGguQ29udHJhY3QoY29uZmlnLmNvbnRyYWN0cy5QYW5kb3JhLmFiaSwgY29uZmlnLmFkZHJlc3Nlcy5QYW5kb3JhKTtcbiAgICBjaGFpbi5ldmVudCA9IHBhbi5ldmVudHMuQ29nbml0aXZlSm9iQ3JlYXRlZChvcHRpb25zKVxuICAgICAgICAub24oJ2RhdGEnLCBhc3luYyAoZXZlbnQpID0+IHtcblxuICAgICAgICAgICAgdHJ5IHtcblxuICAgICAgICAgICAgICAgIGNvbnN0IGpvYkRldGFpbHMgPSBhd2FpdCBmZXRjaEpvYkRldGFpbHMoZXZlbnQucmV0dXJuVmFsdWVzLmpvYklkLCBjb25maWcpO1xuICAgICAgICAgICAgICAgIGNhbGxiYWNrcy5vbkRhdGEoe1xuICAgICAgICAgICAgICAgICAgICByZWNvcmRzOiBbam9iRGV0YWlsc10sXG4gICAgICAgICAgICAgICAgICAgIGV2ZW50XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9IGNhdGNoKGVycikge1xuICAgICAgICAgICAgICAgIGNhbGxiYWNrcy5vbkVycm9yKGVycik7XG4gICAgICAgICAgICB9ICAgICAgICAgICAgXG4gICAgICAgIH0pXG4gICAgICAgIC5vbignZXJyb3InLCBjYWxsYmFja3Mub25FcnJvcik7XG5cbiAgICByZXR1cm4gY2hhaW47XG59O1xuXG4vKipcbiAqIEhhbmRsZSBldmVudCBKb2JTdGF0ZUNoYW5nZWRcbiAqIFxuICogQHBhcmFtIHtPYmplY3R9IG9wdGlvbnMgRXZlbnQgaGFuZGxlciBvcHRpb25zXG4gKiBAcGFyYW0ge09iamVjdH0gY29uZmlnIExpYnJhcnkgY29uZmlnIChwcm92aWRlZCBieSB0aGUgcHJveHkgYnV0IGNhbiBiZSBvdmVycmlkZGVuKVxuICogQHJldHVybnMge09iamVjdH0gT2JqZWN0IHdpdGggY2hhaW5lZCBjYWxsYmFja3MgI2RhdGEgYW5kICNlcnJvclxuICovXG5leHBvcnQgY29uc3QgZXZlbnRKb2JTdGF0ZUNoYW5nZWQgPSAob3B0aW9ucyA9IHt9LCBjb25maWcgPSB7fSkgPT4ge1xuXG4gICAgZXhwZWN0LmFsbCh7IG9wdGlvbnMgfSwge1xuICAgICAgICAnb3B0aW9ucyc6IHtcbiAgICAgICAgICAgIHR5cGU6ICdvYmplY3QnXG4gICAgICAgIH1cbiAgICB9KTtcblxuICAgIGV4cGVjdC5hbGwoY29uZmlnLCB7XG4gICAgICAgICd3ZWIzJzoge1xuICAgICAgICAgICAgdHlwZTogJ29iamVjdCcsXG4gICAgICAgICAgICBjb2RlOiBXRUIzX1JFUVVJUkVEXG4gICAgICAgIH0sXG4gICAgICAgICdjb250cmFjdHMuUGFuZG9yYS5hYmknOiB7XG4gICAgICAgICAgICB0eXBlOiAnb2JqZWN0JyxcbiAgICAgICAgICAgIGNvZGU6IENPTlRSQUNUX1JFUVVJUkVELFxuICAgICAgICAgICAgYXJnczogWydQYW5kb3JhJ11cbiAgICAgICAgfSxcbiAgICAgICAgJ2FkZHJlc3Nlcy5QYW5kb3JhJzoge1xuICAgICAgICAgICAgdHlwZTogJ2FkZHJlc3MnLFxuICAgICAgICAgICAgY29kZTogQUREUkVTU19SRVFVSVJFRCxcbiAgICAgICAgICAgIGFyZ3M6IFsnUGFuZG9yYSddXG4gICAgICAgIH1cbiAgICB9KTtcblxuICAgIGNvbnN0IGNhbGxiYWNrcyA9IHtcbiAgICAgICAgb25EYXRhOiAoKSA9PiB7fSxcbiAgICAgICAgb25FcnJvcjogKCkgPT4ge31cbiAgICB9O1xuXG4gICAgY29uc3QgY2hhaW4gPSB7XG4gICAgICAgIGRhdGE6IChjYiA9ICgpID0+IHt9KSA9PiB7XG4gICAgICAgICAgICBjYWxsYmFja3Mub25EYXRhID0gY2I7XG4gICAgICAgICAgICByZXR1cm4gY2hhaW47XG4gICAgICAgIH0sXG4gICAgICAgIGVycm9yOiAoY2IgPSAoKSA9PiB7fSkgPT4ge1xuICAgICAgICAgICAgY2FsbGJhY2tzLm9uRXJyb3IgPSBjYjtcbiAgICAgICAgICAgIHJldHVybiBjaGFpbjtcbiAgICAgICAgfVxuICAgIH07XG5cbiAgICBjb25zdCBldmVudEhhbmRsZXIgPSBhc3luYyBldmVudCA9PiB7XG4gICAgXG4gICAgICAgIHRyeSB7XG5cbiAgICAgICAgICAgIGNvbnN0IGpvYkRldGFpbHMgPSBhd2FpdCBmZXRjaEpvYkRldGFpbHMoZXZlbnQucmV0dXJuVmFsdWVzLmpvYklkLCBjb25maWcpO1xuICAgICAgICAgICAgY2FsbGJhY2tzLm9uRGF0YSh7XG4gICAgICAgICAgICAgICAgcmVjb3JkczogW2pvYkRldGFpbHNdLFxuICAgICAgICAgICAgICAgIGV2ZW50XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfSBjYXRjaChlcnIpIHtcbiAgICAgICAgICAgIGNhbGxiYWNrcy5vbkVycm9yKGVycik7XG4gICAgICAgIH0gICAgICAgICAgICBcbiAgICB9O1xuXG4gICAgKGFzeW5jICgpID0+IHtcblxuICAgICAgICBsZXQgam9iQ29udHJvbGxlciA9IGxvY2FsQ2FjaGUuZ2V0KCdqb2JDb250cm9sbGVyJyk7XG5cbiAgICAgICAgaWYgKCFqb2JDb250cm9sbGVyKSB7XG5cbiAgICAgICAgICAgIGpvYkNvbnRyb2xsZXIgPSBhd2FpdCBmZXRjaEpvYkNvbnRyb2xsZXJBZGRyZXNzKGNvbmZpZyk7XG4gICAgICAgIH1cbiAgICBcbiAgICAgICAgY29uc3QgamN0cmwgPSBuZXcgY29uZmlnLndlYjMuZXRoLkNvbnRyYWN0KGNvbmZpZy5jb250cmFjdHMuQ29nbml0aXZlSm9iQ29udHJvbGxlci5hYmksIGpvYkNvbnRyb2xsZXIpO1xuICAgICAgICBcbiAgICAgICAgLy8gV2UgbGlzdGVuIGZvciB0d28gZXZlbnRzIGJlY2F1c2Ugb2YgdGhlaXIgbmF0dXJlIG1lYW5zIGFsbW9zdCB0aGUgc2FtZVxuICAgICAgICBjaGFpbi5ldmVudCA9IFtdO1xuICAgICAgICBjaGFpbi5ldmVudC5wdXNoKGpjdHJsLmV2ZW50cy5Kb2JTdGF0ZUNoYW5nZWQob3B0aW9ucylcbiAgICAgICAgICAgIC5vbignZGF0YScsIGV2ZW50SGFuZGxlcilcbiAgICAgICAgICAgIC5vbignZXJyb3InLCBjYWxsYmFja3Mub25FcnJvcikpO1xuICAgICAgICBjaGFpbi5ldmVudC5wdXNoKGpjdHJsLmV2ZW50cy5Db2duaXRpb25Qcm9ncmVzc2VkKG9wdGlvbnMpXG4gICAgICAgICAgICAub24oJ2RhdGEnLCBldmVudEhhbmRsZXIpXG4gICAgICAgICAgICAub24oJ2Vycm9yJywgY2FsbGJhY2tzLm9uRXJyb3IpKTtcbiAgICB9KSgpO1xuXG4gICAgcmV0dXJuIGNoYWluO1xufTtcbiJdfQ==