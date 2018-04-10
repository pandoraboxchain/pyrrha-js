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

var _errors = require("./errors");

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
      return reject(new Error('Transaction was unsuccessful'));
    }

    resolve(receipt.contractAddress);
  });
});

exports.deployContract = deployContract;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9oZWxwZXJzL3dlYjMuanMiXSwibmFtZXMiOlsiZXN0aW1hdGVHYXMiLCJieXRlY29kZSIsImFyZ3MiLCJjb25maWciLCJleHBlY3QiLCJhbGwiLCJ0eXBlIiwiY29kZSIsIldFQjNfUkVRVUlSRUQiLCJ3ZWIzIiwiZXRoIiwiZGF0YSIsImFyZ3VtZW50cyIsImRlcGxveUNvbnRyYWN0IiwiY29udHJhY3QiLCJmcm9tIiwiZ2FzIiwiUHJvbWlzZSIsInJlc29sdmUiLCJyZWplY3QiLCJXRUIzX01FVEFNQVNLX1JFUVVJUkVEIiwiQ29udHJhY3QiLCJhYmkiLCJkZXBsb3kiLCJzZW5kIiwib24iLCJyZWNlaXB0IiwiTnVtYmVyIiwic3RhdHVzIiwiRXJyb3IiLCJjb250cmFjdEFkZHJlc3MiXSwibWFwcGluZ3MiOiJBQUFBOzs7Ozs7OztBQVFBOzs7Ozs7O0FBRUE7O0FBQ0E7Ozs7QUFLQTs7Ozs7OztBQU9PLE1BQU1BLGNBQWMsT0FBT0MsUUFBUCxFQUFpQkMsSUFBakIsRUFBdUJDLFNBQVMsRUFBaEMsS0FBdUM7QUFFOURDLFNBQU9DLEdBQVAsQ0FBV0YsTUFBWCxFQUFtQjtBQUNmLFlBQVE7QUFDSkcsWUFBTSxRQURGO0FBRUpDLFlBQU1DO0FBRkY7QUFETyxHQUFuQjtBQU9BLFNBQU8sTUFBTUwsT0FBT00sSUFBUCxDQUFZQyxHQUFaLENBQWdCVixXQUFoQixDQUE0QjtBQUNyQ1csVUFBTVYsUUFEK0I7QUFFckNXLGVBQVdWO0FBRjBCLEdBQTVCLENBQWI7QUFJSCxDQWJNO0FBZVA7Ozs7Ozs7Ozs7O0FBT08sTUFBTVcsaUJBQWlCLENBQUNDLFFBQUQsRUFBVztBQUFFWixNQUFGO0FBQVFhLE1BQVI7QUFBY0M7QUFBZCxDQUFYLEVBQWdDYixTQUFTLEVBQXpDLEtBQWdELElBQUljLE9BQUosQ0FBWSxDQUFDQyxPQUFELEVBQVVDLE1BQVYsS0FBcUI7QUFFM0dmLFNBQU9DLEdBQVAsQ0FBV0YsTUFBWCxFQUFtQjtBQUNmLFlBQVE7QUFDSkcsWUFBTSxRQURGO0FBRUpDLFlBQU1DO0FBRkYsS0FETztBQUtmLHVDQUFtQztBQUMvQkYsWUFBTSxTQUR5QjtBQUUvQkMsWUFBTWE7QUFGeUI7QUFMcEIsR0FBbkI7QUFXQSxNQUFJakIsT0FBT00sSUFBUCxDQUFZQyxHQUFaLENBQWdCVyxRQUFwQixDQUE2QlAsU0FBU1EsR0FBdEMsRUFDS0MsTUFETCxDQUNZO0FBQ0paLFVBQU1HLFNBQVNiLFFBRFg7QUFFSlcsZUFBV1Y7QUFGUCxHQURaLEVBS0tzQixJQUxMLENBS1U7QUFDRlQsUUFERTtBQUVGQztBQUZFLEdBTFYsRUFTS1MsRUFUTCxDQVNRLE9BVFIsRUFTaUJOLE1BVGpCLEVBVUtNLEVBVkwsQ0FVUSxTQVZSLEVBVW1CQyxXQUFXO0FBRXRCLFFBQUlDLE9BQU9ELFFBQVFFLE1BQWYsTUFBMkIsQ0FBL0IsRUFBa0M7QUFFOUIsYUFBT1QsT0FBTyxJQUFJVSxLQUFKLENBQVUsOEJBQVYsQ0FBUCxDQUFQO0FBQ0g7O0FBRURYLFlBQVFRLFFBQVFJLGVBQWhCO0FBQ0gsR0FsQkw7QUFtQkgsQ0FoQzZFLENBQXZFIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBXZWIzIGhlbHBlcnNcbiAqIFRoaXMgZmlsZSBpdCBpcyBhIHBhcnQgb2YgdGhlIFBhbmRvcmEgUHlycmhhIEphdmFzY3JpcHQgbGlicmFyeVxuICogXG4gKiBAZmlsZSBlcnJvcnMuanNcbiAqIEBhdXRob3IgS29zdGlhbnR5biBTbXlybm92IDxrb3N0eXNoQGdtYWlsLmNvbT5cbiAqIEBkYXRlIDIwMThcbiAqL1xuJ3VzZSBzdHJpY3QnO1xuXG5pbXBvcnQgKiBhcyBleHBlY3QgZnJvbSAnLi9leHBlY3QnO1xuaW1wb3J0IHtcbiAgICBXRUIzX1JFUVVJUkVELFxuICAgIFdFQjNfTUVUQU1BU0tfUkVRVUlSRURcbn0gZnJvbSAnLi9lcnJvcnMnO1xuXG4vKipcbiAqIEVzdGltYXRlIHJlcXVpcmVkIGdhcyBhbW91bnRcbiAqIFxuICogQHBhcmFtIHtTdHJpbmd9IGJ5dGVjb2RlIENvbnRyYWN0IGJ5dGVjb2RlXG4gKiBAcGFyYW0ge0FycmF5fSBhcmdzIENvbnRyYWN0IGFyZ3VtZW50c1xuICogQHJldHVybnMge051bWJlcn0gaGV4XG4gKi9cbmV4cG9ydCBjb25zdCBlc3RpbWF0ZUdhcyA9IGFzeW5jIChieXRlY29kZSwgYXJncywgY29uZmlnID0ge30pID0+IHtcblxuICAgIGV4cGVjdC5hbGwoY29uZmlnLCB7XG4gICAgICAgICd3ZWIzJzoge1xuICAgICAgICAgICAgdHlwZTogJ29iamVjdCcsXG4gICAgICAgICAgICBjb2RlOiBXRUIzX1JFUVVJUkVEXG4gICAgICAgIH1cbiAgICB9KTtcblxuICAgIHJldHVybiBhd2FpdCBjb25maWcud2ViMy5ldGguZXN0aW1hdGVHYXMoe1xuICAgICAgICBkYXRhOiBieXRlY29kZSxcbiAgICAgICAgYXJndW1lbnRzOiBhcmdzXG4gICAgfSk7XG59O1xuXG4vKipcbiAqIERlcGxveSBjb250cmFjdFxuICogXG4gKiBAcGFyYW0ge09iamVjdH0gY29udHJhY3QgQ29udHJhY3QganNvblxuICogQHBhcmFtIHtPYmplY3R9IG9wdGlvbnMgeyBhcmdzLCBmcm9tLCBnYXMgfSBcbiAqIEByZXR1cm5zIHtQcm9taXNlfSBQcm9taXNlIG9iamVjdCByZXNvbHZlZCB0byBjb250cmFjdCBhZGRyZXNzXG4gKi9cbmV4cG9ydCBjb25zdCBkZXBsb3lDb250cmFjdCA9IChjb250cmFjdCwgeyBhcmdzLCBmcm9tLCBnYXMgfSwgY29uZmlnID0ge30pID0+IG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcblxuICAgIGV4cGVjdC5hbGwoY29uZmlnLCB7XG4gICAgICAgICd3ZWIzJzoge1xuICAgICAgICAgICAgdHlwZTogJ29iamVjdCcsXG4gICAgICAgICAgICBjb2RlOiBXRUIzX1JFUVVJUkVEXG4gICAgICAgIH0sXG4gICAgICAgICd3ZWIzLmN1cnJlbnRQcm92aWRlci5pc01ldGFNYXNrJzoge1xuICAgICAgICAgICAgdHlwZTogJ2Jvb2xlYW4nLFxuICAgICAgICAgICAgY29kZTogV0VCM19NRVRBTUFTS19SRVFVSVJFRFxuICAgICAgICB9XG4gICAgfSk7XG5cbiAgICBuZXcgY29uZmlnLndlYjMuZXRoLkNvbnRyYWN0KGNvbnRyYWN0LmFiaSlcbiAgICAgICAgLmRlcGxveSh7XG4gICAgICAgICAgICBkYXRhOiBjb250cmFjdC5ieXRlY29kZSxcbiAgICAgICAgICAgIGFyZ3VtZW50czogYXJnc1xuICAgICAgICB9KVxuICAgICAgICAuc2VuZCh7XG4gICAgICAgICAgICBmcm9tLFxuICAgICAgICAgICAgZ2FzXG4gICAgICAgIH0pXG4gICAgICAgIC5vbignZXJyb3InLCByZWplY3QpXG4gICAgICAgIC5vbigncmVjZWlwdCcsIHJlY2VpcHQgPT4ge1xuXG4gICAgICAgICAgICBpZiAoTnVtYmVyKHJlY2VpcHQuc3RhdHVzKSA9PT0gMCkge1xuXG4gICAgICAgICAgICAgICAgcmV0dXJuIHJlamVjdChuZXcgRXJyb3IoJ1RyYW5zYWN0aW9uIHdhcyB1bnN1Y2Nlc3NmdWwnKSk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHJlc29sdmUocmVjZWlwdC5jb250cmFjdEFkZHJlc3MpO1xuICAgICAgICB9KTtcbn0pO1xuIl19