/**
 * WorkerNodes related methods
 * This file it is a part of the Pandora Pyrrha Javascript library
 * 
 * @file workers.js
 * @author Kostiantyn Smyrnov <kostysh@gmail.com>
 * @date 2018
 */
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.alive = exports.eventWorkerNodeStateChanged = exports.eventWorkerNodeCreated = exports.fetchJobProgress = exports.fetchIdleCount = exports.fetchAll = exports.fetchWorkerById = exports.fetchWorker = exports.fetchActiveJobAddress = exports.fetchState = exports.fetchAddressById = exports.fetchCount = void 0;

var expect = _interopRequireWildcard(require("./helpers/expect"));

var _errors = _interopRequireWildcard(require("./helpers/errors"));

var _jobs = require("./jobs");

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; var ownKeys = Object.keys(source); if (typeof Object.getOwnPropertySymbols === 'function') { ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) { return Object.getOwnPropertyDescriptor(source, sym).enumerable; })); } ownKeys.forEach(function (key) { _defineProperty(target, key, source[key]); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

/**
 * Get worker nodes count from Pandora contract
 * 
 * @param {Object} config Library config (provided by the proxy but can be overridden)
 * @returns {Promise} A Promise object represents the {number} 
 */
const fetchCount = async (config = {}) => {
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
  const count = await pan.methods.workerNodesCount().call();
  return Number.parseInt(count, 10);
};
/**
 * Get worker address from Pandora contract by the worker Id
 * 
 * @param {integer} id Worker Id
 * @param {Object} config Library config (provided by the proxy but can be overridden)
 * @returns {Promise} A Promise object represents the {string} 
 */


exports.fetchCount = fetchCount;

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
  const address = await pan.methods.workerNodes(id).call();
  return String(address);
};
/**
 * Get worker state from Worker contract by the worker address
 * 
 * @param {string} address 
 * @param {Object} config Library config (provided by the proxy but can be overridden)
 * @returns {Promise} A Promise object represents the {number}
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
    'contracts.WorkerNode.abi': {
      type: 'object',
      code: _errors.CONTRACT_REQUIRED,
      args: ['WorkerNode']
    }
  });
  const wor = new config.web3.eth.Contract(config.contracts.WorkerNode.abi, address);
  const state = await wor.methods.currentState().call();
  return Number.parseInt(state, 10);
};
/**
 * Get worker's active job from Worker contract by the worker address
 * 
 * @param {string} address 
 * @param {Object} config Library config (provided by the proxy but can be overridden)
 * @returns {Promise} A Promise object represents the {string}
 */


exports.fetchState = fetchState;

const fetchActiveJobAddress = async (address = '', config = {}) => {
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
    'contracts.WorkerNode.abi': {
      type: 'object',
      code: _errors.CONTRACT_REQUIRED,
      args: ['WorkerNode']
    }
  });
  const wor = new config.web3.eth.Contract(config.contracts.WorkerNode.abi, address);
  const activeJob = await wor.methods.activeJob().call();
  return String(activeJob, 10);
};
/**
 * Get worker by the worker's address
 * 
 * @param {string} address
 * @param {Object} config Library config (provided by the proxy but can be overridden)
 * @returns {Promise} A Promise object represents the {Object}
 */


exports.fetchActiveJobAddress = fetchActiveJobAddress;

const fetchWorker = async (address = '', config = {}) => {
  const [currentState, activeJob] = await Promise.all([fetchState(address, config), fetchActiveJobAddress(address, config)]);
  let currentJob = activeJob;
  let jobState; // Check is not 0x0

  if (+activeJob !== 0) {
    const jobDetails = await (0, _jobs.fetchJobDetails)(activeJob, config);
    jobState = jobDetails.state;
  } else {
    currentJob = null;
    jobState = -1;
  }

  return {
    address,
    currentState,
    currentJob,
    currentJobStatus: jobState
  };
};
/**
 * Get worker by the worker's id
 * 
 * @param {integer} id 
 * @param {Object} config Library config (provided by the proxy but can be overridden)
 * @returns {Promise} A Promise object represents the {Object}
 */


exports.fetchWorker = fetchWorker;

const fetchWorkerById = async (id, config = {}) => {
  const address = await fetchAddressById(id, config);
  const worker = await fetchWorker(address, config);
  return _objectSpread({
    id: id
  }, worker);
};
/**
 * Get all workers
 * 
 * @param {Object} config Library config (provided by the proxy but can be overridden)
 * @returns {Promise} A Promise object represents the {number}
 */


exports.fetchWorkerById = fetchWorkerById;

