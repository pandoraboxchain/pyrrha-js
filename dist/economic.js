"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.minimumWorkerNodeStake = void 0;

var expect = _interopRequireWildcard(require("./helpers/expect"));

var _errors = _interopRequireWildcard(require("./helpers/errors"));

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

/**
 * Economic related methods
 * This file it is a part of the Pandora Pyrrha Javascript library
 * 
 * @file economic.js
 * @author Kostiantyn Smyrnov <kostysh@gmail.com>
 * @date 2019
 */

/**
 * Get minimum worker node stake value
 * 
 * @param {Object} config Library config (provided by the proxy but can be overridden) 
 */
const minimumWorkerNodeStake = async (config = {}) => {
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
  const eco = new config.web3.eth.Contract(config.contracts.EconomicController.abi, config.addresses.EconomicController);
  const stake = await eco.methods.minimumWorkerNodeStake().call();
  return Number.parseInt(stake, 10);
};

exports.minimumWorkerNodeStake = minimumWorkerNodeStake;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9lY29ub21pYy5qcyJdLCJuYW1lcyI6WyJtaW5pbXVtV29ya2VyTm9kZVN0YWtlIiwiY29uZmlnIiwiZXhwZWN0IiwiYWxsIiwidHlwZSIsImNvZGUiLCJXRUIzX1JFUVVJUkVEIiwiQ09OVFJBQ1RfUkVRVUlSRUQiLCJhcmdzIiwiQUREUkVTU19SRVFVSVJFRCIsImVjbyIsIndlYjMiLCJldGgiLCJDb250cmFjdCIsImNvbnRyYWN0cyIsIkVjb25vbWljQ29udHJvbGxlciIsImFiaSIsImFkZHJlc3NlcyIsInN0YWtlIiwibWV0aG9kcyIsImNhbGwiLCJOdW1iZXIiLCJwYXJzZUludCJdLCJtYXBwaW5ncyI6Ijs7Ozs7OztBQVNBOztBQUNBOzs7O0FBVkE7Ozs7Ozs7OztBQWtCQTs7Ozs7QUFLTyxNQUFNQSxzQkFBc0IsR0FBRyxPQUFPQyxNQUFNLEdBQUcsRUFBaEIsS0FBdUI7QUFFekRDLEVBQUFBLE1BQU0sQ0FBQ0MsR0FBUCxDQUFXRixNQUFYLEVBQW1CO0FBQ2YsWUFBUTtBQUNKRyxNQUFBQSxJQUFJLEVBQUUsUUFERjtBQUVKQyxNQUFBQSxJQUFJLEVBQUVDO0FBRkYsS0FETztBQUtmLHdDQUFvQztBQUNoQ0YsTUFBQUEsSUFBSSxFQUFFLFFBRDBCO0FBRWhDQyxNQUFBQSxJQUFJLEVBQUVFLHlCQUYwQjtBQUdoQ0MsTUFBQUEsSUFBSSxFQUFFLENBQUMsb0JBQUQ7QUFIMEIsS0FMckI7QUFVZixvQ0FBZ0M7QUFDNUJKLE1BQUFBLElBQUksRUFBRSxTQURzQjtBQUU1QkMsTUFBQUEsSUFBSSxFQUFFSSx3QkFGc0I7QUFHNUJELE1BQUFBLElBQUksRUFBRSxDQUFDLG9CQUFEO0FBSHNCO0FBVmpCLEdBQW5CO0FBaUJBLFFBQU1FLEdBQUcsR0FBRyxJQUFJVCxNQUFNLENBQUNVLElBQVAsQ0FBWUMsR0FBWixDQUFnQkMsUUFBcEIsQ0FBNkJaLE1BQU0sQ0FBQ2EsU0FBUCxDQUFpQkMsa0JBQWpCLENBQW9DQyxHQUFqRSxFQUFzRWYsTUFBTSxDQUFDZ0IsU0FBUCxDQUFpQkYsa0JBQXZGLENBQVo7QUFDQSxRQUFNRyxLQUFLLEdBQUcsTUFBTVIsR0FBRyxDQUFDUyxPQUFKLENBQ2ZuQixzQkFEZSxHQUVmb0IsSUFGZSxFQUFwQjtBQUlBLFNBQU9DLE1BQU0sQ0FBQ0MsUUFBUCxDQUFnQkosS0FBaEIsRUFBdUIsRUFBdkIsQ0FBUDtBQUNILENBekJNIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBFY29ub21pYyByZWxhdGVkIG1ldGhvZHNcbiAqIFRoaXMgZmlsZSBpdCBpcyBhIHBhcnQgb2YgdGhlIFBhbmRvcmEgUHlycmhhIEphdmFzY3JpcHQgbGlicmFyeVxuICogXG4gKiBAZmlsZSBlY29ub21pYy5qc1xuICogQGF1dGhvciBLb3N0aWFudHluIFNteXJub3YgPGtvc3R5c2hAZ21haWwuY29tPlxuICogQGRhdGUgMjAxOVxuICovXG5cbmltcG9ydCAqIGFzIGV4cGVjdCBmcm9tICcuL2hlbHBlcnMvZXhwZWN0JztcbmltcG9ydCBwanNFcnJvciwge1xuICAgIFdFQjNfUkVRVUlSRUQsXG4gICAgQ09OVFJBQ1RfUkVRVUlSRUQsXG4gICAgQUREUkVTU19SRVFVSVJFRCxcbiAgICBUUkFOU0FDVElPTl9VTlNVQ0NFU1NGVUxcbn0gZnJvbSAnLi9oZWxwZXJzL2Vycm9ycyc7XG5cblxuLyoqXG4gKiBHZXQgbWluaW11bSB3b3JrZXIgbm9kZSBzdGFrZSB2YWx1ZVxuICogXG4gKiBAcGFyYW0ge09iamVjdH0gY29uZmlnIExpYnJhcnkgY29uZmlnIChwcm92aWRlZCBieSB0aGUgcHJveHkgYnV0IGNhbiBiZSBvdmVycmlkZGVuKSBcbiAqL1xuZXhwb3J0IGNvbnN0IG1pbmltdW1Xb3JrZXJOb2RlU3Rha2UgPSBhc3luYyAoY29uZmlnID0ge30pID0+IHtcblxuICAgIGV4cGVjdC5hbGwoY29uZmlnLCB7XG4gICAgICAgICd3ZWIzJzoge1xuICAgICAgICAgICAgdHlwZTogJ29iamVjdCcsXG4gICAgICAgICAgICBjb2RlOiBXRUIzX1JFUVVJUkVEXG4gICAgICAgIH0sXG4gICAgICAgICdjb250cmFjdHMuRWNvbm9taWNDb250cm9sbGVyLmFiaSc6IHtcbiAgICAgICAgICAgIHR5cGU6ICdvYmplY3QnLFxuICAgICAgICAgICAgY29kZTogQ09OVFJBQ1RfUkVRVUlSRUQsXG4gICAgICAgICAgICBhcmdzOiBbJ0Vjb25vbWljQ29udHJvbGxlciddXG4gICAgICAgIH0sXG4gICAgICAgICdhZGRyZXNzZXMuRWNvbm9taWNDb250cm9sbGVyJzoge1xuICAgICAgICAgICAgdHlwZTogJ2FkZHJlc3MnLFxuICAgICAgICAgICAgY29kZTogQUREUkVTU19SRVFVSVJFRCxcbiAgICAgICAgICAgIGFyZ3M6IFsnRWNvbm9taWNDb250cm9sbGVyJ11cbiAgICAgICAgfVxuICAgIH0pO1xuXG4gICAgY29uc3QgZWNvID0gbmV3IGNvbmZpZy53ZWIzLmV0aC5Db250cmFjdChjb25maWcuY29udHJhY3RzLkVjb25vbWljQ29udHJvbGxlci5hYmksIGNvbmZpZy5hZGRyZXNzZXMuRWNvbm9taWNDb250cm9sbGVyKTtcbiAgICBjb25zdCBzdGFrZSA9IGF3YWl0IGVjby5tZXRob2RzXG4gICAgICAgIC5taW5pbXVtV29ya2VyTm9kZVN0YWtlKClcbiAgICAgICAgLmNhbGwoKTtcbiAgICAgICAgXG4gICAgcmV0dXJuIE51bWJlci5wYXJzZUludChzdGFrZSwgMTApO1xufTtcbiJdfQ==