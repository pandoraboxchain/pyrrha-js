/**
 * Datasets related methods
 * This file it is a part of the Pandora Pyrrha Javascript library
 * 
 * @file datasets.js
 * @author Kostiantyn Smyrnov <kostysh@gmail.com>
 * @date 2018
 */
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.eventDatasetRemoved = exports.eventDatasetAdded = exports.removeDataset = exports.addToMarket = exports.deploy = exports.fetchAll = exports.fetchDatasetById = exports.fetchDataset = exports.fetchMetadata = exports.fetchDescription = exports.fetchBatchesCount = exports.fetchCurrentPrice = exports.fetchDataDim = exports.fetchIpfsAddress = exports.fetchAddressById = exports.fetchCount = void 0;

var expect = _interopRequireWildcard(require("./helpers/expect"));

var _errors = _interopRequireWildcard(require("./helpers/errors"));

var web3Helpers = _interopRequireWildcard(require("./helpers/web3"));

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; var ownKeys = Object.keys(source); if (typeof Object.getOwnPropertySymbols === 'function') { ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) { return Object.getOwnPropertyDescriptor(source, sym).enumerable; })); } ownKeys.forEach(function (key) { _defineProperty(target, key, source[key]); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

/**
 * Get datasets count from PandoraMarket contract
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
  const count = await mar.methods.datasetsCount().call();
  return Number.parseInt(count, 10);
};
/**
 * Get Dataset address by dataset id
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
      args: ['Market']
    }
  });
  const mar = new config.web3.eth.Contract(config.contracts.PandoraMarket.abi, config.addresses.PandoraMarket);
  const datasetContract = await mar.methods.datasets(id).call();
  return datasetContract;
};
/**
 * Get IPFS address from Dataset contract by the dataset address
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
    'contracts.Dataset.abi': {
      type: 'object',
      code: _errors.CONTRACT_REQUIRED,
      args: ['Dataset']
    }
  });
  const dat = new config.web3.eth.Contract(config.contracts.Dataset.abi, address);
  const ipfsAddress = await dat.methods.ipfsAddress().call();
  return config.web3.utils.hexToAscii(ipfsAddress);
};
/**
 * Get data dim from Dataset contract by the dataset address
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
    'contracts.Dataset.abi': {
      type: 'object',
      code: _errors.CONTRACT_REQUIRED,
      args: ['Dataset']
    }
  });
  const dat = new config.web3.eth.Contract(config.contracts.Dataset.abi, address);
  const dataDim = await dat.methods.dataDim().call();
  return Number.parseInt(dataDim, 10);
};
/**
 * Get current price from Dataset contract by the dataset address
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
    'contracts.Dataset.abi': {
      type: 'object',
      code: _errors.CONTRACT_REQUIRED,
      args: ['Dataset']
    }
  });
  const dat = new config.web3.eth.Contract(config.contracts.Dataset.abi, address);
  const currentPrice = await dat.methods.currentPrice().call();
  return Number.parseInt(currentPrice, 10);
};
/**
 * Get data batches count from Dataset contract by the dataset address
 * 
 * @param {String} address
 * @param {Object} config Library config (provided by the proxy but can be overridden)
 * @returns {Promise} A Promise object represents the {number}
 */


exports.fetchCurrentPrice = fetchCurrentPrice;

const fetchBatchesCount = async (address = '', config = {}) => {
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
    'contracts.Dataset.abi': {
      type: 'object',
      code: _errors.CONTRACT_REQUIRED,
      args: ['Dataset']
    }
  });
  const dat = new config.web3.eth.Contract(config.contracts.Dataset.abi, address);
  const batchesCount = await dat.methods.batchesCount().call();
  return Number.parseInt(batchesCount, 10);
};
/**
 * Get description from Dataset contract by the dataset address
 * 
 * @param {String} address
 * @param {Object} config Library config (provided by the proxy but can be overridden)
 * @returns {Promise} A Promise object represents the {number}
 */


exports.fetchBatchesCount = fetchBatchesCount;

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
    'contracts.Dataset.abi': {
      type: 'object',
      code: _errors.CONTRACT_REQUIRED,
      args: ['Dataset']
    }
  });
  const dat = new config.web3.eth.Contract(config.contracts.Dataset.abi, address);
  const description = await dat.methods.description().call();
  return config.web3.utils.hexToUtf8(description);
};
/**
 * Get metadata from Dataset contract by the dataset address
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
    'contracts.Dataset.abi': {
      type: 'object',
      code: _errors.CONTRACT_REQUIRED,
      args: ['Dataset']
    }
  });
  const dat = new config.web3.eth.Contract(config.contracts.Dataset.abi, address);
  const metadata = await dat.methods.metadata().call();
  return config.web3.utils.hexToUtf8(metadata);
};
/**
 * Get dataset by the dataset address
 * 
 * @param {String} address
 * @param {Object} config Library config (provided by the proxy but can be overridden)
 * @returns {Promise} Promise object represents the {Object[]}
 */


exports.fetchMetadata = fetchMetadata;

const fetchDataset = async (address = '', config = {}) => {
  expect.all({
    address
  }, {
    'address': {
      type: 'address'
    }
  });
  const [ipfsAddress, dataDim, currentPrice, batchesCount, metadata, description] = await Promise.all([fetchIpfsAddress(address, config), fetchDataDim(address, config), fetchCurrentPrice(address, config), fetchBatchesCount(address, config), fetchMetadata(address, config), fetchDescription(address, config)]);
  return {
    address,
    ipfsAddress,
    dataDim,
    currentPrice,
    batchesCount,
    metadata,
    description
  };
};
/**
 * Get dataset by id
 * 
 * @param {number} id 
 * @param {Object} config Library config (provided by the proxy but can be overridden)
 * @returns {Promise} A Promise object represents the {Object}
 */


exports.fetchDataset = fetchDataset;

const fetchDatasetById = async (id, config = {}) => {
  const address = await fetchAddressById(id, config);
  const dataset = await fetchDataset(address, config);
  return dataset;
};
/**
 * Get all datasets
 * 
 * @param {Object} config Library config (provided by the proxy but can be overridden)
 * @returns {Promise} Promise object represents the {Object[]}
 */


exports.fetchDatasetById = fetchDatasetById;

