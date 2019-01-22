"use strict";

require("core-js/modules/es6.object.define-property");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.transfer = exports.approve = exports.balanceOf = void 0;

require("core-js/modules/es6.promise");

require("core-js/modules/es6.number.constructor");

require("core-js/modules/es6.number.parse-int");

require("regenerator-runtime/runtime");

var expect = _interopRequireWildcard(require("./helpers/expect"));

var _errors = _interopRequireWildcard(require("./helpers/errors"));

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

/**
 * Get tokens balance
 * 
 * @param {String} address Tokens owner address
 * @param {Object} config Library config (provided by the proxy but can be overridden) 
 */
var balanceOf =
/*#__PURE__*/
function () {
  var _ref = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee() {
    var address,
        config,
        eco,
        balance,
        _args = arguments;
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            address = _args.length > 0 && _args[0] !== undefined ? _args[0] : '';
            config = _args.length > 1 && _args[1] !== undefined ? _args[1] : {};
            expect.all({
              address: address
            }, {
              'address': {
                type: 'address',
                code: _errors.ADDRESS_REQUIRED,
                args: ['Tokens owner address']
              }
            });
            expect.all(config, {
              'web3': {
                type: 'object',
                code: _errors.WEB3_REQUIRED
              },
              'contracts.Pan.abi': {
                type: 'object',
                code: _errors.CONTRACT_REQUIRED,
                args: ['Pan']
              },
              'addresses.Pan': {
                type: 'address',
                code: _errors.ADDRESS_REQUIRED,
                args: ['Pan']
              }
            });
            eco = new config.web3.eth.Contract(config.contracts.Pan.abi, config.addresses.Pan);
            _context.next = 7;
            return eco.methods.balanceOf(address).call();

          case 7:
            balance = _context.sent;
            return _context.abrupt("return", Number.parseInt(balance, 10));

          case 9:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, this);
  }));

  return function balanceOf() {
    return _ref.apply(this, arguments);
  };
}();
/**
 * Approve specific amount of tokens to be spent
 * 
 * @param {String} ownerAddress 
 * @param {String} spenderAddress 
 * @param {Number} value
 * @param {Object} config Library config (provided by the proxy but can be overridden) 
 */


exports.balanceOf = balanceOf;

var approve = function approve(ownerAddress, spenderAddress, value) {
  var config = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : {};
  return new Promise(function (resolve, reject) {
    expect.all({
      ownerAddress: ownerAddress,
      spenderAddress: spenderAddress,
      value: value
    }, {
      'ownerAddress': {
        type: 'address',
        code: _errors.ADDRESS_REQUIRED,
        args: ['Tokens owner address']
      },
      'spenderAddress': {
        type: 'address',
        code: _errors.ADDRESS_REQUIRED,
        args: ['Tokens spender address']
      },
      'value': {
        type: 'number',
        args: ['Amount of tokens']
      }
    });
    expect.all(config, {
      'web3': {
        type: 'object',
        code: _errors.WEB3_REQUIRED
      },
      'contracts.Pan.abi': {
        type: 'object',
        code: _errors.CONTRACT_REQUIRED,
        args: ['Pan']
      },
      'addresses.Pan': {
        type: 'address',
        code: _errors.ADDRESS_REQUIRED,
        args: ['Pan']
      }
    });
    var pan = new config.web3.eth.Contract(config.contracts.Pan.abi, config.addresses.Pan);
    pan.methods.approve(spenderAddress, config.web3.utils.toHex(value)).send({
      from: ownerAddress
    }).on('error', reject).on('receipt', function (receipt) {
      if (Number(receipt.status) === 0) {
        return reject((0, _errors.default)(_errors.TRANSACTION_UNSUCCESSFUL));
      }

      resolve(receipt);
    });
  });
};
/**
 * Transfer tokens to the address
 * 
 * @param {String} ownerAddress 
 * @param {String} destinationAddress 
 * @param {Number} value
 * @param {Object} config Library config (provided by the proxy but can be overridden) 
 */


