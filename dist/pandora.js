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
      type: 'string',
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
      type: 'string',
      code: _errors.SPECIFIC_ADDRESS_REQUIRED,
      args: ['Pandora contract owner']
    },
    'ownerAddress': {
      type: 'string',
      code: _errors.SPECIFIC_ADDRESS_REQUIRED,
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
      type: 'string',
      code: _errors.SPECIFIC_ADDRESS_REQUIRED,
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9wYW5kb3JhLmpzIl0sIm5hbWVzIjpbInZlcnNpb24iLCJjb25maWciLCJleHBlY3QiLCJhbGwiLCJ0eXBlIiwiY29kZSIsIldFQjNfUkVRVUlSRUQiLCJDT05UUkFDVF9SRVFVSVJFRCIsImFyZ3MiLCJBRERSRVNTX1JFUVVJUkVEIiwicGFuIiwid2ViMyIsImV0aCIsIkNvbnRyYWN0IiwiY29udHJhY3RzIiwiUGFuZG9yYSIsImFiaSIsImFkZHJlc3NlcyIsIm1ldGhvZHMiLCJjYWxsIiwid2hpdGVsaXN0V29ya2VyT3duZXIiLCJwdWJsaXNoZXIiLCJvd25lckFkZHJlc3MiLCJQcm9taXNlIiwicmVzb2x2ZSIsInJlamVjdCIsIlNQRUNJRklDX0FERFJFU1NfUkVRVUlSRUQiLCJzZW5kIiwiZnJvbSIsIm9uIiwicmVjZWlwdCIsIk51bWJlciIsInN0YXR1cyIsIlRSQU5TQUNUSU9OX1VOU1VDQ0VTU0ZVTCIsImNyZWF0ZVdvcmtlck5vZGUiLCJnYXMiLCJldmVudHMiLCJXb3JrZXJOb2RlQ3JlYXRlZCIsInJldHVyblZhbHVlcyIsIndvcmtlck5vZGUiXSwibWFwcGluZ3MiOiJBQUFBOzs7Ozs7OztBQVFBOzs7Ozs7O0FBRUE7O0FBQ0E7Ozs7QUFRQTs7Ozs7O0FBTU8sTUFBTUEsVUFBVSxPQUFPQyxTQUFTLEVBQWhCLEtBQXVCO0FBRTFDQyxTQUFPQyxHQUFQLENBQVdGLE1BQVgsRUFBbUI7QUFDZixZQUFRO0FBQ0pHLFlBQU0sUUFERjtBQUVKQyxZQUFNQztBQUZGLEtBRE87QUFLZiw2QkFBeUI7QUFDckJGLFlBQU0sUUFEZTtBQUVyQkMsWUFBTUUseUJBRmU7QUFHckJDLFlBQU0sQ0FBQyxTQUFEO0FBSGUsS0FMVjtBQVVmLHlCQUFxQjtBQUNqQkosWUFBTSxRQURXO0FBRWpCQyxZQUFNSSx3QkFGVztBQUdqQkQsWUFBTSxDQUFDLFNBQUQ7QUFIVztBQVZOLEdBQW5CO0FBaUJBLFFBQU1FLE1BQU0sSUFBSVQsT0FBT1UsSUFBUCxDQUFZ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RSxNQUFmLE1BQTJCLENBQS9CLEVBQWtDO0FBRTlCLGFBQU9QLE9BQU8scUJBQVNRLGdDQUFULENBQVAsQ0FBUDtBQUNILEtBTHFCLENBT3RCO0FBQ0E7OztBQUVBVCxZQUFRTSxRQUFRTSxNQUFSLENBQWVDLGlCQUFmLENBQWlDQyxZQUFqQyxDQUE4Q0MsVUFBdEQsRUFWc0IsQ0FVNEM7QUFDckUsR0FsQkw7QUFtQkgsQ0ExQzJELENBQXJEIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBDb21tb24gUGFuZG9yYSBjb250cmFjdCBtZXRob2RzXG4gKiBUaGlzIGZpbGUgaXQgaXMgYSBwYXJ0IG9mIHRoZSBQYW5kb3JhIFB5cnJoYSBKYXZhc2NyaXB0IGxpYnJhcnlcbiAqIFxuICogQGZpbGUgcGFuZG9yYS5qc1xuICogQGF1dGhvciBLb3N0aWFudHluIFNteXJub3YgPGtvc3R5c2hAZ21haWwuY29tPlxuICogQGRhdGUgMjAxOFxuICovXG4ndXNlIHN0cmljdCc7XG5cbmltcG9ydCAqIGFzIGV4cGVjdCBmcm9tICcuL2hlbHBlcnMvZXhwZWN0JztcbmltcG9ydCBwanNFcnJvciwge1xuICAgIFdFQjNfUkVRVUlSRUQsXG4gICAgQ09OVFJBQ1RfUkVRVUlSRUQsXG4gICAgQUREUkVTU19SRVFVSVJFRCxcbiAgICBTUEVDSUZJQ19BRERSRVNTX1JFUVVJUkVELFxuICAgIFRSQU5TQUNUSU9OX1VOU1VDQ0VTU0ZVTFxufSBmcm9tICcuL2hlbHBlcnMvZXJyb3JzJztcblxuLyoqXG4gKiBHZXQgZGVwbG95ZWQgY29udHJhY3RzIHZlcnNpb25cbiAqIFxuICogQHBhcmFtIHtPYmplY3R9IGNvbmZpZyBMaWJyYXJ5IGNvbmZpZyAocHJvdmlkZWQgYnkgdGhlIHByb3h5IGJ1dCBjYW4gYmUgb3ZlcnJpZGRlbilcbiAqIEByZXR1cm5zIHtQcm9taXNlfVxuICovXG5leHBvcnQgY29uc3QgdmVyc2lvbiA9IGFzeW5jIChjb25maWcgPSB7fSkgPT4ge1xuXG4gICAgZXhwZWN0LmFsbChjb25maWcsIHtcbiAgICAgICAgJ3dlYjMnOiB7XG4gICAgICAgICAgICB0eXBlOiAnb2JqZWN0JyxcbiAgICAgICAgICAgIGNvZGU6IFdFQjNfUkVRVUlSRURcbiAgICAgICAgfSxcbiAgICAgICAgJ2NvbnRyYWN0cy5QYW5kb3JhLmFiaSc6IHtcbiAgICAgICAgICAgIHR5cGU6ICdvYmplY3QnLFxuICAgICAgICAgICAgY29kZTogQ09OVFJBQ1RfUkVRVUlSRUQsXG4gICAgICAgICAgICBhcmdzOiBbJ1BhbmRvcmEnXVxuICAgICAgICB9LFxuICAgICAgICAnYWRkcmVzc2VzLlBhbmRvcmEnOiB7XG4gICAgICAgICAgICB0eXBlOiAnc3RyaW5nJyxcbiAgICAgICAgICAgIGNvZGU6IEFERFJFU1NfUkVRVUlSRUQsXG4gICAgICAgICAgICBhcmdzOiBbJ1BhbmRvcmEnXVxuICAgICAgICB9XG4gICAgfSk7XG5cbiAgICBjb25zdCBwYW4gPSBuZXcgY29uZmlnLndlYjMuZXRoLkNvbnRyYWN0KGNvbmZpZy5jb250cmFjdHMuUGFuZG9yYS5hYmksIGNvbmZpZy5hZGRyZXNzZXMuUGFuZG9yYSk7XG4gICAgY29uc3QgdmVyc2lvbiA9IGF3YWl0IHBhbi5tZXRob2RzXG4gICAgICAgIC52ZXJzaW9uKClcbiAgICAgICAgLmNhbGwoKTtcbiAgICAgICAgXG4gICAgcmV0dXJuIHZlcnNpb247XG59O1xuXG4vKipcbiAqIFB1YmxpYyBhbmQgZXh0ZXJuYWxBZGRzIGFkZHJlc3MgdG8gdGhlIHdoaXRlbGlzdCBvZiBvd25lcnMgYWxsb3dlZCB0byBjcmVhdGUgV29ya2VyTm9kZXMgY29udHJhY3RzXG4gKiBcbiAqIEBwYXJhbSB7U3RyaW5nfSBwdWJsaXNoZXIgXG4gKiBAcGFyYW0ge1N0cmluZ30gb3duZXJBZGRyZXNzIFxuICogQHBhcmFtIHtPYmplY3R9IGNvbmZpZyBMaWJyYXJ5IGNvbmZpZyAocHJvdmlkZWQgYnkgdGhlIHByb3h5IGJ1dCBjYW4gYmUgb3ZlcnJpZGRlbikgXG4gKi9cbmV4cG9ydCBjb25zdCB3aGl0ZWxpc3RXb3JrZXJPd25lciA9IChwdWJsaXNoZXIsIG93bmVyQWRkcmVzcywgY29uZmlnID0ge30pID0+IG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcbiAgICBcbiAgICBleHBlY3QuYWxsKHsgcHVibGlzaGVyLCBvd25lckFkZHJlc3MgfSwge1xuICAgICAgICAncHVibGlzaGVyJzoge1xuICAgICAgICAgICAgdHlwZTogJ3N0cmluZycsXG4gICAgICAgICAgICBjb2RlOiBTUEVDSUZJQ19BRERSRVNTX1JFUVVJUkVELFxuICAgICAgICAgICAgYXJnczogWydQYW5kb3JhIGNvbnRyYWN0IG93bmVyJ11cbiAgICAgICAgfSxcbiAgICAgICAgJ293bmVyQWRkcmVzcyc6IHtcbiAgICAgICAgICAgIHR5cGU6ICdzdHJpbmcnLFxuICAgICAgICAgICAgY29kZTogU1BFQ0lGSUNfQUREUkVTU19SRVFVSVJFRCxcbiAgICAgICAgICAgIGFyZ3M6IFsnV29ya2VyTm9kZSBvd25lciddXG4gICAgICAgIH1cbiAgICB9KTtcblxuICAgIGV4cGVjdC5hbGwoY29uZmlnLCB7XG4gICAgICAgICd3ZWIzJzoge1xuICAgICAgICAgICAgdHlwZTogJ29iamVjdCcsXG4gICAgICAgICAgICBjb2RlOiBXRUIzX1JFUVVJUkVEXG4gICAgICAgIH1cbiAgICB9KTtcblxuICAgIGNvbnN0IHBhbiA9IG5ldyBjb25maWcud2ViMy5ldGguQ29udHJhY3QoY29uZmlnLmNvbnRyYWN0cy5QYW5kb3JhLmFiaSwgY29uZmlnLmFkZHJlc3Nlcy5QYW5kb3JhKTtcbiAgICBwYW4ubWV0aG9kc1xuICAgICAgICAud2hpdGVsaXN0V29ya2VyT3duZXIob3duZXJBZGRyZXNzKVxuICAgICAgICAuc2VuZCh7XG4gICAgICAgICAgICBmcm9tOiBwdWJsaXNoZXJcbiAgICAgICAgfSlcbiAgICAgICAgLm9uKCdlcnJvcicsIHJlamVjdClcbiAgICAgICAgLm9uKCdyZWNlaXB0JywgcmVjZWlwdCA9PiB7XG5cbiAgICAgICAgICAgIGlmIChOdW1iZXIocmVjZWlwdC5zdGF0dXMpID09PSAwKSB7XG5cbiAgICAgICAgICAgICAgICByZXR1cm4gcmVqZWN0KHBqc0Vycm9yKFRSQU5TQUNUSU9OX1VOU1VDQ0VTU0ZVTCkpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICByZXNvbHZlKHJlY2VpcHQpO1xuICAgICAgICB9KTtcbn0pO1xuXG4vKipcbiAqIENyZWF0ZXMsIHJlZ2lzdGVycyBhbmQgcmV0dXJucyBhIG5ldyB3b3JrZXIgbm9kZSBvd25lZCBieSB0aGUgY2FsbGVyIG9mIHRoZSBjb250cmFjdC4gXG4gKiBDYW4gYmUgY2FsbGVkIG9ubHkgYnkgdGhlIHdoaXRlbGlzdGVkIG5vZGUgb3duZXIgYWRkcmVzc1xuICogXG4gKiBAcGFyYW0ge2FueX0gcHVibGlzaGVyIFxuICogQHBhcmFtIHthbnl9IFtjb25maWc9e31dIFxuICovXG5leHBvcnQgY29uc3QgY3JlYXRlV29ya2VyTm9kZSA9IChwdWJsaXNoZXIsIGNvbmZpZyA9IHt9KSA9PiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG5cbiAgICBleHBlY3QuYWxsKHsgcHVibGlzaGVyIH0sIHtcbiAgICAgICAgJ3B1Ymxpc2hlcic6IHtcbiAgICAgICAgICAgIHR5cGU6ICdzdHJpbmcnLFxuICAgICAgICAgICAgY29kZTogU1BFQ0lGSUNfQUREUkVTU19SRVFVSVJFRCxcbiAgICAgICAgICAgIGFyZ3M6IFsnUGFuZG9yYSBjb250cmFjdCBvd25lciddXG4gICAgICAgIH1cbiAgICB9KTtcblxuICAgIGV4cGVjdC5hbGwoY29uZmlnLCB7XG4gICAgICAgICd3ZWIzJzoge1xuICAgICAgICAgICAgdHlwZTogJ29iamVjdCcsXG4gICAgICAgICAgICBjb2RlOiBXRUIzX1JFUVVJUkVEXG4gICAgICAgIH0sXG4gICAgICAgICdjb250cmFjdHMuV29ya2VyTm9kZSc6IHtcbiAgICAgICAgICAgIHR5cGU6ICdvYmplY3QnLFxuICAgICAgICAgICAgY29kZTogQ09OVFJBQ1RfUkVRVUlSRUQsXG4gICAgICAgICAgICBhcmdzOiBbJ1dvcmtlck5vZGUnXVxuICAgICAgICB9XG4gICAgfSk7XG5cbiAgICBjb25zdCBwYW4gPSBuZXcgY29uZmlnLndlYjMuZXRoLkNvbnRyYWN0KGNvbmZpZy5jb250cmFjdHMuUGFuZG9yYS5hYmksIGNvbmZpZy5hZGRyZXNzZXMuUGFuZG9yYSk7XG4gICAgcGFuLm1ldGhvZHNcbiAgICAgICAgLmNyZWF0ZVdvcmtlck5vZGUoKVxuICAgICAgICAuc2VuZCh7XG4gICAgICAgICAgICBmcm9tOiBwdWJsaXNoZXIsXG4gICAgICAgICAgICBnYXM6IDY3MDAwMDAvLyBiZWNhdXNlIHRoaXMgd29ya2Zsb3cgaXMgdG9vIGdyZWVkeVxuICAgICAgICB9KVxuICAgICAgICAub24oJ2Vycm9yJywgcmVqZWN0KVxuICAgICAgICAub24oJ3JlY2VpcHQnLCByZWNlaXB0ID0+IHtcblxuICAgICAgICAgICAgaWYgKE51bWJlcihyZWNlaXB0LnN0YXR1cykgPT09IDApIHtcblxuICAgICAgICAgICAgICAgIHJldHVybiByZWplY3QocGpzRXJyb3IoVFJBTlNBQ1RJT05fVU5TVUNDRVNTRlVMKSk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIC8vIGNvbnNvbGUubG9nKCc+Pj4+PiB3b3JrZXIgbm9kZSByZXN1bHQnLCByZWNlaXB0LmV2ZW50cy5Xb3JrZXJOb2RlQ3JlYXRlZC5yZXR1cm5WYWx1ZXMpXG4gICAgICAgICAgICAvLyBjb25zb2xlLmxvZygnPj4+Pj4gd29ya2VyIG5vZGUgYWRkcmVzcycsIHJlY2VpcHQuZXZlbnRzLldvcmtlck5vZGVDcmVhdGVkLmFkZHJlc3MpXG5cbiAgICAgICAgICAgIHJlc29sdmUocmVjZWlwdC5ldmVudHMuV29ya2VyTm9kZUNyZWF0ZWQucmV0dXJuVmFsdWVzLndvcmtlck5vZGUpOy8vIGFkZHJlc3Mgb2YgY3JlYXRlZCBXb3JrZXJOb2RlXG4gICAgICAgIH0pO1xufSk7XG4iXX0=