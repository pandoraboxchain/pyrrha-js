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

/**
 * Get worker nodes count from Pandora contract
 * 
 * @param {Object} config Library config (provided by the proxy but can be overridden)
 * @returns {Promise} A Promise object represents the {number} 
 */
const fetchCount = async (config = {}) => {
  if (!config.contracts || !config.contracts.Pandora || !config.contracts.Pandora.abi) {
    throw (0, _errors.default)(_errors.CONTRACT_REQUIRED, 'Pandora');
  }

  if (!config.addresses || !config.addresses.pandora) {
    throw (0, _errors.default)(_errors.ADDRESS_REQUIRED, 'Pandora');
  }

  const pan = new config.web3.eth.Contract(config.contracts.Pandora.abi, config.addresses.pandora);
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
  if (!config.contracts || !config.contracts.Pandora || !config.contracts.Pandora.abi) {
    throw (0, _errors.default)(_errors.CONTRACT_REQUIRED, 'Pandora');
  }

  if (!config.addresses || !config.addresses.pandora) {
    throw (0, _errors.default)(_errors.ADDRESS_REQUIRED, 'Pandora');
  }

  const pan = new config.web3.eth.Contract(config.contracts.Pandora.abi, config.addresses.pandora);
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
    return {
      id: id,
      ...worker
    };
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
        records.push({
          id: i,
          ...worker
        });
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
  if (!config.contracts || !config.contracts.Pandora || !config.contracts.Pandora.abi) {
    throw (0, _errors.default)(_errors.CONTRACT_REQUIRED, 'Pandora');
  }

  if (!config.addresses || !config.addresses.pandora) {
    throw (0, _errors.default)(_errors.ADDRESS_REQUIRED, 'Pandora');
  }

  const pan = new config.web3.eth.Contract(config.contracts.Pandora.abi, config.addresses.pandora);
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