exports.approve = approve;

var transfer = function transfer(ownerAddress, destinationAddress, value) {
  var config = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : {};
  return new Promise(function (resolve, reject) {
    expect.all({
      ownerAddress: ownerAddress,
      destinationAddress: destinationAddress,
      value: value
    }, {
      'ownerAddress': {
        type: 'address',
        code: _errors.ADDRESS_REQUIRED,
        args: ['Tokens owner address']
      },
      'destinationAddress': {
        type: 'address',
        code: _errors.ADDRESS_REQUIRED,
        args: ['Tokens destination address']
      },
      'value': {
        type: 'number',
        args: ['Amount of tokens']
      }
    });
    expect.all(config, {
      'web3': {
        type: 'object',
        code: _errors.WEB3_REQUIRED
      },
      'contracts.Pan.abi': {
        type: 'object',
        code: _errors.CONTRACT_REQUIRED,
        args: ['Pan']
      },
      'addresses.Pan': {
        type: 'address',
        code: _errors.ADDRESS_REQUIRED,
        args: ['Pan']
      }
    });
    var pan = new config.web3.eth.Contract(config.contracts.Pan.abi, config.addresses.Pan);
    pan.methods.transfer(destinationAddress, config.web3.utils.toHex(value)).send({
      from: ownerAddress
    }).on('error', reject).on('receipt', function (receipt) {
      if (Number(receipt.status) === 0) {
        return reject((0, _errors.default)(_errors.TRANSACTION_UNSUCCESSFUL));
      }

      resolve(receipt);
    });
  });
};