const fetchAll = async (config = {}) => {
  let records = [];
  let error = [];

  try {
    const count = await fetchCount(config);

    for (let i = 0; i < count; i++) {
      try {
        const worker = await fetchWorkerById(i, config);
        records.push(_objectSpread({
          id: i
        }, worker));
      } catch (err) {
        error.push({
          id: i,
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
 * Get count of workers with "idle" status
 * 
 * @param {Object} config Library config (provided by the proxy but can be overridden)
 * @returns {Promise} A Promise object represents the {number}
 */


exports.fetchAll = fetchAll;

const fetchIdleCount = async (config = {}) => {
  const all = await fetchAll(config);
  return all.records.reduce((acc, curr) => curr.currentState === 2 ? acc + 1 : acc, 0);
};
/**
 * Fetch progress of active job for the worker
 *
 * @param {String} address Worker's address
 * @param {Object} config Library config (provided by the proxy but can be overridden)
 * @returns {Promise<{Number}>} A Promise object represents the progress value
 */


exports.fetchIdleCount = fetchIdleCount;

const fetchJobProgress = async (address = '', config = {}) => {
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
    'contracts.WorkerNode.abi': {
      type: 'object',
      code: _errors.CONTRACT_REQUIRED,
      args: ['WorkerNode']
    }
  });
  const wor = new config.web3.eth.Contract(config.contracts.WorkerNode.abi, address);
  const state = await wor.methods.jobProgress().call();
  return Math.ceil(Number.parseInt(state, 10));
};
/**
 * Handle event WorkerNodeCreated
 * 
 * @param {Object} options Event handler options
 * @param {Object} config Library config (provided by the proxy but can be overridden)
 * @returns {Object} Object with chained callbacks #data and #error
 */


exports.fetchJobProgress = fetchJobProgress;

const eventWorkerNodeCreated = (options = {}, config = {}) => {
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
  chain.event = pan.events.WorkerNodeCreated(options).on('data', async event => {
    try {
      const worker = await fetchWorker(event.returnValues.workerNode, config);
      callbacks.onData({
        records: [worker],
        event
      });
    } catch (err) {
      callbacks.onError(err);
    }
  }).on('error', callbacks.onError);
  chain.event.name = 'WorkerNodeCreated';
  return chain;
};
/**
 * Handle event StateChanged for WorkerNode
 * 
 * @param {String} address
 * @param {Object} options
 * @param {Object} config Library config (provided by the proxy but can be overridden)
 * @returns {Object} Object with chained callbacks #data and #error
 */


exports.eventWorkerNodeCreated = eventWorkerNodeCreated;

const eventWorkerNodeStateChanged = (address = '', options = {}, config = {}) => {
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
    'contracts.WorkerNode.abi': {
      type: 'object',
      code: _errors.CONTRACT_REQUIRED,
      args: ['WorkerNode']
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
  const wor = new config.web3.eth.Contract(config.contracts.WorkerNode.abi, address);
  chain.event = wor.events.StateChanged(options).on('data', async event => {
    try {
      const worker = await fetchWorker(address, config);
      callbacks.onData({
        records: [worker],
        event
      });
    } catch (err) {
      callbacks.onError(err);
    }
  }).on('error', callbacks.onError);
  chain.event.name = 'StateChanged';
  return chain;
};
/**
 * Transition of a WorkerNode to the Idle state
 * 
 * @param {String} workerNodeAddress 
 * @param {String} from
 * @param {Object} config Library config (provided by the proxy but can be overridden)
 * @returns {Promise} Promise object resolved to add status (boolean)
 */


exports.eventWorkerNodeStateChanged = eventWorkerNodeStateChanged;

const alive = (workerNodeAddress, from, config = {}) => new Promise(async (resolve, reject) => {
  expect.all({
    workerNodeAddress,
    from
  }, {
    'workerNodeAddress': {
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
    'contracts.WorkerNode.abi': {
      type: 'object',
      code: _errors.CONTRACT_REQUIRED,
      args: ['WorkerNode']
    }
  });
  const wrn = new config.web3.eth.Contract(config.contracts.WorkerNode.abi, workerNodeAddress);
  const gasPrice = await config.web3.eth.getGasPrice();
  wrn.methods.alive().send({
    from,
    gasPrice,
    gas: 6700000
  }).on('error', reject).on('receipt', receipt => {
    if (Number(receipt.status) === 0) {
      return reject((0, _errors.default)(_errors.TRANSACTION_UNSUCCESSFUL));
    }

    resolve(receipt);
  });
});

exports.alive = alive;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy93b3JrZXJzLmpzIl0sIm5hbWVzIjpbImZldGNoQ291bnQiLCJjb25maWciLCJleHBlY3QiLCJhbGwiLCJ0eXBlIiwiY29kZSIsIldFQjNfUkVRVUlSRUQiLCJDT05UUkFDVF9SRVFVSVJFRCIsImFyZ3MiLCJBRERSRVNTX1JFUVVJUkVEIiwicGFuIiwid2ViMyIsImV0aCIsIkNvbnRyYWN0IiwiY29udHJhY3RzIiwiUGFuZG9yYSIsImFiaSIsImFkZHJlc3NlcyIsImNvdW50IiwibWV0aG9kcyIsIndvcmtlck5vZGVzQ291bnQiLCJjYWxsIiwiTnVtYmVyIiwicGFyc2VJbnQiLCJmZXRjaEFkZHJlc3NCeUlkIiwiaWQiLCJhZGRyZXNzIiwid29ya2VyTm9kZXMiLCJTdHJpbmciLCJmZXRjaFN0YXRlIiwid29yIiwiV29ya2VyTm9kZSIsInN0YXRlIiwiY3VycmVudFN0YXRlIiwiZmV0Y2hBY3RpdmVKb2JBZGRyZXNzIiwiYWN0aXZlSm9iIiwiZmV0Y2hXb3JrZXIiLCJQcm9taXNlIiwiY3VycmVudEpvYiIsImpvYlN0YXRlIiwiam9iRGV0YWlscyIsImN1cnJlbnRKb2JTdGF0dXMiLCJmZXRjaFdvcmtlckJ5SWQiLCJ3b3JrZXIiLCJmZXRjaEFsbCIsInJlY29yZHMiLCJlcnJvciIsImkiLCJwdXNoIiwiZXJyIiwibWVzc2FnZSIsImZldGNoSWRsZUNvdW50IiwicmVkdWNlIiwiYWNjIiwiY3VyciIsImZldGNoSm9iUHJvZ3Jlc3MiLCJqb2JQcm9ncmVzcyIsIk1hdGgiLCJjZWlsIiwiZXZlbnRXb3JrZXJOb2RlQ3JlYXRlZCIsIm9wdGlvbnMiLCJjYWxsYmFja3MiLCJvbkRhdGEiLCJvbkVycm9yIiwiY2hhaW4iLCJkYXRhIiwiY2IiLCJldmVudCIsImV2ZW50cyIsIldvcmtlck5vZGVDcmVhdGVkIiwib24iLCJyZXR1cm5WYWx1ZXMiLCJ3b3JrZXJOb2RlIiwibmFtZSIsImV2ZW50V29ya2VyTm9kZVN0YXRlQ2hhbmdlZCIsIlN0YXRlQ2hhbmdlZCIsImFsaXZlIiwid29ya2VyTm9kZUFkZHJlc3MiLCJmcm9tIiwicmVzb2x2ZSIsInJlamVjdCIsIndybiIsImdhc1ByaWNlIiwiZ2V0R2FzUHJpY2UiLCJzZW5kIiwiZ2FzIiwicmVjZWlwdCIsInN0YXR1cyIsIlRSQU5TQUNUSU9OX1VOU1VDQ0VTU0ZVTCJdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7Ozs7O0FBU0E7Ozs7Ozs7QUFFQTs7QUFDQTs7QUFPQTs7Ozs7Ozs7QUFFQTs7Ozs7O0FBTU8sTUFBTUEsVUFBVSxHQUFHLE9BQU9DLE1BQU0sR0FBRyxFQUFoQixLQUF1QjtBQUU3Q0MsRUFBQUEsTUFBTSxDQUFDQyxHQUFQLENBQVdGLE1BQVgsRUFBbUI7QUFDZixZQUFRO0FBQ0pHLE1BQUFBLElBQUksRUFBRSxRQURGO0FBRUpDLE1BQUFBLElBQUksRUFBRUM7QUFGRixLQURPO0FBS2YsNkJBQXlCO0FBQ3JCRixNQUFBQSxJQUFJLEVBQUUsUUFEZTtBQUVyQkMsTUFBQUEsSUFBSSxFQUFFRSx5QkFGZTtBQUdyQkMsTUFBQUEsSUFBSSxFQUFFLENBQUMsU0FBRDtBQUhlLEtBTFY7QUFVZix5QkFBcUI7QUFDakJKLE1BQUFBLElBQUksRUFBRSxTQURXO0FBRWpCQyxNQUFBQSxJQUFJLEVBQUVJLHdCQUZXO0FBR2pCRCxNQUFBQSxJQUFJLEVBQUUsQ0FBQyxTQUFEO0FBSFc7QUFWTixHQUFuQjtBQWlCQSxRQUFNRSxHQUFHLEdBQUcsSUFBSVQsTUFBTSxDQUFDVSxJQUFQLENBQVlDLEdBQVosQ0FBZ0JDLFFBQXBCLENBQTZCWixNQUFNLENBQUNhLFNBQVAsQ0FBaUJDLE9BQWpCLENBQXlCQyxHQUF0RCxFQUEyRGYsTUFBTSxDQUFDZ0IsU0FBUCxDQUFpQkYsT0FBNUUsQ0FBWjtBQUNBLFFBQU1HLEtBQUssR0FBRyxNQUFNUixHQUFHLENBQUNTLE9BQUosQ0FDZkMsZ0JBRGUsR0FFZkMsSUFGZSxFQUFwQjtBQUlBLFNBQU9DLE1BQU0sQ0FBQ0MsUUFBUCxDQUFnQkwsS0FBaEIsRUFBdUIsRUFBdkIs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QUFPLElBQUk7QUFFdEIsUUFBSWhFLE1BQU0sQ0FBQ2dFLE9BQU8sQ0FBQ0MsTUFBVCxDQUFOLEtBQTJCLENBQS9CLEVBQWtDO0FBRTlCLGFBQU9QLE1BQU0sQ0FBQyxxQkFBU1EsZ0NBQVQsQ0FBRCxDQUFiO0FBQ0g7O0FBRURULElBQUFBLE9BQU8sQ0FBQ08sT0FBRCxDQUFQO0FBQ0gsR0FoQkw7QUFpQkgsQ0ExQzhELENBQXhEIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBXb3JrZXJOb2RlcyByZWxhdGVkIG1ldGhvZHNcbiAqIFRoaXMgZmlsZSBpdCBpcyBhIHBhcnQgb2YgdGhlIFBhbmRvcmEgUHlycmhhIEphdmFzY3JpcHQgbGlicmFyeVxuICogXG4gKiBAZmlsZSB3b3JrZXJzLmpzXG4gKiBAYXV0aG9yIEtvc3RpYW50eW4gU215cm5vdiA8a29zdHlzaEBnbWFpbC5jb20+XG4gKiBAZGF0ZSAyMDE4XG4gKi9cblxuJ3VzZSBzdHJpY3QnO1xuXG5pbXBvcnQgKiBhcyBleHBlY3QgZnJvbSAnLi9oZWxwZXJzL2V4cGVjdCc7XG5pbXBvcnQgcGpzRXJyb3IsIHtcbiAgICBDT05UUkFDVF9SRVFVSVJFRCxcbiAgICBBRERSRVNTX1JFUVVJUkVELFxuICAgIFdFQjNfUkVRVUlSRUQsXG4gICAgVFJBTlNBQ1RJT05fVU5TVUNDRVNTRlVMXG59IGZyb20gJy4vaGVscGVycy9lcnJvcnMnO1xuXG5pbXBvcnQgeyBmZXRjaEpvYkRldGFpbHMgfSBmcm9tICcuL2pvYnMnO1xuXG4vKipcbiAqIEdldCB3b3JrZXIgbm9kZXMgY291bnQgZnJvbSBQYW5kb3JhIGNvbnRyYWN0XG4gKiBcbiAqIEBwYXJhbSB7T2JqZWN0fSBjb25maWcgTGlicmFyeSBjb25maWcgKHByb3ZpZGVkIGJ5IHRoZSBwcm94eSBidXQgY2FuIGJlIG92ZXJyaWRkZW4pXG4gKiBAcmV0dXJucyB7UHJvbWlzZX0gQSBQcm9taXNlIG9iamVjdCByZXByZXNlbnRzIHRoZSB7bnVtYmVyfSBcbiAqL1xuZXhwb3J0IGNvbnN0IGZldGNoQ291bnQgPSBhc3luYyAoY29uZmlnID0ge30pID0+IHtcblxuICAgIGV4cGVjdC5hbGwoY29uZmlnLCB7XG4gICAgICAgICd3ZWIzJzoge1xuICAgICAgICAgICAgdHlwZTogJ29iamVjdCcsXG4gICAgICAgICAgICBjb2RlOiBXRUIzX1JFUVVJUkVEXG4gICAgICAgIH0sXG4gICAgICAgICdjb250cmFjdHMuUGFuZG9yYS5hYmknOiB7XG4gICAgICAgICAgICB0eXBlOiAnb2JqZWN0JyxcbiAgICAgICAgICAgIGNvZGU6IENPTlRSQUNUX1JFUVVJUkVELFxuICAgICAgICAgICAgYXJnczogWydQYW5kb3JhJ11cbiAgICAgICAgfSxcbiAgICAgICAgJ2FkZHJlc3Nlcy5QYW5kb3JhJzoge1xuICAgICAgICAgICAgdHlwZTogJ2FkZHJlc3MnLFxuICAgICAgICAgICAgY29kZTogQUREUkVTU19SRVFVSVJFRCxcbiAgICAgICAgICAgIGFyZ3M6IFsnUGFuZG9yYSddXG4gICAgICAgIH1cbiAgICB9KTtcblxuICAgIGNvbnN0IHBhbiA9IG5ldyBjb25maWcud2ViMy5ldGguQ29udHJhY3QoY29uZmlnLmNvbnRyYWN0cy5QYW5kb3JhLmFiaSwgY29uZmlnLmFkZHJlc3Nlcy5QYW5kb3JhKTtcbiAgICBjb25zdCBjb3VudCA9IGF3YWl0IHBhbi5tZXRob2RzXG4gICAgICAgIC53b3JrZXJOb2Rlc0NvdW50KClcbiAgICAgICAgLmNhbGwoKTtcblxuICAgIHJldHVybiBOdW1iZXIucGFyc2VJbnQoY291bnQsIDEwKTtcbn07XG5cbi8qKlxuICogR2V0IHdvcmtlciBhZGRyZXNzIGZyb20gUGFuZG9yYSBjb250cmFjdCBieSB0aGUgd29ya2VyIElkXG4gKiBcbiAqIEBwYXJhbSB7aW50ZWdlcn0gaWQgV29ya2VyIElkXG4gKiBAcGFyYW0ge09iamVjdH0gY29uZmlnIExpYnJhcnkgY29uZmlnIChwcm92aWRlZCBieSB0aGUgcHJveHkgYnV0IGNhbiBiZSBvdmVycmlkZGVuKVxuICogQHJldHVybnMge1Byb21pc2V9IEEgUHJvbWlzZSBvYmplY3QgcmVwcmVzZW50cyB0aGUge3N0cmluZ30gXG4gKi9cbmV4cG9ydCBjb25zdCBmZXRjaEFkZHJlc3NCeUlkID0gYXN5bmMgKGlkLCBjb25maWcgPSB7fSkgPT4ge1xuXG4gICAgZXhwZWN0LmFsbCh7IGlkIH0sIHtcbiAgICAgICAgJ2lkJzoge1xuICAgICAgICAgICAgdHlwZTogJ251bWJlcidcbiAgICAgICAgfVxuICAgIH0pO1xuXG4gICAgZXhwZWN0LmFsbChjb25maWcsIHtcbiAgICAgICAgJ3dlYjMnOiB7XG4gICAgICAgICAgICB0eXBlOiAnb2JqZWN0JyxcbiAgICAgICAgICAgIGNvZGU6IFdFQjNfUkVRVUlSRURcbiAgICAgICAgfSxcbiAgICAgICAgJ2NvbnRyYWN0cy5QYW5kb3JhLmFiaSc6IHtcbiAgICAgICAgICAgIHR5cGU6ICdvYmplY3QnLFxuICAgICAgICAgICAgY29kZTogQ09OVFJBQ1RfUkVRVUlSRUQsXG4gICAgICAgICAgICBhcmdzOiBbJ1BhbmRvcmEnXVxuICAgICAgICB9LFxuICAgICAgICAnYWRkcmVzc2VzLlBhbmRvcmEnOiB7XG4gICAgICAgICAgICB0eXBlOiAnYWRkcmVzcycsXG4gICAgICAgICAgICBjb2RlOiBBRERSRVNTX1JFUVVJUkVELFxuICAgICAgICAgICAgYXJnczogWydQYW5kb3JhJ11cbiAgICAgICAgfVxuICAgIH0pO1xuXG4gICAgY29uc3QgcGFuID0gbmV3IGNvbmZpZy53ZWIzLmV0aC5Db250cmFjdChjb25maWcuY29udHJhY3RzLlBhbmRvcmEuYWJpLCBjb25maWcuYWRkcmVzc2VzLlBhbmRvcmEpO1xuICAgIGNvbnN0IGFkZHJlc3MgPSBhd2FpdCBwYW4ubWV0aG9kc1xuICAgICAgICAud29ya2VyTm9kZXMoaWQpXG4gICAgICAgIC5jYWxsKCk7XG5cbiAgICByZXR1cm4gU3RyaW5nKGFkZHJlc3MpO1xufTtcblxuLyoqXG4gKiBHZXQgd29ya2VyIHN0YXRlIGZyb20gV29ya2VyIGNvbnRyYWN0IGJ5IHRoZSB3b3JrZXIgYWRkcmVzc1xuICogXG4gKiBAcGFyYW0ge3N0cmluZ30gYWRkcmVzcyBcbiAqIEBwYXJhbSB7T2JqZWN0fSBjb25maWcgTGlicmFyeSBjb25maWcgKHByb3ZpZGVkIGJ5IHRoZSBwcm94eSBidXQgY2FuIGJlIG92ZXJyaWRkZW4pXG4gKiBAcmV0dXJucyB7UHJvbWlzZX0gQSBQcm9taXNlIG9iamVjdCByZXByZXNlbnRzIHRoZSB7bnVtYmVyfVxuICovXG5leHBvcnQgY29uc3QgZmV0Y2hTdGF0ZSA9IGFzeW5jIChhZGRyZXNzID0gJycsIGNvbmZpZyA9IHt9KSA9PiB7XG5cbiAgICBleHBlY3QuYWxsKHsgYWRkcmVzcyB9LCB7XG4gICAgICAgICdhZGRyZXNzJzoge1xuICAgICAgICAgICAgdHlwZTogJ2FkZHJlc3MnXG4gICAgICAgIH1cbiAgICB9KTtcblxuICAgIGV4cGVjdC5hbGwoY29uZmlnLCB7XG4gICAgICAgICd3ZWIzJzoge1xuICAgICAgICAgICAgdHlwZTogJ29iamVjdCcsXG4gICAgICAgICAgICBjb2RlOiBXRUIzX1JFUVVJUkVEXG4gICAgICAgIH0sXG4gICAgICAgICdjb250cmFjdHMuV29ya2VyTm9kZS5hYmknOiB7XG4gICAgICAgICAgICB0eXBlOiAnb2JqZWN0JyxcbiAgICAgICAgICAgIGNvZGU6IENPTlRSQUNUX1JFUVVJUkVELFxuICAgICAgICAgICAgYXJnczogWydXb3JrZXJOb2RlJ11cbiAgICAgICAgfVxuICAgIH0pO1xuXG4gICAgY29uc3Qgd29yID0gbmV3IGNvbmZpZy53ZWIzLmV0aC5Db250cmFjdChjb25maWcuY29udHJhY3RzLldvcmtlck5vZGUuYWJpLCBhZGRyZXNzKTsgICAgXG4gICAgY29uc3Qgc3RhdGUgPSBhd2FpdCB3b3IubWV0aG9kc1xuICAgICAgICAuY3VycmVudFN0YXRlKClcbiAgICAgICAgLmNhbGwoKTtcblxuICAgIHJldHVybiBOdW1iZXIucGFyc2VJbnQoc3RhdGUsIDEwKTtcbn07XG5cbi8qKlxuICogR2V0IHdvcmtlcidzIGFjdGl2ZSBqb2IgZnJvbSBXb3JrZXIgY29udHJhY3QgYnkgdGhlIHdvcmtlciBhZGRyZXNzXG4gKiBcbiAqIEBwYXJhbSB7c3RyaW5nfSBhZGRyZXNzIFxuICogQHBhcmFtIHtPYmplY3R9IGNvbmZpZyBMaWJyYXJ5IGNvbmZpZyAocHJvdmlkZWQgYnkgdGhlIHByb3h5IGJ1dCBjYW4gYmUgb3ZlcnJpZGRlbilcbiAqIEByZXR1cm5zIHtQcm9taXNlfSBBIFByb21pc2Ugb2JqZWN0IHJlcHJlc2VudHMgdGhlIHtzdHJpbmd9XG4gKi9cbmV4cG9ydCBjb25zdCBmZXRjaEFjdGl2ZUpvYkFkZHJlc3MgPSBhc3luYyAoYWRkcmVzcyA9ICcnLCBjb25maWcgPSB7fSkgPT4ge1xuXG4gICAgZXhwZWN0LmFsbCh7IGFkZHJlc3MgfSwge1xuICAgICAgICAnYWRkcmVzcyc6IHtcbiAgICAgICAgICAgIHR5cGU6ICdhZGRyZXNzJ1xuICAgICAgICB9XG4gICAgfSk7XG5cbiAgICBleHBlY3QuYWxsKGNvbmZpZywge1xuICAgICAgICAnd2ViMyc6IHtcbiAgICAgICAgICAgIHR5cGU6ICdvYmplY3QnLFxuICAgICAgICAgICAgY29kZTogV0VCM19SRVFVSVJFRFxuICAgICAgICB9LFxuICAgICAgICAnY29udHJhY3RzLldvcmtlck5vZGUuYWJpJzoge1xuICAgICAgICAgICAgdHlwZTogJ29iamVjdCcsXG4gICAgICAgICAgICBjb2RlOiBDT05UUkFDVF9SRVFVSVJFRCxcbiAgICAgICAgICAgIGFyZ3M6IFsnV29ya2VyTm9kZSddXG4gICAgICAgIH1cbiAgICB9KTtcblxuICAgIGNvbnN0IHdvciA9IG5ldyBjb25maWcud2ViMy5ldGguQ29udHJhY3QoY29uZmlnLmNvbnRyYWN0cy5Xb3JrZXJOb2RlLmFiaSwgYWRkcmVzcyk7XG4gICAgY29uc3QgYWN0aXZlSm9iID0gYXdhaXQgd29yLm1ldGhvZHNcbiAgICAgICAgLmFjdGl2ZUpvYigpXG4gICAgICAgIC5jYWxsKCk7XG5cbiAgICByZXR1cm4gU3RyaW5nKGFjdGl2ZUpvYiwgMTApO1xufTtcblxuLyoqXG4gKiBHZXQgd29ya2VyIGJ5IHRoZSB3b3JrZXIncyBhZGRyZXNzXG4gKiBcbiAqIEBwYXJhbSB7c3RyaW5nfSBhZGRyZXNzXG4gKiBAcGFyYW0ge09iamVjdH0gY29uZmlnIExpYnJhcnkgY29uZmlnIChwcm92aWRlZCBieSB0aGUgcHJveHkgYnV0IGNhbiBiZSBvdmVycmlkZGVuKVxuICogQHJldHVybnMge1Byb21pc2V9IEEgUHJvbWlzZSBvYmplY3QgcmVwcmVzZW50cyB0aGUge09iamVjdH1cbiAqL1xuZXhwb3J0IGNvbnN0IGZldGNoV29ya2VyID0gYXN5bmMgKGFkZHJlc3MgPSAnJywgY29uZmlnID0ge30pID0+IHtcbiAgICBcbiAgICBjb25zdCBbXG4gICAgICAgIGN1cnJlbnRTdGF0ZSxcbiAgICAgICAgYWN0aXZlSm9iXG4gICAgXSA9IGF3YWl0IFByb21pc2UuYWxsKFtcbiAgICAgICAgZmV0Y2hTdGF0ZShhZGRyZXNzLCBjb25maWcpLFxuICAgICAgICBmZXRjaEFjdGl2ZUpvYkFkZHJlc3MoYWRkcmVzcywgY29uZmlnKVxuICAgIF0pO1xuXG5cbiAgICBsZXQgY3VycmVudEpvYiA9IGFjdGl2ZUpvYjtcbiAgICBsZXQgam9iU3RhdGU7ICAgIFxuXG4gICAgLy8gQ2hlY2sgaXMgbm90IDB4MFxuICAgIGlmICgrYWN0aXZlSm9iICE9PSAwKSB7XG5cbiAgICAgICAgY29uc3Qgam9iRGV0YWlscyA9IGF3YWl0IGZldGNoSm9iRGV0YWlscyhhY3RpdmVKb2IsIGNvbmZpZyk7XG4gICAgICAgIGpvYlN0YXRlID0gam9iRGV0YWlscy5zdGF0ZTtcbiAgICB9IGVsc2Uge1xuICAgICAgICBjdXJyZW50Sm9iID0gbnVsbDtcbiAgICAgICAgam9iU3RhdGUgPSAtMTtcbiAgICB9XG5cbiAgICByZXR1cm4ge1xuICAgICAgICBhZGRyZXNzLFxuICAgICAgICBjdXJyZW50U3RhdGUsXG4gICAgICAgIGN1cnJlbnRKb2IsXG4gICAgICAgIGN1cnJlbnRKb2JTdGF0dXM6IGpvYlN0YXRlXG4gICAgfTtcbn07XG5cbi8qKlxuICogR2V0IHdvcmtlciBieSB0aGUgd29ya2VyJ3MgaWRcbiAqIFxuICogQHBhcmFtIHtpbnRlZ2VyfSBpZCBcbiAqIEBwYXJhbSB7T2JqZWN0fSBjb25maWcgTGlicmFyeSBjb25maWcgKHByb3ZpZGVkIGJ5IHRoZSBwcm94eSBidXQgY2FuIGJlIG92ZXJyaWRkZW4pXG4gKiBAcmV0dXJucyB7UHJvbWlzZX0gQSBQcm9taXNlIG9iamVjdCByZXByZXNlbnRzIHRoZSB7T2JqZWN0fVxuICovXG5leHBvcnQgY29uc3QgZmV0Y2hXb3JrZXJCeUlkID0gYXN5bmMgKGlkLCBjb25maWcgPSB7fSkgPT4ge1xuICAgIFxuICAgIGNvbnN0IGFkZHJlc3MgPSBhd2FpdCBmZXRjaEFkZHJlc3NCeUlkKGlkLCBjb25maWcpO1xuICAgIGNvbnN0IHdvcmtlciA9IGF3YWl0IGZldGNoV29ya2VyKGFkZHJlc3MsIGNvbmZpZyk7XG5cbiAgICByZXR1cm4ge1xuICAgICAgICBpZDogaWQsXG4gICAgICAgIC4uLndvcmtlclxuICAgIH07XG59O1xuXG4vKipcbiAqIEdldCBhbGwgd29ya2Vyc1xuICogXG4gKiBAcGFyYW0ge09iamVjdH0gY29uZmlnIExpYnJhcnkgY29uZmlnIChwcm92aWRlZCBieSB0aGUgcHJveHkgYnV0IGNhbiBiZSBvdmVycmlkZGVuKVxuICogQHJldHVybnMge1Byb21pc2V9IEEgUHJvbWlzZSBvYmplY3QgcmVwcmVzZW50cyB0aGUge251bWJlcn1cbiAqL1xuZXhwb3J0IGNvbnN0IGZldGNoQWxsID0gYXN5bmMgKGNvbmZpZyA9IHt9KSA9PiB7XG4gICAgbGV0IHJlY29yZHMgPSBbXTtcbiAgICBsZXQgZXJyb3IgPSBbXTtcblxuICAgIHRyeSB7XG5cbiAgICAgICAgY29uc3QgY291bnQgPSBhd2FpdCBmZXRjaENvdW50KGNvbmZpZyk7ICAgIFxuXG4gICAgICAgIGZvciAobGV0IGk9MDsgaSA8IGNvdW50OyBpKyspIHtcbiAgICAgICAgICAgIFxuICAgICAgICAgICAgdHJ5IHtcblxuICAgICAgICAgICAgICAgIGNvbnN0IHdvcmtlciA9IGF3YWl0IGZldGNoV29ya2VyQnlJZChpLCBjb25maWcpO1xuXG4gICAgICAgICAgICAgICAgcmVjb3Jkcy5wdXNoKHtcbiAgICAgICAgICAgICAgICAgICAgaWQ6IGksXG4gICAgICAgICAgICAgICAgICAgIC4uLndvcmtlclxuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfSBjYXRjaChlcnIpIHtcbiAgICAgICAgICAgICAgICBlcnJvci5wdXNoKHtcbiAgICAgICAgICAgICAgICAgICAgaWQ6IGksXG4gICAgICAgICAgICAgICAgICAgIG1lc3NhZ2U6IGVyci5tZXNzYWdlXG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9ICAgICAgICBcbiAgICAgICAgfVxuICAgIH0gY2F0Y2goZXJyKSB7XG4gICAgICAgIGVycm9yLnB1c2goe1xuICAgICAgICAgICAgZXJyb3I6IGVyci5tZXNzYWdlXG4gICAgICAgIH0pO1xuICAgIH0gICBcblxuICAgIHJldHVybiB7XG4gICAgICAgIHJlY29yZHMsXG4gICAgICAgIGVycm9yXG4gICAgfTtcbn07XG5cbi8qKlxuICogR2V0IGNvdW50IG9mIHdvcmtlcnMgd2l0aCBcImlkbGVcIiBzdGF0dXNcbiAqIFxuICogQHBhcmFtIHtPYmplY3R9IGNvbmZpZyBMaWJyYXJ5IGNvbmZpZyAocHJvdmlkZWQgYnkgdGhlIHByb3h5IGJ1dCBjYW4gYmUgb3ZlcnJpZGRlbilcbiAqIEByZXR1cm5zIHtQcm9taXNlfSBBIFByb21pc2Ugb2JqZWN0IHJlcHJlc2VudHMgdGhlIHtudW1iZXJ9XG4gKi9cbmV4cG9ydCBjb25zdCBmZXRjaElkbGVDb3VudCA9IGFzeW5jIChjb25maWcgPSB7fSkgPT4ge1xuICAgIGNvbnN0IGFsbCA9IGF3YWl0IGZldGNoQWxsKGNvbmZpZyk7XG4gICAgcmV0dXJuIGFsbC5yZWNvcmRzLnJlZHVjZSgoYWNjLCBjdXJyKSA9PiAoY3Vyci5jdXJyZW50U3RhdGUgPT09IDIgPyBhY2MrMSA6IGFjYyksIDApO1xufTtcblxuLyoqXG4gKiBGZXRjaCBwcm9ncmVzcyBvZiBhY3RpdmUgam9iIGZvciB0aGUgd29ya2VyXG4gKlxuICogQHBhcmFtIHtTdHJpbmd9IGFkZHJlc3MgV29ya2VyJ3MgYWRkcmVzc1xuICogQHBhcmFtIHtPYmplY3R9IGNvbmZpZyBMaWJyYXJ5IGNvbmZpZyAocHJvdmlkZWQgYnkgdGhlIHByb3h5IGJ1dCBjYW4gYmUgb3ZlcnJpZGRlbilcbiAqIEByZXR1cm5zIHtQcm9taXNlPHtOdW1iZXJ9Pn0gQSBQcm9taXNlIG9iamVjdCByZXByZXNlbnRzIHRoZSBwcm9ncmVzcyB2YWx1ZVxuICovXG5leHBvcnQgY29uc3QgZmV0Y2hKb2JQcm9ncmVzcyA9IGFzeW5jIChhZGRyZXNzID0gJycsIGNvbmZpZyA9IHt9KSA9PiB7XG5cbiAgICBleHBlY3QuYWxsKHsgYWRkcmVzcyB9LCB7XG4gICAgICAgICdhZGRyZXNzJzoge1xuICAgICAgICAgICAgdHlwZTogJ2FkZHJlc3MnXG4gICAgICAgIH1cbiAgICB9KTtcblxuICAgIGV4cGVjdC5hbGwoY29uZmlnLCB7XG4gICAgICAgICd3ZWIzJzoge1xuICAgICAgICAgICAgdHlwZTogJ29iamVjdCcsXG4gICAgICAgICAgICBjb2RlOiBXRUIzX1JFUVVJUkVEXG4gICAgICAgIH0sXG4gICAgICAgICdjb250cmFjdHMuV29ya2VyTm9kZS5hYmknOiB7XG4gICAgICAgICAgICB0eXBlOiAnb2JqZWN0JyxcbiAgICAgICAgICAgIGNvZGU6IENPTlRSQUNUX1JFUVVJUkVELFxuICAgICAgICAgICAgYXJnczogWydXb3JrZXJOb2RlJ11cbiAgICAgICAgfVxuICAgIH0pO1xuXG4gICAgY29uc3Qgd29yID0gbmV3IGNvbmZpZy53ZWIzLmV0aC5Db250cmFjdChjb25maWcuY29udHJhY3RzLldvcmtlck5vZGUuYWJpLCBhZGRyZXNzKTsgICAgXG4gICAgY29uc3Qgc3RhdGUgPSBhd2FpdCB3b3IubWV0aG9kc1xuICAgICAgICAuam9iUHJvZ3Jlc3MoKVxuICAgICAgICAuY2FsbCgpO1xuXG4gICAgcmV0dXJuIE1hdGguY2VpbChOdW1iZXIucGFyc2VJbnQoc3RhdGUsIDEwKSk7XG59O1xuXG4vKipcbiAqIEhhbmRsZSBldmVudCBXb3JrZXJOb2RlQ3JlYXRlZFxuICogXG4gKiBAcGFyYW0ge09iamVjdH0gb3B0aW9ucyBFdmVudCBoYW5kbGVyIG9wdGlvbnNcbiAqIEBwYXJhbSB7T2JqZWN0fSBjb25maWcgTGlicmFyeSBjb25maWcgKHByb3ZpZGVkIGJ5IHRoZSBwcm94eSBidXQgY2FuIGJlIG92ZXJyaWRkZW4pXG4gKiBAcmV0dXJucyB7T2JqZWN0fSBPYmplY3Qgd2l0aCBjaGFpbmVkIGNhbGxiYWNrcyAjZGF0YSBhbmQgI2Vycm9yXG4gKi9cbmV4cG9ydCBjb25zdCBldmVudFdvcmtlck5vZGVDcmVhdGVkID0gKG9wdGlvbnMgPSB7fSwgY29uZmlnID0ge30pID0+IHtcblxuICAgIGV4cGVjdC5hbGwoeyBvcHRpb25zIH0sIHtcbiAgICAgICAgJ29wdGlvbnMnOiB7XG4gICAgICAgICAgICB0eXBlOiAnb2JqZWN0J1xuICAgICAgICB9XG4gICAgfSk7XG5cbiAgICBleHBlY3QuYWxsKGNvbmZpZywge1xuICAgICAgICAnd2ViMyc6IHtcbiAgICAgICAgICAgIHR5cGU6ICdvYmplY3QnLFxuICAgICAgICAgICAgY29kZTogV0VCM19SRVFVSVJFRFxuICAgICAgICB9LFxuICAgICAgICAnY29udHJhY3RzLlBhbmRvcmEuYWJpJzoge1xuICAgICAgICAgICAgdHlwZTogJ29iamVjdCcsXG4gICAgICAgICAgICBjb2RlOiBDT05UUkFDVF9SRVFVSVJFRCxcbiAgICAgICAgICAgIGFyZ3M6IFsnUGFuZG9yYSddXG4gICAgICAgIH0sXG4gICAgICAgICdhZGRyZXNzZXMuUGFuZG9yYSc6IHtcbiAgICAgICAgICAgIHR5cGU6ICdhZGRyZXNzJyxcbiAgICAgICAgICAgIGNvZGU6IEFERFJFU1NfUkVRVUlSRUQsXG4gICAgICAgICAgICBhcmdzOiBbJ1BhbmRvcmEnXVxuICAgICAgICB9XG4gICAgfSk7XG5cbiAgICBjb25zdCBjYWxsYmFja3MgPSB7XG4gICAgICAgIG9uRGF0YTogKCkgPT4ge30sXG4gICAgICAgIG9uRXJyb3I6ICgpID0+IHt9XG4gICAgfTtcblxuICAgIGNvbnN0IGNoYWluID0ge1xuICAgICAgICBkYXRhOiAoY2IgPSAoKSA9PiB7fSkgPT4ge1xuICAgICAgICAgICAgY2FsbGJhY2tzLm9uRGF0YSA9IGNiO1xuICAgICAgICAgICAgcmV0dXJuIGNoYWluO1xuICAgICAgICB9LFxuICAgICAgICBlcnJvcjogKGNiID0gKCkgPT4ge30pID0+IHtcbiAgICAgICAgICAgIGNhbGxiYWNrcy5vbkVycm9yID0gY2I7XG4gICAgICAgICAgICByZXR1cm4gY2hhaW47XG4gICAgICAgIH1cbiAgICB9O1xuXG4gICAgY29uc3QgcGFuID0gbmV3IGNvbmZpZy53ZWIzLmV0aC5Db250cmFjdChjb25maWcuY29udHJhY3RzLlBhbmRvcmEuYWJpLCBjb25maWcuYWRkcmVzc2VzLlBhbmRvcmEpO1xuICAgIGNoYWluLmV2ZW50ID0gcGFuLmV2ZW50cy5Xb3JrZXJOb2RlQ3JlYXRlZChvcHRpb25zKVxuICAgICAgICAub24oJ2RhdGEnLCBhc3luYyBldmVudCA9PiB7XG5cbiAgICAgICAgICAgIHRyeSB7XG5cbiAgICAgICAgICAgICAgICBjb25zdCB3b3JrZXIgPSBhd2FpdCBmZXRjaFdvcmtlcihldmVudC5yZXR1cm5WYWx1ZXMud29ya2VyTm9kZSwgY29uZmlnKTtcbiAgICAgICAgICAgICAgICBjYWxsYmFja3Mub25EYXRhKHtcbiAgICAgICAgICAgICAgICAgICAgcmVjb3JkczogW3dvcmtlcl0sXG4gICAgICAgICAgICAgICAgICAgIGV2ZW50XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9IGNhdGNoKGVycikge1xuICAgICAgICAgICAgICAgIGNhbGxiYWNrcy5vbkVycm9yKGVycik7XG4gICAgICAgICAgICB9ICAgICAgICAgICAgXG4gICAgICAgIH0pXG4gICAgICAgIC5vbignZXJyb3InLCBjYWxsYmFja3Mub25FcnJvcik7XG4gICAgY2hhaW4uZXZlbnQubmFtZSA9ICdXb3JrZXJOb2RlQ3JlYXRlZCc7XG5cbiAgICByZXR1cm4gY2hhaW47XG59O1xuXG4vKipcbiAqIEhhbmRsZSBldmVudCBTdGF0ZUNoYW5nZWQgZm9yIFdvcmtlck5vZGVcbiAqIFxuICogQHBhcmFtIHtTdHJpbmd9IGFkZHJlc3NcbiAqIEBwYXJhbSB7T2JqZWN0fSBvcHRpb25zXG4gKiBAcGFyYW0ge09iamVjdH0gY29uZmlnIExpYnJhcnkgY29uZmlnIChwcm92aWRlZCBieSB0aGUgcHJveHkgYnV0IGNhbiBiZSBvdmVycmlkZGVuKVxuICogQHJldHVybnMge09iamVjdH0gT2JqZWN0IHdpdGggY2hhaW5lZCBjYWxsYmFja3MgI2RhdGEgYW5kICNlcnJvclxuICovXG5leHBvcnQgY29uc3QgZXZlbnRXb3JrZXJOb2RlU3RhdGVDaGFuZ2VkID0gKGFkZHJlc3MgPSAnJywgb3B0aW9ucyA9IHt9LCBjb25maWcgPSB7fSkgPT4ge1xuXG4gICAgZXhwZWN0LmFsbCh7IGFkZHJlc3MgfSwge1xuICAgICAgICAnYWRkcmVzcyc6IHtcbiAgICAgICAgICAgIHR5cGU6ICdhZGRyZXNzJ1xuICAgICAgICB9XG4gICAgfSk7XG5cbiAgICBleHBlY3QuYWxsKGNvbmZpZywge1xuICAgICAgICAnd2ViMyc6IHtcbiAgICAgICAgICAgIHR5cGU6ICdvYmplY3QnLFxuICAgICAgICAgICAgY29kZTogV0VCM19SRVFVSVJFRFxuICAgICAgICB9LFxuICAgICAgICAnY29udHJhY3RzLldvcmtlck5vZGUuYWJpJzoge1xuICAgICAgICAgICAgdHlwZTogJ29iamVjdCcsXG4gICAgICAgICAgICBjb2RlOiBDT05UUkFDVF9SRVFVSVJFRCxcbiAgICAgICAgICAgIGFyZ3M6IFsnV29ya2VyTm9kZSddXG4gICAgICAgIH1cbiAgICB9KTtcblxuICAgIGNvbnN0IGNhbGxiYWNrcyA9IHtcbiAgICAgICAgb25EYXRhOiAoKSA9PiB7fSxcbiAgICAgICAgb25FcnJvcjogKCkgPT4ge31cbiAgICB9O1xuXG4gICAgY29uc3QgY2hhaW4gPSB7XG4gICAgICAgIGRhdGE6IChjYiA9ICgpID0+IHt9KSA9PiB7XG4gICAgICAgICAgICBjYWxsYmFja3Mub25EYXRhID0gY2I7XG4gICAgICAgICAgICByZXR1cm4gY2hhaW47XG4gICAgICAgIH0sXG4gICAgICAgIGVycm9yOiAoY2IgPSAoKSA9PiB7fSkgPT4ge1xuICAgICAgICAgICAgY2FsbGJhY2tzLm9uRXJyb3IgPSBjYjtcbiAgICAgICAgICAgIHJldHVybiBjaGFpbjtcbiAgICAgICAgfVxuICAgIH07XG5cbiAgICBjb25zdCB3b3IgPSBuZXcgY29uZmlnLndlYjMuZXRoLkNvbnRyYWN0KGNvbmZpZy5jb250cmFjdHMuV29ya2VyTm9kZS5hYmksIGFkZHJlc3MpO1xuICAgIGNoYWluLmV2ZW50ID0gd29yLmV2ZW50cy5TdGF0ZUNoYW5nZWQob3B0aW9ucylcbiAgICAgICAgLm9uKCdkYXRhJywgYXN5bmMgZXZlbnQgPT4ge1xuXG4gICAgICAgICAgICB0cnkge1xuXG4gICAgICAgICAgICAgICAgY29uc3Qgd29ya2VyID0gYXdhaXQgZmV0Y2hXb3JrZXIoYWRkcmVzcywgY29uZmlnKTtcbiAgICAgICAgICAgICAgICBjYWxsYmFja3Mub25EYXRhKHtcbiAgICAgICAgICAgICAgICAgICAgcmVjb3JkczogW3dvcmtlcl0sXG4gICAgICAgICAgICAgICAgICAgIGV2ZW50XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9IGNhdGNoKGVycikge1xuICAgICAgICAgICAgICAgIGNhbGxiYWNrcy5vbkVycm9yKGVycik7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pXG4gICAgICAgIC5vbignZXJyb3InLCBjYWxsYmFja3Mub25FcnJvcik7XG4gICAgY2hhaW4uZXZlbnQubmFtZSA9ICdTdGF0ZUNoYW5nZWQnO1xuXG4gICAgcmV0dXJuIGNoYWluO1xufTtcblxuLyoqXG4gKiBUcmFuc2l0aW9uIG9mIGEgV29ya2VyTm9kZSB0byB0aGUgSWRsZSBzdGF0ZVxuICogXG4gKiBAcGFyYW0ge1N0cmluZ30gd29ya2VyTm9kZUFkZHJlc3MgXG4gKiBAcGFyYW0ge1N0cmluZ30gZnJvbVxuICogQHBhcmFtIHtPYmplY3R9IGNvbmZpZyBMaWJyYXJ5IGNvbmZpZyAocHJvdmlkZWQgYnkgdGhlIHByb3h5IGJ1dCBjYW4gYmUgb3ZlcnJpZGRlbilcbiAqIEByZXR1cm5zIHtQcm9taXNlfSBQcm9taXNlIG9iamVjdCByZXNvbHZlZCB0byBhZGQgc3RhdHVzIChib29sZWFuKVxuICovXG5leHBvcnQgY29uc3QgYWxpdmUgPSAod29ya2VyTm9kZUFkZHJlc3MsIGZyb20sIGNvbmZpZyA9IHt9KSA9PiBuZXcgUHJvbWlzZShhc3luYyAocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG5cbiAgICBleHBlY3QuYWxsKHsgd29ya2VyTm9kZUFkZHJlc3MsIGZyb20gfSwge1xuICAgICAgICAnd29ya2VyTm9kZUFkZHJlc3MnOiB7XG4gICAgICAgICAgICB0eXBlOiAnYWRkcmVzcydcbiAgICAgICAgfSxcbiAgICAgICAgJ2Zyb20nOiB7XG4gICAgICAgICAgICB0eXBlOiAnYWRkcmVzcydcbiAgICAgICAgfVxuICAgIH0pO1xuXG4gICAgZXhwZWN0LmFsbChjb25maWcsIHtcbiAgICAgICAgJ3dlYjMnOiB7XG4gICAgICAgICAgICB0eXBlOiAnb2JqZWN0JyxcbiAgICAgICAgICAgIGNvZGU6IFdFQjNfUkVRVUlSRURcbiAgICAgICAgfSxcbiAgICAgICAgJ2NvbnRyYWN0cy5Xb3JrZXJOb2RlLmFiaSc6IHtcbiAgICAgICAgICAgIHR5cGU6ICdvYmplY3QnLFxuICAgICAgICAgICAgY29kZTogQ09OVFJBQ1RfUkVRVUlSRUQsXG4gICAgICAgICAgICBhcmdzOiBbJ1dvcmtlck5vZGUnXVxuICAgICAgICB9XG4gICAgfSk7XG5cbiAgICBjb25zdCB3cm4gPSBuZXcgY29uZmlnLndlYjMuZXRoLkNvbnRyYWN0KGNvbmZpZy5jb250cmFjdHMuV29ya2VyTm9kZS5hYmksIHdvcmtlck5vZGVBZGRyZXNzKTtcbiAgICBjb25zdCBnYXNQcmljZSA9IGF3YWl0IGNvbmZpZy53ZWIzLmV0aC5nZXRHYXNQcmljZSgpO1xuICAgIHdybi5tZXRob2RzXG4gICAgICAgIC5hbGl2ZSgpXG4gICAgICAgIC5zZW5kKHtcbiAgICAgICAgICAgIGZyb20sXG4gICAgICAgICAgICBnYXNQcmljZSxcbiAgICAgICAgICAgIGdhczogNjcwMDAwMFxuICAgICAgICB9KVxuICAgICAgICAub24oJ2Vycm9yJywgcmVqZWN0KVxuICAgICAgICAub24oJ3JlY2VpcHQnLCByZWNlaXB0ID0+IHtcblxuICAgICAgICAgICAgaWYgKE51bWJlcihyZWNlaXB0LnN0YXR1cykgPT09IDApIHtcblxuICAgICAgICAgICAgICAgIHJldHVybiByZWplY3QocGpzRXJyb3IoVFJBTlNBQ1RJT05fVU5TVUNDRVNTRlVMKSk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHJlc29sdmUocmVjZWlwdCk7XG4gICAgICAgIH0pO1xufSk7XG4iXX0=