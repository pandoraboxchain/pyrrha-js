/**
 * Kernels related methods
 * This file it is a part of the Pandora Pyrrha Javascript library
 * 
 * @file kernels.js
 * @author Kostiantyn Smyrnov <kostysh@gmail.com>
 * @date 2018
 */

'use strict';Object.defineProperty(exports, "__esModule", { value: true });exports.eventKernelAdded = exports.addToMarket = exports.deploy = exports.fetchAll = exports.fetchKernel = exports.fetchComplexity = exports.fetchCurrentPrice = exports.fetchDataDim = exports.fetchIpfsAddress = exports.fetchAddressById = void 0;

var _errors = _interopRequireWildcard(require("./helpers/errors"));





var web3Helpers = _interopRequireWildcard(require("./helpers/web3"));function _interopRequireWildcard(obj) {if (obj && obj.__esModule) {return obj;} else {var newObj = {};if (obj != null) {for (var key in obj) {if (Object.prototype.hasOwnProperty.call(obj, key)) {var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {};if (desc.get || desc.set) {Object.defineProperty(newObj, key, desc);} else {newObj[key] = obj[key];}}}}newObj.default = obj;return newObj;}}function _objectSpread(target) {for (var i = 1; i < arguments.length; i++) {var source = arguments[i] != null ? arguments[i] : {};var ownKeys = Object.keys(source);if (typeof Object.getOwnPropertySymbols === 'function') {ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) {return Object.getOwnPropertyDescriptor(source, sym).enumerable;}));}ownKeys.forEach(function (key) {_defineProperty(target, key, source[key]);});}return target;}function _defineProperty(obj, key, value) {if (key in obj) {Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true });} else {obj[key] = value;}return obj;}

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
  const kernelContract = await mar.methods.
  kernels(id).
  call();
  return kernelContract;
};

/**
    * Get IPFS address from Kernel contract by the kernel address
    * 
    * @param {string} address
    * @param {Object} config Library config (provided by the proxy but can be overridden)
    * @returns {Promise} A Promise object represents the {string}
    */exports.fetchAddressById = fetchAddressById;
const fetchIpfsAddress = async (address = '', config = {}) => {

  if (!config.web3) {
    throw (0, _errors.default)(_errors.WEB3_REQUIRED);
  }

  if (!config.contracts || !config.contracts.Kernel || !config.contracts.Kernel.abi) {
    throw (0, _errors.default)(_errors.CONTRACT_REQUIRED, 'Kernel');
  }

  const ker = new config.web3.eth.Contract(config.contracts.Kernel.abi, address);
  const ipfsAddress = await ker.methods.
  ipfsAddress().
  call();
  return String(ipfsAddress);
};

/**
    * Get data dim from Kernel contract by the kernel address
    * 
    * @param {string} address
    * @param {Object} config Library config (provided by the proxy but can be overridden)
    * @returns {Promise} A Promise object represents the {number}
    */exports.fetchIpfsAddress = fetchIpfsAddress;
const fetchDataDim = async (address = '', config = {}) => {

  if (!config.web3) {
    throw (0, _errors.default)(_errors.WEB3_REQUIRED);
  }

  if (!config.contracts || !config.contracts.Kernel || !config.contracts.Kernel.abi) {
    throw (0, _errors.default)(_errors.CONTRACT_REQUIRED, 'Kernel');
  }

  const ker = new config.web3.eth.Contract(config.contracts.Kernel.abi, address);
  const dataDim = await ker.methods.
  dataDim().
  call();
  return Number.parseInt(dataDim, 10);
};

/**
    * Get current price from Kernel contract by the kernel address
    * 
    * @param {string} address
    * @param {Object} config Library config (provided by the proxy but can be overridden)
    * @returns {Promise} A Promise object represents the {number}
    */exports.fetchDataDim = fetchDataDim;
const fetchCurrentPrice = async (address = '', config = {}) => {

  if (!config.web3) {
    throw (0, _errors.default)(_errors.WEB3_REQUIRED);
  }

  if (!config.contracts || !config.contracts.Kernel || !config.contracts.Kernel.abi) {
    throw (0, _errors.default)(_errors.CONTRACT_REQUIRED, 'Kernel');
  }

  const ker = new config.web3.eth.Contract(config.contracts.Kernel.abi, address);
  const currentPrice = await ker.methods.
  currentPrice().
  call();
  return Number.parseInt(currentPrice, 10);
};

/**
    * Get complexity from Kernel contract by the kernel address
    * 
    * @param {string} address
    * @param {Object} config Library config (provided by the proxy but can be overridden)
    * @returns {Promise} A Promise object represents the {number}
    */exports.fetchCurrentPrice = fetchCurrentPrice;
const fetchComplexity = async (address = '', config = {}) => {

  if (!config.web3) {
    throw (0, _errors.default)(_errors.WEB3_REQUIRED);
  }

  if (!config.contracts || !config.contracts.Kernel || !config.contracts.Kernel.abi) {
    throw (0, _errors.default)(_errors.CONTRACT_REQUIRED, 'Kernel');
  }

  const ker = new config.web3.eth.Contract(config.contracts.Kernel.abi, address);
  const complexity = await ker.methods.
  complexity().
  call();
  return Number.parseInt(complexity, 10);
};

/**
    * Get Kernel by the kernel address
    * 
    * @param {string} address
    * @param {Object} config Library config (provided by the proxy but can be overridden)
    * @returns {Promise} Promise object represents the {Object[]}
    */exports.fetchComplexity = fetchComplexity;
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
      complexity };

  } catch (err) {
    return Promise.reject(err);
  }
};