exports.transfer = transfer;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9wYW4uanMiXSwibmFtZXMiOlsiYmFsYW5jZU9mIiwiYWRkcmVzcyIsImNvbmZpZyIsImV4cGVjdCIsImFsbCIsInR5cGUiLCJjb2RlIiwiQUREUkVTU19SRVFVSVJFRCIsImFyZ3MiLCJXRUIzX1JFUVVJUkVEIiwiQ09OVFJBQ1RfUkVRVUlSRUQiLCJlY28iLCJ3ZWIzIiwiZXRoIiwiQ29udHJhY3QiLCJjb250cmFjdHMiLCJQYW4iLCJhYmkiLCJhZGRyZXNzZXMiLCJtZXRob2RzIiwiY2FsbCIsImJhbGFuY2UiLCJOdW1iZXIiLCJwYXJzZUludCIsImFwcHJvdmUiLCJvd25lckFkZHJlc3MiLCJzcGVuZGVyQWRkcmVzcyIsInZhbHVlIiwiUHJvbWlzZSIsInJlc29sdmUiLCJyZWplY3QiLCJwYW4iLCJ1dGlscyIsInRvSGV4Iiwic2VuZCIsImZyb20iLCJvbiIsInJlY2VpcHQiLCJzdGF0dXMiLCJUUkFOU0FDVElPTl9VTlNVQ0NFU1NGVUwiLCJ0cmFuc2ZlciIsImRlc3RpbmF0aW9uQWRkcmVzcyJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFTQTs7QUFDQTs7Ozs7Ozs7QUFPQTs7Ozs7O0FBTU8sSUFBTUEsU0FBUztBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUEsMEJBQUc7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBT0MsWUFBQUEsT0FBUCwyREFBaUIsRUFBakI7QUFBcUJDLFlBQUFBLE1BQXJCLDJEQUE4QixFQUE5QjtBQUVyQkMsWUFBQUEsTUFBTSxDQUFDQyxHQUFQLENBQVc7QUFBRUgsY0FBQUEsT0FBTyxFQUFQQTtBQUFGLGFBQVgsRUFBd0I7QUFDcEIseUJBQVc7QUFDUEksZ0JBQUFBLElBQUksRUFBRSxTQURDO0FBRVBDLGdCQUFBQSxJQUFJLEVBQUVDLHdCQUZDO0FBR1BDLGdCQUFBQSxJQUFJLEVBQUUsQ0FBQyxzQkFBRDtBQUhDO0FBRFMsYUFBeEI7QUFRQUwsWUFBQUEs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RVY7QUFESixLQUZWLEVBS0tXLEVBTEwsQ0FLUSxPQUxSLEVBS2lCTixNQUxqQixFQU1LTSxFQU5MLENBTVEsU0FOUixFQU1tQixVQUFBQyxPQUFPLEVBQUk7QUFFdEIsVUFBSWYsTUFBTSxDQUFDZSxPQUFPLENBQUNDLE1BQVQsQ0FBTixLQUEyQixDQUEvQixFQUFrQztBQUU5QixlQUFPUixNQUFNLENBQUMscUJBQVNTLGdDQUFULENBQUQsQ0FBYjtBQUNIOztBQUVEVixNQUFBQSxPQUFPLENBQUNRLE9BQUQsQ0FBUDtBQUNILEtBZEw7QUFlSCxHQXBEaUYsQ0FBMUQ7QUFBQSxDQUFqQiIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogUGFuIHRva2VuIG1ldGhvZHNcbiAqIFRoaXMgZmlsZSBpdCBpcyBhIHBhcnQgb2YgdGhlIFBhbmRvcmEgUHlycmhhIEphdmFzY3JpcHQgbGlicmFyeVxuICogXG4gKiBAZmlsZSBwYW4uanNcbiAqIEBhdXRob3IgS29zdGlhbnR5biBTbXlybm92IDxrb3N0eXNoQGdtYWlsLmNvbT5cbiAqIEBkYXRlIDIwMTlcbiAqL1xuXG5pbXBvcnQgKiBhcyBleHBlY3QgZnJvbSAnLi9oZWxwZXJzL2V4cGVjdCc7XG5pbXBvcnQgcGpzRXJyb3IsIHtcbiAgICBXRUIzX1JFUVVJUkVELFxuICAgIENPTlRSQUNUX1JFUVVJUkVELFxuICAgIEFERFJFU1NfUkVRVUlSRUQsXG4gICAgVFJBTlNBQ1RJT05fVU5TVUNDRVNTRlVMXG59IGZyb20gJy4vaGVscGVycy9lcnJvcnMnO1xuXG4vKipcbiAqIEdldCB0b2tlbnMgYmFsYW5jZVxuICogXG4gKiBAcGFyYW0ge1N0cmluZ30gYWRkcmVzcyBUb2tlbnMgb3duZXIgYWRkcmVzc1xuICogQHBhcmFtIHtPYmplY3R9IGNvbmZpZyBMaWJyYXJ5IGNvbmZpZyAocHJvdmlkZWQgYnkgdGhlIHByb3h5IGJ1dCBjYW4gYmUgb3ZlcnJpZGRlbikgXG4gKi9cbmV4cG9ydCBjb25zdCBiYWxhbmNlT2YgPSBhc3luYyAoYWRkcmVzcyA9ICcnLCBjb25maWcgPSB7fSkgPT4ge1xuXG4gICAgZXhwZWN0LmFsbCh7IGFkZHJlc3MgfSwge1xuICAgICAgICAnYWRkcmVzcyc6IHtcbiAgICAgICAgICAgIHR5cGU6ICdhZGRyZXNzJyxcbiAgICAgICAgICAgIGNvZGU6IEFERFJFU1NfUkVRVUlSRUQsXG4gICAgICAgICAgICBhcmdzOiBbJ1Rva2VucyBvd25lciBhZGRyZXNzJ11cbiAgICAgICAgfVxuICAgIH0pO1xuXG4gICAgZXhwZWN0LmFsbChjb25maWcsIHtcbiAgICAgICAgJ3dlYjMnOiB7XG4gICAgICAgICAgICB0eXBlOiAnb2JqZWN0JyxcbiAgICAgICAgICAgIGNvZGU6IFdFQjNfUkVRVUlSRURcbiAgICAgICAgfSxcbiAgICAgICAgJ2NvbnRyYWN0cy5QYW4uYWJpJzoge1xuICAgICAgICAgICAgdHlwZTogJ29iamVjdCcsXG4gICAgICAgICAgICBjb2RlOiBDT05UUkFDVF9SRVFVSVJFRCxcbiAgICAgICAgICAgIGFyZ3M6IFsnUGFuJ11cbiAgICAgICAgfSxcbiAgICAgICAgJ2FkZHJlc3Nlcy5QYW4nOiB7XG4gICAgICAgICAgICB0eXBlOiAnYWRkcmVzcycsXG4gICAgICAgICAgICBjb2RlOiBBRERSRVNTX1JFUVVJUkVELFxuICAgICAgICAgICAgYXJnczogWydQYW4nXVxuICAgICAgICB9XG4gICAgfSk7XG5cbiAgICBjb25zdCBlY28gPSBuZXcgY29uZmlnLndlYjMuZXRoLkNvbnRyYWN0KGNvbmZpZy5jb250cmFjdHMuUGFuLmFiaSwgY29uZmlnLmFkZHJlc3Nlcy5QYW4pO1xuICAgIGNvbnN0IGJhbGFuY2UgPSBhd2FpdCBlY28ubWV0aG9kc1xuICAgICAgICAuYmFsYW5jZU9mKGFkZHJlc3MpXG4gICAgICAgIC5jYWxsKCk7XG4gICAgICAgIFxuICAgIHJldHVybiBOdW1iZXIucGFyc2VJbnQoYmFsYW5jZSwgMTApO1xufTtcblxuLyoqXG4gKiBBcHByb3ZlIHNwZWNpZmljIGFtb3VudCBvZiB0b2tlbnMgdG8gYmUgc3BlbnRcbiAqIFxuICogQHBhcmFtIHtTdHJpbmd9IG93bmVyQWRkcmVzcyBcbiAqIEBwYXJhbSB7U3RyaW5nfSBzcGVuZGVyQWRkcmVzcyBcbiAqIEBwYXJhbSB7TnVtYmVyfSB2YWx1ZVxuICogQHBhcmFtIHtPYmplY3R9IGNvbmZpZyBMaWJyYXJ5IGNvbmZpZyAocHJvdmlkZWQgYnkgdGhlIHByb3h5IGJ1dCBjYW4gYmUgb3ZlcnJpZGRlbikgXG4gKi9cbmV4cG9ydCBjb25zdCBhcHByb3ZlID0gKG93bmVyQWRkcmVzcywgc3BlbmRlckFkZHJlc3MsIHZhbHVlLCBjb25maWcgPSB7fSkgPT4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuICAgIFxuICAgIGV4cGVjdC5hbGwoeyBvd25lckFkZHJlc3MsIHNwZW5kZXJBZGRyZXNzLCB2YWx1ZSB9LCB7XG4gICAgICAgICdvd25lckFkZHJlc3MnOiB7XG4gICAgICAgICAgICB0eXBlOiAnYWRkcmVzcycsXG4gICAgICAgICAgICBjb2RlOiBBRERSRVNTX1JFUVVJUkVELFxuICAgICAgICAgICAgYXJnczogWydUb2tlbnMgb3duZXIgYWRkcmVzcyddXG4gICAgICAgIH0sXG4gICAgICAgICdzcGVuZGVyQWRkcmVzcyc6IHtcbiAgICAgICAgICAgIHR5cGU6ICdhZGRyZXNzJyxcbiAgICAgICAgICAgIGNvZGU6IEFERFJFU1NfUkVRVUlSRUQsXG4gICAgICAgICAgICBhcmdzOiBbJ1Rva2VucyBzcGVuZGVyIGFkZHJlc3MnXVxuICAgICAgICB9LFxuICAgICAgICAndmFsdWUnOiB7XG4gICAgICAgICAgICB0eXBlOiAnbnVtYmVyJyxcbiAgICAgICAgICAgIGFyZ3M6IFsnQW1vdW50IG9mIHRva2VucyddXG4gICAgICAgIH1cbiAgICB9KTtcblxuICAgIGV4cGVjdC5hbGwoY29uZmlnLCB7XG4gICAgICAgICd3ZWIzJzoge1xuICAgICAgICAgICAgdHlwZTogJ29iamVjdCcsXG4gICAgICAgICAgICBjb2RlOiBXRUIzX1JFUVVJUkVEXG4gICAgICAgIH0sXG4gICAgICAgICdjb250cmFjdHMuUGFuLmFiaSc6IHtcbiAgICAgICAgICAgIHR5cGU6ICdvYmplY3QnLFxuICAgICAgICAgICAgY29kZTogQ09OVFJBQ1RfUkVRVUlSRUQsXG4gICAgICAgICAgICBhcmdzOiBbJ1BhbiddXG4gICAgICAgIH0sXG4gICAgICAgICdhZGRyZXNzZXMuUGFuJzoge1xuICAgICAgICAgICAgdHlwZTogJ2FkZHJlc3MnLFxuICAgICAgICAgICAgY29kZTogQUREUkVTU19SRVFVSVJFRCxcbiAgICAgICAgICAgIGFyZ3M6IFsnUGFuJ11cbiAgICAgICAgfVxuICAgIH0pO1xuXG4gICAgY29uc3QgcGFuID0gbmV3IGNvbmZpZy53ZWIzLmV0aC5Db250cmFjdChjb25maWcuY29udHJhY3RzLlBhbi5hYmksIGNvbmZpZy5hZGRyZXNzZXMuUGFuKTtcbiAgICBwYW4ubWV0aG9kc1xuICAgICAgICAuYXBwcm92ZShzcGVuZGVyQWRkcmVzcywgY29uZmlnLndlYjMudXRpbHMudG9IZXgodmFsdWUpKVxuICAgICAgICAuc2VuZCh7XG4gICAgICAgICAgICBmcm9tOiBvd25lckFkZHJlc3NcbiAgICAgICAgfSlcbiAgICAgICAgLm9uKCdlcnJvcicsIHJlamVjdClcbiAgICAgICAgLm9uKCdyZWNlaXB0JywgcmVjZWlwdCA9PiB7XG5cbiAgICAgICAgICAgIGlmIChOdW1iZXIocmVjZWlwdC5zdGF0dXMpID09PSAwKSB7XG5cbiAgICAgICAgICAgICAgICByZXR1cm4gcmVqZWN0KHBqc0Vycm9yKFRSQU5TQUNUSU9OX1VOU1VDQ0VTU0ZVTCkpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICByZXNvbHZlKHJlY2VpcHQpO1xuICAgICAgICB9KTtcbn0pO1xuXG4vKipcbiAqIFRyYW5zZmVyIHRva2VucyB0byB0aGUgYWRkcmVzc1xuICogXG4gKiBAcGFyYW0ge1N0cmluZ30gb3duZXJBZGRyZXNzIFxuICogQHBhcmFtIHtTdHJpbmd9IGRlc3RpbmF0aW9uQWRkcmVzcyBcbiAqIEBwYXJhbSB7TnVtYmVyfSB2YWx1ZVxuICogQHBhcmFtIHtPYmplY3R9IGNvbmZpZyBMaWJyYXJ5IGNvbmZpZyAocHJvdmlkZWQgYnkgdGhlIHByb3h5IGJ1dCBjYW4gYmUgb3ZlcnJpZGRlbikgXG4gKi9cbmV4cG9ydCBjb25zdCB0cmFuc2ZlciA9IChvd25lckFkZHJlc3MsIGRlc3RpbmF0aW9uQWRkcmVzcywgdmFsdWUsIGNvbmZpZyA9IHt9KSA9PiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG4gICAgXG4gICAgZXhwZWN0LmFsbCh7IG93bmVyQWRkcmVzcywgZGVzdGluYXRpb25BZGRyZXNzLCB2YWx1ZSB9LCB7XG4gICAgICAgICdvd25lckFkZHJlc3MnOiB7XG4gICAgICAgICAgICB0eXBlOiAnYWRkcmVzcycsXG4gICAgICAgICAgICBjb2RlOiBBRERSRVNTX1JFUVVJUkVELFxuICAgICAgICAgICAgYXJnczogWydUb2tlbnMgb3duZXIgYWRkcmVzcyddXG4gICAgICAgIH0sXG4gICAgICAgICdkZXN0aW5hdGlvbkFkZHJlc3MnOiB7XG4gICAgICAgICAgICB0eXBlOiAnYWRkcmVzcycsXG4gICAgICAgICAgICBjb2RlOiBBRERSRVNTX1JFUVVJUkVELFxuICAgICAgICAgICAgYXJnczogWydUb2tlbnMgZGVzdGluYXRpb24gYWRkcmVzcyddXG4gICAgICAgIH0sXG4gICAgICAgICd2YWx1ZSc6IHtcbiAgICAgICAgICAgIHR5cGU6ICdudW1iZXInLFxuICAgICAgICAgICAgYXJnczogWydBbW91bnQgb2YgdG9rZW5zJ11cbiAgICAgICAgfVxuICAgIH0pO1xuXG4gICAgZXhwZWN0LmFsbChjb25maWcsIHtcbiAgICAgICAgJ3dlYjMnOiB7XG4gICAgICAgICAgICB0eXBlOiAnb2JqZWN0JyxcbiAgICAgICAgICAgIGNvZGU6IFdFQjNfUkVRVUlSRURcbiAgICAgICAgfSxcbiAgICAgICAgJ2NvbnRyYWN0cy5QYW4uYWJpJzoge1xuICAgICAgICAgICAgdHlwZTogJ29iamVjdCcsXG4gICAgICAgICAgICBjb2RlOiBDT05UUkFDVF9SRVFVSVJFRCxcbiAgICAgICAgICAgIGFyZ3M6IFsnUGFuJ11cbiAgICAgICAgfSxcbiAgICAgICAgJ2FkZHJlc3Nlcy5QYW4nOiB7XG4gICAgICAgICAgICB0eXBlOiAnYWRkcmVzcycsXG4gICAgICAgICAgICBjb2RlOiBBRERSRVNTX1JFUVVJUkVELFxuICAgICAgICAgICAgYXJnczogWydQYW4nXVxuICAgICAgICB9XG4gICAgfSk7XG5cbiAgICBjb25zdCBwYW4gPSBuZXcgY29uZmlnLndlYjMuZXRoLkNvbnRyYWN0KGNvbmZpZy5jb250cmFjdHMuUGFuLmFiaSwgY29uZmlnLmFkZHJlc3Nlcy5QYW4pO1xuICAgIHBhbi5tZXRob2RzXG4gICAgICAgIC50cmFuc2ZlcihkZXN0aW5hdGlvbkFkZHJlc3MsIGNvbmZpZy53ZWIzLnV0aWxzLnRvSGV4KHZhbHVlKSlcbiAgICAgICAgLnNlbmQoe1xuICAgICAgICAgICAgZnJvbTogb3duZXJBZGRyZXNzXG4gICAgICAgIH0pXG4gICAgICAgIC5vbignZXJyb3InLCByZWplY3QpXG4gICAgICAgIC5vbigncmVjZWlwdCcsIHJlY2VpcHQgPT4ge1xuXG4gICAgICAgICAgICBpZiAoTnVtYmVyKHJlY2VpcHQuc3RhdHVzKSA9PT0gMCkge1xuXG4gICAgICAgICAgICAgICAgcmV0dXJuIHJlamVjdChwanNFcnJvcihUUkFOU0FDVElPTl9VTlNVQ0NFU1NGVUwpKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgcmVzb2x2ZShyZWNlaXB0KTtcbiAgICAgICAgfSk7XG59KTtcbiJdfQ==