const fetchAll = async (config = {}) => {
  let records = [];
  let error = [];

  try {
    const count = await fetchCount(config);

    for (let i = 0; i < count; i++) {
      try {
        const dataset = await fetchDatasetById(i, config);
        records.push(_objectSpread({
          id: i
        }, dataset));
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
 * Deploy Datset contract to the network
 * 
 * @param {String} datasetIpfsHash 
 * @param {Number} batchesCount Count of batches in dataset
 * @param {Object} options { dimension, price, metadata, description } 
 * @param {String} publisher Publisher address
 * @param {Object} config Library config (provided by the proxy but can be overridden)
 * @returns {Promise} Promise object resolved to contract address
 */


exports.fetchAll = fetchAll;

const deploy = async (datasetIpfsHash, batchesCount, {
  dimension,
  price,
  metadata,
  description
}, publisher, config = {}) => {
  expect.all({
    datasetIpfsHash,
    batchesCount,
    publisher,
    dimension,
    price,
    metadata,
    description
  }, {
    'datasetIpfsHash': {
      type: 'string'
    },
    'batchesCount': {
      type: 'number'
    },
    'publisher': {
      type: 'address'
    },
    'dimension': {
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
    'contracts.Dataset': {
      type: 'object',
      code: _errors.CONTRACT_REQUIRED,
      args: ['Dataset']
    },
    'web3.currentProvider.isMetaMask': {
      type: 'boolean',
      code: _errors.WEB3_METAMASK_REQUIRED
    }
  });
  const args = [config.web3.utils.utf8ToHex(datasetIpfsHash), dimension, batchesCount, config.web3.utils.toHex(price), config.web3.utils.utf8ToHex(metadata), config.web3.utils.utf8ToHex(description)]; // Estimate required amount of gas

  const gas = await web3Helpers.estimateGas(config.contracts.Dataset.bytecode, args, config); // Create and deploy dataset contract

  const datasetContractAddress = await web3Helpers.deployContract(config.contracts.Dataset, {
    args,
    from: publisher,
    gas: Number.parseInt(gas * 1.5, 10)
  }, config);
  return datasetContractAddress;
};
/**
 * Add dataset to market
 * 
 * @param {String} datasetContractAddress 
 * @param {String} publisherAddress 
 * @param {Object} config Library config (provided by the proxy but can be overridden)
 * @returns {Promise} Promise object resolved to {String} contractAddress
 */


exports.deploy = deploy;

const addToMarket = (datasetContractAddress, publisherAddress, config = {}) => new Promise(async (resolve, reject) => {
  expect.all({
    datasetContractAddress,
    publisherAddress
  }, {
    'datasetContractAddress': {
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
      args: ['Market']
    },
    'web3.currentProvider.isMetaMask': {
      type: 'boolean',
      code: _errors.WEB3_METAMASK_REQUIRED
    }
  });
  const market = new config.web3.eth.Contract(config.contracts.PandoraMarket.abi, config.addresses.PandoraMarket);
  const gasPrice = await config.web3.eth.getGasPrice();
  market.methods.addDataset(datasetContractAddress).send({
    from: publisherAddress,
    gasPrice
  }).on('error', reject).on('receipt', receipt => {
    if (Number(receipt.status) === 0) {
      return reject((0, _errors.default)(_errors.TRANSACTION_UNSUCCESSFUL));
    }

    resolve(receipt.contractAddress || receipt.events.DatasetAdded.returnValues.dataset);
  }); // @note In case of ganache-cli blockchain "contractAddress" always will be equal to null
});
/**
 * Remove dataset from PandoraMarket
 * 
 * @param {String} datasetAddress
 * @param {String} publisherAddress 
 * @param {Object} config Library config (provided by the proxy but can be overridden) 
 */


exports.addToMarket = addToMarket;

const removeDataset = (datasetAddress, publisherAddress, config = {}) => new Promise(async (resolve, reject) => {
  expect.all({
    datasetAddress,
    publisherAddress
  }, {
    'datasetAddress': {
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
      args: ['PandoraMarket']
    }
  });
  const market = new config.web3.eth.Contract(config.contracts.PandoraMarket.abi, config.addresses.PandoraMarket);
  const gasPrice = await config.web3.eth.getGasPrice();
  market.methods.removeDataset(datasetAddress).send({
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
 * Handle event DatasetAdded
 * 
 * @param {Object} options Event handler options
 * @param {Object} config Library config (provided by the proxy but can be overridden)
 * @returns {Promise<{Object}>} PPromise object resolved to the object with chained callbacks #data and #error
 */


exports.removeDataset = removeDataset;

const eventDatasetAdded = async (options = {}, config = {}) => {
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
      args: ['Market']
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
  chain.event[0] = mar.events.DatasetAdded(options).on('data', async event => {
    try {
      const dataset = await fetchDataset(event.returnValues.dataset, config);
      callbacks.onData({
        records: [dataset],
        event
      });
    } catch (err) {
      callbacks.onError(err);
    }
  }).on('error', callbacks.onError);
  chain.event[0].name = 'DatasetAdded';
  return chain;
};
/**
 * Handle event DatasetRemoved
 * 
 * @param {Object} options Event handler options
 * @param {Object} config Library config (provided by the proxy but can be overridden)
 * @returns {Promise<{Object}>} PPromise object resolved to the object with chained callbacks #data and #error
 */


exports.eventDatasetAdded = eventDatasetAdded;

const eventDatasetRemoved = async (options = {}, config = {}) => {
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
  chain.event[0] = mar.events.DatasetRemoved(options).on('data', async event => {
    callbacks.onData({
      records: [{
        address: event.returnValues.dataset
      }],
      event
    });
  }).on('error', callbacks.onError);
  chain.event[0].name = 'DatasetRemoved';
  return chain;
};

exports.eventDatasetRemoved = eventDatasetRemoved;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9kYXRhc2V0cy5qcyJdLCJuYW1lcyI6WyJmZXRjaENvdW50IiwiY29uZmlnIiwiZXhwZWN0IiwiYWxsIiwidHlwZSIsImNvZGUiLCJXRUIzX1JFUVVJUkVEIiwiQ09OVFJBQ1RfUkVRVUlSRUQiLCJhcmdzIiwiQUREUkVTU19SRVFVSVJFRCIsIm1hciIsIndlYjMiLCJldGgiLCJDb250cmFjdCIsImNvbnRyYWN0cyIsIlBhbmRvcmFNYXJrZXQiLCJhYmkiLCJhZGRyZXNzZXMiLCJjb3VudCIsIm1ldGhvZHMiLCJkYXRhc2V0c0NvdW50IiwiY2FsbCIsIk51bWJlciIsInBhcnNlSW50IiwiZmV0Y2hBZGRyZXNzQnlJZCIsImlkIiwiZGF0YXNldENvbnRyYWN0IiwiZGF0YXNldHMiLCJmZXRjaElwZnNBZGRyZXNzIiwiYWRkcmVzcyIsImRhdCIsIkRhdGFzZXQiLCJpcGZzQWRkcmVzcyIsInV0aWxzIiwiaGV4VG9Bc2NpaSIsImZldGNoRGF0YURpbSIsImRhdGFEaW0iLCJmZXRjaEN1cnJlbnRQcmljZSIsImN1cnJlbnRQcmljZSIsImZldGNoQmF0Y2hlc0NvdW50IiwiYmF0Y2hlc0NvdW50IiwiZmV0Y2hEZXNjcmlwdGlvbiIsImRlc2NyaXB0aW9uIiwiaGV4VG9VdGY4IiwiZmV0Y2hNZXRhZGF0YSIsIm1ldGFkYXRhIiwiZmV0Y2hEYXRhc2V0IiwiUHJvbWlzZSIsImZldGNoRGF0YXNldEJ5SWQiLCJkYXRhc2V0IiwiZmV0Y2hBbGwiLCJyZWNvcmRzIiwiZXJyb3IiLCJpIiwicHVzaCIsImVyciIsIm1lc3NhZ2UiLCJkZXBsb3kiLCJkYXRhc2V0SXBmc0hhc2giLCJkaW1lbnNpb24iLCJwcmljZSIsInB1Ymxpc2hlciIsIldFQjNfTUVUQU1BU0tfUkVRVUlSRUQiLCJ1dGY4VG9IZXgiLCJ0b0hleCIsImdhcyIsIndlYjNIZWxwZXJzIiwiZXN0aW1hdGVHYXMiLCJieXRlY29kZSIsImRhdGFzZXRDb250cmFjdEFkZHJlc3MiLCJkZXBsb3lDb250cmFjdCIsImZyb20iLCJhZGRUb01hcmtldCIsInB1Ymxpc2hlckFkZHJlc3MiLCJyZXNvbHZlIiwicmVqZWN0IiwibWFya2V0IiwiZ2FzUHJpY2UiLCJnZXRHYXNQcmljZSIsImFkZERhdGFzZXQiLCJzZW5kIiwib24iLCJyZWNlaXB0Iiwic3RhdHVzIiwiVFJBTlNBQ1RJT05fVU5TVUNDRVNTRlVMIiwiY29udHJhY3RBZGRyZXNzIiwiZXZlbnRzIiwiRGF0YXNldEFkZGVkIiwicmV0dXJuVmFsdWVzIiwicmVtb3ZlRGF0YXNldCIsImRhdGFzZXRBZGRyZXNzIiwiZXZlbnREYXRhc2V0QWRkZWQiLCJvcHRpb25zIiwiY2FsbGJhY2tzIiwib25EYXRhIiwib25FcnJvciIsImNoYWluIiwiZGF0YSIsImNiIiwiZXZlbnQiLCJuYW1lIiwiZXZlbnREYXRhc2V0UmVtb3ZlZCIsIkRhdGFzZXRSZW1vdmVkIl0sIm1hcHBpbmdzIjoiQUFBQTs7Ozs7Ozs7QUFTQTs7Ozs7OztBQUVBOztBQUNBOztBQU9BOzs7Ozs7OztBQUVBOzs7Ozs7QUFNTyxNQUFNQSxVQUFVLEdBQUcsT0FBT0MsTUFBTSxHQUFHLEVBQWhCLEtBQXVCO0FBRTdDQyxFQUFBQSxNQUFNLENBQUNDLEdBQVAsQ0FBV0YsTUFBWCxFQUFtQjtBQUNmLFlBQVE7QUFDSkcsTUFBQUEsSUFBSSxFQUFFLFFBREY7QUFFSkMsTUFBQUEsSUFBSSxFQUFFQztBQUZGLEtBRE87QUFLZixtQ0FBK0I7QUFDM0JGLE1BQUFBLElBQUksRUFBRSxRQURxQjtBQUUzQkMsTUFBQUEsSUFBSSxFQUFFRSx5QkFGcUI7QUFHM0JDLE1BQUFBLElBQUksRUFBRSxDQUFDLGVBQUQ7QUFIcUIsS0FMaEI7QUFVZiwrQkFBMkI7QUFDdkJKLE1BQUFBLElBQUksRUFBRSxTQURpQjtBQUV2QkMsTUFBQUEsSUFBSSxFQUFFSSx3QkFGaUI7QUFHdkJELE1BQUFBLElBQUksRUFBRSxDQUFDLGVBQUQ7QUFIaUI7QUFWWixHQUFuQjtBQWlCQSxRQUFNRSxHQUFHLEdBQUcsSUFBSVQsTUFB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QUErQkMsR0FBNUQsRUFBaUVmLE1BQU0sQ0FBQ2dCLFNBQVAsQ0FBaUJGLGFBQWxGLENBQVo7QUFDQWlGLEVBQUFBLEtBQUssQ0FBQ0csS0FBTixHQUFjLEVBQWQ7QUFDQUgsRUFBQUEsS0FBSyxDQUFDRyxLQUFOLENBQVksQ0FBWixJQUFpQnpGLEdBQUcsQ0FBQzRFLE1BQUosQ0FBV2dCLGNBQVgsQ0FBMEJWLE9BQTFCLEVBQ1pYLEVBRFksQ0FDVCxNQURTLEVBQ0QsTUFBTWtCLEtBQU4sSUFBZTtBQUV2Qk4sSUFBQUEsU0FBUyxDQUFDQyxNQUFWLENBQWlCO0FBQ2IzQyxNQUFBQSxPQUFPLEVBQUUsQ0FBQztBQUFDdEIsUUFBQUEsT0FBTyxFQUFFc0UsS0FBSyxDQUFDWCxZQUFOLENBQW1CdkM7QUFBN0IsT0FBRCxDQURJO0FBRWJrRCxNQUFBQTtBQUZhLEtBQWpCO0FBSUgsR0FQWSxFQVFabEIsRUFSWSxDQVFULE9BUlMsRUFRQVksU0FBUyxDQUFDRSxPQVJWLENBQWpCO0FBU0FDLEVBQUFBLEtBQUssQ0FBQ0csS0FBTixDQUFZLENBQVosRUFBZUMsSUFBZixHQUFzQixnQkFBdEI7QUFFQSxTQUFPSixLQUFQO0FBQ0gsQ0F2RE0iLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIERhdGFzZXRzIHJlbGF0ZWQgbWV0aG9kc1xuICogVGhpcyBmaWxlIGl0IGlzIGEgcGFydCBvZiB0aGUgUGFuZG9yYSBQeXJyaGEgSmF2YXNjcmlwdCBsaWJyYXJ5XG4gKiBcbiAqIEBmaWxlIGRhdGFzZXRzLmpzXG4gKiBAYXV0aG9yIEtvc3RpYW50eW4gU215cm5vdiA8a29zdHlzaEBnbWFpbC5jb20+XG4gKiBAZGF0ZSAyMDE4XG4gKi9cblxuJ3VzZSBzdHJpY3QnO1xuXG5pbXBvcnQgKiBhcyBleHBlY3QgZnJvbSAnLi9oZWxwZXJzL2V4cGVjdCc7XG5pbXBvcnQgcGpzRXJyb3IsIHtcbiAgICBDT05UUkFDVF9SRVFVSVJFRCxcbiAgICBBRERSRVNTX1JFUVVJUkVELFxuICAgIFdFQjNfUkVRVUlSRUQsXG4gICAgV0VCM19NRVRBTUFTS19SRVFVSVJFRCxcbiAgICBUUkFOU0FDVElPTl9VTlNVQ0NFU1NGVUxcbn0gZnJvbSAnLi9oZWxwZXJzL2Vycm9ycyc7XG5pbXBvcnQgKiBhcyB3ZWIzSGVscGVycyBmcm9tICcuL2hlbHBlcnMvd2ViMyc7XG5cbi8qKlxuICogR2V0IGRhdGFzZXRzIGNvdW50IGZyb20gUGFuZG9yYU1hcmtldCBjb250cmFjdFxuICogXG4gKiBAcGFyYW0ge09iamVjdH0gY29uZmlnIExpYnJhcnkgY29uZmlnIChwcm92aWRlZCBieSB0aGUgcHJveHkgYnV0IGNhbiBiZSBvdmVycmlkZGVuKVxuICogQHJldHVybnMge1Byb21pc2V9IEEgUHJvbWlzZSBvYmplY3QgcmVwcmVzZW50cyB0aGUge251bWJlcn0gXG4gKi9cbmV4cG9ydCBjb25zdCBmZXRjaENvdW50ID0gYXN5bmMgKGNvbmZpZyA9IHt9KSA9PiB7XG5cbiAgICBleHBlY3QuYWxsKGNvbmZpZywge1xuICAgICAgICAnd2ViMyc6IHtcbiAgICAgICAgICAgIHR5cGU6ICdvYmplY3QnLFxuICAgICAgICAgICAgY29kZTogV0VCM19SRVFVSVJFRFxuICAgICAgICB9LFxuICAgICAgICAnY29udHJhY3RzLlBhbmRvcmFNYXJrZXQuYWJpJzoge1xuICAgICAgICAgICAgdHlwZTogJ29iamVjdCcsXG4gICAgICAgICAgICBjb2RlOiBDT05UUkFDVF9SRVFVSVJFRCxcbiAgICAgICAgICAgIGFyZ3M6IFsnUGFuZG9yYU1hcmtldCddXG4gICAgICAgIH0sXG4gICAgICAgICdhZGRyZXNzZXMuUGFuZG9yYU1hcmtldCc6IHtcbiAgICAgICAgICAgIHR5cGU6ICdhZGRyZXNzJyxcbiAgICAgICAgICAgIGNvZGU6IEFERFJFU1NfUkVRVUlSRUQsXG4gICAgICAgICAgICBhcmdzOiBbJ1BhbmRvcmFNYXJrZXQnXVxuICAgICAgICB9XG4gICAgfSk7XG5cbiAgICBjb25zdCBtYXIgPSBuZXcgY29uZmlnLndlYjMuZXRoLkNvbnRyYWN0KGNvbmZpZy5jb250cmFjdHMuUGFuZG9yYU1hcmtldC5hYmksIGNvbmZpZy5hZGRyZXNzZXMuUGFuZG9yYU1hcmtldCk7XG4gICAgY29uc3QgY291bnQgPSBhd2FpdCBtYXIubWV0aG9kc1xuICAgICAgICAuZGF0YXNldHNDb3VudCgpXG4gICAgICAgIC5jYWxsKCk7XG5cbiAgICByZXR1cm4gTnVtYmVyLnBhcnNlSW50KGNvdW50LCAxMCk7XG59O1xuXG4vKipcbiAqIEdldCBEYXRhc2V0IGFkZHJlc3MgYnkgZGF0YXNldCBpZFxuICogXG4gKiBAcGFyYW0ge251bWJlcn0gaWRcbiAqIEBwYXJhbSB7T2JqZWN0fSBjb25maWcgTGlicmFyeSBjb25maWcgKHByb3ZpZGVkIGJ5IHRoZSBwcm94eSBidXQgY2FuIGJlIG92ZXJyaWRkZW4pXG4gKiBAcmV0dXJucyB7UHJvbWlzZX0gQSBQcm9taXNlIG9iamVjdCByZXByZXNlbnRzIHRoZSB7U3RyaW5nfVxuICovXG5leHBvcnQgY29uc3QgZmV0Y2hBZGRyZXNzQnlJZCA9IGFzeW5jIChpZCwgY29uZmlnID0ge30pID0+IHtcblxuICAgIGV4cGVjdC5hbGwoeyBpZCB9LCB7XG4gICAgICAgICdpZCc6IHtcbiAgICAgICAgICAgIHR5cGU6ICdudW1iZXInXG4gICAgICAgIH1cbiAgICB9KTtcblxuICAgIGV4cGVjdC5hbGwoY29uZmlnLCB7XG4gICAgICAgICd3ZWIzJzoge1xuICAgICAgICAgICAgdHlwZTogJ29iamVjdCcsXG4gICAgICAgICAgICBjb2RlOiBXRUIzX1JFUVVJUkVEXG4gICAgICAgIH0sXG4gICAgICAgICdjb250cmFjdHMuUGFuZG9yYU1hcmtldC5hYmknOiB7XG4gICAgICAgICAgICB0eXBlOiAnb2JqZWN0JyxcbiAgICAgICAgICAgIGNvZGU6IENPTlRSQUNUX1JFUVVJUkVELFxuICAgICAgICAgICAgYXJnczogWydQYW5kb3JhTWFya2V0J11cbiAgICAgICAgfSxcbiAgICAgICAgJ2FkZHJlc3Nlcy5QYW5kb3JhTWFya2V0Jzoge1xuICAgICAgICAgICAgdHlwZTogJ2FkZHJlc3MnLFxuICAgICAgICAgICAgY29kZTogQUREUkVTU19SRVFVSVJFRCxcbiAgICAgICAgICAgIGFyZ3M6IFsnTWFya2V0J11cbiAgICAgICAgfVxuICAgIH0pO1xuXG4gICAgY29uc3QgbWFyID0gbmV3IGNvbmZpZy53ZWIzLmV0aC5Db250cmFjdChjb25maWcuY29udHJhY3RzLlBhbmRvcmFNYXJrZXQuYWJpLCBjb25maWcuYWRkcmVzc2VzLlBhbmRvcmFNYXJrZXQpO1xuICAgIGNvbnN0IGRhdGFzZXRDb250cmFjdCA9IGF3YWl0IG1hci5tZXRob2RzXG4gICAgICAgIC5kYXRhc2V0cyhpZClcbiAgICAgICAgLmNhbGwoKTtcblxuICAgIHJldHVybiBkYXRhc2V0Q29udHJhY3Q7XG59O1xuXG4vKipcbiAqIEdldCBJUEZTIGFkZHJlc3MgZnJvbSBEYXRhc2V0IGNvbnRyYWN0IGJ5IHRoZSBkYXRhc2V0IGFkZHJlc3NcbiAqIFxuICogQHBhcmFtIHtTdHJpbmd9IGFkZHJlc3NcbiAqIEBwYXJhbSB7T2JqZWN0fSBjb25maWcgTGlicmFyeSBjb25maWcgKHByb3ZpZGVkIGJ5IHRoZSBwcm94eSBidXQgY2FuIGJlIG92ZXJyaWRkZW4pXG4gKiBAcmV0dXJucyB7UHJvbWlzZX0gQSBQcm9taXNlIG9iamVjdCByZXByZXNlbnRzIHRoZSB7U3RyaW5nfVxuICovXG5leHBvcnQgY29uc3QgZmV0Y2hJcGZzQWRkcmVzcyA9IGFzeW5jIChhZGRyZXNzID0gJycsIGNvbmZpZyA9IHt9KSA9PiB7XG5cbiAgICBleHBlY3QuYWxsKHsgYWRkcmVzcyB9LCB7XG4gICAgICAgICdhZGRyZXNzJzoge1xuICAgICAgICAgICAgdHlwZTogJ2FkZHJlc3MnXG4gICAgICAgIH1cbiAgICB9KTtcblxuICAgIGV4cGVjdC5hbGwoY29uZmlnLCB7XG4gICAgICAgICd3ZWIzJzoge1xuICAgICAgICAgICAgdHlwZTogJ29iamVjdCcsXG4gICAgICAgICAgICBjb2RlOiBXRUIzX1JFUVVJUkVEXG4gICAgICAgIH0sXG4gICAgICAgICdjb250cmFjdHMuRGF0YXNldC5hYmknOiB7XG4gICAgICAgICAgICB0eXBlOiAnb2JqZWN0JyxcbiAgICAgICAgICAgIGNvZGU6IENPTlRSQUNUX1JFUVVJUkVELFxuICAgICAgICAgICAgYXJnczogWydEYXRhc2V0J11cbiAgICAgICAgfVxuICAgIH0pO1xuXG4gICAgY29uc3QgZGF0ID0gbmV3IGNvbmZpZy53ZWIzLmV0aC5Db250cmFjdChjb25maWcuY29udHJhY3RzLkRhdGFzZXQuYWJpLCBhZGRyZXNzKTtcbiAgICBjb25zdCBpcGZzQWRkcmVzcyA9IGF3YWl0IGRhdC5tZXRob2RzXG4gICAgICAgIC5pcGZzQWRkcmVzcygpXG4gICAgICAgIC5jYWxsKCk7XG5cbiAgICByZXR1cm4gY29uZmlnLndlYjMudXRpbHMuaGV4VG9Bc2NpaShpcGZzQWRkcmVzcyk7XG59O1xuXG4vKipcbiAqIEdldCBkYXRhIGRpbSBmcm9tIERhdGFzZXQgY29udHJhY3QgYnkgdGhlIGRhdGFzZXQgYWRkcmVzc1xuICogXG4gKiBAcGFyYW0ge1N0cmluZ30gYWRkcmVzc1xuICogQHBhcmFtIHtPYmplY3R9IGNvbmZpZyBMaWJyYXJ5IGNvbmZpZyAocHJvdmlkZWQgYnkgdGhlIHByb3h5IGJ1dCBjYW4gYmUgb3ZlcnJpZGRlbilcbiAqIEByZXR1cm5zIHtQcm9taXNlfSBBIFByb21pc2Ugb2JqZWN0IHJlcHJlc2VudHMgdGhlIHtudW1iZXJ9XG4gKi9cbmV4cG9ydCBjb25zdCBmZXRjaERhdGFEaW0gPSBhc3luYyAoYWRkcmVzcyA9ICcnLCBjb25maWcgPSB7fSkgPT4ge1xuXG4gICAgZXhwZWN0LmFsbCh7IGFkZHJlc3MgfSwge1xuICAgICAgICAnYWRkcmVzcyc6IHtcbiAgICAgICAgICAgIHR5cGU6ICdhZGRyZXNzJ1xuICAgICAgICB9XG4gICAgfSk7XG5cbiAgICBleHBlY3QuYWxsKGNvbmZpZywge1xuICAgICAgICAnd2ViMyc6IHtcbiAgICAgICAgICAgIHR5cGU6ICdvYmplY3QnLFxuICAgICAgICAgICAgY29kZTogV0VCM19SRVFVSVJFRFxuICAgICAgICB9LFxuICAgICAgICAnY29udHJhY3RzLkRhdGFzZXQuYWJpJzoge1xuICAgICAgICAgICAgdHlwZTogJ29iamVjdCcsXG4gICAgICAgICAgICBjb2RlOiBDT05UUkFDVF9SRVFVSVJFRCxcbiAgICAgICAgICAgIGFyZ3M6IFsnRGF0YXNldCddXG4gICAgICAgIH1cbiAgICB9KTtcblxuICAgIGNvbnN0IGRhdCA9IG5ldyBjb25maWcud2ViMy5ldGguQ29udHJhY3QoY29uZmlnLmNvbnRyYWN0cy5EYXRhc2V0LmFiaSwgYWRkcmVzcyk7XG4gICAgY29uc3QgZGF0YURpbSA9IGF3YWl0IGRhdC5tZXRob2RzXG4gICAgICAgIC5kYXRhRGltKClcbiAgICAgICAgLmNhbGwoKTtcblxuICAgIHJldHVybiBOdW1iZXIucGFyc2VJbnQoZGF0YURpbSwgMTApO1xufTtcblxuLyoqXG4gKiBHZXQgY3VycmVudCBwcmljZSBmcm9tIERhdGFzZXQgY29udHJhY3QgYnkgdGhlIGRhdGFzZXQgYWRkcmVzc1xuICogXG4gKiBAcGFyYW0ge1N0cmluZ30gYWRkcmVzc1xuICogQHBhcmFtIHtPYmplY3R9IGNvbmZpZyBMaWJyYXJ5IGNvbmZpZyAocHJvdmlkZWQgYnkgdGhlIHByb3h5IGJ1dCBjYW4gYmUgb3ZlcnJpZGRlbilcbiAqIEByZXR1cm5zIHtQcm9taXNlfSBBIFByb21pc2Ugb2JqZWN0IHJlcHJlc2VudHMgdGhlIHtudW1iZXJ9XG4gKi9cbmV4cG9ydCBjb25zdCBmZXRjaEN1cnJlbnRQcmljZSA9IGFzeW5jIChhZGRyZXNzID0gJycsIGNvbmZpZyA9IHt9KSA9PiB7XG5cbiAgICBleHBlY3QuYWxsKHsgYWRkcmVzcyB9LCB7XG4gICAgICAgICdhZGRyZXNzJzoge1xuICAgICAgICAgICAgdHlwZTogJ2FkZHJlc3MnXG4gICAgICAgIH1cbiAgICB9KTtcblxuICAgIGV4cGVjdC5hbGwoY29uZmlnLCB7XG4gICAgICAgICd3ZWIzJzoge1xuICAgICAgICAgICAgdHlwZTogJ29iamVjdCcsXG4gICAgICAgICAgICBjb2RlOiBXRUIzX1JFUVVJUkVEXG4gICAgICAgIH0sXG4gICAgICAgICdjb250cmFjdHMuRGF0YXNldC5hYmknOiB7XG4gICAgICAgICAgICB0eXBlOiAnb2JqZWN0JyxcbiAgICAgICAgICAgIGNvZGU6IENPTlRSQUNUX1JFUVVJUkVELFxuICAgICAgICAgICAgYXJnczogWydEYXRhc2V0J11cbiAgICAgICAgfVxuICAgIH0pO1xuXG4gICAgY29uc3QgZGF0ID0gbmV3IGNvbmZpZy53ZWIzLmV0aC5Db250cmFjdChjb25maWcuY29udHJhY3RzLkRhdGFzZXQuYWJpLCBhZGRyZXNzKTtcbiAgICBjb25zdCBjdXJyZW50UHJpY2UgPSBhd2FpdCBkYXQubWV0aG9kc1xuICAgICAgICAuY3VycmVudFByaWNlKClcbiAgICAgICAgLmNhbGwoKTtcblxuICAgIHJldHVybiBOdW1iZXIucGFyc2VJbnQoY3VycmVudFByaWNlLCAxMCk7XG59O1xuXG4vKipcbiAqIEdldCBkYXRhIGJhdGNoZXMgY291bnQgZnJvbSBEYXRhc2V0IGNvbnRyYWN0IGJ5IHRoZSBkYXRhc2V0IGFkZHJlc3NcbiAqIFxuICogQHBhcmFtIHtTdHJpbmd9IGFkZHJlc3NcbiAqIEBwYXJhbSB7T2JqZWN0fSBjb25maWcgTGlicmFyeSBjb25maWcgKHByb3ZpZGVkIGJ5IHRoZSBwcm94eSBidXQgY2FuIGJlIG92ZXJyaWRkZW4pXG4gKiBAcmV0dXJucyB7UHJvbWlzZX0gQSBQcm9taXNlIG9iamVjdCByZXByZXNlbnRzIHRoZSB7bnVtYmVyfVxuICovXG5leHBvcnQgY29uc3QgZmV0Y2hCYXRjaGVzQ291bnQgPSBhc3luYyAoYWRkcmVzcyA9ICcnLCBjb25maWcgPSB7fSkgPT4ge1xuXG4gICAgZXhwZWN0LmFsbCh7IGFkZHJlc3MgfSwge1xuICAgICAgICAnYWRkcmVzcyc6IHtcbiAgICAgICAgICAgIHR5cGU6ICdhZGRyZXNzJ1xuICAgICAgICB9XG4gICAgfSk7XG5cbiAgICBleHBlY3QuYWxsKGNvbmZpZywge1xuICAgICAgICAnd2ViMyc6IHtcbiAgICAgICAgICAgIHR5cGU6ICdvYmplY3QnLFxuICAgICAgICAgICAgY29kZTogV0VCM19SRVFVSVJFRFxuICAgICAgICB9LFxuICAgICAgICAnY29udHJhY3RzLkRhdGFzZXQuYWJpJzoge1xuICAgICAgICAgICAgdHlwZTogJ29iamVjdCcsXG4gICAgICAgICAgICBjb2RlOiBDT05UUkFDVF9SRVFVSVJFRCxcbiAgICAgICAgICAgIGFyZ3M6IFsnRGF0YXNldCddXG4gICAgICAgIH1cbiAgICB9KTtcblxuICAgIGNvbnN0IGRhdCA9IG5ldyBjb25maWcud2ViMy5ldGguQ29udHJhY3QoY29uZmlnLmNvbnRyYWN0cy5EYXRhc2V0LmFiaSwgYWRkcmVzcyk7XG4gICAgY29uc3QgYmF0Y2hlc0NvdW50ID0gYXdhaXQgZGF0Lm1ldGhvZHNcbiAgICAgICAgLmJhdGNoZXNDb3VudCgpXG4gICAgICAgIC5jYWxsKCk7XG4gICAgICAgIFxuICAgIHJldHVybiBOdW1iZXIucGFyc2VJbnQoYmF0Y2hlc0NvdW50LCAxMCk7XG59O1xuXG4vKipcbiAqIEdldCBkZXNjcmlwdGlvbiBmcm9tIERhdGFzZXQgY29udHJhY3QgYnkgdGhlIGRhdGFzZXQgYWRkcmVzc1xuICogXG4gKiBAcGFyYW0ge1N0cmluZ30gYWRkcmVzc1xuICogQHBhcmFtIHtPYmplY3R9IGNvbmZpZyBMaWJyYXJ5IGNvbmZpZyAocHJvdmlkZWQgYnkgdGhlIHByb3h5IGJ1dCBjYW4gYmUgb3ZlcnJpZGRlbilcbiAqIEByZXR1cm5zIHtQcm9taXNlfSBBIFByb21pc2Ugb2JqZWN0IHJlcHJlc2VudHMgdGhlIHtudW1iZXJ9XG4gKi9cbmV4cG9ydCBjb25zdCBmZXRjaERlc2NyaXB0aW9uID0gYXN5bmMgKGFkZHJlc3MgPSAnJywgY29uZmlnID0ge30pID0+IHtcblxuICAgIGV4cGVjdC5hbGwoeyBhZGRyZXNzIH0sIHtcbiAgICAgICAgJ2FkZHJlc3MnOiB7XG4gICAgICAgICAgICB0eXBlOiAnYWRkcmVzcydcbiAgICAgICAgfVxuICAgIH0pO1xuXG4gICAgZXhwZWN0LmFsbChjb25maWcsIHtcbiAgICAgICAgJ3dlYjMnOiB7XG4gICAgICAgICAgICB0eXBlOiAnb2JqZWN0JyxcbiAgICAgICAgICAgIGNvZGU6IFdFQjNfUkVRVUlSRURcbiAgICAgICAgfSxcbiAgICAgICAgJ2NvbnRyYWN0cy5EYXRhc2V0LmFiaSc6IHtcbiAgICAgICAgICAgIHR5cGU6ICdvYmplY3QnLFxuICAgICAgICAgICAgY29kZTogQ09OVFJBQ1RfUkVRVUlSRUQsXG4gICAgICAgICAgICBhcmdzOiBbJ0RhdGFzZXQnXVxuICAgICAgICB9XG4gICAgfSk7XG5cbiAgICBjb25zdCBkYXQgPSBuZXcgY29uZmlnLndlYjMuZXRoLkNvbnRyYWN0KGNvbmZpZy5jb250cmFjdHMuRGF0YXNldC5hYmksIGFkZHJlc3MpO1xuICAgIGNvbnN0IGRlc2NyaXB0aW9uID0gYXdhaXQgZGF0Lm1ldGhvZHNcbiAgICAgICAgLmRlc2NyaXB0aW9uKClcbiAgICAgICAgLmNhbGwoKTtcblxuICAgIHJldHVybiBjb25maWcud2ViMy51dGlscy5oZXhUb1V0ZjgoZGVzY3JpcHRpb24pO1xufTtcblxuLyoqXG4gKiBHZXQgbWV0YWRhdGEgZnJvbSBEYXRhc2V0IGNvbnRyYWN0IGJ5IHRoZSBkYXRhc2V0IGFkZHJlc3NcbiAqIFxuICogQHBhcmFtIHtTdHJpbmd9IGFkZHJlc3NcbiAqIEBwYXJhbSB7T2JqZWN0fSBjb25maWcgTGlicmFyeSBjb25maWcgKHByb3ZpZGVkIGJ5IHRoZSBwcm94eSBidXQgY2FuIGJlIG92ZXJyaWRkZW4pXG4gKiBAcmV0dXJucyB7UHJvbWlzZX0gQSBQcm9taXNlIG9iamVjdCByZXByZXNlbnRzIHRoZSB7bnVtYmVyfVxuICovXG5leHBvcnQgY29uc3QgZmV0Y2hNZXRhZGF0YSA9IGFzeW5jIChhZGRyZXNzID0gJycsIGNvbmZpZyA9IHt9KSA9PiB7XG5cbiAgICBleHBlY3QuYWxsKHsgYWRkcmVzcyB9LCB7XG4gICAgICAgICdhZGRyZXNzJzoge1xuICAgICAgICAgICAgdHlwZTogJ2FkZHJlc3MnXG4gICAgICAgIH1cbiAgICB9KTtcblxuICAgIGV4cGVjdC5hbGwoY29uZmlnLCB7XG4gICAgICAgICd3ZWIzJzoge1xuICAgICAgICAgICAgdHlwZTogJ29iamVjdCcsXG4gICAgICAgICAgICBjb2RlOiBXRUIzX1JFUVVJUkVEXG4gICAgICAgIH0sXG4gICAgICAgICdjb250cmFjdHMuRGF0YXNldC5hYmknOiB7XG4gICAgICAgICAgICB0eXBlOiAnb2JqZWN0JyxcbiAgICAgICAgICAgIGNvZGU6IENPTlRSQUNUX1JFUVVJUkVELFxuICAgICAgICAgICAgYXJnczogWydEYXRhc2V0J11cbiAgICAgICAgfVxuICAgIH0pO1xuXG4gICAgY29uc3QgZGF0ID0gbmV3IGNvbmZpZy53ZWIzLmV0aC5Db250cmFjdChjb25maWcuY29udHJhY3RzLkRhdGFzZXQuYWJpLCBhZGRyZXNzKTtcbiAgICBjb25zdCBtZXRhZGF0YSA9IGF3YWl0IGRhdC5tZXRob2RzXG4gICAgICAgIC5tZXRhZGF0YSgpXG4gICAgICAgIC5jYWxsKCk7XG5cbiAgICByZXR1cm4gY29uZmlnLndlYjMudXRpbHMuaGV4VG9VdGY4KG1ldGFkYXRhKTtcbn07XG5cbi8qKlxuICogR2V0IGRhdGFzZXQgYnkgdGhlIGRhdGFzZXQgYWRkcmVzc1xuICogXG4gKiBAcGFyYW0ge1N0cmluZ30gYWRkcmVzc1xuICogQHBhcmFtIHtPYmplY3R9IGNvbmZpZyBMaWJyYXJ5IGNvbmZpZyAocHJvdmlkZWQgYnkgdGhlIHByb3h5IGJ1dCBjYW4gYmUgb3ZlcnJpZGRlbilcbiAqIEByZXR1cm5zIHtQcm9taXNlfSBQcm9taXNlIG9iamVjdCByZXByZXNlbnRzIHRoZSB7T2JqZWN0W119XG4gKi9cbmV4cG9ydCBjb25zdCBmZXRjaERhdGFzZXQgPSBhc3luYyAoYWRkcmVzcyA9ICcnLCBjb25maWcgPSB7fSkgPT4ge1xuXG4gICAgZXhwZWN0LmFsbCh7IGFkZHJlc3MgfSwge1xuICAgICAgICAnYWRkcmVzcyc6IHtcbiAgICAgICAgICAgIHR5cGU6ICdhZGRyZXNzJ1xuICAgICAgICB9XG4gICAgfSk7XG5cbiAgICBjb25zdCBbXG4gICAgICAgIGlwZnNBZGRyZXNzLFxuICAgICAgICBkYXRhRGltLFxuICAgICAgICBjdXJyZW50UHJpY2UsXG4gICAgICAgIGJhdGNoZXNDb3VudCxcbiAgICAgICAgbWV0YWRhdGEsIFxuICAgICAgICBkZXNjcmlwdGlvblxuICAgIF0gPSBhd2FpdCBQcm9taXNlLmFsbChbXG4gICAgICAgIGZldGNoSXBmc0FkZHJlc3MoYWRkcmVzcywgY29uZmlnKSxcbiAgICAgICAgZmV0Y2hEYXRhRGltKGFkZHJlc3MsIGNvbmZpZyksXG4gICAgICAgIGZldGNoQ3VycmVudFByaWNlKGFkZHJlc3MsIGNvbmZpZyksXG4gICAgICAgIGZldGNoQmF0Y2hlc0NvdW50KGFkZHJlc3MsIGNvbmZpZyksXG4gICAgICAgIGZldGNoTWV0YWRhdGEoYWRkcmVzcywgY29uZmlnKSxcbiAgICAgICAgZmV0Y2hEZXNjcmlwdGlvbihhZGRyZXNzLCBjb25maWcpXG4gICAgXSk7XG5cbiAgICByZXR1cm4ge1xuICAgICAgICBhZGRyZXNzLFxuICAgICAgICBpcGZzQWRkcmVzcyxcbiAgICAgICAgZGF0YURpbSxcbiAgICAgICAgY3VycmVudFByaWNlLFxuICAgICAgICBiYXRjaGVzQ291bnQsXG4gICAgICAgIG1ldGFkYXRhLFxuICAgICAgICBkZXNjcmlwdGlvblxuICAgIH07XG59O1xuXG4vKipcbiAqIEdldCBkYXRhc2V0IGJ5IGlkXG4gKiBcbiAqIEBwYXJhbSB7bnVtYmVyfSBpZCBcbiAqIEBwYXJhbSB7T2JqZWN0fSBjb25maWcgTGlicmFyeSBjb25maWcgKHByb3ZpZGVkIGJ5IHRoZSBwcm94eSBidXQgY2FuIGJlIG92ZXJyaWRkZW4pXG4gKiBAcmV0dXJucyB7UHJvbWlzZX0gQSBQcm9taXNlIG9iamVjdCByZXByZXNlbnRzIHRoZSB7T2JqZWN0fVxuICovXG5leHBvcnQgY29uc3QgZmV0Y2hEYXRhc2V0QnlJZCA9IGFzeW5jIChpZCwgY29uZmlnID0ge30pID0+IHtcblxuICAgIGNvbnN0IGFkZHJlc3MgPSBhd2FpdCBmZXRjaEFkZHJlc3NCeUlkKGlkLCBjb25maWcpO1xuICAgIGNvbnN0IGRhdGFzZXQgPSBhd2FpdCBmZXRjaERhdGFzZXQoYWRkcmVzcywgY29uZmlnKTtcblxuICAgIHJldHVybiBkYXRhc2V0O1xufTtcblxuLyoqXG4gKiBHZXQgYWxsIGRhdGFzZXRzXG4gKiBcbiAqIEBwYXJhbSB7T2JqZWN0fSBjb25maWcgTGlicmFyeSBjb25maWcgKHByb3ZpZGVkIGJ5IHRoZSBwcm94eSBidXQgY2FuIGJlIG92ZXJyaWRkZW4pXG4gKiBAcmV0dXJucyB7UHJvbWlzZX0gUHJvbWlzZSBvYmplY3QgcmVwcmVzZW50cyB0aGUge09iamVjdFtdfVxuICovXG5leHBvcnQgY29uc3QgZmV0Y2hBbGwgPSBhc3luYyAoY29uZmlnID0ge30pID0+IHtcblxuICAgIGxldCByZWNvcmRzID0gW107XG4gICAgbGV0IGVycm9yID0gW107XG5cbiAgICB0cnkge1xuXG4gICAgICAgIGNvbnN0IGNvdW50ID0gYXdhaXQgZmV0Y2hDb3VudChjb25maWcpO1xuXG4gICAgICAgIGZvciAobGV0IGk9MDsgaSA8IGNvdW50OyBpKyspIHtcbiAgICAgICAgICAgIFxuICAgICAgICAgICAgdHJ5IHtcblxuICAgICAgICAgICAgICAgIGNvbnN0IGRhdGFzZXQgPSBhd2FpdCBmZXRjaERhdGFzZXRCeUlkKGksIGNvbmZpZyk7XG5cbiAgICAgICAgICAgICAgICByZWNvcmRzLnB1c2goe1xuICAgICAgICAgICAgICAgICAgICBpZDogaSxcbiAgICAgICAgICAgICAgICAgICAgLi4uZGF0YXNldFxuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfSBjYXRjaChlcnIpIHtcbiAgICAgICAgICAgICAgICBlcnJvci5wdXNoKHtcbiAgICAgICAgICAgICAgICAgICAgaWQ6IGksXG4gICAgICAgICAgICAgICAgICAgIG1lc3NhZ2U6IGVyci5tZXNzYWdlXG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9ICAgICAgICBcbiAgICAgICAgfVxuICAgIH0gY2F0Y2goZXJyKSB7XG4gICAgICAgIGVycm9yLnB1c2goe1xuICAgICAgICAgICAgZXJyb3I6IGVyci5tZXNzYWdlXG4gICAgICAgIH0pO1xuICAgIH0gICBcblxuICAgIHJldHVybiB7XG4gICAgICAgIHJlY29yZHMsXG4gICAgICAgIGVycm9yXG4gICAgfTtcbn07XG5cbi8qKlxuICogRGVwbG95IERhdHNldCBjb250cmFjdCB0byB0aGUgbmV0d29ya1xuICogXG4gKiBAcGFyYW0ge1N0cmluZ30gZGF0YXNldElwZnNIYXNoIFxuICogQHBhcmFtIHtOdW1iZXJ9IGJhdGNoZXNDb3VudCBDb3VudCBvZiBiYXRjaGVzIGluIGRhdGFzZXRcbiAqIEBwYXJhbSB7T2JqZWN0fSBvcHRpb25zIHsgZGltZW5zaW9uLCBwcmljZSwgbWV0YWRhdGEsIGRlc2NyaXB0aW9uIH0gXG4gKiBAcGFyYW0ge1N0cmluZ30gcHVibGlzaGVyIFB1Ymxpc2hlciBhZGRyZXNzXG4gKiBAcGFyYW0ge09iamVjdH0gY29uZmlnIExpYnJhcnkgY29uZmlnIChwcm92aWRlZCBieSB0aGUgcHJveHkgYnV0IGNhbiBiZSBvdmVycmlkZGVuKVxuICogQHJldHVybnMge1Byb21pc2V9IFByb21pc2Ugb2JqZWN0IHJlc29sdmVkIHRvIGNvbnRyYWN0IGFkZHJlc3NcbiAqL1xuZXhwb3J0IGNvbnN0IGRlcGxveSA9IGFzeW5jIChkYXRhc2V0SXBmc0hhc2gsIGJhdGNoZXNDb3VudCwgeyBkaW1lbnNpb24sIHByaWNlLCBtZXRhZGF0YSwgZGVzY3JpcHRpb24gfSwgcHVibGlzaGVyLCBjb25maWcgPSB7fSkgPT4ge1xuXG4gICAgZXhwZWN0LmFsbCh7IGRhdGFzZXRJcGZzSGFzaCwgYmF0Y2hlc0NvdW50LCBwdWJsaXNoZXIsIGRpbWVuc2lvbiwgcHJpY2UsIG1ldGFkYXRhLCBkZXNjcmlwdGlvbiB9LCB7XG4gICAgICAgICdkYXRhc2V0SXBmc0hhc2gnOiB7XG4gICAgICAgICAgICB0eXBlOiAnc3RyaW5nJ1xuICAgICAgICB9LFxuICAgICAgICAnYmF0Y2hlc0NvdW50Jzoge1xuICAgICAgICAgICAgdHlwZTogJ251bWJlcidcbiAgICAgICAgfSxcbiAgICAgICAgJ3B1Ymxpc2hlcic6IHtcbiAgICAgICAgICAgIHR5cGU6ICdhZGRyZXNzJ1xuICAgICAgICB9LFxuICAgICAgICAnZGltZW5zaW9uJzoge1xuICAgICAgICAgICAgdHlwZTogJ251bWJlcidcbiAgICAgICAgfSxcbiAgICAgICAgJ3ByaWNlJzoge1xuICAgICAgICAgICAgdHlwZTogJ251bWJlcidcbiAgICAgICAgfSxcbiAgICAgICAgJ21ldGFkYXRhJzoge1xuICAgICAgICAgICAgdHlwZTogJ3N0cmluZydcbiAgICAgICAgfSxcbiAgICAgICAgJ2Rlc2NyaXB0aW9uJzoge1xuICAgICAgICAgICAgdHlwZTogJ3N0cmluZydcbiAgICAgICAgfSAgICAgICAgXG4gICAgfSk7XG5cbiAgICBleHBlY3QuYWxsKGNvbmZpZywge1xuICAgICAgICAnd2ViMyc6IHtcbiAgICAgICAgICAgIHR5cGU6ICdvYmplY3QnLFxuICAgICAgICAgICAgY29kZTogV0VCM19SRVFVSVJFRFxuICAgICAgICB9LFxuICAgICAgICAnY29udHJhY3RzLkRhdGFzZXQnOiB7XG4gICAgICAgICAgICB0eXBlOiAnb2JqZWN0JyxcbiAgICAgICAgICAgIGNvZGU6IENPTlRSQUNUX1JFUVVJUkVELFxuICAgICAgICAgICAgYXJnczogWydEYXRhc2V0J11cbiAgICAgICAgfSxcbiAgICAgICAgJ3dlYjMuY3VycmVudFByb3ZpZGVyLmlzTWV0YU1hc2snOiB7XG4gICAgICAgICAgICB0eXBlOiAnYm9vbGVhbicsXG4gICAgICAgICAgICBjb2RlOiBXRUIzX01FVEFNQVNLX1JFUVVJUkVEXG4gICAgICAgIH1cbiAgICB9KTtcblxuICAgIGNvbnN0IGFyZ3MgPSBbXG4gICAgICAgIGNvbmZpZy53ZWIzLnV0aWxzLnV0ZjhUb0hleChkYXRhc2V0SXBmc0hhc2gpLCBcbiAgICAgICAgZGltZW5zaW9uLCBcbiAgICAgICAgYmF0Y2hlc0NvdW50LCBcbiAgICAgICAgY29uZmlnLndlYjMudXRpbHMudG9IZXgocHJpY2UpLCBcbiAgICAgICAgY29uZmlnLndlYjMudXRpbHMudXRmOFRvSGV4KG1ldGFkYXRhKSxcbiAgICAgICAgY29uZmlnLndlYjMudXRpbHMudXRmOFRvSGV4KGRlc2NyaXB0aW9uKVxuICAgIF07XG4gICAgICAgIFxuICAgIC8vIEVzdGltYXRlIHJlcXVpcmVkIGFtb3VudCBvZiBnYXNcbiAgICBjb25zdCBnYXMgPSBhd2FpdCB3ZWIzSGVscGVycy5lc3RpbWF0ZUdhcyhjb25maWcuY29udHJhY3RzLkRhdGFzZXQuYnl0ZWNvZGUsIGFyZ3MsIGNvbmZpZyk7XG5cbiAgICAvLyBDcmVhdGUgYW5kIGRlcGxveSBkYXRhc2V0IGNvbnRyYWN0XG4gICAgY29uc3QgZGF0YXNldENvbnRyYWN0QWRkcmVzcyA9IGF3YWl0IHdlYjNIZWxwZXJzLmRlcGxveUNvbnRyYWN0KGNvbmZpZy5jb250cmFjdHMuRGF0YXNldCwge1xuICAgICAgICBhcmdzLFxuICAgICAgICBmcm9tOiBwdWJsaXNoZXIsXG4gICAgICAgIGdhczogTnVtYmVyLnBhcnNlSW50KGdhcyAqIDEuNSwgMTApXG4gICAgfSwgY29uZmlnKTtcblxuICAgIHJldHVybiBkYXRhc2V0Q29udHJhY3RBZGRyZXNzO1xufTtcblxuLyoqXG4gKiBBZGQgZGF0YXNldCB0byBtYXJrZXRcbiAqIFxuICogQHBhcmFtIHtTdHJpbmd9IGRhdGFzZXRDb250cmFjdEFkZHJlc3MgXG4gKiBAcGFyYW0ge1N0cmluZ30gcHVibGlzaGVyQWRkcmVzcyBcbiAqIEBwYXJhbSB7T2JqZWN0fSBjb25maWcgTGlicmFyeSBjb25maWcgKHByb3ZpZGVkIGJ5IHRoZSBwcm94eSBidXQgY2FuIGJlIG92ZXJyaWRkZW4pXG4gKiBAcmV0dXJucyB7UHJvbWlzZX0gUHJvbWlzZSBvYmplY3QgcmVzb2x2ZWQgdG8ge1N0cmluZ30gY29udHJhY3RBZGRyZXNzXG4gKi9cbmV4cG9ydCBjb25zdCBhZGRUb01hcmtldCA9IChkYXRhc2V0Q29udHJhY3RBZGRyZXNzLCBwdWJsaXNoZXJBZGRyZXNzLCBjb25maWcgPSB7fSkgPT4gbmV3IFByb21pc2UoYXN5bmMgKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuXG4gICAgZXhwZWN0LmFsbCh7IGRhdGFzZXRDb250cmFjdEFkZHJlc3MsIHB1Ymxpc2hlckFkZHJlc3MgfSwge1xuICAgICAgICAnZGF0YXNldENvbnRyYWN0QWRkcmVzcyc6IHtcbiAgICAgICAgICAgIHR5cGU6ICdhZGRyZXNzJ1xuICAgICAgICB9LFxuICAgICAgICAncHVibGlzaGVyQWRkcmVzcyc6IHtcbiAgICAgICAgICAgIHR5cGU6ICdhZGRyZXNzJ1xuICAgICAgICB9XG4gICAgfSk7XG5cbiAgICBleHBlY3QuYWxsKGNvbmZpZywge1xuICAgICAgICAnd2ViMyc6IHtcbiAgICAgICAgICAgIHR5cGU6ICdvYmplY3QnLFxuICAgICAgICAgICAgY29kZTogV0VCM19SRVFVSVJFRFxuICAgICAgICB9LFxuICAgICAgICAnY29udHJhY3RzLlBhbmRvcmFNYXJrZXQuYWJpJzoge1xuICAgICAgICAgICAgdHlwZTogJ29iamVjdCcsXG4gICAgICAgICAgICBjb2RlOiBDT05UUkFDVF9SRVFVSVJFRCxcbiAgICAgICAgICAgIGFyZ3M6IFsnUGFuZG9yYU1hcmtldCddXG4gICAgICAgIH0sXG4gICAgICAgICdhZGRyZXNzZXMuUGFuZG9yYU1hcmtldCc6IHtcbiAgICAgICAgICAgIHR5cGU6ICdhZGRyZXNzJyxcbiAgICAgICAgICAgIGNvZGU6IEFERFJFU1NfUkVRVUlSRUQsXG4gICAgICAgICAgICBhcmdzOiBbJ01hcmtldCddXG4gICAgICAgIH0sXG4gICAgICAgICd3ZWIzLmN1cnJlbnRQcm92aWRlci5pc01ldGFNYXNrJzoge1xuICAgICAgICAgICAgdHlwZTogJ2Jvb2xlYW4nLFxuICAgICAgICAgICAgY29kZTogV0VCM19NRVRBTUFTS19SRVFVSVJFRFxuICAgICAgICB9XG4gICAgfSk7XG5cbiAgICBjb25zdCBtYXJrZXQgPSBuZXcgY29uZmlnLndlYjMuZXRoLkNvbnRyYWN0KGNvbmZpZy5jb250cmFjdHMuUGFuZG9yYU1hcmtldC5hYmksIGNvbmZpZy5hZGRyZXNzZXMuUGFuZG9yYU1hcmtldCk7XG4gICAgY29uc3QgZ2FzUHJpY2UgPSBhd2FpdCBjb25maWcud2ViMy5ldGguZ2V0R2FzUHJpY2UoKTtcbiAgICBtYXJrZXQubWV0aG9kc1xuICAgICAgICAuYWRkRGF0YXNldChkYXRhc2V0Q29udHJhY3RBZGRyZXNzKVxuICAgICAgICAuc2VuZCh7XG4gICAgICAgICAgICBmcm9tOiBwdWJsaXNoZXJBZGRyZXNzLFxuICAgICAgICAgICAgZ2FzUHJpY2VcbiAgICAgICAgfSlcbiAgICAgICAgLm9uKCdlcnJvcicsIHJlamVjdClcbiAgICAgICAgLm9uKCdyZWNlaXB0JywgcmVjZWlwdCA9PiB7XG5cbiAgICAgICAgICAgIGlmIChOdW1iZXIocmVjZWlwdC5zdGF0dXMpID09PSAwKSB7XG5cbiAgICAgICAgICAgICAgICByZXR1cm4gcmVqZWN0KHBqc0Vycm9yKFRSQU5TQUNUSU9OX1VOU1VDQ0VTU0ZVTCkpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICByZXNvbHZlKHJlY2VpcHQuY29udHJhY3RBZGRyZXNzIHx8IHJlY2VpcHQuZXZlbnRzLkRhdGFzZXRBZGRlZC5yZXR1cm5WYWx1ZXMuZGF0YXNldCk7XG4gICAgICAgIH0pO1xuICAgIC8vIEBub3RlIEluIGNhc2Ugb2YgZ2FuYWNoZS1jbGkgYmxvY2tjaGFpbiBcImNvbnRyYWN0QWRkcmVzc1wiIGFsd2F5cyB3aWxsIGJlIGVxdWFsIHRvIG51bGxcbn0pO1xuXG4vKipcbiAqIFJlbW92ZSBkYXRhc2V0IGZyb20gUGFuZG9yYU1hcmtldFxuICogXG4gKiBAcGFyYW0ge1N0cmluZ30gZGF0YXNldEFkZHJlc3NcbiAqIEBwYXJhbSB7U3RyaW5nfSBwdWJsaXNoZXJBZGRyZXNzIFxuICogQHBhcmFtIHtPYmplY3R9IGNvbmZpZyBMaWJyYXJ5IGNvbmZpZyAocHJvdmlkZWQgYnkgdGhlIHByb3h5IGJ1dCBjYW4gYmUgb3ZlcnJpZGRlbikgXG4gKi9cbmV4cG9ydCBjb25zdCByZW1vdmVEYXRhc2V0ID0gKGRhdGFzZXRBZGRyZXNzLCBwdWJsaXNoZXJBZGRyZXNzLCBjb25maWcgPSB7fSkgPT4gbmV3IFByb21pc2UoYXN5bmMgKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuXG4gICAgZXhwZWN0LmFsbCh7IGRhdGFzZXRBZGRyZXNzLCBwdWJsaXNoZXJBZGRyZXNzIH0sIHtcbiAgICAgICAgJ2RhdGFzZXRBZGRyZXNzJzoge1xuICAgICAgICAgICAgdHlwZTogJ2FkZHJlc3MnXG4gICAgICAgIH0sXG4gICAgICAgICdwdWJsaXNoZXJBZGRyZXNzJzoge1xuICAgICAgICAgICAgdHlwZTogJ2FkZHJlc3MnXG4gICAgICAgIH1cbiAgICB9KTtcblxuICAgIGV4cGVjdC5hbGwoY29uZmlnLCB7XG4gICAgICAgICd3ZWIzJzoge1xuICAgICAgICAgICAgdHlwZTogJ29iamVjdCcsXG4gICAgICAgICAgICBjb2RlOiBXRUIzX1JFUVVJUkVEXG4gICAgICAgIH0sXG4gICAgICAgICdjb250cmFjdHMuUGFuZG9yYU1hcmtldC5hYmknOiB7XG4gICAgICAgICAgICB0eXBlOiAnb2JqZWN0JyxcbiAgICAgICAgICAgIGNvZGU6IENPTlRSQUNUX1JFUVVJUkVELFxuICAgICAgICAgICAgYXJnczogWydQYW5kb3JhTWFya2V0J11cbiAgICAgICAgfSxcbiAgICAgICAgJ2FkZHJlc3Nlcy5QYW5kb3JhTWFya2V0Jzoge1xuICAgICAgICAgICAgdHlwZTogJ2FkZHJlc3MnLFxuICAgICAgICAgICAgY29kZTogQUREUkVTU19SRVFVSVJFRCxcbiAgICAgICAgICAgIGFyZ3M6IFsnUGFuZG9yYU1hcmtldCddXG4gICAgICAgIH1cbiAgICB9KTtcblxuICAgIGNvbnN0IG1hcmtldCA9IG5ldyBjb25maWcud2ViMy5ldGguQ29udHJhY3QoY29uZmlnLmNvbnRyYWN0cy5QYW5kb3JhTWFya2V0LmFiaSwgY29uZmlnLmFkZHJlc3Nlcy5QYW5kb3JhTWFya2V0KTtcbiAgICBjb25zdCBnYXNQcmljZSA9IGF3YWl0IGNvbmZpZy53ZWIzLmV0aC5nZXRHYXNQcmljZSgpO1xuICAgIG1hcmtldC5tZXRob2RzXG4gICAgICAgIC5yZW1vdmVEYXRhc2V0KGRhdGFzZXRBZGRyZXNzKVxuICAgICAgICAuc2VuZCh7XG4gICAgICAgICAgICBmcm9tOiBwdWJsaXNoZXJBZGRyZXNzLFxuICAgICAgICAgICAgZ2FzUHJpY2VcbiAgICAgICAgfSlcbiAgICAgICAgLm9uKCdlcnJvcicsIHJlamVjdClcbiAgICAgICAgLm9uKCdyZWNlaXB0JywgcmVjZWlwdCA9PiB7XG5cbiAgICAgICAgICAgIGlmIChOdW1iZXIocmVjZWlwdC5zdGF0dXMpID09PSAwKSB7XG5cbiAgICAgICAgICAgICAgICByZXR1cm4gcmVqZWN0KHBqc0Vycm9yKFRSQU5TQUNUSU9OX1VOU1VDQ0VTU0ZVTCkpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICByZXNvbHZlKHJlY2VpcHQuY29udHJhY3RBZGRyZXNzKTtcbiAgICAgICAgfSk7XG59KTtcblxuLyoqXG4gKiBIYW5kbGUgZXZlbnQgRGF0YXNldEFkZGVkXG4gKiBcbiAqIEBwYXJhbSB7T2JqZWN0fSBvcHRpb25zIEV2ZW50IGhhbmRsZXIgb3B0aW9uc1xuICogQHBhcmFtIHtPYmplY3R9IGNvbmZpZyBMaWJyYXJ5IGNvbmZpZyAocHJvdmlkZWQgYnkgdGhlIHByb3h5IGJ1dCBjYW4gYmUgb3ZlcnJpZGRlbilcbiAqIEByZXR1cm5zIHtQcm9taXNlPHtPYmplY3R9Pn0gUFByb21pc2Ugb2JqZWN0IHJlc29sdmVkIHRvIHRoZSBvYmplY3Qgd2l0aCBjaGFpbmVkIGNhbGxiYWNrcyAjZGF0YSBhbmQgI2Vycm9yXG4gKi9cbmV4cG9ydCBjb25zdCBldmVudERhdGFzZXRBZGRlZCA9IGFzeW5jIChvcHRpb25zID0ge30sIGNvbmZpZyA9IHt9KSA9PiB7XG5cbiAgICBleHBlY3QuYWxsKHsgb3B0aW9ucyB9LCB7XG4gICAgICAgICdvcHRpb25zJzoge1xuICAgICAgICAgICAgdHlwZTogJ29iamVjdCdcbiAgICAgICAgfVxuICAgIH0pO1xuXG4gICAgZXhwZWN0LmFsbChjb25maWcsIHtcbiAgICAgICAgJ3dlYjMnOiB7XG4gICAgICAgICAgICB0eXBlOiAnb2JqZWN0JyxcbiAgICAgICAgICAgIGNvZGU6IFdFQjNfUkVRVUlSRURcbiAgICAgICAgfSxcbiAgICAgICAgJ2NvbnRyYWN0cy5QYW5kb3JhTWFya2V0LmFiaSc6IHtcbiAgICAgICAgICAgIHR5cGU6ICdvYmplY3QnLFxuICAgICAgICAgICAgY29kZTogQ09OVFJBQ1RfUkVRVUlSRUQsXG4gICAgICAgICAgICBhcmdzOiBbJ1BhbmRvcmFNYXJrZXQnXVxuICAgICAgICB9LFxuICAgICAgICAnYWRkcmVzc2VzLlBhbmRvcmFNYXJrZXQnOiB7XG4gICAgICAgICAgICB0eXBlOiAnYWRkcmVzcycsXG4gICAgICAgICAgICBjb2RlOiBBRERSRVNTX1JFUVVJUkVELFxuICAgICAgICAgICAgYXJnczogWydNYXJrZXQnXVxuICAgICAgICB9XG4gICAgfSk7XG5cbiAgICBjb25zdCBjYWxsYmFja3MgPSB7XG4gICAgICAgIG9uRGF0YTogKCkgPT4ge30sXG4gICAgICAgIG9uRXJyb3I6ICgpID0+IHt9XG4gICAgfTtcblxuICAgIGNvbnN0IGNoYWluID0ge1xuICAgICAgICBkYXRhOiAoY2IgPSAoKSA9PiB7fSkgPT4ge1xuICAgICAgICAgICAgY2FsbGJhY2tzLm9uRGF0YSA9IGNiO1xuICAgICAgICAgICAgcmV0dXJuIGNoYWluO1xuICAgICAgICB9LFxuICAgICAgICBlcnJvcjogKGNiID0gKCkgPT4ge30pID0+IHtcbiAgICAgICAgICAgIGNhbGxiYWNrcy5vbkVycm9yID0gY2I7XG4gICAgICAgICAgICByZXR1cm4gY2hhaW47XG4gICAgICAgIH1cbiAgICB9O1xuXG4gICAgY29uc3QgbWFyID0gbmV3IGNvbmZpZy53ZWIzLmV0aC5Db250cmFjdChjb25maWcuY29udHJhY3RzLlBhbmRvcmFNYXJrZXQuYWJpLCBjb25maWcuYWRkcmVzc2VzLlBhbmRvcmFNYXJrZXQpO1xuICAgIGNoYWluLmV2ZW50ID0gW107XG4gICAgY2hhaW4uZXZlbnRbMF0gPSBtYXIuZXZlbnRzLkRhdGFzZXRBZGRlZChvcHRpb25zKVxuICAgICAgICAub24oJ2RhdGEnLCBhc3luYyBldmVudCA9PiB7XG5cbiAgICAgICAgICAgIHRyeSB7XG5cbiAgICAgICAgICAgICAgICBjb25zdCBkYXRhc2V0ID0gYXdhaXQgZmV0Y2hEYXRhc2V0KGV2ZW50LnJldHVyblZhbHVlcy5kYXRhc2V0LCBjb25maWcpO1xuICAgICAgICAgICAgICAgIGNhbGxiYWNrcy5vbkRhdGEoe1xuICAgICAgICAgICAgICAgICAgICByZWNvcmRzOiBbZGF0YXNldF0sXG4gICAgICAgICAgICAgICAgICAgIGV2ZW50XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9IGNhdGNoKGVycikge1xuICAgICAgICAgICAgICAgIGNhbGxiYWNrcy5vbkVycm9yKGVycik7XG4gICAgICAgICAgICB9ICAgICAgICAgICAgXG4gICAgICAgIH0pXG4gICAgICAgIC5vbignZXJyb3InLCBjYWxsYmFja3Mub25FcnJvcik7XG4gICAgY2hhaW4uZXZlbnRbMF0ubmFtZSA9ICdEYXRhc2V0QWRkZWQnO1xuXG4gICAgcmV0dXJuIGNoYWluO1xufTtcblxuLyoqXG4gKiBIYW5kbGUgZXZlbnQgRGF0YXNldFJlbW92ZWRcbiAqIFxuICogQHBhcmFtIHtPYmplY3R9IG9wdGlvbnMgRXZlbnQgaGFuZGxlciBvcHRpb25zXG4gKiBAcGFyYW0ge09iamVjdH0gY29uZmlnIExpYnJhcnkgY29uZmlnIChwcm92aWRlZCBieSB0aGUgcHJveHkgYnV0IGNhbiBiZSBvdmVycmlkZGVuKVxuICogQHJldHVybnMge1Byb21pc2U8e09iamVjdH0+fSBQUHJvbWlzZSBvYmplY3QgcmVzb2x2ZWQgdG8gdGhlIG9iamVjdCB3aXRoIGNoYWluZWQgY2FsbGJhY2tzICNkYXRhIGFuZCAjZXJyb3JcbiAqL1xuZXhwb3J0IGNvbnN0IGV2ZW50RGF0YXNldFJlbW92ZWQgPSBhc3luYyAob3B0aW9ucyA9IHt9LCBjb25maWcgPSB7fSkgPT4ge1xuXG4gICAgZXhwZWN0LmFsbCh7IG9wdGlvbnMgfSwge1xuICAgICAgICAnb3B0aW9ucyc6IHtcbiAgICAgICAgICAgIHR5cGU6ICdvYmplY3QnXG4gICAgICAgIH1cbiAgICB9KTtcblxuICAgIGV4cGVjdC5hbGwoY29uZmlnLCB7XG4gICAgICAgICd3ZWIzJzoge1xuICAgICAgICAgICAgdHlwZTogJ29iamVjdCcsXG4gICAgICAgICAgICBjb2RlOiBXRUIzX1JFUVVJUkVEXG4gICAgICAgIH0sXG4gICAgICAgICdjb250cmFjdHMuUGFuZG9yYU1hcmtldC5hYmknOiB7XG4gICAgICAgICAgICB0eXBlOiAnb2JqZWN0JyxcbiAgICAgICAgICAgIGNvZGU6IENPTlRSQUNUX1JFUVVJUkVELFxuICAgICAgICAgICAgYXJnczogWydQYW5kb3JhTWFya2V0J11cbiAgICAgICAgfSxcbiAgICAgICAgJ2FkZHJlc3Nlcy5QYW5kb3JhTWFya2V0Jzoge1xuICAgICAgICAgICAgdHlwZTogJ2FkZHJlc3MnLFxuICAgICAgICAgICAgY29kZTogQUREUkVTU19SRVFVSVJFRCxcbiAgICAgICAgICAgIGFyZ3M6IFsnUGFuZG9yYU1hcmtldCddXG4gICAgICAgIH1cbiAgICB9KTtcblxuICAgIGNvbnN0IGNhbGxiYWNrcyA9IHtcbiAgICAgICAgb25EYXRhOiAoKSA9PiB7fSxcbiAgICAgICAgb25FcnJvcjogKCkgPT4ge31cbiAgICB9O1xuXG4gICAgY29uc3QgY2hhaW4gPSB7XG4gICAgICAgIGRhdGE6IChjYiA9ICgpID0+IHt9KSA9PiB7XG4gICAgICAgICAgICBjYWxsYmFja3Mub25EYXRhID0gY2I7XG4gICAgICAgICAgICByZXR1cm4gY2hhaW47XG4gICAgICAgIH0sXG4gICAgICAgIGVycm9yOiAoY2IgPSAoKSA9PiB7fSkgPT4ge1xuICAgICAgICAgICAgY2FsbGJhY2tzLm9uRXJyb3IgPSBjYjtcbiAgICAgICAgICAgIHJldHVybiBjaGFpbjtcbiAgICAgICAgfVxuICAgIH07XG5cbiAgICBjb25zdCBtYXIgPSBuZXcgY29uZmlnLndlYjMuZXRoLkNvbnRyYWN0KGNvbmZpZy5jb250cmFjdHMuUGFuZG9yYU1hcmtldC5hYmksIGNvbmZpZy5hZGRyZXNzZXMuUGFuZG9yYU1hcmtldCk7XG4gICAgY2hhaW4uZXZlbnQgPSBbXTtcbiAgICBjaGFpbi5ldmVudFswXSA9IG1hci5ldmVudHMuRGF0YXNldFJlbW92ZWQob3B0aW9ucylcbiAgICAgICAgLm9uKCdkYXRhJywgYXN5bmMgZXZlbnQgPT4ge1xuXG4gICAgICAgICAgICBjYWxsYmFja3Mub25EYXRhKHtcbiAgICAgICAgICAgICAgICByZWNvcmRzOiBbe2FkZHJlc3M6IGV2ZW50LnJldHVyblZhbHVlcy5kYXRhc2V0fV0sXG4gICAgICAgICAgICAgICAgZXZlbnRcbiAgICAgICAgICAgIH0pOyAgICAgICAgICAgIFxuICAgICAgICB9KVxuICAgICAgICAub24oJ2Vycm9yJywgY2FsbGJhY2tzLm9uRXJyb3IpO1xuICAgIGNoYWluLmV2ZW50WzBdLm5hbWUgPSAnRGF0YXNldFJlbW92ZWQnO1xuXG4gICAgcmV0dXJuIGNoYWluO1xufTtcbiJdfQ==