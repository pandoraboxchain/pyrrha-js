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
exports.alive = exports.eventWorkerNodeStateChanged = exports.eventWorkerNodeCreated = exports.fetchIdleCount = exports.fetchAll = exports.fetchWorkerById = exports.fetchWorker = exports.fetchActiveJobAddress = exports.fetchState = exports.fetchAddressById = exports.fetchCount = void 0;

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
    jobState = await (0, _jobs.fetchState)(activeJob, config);
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
 * Handle event WorkerNodeCreated
 * 
 * @param {Object} options Event handler options
 * @param {Object} config Library config (provided by the proxy but can be overridden)
 * @returns {Object} Object with chained callbacks #data and #error
 */


exports.fetchIdleCount = fetchIdleCount;

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
  chain.event = pan.events.WorkerNodeCreated(options).on('data', async res => {
    try {
      const worker = await fetchWorker(res.returnValues.workerNode, config);
      callbacks.onData({
        address: res.returnValues.workerNode,
        worker,
        status: 'created',
        event: 'Pandora.WorkerNodeCreated'
      });
    } catch (err) {
      callbacks.onError(err);
    }
  }).on('error', callbacks.onError);
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
  chain.event = wor.events.StateChanged(options).on('data', async res => {
    try {
      const worker = await fetchWorker(res.returnValues.workerNode, config);
      callbacks.onData({
        address: res.returnValues.workerNode,
        worker,
        status: 'changed',
        event: 'WorkerNode.StateChanged'
      });
    } catch (err) {
      callbacks.onError(err);
    }
  }).on('error', callbacks.onError);
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

const alive = (workerNodeAddress, from, config = {}) => new Promise((resolve, reject) => {
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
  wrn.methods.alive().send({
    from,
    gas: 6700000
  }).on('error', reject).on('receipt', receipt => {
    if (Number(receipt.status) === 0) {
      return reject((0, _errors.default)(_errors.TRANSACTION_UNSUCCESSFUL));
    }

    resolve(receipt);
  });
});

