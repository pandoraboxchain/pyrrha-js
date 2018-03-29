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
  if (!config.web3) {
    throw (0, _errors.default)(_errors.WEB3_REQUIRED);
  }

  if (!config.contracts || !config.contracts.Pandora || !config.contracts.Pandora.abi) {
    throw (0, _errors.default)(_errors.CONTRACT_REQUIRED, 'Pandora');
  }

  if (!config.addresses || !config.addresses.Pandora) {
    throw (0, _errors.default)(_errors.ADDRESS_REQUIRED, 'Pandora');
  }

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
  if (!config.web3) {
    throw (0, _errors.default)(_errors.WEB3_REQUIRED);
  }

  if (!config.contracts || !config.contracts.Pandora || !config.contracts.Pandora.abi) {
    throw (0, _errors.default)(_errors.CONTRACT_REQUIRED, 'Pandora');
  }

  if (!config.addresses || !config.addresses.Pandora) {
    throw (0, _errors.default)(_errors.ADDRESS_REQUIRED, 'Pandora');
  }

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
  if (!config.web3) {
    throw (0, _errors.default)(_errors.WEB3_REQUIRED);
  }

  if (!config.contracts || !config.contracts.WorkerNode || !config.contracts.WorkerNode.abi) {
    throw (0, _errors.default)(_errors.CONTRACT_REQUIRED, 'WorkerNode');
  }

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
  if (!config.web3) {
    throw (0, _errors.default)(_errors.WEB3_REQUIRED);
  }

  if (!config.contracts || !config.contracts.WorkerNode || !config.contracts.WorkerNode.abi) {
    throw (0, _errors.default)(_errors.CONTRACT_REQUIRED, 'WorkerNode');
  }

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
  if (!config.web3) {
    throw (0, _errors.default)(_errors.WEB3_REQUIRED);
  }

  if (!config.contracts || !config.contracts.WorkerNode || !config.contracts.WorkerNode.abi) {
    throw (0, _errors.default)(_errors.CONTRACT_REQUIRED, 'WorkerNode');
  }

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
  try {
    const currentState = await fetchState(address, config);
    const reputation = await fetchReputation(address, config);
    let activeJob = await fetchActiveJobAddress(address, config);
    let jobState; // Check is not 0x0

    if (+activeJob !== 0) {
      jobState = await (0, _jobs.fetchState)(activeJob, config);
    } else {
      activeJob = null;
      jobState = -1;
    }

    return {
      address,
      currentState,
      reputation,
      currentJob: activeJob,
      currentJobStatus: jobState
    };
  } catch (err) {
    return Promise.reject(err);
  }
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
  try {
    const address = await fetchAddressById(id, config);
    const worker = await fetchWorker(address, config);
    return _objectSpread({
      id: id
    }, worker);
  } catch (err) {
    return Promise.reject(err);
  }
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
 * @param {Function} storeCallback 
 * @param {Function} errorCallback
 * @param {Object} config Library config (provided by the proxy but can be overridden)
 */


exports.fetchAll = fetchAll;

const eventWorkerNodeCreated = (storeCallback = () => {}, errorCallback = () => {}, config = {}) => {
  if (!config.web3) {
    throw (0, _errors.default)(_errors.WEB3_REQUIRED);
  }

  if (!config.contracts || !config.contracts.Pandora || !config.contracts.Pandora.abi) {
    throw (0, _errors.default)(_errors.CONTRACT_REQUIRED, 'Pandora');
  }

  if (!config.addresses || !config.addresses.Pandora) {
    throw (0, _errors.default)(_errors.ADDRESS_REQUIRED, 'Pandora');
  }

  const pan = new config.web3.eth.Contract(config.contracts.Pandora.abi, config.addresses.Pandora);
  pan.events.WorkerNodeCreated({
    fromBlock: 0
  }).on('data', async res => {
    try {
      const worker = await fetchWorker(res.args.workerNode, config);
      storeCallback({
        address: res.args.workerNode,
        worker,
        status: 'created',
        event: 'Pandora.WorkerNodeCreated'
      });
    } catch (err) {
      errorCallback(err);
    }
  }).on('error', errorCallback);
};
/**
 * Handle event StateChanged for WorkerNode
 * 
 * @param {string} address
 * @param {Function} storeCallback 
 * @param {Function} errorCallback
 * @param {Object} config Library config (provided by the proxy but can be overridden)
 * @returns {Promise} A Promise object represents the {Object} 
 */


exports.eventWorkerNodeCreated = eventWorkerNodeCreated;

