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
  const progress = Math.ceil((await ipfsResults.reduce(async (progressPromise, result, index) => {
    const commonProgress = await progressPromise;
    let partProgress = 100 / ipfsResults.length;

    if (!result) {
      // If result not been provided by the worker 
      // then we fetching progress value from its contract
      partProgress = await (0, _workers.fetchJobProgress)(activeWorkers[index], config);
    }

    return commonProgress + partProgress;
  }, Promise.resolve(0))));
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
 * @returns {Promise<{Object}>} PPromise object resolved to the object with chained callbacks #data and #error
 */


exports.fetchAll = fetchAll;

const eventCognitiveJobCreated = async (options = {}, config = {}) => {
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
  chain.event.name = 'CognitiveJobCreated';
  return chain;
};
/**
 * Handle event JobStateChanged
 * 
 * @param {Object} options Event handler options
 * @param {Object} config Library config (provided by the proxy but can be overridden)
 * @returns {Promise<{Object}>} PPromise object resolved to the object with chained callbacks #data and #error
 */


exports.eventCognitiveJobCreated = eventCognitiveJobCreated;

const eventJobStateChanged = async (options = {}, config = {}) => {
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

  let jobController = localCache.get('jobController');

  if (!jobController) {
    jobController = await fetchJobControllerAddress(config);
  }

  const jctrl = new config.web3.eth.Contract(config.contracts.CognitiveJobController.abi, jobController); // We listen for two events because of their nature means almost the same

  chain.event = [];
  chain.event.push(jctrl.events.JobStateChanged(options).on('data', eventHandler).on('error', callbacks.onError));
  chain.event[0].name = 'JobStateChanged';
  chain.event.push(jctrl.events.CognitionProgressed(options).on('data', eventHandler).on('error', callbacks.onError));
  chain.event[1].name = 'CognitionProgressed';
  return chain;
};

