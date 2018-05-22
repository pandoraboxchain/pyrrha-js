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

var expect = _interopRequireWildcard(require("./expect"));

var _errors = _interopRequireWildcard(require("./errors"));

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

/**
 * Estimate required gas amount
 * 
 * @param {String} bytecode Contract bytecode
 * @param {Array} args Contract arguments
 * @returns {Number} hex
 */
const estimateGas = async (bytecode, args, config = {}) => {
  expect.all(config, {
    'web3': {
      type: 'object',
      code: _errors.WEB3_REQUIRED
    }
  });
  return await config.web3.eth.estimateGas({
    data: bytecode,
    arguments: args // @fixme It seems latest web3 do not require arguments as option

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

const deployContract = (contract, {
  args,
  from,
  gas
}, config = {}) => new Promise((resolve, reject) => {
  expect.all(config, {
    'web3': {
      type: 'object',
      code: _errors.WEB3_REQUIRED
    },
    'web3.currentProvider.isMetaMask': {
      type: 'boolean',
      code: _errors.WEB3_METAMASK_REQUIRED
    }
  });
  new config.web3.eth.Contract(contract.abi).deploy({
    data: contract.bytecode,
    arguments: args
  }).send({
    from,
    gas
  }).on('error', reject).on('receipt', receipt => {
    if (Number(receipt.status) === 0) {
      return reject((0, _errors.default)(_errors.TRANSACTION_UNSUCCESSFUL));
    }

    resolve(receipt.contractAddress);
  });
});

exports.deployContract = deployContract;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9oZWxwZXJzL3dlYjMuanMiXSwibmFtZXMiOlsiZXN0aW1hdGVHYXMiLCJieXRlY29kZSIsImFyZ3MiLCJjb25maWciLCJleHBlY3QiLCJhbGwiLCJ0eXBlIiwiY29kZSIsIldFQjNfUkVRVUlSRUQiLCJ3ZWIzIiwiZXRoIiwiZGF0YSIsImFyZ3VtZW50cyIsImRlcGxveUNvbnRyYWN0IiwiY29udHJhY3QiLCJmcm9tIiwiZ2FzIiwiUHJvbWlzZSIsInJlc29sdmUiLCJyZWplY3QiLCJXRUIzX01FVEFNQVNLX1JFUVVJUkVEIiwiQ29udHJhY3QiLCJhYmkiLCJkZXBsb3kiLCJzZW5kIiwib24iLCJyZWNlaXB0IiwiTnVtYmVyIiwic3RhdHVzIiwiVFJBTlNBQ1RJT05fVU5TVUNDRVNTRlVMIiwiY29udHJhY3RBZGRyZXNzIl0sIm1hcHBpbmdzIjoiQUFBQTs7Ozs7Ozs7QUFRQTs7Ozs7OztBQUVBOztBQUNBOzs7O0FBTUE7Ozs7Ozs7QUFPTyxNQUFNQSxjQUFjLE9BQU9DLFFBQVAsRUFBaUJDLElBQWpCLEVBQXVCQyxTQUFTLEVBQWhDLEtBQXVDO0FBRTlEQyxTQUFPQyxHQUFQLENBQVdGLE1BQVgsRUFBbUI7QUFDZixZQUFRO0FBQ0pHLFlBQU0sUUFERjtBQUVKQyxZQUFNQztBQUZGO0FBRE8sR0FBbkI7QUFPQSxTQUFPLE1BQU1MLE9BQU9NLElBQVAsQ0FBWUMsR0FBWixDQUFnQlYsV0FBaEIsQ0FBNEI7QUFDckNXLFVBQU1WLFFBRCtCO0FBRXJDVyxlQUFXVixJQUYwQixDQUV0Qjs7QUFGc0IsR0FBNUIsQ0FBYjtBQUlILENBYk07QUFlUDs7Ozs7Ozs7Ozs7QUFPTyxNQUFNVyxpQkFBaUIsQ0FBQ0MsUUFBRCxFQUFXO0FBQUVaLE1BQUY7QUFBUWEsTUFBUjtBQUFjQztBQUFkLENBQVgsRUFBZ0NiLFNBQVMsRUFBekMsS0FBZ0QsSUFBSWMsT0FBSixDQUFZLENBQUNDLE9BQUQsRUFBVUMsTUFBVixLQUFxQjtBQUUzR2YsU0FBT0MsR0FBUCxDQUFXRixNQUFYLEVBQW1CO0FBQ2YsWUFBUTtBQUNKRyxZQUFNLFFBREY7QUFFSkMsWUFBTUM7QUFGRixLQURPO0FBS2YsdUNBQW1DO0FBQy9CRixZQUFNLFNBRHlCO0FBRS9CQyxZQUFNYTtBQUZ5QjtBQUxwQixHQUFuQjtBQVdBLE1BQUlqQixPQUFPTSxJQUFQLENBQVlDLEdBQVosQ0FBZ0JXLFFBQXBCLENBQTZCUCxTQUFTUSxHQUF0QyxFQUNLQyxNQURMLENBQ1k7QUFDSlosVUFBTUcsU0FBU2IsUUFEWDtBQUVKVyxlQUFXVjtBQUZQLEdBRFosRUFLS3NCLElBTEwsQ0FLVTtBQUNGVCxRQURFO0FBRUZDO0FBRkUsR0FMVixFQVNLUyxFQVRMLENBU1EsT0FUUixFQVNpQk4sTUFUakIsRUFVS00sRUFWTCxDQVVRLFNBVlIsRUFVbUJDLFdBQVc7QUFFdEIsUUFBSUMsT0FBT0QsUUFBUUUsTUFBZixNQUEyQixDQUEvQixFQUFrQztBQUU5QixhQUFPVCxPQUFPLHFCQUFTVSxnQ0FBVCxDQUFQLENBQVA7QUFDSDs7QUFFRFgsWUFBUVEsUUFBUUksZUFBaEI7QUFDSCxHQWxCTDtBQW1CSCxDQWhDNkUsQ0FBdkUiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIFdlYjMgaGVscGVyc1xuICogVGhpcyBmaWxlIGl0IGlzIGEgcGFydCBvZiB0aGUgUGFuZG9yYSBQeXJyaGEgSmF2YXNjcmlwdCBsaWJyYXJ5XG4gKiBcbiAqIEBmaWxlIGVycm9ycy5qc1xuICogQGF1dGhvciBLb3N0aWFudHluIFNteXJub3YgPGtvc3R5c2hAZ21haWwuY29tPlxuICogQGRhdGUgMjAxOFxuICovXG4ndXNlIHN0cmljdCc7XG5cbmltcG9ydCAqIGFzIGV4cGVjdCBmcm9tICcuL2V4cGVjdCc7XG5pbXBvcnQgcGpzRXJyb3IsIHtcbiAgICBXRUIzX1JFUVVJUkVELFxuICAgIFdFQjNfTUVUQU1BU0tfUkVRVUlSRUQsXG4gICAgVFJBTlNBQ1RJT05fVU5TVUNDRVNTRlVMXG59IGZyb20gJy4vZXJyb3JzJztcblxuLyoqXG4gKiBFc3RpbWF0ZSByZXF1aXJlZCBnYXMgYW1vdW50XG4gKiBcbiAqIEBwYXJhbSB7U3RyaW5nfSBieXRlY29kZSBDb250cmFjdCBieXRlY29kZVxuICogQHBhcmFtIHtBcnJheX0gYXJncyBDb250cmFjdCBhcmd1bWVudHNcbiAqIEByZXR1cm5zIHtOdW1iZXJ9IGhleFxuICovXG5leHBvcnQgY29uc3QgZXN0aW1hdGVHYXMgPSBhc3luYyAoYnl0ZWNvZGUsIGFyZ3MsIGNvbmZpZyA9IHt9KSA9PiB7XG5cbiAgICBleHBlY3QuYWxsKGNvbmZpZywge1xuICAgICAgICAnd2ViMyc6IHtcbiAgICAgICAgICAgIHR5cGU6ICdvYmplY3QnLFxuICAgICAgICAgICAgY29kZTogV0VCM19SRVFVSVJFRFxuICAgICAgICB9XG4gICAgfSk7XG5cbiAgICByZXR1cm4gYXdhaXQgY29uZmlnLndlYjMuZXRoLmVzdGltYXRlR2FzKHtcbiAgICAgICAgZGF0YTogYnl0ZWNvZGUsXG4gICAgICAgIGFyZ3VtZW50czogYXJncy8vIEBmaXhtZSBJdCBzZWVtcyBsYXRlc3Qgd2ViMyBkbyBub3QgcmVxdWlyZSBhcmd1bWVudHMgYXMgb3B0aW9uXG4gICAgfSk7XG59O1xuXG4vKipcbiAqIERlcGxveSBjb250cmFjdFxuICogXG4gKiBAcGFyYW0ge09iamVjdH0gY29udHJhY3QgQ29udHJhY3QganNvblxuICogQHBhcmFtIHtPYmplY3R9IG9wdGlvbnMgeyBhcmdzLCBmcm9tLCBnYXMgfSBcbiAqIEByZXR1cm5zIHtQcm9taXNlfSBQcm9taXNlIG9iamVjdCByZXNvbHZlZCB0byBjb250cmFjdCBhZGRyZXNzXG4gKi9cbmV4cG9ydCBjb25zdCBkZXBsb3lDb250cmFjdCA9IChjb250cmFjdCwgeyBhcmdzLCBmcm9tLCBnYXMgfSwgY29uZmlnID0ge30pID0+IG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcblxuICAgIGV4cGVjdC5hbGwoY29uZmlnLCB7XG4gICAgICAgICd3ZWIzJzoge1xuICAgICAgICAgICAgdHlwZTogJ29iamVjdCcsXG4gICAgICAgICAgICBjb2RlOiBXRUIzX1JFUVVJUkVEXG4gICAgICAgIH0sXG4gICAgICAgICd3ZWIzLmN1cnJlbnRQcm92aWRlci5pc01ldGFNYXNrJzoge1xuICAgICAgICAgICAgdHlwZTogJ2Jvb2xlYW4nLFxuICAgICAgICAgICAgY29kZTogV0VCM19NRVRBTUFTS19SRVFVSVJFRFxuICAgICAgICB9XG4gICAgfSk7XG5cbiAgICBuZXcgY29uZmlnLndlYjMuZXRoLkNvbnRyYWN0KGNvbnRyYWN0LmFiaSlcbiAgICAgICAgLmRlcGxveSh7XG4gICAgICAgICAgICBkYXRhOiBjb250cmFjdC5ieXRlY29kZSxcbiAgICAgICAgICAgIGFyZ3VtZW50czogYXJnc1xuICAgICAgICB9KVxuICAgICAgICAuc2VuZCh7XG4gICAgICAgICAgICBmcm9tLFxuICAgICAgICAgICAgZ2FzXG4gICAgICAgIH0pXG4gICAgICAgIC5vbignZXJyb3InLCByZWplY3QpXG4gICAgICAgIC5vbigncmVjZWlwdCcsIHJlY2VpcHQgPT4ge1xuXG4gICAgICAgICAgICBpZiAoTnVtYmVyKHJlY2VpcHQuc3RhdHVzKSA9PT0gMCkge1xuXG4gICAgICAgICAgICAgICAgcmV0dXJuIHJlamVjdChwanNFcnJvcihUUkFOU0FDVElPTl9VTlNVQ0NFU1NGVUwpKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgcmVzb2x2ZShyZWNlaXB0LmNvbnRyYWN0QWRkcmVzcyk7XG4gICAgICAgIH0pO1xufSk7XG4iXX0=