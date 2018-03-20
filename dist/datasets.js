/**
 * Datasets related methods
 * This file it is a part of the Pandora Pyrrha Javascript library
 * 
 * @file kernels.js
 * @author Kostiantyn Smyrnov <kostysh@gmail.com>
 * @date 2018
 */

'use strict';Object.defineProperty(exports, "__esModule", { value: true });exports.eventDatasetAdded = exports.addToMarket = exports.deploy = exports.fetchAll = exports.fetchDataset = exports.fetchBatchesCount = exports.fetchSamplesCount = exports.fetchCurrentPrice = exports.fetchDataDim = exports.fetchIpfsAddress = exports.fetchAddressById = void 0;

var _errors = _interopRequireWildcard(require("./helpers/errors"));





var web3Helpers = _interopRequireWildcard(require("./helpers/web3"));function _interopRequireWildcard(obj) {if (obj && obj.__esModule) {return obj;} else {var newObj = {};if (obj != null) {for (var key in obj) {if (Object.prototype.hasOwnProperty.call(obj, key)) {var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {};if (desc.get || desc.set) {Object.defineProperty(newObj, key, desc);} else {newObj[key] = obj[key];}}}}newObj.default = obj;return newObj;}}function _objectSpread(target) {for (var i = 1; i < arguments.length; i++) {var source = arguments[i] != null ? arguments[i] : {};var ownKeys = Object.keys(source);if (typeof Object.getOwnPropertySymbols === 'function') {ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) {return Object.getOwnPropertyDescriptor(source, sym).enumerable;}));}ownKeys.forEach(function (key) {_defineProperty(target, key, source[key]);});}return target;}function _defineProperty(obj, key, value) {if (key in obj) {Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true });} else {obj[key] = value;}return obj;}

/**
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        * Get Dataset address by kernel id
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        * 
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        * @param {number} id
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        * @param {Object} config Library config (provided by the proxy but can be overridden)
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        * @returns {Promise} A Promise object represents the {string}
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        */
const fetchAddressById = async (id, config = {}) => {

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
  const datasetContract = await mar.methods.
  datasets(id).
  call();
  return datasetContract;
};

/**
    * Get IPFS address from Dataset contract by the dataset address
    * 
    * @param {string} address
    * @param {Object} config Library config (provided by the proxy but can be overridden)
    * @returns {Promise} A Promise object represents the {string}
    */exports.fetchAddressById = fetchAddressById;
const fetchIpfsAddress = async (address = '', config = {}) => {

  if (!config.web3) {
    throw (0, _errors.default)(_errors.WEB3_REQUIRED);
  }

  if (!config.contracts || !config.contracts.Dataset || !config.contracts.Dataset.abi) {
    throw (0, _errors.default)(_errors.CONTRACT_REQUIRED, 'Dataset');
  }

  const dat = new config.web3.eth.Contract(config.contracts.Dataset.abi, address);
  const ipfsAddress = await dat.methods.
  ipfsAddress().
  call();
  return String(ipfsAddress);
};

/**
    * Get data dim from Dataset contract by the dataset address
    * 
    * @param {string} address
    * @param {Object} config Library config (provided by the proxy but can be overridden)
    * @returns {Promise} A Promise object represents the {number}
    */exports.fetchIpfsAddress = fetchIpfsAddress;
const fetchDataDim = async (address = '', config = {}) => {

  if (!config.web3) {
    throw (0, _errors.default)(_errors.WEB3_REQUIRED);
  }

  if (!config.contracts || !config.contracts.Dataset || !config.contracts.Dataset.abi) {
    throw (0, _errors.default)(_errors.CONTRACT_REQUIRED, 'Dataset');
  }

  const dat = new config.web3.eth.Contract(config.contracts.Dataset.abi, address);
  const dataDim = await dat.methods.
  dataDim().
  call();
  return Number.parseInt(dataDim, 10);
};

/**
    * Get current price from Dataset contract by the dataset address
    * 
    * @param {string} address
    * @param {Object} config Library config (provided by the proxy but can be overridden)
    * @returns {Promise} A Promise object represents the {number}
    */exports.fetchDataDim = fetchDataDim;
const fetchCurrentPrice = async (address = '', config = {}) => {

  if (!config.web3) {
    throw (0, _errors.default)(_errors.WEB3_REQUIRED);
  }

  if (!config.contracts || !config.contracts.Dataset || !config.contracts.Dataset.abi) {
    throw (0, _errors.default)(_errors.CONTRACT_REQUIRED, 'Dataset');
  }

  const dat = new config.web3.eth.Contract(config.contracts.Dataset.abi, address);
  const currentPrice = await dat.methods.
  currentPrice().
  call();
  return Number.parseInt(currentPrice, 10);
};

/**
    * Get data samples count from Dataset contract by the dataset address
    * 
    * @param {string} address
    * @param {Object} config Library config (provided by the proxy but can be overridden)
    * @returns {Promise} A Promise object represents the {number}
    */exports.fetchCurrentPrice = fetchCurrentPrice;
const fetchSamplesCount = async (address = '', config = {}) => {

  if (!config.web3) {
    throw (0, _errors.default)(_errors.WEB3_REQUIRED);
  }

  if (!config.contracts || !config.contracts.Dataset || !config.contracts.Dataset.abi) {
    throw (0, _errors.default)(_errors.CONTRACT_REQUIRED, 'Dataset');
  }

  const dat = new config.web3.eth.Contract(config.contracts.Dataset.abi, address);
  const samplesCount = await dat.methods.
  samplesCount().
  call();
  return Number.parseInt(samplesCount, 10);
};

/**
    * Get data batches count from Dataset contract by the dataset address
    * 
    * @param {string} address
    * @param {Object} config Library config (provided by the proxy but can be overridden)
    * @returns {Promise} A Promise object represents the {number}
    */exports.fetchSamplesCount = fetchSamplesCount;
const fetchBatchesCount = async (address = '', config = {}) => {

  if (!config.web3) {
    throw (0, _errors.default)(_errors.WEB3_REQUIRED);
  }

  if (!config.contracts || !config.contracts.Dataset || !config.contracts.Dataset.abi) {
    throw (0, _errors.default)(_errors.CONTRACT_REQUIRED, 'Dataset');
  }

  const dat = new config.web3.eth.Contract(config.contracts.Dataset.abi, address);
  const batchesCount = await dat.methods.
  batchesCount().
  call();
  return Number.parseInt(batchesCount, 10);
};

