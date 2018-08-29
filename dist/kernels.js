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
exports.eventKernelRemoved = exports.eventKernelAdded = exports.removeKernel = exports.addToMarket = exports.deploy = exports.fetchAll = exports.fetchKernelById = exports.fetchKernel = exports.fetchMetadata = exports.fetchDescription = exports.fetchComplexity = exports.fetchCurrentPrice = exports.fetchDataDim = exports.fetchIpfsAddress = exports.fetchAddressById = exports.fetchCount = void 0;

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
      type: 'address',
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
 * @returns {Promise} A Promise object represents the {String}
 */


exports.fetchCount = fetchCount;

const fetchAddressById = async (id, config = {}) => {
  expect.all({
    id
  }, {
    'id': {
      type: 'number'
    }
  });
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
      type: 'address',
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
 * @param {String} address
 * @param {Object} config Library config (provided by the proxy but can be overridden)
 * @returns {Promise} A Promise object represents the {String}
 */


exports.fetchAddressById = fetchAddressById;

const fetchIpfsAddress = async (address = '', config = {}) => {
  expect.all({
    address
  }, {
    'address': {
      type: 'address'
    }
  });
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
 * @param {String} address
 * @param {Object} config Library config (provided by the proxy but can be overridden)
 * @returns {Promise} A Promise object represents the {number}
 */


exports.fetchIpfsAddress = fetchIpfsAddress;

const fetchDataDim = async (address = '', config = {}) => {
  expect.all({
    address
  }, {
    'address': {
      type: 'address'
    }
  });
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
 * @param {String} address
 * @param {Object} config Library config (provided by the proxy but can be overridden)
 * @returns {Promise} A Promise object represents the {number}
 */


exports.fetchDataDim = fetchDataDim;

const fetchCurrentPrice = async (address = '', config = {}) => {
  expect.all({
    address
  }, {
    'address': {
      type: 'address'
    }
  });
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
 * @param {String} address
 * @param {Object} config Library config (provided by the proxy but can be overridden)
 * @returns {Promise} A Promise object represents the {number}
 */


exports.fetchCurrentPrice = fetchCurrentPrice;

const fetchComplexity = async (address = '', config = {}) => {
  expect.all({
    address
  }, {
    'address': {
      type: 'address'
    }
  });
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
 * Get description from Kernel contract by the kernel address
 * 
 * @param {String} address
 * @param {Object} config Library config (provided by the proxy but can be overridden)
 * @returns {Promise} A Promise object represents the {number}
 */


exports.fetchComplexity = fetchComplexity;

const fetchDescription = async (address = '', config = {}) => {
  expect.all({
    address
  }, {
    'address': {
      type: 'address'
    }
  });
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
  const description = await ker.methods.description().call();
  return config.web3.utils.hexToUtf8(description);
};
/**
 * Get metadata from Kernel contract by the kernel address
 * 
 * @param {String} address
 * @param {Object} config Library config (provided by the proxy but can be overridden)
 * @returns {Promise} A Promise object represents the {number}
 */


exports.fetchDescription = fetchDescription;

const fetchMetadata = async (address = '', config = {}) => {
  expect.all({
    address
  }, {
    'address': {
      type: 'address'
    }
  });
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
  const metadata = await ker.methods.metadata().call();
  return config.web3.utils.hexToUtf8(metadata);
};
/**
 * Get Kernel by the kernel address
 * 
 * @param {String} address
 * @param {Object} config Library config (provided by the proxy but can be overridden)
 * @returns {Promise} Promise object represents the {Object[]}
 */


exports.fetchMetadata = fetchMetadata;

const fetchKernel = async (address = '', config = {}) => {
  const [ipfsAddress, dataDim, currentPrice, complexity, metadata, description] = await Promise.all([fetchIpfsAddress(address, config), fetchDataDim(address, config), fetchCurrentPrice(address, config), fetchComplexity(address, config), fetchMetadata(address, config), fetchDescription(address, config)]);
  return {
    address,
    ipfsAddress,
    dataDim,
    currentPrice,
    complexity,
    metadata,
    description
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
 * @param {String} kernelIpfsHash 
 * @param {Object} options { dimension, complexity, price, metadata, description } 
 * @param {String} publisher Publisher address
 * @param {Object} config Library config (provided by the proxy but can be overridden)
 * @returns {Promise} Promise object resolved to contract address
 */


exports.fetchAll = fetchAll;

const deploy = async (kernelIpfsHash, {
  dimension,
  complexity,
  price,
  metadata,
  description
}, publisher, config = {}) => {
  expect.all({
    kernelIpfsHash,
    publisher,
    dimension,
    complexity,
    price,
    metadata,
    description
  }, {
    'kernelIpfsHash': {
      type: 'string'
    },
    'publisher': {
      type: 'address'
    },
    'dimension': {
      type: 'number'
    },
    'complexity': {
      type: 'number'
    },
    'price': {
      type: 'number'
    },
    'metadata': {
      type: 'string'
    },
    'description': {
      type: 'string'
    }
  });
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
  const args = [config.web3.utils.utf8ToHex(kernelIpfsHash), dimension, complexity, price, config.web3.utils.utf8ToHex(metadata), config.web3.utils.utf8ToHex(description)]; // Estimate required amount of gas

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
 * @returns {Promise} Promise object resolved to {String} contractAddress // can be null if used ganache-cli environment
 */


exports.deploy = deploy;

const addToMarket = (kernelContractAddress, publisherAddress, config = {}) => new Promise(async (resolve, reject) => {
  expect.all({
    kernelContractAddress,
    publisherAddress
  }, {
    'kernelContractAddress': {
      type: 'address'
    },
    'publisherAddress': {
      type: 'address'
    }
  });
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
      type: 'address',
      code: _errors.ADDRESS_REQUIRED,
      args: ['Kernel']
    },
    'web3.currentProvider.isMetaMask': {
      type: 'boolean',
      code: _errors.WEB3_METAMASK_REQUIRED
    }
  });
  const market = new config.web3.eth.Contract(config.contracts.PandoraMarket.abi, config.addresses.PandoraMarket);
  const gasPrice = await config.web3.eth.getGasPrice();
  market.methods.addKernel(kernelContractAddress).send({
    from: publisherAddress,
    gasPrice
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
 * @returns {Promise} Promise object resolved to {String} contractAddress
 */


exports.addToMarket = addToMarket;

const removeKernel = (kernelAddress, publisherAddress, config = {}) => new Promise(async (resolve, reject) => {
  expect.all({
    kernelAddress,
    publisherAddress
  }, {
    'kernelAddress': {
      type: 'address'
    },
    'publisherAddress': {
      type: 'address'
    }
  });
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
      type: 'address',
      code: _errors.ADDRESS_REQUIRED,
      args: ['Kernel']
    }
  });
  const market = new config.web3.eth.Contract(config.contracts.PandoraMarket.abi, config.addresses.PandoraMarket);
  const gasPrice = await config.web3.eth.getGasPrice();
  market.methods.removeKernel(kernelAddress).send({
    from: publisherAddress,
    gasPrice
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
 * @returns {Promise<{Object}>} PPromise object resolved to the object with chained callbacks #data and #error
 */


exports.removeKernel = removeKernel;

const eventKernelAdded = async (options = {}, config = {}) => {
  expect.all({
    options
  }, {
    'options': {
      type: 'object'
    }
  });
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
      type: 'address',
      code: _errors.ADDRESS_REQUIRED,
      args: ['Kernel']
    }
  });
  const callbacks = {
    onData: () => {},
    onError: () => {}
  };
  const chain = {
    data: (cb = () => {}) => {
      callbacks.onData = cb;
      return chain;
    },
    error: (cb = () => {}) => {
      callbacks.onError = cb;
      return chain;
    },
    subscribed: (cb = () => {}) => {
      // @todo Remove subscribed callback
      callbacks.onSubscribed = cb;
      return chain;
    }
  };
  const mar = new config.web3.eth.Contract(config.contracts.PandoraMarket.abi, config.addresses.PandoraMarket);
  chain.event = [];
  chain.event[0] = mar.events.KernelAdded(options).on('data', async event => {
    try {
      const kernel = await fetchKernel(event.returnValues.kernel, config);
      callbacks.onData({
        records: [kernel],
        event
      });
    } catch (err) {
      callbacks.onError(err);
    }
  }).on('error', callbacks.onError);
  chain.event[0].name = 'KernelAdded';
  return chain;
};
/**
 * Handle event KernelRemoved
 * 
 * @param {Object} options Event handler options
 * @param {Object} config Library config (provided by the proxy but can be overridden)
 * @returns {Promise<{Object}>} PPromise object resolved to the object with chained callbacks #data and #error
 */


exports.eventKernelAdded = eventKernelAdded;

const eventKernelRemoved = async (options = {}, config = {}) => {
  expect.all({
    options
  }, {
    'options': {
      type: 'object'
    }
  });
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
      type: 'address',
      code: _errors.ADDRESS_REQUIRED,
      args: ['PandoraMarket']
    }
  });
  const callbacks = {
    onData: () => {},
    onError: () => {}
  };
  const chain = {
    data: (cb = () => {}) => {
      callbacks.onData = cb;
      return chain;
    },
    error: (cb = () => {}) => {
      callbacks.onError = cb;
      return chain;
    }
  };
  const mar = new config.web3.eth.Contract(config.contracts.PandoraMarket.abi, config.addresses.PandoraMarket);
  chain.event = [];
  chain.event[0] = mar.events.KernelRemoved(options).on('data', async event => {
    callbacks.onData({
      records: [{
        address: event.returnValues.kernel
      }],
      event
    });
  }).on('error', callbacks.onError);
  chain.event[0].name = 'KernelRemoved';
  return chain;
};

exports.eventKernelRemoved = eventKernelRemoved;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9rZXJuZWxzLmpzIl0sIm5hbWVzIjpbImZldGNoQ291bnQiLCJjb25maWciLCJleHBlY3QiLCJhbGwiLCJ0eXBlIiwiY29kZSIsIldFQjNfUkVRVUlSRUQiLCJDT05UUkFDVF9SRVFVSVJFRCIsImFyZ3MiLCJBRERSRVNTX1JFUVVJUkVEIiwibWFyIiwid2ViMyIsImV0aCIsIkNvbnRyYWN0IiwiY29udHJhY3RzIiwiUGFuZG9yYU1hcmtldCIsImFiaSIsImFkZHJlc3NlcyIsImNvdW50IiwibWV0aG9kcyIsImtlcm5lbHNDb3VudCIsImNhbGwiLCJOdW1iZXIiLCJwYXJzZUludCIsImZldGNoQWRkcmVzc0J5SWQiLCJpZCIsImtlcm5lbENvbnRyYWN0Iiwia2VybmVscyIsImZldGNoSXBmc0FkZHJlc3MiLCJhZGRyZXNzIiwia2VyIiwiS2VybmVsIiwiaXBmc0FkZHJlc3MiLCJ1dGlscyIsImhleFRvQXNjaWkiLCJmZXRjaERhdGFEaW0iLCJkYXRhRGltIiwiZmV0Y2hDdXJyZW50UHJpY2UiLCJjdXJyZW50UHJpY2UiLCJmZXRjaENvbXBsZXhpdHkiLCJjb21wbGV4aXR5IiwiZmV0Y2hEZXNjcmlwdGlvbiIsImRlc2NyaXB0aW9uIiwiaGV4VG9VdGY4IiwiZmV0Y2hNZXRhZGF0YSIsIm1ldGFkYXRhIiwiZmV0Y2hLZXJuZWwiLCJQcm9taXNlIiwiZmV0Y2hLZXJuZWxCeUlkIiwia2VybmVsIiwiZmV0Y2hBbGwiLCJyZWNvcmRzIiwiZXJyb3IiLCJpIiwicHVzaCIsImVyciIsIm1lc3NhZ2UiLCJkZXBsb3kiLCJrZXJuZWxJcGZzSGFzaCIsImRpbWVuc2lvbiIsInByaWNlIiwicHVibGlzaGVyIiwidXRmOFRvSGV4IiwiZ2FzIiwid2ViM0hlbHBlcnMiLCJlc3RpbWF0ZUdhcyIsImJ5dGVjb2RlIiwia2VybmVsQ29udHJhY3RBZGRyZXNzIiwiZGVwbG95Q29udHJhY3QiLCJmcm9tIiwiYWRkVG9NYXJrZXQiLCJwdWJsaXNoZXJBZGRyZXNzIiwicmVzb2x2ZSIsInJlamVjdCIsIldFQjNfTUVUQU1BU0tfUkVRVUlSRUQiLCJtYXJrZXQiLCJnYXNQcmljZSIsImdldEdhc1ByaWNlIiwiYWRkS2VybmVsIiwic2VuZCIsIm9uIiwicmVjZWlwdCIsInN0YXR1cyIsIlRSQU5TQUNUSU9OX1VOU1VDQ0VTU0ZVTCIsImNvbnRyYWN0QWRkcmVzcyIsImV2ZW50cyIsIktlcm5lbEFkZGVkIiwicmV0dXJuVmFsdWVzIiwicmVtb3ZlS2VybmVsIiwia2VybmVsQWRkcmVzcyIsImV2ZW50S2VybmVsQWRkZWQiLCJvcHRpb25zIiwiY2FsbGJhY2tzIiwib25EYXRhIiwib25FcnJvciIsImNoYWluIiwiZGF0YSIsImNiIiwic3Vic2NyaWJlZCIsIm9uU3Vic2NyaWJlZCIsImV2ZW50IiwibmFtZSIsImV2ZW50S2VybmVsUmVtb3ZlZCIsIktlcm5lbFJlbW92ZWQiXSwibWFwcGluZ3MiOiJBQUFBOzs7Ozs7OztBQVNBOzs7Ozs7O0FBRUE7O0FBQ0E7O0FBT0E7Ozs7Ozs7O0FBRUE7Ozs7OztBQU1PLE1BQU1BLFVBQVUsR0FBRyxPQUFPQyxNQUFNLEdBQUcsRUFBaEIsS0FBdUI7QUFFN0NDLEVBQUFBLE1BQU0sQ0FBQ0MsR0FBUCxDQUFXRixNQUFYLEVBQW1CO0FBQ2YsWUFBUTtBQUNKRyxNQUFBQSxJQUFJLEVBQUUsUUFERjtBQUVKQyxNQUFBQSxJQUFJLEVBQUVDO0FBRkYsS0FETztBQUtmLG1DQUErQjtBQUMzQkYsTUFBQUEsSUFBSSxFQUFFLFFBRHFCO0FBRTNCQyxNQUFBQSxJQUFJLEVBQUVFLHlCQUZxQjtBQUczQkMsTUFBQUEsSUFBSSxFQUFFLENBQUMsZUFBRDtBQUhxQixLQUxoQjtBQVVmLCtCQUEyQjtBQUN2QkosTUFBQUEsSUFBSSxFQUFFLFNBRGlCO0FBRXZCQyxNQUFBQSxJQUFJLEVBQUVJLHdCQUZpQjtBQUd2QkQsTUFBQUEsSUFBSSxFQUFFLENBQUMsZUFBRDtBQUhpQjtBQVZaLEdBQW5CO0FBaUJBLFFBQU1FLEdBQUcsR0FBRyxJQUFJVCxNQUFN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QUFZLENBQVosSUFBaUIxRixHQUFHLENBQUMyRSxNQUFKLENBQVdrQixhQUFYLENBQXlCWixPQUF6QixFQUNaWCxFQURZLENBQ1QsTUFEUyxFQUNELE1BQU1vQixLQUFOLElBQWU7QUFFdkJSLElBQUFBLFNBQVMsQ0FBQ0MsTUFBVixDQUFpQjtBQUNiMUMsTUFBQUEsT0FBTyxFQUFFLENBQUM7QUFBQ3RCLFFBQUFBLE9BQU8sRUFBRXVFLEtBQUssQ0FBQ2IsWUFBTixDQUFtQnRDO0FBQTdCLE9BQUQsQ0FESTtBQUVibUQsTUFBQUE7QUFGYSxLQUFqQjtBQUlILEdBUFksRUFRWnBCLEVBUlksQ0FRVCxPQVJTLEVBUUFZLFNBQVMsQ0FBQ0UsT0FSVixDQUFqQjtBQVNBQyxFQUFBQSxLQUFLLENBQUNLLEtBQU4sQ0FBWSxDQUFaLEVBQWVDLElBQWYsR0FBc0IsZUFBdEI7QUFFQSxTQUFPTixLQUFQO0FBQ0gsQ0F2RE0iLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIEtlcm5lbHMgcmVsYXRlZCBtZXRob2RzXG4gKiBUaGlzIGZpbGUgaXQgaXMgYSBwYXJ0IG9mIHRoZSBQYW5kb3JhIFB5cnJoYSBKYXZhc2NyaXB0IGxpYnJhcnlcbiAqIFxuICogQGZpbGUga2VybmVscy5qc1xuICogQGF1dGhvciBLb3N0aWFudHluIFNteXJub3YgPGtvc3R5c2hAZ21haWwuY29tPlxuICogQGRhdGUgMjAxOFxuICovXG5cbid1c2Ugc3RyaWN0JztcblxuaW1wb3J0ICogYXMgZXhwZWN0IGZyb20gJy4vaGVscGVycy9leHBlY3QnO1xuaW1wb3J0IHBqc0Vycm9yLCB7XG4gICAgQ09OVFJBQ1RfUkVRVUlSRUQsXG4gICAgQUREUkVTU19SRVFVSVJFRCxcbiAgICBXRUIzX1JFUVVJUkVELFxuICAgIFdFQjNfTUVUQU1BU0tfUkVRVUlSRUQsXG4gICAgVFJBTlNBQ1RJT05fVU5TVUNDRVNTRlVMXG59IGZyb20gJy4vaGVscGVycy9lcnJvcnMnO1xuaW1wb3J0ICogYXMgd2ViM0hlbHBlcnMgZnJvbSAnLi9oZWxwZXJzL3dlYjMnO1xuXG4vKipcbiAqIEdldCBrZXJuZWxzIGNvdW50IGZyb20gUGFuZG9yYU1hcmtldCBjb250cmFjdFxuICogXG4gKiBAcGFyYW0ge09iamVjdH0gY29uZmlnIExpYnJhcnkgY29uZmlnIChwcm92aWRlZCBieSB0aGUgcHJveHkgYnV0IGNhbiBiZSBvdmVycmlkZGVuKVxuICogQHJldHVybnMge1Byb21pc2V9IEEgUHJvbWlzZSBvYmplY3QgcmVwcmVzZW50cyB0aGUge251bWJlcn0gXG4gKi9cbmV4cG9ydCBjb25zdCBmZXRjaENvdW50ID0gYXN5bmMgKGNvbmZpZyA9IHt9KSA9PiB7XG5cbiAgICBleHBlY3QuYWxsKGNvbmZpZywge1xuICAgICAgICAnd2ViMyc6IHtcbiAgICAgICAgICAgIHR5cGU6ICdvYmplY3QnLFxuICAgICAgICAgICAgY29kZTogV0VCM19SRVFVSVJFRFxuICAgICAgICB9LFxuICAgICAgICAnY29udHJhY3RzLlBhbmRvcmFNYXJrZXQuYWJpJzoge1xuICAgICAgICAgICAgdHlwZTogJ29iamVjdCcsXG4gICAgICAgICAgICBjb2RlOiBDT05UUkFDVF9SRVFVSVJFRCxcbiAgICAgICAgICAgIGFyZ3M6IFsnUGFuZG9yYU1hcmtldCddXG4gICAgICAgIH0sXG4gICAgICAgICdhZGRyZXNzZXMuUGFuZG9yYU1hcmtldCc6IHtcbiAgICAgICAgICAgIHR5cGU6ICdhZGRyZXNzJyxcbiAgICAgICAgICAgIGNvZGU6IEFERFJFU1NfUkVRVUlSRUQsXG4gICAgICAgICAgICBhcmdzOiBbJ1BhbmRvcmFNYXJrZXQnXVxuICAgICAgICB9XG4gICAgfSk7XG5cbiAgICBjb25zdCBtYXIgPSBuZXcgY29uZmlnLndlYjMuZXRoLkNvbnRyYWN0KGNvbmZpZy5jb250cmFjdHMuUGFuZG9yYU1hcmtldC5hYmksIGNvbmZpZy5hZGRyZXNzZXMuUGFuZG9yYU1hcmtldCk7XG4gICAgY29uc3QgY291bnQgPSBhd2FpdCBtYXIubWV0aG9kc1xuICAgICAgICAua2VybmVsc0NvdW50KClcbiAgICAgICAgLmNhbGwoKTtcblxuICAgIHJldHVybiBOdW1iZXIucGFyc2VJbnQoY291bnQsIDEwKTtcbn07XG5cbi8qKlxuICogR2V0IEtlcm5lbCBhZGRyZXNzIGJ5IGtlcm5lbCBpZFxuICogXG4gKiBAcGFyYW0ge251bWJlcn0gaWRcbiAqIEBwYXJhbSB7T2JqZWN0fSBjb25maWcgTGlicmFyeSBjb25maWcgKHByb3ZpZGVkIGJ5IHRoZSBwcm94eSBidXQgY2FuIGJlIG92ZXJyaWRkZW4pXG4gKiBAcmV0dXJucyB7UHJvbWlzZX0gQSBQcm9taXNlIG9iamVjdCByZXByZXNlbnRzIHRoZSB7U3RyaW5nfVxuICovXG5leHBvcnQgY29uc3QgZmV0Y2hBZGRyZXNzQnlJZCA9IGFzeW5jIChpZCwgY29uZmlnID0ge30pID0+IHtcblxuICAgIGV4cGVjdC5hbGwoeyBpZCB9LCB7XG4gICAgICAgICdpZCc6IHtcbiAgICAgICAgICAgIHR5cGU6ICdudW1iZXInXG4gICAgICAgIH1cbiAgICB9KTtcblxuICAgIGV4cGVjdC5hbGwoY29uZmlnLCB7XG4gICAgICAgICd3ZWIzJzoge1xuICAgICAgICAgICAgdHlwZTogJ29iamVjdCcsXG4gICAgICAgICAgICBjb2RlOiBXRUIzX1JFUVVJUkVEXG4gICAgICAgIH0sXG4gICAgICAgICdjb250cmFjdHMuUGFuZG9yYU1hcmtldC5hYmknOiB7XG4gICAgICAgICAgICB0eXBlOiAnb2JqZWN0JyxcbiAgICAgICAgICAgIGNvZGU6IENPTlRSQUNUX1JFUVVJUkVELFxuICAgICAgICAgICAgYXJnczogWydQYW5kb3JhTWFya2V0J11cbiAgICAgICAgfSxcbiAgICAgICAgJ2FkZHJlc3Nlcy5QYW5kb3JhTWFya2V0Jzoge1xuICAgICAgICAgICAgdHlwZTogJ2FkZHJlc3MnLFxuICAgICAgICAgICAgY29kZTogQUREUkVTU19SRVFVSVJFRCxcbiAgICAgICAgICAgIGFyZ3M6IFsnUGFuZG9yYU1hcmtldCddXG4gICAgICAgIH1cbiAgICB9KTtcblxuICAgIGNvbnN0IG1hciA9IG5ldyBjb25maWcud2ViMy5ldGguQ29udHJhY3QoY29uZmlnLmNvbnRyYWN0cy5QYW5kb3JhTWFya2V0LmFiaSwgY29uZmlnLmFkZHJlc3Nlcy5QYW5kb3JhTWFya2V0KTtcbiAgICBjb25zdCBrZXJuZWxDb250cmFjdCA9IGF3YWl0IG1hci5tZXRob2RzXG4gICAgICAgIC5rZXJuZWxzKGlkKVxuICAgICAgICAuY2FsbCgpO1xuXG4gICAgcmV0dXJuIGtlcm5lbENvbnRyYWN0O1xufTtcblxuLyoqXG4gKiBHZXQgSVBGUyBhZGRyZXNzIGZyb20gS2VybmVsIGNvbnRyYWN0IGJ5IHRoZSBrZXJuZWwgYWRkcmVzc1xuICogXG4gKiBAcGFyYW0ge1N0cmluZ30gYWRkcmVzc1xuICogQHBhcmFtIHtPYmplY3R9IGNvbmZpZyBMaWJyYXJ5IGNvbmZpZyAocHJvdmlkZWQgYnkgdGhlIHByb3h5IGJ1dCBjYW4gYmUgb3ZlcnJpZGRlbilcbiAqIEByZXR1cm5zIHtQcm9taXNlfSBBIFByb21pc2Ugb2JqZWN0IHJlcHJlc2VudHMgdGhlIHtTdHJpbmd9XG4gKi9cbmV4cG9ydCBjb25zdCBmZXRjaElwZnNBZGRyZXNzID0gYXN5bmMgKGFkZHJlc3MgPSAnJywgY29uZmlnID0ge30pID0+IHtcblxuICAgIGV4cGVjdC5hbGwoeyBhZGRyZXNzIH0sIHtcbiAgICAgICAgJ2FkZHJlc3MnOiB7XG4gICAgICAgICAgICB0eXBlOiAnYWRkcmVzcydcbiAgICAgICAgfVxuICAgIH0pO1xuXG4gICAgZXhwZWN0LmFsbChjb25maWcsIHtcbiAgICAgICAgJ3dlYjMnOiB7XG4gICAgICAgICAgICB0eXBlOiAnb2JqZWN0JyxcbiAgICAgICAgICAgIGNvZGU6IFdFQjNfUkVRVUlSRURcbiAgICAgICAgfSxcbiAgICAgICAgJ2NvbnRyYWN0cy5LZXJuZWwuYWJpJzoge1xuICAgICAgICAgICAgdHlwZTogJ29iamVjdCcsXG4gICAgICAgICAgICBjb2RlOiBDT05UUkFDVF9SRVFVSVJFRCxcbiAgICAgICAgICAgIGFyZ3M6IFsnS2VybmVsJ11cbiAgICAgICAgfVxuICAgIH0pO1xuXG4gICAgY29uc3Qga2VyID0gbmV3IGNvbmZpZy53ZWIzLmV0aC5Db250cmFjdChjb25maWcuY29udHJhY3RzLktlcm5lbC5hYmksIGFkZHJlc3MpO1xuICAgIGNvbnN0IGlwZnNBZGRyZXNzID0gYXdhaXQga2VyLm1ldGhvZHNcbiAgICAgICAgLmlwZnNBZGRyZXNzKClcbiAgICAgICAgLmNhbGwoKTtcblxuICAgIHJldHVybiBjb25maWcud2ViMy51dGlscy5oZXhUb0FzY2lpKGlwZnNBZGRyZXNzKTtcbn07XG5cbi8qKlxuICogR2V0IGRhdGEgZGltIGZyb20gS2VybmVsIGNvbnRyYWN0IGJ5IHRoZSBrZXJuZWwgYWRkcmVzc1xuICogXG4gKiBAcGFyYW0ge1N0cmluZ30gYWRkcmVzc1xuICogQHBhcmFtIHtPYmplY3R9IGNvbmZpZyBMaWJyYXJ5IGNvbmZpZyAocHJvdmlkZWQgYnkgdGhlIHByb3h5IGJ1dCBjYW4gYmUgb3ZlcnJpZGRlbilcbiAqIEByZXR1cm5zIHtQcm9taXNlfSBBIFByb21pc2Ugb2JqZWN0IHJlcHJlc2VudHMgdGhlIHtudW1iZXJ9XG4gKi9cbmV4cG9ydCBjb25zdCBmZXRjaERhdGFEaW0gPSBhc3luYyAoYWRkcmVzcyA9ICcnLCBjb25maWcgPSB7fSkgPT4ge1xuXG4gICAgZXhwZWN0LmFsbCh7IGFkZHJlc3MgfSwge1xuICAgICAgICAnYWRkcmVzcyc6IHtcbiAgICAgICAgICAgIHR5cGU6ICdhZGRyZXNzJ1xuICAgICAgICB9XG4gICAgfSk7XG5cbiAgICBleHBlY3QuYWxsKGNvbmZpZywge1xuICAgICAgICAnd2ViMyc6IHtcbiAgICAgICAgICAgIHR5cGU6ICdvYmplY3QnLFxuICAgICAgICAgICAgY29kZTogV0VCM19SRVFVSVJFRFxuICAgICAgICB9LFxuICAgICAgICAnY29udHJhY3RzLktlcm5lbC5hYmknOiB7XG4gICAgICAgICAgICB0eXBlOiAnb2JqZWN0JyxcbiAgICAgICAgICAgIGNvZGU6IENPTlRSQUNUX1JFUVVJUkVELFxuICAgICAgICAgICAgYXJnczogWydLZXJuZWwnXVxuICAgICAgICB9XG4gICAgfSk7XG5cbiAgICBjb25zdCBrZXIgPSBuZXcgY29uZmlnLndlYjMuZXRoLkNvbnRyYWN0KGNvbmZpZy5jb250cmFjdHMuS2VybmVsLmFiaSwgYWRkcmVzcyk7XG4gICAgY29uc3QgZGF0YURpbSA9IGF3YWl0IGtlci5tZXRob2RzXG4gICAgICAgIC5kYXRhRGltKClcbiAgICAgICAgLmNhbGwoKTtcblxuICAgIHJldHVybiBOdW1iZXIucGFyc2VJbnQoZGF0YURpbSwgMTApO1xufTtcblxuLyoqXG4gKiBHZXQgY3VycmVudCBwcmljZSBmcm9tIEtlcm5lbCBjb250cmFjdCBieSB0aGUga2VybmVsIGFkZHJlc3NcbiAqIFxuICogQHBhcmFtIHtTdHJpbmd9IGFkZHJlc3NcbiAqIEBwYXJhbSB7T2JqZWN0fSBjb25maWcgTGlicmFyeSBjb25maWcgKHByb3ZpZGVkIGJ5IHRoZSBwcm94eSBidXQgY2FuIGJlIG92ZXJyaWRkZW4pXG4gKiBAcmV0dXJucyB7UHJvbWlzZX0gQSBQcm9taXNlIG9iamVjdCByZXByZXNlbnRzIHRoZSB7bnVtYmVyfVxuICovXG5leHBvcnQgY29uc3QgZmV0Y2hDdXJyZW50UHJpY2UgPSBhc3luYyAoYWRkcmVzcyA9ICcnLCBjb25maWcgPSB7fSkgPT4ge1xuXG4gICAgZXhwZWN0LmFsbCh7IGFkZHJlc3MgfSwge1xuICAgICAgICAnYWRkcmVzcyc6IHtcbiAgICAgICAgICAgIHR5cGU6ICdhZGRyZXNzJ1xuICAgICAgICB9XG4gICAgfSk7XG5cbiAgICBleHBlY3QuYWxsKGNvbmZpZywge1xuICAgICAgICAnd2ViMyc6IHtcbiAgICAgICAgICAgIHR5cGU6ICdvYmplY3QnLFxuICAgICAgICAgICAgY29kZTogV0VCM19SRVFVSVJFRFxuICAgICAgICB9LFxuICAgICAgICAnY29udHJhY3RzLktlcm5lbC5hYmknOiB7XG4gICAgICAgICAgICB0eXBlOiAnb2JqZWN0JyxcbiAgICAgICAgICAgIGNvZGU6IENPTlRSQUNUX1JFUVVJUkVELFxuICAgICAgICAgICAgYXJnczogWydLZXJuZWwnXVxuICAgICAgICB9XG4gICAgfSk7XG5cbiAgICBjb25zdCBrZXIgPSBuZXcgY29uZmlnLndlYjMuZXRoLkNvbnRyYWN0KGNvbmZpZy5jb250cmFjdHMuS2VybmVsLmFiaSwgYWRkcmVzcyk7XG4gICAgY29uc3QgY3VycmVudFByaWNlID0gYXdhaXQga2VyLm1ldGhvZHNcbiAgICAgICAgLmN1cnJlbnRQcmljZSgpXG4gICAgICAgIC5jYWxsKCk7XG5cbiAgICByZXR1cm4gTnVtYmVyLnBhcnNlSW50KGN1cnJlbnRQcmljZSwgMTApO1xufTtcblxuLyoqXG4gKiBHZXQgY29tcGxleGl0eSBmcm9tIEtlcm5lbCBjb250cmFjdCBieSB0aGUga2VybmVsIGFkZHJlc3NcbiAqIFxuICogQHBhcmFtIHtTdHJpbmd9IGFkZHJlc3NcbiAqIEBwYXJhbSB7T2JqZWN0fSBjb25maWcgTGlicmFyeSBjb25maWcgKHByb3ZpZGVkIGJ5IHRoZSBwcm94eSBidXQgY2FuIGJlIG92ZXJyaWRkZW4pXG4gKiBAcmV0dXJucyB7UHJvbWlzZX0gQSBQcm9taXNlIG9iamVjdCByZXByZXNlbnRzIHRoZSB7bnVtYmVyfVxuICovXG5leHBvcnQgY29uc3QgZmV0Y2hDb21wbGV4aXR5ID0gYXN5bmMgKGFkZHJlc3MgPSAnJywgY29uZmlnID0ge30pID0+IHtcblxuICAgIGV4cGVjdC5hbGwoeyBhZGRyZXNzIH0sIHtcbiAgICAgICAgJ2FkZHJlc3MnOiB7XG4gICAgICAgICAgICB0eXBlOiAnYWRkcmVzcydcbiAgICAgICAgfVxuICAgIH0pO1xuXG4gICAgZXhwZWN0LmFsbChjb25maWcsIHtcbiAgICAgICAgJ3dlYjMnOiB7XG4gICAgICAgICAgICB0eXBlOiAnb2JqZWN0JyxcbiAgICAgICAgICAgIGNvZGU6IFdFQjNfUkVRVUlSRURcbiAgICAgICAgfSxcbiAgICAgICAgJ2NvbnRyYWN0cy5LZXJuZWwuYWJpJzoge1xuICAgICAgICAgICAgdHlwZTogJ29iamVjdCcsXG4gICAgICAgICAgICBjb2RlOiBDT05UUkFDVF9SRVFVSVJFRCxcbiAgICAgICAgICAgIGFyZ3M6IFsnS2VybmVsJ11cbiAgICAgICAgfVxuICAgIH0pO1xuXG4gICAgY29uc3Qga2VyID0gbmV3IGNvbmZpZy53ZWIzLmV0aC5Db250cmFjdChjb25maWcuY29udHJhY3RzLktlcm5lbC5hYmksIGFkZHJlc3MpO1xuICAgIGNvbnN0IGNvbXBsZXhpdHkgPSBhd2FpdCBrZXIubWV0aG9kc1xuICAgICAgICAuY29tcGxleGl0eSgpXG4gICAgICAgIC5jYWxsKCk7XG5cbiAgICByZXR1cm4gTnVtYmVyLnBhcnNlSW50KGNvbXBsZXhpdHksIDEwKTtcbn07XG5cbi8qKlxuICogR2V0IGRlc2NyaXB0aW9uIGZyb20gS2VybmVsIGNvbnRyYWN0IGJ5IHRoZSBrZXJuZWwgYWRkcmVzc1xuICogXG4gKiBAcGFyYW0ge1N0cmluZ30gYWRkcmVzc1xuICogQHBhcmFtIHtPYmplY3R9IGNvbmZpZyBMaWJyYXJ5IGNvbmZpZyAocHJvdmlkZWQgYnkgdGhlIHByb3h5IGJ1dCBjYW4gYmUgb3ZlcnJpZGRlbilcbiAqIEByZXR1cm5zIHtQcm9taXNlfSBBIFByb21pc2Ugb2JqZWN0IHJlcHJlc2VudHMgdGhlIHtudW1iZXJ9XG4gKi9cbmV4cG9ydCBjb25zdCBmZXRjaERlc2NyaXB0aW9uID0gYXN5bmMgKGFkZHJlc3MgPSAnJywgY29uZmlnID0ge30pID0+IHtcblxuICAgIGV4cGVjdC5hbGwoeyBhZGRyZXNzIH0sIHtcbiAgICAgICAgJ2FkZHJlc3MnOiB7XG4gICAgICAgICAgICB0eXBlOiAnYWRkcmVzcydcbiAgICAgICAgfVxuICAgIH0pO1xuXG4gICAgZXhwZWN0LmFsbChjb25maWcsIHtcbiAgICAgICAgJ3dlYjMnOiB7XG4gICAgICAgICAgICB0eXBlOiAnb2JqZWN0JyxcbiAgICAgICAgICAgIGNvZGU6IFdFQjNfUkVRVUlSRURcbiAgICAgICAgfSxcbiAgICAgICAgJ2NvbnRyYWN0cy5LZXJuZWwuYWJpJzoge1xuICAgICAgICAgICAgdHlwZTogJ29iamVjdCcsXG4gICAgICAgICAgICBjb2RlOiBDT05UUkFDVF9SRVFVSVJFRCxcbiAgICAgICAgICAgIGFyZ3M6IFsnS2VybmVsJ11cbiAgICAgICAgfVxuICAgIH0pO1xuXG4gICAgY29uc3Qga2VyID0gbmV3IGNvbmZpZy53ZWIzLmV0aC5Db250cmFjdChjb25maWcuY29udHJhY3RzLktlcm5lbC5hYmksIGFkZHJlc3MpO1xuICAgIGNvbnN0IGRlc2NyaXB0aW9uID0gYXdhaXQga2VyLm1ldGhvZHNcbiAgICAgICAgLmRlc2NyaXB0aW9uKClcbiAgICAgICAgLmNhbGwoKTtcblxuICAgIHJldHVybiBjb25maWcud2ViMy51dGlscy5oZXhUb1V0ZjgoZGVzY3JpcHRpb24pO1xufTtcblxuLyoqXG4gKiBHZXQgbWV0YWRhdGEgZnJvbSBLZXJuZWwgY29udHJhY3QgYnkgdGhlIGtlcm5lbCBhZGRyZXNzXG4gKiBcbiAqIEBwYXJhbSB7U3RyaW5nfSBhZGRyZXNzXG4gKiBAcGFyYW0ge09iamVjdH0gY29uZmlnIExpYnJhcnkgY29uZmlnIChwcm92aWRlZCBieSB0aGUgcHJveHkgYnV0IGNhbiBiZSBvdmVycmlkZGVuKVxuICogQHJldHVybnMge1Byb21pc2V9IEEgUHJvbWlzZSBvYmplY3QgcmVwcmVzZW50cyB0aGUge251bWJlcn1cbiAqL1xuZXhwb3J0IGNvbnN0IGZldGNoTWV0YWRhdGEgPSBhc3luYyAoYWRkcmVzcyA9ICcnLCBjb25maWcgPSB7fSkgPT4ge1xuXG4gICAgZXhwZWN0LmFsbCh7IGFkZHJlc3MgfSwge1xuICAgICAgICAnYWRkcmVzcyc6IHtcbiAgICAgICAgICAgIHR5cGU6ICdhZGRyZXNzJ1xuICAgICAgICB9XG4gICAgfSk7XG5cbiAgICBleHBlY3QuYWxsKGNvbmZpZywge1xuICAgICAgICAnd2ViMyc6IHtcbiAgICAgICAgICAgIHR5cGU6ICdvYmplY3QnLFxuICAgICAgICAgICAgY29kZTogV0VCM19SRVFVSVJFRFxuICAgICAgICB9LFxuICAgICAgICAnY29udHJhY3RzLktlcm5lbC5hYmknOiB7XG4gICAgICAgICAgICB0eXBlOiAnb2JqZWN0JyxcbiAgICAgICAgICAgIGNvZGU6IENPTlRSQUNUX1JFUVVJUkVELFxuICAgICAgICAgICAgYXJnczogWydLZXJuZWwnXVxuICAgICAgICB9XG4gICAgfSk7XG5cbiAgICBjb25zdCBrZXIgPSBuZXcgY29uZmlnLndlYjMuZXRoLkNvbnRyYWN0KGNvbmZpZy5jb250cmFjdHMuS2VybmVsLmFiaSwgYWRkcmVzcyk7XG4gICAgY29uc3QgbWV0YWRhdGEgPSBhd2FpdCBrZXIubWV0aG9kc1xuICAgICAgICAubWV0YWRhdGEoKVxuICAgICAgICAuY2FsbCgpO1xuXG4gICAgcmV0dXJuIGNvbmZpZy53ZWIzLnV0aWxzLmhleFRvVXRmOChtZXRhZGF0YSk7XG59O1xuXG4vKipcbiAqIEdldCBLZXJuZWwgYnkgdGhlIGtlcm5lbCBhZGRyZXNzXG4gKiBcbiAqIEBwYXJhbSB7U3RyaW5nfSBhZGRyZXNzXG4gKiBAcGFyYW0ge09iamVjdH0gY29uZmlnIExpYnJhcnkgY29uZmlnIChwcm92aWRlZCBieSB0aGUgcHJveHkgYnV0IGNhbiBiZSBvdmVycmlkZGVuKVxuICogQHJldHVybnMge1Byb21pc2V9IFByb21pc2Ugb2JqZWN0IHJlcHJlc2VudHMgdGhlIHtPYmplY3RbXX1cbiAqL1xuZXhwb3J0IGNvbnN0IGZldGNoS2VybmVsID0gYXN5bmMgKGFkZHJlc3MgPSAnJywgY29uZmlnID0ge30pID0+IHtcblxuICAgIGNvbnN0IFtcbiAgICAgICAgaXBmc0FkZHJlc3MsXG4gICAgICAgIGRhdGFEaW0sXG4gICAgICAgIGN1cnJlbnRQcmljZSxcbiAgICAgICAgY29tcGxleGl0eSxcbiAgICAgICAgbWV0YWRhdGEsXG4gICAgICAgIGRlc2NyaXB0aW9uXG4gICAgXSA9IGF3YWl0IFByb21pc2UuYWxsKFtcbiAgICAgICAgZmV0Y2hJcGZzQWRkcmVzcyhhZGRyZXNzLCBjb25maWcpLFxuICAgICAgICBmZXRjaERhdGFEaW0oYWRkcmVzcywgY29uZmlnKSxcbiAgICAgICAgZmV0Y2hDdXJyZW50UHJpY2UoYWRkcmVzcywgY29uZmlnKSxcbiAgICAgICAgZmV0Y2hDb21wbGV4aXR5KGFkZHJlc3MsIGNvbmZpZyksXG4gICAgICAgIGZldGNoTWV0YWRhdGEoYWRkcmVzcywgY29uZmlnKSxcbiAgICAgICAgZmV0Y2hEZXNjcmlwdGlvbihhZGRyZXNzLCBjb25maWcpXG4gICAgXSk7XG5cbiAgICByZXR1cm4ge1xuICAgICAgICBhZGRyZXNzLFxuICAgICAgICBpcGZzQWRkcmVzcyxcbiAgICAgICAgZGF0YURpbSxcbiAgICAgICAgY3VycmVudFByaWNlLFxuICAgICAgICBjb21wbGV4aXR5LFxuICAgICAgICBtZXRhZGF0YSxcbiAgICAgICAgZGVzY3JpcHRpb25cbiAgICB9O1xufTtcblxuLyoqXG4gKiBHZXQga2VybmVsIGJ5IGlkXG4gKiBcbiAqIEBwYXJhbSB7aW50ZWdlcn0gaWQgXG4gKiBAcGFyYW0ge09iamVjdH0gY29uZmlnIExpYnJhcnkgY29uZmlnIChwcm92aWRlZCBieSB0aGUgcHJveHkgYnV0IGNhbiBiZSBvdmVycmlkZGVuKVxuICogQHJldHVybnMge1Byb21pc2V9IEEgUHJvbWlzZSBvYmplY3QgcmVwcmVzZW50cyB0aGUge09iamVjdH1cbiAqL1xuZXhwb3J0IGNvbnN0IGZldGNoS2VybmVsQnlJZCA9IGFzeW5jIChpZCwgY29uZmlnID0ge30pID0+IHtcbiAgICBcbiAgICBjb25zdCBhZGRyZXNzID0gYXdhaXQgZmV0Y2hBZGRyZXNzQnlJZChpZCwgY29uZmlnKTtcbiAgICBjb25zdCBrZXJuZWwgPSBhd2FpdCBmZXRjaEtlcm5lbChhZGRyZXNzLCBjb25maWcpO1xuXG4gICAgcmV0dXJuIGtlcm5lbDtcbn07XG5cbi8qKlxuICogR2V0IGFsbCBrZXJuZWxzXG4gKiBcbiAqIEBwYXJhbSB7T2JqZWN0fSBjb25maWcgTGlicmFyeSBjb25maWcgKHByb3ZpZGVkIGJ5IHRoZSBwcm94eSBidXQgY2FuIGJlIG92ZXJyaWRkZW4pXG4gKiBAcmV0dXJucyB7UHJvbWlzZX0gUHJvbWlzZSBvYmplY3QgcmVwcmVzZW50cyB0aGUge09iamVjdFtdfVxuICovXG5leHBvcnQgY29uc3QgZmV0Y2hBbGwgPSBhc3luYyAoY29uZmlnID0ge30pID0+IHtcblxuICAgIGxldCByZWNvcmRzID0gW107XG4gICAgbGV0IGVycm9yID0gW107XG5cbiAgICB0cnkge1xuXG4gICAgICAgIGNvbnN0IGNvdW50ID0gYXdhaXQgZmV0Y2hDb3VudChjb25maWcpO1xuXG4gICAgICAgIGZvciAobGV0IGk9MDsgaSA8IGNvdW50OyBpKyspIHtcbiAgICAgICAgICAgIFxuICAgICAgICAgICAgdHJ5IHtcblxuICAgICAgICAgICAgICAgIGNvbnN0IGtlcm5lbCA9IGF3YWl0IGZldGNoS2VybmVsQnlJZChpLCBjb25maWcpO1xuXG4gICAgICAgICAgICAgICAgcmVjb3Jkcy5wdXNoKHtcbiAgICAgICAgICAgICAgICAgICAgaWQ6IGksXG4gICAgICAgICAgICAgICAgICAgIC4uLmtlcm5lbFxuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfSBjYXRjaChlcnIpIHtcbiAgICAgICAgICAgICAgICBlcnJvci5wdXNoKHtcbiAgICAgICAgICAgICAgICAgICAgaWQ6IGksXG4gICAgICAgICAgICAgICAgICAgIG1lc3NhZ2U6IGVyci5tZXNzYWdlXG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9ICAgICAgICBcbiAgICAgICAgfVxuICAgIH0gY2F0Y2goZXJyKSB7XG4gICAgICAgIGVycm9yLnB1c2goe1xuICAgICAgICAgICAgZXJyb3I6IGVyci5tZXNzYWdlXG4gICAgICAgIH0pO1xuICAgIH0gICBcblxuICAgIHJldHVybiB7XG4gICAgICAgIHJlY29yZHMsXG4gICAgICAgIGVycm9yXG4gICAgfTtcbn07XG5cbi8qKlxuICogRGVwbG95IEtlcm5lbCBjb250cmFjdCB0byB0aGUgbmV0d29ya1xuICogXG4gKiBAcGFyYW0ge1N0cmluZ30ga2VybmVsSXBmc0hhc2ggXG4gKiBAcGFyYW0ge09iamVjdH0gb3B0aW9ucyB7IGRpbWVuc2lvbiwgY29tcGxleGl0eSwgcHJpY2UsIG1ldGFkYXRhLCBkZXNjcmlwdGlvbiB9IFxuICogQHBhcmFtIHtTdHJpbmd9IHB1Ymxpc2hlciBQdWJsaXNoZXIgYWRkcmVzc1xuICogQHBhcmFtIHtPYmplY3R9IGNvbmZpZyBMaWJyYXJ5IGNvbmZpZyAocHJvdmlkZWQgYnkgdGhlIHByb3h5IGJ1dCBjYW4gYmUgb3ZlcnJpZGRlbilcbiAqIEByZXR1cm5zIHtQcm9taXNlfSBQcm9taXNlIG9iamVjdCByZXNvbHZlZCB0byBjb250cmFjdCBhZGRyZXNzXG4gKi9cbmV4cG9ydCBjb25zdCBkZXBsb3kgPSBhc3luYyAoa2VybmVsSXBmc0hhc2gsIHsgZGltZW5zaW9uLCBjb21wbGV4aXR5LCBwcmljZSwgbWV0YWRhdGEsIGRlc2NyaXB0aW9uIH0sIHB1Ymxpc2hlciwgY29uZmlnID0ge30pID0+IHtcblxuICAgIGV4cGVjdC5hbGwoeyBrZXJuZWxJcGZzSGFzaCwgcHVibGlzaGVyLCBkaW1lbnNpb24sIGNvbXBsZXhpdHksIHByaWNlLCBtZXRhZGF0YSwgZGVzY3JpcHRpb24gfSwge1xuICAgICAgICAna2VybmVsSXBmc0hhc2gnOiB7XG4gICAgICAgICAgICB0eXBlOiAnc3RyaW5nJ1xuICAgICAgICB9LFxuICAgICAgICAncHVibGlzaGVyJzoge1xuICAgICAgICAgICAgdHlwZTogJ2FkZHJlc3MnXG4gICAgICAgIH0sXG4gICAgICAgICdkaW1lbnNpb24nOiB7XG4gICAgICAgICAgICB0eXBlOiAnbnVtYmVyJ1xuICAgICAgICB9LFxuICAgICAgICAnY29tcGxleGl0eSc6IHtcbiAgICAgICAgICAgIHR5cGU6ICdudW1iZXInXG4gICAgICAgIH0sXG4gICAgICAgICdwcmljZSc6IHtcbiAgICAgICAgICAgIHR5cGU6ICdudW1iZXInXG4gICAgICAgIH0sXG4gICAgICAgICdtZXRhZGF0YSc6IHtcbiAgICAgICAgICAgIHR5cGU6ICdzdHJpbmcnXG4gICAgICAgIH0sXG4gICAgICAgICdkZXNjcmlwdGlvbic6IHtcbiAgICAgICAgICAgIHR5cGU6ICdzdHJpbmcnXG4gICAgICAgIH1cbiAgICB9KTtcblxuICAgIGV4cGVjdC5hbGwoY29uZmlnLCB7XG4gICAgICAgICd3ZWIzJzoge1xuICAgICAgICAgICAgdHlwZTogJ29iamVjdCcsXG4gICAgICAgICAgICBjb2RlOiBXRUIzX1JFUVVJUkVEXG4gICAgICAgIH0sXG4gICAgICAgICdjb250cmFjdHMuS2VybmVsLmFiaSc6IHtcbiAgICAgICAgICAgIHR5cGU6ICdvYmplY3QnLFxuICAgICAgICAgICAgY29kZTogQ09OVFJBQ1RfUkVRVUlSRUQsXG4gICAgICAgICAgICBhcmdzOiBbJ0tlcm5lbCddXG4gICAgICAgIH1cbiAgICB9KTtcblxuICAgIGNvbnN0IGFyZ3MgPSBbXG4gICAgICAgIGNvbmZpZy53ZWIzLnV0aWxzLnV0ZjhUb0hleChrZXJuZWxJcGZzSGFzaCksIFxuICAgICAgICBkaW1lbnNpb24sIFxuICAgICAgICBjb21wbGV4aXR5LCBcbiAgICAgICAgcHJpY2UsIFxuICAgICAgICBjb25maWcud2ViMy51dGlscy51dGY4VG9IZXgobWV0YWRhdGEpLFxuICAgICAgICBjb25maWcud2ViMy51dGlscy51dGY4VG9IZXgoZGVzY3JpcHRpb24pXG4gICAgXTtcbiAgICAgICAgXG4gICAgLy8gRXN0aW1hdGUgcmVxdWlyZWQgYW1vdW50IG9mIGdhc1xuICAgIGNvbnN0IGdhcyA9IGF3YWl0IHdlYjNIZWxwZXJzLmVzdGltYXRlR2FzKGNvbmZpZy5jb250cmFjdHMuS2VybmVsLmJ5dGVjb2RlLCBhcmdzLCBjb25maWcpO1xuXG4gICAgLy8gQ3JlYXRlIGFuZCBkZXBsb3kga2VybmVsIGNvbnRyYWN0XG4gICAgY29uc3Qga2VybmVsQ29udHJhY3RBZGRyZXNzID0gYXdhaXQgd2ViM0hlbHBlcnMuZGVwbG95Q29udHJhY3QoY29uZmlnLmNvbnRyYWN0cy5LZXJuZWwsIHtcbiAgICAgICAgYXJncyxcbiAgICAgICAgZnJvbTogcHVibGlzaGVyLFxuICAgICAgICBnYXM6IE51bWJlci5wYXJzZUludChnYXMgKiAxLjUsIDEwKVxuICAgIH0sIGNvbmZpZyk7XG5cbiAgICByZXR1cm4ga2VybmVsQ29udHJhY3RBZGRyZXNzO1xufTtcblxuLyoqXG4gKiBBZGQga2VybmVsIHRvIG1hcmtldFxuICogXG4gKiBAcGFyYW0ge1N0cmluZ30ga2VybmVsQ29udHJhY3RBZGRyZXNzIFxuICogQHBhcmFtIHtTdHJpbmd9IHB1Ymxpc2hlckFkZHJlc3MgXG4gKiBAcGFyYW0ge09iamVjdH0gY29uZmlnIExpYnJhcnkgY29uZmlnIChwcm92aWRlZCBieSB0aGUgcHJveHkgYnV0IGNhbiBiZSBvdmVycmlkZGVuKVxuICogQHJldHVybnMge1Byb21pc2V9IFByb21pc2Ugb2JqZWN0IHJlc29sdmVkIHRvIHtTdHJpbmd9IGNvbnRyYWN0QWRkcmVzcyAvLyBjYW4gYmUgbnVsbCBpZiB1c2VkIGdhbmFjaGUtY2xpIGVudmlyb25tZW50XG4gKi9cbmV4cG9ydCBjb25zdCBhZGRUb01hcmtldCA9IChrZXJuZWxDb250cmFjdEFkZHJlc3MsIHB1Ymxpc2hlckFkZHJlc3MsIGNvbmZpZyA9IHt9KSA9PiBuZXcgUHJvbWlzZShhc3luYyAocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG5cbiAgICBleHBlY3QuYWxsKHsga2VybmVsQ29udHJhY3RBZGRyZXNzLCBwdWJsaXNoZXJBZGRyZXNzIH0sIHtcbiAgICAgICAgJ2tlcm5lbENvbnRyYWN0QWRkcmVzcyc6IHtcbiAgICAgICAgICAgIHR5cGU6ICdhZGRyZXNzJ1xuICAgICAgICB9LFxuICAgICAgICAncHVibGlzaGVyQWRkcmVzcyc6IHtcbiAgICAgICAgICAgIHR5cGU6ICdhZGRyZXNzJ1xuICAgICAgICB9XG4gICAgfSk7XG5cbiAgICBleHBlY3QuYWxsKGNvbmZpZywge1xuICAgICAgICAnd2ViMyc6IHtcbiAgICAgICAgICAgIHR5cGU6ICdvYmplY3QnLFxuICAgICAgICAgICAgY29kZTogV0VCM19SRVFVSVJFRFxuICAgICAgICB9LFxuICAgICAgICAnY29udHJhY3RzLlBhbmRvcmFNYXJrZXQuYWJpJzoge1xuICAgICAgICAgICAgdHlwZTogJ29iamVjdCcsXG4gICAgICAgICAgICBjb2RlOiBDT05UUkFDVF9SRVFVSVJFRCxcbiAgICAgICAgICAgIGFyZ3M6IFsnUGFuZG9yYU1hcmtldCddXG4gICAgICAgIH0sXG4gICAgICAgICdhZGRyZXNzZXMuUGFuZG9yYU1hcmtldCc6IHtcbiAgICAgICAgICAgIHR5cGU6ICdhZGRyZXNzJyxcbiAgICAgICAgICAgIGNvZGU6IEFERFJFU1NfUkVRVUlSRUQsXG4gICAgICAgICAgICBhcmdzOiBbJ0tlcm5lbCddXG4gICAgICAgIH0sXG4gICAgICAgICd3ZWIzLmN1cnJlbnRQcm92aWRlci5pc01ldGFNYXNrJzoge1xuICAgICAgICAgICAgdHlwZTogJ2Jvb2xlYW4nLFxuICAgICAgICAgICAgY29kZTogV0VCM19NRVRBTUFTS19SRVFVSVJFRFxuICAgICAgICB9XG4gICAgfSk7XG5cbiAgICBjb25zdCBtYXJrZXQgPSBuZXcgY29uZmlnLndlYjMuZXRoLkNvbnRyYWN0KGNvbmZpZy5jb250cmFjdHMuUGFuZG9yYU1hcmtldC5hYmksIGNvbmZpZy5hZGRyZXNzZXMuUGFuZG9yYU1hcmtldCk7XG4gICAgY29uc3QgZ2FzUHJpY2UgPSBhd2FpdCBjb25maWcud2ViMy5ldGguZ2V0R2FzUHJpY2UoKTtcbiAgICBtYXJrZXQubWV0aG9kc1xuICAgICAgICAuYWRkS2VybmVsKGtlcm5lbENvbnRyYWN0QWRkcmVzcylcbiAgICAgICAgLnNlbmQoe1xuICAgICAgICAgICAgZnJvbTogcHVibGlzaGVyQWRkcmVzcyxcbiAgICAgICAgICAgIGdhc1ByaWNlXG4gICAgICAgIH0pXG4gICAgICAgIC5vbignZXJyb3InLCByZWplY3QpXG4gICAgICAgIC5vbigncmVjZWlwdCcsIHJlY2VpcHQgPT4ge1xuXG4gICAgICAgICAgICBpZiAoTnVtYmVyKHJlY2VpcHQuc3RhdHVzKSA9PT0gMCkge1xuXG4gICAgICAgICAgICAgICAgcmV0dXJuIHJlamVjdChwanNFcnJvcihUUkFOU0FDVElPTl9VTlNVQ0NFU1NGVUwpKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgcmVzb2x2ZShyZWNlaXB0LmNvbnRyYWN0QWRkcmVzcyB8fCByZWNlaXB0LmV2ZW50cy5LZXJuZWxBZGRlZC5yZXR1cm5WYWx1ZXMua2VybmVsKTtcbiAgICAgICAgfSk7XG4gICAgLy8gQG5vdGUgSW4gY2FzZSBvZiBnYW5hY2hlLWNsaSBibG9ja2NoYWluIFwiY29udHJhY3RBZGRyZXNzXCIgYWx3YXlzIHdpbGwgYmUgZXF1YWwgdG8gbnVsbFxufSk7XG5cbi8qKlxuICogUmVtb3ZlIGtlcm5lbCBmcm9tIFBhbmRvcmFNYXJrZXRcbiAqIFxuICogQHBhcmFtIHtTdHJpbmd9IGtlcm5lbEFkZHJlc3NcbiAqIEBwYXJhbSB7U3RyaW5nfSBwdWJsaXNoZXJBZGRyZXNzIFxuICogQHBhcmFtIHtPYmplY3R9IGNvbmZpZyBMaWJyYXJ5IGNvbmZpZyAocHJvdmlkZWQgYnkgdGhlIHByb3h5IGJ1dCBjYW4gYmUgb3ZlcnJpZGRlbikgXG4gKiBAcmV0dXJucyB7UHJvbWlzZX0gUHJvbWlzZSBvYmplY3QgcmVzb2x2ZWQgdG8ge1N0cmluZ30gY29udHJhY3RBZGRyZXNzXG4gKi9cbmV4cG9ydCBjb25zdCByZW1vdmVLZXJuZWwgPSAoa2VybmVsQWRkcmVzcywgcHVibGlzaGVyQWRkcmVzcywgY29uZmlnID0ge30pID0+IG5ldyBQcm9taXNlKGFzeW5jIChyZXNvbHZlLCByZWplY3QpID0+IHtcblxuICAgIGV4cGVjdC5hbGwoeyBrZXJuZWxBZGRyZXNzLCBwdWJsaXNoZXJBZGRyZXNzIH0sIHtcbiAgICAgICAgJ2tlcm5lbEFkZHJlc3MnOiB7XG4gICAgICAgICAgICB0eXBlOiAnYWRkcmVzcydcbiAgICAgICAgfSxcbiAgICAgICAgJ3B1Ymxpc2hlckFkZHJlc3MnOiB7XG4gICAgICAgICAgICB0eXBlOiAnYWRkcmVzcydcbiAgICAgICAgfVxuICAgIH0pO1xuXG4gICAgZXhwZWN0LmFsbChjb25maWcsIHtcbiAgICAgICAgJ3dlYjMnOiB7XG4gICAgICAgICAgICB0eXBlOiAnb2JqZWN0JyxcbiAgICAgICAgICAgIGNvZGU6IFdFQjNfUkVRVUlSRURcbiAgICAgICAgfSxcbiAgICAgICAgJ2NvbnRyYWN0cy5QYW5kb3JhTWFya2V0LmFiaSc6IHtcbiAgICAgICAgICAgIHR5cGU6ICdvYmplY3QnLFxuICAgICAgICAgICAgY29kZTogQ09OVFJBQ1RfUkVRVUlSRUQsXG4gICAgICAgICAgICBhcmdzOiBbJ1BhbmRvcmFNYXJrZXQnXVxuICAgICAgICB9LFxuICAgICAgICAnYWRkcmVzc2VzLlBhbmRvcmFNYXJrZXQnOiB7XG4gICAgICAgICAgICB0eXBlOiAnYWRkcmVzcycsXG4gICAgICAgICAgICBjb2RlOiBBRERSRVNTX1JFUVVJUkVELFxuICAgICAgICAgICAgYXJnczogWydLZXJuZWwnXVxuICAgICAgICB9XG4gICAgfSk7XG5cbiAgICBjb25zdCBtYXJrZXQgPSBuZXcgY29uZmlnLndlYjMuZXRoLkNvbnRyYWN0KGNvbmZpZy5jb250cmFjdHMuUGFuZG9yYU1hcmtldC5hYmksIGNvbmZpZy5hZGRyZXNzZXMuUGFuZG9yYU1hcmtldCk7XG4gICAgY29uc3QgZ2FzUHJpY2UgPSBhd2FpdCBjb25maWcud2ViMy5ldGguZ2V0R2FzUHJpY2UoKTtcbiAgICBtYXJrZXQubWV0aG9kc1xuICAgICAgICAucmVtb3ZlS2VybmVsKGtlcm5lbEFkZHJlc3MpXG4gICAgICAgIC5zZW5kKHtcbiAgICAgICAgICAgIGZyb206IHB1Ymxpc2hlckFkZHJlc3MsXG4gICAgICAgICAgICBnYXNQcmljZVxuICAgICAgICB9KVxuICAgICAgICAub24oJ2Vycm9yJywgcmVqZWN0KVxuICAgICAgICAub24oJ3JlY2VpcHQnLCByZWNlaXB0ID0+IHtcblxuICAgICAgICAgICAgaWYgKE51bWJlcihyZWNlaXB0LnN0YXR1cykgPT09IDApIHtcblxuICAgICAgICAgICAgICAgIHJldHVybiByZWplY3QocGpzRXJyb3IoVFJBTlNBQ1RJT05fVU5TVUNDRVNTRlVMKSk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHJlc29sdmUocmVjZWlwdC5jb250cmFjdEFkZHJlc3MpO1xuICAgICAgICB9KTtcbn0pO1xuXG4vKipcbiAqIEhhbmRsZSBldmVudCBLZXJuZWxBZGRlZFxuICogXG4gKiBAcGFyYW0ge09iamVjdH0gb3B0aW9ucyBFdmVudCBoYW5kbGVyIG9wdGlvbnNcbiAqIEBwYXJhbSB7T2JqZWN0fSBjb25maWcgTGlicmFyeSBjb25maWcgKHByb3ZpZGVkIGJ5IHRoZSBwcm94eSBidXQgY2FuIGJlIG92ZXJyaWRkZW4pXG4gKiBAcmV0dXJucyB7UHJvbWlzZTx7T2JqZWN0fT59IFBQcm9taXNlIG9iamVjdCByZXNvbHZlZCB0byB0aGUgb2JqZWN0IHdpdGggY2hhaW5lZCBjYWxsYmFja3MgI2RhdGEgYW5kICNlcnJvclxuICovXG5leHBvcnQgY29uc3QgZXZlbnRLZXJuZWxBZGRlZCA9IGFzeW5jIChvcHRpb25zID0ge30sIGNvbmZpZyA9IHt9KSA9PiB7XG5cbiAgICBleHBlY3QuYWxsKHsgb3B0aW9ucyB9LCB7XG4gICAgICAgICdvcHRpb25zJzoge1xuICAgICAgICAgICAgdHlwZTogJ29iamVjdCdcbiAgICAgICAgfVxuICAgIH0pO1xuXG4gICAgZXhwZWN0LmFsbChjb25maWcsIHtcbiAgICAgICAgJ3dlYjMnOiB7XG4gICAgICAgICAgICB0eXBlOiAnb2JqZWN0JyxcbiAgICAgICAgICAgIGNvZGU6IFdFQjNfUkVRVUlSRURcbiAgICAgICAgfSxcbiAgICAgICAgJ2NvbnRyYWN0cy5QYW5kb3JhTWFya2V0LmFiaSc6IHtcbiAgICAgICAgICAgIHR5cGU6ICdvYmplY3QnLFxuICAgICAgICAgICAgY29kZTogQ09OVFJBQ1RfUkVRVUlSRUQsXG4gICAgICAgICAgICBhcmdzOiBbJ1BhbmRvcmFNYXJrZXQnXVxuICAgICAgICB9LFxuICAgICAgICAnYWRkcmVzc2VzLlBhbmRvcmFNYXJrZXQnOiB7XG4gICAgICAgICAgICB0eXBlOiAnYWRkcmVzcycsXG4gICAgICAgICAgICBjb2RlOiBBRERSRVNTX1JFUVVJUkVELFxuICAgICAgICAgICAgYXJnczogWydLZXJuZWwnXVxuICAgICAgICB9XG4gICAgfSk7XG5cbiAgICBjb25zdCBjYWxsYmFja3MgPSB7XG4gICAgICAgIG9uRGF0YTogKCkgPT4ge30sXG4gICAgICAgIG9uRXJyb3I6ICgpID0+IHt9XG4gICAgfTtcblxuICAgIGNvbnN0IGNoYWluID0ge1xuICAgICAgICBkYXRhOiAoY2IgPSAoKSA9PiB7fSkgPT4ge1xuICAgICAgICAgICAgY2FsbGJhY2tzLm9uRGF0YSA9IGNiO1xuICAgICAgICAgICAgcmV0dXJuIGNoYWluO1xuICAgICAgICB9LFxuICAgICAgICBlcnJvcjogKGNiID0gKCkgPT4ge30pID0+IHtcbiAgICAgICAgICAgIGNhbGxiYWNrcy5vbkVycm9yID0gY2I7XG4gICAgICAgICAgICByZXR1cm4gY2hhaW47XG4gICAgICAgIH0sXG4gICAgICAgIHN1YnNjcmliZWQ6IChjYiA9ICgpID0+IHt9KSA9PiB7Ly8gQHRvZG8gUmVtb3ZlIHN1YnNjcmliZWQgY2FsbGJhY2tcbiAgICAgICAgICAgIGNhbGxiYWNrcy5vblN1YnNjcmliZWQgPSBjYjtcbiAgICAgICAgICAgIHJldHVybiBjaGFpbjtcbiAgICAgICAgfVxuICAgIH07XG5cbiAgICBjb25zdCBtYXIgPSBuZXcgY29uZmlnLndlYjMuZXRoLkNvbnRyYWN0KGNvbmZpZy5jb250cmFjdHMuUGFuZG9yYU1hcmtldC5hYmksIGNvbmZpZy5hZGRyZXNzZXMuUGFuZG9yYU1hcmtldCk7XG4gICAgY2hhaW4uZXZlbnQgPSBbXTtcbiAgICBjaGFpbi5ldmVudFswXSA9IG1hci5ldmVudHMuS2VybmVsQWRkZWQob3B0aW9ucylcbiAgICAgICAgLm9uKCdkYXRhJywgYXN5bmMgZXZlbnQgPT4ge1xuXG4gICAgICAgICAgICB0cnkge1xuXG4gICAgICAgICAgICAgICAgY29uc3Qga2VybmVsID0gYXdhaXQgZmV0Y2hLZXJuZWwoZXZlbnQucmV0dXJuVmFsdWVzLmtlcm5lbCwgY29uZmlnKTtcbiAgICAgICAgICAgICAgICBjYWxsYmFja3Mub25EYXRhKHtcbiAgICAgICAgICAgICAgICAgICAgcmVjb3JkczogW2tlcm5lbF0sXG4gICAgICAgICAgICAgICAgICAgIGV2ZW50XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9IGNhdGNoKGVycikge1xuICAgICAgICAgICAgICAgIGNhbGxiYWNrcy5vbkVycm9yKGVycik7XG4gICAgICAgICAgICB9ICAgICAgICAgICAgXG4gICAgICAgIH0pXG4gICAgICAgIC5vbignZXJyb3InLCBjYWxsYmFja3Mub25FcnJvcik7XG4gICAgY2hhaW4uZXZlbnRbMF0ubmFtZSA9ICdLZXJuZWxBZGRlZCc7XG5cbiAgICByZXR1cm4gY2hhaW47XG59O1xuXG4vKipcbiAqIEhhbmRsZSBldmVudCBLZXJuZWxSZW1vdmVkXG4gKiBcbiAqIEBwYXJhbSB7T2JqZWN0fSBvcHRpb25zIEV2ZW50IGhhbmRsZXIgb3B0aW9uc1xuICogQHBhcmFtIHtPYmplY3R9IGNvbmZpZyBMaWJyYXJ5IGNvbmZpZyAocHJvdmlkZWQgYnkgdGhlIHByb3h5IGJ1dCBjYW4gYmUgb3ZlcnJpZGRlbilcbiAqIEByZXR1cm5zIHtQcm9taXNlPHtPYmplY3R9Pn0gUFByb21pc2Ugb2JqZWN0IHJlc29sdmVkIHRvIHRoZSBvYmplY3Qgd2l0aCBjaGFpbmVkIGNhbGxiYWNrcyAjZGF0YSBhbmQgI2Vycm9yXG4gKi9cbmV4cG9ydCBjb25zdCBldmVudEtlcm5lbFJlbW92ZWQgPSBhc3luYyAob3B0aW9ucyA9IHt9LCBjb25maWcgPSB7fSkgPT4ge1xuXG4gICAgZXhwZWN0LmFsbCh7IG9wdGlvbnMgfSwge1xuICAgICAgICAnb3B0aW9ucyc6IHtcbiAgICAgICAgICAgIHR5cGU6ICdvYmplY3QnXG4gICAgICAgIH1cbiAgICB9KTtcblxuICAgIGV4cGVjdC5hbGwoY29uZmlnLCB7XG4gICAgICAgICd3ZWIzJzoge1xuICAgICAgICAgICAgdHlwZTogJ29iamVjdCcsXG4gICAgICAgICAgICBjb2RlOiBXRUIzX1JFUVVJUkVEXG4gICAgICAgIH0sXG4gICAgICAgICdjb250cmFjdHMuUGFuZG9yYU1hcmtldC5hYmknOiB7XG4gICAgICAgICAgICB0eXBlOiAnb2JqZWN0JyxcbiAgICAgICAgICAgIGNvZGU6IENPTlRSQUNUX1JFUVVJUkVELFxuICAgICAgICAgICAgYXJnczogWydQYW5kb3JhTWFya2V0J11cbiAgICAgICAgfSxcbiAgICAgICAgJ2FkZHJlc3Nlcy5QYW5kb3JhTWFya2V0Jzoge1xuICAgICAgICAgICAgdHlwZTogJ2FkZHJlc3MnLFxuICAgICAgICAgICAgY29kZTogQUREUkVTU19SRVFVSVJFRCxcbiAgICAgICAgICAgIGFyZ3M6IFsnUGFuZG9yYU1hcmtldCddXG4gICAgICAgIH1cbiAgICB9KTtcblxuICAgIGNvbnN0IGNhbGxiYWNrcyA9IHtcbiAgICAgICAgb25EYXRhOiAoKSA9PiB7fSxcbiAgICAgICAgb25FcnJvcjogKCkgPT4ge31cbiAgICB9O1xuXG4gICAgY29uc3QgY2hhaW4gPSB7XG4gICAgICAgIGRhdGE6IChjYiA9ICgpID0+IHt9KSA9PiB7XG4gICAgICAgICAgICBjYWxsYmFja3Mub25EYXRhID0gY2I7XG4gICAgICAgICAgICByZXR1cm4gY2hhaW47XG4gICAgICAgIH0sXG4gICAgICAgIGVycm9yOiAoY2IgPSAoKSA9PiB7fSkgPT4ge1xuICAgICAgICAgICAgY2FsbGJhY2tzLm9uRXJyb3IgPSBjYjtcbiAgICAgICAgICAgIHJldHVybiBjaGFpbjtcbiAgICAgICAgfVxuICAgIH07XG5cbiAgICBjb25zdCBtYXIgPSBuZXcgY29uZmlnLndlYjMuZXRoLkNvbnRyYWN0KGNvbmZpZy5jb250cmFjdHMuUGFuZG9yYU1hcmtldC5hYmksIGNvbmZpZy5hZGRyZXNzZXMuUGFuZG9yYU1hcmtldCk7XG4gICAgY2hhaW4uZXZlbnQgPSBbXTtcbiAgICBjaGFpbi5ldmVudFswXSA9IG1hci5ldmVudHMuS2VybmVsUmVtb3ZlZChvcHRpb25zKVxuICAgICAgICAub24oJ2RhdGEnLCBhc3luYyBldmVudCA9PiB7XG5cbiAgICAgICAgICAgIGNhbGxiYWNrcy5vbkRhdGEoe1xuICAgICAgICAgICAgICAgIHJlY29yZHM6IFt7YWRkcmVzczogZXZlbnQucmV0dXJuVmFsdWVzLmtlcm5lbH1dLFxuICAgICAgICAgICAgICAgIGV2ZW50XG4gICAgICAgICAgICB9KTsgICAgICAgICAgICBcbiAgICAgICAgfSlcbiAgICAgICAgLm9uKCdlcnJvcicsIGNhbGxiYWNrcy5vbkVycm9yKTtcbiAgICBjaGFpbi5ldmVudFswXS5uYW1lID0gJ0tlcm5lbFJlbW92ZWQnO1xuXG4gICAgcmV0dXJuIGNoYWluO1xufTtcbiJdfQ==