exports.eventJobStateChanged = eventJobStateChanged;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9qb2JzLmpzIl0sIm5hbWVzIjpbImxvY2FsQ2FjaGUiLCJNYXAiLCJmZXRjaEpvYkNvbnRyb2xsZXJBZGRyZXNzIiwiY29uZmlnIiwiZXhwZWN0IiwiYWxsIiwidHlwZSIsImNvZGUiLCJXRUIzX1JFUVVJUkVEIiwiQUREUkVTU19SRVFVSVJFRCIsImFyZ3MiLCJDT05UUkFDVF9SRVFVSVJFRCIsInBhbiIsIndlYjMiLCJldGgiLCJDb250cmFjdCIsImNvbnRyYWN0cyIsIlBhbmRvcmEiLCJhYmkiLCJhZGRyZXNzZXMiLCJqb2JDb250cm9sbGVyIiwibWV0aG9kcyIsImNhbGwiLCJzZXQiLCJmZXRjaEFjdGl2ZUpvYnNDb3VudCIsImdldCIsImpjdHJsIiwiQ29nbml0aXZlSm9iQ29udHJvbGxlciIsImNvdW50IiwiYWN0aXZlSm9ic0NvdW50IiwiTnVtYmVyIiwicGFyc2VJbnQiLCJmZXRjaENvbXBsZXRlZEpvYnNDb3VudCIsImNvbXBsZXRlZEpvYnNDb3VudCIsImZldGNoU2VydmljZUluZm8iLCJhZGRyZXNzIiwicmVzcG9uc2VUaW1lc3RhbXBzIiwicmVzcG9uc2VGbGFncyIsImdldENvZ25pdGl2ZUpvYlNlcnZpY2VJbmZvIiwiZmV0Y2hKb2JEZXRhaWxzIiwia2VybmVsIiwiZGF0YXNldCIsImNvbXBsZXhpdHkiLCJkZXNjcmlwdGlvbiIsImFjdGl2ZVdvcmtlcnMiLCJzdGF0ZSIsImdldENvZ25pdGl2ZUpvYkRldGFpbHMiLCJrZXJuZWxJcGZzIiwiZGF0YXNldElwZnMiLCJpcGZzUmVzdWx0cyIsIlByb21pc2UiLCJtYXAiLCJfIiwiaW5kZXgiLCJnZXRDb2duaXRpdmVKb2JSZXN1bHRzIiwidXRmOGRlc2NyaXB0aW9uIiwidXRpbHMiLCJoZXhUb1V0ZjgiLCJzZXJ2aWNlSW5mbyIsInByb2dyZXNzIiwiTWF0aCIsImNlaWwiLCJyZWR1Y2UiLCJwcm9ncmVzc1Byb21pc2UiLCJyZXN1bHQiLCJjb21tb25Qcm9ncmVzcyIsInBhcnRQcm9ncmVzcyIsImxlbmd0aCIsInJlc29sdmUiLCJmaWx0ZXIiLCJyZXMiLCJzdWJzdHIiLCJqb2JUeXBlIiwiZmV0Y2hKb2JzSWRzIiwic291cmNlIiwidmFsdWVzIiwiY291bnRzIiwiQXJyYXkiLCJrZXlzIiwiZ2V0Sm9iSWQiLCJjcmVhdGUiLCJkZXBvc2l0IiwiZnJvbSIsInJlamVjdCIsImdhc1ByaWNlIiwiZ2V0R2FzUHJpY2UiLCJjcmVhdGVDb2duaXRpdmVKb2IiLCJ1dGY4VG9IZXgiLCJ0cmltIiwic2VuZCIsInZhbHVlIiwidG9XZWkiLCJTdHJpbmciLCJnYXMiLCJvbiIsInJlY2VpcHQiLCJzdGF0dXMiLCJUUkFOU0FDVElPTl9VTlNVQ0NFU1NGVUwiLCJldmVudHMiLCJDb2duaXRpdmVKb2JRdWV1ZWQiLCJyZXR1cm5WYWx1ZXMiLCJqb2JJZCIsIkNvZ25pdGl2ZUpvYkNyZWF0ZWQiLCJlcnIiLCJmZXRjaEFsbCIsInJlY29yZHMiLCJlcnJvciIsImFjdGl2ZUNvdW50IiwiY29tcGxldGVkQ291bnQiLCJhY3RpdmVKb2JzSWRzIiwiY29tcGxldGVkSm9ic0lkcyIsImFsbEpvYnNJZHMiLCJwdXNoIiwibWVzc2FnZSIsImV2ZW50Q29nbml0aXZlSm9iQ3JlYXRlZCIsIm9wdGlvbnMiLCJjYWxsYmFja3MiLCJvbkRhdGEiLCJvbkVycm9yIiwiY2hhaW4iLCJkYXRhIiwiY2IiLCJldmVudCIsImpvYkRldGFpbHMiLCJuYW1lIiwiZXZlbnRKb2JTdGF0ZUNoYW5nZWQiLCJldmVudEhhbmRsZXIiLCJKb2JTdGF0ZUNoYW5nZWQiLCJDb2duaXRpb25Qcm9ncmVzc2VkIl0sIm1hcHBpbmdzIjoiQUFBQTs7Ozs7Ozs7QUFTQTs7Ozs7OztBQUVBOztBQUNBOztBQU9BOztBQUlBOztBQUdBOzs7O0FBSUEsTUFBTUEsVUFBVSxHQUFHLElBQUlDLEdBQUosRUFBbkI7QUFFQTs7Ozs7OztBQU1PLE1BQU1DLHlCQUF5QixHQUFHLE9BQU9DLE1BQU0sR0FBRyxFQUFoQixLQUF1QjtBQUU1REMsRUFBQUEs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QUFLLENBQUNHLEtBQU4sQ0FBWVYsSUFBWixDQUFpQnRGLEtBQUssQ0FBQ3dFLE1BQU4sQ0FBYTZCLGVBQWIsQ0FBNkJaLE9BQTdCLEVBQ1pyQixFQURZLENBQ1QsTUFEUyxFQUNEZ0MsWUFEQyxFQUVaaEMsRUFGWSxDQUVULE9BRlMsRUFFQXNCLFNBQVMsQ0FBQ0UsT0FGVixDQUFqQjtBQUdBQyxFQUFBQSxLQUFLLENBQUNHLEtBQU4sQ0FBWSxDQUFaLEVBQWVFLElBQWYsR0FBc0IsaUJBQXRCO0FBRUFMLEVBQUFBLEtBQUssQ0FBQ0csS0FBTixDQUFZVixJQUFaLENBQWlCdEYsS0FBSyxDQUFDd0UsTUFBTixDQUFhOEIsbUJBQWIsQ0FBaUNiLE9BQWpDLEVBQ1pyQixFQURZLENBQ1QsTUFEUyxFQUNEZ0MsWUFEQyxFQUVaaEMsRUFGWSxDQUVULE9BRlMsRUFFQXNCLFNBQVMsQ0FBQ0UsT0FGVixDQUFqQjtBQUdBQyxFQUFBQSxLQUFLLENBQUNHLEtBQU4sQ0FBWSxDQUFaLEVBQWVFLElBQWYsR0FBc0IscUJBQXRCO0FBRUEsU0FBT0wsS0FBUDtBQUNILENBOUVNIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBDb2duaXRpdmUgSm9icyByZWxhdGVkIG1ldGhvZHNcbiAqIFRoaXMgZmlsZSBpdCBpcyBhIHBhcnQgb2YgdGhlIFBhbmRvcmEgUHlycmhhIEphdmFzY3JpcHQgbGlicmFyeVxuICogXG4gKiBAZmlsZSBqb2JzLmpzXG4gKiBAYXV0aG9yIEtvc3RpYW50eW4gU215cm5vdiA8a29zdHlzaEBnbWFpbC5jb20+XG4gKiBAZGF0ZSAyMDE4XG4gKi9cblxuJ3VzZSBzdHJpY3QnO1xuXG5pbXBvcnQgKiBhcyBleHBlY3QgZnJvbSAnLi9oZWxwZXJzL2V4cGVjdCc7XG5pbXBvcnQgcGpzRXJyb3IsIHtcbiAgICBDT05UUkFDVF9SRVFVSVJFRCxcbiAgICBBRERSRVNTX1JFUVVJUkVELFxuICAgIFdFQjNfUkVRVUlSRUQsXG4gICAgVFJBTlNBQ1RJT05fVU5TVUNDRVNTRlVMXG59IGZyb20gJy4vaGVscGVycy9lcnJvcnMnO1xuXG5pbXBvcnQge1xuICAgIGZldGNoSXBmc0FkZHJlc3MgYXMgZmV0Y2hJcGZzQWRkcmVzc0J5S2VybmVsQWRkcmVzc1xufSBmcm9tICcuL2tlcm5lbHMnO1xuXG5pbXBvcnQge1xuICAgIGZldGNoSXBmc0FkZHJlc3MgYXMgZmV0Y2hJcGZzQWRkcmVzc0J5RGF0YXNldEFkZHJlc3Ncbn0gZnJvbSAnLi9kYXRhc2V0cyc7XG5pbXBvcnQge1xuICAgIGZldGNoSm9iUHJvZ3Jlc3MgYXMgZmV0Y2hXb3JrZXJzQWN0aXZlSm9iUHJvZ3Jlc3Ncbn0gZnJvbSAnLi93b3JrZXJzJztcblxuY29uc3QgbG9jYWxDYWNoZSA9IG5ldyBNYXAoKTtcblxuLyoqXG4gKiBHZXQgam9iIGNvbnRyb2xsZXIgYWRkcmVzc1xuICogXG4gKiBAcGFyYW0ge09iamVjdH0gY29uZmlnIExpYnJhcnkgY29uZmlnIChwcm92aWRlZCBieSB0aGUgcHJveHkgYnV0IGNhbiBiZSBvdmVycmlkZGVuKVxuICogQHJldHVybnMge1Byb21pc2U8e1N0cmluZ30+fSBcbiAqL1xuZXhwb3J0IGNvbnN0IGZldGNoSm9iQ29udHJvbGxlckFkZHJlc3MgPSBhc3luYyAoY29uZmlnID0ge30pID0+IHtcblxuICAgIGV4cGVjdC5hbGwoY29uZmlnLCB7XG4gICAgICAgICd3ZWIzJzoge1xuICAgICAgICAgICAgdHlwZTogJ29iamVjdCcsXG4gICAgICAgICAgICBjb2RlOiBXRUIzX1JFUVVJUkVEXG4gICAgICAgIH0sXG4gICAgICAgICdhZGRyZXNzZXMuUGFuZG9yYSc6IHtcbiAgICAgICAgICAgIHR5cGU6ICdhZGRyZXNzJyxcbiAgICAgICAgICAgIGNvZGU6IEFERFJFU1NfUkVRVUlSRUQsXG4gICAgICAgICAgICBhcmdzOiBbJ1BhbmRvcmEnXVxuICAgICAgICB9LFxuICAgICAgICAnY29udHJhY3RzLlBhbmRvcmEuYWJpJzoge1xuICAgICAgICAgICAgdHlwZTogJ29iamVjdCcsXG4gICAgICAgICAgICBjb2RlOiBDT05UUkFDVF9SRVFVSVJFRCxcbiAgICAgICAgICAgIGFyZ3M6IFsnUGFuZG9yYSddXG4gICAgICAgIH1cbiAgICB9KTtcblxuICAgIGNvbnN0IHBhbiA9IG5ldyBjb25maWcud2ViMy5ldGguQ29udHJhY3QoY29uZmlnLmNvbnRyYWN0cy5QYW5kb3JhLmFiaSwgY29uZmlnLmFkZHJlc3Nlcy5QYW5kb3JhKTtcbiAgICBjb25zdCBqb2JDb250cm9sbGVyID0gYXdhaXQgcGFuLm1ldGhvZHNcbiAgICAgICAgLmpvYkNvbnRyb2xsZXIoKVxuICAgICAgICAuY2FsbCgpO1xuXG4gICAgLy8gc2F2ZSBmb3IgbGF0ZXIgdXNlXG4gICAgbG9jYWxDYWNoZS5zZXQoJ2pvYkNvbnRyb2xsZXInLCBqb2JDb250cm9sbGVyKTtcbiAgICAgICAgXG4gICAgcmV0dXJuIGpvYkNvbnRyb2xsZXI7XG59O1xuXG4vKipcbiAqIEdldCBhY3RpdmUgam9icyBjb3VudCBcbiAqIFxuICogQHBhcmFtIHtPYmplY3R9IGNvbmZpZyBMaWJyYXJ5IGNvbmZpZyAocHJvdmlkZWQgYnkgdGhlIHByb3h5IGJ1dCBjYW4gYmUgb3ZlcnJpZGRlbilcbiAqIEByZXR1cm5zIHtQcm9taXNlPHtOdW1iZXJ9Pn0gXG4gKi9cbmV4cG9ydCBjb25zdCBmZXRjaEFjdGl2ZUpvYnNDb3VudCA9IGFzeW5jIChjb25maWcgPSB7fSkgPT4ge1xuXG4gICAgZXhwZWN0LmFsbChjb25maWcsIHtcbiAgICAgICAgJ3dlYjMnOiB7XG4gICAgICAgICAgICB0eXBlOiAnb2JqZWN0JyxcbiAgICAgICAgICAgIGNvZGU6IFdFQjNfUkVRVUlSRURcbiAgICAgICAgfSxcbiAgICAgICAgJ2NvbnRyYWN0cy5Db2duaXRpdmVKb2JDb250cm9sbGVyLmFiaSc6IHtcbiAgICAgICAgICAgIHR5cGU6ICdvYmplY3QnLFxuICAgICAgICAgICAgY29kZTogQ09OVFJBQ1RfUkVRVUlSRUQsXG4gICAgICAgICAgICBhcmdzOiBbJ0NvZ25pdGl2ZUpvYkNvbnRyb2xsZXInXVxuICAgICAgICB9XG4gICAgfSk7XG5cbiAgICBsZXQgam9iQ29udHJvbGxlciA9IGxvY2FsQ2FjaGUuZ2V0KCdqb2JDb250cm9sbGVyJyk7XG5cbiAgICBpZiAoIWpvYkNvbnRyb2xsZXIpIHtcblxuICAgICAgICBqb2JDb250cm9sbGVyID0gYXdhaXQgZmV0Y2hKb2JDb250cm9sbGVyQWRkcmVzcyhjb25maWcpO1xuICAgIH1cblxuICAgIGNvbnN0IGpjdHJsID0gbmV3IGNvbmZpZy53ZWIzLmV0aC5Db250cmFjdChjb25maWcuY29udHJhY3RzLkNvZ25pdGl2ZUpvYkNvbnRyb2xsZXIuYWJpLCBqb2JDb250cm9sbGVyKTtcbiAgICBjb25zdCBjb3VudCA9IGF3YWl0IGpjdHJsLm1ldGhvZHNcbiAgICAgICAgLmFjdGl2ZUpvYnNDb3VudCgpXG4gICAgICAgIC5jYWxsKCk7XG4gICAgICAgIFxuICAgIHJldHVybiBOdW1iZXIucGFyc2VJbnQoY291bnQsIDEwKTtcbn07XG5cbi8qKlxuICogR2V0IGNvbXBsZXRlZCBqb2JzIGNvdW50IFxuICogXG4gKiBAcGFyYW0ge09iamVjdH0gY29uZmlnIExpYnJhcnkgY29uZmlnIChwcm92aWRlZCBieSB0aGUgcHJveHkgYnV0IGNhbiBiZSBvdmVycmlkZGVuKVxuICogQHJldHVybnMge1Byb21pc2U8e051bWJlcn0+fSBcbiAqL1xuZXhwb3J0IGNvbnN0IGZldGNoQ29tcGxldGVkSm9ic0NvdW50ID0gYXN5bmMgKGNvbmZpZyA9IHt9KSA9PiB7XG5cbiAgICBleHBlY3QuYWxsKGNvbmZpZywge1xuICAgICAgICAnd2ViMyc6IHtcbiAgICAgICAgICAgIHR5cGU6ICdvYmplY3QnLFxuICAgICAgICAgICAgY29kZTogV0VCM19SRVFVSVJFRFxuICAgICAgICB9LFxuICAgICAgICAnY29udHJhY3RzLkNvZ25pdGl2ZUpvYkNvbnRyb2xsZXIuYWJpJzoge1xuICAgICAgICAgICAgdHlwZTogJ29iamVjdCcsXG4gICAgICAgICAgICBjb2RlOiBDT05UUkFDVF9SRVFVSVJFRCxcbiAgICAgICAgICAgIGFyZ3M6IFsnQ29nbml0aXZlSm9iQ29udHJvbGxlciddXG4gICAgICAgIH1cbiAgICB9KTtcblxuICAgIGxldCBqb2JDb250cm9sbGVyID0gbG9jYWxDYWNoZS5nZXQoJ2pvYkNvbnRyb2xsZXInKTtcblxuICAgIGlmICgham9iQ29udHJvbGxlcikge1xuXG4gICAgICAgIGpvYkNvbnRyb2xsZXIgPSBhd2FpdCBmZXRjaEpvYkNvbnRyb2xsZXJBZGRyZXNzKGNvbmZpZyk7XG4gICAgfVxuXG4gICAgY29uc3QgamN0cmwgPSBuZXcgY29uZmlnLndlYjMuZXRoLkNvbnRyYWN0KGNvbmZpZy5jb250cmFjdHMuQ29nbml0aXZlSm9iQ29udHJvbGxlci5hYmksIGpvYkNvbnRyb2xsZXIpO1xuICAgIGNvbnN0IGNvdW50ID0gYXdhaXQgamN0cmwubWV0aG9kc1xuICAgICAgICAuY29tcGxldGVkSm9ic0NvdW50KClcbiAgICAgICAgLmNhbGwoKTtcbiAgICAgICAgXG4gICAgcmV0dXJuIE51bWJlci5wYXJzZUludChjb3VudCwgMTApO1xufTtcblxuLyoqXG4gKiBHZXQgam9iIHNlcnZpY2UgaW5mbyBcbiAqIFxuICogQHBhcmFtIHtTdHJpbmd9IGFkZHJlc3MgSm9iIGFkZHJlc3NcbiAqIEBwYXJhbSB7T2JqZWN0fSBjb25maWcgTGlicmFyeSBjb25maWcgKHByb3ZpZGVkIGJ5IHRoZSBwcm94eSBidXQgY2FuIGJlIG92ZXJyaWRkZW4pXG4gKiBAcmV0dXJucyB7UHJvbWlzZTx7TnVtYmVyfT59IFxuICovXG5leHBvcnQgY29uc3QgZmV0Y2hTZXJ2aWNlSW5mbyA9IGFzeW5jIChhZGRyZXNzLCBjb25maWcgPSB7fSkgPT4ge1xuXG4gICAgZXhwZWN0LmFsbChjb25maWcsIHtcbiAgICAgICAgJ3dlYjMnOiB7XG4gICAgICAgICAgICB0eXBlOiAnb2JqZWN0JyxcbiAgICAgICAgICAgIGNvZGU6IFdFQjNfUkVRVUlSRURcbiAgICAgICAgfSxcbiAgICAgICAgJ2NvbnRyYWN0cy5Db2duaXRpdmVKb2JDb250cm9sbGVyLmFiaSc6IHtcbiAgICAgICAgICAgIHR5cGU6ICdvYmplY3QnLFxuICAgICAgICAgICAgY29kZTogQ09OVFJBQ1RfUkVRVUlSRUQsXG4gICAgICAgICAgICBhcmdzOiBbJ0NvZ25pdGl2ZUpvYkNvbnRyb2xsZXInXVxuICAgICAgICB9XG4gICAgfSk7XG5cbiAgICBsZXQgam9iQ29udHJvbGxlciA9IGxvY2FsQ2FjaGUuZ2V0KCdqb2JDb250cm9sbGVyJyk7XG5cbiAgICBpZiAoIWpvYkNvbnRyb2xsZXIpIHtcblxuICAgICAgICBqb2JDb250cm9sbGVyID0gYXdhaXQgZmV0Y2hKb2JDb250cm9sbGVyQWRkcmVzcyhjb25maWcpO1xuICAgIH1cblxuICAgIGNvbnN0IGpjdHJsID0gbmV3IGNvbmZpZy53ZWIzLmV0aC5Db250cmFjdChjb25maWcuY29udHJhY3RzLkNvZ25pdGl2ZUpvYkNvbnRyb2xsZXIuYWJpLCBqb2JDb250cm9sbGVyKTtcblxuICAgIGNvbnN0IHsgcmVzcG9uc2VUaW1lc3RhbXBzLCByZXNwb25zZUZsYWdzIH0gPSBhd2FpdCBqY3RybC5tZXRob2RzXG4gICAgICAgIC5nZXRDb2duaXRpdmVKb2JTZXJ2aWNlSW5mbyhhZGRyZXNzKVxuICAgICAgICAuY2FsbCgpO1xuXG4gICAgcmV0dXJuIHsgXG4gICAgICAgIHJlc3BvbnNlVGltZXN0YW1wcywgXG4gICAgICAgIHJlc3BvbnNlRmxhZ3MgXG4gICAgfTtcbn07XG5cbi8qKlxuICogR2V0IGpvYiBkZXRhaWxzIFxuICogXG4gKiBAcGFyYW0ge1N0cmluZ30gYWRkcmVzcyBKb2IgYWRkcmVzc1xuICogQHBhcmFtIHtPYmplY3R9IGNvbmZpZyBMaWJyYXJ5IGNvbmZpZyAocHJvdmlkZWQgYnkgdGhlIHByb3h5IGJ1dCBjYW4gYmUgb3ZlcnJpZGRlbilcbiAqIEByZXR1cm5zIHtQcm9taXNlPHtOdW1iZXJ9Pn0gXG4gKi9cbmV4cG9ydCBjb25zdCBmZXRjaEpvYkRldGFpbHMgPSBhc3luYyAoYWRkcmVzcywgY29uZmlnID0ge30pID0+IHtcblxuICAgIGV4cGVjdC5hbGwoY29uZmlnLCB7XG4gICAgICAgICd3ZWIzJzoge1xuICAgICAgICAgICAgdHlwZTogJ29iamVjdCcsXG4gICAgICAgICAgICBjb2RlOiBXRUIzX1JFUVVJUkVEXG4gICAgICAgIH0sXG4gICAgICAgICdjb250cmFjdHMuQ29nbml0aXZlSm9iQ29udHJvbGxlci5hYmknOiB7XG4gICAgICAgICAgICB0eXBlOiAnb2JqZWN0JyxcbiAgICAgICAgICAgIGNvZGU6IENPTlRSQUNUX1JFUVVJUkVELFxuICAgICAgICAgICAgYXJnczogWydDb2duaXRpdmVKb2JDb250cm9sbGVyJ11cbiAgICAgICAgfVxuICAgIH0pO1xuXG4gICAgbGV0IGpvYkNvbnRyb2xsZXIgPSBsb2NhbENhY2hlLmdldCgnam9iQ29udHJvbGxlcicpO1xuXG4gICAgaWYgKCFqb2JDb250cm9sbGVyKSB7XG5cbiAgICAgICAgam9iQ29udHJvbGxlciA9IGF3YWl0IGZldGNoSm9iQ29udHJvbGxlckFkZHJlc3MoY29uZmlnKTtcbiAgICB9XG5cbiAgICBjb25zdCBqY3RybCA9IG5ldyBjb25maWcud2ViMy5ldGguQ29udHJhY3QoY29uZmlnLmNvbnRyYWN0cy5Db2duaXRpdmVKb2JDb250cm9sbGVyLmFiaSwgam9iQ29udHJvbGxlcik7XG4gICAgXG4gICAgY29uc3QgeyBrZXJuZWwsIGRhdGFzZXQsIGNvbXBsZXhpdHksIGRlc2NyaXB0aW9uLCBhY3RpdmVXb3JrZXJzLCBzdGF0ZSB9ID0gYXdhaXQgamN0cmwubWV0aG9kc1xuICAgICAgICAuZ2V0Q29nbml0aXZlSm9iRGV0YWlscyhhZGRyZXNzKVxuICAgICAgICAuY2FsbCgpO1xuICAgIGNvbnN0IGtlcm5lbElwZnMgPSBhd2FpdCBmZXRjaElwZnNBZGRyZXNzQnlLZXJuZWxBZGRyZXNzKGtlcm5lbCwgY29uZmlnKTtcbiAgICBjb25zdCBkYXRhc2V0SXBmcyA9IGF3YWl0IGZldGNoSXBmc0FkZHJlc3NCeURhdGFzZXRBZGRyZXNzKGRhdGFzZXQsIGNvbmZpZyk7XG4gICAgY29uc3QgaXBmc1Jlc3VsdHMgPSBhd2FpdCBQcm9taXNlLmFsbChhY3RpdmVXb3JrZXJzLm1hcCgoXywgaW5kZXgpID0+IGpjdHJsLm1ldGhvZHMuZ2V0Q29nbml0aXZlSm9iUmVzdWx0cyhhZGRyZXNzLCBpbmRleCkuY2FsbCgpKSk7ICAgIFxuICAgIGNvbnN0IHV0ZjhkZXNjcmlwdGlvbiA9IGRlc2NyaXB0aW9uID8gY29uZmlnLndlYjMudXRpbHMuaGV4VG9VdGY4KGRlc2NyaXB0aW9uKSA6ICcnO1xuICAgIGNvbnN0IHNlcnZpY2VJbmZvID0gYXdhaXQgZmV0Y2hTZXJ2aWNlSW5mbyhhZGRyZXNzLCBjb25maWcpO1xuXG4gICAgY29uc3QgcHJvZ3Jlc3MgPSBNYXRoLmNlaWwoYXdhaXQgaXBmc1Jlc3VsdHMucmVkdWNlKGFzeW5jIChwcm9ncmVzc1Byb21pc2UsIHJlc3VsdCwgaW5kZXgpID0+IHtcbiAgICAgICAgY29uc3QgY29tbW9uUHJvZ3Jlc3MgPSBhd2FpdCBwcm9ncmVzc1Byb21pc2U7XG4gICAgICAgIGxldCBwYXJ0UHJvZ3Jlc3MgPSAxMDAgLyBpcGZzUmVzdWx0cy5sZW5ndGg7XG5cbiAgICAgICAgaWYgKCFyZXN1bHQpIHtcblxuICAgICAgICAgICAgLy8gSWYgcmVzdWx0IG5vdCBiZWVuIHByb3ZpZGVkIGJ5IHRoZSB3b3JrZXIgXG4gICAgICAgICAgICAvLyB0aGVuIHdlIGZldGNoaW5nIHByb2dyZXNzIHZhbHVlIGZyb20gaXRzIGNvbnRyYWN0XG4gICAgICAgICAgICBwYXJ0UHJvZ3Jlc3MgPSBhd2FpdCBmZXRjaFdvcmtlcnNBY3RpdmVKb2JQcm9ncmVzcyhhY3RpdmVXb3JrZXJzW2luZGV4XSwgY29uZmlnKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiBjb21tb25Qcm9ncmVzcyArIHBhcnRQcm9ncmVzcztcbiAgICB9LCBQcm9taXNlLnJlc29sdmUoMCkpKTtcblxuICAgIHJldHVybiB7XG4gICAgICAgIGFkZHJlc3MsIFxuICAgICAgICBrZXJuZWwsXG4gICAgICAgIGtlcm5lbElwZnMsXG4gICAgICAgIGRhdGFzZXQsXG4gICAgICAgIGRhdGFzZXRJcGZzLFxuICAgICAgICBhY3RpdmVXb3JrZXJzLFxuICAgICAgICBpcGZzUmVzdWx0czogaXBmc1Jlc3VsdHMubWFwKHJlc3VsdCA9PiByZXN1bHQgPyBjb25maWcud2ViMy51dGlscy5oZXhUb1V0ZjgocmVzdWx0KSA6IHJlc3VsdCkuZmlsdGVyKHJlcyA9PiByZXMpLFxuICAgICAgICBjb21wbGV4aXR5OiBOdW1iZXIoY29tcGxleGl0eSksXG4gICAgICAgIHByb2dyZXNzOiBwcm9ncmVzcyA+IDEwMCA/IDEwMCA6IHByb2dyZXNzLFxuICAgICAgICBzdGF0ZTogTnVtYmVyKHN0YXRlKSxcbiAgICAgICAgZGVzY3JpcHRpb246IHV0ZjhkZXNjcmlwdGlvbi5zdWJzdHIoMiksXG4gICAgICAgIGpvYlR5cGU6IHV0ZjhkZXNjcmlwdGlvbi5zdWJzdHIoMCwgMSksXG4gICAgICAgIHNlcnZpY2VJbmZvXG4gICAgfTtcbn07XG5cbi8qKlxuICogR2V0IGpvYnMgSWQgZnJvbSB0aGUgXCJzb3VyY2VcIlxuICogXG4gKiBAcGFyYW0ge1N0cmluZ30gZnJvbSBzb3VyY2UgYWN0aXZlSm9icyBvciBjb21wbGV0ZWRKb2JzXG4gKiBAcGFyYW0ge051bWJlcn0gY291bnRcbiAqIEBwYXJhbSB7T2JqZWN0fSBvcHRpb25zXG4gKiBAcmV0dXJucyB7UHJvbWlzZTxbe1N0cmluZ31dPn0gXG4gKi9cbmV4cG9ydCBjb25zdCBmZXRjaEpvYnNJZHMgPSBhc3luYyAoc291cmNlLCBjb3VudCA9IDAsIGNvbmZpZyA9IHt9KSA9PiB7XG5cbiAgICBleHBlY3QuYWxsKHsgc291cmNlIH0sIHtcbiAgICAgICAgJ3NvdXJjZSc6IHtcbiAgICAgICAgICAgIHR5cGU6ICdlbnVtJyxcbiAgICAgICAgICAgIHZhbHVlczogWydhY3RpdmVKb2JzJywgJ2NvbXBsZXRlZEpvYnMnXVxuICAgICAgICB9XG4gICAgfSk7XG5cbiAgICBleHBlY3QuYWxsKGNvbmZpZywge1xuICAgICAgICAnd2ViMyc6IHtcbiAgICAgICAgICAgIHR5cGU6ICdvYmplY3QnLFxuICAgICAgICAgICAgY29kZTogV0VCM19SRVFVSVJFRFxuICAgICAgICB9LFxuICAgICAgICAnY29udHJhY3RzLkNvZ25pdGl2ZUpvYkNvbnRyb2xsZXIuYWJpJzoge1xuICAgICAgICAgICAgdHlwZTogJ29iamVjdCcsXG4gICAgICAgICAgICBjb2RlOiBDT05UUkFDVF9SRVFVSVJFRCxcbiAgICAgICAgICAgIGFyZ3M6IFsnQ29nbml0aXZlSm9iQ29udHJvbGxlciddXG4gICAgICAgIH1cbiAgICB9KTsgICAgXG5cbiAgICBsZXQgam9iQ29udHJvbGxlciA9IGxvY2FsQ2FjaGUuZ2V0KCdqb2JDb250cm9sbGVyJyk7XG5cbiAgICBpZiAoIWpvYkNvbnRyb2xsZXIpIHtcblxuICAgICAgICBqb2JDb250cm9sbGVyID0gYXdhaXQgZmV0Y2hKb2JDb250cm9sbGVyQWRkcmVzcyhjb25maWcpO1xuICAgIH1cblxuICAgIC8vIG51bWJlcnMgc2VxdWVuY2UgZnJvbSAwIHRvIGNvdW50XG4gICAgY29uc3QgY291bnRzID0gWy4uLkFycmF5KGNvdW50KS5rZXlzKCldO1xuXG4gICAgY29uc3QgamN0cmwgPSBuZXcgY29uZmlnLndlYjMuZXRoLkNvbnRyYWN0KGNvbmZpZy5jb250cmFjdHMuQ29nbml0aXZlSm9iQ29udHJvbGxlci5hYmksIGpvYkNvbnRyb2xsZXIpO1xuICAgIGNvbnN0IGFkZHJlc3NlcyA9IGF3YWl0IFByb21pc2UuYWxsKGNvdW50cy5tYXAoaW5kZXggPT4gamN0cmwubWV0aG9kcy5nZXRKb2JJZChpbmRleCwgc291cmNlID09PSAnYWN0aXZlSm9icycpLmNhbGwoKSkpO1xuICAgICAgICBcbiAgICByZXR1cm4gYWRkcmVzc2VzO1xufTtcblxuLyoqXG4gKiBDcmVhdGUgY29nbml0aXZlIGpvYiBjb250cmFjdFxuICogXG4gKiBAcGFyYW0ge09iamVjdH0gb3B0aW9uc1xuICogQHBhcmFtIHtTdHJpbmd9IGZyb20gUHVibGlzaGVyIGFkZHJlc3NcbiAqIEBwYXJhbSB7T2JqZWN0fSBjb25maWcgTGlicmFyeSBjb25maWcgKHByb3ZpZGVkIGJ5IHRoZSBwcm94eSBidXQgY2FuIGJlIG92ZXJyaWRkZW4pXG4gKiBAcmV0dXJucyB7UHJvbWlzZX0gUHJvbWlzZSBvYmplY3QgcmVzb2x2ZWQgdG8gYWRkIHN0YXR1cyAoYm9vbGVhbilcbiAqL1xuZXhwb3J0IGNvbnN0IGNyZWF0ZSA9ICh7a2VybmVsLCBkYXRhc2V0LCBjb21wbGV4aXR5LCBqb2JUeXBlLCBkZXNjcmlwdGlvbiwgZGVwb3NpdH0sIGZyb20sIGNvbmZpZyA9IHt9KSA9PiBuZXcgUHJvbWlzZShhc3luYyAocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG5cbiAgICBleHBlY3QuYWxsKHsga2VybmVsLCBkYXRhc2V0LCBjb21wbGV4aXR5LCBqb2JUeXBlLCBkZXNjcmlwdGlvbiwgZGVwb3NpdCwgZnJvbSB9LCB7XG4gICAgICAgICdrZXJuZWwnOiB7XG4gICAgICAgICAgICB0eXBlOiAnYWRkcmVzcydcbiAgICAgICAgfSxcbiAgICAgICAgJ2RhdGFzZXQnOiB7XG4gICAgICAgICAgICB0eXBlOiAnYWRkcmVzcydcbiAgICAgICAgfSxcbiAgICAgICAgJ2NvbXBsZXhpdHknOiB7XG4gICAgICAgICAgICB0eXBlOiAnbnVtYmVyJ1xuICAgICAgICB9LFxuICAgICAgICAnam9iVHlwZSc6IHtcbiAgICAgICAgICAgIHR5cGU6ICdzdHJpbmcnXG4gICAgICAgIH0sXG4gICAgICAgICdkZXNjcmlwdGlvbic6IHtcbiAgICAgICAgICAgIHR5cGU6ICdzdHJpbmcnXG4gICAgICAgIH0sXG4gICAgICAgICdkZXBvc2l0Jzoge1xuICAgICAgICAgICAgdHlwZTogJ251bWJlcidcbiAgICAgICAgfSxcbiAgICAgICAgJ2Zyb20nOiB7XG4gICAgICAgICAgICB0eXBlOiAnYWRkcmVzcydcbiAgICAgICAgfVxuICAgIH0pO1xuXG4gICAgZXhwZWN0LmFsbChjb25maWcsIHtcbiAgICAgICAgJ3dlYjMnOiB7XG4gICAgICAgICAgICB0eXBlOiAnb2JqZWN0JyxcbiAgICAgICAgICAgIGNvZGU6IFdFQjNfUkVRVUlSRURcbiAgICAgICAgfSxcbiAgICAgICAgJ2NvbnRyYWN0cy5QYW5kb3JhLmFiaSc6IHtcbiAgICAgICAgICAgIHR5cGU6ICdvYmplY3QnLFxuICAgICAgICAgICAgY29kZTogQ09OVFJBQ1RfUkVRVUlSRUQsXG4gICAgICAgICAgICBhcmdzOiBbJ1BhbmRvcmEnXVxuICAgICAgICB9LFxuICAgICAgICAnYWRkcmVzc2VzLlBhbmRvcmEnOiB7XG4gICAgICAgICAgICB0eXBlOiAnYWRkcmVzcycsXG4gICAgICAgICAgICBjb2RlOiBBRERSRVNTX1JFUVVJUkVELFxuICAgICAgICAgICAgYXJnczogWydQYW5kb3JhJ11cbiAgICAgICAgfVxuICAgIH0pO1xuXG4gICAgY29uc3QgcGFuID0gbmV3IGNvbmZpZy53ZWIzLmV0aC5Db250cmFjdChjb25maWcuY29udHJhY3RzLlBhbmRvcmEuYWJpLCBjb25maWcuYWRkcmVzc2VzLlBhbmRvcmEpO1xuICAgIGNvbnN0IGdhc1ByaWNlID0gYXdhaXQgY29uZmlnLndlYjMuZXRoLmdldEdhc1ByaWNlKCk7XG4gICAgcGFuLm1ldGhvZHNcbiAgICAgICAgLmNyZWF0ZUNvZ25pdGl2ZUpvYihrZXJuZWwsIGRhdGFzZXQsIGNvbXBsZXhpdHksIGNvbmZpZy53ZWIzLnV0aWxzLnV0ZjhUb0hleChgJHtqb2JUeXBlfTske2Rlc2NyaXB0aW9uLnRyaW0oKX1gKSlcbiAgICAgICAgLnNlbmQoe1xuICAgICAgICAgICAgdmFsdWU6IGNvbmZpZy53ZWIzLnV0aWxzLnRvV2VpKFN0cmluZyhkZXBvc2l0KSksXG4gICAgICAgICAgICBmcm9tLFxuICAgICAgICAgICAgZ2FzUHJpY2UsXG4gICAgICAgICAgICBnYXM6IDY3MDAwMDAvLyBiZWNhdXNlIHRoaXMgd29ya2Zsb3cgaXMgdG9vIGdyZWVkeVxuICAgICAgICB9KVxuICAgICAgICAub24oJ2Vycm9yJywgcmVqZWN0KVxuICAgICAgICAub24oJ3JlY2VpcHQnLCByZWNlaXB0ID0+IHtcblxuICAgICAgICAgICAgdHJ5IHtcblxuICAgICAgICAgICAgICAgIGlmIChOdW1iZXIocmVjZWlwdC5zdGF0dXMpID09PSAwKSB7XG5cbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHJlamVjdChwanNFcnJvcihUUkFOU0FDVElPTl9VTlNVQ0NFU1NGVUwpKTtcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICBpZiAocmVjZWlwdC5ldmVudHMuQ29nbml0aXZlSm9iUXVldWVkKSB7XG4gICAgXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiByZXNvbHZlKHJlY2VpcHQuZXZlbnRzLkNvZ25pdGl2ZUpvYlF1ZXVlZC5yZXR1cm5WYWx1ZXMuam9iSWQpO1xuICAgICAgICAgICAgICAgIH1cbiAgICBcbiAgICAgICAgICAgICAgICByZXNvbHZlKHJlY2VpcHQuZXZlbnRzLkNvZ25pdGl2ZUpvYkNyZWF0ZWQucmV0dXJuVmFsdWVzLmpvYklkKTtcbiAgICAgICAgICAgIH0gY2F0Y2ggKGVycikge1xuICAgICAgICAgICAgICAgIHJlamVjdChlcnIpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbn0pO1xuXG4vKipcbiAqIEdldCBhbGwgam9ic1xuICogXG4gKiBAcGFyYW0ge09iamVjdH0gY29uZmlnIExpYnJhcnkgY29uZmlnIChwcm92aWRlZCBieSB0aGUgcHJveHkgYnV0IGNhbiBiZSBvdmVycmlkZGVuKVxuICogQHJldHVybnMge1Byb21pc2V9IEEgUHJvbWlzZSBvYmplY3QgcmVwcmVzZW50cyB0aGUge09iamVjdFtdfSBcbiAqL1xuZXhwb3J0IGNvbnN0IGZldGNoQWxsID0gYXN5bmMgKGNvbmZpZyA9IHt9KSA9PiB7XG4gICAgbGV0IHJlY29yZHMgPSBbXTtcbiAgICBsZXQgZXJyb3IgPSBbXTtcblxuICAgIHRyeSB7XG5cbiAgICAgICAgY29uc3QgW1xuICAgICAgICAgICAgYWN0aXZlQ291bnQsXG4gICAgICAgICAgICBjb21wbGV0ZWRDb3VudFxuICAgICAgICBdID0gYXdhaXQgUHJvbWlzZS5hbGwoW1xuICAgICAgICAgICAgZmV0Y2hBY3RpdmVKb2JzQ291bnQoY29uZmlnKSxcbiAgICAgICAgICAgIGZldGNoQ29tcGxldGVkSm9ic0NvdW50KGNvbmZpZylcbiAgICAgICAgXSk7XG5cbiAgICAgICAgY29uc3QgW1xuICAgICAgICAgICAgYWN0aXZlSm9ic0lkcyxcbiAgICAgICAgICAgIGNvbXBsZXRlZEpvYnNJZHNcbiAgICAgICAgXSA9IGF3YWl0IFByb21pc2UuYWxsKFtcbiAgICAgICAgICAgIGZldGNoSm9ic0lkcygnYWN0aXZlSm9icycsIGFjdGl2ZUNvdW50LCBjb25maWcpLFxuICAgICAgICAgICAgZmV0Y2hKb2JzSWRzKCdjb21wbGV0ZWRKb2JzJywgY29tcGxldGVkQ291bnQsIGNvbmZpZylcbiAgICAgICAgXSk7XG5cbiAgICAgICAgY29uc3QgYWxsSm9ic0lkcyA9IFtcbiAgICAgICAgICAgIC4uLmFjdGl2ZUpvYnNJZHMsXG4gICAgICAgICAgICAuLi5jb21wbGV0ZWRKb2JzSWRzXG4gICAgICAgIF07XG5cbiAgICAgICAgcmVjb3JkcyA9IGF3YWl0IFByb21pc2UuYWxsKGFsbEpvYnNJZHMubWFwKGpvYklkID0+IGZldGNoSm9iRGV0YWlscyhqb2JJZCwgY29uZmlnKSkpO1xuICAgICAgICBcbiAgICB9IGNhdGNoKGVycikge1xuICAgICAgICBlcnJvci5wdXNoKHtcbiAgICAgICAgICAgIGVycm9yOiBlcnIubWVzc2FnZVxuICAgICAgICB9KTtcbiAgICB9ICAgXG5cbiAgICByZXR1cm4ge1xuICAgICAgICByZWNvcmRzLFxuICAgICAgICBlcnJvclxuICAgIH07XG59O1xuXG4vKipcbiAqIEhhbmRsZSBldmVudCBDb2duaXRpdmVKb2JDcmVhdGVkXG4gKiBcbiAqIEBwYXJhbSB7T2JqZWN0fSBvcHRpb25zIEV2ZW50IGhhbmRsZXIgb3B0aW9uc1xuICogQHBhcmFtIHtPYmplY3R9IGNvbmZpZyBMaWJyYXJ5IGNvbmZpZyAocHJvdmlkZWQgYnkgdGhlIHByb3h5IGJ1dCBjYW4gYmUgb3ZlcnJpZGRlbilcbiAqIEByZXR1cm5zIHtQcm9taXNlPHtPYmplY3R9Pn0gUFByb21pc2Ugb2JqZWN0IHJlc29sdmVkIHRvIHRoZSBvYmplY3Qgd2l0aCBjaGFpbmVkIGNhbGxiYWNrcyAjZGF0YSBhbmQgI2Vycm9yXG4gKi9cbmV4cG9ydCBjb25zdCBldmVudENvZ25pdGl2ZUpvYkNyZWF0ZWQgPSBhc3luYyAob3B0aW9ucyA9IHt9LCBjb25maWcgPSB7fSkgPT4ge1xuXG4gICAgZXhwZWN0LmFsbCh7IG9wdGlvbnMgfSwge1xuICAgICAgICAnb3B0aW9ucyc6IHtcbiAgICAgICAgICAgIHR5cGU6ICdvYmplY3QnXG4gICAgICAgIH1cbiAgICB9KTtcblxuICAgIGV4cGVjdC5hbGwoY29uZmlnLCB7XG4gICAgICAgICd3ZWIzJzoge1xuICAgICAgICAgICAgdHlwZTogJ29iamVjdCcsXG4gICAgICAgICAgICBjb2RlOiBXRUIzX1JFUVVJUkVEXG4gICAgICAgIH0sXG4gICAgICAgICdjb250cmFjdHMuUGFuZG9yYS5hYmknOiB7XG4gICAgICAgICAgICB0eXBlOiAnb2JqZWN0JyxcbiAgICAgICAgICAgIGNvZGU6IENPTlRSQUNUX1JFUVVJUkVELFxuICAgICAgICAgICAgYXJnczogWydQYW5kb3JhJ11cbiAgICAgICAgfSxcbiAgICAgICAgJ2FkZHJlc3Nlcy5QYW5kb3JhJzoge1xuICAgICAgICAgICAgdHlwZTogJ2FkZHJlc3MnLFxuICAgICAgICAgICAgY29kZTogQUREUkVTU19SRVFVSVJFRCxcbiAgICAgICAgICAgIGFyZ3M6IFsnUGFuZG9yYSddXG4gICAgICAgIH1cbiAgICB9KTtcblxuICAgIGNvbnN0IGNhbGxiYWNrcyA9IHtcbiAgICAgICAgb25EYXRhOiAoKSA9PiB7fSxcbiAgICAgICAgb25FcnJvcjogKCkgPT4ge31cbiAgICB9O1xuXG4gICAgY29uc3QgY2hhaW4gPSB7XG4gICAgICAgIGRhdGE6IChjYiA9ICgpID0+IHt9KSA9PiB7XG4gICAgICAgICAgICBjYWxsYmFja3Mub25EYXRhID0gY2I7XG4gICAgICAgICAgICByZXR1cm4gY2hhaW47XG4gICAgICAgIH0sXG4gICAgICAgIGVycm9yOiAoY2IgPSAoKSA9PiB7fSkgPT4ge1xuICAgICAgICAgICAgY2FsbGJhY2tzLm9uRXJyb3IgPSBjYjtcbiAgICAgICAgICAgIHJldHVybiBjaGFpbjtcbiAgICAgICAgfVxuICAgIH07XG5cbiAgICBjb25zdCBwYW4gPSBuZXcgY29uZmlnLndlYjMuZXRoLkNvbnRyYWN0KGNvbmZpZy5jb250cmFjdHMuUGFuZG9yYS5hYmksIGNvbmZpZy5hZGRyZXNzZXMuUGFuZG9yYSk7XG4gICAgY2hhaW4uZXZlbnQgPSBwYW4uZXZlbnRzLkNvZ25pdGl2ZUpvYkNyZWF0ZWQob3B0aW9ucylcbiAgICAgICAgLm9uKCdkYXRhJywgYXN5bmMgKGV2ZW50KSA9PiB7XG5cbiAgICAgICAgICAgIHRyeSB7XG5cbiAgICAgICAgICAgICAgICBjb25zdCBqb2JEZXRhaWxzID0gYXdhaXQgZmV0Y2hKb2JEZXRhaWxzKGV2ZW50LnJldHVyblZhbHVlcy5qb2JJZCwgY29uZmlnKTtcbiAgICAgICAgICAgICAgICBjYWxsYmFja3Mub25EYXRhKHtcbiAgICAgICAgICAgICAgICAgICAgcmVjb3JkczogW2pvYkRldGFpbHNdLFxuICAgICAgICAgICAgICAgICAgICBldmVudFxuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfSBjYXRjaChlcnIpIHtcbiAgICAgICAgICAgICAgICBjYWxsYmFja3Mub25FcnJvcihlcnIpO1xuICAgICAgICAgICAgfSAgICAgICAgICAgIFxuICAgICAgICB9KVxuICAgICAgICAub24oJ2Vycm9yJywgY2FsbGJhY2tzLm9uRXJyb3IpO1xuICAgIGNoYWluLmV2ZW50Lm5hbWUgPSAnQ29nbml0aXZlSm9iQ3JlYXRlZCc7XG5cbiAgICByZXR1cm4gY2hhaW47XG59O1xuXG4vKipcbiAqIEhhbmRsZSBldmVudCBKb2JTdGF0ZUNoYW5nZWRcbiAqIFxuICogQHBhcmFtIHtPYmplY3R9IG9wdGlvbnMgRXZlbnQgaGFuZGxlciBvcHRpb25zXG4gKiBAcGFyYW0ge09iamVjdH0gY29uZmlnIExpYnJhcnkgY29uZmlnIChwcm92aWRlZCBieSB0aGUgcHJveHkgYnV0IGNhbiBiZSBvdmVycmlkZGVuKVxuICogQHJldHVybnMge1Byb21pc2U8e09iamVjdH0+fSBQUHJvbWlzZSBvYmplY3QgcmVzb2x2ZWQgdG8gdGhlIG9iamVjdCB3aXRoIGNoYWluZWQgY2FsbGJhY2tzICNkYXRhIGFuZCAjZXJyb3JcbiAqL1xuZXhwb3J0IGNvbnN0IGV2ZW50Sm9iU3RhdGVDaGFuZ2VkID0gYXN5bmMgKG9wdGlvbnMgPSB7fSwgY29uZmlnID0ge30pID0+IHtcblxuICAgIGV4cGVjdC5hbGwoeyBvcHRpb25zIH0sIHtcbiAgICAgICAgJ29wdGlvbnMnOiB7XG4gICAgICAgICAgICB0eXBlOiAnb2JqZWN0J1xuICAgICAgICB9XG4gICAgfSk7XG5cbiAgICBleHBlY3QuYWxsKGNvbmZpZywge1xuICAgICAgICAnd2ViMyc6IHtcbiAgICAgICAgICAgIHR5cGU6ICdvYmplY3QnLFxuICAgICAgICAgICAgY29kZTogV0VCM19SRVFVSVJFRFxuICAgICAgICB9LFxuICAgICAgICAnY29udHJhY3RzLlBhbmRvcmEuYWJpJzoge1xuICAgICAgICAgICAgdHlwZTogJ29iamVjdCcsXG4gICAgICAgICAgICBjb2RlOiBDT05UUkFDVF9SRVFVSVJFRCxcbiAgICAgICAgICAgIGFyZ3M6IFsnUGFuZG9yYSddXG4gICAgICAgIH0sXG4gICAgICAgICdhZGRyZXNzZXMuUGFuZG9yYSc6IHtcbiAgICAgICAgICAgIHR5cGU6ICdhZGRyZXNzJyxcbiAgICAgICAgICAgIGNvZGU6IEFERFJFU1NfUkVRVUlSRUQsXG4gICAgICAgICAgICBhcmdzOiBbJ1BhbmRvcmEnXVxuICAgICAgICB9XG4gICAgfSk7XG5cbiAgICBjb25zdCBjYWxsYmFja3MgPSB7XG4gICAgICAgIG9uRGF0YTogKCkgPT4ge30sXG4gICAgICAgIG9uRXJyb3I6ICgpID0+IHt9XG4gICAgfTtcblxuICAgIGNvbnN0IGNoYWluID0ge1xuICAgICAgICBkYXRhOiAoY2IgPSAoKSA9PiB7fSkgPT4ge1xuICAgICAgICAgICAgY2FsbGJhY2tzLm9uRGF0YSA9IGNiO1xuICAgICAgICAgICAgcmV0dXJuIGNoYWluO1xuICAgICAgICB9LFxuICAgICAgICBlcnJvcjogKGNiID0gKCkgPT4ge30pID0+IHtcbiAgICAgICAgICAgIGNhbGxiYWNrcy5vbkVycm9yID0gY2I7XG4gICAgICAgICAgICByZXR1cm4gY2hhaW47XG4gICAgICAgIH1cbiAgICB9O1xuXG4gICAgY29uc3QgZXZlbnRIYW5kbGVyID0gYXN5bmMgZXZlbnQgPT4ge1xuICAgIFxuICAgICAgICB0cnkge1xuXG4gICAgICAgICAgICBjb25zdCBqb2JEZXRhaWxzID0gYXdhaXQgZmV0Y2hKb2JEZXRhaWxzKGV2ZW50LnJldHVyblZhbHVlcy5qb2JJZCwgY29uZmlnKTtcbiAgICAgICAgICAgIGNhbGxiYWNrcy5vbkRhdGEoe1xuICAgICAgICAgICAgICAgIHJlY29yZHM6IFtqb2JEZXRhaWxzXSxcbiAgICAgICAgICAgICAgICBldmVudFxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH0gY2F0Y2goZXJyKSB7XG4gICAgICAgICAgICBjYWxsYmFja3Mub25FcnJvcihlcnIpO1xuICAgICAgICB9ICAgICAgICAgICAgXG4gICAgfTtcblxuICAgIGxldCBqb2JDb250cm9sbGVyID0gbG9jYWxDYWNoZS5nZXQoJ2pvYkNvbnRyb2xsZXInKTtcblxuICAgIGlmICgham9iQ29udHJvbGxlcikge1xuXG4gICAgICAgIGpvYkNvbnRyb2xsZXIgPSBhd2FpdCBmZXRjaEpvYkNvbnRyb2xsZXJBZGRyZXNzKGNvbmZpZyk7XG4gICAgfVxuXG4gICAgY29uc3QgamN0cmwgPSBuZXcgY29uZmlnLndlYjMuZXRoLkNvbnRyYWN0KGNvbmZpZy5jb250cmFjdHMuQ29nbml0aXZlSm9iQ29udHJvbGxlci5hYmksIGpvYkNvbnRyb2xsZXIpO1xuICAgIFxuICAgIC8vIFdlIGxpc3RlbiBmb3IgdHdvIGV2ZW50cyBiZWNhdXNlIG9mIHRoZWlyIG5hdHVyZSBtZWFucyBhbG1vc3QgdGhlIHNhbWVcbiAgICBjaGFpbi5ldmVudCA9IFtdO1xuICAgIFxuICAgIGNoYWluLmV2ZW50LnB1c2goamN0cmwuZXZlbnRzLkpvYlN0YXRlQ2hhbmdlZChvcHRpb25zKVxuICAgICAgICAub24oJ2RhdGEnLCBldmVudEhhbmRsZXIpXG4gICAgICAgIC5vbignZXJyb3InLCBjYWxsYmFja3Mub25FcnJvcikpO1xuICAgIGNoYWluLmV2ZW50WzBdLm5hbWUgPSAnSm9iU3RhdGVDaGFuZ2VkJztcblxuICAgIGNoYWluLmV2ZW50LnB1c2goamN0cmwuZXZlbnRzLkNvZ25pdGlvblByb2dyZXNzZWQob3B0aW9ucylcbiAgICAgICAgLm9uKCdkYXRhJywgZXZlbnRIYW5kbGVyKVxuICAgICAgICAub24oJ2Vycm9yJywgY2FsbGJhY2tzLm9uRXJyb3IpKTtcbiAgICBjaGFpbi5ldmVudFsxXS5uYW1lID0gJ0NvZ25pdGlvblByb2dyZXNzZWQnO1xuXG4gICAgcmV0dXJuIGNoYWluO1xufTtcbiJdfQ==