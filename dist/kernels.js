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
var fetchAddressById = async function fetchAddressById(id, config) {
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
  var kernelContract = await mar.methods.kernels(id).call();
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

var fetchIpfsAddress = async function fetchIpfsAddress() {
  var address = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';
  var config = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

  if (!config.web3) {
    throw (0, _errors.default)(_errors.WEB3_REQUIRED);
  }

  if (!config.contracts || !config.contracts.Kernel || !config.contracts.Kernel.abi) {
    throw (0, _errors.default)(_errors.CONTRACT_REQUIRED, 'Kernel');
  }

  var ker = new config.web3.eth.Contract(config.contracts.Kernel.abi, address);
  var ipfsAddress = await ker.methods.ipfsAddress().call();
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

var fetchDataDim = async function fetchDataDim() {
  var address = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';
  var config = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

  if (!config.web3) {
    throw (0, _errors.default)(_errors.WEB3_REQUIRED);
  }

  if (!config.contracts || !config.contracts.Kernel || !config.contracts.Kernel.abi) {
    throw (0, _errors.default)(_errors.CONTRACT_REQUIRED, 'Kernel');
  }

  var ker = new config.web3.eth.Contract(config.contracts.Kernel.abi, address);
  var dataDim = await ker.methods.dataDim().call();
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

var fetchCurrentPrice = async function fetchCurrentPrice() {
  var address = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';
  var config = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

  if (!config.web3) {
    throw (0, _errors.default)(_errors.WEB3_REQUIRED);
  }

  if (!config.contracts || !config.contracts.Kernel || !config.contracts.Kernel.abi) {
    throw (0, _errors.default)(_errors.CONTRACT_REQUIRED, 'Kernel');
  }

  var ker = new config.web3.eth.Contract(config.contracts.Kernel.abi, address);
  var currentPrice = await ker.methods.currentPrice().call();
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

var fetchComplexity = async function fetchComplexity() {
  var address = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';
  var config = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

  if (!config.web3) {
    throw (0, _errors.default)(_errors.WEB3_REQUIRED);
  }

  if (!config.contracts || !config.contracts.Kernel || !config.contracts.Kernel.abi) {
    throw (0, _errors.default)(_errors.CONTRACT_REQUIRED, 'Kernel');
  }

  var ker = new config.web3.eth.Contract(config.contracts.Kernel.abi, address);
  var complexity = await ker.methods.complexity().call();
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

var fetchKernel = async function fetchKernel() {
  var address = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';
  var config = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

  try {
    var ipfsAddress = await fetchIpfsAddress(address, config);
    var dataDim = await fetchDataDim(address, config);
    var currentPrice = await fetchCurrentPrice(address, config);
    var complexity = await fetchComplexity(address, config);
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
 * @param {Object} config Library config (provided by the proxy but can be overridden)
 * @returns {Promise} Promise object represents the {Object[]}
 */


exports.fetchKernel = fetchKernel;

var fetchAll = async function fetchAll() {
  var config = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  var id = 0;
  var records = [];
  var error = [];

  try {
    // @todo Add method getKernelsCount to the PandoraMarket contract for avoid iterating with "try catch"
    while (true) {
      var kernelAddress = await fetchAddressById(id++, config); // can be 0x0

      if (+kernelAddress === 0) {
        break;
      }

      try {
        var kernelObj = await fetchKernel(kernelAddress, config);
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
    records: records,
    error: error
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

var deploy = async function deploy(kernelIpfsHash, _ref) {
  var publisher = _ref.publisher,
      dimension = _ref.dimension,
      complexity = _ref.complexity,
      price = _ref.price;
  var config = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};

  if (!config.web3) {
    throw (0, _errors.default)(_errors.WEB3_REQUIRED);
  }

  if (!config.contracts || !config.contracts.Kernel || !config.contracts.Kernel.abi) {
    throw (0, _errors.default)(_errors.CONTRACT_REQUIRED, 'Kernel');
  }

  try {
    var args = [config.web3.utils.toHex(kernelIpfsHash), dimension, complexity, price]; // Estimate required amount of gas

    var gas = await web3Helpers.estimateGas(config.contracts.Kernel.bytecode, args, config); // Create and deploy kernel contract

    var kernelContractAddress = await web3Helpers.deployContract(config.contracts.Kernel, {
      args: args,
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

var addToMarket = function addToMarket(kernelContractAddress, publisherAddress) {
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
    market.methods.addKernel(kernelContractAddress).send({
      from: publisherAddress
    }).on('error', reject).on('receipt', function (receipt) {
      return resolve(receipt.contractAddress);
    });
  });
};
/**
 * Handle event KernelAdded
 * 
 * @param {Function} storeCallback 
 * @param {Function} errorCallback
 * @param {Object} config Library config (provided by the proxy but can be overridden)
 */


exports.addToMarket = addToMarket;

var eventKernelAdded = function eventKernelAdded() {
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
  mar.events.KernelAdded({
    fromBlock: 0
  }).on('data', async function (res) {
    try {
      var kernel = await fetchKernel(res.args.kernel, config);
      storeCallback({
        address: res.args.kernel,
        kernel: kernel,
        status: 'created',
        event: 'PandoraMarket.KernelAdded'
      });
    } catch (err) {
      errorCallback(err);
    }
  }).on('error', errorCallback);
};

exports.eventKernelAdded = eventKernelAdded;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9rZXJuZWxzLmpzIl0sIm5hbWVzIjpbImZldGNoQWRkcmVzc0J5SWQiLCJpZCIsImNvbmZpZyIsIndlYjMiLCJXRUIzX1JFUVVJUkVEIiwiY29udHJhY3RzIiwiUGFuZG9yYU1hcmtldCIsImFiaSIsIkNPTlRSQUNUX1JFUVVJUkVEIiwiYWRkcmVzc2VzIiwibWFya2V0IiwiQUREUkVTU19SRVFVSVJFRCIsIm1hciIsImV0aCIsIkNvbnRyYWN0Iiwia2VybmVsQ29udHJhY3QiLCJtZXRob2RzIiwia2VybmVscyIsImNhbGwiLCJmZXRjaElwZnNBZGRyZXNzIiwiYWRkcmVzcyIsIktlcm5lbCIsImtlciIsImlwZnNBZGRyZXNzIiwiU3RyaW5nIiwiZmV0Y2hEYXRhRGltIiwiZGF0YURpbSIsIk51bWJlciIsInBhcnNlSW50IiwiZmV0Y2hDdXJyZW50UHJpY2UiLCJjdXJyZW50UHJpY2UiLCJmZXRjaENvbXBsZXhpdHkiLCJjb21wbGV4aXR5IiwiZmV0Y2hLZXJuZWwiLCJlcnIiLCJQcm9taXNlIiwicmVqZWN0IiwiZmV0Y2hBbGwiLCJyZWNvcmRzIiwiZXJyb3IiLCJrZXJuZWxBZGRyZXNzIiwia2VybmVsT2JqIiwicHVzaCIsIm1lc3NhZ2UiLCJkZXBsb3kiLCJrZXJuZWxJcGZzSGFzaCIsInB1Ymxpc2hlciIsImRpbWVuc2lvbiIsInByaWNlIiwiYXJncyIsInV0aWxzIiwidG9IZXgiLCJnYXMiLCJ3ZWIzSGVscGVycyIsImVzdGltYXRlR2FzIiwiYnl0ZWNvZGUiLCJrZXJuZWxDb250cmFjdEFkZHJlc3MiLCJkZXBsb3lDb250cmFjdCIsImZyb20iLCJhZGRUb01hcmtldCIsInB1Ymxpc2hlckFkZHJlc3MiLCJyZXNvbHZlIiwiY3VycmVudFByb3ZpZGVyIiwiaXNNZXRhTWFzayIsIldFQjNfTUVUQU1BU0tfUkVRVUlSRUQiLCJhZGRLZXJuZWwiLCJzZW5kIiwib24iLCJyZWNlaXB0IiwiY29udHJhY3RBZGRyZXNzIiwiZXZlbnRLZXJuZWxBZGRlZCIsInN0b3JlQ2FsbGJhY2siLCJlcnJvckNhbGxiYWNrIiwiZXZlbnRzIiwiS2VybmVsQWRkZWQiLCJmcm9tQmxvY2siLCJyZXMiLCJrZXJuZWwiLCJzdGF0dXMiLCJldmVudCJdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7Ozs7O0FBU0E7Ozs7Ozs7QUFFQTs7QUFNQTs7Ozs7Ozs7QUFFQTs7Ozs7OztBQU9PLElBQU1BLG1CQUFtQixlQUFuQkEsZ0JBQW1CLENBQU9DLEVBQVAsRUFBV0MsTUFBWCxFQUFzQjtBQUVsRCxNQUFJLENBQUNBLE9BQU9DLElBQVosRUFBa0I7QUFDZCxVQUFNLHFCQUFTQyxxQkFBVCxDQUFOO0FBQ0g7O0FBRUQsTUFBSSxDQUFDRixPQUFPRyxTQUFSLElBQXFCLENBQUNILE9BQU9HLFNBQVAsQ0FBaUJDLGFBQXZDLElBQXdELENBQUNKLE9BQU9HLFNBQVAsQ0FBaUJDLGFBQWpCLENBQStCQyxHQUE1RixFQUFpRztBQUM3RixVQUFNLHFCQUFTQyx5QkFBVCxFQUE0QixlQUE1QixDQUFOO0FBQ0g7O0FBRUQsTUFBSSxDQUFDTixPQUFPTyxTQUFSLElBQXFCLENBQUNQLE9BQU9PLFNBQVAsQ0FBaUJDLE1BQTNDLEVBQW1EO0FBQy9DLFVBQU0scUJBQVNDLHdCQUFULEVBQTJCLFFBQTNCLENBQU47QUFDSDs7QUFFRCxNQUFNQyxNQUFNLElBQUlWLE9BQU9DLElBQVAsQ0FBWVUsR0FBWixDQUFnQkMsUUFBcEIsQ0FBNkJaLE9BQU9HLFNBQVAsQ0FBaUJDLGFBQWpCLENBQStCQyxHQUE1RCxFQUFpRUwsT0FBT08sU0FBUCxDQUFpQkMsTUFBbEYsQ0FBWjtBQUNBLE1BQU1LLGlCQUFpQixNQUFNSCxJQUFJSSxPQUFKLENBQ3hCQyxPQUR3QixDQUNoQmhCLEVBRGdCLEVBRXhCaUIsSUFGd0IsRUFBN0I7QUFHQSxTQUFPSCxjQUFQO0FBQ0gsQ0FuQk07QUFxQlA7Ozs7Ozs7Ozs7O0FBT08sSUFBTUksbUJBQW1CLGVBQW5CQSxnQkFBbUIsR0FBcUM7QUFBQSxNQUE5QkMsT0FBOEIsdUVB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QUFDVm5ELGlCQUFTd0QsSUFBSTNCLElBQUosQ0FBUzRCLE1BRFI7QUFFVkEsc0JBRlU7QUFHVkMsZ0JBQVEsU0FIRTtBQUlWQyxlQUFPO0FBSkcsT0FBZDtBQU1ILEtBVEQsQ0FTRSxPQUFNN0MsR0FBTixFQUFXO0FBQ1RzQyxvQkFBY3RDLEdBQWQ7QUFDSDtBQUNKLEdBakJMLEVBa0JLaUMsRUFsQkwsQ0FrQlEsT0FsQlIsRUFrQmlCSyxhQWxCakI7QUFtQkgsQ0FsQ00iLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIEtlcm5lbHMgcmVsYXRlZCBtZXRob2RzXG4gKiBUaGlzIGZpbGUgaXQgaXMgYSBwYXJ0IG9mIHRoZSBQYW5kb3JhIFB5cnJoYSBKYXZhc2NyaXB0IGxpYnJhcnlcbiAqIFxuICogQGZpbGUga2VybmVscy5qc1xuICogQGF1dGhvciBLb3N0aWFudHluIFNteXJub3YgPGtvc3R5c2hAZ21haWwuY29tPlxuICogQGRhdGUgMjAxOFxuICovXG5cbid1c2Ugc3RyaWN0JztcblxuaW1wb3J0IHBqc0Vycm9yLCB7XG4gICAgQ09OVFJBQ1RfUkVRVUlSRUQsXG4gICAgQUREUkVTU19SRVFVSVJFRCxcbiAgICBXRUIzX1JFUVVJUkVELFxuICAgIFdFQjNfTUVUQU1BU0tfUkVRVUlSRURcbn0gZnJvbSAnLi9oZWxwZXJzL2Vycm9ycyc7XG5pbXBvcnQgKiBhcyB3ZWIzSGVscGVycyBmcm9tICcuL2hlbHBlcnMvd2ViMyc7XG5cbi8qKlxuICogR2V0IEtlcm5lbCBhZGRyZXNzIGJ5IGtlcm5lbCBpZFxuICogXG4gKiBAcGFyYW0ge251bWJlcn0gaWRcbiAqIEBwYXJhbSB7T2JqZWN0fSBjb25maWcgTGlicmFyeSBjb25maWcgKHByb3ZpZGVkIGJ5IHRoZSBwcm94eSBidXQgY2FuIGJlIG92ZXJyaWRkZW4pXG4gKiBAcmV0dXJucyB7UHJvbWlzZX0gQSBQcm9taXNlIG9iamVjdCByZXByZXNlbnRzIHRoZSB7c3RyaW5nfVxuICovXG5leHBvcnQgY29uc3QgZmV0Y2hBZGRyZXNzQnlJZCA9IGFzeW5jIChpZCwgY29uZmlnKSA9PiB7XG5cbiAgICBpZiAoIWNvbmZpZy53ZWIzKSB7XG4gICAgICAgIHRocm93IHBqc0Vycm9yKFdFQjNfUkVRVUlSRUQpO1xuICAgIH1cblxuICAgIGlmICghY29uZmlnLmNvbnRyYWN0cyB8fCAhY29uZmlnLmNvbnRyYWN0cy5QYW5kb3JhTWFya2V0IHx8ICFjb25maWcuY29udHJhY3RzLlBhbmRvcmFNYXJrZXQuYWJpKSB7XG4gICAgICAgIHRocm93IHBqc0Vycm9yKENPTlRSQUNUX1JFUVVJUkVELCAnUGFuZG9yYU1hcmtldCcpO1xuICAgIH1cblxuICAgIGlmICghY29uZmlnLmFkZHJlc3NlcyB8fCAhY29uZmlnLmFkZHJlc3Nlcy5tYXJrZXQpIHtcbiAgICAgICAgdGhyb3cgcGpzRXJyb3IoQUREUkVTU19SRVFVSVJFRCwgJ01hcmtldCcpO1xuICAgIH1cblxuICAgIGNvbnN0IG1hciA9IG5ldyBjb25maWcud2ViMy5ldGguQ29udHJhY3QoY29uZmlnLmNvbnRyYWN0cy5QYW5kb3JhTWFya2V0LmFiaSwgY29uZmlnLmFkZHJlc3Nlcy5tYXJrZXQpO1xuICAgIGNvbnN0IGtlcm5lbENvbnRyYWN0ID0gYXdhaXQgbWFyLm1ldGhvZHNcbiAgICAgICAgLmtlcm5lbHMoaWQpXG4gICAgICAgIC5jYWxsKCk7XG4gICAgcmV0dXJuIGtlcm5lbENvbnRyYWN0O1xufTtcblxuLyoqXG4gKiBHZXQgSVBGUyBhZGRyZXNzIGZyb20gS2VybmVsIGNvbnRyYWN0IGJ5IHRoZSBrZXJuZWwgYWRkcmVzc1xuICogXG4gKiBAcGFyYW0ge3N0cmluZ30gYWRkcmVzc1xuICogQHBhcmFtIHtPYmplY3R9IGNvbmZpZyBMaWJyYXJ5IGNvbmZpZyAocHJvdmlkZWQgYnkgdGhlIHByb3h5IGJ1dCBjYW4gYmUgb3ZlcnJpZGRlbilcbiAqIEByZXR1cm5zIHtQcm9taXNlfSBBIFByb21pc2Ugb2JqZWN0IHJlcHJlc2VudHMgdGhlIHtzdHJpbmd9XG4gKi9cbmV4cG9ydCBjb25zdCBmZXRjaElwZnNBZGRyZXNzID0gYXN5bmMgKGFkZHJlc3MgPSAnJywgY29uZmlnID0ge30pID0+IHtcblxuICAgIGlmICghY29uZmlnLndlYjMpIHtcbiAgICAgICAgdGhyb3cgcGpzRXJyb3IoV0VCM19SRVFVSVJFRCk7XG4gICAgfVxuXG4gICAgaWYgKCFjb25maWcuY29udHJhY3RzIHx8ICFjb25maWcuY29udHJhY3RzLktlcm5lbCB8fCAhY29uZmlnLmNvbnRyYWN0cy5LZXJuZWwuYWJpKSB7XG4gICAgICAgIHRocm93IHBqc0Vycm9yKENPTlRSQUNUX1JFUVVJUkVELCAnS2VybmVsJyk7XG4gICAgfVxuXG4gICAgY29uc3Qga2VyID0gbmV3IGNvbmZpZy53ZWIzLmV0aC5Db250cmFjdChjb25maWcuY29udHJhY3RzLktlcm5lbC5hYmksIGFkZHJlc3MpO1xuICAgIGNvbnN0IGlwZnNBZGRyZXNzID0gYXdhaXQga2VyLm1ldGhvZHNcbiAgICAgICAgLmlwZnNBZGRyZXNzKClcbiAgICAgICAgLmNhbGwoKTtcbiAgICByZXR1cm4gU3RyaW5nKGlwZnNBZGRyZXNzKTtcbn07XG5cbi8qKlxuICogR2V0IGRhdGEgZGltIGZyb20gS2VybmVsIGNvbnRyYWN0IGJ5IHRoZSBrZXJuZWwgYWRkcmVzc1xuICogXG4gKiBAcGFyYW0ge3N0cmluZ30gYWRkcmVzc1xuICogQHBhcmFtIHtPYmplY3R9IGNvbmZpZyBMaWJyYXJ5IGNvbmZpZyAocHJvdmlkZWQgYnkgdGhlIHByb3h5IGJ1dCBjYW4gYmUgb3ZlcnJpZGRlbilcbiAqIEByZXR1cm5zIHtQcm9taXNlfSBBIFByb21pc2Ugb2JqZWN0IHJlcHJlc2VudHMgdGhlIHtudW1iZXJ9XG4gKi9cbmV4cG9ydCBjb25zdCBmZXRjaERhdGFEaW0gPSBhc3luYyAoYWRkcmVzcyA9ICcnLCBjb25maWcgPSB7fSkgPT4ge1xuXG4gICAgaWYgKCFjb25maWcud2ViMykge1xuICAgICAgICB0aHJvdyBwanNFcnJvcihXRUIzX1JFUVVJUkVEKTtcbiAgICB9XG5cbiAgICBpZiAoIWNvbmZpZy5jb250cmFjdHMgfHwgIWNvbmZpZy5jb250cmFjdHMuS2VybmVsIHx8ICFjb25maWcuY29udHJhY3RzLktlcm5lbC5hYmkpIHtcbiAgICAgICAgdGhyb3cgcGpzRXJyb3IoQ09OVFJBQ1RfUkVRVUlSRUQsICdLZXJuZWwnKTtcbiAgICB9XG5cbiAgICBjb25zdCBrZXIgPSBuZXcgY29uZmlnLndlYjMuZXRoLkNvbnRyYWN0KGNvbmZpZy5jb250cmFjdHMuS2VybmVsLmFiaSwgYWRkcmVzcyk7XG4gICAgY29uc3QgZGF0YURpbSA9IGF3YWl0IGtlci5tZXRob2RzXG4gICAgICAgIC5kYXRhRGltKClcbiAgICAgICAgLmNhbGwoKTtcbiAgICByZXR1cm4gTnVtYmVyLnBhcnNlSW50KGRhdGFEaW0sIDEwKTtcbn07XG5cbi8qKlxuICogR2V0IGN1cnJlbnQgcHJpY2UgZnJvbSBLZXJuZWwgY29udHJhY3QgYnkgdGhlIGtlcm5lbCBhZGRyZXNzXG4gKiBcbiAqIEBwYXJhbSB7c3RyaW5nfSBhZGRyZXNzXG4gKiBAcGFyYW0ge09iamVjdH0gY29uZmlnIExpYnJhcnkgY29uZmlnIChwcm92aWRlZCBieSB0aGUgcHJveHkgYnV0IGNhbiBiZSBvdmVycmlkZGVuKVxuICogQHJldHVybnMge1Byb21pc2V9IEEgUHJvbWlzZSBvYmplY3QgcmVwcmVzZW50cyB0aGUge251bWJlcn1cbiAqL1xuZXhwb3J0IGNvbnN0IGZldGNoQ3VycmVudFByaWNlID0gYXN5bmMgKGFkZHJlc3MgPSAnJywgY29uZmlnID0ge30pID0+IHtcblxuICAgIGlmICghY29uZmlnLndlYjMpIHtcbiAgICAgICAgdGhyb3cgcGpzRXJyb3IoV0VCM19SRVFVSVJFRCk7XG4gICAgfVxuXG4gICAgaWYgKCFjb25maWcuY29udHJhY3RzIHx8ICFjb25maWcuY29udHJhY3RzLktlcm5lbCB8fCAhY29uZmlnLmNvbnRyYWN0cy5LZXJuZWwuYWJpKSB7XG4gICAgICAgIHRocm93IHBqc0Vycm9yKENPTlRSQUNUX1JFUVVJUkVELCAnS2VybmVsJyk7XG4gICAgfVxuXG4gICAgY29uc3Qga2VyID0gbmV3IGNvbmZpZy53ZWIzLmV0aC5Db250cmFjdChjb25maWcuY29udHJhY3RzLktlcm5lbC5hYmksIGFkZHJlc3MpO1xuICAgIGNvbnN0IGN1cnJlbnRQcmljZSA9IGF3YWl0IGtlci5tZXRob2RzXG4gICAgICAgIC5jdXJyZW50UHJpY2UoKVxuICAgICAgICAuY2FsbCgpO1xuICAgIHJldHVybiBOdW1iZXIucGFyc2VJbnQoY3VycmVudFByaWNlLCAxMCk7XG59O1xuXG4vKipcbiAqIEdldCBjb21wbGV4aXR5IGZyb20gS2VybmVsIGNvbnRyYWN0IGJ5IHRoZSBrZXJuZWwgYWRkcmVzc1xuICogXG4gKiBAcGFyYW0ge3N0cmluZ30gYWRkcmVzc1xuICogQHBhcmFtIHtPYmplY3R9IGNvbmZpZyBMaWJyYXJ5IGNvbmZpZyAocHJvdmlkZWQgYnkgdGhlIHByb3h5IGJ1dCBjYW4gYmUgb3ZlcnJpZGRlbilcbiAqIEByZXR1cm5zIHtQcm9taXNlfSBBIFByb21pc2Ugb2JqZWN0IHJlcHJlc2VudHMgdGhlIHtudW1iZXJ9XG4gKi9cbmV4cG9ydCBjb25zdCBmZXRjaENvbXBsZXhpdHkgPSBhc3luYyAoYWRkcmVzcyA9ICcnLCBjb25maWcgPSB7fSkgPT4ge1xuXG4gICAgaWYgKCFjb25maWcud2ViMykge1xuICAgICAgICB0aHJvdyBwanNFcnJvcihXRUIzX1JFUVVJUkVEKTtcbiAgICB9XG5cbiAgICBpZiAoIWNvbmZpZy5jb250cmFjdHMgfHwgIWNvbmZpZy5jb250cmFjdHMuS2VybmVsIHx8ICFjb25maWcuY29udHJhY3RzLktlcm5lbC5hYmkpIHtcbiAgICAgICAgdGhyb3cgcGpzRXJyb3IoQ09OVFJBQ1RfUkVRVUlSRUQsICdLZXJuZWwnKTtcbiAgICB9XG5cbiAgICBjb25zdCBrZXIgPSBuZXcgY29uZmlnLndlYjMuZXRoLkNvbnRyYWN0KGNvbmZpZy5jb250cmFjdHMuS2VybmVsLmFiaSwgYWRkcmVzcyk7XG4gICAgY29uc3QgY29tcGxleGl0eSA9IGF3YWl0IGtlci5tZXRob2RzXG4gICAgICAgIC5jb21wbGV4aXR5KClcbiAgICAgICAgLmNhbGwoKTtcbiAgICByZXR1cm4gTnVtYmVyLnBhcnNlSW50KGNvbXBsZXhpdHksIDEwKTtcbn07XG5cbi8qKlxuICogR2V0IEtlcm5lbCBieSB0aGUga2VybmVsIGFkZHJlc3NcbiAqIFxuICogQHBhcmFtIHtzdHJpbmd9IGFkZHJlc3NcbiAqIEBwYXJhbSB7T2JqZWN0fSBjb25maWcgTGlicmFyeSBjb25maWcgKHByb3ZpZGVkIGJ5IHRoZSBwcm94eSBidXQgY2FuIGJlIG92ZXJyaWRkZW4pXG4gKiBAcmV0dXJucyB7UHJvbWlzZX0gUHJvbWlzZSBvYmplY3QgcmVwcmVzZW50cyB0aGUge09iamVjdFtdfVxuICovXG5leHBvcnQgY29uc3QgZmV0Y2hLZXJuZWwgPSBhc3luYyAoYWRkcmVzcyA9ICcnLCBjb25maWcgPSB7fSkgPT4ge1xuXG4gICAgdHJ5IHtcblxuICAgICAgICBjb25zdCBpcGZzQWRkcmVzcyA9IGF3YWl0IGZldGNoSXBmc0FkZHJlc3MoYWRkcmVzcywgY29uZmlnKTtcbiAgICAgICAgY29uc3QgZGF0YURpbSA9IGF3YWl0IGZldGNoRGF0YURpbShhZGRyZXNzLCBjb25maWcpO1xuICAgICAgICBjb25zdCBjdXJyZW50UHJpY2UgPSBhd2FpdCBmZXRjaEN1cnJlbnRQcmljZShhZGRyZXNzLCBjb25maWcpO1xuICAgICAgICBjb25zdCBjb21wbGV4aXR5ID0gYXdhaXQgZmV0Y2hDb21wbGV4aXR5KGFkZHJlc3MsIGNvbmZpZyk7XG5cbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgIGFkZHJlc3MsXG4gICAgICAgICAgICBpcGZzQWRkcmVzcyxcbiAgICAgICAgICAgIGRhdGFEaW0sXG4gICAgICAgICAgICBjdXJyZW50UHJpY2UsXG4gICAgICAgICAgICBjb21wbGV4aXR5XG4gICAgICAgIH07XG4gICAgfSBjYXRjaChlcnIpIHtcbiAgICAgICAgcmV0dXJuIFByb21pc2UucmVqZWN0KGVycik7XG4gICAgfVxufTtcblxuLyoqXG4gKiBHZXQgYWxsIGtlcm5lbHNcbiAqIFxuICogQHBhcmFtIHtPYmplY3R9IGNvbmZpZyBMaWJyYXJ5IGNvbmZpZyAocHJvdmlkZWQgYnkgdGhlIHByb3h5IGJ1dCBjYW4gYmUgb3ZlcnJpZGRlbilcbiAqIEByZXR1cm5zIHtQcm9taXNlfSBQcm9taXNlIG9iamVjdCByZXByZXNlbnRzIHRoZSB7T2JqZWN0W119XG4gKi9cbmV4cG9ydCBjb25zdCBmZXRjaEFsbCA9IGFzeW5jIChjb25maWcgPSB7fSkgPT4ge1xuXG4gICAgbGV0IGlkID0gMDtcbiAgICBsZXQgcmVjb3JkcyA9IFtdO1xuICAgIGxldCBlcnJvciA9IFtdO1xuXG4gICAgdHJ5IHtcblxuICAgICAgICAvLyBAdG9kbyBBZGQgbWV0aG9kIGdldEtlcm5lbHNDb3VudCB0byB0aGUgUGFuZG9yYU1hcmtldCBjb250cmFjdCBmb3IgYXZvaWQgaXRlcmF0aW5nIHdpdGggXCJ0cnkgY2F0Y2hcIlxuICAgICAgICB3aGlsZSAodHJ1ZSkge1xuICAgICAgICAgICAgXG4gICAgICAgICAgICBjb25zdCBrZXJuZWxBZGRyZXNzID0gYXdhaXQgZmV0Y2hBZGRyZXNzQnlJZChpZCsrLCBjb25maWcpOy8vIGNhbiBiZSAweDBcbiAgICAgICAgICAgIFxuICAgICAgICAgICAgaWYgKCtrZXJuZWxBZGRyZXNzID09PSAwKSB7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHRyeSB7XG5cbiAgICAgICAgICAgICAgICBjb25zdCBrZXJuZWxPYmogPSBhd2FpdCBmZXRjaEtlcm5lbChrZXJuZWxBZGRyZXNzLCBjb25maWcpO1xuXG4gICAgICAgICAgICAgICAgcmVjb3Jkcy5wdXNoKHtcbiAgICAgICAgICAgICAgICAgICAgaWQ6IGlkLFxuICAgICAgICAgICAgICAgICAgICAuLi5rZXJuZWxPYmpcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH0gY2F0Y2goZXJyKSB7XG4gICAgICAgICAgICAgICAgXG4gICAgICAgICAgICAgICAgZXJyb3IucHVzaCh7XG4gICAgICAgICAgICAgICAgICAgIGFkZHJlc3M6IGtlcm5lbEFkZHJlc3MsXG4gICAgICAgICAgICAgICAgICAgIG1lc3NhZ2U6IGVyci5tZXNzYWdlXG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9IGNhdGNoKGVycikge1xuICAgICAgICBlcnJvci5wdXNoKHtcbiAgICAgICAgICAgIGVycm9yOiBlcnIubWVzc2FnZVxuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICByZXR1cm4ge1xuICAgICAgICByZWNvcmRzLFxuICAgICAgICBlcnJvclxuICAgIH07XG59O1xuXG4vKipcbiAqIERlcGxveSBLZXJuZWwgY29udHJhY3QgdG8gdGhlIG5ldHdvcmtcbiAqIFxuICogQHBhcmFtIHtzdHJpbmd9IGtlcm5lbElwZnNIYXNoIFxuICogQHBhcmFtIHtPYmplY3R9IG9wdGlvbnMgeyBwdWJsaXNoZXIsIGRpbWVuc2lvbiwgY29tcGxleGl0eSwgcHJpY2UgfSBcbiAqIEBwYXJhbSB7T2JqZWN0fSBjb25maWcgTGlicmFyeSBjb25maWcgKHByb3ZpZGVkIGJ5IHRoZSBwcm94eSBidXQgY2FuIGJlIG92ZXJyaWRkZW4pXG4gKiBAcmV0dXJucyB7UHJvbWlzZX0gUHJvbWlzZSBvYmplY3QgcmVzb2x2ZWQgdG8gY29udHJhY3QgYWRkcmVzc1xuICovXG5leHBvcnQgY29uc3QgZGVwbG95ID0gYXN5bmMgKGtlcm5lbElwZnNIYXNoLCB7IHB1Ymxpc2hlciwgZGltZW5zaW9uLCBjb21wbGV4aXR5LCBwcmljZSB9LCBjb25maWcgPSB7fSkgPT4ge1xuXG4gICAgaWYgKCFjb25maWcud2ViMykge1xuICAgICAgICB0aHJvdyBwanNFcnJvcihXRUIzX1JFUVVJUkVEKTtcbiAgICB9XG5cbiAgICBpZiAoIWNvbmZpZy5jb250cmFjdHMgfHwgIWNvbmZpZy5jb250cmFjdHMuS2VybmVsIHx8ICFjb25maWcuY29udHJhY3RzLktlcm5lbC5hYmkpIHtcbiAgICAgICAgdGhyb3cgcGpzRXJyb3IoQ09OVFJBQ1RfUkVRVUlSRUQsICdLZXJuZWwnKTtcbiAgICB9XG5cbiAgICB0cnkge1xuICAgICAgICBjb25zdCBhcmdzID0gW2NvbmZpZy53ZWIzLnV0aWxzLnRvSGV4KGtlcm5lbElwZnNIYXNoKSwgZGltZW5zaW9uLCBjb21wbGV4aXR5LCBwcmljZV07XG4gICAgICAgIFxuICAgICAgICAvLyBFc3RpbWF0ZSByZXF1aXJlZCBhbW91bnQgb2YgZ2FzXG4gICAgICAgIGNvbnN0IGdhcyA9IGF3YWl0IHdlYjNIZWxwZXJzLmVzdGltYXRlR2FzKGNvbmZpZy5jb250cmFjdHMuS2VybmVsLmJ5dGVjb2RlLCBhcmdzLCBjb25maWcpO1xuXG4gICAgICAgIC8vIENyZWF0ZSBhbmQgZGVwbG95IGtlcm5lbCBjb250cmFjdFxuICAgICAgICBjb25zdCBrZXJuZWxDb250cmFjdEFkZHJlc3MgPSBhd2FpdCB3ZWIzSGVscGVycy5kZXBsb3lDb250cmFjdChjb25maWcuY29udHJhY3RzLktlcm5lbCwge1xuICAgICAgICAgICAgYXJncyxcbiAgICAgICAgICAgIGZyb206IHB1Ymxpc2hlcixcbiAgICAgICAgICAgIGdhczogTnVtYmVyLnBhcnNlSW50KGdhcyAqIDEuNSwgMTApXG4gICAgICAgIH0sIGNvbmZpZyk7XG5cbiAgICAgICAgcmV0dXJuIGtlcm5lbENvbnRyYWN0QWRkcmVzcztcbiAgICB9IGNhdGNoKGVycikge1xuICAgICAgICByZXR1cm4gUHJvbWlzZS5yZWplY3QoZXJyKTtcbiAgICB9XG59O1xuXG4vKipcbiAqIEFkZCBrZXJuZWwgdG8gbWFya2V0XG4gKiBcbiAqIEBwYXJhbSB7U3RyaW5nfSBrZXJuZWxDb250cmFjdEFkZHJlc3MgXG4gKiBAcGFyYW0ge1N0cmluZ30gcHVibGlzaGVyQWRkcmVzcyBcbiAqIEBwYXJhbSB7T2JqZWN0fSBjb25maWcgTGlicmFyeSBjb25maWcgKHByb3ZpZGVkIGJ5IHRoZSBwcm94eSBidXQgY2FuIGJlIG92ZXJyaWRkZW4pXG4gKiBAcmV0dXJucyB7UHJvbWlzZX0gUHJvbWlzZSBvYmplY3QgcmVzb2x2ZWQgdG8ge3N0cmluZ30gY29udHJhY3RBZGRyZXNzXG4gKi9cbmV4cG9ydCBjb25zdCBhZGRUb01hcmtldCA9IChrZXJuZWxDb250cmFjdEFkZHJlc3MsIHB1Ymxpc2hlckFkZHJlc3MsIGNvbmZpZyA9IHt9KSA9PiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG5cbiAgICBpZiAoIWNvbmZpZy53ZWIzKSB7XG4gICAgICAgIHRocm93IHBqc0Vycm9yKFdFQjNfUkVRVUlSRUQpO1xuICAgIH1cblxuICAgIGlmICghY29uZmlnLmNvbnRyYWN0cyB8fCAhY29uZmlnLmNvbnRyYWN0cy5QYW5kb3JhTWFya2V0IHx8ICFjb25maWcuY29udHJhY3RzLlBhbmRvcmFNYXJrZXQuYWJpKSB7XG4gICAgICAgIHRocm93IHBqc0Vycm9yKENPTlRSQUNUX1JFUVVJUkVELCAnUGFuZG9yYU1hcmtldCcpO1xuICAgIH1cblxuICAgIGlmICghY29uZmlnLmFkZHJlc3NlcyB8fCAhY29uZmlnLmFkZHJlc3Nlcy5tYXJrZXQpIHtcbiAgICAgICAgdGhyb3cgcGpzRXJyb3IoQUREUkVTU19SRVFVSVJFRCwgJ01hcmtldCcpO1xuICAgIH1cblxuICAgIGlmICghY29uZmlnLndlYjMuY3VycmVudFByb3ZpZGVyLmlzTWV0YU1hc2spIHtcbiAgICAgICAgdGhyb3cgcGpzRXJyb3IoV0VCM19NRVRBTUFTS19SRVFVSVJFRCk7XG4gICAgfVxuXG4gICAgY29uc3QgbWFya2V0ID0gbmV3IGNvbmZpZy53ZWIzLmV0aC5Db250cmFjdChjb25maWcuY29udHJhY3RzLlBhbmRvcmFNYXJrZXQuYWJpLCBjb25maWcuYWRkcmVzc2VzLm1hcmtldCk7XG4gICAgbWFya2V0Lm1ldGhvZHNcbiAgICAgICAgLmFkZEtlcm5lbChrZXJuZWxDb250cmFjdEFkZHJlc3MpXG4gICAgICAgIC5zZW5kKHtcbiAgICAgICAgICAgIGZyb206IHB1Ymxpc2hlckFkZHJlc3NcbiAgICAgICAgfSlcbiAgICAgICAgLm9uKCdlcnJvcicsIHJlamVjdClcbiAgICAgICAgLm9uKCdyZWNlaXB0JywgcmVjZWlwdCA9PiByZXNvbHZlKHJlY2VpcHQuY29udHJhY3RBZGRyZXNzKSk7XG59KTtcblxuLyoqXG4gKiBIYW5kbGUgZXZlbnQgS2VybmVsQWRkZWRcbiAqIFxuICogQHBhcmFtIHtGdW5jdGlvbn0gc3RvcmVDYWxsYmFjayBcbiAqIEBwYXJhbSB7RnVuY3Rpb259IGVycm9yQ2FsbGJhY2tcbiAqIEBwYXJhbSB7T2JqZWN0fSBjb25maWcgTGlicmFyeSBjb25maWcgKHByb3ZpZGVkIGJ5IHRoZSBwcm94eSBidXQgY2FuIGJlIG92ZXJyaWRkZW4pXG4gKi9cbmV4cG9ydCBjb25zdCBldmVudEtlcm5lbEFkZGVkID0gKHN0b3JlQ2FsbGJhY2sgPSAoKSA9PiB7fSwgZXJyb3JDYWxsYmFjayA9ICgpID0+IHt9LCBjb25maWcgPSB7fSkgPT4ge1xuXG4gICAgaWYgKCFjb25maWcud2ViMykge1xuICAgICAgICB0aHJvdyBwanNFcnJvcihXRUIzX1JFUVVJUkVEKTtcbiAgICB9XG5cbiAgICBpZiAoIWNvbmZpZy5jb250cmFjdHMgfHwgIWNvbmZpZy5jb250cmFjdHMuUGFuZG9yYU1hcmtldCB8fCAhY29uZmlnLmNvbnRyYWN0cy5QYW5kb3JhTWFya2V0LmFiaSkge1xuICAgICAgICB0aHJvdyBwanNFcnJvcihDT05UUkFDVF9SRVFVSVJFRCwgJ1BhbmRvcmFNYXJrZXQnKTtcbiAgICB9XG5cbiAgICBpZiAoIWNvbmZpZy5hZGRyZXNzZXMgfHwgIWNvbmZpZy5hZGRyZXNzZXMubWFya2V0KSB7XG4gICAgICAgIHRocm93IHBqc0Vycm9yKEFERFJFU1NfUkVRVUlSRUQsICdNYXJrZXQnKTtcbiAgICB9XG5cbiAgICBjb25zdCBtYXIgPSBuZXcgY29uZmlnLndlYjMuZXRoLkNvbnRyYWN0KGNvbmZpZy5jb250cmFjdHMuUGFuZG9yYU1hcmtldC5hYmksIGNvbmZpZy5hZGRyZXNzZXMubWFya2V0KTtcbiAgICBtYXIuZXZlbnRzLktlcm5lbEFkZGVkKHtcbiAgICAgICAgZnJvbUJsb2NrOiAwXG4gICAgfSlcbiAgICAgICAgLm9uKCdkYXRhJywgYXN5bmMgcmVzID0+IHtcblxuICAgICAgICAgICAgdHJ5IHtcblxuICAgICAgICAgICAgICAgIGNvbnN0IGtlcm5lbCA9IGF3YWl0IGZldGNoS2VybmVsKHJlcy5hcmdzLmtlcm5lbCwgY29uZmlnKTtcbiAgICAgICAgICAgICAgICBzdG9yZUNhbGxiYWNrKHtcbiAgICAgICAgICAgICAgICAgICAgYWRkcmVzczogcmVzLmFyZ3Mua2VybmVsLFxuICAgICAgICAgICAgICAgICAgICBrZXJuZWwsXG4gICAgICAgICAgICAgICAgICAgIHN0YXR1czogJ2NyZWF0ZWQnLFxuICAgICAgICAgICAgICAgICAgICBldmVudDogJ1BhbmRvcmFNYXJrZXQuS2VybmVsQWRkZWQnXG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9IGNhdGNoKGVycikge1xuICAgICAgICAgICAgICAgIGVycm9yQ2FsbGJhY2soZXJyKTtcbiAgICAgICAgICAgIH0gICAgICAgICAgICBcbiAgICAgICAgfSlcbiAgICAgICAgLm9uKCdlcnJvcicsIGVycm9yQ2FsbGJhY2spO1xufTtcbiJdfQ==