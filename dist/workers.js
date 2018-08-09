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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy93b3JrZXJzLmpzIl0sIm5hbWVzIjpbImZldGNoQ291bnQiLCJjb25maWciLCJleHBlY3QiLCJhbGwiLCJ0eXBlIiwiY29kZSIsIldFQjNfUkVRVUlSRUQiLCJDT05UUkFDVF9SRVFVSVJFRCIsImFyZ3MiLCJBRERSRVNTX1JFUVVJUkVEIiwicGFuIiwid2ViMyIsImV0aCIsIkNvbnRyYWN0IiwiY29udHJhY3RzIiwiUGFuZG9yYSIsImFiaSIsImFkZHJlc3NlcyIsImNvdW50IiwibWV0aG9kcyIsIndvcmtlck5vZGVzQ291bnQiLCJjYWxsIiwiTnVtYmVyIiwicGFyc2VJbnQiLCJmZXRjaEFkZHJlc3NCeUlkIiwiaWQiLCJhZGRyZXNzIiwid29ya2VyTm9kZXMiLCJTdHJpbmciLCJmZXRjaFN0YXRlIiwid29yIiwiV29ya2VyTm9kZSIsInN0YXRlIiwiY3VycmVudFN0YXRlIiwiZmV0Y2hBY3RpdmVKb2JBZGRyZXNzIiwiYWN0aXZlSm9iIiwiZmV0Y2hXb3JrZXIiLCJQcm9taXNlIiwiY3VycmVudEpvYiIsImpvYlN0YXRlIiwiam9iRGV0YWlscyIsImN1cnJlbnRKb2JTdGF0dXMiLCJmZXRjaFdvcmtlckJ5SWQiLCJ3b3JrZXIiLCJmZXRjaEFsbCIsInJlY29yZHMiLCJlcnJvciIsImkiLCJwdXNoIiwiZXJyIiwibWVzc2FnZSIsImZldGNoSWRsZUNvdW50IiwicmVkdWNlIiwiYWNjIiwiY3VyciIsImZldGNoSm9iUHJvZ3Jlc3MiLCJqb2JQcm9ncmVzcyIsIk1hdGgiLCJjZWlsIiwiZXZlbnRXb3JrZXJOb2RlQ3JlYXRlZCIsIm9wdGlvbnMiLCJjYWxsYmFja3MiLCJvbkRhdGEiLCJvbkVycm9yIiwiY2hhaW4iLCJkYXRhIiwiY2IiLCJldmVudCIsImV2ZW50cyIsIldvcmtlck5vZGVDcmVhdGVkIiwib24iLCJyZXR1cm5WYWx1ZXMiLCJ3b3JrZXJOb2RlIiwiZXZlbnRXb3JrZXJOb2RlU3RhdGVDaGFuZ2VkIiwiU3RhdGVDaGFuZ2VkIiwiYWxpdmUiLCJ3b3JrZXJOb2RlQWRkcmVzcyIsImZyb20iLCJyZXNvbHZlIiwicmVqZWN0Iiwid3JuIiwiZ2FzUHJpY2UiLCJnZXRHYXNQcmljZSIsInNlbmQiLCJnYXMiLCJyZWNlaXB0Iiwic3RhdHVzIiwiVFJBTlNBQ1RJT05fVU5TVUNDRVNTRlVMIl0sIm1hcHBpbmdzIjoiQUFBQTs7Ozs7Ozs7QUFTQTs7Ozs7OztBQUVBOztBQUNBOztBQU9BOzs7Ozs7OztBQUVBOzs7Ozs7QUFNTyxNQUFNQSxVQUFVLEdBQUcsT0FBT0MsTUFBTSxHQUFHLEVBQWhCLEtBQXVCO0FBRTdDQyxFQUFBQSxNQUFNLENBQUNDLEdBQVAsQ0FBV0YsTUFBWCxFQUFtQjtBQUNmLFlBQVE7QUFDSkcsTUFBQUEsSUFBSSxFQUFFLFFBREY7QUFFSkMsTUFBQUEsSUFBSSxFQUFFQztBQUZGLEtBRE87QUFLZiw2QkFBeUI7QUFDckJGLE1BQUFBLElBQUksRUFBRSxRQURlO0FBRXJCQyxNQUFBQSxJQUFJLEVBQUVFLHlCQUZlO0FBR3JCQyxNQUFBQSxJQUFJLEVBQUUsQ0FBQyxTQUFEO0FBSGUsS0FMVjtBQVVmLHlCQUFxQjtBQUNqQkosTUFBQUEsSUFBSSxFQUFFLFNBRFc7QUFFakJDLE1BQUFBLElBQUksRUFBRUksd0JBRlc7QUFHakJELE1BQUFBLElBQUksRUFBRSxDQUFDLFNBQUQ7QUFIVztBQVZOLEdBQW5CO0FBaUJBLFFBQU1FLEdBQUcsR0FBRyxJQUFJVCxNQUFNLENBQUNVLElBQVAsQ0FBWUMsR0FBWixDQUFnQkMsUUFBcEIsQ0FBNkJaLE1BQU0sQ0FBQ2EsU0FBUCxDQUFpQkMsT0FBakIsQ0FBeUJDLEdBQXRELEVBQTJEZixNQUFNLENBQUNnQixTQUFQLENBQWlCRixPQUE1RSxDQUFaO0FBQ0EsUUFBTUcsS0FBSyxHQUFHLE1BQU1SLEdBQUcsQ0FBQ1MsT0FBSixDQUNmQyxnQkFEZSxHQUVmQyxJQUZlLEVBQXBCO0FBSUEsU0FBT0MsTUFBTSxDQUFDQyxRQUFQLENBQWdCTCxLQUFoQixFQUF1QixFQUF2QixDQUFQO0FB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QUFELENBQWI7QUFDSDs7QUFFRFQsSUFBQUEsT0FBTyxDQUFDTyxPQUFELENBQVA7QUFDSCxHQWhCTDtBQWlCSCxDQTFDOEQsQ0FBeEQiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIFdvcmtlck5vZGVzIHJlbGF0ZWQgbWV0aG9kc1xuICogVGhpcyBmaWxlIGl0IGlzIGEgcGFydCBvZiB0aGUgUGFuZG9yYSBQeXJyaGEgSmF2YXNjcmlwdCBsaWJyYXJ5XG4gKiBcbiAqIEBmaWxlIHdvcmtlcnMuanNcbiAqIEBhdXRob3IgS29zdGlhbnR5biBTbXlybm92IDxrb3N0eXNoQGdtYWlsLmNvbT5cbiAqIEBkYXRlIDIwMThcbiAqL1xuXG4ndXNlIHN0cmljdCc7XG5cbmltcG9ydCAqIGFzIGV4cGVjdCBmcm9tICcuL2hlbHBlcnMvZXhwZWN0JztcbmltcG9ydCBwanNFcnJvciwge1xuICAgIENPTlRSQUNUX1JFUVVJUkVELFxuICAgIEFERFJFU1NfUkVRVUlSRUQsXG4gICAgV0VCM19SRVFVSVJFRCxcbiAgICBUUkFOU0FDVElPTl9VTlNVQ0NFU1NGVUxcbn0gZnJvbSAnLi9oZWxwZXJzL2Vycm9ycyc7XG5cbmltcG9ydCB7IGZldGNoSm9iRGV0YWlscyB9IGZyb20gJy4vam9icyc7XG5cbi8qKlxuICogR2V0IHdvcmtlciBub2RlcyBjb3VudCBmcm9tIFBhbmRvcmEgY29udHJhY3RcbiAqIFxuICogQHBhcmFtIHtPYmplY3R9IGNvbmZpZyBMaWJyYXJ5IGNvbmZpZyAocHJvdmlkZWQgYnkgdGhlIHByb3h5IGJ1dCBjYW4gYmUgb3ZlcnJpZGRlbilcbiAqIEByZXR1cm5zIHtQcm9taXNlfSBBIFByb21pc2Ugb2JqZWN0IHJlcHJlc2VudHMgdGhlIHtudW1iZXJ9IFxuICovXG5leHBvcnQgY29uc3QgZmV0Y2hDb3VudCA9IGFzeW5jIChjb25maWcgPSB7fSkgPT4ge1xuXG4gICAgZXhwZWN0LmFsbChjb25maWcsIHtcbiAgICAgICAgJ3dlYjMnOiB7XG4gICAgICAgICAgICB0eXBlOiAnb2JqZWN0JyxcbiAgICAgICAgICAgIGNvZGU6IFdFQjNfUkVRVUlSRURcbiAgICAgICAgfSxcbiAgICAgICAgJ2NvbnRyYWN0cy5QYW5kb3JhLmFiaSc6IHtcbiAgICAgICAgICAgIHR5cGU6ICdvYmplY3QnLFxuICAgICAgICAgICAgY29kZTogQ09OVFJBQ1RfUkVRVUlSRUQsXG4gICAgICAgICAgICBhcmdzOiBbJ1BhbmRvcmEnXVxuICAgICAgICB9LFxuICAgICAgICAnYWRkcmVzc2VzLlBhbmRvcmEnOiB7XG4gICAgICAgICAgICB0eXBlOiAnYWRkcmVzcycsXG4gICAgICAgICAgICBjb2RlOiBBRERSRVNTX1JFUVVJUkVELFxuICAgICAgICAgICAgYXJnczogWydQYW5kb3JhJ11cbiAgICAgICAgfVxuICAgIH0pO1xuXG4gICAgY29uc3QgcGFuID0gbmV3IGNvbmZpZy53ZWIzLmV0aC5Db250cmFjdChjb25maWcuY29udHJhY3RzLlBhbmRvcmEuYWJpLCBjb25maWcuYWRkcmVzc2VzLlBhbmRvcmEpO1xuICAgIGNvbnN0IGNvdW50ID0gYXdhaXQgcGFuLm1ldGhvZHNcbiAgICAgICAgLndvcmtlck5vZGVzQ291bnQoKVxuICAgICAgICAuY2FsbCgpO1xuXG4gICAgcmV0dXJuIE51bWJlci5wYXJzZUludChjb3VudCwgMTApO1xufTtcblxuLyoqXG4gKiBHZXQgd29ya2VyIGFkZHJlc3MgZnJvbSBQYW5kb3JhIGNvbnRyYWN0IGJ5IHRoZSB3b3JrZXIgSWRcbiAqIFxuICogQHBhcmFtIHtpbnRlZ2VyfSBpZCBXb3JrZXIgSWRcbiAqIEBwYXJhbSB7T2JqZWN0fSBjb25maWcgTGlicmFyeSBjb25maWcgKHByb3ZpZGVkIGJ5IHRoZSBwcm94eSBidXQgY2FuIGJlIG92ZXJyaWRkZW4pXG4gKiBAcmV0dXJucyB7UHJvbWlzZX0gQSBQcm9taXNlIG9iamVjdCByZXByZXNlbnRzIHRoZSB7c3RyaW5nfSBcbiAqL1xuZXhwb3J0IGNvbnN0IGZldGNoQWRkcmVzc0J5SWQgPSBhc3luYyAoaWQsIGNvbmZpZyA9IHt9KSA9PiB7XG5cbiAgICBleHBlY3QuYWxsKHsgaWQgfSwge1xuICAgICAgICAnaWQnOiB7XG4gICAgICAgICAgICB0eXBlOiAnbnVtYmVyJ1xuICAgICAgICB9XG4gICAgfSk7XG5cbiAgICBleHBlY3QuYWxsKGNvbmZpZywge1xuICAgICAgICAnd2ViMyc6IHtcbiAgICAgICAgICAgIHR5cGU6ICdvYmplY3QnLFxuICAgICAgICAgICAgY29kZTogV0VCM19SRVFVSVJFRFxuICAgICAgICB9LFxuICAgICAgICAnY29udHJhY3RzLlBhbmRvcmEuYWJpJzoge1xuICAgICAgICAgICAgdHlwZTogJ29iamVjdCcsXG4gICAgICAgICAgICBjb2RlOiBDT05UUkFDVF9SRVFVSVJFRCxcbiAgICAgICAgICAgIGFyZ3M6IFsnUGFuZG9yYSddXG4gICAgICAgIH0sXG4gICAgICAgICdhZGRyZXNzZXMuUGFuZG9yYSc6IHtcbiAgICAgICAgICAgIHR5cGU6ICdhZGRyZXNzJyxcbiAgICAgICAgICAgIGNvZGU6IEFERFJFU1NfUkVRVUlSRUQsXG4gICAgICAgICAgICBhcmdzOiBbJ1BhbmRvcmEnXVxuICAgICAgICB9XG4gICAgfSk7XG5cbiAgICBjb25zdCBwYW4gPSBuZXcgY29uZmlnLndlYjMuZXRoLkNvbnRyYWN0KGNvbmZpZy5jb250cmFjdHMuUGFuZG9yYS5hYmksIGNvbmZpZy5hZGRyZXNzZXMuUGFuZG9yYSk7XG4gICAgY29uc3QgYWRkcmVzcyA9IGF3YWl0IHBhbi5tZXRob2RzXG4gICAgICAgIC53b3JrZXJOb2RlcyhpZClcbiAgICAgICAgLmNhbGwoKTtcblxuICAgIHJldHVybiBTdHJpbmcoYWRkcmVzcyk7XG59O1xuXG4vKipcbiAqIEdldCB3b3JrZXIgc3RhdGUgZnJvbSBXb3JrZXIgY29udHJhY3QgYnkgdGhlIHdvcmtlciBhZGRyZXNzXG4gKiBcbiAqIEBwYXJhbSB7c3RyaW5nfSBhZGRyZXNzIFxuICogQHBhcmFtIHtPYmplY3R9IGNvbmZpZyBMaWJyYXJ5IGNvbmZpZyAocHJvdmlkZWQgYnkgdGhlIHByb3h5IGJ1dCBjYW4gYmUgb3ZlcnJpZGRlbilcbiAqIEByZXR1cm5zIHtQcm9taXNlfSBBIFByb21pc2Ugb2JqZWN0IHJlcHJlc2VudHMgdGhlIHtudW1iZXJ9XG4gKi9cbmV4cG9ydCBjb25zdCBmZXRjaFN0YXRlID0gYXN5bmMgKGFkZHJlc3MgPSAnJywgY29uZmlnID0ge30pID0+IHtcblxuICAgIGV4cGVjdC5hbGwoeyBhZGRyZXNzIH0sIHtcbiAgICAgICAgJ2FkZHJlc3MnOiB7XG4gICAgICAgICAgICB0eXBlOiAnYWRkcmVzcydcbiAgICAgICAgfVxuICAgIH0pO1xuXG4gICAgZXhwZWN0LmFsbChjb25maWcsIHtcbiAgICAgICAgJ3dlYjMnOiB7XG4gICAgICAgICAgICB0eXBlOiAnb2JqZWN0JyxcbiAgICAgICAgICAgIGNvZGU6IFdFQjNfUkVRVUlSRURcbiAgICAgICAgfSxcbiAgICAgICAgJ2NvbnRyYWN0cy5Xb3JrZXJOb2RlLmFiaSc6IHtcbiAgICAgICAgICAgIHR5cGU6ICdvYmplY3QnLFxuICAgICAgICAgICAgY29kZTogQ09OVFJBQ1RfUkVRVUlSRUQsXG4gICAgICAgICAgICBhcmdzOiBbJ1dvcmtlck5vZGUnXVxuICAgICAgICB9XG4gICAgfSk7XG5cbiAgICBjb25zdCB3b3IgPSBuZXcgY29uZmlnLndlYjMuZXRoLkNvbnRyYWN0KGNvbmZpZy5jb250cmFjdHMuV29ya2VyTm9kZS5hYmksIGFkZHJlc3MpOyAgICBcbiAgICBjb25zdCBzdGF0ZSA9IGF3YWl0IHdvci5tZXRob2RzXG4gICAgICAgIC5jdXJyZW50U3RhdGUoKVxuICAgICAgICAuY2FsbCgpO1xuXG4gICAgcmV0dXJuIE51bWJlci5wYXJzZUludChzdGF0ZSwgMTApO1xufTtcblxuLyoqXG4gKiBHZXQgd29ya2VyJ3MgYWN0aXZlIGpvYiBmcm9tIFdvcmtlciBjb250cmFjdCBieSB0aGUgd29ya2VyIGFkZHJlc3NcbiAqIFxuICogQHBhcmFtIHtzdHJpbmd9IGFkZHJlc3MgXG4gKiBAcGFyYW0ge09iamVjdH0gY29uZmlnIExpYnJhcnkgY29uZmlnIChwcm92aWRlZCBieSB0aGUgcHJveHkgYnV0IGNhbiBiZSBvdmVycmlkZGVuKVxuICogQHJldHVybnMge1Byb21pc2V9IEEgUHJvbWlzZSBvYmplY3QgcmVwcmVzZW50cyB0aGUge3N0cmluZ31cbiAqL1xuZXhwb3J0IGNvbnN0IGZldGNoQWN0aXZlSm9iQWRkcmVzcyA9IGFzeW5jIChhZGRyZXNzID0gJycsIGNvbmZpZyA9IHt9KSA9PiB7XG5cbiAgICBleHBlY3QuYWxsKHsgYWRkcmVzcyB9LCB7XG4gICAgICAgICdhZGRyZXNzJzoge1xuICAgICAgICAgICAgdHlwZTogJ2FkZHJlc3MnXG4gICAgICAgIH1cbiAgICB9KTtcblxuICAgIGV4cGVjdC5hbGwoY29uZmlnLCB7XG4gICAgICAgICd3ZWIzJzoge1xuICAgICAgICAgICAgdHlwZTogJ29iamVjdCcsXG4gICAgICAgICAgICBjb2RlOiBXRUIzX1JFUVVJUkVEXG4gICAgICAgIH0sXG4gICAgICAgICdjb250cmFjdHMuV29ya2VyTm9kZS5hYmknOiB7XG4gICAgICAgICAgICB0eXBlOiAnb2JqZWN0JyxcbiAgICAgICAgICAgIGNvZGU6IENPTlRSQUNUX1JFUVVJUkVELFxuICAgICAgICAgICAgYXJnczogWydXb3JrZXJOb2RlJ11cbiAgICAgICAgfVxuICAgIH0pO1xuXG4gICAgY29uc3Qgd29yID0gbmV3IGNvbmZpZy53ZWIzLmV0aC5Db250cmFjdChjb25maWcuY29udHJhY3RzLldvcmtlck5vZGUuYWJpLCBhZGRyZXNzKTtcbiAgICBjb25zdCBhY3RpdmVKb2IgPSBhd2FpdCB3b3IubWV0aG9kc1xuICAgICAgICAuYWN0aXZlSm9iKClcbiAgICAgICAgLmNhbGwoKTtcblxuICAgIHJldHVybiBTdHJpbmcoYWN0aXZlSm9iLCAxMCk7XG59O1xuXG4vKipcbiAqIEdldCB3b3JrZXIgYnkgdGhlIHdvcmtlcidzIGFkZHJlc3NcbiAqIFxuICogQHBhcmFtIHtzdHJpbmd9IGFkZHJlc3NcbiAqIEBwYXJhbSB7T2JqZWN0fSBjb25maWcgTGlicmFyeSBjb25maWcgKHByb3ZpZGVkIGJ5IHRoZSBwcm94eSBidXQgY2FuIGJlIG92ZXJyaWRkZW4pXG4gKiBAcmV0dXJucyB7UHJvbWlzZX0gQSBQcm9taXNlIG9iamVjdCByZXByZXNlbnRzIHRoZSB7T2JqZWN0fVxuICovXG5leHBvcnQgY29uc3QgZmV0Y2hXb3JrZXIgPSBhc3luYyAoYWRkcmVzcyA9ICcnLCBjb25maWcgPSB7fSkgPT4ge1xuICAgIFxuICAgIGNvbnN0IFtcbiAgICAgICAgY3VycmVudFN0YXRlLFxuICAgICAgICBhY3RpdmVKb2JcbiAgICBdID0gYXdhaXQgUHJvbWlzZS5hbGwoW1xuICAgICAgICBmZXRjaFN0YXRlKGFkZHJlc3MsIGNvbmZpZyksXG4gICAgICAgIGZldGNoQWN0aXZlSm9iQWRkcmVzcyhhZGRyZXNzLCBjb25maWcpXG4gICAgXSk7XG5cblxuICAgIGxldCBjdXJyZW50Sm9iID0gYWN0aXZlSm9iO1xuICAgIGxldCBqb2JTdGF0ZTsgICAgXG5cbiAgICAvLyBDaGVjayBpcyBub3QgMHgwXG4gICAgaWYgKCthY3RpdmVKb2IgIT09IDApIHtcblxuICAgICAgICBjb25zdCBqb2JEZXRhaWxzID0gYXdhaXQgZmV0Y2hKb2JEZXRhaWxzKGFjdGl2ZUpvYiwgY29uZmlnKTtcbiAgICAgICAgam9iU3RhdGUgPSBqb2JEZXRhaWxzLnN0YXRlO1xuICAgIH0gZWxzZSB7XG4gICAgICAgIGN1cnJlbnRKb2IgPSBudWxsO1xuICAgICAgICBqb2JTdGF0ZSA9IC0xO1xuICAgIH1cblxuICAgIHJldHVybiB7XG4gICAgICAgIGFkZHJlc3MsXG4gICAgICAgIGN1cnJlbnRTdGF0ZSxcbiAgICAgICAgY3VycmVudEpvYixcbiAgICAgICAgY3VycmVudEpvYlN0YXR1czogam9iU3RhdGVcbiAgICB9O1xufTtcblxuLyoqXG4gKiBHZXQgd29ya2VyIGJ5IHRoZSB3b3JrZXIncyBpZFxuICogXG4gKiBAcGFyYW0ge2ludGVnZXJ9IGlkIFxuICogQHBhcmFtIHtPYmplY3R9IGNvbmZpZyBMaWJyYXJ5IGNvbmZpZyAocHJvdmlkZWQgYnkgdGhlIHByb3h5IGJ1dCBjYW4gYmUgb3ZlcnJpZGRlbilcbiAqIEByZXR1cm5zIHtQcm9taXNlfSBBIFByb21pc2Ugb2JqZWN0IHJlcHJlc2VudHMgdGhlIHtPYmplY3R9XG4gKi9cbmV4cG9ydCBjb25zdCBmZXRjaFdvcmtlckJ5SWQgPSBhc3luYyAoaWQsIGNvbmZpZyA9IHt9KSA9PiB7XG4gICAgXG4gICAgY29uc3QgYWRkcmVzcyA9IGF3YWl0IGZldGNoQWRkcmVzc0J5SWQoaWQsIGNvbmZpZyk7XG4gICAgY29uc3Qgd29ya2VyID0gYXdhaXQgZmV0Y2hXb3JrZXIoYWRkcmVzcywgY29uZmlnKTtcblxuICAgIHJldHVybiB7XG4gICAgICAgIGlkOiBpZCxcbiAgICAgICAgLi4ud29ya2VyXG4gICAgfTtcbn07XG5cbi8qKlxuICogR2V0IGFsbCB3b3JrZXJzXG4gKiBcbiAqIEBwYXJhbSB7T2JqZWN0fSBjb25maWcgTGlicmFyeSBjb25maWcgKHByb3ZpZGVkIGJ5IHRoZSBwcm94eSBidXQgY2FuIGJlIG92ZXJyaWRkZW4pXG4gKiBAcmV0dXJucyB7UHJvbWlzZX0gQSBQcm9taXNlIG9iamVjdCByZXByZXNlbnRzIHRoZSB7bnVtYmVyfVxuICovXG5leHBvcnQgY29uc3QgZmV0Y2hBbGwgPSBhc3luYyAoY29uZmlnID0ge30pID0+IHtcbiAgICBsZXQgcmVjb3JkcyA9IFtdO1xuICAgIGxldCBlcnJvciA9IFtdO1xuXG4gICAgdHJ5IHtcblxuICAgICAgICBjb25zdCBjb3VudCA9IGF3YWl0IGZldGNoQ291bnQoY29uZmlnKTsgICAgXG5cbiAgICAgICAgZm9yIChsZXQgaT0wOyBpIDwgY291bnQ7IGkrKykge1xuICAgICAgICAgICAgXG4gICAgICAgICAgICB0cnkge1xuXG4gICAgICAgICAgICAgICAgY29uc3Qgd29ya2VyID0gYXdhaXQgZmV0Y2hXb3JrZXJCeUlkKGksIGNvbmZpZyk7XG5cbiAgICAgICAgICAgICAgICByZWNvcmRzLnB1c2goe1xuICAgICAgICAgICAgICAgICAgICBpZDogaSxcbiAgICAgICAgICAgICAgICAgICAgLi4ud29ya2VyXG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9IGNhdGNoKGVycikge1xuICAgICAgICAgICAgICAgIGVycm9yLnB1c2goe1xuICAgICAgICAgICAgICAgICAgICBpZDogaSxcbiAgICAgICAgICAgICAgICAgICAgbWVzc2FnZTogZXJyLm1lc3NhZ2VcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH0gICAgICAgIFxuICAgICAgICB9XG4gICAgfSBjYXRjaChlcnIpIHtcbiAgICAgICAgZXJyb3IucHVzaCh7XG4gICAgICAgICAgICBlcnJvcjogZXJyLm1lc3NhZ2VcbiAgICAgICAgfSk7XG4gICAgfSAgIFxuXG4gICAgcmV0dXJuIHtcbiAgICAgICAgcmVjb3JkcyxcbiAgICAgICAgZXJyb3JcbiAgICB9O1xufTtcblxuLyoqXG4gKiBHZXQgY291bnQgb2Ygd29ya2VycyB3aXRoIFwiaWRsZVwiIHN0YXR1c1xuICogXG4gKiBAcGFyYW0ge09iamVjdH0gY29uZmlnIExpYnJhcnkgY29uZmlnIChwcm92aWRlZCBieSB0aGUgcHJveHkgYnV0IGNhbiBiZSBvdmVycmlkZGVuKVxuICogQHJldHVybnMge1Byb21pc2V9IEEgUHJvbWlzZSBvYmplY3QgcmVwcmVzZW50cyB0aGUge251bWJlcn1cbiAqL1xuZXhwb3J0IGNvbnN0IGZldGNoSWRsZUNvdW50ID0gYXN5bmMgKGNvbmZpZyA9IHt9KSA9PiB7XG4gICAgY29uc3QgYWxsID0gYXdhaXQgZmV0Y2hBbGwoY29uZmlnKTtcbiAgICByZXR1cm4gYWxsLnJlY29yZHMucmVkdWNlKChhY2MsIGN1cnIpID0+IChjdXJyLmN1cnJlbnRTdGF0ZSA9PT0gMiA/IGFjYysxIDogYWNjKSwgMCk7XG59O1xuXG4vKipcbiAqIEZldGNoIHByb2dyZXNzIG9mIGFjdGl2ZSBqb2IgZm9yIHRoZSB3b3JrZXJcbiAqXG4gKiBAcGFyYW0ge1N0cmluZ30gYWRkcmVzcyBXb3JrZXIncyBhZGRyZXNzXG4gKiBAcGFyYW0ge09iamVjdH0gY29uZmlnIExpYnJhcnkgY29uZmlnIChwcm92aWRlZCBieSB0aGUgcHJveHkgYnV0IGNhbiBiZSBvdmVycmlkZGVuKVxuICogQHJldHVybnMge1Byb21pc2U8e051bWJlcn0+fSBBIFByb21pc2Ugb2JqZWN0IHJlcHJlc2VudHMgdGhlIHByb2dyZXNzIHZhbHVlXG4gKi9cbmV4cG9ydCBjb25zdCBmZXRjaEpvYlByb2dyZXNzID0gYXN5bmMgKGFkZHJlc3MgPSAnJywgY29uZmlnID0ge30pID0+IHtcblxuICAgIGV4cGVjdC5hbGwoeyBhZGRyZXNzIH0sIHtcbiAgICAgICAgJ2FkZHJlc3MnOiB7XG4gICAgICAgICAgICB0eXBlOiAnYWRkcmVzcydcbiAgICAgICAgfVxuICAgIH0pO1xuXG4gICAgZXhwZWN0LmFsbChjb25maWcsIHtcbiAgICAgICAgJ3dlYjMnOiB7XG4gICAgICAgICAgICB0eXBlOiAnb2JqZWN0JyxcbiAgICAgICAgICAgIGNvZGU6IFdFQjNfUkVRVUlSRURcbiAgICAgICAgfSxcbiAgICAgICAgJ2NvbnRyYWN0cy5Xb3JrZXJOb2RlLmFiaSc6IHtcbiAgICAgICAgICAgIHR5cGU6ICdvYmplY3QnLFxuICAgICAgICAgICAgY29kZTogQ09OVFJBQ1RfUkVRVUlSRUQsXG4gICAgICAgICAgICBhcmdzOiBbJ1dvcmtlck5vZGUnXVxuICAgICAgICB9XG4gICAgfSk7XG5cbiAgICBjb25zdCB3b3IgPSBuZXcgY29uZmlnLndlYjMuZXRoLkNvbnRyYWN0KGNvbmZpZy5jb250cmFjdHMuV29ya2VyTm9kZS5hYmksIGFkZHJlc3MpOyAgICBcbiAgICBjb25zdCBzdGF0ZSA9IGF3YWl0IHdvci5tZXRob2RzXG4gICAgICAgIC5qb2JQcm9ncmVzcygpXG4gICAgICAgIC5jYWxsKCk7XG5cbiAgICByZXR1cm4gTWF0aC5jZWlsKE51bWJlci5wYXJzZUludChzdGF0ZSwgMTApKTtcbn07XG5cbi8qKlxuICogSGFuZGxlIGV2ZW50IFdvcmtlck5vZGVDcmVhdGVkXG4gKiBcbiAqIEBwYXJhbSB7T2JqZWN0fSBvcHRpb25zIEV2ZW50IGhhbmRsZXIgb3B0aW9uc1xuICogQHBhcmFtIHtPYmplY3R9IGNvbmZpZyBMaWJyYXJ5IGNvbmZpZyAocHJvdmlkZWQgYnkgdGhlIHByb3h5IGJ1dCBjYW4gYmUgb3ZlcnJpZGRlbilcbiAqIEByZXR1cm5zIHtPYmplY3R9IE9iamVjdCB3aXRoIGNoYWluZWQgY2FsbGJhY2tzICNkYXRhIGFuZCAjZXJyb3JcbiAqL1xuZXhwb3J0IGNvbnN0IGV2ZW50V29ya2VyTm9kZUNyZWF0ZWQgPSAob3B0aW9ucyA9IHt9LCBjb25maWcgPSB7fSkgPT4ge1xuXG4gICAgZXhwZWN0LmFsbCh7IG9wdGlvbnMgfSwge1xuICAgICAgICAnb3B0aW9ucyc6IHtcbiAgICAgICAgICAgIHR5cGU6ICdvYmplY3QnXG4gICAgICAgIH1cbiAgICB9KTtcblxuICAgIGV4cGVjdC5hbGwoY29uZmlnLCB7XG4gICAgICAgICd3ZWIzJzoge1xuICAgICAgICAgICAgdHlwZTogJ29iamVjdCcsXG4gICAgICAgICAgICBjb2RlOiBXRUIzX1JFUVVJUkVEXG4gICAgICAgIH0sXG4gICAgICAgICdjb250cmFjdHMuUGFuZG9yYS5hYmknOiB7XG4gICAgICAgICAgICB0eXBlOiAnb2JqZWN0JyxcbiAgICAgICAgICAgIGNvZGU6IENPTlRSQUNUX1JFUVVJUkVELFxuICAgICAgICAgICAgYXJnczogWydQYW5kb3JhJ11cbiAgICAgICAgfSxcbiAgICAgICAgJ2FkZHJlc3Nlcy5QYW5kb3JhJzoge1xuICAgICAgICAgICAgdHlwZTogJ2FkZHJlc3MnLFxuICAgICAgICAgICAgY29kZTogQUREUkVTU19SRVFVSVJFRCxcbiAgICAgICAgICAgIGFyZ3M6IFsnUGFuZG9yYSddXG4gICAgICAgIH1cbiAgICB9KTtcblxuICAgIGNvbnN0IGNhbGxiYWNrcyA9IHtcbiAgICAgICAgb25EYXRhOiAoKSA9PiB7fSxcbiAgICAgICAgb25FcnJvcjogKCkgPT4ge31cbiAgICB9O1xuXG4gICAgY29uc3QgY2hhaW4gPSB7XG4gICAgICAgIGRhdGE6IChjYiA9ICgpID0+IHt9KSA9PiB7XG4gICAgICAgICAgICBjYWxsYmFja3Mub25EYXRhID0gY2I7XG4gICAgICAgICAgICByZXR1cm4gY2hhaW47XG4gICAgICAgIH0sXG4gICAgICAgIGVycm9yOiAoY2IgPSAoKSA9PiB7fSkgPT4ge1xuICAgICAgICAgICAgY2FsbGJhY2tzLm9uRXJyb3IgPSBjYjtcbiAgICAgICAgICAgIHJldHVybiBjaGFpbjtcbiAgICAgICAgfVxuICAgIH07XG5cbiAgICBjb25zdCBwYW4gPSBuZXcgY29uZmlnLndlYjMuZXRoLkNvbnRyYWN0KGNvbmZpZy5jb250cmFjdHMuUGFuZG9yYS5hYmksIGNvbmZpZy5hZGRyZXNzZXMuUGFuZG9yYSk7XG4gICAgY2hhaW4uZXZlbnQgPSBwYW4uZXZlbnRzLldvcmtlck5vZGVDcmVhdGVkKG9wdGlvbnMpXG4gICAgICAgIC5vbignZGF0YScsIGFzeW5jIGV2ZW50ID0+IHtcblxuICAgICAgICAgICAgdHJ5IHtcblxuICAgICAgICAgICAgICAgIGNvbnN0IHdvcmtlciA9IGF3YWl0IGZldGNoV29ya2VyKGV2ZW50LnJldHVyblZhbHVlcy53b3JrZXJOb2RlLCBjb25maWcpO1xuICAgICAgICAgICAgICAgIGNhbGxiYWNrcy5vbkRhdGEoe1xuICAgICAgICAgICAgICAgICAgICByZWNvcmRzOiBbd29ya2VyXSxcbiAgICAgICAgICAgICAgICAgICAgZXZlbnRcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH0gY2F0Y2goZXJyKSB7XG4gICAgICAgICAgICAgICAgY2FsbGJhY2tzLm9uRXJyb3IoZXJyKTtcbiAgICAgICAgICAgIH0gICAgICAgICAgICBcbiAgICAgICAgfSlcbiAgICAgICAgLm9uKCdlcnJvcicsIGNhbGxiYWNrcy5vbkVycm9yKTtcblxuICAgIHJldHVybiBjaGFpbjtcbn07XG5cbi8qKlxuICogSGFuZGxlIGV2ZW50IFN0YXRlQ2hhbmdlZCBmb3IgV29ya2VyTm9kZVxuICogXG4gKiBAcGFyYW0ge1N0cmluZ30gYWRkcmVzc1xuICogQHBhcmFtIHtPYmplY3R9IG9wdGlvbnNcbiAqIEBwYXJhbSB7T2JqZWN0fSBjb25maWcgTGlicmFyeSBjb25maWcgKHByb3ZpZGVkIGJ5IHRoZSBwcm94eSBidXQgY2FuIGJlIG92ZXJyaWRkZW4pXG4gKiBAcmV0dXJucyB7T2JqZWN0fSBPYmplY3Qgd2l0aCBjaGFpbmVkIGNhbGxiYWNrcyAjZGF0YSBhbmQgI2Vycm9yXG4gKi9cbmV4cG9ydCBjb25zdCBldmVudFdvcmtlck5vZGVTdGF0ZUNoYW5nZWQgPSAoYWRkcmVzcyA9ICcnLCBvcHRpb25zID0ge30sIGNvbmZpZyA9IHt9KSA9PiB7XG5cbiAgICBleHBlY3QuYWxsKHsgYWRkcmVzcyB9LCB7XG4gICAgICAgICdhZGRyZXNzJzoge1xuICAgICAgICAgICAgdHlwZTogJ2FkZHJlc3MnXG4gICAgICAgIH1cbiAgICB9KTtcblxuICAgIGV4cGVjdC5hbGwoY29uZmlnLCB7XG4gICAgICAgICd3ZWIzJzoge1xuICAgICAgICAgICAgdHlwZTogJ29iamVjdCcsXG4gICAgICAgICAgICBjb2RlOiBXRUIzX1JFUVVJUkVEXG4gICAgICAgIH0sXG4gICAgICAgICdjb250cmFjdHMuV29ya2VyTm9kZS5hYmknOiB7XG4gICAgICAgICAgICB0eXBlOiAnb2JqZWN0JyxcbiAgICAgICAgICAgIGNvZGU6IENPTlRSQUNUX1JFUVVJUkVELFxuICAgICAgICAgICAgYXJnczogWydXb3JrZXJOb2RlJ11cbiAgICAgICAgfVxuICAgIH0pO1xuXG4gICAgY29uc3QgY2FsbGJhY2tzID0ge1xuICAgICAgICBvbkRhdGE6ICgpID0+IHt9LFxuICAgICAgICBvbkVycm9yOiAoKSA9PiB7fVxuICAgIH07XG5cbiAgICBjb25zdCBjaGFpbiA9IHtcbiAgICAgICAgZGF0YTogKGNiID0gKCkgPT4ge30pID0+IHtcbiAgICAgICAgICAgIGNhbGxiYWNrcy5vbkRhdGEgPSBjYjtcbiAgICAgICAgICAgIHJldHVybiBjaGFpbjtcbiAgICAgICAgfSxcbiAgICAgICAgZXJyb3I6IChjYiA9ICgpID0+IHt9KSA9PiB7XG4gICAgICAgICAgICBjYWxsYmFja3Mub25FcnJvciA9IGNiO1xuICAgICAgICAgICAgcmV0dXJuIGNoYWluO1xuICAgICAgICB9XG4gICAgfTtcblxuICAgIGNvbnN0IHdvciA9IG5ldyBjb25maWcud2ViMy5ldGguQ29udHJhY3QoY29uZmlnLmNvbnRyYWN0cy5Xb3JrZXJOb2RlLmFiaSwgYWRkcmVzcyk7XG4gICAgY2hhaW4uZXZlbnQgPSB3b3IuZXZlbnRzLlN0YXRlQ2hhbmdlZChvcHRpb25zKVxuICAgICAgICAub24oJ2RhdGEnLCBhc3luYyBldmVudCA9PiB7XG5cbiAgICAgICAgICAgIHRyeSB7XG5cbiAgICAgICAgICAgICAgICBjb25zdCB3b3JrZXIgPSBhd2FpdCBmZXRjaFdvcmtlcihhZGRyZXNzLCBjb25maWcpO1xuICAgICAgICAgICAgICAgIGNhbGxiYWNrcy5vbkRhdGEoe1xuICAgICAgICAgICAgICAgICAgICByZWNvcmRzOiBbd29ya2VyXSxcbiAgICAgICAgICAgICAgICAgICAgZXZlbnRcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH0gY2F0Y2goZXJyKSB7XG4gICAgICAgICAgICAgICAgY2FsbGJhY2tzLm9uRXJyb3IoZXJyKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSlcbiAgICAgICAgLm9uKCdlcnJvcicsIGNhbGxiYWNrcy5vbkVycm9yKTtcblxuICAgIHJldHVybiBjaGFpbjtcbn07XG5cbi8qKlxuICogVHJhbnNpdGlvbiBvZiBhIFdvcmtlck5vZGUgdG8gdGhlIElkbGUgc3RhdGVcbiAqIFxuICogQHBhcmFtIHtTdHJpbmd9IHdvcmtlck5vZGVBZGRyZXNzIFxuICogQHBhcmFtIHtTdHJpbmd9IGZyb21cbiAqIEBwYXJhbSB7T2JqZWN0fSBjb25maWcgTGlicmFyeSBjb25maWcgKHByb3ZpZGVkIGJ5IHRoZSBwcm94eSBidXQgY2FuIGJlIG92ZXJyaWRkZW4pXG4gKiBAcmV0dXJucyB7UHJvbWlzZX0gUHJvbWlzZSBvYmplY3QgcmVzb2x2ZWQgdG8gYWRkIHN0YXR1cyAoYm9vbGVhbilcbiAqL1xuZXhwb3J0IGNvbnN0IGFsaXZlID0gKHdvcmtlck5vZGVBZGRyZXNzLCBmcm9tLCBjb25maWcgPSB7fSkgPT4gbmV3IFByb21pc2UoYXN5bmMgKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuXG4gICAgZXhwZWN0LmFsbCh7IHdvcmtlck5vZGVBZGRyZXNzLCBmcm9tIH0sIHtcbiAgICAgICAgJ3dvcmtlck5vZGVBZGRyZXNzJzoge1xuICAgICAgICAgICAgdHlwZTogJ2FkZHJlc3MnXG4gICAgICAgIH0sXG4gICAgICAgICdmcm9tJzoge1xuICAgICAgICAgICAgdHlwZTogJ2FkZHJlc3MnXG4gICAgICAgIH1cbiAgICB9KTtcblxuICAgIGV4cGVjdC5hbGwoY29uZmlnLCB7XG4gICAgICAgICd3ZWIzJzoge1xuICAgICAgICAgICAgdHlwZTogJ29iamVjdCcsXG4gICAgICAgICAgICBjb2RlOiBXRUIzX1JFUVVJUkVEXG4gICAgICAgIH0sXG4gICAgICAgICdjb250cmFjdHMuV29ya2VyTm9kZS5hYmknOiB7XG4gICAgICAgICAgICB0eXBlOiAnb2JqZWN0JyxcbiAgICAgICAgICAgIGNvZGU6IENPTlRSQUNUX1JFUVVJUkVELFxuICAgICAgICAgICAgYXJnczogWydXb3JrZXJOb2RlJ11cbiAgICAgICAgfVxuICAgIH0pO1xuXG4gICAgY29uc3Qgd3JuID0gbmV3IGNvbmZpZy53ZWIzLmV0aC5Db250cmFjdChjb25maWcuY29udHJhY3RzLldvcmtlck5vZGUuYWJpLCB3b3JrZXJOb2RlQWRkcmVzcyk7XG4gICAgY29uc3QgZ2FzUHJpY2UgPSBhd2FpdCBjb25maWcud2ViMy5ldGguZ2V0R2FzUHJpY2UoKTtcbiAgICB3cm4ubWV0aG9kc1xuICAgICAgICAuYWxpdmUoKVxuICAgICAgICAuc2VuZCh7XG4gICAgICAgICAgICBmcm9tLFxuICAgICAgICAgICAgZ2FzUHJpY2UsXG4gICAgICAgICAgICBnYXM6IDY3MDAwMDBcbiAgICAgICAgfSlcbiAgICAgICAgLm9uKCdlcnJvcicsIHJlamVjdClcbiAgICAgICAgLm9uKCdyZWNlaXB0JywgcmVjZWlwdCA9PiB7XG5cbiAgICAgICAgICAgIGlmIChOdW1iZXIocmVjZWlwdC5zdGF0dXMpID09PSAwKSB7XG5cbiAgICAgICAgICAgICAgICByZXR1cm4gcmVqZWN0KHBqc0Vycm9yKFRSQU5TQUNUSU9OX1VOU1VDQ0VTU0ZVTCkpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICByZXNvbHZlKHJlY2VpcHQpO1xuICAgICAgICB9KTtcbn0pO1xuIl19