/**
    * Get all kernels
    * 
    * @param {Object} config Library config (provided by the proxy but can be overridden)
    * @returns {Promise} Promise object represents the {Object[]}
    */exports.fetchKernel = fetchKernel;
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
          id: id },
        kernelObj));

      } catch (err) {

        error.push({
          address: kernelAddress,
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
    * Deploy Kernel contract to the network
    * 
    * @param {string} kernelIpfsHash 
    * @param {Object} options { publisher, dimension, complexity, price } 
    * @param {Object} config Library config (provided by the proxy but can be overridden)
    * @returns {Promise} Promise object resolved to contract address
    */exports.fetchAll = fetchAll;
const deploy = async (kernelIpfsHash, { publisher, dimension, complexity, price }, config = {}) => {

  if (!config.web3) {
    throw (0, _errors.default)(_errors.WEB3_REQUIRED);
  }

  if (!config.contracts || !config.contracts.Kernel || !config.contracts.Kernel.abi) {
    throw (0, _errors.default)(_errors.CONTRACT_REQUIRED, 'Kernel');
  }

  try {
    const args = [config.web3.utils.toHex(kernelIpfsHash), dimension, complexity, price];

    // Estimate required amount of gas
    const gas = await web3Helpers.estimateGas(config.contracts.Kernel.bytecode, args, config);

    // Create and deploy kernel contract
    const kernelContractAddress = await web3Helpers.deployContract(config.contracts.Kernel, {
      args,
      from: publisher,
      gas: Number.parseInt(gas * 1.5, 10) },
    config);

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
    */exports.deploy = deploy;
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
  market.methods.
  addKernel(kernelContractAddress).
  send({
    from: publisherAddress }).

  on('error', reject).
  on('receipt', receipt => resolve(receipt.contractAddress));
});

/**
     * Handle event KernelAdded
     * 
     * @param {Function} storeCallback 
     * @param {Function} errorCallback
     * @param {Object} config Library config (provided by the proxy but can be overridden)
     */exports.addToMarket = addToMarket;
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
    fromBlock: 0 }).

  on('data', async res => {

    try {

      const kernel = await fetchKernel(res.args.kernel, config);
      storeCallback({
        address: res.args.kernel,
        kernel,
        status: 'created',
        event: 'PandoraMarket.KernelAdded' });

    } catch (err) {
      errorCallback(err);
    }
  }).
  on('error', errorCallback);
};exports.eventKernelAdded = eventKernelAdded;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9rZXJuZWxzLmpzIl0sIm5hbWVzIjpbImZldGNoQWRkcmVzc0J5SWQiLCJpZCIsImNvbmZpZyIsIndlYjMiLCJXRUIzX1JFUVVJUkVEIiwiY29udHJhY3RzIiwiUGFuZG9yYU1hcmtldCIsImFiaSIsIkNPTlRSQUNUX1JFUVVJUkVEIiwiYWRkcmVzc2VzIiwibWFya2V0IiwiQUREUkVTU19SRVFVSVJFRCIsIm1hciIsImV0aCIsIkNvbnRyYWN0Iiwia2VybmVsQ29udHJhY3QiLCJtZXRob2RzIiwia2VybmVscyIsImNhbGwiLCJmZXRjaElwZnNBZGRyZXNzIiwiYWRkcmVzcyIsIktlcm5lbCIsImtlciIsImlwZnNBZGRyZXNzIiwiU3RyaW5nIiwiZmV0Y2hEYXRhRGltIiwiZGF0YURpbSIsIk51bWJlciIsInBhcnNlSW50IiwiZmV0Y2hDdXJyZW50UHJpY2UiLCJjdXJyZW50UHJpY2UiLCJmZXRjaENvbXBsZXhpdHkiLCJjb21wbGV4aXR5IiwiZmV0Y2hLZXJuZWwiLCJlcnIiLCJQcm9taXNlIiwicmVqZWN0IiwiZmV0Y2hBbGwiLCJyZWNvcmRzIiwiZXJyb3IiLCJrZXJuZWxBZGRyZXNzIiwia2VybmVsT2JqIiwicHVzaCIsIm1lc3NhZ2UiLCJkZXBsb3kiLCJrZXJuZWxJcGZzSGFzaCIsInB1Ymxpc2hlciIsImRpbWVuc2lvbiIsInByaWNlIiwiYXJncyIsInV0aWxzIiwidG9IZXgiLCJnYXMiLCJ3ZWIzSGVscGVycyIsImVzdGltYXRlR2FzIiwiYnl0ZWNvZGUiLCJrZXJuZWxDb250cmFjdEFkZHJlc3MiLCJkZXBsb3lDb250cmFjdCIsImZyb20iLCJhZGRUb01hcmtldCIsInB1Ymxpc2hlckFkZHJlc3MiLCJyZXNvbHZlIiwiY3VycmVudFByb3ZpZGVyIiwiaXNNZXRhTWFzayIsIldFQjNfTUVUQU1BU0tfUkVRVUlSRUQiLCJhZGRLZXJuZWwiLCJzZW5kIiwib24iLCJyZWNlaXB0IiwiY29udHJhY3RBZGRyZXNzIiwiZXZlbnRLZXJuZWxBZGRlZCIsInN0b3JlQ2FsbGJhY2siLCJlcnJvckNhbGxiYWNrIiwiZXZlbnRzIiwiS2VybmVsQWRkZWQiLCJmcm9tQmxvY2siLCJyZXMiLCJrZXJuZWwiLCJzdGF0dXMiLCJldmVudCJdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7Ozs7OztBQVNBLGE7O0FBRUE7Ozs7OztBQU1BLHFFOztBQUVBOzs7Ozs7O0FBT08sTUFBTUEsbUJBQW1CLE9BQU9DLEVBQVAsRUFBV0MsTUFBWCxLQUFzQjs7QUFFbEQsTUFBSSxDQUFDQSxPQUFPQyxJQUFaLEVBQWtCO0FBQ2QsVUFBTSxxQkFBU0MscUJBQVQsQ0FBTjtBQUNIOztBQUVELE1BQUksQ0FBQ0YsT0FBT0csU0FBUixJQUFxQixDQUFDSCxPQUFPRyxTQUFQLENBQWlCQyxhQUF2QyxJQUF3RCxDQUFDSixPQUFPRyxTQUFQLENBQWlCQyxhQUFqQixDQUErQkMsR0FBNUYsRUFBaUc7QUFDN0YsVUFBTSxxQkFBU0MseUJBQVQsRUFBNEIsZUFBNUIsQ0FBTjtBQUNIOztBQUVELE1BQUksQ0FBQ04sT0FBT08sU0FBUixJQUFxQixDQUFDUCxPQUFPTyxTQUFQLENBQWlCQyxNQUEzQyxFQUFtRDtBQUMvQyxVQUFNLHFCQUFTQyx3QkFBVCxFQUEyQixRQUEzQixDQUFOO0FBQ0g7O0FBRUQsUUFBTUMsTUFBTSxJQUFJVixPQUFPQyxJQUFQLENBQVlVLEdBQVosQ0FBZ0JDLFFBQXBCLENBQTZCWixPQUFPRyxTQUFQLENBQWlCQyxhQUFqQixDQUErQkMsR0FBNUQsRUFBaUVMLE9BQU9PLFNBQVAsQ0FBaUJDLE1BQWxGLENBQVo7QUFDQSxRQUFNSyxpQkFBaUIsTUFBTUgsSUFBSUksT0FBSjtBQUN4QkMsU0FEd0IsQ0FDaEJoQixFQURnQjtBQUV4QmlCLE1BRndCLEVBQTdCO0FBR0EsU0FBT0gsY0FBUDtBQUNILENBbkJNOztBQXFCUDs7Ozs7OztBQU9PLE1BQU1JLG1CQUFtQixPQUFPQyxVQUFVLEVBQWpCLEVBQXFCbEIsU0FBUyxFQUE5QixLQUFxQzs7QUFFakUsTUFBSSxDQUFDQSxPQUFPQyxJQUFaLEVBQWtCO0FBQ2QsVUFBTSxxQkFBU0MscUJBQVQsQ0FBTjtBQUNIOztBQUVELE1BQUksQ0FBQ0YsT0FBT0csU0FBUixJQUFxQixDQUFDSCxPQUFPRyxTQUFQLENBQWlCZ0IsTUFBdkMsSUFBaUQsQ0FBQ25CLE9BQU9HLFNBQVAsQ0FBaUJnQixNQUFqQixDQUF3QmQsR0FBOUUsRUFBbUY7QUFDL0UsVUFBTSxxQkFBU0MseUJBQVQsRUFBNEIsUUFBNUIsQ0FBTjtBQUNIOztBQUVELFFBQU1jLE1BQU0sSUFBSXBCLE9BQU9DLElBQVAsQ0FBWVUsR0FBWixDQUFnQkMsUUFBcEIsQ0FBNkJaLE9BQU9HLFNBQVAsQ0FBaUJnQixNQUFqQixDQUF3QmQsR0FBckQsRUFBMERhLE9BQTFELENBQVo7QUFDQSxRQUFNRyxjQUFjLE1BQU1ELElBQUlOLE9BQUo7QUFDckJPLGFBRHFCO0FBRXJCTCxNQUZxQixFQUExQjtBQUdBLFNBQU9NLE9BQU9ELFdBQVAsQ0FBUDtBQUNILENBZk07O0FBaUJQOzs7Ozs7O0FBT08sTUFBTUUsZUFBZSxPQUFPTCxVQUFVLEVBQWpCLEVBQXFCbEIsU0FBUyxFQUE5QixLQUFxQzs7QUFFN0QsTUFBSSxDQUFDQSxPQUFPQyxJQUFaLEVBQWtCO0FBQ2QsVUFBTSxxQkFBU0MscUJBQVQsQ0FBTjtBQUNIOztBQUVELE1BQUksQ0FBQ0YsT0FBT0csU0FBUixJQUFxQixDQUFDSCxPQUFPRyxTQUFQLENBQWlCZ0IsTUFBdkMsSUFBaUQsQ0FBQ25CLE9BQU9HLFNBQVAsQ0FBaUJnQixNQUFqQixDQUF3QmQsR0FBOUUsRUFBbUY7QUFDL0UsVUFBTSxxQkFBU0MseUJBQVQsRUFBNEIsUUFBNUIsQ0FBTjtBQUNIOztBQUVELFFBQU1jLE1BQU0sSUFBSXBCLE9BQU9DLElBQVAsQ0FBWVUsR0FBWixDQUFnQkMsUUFBcEIsQ0FBNkJaLE9BQU9HLFNBQVAsQ0FBaUJnQixNQUFqQixDQUF3QmQsR0FBckQsRUFBMERhLE9BQTFELENBQVo7QUFDQSxRQUFNTSxVQUFVLE1BQU1KLElBQUlOLE9BQUo7QUFDakJVLFNBRGlCO0FBRWpCUixNQUZpQixFQUF0QjtBQUdBLFNBQU9TLE9BQU9DLFFBQVAsQ0FBZ0JGLE9BQWhCLEVBQXlCLEVBQXpCLENBQVA7QUFDSCxDQWZNOztBQWlCUDs7Ozs7OztBQU9PLE1BQU1HLG9CQUFvQixPQUFPVCxVQUFVLEVBQWpCLEVBQXFCbEIsU0FBUyxFQUE5QixLQUFxQzs7QUFFbEUsTUFBSSxDQUFDQSxPQUFPQyxJQUFaLEVBQWtCO0FBQ2QsVUFBTSxxQkFBU0MscUJBQVQsQ0FBTjtBQUNIOztBQUVELE1BQUksQ0FBQ0YsT0FBT0csU0FBUixJQUFxQixDQUFDSCxPQUFPRyxTQUFQLENBQWlCZ0IsTUFBdkMsSUFBaUQsQ0FBQ25CLE9BQU9HLFNBQVAsQ0FBaUJnQixNQUFqQixDQUF3QmQsR0FBOUUsRUFBbUY7QUFDL0UsVUFBTSxxQkFBU0MseUJBQVQsRUFBNEIsUUFBNUIsQ0FBTjtBQUNIOztBQUVELFFBQU1jLE1BQU0sSUFBSXBCLE9BQU9DLElBQVAsQ0FBWVUsR0FBWixDQUFnQkMsUUFBcEIsQ0FBNkJaLE9BQU9HLFNBQVAsQ0FBaUJnQixNQUFqQixDQUF3QmQsR0FBckQsRUFBMERhLE9BQTFELENBQVo7QUFDQSxRQUFNVSxlQUFlLE1BQU1SLElBQUlOLE9BQUo7QUFDdEJjLGNBRHNCO0FBRXRCWixNQUZzQixFQUEzQjtBQUdBLFNBQU9TLE9BQU9DLFFBQVAsQ0FBZ0JFLFlBQWhCLEVBQThCLEVBQTlCLENBQVA7QUFDSCxDQWZNOztBQWlCUDs7Ozs7OztBQU9PLE1BQU1DLGtCQUFrQixPQUFPWCxVQUFVLEVBQWpCLEVBQXFCbEIsU0FBUyxFQUE5QixLQUFxQzs7QUFFaEUsTUFBSSxDQUFDQSxPQUFPQyxJQUFaLEVBQWtCO0FBQ2QsVUFBTSxxQkFBU0MscUJBQVQsQ0FBTjtBQUNIOztBQUVELE1BQUksQ0FBQ0YsT0FBT0csU0FBUixJQUFxQixDQUFDSCxPQUFPRyxTQUFQLENBQWlCZ0IsTUFBdkMsSUFBaUQsQ0FBQ25CLE9BQU9HLFNBQVAsQ0FBaUJnQixNQUFqQixDQUF3QmQsR0FBOUUsRUFBbUY7QUFDL0UsVUFBTSxxQkFBU0MseUJBQVQsRUFBNEIsUUFBNUIsQ0FBTjtBQUNIOztBQUVELFFBQU1jLE1BQU0sSUFBSXBCLE9BQU9DLElBQVAsQ0FBWVUsR0FBWixDQUFnQkMsUUFBcEIsQ0FBNkJaLE9BQU9HLFNBQVAsQ0FBaUJnQixNQUFqQixDQUF3QmQsR0FBckQsRUFBMERhLE9BQTFELENBQVo7QUFDQSxRQUFNWSxhQUFhLE1BQU1WLElBQUlOLE9BQUo7QUFDcEJnQixZQURvQjtBQUVwQmQsTUFGb0IsRUFBekI7QUFHQSxTQUFPUyxPQUFPQyxRQUFQLENBQWdCSSxVQUFoQixFQUE0QixFQUE1QixDQUFQO0FBQ0gsQ0FmTTs7QUFpQlA7Ozs7Ozs7QUFPTyxNQUFNQyxjQUFjLE9BQU9iLFVBQVUsRUFBakIsRUFBcUJsQixTQUFTLEVBQTlCLEtBQXFDOztBQUU1RCxNQUFJOztBQUVBLFVBQU1xQixjQUFjLE1BQU1KLGlCQUFpQkMsT0FBakIsRUFBMEJsQixNQUExQixDQUExQjtBQUNBLFVBQU13QixVQUFVLE1BQU1ELGFBQWFMLE9BQWIsRUFBc0JsQixNQUF0QixDQUF0QjtBQUNBLFVBQU00QixlQUFlLE1BQU1ELGtCQUFrQlQsT0FBbEIsRUFBMkJsQixNQUEzQixDQUEzQjtBQUNBLFVBQU04QixhQUFhLE1BQU1ELGdCQUFnQlgsT0FBaEIsRUFBeUJsQixNQUF6QixDQUF6Qjs7QUFFQSxXQUFPO0FBQ0hrQixhQURHO0FBRUhHLGlCQUZHO0FBR0hHLGFBSEc7QUFJSEksa0JBSkc7QUFLSEUsZ0JBTEcsRUFBUDs7QUFPSCxHQWRELENBY0UsT0FBTUUsR0FBTixFQUFXO0FBQ1QsV0FBT0MsUUFBUUMsTUFBUixDQUFlRixHQUFmLENBQVA7QUFDSDtBQUNKLENBbkJNOztBQXFCUDs7Ozs7O0FBTU8sTUFBTUcsV0FBVyxPQUFPbkMsU0FBUyxFQUFoQixLQUF1Qjs7QUFFM0MsTUFBSUQsS0FBSyxDQUFUO0FBQ0EsTUFBSXFDLFVBQVUsRUFBZDtBQUNBLE1BQUlDLFFBQVEsRUFBWjs7QUFFQSxNQUFJOztBQUVBO0FBQ0EsV0FBTyxJQUFQLEVBQWE7O0FBRVQsWUFBTUMsZ0JBQWdCLE1BQU14QyxpQkFBaUJDLElBQWpCLEVBQXVCQyxNQUF2QixDQUE1QixDQUZTLENBRWtEOztBQUUzRCxVQUFJLENBQUNzQyxhQUFELEtBQW1CLENBQXZCLEVBQTBCO0FBQ3RCO0FBQ0g7O0FBRUQsVUFBSTs7QUFFQSxjQUFNQyxZQUFZLE1BQU1SLFlBQVlPLGFBQVosRUFBMkJ0QyxNQUEzQixDQUF4Qjs7QUFFQW9DLGdCQUFRSSxJQUFSO0FBQ0l6QyxjQUFJQSxFQURSO0FBRU93QyxpQkFGUDs7QUFJSCxPQVJELENBUUUsT0FBTVAsR0FBTixFQUFXOztBQUVUSyxjQUFNRyxJQUFOLENBQVc7QUFDUHRCLG1CQUFTb0IsYUFERjtBQUVQRyxtQkFBU1QsSUFBSVMsT0FGTixFQUFYOztBQUlIO0FBQ0o7QUFDSixHQTNCRCxDQTJCRSxPQUFNVCxHQUFOLEVBQVc7QUFDVEssVUFBTUcsSUFBTixDQUFXO0FBQ1BILGFBQU9MLElBQUlTLE9BREosRUFBWDs7QUFHSDs7QUFFRCxTQUFPO0FBQ0hMLFdBREc7QUFFSEMsU0FGRyxFQUFQOztBQUlILENBM0NNOztBQTZDUDs7Ozs7Ozs7QUFRTyxNQUFNSyxTQUFTLE9BQU9DLGNBQVAsRUFBdUIsRUFBRUMsU0FBRixFQUFhQyxTQUFiLEVBQXdCZixVQUF4QixFQUFvQ2dCLEtBQXBDLEVBQXZCLEVBQW9FOUMsU0FBUyxFQUE3RSxLQUFvRjs7QUFFdEcsTUFBSSxDQUFDQSxPQUFPQyxJQUFaLEVBQWtCO0FBQ2QsVUFBTSxxQkFBU0MscUJBQVQsQ0FBTjtBQUNIOztBQUVELE1BQUksQ0FBQ0YsT0FBT0csU0FBUixJQUFxQixDQUFDSCxPQUFPRyxTQUFQLENBQWlCZ0IsTUFBdkMsSUFBaUQsQ0FBQ25CLE9BQU9HLFNBQVAsQ0FBaUJnQixNQUFqQixDQUF3QmQsR0FBOUUsRUFBbUY7QUFDL0UsVUFBTSxxQkFBU0MseUJBQVQsRUFBNEIsUUFBNUIsQ0FBTjtBQUNIOztBQUVELE1BQUk7QUFDQSxVQUFNeUMsT0FBTyxDQUFDL0MsT0FBT0MsSUFBUCxDQUFZK0MsS0FBWixDQUFrQkMsS0FBbEIsQ0FBd0JOLGNBQXhCLENBQUQsRUFBMENFLFNBQTFDLEVBQXFEZixVQUFyRCxFQUFpRWdCLEtBQWpFLENBQWI7O0FBRUE7QUFDQSxVQUFNSSxNQUFNLE1BQU1DLFlBQVlDLFdBQVosQ0FBd0JwRCxPQUFPRyxTQUFQLENBQWlCZ0IsTUFBakIsQ0FBd0JrQyxRQUFoRCxFQUEwRE4sSUFBMUQsRUFBZ0UvQyxNQUFoRSxDQUFsQjs7QUFFQTtBQUNBLFVBQU1zRCx3QkFBd0IsTUFBTUgsWUFBWUksY0FBWixDQUEyQnZELE9BQU9HLFNBQVAsQ0FBaUJnQixNQUE1QyxFQUFvRDtBQUNwRjRCLFVBRG9GO0FBRXBGUyxZQUFNWixTQUY4RTtBQUdwRk0sV0FBS3pCLE9BQU9DLFFBQVAsQ0FBZ0J3QixNQUFNLEdBQXRCLEVBQTJCLEVBQTNCLENBSCtFLEVBQXBEO0FBSWpDbEQsVUFKaUMsQ0FBcEM7O0FBTUEsV0FBT3NELHFCQUFQO0FBQ0gsR0FkRCxDQWNFLE9BQU10QixHQUFOLEVBQVc7QUFDVCxXQUFPQyxRQUFRQyxNQUFSLENBQWVGLEdBQWYsQ0FBUDtBQUNIO0FBQ0osQ0EzQk07O0FBNkJQOzs7Ozs7OztBQVFPLE1BQU15QixjQUFjLENBQUNILHFCQUFELEVBQXdCSSxnQkFBeEIsRUFBMEMxRCxTQUFTLEVBQW5ELEtBQTBELElBQUlpQyxPQUFKLENBQVksQ0FBQzBCLE9BQUQsRUFBVXpCLE1BQVYsS0FBcUI7O0FBRWxILE1BQUksQ0FBQ2xDLE9BQU9DLElBQVosRUFBa0I7QUFDZCxVQUFNLHFCQUFTQyxxQkFBVCxDQUFOO0FBQ0g7O0FBRUQsTUFBSSxDQUFDRixPQUFPRyxTQUFSLElBQXFCLENBQUNILE9BQU9HLFNBQVAsQ0FBaUJDLGFBQXZDLElBQXdELENBQUNKLE9BQU9HLFNBQVAsQ0FBaUJDLGFBQWpCLENBQStCQyxHQUE1RixFQUFpRztBQUM3RixVQUFNLHFCQUFTQyx5QkFBVCxFQUE0QixlQUE1QixDQUFOO0FBQ0g7O0FBRUQsTUFBSSxDQUFDTixPQUFPTyxTQUFSLElBQXFCLENBQUNQLE9BQU9PLFNBQVAsQ0FBaUJDLE1BQTNDLEVBQW1EO0FBQy9DLFVBQU0scUJBQVNDLHdCQUFULEVBQTJCLFFBQTNCLENBQU47QUFDSDs7QUFFRCxNQUFJLENBQUNULE9BQU9DLElBQVAsQ0FBWTJELGVBQVosQ0FBNEJDLFVBQWpDLEVBQTZDO0FBQ3pDLFVBQU0scUJBQVNDLDhCQUFULENBQU47QUFDSDs7QUFFRCxRQUFNdEQsU0FBUyxJQUFJUixPQUFPQyxJQUFQLENBQVlVLEdBQVosQ0FBZ0JDLFFBQXBCLENBQTZCWixPQUFPRyxTQUFQLENBQWlCQyxhQUFqQixDQUErQkMsR0FBNUQsRUFBaUVMLE9BQU9PLFNBQVAsQ0FBaUJDLE1BQWxGLENBQWY7QUFDQUEsU0FBT00sT0FBUDtBQUNLaUQsV0FETCxDQUNlVCxxQkFEZjtBQUVLVSxNQUZMLENBRVU7QUFDRlIsVUFBTUUsZ0JBREosRUFGVjs7QUFLS08sSUFMTCxDQUtRLE9BTFIsRUFLaUIvQixNQUxqQjtBQU1LK0IsSUFOTCxDQU1RLFNBTlIsRUFNbUJDLFdBQVdQLFFBQVFPLFFBQVFDLGVBQWhCLENBTjlCO0FBT0gsQ0ExQm9GLENBQTlFOztBQTRCUDs7Ozs7OztBQU9PLE1BQU1DLG1CQUFtQixDQUFDQyxnQkFBZ0IsTUFBTSxDQUFFLENBQXpCLEVBQTJCQyxnQkFBZ0IsTUFBTSxDQUFFLENBQW5ELEVBQXFEdEUsU0FBUyxFQUE5RCxLQUFxRTs7QUFFakcsTUFBSSxDQUFDQSxPQUFPQyxJQUFaLEVBQWtCO0FBQ2QsVUFBTSxxQkFBU0MscUJBQVQsQ0FBTjtBQUNIOztBQUVELE1BQUksQ0FBQ0YsT0FBT0csU0FBUixJQUFxQixDQUFDSCxPQUFPRyxTQUFQLENBQWlCQyxhQUF2QyxJQUF3RCxDQUFDSixPQUFPRyxTQUFQLENBQWlCQyxhQUFqQixDQUErQkMsR0FBNUYsRUFBaUc7QUFDN0YsVUFBTSxxQkFBU0MseUJBQVQsRUFBNEIsZUFBNUIsQ0FBTjtBQUNIOztBQUVELE1BQUksQ0FBQ04sT0FBT08sU0FBUixJQUFxQixDQUFDUCxPQUFPTyxTQUFQLENBQWlCQyxNQUEzQyxFQUFtRDtBQUMvQyxVQUFNLHFCQUFTQyx3QkFBVCxFQUEyQixRQUEzQixDQUFOO0FBQ0g7O0FBRUQsUUFBTUMsTUFBTSxJQUFJVixPQUFPQyxJQUFQLENBQVlVLEdBQVosQ0FBZ0JDLFFBQXBCLENBQTZCWixPQUFPRyxTQUFQLENBQWlCQyxhQUFqQixDQUErQkMsR0FBNUQsRUFBaUVMLE9BQU9PLFNBQVAsQ0FBaUJDLE1BQWxGLENBQVo7QUFDQUUsTUFBSTZELE1BQUosQ0FBV0MsV0FBWCxDQUF1QjtBQUNuQkMsZUFBVyxDQURRLEVBQXZCOztBQUdLUixJQUhMLENBR1EsTUFIUixFQUdnQixNQUFNUyxHQUFOLElBQWE7O0FBRXJCLFFBQUk7O0FBRUEsWUFBTUMsU0FBUyxNQUFNNUMsWUFBWTJDLElBQUkzQixJQUFKLENBQVM0QixNQUFyQixFQUE2QjNFLE1BQTdCLENBQXJCO0FBQ0FxRSxvQkFBYztBQUNWbkQsaUJBQVN3RCxJQUFJM0IsSUFBSixDQUFTNEIsTUFEUjtBQUVWQSxjQUZVO0FBR1ZDLGdCQUFRLFNBSEU7QUFJVkMsZUFBTywyQkFKRyxFQUFkOztBQU1ILEtBVEQsQ0FTRSxPQUFNN0MsR0FBTixFQUFXO0FBQ1RzQyxvQkFBY3RDLEdBQWQ7QUFDSDtBQUNKLEdBakJMO0FBa0JLaUMsSUFsQkwsQ0FrQlEsT0FsQlIsRUFrQmlCSyxhQWxCakI7QUFtQkgsQ0FsQ00sQyIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogS2VybmVscyByZWxhdGVkIG1ldGhvZHNcbiAqIFRoaXMgZmlsZSBpdCBpcyBhIHBhcnQgb2YgdGhlIFBhbmRvcmEgUHlycmhhIEphdmFzY3JpcHQgbGlicmFyeVxuICogXG4gKiBAZmlsZSBrZXJuZWxzLmpzXG4gKiBAYXV0aG9yIEtvc3RpYW50eW4gU215cm5vdiA8a29zdHlzaEBnbWFpbC5jb20+XG4gKiBAZGF0ZSAyMDE4XG4gKi9cblxuJ3VzZSBzdHJpY3QnO1xuXG5pbXBvcnQgcGpzRXJyb3IsIHtcbiAgICBDT05UUkFDVF9SRVFVSVJFRCxcbiAgICBBRERSRVNTX1JFUVVJUkVELFxuICAgIFdFQjNfUkVRVUlSRUQsXG4gICAgV0VCM19NRVRBTUFTS19SRVFVSVJFRFxufSBmcm9tICcuL2hlbHBlcnMvZXJyb3JzJztcbmltcG9ydCAqIGFzIHdlYjNIZWxwZXJzIGZyb20gJy4vaGVscGVycy93ZWIzJztcblxuLyoqXG4gKiBHZXQgS2VybmVsIGFkZHJlc3MgYnkga2VybmVsIGlkXG4gKiBcbiAqIEBwYXJhbSB7bnVtYmVyfSBpZFxuICogQHBhcmFtIHtPYmplY3R9IGNvbmZpZyBMaWJyYXJ5IGNvbmZpZyAocHJvdmlkZWQgYnkgdGhlIHByb3h5IGJ1dCBjYW4gYmUgb3ZlcnJpZGRlbilcbiAqIEByZXR1cm5zIHtQcm9taXNlfSBBIFByb21pc2Ugb2JqZWN0IHJlcHJlc2VudHMgdGhlIHtzdHJpbmd9XG4gKi9cbmV4cG9ydCBjb25zdCBmZXRjaEFkZHJlc3NCeUlkID0gYXN5bmMgKGlkLCBjb25maWcpID0+IHtcblxuICAgIGlmICghY29uZmlnLndlYjMpIHtcbiAgICAgICAgdGhyb3cgcGpzRXJyb3IoV0VCM19SRVFVSVJFRCk7XG4gICAgfVxuXG4gICAgaWYgKCFjb25maWcuY29udHJhY3RzIHx8ICFjb25maWcuY29udHJhY3RzLlBhbmRvcmFNYXJrZXQgfHwgIWNvbmZpZy5jb250cmFjdHMuUGFuZG9yYU1hcmtldC5hYmkpIHtcbiAgICAgICAgdGhyb3cgcGpzRXJyb3IoQ09OVFJBQ1RfUkVRVUlSRUQsICdQYW5kb3JhTWFya2V0Jyk7XG4gICAgfVxuXG4gICAgaWYgKCFjb25maWcuYWRkcmVzc2VzIHx8ICFjb25maWcuYWRkcmVzc2VzLm1hcmtldCkge1xuICAgICAgICB0aHJvdyBwanNFcnJvcihBRERSRVNTX1JFUVVJUkVELCAnTWFya2V0Jyk7XG4gICAgfVxuXG4gICAgY29uc3QgbWFyID0gbmV3IGNvbmZpZy53ZWIzLmV0aC5Db250cmFjdChjb25maWcuY29udHJhY3RzLlBhbmRvcmFNYXJrZXQuYWJpLCBjb25maWcuYWRkcmVzc2VzLm1hcmtldCk7XG4gICAgY29uc3Qga2VybmVsQ29udHJhY3QgPSBhd2FpdCBtYXIubWV0aG9kc1xuICAgICAgICAua2VybmVscyhpZClcbiAgICAgICAgLmNhbGwoKTtcbiAgICByZXR1cm4ga2VybmVsQ29udHJhY3Q7XG59O1xuXG4vKipcbiAqIEdldCBJUEZTIGFkZHJlc3MgZnJvbSBLZXJuZWwgY29udHJhY3QgYnkgdGhlIGtlcm5lbCBhZGRyZXNzXG4gKiBcbiAqIEBwYXJhbSB7c3RyaW5nfSBhZGRyZXNzXG4gKiBAcGFyYW0ge09iamVjdH0gY29uZmlnIExpYnJhcnkgY29uZmlnIChwcm92aWRlZCBieSB0aGUgcHJveHkgYnV0IGNhbiBiZSBvdmVycmlkZGVuKVxuICogQHJldHVybnMge1Byb21pc2V9IEEgUHJvbWlzZSBvYmplY3QgcmVwcmVzZW50cyB0aGUge3N0cmluZ31cbiAqL1xuZXhwb3J0IGNvbnN0IGZldGNoSXBmc0FkZHJlc3MgPSBhc3luYyAoYWRkcmVzcyA9ICcnLCBjb25maWcgPSB7fSkgPT4ge1xuXG4gICAgaWYgKCFjb25maWcud2ViMykge1xuICAgICAgICB0aHJvdyBwanNFcnJvcihXRUIzX1JFUVVJUkVEKTtcbiAgICB9XG5cbiAgICBpZiAoIWNvbmZpZy5jb250cmFjdHMgfHwgIWNvbmZpZy5jb250cmFjdHMuS2VybmVsIHx8ICFjb25maWcuY29udHJhY3RzLktlcm5lbC5hYmkpIHtcbiAgICAgICAgdGhyb3cgcGpzRXJyb3IoQ09OVFJBQ1RfUkVRVUlSRUQsICdLZXJuZWwnKTtcbiAgICB9XG5cbiAgICBjb25zdCBrZXIgPSBuZXcgY29uZmlnLndlYjMuZXRoLkNvbnRyYWN0KGNvbmZpZy5jb250cmFjdHMuS2VybmVsLmFiaSwgYWRkcmVzcyk7XG4gICAgY29uc3QgaXBmc0FkZHJlc3MgPSBhd2FpdCBrZXIubWV0aG9kc1xuICAgICAgICAuaXBmc0FkZHJlc3MoKVxuICAgICAgICAuY2FsbCgpO1xuICAgIHJldHVybiBTdHJpbmcoaXBmc0FkZHJlc3MpO1xufTtcblxuLyoqXG4gKiBHZXQgZGF0YSBkaW0gZnJvbSBLZXJuZWwgY29udHJhY3QgYnkgdGhlIGtlcm5lbCBhZGRyZXNzXG4gKiBcbiAqIEBwYXJhbSB7c3RyaW5nfSBhZGRyZXNzXG4gKiBAcGFyYW0ge09iamVjdH0gY29uZmlnIExpYnJhcnkgY29uZmlnIChwcm92aWRlZCBieSB0aGUgcHJveHkgYnV0IGNhbiBiZSBvdmVycmlkZGVuKVxuICogQHJldHVybnMge1Byb21pc2V9IEEgUHJvbWlzZSBvYmplY3QgcmVwcmVzZW50cyB0aGUge251bWJlcn1cbiAqL1xuZXhwb3J0IGNvbnN0IGZldGNoRGF0YURpbSA9IGFzeW5jIChhZGRyZXNzID0gJycsIGNvbmZpZyA9IHt9KSA9PiB7XG5cbiAgICBpZiAoIWNvbmZpZy53ZWIzKSB7XG4gICAgICAgIHRocm93IHBqc0Vycm9yKFdFQjNfUkVRVUlSRUQpO1xuICAgIH1cblxuICAgIGlmICghY29uZmlnLmNvbnRyYWN0cyB8fCAhY29uZmlnLmNvbnRyYWN0cy5LZXJuZWwgfHwgIWNvbmZpZy5jb250cmFjdHMuS2VybmVsLmFiaSkge1xuICAgICAgICB0aHJvdyBwanNFcnJvcihDT05UUkFDVF9SRVFVSVJFRCwgJ0tlcm5lbCcpO1xuICAgIH1cblxuICAgIGNvbnN0IGtlciA9IG5ldyBjb25maWcud2ViMy5ldGguQ29udHJhY3QoY29uZmlnLmNvbnRyYWN0cy5LZXJuZWwuYWJpLCBhZGRyZXNzKTtcbiAgICBjb25zdCBkYXRhRGltID0gYXdhaXQga2VyLm1ldGhvZHNcbiAgICAgICAgLmRhdGFEaW0oKVxuICAgICAgICAuY2FsbCgpO1xuICAgIHJldHVybiBOdW1iZXIucGFyc2VJbnQoZGF0YURpbSwgMTApO1xufTtcblxuLyoqXG4gKiBHZXQgY3VycmVudCBwcmljZSBmcm9tIEtlcm5lbCBjb250cmFjdCBieSB0aGUga2VybmVsIGFkZHJlc3NcbiAqIFxuICogQHBhcmFtIHtzdHJpbmd9IGFkZHJlc3NcbiAqIEBwYXJhbSB7T2JqZWN0fSBjb25maWcgTGlicmFyeSBjb25maWcgKHByb3ZpZGVkIGJ5IHRoZSBwcm94eSBidXQgY2FuIGJlIG92ZXJyaWRkZW4pXG4gKiBAcmV0dXJucyB7UHJvbWlzZX0gQSBQcm9taXNlIG9iamVjdCByZXByZXNlbnRzIHRoZSB7bnVtYmVyfVxuICovXG5leHBvcnQgY29uc3QgZmV0Y2hDdXJyZW50UHJpY2UgPSBhc3luYyAoYWRkcmVzcyA9ICcnLCBjb25maWcgPSB7fSkgPT4ge1xuXG4gICAgaWYgKCFjb25maWcud2ViMykge1xuICAgICAgICB0aHJvdyBwanNFcnJvcihXRUIzX1JFUVVJUkVEKTtcbiAgICB9XG5cbiAgICBpZiAoIWNvbmZpZy5jb250cmFjdHMgfHwgIWNvbmZpZy5jb250cmFjdHMuS2VybmVsIHx8ICFjb25maWcuY29udHJhY3RzLktlcm5lbC5hYmkpIHtcbiAgICAgICAgdGhyb3cgcGpzRXJyb3IoQ09OVFJBQ1RfUkVRVUlSRUQsICdLZXJuZWwnKTtcbiAgICB9XG5cbiAgICBjb25zdCBrZXIgPSBuZXcgY29uZmlnLndlYjMuZXRoLkNvbnRyYWN0KGNvbmZpZy5jb250cmFjdHMuS2VybmVsLmFiaSwgYWRkcmVzcyk7XG4gICAgY29uc3QgY3VycmVudFByaWNlID0gYXdhaXQga2VyLm1ldGhvZHNcbiAgICAgICAgLmN1cnJlbnRQcmljZSgpXG4gICAgICAgIC5jYWxsKCk7XG4gICAgcmV0dXJuIE51bWJlci5wYXJzZUludChjdXJyZW50UHJpY2UsIDEwKTtcbn07XG5cbi8qKlxuICogR2V0IGNvbXBsZXhpdHkgZnJvbSBLZXJuZWwgY29udHJhY3QgYnkgdGhlIGtlcm5lbCBhZGRyZXNzXG4gKiBcbiAqIEBwYXJhbSB7c3RyaW5nfSBhZGRyZXNzXG4gKiBAcGFyYW0ge09iamVjdH0gY29uZmlnIExpYnJhcnkgY29uZmlnIChwcm92aWRlZCBieSB0aGUgcHJveHkgYnV0IGNhbiBiZSBvdmVycmlkZGVuKVxuICogQHJldHVybnMge1Byb21pc2V9IEEgUHJvbWlzZSBvYmplY3QgcmVwcmVzZW50cyB0aGUge251bWJlcn1cbiAqL1xuZXhwb3J0IGNvbnN0IGZldGNoQ29tcGxleGl0eSA9IGFzeW5jIChhZGRyZXNzID0gJycsIGNvbmZpZyA9IHt9KSA9PiB7XG5cbiAgICBpZiAoIWNvbmZpZy53ZWIzKSB7XG4gICAgICAgIHRocm93IHBqc0Vycm9yKFdFQjNfUkVRVUlSRUQpO1xuICAgIH1cblxuICAgIGlmICghY29uZmlnLmNvbnRyYWN0cyB8fCAhY29uZmlnLmNvbnRyYWN0cy5LZXJuZWwgfHwgIWNvbmZpZy5jb250cmFjdHMuS2VybmVsLmFiaSkge1xuICAgICAgICB0aHJvdyBwanNFcnJvcihDT05UUkFDVF9SRVFVSVJFRCwgJ0tlcm5lbCcpO1xuICAgIH1cblxuICAgIGNvbnN0IGtlciA9IG5ldyBjb25maWcud2ViMy5ldGguQ29udHJhY3QoY29uZmlnLmNvbnRyYWN0cy5LZXJuZWwuYWJpLCBhZGRyZXNzKTtcbiAgICBjb25zdCBjb21wbGV4aXR5ID0gYXdhaXQga2VyLm1ldGhvZHNcbiAgICAgICAgLmNvbXBsZXhpdHkoKVxuICAgICAgICAuY2FsbCgpO1xuICAgIHJldHVybiBOdW1iZXIucGFyc2VJbnQoY29tcGxleGl0eSwgMTApO1xufTtcblxuLyoqXG4gKiBHZXQgS2VybmVsIGJ5IHRoZSBrZXJuZWwgYWRkcmVzc1xuICogXG4gKiBAcGFyYW0ge3N0cmluZ30gYWRkcmVzc1xuICogQHBhcmFtIHtPYmplY3R9IGNvbmZpZyBMaWJyYXJ5IGNvbmZpZyAocHJvdmlkZWQgYnkgdGhlIHByb3h5IGJ1dCBjYW4gYmUgb3ZlcnJpZGRlbilcbiAqIEByZXR1cm5zIHtQcm9taXNlfSBQcm9taXNlIG9iamVjdCByZXByZXNlbnRzIHRoZSB7T2JqZWN0W119XG4gKi9cbmV4cG9ydCBjb25zdCBmZXRjaEtlcm5lbCA9IGFzeW5jIChhZGRyZXNzID0gJycsIGNvbmZpZyA9IHt9KSA9PiB7XG5cbiAgICB0cnkge1xuXG4gICAgICAgIGNvbnN0IGlwZnNBZGRyZXNzID0gYXdhaXQgZmV0Y2hJcGZzQWRkcmVzcyhhZGRyZXNzLCBjb25maWcpO1xuICAgICAgICBjb25zdCBkYXRhRGltID0gYXdhaXQgZmV0Y2hEYXRhRGltKGFkZHJlc3MsIGNvbmZpZyk7XG4gICAgICAgIGNvbnN0IGN1cnJlbnRQcmljZSA9IGF3YWl0IGZldGNoQ3VycmVudFByaWNlKGFkZHJlc3MsIGNvbmZpZyk7XG4gICAgICAgIGNvbnN0IGNvbXBsZXhpdHkgPSBhd2FpdCBmZXRjaENvbXBsZXhpdHkoYWRkcmVzcywgY29uZmlnKTtcblxuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgYWRkcmVzcyxcbiAgICAgICAgICAgIGlwZnNBZGRyZXNzLFxuICAgICAgICAgICAgZGF0YURpbSxcbiAgICAgICAgICAgIGN1cnJlbnRQcmljZSxcbiAgICAgICAgICAgIGNvbXBsZXhpdHlcbiAgICAgICAgfTtcbiAgICB9IGNhdGNoKGVycikge1xuICAgICAgICByZXR1cm4gUHJvbWlzZS5yZWplY3QoZXJyKTtcbiAgICB9XG59O1xuXG4vKipcbiAqIEdldCBhbGwga2VybmVsc1xuICogXG4gKiBAcGFyYW0ge09iamVjdH0gY29uZmlnIExpYnJhcnkgY29uZmlnIChwcm92aWRlZCBieSB0aGUgcHJveHkgYnV0IGNhbiBiZSBvdmVycmlkZGVuKVxuICogQHJldHVybnMge1Byb21pc2V9IFByb21pc2Ugb2JqZWN0IHJlcHJlc2VudHMgdGhlIHtPYmplY3RbXX1cbiAqL1xuZXhwb3J0IGNvbnN0IGZldGNoQWxsID0gYXN5bmMgKGNvbmZpZyA9IHt9KSA9PiB7XG5cbiAgICBsZXQgaWQgPSAwO1xuICAgIGxldCByZWNvcmRzID0gW107XG4gICAgbGV0IGVycm9yID0gW107XG5cbiAgICB0cnkge1xuXG4gICAgICAgIC8vIEB0b2RvIEFkZCBtZXRob2QgZ2V0S2VybmVsc0NvdW50IHRvIHRoZSBQYW5kb3JhTWFya2V0IGNvbnRyYWN0IGZvciBhdm9pZCBpdGVyYXRpbmcgd2l0aCBcInRyeSBjYXRjaFwiXG4gICAgICAgIHdoaWxlICh0cnVlKSB7XG4gICAgICAgICAgICBcbiAgICAgICAgICAgIGNvbnN0IGtlcm5lbEFkZHJlc3MgPSBhd2FpdCBmZXRjaEFkZHJlc3NCeUlkKGlkKyssIGNvbmZpZyk7Ly8gY2FuIGJlIDB4MFxuICAgICAgICAgICAgXG4gICAgICAgICAgICBpZiAoK2tlcm5lbEFkZHJlc3MgPT09IDApIHtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgdHJ5IHtcblxuICAgICAgICAgICAgICAgIGNvbnN0IGtlcm5lbE9iaiA9IGF3YWl0IGZldGNoS2VybmVsKGtlcm5lbEFkZHJlc3MsIGNvbmZpZyk7XG5cbiAgICAgICAgICAgICAgICByZWNvcmRzLnB1c2goe1xuICAgICAgICAgICAgICAgICAgICBpZDogaWQsXG4gICAgICAgICAgICAgICAgICAgIC4uLmtlcm5lbE9ialxuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfSBjYXRjaChlcnIpIHtcbiAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgICAgICBlcnJvci5wdXNoKHtcbiAgICAgICAgICAgICAgICAgICAgYWRkcmVzczoga2VybmVsQWRkcmVzcyxcbiAgICAgICAgICAgICAgICAgICAgbWVzc2FnZTogZXJyLm1lc3NhZ2VcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH0gY2F0Y2goZXJyKSB7XG4gICAgICAgIGVycm9yLnB1c2goe1xuICAgICAgICAgICAgZXJyb3I6IGVyci5tZXNzYWdlXG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIHJldHVybiB7XG4gICAgICAgIHJlY29yZHMsXG4gICAgICAgIGVycm9yXG4gICAgfTtcbn07XG5cbi8qKlxuICogRGVwbG95IEtlcm5lbCBjb250cmFjdCB0byB0aGUgbmV0d29ya1xuICogXG4gKiBAcGFyYW0ge3N0cmluZ30ga2VybmVsSXBmc0hhc2ggXG4gKiBAcGFyYW0ge09iamVjdH0gb3B0aW9ucyB7IHB1Ymxpc2hlciwgZGltZW5zaW9uLCBjb21wbGV4aXR5LCBwcmljZSB9IFxuICogQHBhcmFtIHtPYmplY3R9IGNvbmZpZyBMaWJyYXJ5IGNvbmZpZyAocHJvdmlkZWQgYnkgdGhlIHByb3h5IGJ1dCBjYW4gYmUgb3ZlcnJpZGRlbilcbiAqIEByZXR1cm5zIHtQcm9taXNlfSBQcm9taXNlIG9iamVjdCByZXNvbHZlZCB0byBjb250cmFjdCBhZGRyZXNzXG4gKi9cbmV4cG9ydCBjb25zdCBkZXBsb3kgPSBhc3luYyAoa2VybmVsSXBmc0hhc2gsIHsgcHVibGlzaGVyLCBkaW1lbnNpb24sIGNvbXBsZXhpdHksIHByaWNlIH0sIGNvbmZpZyA9IHt9KSA9PiB7XG5cbiAgICBpZiAoIWNvbmZpZy53ZWIzKSB7XG4gICAgICAgIHRocm93IHBqc0Vycm9yKFdFQjNfUkVRVUlSRUQpO1xuICAgIH1cblxuICAgIGlmICghY29uZmlnLmNvbnRyYWN0cyB8fCAhY29uZmlnLmNvbnRyYWN0cy5LZXJuZWwgfHwgIWNvbmZpZy5jb250cmFjdHMuS2VybmVsLmFiaSkge1xuICAgICAgICB0aHJvdyBwanNFcnJvcihDT05UUkFDVF9SRVFVSVJFRCwgJ0tlcm5lbCcpO1xuICAgIH1cblxuICAgIHRyeSB7XG4gICAgICAgIGNvbnN0IGFyZ3MgPSBbY29uZmlnLndlYjMudXRpbHMudG9IZXgoa2VybmVsSXBmc0hhc2gpLCBkaW1lbnNpb24sIGNvbXBsZXhpdHksIHByaWNlXTtcbiAgICAgICAgXG4gICAgICAgIC8vIEVzdGltYXRlIHJlcXVpcmVkIGFtb3VudCBvZiBnYXNcbiAgICAgICAgY29uc3QgZ2FzID0gYXdhaXQgd2ViM0hlbHBlcnMuZXN0aW1hdGVHYXMoY29uZmlnLmNvbnRyYWN0cy5LZXJuZWwuYnl0ZWNvZGUsIGFyZ3MsIGNvbmZpZyk7XG5cbiAgICAgICAgLy8gQ3JlYXRlIGFuZCBkZXBsb3kga2VybmVsIGNvbnRyYWN0XG4gICAgICAgIGNvbnN0IGtlcm5lbENvbnRyYWN0QWRkcmVzcyA9IGF3YWl0IHdlYjNIZWxwZXJzLmRlcGxveUNvbnRyYWN0KGNvbmZpZy5jb250cmFjdHMuS2VybmVsLCB7XG4gICAgICAgICAgICBhcmdzLFxuICAgICAgICAgICAgZnJvbTogcHVibGlzaGVyLFxuICAgICAgICAgICAgZ2FzOiBOdW1iZXIucGFyc2VJbnQoZ2FzICogMS41LCAxMClcbiAgICAgICAgfSwgY29uZmlnKTtcblxuICAgICAgICByZXR1cm4ga2VybmVsQ29udHJhY3RBZGRyZXNzO1xuICAgIH0gY2F0Y2goZXJyKSB7XG4gICAgICAgIHJldHVybiBQcm9taXNlLnJlamVjdChlcnIpO1xuICAgIH1cbn07XG5cbi8qKlxuICogQWRkIGtlcm5lbCB0byBtYXJrZXRcbiAqIFxuICogQHBhcmFtIHtTdHJpbmd9IGtlcm5lbENvbnRyYWN0QWRkcmVzcyBcbiAqIEBwYXJhbSB7U3RyaW5nfSBwdWJsaXNoZXJBZGRyZXNzIFxuICogQHBhcmFtIHtPYmplY3R9IGNvbmZpZyBMaWJyYXJ5IGNvbmZpZyAocHJvdmlkZWQgYnkgdGhlIHByb3h5IGJ1dCBjYW4gYmUgb3ZlcnJpZGRlbilcbiAqIEByZXR1cm5zIHtQcm9taXNlfSBQcm9taXNlIG9iamVjdCByZXNvbHZlZCB0byB7c3RyaW5nfSBjb250cmFjdEFkZHJlc3NcbiAqL1xuZXhwb3J0IGNvbnN0IGFkZFRvTWFya2V0ID0gKGtlcm5lbENvbnRyYWN0QWRkcmVzcywgcHVibGlzaGVyQWRkcmVzcywgY29uZmlnID0ge30pID0+IG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcblxuICAgIGlmICghY29uZmlnLndlYjMpIHtcbiAgICAgICAgdGhyb3cgcGpzRXJyb3IoV0VCM19SRVFVSVJFRCk7XG4gICAgfVxuXG4gICAgaWYgKCFjb25maWcuY29udHJhY3RzIHx8ICFjb25maWcuY29udHJhY3RzLlBhbmRvcmFNYXJrZXQgfHwgIWNvbmZpZy5jb250cmFjdHMuUGFuZG9yYU1hcmtldC5hYmkpIHtcbiAgICAgICAgdGhyb3cgcGpzRXJyb3IoQ09OVFJBQ1RfUkVRVUlSRUQsICdQYW5kb3JhTWFya2V0Jyk7XG4gICAgfVxuXG4gICAgaWYgKCFjb25maWcuYWRkcmVzc2VzIHx8ICFjb25maWcuYWRkcmVzc2VzLm1hcmtldCkge1xuICAgICAgICB0aHJvdyBwanNFcnJvcihBRERSRVNTX1JFUVVJUkVELCAnTWFya2V0Jyk7XG4gICAgfVxuXG4gICAgaWYgKCFjb25maWcud2ViMy5jdXJyZW50UHJvdmlkZXIuaXNNZXRhTWFzaykge1xuICAgICAgICB0aHJvdyBwanNFcnJvcihXRUIzX01FVEFNQVNLX1JFUVVJUkVEKTtcbiAgICB9XG5cbiAgICBjb25zdCBtYXJrZXQgPSBuZXcgY29uZmlnLndlYjMuZXRoLkNvbnRyYWN0KGNvbmZpZy5jb250cmFjdHMuUGFuZG9yYU1hcmtldC5hYmksIGNvbmZpZy5hZGRyZXNzZXMubWFya2V0KTtcbiAgICBtYXJrZXQubWV0aG9kc1xuICAgICAgICAuYWRkS2VybmVsKGtlcm5lbENvbnRyYWN0QWRkcmVzcylcbiAgICAgICAgLnNlbmQoe1xuICAgICAgICAgICAgZnJvbTogcHVibGlzaGVyQWRkcmVzc1xuICAgICAgICB9KVxuICAgICAgICAub24oJ2Vycm9yJywgcmVqZWN0KVxuICAgICAgICAub24oJ3JlY2VpcHQnLCByZWNlaXB0ID0+IHJlc29sdmUocmVjZWlwdC5jb250cmFjdEFkZHJlc3MpKTtcbn0pO1xuXG4vKipcbiAqIEhhbmRsZSBldmVudCBLZXJuZWxBZGRlZFxuICogXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBzdG9yZUNhbGxiYWNrIFxuICogQHBhcmFtIHtGdW5jdGlvbn0gZXJyb3JDYWxsYmFja1xuICogQHBhcmFtIHtPYmplY3R9IGNvbmZpZyBMaWJyYXJ5IGNvbmZpZyAocHJvdmlkZWQgYnkgdGhlIHByb3h5IGJ1dCBjYW4gYmUgb3ZlcnJpZGRlbilcbiAqL1xuZXhwb3J0IGNvbnN0IGV2ZW50S2VybmVsQWRkZWQgPSAoc3RvcmVDYWxsYmFjayA9ICgpID0+IHt9LCBlcnJvckNhbGxiYWNrID0gKCkgPT4ge30sIGNvbmZpZyA9IHt9KSA9PiB7XG5cbiAgICBpZiAoIWNvbmZpZy53ZWIzKSB7XG4gICAgICAgIHRocm93IHBqc0Vycm9yKFdFQjNfUkVRVUlSRUQpO1xuICAgIH1cblxuICAgIGlmICghY29uZmlnLmNvbnRyYWN0cyB8fCAhY29uZmlnLmNvbnRyYWN0cy5QYW5kb3JhTWFya2V0IHx8ICFjb25maWcuY29udHJhY3RzLlBhbmRvcmFNYXJrZXQuYWJpKSB7XG4gICAgICAgIHRocm93IHBqc0Vycm9yKENPTlRSQUNUX1JFUVVJUkVELCAnUGFuZG9yYU1hcmtldCcpO1xuICAgIH1cblxuICAgIGlmICghY29uZmlnLmFkZHJlc3NlcyB8fCAhY29uZmlnLmFkZHJlc3Nlcy5tYXJrZXQpIHtcbiAgICAgICAgdGhyb3cgcGpzRXJyb3IoQUREUkVTU19SRVFVSVJFRCwgJ01hcmtldCcpO1xuICAgIH1cblxuICAgIGNvbnN0IG1hciA9IG5ldyBjb25maWcud2ViMy5ldGguQ29udHJhY3QoY29uZmlnLmNvbnRyYWN0cy5QYW5kb3JhTWFya2V0LmFiaSwgY29uZmlnLmFkZHJlc3Nlcy5tYXJrZXQpO1xuICAgIG1hci5ldmVudHMuS2VybmVsQWRkZWQoe1xuICAgICAgICBmcm9tQmxvY2s6IDBcbiAgICB9KVxuICAgICAgICAub24oJ2RhdGEnLCBhc3luYyByZXMgPT4ge1xuXG4gICAgICAgICAgICB0cnkge1xuXG4gICAgICAgICAgICAgICAgY29uc3Qga2VybmVsID0gYXdhaXQgZmV0Y2hLZXJuZWwocmVzLmFyZ3Mua2VybmVsLCBjb25maWcpO1xuICAgICAgICAgICAgICAgIHN0b3JlQ2FsbGJhY2soe1xuICAgICAgICAgICAgICAgICAgICBhZGRyZXNzOiByZXMuYXJncy5rZXJuZWwsXG4gICAgICAgICAgICAgICAgICAgIGtlcm5lbCxcbiAgICAgICAgICAgICAgICAgICAgc3RhdHVzOiAnY3JlYXRlZCcsXG4gICAgICAgICAgICAgICAgICAgIGV2ZW50OiAnUGFuZG9yYU1hcmtldC5LZXJuZWxBZGRlZCdcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH0gY2F0Y2goZXJyKSB7XG4gICAgICAgICAgICAgICAgZXJyb3JDYWxsYmFjayhlcnIpO1xuICAgICAgICAgICAgfSAgICAgICAgICAgIFxuICAgICAgICB9KVxuICAgICAgICAub24oJ2Vycm9yJywgZXJyb3JDYWxsYmFjayk7XG59O1xuIl19