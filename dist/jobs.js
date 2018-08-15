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
exports.eventJobStateChanged = exports.eventCognitiveJobCreated = exports.create = exports.fetchAll = exports.fetchJobsIds = exports.fetchJobDetails = exports.fetchServiceInfo = exports.fetchCompletedJobsCount = exports.fetchActiveJobsCount = exports.fetchJobControllerAddress = void 0;

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
 * Get all jobs
 * 
 * @param {Object} config Library config (provided by the proxy but can be overridden)
 * @returns {Promise} A Promise object represents the {Object[]} 
 */


exports.fetchJobsIds = fetchJobsIds;

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
 * Create cognitive job contract
 * 
 * @param {Object} options
 * @param {String} from Publisher address
 * @param {Object} config Library config (provided by the proxy but can be overridden)
 * @returns {Promise} Promise object resolved to add status (boolean)
 */


exports.fetchAll = fetchAll;

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
 * Handle event CognitiveJobCreated
 * 
 * @param {Object} options Event handler options
 * @param {Object} config Library config (provided by the proxy but can be overridden)
 * @returns {Promise<{Object}>} PPromise object resolved to the object with chained callbacks #data and #error
 */


exports.create = create;

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
  chain.event = [];
  chain.event[0] = pan.events.CognitiveJobCreated(options).on('data', async event => {
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
  chain.event[0].name = 'CognitiveJobCreated';
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9qb2JzLmpzIl0sIm5hbWVzIjpbImxvY2FsQ2FjaGUiLCJNYXAiLCJmZXRjaEpvYkNvbnRyb2xsZXJBZGRyZXNzIiwiY29uZmlnIiwiZXhwZWN0IiwiYWxsIiwidHlwZSIsImNvZGUiLCJXRUIzX1JFUVVJUkVEIiwiQUREUkVTU19SRVFVSVJFRCIsImFyZ3MiLCJDT05UUkFDVF9SRVFVSVJFRCIsInBhbiIsIndlYjMiLCJldGgiLCJDb250cmFjdCIsImNvbnRyYWN0cyIsIlBhbmRvcmEiLCJhYmkiLCJhZGRyZXNzZXMiLCJqb2JDb250cm9sbGVyIiwibWV0aG9kcyIsImNhbGwiLCJzZXQiLCJmZXRjaEFjdGl2ZUpvYnNDb3VudCIsImdldCIsImpjdHJsIiwiQ29nbml0aXZlSm9iQ29udHJvbGxlciIsImNvdW50IiwiYWN0aXZlSm9ic0NvdW50IiwiTnVtYmVyIiwicGFyc2VJbnQiLCJmZXRjaENvbXBsZXRlZEpvYnNDb3VudCIsImNvbXBsZXRlZEpvYnNDb3VudCIsImZldGNoU2VydmljZUluZm8iLCJhZGRyZXNzIiwicmVzcG9uc2VUaW1lc3RhbXBzIiwicmVzcG9uc2VGbGFncyIsImdldENvZ25pdGl2ZUpvYlNlcnZpY2VJbmZvIiwiZmV0Y2hKb2JEZXRhaWxzIiwia2VybmVsIiwiZGF0YXNldCIsImNvbXBsZXhpdHkiLCJkZXNjcmlwdGlvbiIsImFjdGl2ZVdvcmtlcnMiLCJzdGF0ZSIsImdldENvZ25pdGl2ZUpvYkRldGFpbHMiLCJrZXJuZWxJcGZzIiwiZGF0YXNldElwZnMiLCJpcGZzUmVzdWx0cyIsIlByb21pc2UiLCJtYXAiLCJfIiwiaW5kZXgiLCJnZXRDb2duaXRpdmVKb2JSZXN1bHRzIiwidXRmOGRlc2NyaXB0aW9uIiwidXRpbHMiLCJoZXhUb1V0ZjgiLCJzZXJ2aWNlSW5mbyIsInByb2dyZXNzIiwiTWF0aCIsImNlaWwiLCJyZWR1Y2UiLCJwcm9ncmVzc1Byb21pc2UiLCJyZXN1bHQiLCJjb21tb25Qcm9ncmVzcyIsInBhcnRQcm9ncmVzcyIsImxlbmd0aCIsInJlc29sdmUiLCJmaWx0ZXIiLCJyZXMiLCJzdWJzdHIiLCJqb2JUeXBlIiwiZmV0Y2hKb2JzSWRzIiwic291cmNlIiwidmFsdWVzIiwiY291bnRzIiwiQXJyYXkiLCJrZXlzIiwiZ2V0Sm9iSWQiLCJmZXRjaEFsbCIsInJlY29yZHMiLCJlcnJvciIsImFjdGl2ZUNvdW50IiwiY29tcGxldGVkQ291bnQiLCJhY3RpdmVKb2JzSWRzIiwiY29tcGxldGVkSm9ic0lkcyIsImFsbEpvYnNJZHMiLCJqb2JJZCIsImVyciIsInB1c2giLCJtZXNzYWdlIiwiY3JlYXRlIiwiZGVwb3NpdCIsImZyb20iLCJyZWplY3QiLCJnYXNQcmljZSIsImdldEdhc1ByaWNlIiwiY3JlYXRlQ29nbml0aXZlSm9iIiwidXRmOFRvSGV4IiwidHJpbSIsInNlbmQiLCJ2YWx1ZSIsInRvV2VpIiwiU3RyaW5nIiwiZ2FzIiwib24iLCJyZWNlaXB0Iiwic3RhdHVzIiwiVFJBTlNBQ1RJT05fVU5TVUNDRVNTRlVMIiwiZXZlbnRzIiwiQ29nbml0aXZlSm9iUXVldWVkIiwicmV0dXJuVmFsdWVzIiwiQ29nbml0aXZlSm9iQ3JlYXRlZCIsImV2ZW50Q29nbml0aXZlSm9iQ3JlYXRlZCIsIm9wdGlvbnMiLCJjYWxsYmFja3MiLCJvbkRhdGEiLCJvbkVycm9yIiwiY2hhaW4iLCJkYXRhIiwiY2IiLCJldmVudCIsImpvYkRldGFpbHMiLCJuYW1lIiwiZXZlbnRKb2JTdGF0ZUNoYW5nZWQiLCJldmVudEhhbmRsZXIiLCJKb2JTdGF0ZUNoYW5nZWQiLCJDb2duaXRpb25Qcm9ncmVzc2VkIl0sIm1hcHBpbmdzIjoiQUFBQTs7Ozs7Ozs7QUFTQTs7Ozs7OztBQUVBOztBQUNBOztBQU9BOztBQUlBOztBQUdBOzs7O0FBSUEsTUFBTUEsVUFBVSxHQUFHLElBQUlDLEdBQUosRUFBbkI7QUFFQTs7Ozs7OztBQU1PLE1BQU1DLHlCQUF5QixHQUFHLE9BQU9DLE1BQU0sR0FBRyxFQUFoQixLQUF1QjtBQUU1REMsRUFBQUEs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QWQsQ0E5RHFFLENBZ0VyRTs7QUFDQW1HLEVBQUFBLEtBQUssQ0FBQ0csS0FBTixHQUFjLEVBQWQ7QUFDQUgsRUFBQUEsS0FBSyxDQUFDRyxLQUFOLENBQVloQyxJQUFaLENBQWlCaEUsS0FBSyxDQUFDb0YsTUFBTixDQUFhaUIsZUFBYixDQUE2QlosT0FBN0IsRUFDWlQsRUFEWSxDQUNULE1BRFMsRUFDRG9CLFlBREMsRUFFWnBCLEVBRlksQ0FFVCxPQUZTLEVBRUFVLFNBQVMsQ0FBQ0UsT0FGVixDQUFqQjtBQUdBQyxFQUFBQSxLQUFLLENBQUNHLEtBQU4sQ0FBWSxDQUFaLEVBQWVFLElBQWYsR0FBc0IsaUJBQXRCO0FBRUFMLEVBQUFBLEtBQUssQ0FBQ0csS0FBTixDQUFZaEMsSUFBWixDQUFpQmhFLEtBQUssQ0FBQ29GLE1BQU4sQ0FBYWtCLG1CQUFiLENBQWlDYixPQUFqQyxFQUNaVCxFQURZLENBQ1QsTUFEUyxFQUNEb0IsWUFEQyxFQUVacEIsRUFGWSxDQUVULE9BRlMsRUFFQVUsU0FBUyxDQUFDRSxPQUZWLENBQWpCO0FBR0FDLEVBQUFBLEtBQUssQ0FBQ0csS0FBTixDQUFZLENBQVosRUFBZUUsSUFBZixHQUFzQixxQkFBdEI7QUFFQSxTQUFPTCxLQUFQO0FBQ0gsQ0E3RU0iLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIENvZ25pdGl2ZSBKb2JzIHJlbGF0ZWQgbWV0aG9kc1xuICogVGhpcyBmaWxlIGl0IGlzIGEgcGFydCBvZiB0aGUgUGFuZG9yYSBQeXJyaGEgSmF2YXNjcmlwdCBsaWJyYXJ5XG4gKiBcbiAqIEBmaWxlIGpvYnMuanNcbiAqIEBhdXRob3IgS29zdGlhbnR5biBTbXlybm92IDxrb3N0eXNoQGdtYWlsLmNvbT5cbiAqIEBkYXRlIDIwMThcbiAqL1xuXG4ndXNlIHN0cmljdCc7XG5cbmltcG9ydCAqIGFzIGV4cGVjdCBmcm9tICcuL2hlbHBlcnMvZXhwZWN0JztcbmltcG9ydCBwanNFcnJvciwge1xuICAgIENPTlRSQUNUX1JFUVVJUkVELFxuICAgIEFERFJFU1NfUkVRVUlSRUQsXG4gICAgV0VCM19SRVFVSVJFRCxcbiAgICBUUkFOU0FDVElPTl9VTlNVQ0NFU1NGVUxcbn0gZnJvbSAnLi9oZWxwZXJzL2Vycm9ycyc7XG5cbmltcG9ydCB7XG4gICAgZmV0Y2hJcGZzQWRkcmVzcyBhcyBmZXRjaElwZnNBZGRyZXNzQnlLZXJuZWxBZGRyZXNzXG59IGZyb20gJy4va2VybmVscyc7XG5cbmltcG9ydCB7XG4gICAgZmV0Y2hJcGZzQWRkcmVzcyBhcyBmZXRjaElwZnNBZGRyZXNzQnlEYXRhc2V0QWRkcmVzc1xufSBmcm9tICcuL2RhdGFzZXRzJztcbmltcG9ydCB7XG4gICAgZmV0Y2hKb2JQcm9ncmVzcyBhcyBmZXRjaFdvcmtlcnNBY3RpdmVKb2JQcm9ncmVzc1xufSBmcm9tICcuL3dvcmtlcnMnO1xuXG5jb25zdCBsb2NhbENhY2hlID0gbmV3IE1hcCgpO1xuXG4vKipcbiAqIEdldCBqb2IgY29udHJvbGxlciBhZGRyZXNzXG4gKiBcbiAqIEBwYXJhbSB7T2JqZWN0fSBjb25maWcgTGlicmFyeSBjb25maWcgKHByb3ZpZGVkIGJ5IHRoZSBwcm94eSBidXQgY2FuIGJlIG92ZXJyaWRkZW4pXG4gKiBAcmV0dXJucyB7UHJvbWlzZTx7U3RyaW5nfT59IFxuICovXG5leHBvcnQgY29uc3QgZmV0Y2hKb2JDb250cm9sbGVyQWRkcmVzcyA9IGFzeW5jIChjb25maWcgPSB7fSkgPT4ge1xuXG4gICAgZXhwZWN0LmFsbChjb25maWcsIHtcbiAgICAgICAgJ3dlYjMnOiB7XG4gICAgICAgICAgICB0eXBlOiAnb2JqZWN0JyxcbiAgICAgICAgICAgIGNvZGU6IFdFQjNfUkVRVUlSRURcbiAgICAgICAgfSxcbiAgICAgICAgJ2FkZHJlc3Nlcy5QYW5kb3JhJzoge1xuICAgICAgICAgICAgdHlwZTogJ2FkZHJlc3MnLFxuICAgICAgICAgICAgY29kZTogQUREUkVTU19SRVFVSVJFRCxcbiAgICAgICAgICAgIGFyZ3M6IFsnUGFuZG9yYSddXG4gICAgICAgIH0sXG4gICAgICAgICdjb250cmFjdHMuUGFuZG9yYS5hYmknOiB7XG4gICAgICAgICAgICB0eXBlOiAnb2JqZWN0JyxcbiAgICAgICAgICAgIGNvZGU6IENPTlRSQUNUX1JFUVVJUkVELFxuICAgICAgICAgICAgYXJnczogWydQYW5kb3JhJ11cbiAgICAgICAgfVxuICAgIH0pO1xuXG4gICAgY29uc3QgcGFuID0gbmV3IGNvbmZpZy53ZWIzLmV0aC5Db250cmFjdChjb25maWcuY29udHJhY3RzLlBhbmRvcmEuYWJpLCBjb25maWcuYWRkcmVzc2VzLlBhbmRvcmEpO1xuICAgIGNvbnN0IGpvYkNvbnRyb2xsZXIgPSBhd2FpdCBwYW4ubWV0aG9kc1xuICAgICAgICAuam9iQ29udHJvbGxlcigpXG4gICAgICAgIC5jYWxsKCk7XG5cbiAgICAvLyBzYXZlIGZvciBsYXRlciB1c2VcbiAgICBsb2NhbENhY2hlLnNldCgnam9iQ29udHJvbGxlcicsIGpvYkNvbnRyb2xsZXIpO1xuICAgICAgICBcbiAgICByZXR1cm4gam9iQ29udHJvbGxlcjtcbn07XG5cbi8qKlxuICogR2V0IGFjdGl2ZSBqb2JzIGNvdW50IFxuICogXG4gKiBAcGFyYW0ge09iamVjdH0gY29uZmlnIExpYnJhcnkgY29uZmlnIChwcm92aWRlZCBieSB0aGUgcHJveHkgYnV0IGNhbiBiZSBvdmVycmlkZGVuKVxuICogQHJldHVybnMge1Byb21pc2U8e051bWJlcn0+fSBcbiAqL1xuZXhwb3J0IGNvbnN0IGZldGNoQWN0aXZlSm9ic0NvdW50ID0gYXN5bmMgKGNvbmZpZyA9IHt9KSA9PiB7XG5cbiAgICBleHBlY3QuYWxsKGNvbmZpZywge1xuICAgICAgICAnd2ViMyc6IHtcbiAgICAgICAgICAgIHR5cGU6ICdvYmplY3QnLFxuICAgICAgICAgICAgY29kZTogV0VCM19SRVFVSVJFRFxuICAgICAgICB9LFxuICAgICAgICAnY29udHJhY3RzLkNvZ25pdGl2ZUpvYkNvbnRyb2xsZXIuYWJpJzoge1xuICAgICAgICAgICAgdHlwZTogJ29iamVjdCcsXG4gICAgICAgICAgICBjb2RlOiBDT05UUkFDVF9SRVFVSVJFRCxcbiAgICAgICAgICAgIGFyZ3M6IFsnQ29nbml0aXZlSm9iQ29udHJvbGxlciddXG4gICAgICAgIH1cbiAgICB9KTtcblxuICAgIGxldCBqb2JDb250cm9sbGVyID0gbG9jYWxDYWNoZS5nZXQoJ2pvYkNvbnRyb2xsZXInKTtcblxuICAgIGlmICgham9iQ29udHJvbGxlcikge1xuXG4gICAgICAgIGpvYkNvbnRyb2xsZXIgPSBhd2FpdCBmZXRjaEpvYkNvbnRyb2xsZXJBZGRyZXNzKGNvbmZpZyk7XG4gICAgfVxuXG4gICAgY29uc3QgamN0cmwgPSBuZXcgY29uZmlnLndlYjMuZXRoLkNvbnRyYWN0KGNvbmZpZy5jb250cmFjdHMuQ29nbml0aXZlSm9iQ29udHJvbGxlci5hYmksIGpvYkNvbnRyb2xsZXIpO1xuICAgIGNvbnN0IGNvdW50ID0gYXdhaXQgamN0cmwubWV0aG9kc1xuICAgICAgICAuYWN0aXZlSm9ic0NvdW50KClcbiAgICAgICAgLmNhbGwoKTtcbiAgICAgICAgXG4gICAgcmV0dXJuIE51bWJlci5wYXJzZUludChjb3VudCwgMTApO1xufTtcblxuLyoqXG4gKiBHZXQgY29tcGxldGVkIGpvYnMgY291bnQgXG4gKiBcbiAqIEBwYXJhbSB7T2JqZWN0fSBjb25maWcgTGlicmFyeSBjb25maWcgKHByb3ZpZGVkIGJ5IHRoZSBwcm94eSBidXQgY2FuIGJlIG92ZXJyaWRkZW4pXG4gKiBAcmV0dXJucyB7UHJvbWlzZTx7TnVtYmVyfT59IFxuICovXG5leHBvcnQgY29uc3QgZmV0Y2hDb21wbGV0ZWRKb2JzQ291bnQgPSBhc3luYyAoY29uZmlnID0ge30pID0+IHtcblxuICAgIGV4cGVjdC5hbGwoY29uZmlnLCB7XG4gICAgICAgICd3ZWIzJzoge1xuICAgICAgICAgICAgdHlwZTogJ29iamVjdCcsXG4gICAgICAgICAgICBjb2RlOiBXRUIzX1JFUVVJUkVEXG4gICAgICAgIH0sXG4gICAgICAgICdjb250cmFjdHMuQ29nbml0aXZlSm9iQ29udHJvbGxlci5hYmknOiB7XG4gICAgICAgICAgICB0eXBlOiAnb2JqZWN0JyxcbiAgICAgICAgICAgIGNvZGU6IENPTlRSQUNUX1JFUVVJUkVELFxuICAgICAgICAgICAgYXJnczogWydDb2duaXRpdmVKb2JDb250cm9sbGVyJ11cbiAgICAgICAgfVxuICAgIH0pO1xuXG4gICAgbGV0IGpvYkNvbnRyb2xsZXIgPSBsb2NhbENhY2hlLmdldCgnam9iQ29udHJvbGxlcicpO1xuXG4gICAgaWYgKCFqb2JDb250cm9sbGVyKSB7XG5cbiAgICAgICAgam9iQ29udHJvbGxlciA9IGF3YWl0IGZldGNoSm9iQ29udHJvbGxlckFkZHJlc3MoY29uZmlnKTtcbiAgICB9XG5cbiAgICBjb25zdCBqY3RybCA9IG5ldyBjb25maWcud2ViMy5ldGguQ29udHJhY3QoY29uZmlnLmNvbnRyYWN0cy5Db2duaXRpdmVKb2JDb250cm9sbGVyLmFiaSwgam9iQ29udHJvbGxlcik7XG4gICAgY29uc3QgY291bnQgPSBhd2FpdCBqY3RybC5tZXRob2RzXG4gICAgICAgIC5jb21wbGV0ZWRKb2JzQ291bnQoKVxuICAgICAgICAuY2FsbCgpO1xuICAgICAgICBcbiAgICByZXR1cm4gTnVtYmVyLnBhcnNlSW50KGNvdW50LCAxMCk7XG59O1xuXG4vKipcbiAqIEdldCBqb2Igc2VydmljZSBpbmZvIFxuICogXG4gKiBAcGFyYW0ge1N0cmluZ30gYWRkcmVzcyBKb2IgYWRkcmVzc1xuICogQHBhcmFtIHtPYmplY3R9IGNvbmZpZyBMaWJyYXJ5IGNvbmZpZyAocHJvdmlkZWQgYnkgdGhlIHByb3h5IGJ1dCBjYW4gYmUgb3ZlcnJpZGRlbilcbiAqIEByZXR1cm5zIHtQcm9taXNlPHtOdW1iZXJ9Pn0gXG4gKi9cbmV4cG9ydCBjb25zdCBmZXRjaFNlcnZpY2VJbmZvID0gYXN5bmMgKGFkZHJlc3MsIGNvbmZpZyA9IHt9KSA9PiB7XG5cbiAgICBleHBlY3QuYWxsKGNvbmZpZywge1xuICAgICAgICAnd2ViMyc6IHtcbiAgICAgICAgICAgIHR5cGU6ICdvYmplY3QnLFxuICAgICAgICAgICAgY29kZTogV0VCM19SRVFVSVJFRFxuICAgICAgICB9LFxuICAgICAgICAnY29udHJhY3RzLkNvZ25pdGl2ZUpvYkNvbnRyb2xsZXIuYWJpJzoge1xuICAgICAgICAgICAgdHlwZTogJ29iamVjdCcsXG4gICAgICAgICAgICBjb2RlOiBDT05UUkFDVF9SRVFVSVJFRCxcbiAgICAgICAgICAgIGFyZ3M6IFsnQ29nbml0aXZlSm9iQ29udHJvbGxlciddXG4gICAgICAgIH1cbiAgICB9KTtcblxuICAgIGxldCBqb2JDb250cm9sbGVyID0gbG9jYWxDYWNoZS5nZXQoJ2pvYkNvbnRyb2xsZXInKTtcblxuICAgIGlmICgham9iQ29udHJvbGxlcikge1xuXG4gICAgICAgIGpvYkNvbnRyb2xsZXIgPSBhd2FpdCBmZXRjaEpvYkNvbnRyb2xsZXJBZGRyZXNzKGNvbmZpZyk7XG4gICAgfVxuXG4gICAgY29uc3QgamN0cmwgPSBuZXcgY29uZmlnLndlYjMuZXRoLkNvbnRyYWN0KGNvbmZpZy5jb250cmFjdHMuQ29nbml0aXZlSm9iQ29udHJvbGxlci5hYmksIGpvYkNvbnRyb2xsZXIpO1xuXG4gICAgY29uc3QgeyByZXNwb25zZVRpbWVzdGFtcHMsIHJlc3BvbnNlRmxhZ3MgfSA9IGF3YWl0IGpjdHJsLm1ldGhvZHNcbiAgICAgICAgLmdldENvZ25pdGl2ZUpvYlNlcnZpY2VJbmZvKGFkZHJlc3MpXG4gICAgICAgIC5jYWxsKCk7XG5cbiAgICByZXR1cm4geyBcbiAgICAgICAgcmVzcG9uc2VUaW1lc3RhbXBzLCBcbiAgICAgICAgcmVzcG9uc2VGbGFncyBcbiAgICB9O1xufTtcblxuLyoqXG4gKiBHZXQgam9iIGRldGFpbHMgXG4gKiBcbiAqIEBwYXJhbSB7U3RyaW5nfSBhZGRyZXNzIEpvYiBhZGRyZXNzXG4gKiBAcGFyYW0ge09iamVjdH0gY29uZmlnIExpYnJhcnkgY29uZmlnIChwcm92aWRlZCBieSB0aGUgcHJveHkgYnV0IGNhbiBiZSBvdmVycmlkZGVuKVxuICogQHJldHVybnMge1Byb21pc2U8e051bWJlcn0+fSBcbiAqL1xuZXhwb3J0IGNvbnN0IGZldGNoSm9iRGV0YWlscyA9IGFzeW5jIChhZGRyZXNzLCBjb25maWcgPSB7fSkgPT4ge1xuXG4gICAgZXhwZWN0LmFsbChjb25maWcsIHtcbiAgICAgICAgJ3dlYjMnOiB7XG4gICAgICAgICAgICB0eXBlOiAnb2JqZWN0JyxcbiAgICAgICAgICAgIGNvZGU6IFdFQjNfUkVRVUlSRURcbiAgICAgICAgfSxcbiAgICAgICAgJ2NvbnRyYWN0cy5Db2duaXRpdmVKb2JDb250cm9sbGVyLmFiaSc6IHtcbiAgICAgICAgICAgIHR5cGU6ICdvYmplY3QnLFxuICAgICAgICAgICAgY29kZTogQ09OVFJBQ1RfUkVRVUlSRUQsXG4gICAgICAgICAgICBhcmdzOiBbJ0NvZ25pdGl2ZUpvYkNvbnRyb2xsZXInXVxuICAgICAgICB9XG4gICAgfSk7XG5cbiAgICBsZXQgam9iQ29udHJvbGxlciA9IGxvY2FsQ2FjaGUuZ2V0KCdqb2JDb250cm9sbGVyJyk7XG5cbiAgICBpZiAoIWpvYkNvbnRyb2xsZXIpIHtcblxuICAgICAgICBqb2JDb250cm9sbGVyID0gYXdhaXQgZmV0Y2hKb2JDb250cm9sbGVyQWRkcmVzcyhjb25maWcpO1xuICAgIH1cblxuICAgIGNvbnN0IGpjdHJsID0gbmV3IGNvbmZpZy53ZWIzLmV0aC5Db250cmFjdChjb25maWcuY29udHJhY3RzLkNvZ25pdGl2ZUpvYkNvbnRyb2xsZXIuYWJpLCBqb2JDb250cm9sbGVyKTtcbiAgICBcbiAgICBjb25zdCB7IGtlcm5lbCwgZGF0YXNldCwgY29tcGxleGl0eSwgZGVzY3JpcHRpb24sIGFjdGl2ZVdvcmtlcnMsIHN0YXRlIH0gPSBhd2FpdCBqY3RybC5tZXRob2RzXG4gICAgICAgIC5nZXRDb2duaXRpdmVKb2JEZXRhaWxzKGFkZHJlc3MpXG4gICAgICAgIC5jYWxsKCk7XG4gICAgY29uc3Qga2VybmVsSXBmcyA9IGF3YWl0IGZldGNoSXBmc0FkZHJlc3NCeUtlcm5lbEFkZHJlc3Moa2VybmVsLCBjb25maWcpO1xuICAgIGNvbnN0IGRhdGFzZXRJcGZzID0gYXdhaXQgZmV0Y2hJcGZzQWRkcmVzc0J5RGF0YXNldEFkZHJlc3MoZGF0YXNldCwgY29uZmlnKTtcbiAgICBjb25zdCBpcGZzUmVzdWx0cyA9IGF3YWl0IFByb21pc2UuYWxsKGFjdGl2ZVdvcmtlcnMubWFwKChfLCBpbmRleCkgPT4gamN0cmwubWV0aG9kcy5nZXRDb2duaXRpdmVKb2JSZXN1bHRzKGFkZHJlc3MsIGluZGV4KS5jYWxsKCkpKTsgICAgXG4gICAgY29uc3QgdXRmOGRlc2NyaXB0aW9uID0gZGVzY3JpcHRpb24gPyBjb25maWcud2ViMy51dGlscy5oZXhUb1V0ZjgoZGVzY3JpcHRpb24pIDogJyc7XG4gICAgY29uc3Qgc2VydmljZUluZm8gPSBhd2FpdCBmZXRjaFNlcnZpY2VJbmZvKGFkZHJlc3MsIGNvbmZpZyk7XG5cbiAgICBjb25zdCBwcm9ncmVzcyA9IE1hdGguY2VpbChhd2FpdCBpcGZzUmVzdWx0cy5yZWR1Y2UoYXN5bmMgKHByb2dyZXNzUHJvbWlzZSwgcmVzdWx0LCBpbmRleCkgPT4ge1xuICAgICAgICBjb25zdCBjb21tb25Qcm9ncmVzcyA9IGF3YWl0IHByb2dyZXNzUHJvbWlzZTtcbiAgICAgICAgbGV0IHBhcnRQcm9ncmVzcyA9IDEwMCAvIGlwZnNSZXN1bHRzLmxlbmd0aDtcblxuICAgICAgICBpZiAoIXJlc3VsdCkge1xuXG4gICAgICAgICAgICAvLyBJZiByZXN1bHQgbm90IGJlZW4gcHJvdmlkZWQgYnkgdGhlIHdvcmtlciBcbiAgICAgICAgICAgIC8vIHRoZW4gd2UgZmV0Y2hpbmcgcHJvZ3Jlc3MgdmFsdWUgZnJvbSBpdHMgY29udHJhY3RcbiAgICAgICAgICAgIHBhcnRQcm9ncmVzcyA9IGF3YWl0IGZldGNoV29ya2Vyc0FjdGl2ZUpvYlByb2dyZXNzKGFjdGl2ZVdvcmtlcnNbaW5kZXhdLCBjb25maWcpO1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIGNvbW1vblByb2dyZXNzICsgcGFydFByb2dyZXNzO1xuICAgIH0sIFByb21pc2UucmVzb2x2ZSgwKSkpO1xuXG4gICAgcmV0dXJuIHtcbiAgICAgICAgYWRkcmVzcywgXG4gICAgICAgIGtlcm5lbCxcbiAgICAgICAga2VybmVsSXBmcyxcbiAgICAgICAgZGF0YXNldCxcbiAgICAgICAgZGF0YXNldElwZnMsXG4gICAgICAgIGFjdGl2ZVdvcmtlcnMsXG4gICAgICAgIGlwZnNSZXN1bHRzOiBpcGZzUmVzdWx0cy5tYXAocmVzdWx0ID0+IHJlc3VsdCA/IGNvbmZpZy53ZWIzLnV0aWxzLmhleFRvVXRmOChyZXN1bHQpIDogcmVzdWx0KS5maWx0ZXIocmVzID0+IHJlcyksXG4gICAgICAgIGNvbXBsZXhpdHk6IE51bWJlcihjb21wbGV4aXR5KSxcbiAgICAgICAgcHJvZ3Jlc3M6IHByb2dyZXNzID4gMTAwID8gMTAwIDogcHJvZ3Jlc3MsXG4gICAgICAgIHN0YXRlOiBOdW1iZXIoc3RhdGUpLFxuICAgICAgICBkZXNjcmlwdGlvbjogdXRmOGRlc2NyaXB0aW9uLnN1YnN0cigyKSxcbiAgICAgICAgam9iVHlwZTogdXRmOGRlc2NyaXB0aW9uLnN1YnN0cigwLCAxKSxcbiAgICAgICAgc2VydmljZUluZm9cbiAgICB9O1xufTtcblxuLyoqXG4gKiBHZXQgam9icyBJZCBmcm9tIHRoZSBcInNvdXJjZVwiXG4gKiBcbiAqIEBwYXJhbSB7U3RyaW5nfSBmcm9tIHNvdXJjZSBhY3RpdmVKb2JzIG9yIGNvbXBsZXRlZEpvYnNcbiAqIEBwYXJhbSB7TnVtYmVyfSBjb3VudFxuICogQHBhcmFtIHtPYmplY3R9IG9wdGlvbnNcbiAqIEByZXR1cm5zIHtQcm9taXNlPFt7U3RyaW5nfV0+fSBcbiAqL1xuZXhwb3J0IGNvbnN0IGZldGNoSm9ic0lkcyA9IGFzeW5jIChzb3VyY2UsIGNvdW50ID0gMCwgY29uZmlnID0ge30pID0+IHtcblxuICAgIGV4cGVjdC5hbGwoeyBzb3VyY2UgfSwge1xuICAgICAgICAnc291cmNlJzoge1xuICAgICAgICAgICAgdHlwZTogJ2VudW0nLFxuICAgICAgICAgICAgdmFsdWVzOiBbJ2FjdGl2ZUpvYnMnLCAnY29tcGxldGVkSm9icyddXG4gICAgICAgIH1cbiAgICB9KTtcblxuICAgIGV4cGVjdC5hbGwoY29uZmlnLCB7XG4gICAgICAgICd3ZWIzJzoge1xuICAgICAgICAgICAgdHlwZTogJ29iamVjdCcsXG4gICAgICAgICAgICBjb2RlOiBXRUIzX1JFUVVJUkVEXG4gICAgICAgIH0sXG4gICAgICAgICdjb250cmFjdHMuQ29nbml0aXZlSm9iQ29udHJvbGxlci5hYmknOiB7XG4gICAgICAgICAgICB0eXBlOiAnb2JqZWN0JyxcbiAgICAgICAgICAgIGNvZGU6IENPTlRSQUNUX1JFUVVJUkVELFxuICAgICAgICAgICAgYXJnczogWydDb2duaXRpdmVKb2JDb250cm9sbGVyJ11cbiAgICAgICAgfVxuICAgIH0pOyAgICBcblxuICAgIGxldCBqb2JDb250cm9sbGVyID0gbG9jYWxDYWNoZS5nZXQoJ2pvYkNvbnRyb2xsZXInKTtcblxuICAgIGlmICgham9iQ29udHJvbGxlcikge1xuXG4gICAgICAgIGpvYkNvbnRyb2xsZXIgPSBhd2FpdCBmZXRjaEpvYkNvbnRyb2xsZXJBZGRyZXNzKGNvbmZpZyk7XG4gICAgfVxuXG4gICAgLy8gbnVtYmVycyBzZXF1ZW5jZSBmcm9tIDAgdG8gY291bnRcbiAgICBjb25zdCBjb3VudHMgPSBbLi4uQXJyYXkoY291bnQpLmtleXMoKV07XG5cbiAgICBjb25zdCBqY3RybCA9IG5ldyBjb25maWcud2ViMy5ldGguQ29udHJhY3QoY29uZmlnLmNvbnRyYWN0cy5Db2duaXRpdmVKb2JDb250cm9sbGVyLmFiaSwgam9iQ29udHJvbGxlcik7XG4gICAgY29uc3QgYWRkcmVzc2VzID0gYXdhaXQgUHJvbWlzZS5hbGwoY291bnRzLm1hcChpbmRleCA9PiBqY3RybC5tZXRob2RzLmdldEpvYklkKGluZGV4LCBzb3VyY2UgPT09ICdhY3RpdmVKb2JzJykuY2FsbCgpKSk7XG4gICAgICAgIFxuICAgIHJldHVybiBhZGRyZXNzZXM7XG59O1xuXG4vKipcbiAqIEdldCBhbGwgam9ic1xuICogXG4gKiBAcGFyYW0ge09iamVjdH0gY29uZmlnIExpYnJhcnkgY29uZmlnIChwcm92aWRlZCBieSB0aGUgcHJveHkgYnV0IGNhbiBiZSBvdmVycmlkZGVuKVxuICogQHJldHVybnMge1Byb21pc2V9IEEgUHJvbWlzZSBvYmplY3QgcmVwcmVzZW50cyB0aGUge09iamVjdFtdfSBcbiAqL1xuZXhwb3J0IGNvbnN0IGZldGNoQWxsID0gYXN5bmMgKGNvbmZpZyA9IHt9KSA9PiB7XG4gICAgbGV0IHJlY29yZHMgPSBbXTtcbiAgICBsZXQgZXJyb3IgPSBbXTtcblxuICAgIHRyeSB7XG5cbiAgICAgICAgY29uc3QgW1xuICAgICAgICAgICAgYWN0aXZlQ291bnQsXG4gICAgICAgICAgICBjb21wbGV0ZWRDb3VudFxuICAgICAgICBdID0gYXdhaXQgUHJvbWlzZS5hbGwoW1xuICAgICAgICAgICAgZmV0Y2hBY3RpdmVKb2JzQ291bnQoY29uZmlnKSxcbiAgICAgICAgICAgIGZldGNoQ29tcGxldGVkSm9ic0NvdW50KGNvbmZpZylcbiAgICAgICAgXSk7XG5cbiAgICAgICAgY29uc3QgW1xuICAgICAgICAgICAgYWN0aXZlSm9ic0lkcyxcbiAgICAgICAgICAgIGNvbXBsZXRlZEpvYnNJZHNcbiAgICAgICAgXSA9IGF3YWl0IFByb21pc2UuYWxsKFtcbiAgICAgICAgICAgIGZldGNoSm9ic0lkcygnYWN0aXZlSm9icycsIGFjdGl2ZUNvdW50LCBjb25maWcpLFxuICAgICAgICAgICAgZmV0Y2hKb2JzSWRzKCdjb21wbGV0ZWRKb2JzJywgY29tcGxldGVkQ291bnQsIGNvbmZpZylcbiAgICAgICAgXSk7XG5cbiAgICAgICAgY29uc3QgYWxsSm9ic0lkcyA9IFtcbiAgICAgICAgICAgIC4uLmFjdGl2ZUpvYnNJZHMsXG4gICAgICAgICAgICAuLi5jb21wbGV0ZWRKb2JzSWRzXG4gICAgICAgIF07XG5cbiAgICAgICAgcmVjb3JkcyA9IGF3YWl0IFByb21pc2UuYWxsKGFsbEpvYnNJZHMubWFwKGpvYklkID0+IGZldGNoSm9iRGV0YWlscyhqb2JJZCwgY29uZmlnKSkpO1xuICAgICAgICBcbiAgICB9IGNhdGNoKGVycikge1xuICAgICAgICBlcnJvci5wdXNoKHtcbiAgICAgICAgICAgIGVycm9yOiBlcnIubWVzc2FnZVxuICAgICAgICB9KTtcbiAgICB9ICAgXG5cbiAgICByZXR1cm4ge1xuICAgICAgICByZWNvcmRzLFxuICAgICAgICBlcnJvclxuICAgIH07XG59O1xuXG4vKipcbiAqIENyZWF0ZSBjb2duaXRpdmUgam9iIGNvbnRyYWN0XG4gKiBcbiAqIEBwYXJhbSB7T2JqZWN0fSBvcHRpb25zXG4gKiBAcGFyYW0ge1N0cmluZ30gZnJvbSBQdWJsaXNoZXIgYWRkcmVzc1xuICogQHBhcmFtIHtPYmplY3R9IGNvbmZpZyBMaWJyYXJ5IGNvbmZpZyAocHJvdmlkZWQgYnkgdGhlIHByb3h5IGJ1dCBjYW4gYmUgb3ZlcnJpZGRlbilcbiAqIEByZXR1cm5zIHtQcm9taXNlfSBQcm9taXNlIG9iamVjdCByZXNvbHZlZCB0byBhZGQgc3RhdHVzIChib29sZWFuKVxuICovXG5leHBvcnQgY29uc3QgY3JlYXRlID0gKHtrZXJuZWwsIGRhdGFzZXQsIGNvbXBsZXhpdHksIGpvYlR5cGUsIGRlc2NyaXB0aW9uLCBkZXBvc2l0fSwgZnJvbSwgY29uZmlnID0ge30pID0+IG5ldyBQcm9taXNlKGFzeW5jIChyZXNvbHZlLCByZWplY3QpID0+IHtcblxuICAgIGV4cGVjdC5hbGwoeyBrZXJuZWwsIGRhdGFzZXQsIGNvbXBsZXhpdHksIGpvYlR5cGUsIGRlc2NyaXB0aW9uLCBkZXBvc2l0LCBmcm9tIH0sIHtcbiAgICAgICAgJ2tlcm5lbCc6IHtcbiAgICAgICAgICAgIHR5cGU6ICdhZGRyZXNzJ1xuICAgICAgICB9LFxuICAgICAgICAnZGF0YXNldCc6IHtcbiAgICAgICAgICAgIHR5cGU6ICdhZGRyZXNzJ1xuICAgICAgICB9LFxuICAgICAgICAnY29tcGxleGl0eSc6IHtcbiAgICAgICAgICAgIHR5cGU6ICdudW1iZXInXG4gICAgICAgIH0sXG4gICAgICAgICdqb2JUeXBlJzoge1xuICAgICAgICAgICAgdHlwZTogJ3N0cmluZydcbiAgICAgICAgfSxcbiAgICAgICAgJ2Rlc2NyaXB0aW9uJzoge1xuICAgICAgICAgICAgdHlwZTogJ3N0cmluZydcbiAgICAgICAgfSxcbiAgICAgICAgJ2RlcG9zaXQnOiB7XG4gICAgICAgICAgICB0eXBlOiAnbnVtYmVyJ1xuICAgICAgICB9LFxuICAgICAgICAnZnJvbSc6IHtcbiAgICAgICAgICAgIHR5cGU6ICdhZGRyZXNzJ1xuICAgICAgICB9XG4gICAgfSk7XG5cbiAgICBleHBlY3QuYWxsKGNvbmZpZywge1xuICAgICAgICAnd2ViMyc6IHtcbiAgICAgICAgICAgIHR5cGU6ICdvYmplY3QnLFxuICAgICAgICAgICAgY29kZTogV0VCM19SRVFVSVJFRFxuICAgICAgICB9LFxuICAgICAgICAnY29udHJhY3RzLlBhbmRvcmEuYWJpJzoge1xuICAgICAgICAgICAgdHlwZTogJ29iamVjdCcsXG4gICAgICAgICAgICBjb2RlOiBDT05UUkFDVF9SRVFVSVJFRCxcbiAgICAgICAgICAgIGFyZ3M6IFsnUGFuZG9yYSddXG4gICAgICAgIH0sXG4gICAgICAgICdhZGRyZXNzZXMuUGFuZG9yYSc6IHtcbiAgICAgICAgICAgIHR5cGU6ICdhZGRyZXNzJyxcbiAgICAgICAgICAgIGNvZGU6IEFERFJFU1NfUkVRVUlSRUQsXG4gICAgICAgICAgICBhcmdzOiBbJ1BhbmRvcmEnXVxuICAgICAgICB9XG4gICAgfSk7XG5cbiAgICBjb25zdCBwYW4gPSBuZXcgY29uZmlnLndlYjMuZXRoLkNvbnRyYWN0KGNvbmZpZy5jb250cmFjdHMuUGFuZG9yYS5hYmksIGNvbmZpZy5hZGRyZXNzZXMuUGFuZG9yYSk7XG4gICAgY29uc3QgZ2FzUHJpY2UgPSBhd2FpdCBjb25maWcud2ViMy5ldGguZ2V0R2FzUHJpY2UoKTtcbiAgICBwYW4ubWV0aG9kc1xuICAgICAgICAuY3JlYXRlQ29nbml0aXZlSm9iKGtlcm5lbCwgZGF0YXNldCwgY29tcGxleGl0eSwgY29uZmlnLndlYjMudXRpbHMudXRmOFRvSGV4KGAke2pvYlR5cGV9OyR7ZGVzY3JpcHRpb24udHJpbSgpfWApKVxuICAgICAgICAuc2VuZCh7XG4gICAgICAgICAgICB2YWx1ZTogY29uZmlnLndlYjMudXRpbHMudG9XZWkoU3RyaW5nKGRlcG9zaXQpKSxcbiAgICAgICAgICAgIGZyb20sXG4gICAgICAgICAgICBnYXNQcmljZSxcbiAgICAgICAgICAgIGdhczogNjcwMDAwMC8vIGJlY2F1c2UgdGhpcyB3b3JrZmxvdyBpcyB0b28gZ3JlZWR5XG4gICAgICAgIH0pXG4gICAgICAgIC5vbignZXJyb3InLCByZWplY3QpXG4gICAgICAgIC5vbigncmVjZWlwdCcsIHJlY2VpcHQgPT4ge1xuXG4gICAgICAgICAgICB0cnkge1xuXG4gICAgICAgICAgICAgICAgaWYgKE51bWJlcihyZWNlaXB0LnN0YXR1cykgPT09IDApIHtcblxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gcmVqZWN0KHBqc0Vycm9yKFRSQU5TQUNUSU9OX1VOU1VDQ0VTU0ZVTCkpO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIGlmIChyZWNlaXB0LmV2ZW50cy5Db2duaXRpdmVKb2JRdWV1ZWQpIHtcbiAgICBcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHJlc29sdmUocmVjZWlwdC5ldmVudHMuQ29nbml0aXZlSm9iUXVldWVkLnJldHVyblZhbHVlcy5qb2JJZCk7XG4gICAgICAgICAgICAgICAgfVxuICAgIFxuICAgICAgICAgICAgICAgIHJlc29sdmUocmVjZWlwdC5ldmVudHMuQ29nbml0aXZlSm9iQ3JlYXRlZC5yZXR1cm5WYWx1ZXMuam9iSWQpO1xuICAgICAgICAgICAgfSBjYXRjaCAoZXJyKSB7XG4gICAgICAgICAgICAgICAgcmVqZWN0KGVycik7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xufSk7XG5cbi8qKlxuICogSGFuZGxlIGV2ZW50IENvZ25pdGl2ZUpvYkNyZWF0ZWRcbiAqIFxuICogQHBhcmFtIHtPYmplY3R9IG9wdGlvbnMgRXZlbnQgaGFuZGxlciBvcHRpb25zXG4gKiBAcGFyYW0ge09iamVjdH0gY29uZmlnIExpYnJhcnkgY29uZmlnIChwcm92aWRlZCBieSB0aGUgcHJveHkgYnV0IGNhbiBiZSBvdmVycmlkZGVuKVxuICogQHJldHVybnMge1Byb21pc2U8e09iamVjdH0+fSBQUHJvbWlzZSBvYmplY3QgcmVzb2x2ZWQgdG8gdGhlIG9iamVjdCB3aXRoIGNoYWluZWQgY2FsbGJhY2tzICNkYXRhIGFuZCAjZXJyb3JcbiAqL1xuZXhwb3J0IGNvbnN0IGV2ZW50Q29nbml0aXZlSm9iQ3JlYXRlZCA9IGFzeW5jIChvcHRpb25zID0ge30sIGNvbmZpZyA9IHt9KSA9PiB7XG5cbiAgICBleHBlY3QuYWxsKHsgb3B0aW9ucyB9LCB7XG4gICAgICAgICdvcHRpb25zJzoge1xuICAgICAgICAgICAgdHlwZTogJ29iamVjdCdcbiAgICAgICAgfVxuICAgIH0pO1xuXG4gICAgZXhwZWN0LmFsbChjb25maWcsIHtcbiAgICAgICAgJ3dlYjMnOiB7XG4gICAgICAgICAgICB0eXBlOiAnb2JqZWN0JyxcbiAgICAgICAgICAgIGNvZGU6IFdFQjNfUkVRVUlSRURcbiAgICAgICAgfSxcbiAgICAgICAgJ2NvbnRyYWN0cy5QYW5kb3JhLmFiaSc6IHtcbiAgICAgICAgICAgIHR5cGU6ICdvYmplY3QnLFxuICAgICAgICAgICAgY29kZTogQ09OVFJBQ1RfUkVRVUlSRUQsXG4gICAgICAgICAgICBhcmdzOiBbJ1BhbmRvcmEnXVxuICAgICAgICB9LFxuICAgICAgICAnYWRkcmVzc2VzLlBhbmRvcmEnOiB7XG4gICAgICAgICAgICB0eXBlOiAnYWRkcmVzcycsXG4gICAgICAgICAgICBjb2RlOiBBRERSRVNTX1JFUVVJUkVELFxuICAgICAgICAgICAgYXJnczogWydQYW5kb3JhJ11cbiAgICAgICAgfVxuICAgIH0pO1xuXG4gICAgY29uc3QgY2FsbGJhY2tzID0ge1xuICAgICAgICBvbkRhdGE6ICgpID0+IHt9LFxuICAgICAgICBvbkVycm9yOiAoKSA9PiB7fVxuICAgIH07XG5cbiAgICBjb25zdCBjaGFpbiA9IHtcbiAgICAgICAgZGF0YTogKGNiID0gKCkgPT4ge30pID0+IHtcbiAgICAgICAgICAgIGNhbGxiYWNrcy5vbkRhdGEgPSBjYjtcbiAgICAgICAgICAgIHJldHVybiBjaGFpbjtcbiAgICAgICAgfSxcbiAgICAgICAgZXJyb3I6IChjYiA9ICgpID0+IHt9KSA9PiB7XG4gICAgICAgICAgICBjYWxsYmFja3Mub25FcnJvciA9IGNiO1xuICAgICAgICAgICAgcmV0dXJuIGNoYWluO1xuICAgICAgICB9XG4gICAgfTtcblxuICAgIGNvbnN0IHBhbiA9IG5ldyBjb25maWcud2ViMy5ldGguQ29udHJhY3QoY29uZmlnLmNvbnRyYWN0cy5QYW5kb3JhLmFiaSwgY29uZmlnLmFkZHJlc3Nlcy5QYW5kb3JhKTtcbiAgICBjaGFpbi5ldmVudCA9IFtdO1xuICAgIGNoYWluLmV2ZW50WzBdID0gcGFuLmV2ZW50cy5Db2duaXRpdmVKb2JDcmVhdGVkKG9wdGlvbnMpXG4gICAgICAgIC5vbignZGF0YScsIGFzeW5jIChldmVudCkgPT4ge1xuXG4gICAgICAgICAgICB0cnkge1xuXG4gICAgICAgICAgICAgICAgY29uc3Qgam9iRGV0YWlscyA9IGF3YWl0IGZldGNoSm9iRGV0YWlscyhldmVudC5yZXR1cm5WYWx1ZXMuam9iSWQsIGNvbmZpZyk7XG4gICAgICAgICAgICAgICAgY2FsbGJhY2tzLm9uRGF0YSh7XG4gICAgICAgICAgICAgICAgICAgIHJlY29yZHM6IFtqb2JEZXRhaWxzXSxcbiAgICAgICAgICAgICAgICAgICAgZXZlbnRcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH0gY2F0Y2goZXJyKSB7XG4gICAgICAgICAgICAgICAgY2FsbGJhY2tzLm9uRXJyb3IoZXJyKTtcbiAgICAgICAgICAgIH0gICAgICAgICAgICBcbiAgICAgICAgfSlcbiAgICAgICAgLm9uKCdlcnJvcicsIGNhbGxiYWNrcy5vbkVycm9yKTtcbiAgICBjaGFpbi5ldmVudFswXS5uYW1lID0gJ0NvZ25pdGl2ZUpvYkNyZWF0ZWQnO1xuXG4gICAgcmV0dXJuIGNoYWluO1xufTtcblxuLyoqXG4gKiBIYW5kbGUgZXZlbnQgSm9iU3RhdGVDaGFuZ2VkXG4gKiBcbiAqIEBwYXJhbSB7T2JqZWN0fSBvcHRpb25zIEV2ZW50IGhhbmRsZXIgb3B0aW9uc1xuICogQHBhcmFtIHtPYmplY3R9IGNvbmZpZyBMaWJyYXJ5IGNvbmZpZyAocHJvdmlkZWQgYnkgdGhlIHByb3h5IGJ1dCBjYW4gYmUgb3ZlcnJpZGRlbilcbiAqIEByZXR1cm5zIHtQcm9taXNlPHtPYmplY3R9Pn0gUFByb21pc2Ugb2JqZWN0IHJlc29sdmVkIHRvIHRoZSBvYmplY3Qgd2l0aCBjaGFpbmVkIGNhbGxiYWNrcyAjZGF0YSBhbmQgI2Vycm9yXG4gKi9cbmV4cG9ydCBjb25zdCBldmVudEpvYlN0YXRlQ2hhbmdlZCA9IGFzeW5jIChvcHRpb25zID0ge30sIGNvbmZpZyA9IHt9KSA9PiB7XG5cbiAgICBleHBlY3QuYWxsKHsgb3B0aW9ucyB9LCB7XG4gICAgICAgICdvcHRpb25zJzoge1xuICAgICAgICAgICAgdHlwZTogJ29iamVjdCdcbiAgICAgICAgfVxuICAgIH0pO1xuXG4gICAgZXhwZWN0LmFsbChjb25maWcsIHtcbiAgICAgICAgJ3dlYjMnOiB7XG4gICAgICAgICAgICB0eXBlOiAnb2JqZWN0JyxcbiAgICAgICAgICAgIGNvZGU6IFdFQjNfUkVRVUlSRURcbiAgICAgICAgfSxcbiAgICAgICAgJ2NvbnRyYWN0cy5QYW5kb3JhLmFiaSc6IHtcbiAgICAgICAgICAgIHR5cGU6ICdvYmplY3QnLFxuICAgICAgICAgICAgY29kZTogQ09OVFJBQ1RfUkVRVUlSRUQsXG4gICAgICAgICAgICBhcmdzOiBbJ1BhbmRvcmEnXVxuICAgICAgICB9LFxuICAgICAgICAnYWRkcmVzc2VzLlBhbmRvcmEnOiB7XG4gICAgICAgICAgICB0eXBlOiAnYWRkcmVzcycsXG4gICAgICAgICAgICBjb2RlOiBBRERSRVNTX1JFUVVJUkVELFxuICAgICAgICAgICAgYXJnczogWydQYW5kb3JhJ11cbiAgICAgICAgfVxuICAgIH0pO1xuXG4gICAgY29uc3QgY2FsbGJhY2tzID0ge1xuICAgICAgICBvbkRhdGE6ICgpID0+IHt9LFxuICAgICAgICBvbkVycm9yOiAoKSA9PiB7fVxuICAgIH07XG5cbiAgICBjb25zdCBjaGFpbiA9IHtcbiAgICAgICAgZGF0YTogKGNiID0gKCkgPT4ge30pID0+IHtcbiAgICAgICAgICAgIGNhbGxiYWNrcy5vbkRhdGEgPSBjYjtcbiAgICAgICAgICAgIHJldHVybiBjaGFpbjtcbiAgICAgICAgfSxcbiAgICAgICAgZXJyb3I6IChjYiA9ICgpID0+IHt9KSA9PiB7XG4gICAgICAgICAgICBjYWxsYmFja3Mub25FcnJvciA9IGNiO1xuICAgICAgICAgICAgcmV0dXJuIGNoYWluO1xuICAgICAgICB9XG4gICAgfTtcblxuICAgIGNvbnN0IGV2ZW50SGFuZGxlciA9IGFzeW5jIGV2ZW50ID0+IHtcbiAgICBcbiAgICAgICAgdHJ5IHtcblxuICAgICAgICAgICAgY29uc3Qgam9iRGV0YWlscyA9IGF3YWl0IGZldGNoSm9iRGV0YWlscyhldmVudC5yZXR1cm5WYWx1ZXMuam9iSWQsIGNvbmZpZyk7XG4gICAgICAgICAgICBjYWxsYmFja3Mub25EYXRhKHtcbiAgICAgICAgICAgICAgICByZWNvcmRzOiBbam9iRGV0YWlsc10sXG4gICAgICAgICAgICAgICAgZXZlbnRcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9IGNhdGNoKGVycikge1xuICAgICAgICAgICAgY2FsbGJhY2tzLm9uRXJyb3IoZXJyKTtcbiAgICAgICAgfSAgICAgICAgICAgIFxuICAgIH07XG5cbiAgICBsZXQgam9iQ29udHJvbGxlciA9IGxvY2FsQ2FjaGUuZ2V0KCdqb2JDb250cm9sbGVyJyk7XG5cbiAgICBpZiAoIWpvYkNvbnRyb2xsZXIpIHtcblxuICAgICAgICBqb2JDb250cm9sbGVyID0gYXdhaXQgZmV0Y2hKb2JDb250cm9sbGVyQWRkcmVzcyhjb25maWcpO1xuICAgIH1cblxuICAgIGNvbnN0IGpjdHJsID0gbmV3IGNvbmZpZy53ZWIzLmV0aC5Db250cmFjdChjb25maWcuY29udHJhY3RzLkNvZ25pdGl2ZUpvYkNvbnRyb2xsZXIuYWJpLCBqb2JDb250cm9sbGVyKTtcbiAgICBcbiAgICAvLyBXZSBsaXN0ZW4gZm9yIHR3byBldmVudHMgYmVjYXVzZSBvZiB0aGVpciBuYXR1cmUgbWVhbnMgYWxtb3N0IHRoZSBzYW1lXG4gICAgY2hhaW4uZXZlbnQgPSBbXTsgICAgXG4gICAgY2hhaW4uZXZlbnQucHVzaChqY3RybC5ldmVudHMuSm9iU3RhdGVDaGFuZ2VkKG9wdGlvbnMpXG4gICAgICAgIC5vbignZGF0YScsIGV2ZW50SGFuZGxlcilcbiAgICAgICAgLm9uKCdlcnJvcicsIGNhbGxiYWNrcy5vbkVycm9yKSk7XG4gICAgY2hhaW4uZXZlbnRbMF0ubmFtZSA9ICdKb2JTdGF0ZUNoYW5nZWQnO1xuXG4gICAgY2hhaW4uZXZlbnQucHVzaChqY3RybC5ldmVudHMuQ29nbml0aW9uUHJvZ3Jlc3NlZChvcHRpb25zKVxuICAgICAgICAub24oJ2RhdGEnLCBldmVudEhhbmRsZXIpXG4gICAgICAgIC5vbignZXJyb3InLCBjYWxsYmFja3Mub25FcnJvcikpO1xuICAgIGNoYWluLmV2ZW50WzFdLm5hbWUgPSAnQ29nbml0aW9uUHJvZ3Jlc3NlZCc7XG5cbiAgICByZXR1cm4gY2hhaW47XG59O1xuIl19