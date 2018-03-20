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
var fetchCount = async function fetchCount() {
  var config = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

  if (!config.web3) {
    throw (0, _errors.default)(_errors.WEB3_REQUIRED);
  }

  if (!config.contracts || !config.contracts.Pandora || !config.contracts.Pandora.abi) {
    throw (0, _errors.default)(_errors.CONTRACT_REQUIRED, 'Pandora');
  }

  if (!config.addresses || !config.addresses.pandora) {
    throw (0, _errors.default)(_errors.ADDRESS_REQUIRED, 'Pandora');
  }

  var pan = new config.web3.eth.Contract(config.contracts.Pandora.abi, config.addresses.pandora);
  var count = await pan.methods.workerNodesCount().call();
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

var fetchAddressById = async function fetchAddressById(id) {
  var config = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

  if (!config.web3) {
    throw (0, _errors.default)(_errors.WEB3_REQUIRED);
  }

  if (!config.contracts || !config.contracts.Pandora || !config.contracts.Pandora.abi) {
    throw (0, _errors.default)(_errors.CONTRACT_REQUIRED, 'Pandora');
  }

  if (!config.addresses || !config.addresses.pandora) {
    throw (0, _errors.default)(_errors.ADDRESS_REQUIRED, 'Pandora');
  }

  var pan = new config.web3.eth.Contract(config.contracts.Pandora.abi, config.addresses.pandora);
  var address = await pan.methods.workerNodes(id).call();
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

var fetchState = async function fetchState(address) {
  var config = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

  if (!config.web3) {
    throw (0, _errors.default)(_errors.WEB3_REQUIRED);
  }

  if (!config.contracts || !config.contracts.WorkerNode || !config.contracts.WorkerNode.abi) {
    throw (0, _errors.default)(_errors.CONTRACT_REQUIRED, 'WorkerNode');
  }

  var wor = new config.web3.eth.Contract(config.contracts.WorkerNode.abi, address);
  var state = await wor.methods.currentState().call();
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

var fetchReputation = async function fetchReputation(address) {
  var config = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

  if (!config.web3) {
    throw (0, _errors.default)(_errors.WEB3_REQUIRED);
  }

  if (!config.contracts || !config.contracts.WorkerNode || !config.contracts.WorkerNode.abi) {
    throw (0, _errors.default)(_errors.CONTRACT_REQUIRED, 'WorkerNode');
  }

  var wor = new config.web3.eth.Contract(config.contracts.WorkerNode.abi, address);
  var reputation = await wor.methods.reputation().call();
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

var fetchActiveJobAddress = async function fetchActiveJobAddress(address) {
  var config = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

  if (!config.web3) {
    throw (0, _errors.default)(_errors.WEB3_REQUIRED);
  }

  if (!config.contracts || !config.contracts.WorkerNode || !config.contracts.WorkerNode.abi) {
    throw (0, _errors.default)(_errors.CONTRACT_REQUIRED, 'WorkerNode');
  }

  var wor = new config.web3.eth.Contract(config.contracts.WorkerNode.abi, address);
  var activeJob = await wor.methods.activeJob().call();
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

var fetchWorker = async function fetchWorker(address) {
  var config = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

  try {
    var currentState = await fetchState(address, config);
    var reputation = await fetchReputation(address, config);
    var activeJob = await fetchActiveJobAddress(address, config);
    var jobState; // Check is not 0x0

    if (+activeJob !== 0) {
      jobState = await (0, _jobs.fetchState)(activeJob, config);
    } else {
      activeJob = null;
      jobState = -1;
    }

    return {
      address: address,
      currentState: currentState,
      reputation: reputation,
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

var fetchWorkerById = async function fetchWorkerById(id) {
  var config = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

  try {
    var address = await fetchAddressById(id, config);
    var worker = await fetchWorker(address, config);
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

var fetchAll = async function fetchAll() {
  var config = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  var records = [];
  var error = [];

  try {
    var count = await fetchCount(config);

    for (var i = 0; i < count; i++) {
      try {
        var worker = await fetchWorkerById(i, config);
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
    records: records,
    error: error
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

var eventWorkerNodeCreated = function eventWorkerNodeCreated() {
  var storeCallback = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : function () {};
  var errorCallback = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : function () {};
  var config = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};

  if (!config.web3) {
    throw (0, _errors.default)(_errors.WEB3_REQUIRED);
  }

  if (!config.contracts || !config.contracts.Pandora || !config.contracts.Pandora.abi) {
    throw (0, _errors.default)(_errors.CONTRACT_REQUIRED, 'Pandora');
  }

  if (!config.addresses || !config.addresses.pandora) {
    throw (0, _errors.default)(_errors.ADDRESS_REQUIRED, 'Pandora');
  }

  var pan = new config.web3.eth.Contract(config.contracts.Pandora.abi, config.addresses.pandora);
  pan.events.WorkerNodeCreated({
    fromBlock: 0
  }).on('data', async function (res) {
    try {
      var worker = await fetchWorker(res.args.workerNode, config);
      storeCallback({
        address: res.args.workerNode,
        worker: worker,
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

var eventWorkerNodeStateChanged = function eventWorkerNodeStateChanged(address) {
  var storeCallback = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : function () {};
  var errorCallback = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : function () {};
  var config = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : {};

  if (!config.web3) {
    throw (0, _errors.default)(_errors.WEB3_REQUIRED);
  }

  if (!config.contracts || !config.contracts.WorkerNode || !config.contracts.WorkerNode.abi) {
    throw (0, _errors.default)(_errors.CONTRACT_REQUIRED, 'WorkerNode');
  }

  var wor = new config.web3.eth.Contract(config.contracts.WorkerNode.abi, address);
  wor.events.StateChanged({
    fromBlock: 0
  }).on('data', async function (res) {
    try {
      var worker = await fetchWorker(res.args.workerNode, config);
      storeCallback({
        address: res.args.workerNode,
        worker: worker,
        status: 'changed',
        event: 'WorkerNode.StateChanged'
      });
    } catch (err) {
      errorCallback(err);
    }
  }).on('error', errorCallback);
};

exports.eventWorkerNodeStateChanged = eventWorkerNodeStateChanged;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy93b3JrZXJzLmpzIl0sIm5hbWVzIjpbImZldGNoQ291bnQiLCJjb25maWciLCJ3ZWIzIiwiV0VCM19SRVFVSVJFRCIsImNvbnRyYWN0cyIsIlBhbmRvcmEiLCJhYmkiLCJDT05UUkFDVF9SRVFVSVJFRCIsImFkZHJlc3NlcyIsInBhbmRvcmEiLCJBRERSRVNTX1JFUVVJUkVEIiwicGFuIiwiZXRoIiwiQ29udHJhY3QiLCJjb3VudCIsIm1ldGhvZHMiLCJ3b3JrZXJOb2Rlc0NvdW50IiwiY2FsbCIsIk51bWJlciIsInBhcnNlSW50IiwiZmV0Y2hBZGRyZXNzQnlJZCIsImlkIiwiYWRkcmVzcyIsIndvcmtlck5vZGVzIiwiU3RyaW5nIiwiZmV0Y2hTdGF0ZSIsIldvcmtlck5vZGUiLCJ3b3IiLCJzdGF0ZSIsImN1cnJlbnRTdGF0ZSIsImZldGNoUmVwdXRhdGlvbiIsInJlcHV0YXRpb24iLCJmZXRjaEFjdGl2ZUpvYkFkZHJlc3MiLCJhY3RpdmVKb2IiLCJmZXRjaFdvcmtlciIsImpvYlN0YXRlIiwiY3VycmVudEpvYiIsImN1cnJlbnRKb2JTdGF0dXMiLCJlcnIiLCJQcm9taXNlIiwicmVqZWN0IiwiZmV0Y2hXb3JrZXJCeUlkIiwid29ya2VyIiwiZmV0Y2hBbGwiLCJyZWNvcmRzIiwiZXJyb3IiLCJpIiwicHVzaCIsIm1lc3NhZ2UiLCJldmVudFdvcmtlck5vZGVDcmVhdGVkIiwic3RvcmVDYWxsYmFjayIsImVycm9yQ2FsbGJhY2siLCJldmVudHMiLCJXb3JrZXJOb2RlQ3JlYXRlZCIsImZyb21CbG9jayIsIm9uIiwicmVzIiwiYXJncyIsIndvcmtlck5vZGUiLCJzdGF0dXMiLCJldmVudCIsImV2ZW50V29ya2VyTm9kZVN0YXRlQ2hhbmdlZCIsIlN0YXRlQ2hhbmdlZCJdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7Ozs7O0FBU0E7Ozs7Ozs7QUFFQTs7QUFNQTs7Ozs7Ozs7QUFFQTs7Ozs7O0FBTU8sSUFBTUEsYUFBYSxlQUFiQSxVQUFhLEdBQXVC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LEVBSEwsQ0FHUSxNQUhSLEVBR2dCLGdCQUFNQyxHQUFOLEVBQWE7QUFFckIsUUFBSTtBQUVBLFVBQU1kLFNBQVMsTUFBTVIsWUFBWXNCLElBQUlDLElBQUosQ0FBU0MsVUFBckIsRUFBaUN6RCxNQUFqQyxDQUFyQjtBQUNBaUQsb0JBQWM7QUFDVjVCLGlCQUFTa0MsSUFBSUMsSUFBSixDQUFTQyxVQURSO0FBRVZoQixzQkFGVTtBQUdWaUIsZ0JBQVEsU0FIRTtBQUlWQyxlQUFPO0FBSkcsT0FBZDtBQU1ILEtBVEQsQ0FTRSxPQUFNdEIsR0FBTixFQUFXO0FBQ1RhLG9CQUFjYixHQUFkO0FBQ0g7QUFDSixHQWpCTCxFQWtCS2lCLEVBbEJMLENBa0JRLE9BbEJSLEVBa0JpQkosYUFsQmpCO0FBbUJILENBOUJNIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBXb3JrZXJOb2RlcyByZWxhdGVkIG1ldGhvZHNcbiAqIFRoaXMgZmlsZSBpdCBpcyBhIHBhcnQgb2YgdGhlIFBhbmRvcmEgUHlycmhhIEphdmFzY3JpcHQgbGlicmFyeVxuICogXG4gKiBAZmlsZSB3b3JrZXJzLmpzXG4gKiBAYXV0aG9yIEtvc3RpYW50eW4gU215cm5vdiA8a29zdHlzaEBnbWFpbC5jb20+XG4gKiBAZGF0ZSAyMDE4XG4gKi9cblxuJ3VzZSBzdHJpY3QnO1xuXG5pbXBvcnQgcGpzRXJyb3IsIHtcbiAgICBDT05UUkFDVF9SRVFVSVJFRCxcbiAgICBBRERSRVNTX1JFUVVJUkVELFxuICAgIFdFQjNfUkVRVUlSRURcbn0gZnJvbSAnLi9oZWxwZXJzL2Vycm9ycyc7XG5cbmltcG9ydCB7IGZldGNoU3RhdGUgYXMgZmV0Y2hKb2JTdGF0ZSB9IGZyb20gJy4vam9icyc7XG5cbi8qKlxuICogR2V0IHdvcmtlciBub2RlcyBjb3VudCBmcm9tIFBhbmRvcmEgY29udHJhY3RcbiAqIFxuICogQHBhcmFtIHtPYmplY3R9IGNvbmZpZyBMaWJyYXJ5IGNvbmZpZyAocHJvdmlkZWQgYnkgdGhlIHByb3h5IGJ1dCBjYW4gYmUgb3ZlcnJpZGRlbilcbiAqIEByZXR1cm5zIHtQcm9taXNlfSBBIFByb21pc2Ugb2JqZWN0IHJlcHJlc2VudHMgdGhlIHtudW1iZXJ9IFxuICovXG5leHBvcnQgY29uc3QgZmV0Y2hDb3VudCA9IGFzeW5jIChjb25maWcgPSB7fSkgPT4ge1xuXG4gICAgaWYgKCFjb25maWcud2ViMykge1xuICAgICAgICB0aHJvdyBwanNFcnJvcihXRUIzX1JFUVVJUkVEKTtcbiAgICB9XG4gICAgXG4gICAgaWYgKCFjb25maWcuY29udHJhY3RzIHx8ICFjb25maWcuY29udHJhY3RzLlBhbmRvcmEgfHwgIWNvbmZpZy5jb250cmFjdHMuUGFuZG9yYS5hYmkpIHtcbiAgICAgICAgdGhyb3cgcGpzRXJyb3IoQ09OVFJBQ1RfUkVRVUlSRUQsICdQYW5kb3JhJyk7XG4gICAgfVxuXG4gICAgaWYgKCFjb25maWcuYWRkcmVzc2VzIHx8ICFjb25maWcuYWRkcmVzc2VzLnBhbmRvcmEpIHtcbiAgICAgICAgdGhyb3cgcGpzRXJyb3IoQUREUkVTU19SRVFVSVJFRCwgJ1BhbmRvcmEnKTtcbiAgICB9XG5cbiAgICBjb25zdCBwYW4gPSBuZXcgY29uZmlnLndlYjMuZXRoLkNvbnRyYWN0KGNvbmZpZy5jb250cmFjdHMuUGFuZG9yYS5hYmksIGNvbmZpZy5hZGRyZXNzZXMucGFuZG9yYSk7XG4gICAgY29uc3QgY291bnQgPSBhd2FpdCBwYW4ubWV0aG9kc1xuICAgICAgICAud29ya2VyTm9kZXNDb3VudCgpXG4gICAgICAgIC5jYWxsKCk7XG4gICAgcmV0dXJuIE51bWJlci5wYXJzZUludChjb3VudCwgMTApO1xufTtcblxuLyoqXG4gKiBHZXQgd29ya2VyIGFkZHJlc3MgZnJvbSBQYW5kb3JhIGNvbnRyYWN0IGJ5IHRoZSB3b3JrZXIgSWRcbiAqIFxuICogQHBhcmFtIHtpbnRlZ2VyfSBpZCBXb3JrZXIgSWRcbiAqIEBwYXJhbSB7T2JqZWN0fSBjb25maWcgTGlicmFyeSBjb25maWcgKHByb3ZpZGVkIGJ5IHRoZSBwcm94eSBidXQgY2FuIGJlIG92ZXJyaWRkZW4pXG4gKiBAcmV0dXJucyB7UHJvbWlzZX0gQSBQcm9taXNlIG9iamVjdCByZXByZXNlbnRzIHRoZSB7c3RyaW5nfSBcbiAqL1xuZXhwb3J0IGNvbnN0IGZldGNoQWRkcmVzc0J5SWQgPSBhc3luYyAoaWQsIGNvbmZpZyA9IHt9KSA9PiB7XG5cbiAgICBpZiAoIWNvbmZpZy53ZWIzKSB7XG4gICAgICAgIHRocm93IHBqc0Vycm9yKFdFQjNfUkVRVUlSRUQpO1xuICAgIH1cblxuICAgIGlmICghY29uZmlnLmNvbnRyYWN0cyB8fCAhY29uZmlnLmNvbnRyYWN0cy5QYW5kb3JhIHx8ICFjb25maWcuY29udHJhY3RzLlBhbmRvcmEuYWJpKSB7XG4gICAgICAgIHRocm93IHBqc0Vycm9yKENPTlRSQUNUX1JFUVVJUkVELCAnUGFuZG9yYScpO1xuICAgIH1cblxuICAgIGlmICghY29uZmlnLmFkZHJlc3NlcyB8fCAhY29uZmlnLmFkZHJlc3Nlcy5wYW5kb3JhKSB7XG4gICAgICAgIHRocm93IHBqc0Vycm9yKEFERFJFU1NfUkVRVUlSRUQsICdQYW5kb3JhJyk7XG4gICAgfVxuXG4gICAgY29uc3QgcGFuID0gbmV3IGNvbmZpZy53ZWIzLmV0aC5Db250cmFjdChjb25maWcuY29udHJhY3RzLlBhbmRvcmEuYWJpLCBjb25maWcuYWRkcmVzc2VzLnBhbmRvcmEpO1xuICAgIGNvbnN0IGFkZHJlc3MgPSBhd2FpdCBwYW4ubWV0aG9kc1xuICAgICAgICAud29ya2VyTm9kZXMoaWQpXG4gICAgICAgIC5jYWxsKCk7XG4gICAgcmV0dXJuIFN0cmluZyhhZGRyZXNzKTtcbn07XG5cbi8qKlxuICogR2V0IHdvcmtlciBzdGF0ZSBmcm9tIFdvcmtlciBjb250cmFjdCBieSB0aGUgd29ya2VyIGFkZHJlc3NcbiAqIFxuICogQHBhcmFtIHtzdHJpbmd9IGFkZHJlc3MgXG4gKiBAcGFyYW0ge09iamVjdH0gY29uZmlnIExpYnJhcnkgY29uZmlnIChwcm92aWRlZCBieSB0aGUgcHJveHkgYnV0IGNhbiBiZSBvdmVycmlkZGVuKVxuICogQHJldHVybnMge1Byb21pc2V9IEEgUHJvbWlzZSBvYmplY3QgcmVwcmVzZW50cyB0aGUge251bWJlcn1cbiAqL1xuZXhwb3J0IGNvbnN0IGZldGNoU3RhdGUgPSBhc3luYyAoYWRkcmVzcywgY29uZmlnID0ge30pID0+IHtcblxuICAgIGlmICghY29uZmlnLndlYjMpIHtcbiAgICAgICAgdGhyb3cgcGpzRXJyb3IoV0VCM19SRVFVSVJFRCk7XG4gICAgfVxuXG4gICAgaWYgKCFjb25maWcuY29udHJhY3RzIHx8ICFjb25maWcuY29udHJhY3RzLldvcmtlck5vZGUgfHwgIWNvbmZpZy5jb250cmFjdHMuV29ya2VyTm9kZS5hYmkpIHtcbiAgICAgICAgdGhyb3cgcGpzRXJyb3IoQ09OVFJBQ1RfUkVRVUlSRUQsICdXb3JrZXJOb2RlJyk7XG4gICAgfVxuXG4gICAgY29uc3Qgd29yID0gbmV3IGNvbmZpZy53ZWIzLmV0aC5Db250cmFjdChjb25maWcuY29udHJhY3RzLldvcmtlck5vZGUuYWJpLCBhZGRyZXNzKTsgICAgXG4gICAgY29uc3Qgc3RhdGUgPSBhd2FpdCB3b3IubWV0aG9kc1xuICAgICAgICAuY3VycmVudFN0YXRlKClcbiAgICAgICAgLmNhbGwoKTtcbiAgICByZXR1cm4gTnVtYmVyLnBhcnNlSW50KHN0YXRlLCAxMCk7XG59O1xuXG4vKipcbiAqIEdldCB3b3JrZXIgcmVwdXRhdGlvbiBmcm9tIFdvcmtlciBjb250cmFjdCBieSB0aGUgd29ya2VyIGFkZHJlc3NcbiAqIFxuICogQHBhcmFtIHtzdHJpbmd9IGFkZHJlc3MgXG4gKiBAcGFyYW0ge09iamVjdH0gY29uZmlnIExpYnJhcnkgY29uZmlnIChwcm92aWRlZCBieSB0aGUgcHJveHkgYnV0IGNhbiBiZSBvdmVycmlkZGVuKVxuICogQHJldHVybnMge1Byb21pc2V9IEEgUHJvbWlzZSBvYmplY3QgcmVwcmVzZW50cyB0aGUge251bWJlcn1cbiAqL1xuZXhwb3J0IGNvbnN0IGZldGNoUmVwdXRhdGlvbiA9IGFzeW5jIChhZGRyZXNzLCBjb25maWcgPSB7fSkgPT4ge1xuXG4gICAgaWYgKCFjb25maWcud2ViMykge1xuICAgICAgICB0aHJvdyBwanNFcnJvcihXRUIzX1JFUVVJUkVEKTtcbiAgICB9XG5cbiAgICBpZiAoIWNvbmZpZy5jb250cmFjdHMgfHwgIWNvbmZpZy5jb250cmFjdHMuV29ya2VyTm9kZSB8fCAhY29uZmlnLmNvbnRyYWN0cy5Xb3JrZXJOb2RlLmFiaSkge1xuICAgICAgICB0aHJvdyBwanNFcnJvcihDT05UUkFDVF9SRVFVSVJFRCwgJ1dvcmtlck5vZGUnKTtcbiAgICB9XG5cbiAgICBjb25zdCB3b3IgPSBuZXcgY29uZmlnLndlYjMuZXRoLkNvbnRyYWN0KGNvbmZpZy5jb250cmFjdHMuV29ya2VyTm9kZS5hYmksIGFkZHJlc3MpO1xuICAgIGNvbnN0IHJlcHV0YXRpb24gPSBhd2FpdCB3b3IubWV0aG9kc1xuICAgICAgICAucmVwdXRhdGlvbigpXG4gICAgICAgIC5jYWxsKCk7XG4gICAgcmV0dXJuIE51bWJlci5wYXJzZUludChyZXB1dGF0aW9uLCAxMCk7XG59O1xuXG4vKipcbiAqIEdldCB3b3JrZXIncyBhY3RpdmUgam9iIGZyb20gV29ya2VyIGNvbnRyYWN0IGJ5IHRoZSB3b3JrZXIgYWRkcmVzc1xuICogXG4gKiBAcGFyYW0ge3N0cmluZ30gYWRkcmVzcyBcbiAqIEBwYXJhbSB7T2JqZWN0fSBjb25maWcgTGlicmFyeSBjb25maWcgKHByb3ZpZGVkIGJ5IHRoZSBwcm94eSBidXQgY2FuIGJlIG92ZXJyaWRkZW4pXG4gKiBAcmV0dXJucyB7UHJvbWlzZX0gQSBQcm9taXNlIG9iamVjdCByZXByZXNlbnRzIHRoZSB7c3RyaW5nfVxuICovXG5leHBvcnQgY29uc3QgZmV0Y2hBY3RpdmVKb2JBZGRyZXNzID0gYXN5bmMgKGFkZHJlc3MsIGNvbmZpZyA9IHt9KSA9PiB7XG5cbiAgICBpZiAoIWNvbmZpZy53ZWIzKSB7XG4gICAgICAgIHRocm93IHBqc0Vycm9yKFdFQjNfUkVRVUlSRUQpO1xuICAgIH1cbiAgICBcbiAgICBpZiAoIWNvbmZpZy5jb250cmFjdHMgfHwgIWNvbmZpZy5jb250cmFjdHMuV29ya2VyTm9kZSB8fCAhY29uZmlnLmNvbnRyYWN0cy5Xb3JrZXJOb2RlLmFiaSkge1xuICAgICAgICB0aHJvdyBwanNFcnJvcihDT05UUkFDVF9SRVFVSVJFRCwgJ1dvcmtlck5vZGUnKTtcbiAgICB9XG5cbiAgICBjb25zdCB3b3IgPSBuZXcgY29uZmlnLndlYjMuZXRoLkNvbnRyYWN0KGNvbmZpZy5jb250cmFjdHMuV29ya2VyTm9kZS5hYmksIGFkZHJlc3MpO1xuICAgIGNvbnN0IGFjdGl2ZUpvYiA9IGF3YWl0IHdvci5tZXRob2RzXG4gICAgICAgIC5hY3RpdmVKb2IoKVxuICAgICAgICAuY2FsbCgpO1xuICAgIHJldHVybiBTdHJpbmcoYWN0aXZlSm9iLCAxMCk7XG59O1xuXG4vKipcbiAqIEdldCB3b3JrZXIgYnkgdGhlIHdvcmtlcidzIGFkZHJlc3NcbiAqIFxuICogQHBhcmFtIHtzdHJpbmd9IGFkZHJlc3NcbiAqIEBwYXJhbSB7T2JqZWN0fSBjb25maWcgTGlicmFyeSBjb25maWcgKHByb3ZpZGVkIGJ5IHRoZSBwcm94eSBidXQgY2FuIGJlIG92ZXJyaWRkZW4pXG4gKiBAcmV0dXJucyB7UHJvbWlzZX0gQSBQcm9taXNlIG9iamVjdCByZXByZXNlbnRzIHRoZSB7T2JqZWN0fVxuICovXG5leHBvcnQgY29uc3QgZmV0Y2hXb3JrZXIgPSBhc3luYyAoYWRkcmVzcywgY29uZmlnID0ge30pID0+IHtcbiAgICBcbiAgICB0cnkge1xuXG4gICAgICAgIGNvbnN0IGN1cnJlbnRTdGF0ZSA9IGF3YWl0IGZldGNoU3RhdGUoYWRkcmVzcywgY29uZmlnKTtcbiAgICAgICAgY29uc3QgcmVwdXRhdGlvbiA9IGF3YWl0IGZldGNoUmVwdXRhdGlvbihhZGRyZXNzLCBjb25maWcpO1xuXG4gICAgICAgIGxldCBhY3RpdmVKb2IgPSBhd2FpdCBmZXRjaEFjdGl2ZUpvYkFkZHJlc3MoYWRkcmVzcywgY29uZmlnKTtcbiAgICAgICAgbGV0IGpvYlN0YXRlO1xuXG4gICAgICAgIC8vIENoZWNrIGlzIG5vdCAweDBcbiAgICAgICAgaWYgKCthY3RpdmVKb2IgIT09IDApIHtcblxuICAgICAgICAgICAgam9iU3RhdGUgPSBhd2FpdCBmZXRjaEpvYlN0YXRlKGFjdGl2ZUpvYiwgY29uZmlnKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGFjdGl2ZUpvYiA9IG51bGw7XG4gICAgICAgICAgICBqb2JTdGF0ZSA9IC0xO1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgIGFkZHJlc3MsXG4gICAgICAgICAgICBjdXJyZW50U3RhdGUsXG4gICAgICAgICAgICByZXB1dGF0aW9uLFxuICAgICAgICAgICAgY3VycmVudEpvYjogYWN0aXZlSm9iLFxuICAgICAgICAgICAgY3VycmVudEpvYlN0YXR1czogam9iU3RhdGVcbiAgICAgICAgfTtcbiAgICB9IGNhdGNoKGVycikge1xuICAgICAgICByZXR1cm4gUHJvbWlzZS5yZWplY3QoZXJyKTtcbiAgICB9XG59O1xuXG4vKipcbiAqIEdldCB3b3JrZXIgYnkgdGhlIHdvcmtlcidzIGlkXG4gKiBcbiAqIEBwYXJhbSB7aW50ZWdlcn0gaWQgXG4gKiBAcGFyYW0ge09iamVjdH0gY29uZmlnIExpYnJhcnkgY29uZmlnIChwcm92aWRlZCBieSB0aGUgcHJveHkgYnV0IGNhbiBiZSBvdmVycmlkZGVuKVxuICogQHJldHVybnMge1Byb21pc2V9IEEgUHJvbWlzZSBvYmplY3QgcmVwcmVzZW50cyB0aGUge09iamVjdH1cbiAqL1xuZXhwb3J0IGNvbnN0IGZldGNoV29ya2VyQnlJZCA9IGFzeW5jIChpZCwgY29uZmlnID0ge30pID0+IHtcbiAgICBcbiAgICB0cnkge1xuXG4gICAgICAgIGNvbnN0IGFkZHJlc3MgPSBhd2FpdCBmZXRjaEFkZHJlc3NCeUlkKGlkLCBjb25maWcpO1xuICAgICAgICBjb25zdCB3b3JrZXIgPSBhd2FpdCBmZXRjaFdvcmtlcihhZGRyZXNzLCBjb25maWcpO1xuXG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICBpZDogaWQsXG4gICAgICAgICAgICAuLi53b3JrZXJcbiAgICAgICAgfTtcbiAgICB9IGNhdGNoKGVycikge1xuICAgICAgICByZXR1cm4gUHJvbWlzZS5yZWplY3QoZXJyKTtcbiAgICB9XG59O1xuXG4vKipcbiAqIEdldCBhbGwgd29ya2Vyc1xuICogXG4gKiBAcGFyYW0ge09iamVjdH0gY29uZmlnIExpYnJhcnkgY29uZmlnIChwcm92aWRlZCBieSB0aGUgcHJveHkgYnV0IGNhbiBiZSBvdmVycmlkZGVuKVxuICogQHJldHVybnMge1Byb21pc2V9IEEgUHJvbWlzZSBvYmplY3QgcmVwcmVzZW50cyB0aGUge251bWJlcn1cbiAqL1xuZXhwb3J0IGNvbnN0IGZldGNoQWxsID0gYXN5bmMgKGNvbmZpZyA9IHt9KSA9PiB7XG4gICAgbGV0IHJlY29yZHMgPSBbXTtcbiAgICBsZXQgZXJyb3IgPSBbXTtcblxuICAgIHRyeSB7XG5cbiAgICAgICAgY29uc3QgY291bnQgPSBhd2FpdCBmZXRjaENvdW50KGNvbmZpZyk7ICAgIFxuXG4gICAgICAgIGZvciAobGV0IGk9MDsgaSA8IGNvdW50OyBpKyspIHtcbiAgICAgICAgICAgIFxuICAgICAgICAgICAgdHJ5IHtcblxuICAgICAgICAgICAgICAgIGNvbnN0IHdvcmtlciA9IGF3YWl0IGZldGNoV29ya2VyQnlJZChpLCBjb25maWcpO1xuXG4gICAgICAgICAgICAgICAgcmVjb3Jkcy5wdXNoKHtcbiAgICAgICAgICAgICAgICAgICAgaWQ6IGksXG4gICAgICAgICAgICAgICAgICAgIC4uLndvcmtlclxuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfSBjYXRjaChlcnIpIHtcbiAgICAgICAgICAgICAgICBlcnJvci5wdXNoKHtcbiAgICAgICAgICAgICAgICAgICAgaWQ6IGksXG4gICAgICAgICAgICAgICAgICAgIG1lc3NhZ2U6IGVyci5tZXNzYWdlXG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9ICAgICAgICBcbiAgICAgICAgfVxuICAgIH0gY2F0Y2goZXJyKSB7XG4gICAgICAgIGVycm9yLnB1c2goe1xuICAgICAgICAgICAgZXJyb3I6IGVyci5tZXNzYWdlXG4gICAgICAgIH0pO1xuICAgIH0gICBcblxuICAgIHJldHVybiB7XG4gICAgICAgIHJlY29yZHMsXG4gICAgICAgIGVycm9yXG4gICAgfTtcbn07XG5cbi8qKlxuICogSGFuZGxlIGV2ZW50IFdvcmtlck5vZGVDcmVhdGVkXG4gKiBcbiAqIEBwYXJhbSB7RnVuY3Rpb259IHN0b3JlQ2FsbGJhY2sgXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBlcnJvckNhbGxiYWNrXG4gKiBAcGFyYW0ge09iamVjdH0gY29uZmlnIExpYnJhcnkgY29uZmlnIChwcm92aWRlZCBieSB0aGUgcHJveHkgYnV0IGNhbiBiZSBvdmVycmlkZGVuKVxuICovXG5leHBvcnQgY29uc3QgZXZlbnRXb3JrZXJOb2RlQ3JlYXRlZCA9IChzdG9yZUNhbGxiYWNrID0gKCkgPT4ge30sIGVycm9yQ2FsbGJhY2sgPSAoKSA9PiB7fSwgY29uZmlnID0ge30pID0+IHtcbiAgICBcbiAgICBpZiAoIWNvbmZpZy53ZWIzKSB7XG4gICAgICAgIHRocm93IHBqc0Vycm9yKFdFQjNfUkVRVUlSRUQpO1xuICAgIH1cblxuICAgIGlmICghY29uZmlnLmNvbnRyYWN0cyB8fCAhY29uZmlnLmNvbnRyYWN0cy5QYW5kb3JhIHx8ICFjb25maWcuY29udHJhY3RzLlBhbmRvcmEuYWJpKSB7XG4gICAgICAgIHRocm93IHBqc0Vycm9yKENPTlRSQUNUX1JFUVVJUkVELCAnUGFuZG9yYScpO1xuICAgIH1cblxuICAgIGlmICghY29uZmlnLmFkZHJlc3NlcyB8fCAhY29uZmlnLmFkZHJlc3Nlcy5wYW5kb3JhKSB7XG4gICAgICAgIHRocm93IHBqc0Vycm9yKEFERFJFU1NfUkVRVUlSRUQsICdQYW5kb3JhJyk7XG4gICAgfVxuXG4gICAgY29uc3QgcGFuID0gbmV3IGNvbmZpZy53ZWIzLmV0aC5Db250cmFjdChjb25maWcuY29udHJhY3RzLlBhbmRvcmEuYWJpLCBjb25maWcuYWRkcmVzc2VzLnBhbmRvcmEpO1xuICAgIHBhbi5ldmVudHMuV29ya2VyTm9kZUNyZWF0ZWQoe1xuICAgICAgICBmcm9tQmxvY2s6IDBcbiAgICB9KVxuICAgICAgICAub24oJ2RhdGEnLCBhc3luYyByZXMgPT4ge1xuXG4gICAgICAgICAgICB0cnkge1xuXG4gICAgICAgICAgICAgICAgY29uc3Qgd29ya2VyID0gYXdhaXQgZmV0Y2hXb3JrZXIocmVzLmFyZ3Mud29ya2VyTm9kZSwgY29uZmlnKTtcbiAgICAgICAgICAgICAgICBzdG9yZUNhbGxiYWNrKHtcbiAgICAgICAgICAgICAgICAgICAgYWRkcmVzczogcmVzLmFyZ3Mud29ya2VyTm9kZSxcbiAgICAgICAgICAgICAgICAgICAgd29ya2VyLFxuICAgICAgICAgICAgICAgICAgICBzdGF0dXM6ICdjcmVhdGVkJyxcbiAgICAgICAgICAgICAgICAgICAgZXZlbnQ6ICdQYW5kb3JhLldvcmtlck5vZGVDcmVhdGVkJ1xuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfSBjYXRjaChlcnIpIHtcbiAgICAgICAgICAgICAgICBlcnJvckNhbGxiYWNrKGVycik7XG4gICAgICAgICAgICB9ICAgICAgICAgICAgXG4gICAgICAgIH0pXG4gICAgICAgIC5vbignZXJyb3InLCBlcnJvckNhbGxiYWNrKTtcbn07XG5cbi8qKlxuICogSGFuZGxlIGV2ZW50IFN0YXRlQ2hhbmdlZCBmb3IgV29ya2VyTm9kZVxuICogXG4gKiBAcGFyYW0ge3N0cmluZ30gYWRkcmVzc1xuICogQHBhcmFtIHtGdW5jdGlvbn0gc3RvcmVDYWxsYmFjayBcbiAqIEBwYXJhbSB7RnVuY3Rpb259IGVycm9yQ2FsbGJhY2tcbiAqIEBwYXJhbSB7T2JqZWN0fSBjb25maWcgTGlicmFyeSBjb25maWcgKHByb3ZpZGVkIGJ5IHRoZSBwcm94eSBidXQgY2FuIGJlIG92ZXJyaWRkZW4pXG4gKiBAcmV0dXJucyB7UHJvbWlzZX0gQSBQcm9taXNlIG9iamVjdCByZXByZXNlbnRzIHRoZSB7T2JqZWN0fSBcbiAqL1xuZXhwb3J0IGNvbnN0IGV2ZW50V29ya2VyTm9kZVN0YXRlQ2hhbmdlZCA9IChhZGRyZXNzLCBzdG9yZUNhbGxiYWNrID0gKCkgPT4ge30sIGVycm9yQ2FsbGJhY2sgPSAoKSA9PiB7fSwgY29uZmlnID0ge30pID0+IHtcblxuICAgIGlmICghY29uZmlnLndlYjMpIHtcbiAgICAgICAgdGhyb3cgcGpzRXJyb3IoV0VCM19SRVFVSVJFRCk7XG4gICAgfVxuXG4gICAgaWYgKCFjb25maWcuY29udHJhY3RzIHx8ICFjb25maWcuY29udHJhY3RzLldvcmtlck5vZGUgfHwgIWNvbmZpZy5jb250cmFjdHMuV29ya2VyTm9kZS5hYmkpIHtcbiAgICAgICAgdGhyb3cgcGpzRXJyb3IoQ09OVFJBQ1RfUkVRVUlSRUQsICdXb3JrZXJOb2RlJyk7XG4gICAgfVxuXG4gICAgY29uc3Qgd29yID0gbmV3IGNvbmZpZy53ZWIzLmV0aC5Db250cmFjdChjb25maWcuY29udHJhY3RzLldvcmtlck5vZGUuYWJpLCBhZGRyZXNzKTtcbiAgICB3b3IuZXZlbnRzLlN0YXRlQ2hhbmdlZCh7XG4gICAgICAgIGZyb21CbG9jazogMFxuICAgIH0pXG4gICAgICAgIC5vbignZGF0YScsIGFzeW5jIHJlcyA9PiB7XG5cbiAgICAgICAgICAgIHRyeSB7XG5cbiAgICAgICAgICAgICAgICBjb25zdCB3b3JrZXIgPSBhd2FpdCBmZXRjaFdvcmtlcihyZXMuYXJncy53b3JrZXJOb2RlLCBjb25maWcpO1xuICAgICAgICAgICAgICAgIHN0b3JlQ2FsbGJhY2soe1xuICAgICAgICAgICAgICAgICAgICBhZGRyZXNzOiByZXMuYXJncy53b3JrZXJOb2RlLFxuICAgICAgICAgICAgICAgICAgICB3b3JrZXIsXG4gICAgICAgICAgICAgICAgICAgIHN0YXR1czogJ2NoYW5nZWQnLFxuICAgICAgICAgICAgICAgICAgICBldmVudDogJ1dvcmtlck5vZGUuU3RhdGVDaGFuZ2VkJ1xuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfSBjYXRjaChlcnIpIHtcbiAgICAgICAgICAgICAgICBlcnJvckNhbGxiYWNrKGVycik7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pXG4gICAgICAgIC5vbignZXJyb3InLCBlcnJvckNhbGxiYWNrKTtcbn07XG4iXX0=