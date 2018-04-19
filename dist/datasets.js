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
exports.eventDatasetRemoved = exports.eventDatasetAdded = exports.removeDataset = exports.addToMarket = exports.deploy = exports.fetchAll = exports.fetchDatasetById = exports.fetchDataset = exports.fetchBatchesCount = exports.fetchSamplesCount = exports.fetchCurrentPrice = exports.fetchDataDim = exports.fetchIpfsAddress = exports.fetchAddressById = exports.fetchCount = void 0;

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
      type: 'string',
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
 * Get data samples count from Dataset contract by the dataset address
 * 
 * @param {string} address
 * @param {Object} config Library config (provided by the proxy but can be overridden)
 * @returns {Promise} A Promise object represents the {number}
 */


exports.fetchCurrentPrice = fetchCurrentPrice;

const fetchSamplesCount = async (address = '', config = {}) => {
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
  const samplesCount = await dat.methods.samplesCount().call();
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

const fetchBatchesCount = async (address = '', config = {}) => {
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
 * Get dataset by the dataset address
 * 
 * @param {string} address
 * @param {Object} config Library config (provided by the proxy but can be overridden)
 * @returns {Promise} Promise object represents the {Object[]}
 */


exports.fetchBatchesCount = fetchBatchesCount;

const fetchDataset = async (address = '', config = {}) => {
  const [ipfsAddress, dataDim, currentPrice, samplesCount, batchesCount] = await Promise.all([fetchIpfsAddress(address, config), fetchDataDim(address, config), fetchCurrentPrice(address, config), fetchSamplesCount(address, config), fetchBatchesCount(address, config)]);
  return {
    address,
    ipfsAddress,
    dataDim,
    currentPrice,
    samplesCount,
    batchesCount
  };
};
/**
 * Get dataset by id
 * 
 * @param {integer} id 
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
 * @param {string} datasetIpfsHash 
 * @param {Object} options { publisher, dimension, samples, price } 
 * @param {Object} config Library config (provided by the proxy but can be overridden)
 * @returns {Promise} Promise object resolved to contract address
 */


exports.fetchAll = fetchAll;

const deploy = async (datasetIpfsHash, batchesCount, {
  publisher,
  dimension,
  samples,
  price
}, config = {}) => {
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
  const args = [config.web3.utils.toHex(datasetIpfsHash), dimension, samples, batchesCount, price]; // Estimate required amount of gas

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

const addToMarket = (datasetContractAddress, publisherAddress, config = {}) => new Promise((resolve, reject) => {
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
      args: ['Market']
    },
    'web3.currentProvider.isMetaMask': {
      type: 'boolean',
      code: _errors.WEB3_METAMASK_REQUIRED
    }
  });
  const market = new config.web3.eth.Contract(config.contracts.PandoraMarket.abi, config.addresses.PandoraMarket);
  market.methods.addDataset(datasetContractAddress).send({
    from: publisherAddress
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

const removeDataset = (datasetAddress, publisherAddress, config = {}) => new Promise((resolve, reject) => {
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
  market.methods.removeDataset(datasetAddress).send({
    from: publisherAddress
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
  mar.events.DatasetAdded(options).on('data', async res => {
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
  mar.events.DatasetRemoved(options).on('data', async res => {
    callbacks.onData({
      address: res.returnValues.dataset,
      status: 'removed',
      event: 'PandoraMarket.DatasetRemoved'
    });
  }).on('error', callbacks.onError);
  return chain;
};

exports.eventDatasetRemoved = eventDatasetRemoved;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9kYXRhc2V0cy5qcyJdLCJuYW1lcyI6WyJmZXRjaENvdW50IiwiY29uZmlnIiwiZXhwZWN0IiwiYWxsIiwidHlwZSIsImNvZGUiLCJXRUIzX1JFUVVJUkVEIiwiQ09OVFJBQ1RfUkVRVUlSRUQiLCJhcmdzIiwiQUREUkVTU19SRVFVSVJFRCIsIm1hciIsIndlYjMiLCJldGgiLCJDb250cmFjdCIsImNvbnRyYWN0cyIsIlBhbmRvcmFNYXJrZXQiLCJhYmkiLCJhZGRyZXNzZXMiLCJjb3VudCIsIm1ldGhvZHMiLCJkYXRhc2V0c0NvdW50IiwiY2FsbCIsIk51bWJlciIsInBhcnNlSW50IiwiZmV0Y2hBZGRyZXNzQnlJZCIsImlkIiwiZGF0YXNldENvbnRyYWN0IiwiZGF0YXNldHMiLCJmZXRjaElwZnNBZGRyZXNzIiwiYWRkcmVzcyIsImRhdCIsIkRhdGFzZXQiLCJpcGZzQWRkcmVzcyIsInV0aWxzIiwiaGV4VG9Bc2NpaSIsImZldGNoRGF0YURpbSIsImRhdGFEaW0iLCJmZXRjaEN1cnJlbnRQcmljZSIsImN1cnJlbnRQcmljZSIsImZldGNoU2FtcGxlc0NvdW50Iiwic2FtcGxlc0NvdW50IiwiZmV0Y2hCYXRjaGVzQ291bnQiLCJiYXRjaGVzQ291bnQiLCJmZXRjaERhdGFzZXQiLCJQcm9taXNlIiwiZmV0Y2hEYXRhc2V0QnlJZCIsImRhdGFzZXQiLCJmZXRjaEFsbCIsInJlY29yZHMiLCJlcnJvciIsImkiLCJwdXNoIiwiZXJyIiwibWVzc2FnZSIsImRlcGxveSIsImRhdGFzZXRJcGZzSGFzaCIsInB1Ymxpc2hlciIsImRpbWVuc2lvbiIsInNhbXBsZXMiLCJwcmljZSIsIldFQjNfTUVUQU1BU0tfUkVRVUlSRUQiLCJ0b0hleCIsImdhcyIsIndlYjNIZWxwZXJzIiwiZXN0aW1hdGVHYXMiLCJieXRlY29kZSIsImRhdGFzZXRDb250cmFjdEFkZHJlc3MiLCJkZXBsb3lDb250cmFjdCIsImZyb20iLCJhZGRUb01hcmtldCIsInB1Ymxpc2hlckFkZHJlc3MiLCJyZXNvbHZlIiwicmVqZWN0IiwibWFya2V0IiwiYWRkRGF0YXNldCIsInNlbmQiLCJvbiIsInJlY2VpcHQiLCJzdGF0dXMiLCJUUkFOU0FDVElPTl9VTlNVQ0NFU1NGVUwiLCJjb250cmFjdEFkZHJlc3MiLCJldmVudHMiLCJEYXRhc2V0QWRkZWQiLCJyZXR1cm5WYWx1ZXMiLCJyZW1vdmVEYXRhc2V0IiwiZGF0YXNldEFkZHJlc3MiLCJldmVudERhdGFzZXRBZGRlZCIsIm9wdGlvbnMiLCJjYWxsYmFja3MiLCJvbkRhdGEiLCJvbkVycm9yIiwiY2hhaW4iLCJkYXRhIiwiY2IiLCJyZXMiLCJldmVudCIsImV2ZW50RGF0YXNldFJlbW92ZWQiLCJEYXRhc2V0UmVtb3ZlZCJdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7Ozs7O0FBU0E7Ozs7Ozs7QUFFQTs7QUFDQTs7QUFPQTs7Ozs7Ozs7QUFFQTs7Ozs7O0FBTU8sTUFBTUEsYUFBYSxPQUFPQyxTQUFTLEVBQWhCLEtBQXVCO0FBRTdDQyxTQUFPQyxHQUFQLENBQVdGLE1BQVgsRUFBbUI7QUFDZixZQUFRO0FBQ0pHLFlBQU0sUUFERjtBQUVKQyxZQUFNQztBQUZGLEtBRE87QUFLZixtQ0FBK0I7QUFDM0JGLFlBQU0sUUFEcUI7QUFFM0JDLFlBQU1FLHlCQUZxQjtBQUczQkMsWUFBTSxDQUFDLGVBQUQ7QUFIcUIsS0FMaEI7QUFVZiwrQkFBMkI7QUFDdkJKLFlBQU0sUUFEaUI7QUFFdkJDLFlBQU1JLHdCQUZpQjtBQUd2QkQsWUFBTSxDQUFDLGVBQUQ7QUFIaUI7QUFWWixHQUFuQjtBQWlCQSxRQUFNRSxNQUFNLElBQUlULE9BQU9VLElBQVAsQ0FBWUMsR0FBWixDQUFnQkMsUUFBcEIsQ0FBNkJaLE9BQU9hLFNBQVAsQ0FBaUJDLGFBQWpCLENBQStCQyxHQUE1RCxFQUFpRWYsT0FBT2dCLFNBQVAsQ0FBaUJGLGFBQWxGLENBQVo7QUFDQSxRQUFNRyxRQUFRLE1BQU1SLElBQUlTLE9BQUosQ0FDZkMsYUFEZSxHQUVmQyxJQUZlLEVBQXBCO0FBSUEs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QU9nQixTQUFQLENBQWlCRixhQUFsRixDQUFaO0FBQ0FMLE1BQUl1RSxNQUFKLENBQVdnQixjQUFYLENBQTBCVixPQUExQixFQUNLWCxFQURMLENBQ1EsTUFEUixFQUNnQixNQUFNa0IsR0FBTixJQUFhO0FBRXJCTixjQUFVQyxNQUFWLENBQWlCO0FBQ2I1RCxlQUFTaUUsSUFBSVgsWUFBSixDQUFpQnJDLE9BRGI7QUFFYmdDLGNBQVEsU0FGSztBQUdiaUIsYUFBTztBQUhNLEtBQWpCO0FBS0gsR0FSTCxFQVNLbkIsRUFUTCxDQVNRLE9BVFIsRUFTaUJZLFVBQVVFLE9BVDNCO0FBV0EsU0FBT0MsS0FBUDtBQUNILENBaERNIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBEYXRhc2V0cyByZWxhdGVkIG1ldGhvZHNcbiAqIFRoaXMgZmlsZSBpdCBpcyBhIHBhcnQgb2YgdGhlIFBhbmRvcmEgUHlycmhhIEphdmFzY3JpcHQgbGlicmFyeVxuICogXG4gKiBAZmlsZSBkYXRhc2V0cy5qc1xuICogQGF1dGhvciBLb3N0aWFudHluIFNteXJub3YgPGtvc3R5c2hAZ21haWwuY29tPlxuICogQGRhdGUgMjAxOFxuICovXG5cbid1c2Ugc3RyaWN0JztcblxuaW1wb3J0ICogYXMgZXhwZWN0IGZyb20gJy4vaGVscGVycy9leHBlY3QnO1xuaW1wb3J0IHBqc0Vycm9yLCB7XG4gICAgQ09OVFJBQ1RfUkVRVUlSRUQsXG4gICAgQUREUkVTU19SRVFVSVJFRCxcbiAgICBXRUIzX1JFUVVJUkVELFxuICAgIFdFQjNfTUVUQU1BU0tfUkVRVUlSRUQsXG4gICAgVFJBTlNBQ1RJT05fVU5TVUNDRVNTRlVMXG59IGZyb20gJy4vaGVscGVycy9lcnJvcnMnO1xuaW1wb3J0ICogYXMgd2ViM0hlbHBlcnMgZnJvbSAnLi9oZWxwZXJzL3dlYjMnO1xuXG4vKipcbiAqIEdldCBkYXRhc2V0cyBjb3VudCBmcm9tIFBhbmRvcmFNYXJrZXQgY29udHJhY3RcbiAqIFxuICogQHBhcmFtIHtPYmplY3R9IGNvbmZpZyBMaWJyYXJ5IGNvbmZpZyAocHJvdmlkZWQgYnkgdGhlIHByb3h5IGJ1dCBjYW4gYmUgb3ZlcnJpZGRlbilcbiAqIEByZXR1cm5zIHtQcm9taXNlfSBBIFByb21pc2Ugb2JqZWN0IHJlcHJlc2VudHMgdGhlIHtudW1iZXJ9IFxuICovXG5leHBvcnQgY29uc3QgZmV0Y2hDb3VudCA9IGFzeW5jIChjb25maWcgPSB7fSkgPT4ge1xuXG4gICAgZXhwZWN0LmFsbChjb25maWcsIHtcbiAgICAgICAgJ3dlYjMnOiB7XG4gICAgICAgICAgICB0eXBlOiAnb2JqZWN0JyxcbiAgICAgICAgICAgIGNvZGU6IFdFQjNfUkVRVUlSRURcbiAgICAgICAgfSxcbiAgICAgICAgJ2NvbnRyYWN0cy5QYW5kb3JhTWFya2V0LmFiaSc6IHtcbiAgICAgICAgICAgIHR5cGU6ICdvYmplY3QnLFxuICAgICAgICAgICAgY29kZTogQ09OVFJBQ1RfUkVRVUlSRUQsXG4gICAgICAgICAgICBhcmdzOiBbJ1BhbmRvcmFNYXJrZXQnXVxuICAgICAgICB9LFxuICAgICAgICAnYWRkcmVzc2VzLlBhbmRvcmFNYXJrZXQnOiB7XG4gICAgICAgICAgICB0eXBlOiAnc3RyaW5nJyxcbiAgICAgICAgICAgIGNvZGU6IEFERFJFU1NfUkVRVUlSRUQsXG4gICAgICAgICAgICBhcmdzOiBbJ1BhbmRvcmFNYXJrZXQnXVxuICAgICAgICB9XG4gICAgfSk7XG5cbiAgICBjb25zdCBtYXIgPSBuZXcgY29uZmlnLndlYjMuZXRoLkNvbnRyYWN0KGNvbmZpZy5jb250cmFjdHMuUGFuZG9yYU1hcmtldC5hYmksIGNvbmZpZy5hZGRyZXNzZXMuUGFuZG9yYU1hcmtldCk7XG4gICAgY29uc3QgY291bnQgPSBhd2FpdCBtYXIubWV0aG9kc1xuICAgICAgICAuZGF0YXNldHNDb3VudCgpXG4gICAgICAgIC5jYWxsKCk7XG5cbiAgICByZXR1cm4gTnVtYmVyLnBhcnNlSW50KGNvdW50LCAxMCk7XG59O1xuXG4vKipcbiAqIEdldCBEYXRhc2V0IGFkZHJlc3MgYnkgZGF0YXNldCBpZFxuICogXG4gKiBAcGFyYW0ge251bWJlcn0gaWRcbiAqIEBwYXJhbSB7T2JqZWN0fSBjb25maWcgTGlicmFyeSBjb25maWcgKHByb3ZpZGVkIGJ5IHRoZSBwcm94eSBidXQgY2FuIGJlIG92ZXJyaWRkZW4pXG4gKiBAcmV0dXJucyB7UHJvbWlzZX0gQSBQcm9taXNlIG9iamVjdCByZXByZXNlbnRzIHRoZSB7c3RyaW5nfVxuICovXG5leHBvcnQgY29uc3QgZmV0Y2hBZGRyZXNzQnlJZCA9IGFzeW5jIChpZCwgY29uZmlnID0ge30pID0+IHtcblxuICAgIGV4cGVjdC5hbGwoY29uZmlnLCB7XG4gICAgICAgICd3ZWIzJzoge1xuICAgICAgICAgICAgdHlwZTogJ29iamVjdCcsXG4gICAgICAgICAgICBjb2RlOiBXRUIzX1JFUVVJUkVEXG4gICAgICAgIH0sXG4gICAgICAgICdjb250cmFjdHMuUGFuZG9yYU1hcmtldC5hYmknOiB7XG4gICAgICAgICAgICB0eXBlOiAnb2JqZWN0JyxcbiAgICAgICAgICAgIGNvZGU6IENPTlRSQUNUX1JFUVVJUkVELFxuICAgICAgICAgICAgYXJnczogWydQYW5kb3JhTWFya2V0J11cbiAgICAgICAgfSxcbiAgICAgICAgJ2FkZHJlc3Nlcy5QYW5kb3JhTWFya2V0Jzoge1xuICAgICAgICAgICAgdHlwZTogJ3N0cmluZycsXG4gICAgICAgICAgICBjb2RlOiBBRERSRVNTX1JFUVVJUkVELFxuICAgICAgICAgICAgYXJnczogWydNYXJrZXQnXVxuICAgICAgICB9XG4gICAgfSk7XG5cbiAgICBjb25zdCBtYXIgPSBuZXcgY29uZmlnLndlYjMuZXRoLkNvbnRyYWN0KGNvbmZpZy5jb250cmFjdHMuUGFuZG9yYU1hcmtldC5hYmksIGNvbmZpZy5hZGRyZXNzZXMuUGFuZG9yYU1hcmtldCk7XG4gICAgY29uc3QgZGF0YXNldENvbnRyYWN0ID0gYXdhaXQgbWFyLm1ldGhvZHNcbiAgICAgICAgLmRhdGFzZXRzKGlkKVxuICAgICAgICAuY2FsbCgpO1xuXG4gICAgcmV0dXJuIGRhdGFzZXRDb250cmFjdDtcbn07XG5cbi8qKlxuICogR2V0IElQRlMgYWRkcmVzcyBmcm9tIERhdGFzZXQgY29udHJhY3QgYnkgdGhlIGRhdGFzZXQgYWRkcmVzc1xuICogXG4gKiBAcGFyYW0ge3N0cmluZ30gYWRkcmVzc1xuICogQHBhcmFtIHtPYmplY3R9IGNvbmZpZyBMaWJyYXJ5IGNvbmZpZyAocHJvdmlkZWQgYnkgdGhlIHByb3h5IGJ1dCBjYW4gYmUgb3ZlcnJpZGRlbilcbiAqIEByZXR1cm5zIHtQcm9taXNlfSBBIFByb21pc2Ugb2JqZWN0IHJlcHJlc2VudHMgdGhlIHtzdHJpbmd9XG4gKi9cbmV4cG9ydCBjb25zdCBmZXRjaElwZnNBZGRyZXNzID0gYXN5bmMgKGFkZHJlc3MgPSAnJywgY29uZmlnID0ge30pID0+IHtcblxuICAgIGV4cGVjdC5hbGwoY29uZmlnLCB7XG4gICAgICAgICd3ZWIzJzoge1xuICAgICAgICAgICAgdHlwZTogJ29iamVjdCcsXG4gICAgICAgICAgICBjb2RlOiBXRUIzX1JFUVVJUkVEXG4gICAgICAgIH0sXG4gICAgICAgICdjb250cmFjdHMuRGF0YXNldC5hYmknOiB7XG4gICAgICAgICAgICB0eXBlOiAnb2JqZWN0JyxcbiAgICAgICAgICAgIGNvZGU6IENPTlRSQUNUX1JFUVVJUkVELFxuICAgICAgICAgICAgYXJnczogWydEYXRhc2V0J11cbiAgICAgICAgfVxuICAgIH0pO1xuXG4gICAgY29uc3QgZGF0ID0gbmV3IGNvbmZpZy53ZWIzLmV0aC5Db250cmFjdChjb25maWcuY29udHJhY3RzLkRhdGFzZXQuYWJpLCBhZGRyZXNzKTtcbiAgICBjb25zdCBpcGZzQWRkcmVzcyA9IGF3YWl0IGRhdC5tZXRob2RzXG4gICAgICAgIC5pcGZzQWRkcmVzcygpXG4gICAgICAgIC5jYWxsKCk7XG5cbiAgICByZXR1cm4gY29uZmlnLndlYjMudXRpbHMuaGV4VG9Bc2NpaShpcGZzQWRkcmVzcyk7XG59O1xuXG4vKipcbiAqIEdldCBkYXRhIGRpbSBmcm9tIERhdGFzZXQgY29udHJhY3QgYnkgdGhlIGRhdGFzZXQgYWRkcmVzc1xuICogXG4gKiBAcGFyYW0ge3N0cmluZ30gYWRkcmVzc1xuICogQHBhcmFtIHtPYmplY3R9IGNvbmZpZyBMaWJyYXJ5IGNvbmZpZyAocHJvdmlkZWQgYnkgdGhlIHByb3h5IGJ1dCBjYW4gYmUgb3ZlcnJpZGRlbilcbiAqIEByZXR1cm5zIHtQcm9taXNlfSBBIFByb21pc2Ugb2JqZWN0IHJlcHJlc2VudHMgdGhlIHtudW1iZXJ9XG4gKi9cbmV4cG9ydCBjb25zdCBmZXRjaERhdGFEaW0gPSBhc3luYyAoYWRkcmVzcyA9ICcnLCBjb25maWcgPSB7fSkgPT4ge1xuXG4gICAgZXhwZWN0LmFsbChjb25maWcsIHtcbiAgICAgICAgJ3dlYjMnOiB7XG4gICAgICAgICAgICB0eXBlOiAnb2JqZWN0JyxcbiAgICAgICAgICAgIGNvZGU6IFdFQjNfUkVRVUlSRURcbiAgICAgICAgfSxcbiAgICAgICAgJ2NvbnRyYWN0cy5EYXRhc2V0LmFiaSc6IHtcbiAgICAgICAgICAgIHR5cGU6ICdvYmplY3QnLFxuICAgICAgICAgICAgY29kZTogQ09OVFJBQ1RfUkVRVUlSRUQsXG4gICAgICAgICAgICBhcmdzOiBbJ0RhdGFzZXQnXVxuICAgICAgICB9XG4gICAgfSk7XG5cbiAgICBjb25zdCBkYXQgPSBuZXcgY29uZmlnLndlYjMuZXRoLkNvbnRyYWN0KGNvbmZpZy5jb250cmFjdHMuRGF0YXNldC5hYmksIGFkZHJlc3MpO1xuICAgIGNvbnN0IGRhdGFEaW0gPSBhd2FpdCBkYXQubWV0aG9kc1xuICAgICAgICAuZGF0YURpbSgpXG4gICAgICAgIC5jYWxsKCk7XG5cbiAgICByZXR1cm4gTnVtYmVyLnBhcnNlSW50KGRhdGFEaW0sIDEwKTtcbn07XG5cbi8qKlxuICogR2V0IGN1cnJlbnQgcHJpY2UgZnJvbSBEYXRhc2V0IGNvbnRyYWN0IGJ5IHRoZSBkYXRhc2V0IGFkZHJlc3NcbiAqIFxuICogQHBhcmFtIHtzdHJpbmd9IGFkZHJlc3NcbiAqIEBwYXJhbSB7T2JqZWN0fSBjb25maWcgTGlicmFyeSBjb25maWcgKHByb3ZpZGVkIGJ5IHRoZSBwcm94eSBidXQgY2FuIGJlIG92ZXJyaWRkZW4pXG4gKiBAcmV0dXJucyB7UHJvbWlzZX0gQSBQcm9taXNlIG9iamVjdCByZXByZXNlbnRzIHRoZSB7bnVtYmVyfVxuICovXG5leHBvcnQgY29uc3QgZmV0Y2hDdXJyZW50UHJpY2UgPSBhc3luYyAoYWRkcmVzcyA9ICcnLCBjb25maWcgPSB7fSkgPT4ge1xuXG4gICAgZXhwZWN0LmFsbChjb25maWcsIHtcbiAgICAgICAgJ3dlYjMnOiB7XG4gICAgICAgICAgICB0eXBlOiAnb2JqZWN0JyxcbiAgICAgICAgICAgIGNvZGU6IFdFQjNfUkVRVUlSRURcbiAgICAgICAgfSxcbiAgICAgICAgJ2NvbnRyYWN0cy5EYXRhc2V0LmFiaSc6IHtcbiAgICAgICAgICAgIHR5cGU6ICdvYmplY3QnLFxuICAgICAgICAgICAgY29kZTogQ09OVFJBQ1RfUkVRVUlSRUQsXG4gICAgICAgICAgICBhcmdzOiBbJ0RhdGFzZXQnXVxuICAgICAgICB9XG4gICAgfSk7XG5cbiAgICBjb25zdCBkYXQgPSBuZXcgY29uZmlnLndlYjMuZXRoLkNvbnRyYWN0KGNvbmZpZy5jb250cmFjdHMuRGF0YXNldC5hYmksIGFkZHJlc3MpO1xuICAgIGNvbnN0IGN1cnJlbnRQcmljZSA9IGF3YWl0IGRhdC5tZXRob2RzXG4gICAgICAgIC5jdXJyZW50UHJpY2UoKVxuICAgICAgICAuY2FsbCgpO1xuXG4gICAgcmV0dXJuIE51bWJlci5wYXJzZUludChjdXJyZW50UHJpY2UsIDEwKTtcbn07XG5cbi8qKlxuICogR2V0IGRhdGEgc2FtcGxlcyBjb3VudCBmcm9tIERhdGFzZXQgY29udHJhY3QgYnkgdGhlIGRhdGFzZXQgYWRkcmVzc1xuICogXG4gKiBAcGFyYW0ge3N0cmluZ30gYWRkcmVzc1xuICogQHBhcmFtIHtPYmplY3R9IGNvbmZpZyBMaWJyYXJ5IGNvbmZpZyAocHJvdmlkZWQgYnkgdGhlIHByb3h5IGJ1dCBjYW4gYmUgb3ZlcnJpZGRlbilcbiAqIEByZXR1cm5zIHtQcm9taXNlfSBBIFByb21pc2Ugb2JqZWN0IHJlcHJlc2VudHMgdGhlIHtudW1iZXJ9XG4gKi9cbmV4cG9ydCBjb25zdCBmZXRjaFNhbXBsZXNDb3VudCA9IGFzeW5jIChhZGRyZXNzID0gJycsIGNvbmZpZyA9IHt9KSA9PiB7XG5cbiAgICBleHBlY3QuYWxsKGNvbmZpZywge1xuICAgICAgICAnd2ViMyc6IHtcbiAgICAgICAgICAgIHR5cGU6ICdvYmplY3QnLFxuICAgICAgICAgICAgY29kZTogV0VCM19SRVFVSVJFRFxuICAgICAgICB9LFxuICAgICAgICAnY29udHJhY3RzLkRhdGFzZXQuYWJpJzoge1xuICAgICAgICAgICAgdHlwZTogJ29iamVjdCcsXG4gICAgICAgICAgICBjb2RlOiBDT05UUkFDVF9SRVFVSVJFRCxcbiAgICAgICAgICAgIGFyZ3M6IFsnRGF0YXNldCddXG4gICAgICAgIH1cbiAgICB9KTtcblxuICAgIGNvbnN0IGRhdCA9IG5ldyBjb25maWcud2ViMy5ldGguQ29udHJhY3QoY29uZmlnLmNvbnRyYWN0cy5EYXRhc2V0LmFiaSwgYWRkcmVzcyk7XG4gICAgY29uc3Qgc2FtcGxlc0NvdW50ID0gYXdhaXQgZGF0Lm1ldGhvZHNcbiAgICAgICAgLnNhbXBsZXNDb3VudCgpXG4gICAgICAgIC5jYWxsKCk7XG5cbiAgICByZXR1cm4gTnVtYmVyLnBhcnNlSW50KHNhbXBsZXNDb3VudCwgMTApO1xufTtcblxuLyoqXG4gKiBHZXQgZGF0YSBiYXRjaGVzIGNvdW50IGZyb20gRGF0YXNldCBjb250cmFjdCBieSB0aGUgZGF0YXNldCBhZGRyZXNzXG4gKiBcbiAqIEBwYXJhbSB7c3RyaW5nfSBhZGRyZXNzXG4gKiBAcGFyYW0ge09iamVjdH0gY29uZmlnIExpYnJhcnkgY29uZmlnIChwcm92aWRlZCBieSB0aGUgcHJveHkgYnV0IGNhbiBiZSBvdmVycmlkZGVuKVxuICogQHJldHVybnMge1Byb21pc2V9IEEgUHJvbWlzZSBvYmplY3QgcmVwcmVzZW50cyB0aGUge251bWJlcn1cbiAqL1xuZXhwb3J0IGNvbnN0IGZldGNoQmF0Y2hlc0NvdW50ID0gYXN5bmMgKGFkZHJlc3MgPSAnJywgY29uZmlnID0ge30pID0+IHtcblxuICAgIGV4cGVjdC5hbGwoY29uZmlnLCB7XG4gICAgICAgICd3ZWIzJzoge1xuICAgICAgICAgICAgdHlwZTogJ29iamVjdCcsXG4gICAgICAgICAgICBjb2RlOiBXRUIzX1JFUVVJUkVEXG4gICAgICAgIH0sXG4gICAgICAgICdjb250cmFjdHMuRGF0YXNldC5hYmknOiB7XG4gICAgICAgICAgICB0eXBlOiAnb2JqZWN0JyxcbiAgICAgICAgICAgIGNvZGU6IENPTlRSQUNUX1JFUVVJUkVELFxuICAgICAgICAgICAgYXJnczogWydEYXRhc2V0J11cbiAgICAgICAgfVxuICAgIH0pO1xuXG4gICAgY29uc3QgZGF0ID0gbmV3IGNvbmZpZy53ZWIzLmV0aC5Db250cmFjdChjb25maWcuY29udHJhY3RzLkRhdGFzZXQuYWJpLCBhZGRyZXNzKTtcbiAgICBjb25zdCBiYXRjaGVzQ291bnQgPSBhd2FpdCBkYXQubWV0aG9kc1xuICAgICAgICAuYmF0Y2hlc0NvdW50KClcbiAgICAgICAgLmNhbGwoKTtcbiAgICAgICAgXG4gICAgcmV0dXJuIE51bWJlci5wYXJzZUludChiYXRjaGVzQ291bnQsIDEwKTtcbn07XG5cbi8qKlxuICogR2V0IGRhdGFzZXQgYnkgdGhlIGRhdGFzZXQgYWRkcmVzc1xuICogXG4gKiBAcGFyYW0ge3N0cmluZ30gYWRkcmVzc1xuICogQHBhcmFtIHtPYmplY3R9IGNvbmZpZyBMaWJyYXJ5IGNvbmZpZyAocHJvdmlkZWQgYnkgdGhlIHByb3h5IGJ1dCBjYW4gYmUgb3ZlcnJpZGRlbilcbiAqIEByZXR1cm5zIHtQcm9taXNlfSBQcm9taXNlIG9iamVjdCByZXByZXNlbnRzIHRoZSB7T2JqZWN0W119XG4gKi9cbmV4cG9ydCBjb25zdCBmZXRjaERhdGFzZXQgPSBhc3luYyAoYWRkcmVzcyA9ICcnLCBjb25maWcgPSB7fSkgPT4ge1xuXG4gICAgY29uc3QgW1xuICAgICAgICBpcGZzQWRkcmVzcyxcbiAgICAgICAgZGF0YURpbSxcbiAgICAgICAgY3VycmVudFByaWNlLFxuICAgICAgICBzYW1wbGVzQ291bnQsXG4gICAgICAgIGJhdGNoZXNDb3VudFxuICAgIF0gPSBhd2FpdCBQcm9taXNlLmFsbChbXG4gICAgICAgIGZldGNoSXBmc0FkZHJlc3MoYWRkcmVzcywgY29uZmlnKSxcbiAgICAgICAgZmV0Y2hEYXRhRGltKGFkZHJlc3MsIGNvbmZpZyksXG4gICAgICAgIGZldGNoQ3VycmVudFByaWNlKGFkZHJlc3MsIGNvbmZpZyksXG4gICAgICAgIGZldGNoU2FtcGxlc0NvdW50KGFkZHJlc3MsIGNvbmZpZyksXG4gICAgICAgIGZldGNoQmF0Y2hlc0NvdW50KGFkZHJlc3MsIGNvbmZpZylcbiAgICBdKTtcblxuICAgIHJldHVybiB7XG4gICAgICAgIGFkZHJlc3MsXG4gICAgICAgIGlwZnNBZGRyZXNzLFxuICAgICAgICBkYXRhRGltLFxuICAgICAgICBjdXJyZW50UHJpY2UsXG4gICAgICAgIHNhbXBsZXNDb3VudCxcbiAgICAgICAgYmF0Y2hlc0NvdW50XG4gICAgfTtcbn07XG5cbi8qKlxuICogR2V0IGRhdGFzZXQgYnkgaWRcbiAqIFxuICogQHBhcmFtIHtpbnRlZ2VyfSBpZCBcbiAqIEBwYXJhbSB7T2JqZWN0fSBjb25maWcgTGlicmFyeSBjb25maWcgKHByb3ZpZGVkIGJ5IHRoZSBwcm94eSBidXQgY2FuIGJlIG92ZXJyaWRkZW4pXG4gKiBAcmV0dXJucyB7UHJvbWlzZX0gQSBQcm9taXNlIG9iamVjdCByZXByZXNlbnRzIHRoZSB7T2JqZWN0fVxuICovXG5leHBvcnQgY29uc3QgZmV0Y2hEYXRhc2V0QnlJZCA9IGFzeW5jIChpZCwgY29uZmlnID0ge30pID0+IHtcbiAgICBcbiAgICBjb25zdCBhZGRyZXNzID0gYXdhaXQgZmV0Y2hBZGRyZXNzQnlJZChpZCwgY29uZmlnKTtcbiAgICBjb25zdCBkYXRhc2V0ID0gYXdhaXQgZmV0Y2hEYXRhc2V0KGFkZHJlc3MsIGNvbmZpZyk7XG5cbiAgICByZXR1cm4gZGF0YXNldDtcbn07XG5cbi8qKlxuICogR2V0IGFsbCBkYXRhc2V0c1xuICogXG4gKiBAcGFyYW0ge09iamVjdH0gY29uZmlnIExpYnJhcnkgY29uZmlnIChwcm92aWRlZCBieSB0aGUgcHJveHkgYnV0IGNhbiBiZSBvdmVycmlkZGVuKVxuICogQHJldHVybnMge1Byb21pc2V9IFByb21pc2Ugb2JqZWN0IHJlcHJlc2VudHMgdGhlIHtPYmplY3RbXX1cbiAqL1xuZXhwb3J0IGNvbnN0IGZldGNoQWxsID0gYXN5bmMgKGNvbmZpZyA9IHt9KSA9PiB7XG5cbiAgICBsZXQgcmVjb3JkcyA9IFtdO1xuICAgIGxldCBlcnJvciA9IFtdO1xuXG4gICAgdHJ5IHtcblxuICAgICAgICBjb25zdCBjb3VudCA9IGF3YWl0IGZldGNoQ291bnQoY29uZmlnKTtcblxuICAgICAgICBmb3IgKGxldCBpPTA7IGkgPCBjb3VudDsgaSsrKSB7XG4gICAgICAgICAgICBcbiAgICAgICAgICAgIHRyeSB7XG5cbiAgICAgICAgICAgICAgICBjb25zdCBkYXRhc2V0ID0gYXdhaXQgZmV0Y2hEYXRhc2V0QnlJZChpLCBjb25maWcpO1xuXG4gICAgICAgICAgICAgICAgcmVjb3Jkcy5wdXNoKHtcbiAgICAgICAgICAgICAgICAgICAgaWQ6IGksXG4gICAgICAgICAgICAgICAgICAgIC4uLmRhdGFzZXRcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH0gY2F0Y2goZXJyKSB7XG4gICAgICAgICAgICAgICAgZXJyb3IucHVzaCh7XG4gICAgICAgICAgICAgICAgICAgIGlkOiBpLFxuICAgICAgICAgICAgICAgICAgICBtZXNzYWdlOiBlcnIubWVzc2FnZVxuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfSAgICAgICAgXG4gICAgICAgIH1cbiAgICB9IGNhdGNoKGVycikge1xuICAgICAgICBlcnJvci5wdXNoKHtcbiAgICAgICAgICAgIGVycm9yOiBlcnIubWVzc2FnZVxuICAgICAgICB9KTtcbiAgICB9ICAgXG5cbiAgICByZXR1cm4ge1xuICAgICAgICByZWNvcmRzLFxuICAgICAgICBlcnJvclxuICAgIH07XG59O1xuXG4vKipcbiAqIERlcGxveSBEYXRzZXQgY29udHJhY3QgdG8gdGhlIG5ldHdvcmtcbiAqIFxuICogQHBhcmFtIHtzdHJpbmd9IGRhdGFzZXRJcGZzSGFzaCBcbiAqIEBwYXJhbSB7T2JqZWN0fSBvcHRpb25zIHsgcHVibGlzaGVyLCBkaW1lbnNpb24sIHNhbXBsZXMsIHByaWNlIH0gXG4gKiBAcGFyYW0ge09iamVjdH0gY29uZmlnIExpYnJhcnkgY29uZmlnIChwcm92aWRlZCBieSB0aGUgcHJveHkgYnV0IGNhbiBiZSBvdmVycmlkZGVuKVxuICogQHJldHVybnMge1Byb21pc2V9IFByb21pc2Ugb2JqZWN0IHJlc29sdmVkIHRvIGNvbnRyYWN0IGFkZHJlc3NcbiAqL1xuZXhwb3J0IGNvbnN0IGRlcGxveSA9IGFzeW5jIChkYXRhc2V0SXBmc0hhc2gsIGJhdGNoZXNDb3VudCwgeyBwdWJsaXNoZXIsIGRpbWVuc2lvbiwgc2FtcGxlcywgcHJpY2UgfSwgY29uZmlnID0ge30pID0+IHtcblxuICAgIGV4cGVjdC5hbGwoY29uZmlnLCB7XG4gICAgICAgICd3ZWIzJzoge1xuICAgICAgICAgICAgdHlwZTogJ29iamVjdCcsXG4gICAgICAgICAgICBjb2RlOiBXRUIzX1JFUVVJUkVEXG4gICAgICAgIH0sXG4gICAgICAgICdjb250cmFjdHMuRGF0YXNldCc6IHtcbiAgICAgICAgICAgIHR5cGU6ICdvYmplY3QnLFxuICAgICAgICAgICAgY29kZTogQ09OVFJBQ1RfUkVRVUlSRUQsXG4gICAgICAgICAgICBhcmdzOiBbJ0RhdGFzZXQnXVxuICAgICAgICB9LFxuICAgICAgICAnd2ViMy5jdXJyZW50UHJvdmlkZXIuaXNNZXRhTWFzayc6IHtcbiAgICAgICAgICAgIHR5cGU6ICdib29sZWFuJyxcbiAgICAgICAgICAgIGNvZGU6IFdFQjNfTUVUQU1BU0tfUkVRVUlSRURcbiAgICAgICAgfVxuICAgIH0pO1xuXG4gICAgY29uc3QgYXJncyA9IFtjb25maWcud2ViMy51dGlscy50b0hleChkYXRhc2V0SXBmc0hhc2gpLCBkaW1lbnNpb24sIHNhbXBsZXMsIGJhdGNoZXNDb3VudCwgcHJpY2VdO1xuICAgICAgICBcbiAgICAvLyBFc3RpbWF0ZSByZXF1aXJlZCBhbW91bnQgb2YgZ2FzXG4gICAgY29uc3QgZ2FzID0gYXdhaXQgd2ViM0hlbHBlcnMuZXN0aW1hdGVHYXMoY29uZmlnLmNvbnRyYWN0cy5EYXRhc2V0LmJ5dGVjb2RlLCBhcmdzLCBjb25maWcpO1xuXG4gICAgLy8gQ3JlYXRlIGFuZCBkZXBsb3kgZGF0YXNldCBjb250cmFjdFxuICAgIGNvbnN0IGRhdGFzZXRDb250cmFjdEFkZHJlc3MgPSBhd2FpdCB3ZWIzSGVscGVycy5kZXBsb3lDb250cmFjdChjb25maWcuY29udHJhY3RzLkRhdGFzZXQsIHtcbiAgICAgICAgYXJncyxcbiAgICAgICAgZnJvbTogcHVibGlzaGVyLFxuICAgICAgICBnYXM6IE51bWJlci5wYXJzZUludChnYXMgKiAxLjUsIDEwKVxuICAgIH0sIGNvbmZpZyk7XG5cbiAgICByZXR1cm4gZGF0YXNldENvbnRyYWN0QWRkcmVzcztcbn07XG5cbi8qKlxuICogQWRkIGRhdGFzZXQgdG8gbWFya2V0XG4gKiBcbiAqIEBwYXJhbSB7U3RyaW5nfSBkYXRhc2V0Q29udHJhY3RBZGRyZXNzIFxuICogQHBhcmFtIHtTdHJpbmd9IHB1Ymxpc2hlckFkZHJlc3MgXG4gKiBAcGFyYW0ge09iamVjdH0gY29uZmlnIExpYnJhcnkgY29uZmlnIChwcm92aWRlZCBieSB0aGUgcHJveHkgYnV0IGNhbiBiZSBvdmVycmlkZGVuKVxuICogQHJldHVybnMge1Byb21pc2V9IFByb21pc2Ugb2JqZWN0IHJlc29sdmVkIHRvIHtzdHJpbmd9IGNvbnRyYWN0QWRkcmVzc1xuICovXG5leHBvcnQgY29uc3QgYWRkVG9NYXJrZXQgPSAoZGF0YXNldENvbnRyYWN0QWRkcmVzcywgcHVibGlzaGVyQWRkcmVzcywgY29uZmlnID0ge30pID0+IG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcblxuICAgIGV4cGVjdC5hbGwoY29uZmlnLCB7XG4gICAgICAgICd3ZWIzJzoge1xuICAgICAgICAgICAgdHlwZTogJ29iamVjdCcsXG4gICAgICAgICAgICBjb2RlOiBXRUIzX1JFUVVJUkVEXG4gICAgICAgIH0sXG4gICAgICAgICdjb250cmFjdHMuUGFuZG9yYU1hcmtldC5hYmknOiB7XG4gICAgICAgICAgICB0eXBlOiAnb2JqZWN0JyxcbiAgICAgICAgICAgIGNvZGU6IENPTlRSQUNUX1JFUVVJUkVELFxuICAgICAgICAgICAgYXJnczogWydQYW5kb3JhTWFya2V0J11cbiAgICAgICAgfSxcbiAgICAgICAgJ2FkZHJlc3Nlcy5QYW5kb3JhTWFya2V0Jzoge1xuICAgICAgICAgICAgdHlwZTogJ3N0cmluZycsXG4gICAgICAgICAgICBjb2RlOiBBRERSRVNTX1JFUVVJUkVELFxuICAgICAgICAgICAgYXJnczogWydNYXJrZXQnXVxuICAgICAgICB9LFxuICAgICAgICAnd2ViMy5jdXJyZW50UHJvdmlkZXIuaXNNZXRhTWFzayc6IHtcbiAgICAgICAgICAgIHR5cGU6ICdib29sZWFuJyxcbiAgICAgICAgICAgIGNvZGU6IFdFQjNfTUVUQU1BU0tfUkVRVUlSRURcbiAgICAgICAgfVxuICAgIH0pO1xuXG4gICAgY29uc3QgbWFya2V0ID0gbmV3IGNvbmZpZy53ZWIzLmV0aC5Db250cmFjdChjb25maWcuY29udHJhY3RzLlBhbmRvcmFNYXJrZXQuYWJpLCBjb25maWcuYWRkcmVzc2VzLlBhbmRvcmFNYXJrZXQpO1xuICAgIG1hcmtldC5tZXRob2RzXG4gICAgICAgIC5hZGREYXRhc2V0KGRhdGFzZXRDb250cmFjdEFkZHJlc3MpXG4gICAgICAgIC5zZW5kKHtcbiAgICAgICAgICAgIGZyb206IHB1Ymxpc2hlckFkZHJlc3NcbiAgICAgICAgfSlcbiAgICAgICAgLm9uKCdlcnJvcicsIHJlamVjdClcbiAgICAgICAgLm9uKCdyZWNlaXB0JywgcmVjZWlwdCA9PiB7XG5cbiAgICAgICAgICAgIGlmIChOdW1iZXIocmVjZWlwdC5zdGF0dXMpID09PSAwKSB7XG5cbiAgICAgICAgICAgICAgICByZXR1cm4gcmVqZWN0KHBqc0Vycm9yKFRSQU5TQUNUSU9OX1VOU1VDQ0VTU0ZVTCkpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICByZXNvbHZlKHJlY2VpcHQuY29udHJhY3RBZGRyZXNzIHx8IHJlY2VpcHQuZXZlbnRzLkRhdGFzZXRBZGRlZC5yZXR1cm5WYWx1ZXMuZGF0YXNldCk7XG4gICAgICAgIH0pO1xuICAgIC8vIEBub3RlIEluIGNhc2Ugb2YgZ2FuYWNoZS1jbGkgYmxvY2tjaGFpbiBcImNvbnRyYWN0QWRkcmVzc1wiIGFsd2F5cyB3aWxsIGJlIGVxdWFsIHRvIG51bGxcbn0pO1xuXG4vKipcbiAqIFJlbW92ZSBkYXRhc2V0IGZyb20gUGFuZG9yYU1hcmtldFxuICogXG4gKiBAcGFyYW0ge1N0cmluZ30gZGF0YXNldEFkZHJlc3NcbiAqIEBwYXJhbSB7U3RyaW5nfSBwdWJsaXNoZXJBZGRyZXNzIFxuICogQHBhcmFtIHtPYmplY3R9IGNvbmZpZyBMaWJyYXJ5IGNvbmZpZyAocHJvdmlkZWQgYnkgdGhlIHByb3h5IGJ1dCBjYW4gYmUgb3ZlcnJpZGRlbikgXG4gKi9cbmV4cG9ydCBjb25zdCByZW1vdmVEYXRhc2V0ID0gKGRhdGFzZXRBZGRyZXNzLCBwdWJsaXNoZXJBZGRyZXNzLCBjb25maWcgPSB7fSkgPT4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuXG4gICAgZXhwZWN0LmFsbChjb25maWcsIHtcbiAgICAgICAgJ3dlYjMnOiB7XG4gICAgICAgICAgICB0eXBlOiAnb2JqZWN0JyxcbiAgICAgICAgICAgIGNvZGU6IFdFQjNfUkVRVUlSRURcbiAgICAgICAgfSxcbiAgICAgICAgJ2NvbnRyYWN0cy5QYW5kb3JhTWFya2V0LmFiaSc6IHtcbiAgICAgICAgICAgIHR5cGU6ICdvYmplY3QnLFxuICAgICAgICAgICAgY29kZTogQ09OVFJBQ1RfUkVRVUlSRUQsXG4gICAgICAgICAgICBhcmdzOiBbJ1BhbmRvcmFNYXJrZXQnXVxuICAgICAgICB9LFxuICAgICAgICAnYWRkcmVzc2VzLlBhbmRvcmFNYXJrZXQnOiB7XG4gICAgICAgICAgICB0eXBlOiAnc3RyaW5nJyxcbiAgICAgICAgICAgIGNvZGU6IEFERFJFU1NfUkVRVUlSRUQsXG4gICAgICAgICAgICBhcmdzOiBbJ0tlcm5lbCddXG4gICAgICAgIH1cbiAgICB9KTtcblxuICAgIGNvbnN0IG1hcmtldCA9IG5ldyBjb25maWcud2ViMy5ldGguQ29udHJhY3QoY29uZmlnLmNvbnRyYWN0cy5QYW5kb3JhTWFya2V0LmFiaSwgY29uZmlnLmFkZHJlc3Nlcy5QYW5kb3JhTWFya2V0KTtcbiAgICBtYXJrZXQubWV0aG9kc1xuICAgICAgICAucmVtb3ZlRGF0YXNldChkYXRhc2V0QWRkcmVzcylcbiAgICAgICAgLnNlbmQoe1xuICAgICAgICAgICAgZnJvbTogcHVibGlzaGVyQWRkcmVzc1xuICAgICAgICB9KVxuICAgICAgICAub24oJ2Vycm9yJywgcmVqZWN0KVxuICAgICAgICAub24oJ3JlY2VpcHQnLCByZWNlaXB0ID0+IHtcblxuICAgICAgICAgICAgaWYgKE51bWJlcihyZWNlaXB0LnN0YXR1cykgPT09IDApIHtcblxuICAgICAgICAgICAgICAgIHJldHVybiByZWplY3QocGpzRXJyb3IoVFJBTlNBQ1RJT05fVU5TVUNDRVNTRlVMKSk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHJlc29sdmUocmVjZWlwdC5jb250cmFjdEFkZHJlc3MpO1xuICAgICAgICB9KTtcbn0pO1xuXG4vKipcbiAqIEhhbmRsZSBldmVudCBEYXRhc2V0QWRkZWRcbiAqIFxuICogQHBhcmFtIHtPYmplY3R9IG9wdGlvbnMgRXZlbnQgaGFuZGxlciBvcHRpb25zXG4gKiBAcGFyYW0ge09iamVjdH0gY29uZmlnIExpYnJhcnkgY29uZmlnIChwcm92aWRlZCBieSB0aGUgcHJveHkgYnV0IGNhbiBiZSBvdmVycmlkZGVuKVxuICogQHJldHVybnMge09iamVjdH0gT2JqZWN0IHdpdGggY2hhaW5lZCBjYWxsYmFja3MgI2RhdGEgYW5kICNlcnJvclxuICovXG5leHBvcnQgY29uc3QgZXZlbnREYXRhc2V0QWRkZWQgPSAob3B0aW9ucyA9IHt9LCBjb25maWcgPSB7fSkgPT4ge1xuXG4gICAgZXhwZWN0LmFsbChjb25maWcsIHtcbiAgICAgICAgJ3dlYjMnOiB7XG4gICAgICAgICAgICB0eXBlOiAnb2JqZWN0JyxcbiAgICAgICAgICAgIGNvZGU6IFdFQjNfUkVRVUlSRURcbiAgICAgICAgfSxcbiAgICAgICAgJ2NvbnRyYWN0cy5QYW5kb3JhTWFya2V0LmFiaSc6IHtcbiAgICAgICAgICAgIHR5cGU6ICdvYmplY3QnLFxuICAgICAgICAgICAgY29kZTogQ09OVFJBQ1RfUkVRVUlSRUQsXG4gICAgICAgICAgICBhcmdzOiBbJ1BhbmRvcmFNYXJrZXQnXVxuICAgICAgICB9LFxuICAgICAgICAnYWRkcmVzc2VzLlBhbmRvcmFNYXJrZXQnOiB7XG4gICAgICAgICAgICB0eXBlOiAnc3RyaW5nJyxcbiAgICAgICAgICAgIGNvZGU6IEFERFJFU1NfUkVRVUlSRUQsXG4gICAgICAgICAgICBhcmdzOiBbJ01hcmtldCddXG4gICAgICAgIH1cbiAgICB9KTtcblxuICAgIGNvbnN0IGNhbGxiYWNrcyA9IHtcbiAgICAgICAgb25EYXRhOiAoKSA9PiB7fSxcbiAgICAgICAgb25FcnJvcjogKCkgPT4ge31cbiAgICB9O1xuXG4gICAgY29uc3QgY2hhaW4gPSB7XG4gICAgICAgIGRhdGE6IChjYiA9ICgpID0+IHt9KSA9PiB7XG4gICAgICAgICAgICBjYWxsYmFja3Mub25EYXRhID0gY2I7XG4gICAgICAgICAgICByZXR1cm4gY2hhaW47XG4gICAgICAgIH0sXG4gICAgICAgIGVycm9yOiAoY2IgPSAoKSA9PiB7fSkgPT4ge1xuICAgICAgICAgICAgY2FsbGJhY2tzLm9uRXJyb3IgPSBjYjtcbiAgICAgICAgICAgIHJldHVybiBjaGFpbjtcbiAgICAgICAgfVxuICAgIH07XG5cbiAgICBjb25zdCBtYXIgPSBuZXcgY29uZmlnLndlYjMuZXRoLkNvbnRyYWN0KGNvbmZpZy5jb250cmFjdHMuUGFuZG9yYU1hcmtldC5hYmksIGNvbmZpZy5hZGRyZXNzZXMuUGFuZG9yYU1hcmtldCk7XG4gICAgbWFyLmV2ZW50cy5EYXRhc2V0QWRkZWQob3B0aW9ucylcbiAgICAgICAgLm9uKCdkYXRhJywgYXN5bmMgcmVzID0+IHtcblxuICAgICAgICAgICAgdHJ5IHtcblxuICAgICAgICAgICAgICAgIGNvbnN0IGRhdGFzZXQgPSBhd2FpdCBmZXRjaERhdGFzZXQocmVzLnJldHVyblZhbHVlcy5kYXRhc2V0LCBjb25maWcpO1xuICAgICAgICAgICAgICAgIGNhbGxiYWNrcy5vbkRhdGEoe1xuICAgICAgICAgICAgICAgICAgICBhZGRyZXNzOiByZXMucmV0dXJuVmFsdWVzLmRhdGFzZXQsXG4gICAgICAgICAgICAgICAgICAgIGRhdGFzZXQsXG4gICAgICAgICAgICAgICAgICAgIHN0YXR1czogJ2NyZWF0ZWQnLFxuICAgICAgICAgICAgICAgICAgICBldmVudDogJ1BhbmRvcmFNYXJrZXQuRGF0YXNldEFkZGVkJ1xuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfSBjYXRjaChlcnIpIHtcbiAgICAgICAgICAgICAgICBjYWxsYmFja3Mub25FcnJvcihlcnIpO1xuICAgICAgICAgICAgfSAgICAgICAgICAgIFxuICAgICAgICB9KVxuICAgICAgICAub24oJ2Vycm9yJywgY2FsbGJhY2tzLm9uRXJyb3IpO1xuXG4gICAgcmV0dXJuIGNoYWluO1xufTtcblxuLyoqXG4gKiBIYW5kbGUgZXZlbnQgRGF0YXNldFJlbW92ZWRcbiAqIFxuICogQHBhcmFtIHtPYmplY3R9IG9wdGlvbnMgRXZlbnQgaGFuZGxlciBvcHRpb25zXG4gKiBAcGFyYW0ge09iamVjdH0gY29uZmlnIExpYnJhcnkgY29uZmlnIChwcm92aWRlZCBieSB0aGUgcHJveHkgYnV0IGNhbiBiZSBvdmVycmlkZGVuKVxuICogQHJldHVybnMge09iamVjdH0gT2JqZWN0IHdpdGggY2hhaW5lZCBjYWxsYmFja3MgI2RhdGEgYW5kICNlcnJvclxuICovXG5leHBvcnQgY29uc3QgZXZlbnREYXRhc2V0UmVtb3ZlZCA9IChvcHRpb25zID0ge30sIGNvbmZpZyA9IHt9KSA9PiB7XG5cbiAgICBleHBlY3QuYWxsKGNvbmZpZywge1xuICAgICAgICAnd2ViMyc6IHtcbiAgICAgICAgICAgIHR5cGU6ICdvYmplY3QnLFxuICAgICAgICAgICAgY29kZTogV0VCM19SRVFVSVJFRFxuICAgICAgICB9LFxuICAgICAgICAnY29udHJhY3RzLlBhbmRvcmFNYXJrZXQuYWJpJzoge1xuICAgICAgICAgICAgdHlwZTogJ29iamVjdCcsXG4gICAgICAgICAgICBjb2RlOiBDT05UUkFDVF9SRVFVSVJFRCxcbiAgICAgICAgICAgIGFyZ3M6IFsnUGFuZG9yYU1hcmtldCddXG4gICAgICAgIH0sXG4gICAgICAgICdhZGRyZXNzZXMuUGFuZG9yYU1hcmtldCc6IHtcbiAgICAgICAgICAgIHR5cGU6ICdzdHJpbmcnLFxuICAgICAgICAgICAgY29kZTogQUREUkVTU19SRVFVSVJFRCxcbiAgICAgICAgICAgIGFyZ3M6IFsnUGFuZG9yYU1hcmtldCddXG4gICAgICAgIH1cbiAgICB9KTtcblxuICAgIGNvbnN0IGNhbGxiYWNrcyA9IHtcbiAgICAgICAgb25EYXRhOiAoKSA9PiB7fSxcbiAgICAgICAgb25FcnJvcjogKCkgPT4ge31cbiAgICB9O1xuXG4gICAgY29uc3QgY2hhaW4gPSB7XG4gICAgICAgIGRhdGE6IChjYiA9ICgpID0+IHt9KSA9PiB7XG4gICAgICAgICAgICBjYWxsYmFja3Mub25EYXRhID0gY2I7XG4gICAgICAgICAgICByZXR1cm4gY2hhaW47XG4gICAgICAgIH0sXG4gICAgICAgIGVycm9yOiAoY2IgPSAoKSA9PiB7fSkgPT4ge1xuICAgICAgICAgICAgY2FsbGJhY2tzLm9uRXJyb3IgPSBjYjtcbiAgICAgICAgICAgIHJldHVybiBjaGFpbjtcbiAgICAgICAgfVxuICAgIH07XG5cbiAgICBjb25zdCBtYXIgPSBuZXcgY29uZmlnLndlYjMuZXRoLkNvbnRyYWN0KGNvbmZpZy5jb250cmFjdHMuUGFuZG9yYU1hcmtldC5hYmksIGNvbmZpZy5hZGRyZXNzZXMuUGFuZG9yYU1hcmtldCk7XG4gICAgbWFyLmV2ZW50cy5EYXRhc2V0UmVtb3ZlZChvcHRpb25zKVxuICAgICAgICAub24oJ2RhdGEnLCBhc3luYyByZXMgPT4ge1xuXG4gICAgICAgICAgICBjYWxsYmFja3Mub25EYXRhKHtcbiAgICAgICAgICAgICAgICBhZGRyZXNzOiByZXMucmV0dXJuVmFsdWVzLmRhdGFzZXQsXG4gICAgICAgICAgICAgICAgc3RhdHVzOiAncmVtb3ZlZCcsXG4gICAgICAgICAgICAgICAgZXZlbnQ6ICdQYW5kb3JhTWFya2V0LkRhdGFzZXRSZW1vdmVkJ1xuICAgICAgICAgICAgfSk7ICAgICAgICAgICAgXG4gICAgICAgIH0pXG4gICAgICAgIC5vbignZXJyb3InLCBjYWxsYmFja3Mub25FcnJvcik7XG5cbiAgICByZXR1cm4gY2hhaW47XG59O1xuIl19