/**
 * Datasets related methods
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
exports.eventKernelRemoved = exports.eventDatasetAdded = exports.removeDataset = exports.addToMarket = exports.deploy = exports.fetchAll = exports.fetchDatasetById = exports.fetchDataset = exports.fetchBatchesCount = exports.fetchSamplesCount = exports.fetchCurrentPrice = exports.fetchDataDim = exports.fetchIpfsAddress = exports.fetchAddressById = exports.fetchCount = void 0;

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
 * Get Dataset address by kernel id
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
  const ipfsAddress = await fetchIpfsAddress(address, config);
  const dataDim = await fetchDataDim(address, config);
  const currentPrice = await fetchCurrentPrice(address, config);
  const samplesCount = await fetchSamplesCount(address, config);
  const batchesCount = await fetchBatchesCount(address, config);
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
 * @param {Object} config Library config (provided by the proxy but can be overridden)
 */


exports.removeDataset = removeDataset;

const eventDatasetAdded = (config = {}) => new Promise((resolve, reject) => {
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
  mar.events.DatasetAdded().on('data', async res => {
    try {
      const dataset = await fetchDataset(res.returnValues.dataset, config);
      resolve({
        address: res.returnValues.dataset,
        dataset,
        status: 'created',
        event: 'PandoraMarket.DatasetAdded'
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


exports.eventDatasetAdded = eventDatasetAdded;

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
      address: res.returnValues.dataset,
      status: 'removed',
      event: 'PandoraMarket.KernelRemoved'
    });
  }).on('error', reject);
});

exports.eventKernelRemoved = eventKernelRemoved;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9kYXRhc2V0cy5qcyJdLCJuYW1lcyI6WyJmZXRjaENvdW50IiwiY29uZmlnIiwiZXhwZWN0IiwiYWxsIiwidHlwZSIsImNvZGUiLCJXRUIzX1JFUVVJUkVEIiwiQ09OVFJBQ1RfUkVRVUlSRUQiLCJhcmdzIiwiQUREUkVTU19SRVFVSVJFRCIsIm1hciIsIndlYjMiLCJldGgiLCJDb250cmFjdCIsImNvbnRyYWN0cyIsIlBhbmRvcmFNYXJrZXQiLCJhYmkiLCJhZGRyZXNzZXMiLCJjb3VudCIsIm1ldGhvZHMiLCJkYXRhc2V0c0NvdW50IiwiY2FsbCIsIk51bWJlciIsInBhcnNlSW50IiwiZmV0Y2hBZGRyZXNzQnlJZCIsImlkIiwiZGF0YXNldENvbnRyYWN0IiwiZGF0YXNldHMiLCJmZXRjaElwZnNBZGRyZXNzIiwiYWRkcmVzcyIsImRhdCIsIkRhdGFzZXQiLCJpcGZzQWRkcmVzcyIsInV0aWxzIiwiaGV4VG9Bc2NpaSIsImZldGNoRGF0YURpbSIsImRhdGFEaW0iLCJmZXRjaEN1cnJlbnRQcmljZSIsImN1cnJlbnRQcmljZSIsImZldGNoU2FtcGxlc0NvdW50Iiwic2FtcGxlc0NvdW50IiwiZmV0Y2hCYXRjaGVzQ291bnQiLCJiYXRjaGVzQ291bnQiLCJmZXRjaERhdGFzZXQiLCJmZXRjaERhdGFzZXRCeUlkIiwiZGF0YXNldCIsImZldGNoQWxsIiwicmVjb3JkcyIsImVycm9yIiwiaSIsInB1c2giLCJlcnIiLCJtZXNzYWdlIiwiZGVwbG95IiwiZGF0YXNldElwZnNIYXNoIiwicHVibGlzaGVyIiwiZGltZW5zaW9uIiwic2FtcGxlcyIsInByaWNlIiwiV0VCM19NRVRBTUFTS19SRVFVSVJFRCIsInRvSGV4IiwiZ2FzIiwid2ViM0hlbHBlcnMiLCJlc3RpbWF0ZUdhcyIsImJ5dGVjb2RlIiwiZGF0YXNldENvbnRyYWN0QWRkcmVzcyIsImRlcGxveUNvbnRyYWN0IiwiZnJvbSIsImFkZFRvTWFya2V0IiwicHVibGlzaGVyQWRkcmVzcyIsIlByb21pc2UiLCJyZXNvbHZlIiwicmVqZWN0IiwibWFya2V0IiwiYWRkRGF0YXNldCIsInNlbmQiLCJvbiIsInJlY2VpcHQiLCJzdGF0dXMiLCJUUkFOU0FDVElPTl9VTlNVQ0NFU1NGVUwiLCJjb250cmFjdEFkZHJlc3MiLCJldmVudHMiLCJEYXRhc2V0QWRkZWQiLCJyZXR1cm5WYWx1ZXMiLCJyZW1vdmVEYXRhc2V0IiwiZGF0YXNldEFkZHJlc3MiLCJldmVudERhdGFzZXRBZGRlZCIsInJlcyIsImV2ZW50IiwiZXZlbnRLZXJuZWxSZW1vdmVkIiwiS2VybmVsUmVtb3ZlZCJdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7Ozs7O0FBU0E7Ozs7Ozs7QUFFQTs7QUFDQTs7QUFPQTs7Ozs7Ozs7QUFFQTs7Ozs7O0FBTU8sTUFBTUEsYUFBYSxPQUFPQyxTQUFTLEVBQWhCLEtBQXVCO0FBRTdDQyxTQUFPQyxHQUFQLENBQVdGLE1BQVgsRUFBbUI7QUFDZixZQUFRO0FBQ0pHLFlBQU0sUUFERjtBQUVKQyxZQUFNQztBQUZGLEtBRE87QUFLZixtQ0FBK0I7QUFDM0JGLFlBQU0sUUFEcUI7QUFFM0JDLFlBQU1FLHlCQUZxQjtBQUczQkMsWUFBTSxDQUFDLGVBQUQ7QUFIcUIsS0FMaEI7QUFVZiwrQkFBMkI7QUFDdkJKLFlBQU0sUUFEaUI7QUFFdkJDLFlBQU1JLHdCQUZpQjtBQUd2QkQsWUFBTSxDQUFDLGVBQUQ7QUFIaUI7QUFWWixHQUFuQjtBQWlCQSxRQUFNRSxNQUFNLElBQUlULE9BQU9VLElBQVAsQ0FBWUMsR0FBWixDQUFnQkMsUUFBcEIsQ0FBNkJaLE9BQU9hLFNBQVAsQ0FBaUJDLGFBQWpCLENBQStCQyxHQUE1RCxFQUFpRWYsT0FBT2dCLFNBQVAsQ0FBaUJGLGFBQWxGLENBQVo7QUFDQSxRQUFNRyxRQUFRLE1BQU1SLElBQUlTLE9BQUosQ0FDZkMsYUFEZSxHQUVmQyxJQUZlLEVBQXBCO0FBSUEsU0FBT0MsT0FBT0MsUUFBUCxDQUFnQkwsS0FBaEIsRUFBdUIsRUFBdkIsQ0FBUDtBQUNILENBekJNO0FBMkJQ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QjtBQVVmLCtCQUEyQjtBQUN2QkosWUFBTSxRQURpQjtBQUV2QkMsWUFBTUksd0JBRmlCO0FBR3ZCRCxZQUFNLENBQUMsUUFBRDtBQUhpQjtBQVZaLEdBQW5CO0FBaUJBLFFBQU1FLE1BQU0sSUFBSVQsT0FBT1UsSUFBUCxDQUFZQyxHQUFaLENBQWdCQyxRQUFwQixDQUE2QlosT0FBT2EsU0FBUCxDQUFpQkMsYUFBakIsQ0FBK0JDLEdBQTVELEVBQWlFZixPQUFPZ0IsU0FBUCxDQUFpQkYsYUFBbEYsQ0FBWjtBQUNBTCxNQUFJdUUsTUFBSixDQUFXUyxhQUFYLEdBQ0tkLEVBREwsQ0FDUSxNQURSLEVBQ2dCLE1BQU1XLEdBQU4sSUFBYTtBQUVyQmhCLFlBQVE7QUFDSjFDLGVBQVMwRCxJQUFJSixZQUFKLENBQWlCdEMsT0FEdEI7QUFFSmlDLGNBQVEsU0FGSjtBQUdKVSxhQUFPO0FBSEgsS0FBUjtBQUtILEdBUkwsRUFTS1osRUFUTCxDQVNRLE9BVFIsRUFTaUJKLE1BVGpCO0FBVUgsQ0E5QmtELENBQTVDIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBEYXRhc2V0cyByZWxhdGVkIG1ldGhvZHNcbiAqIFRoaXMgZmlsZSBpdCBpcyBhIHBhcnQgb2YgdGhlIFBhbmRvcmEgUHlycmhhIEphdmFzY3JpcHQgbGlicmFyeVxuICogXG4gKiBAZmlsZSBrZXJuZWxzLmpzXG4gKiBAYXV0aG9yIEtvc3RpYW50eW4gU215cm5vdiA8a29zdHlzaEBnbWFpbC5jb20+XG4gKiBAZGF0ZSAyMDE4XG4gKi9cblxuJ3VzZSBzdHJpY3QnO1xuXG5pbXBvcnQgKiBhcyBleHBlY3QgZnJvbSAnLi9oZWxwZXJzL2V4cGVjdCc7XG5pbXBvcnQgcGpzRXJyb3IsIHtcbiAgICBDT05UUkFDVF9SRVFVSVJFRCxcbiAgICBBRERSRVNTX1JFUVVJUkVELFxuICAgIFdFQjNfUkVRVUlSRUQsXG4gICAgV0VCM19NRVRBTUFTS19SRVFVSVJFRCxcbiAgICBUUkFOU0FDVElPTl9VTlNVQ0NFU1NGVUxcbn0gZnJvbSAnLi9oZWxwZXJzL2Vycm9ycyc7XG5pbXBvcnQgKiBhcyB3ZWIzSGVscGVycyBmcm9tICcuL2hlbHBlcnMvd2ViMyc7XG5cbi8qKlxuICogR2V0IGRhdGFzZXRzIGNvdW50IGZyb20gUGFuZG9yYU1hcmtldCBjb250cmFjdFxuICogXG4gKiBAcGFyYW0ge09iamVjdH0gY29uZmlnIExpYnJhcnkgY29uZmlnIChwcm92aWRlZCBieSB0aGUgcHJveHkgYnV0IGNhbiBiZSBvdmVycmlkZGVuKVxuICogQHJldHVybnMge1Byb21pc2V9IEEgUHJvbWlzZSBvYmplY3QgcmVwcmVzZW50cyB0aGUge251bWJlcn0gXG4gKi9cbmV4cG9ydCBjb25zdCBmZXRjaENvdW50ID0gYXN5bmMgKGNvbmZpZyA9IHt9KSA9PiB7XG5cbiAgICBleHBlY3QuYWxsKGNvbmZpZywge1xuICAgICAgICAnd2ViMyc6IHtcbiAgICAgICAgICAgIHR5cGU6ICdvYmplY3QnLFxuICAgICAgICAgICAgY29kZTogV0VCM19SRVFVSVJFRFxuICAgICAgICB9LFxuICAgICAgICAnY29udHJhY3RzLlBhbmRvcmFNYXJrZXQuYWJpJzoge1xuICAgICAgICAgICAgdHlwZTogJ29iamVjdCcsXG4gICAgICAgICAgICBjb2RlOiBDT05UUkFDVF9SRVFVSVJFRCxcbiAgICAgICAgICAgIGFyZ3M6IFsnUGFuZG9yYU1hcmtldCddXG4gICAgICAgIH0sXG4gICAgICAgICdhZGRyZXNzZXMuUGFuZG9yYU1hcmtldCc6IHtcbiAgICAgICAgICAgIHR5cGU6ICdzdHJpbmcnLFxuICAgICAgICAgICAgY29kZTogQUREUkVTU19SRVFVSVJFRCxcbiAgICAgICAgICAgIGFyZ3M6IFsnUGFuZG9yYU1hcmtldCddXG4gICAgICAgIH1cbiAgICB9KTtcblxuICAgIGNvbnN0IG1hciA9IG5ldyBjb25maWcud2ViMy5ldGguQ29udHJhY3QoY29uZmlnLmNvbnRyYWN0cy5QYW5kb3JhTWFya2V0LmFiaSwgY29uZmlnLmFkZHJlc3Nlcy5QYW5kb3JhTWFya2V0KTtcbiAgICBjb25zdCBjb3VudCA9IGF3YWl0IG1hci5tZXRob2RzXG4gICAgICAgIC5kYXRhc2V0c0NvdW50KClcbiAgICAgICAgLmNhbGwoKTtcblxuICAgIHJldHVybiBOdW1iZXIucGFyc2VJbnQoY291bnQsIDEwKTtcbn07XG5cbi8qKlxuICogR2V0IERhdGFzZXQgYWRkcmVzcyBieSBrZXJuZWwgaWRcbiAqIFxuICogQHBhcmFtIHtudW1iZXJ9IGlkXG4gKiBAcGFyYW0ge09iamVjdH0gY29uZmlnIExpYnJhcnkgY29uZmlnIChwcm92aWRlZCBieSB0aGUgcHJveHkgYnV0IGNhbiBiZSBvdmVycmlkZGVuKVxuICogQHJldHVybnMge1Byb21pc2V9IEEgUHJvbWlzZSBvYmplY3QgcmVwcmVzZW50cyB0aGUge3N0cmluZ31cbiAqL1xuZXhwb3J0IGNvbnN0IGZldGNoQWRkcmVzc0J5SWQgPSBhc3luYyAoaWQsIGNvbmZpZyA9IHt9KSA9PiB7XG5cbiAgICBleHBlY3QuYWxsKGNvbmZpZywge1xuICAgICAgICAnd2ViMyc6IHtcbiAgICAgICAgICAgIHR5cGU6ICdvYmplY3QnLFxuICAgICAgICAgICAgY29kZTogV0VCM19SRVFVSVJFRFxuICAgICAgICB9LFxuICAgICAgICAnY29udHJhY3RzLlBhbmRvcmFNYXJrZXQuYWJpJzoge1xuICAgICAgICAgICAgdHlwZTogJ29iamVjdCcsXG4gICAgICAgICAgICBjb2RlOiBDT05UUkFDVF9SRVFVSVJFRCxcbiAgICAgICAgICAgIGFyZ3M6IFsnUGFuZG9yYU1hcmtldCddXG4gICAgICAgIH0sXG4gICAgICAgICdhZGRyZXNzZXMuUGFuZG9yYU1hcmtldCc6IHtcbiAgICAgICAgICAgIHR5cGU6ICdzdHJpbmcnLFxuICAgICAgICAgICAgY29kZTogQUREUkVTU19SRVFVSVJFRCxcbiAgICAgICAgICAgIGFyZ3M6IFsnTWFya2V0J11cbiAgICAgICAgfVxuICAgIH0pO1xuXG4gICAgY29uc3QgbWFyID0gbmV3IGNvbmZpZy53ZWIzLmV0aC5Db250cmFjdChjb25maWcuY29udHJhY3RzLlBhbmRvcmFNYXJrZXQuYWJpLCBjb25maWcuYWRkcmVzc2VzLlBhbmRvcmFNYXJrZXQpO1xuICAgIGNvbnN0IGRhdGFzZXRDb250cmFjdCA9IGF3YWl0IG1hci5tZXRob2RzXG4gICAgICAgIC5kYXRhc2V0cyhpZClcbiAgICAgICAgLmNhbGwoKTtcblxuICAgIHJldHVybiBkYXRhc2V0Q29udHJhY3Q7XG59O1xuXG4vKipcbiAqIEdldCBJUEZTIGFkZHJlc3MgZnJvbSBEYXRhc2V0IGNvbnRyYWN0IGJ5IHRoZSBkYXRhc2V0IGFkZHJlc3NcbiAqIFxuICogQHBhcmFtIHtzdHJpbmd9IGFkZHJlc3NcbiAqIEBwYXJhbSB7T2JqZWN0fSBjb25maWcgTGlicmFyeSBjb25maWcgKHByb3ZpZGVkIGJ5IHRoZSBwcm94eSBidXQgY2FuIGJlIG92ZXJyaWRkZW4pXG4gKiBAcmV0dXJucyB7UHJvbWlzZX0gQSBQcm9taXNlIG9iamVjdCByZXByZXNlbnRzIHRoZSB7c3RyaW5nfVxuICovXG5leHBvcnQgY29uc3QgZmV0Y2hJcGZzQWRkcmVzcyA9IGFzeW5jIChhZGRyZXNzID0gJycsIGNvbmZpZyA9IHt9KSA9PiB7XG5cbiAgICBleHBlY3QuYWxsKGNvbmZpZywge1xuICAgICAgICAnd2ViMyc6IHtcbiAgICAgICAgICAgIHR5cGU6ICdvYmplY3QnLFxuICAgICAgICAgICAgY29kZTogV0VCM19SRVFVSVJFRFxuICAgICAgICB9LFxuICAgICAgICAnY29udHJhY3RzLkRhdGFzZXQuYWJpJzoge1xuICAgICAgICAgICAgdHlwZTogJ29iamVjdCcsXG4gICAgICAgICAgICBjb2RlOiBDT05UUkFDVF9SRVFVSVJFRCxcbiAgICAgICAgICAgIGFyZ3M6IFsnRGF0YXNldCddXG4gICAgICAgIH1cbiAgICB9KTtcblxuICAgIGNvbnN0IGRhdCA9IG5ldyBjb25maWcud2ViMy5ldGguQ29udHJhY3QoY29uZmlnLmNvbnRyYWN0cy5EYXRhc2V0LmFiaSwgYWRkcmVzcyk7XG4gICAgY29uc3QgaXBmc0FkZHJlc3MgPSBhd2FpdCBkYXQubWV0aG9kc1xuICAgICAgICAuaXBmc0FkZHJlc3MoKVxuICAgICAgICAuY2FsbCgpO1xuXG4gICAgcmV0dXJuIGNvbmZpZy53ZWIzLnV0aWxzLmhleFRvQXNjaWkoaXBmc0FkZHJlc3MpO1xufTtcblxuLyoqXG4gKiBHZXQgZGF0YSBkaW0gZnJvbSBEYXRhc2V0IGNvbnRyYWN0IGJ5IHRoZSBkYXRhc2V0IGFkZHJlc3NcbiAqIFxuICogQHBhcmFtIHtzdHJpbmd9IGFkZHJlc3NcbiAqIEBwYXJhbSB7T2JqZWN0fSBjb25maWcgTGlicmFyeSBjb25maWcgKHByb3ZpZGVkIGJ5IHRoZSBwcm94eSBidXQgY2FuIGJlIG92ZXJyaWRkZW4pXG4gKiBAcmV0dXJucyB7UHJvbWlzZX0gQSBQcm9taXNlIG9iamVjdCByZXByZXNlbnRzIHRoZSB7bnVtYmVyfVxuICovXG5leHBvcnQgY29uc3QgZmV0Y2hEYXRhRGltID0gYXN5bmMgKGFkZHJlc3MgPSAnJywgY29uZmlnID0ge30pID0+IHtcblxuICAgIGV4cGVjdC5hbGwoY29uZmlnLCB7XG4gICAgICAgICd3ZWIzJzoge1xuICAgICAgICAgICAgdHlwZTogJ29iamVjdCcsXG4gICAgICAgICAgICBjb2RlOiBXRUIzX1JFUVVJUkVEXG4gICAgICAgIH0sXG4gICAgICAgICdjb250cmFjdHMuRGF0YXNldC5hYmknOiB7XG4gICAgICAgICAgICB0eXBlOiAnb2JqZWN0JyxcbiAgICAgICAgICAgIGNvZGU6IENPTlRSQUNUX1JFUVVJUkVELFxuICAgICAgICAgICAgYXJnczogWydEYXRhc2V0J11cbiAgICAgICAgfVxuICAgIH0pO1xuXG4gICAgY29uc3QgZGF0ID0gbmV3IGNvbmZpZy53ZWIzLmV0aC5Db250cmFjdChjb25maWcuY29udHJhY3RzLkRhdGFzZXQuYWJpLCBhZGRyZXNzKTtcbiAgICBjb25zdCBkYXRhRGltID0gYXdhaXQgZGF0Lm1ldGhvZHNcbiAgICAgICAgLmRhdGFEaW0oKVxuICAgICAgICAuY2FsbCgpO1xuXG4gICAgcmV0dXJuIE51bWJlci5wYXJzZUludChkYXRhRGltLCAxMCk7XG59O1xuXG4vKipcbiAqIEdldCBjdXJyZW50IHByaWNlIGZyb20gRGF0YXNldCBjb250cmFjdCBieSB0aGUgZGF0YXNldCBhZGRyZXNzXG4gKiBcbiAqIEBwYXJhbSB7c3RyaW5nfSBhZGRyZXNzXG4gKiBAcGFyYW0ge09iamVjdH0gY29uZmlnIExpYnJhcnkgY29uZmlnIChwcm92aWRlZCBieSB0aGUgcHJveHkgYnV0IGNhbiBiZSBvdmVycmlkZGVuKVxuICogQHJldHVybnMge1Byb21pc2V9IEEgUHJvbWlzZSBvYmplY3QgcmVwcmVzZW50cyB0aGUge251bWJlcn1cbiAqL1xuZXhwb3J0IGNvbnN0IGZldGNoQ3VycmVudFByaWNlID0gYXN5bmMgKGFkZHJlc3MgPSAnJywgY29uZmlnID0ge30pID0+IHtcblxuICAgIGV4cGVjdC5hbGwoY29uZmlnLCB7XG4gICAgICAgICd3ZWIzJzoge1xuICAgICAgICAgICAgdHlwZTogJ29iamVjdCcsXG4gICAgICAgICAgICBjb2RlOiBXRUIzX1JFUVVJUkVEXG4gICAgICAgIH0sXG4gICAgICAgICdjb250cmFjdHMuRGF0YXNldC5hYmknOiB7XG4gICAgICAgICAgICB0eXBlOiAnb2JqZWN0JyxcbiAgICAgICAgICAgIGNvZGU6IENPTlRSQUNUX1JFUVVJUkVELFxuICAgICAgICAgICAgYXJnczogWydEYXRhc2V0J11cbiAgICAgICAgfVxuICAgIH0pO1xuXG4gICAgY29uc3QgZGF0ID0gbmV3IGNvbmZpZy53ZWIzLmV0aC5Db250cmFjdChjb25maWcuY29udHJhY3RzLkRhdGFzZXQuYWJpLCBhZGRyZXNzKTtcbiAgICBjb25zdCBjdXJyZW50UHJpY2UgPSBhd2FpdCBkYXQubWV0aG9kc1xuICAgICAgICAuY3VycmVudFByaWNlKClcbiAgICAgICAgLmNhbGwoKTtcblxuICAgIHJldHVybiBOdW1iZXIucGFyc2VJbnQoY3VycmVudFByaWNlLCAxMCk7XG59O1xuXG4vKipcbiAqIEdldCBkYXRhIHNhbXBsZXMgY291bnQgZnJvbSBEYXRhc2V0IGNvbnRyYWN0IGJ5IHRoZSBkYXRhc2V0IGFkZHJlc3NcbiAqIFxuICogQHBhcmFtIHtzdHJpbmd9IGFkZHJlc3NcbiAqIEBwYXJhbSB7T2JqZWN0fSBjb25maWcgTGlicmFyeSBjb25maWcgKHByb3ZpZGVkIGJ5IHRoZSBwcm94eSBidXQgY2FuIGJlIG92ZXJyaWRkZW4pXG4gKiBAcmV0dXJucyB7UHJvbWlzZX0gQSBQcm9taXNlIG9iamVjdCByZXByZXNlbnRzIHRoZSB7bnVtYmVyfVxuICovXG5leHBvcnQgY29uc3QgZmV0Y2hTYW1wbGVzQ291bnQgPSBhc3luYyAoYWRkcmVzcyA9ICcnLCBjb25maWcgPSB7fSkgPT4ge1xuXG4gICAgZXhwZWN0LmFsbChjb25maWcsIHtcbiAgICAgICAgJ3dlYjMnOiB7XG4gICAgICAgICAgICB0eXBlOiAnb2JqZWN0JyxcbiAgICAgICAgICAgIGNvZGU6IFdFQjNfUkVRVUlSRURcbiAgICAgICAgfSxcbiAgICAgICAgJ2NvbnRyYWN0cy5EYXRhc2V0LmFiaSc6IHtcbiAgICAgICAgICAgIHR5cGU6ICdvYmplY3QnLFxuICAgICAgICAgICAgY29kZTogQ09OVFJBQ1RfUkVRVUlSRUQsXG4gICAgICAgICAgICBhcmdzOiBbJ0RhdGFzZXQnXVxuICAgICAgICB9XG4gICAgfSk7XG5cbiAgICBjb25zdCBkYXQgPSBuZXcgY29uZmlnLndlYjMuZXRoLkNvbnRyYWN0KGNvbmZpZy5jb250cmFjdHMuRGF0YXNldC5hYmksIGFkZHJlc3MpO1xuICAgIGNvbnN0IHNhbXBsZXNDb3VudCA9IGF3YWl0IGRhdC5tZXRob2RzXG4gICAgICAgIC5zYW1wbGVzQ291bnQoKVxuICAgICAgICAuY2FsbCgpO1xuXG4gICAgcmV0dXJuIE51bWJlci5wYXJzZUludChzYW1wbGVzQ291bnQsIDEwKTtcbn07XG5cbi8qKlxuICogR2V0IGRhdGEgYmF0Y2hlcyBjb3VudCBmcm9tIERhdGFzZXQgY29udHJhY3QgYnkgdGhlIGRhdGFzZXQgYWRkcmVzc1xuICogXG4gKiBAcGFyYW0ge3N0cmluZ30gYWRkcmVzc1xuICogQHBhcmFtIHtPYmplY3R9IGNvbmZpZyBMaWJyYXJ5IGNvbmZpZyAocHJvdmlkZWQgYnkgdGhlIHByb3h5IGJ1dCBjYW4gYmUgb3ZlcnJpZGRlbilcbiAqIEByZXR1cm5zIHtQcm9taXNlfSBBIFByb21pc2Ugb2JqZWN0IHJlcHJlc2VudHMgdGhlIHtudW1iZXJ9XG4gKi9cbmV4cG9ydCBjb25zdCBmZXRjaEJhdGNoZXNDb3VudCA9IGFzeW5jIChhZGRyZXNzID0gJycsIGNvbmZpZyA9IHt9KSA9PiB7XG5cbiAgICBleHBlY3QuYWxsKGNvbmZpZywge1xuICAgICAgICAnd2ViMyc6IHtcbiAgICAgICAgICAgIHR5cGU6ICdvYmplY3QnLFxuICAgICAgICAgICAgY29kZTogV0VCM19SRVFVSVJFRFxuICAgICAgICB9LFxuICAgICAgICAnY29udHJhY3RzLkRhdGFzZXQuYWJpJzoge1xuICAgICAgICAgICAgdHlwZTogJ29iamVjdCcsXG4gICAgICAgICAgICBjb2RlOiBDT05UUkFDVF9SRVFVSVJFRCxcbiAgICAgICAgICAgIGFyZ3M6IFsnRGF0YXNldCddXG4gICAgICAgIH1cbiAgICB9KTtcblxuICAgIGNvbnN0IGRhdCA9IG5ldyBjb25maWcud2ViMy5ldGguQ29udHJhY3QoY29uZmlnLmNvbnRyYWN0cy5EYXRhc2V0LmFiaSwgYWRkcmVzcyk7XG4gICAgY29uc3QgYmF0Y2hlc0NvdW50ID0gYXdhaXQgZGF0Lm1ldGhvZHNcbiAgICAgICAgLmJhdGNoZXNDb3VudCgpXG4gICAgICAgIC5jYWxsKCk7XG4gICAgICAgIFxuICAgIHJldHVybiBOdW1iZXIucGFyc2VJbnQoYmF0Y2hlc0NvdW50LCAxMCk7XG59O1xuXG4vKipcbiAqIEdldCBkYXRhc2V0IGJ5IHRoZSBkYXRhc2V0IGFkZHJlc3NcbiAqIFxuICogQHBhcmFtIHtzdHJpbmd9IGFkZHJlc3NcbiAqIEBwYXJhbSB7T2JqZWN0fSBjb25maWcgTGlicmFyeSBjb25maWcgKHByb3ZpZGVkIGJ5IHRoZSBwcm94eSBidXQgY2FuIGJlIG92ZXJyaWRkZW4pXG4gKiBAcmV0dXJucyB7UHJvbWlzZX0gUHJvbWlzZSBvYmplY3QgcmVwcmVzZW50cyB0aGUge09iamVjdFtdfVxuICovXG5leHBvcnQgY29uc3QgZmV0Y2hEYXRhc2V0ID0gYXN5bmMgKGFkZHJlc3MgPSAnJywgY29uZmlnID0ge30pID0+IHtcblxuICAgIGNvbnN0IGlwZnNBZGRyZXNzID0gYXdhaXQgZmV0Y2hJcGZzQWRkcmVzcyhhZGRyZXNzLCBjb25maWcpO1xuICAgIGNvbnN0IGRhdGFEaW0gPSBhd2FpdCBmZXRjaERhdGFEaW0oYWRkcmVzcywgY29uZmlnKTtcbiAgICBjb25zdCBjdXJyZW50UHJpY2UgPSBhd2FpdCBmZXRjaEN1cnJlbnRQcmljZShhZGRyZXNzLCBjb25maWcpO1xuICAgIGNvbnN0IHNhbXBsZXNDb3VudCA9IGF3YWl0IGZldGNoU2FtcGxlc0NvdW50KGFkZHJlc3MsIGNvbmZpZyk7XG4gICAgY29uc3QgYmF0Y2hlc0NvdW50ID0gYXdhaXQgZmV0Y2hCYXRjaGVzQ291bnQoYWRkcmVzcywgY29uZmlnKTtcblxuICAgIHJldHVybiB7XG4gICAgICAgIGFkZHJlc3MsXG4gICAgICAgIGlwZnNBZGRyZXNzLFxuICAgICAgICBkYXRhRGltLFxuICAgICAgICBjdXJyZW50UHJpY2UsXG4gICAgICAgIHNhbXBsZXNDb3VudCxcbiAgICAgICAgYmF0Y2hlc0NvdW50XG4gICAgfTtcbn07XG5cbi8qKlxuICogR2V0IGRhdGFzZXQgYnkgaWRcbiAqIFxuICogQHBhcmFtIHtpbnRlZ2VyfSBpZCBcbiAqIEBwYXJhbSB7T2JqZWN0fSBjb25maWcgTGlicmFyeSBjb25maWcgKHByb3ZpZGVkIGJ5IHRoZSBwcm94eSBidXQgY2FuIGJlIG92ZXJyaWRkZW4pXG4gKiBAcmV0dXJucyB7UHJvbWlzZX0gQSBQcm9taXNlIG9iamVjdCByZXByZXNlbnRzIHRoZSB7T2JqZWN0fVxuICovXG5leHBvcnQgY29uc3QgZmV0Y2hEYXRhc2V0QnlJZCA9IGFzeW5jIChpZCwgY29uZmlnID0ge30pID0+IHtcbiAgICBcbiAgICBjb25zdCBhZGRyZXNzID0gYXdhaXQgZmV0Y2hBZGRyZXNzQnlJZChpZCwgY29uZmlnKTtcbiAgICBjb25zdCBkYXRhc2V0ID0gYXdhaXQgZmV0Y2hEYXRhc2V0KGFkZHJlc3MsIGNvbmZpZyk7XG5cbiAgICByZXR1cm4gZGF0YXNldDtcbn07XG5cbi8qKlxuICogR2V0IGFsbCBkYXRhc2V0c1xuICogXG4gKiBAcGFyYW0ge09iamVjdH0gY29uZmlnIExpYnJhcnkgY29uZmlnIChwcm92aWRlZCBieSB0aGUgcHJveHkgYnV0IGNhbiBiZSBvdmVycmlkZGVuKVxuICogQHJldHVybnMge1Byb21pc2V9IFByb21pc2Ugb2JqZWN0IHJlcHJlc2VudHMgdGhlIHtPYmplY3RbXX1cbiAqL1xuZXhwb3J0IGNvbnN0IGZldGNoQWxsID0gYXN5bmMgKGNvbmZpZyA9IHt9KSA9PiB7XG5cbiAgICBsZXQgcmVjb3JkcyA9IFtdO1xuICAgIGxldCBlcnJvciA9IFtdO1xuXG4gICAgdHJ5IHtcblxuICAgICAgICBjb25zdCBjb3VudCA9IGF3YWl0IGZldGNoQ291bnQoY29uZmlnKTtcblxuICAgICAgICBmb3IgKGxldCBpPTA7IGkgPCBjb3VudDsgaSsrKSB7XG4gICAgICAgICAgICBcbiAgICAgICAgICAgIHRyeSB7XG5cbiAgICAgICAgICAgICAgICBjb25zdCBkYXRhc2V0ID0gYXdhaXQgZmV0Y2hEYXRhc2V0QnlJZChpLCBjb25maWcpO1xuXG4gICAgICAgICAgICAgICAgcmVjb3Jkcy5wdXNoKHtcbiAgICAgICAgICAgICAgICAgICAgaWQ6IGksXG4gICAgICAgICAgICAgICAgICAgIC4uLmRhdGFzZXRcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH0gY2F0Y2goZXJyKSB7XG4gICAgICAgICAgICAgICAgZXJyb3IucHVzaCh7XG4gICAgICAgICAgICAgICAgICAgIGlkOiBpLFxuICAgICAgICAgICAgICAgICAgICBtZXNzYWdlOiBlcnIubWVzc2FnZVxuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfSAgICAgICAgXG4gICAgICAgIH1cbiAgICB9IGNhdGNoKGVycikge1xuICAgICAgICBlcnJvci5wdXNoKHtcbiAgICAgICAgICAgIGVycm9yOiBlcnIubWVzc2FnZVxuICAgICAgICB9KTtcbiAgICB9ICAgXG5cbiAgICByZXR1cm4ge1xuICAgICAgICByZWNvcmRzLFxuICAgICAgICBlcnJvclxuICAgIH07XG59O1xuXG4vKipcbiAqIERlcGxveSBEYXRzZXQgY29udHJhY3QgdG8gdGhlIG5ldHdvcmtcbiAqIFxuICogQHBhcmFtIHtzdHJpbmd9IGRhdGFzZXRJcGZzSGFzaCBcbiAqIEBwYXJhbSB7T2JqZWN0fSBvcHRpb25zIHsgcHVibGlzaGVyLCBkaW1lbnNpb24sIHNhbXBsZXMsIHByaWNlIH0gXG4gKiBAcGFyYW0ge09iamVjdH0gY29uZmlnIExpYnJhcnkgY29uZmlnIChwcm92aWRlZCBieSB0aGUgcHJveHkgYnV0IGNhbiBiZSBvdmVycmlkZGVuKVxuICogQHJldHVybnMge1Byb21pc2V9IFByb21pc2Ugb2JqZWN0IHJlc29sdmVkIHRvIGNvbnRyYWN0IGFkZHJlc3NcbiAqL1xuZXhwb3J0IGNvbnN0IGRlcGxveSA9IGFzeW5jIChkYXRhc2V0SXBmc0hhc2gsIGJhdGNoZXNDb3VudCwgeyBwdWJsaXNoZXIsIGRpbWVuc2lvbiwgc2FtcGxlcywgcHJpY2UgfSwgY29uZmlnID0ge30pID0+IHtcblxuICAgIGV4cGVjdC5hbGwoY29uZmlnLCB7XG4gICAgICAgICd3ZWIzJzoge1xuICAgICAgICAgICAgdHlwZTogJ29iamVjdCcsXG4gICAgICAgICAgICBjb2RlOiBXRUIzX1JFUVVJUkVEXG4gICAgICAgIH0sXG4gICAgICAgICdjb250cmFjdHMuRGF0YXNldCc6IHtcbiAgICAgICAgICAgIHR5cGU6ICdvYmplY3QnLFxuICAgICAgICAgICAgY29kZTogQ09OVFJBQ1RfUkVRVUlSRUQsXG4gICAgICAgICAgICBhcmdzOiBbJ0RhdGFzZXQnXVxuICAgICAgICB9LFxuICAgICAgICAnd2ViMy5jdXJyZW50UHJvdmlkZXIuaXNNZXRhTWFzayc6IHtcbiAgICAgICAgICAgIHR5cGU6ICdib29sZWFuJyxcbiAgICAgICAgICAgIGNvZGU6IFdFQjNfTUVUQU1BU0tfUkVRVUlSRURcbiAgICAgICAgfVxuICAgIH0pO1xuXG4gICAgY29uc3QgYXJncyA9IFtjb25maWcud2ViMy51dGlscy50b0hleChkYXRhc2V0SXBmc0hhc2gpLCBkaW1lbnNpb24sIHNhbXBsZXMsIGJhdGNoZXNDb3VudCwgcHJpY2VdO1xuICAgICAgICBcbiAgICAvLyBFc3RpbWF0ZSByZXF1aXJlZCBhbW91bnQgb2YgZ2FzXG4gICAgY29uc3QgZ2FzID0gYXdhaXQgd2ViM0hlbHBlcnMuZXN0aW1hdGVHYXMoY29uZmlnLmNvbnRyYWN0cy5EYXRhc2V0LmJ5dGVjb2RlLCBhcmdzLCBjb25maWcpO1xuXG4gICAgLy8gQ3JlYXRlIGFuZCBkZXBsb3kgZGF0YXNldCBjb250cmFjdFxuICAgIGNvbnN0IGRhdGFzZXRDb250cmFjdEFkZHJlc3MgPSBhd2FpdCB3ZWIzSGVscGVycy5kZXBsb3lDb250cmFjdChjb25maWcuY29udHJhY3RzLkRhdGFzZXQsIHtcbiAgICAgICAgYXJncyxcbiAgICAgICAgZnJvbTogcHVibGlzaGVyLFxuICAgICAgICBnYXM6IE51bWJlci5wYXJzZUludChnYXMgKiAxLjUsIDEwKVxuICAgIH0sIGNvbmZpZyk7XG5cbiAgICByZXR1cm4gZGF0YXNldENvbnRyYWN0QWRkcmVzcztcbn07XG5cbi8qKlxuICogQWRkIGRhdGFzZXQgdG8gbWFya2V0XG4gKiBcbiAqIEBwYXJhbSB7U3RyaW5nfSBkYXRhc2V0Q29udHJhY3RBZGRyZXNzIFxuICogQHBhcmFtIHtTdHJpbmd9IHB1Ymxpc2hlckFkZHJlc3MgXG4gKiBAcGFyYW0ge09iamVjdH0gY29uZmlnIExpYnJhcnkgY29uZmlnIChwcm92aWRlZCBieSB0aGUgcHJveHkgYnV0IGNhbiBiZSBvdmVycmlkZGVuKVxuICogQHJldHVybnMge1Byb21pc2V9IFByb21pc2Ugb2JqZWN0IHJlc29sdmVkIHRvIHtzdHJpbmd9IGNvbnRyYWN0QWRkcmVzc1xuICovXG5leHBvcnQgY29uc3QgYWRkVG9NYXJrZXQgPSAoZGF0YXNldENvbnRyYWN0QWRkcmVzcywgcHVibGlzaGVyQWRkcmVzcywgY29uZmlnID0ge30pID0+IG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcblxuICAgIGV4cGVjdC5hbGwoY29uZmlnLCB7XG4gICAgICAgICd3ZWIzJzoge1xuICAgICAgICAgICAgdHlwZTogJ29iamVjdCcsXG4gICAgICAgICAgICBjb2RlOiBXRUIzX1JFUVVJUkVEXG4gICAgICAgIH0sXG4gICAgICAgICdjb250cmFjdHMuUGFuZG9yYU1hcmtldC5hYmknOiB7XG4gICAgICAgICAgICB0eXBlOiAnb2JqZWN0JyxcbiAgICAgICAgICAgIGNvZGU6IENPTlRSQUNUX1JFUVVJUkVELFxuICAgICAgICAgICAgYXJnczogWydQYW5kb3JhTWFya2V0J11cbiAgICAgICAgfSxcbiAgICAgICAgJ2FkZHJlc3Nlcy5QYW5kb3JhTWFya2V0Jzoge1xuICAgICAgICAgICAgdHlwZTogJ3N0cmluZycsXG4gICAgICAgICAgICBjb2RlOiBBRERSRVNTX1JFUVVJUkVELFxuICAgICAgICAgICAgYXJnczogWydNYXJrZXQnXVxuICAgICAgICB9LFxuICAgICAgICAnd2ViMy5jdXJyZW50UHJvdmlkZXIuaXNNZXRhTWFzayc6IHtcbiAgICAgICAgICAgIHR5cGU6ICdib29sZWFuJyxcbiAgICAgICAgICAgIGNvZGU6IFdFQjNfTUVUQU1BU0tfUkVRVUlSRURcbiAgICAgICAgfVxuICAgIH0pO1xuXG4gICAgY29uc3QgbWFya2V0ID0gbmV3IGNvbmZpZy53ZWIzLmV0aC5Db250cmFjdChjb25maWcuY29udHJhY3RzLlBhbmRvcmFNYXJrZXQuYWJpLCBjb25maWcuYWRkcmVzc2VzLlBhbmRvcmFNYXJrZXQpO1xuICAgIG1hcmtldC5tZXRob2RzXG4gICAgICAgIC5hZGREYXRhc2V0KGRhdGFzZXRDb250cmFjdEFkZHJlc3MpXG4gICAgICAgIC5zZW5kKHtcbiAgICAgICAgICAgIGZyb206IHB1Ymxpc2hlckFkZHJlc3NcbiAgICAgICAgfSlcbiAgICAgICAgLm9uKCdlcnJvcicsIHJlamVjdClcbiAgICAgICAgLm9uKCdyZWNlaXB0JywgcmVjZWlwdCA9PiB7XG5cbiAgICAgICAgICAgIGlmIChOdW1iZXIocmVjZWlwdC5zdGF0dXMpID09PSAwKSB7XG5cbiAgICAgICAgICAgICAgICByZXR1cm4gcmVqZWN0KHBqc0Vycm9yKFRSQU5TQUNUSU9OX1VOU1VDQ0VTU0ZVTCkpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICByZXNvbHZlKHJlY2VpcHQuY29udHJhY3RBZGRyZXNzIHx8IHJlY2VpcHQuZXZlbnRzLkRhdGFzZXRBZGRlZC5yZXR1cm5WYWx1ZXMuZGF0YXNldCk7XG4gICAgICAgIH0pO1xuICAgIC8vIEBub3RlIEluIGNhc2Ugb2YgZ2FuYWNoZS1jbGkgYmxvY2tjaGFpbiBcImNvbnRyYWN0QWRkcmVzc1wiIGFsd2F5cyB3aWxsIGJlIGVxdWFsIHRvIG51bGxcbn0pO1xuXG4vKipcbiAqIFJlbW92ZSBkYXRhc2V0IGZyb20gUGFuZG9yYU1hcmtldFxuICogXG4gKiBAcGFyYW0ge1N0cmluZ30gZGF0YXNldEFkZHJlc3NcbiAqIEBwYXJhbSB7U3RyaW5nfSBwdWJsaXNoZXJBZGRyZXNzIFxuICogQHBhcmFtIHtPYmplY3R9IGNvbmZpZyBMaWJyYXJ5IGNvbmZpZyAocHJvdmlkZWQgYnkgdGhlIHByb3h5IGJ1dCBjYW4gYmUgb3ZlcnJpZGRlbikgXG4gKi9cbmV4cG9ydCBjb25zdCByZW1vdmVEYXRhc2V0ID0gKGRhdGFzZXRBZGRyZXNzLCBwdWJsaXNoZXJBZGRyZXNzLCBjb25maWcgPSB7fSkgPT4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuXG4gICAgZXhwZWN0LmFsbChjb25maWcsIHtcbiAgICAgICAgJ3dlYjMnOiB7XG4gICAgICAgICAgICB0eXBlOiAnb2JqZWN0JyxcbiAgICAgICAgICAgIGNvZGU6IFdFQjNfUkVRVUlSRURcbiAgICAgICAgfSxcbiAgICAgICAgJ2NvbnRyYWN0cy5QYW5kb3JhTWFya2V0LmFiaSc6IHtcbiAgICAgICAgICAgIHR5cGU6ICdvYmplY3QnLFxuICAgICAgICAgICAgY29kZTogQ09OVFJBQ1RfUkVRVUlSRUQsXG4gICAgICAgICAgICBhcmdzOiBbJ1BhbmRvcmFNYXJrZXQnXVxuICAgICAgICB9LFxuICAgICAgICAnYWRkcmVzc2VzLlBhbmRvcmFNYXJrZXQnOiB7XG4gICAgICAgICAgICB0eXBlOiAnc3RyaW5nJyxcbiAgICAgICAgICAgIGNvZGU6IEFERFJFU1NfUkVRVUlSRUQsXG4gICAgICAgICAgICBhcmdzOiBbJ0tlcm5lbCddXG4gICAgICAgIH1cbiAgICB9KTtcblxuICAgIGNvbnN0IG1hcmtldCA9IG5ldyBjb25maWcud2ViMy5ldGguQ29udHJhY3QoY29uZmlnLmNvbnRyYWN0cy5QYW5kb3JhTWFya2V0LmFiaSwgY29uZmlnLmFkZHJlc3Nlcy5QYW5kb3JhTWFya2V0KTtcbiAgICBtYXJrZXQubWV0aG9kc1xuICAgICAgICAucmVtb3ZlRGF0YXNldChkYXRhc2V0QWRkcmVzcylcbiAgICAgICAgLnNlbmQoe1xuICAgICAgICAgICAgZnJvbTogcHVibGlzaGVyQWRkcmVzc1xuICAgICAgICB9KVxuICAgICAgICAub24oJ2Vycm9yJywgcmVqZWN0KVxuICAgICAgICAub24oJ3JlY2VpcHQnLCByZWNlaXB0ID0+IHtcblxuICAgICAgICAgICAgaWYgKE51bWJlcihyZWNlaXB0LnN0YXR1cykgPT09IDApIHtcblxuICAgICAgICAgICAgICAgIHJldHVybiByZWplY3QocGpzRXJyb3IoVFJBTlNBQ1RJT05fVU5TVUNDRVNTRlVMKSk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHJlc29sdmUocmVjZWlwdC5jb250cmFjdEFkZHJlc3MpO1xuICAgICAgICB9KTtcbn0pO1xuXG4vKipcbiAqIEhhbmRsZSBldmVudCBEYXRhc2V0QWRkZWRcbiAqIFxuICogQHBhcmFtIHtPYmplY3R9IGNvbmZpZyBMaWJyYXJ5IGNvbmZpZyAocHJvdmlkZWQgYnkgdGhlIHByb3h5IGJ1dCBjYW4gYmUgb3ZlcnJpZGRlbilcbiAqL1xuZXhwb3J0IGNvbnN0IGV2ZW50RGF0YXNldEFkZGVkID0gKGNvbmZpZyA9IHt9KSA9PiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG5cbiAgICBleHBlY3QuYWxsKGNvbmZpZywge1xuICAgICAgICAnd2ViMyc6IHtcbiAgICAgICAgICAgIHR5cGU6ICdvYmplY3QnLFxuICAgICAgICAgICAgY29kZTogV0VCM19SRVFVSVJFRFxuICAgICAgICB9LFxuICAgICAgICAnY29udHJhY3RzLlBhbmRvcmFNYXJrZXQuYWJpJzoge1xuICAgICAgICAgICAgdHlwZTogJ29iamVjdCcsXG4gICAgICAgICAgICBjb2RlOiBDT05UUkFDVF9SRVFVSVJFRCxcbiAgICAgICAgICAgIGFyZ3M6IFsnUGFuZG9yYU1hcmtldCddXG4gICAgICAgIH0sXG4gICAgICAgICdhZGRyZXNzZXMuUGFuZG9yYU1hcmtldCc6IHtcbiAgICAgICAgICAgIHR5cGU6ICdzdHJpbmcnLFxuICAgICAgICAgICAgY29kZTogQUREUkVTU19SRVFVSVJFRCxcbiAgICAgICAgICAgIGFyZ3M6IFsnTWFya2V0J11cbiAgICAgICAgfVxuICAgIH0pO1xuXG4gICAgY29uc3QgbWFyID0gbmV3IGNvbmZpZy53ZWIzLmV0aC5Db250cmFjdChjb25maWcuY29udHJhY3RzLlBhbmRvcmFNYXJrZXQuYWJpLCBjb25maWcuYWRkcmVzc2VzLlBhbmRvcmFNYXJrZXQpO1xuICAgIG1hci5ldmVudHMuRGF0YXNldEFkZGVkKClcbiAgICAgICAgLm9uKCdkYXRhJywgYXN5bmMgcmVzID0+IHtcblxuICAgICAgICAgICAgdHJ5IHtcblxuICAgICAgICAgICAgICAgIGNvbnN0IGRhdGFzZXQgPSBhd2FpdCBmZXRjaERhdGFzZXQocmVzLnJldHVyblZhbHVlcy5kYXRhc2V0LCBjb25maWcpO1xuICAgICAgICAgICAgICAgIHJlc29sdmUoe1xuICAgICAgICAgICAgICAgICAgICBhZGRyZXNzOiByZXMucmV0dXJuVmFsdWVzLmRhdGFzZXQsXG4gICAgICAgICAgICAgICAgICAgIGRhdGFzZXQsXG4gICAgICAgICAgICAgICAgICAgIHN0YXR1czogJ2NyZWF0ZWQnLFxuICAgICAgICAgICAgICAgICAgICBldmVudDogJ1BhbmRvcmFNYXJrZXQuRGF0YXNldEFkZGVkJ1xuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfSBjYXRjaChlcnIpIHtcbiAgICAgICAgICAgICAgICByZWplY3QoZXJyKTtcbiAgICAgICAgICAgIH0gICAgICAgICAgICBcbiAgICAgICAgfSlcbiAgICAgICAgLm9uKCdlcnJvcicsIHJlamVjdCk7XG59KTtcblxuLyoqXG4gKiBIYW5kbGUgZXZlbnQgS2VybmVsUmVtb3ZlZFxuICogXG4gKiBAcGFyYW0ge09iamVjdH0gY29uZmlnIExpYnJhcnkgY29uZmlnIChwcm92aWRlZCBieSB0aGUgcHJveHkgYnV0IGNhbiBiZSBvdmVycmlkZGVuKVxuICovXG5leHBvcnQgY29uc3QgZXZlbnRLZXJuZWxSZW1vdmVkID0gKGNvbmZpZyA9IHt9KSA9PiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG5cbiAgICBleHBlY3QuYWxsKGNvbmZpZywge1xuICAgICAgICAnd2ViMyc6IHtcbiAgICAgICAgICAgIHR5cGU6ICdvYmplY3QnLFxuICAgICAgICAgICAgY29kZTogV0VCM19SRVFVSVJFRFxuICAgICAgICB9LFxuICAgICAgICAnY29udHJhY3RzLlBhbmRvcmFNYXJrZXQuYWJpJzoge1xuICAgICAgICAgICAgdHlwZTogJ29iamVjdCcsXG4gICAgICAgICAgICBjb2RlOiBDT05UUkFDVF9SRVFVSVJFRCxcbiAgICAgICAgICAgIGFyZ3M6IFsnUGFuZG9yYU1hcmtldCddXG4gICAgICAgIH0sXG4gICAgICAgICdhZGRyZXNzZXMuUGFuZG9yYU1hcmtldCc6IHtcbiAgICAgICAgICAgIHR5cGU6ICdzdHJpbmcnLFxuICAgICAgICAgICAgY29kZTogQUREUkVTU19SRVFVSVJFRCxcbiAgICAgICAgICAgIGFyZ3M6IFsnS2VybmVsJ11cbiAgICAgICAgfVxuICAgIH0pO1xuXG4gICAgY29uc3QgbWFyID0gbmV3IGNvbmZpZy53ZWIzLmV0aC5Db250cmFjdChjb25maWcuY29udHJhY3RzLlBhbmRvcmFNYXJrZXQuYWJpLCBjb25maWcuYWRkcmVzc2VzLlBhbmRvcmFNYXJrZXQpO1xuICAgIG1hci5ldmVudHMuS2VybmVsUmVtb3ZlZCgpXG4gICAgICAgIC5vbignZGF0YScsIGFzeW5jIHJlcyA9PiB7XG5cbiAgICAgICAgICAgIHJlc29sdmUoe1xuICAgICAgICAgICAgICAgIGFkZHJlc3M6IHJlcy5yZXR1cm5WYWx1ZXMuZGF0YXNldCxcbiAgICAgICAgICAgICAgICBzdGF0dXM6ICdyZW1vdmVkJyxcbiAgICAgICAgICAgICAgICBldmVudDogJ1BhbmRvcmFNYXJrZXQuS2VybmVsUmVtb3ZlZCdcbiAgICAgICAgICAgIH0pOyAgICAgICAgICAgIFxuICAgICAgICB9KVxuICAgICAgICAub24oJ2Vycm9yJywgcmVqZWN0KTtcbn0pO1xuIl19