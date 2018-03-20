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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9kYXRhc2V0cy5qcyJdLCJuYW1lcyI6WyJmZXRjaEFkZHJlc3NCeUlkIiwiaWQiLCJjb25maWciLCJ3ZWIzIiwiV0VCM19SRVFVSVJFRCIsImNvbnRyYWN0cyIsIlBhbmRvcmFNYXJrZXQiLCJhYmkiLCJDT05UUkFDVF9SRVFVSVJFRCIsImFkZHJlc3NlcyIsIm1hcmtldCIsIkFERFJFU1NfUkVRVUlSRUQiLCJtYXIiLCJldGgiLCJDb250cmFjdCIsImRhdGFzZXRDb250cmFjdCIsIm1ldGhvZHMiLCJkYXRhc2V0cyIsImNhbGwiLCJmZXRjaElwZnNBZGRyZXNzIiwiYWRkcmVzcyIsIkRhdGFzZXQiLCJkYXQiLCJpcGZzQWRkcmVzcyIsIlN0cmluZyIsImZldGNoRGF0YURpbSIsImRhdGFEaW0iLCJOdW1iZXIiLCJwYXJzZUludCIsImZldGNoQ3VycmVudFByaWNlIiwiY3VycmVudFByaWNlIiwiZmV0Y2hTYW1wbGVzQ291bnQiLCJzYW1wbGVzQ291bnQiLCJmZXRjaEJhdGNoZXNDb3VudCIsImJhdGNoZXNDb3VudCIsImZldGNoRGF0YXNldCIsImVyciIsIlByb21pc2UiLCJyZWplY3QiLCJmZXRjaEFsbCIsInJlY29yZHMiLCJlcnJvciIsImRhdGFzZXRBZGRyZXNzIiwiZGF0YXNldE9iaiIsInB1c2giLCJtZXNzYWdlIiwiZGVwbG95IiwiZGF0YXNldElwZnNIYXNoIiwicHVibGlzaGVyIiwiZGltZW5zaW9uIiwic2FtcGxlcyIsInByaWNlIiwiYXJncyIsInV0aWxzIiwidG9IZXgiLCJnYXMiLCJ3ZWIzSGVscGVycyIsImVzdGltYXRlR2FzIiwiYnl0ZWNvZGUiLCJkYXRhc2V0Q29udHJhY3RBZGRyZXNzIiwiZGVwbG95Q29udHJhY3QiLCJmcm9tIiwiYWRkVG9NYXJrZXQiLCJwdWJsaXNoZXJBZGRyZXNzIiwicmVzb2x2ZSIsImN1cnJlbnRQcm92aWRlciIsImlzTWV0YU1hc2siLCJXRUIzX01FVEFNQVNLX1JFUVVJUkVEIiwiYWRkRGF0YXNldCIsInNlbmQiLCJvbiIsInJlY2VpcHQiLCJjb250cmFjdEFkZHJlc3MiLCJldmVudERhdGFzZXRBZGRlZCIsInN0b3JlQ2FsbGJhY2siLCJlcnJvckNhbGxiYWNrIiwiZXZlbnRzIiwiRGF0YXNldEFkZGVkIiwiZnJvbUJsb2NrIiwicmVzIiwiZGF0YXNldCIsInN0YXR1cyIsImV2ZW50Il0sIm1hcHBpbmdzIjoiQUFBQTs7Ozs7Ozs7QUFTQTs7Ozs7OztBQUVBOztBQU1BOzs7Ozs7OztBQUVBOzs7Ozs7O0FBT08sSUFBTUEsbUJBQW1CLGVBQW5CQSxnQkFBbUIsQ0FBT0MsRUFBUCxFQUEyQjtBQUFBLE1BQWhCQyxNQUFnQix1RUFBUCxFQUFPOztBQUV2RCxNQUFJLENBQUNBLE9BQU9DLElBQVosRUFBa0I7QUFDZCxVQUFNLHFCQUFTQyxxQkFBVCxDQUFOO0FBQ0g7O0FBRUQsTUFBSSxDQUFDRixPQUFPRyxTQUFSLElBQXFCLENBQUNILE9BQU9HLFNBQVAsQ0FBaUJDLGFBQXZDLElBQXdELENBQUNKLE9BQU9HLFNBQVAsQ0FBaUJDLGFBQWpCLENBQStCQyxHQUE1RixFQUFpRztBQUM3RixVQUFNLHFCQUFTQyx5QkFBVCxFQUE0QixlQUE1QixDQUFOO0FBQ0g7O0FBRUQsTUFBSSxDQUFDTixPQUFPTyxTQUFSLElBQXFCLENBQUNQLE9BQU9PLFNBQVAsQ0FBaUJDLE1BQTNDLEVBQW1EO0FBQy9DLFVBQU0scUJBQVNDLHdCQUFULEVBQTJCLFFBQTNCLENBQU47QUFDSDs7QUFFRCxNQUFNQyxNQUFNLElBQUlWLE9BQU9DLElBQVAsQ0FBWVUsR0FBWixDQUFnQkMsUUFBcEIsQ0FBNkJaLE9BQU9HLFNBQVAsQ0FBaUJDLGFBQWpCLENBQStCQyxHQUE1RCxFQUFpRUwsT0FBT08sU0FBUCxDQUFpQkMsTUFBbEYsQ0FBWjtBQUNBLE1BQU1LLGtCQUFrQixNQUFNSCxJQUFJSSxPQUFKLENBQ3pCQyxRQUR5QixDQUNoQmhCLEVBRGdCLEVBRXpCaUIsSUFGeUIsRUFBOUI7QUFHQSxTQUFPSCxlQUFQO0FBQ0gs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QUFXO0FBQ1R1QyxvQkFBY3ZDLEdBQWQ7QUFDSDtBQUNKLEdBakJMLEVBa0JLa0MsRUFsQkwsQ0FrQlEsT0FsQlIsRUFrQmlCSyxhQWxCakI7QUFtQkgsQ0FsQ00iLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIERhdGFzZXRzIHJlbGF0ZWQgbWV0aG9kc1xuICogVGhpcyBmaWxlIGl0IGlzIGEgcGFydCBvZiB0aGUgUGFuZG9yYSBQeXJyaGEgSmF2YXNjcmlwdCBsaWJyYXJ5XG4gKiBcbiAqIEBmaWxlIGtlcm5lbHMuanNcbiAqIEBhdXRob3IgS29zdGlhbnR5biBTbXlybm92IDxrb3N0eXNoQGdtYWlsLmNvbT5cbiAqIEBkYXRlIDIwMThcbiAqL1xuXG4ndXNlIHN0cmljdCc7XG5cbmltcG9ydCBwanNFcnJvciwge1xuICAgIENPTlRSQUNUX1JFUVVJUkVELFxuICAgIEFERFJFU1NfUkVRVUlSRUQsXG4gICAgV0VCM19SRVFVSVJFRCxcbiAgICBXRUIzX01FVEFNQVNLX1JFUVVJUkVEXG59IGZyb20gJy4vaGVscGVycy9lcnJvcnMnO1xuaW1wb3J0ICogYXMgd2ViM0hlbHBlcnMgZnJvbSAnLi9oZWxwZXJzL3dlYjMnO1xuXG4vKipcbiAqIEdldCBEYXRhc2V0IGFkZHJlc3MgYnkga2VybmVsIGlkXG4gKiBcbiAqIEBwYXJhbSB7bnVtYmVyfSBpZFxuICogQHBhcmFtIHtPYmplY3R9IGNvbmZpZyBMaWJyYXJ5IGNvbmZpZyAocHJvdmlkZWQgYnkgdGhlIHByb3h5IGJ1dCBjYW4gYmUgb3ZlcnJpZGRlbilcbiAqIEByZXR1cm5zIHtQcm9taXNlfSBBIFByb21pc2Ugb2JqZWN0IHJlcHJlc2VudHMgdGhlIHtzdHJpbmd9XG4gKi9cbmV4cG9ydCBjb25zdCBmZXRjaEFkZHJlc3NCeUlkID0gYXN5bmMgKGlkLCBjb25maWcgPSB7fSkgPT4ge1xuXG4gICAgaWYgKCFjb25maWcud2ViMykge1xuICAgICAgICB0aHJvdyBwanNFcnJvcihXRUIzX1JFUVVJUkVEKTtcbiAgICB9XG5cbiAgICBpZiAoIWNvbmZpZy5jb250cmFjdHMgfHwgIWNvbmZpZy5jb250cmFjdHMuUGFuZG9yYU1hcmtldCB8fCAhY29uZmlnLmNvbnRyYWN0cy5QYW5kb3JhTWFya2V0LmFiaSkge1xuICAgICAgICB0aHJvdyBwanNFcnJvcihDT05UUkFDVF9SRVFVSVJFRCwgJ1BhbmRvcmFNYXJrZXQnKTtcbiAgICB9XG5cbiAgICBpZiAoIWNvbmZpZy5hZGRyZXNzZXMgfHwgIWNvbmZpZy5hZGRyZXNzZXMubWFya2V0KSB7XG4gICAgICAgIHRocm93IHBqc0Vycm9yKEFERFJFU1NfUkVRVUlSRUQsICdNYXJrZXQnKTtcbiAgICB9XG5cbiAgICBjb25zdCBtYXIgPSBuZXcgY29uZmlnLndlYjMuZXRoLkNvbnRyYWN0KGNvbmZpZy5jb250cmFjdHMuUGFuZG9yYU1hcmtldC5hYmksIGNvbmZpZy5hZGRyZXNzZXMubWFya2V0KTtcbiAgICBjb25zdCBkYXRhc2V0Q29udHJhY3QgPSBhd2FpdCBtYXIubWV0aG9kc1xuICAgICAgICAuZGF0YXNldHMoaWQpXG4gICAgICAgIC5jYWxsKCk7XG4gICAgcmV0dXJuIGRhdGFzZXRDb250cmFjdDtcbn07XG5cbi8qKlxuICogR2V0IElQRlMgYWRkcmVzcyBmcm9tIERhdGFzZXQgY29udHJhY3QgYnkgdGhlIGRhdGFzZXQgYWRkcmVzc1xuICogXG4gKiBAcGFyYW0ge3N0cmluZ30gYWRkcmVzc1xuICogQHBhcmFtIHtPYmplY3R9IGNvbmZpZyBMaWJyYXJ5IGNvbmZpZyAocHJvdmlkZWQgYnkgdGhlIHByb3h5IGJ1dCBjYW4gYmUgb3ZlcnJpZGRlbilcbiAqIEByZXR1cm5zIHtQcm9taXNlfSBBIFByb21pc2Ugb2JqZWN0IHJlcHJlc2VudHMgdGhlIHtzdHJpbmd9XG4gKi9cbmV4cG9ydCBjb25zdCBmZXRjaElwZnNBZGRyZXNzID0gYXN5bmMgKGFkZHJlc3MgPSAnJywgY29uZmlnID0ge30pID0+IHtcblxuICAgIGlmICghY29uZmlnLndlYjMpIHtcbiAgICAgICAgdGhyb3cgcGpzRXJyb3IoV0VCM19SRVFVSVJFRCk7XG4gICAgfVxuXG4gICAgaWYgKCFjb25maWcuY29udHJhY3RzIHx8ICFjb25maWcuY29udHJhY3RzLkRhdGFzZXQgfHwgIWNvbmZpZy5jb250cmFjdHMuRGF0YXNldC5hYmkpIHtcbiAgICAgICAgdGhyb3cgcGpzRXJyb3IoQ09OVFJBQ1RfUkVRVUlSRUQsICdEYXRhc2V0Jyk7XG4gICAgfVxuXG4gICAgY29uc3QgZGF0ID0gbmV3IGNvbmZpZy53ZWIzLmV0aC5Db250cmFjdChjb25maWcuY29udHJhY3RzLkRhdGFzZXQuYWJpLCBhZGRyZXNzKTtcbiAgICBjb25zdCBpcGZzQWRkcmVzcyA9IGF3YWl0IGRhdC5tZXRob2RzXG4gICAgICAgIC5pcGZzQWRkcmVzcygpXG4gICAgICAgIC5jYWxsKCk7XG4gICAgcmV0dXJuIFN0cmluZyhpcGZzQWRkcmVzcyk7XG59O1xuXG4vKipcbiAqIEdldCBkYXRhIGRpbSBmcm9tIERhdGFzZXQgY29udHJhY3QgYnkgdGhlIGRhdGFzZXQgYWRkcmVzc1xuICogXG4gKiBAcGFyYW0ge3N0cmluZ30gYWRkcmVzc1xuICogQHBhcmFtIHtPYmplY3R9IGNvbmZpZyBMaWJyYXJ5IGNvbmZpZyAocHJvdmlkZWQgYnkgdGhlIHByb3h5IGJ1dCBjYW4gYmUgb3ZlcnJpZGRlbilcbiAqIEByZXR1cm5zIHtQcm9taXNlfSBBIFByb21pc2Ugb2JqZWN0IHJlcHJlc2VudHMgdGhlIHtudW1iZXJ9XG4gKi9cbmV4cG9ydCBjb25zdCBmZXRjaERhdGFEaW0gPSBhc3luYyAoYWRkcmVzcyA9ICcnLCBjb25maWcgPSB7fSkgPT4ge1xuXG4gICAgaWYgKCFjb25maWcud2ViMykge1xuICAgICAgICB0aHJvdyBwanNFcnJvcihXRUIzX1JFUVVJUkVEKTtcbiAgICB9XG5cbiAgICBpZiAoIWNvbmZpZy5jb250cmFjdHMgfHwgIWNvbmZpZy5jb250cmFjdHMuRGF0YXNldCB8fCAhY29uZmlnLmNvbnRyYWN0cy5EYXRhc2V0LmFiaSkge1xuICAgICAgICB0aHJvdyBwanNFcnJvcihDT05UUkFDVF9SRVFVSVJFRCwgJ0RhdGFzZXQnKTtcbiAgICB9XG5cbiAgICBjb25zdCBkYXQgPSBuZXcgY29uZmlnLndlYjMuZXRoLkNvbnRyYWN0KGNvbmZpZy5jb250cmFjdHMuRGF0YXNldC5hYmksIGFkZHJlc3MpO1xuICAgIGNvbnN0IGRhdGFEaW0gPSBhd2FpdCBkYXQubWV0aG9kc1xuICAgICAgICAuZGF0YURpbSgpXG4gICAgICAgIC5jYWxsKCk7XG4gICAgcmV0dXJuIE51bWJlci5wYXJzZUludChkYXRhRGltLCAxMCk7XG59O1xuXG4vKipcbiAqIEdldCBjdXJyZW50IHByaWNlIGZyb20gRGF0YXNldCBjb250cmFjdCBieSB0aGUgZGF0YXNldCBhZGRyZXNzXG4gKiBcbiAqIEBwYXJhbSB7c3RyaW5nfSBhZGRyZXNzXG4gKiBAcGFyYW0ge09iamVjdH0gY29uZmlnIExpYnJhcnkgY29uZmlnIChwcm92aWRlZCBieSB0aGUgcHJveHkgYnV0IGNhbiBiZSBvdmVycmlkZGVuKVxuICogQHJldHVybnMge1Byb21pc2V9IEEgUHJvbWlzZSBvYmplY3QgcmVwcmVzZW50cyB0aGUge251bWJlcn1cbiAqL1xuZXhwb3J0IGNvbnN0IGZldGNoQ3VycmVudFByaWNlID0gYXN5bmMgKGFkZHJlc3MgPSAnJywgY29uZmlnID0ge30pID0+IHtcblxuICAgIGlmICghY29uZmlnLndlYjMpIHtcbiAgICAgICAgdGhyb3cgcGpzRXJyb3IoV0VCM19SRVFVSVJFRCk7XG4gICAgfVxuXG4gICAgaWYgKCFjb25maWcuY29udHJhY3RzIHx8ICFjb25maWcuY29udHJhY3RzLkRhdGFzZXQgfHwgIWNvbmZpZy5jb250cmFjdHMuRGF0YXNldC5hYmkpIHtcbiAgICAgICAgdGhyb3cgcGpzRXJyb3IoQ09OVFJBQ1RfUkVRVUlSRUQsICdEYXRhc2V0Jyk7XG4gICAgfVxuXG4gICAgY29uc3QgZGF0ID0gbmV3IGNvbmZpZy53ZWIzLmV0aC5Db250cmFjdChjb25maWcuY29udHJhY3RzLkRhdGFzZXQuYWJpLCBhZGRyZXNzKTtcbiAgICBjb25zdCBjdXJyZW50UHJpY2UgPSBhd2FpdCBkYXQubWV0aG9kc1xuICAgICAgICAuY3VycmVudFByaWNlKClcbiAgICAgICAgLmNhbGwoKTtcbiAgICByZXR1cm4gTnVtYmVyLnBhcnNlSW50KGN1cnJlbnRQcmljZSwgMTApO1xufTtcblxuLyoqXG4gKiBHZXQgZGF0YSBzYW1wbGVzIGNvdW50IGZyb20gRGF0YXNldCBjb250cmFjdCBieSB0aGUgZGF0YXNldCBhZGRyZXNzXG4gKiBcbiAqIEBwYXJhbSB7c3RyaW5nfSBhZGRyZXNzXG4gKiBAcGFyYW0ge09iamVjdH0gY29uZmlnIExpYnJhcnkgY29uZmlnIChwcm92aWRlZCBieSB0aGUgcHJveHkgYnV0IGNhbiBiZSBvdmVycmlkZGVuKVxuICogQHJldHVybnMge1Byb21pc2V9IEEgUHJvbWlzZSBvYmplY3QgcmVwcmVzZW50cyB0aGUge251bWJlcn1cbiAqL1xuZXhwb3J0IGNvbnN0IGZldGNoU2FtcGxlc0NvdW50ID0gYXN5bmMgKGFkZHJlc3MgPSAnJywgY29uZmlnID0ge30pID0+IHtcblxuICAgIGlmICghY29uZmlnLndlYjMpIHtcbiAgICAgICAgdGhyb3cgcGpzRXJyb3IoV0VCM19SRVFVSVJFRCk7XG4gICAgfVxuXG4gICAgaWYgKCFjb25maWcuY29udHJhY3RzIHx8ICFjb25maWcuY29udHJhY3RzLkRhdGFzZXQgfHwgIWNvbmZpZy5jb250cmFjdHMuRGF0YXNldC5hYmkpIHtcbiAgICAgICAgdGhyb3cgcGpzRXJyb3IoQ09OVFJBQ1RfUkVRVUlSRUQsICdEYXRhc2V0Jyk7XG4gICAgfVxuXG4gICAgY29uc3QgZGF0ID0gbmV3IGNvbmZpZy53ZWIzLmV0aC5Db250cmFjdChjb25maWcuY29udHJhY3RzLkRhdGFzZXQuYWJpLCBhZGRyZXNzKTtcbiAgICBjb25zdCBzYW1wbGVzQ291bnQgPSBhd2FpdCBkYXQubWV0aG9kc1xuICAgICAgICAuc2FtcGxlc0NvdW50KClcbiAgICAgICAgLmNhbGwoKTtcbiAgICByZXR1cm4gTnVtYmVyLnBhcnNlSW50KHNhbXBsZXNDb3VudCwgMTApO1xufTtcblxuLyoqXG4gKiBHZXQgZGF0YSBiYXRjaGVzIGNvdW50IGZyb20gRGF0YXNldCBjb250cmFjdCBieSB0aGUgZGF0YXNldCBhZGRyZXNzXG4gKiBcbiAqIEBwYXJhbSB7c3RyaW5nfSBhZGRyZXNzXG4gKiBAcGFyYW0ge09iamVjdH0gY29uZmlnIExpYnJhcnkgY29uZmlnIChwcm92aWRlZCBieSB0aGUgcHJveHkgYnV0IGNhbiBiZSBvdmVycmlkZGVuKVxuICogQHJldHVybnMge1Byb21pc2V9IEEgUHJvbWlzZSBvYmplY3QgcmVwcmVzZW50cyB0aGUge251bWJlcn1cbiAqL1xuZXhwb3J0IGNvbnN0IGZldGNoQmF0Y2hlc0NvdW50ID0gYXN5bmMgKGFkZHJlc3MgPSAnJywgY29uZmlnID0ge30pID0+IHtcblxuICAgIGlmICghY29uZmlnLndlYjMpIHtcbiAgICAgICAgdGhyb3cgcGpzRXJyb3IoV0VCM19SRVFVSVJFRCk7XG4gICAgfVxuXG4gICAgaWYgKCFjb25maWcuY29udHJhY3RzIHx8ICFjb25maWcuY29udHJhY3RzLkRhdGFzZXQgfHwgIWNvbmZpZy5jb250cmFjdHMuRGF0YXNldC5hYmkpIHtcbiAgICAgICAgdGhyb3cgcGpzRXJyb3IoQ09OVFJBQ1RfUkVRVUlSRUQsICdEYXRhc2V0Jyk7XG4gICAgfVxuXG4gICAgY29uc3QgZGF0ID0gbmV3IGNvbmZpZy53ZWIzLmV0aC5Db250cmFjdChjb25maWcuY29udHJhY3RzLkRhdGFzZXQuYWJpLCBhZGRyZXNzKTtcbiAgICBjb25zdCBiYXRjaGVzQ291bnQgPSBhd2FpdCBkYXQubWV0aG9kc1xuICAgICAgICAuYmF0Y2hlc0NvdW50KClcbiAgICAgICAgLmNhbGwoKTtcbiAgICByZXR1cm4gTnVtYmVyLnBhcnNlSW50KGJhdGNoZXNDb3VudCwgMTApO1xufTtcblxuLyoqXG4gKiBHZXQgZGF0YXNldCBieSB0aGUgZGF0YXNldCBhZGRyZXNzXG4gKiBcbiAqIEBwYXJhbSB7c3RyaW5nfSBhZGRyZXNzXG4gKiBAcGFyYW0ge09iamVjdH0gY29uZmlnIExpYnJhcnkgY29uZmlnIChwcm92aWRlZCBieSB0aGUgcHJveHkgYnV0IGNhbiBiZSBvdmVycmlkZGVuKVxuICogQHJldHVybnMge1Byb21pc2V9IFByb21pc2Ugb2JqZWN0IHJlcHJlc2VudHMgdGhlIHtPYmplY3RbXX1cbiAqL1xuZXhwb3J0IGNvbnN0IGZldGNoRGF0YXNldCA9IGFzeW5jIChhZGRyZXNzID0gJycsIGNvbmZpZyA9IHt9KSA9PiB7XG5cbiAgICB0cnkge1xuXG4gICAgICAgIGNvbnN0IGlwZnNBZGRyZXNzID0gYXdhaXQgZmV0Y2hJcGZzQWRkcmVzcyhhZGRyZXNzLCBjb25maWcpO1xuICAgICAgICBjb25zdCBkYXRhRGltID0gYXdhaXQgZmV0Y2hEYXRhRGltKGFkZHJlc3MsIGNvbmZpZyk7XG4gICAgICAgIGNvbnN0IGN1cnJlbnRQcmljZSA9IGF3YWl0IGZldGNoQ3VycmVudFByaWNlKGFkZHJlc3MsIGNvbmZpZyk7XG4gICAgICAgIGNvbnN0IHNhbXBsZXNDb3VudCA9IGF3YWl0IGZldGNoU2FtcGxlc0NvdW50KGFkZHJlc3MsIGNvbmZpZyk7XG4gICAgICAgIGNvbnN0IGJhdGNoZXNDb3VudCA9IGF3YWl0IGZldGNoQmF0Y2hlc0NvdW50KGFkZHJlc3MsIGNvbmZpZyk7XG5cbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgIGFkZHJlc3MsXG4gICAgICAgICAgICBpcGZzQWRkcmVzcyxcbiAgICAgICAgICAgIGRhdGFEaW0sXG4gICAgICAgICAgICBjdXJyZW50UHJpY2UsXG4gICAgICAgICAgICBzYW1wbGVzQ291bnQsXG4gICAgICAgICAgICBiYXRjaGVzQ291bnRcbiAgICAgICAgfTtcbiAgICB9IGNhdGNoKGVycikge1xuICAgICAgICByZXR1cm4gUHJvbWlzZS5yZWplY3QoZXJyKTtcbiAgICB9XG59O1xuXG4vKipcbiAqIEdldCBhbGwgZGF0YXNldHNcbiAqIFxuICogQHBhcmFtIHtPYmplY3R9IGNvbmZpZyBMaWJyYXJ5IGNvbmZpZyAocHJvdmlkZWQgYnkgdGhlIHByb3h5IGJ1dCBjYW4gYmUgb3ZlcnJpZGRlbilcbiAqIEByZXR1cm5zIHtQcm9taXNlfSBQcm9taXNlIG9iamVjdCByZXByZXNlbnRzIHRoZSB7T2JqZWN0W119XG4gKi9cbmV4cG9ydCBjb25zdCBmZXRjaEFsbCA9IGFzeW5jIChjb25maWcgPSB7fSkgPT4ge1xuXG4gICAgbGV0IGlkID0gMDtcbiAgICBsZXQgcmVjb3JkcyA9IFtdO1xuICAgIGxldCBlcnJvciA9IFtdO1xuXG4gICAgdHJ5IHtcblxuICAgICAgICAvLyBAdG9kbyBBZGQgbWV0aG9kIGdldERhdGFzZXRzQ291bnQgdG8gdGhlIFBhbmRvcmFNYXJrZXQgY29udHJhY3QgZm9yIGF2b2lkIGl0ZXJhdGluZyB3aXRoIFwid2hpbGVcIlxuICAgICAgICB3aGlsZSAodHJ1ZSkge1xuXG4gICAgICAgICAgICBjb25zdCBkYXRhc2V0QWRkcmVzcyA9IGF3YWl0IGZldGNoQWRkcmVzc0J5SWQoaWQrKywgY29uZmlnKTsvLyBjYW4gYmUgMHgwXG5cbiAgICAgICAgICAgIGlmICgrZGF0YXNldEFkZHJlc3MgPT09IDApIHtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIFxuICAgICAgICAgICAgdHJ5IHtcblxuICAgICAgICAgICAgICAgIGNvbnN0IGRhdGFzZXRPYmogPSBhd2FpdCBmZXRjaERhdGFzZXQoZGF0YXNldEFkZHJlc3MsIGNvbmZpZyk7XG4gICAgICAgICAgICAgICAgcmVjb3Jkcy5wdXNoKHtcbiAgICAgICAgICAgICAgICAgICAgaWQ6IGlkLFxuICAgICAgICAgICAgICAgICAgICAuLi5kYXRhc2V0T2JqXG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9IGNhdGNoKGVycikge1xuICAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgICAgIGVycm9yLnB1c2goe1xuICAgICAgICAgICAgICAgICAgICBhZGRyZXNzOiBkYXRhc2V0QWRkcmVzcyxcbiAgICAgICAgICAgICAgICAgICAgZXJyb3I6IGVyci5tZXNzYWdlXG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9ICAgICAgICBcbiAgICAgICAgfSAgICAgICAgXG4gICAgfSBjYXRjaChlcnIpIHtcbiAgICAgICAgZXJyb3IucHVzaCh7XG4gICAgICAgICAgICBlcnJvcjogZXJyLm1lc3NhZ2VcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgcmV0dXJuIHtcbiAgICAgICAgcmVjb3JkcyxcbiAgICAgICAgZXJyb3JcbiAgICB9O1xufTtcblxuLyoqXG4gKiBEZXBsb3kgRGF0c2V0IGNvbnRyYWN0IHRvIHRoZSBuZXR3b3JrXG4gKiBcbiAqIEBwYXJhbSB7c3RyaW5nfSBkYXRhc2V0SXBmc0hhc2ggXG4gKiBAcGFyYW0ge09iamVjdH0gb3B0aW9ucyB7IHB1Ymxpc2hlciwgZGltZW5zaW9uLCBzYW1wbGVzLCBwcmljZSB9IFxuICogQHBhcmFtIHtPYmplY3R9IGNvbmZpZyBMaWJyYXJ5IGNvbmZpZyAocHJvdmlkZWQgYnkgdGhlIHByb3h5IGJ1dCBjYW4gYmUgb3ZlcnJpZGRlbilcbiAqIEByZXR1cm5zIHtQcm9taXNlfSBQcm9taXNlIG9iamVjdCByZXNvbHZlZCB0byBjb250cmFjdCBhZGRyZXNzXG4gKi9cbmV4cG9ydCBjb25zdCBkZXBsb3kgPSBhc3luYyAoZGF0YXNldElwZnNIYXNoLCBiYXRjaGVzQ291bnQsIHsgcHVibGlzaGVyLCBkaW1lbnNpb24sIHNhbXBsZXMsIHByaWNlIH0sIGNvbmZpZyA9IHt9KSA9PiB7XG5cbiAgICBpZiAoIWNvbmZpZy53ZWIzKSB7XG4gICAgICAgIHRocm93IHBqc0Vycm9yKFdFQjNfUkVRVUlSRUQpO1xuICAgIH1cblxuICAgIGlmICghY29uZmlnLmNvbnRyYWN0cyB8fCAhY29uZmlnLmNvbnRyYWN0cy5EYXRhc2V0IHx8ICFjb25maWcuY29udHJhY3RzLkRhdGFzZXQuYWJpKSB7XG4gICAgICAgIHRocm93IHBqc0Vycm9yKENPTlRSQUNUX1JFUVVJUkVELCAnRGF0YXNldCcpO1xuICAgIH1cblxuICAgIHRyeSB7XG4gICAgICAgIGNvbnN0IGFyZ3MgPSBbY29uZmlnLndlYjMudXRpbHMudG9IZXgoZGF0YXNldElwZnNIYXNoKSwgZGltZW5zaW9uLCBzYW1wbGVzLCBiYXRjaGVzQ291bnQsIHByaWNlXTtcbiAgICAgICAgXG4gICAgICAgIC8vIEVzdGltYXRlIHJlcXVpcmVkIGFtb3VudCBvZiBnYXNcbiAgICAgICAgY29uc3QgZ2FzID0gYXdhaXQgd2ViM0hlbHBlcnMuZXN0aW1hdGVHYXMoY29uZmlnLmNvbnRyYWN0cy5EYXRhc2V0LmJ5dGVjb2RlLCBhcmdzLCBjb25maWcpO1xuXG4gICAgICAgIC8vIENyZWF0ZSBhbmQgZGVwbG95IGRhdGFzZXQgY29udHJhY3RcbiAgICAgICAgY29uc3QgZGF0YXNldENvbnRyYWN0QWRkcmVzcyA9IGF3YWl0IHdlYjNIZWxwZXJzLmRlcGxveUNvbnRyYWN0KGNvbmZpZy5jb250cmFjdHMuRGF0YXNldCwge1xuICAgICAgICAgICAgYXJncyxcbiAgICAgICAgICAgIGZyb206IHB1Ymxpc2hlcixcbiAgICAgICAgICAgIGdhczogTnVtYmVyLnBhcnNlSW50KGdhcyAqIDEuNSwgMTApXG4gICAgICAgIH0sIGNvbmZpZyk7XG5cbiAgICAgICAgcmV0dXJuIGRhdGFzZXRDb250cmFjdEFkZHJlc3M7XG4gICAgfSBjYXRjaChlcnIpIHtcbiAgICAgICAgcmV0dXJuIFByb21pc2UucmVqZWN0KGVycik7XG4gICAgfVxufTtcblxuLyoqXG4gKiBBZGQgZGF0YXNldCB0byBtYXJrZXRcbiAqIFxuICogQHBhcmFtIHtTdHJpbmd9IGRhdGFzZXRDb250cmFjdEFkZHJlc3MgXG4gKiBAcGFyYW0ge1N0cmluZ30gcHVibGlzaGVyQWRkcmVzcyBcbiAqIEBwYXJhbSB7T2JqZWN0fSBjb25maWcgTGlicmFyeSBjb25maWcgKHByb3ZpZGVkIGJ5IHRoZSBwcm94eSBidXQgY2FuIGJlIG92ZXJyaWRkZW4pXG4gKiBAcmV0dXJucyB7UHJvbWlzZX0gUHJvbWlzZSBvYmplY3QgcmVzb2x2ZWQgdG8ge3N0cmluZ30gY29udHJhY3RBZGRyZXNzXG4gKi9cbmV4cG9ydCBjb25zdCBhZGRUb01hcmtldCA9IChkYXRhc2V0Q29udHJhY3RBZGRyZXNzLCBwdWJsaXNoZXJBZGRyZXNzLCBjb25maWcgPSB7fSkgPT4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuXG4gICAgaWYgKCFjb25maWcud2ViMykge1xuICAgICAgICB0aHJvdyBwanNFcnJvcihXRUIzX1JFUVVJUkVEKTtcbiAgICB9XG5cbiAgICBpZiAoIWNvbmZpZy5jb250cmFjdHMgfHwgIWNvbmZpZy5jb250cmFjdHMuUGFuZG9yYU1hcmtldCB8fCAhY29uZmlnLmNvbnRyYWN0cy5QYW5kb3JhTWFya2V0LmFiaSkge1xuICAgICAgICB0aHJvdyBwanNFcnJvcihDT05UUkFDVF9SRVFVSVJFRCwgJ1BhbmRvcmFNYXJrZXQnKTtcbiAgICB9XG5cbiAgICBpZiAoIWNvbmZpZy5hZGRyZXNzZXMgfHwgIWNvbmZpZy5hZGRyZXNzZXMubWFya2V0KSB7XG4gICAgICAgIHRocm93IHBqc0Vycm9yKEFERFJFU1NfUkVRVUlSRUQsICdNYXJrZXQnKTtcbiAgICB9XG5cbiAgICBpZiAoIWNvbmZpZy53ZWIzLmN1cnJlbnRQcm92aWRlci5pc01ldGFNYXNrKSB7XG4gICAgICAgIHRocm93IHBqc0Vycm9yKFdFQjNfTUVUQU1BU0tfUkVRVUlSRUQpO1xuICAgIH1cblxuICAgIGNvbnN0IG1hcmtldCA9IG5ldyBjb25maWcud2ViMy5ldGguQ29udHJhY3QoY29uZmlnLmNvbnRyYWN0cy5QYW5kb3JhTWFya2V0LmFiaSwgY29uZmlnLmFkZHJlc3Nlcy5tYXJrZXQpO1xuICAgIG1hcmtldC5tZXRob2RzXG4gICAgICAgIC5hZGREYXRhc2V0KGRhdGFzZXRDb250cmFjdEFkZHJlc3MpXG4gICAgICAgIC5zZW5kKHtcbiAgICAgICAgICAgIGZyb206IHB1Ymxpc2hlckFkZHJlc3NcbiAgICAgICAgfSlcbiAgICAgICAgLm9uKCdlcnJvcicsIHJlamVjdClcbiAgICAgICAgLm9uKCdyZWNlaXB0JywgcmVjZWlwdCA9PiByZXNvbHZlKHJlY2VpcHQuY29udHJhY3RBZGRyZXNzKSk7XG59KTtcblxuLyoqXG4gKiBIYW5kbGUgZXZlbnQgRGF0YXNldEFkZGVkXG4gKiBcbiAqIEBwYXJhbSB7RnVuY3Rpb259IHN0b3JlQ2FsbGJhY2sgXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBlcnJvckNhbGxiYWNrXG4gKiBAcGFyYW0ge09iamVjdH0gY29uZmlnIExpYnJhcnkgY29uZmlnIChwcm92aWRlZCBieSB0aGUgcHJveHkgYnV0IGNhbiBiZSBvdmVycmlkZGVuKVxuICovXG5leHBvcnQgY29uc3QgZXZlbnREYXRhc2V0QWRkZWQgPSAoc3RvcmVDYWxsYmFjayA9ICgpID0+IHt9LCBlcnJvckNhbGxiYWNrID0gKCkgPT4ge30sIGNvbmZpZyA9IHt9KSA9PiB7XG5cbiAgICBpZiAoIWNvbmZpZy53ZWIzKSB7XG4gICAgICAgIHRocm93IHBqc0Vycm9yKFdFQjNfUkVRVUlSRUQpO1xuICAgIH1cblxuICAgIGlmICghY29uZmlnLmNvbnRyYWN0cyB8fCAhY29uZmlnLmNvbnRyYWN0cy5QYW5kb3JhTWFya2V0IHx8ICFjb25maWcuY29udHJhY3RzLlBhbmRvcmFNYXJrZXQuYWJpKSB7XG4gICAgICAgIHRocm93IHBqc0Vycm9yKENPTlRSQUNUX1JFUVVJUkVELCAnUGFuZG9yYU1hcmtldCcpO1xuICAgIH1cblxuICAgIGlmICghY29uZmlnLmFkZHJlc3NlcyB8fCAhY29uZmlnLmFkZHJlc3Nlcy5tYXJrZXQpIHtcbiAgICAgICAgdGhyb3cgcGpzRXJyb3IoQUREUkVTU19SRVFVSVJFRCwgJ01hcmtldCcpO1xuICAgIH1cblxuICAgIGNvbnN0IG1hciA9IG5ldyBjb25maWcud2ViMy5ldGguQ29udHJhY3QoY29uZmlnLmNvbnRyYWN0cy5QYW5kb3JhTWFya2V0LmFiaSwgY29uZmlnLmFkZHJlc3Nlcy5tYXJrZXQpO1xuICAgIG1hci5ldmVudHMuRGF0YXNldEFkZGVkKHtcbiAgICAgICAgZnJvbUJsb2NrOiAwXG4gICAgfSlcbiAgICAgICAgLm9uKCdkYXRhJywgYXN5bmMgcmVzID0+IHtcblxuICAgICAgICAgICAgdHJ5IHtcblxuICAgICAgICAgICAgICAgIGNvbnN0IGRhdGFzZXQgPSBhd2FpdCBmZXRjaERhdGFzZXQocmVzLmFyZ3MuZGF0YXNldCwgY29uZmlnKTtcbiAgICAgICAgICAgICAgICBzdG9yZUNhbGxiYWNrKHtcbiAgICAgICAgICAgICAgICAgICAgYWRkcmVzczogcmVzLmFyZ3MuZGF0YXNldCxcbiAgICAgICAgICAgICAgICAgICAgZGF0YXNldCxcbiAgICAgICAgICAgICAgICAgICAgc3RhdHVzOiAnY3JlYXRlZCcsXG4gICAgICAgICAgICAgICAgICAgIGV2ZW50OiAnUGFuZG9yYU1hcmtldC5EYXRhc2V0QWRkZWQnXG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9IGNhdGNoKGVycikge1xuICAgICAgICAgICAgICAgIGVycm9yQ2FsbGJhY2soZXJyKTtcbiAgICAgICAgICAgIH0gICAgICAgICAgICBcbiAgICAgICAgfSlcbiAgICAgICAgLm9uKCdlcnJvcicsIGVycm9yQ2FsbGJhY2spO1xufTtcbiJdfQ==