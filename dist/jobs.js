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
  if (!config.web3) {
    throw (0, _errors.default)(_errors.WEB3_REQUIRED);
  }

  if (!config.contracts || !config.contracts.CognitiveJob || !config.contracts.CognitiveJob.abi) {
    throw (0, _errors.default)(_errors.CONTRACT_REQUIRED, 'CognitiveJob');
  }

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
  if (!config.web3) {
    throw (0, _errors.default)(_errors.WEB3_REQUIRED);
  }

  if (!config.contracts || !config.contracts.CognitiveJob || !config.contracts.CognitiveJob.abi) {
    throw (0, _errors.default)(_errors.CONTRACT_REQUIRED, 'CognitiveJob');
  }

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
  if (!config.web3) {
    throw (0, _errors.default)(_errors.WEB3_REQUIRED);
  }

  if (!config.contracts || !config.contracts.CognitiveJob || !config.contracts.CognitiveJob.abi) {
    throw (0, _errors.default)(_errors.CONTRACT_REQUIRED, 'CognitiveJob');
  }

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
  if (!config.web3) {
    throw (0, _errors.default)(_errors.WEB3_REQUIRED);
  }

  if (!config.contracts || !config.contracts.CognitiveJob || !config.contracts.CognitiveJob.abi) {
    throw (0, _errors.default)(_errors.CONTRACT_REQUIRED, 'CognitiveJob');
  }

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
  if (!config.web3) {
    throw (0, _errors.default)(_errors.WEB3_REQUIRED);
  }

  if (!config.contracts || !config.contracts.CognitiveJob || !config.contracts.CognitiveJob.abi) {
    throw (0, _errors.default)(_errors.CONTRACT_REQUIRED, 'CognitiveJob');
  }

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
  if (!config.web3) {
    throw (0, _errors.default)(_errors.WEB3_REQUIRED);
  }

  if (!config.contracts || !config.contracts.CognitiveJob || !config.contracts.CognitiveJob.abi) {
    throw (0, _errors.default)(_errors.CONTRACT_REQUIRED, 'CognitiveJob');
  }

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
  try {
    const state = await fetchState(address, config);
    const kernel = await fetchKernel(address, config);
    const dataset = await fetchDataset(address, config);
    const batches = await fetchBatches(address, config);
    const progress = await fetchProgress(address, config);
    const ipfsResults = await fetchIpfsResults(address, config);
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
  } catch (err) {
    return Promise.reject(err);
  }
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
  try {
    const job = await fetchJob(address, config);
    const kernel = await (0, _kernels.fetchIpfsAddress)(job.kernel, config);
    const dataset = await (0, _datasets.fetchDataset)(job.dataset, config);
    return {
      job,
      kernel,
      dataset
    };
  } catch (err) {
    return Promise.reject(err);
  }
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
  pan.methods.createCognitiveJob(kernelAddress, datasetAddress).send({
    from
  }).on('error', reject).on('receipt', receipt => resolve(receipt.contractAddress));
});
/**
 * Handle event CognitiveJobCreated
 * 
 * @param {Function} storeCallback 
 * @param {Function} errorCallback
 * @param {Object} config Library config (provided by the proxy but can be overridden)
 */


exports.create = create;

const eventCognitiveJobCreated = (storeCallback = () => {}, errorCallback = () => {}, config = {}) => {
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
  pan.events.CognitiveJobCreated({
    fromBlock: 0
  }).on('data', async res => {
    try {
      const store = await fetchJobStore(res.args.cognitiveJob);
      storeCallback({
        address: res.args.cognitiveJob,
        store,
        status: 'created',
        event: 'Pandora.CognitiveJobCreated'
      });
    } catch (err) {
      errorCallback(err);
    }
  }).on('error', errorCallback);
};
/**
 * Handle event StateChanged for CognitiveJob
 * 
 * @param {string} address
 * @param {Function} storeCallback 
 * @param {Function} errorCallback
 * @param {Object} config Library config (provided by the proxy but can be overridden)
 * @returns {Promise} A Promise object represents the {Object} 
 */


exports.eventCognitiveJobCreated = eventCognitiveJobCreated;

const eventCognitiveJobStateChanged = (address, storeCallback = () => {}, errorCallback = () => {}, config = {}) => {
  if (!config.web3) {
    throw (0, _errors.default)(_errors.WEB3_REQUIRED);
  }

  if (!config.contracts || !config.contracts.CognitiveJob || !config.contracts.CognitiveJob.abi) {
    throw (0, _errors.default)(_errors.CONTRACT_REQUIRED, 'CognitiveJob');
  }

  const cog = new config.web3.eth.Contract(config.contracts.CognitiveJob.abi, address);
  cog.events.StateChanged({
    fromBlock: 0
  }).on('data', async res => {
    try {
      const store = await fetchJobStore(res.args.cognitiveJob);
      storeCallback({
        address: res.args.cognitiveJob,
        store,
        status: 'changed',
        event: 'CognitiveJob.StateChanged'
      });
    } catch (err) {
      errorCallback(err);
    }
  }).on('error', errorCallback);
};

