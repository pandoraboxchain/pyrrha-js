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
exports.eventCognitiveJobStateChanged = exports.eventCognitiveJobCreated = exports.create = exports.fetchJobStore = exports.fetchAll = exports.fetchJob = exports.fetchIpfsResults = exports.fetchProgress = exports.fetchBatches = exports.fetchDataset = exports.fetchKernel = exports.fetchState = exports.fetchAddressById = exports.fetchActiveCount = void 0;

var expect = _interopRequireWildcard(require("./helpers/expect"));

var _errors = _interopRequireWildcard(require("./helpers/errors"));

var _kernels = require("./kernels");

var _datasets = require("./datasets");

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; var ownKeys = Object.keys(source); if (typeof Object.getOwnPropertySymbols === 'function') { ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) { return Object.getOwnPropertyDescriptor(source, sym).enumerable; })); } ownKeys.forEach(function (key) { _defineProperty(target, key, source[key]); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

/**
 * Get active job count from Pandora contract
 * 
 * @param {Object} config Library config (provided by the proxy but can be overridden)
 * @returns {Promise} A Promise object represents the {number} 
 */
const fetchActiveCount = async (config = {}) => {
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
  const count = await pan.methods.activeJobsCount().call();
  return Number.parseInt(count, 10);
};
/**
 * Get worker by the worker's id
 * 
 * @param {integer} id 
 * @param {Object} config Library config (provided by the proxy but can be overridden)
 * @returns {Promise} A Promise object represents the {string}
 */


exports.fetchActiveCount = fetchActiveCount;

const fetchAddressById = async (id, config = {}) => {
  expect.all({
    id
  }, {
    'id': {
      type: 'number'
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
  const jobAddress = await pan.methods.activeJobs(id).call();
  return String(jobAddress);
};
/**
 * Get job state from Cognitive Job contract by the job address
 * 
 * @param {string} address 
 * @param {Object} config Library config (provided by the proxy but can be overridden)
 * @returns {Promise} A Promise object represents the {integer} 
 */


exports.fetchAddressById = fetchAddressById;

const fetchState = async (address = '', config = {}) => {
  expect.all({
    address
  }, {
    'address': {
      type: 'address'
    }
  });
  expect.all(config, {
    'web3': {
      type: 'object',
      code: _errors.WEB3_REQUIRED
    },
    'contracts.CognitiveJob.abi': {
      type: 'object',
      code: _errors.CONTRACT_REQUIRED,
      args: ['CognitiveJob']
    }
  });
  const cog = new config.web3.eth.Contract(config.contracts.CognitiveJob.abi, address);
  const state = await cog.methods.currentState().call();
  return Number.parseInt(state, 10);
};
/**
 * Get job kernel from Cognitive Job contract by the job address
 * 
 * @param {string} address 
 * @param {Object} config Library config (provided by the proxy but can be overridden)
 * @returns {Promise} A Promise object represents the {string} 
 */


exports.fetchState = fetchState;

const fetchKernel = async (address = '', config = {}) => {
  expect.all({
    address
  }, {
    'address': {
      type: 'address'
    }
  });
  expect.all(config, {
    'web3': {
      type: 'object',
      code: _errors.WEB3_REQUIRED
    },
    'contracts.CognitiveJob.abi': {
      type: 'object',
      code: _errors.CONTRACT_REQUIRED,
      args: ['CognitiveJob']
    }
  });
  const cog = new config.web3.eth.Contract(config.contracts.CognitiveJob.abi, address);
  const kernel = await cog.methods.kernel().call();
  return String(kernel);
};
/**
 * Get job dataset from Cognitive Job contract by the job address
 * 
 * @param {string} address 
 * @param {Object} config Library config (provided by the proxy but can be overridden)
 * @returns {Promise} A Promise object represents the {string} 
 */


exports.fetchKernel = fetchKernel;

const fetchDataset = async (address = '', config = {}) => {
  expect.all({
    address
  }, {
    'address': {
      type: 'address'
    }
  });
  expect.all(config, {
    'web3': {
      type: 'object',
      code: _errors.WEB3_REQUIRED
    },
    'contracts.CognitiveJob.abi': {
      type: 'object',
      code: _errors.CONTRACT_REQUIRED,
      args: ['CognitiveJob']
    }
  });
  const cog = new config.web3.eth.Contract(config.contracts.CognitiveJob.abi, address);
  const dataset = await cog.methods.dataset().call();
  return String(dataset);
};
/**
 * Get job batches count from Cognitive Job contract by the job address
 * 
 * @param {string} address 
 * @param {Object} config Library config (provided by the proxy but can be overridden)
 * @returns {Promise} A Promise object represents the {number} 
 */


exports.fetchDataset = fetchDataset;

const fetchBatches = async (address = '', config = {}) => {
  expect.all({
    address
  }, {
    'address': {
      type: 'address'
    }
  });
  expect.all(config, {
    'web3': {
      type: 'object',
      code: _errors.WEB3_REQUIRED
    },
    'contracts.CognitiveJob.abi': {
      type: 'object',
      code: _errors.CONTRACT_REQUIRED,
      args: ['CognitiveJob']
    }
  });
  const cog = new config.web3.eth.Contract(config.contracts.CognitiveJob.abi, address);
  const batches = await cog.methods.batches().call();
  return Number.parseInt(batches, 10);
};
/**
 * Get job progress from Cognitive Job contract by the job address
 * 
 * @param {string} address 
 * @param {Object} config Library config (provided by the proxy but can be overridden)
 * @returns {Promise} A Promise object represents the {number} 
 */


exports.fetchBatches = fetchBatches;

const fetchProgress = async (address = '', config = {}) => {
  expect.all({
    address
  }, {
    'address': {
      type: 'address'
    }
  });
  expect.all(config, {
    'web3': {
      type: 'object',
      code: _errors.WEB3_REQUIRED
    },
    'contracts.CognitiveJob.abi': {
      type: 'object',
      code: _errors.CONTRACT_REQUIRED,
      args: ['CognitiveJob']
    }
  });
  const cog = new config.web3.eth.Contract(config.contracts.CognitiveJob.abi, address);
  const progress = await cog.methods.progress().call();
  return Number.parseInt(progress, 10);
};
/**
 * Get job's ipfsResults from Cognitive Job contract by the job address
 * 
 * @param {string} address 
 * @param {Object} config Library config (provided by the proxy but can be overridden)
 * @returns {Promise} A Promise object represents the {string[]} 
 */


exports.fetchProgress = fetchProgress;

const fetchIpfsResults = async (address = '', config = {}) => {
  expect.all({
    address
  }, {
    'address': {
      type: 'address'
    }
  });
  expect.all(config, {
    'web3': {
      type: 'object',
      code: _errors.WEB3_REQUIRED
    },
    'contracts.CognitiveJob.abi': {
      type: 'object',
      code: _errors.CONTRACT_REQUIRED,
      args: ['CognitiveJob']
    }
  });
  const cog = new config.web3.eth.Contract(config.contracts.CognitiveJob.abi, address);
  const ipfsResultsCount = await cog.methods.ipfsResultsCount().call();
  let ipfsResults = [];

  for (let i = 0; i < ipfsResultsCount; i++) {
    const result = await cog.methods.ipfsResults(i).call();
    ipfsResults.push(result);
  }

  return ipfsResults;
};
/**
 * Get job by the job address
 * 
 * @param {string} address 
 * @param {Object} config Library config (provided by the proxy but can be overridden)
 * @returns {Promise} A Promise object represents the {Object} 
 */


exports.fetchIpfsResults = fetchIpfsResults;

const fetchJob = async (address = '', config = {}) => {
  const [state, kernel, dataset, batches, progress, ipfsResults] = await Promise.all([fetchState(address, config), fetchKernel(address, config), fetchDataset(address, config), fetchBatches(address, config), fetchProgress(address, config), fetchIpfsResults(address, config)]);
  return {
    address: address,
    jobStatus: state,
    kernel: kernel,
    dataset: dataset,
    batches: batches,
    progress: progress,
    ipfsResults: ipfsResults,
    activeWorkersCount: batches
  };
};
/**
 * Get all jobs
 * 
 * @param {Object} config Library config (provided by the proxy but can be overridden)
 * @returns {Promise} A Promise object represents the {Object[]} 
 */


exports.fetchJob = fetchJob;

const fetchAll = async (config = {}) => {
  let records = [];
  let error = [];

  try {
    const count = await fetchActiveCount(config);

    for (let i = 0; i < count; i++) {
      const address = await fetchAddressById(i, config);

      try {
        const job = await fetchJob(address, config);
        records.push(_objectSpread({
          id: i
        }, job));
      } catch (err) {
        error.push({
          address,
          message: err.message
        });
      }
    }
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
 * Get job store
 * 
 * @param {string} address 
 * @param {Object} config Library config (provided by the proxy but can be overridden)
 * @returns {Promise} A Promise object represents the {Object} 
 */


exports.fetchAll = fetchAll;

const fetchJobStore = async (address = '', config = {}) => {
  const job = await fetchJob(address, config);
  const [kernel, dataset] = await Promise.all([(0, _kernels.fetchIpfsAddress)(job.kernel, config), (0, _datasets.fetchDataset)(job.dataset, config)]);
  return {
    job,
    kernel,
    dataset
  };
};
/**
 * Create cognitive job contract
 * 
 * @param {String} kernelAddress 
 * @param {String} datasetAddress 
 * @param {String} from
 * @param {Object} config Library config (provided by the proxy but can be overridden)
 * @returns {Promise} Promise object resolved to add status (boolean)
 */


exports.fetchJobStore = fetchJobStore;

const create = (kernelAddress, datasetAddress, from, config = {}) => new Promise((resolve, reject) => {
  expect.all({
    kernelAddress,
    datasetAddress,
    from
  }, {
    'kernelAddress': {
      type: 'address'
    },
    'datasetAddress': {
      type: 'address'
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
  pan.methods.createCognitiveJob(kernelAddress, datasetAddress).send({
    from,
    gas: 6700000 // because this workflow is too greedy

  }).on('error', reject).on('receipt', receipt => {
    if (Number(receipt.status) === 0) {
      return reject((0, _errors.default)(_errors.TRANSACTION_UNSUCCESSFUL));
    }

    if (receipt.events.CognitiveJobCreateFailed) {
      return reject((0, _errors.default)(_errors.FAILURE_EVENT, {
        'CognitiveJobCreateFailed': receipt.events.CognitiveJobCreateFailed
      }));
    }

    resolve(receipt.events.CognitiveJobCreated.returnValues.cognitiveJob);
  });
});
/**
 * Handle event CognitiveJobCreated
 * 
 * @param {Object} options Event handler options
 * @param {Object} config Library config (provided by the proxy but can be overridden)
 * @returns {Object} Object with chained callbacks #data and #error
 */


exports.create = create;

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
  pan.events.CognitiveJobCreated(options).on('data', async res => {
    try {
      const store = await fetchJobStore(res.returnValues.cognitiveJob);
      callbacks.onData({
        address: res.returnValues.cognitiveJob,
        store,
        status: 'created',
        event: 'Pandora.CognitiveJobCreated'
      });
    } catch (err) {
      callbacks.onError(err);
    }
  }).on('error', callbacks.onError);
  return chain;
};
/**
 * Handle event StateChanged for CognitiveJob
 * 
 * @param {string} address
 * @param {Object} config Library config (provided by the proxy but can be overridden)
 * @returns {Object} Object with chained callbacks #data and #error
 */


exports.eventCognitiveJobCreated = eventCognitiveJobCreated;

const eventCognitiveJobStateChanged = (address, config = {}) => {
  expect.all({
    address
  }, {
    'address': {
      type: 'address'
    }
  });
  expect.all(config, {
    'web3': {
      type: 'object',
      code: _errors.WEB3_REQUIRED
    },
    'contracts.CognitiveJob.abi': {
      type: 'object',
      code: _errors.CONTRACT_REQUIRED,
      args: ['CognitiveJob']
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
  const cog = new config.web3.eth.Contract(config.contracts.CognitiveJob.abi, address);
  cog.events.StateChanged().on('data', async res => {
    try {
      const store = await fetchJobStore(res.returnValues.cognitiveJob);
      callbacks.onData({
        address: res.returnValues.cognitiveJob,
        store,
        status: 'changed',
        event: 'CognitiveJob.StateChanged'
      });
    } catch (err) {
      callbacks.onError(err);
    }
  }).on('error', callbacks.onError);
  return chain;
};

exports.eventCognitiveJobStateChanged = eventCognitiveJobStateChanged;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9qb2JzLmpzIl0sIm5hbWVzIjpbImZldGNoQWN0aXZlQ291bnQiLCJjb25maWciLCJleHBlY3QiLCJhbGwiLCJ0eXBlIiwiY29kZSIsIldFQjNfUkVRVUlSRUQiLCJDT05UUkFDVF9SRVFVSVJFRCIsImFyZ3MiLCJBRERSRVNTX1JFUVVJUkVEIiwicGFuIiwid2ViMyIsImV0aCIsIkNvbnRyYWN0IiwiY29udHJhY3RzIiwiUGFuZG9yYSIsImFiaSIsImFkZHJlc3NlcyIsImNvdW50IiwibWV0aG9kcyIsImFjdGl2ZUpvYnNDb3VudCIsImNhbGwiLCJOdW1iZXIiLCJwYXJzZUludCIsImZldGNoQWRkcmVzc0J5SWQiLCJpZCIsImpvYkFkZHJlc3MiLCJhY3RpdmVKb2JzIiwiU3RyaW5nIiwiZmV0Y2hTdGF0ZSIsImFkZHJlc3MiLCJjb2ciLCJDb2duaXRpdmVKb2IiLCJzdGF0ZSIsImN1cnJlbnRTdGF0ZSIsImZldGNoS2VybmVsIiwia2VybmVsIiwiZmV0Y2hEYXRhc2V0IiwiZGF0YXNldCIsImZldGNoQmF0Y2hlcyIsImJhdGNoZXMiLCJmZXRjaFByb2dyZXNzIiwicHJvZ3Jlc3MiLCJmZXRjaElwZnNSZXN1bHRzIiwiaXBmc1Jlc3VsdHNDb3VudCIsImlwZnNSZXN1bHRzIiwiaSIsInJlc3VsdCIsInB1c2giLCJmZXRjaEpvYiIsIlByb21pc2UiLCJqb2JTdGF0dXMiLCJhY3RpdmVXb3JrZXJzQ291bnQiLCJmZXRjaEFsbCIsInJlY29yZHMiLCJlcnJvciIsImpvYiIsImVyciIsIm1lc3NhZ2UiLCJmZXRjaEpvYlN0b3JlIiwiY3JlYXRlIiwia2VybmVsQWRkcmVzcyIsImRhdGFzZXRBZGRyZXNzIiwiZnJvbSIsInJlc29sdmUiLCJyZWplY3QiLCJjcmVhdGVDb2duaXRpdmVKb2IiLCJzZW5kIiwiZ2FzIiwib24iLCJyZWNlaXB0Iiwic3RhdHVzIiwiVFJBTlNBQ1RJT05fVU5TVUNDRVNTRlVMIiwiZXZlbnRzIiwiQ29nbml0aXZlSm9iQ3JlYXRlRmFpbGVkIiwiRkFJTFVSRV9FVkVOVCIsIkNvZ25pdGl2ZUpvYkNyZWF0ZWQiLCJyZXR1cm5WYWx1ZXMiLCJjb2duaXRpdmVKb2IiLCJldmVudENvZ25pdGl2ZUpvYkNyZWF0ZWQiLCJvcHRpb25zIiwiY2FsbGJhY2tzIiwib25EYXRhIiwib25FcnJvciIsImNoYWluIiwiZGF0YSIsImNiIiwicmVzIiwic3RvcmUiLCJldmVudCIsImV2ZW50Q29nbml0aXZlSm9iU3RhdGVDaGFuZ2VkIiwiU3RhdGVDaGFuZ2VkIl0sIm1hcHBpbmdzIjoiQUFBQTs7Ozs7Ozs7QUFTQTs7Ozs7OztBQUVBOztBQUNBOztBQVFBOztBQUlBOzs7Ozs7OztBQUlBOzs7Ozs7QUFNTyxNQUFNQSxtQkFBbUIsT0FBT0MsU0FBUyxFQUFoQixLQUF1QjtBQUVuREMsU0FBT0MsR0FBUCxDQUFXRixNQUFYLEVBQW1CO0FBQ2YsWUFBUTtBQUNKRyxZQUFNLFFBREY7QUFFSkMsWUFBTUM7QUFGRixLQURPO0FBS2YsNkJBQXlCO0FBQ3JCRixZQUFNLFFBRGU7QUFFckJDLFlBQU1FLHlCQUZlO0FBR3JCQyxZQUFNLENBQUMsU0FBRDtBQUhlLEtBTFY7QUFVZix5QkFBcUI7QUFDakJKLFlBQU0sU0FEVztBQUVqQkMsWUFBTUksd0JBRlc7QUFHakJELFlBQU0sQ0FBQyxTQUFEO0FBSFc7QUFWTixHQUFuQjtBQWlCQSxRQUFNRSxNQUFNLElBQUlULE9BQU9VLElBQVAsQ0FBWUMsR0FBWixDQUFnQkMsUUFBcEIsQ0FBNkJaLE9BQU9hLFNBQVAsQ0FBaUJDLE9BQWpCLENBQXlCQyxHQUF0RCxFQUEyRGYsT0FBT2dCLFNBQVAsQ0FBaUJGLE9BQTVFLENBQVo7QUFDQSxRQUFNRyxRQUFRLE1BQU1SLElBQUlTLE9BQUosQ0FDZkMsZUFEZSxHQUVmQyxJQUZlLEVBQXBCO0FBSUEsU0FBT0MsT0FBT0MsUUFBUCxDQUFnQkwsS0FBaEIsRUFBdUIsRUFBdkIsQ0FBUDtBQUNILENBekJNO0FBMkJQOzs7Ozs7Ozs7OztBQU9PLE1BQU1NLG1CQUFtQixP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QUFnQkMsUUFBcEIsQ0FBNkJaLE9BQU9hLFNBQVAsQ0FBaUJrQixZQUFqQixDQUE4QmhCLEdBQTNELEVBQWdFYyxPQUFoRSxDQUFaO0FBQ0FDLE1BQUkwQyxNQUFKLENBQVdrQixZQUFYLEdBQ0t0QixFQURMLENBQ1EsTUFEUixFQUNnQixNQUFNa0IsR0FBTixJQUFhO0FBRXJCLFFBQUk7QUFFQSxZQUFNQyxRQUFRLE1BQU03QixjQUFjNEIsSUFBSVYsWUFBSixDQUFpQkMsWUFBL0IsQ0FBcEI7QUFDQUcsZ0JBQVVDLE1BQVYsQ0FBaUI7QUFDYnBELGlCQUFTeUQsSUFBSVYsWUFBSixDQUFpQkMsWUFEYjtBQUViVSxhQUZhO0FBR2JqQixnQkFBUSxTQUhLO0FBSWJrQixlQUFPO0FBSk0sT0FBakI7QUFNSCxLQVRELENBU0UsT0FBTWhDLEdBQU4sRUFBVztBQUNUd0IsZ0JBQVVFLE9BQVYsQ0FBa0IxQixHQUFsQjtBQUNIO0FBQ0osR0FmTCxFQWdCS1ksRUFoQkwsQ0FnQlEsT0FoQlIsRUFnQmlCWSxVQUFVRSxPQWhCM0I7QUFrQkEsU0FBT0MsS0FBUDtBQUNILENBeERNIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBDb2duaXRpdmUgSm9icyByZWxhdGVkIG1ldGhvZHNcbiAqIFRoaXMgZmlsZSBpdCBpcyBhIHBhcnQgb2YgdGhlIFBhbmRvcmEgUHlycmhhIEphdmFzY3JpcHQgbGlicmFyeVxuICogXG4gKiBAZmlsZSBqb2JzLmpzXG4gKiBAYXV0aG9yIEtvc3RpYW50eW4gU215cm5vdiA8a29zdHlzaEBnbWFpbC5jb20+XG4gKiBAZGF0ZSAyMDE4XG4gKi9cblxuJ3VzZSBzdHJpY3QnO1xuXG5pbXBvcnQgKiBhcyBleHBlY3QgZnJvbSAnLi9oZWxwZXJzL2V4cGVjdCc7XG5pbXBvcnQgcGpzRXJyb3IsIHtcbiAgICBDT05UUkFDVF9SRVFVSVJFRCxcbiAgICBBRERSRVNTX1JFUVVJUkVELFxuICAgIFdFQjNfUkVRVUlSRUQsXG4gICAgVFJBTlNBQ1RJT05fVU5TVUNDRVNTRlVMLFxuICAgIEZBSUxVUkVfRVZFTlRcbn0gZnJvbSAnLi9oZWxwZXJzL2Vycm9ycyc7XG5cbmltcG9ydCB7XG4gICAgZmV0Y2hJcGZzQWRkcmVzcyBhcyBmZXRjaElwZnNBZGRyZXNzQnlLZXJuZWxBZGRyZXNzXG59IGZyb20gJy4va2VybmVscyc7XG5cbmltcG9ydCB7XG4gICAgZmV0Y2hEYXRhc2V0IGFzIGZldGNoRGF0YXNldEJ5RGF0YXNldEFkZHJlc3Ncbn0gZnJvbSAnLi9kYXRhc2V0cyc7XG5cbi8qKlxuICogR2V0IGFjdGl2ZSBqb2IgY291bnQgZnJvbSBQYW5kb3JhIGNvbnRyYWN0XG4gKiBcbiAqIEBwYXJhbSB7T2JqZWN0fSBjb25maWcgTGlicmFyeSBjb25maWcgKHByb3ZpZGVkIGJ5IHRoZSBwcm94eSBidXQgY2FuIGJlIG92ZXJyaWRkZW4pXG4gKiBAcmV0dXJucyB7UHJvbWlzZX0gQSBQcm9taXNlIG9iamVjdCByZXByZXNlbnRzIHRoZSB7bnVtYmVyfSBcbiAqL1xuZXhwb3J0IGNvbnN0IGZldGNoQWN0aXZlQ291bnQgPSBhc3luYyAoY29uZmlnID0ge30pID0+IHtcblxuICAgIGV4cGVjdC5hbGwoY29uZmlnLCB7XG4gICAgICAgICd3ZWIzJzoge1xuICAgICAgICAgICAgdHlwZTogJ29iamVjdCcsXG4gICAgICAgICAgICBjb2RlOiBXRUIzX1JFUVVJUkVEXG4gICAgICAgIH0sXG4gICAgICAgICdjb250cmFjdHMuUGFuZG9yYS5hYmknOiB7XG4gICAgICAgICAgICB0eXBlOiAnb2JqZWN0JyxcbiAgICAgICAgICAgIGNvZGU6IENPTlRSQUNUX1JFUVVJUkVELFxuICAgICAgICAgICAgYXJnczogWydQYW5kb3JhJ11cbiAgICAgICAgfSxcbiAgICAgICAgJ2FkZHJlc3Nlcy5QYW5kb3JhJzoge1xuICAgICAgICAgICAgdHlwZTogJ2FkZHJlc3MnLFxuICAgICAgICAgICAgY29kZTogQUREUkVTU19SRVFVSVJFRCxcbiAgICAgICAgICAgIGFyZ3M6IFsnUGFuZG9yYSddXG4gICAgICAgIH1cbiAgICB9KTtcblxuICAgIGNvbnN0IHBhbiA9IG5ldyBjb25maWcud2ViMy5ldGguQ29udHJhY3QoY29uZmlnLmNvbnRyYWN0cy5QYW5kb3JhLmFiaSwgY29uZmlnLmFkZHJlc3Nlcy5QYW5kb3JhKTtcbiAgICBjb25zdCBjb3VudCA9IGF3YWl0IHBhbi5tZXRob2RzXG4gICAgICAgIC5hY3RpdmVKb2JzQ291bnQoKVxuICAgICAgICAuY2FsbCgpO1xuICAgICAgICBcbiAgICByZXR1cm4gTnVtYmVyLnBhcnNlSW50KGNvdW50LCAxMCk7XG59O1xuXG4vKipcbiAqIEdldCB3b3JrZXIgYnkgdGhlIHdvcmtlcidzIGlkXG4gKiBcbiAqIEBwYXJhbSB7aW50ZWdlcn0gaWQgXG4gKiBAcGFyYW0ge09iamVjdH0gY29uZmlnIExpYnJhcnkgY29uZmlnIChwcm92aWRlZCBieSB0aGUgcHJveHkgYnV0IGNhbiBiZSBvdmVycmlkZGVuKVxuICogQHJldHVybnMge1Byb21pc2V9IEEgUHJvbWlzZSBvYmplY3QgcmVwcmVzZW50cyB0aGUge3N0cmluZ31cbiAqL1xuZXhwb3J0IGNvbnN0IGZldGNoQWRkcmVzc0J5SWQgPSBhc3luYyAoaWQsIGNvbmZpZyA9IHt9KSA9PiB7XG5cbiAgICBleHBlY3QuYWxsKHsgaWQgfSwge1xuICAgICAgICAnaWQnOiB7XG4gICAgICAgICAgICB0eXBlOiAnbnVtYmVyJ1xuICAgICAgICB9XG4gICAgfSk7XG5cbiAgICBleHBlY3QuYWxsKGNvbmZpZywge1xuICAgICAgICAnd2ViMyc6IHtcbiAgICAgICAgICAgIHR5cGU6ICdvYmplY3QnLFxuICAgICAgICAgICAgY29kZTogV0VCM19SRVFVSVJFRFxuICAgICAgICB9LFxuICAgICAgICAnY29udHJhY3RzLlBhbmRvcmEuYWJpJzoge1xuICAgICAgICAgICAgdHlwZTogJ29iamVjdCcsXG4gICAgICAgICAgICBjb2RlOiBDT05UUkFDVF9SRVFVSVJFRCxcbiAgICAgICAgICAgIGFyZ3M6IFsnUGFuZG9yYSddXG4gICAgICAgIH0sXG4gICAgICAgICdhZGRyZXNzZXMuUGFuZG9yYSc6IHtcbiAgICAgICAgICAgIHR5cGU6ICdhZGRyZXNzJyxcbiAgICAgICAgICAgIGNvZGU6IEFERFJFU1NfUkVRVUlSRUQsXG4gICAgICAgICAgICBhcmdzOiBbJ1BhbmRvcmEnXVxuICAgICAgICB9XG4gICAgfSk7XG5cbiAgICBjb25zdCBwYW4gPSBuZXcgY29uZmlnLndlYjMuZXRoLkNvbnRyYWN0KGNvbmZpZy5jb250cmFjdHMuUGFuZG9yYS5hYmksIGNvbmZpZy5hZGRyZXNzZXMuUGFuZG9yYSk7XG4gICAgY29uc3Qgam9iQWRkcmVzcyA9IGF3YWl0IHBhbi5tZXRob2RzXG4gICAgICAgIC5hY3RpdmVKb2JzKGlkKVxuICAgICAgICAuY2FsbCgpO1xuXG4gICAgcmV0dXJuIFN0cmluZyhqb2JBZGRyZXNzKTtcbn07XG5cbi8qKlxuICogR2V0IGpvYiBzdGF0ZSBmcm9tIENvZ25pdGl2ZSBKb2IgY29udHJhY3QgYnkgdGhlIGpvYiBhZGRyZXNzXG4gKiBcbiAqIEBwYXJhbSB7c3RyaW5nfSBhZGRyZXNzIFxuICogQHBhcmFtIHtPYmplY3R9IGNvbmZpZyBMaWJyYXJ5IGNvbmZpZyAocHJvdmlkZWQgYnkgdGhlIHByb3h5IGJ1dCBjYW4gYmUgb3ZlcnJpZGRlbilcbiAqIEByZXR1cm5zIHtQcm9taXNlfSBBIFByb21pc2Ugb2JqZWN0IHJlcHJlc2VudHMgdGhlIHtpbnRlZ2VyfSBcbiAqL1xuZXhwb3J0IGNvbnN0IGZldGNoU3RhdGUgPSBhc3luYyAoYWRkcmVzcyA9ICcnLCBjb25maWcgPSB7fSkgPT4ge1xuXG4gICAgZXhwZWN0LmFsbCh7IGFkZHJlc3MgfSwge1xuICAgICAgICAnYWRkcmVzcyc6IHtcbiAgICAgICAgICAgIHR5cGU6ICdhZGRyZXNzJ1xuICAgICAgICB9XG4gICAgfSk7XG5cbiAgICBleHBlY3QuYWxsKGNvbmZpZywge1xuICAgICAgICAnd2ViMyc6IHtcbiAgICAgICAgICAgIHR5cGU6ICdvYmplY3QnLFxuICAgICAgICAgICAgY29kZTogV0VCM19SRVFVSVJFRFxuICAgICAgICB9LFxuICAgICAgICAnY29udHJhY3RzLkNvZ25pdGl2ZUpvYi5hYmknOiB7XG4gICAgICAgICAgICB0eXBlOiAnb2JqZWN0JyxcbiAgICAgICAgICAgIGNvZGU6IENPTlRSQUNUX1JFUVVJUkVELFxuICAgICAgICAgICAgYXJnczogWydDb2duaXRpdmVKb2InXVxuICAgICAgICB9XG4gICAgfSk7XG5cbiAgICBjb25zdCBjb2cgPSBuZXcgY29uZmlnLndlYjMuZXRoLkNvbnRyYWN0KGNvbmZpZy5jb250cmFjdHMuQ29nbml0aXZlSm9iLmFiaSwgYWRkcmVzcyk7XG4gICAgY29uc3Qgc3RhdGUgPSBhd2FpdCBjb2cubWV0aG9kc1xuICAgICAgICAuY3VycmVudFN0YXRlKClcbiAgICAgICAgLmNhbGwoKTtcblxuICAgIHJldHVybiBOdW1iZXIucGFyc2VJbnQoc3RhdGUsIDEwKTtcbn07XG5cbi8qKlxuICogR2V0IGpvYiBrZXJuZWwgZnJvbSBDb2duaXRpdmUgSm9iIGNvbnRyYWN0IGJ5IHRoZSBqb2IgYWRkcmVzc1xuICogXG4gKiBAcGFyYW0ge3N0cmluZ30gYWRkcmVzcyBcbiAqIEBwYXJhbSB7T2JqZWN0fSBjb25maWcgTGlicmFyeSBjb25maWcgKHByb3ZpZGVkIGJ5IHRoZSBwcm94eSBidXQgY2FuIGJlIG92ZXJyaWRkZW4pXG4gKiBAcmV0dXJucyB7UHJvbWlzZX0gQSBQcm9taXNlIG9iamVjdCByZXByZXNlbnRzIHRoZSB7c3RyaW5nfSBcbiAqL1xuZXhwb3J0IGNvbnN0IGZldGNoS2VybmVsID0gYXN5bmMgKGFkZHJlc3MgPSAnJywgY29uZmlnID0ge30pID0+IHtcblxuICAgIGV4cGVjdC5hbGwoeyBhZGRyZXNzIH0sIHtcbiAgICAgICAgJ2FkZHJlc3MnOiB7XG4gICAgICAgICAgICB0eXBlOiAnYWRkcmVzcydcbiAgICAgICAgfVxuICAgIH0pO1xuXG4gICAgZXhwZWN0LmFsbChjb25maWcsIHtcbiAgICAgICAgJ3dlYjMnOiB7XG4gICAgICAgICAgICB0eXBlOiAnb2JqZWN0JyxcbiAgICAgICAgICAgIGNvZGU6IFdFQjNfUkVRVUlSRURcbiAgICAgICAgfSxcbiAgICAgICAgJ2NvbnRyYWN0cy5Db2duaXRpdmVKb2IuYWJpJzoge1xuICAgICAgICAgICAgdHlwZTogJ29iamVjdCcsXG4gICAgICAgICAgICBjb2RlOiBDT05UUkFDVF9SRVFVSVJFRCxcbiAgICAgICAgICAgIGFyZ3M6IFsnQ29nbml0aXZlSm9iJ11cbiAgICAgICAgfVxuICAgIH0pO1xuXG4gICAgY29uc3QgY29nID0gbmV3IGNvbmZpZy53ZWIzLmV0aC5Db250cmFjdChjb25maWcuY29udHJhY3RzLkNvZ25pdGl2ZUpvYi5hYmksIGFkZHJlc3MpO1xuICAgIGNvbnN0IGtlcm5lbCA9IGF3YWl0IGNvZy5tZXRob2RzXG4gICAgICAgIC5rZXJuZWwoKVxuICAgICAgICAuY2FsbCgpO1xuXG4gICAgcmV0dXJuIFN0cmluZyhrZXJuZWwpO1xufTtcblxuLyoqXG4gKiBHZXQgam9iIGRhdGFzZXQgZnJvbSBDb2duaXRpdmUgSm9iIGNvbnRyYWN0IGJ5IHRoZSBqb2IgYWRkcmVzc1xuICogXG4gKiBAcGFyYW0ge3N0cmluZ30gYWRkcmVzcyBcbiAqIEBwYXJhbSB7T2JqZWN0fSBjb25maWcgTGlicmFyeSBjb25maWcgKHByb3ZpZGVkIGJ5IHRoZSBwcm94eSBidXQgY2FuIGJlIG92ZXJyaWRkZW4pXG4gKiBAcmV0dXJucyB7UHJvbWlzZX0gQSBQcm9taXNlIG9iamVjdCByZXByZXNlbnRzIHRoZSB7c3RyaW5nfSBcbiAqL1xuZXhwb3J0IGNvbnN0IGZldGNoRGF0YXNldCA9IGFzeW5jIChhZGRyZXNzID0gJycsIGNvbmZpZyA9IHt9KSA9PiB7XG5cbiAgICBleHBlY3QuYWxsKHsgYWRkcmVzcyB9LCB7XG4gICAgICAgICdhZGRyZXNzJzoge1xuICAgICAgICAgICAgdHlwZTogJ2FkZHJlc3MnXG4gICAgICAgIH1cbiAgICB9KTtcblxuICAgIGV4cGVjdC5hbGwoY29uZmlnLCB7XG4gICAgICAgICd3ZWIzJzoge1xuICAgICAgICAgICAgdHlwZTogJ29iamVjdCcsXG4gICAgICAgICAgICBjb2RlOiBXRUIzX1JFUVVJUkVEXG4gICAgICAgIH0sXG4gICAgICAgICdjb250cmFjdHMuQ29nbml0aXZlSm9iLmFiaSc6IHtcbiAgICAgICAgICAgIHR5cGU6ICdvYmplY3QnLFxuICAgICAgICAgICAgY29kZTogQ09OVFJBQ1RfUkVRVUlSRUQsXG4gICAgICAgICAgICBhcmdzOiBbJ0NvZ25pdGl2ZUpvYiddXG4gICAgICAgIH1cbiAgICB9KTtcblxuICAgIGNvbnN0IGNvZyA9IG5ldyBjb25maWcud2ViMy5ldGguQ29udHJhY3QoY29uZmlnLmNvbnRyYWN0cy5Db2duaXRpdmVKb2IuYWJpLCBhZGRyZXNzKTtcbiAgICBjb25zdCBkYXRhc2V0ID0gYXdhaXQgY29nLm1ldGhvZHNcbiAgICAgICAgLmRhdGFzZXQoKVxuICAgICAgICAuY2FsbCgpO1xuXG4gICAgcmV0dXJuIFN0cmluZyhkYXRhc2V0KTtcbn07XG5cbi8qKlxuICogR2V0IGpvYiBiYXRjaGVzIGNvdW50IGZyb20gQ29nbml0aXZlIEpvYiBjb250cmFjdCBieSB0aGUgam9iIGFkZHJlc3NcbiAqIFxuICogQHBhcmFtIHtzdHJpbmd9IGFkZHJlc3MgXG4gKiBAcGFyYW0ge09iamVjdH0gY29uZmlnIExpYnJhcnkgY29uZmlnIChwcm92aWRlZCBieSB0aGUgcHJveHkgYnV0IGNhbiBiZSBvdmVycmlkZGVuKVxuICogQHJldHVybnMge1Byb21pc2V9IEEgUHJvbWlzZSBvYmplY3QgcmVwcmVzZW50cyB0aGUge251bWJlcn0gXG4gKi9cbmV4cG9ydCBjb25zdCBmZXRjaEJhdGNoZXMgPSBhc3luYyAoYWRkcmVzcyA9ICcnLCBjb25maWcgPSB7fSkgPT4ge1xuXG4gICAgZXhwZWN0LmFsbCh7IGFkZHJlc3MgfSwge1xuICAgICAgICAnYWRkcmVzcyc6IHtcbiAgICAgICAgICAgIHR5cGU6ICdhZGRyZXNzJ1xuICAgICAgICB9XG4gICAgfSk7XG5cbiAgICBleHBlY3QuYWxsKGNvbmZpZywge1xuICAgICAgICAnd2ViMyc6IHtcbiAgICAgICAgICAgIHR5cGU6ICdvYmplY3QnLFxuICAgICAgICAgICAgY29kZTogV0VCM19SRVFVSVJFRFxuICAgICAgICB9LFxuICAgICAgICAnY29udHJhY3RzLkNvZ25pdGl2ZUpvYi5hYmknOiB7XG4gICAgICAgICAgICB0eXBlOiAnb2JqZWN0JyxcbiAgICAgICAgICAgIGNvZGU6IENPTlRSQUNUX1JFUVVJUkVELFxuICAgICAgICAgICAgYXJnczogWydDb2duaXRpdmVKb2InXVxuICAgICAgICB9XG4gICAgfSk7XG5cbiAgICBjb25zdCBjb2cgPSBuZXcgY29uZmlnLndlYjMuZXRoLkNvbnRyYWN0KGNvbmZpZy5jb250cmFjdHMuQ29nbml0aXZlSm9iLmFiaSwgYWRkcmVzcyk7XG4gICAgY29uc3QgYmF0Y2hlcyA9IGF3YWl0IGNvZy5tZXRob2RzXG4gICAgICAgIC5iYXRjaGVzKClcbiAgICAgICAgLmNhbGwoKTtcblxuICAgIHJldHVybiBOdW1iZXIucGFyc2VJbnQoYmF0Y2hlcywgMTApO1xufTtcblxuLyoqXG4gKiBHZXQgam9iIHByb2dyZXNzIGZyb20gQ29nbml0aXZlIEpvYiBjb250cmFjdCBieSB0aGUgam9iIGFkZHJlc3NcbiAqIFxuICogQHBhcmFtIHtzdHJpbmd9IGFkZHJlc3MgXG4gKiBAcGFyYW0ge09iamVjdH0gY29uZmlnIExpYnJhcnkgY29uZmlnIChwcm92aWRlZCBieSB0aGUgcHJveHkgYnV0IGNhbiBiZSBvdmVycmlkZGVuKVxuICogQHJldHVybnMge1Byb21pc2V9IEEgUHJvbWlzZSBvYmplY3QgcmVwcmVzZW50cyB0aGUge251bWJlcn0gXG4gKi9cbmV4cG9ydCBjb25zdCBmZXRjaFByb2dyZXNzID0gYXN5bmMgKGFkZHJlc3MgPSAnJywgY29uZmlnID0ge30pID0+IHtcblxuICAgIGV4cGVjdC5hbGwoeyBhZGRyZXNzIH0sIHtcbiAgICAgICAgJ2FkZHJlc3MnOiB7XG4gICAgICAgICAgICB0eXBlOiAnYWRkcmVzcydcbiAgICAgICAgfVxuICAgIH0pO1xuXG4gICAgZXhwZWN0LmFsbChjb25maWcsIHtcbiAgICAgICAgJ3dlYjMnOiB7XG4gICAgICAgICAgICB0eXBlOiAnb2JqZWN0JyxcbiAgICAgICAgICAgIGNvZGU6IFdFQjNfUkVRVUlSRURcbiAgICAgICAgfSxcbiAgICAgICAgJ2NvbnRyYWN0cy5Db2duaXRpdmVKb2IuYWJpJzoge1xuICAgICAgICAgICAgdHlwZTogJ29iamVjdCcsXG4gICAgICAgICAgICBjb2RlOiBDT05UUkFDVF9SRVFVSVJFRCxcbiAgICAgICAgICAgIGFyZ3M6IFsnQ29nbml0aXZlSm9iJ11cbiAgICAgICAgfVxuICAgIH0pO1xuXG4gICAgY29uc3QgY29nID0gbmV3IGNvbmZpZy53ZWIzLmV0aC5Db250cmFjdChjb25maWcuY29udHJhY3RzLkNvZ25pdGl2ZUpvYi5hYmksIGFkZHJlc3MpO1xuICAgIGNvbnN0IHByb2dyZXNzID0gYXdhaXQgY29nLm1ldGhvZHNcbiAgICAgICAgLnByb2dyZXNzKClcbiAgICAgICAgLmNhbGwoKTtcblxuICAgIHJldHVybiBOdW1iZXIucGFyc2VJbnQocHJvZ3Jlc3MsIDEwKTtcbn07XG5cbi8qKlxuICogR2V0IGpvYidzIGlwZnNSZXN1bHRzIGZyb20gQ29nbml0aXZlIEpvYiBjb250cmFjdCBieSB0aGUgam9iIGFkZHJlc3NcbiAqIFxuICogQHBhcmFtIHtzdHJpbmd9IGFkZHJlc3MgXG4gKiBAcGFyYW0ge09iamVjdH0gY29uZmlnIExpYnJhcnkgY29uZmlnIChwcm92aWRlZCBieSB0aGUgcHJveHkgYnV0IGNhbiBiZSBvdmVycmlkZGVuKVxuICogQHJldHVybnMge1Byb21pc2V9IEEgUHJvbWlzZSBvYmplY3QgcmVwcmVzZW50cyB0aGUge3N0cmluZ1tdfSBcbiAqL1xuZXhwb3J0IGNvbnN0IGZldGNoSXBmc1Jlc3VsdHMgPSBhc3luYyAoYWRkcmVzcyA9ICcnLCBjb25maWcgPSB7fSkgPT4ge1xuXG4gICAgZXhwZWN0LmFsbCh7IGFkZHJlc3MgfSwge1xuICAgICAgICAnYWRkcmVzcyc6IHtcbiAgICAgICAgICAgIHR5cGU6ICdhZGRyZXNzJ1xuICAgICAgICB9XG4gICAgfSk7XG5cbiAgICBleHBlY3QuYWxsKGNvbmZpZywge1xuICAgICAgICAnd2ViMyc6IHtcbiAgICAgICAgICAgIHR5cGU6ICdvYmplY3QnLFxuICAgICAgICAgICAgY29kZTogV0VCM19SRVFVSVJFRFxuICAgICAgICB9LFxuICAgICAgICAnY29udHJhY3RzLkNvZ25pdGl2ZUpvYi5hYmknOiB7XG4gICAgICAgICAgICB0eXBlOiAnb2JqZWN0JyxcbiAgICAgICAgICAgIGNvZGU6IENPTlRSQUNUX1JFUVVJUkVELFxuICAgICAgICAgICAgYXJnczogWydDb2duaXRpdmVKb2InXVxuICAgICAgICB9XG4gICAgfSk7XG5cbiAgICBjb25zdCBjb2cgPSBuZXcgY29uZmlnLndlYjMuZXRoLkNvbnRyYWN0KGNvbmZpZy5jb250cmFjdHMuQ29nbml0aXZlSm9iLmFiaSwgYWRkcmVzcyk7XG5cbiAgICBjb25zdCBpcGZzUmVzdWx0c0NvdW50ID0gYXdhaXQgY29nLm1ldGhvZHNcbiAgICAgICAgLmlwZnNSZXN1bHRzQ291bnQoKVxuICAgICAgICAuY2FsbCgpO1xuXG4gICAgbGV0IGlwZnNSZXN1bHRzID0gW107XG5cbiAgICBmb3IgKGxldCBpPTA7IGkgPCBpcGZzUmVzdWx0c0NvdW50OyBpKyspIHtcbiAgICAgICAgXG4gICAgICAgIGNvbnN0IHJlc3VsdCA9IGF3YWl0IGNvZy5tZXRob2RzXG4gICAgICAgICAgICAuaXBmc1Jlc3VsdHMoaSlcbiAgICAgICAgICAgIC5jYWxsKCk7XG5cbiAgICAgICAgaXBmc1Jlc3VsdHMucHVzaChyZXN1bHQpOyAgICAgICAgXG4gICAgfSAgICBcblxuICAgIHJldHVybiBpcGZzUmVzdWx0cztcbn07XG5cbi8qKlxuICogR2V0IGpvYiBieSB0aGUgam9iIGFkZHJlc3NcbiAqIFxuICogQHBhcmFtIHtzdHJpbmd9IGFkZHJlc3MgXG4gKiBAcGFyYW0ge09iamVjdH0gY29uZmlnIExpYnJhcnkgY29uZmlnIChwcm92aWRlZCBieSB0aGUgcHJveHkgYnV0IGNhbiBiZSBvdmVycmlkZGVuKVxuICogQHJldHVybnMge1Byb21pc2V9IEEgUHJvbWlzZSBvYmplY3QgcmVwcmVzZW50cyB0aGUge09iamVjdH0gXG4gKi9cbmV4cG9ydCBjb25zdCBmZXRjaEpvYiA9IGFzeW5jIChhZGRyZXNzID0gJycsIGNvbmZpZyA9IHt9KSA9PiB7XG5cbiAgICBjb25zdCBbXG4gICAgICAgIHN0YXRlLFxuICAgICAgICBrZXJuZWwsXG4gICAgICAgIGRhdGFzZXQsXG4gICAgICAgIGJhdGNoZXMsXG4gICAgICAgIHByb2dyZXNzLFxuICAgICAgICBpcGZzUmVzdWx0c1xuICAgIF0gPSBhd2FpdCBQcm9taXNlLmFsbChbXG4gICAgICAgIGZldGNoU3RhdGUoYWRkcmVzcywgY29uZmlnKSxcbiAgICAgICAgZmV0Y2hLZXJuZWwoYWRkcmVzcywgY29uZmlnKSxcbiAgICAgICAgZmV0Y2hEYXRhc2V0KGFkZHJlc3MsIGNvbmZpZyksXG4gICAgICAgIGZldGNoQmF0Y2hlcyhhZGRyZXNzLCBjb25maWcpLFxuICAgICAgICBmZXRjaFByb2dyZXNzKGFkZHJlc3MsIGNvbmZpZyksXG4gICAgICAgIGZldGNoSXBmc1Jlc3VsdHMoYWRkcmVzcywgY29uZmlnKVxuICAgIF0pO1xuICAgIFxuICAgIHJldHVybiB7XG4gICAgICAgIGFkZHJlc3M6IGFkZHJlc3MsXG4gICAgICAgIGpvYlN0YXR1czogc3RhdGUsXG4gICAgICAgIGtlcm5lbDoga2VybmVsLFxuICAgICAgICBkYXRhc2V0OiBkYXRhc2V0LFxuICAgICAgICBiYXRjaGVzOiBiYXRjaGVzLFxuICAgICAgICBwcm9ncmVzczogcHJvZ3Jlc3MsXG4gICAgICAgIGlwZnNSZXN1bHRzOiBpcGZzUmVzdWx0cyxcbiAgICAgICAgYWN0aXZlV29ya2Vyc0NvdW50OiBiYXRjaGVzXG4gICAgfTtcbn07XG5cbi8qKlxuICogR2V0IGFsbCBqb2JzXG4gKiBcbiAqIEBwYXJhbSB7T2JqZWN0fSBjb25maWcgTGlicmFyeSBjb25maWcgKHByb3ZpZGVkIGJ5IHRoZSBwcm94eSBidXQgY2FuIGJlIG92ZXJyaWRkZW4pXG4gKiBAcmV0dXJucyB7UHJvbWlzZX0gQSBQcm9taXNlIG9iamVjdCByZXByZXNlbnRzIHRoZSB7T2JqZWN0W119IFxuICovXG5leHBvcnQgY29uc3QgZmV0Y2hBbGwgPSBhc3luYyAoY29uZmlnID0ge30pID0+IHtcbiAgICBsZXQgcmVjb3JkcyA9IFtdO1xuICAgIGxldCBlcnJvciA9IFtdO1xuXG4gICAgdHJ5IHtcblxuICAgICAgICBjb25zdCBjb3VudCA9IGF3YWl0IGZldGNoQWN0aXZlQ291bnQoY29uZmlnKTsgICAgXG5cbiAgICAgICAgZm9yIChsZXQgaT0wOyBpIDwgY291bnQ7IGkrKykge1xuICAgICAgICAgICAgXG4gICAgICAgICAgICBjb25zdCBhZGRyZXNzID0gYXdhaXQgZmV0Y2hBZGRyZXNzQnlJZChpLCBjb25maWcpO1xuXG4gICAgICAgICAgICB0cnkge1xuXG4gICAgICAgICAgICAgICAgY29uc3Qgam9iID0gYXdhaXQgZmV0Y2hKb2IoYWRkcmVzcywgY29uZmlnKTtcblxuICAgICAgICAgICAgICAgIHJlY29yZHMucHVzaCh7XG4gICAgICAgICAgICAgICAgICAgIGlkOiBpLFxuICAgICAgICAgICAgICAgICAgICAuLi5qb2JcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH0gY2F0Y2goZXJyKSB7XG4gICAgICAgICAgICAgICAgZXJyb3IucHVzaCh7XG4gICAgICAgICAgICAgICAgICAgIGFkZHJlc3MsXG4gICAgICAgICAgICAgICAgICAgIG1lc3NhZ2U6IGVyci5tZXNzYWdlXG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9ICAgICAgICBcbiAgICAgICAgfVxuICAgIH0gY2F0Y2goZXJyKSB7XG4gICAgICAgIGVycm9yLnB1c2goe1xuICAgICAgICAgICAgZXJyb3I6IGVyci5tZXNzYWdlXG4gICAgICAgIH0pO1xuICAgIH0gICBcblxuICAgIHJldHVybiB7XG4gICAgICAgIHJlY29yZHMsXG4gICAgICAgIGVycm9yXG4gICAgfTtcbn07XG5cbi8qKlxuICogR2V0IGpvYiBzdG9yZVxuICogXG4gKiBAcGFyYW0ge3N0cmluZ30gYWRkcmVzcyBcbiAqIEBwYXJhbSB7T2JqZWN0fSBjb25maWcgTGlicmFyeSBjb25maWcgKHByb3ZpZGVkIGJ5IHRoZSBwcm94eSBidXQgY2FuIGJlIG92ZXJyaWRkZW4pXG4gKiBAcmV0dXJucyB7UHJvbWlzZX0gQSBQcm9taXNlIG9iamVjdCByZXByZXNlbnRzIHRoZSB7T2JqZWN0fSBcbiAqL1xuZXhwb3J0IGNvbnN0IGZldGNoSm9iU3RvcmUgPSBhc3luYyAoYWRkcmVzcyA9ICcnLCBjb25maWcgPSB7fSkgPT4ge1xuXG4gICAgY29uc3Qgam9iID0gYXdhaXQgZmV0Y2hKb2IoYWRkcmVzcywgY29uZmlnKTtcblxuICAgIGNvbnN0IFtcbiAgICAgICAga2VybmVsLFxuICAgICAgICBkYXRhc2V0XG4gICAgXSA9IGF3YWl0IFByb21pc2UuYWxsKFtcbiAgICAgICAgZmV0Y2hJcGZzQWRkcmVzc0J5S2VybmVsQWRkcmVzcyhqb2Iua2VybmVsLCBjb25maWcpLFxuICAgICAgICBmZXRjaERhdGFzZXRCeURhdGFzZXRBZGRyZXNzKGpvYi5kYXRhc2V0LCBjb25maWcpXG4gICAgXSk7XG4gICAgXG4gICAgcmV0dXJuIHtcbiAgICAgICAgam9iLFxuICAgICAgICBrZXJuZWwsXG4gICAgICAgIGRhdGFzZXRcbiAgICB9O1xufTtcblxuLyoqXG4gKiBDcmVhdGUgY29nbml0aXZlIGpvYiBjb250cmFjdFxuICogXG4gKiBAcGFyYW0ge1N0cmluZ30ga2VybmVsQWRkcmVzcyBcbiAqIEBwYXJhbSB7U3RyaW5nfSBkYXRhc2V0QWRkcmVzcyBcbiAqIEBwYXJhbSB7U3RyaW5nfSBmcm9tXG4gKiBAcGFyYW0ge09iamVjdH0gY29uZmlnIExpYnJhcnkgY29uZmlnIChwcm92aWRlZCBieSB0aGUgcHJveHkgYnV0IGNhbiBiZSBvdmVycmlkZGVuKVxuICogQHJldHVybnMge1Byb21pc2V9IFByb21pc2Ugb2JqZWN0IHJlc29sdmVkIHRvIGFkZCBzdGF0dXMgKGJvb2xlYW4pXG4gKi9cbmV4cG9ydCBjb25zdCBjcmVhdGUgPSAoa2VybmVsQWRkcmVzcywgZGF0YXNldEFkZHJlc3MsIGZyb20sIGNvbmZpZyA9IHt9KSA9PiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG5cbiAgICBleHBlY3QuYWxsKHsga2VybmVsQWRkcmVzcywgZGF0YXNldEFkZHJlc3MsIGZyb20gfSwge1xuICAgICAgICAna2VybmVsQWRkcmVzcyc6IHtcbiAgICAgICAgICAgIHR5cGU6ICdhZGRyZXNzJ1xuICAgICAgICB9LFxuICAgICAgICAnZGF0YXNldEFkZHJlc3MnOiB7XG4gICAgICAgICAgICB0eXBlOiAnYWRkcmVzcydcbiAgICAgICAgfSxcbiAgICAgICAgJ2Zyb20nOiB7XG4gICAgICAgICAgICB0eXBlOiAnYWRkcmVzcydcbiAgICAgICAgfVxuICAgIH0pO1xuXG4gICAgZXhwZWN0LmFsbChjb25maWcsIHtcbiAgICAgICAgJ3dlYjMnOiB7XG4gICAgICAgICAgICB0eXBlOiAnb2JqZWN0JyxcbiAgICAgICAgICAgIGNvZGU6IFdFQjNfUkVRVUlSRURcbiAgICAgICAgfSxcbiAgICAgICAgJ2NvbnRyYWN0cy5QYW5kb3JhLmFiaSc6IHtcbiAgICAgICAgICAgIHR5cGU6ICdvYmplY3QnLFxuICAgICAgICAgICAgY29kZTogQ09OVFJBQ1RfUkVRVUlSRUQsXG4gICAgICAgICAgICBhcmdzOiBbJ1BhbmRvcmEnXVxuICAgICAgICB9LFxuICAgICAgICAnYWRkcmVzc2VzLlBhbmRvcmEnOiB7XG4gICAgICAgICAgICB0eXBlOiAnYWRkcmVzcycsXG4gICAgICAgICAgICBjb2RlOiBBRERSRVNTX1JFUVVJUkVELFxuICAgICAgICAgICAgYXJnczogWydQYW5kb3JhJ11cbiAgICAgICAgfVxuICAgIH0pO1xuXG4gICAgY29uc3QgcGFuID0gbmV3IGNvbmZpZy53ZWIzLmV0aC5Db250cmFjdChjb25maWcuY29udHJhY3RzLlBhbmRvcmEuYWJpLCBjb25maWcuYWRkcmVzc2VzLlBhbmRvcmEpO1xuICAgIHBhbi5tZXRob2RzXG4gICAgICAgIC5jcmVhdGVDb2duaXRpdmVKb2Ioa2VybmVsQWRkcmVzcywgZGF0YXNldEFkZHJlc3MpXG4gICAgICAgIC5zZW5kKHtcbiAgICAgICAgICAgIGZyb20sXG4gICAgICAgICAgICBnYXM6IDY3MDAwMDAvLyBiZWNhdXNlIHRoaXMgd29ya2Zsb3cgaXMgdG9vIGdyZWVkeVxuICAgICAgICB9KVxuICAgICAgICAub24oJ2Vycm9yJywgcmVqZWN0KVxuICAgICAgICAub24oJ3JlY2VpcHQnLCByZWNlaXB0ID0+IHtcblxuICAgICAgICAgICAgaWYgKE51bWJlcihyZWNlaXB0LnN0YXR1cykgPT09IDApIHtcblxuICAgICAgICAgICAgICAgIHJldHVybiByZWplY3QocGpzRXJyb3IoVFJBTlNBQ1RJT05fVU5TVUNDRVNTRlVMKSk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGlmIChyZWNlaXB0LmV2ZW50cy5Db2duaXRpdmVKb2JDcmVhdGVGYWlsZWQpIHtcblxuICAgICAgICAgICAgICAgIHJldHVybiByZWplY3QocGpzRXJyb3IoRkFJTFVSRV9FVkVOVCwge1xuICAgICAgICAgICAgICAgICAgICAnQ29nbml0aXZlSm9iQ3JlYXRlRmFpbGVkJzogcmVjZWlwdC5ldmVudHMuQ29nbml0aXZlSm9iQ3JlYXRlRmFpbGVkXG4gICAgICAgICAgICAgICAgfSkpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICByZXNvbHZlKHJlY2VpcHQuZXZlbnRzLkNvZ25pdGl2ZUpvYkNyZWF0ZWQucmV0dXJuVmFsdWVzLmNvZ25pdGl2ZUpvYik7XG4gICAgICAgIH0pO1xufSk7XG5cbi8qKlxuICogSGFuZGxlIGV2ZW50IENvZ25pdGl2ZUpvYkNyZWF0ZWRcbiAqIFxuICogQHBhcmFtIHtPYmplY3R9IG9wdGlvbnMgRXZlbnQgaGFuZGxlciBvcHRpb25zXG4gKiBAcGFyYW0ge09iamVjdH0gY29uZmlnIExpYnJhcnkgY29uZmlnIChwcm92aWRlZCBieSB0aGUgcHJveHkgYnV0IGNhbiBiZSBvdmVycmlkZGVuKVxuICogQHJldHVybnMge09iamVjdH0gT2JqZWN0IHdpdGggY2hhaW5lZCBjYWxsYmFja3MgI2RhdGEgYW5kICNlcnJvclxuICovXG5leHBvcnQgY29uc3QgZXZlbnRDb2duaXRpdmVKb2JDcmVhdGVkID0gKG9wdGlvbnMgPSB7fSwgY29uZmlnID0ge30pID0+IHtcblxuICAgIGV4cGVjdC5hbGwoeyBvcHRpb25zIH0sIHtcbiAgICAgICAgJ29wdGlvbnMnOiB7XG4gICAgICAgICAgICB0eXBlOiAnb2JqZWN0J1xuICAgICAgICB9XG4gICAgfSk7XG5cbiAgICBleHBlY3QuYWxsKGNvbmZpZywge1xuICAgICAgICAnd2ViMyc6IHtcbiAgICAgICAgICAgIHR5cGU6ICdvYmplY3QnLFxuICAgICAgICAgICAgY29kZTogV0VCM19SRVFVSVJFRFxuICAgICAgICB9LFxuICAgICAgICAnY29udHJhY3RzLlBhbmRvcmEuYWJpJzoge1xuICAgICAgICAgICAgdHlwZTogJ29iamVjdCcsXG4gICAgICAgICAgICBjb2RlOiBDT05UUkFDVF9SRVFVSVJFRCxcbiAgICAgICAgICAgIGFyZ3M6IFsnUGFuZG9yYSddXG4gICAgICAgIH0sXG4gICAgICAgICdhZGRyZXNzZXMuUGFuZG9yYSc6IHtcbiAgICAgICAgICAgIHR5cGU6ICdhZGRyZXNzJyxcbiAgICAgICAgICAgIGNvZGU6IEFERFJFU1NfUkVRVUlSRUQsXG4gICAgICAgICAgICBhcmdzOiBbJ1BhbmRvcmEnXVxuICAgICAgICB9XG4gICAgfSk7XG5cbiAgICBjb25zdCBjYWxsYmFja3MgPSB7XG4gICAgICAgIG9uRGF0YTogKCkgPT4ge30sXG4gICAgICAgIG9uRXJyb3I6ICgpID0+IHt9XG4gICAgfTtcblxuICAgIGNvbnN0IGNoYWluID0ge1xuICAgICAgICBkYXRhOiAoY2IgPSAoKSA9PiB7fSkgPT4ge1xuICAgICAgICAgICAgY2FsbGJhY2tzLm9uRGF0YSA9IGNiO1xuICAgICAgICAgICAgcmV0dXJuIGNoYWluO1xuICAgICAgICB9LFxuICAgICAgICBlcnJvcjogKGNiID0gKCkgPT4ge30pID0+IHtcbiAgICAgICAgICAgIGNhbGxiYWNrcy5vbkVycm9yID0gY2I7XG4gICAgICAgICAgICByZXR1cm4gY2hhaW47XG4gICAgICAgIH1cbiAgICB9O1xuXG4gICAgY29uc3QgcGFuID0gbmV3IGNvbmZpZy53ZWIzLmV0aC5Db250cmFjdChjb25maWcuY29udHJhY3RzLlBhbmRvcmEuYWJpLCBjb25maWcuYWRkcmVzc2VzLlBhbmRvcmEpO1xuICAgIHBhbi5ldmVudHMuQ29nbml0aXZlSm9iQ3JlYXRlZChvcHRpb25zKVxuICAgICAgICAub24oJ2RhdGEnLCBhc3luYyByZXMgPT4ge1xuXG4gICAgICAgICAgICB0cnkge1xuXG4gICAgICAgICAgICAgICAgY29uc3Qgc3RvcmUgPSBhd2FpdCBmZXRjaEpvYlN0b3JlKHJlcy5yZXR1cm5WYWx1ZXMuY29nbml0aXZlSm9iKTtcbiAgICAgICAgICAgICAgICBjYWxsYmFja3Mub25EYXRhKHtcbiAgICAgICAgICAgICAgICAgICAgYWRkcmVzczogcmVzLnJldHVyblZhbHVlcy5jb2duaXRpdmVKb2IsXG4gICAgICAgICAgICAgICAgICAgIHN0b3JlLFxuICAgICAgICAgICAgICAgICAgICBzdGF0dXM6ICdjcmVhdGVkJyxcbiAgICAgICAgICAgICAgICAgICAgZXZlbnQ6ICdQYW5kb3JhLkNvZ25pdGl2ZUpvYkNyZWF0ZWQnXG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9IGNhdGNoKGVycikge1xuICAgICAgICAgICAgICAgIGNhbGxiYWNrcy5vbkVycm9yKGVycik7XG4gICAgICAgICAgICB9ICAgICAgICAgICAgXG4gICAgICAgIH0pXG4gICAgICAgIC5vbignZXJyb3InLCBjYWxsYmFja3Mub25FcnJvcik7XG5cbiAgICByZXR1cm4gY2hhaW47XG59O1xuXG4vKipcbiAqIEhhbmRsZSBldmVudCBTdGF0ZUNoYW5nZWQgZm9yIENvZ25pdGl2ZUpvYlxuICogXG4gKiBAcGFyYW0ge3N0cmluZ30gYWRkcmVzc1xuICogQHBhcmFtIHtPYmplY3R9IGNvbmZpZyBMaWJyYXJ5IGNvbmZpZyAocHJvdmlkZWQgYnkgdGhlIHByb3h5IGJ1dCBjYW4gYmUgb3ZlcnJpZGRlbilcbiAqIEByZXR1cm5zIHtPYmplY3R9IE9iamVjdCB3aXRoIGNoYWluZWQgY2FsbGJhY2tzICNkYXRhIGFuZCAjZXJyb3JcbiAqL1xuZXhwb3J0IGNvbnN0IGV2ZW50Q29nbml0aXZlSm9iU3RhdGVDaGFuZ2VkID0gKGFkZHJlc3MsIGNvbmZpZyA9IHt9KSA9PiB7XG5cbiAgICBleHBlY3QuYWxsKHsgYWRkcmVzcyB9LCB7XG4gICAgICAgICdhZGRyZXNzJzoge1xuICAgICAgICAgICAgdHlwZTogJ2FkZHJlc3MnXG4gICAgICAgIH1cbiAgICB9KTtcblxuICAgIGV4cGVjdC5hbGwoY29uZmlnLCB7XG4gICAgICAgICd3ZWIzJzoge1xuICAgICAgICAgICAgdHlwZTogJ29iamVjdCcsXG4gICAgICAgICAgICBjb2RlOiBXRUIzX1JFUVVJUkVEXG4gICAgICAgIH0sXG4gICAgICAgICdjb250cmFjdHMuQ29nbml0aXZlSm9iLmFiaSc6IHtcbiAgICAgICAgICAgIHR5cGU6ICdvYmplY3QnLFxuICAgICAgICAgICAgY29kZTogQ09OVFJBQ1RfUkVRVUlSRUQsXG4gICAgICAgICAgICBhcmdzOiBbJ0NvZ25pdGl2ZUpvYiddXG4gICAgICAgIH1cbiAgICB9KTtcblxuICAgIGNvbnN0IGNhbGxiYWNrcyA9IHtcbiAgICAgICAgb25EYXRhOiAoKSA9PiB7fSxcbiAgICAgICAgb25FcnJvcjogKCkgPT4ge31cbiAgICB9O1xuXG4gICAgY29uc3QgY2hhaW4gPSB7XG4gICAgICAgIGRhdGE6IChjYiA9ICgpID0+IHt9KSA9PiB7XG4gICAgICAgICAgICBjYWxsYmFja3Mub25EYXRhID0gY2I7XG4gICAgICAgICAgICByZXR1cm4gY2hhaW47XG4gICAgICAgIH0sXG4gICAgICAgIGVycm9yOiAoY2IgPSAoKSA9PiB7fSkgPT4ge1xuICAgICAgICAgICAgY2FsbGJhY2tzLm9uRXJyb3IgPSBjYjtcbiAgICAgICAgICAgIHJldHVybiBjaGFpbjtcbiAgICAgICAgfVxuICAgIH07XG5cbiAgICBjb25zdCBjb2cgPSBuZXcgY29uZmlnLndlYjMuZXRoLkNvbnRyYWN0KGNvbmZpZy5jb250cmFjdHMuQ29nbml0aXZlSm9iLmFiaSwgYWRkcmVzcyk7XG4gICAgY29nLmV2ZW50cy5TdGF0ZUNoYW5nZWQoKVxuICAgICAgICAub24oJ2RhdGEnLCBhc3luYyByZXMgPT4ge1xuXG4gICAgICAgICAgICB0cnkge1xuXG4gICAgICAgICAgICAgICAgY29uc3Qgc3RvcmUgPSBhd2FpdCBmZXRjaEpvYlN0b3JlKHJlcy5yZXR1cm5WYWx1ZXMuY29nbml0aXZlSm9iKTtcbiAgICAgICAgICAgICAgICBjYWxsYmFja3Mub25EYXRhKHtcbiAgICAgICAgICAgICAgICAgICAgYWRkcmVzczogcmVzLnJldHVyblZhbHVlcy5jb2duaXRpdmVKb2IsXG4gICAgICAgICAgICAgICAgICAgIHN0b3JlLFxuICAgICAgICAgICAgICAgICAgICBzdGF0dXM6ICdjaGFuZ2VkJyxcbiAgICAgICAgICAgICAgICAgICAgZXZlbnQ6ICdDb2duaXRpdmVKb2IuU3RhdGVDaGFuZ2VkJ1xuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfSBjYXRjaChlcnIpIHtcbiAgICAgICAgICAgICAgICBjYWxsYmFja3Mub25FcnJvcihlcnIpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KVxuICAgICAgICAub24oJ2Vycm9yJywgY2FsbGJhY2tzLm9uRXJyb3IpO1xuXG4gICAgcmV0dXJuIGNoYWluO1xufTtcbiJdfQ==