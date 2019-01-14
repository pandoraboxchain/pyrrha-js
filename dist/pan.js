"use strict";

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9wYW4uanMiXSwibmFtZXMiOlsiYmFsYW5jZU9mIiwiYWRkcmVzcyIsImNvbmZpZyIsImV4cGVjdCIsImFsbCIsInR5cGUiLCJjb2RlIiwiQUREUkVTU19SRVFVSVJFRCIsImFyZ3MiLCJXRUIzX1JFUVVJUkVEIiwiQ09OVFJBQ1RfUkVRVUlSRUQiLCJlY28iLCJ3ZWIzIiwiZXRoIiwiQ29udHJhY3QiLCJjb250cmFjdHMiLCJQYW4iLCJhYmkiLCJhZGRyZXNzZXMiLCJtZXRob2RzIiwiY2FsbCIsImJhbGFuY2UiLCJOdW1iZXIiLCJwYXJzZUludCIsImFwcHJvdmUiLCJvd25lckFkZHJlc3MiLCJzcGVuZGVyQWRkcmVzcyIsInZhbHVlIiwiUHJvbWlzZSIsInJlc29sdmUiLCJyZWplY3QiLCJwYW4iLCJ1dGlscyIsInRvSGV4Iiwic2VuZCIsImZyb20iLCJvbiIsInJlY2VpcHQiLCJzdGF0dXMiLCJUUkFOU0FDVElPTl9VTlNVQ0NFU1NGVUwiLCJ0cmFuc2ZlciIsImRlc3RpbmF0aW9uQWRkcmVzcyJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7O0FBU0E7O0FBQ0E7Ozs7Ozs7O0FBT0E7Ozs7OztBQU1PLElBQU1BLFNBQVM7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBLDBCQUFHO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQU9DLFlBQUFBLE9BQVAsMkRBQWlCLEVBQWpCO0FBQXFCQyxZQUFBQSxNQUFyQiwyREFBOEIsRUFBOUI7QUFFckJDLFlBQUFBLE1BQU0sQ0FBQ0MsR0FBUCxDQUFXO0FBQUVILGNBQUFBLE9BQU8sRUFBUEE7QUFBRixhQUFYLEVBQXdCO0FBQ3BCLHlCQUFXO0FBQ1BJLGdCQUFBQSxJQUFJLEVBQUUsU0FEQztBQUVQQyxnQkFBQUEsSUFBSSxFQUFFQyx3QkFGQztBQUdQQyxnQkFBQUEsSUFBSSxFQUFFLENBQUMsc0JBQUQ7QUFIQztBQURTLGFBQXhCO0FBUUFMLFlBQUFBLE1B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O0FBREosS0FGVixFQUtLVyxFQUxMLENBS1EsT0FMUixFQUtpQk4sTUFMakIsRUFNS00sRUFOTCxDQU1RLFNBTlIsRUFNbUIsVUFBQUMsT0FBTyxFQUFJO0FBRXRCLFVBQUlmLE1BQU0sQ0FBQ2UsT0FBTyxDQUFDQyxNQUFULENBQU4sS0FBMkIsQ0FBL0IsRUFBa0M7QUFFOUIsZUFBT1IsTUFBTSxDQUFDLHFCQUFTUyxnQ0FBVCxDQUFELENBQWI7QUFDSDs7QUFFRFYsTUFBQUEsT0FBTyxDQUFDUSxPQUFELENBQVA7QUFDSCxLQWRMO0FBZUgsR0FwRGlGLENBQTFEO0FBQUEsQ0FBakIiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIFBhbiB0b2tlbiBtZXRob2RzXG4gKiBUaGlzIGZpbGUgaXQgaXMgYSBwYXJ0IG9mIHRoZSBQYW5kb3JhIFB5cnJoYSBKYXZhc2NyaXB0IGxpYnJhcnlcbiAqIFxuICogQGZpbGUgcGFuLmpzXG4gKiBAYXV0aG9yIEtvc3RpYW50eW4gU215cm5vdiA8a29zdHlzaEBnbWFpbC5jb20+XG4gKiBAZGF0ZSAyMDE5XG4gKi9cblxuaW1wb3J0ICogYXMgZXhwZWN0IGZyb20gJy4vaGVscGVycy9leHBlY3QnO1xuaW1wb3J0IHBqc0Vycm9yLCB7XG4gICAgV0VCM19SRVFVSVJFRCxcbiAgICBDT05UUkFDVF9SRVFVSVJFRCxcbiAgICBBRERSRVNTX1JFUVVJUkVELFxuICAgIFRSQU5TQUNUSU9OX1VOU1VDQ0VTU0ZVTFxufSBmcm9tICcuL2hlbHBlcnMvZXJyb3JzJztcblxuLyoqXG4gKiBHZXQgdG9rZW5zIGJhbGFuY2VcbiAqIFxuICogQHBhcmFtIHtTdHJpbmd9IGFkZHJlc3MgVG9rZW5zIG93bmVyIGFkZHJlc3NcbiAqIEBwYXJhbSB7T2JqZWN0fSBjb25maWcgTGlicmFyeSBjb25maWcgKHByb3ZpZGVkIGJ5IHRoZSBwcm94eSBidXQgY2FuIGJlIG92ZXJyaWRkZW4pIFxuICovXG5leHBvcnQgY29uc3QgYmFsYW5jZU9mID0gYXN5bmMgKGFkZHJlc3MgPSAnJywgY29uZmlnID0ge30pID0+IHtcblxuICAgIGV4cGVjdC5hbGwoeyBhZGRyZXNzIH0sIHtcbiAgICAgICAgJ2FkZHJlc3MnOiB7XG4gICAgICAgICAgICB0eXBlOiAnYWRkcmVzcycsXG4gICAgICAgICAgICBjb2RlOiBBRERSRVNTX1JFUVVJUkVELFxuICAgICAgICAgICAgYXJnczogWydUb2tlbnMgb3duZXIgYWRkcmVzcyddXG4gICAgICAgIH1cbiAgICB9KTtcblxuICAgIGV4cGVjdC5hbGwoY29uZmlnLCB7XG4gICAgICAgICd3ZWIzJzoge1xuICAgICAgICAgICAgdHlwZTogJ29iamVjdCcsXG4gICAgICAgICAgICBjb2RlOiBXRUIzX1JFUVVJUkVEXG4gICAgICAgIH0sXG4gICAgICAgICdjb250cmFjdHMuUGFuLmFiaSc6IHtcbiAgICAgICAgICAgIHR5cGU6ICdvYmplY3QnLFxuICAgICAgICAgICAgY29kZTogQ09OVFJBQ1RfUkVRVUlSRUQsXG4gICAgICAgICAgICBhcmdzOiBbJ1BhbiddXG4gICAgICAgIH0sXG4gICAgICAgICdhZGRyZXNzZXMuUGFuJzoge1xuICAgICAgICAgICAgdHlwZTogJ2FkZHJlc3MnLFxuICAgICAgICAgICAgY29kZTogQUREUkVTU19SRVFVSVJFRCxcbiAgICAgICAgICAgIGFyZ3M6IFsnUGFuJ11cbiAgICAgICAgfVxuICAgIH0pO1xuXG4gICAgY29uc3QgZWNvID0gbmV3IGNvbmZpZy53ZWIzLmV0aC5Db250cmFjdChjb25maWcuY29udHJhY3RzLlBhbi5hYmksIGNvbmZpZy5hZGRyZXNzZXMuUGFuKTtcbiAgICBjb25zdCBiYWxhbmNlID0gYXdhaXQgZWNvLm1ldGhvZHNcbiAgICAgICAgLmJhbGFuY2VPZihhZGRyZXNzKVxuICAgICAgICAuY2FsbCgpO1xuICAgICAgICBcbiAgICByZXR1cm4gTnVtYmVyLnBhcnNlSW50KGJhbGFuY2UsIDEwKTtcbn07XG5cbi8qKlxuICogQXBwcm92ZSBzcGVjaWZpYyBhbW91bnQgb2YgdG9rZW5zIHRvIGJlIHNwZW50XG4gKiBcbiAqIEBwYXJhbSB7U3RyaW5nfSBvd25lckFkZHJlc3MgXG4gKiBAcGFyYW0ge1N0cmluZ30gc3BlbmRlckFkZHJlc3MgXG4gKiBAcGFyYW0ge051bWJlcn0gdmFsdWVcbiAqIEBwYXJhbSB7T2JqZWN0fSBjb25maWcgTGlicmFyeSBjb25maWcgKHByb3ZpZGVkIGJ5IHRoZSBwcm94eSBidXQgY2FuIGJlIG92ZXJyaWRkZW4pIFxuICovXG5leHBvcnQgY29uc3QgYXBwcm92ZSA9IChvd25lckFkZHJlc3MsIHNwZW5kZXJBZGRyZXNzLCB2YWx1ZSwgY29uZmlnID0ge30pID0+IG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcbiAgICBcbiAgICBleHBlY3QuYWxsKHsgb3duZXJBZGRyZXNzLCBzcGVuZGVyQWRkcmVzcywgdmFsdWUgfSwge1xuICAgICAgICAnb3duZXJBZGRyZXNzJzoge1xuICAgICAgICAgICAgdHlwZTogJ2FkZHJlc3MnLFxuICAgICAgICAgICAgY29kZTogQUREUkVTU19SRVFVSVJFRCxcbiAgICAgICAgICAgIGFyZ3M6IFsnVG9rZW5zIG93bmVyIGFkZHJlc3MnXVxuICAgICAgICB9LFxuICAgICAgICAnc3BlbmRlckFkZHJlc3MnOiB7XG4gICAgICAgICAgICB0eXBlOiAnYWRkcmVzcycsXG4gICAgICAgICAgICBjb2RlOiBBRERSRVNTX1JFUVVJUkVELFxuICAgICAgICAgICAgYXJnczogWydUb2tlbnMgc3BlbmRlciBhZGRyZXNzJ11cbiAgICAgICAgfSxcbiAgICAgICAgJ3ZhbHVlJzoge1xuICAgICAgICAgICAgdHlwZTogJ251bWJlcicsXG4gICAgICAgICAgICBhcmdzOiBbJ0Ftb3VudCBvZiB0b2tlbnMnXVxuICAgICAgICB9XG4gICAgfSk7XG5cbiAgICBleHBlY3QuYWxsKGNvbmZpZywge1xuICAgICAgICAnd2ViMyc6IHtcbiAgICAgICAgICAgIHR5cGU6ICdvYmplY3QnLFxuICAgICAgICAgICAgY29kZTogV0VCM19SRVFVSVJFRFxuICAgICAgICB9LFxuICAgICAgICAnY29udHJhY3RzLlBhbi5hYmknOiB7XG4gICAgICAgICAgICB0eXBlOiAnb2JqZWN0JyxcbiAgICAgICAgICAgIGNvZGU6IENPTlRSQUNUX1JFUVVJUkVELFxuICAgICAgICAgICAgYXJnczogWydQYW4nXVxuICAgICAgICB9LFxuICAgICAgICAnYWRkcmVzc2VzLlBhbic6IHtcbiAgICAgICAgICAgIHR5cGU6ICdhZGRyZXNzJyxcbiAgICAgICAgICAgIGNvZGU6IEFERFJFU1NfUkVRVUlSRUQsXG4gICAgICAgICAgICBhcmdzOiBbJ1BhbiddXG4gICAgICAgIH1cbiAgICB9KTtcblxuICAgIGNvbnN0IHBhbiA9IG5ldyBjb25maWcud2ViMy5ldGguQ29udHJhY3QoY29uZmlnLmNvbnRyYWN0cy5QYW4uYWJpLCBjb25maWcuYWRkcmVzc2VzLlBhbik7XG4gICAgcGFuLm1ldGhvZHNcbiAgICAgICAgLmFwcHJvdmUoc3BlbmRlckFkZHJlc3MsIGNvbmZpZy53ZWIzLnV0aWxzLnRvSGV4KHZhbHVlKSlcbiAgICAgICAgLnNlbmQoe1xuICAgICAgICAgICAgZnJvbTogb3duZXJBZGRyZXNzXG4gICAgICAgIH0pXG4gICAgICAgIC5vbignZXJyb3InLCByZWplY3QpXG4gICAgICAgIC5vbigncmVjZWlwdCcsIHJlY2VpcHQgPT4ge1xuXG4gICAgICAgICAgICBpZiAoTnVtYmVyKHJlY2VpcHQuc3RhdHVzKSA9PT0gMCkge1xuXG4gICAgICAgICAgICAgICAgcmV0dXJuIHJlamVjdChwanNFcnJvcihUUkFOU0FDVElPTl9VTlNVQ0NFU1NGVUwpKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgcmVzb2x2ZShyZWNlaXB0KTtcbiAgICAgICAgfSk7XG59KTtcblxuLyoqXG4gKiBUcmFuc2ZlciB0b2tlbnMgdG8gdGhlIGFkZHJlc3NcbiAqIFxuICogQHBhcmFtIHtTdHJpbmd9IG93bmVyQWRkcmVzcyBcbiAqIEBwYXJhbSB7U3RyaW5nfSBkZXN0aW5hdGlvbkFkZHJlc3MgXG4gKiBAcGFyYW0ge051bWJlcn0gdmFsdWVcbiAqIEBwYXJhbSB7T2JqZWN0fSBjb25maWcgTGlicmFyeSBjb25maWcgKHByb3ZpZGVkIGJ5IHRoZSBwcm94eSBidXQgY2FuIGJlIG92ZXJyaWRkZW4pIFxuICovXG5leHBvcnQgY29uc3QgdHJhbnNmZXIgPSAob3duZXJBZGRyZXNzLCBkZXN0aW5hdGlvbkFkZHJlc3MsIHZhbHVlLCBjb25maWcgPSB7fSkgPT4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuICAgIFxuICAgIGV4cGVjdC5hbGwoeyBvd25lckFkZHJlc3MsIGRlc3RpbmF0aW9uQWRkcmVzcywgdmFsdWUgfSwge1xuICAgICAgICAnb3duZXJBZGRyZXNzJzoge1xuICAgICAgICAgICAgdHlwZTogJ2FkZHJlc3MnLFxuICAgICAgICAgICAgY29kZTogQUREUkVTU19SRVFVSVJFRCxcbiAgICAgICAgICAgIGFyZ3M6IFsnVG9rZW5zIG93bmVyIGFkZHJlc3MnXVxuICAgICAgICB9LFxuICAgICAgICAnZGVzdGluYXRpb25BZGRyZXNzJzoge1xuICAgICAgICAgICAgdHlwZTogJ2FkZHJlc3MnLFxuICAgICAgICAgICAgY29kZTogQUREUkVTU19SRVFVSVJFRCxcbiAgICAgICAgICAgIGFyZ3M6IFsnVG9rZW5zIGRlc3RpbmF0aW9uIGFkZHJlc3MnXVxuICAgICAgICB9LFxuICAgICAgICAndmFsdWUnOiB7XG4gICAgICAgICAgICB0eXBlOiAnbnVtYmVyJyxcbiAgICAgICAgICAgIGFyZ3M6IFsnQW1vdW50IG9mIHRva2VucyddXG4gICAgICAgIH1cbiAgICB9KTtcblxuICAgIGV4cGVjdC5hbGwoY29uZmlnLCB7XG4gICAgICAgICd3ZWIzJzoge1xuICAgICAgICAgICAgdHlwZTogJ29iamVjdCcsXG4gICAgICAgICAgICBjb2RlOiBXRUIzX1JFUVVJUkVEXG4gICAgICAgIH0sXG4gICAgICAgICdjb250cmFjdHMuUGFuLmFiaSc6IHtcbiAgICAgICAgICAgIHR5cGU6ICdvYmplY3QnLFxuICAgICAgICAgICAgY29kZTogQ09OVFJBQ1RfUkVRVUlSRUQsXG4gICAgICAgICAgICBhcmdzOiBbJ1BhbiddXG4gICAgICAgIH0sXG4gICAgICAgICdhZGRyZXNzZXMuUGFuJzoge1xuICAgICAgICAgICAgdHlwZTogJ2FkZHJlc3MnLFxuICAgICAgICAgICAgY29kZTogQUREUkVTU19SRVFVSVJFRCxcbiAgICAgICAgICAgIGFyZ3M6IFsnUGFuJ11cbiAgICAgICAgfVxuICAgIH0pO1xuXG4gICAgY29uc3QgcGFuID0gbmV3IGNvbmZpZy53ZWIzLmV0aC5Db250cmFjdChjb25maWcuY29udHJhY3RzLlBhbi5hYmksIGNvbmZpZy5hZGRyZXNzZXMuUGFuKTtcbiAgICBwYW4ubWV0aG9kc1xuICAgICAgICAudHJhbnNmZXIoZGVzdGluYXRpb25BZGRyZXNzLCBjb25maWcud2ViMy51dGlscy50b0hleCh2YWx1ZSkpXG4gICAgICAgIC5zZW5kKHtcbiAgICAgICAgICAgIGZyb206IG93bmVyQWRkcmVzc1xuICAgICAgICB9KVxuICAgICAgICAub24oJ2Vycm9yJywgcmVqZWN0KVxuICAgICAgICAub24oJ3JlY2VpcHQnLCByZWNlaXB0ID0+IHtcblxuICAgICAgICAgICAgaWYgKE51bWJlcihyZWNlaXB0LnN0YXR1cykgPT09IDApIHtcblxuICAgICAgICAgICAgICAgIHJldHVybiByZWplY3QocGpzRXJyb3IoVFJBTlNBQ1RJT05fVU5TVUNDRVNTRlVMKSk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHJlc29sdmUocmVjZWlwdCk7XG4gICAgICAgIH0pO1xufSk7XG4iXX0=