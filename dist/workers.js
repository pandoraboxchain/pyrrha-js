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
exports.alive = exports.eventWorkerNodeStateChanged = exports.eventWorkerNodeCreated = exports.fetchIdleCount = exports.fetchAll = exports.fetchWorkerById = exports.fetchWorker = exports.fetchActiveJobAddress = exports.fetchReputation = exports.fetchState = exports.fetchAddressById = exports.fetchCount = void 0;

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
 * Get worker reputation from Worker contract by the worker address
 * 
 * @param {string} address 
 * @param {Object} config Library config (provided by the proxy but can be overridden)
 * @returns {Promise} A Promise object represents the {number}
 */


exports.fetchState = fetchState;

const fetchReputation = async (address = '', config = {}) => {
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
  const reputation = await wor.methods.reputation().call();
  return Number.parseInt(reputation, 10);
};
/**
 * Get worker's active job from Worker contract by the worker address
 * 
 * @param {string} address 
 * @param {Object} config Library config (provided by the proxy but can be overridden)
 * @returns {Promise} A Promise object represents the {string}
 */


exports.fetchReputation = fetchReputation;

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
  const [currentState, reputation, activeJob] = await Promise.all([fetchState(address, config), fetchReputation(address, config), fetchActiveJobAddress(address, config)]);
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
    reputation,
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
  return all.records.reduce((acc, curr) => curr.currentState === 2 ? acc++ : acc, 0);
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
  pan.events.WorkerNodeCreated(options).on('data', async res => {
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
 * @param {string} address
 * @param {Object} config Library config (provided by the proxy but can be overridden)
 * @returns {Object} Object with chained callbacks #data and #error
 */


exports.eventWorkerNodeCreated = eventWorkerNodeCreated;

const eventWorkerNodeStateChanged = (address = '', config = {}) => {
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
  wor.events.StateChanged().on('data', async res => {
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy93b3JrZXJzLmpzIl0sIm5hbWVzIjpbImZldGNoQ291bnQiLCJjb25maWciLCJleHBlY3QiLCJhbGwiLCJ0eXBlIiwiY29kZSIsIldFQjNfUkVRVUlSRUQiLCJDT05UUkFDVF9SRVFVSVJFRCIsImFyZ3MiLCJBRERSRVNTX1JFUVVJUkVEIiwicGFuIiwid2ViMyIsImV0aCIsIkNvbnRyYWN0IiwiY29udHJhY3RzIiwiUGFuZG9yYSIsImFiaSIsImFkZHJlc3NlcyIsImNvdW50IiwibWV0aG9kcyIsIndvcmtlck5vZGVzQ291bnQiLCJjYWxsIiwiTnVtYmVyIiwicGFyc2VJbnQiLCJmZXRjaEFkZHJlc3NCeUlkIiwiaWQiLCJhZGRyZXNzIiwid29ya2VyTm9kZXMiLCJTdHJpbmciLCJmZXRjaFN0YXRlIiwid29yIiwiV29ya2VyTm9kZSIsInN0YXRlIiwiY3VycmVudFN0YXRlIiwiZmV0Y2hSZXB1dGF0aW9uIiwicmVwdXRhdGlvbiIsImZldGNoQWN0aXZlSm9iQWRkcmVzcyIsImFjdGl2ZUpvYiIsImZldGNoV29ya2VyIiwiUHJvbWlzZSIsImN1cnJlbnRKb2IiLCJqb2JTdGF0ZSIsImN1cnJlbnRKb2JTdGF0dXMiLCJmZXRjaFdvcmtlckJ5SWQiLCJ3b3JrZXIiLCJmZXRjaEFsbCIsInJlY29yZHMiLCJlcnJvciIsImkiLCJwdXNoIiwiZXJyIiwibWVzc2FnZSIsImZldGNoSWRsZUNvdW50IiwicmVkdWNlIiwiYWNjIiwiY3VyciIsImV2ZW50V29ya2VyTm9kZUNyZWF0ZWQiLCJvcHRpb25zIiwiY2FsbGJhY2tzIiwib25EYXRhIiwib25FcnJvciIsImNoYWluIiwiZGF0YSIsImNiIiwiZXZlbnRzIiwiV29ya2VyTm9kZUNyZWF0ZWQiLCJvbiIsInJlcyIsInJldHVyblZhbHVlcyIsIndvcmtlck5vZGUiLCJzdGF0dXMiLCJldmVudCIsImV2ZW50V29ya2VyTm9kZVN0YXRlQ2hhbmdlZCIsIlN0YXRlQ2hhbmdlZCIsImFsaXZlIiwid29ya2VyTm9kZUFkZHJlc3MiLCJmcm9tIiwicmVzb2x2ZSIsInJlamVjdCIsIndybiIsInNlbmQiLCJnYXMiLCJyZWNlaXB0IiwiVFJBTlNBQ1RJT05fVU5TVUNDRVNTRlVMIl0sIm1hcHBpbmdzIjoiQUFBQTs7Ozs7Ozs7QUFTQTs7Ozs7OztBQUVBOztBQUNBOztBQU9BOzs7Ozs7OztBQUVBOzs7Ozs7QUFNTyxNQUFNQSxhQUFhLE9BQU9DLFNBQVMsRUFBaEIsS0FBdUI7QUFFN0NDLFNBQU9DLEdBQVAsQ0FBV0YsTUFBWCxFQUFtQjtBQUNmLFlBQVE7QUFDSkcsWUFBTSxRQURGO0FBRUpDLFlBQU1DO0FBRkYsS0FETztBQUtmLDZCQUF5QjtBQUNyQkYsWUFBTSxRQURlO0FBRXJCQyxZQUFNRSx5QkFGZTtBQUdyQkMsWUFBTSxDQUFDLFNBQUQ7QUFIZSxLQUxWO0FBVWYseUJBQXFCO0FBQ2pCSixZQUFNLFNBRFc7QUFFakJDLFlBQU1JLHdCQUZXO0FBR2pCRCxZQUFNLENBQUMsU0FBRDtBQUhXO0FBVk4sR0FBbkI7QUFpQkEsUUFBTUUsTUFBTSxJQUFJVCxPQUFPVSxJQUFQLENBQVlDLEdBQVosQ0FBZ0JDLFFBQXBCLENBQTZCWixPQUFPYSxTQUFQLENBQWlCQyxPQUFqQixDQUF5QkMsR0FBdEQsRUFBMkRmLE9BQU9nQixTQUFQLENBQWlCRixPQUE1RSxDQUFaO0FBQ0EsUUFBTUcsUUFBUSxNQUFNUixJQUFJUyxPQUFKLENBQ2ZDLGdCQURlLEdBRWZDLElBRmUsRUFBcEI7QUFJQSxTQUFPQyxPQUFPQyxRQUFQLENBQWdCTCxLQUFoQixFQUF1QixFQUF2QixDQUFQO0FBQ0gsQ0F6Qk07QUEyQlA7Ozs7Ozs7Ozs7O0FBT08sTUFBTU0sbUJBQW1CLE9BQU9DLEVBQVAsRUFBV3hCLFNBQVMsRUFBcEIsS0FBMkI7QUFFdkRDLFNBQU9DLEdBQVAsQ0FBVztBQUFFc0I7QUFBRixHQUFYLEVBQW1CO0FBQ2YsVUFBTTtBQUNGckIsWUFBTTtBQURKO0FBRFMsR0FBbkI7QUFNQUYsU0FBT0MsR0FBUCxDQUFXRixNQUFYLEVB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ZmlsZSBpdCBpcyBhIHBhcnQgb2YgdGhlIFBhbmRvcmEgUHlycmhhIEphdmFzY3JpcHQgbGlicmFyeVxuICogXG4gKiBAZmlsZSB3b3JrZXJzLmpzXG4gKiBAYXV0aG9yIEtvc3RpYW50eW4gU215cm5vdiA8a29zdHlzaEBnbWFpbC5jb20+XG4gKiBAZGF0ZSAyMDE4XG4gKi9cblxuJ3VzZSBzdHJpY3QnO1xuXG5pbXBvcnQgKiBhcyBleHBlY3QgZnJvbSAnLi9oZWxwZXJzL2V4cGVjdCc7XG5pbXBvcnQgcGpzRXJyb3IsIHtcbiAgICBDT05UUkFDVF9SRVFVSVJFRCxcbiAgICBBRERSRVNTX1JFUVVJUkVELFxuICAgIFdFQjNfUkVRVUlSRUQsXG4gICAgVFJBTlNBQ1RJT05fVU5TVUNDRVNTRlVMXG59IGZyb20gJy4vaGVscGVycy9lcnJvcnMnO1xuXG5pbXBvcnQgeyBmZXRjaFN0YXRlIGFzIGZldGNoSm9iU3RhdGUgfSBmcm9tICcuL2pvYnMnO1xuXG4vKipcbiAqIEdldCB3b3JrZXIgbm9kZXMgY291bnQgZnJvbSBQYW5kb3JhIGNvbnRyYWN0XG4gKiBcbiAqIEBwYXJhbSB7T2JqZWN0fSBjb25maWcgTGlicmFyeSBjb25maWcgKHByb3ZpZGVkIGJ5IHRoZSBwcm94eSBidXQgY2FuIGJlIG92ZXJyaWRkZW4pXG4gKiBAcmV0dXJucyB7UHJvbWlzZX0gQSBQcm9taXNlIG9iamVjdCByZXByZXNlbnRzIHRoZSB7bnVtYmVyfSBcbiAqL1xuZXhwb3J0IGNvbnN0IGZldGNoQ291bnQgPSBhc3luYyAoY29uZmlnID0ge30pID0+IHtcblxuICAgIGV4cGVjdC5hbGwoY29uZmlnLCB7XG4gICAgICAgICd3ZWIzJzoge1xuICAgICAgICAgICAgdHlwZTogJ29iamVjdCcsXG4gICAgICAgICAgICBjb2RlOiBXRUIzX1JFUVVJUkVEXG4gICAgICAgIH0sXG4gICAgICAgICdjb250cmFjdHMuUGFuZG9yYS5hYmknOiB7XG4gICAgICAgICAgICB0eXBlOiAnb2JqZWN0JyxcbiAgICAgICAgICAgIGNvZGU6IENPTlRSQUNUX1JFUVVJUkVELFxuICAgICAgICAgICAgYXJnczogWydQYW5kb3JhJ11cbiAgICAgICAgfSxcbiAgICAgICAgJ2FkZHJlc3Nlcy5QYW5kb3JhJzoge1xuICAgICAgICAgICAgdHlwZTogJ2FkZHJlc3MnLFxuICAgICAgICAgICAgY29kZTogQUREUkVTU19SRVFVSVJFRCxcbiAgICAgICAgICAgIGFyZ3M6IFsnUGFuZG9yYSddXG4gICAgICAgIH1cbiAgICB9KTtcblxuICAgIGNvbnN0IHBhbiA9IG5ldyBjb25maWcud2ViMy5ldGguQ29udHJhY3QoY29uZmlnLmNvbnRyYWN0cy5QYW5kb3JhLmFiaSwgY29uZmlnLmFkZHJlc3Nlcy5QYW5kb3JhKTtcbiAgICBjb25zdCBjb3VudCA9IGF3YWl0IHBhbi5tZXRob2RzXG4gICAgICAgIC53b3JrZXJOb2Rlc0NvdW50KClcbiAgICAgICAgLmNhbGwoKTtcblxuICAgIHJldHVybiBOdW1iZXIucGFyc2VJbnQoY291bnQsIDEwKTtcbn07XG5cbi8qKlxuICogR2V0IHdvcmtlciBhZGRyZXNzIGZyb20gUGFuZG9yYSBjb250cmFjdCBieSB0aGUgd29ya2VyIElkXG4gKiBcbiAqIEBwYXJhbSB7aW50ZWdlcn0gaWQgV29ya2VyIElkXG4gKiBAcGFyYW0ge09iamVjdH0gY29uZmlnIExpYnJhcnkgY29uZmlnIChwcm92aWRlZCBieSB0aGUgcHJveHkgYnV0IGNhbiBiZSBvdmVycmlkZGVuKVxuICogQHJldHVybnMge1Byb21pc2V9IEEgUHJvbWlzZSBvYmplY3QgcmVwcmVzZW50cyB0aGUge3N0cmluZ30gXG4gKi9cbmV4cG9ydCBjb25zdCBmZXRjaEFkZHJlc3NCeUlkID0gYXN5bmMgKGlkLCBjb25maWcgPSB7fSkgPT4ge1xuXG4gICAgZXhwZWN0LmFsbCh7IGlkIH0sIHtcbiAgICAgICAgJ2lkJzoge1xuICAgICAgICAgICAgdHlwZTogJ251bWJlcidcbiAgICAgICAgfVxuICAgIH0pO1xuXG4gICAgZXhwZWN0LmFsbChjb25maWcsIHtcbiAgICAgICAgJ3dlYjMnOiB7XG4gICAgICAgICAgICB0eXBlOiAnb2JqZWN0JyxcbiAgICAgICAgICAgIGNvZGU6IFdFQjNfUkVRVUlSRURcbiAgICAgICAgfSxcbiAgICAgICAgJ2NvbnRyYWN0cy5QYW5kb3JhLmFiaSc6IHtcbiAgICAgICAgICAgIHR5cGU6ICdvYmplY3QnLFxuICAgICAgICAgICAgY29kZTogQ09OVFJBQ1RfUkVRVUlSRUQsXG4gICAgICAgICAgICBhcmdzOiBbJ1BhbmRvcmEnXVxuICAgICAgICB9LFxuICAgICAgICAnYWRkcmVzc2VzLlBhbmRvcmEnOiB7XG4gICAgICAgICAgICB0eXBlOiAnYWRkcmVzcycsXG4gICAgICAgICAgICBjb2RlOiBBRERSRVNTX1JFUVVJUkVELFxuICAgICAgICAgICAgYXJnczogWydQYW5kb3JhJ11cbiAgICAgICAgfVxuICAgIH0pO1xuXG4gICAgY29uc3QgcGFuID0gbmV3IGNvbmZpZy53ZWIzLmV0aC5Db250cmFjdChjb25maWcuY29udHJhY3RzLlBhbmRvcmEuYWJpLCBjb25maWcuYWRkcmVzc2VzLlBhbmRvcmEpO1xuICAgIGNvbnN0IGFkZHJlc3MgPSBhd2FpdCBwYW4ubWV0aG9kc1xuICAgICAgICAud29ya2VyTm9kZXMoaWQpXG4gICAgICAgIC5jYWxsKCk7XG5cbiAgICByZXR1cm4gU3RyaW5nKGFkZHJlc3MpO1xufTtcblxuLyoqXG4gKiBHZXQgd29ya2VyIHN0YXRlIGZyb20gV29ya2VyIGNvbnRyYWN0IGJ5IHRoZSB3b3JrZXIgYWRkcmVzc1xuICogXG4gKiBAcGFyYW0ge3N0cmluZ30gYWRkcmVzcyBcbiAqIEBwYXJhbSB7T2JqZWN0fSBjb25maWcgTGlicmFyeSBjb25maWcgKHByb3ZpZGVkIGJ5IHRoZSBwcm94eSBidXQgY2FuIGJlIG92ZXJyaWRkZW4pXG4gKiBAcmV0dXJucyB7UHJvbWlzZX0gQSBQcm9taXNlIG9iamVjdCByZXByZXNlbnRzIHRoZSB7bnVtYmVyfVxuICovXG5leHBvcnQgY29uc3QgZmV0Y2hTdGF0ZSA9IGFzeW5jIChhZGRyZXNzID0gJycsIGNvbmZpZyA9IHt9KSA9PiB7XG5cbiAgICBleHBlY3QuYWxsKHsgYWRkcmVzcyB9LCB7XG4gICAgICAgICdhZGRyZXNzJzoge1xuICAgICAgICAgICAgdHlwZTogJ2FkZHJlc3MnXG4gICAgICAgIH1cbiAgICB9KTtcblxuICAgIGV4cGVjdC5hbGwoY29uZmlnLCB7XG4gICAgICAgICd3ZWIzJzoge1xuICAgICAgICAgICAgdHlwZTogJ29iamVjdCcsXG4gICAgICAgICAgICBjb2RlOiBXRUIzX1JFUVVJUkVEXG4gICAgICAgIH0sXG4gICAgICAgICdjb250cmFjdHMuV29ya2VyTm9kZS5hYmknOiB7XG4gICAgICAgICAgICB0eXBlOiAnb2JqZWN0JyxcbiAgICAgICAgICAgIGNvZGU6IENPTlRSQUNUX1JFUVVJUkVELFxuICAgICAgICAgICAgYXJnczogWydXb3JrZXJOb2RlJ11cbiAgICAgICAgfVxuICAgIH0pO1xuXG4gICAgY29uc3Qgd29yID0gbmV3IGNvbmZpZy53ZWIzLmV0aC5Db250cmFjdChjb25maWcuY29udHJhY3RzLldvcmtlck5vZGUuYWJpLCBhZGRyZXNzKTsgICAgXG4gICAgY29uc3Qgc3RhdGUgPSBhd2FpdCB3b3IubWV0aG9kc1xuICAgICAgICAuY3VycmVudFN0YXRlKClcbiAgICAgICAgLmNhbGwoKTtcblxuICAgIHJldHVybiBOdW1iZXIucGFyc2VJbnQoc3RhdGUsIDEwKTtcbn07XG5cbi8qKlxuICogR2V0IHdvcmtlciByZXB1dGF0aW9uIGZyb20gV29ya2VyIGNvbnRyYWN0IGJ5IHRoZSB3b3JrZXIgYWRkcmVzc1xuICogXG4gKiBAcGFyYW0ge3N0cmluZ30gYWRkcmVzcyBcbiAqIEBwYXJhbSB7T2JqZWN0fSBjb25maWcgTGlicmFyeSBjb25maWcgKHByb3ZpZGVkIGJ5IHRoZSBwcm94eSBidXQgY2FuIGJlIG92ZXJyaWRkZW4pXG4gKiBAcmV0dXJucyB7UHJvbWlzZX0gQSBQcm9taXNlIG9iamVjdCByZXByZXNlbnRzIHRoZSB7bnVtYmVyfVxuICovXG5leHBvcnQgY29uc3QgZmV0Y2hSZXB1dGF0aW9uID0gYXN5bmMgKGFkZHJlc3MgPSAnJywgY29uZmlnID0ge30pID0+IHtcblxuICAgIGV4cGVjdC5hbGwoeyBhZGRyZXNzIH0sIHtcbiAgICAgICAgJ2FkZHJlc3MnOiB7XG4gICAgICAgICAgICB0eXBlOiAnYWRkcmVzcydcbiAgICAgICAgfVxuICAgIH0pO1xuXG4gICAgZXhwZWN0LmFsbChjb25maWcsIHtcbiAgICAgICAgJ3dlYjMnOiB7XG4gICAgICAgICAgICB0eXBlOiAnb2JqZWN0JyxcbiAgICAgICAgICAgIGNvZGU6IFdFQjNfUkVRVUlSRURcbiAgICAgICAgfSxcbiAgICAgICAgJ2NvbnRyYWN0cy5Xb3JrZXJOb2RlLmFiaSc6IHtcbiAgICAgICAgICAgIHR5cGU6ICdvYmplY3QnLFxuICAgICAgICAgICAgY29kZTogQ09OVFJBQ1RfUkVRVUlSRUQsXG4gICAgICAgICAgICBhcmdzOiBbJ1dvcmtlck5vZGUnXVxuICAgICAgICB9XG4gICAgfSk7XG5cbiAgICBjb25zdCB3b3IgPSBuZXcgY29uZmlnLndlYjMuZXRoLkNvbnRyYWN0KGNvbmZpZy5jb250cmFjdHMuV29ya2VyTm9kZS5hYmksIGFkZHJlc3MpO1xuICAgIGNvbnN0IHJlcHV0YXRpb24gPSBhd2FpdCB3b3IubWV0aG9kc1xuICAgICAgICAucmVwdXRhdGlvbigpXG4gICAgICAgIC5jYWxsKCk7XG5cbiAgICByZXR1cm4gTnVtYmVyLnBhcnNlSW50KHJlcHV0YXRpb24sIDEwKTtcbn07XG5cbi8qKlxuICogR2V0IHdvcmtlcidzIGFjdGl2ZSBqb2IgZnJvbSBXb3JrZXIgY29udHJhY3QgYnkgdGhlIHdvcmtlciBhZGRyZXNzXG4gKiBcbiAqIEBwYXJhbSB7c3RyaW5nfSBhZGRyZXNzIFxuICogQHBhcmFtIHtPYmplY3R9IGNvbmZpZyBMaWJyYXJ5IGNvbmZpZyAocHJvdmlkZWQgYnkgdGhlIHByb3h5IGJ1dCBjYW4gYmUgb3ZlcnJpZGRlbilcbiAqIEByZXR1cm5zIHtQcm9taXNlfSBBIFByb21pc2Ugb2JqZWN0IHJlcHJlc2VudHMgdGhlIHtzdHJpbmd9XG4gKi9cbmV4cG9ydCBjb25zdCBmZXRjaEFjdGl2ZUpvYkFkZHJlc3MgPSBhc3luYyAoYWRkcmVzcyA9ICcnLCBjb25maWcgPSB7fSkgPT4ge1xuXG4gICAgZXhwZWN0LmFsbCh7IGFkZHJlc3MgfSwge1xuICAgICAgICAnYWRkcmVzcyc6IHtcbiAgICAgICAgICAgIHR5cGU6ICdhZGRyZXNzJ1xuICAgICAgICB9XG4gICAgfSk7XG5cbiAgICBleHBlY3QuYWxsKGNvbmZpZywge1xuICAgICAgICAnd2ViMyc6IHtcbiAgICAgICAgICAgIHR5cGU6ICdvYmplY3QnLFxuICAgICAgICAgICAgY29kZTogV0VCM19SRVFVSVJFRFxuICAgICAgICB9LFxuICAgICAgICAnY29udHJhY3RzLldvcmtlck5vZGUuYWJpJzoge1xuICAgICAgICAgICAgdHlwZTogJ29iamVjdCcsXG4gICAgICAgICAgICBjb2RlOiBDT05UUkFDVF9SRVFVSVJFRCxcbiAgICAgICAgICAgIGFyZ3M6IFsnV29ya2VyTm9kZSddXG4gICAgICAgIH1cbiAgICB9KTtcblxuICAgIGNvbnN0IHdvciA9IG5ldyBjb25maWcud2ViMy5ldGguQ29udHJhY3QoY29uZmlnLmNvbnRyYWN0cy5Xb3JrZXJOb2RlLmFiaSwgYWRkcmVzcyk7XG4gICAgY29uc3QgYWN0aXZlSm9iID0gYXdhaXQgd29yLm1ldGhvZHNcbiAgICAgICAgLmFjdGl2ZUpvYigpXG4gICAgICAgIC5jYWxsKCk7XG5cbiAgICByZXR1cm4gU3RyaW5nKGFjdGl2ZUpvYiwgMTApO1xufTtcblxuLyoqXG4gKiBHZXQgd29ya2VyIGJ5IHRoZSB3b3JrZXIncyBhZGRyZXNzXG4gKiBcbiAqIEBwYXJhbSB7c3RyaW5nfSBhZGRyZXNzXG4gKiBAcGFyYW0ge09iamVjdH0gY29uZmlnIExpYnJhcnkgY29uZmlnIChwcm92aWRlZCBieSB0aGUgcHJveHkgYnV0IGNhbiBiZSBvdmVycmlkZGVuKVxuICogQHJldHVybnMge1Byb21pc2V9IEEgUHJvbWlzZSBvYmplY3QgcmVwcmVzZW50cyB0aGUge09iamVjdH1cbiAqL1xuZXhwb3J0IGNvbnN0IGZldGNoV29ya2VyID0gYXN5bmMgKGFkZHJlc3MgPSAnJywgY29uZmlnID0ge30pID0+IHtcbiAgICBcbiAgICBjb25zdCBbXG4gICAgICAgIGN1cnJlbnRTdGF0ZSxcbiAgICAgICAgcmVwdXRhdGlvbixcbiAgICAgICAgYWN0aXZlSm9iXG4gICAgXSA9IGF3YWl0IFByb21pc2UuYWxsKFtcbiAgICAgICAgZmV0Y2hTdGF0ZShhZGRyZXNzLCBjb25maWcpLFxuICAgICAgICBmZXRjaFJlcHV0YXRpb24oYWRkcmVzcywgY29uZmlnKSxcbiAgICAgICAgZmV0Y2hBY3RpdmVKb2JBZGRyZXNzKGFkZHJlc3MsIGNvbmZpZylcbiAgICBdKTtcblxuXG4gICAgbGV0IGN1cnJlbnRKb2IgPSBhY3RpdmVKb2I7XG4gICAgbGV0IGpvYlN0YXRlOyAgICBcblxuICAgIC8vIENoZWNrIGlzIG5vdCAweDBcbiAgICBpZiAoK2FjdGl2ZUpvYiAhPT0gMCkge1xuXG4gICAgICAgIGpvYlN0YXRlID0gYXdhaXQgZmV0Y2hKb2JTdGF0ZShhY3RpdmVKb2IsIGNvbmZpZyk7XG4gICAgfSBlbHNlIHtcbiAgICAgICAgY3VycmVudEpvYiA9IG51bGw7XG4gICAgICAgIGpvYlN0YXRlID0gLTE7XG4gICAgfVxuXG4gICAgcmV0dXJuIHtcbiAgICAgICAgYWRkcmVzcyxcbiAgICAgICAgY3VycmVudFN0YXRlLFxuICAgICAgICByZXB1dGF0aW9uLFxuICAgICAgICBjdXJyZW50Sm9iLFxuICAgICAgICBjdXJyZW50Sm9iU3RhdHVzOiBqb2JTdGF0ZVxuICAgIH07XG59O1xuXG4vKipcbiAqIEdldCB3b3JrZXIgYnkgdGhlIHdvcmtlcidzIGlkXG4gKiBcbiAqIEBwYXJhbSB7aW50ZWdlcn0gaWQgXG4gKiBAcGFyYW0ge09iamVjdH0gY29uZmlnIExpYnJhcnkgY29uZmlnIChwcm92aWRlZCBieSB0aGUgcHJveHkgYnV0IGNhbiBiZSBvdmVycmlkZGVuKVxuICogQHJldHVybnMge1Byb21pc2V9IEEgUHJvbWlzZSBvYmplY3QgcmVwcmVzZW50cyB0aGUge09iamVjdH1cbiAqL1xuZXhwb3J0IGNvbnN0IGZldGNoV29ya2VyQnlJZCA9IGFzeW5jIChpZCwgY29uZmlnID0ge30pID0+IHtcbiAgICBcbiAgICBjb25zdCBhZGRyZXNzID0gYXdhaXQgZmV0Y2hBZGRyZXNzQnlJZChpZCwgY29uZmlnKTtcbiAgICBjb25zdCB3b3JrZXIgPSBhd2FpdCBmZXRjaFdvcmtlcihhZGRyZXNzLCBjb25maWcpO1xuXG4gICAgcmV0dXJuIHtcbiAgICAgICAgaWQ6IGlkLFxuICAgICAgICAuLi53b3JrZXJcbiAgICB9O1xufTtcblxuLyoqXG4gKiBHZXQgYWxsIHdvcmtlcnNcbiAqIFxuICogQHBhcmFtIHtPYmplY3R9IGNvbmZpZyBMaWJyYXJ5IGNvbmZpZyAocHJvdmlkZWQgYnkgdGhlIHByb3h5IGJ1dCBjYW4gYmUgb3ZlcnJpZGRlbilcbiAqIEByZXR1cm5zIHtQcm9taXNlfSBBIFByb21pc2Ugb2JqZWN0IHJlcHJlc2VudHMgdGhlIHtudW1iZXJ9XG4gKi9cbmV4cG9ydCBjb25zdCBmZXRjaEFsbCA9IGFzeW5jIChjb25maWcgPSB7fSkgPT4ge1xuICAgIGxldCByZWNvcmRzID0gW107XG4gICAgbGV0IGVycm9yID0gW107XG5cbiAgICB0cnkge1xuXG4gICAgICAgIGNvbnN0IGNvdW50ID0gYXdhaXQgZmV0Y2hDb3VudChjb25maWcpOyAgICBcblxuICAgICAgICBmb3IgKGxldCBpPTA7IGkgPCBjb3VudDsgaSsrKSB7XG4gICAgICAgICAgICBcbiAgICAgICAgICAgIHRyeSB7XG5cbiAgICAgICAgICAgICAgICBjb25zdCB3b3JrZXIgPSBhd2FpdCBmZXRjaFdvcmtlckJ5SWQoaSwgY29uZmlnKTtcblxuICAgICAgICAgICAgICAgIHJlY29yZHMucHVzaCh7XG4gICAgICAgICAgICAgICAgICAgIGlkOiBpLFxuICAgICAgICAgICAgICAgICAgICAuLi53b3JrZXJcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH0gY2F0Y2goZXJyKSB7XG4gICAgICAgICAgICAgICAgZXJyb3IucHVzaCh7XG4gICAgICAgICAgICAgICAgICAgIGlkOiBpLFxuICAgICAgICAgICAgICAgICAgICBtZXNzYWdlOiBlcnIubWVzc2FnZVxuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfSAgICAgICAgXG4gICAgICAgIH1cbiAgICB9IGNhdGNoKGVycikge1xuICAgICAgICBlcnJvci5wdXNoKHtcbiAgICAgICAgICAgIGVycm9yOiBlcnIubWVzc2FnZVxuICAgICAgICB9KTtcbiAgICB9ICAgXG5cbiAgICByZXR1cm4ge1xuICAgICAgICByZWNvcmRzLFxuICAgICAgICBlcnJvclxuICAgIH07XG59O1xuXG4vKipcbiAqIEdldCBjb3VudCBvZiB3b3JrZXJzIHdpdGggXCJpZGxlXCIgc3RhdHVzXG4gKiBcbiAqIEBwYXJhbSB7T2JqZWN0fSBjb25maWcgTGlicmFyeSBjb25maWcgKHByb3ZpZGVkIGJ5IHRoZSBwcm94eSBidXQgY2FuIGJlIG92ZXJyaWRkZW4pXG4gKiBAcmV0dXJucyB7UHJvbWlzZX0gQSBQcm9taXNlIG9iamVjdCByZXByZXNlbnRzIHRoZSB7bnVtYmVyfVxuICovXG5leHBvcnQgY29uc3QgZmV0Y2hJZGxlQ291bnQgPSBhc3luYyAoY29uZmlnID0ge30pID0+IHtcbiAgICBjb25zdCBhbGwgPSBhd2FpdCBmZXRjaEFsbChjb25maWcpO1xuICAgIHJldHVybiBhbGwucmVjb3Jkcy5yZWR1Y2UoKGFjYywgY3VycikgPT4gKGN1cnIuY3VycmVudFN0YXRlID09PSAyID8gYWNjKysgOiBhY2MpLCAwKTtcbn07XG5cbi8qKlxuICogSGFuZGxlIGV2ZW50IFdvcmtlck5vZGVDcmVhdGVkXG4gKiBcbiAqIEBwYXJhbSB7T2JqZWN0fSBvcHRpb25zIEV2ZW50IGhhbmRsZXIgb3B0aW9uc1xuICogQHBhcmFtIHtPYmplY3R9IGNvbmZpZyBMaWJyYXJ5IGNvbmZpZyAocHJvdmlkZWQgYnkgdGhlIHByb3h5IGJ1dCBjYW4gYmUgb3ZlcnJpZGRlbilcbiAqIEByZXR1cm5zIHtPYmplY3R9IE9iamVjdCB3aXRoIGNoYWluZWQgY2FsbGJhY2tzICNkYXRhIGFuZCAjZXJyb3JcbiAqL1xuZXhwb3J0IGNvbnN0IGV2ZW50V29ya2VyTm9kZUNyZWF0ZWQgPSAob3B0aW9ucyA9IHt9LCBjb25maWcgPSB7fSkgPT4ge1xuXG4gICAgZXhwZWN0LmFsbCh7IG9wdGlvbnMgfSwge1xuICAgICAgICAnb3B0aW9ucyc6IHtcbiAgICAgICAgICAgIHR5cGU6ICdvYmplY3QnXG4gICAgICAgIH1cbiAgICB9KTtcblxuICAgIGV4cGVjdC5hbGwoY29uZmlnLCB7XG4gICAgICAgICd3ZWIzJzoge1xuICAgICAgICAgICAgdHlwZTogJ29iamVjdCcsXG4gICAgICAgICAgICBjb2RlOiBXRUIzX1JFUVVJUkVEXG4gICAgICAgIH0sXG4gICAgICAgICdjb250cmFjdHMuUGFuZG9yYS5hYmknOiB7XG4gICAgICAgICAgICB0eXBlOiAnb2JqZWN0JyxcbiAgICAgICAgICAgIGNvZGU6IENPTlRSQUNUX1JFUVVJUkVELFxuICAgICAgICAgICAgYXJnczogWydQYW5kb3JhJ11cbiAgICAgICAgfSxcbiAgICAgICAgJ2FkZHJlc3Nlcy5QYW5kb3JhJzoge1xuICAgICAgICAgICAgdHlwZTogJ2FkZHJlc3MnLFxuICAgICAgICAgICAgY29kZTogQUREUkVTU19SRVFVSVJFRCxcbiAgICAgICAgICAgIGFyZ3M6IFsnUGFuZG9yYSddXG4gICAgICAgIH1cbiAgICB9KTtcblxuICAgIGNvbnN0IGNhbGxiYWNrcyA9IHtcbiAgICAgICAgb25EYXRhOiAoKSA9PiB7fSxcbiAgICAgICAgb25FcnJvcjogKCkgPT4ge31cbiAgICB9O1xuXG4gICAgY29uc3QgY2hhaW4gPSB7XG4gICAgICAgIGRhdGE6IChjYiA9ICgpID0+IHt9KSA9PiB7XG4gICAgICAgICAgICBjYWxsYmFja3Mub25EYXRhID0gY2I7XG4gICAgICAgICAgICByZXR1cm4gY2hhaW47XG4gICAgICAgIH0sXG4gICAgICAgIGVycm9yOiAoY2IgPSAoKSA9PiB7fSkgPT4ge1xuICAgICAgICAgICAgY2FsbGJhY2tzLm9uRXJyb3IgPSBjYjtcbiAgICAgICAgICAgIHJldHVybiBjaGFpbjtcbiAgICAgICAgfVxuICAgIH07XG5cbiAgICBjb25zdCBwYW4gPSBuZXcgY29uZmlnLndlYjMuZXRoLkNvbnRyYWN0KGNvbmZpZy5jb250cmFjdHMuUGFuZG9yYS5hYmksIGNvbmZpZy5hZGRyZXNzZXMuUGFuZG9yYSk7XG4gICAgcGFuLmV2ZW50cy5Xb3JrZXJOb2RlQ3JlYXRlZChvcHRpb25zKVxuICAgICAgICAub24oJ2RhdGEnLCBhc3luYyByZXMgPT4ge1xuXG4gICAgICAgICAgICB0cnkge1xuXG4gICAgICAgICAgICAgICAgY29uc3Qgd29ya2VyID0gYXdhaXQgZmV0Y2hXb3JrZXIocmVzLnJldHVyblZhbHVlcy53b3JrZXJOb2RlLCBjb25maWcpO1xuICAgICAgICAgICAgICAgIGNhbGxiYWNrcy5vbkRhdGEoe1xuICAgICAgICAgICAgICAgICAgICBhZGRyZXNzOiByZXMucmV0dXJuVmFsdWVzLndvcmtlck5vZGUsXG4gICAgICAgICAgICAgICAgICAgIHdvcmtlcixcbiAgICAgICAgICAgICAgICAgICAgc3RhdHVzOiAnY3JlYXRlZCcsXG4gICAgICAgICAgICAgICAgICAgIGV2ZW50OiAnUGFuZG9yYS5Xb3JrZXJOb2RlQ3JlYXRlZCdcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH0gY2F0Y2goZXJyKSB7XG4gICAgICAgICAgICAgICAgY2FsbGJhY2tzLm9uRXJyb3IoZXJyKTtcbiAgICAgICAgICAgIH0gICAgICAgICAgICBcbiAgICAgICAgfSlcbiAgICAgICAgLm9uKCdlcnJvcicsIGNhbGxiYWNrcy5vbkVycm9yKTtcblxuICAgIHJldHVybiBjaGFpbjtcbn07XG5cbi8qKlxuICogSGFuZGxlIGV2ZW50IFN0YXRlQ2hhbmdlZCBmb3IgV29ya2VyTm9kZVxuICogXG4gKiBAcGFyYW0ge3N0cmluZ30gYWRkcmVzc1xuICogQHBhcmFtIHtPYmplY3R9IGNvbmZpZyBMaWJyYXJ5IGNvbmZpZyAocHJvdmlkZWQgYnkgdGhlIHByb3h5IGJ1dCBjYW4gYmUgb3ZlcnJpZGRlbilcbiAqIEByZXR1cm5zIHtPYmplY3R9IE9iamVjdCB3aXRoIGNoYWluZWQgY2FsbGJhY2tzICNkYXRhIGFuZCAjZXJyb3JcbiAqL1xuZXhwb3J0IGNvbnN0IGV2ZW50V29ya2VyTm9kZVN0YXRlQ2hhbmdlZCA9IChhZGRyZXNzID0gJycsIGNvbmZpZyA9IHt9KSA9PiB7XG5cbiAgICBleHBlY3QuYWxsKHsgYWRkcmVzcyB9LCB7XG4gICAgICAgICdhZGRyZXNzJzoge1xuICAgICAgICAgICAgdHlwZTogJ2FkZHJlc3MnXG4gICAgICAgIH1cbiAgICB9KTtcblxuICAgIGV4cGVjdC5hbGwoY29uZmlnLCB7XG4gICAgICAgICd3ZWIzJzoge1xuICAgICAgICAgICAgdHlwZTogJ29iamVjdCcsXG4gICAgICAgICAgICBjb2RlOiBXRUIzX1JFUVVJUkVEXG4gICAgICAgIH0sXG4gICAgICAgICdjb250cmFjdHMuV29ya2VyTm9kZS5hYmknOiB7XG4gICAgICAgICAgICB0eXBlOiAnb2JqZWN0JyxcbiAgICAgICAgICAgIGNvZGU6IENPTlRSQUNUX1JFUVVJUkVELFxuICAgICAgICAgICAgYXJnczogWydXb3JrZXJOb2RlJ11cbiAgICAgICAgfVxuICAgIH0pO1xuXG4gICAgY29uc3QgY2FsbGJhY2tzID0ge1xuICAgICAgICBvbkRhdGE6ICgpID0+IHt9LFxuICAgICAgICBvbkVycm9yOiAoKSA9PiB7fVxuICAgIH07XG5cbiAgICBjb25zdCBjaGFpbiA9IHtcbiAgICAgICAgZGF0YTogKGNiID0gKCkgPT4ge30pID0+IHtcbiAgICAgICAgICAgIGNhbGxiYWNrcy5vbkRhdGEgPSBjYjtcbiAgICAgICAgICAgIHJldHVybiBjaGFpbjtcbiAgICAgICAgfSxcbiAgICAgICAgZXJyb3I6IChjYiA9ICgpID0+IHt9KSA9PiB7XG4gICAgICAgICAgICBjYWxsYmFja3Mub25FcnJvciA9IGNiO1xuICAgICAgICAgICAgcmV0dXJuIGNoYWluO1xuICAgICAgICB9XG4gICAgfTtcblxuICAgIGNvbnN0IHdvciA9IG5ldyBjb25maWcud2ViMy5ldGguQ29udHJhY3QoY29uZmlnLmNvbnRyYWN0cy5Xb3JrZXJOb2RlLmFiaSwgYWRkcmVzcyk7XG4gICAgd29yLmV2ZW50cy5TdGF0ZUNoYW5nZWQoKVxuICAgICAgICAub24oJ2RhdGEnLCBhc3luYyByZXMgPT4ge1xuXG4gICAgICAgICAgICB0cnkge1xuXG4gICAgICAgICAgICAgICAgY29uc3Qgd29ya2VyID0gYXdhaXQgZmV0Y2hXb3JrZXIocmVzLnJldHVyblZhbHVlcy53b3JrZXJOb2RlLCBjb25maWcpO1xuICAgICAgICAgICAgICAgIGNhbGxiYWNrcy5vbkRhdGEoe1xuICAgICAgICAgICAgICAgICAgICBhZGRyZXNzOiByZXMucmV0dXJuVmFsdWVzLndvcmtlck5vZGUsXG4gICAgICAgICAgICAgICAgICAgIHdvcmtlcixcbiAgICAgICAgICAgICAgICAgICAgc3RhdHVzOiAnY2hhbmdlZCcsXG4gICAgICAgICAgICAgICAgICAgIGV2ZW50OiAnV29ya2VyTm9kZS5TdGF0ZUNoYW5nZWQnXG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9IGNhdGNoKGVycikge1xuICAgICAgICAgICAgICAgIGNhbGxiYWNrcy5vbkVycm9yKGVycik7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pXG4gICAgICAgIC5vbignZXJyb3InLCBjYWxsYmFja3Mub25FcnJvcik7XG5cbiAgICByZXR1cm4gY2hhaW47XG59O1xuXG4vKipcbiAqIFRyYW5zaXRpb24gb2YgYSBXb3JrZXJOb2RlIHRvIHRoZSBJZGxlIHN0YXRlXG4gKiBcbiAqIEBwYXJhbSB7U3RyaW5nfSB3b3JrZXJOb2RlQWRkcmVzcyBcbiAqIEBwYXJhbSB7U3RyaW5nfSBmcm9tXG4gKiBAcGFyYW0ge09iamVjdH0gY29uZmlnIExpYnJhcnkgY29uZmlnIChwcm92aWRlZCBieSB0aGUgcHJveHkgYnV0IGNhbiBiZSBvdmVycmlkZGVuKVxuICogQHJldHVybnMge1Byb21pc2V9IFByb21pc2Ugb2JqZWN0IHJlc29sdmVkIHRvIGFkZCBzdGF0dXMgKGJvb2xlYW4pXG4gKi9cbmV4cG9ydCBjb25zdCBhbGl2ZSA9ICh3b3JrZXJOb2RlQWRkcmVzcywgZnJvbSwgY29uZmlnID0ge30pID0+IG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcblxuICAgIGV4cGVjdC5hbGwoeyB3b3JrZXJOb2RlQWRkcmVzcywgZnJvbSB9LCB7XG4gICAgICAgICd3b3JrZXJOb2RlQWRkcmVzcyc6IHtcbiAgICAgICAgICAgIHR5cGU6ICdhZGRyZXNzJ1xuICAgICAgICB9LFxuICAgICAgICAnZnJvbSc6IHtcbiAgICAgICAgICAgIHR5cGU6ICdhZGRyZXNzJ1xuICAgICAgICB9XG4gICAgfSk7XG5cbiAgICBleHBlY3QuYWxsKGNvbmZpZywge1xuICAgICAgICAnd2ViMyc6IHtcbiAgICAgICAgICAgIHR5cGU6ICdvYmplY3QnLFxuICAgICAgICAgICAgY29kZTogV0VCM19SRVFVSVJFRFxuICAgICAgICB9LFxuICAgICAgICAnY29udHJhY3RzLldvcmtlck5vZGUuYWJpJzoge1xuICAgICAgICAgICAgdHlwZTogJ29iamVjdCcsXG4gICAgICAgICAgICBjb2RlOiBDT05UUkFDVF9SRVFVSVJFRCxcbiAgICAgICAgICAgIGFyZ3M6IFsnV29ya2VyTm9kZSddXG4gICAgICAgIH1cbiAgICB9KTtcblxuICAgIGNvbnN0IHdybiA9IG5ldyBjb25maWcud2ViMy5ldGguQ29udHJhY3QoY29uZmlnLmNvbnRyYWN0cy5Xb3JrZXJOb2RlLmFiaSwgd29ya2VyTm9kZUFkZHJlc3MpO1xuICAgIHdybi5tZXRob2RzXG4gICAgICAgIC5hbGl2ZSgpXG4gICAgICAgIC5zZW5kKHtcbiAgICAgICAgICAgIGZyb20sXG4gICAgICAgICAgICBnYXM6IDY3MDAwMDBcbiAgICAgICAgfSlcbiAgICAgICAgLm9uKCdlcnJvcicsIHJlamVjdClcbiAgICAgICAgLm9uKCdyZWNlaXB0JywgcmVjZWlwdCA9PiB7XG5cbiAgICAgICAgICAgIGlmIChOdW1iZXIocmVjZWlwdC5zdGF0dXMpID09PSAwKSB7XG5cbiAgICAgICAgICAgICAgICByZXR1cm4gcmVqZWN0KHBqc0Vycm9yKFRSQU5TQUNUSU9OX1VOU1VDQ0VTU0ZVTCkpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICByZXNvbHZlKHJlY2VpcHQpO1xuICAgICAgICB9KTtcbn0pO1xuIl19