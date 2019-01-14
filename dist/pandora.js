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

require("core-js/modules/es6.number.parse-int");

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
 * @param {Number} computingPrice
 * @param {String} publisher 
 * @param {Object} config
 */


exports.whitelistWorkerOwner = whitelistWorkerOwner;

var createWorkerNode = function createWorkerNode(computingPrice, publisher) {
  var config = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
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
    pan.methods.createWorkerNode(config.web3.utils.toHex(computingPrice)).send({
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
/**
 * Return maximum value of the computing price
 * 
 * @param {Object} config Library config (provided by the proxy but can be overridden)
 */


exports.createWorkerNode = createWorkerNode;

var getMaximumWorkerPrice =
/*#__PURE__*/
function () {
  var _ref2 = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee2() {
    var config,
        pan,
        price,
        _args2 = arguments;
    return regeneratorRuntime.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            config = _args2.length > 0 && _args2[0] !== undefined ? _args2[0] : {};
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
            _context2.next = 5;
            return pan.methods.getMaximumWorkerPrice().call();

          case 5:
            price = _context2.sent;
            return _context2.abrupt("return", Number.parseInt(price, 10));

          case 7:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2, this);
  }));

  return function getMaximumWorkerPrice() {
    return _ref2.apply(this, arguments);
  };
}();

