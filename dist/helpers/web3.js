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
const estimateGas = async (bytecode, args, config = {}) => {
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

const deployContract = (contract, {
  args,
  from,
  gas
}, config = {}) => new Promise((resolve, reject) => {
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
    from,
    gas
  }).on('error', reject).on('receipt', receipt => resolve(receipt.contractAddress));
});

exports.deployContract = deployContract;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9oZWxwZXJzL3dlYjMuanMiXSwibmFtZXMiOlsiZXN0aW1hdGVHYXMiLCJieXRlY29kZSIsImFyZ3MiLCJjb25maWciLCJ3ZWIzIiwiV0VCM19SRVFVSVJFRCIsImV0aCIsImRhdGEiLCJhcmd1bWVudHMiLCJkZXBsb3lDb250cmFjdCIsImNvbnRyYWN0IiwiZnJvbSIsImdhcyIsIlByb21pc2UiLCJyZXNvbHZlIiwicmVqZWN0IiwiY3VycmVudFByb3ZpZGVyIiwiaXNNZXRhTWFzayIsIldFQjNfTUVUQU1BU0tfUkVRVUlSRUQiLCJDb250cmFjdCIsImFiaSIsImRlcGxveSIsInNlbmQiLCJvbiIsInJlY2VpcHQiLCJjb250cmFjdEFkZHJlc3MiXSwibWFwcGluZ3MiOiJBQUFBOzs7Ozs7OztBQVFBOzs7Ozs7O0FBRUE7Ozs7QUFLQTs7Ozs7OztBQU9PLE1BQU1BLGNBQWMsT0FBT0MsUUFBUCxFQUFpQkMsSUFBakIsRUFBdUJDLFNBQVMsRUFBaEMsS0FBdUM7QUFFOUQsTUFBSSxDQUFDQSxPQUFPQyxJQUFaLEVBQWtCO0FBQ2QsVUFBTSxxQkFBU0MscUJBQVQsQ0FBTjtBQUNIOztBQUVELFNBQU8sTUFBTUYsT0FBT0MsSUFBUCxDQUFZRSxHQUFaLENBQWdCTixXQUFoQixDQUE0QjtBQUNyQ08sVUFBTU4sUUFEK0I7QUFFckNPLGVBQVdOO0FBRjBCLEdBQTVCLENBQWI7QUFJSCxDQVZNO0FBWVA7Ozs7Ozs7Ozs7O0FBT08sTUFBTU8saUJBQWlCLENBQUNDLFFBQUQsRUFBVztBQUFFUixNQUFGO0FBQVFTLE1BQVI7QUFBY0M7QUFBZCxDQUFYLEVBQWdDVCxTQUFTLEVBQXpDLEtBQWdELElBQUlVLE9BQUosQ0FBWSxDQUFDQyxPQUFELEVBQVVDLE1BQVYsS0FBcUI7QUFFM0csTUFBSSxDQUFDWixPQUFPQyxJQUFaLEVBQWtCO0FBQ2QsVUFBTSxxQkFBU0MscUJBQVQsQ0FBTjtBQUNIOztBQUVELE1BQUksQ0FBQ0YsT0FBT0MsSUFBUCxDQUFZWSxlQUFaLENBQTRCQyxVQUFqQyxFQUE2QztBQUN6QyxVQUFNLHFCQUFTQyw4QkFBVCxDQUFOO0FBQ0g7O0FBRUQsTUFBSWYsT0FBT0MsSUFBUCxDQUFZRSxHQUFaLENBQWdCYSxRQUFwQixDQUE2QlQsU0FBU1UsR0FBdEMsRUFDS0MsTUFETCxDQUNZO0FBQ0pkLFVBQU1HLFNBQVNULFFBRFg7QUFFSk8sZUFBV047QUFGUCxHQURaLEVBS0tvQixJQUxMLENBS1U7QUFDRlgsUUFERTtBQUVGQztBQUZFLEdBTFYsRUFTS1csRUFUTCxDQVNRLE9BVFIsRUFTaUJSLE1BVGpCLEVBVUtRLEVBVkwsQ0FVUSxTQVZSLEVBVW1CQyxXQUFXVixRQUFRVSxRQUFRQyxlQUFoQixDQVY5QjtBQVdILENBckI2RSxDQUF2RSIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogV2ViMyBoZWxwZXJzXG4gKiBUaGlzIGZpbGUgaXQgaXMgYSBwYXJ0IG9mIHRoZSBQYW5kb3JhIFB5cnJoYSBKYXZhc2NyaXB0IGxpYnJhcnlcbiAqIFxuICogQGZpbGUgZXJyb3JzLmpzXG4gKiBAYXV0aG9yIEtvc3RpYW50eW4gU215cm5vdiA8a29zdHlzaEBnbWFpbC5jb20+XG4gKiBAZGF0ZSAyMDE4XG4gKi9cbid1c2Ugc3RyaWN0JztcblxuaW1wb3J0IHBqc0Vycm9yLCB7XG4gICAgV0VCM19SRVFVSVJFRCxcbiAgICBXRUIzX01FVEFNQVNLX1JFUVVJUkVEXG59IGZyb20gJy4vZXJyb3JzJztcblxuLyoqXG4gKiBFc3RpbWF0ZSByZXF1aXJlZCBnYXMgYW1vdW50XG4gKiBcbiAqIEBwYXJhbSB7U3RyaW5nfSBieXRlY29kZSBDb250cmFjdCBieXRlY29kZVxuICogQHBhcmFtIHtBcnJheX0gYXJncyBDb250cmFjdCBhcmd1bWVudHNcbiAqIEByZXR1cm5zIHtOdW1iZXJ9IGhleFxuICovXG5leHBvcnQgY29uc3QgZXN0aW1hdGVHYXMgPSBhc3luYyAoYnl0ZWNvZGUsIGFyZ3MsIGNvbmZpZyA9IHt9KSA9PiB7XG5cbiAgICBpZiAoIWNvbmZpZy53ZWIzKSB7XG4gICAgICAgIHRocm93IHBqc0Vycm9yKFdFQjNfUkVRVUlSRUQpO1xuICAgIH1cblxuICAgIHJldHVybiBhd2FpdCBjb25maWcud2ViMy5ldGguZXN0aW1hdGVHYXMoe1xuICAgICAgICBkYXRhOiBieXRlY29kZSxcbiAgICAgICAgYXJndW1lbnRzOiBhcmdzXG4gICAgfSk7XG59O1xuXG4vKipcbiAqIERlcGxveSBjb250cmFjdFxuICogXG4gKiBAcGFyYW0ge09iamVjdH0gY29udHJhY3QgQ29udHJhY3QganNvblxuICogQHBhcmFtIHtPYmplY3R9IG9wdGlvbnMgeyBhcmdzLCBmcm9tLCBnYXMgfSBcbiAqIEByZXR1cm5zIHtQcm9taXNlfSBQcm9taXNlIG9iamVjdCByZXNvbHZlZCB0byBjb250cmFjdCBhZGRyZXNzXG4gKi9cbmV4cG9ydCBjb25zdCBkZXBsb3lDb250cmFjdCA9IChjb250cmFjdCwgeyBhcmdzLCBmcm9tLCBnYXMgfSwgY29uZmlnID0ge30pID0+IG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcbiAgICBcbiAgICBpZiAoIWNvbmZpZy53ZWIzKSB7XG4gICAgICAgIHRocm93IHBqc0Vycm9yKFdFQjNfUkVRVUlSRUQpO1xuICAgIH1cblxuICAgIGlmICghY29uZmlnLndlYjMuY3VycmVudFByb3ZpZGVyLmlzTWV0YU1hc2spIHtcbiAgICAgICAgdGhyb3cgcGpzRXJyb3IoV0VCM19NRVRBTUFTS19SRVFVSVJFRCk7XG4gICAgfVxuXG4gICAgbmV3IGNvbmZpZy53ZWIzLmV0aC5Db250cmFjdChjb250cmFjdC5hYmkpXG4gICAgICAgIC5kZXBsb3koe1xuICAgICAgICAgICAgZGF0YTogY29udHJhY3QuYnl0ZWNvZGUsXG4gICAgICAgICAgICBhcmd1bWVudHM6IGFyZ3NcbiAgICAgICAgfSlcbiAgICAgICAgLnNlbmQoe1xuICAgICAgICAgICAgZnJvbSxcbiAgICAgICAgICAgIGdhc1xuICAgICAgICB9KVxuICAgICAgICAub24oJ2Vycm9yJywgcmVqZWN0KVxuICAgICAgICAub24oJ3JlY2VpcHQnLCByZWNlaXB0ID0+IHJlc29sdmUocmVjZWlwdC5jb250cmFjdEFkZHJlc3MpKTtcbn0pO1xuIl19