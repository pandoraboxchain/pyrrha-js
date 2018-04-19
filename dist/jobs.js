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
      type: 'string',
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
      type: 'string',
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

const fetchState = async (address, config = {}) => {
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

const fetchKernel = async (address, config = {}) => {
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

const fetchDataset = async (address, config = {}) => {
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

const fetchBatches = async (address, config = {}) => {
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

const fetchProgress = async (address, config = {}) => {
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

const fetchIpfsResults = async (address, config = {}) => {
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
  const ipfsResults = await cog.methods.ipfsResults().call();
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

const fetchJob = async (address, config = {}) => {
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

const fetchJobStore = async (address, config = {}) => {
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
      type: 'string',
      code: _errors.ADDRESS_REQUIRED,
      args: ['Pandora']
    }
  });
  const pan = new config.web3.eth.Contract(config.contracts.Pandora.abi, config.addresses.Pandora);
  pan.methods.createCognitiveJob(kernelAddress, datasetAddress).send({
    from
  }).on('error', reject).on('receipt', receipt => {
    if (Number(receipt.status) === 0) {
      return reject((0, _errors.default)(_errors.TRANSACTION_UNSUCCESSFUL));
    }

    resolve(receipt.contractAddress);
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
      type: 'string',
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9qb2JzLmpzIl0sIm5hbWVzIjpbImZldGNoQWN0aXZlQ291bnQiLCJjb25maWciLCJleHBlY3QiLCJhbGwiLCJ0eXBlIiwiY29kZSIsIldFQjNfUkVRVUlSRUQiLCJDT05UUkFDVF9SRVFVSVJFRCIsImFyZ3MiLCJBRERSRVNTX1JFUVVJUkVEIiwicGFuIiwid2ViMyIsImV0aCIsIkNvbnRyYWN0IiwiY29udHJhY3RzIiwiUGFuZG9yYSIsImFiaSIsImFkZHJlc3NlcyIsImNvdW50IiwibWV0aG9kcyIsImFjdGl2ZUpvYnNDb3VudCIsImNhbGwiLCJOdW1iZXIiLCJwYXJzZUludCIsImZldGNoQWRkcmVzc0J5SWQiLCJpZCIsImpvYkFkZHJlc3MiLCJhY3RpdmVKb2JzIiwiU3RyaW5nIiwiZmV0Y2hTdGF0ZSIsImFkZHJlc3MiLCJjb2ciLCJDb2duaXRpdmVKb2IiLCJzdGF0ZSIsImN1cnJlbnRTdGF0ZSIsImZldGNoS2VybmVsIiwia2VybmVsIiwiZmV0Y2hEYXRhc2V0IiwiZGF0YXNldCIsImZldGNoQmF0Y2hlcyIsImJhdGNoZXMiLCJmZXRjaFByb2dyZXNzIiwicHJvZ3Jlc3MiLCJmZXRjaElwZnNSZXN1bHRzIiwiaXBmc1Jlc3VsdHMiLCJmZXRjaEpvYiIsIlByb21pc2UiLCJqb2JTdGF0dXMiLCJhY3RpdmVXb3JrZXJzQ291bnQiLCJmZXRjaEFsbCIsInJlY29yZHMiLCJlcnJvciIsImkiLCJqb2IiLCJwdXNoIiwiZXJyIiwibWVzc2FnZSIsImZldGNoSm9iU3RvcmUiLCJjcmVhdGUiLCJrZXJuZWxBZGRyZXNzIiwiZGF0YXNldEFkZHJlc3MiLCJmcm9tIiwicmVzb2x2ZSIsInJlamVjdCIsImNyZWF0ZUNvZ25pdGl2ZUpvYiIsInNlbmQiLCJvbiIsInJlY2VpcHQiLCJzdGF0dXMiLCJUUkFOU0FDVElPTl9VTlNVQ0NFU1NGVUwiLCJjb250cmFjdEFkZHJlc3MiLCJldmVudENvZ25pdGl2ZUpvYkNyZWF0ZWQiLCJvcHRpb25zIiwiY2FsbGJhY2tzIiwib25EYXRhIiwib25FcnJvciIsImNoYWluIiwiZGF0YSIsImNiIiwiZXZlbnRzIiwiQ29nbml0aXZlSm9iQ3JlYXRlZCIsInJlcyIsInN0b3JlIiwicmV0dXJuVmFsdWVzIiwiY29nbml0aXZlSm9iIiwiZXZlbnQiLCJldmVudENvZ25pdGl2ZUpvYlN0YXRlQ2hhbmdlZCIsIlN0YXRlQ2hhbmdlZCJdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7Ozs7O0FBU0E7Ozs7Ozs7QUFFQTs7QUFDQTs7QUFPQTs7QUFJQTs7Ozs7Ozs7QUFJQTs7Ozs7O0FBTU8sTUFBTUEsbUJBQW1CLE9BQU9DLFNBQVMsRUFBaEIsS0FBdUI7QUFFbkRDLFNBQU9DLEdBQVAsQ0FBV0YsTUFBWCxFQUFtQjtBQUNmLFlBQVE7QUFDSkcsWUFBTSxRQURGO0FBRUpDLFlBQU1DO0FBRkYsS0FETztBQUtmLDZCQUF5QjtBQUNyQkYsWUFBTSxRQURlO0FBRXJCQyxZQUFNRSx5QkFGZTtBQUdyQkMsWUFBTSxDQUFDLFNBQUQ7QUFIZSxLQUxWO0FBVWYseUJBQXFCO0FBQ2pCSixZQUFNLFFBRFc7QUFFakJDLFlBQU1JLHdCQUZXO0FBR2pCRCxZQUFNLENBQUMsU0FBRDtBQUhXO0FBVk4sR0FBbkI7QUFpQkEsUUFBTUUsTUFBTSxJQUFJVCxPQUFPVSxJQUFQLENBQVlDLEdBQVosQ0FBZ0JDLFFBQXBCLENBQTZCWixPQUFPYSxTQUFQLENBQWlCQyxPQUFqQixDQUF5QkMsR0FBdEQsRUFBMkRmLE9BQU9nQixTQUFQLENBQWlCRixPQUE1RSxDQUFaO0FBQ0EsUUFBTUcsUUFBUSxNQUFNUixJQUFJUyxPQUFKLENBQ2ZDLGVBRGUsR0FFZkMsSUFGZSxFQUFwQjtBQUlBLFNBQU9DLE9BQU9DLFFBQVAsQ0FBZ0JMLEtBQWhCLEVBQXVCLEVBQXZCLENBQVA7QUFDSCxDQXpCTTtBQTJCUDs7Ozs7Ozs7Ozs7QUFPTyxNQUFNTSxtQkFBbUIsT0FBT0MsRUFBUCxFQUFXeEIsU0FBUyxFQUFwQixLQUEyQjtBQUV2REMsU0FBT0MsR0FBUCxDQUFXRixN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QU1pRSxZQUFZO0FBQ2RDLFlBQVEsTUFBTSxDQUFFLENBREY7QUFFZEMsYUFBUyxNQUFNLENBQUU7QUFGSCxHQUFsQjtBQUtBLFFBQU1DLFFBQVE7QUFDVkMsVUFBTSxDQUFDQyxLQUFLLE1BQU0sQ0FBRSxDQUFkLEtBQW1CO0FBQ3JCTCxnQkFBVUMsTUFBVixHQUFtQkksRUFBbkI7QUFDQSxhQUFPRixLQUFQO0FBQ0gsS0FKUztBQUtWekIsV0FBTyxDQUFDMkIsS0FBSyxNQUFNLENBQUUsQ0FBZCxLQUFtQjtBQUN0QkwsZ0JBQVVFLE9BQVYsR0FBb0JHLEVBQXBCO0FBQ0EsYUFBT0YsS0FBUDtBQUNIO0FBUlMsR0FBZDtBQVdBLFFBQU03QyxNQUFNLElBQUk5QixPQUFPVSxJQUFQLENBQVlDLEdBQVosQ0FBZ0JDLFFBQXBCLENBQTZCWixPQUFPYSxTQUFQLENBQWlCa0IsWUFBakIsQ0FBOEJoQixHQUEzRCxFQUFnRWMsT0FBaEUsQ0FBWjtBQUNBQyxNQUFJZ0QsTUFBSixDQUFXUSxZQUFYLEdBQ0tyQixFQURMLENBQ1EsTUFEUixFQUNnQixNQUFNZSxHQUFOLElBQWE7QUFFckIsUUFBSTtBQUVBLFlBQU1DLFFBQVEsTUFBTXpCLGNBQWN3QixJQUFJRSxZQUFKLENBQWlCQyxZQUEvQixDQUFwQjtBQUNBWCxnQkFBVUMsTUFBVixDQUFpQjtBQUNiNUMsaUJBQVNtRCxJQUFJRSxZQUFKLENBQWlCQyxZQURiO0FBRWJGLGFBRmE7QUFHYmQsZ0JBQVEsU0FISztBQUliaUIsZUFBTztBQUpNLE9BQWpCO0FBTUgsS0FURCxDQVNFLE9BQU05QixHQUFOLEVBQVc7QUFDVGtCLGdCQUFVRSxPQUFWLENBQWtCcEIsR0FBbEI7QUFDSDtBQUNKLEdBZkwsRUFnQktXLEVBaEJMLENBZ0JRLE9BaEJSLEVBZ0JpQk8sVUFBVUUsT0FoQjNCO0FBa0JBLFNBQU9DLEtBQVA7QUFDSCxDQWxETSIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogQ29nbml0aXZlIEpvYnMgcmVsYXRlZCBtZXRob2RzXG4gKiBUaGlzIGZpbGUgaXQgaXMgYSBwYXJ0IG9mIHRoZSBQYW5kb3JhIFB5cnJoYSBKYXZhc2NyaXB0IGxpYnJhcnlcbiAqIFxuICogQGZpbGUgam9icy5qc1xuICogQGF1dGhvciBLb3N0aWFudHluIFNteXJub3YgPGtvc3R5c2hAZ21haWwuY29tPlxuICogQGRhdGUgMjAxOFxuICovXG5cbid1c2Ugc3RyaWN0JztcblxuaW1wb3J0ICogYXMgZXhwZWN0IGZyb20gJy4vaGVscGVycy9leHBlY3QnO1xuaW1wb3J0IHBqc0Vycm9yLCB7XG4gICAgQ09OVFJBQ1RfUkVRVUlSRUQsXG4gICAgQUREUkVTU19SRVFVSVJFRCxcbiAgICBXRUIzX1JFUVVJUkVELFxuICAgIFRSQU5TQUNUSU9OX1VOU1VDQ0VTU0ZVTFxufSBmcm9tICcuL2hlbHBlcnMvZXJyb3JzJztcblxuaW1wb3J0IHtcbiAgICBmZXRjaElwZnNBZGRyZXNzIGFzIGZldGNoSXBmc0FkZHJlc3NCeUtlcm5lbEFkZHJlc3Ncbn0gZnJvbSAnLi9rZXJuZWxzJztcblxuaW1wb3J0IHtcbiAgICBmZXRjaERhdGFzZXQgYXMgZmV0Y2hEYXRhc2V0QnlEYXRhc2V0QWRkcmVzc1xufSBmcm9tICcuL2RhdGFzZXRzJztcblxuLyoqXG4gKiBHZXQgYWN0aXZlIGpvYiBjb3VudCBmcm9tIFBhbmRvcmEgY29udHJhY3RcbiAqIFxuICogQHBhcmFtIHtPYmplY3R9IGNvbmZpZyBMaWJyYXJ5IGNvbmZpZyAocHJvdmlkZWQgYnkgdGhlIHByb3h5IGJ1dCBjYW4gYmUgb3ZlcnJpZGRlbilcbiAqIEByZXR1cm5zIHtQcm9taXNlfSBBIFByb21pc2Ugb2JqZWN0IHJlcHJlc2VudHMgdGhlIHtudW1iZXJ9IFxuICovXG5leHBvcnQgY29uc3QgZmV0Y2hBY3RpdmVDb3VudCA9IGFzeW5jIChjb25maWcgPSB7fSkgPT4ge1xuXG4gICAgZXhwZWN0LmFsbChjb25maWcsIHtcbiAgICAgICAgJ3dlYjMnOiB7XG4gICAgICAgICAgICB0eXBlOiAnb2JqZWN0JyxcbiAgICAgICAgICAgIGNvZGU6IFdFQjNfUkVRVUlSRURcbiAgICAgICAgfSxcbiAgICAgICAgJ2NvbnRyYWN0cy5QYW5kb3JhLmFiaSc6IHtcbiAgICAgICAgICAgIHR5cGU6ICdvYmplY3QnLFxuICAgICAgICAgICAgY29kZTogQ09OVFJBQ1RfUkVRVUlSRUQsXG4gICAgICAgICAgICBhcmdzOiBbJ1BhbmRvcmEnXVxuICAgICAgICB9LFxuICAgICAgICAnYWRkcmVzc2VzLlBhbmRvcmEnOiB7XG4gICAgICAgICAgICB0eXBlOiAnc3RyaW5nJyxcbiAgICAgICAgICAgIGNvZGU6IEFERFJFU1NfUkVRVUlSRUQsXG4gICAgICAgICAgICBhcmdzOiBbJ1BhbmRvcmEnXVxuICAgICAgICB9XG4gICAgfSk7XG5cbiAgICBjb25zdCBwYW4gPSBuZXcgY29uZmlnLndlYjMuZXRoLkNvbnRyYWN0KGNvbmZpZy5jb250cmFjdHMuUGFuZG9yYS5hYmksIGNvbmZpZy5hZGRyZXNzZXMuUGFuZG9yYSk7XG4gICAgY29uc3QgY291bnQgPSBhd2FpdCBwYW4ubWV0aG9kc1xuICAgICAgICAuYWN0aXZlSm9ic0NvdW50KClcbiAgICAgICAgLmNhbGwoKTtcbiAgICAgICAgXG4gICAgcmV0dXJuIE51bWJlci5wYXJzZUludChjb3VudCwgMTApO1xufTtcblxuLyoqXG4gKiBHZXQgd29ya2VyIGJ5IHRoZSB3b3JrZXIncyBpZFxuICogXG4gKiBAcGFyYW0ge2ludGVnZXJ9IGlkIFxuICogQHBhcmFtIHtPYmplY3R9IGNvbmZpZyBMaWJyYXJ5IGNvbmZpZyAocHJvdmlkZWQgYnkgdGhlIHByb3h5IGJ1dCBjYW4gYmUgb3ZlcnJpZGRlbilcbiAqIEByZXR1cm5zIHtQcm9taXNlfSBBIFByb21pc2Ugb2JqZWN0IHJlcHJlc2VudHMgdGhlIHtzdHJpbmd9XG4gKi9cbmV4cG9ydCBjb25zdCBmZXRjaEFkZHJlc3NCeUlkID0gYXN5bmMgKGlkLCBjb25maWcgPSB7fSkgPT4ge1xuXG4gICAgZXhwZWN0LmFsbChjb25maWcsIHtcbiAgICAgICAgJ3dlYjMnOiB7XG4gICAgICAgICAgICB0eXBlOiAnb2JqZWN0JyxcbiAgICAgICAgICAgIGNvZGU6IFdFQjNfUkVRVUlSRURcbiAgICAgICAgfSxcbiAgICAgICAgJ2NvbnRyYWN0cy5QYW5kb3JhLmFiaSc6IHtcbiAgICAgICAgICAgIHR5cGU6ICdvYmplY3QnLFxuICAgICAgICAgICAgY29kZTogQ09OVFJBQ1RfUkVRVUlSRUQsXG4gICAgICAgICAgICBhcmdzOiBbJ1BhbmRvcmEnXVxuICAgICAgICB9LFxuICAgICAgICAnYWRkcmVzc2VzLlBhbmRvcmEnOiB7XG4gICAgICAgICAgICB0eXBlOiAnc3RyaW5nJyxcbiAgICAgICAgICAgIGNvZGU6IEFERFJFU1NfUkVRVUlSRUQsXG4gICAgICAgICAgICBhcmdzOiBbJ1BhbmRvcmEnXVxuICAgICAgICB9XG4gICAgfSk7XG5cbiAgICBjb25zdCBwYW4gPSBuZXcgY29uZmlnLndlYjMuZXRoLkNvbnRyYWN0KGNvbmZpZy5jb250cmFjdHMuUGFuZG9yYS5hYmksIGNvbmZpZy5hZGRyZXNzZXMuUGFuZG9yYSk7XG4gICAgY29uc3Qgam9iQWRkcmVzcyA9IGF3YWl0IHBhbi5tZXRob2RzXG4gICAgICAgIC5hY3RpdmVKb2JzKGlkKVxuICAgICAgICAuY2FsbCgpO1xuXG4gICAgcmV0dXJuIFN0cmluZyhqb2JBZGRyZXNzKTtcbn07XG5cbi8qKlxuICogR2V0IGpvYiBzdGF0ZSBmcm9tIENvZ25pdGl2ZSBKb2IgY29udHJhY3QgYnkgdGhlIGpvYiBhZGRyZXNzXG4gKiBcbiAqIEBwYXJhbSB7c3RyaW5nfSBhZGRyZXNzIFxuICogQHBhcmFtIHtPYmplY3R9IGNvbmZpZyBMaWJyYXJ5IGNvbmZpZyAocHJvdmlkZWQgYnkgdGhlIHByb3h5IGJ1dCBjYW4gYmUgb3ZlcnJpZGRlbilcbiAqIEByZXR1cm5zIHtQcm9taXNlfSBBIFByb21pc2Ugb2JqZWN0IHJlcHJlc2VudHMgdGhlIHtpbnRlZ2VyfSBcbiAqL1xuZXhwb3J0IGNvbnN0IGZldGNoU3RhdGUgPSBhc3luYyAoYWRkcmVzcywgY29uZmlnID0ge30pID0+IHtcblxuICAgIGV4cGVjdC5hbGwoY29uZmlnLCB7XG4gICAgICAgICd3ZWIzJzoge1xuICAgICAgICAgICAgdHlwZTogJ29iamVjdCcsXG4gICAgICAgICAgICBjb2RlOiBXRUIzX1JFUVVJUkVEXG4gICAgICAgIH0sXG4gICAgICAgICdjb250cmFjdHMuQ29nbml0aXZlSm9iLmFiaSc6IHtcbiAgICAgICAgICAgIHR5cGU6ICdvYmplY3QnLFxuICAgICAgICAgICAgY29kZTogQ09OVFJBQ1RfUkVRVUlSRUQsXG4gICAgICAgICAgICBhcmdzOiBbJ0NvZ25pdGl2ZUpvYiddXG4gICAgICAgIH1cbiAgICB9KTtcblxuICAgIGNvbnN0IGNvZyA9IG5ldyBjb25maWcud2ViMy5ldGguQ29udHJhY3QoY29uZmlnLmNvbnRyYWN0cy5Db2duaXRpdmVKb2IuYWJpLCBhZGRyZXNzKTtcbiAgICBjb25zdCBzdGF0ZSA9IGF3YWl0IGNvZy5tZXRob2RzXG4gICAgICAgIC5jdXJyZW50U3RhdGUoKVxuICAgICAgICAuY2FsbCgpO1xuXG4gICAgcmV0dXJuIE51bWJlci5wYXJzZUludChzdGF0ZSwgMTApO1xufTtcblxuLyoqXG4gKiBHZXQgam9iIGtlcm5lbCBmcm9tIENvZ25pdGl2ZSBKb2IgY29udHJhY3QgYnkgdGhlIGpvYiBhZGRyZXNzXG4gKiBcbiAqIEBwYXJhbSB7c3RyaW5nfSBhZGRyZXNzIFxuICogQHBhcmFtIHtPYmplY3R9IGNvbmZpZyBMaWJyYXJ5IGNvbmZpZyAocHJvdmlkZWQgYnkgdGhlIHByb3h5IGJ1dCBjYW4gYmUgb3ZlcnJpZGRlbilcbiAqIEByZXR1cm5zIHtQcm9taXNlfSBBIFByb21pc2Ugb2JqZWN0IHJlcHJlc2VudHMgdGhlIHtzdHJpbmd9IFxuICovXG5leHBvcnQgY29uc3QgZmV0Y2hLZXJuZWwgPSBhc3luYyAoYWRkcmVzcywgY29uZmlnID0ge30pID0+IHtcblxuICAgIGV4cGVjdC5hbGwoY29uZmlnLCB7XG4gICAgICAgICd3ZWIzJzoge1xuICAgICAgICAgICAgdHlwZTogJ29iamVjdCcsXG4gICAgICAgICAgICBjb2RlOiBXRUIzX1JFUVVJUkVEXG4gICAgICAgIH0sXG4gICAgICAgICdjb250cmFjdHMuQ29nbml0aXZlSm9iLmFiaSc6IHtcbiAgICAgICAgICAgIHR5cGU6ICdvYmplY3QnLFxuICAgICAgICAgICAgY29kZTogQ09OVFJBQ1RfUkVRVUlSRUQsXG4gICAgICAgICAgICBhcmdzOiBbJ0NvZ25pdGl2ZUpvYiddXG4gICAgICAgIH1cbiAgICB9KTtcblxuICAgIGNvbnN0IGNvZyA9IG5ldyBjb25maWcud2ViMy5ldGguQ29udHJhY3QoY29uZmlnLmNvbnRyYWN0cy5Db2duaXRpdmVKb2IuYWJpLCBhZGRyZXNzKTtcbiAgICBjb25zdCBrZXJuZWwgPSBhd2FpdCBjb2cubWV0aG9kc1xuICAgICAgICAua2VybmVsKClcbiAgICAgICAgLmNhbGwoKTtcblxuICAgIHJldHVybiBTdHJpbmcoa2VybmVsKTtcbn07XG5cbi8qKlxuICogR2V0IGpvYiBkYXRhc2V0IGZyb20gQ29nbml0aXZlIEpvYiBjb250cmFjdCBieSB0aGUgam9iIGFkZHJlc3NcbiAqIFxuICogQHBhcmFtIHtzdHJpbmd9IGFkZHJlc3MgXG4gKiBAcGFyYW0ge09iamVjdH0gY29uZmlnIExpYnJhcnkgY29uZmlnIChwcm92aWRlZCBieSB0aGUgcHJveHkgYnV0IGNhbiBiZSBvdmVycmlkZGVuKVxuICogQHJldHVybnMge1Byb21pc2V9IEEgUHJvbWlzZSBvYmplY3QgcmVwcmVzZW50cyB0aGUge3N0cmluZ30gXG4gKi9cbmV4cG9ydCBjb25zdCBmZXRjaERhdGFzZXQgPSBhc3luYyAoYWRkcmVzcywgY29uZmlnID0ge30pID0+IHtcblxuICAgIGV4cGVjdC5hbGwoY29uZmlnLCB7XG4gICAgICAgICd3ZWIzJzoge1xuICAgICAgICAgICAgdHlwZTogJ29iamVjdCcsXG4gICAgICAgICAgICBjb2RlOiBXRUIzX1JFUVVJUkVEXG4gICAgICAgIH0sXG4gICAgICAgICdjb250cmFjdHMuQ29nbml0aXZlSm9iLmFiaSc6IHtcbiAgICAgICAgICAgIHR5cGU6ICdvYmplY3QnLFxuICAgICAgICAgICAgY29kZTogQ09OVFJBQ1RfUkVRVUlSRUQsXG4gICAgICAgICAgICBhcmdzOiBbJ0NvZ25pdGl2ZUpvYiddXG4gICAgICAgIH1cbiAgICB9KTtcblxuICAgIGNvbnN0IGNvZyA9IG5ldyBjb25maWcud2ViMy5ldGguQ29udHJhY3QoY29uZmlnLmNvbnRyYWN0cy5Db2duaXRpdmVKb2IuYWJpLCBhZGRyZXNzKTtcbiAgICBjb25zdCBkYXRhc2V0ID0gYXdhaXQgY29nLm1ldGhvZHNcbiAgICAgICAgLmRhdGFzZXQoKVxuICAgICAgICAuY2FsbCgpO1xuXG4gICAgcmV0dXJuIFN0cmluZyhkYXRhc2V0KTtcbn07XG5cbi8qKlxuICogR2V0IGpvYiBiYXRjaGVzIGNvdW50IGZyb20gQ29nbml0aXZlIEpvYiBjb250cmFjdCBieSB0aGUgam9iIGFkZHJlc3NcbiAqIFxuICogQHBhcmFtIHtzdHJpbmd9IGFkZHJlc3MgXG4gKiBAcGFyYW0ge09iamVjdH0gY29uZmlnIExpYnJhcnkgY29uZmlnIChwcm92aWRlZCBieSB0aGUgcHJveHkgYnV0IGNhbiBiZSBvdmVycmlkZGVuKVxuICogQHJldHVybnMge1Byb21pc2V9IEEgUHJvbWlzZSBvYmplY3QgcmVwcmVzZW50cyB0aGUge251bWJlcn0gXG4gKi9cbmV4cG9ydCBjb25zdCBmZXRjaEJhdGNoZXMgPSBhc3luYyAoYWRkcmVzcywgY29uZmlnID0ge30pID0+IHtcblxuICAgIGV4cGVjdC5hbGwoY29uZmlnLCB7XG4gICAgICAgICd3ZWIzJzoge1xuICAgICAgICAgICAgdHlwZTogJ29iamVjdCcsXG4gICAgICAgICAgICBjb2RlOiBXRUIzX1JFUVVJUkVEXG4gICAgICAgIH0sXG4gICAgICAgICdjb250cmFjdHMuQ29nbml0aXZlSm9iLmFiaSc6IHtcbiAgICAgICAgICAgIHR5cGU6ICdvYmplY3QnLFxuICAgICAgICAgICAgY29kZTogQ09OVFJBQ1RfUkVRVUlSRUQsXG4gICAgICAgICAgICBhcmdzOiBbJ0NvZ25pdGl2ZUpvYiddXG4gICAgICAgIH1cbiAgICB9KTtcblxuICAgIGNvbnN0IGNvZyA9IG5ldyBjb25maWcud2ViMy5ldGguQ29udHJhY3QoY29uZmlnLmNvbnRyYWN0cy5Db2duaXRpdmVKb2IuYWJpLCBhZGRyZXNzKTtcbiAgICBjb25zdCBiYXRjaGVzID0gYXdhaXQgY29nLm1ldGhvZHNcbiAgICAgICAgLmJhdGNoZXMoKVxuICAgICAgICAuY2FsbCgpO1xuXG4gICAgcmV0dXJuIE51bWJlci5wYXJzZUludChiYXRjaGVzLCAxMCk7XG59O1xuXG4vKipcbiAqIEdldCBqb2IgcHJvZ3Jlc3MgZnJvbSBDb2duaXRpdmUgSm9iIGNvbnRyYWN0IGJ5IHRoZSBqb2IgYWRkcmVzc1xuICogXG4gKiBAcGFyYW0ge3N0cmluZ30gYWRkcmVzcyBcbiAqIEBwYXJhbSB7T2JqZWN0fSBjb25maWcgTGlicmFyeSBjb25maWcgKHByb3ZpZGVkIGJ5IHRoZSBwcm94eSBidXQgY2FuIGJlIG92ZXJyaWRkZW4pXG4gKiBAcmV0dXJucyB7UHJvbWlzZX0gQSBQcm9taXNlIG9iamVjdCByZXByZXNlbnRzIHRoZSB7bnVtYmVyfSBcbiAqL1xuZXhwb3J0IGNvbnN0IGZldGNoUHJvZ3Jlc3MgPSBhc3luYyAoYWRkcmVzcywgY29uZmlnID0ge30pID0+IHtcblxuICAgIGV4cGVjdC5hbGwoY29uZmlnLCB7XG4gICAgICAgICd3ZWIzJzoge1xuICAgICAgICAgICAgdHlwZTogJ29iamVjdCcsXG4gICAgICAgICAgICBjb2RlOiBXRUIzX1JFUVVJUkVEXG4gICAgICAgIH0sXG4gICAgICAgICdjb250cmFjdHMuQ29nbml0aXZlSm9iLmFiaSc6IHtcbiAgICAgICAgICAgIHR5cGU6ICdvYmplY3QnLFxuICAgICAgICAgICAgY29kZTogQ09OVFJBQ1RfUkVRVUlSRUQsXG4gICAgICAgICAgICBhcmdzOiBbJ0NvZ25pdGl2ZUpvYiddXG4gICAgICAgIH1cbiAgICB9KTtcblxuICAgIGNvbnN0IGNvZyA9IG5ldyBjb25maWcud2ViMy5ldGguQ29udHJhY3QoY29uZmlnLmNvbnRyYWN0cy5Db2duaXRpdmVKb2IuYWJpLCBhZGRyZXNzKTtcbiAgICBjb25zdCBwcm9ncmVzcyA9IGF3YWl0IGNvZy5tZXRob2RzXG4gICAgICAgIC5wcm9ncmVzcygpXG4gICAgICAgIC5jYWxsKCk7XG5cbiAgICByZXR1cm4gTnVtYmVyLnBhcnNlSW50KHByb2dyZXNzLCAxMCk7XG59O1xuXG4vKipcbiAqIEdldCBqb2IncyBpcGZzUmVzdWx0cyBmcm9tIENvZ25pdGl2ZSBKb2IgY29udHJhY3QgYnkgdGhlIGpvYiBhZGRyZXNzXG4gKiBcbiAqIEBwYXJhbSB7c3RyaW5nfSBhZGRyZXNzIFxuICogQHBhcmFtIHtPYmplY3R9IGNvbmZpZyBMaWJyYXJ5IGNvbmZpZyAocHJvdmlkZWQgYnkgdGhlIHByb3h5IGJ1dCBjYW4gYmUgb3ZlcnJpZGRlbilcbiAqIEByZXR1cm5zIHtQcm9taXNlfSBBIFByb21pc2Ugb2JqZWN0IHJlcHJlc2VudHMgdGhlIHtzdHJpbmdbXX0gXG4gKi9cbmV4cG9ydCBjb25zdCBmZXRjaElwZnNSZXN1bHRzID0gYXN5bmMgKGFkZHJlc3MsIGNvbmZpZyA9IHt9KSA9PiB7XG5cbiAgICBleHBlY3QuYWxsKGNvbmZpZywge1xuICAgICAgICAnd2ViMyc6IHtcbiAgICAgICAgICAgIHR5cGU6ICdvYmplY3QnLFxuICAgICAgICAgICAgY29kZTogV0VCM19SRVFVSVJFRFxuICAgICAgICB9LFxuICAgICAgICAnY29udHJhY3RzLkNvZ25pdGl2ZUpvYi5hYmknOiB7XG4gICAgICAgICAgICB0eXBlOiAnb2JqZWN0JyxcbiAgICAgICAgICAgIGNvZGU6IENPTlRSQUNUX1JFUVVJUkVELFxuICAgICAgICAgICAgYXJnczogWydDb2duaXRpdmVKb2InXVxuICAgICAgICB9XG4gICAgfSk7XG5cbiAgICBjb25zdCBjb2cgPSBuZXcgY29uZmlnLndlYjMuZXRoLkNvbnRyYWN0KGNvbmZpZy5jb250cmFjdHMuQ29nbml0aXZlSm9iLmFiaSwgYWRkcmVzcyk7XG4gICAgY29uc3QgaXBmc1Jlc3VsdHMgPSBhd2FpdCBjb2cubWV0aG9kc1xuICAgICAgICAuaXBmc1Jlc3VsdHMoKVxuICAgICAgICAuY2FsbCgpO1xuXG4gICAgcmV0dXJuIGlwZnNSZXN1bHRzO1xufTtcblxuLyoqXG4gKiBHZXQgam9iIGJ5IHRoZSBqb2IgYWRkcmVzc1xuICogXG4gKiBAcGFyYW0ge3N0cmluZ30gYWRkcmVzcyBcbiAqIEBwYXJhbSB7T2JqZWN0fSBjb25maWcgTGlicmFyeSBjb25maWcgKHByb3ZpZGVkIGJ5IHRoZSBwcm94eSBidXQgY2FuIGJlIG92ZXJyaWRkZW4pXG4gKiBAcmV0dXJucyB7UHJvbWlzZX0gQSBQcm9taXNlIG9iamVjdCByZXByZXNlbnRzIHRoZSB7T2JqZWN0fSBcbiAqL1xuZXhwb3J0IGNvbnN0IGZldGNoSm9iID0gYXN5bmMgKGFkZHJlc3MsIGNvbmZpZyA9IHt9KSA9PiB7XG5cbiAgICBjb25zdCBbXG4gICAgICAgIHN0YXRlLFxuICAgICAgICBrZXJuZWwsXG4gICAgICAgIGRhdGFzZXQsXG4gICAgICAgIGJhdGNoZXMsXG4gICAgICAgIHByb2dyZXNzLFxuICAgICAgICBpcGZzUmVzdWx0c1xuICAgIF0gPSBhd2FpdCBQcm9taXNlLmFsbChbXG4gICAgICAgIGZldGNoU3RhdGUoYWRkcmVzcywgY29uZmlnKSxcbiAgICAgICAgZmV0Y2hLZXJuZWwoYWRkcmVzcywgY29uZmlnKSxcbiAgICAgICAgZmV0Y2hEYXRhc2V0KGFkZHJlc3MsIGNvbmZpZyksXG4gICAgICAgIGZldGNoQmF0Y2hlcyhhZGRyZXNzLCBjb25maWcpLFxuICAgICAgICBmZXRjaFByb2dyZXNzKGFkZHJlc3MsIGNvbmZpZyksXG4gICAgICAgIGZldGNoSXBmc1Jlc3VsdHMoYWRkcmVzcywgY29uZmlnKVxuICAgIF0pO1xuICAgIFxuICAgIHJldHVybiB7XG4gICAgICAgIGFkZHJlc3M6IGFkZHJlc3MsXG4gICAgICAgIGpvYlN0YXR1czogc3RhdGUsXG4gICAgICAgIGtlcm5lbDoga2VybmVsLFxuICAgICAgICBkYXRhc2V0OiBkYXRhc2V0LFxuICAgICAgICBiYXRjaGVzOiBiYXRjaGVzLFxuICAgICAgICBwcm9ncmVzczogcHJvZ3Jlc3MsXG4gICAgICAgIGlwZnNSZXN1bHRzOiBpcGZzUmVzdWx0cyxcbiAgICAgICAgYWN0aXZlV29ya2Vyc0NvdW50OiBiYXRjaGVzXG4gICAgfTtcbn07XG5cbi8qKlxuICogR2V0IGFsbCBqb2JzXG4gKiBcbiAqIEBwYXJhbSB7T2JqZWN0fSBjb25maWcgTGlicmFyeSBjb25maWcgKHByb3ZpZGVkIGJ5IHRoZSBwcm94eSBidXQgY2FuIGJlIG92ZXJyaWRkZW4pXG4gKiBAcmV0dXJucyB7UHJvbWlzZX0gQSBQcm9taXNlIG9iamVjdCByZXByZXNlbnRzIHRoZSB7T2JqZWN0W119IFxuICovXG5leHBvcnQgY29uc3QgZmV0Y2hBbGwgPSBhc3luYyAoY29uZmlnID0ge30pID0+IHtcbiAgICBsZXQgcmVjb3JkcyA9IFtdO1xuICAgIGxldCBlcnJvciA9IFtdO1xuXG4gICAgdHJ5IHtcblxuICAgICAgICBjb25zdCBjb3VudCA9IGF3YWl0IGZldGNoQWN0aXZlQ291bnQoY29uZmlnKTsgICAgXG5cbiAgICAgICAgZm9yIChsZXQgaT0wOyBpIDwgY291bnQ7IGkrKykge1xuICAgICAgICAgICAgXG4gICAgICAgICAgICBjb25zdCBhZGRyZXNzID0gYXdhaXQgZmV0Y2hBZGRyZXNzQnlJZChpLCBjb25maWcpO1xuXG4gICAgICAgICAgICB0cnkge1xuXG4gICAgICAgICAgICAgICAgY29uc3Qgam9iID0gYXdhaXQgZmV0Y2hKb2IoYWRkcmVzcywgY29uZmlnKTtcblxuICAgICAgICAgICAgICAgIHJlY29yZHMucHVzaCh7XG4gICAgICAgICAgICAgICAgICAgIGlkOiBpLFxuICAgICAgICAgICAgICAgICAgICAuLi5qb2JcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH0gY2F0Y2goZXJyKSB7XG4gICAgICAgICAgICAgICAgZXJyb3IucHVzaCh7XG4gICAgICAgICAgICAgICAgICAgIGFkZHJlc3MsXG4gICAgICAgICAgICAgICAgICAgIG1lc3NhZ2U6IGVyci5tZXNzYWdlXG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9ICAgICAgICBcbiAgICAgICAgfVxuICAgIH0gY2F0Y2goZXJyKSB7XG4gICAgICAgIGVycm9yLnB1c2goe1xuICAgICAgICAgICAgZXJyb3I6IGVyci5tZXNzYWdlXG4gICAgICAgIH0pO1xuICAgIH0gICBcblxuICAgIHJldHVybiB7XG4gICAgICAgIHJlY29yZHMsXG4gICAgICAgIGVycm9yXG4gICAgfTtcbn07XG5cbi8qKlxuICogR2V0IGpvYiBzdG9yZVxuICogXG4gKiBAcGFyYW0ge3N0cmluZ30gYWRkcmVzcyBcbiAqIEBwYXJhbSB7T2JqZWN0fSBjb25maWcgTGlicmFyeSBjb25maWcgKHByb3ZpZGVkIGJ5IHRoZSBwcm94eSBidXQgY2FuIGJlIG92ZXJyaWRkZW4pXG4gKiBAcmV0dXJucyB7UHJvbWlzZX0gQSBQcm9taXNlIG9iamVjdCByZXByZXNlbnRzIHRoZSB7T2JqZWN0fSBcbiAqL1xuZXhwb3J0IGNvbnN0IGZldGNoSm9iU3RvcmUgPSBhc3luYyAoYWRkcmVzcywgY29uZmlnID0ge30pID0+IHtcblxuICAgIGNvbnN0IGpvYiA9IGF3YWl0IGZldGNoSm9iKGFkZHJlc3MsIGNvbmZpZyk7XG5cbiAgICBjb25zdCBbXG4gICAgICAgIGtlcm5lbCxcbiAgICAgICAgZGF0YXNldFxuICAgIF0gPSBhd2FpdCBQcm9taXNlLmFsbChbXG4gICAgICAgIGZldGNoSXBmc0FkZHJlc3NCeUtlcm5lbEFkZHJlc3Moam9iLmtlcm5lbCwgY29uZmlnKSxcbiAgICAgICAgZmV0Y2hEYXRhc2V0QnlEYXRhc2V0QWRkcmVzcyhqb2IuZGF0YXNldCwgY29uZmlnKVxuICAgIF0pO1xuICAgIFxuICAgIHJldHVybiB7XG4gICAgICAgIGpvYixcbiAgICAgICAga2VybmVsLFxuICAgICAgICBkYXRhc2V0XG4gICAgfTtcbn07XG5cbi8qKlxuICogQ3JlYXRlIGNvZ25pdGl2ZSBqb2IgY29udHJhY3RcbiAqIFxuICogQHBhcmFtIHtTdHJpbmd9IGtlcm5lbEFkZHJlc3MgXG4gKiBAcGFyYW0ge1N0cmluZ30gZGF0YXNldEFkZHJlc3MgXG4gKiBAcGFyYW0ge1N0cmluZ30gZnJvbVxuICogQHBhcmFtIHtPYmplY3R9IGNvbmZpZyBMaWJyYXJ5IGNvbmZpZyAocHJvdmlkZWQgYnkgdGhlIHByb3h5IGJ1dCBjYW4gYmUgb3ZlcnJpZGRlbilcbiAqIEByZXR1cm5zIHtQcm9taXNlfSBQcm9taXNlIG9iamVjdCByZXNvbHZlZCB0byBhZGQgc3RhdHVzIChib29sZWFuKVxuICovXG5leHBvcnQgY29uc3QgY3JlYXRlID0gKGtlcm5lbEFkZHJlc3MsIGRhdGFzZXRBZGRyZXNzLCBmcm9tLCBjb25maWcgPSB7fSkgPT4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuXG4gICAgZXhwZWN0LmFsbChjb25maWcsIHtcbiAgICAgICAgJ3dlYjMnOiB7XG4gICAgICAgICAgICB0eXBlOiAnb2JqZWN0JyxcbiAgICAgICAgICAgIGNvZGU6IFdFQjNfUkVRVUlSRURcbiAgICAgICAgfSxcbiAgICAgICAgJ2NvbnRyYWN0cy5QYW5kb3JhLmFiaSc6IHtcbiAgICAgICAgICAgIHR5cGU6ICdvYmplY3QnLFxuICAgICAgICAgICAgY29kZTogQ09OVFJBQ1RfUkVRVUlSRUQsXG4gICAgICAgICAgICBhcmdzOiBbJ1BhbmRvcmEnXVxuICAgICAgICB9LFxuICAgICAgICAnYWRkcmVzc2VzLlBhbmRvcmEnOiB7XG4gICAgICAgICAgICB0eXBlOiAnc3RyaW5nJyxcbiAgICAgICAgICAgIGNvZGU6IEFERFJFU1NfUkVRVUlSRUQsXG4gICAgICAgICAgICBhcmdzOiBbJ1BhbmRvcmEnXVxuICAgICAgICB9XG4gICAgfSk7XG5cbiAgICBjb25zdCBwYW4gPSBuZXcgY29uZmlnLndlYjMuZXRoLkNvbnRyYWN0KGNvbmZpZy5jb250cmFjdHMuUGFuZG9yYS5hYmksIGNvbmZpZy5hZGRyZXNzZXMuUGFuZG9yYSk7XG4gICAgcGFuLm1ldGhvZHNcbiAgICAgICAgLmNyZWF0ZUNvZ25pdGl2ZUpvYihrZXJuZWxBZGRyZXNzLCBkYXRhc2V0QWRkcmVzcylcbiAgICAgICAgLnNlbmQoe1xuICAgICAgICAgICAgZnJvbVxuICAgICAgICB9KVxuICAgICAgICAub24oJ2Vycm9yJywgcmVqZWN0KVxuICAgICAgICAub24oJ3JlY2VpcHQnLCByZWNlaXB0ID0+IHtcblxuICAgICAgICAgICAgaWYgKE51bWJlcihyZWNlaXB0LnN0YXR1cykgPT09IDApIHtcblxuICAgICAgICAgICAgICAgIHJldHVybiByZWplY3QocGpzRXJyb3IoVFJBTlNBQ1RJT05fVU5TVUNDRVNTRlVMKSk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHJlc29sdmUocmVjZWlwdC5jb250cmFjdEFkZHJlc3MpO1xuICAgICAgICB9KTtcbn0pO1xuXG4vKipcbiAqIEhhbmRsZSBldmVudCBDb2duaXRpdmVKb2JDcmVhdGVkXG4gKiBcbiAqIEBwYXJhbSB7T2JqZWN0fSBvcHRpb25zIEV2ZW50IGhhbmRsZXIgb3B0aW9uc1xuICogQHBhcmFtIHtPYmplY3R9IGNvbmZpZyBMaWJyYXJ5IGNvbmZpZyAocHJvdmlkZWQgYnkgdGhlIHByb3h5IGJ1dCBjYW4gYmUgb3ZlcnJpZGRlbilcbiAqIEByZXR1cm5zIHtPYmplY3R9IE9iamVjdCB3aXRoIGNoYWluZWQgY2FsbGJhY2tzICNkYXRhIGFuZCAjZXJyb3JcbiAqL1xuZXhwb3J0IGNvbnN0IGV2ZW50Q29nbml0aXZlSm9iQ3JlYXRlZCA9IChvcHRpb25zID0ge30sIGNvbmZpZyA9IHt9KSA9PiB7XG5cbiAgICBleHBlY3QuYWxsKGNvbmZpZywge1xuICAgICAgICAnd2ViMyc6IHtcbiAgICAgICAgICAgIHR5cGU6ICdvYmplY3QnLFxuICAgICAgICAgICAgY29kZTogV0VCM19SRVFVSVJFRFxuICAgICAgICB9LFxuICAgICAgICAnY29udHJhY3RzLlBhbmRvcmEuYWJpJzoge1xuICAgICAgICAgICAgdHlwZTogJ29iamVjdCcsXG4gICAgICAgICAgICBjb2RlOiBDT05UUkFDVF9SRVFVSVJFRCxcbiAgICAgICAgICAgIGFyZ3M6IFsnUGFuZG9yYSddXG4gICAgICAgIH0sXG4gICAgICAgICdhZGRyZXNzZXMuUGFuZG9yYSc6IHtcbiAgICAgICAgICAgIHR5cGU6ICdzdHJpbmcnLFxuICAgICAgICAgICAgY29kZTogQUREUkVTU19SRVFVSVJFRCxcbiAgICAgICAgICAgIGFyZ3M6IFsnUGFuZG9yYSddXG4gICAgICAgIH1cbiAgICB9KTtcblxuICAgIGNvbnN0IGNhbGxiYWNrcyA9IHtcbiAgICAgICAgb25EYXRhOiAoKSA9PiB7fSxcbiAgICAgICAgb25FcnJvcjogKCkgPT4ge31cbiAgICB9O1xuXG4gICAgY29uc3QgY2hhaW4gPSB7XG4gICAgICAgIGRhdGE6IChjYiA9ICgpID0+IHt9KSA9PiB7XG4gICAgICAgICAgICBjYWxsYmFja3Mub25EYXRhID0gY2I7XG4gICAgICAgICAgICByZXR1cm4gY2hhaW47XG4gICAgICAgIH0sXG4gICAgICAgIGVycm9yOiAoY2IgPSAoKSA9PiB7fSkgPT4ge1xuICAgICAgICAgICAgY2FsbGJhY2tzLm9uRXJyb3IgPSBjYjtcbiAgICAgICAgICAgIHJldHVybiBjaGFpbjtcbiAgICAgICAgfVxuICAgIH07XG5cbiAgICBjb25zdCBwYW4gPSBuZXcgY29uZmlnLndlYjMuZXRoLkNvbnRyYWN0KGNvbmZpZy5jb250cmFjdHMuUGFuZG9yYS5hYmksIGNvbmZpZy5hZGRyZXNzZXMuUGFuZG9yYSk7XG4gICAgcGFuLmV2ZW50cy5Db2duaXRpdmVKb2JDcmVhdGVkKG9wdGlvbnMpXG4gICAgICAgIC5vbignZGF0YScsIGFzeW5jIHJlcyA9PiB7XG5cbiAgICAgICAgICAgIHRyeSB7XG5cbiAgICAgICAgICAgICAgICBjb25zdCBzdG9yZSA9IGF3YWl0IGZldGNoSm9iU3RvcmUocmVzLnJldHVyblZhbHVlcy5jb2duaXRpdmVKb2IpO1xuICAgICAgICAgICAgICAgIGNhbGxiYWNrcy5vbkRhdGEoe1xuICAgICAgICAgICAgICAgICAgICBhZGRyZXNzOiByZXMucmV0dXJuVmFsdWVzLmNvZ25pdGl2ZUpvYixcbiAgICAgICAgICAgICAgICAgICAgc3RvcmUsXG4gICAgICAgICAgICAgICAgICAgIHN0YXR1czogJ2NyZWF0ZWQnLFxuICAgICAgICAgICAgICAgICAgICBldmVudDogJ1BhbmRvcmEuQ29nbml0aXZlSm9iQ3JlYXRlZCdcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH0gY2F0Y2goZXJyKSB7XG4gICAgICAgICAgICAgICAgY2FsbGJhY2tzLm9uRXJyb3IoZXJyKTtcbiAgICAgICAgICAgIH0gICAgICAgICAgICBcbiAgICAgICAgfSlcbiAgICAgICAgLm9uKCdlcnJvcicsIGNhbGxiYWNrcy5vbkVycm9yKTtcblxuICAgIHJldHVybiBjaGFpbjtcbn07XG5cbi8qKlxuICogSGFuZGxlIGV2ZW50IFN0YXRlQ2hhbmdlZCBmb3IgQ29nbml0aXZlSm9iXG4gKiBcbiAqIEBwYXJhbSB7c3RyaW5nfSBhZGRyZXNzXG4gKiBAcGFyYW0ge09iamVjdH0gY29uZmlnIExpYnJhcnkgY29uZmlnIChwcm92aWRlZCBieSB0aGUgcHJveHkgYnV0IGNhbiBiZSBvdmVycmlkZGVuKVxuICogQHJldHVybnMge09iamVjdH0gT2JqZWN0IHdpdGggY2hhaW5lZCBjYWxsYmFja3MgI2RhdGEgYW5kICNlcnJvclxuICovXG5leHBvcnQgY29uc3QgZXZlbnRDb2duaXRpdmVKb2JTdGF0ZUNoYW5nZWQgPSAoYWRkcmVzcywgY29uZmlnID0ge30pID0+IHtcblxuICAgIGV4cGVjdC5hbGwoY29uZmlnLCB7XG4gICAgICAgICd3ZWIzJzoge1xuICAgICAgICAgICAgdHlwZTogJ29iamVjdCcsXG4gICAgICAgICAgICBjb2RlOiBXRUIzX1JFUVVJUkVEXG4gICAgICAgIH0sXG4gICAgICAgICdjb250cmFjdHMuQ29nbml0aXZlSm9iLmFiaSc6IHtcbiAgICAgICAgICAgIHR5cGU6ICdvYmplY3QnLFxuICAgICAgICAgICAgY29kZTogQ09OVFJBQ1RfUkVRVUlSRUQsXG4gICAgICAgICAgICBhcmdzOiBbJ0NvZ25pdGl2ZUpvYiddXG4gICAgICAgIH1cbiAgICB9KTtcblxuICAgIGNvbnN0IGNhbGxiYWNrcyA9IHtcbiAgICAgICAgb25EYXRhOiAoKSA9PiB7fSxcbiAgICAgICAgb25FcnJvcjogKCkgPT4ge31cbiAgICB9O1xuXG4gICAgY29uc3QgY2hhaW4gPSB7XG4gICAgICAgIGRhdGE6IChjYiA9ICgpID0+IHt9KSA9PiB7XG4gICAgICAgICAgICBjYWxsYmFja3Mub25EYXRhID0gY2I7XG4gICAgICAgICAgICByZXR1cm4gY2hhaW47XG4gICAgICAgIH0sXG4gICAgICAgIGVycm9yOiAoY2IgPSAoKSA9PiB7fSkgPT4ge1xuICAgICAgICAgICAgY2FsbGJhY2tzLm9uRXJyb3IgPSBjYjtcbiAgICAgICAgICAgIHJldHVybiBjaGFpbjtcbiAgICAgICAgfVxuICAgIH07XG5cbiAgICBjb25zdCBjb2cgPSBuZXcgY29uZmlnLndlYjMuZXRoLkNvbnRyYWN0KGNvbmZpZy5jb250cmFjdHMuQ29nbml0aXZlSm9iLmFiaSwgYWRkcmVzcyk7XG4gICAgY29nLmV2ZW50cy5TdGF0ZUNoYW5nZWQoKVxuICAgICAgICAub24oJ2RhdGEnLCBhc3luYyByZXMgPT4ge1xuXG4gICAgICAgICAgICB0cnkge1xuXG4gICAgICAgICAgICAgICAgY29uc3Qgc3RvcmUgPSBhd2FpdCBmZXRjaEpvYlN0b3JlKHJlcy5yZXR1cm5WYWx1ZXMuY29nbml0aXZlSm9iKTtcbiAgICAgICAgICAgICAgICBjYWxsYmFja3Mub25EYXRhKHtcbiAgICAgICAgICAgICAgICAgICAgYWRkcmVzczogcmVzLnJldHVyblZhbHVlcy5jb2duaXRpdmVKb2IsXG4gICAgICAgICAgICAgICAgICAgIHN0b3JlLFxuICAgICAgICAgICAgICAgICAgICBzdGF0dXM6ICdjaGFuZ2VkJyxcbiAgICAgICAgICAgICAgICAgICAgZXZlbnQ6ICdDb2duaXRpdmVKb2IuU3RhdGVDaGFuZ2VkJ1xuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfSBjYXRjaChlcnIpIHtcbiAgICAgICAgICAgICAgICBjYWxsYmFja3Mub25FcnJvcihlcnIpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KVxuICAgICAgICAub24oJ2Vycm9yJywgY2FsbGJhY2tzLm9uRXJyb3IpO1xuXG4gICAgcmV0dXJuIGNoYWluO1xufTtcbiJdfQ==