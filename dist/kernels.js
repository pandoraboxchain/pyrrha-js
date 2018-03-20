/**
 * Kernels related methods
 * This file it is a part of the Pandora Pyrrha Javascript library
 * 
 * @file kernels.js
 * @author Kostiantyn Smyrnov <kostysh@gmail.com>
 * @date 2018
 */
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.eventKernelAdded = exports.addToMarket = exports.deploy = exports.fetchAll = exports.fetchKernel = exports.fetchComplexity = exports.fetchCurrentPrice = exports.fetchDataDim = exports.fetchIpfsAddress = exports.fetchAddressById = void 0;

var _errors = _interopRequireWildcard(require("./helpers/errors"));

var web3Helpers = _interopRequireWildcard(require("./helpers/web3"));

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; var ownKeys = Object.keys(source); if (typeof Object.getOwnPropertySymbols === 'function') { ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) { return Object.getOwnPropertyDescriptor(source, sym).enumerable; })); } ownKeys.forEach(function (key) { _defineProperty(target, key, source[key]); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

/**
 * Get Kernel address by kernel id
 * 
 * @param {number} id
 * @param {Object} config Library config (provided by the proxy but can be overridden)
 * @returns {Promise} A Promise object represents the {string}
 */
const fetchAddressById = async (id, config) => {
  if (!config.web3) {
    throw (0, _errors.default)(_errors.WEB3_REQUIRED);
  }

  if (!config.contracts || !config.contracts.PandoraMarket || !config.contracts.PandoraMarket.abi) {
    throw (0, _errors.default)(_errors.CONTRACT_REQUIRED, 'PandoraMarket');
  }

  if (!config.addresses || !config.addresses.market) {
    throw (0, _errors.default)(_errors.ADDRESS_REQUIRED, 'Market');
  }

  const mar = new config.web3.eth.Contract(config.contracts.PandoraMarket.abi, config.addresses.market);
  const kernelContract = await mar.methods.kernels(id).call();
  return kernelContract;
};
/**
 * Get IPFS address from Kernel contract by the kernel address
 * 
 * @param {string} address
 * @param {Object} config Library config (provided by the proxy but can be overridden)
 * @returns {Promise} A Promise object represents the {string}
 */


exports.fetchAddressById = fetchAddressById;

const fetchIpfsAddress = async (address = '', config = {}) => {
  if (!config.web3) {
    throw (0, _errors.default)(_errors.WEB3_REQUIRED);
  }

  if (!config.contracts || !config.contracts.Kernel || !config.contracts.Kernel.abi) {
    throw (0, _errors.default)(_errors.CONTRACT_REQUIRED, 'Kernel');
  }

  const ker = new config.web3.eth.Contract(config.contracts.Kernel.abi, address);
  const ipfsAddress = await ker.methods.ipfsAddress().call();
  return String(ipfsAddress);
};
/**
 * Get data dim from Kernel contract by the kernel address
 * 
 * @param {string} address
 * @param {Object} config Library config (provided by the proxy but can be overridden)
 * @returns {Promise} A Promise object represents the {number}
 */


exports.fetchIpfsAddress = fetchIpfsAddress;

const fetchDataDim = async (address = '', config = {}) => {
  if (!config.web3) {
    throw (0, _errors.default)(_errors.WEB3_REQUIRED);
  }

  if (!config.contracts || !config.contracts.Kernel || !config.contracts.Kernel.abi) {
    throw (0, _errors.default)(_errors.CONTRACT_REQUIRED, 'Kernel');
  }

  const ker = new config.web3.eth.Contract(config.contracts.Kernel.abi, address);
  const dataDim = await ker.methods.dataDim().call();
  return Number.parseInt(dataDim, 10);
};
/**
 * Get current price from Kernel contract by the kernel address
 * 
 * @param {string} address
 * @param {Object} config Library config (provided by the proxy but can be overridden)
 * @returns {Promise} A Promise object represents the {number}
 */


exports.fetchDataDim = fetchDataDim;

const fetchCurrentPrice = async (address = '', config = {}) => {
  if (!config.web3) {
    throw (0, _errors.default)(_errors.WEB3_REQUIRED);
  }

  if (!config.contracts || !config.contracts.Kernel || !config.contracts.Kernel.abi) {
    throw (0, _errors.default)(_errors.CONTRACT_REQUIRED, 'Kernel');
  }

  const ker = new config.web3.eth.Contract(config.contracts.Kernel.abi, address);
  const currentPrice = await ker.methods.currentPrice().call();
  return Number.parseInt(currentPrice, 10);
};
/**
 * Get complexity from Kernel contract by the kernel address
 * 
 * @param {string} address
 * @param {Object} config Library config (provided by the proxy but can be overridden)
 * @returns {Promise} A Promise object represents the {number}
 */


exports.fetchCurrentPrice = fetchCurrentPrice;

const fetchComplexity = async (address = '', config = {}) => {
  if (!config.web3) {
    throw (0, _errors.default)(_errors.WEB3_REQUIRED);
  }

  if (!config.contracts || !config.contracts.Kernel || !config.contracts.Kernel.abi) {
    throw (0, _errors.default)(_errors.CONTRACT_REQUIRED, 'Kernel');
  }

  const ker = new config.web3.eth.Contract(config.contracts.Kernel.abi, address);
  const complexity = await ker.methods.complexity().call();
  return Number.parseInt(complexity, 10);
};
/**
 * Get Kernel by the kernel address
 * 
 * @param {string} address
 * @param {Object} config Library config (provided by the proxy but can be overridden)
 * @returns {Promise} Promise object represents the {Object[]}
 */


exports.fetchComplexity = fetchComplexity;

const fetchKernel = async (address = '', config = {}) => {
  try {
    const ipfsAddress = await fetchIpfsAddress(address, config);
    const dataDim = await fetchDataDim(address, config);
    const currentPrice = await fetchCurrentPrice(address, config);
    const complexity = await fetchComplexity(address, config);
    return {
      address,
      ipfsAddress,
      dataDim,
      currentPrice,
      complexity
    };
  } catch (err) {
    return Promise.reject(err);
  }
};
/**
 * Get all kernels
 * 
 * @param {Object} config Library config (provided by the proxy but can be overridden)
 * @returns {Promise} Promise object represents the {Object[]}
 */


exports.fetchKernel = fetchKernel;

const fetchAll = async (config = {}) => {
  let id = 0;
  let records = [];
  let error = [];

  try {
    // @todo Add method getKernelsCount to the PandoraMarket contract for avoid iterating with "try catch"
    while (true) {
      const kernelAddress = await fetchAddressById(id++, config); // can be 0x0

      if (+kernelAddress === 0) {
        break;
      }

      try {
        const kernelObj = await fetchKernel(kernelAddress, config);
        records.push(_objectSpread({
          id: id
        }, kernelObj));
      } catch (err) {
        error.push({
          address: kernelAddress,
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
 * Deploy Kernel contract to the network
 * 
 * @param {string} kernelIpfsHash 
 * @param {Object} options { publisher, dimension, complexity, price } 
 * @param {Object} config Library config (provided by the proxy but can be overridden)
 * @returns {Promise} Promise object resolved to contract address
 */


exports.fetchAll = fetchAll;

const deploy = async (kernelIpfsHash, {
  publisher,
  dimension,
  complexity,
  price
}, config = {}) => {
  if (!config.web3) {
    throw (0, _errors.default)(_errors.WEB3_REQUIRED);
  }

  if (!config.contracts || !config.contracts.Kernel || !config.contracts.Kernel.abi) {
    throw (0, _errors.default)(_errors.CONTRACT_REQUIRED, 'Kernel');
  }

  try {
    const args = [config.web3.utils.toHex(kernelIpfsHash), dimension, complexity, price]; // Estimate required amount of gas

    const gas = await web3Helpers.estimateGas(config.contracts.Kernel.bytecode, args, config); // Create and deploy kernel contract

    const kernelContractAddress = await web3Helpers.deployContract(config.contracts.Kernel, {
      args,
      from: publisher,
      gas: Number.parseInt(gas * 1.5, 10)
    }, config);
    return kernelContractAddress;
  } catch (err) {
    return Promise.reject(err);
  }
};
/**
 * Add kernel to market
 * 
 * @param {String} kernelContractAddress 
 * @param {String} publisherAddress 
 * @param {Object} config Library config (provided by the proxy but can be overridden)
 * @returns {Promise} Promise object resolved to {string} contractAddress
 */


exports.deploy = deploy;

const addToMarket = (kernelContractAddress, publisherAddress, config = {}) => new Promise((resolve, reject) => {
  if (!config.web3) {
    throw (0, _errors.default)(_errors.WEB3_REQUIRED);
  }

  if (!config.contracts || !config.contracts.PandoraMarket || !config.contracts.PandoraMarket.abi) {
    throw (0, _errors.default)(_errors.CONTRACT_REQUIRED, 'PandoraMarket');
  }

  if (!config.addresses || !config.addresses.market) {
    throw (0, _errors.default)(_errors.ADDRESS_REQUIRED, 'Market');
  }

  if (!config.web3.currentProvider.isMetaMask) {
    throw (0, _errors.default)(_errors.WEB3_METAMASK_REQUIRED);
  }

  const market = new config.web3.eth.Contract(config.contracts.PandoraMarket.abi, config.addresses.market);
  market.methods.addKernel(kernelContractAddress).send({
    from: publisherAddress
  }).on('error', reject).on('receipt', receipt => resolve(receipt.contractAddress));
});
/**
 * Handle event KernelAdded
 * 
 * @param {Function} storeCallback 
 * @param {Function} errorCallback
 * @param {Object} config Library config (provided by the proxy but can be overridden)
 */


exports.addToMarket = addToMarket;

const eventKernelAdded = (storeCallback = () => {}, errorCallback = () => {}, config = {}) => {
  if (!config.web3) {
    throw (0, _errors.default)(_errors.WEB3_REQUIRED);
  }

  if (!config.contracts || !config.contracts.PandoraMarket || !config.contracts.PandoraMarket.abi) {
    throw (0, _errors.default)(_errors.CONTRACT_REQUIRED, 'PandoraMarket');
  }

  if (!config.addresses || !config.addresses.market) {
    throw (0, _errors.default)(_errors.ADDRESS_REQUIRED, 'Market');
  }

  const mar = new config.web3.eth.Contract(config.contracts.PandoraMarket.abi, config.addresses.market);
  mar.events.KernelAdded({
    fromBlock: 0
  }).on('data', async res => {
    try {
      const kernel = await fetchKernel(res.args.kernel, config);
      storeCallback({
        address: res.args.kernel,
        kernel,
        status: 'created',
        event: 'PandoraMarket.KernelAdded'
      });
    } catch (err) {
      errorCallback(err);
    }
  }).on('error', errorCallback);
};

exports.eventKernelAdded = eventKernelAdded;