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
 * @param {Object} config Library config (provided by the proxy but can be overridden)
 */


exports.removeKernel = removeKernel;

const eventKernelAdded = (config = {}) => new Promise((resolve, reject) => {
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
  mar.events.KernelAdded().on('data', async res => {
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
 * @param {Object} config Library config (provided by the proxy but can be overridden)
 */


exports.eventKernelAdded = eventKernelAdded;

const eventKernelRemoved = (config = {}) => new Promise((resolve, reject) => {
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
  mar.events.KernelRemoved().on('data', async res => {
    resolve({
      address: res.returnValues.kernel,
      status: 'removed',
      event: 'PandoraMarket.KernelRemoved'
    });
  }).on('error', reject);
});

exports.eventKernelRemoved = eventKernelRemoved;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9rZXJuZWxzLmpzIl0sIm5hbWVzIjpbImZldGNoQ291bnQiLCJjb25maWciLCJleHBlY3QiLCJhbGwiLCJ0eXBlIiwiY29kZSIsIldFQjNfUkVRVUlSRUQiLCJDT05UUkFDVF9SRVFVSVJFRCIsImFyZ3MiLCJBRERSRVNTX1JFUVVJUkVEIiwibWFyIiwid2ViMyIsImV0aCIsIkNvbnRyYWN0IiwiY29udHJhY3RzIiwiUGFuZG9yYU1hcmtldCIsImFiaSIsImFkZHJlc3NlcyIsImNvdW50IiwibWV0aG9kcyIsImtlcm5lbHNDb3VudCIsImNhbGwiLCJOdW1iZXIiLCJwYXJzZUludCIsImZldGNoQWRkcmVzc0J5SWQiLCJpZCIsImtlcm5lbENvbnRyYWN0Iiwia2VybmVscyIsImZldGNoSXBmc0FkZHJlc3MiLCJhZGRyZXNzIiwia2VyIiwiS2VybmVsIiwiaXBmc0FkZHJlc3MiLCJ1dGlscyIsImhleFRvQXNjaWkiLCJmZXRjaERhdGFEaW0iLCJkYXRhRGltIiwiZmV0Y2hDdXJyZW50UHJpY2UiLCJjdXJyZW50UHJpY2UiLCJmZXRjaENvbXBsZXhpdHkiLCJjb21wbGV4aXR5IiwiZmV0Y2hLZXJuZWwiLCJmZXRjaEtlcm5lbEJ5SWQiLCJrZXJuZWwiLCJmZXRjaEFsbCIsInJlY29yZHMiLCJlcnJvciIsImkiLCJwdXNoIiwiZXJyIiwibWVzc2FnZSIsImRlcGxveSIsImtlcm5lbElwZnNIYXNoIiwicHVibGlzaGVyIiwiZGltZW5zaW9uIiwicHJpY2UiLCJ0b0hleCIsImdhcyIsIndlYjNIZWxwZXJzIiwiZXN0aW1hdGVHYXMiLCJieXRlY29kZSIsImtlcm5lbENvbnRyYWN0QWRkcmVzcyIsImRlcGxveUNvbnRyYWN0IiwiZnJvbSIsImFkZFRvTWFya2V0IiwicHVibGlzaGVyQWRkcmVzcyIsIlByb21pc2UiLCJyZXNvbHZlIiwicmVqZWN0IiwiV0VCM19NRVRBTUFTS19SRVFVSVJFRCIsIm1hcmtldCIsImFkZEtlcm5lbCIsInNlbmQiLCJvbiIsInJlY2VpcHQiLCJzdGF0dXMiLCJUUkFOU0FDVElPTl9VTlNVQ0NFU1NGVUwiLCJjb250cmFjdEFkZHJlc3MiLCJldmVudHMiLCJLZXJuZWxBZGRlZCIsInJldHVyblZhbHVlcyIsInJlbW92ZUtlcm5lbCIsImtlcm5lbEFkZHJlc3MiLCJldmVudEtlcm5lbEFkZGVkIiwicmVzIiwiZXZlbnQiLCJldmVudEtlcm5lbFJlbW92ZWQiLCJLZXJuZWxSZW1vdmVkIl0sIm1hcHBpbmdzIjoiQUFBQTs7Ozs7Ozs7QUFTQTs7Ozs7OztBQUVBOztBQUNBOztBQU9BOzs7Ozs7OztBQUVBOzs7Ozs7QUFNTyxNQUFNQSxhQUFhLE9BQU9DLFNBQVMsRUFBaEIsS0FBdUI7QUFFN0NDLFNBQU9DLEdBQVAsQ0FBV0YsTUFBWCxFQUFtQjtBQUNmLFlBQVE7QUFDSkcsWUFBTSxRQURGO0FBRUpDLFlBQU1DO0FBRkYsS0FETztBQUtmLG1DQUErQjtBQUMzQkYsWUFBTSxRQURxQjtBQUUzQkMsWUFBTUUseUJBRnFCO0FBRzNCQyxZQUFNLENBQUMsZUFBRDtBQUhxQixLQUxoQjtBQVVmLCtCQUEyQjtBQUN2QkosWUFBTSxRQURpQjtBQUV2QkMsWUFBTUksd0JBRmlCO0FBR3ZCRCxZQUFNLENBQUMsZUFBRDtBQUhpQjtBQVZaLEdBQW5CO0FBaUJBLFFBQU1FLE1BQU0sSUFBSVQsT0FBT1UsSUFBUCxDQUFZQyxHQUFaLENBQWdCQyxRQUFwQixDQUE2QlosT0FBT2EsU0FBUCxDQUFpQkMsYUFBakIsQ0FBK0JDLEdBQTVELEVBQWlFZixPQUFPZ0IsU0FBUCxDQUFpQkYsYUFBbEYsQ0FBWjtBQUNBLFFBQU1HLFFBQVEsTUFBTVIsSUFBSVMsT0FBSixDQUNmQyxZQURlLEdBRWZDLElBRmUsRUFBcEI7QUFJQSxTQUFPQyxPQUFPQyxRQUFQLENBQWdCTCxLQUFoQixFQUF1QixFQUF2QixDQUFQO0FBQ0gsQ0F6Qk07QUEyQlA7Ozs7Ozs7Ozs7O0FBT08sTUFBTU0sbUJBQW1CLE9BQU9DLEVBQVAsRUFBV3hCLFNBQVMsRUFBcEIsS0FBMkI7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LE1BQVYsS0FBcUI7QUFFaEZsRSxTQUFPQyxHQUFQLENBQVdGLE1BQVgsRUFBbUI7QUFDZixZQUFRO0FBQ0pHLFlBQU0sUUFERjtBQUVKQyxZQUFNQztBQUZGLEtBRE87QUFLZixtQ0FBK0I7QUFDM0JGLFlBQU0sUUFEcUI7QUFFM0JDLFlBQU1FLHlCQUZxQjtBQUczQkMsWUFBTSxDQUFDLGVBQUQ7QUFIcUIsS0FMaEI7QUFVZiwrQkFBMkI7QUFDdkJKLFlBQU0sUUFEaUI7QUFFdkJDLFlBQU1JLHdCQUZpQjtBQUd2QkQsWUFBTSxDQUFDLFFBQUQ7QUFIaUI7QUFWWixHQUFuQjtBQWlCQSxRQUFNRSxNQUFNLElBQUlULE9BQU9VLElBQVAsQ0FBWUMsR0FBWixDQUFnQkMsUUFBcEIsQ0FBNkJaLE9BQU9hLFNBQVAsQ0FBaUJDLGFBQWpCLENBQStCQyxHQUE1RCxFQUFpRWYsT0FBT2dCLFNBQVAsQ0FBaUJGLGFBQWxGLENBQVo7QUFDQUwsTUFBSW9FLE1BQUosQ0FBV1MsYUFBWCxHQUNLZCxFQURMLENBQ1EsTUFEUixFQUNnQixNQUFNVyxHQUFOLElBQWE7QUFFckJqQixZQUFRO0FBQ0p0QyxlQUFTdUQsSUFBSUosWUFBSixDQUFpQnJDLE1BRHRCO0FBRUpnQyxjQUFRLFNBRko7QUFHSlUsYUFBTztBQUhILEtBQVI7QUFLSCxHQVJMLEVBU0taLEVBVEwsQ0FTUSxPQVRSLEVBU2lCTCxNQVRqQjtBQVVILENBOUJrRCxDQUE1QyIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogS2VybmVscyByZWxhdGVkIG1ldGhvZHNcbiAqIFRoaXMgZmlsZSBpdCBpcyBhIHBhcnQgb2YgdGhlIFBhbmRvcmEgUHlycmhhIEphdmFzY3JpcHQgbGlicmFyeVxuICogXG4gKiBAZmlsZSBrZXJuZWxzLmpzXG4gKiBAYXV0aG9yIEtvc3RpYW50eW4gU215cm5vdiA8a29zdHlzaEBnbWFpbC5jb20+XG4gKiBAZGF0ZSAyMDE4XG4gKi9cblxuJ3VzZSBzdHJpY3QnO1xuXG5pbXBvcnQgKiBhcyBleHBlY3QgZnJvbSAnLi9oZWxwZXJzL2V4cGVjdCc7XG5pbXBvcnQgcGpzRXJyb3IsIHtcbiAgICBDT05UUkFDVF9SRVFVSVJFRCxcbiAgICBBRERSRVNTX1JFUVVJUkVELFxuICAgIFdFQjNfUkVRVUlSRUQsXG4gICAgV0VCM19NRVRBTUFTS19SRVFVSVJFRCxcbiAgICBUUkFOU0FDVElPTl9VTlNVQ0NFU1NGVUxcbn0gZnJvbSAnLi9oZWxwZXJzL2Vycm9ycyc7XG5pbXBvcnQgKiBhcyB3ZWIzSGVscGVycyBmcm9tICcuL2hlbHBlcnMvd2ViMyc7XG5cbi8qKlxuICogR2V0IGtlcm5lbHMgY291bnQgZnJvbSBQYW5kb3JhTWFya2V0IGNvbnRyYWN0XG4gKiBcbiAqIEBwYXJhbSB7T2JqZWN0fSBjb25maWcgTGlicmFyeSBjb25maWcgKHByb3ZpZGVkIGJ5IHRoZSBwcm94eSBidXQgY2FuIGJlIG92ZXJyaWRkZW4pXG4gKiBAcmV0dXJucyB7UHJvbWlzZX0gQSBQcm9taXNlIG9iamVjdCByZXByZXNlbnRzIHRoZSB7bnVtYmVyfSBcbiAqL1xuZXhwb3J0IGNvbnN0IGZldGNoQ291bnQgPSBhc3luYyAoY29uZmlnID0ge30pID0+IHtcblxuICAgIGV4cGVjdC5hbGwoY29uZmlnLCB7XG4gICAgICAgICd3ZWIzJzoge1xuICAgICAgICAgICAgdHlwZTogJ29iamVjdCcsXG4gICAgICAgICAgICBjb2RlOiBXRUIzX1JFUVVJUkVEXG4gICAgICAgIH0sXG4gICAgICAgICdjb250cmFjdHMuUGFuZG9yYU1hcmtldC5hYmknOiB7XG4gICAgICAgICAgICB0eXBlOiAnb2JqZWN0JyxcbiAgICAgICAgICAgIGNvZGU6IENPTlRSQUNUX1JFUVVJUkVELFxuICAgICAgICAgICAgYXJnczogWydQYW5kb3JhTWFya2V0J11cbiAgICAgICAgfSxcbiAgICAgICAgJ2FkZHJlc3Nlcy5QYW5kb3JhTWFya2V0Jzoge1xuICAgICAgICAgICAgdHlwZTogJ3N0cmluZycsXG4gICAgICAgICAgICBjb2RlOiBBRERSRVNTX1JFUVVJUkVELFxuICAgICAgICAgICAgYXJnczogWydQYW5kb3JhTWFya2V0J11cbiAgICAgICAgfVxuICAgIH0pO1xuXG4gICAgY29uc3QgbWFyID0gbmV3IGNvbmZpZy53ZWIzLmV0aC5Db250cmFjdChjb25maWcuY29udHJhY3RzLlBhbmRvcmFNYXJrZXQuYWJpLCBjb25maWcuYWRkcmVzc2VzLlBhbmRvcmFNYXJrZXQpO1xuICAgIGNvbnN0IGNvdW50ID0gYXdhaXQgbWFyLm1ldGhvZHNcbiAgICAgICAgLmtlcm5lbHNDb3VudCgpXG4gICAgICAgIC5jYWxsKCk7XG5cbiAgICByZXR1cm4gTnVtYmVyLnBhcnNlSW50KGNvdW50LCAxMCk7XG59O1xuXG4vKipcbiAqIEdldCBLZXJuZWwgYWRkcmVzcyBieSBrZXJuZWwgaWRcbiAqIFxuICogQHBhcmFtIHtudW1iZXJ9IGlkXG4gKiBAcGFyYW0ge09iamVjdH0gY29uZmlnIExpYnJhcnkgY29uZmlnIChwcm92aWRlZCBieSB0aGUgcHJveHkgYnV0IGNhbiBiZSBvdmVycmlkZGVuKVxuICogQHJldHVybnMge1Byb21pc2V9IEEgUHJvbWlzZSBvYmplY3QgcmVwcmVzZW50cyB0aGUge3N0cmluZ31cbiAqL1xuZXhwb3J0IGNvbnN0IGZldGNoQWRkcmVzc0J5SWQgPSBhc3luYyAoaWQsIGNvbmZpZyA9IHt9KSA9PiB7XG5cbiAgICBleHBlY3QuYWxsKGNvbmZpZywge1xuICAgICAgICAnd2ViMyc6IHtcbiAgICAgICAgICAgIHR5cGU6ICdvYmplY3QnLFxuICAgICAgICAgICAgY29kZTogV0VCM19SRVFVSVJFRFxuICAgICAgICB9LFxuICAgICAgICAnY29udHJhY3RzLlBhbmRvcmFNYXJrZXQuYWJpJzoge1xuICAgICAgICAgICAgdHlwZTogJ29iamVjdCcsXG4gICAgICAgICAgICBjb2RlOiBDT05UUkFDVF9SRVFVSVJFRCxcbiAgICAgICAgICAgIGFyZ3M6IFsnUGFuZG9yYU1hcmtldCddXG4gICAgICAgIH0sXG4gICAgICAgICdhZGRyZXNzZXMuUGFuZG9yYU1hcmtldCc6IHtcbiAgICAgICAgICAgIHR5cGU6ICdzdHJpbmcnLFxuICAgICAgICAgICAgY29kZTogQUREUkVTU19SRVFVSVJFRCxcbiAgICAgICAgICAgIGFyZ3M6IFsnUGFuZG9yYU1hcmtldCddXG4gICAgICAgIH1cbiAgICB9KTtcblxuICAgIGNvbnN0IG1hciA9IG5ldyBjb25maWcud2ViMy5ldGguQ29udHJhY3QoY29uZmlnLmNvbnRyYWN0cy5QYW5kb3JhTWFya2V0LmFiaSwgY29uZmlnLmFkZHJlc3Nlcy5QYW5kb3JhTWFya2V0KTtcbiAgICBjb25zdCBrZXJuZWxDb250cmFjdCA9IGF3YWl0IG1hci5tZXRob2RzXG4gICAgICAgIC5rZXJuZWxzKGlkKVxuICAgICAgICAuY2FsbCgpO1xuXG4gICAgcmV0dXJuIGtlcm5lbENvbnRyYWN0O1xufTtcblxuLyoqXG4gKiBHZXQgSVBGUyBhZGRyZXNzIGZyb20gS2VybmVsIGNvbnRyYWN0IGJ5IHRoZSBrZXJuZWwgYWRkcmVzc1xuICogXG4gKiBAcGFyYW0ge3N0cmluZ30gYWRkcmVzc1xuICogQHBhcmFtIHtPYmplY3R9IGNvbmZpZyBMaWJyYXJ5IGNvbmZpZyAocHJvdmlkZWQgYnkgdGhlIHByb3h5IGJ1dCBjYW4gYmUgb3ZlcnJpZGRlbilcbiAqIEByZXR1cm5zIHtQcm9taXNlfSBBIFByb21pc2Ugb2JqZWN0IHJlcHJlc2VudHMgdGhlIHtzdHJpbmd9XG4gKi9cbmV4cG9ydCBjb25zdCBmZXRjaElwZnNBZGRyZXNzID0gYXN5bmMgKGFkZHJlc3MgPSAnJywgY29uZmlnID0ge30pID0+IHtcblxuICAgIGV4cGVjdC5hbGwoY29uZmlnLCB7XG4gICAgICAgICd3ZWIzJzoge1xuICAgICAgICAgICAgdHlwZTogJ29iamVjdCcsXG4gICAgICAgICAgICBjb2RlOiBXRUIzX1JFUVVJUkVEXG4gICAgICAgIH0sXG4gICAgICAgICdjb250cmFjdHMuS2VybmVsLmFiaSc6IHtcbiAgICAgICAgICAgIHR5cGU6ICdvYmplY3QnLFxuICAgICAgICAgICAgY29kZTogQ09OVFJBQ1RfUkVRVUlSRUQsXG4gICAgICAgICAgICBhcmdzOiBbJ0tlcm5lbCddXG4gICAgICAgIH1cbiAgICB9KTtcblxuICAgIGNvbnN0IGtlciA9IG5ldyBjb25maWcud2ViMy5ldGguQ29udHJhY3QoY29uZmlnLmNvbnRyYWN0cy5LZXJuZWwuYWJpLCBhZGRyZXNzKTtcbiAgICBjb25zdCBpcGZzQWRkcmVzcyA9IGF3YWl0IGtlci5tZXRob2RzXG4gICAgICAgIC5pcGZzQWRkcmVzcygpXG4gICAgICAgIC5jYWxsKCk7XG5cbiAgICByZXR1cm4gY29uZmlnLndlYjMudXRpbHMuaGV4VG9Bc2NpaShpcGZzQWRkcmVzcyk7XG59O1xuXG4vKipcbiAqIEdldCBkYXRhIGRpbSBmcm9tIEtlcm5lbCBjb250cmFjdCBieSB0aGUga2VybmVsIGFkZHJlc3NcbiAqIFxuICogQHBhcmFtIHtzdHJpbmd9IGFkZHJlc3NcbiAqIEBwYXJhbSB7T2JqZWN0fSBjb25maWcgTGlicmFyeSBjb25maWcgKHByb3ZpZGVkIGJ5IHRoZSBwcm94eSBidXQgY2FuIGJlIG92ZXJyaWRkZW4pXG4gKiBAcmV0dXJucyB7UHJvbWlzZX0gQSBQcm9taXNlIG9iamVjdCByZXByZXNlbnRzIHRoZSB7bnVtYmVyfVxuICovXG5leHBvcnQgY29uc3QgZmV0Y2hEYXRhRGltID0gYXN5bmMgKGFkZHJlc3MgPSAnJywgY29uZmlnID0ge30pID0+IHtcblxuICAgIGV4cGVjdC5hbGwoY29uZmlnLCB7XG4gICAgICAgICd3ZWIzJzoge1xuICAgICAgICAgICAgdHlwZTogJ29iamVjdCcsXG4gICAgICAgICAgICBjb2RlOiBXRUIzX1JFUVVJUkVEXG4gICAgICAgIH0sXG4gICAgICAgICdjb250cmFjdHMuS2VybmVsLmFiaSc6IHtcbiAgICAgICAgICAgIHR5cGU6ICdvYmplY3QnLFxuICAgICAgICAgICAgY29kZTogQ09OVFJBQ1RfUkVRVUlSRUQsXG4gICAgICAgICAgICBhcmdzOiBbJ0tlcm5lbCddXG4gICAgICAgIH1cbiAgICB9KTtcblxuICAgIGNvbnN0IGtlciA9IG5ldyBjb25maWcud2ViMy5ldGguQ29udHJhY3QoY29uZmlnLmNvbnRyYWN0cy5LZXJuZWwuYWJpLCBhZGRyZXNzKTtcbiAgICBjb25zdCBkYXRhRGltID0gYXdhaXQga2VyLm1ldGhvZHNcbiAgICAgICAgLmRhdGFEaW0oKVxuICAgICAgICAuY2FsbCgpO1xuXG4gICAgcmV0dXJuIE51bWJlci5wYXJzZUludChkYXRhRGltLCAxMCk7XG59O1xuXG4vKipcbiAqIEdldCBjdXJyZW50IHByaWNlIGZyb20gS2VybmVsIGNvbnRyYWN0IGJ5IHRoZSBrZXJuZWwgYWRkcmVzc1xuICogXG4gKiBAcGFyYW0ge3N0cmluZ30gYWRkcmVzc1xuICogQHBhcmFtIHtPYmplY3R9IGNvbmZpZyBMaWJyYXJ5IGNvbmZpZyAocHJvdmlkZWQgYnkgdGhlIHByb3h5IGJ1dCBjYW4gYmUgb3ZlcnJpZGRlbilcbiAqIEByZXR1cm5zIHtQcm9taXNlfSBBIFByb21pc2Ugb2JqZWN0IHJlcHJlc2VudHMgdGhlIHtudW1iZXJ9XG4gKi9cbmV4cG9ydCBjb25zdCBmZXRjaEN1cnJlbnRQcmljZSA9IGFzeW5jIChhZGRyZXNzID0gJycsIGNvbmZpZyA9IHt9KSA9PiB7XG5cbiAgICBleHBlY3QuYWxsKGNvbmZpZywge1xuICAgICAgICAnd2ViMyc6IHtcbiAgICAgICAgICAgIHR5cGU6ICdvYmplY3QnLFxuICAgICAgICAgICAgY29kZTogV0VCM19SRVFVSVJFRFxuICAgICAgICB9LFxuICAgICAgICAnY29udHJhY3RzLktlcm5lbC5hYmknOiB7XG4gICAgICAgICAgICB0eXBlOiAnb2JqZWN0JyxcbiAgICAgICAgICAgIGNvZGU6IENPTlRSQUNUX1JFUVVJUkVELFxuICAgICAgICAgICAgYXJnczogWydLZXJuZWwnXVxuICAgICAgICB9XG4gICAgfSk7XG5cbiAgICBjb25zdCBrZXIgPSBuZXcgY29uZmlnLndlYjMuZXRoLkNvbnRyYWN0KGNvbmZpZy5jb250cmFjdHMuS2VybmVsLmFiaSwgYWRkcmVzcyk7XG4gICAgY29uc3QgY3VycmVudFByaWNlID0gYXdhaXQga2VyLm1ldGhvZHNcbiAgICAgICAgLmN1cnJlbnRQcmljZSgpXG4gICAgICAgIC5jYWxsKCk7XG5cbiAgICByZXR1cm4gTnVtYmVyLnBhcnNlSW50KGN1cnJlbnRQcmljZSwgMTApO1xufTtcblxuLyoqXG4gKiBHZXQgY29tcGxleGl0eSBmcm9tIEtlcm5lbCBjb250cmFjdCBieSB0aGUga2VybmVsIGFkZHJlc3NcbiAqIFxuICogQHBhcmFtIHtzdHJpbmd9IGFkZHJlc3NcbiAqIEBwYXJhbSB7T2JqZWN0fSBjb25maWcgTGlicmFyeSBjb25maWcgKHByb3ZpZGVkIGJ5IHRoZSBwcm94eSBidXQgY2FuIGJlIG92ZXJyaWRkZW4pXG4gKiBAcmV0dXJucyB7UHJvbWlzZX0gQSBQcm9taXNlIG9iamVjdCByZXByZXNlbnRzIHRoZSB7bnVtYmVyfVxuICovXG5leHBvcnQgY29uc3QgZmV0Y2hDb21wbGV4aXR5ID0gYXN5bmMgKGFkZHJlc3MgPSAnJywgY29uZmlnID0ge30pID0+IHtcblxuICAgIGV4cGVjdC5hbGwoY29uZmlnLCB7XG4gICAgICAgICd3ZWIzJzoge1xuICAgICAgICAgICAgdHlwZTogJ29iamVjdCcsXG4gICAgICAgICAgICBjb2RlOiBXRUIzX1JFUVVJUkVEXG4gICAgICAgIH0sXG4gICAgICAgICdjb250cmFjdHMuS2VybmVsLmFiaSc6IHtcbiAgICAgICAgICAgIHR5cGU6ICdvYmplY3QnLFxuICAgICAgICAgICAgY29kZTogQ09OVFJBQ1RfUkVRVUlSRUQsXG4gICAgICAgICAgICBhcmdzOiBbJ0tlcm5lbCddXG4gICAgICAgIH1cbiAgICB9KTtcblxuICAgIGNvbnN0IGtlciA9IG5ldyBjb25maWcud2ViMy5ldGguQ29udHJhY3QoY29uZmlnLmNvbnRyYWN0cy5LZXJuZWwuYWJpLCBhZGRyZXNzKTtcbiAgICBjb25zdCBjb21wbGV4aXR5ID0gYXdhaXQga2VyLm1ldGhvZHNcbiAgICAgICAgLmNvbXBsZXhpdHkoKVxuICAgICAgICAuY2FsbCgpO1xuXG4gICAgcmV0dXJuIE51bWJlci5wYXJzZUludChjb21wbGV4aXR5LCAxMCk7XG59O1xuXG4vKipcbiAqIEdldCBLZXJuZWwgYnkgdGhlIGtlcm5lbCBhZGRyZXNzXG4gKiBcbiAqIEBwYXJhbSB7c3RyaW5nfSBhZGRyZXNzXG4gKiBAcGFyYW0ge09iamVjdH0gY29uZmlnIExpYnJhcnkgY29uZmlnIChwcm92aWRlZCBieSB0aGUgcHJveHkgYnV0IGNhbiBiZSBvdmVycmlkZGVuKVxuICogQHJldHVybnMge1Byb21pc2V9IFByb21pc2Ugb2JqZWN0IHJlcHJlc2VudHMgdGhlIHtPYmplY3RbXX1cbiAqL1xuZXhwb3J0IGNvbnN0IGZldGNoS2VybmVsID0gYXN5bmMgKGFkZHJlc3MgPSAnJywgY29uZmlnID0ge30pID0+IHtcblxuICAgIGNvbnN0IGlwZnNBZGRyZXNzID0gYXdhaXQgZmV0Y2hJcGZzQWRkcmVzcyhhZGRyZXNzLCBjb25maWcpO1xuICAgIGNvbnN0IGRhdGFEaW0gPSBhd2FpdCBmZXRjaERhdGFEaW0oYWRkcmVzcywgY29uZmlnKTtcbiAgICBjb25zdCBjdXJyZW50UHJpY2UgPSBhd2FpdCBmZXRjaEN1cnJlbnRQcmljZShhZGRyZXNzLCBjb25maWcpO1xuICAgIGNvbnN0IGNvbXBsZXhpdHkgPSBhd2FpdCBmZXRjaENvbXBsZXhpdHkoYWRkcmVzcywgY29uZmlnKTtcblxuICAgIHJldHVybiB7XG4gICAgICAgIGFkZHJlc3MsXG4gICAgICAgIGlwZnNBZGRyZXNzLFxuICAgICAgICBkYXRhRGltLFxuICAgICAgICBjdXJyZW50UHJpY2UsXG4gICAgICAgIGNvbXBsZXhpdHlcbiAgICB9O1xufTtcblxuLyoqXG4gKiBHZXQga2VybmVsIGJ5IGlkXG4gKiBcbiAqIEBwYXJhbSB7aW50ZWdlcn0gaWQgXG4gKiBAcGFyYW0ge09iamVjdH0gY29uZmlnIExpYnJhcnkgY29uZmlnIChwcm92aWRlZCBieSB0aGUgcHJveHkgYnV0IGNhbiBiZSBvdmVycmlkZGVuKVxuICogQHJldHVybnMge1Byb21pc2V9IEEgUHJvbWlzZSBvYmplY3QgcmVwcmVzZW50cyB0aGUge09iamVjdH1cbiAqL1xuZXhwb3J0IGNvbnN0IGZldGNoS2VybmVsQnlJZCA9IGFzeW5jIChpZCwgY29uZmlnID0ge30pID0+IHtcbiAgICBcbiAgICBjb25zdCBhZGRyZXNzID0gYXdhaXQgZmV0Y2hBZGRyZXNzQnlJZChpZCwgY29uZmlnKTtcbiAgICBjb25zdCBrZXJuZWwgPSBhd2FpdCBmZXRjaEtlcm5lbChhZGRyZXNzLCBjb25maWcpO1xuXG4gICAgcmV0dXJuIGtlcm5lbDtcbn07XG5cbi8qKlxuICogR2V0IGFsbCBrZXJuZWxzXG4gKiBcbiAqIEBwYXJhbSB7T2JqZWN0fSBjb25maWcgTGlicmFyeSBjb25maWcgKHByb3ZpZGVkIGJ5IHRoZSBwcm94eSBidXQgY2FuIGJlIG92ZXJyaWRkZW4pXG4gKiBAcmV0dXJucyB7UHJvbWlzZX0gUHJvbWlzZSBvYmplY3QgcmVwcmVzZW50cyB0aGUge09iamVjdFtdfVxuICovXG5leHBvcnQgY29uc3QgZmV0Y2hBbGwgPSBhc3luYyAoY29uZmlnID0ge30pID0+IHtcblxuICAgIGxldCByZWNvcmRzID0gW107XG4gICAgbGV0IGVycm9yID0gW107XG5cbiAgICB0cnkge1xuXG4gICAgICAgIGNvbnN0IGNvdW50ID0gYXdhaXQgZmV0Y2hDb3VudChjb25maWcpO1xuXG4gICAgICAgIGZvciAobGV0IGk9MDsgaSA8IGNvdW50OyBpKyspIHtcbiAgICAgICAgICAgIFxuICAgICAgICAgICAgdHJ5IHtcblxuICAgICAgICAgICAgICAgIGNvbnN0IGtlcm5lbCA9IGF3YWl0IGZldGNoS2VybmVsQnlJZChpLCBjb25maWcpO1xuXG4gICAgICAgICAgICAgICAgcmVjb3Jkcy5wdXNoKHtcbiAgICAgICAgICAgICAgICAgICAgaWQ6IGksXG4gICAgICAgICAgICAgICAgICAgIC4uLmtlcm5lbFxuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfSBjYXRjaChlcnIpIHtcbiAgICAgICAgICAgICAgICBlcnJvci5wdXNoKHtcbiAgICAgICAgICAgICAgICAgICAgaWQ6IGksXG4gICAgICAgICAgICAgICAgICAgIG1lc3NhZ2U6IGVyci5tZXNzYWdlXG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9ICAgICAgICBcbiAgICAgICAgfVxuICAgIH0gY2F0Y2goZXJyKSB7XG4gICAgICAgIGVycm9yLnB1c2goe1xuICAgICAgICAgICAgZXJyb3I6IGVyci5tZXNzYWdlXG4gICAgICAgIH0pO1xuICAgIH0gICBcblxuICAgIHJldHVybiB7XG4gICAgICAgIHJlY29yZHMsXG4gICAgICAgIGVycm9yXG4gICAgfTtcbn07XG5cbi8qKlxuICogRGVwbG95IEtlcm5lbCBjb250cmFjdCB0byB0aGUgbmV0d29ya1xuICogXG4gKiBAcGFyYW0ge3N0cmluZ30ga2VybmVsSXBmc0hhc2ggXG4gKiBAcGFyYW0ge09iamVjdH0gb3B0aW9ucyB7IHB1Ymxpc2hlciwgZGltZW5zaW9uLCBjb21wbGV4aXR5LCBwcmljZSB9IFxuICogQHBhcmFtIHtPYmplY3R9IGNvbmZpZyBMaWJyYXJ5IGNvbmZpZyAocHJvdmlkZWQgYnkgdGhlIHByb3h5IGJ1dCBjYW4gYmUgb3ZlcnJpZGRlbilcbiAqIEByZXR1cm5zIHtQcm9taXNlfSBQcm9taXNlIG9iamVjdCByZXNvbHZlZCB0byBjb250cmFjdCBhZGRyZXNzXG4gKi9cbmV4cG9ydCBjb25zdCBkZXBsb3kgPSBhc3luYyAoa2VybmVsSXBmc0hhc2gsIHsgcHVibGlzaGVyLCBkaW1lbnNpb24sIGNvbXBsZXhpdHksIHByaWNlIH0sIGNvbmZpZyA9IHt9KSA9PiB7XG5cbiAgICBleHBlY3QuYWxsKGNvbmZpZywge1xuICAgICAgICAnd2ViMyc6IHtcbiAgICAgICAgICAgIHR5cGU6ICdvYmplY3QnLFxuICAgICAgICAgICAgY29kZTogV0VCM19SRVFVSVJFRFxuICAgICAgICB9LFxuICAgICAgICAnY29udHJhY3RzLktlcm5lbC5hYmknOiB7XG4gICAgICAgICAgICB0eXBlOiAnb2JqZWN0JyxcbiAgICAgICAgICAgIGNvZGU6IENPTlRSQUNUX1JFUVVJUkVELFxuICAgICAgICAgICAgYXJnczogWydLZXJuZWwnXVxuICAgICAgICB9XG4gICAgfSk7XG5cbiAgICBjb25zdCBhcmdzID0gW2NvbmZpZy53ZWIzLnV0aWxzLnRvSGV4KGtlcm5lbElwZnNIYXNoKSwgZGltZW5zaW9uLCBjb21wbGV4aXR5LCBwcmljZV07XG4gICAgICAgIFxuICAgIC8vIEVzdGltYXRlIHJlcXVpcmVkIGFtb3VudCBvZiBnYXNcbiAgICBjb25zdCBnYXMgPSBhd2FpdCB3ZWIzSGVscGVycy5lc3RpbWF0ZUdhcyhjb25maWcuY29udHJhY3RzLktlcm5lbC5ieXRlY29kZSwgYXJncywgY29uZmlnKTtcblxuICAgIC8vIENyZWF0ZSBhbmQgZGVwbG95IGtlcm5lbCBjb250cmFjdFxuICAgIGNvbnN0IGtlcm5lbENvbnRyYWN0QWRkcmVzcyA9IGF3YWl0IHdlYjNIZWxwZXJzLmRlcGxveUNvbnRyYWN0KGNvbmZpZy5jb250cmFjdHMuS2VybmVsLCB7XG4gICAgICAgIGFyZ3MsXG4gICAgICAgIGZyb206IHB1Ymxpc2hlcixcbiAgICAgICAgZ2FzOiBOdW1iZXIucGFyc2VJbnQoZ2FzICogMS41LCAxMClcbiAgICB9LCBjb25maWcpO1xuXG4gICAgcmV0dXJuIGtlcm5lbENvbnRyYWN0QWRkcmVzcztcbn07XG5cbi8qKlxuICogQWRkIGtlcm5lbCB0byBtYXJrZXRcbiAqIFxuICogQHBhcmFtIHtTdHJpbmd9IGtlcm5lbENvbnRyYWN0QWRkcmVzcyBcbiAqIEBwYXJhbSB7U3RyaW5nfSBwdWJsaXNoZXJBZGRyZXNzIFxuICogQHBhcmFtIHtPYmplY3R9IGNvbmZpZyBMaWJyYXJ5IGNvbmZpZyAocHJvdmlkZWQgYnkgdGhlIHByb3h5IGJ1dCBjYW4gYmUgb3ZlcnJpZGRlbilcbiAqIEByZXR1cm5zIHtQcm9taXNlfSBQcm9taXNlIG9iamVjdCByZXNvbHZlZCB0byB7c3RyaW5nfSBjb250cmFjdEFkZHJlc3MgLy8gY2FuIGJlIG51bGwgaWYgdXNlZCBnYW5hY2hlLWNsaSBlbnZpcm9ubWVudFxuICovXG5leHBvcnQgY29uc3QgYWRkVG9NYXJrZXQgPSAoa2VybmVsQ29udHJhY3RBZGRyZXNzLCBwdWJsaXNoZXJBZGRyZXNzLCBjb25maWcgPSB7fSkgPT4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuXG4gICAgZXhwZWN0LmFsbChjb25maWcsIHtcbiAgICAgICAgJ3dlYjMnOiB7XG4gICAgICAgICAgICB0eXBlOiAnb2JqZWN0JyxcbiAgICAgICAgICAgIGNvZGU6IFdFQjNfUkVRVUlSRURcbiAgICAgICAgfSxcbiAgICAgICAgJ2NvbnRyYWN0cy5QYW5kb3JhTWFya2V0LmFiaSc6IHtcbiAgICAgICAgICAgIHR5cGU6ICdvYmplY3QnLFxuICAgICAgICAgICAgY29kZTogQ09OVFJBQ1RfUkVRVUlSRUQsXG4gICAgICAgICAgICBhcmdzOiBbJ1BhbmRvcmFNYXJrZXQnXVxuICAgICAgICB9LFxuICAgICAgICAnYWRkcmVzc2VzLlBhbmRvcmFNYXJrZXQnOiB7XG4gICAgICAgICAgICB0eXBlOiAnc3RyaW5nJyxcbiAgICAgICAgICAgIGNvZGU6IEFERFJFU1NfUkVRVUlSRUQsXG4gICAgICAgICAgICBhcmdzOiBbJ0tlcm5lbCddXG4gICAgICAgIH0sXG4gICAgICAgICd3ZWIzLmN1cnJlbnRQcm92aWRlci5pc01ldGFNYXNrJzoge1xuICAgICAgICAgICAgdHlwZTogJ2Jvb2xlYW4nLFxuICAgICAgICAgICAgY29kZTogV0VCM19NRVRBTUFTS19SRVFVSVJFRFxuICAgICAgICB9XG4gICAgfSk7XG5cbiAgICBjb25zdCBtYXJrZXQgPSBuZXcgY29uZmlnLndlYjMuZXRoLkNvbnRyYWN0KGNvbmZpZy5jb250cmFjdHMuUGFuZG9yYU1hcmtldC5hYmksIGNvbmZpZy5hZGRyZXNzZXMuUGFuZG9yYU1hcmtldCk7XG4gICAgbWFya2V0Lm1ldGhvZHNcbiAgICAgICAgLmFkZEtlcm5lbChrZXJuZWxDb250cmFjdEFkZHJlc3MpXG4gICAgICAgIC5zZW5kKHtcbiAgICAgICAgICAgIGZyb206IHB1Ymxpc2hlckFkZHJlc3NcbiAgICAgICAgfSlcbiAgICAgICAgLm9uKCdlcnJvcicsIHJlamVjdClcbiAgICAgICAgLm9uKCdyZWNlaXB0JywgcmVjZWlwdCA9PiB7XG5cbiAgICAgICAgICAgIGlmIChOdW1iZXIocmVjZWlwdC5zdGF0dXMpID09PSAwKSB7XG5cbiAgICAgICAgICAgICAgICByZXR1cm4gcmVqZWN0KHBqc0Vycm9yKFRSQU5TQUNUSU9OX1VOU1VDQ0VTU0ZVTCkpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICByZXNvbHZlKHJlY2VpcHQuY29udHJhY3RBZGRyZXNzIHx8IHJlY2VpcHQuZXZlbnRzLktlcm5lbEFkZGVkLnJldHVyblZhbHVlcy5rZXJuZWwpO1xuICAgICAgICB9KTtcbiAgICAvLyBAbm90ZSBJbiBjYXNlIG9mIGdhbmFjaGUtY2xpIGJsb2NrY2hhaW4gXCJjb250cmFjdEFkZHJlc3NcIiBhbHdheXMgd2lsbCBiZSBlcXVhbCB0byBudWxsXG59KTtcblxuLyoqXG4gKiBSZW1vdmUga2VybmVsIGZyb20gUGFuZG9yYU1hcmtldFxuICogXG4gKiBAcGFyYW0ge1N0cmluZ30ga2VybmVsQWRkcmVzc1xuICogQHBhcmFtIHtTdHJpbmd9IHB1Ymxpc2hlckFkZHJlc3MgXG4gKiBAcGFyYW0ge09iamVjdH0gY29uZmlnIExpYnJhcnkgY29uZmlnIChwcm92aWRlZCBieSB0aGUgcHJveHkgYnV0IGNhbiBiZSBvdmVycmlkZGVuKSBcbiAqL1xuZXhwb3J0IGNvbnN0IHJlbW92ZUtlcm5lbCA9IChrZXJuZWxBZGRyZXNzLCBwdWJsaXNoZXJBZGRyZXNzLCBjb25maWcgPSB7fSkgPT4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuXG4gICAgZXhwZWN0LmFsbChjb25maWcsIHtcbiAgICAgICAgJ3dlYjMnOiB7XG4gICAgICAgICAgICB0eXBlOiAnb2JqZWN0JyxcbiAgICAgICAgICAgIGNvZGU6IFdFQjNfUkVRVUlSRURcbiAgICAgICAgfSxcbiAgICAgICAgJ2NvbnRyYWN0cy5QYW5kb3JhTWFya2V0LmFiaSc6IHtcbiAgICAgICAgICAgIHR5cGU6ICdvYmplY3QnLFxuICAgICAgICAgICAgY29kZTogQ09OVFJBQ1RfUkVRVUlSRUQsXG4gICAgICAgICAgICBhcmdzOiBbJ1BhbmRvcmFNYXJrZXQnXVxuICAgICAgICB9LFxuICAgICAgICAnYWRkcmVzc2VzLlBhbmRvcmFNYXJrZXQnOiB7XG4gICAgICAgICAgICB0eXBlOiAnc3RyaW5nJyxcbiAgICAgICAgICAgIGNvZGU6IEFERFJFU1NfUkVRVUlSRUQsXG4gICAgICAgICAgICBhcmdzOiBbJ0tlcm5lbCddXG4gICAgICAgIH1cbiAgICB9KTtcblxuICAgIGNvbnN0IG1hcmtldCA9IG5ldyBjb25maWcud2ViMy5ldGguQ29udHJhY3QoY29uZmlnLmNvbnRyYWN0cy5QYW5kb3JhTWFya2V0LmFiaSwgY29uZmlnLmFkZHJlc3Nlcy5QYW5kb3JhTWFya2V0KTtcbiAgICBtYXJrZXQubWV0aG9kc1xuICAgICAgICAucmVtb3ZlS2VybmVsKGtlcm5lbEFkZHJlc3MpXG4gICAgICAgIC5zZW5kKHtcbiAgICAgICAgICAgIGZyb206IHB1Ymxpc2hlckFkZHJlc3NcbiAgICAgICAgfSlcbiAgICAgICAgLm9uKCdlcnJvcicsIHJlamVjdClcbiAgICAgICAgLm9uKCdyZWNlaXB0JywgcmVjZWlwdCA9PiB7XG5cbiAgICAgICAgICAgIGlmIChOdW1iZXIocmVjZWlwdC5zdGF0dXMpID09PSAwKSB7XG5cbiAgICAgICAgICAgICAgICByZXR1cm4gcmVqZWN0KHBqc0Vycm9yKFRSQU5TQUNUSU9OX1VOU1VDQ0VTU0ZVTCkpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICByZXNvbHZlKHJlY2VpcHQuY29udHJhY3RBZGRyZXNzKTtcbiAgICAgICAgfSk7XG59KTtcblxuLyoqXG4gKiBIYW5kbGUgZXZlbnQgS2VybmVsQWRkZWRcbiAqIFxuICogQHBhcmFtIHtPYmplY3R9IGNvbmZpZyBMaWJyYXJ5IGNvbmZpZyAocHJvdmlkZWQgYnkgdGhlIHByb3h5IGJ1dCBjYW4gYmUgb3ZlcnJpZGRlbilcbiAqL1xuZXhwb3J0IGNvbnN0IGV2ZW50S2VybmVsQWRkZWQgPSAoY29uZmlnID0ge30pID0+IG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcblxuICAgIGV4cGVjdC5hbGwoY29uZmlnLCB7XG4gICAgICAgICd3ZWIzJzoge1xuICAgICAgICAgICAgdHlwZTogJ29iamVjdCcsXG4gICAgICAgICAgICBjb2RlOiBXRUIzX1JFUVVJUkVEXG4gICAgICAgIH0sXG4gICAgICAgICdjb250cmFjdHMuUGFuZG9yYU1hcmtldC5hYmknOiB7XG4gICAgICAgICAgICB0eXBlOiAnb2JqZWN0JyxcbiAgICAgICAgICAgIGNvZGU6IENPTlRSQUNUX1JFUVVJUkVELFxuICAgICAgICAgICAgYXJnczogWydQYW5kb3JhTWFya2V0J11cbiAgICAgICAgfSxcbiAgICAgICAgJ2FkZHJlc3Nlcy5QYW5kb3JhTWFya2V0Jzoge1xuICAgICAgICAgICAgdHlwZTogJ3N0cmluZycsXG4gICAgICAgICAgICBjb2RlOiBBRERSRVNTX1JFUVVJUkVELFxuICAgICAgICAgICAgYXJnczogWydLZXJuZWwnXVxuICAgICAgICB9XG4gICAgfSk7XG5cbiAgICBjb25zdCBtYXIgPSBuZXcgY29uZmlnLndlYjMuZXRoLkNvbnRyYWN0KGNvbmZpZy5jb250cmFjdHMuUGFuZG9yYU1hcmtldC5hYmksIGNvbmZpZy5hZGRyZXNzZXMuUGFuZG9yYU1hcmtldCk7XG4gICAgbWFyLmV2ZW50cy5LZXJuZWxBZGRlZCgpXG4gICAgICAgIC5vbignZGF0YScsIGFzeW5jIHJlcyA9PiB7XG5cbiAgICAgICAgICAgIHRyeSB7XG5cbiAgICAgICAgICAgICAgICBjb25zdCBrZXJuZWwgPSBhd2FpdCBmZXRjaEtlcm5lbChyZXMucmV0dXJuVmFsdWVzLmtlcm5lbCwgY29uZmlnKTtcbiAgICAgICAgICAgICAgICByZXNvbHZlKHtcbiAgICAgICAgICAgICAgICAgICAgYWRkcmVzczogcmVzLnJldHVyblZhbHVlcy5rZXJuZWwsXG4gICAgICAgICAgICAgICAgICAgIGtlcm5lbCxcbiAgICAgICAgICAgICAgICAgICAgc3RhdHVzOiAnY3JlYXRlZCcsXG4gICAgICAgICAgICAgICAgICAgIGV2ZW50OiAnUGFuZG9yYU1hcmtldC5LZXJuZWxBZGRlZCdcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH0gY2F0Y2goZXJyKSB7XG4gICAgICAgICAgICAgICAgcmVqZWN0KGVycik7XG4gICAgICAgICAgICB9ICAgICAgICAgICAgXG4gICAgICAgIH0pXG4gICAgICAgIC5vbignZXJyb3InLCByZWplY3QpO1xufSk7XG5cbi8qKlxuICogSGFuZGxlIGV2ZW50IEtlcm5lbFJlbW92ZWRcbiAqIFxuICogQHBhcmFtIHtPYmplY3R9IGNvbmZpZyBMaWJyYXJ5IGNvbmZpZyAocHJvdmlkZWQgYnkgdGhlIHByb3h5IGJ1dCBjYW4gYmUgb3ZlcnJpZGRlbilcbiAqL1xuZXhwb3J0IGNvbnN0IGV2ZW50S2VybmVsUmVtb3ZlZCA9IChjb25maWcgPSB7fSkgPT4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuXG4gICAgZXhwZWN0LmFsbChjb25maWcsIHtcbiAgICAgICAgJ3dlYjMnOiB7XG4gICAgICAgICAgICB0eXBlOiAnb2JqZWN0JyxcbiAgICAgICAgICAgIGNvZGU6IFdFQjNfUkVRVUlSRURcbiAgICAgICAgfSxcbiAgICAgICAgJ2NvbnRyYWN0cy5QYW5kb3JhTWFya2V0LmFiaSc6IHtcbiAgICAgICAgICAgIHR5cGU6ICdvYmplY3QnLFxuICAgICAgICAgICAgY29kZTogQ09OVFJBQ1RfUkVRVUlSRUQsXG4gICAgICAgICAgICBhcmdzOiBbJ1BhbmRvcmFNYXJrZXQnXVxuICAgICAgICB9LFxuICAgICAgICAnYWRkcmVzc2VzLlBhbmRvcmFNYXJrZXQnOiB7XG4gICAgICAgICAgICB0eXBlOiAnc3RyaW5nJyxcbiAgICAgICAgICAgIGNvZGU6IEFERFJFU1NfUkVRVUlSRUQsXG4gICAgICAgICAgICBhcmdzOiBbJ0tlcm5lbCddXG4gICAgICAgIH1cbiAgICB9KTtcblxuICAgIGNvbnN0IG1hciA9IG5ldyBjb25maWcud2ViMy5ldGguQ29udHJhY3QoY29uZmlnLmNvbnRyYWN0cy5QYW5kb3JhTWFya2V0LmFiaSwgY29uZmlnLmFkZHJlc3Nlcy5QYW5kb3JhTWFya2V0KTtcbiAgICBtYXIuZXZlbnRzLktlcm5lbFJlbW92ZWQoKVxuICAgICAgICAub24oJ2RhdGEnLCBhc3luYyByZXMgPT4ge1xuXG4gICAgICAgICAgICByZXNvbHZlKHtcbiAgICAgICAgICAgICAgICBhZGRyZXNzOiByZXMucmV0dXJuVmFsdWVzLmtlcm5lbCxcbiAgICAgICAgICAgICAgICBzdGF0dXM6ICdyZW1vdmVkJyxcbiAgICAgICAgICAgICAgICBldmVudDogJ1BhbmRvcmFNYXJrZXQuS2VybmVsUmVtb3ZlZCdcbiAgICAgICAgICAgIH0pOyAgICAgICAgICAgIFxuICAgICAgICB9KVxuICAgICAgICAub24oJ2Vycm9yJywgcmVqZWN0KTtcbn0pO1xuIl19