/**
 * Web3 helpers
 * This file it is a part of the Pandora Pyrrha Javascript library
 * 
 * @file errors.js
 * @author Kostiantyn Smyrnov <kostysh@gmail.com>
 * @date 2018
 */
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.deployContract = exports.estimateGas = void 0;

var _errors = _interopRequireWildcard(require("./errors"));

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

/**
 * Estimate required gas amount
 * 
 * @param {String} bytecode Contract bytecode
 * @param {Array} args Contract arguments
 * @returns {Number} hex
 */
var estimateGas = async function estimateGas(bytecode, args) {
  var config = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};

  if (!config.web3) {
    throw (0, _errors.default)(_errors.WEB3_REQUIRED);
  }

  return await config.web3.eth.estimateGas({
    data: bytecode,
    arguments: args
  });
};
/**
 * Deploy contract
 * 
 * @param {Object} contract Contract json
 * @param {Object} options { args, from, gas } 
 * @returns {Promise} Promise object resolved to contract address
 */


exports.estimateGas = estimateGas;

var deployContract = function deployContract(contract, _ref) {
  var args = _ref.args,
      from = _ref.from,
      gas = _ref.gas;
  var config = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
  return new Promise(function (resolve, reject) {
    if (!config.web3) {
      throw (0, _errors.default)(_errors.WEB3_REQUIRED);
    }

    if (!config.web3.currentProvider.isMetaMask) {
      throw (0, _errors.default)(_errors.WEB3_METAMASK_REQUIRED);
    }

    new config.web3.eth.Contract(contract.abi).deploy({
      data: contract.bytecode,
      arguments: args
    }).send({
      from: from,
      gas: gas
    }).on('error', reject).on('receipt', function (receipt) {
      return resolve(receipt.contractAddress);
    });
  });
};

