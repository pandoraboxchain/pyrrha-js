/**
 * Common Pandora contract methods
 * This file it is a part of the Pandora Pyrrha Javascript library
 * 
 * @file pandora.js
 * @author Kostiantyn Smyrnov <kostysh@gmail.com>
 * @date 2018
 */
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getMaximumWorkerPrice = exports.createWorkerNode = exports.whitelistWorkerOwner = exports.version = void 0;

var expect = _interopRequireWildcard(require("./helpers/expect"));

var _errors = _interopRequireWildcard(require("./helpers/errors"));

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

/**
 * Get deployed contracts version
 * 
 * @param {Object} config Library config (provided by the proxy but can be overridden)
 * @returns {Promise}
 */
const version = async (config = {}) => {
  expect.all(config, {
    'web3': {
      type: 'object',
      code: _errors.WEB3_REQUIRED
    },
    'contracts.Pandora.abi': {
      type: 'object',
      code: _errors.CONTRACT_REQUIRED,
      args: ['Pandora']
    },
    'addresses.Pandora': {
      type: 'address',
      code: _errors.ADDRESS_REQUIRED,
      args: ['Pandora']
    }
  });
  const pan = new config.web3.eth.Contract(config.contracts.Pandora.abi, config.addresses.Pandora);
  const version = await pan.methods.version().call();
  return version;
};
/**
 * Public and externalAdds address to the whitelist of owners allowed to create WorkerNodes contracts
 * 
 * @param {String} publisher 
 * @param {String} ownerAddress 
 * @param {Object} config Library config (provided by the proxy but can be overridden) 
 */


exports.version = version;

const whitelistWorkerOwner = (publisher, ownerAddress, config = {}) => new Promise((resolve, reject) => {
  expect.all({
    publisher,
    ownerAddress
  }, {
    'publisher': {
      type: 'address',
      code: _errors.ADDRESS_REQUIRED,
      args: ['Pandora contract owner']
    },
    'ownerAddress': {
      type: 'address',
      code: _errors.ADDRESS_REQUIRED,
      args: ['WorkerNode owner']
    }
  });
  expect.all(config, {
    'web3': {
      type: 'object',
      code: _errors.WEB3_REQUIRED
    }
  });
  const pan = new config.web3.eth.Contract(config.contracts.Pandora.abi, config.addresses.Pandora);
  pan.methods.whitelistWorkerOwner(ownerAddress).send({
    from: publisher
  }).on('error', reject).on('receipt', receipt => {
    if (Number(receipt.status) === 0) {
      return reject((0, _errors.default)(_errors.TRANSACTION_UNSUCCESSFUL));
    }

    resolve(receipt);
  });
});
/**
 * Creates, registers and returns a new worker node owned by the caller of the contract. 
 * Can be called only by the whitelisted node owner address
 * 
 * @param {Number} computingPrice
 * @param {String} publisher 
 * @param {Object} config
 */


exports.whitelistWorkerOwner = whitelistWorkerOwner;

const createWorkerNode = (computingPrice, publisher, config = {}) => new Promise((resolve, reject) => {
  expect.all({
    publisher
  }, {
    'publisher': {
      type: 'address',
      code: _errors.ADDRESS_REQUIRED,
      args: ['Pandora contract owner']
    }
  });
  expect.all(config, {
    'web3': {
      type: 'object',
      code: _errors.WEB3_REQUIRED
    },
    'contracts.WorkerNode': {
      type: 'object',
      code: _errors.CONTRACT_REQUIRED,
      args: ['WorkerNode']
    }
  });
  const pan = new config.web3.eth.Contract(config.contracts.Pandora.abi, config.addresses.Pandora);
  pan.methods.createWorkerNode(config.web3.utils.toHex(computingPrice)).send({
    from: publisher,
    gas: 6700000 // because this workflow is too greedy

  }).on('error', reject).on('receipt', receipt => {
    if (Number(receipt.status) === 0) {
      return reject((0, _errors.default)(_errors.TRANSACTION_UNSUCCESSFUL));
    } // console.log('>>>>> worker node result', receipt.events.WorkerNodeCreated.returnValues)
    // console.log('>>>>> worker node address', receipt.events.WorkerNodeCreated.address)


    resolve(receipt.events.WorkerNodeCreated.returnValues.workerNode); // address of created WorkerNode
  });
});
/**
 * Return maximum value of the computing price
 * 
 * @param {Object} config Library config (provided by the proxy but can be overridden)
 */


