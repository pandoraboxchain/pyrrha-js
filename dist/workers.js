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
 * @returns {Object} Object with chained callbacks #data and #error
 */


exports.fetchAll = fetchAll;

const eventWorkerNodeCreated = (options = {}, config = {}) => {
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

const eventWorkerNodeStateChanged = (address, config = {}) => {
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

exports.eventWorkerNodeStateChanged = eventWorkerNodeStateChanged;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy93b3JrZXJzLmpzIl0sIm5hbWVzIjpbImZldGNoQ291bnQiLCJjb25maWciLCJleHBlY3QiLCJhbGwiLCJ0eXBlIiwiY29kZSIsIldFQjNfUkVRVUlSRUQiLCJDT05UUkFDVF9SRVFVSVJFRCIsImFyZ3MiLCJBRERSRVNTX1JFUVVJUkVEIiwicGFuIiwid2ViMyIsImV0aCIsIkNvbnRyYWN0IiwiY29udHJhY3RzIiwiUGFuZG9yYSIsImFiaSIsImFkZHJlc3NlcyIsImNvdW50IiwibWV0aG9kcyIsIndvcmtlck5vZGVzQ291bnQiLCJjYWxsIiwiTnVtYmVyIiwicGFyc2VJbnQiLCJmZXRjaEFkZHJlc3NCeUlkIiwiaWQiLCJhZGRyZXNzIiwid29ya2VyTm9kZXMiLCJTdHJpbmciLCJmZXRjaFN0YXRlIiwid29yIiwiV29ya2VyTm9kZSIsInN0YXRlIiwiY3VycmVudFN0YXRlIiwiZmV0Y2hSZXB1dGF0aW9uIiwicmVwdXRhdGlvbiIsImZldGNoQWN0aXZlSm9iQWRkcmVzcyIsImFjdGl2ZUpvYiIsImZldGNoV29ya2VyIiwiUHJvbWlzZSIsImN1cnJlbnRKb2IiLCJqb2JTdGF0ZSIsImN1cnJlbnRKb2JTdGF0dXMiLCJmZXRjaFdvcmtlckJ5SWQiLCJ3b3JrZXIiLCJmZXRjaEFsbCIsInJlY29yZHMiLCJlcnJvciIsImkiLCJwdXNoIiwiZXJyIiwibWVzc2FnZSIsImV2ZW50V29ya2VyTm9kZUNyZWF0ZWQiLCJvcHRpb25zIiwiY2FsbGJhY2tzIiwib25EYXRhIiwib25FcnJvciIsImNoYWluIiwiZGF0YSIsImNiIiwiZXZlbnRzIiwiV29ya2VyTm9kZUNyZWF0ZWQiLCJvbiIsInJlcyIsInJldHVyblZhbHVlcyIsIndvcmtlck5vZGUiLCJzdGF0dXMiLCJldmVudCIsImV2ZW50V29ya2VyTm9kZVN0YXRlQ2hhbmdlZCIsIlN0YXRlQ2hhbmdlZCJdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7Ozs7O0FBU0E7Ozs7Ozs7QUFFQTs7QUFDQTs7QUFNQTs7Ozs7Ozs7QUFFQTs7Ozs7O0FBTU8sTUFBTUEsYUFBYSxPQUFPQyxTQUFTLEVBQWhCLEtBQXVCO0FBRTdDQyxTQUFPQyxHQUFQLENBQVdGLE1BQVgsRUFBbUI7QUFDZixZQUFRO0FBQ0pHLFlBQU0sUUFERjtBQUVKQyxZQUFNQztBQUZGLEtBRE87QUFLZiw2QkFBeUI7QUFDckJGLFlBQU0sUUFEZTtBQUVyQkMsWUFBTUUseUJBRmU7QUFHckJDLFlBQU0sQ0FBQyxTQUFEO0FBSGUsS0FMVjtBQVVmLHlCQUFxQjtBQUNqQkosWUFBTSxRQURXO0FBRWpCQyxZQUFNSSx3QkFGVztBQUdqQkQsWUFBTSxDQUFDLFNBQUQ7QUFIVztBQVZOLEdBQW5CO0FBaUJBLFFBQU1FLE1BQU0sSUFBSVQsT0FBT1UsSUFBUCxDQUFZQyxHQUFaLENBQWdCQyxRQUFwQixDQUE2QlosT0FBT2EsU0FBUCxDQUFpQkMsT0FBakIsQ0FBeUJDLEdBQXRELEVBQTJEZixPQUFPZ0IsU0FBUCxDQUFpQkYsT0FBNUUsQ0FBWjtBQUNBLFFBQU1HLFFBQVEsTUFBTVIsSUFBSVMsT0FBSixDQUNmQyxnQkFEZSxHQUVmQyxJQUZlLEVBQXBCO0FBSUEsU0FBT0MsT0FBT0MsUUFBUCxDQUFnQkwsS0FBaEIsRUFBdUIsRUFBdkIsQ0FBUDtBQUNILENBekJNO0FBMkJQOzs7Ozs7Ozs7OztBQU9PLE1BQU1NLG1CQUFtQixPQUFPQyxFQUFQLEVBQVd4QixTQUFTLEVBQXBCLEtBQTJCO0FBRXZEQyxTQUFPQyxHQUFQLENBQVdGLE1BQVgsRUFBbUI7QUFDZixZQUFRO0FBQ0pHLFlBQU0sUUFERjtBQUVKQyxZQUFNQztBQUZGLEtBRE87QUFLZiw2QkFBeUI7QUFDckJGLFlBQU0sUUFEZTtBQUVyQkMsWUFBTUUseUJBRmU7QUFHckJDLFlBQU0sQ0FBQyxTQUFEO0FBSGUsS0FMVjtBQVVmLHlCQUFxQjtBQUNqQkosWUFBTSxRQURXO0FBRWpCQyxZQUFNSSx3QkFGVztBQUdqQkQsWUFBTSxDQUFDLFNBQUQ7QUFIVztBQVZOLEdBQW5CO0FBaUJBLFFBQU1FLE1BQU0sSUFBSVQsT0FBT1UsSUFBUCxDQUFZQyxHQUFaLENBQWdCQyxRQUFwQixDQUE2QlosT0FBT2EsU0FBUCxDQUFpQkMsT0FBakIsQ0FBeUJDLEdBQXRELEVBQTJEZixPQUFPZ0IsU0FBUCxDQUFpQkYsT0FBNUUsQ0FBWjtBQUNBLFFBQU1XLFVBQVUsTUFBTWhCLElBQUlTLE9BQUosQ0FDakJRLFdBRGlCLENBQ0xGLEVBREssRUFFakJKLElBRmlCLEVBQXRCO0FBSUEsU0FBT08sT0FBT0YsT0FBUCxDQUFQO0FBQ0gsQ0F6Qk07QUEyQlA7Ozs7Ozs7Ozs7O0FBT08sTUFBTUcsYUFBYSxPQUFPSCxPQUFQLEVBQWdCekIsU0FBUyxFQUF6QixLQUFnQztBQUV0REMsU0FBT0MsR0FBUCxDQUFXRixNQUFYLEVBQW1CO0FBQ2YsWUFBUTtBQUNKRyxZQUFNLFFBREY7QUFFSkMsWUFBTUM7QUFGRixLQURPO0FBS2YsZ0NBQTRCO0FBQ3hCRixZQUFNLFFBRGtCO0FBRXhCQyxZQUFNRSx5QkFGa0I7QUFHeEJDLFlBQU0sQ0FBQyxZQUFEO0FBSGtCO0FBTGIsR0FBbkI7QUFZQSxRQUFNc0IsTUFBTSxJQUFJN0IsT0FBT1UsSUFBUCxDQUFZQyxHQUFaLENBQWdCQyxRQUFwQixDQUE2QlosT0FBT2EsU0FBUCxDQUFpQmlCLFVBQWpCLENBQTRCZixHQUF6RCxFQUE4RFUsT0FBOUQsQ0FBWjtBQUNBLFFBQU1NLFFBQVEsTUFBTUYsSUFBSVgsT0FBSixDQUNmYyxZQURlLEdBRWZaLElBRmUsRUFBcEI7QUFJQSxTQUFPQyxPQUFPQyxRQUFQLENBQWdCUyxLQUFoQixFQUF1QixFQUF2QixDQUFQO0FBQ0gsQ0FwQk07QUFzQlA7Ozs7Ozs7Ozs7O0FBT08sTUFBTUUsa0JBQWtCLE9BQU9SLE9BQVAsRUFBZ0J6QixTQUFTLEVBQXpCLEtBQWdDO0FBRTNEQyxTQUFPQyxHQUFQLENBQVdGLE1BQVgsRUFBbUI7QUFDZixZQUFRO0FBQ0pHLFlBQU0sUUFERjtBQUVKQyxZQUFNQztBQUZGLEtBRE87QUFLZixnQ0FBNEI7QUFDeEJGLFlBQU0sUUFEa0I7QUFFeEJDLFlBQU1FLHlCQUZrQjtBQUd4QkMsWUFBTSxDQUFDLFlBQUQ7QUFIa0I7QUFMYixHQUFuQjtBQVlBLFFBQU1zQixNQUFNLElBQUk3QixPQUFPVSxJQUFQLENBQVlDLEdBQVosQ0FBZ0JDLFFBQXBCLENBQTZCWixPQUFPYSxTQUFQLENBQWlCaUIsVUFBakIsQ0FBNEJmLEdBQXpELEVBQThEVSxPQUE5RCxDQUFaO0FBQ0EsUUFBTVMsYUFBYSxNQUFNTCxJQUFJWCxPQUFKLENBQ3BCZ0IsVUFEb0IsR0FFcEJkLElBRm9CLEVBQXpCO0FBSUEsU0FBT0MsT0FBT0MsUUFBUCxDQUFnQlksVUFBaEIsRUFBNEIsRUFBNUIsQ0FBUDtBQUNILENBcEJNO0FBc0JQOzs7Ozs7Ozs7OztBQU9PLE1BQU1DLHdCQUF3QixPQUFPVixPQUFQLEVBQWdCekIsU0FBUyxFQUF6QixLQUFnQztBQUVqRUMsU0FBT0MsR0FBUCxDQUFXRixNQUFYLEVBQW1CO0FBQ2YsWUFBUTtBQUNKRyxZQUFNLFFBREY7QUFFSkMsWUFBTUM7QUFGRixLQURPO0FBS2YsZ0NBQTRCO0FBQ3hCRixZQUFNLFFBRGtCO0FBRXhCQyxZQUFNRSx5QkFGa0I7QUFHeEJDLFlBQU0sQ0FBQyxZQUFEO0FBSGtCO0FBTGIsR0FBbkI7QUFZQSxRQUFNc0IsTUFBTSxJQUFJN0IsT0FBT1UsSUFBUCxDQUFZQyxHQUFaLENBQWdCQyxRQUFwQixDQUE2QlosT0FBT2EsU0FBUCxDQUFpQmlCLFVBQWpCLENBQTRCZixHQUF6RCxFQUE4RFUsT0FBOUQsQ0FBWjtBQUNBLFFBQU1XLFlBQVksTUFBTVAsSUFBSVgsT0FBSixDQUNuQmtCLFNBRG1CLEdBRW5CaEIsSUFGbUIsRUFBeEI7QUFJQSxTQUFPTyxPQUFPUyxTQUFQLEVBQWtCLEVBQWxCLENBQVA7QUFDSCxDQXBCTTtBQXNCUDs7Ozs7Ozs7Ozs7QUFPTyxNQUFNQyxjQUFjLE9BQU9aLE9BQVAsRUFBZ0J6QixTQUFTLEVBQXpCLEtBQWdDO0FBRXZELFFBQU0sQ0FDRmdDLFlBREUsRUFFRkUsVUFGRSxFQUdGRSxTQUhFLElBSUYsTUFBTUUsUUFBUXBDLEdBQVIsQ0FBWSxDQUNsQjBCLFdBQVdILE9BQVgsRUFBb0J6QixNQUFwQixDQURrQixFQUVsQmlDLGdCQUFnQlIsT0FBaEIsRUFBeUJ6QixNQUF6QixDQUZrQixFQUdsQm1DLHNCQUFzQlYsT0FBdEIsRUFBK0J6QixNQUEvQixDQUhrQixDQUFaLENBSlY7QUFXQSxNQUFJdUMsYUFBYUgsU0FBakI7QUFDQSxNQUFJSSxRQUFKLENBZHVELENBZ0J2RDs7QUFDQSxNQUFJLENBQUNKLFNBQUQsS0FBZSxDQUFuQixFQUFzQjtBQUVsQkksZUFBVyxNQUFNLHNCQUFjSixTQUFkLEVBQXlCcEMsTUFBekIsQ0FBakI7QUFDSCxHQUhELE1BR087QUFDSHVDLGlCQUFhLElBQWI7QUFDQUMsZUFBVyxDQUFDLENBQVo7QUFDSDs7QUFFRCxTQUFPO0FBQ0hmLFdBREc7QUFFSE8sZ0JBRkc7QUFHSEUsY0FIRztBQUlISyxjQUpHO0FBS0hFLHNCQUFrQkQ7QUFMZixHQUFQO0FBT0gsQ0FoQ007QUFrQ1A7Ozs7Ozs7Ozs7O0FBT08sTUFBTUUsa0JBQWtCLE9BQU9sQixFQUFQLEVBQVd4QixTQUFTLEVBQXBCLEtBQTJCO0FBRXRELFFBQU15QixVQUFVLE1BQU1GLGlCQUFpQkMsRUFBakIsRUFBcUJ4QixNQUFyQixDQUF0QjtBQUNBLFFBQU0yQyxTQUFTLE1BQU1OLFlBQVlaLE9BQVosRUFBcUJ6QixNQUFyQixDQUFyQjtBQUVBO0FBQ0l3QixRQUFJQTtBQURSLEtBRU9tQixNQUZQO0FBSUgsQ0FUTTtBQVdQOzs7Ozs7Ozs7O0FBTU8sTUFBTUMsV0FBVyxPQUFPNUMsU0FBUyxFQUFoQixLQUF1QjtBQUMzQyxNQUFJNkMsVUFBVSxFQUFkO0FBQ0EsTUFBSUMsUUFBUSxFQUFaOztBQUVBLE1BQUk7QUFFQSxVQUFNN0IsUUFBUSxNQUFNbEIsV0FBV0MsTUFBWCxDQUFwQjs7QUFFQSxTQUFLLElBQUkrQyxJQUFFLENBQVgsRUFBY0EsSUFBSTlCLEtBQWxCLEVBQXlCOEIsR0FBekIsRUFBOEI7QUFFMUIsVUFBSTtBQUVBLGNBQU1KLFNBQVMsTUFBTUQsZ0JBQWdCSyxDQUFoQixFQUFtQi9DLE1BQW5CLENBQXJCO0FBRUE2QyxnQkFBUUcsSUFBUjtBQUNJeEIsY0FBSXVCO0FBRFIsV0FFT0osTUFGUDtBQUlILE9BUkQsQ0FRRSxPQUFNTSxHQUFOLEVBQVc7QUFDVEgsY0FBTUUsSUFBTixDQUFXO0FBQ1B4QixjQUFJdUIsQ0FERztBQUVQRyxtQkFBU0QsSUFBSUM7QUFGTixTQUFYO0FBSUg7QUFDSjtBQUNKLEdBckJELENBcUJFLE9BQU1ELEdBQU4sRUFBVztBQUNUSCxVQUFNRSxJQUFOLENBQVc7QUFDUEYsYUFBT0csSUFBSUM7QUFESixLQUFYO0FBR0g7O0FBRUQsU0FBTztBQUNITCxXQURHO0FBRUhDO0FBRkcsR0FBUDtBQUlILENBbkNNO0FBcUNQOzs7Ozs7Ozs7OztBQU9PLE1BQU1LLHlCQUF5QixDQUFDQyxVQUFVLEVBQVgsRUFBZXBELFNBQVMsRUFBeEIsS0FBK0I7QUFFakVDLFNBQU9DLEdBQVAsQ0FBV0YsTUFBWCxFQUFtQjtBQUNmLFlBQVE7QUFDSkcsWUFBTSxRQURGO0FBRUpDLFlBQU1DO0FBRkYsS0FETztBQUtmLDZCQUF5QjtBQUNyQkYsWUFBTSxRQURlO0FBRXJCQyxZQUFNRSx5QkFGZTtBQUdyQkMsWUFBTSxDQUFDLFNBQUQ7QUFIZSxLQUxWO0FBVWYseUJBQXFCO0FBQ2pCSixZQUFNLFFBRFc7QUFFakJDLFlBQU1JLHdCQUZXO0FBR2pCRCxZQUFNLENBQUMsU0FBRDtBQUhXO0FBVk4sR0FBbkI7QUFpQkEsUUFBTThDLFlBQVk7QUFDZEMsWUFBUSxNQUFNLENBQUUsQ0FERjtBQUVkQyxhQUFTLE1BQU0sQ0FBRTtBQUZILEdBQWxCO0FBS0EsUUFBTUMsUUFBUTtBQUNWQyxVQUFNLENBQUNDLEtBQUssTUFBTSxDQUFFLENBQWQsS0FBbUI7QUFDckJMLGdCQUFVQyxNQUFWLEdBQW1CSSxFQUFuQjtBQUNBLGFBQU9GLEtBQVA7QUFDSCxLQUpTO0FBS1ZWLFdBQU8sQ0FBQ1ksS0FBSyxNQUFNLENBQUUsQ0FBZCxLQUFtQjtBQUN0QkwsZ0JBQVVFLE9BQVYsR0FBb0JHLEVBQXBCO0FBQ0EsYUFBT0YsS0FBUDtBQUNIO0FBUlMsR0FBZDtBQVdBLFFBQU0vQyxNQUFNLElBQUlULE9BQU9VLElBQVAsQ0FBWUMsR0FBWixDQUFnQkMsUUFBcEIsQ0FBNkJaLE9BQU9hLFNBQVAsQ0FBaUJDLE9BQWpCLENBQXlCQyxHQUF0RCxFQUEyRGYsT0FBT2dCLFNBQVAsQ0FBaUJGLE9BQTVFLENBQVo7QUFDQUwsTUFBSWtELE1BQUosQ0FBV0MsaUJBQVgsQ0FBNkJSLE9BQTdCLEVBQ0tTLEVBREwsQ0FDUSxNQURSLEVBQ2dCLE1BQU1DLEdBQU4sSUFBYTtBQUVyQixRQUFJO0FBRUEsWUFBTW5CLFNBQVMsTUFBTU4sWUFBWXlCLElBQUlDLFlBQUosQ0FBaUJDLFVBQTdCLEVBQXlDaEUsTUFBekMsQ0FBckI7QUFDQXFELGdCQUFVQyxNQUFWLENBQWlCO0FBQ2I3QixpQkFBU3FDLElBQUlDLFlBQUosQ0FBaUJDLFVBRGI7QUFFYnJCLGNBRmE7QUFHYnNCLGdCQUFRLFNBSEs7QUFJYkMsZUFBTztBQUpNLE9BQWpCO0FBTUgsS0FURCxDQVNFLE9BQU1qQixHQUFOLEVBQVc7QUFDVEksZ0JBQVVFLE9BQVYsQ0FBa0JOLEdBQWxCO0FBQ0g7QUFDSixHQWZMLEVBZ0JLWSxFQWhCTCxDQWdCUSxPQWhCUixFQWdCaUJSLFVBQVVFLE9BaEIzQjtBQWtCQSxTQUFPQyxLQUFQO0FBQ0gsQ0F2RE07QUF5RFA7Ozs7Ozs7Ozs7O0FBT08sTUFBTVcsOEJBQThCLENBQUMxQyxPQUFELEVBQVV6QixTQUFTLEVBQW5CLEtBQTBCO0FBRWpFQyxTQUFPQyxHQUFQLENBQVdGLE1BQVgsRUFBbUI7QUFDZixZQUFRO0FBQ0pHLFlBQU0sUUFERjtBQUVKQyxZQUFNQztBQUZGLEtBRE87QUFLZixnQ0FBNEI7QUFDeEJGLFlBQU0sUUFEa0I7QUFFeEJDLFlBQU1FLHlCQUZrQjtBQUd4QkMsWUFBTSxDQUFDLFlBQUQ7QUFIa0I7QUFMYixHQUFuQjtBQVlBLFFBQU04QyxZQUFZO0FBQ2RDLFlBQVEsTUFBTSxDQUFFLENBREY7QUFFZEMsYUFBUyxNQUFNLENBQUU7QUFGSCxHQUFsQjtBQUtBLFFBQU1DLFFBQVE7QUFDVkMsVUFBTSxDQUFDQyxLQUFLLE1BQU0sQ0FBRSxDQUFkLEtBQW1CO0FBQ3JCTCxnQkFBVUMsTUFBVixHQUFtQkksRUFBbkI7QUFDQSxhQUFPRixLQUFQO0FBQ0gsS0FKUztBQUtWVixXQUFPLENBQUNZLEtBQUssTUFBTSxDQUFFLENBQWQsS0FBbUI7QUFDdEJMLGdCQUFVRSxPQUFWLEdBQW9CRyxFQUFwQjtBQUNBLGFBQU9GLEtBQVA7QUFDSDtBQVJTLEdBQWQ7QUFXQSxRQUFNM0IsTUFBTSxJQUFJN0IsT0FBT1UsSUFBUCxDQUFZQyxHQUFaLENBQWdCQyxRQUFwQixDQUE2QlosT0FBT2EsU0FBUCxDQUFpQmlCLFVBQWpCLENBQTRCZixHQUF6RCxFQUE4RFUsT0FBOUQsQ0FBWjtBQUNBSSxNQUFJOEIsTUFBSixDQUFXUyxZQUFYLEdBQ0tQLEVBREwsQ0FDUSxNQURSLEVBQ2dCLE1BQU1DLEdBQU4sSUFBYTtBQUVyQixRQUFJO0FBRUEsWUFBTW5CLFNBQVMsTUFBTU4sWUFBWXlCLElBQUlDLFlBQUosQ0FBaUJDLFVBQTdCLEVBQXlDaEUsTUFBekMsQ0FBckI7QUFDQXFELGdCQUFVQyxNQUFWLENBQWlCO0FBQ2I3QixpQkFBU3FDLElBQUlDLFlBQUosQ0FBaUJDLFVBRGI7QUFFYnJCLGNBRmE7QUFHYnNCLGdCQUFRLFNBSEs7QUFJYkMsZUFBTztBQUpNLE9BQWpCO0FBTUgsS0FURCxDQVNFLE9BQU1qQixHQUFOLEVBQVc7QUFDVEksZ0JBQVVFLE9BQVYsQ0FBa0JOLEdBQWxCO0FBQ0g7QUFDSixHQWZMLEVBZ0JLWSxFQWhCTCxDQWdCUSxPQWhCUixFQWdCaUJSLFVBQVVFLE9BaEIzQjtBQWtCQSxTQUFPQyxLQUFQO0FBQ0gsQ0FsRE0iLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIFdvcmtlck5vZGVzIHJlbGF0ZWQgbWV0aG9kc1xuICogVGhpcyBmaWxlIGl0IGlzIGEgcGFydCBvZiB0aGUgUGFuZG9yYSBQeXJyaGEgSmF2YXNjcmlwdCBsaWJyYXJ5XG4gKiBcbiAqIEBmaWxlIHdvcmtlcnMuanNcbiAqIEBhdXRob3IgS29zdGlhbnR5biBTbXlybm92IDxrb3N0eXNoQGdtYWlsLmNvbT5cbiAqIEBkYXRlIDIwMThcbiAqL1xuXG4ndXNlIHN0cmljdCc7XG5cbmltcG9ydCAqIGFzIGV4cGVjdCBmcm9tICcuL2hlbHBlcnMvZXhwZWN0JztcbmltcG9ydCB7XG4gICAgQ09OVFJBQ1RfUkVRVUlSRUQsXG4gICAgQUREUkVTU19SRVFVSVJFRCxcbiAgICBXRUIzX1JFUVVJUkVEXG59IGZyb20gJy4vaGVscGVycy9lcnJvcnMnO1xuXG5pbXBvcnQgeyBmZXRjaFN0YXRlIGFzIGZldGNoSm9iU3RhdGUgfSBmcm9tICcuL2pvYnMnO1xuXG4vKipcbiAqIEdldCB3b3JrZXIgbm9kZXMgY291bnQgZnJvbSBQYW5kb3JhIGNvbnRyYWN0XG4gKiBcbiAqIEBwYXJhbSB7T2JqZWN0fSBjb25maWcgTGlicmFyeSBjb25maWcgKHByb3ZpZGVkIGJ5IHRoZSBwcm94eSBidXQgY2FuIGJlIG92ZXJyaWRkZW4pXG4gKiBAcmV0dXJucyB7UHJvbWlzZX0gQSBQcm9taXNlIG9iamVjdCByZXByZXNlbnRzIHRoZSB7bnVtYmVyfSBcbiAqL1xuZXhwb3J0IGNvbnN0IGZldGNoQ291bnQgPSBhc3luYyAoY29uZmlnID0ge30pID0+IHtcblxuICAgIGV4cGVjdC5hbGwoY29uZmlnLCB7XG4gICAgICAgICd3ZWIzJzoge1xuICAgICAgICAgICAgdHlwZTogJ29iamVjdCcsXG4gICAgICAgICAgICBjb2RlOiBXRUIzX1JFUVVJUkVEXG4gICAgICAgIH0sXG4gICAgICAgICdjb250cmFjdHMuUGFuZG9yYS5hYmknOiB7XG4gICAgICAgICAgICB0eXBlOiAnb2JqZWN0JyxcbiAgICAgICAgICAgIGNvZGU6IENPTlRSQUNUX1JFUVVJUkVELFxuICAgICAgICAgICAgYXJnczogWydQYW5kb3JhJ11cbiAgICAgICAgfSxcbiAgICAgICAgJ2FkZHJlc3Nlcy5QYW5kb3JhJzoge1xuICAgICAgICAgICAgdHlwZTogJ3N0cmluZycsXG4gICAgICAgICAgICBjb2RlOiBBRERSRVNTX1JFUVVJUkVELFxuICAgICAgICAgICAgYXJnczogWydQYW5kb3JhJ11cbiAgICAgICAgfVxuICAgIH0pO1xuXG4gICAgY29uc3QgcGFuID0gbmV3IGNvbmZpZy53ZWIzLmV0aC5Db250cmFjdChjb25maWcuY29udHJhY3RzLlBhbmRvcmEuYWJpLCBjb25maWcuYWRkcmVzc2VzLlBhbmRvcmEpO1xuICAgIGNvbnN0IGNvdW50ID0gYXdhaXQgcGFuLm1ldGhvZHNcbiAgICAgICAgLndvcmtlck5vZGVzQ291bnQoKVxuICAgICAgICAuY2FsbCgpO1xuXG4gICAgcmV0dXJuIE51bWJlci5wYXJzZUludChjb3VudCwgMTApO1xufTtcblxuLyoqXG4gKiBHZXQgd29ya2VyIGFkZHJlc3MgZnJvbSBQYW5kb3JhIGNvbnRyYWN0IGJ5IHRoZSB3b3JrZXIgSWRcbiAqIFxuICogQHBhcmFtIHtpbnRlZ2VyfSBpZCBXb3JrZXIgSWRcbiAqIEBwYXJhbSB7T2JqZWN0fSBjb25maWcgTGlicmFyeSBjb25maWcgKHByb3ZpZGVkIGJ5IHRoZSBwcm94eSBidXQgY2FuIGJlIG92ZXJyaWRkZW4pXG4gKiBAcmV0dXJucyB7UHJvbWlzZX0gQSBQcm9taXNlIG9iamVjdCByZXByZXNlbnRzIHRoZSB7c3RyaW5nfSBcbiAqL1xuZXhwb3J0IGNvbnN0IGZldGNoQWRkcmVzc0J5SWQgPSBhc3luYyAoaWQsIGNvbmZpZyA9IHt9KSA9PiB7XG5cbiAgICBleHBlY3QuYWxsKGNvbmZpZywge1xuICAgICAgICAnd2ViMyc6IHtcbiAgICAgICAgICAgIHR5cGU6ICdvYmplY3QnLFxuICAgICAgICAgICAgY29kZTogV0VCM19SRVFVSVJFRFxuICAgICAgICB9LFxuICAgICAgICAnY29udHJhY3RzLlBhbmRvcmEuYWJpJzoge1xuICAgICAgICAgICAgdHlwZTogJ29iamVjdCcsXG4gICAgICAgICAgICBjb2RlOiBDT05UUkFDVF9SRVFVSVJFRCxcbiAgICAgICAgICAgIGFyZ3M6IFsnUGFuZG9yYSddXG4gICAgICAgIH0sXG4gICAgICAgICdhZGRyZXNzZXMuUGFuZG9yYSc6IHtcbiAgICAgICAgICAgIHR5cGU6ICdzdHJpbmcnLFxuICAgICAgICAgICAgY29kZTogQUREUkVTU19SRVFVSVJFRCxcbiAgICAgICAgICAgIGFyZ3M6IFsnUGFuZG9yYSddXG4gICAgICAgIH1cbiAgICB9KTtcblxuICAgIGNvbnN0IHBhbiA9IG5ldyBjb25maWcud2ViMy5ldGguQ29udHJhY3QoY29uZmlnLmNvbnRyYWN0cy5QYW5kb3JhLmFiaSwgY29uZmlnLmFkZHJlc3Nlcy5QYW5kb3JhKTtcbiAgICBjb25zdCBhZGRyZXNzID0gYXdhaXQgcGFuLm1ldGhvZHNcbiAgICAgICAgLndvcmtlck5vZGVzKGlkKVxuICAgICAgICAuY2FsbCgpO1xuXG4gICAgcmV0dXJuIFN0cmluZyhhZGRyZXNzKTtcbn07XG5cbi8qKlxuICogR2V0IHdvcmtlciBzdGF0ZSBmcm9tIFdvcmtlciBjb250cmFjdCBieSB0aGUgd29ya2VyIGFkZHJlc3NcbiAqIFxuICogQHBhcmFtIHtzdHJpbmd9IGFkZHJlc3MgXG4gKiBAcGFyYW0ge09iamVjdH0gY29uZmlnIExpYnJhcnkgY29uZmlnIChwcm92aWRlZCBieSB0aGUgcHJveHkgYnV0IGNhbiBiZSBvdmVycmlkZGVuKVxuICogQHJldHVybnMge1Byb21pc2V9IEEgUHJvbWlzZSBvYmplY3QgcmVwcmVzZW50cyB0aGUge251bWJlcn1cbiAqL1xuZXhwb3J0IGNvbnN0IGZldGNoU3RhdGUgPSBhc3luYyAoYWRkcmVzcywgY29uZmlnID0ge30pID0+IHtcblxuICAgIGV4cGVjdC5hbGwoY29uZmlnLCB7XG4gICAgICAgICd3ZWIzJzoge1xuICAgICAgICAgICAgdHlwZTogJ29iamVjdCcsXG4gICAgICAgICAgICBjb2RlOiBXRUIzX1JFUVVJUkVEXG4gICAgICAgIH0sXG4gICAgICAgICdjb250cmFjdHMuV29ya2VyTm9kZS5hYmknOiB7XG4gICAgICAgICAgICB0eXBlOiAnb2JqZWN0JyxcbiAgICAgICAgICAgIGNvZGU6IENPTlRSQUNUX1JFUVVJUkVELFxuICAgICAgICAgICAgYXJnczogWydXb3JrZXJOb2RlJ11cbiAgICAgICAgfVxuICAgIH0pO1xuXG4gICAgY29uc3Qgd29yID0gbmV3IGNvbmZpZy53ZWIzLmV0aC5Db250cmFjdChjb25maWcuY29udHJhY3RzLldvcmtlck5vZGUuYWJpLCBhZGRyZXNzKTsgICAgXG4gICAgY29uc3Qgc3RhdGUgPSBhd2FpdCB3b3IubWV0aG9kc1xuICAgICAgICAuY3VycmVudFN0YXRlKClcbiAgICAgICAgLmNhbGwoKTtcblxuICAgIHJldHVybiBOdW1iZXIucGFyc2VJbnQoc3RhdGUsIDEwKTtcbn07XG5cbi8qKlxuICogR2V0IHdvcmtlciByZXB1dGF0aW9uIGZyb20gV29ya2VyIGNvbnRyYWN0IGJ5IHRoZSB3b3JrZXIgYWRkcmVzc1xuICogXG4gKiBAcGFyYW0ge3N0cmluZ30gYWRkcmVzcyBcbiAqIEBwYXJhbSB7T2JqZWN0fSBjb25maWcgTGlicmFyeSBjb25maWcgKHByb3ZpZGVkIGJ5IHRoZSBwcm94eSBidXQgY2FuIGJlIG92ZXJyaWRkZW4pXG4gKiBAcmV0dXJucyB7UHJvbWlzZX0gQSBQcm9taXNlIG9iamVjdCByZXByZXNlbnRzIHRoZSB7bnVtYmVyfVxuICovXG5leHBvcnQgY29uc3QgZmV0Y2hSZXB1dGF0aW9uID0gYXN5bmMgKGFkZHJlc3MsIGNvbmZpZyA9IHt9KSA9PiB7XG5cbiAgICBleHBlY3QuYWxsKGNvbmZpZywge1xuICAgICAgICAnd2ViMyc6IHtcbiAgICAgICAgICAgIHR5cGU6ICdvYmplY3QnLFxuICAgICAgICAgICAgY29kZTogV0VCM19SRVFVSVJFRFxuICAgICAgICB9LFxuICAgICAgICAnY29udHJhY3RzLldvcmtlck5vZGUuYWJpJzoge1xuICAgICAgICAgICAgdHlwZTogJ29iamVjdCcsXG4gICAgICAgICAgICBjb2RlOiBDT05UUkFDVF9SRVFVSVJFRCxcbiAgICAgICAgICAgIGFyZ3M6IFsnV29ya2VyTm9kZSddXG4gICAgICAgIH1cbiAgICB9KTtcblxuICAgIGNvbnN0IHdvciA9IG5ldyBjb25maWcud2ViMy5ldGguQ29udHJhY3QoY29uZmlnLmNvbnRyYWN0cy5Xb3JrZXJOb2RlLmFiaSwgYWRkcmVzcyk7XG4gICAgY29uc3QgcmVwdXRhdGlvbiA9IGF3YWl0IHdvci5tZXRob2RzXG4gICAgICAgIC5yZXB1dGF0aW9uKClcbiAgICAgICAgLmNhbGwoKTtcblxuICAgIHJldHVybiBOdW1iZXIucGFyc2VJbnQocmVwdXRhdGlvbiwgMTApO1xufTtcblxuLyoqXG4gKiBHZXQgd29ya2VyJ3MgYWN0aXZlIGpvYiBmcm9tIFdvcmtlciBjb250cmFjdCBieSB0aGUgd29ya2VyIGFkZHJlc3NcbiAqIFxuICogQHBhcmFtIHtzdHJpbmd9IGFkZHJlc3MgXG4gKiBAcGFyYW0ge09iamVjdH0gY29uZmlnIExpYnJhcnkgY29uZmlnIChwcm92aWRlZCBieSB0aGUgcHJveHkgYnV0IGNhbiBiZSBvdmVycmlkZGVuKVxuICogQHJldHVybnMge1Byb21pc2V9IEEgUHJvbWlzZSBvYmplY3QgcmVwcmVzZW50cyB0aGUge3N0cmluZ31cbiAqL1xuZXhwb3J0IGNvbnN0IGZldGNoQWN0aXZlSm9iQWRkcmVzcyA9IGFzeW5jIChhZGRyZXNzLCBjb25maWcgPSB7fSkgPT4ge1xuXG4gICAgZXhwZWN0LmFsbChjb25maWcsIHtcbiAgICAgICAgJ3dlYjMnOiB7XG4gICAgICAgICAgICB0eXBlOiAnb2JqZWN0JyxcbiAgICAgICAgICAgIGNvZGU6IFdFQjNfUkVRVUlSRURcbiAgICAgICAgfSxcbiAgICAgICAgJ2NvbnRyYWN0cy5Xb3JrZXJOb2RlLmFiaSc6IHtcbiAgICAgICAgICAgIHR5cGU6ICdvYmplY3QnLFxuICAgICAgICAgICAgY29kZTogQ09OVFJBQ1RfUkVRVUlSRUQsXG4gICAgICAgICAgICBhcmdzOiBbJ1dvcmtlck5vZGUnXVxuICAgICAgICB9XG4gICAgfSk7XG5cbiAgICBjb25zdCB3b3IgPSBuZXcgY29uZmlnLndlYjMuZXRoLkNvbnRyYWN0KGNvbmZpZy5jb250cmFjdHMuV29ya2VyTm9kZS5hYmksIGFkZHJlc3MpO1xuICAgIGNvbnN0IGFjdGl2ZUpvYiA9IGF3YWl0IHdvci5tZXRob2RzXG4gICAgICAgIC5hY3RpdmVKb2IoKVxuICAgICAgICAuY2FsbCgpO1xuXG4gICAgcmV0dXJuIFN0cmluZyhhY3RpdmVKb2IsIDEwKTtcbn07XG5cbi8qKlxuICogR2V0IHdvcmtlciBieSB0aGUgd29ya2VyJ3MgYWRkcmVzc1xuICogXG4gKiBAcGFyYW0ge3N0cmluZ30gYWRkcmVzc1xuICogQHBhcmFtIHtPYmplY3R9IGNvbmZpZyBMaWJyYXJ5IGNvbmZpZyAocHJvdmlkZWQgYnkgdGhlIHByb3h5IGJ1dCBjYW4gYmUgb3ZlcnJpZGRlbilcbiAqIEByZXR1cm5zIHtQcm9taXNlfSBBIFByb21pc2Ugb2JqZWN0IHJlcHJlc2VudHMgdGhlIHtPYmplY3R9XG4gKi9cbmV4cG9ydCBjb25zdCBmZXRjaFdvcmtlciA9IGFzeW5jIChhZGRyZXNzLCBjb25maWcgPSB7fSkgPT4ge1xuICAgIFxuICAgIGNvbnN0IFtcbiAgICAgICAgY3VycmVudFN0YXRlLFxuICAgICAgICByZXB1dGF0aW9uLFxuICAgICAgICBhY3RpdmVKb2JcbiAgICBdID0gYXdhaXQgUHJvbWlzZS5hbGwoW1xuICAgICAgICBmZXRjaFN0YXRlKGFkZHJlc3MsIGNvbmZpZyksXG4gICAgICAgIGZldGNoUmVwdXRhdGlvbihhZGRyZXNzLCBjb25maWcpLFxuICAgICAgICBmZXRjaEFjdGl2ZUpvYkFkZHJlc3MoYWRkcmVzcywgY29uZmlnKVxuICAgIF0pO1xuXG5cbiAgICBsZXQgY3VycmVudEpvYiA9IGFjdGl2ZUpvYjtcbiAgICBsZXQgam9iU3RhdGU7ICAgIFxuXG4gICAgLy8gQ2hlY2sgaXMgbm90IDB4MFxuICAgIGlmICgrYWN0aXZlSm9iICE9PSAwKSB7XG5cbiAgICAgICAgam9iU3RhdGUgPSBhd2FpdCBmZXRjaEpvYlN0YXRlKGFjdGl2ZUpvYiwgY29uZmlnKTtcbiAgICB9IGVsc2Uge1xuICAgICAgICBjdXJyZW50Sm9iID0gbnVsbDtcbiAgICAgICAgam9iU3RhdGUgPSAtMTtcbiAgICB9XG5cbiAgICByZXR1cm4ge1xuICAgICAgICBhZGRyZXNzLFxuICAgICAgICBjdXJyZW50U3RhdGUsXG4gICAgICAgIHJlcHV0YXRpb24sXG4gICAgICAgIGN1cnJlbnRKb2IsXG4gICAgICAgIGN1cnJlbnRKb2JTdGF0dXM6IGpvYlN0YXRlXG4gICAgfTtcbn07XG5cbi8qKlxuICogR2V0IHdvcmtlciBieSB0aGUgd29ya2VyJ3MgaWRcbiAqIFxuICogQHBhcmFtIHtpbnRlZ2VyfSBpZCBcbiAqIEBwYXJhbSB7T2JqZWN0fSBjb25maWcgTGlicmFyeSBjb25maWcgKHByb3ZpZGVkIGJ5IHRoZSBwcm94eSBidXQgY2FuIGJlIG92ZXJyaWRkZW4pXG4gKiBAcmV0dXJucyB7UHJvbWlzZX0gQSBQcm9taXNlIG9iamVjdCByZXByZXNlbnRzIHRoZSB7T2JqZWN0fVxuICovXG5leHBvcnQgY29uc3QgZmV0Y2hXb3JrZXJCeUlkID0gYXN5bmMgKGlkLCBjb25maWcgPSB7fSkgPT4ge1xuICAgIFxuICAgIGNvbnN0IGFkZHJlc3MgPSBhd2FpdCBmZXRjaEFkZHJlc3NCeUlkKGlkLCBjb25maWcpO1xuICAgIGNvbnN0IHdvcmtlciA9IGF3YWl0IGZldGNoV29ya2VyKGFkZHJlc3MsIGNvbmZpZyk7XG5cbiAgICByZXR1cm4ge1xuICAgICAgICBpZDogaWQsXG4gICAgICAgIC4uLndvcmtlclxuICAgIH07XG59O1xuXG4vKipcbiAqIEdldCBhbGwgd29ya2Vyc1xuICogXG4gKiBAcGFyYW0ge09iamVjdH0gY29uZmlnIExpYnJhcnkgY29uZmlnIChwcm92aWRlZCBieSB0aGUgcHJveHkgYnV0IGNhbiBiZSBvdmVycmlkZGVuKVxuICogQHJldHVybnMge1Byb21pc2V9IEEgUHJvbWlzZSBvYmplY3QgcmVwcmVzZW50cyB0aGUge251bWJlcn1cbiAqL1xuZXhwb3J0IGNvbnN0IGZldGNoQWxsID0gYXN5bmMgKGNvbmZpZyA9IHt9KSA9PiB7XG4gICAgbGV0IHJlY29yZHMgPSBbXTtcbiAgICBsZXQgZXJyb3IgPSBbXTtcblxuICAgIHRyeSB7XG5cbiAgICAgICAgY29uc3QgY291bnQgPSBhd2FpdCBmZXRjaENvdW50KGNvbmZpZyk7ICAgIFxuXG4gICAgICAgIGZvciAobGV0IGk9MDsgaSA8IGNvdW50OyBpKyspIHtcbiAgICAgICAgICAgIFxuICAgICAgICAgICAgdHJ5IHtcblxuICAgICAgICAgICAgICAgIGNvbnN0IHdvcmtlciA9IGF3YWl0IGZldGNoV29ya2VyQnlJZChpLCBjb25maWcpO1xuXG4gICAgICAgICAgICAgICAgcmVjb3Jkcy5wdXNoKHtcbiAgICAgICAgICAgICAgICAgICAgaWQ6IGksXG4gICAgICAgICAgICAgICAgICAgIC4uLndvcmtlclxuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfSBjYXRjaChlcnIpIHtcbiAgICAgICAgICAgICAgICBlcnJvci5wdXNoKHtcbiAgICAgICAgICAgICAgICAgICAgaWQ6IGksXG4gICAgICAgICAgICAgICAgICAgIG1lc3NhZ2U6IGVyci5tZXNzYWdlXG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9ICAgICAgICBcbiAgICAgICAgfVxuICAgIH0gY2F0Y2goZXJyKSB7XG4gICAgICAgIGVycm9yLnB1c2goe1xuICAgICAgICAgICAgZXJyb3I6IGVyci5tZXNzYWdlXG4gICAgICAgIH0pO1xuICAgIH0gICBcblxuICAgIHJldHVybiB7XG4gICAgICAgIHJlY29yZHMsXG4gICAgICAgIGVycm9yXG4gICAgfTtcbn07XG5cbi8qKlxuICogSGFuZGxlIGV2ZW50IFdvcmtlck5vZGVDcmVhdGVkXG4gKiBcbiAqIEBwYXJhbSB7T2JqZWN0fSBvcHRpb25zIEV2ZW50IGhhbmRsZXIgb3B0aW9uc1xuICogQHBhcmFtIHtPYmplY3R9IGNvbmZpZyBMaWJyYXJ5IGNvbmZpZyAocHJvdmlkZWQgYnkgdGhlIHByb3h5IGJ1dCBjYW4gYmUgb3ZlcnJpZGRlbilcbiAqIEByZXR1cm5zIHtPYmplY3R9IE9iamVjdCB3aXRoIGNoYWluZWQgY2FsbGJhY2tzICNkYXRhIGFuZCAjZXJyb3JcbiAqL1xuZXhwb3J0IGNvbnN0IGV2ZW50V29ya2VyTm9kZUNyZWF0ZWQgPSAob3B0aW9ucyA9IHt9LCBjb25maWcgPSB7fSkgPT4ge1xuXG4gICAgZXhwZWN0LmFsbChjb25maWcsIHtcbiAgICAgICAgJ3dlYjMnOiB7XG4gICAgICAgICAgICB0eXBlOiAnb2JqZWN0JyxcbiAgICAgICAgICAgIGNvZGU6IFdFQjNfUkVRVUlSRURcbiAgICAgICAgfSxcbiAgICAgICAgJ2NvbnRyYWN0cy5QYW5kb3JhLmFiaSc6IHtcbiAgICAgICAgICAgIHR5cGU6ICdvYmplY3QnLFxuICAgICAgICAgICAgY29kZTogQ09OVFJBQ1RfUkVRVUlSRUQsXG4gICAgICAgICAgICBhcmdzOiBbJ1BhbmRvcmEnXVxuICAgICAgICB9LFxuICAgICAgICAnYWRkcmVzc2VzLlBhbmRvcmEnOiB7XG4gICAgICAgICAgICB0eXBlOiAnc3RyaW5nJyxcbiAgICAgICAgICAgIGNvZGU6IEFERFJFU1NfUkVRVUlSRUQsXG4gICAgICAgICAgICBhcmdzOiBbJ1BhbmRvcmEnXVxuICAgICAgICB9XG4gICAgfSk7XG5cbiAgICBjb25zdCBjYWxsYmFja3MgPSB7XG4gICAgICAgIG9uRGF0YTogKCkgPT4ge30sXG4gICAgICAgIG9uRXJyb3I6ICgpID0+IHt9XG4gICAgfTtcblxuICAgIGNvbnN0IGNoYWluID0ge1xuICAgICAgICBkYXRhOiAoY2IgPSAoKSA9PiB7fSkgPT4ge1xuICAgICAgICAgICAgY2FsbGJhY2tzLm9uRGF0YSA9IGNiO1xuICAgICAgICAgICAgcmV0dXJuIGNoYWluO1xuICAgICAgICB9LFxuICAgICAgICBlcnJvcjogKGNiID0gKCkgPT4ge30pID0+IHtcbiAgICAgICAgICAgIGNhbGxiYWNrcy5vbkVycm9yID0gY2I7XG4gICAgICAgICAgICByZXR1cm4gY2hhaW47XG4gICAgICAgIH1cbiAgICB9O1xuXG4gICAgY29uc3QgcGFuID0gbmV3IGNvbmZpZy53ZWIzLmV0aC5Db250cmFjdChjb25maWcuY29udHJhY3RzLlBhbmRvcmEuYWJpLCBjb25maWcuYWRkcmVzc2VzLlBhbmRvcmEpO1xuICAgIHBhbi5ldmVudHMuV29ya2VyTm9kZUNyZWF0ZWQob3B0aW9ucylcbiAgICAgICAgLm9uKCdkYXRhJywgYXN5bmMgcmVzID0+IHtcblxuICAgICAgICAgICAgdHJ5IHtcblxuICAgICAgICAgICAgICAgIGNvbnN0IHdvcmtlciA9IGF3YWl0IGZldGNoV29ya2VyKHJlcy5yZXR1cm5WYWx1ZXMud29ya2VyTm9kZSwgY29uZmlnKTtcbiAgICAgICAgICAgICAgICBjYWxsYmFja3Mub25EYXRhKHtcbiAgICAgICAgICAgICAgICAgICAgYWRkcmVzczogcmVzLnJldHVyblZhbHVlcy53b3JrZXJOb2RlLFxuICAgICAgICAgICAgICAgICAgICB3b3JrZXIsXG4gICAgICAgICAgICAgICAgICAgIHN0YXR1czogJ2NyZWF0ZWQnLFxuICAgICAgICAgICAgICAgICAgICBldmVudDogJ1BhbmRvcmEuV29ya2VyTm9kZUNyZWF0ZWQnXG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9IGNhdGNoKGVycikge1xuICAgICAgICAgICAgICAgIGNhbGxiYWNrcy5vbkVycm9yKGVycik7XG4gICAgICAgICAgICB9ICAgICAgICAgICAgXG4gICAgICAgIH0pXG4gICAgICAgIC5vbignZXJyb3InLCBjYWxsYmFja3Mub25FcnJvcik7XG5cbiAgICByZXR1cm4gY2hhaW47XG59O1xuXG4vKipcbiAqIEhhbmRsZSBldmVudCBTdGF0ZUNoYW5nZWQgZm9yIFdvcmtlck5vZGVcbiAqIFxuICogQHBhcmFtIHtzdHJpbmd9IGFkZHJlc3NcbiAqIEBwYXJhbSB7T2JqZWN0fSBjb25maWcgTGlicmFyeSBjb25maWcgKHByb3ZpZGVkIGJ5IHRoZSBwcm94eSBidXQgY2FuIGJlIG92ZXJyaWRkZW4pXG4gKiBAcmV0dXJucyB7T2JqZWN0fSBPYmplY3Qgd2l0aCBjaGFpbmVkIGNhbGxiYWNrcyAjZGF0YSBhbmQgI2Vycm9yXG4gKi9cbmV4cG9ydCBjb25zdCBldmVudFdvcmtlck5vZGVTdGF0ZUNoYW5nZWQgPSAoYWRkcmVzcywgY29uZmlnID0ge30pID0+IHtcblxuICAgIGV4cGVjdC5hbGwoY29uZmlnLCB7XG4gICAgICAgICd3ZWIzJzoge1xuICAgICAgICAgICAgdHlwZTogJ29iamVjdCcsXG4gICAgICAgICAgICBjb2RlOiBXRUIzX1JFUVVJUkVEXG4gICAgICAgIH0sXG4gICAgICAgICdjb250cmFjdHMuV29ya2VyTm9kZS5hYmknOiB7XG4gICAgICAgICAgICB0eXBlOiAnb2JqZWN0JyxcbiAgICAgICAgICAgIGNvZGU6IENPTlRSQUNUX1JFUVVJUkVELFxuICAgICAgICAgICAgYXJnczogWydXb3JrZXJOb2RlJ11cbiAgICAgICAgfVxuICAgIH0pO1xuXG4gICAgY29uc3QgY2FsbGJhY2tzID0ge1xuICAgICAgICBvbkRhdGE6ICgpID0+IHt9LFxuICAgICAgICBvbkVycm9yOiAoKSA9PiB7fVxuICAgIH07XG5cbiAgICBjb25zdCBjaGFpbiA9IHtcbiAgICAgICAgZGF0YTogKGNiID0gKCkgPT4ge30pID0+IHtcbiAgICAgICAgICAgIGNhbGxiYWNrcy5vbkRhdGEgPSBjYjtcbiAgICAgICAgICAgIHJldHVybiBjaGFpbjtcbiAgICAgICAgfSxcbiAgICAgICAgZXJyb3I6IChjYiA9ICgpID0+IHt9KSA9PiB7XG4gICAgICAgICAgICBjYWxsYmFja3Mub25FcnJvciA9IGNiO1xuICAgICAgICAgICAgcmV0dXJuIGNoYWluO1xuICAgICAgICB9XG4gICAgfTtcblxuICAgIGNvbnN0IHdvciA9IG5ldyBjb25maWcud2ViMy5ldGguQ29udHJhY3QoY29uZmlnLmNvbnRyYWN0cy5Xb3JrZXJOb2RlLmFiaSwgYWRkcmVzcyk7XG4gICAgd29yLmV2ZW50cy5TdGF0ZUNoYW5nZWQoKVxuICAgICAgICAub24oJ2RhdGEnLCBhc3luYyByZXMgPT4ge1xuXG4gICAgICAgICAgICB0cnkge1xuXG4gICAgICAgICAgICAgICAgY29uc3Qgd29ya2VyID0gYXdhaXQgZmV0Y2hXb3JrZXIocmVzLnJldHVyblZhbHVlcy53b3JrZXJOb2RlLCBjb25maWcpO1xuICAgICAgICAgICAgICAgIGNhbGxiYWNrcy5vbkRhdGEoe1xuICAgICAgICAgICAgICAgICAgICBhZGRyZXNzOiByZXMucmV0dXJuVmFsdWVzLndvcmtlck5vZGUsXG4gICAgICAgICAgICAgICAgICAgIHdvcmtlcixcbiAgICAgICAgICAgICAgICAgICAgc3RhdHVzOiAnY2hhbmdlZCcsXG4gICAgICAgICAgICAgICAgICAgIGV2ZW50OiAnV29ya2VyTm9kZS5TdGF0ZUNoYW5nZWQnXG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9IGNhdGNoKGVycikge1xuICAgICAgICAgICAgICAgIGNhbGxiYWNrcy5vbkVycm9yKGVycik7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pXG4gICAgICAgIC5vbignZXJyb3InLCBjYWxsYmFja3Mub25FcnJvcik7XG5cbiAgICByZXR1cm4gY2hhaW47XG59O1xuIl19