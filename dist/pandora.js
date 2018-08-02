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

require("core-js/modules/es6.number.constructor");

require("core-js/modules/es6.promise");

require("regenerator-runtime/runtime");

var expect = _interopRequireWildcard(require("./helpers/expect"));

var _errors = _interopRequireWildcard(require("./helpers/errors"));

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

/**
 * Get deployed contracts version
 * 
 * @param {Object} config Library config (provided by the proxy but can be overridden)
 * @returns {Promise}
 */
var version =
/*#__PURE__*/
function () {
  var _ref = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee() {
    var config,
        pan,
        version,
        _args = arguments;
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            config = _args.length > 0 && _args[0] !== undefined ? _args[0] : {};
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
            pan = new config.web3.eth.Contract(config.contracts.Pandora.abi, config.addresses.Pandora);
            _context.next = 5;
            return pan.methods.version().call();

          case 5:
            version = _context.sent;
            return _context.abrupt("return", version);

          case 7:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, this);
  }));

  return function version() {
    return _ref.apply(this, arguments);
  };
}();
/**
 * Public and externalAdds address to the whitelist of owners allowed to create WorkerNodes contracts
 * 
 * @param {String} publisher 
 * @param {String} ownerAddress 
 * @param {Object} config Library config (provided by the proxy but can be overridden) 
 */


exports.version = version;

