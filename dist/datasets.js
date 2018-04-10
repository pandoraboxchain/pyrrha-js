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

var _errors = require("./helpers/errors");

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
      return reject(new Error('Transaction was unsuccessful'));
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
      return reject(new Error('Transaction was unsuccessful'));
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9kYXRhc2V0cy5qcyJdLCJuYW1lcyI6WyJmZXRjaENvdW50IiwiY29uZmlnIiwiZXhwZWN0IiwiYWxsIiwidHlwZSIsImNvZGUiLCJXRUIzX1JFUVVJUkVEIiwiQ09OVFJBQ1RfUkVRVUlSRUQiLCJhcmdzIiwiQUREUkVTU19SRVFVSVJFRCIsIm1hciIsIndlYjMiLCJldGgiLCJDb250cmFjdCIsImNvbnRyYWN0cyIsIlBhbmRvcmFNYXJrZXQiLCJhYmkiLCJhZGRyZXNzZXMiLCJjb3VudCIsIm1ldGhvZHMiLCJkYXRhc2V0c0NvdW50IiwiY2FsbCIsIk51bWJlciIsInBhcnNlSW50IiwiZmV0Y2hBZGRyZXNzQnlJZCIsImlkIiwiZGF0YXNldENvbnRyYWN0IiwiZGF0YXNldHMiLCJmZXRjaElwZnNBZGRyZXNzIiwiYWRkcmVzcyIsImRhdCIsIkRhdGFzZXQiLCJpcGZzQWRkcmVzcyIsInV0aWxzIiwiaGV4VG9Bc2NpaSIsImZldGNoRGF0YURpbSIsImRhdGFEaW0iLCJmZXRjaEN1cnJlbnRQcmljZSIsImN1cnJlbnRQcmljZSIsImZldGNoU2FtcGxlc0NvdW50Iiwic2FtcGxlc0NvdW50IiwiZmV0Y2hCYXRjaGVzQ291bnQiLCJiYXRjaGVzQ291bnQiLCJmZXRjaERhdGFzZXQiLCJmZXRjaERhdGFzZXRCeUlkIiwiZGF0YXNldCIsImZldGNoQWxsIiwicmVjb3JkcyIsImVycm9yIiwiaSIsInB1c2giLCJlcnIiLCJtZXNzYWdlIiwiZGVwbG95IiwiZGF0YXNldElwZnNIYXNoIiwicHVibGlzaGVyIiwiZGltZW5zaW9uIiwic2FtcGxlcyIsInByaWNlIiwiV0VCM19NRVRBTUFTS19SRVFVSVJFRCIsInRvSGV4IiwiZ2FzIiwid2ViM0hlbHBlcnMiLCJlc3RpbWF0ZUdhcyIsImJ5dGVjb2RlIiwiZGF0YXNldENvbnRyYWN0QWRkcmVzcyIsImRlcGxveUNvbnRyYWN0IiwiZnJvbSIsImFkZFRvTWFya2V0IiwicHVibGlzaGVyQWRkcmVzcyIsIlByb21pc2UiLCJyZXNvbHZlIiwicmVqZWN0IiwibWFya2V0IiwiYWRkRGF0YXNldCIsInNlbmQiLCJvbiIsInJlY2VpcHQiLCJzdGF0dXMiLCJFcnJvciIsImNvbnRyYWN0QWRkcmVzcyIsImV2ZW50cyIsIkRhdGFzZXRBZGRlZCIsInJldHVyblZhbHVlcyIsInJlbW92ZURhdGFzZXQiLCJkYXRhc2V0QWRkcmVzcyIsImV2ZW50RGF0YXNldEFkZGVkIiwicmVzIiwiZXZlbnQiLCJldmVudEtlcm5lbFJlbW92ZWQiLCJLZXJuZWxSZW1vdmVkIl0sIm1hcHBpbmdzIjoiQUFBQTs7Ozs7Ozs7QUFTQTs7Ozs7OztBQUVBOztBQUNBOztBQU1BOzs7Ozs7OztBQUVBOzs7Ozs7QUFNTyxNQUFNQSxhQUFhLE9BQU9DLFNBQVMsRUFBaEIsS0FBdUI7QUFFN0NDLFNBQU9DLEdBQVAsQ0FBV0YsTUFBWCxFQUFtQjtBQUNmLFlBQVE7QUFDSkcsWUFBTSxRQURGO0FBRUpDLFlBQU1DO0FBRkYsS0FETztBQUtmLG1DQUErQjtBQUMzQkYsWUFBTSxRQURxQjtBQUUzQkMsWUFBTUUseUJBRnFCO0FBRzNCQyxZQUFNLENBQUMsZUFBRDtBQUhxQixLQUxoQjtBQVVmLCtCQUEyQjtBQUN2QkosWUFBTSxRQURpQjtBQUV2QkMsWUFBTUksd0JBRmlCO0FBR3ZCRCxZQUFNLENBQUMsZUFBRDtBQUhpQjtBQVZaLEdBQW5CO0FBaUJBLFFBQU1FLE1BQU0sSUFBSVQsT0FBT1UsSUFBUCxDQUFZQyxHQUFaLENBQWdCQyxRQUFwQixDQUE2QlosT0FBT2EsU0FBUCxDQUFpQkMsYUFBakIsQ0FBK0JDLEdBQTVELEVBQWlFZixPQUFPZ0IsU0FBUCxDQUFpQkYsYUFBbEYsQ0FBWjtBQUNBLFFBQU1HLFFBQVEsTUFBTVIsSUFBSVMsT0FBSixDQUNmQyxhQURlLEdBRWZDLElBRmUsRUFBcEI7QUFJQSxTQUFPQyxPQUFPQyxRQUFQLENBQWdCTCxLQUFoQixFQUF1QixFQUF2QixDQUFQO0FBQ0gsQ0F6Qk07QUEyQlA7Ozs7Ozs7Ozs7O0FBT08sTUFB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O0FBVWYsK0JBQTJCO0FBQ3ZCSixZQUFNLFFBRGlCO0FBRXZCQyxZQUFNSSx3QkFGaUI7QUFHdkJELFlBQU0sQ0FBQyxRQUFEO0FBSGlCO0FBVlosR0FBbkI7QUFpQkEsUUFBTUUsTUFBTSxJQUFJVCxPQUFPVSxJQUFQLENBQVlDLEdBQVosQ0FBZ0JDLFFBQXBCLENBQTZCWixPQUFPYSxTQUFQLENBQWlCQyxhQUFqQixDQUErQkMsR0FBNUQsRUFBaUVmLE9BQU9nQixTQUFQLENBQWlCRixhQUFsRixDQUFaO0FBQ0FMLE1BQUl1RSxNQUFKLENBQVdTLGFBQVgsR0FDS2QsRUFETCxDQUNRLE1BRFIsRUFDZ0IsTUFBTVcsR0FBTixJQUFhO0FBRXJCaEIsWUFBUTtBQUNKMUMsZUFBUzBELElBQUlKLFlBQUosQ0FBaUJ0QyxPQUR0QjtBQUVKaUMsY0FBUSxTQUZKO0FBR0pVLGFBQU87QUFISCxLQUFSO0FBS0gsR0FSTCxFQVNLWixFQVRMLENBU1EsT0FUUixFQVNpQkosTUFUakI7QUFVSCxDQTlCa0QsQ0FBNUMiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIERhdGFzZXRzIHJlbGF0ZWQgbWV0aG9kc1xuICogVGhpcyBmaWxlIGl0IGlzIGEgcGFydCBvZiB0aGUgUGFuZG9yYSBQeXJyaGEgSmF2YXNjcmlwdCBsaWJyYXJ5XG4gKiBcbiAqIEBmaWxlIGtlcm5lbHMuanNcbiAqIEBhdXRob3IgS29zdGlhbnR5biBTbXlybm92IDxrb3N0eXNoQGdtYWlsLmNvbT5cbiAqIEBkYXRlIDIwMThcbiAqL1xuXG4ndXNlIHN0cmljdCc7XG5cbmltcG9ydCAqIGFzIGV4cGVjdCBmcm9tICcuL2hlbHBlcnMvZXhwZWN0JztcbmltcG9ydCB7XG4gICAgQ09OVFJBQ1RfUkVRVUlSRUQsXG4gICAgQUREUkVTU19SRVFVSVJFRCxcbiAgICBXRUIzX1JFUVVJUkVELFxuICAgIFdFQjNfTUVUQU1BU0tfUkVRVUlSRURcbn0gZnJvbSAnLi9oZWxwZXJzL2Vycm9ycyc7XG5pbXBvcnQgKiBhcyB3ZWIzSGVscGVycyBmcm9tICcuL2hlbHBlcnMvd2ViMyc7XG5cbi8qKlxuICogR2V0IGRhdGFzZXRzIGNvdW50IGZyb20gUGFuZG9yYU1hcmtldCBjb250cmFjdFxuICogXG4gKiBAcGFyYW0ge09iamVjdH0gY29uZmlnIExpYnJhcnkgY29uZmlnIChwcm92aWRlZCBieSB0aGUgcHJveHkgYnV0IGNhbiBiZSBvdmVycmlkZGVuKVxuICogQHJldHVybnMge1Byb21pc2V9IEEgUHJvbWlzZSBvYmplY3QgcmVwcmVzZW50cyB0aGUge251bWJlcn0gXG4gKi9cbmV4cG9ydCBjb25zdCBmZXRjaENvdW50ID0gYXN5bmMgKGNvbmZpZyA9IHt9KSA9PiB7XG5cbiAgICBleHBlY3QuYWxsKGNvbmZpZywge1xuICAgICAgICAnd2ViMyc6IHtcbiAgICAgICAgICAgIHR5cGU6ICdvYmplY3QnLFxuICAgICAgICAgICAgY29kZTogV0VCM19SRVFVSVJFRFxuICAgICAgICB9LFxuICAgICAgICAnY29udHJhY3RzLlBhbmRvcmFNYXJrZXQuYWJpJzoge1xuICAgICAgICAgICAgdHlwZTogJ29iamVjdCcsXG4gICAgICAgICAgICBjb2RlOiBDT05UUkFDVF9SRVFVSVJFRCxcbiAgICAgICAgICAgIGFyZ3M6IFsnUGFuZG9yYU1hcmtldCddXG4gICAgICAgIH0sXG4gICAgICAgICdhZGRyZXNzZXMuUGFuZG9yYU1hcmtldCc6IHtcbiAgICAgICAgICAgIHR5cGU6ICdzdHJpbmcnLFxuICAgICAgICAgICAgY29kZTogQUREUkVTU19SRVFVSVJFRCxcbiAgICAgICAgICAgIGFyZ3M6IFsnUGFuZG9yYU1hcmtldCddXG4gICAgICAgIH1cbiAgICB9KTtcblxuICAgIGNvbnN0IG1hciA9IG5ldyBjb25maWcud2ViMy5ldGguQ29udHJhY3QoY29uZmlnLmNvbnRyYWN0cy5QYW5kb3JhTWFya2V0LmFiaSwgY29uZmlnLmFkZHJlc3Nlcy5QYW5kb3JhTWFya2V0KTtcbiAgICBjb25zdCBjb3VudCA9IGF3YWl0IG1hci5tZXRob2RzXG4gICAgICAgIC5kYXRhc2V0c0NvdW50KClcbiAgICAgICAgLmNhbGwoKTtcblxuICAgIHJldHVybiBOdW1iZXIucGFyc2VJbnQoY291bnQsIDEwKTtcbn07XG5cbi8qKlxuICogR2V0IERhdGFzZXQgYWRkcmVzcyBieSBrZXJuZWwgaWRcbiAqIFxuICogQHBhcmFtIHtudW1iZXJ9IGlkXG4gKiBAcGFyYW0ge09iamVjdH0gY29uZmlnIExpYnJhcnkgY29uZmlnIChwcm92aWRlZCBieSB0aGUgcHJveHkgYnV0IGNhbiBiZSBvdmVycmlkZGVuKVxuICogQHJldHVybnMge1Byb21pc2V9IEEgUHJvbWlzZSBvYmplY3QgcmVwcmVzZW50cyB0aGUge3N0cmluZ31cbiAqL1xuZXhwb3J0IGNvbnN0IGZldGNoQWRkcmVzc0J5SWQgPSBhc3luYyAoaWQsIGNvbmZpZyA9IHt9KSA9PiB7XG5cbiAgICBleHBlY3QuYWxsKGNvbmZpZywge1xuICAgICAgICAnd2ViMyc6IHtcbiAgICAgICAgICAgIHR5cGU6ICdvYmplY3QnLFxuICAgICAgICAgICAgY29kZTogV0VCM19SRVFVSVJFRFxuICAgICAgICB9LFxuICAgICAgICAnY29udHJhY3RzLlBhbmRvcmFNYXJrZXQuYWJpJzoge1xuICAgICAgICAgICAgdHlwZTogJ29iamVjdCcsXG4gICAgICAgICAgICBjb2RlOiBDT05UUkFDVF9SRVFVSVJFRCxcbiAgICAgICAgICAgIGFyZ3M6IFsnUGFuZG9yYU1hcmtldCddXG4gICAgICAgIH0sXG4gICAgICAgICdhZGRyZXNzZXMuUGFuZG9yYU1hcmtldCc6IHtcbiAgICAgICAgICAgIHR5cGU6ICdzdHJpbmcnLFxuICAgICAgICAgICAgY29kZTogQUREUkVTU19SRVFVSVJFRCxcbiAgICAgICAgICAgIGFyZ3M6IFsnTWFya2V0J11cbiAgICAgICAgfVxuICAgIH0pO1xuXG4gICAgY29uc3QgbWFyID0gbmV3IGNvbmZpZy53ZWIzLmV0aC5Db250cmFjdChjb25maWcuY29udHJhY3RzLlBhbmRvcmFNYXJrZXQuYWJpLCBjb25maWcuYWRkcmVzc2VzLlBhbmRvcmFNYXJrZXQpO1xuICAgIGNvbnN0IGRhdGFzZXRDb250cmFjdCA9IGF3YWl0IG1hci5tZXRob2RzXG4gICAgICAgIC5kYXRhc2V0cyhpZClcbiAgICAgICAgLmNhbGwoKTtcblxuICAgIHJldHVybiBkYXRhc2V0Q29udHJhY3Q7XG59O1xuXG4vKipcbiAqIEdldCBJUEZTIGFkZHJlc3MgZnJvbSBEYXRhc2V0IGNvbnRyYWN0IGJ5IHRoZSBkYXRhc2V0IGFkZHJlc3NcbiAqIFxuICogQHBhcmFtIHtzdHJpbmd9IGFkZHJlc3NcbiAqIEBwYXJhbSB7T2JqZWN0fSBjb25maWcgTGlicmFyeSBjb25maWcgKHByb3ZpZGVkIGJ5IHRoZSBwcm94eSBidXQgY2FuIGJlIG92ZXJyaWRkZW4pXG4gKiBAcmV0dXJucyB7UHJvbWlzZX0gQSBQcm9taXNlIG9iamVjdCByZXByZXNlbnRzIHRoZSB7c3RyaW5nfVxuICovXG5leHBvcnQgY29uc3QgZmV0Y2hJcGZzQWRkcmVzcyA9IGFzeW5jIChhZGRyZXNzID0gJycsIGNvbmZpZyA9IHt9KSA9PiB7XG5cbiAgICBleHBlY3QuYWxsKGNvbmZpZywge1xuICAgICAgICAnd2ViMyc6IHtcbiAgICAgICAgICAgIHR5cGU6ICdvYmplY3QnLFxuICAgICAgICAgICAgY29kZTogV0VCM19SRVFVSVJFRFxuICAgICAgICB9LFxuICAgICAgICAnY29udHJhY3RzLkRhdGFzZXQuYWJpJzoge1xuICAgICAgICAgICAgdHlwZTogJ29iamVjdCcsXG4gICAgICAgICAgICBjb2RlOiBDT05UUkFDVF9SRVFVSVJFRCxcbiAgICAgICAgICAgIGFyZ3M6IFsnRGF0YXNldCddXG4gICAgICAgIH1cbiAgICB9KTtcblxuICAgIGNvbnN0IGRhdCA9IG5ldyBjb25maWcud2ViMy5ldGguQ29udHJhY3QoY29uZmlnLmNvbnRyYWN0cy5EYXRhc2V0LmFiaSwgYWRkcmVzcyk7XG4gICAgY29uc3QgaXBmc0FkZHJlc3MgPSBhd2FpdCBkYXQubWV0aG9kc1xuICAgICAgICAuaXBmc0FkZHJlc3MoKVxuICAgICAgICAuY2FsbCgpO1xuXG4gICAgcmV0dXJuIGNvbmZpZy53ZWIzLnV0aWxzLmhleFRvQXNjaWkoaXBmc0FkZHJlc3MpO1xufTtcblxuLyoqXG4gKiBHZXQgZGF0YSBkaW0gZnJvbSBEYXRhc2V0IGNvbnRyYWN0IGJ5IHRoZSBkYXRhc2V0IGFkZHJlc3NcbiAqIFxuICogQHBhcmFtIHtzdHJpbmd9IGFkZHJlc3NcbiAqIEBwYXJhbSB7T2JqZWN0fSBjb25maWcgTGlicmFyeSBjb25maWcgKHByb3ZpZGVkIGJ5IHRoZSBwcm94eSBidXQgY2FuIGJlIG92ZXJyaWRkZW4pXG4gKiBAcmV0dXJucyB7UHJvbWlzZX0gQSBQcm9taXNlIG9iamVjdCByZXByZXNlbnRzIHRoZSB7bnVtYmVyfVxuICovXG5leHBvcnQgY29uc3QgZmV0Y2hEYXRhRGltID0gYXN5bmMgKGFkZHJlc3MgPSAnJywgY29uZmlnID0ge30pID0+IHtcblxuICAgIGV4cGVjdC5hbGwoY29uZmlnLCB7XG4gICAgICAgICd3ZWIzJzoge1xuICAgICAgICAgICAgdHlwZTogJ29iamVjdCcsXG4gICAgICAgICAgICBjb2RlOiBXRUIzX1JFUVVJUkVEXG4gICAgICAgIH0sXG4gICAgICAgICdjb250cmFjdHMuRGF0YXNldC5hYmknOiB7XG4gICAgICAgICAgICB0eXBlOiAnb2JqZWN0JyxcbiAgICAgICAgICAgIGNvZGU6IENPTlRSQUNUX1JFUVVJUkVELFxuICAgICAgICAgICAgYXJnczogWydEYXRhc2V0J11cbiAgICAgICAgfVxuICAgIH0pO1xuXG4gICAgY29uc3QgZGF0ID0gbmV3IGNvbmZpZy53ZWIzLmV0aC5Db250cmFjdChjb25maWcuY29udHJhY3RzLkRhdGFzZXQuYWJpLCBhZGRyZXNzKTtcbiAgICBjb25zdCBkYXRhRGltID0gYXdhaXQgZGF0Lm1ldGhvZHNcbiAgICAgICAgLmRhdGFEaW0oKVxuICAgICAgICAuY2FsbCgpO1xuXG4gICAgcmV0dXJuIE51bWJlci5wYXJzZUludChkYXRhRGltLCAxMCk7XG59O1xuXG4vKipcbiAqIEdldCBjdXJyZW50IHByaWNlIGZyb20gRGF0YXNldCBjb250cmFjdCBieSB0aGUgZGF0YXNldCBhZGRyZXNzXG4gKiBcbiAqIEBwYXJhbSB7c3RyaW5nfSBhZGRyZXNzXG4gKiBAcGFyYW0ge09iamVjdH0gY29uZmlnIExpYnJhcnkgY29uZmlnIChwcm92aWRlZCBieSB0aGUgcHJveHkgYnV0IGNhbiBiZSBvdmVycmlkZGVuKVxuICogQHJldHVybnMge1Byb21pc2V9IEEgUHJvbWlzZSBvYmplY3QgcmVwcmVzZW50cyB0aGUge251bWJlcn1cbiAqL1xuZXhwb3J0IGNvbnN0IGZldGNoQ3VycmVudFByaWNlID0gYXN5bmMgKGFkZHJlc3MgPSAnJywgY29uZmlnID0ge30pID0+IHtcblxuICAgIGV4cGVjdC5hbGwoY29uZmlnLCB7XG4gICAgICAgICd3ZWIzJzoge1xuICAgICAgICAgICAgdHlwZTogJ29iamVjdCcsXG4gICAgICAgICAgICBjb2RlOiBXRUIzX1JFUVVJUkVEXG4gICAgICAgIH0sXG4gICAgICAgICdjb250cmFjdHMuRGF0YXNldC5hYmknOiB7XG4gICAgICAgICAgICB0eXBlOiAnb2JqZWN0JyxcbiAgICAgICAgICAgIGNvZGU6IENPTlRSQUNUX1JFUVVJUkVELFxuICAgICAgICAgICAgYXJnczogWydEYXRhc2V0J11cbiAgICAgICAgfVxuICAgIH0pO1xuXG4gICAgY29uc3QgZGF0ID0gbmV3IGNvbmZpZy53ZWIzLmV0aC5Db250cmFjdChjb25maWcuY29udHJhY3RzLkRhdGFzZXQuYWJpLCBhZGRyZXNzKTtcbiAgICBjb25zdCBjdXJyZW50UHJpY2UgPSBhd2FpdCBkYXQubWV0aG9kc1xuICAgICAgICAuY3VycmVudFByaWNlKClcbiAgICAgICAgLmNhbGwoKTtcblxuICAgIHJldHVybiBOdW1iZXIucGFyc2VJbnQoY3VycmVudFByaWNlLCAxMCk7XG59O1xuXG4vKipcbiAqIEdldCBkYXRhIHNhbXBsZXMgY291bnQgZnJvbSBEYXRhc2V0IGNvbnRyYWN0IGJ5IHRoZSBkYXRhc2V0IGFkZHJlc3NcbiAqIFxuICogQHBhcmFtIHtzdHJpbmd9IGFkZHJlc3NcbiAqIEBwYXJhbSB7T2JqZWN0fSBjb25maWcgTGlicmFyeSBjb25maWcgKHByb3ZpZGVkIGJ5IHRoZSBwcm94eSBidXQgY2FuIGJlIG92ZXJyaWRkZW4pXG4gKiBAcmV0dXJucyB7UHJvbWlzZX0gQSBQcm9taXNlIG9iamVjdCByZXByZXNlbnRzIHRoZSB7bnVtYmVyfVxuICovXG5leHBvcnQgY29uc3QgZmV0Y2hTYW1wbGVzQ291bnQgPSBhc3luYyAoYWRkcmVzcyA9ICcnLCBjb25maWcgPSB7fSkgPT4ge1xuXG4gICAgZXhwZWN0LmFsbChjb25maWcsIHtcbiAgICAgICAgJ3dlYjMnOiB7XG4gICAgICAgICAgICB0eXBlOiAnb2JqZWN0JyxcbiAgICAgICAgICAgIGNvZGU6IFdFQjNfUkVRVUlSRURcbiAgICAgICAgfSxcbiAgICAgICAgJ2NvbnRyYWN0cy5EYXRhc2V0LmFiaSc6IHtcbiAgICAgICAgICAgIHR5cGU6ICdvYmplY3QnLFxuICAgICAgICAgICAgY29kZTogQ09OVFJBQ1RfUkVRVUlSRUQsXG4gICAgICAgICAgICBhcmdzOiBbJ0RhdGFzZXQnXVxuICAgICAgICB9XG4gICAgfSk7XG5cbiAgICBjb25zdCBkYXQgPSBuZXcgY29uZmlnLndlYjMuZXRoLkNvbnRyYWN0KGNvbmZpZy5jb250cmFjdHMuRGF0YXNldC5hYmksIGFkZHJlc3MpO1xuICAgIGNvbnN0IHNhbXBsZXNDb3VudCA9IGF3YWl0IGRhdC5tZXRob2RzXG4gICAgICAgIC5zYW1wbGVzQ291bnQoKVxuICAgICAgICAuY2FsbCgpO1xuXG4gICAgcmV0dXJuIE51bWJlci5wYXJzZUludChzYW1wbGVzQ291bnQsIDEwKTtcbn07XG5cbi8qKlxuICogR2V0IGRhdGEgYmF0Y2hlcyBjb3VudCBmcm9tIERhdGFzZXQgY29udHJhY3QgYnkgdGhlIGRhdGFzZXQgYWRkcmVzc1xuICogXG4gKiBAcGFyYW0ge3N0cmluZ30gYWRkcmVzc1xuICogQHBhcmFtIHtPYmplY3R9IGNvbmZpZyBMaWJyYXJ5IGNvbmZpZyAocHJvdmlkZWQgYnkgdGhlIHByb3h5IGJ1dCBjYW4gYmUgb3ZlcnJpZGRlbilcbiAqIEByZXR1cm5zIHtQcm9taXNlfSBBIFByb21pc2Ugb2JqZWN0IHJlcHJlc2VudHMgdGhlIHtudW1iZXJ9XG4gKi9cbmV4cG9ydCBjb25zdCBmZXRjaEJhdGNoZXNDb3VudCA9IGFzeW5jIChhZGRyZXNzID0gJycsIGNvbmZpZyA9IHt9KSA9PiB7XG5cbiAgICBleHBlY3QuYWxsKGNvbmZpZywge1xuICAgICAgICAnd2ViMyc6IHtcbiAgICAgICAgICAgIHR5cGU6ICdvYmplY3QnLFxuICAgICAgICAgICAgY29kZTogV0VCM19SRVFVSVJFRFxuICAgICAgICB9LFxuICAgICAgICAnY29udHJhY3RzLkRhdGFzZXQuYWJpJzoge1xuICAgICAgICAgICAgdHlwZTogJ29iamVjdCcsXG4gICAgICAgICAgICBjb2RlOiBDT05UUkFDVF9SRVFVSVJFRCxcbiAgICAgICAgICAgIGFyZ3M6IFsnRGF0YXNldCddXG4gICAgICAgIH1cbiAgICB9KTtcblxuICAgIGNvbnN0IGRhdCA9IG5ldyBjb25maWcud2ViMy5ldGguQ29udHJhY3QoY29uZmlnLmNvbnRyYWN0cy5EYXRhc2V0LmFiaSwgYWRkcmVzcyk7XG4gICAgY29uc3QgYmF0Y2hlc0NvdW50ID0gYXdhaXQgZGF0Lm1ldGhvZHNcbiAgICAgICAgLmJhdGNoZXNDb3VudCgpXG4gICAgICAgIC5jYWxsKCk7XG4gICAgICAgIFxuICAgIHJldHVybiBOdW1iZXIucGFyc2VJbnQoYmF0Y2hlc0NvdW50LCAxMCk7XG59O1xuXG4vKipcbiAqIEdldCBkYXRhc2V0IGJ5IHRoZSBkYXRhc2V0IGFkZHJlc3NcbiAqIFxuICogQHBhcmFtIHtzdHJpbmd9IGFkZHJlc3NcbiAqIEBwYXJhbSB7T2JqZWN0fSBjb25maWcgTGlicmFyeSBjb25maWcgKHByb3ZpZGVkIGJ5IHRoZSBwcm94eSBidXQgY2FuIGJlIG92ZXJyaWRkZW4pXG4gKiBAcmV0dXJucyB7UHJvbWlzZX0gUHJvbWlzZSBvYmplY3QgcmVwcmVzZW50cyB0aGUge09iamVjdFtdfVxuICovXG5leHBvcnQgY29uc3QgZmV0Y2hEYXRhc2V0ID0gYXN5bmMgKGFkZHJlc3MgPSAnJywgY29uZmlnID0ge30pID0+IHtcblxuICAgIGNvbnN0IGlwZnNBZGRyZXNzID0gYXdhaXQgZmV0Y2hJcGZzQWRkcmVzcyhhZGRyZXNzLCBjb25maWcpO1xuICAgIGNvbnN0IGRhdGFEaW0gPSBhd2FpdCBmZXRjaERhdGFEaW0oYWRkcmVzcywgY29uZmlnKTtcbiAgICBjb25zdCBjdXJyZW50UHJpY2UgPSBhd2FpdCBmZXRjaEN1cnJlbnRQcmljZShhZGRyZXNzLCBjb25maWcpO1xuICAgIGNvbnN0IHNhbXBsZXNDb3VudCA9IGF3YWl0IGZldGNoU2FtcGxlc0NvdW50KGFkZHJlc3MsIGNvbmZpZyk7XG4gICAgY29uc3QgYmF0Y2hlc0NvdW50ID0gYXdhaXQgZmV0Y2hCYXRjaGVzQ291bnQoYWRkcmVzcywgY29uZmlnKTtcblxuICAgIHJldHVybiB7XG4gICAgICAgIGFkZHJlc3MsXG4gICAgICAgIGlwZnNBZGRyZXNzLFxuICAgICAgICBkYXRhRGltLFxuICAgICAgICBjdXJyZW50UHJpY2UsXG4gICAgICAgIHNhbXBsZXNDb3VudCxcbiAgICAgICAgYmF0Y2hlc0NvdW50XG4gICAgfTtcbn07XG5cbi8qKlxuICogR2V0IGRhdGFzZXQgYnkgaWRcbiAqIFxuICogQHBhcmFtIHtpbnRlZ2VyfSBpZCBcbiAqIEBwYXJhbSB7T2JqZWN0fSBjb25maWcgTGlicmFyeSBjb25maWcgKHByb3ZpZGVkIGJ5IHRoZSBwcm94eSBidXQgY2FuIGJlIG92ZXJyaWRkZW4pXG4gKiBAcmV0dXJucyB7UHJvbWlzZX0gQSBQcm9taXNlIG9iamVjdCByZXByZXNlbnRzIHRoZSB7T2JqZWN0fVxuICovXG5leHBvcnQgY29uc3QgZmV0Y2hEYXRhc2V0QnlJZCA9IGFzeW5jIChpZCwgY29uZmlnID0ge30pID0+IHtcbiAgICBcbiAgICBjb25zdCBhZGRyZXNzID0gYXdhaXQgZmV0Y2hBZGRyZXNzQnlJZChpZCwgY29uZmlnKTtcbiAgICBjb25zdCBkYXRhc2V0ID0gYXdhaXQgZmV0Y2hEYXRhc2V0KGFkZHJlc3MsIGNvbmZpZyk7XG5cbiAgICByZXR1cm4gZGF0YXNldDtcbn07XG5cbi8qKlxuICogR2V0IGFsbCBkYXRhc2V0c1xuICogXG4gKiBAcGFyYW0ge09iamVjdH0gY29uZmlnIExpYnJhcnkgY29uZmlnIChwcm92aWRlZCBieSB0aGUgcHJveHkgYnV0IGNhbiBiZSBvdmVycmlkZGVuKVxuICogQHJldHVybnMge1Byb21pc2V9IFByb21pc2Ugb2JqZWN0IHJlcHJlc2VudHMgdGhlIHtPYmplY3RbXX1cbiAqL1xuZXhwb3J0IGNvbnN0IGZldGNoQWxsID0gYXN5bmMgKGNvbmZpZyA9IHt9KSA9PiB7XG5cbiAgICBsZXQgcmVjb3JkcyA9IFtdO1xuICAgIGxldCBlcnJvciA9IFtdO1xuXG4gICAgdHJ5IHtcblxuICAgICAgICBjb25zdCBjb3VudCA9IGF3YWl0IGZldGNoQ291bnQoY29uZmlnKTtcblxuICAgICAgICBmb3IgKGxldCBpPTA7IGkgPCBjb3VudDsgaSsrKSB7XG4gICAgICAgICAgICBcbiAgICAgICAgICAgIHRyeSB7XG5cbiAgICAgICAgICAgICAgICBjb25zdCBkYXRhc2V0ID0gYXdhaXQgZmV0Y2hEYXRhc2V0QnlJZChpLCBjb25maWcpO1xuXG4gICAgICAgICAgICAgICAgcmVjb3Jkcy5wdXNoKHtcbiAgICAgICAgICAgICAgICAgICAgaWQ6IGksXG4gICAgICAgICAgICAgICAgICAgIC4uLmRhdGFzZXRcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH0gY2F0Y2goZXJyKSB7XG4gICAgICAgICAgICAgICAgZXJyb3IucHVzaCh7XG4gICAgICAgICAgICAgICAgICAgIGlkOiBpLFxuICAgICAgICAgICAgICAgICAgICBtZXNzYWdlOiBlcnIubWVzc2FnZVxuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfSAgICAgICAgXG4gICAgICAgIH1cbiAgICB9IGNhdGNoKGVycikge1xuICAgICAgICBlcnJvci5wdXNoKHtcbiAgICAgICAgICAgIGVycm9yOiBlcnIubWVzc2FnZVxuICAgICAgICB9KTtcbiAgICB9ICAgXG5cbiAgICByZXR1cm4ge1xuICAgICAgICByZWNvcmRzLFxuICAgICAgICBlcnJvclxuICAgIH07XG59O1xuXG4vKipcbiAqIERlcGxveSBEYXRzZXQgY29udHJhY3QgdG8gdGhlIG5ldHdvcmtcbiAqIFxuICogQHBhcmFtIHtzdHJpbmd9IGRhdGFzZXRJcGZzSGFzaCBcbiAqIEBwYXJhbSB7T2JqZWN0fSBvcHRpb25zIHsgcHVibGlzaGVyLCBkaW1lbnNpb24sIHNhbXBsZXMsIHByaWNlIH0gXG4gKiBAcGFyYW0ge09iamVjdH0gY29uZmlnIExpYnJhcnkgY29uZmlnIChwcm92aWRlZCBieSB0aGUgcHJveHkgYnV0IGNhbiBiZSBvdmVycmlkZGVuKVxuICogQHJldHVybnMge1Byb21pc2V9IFByb21pc2Ugb2JqZWN0IHJlc29sdmVkIHRvIGNvbnRyYWN0IGFkZHJlc3NcbiAqL1xuZXhwb3J0IGNvbnN0IGRlcGxveSA9IGFzeW5jIChkYXRhc2V0SXBmc0hhc2gsIGJhdGNoZXNDb3VudCwgeyBwdWJsaXNoZXIsIGRpbWVuc2lvbiwgc2FtcGxlcywgcHJpY2UgfSwgY29uZmlnID0ge30pID0+IHtcblxuICAgIGV4cGVjdC5hbGwoY29uZmlnLCB7XG4gICAgICAgICd3ZWIzJzoge1xuICAgICAgICAgICAgdHlwZTogJ29iamVjdCcsXG4gICAgICAgICAgICBjb2RlOiBXRUIzX1JFUVVJUkVEXG4gICAgICAgIH0sXG4gICAgICAgICdjb250cmFjdHMuRGF0YXNldCc6IHtcbiAgICAgICAgICAgIHR5cGU6ICdvYmplY3QnLFxuICAgICAgICAgICAgY29kZTogQ09OVFJBQ1RfUkVRVUlSRUQsXG4gICAgICAgICAgICBhcmdzOiBbJ0RhdGFzZXQnXVxuICAgICAgICB9LFxuICAgICAgICAnd2ViMy5jdXJyZW50UHJvdmlkZXIuaXNNZXRhTWFzayc6IHtcbiAgICAgICAgICAgIHR5cGU6ICdib29sZWFuJyxcbiAgICAgICAgICAgIGNvZGU6IFdFQjNfTUVUQU1BU0tfUkVRVUlSRURcbiAgICAgICAgfVxuICAgIH0pO1xuXG4gICAgY29uc3QgYXJncyA9IFtjb25maWcud2ViMy51dGlscy50b0hleChkYXRhc2V0SXBmc0hhc2gpLCBkaW1lbnNpb24sIHNhbXBsZXMsIGJhdGNoZXNDb3VudCwgcHJpY2VdO1xuICAgICAgICBcbiAgICAvLyBFc3RpbWF0ZSByZXF1aXJlZCBhbW91bnQgb2YgZ2FzXG4gICAgY29uc3QgZ2FzID0gYXdhaXQgd2ViM0hlbHBlcnMuZXN0aW1hdGVHYXMoY29uZmlnLmNvbnRyYWN0cy5EYXRhc2V0LmJ5dGVjb2RlLCBhcmdzLCBjb25maWcpO1xuXG4gICAgLy8gQ3JlYXRlIGFuZCBkZXBsb3kgZGF0YXNldCBjb250cmFjdFxuICAgIGNvbnN0IGRhdGFzZXRDb250cmFjdEFkZHJlc3MgPSBhd2FpdCB3ZWIzSGVscGVycy5kZXBsb3lDb250cmFjdChjb25maWcuY29udHJhY3RzLkRhdGFzZXQsIHtcbiAgICAgICAgYXJncyxcbiAgICAgICAgZnJvbTogcHVibGlzaGVyLFxuICAgICAgICBnYXM6IE51bWJlci5wYXJzZUludChnYXMgKiAxLjUsIDEwKVxuICAgIH0sIGNvbmZpZyk7XG5cbiAgICByZXR1cm4gZGF0YXNldENvbnRyYWN0QWRkcmVzcztcbn07XG5cbi8qKlxuICogQWRkIGRhdGFzZXQgdG8gbWFya2V0XG4gKiBcbiAqIEBwYXJhbSB7U3RyaW5nfSBkYXRhc2V0Q29udHJhY3RBZGRyZXNzIFxuICogQHBhcmFtIHtTdHJpbmd9IHB1Ymxpc2hlckFkZHJlc3MgXG4gKiBAcGFyYW0ge09iamVjdH0gY29uZmlnIExpYnJhcnkgY29uZmlnIChwcm92aWRlZCBieSB0aGUgcHJveHkgYnV0IGNhbiBiZSBvdmVycmlkZGVuKVxuICogQHJldHVybnMge1Byb21pc2V9IFByb21pc2Ugb2JqZWN0IHJlc29sdmVkIHRvIHtzdHJpbmd9IGNvbnRyYWN0QWRkcmVzc1xuICovXG5leHBvcnQgY29uc3QgYWRkVG9NYXJrZXQgPSAoZGF0YXNldENvbnRyYWN0QWRkcmVzcywgcHVibGlzaGVyQWRkcmVzcywgY29uZmlnID0ge30pID0+IG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcblxuICAgIGV4cGVjdC5hbGwoY29uZmlnLCB7XG4gICAgICAgICd3ZWIzJzoge1xuICAgICAgICAgICAgdHlwZTogJ29iamVjdCcsXG4gICAgICAgICAgICBjb2RlOiBXRUIzX1JFUVVJUkVEXG4gICAgICAgIH0sXG4gICAgICAgICdjb250cmFjdHMuUGFuZG9yYU1hcmtldC5hYmknOiB7XG4gICAgICAgICAgICB0eXBlOiAnb2JqZWN0JyxcbiAgICAgICAgICAgIGNvZGU6IENPTlRSQUNUX1JFUVVJUkVELFxuICAgICAgICAgICAgYXJnczogWydQYW5kb3JhTWFya2V0J11cbiAgICAgICAgfSxcbiAgICAgICAgJ2FkZHJlc3Nlcy5QYW5kb3JhTWFya2V0Jzoge1xuICAgICAgICAgICAgdHlwZTogJ3N0cmluZycsXG4gICAgICAgICAgICBjb2RlOiBBRERSRVNTX1JFUVVJUkVELFxuICAgICAgICAgICAgYXJnczogWydNYXJrZXQnXVxuICAgICAgICB9LFxuICAgICAgICAnd2ViMy5jdXJyZW50UHJvdmlkZXIuaXNNZXRhTWFzayc6IHtcbiAgICAgICAgICAgIHR5cGU6ICdib29sZWFuJyxcbiAgICAgICAgICAgIGNvZGU6IFdFQjNfTUVUQU1BU0tfUkVRVUlSRURcbiAgICAgICAgfVxuICAgIH0pO1xuXG4gICAgY29uc3QgbWFya2V0ID0gbmV3IGNvbmZpZy53ZWIzLmV0aC5Db250cmFjdChjb25maWcuY29udHJhY3RzLlBhbmRvcmFNYXJrZXQuYWJpLCBjb25maWcuYWRkcmVzc2VzLlBhbmRvcmFNYXJrZXQpO1xuICAgIG1hcmtldC5tZXRob2RzXG4gICAgICAgIC5hZGREYXRhc2V0KGRhdGFzZXRDb250cmFjdEFkZHJlc3MpXG4gICAgICAgIC5zZW5kKHtcbiAgICAgICAgICAgIGZyb206IHB1Ymxpc2hlckFkZHJlc3NcbiAgICAgICAgfSlcbiAgICAgICAgLm9uKCdlcnJvcicsIHJlamVjdClcbiAgICAgICAgLm9uKCdyZWNlaXB0JywgcmVjZWlwdCA9PiB7XG5cbiAgICAgICAgICAgIGlmIChOdW1iZXIocmVjZWlwdC5zdGF0dXMpID09PSAwKSB7XG5cbiAgICAgICAgICAgICAgICByZXR1cm4gcmVqZWN0KG5ldyBFcnJvcignVHJhbnNhY3Rpb24gd2FzIHVuc3VjY2Vzc2Z1bCcpKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgcmVzb2x2ZShyZWNlaXB0LmNvbnRyYWN0QWRkcmVzcyB8fCByZWNlaXB0LmV2ZW50cy5EYXRhc2V0QWRkZWQucmV0dXJuVmFsdWVzLmRhdGFzZXQpO1xuICAgICAgICB9KTtcbiAgICAvLyBAbm90ZSBJbiBjYXNlIG9mIGdhbmFjaGUtY2xpIGJsb2NrY2hhaW4gXCJjb250cmFjdEFkZHJlc3NcIiBhbHdheXMgd2lsbCBiZSBlcXVhbCB0byBudWxsXG59KTtcblxuLyoqXG4gKiBSZW1vdmUgZGF0YXNldCBmcm9tIFBhbmRvcmFNYXJrZXRcbiAqIFxuICogQHBhcmFtIHtTdHJpbmd9IGRhdGFzZXRBZGRyZXNzXG4gKiBAcGFyYW0ge1N0cmluZ30gcHVibGlzaGVyQWRkcmVzcyBcbiAqIEBwYXJhbSB7T2JqZWN0fSBjb25maWcgTGlicmFyeSBjb25maWcgKHByb3ZpZGVkIGJ5IHRoZSBwcm94eSBidXQgY2FuIGJlIG92ZXJyaWRkZW4pIFxuICovXG5leHBvcnQgY29uc3QgcmVtb3ZlRGF0YXNldCA9IChkYXRhc2V0QWRkcmVzcywgcHVibGlzaGVyQWRkcmVzcywgY29uZmlnID0ge30pID0+IG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcblxuICAgIGV4cGVjdC5hbGwoY29uZmlnLCB7XG4gICAgICAgICd3ZWIzJzoge1xuICAgICAgICAgICAgdHlwZTogJ29iamVjdCcsXG4gICAgICAgICAgICBjb2RlOiBXRUIzX1JFUVVJUkVEXG4gICAgICAgIH0sXG4gICAgICAgICdjb250cmFjdHMuUGFuZG9yYU1hcmtldC5hYmknOiB7XG4gICAgICAgICAgICB0eXBlOiAnb2JqZWN0JyxcbiAgICAgICAgICAgIGNvZGU6IENPTlRSQUNUX1JFUVVJUkVELFxuICAgICAgICAgICAgYXJnczogWydQYW5kb3JhTWFya2V0J11cbiAgICAgICAgfSxcbiAgICAgICAgJ2FkZHJlc3Nlcy5QYW5kb3JhTWFya2V0Jzoge1xuICAgICAgICAgICAgdHlwZTogJ3N0cmluZycsXG4gICAgICAgICAgICBjb2RlOiBBRERSRVNTX1JFUVVJUkVELFxuICAgICAgICAgICAgYXJnczogWydLZXJuZWwnXVxuICAgICAgICB9XG4gICAgfSk7XG5cbiAgICBjb25zdCBtYXJrZXQgPSBuZXcgY29uZmlnLndlYjMuZXRoLkNvbnRyYWN0KGNvbmZpZy5jb250cmFjdHMuUGFuZG9yYU1hcmtldC5hYmksIGNvbmZpZy5hZGRyZXNzZXMuUGFuZG9yYU1hcmtldCk7XG4gICAgbWFya2V0Lm1ldGhvZHNcbiAgICAgICAgLnJlbW92ZURhdGFzZXQoZGF0YXNldEFkZHJlc3MpXG4gICAgICAgIC5zZW5kKHtcbiAgICAgICAgICAgIGZyb206IHB1Ymxpc2hlckFkZHJlc3NcbiAgICAgICAgfSlcbiAgICAgICAgLm9uKCdlcnJvcicsIHJlamVjdClcbiAgICAgICAgLm9uKCdyZWNlaXB0JywgcmVjZWlwdCA9PiB7XG5cbiAgICAgICAgICAgIGlmIChOdW1iZXIocmVjZWlwdC5zdGF0dXMpID09PSAwKSB7XG5cbiAgICAgICAgICAgICAgICByZXR1cm4gcmVqZWN0KG5ldyBFcnJvcignVHJhbnNhY3Rpb24gd2FzIHVuc3VjY2Vzc2Z1bCcpKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgcmVzb2x2ZShyZWNlaXB0LmNvbnRyYWN0QWRkcmVzcyk7XG4gICAgICAgIH0pO1xufSk7XG5cbi8qKlxuICogSGFuZGxlIGV2ZW50IERhdGFzZXRBZGRlZFxuICogXG4gKiBAcGFyYW0ge09iamVjdH0gY29uZmlnIExpYnJhcnkgY29uZmlnIChwcm92aWRlZCBieSB0aGUgcHJveHkgYnV0IGNhbiBiZSBvdmVycmlkZGVuKVxuICovXG5leHBvcnQgY29uc3QgZXZlbnREYXRhc2V0QWRkZWQgPSAoY29uZmlnID0ge30pID0+IG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcblxuICAgIGV4cGVjdC5hbGwoY29uZmlnLCB7XG4gICAgICAgICd3ZWIzJzoge1xuICAgICAgICAgICAgdHlwZTogJ29iamVjdCcsXG4gICAgICAgICAgICBjb2RlOiBXRUIzX1JFUVVJUkVEXG4gICAgICAgIH0sXG4gICAgICAgICdjb250cmFjdHMuUGFuZG9yYU1hcmtldC5hYmknOiB7XG4gICAgICAgICAgICB0eXBlOiAnb2JqZWN0JyxcbiAgICAgICAgICAgIGNvZGU6IENPTlRSQUNUX1JFUVVJUkVELFxuICAgICAgICAgICAgYXJnczogWydQYW5kb3JhTWFya2V0J11cbiAgICAgICAgfSxcbiAgICAgICAgJ2FkZHJlc3Nlcy5QYW5kb3JhTWFya2V0Jzoge1xuICAgICAgICAgICAgdHlwZTogJ3N0cmluZycsXG4gICAgICAgICAgICBjb2RlOiBBRERSRVNTX1JFUVVJUkVELFxuICAgICAgICAgICAgYXJnczogWydNYXJrZXQnXVxuICAgICAgICB9XG4gICAgfSk7XG5cbiAgICBjb25zdCBtYXIgPSBuZXcgY29uZmlnLndlYjMuZXRoLkNvbnRyYWN0KGNvbmZpZy5jb250cmFjdHMuUGFuZG9yYU1hcmtldC5hYmksIGNvbmZpZy5hZGRyZXNzZXMuUGFuZG9yYU1hcmtldCk7XG4gICAgbWFyLmV2ZW50cy5EYXRhc2V0QWRkZWQoKVxuICAgICAgICAub24oJ2RhdGEnLCBhc3luYyByZXMgPT4ge1xuXG4gICAgICAgICAgICB0cnkge1xuXG4gICAgICAgICAgICAgICAgY29uc3QgZGF0YXNldCA9IGF3YWl0IGZldGNoRGF0YXNldChyZXMucmV0dXJuVmFsdWVzLmRhdGFzZXQsIGNvbmZpZyk7XG4gICAgICAgICAgICAgICAgcmVzb2x2ZSh7XG4gICAgICAgICAgICAgICAgICAgIGFkZHJlc3M6IHJlcy5yZXR1cm5WYWx1ZXMuZGF0YXNldCxcbiAgICAgICAgICAgICAgICAgICAgZGF0YXNldCxcbiAgICAgICAgICAgICAgICAgICAgc3RhdHVzOiAnY3JlYXRlZCcsXG4gICAgICAgICAgICAgICAgICAgIGV2ZW50OiAnUGFuZG9yYU1hcmtldC5EYXRhc2V0QWRkZWQnXG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9IGNhdGNoKGVycikge1xuICAgICAgICAgICAgICAgIHJlamVjdChlcnIpO1xuICAgICAgICAgICAgfSAgICAgICAgICAgIFxuICAgICAgICB9KVxuICAgICAgICAub24oJ2Vycm9yJywgcmVqZWN0KTtcbn0pO1xuXG4vKipcbiAqIEhhbmRsZSBldmVudCBLZXJuZWxSZW1vdmVkXG4gKiBcbiAqIEBwYXJhbSB7T2JqZWN0fSBjb25maWcgTGlicmFyeSBjb25maWcgKHByb3ZpZGVkIGJ5IHRoZSBwcm94eSBidXQgY2FuIGJlIG92ZXJyaWRkZW4pXG4gKi9cbmV4cG9ydCBjb25zdCBldmVudEtlcm5lbFJlbW92ZWQgPSAoY29uZmlnID0ge30pID0+IG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcblxuICAgIGV4cGVjdC5hbGwoY29uZmlnLCB7XG4gICAgICAgICd3ZWIzJzoge1xuICAgICAgICAgICAgdHlwZTogJ29iamVjdCcsXG4gICAgICAgICAgICBjb2RlOiBXRUIzX1JFUVVJUkVEXG4gICAgICAgIH0sXG4gICAgICAgICdjb250cmFjdHMuUGFuZG9yYU1hcmtldC5hYmknOiB7XG4gICAgICAgICAgICB0eXBlOiAnb2JqZWN0JyxcbiAgICAgICAgICAgIGNvZGU6IENPTlRSQUNUX1JFUVVJUkVELFxuICAgICAgICAgICAgYXJnczogWydQYW5kb3JhTWFya2V0J11cbiAgICAgICAgfSxcbiAgICAgICAgJ2FkZHJlc3Nlcy5QYW5kb3JhTWFya2V0Jzoge1xuICAgICAgICAgICAgdHlwZTogJ3N0cmluZycsXG4gICAgICAgICAgICBjb2RlOiBBRERSRVNTX1JFUVVJUkVELFxuICAgICAgICAgICAgYXJnczogWydLZXJuZWwnXVxuICAgICAgICB9XG4gICAgfSk7XG5cbiAgICBjb25zdCBtYXIgPSBuZXcgY29uZmlnLndlYjMuZXRoLkNvbnRyYWN0KGNvbmZpZy5jb250cmFjdHMuUGFuZG9yYU1hcmtldC5hYmksIGNvbmZpZy5hZGRyZXNzZXMuUGFuZG9yYU1hcmtldCk7XG4gICAgbWFyLmV2ZW50cy5LZXJuZWxSZW1vdmVkKClcbiAgICAgICAgLm9uKCdkYXRhJywgYXN5bmMgcmVzID0+IHtcblxuICAgICAgICAgICAgcmVzb2x2ZSh7XG4gICAgICAgICAgICAgICAgYWRkcmVzczogcmVzLnJldHVyblZhbHVlcy5kYXRhc2V0LFxuICAgICAgICAgICAgICAgIHN0YXR1czogJ3JlbW92ZWQnLFxuICAgICAgICAgICAgICAgIGV2ZW50OiAnUGFuZG9yYU1hcmtldC5LZXJuZWxSZW1vdmVkJ1xuICAgICAgICAgICAgfSk7ICAgICAgICAgICAgXG4gICAgICAgIH0pXG4gICAgICAgIC5vbignZXJyb3InLCByZWplY3QpO1xufSk7XG4iXX0=