const eventWorkerNodeStateChanged = (address, storeCallback = () => {}, errorCallback = () => {}, config = {}) => {
  if (!config.web3) {
    throw (0, _errors.default)(_errors.WEB3_REQUIRED);
  }

  if (!config.contracts || !config.contracts.WorkerNode || !config.contracts.WorkerNode.abi) {
    throw (0, _errors.default)(_errors.CONTRACT_REQUIRED, 'WorkerNode');
  }

  const wor = new config.web3.eth.Contract(config.contracts.WorkerNode.abi, address);
  wor.events.StateChanged({
    fromBlock: 0
  }).on('data', async res => {
    try {
      const worker = await fetchWorker(res.args.workerNode, config);
      storeCallback({
        address: res.args.workerNode,
        worker,
        status: 'changed',
        event: 'WorkerNode.StateChanged'
      });
    } catch (err) {
      errorCallback(err);
    }
  }).on('error', errorCallback);
};

exports.eventWorkerNodeStateChanged = eventWorkerNodeStateChanged;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy93b3JrZXJzLmpzIl0sIm5hbWVzIjpbImZldGNoQ291bnQiLCJjb25maWciLCJ3ZWIzIiwiV0VCM19SRVFVSVJFRCIsImNvbnRyYWN0cyIsIlBhbmRvcmEiLCJhYmkiLCJDT05UUkFDVF9SRVFVSVJFRCIsImFkZHJlc3NlcyIsIkFERFJFU1NfUkVRVUlSRUQiLCJwYW4iLCJldGgiLCJDb250cmFjdCIsImNvdW50IiwibWV0aG9kcyIsIndvcmtlck5vZGVzQ291bnQiLCJjYWxsIiwiTnVtYmVyIiwicGFyc2VJbnQiLCJmZXRjaEFkZHJlc3NCeUlkIiwiaWQiLCJhZGRyZXNzIiwid29ya2VyTm9kZXMiLCJTdHJpbmciLCJmZXRjaFN0YXRlIiwiV29ya2VyTm9kZSIsIndvciIsInN0YXRlIiwiY3VycmVudFN0YXRlIiwiZmV0Y2hSZXB1dGF0aW9uIiwicmVwdXRhdGlvbiIsImZldGNoQWN0aXZlSm9iQWRkcmVzcyIsImFjdGl2ZUpvYiIsImZldGNoV29ya2VyIiwiam9iU3RhdGUiLCJjdXJyZW50Sm9iIiwiY3VycmVudEpvYlN0YXR1cyIsImVyciIsIlByb21pc2UiLCJyZWplY3QiLCJmZXRjaFdvcmtlckJ5SWQiLCJ3b3JrZXIiLCJmZXRjaEFsbCIsInJlY29yZHMiLCJlcnJvciIsImkiLCJwdXNoIiwibWVzc2FnZSIsImV2ZW50V29ya2VyTm9kZUNyZWF0ZWQiLCJzdG9yZUNhbGxiYWNrIiwiZXJyb3JDYWxsYmFjayIsImV2ZW50cyIsIldvcmtlck5vZGVDcmVhdGVkIiwiZnJvbUJsb2NrIiwib24iLCJyZXMiLCJhcmdzIiwid29ya2VyTm9kZSIsInN0YXR1cyIsImV2ZW50IiwiZXZlbnRXb3JrZXJOb2RlU3RhdGVDaGFuZ2VkIiwiU3RhdGVDaGFuZ2VkIl0sIm1hcHBpbmdzIjoiQUFBQTs7Ozs7Ozs7QUFTQTs7Ozs7OztBQUVBOztBQU1BOzs7Ozs7OztBQUVBOzs7Ozs7QUFNTyxNQUFNQSxhQUFhLE9BQU9DLFNBQVMsRUFBaEIsS0FBdUI7QUFF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UixFQWtCaUJKLGFBbEJqQjtBQW1CSCxDQTlCTSIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogV29ya2VyTm9kZXMgcmVsYXRlZCBtZXRob2RzXG4gKiBUaGlzIGZpbGUgaXQgaXMgYSBwYXJ0IG9mIHRoZSBQYW5kb3JhIFB5cnJoYSBKYXZhc2NyaXB0IGxpYnJhcnlcbiAqIFxuICogQGZpbGUgd29ya2Vycy5qc1xuICogQGF1dGhvciBLb3N0aWFudHluIFNteXJub3YgPGtvc3R5c2hAZ21haWwuY29tPlxuICogQGRhdGUgMjAxOFxuICovXG5cbid1c2Ugc3RyaWN0JztcblxuaW1wb3J0IHBqc0Vycm9yLCB7XG4gICAgQ09OVFJBQ1RfUkVRVUlSRUQsXG4gICAgQUREUkVTU19SRVFVSVJFRCxcbiAgICBXRUIzX1JFUVVJUkVEXG59IGZyb20gJy4vaGVscGVycy9lcnJvcnMnO1xuXG5pbXBvcnQgeyBmZXRjaFN0YXRlIGFzIGZldGNoSm9iU3RhdGUgfSBmcm9tICcuL2pvYnMnO1xuXG4vKipcbiAqIEdldCB3b3JrZXIgbm9kZXMgY291bnQgZnJvbSBQYW5kb3JhIGNvbnRyYWN0XG4gKiBcbiAqIEBwYXJhbSB7T2JqZWN0fSBjb25maWcgTGlicmFyeSBjb25maWcgKHByb3ZpZGVkIGJ5IHRoZSBwcm94eSBidXQgY2FuIGJlIG92ZXJyaWRkZW4pXG4gKiBAcmV0dXJucyB7UHJvbWlzZX0gQSBQcm9taXNlIG9iamVjdCByZXByZXNlbnRzIHRoZSB7bnVtYmVyfSBcbiAqL1xuZXhwb3J0IGNvbnN0IGZldGNoQ291bnQgPSBhc3luYyAoY29uZmlnID0ge30pID0+IHtcblxuICAgIGlmICghY29uZmlnLndlYjMpIHtcbiAgICAgICAgdGhyb3cgcGpzRXJyb3IoV0VCM19SRVFVSVJFRCk7XG4gICAgfVxuXG4gICAgaWYgKCFjb25maWcuY29udHJhY3RzIHx8ICFjb25maWcuY29udHJhY3RzLlBhbmRvcmEgfHwgIWNvbmZpZy5jb250cmFjdHMuUGFuZG9yYS5hYmkpIHtcbiAgICAgICAgdGhyb3cgcGpzRXJyb3IoQ09OVFJBQ1RfUkVRVUlSRUQsICdQYW5kb3JhJyk7XG4gICAgfVxuXG4gICAgaWYgKCFjb25maWcuYWRkcmVzc2VzIHx8ICFjb25maWcuYWRkcmVzc2VzLlBhbmRvcmEpIHtcbiAgICAgICAgdGhyb3cgcGpzRXJyb3IoQUREUkVTU19SRVFVSVJFRCwgJ1BhbmRvcmEnKTtcbiAgICB9XG5cbiAgICBjb25zdCBwYW4gPSBuZXcgY29uZmlnLndlYjMuZXRoLkNvbnRyYWN0KGNvbmZpZy5jb250cmFjdHMuUGFuZG9yYS5hYmksIGNvbmZpZy5hZGRyZXNzZXMuUGFuZG9yYSk7XG4gICAgY29uc3QgY291bnQgPSBhd2FpdCBwYW4ubWV0aG9kc1xuICAgICAgICAud29ya2VyTm9kZXNDb3VudCgpXG4gICAgICAgIC5jYWxsKCk7XG4gICAgcmV0dXJuIE51bWJlci5wYXJzZUludChjb3VudCwgMTApO1xufTtcblxuLyoqXG4gKiBHZXQgd29ya2VyIGFkZHJlc3MgZnJvbSBQYW5kb3JhIGNvbnRyYWN0IGJ5IHRoZSB3b3JrZXIgSWRcbiAqIFxuICogQHBhcmFtIHtpbnRlZ2VyfSBpZCBXb3JrZXIgSWRcbiAqIEBwYXJhbSB7T2JqZWN0fSBjb25maWcgTGlicmFyeSBjb25maWcgKHByb3ZpZGVkIGJ5IHRoZSBwcm94eSBidXQgY2FuIGJlIG92ZXJyaWRkZW4pXG4gKiBAcmV0dXJucyB7UHJvbWlzZX0gQSBQcm9taXNlIG9iamVjdCByZXByZXNlbnRzIHRoZSB7c3RyaW5nfSBcbiAqL1xuZXhwb3J0IGNvbnN0IGZldGNoQWRkcmVzc0J5SWQgPSBhc3luYyAoaWQsIGNvbmZpZyA9IHt9KSA9PiB7XG5cbiAgICBpZiAoIWNvbmZpZy53ZWIzKSB7XG4gICAgICAgIHRocm93IHBqc0Vycm9yKFdFQjNfUkVRVUlSRUQpO1xuICAgIH1cblxuICAgIGlmICghY29uZmlnLmNvbnRyYWN0cyB8fCAhY29uZmlnLmNvbnRyYWN0cy5QYW5kb3JhIHx8ICFjb25maWcuY29udHJhY3RzLlBhbmRvcmEuYWJpKSB7XG4gICAgICAgIHRocm93IHBqc0Vycm9yKENPTlRSQUNUX1JFUVVJUkVELCAnUGFuZG9yYScpO1xuICAgIH1cblxuICAgIGlmICghY29uZmlnLmFkZHJlc3NlcyB8fCAhY29uZmlnLmFkZHJlc3Nlcy5QYW5kb3JhKSB7XG4gICAgICAgIHRocm93IHBqc0Vycm9yKEFERFJFU1NfUkVRVUlSRUQsICdQYW5kb3JhJyk7XG4gICAgfVxuXG4gICAgY29uc3QgcGFuID0gbmV3IGNvbmZpZy53ZWIzLmV0aC5Db250cmFjdChjb25maWcuY29udHJhY3RzLlBhbmRvcmEuYWJpLCBjb25maWcuYWRkcmVzc2VzLlBhbmRvcmEpO1xuICAgIGNvbnN0IGFkZHJlc3MgPSBhd2FpdCBwYW4ubWV0aG9kc1xuICAgICAgICAud29ya2VyTm9kZXMoaWQpXG4gICAgICAgIC5jYWxsKCk7XG4gICAgcmV0dXJuIFN0cmluZyhhZGRyZXNzKTtcbn07XG5cbi8qKlxuICogR2V0IHdvcmtlciBzdGF0ZSBmcm9tIFdvcmtlciBjb250cmFjdCBieSB0aGUgd29ya2VyIGFkZHJlc3NcbiAqIFxuICogQHBhcmFtIHtzdHJpbmd9IGFkZHJlc3MgXG4gKiBAcGFyYW0ge09iamVjdH0gY29uZmlnIExpYnJhcnkgY29uZmlnIChwcm92aWRlZCBieSB0aGUgcHJveHkgYnV0IGNhbiBiZSBvdmVycmlkZGVuKVxuICogQHJldHVybnMge1Byb21pc2V9IEEgUHJvbWlzZSBvYmplY3QgcmVwcmVzZW50cyB0aGUge251bWJlcn1cbiAqL1xuZXhwb3J0IGNvbnN0IGZldGNoU3RhdGUgPSBhc3luYyAoYWRkcmVzcywgY29uZmlnID0ge30pID0+IHtcblxuICAgIGlmICghY29uZmlnLndlYjMpIHtcbiAgICAgICAgdGhyb3cgcGpzRXJyb3IoV0VCM19SRVFVSVJFRCk7XG4gICAgfVxuXG4gICAgaWYgKCFjb25maWcuY29udHJhY3RzIHx8ICFjb25maWcuY29udHJhY3RzLldvcmtlck5vZGUgfHwgIWNvbmZpZy5jb250cmFjdHMuV29ya2VyTm9kZS5hYmkpIHtcbiAgICAgICAgdGhyb3cgcGpzRXJyb3IoQ09OVFJBQ1RfUkVRVUlSRUQsICdXb3JrZXJOb2RlJyk7XG4gICAgfVxuXG4gICAgY29uc3Qgd29yID0gbmV3IGNvbmZpZy53ZWIzLmV0aC5Db250cmFjdChjb25maWcuY29udHJhY3RzLldvcmtlck5vZGUuYWJpLCBhZGRyZXNzKTsgICAgXG4gICAgY29uc3Qgc3RhdGUgPSBhd2FpdCB3b3IubWV0aG9kc1xuICAgICAgICAuY3VycmVudFN0YXRlKClcbiAgICAgICAgLmNhbGwoKTtcbiAgICByZXR1cm4gTnVtYmVyLnBhcnNlSW50KHN0YXRlLCAxMCk7XG59O1xuXG4vKipcbiAqIEdldCB3b3JrZXIgcmVwdXRhdGlvbiBmcm9tIFdvcmtlciBjb250cmFjdCBieSB0aGUgd29ya2VyIGFkZHJlc3NcbiAqIFxuICogQHBhcmFtIHtzdHJpbmd9IGFkZHJlc3MgXG4gKiBAcGFyYW0ge09iamVjdH0gY29uZmlnIExpYnJhcnkgY29uZmlnIChwcm92aWRlZCBieSB0aGUgcHJveHkgYnV0IGNhbiBiZSBvdmVycmlkZGVuKVxuICogQHJldHVybnMge1Byb21pc2V9IEEgUHJvbWlzZSBvYmplY3QgcmVwcmVzZW50cyB0aGUge251bWJlcn1cbiAqL1xuZXhwb3J0IGNvbnN0IGZldGNoUmVwdXRhdGlvbiA9IGFzeW5jIChhZGRyZXNzLCBjb25maWcgPSB7fSkgPT4ge1xuXG4gICAgaWYgKCFjb25maWcud2ViMykge1xuICAgICAgICB0aHJvdyBwanNFcnJvcihXRUIzX1JFUVVJUkVEKTtcbiAgICB9XG5cbiAgICBpZiAoIWNvbmZpZy5jb250cmFjdHMgfHwgIWNvbmZpZy5jb250cmFjdHMuV29ya2VyTm9kZSB8fCAhY29uZmlnLmNvbnRyYWN0cy5Xb3JrZXJOb2RlLmFiaSkge1xuICAgICAgICB0aHJvdyBwanNFcnJvcihDT05UUkFDVF9SRVFVSVJFRCwgJ1dvcmtlck5vZGUnKTtcbiAgICB9XG5cbiAgICBjb25zdCB3b3IgPSBuZXcgY29uZmlnLndlYjMuZXRoLkNvbnRyYWN0KGNvbmZpZy5jb250cmFjdHMuV29ya2VyTm9kZS5hYmksIGFkZHJlc3MpO1xuICAgIGNvbnN0IHJlcHV0YXRpb24gPSBhd2FpdCB3b3IubWV0aG9kc1xuICAgICAgICAucmVwdXRhdGlvbigpXG4gICAgICAgIC5jYWxsKCk7XG4gICAgcmV0dXJuIE51bWJlci5wYXJzZUludChyZXB1dGF0aW9uLCAxMCk7XG59O1xuXG4vKipcbiAqIEdldCB3b3JrZXIncyBhY3RpdmUgam9iIGZyb20gV29ya2VyIGNvbnRyYWN0IGJ5IHRoZSB3b3JrZXIgYWRkcmVzc1xuICogXG4gKiBAcGFyYW0ge3N0cmluZ30gYWRkcmVzcyBcbiAqIEBwYXJhbSB7T2JqZWN0fSBjb25maWcgTGlicmFyeSBjb25maWcgKHByb3ZpZGVkIGJ5IHRoZSBwcm94eSBidXQgY2FuIGJlIG92ZXJyaWRkZW4pXG4gKiBAcmV0dXJucyB7UHJvbWlzZX0gQSBQcm9taXNlIG9iamVjdCByZXByZXNlbnRzIHRoZSB7c3RyaW5nfVxuICovXG5leHBvcnQgY29uc3QgZmV0Y2hBY3RpdmVKb2JBZGRyZXNzID0gYXN5bmMgKGFkZHJlc3MsIGNvbmZpZyA9IHt9KSA9PiB7XG5cbiAgICBpZiAoIWNvbmZpZy53ZWIzKSB7XG4gICAgICAgIHRocm93IHBqc0Vycm9yKFdFQjNfUkVRVUlSRUQpO1xuICAgIH1cbiAgICBcbiAgICBpZiAoIWNvbmZpZy5jb250cmFjdHMgfHwgIWNvbmZpZy5jb250cmFjdHMuV29ya2VyTm9kZSB8fCAhY29uZmlnLmNvbnRyYWN0cy5Xb3JrZXJOb2RlLmFiaSkge1xuICAgICAgICB0aHJvdyBwanNFcnJvcihDT05UUkFDVF9SRVFVSVJFRCwgJ1dvcmtlck5vZGUnKTtcbiAgICB9XG5cbiAgICBjb25zdCB3b3IgPSBuZXcgY29uZmlnLndlYjMuZXRoLkNvbnRyYWN0KGNvbmZpZy5jb250cmFjdHMuV29ya2VyTm9kZS5hYmksIGFkZHJlc3MpO1xuICAgIGNvbnN0IGFjdGl2ZUpvYiA9IGF3YWl0IHdvci5tZXRob2RzXG4gICAgICAgIC5hY3RpdmVKb2IoKVxuICAgICAgICAuY2FsbCgpO1xuICAgIHJldHVybiBTdHJpbmcoYWN0aXZlSm9iLCAxMCk7XG59O1xuXG4vKipcbiAqIEdldCB3b3JrZXIgYnkgdGhlIHdvcmtlcidzIGFkZHJlc3NcbiAqIFxuICogQHBhcmFtIHtzdHJpbmd9IGFkZHJlc3NcbiAqIEBwYXJhbSB7T2JqZWN0fSBjb25maWcgTGlicmFyeSBjb25maWcgKHByb3ZpZGVkIGJ5IHRoZSBwcm94eSBidXQgY2FuIGJlIG92ZXJyaWRkZW4pXG4gKiBAcmV0dXJucyB7UHJvbWlzZX0gQSBQcm9taXNlIG9iamVjdCByZXByZXNlbnRzIHRoZSB7T2JqZWN0fVxuICovXG5leHBvcnQgY29uc3QgZmV0Y2hXb3JrZXIgPSBhc3luYyAoYWRkcmVzcywgY29uZmlnID0ge30pID0+IHtcbiAgICBcbiAgICB0cnkge1xuXG4gICAgICAgIGNvbnN0IGN1cnJlbnRTdGF0ZSA9IGF3YWl0IGZldGNoU3RhdGUoYWRkcmVzcywgY29uZmlnKTtcbiAgICAgICAgY29uc3QgcmVwdXRhdGlvbiA9IGF3YWl0IGZldGNoUmVwdXRhdGlvbihhZGRyZXNzLCBjb25maWcpO1xuXG4gICAgICAgIGxldCBhY3RpdmVKb2IgPSBhd2FpdCBmZXRjaEFjdGl2ZUpvYkFkZHJlc3MoYWRkcmVzcywgY29uZmlnKTtcbiAgICAgICAgbGV0IGpvYlN0YXRlO1xuXG4gICAgICAgIC8vIENoZWNrIGlzIG5vdCAweDBcbiAgICAgICAgaWYgKCthY3RpdmVKb2IgIT09IDApIHtcblxuICAgICAgICAgICAgam9iU3RhdGUgPSBhd2FpdCBmZXRjaEpvYlN0YXRlKGFjdGl2ZUpvYiwgY29uZmlnKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGFjdGl2ZUpvYiA9IG51bGw7XG4gICAgICAgICAgICBqb2JTdGF0ZSA9IC0xO1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgIGFkZHJlc3MsXG4gICAgICAgICAgICBjdXJyZW50U3RhdGUsXG4gICAgICAgICAgICByZXB1dGF0aW9uLFxuICAgICAgICAgICAgY3VycmVudEpvYjogYWN0aXZlSm9iLFxuICAgICAgICAgICAgY3VycmVudEpvYlN0YXR1czogam9iU3RhdGVcbiAgICAgICAgfTtcbiAgICB9IGNhdGNoKGVycikge1xuICAgICAgICByZXR1cm4gUHJvbWlzZS5yZWplY3QoZXJyKTtcbiAgICB9XG59O1xuXG4vKipcbiAqIEdldCB3b3JrZXIgYnkgdGhlIHdvcmtlcidzIGlkXG4gKiBcbiAqIEBwYXJhbSB7aW50ZWdlcn0gaWQgXG4gKiBAcGFyYW0ge09iamVjdH0gY29uZmlnIExpYnJhcnkgY29uZmlnIChwcm92aWRlZCBieSB0aGUgcHJveHkgYnV0IGNhbiBiZSBvdmVycmlkZGVuKVxuICogQHJldHVybnMge1Byb21pc2V9IEEgUHJvbWlzZSBvYmplY3QgcmVwcmVzZW50cyB0aGUge09iamVjdH1cbiAqL1xuZXhwb3J0IGNvbnN0IGZldGNoV29ya2VyQnlJZCA9IGFzeW5jIChpZCwgY29uZmlnID0ge30pID0+IHtcbiAgICBcbiAgICB0cnkge1xuXG4gICAgICAgIGNvbnN0IGFkZHJlc3MgPSBhd2FpdCBmZXRjaEFkZHJlc3NCeUlkKGlkLCBjb25maWcpO1xuICAgICAgICBjb25zdCB3b3JrZXIgPSBhd2FpdCBmZXRjaFdvcmtlcihhZGRyZXNzLCBjb25maWcpO1xuXG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICBpZDogaWQsXG4gICAgICAgICAgICAuLi53b3JrZXJcbiAgICAgICAgfTtcbiAgICB9IGNhdGNoKGVycikge1xuICAgICAgICByZXR1cm4gUHJvbWlzZS5yZWplY3QoZXJyKTtcbiAgICB9XG59O1xuXG4vKipcbiAqIEdldCBhbGwgd29ya2Vyc1xuICogXG4gKiBAcGFyYW0ge09iamVjdH0gY29uZmlnIExpYnJhcnkgY29uZmlnIChwcm92aWRlZCBieSB0aGUgcHJveHkgYnV0IGNhbiBiZSBvdmVycmlkZGVuKVxuICogQHJldHVybnMge1Byb21pc2V9IEEgUHJvbWlzZSBvYmplY3QgcmVwcmVzZW50cyB0aGUge251bWJlcn1cbiAqL1xuZXhwb3J0IGNvbnN0IGZldGNoQWxsID0gYXN5bmMgKGNvbmZpZyA9IHt9KSA9PiB7XG4gICAgbGV0IHJlY29yZHMgPSBbXTtcbiAgICBsZXQgZXJyb3IgPSBbXTtcblxuICAgIHRyeSB7XG5cbiAgICAgICAgY29uc3QgY291bnQgPSBhd2FpdCBmZXRjaENvdW50KGNvbmZpZyk7ICAgIFxuXG4gICAgICAgIGZvciAobGV0IGk9MDsgaSA8IGNvdW50OyBpKyspIHtcbiAgICAgICAgICAgIFxuICAgICAgICAgICAgdHJ5IHtcblxuICAgICAgICAgICAgICAgIGNvbnN0IHdvcmtlciA9IGF3YWl0IGZldGNoV29ya2VyQnlJZChpLCBjb25maWcpO1xuXG4gICAgICAgICAgICAgICAgcmVjb3Jkcy5wdXNoKHtcbiAgICAgICAgICAgICAgICAgICAgaWQ6IGksXG4gICAgICAgICAgICAgICAgICAgIC4uLndvcmtlclxuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfSBjYXRjaChlcnIpIHtcbiAgICAgICAgICAgICAgICBlcnJvci5wdXNoKHtcbiAgICAgICAgICAgICAgICAgICAgaWQ6IGksXG4gICAgICAgICAgICAgICAgICAgIG1lc3NhZ2U6IGVyci5tZXNzYWdlXG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9ICAgICAgICBcbiAgICAgICAgfVxuICAgIH0gY2F0Y2goZXJyKSB7XG4gICAgICAgIGVycm9yLnB1c2goe1xuICAgICAgICAgICAgZXJyb3I6IGVyci5tZXNzYWdlXG4gICAgICAgIH0pO1xuICAgIH0gICBcblxuICAgIHJldHVybiB7XG4gICAgICAgIHJlY29yZHMsXG4gICAgICAgIGVycm9yXG4gICAgfTtcbn07XG5cbi8qKlxuICogSGFuZGxlIGV2ZW50IFdvcmtlck5vZGVDcmVhdGVkXG4gKiBcbiAqIEBwYXJhbSB7RnVuY3Rpb259IHN0b3JlQ2FsbGJhY2sgXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBlcnJvckNhbGxiYWNrXG4gKiBAcGFyYW0ge09iamVjdH0gY29uZmlnIExpYnJhcnkgY29uZmlnIChwcm92aWRlZCBieSB0aGUgcHJveHkgYnV0IGNhbiBiZSBvdmVycmlkZGVuKVxuICovXG5leHBvcnQgY29uc3QgZXZlbnRXb3JrZXJOb2RlQ3JlYXRlZCA9IChzdG9yZUNhbGxiYWNrID0gKCkgPT4ge30sIGVycm9yQ2FsbGJhY2sgPSAoKSA9PiB7fSwgY29uZmlnID0ge30pID0+IHtcbiAgICBcbiAgICBpZiAoIWNvbmZpZy53ZWIzKSB7XG4gICAgICAgIHRocm93IHBqc0Vycm9yKFdFQjNfUkVRVUlSRUQpO1xuICAgIH1cblxuICAgIGlmICghY29uZmlnLmNvbnRyYWN0cyB8fCAhY29uZmlnLmNvbnRyYWN0cy5QYW5kb3JhIHx8ICFjb25maWcuY29udHJhY3RzLlBhbmRvcmEuYWJpKSB7XG4gICAgICAgIHRocm93IHBqc0Vycm9yKENPTlRSQUNUX1JFUVVJUkVELCAnUGFuZG9yYScpO1xuICAgIH1cblxuICAgIGlmICghY29uZmlnLmFkZHJlc3NlcyB8fCAhY29uZmlnLmFkZHJlc3Nlcy5QYW5kb3JhKSB7XG4gICAgICAgIHRocm93IHBqc0Vycm9yKEFERFJFU1NfUkVRVUlSRUQsICdQYW5kb3JhJyk7XG4gICAgfVxuXG4gICAgY29uc3QgcGFuID0gbmV3IGNvbmZpZy53ZWIzLmV0aC5Db250cmFjdChjb25maWcuY29udHJhY3RzLlBhbmRvcmEuYWJpLCBjb25maWcuYWRkcmVzc2VzLlBhbmRvcmEpO1xuICAgIHBhbi5ldmVudHMuV29ya2VyTm9kZUNyZWF0ZWQoe1xuICAgICAgICBmcm9tQmxvY2s6IDBcbiAgICB9KVxuICAgICAgICAub24oJ2RhdGEnLCBhc3luYyByZXMgPT4ge1xuXG4gICAgICAgICAgICB0cnkge1xuXG4gICAgICAgICAgICAgICAgY29uc3Qgd29ya2VyID0gYXdhaXQgZmV0Y2hXb3JrZXIocmVzLmFyZ3Mud29ya2VyTm9kZSwgY29uZmlnKTtcbiAgICAgICAgICAgICAgICBzdG9yZUNhbGxiYWNrKHtcbiAgICAgICAgICAgICAgICAgICAgYWRkcmVzczogcmVzLmFyZ3Mud29ya2VyTm9kZSxcbiAgICAgICAgICAgICAgICAgICAgd29ya2VyLFxuICAgICAgICAgICAgICAgICAgICBzdGF0dXM6ICdjcmVhdGVkJyxcbiAgICAgICAgICAgICAgICAgICAgZXZlbnQ6ICdQYW5kb3JhLldvcmtlck5vZGVDcmVhdGVkJ1xuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfSBjYXRjaChlcnIpIHtcbiAgICAgICAgICAgICAgICBlcnJvckNhbGxiYWNrKGVycik7XG4gICAgICAgICAgICB9ICAgICAgICAgICAgXG4gICAgICAgIH0pXG4gICAgICAgIC5vbignZXJyb3InLCBlcnJvckNhbGxiYWNrKTtcbn07XG5cbi8qKlxuICogSGFuZGxlIGV2ZW50IFN0YXRlQ2hhbmdlZCBmb3IgV29ya2VyTm9kZVxuICogXG4gKiBAcGFyYW0ge3N0cmluZ30gYWRkcmVzc1xuICogQHBhcmFtIHtGdW5jdGlvbn0gc3RvcmVDYWxsYmFjayBcbiAqIEBwYXJhbSB7RnVuY3Rpb259IGVycm9yQ2FsbGJhY2tcbiAqIEBwYXJhbSB7T2JqZWN0fSBjb25maWcgTGlicmFyeSBjb25maWcgKHByb3ZpZGVkIGJ5IHRoZSBwcm94eSBidXQgY2FuIGJlIG92ZXJyaWRkZW4pXG4gKiBAcmV0dXJucyB7UHJvbWlzZX0gQSBQcm9taXNlIG9iamVjdCByZXByZXNlbnRzIHRoZSB7T2JqZWN0fSBcbiAqL1xuZXhwb3J0IGNvbnN0IGV2ZW50V29ya2VyTm9kZVN0YXRlQ2hhbmdlZCA9IChhZGRyZXNzLCBzdG9yZUNhbGxiYWNrID0gKCkgPT4ge30sIGVycm9yQ2FsbGJhY2sgPSAoKSA9PiB7fSwgY29uZmlnID0ge30pID0+IHtcblxuICAgIGlmICghY29uZmlnLndlYjMpIHtcbiAgICAgICAgdGhyb3cgcGpzRXJyb3IoV0VCM19SRVFVSVJFRCk7XG4gICAgfVxuXG4gICAgaWYgKCFjb25maWcuY29udHJhY3RzIHx8ICFjb25maWcuY29udHJhY3RzLldvcmtlck5vZGUgfHwgIWNvbmZpZy5jb250cmFjdHMuV29ya2VyTm9kZS5hYmkpIHtcbiAgICAgICAgdGhyb3cgcGpzRXJyb3IoQ09OVFJBQ1RfUkVRVUlSRUQsICdXb3JrZXJOb2RlJyk7XG4gICAgfVxuXG4gICAgY29uc3Qgd29yID0gbmV3IGNvbmZpZy53ZWIzLmV0aC5Db250cmFjdChjb25maWcuY29udHJhY3RzLldvcmtlck5vZGUuYWJpLCBhZGRyZXNzKTtcbiAgICB3b3IuZXZlbnRzLlN0YXRlQ2hhbmdlZCh7XG4gICAgICAgIGZyb21CbG9jazogMFxuICAgIH0pXG4gICAgICAgIC5vbignZGF0YScsIGFzeW5jIHJlcyA9PiB7XG5cbiAgICAgICAgICAgIHRyeSB7XG5cbiAgICAgICAgICAgICAgICBjb25zdCB3b3JrZXIgPSBhd2FpdCBmZXRjaFdvcmtlcihyZXMuYXJncy53b3JrZXJOb2RlLCBjb25maWcpO1xuICAgICAgICAgICAgICAgIHN0b3JlQ2FsbGJhY2soe1xuICAgICAgICAgICAgICAgICAgICBhZGRyZXNzOiByZXMuYXJncy53b3JrZXJOb2RlLFxuICAgICAgICAgICAgICAgICAgICB3b3JrZXIsXG4gICAgICAgICAgICAgICAgICAgIHN0YXR1czogJ2NoYW5nZWQnLFxuICAgICAgICAgICAgICAgICAgICBldmVudDogJ1dvcmtlck5vZGUuU3RhdGVDaGFuZ2VkJ1xuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfSBjYXRjaChlcnIpIHtcbiAgICAgICAgICAgICAgICBlcnJvckNhbGxiYWNrKGVycik7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pXG4gICAgICAgIC5vbignZXJyb3InLCBlcnJvckNhbGxiYWNrKTtcbn07XG4iXX0=