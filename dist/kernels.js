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
exports.eventKernelRemoved = exports.eventKernelAdded = exports.removeKernel = exports.addToMarket = exports.deploy = exports.fetchAll = exports.fetchKernelById = exports.fetchKernel = exports.fetchComplexity = exports.fetchCurrentPrice = exports.fetchDataDim = exports.fetchIpfsAddress = exports.fetchAddressById = exports.fetchCount = void 0;

var expect = _interopRequireWildcard(require("./helpers/expect"));

var _errors = _interopRequireWildcard(require("./helpers/errors"));

var web3Helpers = _interopRequireWildcard(require("./helpers/web3"));

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; var ownKeys = Object.keys(source); if (typeof Object.getOwnPropertySymbols === 'function') { ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) { return Object.getOwnPropertyDescriptor(source, sym).enumerable; })); } ownKeys.forEach(function (key) { _defineProperty(target, key, source[key]); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

/**
 * Get kernels count from PandoraMarket contract
 * 
 * @param {Object} config Library config (provided by the proxy but can be overridden)
 * @returns {Promise} A Promise object represents the {number} 
 */
const fetchCount = async (config = {}) => {
  expect.all(config, {
    'web3': {
      type: 'object',
      code: _errors.WEB3_REQUIRED
    },
    'contracts.PandoraMarket.abi': {
      type: 'object',
      code: _errors.CONTRACT_REQUIRED,
      args: ['PandoraMarket']
    },
    'addresses.PandoraMarket': {
      type: 'string',
      code: _errors.ADDRESS_REQUIRED,
      args: ['PandoraMarket']
    }
  });
  const mar = new config.web3.eth.Contract(config.contracts.PandoraMarket.abi, config.addresses.PandoraMarket);
  const count = await mar.methods.kernelsCount().call();
  return Number.parseInt(count, 10);
};
/**
 * Get Kernel address by kernel id
 * 
 * @param {number} id
 * @param {Object} config Library config (provided by the proxy but can be overridden)
 * @returns {Promise} A Promise object represents the {string}
 */


exports.fetchCount = fetchCount;

const fetchAddressById = async (id, config = {}) => {
  expect.all(config, {
    'web3': {
      type: 'object',
      code: _errors.WEB3_REQUIRED
    },
    'contracts.PandoraMarket.abi': {
      type: 'object',
      code: _errors.CONTRACT_REQUIRED,
      args: ['PandoraMarket']
    },
    'addresses.PandoraMarket': {
      type: 'string',
      code: _errors.ADDRESS_REQUIRED,
      args: ['PandoraMarket']
    }
  });
  const mar = new config.web3.eth.Contract(config.contracts.PandoraMarket.abi, config.addresses.PandoraMarket);
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
  expect.all(config, {
    'web3': {
      type: 'object',
      code: _errors.WEB3_REQUIRED
    },
    'contracts.Kernel.abi': {
      type: 'object',
      code: _errors.CONTRACT_REQUIRED,
      args: ['Kernel']
    }
  });
  const ker = new config.web3.eth.Contract(config.contracts.Kernel.abi, address);
  const ipfsAddress = await ker.methods.ipfsAddress().call();
  return config.web3.utils.hexToAscii(ipfsAddress);
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
  expect.all(config, {
    'web3': {
      type: 'object',
      code: _errors.WEB3_REQUIRED
    },
    'contracts.Kernel.abi': {
      type: 'object',
      code: _errors.CONTRACT_REQUIRED,
      args: ['Kernel']
    }
  });
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
  expect.all(config, {
    'web3': {
      type: 'object',
      code: _errors.WEB3_REQUIRED
    },
    'contracts.Kernel.abi': {
      type: 'object',
      code: _errors.CONTRACT_REQUIRED,
      args: ['Kernel']
    }
  });
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
  expect.all(config, {
    'web3': {
      type: 'object',
      code: _errors.WEB3_REQUIRED
    },
    'contracts.Kernel.abi': {
      type: 'object',
      code: _errors.CONTRACT_REQUIRED,
      args: ['Kernel']
    }
  });
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
  const [ipfsAddress, dataDim, currentPrice, complexity] = await Promise.all([fetchIpfsAddress(address, config), fetchDataDim(address, config), fetchCurrentPrice(address, config), fetchComplexity(address, config)]);
  return {
    address,
    ipfsAddress,
    dataDim,
    currentPrice,
    complexity
  };
};
/**
 * Get kernel by id
 * 
 * @param {integer} id 
 * @param {Object} config Library config (provided by the proxy but can be overridden)
 * @returns {Promise} A Promise object represents the {Object}
 */


exports.fetchKernel = fetchKernel;

const fetchKernelById = async (id, config = {}) => {
  const address = await fetchAddressById(id, config);
  const kernel = await fetchKernel(address, config);
  return kernel;
};
/**
 * Get all kernels
 * 
 * @param {Object} config Library config (provided by the proxy but can be overridden)
 * @returns {Promise} Promise object represents the {Object[]}
 */


exports.fetchKernelById = fetchKernelById;

const fetchAll = async (config = {}) => {
  let records = [];
  let error = [];

  try {
    const count = await fetchCount(config);

    for (let i = 0; i < count; i++) {
      try {
        const kernel = await fetchKernelById(i, config);
        records.push(_objectSpread({
          id: i
        }, kernel));
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
  expect.all(config, {
    'web3': {
      type: 'object',
      code: _errors.WEB3_REQUIRED
    },
    'contracts.Kernel.abi': {
      type: 'object',
      code: _errors.CONTRACT_REQUIRED,
      args: ['Kernel']
    }
  });
  const args = [config.web3.utils.toHex(kernelIpfsHash), dimension, complexity, price]; // Estimate required amount of gas

  const gas = await web3Helpers.estimateGas(config.contracts.Kernel.bytecode, args, config); // Create and deploy kernel contract

  const kernelContractAddress = await web3Helpers.deployContract(config.contracts.Kernel, {
    args,
    from: publisher,
    gas: Number.parseInt(gas * 1.5, 10)
  }, config);
  return kernelContractAddress;
};
/**
 * Add kernel to market
 * 
 * @param {String} kernelContractAddress 
 * @param {String} publisherAddress 
 * @param {Object} config Library config (provided by the proxy but can be overridden)
 * @returns {Promise} Promise object resolved to {string} contractAddress // can be null if used ganache-cli environment
 */


exports.deploy = deploy;

const addToMarket = (kernelContractAddress, publisherAddress, config = {}) => new Promise((resolve, reject) => {
  expect.all(config, {
    'web3': {
      type: 'object',
      code: _errors.WEB3_REQUIRED
    },
    'contracts.PandoraMarket.abi': {
      type: 'object',
      code: _errors.CONTRACT_REQUIRED,
      args: ['PandoraMarket']
    },
    'addresses.PandoraMarket': {
      type: 'string',
      code: _errors.ADDRESS_REQUIRED,
      args: ['Kernel']
    },
    'web3.currentProvider.isMetaMask': {
      type: 'boolean',
      code: _errors.WEB3_METAMASK_REQUIRED
    }
  });
  const market = new config.web3.eth.Contract(config.contracts.PandoraMarket.abi, config.addresses.PandoraMarket);
  market.methods.addKernel(kernelContractAddress).send({
    from: publisherAddress
  }).on('error', reject).on('receipt', receipt => {
    if (Number(receipt.status) === 0) {
      return reject((0, _errors.default)(_errors.TRANSACTION_UNSUCCESSFUL));
    }

    resolve(receipt.contractAddress || receipt.events.KernelAdded.returnValues.kernel);
  }); // @note In case of ganache-cli blockchain "contractAddress" always will be equal to null
});
/**
 * Remove kernel from PandoraMarket
 * 
 * @param {String} kernelAddress
 * @param {String} publisherAddress 
 * @param {Object} config Library config (provided by the proxy but can be overridden) 
 */


exports.addToMarket = addToMarket;

const removeKernel = (kernelAddress, publisherAddress, config = {}) => new Promise((resolve, reject) => {
  expect.all(config, {
    'web3': {
      type: 'object',
      code: _errors.WEB3_REQUIRED
    },
    'contracts.PandoraMarket.abi': {
      type: 'object',
      code: _errors.CONTRACT_REQUIRED,
      args: ['PandoraMarket']
    },
    'addresses.PandoraMarket': {
      type: 'string',
      code: _errors.ADDRESS_REQUIRED,
      args: ['Kernel']
    }
  });
  const market = new config.web3.eth.Contract(config.contracts.PandoraMarket.abi, config.addresses.PandoraMarket);
  market.methods.removeKernel(kernelAddress).send({
    from: publisherAddress
  }).on('error', reject).on('receipt', receipt => {
    if (Number(receipt.status) === 0) {
      return reject((0, _errors.default)(_errors.TRANSACTION_UNSUCCESSFUL));
    }

    resolve(receipt.contractAddress);
  });
});
/**
 * Handle event KernelAdded
 * 
 * @param {Object} options Event handler options
 * @param {Object} config Library config (provided by the proxy but can be overridden)
 */


exports.removeKernel = removeKernel;

const eventKernelAdded = (options = {}, config = {}) => new Promise((resolve, reject) => {
  expect.all(config, {
    'web3': {
      type: 'object',
      code: _errors.WEB3_REQUIRED
    },
    'contracts.PandoraMarket.abi': {
      type: 'object',
      code: _errors.CONTRACT_REQUIRED,
      args: ['PandoraMarket']
    },
    'addresses.PandoraMarket': {
      type: 'string',
      code: _errors.ADDRESS_REQUIRED,
      args: ['Kernel']
    }
  });
  const mar = new config.web3.eth.Contract(config.contracts.PandoraMarket.abi, config.addresses.PandoraMarket);
  mar.events.KernelAdded(options).on('data', async res => {
    try {
      const kernel = await fetchKernel(res.returnValues.kernel, config);
      resolve({
        address: res.returnValues.kernel,
        kernel,
        status: 'created',
        event: 'PandoraMarket.KernelAdded'
      });
    } catch (err) {
      reject(err);
    }
  }).on('error', reject);
});
/**
 * Handle event KernelRemoved
 * 
 * @param {Object} options Event handler options
 * @param {Object} config Library config (provided by the proxy but can be overridden)
 */


exports.eventKernelAdded = eventKernelAdded;

const eventKernelRemoved = (options = {}, config = {}) => new Promise((resolve, reject) => {
  expect.all(config, {
    'web3': {
      type: 'object',
      code: _errors.WEB3_REQUIRED
    },
    'contracts.PandoraMarket.abi': {
      type: 'object',
      code: _errors.CONTRACT_REQUIRED,
      args: ['PandoraMarket']
    },
    'addresses.PandoraMarket': {
      type: 'string',
      code: _errors.ADDRESS_REQUIRED,
      args: ['PandoraMarket']
    }
  });
  const mar = new config.web3.eth.Contract(config.contracts.PandoraMarket.abi, config.addresses.PandoraMarket);
  mar.events.KernelRemoved(options).on('data', async res => {
    resolve({
      address: res.returnValues.kernel,
      status: 'removed',
      event: 'PandoraMarket.KernelRemoved'
    });
  }).on('error', reject);
});

exports.eventKernelRemoved = eventKernelRemoved;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9rZXJuZWxzLmpzIl0sIm5hbWVzIjpbImZldGNoQ291bnQiLCJjb25maWciLCJleHBlY3QiLCJhbGwiLCJ0eXBlIiwiY29kZSIsIldFQjNfUkVRVUlSRUQiLCJDT05UUkFDVF9SRVFVSVJFRCIsImFyZ3MiLCJBRERSRVNTX1JFUVVJUkVEIiwibWFyIiwid2ViMyIsImV0aCIsIkNvbnRyYWN0IiwiY29udHJhY3RzIiwiUGFuZG9yYU1hcmtldCIsImFiaSIsImFkZHJlc3NlcyIsImNvdW50IiwibWV0aG9kcyIsImtlcm5lbHNDb3VudCIsImNhbGwiLCJOdW1iZXIiLCJwYXJzZUludCIsImZldGNoQWRkcmVzc0J5SWQiLCJpZCIsImtlcm5lbENvbnRyYWN0Iiwia2VybmVscyIsImZldGNoSXBmc0FkZHJlc3MiLCJhZGRyZXNzIiwia2VyIiwiS2VybmVsIiwiaXBmc0FkZHJlc3MiLCJ1dGlscyIsImhleFRvQXNjaWkiLCJmZXRjaERhdGFEaW0iLCJkYXRhRGltIiwiZmV0Y2hDdXJyZW50UHJpY2UiLCJjdXJyZW50UHJpY2UiLCJmZXRjaENvbXBsZXhpdHkiLCJjb21wbGV4aXR5IiwiZmV0Y2hLZXJuZWwiLCJQcm9taXNlIiwiZmV0Y2hLZXJuZWxCeUlkIiwia2VybmVsIiwiZmV0Y2hBbGwiLCJyZWNvcmRzIiwiZXJyb3IiLCJpIiwicHVzaCIsImVyciIsIm1lc3NhZ2UiLCJkZXBsb3kiLCJrZXJuZWxJcGZzSGFzaCIsInB1Ymxpc2hlciIsImRpbWVuc2lvbiIsInByaWNlIiwidG9IZXgiLCJnYXMiLCJ3ZWIzSGVscGVycyIsImVzdGltYXRlR2FzIiwiYnl0ZWNvZGUiLCJrZXJuZWxDb250cmFjdEFkZHJlc3MiLCJkZXBsb3lDb250cmFjdCIsImZyb20iLCJhZGRUb01hcmtldCIsInB1Ymxpc2hlckFkZHJlc3MiLCJyZXNvbHZlIiwicmVqZWN0IiwiV0VCM19NRVRBTUFTS19SRVFVSVJFRCIsIm1hcmtldCIsImFkZEtlcm5lbCIsInNlbmQiLCJvbiIsInJlY2VpcHQiLCJzdGF0dXMiLCJUUkFOU0FDVElPTl9VTlNVQ0NFU1NGVUwiLCJjb250cmFjdEFkZHJlc3MiLCJldmVudHMiLCJLZXJuZWxBZGRlZCIsInJldHVyblZhbHVlcyIsInJlbW92ZUtlcm5lbCIsImtlcm5lbEFkZHJlc3MiLCJldmVudEtlcm5lbEFkZGVkIiwib3B0aW9ucyIsInJlcyIsImV2ZW50IiwiZXZlbnRLZXJuZWxSZW1vdmVkIiwiS2VybmVsUmVtb3ZlZCJdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7Ozs7O0FBU0E7Ozs7Ozs7QUFFQTs7QUFDQTs7QUFPQTs7Ozs7Ozs7QUFFQTs7Ozs7O0FBTU8sTUFBTUEsYUFBYSxPQUFPQyxTQUFTLEVBQWhCLEtBQXVCO0FBRTdDQyxTQUFPQyxHQUFQLENBQVdGLE1BQVgsRUFBbUI7QUFDZixZQUFRO0FBQ0pHLFlBQU0sUUFERjtBQUVKQyxZQUFNQztBQUZGLEtBRE87QUFLZixtQ0FBK0I7QUFDM0JGLFlBQU0sUUFEcUI7QUFFM0JDLFlBQU1FLHlCQUZxQjtBQUczQkMsWUFBTSxDQUFDLGVBQUQ7QUFIcUIsS0FMaEI7QUFVZiwrQkFBMkI7QUFDdkJKLFlBQU0sUUFEaUI7QUFFdkJDLFlBQU1JLHdCQUZpQjtBQUd2QkQsWUFBTSxDQUFDLGVBQUQ7QUFIaUI7QUFWWixHQUFuQjtBQWlCQSxRQUFNRSxNQUFNLElBQUlULE9BQU9VLElBQVAsQ0FBWUMsR0FBWixDQUFnQkMsUUFBcEIsQ0FBNkJaLE9BQU9hLFNBQVAsQ0FBaUJDLGFBQWpCLENBQStCQyxHQUE1RCxFQUFpRWYsT0FBT2dCLFNBQVAsQ0FBaUJGLGFBQWxGLENBQVo7QUFDQSxRQUFNRyxRQUFRLE1BQU1SLElBQUlTLE9BQUosQ0FDZkMsWUFEZSxHQUVmQyxJQUZlLEVBQXBCO0FBSUEsU0FBT0MsT0FBT0MsUUFBUCxDQUFnQkwsS0FBaEIsRUFBdUIsRUFBdkIsQ0FBUDtBQUNILENBekJNO0FBMkJQOzs7Ozs7Ozs7OztBQU9PLE1BQU1NLG1CQUFtQixPQUFPQyxFQUFQLEVBQVd4QixTQUFTLEVB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Ozs7Ozs7QUFNTyxNQUFNbUIscUJBQXFCLENBQUNILFVBQVUsRUFBWCxFQUFlbkYsU0FBUyxFQUF4QixLQUErQixJQUFJeUMsT0FBSixDQUFZLENBQUN5QixPQUFELEVBQVVDLE1BQVYsS0FBcUI7QUFFOUZsRSxTQUFPQyxHQUFQLENBQVdGLE1BQVgsRUFBbUI7QUFDZixZQUFRO0FBQ0pHLFlBQU0sUUFERjtBQUVKQyxZQUFNQztBQUZGLEtBRE87QUFLZixtQ0FBK0I7QUFDM0JGLFlBQU0sUUFEcUI7QUFFM0JDLFlBQU1FLHlCQUZxQjtBQUczQkMsWUFBTSxDQUFDLGVBQUQ7QUFIcUIsS0FMaEI7QUFVZiwrQkFBMkI7QUFDdkJKLFlBQU0sUUFEaUI7QUFFdkJDLFlBQU1JLHdCQUZpQjtBQUd2QkQsWUFBTSxDQUFDLGVBQUQ7QUFIaUI7QUFWWixHQUFuQjtBQWlCQSxRQUFNRSxNQUFNLElBQUlULE9BQU9VLElBQVAsQ0FBWUMsR0FBWixDQUFnQkMsUUFBcEIsQ0FBNkJaLE9BQU9hLFNBQVAsQ0FBaUJDLGFBQWpCLENBQStCQyxHQUE1RCxFQUFpRWYsT0FBT2dCLFNBQVAsQ0FBaUJGLGFBQWxGLENBQVo7QUFDQUwsTUFBSW9FLE1BQUosQ0FBV1UsYUFBWCxDQUF5QkosT0FBekIsRUFDS1gsRUFETCxDQUNRLE1BRFIsRUFDZ0IsTUFBTVksR0FBTixJQUFhO0FBRXJCbEIsWUFBUTtBQUNKdEMsZUFBU3dELElBQUlMLFlBQUosQ0FBaUJwQyxNQUR0QjtBQUVKK0IsY0FBUSxTQUZKO0FBR0pXLGFBQU87QUFISCxLQUFSO0FBS0gsR0FSTCxFQVNLYixFQVRMLENBU1EsT0FUUixFQVNpQkwsTUFUakI7QUFVSCxDQTlCZ0UsQ0FBMUQiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIEtlcm5lbHMgcmVsYXRlZCBtZXRob2RzXG4gKiBUaGlzIGZpbGUgaXQgaXMgYSBwYXJ0IG9mIHRoZSBQYW5kb3JhIFB5cnJoYSBKYXZhc2NyaXB0IGxpYnJhcnlcbiAqIFxuICogQGZpbGUga2VybmVscy5qc1xuICogQGF1dGhvciBLb3N0aWFudHluIFNteXJub3YgPGtvc3R5c2hAZ21haWwuY29tPlxuICogQGRhdGUgMjAxOFxuICovXG5cbid1c2Ugc3RyaWN0JztcblxuaW1wb3J0ICogYXMgZXhwZWN0IGZyb20gJy4vaGVscGVycy9leHBlY3QnO1xuaW1wb3J0IHBqc0Vycm9yLCB7XG4gICAgQ09OVFJBQ1RfUkVRVUlSRUQsXG4gICAgQUREUkVTU19SRVFVSVJFRCxcbiAgICBXRUIzX1JFUVVJUkVELFxuICAgIFdFQjNfTUVUQU1BU0tfUkVRVUlSRUQsXG4gICAgVFJBTlNBQ1RJT05fVU5TVUNDRVNTRlVMXG59IGZyb20gJy4vaGVscGVycy9lcnJvcnMnO1xuaW1wb3J0ICogYXMgd2ViM0hlbHBlcnMgZnJvbSAnLi9oZWxwZXJzL3dlYjMnO1xuXG4vKipcbiAqIEdldCBrZXJuZWxzIGNvdW50IGZyb20gUGFuZG9yYU1hcmtldCBjb250cmFjdFxuICogXG4gKiBAcGFyYW0ge09iamVjdH0gY29uZmlnIExpYnJhcnkgY29uZmlnIChwcm92aWRlZCBieSB0aGUgcHJveHkgYnV0IGNhbiBiZSBvdmVycmlkZGVuKVxuICogQHJldHVybnMge1Byb21pc2V9IEEgUHJvbWlzZSBvYmplY3QgcmVwcmVzZW50cyB0aGUge251bWJlcn0gXG4gKi9cbmV4cG9ydCBjb25zdCBmZXRjaENvdW50ID0gYXN5bmMgKGNvbmZpZyA9IHt9KSA9PiB7XG5cbiAgICBleHBlY3QuYWxsKGNvbmZpZywge1xuICAgICAgICAnd2ViMyc6IHtcbiAgICAgICAgICAgIHR5cGU6ICdvYmplY3QnLFxuICAgICAgICAgICAgY29kZTogV0VCM19SRVFVSVJFRFxuICAgICAgICB9LFxuICAgICAgICAnY29udHJhY3RzLlBhbmRvcmFNYXJrZXQuYWJpJzoge1xuICAgICAgICAgICAgdHlwZTogJ29iamVjdCcsXG4gICAgICAgICAgICBjb2RlOiBDT05UUkFDVF9SRVFVSVJFRCxcbiAgICAgICAgICAgIGFyZ3M6IFsnUGFuZG9yYU1hcmtldCddXG4gICAgICAgIH0sXG4gICAgICAgICdhZGRyZXNzZXMuUGFuZG9yYU1hcmtldCc6IHtcbiAgICAgICAgICAgIHR5cGU6ICdzdHJpbmcnLFxuICAgICAgICAgICAgY29kZTogQUREUkVTU19SRVFVSVJFRCxcbiAgICAgICAgICAgIGFyZ3M6IFsnUGFuZG9yYU1hcmtldCddXG4gICAgICAgIH1cbiAgICB9KTtcblxuICAgIGNvbnN0IG1hciA9IG5ldyBjb25maWcud2ViMy5ldGguQ29udHJhY3QoY29uZmlnLmNvbnRyYWN0cy5QYW5kb3JhTWFya2V0LmFiaSwgY29uZmlnLmFkZHJlc3Nlcy5QYW5kb3JhTWFya2V0KTtcbiAgICBjb25zdCBjb3VudCA9IGF3YWl0IG1hci5tZXRob2RzXG4gICAgICAgIC5rZXJuZWxzQ291bnQoKVxuICAgICAgICAuY2FsbCgpO1xuXG4gICAgcmV0dXJuIE51bWJlci5wYXJzZUludChjb3VudCwgMTApO1xufTtcblxuLyoqXG4gKiBHZXQgS2VybmVsIGFkZHJlc3MgYnkga2VybmVsIGlkXG4gKiBcbiAqIEBwYXJhbSB7bnVtYmVyfSBpZFxuICogQHBhcmFtIHtPYmplY3R9IGNvbmZpZyBMaWJyYXJ5IGNvbmZpZyAocHJvdmlkZWQgYnkgdGhlIHByb3h5IGJ1dCBjYW4gYmUgb3ZlcnJpZGRlbilcbiAqIEByZXR1cm5zIHtQcm9taXNlfSBBIFByb21pc2Ugb2JqZWN0IHJlcHJlc2VudHMgdGhlIHtzdHJpbmd9XG4gKi9cbmV4cG9ydCBjb25zdCBmZXRjaEFkZHJlc3NCeUlkID0gYXN5bmMgKGlkLCBjb25maWcgPSB7fSkgPT4ge1xuXG4gICAgZXhwZWN0LmFsbChjb25maWcsIHtcbiAgICAgICAgJ3dlYjMnOiB7XG4gICAgICAgICAgICB0eXBlOiAnb2JqZWN0JyxcbiAgICAgICAgICAgIGNvZGU6IFdFQjNfUkVRVUlSRURcbiAgICAgICAgfSxcbiAgICAgICAgJ2NvbnRyYWN0cy5QYW5kb3JhTWFya2V0LmFiaSc6IHtcbiAgICAgICAgICAgIHR5cGU6ICdvYmplY3QnLFxuICAgICAgICAgICAgY29kZTogQ09OVFJBQ1RfUkVRVUlSRUQsXG4gICAgICAgICAgICBhcmdzOiBbJ1BhbmRvcmFNYXJrZXQnXVxuICAgICAgICB9LFxuICAgICAgICAnYWRkcmVzc2VzLlBhbmRvcmFNYXJrZXQnOiB7XG4gICAgICAgICAgICB0eXBlOiAnc3RyaW5nJyxcbiAgICAgICAgICAgIGNvZGU6IEFERFJFU1NfUkVRVUlSRUQsXG4gICAgICAgICAgICBhcmdzOiBbJ1BhbmRvcmFNYXJrZXQnXVxuICAgICAgICB9XG4gICAgfSk7XG5cbiAgICBjb25zdCBtYXIgPSBuZXcgY29uZmlnLndlYjMuZXRoLkNvbnRyYWN0KGNvbmZpZy5jb250cmFjdHMuUGFuZG9yYU1hcmtldC5hYmksIGNvbmZpZy5hZGRyZXNzZXMuUGFuZG9yYU1hcmtldCk7XG4gICAgY29uc3Qga2VybmVsQ29udHJhY3QgPSBhd2FpdCBtYXIubWV0aG9kc1xuICAgICAgICAua2VybmVscyhpZClcbiAgICAgICAgLmNhbGwoKTtcblxuICAgIHJldHVybiBrZXJuZWxDb250cmFjdDtcbn07XG5cbi8qKlxuICogR2V0IElQRlMgYWRkcmVzcyBmcm9tIEtlcm5lbCBjb250cmFjdCBieSB0aGUga2VybmVsIGFkZHJlc3NcbiAqIFxuICogQHBhcmFtIHtzdHJpbmd9IGFkZHJlc3NcbiAqIEBwYXJhbSB7T2JqZWN0fSBjb25maWcgTGlicmFyeSBjb25maWcgKHByb3ZpZGVkIGJ5IHRoZSBwcm94eSBidXQgY2FuIGJlIG92ZXJyaWRkZW4pXG4gKiBAcmV0dXJucyB7UHJvbWlzZX0gQSBQcm9taXNlIG9iamVjdCByZXByZXNlbnRzIHRoZSB7c3RyaW5nfVxuICovXG5leHBvcnQgY29uc3QgZmV0Y2hJcGZzQWRkcmVzcyA9IGFzeW5jIChhZGRyZXNzID0gJycsIGNvbmZpZyA9IHt9KSA9PiB7XG5cbiAgICBleHBlY3QuYWxsKGNvbmZpZywge1xuICAgICAgICAnd2ViMyc6IHtcbiAgICAgICAgICAgIHR5cGU6ICdvYmplY3QnLFxuICAgICAgICAgICAgY29kZTogV0VCM19SRVFVSVJFRFxuICAgICAgICB9LFxuICAgICAgICAnY29udHJhY3RzLktlcm5lbC5hYmknOiB7XG4gICAgICAgICAgICB0eXBlOiAnb2JqZWN0JyxcbiAgICAgICAgICAgIGNvZGU6IENPTlRSQUNUX1JFUVVJUkVELFxuICAgICAgICAgICAgYXJnczogWydLZXJuZWwnXVxuICAgICAgICB9XG4gICAgfSk7XG5cbiAgICBjb25zdCBrZXIgPSBuZXcgY29uZmlnLndlYjMuZXRoLkNvbnRyYWN0KGNvbmZpZy5jb250cmFjdHMuS2VybmVsLmFiaSwgYWRkcmVzcyk7XG4gICAgY29uc3QgaXBmc0FkZHJlc3MgPSBhd2FpdCBrZXIubWV0aG9kc1xuICAgICAgICAuaXBmc0FkZHJlc3MoKVxuICAgICAgICAuY2FsbCgpO1xuXG4gICAgcmV0dXJuIGNvbmZpZy53ZWIzLnV0aWxzLmhleFRvQXNjaWkoaXBmc0FkZHJlc3MpO1xufTtcblxuLyoqXG4gKiBHZXQgZGF0YSBkaW0gZnJvbSBLZXJuZWwgY29udHJhY3QgYnkgdGhlIGtlcm5lbCBhZGRyZXNzXG4gKiBcbiAqIEBwYXJhbSB7c3RyaW5nfSBhZGRyZXNzXG4gKiBAcGFyYW0ge09iamVjdH0gY29uZmlnIExpYnJhcnkgY29uZmlnIChwcm92aWRlZCBieSB0aGUgcHJveHkgYnV0IGNhbiBiZSBvdmVycmlkZGVuKVxuICogQHJldHVybnMge1Byb21pc2V9IEEgUHJvbWlzZSBvYmplY3QgcmVwcmVzZW50cyB0aGUge251bWJlcn1cbiAqL1xuZXhwb3J0IGNvbnN0IGZldGNoRGF0YURpbSA9IGFzeW5jIChhZGRyZXNzID0gJycsIGNvbmZpZyA9IHt9KSA9PiB7XG5cbiAgICBleHBlY3QuYWxsKGNvbmZpZywge1xuICAgICAgICAnd2ViMyc6IHtcbiAgICAgICAgICAgIHR5cGU6ICdvYmplY3QnLFxuICAgICAgICAgICAgY29kZTogV0VCM19SRVFVSVJFRFxuICAgICAgICB9LFxuICAgICAgICAnY29udHJhY3RzLktlcm5lbC5hYmknOiB7XG4gICAgICAgICAgICB0eXBlOiAnb2JqZWN0JyxcbiAgICAgICAgICAgIGNvZGU6IENPTlRSQUNUX1JFUVVJUkVELFxuICAgICAgICAgICAgYXJnczogWydLZXJuZWwnXVxuICAgICAgICB9XG4gICAgfSk7XG5cbiAgICBjb25zdCBrZXIgPSBuZXcgY29uZmlnLndlYjMuZXRoLkNvbnRyYWN0KGNvbmZpZy5jb250cmFjdHMuS2VybmVsLmFiaSwgYWRkcmVzcyk7XG4gICAgY29uc3QgZGF0YURpbSA9IGF3YWl0IGtlci5tZXRob2RzXG4gICAgICAgIC5kYXRhRGltKClcbiAgICAgICAgLmNhbGwoKTtcblxuICAgIHJldHVybiBOdW1iZXIucGFyc2VJbnQoZGF0YURpbSwgMTApO1xufTtcblxuLyoqXG4gKiBHZXQgY3VycmVudCBwcmljZSBmcm9tIEtlcm5lbCBjb250cmFjdCBieSB0aGUga2VybmVsIGFkZHJlc3NcbiAqIFxuICogQHBhcmFtIHtzdHJpbmd9IGFkZHJlc3NcbiAqIEBwYXJhbSB7T2JqZWN0fSBjb25maWcgTGlicmFyeSBjb25maWcgKHByb3ZpZGVkIGJ5IHRoZSBwcm94eSBidXQgY2FuIGJlIG92ZXJyaWRkZW4pXG4gKiBAcmV0dXJucyB7UHJvbWlzZX0gQSBQcm9taXNlIG9iamVjdCByZXByZXNlbnRzIHRoZSB7bnVtYmVyfVxuICovXG5leHBvcnQgY29uc3QgZmV0Y2hDdXJyZW50UHJpY2UgPSBhc3luYyAoYWRkcmVzcyA9ICcnLCBjb25maWcgPSB7fSkgPT4ge1xuXG4gICAgZXhwZWN0LmFsbChjb25maWcsIHtcbiAgICAgICAgJ3dlYjMnOiB7XG4gICAgICAgICAgICB0eXBlOiAnb2JqZWN0JyxcbiAgICAgICAgICAgIGNvZGU6IFdFQjNfUkVRVUlSRURcbiAgICAgICAgfSxcbiAgICAgICAgJ2NvbnRyYWN0cy5LZXJuZWwuYWJpJzoge1xuICAgICAgICAgICAgdHlwZTogJ29iamVjdCcsXG4gICAgICAgICAgICBjb2RlOiBDT05UUkFDVF9SRVFVSVJFRCxcbiAgICAgICAgICAgIGFyZ3M6IFsnS2VybmVsJ11cbiAgICAgICAgfVxuICAgIH0pO1xuXG4gICAgY29uc3Qga2VyID0gbmV3IGNvbmZpZy53ZWIzLmV0aC5Db250cmFjdChjb25maWcuY29udHJhY3RzLktlcm5lbC5hYmksIGFkZHJlc3MpO1xuICAgIGNvbnN0IGN1cnJlbnRQcmljZSA9IGF3YWl0IGtlci5tZXRob2RzXG4gICAgICAgIC5jdXJyZW50UHJpY2UoKVxuICAgICAgICAuY2FsbCgpO1xuXG4gICAgcmV0dXJuIE51bWJlci5wYXJzZUludChjdXJyZW50UHJpY2UsIDEwKTtcbn07XG5cbi8qKlxuICogR2V0IGNvbXBsZXhpdHkgZnJvbSBLZXJuZWwgY29udHJhY3QgYnkgdGhlIGtlcm5lbCBhZGRyZXNzXG4gKiBcbiAqIEBwYXJhbSB7c3RyaW5nfSBhZGRyZXNzXG4gKiBAcGFyYW0ge09iamVjdH0gY29uZmlnIExpYnJhcnkgY29uZmlnIChwcm92aWRlZCBieSB0aGUgcHJveHkgYnV0IGNhbiBiZSBvdmVycmlkZGVuKVxuICogQHJldHVybnMge1Byb21pc2V9IEEgUHJvbWlzZSBvYmplY3QgcmVwcmVzZW50cyB0aGUge251bWJlcn1cbiAqL1xuZXhwb3J0IGNvbnN0IGZldGNoQ29tcGxleGl0eSA9IGFzeW5jIChhZGRyZXNzID0gJycsIGNvbmZpZyA9IHt9KSA9PiB7XG5cbiAgICBleHBlY3QuYWxsKGNvbmZpZywge1xuICAgICAgICAnd2ViMyc6IHtcbiAgICAgICAgICAgIHR5cGU6ICdvYmplY3QnLFxuICAgICAgICAgICAgY29kZTogV0VCM19SRVFVSVJFRFxuICAgICAgICB9LFxuICAgICAgICAnY29udHJhY3RzLktlcm5lbC5hYmknOiB7XG4gICAgICAgICAgICB0eXBlOiAnb2JqZWN0JyxcbiAgICAgICAgICAgIGNvZGU6IENPTlRSQUNUX1JFUVVJUkVELFxuICAgICAgICAgICAgYXJnczogWydLZXJuZWwnXVxuICAgICAgICB9XG4gICAgfSk7XG5cbiAgICBjb25zdCBrZXIgPSBuZXcgY29uZmlnLndlYjMuZXRoLkNvbnRyYWN0KGNvbmZpZy5jb250cmFjdHMuS2VybmVsLmFiaSwgYWRkcmVzcyk7XG4gICAgY29uc3QgY29tcGxleGl0eSA9IGF3YWl0IGtlci5tZXRob2RzXG4gICAgICAgIC5jb21wbGV4aXR5KClcbiAgICAgICAgLmNhbGwoKTtcblxuICAgIHJldHVybiBOdW1iZXIucGFyc2VJbnQoY29tcGxleGl0eSwgMTApO1xufTtcblxuLyoqXG4gKiBHZXQgS2VybmVsIGJ5IHRoZSBrZXJuZWwgYWRkcmVzc1xuICogXG4gKiBAcGFyYW0ge3N0cmluZ30gYWRkcmVzc1xuICogQHBhcmFtIHtPYmplY3R9IGNvbmZpZyBMaWJyYXJ5IGNvbmZpZyAocHJvdmlkZWQgYnkgdGhlIHByb3h5IGJ1dCBjYW4gYmUgb3ZlcnJpZGRlbilcbiAqIEByZXR1cm5zIHtQcm9taXNlfSBQcm9taXNlIG9iamVjdCByZXByZXNlbnRzIHRoZSB7T2JqZWN0W119XG4gKi9cbmV4cG9ydCBjb25zdCBmZXRjaEtlcm5lbCA9IGFzeW5jIChhZGRyZXNzID0gJycsIGNvbmZpZyA9IHt9KSA9PiB7XG5cbiAgICBjb25zdCBbXG4gICAgICAgIGlwZnNBZGRyZXNzLFxuICAgICAgICBkYXRhRGltLFxuICAgICAgICBjdXJyZW50UHJpY2UsXG4gICAgICAgIGNvbXBsZXhpdHlcbiAgICBdID0gYXdhaXQgUHJvbWlzZS5hbGwoW1xuICAgICAgICBmZXRjaElwZnNBZGRyZXNzKGFkZHJlc3MsIGNvbmZpZyksXG4gICAgICAgIGZldGNoRGF0YURpbShhZGRyZXNzLCBjb25maWcpLFxuICAgICAgICBmZXRjaEN1cnJlbnRQcmljZShhZGRyZXNzLCBjb25maWcpLFxuICAgICAgICBmZXRjaENvbXBsZXhpdHkoYWRkcmVzcywgY29uZmlnKVxuICAgIF0pO1xuXG4gICAgcmV0dXJuIHtcbiAgICAgICAgYWRkcmVzcyxcbiAgICAgICAgaXBmc0FkZHJlc3MsXG4gICAgICAgIGRhdGFEaW0sXG4gICAgICAgIGN1cnJlbnRQcmljZSxcbiAgICAgICAgY29tcGxleGl0eVxuICAgIH07XG59O1xuXG4vKipcbiAqIEdldCBrZXJuZWwgYnkgaWRcbiAqIFxuICogQHBhcmFtIHtpbnRlZ2VyfSBpZCBcbiAqIEBwYXJhbSB7T2JqZWN0fSBjb25maWcgTGlicmFyeSBjb25maWcgKHByb3ZpZGVkIGJ5IHRoZSBwcm94eSBidXQgY2FuIGJlIG92ZXJyaWRkZW4pXG4gKiBAcmV0dXJucyB7UHJvbWlzZX0gQSBQcm9taXNlIG9iamVjdCByZXByZXNlbnRzIHRoZSB7T2JqZWN0fVxuICovXG5leHBvcnQgY29uc3QgZmV0Y2hLZXJuZWxCeUlkID0gYXN5bmMgKGlkLCBjb25maWcgPSB7fSkgPT4ge1xuICAgIFxuICAgIGNvbnN0IGFkZHJlc3MgPSBhd2FpdCBmZXRjaEFkZHJlc3NCeUlkKGlkLCBjb25maWcpO1xuICAgIGNvbnN0IGtlcm5lbCA9IGF3YWl0IGZldGNoS2VybmVsKGFkZHJlc3MsIGNvbmZpZyk7XG5cbiAgICByZXR1cm4ga2VybmVsO1xufTtcblxuLyoqXG4gKiBHZXQgYWxsIGtlcm5lbHNcbiAqIFxuICogQHBhcmFtIHtPYmplY3R9IGNvbmZpZyBMaWJyYXJ5IGNvbmZpZyAocHJvdmlkZWQgYnkgdGhlIHByb3h5IGJ1dCBjYW4gYmUgb3ZlcnJpZGRlbilcbiAqIEByZXR1cm5zIHtQcm9taXNlfSBQcm9taXNlIG9iamVjdCByZXByZXNlbnRzIHRoZSB7T2JqZWN0W119XG4gKi9cbmV4cG9ydCBjb25zdCBmZXRjaEFsbCA9IGFzeW5jIChjb25maWcgPSB7fSkgPT4ge1xuXG4gICAgbGV0IHJlY29yZHMgPSBbXTtcbiAgICBsZXQgZXJyb3IgPSBbXTtcblxuICAgIHRyeSB7XG5cbiAgICAgICAgY29uc3QgY291bnQgPSBhd2FpdCBmZXRjaENvdW50KGNvbmZpZyk7XG5cbiAgICAgICAgZm9yIChsZXQgaT0wOyBpIDwgY291bnQ7IGkrKykge1xuICAgICAgICAgICAgXG4gICAgICAgICAgICB0cnkge1xuXG4gICAgICAgICAgICAgICAgY29uc3Qga2VybmVsID0gYXdhaXQgZmV0Y2hLZXJuZWxCeUlkKGksIGNvbmZpZyk7XG5cbiAgICAgICAgICAgICAgICByZWNvcmRzLnB1c2goe1xuICAgICAgICAgICAgICAgICAgICBpZDogaSxcbiAgICAgICAgICAgICAgICAgICAgLi4ua2VybmVsXG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9IGNhdGNoKGVycikge1xuICAgICAgICAgICAgICAgIGVycm9yLnB1c2goe1xuICAgICAgICAgICAgICAgICAgICBpZDogaSxcbiAgICAgICAgICAgICAgICAgICAgbWVzc2FnZTogZXJyLm1lc3NhZ2VcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH0gICAgICAgIFxuICAgICAgICB9XG4gICAgfSBjYXRjaChlcnIpIHtcbiAgICAgICAgZXJyb3IucHVzaCh7XG4gICAgICAgICAgICBlcnJvcjogZXJyLm1lc3NhZ2VcbiAgICAgICAgfSk7XG4gICAgfSAgIFxuXG4gICAgcmV0dXJuIHtcbiAgICAgICAgcmVjb3JkcyxcbiAgICAgICAgZXJyb3JcbiAgICB9O1xufTtcblxuLyoqXG4gKiBEZXBsb3kgS2VybmVsIGNvbnRyYWN0IHRvIHRoZSBuZXR3b3JrXG4gKiBcbiAqIEBwYXJhbSB7c3RyaW5nfSBrZXJuZWxJcGZzSGFzaCBcbiAqIEBwYXJhbSB7T2JqZWN0fSBvcHRpb25zIHsgcHVibGlzaGVyLCBkaW1lbnNpb24sIGNvbXBsZXhpdHksIHByaWNlIH0gXG4gKiBAcGFyYW0ge09iamVjdH0gY29uZmlnIExpYnJhcnkgY29uZmlnIChwcm92aWRlZCBieSB0aGUgcHJveHkgYnV0IGNhbiBiZSBvdmVycmlkZGVuKVxuICogQHJldHVybnMge1Byb21pc2V9IFByb21pc2Ugb2JqZWN0IHJlc29sdmVkIHRvIGNvbnRyYWN0IGFkZHJlc3NcbiAqL1xuZXhwb3J0IGNvbnN0IGRlcGxveSA9IGFzeW5jIChrZXJuZWxJcGZzSGFzaCwgeyBwdWJsaXNoZXIsIGRpbWVuc2lvbiwgY29tcGxleGl0eSwgcHJpY2UgfSwgY29uZmlnID0ge30pID0+IHtcblxuICAgIGV4cGVjdC5hbGwoY29uZmlnLCB7XG4gICAgICAgICd3ZWIzJzoge1xuICAgICAgICAgICAgdHlwZTogJ29iamVjdCcsXG4gICAgICAgICAgICBjb2RlOiBXRUIzX1JFUVVJUkVEXG4gICAgICAgIH0sXG4gICAgICAgICdjb250cmFjdHMuS2VybmVsLmFiaSc6IHtcbiAgICAgICAgICAgIHR5cGU6ICdvYmplY3QnLFxuICAgICAgICAgICAgY29kZTogQ09OVFJBQ1RfUkVRVUlSRUQsXG4gICAgICAgICAgICBhcmdzOiBbJ0tlcm5lbCddXG4gICAgICAgIH1cbiAgICB9KTtcblxuICAgIGNvbnN0IGFyZ3MgPSBbY29uZmlnLndlYjMudXRpbHMudG9IZXgoa2VybmVsSXBmc0hhc2gpLCBkaW1lbnNpb24sIGNvbXBsZXhpdHksIHByaWNlXTtcbiAgICAgICAgXG4gICAgLy8gRXN0aW1hdGUgcmVxdWlyZWQgYW1vdW50IG9mIGdhc1xuICAgIGNvbnN0IGdhcyA9IGF3YWl0IHdlYjNIZWxwZXJzLmVzdGltYXRlR2FzKGNvbmZpZy5jb250cmFjdHMuS2VybmVsLmJ5dGVjb2RlLCBhcmdzLCBjb25maWcpO1xuXG4gICAgLy8gQ3JlYXRlIGFuZCBkZXBsb3kga2VybmVsIGNvbnRyYWN0XG4gICAgY29uc3Qga2VybmVsQ29udHJhY3RBZGRyZXNzID0gYXdhaXQgd2ViM0hlbHBlcnMuZGVwbG95Q29udHJhY3QoY29uZmlnLmNvbnRyYWN0cy5LZXJuZWwsIHtcbiAgICAgICAgYXJncyxcbiAgICAgICAgZnJvbTogcHVibGlzaGVyLFxuICAgICAgICBnYXM6IE51bWJlci5wYXJzZUludChnYXMgKiAxLjUsIDEwKVxuICAgIH0sIGNvbmZpZyk7XG5cbiAgICByZXR1cm4ga2VybmVsQ29udHJhY3RBZGRyZXNzO1xufTtcblxuLyoqXG4gKiBBZGQga2VybmVsIHRvIG1hcmtldFxuICogXG4gKiBAcGFyYW0ge1N0cmluZ30ga2VybmVsQ29udHJhY3RBZGRyZXNzIFxuICogQHBhcmFtIHtTdHJpbmd9IHB1Ymxpc2hlckFkZHJlc3MgXG4gKiBAcGFyYW0ge09iamVjdH0gY29uZmlnIExpYnJhcnkgY29uZmlnIChwcm92aWRlZCBieSB0aGUgcHJveHkgYnV0IGNhbiBiZSBvdmVycmlkZGVuKVxuICogQHJldHVybnMge1Byb21pc2V9IFByb21pc2Ugb2JqZWN0IHJlc29sdmVkIHRvIHtzdHJpbmd9IGNvbnRyYWN0QWRkcmVzcyAvLyBjYW4gYmUgbnVsbCBpZiB1c2VkIGdhbmFjaGUtY2xpIGVudmlyb25tZW50XG4gKi9cbmV4cG9ydCBjb25zdCBhZGRUb01hcmtldCA9IChrZXJuZWxDb250cmFjdEFkZHJlc3MsIHB1Ymxpc2hlckFkZHJlc3MsIGNvbmZpZyA9IHt9KSA9PiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG5cbiAgICBleHBlY3QuYWxsKGNvbmZpZywge1xuICAgICAgICAnd2ViMyc6IHtcbiAgICAgICAgICAgIHR5cGU6ICdvYmplY3QnLFxuICAgICAgICAgICAgY29kZTogV0VCM19SRVFVSVJFRFxuICAgICAgICB9LFxuICAgICAgICAnY29udHJhY3RzLlBhbmRvcmFNYXJrZXQuYWJpJzoge1xuICAgICAgICAgICAgdHlwZTogJ29iamVjdCcsXG4gICAgICAgICAgICBjb2RlOiBDT05UUkFDVF9SRVFVSVJFRCxcbiAgICAgICAgICAgIGFyZ3M6IFsnUGFuZG9yYU1hcmtldCddXG4gICAgICAgIH0sXG4gICAgICAgICdhZGRyZXNzZXMuUGFuZG9yYU1hcmtldCc6IHtcbiAgICAgICAgICAgIHR5cGU6ICdzdHJpbmcnLFxuICAgICAgICAgICAgY29kZTogQUREUkVTU19SRVFVSVJFRCxcbiAgICAgICAgICAgIGFyZ3M6IFsnS2VybmVsJ11cbiAgICAgICAgfSxcbiAgICAgICAgJ3dlYjMuY3VycmVudFByb3ZpZGVyLmlzTWV0YU1hc2snOiB7XG4gICAgICAgICAgICB0eXBlOiAnYm9vbGVhbicsXG4gICAgICAgICAgICBjb2RlOiBXRUIzX01FVEFNQVNLX1JFUVVJUkVEXG4gICAgICAgIH1cbiAgICB9KTtcblxuICAgIGNvbnN0IG1hcmtldCA9IG5ldyBjb25maWcud2ViMy5ldGguQ29udHJhY3QoY29uZmlnLmNvbnRyYWN0cy5QYW5kb3JhTWFya2V0LmFiaSwgY29uZmlnLmFkZHJlc3Nlcy5QYW5kb3JhTWFya2V0KTtcbiAgICBtYXJrZXQubWV0aG9kc1xuICAgICAgICAuYWRkS2VybmVsKGtlcm5lbENvbnRyYWN0QWRkcmVzcylcbiAgICAgICAgLnNlbmQoe1xuICAgICAgICAgICAgZnJvbTogcHVibGlzaGVyQWRkcmVzc1xuICAgICAgICB9KVxuICAgICAgICAub24oJ2Vycm9yJywgcmVqZWN0KVxuICAgICAgICAub24oJ3JlY2VpcHQnLCByZWNlaXB0ID0+IHtcblxuICAgICAgICAgICAgaWYgKE51bWJlcihyZWNlaXB0LnN0YXR1cykgPT09IDApIHtcblxuICAgICAgICAgICAgICAgIHJldHVybiByZWplY3QocGpzRXJyb3IoVFJBTlNBQ1RJT05fVU5TVUNDRVNTRlVMKSk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHJlc29sdmUocmVjZWlwdC5jb250cmFjdEFkZHJlc3MgfHwgcmVjZWlwdC5ldmVudHMuS2VybmVsQWRkZWQucmV0dXJuVmFsdWVzLmtlcm5lbCk7XG4gICAgICAgIH0pO1xuICAgIC8vIEBub3RlIEluIGNhc2Ugb2YgZ2FuYWNoZS1jbGkgYmxvY2tjaGFpbiBcImNvbnRyYWN0QWRkcmVzc1wiIGFsd2F5cyB3aWxsIGJlIGVxdWFsIHRvIG51bGxcbn0pO1xuXG4vKipcbiAqIFJlbW92ZSBrZXJuZWwgZnJvbSBQYW5kb3JhTWFya2V0XG4gKiBcbiAqIEBwYXJhbSB7U3RyaW5nfSBrZXJuZWxBZGRyZXNzXG4gKiBAcGFyYW0ge1N0cmluZ30gcHVibGlzaGVyQWRkcmVzcyBcbiAqIEBwYXJhbSB7T2JqZWN0fSBjb25maWcgTGlicmFyeSBjb25maWcgKHByb3ZpZGVkIGJ5IHRoZSBwcm94eSBidXQgY2FuIGJlIG92ZXJyaWRkZW4pIFxuICovXG5leHBvcnQgY29uc3QgcmVtb3ZlS2VybmVsID0gKGtlcm5lbEFkZHJlc3MsIHB1Ymxpc2hlckFkZHJlc3MsIGNvbmZpZyA9IHt9KSA9PiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG5cbiAgICBleHBlY3QuYWxsKGNvbmZpZywge1xuICAgICAgICAnd2ViMyc6IHtcbiAgICAgICAgICAgIHR5cGU6ICdvYmplY3QnLFxuICAgICAgICAgICAgY29kZTogV0VCM19SRVFVSVJFRFxuICAgICAgICB9LFxuICAgICAgICAnY29udHJhY3RzLlBhbmRvcmFNYXJrZXQuYWJpJzoge1xuICAgICAgICAgICAgdHlwZTogJ29iamVjdCcsXG4gICAgICAgICAgICBjb2RlOiBDT05UUkFDVF9SRVFVSVJFRCxcbiAgICAgICAgICAgIGFyZ3M6IFsnUGFuZG9yYU1hcmtldCddXG4gICAgICAgIH0sXG4gICAgICAgICdhZGRyZXNzZXMuUGFuZG9yYU1hcmtldCc6IHtcbiAgICAgICAgICAgIHR5cGU6ICdzdHJpbmcnLFxuICAgICAgICAgICAgY29kZTogQUREUkVTU19SRVFVSVJFRCxcbiAgICAgICAgICAgIGFyZ3M6IFsnS2VybmVsJ11cbiAgICAgICAgfVxuICAgIH0pO1xuXG4gICAgY29uc3QgbWFya2V0ID0gbmV3IGNvbmZpZy53ZWIzLmV0aC5Db250cmFjdChjb25maWcuY29udHJhY3RzLlBhbmRvcmFNYXJrZXQuYWJpLCBjb25maWcuYWRkcmVzc2VzLlBhbmRvcmFNYXJrZXQpO1xuICAgIG1hcmtldC5tZXRob2RzXG4gICAgICAgIC5yZW1vdmVLZXJuZWwoa2VybmVsQWRkcmVzcylcbiAgICAgICAgLnNlbmQoe1xuICAgICAgICAgICAgZnJvbTogcHVibGlzaGVyQWRkcmVzc1xuICAgICAgICB9KVxuICAgICAgICAub24oJ2Vycm9yJywgcmVqZWN0KVxuICAgICAgICAub24oJ3JlY2VpcHQnLCByZWNlaXB0ID0+IHtcblxuICAgICAgICAgICAgaWYgKE51bWJlcihyZWNlaXB0LnN0YXR1cykgPT09IDApIHtcblxuICAgICAgICAgICAgICAgIHJldHVybiByZWplY3QocGpzRXJyb3IoVFJBTlNBQ1RJT05fVU5TVUNDRVNTRlVMKSk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHJlc29sdmUocmVjZWlwdC5jb250cmFjdEFkZHJlc3MpO1xuICAgICAgICB9KTtcbn0pO1xuXG4vKipcbiAqIEhhbmRsZSBldmVudCBLZXJuZWxBZGRlZFxuICogXG4gKiBAcGFyYW0ge09iamVjdH0gb3B0aW9ucyBFdmVudCBoYW5kbGVyIG9wdGlvbnNcbiAqIEBwYXJhbSB7T2JqZWN0fSBjb25maWcgTGlicmFyeSBjb25maWcgKHByb3ZpZGVkIGJ5IHRoZSBwcm94eSBidXQgY2FuIGJlIG92ZXJyaWRkZW4pXG4gKi9cbmV4cG9ydCBjb25zdCBldmVudEtlcm5lbEFkZGVkID0gKG9wdGlvbnMgPSB7fSwgY29uZmlnID0ge30pID0+IG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcblxuICAgIGV4cGVjdC5hbGwoY29uZmlnLCB7XG4gICAgICAgICd3ZWIzJzoge1xuICAgICAgICAgICAgdHlwZTogJ29iamVjdCcsXG4gICAgICAgICAgICBjb2RlOiBXRUIzX1JFUVVJUkVEXG4gICAgICAgIH0sXG4gICAgICAgICdjb250cmFjdHMuUGFuZG9yYU1hcmtldC5hYmknOiB7XG4gICAgICAgICAgICB0eXBlOiAnb2JqZWN0JyxcbiAgICAgICAgICAgIGNvZGU6IENPTlRSQUNUX1JFUVVJUkVELFxuICAgICAgICAgICAgYXJnczogWydQYW5kb3JhTWFya2V0J11cbiAgICAgICAgfSxcbiAgICAgICAgJ2FkZHJlc3Nlcy5QYW5kb3JhTWFya2V0Jzoge1xuICAgICAgICAgICAgdHlwZTogJ3N0cmluZycsXG4gICAgICAgICAgICBjb2RlOiBBRERSRVNTX1JFUVVJUkVELFxuICAgICAgICAgICAgYXJnczogWydLZXJuZWwnXVxuICAgICAgICB9XG4gICAgfSk7XG5cbiAgICBjb25zdCBtYXIgPSBuZXcgY29uZmlnLndlYjMuZXRoLkNvbnRyYWN0KGNvbmZpZy5jb250cmFjdHMuUGFuZG9yYU1hcmtldC5hYmksIGNvbmZpZy5hZGRyZXNzZXMuUGFuZG9yYU1hcmtldCk7XG4gICAgbWFyLmV2ZW50cy5LZXJuZWxBZGRlZChvcHRpb25zKVxuICAgICAgICAub24oJ2RhdGEnLCBhc3luYyByZXMgPT4ge1xuXG4gICAgICAgICAgICB0cnkge1xuXG4gICAgICAgICAgICAgICAgY29uc3Qga2VybmVsID0gYXdhaXQgZmV0Y2hLZXJuZWwocmVzLnJldHVyblZhbHVlcy5rZXJuZWwsIGNvbmZpZyk7XG4gICAgICAgICAgICAgICAgcmVzb2x2ZSh7XG4gICAgICAgICAgICAgICAgICAgIGFkZHJlc3M6IHJlcy5yZXR1cm5WYWx1ZXMua2VybmVsLFxuICAgICAgICAgICAgICAgICAgICBrZXJuZWwsXG4gICAgICAgICAgICAgICAgICAgIHN0YXR1czogJ2NyZWF0ZWQnLFxuICAgICAgICAgICAgICAgICAgICBldmVudDogJ1BhbmRvcmFNYXJrZXQuS2VybmVsQWRkZWQnXG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9IGNhdGNoKGVycikge1xuICAgICAgICAgICAgICAgIHJlamVjdChlcnIpO1xuICAgICAgICAgICAgfSAgICAgICAgICAgIFxuICAgICAgICB9KVxuICAgICAgICAub24oJ2Vycm9yJywgcmVqZWN0KTtcbn0pO1xuXG4vKipcbiAqIEhhbmRsZSBldmVudCBLZXJuZWxSZW1vdmVkXG4gKiBcbiAqIEBwYXJhbSB7T2JqZWN0fSBvcHRpb25zIEV2ZW50IGhhbmRsZXIgb3B0aW9uc1xuICogQHBhcmFtIHtPYmplY3R9IGNvbmZpZyBMaWJyYXJ5IGNvbmZpZyAocHJvdmlkZWQgYnkgdGhlIHByb3h5IGJ1dCBjYW4gYmUgb3ZlcnJpZGRlbilcbiAqL1xuZXhwb3J0IGNvbnN0IGV2ZW50S2VybmVsUmVtb3ZlZCA9IChvcHRpb25zID0ge30sIGNvbmZpZyA9IHt9KSA9PiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG5cbiAgICBleHBlY3QuYWxsKGNvbmZpZywge1xuICAgICAgICAnd2ViMyc6IHtcbiAgICAgICAgICAgIHR5cGU6ICdvYmplY3QnLFxuICAgICAgICAgICAgY29kZTogV0VCM19SRVFVSVJFRFxuICAgICAgICB9LFxuICAgICAgICAnY29udHJhY3RzLlBhbmRvcmFNYXJrZXQuYWJpJzoge1xuICAgICAgICAgICAgdHlwZTogJ29iamVjdCcsXG4gICAgICAgICAgICBjb2RlOiBDT05UUkFDVF9SRVFVSVJFRCxcbiAgICAgICAgICAgIGFyZ3M6IFsnUGFuZG9yYU1hcmtldCddXG4gICAgICAgIH0sXG4gICAgICAgICdhZGRyZXNzZXMuUGFuZG9yYU1hcmtldCc6IHtcbiAgICAgICAgICAgIHR5cGU6ICdzdHJpbmcnLFxuICAgICAgICAgICAgY29kZTogQUREUkVTU19SRVFVSVJFRCxcbiAgICAgICAgICAgIGFyZ3M6IFsnUGFuZG9yYU1hcmtldCddXG4gICAgICAgIH1cbiAgICB9KTtcblxuICAgIGNvbnN0IG1hciA9IG5ldyBjb25maWcud2ViMy5ldGguQ29udHJhY3QoY29uZmlnLmNvbnRyYWN0cy5QYW5kb3JhTWFya2V0LmFiaSwgY29uZmlnLmFkZHJlc3Nlcy5QYW5kb3JhTWFya2V0KTtcbiAgICBtYXIuZXZlbnRzLktlcm5lbFJlbW92ZWQob3B0aW9ucylcbiAgICAgICAgLm9uKCdkYXRhJywgYXN5bmMgcmVzID0+IHtcblxuICAgICAgICAgICAgcmVzb2x2ZSh7XG4gICAgICAgICAgICAgICAgYWRkcmVzczogcmVzLnJldHVyblZhbHVlcy5rZXJuZWwsXG4gICAgICAgICAgICAgICAgc3RhdHVzOiAncmVtb3ZlZCcsXG4gICAgICAgICAgICAgICAgZXZlbnQ6ICdQYW5kb3JhTWFya2V0Lktlcm5lbFJlbW92ZWQnXG4gICAgICAgICAgICB9KTsgICAgICAgICAgICBcbiAgICAgICAgfSlcbiAgICAgICAgLm9uKCdlcnJvcicsIHJlamVjdCk7XG59KTtcbiJdfQ==