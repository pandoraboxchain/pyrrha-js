/**
 * Datasets related methods
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
exports.eventDatasetAdded = exports.addToMarket = exports.deploy = exports.fetchAll = exports.fetchDataset = exports.fetchBatchesCount = exports.fetchSamplesCount = exports.fetchCurrentPrice = exports.fetchDataDim = exports.fetchIpfsAddress = exports.fetchAddressById = void 0;

var _errors = _interopRequireWildcard(require("./helpers/errors"));

var web3Helpers = _interopRequireWildcard(require("./helpers/web3"));

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; var ownKeys = Object.keys(source); if (typeof Object.getOwnPropertySymbols === 'function') { ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) { return Object.getOwnPropertyDescriptor(source, sym).enumerable; })); } ownKeys.forEach(function (key) { _defineProperty(target, key, source[key]); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

/**
 * Get Dataset address by kernel id
 * 
 * @param {number} id
 * @param {Object} config Library config (provided by the proxy but can be overridden)
 * @returns {Promise} A Promise object represents the {string}
 */
var fetchAddressById = async function fetchAddressById(id) {
  var config = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

  if (!config.web3) {
    throw (0, _errors.default)(_errors.WEB3_REQUIRED);
  }

  if (!config.contracts || !config.contracts.PandoraMarket || !config.contracts.PandoraMarket.abi) {
    throw (0, _errors.default)(_errors.CONTRACT_REQUIRED, 'PandoraMarket');
  }

  if (!config.addresses || !config.addresses.market) {
    throw (0, _errors.default)(_errors.ADDRESS_REQUIRED, 'Market');
  }

  var mar = new config.web3.eth.Contract(config.contracts.PandoraMarket.abi, config.addresses.market);
  var datasetContract = await mar.methods.datasets(id).call();
  return datasetContract;
};
/**
 * Get IPFS address from Dataset contract by the dataset address
 * 
 * @param {string} address
 * @param {Object} config Library config (provided by the proxy but can be overridden)
 * @returns {Promise} A Promise object represents the {string}
 */


exports.fetchAddressById = fetchAddressById;

var fetchIpfsAddress = async function fetchIpfsAddress() {
  var address = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';
  var config = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

  if (!config.web3) {
    throw (0, _errors.default)(_errors.WEB3_REQUIRED);
  }

  if (!config.contracts || !config.contracts.Dataset || !config.contracts.Dataset.abi) {
    throw (0, _errors.default)(_errors.CONTRACT_REQUIRED, 'Dataset');
  }

  var dat = new config.web3.eth.Contract(config.contracts.Dataset.abi, address);
  var ipfsAddress = await dat.methods.ipfsAddress().call();
  return String(ipfsAddress);
};
/**
 * Get data dim from Dataset contract by the dataset address
 * 
 * @param {string} address
 * @param {Object} config Library config (provided by the proxy but can be overridden)
 * @returns {Promise} A Promise object represents the {number}
 */


exports.fetchIpfsAddress = fetchIpfsAddress;

var fetchDataDim = async function fetchDataDim() {
  var address = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';
  var config = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

  if (!config.web3) {
    throw (0, _errors.default)(_errors.WEB3_REQUIRED);
  }

  if (!config.contracts || !config.contracts.Dataset || !config.contracts.Dataset.abi) {
    throw (0, _errors.default)(_errors.CONTRACT_REQUIRED, 'Dataset');
  }

  var dat = new config.web3.eth.Contract(config.contracts.Dataset.abi, address);
  var dataDim = await dat.methods.dataDim().call();
  return Number.parseInt(dataDim, 10);
};
/**
 * Get current price from Dataset contract by the dataset address
 * 
 * @param {string} address
 * @param {Object} config Library config (provided by the proxy but can be overridden)
 * @returns {Promise} A Promise object represents the {number}
 */


exports.fetchDataDim = fetchDataDim;

var fetchCurrentPrice = async function fetchCurrentPrice() {
  var address = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';
  var config = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

  if (!config.web3) {
    throw (0, _errors.default)(_errors.WEB3_REQUIRED);
  }

  if (!config.contracts || !config.contracts.Dataset || !config.contracts.Dataset.abi) {
    throw (0, _errors.default)(_errors.CONTRACT_REQUIRED, 'Dataset');
  }

  var dat = new config.web3.eth.Contract(config.contracts.Dataset.abi, address);
  var currentPrice = await dat.methods.currentPrice().call();
  return Number.parseInt(currentPrice, 10);
};
/**
 * Get data samples count from Dataset contract by the dataset address
 * 
 * @param {string} address
 * @param {Object} config Library config (provided by the proxy but can be overridden)
 * @returns {Promise} A Promise object represents the {number}
 */


exports.fetchCurrentPrice = fetchCurrentPrice;

var fetchSamplesCount = async function fetchSamplesCount() {
  var address = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';
  var config = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

  if (!config.web3) {
    throw (0, _errors.default)(_errors.WEB3_REQUIRED);
  }

  if (!config.contracts || !config.contracts.Dataset || !config.contracts.Dataset.abi) {
    throw (0, _errors.default)(_errors.CONTRACT_REQUIRED, 'Dataset');
  }

  var dat = new config.web3.eth.Contract(config.contracts.Dataset.abi, address);
  var samplesCount = await dat.methods.samplesCount().call();
  return Number.parseInt(samplesCount, 10);
};
/**
 * Get data batches count from Dataset contract by the dataset address
 * 
 * @param {string} address
 * @param {Object} config Library config (provided by the proxy but can be overridden)
 * @returns {Promise} A Promise object represents the {number}
 */


exports.fetchSamplesCount = fetchSamplesCount;

