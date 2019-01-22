"use strict";

require("core-js/modules/es6.object.define-property");

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9lY29ub21pYy5qcyJdLCJuYW1lcyI6WyJtaW5pbXVtV29ya2VyTm9kZVN0YWtlIiwiY29uZmlnIiwiZXhwZWN0IiwiYWxsIiwidHlwZSIsImNvZGUiLCJXRUIzX1JFUVVJUkVEIiwiQ09OVFJBQ1RfUkVRVUlSRUQiLCJhcmdzIiwiQUREUkVTU19SRVFVSVJFRCIsImVjbyIsIndlYjMiLCJldGgiLCJDb250cmFjdCIsImNvbnRyYWN0cyIsIkVjb25vbWljQ29udHJvbGxlciIsImFiaSIsImFkZHJlc3NlcyIsIm1ldGhvZHMiLCJjYWxsIiwic3Rha2UiLCJOdW1iZXIiLCJwYXJzZUludCJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFTQTs7QUFDQTs7Ozs7Ozs7QUFRQTs7Ozs7QUFLTyxJQUFNQSxzQkFBc0I7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBLDBCQUFHO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFPQyxZQUFBQSxNQUFQLDJEQUFnQixFQUFoQjtBQUVsQ0MsWUFBQUEsTUFBTSxDQUFDQyxHQUFQLENBQVdGLE1BQVgsRUFBbUI7QUFDZixzQkFBUTtBQUNKRyxnQkFBQUEsSUFBSSxFQUFFLFFBREY7QUFFSkMsZ0JBQUFBLElBQUksRUFBRUM7QUFGRixlQURPO0FBS2Ysa0RBQW9DO0FBQ2hDRixnQkFBQUEsSUFBSSxFQUFFLFFBRDBCO0FBRWhDQyxnQkFBQUEsSUFBSSxFQUFFRSx5QkFGMEI7QUFHaENDLGdCQUFBQSxJQUFJLEVBQUUsQ0FBQyxvQkFBRDtBQUgwQixlQUxyQjtBQVVmLDhDQUFnQztBQUM1QkosZ0JBQUFBLElBQUksRUFBRSxTQURzQjtBQUU1QkMsZ0JBQUFBLElBQUksRUFBRUksd0JBRnNCO0FBRzVCRCxnQkFBQUEsSUFBSSxFQUFFLENBQUMsb0JBQUQ7QUFIc0I7QUFWakIsYUFBbkI7QUFpQk1FLFlBQUFBLEdBbkI0QixHQW1CdEIsSUFBSVQsTUFBTSxDQUFDVSxJQUFQLENBQVlDLEdBQVosQ0FBZ0JDLFFBQXBCLENBQTZCWixNQUFNLENBQUNhLFNBQVAsQ0FBaUJDLGtCQUFqQixDQUFvQ0MsR0FBakUsRUFBc0VmLE1BQU0sQ0FBQ2dCLFNBQVAsQ0FBaUJGLGtCQUF2RixDQW5Cc0I7QUFBQTtBQUFBLG1CQW9CZEwsR0FBRyxDQUFDUSxPQUFKLENBQ2ZsQixzQkFEZSxHQUVmbUIsSUFGZSxFQXBCYzs7QUFBQTtBQW9CNUJDLFlBQUFBLEtBcEI0QjtBQUFBLDZDQXdCM0JDLE1BQU0sQ0FBQ0MsUUFBUCxDQUFnQkYsS0FBaEIsRUFBdUIsRUFBdkIsQ0F4QjJCOztBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBLEdBQUg7O0FBQUEsa0JBQXRCcEIsc0JBQXNCO0FBQUE7QUFBQTtBQUFBLEdBQTVCIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBFY29ub21pYyByZWxhdGVkIG1ldGhvZHNcbiAqIFRoaXMgZmlsZSBpdCBpcyBhIHBhcnQgb2YgdGhlIFBhbmRvcmEgUHlycmhhIEphdmFzY3JpcHQgbGlicmFyeVxuICogXG4gKiBAZmlsZSBlY29ub21pYy5qc1xuICogQGF1dGhvciBLb3N0aWFudHluIFNteXJub3YgPGtvc3R5c2hAZ21haWwuY29tPlxuICogQGRhdGUgMjAxOVxuICovXG5cbmltcG9ydCAqIGFzIGV4cGVjdCBmcm9tICcuL2hlbHBlcnMvZXhwZWN0JztcbmltcG9ydCBwanNFcnJvciwge1xuICAgIFdFQjNfUkVRVUlSRUQsXG4gICAgQ09OVFJBQ1RfUkVRVUlSRUQsXG4gICAgQUREUkVTU19SRVFVSVJFRCxcbiAgICBUUkFOU0FDVElPTl9VTlNVQ0NFU1NGVUxcbn0gZnJvbSAnLi9oZWxwZXJzL2Vycm9ycyc7XG5cblxuLyoqXG4gKiBHZXQgbWluaW11bSB3b3JrZXIgbm9kZSBzdGFrZSB2YWx1ZVxuICogXG4gKiBAcGFyYW0ge09iamVjdH0gY29uZmlnIExpYnJhcnkgY29uZmlnIChwcm92aWRlZCBieSB0aGUgcHJveHkgYnV0IGNhbiBiZSBvdmVycmlkZGVuKSBcbiAqL1xuZXhwb3J0IGNvbnN0IG1pbmltdW1Xb3JrZXJOb2RlU3Rha2UgPSBhc3luYyAoY29uZmlnID0ge30pID0+IHtcblxuICAgIGV4cGVjdC5hbGwoY29uZmlnLCB7XG4gICAgICAgICd3ZWIzJzoge1xuICAgICAgICAgICAgdHlwZTogJ29iamVjdCcsXG4gICAgICAgICAgICBjb2RlOiBXRUIzX1JFUVVJUkVEXG4gICAgICAgIH0sXG4gICAgICAgICdjb250cmFjdHMuRWNvbm9taWNDb250cm9sbGVyLmFiaSc6IHtcbiAgICAgICAgICAgIHR5cGU6ICdvYmplY3QnLFxuICAgICAgICAgICAgY29kZTogQ09OVFJBQ1RfUkVRVUlSRUQsXG4gICAgICAgICAgICBhcmdzOiBbJ0Vjb25vbWljQ29udHJvbGxlciddXG4gICAgICAgIH0sXG4gICAgICAgICdhZGRyZXNzZXMuRWNvbm9taWNDb250cm9sbGVyJzoge1xuICAgICAgICAgICAgdHlwZTogJ2FkZHJlc3MnLFxuICAgICAgICAgICAgY29kZTogQUREUkVTU19SRVFVSVJFRCxcbiAgICAgICAgICAgIGFyZ3M6IFsnRWNvbm9taWNDb250cm9sbGVyJ11cbiAgICAgICAgfVxuICAgIH0pO1xuXG4gICAgY29uc3QgZWNvID0gbmV3IGNvbmZpZy53ZWIzLmV0aC5Db250cmFjdChjb25maWcuY29udHJhY3RzLkVjb25vbWljQ29udHJvbGxlci5hYmksIGNvbmZpZy5hZGRyZXNzZXMuRWNvbm9taWNDb250cm9sbGVyKTtcbiAgICBjb25zdCBzdGFrZSA9IGF3YWl0IGVjby5tZXRob2RzXG4gICAgICAgIC5taW5pbXVtV29ya2VyTm9kZVN0YWtlKClcbiAgICAgICAgLmNhbGwoKTtcbiAgICAgICAgXG4gICAgcmV0dXJuIE51bWJlci5wYXJzZUludChzdGFrZSwgMTApO1xufTtcbiJdfQ==