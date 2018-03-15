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
exports.fetchAll = exports.fetchKernel = exports.fetchComplexity = exports.fetchCurrentPrice = exports.fetchDataDim = exports.fetchIpfsAddress = exports.fetchAddressById = void 0;

var _errors = _interopRequireWildcard(require("./helpers/errors"));

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

/**
 * Get Kernel address by kernel id
 * 
 * @param {number} id
 * @param {Object} config Librray config (provided by the proxy but can be overridden)
 * @returns {Promise} A Promise object represents the {string}
 */
const fetchAddressById = async (id, config) => {
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
 * @param {Object} config Librray config (provided by the proxy but can be overridden)
 * @returns {Promise} A Promise object represents the {string}
 */


exports.fetchAddressById = fetchAddressById;

const fetchIpfsAddress = async (address = '', config = {}) => {
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
 * @param {Object} config Librray config (provided by the proxy but can be overridden)
 * @returns {Promise} A Promise object represents the {number}
 */


exports.fetchIpfsAddress = fetchIpfsAddress;

const fetchDataDim = async (address = '', config = {}) => {
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
 * @param {Object} config Librray config (provided by the proxy but can be overridden)
 * @returns {Promise} A Promise object represents the {number}
 */


exports.fetchDataDim = fetchDataDim;

const fetchCurrentPrice = async (address = '', config = {}) => {
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
 * @param {Object} config Librray config (provided by the proxy but can be overridden)
 * @returns {Promise} A Promise object represents the {number}
 */


exports.fetchCurrentPrice = fetchCurrentPrice;

const fetchComplexity = async (address = '', config = {}) => {
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
 * @param {Object} config Librray config (provided by the proxy but can be overridden)
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
      address: address,
      ipfsAddress: ipfsAddress,
      dataDim: dataDim,
      currentPrice: currentPrice,
      complexity: complexity
    };
  } catch (err) {
    return Promise.reject(err);
  }
};
/**
 * Get all kernels
 * 
 * @param {Object} config Librray config (provided by the proxy but can be overridden)
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
        records.push({
          id: id,
          ...kernelObj
        });
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

exports.fetchAll = fetchAll;