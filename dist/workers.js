/**
 * WorkerNodes related methods
 * This file it is a part of the Pandora Pyrrha Javascript library
 * 
 * @file workers.js
 * @author Kostiantyn Smyrnov <kostysh@gmail.com>
 * @date 2018
 */

'use strict';Object.defineProperty(exports, "__esModule", { value: true });exports.eventWorkerNodeStateChanged = exports.eventWorkerNodeCreated = exports.fetchAll = exports.fetchWorkerById = exports.fetchWorker = exports.fetchActiveJobAddress = exports.fetchReputation = exports.fetchState = exports.fetchAddressById = exports.fetchCount = void 0;

var _errors = _interopRequireWildcard(require("./helpers/errors"));





var _jobs = require("./jobs");function _interopRequireWildcard(obj) {if (obj && obj.__esModule) {return obj;} else {var newObj = {};if (obj != null) {for (var key in obj) {if (Object.prototype.hasOwnProperty.call(obj, key)) {var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {};if (desc.get || desc.set) {Object.defineProperty(newObj, key, desc);} else {newObj[key] = obj[key];}}}}newObj.default = obj;return newObj;}}function _objectSpread(target) {for (var i = 1; i < arguments.length; i++) {var source = arguments[i] != null ? arguments[i] : {};var ownKeys = Object.keys(source);if (typeof Object.getOwnPropertySymbols === 'function') {ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) {return Object.getOwnPropertyDescriptor(source, sym).enumerable;}));}ownKeys.forEach(function (key) {_defineProperty(target, key, source[key]);});}return target;}function _defineProperty(obj, key, value) {if (key in obj) {Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true });} else {obj[key] = value;}return obj;}

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

  if (!config.addresses || !config.addresses.pandora) {
    throw (0, _errors.default)(_errors.ADDRESS_REQUIRED, 'Pandora');
  }

  const pan = new config.web3.eth.Contract(config.contracts.Pandora.abi, config.addresses.pandora);
  const count = await pan.methods.
  workerNodesCount().
  call();
  return Number.parseInt(count, 10);
};

/**
    * Get worker address from Pandora contract by the worker Id
    * 
    * @param {integer} id Worker Id
    * @param {Object} config Library config (provided by the proxy but can be overridden)
    * @returns {Promise} A Promise object represents the {string} 
    */exports.fetchCount = fetchCount;
const fetchAddressById = async (id, config = {}) => {

  if (!config.web3) {
    throw (0, _errors.default)(_errors.WEB3_REQUIRED);
  }

  if (!config.contracts || !config.contracts.Pandora || !config.contracts.Pandora.abi) {
    throw (0, _errors.default)(_errors.CONTRACT_REQUIRED, 'Pandora');
  }

  if (!config.addresses || !config.addresses.pandora) {
    throw (0, _errors.default)(_errors.ADDRESS_REQUIRED, 'Pandora');
  }

  const pan = new config.web3.eth.Contract(config.contracts.Pandora.abi, config.addresses.pandora);
  const address = await pan.methods.
  workerNodes(id).
  call();
  return String(address);
};

/**
    * Get worker state from Worker contract by the worker address
    * 
    * @param {string} address 
    * @param {Object} config Library config (provided by the proxy but can be overridden)
    * @returns {Promise} A Promise object represents the {number}
    */exports.fetchAddressById = fetchAddressById;
const fetchState = async (address, config = {}) => {

  if (!config.web3) {
    throw (0, _errors.default)(_errors.WEB3_REQUIRED);
  }

  if (!config.contracts || !config.contracts.WorkerNode || !config.contracts.WorkerNode.abi) {
    throw (0, _errors.default)(_errors.CONTRACT_REQUIRED, 'WorkerNode');
  }

  const wor = new config.web3.eth.Contract(config.contracts.WorkerNode.abi, address);
  const state = await wor.methods.
  currentState().
  call();
  return Number.parseInt(state, 10);
};

/**
    * Get worker reputation from Worker contract by the worker address
    * 
    * @param {string} address 
    * @param {Object} config Library config (provided by the proxy but can be overridden)
    * @returns {Promise} A Promise object represents the {number}
    */exports.fetchState = fetchState;
const fetchReputation = async (address, config = {}) => {

  if (!config.web3) {
    throw (0, _errors.default)(_errors.WEB3_REQUIRED);
  }

  if (!config.contracts || !config.contracts.WorkerNode || !config.contracts.WorkerNode.abi) {
    throw (0, _errors.default)(_errors.CONTRACT_REQUIRED, 'WorkerNode');
  }

  const wor = new config.web3.eth.Contract(config.contracts.WorkerNode.abi, address);
  const reputation = await wor.methods.
  reputation().
  call();
  return Number.parseInt(reputation, 10);
};

/**
    * Get worker's active job from Worker contract by the worker address
    * 
    * @param {string} address 
    * @param {Object} config Library config (provided by the proxy but can be overridden)
    * @returns {Promise} A Promise object represents the {string}
    */exports.fetchReputation = fetchReputation;
