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
exports.eventCognitiveJobStateChanged = exports.eventCognitiveJobCreated = exports.create = exports.fetchJobStore = exports.fetchAll = exports.fetchJob = exports.fetchDescription = exports.fetchIpfsResults = exports.fetchProgress = exports.fetchBatches = exports.fetchDataset = exports.fetchKernel = exports.fetchState = exports.fetchAddressById = exports.fetchCognitiveJobsCount = void 0;

var expect = _interopRequireWildcard(require("./helpers/expect"));

var _errors = _interopRequireWildcard(require("./helpers/errors"));

var _kernels = require("./kernels");

var _datasets = require("./datasets");

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; var ownKeys = Object.keys(source); if (typeof Object.getOwnPropertySymbols === 'function') { ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) { return Object.getOwnPropertyDescriptor(source, sym).enumerable; })); } ownKeys.forEach(function (key) { _defineProperty(target, key, source[key]); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

/**
 * Get job count from Pandora contract
 * 
 * @param {Object} config Library config (provided by the proxy but can be overridden)
 * @returns {Promise} A Promise object represents the {number} 
 */
const fetchCognitiveJobsCount = async (config = {}) => {
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
  const count = await pan.methods.cognitiveJobsCount().call();
  return Number.parseInt(count, 10);
};
/**
 * Get worker by the worker's id
 * 
 * @param {integer} id 
 * @param {Object} config Library config (provided by the proxy but can be overridden)
 * @returns {Promise} A Promise object represents the {string}
 */


exports.fetchCognitiveJobsCount = fetchCognitiveJobsCount;

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
  const jobAddress = await pan.methods.cognitiveJobs(id).call();
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
 * Get description from Job contract by the kernel address
 * 
 * @param {string} address
 * @param {Object} config Library config (provided by the proxy but can be overridden)
 * @returns {Promise} A Promise object represents the {number}
 */


exports.fetchIpfsResults = fetchIpfsResults;

const fetchDescription = async (address = '', config = {}) => {
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
  const description = await cog.methods.description().call();
  return config.web3.utils.hexToUtf8(description);
};
/**
 * Get job by the job address
 * 
 * @param {string} address 
 * @param {Object} config Library config (provided by the proxy but can be overridden)
 * @returns {Promise} A Promise object represents the {Object} 
 */


exports.fetchDescription = fetchDescription;

const fetchJob = async (address = '', config = {}) => {
  const [state, kernel, dataset, batches, progress, ipfsResults, description] = await Promise.all([fetchState(address, config), fetchKernel(address, config), fetchDataset(address, config), fetchBatches(address, config), fetchProgress(address, config), fetchIpfsResults(address, config), fetchDescription(address, config)]);
  return {
    address: address,
    jobStatus: state,
    kernel: kernel,
    dataset: dataset,
    batches: batches,
    progress: progress,
    ipfsResults: ipfsResults,
    activeWorkersCount: batches,
    description
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
 * @param {Object} options
 * @param {String} from Publisher address
 * @param {Object} config Library config (provided by the proxy but can be overridden)
 * @returns {Promise} Promise object resolved to add status (boolean)
 */


exports.fetchJobStore = fetchJobStore;

const create = ({
  kernel,
  dataset,
  complexity,
  jobType,
  description
}, from, config = {}) => new Promise((resolve, reject) => {
  expect.all({
    kernel,
    dataset,
    complexity,
    jobType,
    description,
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
      type: 'number'
    },
    'description': {
      type: 'string'
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
  pan.methods.createCognitiveJob(kernel, dataset, complexity, config.web3.utils.utf8ToHex(`${jobType};${description}`)).send({
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9qb2JzLmpzIl0sIm5hbWVzIjpbImZldGNoQ29nbml0aXZlSm9ic0NvdW50IiwiY29uZmlnIiwiZXhwZWN0IiwiYWxsIiwidHlwZSIsImNvZGUiLCJXRUIzX1JFUVVJUkVEIiwiQ09OVFJBQ1RfUkVRVUlSRUQiLCJhcmdzIiwiQUREUkVTU19SRVFVSVJFRCIsInBhbiIsIndlYjMiLCJldGgiLCJDb250cmFjdCIsImNvbnRyYWN0cyIsIlBhbmRvcmEiLCJhYmkiLCJhZGRyZXNzZXMiLCJjb3VudCIsIm1ldGhvZHMiLCJjb2duaXRpdmVKb2JzQ291bnQiLCJjYWxsIiwiTnVtYmVyIiwicGFyc2VJbnQiLCJmZXRjaEFkZHJlc3NCeUlkIiwiaWQiLCJqb2JBZGRyZXNzIiwiY29nbml0aXZlSm9icyIsIlN0cmluZyIsImZldGNoU3RhdGUiLCJhZGRyZXNzIiwiY29nIiwiQ29nbml0aXZlSm9iIiwic3RhdGUiLCJjdXJyZW50U3RhdGUiLCJmZXRjaEtlcm5lbCIsImtlcm5lbCIsImZldGNoRGF0YXNldCIsImRhdGFzZXQiLCJmZXRjaEJhdGNoZXMiLCJiYXRjaGVzIiwiZmV0Y2hQcm9ncmVzcyIsInByb2dyZXNzIiwiZmV0Y2hJcGZzUmVzdWx0cyIsImlwZnNSZXN1bHRzQ291bnQiLCJpcGZzUmVzdWx0cyIsImkiLCJyZXN1bHQiLCJwdXNoIiwiZmV0Y2hEZXNjcmlwdGlvbiIsImRlc2NyaXB0aW9uIiwidXRpbHMiLCJoZXhUb1V0ZjgiLCJmZXRjaEpvYiIsIlByb21pc2UiLCJqb2JTdGF0dXMiLCJhY3RpdmVXb3JrZXJzQ291bnQiLCJmZXRjaEFsbCIsInJlY29yZHMiLCJlcnJvciIsImZldGNoQWN0aXZlQ291bnQiLCJqb2IiLCJlcnIiLCJtZXNzYWdlIiwiZmV0Y2hKb2JTdG9yZSIsImNyZWF0ZSIsImNvbXBsZXhpdHkiLCJqb2JUeXBlIiwiZnJvbSIsInJlc29sdmUiLCJyZWplY3QiLCJjcmVhdGVDb2duaXRpdmVKb2IiLCJ1dGY4VG9IZXgiLCJzZW5kIiwiZ2FzIiwib24iLCJyZWNlaXB0Iiwic3RhdHVzIiwiVFJBTlNBQ1RJT05fVU5TVUNDRVNTRlVMIiwiZXZlbnRzIiwiQ29nbml0aXZlSm9iQ3JlYXRlRmFpbGVkIiwiRkFJTFVSRV9FVkVOVCIsIkNvZ25pdGl2ZUpvYkNyZWF0ZWQiLCJyZXR1cm5WYWx1ZXMiLCJjb2duaXRpdmVKb2IiLCJldmVudENvZ25pdGl2ZUpvYkNyZWF0ZWQiLCJvcHRpb25zIiwiY2FsbGJhY2tzIiwib25EYXRhIiwib25FcnJvciIsImNoYWluIiwiZGF0YSIsImNiIiwicmVzIiwic3RvcmUiLCJldmVudCIsImV2ZW50Q29nbml0aXZlSm9iU3RhdGVDaGFuZ2VkIiwiU3RhdGVDaGFuZ2VkIl0sIm1hcHBpbmdzIjoiQUFBQTs7Ozs7Ozs7QUFTQTs7Ozs7OztBQUVBOztBQUNBOztBQVFBOztBQUlBOzs7Ozs7OztBQUlBOzs7Ozs7QUFNTyxNQUFNQSwwQkFBMEIsT0FBT0MsU0FBUyxFQUFoQixLQUF1QjtBQUUxREMsU0FBT0MsR0FBUCxDQUFXRixNQUFYLEVBQW1CO0FBQ2YsWUFBUTtBQUNKRyxZQUFNLFFBREY7QUFFSkMsWUFBTUM7QUFGRixLQURPO0FBS2YsNkJBQXlCO0FBQ3JCRixZQUFNLFFBRGU7QUFFckJDLFlBQU1FLHlCQUZlO0FBR3JCQyxZQUFNLENBQUMsU0FBRDtBQUhlLEtBTFY7QUFVZix5QkFBcUI7QUFDakJKLFlBQU0sU0FEVztBQUVqQkMsWUFBTUksd0JBRlc7QUFHakJELFlBQU0sQ0FBQyxTQUFEO0FBSFc7QUFWTixHQUFuQjtBQWlCQSxRQUFNRSxNQUFNLElBQUlULE9BQU9VLElBQVAsQ0FBWUMsR0FBWixDQUFnQkMsUUFBcEIsQ0FBNkJaLE9BQU9hLFNBQVAsQ0FBaUJDLE9BQWpCLENBQXlCQyxHQUF0RCxFQUEyRGYsT0FBT2dCLFNBQVAsQ0FBaUJGLE9BQTVFLENBQVo7QUFDQSxRQUFNRyxRQUFRLE1BQU1SLElBQUlTLE9BQUosQ0FDZkMsa0JBRGUsR0FFZkMsSUFGZSxFQUFwQjtBQUlBLFNBQU9D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V0FBTyxDQUFDaUMsS0FBSyxNQUFNLENBQUUsQ0FBZCxLQUFtQjtBQUN0QkwsZ0JBQVVFLE9BQVYsR0FBb0JHLEVBQXBCO0FBQ0EsYUFBT0YsS0FBUDtBQUNIO0FBUlMsR0FBZDtBQVdBLFFBQU0zRCxNQUFNLElBQUk5QixPQUFPVSxJQUFQLENBQVlDLEdBQVosQ0FBZ0JDLFFBQXBCLENBQTZCWixPQUFPYSxTQUFQLENBQWlCa0IsWUFBakIsQ0FBOEJoQixHQUEzRCxFQUFnRWMsT0FBaEUsQ0FBWjtBQUNBQyxNQUFJZ0QsTUFBSixDQUFXa0IsWUFBWCxHQUNLdEIsRUFETCxDQUNRLE1BRFIsRUFDZ0IsTUFBTWtCLEdBQU4sSUFBYTtBQUVyQixRQUFJO0FBRUEsWUFBTUMsUUFBUSxNQUFNOUIsY0FBYzZCLElBQUlWLFlBQUosQ0FBaUJDLFlBQS9CLENBQXBCO0FBQ0FHLGdCQUFVQyxNQUFWLENBQWlCO0FBQ2IxRCxpQkFBUytELElBQUlWLFlBQUosQ0FBaUJDLFlBRGI7QUFFYlUsYUFGYTtBQUdiakIsZ0JBQVEsU0FISztBQUlia0IsZUFBTztBQUpNLE9BQWpCO0FBTUgsS0FURCxDQVNFLE9BQU1qQyxHQUFOLEVBQVc7QUFDVHlCLGdCQUFVRSxPQUFWLENBQWtCM0IsR0FBbEI7QUFDSDtBQUNKLEdBZkwsRUFnQkthLEVBaEJMLENBZ0JRLE9BaEJSLEVBZ0JpQlksVUFBVUUsT0FoQjNCO0FBa0JBLFNBQU9DLEtBQVA7QUFDSCxDQXhETSIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogQ29nbml0aXZlIEpvYnMgcmVsYXRlZCBtZXRob2RzXG4gKiBUaGlzIGZpbGUgaXQgaXMgYSBwYXJ0IG9mIHRoZSBQYW5kb3JhIFB5cnJoYSBKYXZhc2NyaXB0IGxpYnJhcnlcbiAqIFxuICogQGZpbGUgam9icy5qc1xuICogQGF1dGhvciBLb3N0aWFudHluIFNteXJub3YgPGtvc3R5c2hAZ21haWwuY29tPlxuICogQGRhdGUgMjAxOFxuICovXG5cbid1c2Ugc3RyaWN0JztcblxuaW1wb3J0ICogYXMgZXhwZWN0IGZyb20gJy4vaGVscGVycy9leHBlY3QnO1xuaW1wb3J0IHBqc0Vycm9yLCB7XG4gICAgQ09OVFJBQ1RfUkVRVUlSRUQsXG4gICAgQUREUkVTU19SRVFVSVJFRCxcbiAgICBXRUIzX1JFUVVJUkVELFxuICAgIFRSQU5TQUNUSU9OX1VOU1VDQ0VTU0ZVTCxcbiAgICBGQUlMVVJFX0VWRU5UXG59IGZyb20gJy4vaGVscGVycy9lcnJvcnMnO1xuXG5pbXBvcnQge1xuICAgIGZldGNoSXBmc0FkZHJlc3MgYXMgZmV0Y2hJcGZzQWRkcmVzc0J5S2VybmVsQWRkcmVzc1xufSBmcm9tICcuL2tlcm5lbHMnO1xuXG5pbXBvcnQge1xuICAgIGZldGNoRGF0YXNldCBhcyBmZXRjaERhdGFzZXRCeURhdGFzZXRBZGRyZXNzXG59IGZyb20gJy4vZGF0YXNldHMnO1xuXG4vKipcbiAqIEdldCBqb2IgY291bnQgZnJvbSBQYW5kb3JhIGNvbnRyYWN0XG4gKiBcbiAqIEBwYXJhbSB7T2JqZWN0fSBjb25maWcgTGlicmFyeSBjb25maWcgKHByb3ZpZGVkIGJ5IHRoZSBwcm94eSBidXQgY2FuIGJlIG92ZXJyaWRkZW4pXG4gKiBAcmV0dXJucyB7UHJvbWlzZX0gQSBQcm9taXNlIG9iamVjdCByZXByZXNlbnRzIHRoZSB7bnVtYmVyfSBcbiAqL1xuZXhwb3J0IGNvbnN0IGZldGNoQ29nbml0aXZlSm9ic0NvdW50ID0gYXN5bmMgKGNvbmZpZyA9IHt9KSA9PiB7XG5cbiAgICBleHBlY3QuYWxsKGNvbmZpZywge1xuICAgICAgICAnd2ViMyc6IHtcbiAgICAgICAgICAgIHR5cGU6ICdvYmplY3QnLFxuICAgICAgICAgICAgY29kZTogV0VCM19SRVFVSVJFRFxuICAgICAgICB9LFxuICAgICAgICAnY29udHJhY3RzLlBhbmRvcmEuYWJpJzoge1xuICAgICAgICAgICAgdHlwZTogJ29iamVjdCcsXG4gICAgICAgICAgICBjb2RlOiBDT05UUkFDVF9SRVFVSVJFRCxcbiAgICAgICAgICAgIGFyZ3M6IFsnUGFuZG9yYSddXG4gICAgICAgIH0sXG4gICAgICAgICdhZGRyZXNzZXMuUGFuZG9yYSc6IHtcbiAgICAgICAgICAgIHR5cGU6ICdhZGRyZXNzJyxcbiAgICAgICAgICAgIGNvZGU6IEFERFJFU1NfUkVRVUlSRUQsXG4gICAgICAgICAgICBhcmdzOiBbJ1BhbmRvcmEnXVxuICAgICAgICB9XG4gICAgfSk7XG5cbiAgICBjb25zdCBwYW4gPSBuZXcgY29uZmlnLndlYjMuZXRoLkNvbnRyYWN0KGNvbmZpZy5jb250cmFjdHMuUGFuZG9yYS5hYmksIGNvbmZpZy5hZGRyZXNzZXMuUGFuZG9yYSk7XG4gICAgY29uc3QgY291bnQgPSBhd2FpdCBwYW4ubWV0aG9kc1xuICAgICAgICAuY29nbml0aXZlSm9ic0NvdW50KClcbiAgICAgICAgLmNhbGwoKTtcbiAgICAgICAgXG4gICAgcmV0dXJuIE51bWJlci5wYXJzZUludChjb3VudCwgMTApO1xufTtcblxuLyoqXG4gKiBHZXQgd29ya2VyIGJ5IHRoZSB3b3JrZXIncyBpZFxuICogXG4gKiBAcGFyYW0ge2ludGVnZXJ9IGlkIFxuICogQHBhcmFtIHtPYmplY3R9IGNvbmZpZyBMaWJyYXJ5IGNvbmZpZyAocHJvdmlkZWQgYnkgdGhlIHByb3h5IGJ1dCBjYW4gYmUgb3ZlcnJpZGRlbilcbiAqIEByZXR1cm5zIHtQcm9taXNlfSBBIFByb21pc2Ugb2JqZWN0IHJlcHJlc2VudHMgdGhlIHtzdHJpbmd9XG4gKi9cbmV4cG9ydCBjb25zdCBmZXRjaEFkZHJlc3NCeUlkID0gYXN5bmMgKGlkLCBjb25maWcgPSB7fSkgPT4ge1xuXG4gICAgZXhwZWN0LmFsbCh7IGlkIH0sIHtcbiAgICAgICAgJ2lkJzoge1xuICAgICAgICAgICAgdHlwZTogJ251bWJlcidcbiAgICAgICAgfVxuICAgIH0pO1xuXG4gICAgZXhwZWN0LmFsbChjb25maWcsIHtcbiAgICAgICAgJ3dlYjMnOiB7XG4gICAgICAgICAgICB0eXBlOiAnb2JqZWN0JyxcbiAgICAgICAgICAgIGNvZGU6IFdFQjNfUkVRVUlSRURcbiAgICAgICAgfSxcbiAgICAgICAgJ2NvbnRyYWN0cy5QYW5kb3JhLmFiaSc6IHtcbiAgICAgICAgICAgIHR5cGU6ICdvYmplY3QnLFxuICAgICAgICAgICAgY29kZTogQ09OVFJBQ1RfUkVRVUlSRUQsXG4gICAgICAgICAgICBhcmdzOiBbJ1BhbmRvcmEnXVxuICAgICAgICB9LFxuICAgICAgICAnYWRkcmVzc2VzLlBhbmRvcmEnOiB7XG4gICAgICAgICAgICB0eXBlOiAnYWRkcmVzcycsXG4gICAgICAgICAgICBjb2RlOiBBRERSRVNTX1JFUVVJUkVELFxuICAgICAgICAgICAgYXJnczogWydQYW5kb3JhJ11cbiAgICAgICAgfVxuICAgIH0pO1xuXG4gICAgY29uc3QgcGFuID0gbmV3IGNvbmZpZy53ZWIzLmV0aC5Db250cmFjdChjb25maWcuY29udHJhY3RzLlBhbmRvcmEuYWJpLCBjb25maWcuYWRkcmVzc2VzLlBhbmRvcmEpO1xuICAgIGNvbnN0IGpvYkFkZHJlc3MgPSBhd2FpdCBwYW4ubWV0aG9kc1xuICAgICAgICAuY29nbml0aXZlSm9icyhpZClcbiAgICAgICAgLmNhbGwoKTtcblxuICAgIHJldHVybiBTdHJpbmcoam9iQWRkcmVzcyk7XG59O1xuXG4vKipcbiAqIEdldCBqb2Igc3RhdGUgZnJvbSBDb2duaXRpdmUgSm9iIGNvbnRyYWN0IGJ5IHRoZSBqb2IgYWRkcmVzc1xuICogXG4gKiBAcGFyYW0ge3N0cmluZ30gYWRkcmVzcyBcbiAqIEBwYXJhbSB7T2JqZWN0fSBjb25maWcgTGlicmFyeSBjb25maWcgKHByb3ZpZGVkIGJ5IHRoZSBwcm94eSBidXQgY2FuIGJlIG92ZXJyaWRkZW4pXG4gKiBAcmV0dXJucyB7UHJvbWlzZX0gQSBQcm9taXNlIG9iamVjdCByZXByZXNlbnRzIHRoZSB7aW50ZWdlcn0gXG4gKi9cbmV4cG9ydCBjb25zdCBmZXRjaFN0YXRlID0gYXN5bmMgKGFkZHJlc3MgPSAnJywgY29uZmlnID0ge30pID0+IHtcblxuICAgIGV4cGVjdC5hbGwoeyBhZGRyZXNzIH0sIHtcbiAgICAgICAgJ2FkZHJlc3MnOiB7XG4gICAgICAgICAgICB0eXBlOiAnYWRkcmVzcydcbiAgICAgICAgfVxuICAgIH0pO1xuXG4gICAgZXhwZWN0LmFsbChjb25maWcsIHtcbiAgICAgICAgJ3dlYjMnOiB7XG4gICAgICAgICAgICB0eXBlOiAnb2JqZWN0JyxcbiAgICAgICAgICAgIGNvZGU6IFdFQjNfUkVRVUlSRURcbiAgICAgICAgfSxcbiAgICAgICAgJ2NvbnRyYWN0cy5Db2duaXRpdmVKb2IuYWJpJzoge1xuICAgICAgICAgICAgdHlwZTogJ29iamVjdCcsXG4gICAgICAgICAgICBjb2RlOiBDT05UUkFDVF9SRVFVSVJFRCxcbiAgICAgICAgICAgIGFyZ3M6IFsnQ29nbml0aXZlSm9iJ11cbiAgICAgICAgfVxuICAgIH0pO1xuXG4gICAgY29uc3QgY29nID0gbmV3IGNvbmZpZy53ZWIzLmV0aC5Db250cmFjdChjb25maWcuY29udHJhY3RzLkNvZ25pdGl2ZUpvYi5hYmksIGFkZHJlc3MpO1xuICAgIGNvbnN0IHN0YXRlID0gYXdhaXQgY29nLm1ldGhvZHNcbiAgICAgICAgLmN1cnJlbnRTdGF0ZSgpXG4gICAgICAgIC5jYWxsKCk7XG5cbiAgICByZXR1cm4gTnVtYmVyLnBhcnNlSW50KHN0YXRlLCAxMCk7XG59O1xuXG4vKipcbiAqIEdldCBqb2Iga2VybmVsIGZyb20gQ29nbml0aXZlIEpvYiBjb250cmFjdCBieSB0aGUgam9iIGFkZHJlc3NcbiAqIFxuICogQHBhcmFtIHtzdHJpbmd9IGFkZHJlc3MgXG4gKiBAcGFyYW0ge09iamVjdH0gY29uZmlnIExpYnJhcnkgY29uZmlnIChwcm92aWRlZCBieSB0aGUgcHJveHkgYnV0IGNhbiBiZSBvdmVycmlkZGVuKVxuICogQHJldHVybnMge1Byb21pc2V9IEEgUHJvbWlzZSBvYmplY3QgcmVwcmVzZW50cyB0aGUge3N0cmluZ30gXG4gKi9cbmV4cG9ydCBjb25zdCBmZXRjaEtlcm5lbCA9IGFzeW5jIChhZGRyZXNzID0gJycsIGNvbmZpZyA9IHt9KSA9PiB7XG5cbiAgICBleHBlY3QuYWxsKHsgYWRkcmVzcyB9LCB7XG4gICAgICAgICdhZGRyZXNzJzoge1xuICAgICAgICAgICAgdHlwZTogJ2FkZHJlc3MnXG4gICAgICAgIH1cbiAgICB9KTtcblxuICAgIGV4cGVjdC5hbGwoY29uZmlnLCB7XG4gICAgICAgICd3ZWIzJzoge1xuICAgICAgICAgICAgdHlwZTogJ29iamVjdCcsXG4gICAgICAgICAgICBjb2RlOiBXRUIzX1JFUVVJUkVEXG4gICAgICAgIH0sXG4gICAgICAgICdjb250cmFjdHMuQ29nbml0aXZlSm9iLmFiaSc6IHtcbiAgICAgICAgICAgIHR5cGU6ICdvYmplY3QnLFxuICAgICAgICAgICAgY29kZTogQ09OVFJBQ1RfUkVRVUlSRUQsXG4gICAgICAgICAgICBhcmdzOiBbJ0NvZ25pdGl2ZUpvYiddXG4gICAgICAgIH1cbiAgICB9KTtcblxuICAgIGNvbnN0IGNvZyA9IG5ldyBjb25maWcud2ViMy5ldGguQ29udHJhY3QoY29uZmlnLmNvbnRyYWN0cy5Db2duaXRpdmVKb2IuYWJpLCBhZGRyZXNzKTtcbiAgICBjb25zdCBrZXJuZWwgPSBhd2FpdCBjb2cubWV0aG9kc1xuICAgICAgICAua2VybmVsKClcbiAgICAgICAgLmNhbGwoKTtcblxuICAgIHJldHVybiBTdHJpbmcoa2VybmVsKTtcbn07XG5cbi8qKlxuICogR2V0IGpvYiBkYXRhc2V0IGZyb20gQ29nbml0aXZlIEpvYiBjb250cmFjdCBieSB0aGUgam9iIGFkZHJlc3NcbiAqIFxuICogQHBhcmFtIHtzdHJpbmd9IGFkZHJlc3MgXG4gKiBAcGFyYW0ge09iamVjdH0gY29uZmlnIExpYnJhcnkgY29uZmlnIChwcm92aWRlZCBieSB0aGUgcHJveHkgYnV0IGNhbiBiZSBvdmVycmlkZGVuKVxuICogQHJldHVybnMge1Byb21pc2V9IEEgUHJvbWlzZSBvYmplY3QgcmVwcmVzZW50cyB0aGUge3N0cmluZ30gXG4gKi9cbmV4cG9ydCBjb25zdCBmZXRjaERhdGFzZXQgPSBhc3luYyAoYWRkcmVzcyA9ICcnLCBjb25maWcgPSB7fSkgPT4ge1xuXG4gICAgZXhwZWN0LmFsbCh7IGFkZHJlc3MgfSwge1xuICAgICAgICAnYWRkcmVzcyc6IHtcbiAgICAgICAgICAgIHR5cGU6ICdhZGRyZXNzJ1xuICAgICAgICB9XG4gICAgfSk7XG5cbiAgICBleHBlY3QuYWxsKGNvbmZpZywge1xuICAgICAgICAnd2ViMyc6IHtcbiAgICAgICAgICAgIHR5cGU6ICdvYmplY3QnLFxuICAgICAgICAgICAgY29kZTogV0VCM19SRVFVSVJFRFxuICAgICAgICB9LFxuICAgICAgICAnY29udHJhY3RzLkNvZ25pdGl2ZUpvYi5hYmknOiB7XG4gICAgICAgICAgICB0eXBlOiAnb2JqZWN0JyxcbiAgICAgICAgICAgIGNvZGU6IENPTlRSQUNUX1JFUVVJUkVELFxuICAgICAgICAgICAgYXJnczogWydDb2duaXRpdmVKb2InXVxuICAgICAgICB9XG4gICAgfSk7XG5cbiAgICBjb25zdCBjb2cgPSBuZXcgY29uZmlnLndlYjMuZXRoLkNvbnRyYWN0KGNvbmZpZy5jb250cmFjdHMuQ29nbml0aXZlSm9iLmFiaSwgYWRkcmVzcyk7XG4gICAgY29uc3QgZGF0YXNldCA9IGF3YWl0IGNvZy5tZXRob2RzXG4gICAgICAgIC5kYXRhc2V0KClcbiAgICAgICAgLmNhbGwoKTtcblxuICAgIHJldHVybiBTdHJpbmcoZGF0YXNldCk7XG59O1xuXG4vKipcbiAqIEdldCBqb2IgYmF0Y2hlcyBjb3VudCBmcm9tIENvZ25pdGl2ZSBKb2IgY29udHJhY3QgYnkgdGhlIGpvYiBhZGRyZXNzXG4gKiBcbiAqIEBwYXJhbSB7c3RyaW5nfSBhZGRyZXNzIFxuICogQHBhcmFtIHtPYmplY3R9IGNvbmZpZyBMaWJyYXJ5IGNvbmZpZyAocHJvdmlkZWQgYnkgdGhlIHByb3h5IGJ1dCBjYW4gYmUgb3ZlcnJpZGRlbilcbiAqIEByZXR1cm5zIHtQcm9taXNlfSBBIFByb21pc2Ugb2JqZWN0IHJlcHJlc2VudHMgdGhlIHtudW1iZXJ9IFxuICovXG5leHBvcnQgY29uc3QgZmV0Y2hCYXRjaGVzID0gYXN5bmMgKGFkZHJlc3MgPSAnJywgY29uZmlnID0ge30pID0+IHtcblxuICAgIGV4cGVjdC5hbGwoeyBhZGRyZXNzIH0sIHtcbiAgICAgICAgJ2FkZHJlc3MnOiB7XG4gICAgICAgICAgICB0eXBlOiAnYWRkcmVzcydcbiAgICAgICAgfVxuICAgIH0pO1xuXG4gICAgZXhwZWN0LmFsbChjb25maWcsIHtcbiAgICAgICAgJ3dlYjMnOiB7XG4gICAgICAgICAgICB0eXBlOiAnb2JqZWN0JyxcbiAgICAgICAgICAgIGNvZGU6IFdFQjNfUkVRVUlSRURcbiAgICAgICAgfSxcbiAgICAgICAgJ2NvbnRyYWN0cy5Db2duaXRpdmVKb2IuYWJpJzoge1xuICAgICAgICAgICAgdHlwZTogJ29iamVjdCcsXG4gICAgICAgICAgICBjb2RlOiBDT05UUkFDVF9SRVFVSVJFRCxcbiAgICAgICAgICAgIGFyZ3M6IFsnQ29nbml0aXZlSm9iJ11cbiAgICAgICAgfVxuICAgIH0pO1xuXG4gICAgY29uc3QgY29nID0gbmV3IGNvbmZpZy53ZWIzLmV0aC5Db250cmFjdChjb25maWcuY29udHJhY3RzLkNvZ25pdGl2ZUpvYi5hYmksIGFkZHJlc3MpO1xuICAgIGNvbnN0IGJhdGNoZXMgPSBhd2FpdCBjb2cubWV0aG9kc1xuICAgICAgICAuYmF0Y2hlcygpXG4gICAgICAgIC5jYWxsKCk7XG5cbiAgICByZXR1cm4gTnVtYmVyLnBhcnNlSW50KGJhdGNoZXMsIDEwKTtcbn07XG5cbi8qKlxuICogR2V0IGpvYiBwcm9ncmVzcyBmcm9tIENvZ25pdGl2ZSBKb2IgY29udHJhY3QgYnkgdGhlIGpvYiBhZGRyZXNzXG4gKiBcbiAqIEBwYXJhbSB7c3RyaW5nfSBhZGRyZXNzIFxuICogQHBhcmFtIHtPYmplY3R9IGNvbmZpZyBMaWJyYXJ5IGNvbmZpZyAocHJvdmlkZWQgYnkgdGhlIHByb3h5IGJ1dCBjYW4gYmUgb3ZlcnJpZGRlbilcbiAqIEByZXR1cm5zIHtQcm9taXNlfSBBIFByb21pc2Ugb2JqZWN0IHJlcHJlc2VudHMgdGhlIHtudW1iZXJ9IFxuICovXG5leHBvcnQgY29uc3QgZmV0Y2hQcm9ncmVzcyA9IGFzeW5jIChhZGRyZXNzID0gJycsIGNvbmZpZyA9IHt9KSA9PiB7XG5cbiAgICBleHBlY3QuYWxsKHsgYWRkcmVzcyB9LCB7XG4gICAgICAgICdhZGRyZXNzJzoge1xuICAgICAgICAgICAgdHlwZTogJ2FkZHJlc3MnXG4gICAgICAgIH1cbiAgICB9KTtcblxuICAgIGV4cGVjdC5hbGwoY29uZmlnLCB7XG4gICAgICAgICd3ZWIzJzoge1xuICAgICAgICAgICAgdHlwZTogJ29iamVjdCcsXG4gICAgICAgICAgICBjb2RlOiBXRUIzX1JFUVVJUkVEXG4gICAgICAgIH0sXG4gICAgICAgICdjb250cmFjdHMuQ29nbml0aXZlSm9iLmFiaSc6IHtcbiAgICAgICAgICAgIHR5cGU6ICdvYmplY3QnLFxuICAgICAgICAgICAgY29kZTogQ09OVFJBQ1RfUkVRVUlSRUQsXG4gICAgICAgICAgICBhcmdzOiBbJ0NvZ25pdGl2ZUpvYiddXG4gICAgICAgIH1cbiAgICB9KTtcblxuICAgIGNvbnN0IGNvZyA9IG5ldyBjb25maWcud2ViMy5ldGguQ29udHJhY3QoY29uZmlnLmNvbnRyYWN0cy5Db2duaXRpdmVKb2IuYWJpLCBhZGRyZXNzKTtcbiAgICBjb25zdCBwcm9ncmVzcyA9IGF3YWl0IGNvZy5tZXRob2RzXG4gICAgICAgIC5wcm9ncmVzcygpXG4gICAgICAgIC5jYWxsKCk7XG5cbiAgICByZXR1cm4gTnVtYmVyLnBhcnNlSW50KHByb2dyZXNzLCAxMCk7XG59O1xuXG4vKipcbiAqIEdldCBqb2IncyBpcGZzUmVzdWx0cyBmcm9tIENvZ25pdGl2ZSBKb2IgY29udHJhY3QgYnkgdGhlIGpvYiBhZGRyZXNzXG4gKiBcbiAqIEBwYXJhbSB7c3RyaW5nfSBhZGRyZXNzIFxuICogQHBhcmFtIHtPYmplY3R9IGNvbmZpZyBMaWJyYXJ5IGNvbmZpZyAocHJvdmlkZWQgYnkgdGhlIHByb3h5IGJ1dCBjYW4gYmUgb3ZlcnJpZGRlbilcbiAqIEByZXR1cm5zIHtQcm9taXNlfSBBIFByb21pc2Ugb2JqZWN0IHJlcHJlc2VudHMgdGhlIHtzdHJpbmdbXX0gXG4gKi9cbmV4cG9ydCBjb25zdCBmZXRjaElwZnNSZXN1bHRzID0gYXN5bmMgKGFkZHJlc3MgPSAnJywgY29uZmlnID0ge30pID0+IHtcblxuICAgIGV4cGVjdC5hbGwoeyBhZGRyZXNzIH0sIHtcbiAgICAgICAgJ2FkZHJlc3MnOiB7XG4gICAgICAgICAgICB0eXBlOiAnYWRkcmVzcydcbiAgICAgICAgfVxuICAgIH0pO1xuXG4gICAgZXhwZWN0LmFsbChjb25maWcsIHtcbiAgICAgICAgJ3dlYjMnOiB7XG4gICAgICAgICAgICB0eXBlOiAnb2JqZWN0JyxcbiAgICAgICAgICAgIGNvZGU6IFdFQjNfUkVRVUlSRURcbiAgICAgICAgfSxcbiAgICAgICAgJ2NvbnRyYWN0cy5Db2duaXRpdmVKb2IuYWJpJzoge1xuICAgICAgICAgICAgdHlwZTogJ29iamVjdCcsXG4gICAgICAgICAgICBjb2RlOiBDT05UUkFDVF9SRVFVSVJFRCxcbiAgICAgICAgICAgIGFyZ3M6IFsnQ29nbml0aXZlSm9iJ11cbiAgICAgICAgfVxuICAgIH0pO1xuXG4gICAgY29uc3QgY29nID0gbmV3IGNvbmZpZy53ZWIzLmV0aC5Db250cmFjdChjb25maWcuY29udHJhY3RzLkNvZ25pdGl2ZUpvYi5hYmksIGFkZHJlc3MpO1xuXG4gICAgY29uc3QgaXBmc1Jlc3VsdHNDb3VudCA9IGF3YWl0IGNvZy5tZXRob2RzXG4gICAgICAgIC5pcGZzUmVzdWx0c0NvdW50KClcbiAgICAgICAgLmNhbGwoKTtcblxuICAgIGxldCBpcGZzUmVzdWx0cyA9IFtdO1xuXG4gICAgZm9yIChsZXQgaT0wOyBpIDwgaXBmc1Jlc3VsdHNDb3VudDsgaSsrKSB7XG4gICAgICAgIFxuICAgICAgICBjb25zdCByZXN1bHQgPSBhd2FpdCBjb2cubWV0aG9kc1xuICAgICAgICAgICAgLmlwZnNSZXN1bHRzKGkpXG4gICAgICAgICAgICAuY2FsbCgpO1xuXG4gICAgICAgIGlwZnNSZXN1bHRzLnB1c2gocmVzdWx0KTsgICAgICAgIFxuICAgIH0gICAgXG5cbiAgICByZXR1cm4gaXBmc1Jlc3VsdHM7XG59O1xuXG4vKipcbiAqIEdldCBkZXNjcmlwdGlvbiBmcm9tIEpvYiBjb250cmFjdCBieSB0aGUga2VybmVsIGFkZHJlc3NcbiAqIFxuICogQHBhcmFtIHtzdHJpbmd9IGFkZHJlc3NcbiAqIEBwYXJhbSB7T2JqZWN0fSBjb25maWcgTGlicmFyeSBjb25maWcgKHByb3ZpZGVkIGJ5IHRoZSBwcm94eSBidXQgY2FuIGJlIG92ZXJyaWRkZW4pXG4gKiBAcmV0dXJucyB7UHJvbWlzZX0gQSBQcm9taXNlIG9iamVjdCByZXByZXNlbnRzIHRoZSB7bnVtYmVyfVxuICovXG5leHBvcnQgY29uc3QgZmV0Y2hEZXNjcmlwdGlvbiA9IGFzeW5jIChhZGRyZXNzID0gJycsIGNvbmZpZyA9IHt9KSA9PiB7XG5cbiAgICBleHBlY3QuYWxsKHsgYWRkcmVzcyB9LCB7XG4gICAgICAgICdhZGRyZXNzJzoge1xuICAgICAgICAgICAgdHlwZTogJ2FkZHJlc3MnXG4gICAgICAgIH1cbiAgICB9KTtcblxuICAgIGV4cGVjdC5hbGwoY29uZmlnLCB7XG4gICAgICAgICd3ZWIzJzoge1xuICAgICAgICAgICAgdHlwZTogJ29iamVjdCcsXG4gICAgICAgICAgICBjb2RlOiBXRUIzX1JFUVVJUkVEXG4gICAgICAgIH0sXG4gICAgICAgICdjb250cmFjdHMuQ29nbml0aXZlSm9iLmFiaSc6IHtcbiAgICAgICAgICAgIHR5cGU6ICdvYmplY3QnLFxuICAgICAgICAgICAgY29kZTogQ09OVFJBQ1RfUkVRVUlSRUQsXG4gICAgICAgICAgICBhcmdzOiBbJ0NvZ25pdGl2ZUpvYiddXG4gICAgICAgIH1cbiAgICB9KTtcblxuICAgIGNvbnN0IGNvZyA9IG5ldyBjb25maWcud2ViMy5ldGguQ29udHJhY3QoY29uZmlnLmNvbnRyYWN0cy5Db2duaXRpdmVKb2IuYWJpLCBhZGRyZXNzKTtcbiAgICBjb25zdCBkZXNjcmlwdGlvbiA9IGF3YWl0IGNvZy5tZXRob2RzXG4gICAgICAgIC5kZXNjcmlwdGlvbigpXG4gICAgICAgIC5jYWxsKCk7XG5cbiAgICByZXR1cm4gY29uZmlnLndlYjMudXRpbHMuaGV4VG9VdGY4KGRlc2NyaXB0aW9uKTtcbn07XG5cbi8qKlxuICogR2V0IGpvYiBieSB0aGUgam9iIGFkZHJlc3NcbiAqIFxuICogQHBhcmFtIHtzdHJpbmd9IGFkZHJlc3MgXG4gKiBAcGFyYW0ge09iamVjdH0gY29uZmlnIExpYnJhcnkgY29uZmlnIChwcm92aWRlZCBieSB0aGUgcHJveHkgYnV0IGNhbiBiZSBvdmVycmlkZGVuKVxuICogQHJldHVybnMge1Byb21pc2V9IEEgUHJvbWlzZSBvYmplY3QgcmVwcmVzZW50cyB0aGUge09iamVjdH0gXG4gKi9cbmV4cG9ydCBjb25zdCBmZXRjaEpvYiA9IGFzeW5jIChhZGRyZXNzID0gJycsIGNvbmZpZyA9IHt9KSA9PiB7XG5cbiAgICBjb25zdCBbXG4gICAgICAgIHN0YXRlLFxuICAgICAgICBrZXJuZWwsXG4gICAgICAgIGRhdGFzZXQsXG4gICAgICAgIGJhdGNoZXMsXG4gICAgICAgIHByb2dyZXNzLFxuICAgICAgICBpcGZzUmVzdWx0cyxcbiAgICAgICAgZGVzY3JpcHRpb25cbiAgICBdID0gYXdhaXQgUHJvbWlzZS5hbGwoW1xuICAgICAgICBmZXRjaFN0YXRlKGFkZHJlc3MsIGNvbmZpZyksXG4gICAgICAgIGZldGNoS2VybmVsKGFkZHJlc3MsIGNvbmZpZyksXG4gICAgICAgIGZldGNoRGF0YXNldChhZGRyZXNzLCBjb25maWcpLFxuICAgICAgICBmZXRjaEJhdGNoZXMoYWRkcmVzcywgY29uZmlnKSxcbiAgICAgICAgZmV0Y2hQcm9ncmVzcyhhZGRyZXNzLCBjb25maWcpLFxuICAgICAgICBmZXRjaElwZnNSZXN1bHRzKGFkZHJlc3MsIGNvbmZpZyksXG4gICAgICAgIGZldGNoRGVzY3JpcHRpb24oYWRkcmVzcywgY29uZmlnKVxuICAgIF0pO1xuICAgIFxuICAgIHJldHVybiB7XG4gICAgICAgIGFkZHJlc3M6IGFkZHJlc3MsXG4gICAgICAgIGpvYlN0YXR1czogc3RhdGUsXG4gICAgICAgIGtlcm5lbDoga2VybmVsLFxuICAgICAgICBkYXRhc2V0OiBkYXRhc2V0LFxuICAgICAgICBiYXRjaGVzOiBiYXRjaGVzLFxuICAgICAgICBwcm9ncmVzczogcHJvZ3Jlc3MsXG4gICAgICAgIGlwZnNSZXN1bHRzOiBpcGZzUmVzdWx0cyxcbiAgICAgICAgYWN0aXZlV29ya2Vyc0NvdW50OiBiYXRjaGVzLFxuICAgICAgICBkZXNjcmlwdGlvblxuICAgIH07XG59O1xuXG4vKipcbiAqIEdldCBhbGwgam9ic1xuICogXG4gKiBAcGFyYW0ge09iamVjdH0gY29uZmlnIExpYnJhcnkgY29uZmlnIChwcm92aWRlZCBieSB0aGUgcHJveHkgYnV0IGNhbiBiZSBvdmVycmlkZGVuKVxuICogQHJldHVybnMge1Byb21pc2V9IEEgUHJvbWlzZSBvYmplY3QgcmVwcmVzZW50cyB0aGUge09iamVjdFtdfSBcbiAqL1xuZXhwb3J0IGNvbnN0IGZldGNoQWxsID0gYXN5bmMgKGNvbmZpZyA9IHt9KSA9PiB7XG4gICAgbGV0IHJlY29yZHMgPSBbXTtcbiAgICBsZXQgZXJyb3IgPSBbXTtcblxuICAgIHRyeSB7XG5cbiAgICAgICAgY29uc3QgY291bnQgPSBhd2FpdCBmZXRjaEFjdGl2ZUNvdW50KGNvbmZpZyk7ICAgIFxuXG4gICAgICAgIGZvciAobGV0IGk9MDsgaSA8IGNvdW50OyBpKyspIHtcbiAgICAgICAgICAgIFxuICAgICAgICAgICAgY29uc3QgYWRkcmVzcyA9IGF3YWl0IGZldGNoQWRkcmVzc0J5SWQoaSwgY29uZmlnKTtcblxuICAgICAgICAgICAgdHJ5IHtcblxuICAgICAgICAgICAgICAgIGNvbnN0IGpvYiA9IGF3YWl0IGZldGNoSm9iKGFkZHJlc3MsIGNvbmZpZyk7XG5cbiAgICAgICAgICAgICAgICByZWNvcmRzLnB1c2goe1xuICAgICAgICAgICAgICAgICAgICBpZDogaSxcbiAgICAgICAgICAgICAgICAgICAgLi4uam9iXG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9IGNhdGNoKGVycikge1xuICAgICAgICAgICAgICAgIGVycm9yLnB1c2goe1xuICAgICAgICAgICAgICAgICAgICBhZGRyZXNzLFxuICAgICAgICAgICAgICAgICAgICBtZXNzYWdlOiBlcnIubWVzc2FnZVxuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfSAgICAgICAgXG4gICAgICAgIH1cbiAgICB9IGNhdGNoKGVycikge1xuICAgICAgICBlcnJvci5wdXNoKHtcbiAgICAgICAgICAgIGVycm9yOiBlcnIubWVzc2FnZVxuICAgICAgICB9KTtcbiAgICB9ICAgXG5cbiAgICByZXR1cm4ge1xuICAgICAgICByZWNvcmRzLFxuICAgICAgICBlcnJvclxuICAgIH07XG59O1xuXG4vKipcbiAqIEdldCBqb2Igc3RvcmVcbiAqIFxuICogQHBhcmFtIHtzdHJpbmd9IGFkZHJlc3MgXG4gKiBAcGFyYW0ge09iamVjdH0gY29uZmlnIExpYnJhcnkgY29uZmlnIChwcm92aWRlZCBieSB0aGUgcHJveHkgYnV0IGNhbiBiZSBvdmVycmlkZGVuKVxuICogQHJldHVybnMge1Byb21pc2V9IEEgUHJvbWlzZSBvYmplY3QgcmVwcmVzZW50cyB0aGUge09iamVjdH0gXG4gKi9cbmV4cG9ydCBjb25zdCBmZXRjaEpvYlN0b3JlID0gYXN5bmMgKGFkZHJlc3MgPSAnJywgY29uZmlnID0ge30pID0+IHtcblxuICAgIGNvbnN0IGpvYiA9IGF3YWl0IGZldGNoSm9iKGFkZHJlc3MsIGNvbmZpZyk7XG5cbiAgICBjb25zdCBbXG4gICAgICAgIGtlcm5lbCxcbiAgICAgICAgZGF0YXNldFxuICAgIF0gPSBhd2FpdCBQcm9taXNlLmFsbChbXG4gICAgICAgIGZldGNoSXBmc0FkZHJlc3NCeUtlcm5lbEFkZHJlc3Moam9iLmtlcm5lbCwgY29uZmlnKSxcbiAgICAgICAgZmV0Y2hEYXRhc2V0QnlEYXRhc2V0QWRkcmVzcyhqb2IuZGF0YXNldCwgY29uZmlnKVxuICAgIF0pO1xuICAgIFxuICAgIHJldHVybiB7XG4gICAgICAgIGpvYixcbiAgICAgICAga2VybmVsLFxuICAgICAgICBkYXRhc2V0XG4gICAgfTtcbn07XG5cbi8qKlxuICogQ3JlYXRlIGNvZ25pdGl2ZSBqb2IgY29udHJhY3RcbiAqIFxuICogQHBhcmFtIHtPYmplY3R9IG9wdGlvbnNcbiAqIEBwYXJhbSB7U3RyaW5nfSBmcm9tIFB1Ymxpc2hlciBhZGRyZXNzXG4gKiBAcGFyYW0ge09iamVjdH0gY29uZmlnIExpYnJhcnkgY29uZmlnIChwcm92aWRlZCBieSB0aGUgcHJveHkgYnV0IGNhbiBiZSBvdmVycmlkZGVuKVxuICogQHJldHVybnMge1Byb21pc2V9IFByb21pc2Ugb2JqZWN0IHJlc29sdmVkIHRvIGFkZCBzdGF0dXMgKGJvb2xlYW4pXG4gKi9cbmV4cG9ydCBjb25zdCBjcmVhdGUgPSAoe2tlcm5lbCwgZGF0YXNldCwgY29tcGxleGl0eSwgam9iVHlwZSwgZGVzY3JpcHRpb259LCBmcm9tLCBjb25maWcgPSB7fSkgPT4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuXG4gICAgZXhwZWN0LmFsbCh7IGtlcm5lbCwgZGF0YXNldCwgY29tcGxleGl0eSwgam9iVHlwZSwgZGVzY3JpcHRpb24sIGZyb20gfSwge1xuICAgICAgICAna2VybmVsJzoge1xuICAgICAgICAgICAgdHlwZTogJ2FkZHJlc3MnXG4gICAgICAgIH0sXG4gICAgICAgICdkYXRhc2V0Jzoge1xuICAgICAgICAgICAgdHlwZTogJ2FkZHJlc3MnXG4gICAgICAgIH0sXG4gICAgICAgICdjb21wbGV4aXR5Jzoge1xuICAgICAgICAgICAgdHlwZTogJ251bWJlcidcbiAgICAgICAgfSxcbiAgICAgICAgJ2pvYlR5cGUnOiB7XG4gICAgICAgICAgICB0eXBlOiAnbnVtYmVyJ1xuICAgICAgICB9LFxuICAgICAgICAnZGVzY3JpcHRpb24nOiB7XG4gICAgICAgICAgICB0eXBlOiAnc3RyaW5nJ1xuICAgICAgICB9LFxuICAgICAgICAnZnJvbSc6IHtcbiAgICAgICAgICAgIHR5cGU6ICdhZGRyZXNzJ1xuICAgICAgICB9XG4gICAgfSk7XG5cbiAgICBleHBlY3QuYWxsKGNvbmZpZywge1xuICAgICAgICAnd2ViMyc6IHtcbiAgICAgICAgICAgIHR5cGU6ICdvYmplY3QnLFxuICAgICAgICAgICAgY29kZTogV0VCM19SRVFVSVJFRFxuICAgICAgICB9LFxuICAgICAgICAnY29udHJhY3RzLlBhbmRvcmEuYWJpJzoge1xuICAgICAgICAgICAgdHlwZTogJ29iamVjdCcsXG4gICAgICAgICAgICBjb2RlOiBDT05UUkFDVF9SRVFVSVJFRCxcbiAgICAgICAgICAgIGFyZ3M6IFsnUGFuZG9yYSddXG4gICAgICAgIH0sXG4gICAgICAgICdhZGRyZXNzZXMuUGFuZG9yYSc6IHtcbiAgICAgICAgICAgIHR5cGU6ICdhZGRyZXNzJyxcbiAgICAgICAgICAgIGNvZGU6IEFERFJFU1NfUkVRVUlSRUQsXG4gICAgICAgICAgICBhcmdzOiBbJ1BhbmRvcmEnXVxuICAgICAgICB9XG4gICAgfSk7XG5cbiAgICBjb25zdCBwYW4gPSBuZXcgY29uZmlnLndlYjMuZXRoLkNvbnRyYWN0KGNvbmZpZy5jb250cmFjdHMuUGFuZG9yYS5hYmksIGNvbmZpZy5hZGRyZXNzZXMuUGFuZG9yYSk7XG4gICAgcGFuLm1ldGhvZHNcbiAgICAgICAgLmNyZWF0ZUNvZ25pdGl2ZUpvYihrZXJuZWwsIGRhdGFzZXQsIGNvbXBsZXhpdHksIGNvbmZpZy53ZWIzLnV0aWxzLnV0ZjhUb0hleChgJHtqb2JUeXBlfTske2Rlc2NyaXB0aW9ufWApKVxuICAgICAgICAuc2VuZCh7XG4gICAgICAgICAgICBmcm9tLFxuICAgICAgICAgICAgZ2FzOiA2NzAwMDAwLy8gYmVjYXVzZSB0aGlzIHdvcmtmbG93IGlzIHRvbyBncmVlZHlcbiAgICAgICAgfSlcbiAgICAgICAgLm9uKCdlcnJvcicsIHJlamVjdClcbiAgICAgICAgLm9uKCdyZWNlaXB0JywgcmVjZWlwdCA9PiB7XG5cbiAgICAgICAgICAgIGlmIChOdW1iZXIocmVjZWlwdC5zdGF0dXMpID09PSAwKSB7XG5cbiAgICAgICAgICAgICAgICByZXR1cm4gcmVqZWN0KHBqc0Vycm9yKFRSQU5TQUNUSU9OX1VOU1VDQ0VTU0ZVTCkpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBpZiAocmVjZWlwdC5ldmVudHMuQ29nbml0aXZlSm9iQ3JlYXRlRmFpbGVkKSB7XG5cbiAgICAgICAgICAgICAgICByZXR1cm4gcmVqZWN0KHBqc0Vycm9yKEZBSUxVUkVfRVZFTlQsIHtcbiAgICAgICAgICAgICAgICAgICAgJ0NvZ25pdGl2ZUpvYkNyZWF0ZUZhaWxlZCc6IHJlY2VpcHQuZXZlbnRzLkNvZ25pdGl2ZUpvYkNyZWF0ZUZhaWxlZFxuICAgICAgICAgICAgICAgIH0pKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgcmVzb2x2ZShyZWNlaXB0LmV2ZW50cy5Db2duaXRpdmVKb2JDcmVhdGVkLnJldHVyblZhbHVlcy5jb2duaXRpdmVKb2IpO1xuICAgICAgICB9KTtcbn0pO1xuXG4vKipcbiAqIEhhbmRsZSBldmVudCBDb2duaXRpdmVKb2JDcmVhdGVkXG4gKiBcbiAqIEBwYXJhbSB7T2JqZWN0fSBvcHRpb25zIEV2ZW50IGhhbmRsZXIgb3B0aW9uc1xuICogQHBhcmFtIHtPYmplY3R9IGNvbmZpZyBMaWJyYXJ5IGNvbmZpZyAocHJvdmlkZWQgYnkgdGhlIHByb3h5IGJ1dCBjYW4gYmUgb3ZlcnJpZGRlbilcbiAqIEByZXR1cm5zIHtPYmplY3R9IE9iamVjdCB3aXRoIGNoYWluZWQgY2FsbGJhY2tzICNkYXRhIGFuZCAjZXJyb3JcbiAqL1xuZXhwb3J0IGNvbnN0IGV2ZW50Q29nbml0aXZlSm9iQ3JlYXRlZCA9IChvcHRpb25zID0ge30sIGNvbmZpZyA9IHt9KSA9PiB7XG5cbiAgICBleHBlY3QuYWxsKHsgb3B0aW9ucyB9LCB7XG4gICAgICAgICdvcHRpb25zJzoge1xuICAgICAgICAgICAgdHlwZTogJ29iamVjdCdcbiAgICAgICAgfVxuICAgIH0pO1xuXG4gICAgZXhwZWN0LmFsbChjb25maWcsIHtcbiAgICAgICAgJ3dlYjMnOiB7XG4gICAgICAgICAgICB0eXBlOiAnb2JqZWN0JyxcbiAgICAgICAgICAgIGNvZGU6IFdFQjNfUkVRVUlSRURcbiAgICAgICAgfSxcbiAgICAgICAgJ2NvbnRyYWN0cy5QYW5kb3JhLmFiaSc6IHtcbiAgICAgICAgICAgIHR5cGU6ICdvYmplY3QnLFxuICAgICAgICAgICAgY29kZTogQ09OVFJBQ1RfUkVRVUlSRUQsXG4gICAgICAgICAgICBhcmdzOiBbJ1BhbmRvcmEnXVxuICAgICAgICB9LFxuICAgICAgICAnYWRkcmVzc2VzLlBhbmRvcmEnOiB7XG4gICAgICAgICAgICB0eXBlOiAnYWRkcmVzcycsXG4gICAgICAgICAgICBjb2RlOiBBRERSRVNTX1JFUVVJUkVELFxuICAgICAgICAgICAgYXJnczogWydQYW5kb3JhJ11cbiAgICAgICAgfVxuICAgIH0pO1xuXG4gICAgY29uc3QgY2FsbGJhY2tzID0ge1xuICAgICAgICBvbkRhdGE6ICgpID0+IHt9LFxuICAgICAgICBvbkVycm9yOiAoKSA9PiB7fVxuICAgIH07XG5cbiAgICBjb25zdCBjaGFpbiA9IHtcbiAgICAgICAgZGF0YTogKGNiID0gKCkgPT4ge30pID0+IHtcbiAgICAgICAgICAgIGNhbGxiYWNrcy5vbkRhdGEgPSBjYjtcbiAgICAgICAgICAgIHJldHVybiBjaGFpbjtcbiAgICAgICAgfSxcbiAgICAgICAgZXJyb3I6IChjYiA9ICgpID0+IHt9KSA9PiB7XG4gICAgICAgICAgICBjYWxsYmFja3Mub25FcnJvciA9IGNiO1xuICAgICAgICAgICAgcmV0dXJuIGNoYWluO1xuICAgICAgICB9XG4gICAgfTtcblxuICAgIGNvbnN0IHBhbiA9IG5ldyBjb25maWcud2ViMy5ldGguQ29udHJhY3QoY29uZmlnLmNvbnRyYWN0cy5QYW5kb3JhLmFiaSwgY29uZmlnLmFkZHJlc3Nlcy5QYW5kb3JhKTtcbiAgICBwYW4uZXZlbnRzLkNvZ25pdGl2ZUpvYkNyZWF0ZWQob3B0aW9ucylcbiAgICAgICAgLm9uKCdkYXRhJywgYXN5bmMgcmVzID0+IHtcblxuICAgICAgICAgICAgdHJ5IHtcblxuICAgICAgICAgICAgICAgIGNvbnN0IHN0b3JlID0gYXdhaXQgZmV0Y2hKb2JTdG9yZShyZXMucmV0dXJuVmFsdWVzLmNvZ25pdGl2ZUpvYik7XG4gICAgICAgICAgICAgICAgY2FsbGJhY2tzLm9uRGF0YSh7XG4gICAgICAgICAgICAgICAgICAgIGFkZHJlc3M6IHJlcy5yZXR1cm5WYWx1ZXMuY29nbml0aXZlSm9iLFxuICAgICAgICAgICAgICAgICAgICBzdG9yZSxcbiAgICAgICAgICAgICAgICAgICAgc3RhdHVzOiAnY3JlYXRlZCcsXG4gICAgICAgICAgICAgICAgICAgIGV2ZW50OiAnUGFuZG9yYS5Db2duaXRpdmVKb2JDcmVhdGVkJ1xuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfSBjYXRjaChlcnIpIHtcbiAgICAgICAgICAgICAgICBjYWxsYmFja3Mub25FcnJvcihlcnIpO1xuICAgICAgICAgICAgfSAgICAgICAgICAgIFxuICAgICAgICB9KVxuICAgICAgICAub24oJ2Vycm9yJywgY2FsbGJhY2tzLm9uRXJyb3IpO1xuXG4gICAgcmV0dXJuIGNoYWluO1xufTtcblxuLyoqXG4gKiBIYW5kbGUgZXZlbnQgU3RhdGVDaGFuZ2VkIGZvciBDb2duaXRpdmVKb2JcbiAqIFxuICogQHBhcmFtIHtzdHJpbmd9IGFkZHJlc3NcbiAqIEBwYXJhbSB7T2JqZWN0fSBjb25maWcgTGlicmFyeSBjb25maWcgKHByb3ZpZGVkIGJ5IHRoZSBwcm94eSBidXQgY2FuIGJlIG92ZXJyaWRkZW4pXG4gKiBAcmV0dXJucyB7T2JqZWN0fSBPYmplY3Qgd2l0aCBjaGFpbmVkIGNhbGxiYWNrcyAjZGF0YSBhbmQgI2Vycm9yXG4gKi9cbmV4cG9ydCBjb25zdCBldmVudENvZ25pdGl2ZUpvYlN0YXRlQ2hhbmdlZCA9IChhZGRyZXNzLCBjb25maWcgPSB7fSkgPT4ge1xuXG4gICAgZXhwZWN0LmFsbCh7IGFkZHJlc3MgfSwge1xuICAgICAgICAnYWRkcmVzcyc6IHtcbiAgICAgICAgICAgIHR5cGU6ICdhZGRyZXNzJ1xuICAgICAgICB9XG4gICAgfSk7XG5cbiAgICBleHBlY3QuYWxsKGNvbmZpZywge1xuICAgICAgICAnd2ViMyc6IHtcbiAgICAgICAgICAgIHR5cGU6ICdvYmplY3QnLFxuICAgICAgICAgICAgY29kZTogV0VCM19SRVFVSVJFRFxuICAgICAgICB9LFxuICAgICAgICAnY29udHJhY3RzLkNvZ25pdGl2ZUpvYi5hYmknOiB7XG4gICAgICAgICAgICB0eXBlOiAnb2JqZWN0JyxcbiAgICAgICAgICAgIGNvZGU6IENPTlRSQUNUX1JFUVVJUkVELFxuICAgICAgICAgICAgYXJnczogWydDb2duaXRpdmVKb2InXVxuICAgICAgICB9XG4gICAgfSk7XG5cbiAgICBjb25zdCBjYWxsYmFja3MgPSB7XG4gICAgICAgIG9uRGF0YTogKCkgPT4ge30sXG4gICAgICAgIG9uRXJyb3I6ICgpID0+IHt9XG4gICAgfTtcblxuICAgIGNvbnN0IGNoYWluID0ge1xuICAgICAgICBkYXRhOiAoY2IgPSAoKSA9PiB7fSkgPT4ge1xuICAgICAgICAgICAgY2FsbGJhY2tzLm9uRGF0YSA9IGNiO1xuICAgICAgICAgICAgcmV0dXJuIGNoYWluO1xuICAgICAgICB9LFxuICAgICAgICBlcnJvcjogKGNiID0gKCkgPT4ge30pID0+IHtcbiAgICAgICAgICAgIGNhbGxiYWNrcy5vbkVycm9yID0gY2I7XG4gICAgICAgICAgICByZXR1cm4gY2hhaW47XG4gICAgICAgIH1cbiAgICB9O1xuXG4gICAgY29uc3QgY29nID0gbmV3IGNvbmZpZy53ZWIzLmV0aC5Db250cmFjdChjb25maWcuY29udHJhY3RzLkNvZ25pdGl2ZUpvYi5hYmksIGFkZHJlc3MpO1xuICAgIGNvZy5ldmVudHMuU3RhdGVDaGFuZ2VkKClcbiAgICAgICAgLm9uKCdkYXRhJywgYXN5bmMgcmVzID0+IHtcblxuICAgICAgICAgICAgdHJ5IHtcblxuICAgICAgICAgICAgICAgIGNvbnN0IHN0b3JlID0gYXdhaXQgZmV0Y2hKb2JTdG9yZShyZXMucmV0dXJuVmFsdWVzLmNvZ25pdGl2ZUpvYik7XG4gICAgICAgICAgICAgICAgY2FsbGJhY2tzLm9uRGF0YSh7XG4gICAgICAgICAgICAgICAgICAgIGFkZHJlc3M6IHJlcy5yZXR1cm5WYWx1ZXMuY29nbml0aXZlSm9iLFxuICAgICAgICAgICAgICAgICAgICBzdG9yZSxcbiAgICAgICAgICAgICAgICAgICAgc3RhdHVzOiAnY2hhbmdlZCcsXG4gICAgICAgICAgICAgICAgICAgIGV2ZW50OiAnQ29nbml0aXZlSm9iLlN0YXRlQ2hhbmdlZCdcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH0gY2F0Y2goZXJyKSB7XG4gICAgICAgICAgICAgICAgY2FsbGJhY2tzLm9uRXJyb3IoZXJyKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSlcbiAgICAgICAgLm9uKCdlcnJvcicsIGNhbGxiYWNrcy5vbkVycm9yKTtcblxuICAgIHJldHVybiBjaGFpbjtcbn07XG4iXX0=