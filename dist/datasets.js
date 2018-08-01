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
  chain.event = mar.events.DatasetAdded(options).on('data', async res => {
    try {
      const dataset = await fetchDataset(res.returnValues.dataset, config);
      callbacks.onData({
        address: res.returnValues.dataset,
        dataset,
        status: 'created',
        event: 'PandoraMarket.DatasetAdded'
      });
    } catch (err) {
      callbacks.onError(err);
    }
  }).on('error', callbacks.onError);
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
  chain.event = mar.events.DatasetRemoved(options).on('data', async res => {
    callbacks.onData({
      address: res.returnValues.dataset,
      status: 'removed',
      event: 'PandoraMarket.DatasetRemoved'
    });
  }).on('error', callbacks.onError);
  return chain;
};

exports.eventDatasetRemoved = eventDatasetRemoved;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9kYXRhc2V0cy5qcyJdLCJuYW1lcyI6WyJmZXRjaENvdW50IiwiY29uZmlnIiwiZXhwZWN0IiwiYWxsIiwidHlwZSIsImNvZGUiLCJXRUIzX1JFUVVJUkVEIiwiQ09OVFJBQ1RfUkVRVUlSRUQiLCJhcmdzIiwiQUREUkVTU19SRVFVSVJFRCIsIm1hciIsIndlYjMiLCJldGgiLCJDb250cmFjdCIsImNvbnRyYWN0cyIsIlBhbmRvcmFNYXJrZXQiLCJhYmkiLCJhZGRyZXNzZXMiLCJjb3VudCIsIm1ldGhvZHMiLCJkYXRhc2V0c0NvdW50IiwiY2FsbCIsIk51bWJlciIsInBhcnNlSW50IiwiZmV0Y2hBZGRyZXNzQnlJZCIsImlkIiwiZGF0YXNldENvbnRyYWN0IiwiZGF0YXNldHMiLCJmZXRjaElwZnNBZGRyZXNzIiwiYWRkcmVzcyIsImRhdCIsIkRhdGFzZXQiLCJpcGZzQWRkcmVzcyIsInV0aWxzIiwiaGV4VG9Bc2NpaSIsImZldGNoRGF0YURpbSIsImRhdGFEaW0iLCJmZXRjaEN1cnJlbnRQcmljZSIsImN1cnJlbnRQcmljZSIsImZldGNoQmF0Y2hlc0NvdW50IiwiYmF0Y2hlc0NvdW50IiwiZmV0Y2hEZXNjcmlwdGlvbiIsImRlc2NyaXB0aW9uIiwiaGV4VG9VdGY4IiwiZmV0Y2hNZXRhZGF0YSIsIm1ldGFkYXRhIiwiZmV0Y2hEYXRhc2V0IiwiUHJvbWlzZSIsImZldGNoRGF0YXNldEJ5SWQiLCJkYXRhc2V0IiwiZmV0Y2hBbGwiLCJyZWNvcmRzIiwiZXJyb3IiLCJpIiwicHVzaCIsImVyciIsIm1lc3NhZ2UiLCJkZXBsb3kiLCJkYXRhc2V0SXBmc0hhc2giLCJkaW1lbnNpb24iLCJwcmljZSIsInB1Ymxpc2hlciIsIldFQjNfTUVUQU1BU0tfUkVRVUlSRUQiLCJ1dGY4VG9IZXgiLCJnYXMiLCJ3ZWIzSGVscGVycyIsImVzdGltYXRlR2FzIiwiYnl0ZWNvZGUiLCJkYXRhc2V0Q29udHJhY3RBZGRyZXNzIiwiZGVwbG95Q29udHJhY3QiLCJmcm9tIiwiYWRkVG9NYXJrZXQiLCJwdWJsaXNoZXJBZGRyZXNzIiwicmVzb2x2ZSIsInJlamVjdCIsIm1hcmtldCIsImdhc1ByaWNlIiwiZ2V0R2FzUHJpY2UiLCJhZGREYXRhc2V0Iiwic2VuZCIsIm9uIiwicmVjZWlwdCIsInN0YXR1cyIsIlRSQU5TQUNUSU9OX1VOU1VDQ0VTU0ZVTCIsImNvbnRyYWN0QWRkcmVzcyIsImV2ZW50cyIsIkRhdGFzZXRBZGRlZCIsInJldHVyblZhbHVlcyIsInJlbW92ZURhdGFzZXQiLCJkYXRhc2V0QWRkcmVzcyIsImV2ZW50RGF0YXNldEFkZGVkIiwib3B0aW9ucyIsImNhbGxiYWNrcyIsIm9uRGF0YSIsIm9uRXJyb3IiLCJjaGFpbiIsImRhdGEiLCJjYiIsImV2ZW50IiwicmVzIiwiZXZlbnREYXRhc2V0UmVtb3ZlZCIsIkRhdGFzZXRSZW1vdmVkIl0sIm1hcHBpbmdzIjoiQUFBQTs7Ozs7Ozs7QUFTQTs7Ozs7OztBQUVBOztBQUNBOztBQU9BOzs7Ozs7OztBQUVBOzs7Ozs7QUFNTyxNQUFNQSxVQUFVLEdBQUcsT0FBT0MsTUFBTSxHQUFHLEVBQWhCLEtBQXVCO0FBRTdDQyxFQUFBQSxNQUFNLENBQUNDLEdBQVAsQ0FBV0YsTUFBWCxFQUFtQjtBQUNmLFlBQVE7QUFDSkcsTUFBQUEsSUFBSSxFQUFFLFFBREY7QUFFSkMsTUFBQUEsSUFBSSxFQUFFQztBQUZGLEtBRE87QUFLZixtQ0FBK0I7QUFDM0JGLE1BQUFBLElBQUksRUFBRSxRQURxQjtBQUUzQkMsTUFBQUEsSUFBSSxFQUFFRSx5QkFGcUI7QUFHM0JDLE1BQUFBLElBQUksRUFBRSxDQUFDLGVBQUQ7QUFIcUIsS0FMaEI7QUFVZiwrQkFBMkI7QUFDdkJKLE1BQUFBLElBQUksRUFBRSxTQURpQjtBQUV2QkMsTUFBQUEsSUFBSSxFQUFFSSx3QkFGaUI7QUFHdkJELE1BQUFBLElBQUksRUFBRSxDQUFDLGVBQUQ7QUFIaUI7QUFWWixHQUFuQjtBQWlCQSxRQUFNRSxHQUFHLEdBQUcsSUFBSVQsTUFBTSxDQUFDVSxJ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TUFBSixDQUFXZ0IsY0FBWCxDQUEwQlYsT0FBMUIsRUFDVFgsRUFEUyxDQUNOLE1BRE0sRUFDRSxNQUFNbUIsR0FBTixJQUFhO0FBRXJCUCxJQUFBQSxTQUFTLENBQUNDLE1BQVYsQ0FBaUI7QUFDYmhFLE1BQUFBLE9BQU8sRUFBRXNFLEdBQUcsQ0FBQ1osWUFBSixDQUFpQnRDLE9BRGI7QUFFYmlDLE1BQUFBLE1BQU0sRUFBRSxTQUZLO0FBR2JnQixNQUFBQSxLQUFLLEVBQUU7QUFITSxLQUFqQjtBQUtILEdBUlMsRUFTVGxCLEVBVFMsQ0FTTixPQVRNLEVBU0dZLFNBQVMsQ0FBQ0UsT0FUYixDQUFkO0FBV0EsU0FBT0MsS0FBUDtBQUNILENBdERNIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBEYXRhc2V0cyByZWxhdGVkIG1ldGhvZHNcbiAqIFRoaXMgZmlsZSBpdCBpcyBhIHBhcnQgb2YgdGhlIFBhbmRvcmEgUHlycmhhIEphdmFzY3JpcHQgbGlicmFyeVxuICogXG4gKiBAZmlsZSBkYXRhc2V0cy5qc1xuICogQGF1dGhvciBLb3N0aWFudHluIFNteXJub3YgPGtvc3R5c2hAZ21haWwuY29tPlxuICogQGRhdGUgMjAxOFxuICovXG5cbid1c2Ugc3RyaWN0JztcblxuaW1wb3J0ICogYXMgZXhwZWN0IGZyb20gJy4vaGVscGVycy9leHBlY3QnO1xuaW1wb3J0IHBqc0Vycm9yLCB7XG4gICAgQ09OVFJBQ1RfUkVRVUlSRUQsXG4gICAgQUREUkVTU19SRVFVSVJFRCxcbiAgICBXRUIzX1JFUVVJUkVELFxuICAgIFdFQjNfTUVUQU1BU0tfUkVRVUlSRUQsXG4gICAgVFJBTlNBQ1RJT05fVU5TVUNDRVNTRlVMXG59IGZyb20gJy4vaGVscGVycy9lcnJvcnMnO1xuaW1wb3J0ICogYXMgd2ViM0hlbHBlcnMgZnJvbSAnLi9oZWxwZXJzL3dlYjMnO1xuXG4vKipcbiAqIEdldCBkYXRhc2V0cyBjb3VudCBmcm9tIFBhbmRvcmFNYXJrZXQgY29udHJhY3RcbiAqIFxuICogQHBhcmFtIHtPYmplY3R9IGNvbmZpZyBMaWJyYXJ5IGNvbmZpZyAocHJvdmlkZWQgYnkgdGhlIHByb3h5IGJ1dCBjYW4gYmUgb3ZlcnJpZGRlbilcbiAqIEByZXR1cm5zIHtQcm9taXNlfSBBIFByb21pc2Ugb2JqZWN0IHJlcHJlc2VudHMgdGhlIHtudW1iZXJ9IFxuICovXG5leHBvcnQgY29uc3QgZmV0Y2hDb3VudCA9IGFzeW5jIChjb25maWcgPSB7fSkgPT4ge1xuXG4gICAgZXhwZWN0LmFsbChjb25maWcsIHtcbiAgICAgICAgJ3dlYjMnOiB7XG4gICAgICAgICAgICB0eXBlOiAnb2JqZWN0JyxcbiAgICAgICAgICAgIGNvZGU6IFdFQjNfUkVRVUlSRURcbiAgICAgICAgfSxcbiAgICAgICAgJ2NvbnRyYWN0cy5QYW5kb3JhTWFya2V0LmFiaSc6IHtcbiAgICAgICAgICAgIHR5cGU6ICdvYmplY3QnLFxuICAgICAgICAgICAgY29kZTogQ09OVFJBQ1RfUkVRVUlSRUQsXG4gICAgICAgICAgICBhcmdzOiBbJ1BhbmRvcmFNYXJrZXQnXVxuICAgICAgICB9LFxuICAgICAgICAnYWRkcmVzc2VzLlBhbmRvcmFNYXJrZXQnOiB7XG4gICAgICAgICAgICB0eXBlOiAnYWRkcmVzcycsXG4gICAgICAgICAgICBjb2RlOiBBRERSRVNTX1JFUVVJUkVELFxuICAgICAgICAgICAgYXJnczogWydQYW5kb3JhTWFya2V0J11cbiAgICAgICAgfVxuICAgIH0pO1xuXG4gICAgY29uc3QgbWFyID0gbmV3IGNvbmZpZy53ZWIzLmV0aC5Db250cmFjdChjb25maWcuY29udHJhY3RzLlBhbmRvcmFNYXJrZXQuYWJpLCBjb25maWcuYWRkcmVzc2VzLlBhbmRvcmFNYXJrZXQpO1xuICAgIGNvbnN0IGNvdW50ID0gYXdhaXQgbWFyLm1ldGhvZHNcbiAgICAgICAgLmRhdGFzZXRzQ291bnQoKVxuICAgICAgICAuY2FsbCgpO1xuXG4gICAgcmV0dXJuIE51bWJlci5wYXJzZUludChjb3VudCwgMTApO1xufTtcblxuLyoqXG4gKiBHZXQgRGF0YXNldCBhZGRyZXNzIGJ5IGRhdGFzZXQgaWRcbiAqIFxuICogQHBhcmFtIHtudW1iZXJ9IGlkXG4gKiBAcGFyYW0ge09iamVjdH0gY29uZmlnIExpYnJhcnkgY29uZmlnIChwcm92aWRlZCBieSB0aGUgcHJveHkgYnV0IGNhbiBiZSBvdmVycmlkZGVuKVxuICogQHJldHVybnMge1Byb21pc2V9IEEgUHJvbWlzZSBvYmplY3QgcmVwcmVzZW50cyB0aGUge3N0cmluZ31cbiAqL1xuZXhwb3J0IGNvbnN0IGZldGNoQWRkcmVzc0J5SWQgPSBhc3luYyAoaWQsIGNvbmZpZyA9IHt9KSA9PiB7XG5cbiAgICBleHBlY3QuYWxsKHsgaWQgfSwge1xuICAgICAgICAnaWQnOiB7XG4gICAgICAgICAgICB0eXBlOiAnbnVtYmVyJ1xuICAgICAgICB9XG4gICAgfSk7XG5cbiAgICBleHBlY3QuYWxsKGNvbmZpZywge1xuICAgICAgICAnd2ViMyc6IHtcbiAgICAgICAgICAgIHR5cGU6ICdvYmplY3QnLFxuICAgICAgICAgICAgY29kZTogV0VCM19SRVFVSVJFRFxuICAgICAgICB9LFxuICAgICAgICAnY29udHJhY3RzLlBhbmRvcmFNYXJrZXQuYWJpJzoge1xuICAgICAgICAgICAgdHlwZTogJ29iamVjdCcsXG4gICAgICAgICAgICBjb2RlOiBDT05UUkFDVF9SRVFVSVJFRCxcbiAgICAgICAgICAgIGFyZ3M6IFsnUGFuZG9yYU1hcmtldCddXG4gICAgICAgIH0sXG4gICAgICAgICdhZGRyZXNzZXMuUGFuZG9yYU1hcmtldCc6IHtcbiAgICAgICAgICAgIHR5cGU6ICdhZGRyZXNzJyxcbiAgICAgICAgICAgIGNvZGU6IEFERFJFU1NfUkVRVUlSRUQsXG4gICAgICAgICAgICBhcmdzOiBbJ01hcmtldCddXG4gICAgICAgIH1cbiAgICB9KTtcblxuICAgIGNvbnN0IG1hciA9IG5ldyBjb25maWcud2ViMy5ldGguQ29udHJhY3QoY29uZmlnLmNvbnRyYWN0cy5QYW5kb3JhTWFya2V0LmFiaSwgY29uZmlnLmFkZHJlc3Nlcy5QYW5kb3JhTWFya2V0KTtcbiAgICBjb25zdCBkYXRhc2V0Q29udHJhY3QgPSBhd2FpdCBtYXIubWV0aG9kc1xuICAgICAgICAuZGF0YXNldHMoaWQpXG4gICAgICAgIC5jYWxsKCk7XG5cbiAgICByZXR1cm4gZGF0YXNldENvbnRyYWN0O1xufTtcblxuLyoqXG4gKiBHZXQgSVBGUyBhZGRyZXNzIGZyb20gRGF0YXNldCBjb250cmFjdCBieSB0aGUgZGF0YXNldCBhZGRyZXNzXG4gKiBcbiAqIEBwYXJhbSB7c3RyaW5nfSBhZGRyZXNzXG4gKiBAcGFyYW0ge09iamVjdH0gY29uZmlnIExpYnJhcnkgY29uZmlnIChwcm92aWRlZCBieSB0aGUgcHJveHkgYnV0IGNhbiBiZSBvdmVycmlkZGVuKVxuICogQHJldHVybnMge1Byb21pc2V9IEEgUHJvbWlzZSBvYmplY3QgcmVwcmVzZW50cyB0aGUge3N0cmluZ31cbiAqL1xuZXhwb3J0IGNvbnN0IGZldGNoSXBmc0FkZHJlc3MgPSBhc3luYyAoYWRkcmVzcyA9ICcnLCBjb25maWcgPSB7fSkgPT4ge1xuXG4gICAgZXhwZWN0LmFsbCh7IGFkZHJlc3MgfSwge1xuICAgICAgICAnYWRkcmVzcyc6IHtcbiAgICAgICAgICAgIHR5cGU6ICdhZGRyZXNzJ1xuICAgICAgICB9XG4gICAgfSk7XG5cbiAgICBleHBlY3QuYWxsKGNvbmZpZywge1xuICAgICAgICAnd2ViMyc6IHtcbiAgICAgICAgICAgIHR5cGU6ICdvYmplY3QnLFxuICAgICAgICAgICAgY29kZTogV0VCM19SRVFVSVJFRFxuICAgICAgICB9LFxuICAgICAgICAnY29udHJhY3RzLkRhdGFzZXQuYWJpJzoge1xuICAgICAgICAgICAgdHlwZTogJ29iamVjdCcsXG4gICAgICAgICAgICBjb2RlOiBDT05UUkFDVF9SRVFVSVJFRCxcbiAgICAgICAgICAgIGFyZ3M6IFsnRGF0YXNldCddXG4gICAgICAgIH1cbiAgICB9KTtcblxuICAgIGNvbnN0IGRhdCA9IG5ldyBjb25maWcud2ViMy5ldGguQ29udHJhY3QoY29uZmlnLmNvbnRyYWN0cy5EYXRhc2V0LmFiaSwgYWRkcmVzcyk7XG4gICAgY29uc3QgaXBmc0FkZHJlc3MgPSBhd2FpdCBkYXQubWV0aG9kc1xuICAgICAgICAuaXBmc0FkZHJlc3MoKVxuICAgICAgICAuY2FsbCgpO1xuXG4gICAgcmV0dXJuIGNvbmZpZy53ZWIzLnV0aWxzLmhleFRvQXNjaWkoaXBmc0FkZHJlc3MpO1xufTtcblxuLyoqXG4gKiBHZXQgZGF0YSBkaW0gZnJvbSBEYXRhc2V0IGNvbnRyYWN0IGJ5IHRoZSBkYXRhc2V0IGFkZHJlc3NcbiAqIFxuICogQHBhcmFtIHtzdHJpbmd9IGFkZHJlc3NcbiAqIEBwYXJhbSB7T2JqZWN0fSBjb25maWcgTGlicmFyeSBjb25maWcgKHByb3ZpZGVkIGJ5IHRoZSBwcm94eSBidXQgY2FuIGJlIG92ZXJyaWRkZW4pXG4gKiBAcmV0dXJucyB7UHJvbWlzZX0gQSBQcm9taXNlIG9iamVjdCByZXByZXNlbnRzIHRoZSB7bnVtYmVyfVxuICovXG5leHBvcnQgY29uc3QgZmV0Y2hEYXRhRGltID0gYXN5bmMgKGFkZHJlc3MgPSAnJywgY29uZmlnID0ge30pID0+IHtcblxuICAgIGV4cGVjdC5hbGwoeyBhZGRyZXNzIH0sIHtcbiAgICAgICAgJ2FkZHJlc3MnOiB7XG4gICAgICAgICAgICB0eXBlOiAnYWRkcmVzcydcbiAgICAgICAgfVxuICAgIH0pO1xuXG4gICAgZXhwZWN0LmFsbChjb25maWcsIHtcbiAgICAgICAgJ3dlYjMnOiB7XG4gICAgICAgICAgICB0eXBlOiAnb2JqZWN0JyxcbiAgICAgICAgICAgIGNvZGU6IFdFQjNfUkVRVUlSRURcbiAgICAgICAgfSxcbiAgICAgICAgJ2NvbnRyYWN0cy5EYXRhc2V0LmFiaSc6IHtcbiAgICAgICAgICAgIHR5cGU6ICdvYmplY3QnLFxuICAgICAgICAgICAgY29kZTogQ09OVFJBQ1RfUkVRVUlSRUQsXG4gICAgICAgICAgICBhcmdzOiBbJ0RhdGFzZXQnXVxuICAgICAgICB9XG4gICAgfSk7XG5cbiAgICBjb25zdCBkYXQgPSBuZXcgY29uZmlnLndlYjMuZXRoLkNvbnRyYWN0KGNvbmZpZy5jb250cmFjdHMuRGF0YXNldC5hYmksIGFkZHJlc3MpO1xuICAgIGNvbnN0IGRhdGFEaW0gPSBhd2FpdCBkYXQubWV0aG9kc1xuICAgICAgICAuZGF0YURpbSgpXG4gICAgICAgIC5jYWxsKCk7XG5cbiAgICByZXR1cm4gTnVtYmVyLnBhcnNlSW50KGRhdGFEaW0sIDEwKTtcbn07XG5cbi8qKlxuICogR2V0IGN1cnJlbnQgcHJpY2UgZnJvbSBEYXRhc2V0IGNvbnRyYWN0IGJ5IHRoZSBkYXRhc2V0IGFkZHJlc3NcbiAqIFxuICogQHBhcmFtIHtzdHJpbmd9IGFkZHJlc3NcbiAqIEBwYXJhbSB7T2JqZWN0fSBjb25maWcgTGlicmFyeSBjb25maWcgKHByb3ZpZGVkIGJ5IHRoZSBwcm94eSBidXQgY2FuIGJlIG92ZXJyaWRkZW4pXG4gKiBAcmV0dXJucyB7UHJvbWlzZX0gQSBQcm9taXNlIG9iamVjdCByZXByZXNlbnRzIHRoZSB7bnVtYmVyfVxuICovXG5leHBvcnQgY29uc3QgZmV0Y2hDdXJyZW50UHJpY2UgPSBhc3luYyAoYWRkcmVzcyA9ICcnLCBjb25maWcgPSB7fSkgPT4ge1xuXG4gICAgZXhwZWN0LmFsbCh7IGFkZHJlc3MgfSwge1xuICAgICAgICAnYWRkcmVzcyc6IHtcbiAgICAgICAgICAgIHR5cGU6ICdhZGRyZXNzJ1xuICAgICAgICB9XG4gICAgfSk7XG5cbiAgICBleHBlY3QuYWxsKGNvbmZpZywge1xuICAgICAgICAnd2ViMyc6IHtcbiAgICAgICAgICAgIHR5cGU6ICdvYmplY3QnLFxuICAgICAgICAgICAgY29kZTogV0VCM19SRVFVSVJFRFxuICAgICAgICB9LFxuICAgICAgICAnY29udHJhY3RzLkRhdGFzZXQuYWJpJzoge1xuICAgICAgICAgICAgdHlwZTogJ29iamVjdCcsXG4gICAgICAgICAgICBjb2RlOiBDT05UUkFDVF9SRVFVSVJFRCxcbiAgICAgICAgICAgIGFyZ3M6IFsnRGF0YXNldCddXG4gICAgICAgIH1cbiAgICB9KTtcblxuICAgIGNvbnN0IGRhdCA9IG5ldyBjb25maWcud2ViMy5ldGguQ29udHJhY3QoY29uZmlnLmNvbnRyYWN0cy5EYXRhc2V0LmFiaSwgYWRkcmVzcyk7XG4gICAgY29uc3QgY3VycmVudFByaWNlID0gYXdhaXQgZGF0Lm1ldGhvZHNcbiAgICAgICAgLmN1cnJlbnRQcmljZSgpXG4gICAgICAgIC5jYWxsKCk7XG5cbiAgICByZXR1cm4gTnVtYmVyLnBhcnNlSW50KGN1cnJlbnRQcmljZSwgMTApO1xufTtcblxuLyoqXG4gKiBHZXQgZGF0YSBiYXRjaGVzIGNvdW50IGZyb20gRGF0YXNldCBjb250cmFjdCBieSB0aGUgZGF0YXNldCBhZGRyZXNzXG4gKiBcbiAqIEBwYXJhbSB7c3RyaW5nfSBhZGRyZXNzXG4gKiBAcGFyYW0ge09iamVjdH0gY29uZmlnIExpYnJhcnkgY29uZmlnIChwcm92aWRlZCBieSB0aGUgcHJveHkgYnV0IGNhbiBiZSBvdmVycmlkZGVuKVxuICogQHJldHVybnMge1Byb21pc2V9IEEgUHJvbWlzZSBvYmplY3QgcmVwcmVzZW50cyB0aGUge251bWJlcn1cbiAqL1xuZXhwb3J0IGNvbnN0IGZldGNoQmF0Y2hlc0NvdW50ID0gYXN5bmMgKGFkZHJlc3MgPSAnJywgY29uZmlnID0ge30pID0+IHtcblxuICAgIGV4cGVjdC5hbGwoeyBhZGRyZXNzIH0sIHtcbiAgICAgICAgJ2FkZHJlc3MnOiB7XG4gICAgICAgICAgICB0eXBlOiAnYWRkcmVzcydcbiAgICAgICAgfVxuICAgIH0pO1xuXG4gICAgZXhwZWN0LmFsbChjb25maWcsIHtcbiAgICAgICAgJ3dlYjMnOiB7XG4gICAgICAgICAgICB0eXBlOiAnb2JqZWN0JyxcbiAgICAgICAgICAgIGNvZGU6IFdFQjNfUkVRVUlSRURcbiAgICAgICAgfSxcbiAgICAgICAgJ2NvbnRyYWN0cy5EYXRhc2V0LmFiaSc6IHtcbiAgICAgICAgICAgIHR5cGU6ICdvYmplY3QnLFxuICAgICAgICAgICAgY29kZTogQ09OVFJBQ1RfUkVRVUlSRUQsXG4gICAgICAgICAgICBhcmdzOiBbJ0RhdGFzZXQnXVxuICAgICAgICB9XG4gICAgfSk7XG5cbiAgICBjb25zdCBkYXQgPSBuZXcgY29uZmlnLndlYjMuZXRoLkNvbnRyYWN0KGNvbmZpZy5jb250cmFjdHMuRGF0YXNldC5hYmksIGFkZHJlc3MpO1xuICAgIGNvbnN0IGJhdGNoZXNDb3VudCA9IGF3YWl0IGRhdC5tZXRob2RzXG4gICAgICAgIC5iYXRjaGVzQ291bnQoKVxuICAgICAgICAuY2FsbCgpO1xuICAgICAgICBcbiAgICByZXR1cm4gTnVtYmVyLnBhcnNlSW50KGJhdGNoZXNDb3VudCwgMTApO1xufTtcblxuLyoqXG4gKiBHZXQgZGVzY3JpcHRpb24gZnJvbSBEYXRhc2V0IGNvbnRyYWN0IGJ5IHRoZSBkYXRhc2V0IGFkZHJlc3NcbiAqIFxuICogQHBhcmFtIHtzdHJpbmd9IGFkZHJlc3NcbiAqIEBwYXJhbSB7T2JqZWN0fSBjb25maWcgTGlicmFyeSBjb25maWcgKHByb3ZpZGVkIGJ5IHRoZSBwcm94eSBidXQgY2FuIGJlIG92ZXJyaWRkZW4pXG4gKiBAcmV0dXJucyB7UHJvbWlzZX0gQSBQcm9taXNlIG9iamVjdCByZXByZXNlbnRzIHRoZSB7bnVtYmVyfVxuICovXG5leHBvcnQgY29uc3QgZmV0Y2hEZXNjcmlwdGlvbiA9IGFzeW5jIChhZGRyZXNzID0gJycsIGNvbmZpZyA9IHt9KSA9PiB7XG5cbiAgICBleHBlY3QuYWxsKHsgYWRkcmVzcyB9LCB7XG4gICAgICAgICdhZGRyZXNzJzoge1xuICAgICAgICAgICAgdHlwZTogJ2FkZHJlc3MnXG4gICAgICAgIH1cbiAgICB9KTtcblxuICAgIGV4cGVjdC5hbGwoY29uZmlnLCB7XG4gICAgICAgICd3ZWIzJzoge1xuICAgICAgICAgICAgdHlwZTogJ29iamVjdCcsXG4gICAgICAgICAgICBjb2RlOiBXRUIzX1JFUVVJUkVEXG4gICAgICAgIH0sXG4gICAgICAgICdjb250cmFjdHMuRGF0YXNldC5hYmknOiB7XG4gICAgICAgICAgICB0eXBlOiAnb2JqZWN0JyxcbiAgICAgICAgICAgIGNvZGU6IENPTlRSQUNUX1JFUVVJUkVELFxuICAgICAgICAgICAgYXJnczogWydEYXRhc2V0J11cbiAgICAgICAgfVxuICAgIH0pO1xuXG4gICAgY29uc3QgZGF0ID0gbmV3IGNvbmZpZy53ZWIzLmV0aC5Db250cmFjdChjb25maWcuY29udHJhY3RzLkRhdGFzZXQuYWJpLCBhZGRyZXNzKTtcbiAgICBjb25zdCBkZXNjcmlwdGlvbiA9IGF3YWl0IGRhdC5tZXRob2RzXG4gICAgICAgIC5kZXNjcmlwdGlvbigpXG4gICAgICAgIC5jYWxsKCk7XG5cbiAgICByZXR1cm4gY29uZmlnLndlYjMudXRpbHMuaGV4VG9VdGY4KGRlc2NyaXB0aW9uKTtcbn07XG5cbi8qKlxuICogR2V0IG1ldGFkYXRhIGZyb20gRGF0YXNldCBjb250cmFjdCBieSB0aGUgZGF0YXNldCBhZGRyZXNzXG4gKiBcbiAqIEBwYXJhbSB7c3RyaW5nfSBhZGRyZXNzXG4gKiBAcGFyYW0ge09iamVjdH0gY29uZmlnIExpYnJhcnkgY29uZmlnIChwcm92aWRlZCBieSB0aGUgcHJveHkgYnV0IGNhbiBiZSBvdmVycmlkZGVuKVxuICogQHJldHVybnMge1Byb21pc2V9IEEgUHJvbWlzZSBvYmplY3QgcmVwcmVzZW50cyB0aGUge251bWJlcn1cbiAqL1xuZXhwb3J0IGNvbnN0IGZldGNoTWV0YWRhdGEgPSBhc3luYyAoYWRkcmVzcyA9ICcnLCBjb25maWcgPSB7fSkgPT4ge1xuXG4gICAgZXhwZWN0LmFsbCh7IGFkZHJlc3MgfSwge1xuICAgICAgICAnYWRkcmVzcyc6IHtcbiAgICAgICAgICAgIHR5cGU6ICdhZGRyZXNzJ1xuICAgICAgICB9XG4gICAgfSk7XG5cbiAgICBleHBlY3QuYWxsKGNvbmZpZywge1xuICAgICAgICAnd2ViMyc6IHtcbiAgICAgICAgICAgIHR5cGU6ICdvYmplY3QnLFxuICAgICAgICAgICAgY29kZTogV0VCM19SRVFVSVJFRFxuICAgICAgICB9LFxuICAgICAgICAnY29udHJhY3RzLkRhdGFzZXQuYWJpJzoge1xuICAgICAgICAgICAgdHlwZTogJ29iamVjdCcsXG4gICAgICAgICAgICBjb2RlOiBDT05UUkFDVF9SRVFVSVJFRCxcbiAgICAgICAgICAgIGFyZ3M6IFsnRGF0YXNldCddXG4gICAgICAgIH1cbiAgICB9KTtcblxuICAgIGNvbnN0IGRhdCA9IG5ldyBjb25maWcud2ViMy5ldGguQ29udHJhY3QoY29uZmlnLmNvbnRyYWN0cy5EYXRhc2V0LmFiaSwgYWRkcmVzcyk7XG4gICAgY29uc3QgbWV0YWRhdGEgPSBhd2FpdCBkYXQubWV0aG9kc1xuICAgICAgICAubWV0YWRhdGEoKVxuICAgICAgICAuY2FsbCgpO1xuXG4gICAgcmV0dXJuIGNvbmZpZy53ZWIzLnV0aWxzLmhleFRvVXRmOChtZXRhZGF0YSk7XG59O1xuXG4vKipcbiAqIEdldCBkYXRhc2V0IGJ5IHRoZSBkYXRhc2V0IGFkZHJlc3NcbiAqIFxuICogQHBhcmFtIHtzdHJpbmd9IGFkZHJlc3NcbiAqIEBwYXJhbSB7T2JqZWN0fSBjb25maWcgTGlicmFyeSBjb25maWcgKHByb3ZpZGVkIGJ5IHRoZSBwcm94eSBidXQgY2FuIGJlIG92ZXJyaWRkZW4pXG4gKiBAcmV0dXJucyB7UHJvbWlzZX0gUHJvbWlzZSBvYmplY3QgcmVwcmVzZW50cyB0aGUge09iamVjdFtdfVxuICovXG5leHBvcnQgY29uc3QgZmV0Y2hEYXRhc2V0ID0gYXN5bmMgKGFkZHJlc3MgPSAnJywgY29uZmlnID0ge30pID0+IHtcblxuICAgIGV4cGVjdC5hbGwoeyBhZGRyZXNzIH0sIHtcbiAgICAgICAgJ2FkZHJlc3MnOiB7XG4gICAgICAgICAgICB0eXBlOiAnYWRkcmVzcydcbiAgICAgICAgfVxuICAgIH0pO1xuXG4gICAgY29uc3QgW1xuICAgICAgICBpcGZzQWRkcmVzcyxcbiAgICAgICAgZGF0YURpbSxcbiAgICAgICAgY3VycmVudFByaWNlLFxuICAgICAgICBiYXRjaGVzQ291bnQsXG4gICAgICAgIG1ldGFkYXRhLCBcbiAgICAgICAgZGVzY3JpcHRpb25cbiAgICBdID0gYXdhaXQgUHJvbWlzZS5hbGwoW1xuICAgICAgICBmZXRjaElwZnNBZGRyZXNzKGFkZHJlc3MsIGNvbmZpZyksXG4gICAgICAgIGZldGNoRGF0YURpbShhZGRyZXNzLCBjb25maWcpLFxuICAgICAgICBmZXRjaEN1cnJlbnRQcmljZShhZGRyZXNzLCBjb25maWcpLFxuICAgICAgICBmZXRjaEJhdGNoZXNDb3VudChhZGRyZXNzLCBjb25maWcpLFxuICAgICAgICBmZXRjaE1ldGFkYXRhKGFkZHJlc3MsIGNvbmZpZyksXG4gICAgICAgIGZldGNoRGVzY3JpcHRpb24oYWRkcmVzcywgY29uZmlnKVxuICAgIF0pO1xuXG4gICAgcmV0dXJuIHtcbiAgICAgICAgYWRkcmVzcyxcbiAgICAgICAgaXBmc0FkZHJlc3MsXG4gICAgICAgIGRhdGFEaW0sXG4gICAgICAgIGN1cnJlbnRQcmljZSxcbiAgICAgICAgYmF0Y2hlc0NvdW50LFxuICAgICAgICBtZXRhZGF0YSxcbiAgICAgICAgZGVzY3JpcHRpb25cbiAgICB9O1xufTtcblxuLyoqXG4gKiBHZXQgZGF0YXNldCBieSBpZFxuICogXG4gKiBAcGFyYW0ge251bWJlcn0gaWQgXG4gKiBAcGFyYW0ge09iamVjdH0gY29uZmlnIExpYnJhcnkgY29uZmlnIChwcm92aWRlZCBieSB0aGUgcHJveHkgYnV0IGNhbiBiZSBvdmVycmlkZGVuKVxuICogQHJldHVybnMge1Byb21pc2V9IEEgUHJvbWlzZSBvYmplY3QgcmVwcmVzZW50cyB0aGUge09iamVjdH1cbiAqL1xuZXhwb3J0IGNvbnN0IGZldGNoRGF0YXNldEJ5SWQgPSBhc3luYyAoaWQsIGNvbmZpZyA9IHt9KSA9PiB7XG5cbiAgICBjb25zdCBhZGRyZXNzID0gYXdhaXQgZmV0Y2hBZGRyZXNzQnlJZChpZCwgY29uZmlnKTtcbiAgICBjb25zdCBkYXRhc2V0ID0gYXdhaXQgZmV0Y2hEYXRhc2V0KGFkZHJlc3MsIGNvbmZpZyk7XG5cbiAgICByZXR1cm4gZGF0YXNldDtcbn07XG5cbi8qKlxuICogR2V0IGFsbCBkYXRhc2V0c1xuICogXG4gKiBAcGFyYW0ge09iamVjdH0gY29uZmlnIExpYnJhcnkgY29uZmlnIChwcm92aWRlZCBieSB0aGUgcHJveHkgYnV0IGNhbiBiZSBvdmVycmlkZGVuKVxuICogQHJldHVybnMge1Byb21pc2V9IFByb21pc2Ugb2JqZWN0IHJlcHJlc2VudHMgdGhlIHtPYmplY3RbXX1cbiAqL1xuZXhwb3J0IGNvbnN0IGZldGNoQWxsID0gYXN5bmMgKGNvbmZpZyA9IHt9KSA9PiB7XG5cbiAgICBsZXQgcmVjb3JkcyA9IFtdO1xuICAgIGxldCBlcnJvciA9IFtdO1xuXG4gICAgdHJ5IHtcblxuICAgICAgICBjb25zdCBjb3VudCA9IGF3YWl0IGZldGNoQ291bnQoY29uZmlnKTtcblxuICAgICAgICBmb3IgKGxldCBpPTA7IGkgPCBjb3VudDsgaSsrKSB7XG4gICAgICAgICAgICBcbiAgICAgICAgICAgIHRyeSB7XG5cbiAgICAgICAgICAgICAgICBjb25zdCBkYXRhc2V0ID0gYXdhaXQgZmV0Y2hEYXRhc2V0QnlJZChpLCBjb25maWcpO1xuXG4gICAgICAgICAgICAgICAgcmVjb3Jkcy5wdXNoKHtcbiAgICAgICAgICAgICAgICAgICAgaWQ6IGksXG4gICAgICAgICAgICAgICAgICAgIC4uLmRhdGFzZXRcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH0gY2F0Y2goZXJyKSB7XG4gICAgICAgICAgICAgICAgZXJyb3IucHVzaCh7XG4gICAgICAgICAgICAgICAgICAgIGlkOiBpLFxuICAgICAgICAgICAgICAgICAgICBtZXNzYWdlOiBlcnIubWVzc2FnZVxuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfSAgICAgICAgXG4gICAgICAgIH1cbiAgICB9IGNhdGNoKGVycikge1xuICAgICAgICBlcnJvci5wdXNoKHtcbiAgICAgICAgICAgIGVycm9yOiBlcnIubWVzc2FnZVxuICAgICAgICB9KTtcbiAgICB9ICAgXG5cbiAgICByZXR1cm4ge1xuICAgICAgICByZWNvcmRzLFxuICAgICAgICBlcnJvclxuICAgIH07XG59O1xuXG4vKipcbiAqIERlcGxveSBEYXRzZXQgY29udHJhY3QgdG8gdGhlIG5ldHdvcmtcbiAqIFxuICogQHBhcmFtIHtTdHJpbmd9IGRhdGFzZXRJcGZzSGFzaCBcbiAqIEBwYXJhbSB7TnVtYmVyfSBiYXRjaGVzQ291bnQgQ291bnQgb2YgYmF0Y2hlcyBpbiBkYXRhc2V0XG4gKiBAcGFyYW0ge09iamVjdH0gb3B0aW9ucyB7IGRpbWVuc2lvbiwgcHJpY2UsIG1ldGFkYXRhLCBkZXNjcmlwdGlvbiB9IFxuICogQHBhcmFtIHtTdHJpbmd9IHB1Ymxpc2hlciBQdWJsaXNoZXIgYWRkcmVzc1xuICogQHBhcmFtIHtPYmplY3R9IGNvbmZpZyBMaWJyYXJ5IGNvbmZpZyAocHJvdmlkZWQgYnkgdGhlIHByb3h5IGJ1dCBjYW4gYmUgb3ZlcnJpZGRlbilcbiAqIEByZXR1cm5zIHtQcm9taXNlfSBQcm9taXNlIG9iamVjdCByZXNvbHZlZCB0byBjb250cmFjdCBhZGRyZXNzXG4gKi9cbmV4cG9ydCBjb25zdCBkZXBsb3kgPSBhc3luYyAoZGF0YXNldElwZnNIYXNoLCBiYXRjaGVzQ291bnQsIHsgZGltZW5zaW9uLCBwcmljZSwgbWV0YWRhdGEsIGRlc2NyaXB0aW9uIH0sIHB1Ymxpc2hlciwgY29uZmlnID0ge30pID0+IHtcblxuICAgIGV4cGVjdC5hbGwoeyBkYXRhc2V0SXBmc0hhc2gsIGJhdGNoZXNDb3VudCwgcHVibGlzaGVyLCBkaW1lbnNpb24sIHByaWNlLCBtZXRhZGF0YSwgZGVzY3JpcHRpb24gfSwge1xuICAgICAgICAnZGF0YXNldElwZnNIYXNoJzoge1xuICAgICAgICAgICAgdHlwZTogJ3N0cmluZydcbiAgICAgICAgfSxcbiAgICAgICAgJ2JhdGNoZXNDb3VudCc6IHtcbiAgICAgICAgICAgIHR5cGU6ICdudW1iZXInXG4gICAgICAgIH0sXG4gICAgICAgICdwdWJsaXNoZXInOiB7XG4gICAgICAgICAgICB0eXBlOiAnYWRkcmVzcydcbiAgICAgICAgfSxcbiAgICAgICAgJ2RpbWVuc2lvbic6IHtcbiAgICAgICAgICAgIHR5cGU6ICdudW1iZXInXG4gICAgICAgIH0sXG4gICAgICAgICdwcmljZSc6IHtcbiAgICAgICAgICAgIHR5cGU6ICdudW1iZXInXG4gICAgICAgIH0sXG4gICAgICAgICdtZXRhZGF0YSc6IHtcbiAgICAgICAgICAgIHR5cGU6ICdzdHJpbmcnXG4gICAgICAgIH0sXG4gICAgICAgICdkZXNjcmlwdGlvbic6IHtcbiAgICAgICAgICAgIHR5cGU6ICdzdHJpbmcnXG4gICAgICAgIH0gICAgICAgIFxuICAgIH0pO1xuXG4gICAgZXhwZWN0LmFsbChjb25maWcsIHtcbiAgICAgICAgJ3dlYjMnOiB7XG4gICAgICAgICAgICB0eXBlOiAnb2JqZWN0JyxcbiAgICAgICAgICAgIGNvZGU6IFdFQjNfUkVRVUlSRURcbiAgICAgICAgfSxcbiAgICAgICAgJ2NvbnRyYWN0cy5EYXRhc2V0Jzoge1xuICAgICAgICAgICAgdHlwZTogJ29iamVjdCcsXG4gICAgICAgICAgICBjb2RlOiBDT05UUkFDVF9SRVFVSVJFRCxcbiAgICAgICAgICAgIGFyZ3M6IFsnRGF0YXNldCddXG4gICAgICAgIH0sXG4gICAgICAgICd3ZWIzLmN1cnJlbnRQcm92aWRlci5pc01ldGFNYXNrJzoge1xuICAgICAgICAgICAgdHlwZTogJ2Jvb2xlYW4nLFxuICAgICAgICAgICAgY29kZTogV0VCM19NRVRBTUFTS19SRVFVSVJFRFxuICAgICAgICB9XG4gICAgfSk7XG5cbiAgICBjb25zdCBhcmdzID0gW1xuICAgICAgICBjb25maWcud2ViMy51dGlscy51dGY4VG9IZXgoZGF0YXNldElwZnNIYXNoKSwgXG4gICAgICAgIGRpbWVuc2lvbiwgXG4gICAgICAgIGJhdGNoZXNDb3VudCwgXG4gICAgICAgIHByaWNlLCBcbiAgICAgICAgY29uZmlnLndlYjMudXRpbHMudXRmOFRvSGV4KG1ldGFkYXRhKSxcbiAgICAgICAgY29uZmlnLndlYjMudXRpbHMudXRmOFRvSGV4KGRlc2NyaXB0aW9uKVxuICAgIF07XG4gICAgICAgIFxuICAgIC8vIEVzdGltYXRlIHJlcXVpcmVkIGFtb3VudCBvZiBnYXNcbiAgICBjb25zdCBnYXMgPSBhd2FpdCB3ZWIzSGVscGVycy5lc3RpbWF0ZUdhcyhjb25maWcuY29udHJhY3RzLkRhdGFzZXQuYnl0ZWNvZGUsIGFyZ3MsIGNvbmZpZyk7XG5cbiAgICAvLyBDcmVhdGUgYW5kIGRlcGxveSBkYXRhc2V0IGNvbnRyYWN0XG4gICAgY29uc3QgZGF0YXNldENvbnRyYWN0QWRkcmVzcyA9IGF3YWl0IHdlYjNIZWxwZXJzLmRlcGxveUNvbnRyYWN0KGNvbmZpZy5jb250cmFjdHMuRGF0YXNldCwge1xuICAgICAgICBhcmdzLFxuICAgICAgICBmcm9tOiBwdWJsaXNoZXIsXG4gICAgICAgIGdhczogTnVtYmVyLnBhcnNlSW50KGdhcyAqIDEuNSwgMTApXG4gICAgfSwgY29uZmlnKTtcblxuICAgIHJldHVybiBkYXRhc2V0Q29udHJhY3RBZGRyZXNzO1xufTtcblxuLyoqXG4gKiBBZGQgZGF0YXNldCB0byBtYXJrZXRcbiAqIFxuICogQHBhcmFtIHtTdHJpbmd9IGRhdGFzZXRDb250cmFjdEFkZHJlc3MgXG4gKiBAcGFyYW0ge1N0cmluZ30gcHVibGlzaGVyQWRkcmVzcyBcbiAqIEBwYXJhbSB7T2JqZWN0fSBjb25maWcgTGlicmFyeSBjb25maWcgKHByb3ZpZGVkIGJ5IHRoZSBwcm94eSBidXQgY2FuIGJlIG92ZXJyaWRkZW4pXG4gKiBAcmV0dXJucyB7UHJvbWlzZX0gUHJvbWlzZSBvYmplY3QgcmVzb2x2ZWQgdG8ge3N0cmluZ30gY29udHJhY3RBZGRyZXNzXG4gKi9cbmV4cG9ydCBjb25zdCBhZGRUb01hcmtldCA9IChkYXRhc2V0Q29udHJhY3RBZGRyZXNzLCBwdWJsaXNoZXJBZGRyZXNzLCBjb25maWcgPSB7fSkgPT4gbmV3IFByb21pc2UoYXN5bmMgKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuXG4gICAgZXhwZWN0LmFsbCh7IGRhdGFzZXRDb250cmFjdEFkZHJlc3MsIHB1Ymxpc2hlckFkZHJlc3MgfSwge1xuICAgICAgICAnZGF0YXNldENvbnRyYWN0QWRkcmVzcyc6IHtcbiAgICAgICAgICAgIHR5cGU6ICdhZGRyZXNzJ1xuICAgICAgICB9LFxuICAgICAgICAncHVibGlzaGVyQWRkcmVzcyc6IHtcbiAgICAgICAgICAgIHR5cGU6ICdhZGRyZXNzJ1xuICAgICAgICB9XG4gICAgfSk7XG5cbiAgICBleHBlY3QuYWxsKGNvbmZpZywge1xuICAgICAgICAnd2ViMyc6IHtcbiAgICAgICAgICAgIHR5cGU6ICdvYmplY3QnLFxuICAgICAgICAgICAgY29kZTogV0VCM19SRVFVSVJFRFxuICAgICAgICB9LFxuICAgICAgICAnY29udHJhY3RzLlBhbmRvcmFNYXJrZXQuYWJpJzoge1xuICAgICAgICAgICAgdHlwZTogJ29iamVjdCcsXG4gICAgICAgICAgICBjb2RlOiBDT05UUkFDVF9SRVFVSVJFRCxcbiAgICAgICAgICAgIGFyZ3M6IFsnUGFuZG9yYU1hcmtldCddXG4gICAgICAgIH0sXG4gICAgICAgICdhZGRyZXNzZXMuUGFuZG9yYU1hcmtldCc6IHtcbiAgICAgICAgICAgIHR5cGU6ICdhZGRyZXNzJyxcbiAgICAgICAgICAgIGNvZGU6IEFERFJFU1NfUkVRVUlSRUQsXG4gICAgICAgICAgICBhcmdzOiBbJ01hcmtldCddXG4gICAgICAgIH0sXG4gICAgICAgICd3ZWIzLmN1cnJlbnRQcm92aWRlci5pc01ldGFNYXNrJzoge1xuICAgICAgICAgICAgdHlwZTogJ2Jvb2xlYW4nLFxuICAgICAgICAgICAgY29kZTogV0VCM19NRVRBTUFTS19SRVFVSVJFRFxuICAgICAgICB9XG4gICAgfSk7XG5cbiAgICBjb25zdCBtYXJrZXQgPSBuZXcgY29uZmlnLndlYjMuZXRoLkNvbnRyYWN0KGNvbmZpZy5jb250cmFjdHMuUGFuZG9yYU1hcmtldC5hYmksIGNvbmZpZy5hZGRyZXNzZXMuUGFuZG9yYU1hcmtldCk7XG4gICAgY29uc3QgZ2FzUHJpY2UgPSBhd2FpdCBjb25maWcud2ViMy5ldGguZ2V0R2FzUHJpY2UoKTtcbiAgICBtYXJrZXQubWV0aG9kc1xuICAgICAgICAuYWRkRGF0YXNldChkYXRhc2V0Q29udHJhY3RBZGRyZXNzKVxuICAgICAgICAuc2VuZCh7XG4gICAgICAgICAgICBmcm9tOiBwdWJsaXNoZXJBZGRyZXNzLFxuICAgICAgICAgICAgZ2FzUHJpY2VcbiAgICAgICAgfSlcbiAgICAgICAgLm9uKCdlcnJvcicsIHJlamVjdClcbiAgICAgICAgLm9uKCdyZWNlaXB0JywgcmVjZWlwdCA9PiB7XG5cbiAgICAgICAgICAgIGlmIChOdW1iZXIocmVjZWlwdC5zdGF0dXMpID09PSAwKSB7XG5cbiAgICAgICAgICAgICAgICByZXR1cm4gcmVqZWN0KHBqc0Vycm9yKFRSQU5TQUNUSU9OX1VOU1VDQ0VTU0ZVTCkpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICByZXNvbHZlKHJlY2VpcHQuY29udHJhY3RBZGRyZXNzIHx8IHJlY2VpcHQuZXZlbnRzLkRhdGFzZXRBZGRlZC5yZXR1cm5WYWx1ZXMuZGF0YXNldCk7XG4gICAgICAgIH0pO1xuICAgIC8vIEBub3RlIEluIGNhc2Ugb2YgZ2FuYWNoZS1jbGkgYmxvY2tjaGFpbiBcImNvbnRyYWN0QWRkcmVzc1wiIGFsd2F5cyB3aWxsIGJlIGVxdWFsIHRvIG51bGxcbn0pO1xuXG4vKipcbiAqIFJlbW92ZSBkYXRhc2V0IGZyb20gUGFuZG9yYU1hcmtldFxuICogXG4gKiBAcGFyYW0ge1N0cmluZ30gZGF0YXNldEFkZHJlc3NcbiAqIEBwYXJhbSB7U3RyaW5nfSBwdWJsaXNoZXJBZGRyZXNzIFxuICogQHBhcmFtIHtPYmplY3R9IGNvbmZpZyBMaWJyYXJ5IGNvbmZpZyAocHJvdmlkZWQgYnkgdGhlIHByb3h5IGJ1dCBjYW4gYmUgb3ZlcnJpZGRlbikgXG4gKi9cbmV4cG9ydCBjb25zdCByZW1vdmVEYXRhc2V0ID0gKGRhdGFzZXRBZGRyZXNzLCBwdWJsaXNoZXJBZGRyZXNzLCBjb25maWcgPSB7fSkgPT4gbmV3IFByb21pc2UoYXN5bmMgKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuXG4gICAgZXhwZWN0LmFsbCh7IGRhdGFzZXRBZGRyZXNzLCBwdWJsaXNoZXJBZGRyZXNzIH0sIHtcbiAgICAgICAgJ2RhdGFzZXRBZGRyZXNzJzoge1xuICAgICAgICAgICAgdHlwZTogJ2FkZHJlc3MnXG4gICAgICAgIH0sXG4gICAgICAgICdwdWJsaXNoZXJBZGRyZXNzJzoge1xuICAgICAgICAgICAgdHlwZTogJ2FkZHJlc3MnXG4gICAgICAgIH1cbiAgICB9KTtcblxuICAgIGV4cGVjdC5hbGwoY29uZmlnLCB7XG4gICAgICAgICd3ZWIzJzoge1xuICAgICAgICAgICAgdHlwZTogJ29iamVjdCcsXG4gICAgICAgICAgICBjb2RlOiBXRUIzX1JFUVVJUkVEXG4gICAgICAgIH0sXG4gICAgICAgICdjb250cmFjdHMuUGFuZG9yYU1hcmtldC5hYmknOiB7XG4gICAgICAgICAgICB0eXBlOiAnb2JqZWN0JyxcbiAgICAgICAgICAgIGNvZGU6IENPTlRSQUNUX1JFUVVJUkVELFxuICAgICAgICAgICAgYXJnczogWydQYW5kb3JhTWFya2V0J11cbiAgICAgICAgfSxcbiAgICAgICAgJ2FkZHJlc3Nlcy5QYW5kb3JhTWFya2V0Jzoge1xuICAgICAgICAgICAgdHlwZTogJ2FkZHJlc3MnLFxuICAgICAgICAgICAgY29kZTogQUREUkVTU19SRVFVSVJFRCxcbiAgICAgICAgICAgIGFyZ3M6IFsnUGFuZG9yYU1hcmtldCddXG4gICAgICAgIH1cbiAgICB9KTtcblxuICAgIGNvbnN0IG1hcmtldCA9IG5ldyBjb25maWcud2ViMy5ldGguQ29udHJhY3QoY29uZmlnLmNvbnRyYWN0cy5QYW5kb3JhTWFya2V0LmFiaSwgY29uZmlnLmFkZHJlc3Nlcy5QYW5kb3JhTWFya2V0KTtcbiAgICBjb25zdCBnYXNQcmljZSA9IGF3YWl0IGNvbmZpZy53ZWIzLmV0aC5nZXRHYXNQcmljZSgpO1xuICAgIG1hcmtldC5tZXRob2RzXG4gICAgICAgIC5yZW1vdmVEYXRhc2V0KGRhdGFzZXRBZGRyZXNzKVxuICAgICAgICAuc2VuZCh7XG4gICAgICAgICAgICBmcm9tOiBwdWJsaXNoZXJBZGRyZXNzLFxuICAgICAgICAgICAgZ2FzUHJpY2VcbiAgICAgICAgfSlcbiAgICAgICAgLm9uKCdlcnJvcicsIHJlamVjdClcbiAgICAgICAgLm9uKCdyZWNlaXB0JywgcmVjZWlwdCA9PiB7XG5cbiAgICAgICAgICAgIGlmIChOdW1iZXIocmVjZWlwdC5zdGF0dXMpID09PSAwKSB7XG5cbiAgICAgICAgICAgICAgICByZXR1cm4gcmVqZWN0KHBqc0Vycm9yKFRSQU5TQUNUSU9OX1VOU1VDQ0VTU0ZVTCkpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICByZXNvbHZlKHJlY2VpcHQuY29udHJhY3RBZGRyZXNzKTtcbiAgICAgICAgfSk7XG59KTtcblxuLyoqXG4gKiBIYW5kbGUgZXZlbnQgRGF0YXNldEFkZGVkXG4gKiBcbiAqIEBwYXJhbSB7T2JqZWN0fSBvcHRpb25zIEV2ZW50IGhhbmRsZXIgb3B0aW9uc1xuICogQHBhcmFtIHtPYmplY3R9IGNvbmZpZyBMaWJyYXJ5IGNvbmZpZyAocHJvdmlkZWQgYnkgdGhlIHByb3h5IGJ1dCBjYW4gYmUgb3ZlcnJpZGRlbilcbiAqIEByZXR1cm5zIHtPYmplY3R9IE9iamVjdCB3aXRoIGNoYWluZWQgY2FsbGJhY2tzICNkYXRhIGFuZCAjZXJyb3JcbiAqL1xuZXhwb3J0IGNvbnN0IGV2ZW50RGF0YXNldEFkZGVkID0gKG9wdGlvbnMgPSB7fSwgY29uZmlnID0ge30pID0+IHtcblxuICAgIGV4cGVjdC5hbGwoeyBvcHRpb25zIH0sIHtcbiAgICAgICAgJ29wdGlvbnMnOiB7XG4gICAgICAgICAgICB0eXBlOiAnb2JqZWN0J1xuICAgICAgICB9XG4gICAgfSk7XG5cbiAgICBleHBlY3QuYWxsKGNvbmZpZywge1xuICAgICAgICAnd2ViMyc6IHtcbiAgICAgICAgICAgIHR5cGU6ICdvYmplY3QnLFxuICAgICAgICAgICAgY29kZTogV0VCM19SRVFVSVJFRFxuICAgICAgICB9LFxuICAgICAgICAnY29udHJhY3RzLlBhbmRvcmFNYXJrZXQuYWJpJzoge1xuICAgICAgICAgICAgdHlwZTogJ29iamVjdCcsXG4gICAgICAgICAgICBjb2RlOiBDT05UUkFDVF9SRVFVSVJFRCxcbiAgICAgICAgICAgIGFyZ3M6IFsnUGFuZG9yYU1hcmtldCddXG4gICAgICAgIH0sXG4gICAgICAgICdhZGRyZXNzZXMuUGFuZG9yYU1hcmtldCc6IHtcbiAgICAgICAgICAgIHR5cGU6ICdhZGRyZXNzJyxcbiAgICAgICAgICAgIGNvZGU6IEFERFJFU1NfUkVRVUlSRUQsXG4gICAgICAgICAgICBhcmdzOiBbJ01hcmtldCddXG4gICAgICAgIH1cbiAgICB9KTtcblxuICAgIGNvbnN0IGNhbGxiYWNrcyA9IHtcbiAgICAgICAgb25EYXRhOiAoKSA9PiB7fSxcbiAgICAgICAgb25FcnJvcjogKCkgPT4ge31cbiAgICB9O1xuXG4gICAgY29uc3QgY2hhaW4gPSB7XG4gICAgICAgIGRhdGE6IChjYiA9ICgpID0+IHt9KSA9PiB7XG4gICAgICAgICAgICBjYWxsYmFja3Mub25EYXRhID0gY2I7XG4gICAgICAgICAgICByZXR1cm4gY2hhaW47XG4gICAgICAgIH0sXG4gICAgICAgIGVycm9yOiAoY2IgPSAoKSA9PiB7fSkgPT4ge1xuICAgICAgICAgICAgY2FsbGJhY2tzLm9uRXJyb3IgPSBjYjtcbiAgICAgICAgICAgIHJldHVybiBjaGFpbjtcbiAgICAgICAgfVxuICAgIH07XG5cbiAgICBjb25zdCBtYXIgPSBuZXcgY29uZmlnLndlYjMuZXRoLkNvbnRyYWN0KGNvbmZpZy5jb250cmFjdHMuUGFuZG9yYU1hcmtldC5hYmksIGNvbmZpZy5hZGRyZXNzZXMuUGFuZG9yYU1hcmtldCk7XG4gICAgY2hhaW4uZXZlbnQgPSBtYXIuZXZlbnRzLkRhdGFzZXRBZGRlZChvcHRpb25zKVxuICAgICAgICAub24oJ2RhdGEnLCBhc3luYyByZXMgPT4ge1xuXG4gICAgICAgICAgICB0cnkge1xuXG4gICAgICAgICAgICAgICAgY29uc3QgZGF0YXNldCA9IGF3YWl0IGZldGNoRGF0YXNldChyZXMucmV0dXJuVmFsdWVzLmRhdGFzZXQsIGNvbmZpZyk7XG4gICAgICAgICAgICAgICAgY2FsbGJhY2tzLm9uRGF0YSh7XG4gICAgICAgICAgICAgICAgICAgIGFkZHJlc3M6IHJlcy5yZXR1cm5WYWx1ZXMuZGF0YXNldCxcbiAgICAgICAgICAgICAgICAgICAgZGF0YXNldCxcbiAgICAgICAgICAgICAgICAgICAgc3RhdHVzOiAnY3JlYXRlZCcsXG4gICAgICAgICAgICAgICAgICAgIGV2ZW50OiAnUGFuZG9yYU1hcmtldC5EYXRhc2V0QWRkZWQnXG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9IGNhdGNoKGVycikge1xuICAgICAgICAgICAgICAgIGNhbGxiYWNrcy5vbkVycm9yKGVycik7XG4gICAgICAgICAgICB9ICAgICAgICAgICAgXG4gICAgICAgIH0pXG4gICAgICAgIC5vbignZXJyb3InLCBjYWxsYmFja3Mub25FcnJvcik7XG5cbiAgICByZXR1cm4gY2hhaW47XG59O1xuXG4vKipcbiAqIEhhbmRsZSBldmVudCBEYXRhc2V0UmVtb3ZlZFxuICogXG4gKiBAcGFyYW0ge09iamVjdH0gb3B0aW9ucyBFdmVudCBoYW5kbGVyIG9wdGlvbnNcbiAqIEBwYXJhbSB7T2JqZWN0fSBjb25maWcgTGlicmFyeSBjb25maWcgKHByb3ZpZGVkIGJ5IHRoZSBwcm94eSBidXQgY2FuIGJlIG92ZXJyaWRkZW4pXG4gKiBAcmV0dXJucyB7T2JqZWN0fSBPYmplY3Qgd2l0aCBjaGFpbmVkIGNhbGxiYWNrcyAjZGF0YSBhbmQgI2Vycm9yXG4gKi9cbmV4cG9ydCBjb25zdCBldmVudERhdGFzZXRSZW1vdmVkID0gKG9wdGlvbnMgPSB7fSwgY29uZmlnID0ge30pID0+IHtcblxuICAgIGV4cGVjdC5hbGwoeyBvcHRpb25zIH0sIHtcbiAgICAgICAgJ29wdGlvbnMnOiB7XG4gICAgICAgICAgICB0eXBlOiAnb2JqZWN0J1xuICAgICAgICB9XG4gICAgfSk7XG5cbiAgICBleHBlY3QuYWxsKGNvbmZpZywge1xuICAgICAgICAnd2ViMyc6IHtcbiAgICAgICAgICAgIHR5cGU6ICdvYmplY3QnLFxuICAgICAgICAgICAgY29kZTogV0VCM19SRVFVSVJFRFxuICAgICAgICB9LFxuICAgICAgICAnY29udHJhY3RzLlBhbmRvcmFNYXJrZXQuYWJpJzoge1xuICAgICAgICAgICAgdHlwZTogJ29iamVjdCcsXG4gICAgICAgICAgICBjb2RlOiBDT05UUkFDVF9SRVFVSVJFRCxcbiAgICAgICAgICAgIGFyZ3M6IFsnUGFuZG9yYU1hcmtldCddXG4gICAgICAgIH0sXG4gICAgICAgICdhZGRyZXNzZXMuUGFuZG9yYU1hcmtldCc6IHtcbiAgICAgICAgICAgIHR5cGU6ICdhZGRyZXNzJyxcbiAgICAgICAgICAgIGNvZGU6IEFERFJFU1NfUkVRVUlSRUQsXG4gICAgICAgICAgICBhcmdzOiBbJ1BhbmRvcmFNYXJrZXQnXVxuICAgICAgICB9XG4gICAgfSk7XG5cbiAgICBjb25zdCBjYWxsYmFja3MgPSB7XG4gICAgICAgIG9uRGF0YTogKCkgPT4ge30sXG4gICAgICAgIG9uRXJyb3I6ICgpID0+IHt9XG4gICAgfTtcblxuICAgIGNvbnN0IGNoYWluID0ge1xuICAgICAgICBkYXRhOiAoY2IgPSAoKSA9PiB7fSkgPT4ge1xuICAgICAgICAgICAgY2FsbGJhY2tzLm9uRGF0YSA9IGNiO1xuICAgICAgICAgICAgcmV0dXJuIGNoYWluO1xuICAgICAgICB9LFxuICAgICAgICBlcnJvcjogKGNiID0gKCkgPT4ge30pID0+IHtcbiAgICAgICAgICAgIGNhbGxiYWNrcy5vbkVycm9yID0gY2I7XG4gICAgICAgICAgICByZXR1cm4gY2hhaW47XG4gICAgICAgIH1cbiAgICB9O1xuXG4gICAgY29uc3QgbWFyID0gbmV3IGNvbmZpZy53ZWIzLmV0aC5Db250cmFjdChjb25maWcuY29udHJhY3RzLlBhbmRvcmFNYXJrZXQuYWJpLCBjb25maWcuYWRkcmVzc2VzLlBhbmRvcmFNYXJrZXQpO1xuICAgIGNoYWluLmV2ZW50ID0gbWFyLmV2ZW50cy5EYXRhc2V0UmVtb3ZlZChvcHRpb25zKVxuICAgICAgICAub24oJ2RhdGEnLCBhc3luYyByZXMgPT4ge1xuXG4gICAgICAgICAgICBjYWxsYmFja3Mub25EYXRhKHtcbiAgICAgICAgICAgICAgICBhZGRyZXNzOiByZXMucmV0dXJuVmFsdWVzLmRhdGFzZXQsXG4gICAgICAgICAgICAgICAgc3RhdHVzOiAncmVtb3ZlZCcsXG4gICAgICAgICAgICAgICAgZXZlbnQ6ICdQYW5kb3JhTWFya2V0LkRhdGFzZXRSZW1vdmVkJ1xuICAgICAgICAgICAgfSk7ICAgICAgICAgICAgXG4gICAgICAgIH0pXG4gICAgICAgIC5vbignZXJyb3InLCBjYWxsYmFja3Mub25FcnJvcik7XG5cbiAgICByZXR1cm4gY2hhaW47XG59O1xuIl19