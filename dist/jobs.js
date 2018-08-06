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
    progress,
    state
  } = await jctrl.methods.getCognitiveJobDetails(address).call();
  const kernelIpfs = await (0, _kernels.fetchIpfsAddress)(kernel, config);
  const datasetIpfs = await (0, _datasets.fetchIpfsAddress)(dataset, config);
  const ipfsResults = await Promise.all(activeWorkers.map((_, index) => jctrl.methods.getCognitiveJobResults(address, index).call()));
  const utf8description = description ? config.web3.utils.hexToUtf8(description) : '';
  const serviceInfo = await fetchServiceInfo(address, config);
  return {
    address,
    kernel,
    kernelIpfs,
    dataset,
    datasetIpfs,
    activeWorkers,
    ipfsResults: ipfsResults.map(result => result ? config.web3.utils.hexToUtf8(result) : result).filter(res => res),
    complexity: Number(complexity),
    progress: Number(progress),
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

  (async () => {
    let jobController = localCache.get('jobController');

    if (!jobController) {
      jobController = await fetchJobControllerAddress(config);
    }

    const jctrl = new config.web3.eth.Contract(config.contracts.CognitiveJobController.abi, jobController);
    chain.event = jctrl.events.JobStateChanged(options).on('data', async event => {
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
  })();

  return chain;
};

exports.eventJobStateChanged = eventJobStateChanged;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9qb2JzLmpzIl0sIm5hbWVzIjpbImxvY2FsQ2FjaGUiLCJNYXAiLCJmZXRjaEpvYkNvbnRyb2xsZXJBZGRyZXNzIiwiY29uZmlnIiwiZXhwZWN0IiwiYWxsIiwidHlwZSIsImNvZGUiLCJXRUIzX1JFUVVJUkVEIiwiQUREUkVTU19SRVFVSVJFRCIsImFyZ3MiLCJDT05UUkFDVF9SRVFVSVJFRCIsInBhbiIsIndlYjMiLCJldGgiLCJDb250cmFjdCIsImNvbnRyYWN0cyIsIlBhbmRvcmEiLCJhYmkiLCJhZGRyZXNzZXMiLCJqb2JDb250cm9sbGVyIiwibWV0aG9kcyIsImNhbGwiLCJzZXQiLCJmZXRjaEFjdGl2ZUpvYnNDb3VudCIsImdldCIsImpjdHJsIiwiQ29nbml0aXZlSm9iQ29udHJvbGxlciIsImNvdW50IiwiYWN0aXZlSm9ic0NvdW50IiwiTnVtYmVyIiwicGFyc2VJbnQiLCJmZXRjaENvbXBsZXRlZEpvYnNDb3VudCIsImNvbXBsZXRlZEpvYnNDb3VudCIsImZldGNoU2VydmljZUluZm8iLCJhZGRyZXNzIiwicmVzcG9uc2VUaW1lc3RhbXBzIiwicmVzcG9uc2VGbGFncyIsImdldENvZ25pdGl2ZUpvYlNlcnZpY2VJbmZvIiwiZmV0Y2hKb2JEZXRhaWxzIiwia2VybmVsIiwiZGF0YXNldCIsImNvbXBsZXhpdHkiLCJkZXNjcmlwdGlvbiIsImFjdGl2ZVdvcmtlcnMiLCJwcm9ncmVzcyIsInN0YXRlIiwiZ2V0Q29nbml0aXZlSm9iRGV0YWlscyIsImtlcm5lbElwZnMiLCJkYXRhc2V0SXBmcyIsImlwZnNSZXN1bHRzIiwiUHJvbWlzZSIsIm1hcCIsIl8iLCJpbmRleCIsImdldENvZ25pdGl2ZUpvYlJlc3VsdHMiLCJ1dGY4ZGVzY3JpcHRpb24iLCJ1dGlscyIsImhleFRvVXRmOCIsInNlcnZpY2VJbmZvIiwicmVzdWx0IiwiZmlsdGVyIiwicmVzIiwic3Vic3RyIiwiam9iVHlwZSIsImZldGNoSm9ic0lkcyIsInNvdXJjZSIsInZhbHVlcyIsImNvdW50cyIsIkFycmF5Iiwia2V5cyIsImdldEpvYklkIiwiY3JlYXRlIiwiZGVwb3NpdCIsImZyb20iLCJyZXNvbHZlIiwicmVqZWN0IiwiZ2FzUHJpY2UiLCJnZXRHYXNQcmljZSIsImNyZWF0ZUNvZ25pdGl2ZUpvYiIsInV0ZjhUb0hleCIsInRyaW0iLCJzZW5kIiwidmFsdWUiLCJ0b1dlaSIsIlN0cmluZyIsImdhcyIsIm9uIiwicmVjZWlwdCIsInN0YXR1cyIsIlRSQU5TQUNUSU9OX1VOU1VDQ0VTU0ZVTCIsImV2ZW50cyIsIkNvZ25pdGl2ZUpvYlF1ZXVlZCIsInJldHVyblZhbHVlcyIsImpvYklkIiwiQ29nbml0aXZlSm9iQ3JlYXRlZCIsImVyciIsImZldGNoQWxsIiwicmVjb3JkcyIsImVycm9yIiwiYWN0aXZlQ291bnQiLCJjb21wbGV0ZWRDb3VudCIsImFjdGl2ZUpvYnNJZHMiLCJjb21wbGV0ZWRKb2JzSWRzIiwiYWxsSm9ic0lkcyIsInB1c2giLCJtZXNzYWdlIiwiZXZlbnRDb2duaXRpdmVKb2JDcmVhdGVkIiwib3B0aW9ucyIsImNhbGxiYWNrcyIsIm9uRGF0YSIsIm9uRXJyb3IiLCJjaGFpbiIsImRhdGEiLCJjYiIsImV2ZW50Iiwiam9iRGV0YWlscyIsImV2ZW50Sm9iU3RhdGVDaGFuZ2VkIiwiSm9iU3RhdGVDaGFuZ2VkIl0sIm1hcHBpbmdzIjoiQUFBQTs7Ozs7Ozs7QUFTQTs7Ozs7OztBQUVBOztBQUNBOztBQU9BOztBQUlBOzs7O0FBSUEsTUFBTUEsVUFBVSxHQUFHLElBQUlDLEdBQUosRUFBbkI7QUFFQTs7Ozs7OztBQU1PLE1BQU1DLHlCQUF5QixHQUFHLE9BQU9DLE1BQU0sR0FBRyxFQUFoQixLQUF1QjtBQUU1REMsRUFBQUEsTUFBTSxDQUFDQyxHQUFQLENBQVdGLE1BQVgsRUFBbUI7QUFDZixZQUFRO0FBQ0pHLE1BQUFBLElBQUksRUFBRSxRQURGO0FBRUpDLE1BQUFBLElBQUksRUFBRUM7QUFGRixLQURPO0FBS2YseUJBQXFCO0FBQ2pCRixNQUFBQSxJQUFJ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LEVBQ1RyQixFQURTLENBQ04sTUFETSxFQUNFLE1BQU00QixLQUFOLElBQWU7QUFFdkIsVUFBSTtBQUVBLGNBQU1DLFVBQVUsR0FBRyxNQUFNN0UsZUFBZSxDQUFDNEUsS0FBSyxDQUFDdEIsWUFBTixDQUFtQkMsS0FBcEIsRUFBMkIzRixNQUEzQixDQUF4QztBQUNBMEcsUUFBQUEsU0FBUyxDQUFDQyxNQUFWLENBQWlCO0FBQ2JaLFVBQUFBLE9BQU8sRUFBRSxDQUFDa0IsVUFBRCxDQURJO0FBRWJELFVBQUFBO0FBRmEsU0FBakI7QUFJSCxPQVBELENBT0UsT0FBTW5CLEdBQU4sRUFBVztBQUNUYSxRQUFBQSxTQUFTLENBQUNFLE9BQVYsQ0FBa0JmLEdBQWxCO0FBQ0g7QUFDSixLQWJTLEVBY1RULEVBZFMsQ0FjTixPQWRNLEVBY0dzQixTQUFTLENBQUNFLE9BZGIsQ0FBZDtBQWVILEdBekJEOztBQTJCQSxTQUFPQyxLQUFQO0FBQ0gsQ0FyRU0iLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIENvZ25pdGl2ZSBKb2JzIHJlbGF0ZWQgbWV0aG9kc1xuICogVGhpcyBmaWxlIGl0IGlzIGEgcGFydCBvZiB0aGUgUGFuZG9yYSBQeXJyaGEgSmF2YXNjcmlwdCBsaWJyYXJ5XG4gKiBcbiAqIEBmaWxlIGpvYnMuanNcbiAqIEBhdXRob3IgS29zdGlhbnR5biBTbXlybm92IDxrb3N0eXNoQGdtYWlsLmNvbT5cbiAqIEBkYXRlIDIwMThcbiAqL1xuXG4ndXNlIHN0cmljdCc7XG5cbmltcG9ydCAqIGFzIGV4cGVjdCBmcm9tICcuL2hlbHBlcnMvZXhwZWN0JztcbmltcG9ydCBwanNFcnJvciwge1xuICAgIENPTlRSQUNUX1JFUVVJUkVELFxuICAgIEFERFJFU1NfUkVRVUlSRUQsXG4gICAgV0VCM19SRVFVSVJFRCxcbiAgICBUUkFOU0FDVElPTl9VTlNVQ0NFU1NGVUxcbn0gZnJvbSAnLi9oZWxwZXJzL2Vycm9ycyc7XG5cbmltcG9ydCB7XG4gICAgZmV0Y2hJcGZzQWRkcmVzcyBhcyBmZXRjaElwZnNBZGRyZXNzQnlLZXJuZWxBZGRyZXNzXG59IGZyb20gJy4va2VybmVscyc7XG5cbmltcG9ydCB7XG4gICAgZmV0Y2hJcGZzQWRkcmVzcyBhcyBmZXRjaElwZnNBZGRyZXNzQnlEYXRhc2V0QWRkcmVzc1xufSBmcm9tICcuL2RhdGFzZXRzJztcblxuY29uc3QgbG9jYWxDYWNoZSA9IG5ldyBNYXAoKTtcblxuLyoqXG4gKiBHZXQgam9iIGNvbnRyb2xsZXIgYWRkcmVzc1xuICogXG4gKiBAcGFyYW0ge09iamVjdH0gY29uZmlnIExpYnJhcnkgY29uZmlnIChwcm92aWRlZCBieSB0aGUgcHJveHkgYnV0IGNhbiBiZSBvdmVycmlkZGVuKVxuICogQHJldHVybnMge1Byb21pc2U8e1N0cmluZ30+fSBcbiAqL1xuZXhwb3J0IGNvbnN0IGZldGNoSm9iQ29udHJvbGxlckFkZHJlc3MgPSBhc3luYyAoY29uZmlnID0ge30pID0+IHtcblxuICAgIGV4cGVjdC5hbGwoY29uZmlnLCB7XG4gICAgICAgICd3ZWIzJzoge1xuICAgICAgICAgICAgdHlwZTogJ29iamVjdCcsXG4gICAgICAgICAgICBjb2RlOiBXRUIzX1JFUVVJUkVEXG4gICAgICAgIH0sXG4gICAgICAgICdhZGRyZXNzZXMuUGFuZG9yYSc6IHtcbiAgICAgICAgICAgIHR5cGU6ICdhZGRyZXNzJyxcbiAgICAgICAgICAgIGNvZGU6IEFERFJFU1NfUkVRVUlSRUQsXG4gICAgICAgICAgICBhcmdzOiBbJ1BhbmRvcmEnXVxuICAgICAgICB9LFxuICAgICAgICAnY29udHJhY3RzLlBhbmRvcmEuYWJpJzoge1xuICAgICAgICAgICAgdHlwZTogJ29iamVjdCcsXG4gICAgICAgICAgICBjb2RlOiBDT05UUkFDVF9SRVFVSVJFRCxcbiAgICAgICAgICAgIGFyZ3M6IFsnUGFuZG9yYSddXG4gICAgICAgIH1cbiAgICB9KTtcblxuICAgIGNvbnN0IHBhbiA9IG5ldyBjb25maWcud2ViMy5ldGguQ29udHJhY3QoY29uZmlnLmNvbnRyYWN0cy5QYW5kb3JhLmFiaSwgY29uZmlnLmFkZHJlc3Nlcy5QYW5kb3JhKTtcbiAgICBjb25zdCBqb2JDb250cm9sbGVyID0gYXdhaXQgcGFuLm1ldGhvZHNcbiAgICAgICAgLmpvYkNvbnRyb2xsZXIoKVxuICAgICAgICAuY2FsbCgpO1xuXG4gICAgLy8gc2F2ZSBmb3IgbGF0ZXIgdXNlXG4gICAgbG9jYWxDYWNoZS5zZXQoJ2pvYkNvbnRyb2xsZXInLCBqb2JDb250cm9sbGVyKTtcbiAgICAgICAgXG4gICAgcmV0dXJuIGpvYkNvbnRyb2xsZXI7XG59O1xuXG4vKipcbiAqIEdldCBhY3RpdmUgam9icyBjb3VudCBcbiAqIFxuICogQHBhcmFtIHtPYmplY3R9IGNvbmZpZyBMaWJyYXJ5IGNvbmZpZyAocHJvdmlkZWQgYnkgdGhlIHByb3h5IGJ1dCBjYW4gYmUgb3ZlcnJpZGRlbilcbiAqIEByZXR1cm5zIHtQcm9taXNlPHtOdW1iZXJ9Pn0gXG4gKi9cbmV4cG9ydCBjb25zdCBmZXRjaEFjdGl2ZUpvYnNDb3VudCA9IGFzeW5jIChjb25maWcgPSB7fSkgPT4ge1xuXG4gICAgZXhwZWN0LmFsbChjb25maWcsIHtcbiAgICAgICAgJ3dlYjMnOiB7XG4gICAgICAgICAgICB0eXBlOiAnb2JqZWN0JyxcbiAgICAgICAgICAgIGNvZGU6IFdFQjNfUkVRVUlSRURcbiAgICAgICAgfSxcbiAgICAgICAgJ2NvbnRyYWN0cy5Db2duaXRpdmVKb2JDb250cm9sbGVyLmFiaSc6IHtcbiAgICAgICAgICAgIHR5cGU6ICdvYmplY3QnLFxuICAgICAgICAgICAgY29kZTogQ09OVFJBQ1RfUkVRVUlSRUQsXG4gICAgICAgICAgICBhcmdzOiBbJ0NvZ25pdGl2ZUpvYkNvbnRyb2xsZXInXVxuICAgICAgICB9XG4gICAgfSk7XG5cbiAgICBsZXQgam9iQ29udHJvbGxlciA9IGxvY2FsQ2FjaGUuZ2V0KCdqb2JDb250cm9sbGVyJyk7XG5cbiAgICBpZiAoIWpvYkNvbnRyb2xsZXIpIHtcblxuICAgICAgICBqb2JDb250cm9sbGVyID0gYXdhaXQgZmV0Y2hKb2JDb250cm9sbGVyQWRkcmVzcyhjb25maWcpO1xuICAgIH1cblxuICAgIGNvbnN0IGpjdHJsID0gbmV3IGNvbmZpZy53ZWIzLmV0aC5Db250cmFjdChjb25maWcuY29udHJhY3RzLkNvZ25pdGl2ZUpvYkNvbnRyb2xsZXIuYWJpLCBqb2JDb250cm9sbGVyKTtcbiAgICBjb25zdCBjb3VudCA9IGF3YWl0IGpjdHJsLm1ldGhvZHNcbiAgICAgICAgLmFjdGl2ZUpvYnNDb3VudCgpXG4gICAgICAgIC5jYWxsKCk7XG4gICAgICAgIFxuICAgIHJldHVybiBOdW1iZXIucGFyc2VJbnQoY291bnQsIDEwKTtcbn07XG5cbi8qKlxuICogR2V0IGNvbXBsZXRlZCBqb2JzIGNvdW50IFxuICogXG4gKiBAcGFyYW0ge09iamVjdH0gY29uZmlnIExpYnJhcnkgY29uZmlnIChwcm92aWRlZCBieSB0aGUgcHJveHkgYnV0IGNhbiBiZSBvdmVycmlkZGVuKVxuICogQHJldHVybnMge1Byb21pc2U8e051bWJlcn0+fSBcbiAqL1xuZXhwb3J0IGNvbnN0IGZldGNoQ29tcGxldGVkSm9ic0NvdW50ID0gYXN5bmMgKGNvbmZpZyA9IHt9KSA9PiB7XG5cbiAgICBleHBlY3QuYWxsKGNvbmZpZywge1xuICAgICAgICAnd2ViMyc6IHtcbiAgICAgICAgICAgIHR5cGU6ICdvYmplY3QnLFxuICAgICAgICAgICAgY29kZTogV0VCM19SRVFVSVJFRFxuICAgICAgICB9LFxuICAgICAgICAnY29udHJhY3RzLkNvZ25pdGl2ZUpvYkNvbnRyb2xsZXIuYWJpJzoge1xuICAgICAgICAgICAgdHlwZTogJ29iamVjdCcsXG4gICAgICAgICAgICBjb2RlOiBDT05UUkFDVF9SRVFVSVJFRCxcbiAgICAgICAgICAgIGFyZ3M6IFsnQ29nbml0aXZlSm9iQ29udHJvbGxlciddXG4gICAgICAgIH1cbiAgICB9KTtcblxuICAgIGxldCBqb2JDb250cm9sbGVyID0gbG9jYWxDYWNoZS5nZXQoJ2pvYkNvbnRyb2xsZXInKTtcblxuICAgIGlmICgham9iQ29udHJvbGxlcikge1xuXG4gICAgICAgIGpvYkNvbnRyb2xsZXIgPSBhd2FpdCBmZXRjaEpvYkNvbnRyb2xsZXJBZGRyZXNzKGNvbmZpZyk7XG4gICAgfVxuXG4gICAgY29uc3QgamN0cmwgPSBuZXcgY29uZmlnLndlYjMuZXRoLkNvbnRyYWN0KGNvbmZpZy5jb250cmFjdHMuQ29nbml0aXZlSm9iQ29udHJvbGxlci5hYmksIGpvYkNvbnRyb2xsZXIpO1xuICAgIGNvbnN0IGNvdW50ID0gYXdhaXQgamN0cmwubWV0aG9kc1xuICAgICAgICAuY29tcGxldGVkSm9ic0NvdW50KClcbiAgICAgICAgLmNhbGwoKTtcbiAgICAgICAgXG4gICAgcmV0dXJuIE51bWJlci5wYXJzZUludChjb3VudCwgMTApO1xufTtcblxuLyoqXG4gKiBHZXQgam9iIHNlcnZpY2UgaW5mbyBcbiAqIFxuICogQHBhcmFtIHtTdHJpbmd9IGFkZHJlc3MgSm9iIGFkZHJlc3NcbiAqIEBwYXJhbSB7T2JqZWN0fSBjb25maWcgTGlicmFyeSBjb25maWcgKHByb3ZpZGVkIGJ5IHRoZSBwcm94eSBidXQgY2FuIGJlIG92ZXJyaWRkZW4pXG4gKiBAcmV0dXJucyB7UHJvbWlzZTx7TnVtYmVyfT59IFxuICovXG5leHBvcnQgY29uc3QgZmV0Y2hTZXJ2aWNlSW5mbyA9IGFzeW5jIChhZGRyZXNzLCBjb25maWcgPSB7fSkgPT4ge1xuXG4gICAgZXhwZWN0LmFsbChjb25maWcsIHtcbiAgICAgICAgJ3dlYjMnOiB7XG4gICAgICAgICAgICB0eXBlOiAnb2JqZWN0JyxcbiAgICAgICAgICAgIGNvZGU6IFdFQjNfUkVRVUlSRURcbiAgICAgICAgfSxcbiAgICAgICAgJ2NvbnRyYWN0cy5Db2duaXRpdmVKb2JDb250cm9sbGVyLmFiaSc6IHtcbiAgICAgICAgICAgIHR5cGU6ICdvYmplY3QnLFxuICAgICAgICAgICAgY29kZTogQ09OVFJBQ1RfUkVRVUlSRUQsXG4gICAgICAgICAgICBhcmdzOiBbJ0NvZ25pdGl2ZUpvYkNvbnRyb2xsZXInXVxuICAgICAgICB9XG4gICAgfSk7XG5cbiAgICBsZXQgam9iQ29udHJvbGxlciA9IGxvY2FsQ2FjaGUuZ2V0KCdqb2JDb250cm9sbGVyJyk7XG5cbiAgICBpZiAoIWpvYkNvbnRyb2xsZXIpIHtcblxuICAgICAgICBqb2JDb250cm9sbGVyID0gYXdhaXQgZmV0Y2hKb2JDb250cm9sbGVyQWRkcmVzcyhjb25maWcpO1xuICAgIH1cblxuICAgIGNvbnN0IGpjdHJsID0gbmV3IGNvbmZpZy53ZWIzLmV0aC5Db250cmFjdChjb25maWcuY29udHJhY3RzLkNvZ25pdGl2ZUpvYkNvbnRyb2xsZXIuYWJpLCBqb2JDb250cm9sbGVyKTtcblxuICAgIGNvbnN0IHsgcmVzcG9uc2VUaW1lc3RhbXBzLCByZXNwb25zZUZsYWdzIH0gPSBhd2FpdCBqY3RybC5tZXRob2RzXG4gICAgICAgIC5nZXRDb2duaXRpdmVKb2JTZXJ2aWNlSW5mbyhhZGRyZXNzKVxuICAgICAgICAuY2FsbCgpO1xuXG4gICAgcmV0dXJuIHsgXG4gICAgICAgIHJlc3BvbnNlVGltZXN0YW1wcywgXG4gICAgICAgIHJlc3BvbnNlRmxhZ3MgXG4gICAgfTtcbn07XG5cbi8qKlxuICogR2V0IGpvYiBkZXRhaWxzIFxuICogXG4gKiBAcGFyYW0ge1N0cmluZ30gYWRkcmVzcyBKb2IgYWRkcmVzc1xuICogQHBhcmFtIHtPYmplY3R9IGNvbmZpZyBMaWJyYXJ5IGNvbmZpZyAocHJvdmlkZWQgYnkgdGhlIHByb3h5IGJ1dCBjYW4gYmUgb3ZlcnJpZGRlbilcbiAqIEByZXR1cm5zIHtQcm9taXNlPHtOdW1iZXJ9Pn0gXG4gKi9cbmV4cG9ydCBjb25zdCBmZXRjaEpvYkRldGFpbHMgPSBhc3luYyAoYWRkcmVzcywgY29uZmlnID0ge30pID0+IHtcblxuICAgIGV4cGVjdC5hbGwoY29uZmlnLCB7XG4gICAgICAgICd3ZWIzJzoge1xuICAgICAgICAgICAgdHlwZTogJ29iamVjdCcsXG4gICAgICAgICAgICBjb2RlOiBXRUIzX1JFUVVJUkVEXG4gICAgICAgIH0sXG4gICAgICAgICdjb250cmFjdHMuQ29nbml0aXZlSm9iQ29udHJvbGxlci5hYmknOiB7XG4gICAgICAgICAgICB0eXBlOiAnb2JqZWN0JyxcbiAgICAgICAgICAgIGNvZGU6IENPTlRSQUNUX1JFUVVJUkVELFxuICAgICAgICAgICAgYXJnczogWydDb2duaXRpdmVKb2JDb250cm9sbGVyJ11cbiAgICAgICAgfVxuICAgIH0pO1xuXG4gICAgbGV0IGpvYkNvbnRyb2xsZXIgPSBsb2NhbENhY2hlLmdldCgnam9iQ29udHJvbGxlcicpO1xuXG4gICAgaWYgKCFqb2JDb250cm9sbGVyKSB7XG5cbiAgICAgICAgam9iQ29udHJvbGxlciA9IGF3YWl0IGZldGNoSm9iQ29udHJvbGxlckFkZHJlc3MoY29uZmlnKTtcbiAgICB9XG5cbiAgICBjb25zdCBqY3RybCA9IG5ldyBjb25maWcud2ViMy5ldGguQ29udHJhY3QoY29uZmlnLmNvbnRyYWN0cy5Db2duaXRpdmVKb2JDb250cm9sbGVyLmFiaSwgam9iQ29udHJvbGxlcik7XG4gICAgXG4gICAgY29uc3QgeyBrZXJuZWwsIGRhdGFzZXQsIGNvbXBsZXhpdHksIGRlc2NyaXB0aW9uLCBhY3RpdmVXb3JrZXJzLCBwcm9ncmVzcywgc3RhdGUgfSA9IGF3YWl0IGpjdHJsLm1ldGhvZHNcbiAgICAgICAgLmdldENvZ25pdGl2ZUpvYkRldGFpbHMoYWRkcmVzcylcbiAgICAgICAgLmNhbGwoKTtcbiAgICBjb25zdCBrZXJuZWxJcGZzID0gYXdhaXQgZmV0Y2hJcGZzQWRkcmVzc0J5S2VybmVsQWRkcmVzcyhrZXJuZWwsIGNvbmZpZyk7XG4gICAgY29uc3QgZGF0YXNldElwZnMgPSBhd2FpdCBmZXRjaElwZnNBZGRyZXNzQnlEYXRhc2V0QWRkcmVzcyhkYXRhc2V0LCBjb25maWcpO1xuICAgIGNvbnN0IGlwZnNSZXN1bHRzID0gYXdhaXQgUHJvbWlzZS5hbGwoYWN0aXZlV29ya2Vycy5tYXAoKF8sIGluZGV4KSA9PiBqY3RybC5tZXRob2RzLmdldENvZ25pdGl2ZUpvYlJlc3VsdHMoYWRkcmVzcywgaW5kZXgpLmNhbGwoKSkpOyAgICBcbiAgICBjb25zdCB1dGY4ZGVzY3JpcHRpb24gPSBkZXNjcmlwdGlvbiA/IGNvbmZpZy53ZWIzLnV0aWxzLmhleFRvVXRmOChkZXNjcmlwdGlvbikgOiAnJztcbiAgICBjb25zdCBzZXJ2aWNlSW5mbyA9IGF3YWl0IGZldGNoU2VydmljZUluZm8oYWRkcmVzcywgY29uZmlnKTtcblxuICAgIHJldHVybiB7XG4gICAgICAgIGFkZHJlc3MsIFxuICAgICAgICBrZXJuZWwsXG4gICAgICAgIGtlcm5lbElwZnMsXG4gICAgICAgIGRhdGFzZXQsXG4gICAgICAgIGRhdGFzZXRJcGZzLFxuICAgICAgICBhY3RpdmVXb3JrZXJzLFxuICAgICAgICBpcGZzUmVzdWx0czogaXBmc1Jlc3VsdHMubWFwKHJlc3VsdCA9PiByZXN1bHQgPyBjb25maWcud2ViMy51dGlscy5oZXhUb1V0ZjgocmVzdWx0KSA6IHJlc3VsdCkuZmlsdGVyKHJlcyA9PiByZXMpLFxuICAgICAgICBjb21wbGV4aXR5OiBOdW1iZXIoY29tcGxleGl0eSksXG4gICAgICAgIHByb2dyZXNzOiBOdW1iZXIocHJvZ3Jlc3MpLFxuICAgICAgICBzdGF0ZTogTnVtYmVyKHN0YXRlKSxcbiAgICAgICAgZGVzY3JpcHRpb246IHV0ZjhkZXNjcmlwdGlvbi5zdWJzdHIoMiksXG4gICAgICAgIGpvYlR5cGU6IHV0ZjhkZXNjcmlwdGlvbi5zdWJzdHIoMCwgMSksXG4gICAgICAgIHNlcnZpY2VJbmZvXG4gICAgfTtcbn07XG5cbi8qKlxuICogR2V0IGpvYnMgSWQgZnJvbSB0aGUgXCJzb3VyY2VcIlxuICogXG4gKiBAcGFyYW0ge1N0cmluZ30gZnJvbSBzb3VyY2UgYWN0aXZlSm9icyBvciBjb21wbGV0ZWRKb2JzXG4gKiBAcGFyYW0ge051bWJlcn0gY291bnRcbiAqIEBwYXJhbSB7T2JqZWN0fSBvcHRpb25zXG4gKiBAcmV0dXJucyB7UHJvbWlzZTxbe1N0cmluZ31dPn0gXG4gKi9cbmV4cG9ydCBjb25zdCBmZXRjaEpvYnNJZHMgPSBhc3luYyAoc291cmNlLCBjb3VudCA9IDAsIGNvbmZpZyA9IHt9KSA9PiB7XG5cbiAgICBleHBlY3QuYWxsKHsgc291cmNlIH0sIHtcbiAgICAgICAgJ3NvdXJjZSc6IHtcbiAgICAgICAgICAgIHR5cGU6ICdlbnVtJyxcbiAgICAgICAgICAgIHZhbHVlczogWydhY3RpdmVKb2JzJywgJ2NvbXBsZXRlZEpvYnMnXVxuICAgICAgICB9XG4gICAgfSk7XG5cbiAgICBleHBlY3QuYWxsKGNvbmZpZywge1xuICAgICAgICAnd2ViMyc6IHtcbiAgICAgICAgICAgIHR5cGU6ICdvYmplY3QnLFxuICAgICAgICAgICAgY29kZTogV0VCM19SRVFVSVJFRFxuICAgICAgICB9LFxuICAgICAgICAnY29udHJhY3RzLkNvZ25pdGl2ZUpvYkNvbnRyb2xsZXIuYWJpJzoge1xuICAgICAgICAgICAgdHlwZTogJ29iamVjdCcsXG4gICAgICAgICAgICBjb2RlOiBDT05UUkFDVF9SRVFVSVJFRCxcbiAgICAgICAgICAgIGFyZ3M6IFsnQ29nbml0aXZlSm9iQ29udHJvbGxlciddXG4gICAgICAgIH1cbiAgICB9KTsgICAgXG5cbiAgICBsZXQgam9iQ29udHJvbGxlciA9IGxvY2FsQ2FjaGUuZ2V0KCdqb2JDb250cm9sbGVyJyk7XG5cbiAgICBpZiAoIWpvYkNvbnRyb2xsZXIpIHtcblxuICAgICAgICBqb2JDb250cm9sbGVyID0gYXdhaXQgZmV0Y2hKb2JDb250cm9sbGVyQWRkcmVzcyhjb25maWcpO1xuICAgIH1cblxuICAgIC8vIG51bWJlcnMgc2VxdWVuY2UgZnJvbSAwIHRvIGNvdW50XG4gICAgY29uc3QgY291bnRzID0gWy4uLkFycmF5KGNvdW50KS5rZXlzKCldO1xuXG4gICAgY29uc3QgamN0cmwgPSBuZXcgY29uZmlnLndlYjMuZXRoLkNvbnRyYWN0KGNvbmZpZy5jb250cmFjdHMuQ29nbml0aXZlSm9iQ29udHJvbGxlci5hYmksIGpvYkNvbnRyb2xsZXIpO1xuICAgIGNvbnN0IGFkZHJlc3NlcyA9IGF3YWl0IFByb21pc2UuYWxsKGNvdW50cy5tYXAoaW5kZXggPT4gamN0cmwubWV0aG9kcy5nZXRKb2JJZChpbmRleCwgc291cmNlID09PSAnYWN0aXZlSm9icycpLmNhbGwoKSkpO1xuICAgICAgICBcbiAgICByZXR1cm4gYWRkcmVzc2VzO1xufTtcblxuLyoqXG4gKiBDcmVhdGUgY29nbml0aXZlIGpvYiBjb250cmFjdFxuICogXG4gKiBAcGFyYW0ge09iamVjdH0gb3B0aW9uc1xuICogQHBhcmFtIHtTdHJpbmd9IGZyb20gUHVibGlzaGVyIGFkZHJlc3NcbiAqIEBwYXJhbSB7T2JqZWN0fSBjb25maWcgTGlicmFyeSBjb25maWcgKHByb3ZpZGVkIGJ5IHRoZSBwcm94eSBidXQgY2FuIGJlIG92ZXJyaWRkZW4pXG4gKiBAcmV0dXJucyB7UHJvbWlzZX0gUHJvbWlzZSBvYmplY3QgcmVzb2x2ZWQgdG8gYWRkIHN0YXR1cyAoYm9vbGVhbilcbiAqL1xuZXhwb3J0IGNvbnN0IGNyZWF0ZSA9ICh7a2VybmVsLCBkYXRhc2V0LCBjb21wbGV4aXR5LCBqb2JUeXBlLCBkZXNjcmlwdGlvbiwgZGVwb3NpdH0sIGZyb20sIGNvbmZpZyA9IHt9KSA9PiBuZXcgUHJvbWlzZShhc3luYyAocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG5cbiAgICBleHBlY3QuYWxsKHsga2VybmVsLCBkYXRhc2V0LCBjb21wbGV4aXR5LCBqb2JUeXBlLCBkZXNjcmlwdGlvbiwgZGVwb3NpdCwgZnJvbSB9LCB7XG4gICAgICAgICdrZXJuZWwnOiB7XG4gICAgICAgICAgICB0eXBlOiAnYWRkcmVzcydcbiAgICAgICAgfSxcbiAgICAgICAgJ2RhdGFzZXQnOiB7XG4gICAgICAgICAgICB0eXBlOiAnYWRkcmVzcydcbiAgICAgICAgfSxcbiAgICAgICAgJ2NvbXBsZXhpdHknOiB7XG4gICAgICAgICAgICB0eXBlOiAnbnVtYmVyJ1xuICAgICAgICB9LFxuICAgICAgICAnam9iVHlwZSc6IHtcbiAgICAgICAgICAgIHR5cGU6ICdzdHJpbmcnXG4gICAgICAgIH0sXG4gICAgICAgICdkZXNjcmlwdGlvbic6IHtcbiAgICAgICAgICAgIHR5cGU6ICdzdHJpbmcnXG4gICAgICAgIH0sXG4gICAgICAgICdkZXBvc2l0Jzoge1xuICAgICAgICAgICAgdHlwZTogJ251bWJlcidcbiAgICAgICAgfSxcbiAgICAgICAgJ2Zyb20nOiB7XG4gICAgICAgICAgICB0eXBlOiAnYWRkcmVzcydcbiAgICAgICAgfVxuICAgIH0pO1xuXG4gICAgZXhwZWN0LmFsbChjb25maWcsIHtcbiAgICAgICAgJ3dlYjMnOiB7XG4gICAgICAgICAgICB0eXBlOiAnb2JqZWN0JyxcbiAgICAgICAgICAgIGNvZGU6IFdFQjNfUkVRVUlSRURcbiAgICAgICAgfSxcbiAgICAgICAgJ2NvbnRyYWN0cy5QYW5kb3JhLmFiaSc6IHtcbiAgICAgICAgICAgIHR5cGU6ICdvYmplY3QnLFxuICAgICAgICAgICAgY29kZTogQ09OVFJBQ1RfUkVRVUlSRUQsXG4gICAgICAgICAgICBhcmdzOiBbJ1BhbmRvcmEnXVxuICAgICAgICB9LFxuICAgICAgICAnYWRkcmVzc2VzLlBhbmRvcmEnOiB7XG4gICAgICAgICAgICB0eXBlOiAnYWRkcmVzcycsXG4gICAgICAgICAgICBjb2RlOiBBRERSRVNTX1JFUVVJUkVELFxuICAgICAgICAgICAgYXJnczogWydQYW5kb3JhJ11cbiAgICAgICAgfVxuICAgIH0pO1xuXG4gICAgY29uc3QgcGFuID0gbmV3IGNvbmZpZy53ZWIzLmV0aC5Db250cmFjdChjb25maWcuY29udHJhY3RzLlBhbmRvcmEuYWJpLCBjb25maWcuYWRkcmVzc2VzLlBhbmRvcmEpO1xuICAgIGNvbnN0IGdhc1ByaWNlID0gYXdhaXQgY29uZmlnLndlYjMuZXRoLmdldEdhc1ByaWNlKCk7XG4gICAgcGFuLm1ldGhvZHNcbiAgICAgICAgLmNyZWF0ZUNvZ25pdGl2ZUpvYihrZXJuZWwsIGRhdGFzZXQsIGNvbXBsZXhpdHksIGNvbmZpZy53ZWIzLnV0aWxzLnV0ZjhUb0hleChgJHtqb2JUeXBlfTske2Rlc2NyaXB0aW9uLnRyaW0oKX1gKSlcbiAgICAgICAgLnNlbmQoe1xuICAgICAgICAgICAgdmFsdWU6IGNvbmZpZy53ZWIzLnV0aWxzLnRvV2VpKFN0cmluZyhkZXBvc2l0KSksXG4gICAgICAgICAgICBmcm9tLFxuICAgICAgICAgICAgZ2FzUHJpY2UsXG4gICAgICAgICAgICBnYXM6IDY3MDAwMDAvLyBiZWNhdXNlIHRoaXMgd29ya2Zsb3cgaXMgdG9vIGdyZWVkeVxuICAgICAgICB9KVxuICAgICAgICAub24oJ2Vycm9yJywgcmVqZWN0KVxuICAgICAgICAub24oJ3JlY2VpcHQnLCByZWNlaXB0ID0+IHtcblxuICAgICAgICAgICAgdHJ5IHtcblxuICAgICAgICAgICAgICAgIGlmIChOdW1iZXIocmVjZWlwdC5zdGF0dXMpID09PSAwKSB7XG5cbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHJlamVjdChwanNFcnJvcihUUkFOU0FDVElPTl9VTlNVQ0NFU1NGVUwpKTtcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICBpZiAocmVjZWlwdC5ldmVudHMuQ29nbml0aXZlSm9iUXVldWVkKSB7XG4gICAgXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiByZXNvbHZlKHJlY2VpcHQuZXZlbnRzLkNvZ25pdGl2ZUpvYlF1ZXVlZC5yZXR1cm5WYWx1ZXMuam9iSWQpO1xuICAgICAgICAgICAgICAgIH1cbiAgICBcbiAgICAgICAgICAgICAgICByZXNvbHZlKHJlY2VpcHQuZXZlbnRzLkNvZ25pdGl2ZUpvYkNyZWF0ZWQucmV0dXJuVmFsdWVzLmpvYklkKTtcbiAgICAgICAgICAgIH0gY2F0Y2ggKGVycikge1xuICAgICAgICAgICAgICAgIHJlamVjdChlcnIpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbn0pO1xuXG4vKipcbiAqIEdldCBhbGwgam9ic1xuICogXG4gKiBAcGFyYW0ge09iamVjdH0gY29uZmlnIExpYnJhcnkgY29uZmlnIChwcm92aWRlZCBieSB0aGUgcHJveHkgYnV0IGNhbiBiZSBvdmVycmlkZGVuKVxuICogQHJldHVybnMge1Byb21pc2V9IEEgUHJvbWlzZSBvYmplY3QgcmVwcmVzZW50cyB0aGUge09iamVjdFtdfSBcbiAqL1xuZXhwb3J0IGNvbnN0IGZldGNoQWxsID0gYXN5bmMgKGNvbmZpZyA9IHt9KSA9PiB7XG4gICAgbGV0IHJlY29yZHMgPSBbXTtcbiAgICBsZXQgZXJyb3IgPSBbXTtcblxuICAgIHRyeSB7XG5cbiAgICAgICAgY29uc3QgW1xuICAgICAgICAgICAgYWN0aXZlQ291bnQsXG4gICAgICAgICAgICBjb21wbGV0ZWRDb3VudFxuICAgICAgICBdID0gYXdhaXQgUHJvbWlzZS5hbGwoW1xuICAgICAgICAgICAgZmV0Y2hBY3RpdmVKb2JzQ291bnQoY29uZmlnKSxcbiAgICAgICAgICAgIGZldGNoQ29tcGxldGVkSm9ic0NvdW50KGNvbmZpZylcbiAgICAgICAgXSk7XG5cbiAgICAgICAgY29uc3QgW1xuICAgICAgICAgICAgYWN0aXZlSm9ic0lkcyxcbiAgICAgICAgICAgIGNvbXBsZXRlZEpvYnNJZHNcbiAgICAgICAgXSA9IGF3YWl0IFByb21pc2UuYWxsKFtcbiAgICAgICAgICAgIGZldGNoSm9ic0lkcygnYWN0aXZlSm9icycsIGFjdGl2ZUNvdW50LCBjb25maWcpLFxuICAgICAgICAgICAgZmV0Y2hKb2JzSWRzKCdjb21wbGV0ZWRKb2JzJywgY29tcGxldGVkQ291bnQsIGNvbmZpZylcbiAgICAgICAgXSk7XG5cbiAgICAgICAgY29uc3QgYWxsSm9ic0lkcyA9IFtcbiAgICAgICAgICAgIC4uLmFjdGl2ZUpvYnNJZHMsXG4gICAgICAgICAgICAuLi5jb21wbGV0ZWRKb2JzSWRzXG4gICAgICAgIF07XG5cbiAgICAgICAgcmVjb3JkcyA9IGF3YWl0IFByb21pc2UuYWxsKGFsbEpvYnNJZHMubWFwKGpvYklkID0+IGZldGNoSm9iRGV0YWlscyhqb2JJZCwgY29uZmlnKSkpO1xuICAgICAgICBcbiAgICB9IGNhdGNoKGVycikge1xuICAgICAgICBlcnJvci5wdXNoKHtcbiAgICAgICAgICAgIGVycm9yOiBlcnIubWVzc2FnZVxuICAgICAgICB9KTtcbiAgICB9ICAgXG5cbiAgICByZXR1cm4ge1xuICAgICAgICByZWNvcmRzLFxuICAgICAgICBlcnJvclxuICAgIH07XG59O1xuXG4vKipcbiAqIEhhbmRsZSBldmVudCBDb2duaXRpdmVKb2JDcmVhdGVkXG4gKiBcbiAqIEBwYXJhbSB7T2JqZWN0fSBvcHRpb25zIEV2ZW50IGhhbmRsZXIgb3B0aW9uc1xuICogQHBhcmFtIHtPYmplY3R9IGNvbmZpZyBMaWJyYXJ5IGNvbmZpZyAocHJvdmlkZWQgYnkgdGhlIHByb3h5IGJ1dCBjYW4gYmUgb3ZlcnJpZGRlbilcbiAqIEByZXR1cm5zIHtPYmplY3R9IE9iamVjdCB3aXRoIGNoYWluZWQgY2FsbGJhY2tzICNkYXRhIGFuZCAjZXJyb3JcbiAqL1xuZXhwb3J0IGNvbnN0IGV2ZW50Q29nbml0aXZlSm9iQ3JlYXRlZCA9IChvcHRpb25zID0ge30sIGNvbmZpZyA9IHt9KSA9PiB7XG5cbiAgICBleHBlY3QuYWxsKHsgb3B0aW9ucyB9LCB7XG4gICAgICAgICdvcHRpb25zJzoge1xuICAgICAgICAgICAgdHlwZTogJ29iamVjdCdcbiAgICAgICAgfVxuICAgIH0pO1xuXG4gICAgZXhwZWN0LmFsbChjb25maWcsIHtcbiAgICAgICAgJ3dlYjMnOiB7XG4gICAgICAgICAgICB0eXBlOiAnb2JqZWN0JyxcbiAgICAgICAgICAgIGNvZGU6IFdFQjNfUkVRVUlSRURcbiAgICAgICAgfSxcbiAgICAgICAgJ2NvbnRyYWN0cy5QYW5kb3JhLmFiaSc6IHtcbiAgICAgICAgICAgIHR5cGU6ICdvYmplY3QnLFxuICAgICAgICAgICAgY29kZTogQ09OVFJBQ1RfUkVRVUlSRUQsXG4gICAgICAgICAgICBhcmdzOiBbJ1BhbmRvcmEnXVxuICAgICAgICB9LFxuICAgICAgICAnYWRkcmVzc2VzLlBhbmRvcmEnOiB7XG4gICAgICAgICAgICB0eXBlOiAnYWRkcmVzcycsXG4gICAgICAgICAgICBjb2RlOiBBRERSRVNTX1JFUVVJUkVELFxuICAgICAgICAgICAgYXJnczogWydQYW5kb3JhJ11cbiAgICAgICAgfVxuICAgIH0pO1xuXG4gICAgY29uc3QgY2FsbGJhY2tzID0ge1xuICAgICAgICBvbkRhdGE6ICgpID0+IHt9LFxuICAgICAgICBvbkVycm9yOiAoKSA9PiB7fVxuICAgIH07XG5cbiAgICBjb25zdCBjaGFpbiA9IHtcbiAgICAgICAgZGF0YTogKGNiID0gKCkgPT4ge30pID0+IHtcbiAgICAgICAgICAgIGNhbGxiYWNrcy5vbkRhdGEgPSBjYjtcbiAgICAgICAgICAgIHJldHVybiBjaGFpbjtcbiAgICAgICAgfSxcbiAgICAgICAgZXJyb3I6IChjYiA9ICgpID0+IHt9KSA9PiB7XG4gICAgICAgICAgICBjYWxsYmFja3Mub25FcnJvciA9IGNiO1xuICAgICAgICAgICAgcmV0dXJuIGNoYWluO1xuICAgICAgICB9XG4gICAgfTtcblxuICAgIGNvbnN0IHBhbiA9IG5ldyBjb25maWcud2ViMy5ldGguQ29udHJhY3QoY29uZmlnLmNvbnRyYWN0cy5QYW5kb3JhLmFiaSwgY29uZmlnLmFkZHJlc3Nlcy5QYW5kb3JhKTtcbiAgICBjaGFpbi5ldmVudCA9IHBhbi5ldmVudHMuQ29nbml0aXZlSm9iQ3JlYXRlZChvcHRpb25zKVxuICAgICAgICAub24oJ2RhdGEnLCBhc3luYyAoZXZlbnQpID0+IHtcblxuICAgICAgICAgICAgdHJ5IHtcblxuICAgICAgICAgICAgICAgIGNvbnN0IGpvYkRldGFpbHMgPSBhd2FpdCBmZXRjaEpvYkRldGFpbHMoZXZlbnQucmV0dXJuVmFsdWVzLmpvYklkLCBjb25maWcpO1xuICAgICAgICAgICAgICAgIGNhbGxiYWNrcy5vbkRhdGEoe1xuICAgICAgICAgICAgICAgICAgICByZWNvcmRzOiBbam9iRGV0YWlsc10sXG4gICAgICAgICAgICAgICAgICAgIGV2ZW50XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9IGNhdGNoKGVycikge1xuICAgICAgICAgICAgICAgIGNhbGxiYWNrcy5vbkVycm9yKGVycik7XG4gICAgICAgICAgICB9ICAgICAgICAgICAgXG4gICAgICAgIH0pXG4gICAgICAgIC5vbignZXJyb3InLCBjYWxsYmFja3Mub25FcnJvcik7XG5cbiAgICByZXR1cm4gY2hhaW47XG59O1xuXG4vKipcbiAqIEhhbmRsZSBldmVudCBKb2JTdGF0ZUNoYW5nZWRcbiAqIFxuICogQHBhcmFtIHtPYmplY3R9IG9wdGlvbnMgRXZlbnQgaGFuZGxlciBvcHRpb25zXG4gKiBAcGFyYW0ge09iamVjdH0gY29uZmlnIExpYnJhcnkgY29uZmlnIChwcm92aWRlZCBieSB0aGUgcHJveHkgYnV0IGNhbiBiZSBvdmVycmlkZGVuKVxuICogQHJldHVybnMge09iamVjdH0gT2JqZWN0IHdpdGggY2hhaW5lZCBjYWxsYmFja3MgI2RhdGEgYW5kICNlcnJvclxuICovXG5leHBvcnQgY29uc3QgZXZlbnRKb2JTdGF0ZUNoYW5nZWQgPSAob3B0aW9ucyA9IHt9LCBjb25maWcgPSB7fSkgPT4ge1xuXG4gICAgZXhwZWN0LmFsbCh7IG9wdGlvbnMgfSwge1xuICAgICAgICAnb3B0aW9ucyc6IHtcbiAgICAgICAgICAgIHR5cGU6ICdvYmplY3QnXG4gICAgICAgIH1cbiAgICB9KTtcblxuICAgIGV4cGVjdC5hbGwoY29uZmlnLCB7XG4gICAgICAgICd3ZWIzJzoge1xuICAgICAgICAgICAgdHlwZTogJ29iamVjdCcsXG4gICAgICAgICAgICBjb2RlOiBXRUIzX1JFUVVJUkVEXG4gICAgICAgIH0sXG4gICAgICAgICdjb250cmFjdHMuUGFuZG9yYS5hYmknOiB7XG4gICAgICAgICAgICB0eXBlOiAnb2JqZWN0JyxcbiAgICAgICAgICAgIGNvZGU6IENPTlRSQUNUX1JFUVVJUkVELFxuICAgICAgICAgICAgYXJnczogWydQYW5kb3JhJ11cbiAgICAgICAgfSxcbiAgICAgICAgJ2FkZHJlc3Nlcy5QYW5kb3JhJzoge1xuICAgICAgICAgICAgdHlwZTogJ2FkZHJlc3MnLFxuICAgICAgICAgICAgY29kZTogQUREUkVTU19SRVFVSVJFRCxcbiAgICAgICAgICAgIGFyZ3M6IFsnUGFuZG9yYSddXG4gICAgICAgIH1cbiAgICB9KTtcblxuICAgIGNvbnN0IGNhbGxiYWNrcyA9IHtcbiAgICAgICAgb25EYXRhOiAoKSA9PiB7fSxcbiAgICAgICAgb25FcnJvcjogKCkgPT4ge31cbiAgICB9O1xuXG4gICAgY29uc3QgY2hhaW4gPSB7XG4gICAgICAgIGRhdGE6IChjYiA9ICgpID0+IHt9KSA9PiB7XG4gICAgICAgICAgICBjYWxsYmFja3Mub25EYXRhID0gY2I7XG4gICAgICAgICAgICByZXR1cm4gY2hhaW47XG4gICAgICAgIH0sXG4gICAgICAgIGVycm9yOiAoY2IgPSAoKSA9PiB7fSkgPT4ge1xuICAgICAgICAgICAgY2FsbGJhY2tzLm9uRXJyb3IgPSBjYjtcbiAgICAgICAgICAgIHJldHVybiBjaGFpbjtcbiAgICAgICAgfVxuICAgIH07XG5cbiAgICAoYXN5bmMgKCkgPT4ge1xuXG4gICAgICAgIGxldCBqb2JDb250cm9sbGVyID0gbG9jYWxDYWNoZS5nZXQoJ2pvYkNvbnRyb2xsZXInKTtcblxuICAgICAgICBpZiAoIWpvYkNvbnRyb2xsZXIpIHtcblxuICAgICAgICAgICAgam9iQ29udHJvbGxlciA9IGF3YWl0IGZldGNoSm9iQ29udHJvbGxlckFkZHJlc3MoY29uZmlnKTtcbiAgICAgICAgfVxuICAgIFxuICAgICAgICBjb25zdCBqY3RybCA9IG5ldyBjb25maWcud2ViMy5ldGguQ29udHJhY3QoY29uZmlnLmNvbnRyYWN0cy5Db2duaXRpdmVKb2JDb250cm9sbGVyLmFiaSwgam9iQ29udHJvbGxlcik7XG4gICAgICAgIGNoYWluLmV2ZW50ID0gamN0cmwuZXZlbnRzLkpvYlN0YXRlQ2hhbmdlZChvcHRpb25zKVxuICAgICAgICAgICAgLm9uKCdkYXRhJywgYXN5bmMgZXZlbnQgPT4ge1xuICAgIFxuICAgICAgICAgICAgICAgIHRyeSB7XG4gICAgXG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IGpvYkRldGFpbHMgPSBhd2FpdCBmZXRjaEpvYkRldGFpbHMoZXZlbnQucmV0dXJuVmFsdWVzLmpvYklkLCBjb25maWcpO1xuICAgICAgICAgICAgICAgICAgICBjYWxsYmFja3Mub25EYXRhKHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJlY29yZHM6IFtqb2JEZXRhaWxzXSxcbiAgICAgICAgICAgICAgICAgICAgICAgIGV2ZW50XG4gICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgIH0gY2F0Y2goZXJyKSB7XG4gICAgICAgICAgICAgICAgICAgIGNhbGxiYWNrcy5vbkVycm9yKGVycik7XG4gICAgICAgICAgICAgICAgfSAgICAgICAgICAgIFxuICAgICAgICAgICAgfSlcbiAgICAgICAgICAgIC5vbignZXJyb3InLCBjYWxsYmFja3Mub25FcnJvcik7XG4gICAgfSkoKTtcblxuICAgIHJldHVybiBjaGFpbjtcbn07XG4iXX0=