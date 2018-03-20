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
var fetchActiveCount = async function fetchActiveCount() {
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
  var count = await pan.methods.activeJobsCount().call();
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
  var jobAddress = await pan.methods.activeJobs(id).call();
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

var fetchState = async function fetchState(address) {
  var config = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

  if (!config.web3) {
    throw (0, _errors.default)(_errors.WEB3_REQUIRED);
  }

  if (!config.contracts || !config.contracts.CognitiveJob || !config.contracts.CognitiveJob.abi) {
    throw (0, _errors.default)(_errors.CONTRACT_REQUIRED, 'CognitiveJob');
  }

  var cog = new config.web3.eth.Contract(config.contracts.CognitiveJob.abi, address);
  var state = await cog.methods.currentState().call();
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

var fetchKernel = async function fetchKernel(address) {
  var config = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

  if (!config.web3) {
    throw (0, _errors.default)(_errors.WEB3_REQUIRED);
  }

  if (!config.contracts || !config.contracts.CognitiveJob || !config.contracts.CognitiveJob.abi) {
    throw (0, _errors.default)(_errors.CONTRACT_REQUIRED, 'CognitiveJob');
  }

  var cog = new config.web3.eth.Contract(config.contracts.CognitiveJob.abi, address);
  var kernel = await cog.methods.kernel().call();
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

var fetchDataset = async function fetchDataset(address) {
  var config = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

  if (!config.web3) {
    throw (0, _errors.default)(_errors.WEB3_REQUIRED);
  }

  if (!config.contracts || !config.contracts.CognitiveJob || !config.contracts.CognitiveJob.abi) {
    throw (0, _errors.default)(_errors.CONTRACT_REQUIRED, 'CognitiveJob');
  }

  var cog = new config.web3.eth.Contract(config.contracts.CognitiveJob.abi, address);
  var dataset = await cog.methods.dataset().call();
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

var fetchBatches = async function fetchBatches(address) {
  var config = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

  if (!config.web3) {
    throw (0, _errors.default)(_errors.WEB3_REQUIRED);
  }

  if (!config.contracts || !config.contracts.CognitiveJob || !config.contracts.CognitiveJob.abi) {
    throw (0, _errors.default)(_errors.CONTRACT_REQUIRED, 'CognitiveJob');
  }

  var cog = new config.web3.eth.Contract(config.contracts.CognitiveJob.abi, address);
  var batches = await cog.methods.batches().call();
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

var fetchProgress = async function fetchProgress(address) {
  var config = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

  if (!config.web3) {
    throw (0, _errors.default)(_errors.WEB3_REQUIRED);
  }

  if (!config.contracts || !config.contracts.CognitiveJob || !config.contracts.CognitiveJob.abi) {
    throw (0, _errors.default)(_errors.CONTRACT_REQUIRED, 'CognitiveJob');
  }

  var cog = new config.web3.eth.Contract(config.contracts.CognitiveJob.abi, address);
  var progress = await cog.methods.progress().call();
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

var fetchIpfsResults = async function fetchIpfsResults(address) {
  var config = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

  if (!config.web3) {
    throw (0, _errors.default)(_errors.WEB3_REQUIRED);
  }

  if (!config.contracts || !config.contracts.CognitiveJob || !config.contracts.CognitiveJob.abi) {
    throw (0, _errors.default)(_errors.CONTRACT_REQUIRED, 'CognitiveJob');
  }

  var cog = new config.web3.eth.Contract(config.contracts.CognitiveJob.abi, address);
  var ipfsResults = await cog.methods.ipfsResults().call();
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

var fetchJob = async function fetchJob(address) {
  var config = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

  try {
    var state = await fetchState(address, config);
    var kernel = await fetchKernel(address, config);
    var dataset = await fetchDataset(address, config);
    var batches = await fetchBatches(address, config);
    var progress = await fetchProgress(address, config);
    var ipfsResults = await fetchIpfsResults(address, config);
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

var fetchAll = async function fetchAll() {
  var config = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  var records = [];
  var error = [];

  try {
    var count = await fetchActiveCount(config);

    for (var i = 0; i < count; i++) {
      var address = await fetchAddressById(i, config);

      try {
        var job = await fetchJob(address, config);
        records.push(_objectSpread({
          id: i
        }, job));
      } catch (err) {
        error.push({
          address: address,
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
 * Get job store
 * 
 * @param {string} address 
 * @param {Object} config Library config (provided by the proxy but can be overridden)
 * @returns {Promise} A Promise object represents the {Object} 
 */


exports.fetchAll = fetchAll;

var fetchJobStore = async function fetchJobStore(address) {
  var config = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

  try {
    var job = await fetchJob(address, config);
    var kernel = await (0, _kernels.fetchIpfsAddress)(job.kernel, config);
    var dataset = await (0, _datasets.fetchDataset)(job.dataset, config);
    return {
      job: job,
      kernel: kernel,
      dataset: dataset
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

var create = function create(kernelAddress, datasetAddress, from) {
  var config = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : {};
  return new Promise(function (resolve, reject) {
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
    pan.methods.createCognitiveJob(kernelAddress, datasetAddress).send({
      from: from
    }).on('error', reject).on('receipt', function (receipt) {
      return resolve(receipt.contractAddress);
    });
  });
};
/**
 * Handle event CognitiveJobCreated
 * 
 * @param {Function} storeCallback 
 * @param {Function} errorCallback
 * @param {Object} config Library config (provided by the proxy but can be overridden)
 */


exports.create = create;

var eventCognitiveJobCreated = function eventCognitiveJobCreated() {
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
  pan.events.CognitiveJobCreated({
    fromBlock: 0
  }).on('data', async function (res) {
    try {
      var store = await fetchJobStore(res.args.cognitiveJob);
      storeCallback({
        address: res.args.cognitiveJob,
        store: store,
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

var eventCognitiveJobStateChanged = function eventCognitiveJobStateChanged(address) {
  var storeCallback = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : function () {};
  var errorCallback = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : function () {};
  var config = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : {};

  if (!config.web3) {
    throw (0, _errors.default)(_errors.WEB3_REQUIRED);
  }

  if (!config.contracts || !config.contracts.CognitiveJob || !config.contracts.CognitiveJob.abi) {
    throw (0, _errors.default)(_errors.CONTRACT_REQUIRED, 'CognitiveJob');
  }

  var cog = new config.web3.eth.Contract(config.contracts.CognitiveJob.abi, address);
  cog.events.StateChanged({
    fromBlock: 0
  }).on('data', async function (res) {
    try {
      var store = await fetchJobStore(res.args.cognitiveJob);
      storeCallback({
        address: res.args.cognitiveJob,
        store: store,
        status: 'changed',
        event: 'CognitiveJob.StateChanged'
      });
    } catch (err) {
      errorCallback(err);
    }
  }).on('error', errorCallback);
};

exports.eventCognitiveJobStateChanged = eventCognitiveJobStateChanged;