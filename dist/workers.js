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
exports.eventWorkerNodeStateChanged = exports.eventWorkerNodeCreated = exports.fetchAll = exports.fetchWorkerById = exports.fetchWorker = exports.fetchActiveJobAddress = exports.fetchReputation = exports.fetchState = exports.fetchAddressById = exports.fetchCount = void 0;

var expect = _interopRequireWildcard(require("./helpers/expect"));

var _errors = require("./helpers/errors");

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
      type: 'string',
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

const fetchState = async (address, config = {}) => {
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

const fetchReputation = async (address, config = {}) => {
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

const fetchActiveJobAddress = async (address, config = {}) => {
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

const fetchWorker = async (address, config = {}) => {
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
 * Handle event WorkerNodeCreated
 * 
 * @param {Object} options Event handler options
 * @param {Object} config Library config (provided by the proxy but can be overridden)
 */


exports.fetchAll = fetchAll;

const eventWorkerNodeCreated = (options = {}, config = {}) => new Promise((resolve, reject) => {
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
  pan.events.WorkerNodeCreated(options).on('data', async res => {
    try {
      const worker = await fetchWorker(res.returnValues.workerNode, config);
      resolve({
        address: res.returnValues.workerNode,
        worker,
        status: 'created',
        event: 'Pandora.WorkerNodeCreated'
      });
    } catch (err) {
      reject(err);
    }
  }).on('error', reject);
});
/**
 * Handle event StateChanged for WorkerNode
 * 
 * @param {string} address
 * @param {Object} config Library config (provided by the proxy but can be overridden)
 * @returns {Promise} A Promise object represents the {Object} 
 */


exports.eventWorkerNodeCreated = eventWorkerNodeCreated;

const eventWorkerNodeStateChanged = (address, config = {}) => new Promise((resolve, reject) => {
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
  wor.events.StateChanged().on('data', async res => {
    try {
      const worker = await fetchWorker(res.returnValues.workerNode, config);
      resolve({
        address: res.returnValues.workerNode,
        worker,
        status: 'changed',
        event: 'WorkerNode.StateChanged'
      });
    } catch (err) {
      reject(err);
    }
  }).on('error', reject);
});

exports.eventWorkerNodeStateChanged = eventWorkerNodeStateChanged;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy93b3JrZXJzLmpzIl0sIm5hbWVzIjpbImZldGNoQ291bnQiLCJjb25maWciLCJleHBlY3QiLCJhbGwiLCJ0eXBlIiwiY29kZSIsIldFQjNfUkVRVUlSRUQiLCJDT05UUkFDVF9SRVFVSVJFRCIsImFyZ3MiLCJBRERSRVNTX1JFUVVJUkVEIiwicGFuIiwid2ViMyIsImV0aCIsIkNvbnRyYWN0IiwiY29udHJhY3RzIiwiUGFuZG9yYSIsImFiaSIsImFkZHJlc3NlcyIsImNvdW50IiwibWV0aG9kcyIsIndvcmtlck5vZGVzQ291bnQiLCJjYWxsIiwiTnVtYmVyIiwicGFyc2VJbnQiLCJmZXRjaEFkZHJlc3NCeUlkIiwiaWQiLCJhZGRyZXNzIiwid29ya2VyTm9kZXMiLCJTdHJpbmciLCJmZXRjaFN0YXRlIiwid29yIiwiV29ya2VyTm9kZSIsInN0YXRlIiwiY3VycmVudFN0YXRlIiwiZmV0Y2hSZXB1dGF0aW9uIiwicmVwdXRhdGlvbiIsImZldGNoQWN0aXZlSm9iQWRkcmVzcyIsImFjdGl2ZUpvYiIsImZldGNoV29ya2VyIiwiUHJvbWlzZSIsImN1cnJlbnRKb2IiLCJqb2JTdGF0ZSIsImN1cnJlbnRKb2JTdGF0dXMiLCJmZXRjaFdvcmtlckJ5SWQiLCJ3b3JrZXIiLCJmZXRjaEFsbCIsInJlY29yZHMiLCJlcnJvciIsImkiLCJwdXNoIiwiZXJyIiwibWVzc2FnZSIsImV2ZW50V29ya2VyTm9kZUNyZWF0ZWQiLCJvcHRpb25zIiwicmVzb2x2ZSIsInJlamVjdCIsImV2ZW50cyIsIldvcmtlck5vZGVDcmVhdGVkIiwib24iLCJyZXMiLCJyZXR1cm5WYWx1ZXMiLCJ3b3JrZXJOb2RlIiwic3RhdHVzIiwiZXZlbnQiLCJldmVudFdvcmtlck5vZGVTdGF0ZUNoYW5nZWQiLCJTdGF0ZUNoYW5nZWQiXSwibWFwcGluZ3MiOiJBQUFBOzs7Ozs7OztBQVNBOzs7Ozs7O0FBRUE7O0FBQ0E7O0FBTUE7Ozs7Ozs7O0FBRUE7Ozs7OztBQU1PLE1BQU1BLGFBQWEs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QyxDQUFyQjtBQUNBcUQsY0FBUTtBQUNKNUIsaUJBQVNpQyxJQUFJQyxZQUFKLENBQWlCQyxVQUR0QjtBQUVKakIsY0FGSTtBQUdKa0IsZ0JBQVEsU0FISjtBQUlKQyxlQUFPO0FBSkgsT0FBUjtBQU1ILEtBVEQsQ0FTRSxPQUFNYixHQUFOLEVBQVc7QUFDVEssYUFBT0wsR0FBUDtBQUNIO0FBQ0osR0FmTCxFQWdCS1EsRUFoQkwsQ0FnQlEsT0FoQlIsRUFnQmlCSCxNQWhCakI7QUFpQkgsQ0FoQ29FLENBQTlEIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBXb3JrZXJOb2RlcyByZWxhdGVkIG1ldGhvZHNcbiAqIFRoaXMgZmlsZSBpdCBpcyBhIHBhcnQgb2YgdGhlIFBhbmRvcmEgUHlycmhhIEphdmFzY3JpcHQgbGlicmFyeVxuICogXG4gKiBAZmlsZSB3b3JrZXJzLmpzXG4gKiBAYXV0aG9yIEtvc3RpYW50eW4gU215cm5vdiA8a29zdHlzaEBnbWFpbC5jb20+XG4gKiBAZGF0ZSAyMDE4XG4gKi9cblxuJ3VzZSBzdHJpY3QnO1xuXG5pbXBvcnQgKiBhcyBleHBlY3QgZnJvbSAnLi9oZWxwZXJzL2V4cGVjdCc7XG5pbXBvcnQge1xuICAgIENPTlRSQUNUX1JFUVVJUkVELFxuICAgIEFERFJFU1NfUkVRVUlSRUQsXG4gICAgV0VCM19SRVFVSVJFRFxufSBmcm9tICcuL2hlbHBlcnMvZXJyb3JzJztcblxuaW1wb3J0IHsgZmV0Y2hTdGF0ZSBhcyBmZXRjaEpvYlN0YXRlIH0gZnJvbSAnLi9qb2JzJztcblxuLyoqXG4gKiBHZXQgd29ya2VyIG5vZGVzIGNvdW50IGZyb20gUGFuZG9yYSBjb250cmFjdFxuICogXG4gKiBAcGFyYW0ge09iamVjdH0gY29uZmlnIExpYnJhcnkgY29uZmlnIChwcm92aWRlZCBieSB0aGUgcHJveHkgYnV0IGNhbiBiZSBvdmVycmlkZGVuKVxuICogQHJldHVybnMge1Byb21pc2V9IEEgUHJvbWlzZSBvYmplY3QgcmVwcmVzZW50cyB0aGUge251bWJlcn0gXG4gKi9cbmV4cG9ydCBjb25zdCBmZXRjaENvdW50ID0gYXN5bmMgKGNvbmZpZyA9IHt9KSA9PiB7XG5cbiAgICBleHBlY3QuYWxsKGNvbmZpZywge1xuICAgICAgICAnd2ViMyc6IHtcbiAgICAgICAgICAgIHR5cGU6ICdvYmplY3QnLFxuICAgICAgICAgICAgY29kZTogV0VCM19SRVFVSVJFRFxuICAgICAgICB9LFxuICAgICAgICAnY29udHJhY3RzLlBhbmRvcmEuYWJpJzoge1xuICAgICAgICAgICAgdHlwZTogJ29iamVjdCcsXG4gICAgICAgICAgICBjb2RlOiBDT05UUkFDVF9SRVFVSVJFRCxcbiAgICAgICAgICAgIGFyZ3M6IFsnUGFuZG9yYSddXG4gICAgICAgIH0sXG4gICAgICAgICdhZGRyZXNzZXMuUGFuZG9yYSc6IHtcbiAgICAgICAgICAgIHR5cGU6ICdzdHJpbmcnLFxuICAgICAgICAgICAgY29kZTogQUREUkVTU19SRVFVSVJFRCxcbiAgICAgICAgICAgIGFyZ3M6IFsnUGFuZG9yYSddXG4gICAgICAgIH1cbiAgICB9KTtcblxuICAgIGNvbnN0IHBhbiA9IG5ldyBjb25maWcud2ViMy5ldGguQ29udHJhY3QoY29uZmlnLmNvbnRyYWN0cy5QYW5kb3JhLmFiaSwgY29uZmlnLmFkZHJlc3Nlcy5QYW5kb3JhKTtcbiAgICBjb25zdCBjb3VudCA9IGF3YWl0IHBhbi5tZXRob2RzXG4gICAgICAgIC53b3JrZXJOb2Rlc0NvdW50KClcbiAgICAgICAgLmNhbGwoKTtcblxuICAgIHJldHVybiBOdW1iZXIucGFyc2VJbnQoY291bnQsIDEwKTtcbn07XG5cbi8qKlxuICogR2V0IHdvcmtlciBhZGRyZXNzIGZyb20gUGFuZG9yYSBjb250cmFjdCBieSB0aGUgd29ya2VyIElkXG4gKiBcbiAqIEBwYXJhbSB7aW50ZWdlcn0gaWQgV29ya2VyIElkXG4gKiBAcGFyYW0ge09iamVjdH0gY29uZmlnIExpYnJhcnkgY29uZmlnIChwcm92aWRlZCBieSB0aGUgcHJveHkgYnV0IGNhbiBiZSBvdmVycmlkZGVuKVxuICogQHJldHVybnMge1Byb21pc2V9IEEgUHJvbWlzZSBvYmplY3QgcmVwcmVzZW50cyB0aGUge3N0cmluZ30gXG4gKi9cbmV4cG9ydCBjb25zdCBmZXRjaEFkZHJlc3NCeUlkID0gYXN5bmMgKGlkLCBjb25maWcgPSB7fSkgPT4ge1xuXG4gICAgZXhwZWN0LmFsbChjb25maWcsIHtcbiAgICAgICAgJ3dlYjMnOiB7XG4gICAgICAgICAgICB0eXBlOiAnb2JqZWN0JyxcbiAgICAgICAgICAgIGNvZGU6IFdFQjNfUkVRVUlSRURcbiAgICAgICAgfSxcbiAgICAgICAgJ2NvbnRyYWN0cy5QYW5kb3JhLmFiaSc6IHtcbiAgICAgICAgICAgIHR5cGU6ICdvYmplY3QnLFxuICAgICAgICAgICAgY29kZTogQ09OVFJBQ1RfUkVRVUlSRUQsXG4gICAgICAgICAgICBhcmdzOiBbJ1BhbmRvcmEnXVxuICAgICAgICB9LFxuICAgICAgICAnYWRkcmVzc2VzLlBhbmRvcmEnOiB7XG4gICAgICAgICAgICB0eXBlOiAnc3RyaW5nJyxcbiAgICAgICAgICAgIGNvZGU6IEFERFJFU1NfUkVRVUlSRUQsXG4gICAgICAgICAgICBhcmdzOiBbJ1BhbmRvcmEnXVxuICAgICAgICB9XG4gICAgfSk7XG5cbiAgICBjb25zdCBwYW4gPSBuZXcgY29uZmlnLndlYjMuZXRoLkNvbnRyYWN0KGNvbmZpZy5jb250cmFjdHMuUGFuZG9yYS5hYmksIGNvbmZpZy5hZGRyZXNzZXMuUGFuZG9yYSk7XG4gICAgY29uc3QgYWRkcmVzcyA9IGF3YWl0IHBhbi5tZXRob2RzXG4gICAgICAgIC53b3JrZXJOb2RlcyhpZClcbiAgICAgICAgLmNhbGwoKTtcblxuICAgIHJldHVybiBTdHJpbmcoYWRkcmVzcyk7XG59O1xuXG4vKipcbiAqIEdldCB3b3JrZXIgc3RhdGUgZnJvbSBXb3JrZXIgY29udHJhY3QgYnkgdGhlIHdvcmtlciBhZGRyZXNzXG4gKiBcbiAqIEBwYXJhbSB7c3RyaW5nfSBhZGRyZXNzIFxuICogQHBhcmFtIHtPYmplY3R9IGNvbmZpZyBMaWJyYXJ5IGNvbmZpZyAocHJvdmlkZWQgYnkgdGhlIHByb3h5IGJ1dCBjYW4gYmUgb3ZlcnJpZGRlbilcbiAqIEByZXR1cm5zIHtQcm9taXNlfSBBIFByb21pc2Ugb2JqZWN0IHJlcHJlc2VudHMgdGhlIHtudW1iZXJ9XG4gKi9cbmV4cG9ydCBjb25zdCBmZXRjaFN0YXRlID0gYXN5bmMgKGFkZHJlc3MsIGNvbmZpZyA9IHt9KSA9PiB7XG5cbiAgICBleHBlY3QuYWxsKGNvbmZpZywge1xuICAgICAgICAnd2ViMyc6IHtcbiAgICAgICAgICAgIHR5cGU6ICdvYmplY3QnLFxuICAgICAgICAgICAgY29kZTogV0VCM19SRVFVSVJFRFxuICAgICAgICB9LFxuICAgICAgICAnY29udHJhY3RzLldvcmtlck5vZGUuYWJpJzoge1xuICAgICAgICAgICAgdHlwZTogJ29iamVjdCcsXG4gICAgICAgICAgICBjb2RlOiBDT05UUkFDVF9SRVFVSVJFRCxcbiAgICAgICAgICAgIGFyZ3M6IFsnV29ya2VyTm9kZSddXG4gICAgICAgIH1cbiAgICB9KTtcblxuICAgIGNvbnN0IHdvciA9IG5ldyBjb25maWcud2ViMy5ldGguQ29udHJhY3QoY29uZmlnLmNvbnRyYWN0cy5Xb3JrZXJOb2RlLmFiaSwgYWRkcmVzcyk7ICAgIFxuICAgIGNvbnN0IHN0YXRlID0gYXdhaXQgd29yLm1ldGhvZHNcbiAgICAgICAgLmN1cnJlbnRTdGF0ZSgpXG4gICAgICAgIC5jYWxsKCk7XG5cbiAgICByZXR1cm4gTnVtYmVyLnBhcnNlSW50KHN0YXRlLCAxMCk7XG59O1xuXG4vKipcbiAqIEdldCB3b3JrZXIgcmVwdXRhdGlvbiBmcm9tIFdvcmtlciBjb250cmFjdCBieSB0aGUgd29ya2VyIGFkZHJlc3NcbiAqIFxuICogQHBhcmFtIHtzdHJpbmd9IGFkZHJlc3MgXG4gKiBAcGFyYW0ge09iamVjdH0gY29uZmlnIExpYnJhcnkgY29uZmlnIChwcm92aWRlZCBieSB0aGUgcHJveHkgYnV0IGNhbiBiZSBvdmVycmlkZGVuKVxuICogQHJldHVybnMge1Byb21pc2V9IEEgUHJvbWlzZSBvYmplY3QgcmVwcmVzZW50cyB0aGUge251bWJlcn1cbiAqL1xuZXhwb3J0IGNvbnN0IGZldGNoUmVwdXRhdGlvbiA9IGFzeW5jIChhZGRyZXNzLCBjb25maWcgPSB7fSkgPT4ge1xuXG4gICAgZXhwZWN0LmFsbChjb25maWcsIHtcbiAgICAgICAgJ3dlYjMnOiB7XG4gICAgICAgICAgICB0eXBlOiAnb2JqZWN0JyxcbiAgICAgICAgICAgIGNvZGU6IFdFQjNfUkVRVUlSRURcbiAgICAgICAgfSxcbiAgICAgICAgJ2NvbnRyYWN0cy5Xb3JrZXJOb2RlLmFiaSc6IHtcbiAgICAgICAgICAgIHR5cGU6ICdvYmplY3QnLFxuICAgICAgICAgICAgY29kZTogQ09OVFJBQ1RfUkVRVUlSRUQsXG4gICAgICAgICAgICBhcmdzOiBbJ1dvcmtlck5vZGUnXVxuICAgICAgICB9XG4gICAgfSk7XG5cbiAgICBjb25zdCB3b3IgPSBuZXcgY29uZmlnLndlYjMuZXRoLkNvbnRyYWN0KGNvbmZpZy5jb250cmFjdHMuV29ya2VyTm9kZS5hYmksIGFkZHJlc3MpO1xuICAgIGNvbnN0IHJlcHV0YXRpb24gPSBhd2FpdCB3b3IubWV0aG9kc1xuICAgICAgICAucmVwdXRhdGlvbigpXG4gICAgICAgIC5jYWxsKCk7XG5cbiAgICByZXR1cm4gTnVtYmVyLnBhcnNlSW50KHJlcHV0YXRpb24sIDEwKTtcbn07XG5cbi8qKlxuICogR2V0IHdvcmtlcidzIGFjdGl2ZSBqb2IgZnJvbSBXb3JrZXIgY29udHJhY3QgYnkgdGhlIHdvcmtlciBhZGRyZXNzXG4gKiBcbiAqIEBwYXJhbSB7c3RyaW5nfSBhZGRyZXNzIFxuICogQHBhcmFtIHtPYmplY3R9IGNvbmZpZyBMaWJyYXJ5IGNvbmZpZyAocHJvdmlkZWQgYnkgdGhlIHByb3h5IGJ1dCBjYW4gYmUgb3ZlcnJpZGRlbilcbiAqIEByZXR1cm5zIHtQcm9taXNlfSBBIFByb21pc2Ugb2JqZWN0IHJlcHJlc2VudHMgdGhlIHtzdHJpbmd9XG4gKi9cbmV4cG9ydCBjb25zdCBmZXRjaEFjdGl2ZUpvYkFkZHJlc3MgPSBhc3luYyAoYWRkcmVzcywgY29uZmlnID0ge30pID0+IHtcblxuICAgIGV4cGVjdC5hbGwoY29uZmlnLCB7XG4gICAgICAgICd3ZWIzJzoge1xuICAgICAgICAgICAgdHlwZTogJ29iamVjdCcsXG4gICAgICAgICAgICBjb2RlOiBXRUIzX1JFUVVJUkVEXG4gICAgICAgIH0sXG4gICAgICAgICdjb250cmFjdHMuV29ya2VyTm9kZS5hYmknOiB7XG4gICAgICAgICAgICB0eXBlOiAnb2JqZWN0JyxcbiAgICAgICAgICAgIGNvZGU6IENPTlRSQUNUX1JFUVVJUkVELFxuICAgICAgICAgICAgYXJnczogWydXb3JrZXJOb2RlJ11cbiAgICAgICAgfVxuICAgIH0pO1xuXG4gICAgY29uc3Qgd29yID0gbmV3IGNvbmZpZy53ZWIzLmV0aC5Db250cmFjdChjb25maWcuY29udHJhY3RzLldvcmtlck5vZGUuYWJpLCBhZGRyZXNzKTtcbiAgICBjb25zdCBhY3RpdmVKb2IgPSBhd2FpdCB3b3IubWV0aG9kc1xuICAgICAgICAuYWN0aXZlSm9iKClcbiAgICAgICAgLmNhbGwoKTtcblxuICAgIHJldHVybiBTdHJpbmcoYWN0aXZlSm9iLCAxMCk7XG59O1xuXG4vKipcbiAqIEdldCB3b3JrZXIgYnkgdGhlIHdvcmtlcidzIGFkZHJlc3NcbiAqIFxuICogQHBhcmFtIHtzdHJpbmd9IGFkZHJlc3NcbiAqIEBwYXJhbSB7T2JqZWN0fSBjb25maWcgTGlicmFyeSBjb25maWcgKHByb3ZpZGVkIGJ5IHRoZSBwcm94eSBidXQgY2FuIGJlIG92ZXJyaWRkZW4pXG4gKiBAcmV0dXJucyB7UHJvbWlzZX0gQSBQcm9taXNlIG9iamVjdCByZXByZXNlbnRzIHRoZSB7T2JqZWN0fVxuICovXG5leHBvcnQgY29uc3QgZmV0Y2hXb3JrZXIgPSBhc3luYyAoYWRkcmVzcywgY29uZmlnID0ge30pID0+IHtcbiAgICBcbiAgICBjb25zdCBbXG4gICAgICAgIGN1cnJlbnRTdGF0ZSxcbiAgICAgICAgcmVwdXRhdGlvbixcbiAgICAgICAgYWN0aXZlSm9iXG4gICAgXSA9IGF3YWl0IFByb21pc2UuYWxsKFtcbiAgICAgICAgZmV0Y2hTdGF0ZShhZGRyZXNzLCBjb25maWcpLFxuICAgICAgICBmZXRjaFJlcHV0YXRpb24oYWRkcmVzcywgY29uZmlnKSxcbiAgICAgICAgZmV0Y2hBY3RpdmVKb2JBZGRyZXNzKGFkZHJlc3MsIGNvbmZpZylcbiAgICBdKTtcblxuXG4gICAgbGV0IGN1cnJlbnRKb2IgPSBhY3RpdmVKb2I7XG4gICAgbGV0IGpvYlN0YXRlOyAgICBcblxuICAgIC8vIENoZWNrIGlzIG5vdCAweDBcbiAgICBpZiAoK2FjdGl2ZUpvYiAhPT0gMCkge1xuXG4gICAgICAgIGpvYlN0YXRlID0gYXdhaXQgZmV0Y2hKb2JTdGF0ZShhY3RpdmVKb2IsIGNvbmZpZyk7XG4gICAgfSBlbHNlIHtcbiAgICAgICAgY3VycmVudEpvYiA9IG51bGw7XG4gICAgICAgIGpvYlN0YXRlID0gLTE7XG4gICAgfVxuXG4gICAgcmV0dXJuIHtcbiAgICAgICAgYWRkcmVzcyxcbiAgICAgICAgY3VycmVudFN0YXRlLFxuICAgICAgICByZXB1dGF0aW9uLFxuICAgICAgICBjdXJyZW50Sm9iLFxuICAgICAgICBjdXJyZW50Sm9iU3RhdHVzOiBqb2JTdGF0ZVxuICAgIH07XG59O1xuXG4vKipcbiAqIEdldCB3b3JrZXIgYnkgdGhlIHdvcmtlcidzIGlkXG4gKiBcbiAqIEBwYXJhbSB7aW50ZWdlcn0gaWQgXG4gKiBAcGFyYW0ge09iamVjdH0gY29uZmlnIExpYnJhcnkgY29uZmlnIChwcm92aWRlZCBieSB0aGUgcHJveHkgYnV0IGNhbiBiZSBvdmVycmlkZGVuKVxuICogQHJldHVybnMge1Byb21pc2V9IEEgUHJvbWlzZSBvYmplY3QgcmVwcmVzZW50cyB0aGUge09iamVjdH1cbiAqL1xuZXhwb3J0IGNvbnN0IGZldGNoV29ya2VyQnlJZCA9IGFzeW5jIChpZCwgY29uZmlnID0ge30pID0+IHtcbiAgICBcbiAgICBjb25zdCBhZGRyZXNzID0gYXdhaXQgZmV0Y2hBZGRyZXNzQnlJZChpZCwgY29uZmlnKTtcbiAgICBjb25zdCB3b3JrZXIgPSBhd2FpdCBmZXRjaFdvcmtlcihhZGRyZXNzLCBjb25maWcpO1xuXG4gICAgcmV0dXJuIHtcbiAgICAgICAgaWQ6IGlkLFxuICAgICAgICAuLi53b3JrZXJcbiAgICB9O1xufTtcblxuLyoqXG4gKiBHZXQgYWxsIHdvcmtlcnNcbiAqIFxuICogQHBhcmFtIHtPYmplY3R9IGNvbmZpZyBMaWJyYXJ5IGNvbmZpZyAocHJvdmlkZWQgYnkgdGhlIHByb3h5IGJ1dCBjYW4gYmUgb3ZlcnJpZGRlbilcbiAqIEByZXR1cm5zIHtQcm9taXNlfSBBIFByb21pc2Ugb2JqZWN0IHJlcHJlc2VudHMgdGhlIHtudW1iZXJ9XG4gKi9cbmV4cG9ydCBjb25zdCBmZXRjaEFsbCA9IGFzeW5jIChjb25maWcgPSB7fSkgPT4ge1xuICAgIGxldCByZWNvcmRzID0gW107XG4gICAgbGV0IGVycm9yID0gW107XG5cbiAgICB0cnkge1xuXG4gICAgICAgIGNvbnN0IGNvdW50ID0gYXdhaXQgZmV0Y2hDb3VudChjb25maWcpOyAgICBcblxuICAgICAgICBmb3IgKGxldCBpPTA7IGkgPCBjb3VudDsgaSsrKSB7XG4gICAgICAgICAgICBcbiAgICAgICAgICAgIHRyeSB7XG5cbiAgICAgICAgICAgICAgICBjb25zdCB3b3JrZXIgPSBhd2FpdCBmZXRjaFdvcmtlckJ5SWQoaSwgY29uZmlnKTtcblxuICAgICAgICAgICAgICAgIHJlY29yZHMucHVzaCh7XG4gICAgICAgICAgICAgICAgICAgIGlkOiBpLFxuICAgICAgICAgICAgICAgICAgICAuLi53b3JrZXJcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH0gY2F0Y2goZXJyKSB7XG4gICAgICAgICAgICAgICAgZXJyb3IucHVzaCh7XG4gICAgICAgICAgICAgICAgICAgIGlkOiBpLFxuICAgICAgICAgICAgICAgICAgICBtZXNzYWdlOiBlcnIubWVzc2FnZVxuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfSAgICAgICAgXG4gICAgICAgIH1cbiAgICB9IGNhdGNoKGVycikge1xuICAgICAgICBlcnJvci5wdXNoKHtcbiAgICAgICAgICAgIGVycm9yOiBlcnIubWVzc2FnZVxuICAgICAgICB9KTtcbiAgICB9ICAgXG5cbiAgICByZXR1cm4ge1xuICAgICAgICByZWNvcmRzLFxuICAgICAgICBlcnJvclxuICAgIH07XG59O1xuXG4vKipcbiAqIEhhbmRsZSBldmVudCBXb3JrZXJOb2RlQ3JlYXRlZFxuICogXG4gKiBAcGFyYW0ge09iamVjdH0gb3B0aW9ucyBFdmVudCBoYW5kbGVyIG9wdGlvbnNcbiAqIEBwYXJhbSB7T2JqZWN0fSBjb25maWcgTGlicmFyeSBjb25maWcgKHByb3ZpZGVkIGJ5IHRoZSBwcm94eSBidXQgY2FuIGJlIG92ZXJyaWRkZW4pXG4gKi9cbmV4cG9ydCBjb25zdCBldmVudFdvcmtlck5vZGVDcmVhdGVkID0gKG9wdGlvbnMgPSB7fSwgY29uZmlnID0ge30pID0+IG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcblxuICAgIGV4cGVjdC5hbGwoY29uZmlnLCB7XG4gICAgICAgICd3ZWIzJzoge1xuICAgICAgICAgICAgdHlwZTogJ29iamVjdCcsXG4gICAgICAgICAgICBjb2RlOiBXRUIzX1JFUVVJUkVEXG4gICAgICAgIH0sXG4gICAgICAgICdjb250cmFjdHMuUGFuZG9yYS5hYmknOiB7XG4gICAgICAgICAgICB0eXBlOiAnb2JqZWN0JyxcbiAgICAgICAgICAgIGNvZGU6IENPTlRSQUNUX1JFUVVJUkVELFxuICAgICAgICAgICAgYXJnczogWydQYW5kb3JhJ11cbiAgICAgICAgfSxcbiAgICAgICAgJ2FkZHJlc3Nlcy5QYW5kb3JhJzoge1xuICAgICAgICAgICAgdHlwZTogJ3N0cmluZycsXG4gICAgICAgICAgICBjb2RlOiBBRERSRVNTX1JFUVVJUkVELFxuICAgICAgICAgICAgYXJnczogWydQYW5kb3JhJ11cbiAgICAgICAgfVxuICAgIH0pO1xuXG4gICAgY29uc3QgcGFuID0gbmV3IGNvbmZpZy53ZWIzLmV0aC5Db250cmFjdChjb25maWcuY29udHJhY3RzLlBhbmRvcmEuYWJpLCBjb25maWcuYWRkcmVzc2VzLlBhbmRvcmEpO1xuICAgIHBhbi5ldmVudHMuV29ya2VyTm9kZUNyZWF0ZWQob3B0aW9ucylcbiAgICAgICAgLm9uKCdkYXRhJywgYXN5bmMgcmVzID0+IHtcblxuICAgICAgICAgICAgdHJ5IHtcblxuICAgICAgICAgICAgICAgIGNvbnN0IHdvcmtlciA9IGF3YWl0IGZldGNoV29ya2VyKHJlcy5yZXR1cm5WYWx1ZXMud29ya2VyTm9kZSwgY29uZmlnKTtcbiAgICAgICAgICAgICAgICByZXNvbHZlKHtcbiAgICAgICAgICAgICAgICAgICAgYWRkcmVzczogcmVzLnJldHVyblZhbHVlcy53b3JrZXJOb2RlLFxuICAgICAgICAgICAgICAgICAgICB3b3JrZXIsXG4gICAgICAgICAgICAgICAgICAgIHN0YXR1czogJ2NyZWF0ZWQnLFxuICAgICAgICAgICAgICAgICAgICBldmVudDogJ1BhbmRvcmEuV29ya2VyTm9kZUNyZWF0ZWQnXG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9IGNhdGNoKGVycikge1xuICAgICAgICAgICAgICAgIHJlamVjdChlcnIpO1xuICAgICAgICAgICAgfSAgICAgICAgICAgIFxuICAgICAgICB9KVxuICAgICAgICAub24oJ2Vycm9yJywgcmVqZWN0KTtcbn0pO1xuXG4vKipcbiAqIEhhbmRsZSBldmVudCBTdGF0ZUNoYW5nZWQgZm9yIFdvcmtlck5vZGVcbiAqIFxuICogQHBhcmFtIHtzdHJpbmd9IGFkZHJlc3NcbiAqIEBwYXJhbSB7T2JqZWN0fSBjb25maWcgTGlicmFyeSBjb25maWcgKHByb3ZpZGVkIGJ5IHRoZSBwcm94eSBidXQgY2FuIGJlIG92ZXJyaWRkZW4pXG4gKiBAcmV0dXJucyB7UHJvbWlzZX0gQSBQcm9taXNlIG9iamVjdCByZXByZXNlbnRzIHRoZSB7T2JqZWN0fSBcbiAqL1xuZXhwb3J0IGNvbnN0IGV2ZW50V29ya2VyTm9kZVN0YXRlQ2hhbmdlZCA9IChhZGRyZXNzLCBjb25maWcgPSB7fSkgPT4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuXG4gICAgZXhwZWN0LmFsbChjb25maWcsIHtcbiAgICAgICAgJ3dlYjMnOiB7XG4gICAgICAgICAgICB0eXBlOiAnb2JqZWN0JyxcbiAgICAgICAgICAgIGNvZGU6IFdFQjNfUkVRVUlSRURcbiAgICAgICAgfSxcbiAgICAgICAgJ2NvbnRyYWN0cy5Xb3JrZXJOb2RlLmFiaSc6IHtcbiAgICAgICAgICAgIHR5cGU6ICdvYmplY3QnLFxuICAgICAgICAgICAgY29kZTogQ09OVFJBQ1RfUkVRVUlSRUQsXG4gICAgICAgICAgICBhcmdzOiBbJ1dvcmtlck5vZGUnXVxuICAgICAgICB9XG4gICAgfSk7XG5cbiAgICBjb25zdCB3b3IgPSBuZXcgY29uZmlnLndlYjMuZXRoLkNvbnRyYWN0KGNvbmZpZy5jb250cmFjdHMuV29ya2VyTm9kZS5hYmksIGFkZHJlc3MpO1xuICAgIHdvci5ldmVudHMuU3RhdGVDaGFuZ2VkKClcbiAgICAgICAgLm9uKCdkYXRhJywgYXN5bmMgcmVzID0+IHtcblxuICAgICAgICAgICAgdHJ5IHtcblxuICAgICAgICAgICAgICAgIGNvbnN0IHdvcmtlciA9IGF3YWl0IGZldGNoV29ya2VyKHJlcy5yZXR1cm5WYWx1ZXMud29ya2VyTm9kZSwgY29uZmlnKTtcbiAgICAgICAgICAgICAgICByZXNvbHZlKHtcbiAgICAgICAgICAgICAgICAgICAgYWRkcmVzczogcmVzLnJldHVyblZhbHVlcy53b3JrZXJOb2RlLFxuICAgICAgICAgICAgICAgICAgICB3b3JrZXIsXG4gICAgICAgICAgICAgICAgICAgIHN0YXR1czogJ2NoYW5nZWQnLFxuICAgICAgICAgICAgICAgICAgICBldmVudDogJ1dvcmtlck5vZGUuU3RhdGVDaGFuZ2VkJ1xuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfSBjYXRjaChlcnIpIHtcbiAgICAgICAgICAgICAgICByZWplY3QoZXJyKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSlcbiAgICAgICAgLm9uKCdlcnJvcicsIHJlamVjdCk7XG59KTtcbiJdfQ==