var fetchBatchesCount = async function fetchBatchesCount() {
  var address = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';
  var config = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

  if (!config.web3) {
    throw (0, _errors.default)(_errors.WEB3_REQUIRED);
  }

  if (!config.contracts || !config.contracts.Dataset || !config.contracts.Dataset.abi) {
    throw (0, _errors.default)(_errors.CONTRACT_REQUIRED, 'Dataset');
  }

  var dat = new config.web3.eth.Contract(config.contracts.Dataset.abi, address);
  var batchesCount = await dat.methods.batchesCount().call();
  return Number.parseInt(batchesCount, 10);
};
/**
 * Get dataset by the dataset address
 * 
 * @param {string} address
 * @param {Object} config Library config (provided by the proxy but can be overridden)
 * @returns {Promise} Promise object represents the {Object[]}
 */


exports.fetchBatchesCount = fetchBatchesCount;

var fetchDataset = async function fetchDataset() {
  var address = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';
  var config = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

  try {
    var ipfsAddress = await fetchIpfsAddress(address, config);
    var dataDim = await fetchDataDim(address, config);
    var currentPrice = await fetchCurrentPrice(address, config);
    var samplesCount = await fetchSamplesCount(address, config);
    var batchesCount = await fetchBatchesCount(address, config);
    return {
      address: address,
      ipfsAddress: ipfsAddress,
      dataDim: dataDim,
      currentPrice: currentPrice,
      samplesCount: samplesCount,
      batchesCount: batchesCount
    };
  } catch (err) {
    return Promise.reject(err);
  }
};
/**
 * Get all datasets
 * 
 * @param {Object} config Library config (provided by the proxy but can be overridden)
 * @returns {Promise} Promise object represents the {Object[]}
 */


exports.fetchDataset = fetchDataset;

var fetchAll = async function fetchAll() {
  var config = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  var id = 0;
  var records = [];
  var error = [];

  try {
    // @todo Add method getDatasetsCount to the PandoraMarket contract for avoid iterating with "while"
    while (true) {
      var datasetAddress = await fetchAddressById(id++, config); // can be 0x0

      if (+datasetAddress === 0) {
        break;
      }

      try {
        var datasetObj = await fetchDataset(datasetAddress, config);
        records.push(_objectSpread({
          id: id
        }, datasetObj));
      } catch (err) {
        error.push({
          address: datasetAddress,
          error: err.message
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
 * Deploy Datset contract to the network
 * 
 * @param {string} datasetIpfsHash 
 * @param {Object} options { publisher, dimension, samples, price } 
 * @param {Object} config Library config (provided by the proxy but can be overridden)
 * @returns {Promise} Promise object resolved to contract address
 */


exports.fetchAll = fetchAll;

var deploy = async function deploy(datasetIpfsHash, batchesCount, _ref) {
  var publisher = _ref.publisher,
      dimension = _ref.dimension,
      samples = _ref.samples,
      price = _ref.price;
  var config = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : {};

  if (!config.web3) {
    throw (0, _errors.default)(_errors.WEB3_REQUIRED);
  }

  if (!config.contracts || !config.contracts.Dataset || !config.contracts.Dataset.abi) {
    throw (0, _errors.default)(_errors.CONTRACT_REQUIRED, 'Dataset');
  }

  try {
    var args = [config.web3.utils.toHex(datasetIpfsHash), dimension, samples, batchesCount, price]; // Estimate required amount of gas

    var gas = await web3Helpers.estimateGas(config.contracts.Dataset.bytecode, args, config); // Create and deploy dataset contract

    var datasetContractAddress = await web3Helpers.deployContract(config.contracts.Dataset, {
      args: args,
      from: publisher,
      gas: Number.parseInt(gas * 1.5, 10)
    }, config);
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
 */


exports.deploy = deploy;

var addToMarket = function addToMarket(datasetContractAddress, publisherAddress) {
  var config = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
  return new Promise(function (resolve, reject) {
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

    var market = new config.web3.eth.Contract(config.contracts.PandoraMarket.abi, config.addresses.market);
    market.methods.addDataset(datasetContractAddress).send({
      from: publisherAddress
    }).on('error', reject).on('receipt', function (receipt) {
      return resolve(receipt.contractAddress);
    });
  });
};
/**
 * Handle event DatasetAdded
 * 
 * @param {Function} storeCallback 
 * @param {Function} errorCallback
 * @param {Object} config Library config (provided by the proxy but can be overridden)
 */


exports.addToMarket = addToMarket;

var eventDatasetAdded = function eventDatasetAdded() {
  var storeCallback = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : function () {};
  var errorCallback = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : function () {};
  var config = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};

  if (!config.web3) {
    throw (0, _errors.default)(_errors.WEB3_REQUIRED);
  }

  if (!config.contracts || !config.contracts.PandoraMarket || !config.contracts.PandoraMarket.abi) {
    throw (0, _errors.default)(_errors.CONTRACT_REQUIRED, 'PandoraMarket');
  }

  if (!config.addresses || !config.addresses.market) {
    throw (0, _errors.default)(_errors.ADDRESS_REQUIRED, 'Market');
  }

  var mar = new config.web3.eth.Contract(config.contracts.PandoraMarket.abi, config.addresses.market);
  mar.events.DatasetAdded({
    fromBlock: 0
  }).on('data', async function (res) {
    try {
      var dataset = await fetchDataset(res.args.dataset, config);
      storeCallback({
        address: res.args.dataset,
        dataset: dataset,
        status: 'created',
        event: 'PandoraMarket.DatasetAdded'
      });
    } catch (err) {
      errorCallback(err);
    }
  }).on('error', errorCallback);
};

exports.eventDatasetAdded = eventDatasetAdded;