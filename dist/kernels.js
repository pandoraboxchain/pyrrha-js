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
 * @returns {Promise} A Promise object represents the {string}
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
 * @param {string} address
 * @param {Object} config Library config (provided by the proxy but can be overridden)
 * @returns {Promise} A Promise object represents the {string}
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
 * @param {string} address
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
 * @param {string} address
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
 * @param {string} address
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
 * @param {string} address
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
 * @param {string} address
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
 * @param {string} address
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
 * @param {string} kernelIpfsHash 
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
 * @returns {Promise} Promise object resolved to {string} contractAddress // can be null if used ganache-cli environment
 */


exports.deploy = deploy;

const addToMarket = (kernelContractAddress, publisherAddress, config = {}) => new Promise((resolve, reject) => {
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
 * @returns {Promise} Promise object resolved to {String} contractAddress
 */


exports.addToMarket = addToMarket;

const removeKernel = (kernelAddress, publisherAddress, config = {}) => new Promise((resolve, reject) => {
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
 * @returns {Object} Object with chained callbacks #data and #error
 */


exports.removeKernel = removeKernel;

const eventKernelAdded = (options = {}, config = {}) => {
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
      callbacks.onSubscribed = cb;
      return chain;
    }
  };
  const mar = new config.web3.eth.Contract(config.contracts.PandoraMarket.abi, config.addresses.PandoraMarket);
  chain.event = mar.events.KernelAdded(options).on('data', async res => {
    try {
      const kernel = await fetchKernel(res.returnValues.kernel, config);
      callbacks.onData({
        address: res.returnValues.kernel,
        kernel,
        status: 'created',
        event: 'PandoraMarket.KernelAdded'
      });
    } catch (err) {
      callbacks.onError(err);
    }
  }).on('error', callbacks.onError);
  return chain;
};
/**
 * Handle event KernelRemoved
 * 
 * @param {Object} options Event handler options
 * @param {Object} config Library config (provided by the proxy but can be overridden)
 * @returns {Object} Object with chained callbacks #data and #error
 */


exports.eventKernelAdded = eventKernelAdded;

const eventKernelRemoved = (options = {}, config = {}) => {
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
  chain.event = mar.events.KernelRemoved(options).on('data', async res => {
    callbacks.onData({
      address: res.returnValues.kernel,
      status: 'removed',
      event: 'PandoraMarket.KernelRemoved'
    });
  }).on('error', callbacks.onError);
  return chain;
};

exports.eventKernelRemoved = eventKernelRemoved;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9rZXJuZWxzLmpzIl0sIm5hbWVzIjpbImZldGNoQ291bnQiLCJjb25maWciLCJleHBlY3QiLCJhbGwiLCJ0eXBlIiwiY29kZSIsIldFQjNfUkVRVUlSRUQiLCJDT05UUkFDVF9SRVFVSVJFRCIsImFyZ3MiLCJBRERSRVNTX1JFUVVJUkVEIiwibWFyIiwid2ViMyIsImV0aCIsIkNvbnRyYWN0IiwiY29udHJhY3RzIiwiUGFuZG9yYU1hcmtldCIsImFiaSIsImFkZHJlc3NlcyIsImNvdW50IiwibWV0aG9kcyIsImtlcm5lbHNDb3VudCIsImNhbGwiLCJOdW1iZXIiLCJwYXJzZUludCIsImZldGNoQWRkcmVzc0J5SWQiLCJpZCIsImtlcm5lbENvbnRyYWN0Iiwia2VybmVscyIsImZldGNoSXBmc0FkZHJlc3MiLCJhZGRyZXNzIiwia2VyIiwiS2VybmVsIiwiaXBmc0FkZHJlc3MiLCJ1dGlscyIsImhleFRvQXNjaWkiLCJmZXRjaERhdGFEaW0iLCJkYXRhRGltIiwiZmV0Y2hDdXJyZW50UHJpY2UiLCJjdXJyZW50UHJpY2UiLCJmZXRjaENvbXBsZXhpdHkiLCJjb21wbGV4aXR5IiwiZmV0Y2hEZXNjcmlwdGlvbiIsImRlc2NyaXB0aW9uIiwiaGV4VG9VdGY4IiwiZmV0Y2hNZXRhZGF0YSIsIm1ldGFkYXRhIiwiZmV0Y2hLZXJuZWwiLCJQcm9taXNlIiwiZmV0Y2hLZXJuZWxCeUlkIiwia2VybmVsIiwiZmV0Y2hBbGwiLCJyZWNvcmRzIiwiZXJyb3IiLCJpIiwicHVzaCIsImVyciIsIm1lc3NhZ2UiLCJkZXBsb3kiLCJrZXJuZWxJcGZzSGFzaCIsImRpbWVuc2lvbiIsInByaWNlIiwicHVibGlzaGVyIiwidXRmOFRvSGV4IiwiZ2FzIiwid2ViM0hlbHBlcnMiLCJlc3RpbWF0ZUdhcyIsImJ5dGVjb2RlIiwia2VybmVsQ29udHJhY3RBZGRyZXNzIiwiZGVwbG95Q29udHJhY3QiLCJmcm9tIiwiYWRkVG9NYXJrZXQiLCJwdWJsaXNoZXJBZGRyZXNzIiwicmVzb2x2ZSIsInJlamVjdCIsIldFQjNfTUVUQU1BU0tfUkVRVUlSRUQiLCJtYXJrZXQiLCJhZGRLZXJuZWwiLCJzZW5kIiwib24iLCJyZWNlaXB0Iiwic3RhdHVzIiwiVFJBTlNBQ1RJT05fVU5TVUNDRVNTRlVMIiwiY29udHJhY3RBZGRyZXNzIiwiZXZlbnRzIiwiS2VybmVsQWRkZWQiLCJyZXR1cm5WYWx1ZXMiLCJyZW1vdmVLZXJuZWwiLCJrZXJuZWxBZGRyZXNzIiwiZXZlbnRLZXJuZWxBZGRlZCIsIm9wdGlvbnMiLCJjYWxsYmFja3MiLCJvbkRhdGEiLCJvbkVycm9yIiwiY2hhaW4iLCJkYXRhIiwiY2IiLCJzdWJzY3JpYmVkIiwib25TdWJzY3JpYmVkIiwiZXZlbnQiLCJyZXMiLCJldmVudEtlcm5lbFJlbW92ZWQiLCJLZXJuZWxSZW1vdmVkIl0sIm1hcHBpbmdzIjoiQUFBQTs7Ozs7Ozs7QUFTQTs7Ozs7OztBQUVBOztBQUNBOztBQU9BOzs7Ozs7OztBQUVBOzs7Ozs7QUFNTyxNQUFNQSxhQUFhLE9BQU9DLFNBQVMsRUFBaEIsS0FBdUI7QUFFN0NDLFNBQU9DLEdBQVAsQ0FBV0YsTUFBWCxFQUFtQjtBQUNmLFlBQVE7QUFDSkcsWUFBTSxRQURGO0FBRUpDLFlBQU1DO0FBRkYsS0FETztBQUtmLG1DQUErQjtBQUMzQkYsWUFBTSxRQURxQjtBQUUzQkMsWUFBTUUseUJBRnFCO0FBRzNCQyxZQUFNLENBQUMsZUFBRDtBQUhxQixLQUxoQjtBQVVmLCtCQUEyQjtBQUN2QkosWUFBTSxTQURpQjtBQUV2QkMsWUFBTUksd0JBRmlCO0FBR3ZCRCxZQUFNLENBQUMsZUFBRDtBQUhpQjtBQVZaLEdBQW5CO0FBaUJBLFFBQU1FLE1BQU0sSUFBSVQsT0FBT1UsSUFBUCxDQUFZQyxHQUFaLENBQWdCQyxRQUFwQixDQUE2QlosT0FBT2EsU0FBUCxDQUFpQkMsYUFBakIsQ0FBK0JDLEdBQTVELEVBQWlFZixPQUFPZ0IsU0FBUCxDQUFpQkYsYUFBbEYsQ0FBWjtBQUNBLFFBQU1HLFFBQVEsTUFBTVIsSUFBSVMs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VlosR0FBbkI7QUFpQkEsUUFBTWtGLFlBQVk7QUFDZEMsWUFBUSxNQUFNLENBQUUsQ0FERjtBQUVkQyxhQUFTLE1BQU0sQ0FBRTtBQUZILEdBQWxCO0FBS0EsUUFBTUMsUUFBUTtBQUNWQyxVQUFNLENBQUNDLEtBQUssTUFBTSxDQUFFLENBQWQsS0FBbUI7QUFDckJMLGdCQUFVQyxNQUFWLEdBQW1CSSxFQUFuQjtBQUNBLGFBQU9GLEtBQVA7QUFDSCxLQUpTO0FBS1Z6QyxXQUFPLENBQUMyQyxLQUFLLE1BQU0sQ0FBRSxDQUFkLEtBQW1CO0FBQ3RCTCxnQkFBVUUsT0FBVixHQUFvQkcsRUFBcEI7QUFDQSxhQUFPRixLQUFQO0FBQ0g7QUFSUyxHQUFkO0FBV0EsUUFBTW5GLE1BQU0sSUFBSVQsT0FBT1UsSUFBUCxDQUFZQyxHQUFaLENBQWdCQyxRQUFwQixDQUE2QlosT0FBT2EsU0FBUCxDQUFpQkMsYUFBakIsQ0FBK0JDLEdBQTVELEVBQWlFZixPQUFPZ0IsU0FBUCxDQUFpQkYsYUFBbEYsQ0FBWjtBQUNBOEUsUUFBTUssS0FBTixHQUFjeEYsSUFBSXlFLE1BQUosQ0FBV2tCLGFBQVgsQ0FBeUJaLE9BQXpCLEVBQ1RYLEVBRFMsQ0FDTixNQURNLEVBQ0UsTUFBTXFCLEdBQU4sSUFBYTtBQUVyQlQsY0FBVUMsTUFBVixDQUFpQjtBQUNiOUQsZUFBU3NFLElBQUlkLFlBQUosQ0FBaUJwQyxNQURiO0FBRWIrQixjQUFRLFNBRks7QUFHYmtCLGFBQU87QUFITSxLQUFqQjtBQUtILEdBUlMsRUFTVHBCLEVBVFMsQ0FTTixPQVRNLEVBU0dZLFVBQVVFLE9BVGIsQ0FBZDtBQVdBLFNBQU9DLEtBQVA7QUFDSCxDQXRETSIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogS2VybmVscyByZWxhdGVkIG1ldGhvZHNcbiAqIFRoaXMgZmlsZSBpdCBpcyBhIHBhcnQgb2YgdGhlIFBhbmRvcmEgUHlycmhhIEphdmFzY3JpcHQgbGlicmFyeVxuICogXG4gKiBAZmlsZSBrZXJuZWxzLmpzXG4gKiBAYXV0aG9yIEtvc3RpYW50eW4gU215cm5vdiA8a29zdHlzaEBnbWFpbC5jb20+XG4gKiBAZGF0ZSAyMDE4XG4gKi9cblxuJ3VzZSBzdHJpY3QnO1xuXG5pbXBvcnQgKiBhcyBleHBlY3QgZnJvbSAnLi9oZWxwZXJzL2V4cGVjdCc7XG5pbXBvcnQgcGpzRXJyb3IsIHtcbiAgICBDT05UUkFDVF9SRVFVSVJFRCxcbiAgICBBRERSRVNTX1JFUVVJUkVELFxuICAgIFdFQjNfUkVRVUlSRUQsXG4gICAgV0VCM19NRVRBTUFTS19SRVFVSVJFRCxcbiAgICBUUkFOU0FDVElPTl9VTlNVQ0NFU1NGVUxcbn0gZnJvbSAnLi9oZWxwZXJzL2Vycm9ycyc7XG5pbXBvcnQgKiBhcyB3ZWIzSGVscGVycyBmcm9tICcuL2hlbHBlcnMvd2ViMyc7XG5cbi8qKlxuICogR2V0IGtlcm5lbHMgY291bnQgZnJvbSBQYW5kb3JhTWFya2V0IGNvbnRyYWN0XG4gKiBcbiAqIEBwYXJhbSB7T2JqZWN0fSBjb25maWcgTGlicmFyeSBjb25maWcgKHByb3ZpZGVkIGJ5IHRoZSBwcm94eSBidXQgY2FuIGJlIG92ZXJyaWRkZW4pXG4gKiBAcmV0dXJucyB7UHJvbWlzZX0gQSBQcm9taXNlIG9iamVjdCByZXByZXNlbnRzIHRoZSB7bnVtYmVyfSBcbiAqL1xuZXhwb3J0IGNvbnN0IGZldGNoQ291bnQgPSBhc3luYyAoY29uZmlnID0ge30pID0+IHtcblxuICAgIGV4cGVjdC5hbGwoY29uZmlnLCB7XG4gICAgICAgICd3ZWIzJzoge1xuICAgICAgICAgICAgdHlwZTogJ29iamVjdCcsXG4gICAgICAgICAgICBjb2RlOiBXRUIzX1JFUVVJUkVEXG4gICAgICAgIH0sXG4gICAgICAgICdjb250cmFjdHMuUGFuZG9yYU1hcmtldC5hYmknOiB7XG4gICAgICAgICAgICB0eXBlOiAnb2JqZWN0JyxcbiAgICAgICAgICAgIGNvZGU6IENPTlRSQUNUX1JFUVVJUkVELFxuICAgICAgICAgICAgYXJnczogWydQYW5kb3JhTWFya2V0J11cbiAgICAgICAgfSxcbiAgICAgICAgJ2FkZHJlc3Nlcy5QYW5kb3JhTWFya2V0Jzoge1xuICAgICAgICAgICAgdHlwZTogJ2FkZHJlc3MnLFxuICAgICAgICAgICAgY29kZTogQUREUkVTU19SRVFVSVJFRCxcbiAgICAgICAgICAgIGFyZ3M6IFsnUGFuZG9yYU1hcmtldCddXG4gICAgICAgIH1cbiAgICB9KTtcblxuICAgIGNvbnN0IG1hciA9IG5ldyBjb25maWcud2ViMy5ldGguQ29udHJhY3QoY29uZmlnLmNvbnRyYWN0cy5QYW5kb3JhTWFya2V0LmFiaSwgY29uZmlnLmFkZHJlc3Nlcy5QYW5kb3JhTWFya2V0KTtcbiAgICBjb25zdCBjb3VudCA9IGF3YWl0IG1hci5tZXRob2RzXG4gICAgICAgIC5rZXJuZWxzQ291bnQoKVxuICAgICAgICAuY2FsbCgpO1xuXG4gICAgcmV0dXJuIE51bWJlci5wYXJzZUludChjb3VudCwgMTApO1xufTtcblxuLyoqXG4gKiBHZXQgS2VybmVsIGFkZHJlc3MgYnkga2VybmVsIGlkXG4gKiBcbiAqIEBwYXJhbSB7bnVtYmVyfSBpZFxuICogQHBhcmFtIHtPYmplY3R9IGNvbmZpZyBMaWJyYXJ5IGNvbmZpZyAocHJvdmlkZWQgYnkgdGhlIHByb3h5IGJ1dCBjYW4gYmUgb3ZlcnJpZGRlbilcbiAqIEByZXR1cm5zIHtQcm9taXNlfSBBIFByb21pc2Ugb2JqZWN0IHJlcHJlc2VudHMgdGhlIHtzdHJpbmd9XG4gKi9cbmV4cG9ydCBjb25zdCBmZXRjaEFkZHJlc3NCeUlkID0gYXN5bmMgKGlkLCBjb25maWcgPSB7fSkgPT4ge1xuXG4gICAgZXhwZWN0LmFsbCh7IGlkIH0sIHtcbiAgICAgICAgJ2lkJzoge1xuICAgICAgICAgICAgdHlwZTogJ251bWJlcidcbiAgICAgICAgfVxuICAgIH0pO1xuXG4gICAgZXhwZWN0LmFsbChjb25maWcsIHtcbiAgICAgICAgJ3dlYjMnOiB7XG4gICAgICAgICAgICB0eXBlOiAnb2JqZWN0JyxcbiAgICAgICAgICAgIGNvZGU6IFdFQjNfUkVRVUlSRURcbiAgICAgICAgfSxcbiAgICAgICAgJ2NvbnRyYWN0cy5QYW5kb3JhTWFya2V0LmFiaSc6IHtcbiAgICAgICAgICAgIHR5cGU6ICdvYmplY3QnLFxuICAgICAgICAgICAgY29kZTogQ09OVFJBQ1RfUkVRVUlSRUQsXG4gICAgICAgICAgICBhcmdzOiBbJ1BhbmRvcmFNYXJrZXQnXVxuICAgICAgICB9LFxuICAgICAgICAnYWRkcmVzc2VzLlBhbmRvcmFNYXJrZXQnOiB7XG4gICAgICAgICAgICB0eXBlOiAnYWRkcmVzcycsXG4gICAgICAgICAgICBjb2RlOiBBRERSRVNTX1JFUVVJUkVELFxuICAgICAgICAgICAgYXJnczogWydQYW5kb3JhTWFya2V0J11cbiAgICAgICAgfVxuICAgIH0pO1xuXG4gICAgY29uc3QgbWFyID0gbmV3IGNvbmZpZy53ZWIzLmV0aC5Db250cmFjdChjb25maWcuY29udHJhY3RzLlBhbmRvcmFNYXJrZXQuYWJpLCBjb25maWcuYWRkcmVzc2VzLlBhbmRvcmFNYXJrZXQpO1xuICAgIGNvbnN0IGtlcm5lbENvbnRyYWN0ID0gYXdhaXQgbWFyLm1ldGhvZHNcbiAgICAgICAgLmtlcm5lbHMoaWQpXG4gICAgICAgIC5jYWxsKCk7XG5cbiAgICByZXR1cm4ga2VybmVsQ29udHJhY3Q7XG59O1xuXG4vKipcbiAqIEdldCBJUEZTIGFkZHJlc3MgZnJvbSBLZXJuZWwgY29udHJhY3QgYnkgdGhlIGtlcm5lbCBhZGRyZXNzXG4gKiBcbiAqIEBwYXJhbSB7c3RyaW5nfSBhZGRyZXNzXG4gKiBAcGFyYW0ge09iamVjdH0gY29uZmlnIExpYnJhcnkgY29uZmlnIChwcm92aWRlZCBieSB0aGUgcHJveHkgYnV0IGNhbiBiZSBvdmVycmlkZGVuKVxuICogQHJldHVybnMge1Byb21pc2V9IEEgUHJvbWlzZSBvYmplY3QgcmVwcmVzZW50cyB0aGUge3N0cmluZ31cbiAqL1xuZXhwb3J0IGNvbnN0IGZldGNoSXBmc0FkZHJlc3MgPSBhc3luYyAoYWRkcmVzcyA9ICcnLCBjb25maWcgPSB7fSkgPT4ge1xuXG4gICAgZXhwZWN0LmFsbCh7IGFkZHJlc3MgfSwge1xuICAgICAgICAnYWRkcmVzcyc6IHtcbiAgICAgICAgICAgIHR5cGU6ICdhZGRyZXNzJ1xuICAgICAgICB9XG4gICAgfSk7XG5cbiAgICBleHBlY3QuYWxsKGNvbmZpZywge1xuICAgICAgICAnd2ViMyc6IHtcbiAgICAgICAgICAgIHR5cGU6ICdvYmplY3QnLFxuICAgICAgICAgICAgY29kZTogV0VCM19SRVFVSVJFRFxuICAgICAgICB9LFxuICAgICAgICAnY29udHJhY3RzLktlcm5lbC5hYmknOiB7XG4gICAgICAgICAgICB0eXBlOiAnb2JqZWN0JyxcbiAgICAgICAgICAgIGNvZGU6IENPTlRSQUNUX1JFUVVJUkVELFxuICAgICAgICAgICAgYXJnczogWydLZXJuZWwnXVxuICAgICAgICB9XG4gICAgfSk7XG5cbiAgICBjb25zdCBrZXIgPSBuZXcgY29uZmlnLndlYjMuZXRoLkNvbnRyYWN0KGNvbmZpZy5jb250cmFjdHMuS2VybmVsLmFiaSwgYWRkcmVzcyk7XG4gICAgY29uc3QgaXBmc0FkZHJlc3MgPSBhd2FpdCBrZXIubWV0aG9kc1xuICAgICAgICAuaXBmc0FkZHJlc3MoKVxuICAgICAgICAuY2FsbCgpO1xuXG4gICAgcmV0dXJuIGNvbmZpZy53ZWIzLnV0aWxzLmhleFRvQXNjaWkoaXBmc0FkZHJlc3MpO1xufTtcblxuLyoqXG4gKiBHZXQgZGF0YSBkaW0gZnJvbSBLZXJuZWwgY29udHJhY3QgYnkgdGhlIGtlcm5lbCBhZGRyZXNzXG4gKiBcbiAqIEBwYXJhbSB7c3RyaW5nfSBhZGRyZXNzXG4gKiBAcGFyYW0ge09iamVjdH0gY29uZmlnIExpYnJhcnkgY29uZmlnIChwcm92aWRlZCBieSB0aGUgcHJveHkgYnV0IGNhbiBiZSBvdmVycmlkZGVuKVxuICogQHJldHVybnMge1Byb21pc2V9IEEgUHJvbWlzZSBvYmplY3QgcmVwcmVzZW50cyB0aGUge251bWJlcn1cbiAqL1xuZXhwb3J0IGNvbnN0IGZldGNoRGF0YURpbSA9IGFzeW5jIChhZGRyZXNzID0gJycsIGNvbmZpZyA9IHt9KSA9PiB7XG5cbiAgICBleHBlY3QuYWxsKHsgYWRkcmVzcyB9LCB7XG4gICAgICAgICdhZGRyZXNzJzoge1xuICAgICAgICAgICAgdHlwZTogJ2FkZHJlc3MnXG4gICAgICAgIH1cbiAgICB9KTtcblxuICAgIGV4cGVjdC5hbGwoY29uZmlnLCB7XG4gICAgICAgICd3ZWIzJzoge1xuICAgICAgICAgICAgdHlwZTogJ29iamVjdCcsXG4gICAgICAgICAgICBjb2RlOiBXRUIzX1JFUVVJUkVEXG4gICAgICAgIH0sXG4gICAgICAgICdjb250cmFjdHMuS2VybmVsLmFiaSc6IHtcbiAgICAgICAgICAgIHR5cGU6ICdvYmplY3QnLFxuICAgICAgICAgICAgY29kZTogQ09OVFJBQ1RfUkVRVUlSRUQsXG4gICAgICAgICAgICBhcmdzOiBbJ0tlcm5lbCddXG4gICAgICAgIH1cbiAgICB9KTtcblxuICAgIGNvbnN0IGtlciA9IG5ldyBjb25maWcud2ViMy5ldGguQ29udHJhY3QoY29uZmlnLmNvbnRyYWN0cy5LZXJuZWwuYWJpLCBhZGRyZXNzKTtcbiAgICBjb25zdCBkYXRhRGltID0gYXdhaXQga2VyLm1ldGhvZHNcbiAgICAgICAgLmRhdGFEaW0oKVxuICAgICAgICAuY2FsbCgpO1xuXG4gICAgcmV0dXJuIE51bWJlci5wYXJzZUludChkYXRhRGltLCAxMCk7XG59O1xuXG4vKipcbiAqIEdldCBjdXJyZW50IHByaWNlIGZyb20gS2VybmVsIGNvbnRyYWN0IGJ5IHRoZSBrZXJuZWwgYWRkcmVzc1xuICogXG4gKiBAcGFyYW0ge3N0cmluZ30gYWRkcmVzc1xuICogQHBhcmFtIHtPYmplY3R9IGNvbmZpZyBMaWJyYXJ5IGNvbmZpZyAocHJvdmlkZWQgYnkgdGhlIHByb3h5IGJ1dCBjYW4gYmUgb3ZlcnJpZGRlbilcbiAqIEByZXR1cm5zIHtQcm9taXNlfSBBIFByb21pc2Ugb2JqZWN0IHJlcHJlc2VudHMgdGhlIHtudW1iZXJ9XG4gKi9cbmV4cG9ydCBjb25zdCBmZXRjaEN1cnJlbnRQcmljZSA9IGFzeW5jIChhZGRyZXNzID0gJycsIGNvbmZpZyA9IHt9KSA9PiB7XG5cbiAgICBleHBlY3QuYWxsKHsgYWRkcmVzcyB9LCB7XG4gICAgICAgICdhZGRyZXNzJzoge1xuICAgICAgICAgICAgdHlwZTogJ2FkZHJlc3MnXG4gICAgICAgIH1cbiAgICB9KTtcblxuICAgIGV4cGVjdC5hbGwoY29uZmlnLCB7XG4gICAgICAgICd3ZWIzJzoge1xuICAgICAgICAgICAgdHlwZTogJ29iamVjdCcsXG4gICAgICAgICAgICBjb2RlOiBXRUIzX1JFUVVJUkVEXG4gICAgICAgIH0sXG4gICAgICAgICdjb250cmFjdHMuS2VybmVsLmFiaSc6IHtcbiAgICAgICAgICAgIHR5cGU6ICdvYmplY3QnLFxuICAgICAgICAgICAgY29kZTogQ09OVFJBQ1RfUkVRVUlSRUQsXG4gICAgICAgICAgICBhcmdzOiBbJ0tlcm5lbCddXG4gICAgICAgIH1cbiAgICB9KTtcblxuICAgIGNvbnN0IGtlciA9IG5ldyBjb25maWcud2ViMy5ldGguQ29udHJhY3QoY29uZmlnLmNvbnRyYWN0cy5LZXJuZWwuYWJpLCBhZGRyZXNzKTtcbiAgICBjb25zdCBjdXJyZW50UHJpY2UgPSBhd2FpdCBrZXIubWV0aG9kc1xuICAgICAgICAuY3VycmVudFByaWNlKClcbiAgICAgICAgLmNhbGwoKTtcblxuICAgIHJldHVybiBOdW1iZXIucGFyc2VJbnQoY3VycmVudFByaWNlLCAxMCk7XG59O1xuXG4vKipcbiAqIEdldCBjb21wbGV4aXR5IGZyb20gS2VybmVsIGNvbnRyYWN0IGJ5IHRoZSBrZXJuZWwgYWRkcmVzc1xuICogXG4gKiBAcGFyYW0ge3N0cmluZ30gYWRkcmVzc1xuICogQHBhcmFtIHtPYmplY3R9IGNvbmZpZyBMaWJyYXJ5IGNvbmZpZyAocHJvdmlkZWQgYnkgdGhlIHByb3h5IGJ1dCBjYW4gYmUgb3ZlcnJpZGRlbilcbiAqIEByZXR1cm5zIHtQcm9taXNlfSBBIFByb21pc2Ugb2JqZWN0IHJlcHJlc2VudHMgdGhlIHtudW1iZXJ9XG4gKi9cbmV4cG9ydCBjb25zdCBmZXRjaENvbXBsZXhpdHkgPSBhc3luYyAoYWRkcmVzcyA9ICcnLCBjb25maWcgPSB7fSkgPT4ge1xuXG4gICAgZXhwZWN0LmFsbCh7IGFkZHJlc3MgfSwge1xuICAgICAgICAnYWRkcmVzcyc6IHtcbiAgICAgICAgICAgIHR5cGU6ICdhZGRyZXNzJ1xuICAgICAgICB9XG4gICAgfSk7XG5cbiAgICBleHBlY3QuYWxsKGNvbmZpZywge1xuICAgICAgICAnd2ViMyc6IHtcbiAgICAgICAgICAgIHR5cGU6ICdvYmplY3QnLFxuICAgICAgICAgICAgY29kZTogV0VCM19SRVFVSVJFRFxuICAgICAgICB9LFxuICAgICAgICAnY29udHJhY3RzLktlcm5lbC5hYmknOiB7XG4gICAgICAgICAgICB0eXBlOiAnb2JqZWN0JyxcbiAgICAgICAgICAgIGNvZGU6IENPTlRSQUNUX1JFUVVJUkVELFxuICAgICAgICAgICAgYXJnczogWydLZXJuZWwnXVxuICAgICAgICB9XG4gICAgfSk7XG5cbiAgICBjb25zdCBrZXIgPSBuZXcgY29uZmlnLndlYjMuZXRoLkNvbnRyYWN0KGNvbmZpZy5jb250cmFjdHMuS2VybmVsLmFiaSwgYWRkcmVzcyk7XG4gICAgY29uc3QgY29tcGxleGl0eSA9IGF3YWl0IGtlci5tZXRob2RzXG4gICAgICAgIC5jb21wbGV4aXR5KClcbiAgICAgICAgLmNhbGwoKTtcblxuICAgIHJldHVybiBOdW1iZXIucGFyc2VJbnQoY29tcGxleGl0eSwgMTApO1xufTtcblxuLyoqXG4gKiBHZXQgZGVzY3JpcHRpb24gZnJvbSBLZXJuZWwgY29udHJhY3QgYnkgdGhlIGtlcm5lbCBhZGRyZXNzXG4gKiBcbiAqIEBwYXJhbSB7c3RyaW5nfSBhZGRyZXNzXG4gKiBAcGFyYW0ge09iamVjdH0gY29uZmlnIExpYnJhcnkgY29uZmlnIChwcm92aWRlZCBieSB0aGUgcHJveHkgYnV0IGNhbiBiZSBvdmVycmlkZGVuKVxuICogQHJldHVybnMge1Byb21pc2V9IEEgUHJvbWlzZSBvYmplY3QgcmVwcmVzZW50cyB0aGUge251bWJlcn1cbiAqL1xuZXhwb3J0IGNvbnN0IGZldGNoRGVzY3JpcHRpb24gPSBhc3luYyAoYWRkcmVzcyA9ICcnLCBjb25maWcgPSB7fSkgPT4ge1xuXG4gICAgZXhwZWN0LmFsbCh7IGFkZHJlc3MgfSwge1xuICAgICAgICAnYWRkcmVzcyc6IHtcbiAgICAgICAgICAgIHR5cGU6ICdhZGRyZXNzJ1xuICAgICAgICB9XG4gICAgfSk7XG5cbiAgICBleHBlY3QuYWxsKGNvbmZpZywge1xuICAgICAgICAnd2ViMyc6IHtcbiAgICAgICAgICAgIHR5cGU6ICdvYmplY3QnLFxuICAgICAgICAgICAgY29kZTogV0VCM19SRVFVSVJFRFxuICAgICAgICB9LFxuICAgICAgICAnY29udHJhY3RzLktlcm5lbC5hYmknOiB7XG4gICAgICAgICAgICB0eXBlOiAnb2JqZWN0JyxcbiAgICAgICAgICAgIGNvZGU6IENPTlRSQUNUX1JFUVVJUkVELFxuICAgICAgICAgICAgYXJnczogWydLZXJuZWwnXVxuICAgICAgICB9XG4gICAgfSk7XG5cbiAgICBjb25zdCBrZXIgPSBuZXcgY29uZmlnLndlYjMuZXRoLkNvbnRyYWN0KGNvbmZpZy5jb250cmFjdHMuS2VybmVsLmFiaSwgYWRkcmVzcyk7XG4gICAgY29uc3QgZGVzY3JpcHRpb24gPSBhd2FpdCBrZXIubWV0aG9kc1xuICAgICAgICAuZGVzY3JpcHRpb24oKVxuICAgICAgICAuY2FsbCgpO1xuXG4gICAgcmV0dXJuIGNvbmZpZy53ZWIzLnV0aWxzLmhleFRvVXRmOChkZXNjcmlwdGlvbik7XG59O1xuXG4vKipcbiAqIEdldCBtZXRhZGF0YSBmcm9tIEtlcm5lbCBjb250cmFjdCBieSB0aGUga2VybmVsIGFkZHJlc3NcbiAqIFxuICogQHBhcmFtIHtzdHJpbmd9IGFkZHJlc3NcbiAqIEBwYXJhbSB7T2JqZWN0fSBjb25maWcgTGlicmFyeSBjb25maWcgKHByb3ZpZGVkIGJ5IHRoZSBwcm94eSBidXQgY2FuIGJlIG92ZXJyaWRkZW4pXG4gKiBAcmV0dXJucyB7UHJvbWlzZX0gQSBQcm9taXNlIG9iamVjdCByZXByZXNlbnRzIHRoZSB7bnVtYmVyfVxuICovXG5leHBvcnQgY29uc3QgZmV0Y2hNZXRhZGF0YSA9IGFzeW5jIChhZGRyZXNzID0gJycsIGNvbmZpZyA9IHt9KSA9PiB7XG5cbiAgICBleHBlY3QuYWxsKHsgYWRkcmVzcyB9LCB7XG4gICAgICAgICdhZGRyZXNzJzoge1xuICAgICAgICAgICAgdHlwZTogJ2FkZHJlc3MnXG4gICAgICAgIH1cbiAgICB9KTtcblxuICAgIGV4cGVjdC5hbGwoY29uZmlnLCB7XG4gICAgICAgICd3ZWIzJzoge1xuICAgICAgICAgICAgdHlwZTogJ29iamVjdCcsXG4gICAgICAgICAgICBjb2RlOiBXRUIzX1JFUVVJUkVEXG4gICAgICAgIH0sXG4gICAgICAgICdjb250cmFjdHMuS2VybmVsLmFiaSc6IHtcbiAgICAgICAgICAgIHR5cGU6ICdvYmplY3QnLFxuICAgICAgICAgICAgY29kZTogQ09OVFJBQ1RfUkVRVUlSRUQsXG4gICAgICAgICAgICBhcmdzOiBbJ0tlcm5lbCddXG4gICAgICAgIH1cbiAgICB9KTtcblxuICAgIGNvbnN0IGtlciA9IG5ldyBjb25maWcud2ViMy5ldGguQ29udHJhY3QoY29uZmlnLmNvbnRyYWN0cy5LZXJuZWwuYWJpLCBhZGRyZXNzKTtcbiAgICBjb25zdCBtZXRhZGF0YSA9IGF3YWl0IGtlci5tZXRob2RzXG4gICAgICAgIC5tZXRhZGF0YSgpXG4gICAgICAgIC5jYWxsKCk7XG5cbiAgICByZXR1cm4gY29uZmlnLndlYjMudXRpbHMuaGV4VG9VdGY4KG1ldGFkYXRhKTtcbn07XG5cbi8qKlxuICogR2V0IEtlcm5lbCBieSB0aGUga2VybmVsIGFkZHJlc3NcbiAqIFxuICogQHBhcmFtIHtzdHJpbmd9IGFkZHJlc3NcbiAqIEBwYXJhbSB7T2JqZWN0fSBjb25maWcgTGlicmFyeSBjb25maWcgKHByb3ZpZGVkIGJ5IHRoZSBwcm94eSBidXQgY2FuIGJlIG92ZXJyaWRkZW4pXG4gKiBAcmV0dXJucyB7UHJvbWlzZX0gUHJvbWlzZSBvYmplY3QgcmVwcmVzZW50cyB0aGUge09iamVjdFtdfVxuICovXG5leHBvcnQgY29uc3QgZmV0Y2hLZXJuZWwgPSBhc3luYyAoYWRkcmVzcyA9ICcnLCBjb25maWcgPSB7fSkgPT4ge1xuXG4gICAgY29uc3QgW1xuICAgICAgICBpcGZzQWRkcmVzcyxcbiAgICAgICAgZGF0YURpbSxcbiAgICAgICAgY3VycmVudFByaWNlLFxuICAgICAgICBjb21wbGV4aXR5LFxuICAgICAgICBtZXRhZGF0YSxcbiAgICAgICAgZGVzY3JpcHRpb25cbiAgICBdID0gYXdhaXQgUHJvbWlzZS5hbGwoW1xuICAgICAgICBmZXRjaElwZnNBZGRyZXNzKGFkZHJlc3MsIGNvbmZpZyksXG4gICAgICAgIGZldGNoRGF0YURpbShhZGRyZXNzLCBjb25maWcpLFxuICAgICAgICBmZXRjaEN1cnJlbnRQcmljZShhZGRyZXNzLCBjb25maWcpLFxuICAgICAgICBmZXRjaENvbXBsZXhpdHkoYWRkcmVzcywgY29uZmlnKSxcbiAgICAgICAgZmV0Y2hNZXRhZGF0YShhZGRyZXNzLCBjb25maWcpLFxuICAgICAgICBmZXRjaERlc2NyaXB0aW9uKGFkZHJlc3MsIGNvbmZpZylcbiAgICBdKTtcblxuICAgIHJldHVybiB7XG4gICAgICAgIGFkZHJlc3MsXG4gICAgICAgIGlwZnNBZGRyZXNzLFxuICAgICAgICBkYXRhRGltLFxuICAgICAgICBjdXJyZW50UHJpY2UsXG4gICAgICAgIGNvbXBsZXhpdHksXG4gICAgICAgIG1ldGFkYXRhLFxuICAgICAgICBkZXNjcmlwdGlvblxuICAgIH07XG59O1xuXG4vKipcbiAqIEdldCBrZXJuZWwgYnkgaWRcbiAqIFxuICogQHBhcmFtIHtpbnRlZ2VyfSBpZCBcbiAqIEBwYXJhbSB7T2JqZWN0fSBjb25maWcgTGlicmFyeSBjb25maWcgKHByb3ZpZGVkIGJ5IHRoZSBwcm94eSBidXQgY2FuIGJlIG92ZXJyaWRkZW4pXG4gKiBAcmV0dXJucyB7UHJvbWlzZX0gQSBQcm9taXNlIG9iamVjdCByZXByZXNlbnRzIHRoZSB7T2JqZWN0fVxuICovXG5leHBvcnQgY29uc3QgZmV0Y2hLZXJuZWxCeUlkID0gYXN5bmMgKGlkLCBjb25maWcgPSB7fSkgPT4ge1xuICAgIFxuICAgIGNvbnN0IGFkZHJlc3MgPSBhd2FpdCBmZXRjaEFkZHJlc3NCeUlkKGlkLCBjb25maWcpO1xuICAgIGNvbnN0IGtlcm5lbCA9IGF3YWl0IGZldGNoS2VybmVsKGFkZHJlc3MsIGNvbmZpZyk7XG5cbiAgICByZXR1cm4ga2VybmVsO1xufTtcblxuLyoqXG4gKiBHZXQgYWxsIGtlcm5lbHNcbiAqIFxuICogQHBhcmFtIHtPYmplY3R9IGNvbmZpZyBMaWJyYXJ5IGNvbmZpZyAocHJvdmlkZWQgYnkgdGhlIHByb3h5IGJ1dCBjYW4gYmUgb3ZlcnJpZGRlbilcbiAqIEByZXR1cm5zIHtQcm9taXNlfSBQcm9taXNlIG9iamVjdCByZXByZXNlbnRzIHRoZSB7T2JqZWN0W119XG4gKi9cbmV4cG9ydCBjb25zdCBmZXRjaEFsbCA9IGFzeW5jIChjb25maWcgPSB7fSkgPT4ge1xuXG4gICAgbGV0IHJlY29yZHMgPSBbXTtcbiAgICBsZXQgZXJyb3IgPSBbXTtcblxuICAgIHRyeSB7XG5cbiAgICAgICAgY29uc3QgY291bnQgPSBhd2FpdCBmZXRjaENvdW50KGNvbmZpZyk7XG5cbiAgICAgICAgZm9yIChsZXQgaT0wOyBpIDwgY291bnQ7IGkrKykge1xuICAgICAgICAgICAgXG4gICAgICAgICAgICB0cnkge1xuXG4gICAgICAgICAgICAgICAgY29uc3Qga2VybmVsID0gYXdhaXQgZmV0Y2hLZXJuZWxCeUlkKGksIGNvbmZpZyk7XG5cbiAgICAgICAgICAgICAgICByZWNvcmRzLnB1c2goe1xuICAgICAgICAgICAgICAgICAgICBpZDogaSxcbiAgICAgICAgICAgICAgICAgICAgLi4ua2VybmVsXG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9IGNhdGNoKGVycikge1xuICAgICAgICAgICAgICAgIGVycm9yLnB1c2goe1xuICAgICAgICAgICAgICAgICAgICBpZDogaSxcbiAgICAgICAgICAgICAgICAgICAgbWVzc2FnZTogZXJyLm1lc3NhZ2VcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH0gICAgICAgIFxuICAgICAgICB9XG4gICAgfSBjYXRjaChlcnIpIHtcbiAgICAgICAgZXJyb3IucHVzaCh7XG4gICAgICAgICAgICBlcnJvcjogZXJyLm1lc3NhZ2VcbiAgICAgICAgfSk7XG4gICAgfSAgIFxuXG4gICAgcmV0dXJuIHtcbiAgICAgICAgcmVjb3JkcyxcbiAgICAgICAgZXJyb3JcbiAgICB9O1xufTtcblxuLyoqXG4gKiBEZXBsb3kgS2VybmVsIGNvbnRyYWN0IHRvIHRoZSBuZXR3b3JrXG4gKiBcbiAqIEBwYXJhbSB7c3RyaW5nfSBrZXJuZWxJcGZzSGFzaCBcbiAqIEBwYXJhbSB7T2JqZWN0fSBvcHRpb25zIHsgZGltZW5zaW9uLCBjb21wbGV4aXR5LCBwcmljZSwgbWV0YWRhdGEsIGRlc2NyaXB0aW9uIH0gXG4gKiBAcGFyYW0ge1N0cmluZ30gcHVibGlzaGVyIFB1Ymxpc2hlciBhZGRyZXNzXG4gKiBAcGFyYW0ge09iamVjdH0gY29uZmlnIExpYnJhcnkgY29uZmlnIChwcm92aWRlZCBieSB0aGUgcHJveHkgYnV0IGNhbiBiZSBvdmVycmlkZGVuKVxuICogQHJldHVybnMge1Byb21pc2V9IFByb21pc2Ugb2JqZWN0IHJlc29sdmVkIHRvIGNvbnRyYWN0IGFkZHJlc3NcbiAqL1xuZXhwb3J0IGNvbnN0IGRlcGxveSA9IGFzeW5jIChrZXJuZWxJcGZzSGFzaCwgeyBkaW1lbnNpb24sIGNvbXBsZXhpdHksIHByaWNlLCBtZXRhZGF0YSwgZGVzY3JpcHRpb24gfSwgcHVibGlzaGVyLCBjb25maWcgPSB7fSkgPT4ge1xuXG4gICAgZXhwZWN0LmFsbCh7IGtlcm5lbElwZnNIYXNoLCBwdWJsaXNoZXIsIGRpbWVuc2lvbiwgY29tcGxleGl0eSwgcHJpY2UsIG1ldGFkYXRhLCBkZXNjcmlwdGlvbiB9LCB7XG4gICAgICAgICdrZXJuZWxJcGZzSGFzaCc6IHtcbiAgICAgICAgICAgIHR5cGU6ICdzdHJpbmcnXG4gICAgICAgIH0sXG4gICAgICAgICdwdWJsaXNoZXInOiB7XG4gICAgICAgICAgICB0eXBlOiAnYWRkcmVzcydcbiAgICAgICAgfSxcbiAgICAgICAgJ2RpbWVuc2lvbic6IHtcbiAgICAgICAgICAgIHR5cGU6ICdudW1iZXInXG4gICAgICAgIH0sXG4gICAgICAgICdjb21wbGV4aXR5Jzoge1xuICAgICAgICAgICAgdHlwZTogJ251bWJlcidcbiAgICAgICAgfSxcbiAgICAgICAgJ3ByaWNlJzoge1xuICAgICAgICAgICAgdHlwZTogJ251bWJlcidcbiAgICAgICAgfSxcbiAgICAgICAgJ21ldGFkYXRhJzoge1xuICAgICAgICAgICAgdHlwZTogJ3N0cmluZydcbiAgICAgICAgfSxcbiAgICAgICAgJ2Rlc2NyaXB0aW9uJzoge1xuICAgICAgICAgICAgdHlwZTogJ3N0cmluZydcbiAgICAgICAgfVxuICAgIH0pO1xuXG4gICAgZXhwZWN0LmFsbChjb25maWcsIHtcbiAgICAgICAgJ3dlYjMnOiB7XG4gICAgICAgICAgICB0eXBlOiAnb2JqZWN0JyxcbiAgICAgICAgICAgIGNvZGU6IFdFQjNfUkVRVUlSRURcbiAgICAgICAgfSxcbiAgICAgICAgJ2NvbnRyYWN0cy5LZXJuZWwuYWJpJzoge1xuICAgICAgICAgICAgdHlwZTogJ29iamVjdCcsXG4gICAgICAgICAgICBjb2RlOiBDT05UUkFDVF9SRVFVSVJFRCxcbiAgICAgICAgICAgIGFyZ3M6IFsnS2VybmVsJ11cbiAgICAgICAgfVxuICAgIH0pO1xuXG4gICAgY29uc3QgYXJncyA9IFtcbiAgICAgICAgY29uZmlnLndlYjMudXRpbHMudXRmOFRvSGV4KGtlcm5lbElwZnNIYXNoKSwgXG4gICAgICAgIGRpbWVuc2lvbiwgXG4gICAgICAgIGNvbXBsZXhpdHksIFxuICAgICAgICBwcmljZSwgXG4gICAgICAgIGNvbmZpZy53ZWIzLnV0aWxzLnV0ZjhUb0hleChtZXRhZGF0YSksXG4gICAgICAgIGNvbmZpZy53ZWIzLnV0aWxzLnV0ZjhUb0hleChkZXNjcmlwdGlvbilcbiAgICBdO1xuICAgICAgICBcbiAgICAvLyBFc3RpbWF0ZSByZXF1aXJlZCBhbW91bnQgb2YgZ2FzXG4gICAgY29uc3QgZ2FzID0gYXdhaXQgd2ViM0hlbHBlcnMuZXN0aW1hdGVHYXMoY29uZmlnLmNvbnRyYWN0cy5LZXJuZWwuYnl0ZWNvZGUsIGFyZ3MsIGNvbmZpZyk7XG5cbiAgICAvLyBDcmVhdGUgYW5kIGRlcGxveSBrZXJuZWwgY29udHJhY3RcbiAgICBjb25zdCBrZXJuZWxDb250cmFjdEFkZHJlc3MgPSBhd2FpdCB3ZWIzSGVscGVycy5kZXBsb3lDb250cmFjdChjb25maWcuY29udHJhY3RzLktlcm5lbCwge1xuICAgICAgICBhcmdzLFxuICAgICAgICBmcm9tOiBwdWJsaXNoZXIsXG4gICAgICAgIGdhczogTnVtYmVyLnBhcnNlSW50KGdhcyAqIDEuNSwgMTApXG4gICAgfSwgY29uZmlnKTtcblxuICAgIHJldHVybiBrZXJuZWxDb250cmFjdEFkZHJlc3M7XG59O1xuXG4vKipcbiAqIEFkZCBrZXJuZWwgdG8gbWFya2V0XG4gKiBcbiAqIEBwYXJhbSB7U3RyaW5nfSBrZXJuZWxDb250cmFjdEFkZHJlc3MgXG4gKiBAcGFyYW0ge1N0cmluZ30gcHVibGlzaGVyQWRkcmVzcyBcbiAqIEBwYXJhbSB7T2JqZWN0fSBjb25maWcgTGlicmFyeSBjb25maWcgKHByb3ZpZGVkIGJ5IHRoZSBwcm94eSBidXQgY2FuIGJlIG92ZXJyaWRkZW4pXG4gKiBAcmV0dXJucyB7UHJvbWlzZX0gUHJvbWlzZSBvYmplY3QgcmVzb2x2ZWQgdG8ge3N0cmluZ30gY29udHJhY3RBZGRyZXNzIC8vIGNhbiBiZSBudWxsIGlmIHVzZWQgZ2FuYWNoZS1jbGkgZW52aXJvbm1lbnRcbiAqL1xuZXhwb3J0IGNvbnN0IGFkZFRvTWFya2V0ID0gKGtlcm5lbENvbnRyYWN0QWRkcmVzcywgcHVibGlzaGVyQWRkcmVzcywgY29uZmlnID0ge30pID0+IG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcblxuICAgIGV4cGVjdC5hbGwoeyBrZXJuZWxDb250cmFjdEFkZHJlc3MsIHB1Ymxpc2hlckFkZHJlc3MgfSwge1xuICAgICAgICAna2VybmVsQ29udHJhY3RBZGRyZXNzJzoge1xuICAgICAgICAgICAgdHlwZTogJ2FkZHJlc3MnXG4gICAgICAgIH0sXG4gICAgICAgICdwdWJsaXNoZXJBZGRyZXNzJzoge1xuICAgICAgICAgICAgdHlwZTogJ2FkZHJlc3MnXG4gICAgICAgIH1cbiAgICB9KTtcblxuICAgIGV4cGVjdC5hbGwoY29uZmlnLCB7XG4gICAgICAgICd3ZWIzJzoge1xuICAgICAgICAgICAgdHlwZTogJ29iamVjdCcsXG4gICAgICAgICAgICBjb2RlOiBXRUIzX1JFUVVJUkVEXG4gICAgICAgIH0sXG4gICAgICAgICdjb250cmFjdHMuUGFuZG9yYU1hcmtldC5hYmknOiB7XG4gICAgICAgICAgICB0eXBlOiAnb2JqZWN0JyxcbiAgICAgICAgICAgIGNvZGU6IENPTlRSQUNUX1JFUVVJUkVELFxuICAgICAgICAgICAgYXJnczogWydQYW5kb3JhTWFya2V0J11cbiAgICAgICAgfSxcbiAgICAgICAgJ2FkZHJlc3Nlcy5QYW5kb3JhTWFya2V0Jzoge1xuICAgICAgICAgICAgdHlwZTogJ2FkZHJlc3MnLFxuICAgICAgICAgICAgY29kZTogQUREUkVTU19SRVFVSVJFRCxcbiAgICAgICAgICAgIGFyZ3M6IFsnS2VybmVsJ11cbiAgICAgICAgfSxcbiAgICAgICAgJ3dlYjMuY3VycmVudFByb3ZpZGVyLmlzTWV0YU1hc2snOiB7XG4gICAgICAgICAgICB0eXBlOiAnYm9vbGVhbicsXG4gICAgICAgICAgICBjb2RlOiBXRUIzX01FVEFNQVNLX1JFUVVJUkVEXG4gICAgICAgIH1cbiAgICB9KTtcblxuICAgIGNvbnN0IG1hcmtldCA9IG5ldyBjb25maWcud2ViMy5ldGguQ29udHJhY3QoY29uZmlnLmNvbnRyYWN0cy5QYW5kb3JhTWFya2V0LmFiaSwgY29uZmlnLmFkZHJlc3Nlcy5QYW5kb3JhTWFya2V0KTtcbiAgICBtYXJrZXQubWV0aG9kc1xuICAgICAgICAuYWRkS2VybmVsKGtlcm5lbENvbnRyYWN0QWRkcmVzcylcbiAgICAgICAgLnNlbmQoe1xuICAgICAgICAgICAgZnJvbTogcHVibGlzaGVyQWRkcmVzc1xuICAgICAgICB9KVxuICAgICAgICAub24oJ2Vycm9yJywgcmVqZWN0KVxuICAgICAgICAub24oJ3JlY2VpcHQnLCByZWNlaXB0ID0+IHtcblxuICAgICAgICAgICAgaWYgKE51bWJlcihyZWNlaXB0LnN0YXR1cykgPT09IDApIHtcblxuICAgICAgICAgICAgICAgIHJldHVybiByZWplY3QocGpzRXJyb3IoVFJBTlNBQ1RJT05fVU5TVUNDRVNTRlVMKSk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHJlc29sdmUocmVjZWlwdC5jb250cmFjdEFkZHJlc3MgfHwgcmVjZWlwdC5ldmVudHMuS2VybmVsQWRkZWQucmV0dXJuVmFsdWVzLmtlcm5lbCk7XG4gICAgICAgIH0pO1xuICAgIC8vIEBub3RlIEluIGNhc2Ugb2YgZ2FuYWNoZS1jbGkgYmxvY2tjaGFpbiBcImNvbnRyYWN0QWRkcmVzc1wiIGFsd2F5cyB3aWxsIGJlIGVxdWFsIHRvIG51bGxcbn0pO1xuXG4vKipcbiAqIFJlbW92ZSBrZXJuZWwgZnJvbSBQYW5kb3JhTWFya2V0XG4gKiBcbiAqIEBwYXJhbSB7U3RyaW5nfSBrZXJuZWxBZGRyZXNzXG4gKiBAcGFyYW0ge1N0cmluZ30gcHVibGlzaGVyQWRkcmVzcyBcbiAqIEBwYXJhbSB7T2JqZWN0fSBjb25maWcgTGlicmFyeSBjb25maWcgKHByb3ZpZGVkIGJ5IHRoZSBwcm94eSBidXQgY2FuIGJlIG92ZXJyaWRkZW4pIFxuICogQHJldHVybnMge1Byb21pc2V9IFByb21pc2Ugb2JqZWN0IHJlc29sdmVkIHRvIHtTdHJpbmd9IGNvbnRyYWN0QWRkcmVzc1xuICovXG5leHBvcnQgY29uc3QgcmVtb3ZlS2VybmVsID0gKGtlcm5lbEFkZHJlc3MsIHB1Ymxpc2hlckFkZHJlc3MsIGNvbmZpZyA9IHt9KSA9PiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG5cbiAgICBleHBlY3QuYWxsKHsga2VybmVsQWRkcmVzcywgcHVibGlzaGVyQWRkcmVzcyB9LCB7XG4gICAgICAgICdrZXJuZWxBZGRyZXNzJzoge1xuICAgICAgICAgICAgdHlwZTogJ2FkZHJlc3MnXG4gICAgICAgIH0sXG4gICAgICAgICdwdWJsaXNoZXJBZGRyZXNzJzoge1xuICAgICAgICAgICAgdHlwZTogJ2FkZHJlc3MnXG4gICAgICAgIH1cbiAgICB9KTtcblxuICAgIGV4cGVjdC5hbGwoY29uZmlnLCB7XG4gICAgICAgICd3ZWIzJzoge1xuICAgICAgICAgICAgdHlwZTogJ29iamVjdCcsXG4gICAgICAgICAgICBjb2RlOiBXRUIzX1JFUVVJUkVEXG4gICAgICAgIH0sXG4gICAgICAgICdjb250cmFjdHMuUGFuZG9yYU1hcmtldC5hYmknOiB7XG4gICAgICAgICAgICB0eXBlOiAnb2JqZWN0JyxcbiAgICAgICAgICAgIGNvZGU6IENPTlRSQUNUX1JFUVVJUkVELFxuICAgICAgICAgICAgYXJnczogWydQYW5kb3JhTWFya2V0J11cbiAgICAgICAgfSxcbiAgICAgICAgJ2FkZHJlc3Nlcy5QYW5kb3JhTWFya2V0Jzoge1xuICAgICAgICAgICAgdHlwZTogJ2FkZHJlc3MnLFxuICAgICAgICAgICAgY29kZTogQUREUkVTU19SRVFVSVJFRCxcbiAgICAgICAgICAgIGFyZ3M6IFsnS2VybmVsJ11cbiAgICAgICAgfVxuICAgIH0pO1xuXG4gICAgY29uc3QgbWFya2V0ID0gbmV3IGNvbmZpZy53ZWIzLmV0aC5Db250cmFjdChjb25maWcuY29udHJhY3RzLlBhbmRvcmFNYXJrZXQuYWJpLCBjb25maWcuYWRkcmVzc2VzLlBhbmRvcmFNYXJrZXQpO1xuICAgIG1hcmtldC5tZXRob2RzXG4gICAgICAgIC5yZW1vdmVLZXJuZWwoa2VybmVsQWRkcmVzcylcbiAgICAgICAgLnNlbmQoe1xuICAgICAgICAgICAgZnJvbTogcHVibGlzaGVyQWRkcmVzc1xuICAgICAgICB9KVxuICAgICAgICAub24oJ2Vycm9yJywgcmVqZWN0KVxuICAgICAgICAub24oJ3JlY2VpcHQnLCByZWNlaXB0ID0+IHtcblxuICAgICAgICAgICAgaWYgKE51bWJlcihyZWNlaXB0LnN0YXR1cykgPT09IDApIHtcblxuICAgICAgICAgICAgICAgIHJldHVybiByZWplY3QocGpzRXJyb3IoVFJBTlNBQ1RJT05fVU5TVUNDRVNTRlVMKSk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHJlc29sdmUocmVjZWlwdC5jb250cmFjdEFkZHJlc3MpO1xuICAgICAgICB9KTtcbn0pO1xuXG4vKipcbiAqIEhhbmRsZSBldmVudCBLZXJuZWxBZGRlZFxuICogXG4gKiBAcGFyYW0ge09iamVjdH0gb3B0aW9ucyBFdmVudCBoYW5kbGVyIG9wdGlvbnNcbiAqIEBwYXJhbSB7T2JqZWN0fSBjb25maWcgTGlicmFyeSBjb25maWcgKHByb3ZpZGVkIGJ5IHRoZSBwcm94eSBidXQgY2FuIGJlIG92ZXJyaWRkZW4pXG4gKiBAcmV0dXJucyB7T2JqZWN0fSBPYmplY3Qgd2l0aCBjaGFpbmVkIGNhbGxiYWNrcyAjZGF0YSBhbmQgI2Vycm9yXG4gKi9cbmV4cG9ydCBjb25zdCBldmVudEtlcm5lbEFkZGVkID0gKG9wdGlvbnMgPSB7fSwgY29uZmlnID0ge30pID0+IHtcblxuICAgIGV4cGVjdC5hbGwoeyBvcHRpb25zIH0sIHtcbiAgICAgICAgJ29wdGlvbnMnOiB7XG4gICAgICAgICAgICB0eXBlOiAnb2JqZWN0J1xuICAgICAgICB9XG4gICAgfSk7XG5cbiAgICBleHBlY3QuYWxsKGNvbmZpZywge1xuICAgICAgICAnd2ViMyc6IHtcbiAgICAgICAgICAgIHR5cGU6ICdvYmplY3QnLFxuICAgICAgICAgICAgY29kZTogV0VCM19SRVFVSVJFRFxuICAgICAgICB9LFxuICAgICAgICAnY29udHJhY3RzLlBhbmRvcmFNYXJrZXQuYWJpJzoge1xuICAgICAgICAgICAgdHlwZTogJ29iamVjdCcsXG4gICAgICAgICAgICBjb2RlOiBDT05UUkFDVF9SRVFVSVJFRCxcbiAgICAgICAgICAgIGFyZ3M6IFsnUGFuZG9yYU1hcmtldCddXG4gICAgICAgIH0sXG4gICAgICAgICdhZGRyZXNzZXMuUGFuZG9yYU1hcmtldCc6IHtcbiAgICAgICAgICAgIHR5cGU6ICdhZGRyZXNzJyxcbiAgICAgICAgICAgIGNvZGU6IEFERFJFU1NfUkVRVUlSRUQsXG4gICAgICAgICAgICBhcmdzOiBbJ0tlcm5lbCddXG4gICAgICAgIH1cbiAgICB9KTtcblxuICAgIGNvbnN0IGNhbGxiYWNrcyA9IHtcbiAgICAgICAgb25EYXRhOiAoKSA9PiB7fSxcbiAgICAgICAgb25FcnJvcjogKCkgPT4ge31cbiAgICB9O1xuXG4gICAgY29uc3QgY2hhaW4gPSB7XG4gICAgICAgIGRhdGE6IChjYiA9ICgpID0+IHt9KSA9PiB7XG4gICAgICAgICAgICBjYWxsYmFja3Mub25EYXRhID0gY2I7XG4gICAgICAgICAgICByZXR1cm4gY2hhaW47XG4gICAgICAgIH0sXG4gICAgICAgIGVycm9yOiAoY2IgPSAoKSA9PiB7fSkgPT4ge1xuICAgICAgICAgICAgY2FsbGJhY2tzLm9uRXJyb3IgPSBjYjtcbiAgICAgICAgICAgIHJldHVybiBjaGFpbjtcbiAgICAgICAgfSxcbiAgICAgICAgc3Vic2NyaWJlZDogKGNiID0gKCkgPT4ge30pID0+IHtcbiAgICAgICAgICAgIGNhbGxiYWNrcy5vblN1YnNjcmliZWQgPSBjYjtcbiAgICAgICAgICAgIHJldHVybiBjaGFpbjtcbiAgICAgICAgfVxuICAgIH07XG5cbiAgICBjb25zdCBtYXIgPSBuZXcgY29uZmlnLndlYjMuZXRoLkNvbnRyYWN0KGNvbmZpZy5jb250cmFjdHMuUGFuZG9yYU1hcmtldC5hYmksIGNvbmZpZy5hZGRyZXNzZXMuUGFuZG9yYU1hcmtldCk7XG4gICAgY2hhaW4uZXZlbnQgPSBtYXIuZXZlbnRzLktlcm5lbEFkZGVkKG9wdGlvbnMpXG4gICAgICAgIC5vbignZGF0YScsIGFzeW5jIHJlcyA9PiB7XG5cbiAgICAgICAgICAgIHRyeSB7XG5cbiAgICAgICAgICAgICAgICBjb25zdCBrZXJuZWwgPSBhd2FpdCBmZXRjaEtlcm5lbChyZXMucmV0dXJuVmFsdWVzLmtlcm5lbCwgY29uZmlnKTtcbiAgICAgICAgICAgICAgICBjYWxsYmFja3Mub25EYXRhKHtcbiAgICAgICAgICAgICAgICAgICAgYWRkcmVzczogcmVzLnJldHVyblZhbHVlcy5rZXJuZWwsXG4gICAgICAgICAgICAgICAgICAgIGtlcm5lbCxcbiAgICAgICAgICAgICAgICAgICAgc3RhdHVzOiAnY3JlYXRlZCcsXG4gICAgICAgICAgICAgICAgICAgIGV2ZW50OiAnUGFuZG9yYU1hcmtldC5LZXJuZWxBZGRlZCdcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH0gY2F0Y2goZXJyKSB7XG4gICAgICAgICAgICAgICAgY2FsbGJhY2tzLm9uRXJyb3IoZXJyKTtcbiAgICAgICAgICAgIH0gICAgICAgICAgICBcbiAgICAgICAgfSlcbiAgICAgICAgLm9uKCdlcnJvcicsIGNhbGxiYWNrcy5vbkVycm9yKTtcblxuICAgIHJldHVybiBjaGFpbjtcbn07XG5cbi8qKlxuICogSGFuZGxlIGV2ZW50IEtlcm5lbFJlbW92ZWRcbiAqIFxuICogQHBhcmFtIHtPYmplY3R9IG9wdGlvbnMgRXZlbnQgaGFuZGxlciBvcHRpb25zXG4gKiBAcGFyYW0ge09iamVjdH0gY29uZmlnIExpYnJhcnkgY29uZmlnIChwcm92aWRlZCBieSB0aGUgcHJveHkgYnV0IGNhbiBiZSBvdmVycmlkZGVuKVxuICogQHJldHVybnMge09iamVjdH0gT2JqZWN0IHdpdGggY2hhaW5lZCBjYWxsYmFja3MgI2RhdGEgYW5kICNlcnJvclxuICovXG5leHBvcnQgY29uc3QgZXZlbnRLZXJuZWxSZW1vdmVkID0gKG9wdGlvbnMgPSB7fSwgY29uZmlnID0ge30pID0+IHtcblxuICAgIGV4cGVjdC5hbGwoeyBvcHRpb25zIH0sIHtcbiAgICAgICAgJ29wdGlvbnMnOiB7XG4gICAgICAgICAgICB0eXBlOiAnb2JqZWN0J1xuICAgICAgICB9XG4gICAgfSk7XG5cbiAgICBleHBlY3QuYWxsKGNvbmZpZywge1xuICAgICAgICAnd2ViMyc6IHtcbiAgICAgICAgICAgIHR5cGU6ICdvYmplY3QnLFxuICAgICAgICAgICAgY29kZTogV0VCM19SRVFVSVJFRFxuICAgICAgICB9LFxuICAgICAgICAnY29udHJhY3RzLlBhbmRvcmFNYXJrZXQuYWJpJzoge1xuICAgICAgICAgICAgdHlwZTogJ29iamVjdCcsXG4gICAgICAgICAgICBjb2RlOiBDT05UUkFDVF9SRVFVSVJFRCxcbiAgICAgICAgICAgIGFyZ3M6IFsnUGFuZG9yYU1hcmtldCddXG4gICAgICAgIH0sXG4gICAgICAgICdhZGRyZXNzZXMuUGFuZG9yYU1hcmtldCc6IHtcbiAgICAgICAgICAgIHR5cGU6ICdhZGRyZXNzJyxcbiAgICAgICAgICAgIGNvZGU6IEFERFJFU1NfUkVRVUlSRUQsXG4gICAgICAgICAgICBhcmdzOiBbJ1BhbmRvcmFNYXJrZXQnXVxuICAgICAgICB9XG4gICAgfSk7XG5cbiAgICBjb25zdCBjYWxsYmFja3MgPSB7XG4gICAgICAgIG9uRGF0YTogKCkgPT4ge30sXG4gICAgICAgIG9uRXJyb3I6ICgpID0+IHt9XG4gICAgfTtcblxuICAgIGNvbnN0IGNoYWluID0ge1xuICAgICAgICBkYXRhOiAoY2IgPSAoKSA9PiB7fSkgPT4ge1xuICAgICAgICAgICAgY2FsbGJhY2tzLm9uRGF0YSA9IGNiO1xuICAgICAgICAgICAgcmV0dXJuIGNoYWluO1xuICAgICAgICB9LFxuICAgICAgICBlcnJvcjogKGNiID0gKCkgPT4ge30pID0+IHtcbiAgICAgICAgICAgIGNhbGxiYWNrcy5vbkVycm9yID0gY2I7XG4gICAgICAgICAgICByZXR1cm4gY2hhaW47XG4gICAgICAgIH1cbiAgICB9O1xuXG4gICAgY29uc3QgbWFyID0gbmV3IGNvbmZpZy53ZWIzLmV0aC5Db250cmFjdChjb25maWcuY29udHJhY3RzLlBhbmRvcmFNYXJrZXQuYWJpLCBjb25maWcuYWRkcmVzc2VzLlBhbmRvcmFNYXJrZXQpO1xuICAgIGNoYWluLmV2ZW50ID0gbWFyLmV2ZW50cy5LZXJuZWxSZW1vdmVkKG9wdGlvbnMpXG4gICAgICAgIC5vbignZGF0YScsIGFzeW5jIHJlcyA9PiB7XG5cbiAgICAgICAgICAgIGNhbGxiYWNrcy5vbkRhdGEoe1xuICAgICAgICAgICAgICAgIGFkZHJlc3M6IHJlcy5yZXR1cm5WYWx1ZXMua2VybmVsLFxuICAgICAgICAgICAgICAgIHN0YXR1czogJ3JlbW92ZWQnLFxuICAgICAgICAgICAgICAgIGV2ZW50OiAnUGFuZG9yYU1hcmtldC5LZXJuZWxSZW1vdmVkJ1xuICAgICAgICAgICAgfSk7ICAgICAgICAgICAgXG4gICAgICAgIH0pXG4gICAgICAgIC5vbignZXJyb3InLCBjYWxsYmFja3Mub25FcnJvcik7XG5cbiAgICByZXR1cm4gY2hhaW47XG59O1xuIl19