exports.createWorkerNode = createWorkerNode;

const getMaximumWorkerPrice = async (config = {}) => {
  expect.all(config, {
    'web3': {
      type: 'object',
      code: _errors.WEB3_REQUIRED
    },
    'contracts.Pandora.abi': {
      type: 'object',
      code: _errors.CONTRACT_REQUIRED,
      args: ['Pandora']
    },
    'addresses.Pandora': {
      type: 'address',
      code: _errors.ADDRESS_REQUIRED,
      args: ['Pandora']
    }
  });
  const pan = new config.web3.eth.Contract(config.contracts.Pandora.abi, config.addresses.Pandora);
  const price = await pan.methods.getMaximumWorkerPrice().call();
  return Number.parseInt(price, 10);
};

exports.getMaximumWorkerPrice = getMaximumWorkerPrice;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9wYW5kb3JhLmpzIl0sIm5hbWVzIjpbInZlcnNpb24iLCJjb25maWciLCJleHBlY3QiLCJhbGwiLCJ0eXBlIiwiY29kZSIsIldFQjNfUkVRVUlSRUQiLCJDT05UUkFDVF9SRVFVSVJFRCIsImFyZ3MiLCJBRERSRVNTX1JFUVVJUkVEIiwicGFuIiwid2ViMyIsImV0aCIsIkNvbnRyYWN0IiwiY29udHJhY3RzIiwiUGFuZG9yYSIsImFiaSIsImFkZHJlc3NlcyIsIm1ldGhvZHMiLCJjYWxsIiwid2hpdGVsaXN0V29ya2VyT3duZXIiLCJwdWJsaXNoZXIiLCJvd25lckFkZHJlc3MiLCJQcm9taXNlIiwicmVzb2x2ZSIsInJlamVjdCIsInNlbmQiLCJmcm9tIiwib24iLCJyZWNlaXB0IiwiTnVtYmVyIiwic3RhdHVzIiwiVFJBTlNBQ1RJT05fVU5TVUNDRVNTRlVMIiwiY3JlYXRlV29ya2VyTm9kZSIsImNvbXB1dGluZ1ByaWNlIiwidXRpbHMiLCJ0b0hleCIsImdhcyIsImV2ZW50cyIsIldvcmtlck5vZGVDcmVhdGVkIiwicmV0dXJuVmFsdWVzIiwid29ya2VyTm9kZSIsImdldE1heGltdW1Xb3JrZXJQcmljZSIsInByaWNlIiwicGFyc2VJbnQiXSwibWFwcGluZ3MiOiJBQUFBOzs7Ozs7OztBQVFBOzs7Ozs7O0FBRUE7O0FBQ0E7Ozs7QUFPQTs7Ozs7O0FBTU8sTUFBTUEsT0FBTyxHQUFHLE9BQU9DLE1BQU0sR0FBRyxFQUFoQixLQUF1QjtBQUUxQ0MsRUFBQUEsTUFBTSxDQUFDQyxHQUFQLENBQVdGLE1BQVgsRUFBbUI7QUFDZixZQUFRO0FBQ0pHLE1BQUFBLElBQUksRUFBRSxRQURGO0FBRUpDLE1BQUFBLElBQUksRUFBRUM7QUFGRixLQURPO0FBS2YsNkJBQXlCO0FBQ3JCRixNQUFBQSxJQUFJLEVBQUUsUUFEZTtBQUVyQkMsTUFBQUEsSUFBSSxFQUFFRSx5QkFGZTtBQUdyQkMsTUFBQUEsSUFBSSxFQUFFLENBQUMsU0FBRDtBQUhlLEtBTFY7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Q1A7Ozs7Ozs7OztBQUtPLE1BQU1DLHFCQUFxQixHQUFHLE9BQU96QyxNQUFNLEdBQUcsRUFBaEIsS0FBdUI7QUFFeERDLEVBQUFBLE1BQU0sQ0FBQ0MsR0FBUCxDQUFXRixNQUFYLEVBQW1CO0FBQ2YsWUFBUTtBQUNKRyxNQUFBQSxJQUFJLEVBQUUsUUFERjtBQUVKQyxNQUFBQSxJQUFJLEVBQUVDO0FBRkYsS0FETztBQUtmLDZCQUF5QjtBQUNyQkYsTUFBQUEsSUFBSSxFQUFFLFFBRGU7QUFFckJDLE1BQUFBLElBQUksRUFBRUUseUJBRmU7QUFHckJDLE1BQUFBLElBQUksRUFBRSxDQUFDLFNBQUQ7QUFIZSxLQUxWO0FBVWYseUJBQXFCO0FBQ2pCSixNQUFBQSxJQUFJLEVBQUUsU0FEVztBQUVqQkMsTUFBQUEsSUFBSSxFQUFFSSx3QkFGVztBQUdqQkQsTUFBQUEsSUFBSSxFQUFFLENBQUMsU0FBRDtBQUhXO0FBVk4sR0FBbkI7QUFpQkEsUUFBTUUsR0FBRyxHQUFHLElBQUlULE1BQU0sQ0FBQ1UsSUFBUCxDQUFZQyxHQUFaLENBQWdCQyxRQUFwQixDQUE2QlosTUFBTSxDQUFDYSxTQUFQLENBQWlCQyxPQUFqQixDQUF5QkMsR0FBdEQsRUFBMkRmLE1BQU0sQ0FBQ2dCLFNBQVAsQ0FBaUJGLE9BQTVFLENBQVo7QUFDQSxRQUFNNEIsS0FBSyxHQUFHLE1BQU1qQyxHQUFHLENBQUNRLE9BQUosQ0FDZndCLHFCQURlLEdBRWZ2QixJQUZlLEVBQXBCO0FBSUEsU0FBT1csTUFBTSxDQUFDYyxRQUFQLENBQWdCRCxLQUFoQixFQUF1QixFQUF2QixDQUFQO0FBQ0gsQ0F6Qk0iLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIENvbW1vbiBQYW5kb3JhIGNvbnRyYWN0IG1ldGhvZHNcbiAqIFRoaXMgZmlsZSBpdCBpcyBhIHBhcnQgb2YgdGhlIFBhbmRvcmEgUHlycmhhIEphdmFzY3JpcHQgbGlicmFyeVxuICogXG4gKiBAZmlsZSBwYW5kb3JhLmpzXG4gKiBAYXV0aG9yIEtvc3RpYW50eW4gU215cm5vdiA8a29zdHlzaEBnbWFpbC5jb20+XG4gKiBAZGF0ZSAyMDE4XG4gKi9cbid1c2Ugc3RyaWN0JztcblxuaW1wb3J0ICogYXMgZXhwZWN0IGZyb20gJy4vaGVscGVycy9leHBlY3QnO1xuaW1wb3J0IHBqc0Vycm9yLCB7XG4gICAgV0VCM19SRVFVSVJFRCxcbiAgICBDT05UUkFDVF9SRVFVSVJFRCxcbiAgICBBRERSRVNTX1JFUVVJUkVELFxuICAgIFRSQU5TQUNUSU9OX1VOU1VDQ0VTU0ZVTFxufSBmcm9tICcuL2hlbHBlcnMvZXJyb3JzJztcblxuLyoqXG4gKiBHZXQgZGVwbG95ZWQgY29udHJhY3RzIHZlcnNpb25cbiAqIFxuICogQHBhcmFtIHtPYmplY3R9IGNvbmZpZyBMaWJyYXJ5IGNvbmZpZyAocHJvdmlkZWQgYnkgdGhlIHByb3h5IGJ1dCBjYW4gYmUgb3ZlcnJpZGRlbilcbiAqIEByZXR1cm5zIHtQcm9taXNlfVxuICovXG5leHBvcnQgY29uc3QgdmVyc2lvbiA9IGFzeW5jIChjb25maWcgPSB7fSkgPT4ge1xuXG4gICAgZXhwZWN0LmFsbChjb25maWcsIHtcbiAgICAgICAgJ3dlYjMnOiB7XG4gICAgICAgICAgICB0eXBlOiAnb2JqZWN0JyxcbiAgICAgICAgICAgIGNvZGU6IFdFQjNfUkVRVUlSRURcbiAgICAgICAgfSxcbiAgICAgICAgJ2NvbnRyYWN0cy5QYW5kb3JhLmFiaSc6IHtcbiAgICAgICAgICAgIHR5cGU6ICdvYmplY3QnLFxuICAgICAgICAgICAgY29kZTogQ09OVFJBQ1RfUkVRVUlSRUQsXG4gICAgICAgICAgICBhcmdzOiBbJ1BhbmRvcmEnXVxuICAgICAgICB9LFxuICAgICAgICAnYWRkcmVzc2VzLlBhbmRvcmEnOiB7XG4gICAgICAgICAgICB0eXBlOiAnYWRkcmVzcycsXG4gICAgICAgICAgICBjb2RlOiBBRERSRVNTX1JFUVVJUkVELFxuICAgICAgICAgICAgYXJnczogWydQYW5kb3JhJ11cbiAgICAgICAgfVxuICAgIH0pO1xuXG4gICAgY29uc3QgcGFuID0gbmV3IGNvbmZpZy53ZWIzLmV0aC5Db250cmFjdChjb25maWcuY29udHJhY3RzLlBhbmRvcmEuYWJpLCBjb25maWcuYWRkcmVzc2VzLlBhbmRvcmEpO1xuICAgIGNvbnN0IHZlcnNpb24gPSBhd2FpdCBwYW4ubWV0aG9kc1xuICAgICAgICAudmVyc2lvbigpXG4gICAgICAgIC5jYWxsKCk7XG4gICAgICAgIFxuICAgIHJldHVybiB2ZXJzaW9uO1xufTtcblxuLyoqXG4gKiBQdWJsaWMgYW5kIGV4dGVybmFsQWRkcyBhZGRyZXNzIHRvIHRoZSB3aGl0ZWxpc3Qgb2Ygb3duZXJzIGFsbG93ZWQgdG8gY3JlYXRlIFdvcmtlck5vZGVzIGNvbnRyYWN0c1xuICogXG4gKiBAcGFyYW0ge1N0cmluZ30gcHVibGlzaGVyIFxuICogQHBhcmFtIHtTdHJpbmd9IG93bmVyQWRkcmVzcyBcbiAqIEBwYXJhbSB7T2JqZWN0fSBjb25maWcgTGlicmFyeSBjb25maWcgKHByb3ZpZGVkIGJ5IHRoZSBwcm94eSBidXQgY2FuIGJlIG92ZXJyaWRkZW4pIFxuICovXG5leHBvcnQgY29uc3Qgd2hpdGVsaXN0V29ya2VyT3duZXIgPSAocHVibGlzaGVyLCBvd25lckFkZHJlc3MsIGNvbmZpZyA9IHt9KSA9PiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG4gICAgXG4gICAgZXhwZWN0LmFsbCh7IHB1Ymxpc2hlciwgb3duZXJBZGRyZXNzIH0sIHtcbiAgICAgICAgJ3B1Ymxpc2hlcic6IHtcbiAgICAgICAgICAgIHR5cGU6ICdhZGRyZXNzJyxcbiAgICAgICAgICAgIGNvZGU6IEFERFJFU1NfUkVRVUlSRUQsXG4gICAgICAgICAgICBhcmdzOiBbJ1BhbmRvcmEgY29udHJhY3Qgb3duZXInXVxuICAgICAgICB9LFxuICAgICAgICAnb3duZXJBZGRyZXNzJzoge1xuICAgICAgICAgICAgdHlwZTogJ2FkZHJlc3MnLFxuICAgICAgICAgICAgY29kZTogQUREUkVTU19SRVFVSVJFRCxcbiAgICAgICAgICAgIGFyZ3M6IFsnV29ya2VyTm9kZSBvd25lciddXG4gICAgICAgIH1cbiAgICB9KTtcblxuICAgIGV4cGVjdC5hbGwoY29uZmlnLCB7XG4gICAgICAgICd3ZWIzJzoge1xuICAgICAgICAgICAgdHlwZTogJ29iamVjdCcsXG4gICAgICAgICAgICBjb2RlOiBXRUIzX1JFUVVJUkVEXG4gICAgICAgIH1cbiAgICB9KTtcblxuICAgIGNvbnN0IHBhbiA9IG5ldyBjb25maWcud2ViMy5ldGguQ29udHJhY3QoY29uZmlnLmNvbnRyYWN0cy5QYW5kb3JhLmFiaSwgY29uZmlnLmFkZHJlc3Nlcy5QYW5kb3JhKTtcbiAgICBwYW4ubWV0aG9kc1xuICAgICAgICAud2hpdGVsaXN0V29ya2VyT3duZXIob3duZXJBZGRyZXNzKVxuICAgICAgICAuc2VuZCh7XG4gICAgICAgICAgICBmcm9tOiBwdWJsaXNoZXJcbiAgICAgICAgfSlcbiAgICAgICAgLm9uKCdlcnJvcicsIHJlamVjdClcbiAgICAgICAgLm9uKCdyZWNlaXB0JywgcmVjZWlwdCA9PiB7XG5cbiAgICAgICAgICAgIGlmIChOdW1iZXIocmVjZWlwdC5zdGF0dXMpID09PSAwKSB7XG5cbiAgICAgICAgICAgICAgICByZXR1cm4gcmVqZWN0KHBqc0Vycm9yKFRSQU5TQUNUSU9OX1VOU1VDQ0VTU0ZVTCkpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICByZXNvbHZlKHJlY2VpcHQpO1xuICAgICAgICB9KTtcbn0pO1xuXG4vKipcbiAqIENyZWF0ZXMsIHJlZ2lzdGVycyBhbmQgcmV0dXJucyBhIG5ldyB3b3JrZXIgbm9kZSBvd25lZCBieSB0aGUgY2FsbGVyIG9mIHRoZSBjb250cmFjdC4gXG4gKiBDYW4gYmUgY2FsbGVkIG9ubHkgYnkgdGhlIHdoaXRlbGlzdGVkIG5vZGUgb3duZXIgYWRkcmVzc1xuICogXG4gKiBAcGFyYW0ge051bWJlcn0gY29tcHV0aW5nUHJpY2VcbiAqIEBwYXJhbSB7U3RyaW5nfSBwdWJsaXNoZXIgXG4gKiBAcGFyYW0ge09iamVjdH0gY29uZmlnXG4gKi9cbmV4cG9ydCBjb25zdCBjcmVhdGVXb3JrZXJOb2RlID0gKGNvbXB1dGluZ1ByaWNlLCBwdWJsaXNoZXIsIGNvbmZpZyA9IHt9KSA9PiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG5cbiAgICBleHBlY3QuYWxsKHsgcHVibGlzaGVyIH0sIHtcbiAgICAgICAgJ3B1Ymxpc2hlcic6IHtcbiAgICAgICAgICAgIHR5cGU6ICdhZGRyZXNzJyxcbiAgICAgICAgICAgIGNvZGU6IEFERFJFU1NfUkVRVUlSRUQsXG4gICAgICAgICAgICBhcmdzOiBbJ1BhbmRvcmEgY29udHJhY3Qgb3duZXInXVxuICAgICAgICB9XG4gICAgfSk7XG5cbiAgICBleHBlY3QuYWxsKGNvbmZpZywge1xuICAgICAgICAnd2ViMyc6IHtcbiAgICAgICAgICAgIHR5cGU6ICdvYmplY3QnLFxuICAgICAgICAgICAgY29kZTogV0VCM19SRVFVSVJFRFxuICAgICAgICB9LFxuICAgICAgICAnY29udHJhY3RzLldvcmtlck5vZGUnOiB7XG4gICAgICAgICAgICB0eXBlOiAnb2JqZWN0JyxcbiAgICAgICAgICAgIGNvZGU6IENPTlRSQUNUX1JFUVVJUkVELFxuICAgICAgICAgICAgYXJnczogWydXb3JrZXJOb2RlJ11cbiAgICAgICAgfVxuICAgIH0pO1xuXG4gICAgY29uc3QgcGFuID0gbmV3IGNvbmZpZy53ZWIzLmV0aC5Db250cmFjdChjb25maWcuY29udHJhY3RzLlBhbmRvcmEuYWJpLCBjb25maWcuYWRkcmVzc2VzLlBhbmRvcmEpO1xuICAgIHBhbi5tZXRob2RzXG4gICAgICAgIC5jcmVhdGVXb3JrZXJOb2RlKGNvbmZpZy53ZWIzLnV0aWxzLnRvSGV4KGNvbXB1dGluZ1ByaWNlKSlcbiAgICAgICAgLnNlbmQoe1xuICAgICAgICAgICAgZnJvbTogcHVibGlzaGVyLFxuICAgICAgICAgICAgZ2FzOiA2NzAwMDAwLy8gYmVjYXVzZSB0aGlzIHdvcmtmbG93IGlzIHRvbyBncmVlZHlcbiAgICAgICAgfSlcbiAgICAgICAgLm9uKCdlcnJvcicsIHJlamVjdClcbiAgICAgICAgLm9uKCdyZWNlaXB0JywgcmVjZWlwdCA9PiB7XG5cbiAgICAgICAgICAgIGlmIChOdW1iZXIocmVjZWlwdC5zdGF0dXMpID09PSAwKSB7XG5cbiAgICAgICAgICAgICAgICByZXR1cm4gcmVqZWN0KHBqc0Vycm9yKFRSQU5TQUNUSU9OX1VOU1VDQ0VTU0ZVTCkpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAvLyBjb25zb2xlLmxvZygnPj4+Pj4gd29ya2VyIG5vZGUgcmVzdWx0JywgcmVjZWlwdC5ldmVudHMuV29ya2VyTm9kZUNyZWF0ZWQucmV0dXJuVmFsdWVzKVxuICAgICAgICAgICAgLy8gY29uc29sZS5sb2coJz4+Pj4+IHdvcmtlciBub2RlIGFkZHJlc3MnLCByZWNlaXB0LmV2ZW50cy5Xb3JrZXJOb2RlQ3JlYXRlZC5hZGRyZXNzKVxuXG4gICAgICAgICAgICByZXNvbHZlKHJlY2VpcHQuZXZlbnRzLldvcmtlck5vZGVDcmVhdGVkLnJldHVyblZhbHVlcy53b3JrZXJOb2RlKTsvLyBhZGRyZXNzIG9mIGNyZWF0ZWQgV29ya2VyTm9kZVxuICAgICAgICB9KTtcbn0pO1xuXG4vKipcbiAqIFJldHVybiBtYXhpbXVtIHZhbHVlIG9mIHRoZSBjb21wdXRpbmcgcHJpY2VcbiAqIFxuICogQHBhcmFtIHtPYmplY3R9IGNvbmZpZyBMaWJyYXJ5IGNvbmZpZyAocHJvdmlkZWQgYnkgdGhlIHByb3h5IGJ1dCBjYW4gYmUgb3ZlcnJpZGRlbilcbiAqL1xuZXhwb3J0IGNvbnN0IGdldE1heGltdW1Xb3JrZXJQcmljZSA9IGFzeW5jIChjb25maWcgPSB7fSkgPT4ge1xuXG4gICAgZXhwZWN0LmFsbChjb25maWcsIHtcbiAgICAgICAgJ3dlYjMnOiB7XG4gICAgICAgICAgICB0eXBlOiAnb2JqZWN0JyxcbiAgICAgICAgICAgIGNvZGU6IFdFQjNfUkVRVUlSRURcbiAgICAgICAgfSxcbiAgICAgICAgJ2NvbnRyYWN0cy5QYW5kb3JhLmFiaSc6IHtcbiAgICAgICAgICAgIHR5cGU6ICdvYmplY3QnLFxuICAgICAgICAgICAgY29kZTogQ09OVFJBQ1RfUkVRVUlSRUQsXG4gICAgICAgICAgICBhcmdzOiBbJ1BhbmRvcmEnXVxuICAgICAgICB9LFxuICAgICAgICAnYWRkcmVzc2VzLlBhbmRvcmEnOiB7XG4gICAgICAgICAgICB0eXBlOiAnYWRkcmVzcycsXG4gICAgICAgICAgICBjb2RlOiBBRERSRVNTX1JFUVVJUkVELFxuICAgICAgICAgICAgYXJnczogWydQYW5kb3JhJ11cbiAgICAgICAgfVxuICAgIH0pO1xuXG4gICAgY29uc3QgcGFuID0gbmV3IGNvbmZpZy53ZWIzLmV0aC5Db250cmFjdChjb25maWcuY29udHJhY3RzLlBhbmRvcmEuYWJpLCBjb25maWcuYWRkcmVzc2VzLlBhbmRvcmEpO1xuICAgIGNvbnN0IHByaWNlID0gYXdhaXQgcGFuLm1ldGhvZHNcbiAgICAgICAgLmdldE1heGltdW1Xb3JrZXJQcmljZSgpXG4gICAgICAgIC5jYWxsKCk7XG4gICAgICAgIFxuICAgIHJldHVybiBOdW1iZXIucGFyc2VJbnQocHJpY2UsIDEwKTtcbn07XG4iXX0=