const fetchActiveJobAddress = async (address, config = {}) => {

  if (!config.web3) {
    throw (0, _errors.default)(_errors.WEB3_REQUIRED);
  }

  if (!config.contracts || !config.contracts.WorkerNode || !config.contracts.WorkerNode.abi) {
    throw (0, _errors.default)(_errors.CONTRACT_REQUIRED, 'WorkerNode');
  }

  const wor = new config.web3.eth.Contract(config.contracts.WorkerNode.abi, address);
  const activeJob = await wor.methods.
  activeJob().
  call();
  return String(activeJob, 10);
};

/**
    * Get worker by the worker's address
    * 
    * @param {string} address
    * @param {Object} config Library config (provided by the proxy but can be overridden)
    * @returns {Promise} A Promise object represents the {Object}
    */exports.fetchActiveJobAddress = fetchActiveJobAddress;
const fetchWorker = async (address, config = {}) => {

  try {

    const currentState = await fetchState(address, config);
    const reputation = await fetchReputation(address, config);

    let activeJob = await fetchActiveJobAddress(address, config);
    let jobState;

    // Check is not 0x0
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
      currentJobStatus: jobState };

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
    */exports.fetchWorker = fetchWorker;
const fetchWorkerById = async (id, config = {}) => {

  try {

    const address = await fetchAddressById(id, config);
    const worker = await fetchWorker(address, config);

    return _objectSpread({
      id: id },
    worker);

  } catch (err) {
    return Promise.reject(err);
  }
};

/**
    * Get all workers
    * 
    * @param {Object} config Library config (provided by the proxy but can be overridden)
    * @returns {Promise} A Promise object represents the {number}
    */exports.fetchWorkerById = fetchWorkerById;
const fetchAll = async (config = {}) => {
  let records = [];
  let error = [];

  try {

    const count = await fetchCount(config);

    for (let i = 0; i < count; i++) {

      try {

        const worker = await fetchWorkerById(i, config);

        records.push(_objectSpread({
          id: i },
        worker));

      } catch (err) {
        error.push({
          id: i,
          message: err.message });

      }
    }
  } catch (err) {
    error.push({
      error: err.message });

  }

  return {
    records,
    error };

};

/**
    * Handle event WorkerNodeCreated
    * 
    * @param {Function} storeCallback 
    * @param {Function} errorCallback
    * @param {Object} config Library config (provided by the proxy but can be overridden)
    */exports.fetchAll = fetchAll;
const eventWorkerNodeCreated = (storeCallback = () => {}, errorCallback = () => {}, config = {}) => {

  if (!config.web3) {
    throw (0, _errors.default)(_errors.WEB3_REQUIRED);
  }

  if (!config.contracts || !config.contracts.Pandora || !config.contracts.Pandora.abi) {
    throw (0, _errors.default)(_errors.CONTRACT_REQUIRED, 'Pandora');
  }

  if (!config.addresses || !config.addresses.pandora) {
    throw (0, _errors.default)(_errors.ADDRESS_REQUIRED, 'Pandora');
  }

  const pan = new config.web3.eth.Contract(config.contracts.Pandora.abi, config.addresses.pandora);
  pan.events.WorkerNodeCreated({
    fromBlock: 0 }).

  on('data', async res => {

    try {

      const worker = await fetchWorker(res.args.workerNode, config);
      storeCallback({
        address: res.args.workerNode,
        worker,
        status: 'created',
        event: 'Pandora.WorkerNodeCreated' });

    } catch (err) {
      errorCallback(err);
    }
  }).
  on('error', errorCallback);
};

/**
    * Handle event StateChanged for WorkerNode
    * 
    * @param {string} address
    * @param {Function} storeCallback 
    * @param {Function} errorCallback
    * @param {Object} config Library config (provided by the proxy but can be overridden)
    * @returns {Promise} A Promise object represents the {Object} 
    */exports.eventWorkerNodeCreated = eventWorkerNodeCreated;
const eventWorkerNodeStateChanged = (address, storeCallback = () => {}, errorCallback = () => {}, config = {}) => {

  if (!config.web3) {
    throw (0, _errors.default)(_errors.WEB3_REQUIRED);
  }

  if (!config.contracts || !config.contracts.WorkerNode || !config.contracts.WorkerNode.abi) {
    throw (0, _errors.default)(_errors.CONTRACT_REQUIRED, 'WorkerNode');
  }

  const wor = new config.web3.eth.Contract(config.contracts.WorkerNode.abi, address);
  wor.events.StateChanged({
    fromBlock: 0 }).

  on('data', async res => {

    try {

      const worker = await fetchWorker(res.args.workerNode, config);
      storeCallback({
        address: res.args.workerNode,
        worker,
        status: 'changed',
        event: 'WorkerNode.StateChanged' });

    } catch (err) {
      errorCallback(err);
    }
  }).
  on('error', errorCallback);
};exports.eventWorkerNodeStateChanged = eventWorkerNodeStateChanged;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy93b3JrZXJzLmpzIl0sIm5hbWVzIjpbImZldGNoQ291bnQiLCJjb25maWciLCJ3ZWIzIiwiV0VCM19SRVFVSVJFRCIsImNvbnRyYWN0cyIsIlBhbmRvcmEiLCJhYmkiLCJDT05UUkFDVF9SRVFVSVJFRCIsImFkZHJlc3NlcyIsInBhbmRvcmEiLCJBRERSRVNTX1JFUVVJUkVEIiwicGFuIiwiZXRoIiwiQ29udHJhY3QiLCJjb3VudCIsIm1ldGhvZHMiLCJ3b3JrZXJOb2Rlc0NvdW50IiwiY2FsbCIsIk51bWJlciIsInBhcnNlSW50IiwiZmV0Y2hBZGRyZXNzQnlJZCIsImlkIiwiYWRkcmVzcyIsIndvcmtlck5vZGVzIiwiU3RyaW5nIiwiZmV0Y2hTdGF0ZSIsIldvcmtlck5vZGUiLCJ3b3IiLCJzdGF0ZSIsImN1cnJlbnRTdGF0ZSIsImZldGNoUmVwdXRhdGlvbiIsInJlcHV0YXRpb24iLCJmZXRjaEFjdGl2ZUpvYkFkZHJlc3MiLCJhY3RpdmVKb2IiLCJmZXRjaFdvcmtlciIsImpvYlN0YXRlIiwiY3VycmVudEpvYiIsImN1cnJlbnRKb2JTdGF0dXMiLCJlcnIiLCJQcm9taXNlIiwicmVqZWN0IiwiZmV0Y2hXb3JrZXJCeUlkIiwid29ya2VyIiwiZmV0Y2hBbGwiLCJyZWNvcmRzIiwiZXJyb3IiLCJpIiwicHVzaCIsIm1lc3NhZ2UiLCJldmVudFdvcmtlck5vZGVDcmVhdGVkIiwic3RvcmVDYWxsYmFjayIsImVycm9yQ2FsbGJhY2siLCJldmVudHMiLCJXb3JrZXJOb2RlQ3JlYXRlZCIsImZyb21CbG9jayIsIm9uIiwicmVzIiwiYXJncyIsIndvcmtlck5vZGUiLCJzdGF0dXMiLCJldmVudCIsImV2ZW50V29ya2VyTm9kZVN0YXRlQ2hhbmdlZCIsIlN0YXRlQ2hhbmdlZCJdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7Ozs7OztBQVNBLGE7O0FBRUE7Ozs7OztBQU1BLDhCOztBQUVBOzs7Ozs7QUFNTyxNQUFNQSxhQUFhLE9BQU9DLFNBQVMsRUFBaEIs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bEJMLENBa0JRLE9BbEJSLEVBa0JpQkosYUFsQmpCO0FBbUJILENBOUJNLEMiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIFdvcmtlck5vZGVzIHJlbGF0ZWQgbWV0aG9kc1xuICogVGhpcyBmaWxlIGl0IGlzIGEgcGFydCBvZiB0aGUgUGFuZG9yYSBQeXJyaGEgSmF2YXNjcmlwdCBsaWJyYXJ5XG4gKiBcbiAqIEBmaWxlIHdvcmtlcnMuanNcbiAqIEBhdXRob3IgS29zdGlhbnR5biBTbXlybm92IDxrb3N0eXNoQGdtYWlsLmNvbT5cbiAqIEBkYXRlIDIwMThcbiAqL1xuXG4ndXNlIHN0cmljdCc7XG5cbmltcG9ydCBwanNFcnJvciwge1xuICAgIENPTlRSQUNUX1JFUVVJUkVELFxuICAgIEFERFJFU1NfUkVRVUlSRUQsXG4gICAgV0VCM19SRVFVSVJFRFxufSBmcm9tICcuL2hlbHBlcnMvZXJyb3JzJztcblxuaW1wb3J0IHsgZmV0Y2hTdGF0ZSBhcyBmZXRjaEpvYlN0YXRlIH0gZnJvbSAnLi9qb2JzJztcblxuLyoqXG4gKiBHZXQgd29ya2VyIG5vZGVzIGNvdW50IGZyb20gUGFuZG9yYSBjb250cmFjdFxuICogXG4gKiBAcGFyYW0ge09iamVjdH0gY29uZmlnIExpYnJhcnkgY29uZmlnIChwcm92aWRlZCBieSB0aGUgcHJveHkgYnV0IGNhbiBiZSBvdmVycmlkZGVuKVxuICogQHJldHVybnMge1Byb21pc2V9IEEgUHJvbWlzZSBvYmplY3QgcmVwcmVzZW50cyB0aGUge251bWJlcn0gXG4gKi9cbmV4cG9ydCBjb25zdCBmZXRjaENvdW50ID0gYXN5bmMgKGNvbmZpZyA9IHt9KSA9PiB7XG5cbiAgICBpZiAoIWNvbmZpZy53ZWIzKSB7XG4gICAgICAgIHRocm93IHBqc0Vycm9yKFdFQjNfUkVRVUlSRUQpO1xuICAgIH1cbiAgICBcbiAgICBpZiAoIWNvbmZpZy5jb250cmFjdHMgfHwgIWNvbmZpZy5jb250cmFjdHMuUGFuZG9yYSB8fCAhY29uZmlnLmNvbnRyYWN0cy5QYW5kb3JhLmFiaSkge1xuICAgICAgICB0aHJvdyBwanNFcnJvcihDT05UUkFDVF9SRVFVSVJFRCwgJ1BhbmRvcmEnKTtcbiAgICB9XG5cbiAgICBpZiAoIWNvbmZpZy5hZGRyZXNzZXMgfHwgIWNvbmZpZy5hZGRyZXNzZXMucGFuZG9yYSkge1xuICAgICAgICB0aHJvdyBwanNFcnJvcihBRERSRVNTX1JFUVVJUkVELCAnUGFuZG9yYScpO1xuICAgIH1cblxuICAgIGNvbnN0IHBhbiA9IG5ldyBjb25maWcud2ViMy5ldGguQ29udHJhY3QoY29uZmlnLmNvbnRyYWN0cy5QYW5kb3JhLmFiaSwgY29uZmlnLmFkZHJlc3Nlcy5wYW5kb3JhKTtcbiAgICBjb25zdCBjb3VudCA9IGF3YWl0IHBhbi5tZXRob2RzXG4gICAgICAgIC53b3JrZXJOb2Rlc0NvdW50KClcbiAgICAgICAgLmNhbGwoKTtcbiAgICByZXR1cm4gTnVtYmVyLnBhcnNlSW50KGNvdW50LCAxMCk7XG59O1xuXG4vKipcbiAqIEdldCB3b3JrZXIgYWRkcmVzcyBmcm9tIFBhbmRvcmEgY29udHJhY3QgYnkgdGhlIHdvcmtlciBJZFxuICogXG4gKiBAcGFyYW0ge2ludGVnZXJ9IGlkIFdvcmtlciBJZFxuICogQHBhcmFtIHtPYmplY3R9IGNvbmZpZyBMaWJyYXJ5IGNvbmZpZyAocHJvdmlkZWQgYnkgdGhlIHByb3h5IGJ1dCBjYW4gYmUgb3ZlcnJpZGRlbilcbiAqIEByZXR1cm5zIHtQcm9taXNlfSBBIFByb21pc2Ugb2JqZWN0IHJlcHJlc2VudHMgdGhlIHtzdHJpbmd9IFxuICovXG5leHBvcnQgY29uc3QgZmV0Y2hBZGRyZXNzQnlJZCA9IGFzeW5jIChpZCwgY29uZmlnID0ge30pID0+IHtcblxuICAgIGlmICghY29uZmlnLndlYjMpIHtcbiAgICAgICAgdGhyb3cgcGpzRXJyb3IoV0VCM19SRVFVSVJFRCk7XG4gICAgfVxuXG4gICAgaWYgKCFjb25maWcuY29udHJhY3RzIHx8ICFjb25maWcuY29udHJhY3RzLlBhbmRvcmEgfHwgIWNvbmZpZy5jb250cmFjdHMuUGFuZG9yYS5hYmkpIHtcbiAgICAgICAgdGhyb3cgcGpzRXJyb3IoQ09OVFJBQ1RfUkVRVUlSRUQsICdQYW5kb3JhJyk7XG4gICAgfVxuXG4gICAgaWYgKCFjb25maWcuYWRkcmVzc2VzIHx8ICFjb25maWcuYWRkcmVzc2VzLnBhbmRvcmEpIHtcbiAgICAgICAgdGhyb3cgcGpzRXJyb3IoQUREUkVTU19SRVFVSVJFRCwgJ1BhbmRvcmEnKTtcbiAgICB9XG5cbiAgICBjb25zdCBwYW4gPSBuZXcgY29uZmlnLndlYjMuZXRoLkNvbnRyYWN0KGNvbmZpZy5jb250cmFjdHMuUGFuZG9yYS5hYmksIGNvbmZpZy5hZGRyZXNzZXMucGFuZG9yYSk7XG4gICAgY29uc3QgYWRkcmVzcyA9IGF3YWl0IHBhbi5tZXRob2RzXG4gICAgICAgIC53b3JrZXJOb2RlcyhpZClcbiAgICAgICAgLmNhbGwoKTtcbiAgICByZXR1cm4gU3RyaW5nKGFkZHJlc3MpO1xufTtcblxuLyoqXG4gKiBHZXQgd29ya2VyIHN0YXRlIGZyb20gV29ya2VyIGNvbnRyYWN0IGJ5IHRoZSB3b3JrZXIgYWRkcmVzc1xuICogXG4gKiBAcGFyYW0ge3N0cmluZ30gYWRkcmVzcyBcbiAqIEBwYXJhbSB7T2JqZWN0fSBjb25maWcgTGlicmFyeSBjb25maWcgKHByb3ZpZGVkIGJ5IHRoZSBwcm94eSBidXQgY2FuIGJlIG92ZXJyaWRkZW4pXG4gKiBAcmV0dXJucyB7UHJvbWlzZX0gQSBQcm9taXNlIG9iamVjdCByZXByZXNlbnRzIHRoZSB7bnVtYmVyfVxuICovXG5leHBvcnQgY29uc3QgZmV0Y2hTdGF0ZSA9IGFzeW5jIChhZGRyZXNzLCBjb25maWcgPSB7fSkgPT4ge1xuXG4gICAgaWYgKCFjb25maWcud2ViMykge1xuICAgICAgICB0aHJvdyBwanNFcnJvcihXRUIzX1JFUVVJUkVEKTtcbiAgICB9XG5cbiAgICBpZiAoIWNvbmZpZy5jb250cmFjdHMgfHwgIWNvbmZpZy5jb250cmFjdHMuV29ya2VyTm9kZSB8fCAhY29uZmlnLmNvbnRyYWN0cy5Xb3JrZXJOb2RlLmFiaSkge1xuICAgICAgICB0aHJvdyBwanNFcnJvcihDT05UUkFDVF9SRVFVSVJFRCwgJ1dvcmtlck5vZGUnKTtcbiAgICB9XG5cbiAgICBjb25zdCB3b3IgPSBuZXcgY29uZmlnLndlYjMuZXRoLkNvbnRyYWN0KGNvbmZpZy5jb250cmFjdHMuV29ya2VyTm9kZS5hYmksIGFkZHJlc3MpOyAgICBcbiAgICBjb25zdCBzdGF0ZSA9IGF3YWl0IHdvci5tZXRob2RzXG4gICAgICAgIC5jdXJyZW50U3RhdGUoKVxuICAgICAgICAuY2FsbCgpO1xuICAgIHJldHVybiBOdW1iZXIucGFyc2VJbnQoc3RhdGUsIDEwKTtcbn07XG5cbi8qKlxuICogR2V0IHdvcmtlciByZXB1dGF0aW9uIGZyb20gV29ya2VyIGNvbnRyYWN0IGJ5IHRoZSB3b3JrZXIgYWRkcmVzc1xuICogXG4gKiBAcGFyYW0ge3N0cmluZ30gYWRkcmVzcyBcbiAqIEBwYXJhbSB7T2JqZWN0fSBjb25maWcgTGlicmFyeSBjb25maWcgKHByb3ZpZGVkIGJ5IHRoZSBwcm94eSBidXQgY2FuIGJlIG92ZXJyaWRkZW4pXG4gKiBAcmV0dXJucyB7UHJvbWlzZX0gQSBQcm9taXNlIG9iamVjdCByZXByZXNlbnRzIHRoZSB7bnVtYmVyfVxuICovXG5leHBvcnQgY29uc3QgZmV0Y2hSZXB1dGF0aW9uID0gYXN5bmMgKGFkZHJlc3MsIGNvbmZpZyA9IHt9KSA9PiB7XG5cbiAgICBpZiAoIWNvbmZpZy53ZWIzKSB7XG4gICAgICAgIHRocm93IHBqc0Vycm9yKFdFQjNfUkVRVUlSRUQpO1xuICAgIH1cblxuICAgIGlmICghY29uZmlnLmNvbnRyYWN0cyB8fCAhY29uZmlnLmNvbnRyYWN0cy5Xb3JrZXJOb2RlIHx8ICFjb25maWcuY29udHJhY3RzLldvcmtlck5vZGUuYWJpKSB7XG4gICAgICAgIHRocm93IHBqc0Vycm9yKENPTlRSQUNUX1JFUVVJUkVELCAnV29ya2VyTm9kZScpO1xuICAgIH1cblxuICAgIGNvbnN0IHdvciA9IG5ldyBjb25maWcud2ViMy5ldGguQ29udHJhY3QoY29uZmlnLmNvbnRyYWN0cy5Xb3JrZXJOb2RlLmFiaSwgYWRkcmVzcyk7XG4gICAgY29uc3QgcmVwdXRhdGlvbiA9IGF3YWl0IHdvci5tZXRob2RzXG4gICAgICAgIC5yZXB1dGF0aW9uKClcbiAgICAgICAgLmNhbGwoKTtcbiAgICByZXR1cm4gTnVtYmVyLnBhcnNlSW50KHJlcHV0YXRpb24sIDEwKTtcbn07XG5cbi8qKlxuICogR2V0IHdvcmtlcidzIGFjdGl2ZSBqb2IgZnJvbSBXb3JrZXIgY29udHJhY3QgYnkgdGhlIHdvcmtlciBhZGRyZXNzXG4gKiBcbiAqIEBwYXJhbSB7c3RyaW5nfSBhZGRyZXNzIFxuICogQHBhcmFtIHtPYmplY3R9IGNvbmZpZyBMaWJyYXJ5IGNvbmZpZyAocHJvdmlkZWQgYnkgdGhlIHByb3h5IGJ1dCBjYW4gYmUgb3ZlcnJpZGRlbilcbiAqIEByZXR1cm5zIHtQcm9taXNlfSBBIFByb21pc2Ugb2JqZWN0IHJlcHJlc2VudHMgdGhlIHtzdHJpbmd9XG4gKi9cbmV4cG9ydCBjb25zdCBmZXRjaEFjdGl2ZUpvYkFkZHJlc3MgPSBhc3luYyAoYWRkcmVzcywgY29uZmlnID0ge30pID0+IHtcblxuICAgIGlmICghY29uZmlnLndlYjMpIHtcbiAgICAgICAgdGhyb3cgcGpzRXJyb3IoV0VCM19SRVFVSVJFRCk7XG4gICAgfVxuICAgIFxuICAgIGlmICghY29uZmlnLmNvbnRyYWN0cyB8fCAhY29uZmlnLmNvbnRyYWN0cy5Xb3JrZXJOb2RlIHx8ICFjb25maWcuY29udHJhY3RzLldvcmtlck5vZGUuYWJpKSB7XG4gICAgICAgIHRocm93IHBqc0Vycm9yKENPTlRSQUNUX1JFUVVJUkVELCAnV29ya2VyTm9kZScpO1xuICAgIH1cblxuICAgIGNvbnN0IHdvciA9IG5ldyBjb25maWcud2ViMy5ldGguQ29udHJhY3QoY29uZmlnLmNvbnRyYWN0cy5Xb3JrZXJOb2RlLmFiaSwgYWRkcmVzcyk7XG4gICAgY29uc3QgYWN0aXZlSm9iID0gYXdhaXQgd29yLm1ldGhvZHNcbiAgICAgICAgLmFjdGl2ZUpvYigpXG4gICAgICAgIC5jYWxsKCk7XG4gICAgcmV0dXJuIFN0cmluZyhhY3RpdmVKb2IsIDEwKTtcbn07XG5cbi8qKlxuICogR2V0IHdvcmtlciBieSB0aGUgd29ya2VyJ3MgYWRkcmVzc1xuICogXG4gKiBAcGFyYW0ge3N0cmluZ30gYWRkcmVzc1xuICogQHBhcmFtIHtPYmplY3R9IGNvbmZpZyBMaWJyYXJ5IGNvbmZpZyAocHJvdmlkZWQgYnkgdGhlIHByb3h5IGJ1dCBjYW4gYmUgb3ZlcnJpZGRlbilcbiAqIEByZXR1cm5zIHtQcm9taXNlfSBBIFByb21pc2Ugb2JqZWN0IHJlcHJlc2VudHMgdGhlIHtPYmplY3R9XG4gKi9cbmV4cG9ydCBjb25zdCBmZXRjaFdvcmtlciA9IGFzeW5jIChhZGRyZXNzLCBjb25maWcgPSB7fSkgPT4ge1xuICAgIFxuICAgIHRyeSB7XG5cbiAgICAgICAgY29uc3QgY3VycmVudFN0YXRlID0gYXdhaXQgZmV0Y2hTdGF0ZShhZGRyZXNzLCBjb25maWcpO1xuICAgICAgICBjb25zdCByZXB1dGF0aW9uID0gYXdhaXQgZmV0Y2hSZXB1dGF0aW9uKGFkZHJlc3MsIGNvbmZpZyk7XG5cbiAgICAgICAgbGV0IGFjdGl2ZUpvYiA9IGF3YWl0IGZldGNoQWN0aXZlSm9iQWRkcmVzcyhhZGRyZXNzLCBjb25maWcpO1xuICAgICAgICBsZXQgam9iU3RhdGU7XG5cbiAgICAgICAgLy8gQ2hlY2sgaXMgbm90IDB4MFxuICAgICAgICBpZiAoK2FjdGl2ZUpvYiAhPT0gMCkge1xuXG4gICAgICAgICAgICBqb2JTdGF0ZSA9IGF3YWl0IGZldGNoSm9iU3RhdGUoYWN0aXZlSm9iLCBjb25maWcpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgYWN0aXZlSm9iID0gbnVsbDtcbiAgICAgICAgICAgIGpvYlN0YXRlID0gLTE7XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgYWRkcmVzcyxcbiAgICAgICAgICAgIGN1cnJlbnRTdGF0ZSxcbiAgICAgICAgICAgIHJlcHV0YXRpb24sXG4gICAgICAgICAgICBjdXJyZW50Sm9iOiBhY3RpdmVKb2IsXG4gICAgICAgICAgICBjdXJyZW50Sm9iU3RhdHVzOiBqb2JTdGF0ZVxuICAgICAgICB9O1xuICAgIH0gY2F0Y2goZXJyKSB7XG4gICAgICAgIHJldHVybiBQcm9taXNlLnJlamVjdChlcnIpO1xuICAgIH1cbn07XG5cbi8qKlxuICogR2V0IHdvcmtlciBieSB0aGUgd29ya2VyJ3MgaWRcbiAqIFxuICogQHBhcmFtIHtpbnRlZ2VyfSBpZCBcbiAqIEBwYXJhbSB7T2JqZWN0fSBjb25maWcgTGlicmFyeSBjb25maWcgKHByb3ZpZGVkIGJ5IHRoZSBwcm94eSBidXQgY2FuIGJlIG92ZXJyaWRkZW4pXG4gKiBAcmV0dXJucyB7UHJvbWlzZX0gQSBQcm9taXNlIG9iamVjdCByZXByZXNlbnRzIHRoZSB7T2JqZWN0fVxuICovXG5leHBvcnQgY29uc3QgZmV0Y2hXb3JrZXJCeUlkID0gYXN5bmMgKGlkLCBjb25maWcgPSB7fSkgPT4ge1xuICAgIFxuICAgIHRyeSB7XG5cbiAgICAgICAgY29uc3QgYWRkcmVzcyA9IGF3YWl0IGZldGNoQWRkcmVzc0J5SWQoaWQsIGNvbmZpZyk7XG4gICAgICAgIGNvbnN0IHdvcmtlciA9IGF3YWl0IGZldGNoV29ya2VyKGFkZHJlc3MsIGNvbmZpZyk7XG5cbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgIGlkOiBpZCxcbiAgICAgICAgICAgIC4uLndvcmtlclxuICAgICAgICB9O1xuICAgIH0gY2F0Y2goZXJyKSB7XG4gICAgICAgIHJldHVybiBQcm9taXNlLnJlamVjdChlcnIpO1xuICAgIH1cbn07XG5cbi8qKlxuICogR2V0IGFsbCB3b3JrZXJzXG4gKiBcbiAqIEBwYXJhbSB7T2JqZWN0fSBjb25maWcgTGlicmFyeSBjb25maWcgKHByb3ZpZGVkIGJ5IHRoZSBwcm94eSBidXQgY2FuIGJlIG92ZXJyaWRkZW4pXG4gKiBAcmV0dXJucyB7UHJvbWlzZX0gQSBQcm9taXNlIG9iamVjdCByZXByZXNlbnRzIHRoZSB7bnVtYmVyfVxuICovXG5leHBvcnQgY29uc3QgZmV0Y2hBbGwgPSBhc3luYyAoY29uZmlnID0ge30pID0+IHtcbiAgICBsZXQgcmVjb3JkcyA9IFtdO1xuICAgIGxldCBlcnJvciA9IFtdO1xuXG4gICAgdHJ5IHtcblxuICAgICAgICBjb25zdCBjb3VudCA9IGF3YWl0IGZldGNoQ291bnQoY29uZmlnKTsgICAgXG5cbiAgICAgICAgZm9yIChsZXQgaT0wOyBpIDwgY291bnQ7IGkrKykge1xuICAgICAgICAgICAgXG4gICAgICAgICAgICB0cnkge1xuXG4gICAgICAgICAgICAgICAgY29uc3Qgd29ya2VyID0gYXdhaXQgZmV0Y2hXb3JrZXJCeUlkKGksIGNvbmZpZyk7XG5cbiAgICAgICAgICAgICAgICByZWNvcmRzLnB1c2goe1xuICAgICAgICAgICAgICAgICAgICBpZDogaSxcbiAgICAgICAgICAgICAgICAgICAgLi4ud29ya2VyXG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9IGNhdGNoKGVycikge1xuICAgICAgICAgICAgICAgIGVycm9yLnB1c2goe1xuICAgICAgICAgICAgICAgICAgICBpZDogaSxcbiAgICAgICAgICAgICAgICAgICAgbWVzc2FnZTogZXJyLm1lc3NhZ2VcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH0gICAgICAgIFxuICAgICAgICB9XG4gICAgfSBjYXRjaChlcnIpIHtcbiAgICAgICAgZXJyb3IucHVzaCh7XG4gICAgICAgICAgICBlcnJvcjogZXJyLm1lc3NhZ2VcbiAgICAgICAgfSk7XG4gICAgfSAgIFxuXG4gICAgcmV0dXJuIHtcbiAgICAgICAgcmVjb3JkcyxcbiAgICAgICAgZXJyb3JcbiAgICB9O1xufTtcblxuLyoqXG4gKiBIYW5kbGUgZXZlbnQgV29ya2VyTm9kZUNyZWF0ZWRcbiAqIFxuICogQHBhcmFtIHtGdW5jdGlvbn0gc3RvcmVDYWxsYmFjayBcbiAqIEBwYXJhbSB7RnVuY3Rpb259IGVycm9yQ2FsbGJhY2tcbiAqIEBwYXJhbSB7T2JqZWN0fSBjb25maWcgTGlicmFyeSBjb25maWcgKHByb3ZpZGVkIGJ5IHRoZSBwcm94eSBidXQgY2FuIGJlIG92ZXJyaWRkZW4pXG4gKi9cbmV4cG9ydCBjb25zdCBldmVudFdvcmtlck5vZGVDcmVhdGVkID0gKHN0b3JlQ2FsbGJhY2sgPSAoKSA9PiB7fSwgZXJyb3JDYWxsYmFjayA9ICgpID0+IHt9LCBjb25maWcgPSB7fSkgPT4ge1xuICAgIFxuICAgIGlmICghY29uZmlnLndlYjMpIHtcbiAgICAgICAgdGhyb3cgcGpzRXJyb3IoV0VCM19SRVFVSVJFRCk7XG4gICAgfVxuXG4gICAgaWYgKCFjb25maWcuY29udHJhY3RzIHx8ICFjb25maWcuY29udHJhY3RzLlBhbmRvcmEgfHwgIWNvbmZpZy5jb250cmFjdHMuUGFuZG9yYS5hYmkpIHtcbiAgICAgICAgdGhyb3cgcGpzRXJyb3IoQ09OVFJBQ1RfUkVRVUlSRUQsICdQYW5kb3JhJyk7XG4gICAgfVxuXG4gICAgaWYgKCFjb25maWcuYWRkcmVzc2VzIHx8ICFjb25maWcuYWRkcmVzc2VzLnBhbmRvcmEpIHtcbiAgICAgICAgdGhyb3cgcGpzRXJyb3IoQUREUkVTU19SRVFVSVJFRCwgJ1BhbmRvcmEnKTtcbiAgICB9XG5cbiAgICBjb25zdCBwYW4gPSBuZXcgY29uZmlnLndlYjMuZXRoLkNvbnRyYWN0KGNvbmZpZy5jb250cmFjdHMuUGFuZG9yYS5hYmksIGNvbmZpZy5hZGRyZXNzZXMucGFuZG9yYSk7XG4gICAgcGFuLmV2ZW50cy5Xb3JrZXJOb2RlQ3JlYXRlZCh7XG4gICAgICAgIGZyb21CbG9jazogMFxuICAgIH0pXG4gICAgICAgIC5vbignZGF0YScsIGFzeW5jIHJlcyA9PiB7XG5cbiAgICAgICAgICAgIHRyeSB7XG5cbiAgICAgICAgICAgICAgICBjb25zdCB3b3JrZXIgPSBhd2FpdCBmZXRjaFdvcmtlcihyZXMuYXJncy53b3JrZXJOb2RlLCBjb25maWcpO1xuICAgICAgICAgICAgICAgIHN0b3JlQ2FsbGJhY2soe1xuICAgICAgICAgICAgICAgICAgICBhZGRyZXNzOiByZXMuYXJncy53b3JrZXJOb2RlLFxuICAgICAgICAgICAgICAgICAgICB3b3JrZXIsXG4gICAgICAgICAgICAgICAgICAgIHN0YXR1czogJ2NyZWF0ZWQnLFxuICAgICAgICAgICAgICAgICAgICBldmVudDogJ1BhbmRvcmEuV29ya2VyTm9kZUNyZWF0ZWQnXG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9IGNhdGNoKGVycikge1xuICAgICAgICAgICAgICAgIGVycm9yQ2FsbGJhY2soZXJyKTtcbiAgICAgICAgICAgIH0gICAgICAgICAgICBcbiAgICAgICAgfSlcbiAgICAgICAgLm9uKCdlcnJvcicsIGVycm9yQ2FsbGJhY2spO1xufTtcblxuLyoqXG4gKiBIYW5kbGUgZXZlbnQgU3RhdGVDaGFuZ2VkIGZvciBXb3JrZXJOb2RlXG4gKiBcbiAqIEBwYXJhbSB7c3RyaW5nfSBhZGRyZXNzXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBzdG9yZUNhbGxiYWNrIFxuICogQHBhcmFtIHtGdW5jdGlvbn0gZXJyb3JDYWxsYmFja1xuICogQHBhcmFtIHtPYmplY3R9IGNvbmZpZyBMaWJyYXJ5IGNvbmZpZyAocHJvdmlkZWQgYnkgdGhlIHByb3h5IGJ1dCBjYW4gYmUgb3ZlcnJpZGRlbilcbiAqIEByZXR1cm5zIHtQcm9taXNlfSBBIFByb21pc2Ugb2JqZWN0IHJlcHJlc2VudHMgdGhlIHtPYmplY3R9IFxuICovXG5leHBvcnQgY29uc3QgZXZlbnRXb3JrZXJOb2RlU3RhdGVDaGFuZ2VkID0gKGFkZHJlc3MsIHN0b3JlQ2FsbGJhY2sgPSAoKSA9PiB7fSwgZXJyb3JDYWxsYmFjayA9ICgpID0+IHt9LCBjb25maWcgPSB7fSkgPT4ge1xuXG4gICAgaWYgKCFjb25maWcud2ViMykge1xuICAgICAgICB0aHJvdyBwanNFcnJvcihXRUIzX1JFUVVJUkVEKTtcbiAgICB9XG5cbiAgICBpZiAoIWNvbmZpZy5jb250cmFjdHMgfHwgIWNvbmZpZy5jb250cmFjdHMuV29ya2VyTm9kZSB8fCAhY29uZmlnLmNvbnRyYWN0cy5Xb3JrZXJOb2RlLmFiaSkge1xuICAgICAgICB0aHJvdyBwanNFcnJvcihDT05UUkFDVF9SRVFVSVJFRCwgJ1dvcmtlck5vZGUnKTtcbiAgICB9XG5cbiAgICBjb25zdCB3b3IgPSBuZXcgY29uZmlnLndlYjMuZXRoLkNvbnRyYWN0KGNvbmZpZy5jb250cmFjdHMuV29ya2VyTm9kZS5hYmksIGFkZHJlc3MpO1xuICAgIHdvci5ldmVudHMuU3RhdGVDaGFuZ2VkKHtcbiAgICAgICAgZnJvbUJsb2NrOiAwXG4gICAgfSlcbiAgICAgICAgLm9uKCdkYXRhJywgYXN5bmMgcmVzID0+IHtcblxuICAgICAgICAgICAgdHJ5IHtcblxuICAgICAgICAgICAgICAgIGNvbnN0IHdvcmtlciA9IGF3YWl0IGZldGNoV29ya2VyKHJlcy5hcmdzLndvcmtlck5vZGUsIGNvbmZpZyk7XG4gICAgICAgICAgICAgICAgc3RvcmVDYWxsYmFjayh7XG4gICAgICAgICAgICAgICAgICAgIGFkZHJlc3M6IHJlcy5hcmdzLndvcmtlck5vZGUsXG4gICAgICAgICAgICAgICAgICAgIHdvcmtlcixcbiAgICAgICAgICAgICAgICAgICAgc3RhdHVzOiAnY2hhbmdlZCcsXG4gICAgICAgICAgICAgICAgICAgIGV2ZW50OiAnV29ya2VyTm9kZS5TdGF0ZUNoYW5nZWQnXG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9IGNhdGNoKGVycikge1xuICAgICAgICAgICAgICAgIGVycm9yQ2FsbGJhY2soZXJyKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSlcbiAgICAgICAgLm9uKCdlcnJvcicsIGVycm9yQ2FsbGJhY2spO1xufTtcbiJdfQ==