exports.alive = alive;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy93b3JrZXJzLmpzIl0sIm5hbWVzIjpbImZldGNoQ291bnQiLCJjb25maWciLCJleHBlY3QiLCJhbGwiLCJ0eXBlIiwiY29kZSIsIldFQjNfUkVRVUlSRUQiLCJDT05UUkFDVF9SRVFVSVJFRCIsImFyZ3MiLCJBRERSRVNTX1JFUVVJUkVEIiwicGFuIiwid2ViMyIsImV0aCIsIkNvbnRyYWN0IiwiY29udHJhY3RzIiwiUGFuZG9yYSIsImFiaSIsImFkZHJlc3NlcyIsImNvdW50IiwibWV0aG9kcyIsIndvcmtlck5vZGVzQ291bnQiLCJjYWxsIiwiTnVtYmVyIiwicGFyc2VJbnQiLCJmZXRjaEFkZHJlc3NCeUlkIiwiaWQiLCJhZGRyZXNzIiwid29ya2VyTm9kZXMiLCJTdHJpbmciLCJmZXRjaFN0YXRlIiwid29yIiwiV29ya2VyTm9kZSIsInN0YXRlIiwiY3VycmVudFN0YXRlIiwiZmV0Y2hBY3RpdmVKb2JBZGRyZXNzIiwiYWN0aXZlSm9iIiwiZmV0Y2hXb3JrZXIiLCJQcm9taXNlIiwiY3VycmVudEpvYiIsImpvYlN0YXRlIiwiY3VycmVudEpvYlN0YXR1cyIsImZldGNoV29ya2VyQnlJZCIsIndvcmtlciIsImZldGNoQWxsIiwicmVjb3JkcyIsImVycm9yIiwiaSIsInB1c2giLCJlcnIiLCJtZXNzYWdlIiwiZmV0Y2hJZGxlQ291bnQiLCJyZWR1Y2UiLCJhY2MiLCJjdXJyIiwiZXZlbnRXb3JrZXJOb2RlQ3JlYXRlZCIsIm9wdGlvbnMiLCJjYWxsYmFja3MiLCJvbkRhdGEiLCJvbkVycm9yIiwiY2hhaW4iLCJkYXRhIiwiY2IiLCJldmVudCIsImV2ZW50cyIsIldvcmtlck5vZGVDcmVhdGVkIiwib24iLCJyZXMiLCJyZXR1cm5WYWx1ZXMiLCJ3b3JrZXJOb2RlIiwic3RhdHVzIiwiZXZlbnRXb3JrZXJOb2RlU3RhdGVDaGFuZ2VkIiwiU3RhdGVDaGFuZ2VkIiwiYWxpdmUiLCJ3b3JrZXJOb2RlQWRkcmVzcyIsImZyb20iLCJyZXNvbHZlIiwicmVqZWN0Iiwid3JuIiwic2VuZCIsImdhcyIsInJlY2VpcHQiLCJUUkFOU0FDVElPTl9VTlNVQ0NFU1NGVUwiXSwibWFwcGluZ3MiOiJBQUFBOzs7Ozs7OztBQVNBOzs7Ozs7O0FBRUE7O0FBQ0E7O0FBT0E7Ozs7Ozs7O0FBRUE7Ozs7OztBQU1PLE1BQU1BLGFBQWEsT0FBT0MsU0FBUyxFQUFoQixLQUF1QjtBQUU3Q0MsU0FBT0MsR0FBUCxDQUFXRixNQUFYLEVBQW1CO0FBQ2YsWUFBUTtBQUNKRyxZQUFNLFFBREY7QUFFSkMsWUFBTUM7QUFGRixLQURPO0FBS2YsNkJBQXlCO0FBQ3JCRixZQUFNLFFBRGU7QUFFckJDLFlBQU1FLHlCQUZlO0FBR3JCQyxZQUFNLENBQUMsU0FBRDtBQUhlLEtBTFY7QUFVZix5QkFBcUI7QUFDakJKLFlBQU0sU0FEVztBQUVqQkMsWUFBTUksd0JBRlc7QUFHakJELFlBQU0sQ0FBQyxTQUFEO0FBSFc7QUFWTixHQUFuQjtBQWlCQSxRQUFNRSxNQUFNLElBQUlULE9BQU9VLElBQVAsQ0FBWUMsR0FBWixDQUFnQkMsUUFBcEIsQ0FBNkJaLE9BQU9hLFNBQVAsQ0FBaUJDLE9BQWpCLENBQXlCQyxHQUF0RCxFQUEyRGYsT0FBT2dCLFNBQVAsQ0FBaUJGLE9BQTVFLENBQVo7QUFDQSxRQUFNRyxRQUFRLE1BQU1SLElBQUlTLE9BQUosQ0FDZkMsZ0JBRGUsR0FFZkMsSUFGZSxFQUFwQjtBQUlBLFNBQU9DLE9BQU9DLFFBQVAsQ0FBZ0JMLEtBQWhCLEVBQXVCLEVBQXZCLENBQVA7QUFDSCxDQXpCTTtBQTJCUDs7Ozs7Ozs7Ozs7QUFPTyxNQUFNTSxtQkFBbUIsT0FBT0MsRUFBUCxFQUFXeEIsU0FBUyxFQUFwQixLQUEyQjtBQUV2REMsU0FBT0MsR0FBUCxDQUFXO0FBQUVzQjtBQUFGLEdBQVgsRUFBbUI7QUFDZixVQUFNO0FBQ0ZyQixZQUFNO0FBREo7QUFEUyxHQUFuQjtBQU1BRixTQUFPQyxHQUFQLENBQVdGLE1BQVgsRUFBbUI7QUFDZixZQUFRO0FBQ0pHLFlBQU0sUUFERjtB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QURFO0FBRUZLLFNBQUs7QUFGSCxHQUZWLEVBTUtkLEVBTkwsQ0FNUSxPQU5SLEVBTWlCVyxNQU5qQixFQU9LWCxFQVBMLENBT1EsU0FQUixFQU9tQmUsV0FBVztBQUV0QixRQUFJMUQsT0FBTzBELFFBQVFYLE1BQWYsTUFBMkIsQ0FBL0IsRUFBa0M7QUFFOUIsYUFBT08sT0FBTyxxQkFBU0ssZ0NBQVQsQ0FBUCxDQUFQO0FBQ0g7O0FBRUROLFlBQVFLLE9BQVI7QUFDSCxHQWZMO0FBZ0JILENBeEM4RCxDQUF4RCIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogV29ya2VyTm9kZXMgcmVsYXRlZCBtZXRob2RzXG4gKiBUaGlzIGZpbGUgaXQgaXMgYSBwYXJ0IG9mIHRoZSBQYW5kb3JhIFB5cnJoYSBKYXZhc2NyaXB0IGxpYnJhcnlcbiAqIFxuICogQGZpbGUgd29ya2Vycy5qc1xuICogQGF1dGhvciBLb3N0aWFudHluIFNteXJub3YgPGtvc3R5c2hAZ21haWwuY29tPlxuICogQGRhdGUgMjAxOFxuICovXG5cbid1c2Ugc3RyaWN0JztcblxuaW1wb3J0ICogYXMgZXhwZWN0IGZyb20gJy4vaGVscGVycy9leHBlY3QnO1xuaW1wb3J0IHBqc0Vycm9yLCB7XG4gICAgQ09OVFJBQ1RfUkVRVUlSRUQsXG4gICAgQUREUkVTU19SRVFVSVJFRCxcbiAgICBXRUIzX1JFUVVJUkVELFxuICAgIFRSQU5TQUNUSU9OX1VOU1VDQ0VTU0ZVTFxufSBmcm9tICcuL2hlbHBlcnMvZXJyb3JzJztcblxuaW1wb3J0IHsgZmV0Y2hTdGF0ZSBhcyBmZXRjaEpvYlN0YXRlIH0gZnJvbSAnLi9qb2JzJztcblxuLyoqXG4gKiBHZXQgd29ya2VyIG5vZGVzIGNvdW50IGZyb20gUGFuZG9yYSBjb250cmFjdFxuICogXG4gKiBAcGFyYW0ge09iamVjdH0gY29uZmlnIExpYnJhcnkgY29uZmlnIChwcm92aWRlZCBieSB0aGUgcHJveHkgYnV0IGNhbiBiZSBvdmVycmlkZGVuKVxuICogQHJldHVybnMge1Byb21pc2V9IEEgUHJvbWlzZSBvYmplY3QgcmVwcmVzZW50cyB0aGUge251bWJlcn0gXG4gKi9cbmV4cG9ydCBjb25zdCBmZXRjaENvdW50ID0gYXN5bmMgKGNvbmZpZyA9IHt9KSA9PiB7XG5cbiAgICBleHBlY3QuYWxsKGNvbmZpZywge1xuICAgICAgICAnd2ViMyc6IHtcbiAgICAgICAgICAgIHR5cGU6ICdvYmplY3QnLFxuICAgICAgICAgICAgY29kZTogV0VCM19SRVFVSVJFRFxuICAgICAgICB9LFxuICAgICAgICAnY29udHJhY3RzLlBhbmRvcmEuYWJpJzoge1xuICAgICAgICAgICAgdHlwZTogJ29iamVjdCcsXG4gICAgICAgICAgICBjb2RlOiBDT05UUkFDVF9SRVFVSVJFRCxcbiAgICAgICAgICAgIGFyZ3M6IFsnUGFuZG9yYSddXG4gICAgICAgIH0sXG4gICAgICAgICdhZGRyZXNzZXMuUGFuZG9yYSc6IHtcbiAgICAgICAgICAgIHR5cGU6ICdhZGRyZXNzJyxcbiAgICAgICAgICAgIGNvZGU6IEFERFJFU1NfUkVRVUlSRUQsXG4gICAgICAgICAgICBhcmdzOiBbJ1BhbmRvcmEnXVxuICAgICAgICB9XG4gICAgfSk7XG5cbiAgICBjb25zdCBwYW4gPSBuZXcgY29uZmlnLndlYjMuZXRoLkNvbnRyYWN0KGNvbmZpZy5jb250cmFjdHMuUGFuZG9yYS5hYmksIGNvbmZpZy5hZGRyZXNzZXMuUGFuZG9yYSk7XG4gICAgY29uc3QgY291bnQgPSBhd2FpdCBwYW4ubWV0aG9kc1xuICAgICAgICAud29ya2VyTm9kZXNDb3VudCgpXG4gICAgICAgIC5jYWxsKCk7XG5cbiAgICByZXR1cm4gTnVtYmVyLnBhcnNlSW50KGNvdW50LCAxMCk7XG59O1xuXG4vKipcbiAqIEdldCB3b3JrZXIgYWRkcmVzcyBmcm9tIFBhbmRvcmEgY29udHJhY3QgYnkgdGhlIHdvcmtlciBJZFxuICogXG4gKiBAcGFyYW0ge2ludGVnZXJ9IGlkIFdvcmtlciBJZFxuICogQHBhcmFtIHtPYmplY3R9IGNvbmZpZyBMaWJyYXJ5IGNvbmZpZyAocHJvdmlkZWQgYnkgdGhlIHByb3h5IGJ1dCBjYW4gYmUgb3ZlcnJpZGRlbilcbiAqIEByZXR1cm5zIHtQcm9taXNlfSBBIFByb21pc2Ugb2JqZWN0IHJlcHJlc2VudHMgdGhlIHtzdHJpbmd9IFxuICovXG5leHBvcnQgY29uc3QgZmV0Y2hBZGRyZXNzQnlJZCA9IGFzeW5jIChpZCwgY29uZmlnID0ge30pID0+IHtcblxuICAgIGV4cGVjdC5hbGwoeyBpZCB9LCB7XG4gICAgICAgICdpZCc6IHtcbiAgICAgICAgICAgIHR5cGU6ICdudW1iZXInXG4gICAgICAgIH1cbiAgICB9KTtcblxuICAgIGV4cGVjdC5hbGwoY29uZmlnLCB7XG4gICAgICAgICd3ZWIzJzoge1xuICAgICAgICAgICAgdHlwZTogJ29iamVjdCcsXG4gICAgICAgICAgICBjb2RlOiBXRUIzX1JFUVVJUkVEXG4gICAgICAgIH0sXG4gICAgICAgICdjb250cmFjdHMuUGFuZG9yYS5hYmknOiB7XG4gICAgICAgICAgICB0eXBlOiAnb2JqZWN0JyxcbiAgICAgICAgICAgIGNvZGU6IENPTlRSQUNUX1JFUVVJUkVELFxuICAgICAgICAgICAgYXJnczogWydQYW5kb3JhJ11cbiAgICAgICAgfSxcbiAgICAgICAgJ2FkZHJlc3Nlcy5QYW5kb3JhJzoge1xuICAgICAgICAgICAgdHlwZTogJ2FkZHJlc3MnLFxuICAgICAgICAgICAgY29kZTogQUREUkVTU19SRVFVSVJFRCxcbiAgICAgICAgICAgIGFyZ3M6IFsnUGFuZG9yYSddXG4gICAgICAgIH1cbiAgICB9KTtcblxuICAgIGNvbnN0IHBhbiA9IG5ldyBjb25maWcud2ViMy5ldGguQ29udHJhY3QoY29uZmlnLmNvbnRyYWN0cy5QYW5kb3JhLmFiaSwgY29uZmlnLmFkZHJlc3Nlcy5QYW5kb3JhKTtcbiAgICBjb25zdCBhZGRyZXNzID0gYXdhaXQgcGFuLm1ldGhvZHNcbiAgICAgICAgLndvcmtlck5vZGVzKGlkKVxuICAgICAgICAuY2FsbCgpO1xuXG4gICAgcmV0dXJuIFN0cmluZyhhZGRyZXNzKTtcbn07XG5cbi8qKlxuICogR2V0IHdvcmtlciBzdGF0ZSBmcm9tIFdvcmtlciBjb250cmFjdCBieSB0aGUgd29ya2VyIGFkZHJlc3NcbiAqIFxuICogQHBhcmFtIHtzdHJpbmd9IGFkZHJlc3MgXG4gKiBAcGFyYW0ge09iamVjdH0gY29uZmlnIExpYnJhcnkgY29uZmlnIChwcm92aWRlZCBieSB0aGUgcHJveHkgYnV0IGNhbiBiZSBvdmVycmlkZGVuKVxuICogQHJldHVybnMge1Byb21pc2V9IEEgUHJvbWlzZSBvYmplY3QgcmVwcmVzZW50cyB0aGUge251bWJlcn1cbiAqL1xuZXhwb3J0IGNvbnN0IGZldGNoU3RhdGUgPSBhc3luYyAoYWRkcmVzcyA9ICcnLCBjb25maWcgPSB7fSkgPT4ge1xuXG4gICAgZXhwZWN0LmFsbCh7IGFkZHJlc3MgfSwge1xuICAgICAgICAnYWRkcmVzcyc6IHtcbiAgICAgICAgICAgIHR5cGU6ICdhZGRyZXNzJ1xuICAgICAgICB9XG4gICAgfSk7XG5cbiAgICBleHBlY3QuYWxsKGNvbmZpZywge1xuICAgICAgICAnd2ViMyc6IHtcbiAgICAgICAgICAgIHR5cGU6ICdvYmplY3QnLFxuICAgICAgICAgICAgY29kZTogV0VCM19SRVFVSVJFRFxuICAgICAgICB9LFxuICAgICAgICAnY29udHJhY3RzLldvcmtlck5vZGUuYWJpJzoge1xuICAgICAgICAgICAgdHlwZTogJ29iamVjdCcsXG4gICAgICAgICAgICBjb2RlOiBDT05UUkFDVF9SRVFVSVJFRCxcbiAgICAgICAgICAgIGFyZ3M6IFsnV29ya2VyTm9kZSddXG4gICAgICAgIH1cbiAgICB9KTtcblxuICAgIGNvbnN0IHdvciA9IG5ldyBjb25maWcud2ViMy5ldGguQ29udHJhY3QoY29uZmlnLmNvbnRyYWN0cy5Xb3JrZXJOb2RlLmFiaSwgYWRkcmVzcyk7ICAgIFxuICAgIGNvbnN0IHN0YXRlID0gYXdhaXQgd29yLm1ldGhvZHNcbiAgICAgICAgLmN1cnJlbnRTdGF0ZSgpXG4gICAgICAgIC5jYWxsKCk7XG5cbiAgICByZXR1cm4gTnVtYmVyLnBhcnNlSW50KHN0YXRlLCAxMCk7XG59O1xuXG4vKipcbiAqIEdldCB3b3JrZXIncyBhY3RpdmUgam9iIGZyb20gV29ya2VyIGNvbnRyYWN0IGJ5IHRoZSB3b3JrZXIgYWRkcmVzc1xuICogXG4gKiBAcGFyYW0ge3N0cmluZ30gYWRkcmVzcyBcbiAqIEBwYXJhbSB7T2JqZWN0fSBjb25maWcgTGlicmFyeSBjb25maWcgKHByb3ZpZGVkIGJ5IHRoZSBwcm94eSBidXQgY2FuIGJlIG92ZXJyaWRkZW4pXG4gKiBAcmV0dXJucyB7UHJvbWlzZX0gQSBQcm9taXNlIG9iamVjdCByZXByZXNlbnRzIHRoZSB7c3RyaW5nfVxuICovXG5leHBvcnQgY29uc3QgZmV0Y2hBY3RpdmVKb2JBZGRyZXNzID0gYXN5bmMgKGFkZHJlc3MgPSAnJywgY29uZmlnID0ge30pID0+IHtcblxuICAgIGV4cGVjdC5hbGwoeyBhZGRyZXNzIH0sIHtcbiAgICAgICAgJ2FkZHJlc3MnOiB7XG4gICAgICAgICAgICB0eXBlOiAnYWRkcmVzcydcbiAgICAgICAgfVxuICAgIH0pO1xuXG4gICAgZXhwZWN0LmFsbChjb25maWcsIHtcbiAgICAgICAgJ3dlYjMnOiB7XG4gICAgICAgICAgICB0eXBlOiAnb2JqZWN0JyxcbiAgICAgICAgICAgIGNvZGU6IFdFQjNfUkVRVUlSRURcbiAgICAgICAgfSxcbiAgICAgICAgJ2NvbnRyYWN0cy5Xb3JrZXJOb2RlLmFiaSc6IHtcbiAgICAgICAgICAgIHR5cGU6ICdvYmplY3QnLFxuICAgICAgICAgICAgY29kZTogQ09OVFJBQ1RfUkVRVUlSRUQsXG4gICAgICAgICAgICBhcmdzOiBbJ1dvcmtlck5vZGUnXVxuICAgICAgICB9XG4gICAgfSk7XG5cbiAgICBjb25zdCB3b3IgPSBuZXcgY29uZmlnLndlYjMuZXRoLkNvbnRyYWN0KGNvbmZpZy5jb250cmFjdHMuV29ya2VyTm9kZS5hYmksIGFkZHJlc3MpO1xuICAgIGNvbnN0IGFjdGl2ZUpvYiA9IGF3YWl0IHdvci5tZXRob2RzXG4gICAgICAgIC5hY3RpdmVKb2IoKVxuICAgICAgICAuY2FsbCgpO1xuXG4gICAgcmV0dXJuIFN0cmluZyhhY3RpdmVKb2IsIDEwKTtcbn07XG5cbi8qKlxuICogR2V0IHdvcmtlciBieSB0aGUgd29ya2VyJ3MgYWRkcmVzc1xuICogXG4gKiBAcGFyYW0ge3N0cmluZ30gYWRkcmVzc1xuICogQHBhcmFtIHtPYmplY3R9IGNvbmZpZyBMaWJyYXJ5IGNvbmZpZyAocHJvdmlkZWQgYnkgdGhlIHByb3h5IGJ1dCBjYW4gYmUgb3ZlcnJpZGRlbilcbiAqIEByZXR1cm5zIHtQcm9taXNlfSBBIFByb21pc2Ugb2JqZWN0IHJlcHJlc2VudHMgdGhlIHtPYmplY3R9XG4gKi9cbmV4cG9ydCBjb25zdCBmZXRjaFdvcmtlciA9IGFzeW5jIChhZGRyZXNzID0gJycsIGNvbmZpZyA9IHt9KSA9PiB7XG4gICAgXG4gICAgY29uc3QgW1xuICAgICAgICBjdXJyZW50U3RhdGUsXG4gICAgICAgIGFjdGl2ZUpvYlxuICAgIF0gPSBhd2FpdCBQcm9taXNlLmFsbChbXG4gICAgICAgIGZldGNoU3RhdGUoYWRkcmVzcywgY29uZmlnKSxcbiAgICAgICAgZmV0Y2hBY3RpdmVKb2JBZGRyZXNzKGFkZHJlc3MsIGNvbmZpZylcbiAgICBdKTtcblxuXG4gICAgbGV0IGN1cnJlbnRKb2IgPSBhY3RpdmVKb2I7XG4gICAgbGV0IGpvYlN0YXRlOyAgICBcblxuICAgIC8vIENoZWNrIGlzIG5vdCAweDBcbiAgICBpZiAoK2FjdGl2ZUpvYiAhPT0gMCkge1xuXG4gICAgICAgIGpvYlN0YXRlID0gYXdhaXQgZmV0Y2hKb2JTdGF0ZShhY3RpdmVKb2IsIGNvbmZpZyk7XG4gICAgfSBlbHNlIHtcbiAgICAgICAgY3VycmVudEpvYiA9IG51bGw7XG4gICAgICAgIGpvYlN0YXRlID0gLTE7XG4gICAgfVxuXG4gICAgcmV0dXJuIHtcbiAgICAgICAgYWRkcmVzcyxcbiAgICAgICAgY3VycmVudFN0YXRlLFxuICAgICAgICBjdXJyZW50Sm9iLFxuICAgICAgICBjdXJyZW50Sm9iU3RhdHVzOiBqb2JTdGF0ZVxuICAgIH07XG59O1xuXG4vKipcbiAqIEdldCB3b3JrZXIgYnkgdGhlIHdvcmtlcidzIGlkXG4gKiBcbiAqIEBwYXJhbSB7aW50ZWdlcn0gaWQgXG4gKiBAcGFyYW0ge09iamVjdH0gY29uZmlnIExpYnJhcnkgY29uZmlnIChwcm92aWRlZCBieSB0aGUgcHJveHkgYnV0IGNhbiBiZSBvdmVycmlkZGVuKVxuICogQHJldHVybnMge1Byb21pc2V9IEEgUHJvbWlzZSBvYmplY3QgcmVwcmVzZW50cyB0aGUge09iamVjdH1cbiAqL1xuZXhwb3J0IGNvbnN0IGZldGNoV29ya2VyQnlJZCA9IGFzeW5jIChpZCwgY29uZmlnID0ge30pID0+IHtcbiAgICBcbiAgICBjb25zdCBhZGRyZXNzID0gYXdhaXQgZmV0Y2hBZGRyZXNzQnlJZChpZCwgY29uZmlnKTtcbiAgICBjb25zdCB3b3JrZXIgPSBhd2FpdCBmZXRjaFdvcmtlcihhZGRyZXNzLCBjb25maWcpO1xuXG4gICAgcmV0dXJuIHtcbiAgICAgICAgaWQ6IGlkLFxuICAgICAgICAuLi53b3JrZXJcbiAgICB9O1xufTtcblxuLyoqXG4gKiBHZXQgYWxsIHdvcmtlcnNcbiAqIFxuICogQHBhcmFtIHtPYmplY3R9IGNvbmZpZyBMaWJyYXJ5IGNvbmZpZyAocHJvdmlkZWQgYnkgdGhlIHByb3h5IGJ1dCBjYW4gYmUgb3ZlcnJpZGRlbilcbiAqIEByZXR1cm5zIHtQcm9taXNlfSBBIFByb21pc2Ugb2JqZWN0IHJlcHJlc2VudHMgdGhlIHtudW1iZXJ9XG4gKi9cbmV4cG9ydCBjb25zdCBmZXRjaEFsbCA9IGFzeW5jIChjb25maWcgPSB7fSkgPT4ge1xuICAgIGxldCByZWNvcmRzID0gW107XG4gICAgbGV0IGVycm9yID0gW107XG5cbiAgICB0cnkge1xuXG4gICAgICAgIGNvbnN0IGNvdW50ID0gYXdhaXQgZmV0Y2hDb3VudChjb25maWcpOyAgICBcblxuICAgICAgICBmb3IgKGxldCBpPTA7IGkgPCBjb3VudDsgaSsrKSB7XG4gICAgICAgICAgICBcbiAgICAgICAgICAgIHRyeSB7XG5cbiAgICAgICAgICAgICAgICBjb25zdCB3b3JrZXIgPSBhd2FpdCBmZXRjaFdvcmtlckJ5SWQoaSwgY29uZmlnKTtcblxuICAgICAgICAgICAgICAgIHJlY29yZHMucHVzaCh7XG4gICAgICAgICAgICAgICAgICAgIGlkOiBpLFxuICAgICAgICAgICAgICAgICAgICAuLi53b3JrZXJcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH0gY2F0Y2goZXJyKSB7XG4gICAgICAgICAgICAgICAgZXJyb3IucHVzaCh7XG4gICAgICAgICAgICAgICAgICAgIGlkOiBpLFxuICAgICAgICAgICAgICAgICAgICBtZXNzYWdlOiBlcnIubWVzc2FnZVxuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfSAgICAgICAgXG4gICAgICAgIH1cbiAgICB9IGNhdGNoKGVycikge1xuICAgICAgICBlcnJvci5wdXNoKHtcbiAgICAgICAgICAgIGVycm9yOiBlcnIubWVzc2FnZVxuICAgICAgICB9KTtcbiAgICB9ICAgXG5cbiAgICByZXR1cm4ge1xuICAgICAgICByZWNvcmRzLFxuICAgICAgICBlcnJvclxuICAgIH07XG59O1xuXG4vKipcbiAqIEdldCBjb3VudCBvZiB3b3JrZXJzIHdpdGggXCJpZGxlXCIgc3RhdHVzXG4gKiBcbiAqIEBwYXJhbSB7T2JqZWN0fSBjb25maWcgTGlicmFyeSBjb25maWcgKHByb3ZpZGVkIGJ5IHRoZSBwcm94eSBidXQgY2FuIGJlIG92ZXJyaWRkZW4pXG4gKiBAcmV0dXJucyB7UHJvbWlzZX0gQSBQcm9taXNlIG9iamVjdCByZXByZXNlbnRzIHRoZSB7bnVtYmVyfVxuICovXG5leHBvcnQgY29uc3QgZmV0Y2hJZGxlQ291bnQgPSBhc3luYyAoY29uZmlnID0ge30pID0+IHtcbiAgICBjb25zdCBhbGwgPSBhd2FpdCBmZXRjaEFsbChjb25maWcpO1xuICAgIHJldHVybiBhbGwucmVjb3Jkcy5yZWR1Y2UoKGFjYywgY3VycikgPT4gKGN1cnIuY3VycmVudFN0YXRlID09PSAyID8gYWNjKzEgOiBhY2MpLCAwKTtcbn07XG5cbi8qKlxuICogSGFuZGxlIGV2ZW50IFdvcmtlck5vZGVDcmVhdGVkXG4gKiBcbiAqIEBwYXJhbSB7T2JqZWN0fSBvcHRpb25zIEV2ZW50IGhhbmRsZXIgb3B0aW9uc1xuICogQHBhcmFtIHtPYmplY3R9IGNvbmZpZyBMaWJyYXJ5IGNvbmZpZyAocHJvdmlkZWQgYnkgdGhlIHByb3h5IGJ1dCBjYW4gYmUgb3ZlcnJpZGRlbilcbiAqIEByZXR1cm5zIHtPYmplY3R9IE9iamVjdCB3aXRoIGNoYWluZWQgY2FsbGJhY2tzICNkYXRhIGFuZCAjZXJyb3JcbiAqL1xuZXhwb3J0IGNvbnN0IGV2ZW50V29ya2VyTm9kZUNyZWF0ZWQgPSAob3B0aW9ucyA9IHt9LCBjb25maWcgPSB7fSkgPT4ge1xuXG4gICAgZXhwZWN0LmFsbCh7IG9wdGlvbnMgfSwge1xuICAgICAgICAnb3B0aW9ucyc6IHtcbiAgICAgICAgICAgIHR5cGU6ICdvYmplY3QnXG4gICAgICAgIH1cbiAgICB9KTtcblxuICAgIGV4cGVjdC5hbGwoY29uZmlnLCB7XG4gICAgICAgICd3ZWIzJzoge1xuICAgICAgICAgICAgdHlwZTogJ29iamVjdCcsXG4gICAgICAgICAgICBjb2RlOiBXRUIzX1JFUVVJUkVEXG4gICAgICAgIH0sXG4gICAgICAgICdjb250cmFjdHMuUGFuZG9yYS5hYmknOiB7XG4gICAgICAgICAgICB0eXBlOiAnb2JqZWN0JyxcbiAgICAgICAgICAgIGNvZGU6IENPTlRSQUNUX1JFUVVJUkVELFxuICAgICAgICAgICAgYXJnczogWydQYW5kb3JhJ11cbiAgICAgICAgfSxcbiAgICAgICAgJ2FkZHJlc3Nlcy5QYW5kb3JhJzoge1xuICAgICAgICAgICAgdHlwZTogJ2FkZHJlc3MnLFxuICAgICAgICAgICAgY29kZTogQUREUkVTU19SRVFVSVJFRCxcbiAgICAgICAgICAgIGFyZ3M6IFsnUGFuZG9yYSddXG4gICAgICAgIH1cbiAgICB9KTtcblxuICAgIGNvbnN0IGNhbGxiYWNrcyA9IHtcbiAgICAgICAgb25EYXRhOiAoKSA9PiB7fSxcbiAgICAgICAgb25FcnJvcjogKCkgPT4ge31cbiAgICB9O1xuXG4gICAgY29uc3QgY2hhaW4gPSB7XG4gICAgICAgIGRhdGE6IChjYiA9ICgpID0+IHt9KSA9PiB7XG4gICAgICAgICAgICBjYWxsYmFja3Mub25EYXRhID0gY2I7XG4gICAgICAgICAgICByZXR1cm4gY2hhaW47XG4gICAgICAgIH0sXG4gICAgICAgIGVycm9yOiAoY2IgPSAoKSA9PiB7fSkgPT4ge1xuICAgICAgICAgICAgY2FsbGJhY2tzLm9uRXJyb3IgPSBjYjtcbiAgICAgICAgICAgIHJldHVybiBjaGFpbjtcbiAgICAgICAgfVxuICAgIH07XG5cbiAgICBjb25zdCBwYW4gPSBuZXcgY29uZmlnLndlYjMuZXRoLkNvbnRyYWN0KGNvbmZpZy5jb250cmFjdHMuUGFuZG9yYS5hYmksIGNvbmZpZy5hZGRyZXNzZXMuUGFuZG9yYSk7XG4gICAgY2hhaW4uZXZlbnQgPSBwYW4uZXZlbnRzLldvcmtlck5vZGVDcmVhdGVkKG9wdGlvbnMpXG4gICAgICAgIC5vbignZGF0YScsIGFzeW5jIHJlcyA9PiB7XG5cbiAgICAgICAgICAgIHRyeSB7XG5cbiAgICAgICAgICAgICAgICBjb25zdCB3b3JrZXIgPSBhd2FpdCBmZXRjaFdvcmtlcihyZXMucmV0dXJuVmFsdWVzLndvcmtlck5vZGUsIGNvbmZpZyk7XG4gICAgICAgICAgICAgICAgY2FsbGJhY2tzLm9uRGF0YSh7XG4gICAgICAgICAgICAgICAgICAgIGFkZHJlc3M6IHJlcy5yZXR1cm5WYWx1ZXMud29ya2VyTm9kZSxcbiAgICAgICAgICAgICAgICAgICAgd29ya2VyLFxuICAgICAgICAgICAgICAgICAgICBzdGF0dXM6ICdjcmVhdGVkJyxcbiAgICAgICAgICAgICAgICAgICAgZXZlbnQ6ICdQYW5kb3JhLldvcmtlck5vZGVDcmVhdGVkJ1xuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfSBjYXRjaChlcnIpIHtcbiAgICAgICAgICAgICAgICBjYWxsYmFja3Mub25FcnJvcihlcnIpO1xuICAgICAgICAgICAgfSAgICAgICAgICAgIFxuICAgICAgICB9KVxuICAgICAgICAub24oJ2Vycm9yJywgY2FsbGJhY2tzLm9uRXJyb3IpO1xuXG4gICAgcmV0dXJuIGNoYWluO1xufTtcblxuLyoqXG4gKiBIYW5kbGUgZXZlbnQgU3RhdGVDaGFuZ2VkIGZvciBXb3JrZXJOb2RlXG4gKiBcbiAqIEBwYXJhbSB7U3RyaW5nfSBhZGRyZXNzXG4gKiBAcGFyYW0ge09iamVjdH0gb3B0aW9uc1xuICogQHBhcmFtIHtPYmplY3R9IGNvbmZpZyBMaWJyYXJ5IGNvbmZpZyAocHJvdmlkZWQgYnkgdGhlIHByb3h5IGJ1dCBjYW4gYmUgb3ZlcnJpZGRlbilcbiAqIEByZXR1cm5zIHtPYmplY3R9IE9iamVjdCB3aXRoIGNoYWluZWQgY2FsbGJhY2tzICNkYXRhIGFuZCAjZXJyb3JcbiAqL1xuZXhwb3J0IGNvbnN0IGV2ZW50V29ya2VyTm9kZVN0YXRlQ2hhbmdlZCA9IChhZGRyZXNzID0gJycsIG9wdGlvbnMgPSB7fSwgY29uZmlnID0ge30pID0+IHtcblxuICAgIGV4cGVjdC5hbGwoeyBhZGRyZXNzIH0sIHtcbiAgICAgICAgJ2FkZHJlc3MnOiB7XG4gICAgICAgICAgICB0eXBlOiAnYWRkcmVzcydcbiAgICAgICAgfVxuICAgIH0pO1xuXG4gICAgZXhwZWN0LmFsbChjb25maWcsIHtcbiAgICAgICAgJ3dlYjMnOiB7XG4gICAgICAgICAgICB0eXBlOiAnb2JqZWN0JyxcbiAgICAgICAgICAgIGNvZGU6IFdFQjNfUkVRVUlSRURcbiAgICAgICAgfSxcbiAgICAgICAgJ2NvbnRyYWN0cy5Xb3JrZXJOb2RlLmFiaSc6IHtcbiAgICAgICAgICAgIHR5cGU6ICdvYmplY3QnLFxuICAgICAgICAgICAgY29kZTogQ09OVFJBQ1RfUkVRVUlSRUQsXG4gICAgICAgICAgICBhcmdzOiBbJ1dvcmtlck5vZGUnXVxuICAgICAgICB9XG4gICAgfSk7XG5cbiAgICBjb25zdCBjYWxsYmFja3MgPSB7XG4gICAgICAgIG9uRGF0YTogKCkgPT4ge30sXG4gICAgICAgIG9uRXJyb3I6ICgpID0+IHt9XG4gICAgfTtcblxuICAgIGNvbnN0IGNoYWluID0ge1xuICAgICAgICBkYXRhOiAoY2IgPSAoKSA9PiB7fSkgPT4ge1xuICAgICAgICAgICAgY2FsbGJhY2tzLm9uRGF0YSA9IGNiO1xuICAgICAgICAgICAgcmV0dXJuIGNoYWluO1xuICAgICAgICB9LFxuICAgICAgICBlcnJvcjogKGNiID0gKCkgPT4ge30pID0+IHtcbiAgICAgICAgICAgIGNhbGxiYWNrcy5vbkVycm9yID0gY2I7XG4gICAgICAgICAgICByZXR1cm4gY2hhaW47XG4gICAgICAgIH1cbiAgICB9O1xuXG4gICAgY29uc3Qgd29yID0gbmV3IGNvbmZpZy53ZWIzLmV0aC5Db250cmFjdChjb25maWcuY29udHJhY3RzLldvcmtlck5vZGUuYWJpLCBhZGRyZXNzKTtcbiAgICBjaGFpbi5ldmVudCA9IHdvci5ldmVudHMuU3RhdGVDaGFuZ2VkKG9wdGlvbnMpXG4gICAgICAgIC5vbignZGF0YScsIGFzeW5jIHJlcyA9PiB7XG5cbiAgICAgICAgICAgIHRyeSB7XG5cbiAgICAgICAgICAgICAgICBjb25zdCB3b3JrZXIgPSBhd2FpdCBmZXRjaFdvcmtlcihyZXMucmV0dXJuVmFsdWVzLndvcmtlck5vZGUsIGNvbmZpZyk7XG4gICAgICAgICAgICAgICAgY2FsbGJhY2tzLm9uRGF0YSh7XG4gICAgICAgICAgICAgICAgICAgIGFkZHJlc3M6IHJlcy5yZXR1cm5WYWx1ZXMud29ya2VyTm9kZSxcbiAgICAgICAgICAgICAgICAgICAgd29ya2VyLFxuICAgICAgICAgICAgICAgICAgICBzdGF0dXM6ICdjaGFuZ2VkJyxcbiAgICAgICAgICAgICAgICAgICAgZXZlbnQ6ICdXb3JrZXJOb2RlLlN0YXRlQ2hhbmdlZCdcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH0gY2F0Y2goZXJyKSB7XG4gICAgICAgICAgICAgICAgY2FsbGJhY2tzLm9uRXJyb3IoZXJyKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSlcbiAgICAgICAgLm9uKCdlcnJvcicsIGNhbGxiYWNrcy5vbkVycm9yKTtcblxuICAgIHJldHVybiBjaGFpbjtcbn07XG5cbi8qKlxuICogVHJhbnNpdGlvbiBvZiBhIFdvcmtlck5vZGUgdG8gdGhlIElkbGUgc3RhdGVcbiAqIFxuICogQHBhcmFtIHtTdHJpbmd9IHdvcmtlck5vZGVBZGRyZXNzIFxuICogQHBhcmFtIHtTdHJpbmd9IGZyb21cbiAqIEBwYXJhbSB7T2JqZWN0fSBjb25maWcgTGlicmFyeSBjb25maWcgKHByb3ZpZGVkIGJ5IHRoZSBwcm94eSBidXQgY2FuIGJlIG92ZXJyaWRkZW4pXG4gKiBAcmV0dXJucyB7UHJvbWlzZX0gUHJvbWlzZSBvYmplY3QgcmVzb2x2ZWQgdG8gYWRkIHN0YXR1cyAoYm9vbGVhbilcbiAqL1xuZXhwb3J0IGNvbnN0IGFsaXZlID0gKHdvcmtlck5vZGVBZGRyZXNzLCBmcm9tLCBjb25maWcgPSB7fSkgPT4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuXG4gICAgZXhwZWN0LmFsbCh7IHdvcmtlck5vZGVBZGRyZXNzLCBmcm9tIH0sIHtcbiAgICAgICAgJ3dvcmtlck5vZGVBZGRyZXNzJzoge1xuICAgICAgICAgICAgdHlwZTogJ2FkZHJlc3MnXG4gICAgICAgIH0sXG4gICAgICAgICdmcm9tJzoge1xuICAgICAgICAgICAgdHlwZTogJ2FkZHJlc3MnXG4gICAgICAgIH1cbiAgICB9KTtcblxuICAgIGV4cGVjdC5hbGwoY29uZmlnLCB7XG4gICAgICAgICd3ZWIzJzoge1xuICAgICAgICAgICAgdHlwZTogJ29iamVjdCcsXG4gICAgICAgICAgICBjb2RlOiBXRUIzX1JFUVVJUkVEXG4gICAgICAgIH0sXG4gICAgICAgICdjb250cmFjdHMuV29ya2VyTm9kZS5hYmknOiB7XG4gICAgICAgICAgICB0eXBlOiAnb2JqZWN0JyxcbiAgICAgICAgICAgIGNvZGU6IENPTlRSQUNUX1JFUVVJUkVELFxuICAgICAgICAgICAgYXJnczogWydXb3JrZXJOb2RlJ11cbiAgICAgICAgfVxuICAgIH0pO1xuXG4gICAgY29uc3Qgd3JuID0gbmV3IGNvbmZpZy53ZWIzLmV0aC5Db250cmFjdChjb25maWcuY29udHJhY3RzLldvcmtlck5vZGUuYWJpLCB3b3JrZXJOb2RlQWRkcmVzcyk7XG4gICAgd3JuLm1ldGhvZHNcbiAgICAgICAgLmFsaXZlKClcbiAgICAgICAgLnNlbmQoe1xuICAgICAgICAgICAgZnJvbSxcbiAgICAgICAgICAgIGdhczogNjcwMDAwMFxuICAgICAgICB9KVxuICAgICAgICAub24oJ2Vycm9yJywgcmVqZWN0KVxuICAgICAgICAub24oJ3JlY2VpcHQnLCByZWNlaXB0ID0+IHtcblxuICAgICAgICAgICAgaWYgKE51bWJlcihyZWNlaXB0LnN0YXR1cykgPT09IDApIHtcblxuICAgICAgICAgICAgICAgIHJldHVybiByZWplY3QocGpzRXJyb3IoVFJBTlNBQ1RJT05fVU5TVUNDRVNTRlVMKSk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHJlc29sdmUocmVjZWlwdCk7XG4gICAgICAgIH0pO1xufSk7XG4iXX0=