var whitelistWorkerOwner = function whitelistWorkerOwner(publisher, ownerAddress) {
  var config = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
  return new Promise(function (resolve, reject) {
    expect.all({
      publisher: publisher,
      ownerAddress: ownerAddress
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
    var pan = new config.web3.eth.Contract(config.contracts.Pandora.abi, config.addresses.Pandora);
    pan.methods.whitelistWorkerOwner(ownerAddress).send({
      from: publisher
    }).on('error', reject).on('receipt', function (receipt) {
      if (Number(receipt.status) === 0) {
        return reject((0, _errors.default)(_errors.TRANSACTION_UNSUCCESSFUL));
      }

      resolve(receipt);
    });
  });
};
/**
 * Creates, registers and returns a new worker node owned by the caller of the contract. 
 * Can be called only by the whitelisted node owner address
 * 
 * @param {any} publisher 
 * @param {any} [config={}] 
 */


exports.whitelistWorkerOwner = whitelistWorkerOwner;

var createWorkerNode = function createWorkerNode(publisher) {
  var config = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  return new Promise(function (resolve, reject) {
    expect.all({
      publisher: publisher
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
    var pan = new config.web3.eth.Contract(config.contracts.Pandora.abi, config.addresses.Pandora);
    pan.methods.createWorkerNode().send({
      from: publisher,
      gas: 6700000 // because this workflow is too greedy

    }).on('error', reject).on('receipt', function (receipt) {
      if (Number(receipt.status) === 0) {
        return reject((0, _errors.default)(_errors.TRANSACTION_UNSUCCESSFUL));
      } // console.log('>>>>> worker node result', receipt.events.WorkerNodeCreated.returnValues)
      // console.log('>>>>> worker node address', receipt.events.WorkerNodeCreated.address)


      resolve(receipt.events.WorkerNodeCreated.returnValues.workerNode); // address of created WorkerNode
    });
  });
};

exports.createWorkerNode = createWorkerNode;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9wYW5kb3JhLmpzIl0sIm5hbWVzIjpbInZlcnNpb24iLCJjb25maWciLCJleHBlY3QiLCJhbGwiLCJ0eXBlIiwiY29kZSIsIldFQjNfUkVRVUlSRUQiLCJDT05UUkFDVF9SRVFVSVJFRCIsImFyZ3MiLCJBRERSRVNTX1JFUVVJUkVEIiwicGFuIiwid2ViMyIsImV0aCIsIkNvbnRyYWN0IiwiY29udHJhY3RzIiwiUGFuZG9yYSIsImFiaSIsImFkZHJlc3NlcyIsIm1ldGhvZHMiLCJjYWxsIiwid2hpdGVsaXN0V29ya2VyT3duZXIiLCJwdWJsaXNoZXIiLCJvd25lckFkZHJlc3MiLCJQcm9taXNlIiwicmVzb2x2ZSIsInJlamVjdCIsInNlbmQiLCJmcm9tIiwib24iLCJyZWNlaXB0IiwiTnVtYmVyIiwic3RhdHVzIiwiVFJBTlNBQ1RJT05fVU5TVUNDRVNTRlVMIiwiY3JlYXRlV29ya2VyTm9kZSIsImdhcyIsImV2ZW50cyIsIldvcmtlck5vZGVDcmVhdGVkIiwicmV0dXJuVmFsdWVzIiwid29ya2VyTm9kZSJdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7Ozs7O0FBUUE7Ozs7Ozs7Ozs7Ozs7QUFFQTs7QUFDQTs7Ozs7Ozs7QUFPQTs7Ozs7O0FBTU8sSUFBTUEsT0FBTztBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUEsMEJBQUc7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQU9DLFlBQUFBLE1BQVAsMkRBQWdCLEVBQWhCO0FBRW5CQyxZQUFBQSxNQUFNLENBQUNDLEdBQVAsQ0FBV0YsTUFBWCxFQUFtQjtBQUNmLHNCQUFRO0FBQ0pHLGdCQUFBQSxJQUFJLEVBQUUsUUFERjtBQUVKQyxnQkFBQUEsSUFBSSxFQUFFQztBQUZGLGVBRE87QUFLZix1Q0FBeUI7QUFDckJGLGdCQUFBQSxJQUFJLEVBQUUsUUFEZTtBQUVyQkMsZ0JBQUFBLElBQUksRUFBRUUseUJBRmU7QUFHckJDLGdCQUFBQSxJQUFJLEVBQUUsQ0FBQyxTQUFEO0FB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TyxDQUFDSyxPQUFPLENBQUNNLE1BQVIsQ0FBZUMsaUJBQWYsQ0FBaUNDLFlBQWpDLENBQThDQyxVQUEvQyxDQUFQLENBVnNCLENBVTRDO0FBQ3JFLEtBbEJMO0FBbUJILEdBMUMyRCxDQUE1QjtBQUFBLENBQXpCIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBDb21tb24gUGFuZG9yYSBjb250cmFjdCBtZXRob2RzXG4gKiBUaGlzIGZpbGUgaXQgaXMgYSBwYXJ0IG9mIHRoZSBQYW5kb3JhIFB5cnJoYSBKYXZhc2NyaXB0IGxpYnJhcnlcbiAqIFxuICogQGZpbGUgcGFuZG9yYS5qc1xuICogQGF1dGhvciBLb3N0aWFudHluIFNteXJub3YgPGtvc3R5c2hAZ21haWwuY29tPlxuICogQGRhdGUgMjAxOFxuICovXG4ndXNlIHN0cmljdCc7XG5cbmltcG9ydCAqIGFzIGV4cGVjdCBmcm9tICcuL2hlbHBlcnMvZXhwZWN0JztcbmltcG9ydCBwanNFcnJvciwge1xuICAgIFdFQjNfUkVRVUlSRUQsXG4gICAgQ09OVFJBQ1RfUkVRVUlSRUQsXG4gICAgQUREUkVTU19SRVFVSVJFRCxcbiAgICBUUkFOU0FDVElPTl9VTlNVQ0NFU1NGVUxcbn0gZnJvbSAnLi9oZWxwZXJzL2Vycm9ycyc7XG5cbi8qKlxuICogR2V0IGRlcGxveWVkIGNvbnRyYWN0cyB2ZXJzaW9uXG4gKiBcbiAqIEBwYXJhbSB7T2JqZWN0fSBjb25maWcgTGlicmFyeSBjb25maWcgKHByb3ZpZGVkIGJ5IHRoZSBwcm94eSBidXQgY2FuIGJlIG92ZXJyaWRkZW4pXG4gKiBAcmV0dXJucyB7UHJvbWlzZX1cbiAqL1xuZXhwb3J0IGNvbnN0IHZlcnNpb24gPSBhc3luYyAoY29uZmlnID0ge30pID0+IHtcblxuICAgIGV4cGVjdC5hbGwoY29uZmlnLCB7XG4gICAgICAgICd3ZWIzJzoge1xuICAgICAgICAgICAgdHlwZTogJ29iamVjdCcsXG4gICAgICAgICAgICBjb2RlOiBXRUIzX1JFUVVJUkVEXG4gICAgICAgIH0sXG4gICAgICAgICdjb250cmFjdHMuUGFuZG9yYS5hYmknOiB7XG4gICAgICAgICAgICB0eXBlOiAnb2JqZWN0JyxcbiAgICAgICAgICAgIGNvZGU6IENPTlRSQUNUX1JFUVVJUkVELFxuICAgICAgICAgICAgYXJnczogWydQYW5kb3JhJ11cbiAgICAgICAgfSxcbiAgICAgICAgJ2FkZHJlc3Nlcy5QYW5kb3JhJzoge1xuICAgICAgICAgICAgdHlwZTogJ2FkZHJlc3MnLFxuICAgICAgICAgICAgY29kZTogQUREUkVTU19SRVFVSVJFRCxcbiAgICAgICAgICAgIGFyZ3M6IFsnUGFuZG9yYSddXG4gICAgICAgIH1cbiAgICB9KTtcblxuICAgIGNvbnN0IHBhbiA9IG5ldyBjb25maWcud2ViMy5ldGguQ29udHJhY3QoY29uZmlnLmNvbnRyYWN0cy5QYW5kb3JhLmFiaSwgY29uZmlnLmFkZHJlc3Nlcy5QYW5kb3JhKTtcbiAgICBjb25zdCB2ZXJzaW9uID0gYXdhaXQgcGFuLm1ldGhvZHNcbiAgICAgICAgLnZlcnNpb24oKVxuICAgICAgICAuY2FsbCgpO1xuICAgICAgICBcbiAgICByZXR1cm4gdmVyc2lvbjtcbn07XG5cbi8qKlxuICogUHVibGljIGFuZCBleHRlcm5hbEFkZHMgYWRkcmVzcyB0byB0aGUgd2hpdGVsaXN0IG9mIG93bmVycyBhbGxvd2VkIHRvIGNyZWF0ZSBXb3JrZXJOb2RlcyBjb250cmFjdHNcbiAqIFxuICogQHBhcmFtIHtTdHJpbmd9IHB1Ymxpc2hlciBcbiAqIEBwYXJhbSB7U3RyaW5nfSBvd25lckFkZHJlc3MgXG4gKiBAcGFyYW0ge09iamVjdH0gY29uZmlnIExpYnJhcnkgY29uZmlnIChwcm92aWRlZCBieSB0aGUgcHJveHkgYnV0IGNhbiBiZSBvdmVycmlkZGVuKSBcbiAqL1xuZXhwb3J0IGNvbnN0IHdoaXRlbGlzdFdvcmtlck93bmVyID0gKHB1Ymxpc2hlciwgb3duZXJBZGRyZXNzLCBjb25maWcgPSB7fSkgPT4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuICAgIFxuICAgIGV4cGVjdC5hbGwoeyBwdWJsaXNoZXIsIG93bmVyQWRkcmVzcyB9LCB7XG4gICAgICAgICdwdWJsaXNoZXInOiB7XG4gICAgICAgICAgICB0eXBlOiAnYWRkcmVzcycsXG4gICAgICAgICAgICBjb2RlOiBBRERSRVNTX1JFUVVJUkVELFxuICAgICAgICAgICAgYXJnczogWydQYW5kb3JhIGNvbnRyYWN0IG93bmVyJ11cbiAgICAgICAgfSxcbiAgICAgICAgJ293bmVyQWRkcmVzcyc6IHtcbiAgICAgICAgICAgIHR5cGU6ICdhZGRyZXNzJyxcbiAgICAgICAgICAgIGNvZGU6IEFERFJFU1NfUkVRVUlSRUQsXG4gICAgICAgICAgICBhcmdzOiBbJ1dvcmtlck5vZGUgb3duZXInXVxuICAgICAgICB9XG4gICAgfSk7XG5cbiAgICBleHBlY3QuYWxsKGNvbmZpZywge1xuICAgICAgICAnd2ViMyc6IHtcbiAgICAgICAgICAgIHR5cGU6ICdvYmplY3QnLFxuICAgICAgICAgICAgY29kZTogV0VCM19SRVFVSVJFRFxuICAgICAgICB9XG4gICAgfSk7XG5cbiAgICBjb25zdCBwYW4gPSBuZXcgY29uZmlnLndlYjMuZXRoLkNvbnRyYWN0KGNvbmZpZy5jb250cmFjdHMuUGFuZG9yYS5hYmksIGNvbmZpZy5hZGRyZXNzZXMuUGFuZG9yYSk7XG4gICAgcGFuLm1ldGhvZHNcbiAgICAgICAgLndoaXRlbGlzdFdvcmtlck93bmVyKG93bmVyQWRkcmVzcylcbiAgICAgICAgLnNlbmQoe1xuICAgICAgICAgICAgZnJvbTogcHVibGlzaGVyXG4gICAgICAgIH0pXG4gICAgICAgIC5vbignZXJyb3InLCByZWplY3QpXG4gICAgICAgIC5vbigncmVjZWlwdCcsIHJlY2VpcHQgPT4ge1xuXG4gICAgICAgICAgICBpZiAoTnVtYmVyKHJlY2VpcHQuc3RhdHVzKSA9PT0gMCkge1xuXG4gICAgICAgICAgICAgICAgcmV0dXJuIHJlamVjdChwanNFcnJvcihUUkFOU0FDVElPTl9VTlNVQ0NFU1NGVUwpKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgcmVzb2x2ZShyZWNlaXB0KTtcbiAgICAgICAgfSk7XG59KTtcblxuLyoqXG4gKiBDcmVhdGVzLCByZWdpc3RlcnMgYW5kIHJldHVybnMgYSBuZXcgd29ya2VyIG5vZGUgb3duZWQgYnkgdGhlIGNhbGxlciBvZiB0aGUgY29udHJhY3QuIFxuICogQ2FuIGJlIGNhbGxlZCBvbmx5IGJ5IHRoZSB3aGl0ZWxpc3RlZCBub2RlIG93bmVyIGFkZHJlc3NcbiAqIFxuICogQHBhcmFtIHthbnl9IHB1Ymxpc2hlciBcbiAqIEBwYXJhbSB7YW55fSBbY29uZmlnPXt9XSBcbiAqL1xuZXhwb3J0IGNvbnN0IGNyZWF0ZVdvcmtlck5vZGUgPSAocHVibGlzaGVyLCBjb25maWcgPSB7fSkgPT4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuXG4gICAgZXhwZWN0LmFsbCh7IHB1Ymxpc2hlciB9LCB7XG4gICAgICAgICdwdWJsaXNoZXInOiB7XG4gICAgICAgICAgICB0eXBlOiAnYWRkcmVzcycsXG4gICAgICAgICAgICBjb2RlOiBBRERSRVNTX1JFUVVJUkVELFxuICAgICAgICAgICAgYXJnczogWydQYW5kb3JhIGNvbnRyYWN0IG93bmVyJ11cbiAgICAgICAgfVxuICAgIH0pO1xuXG4gICAgZXhwZWN0LmFsbChjb25maWcsIHtcbiAgICAgICAgJ3dlYjMnOiB7XG4gICAgICAgICAgICB0eXBlOiAnb2JqZWN0JyxcbiAgICAgICAgICAgIGNvZGU6IFdFQjNfUkVRVUlSRURcbiAgICAgICAgfSxcbiAgICAgICAgJ2NvbnRyYWN0cy5Xb3JrZXJOb2RlJzoge1xuICAgICAgICAgICAgdHlwZTogJ29iamVjdCcsXG4gICAgICAgICAgICBjb2RlOiBDT05UUkFDVF9SRVFVSVJFRCxcbiAgICAgICAgICAgIGFyZ3M6IFsnV29ya2VyTm9kZSddXG4gICAgICAgIH1cbiAgICB9KTtcblxuICAgIGNvbnN0IHBhbiA9IG5ldyBjb25maWcud2ViMy5ldGguQ29udHJhY3QoY29uZmlnLmNvbnRyYWN0cy5QYW5kb3JhLmFiaSwgY29uZmlnLmFkZHJlc3Nlcy5QYW5kb3JhKTtcbiAgICBwYW4ubWV0aG9kc1xuICAgICAgICAuY3JlYXRlV29ya2VyTm9kZSgpXG4gICAgICAgIC5zZW5kKHtcbiAgICAgICAgICAgIGZyb206IHB1Ymxpc2hlcixcbiAgICAgICAgICAgIGdhczogNjcwMDAwMC8vIGJlY2F1c2UgdGhpcyB3b3JrZmxvdyBpcyB0b28gZ3JlZWR5XG4gICAgICAgIH0pXG4gICAgICAgIC5vbignZXJyb3InLCByZWplY3QpXG4gICAgICAgIC5vbigncmVjZWlwdCcsIHJlY2VpcHQgPT4ge1xuXG4gICAgICAgICAgICBpZiAoTnVtYmVyKHJlY2VpcHQuc3RhdHVzKSA9PT0gMCkge1xuXG4gICAgICAgICAgICAgICAgcmV0dXJuIHJlamVjdChwanNFcnJvcihUUkFOU0FDVElPTl9VTlNVQ0NFU1NGVUwpKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgLy8gY29uc29sZS5sb2coJz4+Pj4+IHdvcmtlciBub2RlIHJlc3VsdCcsIHJlY2VpcHQuZXZlbnRzLldvcmtlck5vZGVDcmVhdGVkLnJldHVyblZhbHVlcylcbiAgICAgICAgICAgIC8vIGNvbnNvbGUubG9nKCc+Pj4+PiB3b3JrZXIgbm9kZSBhZGRyZXNzJywgcmVjZWlwdC5ldmVudHMuV29ya2VyTm9kZUNyZWF0ZWQuYWRkcmVzcylcblxuICAgICAgICAgICAgcmVzb2x2ZShyZWNlaXB0LmV2ZW50cy5Xb3JrZXJOb2RlQ3JlYXRlZC5yZXR1cm5WYWx1ZXMud29ya2VyTm9kZSk7Ly8gYWRkcmVzcyBvZiBjcmVhdGVkIFdvcmtlck5vZGVcbiAgICAgICAgfSk7XG59KTtcbiJdfQ==