exports.eventCognitiveJobStateChanged = eventCognitiveJobStateChanged;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9qb2JzLmpzIl0sIm5hbWVzIjpbImZldGNoQWN0aXZlQ291bnQiLCJjb25maWciLCJ3ZWIzIiwiV0VCM19SRVFVSVJFRCIsImNvbnRyYWN0cyIsIlBhbmRvcmEiLCJhYmkiLCJDT05UUkFDVF9SRVFVSVJFRCIsImFkZHJlc3NlcyIsInBhbmRvcmEiLCJBRERSRVNTX1JFUVVJUkVEIiwicGFuIiwiZXRoIiwiQ29udHJhY3QiLCJjb3VudCIsIm1ldGhvZHMiLCJhY3RpdmVKb2JzQ291bnQiLCJjYWxsIiwiTnVtYmVyIiwicGFyc2VJbnQiLCJmZXRjaEFkZHJlc3NCeUlkIiwiaWQiLCJqb2JBZGRyZXNzIiwiYWN0aXZlSm9icyIsIlN0cmluZyIsImZldGNoU3RhdGUiLCJhZGRyZXNzIiwiQ29nbml0aXZlSm9iIiwiY29nIiwic3RhdGUiLCJjdXJyZW50U3RhdGUiLCJmZXRjaEtlcm5lbCIsImtlcm5lbCIsImZldGNoRGF0YXNldCIsImRhdGFzZXQiLCJmZXRjaEJhdGNoZXMiLCJiYXRjaGVzIiwiZmV0Y2hQcm9ncmVzcyIsInByb2dyZXNzIiwiZmV0Y2hJcGZzUmVzdWx0cyIsImlwZnNSZXN1bHRzIiwiZmV0Y2hKb2IiLCJqb2JTdGF0dXMiLCJhY3RpdmVXb3JrZXJzQ291bnQiLCJlcnIiLCJQcm9taXNlIiwicmVqZWN0IiwiZmV0Y2hBbGwiLCJyZWNvcmRzIiwiZXJyb3IiLCJpIiwiam9iIiwicHVzaCIsIm1lc3NhZ2UiLCJmZXRjaEpvYlN0b3JlIiwiY3JlYXRlIiwia2VybmVsQWRkcmVzcyIsImRhdGFzZXRBZGRyZXNzIiwiZnJvbSIsInJlc29sdmUiLCJjcmVhdGVDb2duaXRpdmVKb2IiLCJzZW5kIiwib24iLCJyZWNlaXB0IiwiY29udHJhY3RBZGRyZXNzIiwiZXZlbnRDb2duaXRpdmVKb2JDcmVhdGVkIiwic3RvcmVDYWxsYmFjayIsImVycm9yQ2FsbGJhY2siLCJldmVudHMiLCJDb2duaXRpdmVKb2JDcmVhdGVkIiwiZnJvbUJsb2NrIiwicmVzIiwic3RvcmUiLCJhcmdzIiwiY29nbml0aXZlSm9iIiwic3RhdHVzIiwiZXZlbnQiLCJldmVudENvZ25pdGl2ZUpvYlN0YXRlQ2hhbmdlZCIsIlN0YXRlQ2hhbmdlZCJdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7Ozs7O0FBU0E7Ozs7Ozs7QUFFQTs7QUFNQTs7QUFJQTs7Ozs7Ozs7QUFJQTs7Ozs7O0FBTU8sTUFBTUEsbUJBQW1CLE9BQU9DLFNBQVMsRUFBaEIsS0FBdUI7QUFFbkQsTUFBSSxDQUFDQSxPQUFPQyxJQUFaLEVBQWtCO0FBQ2QsVUFBTSxxQkFBU0MscUJBQVQsQ0FBTjtBQUNIOztBQUVELE1BQUksQ0FBQ0YsT0FBT0csU0FBUixJQUFxQixDQUFDSCxPQUFPRyxTQUFQLENBQWlCQyxPQUF2QyxJQUFrRCxDQUFDSixPQUFPRyxTQUFQLENBQWlCQyxPQUFqQixDQUF5QkMsR0FBaEYsRUFBcUY7QUFDakYsVUFBTSxxQkFBU0MseUJBQVQsRUFBNEIsU0FBNUIsQ0FBTjtBQUNIOztBQUVELE1BQUksQ0FBQ04sT0FBT08sU0FBUixJQUFxQixDQUFDUCxPQUFPTyxTQUFQLENBQWlCQyxPQUEzQyxFQUFvRDtBQUNoRCxVQUFNLHFCQUFTQyx3QkFBVCxFQUEyQixTQUEzQixDQUFOO0FBQ0g7O0FBRUQsUUFBTUMsTUFBTSxJQUFJVixPQUFPQyxJQUFQLENBQVlVLEdBQVosQ0FBZ0JDLFFBQXBCLENBQTZCWixPQUFPRyxTQUFQLENBQWlCQyxPQUFqQixDQUF5QkMsR0FBdEQsRUFBMkRMLE9BQU9PLFNBQVAsQ0FBaUJDLE9BQTVFLENBQVo7QUFDQSxRQUFNSyxRQUFRLE1BQU1ILElBQUlJLE9BQUosQ0FDZkMsZUFEZSxHQUVmQyxJQUZlLEVBQXBCO0FBR0EsU0FBT0MsT0FBT0MsUUFBUCxDQUFnQkwsS0FBaEIsRUFBdUIsRUFBdkIsQ0FBUDtBQUNILENBbkJNO0FBcUJQOzs7Ozs7Ozs7OztBQU9PLE1BQU1NLG1CQUFtQixPQUFPQyxFQUFQLEVBQVdwQixTQUFTLEVBQXBCLEtBQTJCO0FBRXZELE1BQUks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QUhFO0FBSVZDLGVBQU87QUFKRyxPQUFkO0FBTUgsS0FURCxDQVNFLE9BQU1oQyxHQUFOLEVBQVc7QUFDVHVCLG9CQUFjdkIsR0FBZDtBQUNIO0FBQ0osR0FqQkwsRUFrQktrQixFQWxCTCxDQWtCUSxPQWxCUixFQWtCaUJLLGFBbEJqQjtBQW1CSCxDQTlCTSIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogQ29nbml0aXZlIEpvYnMgcmVsYXRlZCBtZXRob2RzXG4gKiBUaGlzIGZpbGUgaXQgaXMgYSBwYXJ0IG9mIHRoZSBQYW5kb3JhIFB5cnJoYSBKYXZhc2NyaXB0IGxpYnJhcnlcbiAqIFxuICogQGZpbGUgam9icy5qc1xuICogQGF1dGhvciBLb3N0aWFudHluIFNteXJub3YgPGtvc3R5c2hAZ21haWwuY29tPlxuICogQGRhdGUgMjAxOFxuICovXG5cbid1c2Ugc3RyaWN0JztcblxuaW1wb3J0IHBqc0Vycm9yLCB7XG4gICAgQ09OVFJBQ1RfUkVRVUlSRUQsXG4gICAgQUREUkVTU19SRVFVSVJFRCxcbiAgICBXRUIzX1JFUVVJUkVEXG59IGZyb20gJy4vaGVscGVycy9lcnJvcnMnO1xuXG5pbXBvcnQge1xuICAgIGZldGNoSXBmc0FkZHJlc3MgYXMgZmV0Y2hJcGZzQWRkcmVzc0J5S2VybmVsQWRkcmVzc1xufSBmcm9tICcuL2tlcm5lbHMnO1xuXG5pbXBvcnQge1xuICAgIGZldGNoRGF0YXNldCBhcyBmZXRjaERhdGFzZXRCeURhdGFzZXRBZGRyZXNzXG59IGZyb20gJy4vZGF0YXNldHMnO1xuXG4vKipcbiAqIEdldCBhY3RpdmUgam9iIGNvdW50IGZyb20gUGFuZG9yYSBjb250cmFjdFxuICogXG4gKiBAcGFyYW0ge09iamVjdH0gY29uZmlnIExpYnJhcnkgY29uZmlnIChwcm92aWRlZCBieSB0aGUgcHJveHkgYnV0IGNhbiBiZSBvdmVycmlkZGVuKVxuICogQHJldHVybnMge1Byb21pc2V9IEEgUHJvbWlzZSBvYmplY3QgcmVwcmVzZW50cyB0aGUge251bWJlcn0gXG4gKi9cbmV4cG9ydCBjb25zdCBmZXRjaEFjdGl2ZUNvdW50ID0gYXN5bmMgKGNvbmZpZyA9IHt9KSA9PiB7XG5cbiAgICBpZiAoIWNvbmZpZy53ZWIzKSB7XG4gICAgICAgIHRocm93IHBqc0Vycm9yKFdFQjNfUkVRVUlSRUQpO1xuICAgIH1cblxuICAgIGlmICghY29uZmlnLmNvbnRyYWN0cyB8fCAhY29uZmlnLmNvbnRyYWN0cy5QYW5kb3JhIHx8ICFjb25maWcuY29udHJhY3RzLlBhbmRvcmEuYWJpKSB7XG4gICAgICAgIHRocm93IHBqc0Vycm9yKENPTlRSQUNUX1JFUVVJUkVELCAnUGFuZG9yYScpO1xuICAgIH1cblxuICAgIGlmICghY29uZmlnLmFkZHJlc3NlcyB8fCAhY29uZmlnLmFkZHJlc3Nlcy5wYW5kb3JhKSB7XG4gICAgICAgIHRocm93IHBqc0Vycm9yKEFERFJFU1NfUkVRVUlSRUQsICdQYW5kb3JhJyk7XG4gICAgfVxuXG4gICAgY29uc3QgcGFuID0gbmV3IGNvbmZpZy53ZWIzLmV0aC5Db250cmFjdChjb25maWcuY29udHJhY3RzLlBhbmRvcmEuYWJpLCBjb25maWcuYWRkcmVzc2VzLnBhbmRvcmEpO1xuICAgIGNvbnN0IGNvdW50ID0gYXdhaXQgcGFuLm1ldGhvZHNcbiAgICAgICAgLmFjdGl2ZUpvYnNDb3VudCgpXG4gICAgICAgIC5jYWxsKCk7XG4gICAgcmV0dXJuIE51bWJlci5wYXJzZUludChjb3VudCwgMTApO1xufTtcblxuLyoqXG4gKiBHZXQgd29ya2VyIGJ5IHRoZSB3b3JrZXIncyBpZFxuICogXG4gKiBAcGFyYW0ge2ludGVnZXJ9IGlkIFxuICogQHBhcmFtIHtPYmplY3R9IGNvbmZpZyBMaWJyYXJ5IGNvbmZpZyAocHJvdmlkZWQgYnkgdGhlIHByb3h5IGJ1dCBjYW4gYmUgb3ZlcnJpZGRlbilcbiAqIEByZXR1cm5zIHtQcm9taXNlfSBBIFByb21pc2Ugb2JqZWN0IHJlcHJlc2VudHMgdGhlIHtzdHJpbmd9XG4gKi9cbmV4cG9ydCBjb25zdCBmZXRjaEFkZHJlc3NCeUlkID0gYXN5bmMgKGlkLCBjb25maWcgPSB7fSkgPT4ge1xuXG4gICAgaWYgKCFjb25maWcud2ViMykge1xuICAgICAgICB0aHJvdyBwanNFcnJvcihXRUIzX1JFUVVJUkVEKTtcbiAgICB9XG5cbiAgICBpZiAoIWNvbmZpZy5jb250cmFjdHMgfHwgIWNvbmZpZy5jb250cmFjdHMuUGFuZG9yYSB8fCAhY29uZmlnLmNvbnRyYWN0cy5QYW5kb3JhLmFiaSkge1xuICAgICAgICB0aHJvdyBwanNFcnJvcihDT05UUkFDVF9SRVFVSVJFRCwgJ1BhbmRvcmEnKTtcbiAgICB9XG5cbiAgICBpZiAoIWNvbmZpZy5hZGRyZXNzZXMgfHwgIWNvbmZpZy5hZGRyZXNzZXMucGFuZG9yYSkge1xuICAgICAgICB0aHJvdyBwanNFcnJvcihBRERSRVNTX1JFUVVJUkVELCAnUGFuZG9yYScpO1xuICAgIH1cblxuICAgIGNvbnN0IHBhbiA9IG5ldyBjb25maWcud2ViMy5ldGguQ29udHJhY3QoY29uZmlnLmNvbnRyYWN0cy5QYW5kb3JhLmFiaSwgY29uZmlnLmFkZHJlc3Nlcy5wYW5kb3JhKTtcbiAgICBjb25zdCBqb2JBZGRyZXNzID0gYXdhaXQgcGFuLm1ldGhvZHNcbiAgICAgICAgLmFjdGl2ZUpvYnMoaWQpXG4gICAgICAgIC5jYWxsKCk7XG4gICAgcmV0dXJuIFN0cmluZyhqb2JBZGRyZXNzKTtcbn07XG5cbi8qKlxuICogR2V0IGpvYiBzdGF0ZSBmcm9tIENvZ25pdGl2ZSBKb2IgY29udHJhY3QgYnkgdGhlIGpvYiBhZGRyZXNzXG4gKiBcbiAqIEBwYXJhbSB7c3RyaW5nfSBhZGRyZXNzIFxuICogQHBhcmFtIHtPYmplY3R9IGNvbmZpZyBMaWJyYXJ5IGNvbmZpZyAocHJvdmlkZWQgYnkgdGhlIHByb3h5IGJ1dCBjYW4gYmUgb3ZlcnJpZGRlbilcbiAqIEByZXR1cm5zIHtQcm9taXNlfSBBIFByb21pc2Ugb2JqZWN0IHJlcHJlc2VudHMgdGhlIHtpbnRlZ2VyfSBcbiAqL1xuZXhwb3J0IGNvbnN0IGZldGNoU3RhdGUgPSBhc3luYyAoYWRkcmVzcywgY29uZmlnID0ge30pID0+IHtcblxuICAgIGlmICghY29uZmlnLndlYjMpIHtcbiAgICAgICAgdGhyb3cgcGpzRXJyb3IoV0VCM19SRVFVSVJFRCk7XG4gICAgfVxuXG4gICAgaWYgKCFjb25maWcuY29udHJhY3RzIHx8ICFjb25maWcuY29udHJhY3RzLkNvZ25pdGl2ZUpvYiB8fCAhY29uZmlnLmNvbnRyYWN0cy5Db2duaXRpdmVKb2IuYWJpKSB7XG4gICAgICAgIHRocm93IHBqc0Vycm9yKENPTlRSQUNUX1JFUVVJUkVELCAnQ29nbml0aXZlSm9iJyk7XG4gICAgfVxuXG4gICAgY29uc3QgY29nID0gbmV3IGNvbmZpZy53ZWIzLmV0aC5Db250cmFjdChjb25maWcuY29udHJhY3RzLkNvZ25pdGl2ZUpvYi5hYmksIGFkZHJlc3MpO1xuICAgIGNvbnN0IHN0YXRlID0gYXdhaXQgY29nLm1ldGhvZHNcbiAgICAgICAgLmN1cnJlbnRTdGF0ZSgpXG4gICAgICAgIC5jYWxsKCk7XG4gICAgcmV0dXJuIE51bWJlci5wYXJzZUludChzdGF0ZSwgMTApO1xufTtcblxuLyoqXG4gKiBHZXQgam9iIGtlcm5lbCBmcm9tIENvZ25pdGl2ZSBKb2IgY29udHJhY3QgYnkgdGhlIGpvYiBhZGRyZXNzXG4gKiBcbiAqIEBwYXJhbSB7c3RyaW5nfSBhZGRyZXNzIFxuICogQHBhcmFtIHtPYmplY3R9IGNvbmZpZyBMaWJyYXJ5IGNvbmZpZyAocHJvdmlkZWQgYnkgdGhlIHByb3h5IGJ1dCBjYW4gYmUgb3ZlcnJpZGRlbilcbiAqIEByZXR1cm5zIHtQcm9taXNlfSBBIFByb21pc2Ugb2JqZWN0IHJlcHJlc2VudHMgdGhlIHtzdHJpbmd9IFxuICovXG5leHBvcnQgY29uc3QgZmV0Y2hLZXJuZWwgPSBhc3luYyAoYWRkcmVzcywgY29uZmlnID0ge30pID0+IHtcblxuICAgIGlmICghY29uZmlnLndlYjMpIHtcbiAgICAgICAgdGhyb3cgcGpzRXJyb3IoV0VCM19SRVFVSVJFRCk7XG4gICAgfVxuICAgIFxuICAgIGlmICghY29uZmlnLmNvbnRyYWN0cyB8fCAhY29uZmlnLmNvbnRyYWN0cy5Db2duaXRpdmVKb2IgfHwgIWNvbmZpZy5jb250cmFjdHMuQ29nbml0aXZlSm9iLmFiaSkge1xuICAgICAgICB0aHJvdyBwanNFcnJvcihDT05UUkFDVF9SRVFVSVJFRCwgJ0NvZ25pdGl2ZUpvYicpO1xuICAgIH1cblxuICAgIGNvbnN0IGNvZyA9IG5ldyBjb25maWcud2ViMy5ldGguQ29udHJhY3QoY29uZmlnLmNvbnRyYWN0cy5Db2duaXRpdmVKb2IuYWJpLCBhZGRyZXNzKTtcbiAgICBjb25zdCBrZXJuZWwgPSBhd2FpdCBjb2cubWV0aG9kc1xuICAgICAgICAua2VybmVsKClcbiAgICAgICAgLmNhbGwoKTtcbiAgICByZXR1cm4gU3RyaW5nKGtlcm5lbCk7XG59O1xuXG4vKipcbiAqIEdldCBqb2IgZGF0YXNldCBmcm9tIENvZ25pdGl2ZSBKb2IgY29udHJhY3QgYnkgdGhlIGpvYiBhZGRyZXNzXG4gKiBcbiAqIEBwYXJhbSB7c3RyaW5nfSBhZGRyZXNzIFxuICogQHBhcmFtIHtPYmplY3R9IGNvbmZpZyBMaWJyYXJ5IGNvbmZpZyAocHJvdmlkZWQgYnkgdGhlIHByb3h5IGJ1dCBjYW4gYmUgb3ZlcnJpZGRlbilcbiAqIEByZXR1cm5zIHtQcm9taXNlfSBBIFByb21pc2Ugb2JqZWN0IHJlcHJlc2VudHMgdGhlIHtzdHJpbmd9IFxuICovXG5leHBvcnQgY29uc3QgZmV0Y2hEYXRhc2V0ID0gYXN5bmMgKGFkZHJlc3MsIGNvbmZpZyA9IHt9KSA9PiB7XG5cbiAgICBpZiAoIWNvbmZpZy53ZWIzKSB7XG4gICAgICAgIHRocm93IHBqc0Vycm9yKFdFQjNfUkVRVUlSRUQpO1xuICAgIH1cbiAgICBcbiAgICBpZiAoIWNvbmZpZy5jb250cmFjdHMgfHwgIWNvbmZpZy5jb250cmFjdHMuQ29nbml0aXZlSm9iIHx8ICFjb25maWcuY29udHJhY3RzLkNvZ25pdGl2ZUpvYi5hYmkpIHtcbiAgICAgICAgdGhyb3cgcGpzRXJyb3IoQ09OVFJBQ1RfUkVRVUlSRUQsICdDb2duaXRpdmVKb2InKTtcbiAgICB9XG5cbiAgICBjb25zdCBjb2cgPSBuZXcgY29uZmlnLndlYjMuZXRoLkNvbnRyYWN0KGNvbmZpZy5jb250cmFjdHMuQ29nbml0aXZlSm9iLmFiaSwgYWRkcmVzcyk7XG4gICAgY29uc3QgZGF0YXNldCA9IGF3YWl0IGNvZy5tZXRob2RzXG4gICAgICAgIC5kYXRhc2V0KClcbiAgICAgICAgLmNhbGwoKTtcbiAgICByZXR1cm4gU3RyaW5nKGRhdGFzZXQpO1xufTtcblxuLyoqXG4gKiBHZXQgam9iIGJhdGNoZXMgY291bnQgZnJvbSBDb2duaXRpdmUgSm9iIGNvbnRyYWN0IGJ5IHRoZSBqb2IgYWRkcmVzc1xuICogXG4gKiBAcGFyYW0ge3N0cmluZ30gYWRkcmVzcyBcbiAqIEBwYXJhbSB7T2JqZWN0fSBjb25maWcgTGlicmFyeSBjb25maWcgKHByb3ZpZGVkIGJ5IHRoZSBwcm94eSBidXQgY2FuIGJlIG92ZXJyaWRkZW4pXG4gKiBAcmV0dXJucyB7UHJvbWlzZX0gQSBQcm9taXNlIG9iamVjdCByZXByZXNlbnRzIHRoZSB7bnVtYmVyfSBcbiAqL1xuZXhwb3J0IGNvbnN0IGZldGNoQmF0Y2hlcyA9IGFzeW5jIChhZGRyZXNzLCBjb25maWcgPSB7fSkgPT4ge1xuXG4gICAgaWYgKCFjb25maWcud2ViMykge1xuICAgICAgICB0aHJvdyBwanNFcnJvcihXRUIzX1JFUVVJUkVEKTtcbiAgICB9XG4gICAgXG4gICAgaWYgKCFjb25maWcuY29udHJhY3RzIHx8ICFjb25maWcuY29udHJhY3RzLkNvZ25pdGl2ZUpvYiB8fCAhY29uZmlnLmNvbnRyYWN0cy5Db2duaXRpdmVKb2IuYWJpKSB7XG4gICAgICAgIHRocm93IHBqc0Vycm9yKENPTlRSQUNUX1JFUVVJUkVELCAnQ29nbml0aXZlSm9iJyk7XG4gICAgfVxuXG4gICAgY29uc3QgY29nID0gbmV3IGNvbmZpZy53ZWIzLmV0aC5Db250cmFjdChjb25maWcuY29udHJhY3RzLkNvZ25pdGl2ZUpvYi5hYmksIGFkZHJlc3MpO1xuICAgIGNvbnN0IGJhdGNoZXMgPSBhd2FpdCBjb2cubWV0aG9kc1xuICAgICAgICAuYmF0Y2hlcygpXG4gICAgICAgIC5jYWxsKCk7XG4gICAgcmV0dXJuIE51bWJlci5wYXJzZUludChiYXRjaGVzLCAxMCk7XG59O1xuXG4vKipcbiAqIEdldCBqb2IgcHJvZ3Jlc3MgZnJvbSBDb2duaXRpdmUgSm9iIGNvbnRyYWN0IGJ5IHRoZSBqb2IgYWRkcmVzc1xuICogXG4gKiBAcGFyYW0ge3N0cmluZ30gYWRkcmVzcyBcbiAqIEBwYXJhbSB7T2JqZWN0fSBjb25maWcgTGlicmFyeSBjb25maWcgKHByb3ZpZGVkIGJ5IHRoZSBwcm94eSBidXQgY2FuIGJlIG92ZXJyaWRkZW4pXG4gKiBAcmV0dXJucyB7UHJvbWlzZX0gQSBQcm9taXNlIG9iamVjdCByZXByZXNlbnRzIHRoZSB7bnVtYmVyfSBcbiAqL1xuZXhwb3J0IGNvbnN0IGZldGNoUHJvZ3Jlc3MgPSBhc3luYyAoYWRkcmVzcywgY29uZmlnID0ge30pID0+IHtcblxuICAgIGlmICghY29uZmlnLndlYjMpIHtcbiAgICAgICAgdGhyb3cgcGpzRXJyb3IoV0VCM19SRVFVSVJFRCk7XG4gICAgfVxuICAgIFxuICAgIGlmICghY29uZmlnLmNvbnRyYWN0cyB8fCAhY29uZmlnLmNvbnRyYWN0cy5Db2duaXRpdmVKb2IgfHwgIWNvbmZpZy5jb250cmFjdHMuQ29nbml0aXZlSm9iLmFiaSkge1xuICAgICAgICB0aHJvdyBwanNFcnJvcihDT05UUkFDVF9SRVFVSVJFRCwgJ0NvZ25pdGl2ZUpvYicpO1xuICAgIH1cblxuICAgIGNvbnN0IGNvZyA9IG5ldyBjb25maWcud2ViMy5ldGguQ29udHJhY3QoY29uZmlnLmNvbnRyYWN0cy5Db2duaXRpdmVKb2IuYWJpLCBhZGRyZXNzKTtcbiAgICBjb25zdCBwcm9ncmVzcyA9IGF3YWl0IGNvZy5tZXRob2RzXG4gICAgICAgIC5wcm9ncmVzcygpXG4gICAgICAgIC5jYWxsKCk7XG4gICAgcmV0dXJuIE51bWJlci5wYXJzZUludChwcm9ncmVzcywgMTApO1xufTtcblxuLyoqXG4gKiBHZXQgam9iJ3MgaXBmc1Jlc3VsdHMgZnJvbSBDb2duaXRpdmUgSm9iIGNvbnRyYWN0IGJ5IHRoZSBqb2IgYWRkcmVzc1xuICogXG4gKiBAcGFyYW0ge3N0cmluZ30gYWRkcmVzcyBcbiAqIEBwYXJhbSB7T2JqZWN0fSBjb25maWcgTGlicmFyeSBjb25maWcgKHByb3ZpZGVkIGJ5IHRoZSBwcm94eSBidXQgY2FuIGJlIG92ZXJyaWRkZW4pXG4gKiBAcmV0dXJucyB7UHJvbWlzZX0gQSBQcm9taXNlIG9iamVjdCByZXByZXNlbnRzIHRoZSB7c3RyaW5nW119IFxuICovXG5leHBvcnQgY29uc3QgZmV0Y2hJcGZzUmVzdWx0cyA9IGFzeW5jIChhZGRyZXNzLCBjb25maWcgPSB7fSkgPT4ge1xuXG4gICAgaWYgKCFjb25maWcud2ViMykge1xuICAgICAgICB0aHJvdyBwanNFcnJvcihXRUIzX1JFUVVJUkVEKTtcbiAgICB9XG4gICAgXG4gICAgaWYgKCFjb25maWcuY29udHJhY3RzIHx8ICFjb25maWcuY29udHJhY3RzLkNvZ25pdGl2ZUpvYiB8fCAhY29uZmlnLmNvbnRyYWN0cy5Db2duaXRpdmVKb2IuYWJpKSB7XG4gICAgICAgIHRocm93IHBqc0Vycm9yKENPTlRSQUNUX1JFUVVJUkVELCAnQ29nbml0aXZlSm9iJyk7XG4gICAgfVxuXG4gICAgY29uc3QgY29nID0gbmV3IGNvbmZpZy53ZWIzLmV0aC5Db250cmFjdChjb25maWcuY29udHJhY3RzLkNvZ25pdGl2ZUpvYi5hYmksIGFkZHJlc3MpO1xuICAgIGNvbnN0IGlwZnNSZXN1bHRzID0gYXdhaXQgY29nLm1ldGhvZHNcbiAgICAgICAgLmlwZnNSZXN1bHRzKClcbiAgICAgICAgLmNhbGwoKTtcbiAgICByZXR1cm4gaXBmc1Jlc3VsdHM7XG59O1xuXG4vKipcbiAqIEdldCBqb2IgYnkgdGhlIGpvYiBhZGRyZXNzXG4gKiBcbiAqIEBwYXJhbSB7c3RyaW5nfSBhZGRyZXNzIFxuICogQHBhcmFtIHtPYmplY3R9IGNvbmZpZyBMaWJyYXJ5IGNvbmZpZyAocHJvdmlkZWQgYnkgdGhlIHByb3h5IGJ1dCBjYW4gYmUgb3ZlcnJpZGRlbilcbiAqIEByZXR1cm5zIHtQcm9taXNlfSBBIFByb21pc2Ugb2JqZWN0IHJlcHJlc2VudHMgdGhlIHtPYmplY3R9IFxuICovXG5leHBvcnQgY29uc3QgZmV0Y2hKb2IgPSBhc3luYyAoYWRkcmVzcywgY29uZmlnID0ge30pID0+IHtcblxuICAgIHRyeSB7XG5cbiAgICAgICAgY29uc3Qgc3RhdGUgPSBhd2FpdCBmZXRjaFN0YXRlKGFkZHJlc3MsIGNvbmZpZyk7XG4gICAgICAgIGNvbnN0IGtlcm5lbCA9IGF3YWl0IGZldGNoS2VybmVsKGFkZHJlc3MsIGNvbmZpZyk7XG4gICAgICAgIGNvbnN0IGRhdGFzZXQgPSBhd2FpdCBmZXRjaERhdGFzZXQoYWRkcmVzcywgY29uZmlnKTtcbiAgICAgICAgY29uc3QgYmF0Y2hlcyA9IGF3YWl0IGZldGNoQmF0Y2hlcyhhZGRyZXNzLCBjb25maWcpO1xuICAgICAgICBjb25zdCBwcm9ncmVzcyA9IGF3YWl0IGZldGNoUHJvZ3Jlc3MoYWRkcmVzcywgY29uZmlnKTtcbiAgICAgICAgY29uc3QgaXBmc1Jlc3VsdHMgPSBhd2FpdCBmZXRjaElwZnNSZXN1bHRzKGFkZHJlc3MsIGNvbmZpZyk7XG4gICAgICAgIFxuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgYWRkcmVzczogYWRkcmVzcyxcbiAgICAgICAgICAgIGpvYlN0YXR1czogc3RhdGUsXG4gICAgICAgICAgICBrZXJuZWw6IGtlcm5lbCxcbiAgICAgICAgICAgIGRhdGFzZXQ6IGRhdGFzZXQsXG4gICAgICAgICAgICBiYXRjaGVzOiBiYXRjaGVzLFxuICAgICAgICAgICAgcHJvZ3Jlc3M6IHByb2dyZXNzLFxuICAgICAgICAgICAgaXBmc1Jlc3VsdHM6IGlwZnNSZXN1bHRzLFxuICAgICAgICAgICAgYWN0aXZlV29ya2Vyc0NvdW50OiBiYXRjaGVzXG4gICAgICAgIH07XG4gICAgfSBjYXRjaChlcnIpIHtcbiAgICAgICAgcmV0dXJuIFByb21pc2UucmVqZWN0KGVycik7XG4gICAgfVxufTtcblxuLyoqXG4gKiBHZXQgYWxsIGpvYnNcbiAqIFxuICogQHBhcmFtIHtPYmplY3R9IGNvbmZpZyBMaWJyYXJ5IGNvbmZpZyAocHJvdmlkZWQgYnkgdGhlIHByb3h5IGJ1dCBjYW4gYmUgb3ZlcnJpZGRlbilcbiAqIEByZXR1cm5zIHtQcm9taXNlfSBBIFByb21pc2Ugb2JqZWN0IHJlcHJlc2VudHMgdGhlIHtPYmplY3RbXX0gXG4gKi9cbmV4cG9ydCBjb25zdCBmZXRjaEFsbCA9IGFzeW5jIChjb25maWcgPSB7fSkgPT4ge1xuICAgIGxldCByZWNvcmRzID0gW107XG4gICAgbGV0IGVycm9yID0gW107XG5cbiAgICB0cnkge1xuXG4gICAgICAgIGNvbnN0IGNvdW50ID0gYXdhaXQgZmV0Y2hBY3RpdmVDb3VudChjb25maWcpOyAgICBcblxuICAgICAgICBmb3IgKGxldCBpPTA7IGkgPCBjb3VudDsgaSsrKSB7XG4gICAgICAgICAgICBcbiAgICAgICAgICAgIGNvbnN0IGFkZHJlc3MgPSBhd2FpdCBmZXRjaEFkZHJlc3NCeUlkKGksIGNvbmZpZyk7XG5cbiAgICAgICAgICAgIHRyeSB7XG5cbiAgICAgICAgICAgICAgICBjb25zdCBqb2IgPSBhd2FpdCBmZXRjaEpvYihhZGRyZXNzLCBjb25maWcpO1xuXG4gICAgICAgICAgICAgICAgcmVjb3Jkcy5wdXNoKHtcbiAgICAgICAgICAgICAgICAgICAgaWQ6IGksXG4gICAgICAgICAgICAgICAgICAgIC4uLmpvYlxuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfSBjYXRjaChlcnIpIHtcbiAgICAgICAgICAgICAgICBlcnJvci5wdXNoKHtcbiAgICAgICAgICAgICAgICAgICAgYWRkcmVzcyxcbiAgICAgICAgICAgICAgICAgICAgbWVzc2FnZTogZXJyLm1lc3NhZ2VcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH0gICAgICAgIFxuICAgICAgICB9XG4gICAgfSBjYXRjaChlcnIpIHtcbiAgICAgICAgZXJyb3IucHVzaCh7XG4gICAgICAgICAgICBlcnJvcjogZXJyLm1lc3NhZ2VcbiAgICAgICAgfSk7XG4gICAgfSAgIFxuXG4gICAgcmV0dXJuIHtcbiAgICAgICAgcmVjb3JkcyxcbiAgICAgICAgZXJyb3JcbiAgICB9O1xufTtcblxuLyoqXG4gKiBHZXQgam9iIHN0b3JlXG4gKiBcbiAqIEBwYXJhbSB7c3RyaW5nfSBhZGRyZXNzIFxuICogQHBhcmFtIHtPYmplY3R9IGNvbmZpZyBMaWJyYXJ5IGNvbmZpZyAocHJvdmlkZWQgYnkgdGhlIHByb3h5IGJ1dCBjYW4gYmUgb3ZlcnJpZGRlbilcbiAqIEByZXR1cm5zIHtQcm9taXNlfSBBIFByb21pc2Ugb2JqZWN0IHJlcHJlc2VudHMgdGhlIHtPYmplY3R9IFxuICovXG5leHBvcnQgY29uc3QgZmV0Y2hKb2JTdG9yZSA9IGFzeW5jIChhZGRyZXNzLCBjb25maWcgPSB7fSkgPT4ge1xuXG4gICAgdHJ5IHtcblxuICAgICAgICBjb25zdCBqb2IgPSBhd2FpdCBmZXRjaEpvYihhZGRyZXNzLCBjb25maWcpO1xuICAgICAgICBjb25zdCBrZXJuZWwgPSBhd2FpdCBmZXRjaElwZnNBZGRyZXNzQnlLZXJuZWxBZGRyZXNzKGpvYi5rZXJuZWwsIGNvbmZpZyk7XG4gICAgICAgIGNvbnN0IGRhdGFzZXQgPSBhd2FpdCBmZXRjaERhdGFzZXRCeURhdGFzZXRBZGRyZXNzKGpvYi5kYXRhc2V0LCBjb25maWcpO1xuICAgICAgICBcbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgIGpvYixcbiAgICAgICAgICAgIGtlcm5lbCxcbiAgICAgICAgICAgIGRhdGFzZXRcbiAgICAgICAgfTtcbiAgICB9IGNhdGNoKGVycikge1xuICAgICAgICByZXR1cm4gUHJvbWlzZS5yZWplY3QoZXJyKTtcbiAgICB9XG59O1xuXG4vKipcbiAqIENyZWF0ZSBjb2duaXRpdmUgam9iIGNvbnRyYWN0XG4gKiBcbiAqIEBwYXJhbSB7U3RyaW5nfSBrZXJuZWxBZGRyZXNzIFxuICogQHBhcmFtIHtTdHJpbmd9IGRhdGFzZXRBZGRyZXNzIFxuICogQHBhcmFtIHtTdHJpbmd9IGZyb21cbiAqIEBwYXJhbSB7T2JqZWN0fSBjb25maWcgTGlicmFyeSBjb25maWcgKHByb3ZpZGVkIGJ5IHRoZSBwcm94eSBidXQgY2FuIGJlIG92ZXJyaWRkZW4pXG4gKiBAcmV0dXJucyB7UHJvbWlzZX0gUHJvbWlzZSBvYmplY3QgcmVzb2x2ZWQgdG8gYWRkIHN0YXR1cyAoYm9vbGVhbilcbiAqL1xuZXhwb3J0IGNvbnN0IGNyZWF0ZSA9IChrZXJuZWxBZGRyZXNzLCBkYXRhc2V0QWRkcmVzcywgZnJvbSwgY29uZmlnID0ge30pID0+IG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcblxuICAgIGlmICghY29uZmlnLndlYjMpIHtcbiAgICAgICAgdGhyb3cgcGpzRXJyb3IoV0VCM19SRVFVSVJFRCk7XG4gICAgfVxuXG4gICAgaWYgKCFjb25maWcuY29udHJhY3RzIHx8ICFjb25maWcuY29udHJhY3RzLlBhbmRvcmEgfHwgIWNvbmZpZy5jb250cmFjdHMuUGFuZG9yYS5hYmkpIHtcbiAgICAgICAgdGhyb3cgcGpzRXJyb3IoQ09OVFJBQ1RfUkVRVUlSRUQsICdQYW5kb3JhJyk7XG4gICAgfVxuXG4gICAgaWYgKCFjb25maWcuYWRkcmVzc2VzIHx8ICFjb25maWcuYWRkcmVzc2VzLnBhbmRvcmEpIHtcbiAgICAgICAgdGhyb3cgcGpzRXJyb3IoQUREUkVTU19SRVFVSVJFRCwgJ1BhbmRvcmEnKTtcbiAgICB9XG5cbiAgICBjb25zdCBwYW4gPSBuZXcgY29uZmlnLndlYjMuZXRoLkNvbnRyYWN0KGNvbmZpZy5jb250cmFjdHMuUGFuZG9yYS5hYmksIGNvbmZpZy5hZGRyZXNzZXMucGFuZG9yYSk7XG4gICAgcGFuLm1ldGhvZHNcbiAgICAgICAgLmNyZWF0ZUNvZ25pdGl2ZUpvYihrZXJuZWxBZGRyZXNzLCBkYXRhc2V0QWRkcmVzcylcbiAgICAgICAgLnNlbmQoe1xuICAgICAgICAgICAgZnJvbVxuICAgICAgICB9KVxuICAgICAgICAub24oJ2Vycm9yJywgcmVqZWN0KVxuICAgICAgICAub24oJ3JlY2VpcHQnLCByZWNlaXB0ID0+IHJlc29sdmUocmVjZWlwdC5jb250cmFjdEFkZHJlc3MpKTtcbn0pO1xuXG4vKipcbiAqIEhhbmRsZSBldmVudCBDb2duaXRpdmVKb2JDcmVhdGVkXG4gKiBcbiAqIEBwYXJhbSB7RnVuY3Rpb259IHN0b3JlQ2FsbGJhY2sgXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBlcnJvckNhbGxiYWNrXG4gKiBAcGFyYW0ge09iamVjdH0gY29uZmlnIExpYnJhcnkgY29uZmlnIChwcm92aWRlZCBieSB0aGUgcHJveHkgYnV0IGNhbiBiZSBvdmVycmlkZGVuKVxuICovXG5leHBvcnQgY29uc3QgZXZlbnRDb2duaXRpdmVKb2JDcmVhdGVkID0gKHN0b3JlQ2FsbGJhY2sgPSAoKSA9PiB7fSwgZXJyb3JDYWxsYmFjayA9ICgpID0+IHt9LCBjb25maWcgPSB7fSkgPT4ge1xuXG4gICAgaWYgKCFjb25maWcud2ViMykge1xuICAgICAgICB0aHJvdyBwanNFcnJvcihXRUIzX1JFUVVJUkVEKTtcbiAgICB9XG5cbiAgICBpZiAoIWNvbmZpZy5jb250cmFjdHMgfHwgIWNvbmZpZy5jb250cmFjdHMuUGFuZG9yYSB8fCAhY29uZmlnLmNvbnRyYWN0cy5QYW5kb3JhLmFiaSkge1xuICAgICAgICB0aHJvdyBwanNFcnJvcihDT05UUkFDVF9SRVFVSVJFRCwgJ1BhbmRvcmEnKTtcbiAgICB9XG5cbiAgICBpZiAoIWNvbmZpZy5hZGRyZXNzZXMgfHwgIWNvbmZpZy5hZGRyZXNzZXMucGFuZG9yYSkge1xuICAgICAgICB0aHJvdyBwanNFcnJvcihBRERSRVNTX1JFUVVJUkVELCAnUGFuZG9yYScpO1xuICAgIH1cblxuICAgIGNvbnN0IHBhbiA9IG5ldyBjb25maWcud2ViMy5ldGguQ29udHJhY3QoY29uZmlnLmNvbnRyYWN0cy5QYW5kb3JhLmFiaSwgY29uZmlnLmFkZHJlc3Nlcy5wYW5kb3JhKTtcbiAgICBwYW4uZXZlbnRzLkNvZ25pdGl2ZUpvYkNyZWF0ZWQoe1xuICAgICAgICBmcm9tQmxvY2s6IDBcbiAgICB9KVxuICAgICAgICAub24oJ2RhdGEnLCBhc3luYyByZXMgPT4ge1xuXG4gICAgICAgICAgICB0cnkge1xuXG4gICAgICAgICAgICAgICAgY29uc3Qgc3RvcmUgPSBhd2FpdCBmZXRjaEpvYlN0b3JlKHJlcy5hcmdzLmNvZ25pdGl2ZUpvYik7XG4gICAgICAgICAgICAgICAgc3RvcmVDYWxsYmFjayh7XG4gICAgICAgICAgICAgICAgICAgIGFkZHJlc3M6IHJlcy5hcmdzLmNvZ25pdGl2ZUpvYixcbiAgICAgICAgICAgICAgICAgICAgc3RvcmUsXG4gICAgICAgICAgICAgICAgICAgIHN0YXR1czogJ2NyZWF0ZWQnLFxuICAgICAgICAgICAgICAgICAgICBldmVudDogJ1BhbmRvcmEuQ29nbml0aXZlSm9iQ3JlYXRlZCdcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH0gY2F0Y2goZXJyKSB7XG4gICAgICAgICAgICAgICAgZXJyb3JDYWxsYmFjayhlcnIpO1xuICAgICAgICAgICAgfSAgICAgICAgICAgIFxuICAgICAgICB9KVxuICAgICAgICAub24oJ2Vycm9yJywgZXJyb3JDYWxsYmFjayk7XG59O1xuXG4vKipcbiAqIEhhbmRsZSBldmVudCBTdGF0ZUNoYW5nZWQgZm9yIENvZ25pdGl2ZUpvYlxuICogXG4gKiBAcGFyYW0ge3N0cmluZ30gYWRkcmVzc1xuICogQHBhcmFtIHtGdW5jdGlvbn0gc3RvcmVDYWxsYmFjayBcbiAqIEBwYXJhbSB7RnVuY3Rpb259IGVycm9yQ2FsbGJhY2tcbiAqIEBwYXJhbSB7T2JqZWN0fSBjb25maWcgTGlicmFyeSBjb25maWcgKHByb3ZpZGVkIGJ5IHRoZSBwcm94eSBidXQgY2FuIGJlIG92ZXJyaWRkZW4pXG4gKiBAcmV0dXJucyB7UHJvbWlzZX0gQSBQcm9taXNlIG9iamVjdCByZXByZXNlbnRzIHRoZSB7T2JqZWN0fSBcbiAqL1xuZXhwb3J0IGNvbnN0IGV2ZW50Q29nbml0aXZlSm9iU3RhdGVDaGFuZ2VkID0gKGFkZHJlc3MsIHN0b3JlQ2FsbGJhY2sgPSAoKSA9PiB7fSwgZXJyb3JDYWxsYmFjayA9ICgpID0+IHt9LCBjb25maWcgPSB7fSkgPT4ge1xuXG4gICAgaWYgKCFjb25maWcud2ViMykge1xuICAgICAgICB0aHJvdyBwanNFcnJvcihXRUIzX1JFUVVJUkVEKTtcbiAgICB9XG5cbiAgICBpZiAoIWNvbmZpZy5jb250cmFjdHMgfHwgIWNvbmZpZy5jb250cmFjdHMuQ29nbml0aXZlSm9iIHx8ICFjb25maWcuY29udHJhY3RzLkNvZ25pdGl2ZUpvYi5hYmkpIHtcbiAgICAgICAgdGhyb3cgcGpzRXJyb3IoQ09OVFJBQ1RfUkVRVUlSRUQsICdDb2duaXRpdmVKb2InKTtcbiAgICB9XG5cbiAgICBjb25zdCBjb2cgPSBuZXcgY29uZmlnLndlYjMuZXRoLkNvbnRyYWN0KGNvbmZpZy5jb250cmFjdHMuQ29nbml0aXZlSm9iLmFiaSwgYWRkcmVzcyk7XG4gICAgY29nLmV2ZW50cy5TdGF0ZUNoYW5nZWQoe1xuICAgICAgICBmcm9tQmxvY2s6IDBcbiAgICB9KVxuICAgICAgICAub24oJ2RhdGEnLCBhc3luYyByZXMgPT4ge1xuXG4gICAgICAgICAgICB0cnkge1xuXG4gICAgICAgICAgICAgICAgY29uc3Qgc3RvcmUgPSBhd2FpdCBmZXRjaEpvYlN0b3JlKHJlcy5hcmdzLmNvZ25pdGl2ZUpvYik7XG4gICAgICAgICAgICAgICAgc3RvcmVDYWxsYmFjayh7XG4gICAgICAgICAgICAgICAgICAgIGFkZHJlc3M6IHJlcy5hcmdzLmNvZ25pdGl2ZUpvYixcbiAgICAgICAgICAgICAgICAgICAgc3RvcmUsXG4gICAgICAgICAgICAgICAgICAgIHN0YXR1czogJ2NoYW5nZWQnLFxuICAgICAgICAgICAgICAgICAgICBldmVudDogJ0NvZ25pdGl2ZUpvYi5TdGF0ZUNoYW5nZWQnXG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9IGNhdGNoKGVycikge1xuICAgICAgICAgICAgICAgIGVycm9yQ2FsbGJhY2soZXJyKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSlcbiAgICAgICAgLm9uKCdlcnJvcicsIGVycm9yQ2FsbGJhY2spO1xufTtcbiJdfQ==