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
 * @param {string} address
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
 * @param {string} address
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
 * @param {string} address
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
  const args = [config.web3.utils.utf8ToHex(datasetIpfsHash), dimension, batchesCount, price, config.web3.utils.utf8ToHex(metadata), config.web3.utils.utf8ToHex(description)]; // Estimate required amount of gas

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
 * @returns {Promise} Promise object resolved to {string} contractAddress
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
 * @returns {Object} Object with chained callbacks #data and #error
 */


exports.removeDataset = removeDataset;

const eventDatasetAdded = (options = {}, config = {}) => {
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
  chain.event = mar.events.DatasetAdded(options).on('data', async event => {
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
  chain.event.name = 'DatasetAdded';
  return chain;
};
/**
 * Handle event DatasetRemoved
 * 
 * @param {Object} options Event handler options
 * @param {Object} config Library config (provided by the proxy but can be overridden)
 * @returns {Object} Object with chained callbacks #data and #error
 */


exports.eventDatasetAdded = eventDatasetAdded;

const eventDatasetRemoved = (options = {}, config = {}) => {
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
  chain.event = mar.events.DatasetRemoved(options).on('data', async event => {
    callbacks.onData({
      records: [{
        address: event.returnValues.dataset
      }],
      event
    });
  }).on('error', callbacks.onError);
  chain.event.name = 'DatasetRemoved';
  return chain;
};

exports.eventDatasetRemoved = eventDatasetRemoved;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9kYXRhc2V0cy5qcyJdLCJuYW1lcyI6WyJmZXRjaENvdW50IiwiY29uZmlnIiwiZXhwZWN0IiwiYWxsIiwidHlwZSIsImNvZGUiLCJXRUIzX1JFUVVJUkVEIiwiQ09OVFJBQ1RfUkVRVUlSRUQiLCJhcmdzIiwiQUREUkVTU19SRVFVSVJFRCIsIm1hciIsIndlYjMiLCJldGgiLCJDb250cmFjdCIsImNvbnRyYWN0cyIsIlBhbmRvcmFNYXJrZXQiLCJhYmkiLCJhZGRyZXNzZXMiLCJjb3VudCIsIm1ldGhvZHMiLCJkYXRhc2V0c0NvdW50IiwiY2FsbCIsIk51bWJlciIsInBhcnNlSW50IiwiZmV0Y2hBZGRyZXNzQnlJZCIsImlkIiwiZGF0YXNldENvbnRyYWN0IiwiZGF0YXNldHMiLCJmZXRjaElwZnNBZGRyZXNzIiwiYWRkcmVzcyIsImRhdCIsIkRhdGFzZXQiLCJpcGZzQWRkcmVzcyIsInV0aWxzIiwiaGV4VG9Bc2NpaSIsImZldGNoRGF0YURpbSIsImRhdGFEaW0iLCJmZXRjaEN1cnJlbnRQcmljZSIsImN1cnJlbnRQcmljZSIsImZldGNoQmF0Y2hlc0NvdW50IiwiYmF0Y2hlc0NvdW50IiwiZmV0Y2hEZXNjcmlwdGlvbiIsImRlc2NyaXB0aW9uIiwiaGV4VG9VdGY4IiwiZmV0Y2hNZXRhZGF0YSIsIm1ldGFkYXRhIiwiZmV0Y2hEYXRhc2V0IiwiUHJvbWlzZSIsImZldGNoRGF0YXNldEJ5SWQiLCJkYXRhc2V0IiwiZmV0Y2hBbGwiLCJyZWNvcmRzIiwiZXJyb3IiLCJpIiwicHVzaCIsImVyciIsIm1lc3NhZ2UiLCJkZXBsb3kiLCJkYXRhc2V0SXBmc0hhc2giLCJkaW1lbnNpb24iLCJwcmljZSIsInB1Ymxpc2hlciIsIldFQjNfTUVUQU1BU0tfUkVRVUlSRUQiLCJ1dGY4VG9IZXgiLCJnYXMiLCJ3ZWIzSGVscGVycyIsImVzdGltYXRlR2FzIiwiYnl0ZWNvZGUiLCJkYXRhc2V0Q29udHJhY3RBZGRyZXNzIiwiZGVwbG95Q29udHJhY3QiLCJmcm9tIiwiYWRkVG9NYXJrZXQiLCJwdWJsaXNoZXJBZGRyZXNzIiwicmVzb2x2ZSIsInJlamVjdCIsIm1hcmtldCIsImdhc1ByaWNlIiwiZ2V0R2FzUHJpY2UiLCJhZGREYXRhc2V0Iiwic2VuZCIsIm9uIiwicmVjZWlwdCIsInN0YXR1cyIsIlRSQU5TQUNUSU9OX1VOU1VDQ0VTU0ZVTCIsImNvbnRyYWN0QWRkcmVzcyIsImV2ZW50cyIsIkRhdGFzZXRBZGRlZCIsInJldHVyblZhbHVlcyIsInJlbW92ZURhdGFzZXQiLCJkYXRhc2V0QWRkcmVzcyIsImV2ZW50RGF0YXNldEFkZGVkIiwib3B0aW9ucyIsImNhbGxiYWNrcyIsIm9uRGF0YSIsIm9uRXJyb3IiLCJjaGFpbiIsImRhdGEiLCJjYiIsImV2ZW50IiwibmFtZSIsImV2ZW50RGF0YXNldFJlbW92ZWQiLCJEYXRhc2V0UmVtb3ZlZCJdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7Ozs7O0FBU0E7Ozs7Ozs7QUFFQTs7QUFDQTs7QUFPQTs7Ozs7Ozs7QUFFQTs7Ozs7O0FBTU8sTUFBTUEsVUFBVSxHQUFHLE9BQU9DLE1BQU0sR0FBRyxFQUFoQixLQUF1QjtBQUU3Q0MsRUFBQUEsTUFBTSxDQUFDQyxHQUFQLENBQVdGLE1BQVgsRUFBbUI7QUFDZixZQUFRO0FBQ0pHLE1BQUFBLElBQUksRUFBRSxRQURGO0FBRUpDLE1BQUFBLElBQUksRUFBRUM7QUFGRixLQURPO0FBS2YsbUNBQStCO0FBQzNCRixNQUFBQSxJQUFJLEVBQUUsUUFEcUI7QUFFM0JDLE1BQUFBLElBQUksRUFBRUUseUJBRnFCO0FBRzNCQyxNQUFBQSxJQUFJLEVBQUUsQ0FBQyxlQUFEO0FBSHFCLEtBTGhCO0FBVWYsK0JBQTJCO0FBQ3ZCSixNQUFBQSxJQUFJLEVBQUUsU0FEaUI7QUFFdkJDLE1BQUFBLElBQUksRUFBRUksd0JBRmlCO0FBR3ZCRCxNQUFBQSxJQUFJLEVBQUUsQ0FBQyxlQUFEO0FBSGlCO0FBVlosR0FBbkI7QUFpQkEsUUFBTUUsR0FBRyxHQUFHLElBQUlULE1BQU0sQ0FBQ1Us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QUExQixFQUNUWCxFQURTLENBQ04sTUFETSxFQUNFLE1BQU1rQixLQUFOLElBQWU7QUFFdkJOLElBQUFBLFNBQVMsQ0FBQ0MsTUFBVixDQUFpQjtBQUNiMUMsTUFBQUEsT0FBTyxFQUFFLENBQUM7QUFBQ3RCLFFBQUFBLE9BQU8sRUFBRXFFLEtBQUssQ0FBQ1gsWUFBTixDQUFtQnRDO0FBQTdCLE9BQUQsQ0FESTtBQUViaUQsTUFBQUE7QUFGYSxLQUFqQjtBQUlILEdBUFMsRUFRVGxCLEVBUlMsQ0FRTixPQVJNLEVBUUdZLFNBQVMsQ0FBQ0UsT0FSYixDQUFkO0FBU0FDLEVBQUFBLEtBQUssQ0FBQ0csS0FBTixDQUFZQyxJQUFaLEdBQW1CLGdCQUFuQjtBQUVBLFNBQU9KLEtBQVA7QUFDSCxDQXRETSIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogRGF0YXNldHMgcmVsYXRlZCBtZXRob2RzXG4gKiBUaGlzIGZpbGUgaXQgaXMgYSBwYXJ0IG9mIHRoZSBQYW5kb3JhIFB5cnJoYSBKYXZhc2NyaXB0IGxpYnJhcnlcbiAqIFxuICogQGZpbGUgZGF0YXNldHMuanNcbiAqIEBhdXRob3IgS29zdGlhbnR5biBTbXlybm92IDxrb3N0eXNoQGdtYWlsLmNvbT5cbiAqIEBkYXRlIDIwMThcbiAqL1xuXG4ndXNlIHN0cmljdCc7XG5cbmltcG9ydCAqIGFzIGV4cGVjdCBmcm9tICcuL2hlbHBlcnMvZXhwZWN0JztcbmltcG9ydCBwanNFcnJvciwge1xuICAgIENPTlRSQUNUX1JFUVVJUkVELFxuICAgIEFERFJFU1NfUkVRVUlSRUQsXG4gICAgV0VCM19SRVFVSVJFRCxcbiAgICBXRUIzX01FVEFNQVNLX1JFUVVJUkVELFxuICAgIFRSQU5TQUNUSU9OX1VOU1VDQ0VTU0ZVTFxufSBmcm9tICcuL2hlbHBlcnMvZXJyb3JzJztcbmltcG9ydCAqIGFzIHdlYjNIZWxwZXJzIGZyb20gJy4vaGVscGVycy93ZWIzJztcblxuLyoqXG4gKiBHZXQgZGF0YXNldHMgY291bnQgZnJvbSBQYW5kb3JhTWFya2V0IGNvbnRyYWN0XG4gKiBcbiAqIEBwYXJhbSB7T2JqZWN0fSBjb25maWcgTGlicmFyeSBjb25maWcgKHByb3ZpZGVkIGJ5IHRoZSBwcm94eSBidXQgY2FuIGJlIG92ZXJyaWRkZW4pXG4gKiBAcmV0dXJucyB7UHJvbWlzZX0gQSBQcm9taXNlIG9iamVjdCByZXByZXNlbnRzIHRoZSB7bnVtYmVyfSBcbiAqL1xuZXhwb3J0IGNvbnN0IGZldGNoQ291bnQgPSBhc3luYyAoY29uZmlnID0ge30pID0+IHtcblxuICAgIGV4cGVjdC5hbGwoY29uZmlnLCB7XG4gICAgICAgICd3ZWIzJzoge1xuICAgICAgICAgICAgdHlwZTogJ29iamVjdCcsXG4gICAgICAgICAgICBjb2RlOiBXRUIzX1JFUVVJUkVEXG4gICAgICAgIH0sXG4gICAgICAgICdjb250cmFjdHMuUGFuZG9yYU1hcmtldC5hYmknOiB7XG4gICAgICAgICAgICB0eXBlOiAnb2JqZWN0JyxcbiAgICAgICAgICAgIGNvZGU6IENPTlRSQUNUX1JFUVVJUkVELFxuICAgICAgICAgICAgYXJnczogWydQYW5kb3JhTWFya2V0J11cbiAgICAgICAgfSxcbiAgICAgICAgJ2FkZHJlc3Nlcy5QYW5kb3JhTWFya2V0Jzoge1xuICAgICAgICAgICAgdHlwZTogJ2FkZHJlc3MnLFxuICAgICAgICAgICAgY29kZTogQUREUkVTU19SRVFVSVJFRCxcbiAgICAgICAgICAgIGFyZ3M6IFsnUGFuZG9yYU1hcmtldCddXG4gICAgICAgIH1cbiAgICB9KTtcblxuICAgIGNvbnN0IG1hciA9IG5ldyBjb25maWcud2ViMy5ldGguQ29udHJhY3QoY29uZmlnLmNvbnRyYWN0cy5QYW5kb3JhTWFya2V0LmFiaSwgY29uZmlnLmFkZHJlc3Nlcy5QYW5kb3JhTWFya2V0KTtcbiAgICBjb25zdCBjb3VudCA9IGF3YWl0IG1hci5tZXRob2RzXG4gICAgICAgIC5kYXRhc2V0c0NvdW50KClcbiAgICAgICAgLmNhbGwoKTtcblxuICAgIHJldHVybiBOdW1iZXIucGFyc2VJbnQoY291bnQsIDEwKTtcbn07XG5cbi8qKlxuICogR2V0IERhdGFzZXQgYWRkcmVzcyBieSBkYXRhc2V0IGlkXG4gKiBcbiAqIEBwYXJhbSB7bnVtYmVyfSBpZFxuICogQHBhcmFtIHtPYmplY3R9IGNvbmZpZyBMaWJyYXJ5IGNvbmZpZyAocHJvdmlkZWQgYnkgdGhlIHByb3h5IGJ1dCBjYW4gYmUgb3ZlcnJpZGRlbilcbiAqIEByZXR1cm5zIHtQcm9taXNlfSBBIFByb21pc2Ugb2JqZWN0IHJlcHJlc2VudHMgdGhlIHtzdHJpbmd9XG4gKi9cbmV4cG9ydCBjb25zdCBmZXRjaEFkZHJlc3NCeUlkID0gYXN5bmMgKGlkLCBjb25maWcgPSB7fSkgPT4ge1xuXG4gICAgZXhwZWN0LmFsbCh7IGlkIH0sIHtcbiAgICAgICAgJ2lkJzoge1xuICAgICAgICAgICAgdHlwZTogJ251bWJlcidcbiAgICAgICAgfVxuICAgIH0pO1xuXG4gICAgZXhwZWN0LmFsbChjb25maWcsIHtcbiAgICAgICAgJ3dlYjMnOiB7XG4gICAgICAgICAgICB0eXBlOiAnb2JqZWN0JyxcbiAgICAgICAgICAgIGNvZGU6IFdFQjNfUkVRVUlSRURcbiAgICAgICAgfSxcbiAgICAgICAgJ2NvbnRyYWN0cy5QYW5kb3JhTWFya2V0LmFiaSc6IHtcbiAgICAgICAgICAgIHR5cGU6ICdvYmplY3QnLFxuICAgICAgICAgICAgY29kZTogQ09OVFJBQ1RfUkVRVUlSRUQsXG4gICAgICAgICAgICBhcmdzOiBbJ1BhbmRvcmFNYXJrZXQnXVxuICAgICAgICB9LFxuICAgICAgICAnYWRkcmVzc2VzLlBhbmRvcmFNYXJrZXQnOiB7XG4gICAgICAgICAgICB0eXBlOiAnYWRkcmVzcycsXG4gICAgICAgICAgICBjb2RlOiBBRERSRVNTX1JFUVVJUkVELFxuICAgICAgICAgICAgYXJnczogWydNYXJrZXQnXVxuICAgICAgICB9XG4gICAgfSk7XG5cbiAgICBjb25zdCBtYXIgPSBuZXcgY29uZmlnLndlYjMuZXRoLkNvbnRyYWN0KGNvbmZpZy5jb250cmFjdHMuUGFuZG9yYU1hcmtldC5hYmksIGNvbmZpZy5hZGRyZXNzZXMuUGFuZG9yYU1hcmtldCk7XG4gICAgY29uc3QgZGF0YXNldENvbnRyYWN0ID0gYXdhaXQgbWFyLm1ldGhvZHNcbiAgICAgICAgLmRhdGFzZXRzKGlkKVxuICAgICAgICAuY2FsbCgpO1xuXG4gICAgcmV0dXJuIGRhdGFzZXRDb250cmFjdDtcbn07XG5cbi8qKlxuICogR2V0IElQRlMgYWRkcmVzcyBmcm9tIERhdGFzZXQgY29udHJhY3QgYnkgdGhlIGRhdGFzZXQgYWRkcmVzc1xuICogXG4gKiBAcGFyYW0ge3N0cmluZ30gYWRkcmVzc1xuICogQHBhcmFtIHtPYmplY3R9IGNvbmZpZyBMaWJyYXJ5IGNvbmZpZyAocHJvdmlkZWQgYnkgdGhlIHByb3h5IGJ1dCBjYW4gYmUgb3ZlcnJpZGRlbilcbiAqIEByZXR1cm5zIHtQcm9taXNlfSBBIFByb21pc2Ugb2JqZWN0IHJlcHJlc2VudHMgdGhlIHtzdHJpbmd9XG4gKi9cbmV4cG9ydCBjb25zdCBmZXRjaElwZnNBZGRyZXNzID0gYXN5bmMgKGFkZHJlc3MgPSAnJywgY29uZmlnID0ge30pID0+IHtcblxuICAgIGV4cGVjdC5hbGwoeyBhZGRyZXNzIH0sIHtcbiAgICAgICAgJ2FkZHJlc3MnOiB7XG4gICAgICAgICAgICB0eXBlOiAnYWRkcmVzcydcbiAgICAgICAgfVxuICAgIH0pO1xuXG4gICAgZXhwZWN0LmFsbChjb25maWcsIHtcbiAgICAgICAgJ3dlYjMnOiB7XG4gICAgICAgICAgICB0eXBlOiAnb2JqZWN0JyxcbiAgICAgICAgICAgIGNvZGU6IFdFQjNfUkVRVUlSRURcbiAgICAgICAgfSxcbiAgICAgICAgJ2NvbnRyYWN0cy5EYXRhc2V0LmFiaSc6IHtcbiAgICAgICAgICAgIHR5cGU6ICdvYmplY3QnLFxuICAgICAgICAgICAgY29kZTogQ09OVFJBQ1RfUkVRVUlSRUQsXG4gICAgICAgICAgICBhcmdzOiBbJ0RhdGFzZXQnXVxuICAgICAgICB9XG4gICAgfSk7XG5cbiAgICBjb25zdCBkYXQgPSBuZXcgY29uZmlnLndlYjMuZXRoLkNvbnRyYWN0KGNvbmZpZy5jb250cmFjdHMuRGF0YXNldC5hYmksIGFkZHJlc3MpO1xuICAgIGNvbnN0IGlwZnNBZGRyZXNzID0gYXdhaXQgZGF0Lm1ldGhvZHNcbiAgICAgICAgLmlwZnNBZGRyZXNzKClcbiAgICAgICAgLmNhbGwoKTtcblxuICAgIHJldHVybiBjb25maWcud2ViMy51dGlscy5oZXhUb0FzY2lpKGlwZnNBZGRyZXNzKTtcbn07XG5cbi8qKlxuICogR2V0IGRhdGEgZGltIGZyb20gRGF0YXNldCBjb250cmFjdCBieSB0aGUgZGF0YXNldCBhZGRyZXNzXG4gKiBcbiAqIEBwYXJhbSB7c3RyaW5nfSBhZGRyZXNzXG4gKiBAcGFyYW0ge09iamVjdH0gY29uZmlnIExpYnJhcnkgY29uZmlnIChwcm92aWRlZCBieSB0aGUgcHJveHkgYnV0IGNhbiBiZSBvdmVycmlkZGVuKVxuICogQHJldHVybnMge1Byb21pc2V9IEEgUHJvbWlzZSBvYmplY3QgcmVwcmVzZW50cyB0aGUge251bWJlcn1cbiAqL1xuZXhwb3J0IGNvbnN0IGZldGNoRGF0YURpbSA9IGFzeW5jIChhZGRyZXNzID0gJycsIGNvbmZpZyA9IHt9KSA9PiB7XG5cbiAgICBleHBlY3QuYWxsKHsgYWRkcmVzcyB9LCB7XG4gICAgICAgICdhZGRyZXNzJzoge1xuICAgICAgICAgICAgdHlwZTogJ2FkZHJlc3MnXG4gICAgICAgIH1cbiAgICB9KTtcblxuICAgIGV4cGVjdC5hbGwoY29uZmlnLCB7XG4gICAgICAgICd3ZWIzJzoge1xuICAgICAgICAgICAgdHlwZTogJ29iamVjdCcsXG4gICAgICAgICAgICBjb2RlOiBXRUIzX1JFUVVJUkVEXG4gICAgICAgIH0sXG4gICAgICAgICdjb250cmFjdHMuRGF0YXNldC5hYmknOiB7XG4gICAgICAgICAgICB0eXBlOiAnb2JqZWN0JyxcbiAgICAgICAgICAgIGNvZGU6IENPTlRSQUNUX1JFUVVJUkVELFxuICAgICAgICAgICAgYXJnczogWydEYXRhc2V0J11cbiAgICAgICAgfVxuICAgIH0pO1xuXG4gICAgY29uc3QgZGF0ID0gbmV3IGNvbmZpZy53ZWIzLmV0aC5Db250cmFjdChjb25maWcuY29udHJhY3RzLkRhdGFzZXQuYWJpLCBhZGRyZXNzKTtcbiAgICBjb25zdCBkYXRhRGltID0gYXdhaXQgZGF0Lm1ldGhvZHNcbiAgICAgICAgLmRhdGFEaW0oKVxuICAgICAgICAuY2FsbCgpO1xuXG4gICAgcmV0dXJuIE51bWJlci5wYXJzZUludChkYXRhRGltLCAxMCk7XG59O1xuXG4vKipcbiAqIEdldCBjdXJyZW50IHByaWNlIGZyb20gRGF0YXNldCBjb250cmFjdCBieSB0aGUgZGF0YXNldCBhZGRyZXNzXG4gKiBcbiAqIEBwYXJhbSB7c3RyaW5nfSBhZGRyZXNzXG4gKiBAcGFyYW0ge09iamVjdH0gY29uZmlnIExpYnJhcnkgY29uZmlnIChwcm92aWRlZCBieSB0aGUgcHJveHkgYnV0IGNhbiBiZSBvdmVycmlkZGVuKVxuICogQHJldHVybnMge1Byb21pc2V9IEEgUHJvbWlzZSBvYmplY3QgcmVwcmVzZW50cyB0aGUge251bWJlcn1cbiAqL1xuZXhwb3J0IGNvbnN0IGZldGNoQ3VycmVudFByaWNlID0gYXN5bmMgKGFkZHJlc3MgPSAnJywgY29uZmlnID0ge30pID0+IHtcblxuICAgIGV4cGVjdC5hbGwoeyBhZGRyZXNzIH0sIHtcbiAgICAgICAgJ2FkZHJlc3MnOiB7XG4gICAgICAgICAgICB0eXBlOiAnYWRkcmVzcydcbiAgICAgICAgfVxuICAgIH0pO1xuXG4gICAgZXhwZWN0LmFsbChjb25maWcsIHtcbiAgICAgICAgJ3dlYjMnOiB7XG4gICAgICAgICAgICB0eXBlOiAnb2JqZWN0JyxcbiAgICAgICAgICAgIGNvZGU6IFdFQjNfUkVRVUlSRURcbiAgICAgICAgfSxcbiAgICAgICAgJ2NvbnRyYWN0cy5EYXRhc2V0LmFiaSc6IHtcbiAgICAgICAgICAgIHR5cGU6ICdvYmplY3QnLFxuICAgICAgICAgICAgY29kZTogQ09OVFJBQ1RfUkVRVUlSRUQsXG4gICAgICAgICAgICBhcmdzOiBbJ0RhdGFzZXQnXVxuICAgICAgICB9XG4gICAgfSk7XG5cbiAgICBjb25zdCBkYXQgPSBuZXcgY29uZmlnLndlYjMuZXRoLkNvbnRyYWN0KGNvbmZpZy5jb250cmFjdHMuRGF0YXNldC5hYmksIGFkZHJlc3MpO1xuICAgIGNvbnN0IGN1cnJlbnRQcmljZSA9IGF3YWl0IGRhdC5tZXRob2RzXG4gICAgICAgIC5jdXJyZW50UHJpY2UoKVxuICAgICAgICAuY2FsbCgpO1xuXG4gICAgcmV0dXJuIE51bWJlci5wYXJzZUludChjdXJyZW50UHJpY2UsIDEwKTtcbn07XG5cbi8qKlxuICogR2V0IGRhdGEgYmF0Y2hlcyBjb3VudCBmcm9tIERhdGFzZXQgY29udHJhY3QgYnkgdGhlIGRhdGFzZXQgYWRkcmVzc1xuICogXG4gKiBAcGFyYW0ge3N0cmluZ30gYWRkcmVzc1xuICogQHBhcmFtIHtPYmplY3R9IGNvbmZpZyBMaWJyYXJ5IGNvbmZpZyAocHJvdmlkZWQgYnkgdGhlIHByb3h5IGJ1dCBjYW4gYmUgb3ZlcnJpZGRlbilcbiAqIEByZXR1cm5zIHtQcm9taXNlfSBBIFByb21pc2Ugb2JqZWN0IHJlcHJlc2VudHMgdGhlIHtudW1iZXJ9XG4gKi9cbmV4cG9ydCBjb25zdCBmZXRjaEJhdGNoZXNDb3VudCA9IGFzeW5jIChhZGRyZXNzID0gJycsIGNvbmZpZyA9IHt9KSA9PiB7XG5cbiAgICBleHBlY3QuYWxsKHsgYWRkcmVzcyB9LCB7XG4gICAgICAgICdhZGRyZXNzJzoge1xuICAgICAgICAgICAgdHlwZTogJ2FkZHJlc3MnXG4gICAgICAgIH1cbiAgICB9KTtcblxuICAgIGV4cGVjdC5hbGwoY29uZmlnLCB7XG4gICAgICAgICd3ZWIzJzoge1xuICAgICAgICAgICAgdHlwZTogJ29iamVjdCcsXG4gICAgICAgICAgICBjb2RlOiBXRUIzX1JFUVVJUkVEXG4gICAgICAgIH0sXG4gICAgICAgICdjb250cmFjdHMuRGF0YXNldC5hYmknOiB7XG4gICAgICAgICAgICB0eXBlOiAnb2JqZWN0JyxcbiAgICAgICAgICAgIGNvZGU6IENPTlRSQUNUX1JFUVVJUkVELFxuICAgICAgICAgICAgYXJnczogWydEYXRhc2V0J11cbiAgICAgICAgfVxuICAgIH0pO1xuXG4gICAgY29uc3QgZGF0ID0gbmV3IGNvbmZpZy53ZWIzLmV0aC5Db250cmFjdChjb25maWcuY29udHJhY3RzLkRhdGFzZXQuYWJpLCBhZGRyZXNzKTtcbiAgICBjb25zdCBiYXRjaGVzQ291bnQgPSBhd2FpdCBkYXQubWV0aG9kc1xuICAgICAgICAuYmF0Y2hlc0NvdW50KClcbiAgICAgICAgLmNhbGwoKTtcbiAgICAgICAgXG4gICAgcmV0dXJuIE51bWJlci5wYXJzZUludChiYXRjaGVzQ291bnQsIDEwKTtcbn07XG5cbi8qKlxuICogR2V0IGRlc2NyaXB0aW9uIGZyb20gRGF0YXNldCBjb250cmFjdCBieSB0aGUgZGF0YXNldCBhZGRyZXNzXG4gKiBcbiAqIEBwYXJhbSB7c3RyaW5nfSBhZGRyZXNzXG4gKiBAcGFyYW0ge09iamVjdH0gY29uZmlnIExpYnJhcnkgY29uZmlnIChwcm92aWRlZCBieSB0aGUgcHJveHkgYnV0IGNhbiBiZSBvdmVycmlkZGVuKVxuICogQHJldHVybnMge1Byb21pc2V9IEEgUHJvbWlzZSBvYmplY3QgcmVwcmVzZW50cyB0aGUge251bWJlcn1cbiAqL1xuZXhwb3J0IGNvbnN0IGZldGNoRGVzY3JpcHRpb24gPSBhc3luYyAoYWRkcmVzcyA9ICcnLCBjb25maWcgPSB7fSkgPT4ge1xuXG4gICAgZXhwZWN0LmFsbCh7IGFkZHJlc3MgfSwge1xuICAgICAgICAnYWRkcmVzcyc6IHtcbiAgICAgICAgICAgIHR5cGU6ICdhZGRyZXNzJ1xuICAgICAgICB9XG4gICAgfSk7XG5cbiAgICBleHBlY3QuYWxsKGNvbmZpZywge1xuICAgICAgICAnd2ViMyc6IHtcbiAgICAgICAgICAgIHR5cGU6ICdvYmplY3QnLFxuICAgICAgICAgICAgY29kZTogV0VCM19SRVFVSVJFRFxuICAgICAgICB9LFxuICAgICAgICAnY29udHJhY3RzLkRhdGFzZXQuYWJpJzoge1xuICAgICAgICAgICAgdHlwZTogJ29iamVjdCcsXG4gICAgICAgICAgICBjb2RlOiBDT05UUkFDVF9SRVFVSVJFRCxcbiAgICAgICAgICAgIGFyZ3M6IFsnRGF0YXNldCddXG4gICAgICAgIH1cbiAgICB9KTtcblxuICAgIGNvbnN0IGRhdCA9IG5ldyBjb25maWcud2ViMy5ldGguQ29udHJhY3QoY29uZmlnLmNvbnRyYWN0cy5EYXRhc2V0LmFiaSwgYWRkcmVzcyk7XG4gICAgY29uc3QgZGVzY3JpcHRpb24gPSBhd2FpdCBkYXQubWV0aG9kc1xuICAgICAgICAuZGVzY3JpcHRpb24oKVxuICAgICAgICAuY2FsbCgpO1xuXG4gICAgcmV0dXJuIGNvbmZpZy53ZWIzLnV0aWxzLmhleFRvVXRmOChkZXNjcmlwdGlvbik7XG59O1xuXG4vKipcbiAqIEdldCBtZXRhZGF0YSBmcm9tIERhdGFzZXQgY29udHJhY3QgYnkgdGhlIGRhdGFzZXQgYWRkcmVzc1xuICogXG4gKiBAcGFyYW0ge3N0cmluZ30gYWRkcmVzc1xuICogQHBhcmFtIHtPYmplY3R9IGNvbmZpZyBMaWJyYXJ5IGNvbmZpZyAocHJvdmlkZWQgYnkgdGhlIHByb3h5IGJ1dCBjYW4gYmUgb3ZlcnJpZGRlbilcbiAqIEByZXR1cm5zIHtQcm9taXNlfSBBIFByb21pc2Ugb2JqZWN0IHJlcHJlc2VudHMgdGhlIHtudW1iZXJ9XG4gKi9cbmV4cG9ydCBjb25zdCBmZXRjaE1ldGFkYXRhID0gYXN5bmMgKGFkZHJlc3MgPSAnJywgY29uZmlnID0ge30pID0+IHtcblxuICAgIGV4cGVjdC5hbGwoeyBhZGRyZXNzIH0sIHtcbiAgICAgICAgJ2FkZHJlc3MnOiB7XG4gICAgICAgICAgICB0eXBlOiAnYWRkcmVzcydcbiAgICAgICAgfVxuICAgIH0pO1xuXG4gICAgZXhwZWN0LmFsbChjb25maWcsIHtcbiAgICAgICAgJ3dlYjMnOiB7XG4gICAgICAgICAgICB0eXBlOiAnb2JqZWN0JyxcbiAgICAgICAgICAgIGNvZGU6IFdFQjNfUkVRVUlSRURcbiAgICAgICAgfSxcbiAgICAgICAgJ2NvbnRyYWN0cy5EYXRhc2V0LmFiaSc6IHtcbiAgICAgICAgICAgIHR5cGU6ICdvYmplY3QnLFxuICAgICAgICAgICAgY29kZTogQ09OVFJBQ1RfUkVRVUlSRUQsXG4gICAgICAgICAgICBhcmdzOiBbJ0RhdGFzZXQnXVxuICAgICAgICB9XG4gICAgfSk7XG5cbiAgICBjb25zdCBkYXQgPSBuZXcgY29uZmlnLndlYjMuZXRoLkNvbnRyYWN0KGNvbmZpZy5jb250cmFjdHMuRGF0YXNldC5hYmksIGFkZHJlc3MpO1xuICAgIGNvbnN0IG1ldGFkYXRhID0gYXdhaXQgZGF0Lm1ldGhvZHNcbiAgICAgICAgLm1ldGFkYXRhKClcbiAgICAgICAgLmNhbGwoKTtcblxuICAgIHJldHVybiBjb25maWcud2ViMy51dGlscy5oZXhUb1V0ZjgobWV0YWRhdGEpO1xufTtcblxuLyoqXG4gKiBHZXQgZGF0YXNldCBieSB0aGUgZGF0YXNldCBhZGRyZXNzXG4gKiBcbiAqIEBwYXJhbSB7c3RyaW5nfSBhZGRyZXNzXG4gKiBAcGFyYW0ge09iamVjdH0gY29uZmlnIExpYnJhcnkgY29uZmlnIChwcm92aWRlZCBieSB0aGUgcHJveHkgYnV0IGNhbiBiZSBvdmVycmlkZGVuKVxuICogQHJldHVybnMge1Byb21pc2V9IFByb21pc2Ugb2JqZWN0IHJlcHJlc2VudHMgdGhlIHtPYmplY3RbXX1cbiAqL1xuZXhwb3J0IGNvbnN0IGZldGNoRGF0YXNldCA9IGFzeW5jIChhZGRyZXNzID0gJycsIGNvbmZpZyA9IHt9KSA9PiB7XG5cbiAgICBleHBlY3QuYWxsKHsgYWRkcmVzcyB9LCB7XG4gICAgICAgICdhZGRyZXNzJzoge1xuICAgICAgICAgICAgdHlwZTogJ2FkZHJlc3MnXG4gICAgICAgIH1cbiAgICB9KTtcblxuICAgIGNvbnN0IFtcbiAgICAgICAgaXBmc0FkZHJlc3MsXG4gICAgICAgIGRhdGFEaW0sXG4gICAgICAgIGN1cnJlbnRQcmljZSxcbiAgICAgICAgYmF0Y2hlc0NvdW50LFxuICAgICAgICBtZXRhZGF0YSwgXG4gICAgICAgIGRlc2NyaXB0aW9uXG4gICAgXSA9IGF3YWl0IFByb21pc2UuYWxsKFtcbiAgICAgICAgZmV0Y2hJcGZzQWRkcmVzcyhhZGRyZXNzLCBjb25maWcpLFxuICAgICAgICBmZXRjaERhdGFEaW0oYWRkcmVzcywgY29uZmlnKSxcbiAgICAgICAgZmV0Y2hDdXJyZW50UHJpY2UoYWRkcmVzcywgY29uZmlnKSxcbiAgICAgICAgZmV0Y2hCYXRjaGVzQ291bnQoYWRkcmVzcywgY29uZmlnKSxcbiAgICAgICAgZmV0Y2hNZXRhZGF0YShhZGRyZXNzLCBjb25maWcpLFxuICAgICAgICBmZXRjaERlc2NyaXB0aW9uKGFkZHJlc3MsIGNvbmZpZylcbiAgICBdKTtcblxuICAgIHJldHVybiB7XG4gICAgICAgIGFkZHJlc3MsXG4gICAgICAgIGlwZnNBZGRyZXNzLFxuICAgICAgICBkYXRhRGltLFxuICAgICAgICBjdXJyZW50UHJpY2UsXG4gICAgICAgIGJhdGNoZXNDb3VudCxcbiAgICAgICAgbWV0YWRhdGEsXG4gICAgICAgIGRlc2NyaXB0aW9uXG4gICAgfTtcbn07XG5cbi8qKlxuICogR2V0IGRhdGFzZXQgYnkgaWRcbiAqIFxuICogQHBhcmFtIHtudW1iZXJ9IGlkIFxuICogQHBhcmFtIHtPYmplY3R9IGNvbmZpZyBMaWJyYXJ5IGNvbmZpZyAocHJvdmlkZWQgYnkgdGhlIHByb3h5IGJ1dCBjYW4gYmUgb3ZlcnJpZGRlbilcbiAqIEByZXR1cm5zIHtQcm9taXNlfSBBIFByb21pc2Ugb2JqZWN0IHJlcHJlc2VudHMgdGhlIHtPYmplY3R9XG4gKi9cbmV4cG9ydCBjb25zdCBmZXRjaERhdGFzZXRCeUlkID0gYXN5bmMgKGlkLCBjb25maWcgPSB7fSkgPT4ge1xuXG4gICAgY29uc3QgYWRkcmVzcyA9IGF3YWl0IGZldGNoQWRkcmVzc0J5SWQoaWQsIGNvbmZpZyk7XG4gICAgY29uc3QgZGF0YXNldCA9IGF3YWl0IGZldGNoRGF0YXNldChhZGRyZXNzLCBjb25maWcpO1xuXG4gICAgcmV0dXJuIGRhdGFzZXQ7XG59O1xuXG4vKipcbiAqIEdldCBhbGwgZGF0YXNldHNcbiAqIFxuICogQHBhcmFtIHtPYmplY3R9IGNvbmZpZyBMaWJyYXJ5IGNvbmZpZyAocHJvdmlkZWQgYnkgdGhlIHByb3h5IGJ1dCBjYW4gYmUgb3ZlcnJpZGRlbilcbiAqIEByZXR1cm5zIHtQcm9taXNlfSBQcm9taXNlIG9iamVjdCByZXByZXNlbnRzIHRoZSB7T2JqZWN0W119XG4gKi9cbmV4cG9ydCBjb25zdCBmZXRjaEFsbCA9IGFzeW5jIChjb25maWcgPSB7fSkgPT4ge1xuXG4gICAgbGV0IHJlY29yZHMgPSBbXTtcbiAgICBsZXQgZXJyb3IgPSBbXTtcblxuICAgIHRyeSB7XG5cbiAgICAgICAgY29uc3QgY291bnQgPSBhd2FpdCBmZXRjaENvdW50KGNvbmZpZyk7XG5cbiAgICAgICAgZm9yIChsZXQgaT0wOyBpIDwgY291bnQ7IGkrKykge1xuICAgICAgICAgICAgXG4gICAgICAgICAgICB0cnkge1xuXG4gICAgICAgICAgICAgICAgY29uc3QgZGF0YXNldCA9IGF3YWl0IGZldGNoRGF0YXNldEJ5SWQoaSwgY29uZmlnKTtcblxuICAgICAgICAgICAgICAgIHJlY29yZHMucHVzaCh7XG4gICAgICAgICAgICAgICAgICAgIGlkOiBpLFxuICAgICAgICAgICAgICAgICAgICAuLi5kYXRhc2V0XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9IGNhdGNoKGVycikge1xuICAgICAgICAgICAgICAgIGVycm9yLnB1c2goe1xuICAgICAgICAgICAgICAgICAgICBpZDogaSxcbiAgICAgICAgICAgICAgICAgICAgbWVzc2FnZTogZXJyLm1lc3NhZ2VcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH0gICAgICAgIFxuICAgICAgICB9XG4gICAgfSBjYXRjaChlcnIpIHtcbiAgICAgICAgZXJyb3IucHVzaCh7XG4gICAgICAgICAgICBlcnJvcjogZXJyLm1lc3NhZ2VcbiAgICAgICAgfSk7XG4gICAgfSAgIFxuXG4gICAgcmV0dXJuIHtcbiAgICAgICAgcmVjb3JkcyxcbiAgICAgICAgZXJyb3JcbiAgICB9O1xufTtcblxuLyoqXG4gKiBEZXBsb3kgRGF0c2V0IGNvbnRyYWN0IHRvIHRoZSBuZXR3b3JrXG4gKiBcbiAqIEBwYXJhbSB7U3RyaW5nfSBkYXRhc2V0SXBmc0hhc2ggXG4gKiBAcGFyYW0ge051bWJlcn0gYmF0Y2hlc0NvdW50IENvdW50IG9mIGJhdGNoZXMgaW4gZGF0YXNldFxuICogQHBhcmFtIHtPYmplY3R9IG9wdGlvbnMgeyBkaW1lbnNpb24sIHByaWNlLCBtZXRhZGF0YSwgZGVzY3JpcHRpb24gfSBcbiAqIEBwYXJhbSB7U3RyaW5nfSBwdWJsaXNoZXIgUHVibGlzaGVyIGFkZHJlc3NcbiAqIEBwYXJhbSB7T2JqZWN0fSBjb25maWcgTGlicmFyeSBjb25maWcgKHByb3ZpZGVkIGJ5IHRoZSBwcm94eSBidXQgY2FuIGJlIG92ZXJyaWRkZW4pXG4gKiBAcmV0dXJucyB7UHJvbWlzZX0gUHJvbWlzZSBvYmplY3QgcmVzb2x2ZWQgdG8gY29udHJhY3QgYWRkcmVzc1xuICovXG5leHBvcnQgY29uc3QgZGVwbG95ID0gYXN5bmMgKGRhdGFzZXRJcGZzSGFzaCwgYmF0Y2hlc0NvdW50LCB7IGRpbWVuc2lvbiwgcHJpY2UsIG1ldGFkYXRhLCBkZXNjcmlwdGlvbiB9LCBwdWJsaXNoZXIsIGNvbmZpZyA9IHt9KSA9PiB7XG5cbiAgICBleHBlY3QuYWxsKHsgZGF0YXNldElwZnNIYXNoLCBiYXRjaGVzQ291bnQsIHB1Ymxpc2hlciwgZGltZW5zaW9uLCBwcmljZSwgbWV0YWRhdGEsIGRlc2NyaXB0aW9uIH0sIHtcbiAgICAgICAgJ2RhdGFzZXRJcGZzSGFzaCc6IHtcbiAgICAgICAgICAgIHR5cGU6ICdzdHJpbmcnXG4gICAgICAgIH0sXG4gICAgICAgICdiYXRjaGVzQ291bnQnOiB7XG4gICAgICAgICAgICB0eXBlOiAnbnVtYmVyJ1xuICAgICAgICB9LFxuICAgICAgICAncHVibGlzaGVyJzoge1xuICAgICAgICAgICAgdHlwZTogJ2FkZHJlc3MnXG4gICAgICAgIH0sXG4gICAgICAgICdkaW1lbnNpb24nOiB7XG4gICAgICAgICAgICB0eXBlOiAnbnVtYmVyJ1xuICAgICAgICB9LFxuICAgICAgICAncHJpY2UnOiB7XG4gICAgICAgICAgICB0eXBlOiAnbnVtYmVyJ1xuICAgICAgICB9LFxuICAgICAgICAnbWV0YWRhdGEnOiB7XG4gICAgICAgICAgICB0eXBlOiAnc3RyaW5nJ1xuICAgICAgICB9LFxuICAgICAgICAnZGVzY3JpcHRpb24nOiB7XG4gICAgICAgICAgICB0eXBlOiAnc3RyaW5nJ1xuICAgICAgICB9ICAgICAgICBcbiAgICB9KTtcblxuICAgIGV4cGVjdC5hbGwoY29uZmlnLCB7XG4gICAgICAgICd3ZWIzJzoge1xuICAgICAgICAgICAgdHlwZTogJ29iamVjdCcsXG4gICAgICAgICAgICBjb2RlOiBXRUIzX1JFUVVJUkVEXG4gICAgICAgIH0sXG4gICAgICAgICdjb250cmFjdHMuRGF0YXNldCc6IHtcbiAgICAgICAgICAgIHR5cGU6ICdvYmplY3QnLFxuICAgICAgICAgICAgY29kZTogQ09OVFJBQ1RfUkVRVUlSRUQsXG4gICAgICAgICAgICBhcmdzOiBbJ0RhdGFzZXQnXVxuICAgICAgICB9LFxuICAgICAgICAnd2ViMy5jdXJyZW50UHJvdmlkZXIuaXNNZXRhTWFzayc6IHtcbiAgICAgICAgICAgIHR5cGU6ICdib29sZWFuJyxcbiAgICAgICAgICAgIGNvZGU6IFdFQjNfTUVUQU1BU0tfUkVRVUlSRURcbiAgICAgICAgfVxuICAgIH0pO1xuXG4gICAgY29uc3QgYXJncyA9IFtcbiAgICAgICAgY29uZmlnLndlYjMudXRpbHMudXRmOFRvSGV4KGRhdGFzZXRJcGZzSGFzaCksIFxuICAgICAgICBkaW1lbnNpb24sIFxuICAgICAgICBiYXRjaGVzQ291bnQsIFxuICAgICAgICBwcmljZSwgXG4gICAgICAgIGNvbmZpZy53ZWIzLnV0aWxzLnV0ZjhUb0hleChtZXRhZGF0YSksXG4gICAgICAgIGNvbmZpZy53ZWIzLnV0aWxzLnV0ZjhUb0hleChkZXNjcmlwdGlvbilcbiAgICBdO1xuICAgICAgICBcbiAgICAvLyBFc3RpbWF0ZSByZXF1aXJlZCBhbW91bnQgb2YgZ2FzXG4gICAgY29uc3QgZ2FzID0gYXdhaXQgd2ViM0hlbHBlcnMuZXN0aW1hdGVHYXMoY29uZmlnLmNvbnRyYWN0cy5EYXRhc2V0LmJ5dGVjb2RlLCBhcmdzLCBjb25maWcpO1xuXG4gICAgLy8gQ3JlYXRlIGFuZCBkZXBsb3kgZGF0YXNldCBjb250cmFjdFxuICAgIGNvbnN0IGRhdGFzZXRDb250cmFjdEFkZHJlc3MgPSBhd2FpdCB3ZWIzSGVscGVycy5kZXBsb3lDb250cmFjdChjb25maWcuY29udHJhY3RzLkRhdGFzZXQsIHtcbiAgICAgICAgYXJncyxcbiAgICAgICAgZnJvbTogcHVibGlzaGVyLFxuICAgICAgICBnYXM6IE51bWJlci5wYXJzZUludChnYXMgKiAxLjUsIDEwKVxuICAgIH0sIGNvbmZpZyk7XG5cbiAgICByZXR1cm4gZGF0YXNldENvbnRyYWN0QWRkcmVzcztcbn07XG5cbi8qKlxuICogQWRkIGRhdGFzZXQgdG8gbWFya2V0XG4gKiBcbiAqIEBwYXJhbSB7U3RyaW5nfSBkYXRhc2V0Q29udHJhY3RBZGRyZXNzIFxuICogQHBhcmFtIHtTdHJpbmd9IHB1Ymxpc2hlckFkZHJlc3MgXG4gKiBAcGFyYW0ge09iamVjdH0gY29uZmlnIExpYnJhcnkgY29uZmlnIChwcm92aWRlZCBieSB0aGUgcHJveHkgYnV0IGNhbiBiZSBvdmVycmlkZGVuKVxuICogQHJldHVybnMge1Byb21pc2V9IFByb21pc2Ugb2JqZWN0IHJlc29sdmVkIHRvIHtzdHJpbmd9IGNvbnRyYWN0QWRkcmVzc1xuICovXG5leHBvcnQgY29uc3QgYWRkVG9NYXJrZXQgPSAoZGF0YXNldENvbnRyYWN0QWRkcmVzcywgcHVibGlzaGVyQWRkcmVzcywgY29uZmlnID0ge30pID0+IG5ldyBQcm9taXNlKGFzeW5jIChyZXNvbHZlLCByZWplY3QpID0+IHtcblxuICAgIGV4cGVjdC5hbGwoeyBkYXRhc2V0Q29udHJhY3RBZGRyZXNzLCBwdWJsaXNoZXJBZGRyZXNzIH0sIHtcbiAgICAgICAgJ2RhdGFzZXRDb250cmFjdEFkZHJlc3MnOiB7XG4gICAgICAgICAgICB0eXBlOiAnYWRkcmVzcydcbiAgICAgICAgfSxcbiAgICAgICAgJ3B1Ymxpc2hlckFkZHJlc3MnOiB7XG4gICAgICAgICAgICB0eXBlOiAnYWRkcmVzcydcbiAgICAgICAgfVxuICAgIH0pO1xuXG4gICAgZXhwZWN0LmFsbChjb25maWcsIHtcbiAgICAgICAgJ3dlYjMnOiB7XG4gICAgICAgICAgICB0eXBlOiAnb2JqZWN0JyxcbiAgICAgICAgICAgIGNvZGU6IFdFQjNfUkVRVUlSRURcbiAgICAgICAgfSxcbiAgICAgICAgJ2NvbnRyYWN0cy5QYW5kb3JhTWFya2V0LmFiaSc6IHtcbiAgICAgICAgICAgIHR5cGU6ICdvYmplY3QnLFxuICAgICAgICAgICAgY29kZTogQ09OVFJBQ1RfUkVRVUlSRUQsXG4gICAgICAgICAgICBhcmdzOiBbJ1BhbmRvcmFNYXJrZXQnXVxuICAgICAgICB9LFxuICAgICAgICAnYWRkcmVzc2VzLlBhbmRvcmFNYXJrZXQnOiB7XG4gICAgICAgICAgICB0eXBlOiAnYWRkcmVzcycsXG4gICAgICAgICAgICBjb2RlOiBBRERSRVNTX1JFUVVJUkVELFxuICAgICAgICAgICAgYXJnczogWydNYXJrZXQnXVxuICAgICAgICB9LFxuICAgICAgICAnd2ViMy5jdXJyZW50UHJvdmlkZXIuaXNNZXRhTWFzayc6IHtcbiAgICAgICAgICAgIHR5cGU6ICdib29sZWFuJyxcbiAgICAgICAgICAgIGNvZGU6IFdFQjNfTUVUQU1BU0tfUkVRVUlSRURcbiAgICAgICAgfVxuICAgIH0pO1xuXG4gICAgY29uc3QgbWFya2V0ID0gbmV3IGNvbmZpZy53ZWIzLmV0aC5Db250cmFjdChjb25maWcuY29udHJhY3RzLlBhbmRvcmFNYXJrZXQuYWJpLCBjb25maWcuYWRkcmVzc2VzLlBhbmRvcmFNYXJrZXQpO1xuICAgIGNvbnN0IGdhc1ByaWNlID0gYXdhaXQgY29uZmlnLndlYjMuZXRoLmdldEdhc1ByaWNlKCk7XG4gICAgbWFya2V0Lm1ldGhvZHNcbiAgICAgICAgLmFkZERhdGFzZXQoZGF0YXNldENvbnRyYWN0QWRkcmVzcylcbiAgICAgICAgLnNlbmQoe1xuICAgICAgICAgICAgZnJvbTogcHVibGlzaGVyQWRkcmVzcyxcbiAgICAgICAgICAgIGdhc1ByaWNlXG4gICAgICAgIH0pXG4gICAgICAgIC5vbignZXJyb3InLCByZWplY3QpXG4gICAgICAgIC5vbigncmVjZWlwdCcsIHJlY2VpcHQgPT4ge1xuXG4gICAgICAgICAgICBpZiAoTnVtYmVyKHJlY2VpcHQuc3RhdHVzKSA9PT0gMCkge1xuXG4gICAgICAgICAgICAgICAgcmV0dXJuIHJlamVjdChwanNFcnJvcihUUkFOU0FDVElPTl9VTlNVQ0NFU1NGVUwpKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgcmVzb2x2ZShyZWNlaXB0LmNvbnRyYWN0QWRkcmVzcyB8fCByZWNlaXB0LmV2ZW50cy5EYXRhc2V0QWRkZWQucmV0dXJuVmFsdWVzLmRhdGFzZXQpO1xuICAgICAgICB9KTtcbiAgICAvLyBAbm90ZSBJbiBjYXNlIG9mIGdhbmFjaGUtY2xpIGJsb2NrY2hhaW4gXCJjb250cmFjdEFkZHJlc3NcIiBhbHdheXMgd2lsbCBiZSBlcXVhbCB0byBudWxsXG59KTtcblxuLyoqXG4gKiBSZW1vdmUgZGF0YXNldCBmcm9tIFBhbmRvcmFNYXJrZXRcbiAqIFxuICogQHBhcmFtIHtTdHJpbmd9IGRhdGFzZXRBZGRyZXNzXG4gKiBAcGFyYW0ge1N0cmluZ30gcHVibGlzaGVyQWRkcmVzcyBcbiAqIEBwYXJhbSB7T2JqZWN0fSBjb25maWcgTGlicmFyeSBjb25maWcgKHByb3ZpZGVkIGJ5IHRoZSBwcm94eSBidXQgY2FuIGJlIG92ZXJyaWRkZW4pIFxuICovXG5leHBvcnQgY29uc3QgcmVtb3ZlRGF0YXNldCA9IChkYXRhc2V0QWRkcmVzcywgcHVibGlzaGVyQWRkcmVzcywgY29uZmlnID0ge30pID0+IG5ldyBQcm9taXNlKGFzeW5jIChyZXNvbHZlLCByZWplY3QpID0+IHtcblxuICAgIGV4cGVjdC5hbGwoeyBkYXRhc2V0QWRkcmVzcywgcHVibGlzaGVyQWRkcmVzcyB9LCB7XG4gICAgICAgICdkYXRhc2V0QWRkcmVzcyc6IHtcbiAgICAgICAgICAgIHR5cGU6ICdhZGRyZXNzJ1xuICAgICAgICB9LFxuICAgICAgICAncHVibGlzaGVyQWRkcmVzcyc6IHtcbiAgICAgICAgICAgIHR5cGU6ICdhZGRyZXNzJ1xuICAgICAgICB9XG4gICAgfSk7XG5cbiAgICBleHBlY3QuYWxsKGNvbmZpZywge1xuICAgICAgICAnd2ViMyc6IHtcbiAgICAgICAgICAgIHR5cGU6ICdvYmplY3QnLFxuICAgICAgICAgICAgY29kZTogV0VCM19SRVFVSVJFRFxuICAgICAgICB9LFxuICAgICAgICAnY29udHJhY3RzLlBhbmRvcmFNYXJrZXQuYWJpJzoge1xuICAgICAgICAgICAgdHlwZTogJ29iamVjdCcsXG4gICAgICAgICAgICBjb2RlOiBDT05UUkFDVF9SRVFVSVJFRCxcbiAgICAgICAgICAgIGFyZ3M6IFsnUGFuZG9yYU1hcmtldCddXG4gICAgICAgIH0sXG4gICAgICAgICdhZGRyZXNzZXMuUGFuZG9yYU1hcmtldCc6IHtcbiAgICAgICAgICAgIHR5cGU6ICdhZGRyZXNzJyxcbiAgICAgICAgICAgIGNvZGU6IEFERFJFU1NfUkVRVUlSRUQsXG4gICAgICAgICAgICBhcmdzOiBbJ1BhbmRvcmFNYXJrZXQnXVxuICAgICAgICB9XG4gICAgfSk7XG5cbiAgICBjb25zdCBtYXJrZXQgPSBuZXcgY29uZmlnLndlYjMuZXRoLkNvbnRyYWN0KGNvbmZpZy5jb250cmFjdHMuUGFuZG9yYU1hcmtldC5hYmksIGNvbmZpZy5hZGRyZXNzZXMuUGFuZG9yYU1hcmtldCk7XG4gICAgY29uc3QgZ2FzUHJpY2UgPSBhd2FpdCBjb25maWcud2ViMy5ldGguZ2V0R2FzUHJpY2UoKTtcbiAgICBtYXJrZXQubWV0aG9kc1xuICAgICAgICAucmVtb3ZlRGF0YXNldChkYXRhc2V0QWRkcmVzcylcbiAgICAgICAgLnNlbmQoe1xuICAgICAgICAgICAgZnJvbTogcHVibGlzaGVyQWRkcmVzcyxcbiAgICAgICAgICAgIGdhc1ByaWNlXG4gICAgICAgIH0pXG4gICAgICAgIC5vbignZXJyb3InLCByZWplY3QpXG4gICAgICAgIC5vbigncmVjZWlwdCcsIHJlY2VpcHQgPT4ge1xuXG4gICAgICAgICAgICBpZiAoTnVtYmVyKHJlY2VpcHQuc3RhdHVzKSA9PT0gMCkge1xuXG4gICAgICAgICAgICAgICAgcmV0dXJuIHJlamVjdChwanNFcnJvcihUUkFOU0FDVElPTl9VTlNVQ0NFU1NGVUwpKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgcmVzb2x2ZShyZWNlaXB0LmNvbnRyYWN0QWRkcmVzcyk7XG4gICAgICAgIH0pO1xufSk7XG5cbi8qKlxuICogSGFuZGxlIGV2ZW50IERhdGFzZXRBZGRlZFxuICogXG4gKiBAcGFyYW0ge09iamVjdH0gb3B0aW9ucyBFdmVudCBoYW5kbGVyIG9wdGlvbnNcbiAqIEBwYXJhbSB7T2JqZWN0fSBjb25maWcgTGlicmFyeSBjb25maWcgKHByb3ZpZGVkIGJ5IHRoZSBwcm94eSBidXQgY2FuIGJlIG92ZXJyaWRkZW4pXG4gKiBAcmV0dXJucyB7T2JqZWN0fSBPYmplY3Qgd2l0aCBjaGFpbmVkIGNhbGxiYWNrcyAjZGF0YSBhbmQgI2Vycm9yXG4gKi9cbmV4cG9ydCBjb25zdCBldmVudERhdGFzZXRBZGRlZCA9IChvcHRpb25zID0ge30sIGNvbmZpZyA9IHt9KSA9PiB7XG5cbiAgICBleHBlY3QuYWxsKHsgb3B0aW9ucyB9LCB7XG4gICAgICAgICdvcHRpb25zJzoge1xuICAgICAgICAgICAgdHlwZTogJ29iamVjdCdcbiAgICAgICAgfVxuICAgIH0pO1xuXG4gICAgZXhwZWN0LmFsbChjb25maWcsIHtcbiAgICAgICAgJ3dlYjMnOiB7XG4gICAgICAgICAgICB0eXBlOiAnb2JqZWN0JyxcbiAgICAgICAgICAgIGNvZGU6IFdFQjNfUkVRVUlSRURcbiAgICAgICAgfSxcbiAgICAgICAgJ2NvbnRyYWN0cy5QYW5kb3JhTWFya2V0LmFiaSc6IHtcbiAgICAgICAgICAgIHR5cGU6ICdvYmplY3QnLFxuICAgICAgICAgICAgY29kZTogQ09OVFJBQ1RfUkVRVUlSRUQsXG4gICAgICAgICAgICBhcmdzOiBbJ1BhbmRvcmFNYXJrZXQnXVxuICAgICAgICB9LFxuICAgICAgICAnYWRkcmVzc2VzLlBhbmRvcmFNYXJrZXQnOiB7XG4gICAgICAgICAgICB0eXBlOiAnYWRkcmVzcycsXG4gICAgICAgICAgICBjb2RlOiBBRERSRVNTX1JFUVVJUkVELFxuICAgICAgICAgICAgYXJnczogWydNYXJrZXQnXVxuICAgICAgICB9XG4gICAgfSk7XG5cbiAgICBjb25zdCBjYWxsYmFja3MgPSB7XG4gICAgICAgIG9uRGF0YTogKCkgPT4ge30sXG4gICAgICAgIG9uRXJyb3I6ICgpID0+IHt9XG4gICAgfTtcblxuICAgIGNvbnN0IGNoYWluID0ge1xuICAgICAgICBkYXRhOiAoY2IgPSAoKSA9PiB7fSkgPT4ge1xuICAgICAgICAgICAgY2FsbGJhY2tzLm9uRGF0YSA9IGNiO1xuICAgICAgICAgICAgcmV0dXJuIGNoYWluO1xuICAgICAgICB9LFxuICAgICAgICBlcnJvcjogKGNiID0gKCkgPT4ge30pID0+IHtcbiAgICAgICAgICAgIGNhbGxiYWNrcy5vbkVycm9yID0gY2I7XG4gICAgICAgICAgICByZXR1cm4gY2hhaW47XG4gICAgICAgIH1cbiAgICB9O1xuXG4gICAgY29uc3QgbWFyID0gbmV3IGNvbmZpZy53ZWIzLmV0aC5Db250cmFjdChjb25maWcuY29udHJhY3RzLlBhbmRvcmFNYXJrZXQuYWJpLCBjb25maWcuYWRkcmVzc2VzLlBhbmRvcmFNYXJrZXQpO1xuICAgIGNoYWluLmV2ZW50ID0gbWFyLmV2ZW50cy5EYXRhc2V0QWRkZWQob3B0aW9ucylcbiAgICAgICAgLm9uKCdkYXRhJywgYXN5bmMgZXZlbnQgPT4ge1xuXG4gICAgICAgICAgICB0cnkge1xuXG4gICAgICAgICAgICAgICAgY29uc3QgZGF0YXNldCA9IGF3YWl0IGZldGNoRGF0YXNldChldmVudC5yZXR1cm5WYWx1ZXMuZGF0YXNldCwgY29uZmlnKTtcbiAgICAgICAgICAgICAgICBjYWxsYmFja3Mub25EYXRhKHtcbiAgICAgICAgICAgICAgICAgICAgcmVjb3JkczogW2RhdGFzZXRdLFxuICAgICAgICAgICAgICAgICAgICBldmVudFxuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfSBjYXRjaChlcnIpIHtcbiAgICAgICAgICAgICAgICBjYWxsYmFja3Mub25FcnJvcihlcnIpO1xuICAgICAgICAgICAgfSAgICAgICAgICAgIFxuICAgICAgICB9KVxuICAgICAgICAub24oJ2Vycm9yJywgY2FsbGJhY2tzLm9uRXJyb3IpO1xuICAgIGNoYWluLmV2ZW50Lm5hbWUgPSAnRGF0YXNldEFkZGVkJztcblxuICAgIHJldHVybiBjaGFpbjtcbn07XG5cbi8qKlxuICogSGFuZGxlIGV2ZW50IERhdGFzZXRSZW1vdmVkXG4gKiBcbiAqIEBwYXJhbSB7T2JqZWN0fSBvcHRpb25zIEV2ZW50IGhhbmRsZXIgb3B0aW9uc1xuICogQHBhcmFtIHtPYmplY3R9IGNvbmZpZyBMaWJyYXJ5IGNvbmZpZyAocHJvdmlkZWQgYnkgdGhlIHByb3h5IGJ1dCBjYW4gYmUgb3ZlcnJpZGRlbilcbiAqIEByZXR1cm5zIHtPYmplY3R9IE9iamVjdCB3aXRoIGNoYWluZWQgY2FsbGJhY2tzICNkYXRhIGFuZCAjZXJyb3JcbiAqL1xuZXhwb3J0IGNvbnN0IGV2ZW50RGF0YXNldFJlbW92ZWQgPSAob3B0aW9ucyA9IHt9LCBjb25maWcgPSB7fSkgPT4ge1xuXG4gICAgZXhwZWN0LmFsbCh7IG9wdGlvbnMgfSwge1xuICAgICAgICAnb3B0aW9ucyc6IHtcbiAgICAgICAgICAgIHR5cGU6ICdvYmplY3QnXG4gICAgICAgIH1cbiAgICB9KTtcblxuICAgIGV4cGVjdC5hbGwoY29uZmlnLCB7XG4gICAgICAgICd3ZWIzJzoge1xuICAgICAgICAgICAgdHlwZTogJ29iamVjdCcsXG4gICAgICAgICAgICBjb2RlOiBXRUIzX1JFUVVJUkVEXG4gICAgICAgIH0sXG4gICAgICAgICdjb250cmFjdHMuUGFuZG9yYU1hcmtldC5hYmknOiB7XG4gICAgICAgICAgICB0eXBlOiAnb2JqZWN0JyxcbiAgICAgICAgICAgIGNvZGU6IENPTlRSQUNUX1JFUVVJUkVELFxuICAgICAgICAgICAgYXJnczogWydQYW5kb3JhTWFya2V0J11cbiAgICAgICAgfSxcbiAgICAgICAgJ2FkZHJlc3Nlcy5QYW5kb3JhTWFya2V0Jzoge1xuICAgICAgICAgICAgdHlwZTogJ2FkZHJlc3MnLFxuICAgICAgICAgICAgY29kZTogQUREUkVTU19SRVFVSVJFRCxcbiAgICAgICAgICAgIGFyZ3M6IFsnUGFuZG9yYU1hcmtldCddXG4gICAgICAgIH1cbiAgICB9KTtcblxuICAgIGNvbnN0IGNhbGxiYWNrcyA9IHtcbiAgICAgICAgb25EYXRhOiAoKSA9PiB7fSxcbiAgICAgICAgb25FcnJvcjogKCkgPT4ge31cbiAgICB9O1xuXG4gICAgY29uc3QgY2hhaW4gPSB7XG4gICAgICAgIGRhdGE6IChjYiA9ICgpID0+IHt9KSA9PiB7XG4gICAgICAgICAgICBjYWxsYmFja3Mub25EYXRhID0gY2I7XG4gICAgICAgICAgICByZXR1cm4gY2hhaW47XG4gICAgICAgIH0sXG4gICAgICAgIGVycm9yOiAoY2IgPSAoKSA9PiB7fSkgPT4ge1xuICAgICAgICAgICAgY2FsbGJhY2tzLm9uRXJyb3IgPSBjYjtcbiAgICAgICAgICAgIHJldHVybiBjaGFpbjtcbiAgICAgICAgfVxuICAgIH07XG5cbiAgICBjb25zdCBtYXIgPSBuZXcgY29uZmlnLndlYjMuZXRoLkNvbnRyYWN0KGNvbmZpZy5jb250cmFjdHMuUGFuZG9yYU1hcmtldC5hYmksIGNvbmZpZy5hZGRyZXNzZXMuUGFuZG9yYU1hcmtldCk7XG4gICAgY2hhaW4uZXZlbnQgPSBtYXIuZXZlbnRzLkRhdGFzZXRSZW1vdmVkKG9wdGlvbnMpXG4gICAgICAgIC5vbignZGF0YScsIGFzeW5jIGV2ZW50ID0+IHtcblxuICAgICAgICAgICAgY2FsbGJhY2tzLm9uRGF0YSh7XG4gICAgICAgICAgICAgICAgcmVjb3JkczogW3thZGRyZXNzOiBldmVudC5yZXR1cm5WYWx1ZXMuZGF0YXNldH1dLFxuICAgICAgICAgICAgICAgIGV2ZW50XG4gICAgICAgICAgICB9KTsgICAgICAgICAgICBcbiAgICAgICAgfSlcbiAgICAgICAgLm9uKCdlcnJvcicsIGNhbGxiYWNrcy5vbkVycm9yKTtcbiAgICBjaGFpbi5ldmVudC5uYW1lID0gJ0RhdGFzZXRSZW1vdmVkJztcblxuICAgIHJldHVybiBjaGFpbjtcbn07XG4iXX0=