/**
    * Get dataset by the dataset address
    * 
    * @param {string} address
    * @param {Object} config Library config (provided by the proxy but can be overridden)
    * @returns {Promise} Promise object represents the {Object[]}
    */exports.fetchBatchesCount = fetchBatchesCount;
const fetchDataset = async (address = '', config = {}) => {

  try {

    const ipfsAddress = await fetchIpfsAddress(address, config);
    const dataDim = await fetchDataDim(address, config);
    const currentPrice = await fetchCurrentPrice(address, config);
    const samplesCount = await fetchSamplesCount(address, config);
    const batchesCount = await fetchBatchesCount(address, config);

    return {
      address,
      ipfsAddress,
      dataDim,
      currentPrice,
      samplesCount,
      batchesCount };

  } catch (err) {
    return Promise.reject(err);
  }
};

/**
    * Get all datasets
    * 
    * @param {Object} config Library config (provided by the proxy but can be overridden)
    * @returns {Promise} Promise object represents the {Object[]}
    */exports.fetchDataset = fetchDataset;
const fetchAll = async (config = {}) => {

  let id = 0;
  let records = [];
  let error = [];

  try {

    // @todo Add method getDatasetsCount to the PandoraMarket contract for avoid iterating with "while"
    while (true) {

      const datasetAddress = await fetchAddressById(id++, config); // can be 0x0

      if (+datasetAddress === 0) {
        break;
      }

      try {

        const datasetObj = await fetchDataset(datasetAddress, config);
        records.push(_objectSpread({
          id: id },
        datasetObj));

      } catch (err) {

        error.push({
          address: datasetAddress,
          error: err.message });

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
    * Deploy Datset contract to the network
    * 
    * @param {string} datasetIpfsHash 
    * @param {Object} options { publisher, dimension, samples, price } 
    * @param {Object} config Library config (provided by the proxy but can be overridden)
    * @returns {Promise} Promise object resolved to contract address
    */exports.fetchAll = fetchAll;
const deploy = async (datasetIpfsHash, batchesCount, { publisher, dimension, samples, price }, config = {}) => {

  if (!config.web3) {
    throw (0, _errors.default)(_errors.WEB3_REQUIRED);
  }

  if (!config.contracts || !config.contracts.Dataset || !config.contracts.Dataset.abi) {
    throw (0, _errors.default)(_errors.CONTRACT_REQUIRED, 'Dataset');
  }

  try {
    const args = [config.web3.utils.toHex(datasetIpfsHash), dimension, samples, batchesCount, price];

    // Estimate required amount of gas
    const gas = await web3Helpers.estimateGas(config.contracts.Dataset.bytecode, args, config);

    // Create and deploy dataset contract
    const datasetContractAddress = await web3Helpers.deployContract(config.contracts.Dataset, {
      args,
      from: publisher,
      gas: Number.parseInt(gas * 1.5, 10) },
    config);

    return datasetContractAddress;
  } catch (err) {
    return Promise.reject(err);
  }
};

/**
    * Add dataset to market
    * 
    * @param {String} datasetContractAddress 
    * @param {String} publisherAddress 
    * @param {Object} config Library config (provided by the proxy but can be overridden)
    * @returns {Promise} Promise object resolved to {string} contractAddress
    */exports.deploy = deploy;
const addToMarket = (datasetContractAddress, publisherAddress, config = {}) => new Promise((resolve, reject) => {

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
  addDataset(datasetContractAddress).
  send({
    from: publisherAddress }).

  on('error', reject).
  on('receipt', receipt => resolve(receipt.contractAddress));
});

/**
     * Handle event DatasetAdded
     * 
     * @param {Function} storeCallback 
     * @param {Function} errorCallback
     * @param {Object} config Library config (provided by the proxy but can be overridden)
     */exports.addToMarket = addToMarket;
const eventDatasetAdded = (storeCallback = () => {}, errorCallback = () => {}, config = {}) => {

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
  mar.events.DatasetAdded({
    fromBlock: 0 }).

  on('data', async res => {

    try {

      const dataset = await fetchDataset(res.args.dataset, config);
      storeCallback({
        address: res.args.dataset,
        dataset,
        status: 'created',
        event: 'PandoraMarket.DatasetAdded' });

    } catch (err) {
      errorCallback(err);
    }
  }).
  on('error', errorCallback);
};exports.eventDatasetAdded = eventDatasetAdded;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9kYXRhc2V0cy5qcyJdLCJuYW1lcyI6WyJmZXRjaEFkZHJlc3NCeUlkIiwiaWQiLCJjb25maWciLCJ3ZWIzIiwiV0VCM19SRVFVSVJFRCIsImNvbnRyYWN0cyIsIlBhbmRvcmFNYXJrZXQiLCJhYmkiLCJDT05UUkFDVF9SRVFVSVJFRCIsImFkZHJlc3NlcyIsIm1hcmtldCIsIkFERFJFU1NfUkVRVUlSRUQiLCJtYXIiLCJldGgiLCJDb250cmFjdCIsImRhdGFzZXRDb250cmFjdCIsIm1ldGhvZHMiLCJkYXRhc2V0cyIsImNhbGwiLCJmZXRjaElwZnNBZGRyZXNzIiwiYWRkcmVzcyIsIkRhdGFzZXQiLCJkYXQiLCJpcGZzQWRkcmVzcyIsIlN0cmluZyIsImZldGNoRGF0YURpbSIsImRhdGFEaW0iLCJOdW1iZXIiLCJwYXJzZUludCIsImZldGNoQ3VycmVudFByaWNlIiwiY3VycmVudFByaWNlIiwiZmV0Y2hTYW1wbGVzQ291bnQiLCJzYW1wbGVzQ291bnQiLCJmZXRjaEJhdGNoZXNDb3VudCIsImJhdGNoZXNDb3VudCIsImZldGNoRGF0YXNldCIsImVyciIsIlByb21pc2UiLCJyZWplY3QiLCJmZXRjaEFsbCIsInJlY29yZHMiLCJlcnJvciIsImRhdGFzZXRBZGRyZXNzIiwiZGF0YXNldE9iaiIsInB1c2giLCJtZXNzYWdlIiwiZGVwbG95IiwiZGF0YXNldElwZnNIYXNoIiwicHVibGlzaGVyIiwiZGltZW5zaW9uIiwic2FtcGxlcyIsInByaWNlIiwiYXJncyIsInV0aWxzIiwidG9IZXgiLCJnYXMiLCJ3ZWIzSGVscGVycyIsImVzdGltYXRlR2FzIiwiYnl0ZWNvZGUiLCJkYXRhc2V0Q29udHJhY3RBZGRyZXNzIiwiZGVwbG95Q29udHJhY3QiLCJmcm9tIiwiYWRkVG9NYXJrZXQiLCJwdWJsaXNoZXJBZGRyZXNzIiwicmVzb2x2ZSIsImN1cnJlbnRQcm92aWRlciIsImlzTWV0YU1hc2siLCJXRUIzX01FVEFNQVNLX1JFUVVJUkVEIiwiYWRkRGF0YXNldCIsInNlbmQiLCJvbiIsInJlY2VpcHQiLCJjb250cmFjdEFkZHJlc3MiLCJldmVudERhdGFzZXRBZGRlZCIsInN0b3JlQ2FsbGJhY2siLCJlcnJvckNhbGxiYWNrIiwiZXZlbnRzIiwiRGF0YXNldEFkZGVkIiwiZnJvbUJsb2NrIiwicmVzIiwiZGF0YXNldCIsInN0YXR1cyIsImV2ZW50Il0sIm1hcHBpbmdzIjoiQUFBQTs7Ozs7Ozs7O0FBU0EsYTs7QUFFQTs7Ozs7O0FBTUEscUU7O0FBRUE7Ozs7Ozs7QUFPTyxNQUFNQSxtQkFBbUIsT0FBT0MsRUFBUCxFQUFXQyxTQUFTLEVBQXBCLEtBQTJCOztBQUV2RCxNQUFJLENBQUNBLE9BQU9DLElBQVosRUFBa0I7QUFDZCxVQUFNLHFCQUFTQyxxQkFBVCxDQUFOO0FBQ0g7O0FBRUQsTUFBSSxDQUFDRixPQUFPRyxTQUFSLElBQXFCLENBQUNILE9BQU9HLFNBQVAsQ0FBaUJDLGFBQXZDLElBQXdELENBQUNKLE9BQU9HLFNBQVAsQ0FBaUJDLGFBQWpCLENBQStCQyxHQUE1RixFQUFpRztBQUM3RixVQUFNLHFCQUFTQyx5QkFBVCxFQUE0QixlQUE1QixDQUFOO0FBQ0g7O0FBRUQsTUFBSSxDQUFDTixPQUFPTyxTQUFSLElBQXFCLENBQUNQLE9BQU9PLFNBQVAsQ0FBaUJDLE1BQTNDLEVBQW1EO0FBQy9DLFVBQU0scUJBQVNDLHdCQUFULEVBQTJCLFFBQTNCLENBQU47QUFDSDs7QUFFRCxRQUFNQyxNQUFNLElBQUlWLE9BQU9DLElBQVAsQ0FBWVUsR0FBWixDQUFnQkMsUUFBcEIsQ0FBNkJaLE9BQU9HLFNBQVAsQ0FBaUJDLGFBQWpCLENBQStCQyxHQUE1RCxFQUFpRUwsT0FBT08sU0FBUCxDQUFpQkMsTUFBbEYsQ0FBWjtBQUNBLFFBQU1LLGtCQUFrQixNQUFNSCxJQUFJSSxPQUFKO0FBQ3pCQyxVQUR5QixDQUNoQmhCLEVBRGdCO0FBRXpCaUIsTUFGeUIsRUFBOUI7QUFHQSxTQUFPSCxlQUFQO0FBQ0gsQ0FuQk07O0FBcUJQOzs7Ozs7O0FBT08sTUFB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Z0JDLFFBQXBCLENBQTZCWixPQUFPRyxTQUFQLENBQWlCQyxhQUFqQixDQUErQkMsR0FBNUQsRUFBaUVMLE9BQU9PLFNBQVAsQ0FBaUJDLE1BQWxGLENBQVo7QUFDQUUsTUFBSWdFLE1BQUosQ0FBV0MsWUFBWCxDQUF3QjtBQUNwQkMsZUFBVyxDQURTLEVBQXhCOztBQUdLUixJQUhMLENBR1EsTUFIUixFQUdnQixNQUFNUyxHQUFOLElBQWE7O0FBRXJCLFFBQUk7O0FBRUEsWUFBTUMsVUFBVSxNQUFNN0MsYUFBYTRDLElBQUkzQixJQUFKLENBQVM0QixPQUF0QixFQUErQjlFLE1BQS9CLENBQXRCO0FBQ0F3RSxvQkFBYztBQUNWdEQsaUJBQVMyRCxJQUFJM0IsSUFBSixDQUFTNEIsT0FEUjtBQUVWQSxlQUZVO0FBR1ZDLGdCQUFRLFNBSEU7QUFJVkMsZUFBTyw0QkFKRyxFQUFkOztBQU1ILEtBVEQsQ0FTRSxPQUFNOUMsR0FBTixFQUFXO0FBQ1R1QyxvQkFBY3ZDLEdBQWQ7QUFDSDtBQUNKLEdBakJMO0FBa0JLa0MsSUFsQkwsQ0FrQlEsT0FsQlIsRUFrQmlCSyxhQWxCakI7QUFtQkgsQ0FsQ00sQyIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogRGF0YXNldHMgcmVsYXRlZCBtZXRob2RzXG4gKiBUaGlzIGZpbGUgaXQgaXMgYSBwYXJ0IG9mIHRoZSBQYW5kb3JhIFB5cnJoYSBKYXZhc2NyaXB0IGxpYnJhcnlcbiAqIFxuICogQGZpbGUga2VybmVscy5qc1xuICogQGF1dGhvciBLb3N0aWFudHluIFNteXJub3YgPGtvc3R5c2hAZ21haWwuY29tPlxuICogQGRhdGUgMjAxOFxuICovXG5cbid1c2Ugc3RyaWN0JztcblxuaW1wb3J0IHBqc0Vycm9yLCB7XG4gICAgQ09OVFJBQ1RfUkVRVUlSRUQsXG4gICAgQUREUkVTU19SRVFVSVJFRCxcbiAgICBXRUIzX1JFUVVJUkVELFxuICAgIFdFQjNfTUVUQU1BU0tfUkVRVUlSRURcbn0gZnJvbSAnLi9oZWxwZXJzL2Vycm9ycyc7XG5pbXBvcnQgKiBhcyB3ZWIzSGVscGVycyBmcm9tICcuL2hlbHBlcnMvd2ViMyc7XG5cbi8qKlxuICogR2V0IERhdGFzZXQgYWRkcmVzcyBieSBrZXJuZWwgaWRcbiAqIFxuICogQHBhcmFtIHtudW1iZXJ9IGlkXG4gKiBAcGFyYW0ge09iamVjdH0gY29uZmlnIExpYnJhcnkgY29uZmlnIChwcm92aWRlZCBieSB0aGUgcHJveHkgYnV0IGNhbiBiZSBvdmVycmlkZGVuKVxuICogQHJldHVybnMge1Byb21pc2V9IEEgUHJvbWlzZSBvYmplY3QgcmVwcmVzZW50cyB0aGUge3N0cmluZ31cbiAqL1xuZXhwb3J0IGNvbnN0IGZldGNoQWRkcmVzc0J5SWQgPSBhc3luYyAoaWQsIGNvbmZpZyA9IHt9KSA9PiB7XG5cbiAgICBpZiAoIWNvbmZpZy53ZWIzKSB7XG4gICAgICAgIHRocm93IHBqc0Vycm9yKFdFQjNfUkVRVUlSRUQpO1xuICAgIH1cblxuICAgIGlmICghY29uZmlnLmNvbnRyYWN0cyB8fCAhY29uZmlnLmNvbnRyYWN0cy5QYW5kb3JhTWFya2V0IHx8ICFjb25maWcuY29udHJhY3RzLlBhbmRvcmFNYXJrZXQuYWJpKSB7XG4gICAgICAgIHRocm93IHBqc0Vycm9yKENPTlRSQUNUX1JFUVVJUkVELCAnUGFuZG9yYU1hcmtldCcpO1xuICAgIH1cblxuICAgIGlmICghY29uZmlnLmFkZHJlc3NlcyB8fCAhY29uZmlnLmFkZHJlc3Nlcy5tYXJrZXQpIHtcbiAgICAgICAgdGhyb3cgcGpzRXJyb3IoQUREUkVTU19SRVFVSVJFRCwgJ01hcmtldCcpO1xuICAgIH1cblxuICAgIGNvbnN0IG1hciA9IG5ldyBjb25maWcud2ViMy5ldGguQ29udHJhY3QoY29uZmlnLmNvbnRyYWN0cy5QYW5kb3JhTWFya2V0LmFiaSwgY29uZmlnLmFkZHJlc3Nlcy5tYXJrZXQpO1xuICAgIGNvbnN0IGRhdGFzZXRDb250cmFjdCA9IGF3YWl0IG1hci5tZXRob2RzXG4gICAgICAgIC5kYXRhc2V0cyhpZClcbiAgICAgICAgLmNhbGwoKTtcbiAgICByZXR1cm4gZGF0YXNldENvbnRyYWN0O1xufTtcblxuLyoqXG4gKiBHZXQgSVBGUyBhZGRyZXNzIGZyb20gRGF0YXNldCBjb250cmFjdCBieSB0aGUgZGF0YXNldCBhZGRyZXNzXG4gKiBcbiAqIEBwYXJhbSB7c3RyaW5nfSBhZGRyZXNzXG4gKiBAcGFyYW0ge09iamVjdH0gY29uZmlnIExpYnJhcnkgY29uZmlnIChwcm92aWRlZCBieSB0aGUgcHJveHkgYnV0IGNhbiBiZSBvdmVycmlkZGVuKVxuICogQHJldHVybnMge1Byb21pc2V9IEEgUHJvbWlzZSBvYmplY3QgcmVwcmVzZW50cyB0aGUge3N0cmluZ31cbiAqL1xuZXhwb3J0IGNvbnN0IGZldGNoSXBmc0FkZHJlc3MgPSBhc3luYyAoYWRkcmVzcyA9ICcnLCBjb25maWcgPSB7fSkgPT4ge1xuXG4gICAgaWYgKCFjb25maWcud2ViMykge1xuICAgICAgICB0aHJvdyBwanNFcnJvcihXRUIzX1JFUVVJUkVEKTtcbiAgICB9XG5cbiAgICBpZiAoIWNvbmZpZy5jb250cmFjdHMgfHwgIWNvbmZpZy5jb250cmFjdHMuRGF0YXNldCB8fCAhY29uZmlnLmNvbnRyYWN0cy5EYXRhc2V0LmFiaSkge1xuICAgICAgICB0aHJvdyBwanNFcnJvcihDT05UUkFDVF9SRVFVSVJFRCwgJ0RhdGFzZXQnKTtcbiAgICB9XG5cbiAgICBjb25zdCBkYXQgPSBuZXcgY29uZmlnLndlYjMuZXRoLkNvbnRyYWN0KGNvbmZpZy5jb250cmFjdHMuRGF0YXNldC5hYmksIGFkZHJlc3MpO1xuICAgIGNvbnN0IGlwZnNBZGRyZXNzID0gYXdhaXQgZGF0Lm1ldGhvZHNcbiAgICAgICAgLmlwZnNBZGRyZXNzKClcbiAgICAgICAgLmNhbGwoKTtcbiAgICByZXR1cm4gU3RyaW5nKGlwZnNBZGRyZXNzKTtcbn07XG5cbi8qKlxuICogR2V0IGRhdGEgZGltIGZyb20gRGF0YXNldCBjb250cmFjdCBieSB0aGUgZGF0YXNldCBhZGRyZXNzXG4gKiBcbiAqIEBwYXJhbSB7c3RyaW5nfSBhZGRyZXNzXG4gKiBAcGFyYW0ge09iamVjdH0gY29uZmlnIExpYnJhcnkgY29uZmlnIChwcm92aWRlZCBieSB0aGUgcHJveHkgYnV0IGNhbiBiZSBvdmVycmlkZGVuKVxuICogQHJldHVybnMge1Byb21pc2V9IEEgUHJvbWlzZSBvYmplY3QgcmVwcmVzZW50cyB0aGUge251bWJlcn1cbiAqL1xuZXhwb3J0IGNvbnN0IGZldGNoRGF0YURpbSA9IGFzeW5jIChhZGRyZXNzID0gJycsIGNvbmZpZyA9IHt9KSA9PiB7XG5cbiAgICBpZiAoIWNvbmZpZy53ZWIzKSB7XG4gICAgICAgIHRocm93IHBqc0Vycm9yKFdFQjNfUkVRVUlSRUQpO1xuICAgIH1cblxuICAgIGlmICghY29uZmlnLmNvbnRyYWN0cyB8fCAhY29uZmlnLmNvbnRyYWN0cy5EYXRhc2V0IHx8ICFjb25maWcuY29udHJhY3RzLkRhdGFzZXQuYWJpKSB7XG4gICAgICAgIHRocm93IHBqc0Vycm9yKENPTlRSQUNUX1JFUVVJUkVELCAnRGF0YXNldCcpO1xuICAgIH1cblxuICAgIGNvbnN0IGRhdCA9IG5ldyBjb25maWcud2ViMy5ldGguQ29udHJhY3QoY29uZmlnLmNvbnRyYWN0cy5EYXRhc2V0LmFiaSwgYWRkcmVzcyk7XG4gICAgY29uc3QgZGF0YURpbSA9IGF3YWl0IGRhdC5tZXRob2RzXG4gICAgICAgIC5kYXRhRGltKClcbiAgICAgICAgLmNhbGwoKTtcbiAgICByZXR1cm4gTnVtYmVyLnBhcnNlSW50KGRhdGFEaW0sIDEwKTtcbn07XG5cbi8qKlxuICogR2V0IGN1cnJlbnQgcHJpY2UgZnJvbSBEYXRhc2V0IGNvbnRyYWN0IGJ5IHRoZSBkYXRhc2V0IGFkZHJlc3NcbiAqIFxuICogQHBhcmFtIHtzdHJpbmd9IGFkZHJlc3NcbiAqIEBwYXJhbSB7T2JqZWN0fSBjb25maWcgTGlicmFyeSBjb25maWcgKHByb3ZpZGVkIGJ5IHRoZSBwcm94eSBidXQgY2FuIGJlIG92ZXJyaWRkZW4pXG4gKiBAcmV0dXJucyB7UHJvbWlzZX0gQSBQcm9taXNlIG9iamVjdCByZXByZXNlbnRzIHRoZSB7bnVtYmVyfVxuICovXG5leHBvcnQgY29uc3QgZmV0Y2hDdXJyZW50UHJpY2UgPSBhc3luYyAoYWRkcmVzcyA9ICcnLCBjb25maWcgPSB7fSkgPT4ge1xuXG4gICAgaWYgKCFjb25maWcud2ViMykge1xuICAgICAgICB0aHJvdyBwanNFcnJvcihXRUIzX1JFUVVJUkVEKTtcbiAgICB9XG5cbiAgICBpZiAoIWNvbmZpZy5jb250cmFjdHMgfHwgIWNvbmZpZy5jb250cmFjdHMuRGF0YXNldCB8fCAhY29uZmlnLmNvbnRyYWN0cy5EYXRhc2V0LmFiaSkge1xuICAgICAgICB0aHJvdyBwanNFcnJvcihDT05UUkFDVF9SRVFVSVJFRCwgJ0RhdGFzZXQnKTtcbiAgICB9XG5cbiAgICBjb25zdCBkYXQgPSBuZXcgY29uZmlnLndlYjMuZXRoLkNvbnRyYWN0KGNvbmZpZy5jb250cmFjdHMuRGF0YXNldC5hYmksIGFkZHJlc3MpO1xuICAgIGNvbnN0IGN1cnJlbnRQcmljZSA9IGF3YWl0IGRhdC5tZXRob2RzXG4gICAgICAgIC5jdXJyZW50UHJpY2UoKVxuICAgICAgICAuY2FsbCgpO1xuICAgIHJldHVybiBOdW1iZXIucGFyc2VJbnQoY3VycmVudFByaWNlLCAxMCk7XG59O1xuXG4vKipcbiAqIEdldCBkYXRhIHNhbXBsZXMgY291bnQgZnJvbSBEYXRhc2V0IGNvbnRyYWN0IGJ5IHRoZSBkYXRhc2V0IGFkZHJlc3NcbiAqIFxuICogQHBhcmFtIHtzdHJpbmd9IGFkZHJlc3NcbiAqIEBwYXJhbSB7T2JqZWN0fSBjb25maWcgTGlicmFyeSBjb25maWcgKHByb3ZpZGVkIGJ5IHRoZSBwcm94eSBidXQgY2FuIGJlIG92ZXJyaWRkZW4pXG4gKiBAcmV0dXJucyB7UHJvbWlzZX0gQSBQcm9taXNlIG9iamVjdCByZXByZXNlbnRzIHRoZSB7bnVtYmVyfVxuICovXG5leHBvcnQgY29uc3QgZmV0Y2hTYW1wbGVzQ291bnQgPSBhc3luYyAoYWRkcmVzcyA9ICcnLCBjb25maWcgPSB7fSkgPT4ge1xuXG4gICAgaWYgKCFjb25maWcud2ViMykge1xuICAgICAgICB0aHJvdyBwanNFcnJvcihXRUIzX1JFUVVJUkVEKTtcbiAgICB9XG5cbiAgICBpZiAoIWNvbmZpZy5jb250cmFjdHMgfHwgIWNvbmZpZy5jb250cmFjdHMuRGF0YXNldCB8fCAhY29uZmlnLmNvbnRyYWN0cy5EYXRhc2V0LmFiaSkge1xuICAgICAgICB0aHJvdyBwanNFcnJvcihDT05UUkFDVF9SRVFVSVJFRCwgJ0RhdGFzZXQnKTtcbiAgICB9XG5cbiAgICBjb25zdCBkYXQgPSBuZXcgY29uZmlnLndlYjMuZXRoLkNvbnRyYWN0KGNvbmZpZy5jb250cmFjdHMuRGF0YXNldC5hYmksIGFkZHJlc3MpO1xuICAgIGNvbnN0IHNhbXBsZXNDb3VudCA9IGF3YWl0IGRhdC5tZXRob2RzXG4gICAgICAgIC5zYW1wbGVzQ291bnQoKVxuICAgICAgICAuY2FsbCgpO1xuICAgIHJldHVybiBOdW1iZXIucGFyc2VJbnQoc2FtcGxlc0NvdW50LCAxMCk7XG59O1xuXG4vKipcbiAqIEdldCBkYXRhIGJhdGNoZXMgY291bnQgZnJvbSBEYXRhc2V0IGNvbnRyYWN0IGJ5IHRoZSBkYXRhc2V0IGFkZHJlc3NcbiAqIFxuICogQHBhcmFtIHtzdHJpbmd9IGFkZHJlc3NcbiAqIEBwYXJhbSB7T2JqZWN0fSBjb25maWcgTGlicmFyeSBjb25maWcgKHByb3ZpZGVkIGJ5IHRoZSBwcm94eSBidXQgY2FuIGJlIG92ZXJyaWRkZW4pXG4gKiBAcmV0dXJucyB7UHJvbWlzZX0gQSBQcm9taXNlIG9iamVjdCByZXByZXNlbnRzIHRoZSB7bnVtYmVyfVxuICovXG5leHBvcnQgY29uc3QgZmV0Y2hCYXRjaGVzQ291bnQgPSBhc3luYyAoYWRkcmVzcyA9ICcnLCBjb25maWcgPSB7fSkgPT4ge1xuXG4gICAgaWYgKCFjb25maWcud2ViMykge1xuICAgICAgICB0aHJvdyBwanNFcnJvcihXRUIzX1JFUVVJUkVEKTtcbiAgICB9XG5cbiAgICBpZiAoIWNvbmZpZy5jb250cmFjdHMgfHwgIWNvbmZpZy5jb250cmFjdHMuRGF0YXNldCB8fCAhY29uZmlnLmNvbnRyYWN0cy5EYXRhc2V0LmFiaSkge1xuICAgICAgICB0aHJvdyBwanNFcnJvcihDT05UUkFDVF9SRVFVSVJFRCwgJ0RhdGFzZXQnKTtcbiAgICB9XG5cbiAgICBjb25zdCBkYXQgPSBuZXcgY29uZmlnLndlYjMuZXRoLkNvbnRyYWN0KGNvbmZpZy5jb250cmFjdHMuRGF0YXNldC5hYmksIGFkZHJlc3MpO1xuICAgIGNvbnN0IGJhdGNoZXNDb3VudCA9IGF3YWl0IGRhdC5tZXRob2RzXG4gICAgICAgIC5iYXRjaGVzQ291bnQoKVxuICAgICAgICAuY2FsbCgpO1xuICAgIHJldHVybiBOdW1iZXIucGFyc2VJbnQoYmF0Y2hlc0NvdW50LCAxMCk7XG59O1xuXG4vKipcbiAqIEdldCBkYXRhc2V0IGJ5IHRoZSBkYXRhc2V0IGFkZHJlc3NcbiAqIFxuICogQHBhcmFtIHtzdHJpbmd9IGFkZHJlc3NcbiAqIEBwYXJhbSB7T2JqZWN0fSBjb25maWcgTGlicmFyeSBjb25maWcgKHByb3ZpZGVkIGJ5IHRoZSBwcm94eSBidXQgY2FuIGJlIG92ZXJyaWRkZW4pXG4gKiBAcmV0dXJucyB7UHJvbWlzZX0gUHJvbWlzZSBvYmplY3QgcmVwcmVzZW50cyB0aGUge09iamVjdFtdfVxuICovXG5leHBvcnQgY29uc3QgZmV0Y2hEYXRhc2V0ID0gYXN5bmMgKGFkZHJlc3MgPSAnJywgY29uZmlnID0ge30pID0+IHtcblxuICAgIHRyeSB7XG5cbiAgICAgICAgY29uc3QgaXBmc0FkZHJlc3MgPSBhd2FpdCBmZXRjaElwZnNBZGRyZXNzKGFkZHJlc3MsIGNvbmZpZyk7XG4gICAgICAgIGNvbnN0IGRhdGFEaW0gPSBhd2FpdCBmZXRjaERhdGFEaW0oYWRkcmVzcywgY29uZmlnKTtcbiAgICAgICAgY29uc3QgY3VycmVudFByaWNlID0gYXdhaXQgZmV0Y2hDdXJyZW50UHJpY2UoYWRkcmVzcywgY29uZmlnKTtcbiAgICAgICAgY29uc3Qgc2FtcGxlc0NvdW50ID0gYXdhaXQgZmV0Y2hTYW1wbGVzQ291bnQoYWRkcmVzcywgY29uZmlnKTtcbiAgICAgICAgY29uc3QgYmF0Y2hlc0NvdW50ID0gYXdhaXQgZmV0Y2hCYXRjaGVzQ291bnQoYWRkcmVzcywgY29uZmlnKTtcblxuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgYWRkcmVzcyxcbiAgICAgICAgICAgIGlwZnNBZGRyZXNzLFxuICAgICAgICAgICAgZGF0YURpbSxcbiAgICAgICAgICAgIGN1cnJlbnRQcmljZSxcbiAgICAgICAgICAgIHNhbXBsZXNDb3VudCxcbiAgICAgICAgICAgIGJhdGNoZXNDb3VudFxuICAgICAgICB9O1xuICAgIH0gY2F0Y2goZXJyKSB7XG4gICAgICAgIHJldHVybiBQcm9taXNlLnJlamVjdChlcnIpO1xuICAgIH1cbn07XG5cbi8qKlxuICogR2V0IGFsbCBkYXRhc2V0c1xuICogXG4gKiBAcGFyYW0ge09iamVjdH0gY29uZmlnIExpYnJhcnkgY29uZmlnIChwcm92aWRlZCBieSB0aGUgcHJveHkgYnV0IGNhbiBiZSBvdmVycmlkZGVuKVxuICogQHJldHVybnMge1Byb21pc2V9IFByb21pc2Ugb2JqZWN0IHJlcHJlc2VudHMgdGhlIHtPYmplY3RbXX1cbiAqL1xuZXhwb3J0IGNvbnN0IGZldGNoQWxsID0gYXN5bmMgKGNvbmZpZyA9IHt9KSA9PiB7XG5cbiAgICBsZXQgaWQgPSAwO1xuICAgIGxldCByZWNvcmRzID0gW107XG4gICAgbGV0IGVycm9yID0gW107XG5cbiAgICB0cnkge1xuXG4gICAgICAgIC8vIEB0b2RvIEFkZCBtZXRob2QgZ2V0RGF0YXNldHNDb3VudCB0byB0aGUgUGFuZG9yYU1hcmtldCBjb250cmFjdCBmb3IgYXZvaWQgaXRlcmF0aW5nIHdpdGggXCJ3aGlsZVwiXG4gICAgICAgIHdoaWxlICh0cnVlKSB7XG5cbiAgICAgICAgICAgIGNvbnN0IGRhdGFzZXRBZGRyZXNzID0gYXdhaXQgZmV0Y2hBZGRyZXNzQnlJZChpZCsrLCBjb25maWcpOy8vIGNhbiBiZSAweDBcblxuICAgICAgICAgICAgaWYgKCtkYXRhc2V0QWRkcmVzcyA9PT0gMCkge1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgXG4gICAgICAgICAgICB0cnkge1xuXG4gICAgICAgICAgICAgICAgY29uc3QgZGF0YXNldE9iaiA9IGF3YWl0IGZldGNoRGF0YXNldChkYXRhc2V0QWRkcmVzcywgY29uZmlnKTtcbiAgICAgICAgICAgICAgICByZWNvcmRzLnB1c2goe1xuICAgICAgICAgICAgICAgICAgICBpZDogaWQsXG4gICAgICAgICAgICAgICAgICAgIC4uLmRhdGFzZXRPYmpcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH0gY2F0Y2goZXJyKSB7XG4gICAgICAgICAgICAgICAgXG4gICAgICAgICAgICAgICAgZXJyb3IucHVzaCh7XG4gICAgICAgICAgICAgICAgICAgIGFkZHJlc3M6IGRhdGFzZXRBZGRyZXNzLFxuICAgICAgICAgICAgICAgICAgICBlcnJvcjogZXJyLm1lc3NhZ2VcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH0gICAgICAgIFxuICAgICAgICB9ICAgICAgICBcbiAgICB9IGNhdGNoKGVycikge1xuICAgICAgICBlcnJvci5wdXNoKHtcbiAgICAgICAgICAgIGVycm9yOiBlcnIubWVzc2FnZVxuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICByZXR1cm4ge1xuICAgICAgICByZWNvcmRzLFxuICAgICAgICBlcnJvclxuICAgIH07XG59O1xuXG4vKipcbiAqIERlcGxveSBEYXRzZXQgY29udHJhY3QgdG8gdGhlIG5ldHdvcmtcbiAqIFxuICogQHBhcmFtIHtzdHJpbmd9IGRhdGFzZXRJcGZzSGFzaCBcbiAqIEBwYXJhbSB7T2JqZWN0fSBvcHRpb25zIHsgcHVibGlzaGVyLCBkaW1lbnNpb24sIHNhbXBsZXMsIHByaWNlIH0gXG4gKiBAcGFyYW0ge09iamVjdH0gY29uZmlnIExpYnJhcnkgY29uZmlnIChwcm92aWRlZCBieSB0aGUgcHJveHkgYnV0IGNhbiBiZSBvdmVycmlkZGVuKVxuICogQHJldHVybnMge1Byb21pc2V9IFByb21pc2Ugb2JqZWN0IHJlc29sdmVkIHRvIGNvbnRyYWN0IGFkZHJlc3NcbiAqL1xuZXhwb3J0IGNvbnN0IGRlcGxveSA9IGFzeW5jIChkYXRhc2V0SXBmc0hhc2gsIGJhdGNoZXNDb3VudCwgeyBwdWJsaXNoZXIsIGRpbWVuc2lvbiwgc2FtcGxlcywgcHJpY2UgfSwgY29uZmlnID0ge30pID0+IHtcblxuICAgIGlmICghY29uZmlnLndlYjMpIHtcbiAgICAgICAgdGhyb3cgcGpzRXJyb3IoV0VCM19SRVFVSVJFRCk7XG4gICAgfVxuXG4gICAgaWYgKCFjb25maWcuY29udHJhY3RzIHx8ICFjb25maWcuY29udHJhY3RzLkRhdGFzZXQgfHwgIWNvbmZpZy5jb250cmFjdHMuRGF0YXNldC5hYmkpIHtcbiAgICAgICAgdGhyb3cgcGpzRXJyb3IoQ09OVFJBQ1RfUkVRVUlSRUQsICdEYXRhc2V0Jyk7XG4gICAgfVxuXG4gICAgdHJ5IHtcbiAgICAgICAgY29uc3QgYXJncyA9IFtjb25maWcud2ViMy51dGlscy50b0hleChkYXRhc2V0SXBmc0hhc2gpLCBkaW1lbnNpb24sIHNhbXBsZXMsIGJhdGNoZXNDb3VudCwgcHJpY2VdO1xuICAgICAgICBcbiAgICAgICAgLy8gRXN0aW1hdGUgcmVxdWlyZWQgYW1vdW50IG9mIGdhc1xuICAgICAgICBjb25zdCBnYXMgPSBhd2FpdCB3ZWIzSGVscGVycy5lc3RpbWF0ZUdhcyhjb25maWcuY29udHJhY3RzLkRhdGFzZXQuYnl0ZWNvZGUsIGFyZ3MsIGNvbmZpZyk7XG5cbiAgICAgICAgLy8gQ3JlYXRlIGFuZCBkZXBsb3kgZGF0YXNldCBjb250cmFjdFxuICAgICAgICBjb25zdCBkYXRhc2V0Q29udHJhY3RBZGRyZXNzID0gYXdhaXQgd2ViM0hlbHBlcnMuZGVwbG95Q29udHJhY3QoY29uZmlnLmNvbnRyYWN0cy5EYXRhc2V0LCB7XG4gICAgICAgICAgICBhcmdzLFxuICAgICAgICAgICAgZnJvbTogcHVibGlzaGVyLFxuICAgICAgICAgICAgZ2FzOiBOdW1iZXIucGFyc2VJbnQoZ2FzICogMS41LCAxMClcbiAgICAgICAgfSwgY29uZmlnKTtcblxuICAgICAgICByZXR1cm4gZGF0YXNldENvbnRyYWN0QWRkcmVzcztcbiAgICB9IGNhdGNoKGVycikge1xuICAgICAgICByZXR1cm4gUHJvbWlzZS5yZWplY3QoZXJyKTtcbiAgICB9XG59O1xuXG4vKipcbiAqIEFkZCBkYXRhc2V0IHRvIG1hcmtldFxuICogXG4gKiBAcGFyYW0ge1N0cmluZ30gZGF0YXNldENvbnRyYWN0QWRkcmVzcyBcbiAqIEBwYXJhbSB7U3RyaW5nfSBwdWJsaXNoZXJBZGRyZXNzIFxuICogQHBhcmFtIHtPYmplY3R9IGNvbmZpZyBMaWJyYXJ5IGNvbmZpZyAocHJvdmlkZWQgYnkgdGhlIHByb3h5IGJ1dCBjYW4gYmUgb3ZlcnJpZGRlbilcbiAqIEByZXR1cm5zIHtQcm9taXNlfSBQcm9taXNlIG9iamVjdCByZXNvbHZlZCB0byB7c3RyaW5nfSBjb250cmFjdEFkZHJlc3NcbiAqL1xuZXhwb3J0IGNvbnN0IGFkZFRvTWFya2V0ID0gKGRhdGFzZXRDb250cmFjdEFkZHJlc3MsIHB1Ymxpc2hlckFkZHJlc3MsIGNvbmZpZyA9IHt9KSA9PiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG5cbiAgICBpZiAoIWNvbmZpZy53ZWIzKSB7XG4gICAgICAgIHRocm93IHBqc0Vycm9yKFdFQjNfUkVRVUlSRUQpO1xuICAgIH1cblxuICAgIGlmICghY29uZmlnLmNvbnRyYWN0cyB8fCAhY29uZmlnLmNvbnRyYWN0cy5QYW5kb3JhTWFya2V0IHx8ICFjb25maWcuY29udHJhY3RzLlBhbmRvcmFNYXJrZXQuYWJpKSB7XG4gICAgICAgIHRocm93IHBqc0Vycm9yKENPTlRSQUNUX1JFUVVJUkVELCAnUGFuZG9yYU1hcmtldCcpO1xuICAgIH1cblxuICAgIGlmICghY29uZmlnLmFkZHJlc3NlcyB8fCAhY29uZmlnLmFkZHJlc3Nlcy5tYXJrZXQpIHtcbiAgICAgICAgdGhyb3cgcGpzRXJyb3IoQUREUkVTU19SRVFVSVJFRCwgJ01hcmtldCcpO1xuICAgIH1cblxuICAgIGlmICghY29uZmlnLndlYjMuY3VycmVudFByb3ZpZGVyLmlzTWV0YU1hc2spIHtcbiAgICAgICAgdGhyb3cgcGpzRXJyb3IoV0VCM19NRVRBTUFTS19SRVFVSVJFRCk7XG4gICAgfVxuXG4gICAgY29uc3QgbWFya2V0ID0gbmV3IGNvbmZpZy53ZWIzLmV0aC5Db250cmFjdChjb25maWcuY29udHJhY3RzLlBhbmRvcmFNYXJrZXQuYWJpLCBjb25maWcuYWRkcmVzc2VzLm1hcmtldCk7XG4gICAgbWFya2V0Lm1ldGhvZHNcbiAgICAgICAgLmFkZERhdGFzZXQoZGF0YXNldENvbnRyYWN0QWRkcmVzcylcbiAgICAgICAgLnNlbmQoe1xuICAgICAgICAgICAgZnJvbTogcHVibGlzaGVyQWRkcmVzc1xuICAgICAgICB9KVxuICAgICAgICAub24oJ2Vycm9yJywgcmVqZWN0KVxuICAgICAgICAub24oJ3JlY2VpcHQnLCByZWNlaXB0ID0+IHJlc29sdmUocmVjZWlwdC5jb250cmFjdEFkZHJlc3MpKTtcbn0pO1xuXG4vKipcbiAqIEhhbmRsZSBldmVudCBEYXRhc2V0QWRkZWRcbiAqIFxuICogQHBhcmFtIHtGdW5jdGlvbn0gc3RvcmVDYWxsYmFjayBcbiAqIEBwYXJhbSB7RnVuY3Rpb259IGVycm9yQ2FsbGJhY2tcbiAqIEBwYXJhbSB7T2JqZWN0fSBjb25maWcgTGlicmFyeSBjb25maWcgKHByb3ZpZGVkIGJ5IHRoZSBwcm94eSBidXQgY2FuIGJlIG92ZXJyaWRkZW4pXG4gKi9cbmV4cG9ydCBjb25zdCBldmVudERhdGFzZXRBZGRlZCA9IChzdG9yZUNhbGxiYWNrID0gKCkgPT4ge30sIGVycm9yQ2FsbGJhY2sgPSAoKSA9PiB7fSwgY29uZmlnID0ge30pID0+IHtcblxuICAgIGlmICghY29uZmlnLndlYjMpIHtcbiAgICAgICAgdGhyb3cgcGpzRXJyb3IoV0VCM19SRVFVSVJFRCk7XG4gICAgfVxuXG4gICAgaWYgKCFjb25maWcuY29udHJhY3RzIHx8ICFjb25maWcuY29udHJhY3RzLlBhbmRvcmFNYXJrZXQgfHwgIWNvbmZpZy5jb250cmFjdHMuUGFuZG9yYU1hcmtldC5hYmkpIHtcbiAgICAgICAgdGhyb3cgcGpzRXJyb3IoQ09OVFJBQ1RfUkVRVUlSRUQsICdQYW5kb3JhTWFya2V0Jyk7XG4gICAgfVxuXG4gICAgaWYgKCFjb25maWcuYWRkcmVzc2VzIHx8ICFjb25maWcuYWRkcmVzc2VzLm1hcmtldCkge1xuICAgICAgICB0aHJvdyBwanNFcnJvcihBRERSRVNTX1JFUVVJUkVELCAnTWFya2V0Jyk7XG4gICAgfVxuXG4gICAgY29uc3QgbWFyID0gbmV3IGNvbmZpZy53ZWIzLmV0aC5Db250cmFjdChjb25maWcuY29udHJhY3RzLlBhbmRvcmFNYXJrZXQuYWJpLCBjb25maWcuYWRkcmVzc2VzLm1hcmtldCk7XG4gICAgbWFyLmV2ZW50cy5EYXRhc2V0QWRkZWQoe1xuICAgICAgICBmcm9tQmxvY2s6IDBcbiAgICB9KVxuICAgICAgICAub24oJ2RhdGEnLCBhc3luYyByZXMgPT4ge1xuXG4gICAgICAgICAgICB0cnkge1xuXG4gICAgICAgICAgICAgICAgY29uc3QgZGF0YXNldCA9IGF3YWl0IGZldGNoRGF0YXNldChyZXMuYXJncy5kYXRhc2V0LCBjb25maWcpO1xuICAgICAgICAgICAgICAgIHN0b3JlQ2FsbGJhY2soe1xuICAgICAgICAgICAgICAgICAgICBhZGRyZXNzOiByZXMuYXJncy5kYXRhc2V0LFxuICAgICAgICAgICAgICAgICAgICBkYXRhc2V0LFxuICAgICAgICAgICAgICAgICAgICBzdGF0dXM6ICdjcmVhdGVkJyxcbiAgICAgICAgICAgICAgICAgICAgZXZlbnQ6ICdQYW5kb3JhTWFya2V0LkRhdGFzZXRBZGRlZCdcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH0gY2F0Y2goZXJyKSB7XG4gICAgICAgICAgICAgICAgZXJyb3JDYWxsYmFjayhlcnIpO1xuICAgICAgICAgICAgfSAgICAgICAgICAgIFxuICAgICAgICB9KVxuICAgICAgICAub24oJ2Vycm9yJywgZXJyb3JDYWxsYmFjayk7XG59O1xuIl19