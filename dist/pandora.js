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
exports.createWorkerNode = exports.whitelistWorkerOwner = exports.version = void 0;

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
 * @param {any} publisher 
 * @param {any} [config={}] 
 */


exports.whitelistWorkerOwner = whitelistWorkerOwner;

const createWorkerNode = (publisher, config = {}) => new Promise((resolve, reject) => {
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
  pan.methods.createWorkerNode().send({
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

exports.createWorkerNode = createWorkerNode;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9wYW5kb3JhLmpzIl0sIm5hbWVzIjpbInZlcnNpb24iLCJjb25maWciLCJleHBlY3QiLCJhbGwiLCJ0eXBlIiwiY29kZSIsIldFQjNfUkVRVUlSRUQiLCJDT05UUkFDVF9SRVFVSVJFRCIsImFyZ3MiLCJBRERSRVNTX1JFUVVJUkVEIiwicGFuIiwid2ViMyIsImV0aCIsIkNvbnRyYWN0IiwiY29udHJhY3RzIiwiUGFuZG9yYSIsImFiaSIsImFkZHJlc3NlcyIsIm1ldGhvZHMiLCJjYWxsIiwid2hpdGVsaXN0V29ya2VyT3duZXIiLCJwdWJsaXNoZXIiLCJvd25lckFkZHJlc3MiLCJQcm9taXNlIiwicmVzb2x2ZSIsInJlamVjdCIsInNlbmQiLCJmcm9tIiwib24iLCJyZWNlaXB0IiwiTnVtYmVyIiwic3RhdHVzIiwiVFJBTlNBQ1RJT05fVU5TVUNDRVNTRlVMIiwiY3JlYXRlV29ya2VyTm9kZSIsImdhcyIsImV2ZW50cyIsIldvcmtlck5vZGVDcmVhdGVkIiwicmV0dXJuVmFsdWVzIiwid29ya2VyTm9kZSJdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7Ozs7O0FBUUE7Ozs7Ozs7QUFFQTs7QUFDQTs7OztBQU9BOzs7Ozs7QUFNTyxNQUFNQSxVQUFVLE9BQU9DLFNBQVMsRUFBaEIsS0FBdUI7QUFFMUNDLFNBQU9DLEdBQVAsQ0FBV0YsTUFBWCxFQUFtQjtBQUNmLFlBQVE7QUFDSkcsWUFBTSxRQURGO0FBRUpDLFlBQU1DO0FBRkYsS0FETztBQUtmLDZCQUF5QjtBQUNyQkYsWUFBTSxRQURlO0FBRXJCQyxZQUFNRSx5QkFGZTtBQUdyQkMsWUFBTSxDQUFDLFNBQUQ7QUFIZSxLQUxWO0FBVWYseUJBQXFCO0FBQ2pCSixZQUFNLFNBRFc7QUFFakJDLFlBQU1JLHdCQUZXO0FBR2pCRCxZQUFNLENBQUMsU0FBRDtBQUhXO0FBVk4sR0FBbkI7QUFpQkEsUUFBTUUsTUFBTSxJQUFJVCxPQUFPVSxJQUFQLENBQVlDLEdBQVosQ0FBZ0JDLFFBQXBCLENBQTZCWixP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TixPQUFPLHFCQUFTTyxnQ0FBVCxDQUFQLENBQVA7QUFDSCxLQUxxQixDQU90QjtBQUNBOzs7QUFFQVIsWUFBUUssUUFBUU0sTUFBUixDQUFlQyxpQkFBZixDQUFpQ0MsWUFBakMsQ0FBOENDLFVBQXRELEVBVnNCLENBVTRDO0FBQ3JFLEdBbEJMO0FBbUJILENBMUMyRCxDQUFyRCIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogQ29tbW9uIFBhbmRvcmEgY29udHJhY3QgbWV0aG9kc1xuICogVGhpcyBmaWxlIGl0IGlzIGEgcGFydCBvZiB0aGUgUGFuZG9yYSBQeXJyaGEgSmF2YXNjcmlwdCBsaWJyYXJ5XG4gKiBcbiAqIEBmaWxlIHBhbmRvcmEuanNcbiAqIEBhdXRob3IgS29zdGlhbnR5biBTbXlybm92IDxrb3N0eXNoQGdtYWlsLmNvbT5cbiAqIEBkYXRlIDIwMThcbiAqL1xuJ3VzZSBzdHJpY3QnO1xuXG5pbXBvcnQgKiBhcyBleHBlY3QgZnJvbSAnLi9oZWxwZXJzL2V4cGVjdCc7XG5pbXBvcnQgcGpzRXJyb3IsIHtcbiAgICBXRUIzX1JFUVVJUkVELFxuICAgIENPTlRSQUNUX1JFUVVJUkVELFxuICAgIEFERFJFU1NfUkVRVUlSRUQsXG4gICAgVFJBTlNBQ1RJT05fVU5TVUNDRVNTRlVMXG59IGZyb20gJy4vaGVscGVycy9lcnJvcnMnO1xuXG4vKipcbiAqIEdldCBkZXBsb3llZCBjb250cmFjdHMgdmVyc2lvblxuICogXG4gKiBAcGFyYW0ge09iamVjdH0gY29uZmlnIExpYnJhcnkgY29uZmlnIChwcm92aWRlZCBieSB0aGUgcHJveHkgYnV0IGNhbiBiZSBvdmVycmlkZGVuKVxuICogQHJldHVybnMge1Byb21pc2V9XG4gKi9cbmV4cG9ydCBjb25zdCB2ZXJzaW9uID0gYXN5bmMgKGNvbmZpZyA9IHt9KSA9PiB7XG5cbiAgICBleHBlY3QuYWxsKGNvbmZpZywge1xuICAgICAgICAnd2ViMyc6IHtcbiAgICAgICAgICAgIHR5cGU6ICdvYmplY3QnLFxuICAgICAgICAgICAgY29kZTogV0VCM19SRVFVSVJFRFxuICAgICAgICB9LFxuICAgICAgICAnY29udHJhY3RzLlBhbmRvcmEuYWJpJzoge1xuICAgICAgICAgICAgdHlwZTogJ29iamVjdCcsXG4gICAgICAgICAgICBjb2RlOiBDT05UUkFDVF9SRVFVSVJFRCxcbiAgICAgICAgICAgIGFyZ3M6IFsnUGFuZG9yYSddXG4gICAgICAgIH0sXG4gICAgICAgICdhZGRyZXNzZXMuUGFuZG9yYSc6IHtcbiAgICAgICAgICAgIHR5cGU6ICdhZGRyZXNzJyxcbiAgICAgICAgICAgIGNvZGU6IEFERFJFU1NfUkVRVUlSRUQsXG4gICAgICAgICAgICBhcmdzOiBbJ1BhbmRvcmEnXVxuICAgICAgICB9XG4gICAgfSk7XG5cbiAgICBjb25zdCBwYW4gPSBuZXcgY29uZmlnLndlYjMuZXRoLkNvbnRyYWN0KGNvbmZpZy5jb250cmFjdHMuUGFuZG9yYS5hYmksIGNvbmZpZy5hZGRyZXNzZXMuUGFuZG9yYSk7XG4gICAgY29uc3QgdmVyc2lvbiA9IGF3YWl0IHBhbi5tZXRob2RzXG4gICAgICAgIC52ZXJzaW9uKClcbiAgICAgICAgLmNhbGwoKTtcbiAgICAgICAgXG4gICAgcmV0dXJuIHZlcnNpb247XG59O1xuXG4vKipcbiAqIFB1YmxpYyBhbmQgZXh0ZXJuYWxBZGRzIGFkZHJlc3MgdG8gdGhlIHdoaXRlbGlzdCBvZiBvd25lcnMgYWxsb3dlZCB0byBjcmVhdGUgV29ya2VyTm9kZXMgY29udHJhY3RzXG4gKiBcbiAqIEBwYXJhbSB7U3RyaW5nfSBwdWJsaXNoZXIgXG4gKiBAcGFyYW0ge1N0cmluZ30gb3duZXJBZGRyZXNzIFxuICogQHBhcmFtIHtPYmplY3R9IGNvbmZpZyBMaWJyYXJ5IGNvbmZpZyAocHJvdmlkZWQgYnkgdGhlIHByb3h5IGJ1dCBjYW4gYmUgb3ZlcnJpZGRlbikgXG4gKi9cbmV4cG9ydCBjb25zdCB3aGl0ZWxpc3RXb3JrZXJPd25lciA9IChwdWJsaXNoZXIsIG93bmVyQWRkcmVzcywgY29uZmlnID0ge30pID0+IG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcbiAgICBcbiAgICBleHBlY3QuYWxsKHsgcHVibGlzaGVyLCBvd25lckFkZHJlc3MgfSwge1xuICAgICAgICAncHVibGlzaGVyJzoge1xuICAgICAgICAgICAgdHlwZTogJ2FkZHJlc3MnLFxuICAgICAgICAgICAgY29kZTogQUREUkVTU19SRVFVSVJFRCxcbiAgICAgICAgICAgIGFyZ3M6IFsnUGFuZG9yYSBjb250cmFjdCBvd25lciddXG4gICAgICAgIH0sXG4gICAgICAgICdvd25lckFkZHJlc3MnOiB7XG4gICAgICAgICAgICB0eXBlOiAnYWRkcmVzcycsXG4gICAgICAgICAgICBjb2RlOiBBRERSRVNTX1JFUVVJUkVELFxuICAgICAgICAgICAgYXJnczogWydXb3JrZXJOb2RlIG93bmVyJ11cbiAgICAgICAgfVxuICAgIH0pO1xuXG4gICAgZXhwZWN0LmFsbChjb25maWcsIHtcbiAgICAgICAgJ3dlYjMnOiB7XG4gICAgICAgICAgICB0eXBlOiAnb2JqZWN0JyxcbiAgICAgICAgICAgIGNvZGU6IFdFQjNfUkVRVUlSRURcbiAgICAgICAgfVxuICAgIH0pO1xuXG4gICAgY29uc3QgcGFuID0gbmV3IGNvbmZpZy53ZWIzLmV0aC5Db250cmFjdChjb25maWcuY29udHJhY3RzLlBhbmRvcmEuYWJpLCBjb25maWcuYWRkcmVzc2VzLlBhbmRvcmEpO1xuICAgIHBhbi5tZXRob2RzXG4gICAgICAgIC53aGl0ZWxpc3RXb3JrZXJPd25lcihvd25lckFkZHJlc3MpXG4gICAgICAgIC5zZW5kKHtcbiAgICAgICAgICAgIGZyb206IHB1Ymxpc2hlclxuICAgICAgICB9KVxuICAgICAgICAub24oJ2Vycm9yJywgcmVqZWN0KVxuICAgICAgICAub24oJ3JlY2VpcHQnLCByZWNlaXB0ID0+IHtcblxuICAgICAgICAgICAgaWYgKE51bWJlcihyZWNlaXB0LnN0YXR1cykgPT09IDApIHtcblxuICAgICAgICAgICAgICAgIHJldHVybiByZWplY3QocGpzRXJyb3IoVFJBTlNBQ1RJT05fVU5TVUNDRVNTRlVMKSk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHJlc29sdmUocmVjZWlwdCk7XG4gICAgICAgIH0pO1xufSk7XG5cbi8qKlxuICogQ3JlYXRlcywgcmVnaXN0ZXJzIGFuZCByZXR1cm5zIGEgbmV3IHdvcmtlciBub2RlIG93bmVkIGJ5IHRoZSBjYWxsZXIgb2YgdGhlIGNvbnRyYWN0LiBcbiAqIENhbiBiZSBjYWxsZWQgb25seSBieSB0aGUgd2hpdGVsaXN0ZWQgbm9kZSBvd25lciBhZGRyZXNzXG4gKiBcbiAqIEBwYXJhbSB7YW55fSBwdWJsaXNoZXIgXG4gKiBAcGFyYW0ge2FueX0gW2NvbmZpZz17fV0gXG4gKi9cbmV4cG9ydCBjb25zdCBjcmVhdGVXb3JrZXJOb2RlID0gKHB1Ymxpc2hlciwgY29uZmlnID0ge30pID0+IG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcblxuICAgIGV4cGVjdC5hbGwoeyBwdWJsaXNoZXIgfSwge1xuICAgICAgICAncHVibGlzaGVyJzoge1xuICAgICAgICAgICAgdHlwZTogJ2FkZHJlc3MnLFxuICAgICAgICAgICAgY29kZTogQUREUkVTU19SRVFVSVJFRCxcbiAgICAgICAgICAgIGFyZ3M6IFsnUGFuZG9yYSBjb250cmFjdCBvd25lciddXG4gICAgICAgIH1cbiAgICB9KTtcblxuICAgIGV4cGVjdC5hbGwoY29uZmlnLCB7XG4gICAgICAgICd3ZWIzJzoge1xuICAgICAgICAgICAgdHlwZTogJ29iamVjdCcsXG4gICAgICAgICAgICBjb2RlOiBXRUIzX1JFUVVJUkVEXG4gICAgICAgIH0sXG4gICAgICAgICdjb250cmFjdHMuV29ya2VyTm9kZSc6IHtcbiAgICAgICAgICAgIHR5cGU6ICdvYmplY3QnLFxuICAgICAgICAgICAgY29kZTogQ09OVFJBQ1RfUkVRVUlSRUQsXG4gICAgICAgICAgICBhcmdzOiBbJ1dvcmtlck5vZGUnXVxuICAgICAgICB9XG4gICAgfSk7XG5cbiAgICBjb25zdCBwYW4gPSBuZXcgY29uZmlnLndlYjMuZXRoLkNvbnRyYWN0KGNvbmZpZy5jb250cmFjdHMuUGFuZG9yYS5hYmksIGNvbmZpZy5hZGRyZXNzZXMuUGFuZG9yYSk7XG4gICAgcGFuLm1ldGhvZHNcbiAgICAgICAgLmNyZWF0ZVdvcmtlck5vZGUoKVxuICAgICAgICAuc2VuZCh7XG4gICAgICAgICAgICBmcm9tOiBwdWJsaXNoZXIsXG4gICAgICAgICAgICBnYXM6IDY3MDAwMDAvLyBiZWNhdXNlIHRoaXMgd29ya2Zsb3cgaXMgdG9vIGdyZWVkeVxuICAgICAgICB9KVxuICAgICAgICAub24oJ2Vycm9yJywgcmVqZWN0KVxuICAgICAgICAub24oJ3JlY2VpcHQnLCByZWNlaXB0ID0+IHtcblxuICAgICAgICAgICAgaWYgKE51bWJlcihyZWNlaXB0LnN0YXR1cykgPT09IDApIHtcblxuICAgICAgICAgICAgICAgIHJldHVybiByZWplY3QocGpzRXJyb3IoVFJBTlNBQ1RJT05fVU5TVUNDRVNTRlVMKSk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIC8vIGNvbnNvbGUubG9nKCc+Pj4+PiB3b3JrZXIgbm9kZSByZXN1bHQnLCByZWNlaXB0LmV2ZW50cy5Xb3JrZXJOb2RlQ3JlYXRlZC5yZXR1cm5WYWx1ZXMpXG4gICAgICAgICAgICAvLyBjb25zb2xlLmxvZygnPj4+Pj4gd29ya2VyIG5vZGUgYWRkcmVzcycsIHJlY2VpcHQuZXZlbnRzLldvcmtlck5vZGVDcmVhdGVkLmFkZHJlc3MpXG5cbiAgICAgICAgICAgIHJlc29sdmUocmVjZWlwdC5ldmVudHMuV29ya2VyTm9kZUNyZWF0ZWQucmV0dXJuVmFsdWVzLndvcmtlck5vZGUpOy8vIGFkZHJlc3Mgb2YgY3JlYXRlZCBXb3JrZXJOb2RlXG4gICAgICAgIH0pO1xufSk7XG4iXX0=