"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.minimumWorkerNodeStake = void 0;

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
 * Get minimum worker node stake value
 * 
 * @param {Object} config Library config (provided by the proxy but can be overridden) 
 */
var minimumWorkerNodeStake =
/*#__PURE__*/
function () {
  var _ref = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee() {
    var config,
        eco,
        stake,
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
              'contracts.EconomicController.abi': {
                type: 'object',
                code: _errors.CONTRACT_REQUIRED,
                args: ['EconomicController']
              },
              'addresses.EconomicController': {
                type: 'address',
                code: _errors.ADDRESS_REQUIRED,
                args: ['EconomicController']
              }
            });
            eco = new config.web3.eth.Contract(config.contracts.EconomicController.abi, config.addresses.EconomicController);
            _context.next = 5;
            return eco.methods.minimumWorkerNodeStake().call();

          case 5:
            stake = _context.sent;
            return _context.abrupt("return", Number.parseInt(stake, 10));

          case 7:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, this);
  }));

  return function minimumWorkerNodeStake() {
    return _ref.apply(this, arguments);
  };
}();

exports.minimumWorkerNodeStake = minimumWorkerNodeStake;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9lY29ub21pYy5qcyJdLCJuYW1lcyI6WyJtaW5pbXVtV29ya2VyTm9kZVN0YWtlIiwiY29uZmlnIiwiZXhwZWN0IiwiYWxsIiwidHlwZSIsImNvZGUiLCJXRUIzX1JFUVVJUkVEIiwiQ09OVFJBQ1RfUkVRVUlSRUQiLCJhcmdzIiwiQUREUkVTU19SRVFVSVJFRCIsImVjbyIsIndlYjMiLCJldGgiLCJDb250cmFjdCIsImNvbnRyYWN0cyIsIkVjb25vbWljQ29udHJvbGxlciIsImFiaSIsImFkZHJlc3NlcyIsIm1ldGhvZHMiLCJjYWxsIiwic3Rha2UiLCJOdW1iZXIiLCJwYXJzZUludCJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7O0FBU0E7O0FBQ0E7Ozs7Ozs7O0FBUUE7Ozs7O0FBS08sSUFBTUEsc0JBQXNCO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQSwwQkFBRztBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBT0MsWUFBQUEsTUFBUCwyREFBZ0IsRUFBaEI7QUFFbENDLFlBQUFBLE1BQU0sQ0FBQ0MsR0FBUCxDQUFXRixNQUFYLEVBQW1CO0FBQ2Ysc0JBQVE7QUFDSkcsZ0JBQUFBLElBQUksRUFBRSxRQURGO0FBRUpDLGdCQUFBQSxJQUFJLEVBQUVDO0FBRkYsZUFETztBQUtmLGtEQUFvQztBQUNoQ0YsZ0JBQUFBLElBQUksRUFBRSxRQUQwQjtBQUVoQ0MsZ0JBQUFBLElBQUksRUFBRUUseUJBRjBCO0FBR2hDQyxnQkFBQUEsSUFBSSxFQUFFLENBQUMsb0JBQUQ7QUFIMEIsZUFMckI7QUFVZiw4Q0FBZ0M7QUFDNUJKLGdCQUFBQSxJQUFJLEVBQUUsU0FEc0I7QUFFNUJDLGdCQUFBQSxJQUFJLEVBQUVJLHdCQUZzQjtBQUc1QkQsZ0JBQUFBLElBQUksRUFBRSxDQUFDLG9CQUFEO0FBSHNCO0FBVmpCLGFBQW5CO0FBaUJNRSxZQUFBQSxHQW5CNEIsR0FtQnRCLElBQUlULE1BQU0sQ0FBQ1UsSUFBUCxDQUFZQyxHQUFaLENBQWdCQyxRQUFwQixDQUE2QlosTUFBTSxDQUFDYSxTQUFQLENBQWlCQyxrQkFBakIsQ0FBb0NDLEdBQWpFLEVBQXNFZixNQUFNLENBQUNnQixTQUFQLENBQWlCRixrQkFBdkYsQ0FuQnNCO0FBQUE7QUFBQSxtQkFvQmRMLEdBQUcsQ0FBQ1EsT0FBSixDQUNmbEIsc0JBRGUsR0FFZm1CLElBRmUsRUFwQmM7O0FBQUE7QUFvQjVCQyxZQUFBQSxLQXBCNEI7QUFBQSw2Q0F3QjNCQyxNQUFNLENBQUNDLFFBQVAsQ0FBZ0JGLEtBQWhCLEVBQXVCLEVBQXZCLENBeEIyQjs7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQSxHQUFIOztBQUFBLGtCQUF0QnBCLHNCQUFzQjtBQUFBO0FBQUE7QUFBQSxHQUE1QiIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogRWNvbm9taWMgcmVsYXRlZCBtZXRob2RzXG4gKiBUaGlzIGZpbGUgaXQgaXMgYSBwYXJ0IG9mIHRoZSBQYW5kb3JhIFB5cnJoYSBKYXZhc2NyaXB0IGxpYnJhcnlcbiAqIFxuICogQGZpbGUgZWNvbm9taWMuanNcbiAqIEBhdXRob3IgS29zdGlhbnR5biBTbXlybm92IDxrb3N0eXNoQGdtYWlsLmNvbT5cbiAqIEBkYXRlIDIwMTlcbiAqL1xuXG5pbXBvcnQgKiBhcyBleHBlY3QgZnJvbSAnLi9oZWxwZXJzL2V4cGVjdCc7XG5pbXBvcnQgcGpzRXJyb3IsIHtcbiAgICBXRUIzX1JFUVVJUkVELFxuICAgIENPTlRSQUNUX1JFUVVJUkVELFxuICAgIEFERFJFU1NfUkVRVUlSRUQsXG4gICAgVFJBTlNBQ1RJT05fVU5TVUNDRVNTRlVMXG59IGZyb20gJy4vaGVscGVycy9lcnJvcnMnO1xuXG5cbi8qKlxuICogR2V0IG1pbmltdW0gd29ya2VyIG5vZGUgc3Rha2UgdmFsdWVcbiAqIFxuICogQHBhcmFtIHtPYmplY3R9IGNvbmZpZyBMaWJyYXJ5IGNvbmZpZyAocHJvdmlkZWQgYnkgdGhlIHByb3h5IGJ1dCBjYW4gYmUgb3ZlcnJpZGRlbikgXG4gKi9cbmV4cG9ydCBjb25zdCBtaW5pbXVtV29ya2VyTm9kZVN0YWtlID0gYXN5bmMgKGNvbmZpZyA9IHt9KSA9PiB7XG5cbiAgICBleHBlY3QuYWxsKGNvbmZpZywge1xuICAgICAgICAnd2ViMyc6IHtcbiAgICAgICAgICAgIHR5cGU6ICdvYmplY3QnLFxuICAgICAgICAgICAgY29kZTogV0VCM19SRVFVSVJFRFxuICAgICAgICB9LFxuICAgICAgICAnY29udHJhY3RzLkVjb25vbWljQ29udHJvbGxlci5hYmknOiB7XG4gICAgICAgICAgICB0eXBlOiAnb2JqZWN0JyxcbiAgICAgICAgICAgIGNvZGU6IENPTlRSQUNUX1JFUVVJUkVELFxuICAgICAgICAgICAgYXJnczogWydFY29ub21pY0NvbnRyb2xsZXInXVxuICAgICAgICB9LFxuICAgICAgICAnYWRkcmVzc2VzLkVjb25vbWljQ29udHJvbGxlcic6IHtcbiAgICAgICAgICAgIHR5cGU6ICdhZGRyZXNzJyxcbiAgICAgICAgICAgIGNvZGU6IEFERFJFU1NfUkVRVUlSRUQsXG4gICAgICAgICAgICBhcmdzOiBbJ0Vjb25vbWljQ29udHJvbGxlciddXG4gICAgICAgIH1cbiAgICB9KTtcblxuICAgIGNvbnN0IGVjbyA9IG5ldyBjb25maWcud2ViMy5ldGguQ29udHJhY3QoY29uZmlnLmNvbnRyYWN0cy5FY29ub21pY0NvbnRyb2xsZXIuYWJpLCBjb25maWcuYWRkcmVzc2VzLkVjb25vbWljQ29udHJvbGxlcik7XG4gICAgY29uc3Qgc3Rha2UgPSBhd2FpdCBlY28ubWV0aG9kc1xuICAgICAgICAubWluaW11bVdvcmtlck5vZGVTdGFrZSgpXG4gICAgICAgIC5jYWxsKCk7XG4gICAgICAgIFxuICAgIHJldHVybiBOdW1iZXIucGFyc2VJbnQoc3Rha2UsIDEwKTtcbn07XG4iXX0=