exports.getMaximumWorkerPrice = getMaximumWorkerPrice;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9wYW5kb3JhLmpzIl0sIm5hbWVzIjpbInZlcnNpb24iLCJjb25maWciLCJleHBlY3QiLCJhbGwiLCJ0eXBlIiwiY29kZSIsIldFQjNfUkVRVUlSRUQiLCJDT05UUkFDVF9SRVFVSVJFRCIsImFyZ3MiLCJBRERSRVNTX1JFUVVJUkVEIiwicGFuIiwid2ViMyIsImV0aCIsIkNvbnRyYWN0IiwiY29udHJhY3RzIiwiUGFuZG9yYSIsImFiaSIsImFkZHJlc3NlcyIsIm1ldGhvZHMiLCJjYWxsIiwid2hpdGVsaXN0V29ya2VyT3duZXIiLCJwdWJsaXNoZXIiLCJvd25lckFkZHJlc3MiLCJQcm9taXNlIiwicmVzb2x2ZSIsInJlamVjdCIsInNlbmQiLCJmcm9tIiwib24iLCJyZWNlaXB0IiwiTnVtYmVyIiwic3RhdHVzIiwiVFJBTlNBQ1RJT05fVU5TVUNDRVNTRlVMIiwiY3JlYXRlV29ya2VyTm9kZSIsImNvbXB1dGluZ1ByaWNlIiwidXRpbHMiLCJ0b0hleCIsImdhcyIsImV2ZW50cyIsIldvcmtlck5vZGVDcmVhdGVkIiwicmV0dXJuVmFsdWVzIiwid29ya2VyTm9kZSIsImdldE1heGltdW1Xb3JrZXJQcmljZSIsInByaWNlIiwicGFyc2VJbnQiXSwibWFwcGluZ3MiOiJBQUFBOzs7Ozs7OztBQVFBOzs7Ozs7Ozs7Ozs7Ozs7QUFFQTs7QUFDQTs7Ozs7Ozs7QUFPQTs7Ozs7O0FBTU8sSUFBTUEsT0FBTztBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUEsMEJBQUc7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQU9DLFlBQUFBLE1BQVAsMkRBQWdCLEVBQWhCO0FBRW5CQyxZQUFBQSxNQUFNLENBQUNDLEdBQVAsQ0FBV0YsTUFBWCxFQUFtQjtBQUNmLHNCQUFRO0FBQ0pHLGdCQUFBQSxJQUFJLEVBQUUsUUFERjtBQUVKQyxnQkFBQUEsSUFBSSxFQUFFQztBQUZGLGVBRE87QUFLZix1Q0FBeUI7QUFDckJGLGdCQUFBQSxJQUFJ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MkRmLE1BQU0sQ0FBQ2dCLFNBQVAsQ0FBaUJGLE9BQTVFLENBbkJxQjtBQUFBO0FBQUEsbUJBb0JiTCxHQUFHLENBQUNRLE9BQUosQ0FDZndCLHFCQURlLEdBRWZ2QixJQUZlLEVBcEJhOztBQUFBO0FBb0IzQndCLFlBQUFBLEtBcEIyQjtBQUFBLDhDQXdCMUJiLE1BQU0sQ0FBQ2MsUUFBUCxDQUFnQkQsS0FBaEIsRUFBdUIsRUFBdkIsQ0F4QjBCOztBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBLEdBQUg7O0FBQUEsa0JBQXJCRCxxQkFBcUI7QUFBQTtBQUFBO0FBQUEsR0FBM0IiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIENvbW1vbiBQYW5kb3JhIGNvbnRyYWN0IG1ldGhvZHNcbiAqIFRoaXMgZmlsZSBpdCBpcyBhIHBhcnQgb2YgdGhlIFBhbmRvcmEgUHlycmhhIEphdmFzY3JpcHQgbGlicmFyeVxuICogXG4gKiBAZmlsZSBwYW5kb3JhLmpzXG4gKiBAYXV0aG9yIEtvc3RpYW50eW4gU215cm5vdiA8a29zdHlzaEBnbWFpbC5jb20+XG4gKiBAZGF0ZSAyMDE4XG4gKi9cbid1c2Ugc3RyaWN0JztcblxuaW1wb3J0ICogYXMgZXhwZWN0IGZyb20gJy4vaGVscGVycy9leHBlY3QnO1xuaW1wb3J0IHBqc0Vycm9yLCB7XG4gICAgV0VCM19SRVFVSVJFRCxcbiAgICBDT05UUkFDVF9SRVFVSVJFRCxcbiAgICBBRERSRVNTX1JFUVVJUkVELFxuICAgIFRSQU5TQUNUSU9OX1VOU1VDQ0VTU0ZVTFxufSBmcm9tICcuL2hlbHBlcnMvZXJyb3JzJztcblxuLyoqXG4gKiBHZXQgZGVwbG95ZWQgY29udHJhY3RzIHZlcnNpb25cbiAqIFxuICogQHBhcmFtIHtPYmplY3R9IGNvbmZpZyBMaWJyYXJ5IGNvbmZpZyAocHJvdmlkZWQgYnkgdGhlIHByb3h5IGJ1dCBjYW4gYmUgb3ZlcnJpZGRlbilcbiAqIEByZXR1cm5zIHtQcm9taXNlfVxuICovXG5leHBvcnQgY29uc3QgdmVyc2lvbiA9IGFzeW5jIChjb25maWcgPSB7fSkgPT4ge1xuXG4gICAgZXhwZWN0LmFsbChjb25maWcsIHtcbiAgICAgICAgJ3dlYjMnOiB7XG4gICAgICAgICAgICB0eXBlOiAnb2JqZWN0JyxcbiAgICAgICAgICAgIGNvZGU6IFdFQjNfUkVRVUlSRURcbiAgICAgICAgfSxcbiAgICAgICAgJ2NvbnRyYWN0cy5QYW5kb3JhLmFiaSc6IHtcbiAgICAgICAgICAgIHR5cGU6ICdvYmplY3QnLFxuICAgICAgICAgICAgY29kZTogQ09OVFJBQ1RfUkVRVUlSRUQsXG4gICAgICAgICAgICBhcmdzOiBbJ1BhbmRvcmEnXVxuICAgICAgICB9LFxuICAgICAgICAnYWRkcmVzc2VzLlBhbmRvcmEnOiB7XG4gICAgICAgICAgICB0eXBlOiAnYWRkcmVzcycsXG4gICAgICAgICAgICBjb2RlOiBBRERSRVNTX1JFUVVJUkVELFxuICAgICAgICAgICAgYXJnczogWydQYW5kb3JhJ11cbiAgICAgICAgfVxuICAgIH0pO1xuXG4gICAgY29uc3QgcGFuID0gbmV3IGNvbmZpZy53ZWIzLmV0aC5Db250cmFjdChjb25maWcuY29udHJhY3RzLlBhbmRvcmEuYWJpLCBjb25maWcuYWRkcmVzc2VzLlBhbmRvcmEpO1xuICAgIGNvbnN0IHZlcnNpb24gPSBhd2FpdCBwYW4ubWV0aG9kc1xuICAgICAgICAudmVyc2lvbigpXG4gICAgICAgIC5jYWxsKCk7XG4gICAgICAgIFxuICAgIHJldHVybiB2ZXJzaW9uO1xufTtcblxuLyoqXG4gKiBQdWJsaWMgYW5kIGV4dGVybmFsQWRkcyBhZGRyZXNzIHRvIHRoZSB3aGl0ZWxpc3Qgb2Ygb3duZXJzIGFsbG93ZWQgdG8gY3JlYXRlIFdvcmtlck5vZGVzIGNvbnRyYWN0c1xuICogXG4gKiBAcGFyYW0ge1N0cmluZ30gcHVibGlzaGVyIFxuICogQHBhcmFtIHtTdHJpbmd9IG93bmVyQWRkcmVzcyBcbiAqIEBwYXJhbSB7T2JqZWN0fSBjb25maWcgTGlicmFyeSBjb25maWcgKHByb3ZpZGVkIGJ5IHRoZSBwcm94eSBidXQgY2FuIGJlIG92ZXJyaWRkZW4pIFxuICovXG5leHBvcnQgY29uc3Qgd2hpdGVsaXN0V29ya2VyT3duZXIgPSAocHVibGlzaGVyLCBvd25lckFkZHJlc3MsIGNvbmZpZyA9IHt9KSA9PiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG4gICAgXG4gICAgZXhwZWN0LmFsbCh7IHB1Ymxpc2hlciwgb3duZXJBZGRyZXNzIH0sIHtcbiAgICAgICAgJ3B1Ymxpc2hlcic6IHtcbiAgICAgICAgICAgIHR5cGU6ICdhZGRyZXNzJyxcbiAgICAgICAgICAgIGNvZGU6IEFERFJFU1NfUkVRVUlSRUQsXG4gICAgICAgICAgICBhcmdzOiBbJ1BhbmRvcmEgY29udHJhY3Qgb3duZXInXVxuICAgICAgICB9LFxuICAgICAgICAnb3duZXJBZGRyZXNzJzoge1xuICAgICAgICAgICAgdHlwZTogJ2FkZHJlc3MnLFxuICAgICAgICAgICAgY29kZTogQUREUkVTU19SRVFVSVJFRCxcbiAgICAgICAgICAgIGFyZ3M6IFsnV29ya2VyTm9kZSBvd25lciddXG4gICAgICAgIH1cbiAgICB9KTtcblxuICAgIGV4cGVjdC5hbGwoY29uZmlnLCB7XG4gICAgICAgICd3ZWIzJzoge1xuICAgICAgICAgICAgdHlwZTogJ29iamVjdCcsXG4gICAgICAgICAgICBjb2RlOiBXRUIzX1JFUVVJUkVEXG4gICAgICAgIH1cbiAgICB9KTtcblxuICAgIGNvbnN0IHBhbiA9IG5ldyBjb25maWcud2ViMy5ldGguQ29udHJhY3QoY29uZmlnLmNvbnRyYWN0cy5QYW5kb3JhLmFiaSwgY29uZmlnLmFkZHJlc3Nlcy5QYW5kb3JhKTtcbiAgICBwYW4ubWV0aG9kc1xuICAgICAgICAud2hpdGVsaXN0V29ya2VyT3duZXIob3duZXJBZGRyZXNzKVxuICAgICAgICAuc2VuZCh7XG4gICAgICAgICAgICBmcm9tOiBwdWJsaXNoZXJcbiAgICAgICAgfSlcbiAgICAgICAgLm9uKCdlcnJvcicsIHJlamVjdClcbiAgICAgICAgLm9uKCdyZWNlaXB0JywgcmVjZWlwdCA9PiB7XG5cbiAgICAgICAgICAgIGlmIChOdW1iZXIocmVjZWlwdC5zdGF0dXMpID09PSAwKSB7XG5cbiAgICAgICAgICAgICAgICByZXR1cm4gcmVqZWN0KHBqc0Vycm9yKFRSQU5TQUNUSU9OX1VOU1VDQ0VTU0ZVTCkpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICByZXNvbHZlKHJlY2VpcHQpO1xuICAgICAgICB9KTtcbn0pO1xuXG4vKipcbiAqIENyZWF0ZXMsIHJlZ2lzdGVycyBhbmQgcmV0dXJucyBhIG5ldyB3b3JrZXIgbm9kZSBvd25lZCBieSB0aGUgY2FsbGVyIG9mIHRoZSBjb250cmFjdC4gXG4gKiBDYW4gYmUgY2FsbGVkIG9ubHkgYnkgdGhlIHdoaXRlbGlzdGVkIG5vZGUgb3duZXIgYWRkcmVzc1xuICogXG4gKiBAcGFyYW0ge051bWJlcn0gY29tcHV0aW5nUHJpY2VcbiAqIEBwYXJhbSB7U3RyaW5nfSBwdWJsaXNoZXIgXG4gKiBAcGFyYW0ge09iamVjdH0gY29uZmlnXG4gKi9cbmV4cG9ydCBjb25zdCBjcmVhdGVXb3JrZXJOb2RlID0gKGNvbXB1dGluZ1ByaWNlLCBwdWJsaXNoZXIsIGNvbmZpZyA9IHt9KSA9PiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG5cbiAgICBleHBlY3QuYWxsKHsgcHVibGlzaGVyIH0sIHtcbiAgICAgICAgJ3B1Ymxpc2hlcic6IHtcbiAgICAgICAgICAgIHR5cGU6ICdhZGRyZXNzJyxcbiAgICAgICAgICAgIGNvZGU6IEFERFJFU1NfUkVRVUlSRUQsXG4gICAgICAgICAgICBhcmdzOiBbJ1BhbmRvcmEgY29udHJhY3Qgb3duZXInXVxuICAgICAgICB9XG4gICAgfSk7XG5cbiAgICBleHBlY3QuYWxsKGNvbmZpZywge1xuICAgICAgICAnd2ViMyc6IHtcbiAgICAgICAgICAgIHR5cGU6ICdvYmplY3QnLFxuICAgICAgICAgICAgY29kZTogV0VCM19SRVFVSVJFRFxuICAgICAgICB9LFxuICAgICAgICAnY29udHJhY3RzLldvcmtlck5vZGUnOiB7XG4gICAgICAgICAgICB0eXBlOiAnb2JqZWN0JyxcbiAgICAgICAgICAgIGNvZGU6IENPTlRSQUNUX1JFUVVJUkVELFxuICAgICAgICAgICAgYXJnczogWydXb3JrZXJOb2RlJ11cbiAgICAgICAgfVxuICAgIH0pO1xuXG4gICAgY29uc3QgcGFuID0gbmV3IGNvbmZpZy53ZWIzLmV0aC5Db250cmFjdChjb25maWcuY29udHJhY3RzLlBhbmRvcmEuYWJpLCBjb25maWcuYWRkcmVzc2VzLlBhbmRvcmEpO1xuICAgIHBhbi5tZXRob2RzXG4gICAgICAgIC5jcmVhdGVXb3JrZXJOb2RlKGNvbmZpZy53ZWIzLnV0aWxzLnRvSGV4KGNvbXB1dGluZ1ByaWNlKSlcbiAgICAgICAgLnNlbmQoe1xuICAgICAgICAgICAgZnJvbTogcHVibGlzaGVyLFxuICAgICAgICAgICAgZ2FzOiA2NzAwMDAwLy8gYmVjYXVzZSB0aGlzIHdvcmtmbG93IGlzIHRvbyBncmVlZHlcbiAgICAgICAgfSlcbiAgICAgICAgLm9uKCdlcnJvcicsIHJlamVjdClcbiAgICAgICAgLm9uKCdyZWNlaXB0JywgcmVjZWlwdCA9PiB7XG5cbiAgICAgICAgICAgIGlmIChOdW1iZXIocmVjZWlwdC5zdGF0dXMpID09PSAwKSB7XG5cbiAgICAgICAgICAgICAgICByZXR1cm4gcmVqZWN0KHBqc0Vycm9yKFRSQU5TQUNUSU9OX1VOU1VDQ0VTU0ZVTCkpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAvLyBjb25zb2xlLmxvZygnPj4+Pj4gd29ya2VyIG5vZGUgcmVzdWx0JywgcmVjZWlwdC5ldmVudHMuV29ya2VyTm9kZUNyZWF0ZWQucmV0dXJuVmFsdWVzKVxuICAgICAgICAgICAgLy8gY29uc29sZS5sb2coJz4+Pj4+IHdvcmtlciBub2RlIGFkZHJlc3MnLCByZWNlaXB0LmV2ZW50cy5Xb3JrZXJOb2RlQ3JlYXRlZC5hZGRyZXNzKVxuXG4gICAgICAgICAgICByZXNvbHZlKHJlY2VpcHQuZXZlbnRzLldvcmtlck5vZGVDcmVhdGVkLnJldHVyblZhbHVlcy53b3JrZXJOb2RlKTsvLyBhZGRyZXNzIG9mIGNyZWF0ZWQgV29ya2VyTm9kZVxuICAgICAgICB9KTtcbn0pO1xuXG4vKipcbiAqIFJldHVybiBtYXhpbXVtIHZhbHVlIG9mIHRoZSBjb21wdXRpbmcgcHJpY2VcbiAqIFxuICogQHBhcmFtIHtPYmplY3R9IGNvbmZpZyBMaWJyYXJ5IGNvbmZpZyAocHJvdmlkZWQgYnkgdGhlIHByb3h5IGJ1dCBjYW4gYmUgb3ZlcnJpZGRlbilcbiAqL1xuZXhwb3J0IGNvbnN0IGdldE1heGltdW1Xb3JrZXJQcmljZSA9IGFzeW5jIChjb25maWcgPSB7fSkgPT4ge1xuXG4gICAgZXhwZWN0LmFsbChjb25maWcsIHtcbiAgICAgICAgJ3dlYjMnOiB7XG4gICAgICAgICAgICB0eXBlOiAnb2JqZWN0JyxcbiAgICAgICAgICAgIGNvZGU6IFdFQjNfUkVRVUlSRURcbiAgICAgICAgfSxcbiAgICAgICAgJ2NvbnRyYWN0cy5QYW5kb3JhLmFiaSc6IHtcbiAgICAgICAgICAgIHR5cGU6ICdvYmplY3QnLFxuICAgICAgICAgICAgY29kZTogQ09OVFJBQ1RfUkVRVUlSRUQsXG4gICAgICAgICAgICBhcmdzOiBbJ1BhbmRvcmEnXVxuICAgICAgICB9LFxuICAgICAgICAnYWRkcmVzc2VzLlBhbmRvcmEnOiB7XG4gICAgICAgICAgICB0eXBlOiAnYWRkcmVzcycsXG4gICAgICAgICAgICBjb2RlOiBBRERSRVNTX1JFUVVJUkVELFxuICAgICAgICAgICAgYXJnczogWydQYW5kb3JhJ11cbiAgICAgICAgfVxuICAgIH0pO1xuXG4gICAgY29uc3QgcGFuID0gbmV3IGNvbmZpZy53ZWIzLmV0aC5Db250cmFjdChjb25maWcuY29udHJhY3RzLlBhbmRvcmEuYWJpLCBjb25maWcuYWRkcmVzc2VzLlBhbmRvcmEpO1xuICAgIGNvbnN0IHByaWNlID0gYXdhaXQgcGFuLm1ldGhvZHNcbiAgICAgICAgLmdldE1heGltdW1Xb3JrZXJQcmljZSgpXG4gICAgICAgIC5jYWxsKCk7XG4gICAgICAgIFxuICAgIHJldHVybiBOdW1iZXIucGFyc2VJbnQocHJpY2UsIDEwKTtcbn07XG4iXX0=