exports.deployContract = deployContract;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9oZWxwZXJzL3dlYjMuanMiXSwibmFtZXMiOlsiZXN0aW1hdGVHYXMiLCJieXRlY29kZSIsImFyZ3MiLCJjb25maWciLCJ3ZWIzIiwiV0VCM19SRVFVSVJFRCIsImV0aCIsImRhdGEiLCJhcmd1bWVudHMiLCJkZXBsb3lDb250cmFjdCIsImNvbnRyYWN0IiwiZnJvbSIsImdhcyIsIlByb21pc2UiLCJyZXNvbHZlIiwicmVqZWN0IiwiY3VycmVudFByb3ZpZGVyIiwiaXNNZXRhTWFzayIsIldFQjNfTUVUQU1BU0tfUkVRVUlSRUQiLCJDb250cmFjdCIsImFiaSIsImRlcGxveSIsInNlbmQiLCJvbiIsInJlY2VpcHQiLCJjb250cmFjdEFkZHJlc3MiXSwibWFwcGluZ3MiOiJBQUFBOzs7Ozs7OztBQVFBOzs7Ozs7O0FBRUE7Ozs7QUFLQTs7Ozs7OztBQU9PLElBQU1BLGNBQWMsZUFBZEEsV0FBYyxDQUFPQyxRQUFQLEVBQWlCQyxJQUFqQixFQUF1QztBQUFBLE1BQWhCQyxNQUFnQix1RUFBUCxFQUFPOztBQUU5RCxNQUFJLENBQUNBLE9BQU9DLElBQVosRUFBa0I7QUFDZCxVQUFNLHFCQUFTQyxxQkFBVCxDQUFOO0FBQ0g7O0FBRUQsU0FBTyxNQUFNRixPQUFPQyxJQUFQLENBQVlFLEdBQVosQ0FBZ0JOLFdBQWhCLENBQTRCO0FBQ3JDTyxVQUFNTixRQUQrQjtBQUVyQ08sZUFBV047QUFGMEIsR0FBNUIsQ0FBYjtBQUlILENBVk07QUFZUDs7Ozs7Ozs7Ozs7QUFPTyxJQUFNTyxpQkFBaUIsU0FBakJBLGNBQWlCLENBQUNDLFFBQUQ7QUFBQSxNQUFhUixJQUFiLFFBQWFBLElBQWI7QUFBQSxNQUFtQlMsSUFBbkIsUUFBbUJBLElBQW5CO0FBQUEsTUFBeUJDLEdBQXpCLFFBQXlCQSxHQUF6QjtBQUFBLE1BQWdDVCxNQUFoQyx1RUFBeUMsRUFBekM7QUFBQSxTQUFnRCxJQUFJVSxPQUFKLENBQVksVUFBQ0MsT0FBRCxFQUFVQyxNQUFWLEVBQXFCO0FBRTNHLFFBQUksQ0FBQ1osT0FBT0MsSUFBWixFQUFrQjtBQUNkLFlBQU0scUJBQVNDLHFCQUFULENBQU47QUFDSDs7QUFFRCxRQUFJLENBQUNGLE9BQU9DLElBQVAsQ0FBWVksZUFBWixDQUE0QkMsVUFBakMsRUFBNkM7QUFDekMsWUFBTSxxQkFBU0MsOEJBQVQsQ0FBTjtBQUNIOztBQUVELFFBQUlmLE9BQU9DLElBQVAsQ0FBWUUsR0FBWixDQUFnQmEsUUFBcEIsQ0FBNkJULFNBQVNVLEdBQXRDLEVBQ0tDLE1BREwsQ0FDWTtBQUNKZCxZQUFNRyxTQUFTVCxRQURYO0FBRUpPLGlCQUFXTjtBQUZQLEtBRFosRUFLS29CLElBTEwsQ0FLVTtBQUNGWCxnQkFERTtBQUVGQztBQUZFLEtBTFYsRUFTS1csRUFUTCxDQVNRLE9BVFIsRUFTaUJSLE1BVGpCLEVBVUtRLEVBVkwsQ0FVUSxTQVZSLEVBVW1CO0FBQUEsYUFBV1QsUUFBUVUsUUFBUUMsZUFBaEIsQ0FBWDtBQUFBLEtBVm5CO0FBV0gsR0FyQjZFLENBQWhEO0FBQUEsQ0FBdkIiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIFdlYjMgaGVscGVyc1xuICogVGhpcyBmaWxlIGl0IGlzIGEgcGFydCBvZiB0aGUgUGFuZG9yYSBQeXJyaGEgSmF2YXNjcmlwdCBsaWJyYXJ5XG4gKiBcbiAqIEBmaWxlIGVycm9ycy5qc1xuICogQGF1dGhvciBLb3N0aWFudHluIFNteXJub3YgPGtvc3R5c2hAZ21haWwuY29tPlxuICogQGRhdGUgMjAxOFxuICovXG4ndXNlIHN0cmljdCc7XG5cbmltcG9ydCBwanNFcnJvciwge1xuICAgIFdFQjNfUkVRVUlSRUQsXG4gICAgV0VCM19NRVRBTUFTS19SRVFVSVJFRFxufSBmcm9tICcuL2Vycm9ycyc7XG5cbi8qKlxuICogRXN0aW1hdGUgcmVxdWlyZWQgZ2FzIGFtb3VudFxuICogXG4gKiBAcGFyYW0ge1N0cmluZ30gYnl0ZWNvZGUgQ29udHJhY3QgYnl0ZWNvZGVcbiAqIEBwYXJhbSB7QXJyYXl9IGFyZ3MgQ29udHJhY3QgYXJndW1lbnRzXG4gKiBAcmV0dXJucyB7TnVtYmVyfSBoZXhcbiAqL1xuZXhwb3J0IGNvbnN0IGVzdGltYXRlR2FzID0gYXN5bmMgKGJ5dGVjb2RlLCBhcmdzLCBjb25maWcgPSB7fSkgPT4ge1xuXG4gICAgaWYgKCFjb25maWcud2ViMykge1xuICAgICAgICB0aHJvdyBwanNFcnJvcihXRUIzX1JFUVVJUkVEKTtcbiAgICB9XG5cbiAgICByZXR1cm4gYXdhaXQgY29uZmlnLndlYjMuZXRoLmVzdGltYXRlR2FzKHtcbiAgICAgICAgZGF0YTogYnl0ZWNvZGUsXG4gICAgICAgIGFyZ3VtZW50czogYXJnc1xuICAgIH0pO1xufTtcblxuLyoqXG4gKiBEZXBsb3kgY29udHJhY3RcbiAqIFxuICogQHBhcmFtIHtPYmplY3R9IGNvbnRyYWN0IENvbnRyYWN0IGpzb25cbiAqIEBwYXJhbSB7T2JqZWN0fSBvcHRpb25zIHsgYXJncywgZnJvbSwgZ2FzIH0gXG4gKiBAcmV0dXJucyB7UHJvbWlzZX0gUHJvbWlzZSBvYmplY3QgcmVzb2x2ZWQgdG8gY29udHJhY3QgYWRkcmVzc1xuICovXG5leHBvcnQgY29uc3QgZGVwbG95Q29udHJhY3QgPSAoY29udHJhY3QsIHsgYXJncywgZnJvbSwgZ2FzIH0sIGNvbmZpZyA9IHt9KSA9PiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG4gICAgXG4gICAgaWYgKCFjb25maWcud2ViMykge1xuICAgICAgICB0aHJvdyBwanNFcnJvcihXRUIzX1JFUVVJUkVEKTtcbiAgICB9XG5cbiAgICBpZiAoIWNvbmZpZy53ZWIzLmN1cnJlbnRQcm92aWRlci5pc01ldGFNYXNrKSB7XG4gICAgICAgIHRocm93IHBqc0Vycm9yKFdFQjNfTUVUQU1BU0tfUkVRVUlSRUQpO1xuICAgIH1cblxuICAgIG5ldyBjb25maWcud2ViMy5ldGguQ29udHJhY3QoY29udHJhY3QuYWJpKVxuICAgICAgICAuZGVwbG95KHtcbiAgICAgICAgICAgIGRhdGE6IGNvbnRyYWN0LmJ5dGVjb2RlLFxuICAgICAgICAgICAgYXJndW1lbnRzOiBhcmdzXG4gICAgICAgIH0pXG4gICAgICAgIC5zZW5kKHtcbiAgICAgICAgICAgIGZyb20sXG4gICAgICAgICAgICBnYXNcbiAgICAgICAgfSlcbiAgICAgICAgLm9uKCdlcnJvcicsIHJlamVjdClcbiAgICAgICAgLm9uKCdyZWNlaXB0JywgcmVjZWlwdCA9PiByZXNvbHZlKHJlY2VpcHQuY29udHJhY3RBZGRyZXNzKSk7XG59KTtcbiJdfQ==