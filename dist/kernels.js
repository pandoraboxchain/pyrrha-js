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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9rZXJuZWxzLmpzIl0sIm5hbWVzIjpbImZldGNoQ291bnQiLCJjb25maWciLCJleHBlY3QiLCJhbGwiLCJ0eXBlIiwiY29kZSIsIldFQjNfUkVRVUlSRUQiLCJDT05UUkFDVF9SRVFVSVJFRCIsImFyZ3MiLCJBRERSRVNTX1JFUVVJUkVEIiwibWFyIiwid2ViMyIsImV0aCIsIkNvbnRyYWN0IiwiY29udHJhY3RzIiwiUGFuZG9yYU1hcmtldCIsImFiaSIsImFkZHJlc3NlcyIsImNvdW50IiwibWV0aG9kcyIsImtlcm5lbHNDb3VudCIsImNhbGwiLCJOdW1iZXIiLCJwYXJzZUludCIsImZldGNoQWRkcmVzc0J5SWQiLCJpZCIsImtlcm5lbENvbnRyYWN0Iiwia2VybmVscyIsImZldGNoSXBmc0FkZHJlc3MiLCJhZGRyZXNzIiwia2VyIiwiS2VybmVsIiwiaXBmc0FkZHJlc3MiLCJ1dGlscyIsImhleFRvQXNjaWkiLCJmZXRjaERhdGFEaW0iLCJkYXRhRGltIiwiZmV0Y2hDdXJyZW50UHJpY2UiLCJjdXJyZW50UHJpY2UiLCJmZXRjaENvbXBsZXhpdHkiLCJjb21wbGV4aXR5IiwiZmV0Y2hEZXNjcmlwdGlvbiIsImRlc2NyaXB0aW9uIiwiaGV4VG9VdGY4IiwiZmV0Y2hNZXRhZGF0YSIsIm1ldGFkYXRhIiwiZmV0Y2hLZXJuZWwiLCJQcm9taXNlIiwiZmV0Y2hLZXJuZWxCeUlkIiwia2VybmVsIiwiZmV0Y2hBbGwiLCJyZWNvcmRzIiwiZXJyb3IiLCJpIiwicHVzaCIsImVyciIsIm1lc3NhZ2UiLCJkZXBsb3kiLCJrZXJuZWxJcGZzSGFzaCIsImRpbWVuc2lvbiIsInByaWNlIiwicHVibGlzaGVyIiwidXRmOFRvSGV4IiwiZ2FzIiwid2ViM0hlbHBlcnMiLCJlc3RpbWF0ZUdhcyIsImJ5dGVjb2RlIiwia2VybmVsQ29udHJhY3RBZGRyZXNzIiwiZGVwbG95Q29udHJhY3QiLCJmcm9tIiwiYWRkVG9NYXJrZXQiLCJwdWJsaXNoZXJBZGRyZXNzIiwicmVzb2x2ZSIsInJlamVjdCIsIldFQjNfTUVUQU1BU0tfUkVRVUlSRUQiLCJtYXJrZXQiLCJhZGRLZXJuZWwiLCJzZW5kIiwib24iLCJyZWNlaXB0Iiwic3RhdHVzIiwiVFJBTlNBQ1RJT05fVU5TVUNDRVNTRlVMIiwiY29udHJhY3RBZGRyZXNzIiwiZXZlbnRzIiwiS2VybmVsQWRkZWQiLCJyZXR1cm5WYWx1ZXMiLCJyZW1vdmVLZXJuZWwiLCJrZXJuZWxBZGRyZXNzIiwiZXZlbnRLZXJuZWxBZGRlZCIsIm9wdGlvbnMiLCJjYWxsYmFja3MiLCJvbkRhdGEiLCJvbkVycm9yIiwiY2hhaW4iLCJkYXRhIiwiY2IiLCJzdWJzY3JpYmVkIiwib25TdWJzY3JpYmVkIiwiZXZlbnQiLCJyZXMiLCJldmVudEtlcm5lbFJlbW92ZWQiLCJLZXJuZWxSZW1vdmVkIl0sIm1hcHBpbmdzIjoiQUFBQTs7Ozs7Ozs7QUFTQTs7Ozs7OztBQUVBOztBQUNBOztBQU9BOzs7Ozs7OztBQUVBOzs7Ozs7QUFNTyxNQUFNQSxVQUFVLEdBQUcsT0FBT0MsTUFBTSxHQUFHLEVBQWhCLEtBQXVCO0FBRTdDQyxFQUFBQSxNQUFNLENBQUNDLEdBQVAsQ0FBV0YsTUFBWCxFQUFtQjtBQUNmLFlBQVE7QUFDSkcsTUFBQUEsSUFBSSxFQUFFLFFBREY7QUFFSkMsTUFBQUEsSUFBSSxFQUFFQztBQUZGLEtBRE87QUFLZixtQ0FBK0I7QUFDM0JGLE1BQUFBLElBQUksRUFBRSxRQURxQjtBQUUzQkMsTUFBQUEsSUFBSSxFQUFFRSx5QkFGcUI7QUFHM0JDLE1BQUFBLElBQUksRUFBRSxDQUFDLGVBQUQ7QUFIcUIsS0FMaEI7QUFVZiwrQkFBMkI7QUFDdkJKLE1BQUFBLElBQUksRUFBRSxTQURpQjtBQUV2QkMsTUFBQUEsSUFBSSxFQUFFSSx3QkFGaUI7QUFHdkJELE1BQUFBLElBQUksRUFBRSxDQUFDLGVBQUQ7QUFIaUI7QUFWWixHQUFuQjtBQWlCQSxRQUFNRSxHQUFHLEdBQUcsSUFBSVQsTUFBTSxDQUFDVSxJQUFQLENBQVlDLEdBQVosQ0FB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QWQ7QUFXQSxTQUFPQyxLQUFQO0FBQ0gsQ0F0RE0iLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIEtlcm5lbHMgcmVsYXRlZCBtZXRob2RzXG4gKiBUaGlzIGZpbGUgaXQgaXMgYSBwYXJ0IG9mIHRoZSBQYW5kb3JhIFB5cnJoYSBKYXZhc2NyaXB0IGxpYnJhcnlcbiAqIFxuICogQGZpbGUga2VybmVscy5qc1xuICogQGF1dGhvciBLb3N0aWFudHluIFNteXJub3YgPGtvc3R5c2hAZ21haWwuY29tPlxuICogQGRhdGUgMjAxOFxuICovXG5cbid1c2Ugc3RyaWN0JztcblxuaW1wb3J0ICogYXMgZXhwZWN0IGZyb20gJy4vaGVscGVycy9leHBlY3QnO1xuaW1wb3J0IHBqc0Vycm9yLCB7XG4gICAgQ09OVFJBQ1RfUkVRVUlSRUQsXG4gICAgQUREUkVTU19SRVFVSVJFRCxcbiAgICBXRUIzX1JFUVVJUkVELFxuICAgIFdFQjNfTUVUQU1BU0tfUkVRVUlSRUQsXG4gICAgVFJBTlNBQ1RJT05fVU5TVUNDRVNTRlVMXG59IGZyb20gJy4vaGVscGVycy9lcnJvcnMnO1xuaW1wb3J0ICogYXMgd2ViM0hlbHBlcnMgZnJvbSAnLi9oZWxwZXJzL3dlYjMnO1xuXG4vKipcbiAqIEdldCBrZXJuZWxzIGNvdW50IGZyb20gUGFuZG9yYU1hcmtldCBjb250cmFjdFxuICogXG4gKiBAcGFyYW0ge09iamVjdH0gY29uZmlnIExpYnJhcnkgY29uZmlnIChwcm92aWRlZCBieSB0aGUgcHJveHkgYnV0IGNhbiBiZSBvdmVycmlkZGVuKVxuICogQHJldHVybnMge1Byb21pc2V9IEEgUHJvbWlzZSBvYmplY3QgcmVwcmVzZW50cyB0aGUge251bWJlcn0gXG4gKi9cbmV4cG9ydCBjb25zdCBmZXRjaENvdW50ID0gYXN5bmMgKGNvbmZpZyA9IHt9KSA9PiB7XG5cbiAgICBleHBlY3QuYWxsKGNvbmZpZywge1xuICAgICAgICAnd2ViMyc6IHtcbiAgICAgICAgICAgIHR5cGU6ICdvYmplY3QnLFxuICAgICAgICAgICAgY29kZTogV0VCM19SRVFVSVJFRFxuICAgICAgICB9LFxuICAgICAgICAnY29udHJhY3RzLlBhbmRvcmFNYXJrZXQuYWJpJzoge1xuICAgICAgICAgICAgdHlwZTogJ29iamVjdCcsXG4gICAgICAgICAgICBjb2RlOiBDT05UUkFDVF9SRVFVSVJFRCxcbiAgICAgICAgICAgIGFyZ3M6IFsnUGFuZG9yYU1hcmtldCddXG4gICAgICAgIH0sXG4gICAgICAgICdhZGRyZXNzZXMuUGFuZG9yYU1hcmtldCc6IHtcbiAgICAgICAgICAgIHR5cGU6ICdhZGRyZXNzJyxcbiAgICAgICAgICAgIGNvZGU6IEFERFJFU1NfUkVRVUlSRUQsXG4gICAgICAgICAgICBhcmdzOiBbJ1BhbmRvcmFNYXJrZXQnXVxuICAgICAgICB9XG4gICAgfSk7XG5cbiAgICBjb25zdCBtYXIgPSBuZXcgY29uZmlnLndlYjMuZXRoLkNvbnRyYWN0KGNvbmZpZy5jb250cmFjdHMuUGFuZG9yYU1hcmtldC5hYmksIGNvbmZpZy5hZGRyZXNzZXMuUGFuZG9yYU1hcmtldCk7XG4gICAgY29uc3QgY291bnQgPSBhd2FpdCBtYXIubWV0aG9kc1xuICAgICAgICAua2VybmVsc0NvdW50KClcbiAgICAgICAgLmNhbGwoKTtcblxuICAgIHJldHVybiBOdW1iZXIucGFyc2VJbnQoY291bnQsIDEwKTtcbn07XG5cbi8qKlxuICogR2V0IEtlcm5lbCBhZGRyZXNzIGJ5IGtlcm5lbCBpZFxuICogXG4gKiBAcGFyYW0ge251bWJlcn0gaWRcbiAqIEBwYXJhbSB7T2JqZWN0fSBjb25maWcgTGlicmFyeSBjb25maWcgKHByb3ZpZGVkIGJ5IHRoZSBwcm94eSBidXQgY2FuIGJlIG92ZXJyaWRkZW4pXG4gKiBAcmV0dXJucyB7UHJvbWlzZX0gQSBQcm9taXNlIG9iamVjdCByZXByZXNlbnRzIHRoZSB7c3RyaW5nfVxuICovXG5leHBvcnQgY29uc3QgZmV0Y2hBZGRyZXNzQnlJZCA9IGFzeW5jIChpZCwgY29uZmlnID0ge30pID0+IHtcblxuICAgIGV4cGVjdC5hbGwoeyBpZCB9LCB7XG4gICAgICAgICdpZCc6IHtcbiAgICAgICAgICAgIHR5cGU6ICdudW1iZXInXG4gICAgICAgIH1cbiAgICB9KTtcblxuICAgIGV4cGVjdC5hbGwoY29uZmlnLCB7XG4gICAgICAgICd3ZWIzJzoge1xuICAgICAgICAgICAgdHlwZTogJ29iamVjdCcsXG4gICAgICAgICAgICBjb2RlOiBXRUIzX1JFUVVJUkVEXG4gICAgICAgIH0sXG4gICAgICAgICdjb250cmFjdHMuUGFuZG9yYU1hcmtldC5hYmknOiB7XG4gICAgICAgICAgICB0eXBlOiAnb2JqZWN0JyxcbiAgICAgICAgICAgIGNvZGU6IENPTlRSQUNUX1JFUVVJUkVELFxuICAgICAgICAgICAgYXJnczogWydQYW5kb3JhTWFya2V0J11cbiAgICAgICAgfSxcbiAgICAgICAgJ2FkZHJlc3Nlcy5QYW5kb3JhTWFya2V0Jzoge1xuICAgICAgICAgICAgdHlwZTogJ2FkZHJlc3MnLFxuICAgICAgICAgICAgY29kZTogQUREUkVTU19SRVFVSVJFRCxcbiAgICAgICAgICAgIGFyZ3M6IFsnUGFuZG9yYU1hcmtldCddXG4gICAgICAgIH1cbiAgICB9KTtcblxuICAgIGNvbnN0IG1hciA9IG5ldyBjb25maWcud2ViMy5ldGguQ29udHJhY3QoY29uZmlnLmNvbnRyYWN0cy5QYW5kb3JhTWFya2V0LmFiaSwgY29uZmlnLmFkZHJlc3Nlcy5QYW5kb3JhTWFya2V0KTtcbiAgICBjb25zdCBrZXJuZWxDb250cmFjdCA9IGF3YWl0IG1hci5tZXRob2RzXG4gICAgICAgIC5rZXJuZWxzKGlkKVxuICAgICAgICAuY2FsbCgpO1xuXG4gICAgcmV0dXJuIGtlcm5lbENvbnRyYWN0O1xufTtcblxuLyoqXG4gKiBHZXQgSVBGUyBhZGRyZXNzIGZyb20gS2VybmVsIGNvbnRyYWN0IGJ5IHRoZSBrZXJuZWwgYWRkcmVzc1xuICogXG4gKiBAcGFyYW0ge3N0cmluZ30gYWRkcmVzc1xuICogQHBhcmFtIHtPYmplY3R9IGNvbmZpZyBMaWJyYXJ5IGNvbmZpZyAocHJvdmlkZWQgYnkgdGhlIHByb3h5IGJ1dCBjYW4gYmUgb3ZlcnJpZGRlbilcbiAqIEByZXR1cm5zIHtQcm9taXNlfSBBIFByb21pc2Ugb2JqZWN0IHJlcHJlc2VudHMgdGhlIHtzdHJpbmd9XG4gKi9cbmV4cG9ydCBjb25zdCBmZXRjaElwZnNBZGRyZXNzID0gYXN5bmMgKGFkZHJlc3MgPSAnJywgY29uZmlnID0ge30pID0+IHtcblxuICAgIGV4cGVjdC5hbGwoeyBhZGRyZXNzIH0sIHtcbiAgICAgICAgJ2FkZHJlc3MnOiB7XG4gICAgICAgICAgICB0eXBlOiAnYWRkcmVzcydcbiAgICAgICAgfVxuICAgIH0pO1xuXG4gICAgZXhwZWN0LmFsbChjb25maWcsIHtcbiAgICAgICAgJ3dlYjMnOiB7XG4gICAgICAgICAgICB0eXBlOiAnb2JqZWN0JyxcbiAgICAgICAgICAgIGNvZGU6IFdFQjNfUkVRVUlSRURcbiAgICAgICAgfSxcbiAgICAgICAgJ2NvbnRyYWN0cy5LZXJuZWwuYWJpJzoge1xuICAgICAgICAgICAgdHlwZTogJ29iamVjdCcsXG4gICAgICAgICAgICBjb2RlOiBDT05UUkFDVF9SRVFVSVJFRCxcbiAgICAgICAgICAgIGFyZ3M6IFsnS2VybmVsJ11cbiAgICAgICAgfVxuICAgIH0pO1xuXG4gICAgY29uc3Qga2VyID0gbmV3IGNvbmZpZy53ZWIzLmV0aC5Db250cmFjdChjb25maWcuY29udHJhY3RzLktlcm5lbC5hYmksIGFkZHJlc3MpO1xuICAgIGNvbnN0IGlwZnNBZGRyZXNzID0gYXdhaXQga2VyLm1ldGhvZHNcbiAgICAgICAgLmlwZnNBZGRyZXNzKClcbiAgICAgICAgLmNhbGwoKTtcblxuICAgIHJldHVybiBjb25maWcud2ViMy51dGlscy5oZXhUb0FzY2lpKGlwZnNBZGRyZXNzKTtcbn07XG5cbi8qKlxuICogR2V0IGRhdGEgZGltIGZyb20gS2VybmVsIGNvbnRyYWN0IGJ5IHRoZSBrZXJuZWwgYWRkcmVzc1xuICogXG4gKiBAcGFyYW0ge3N0cmluZ30gYWRkcmVzc1xuICogQHBhcmFtIHtPYmplY3R9IGNvbmZpZyBMaWJyYXJ5IGNvbmZpZyAocHJvdmlkZWQgYnkgdGhlIHByb3h5IGJ1dCBjYW4gYmUgb3ZlcnJpZGRlbilcbiAqIEByZXR1cm5zIHtQcm9taXNlfSBBIFByb21pc2Ugb2JqZWN0IHJlcHJlc2VudHMgdGhlIHtudW1iZXJ9XG4gKi9cbmV4cG9ydCBjb25zdCBmZXRjaERhdGFEaW0gPSBhc3luYyAoYWRkcmVzcyA9ICcnLCBjb25maWcgPSB7fSkgPT4ge1xuXG4gICAgZXhwZWN0LmFsbCh7IGFkZHJlc3MgfSwge1xuICAgICAgICAnYWRkcmVzcyc6IHtcbiAgICAgICAgICAgIHR5cGU6ICdhZGRyZXNzJ1xuICAgICAgICB9XG4gICAgfSk7XG5cbiAgICBleHBlY3QuYWxsKGNvbmZpZywge1xuICAgICAgICAnd2ViMyc6IHtcbiAgICAgICAgICAgIHR5cGU6ICdvYmplY3QnLFxuICAgICAgICAgICAgY29kZTogV0VCM19SRVFVSVJFRFxuICAgICAgICB9LFxuICAgICAgICAnY29udHJhY3RzLktlcm5lbC5hYmknOiB7XG4gICAgICAgICAgICB0eXBlOiAnb2JqZWN0JyxcbiAgICAgICAgICAgIGNvZGU6IENPTlRSQUNUX1JFUVVJUkVELFxuICAgICAgICAgICAgYXJnczogWydLZXJuZWwnXVxuICAgICAgICB9XG4gICAgfSk7XG5cbiAgICBjb25zdCBrZXIgPSBuZXcgY29uZmlnLndlYjMuZXRoLkNvbnRyYWN0KGNvbmZpZy5jb250cmFjdHMuS2VybmVsLmFiaSwgYWRkcmVzcyk7XG4gICAgY29uc3QgZGF0YURpbSA9IGF3YWl0IGtlci5tZXRob2RzXG4gICAgICAgIC5kYXRhRGltKClcbiAgICAgICAgLmNhbGwoKTtcblxuICAgIHJldHVybiBOdW1iZXIucGFyc2VJbnQoZGF0YURpbSwgMTApO1xufTtcblxuLyoqXG4gKiBHZXQgY3VycmVudCBwcmljZSBmcm9tIEtlcm5lbCBjb250cmFjdCBieSB0aGUga2VybmVsIGFkZHJlc3NcbiAqIFxuICogQHBhcmFtIHtzdHJpbmd9IGFkZHJlc3NcbiAqIEBwYXJhbSB7T2JqZWN0fSBjb25maWcgTGlicmFyeSBjb25maWcgKHByb3ZpZGVkIGJ5IHRoZSBwcm94eSBidXQgY2FuIGJlIG92ZXJyaWRkZW4pXG4gKiBAcmV0dXJucyB7UHJvbWlzZX0gQSBQcm9taXNlIG9iamVjdCByZXByZXNlbnRzIHRoZSB7bnVtYmVyfVxuICovXG5leHBvcnQgY29uc3QgZmV0Y2hDdXJyZW50UHJpY2UgPSBhc3luYyAoYWRkcmVzcyA9ICcnLCBjb25maWcgPSB7fSkgPT4ge1xuXG4gICAgZXhwZWN0LmFsbCh7IGFkZHJlc3MgfSwge1xuICAgICAgICAnYWRkcmVzcyc6IHtcbiAgICAgICAgICAgIHR5cGU6ICdhZGRyZXNzJ1xuICAgICAgICB9XG4gICAgfSk7XG5cbiAgICBleHBlY3QuYWxsKGNvbmZpZywge1xuICAgICAgICAnd2ViMyc6IHtcbiAgICAgICAgICAgIHR5cGU6ICdvYmplY3QnLFxuICAgICAgICAgICAgY29kZTogV0VCM19SRVFVSVJFRFxuICAgICAgICB9LFxuICAgICAgICAnY29udHJhY3RzLktlcm5lbC5hYmknOiB7XG4gICAgICAgICAgICB0eXBlOiAnb2JqZWN0JyxcbiAgICAgICAgICAgIGNvZGU6IENPTlRSQUNUX1JFUVVJUkVELFxuICAgICAgICAgICAgYXJnczogWydLZXJuZWwnXVxuICAgICAgICB9XG4gICAgfSk7XG5cbiAgICBjb25zdCBrZXIgPSBuZXcgY29uZmlnLndlYjMuZXRoLkNvbnRyYWN0KGNvbmZpZy5jb250cmFjdHMuS2VybmVsLmFiaSwgYWRkcmVzcyk7XG4gICAgY29uc3QgY3VycmVudFByaWNlID0gYXdhaXQga2VyLm1ldGhvZHNcbiAgICAgICAgLmN1cnJlbnRQcmljZSgpXG4gICAgICAgIC5jYWxsKCk7XG5cbiAgICByZXR1cm4gTnVtYmVyLnBhcnNlSW50KGN1cnJlbnRQcmljZSwgMTApO1xufTtcblxuLyoqXG4gKiBHZXQgY29tcGxleGl0eSBmcm9tIEtlcm5lbCBjb250cmFjdCBieSB0aGUga2VybmVsIGFkZHJlc3NcbiAqIFxuICogQHBhcmFtIHtzdHJpbmd9IGFkZHJlc3NcbiAqIEBwYXJhbSB7T2JqZWN0fSBjb25maWcgTGlicmFyeSBjb25maWcgKHByb3ZpZGVkIGJ5IHRoZSBwcm94eSBidXQgY2FuIGJlIG92ZXJyaWRkZW4pXG4gKiBAcmV0dXJucyB7UHJvbWlzZX0gQSBQcm9taXNlIG9iamVjdCByZXByZXNlbnRzIHRoZSB7bnVtYmVyfVxuICovXG5leHBvcnQgY29uc3QgZmV0Y2hDb21wbGV4aXR5ID0gYXN5bmMgKGFkZHJlc3MgPSAnJywgY29uZmlnID0ge30pID0+IHtcblxuICAgIGV4cGVjdC5hbGwoeyBhZGRyZXNzIH0sIHtcbiAgICAgICAgJ2FkZHJlc3MnOiB7XG4gICAgICAgICAgICB0eXBlOiAnYWRkcmVzcydcbiAgICAgICAgfVxuICAgIH0pO1xuXG4gICAgZXhwZWN0LmFsbChjb25maWcsIHtcbiAgICAgICAgJ3dlYjMnOiB7XG4gICAgICAgICAgICB0eXBlOiAnb2JqZWN0JyxcbiAgICAgICAgICAgIGNvZGU6IFdFQjNfUkVRVUlSRURcbiAgICAgICAgfSxcbiAgICAgICAgJ2NvbnRyYWN0cy5LZXJuZWwuYWJpJzoge1xuICAgICAgICAgICAgdHlwZTogJ29iamVjdCcsXG4gICAgICAgICAgICBjb2RlOiBDT05UUkFDVF9SRVFVSVJFRCxcbiAgICAgICAgICAgIGFyZ3M6IFsnS2VybmVsJ11cbiAgICAgICAgfVxuICAgIH0pO1xuXG4gICAgY29uc3Qga2VyID0gbmV3IGNvbmZpZy53ZWIzLmV0aC5Db250cmFjdChjb25maWcuY29udHJhY3RzLktlcm5lbC5hYmksIGFkZHJlc3MpO1xuICAgIGNvbnN0IGNvbXBsZXhpdHkgPSBhd2FpdCBrZXIubWV0aG9kc1xuICAgICAgICAuY29tcGxleGl0eSgpXG4gICAgICAgIC5jYWxsKCk7XG5cbiAgICByZXR1cm4gTnVtYmVyLnBhcnNlSW50KGNvbXBsZXhpdHksIDEwKTtcbn07XG5cbi8qKlxuICogR2V0IGRlc2NyaXB0aW9uIGZyb20gS2VybmVsIGNvbnRyYWN0IGJ5IHRoZSBrZXJuZWwgYWRkcmVzc1xuICogXG4gKiBAcGFyYW0ge3N0cmluZ30gYWRkcmVzc1xuICogQHBhcmFtIHtPYmplY3R9IGNvbmZpZyBMaWJyYXJ5IGNvbmZpZyAocHJvdmlkZWQgYnkgdGhlIHByb3h5IGJ1dCBjYW4gYmUgb3ZlcnJpZGRlbilcbiAqIEByZXR1cm5zIHtQcm9taXNlfSBBIFByb21pc2Ugb2JqZWN0IHJlcHJlc2VudHMgdGhlIHtudW1iZXJ9XG4gKi9cbmV4cG9ydCBjb25zdCBmZXRjaERlc2NyaXB0aW9uID0gYXN5bmMgKGFkZHJlc3MgPSAnJywgY29uZmlnID0ge30pID0+IHtcblxuICAgIGV4cGVjdC5hbGwoeyBhZGRyZXNzIH0sIHtcbiAgICAgICAgJ2FkZHJlc3MnOiB7XG4gICAgICAgICAgICB0eXBlOiAnYWRkcmVzcydcbiAgICAgICAgfVxuICAgIH0pO1xuXG4gICAgZXhwZWN0LmFsbChjb25maWcsIHtcbiAgICAgICAgJ3dlYjMnOiB7XG4gICAgICAgICAgICB0eXBlOiAnb2JqZWN0JyxcbiAgICAgICAgICAgIGNvZGU6IFdFQjNfUkVRVUlSRURcbiAgICAgICAgfSxcbiAgICAgICAgJ2NvbnRyYWN0cy5LZXJuZWwuYWJpJzoge1xuICAgICAgICAgICAgdHlwZTogJ29iamVjdCcsXG4gICAgICAgICAgICBjb2RlOiBDT05UUkFDVF9SRVFVSVJFRCxcbiAgICAgICAgICAgIGFyZ3M6IFsnS2VybmVsJ11cbiAgICAgICAgfVxuICAgIH0pO1xuXG4gICAgY29uc3Qga2VyID0gbmV3IGNvbmZpZy53ZWIzLmV0aC5Db250cmFjdChjb25maWcuY29udHJhY3RzLktlcm5lbC5hYmksIGFkZHJlc3MpO1xuICAgIGNvbnN0IGRlc2NyaXB0aW9uID0gYXdhaXQga2VyLm1ldGhvZHNcbiAgICAgICAgLmRlc2NyaXB0aW9uKClcbiAgICAgICAgLmNhbGwoKTtcblxuICAgIHJldHVybiBjb25maWcud2ViMy51dGlscy5oZXhUb1V0ZjgoZGVzY3JpcHRpb24pO1xufTtcblxuLyoqXG4gKiBHZXQgbWV0YWRhdGEgZnJvbSBLZXJuZWwgY29udHJhY3QgYnkgdGhlIGtlcm5lbCBhZGRyZXNzXG4gKiBcbiAqIEBwYXJhbSB7c3RyaW5nfSBhZGRyZXNzXG4gKiBAcGFyYW0ge09iamVjdH0gY29uZmlnIExpYnJhcnkgY29uZmlnIChwcm92aWRlZCBieSB0aGUgcHJveHkgYnV0IGNhbiBiZSBvdmVycmlkZGVuKVxuICogQHJldHVybnMge1Byb21pc2V9IEEgUHJvbWlzZSBvYmplY3QgcmVwcmVzZW50cyB0aGUge251bWJlcn1cbiAqL1xuZXhwb3J0IGNvbnN0IGZldGNoTWV0YWRhdGEgPSBhc3luYyAoYWRkcmVzcyA9ICcnLCBjb25maWcgPSB7fSkgPT4ge1xuXG4gICAgZXhwZWN0LmFsbCh7IGFkZHJlc3MgfSwge1xuICAgICAgICAnYWRkcmVzcyc6IHtcbiAgICAgICAgICAgIHR5cGU6ICdhZGRyZXNzJ1xuICAgICAgICB9XG4gICAgfSk7XG5cbiAgICBleHBlY3QuYWxsKGNvbmZpZywge1xuICAgICAgICAnd2ViMyc6IHtcbiAgICAgICAgICAgIHR5cGU6ICdvYmplY3QnLFxuICAgICAgICAgICAgY29kZTogV0VCM19SRVFVSVJFRFxuICAgICAgICB9LFxuICAgICAgICAnY29udHJhY3RzLktlcm5lbC5hYmknOiB7XG4gICAgICAgICAgICB0eXBlOiAnb2JqZWN0JyxcbiAgICAgICAgICAgIGNvZGU6IENPTlRSQUNUX1JFUVVJUkVELFxuICAgICAgICAgICAgYXJnczogWydLZXJuZWwnXVxuICAgICAgICB9XG4gICAgfSk7XG5cbiAgICBjb25zdCBrZXIgPSBuZXcgY29uZmlnLndlYjMuZXRoLkNvbnRyYWN0KGNvbmZpZy5jb250cmFjdHMuS2VybmVsLmFiaSwgYWRkcmVzcyk7XG4gICAgY29uc3QgbWV0YWRhdGEgPSBhd2FpdCBrZXIubWV0aG9kc1xuICAgICAgICAubWV0YWRhdGEoKVxuICAgICAgICAuY2FsbCgpO1xuXG4gICAgcmV0dXJuIGNvbmZpZy53ZWIzLnV0aWxzLmhleFRvVXRmOChtZXRhZGF0YSk7XG59O1xuXG4vKipcbiAqIEdldCBLZXJuZWwgYnkgdGhlIGtlcm5lbCBhZGRyZXNzXG4gKiBcbiAqIEBwYXJhbSB7c3RyaW5nfSBhZGRyZXNzXG4gKiBAcGFyYW0ge09iamVjdH0gY29uZmlnIExpYnJhcnkgY29uZmlnIChwcm92aWRlZCBieSB0aGUgcHJveHkgYnV0IGNhbiBiZSBvdmVycmlkZGVuKVxuICogQHJldHVybnMge1Byb21pc2V9IFByb21pc2Ugb2JqZWN0IHJlcHJlc2VudHMgdGhlIHtPYmplY3RbXX1cbiAqL1xuZXhwb3J0IGNvbnN0IGZldGNoS2VybmVsID0gYXN5bmMgKGFkZHJlc3MgPSAnJywgY29uZmlnID0ge30pID0+IHtcblxuICAgIGNvbnN0IFtcbiAgICAgICAgaXBmc0FkZHJlc3MsXG4gICAgICAgIGRhdGFEaW0sXG4gICAgICAgIGN1cnJlbnRQcmljZSxcbiAgICAgICAgY29tcGxleGl0eSxcbiAgICAgICAgbWV0YWRhdGEsXG4gICAgICAgIGRlc2NyaXB0aW9uXG4gICAgXSA9IGF3YWl0IFByb21pc2UuYWxsKFtcbiAgICAgICAgZmV0Y2hJcGZzQWRkcmVzcyhhZGRyZXNzLCBjb25maWcpLFxuICAgICAgICBmZXRjaERhdGFEaW0oYWRkcmVzcywgY29uZmlnKSxcbiAgICAgICAgZmV0Y2hDdXJyZW50UHJpY2UoYWRkcmVzcywgY29uZmlnKSxcbiAgICAgICAgZmV0Y2hDb21wbGV4aXR5KGFkZHJlc3MsIGNvbmZpZyksXG4gICAgICAgIGZldGNoTWV0YWRhdGEoYWRkcmVzcywgY29uZmlnKSxcbiAgICAgICAgZmV0Y2hEZXNjcmlwdGlvbihhZGRyZXNzLCBjb25maWcpXG4gICAgXSk7XG5cbiAgICByZXR1cm4ge1xuICAgICAgICBhZGRyZXNzLFxuICAgICAgICBpcGZzQWRkcmVzcyxcbiAgICAgICAgZGF0YURpbSxcbiAgICAgICAgY3VycmVudFByaWNlLFxuICAgICAgICBjb21wbGV4aXR5LFxuICAgICAgICBtZXRhZGF0YSxcbiAgICAgICAgZGVzY3JpcHRpb25cbiAgICB9O1xufTtcblxuLyoqXG4gKiBHZXQga2VybmVsIGJ5IGlkXG4gKiBcbiAqIEBwYXJhbSB7aW50ZWdlcn0gaWQgXG4gKiBAcGFyYW0ge09iamVjdH0gY29uZmlnIExpYnJhcnkgY29uZmlnIChwcm92aWRlZCBieSB0aGUgcHJveHkgYnV0IGNhbiBiZSBvdmVycmlkZGVuKVxuICogQHJldHVybnMge1Byb21pc2V9IEEgUHJvbWlzZSBvYmplY3QgcmVwcmVzZW50cyB0aGUge09iamVjdH1cbiAqL1xuZXhwb3J0IGNvbnN0IGZldGNoS2VybmVsQnlJZCA9IGFzeW5jIChpZCwgY29uZmlnID0ge30pID0+IHtcbiAgICBcbiAgICBjb25zdCBhZGRyZXNzID0gYXdhaXQgZmV0Y2hBZGRyZXNzQnlJZChpZCwgY29uZmlnKTtcbiAgICBjb25zdCBrZXJuZWwgPSBhd2FpdCBmZXRjaEtlcm5lbChhZGRyZXNzLCBjb25maWcpO1xuXG4gICAgcmV0dXJuIGtlcm5lbDtcbn07XG5cbi8qKlxuICogR2V0IGFsbCBrZXJuZWxzXG4gKiBcbiAqIEBwYXJhbSB7T2JqZWN0fSBjb25maWcgTGlicmFyeSBjb25maWcgKHByb3ZpZGVkIGJ5IHRoZSBwcm94eSBidXQgY2FuIGJlIG92ZXJyaWRkZW4pXG4gKiBAcmV0dXJucyB7UHJvbWlzZX0gUHJvbWlzZSBvYmplY3QgcmVwcmVzZW50cyB0aGUge09iamVjdFtdfVxuICovXG5leHBvcnQgY29uc3QgZmV0Y2hBbGwgPSBhc3luYyAoY29uZmlnID0ge30pID0+IHtcblxuICAgIGxldCByZWNvcmRzID0gW107XG4gICAgbGV0IGVycm9yID0gW107XG5cbiAgICB0cnkge1xuXG4gICAgICAgIGNvbnN0IGNvdW50ID0gYXdhaXQgZmV0Y2hDb3VudChjb25maWcpO1xuXG4gICAgICAgIGZvciAobGV0IGk9MDsgaSA8IGNvdW50OyBpKyspIHtcbiAgICAgICAgICAgIFxuICAgICAgICAgICAgdHJ5IHtcblxuICAgICAgICAgICAgICAgIGNvbnN0IGtlcm5lbCA9IGF3YWl0IGZldGNoS2VybmVsQnlJZChpLCBjb25maWcpO1xuXG4gICAgICAgICAgICAgICAgcmVjb3Jkcy5wdXNoKHtcbiAgICAgICAgICAgICAgICAgICAgaWQ6IGksXG4gICAgICAgICAgICAgICAgICAgIC4uLmtlcm5lbFxuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfSBjYXRjaChlcnIpIHtcbiAgICAgICAgICAgICAgICBlcnJvci5wdXNoKHtcbiAgICAgICAgICAgICAgICAgICAgaWQ6IGksXG4gICAgICAgICAgICAgICAgICAgIG1lc3NhZ2U6IGVyci5tZXNzYWdlXG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9ICAgICAgICBcbiAgICAgICAgfVxuICAgIH0gY2F0Y2goZXJyKSB7XG4gICAgICAgIGVycm9yLnB1c2goe1xuICAgICAgICAgICAgZXJyb3I6IGVyci5tZXNzYWdlXG4gICAgICAgIH0pO1xuICAgIH0gICBcblxuICAgIHJldHVybiB7XG4gICAgICAgIHJlY29yZHMsXG4gICAgICAgIGVycm9yXG4gICAgfTtcbn07XG5cbi8qKlxuICogRGVwbG95IEtlcm5lbCBjb250cmFjdCB0byB0aGUgbmV0d29ya1xuICogXG4gKiBAcGFyYW0ge3N0cmluZ30ga2VybmVsSXBmc0hhc2ggXG4gKiBAcGFyYW0ge09iamVjdH0gb3B0aW9ucyB7IGRpbWVuc2lvbiwgY29tcGxleGl0eSwgcHJpY2UsIG1ldGFkYXRhLCBkZXNjcmlwdGlvbiB9IFxuICogQHBhcmFtIHtTdHJpbmd9IHB1Ymxpc2hlciBQdWJsaXNoZXIgYWRkcmVzc1xuICogQHBhcmFtIHtPYmplY3R9IGNvbmZpZyBMaWJyYXJ5IGNvbmZpZyAocHJvdmlkZWQgYnkgdGhlIHByb3h5IGJ1dCBjYW4gYmUgb3ZlcnJpZGRlbilcbiAqIEByZXR1cm5zIHtQcm9taXNlfSBQcm9taXNlIG9iamVjdCByZXNvbHZlZCB0byBjb250cmFjdCBhZGRyZXNzXG4gKi9cbmV4cG9ydCBjb25zdCBkZXBsb3kgPSBhc3luYyAoa2VybmVsSXBmc0hhc2gsIHsgZGltZW5zaW9uLCBjb21wbGV4aXR5LCBwcmljZSwgbWV0YWRhdGEsIGRlc2NyaXB0aW9uIH0sIHB1Ymxpc2hlciwgY29uZmlnID0ge30pID0+IHtcblxuICAgIGV4cGVjdC5hbGwoeyBrZXJuZWxJcGZzSGFzaCwgcHVibGlzaGVyLCBkaW1lbnNpb24sIGNvbXBsZXhpdHksIHByaWNlLCBtZXRhZGF0YSwgZGVzY3JpcHRpb24gfSwge1xuICAgICAgICAna2VybmVsSXBmc0hhc2gnOiB7XG4gICAgICAgICAgICB0eXBlOiAnc3RyaW5nJ1xuICAgICAgICB9LFxuICAgICAgICAncHVibGlzaGVyJzoge1xuICAgICAgICAgICAgdHlwZTogJ2FkZHJlc3MnXG4gICAgICAgIH0sXG4gICAgICAgICdkaW1lbnNpb24nOiB7XG4gICAgICAgICAgICB0eXBlOiAnbnVtYmVyJ1xuICAgICAgICB9LFxuICAgICAgICAnY29tcGxleGl0eSc6IHtcbiAgICAgICAgICAgIHR5cGU6ICdudW1iZXInXG4gICAgICAgIH0sXG4gICAgICAgICdwcmljZSc6IHtcbiAgICAgICAgICAgIHR5cGU6ICdudW1iZXInXG4gICAgICAgIH0sXG4gICAgICAgICdtZXRhZGF0YSc6IHtcbiAgICAgICAgICAgIHR5cGU6ICdzdHJpbmcnXG4gICAgICAgIH0sXG4gICAgICAgICdkZXNjcmlwdGlvbic6IHtcbiAgICAgICAgICAgIHR5cGU6ICdzdHJpbmcnXG4gICAgICAgIH1cbiAgICB9KTtcblxuICAgIGV4cGVjdC5hbGwoY29uZmlnLCB7XG4gICAgICAgICd3ZWIzJzoge1xuICAgICAgICAgICAgdHlwZTogJ29iamVjdCcsXG4gICAgICAgICAgICBjb2RlOiBXRUIzX1JFUVVJUkVEXG4gICAgICAgIH0sXG4gICAgICAgICdjb250cmFjdHMuS2VybmVsLmFiaSc6IHtcbiAgICAgICAgICAgIHR5cGU6ICdvYmplY3QnLFxuICAgICAgICAgICAgY29kZTogQ09OVFJBQ1RfUkVRVUlSRUQsXG4gICAgICAgICAgICBhcmdzOiBbJ0tlcm5lbCddXG4gICAgICAgIH1cbiAgICB9KTtcblxuICAgIGNvbnN0IGFyZ3MgPSBbXG4gICAgICAgIGNvbmZpZy53ZWIzLnV0aWxzLnV0ZjhUb0hleChrZXJuZWxJcGZzSGFzaCksIFxuICAgICAgICBkaW1lbnNpb24sIFxuICAgICAgICBjb21wbGV4aXR5LCBcbiAgICAgICAgcHJpY2UsIFxuICAgICAgICBjb25maWcud2ViMy51dGlscy51dGY4VG9IZXgobWV0YWRhdGEpLFxuICAgICAgICBjb25maWcud2ViMy51dGlscy51dGY4VG9IZXgoZGVzY3JpcHRpb24pXG4gICAgXTtcbiAgICAgICAgXG4gICAgLy8gRXN0aW1hdGUgcmVxdWlyZWQgYW1vdW50IG9mIGdhc1xuICAgIGNvbnN0IGdhcyA9IGF3YWl0IHdlYjNIZWxwZXJzLmVzdGltYXRlR2FzKGNvbmZpZy5jb250cmFjdHMuS2VybmVsLmJ5dGVjb2RlLCBhcmdzLCBjb25maWcpO1xuXG4gICAgLy8gQ3JlYXRlIGFuZCBkZXBsb3kga2VybmVsIGNvbnRyYWN0XG4gICAgY29uc3Qga2VybmVsQ29udHJhY3RBZGRyZXNzID0gYXdhaXQgd2ViM0hlbHBlcnMuZGVwbG95Q29udHJhY3QoY29uZmlnLmNvbnRyYWN0cy5LZXJuZWwsIHtcbiAgICAgICAgYXJncyxcbiAgICAgICAgZnJvbTogcHVibGlzaGVyLFxuICAgICAgICBnYXM6IE51bWJlci5wYXJzZUludChnYXMgKiAxLjUsIDEwKVxuICAgIH0sIGNvbmZpZyk7XG5cbiAgICByZXR1cm4ga2VybmVsQ29udHJhY3RBZGRyZXNzO1xufTtcblxuLyoqXG4gKiBBZGQga2VybmVsIHRvIG1hcmtldFxuICogXG4gKiBAcGFyYW0ge1N0cmluZ30ga2VybmVsQ29udHJhY3RBZGRyZXNzIFxuICogQHBhcmFtIHtTdHJpbmd9IHB1Ymxpc2hlckFkZHJlc3MgXG4gKiBAcGFyYW0ge09iamVjdH0gY29uZmlnIExpYnJhcnkgY29uZmlnIChwcm92aWRlZCBieSB0aGUgcHJveHkgYnV0IGNhbiBiZSBvdmVycmlkZGVuKVxuICogQHJldHVybnMge1Byb21pc2V9IFByb21pc2Ugb2JqZWN0IHJlc29sdmVkIHRvIHtzdHJpbmd9IGNvbnRyYWN0QWRkcmVzcyAvLyBjYW4gYmUgbnVsbCBpZiB1c2VkIGdhbmFjaGUtY2xpIGVudmlyb25tZW50XG4gKi9cbmV4cG9ydCBjb25zdCBhZGRUb01hcmtldCA9IChrZXJuZWxDb250cmFjdEFkZHJlc3MsIHB1Ymxpc2hlckFkZHJlc3MsIGNvbmZpZyA9IHt9KSA9PiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG5cbiAgICBleHBlY3QuYWxsKHsga2VybmVsQ29udHJhY3RBZGRyZXNzLCBwdWJsaXNoZXJBZGRyZXNzIH0sIHtcbiAgICAgICAgJ2tlcm5lbENvbnRyYWN0QWRkcmVzcyc6IHtcbiAgICAgICAgICAgIHR5cGU6ICdhZGRyZXNzJ1xuICAgICAgICB9LFxuICAgICAgICAncHVibGlzaGVyQWRkcmVzcyc6IHtcbiAgICAgICAgICAgIHR5cGU6ICdhZGRyZXNzJ1xuICAgICAgICB9XG4gICAgfSk7XG5cbiAgICBleHBlY3QuYWxsKGNvbmZpZywge1xuICAgICAgICAnd2ViMyc6IHtcbiAgICAgICAgICAgIHR5cGU6ICdvYmplY3QnLFxuICAgICAgICAgICAgY29kZTogV0VCM19SRVFVSVJFRFxuICAgICAgICB9LFxuICAgICAgICAnY29udHJhY3RzLlBhbmRvcmFNYXJrZXQuYWJpJzoge1xuICAgICAgICAgICAgdHlwZTogJ29iamVjdCcsXG4gICAgICAgICAgICBjb2RlOiBDT05UUkFDVF9SRVFVSVJFRCxcbiAgICAgICAgICAgIGFyZ3M6IFsnUGFuZG9yYU1hcmtldCddXG4gICAgICAgIH0sXG4gICAgICAgICdhZGRyZXNzZXMuUGFuZG9yYU1hcmtldCc6IHtcbiAgICAgICAgICAgIHR5cGU6ICdhZGRyZXNzJyxcbiAgICAgICAgICAgIGNvZGU6IEFERFJFU1NfUkVRVUlSRUQsXG4gICAgICAgICAgICBhcmdzOiBbJ0tlcm5lbCddXG4gICAgICAgIH0sXG4gICAgICAgICd3ZWIzLmN1cnJlbnRQcm92aWRlci5pc01ldGFNYXNrJzoge1xuICAgICAgICAgICAgdHlwZTogJ2Jvb2xlYW4nLFxuICAgICAgICAgICAgY29kZTogV0VCM19NRVRBTUFTS19SRVFVSVJFRFxuICAgICAgICB9XG4gICAgfSk7XG5cbiAgICBjb25zdCBtYXJrZXQgPSBuZXcgY29uZmlnLndlYjMuZXRoLkNvbnRyYWN0KGNvbmZpZy5jb250cmFjdHMuUGFuZG9yYU1hcmtldC5hYmksIGNvbmZpZy5hZGRyZXNzZXMuUGFuZG9yYU1hcmtldCk7XG4gICAgbWFya2V0Lm1ldGhvZHNcbiAgICAgICAgLmFkZEtlcm5lbChrZXJuZWxDb250cmFjdEFkZHJlc3MpXG4gICAgICAgIC5zZW5kKHtcbiAgICAgICAgICAgIGZyb206IHB1Ymxpc2hlckFkZHJlc3NcbiAgICAgICAgfSlcbiAgICAgICAgLm9uKCdlcnJvcicsIHJlamVjdClcbiAgICAgICAgLm9uKCdyZWNlaXB0JywgcmVjZWlwdCA9PiB7XG5cbiAgICAgICAgICAgIGlmIChOdW1iZXIocmVjZWlwdC5zdGF0dXMpID09PSAwKSB7XG5cbiAgICAgICAgICAgICAgICByZXR1cm4gcmVqZWN0KHBqc0Vycm9yKFRSQU5TQUNUSU9OX1VOU1VDQ0VTU0ZVTCkpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICByZXNvbHZlKHJlY2VpcHQuY29udHJhY3RBZGRyZXNzIHx8IHJlY2VpcHQuZXZlbnRzLktlcm5lbEFkZGVkLnJldHVyblZhbHVlcy5rZXJuZWwpO1xuICAgICAgICB9KTtcbiAgICAvLyBAbm90ZSBJbiBjYXNlIG9mIGdhbmFjaGUtY2xpIGJsb2NrY2hhaW4gXCJjb250cmFjdEFkZHJlc3NcIiBhbHdheXMgd2lsbCBiZSBlcXVhbCB0byBudWxsXG59KTtcblxuLyoqXG4gKiBSZW1vdmUga2VybmVsIGZyb20gUGFuZG9yYU1hcmtldFxuICogXG4gKiBAcGFyYW0ge1N0cmluZ30ga2VybmVsQWRkcmVzc1xuICogQHBhcmFtIHtTdHJpbmd9IHB1Ymxpc2hlckFkZHJlc3MgXG4gKiBAcGFyYW0ge09iamVjdH0gY29uZmlnIExpYnJhcnkgY29uZmlnIChwcm92aWRlZCBieSB0aGUgcHJveHkgYnV0IGNhbiBiZSBvdmVycmlkZGVuKSBcbiAqIEByZXR1cm5zIHtQcm9taXNlfSBQcm9taXNlIG9iamVjdCByZXNvbHZlZCB0byB7U3RyaW5nfSBjb250cmFjdEFkZHJlc3NcbiAqL1xuZXhwb3J0IGNvbnN0IHJlbW92ZUtlcm5lbCA9IChrZXJuZWxBZGRyZXNzLCBwdWJsaXNoZXJBZGRyZXNzLCBjb25maWcgPSB7fSkgPT4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuXG4gICAgZXhwZWN0LmFsbCh7IGtlcm5lbEFkZHJlc3MsIHB1Ymxpc2hlckFkZHJlc3MgfSwge1xuICAgICAgICAna2VybmVsQWRkcmVzcyc6IHtcbiAgICAgICAgICAgIHR5cGU6ICdhZGRyZXNzJ1xuICAgICAgICB9LFxuICAgICAgICAncHVibGlzaGVyQWRkcmVzcyc6IHtcbiAgICAgICAgICAgIHR5cGU6ICdhZGRyZXNzJ1xuICAgICAgICB9XG4gICAgfSk7XG5cbiAgICBleHBlY3QuYWxsKGNvbmZpZywge1xuICAgICAgICAnd2ViMyc6IHtcbiAgICAgICAgICAgIHR5cGU6ICdvYmplY3QnLFxuICAgICAgICAgICAgY29kZTogV0VCM19SRVFVSVJFRFxuICAgICAgICB9LFxuICAgICAgICAnY29udHJhY3RzLlBhbmRvcmFNYXJrZXQuYWJpJzoge1xuICAgICAgICAgICAgdHlwZTogJ29iamVjdCcsXG4gICAgICAgICAgICBjb2RlOiBDT05UUkFDVF9SRVFVSVJFRCxcbiAgICAgICAgICAgIGFyZ3M6IFsnUGFuZG9yYU1hcmtldCddXG4gICAgICAgIH0sXG4gICAgICAgICdhZGRyZXNzZXMuUGFuZG9yYU1hcmtldCc6IHtcbiAgICAgICAgICAgIHR5cGU6ICdhZGRyZXNzJyxcbiAgICAgICAgICAgIGNvZGU6IEFERFJFU1NfUkVRVUlSRUQsXG4gICAgICAgICAgICBhcmdzOiBbJ0tlcm5lbCddXG4gICAgICAgIH1cbiAgICB9KTtcblxuICAgIGNvbnN0IG1hcmtldCA9IG5ldyBjb25maWcud2ViMy5ldGguQ29udHJhY3QoY29uZmlnLmNvbnRyYWN0cy5QYW5kb3JhTWFya2V0LmFiaSwgY29uZmlnLmFkZHJlc3Nlcy5QYW5kb3JhTWFya2V0KTtcbiAgICBtYXJrZXQubWV0aG9kc1xuICAgICAgICAucmVtb3ZlS2VybmVsKGtlcm5lbEFkZHJlc3MpXG4gICAgICAgIC5zZW5kKHtcbiAgICAgICAgICAgIGZyb206IHB1Ymxpc2hlckFkZHJlc3NcbiAgICAgICAgfSlcbiAgICAgICAgLm9uKCdlcnJvcicsIHJlamVjdClcbiAgICAgICAgLm9uKCdyZWNlaXB0JywgcmVjZWlwdCA9PiB7XG5cbiAgICAgICAgICAgIGlmIChOdW1iZXIocmVjZWlwdC5zdGF0dXMpID09PSAwKSB7XG5cbiAgICAgICAgICAgICAgICByZXR1cm4gcmVqZWN0KHBqc0Vycm9yKFRSQU5TQUNUSU9OX1VOU1VDQ0VTU0ZVTCkpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICByZXNvbHZlKHJlY2VpcHQuY29udHJhY3RBZGRyZXNzKTtcbiAgICAgICAgfSk7XG59KTtcblxuLyoqXG4gKiBIYW5kbGUgZXZlbnQgS2VybmVsQWRkZWRcbiAqIFxuICogQHBhcmFtIHtPYmplY3R9IG9wdGlvbnMgRXZlbnQgaGFuZGxlciBvcHRpb25zXG4gKiBAcGFyYW0ge09iamVjdH0gY29uZmlnIExpYnJhcnkgY29uZmlnIChwcm92aWRlZCBieSB0aGUgcHJveHkgYnV0IGNhbiBiZSBvdmVycmlkZGVuKVxuICogQHJldHVybnMge09iamVjdH0gT2JqZWN0IHdpdGggY2hhaW5lZCBjYWxsYmFja3MgI2RhdGEgYW5kICNlcnJvclxuICovXG5leHBvcnQgY29uc3QgZXZlbnRLZXJuZWxBZGRlZCA9IChvcHRpb25zID0ge30sIGNvbmZpZyA9IHt9KSA9PiB7XG5cbiAgICBleHBlY3QuYWxsKHsgb3B0aW9ucyB9LCB7XG4gICAgICAgICdvcHRpb25zJzoge1xuICAgICAgICAgICAgdHlwZTogJ29iamVjdCdcbiAgICAgICAgfVxuICAgIH0pO1xuXG4gICAgZXhwZWN0LmFsbChjb25maWcsIHtcbiAgICAgICAgJ3dlYjMnOiB7XG4gICAgICAgICAgICB0eXBlOiAnb2JqZWN0JyxcbiAgICAgICAgICAgIGNvZGU6IFdFQjNfUkVRVUlSRURcbiAgICAgICAgfSxcbiAgICAgICAgJ2NvbnRyYWN0cy5QYW5kb3JhTWFya2V0LmFiaSc6IHtcbiAgICAgICAgICAgIHR5cGU6ICdvYmplY3QnLFxuICAgICAgICAgICAgY29kZTogQ09OVFJBQ1RfUkVRVUlSRUQsXG4gICAgICAgICAgICBhcmdzOiBbJ1BhbmRvcmFNYXJrZXQnXVxuICAgICAgICB9LFxuICAgICAgICAnYWRkcmVzc2VzLlBhbmRvcmFNYXJrZXQnOiB7XG4gICAgICAgICAgICB0eXBlOiAnYWRkcmVzcycsXG4gICAgICAgICAgICBjb2RlOiBBRERSRVNTX1JFUVVJUkVELFxuICAgICAgICAgICAgYXJnczogWydLZXJuZWwnXVxuICAgICAgICB9XG4gICAgfSk7XG5cbiAgICBjb25zdCBjYWxsYmFja3MgPSB7XG4gICAgICAgIG9uRGF0YTogKCkgPT4ge30sXG4gICAgICAgIG9uRXJyb3I6ICgpID0+IHt9XG4gICAgfTtcblxuICAgIGNvbnN0IGNoYWluID0ge1xuICAgICAgICBkYXRhOiAoY2IgPSAoKSA9PiB7fSkgPT4ge1xuICAgICAgICAgICAgY2FsbGJhY2tzLm9uRGF0YSA9IGNiO1xuICAgICAgICAgICAgcmV0dXJuIGNoYWluO1xuICAgICAgICB9LFxuICAgICAgICBlcnJvcjogKGNiID0gKCkgPT4ge30pID0+IHtcbiAgICAgICAgICAgIGNhbGxiYWNrcy5vbkVycm9yID0gY2I7XG4gICAgICAgICAgICByZXR1cm4gY2hhaW47XG4gICAgICAgIH0sXG4gICAgICAgIHN1YnNjcmliZWQ6IChjYiA9ICgpID0+IHt9KSA9PiB7XG4gICAgICAgICAgICBjYWxsYmFja3Mub25TdWJzY3JpYmVkID0gY2I7XG4gICAgICAgICAgICByZXR1cm4gY2hhaW47XG4gICAgICAgIH1cbiAgICB9O1xuXG4gICAgY29uc3QgbWFyID0gbmV3IGNvbmZpZy53ZWIzLmV0aC5Db250cmFjdChjb25maWcuY29udHJhY3RzLlBhbmRvcmFNYXJrZXQuYWJpLCBjb25maWcuYWRkcmVzc2VzLlBhbmRvcmFNYXJrZXQpO1xuICAgIGNoYWluLmV2ZW50ID0gbWFyLmV2ZW50cy5LZXJuZWxBZGRlZChvcHRpb25zKVxuICAgICAgICAub24oJ2RhdGEnLCBhc3luYyByZXMgPT4ge1xuXG4gICAgICAgICAgICB0cnkge1xuXG4gICAgICAgICAgICAgICAgY29uc3Qga2VybmVsID0gYXdhaXQgZmV0Y2hLZXJuZWwocmVzLnJldHVyblZhbHVlcy5rZXJuZWwsIGNvbmZpZyk7XG4gICAgICAgICAgICAgICAgY2FsbGJhY2tzLm9uRGF0YSh7XG4gICAgICAgICAgICAgICAgICAgIGFkZHJlc3M6IHJlcy5yZXR1cm5WYWx1ZXMua2VybmVsLFxuICAgICAgICAgICAgICAgICAgICBrZXJuZWwsXG4gICAgICAgICAgICAgICAgICAgIHN0YXR1czogJ2NyZWF0ZWQnLFxuICAgICAgICAgICAgICAgICAgICBldmVudDogJ1BhbmRvcmFNYXJrZXQuS2VybmVsQWRkZWQnXG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9IGNhdGNoKGVycikge1xuICAgICAgICAgICAgICAgIGNhbGxiYWNrcy5vbkVycm9yKGVycik7XG4gICAgICAgICAgICB9ICAgICAgICAgICAgXG4gICAgICAgIH0pXG4gICAgICAgIC5vbignZXJyb3InLCBjYWxsYmFja3Mub25FcnJvcik7XG5cbiAgICByZXR1cm4gY2hhaW47XG59O1xuXG4vKipcbiAqIEhhbmRsZSBldmVudCBLZXJuZWxSZW1vdmVkXG4gKiBcbiAqIEBwYXJhbSB7T2JqZWN0fSBvcHRpb25zIEV2ZW50IGhhbmRsZXIgb3B0aW9uc1xuICogQHBhcmFtIHtPYmplY3R9IGNvbmZpZyBMaWJyYXJ5IGNvbmZpZyAocHJvdmlkZWQgYnkgdGhlIHByb3h5IGJ1dCBjYW4gYmUgb3ZlcnJpZGRlbilcbiAqIEByZXR1cm5zIHtPYmplY3R9IE9iamVjdCB3aXRoIGNoYWluZWQgY2FsbGJhY2tzICNkYXRhIGFuZCAjZXJyb3JcbiAqL1xuZXhwb3J0IGNvbnN0IGV2ZW50S2VybmVsUmVtb3ZlZCA9IChvcHRpb25zID0ge30sIGNvbmZpZyA9IHt9KSA9PiB7XG5cbiAgICBleHBlY3QuYWxsKHsgb3B0aW9ucyB9LCB7XG4gICAgICAgICdvcHRpb25zJzoge1xuICAgICAgICAgICAgdHlwZTogJ29iamVjdCdcbiAgICAgICAgfVxuICAgIH0pO1xuXG4gICAgZXhwZWN0LmFsbChjb25maWcsIHtcbiAgICAgICAgJ3dlYjMnOiB7XG4gICAgICAgICAgICB0eXBlOiAnb2JqZWN0JyxcbiAgICAgICAgICAgIGNvZGU6IFdFQjNfUkVRVUlSRURcbiAgICAgICAgfSxcbiAgICAgICAgJ2NvbnRyYWN0cy5QYW5kb3JhTWFya2V0LmFiaSc6IHtcbiAgICAgICAgICAgIHR5cGU6ICdvYmplY3QnLFxuICAgICAgICAgICAgY29kZTogQ09OVFJBQ1RfUkVRVUlSRUQsXG4gICAgICAgICAgICBhcmdzOiBbJ1BhbmRvcmFNYXJrZXQnXVxuICAgICAgICB9LFxuICAgICAgICAnYWRkcmVzc2VzLlBhbmRvcmFNYXJrZXQnOiB7XG4gICAgICAgICAgICB0eXBlOiAnYWRkcmVzcycsXG4gICAgICAgICAgICBjb2RlOiBBRERSRVNTX1JFUVVJUkVELFxuICAgICAgICAgICAgYXJnczogWydQYW5kb3JhTWFya2V0J11cbiAgICAgICAgfVxuICAgIH0pO1xuXG4gICAgY29uc3QgY2FsbGJhY2tzID0ge1xuICAgICAgICBvbkRhdGE6ICgpID0+IHt9LFxuICAgICAgICBvbkVycm9yOiAoKSA9PiB7fVxuICAgIH07XG5cbiAgICBjb25zdCBjaGFpbiA9IHtcbiAgICAgICAgZGF0YTogKGNiID0gKCkgPT4ge30pID0+IHtcbiAgICAgICAgICAgIGNhbGxiYWNrcy5vbkRhdGEgPSBjYjtcbiAgICAgICAgICAgIHJldHVybiBjaGFpbjtcbiAgICAgICAgfSxcbiAgICAgICAgZXJyb3I6IChjYiA9ICgpID0+IHt9KSA9PiB7XG4gICAgICAgICAgICBjYWxsYmFja3Mub25FcnJvciA9IGNiO1xuICAgICAgICAgICAgcmV0dXJuIGNoYWluO1xuICAgICAgICB9XG4gICAgfTtcblxuICAgIGNvbnN0IG1hciA9IG5ldyBjb25maWcud2ViMy5ldGguQ29udHJhY3QoY29uZmlnLmNvbnRyYWN0cy5QYW5kb3JhTWFya2V0LmFiaSwgY29uZmlnLmFkZHJlc3Nlcy5QYW5kb3JhTWFya2V0KTtcbiAgICBjaGFpbi5ldmVudCA9IG1hci5ldmVudHMuS2VybmVsUmVtb3ZlZChvcHRpb25zKVxuICAgICAgICAub24oJ2RhdGEnLCBhc3luYyByZXMgPT4ge1xuXG4gICAgICAgICAgICBjYWxsYmFja3Mub25EYXRhKHtcbiAgICAgICAgICAgICAgICBhZGRyZXNzOiByZXMucmV0dXJuVmFsdWVzLmtlcm5lbCxcbiAgICAgICAgICAgICAgICBzdGF0dXM6ICdyZW1vdmVkJyxcbiAgICAgICAgICAgICAgICBldmVudDogJ1BhbmRvcmFNYXJrZXQuS2VybmVsUmVtb3ZlZCdcbiAgICAgICAgICAgIH0pOyAgICAgICAgICAgIFxuICAgICAgICB9KVxuICAgICAgICAub24oJ2Vycm9yJywgY2FsbGJhY2tzLm9uRXJyb3IpO1xuXG4gICAgcmV0dXJuIGNoYWluO1xufTtcbiJdfQ==