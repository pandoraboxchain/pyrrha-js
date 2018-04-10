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
      return reject((0, _errors.default)(_errors.TRANSACTION_UNSUCCESSFUL));
    }

    resolve(receipt.contractAddress);
  });
});

exports.deployContract = deployContract;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9oZWxwZXJzL3dlYjMuanMiXSwibmFtZXMiOlsiZXN0aW1hdGVHYXMiLCJieXRlY29kZSIsImFyZ3MiLCJjb25maWciLCJleHBlY3QiLCJhbGwiLCJ0eXBlIiwiY29kZSIsIldFQjNfUkVRVUlSRUQiLCJ3ZWIzIiwiZXRoIiwiZGF0YSIsImFyZ3VtZW50cyIsImRlcGxveUNvbnRyYWN0IiwiY29udHJhY3QiLCJmcm9tIiwiZ2FzIiwiUHJvbWlzZSIsInJlc29sdmUiLCJyZWplY3QiLCJXRUIzX01FVEFNQVNLX1JFUVVJUkVEIiwiQ29udHJhY3QiLCJhYmkiLCJkZXBsb3kiLCJzZW5kIiwib24iLCJyZWNlaXB0IiwiTnVtYmVyIiwic3RhdHVzIiwiVFJBTlNBQ1RJT05fVU5TVUNDRVNTRlVMIiwiY29udHJhY3RBZGRyZXNzIl0sIm1hcHBpbmdzIjoiQUFBQTs7Ozs7Ozs7QUFRQTs7Ozs7OztBQUVBOztBQUNBOzs7O0FBTUE7Ozs7Ozs7QUFPTyxNQUFNQSxjQUFjLE9BQU9DLFFBQVAsRUFBaUJDLElBQWpCLEVBQXVCQyxTQUFTLEVBQWhDLEtBQXVDO0FBRTlEQyxTQUFPQyxHQUFQLENBQVdGLE1BQVgsRUFBbUI7QUFDZixZQUFRO0FBQ0pHLFlBQU0sUUFERjtBQUVKQyxZQUFNQztBQUZGO0FBRE8sR0FBbkI7QUFPQSxTQUFPLE1BQU1MLE9BQU9NLElBQVAsQ0FBWUMsR0FBWixDQUFnQlYsV0FBaEIsQ0FBNEI7QUFDckNXLFVBQU1WLFFBRCtCO0FBRXJDVyxlQUFXVjtBQUYwQixHQUE1QixDQUFiO0FBSUgsQ0FiTTtBQWVQOzs7Ozs7Ozs7OztBQU9PLE1BQU1XLGlCQUFpQixDQUFDQyxRQUFELEVBQVc7QUFBRVosTUFBRjtBQUFRYSxNQUFSO0FBQWNDO0FBQWQsQ0FBWCxFQUFnQ2IsU0FBUyxFQUF6QyxLQUFnRCxJQUFJYyxPQUFKLENBQVksQ0FBQ0MsT0FBRCxFQUFVQyxNQUFWLEtBQXFCO0FBRTNHZixTQUFPQyxHQUFQLENBQVdGLE1BQVgsRUFBbUI7QUFDZixZQUFRO0FBQ0pHLFlBQU0sUUFERjtBQUVKQyxZQUFNQztBQUZGLEtBRE87QUFLZix1Q0FBbUM7QUFDL0JGLFlBQU0sU0FEeUI7QUFFL0JDLFlBQU1hO0FBRnlCO0FBTHBCLEdBQW5CO0FBV0EsTUFBSWpCLE9BQU9NLElBQVAsQ0FBWUMsR0FBWixDQUFnQlcsUUFBcEIsQ0FBNkJQLFNBQVNRLEdBQXRDLEVBQ0tDLE1BREwsQ0FDWTtBQUNKWixVQUFNRyxTQUFTYixRQURYO0FBRUpXLGVBQVdWO0FBRlAsR0FEWixFQUtLc0IsSUFMTCxDQUtVO0FBQ0ZULFFBREU7QUFFRkM7QUFGRSxHQUxWLEVBU0tTLEVBVEwsQ0FTUSxPQVRSLEVBU2lCTixNQVRqQixFQVVLTSxFQVZMLENBVVEsU0FWUixFQVVtQkMsV0FBVztBQUV0QixRQUFJQyxPQUFPRCxRQUFRRSxNQUFmLE1BQTJCLENBQS9CLEVBQWtDO0FBRTlCLGFBQU9ULE9BQU8scUJBQVNVLGdDQUFULENBQVAsQ0FBUDtBQUNIOztBQUVEWCxZQUFRUSxRQUFRSSxlQUFoQjtBQUNILEdBbEJMO0FBbUJILENBaEM2RSxDQUF2RSIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogV2ViMyBoZWxwZXJzXG4gKiBUaGlzIGZpbGUgaXQgaXMgYSBwYXJ0IG9mIHRoZSBQYW5kb3JhIFB5cnJoYSBKYXZhc2NyaXB0IGxpYnJhcnlcbiAqIFxuICogQGZpbGUgZXJyb3JzLmpzXG4gKiBAYXV0aG9yIEtvc3RpYW50eW4gU215cm5vdiA8a29zdHlzaEBnbWFpbC5jb20+XG4gKiBAZGF0ZSAyMDE4XG4gKi9cbid1c2Ugc3RyaWN0JztcblxuaW1wb3J0ICogYXMgZXhwZWN0IGZyb20gJy4vZXhwZWN0JztcbmltcG9ydCBwanNFcnJvciwge1xuICAgIFdFQjNfUkVRVUlSRUQsXG4gICAgV0VCM19NRVRBTUFTS19SRVFVSVJFRCxcbiAgICBUUkFOU0FDVElPTl9VTlNVQ0NFU1NGVUxcbn0gZnJvbSAnLi9lcnJvcnMnO1xuXG4vKipcbiAqIEVzdGltYXRlIHJlcXVpcmVkIGdhcyBhbW91bnRcbiAqIFxuICogQHBhcmFtIHtTdHJpbmd9IGJ5dGVjb2RlIENvbnRyYWN0IGJ5dGVjb2RlXG4gKiBAcGFyYW0ge0FycmF5fSBhcmdzIENvbnRyYWN0IGFyZ3VtZW50c1xuICogQHJldHVybnMge051bWJlcn0gaGV4XG4gKi9cbmV4cG9ydCBjb25zdCBlc3RpbWF0ZUdhcyA9IGFzeW5jIChieXRlY29kZSwgYXJncywgY29uZmlnID0ge30pID0+IHtcblxuICAgIGV4cGVjdC5hbGwoY29uZmlnLCB7XG4gICAgICAgICd3ZWIzJzoge1xuICAgICAgICAgICAgdHlwZTogJ29iamVjdCcsXG4gICAgICAgICAgICBjb2RlOiBXRUIzX1JFUVVJUkVEXG4gICAgICAgIH1cbiAgICB9KTtcblxuICAgIHJldHVybiBhd2FpdCBjb25maWcud2ViMy5ldGguZXN0aW1hdGVHYXMoe1xuICAgICAgICBkYXRhOiBieXRlY29kZSxcbiAgICAgICAgYXJndW1lbnRzOiBhcmdzXG4gICAgfSk7XG59O1xuXG4vKipcbiAqIERlcGxveSBjb250cmFjdFxuICogXG4gKiBAcGFyYW0ge09iamVjdH0gY29udHJhY3QgQ29udHJhY3QganNvblxuICogQHBhcmFtIHtPYmplY3R9IG9wdGlvbnMgeyBhcmdzLCBmcm9tLCBnYXMgfSBcbiAqIEByZXR1cm5zIHtQcm9taXNlfSBQcm9taXNlIG9iamVjdCByZXNvbHZlZCB0byBjb250cmFjdCBhZGRyZXNzXG4gKi9cbmV4cG9ydCBjb25zdCBkZXBsb3lDb250cmFjdCA9IChjb250cmFjdCwgeyBhcmdzLCBmcm9tLCBnYXMgfSwgY29uZmlnID0ge30pID0+IG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcblxuICAgIGV4cGVjdC5hbGwoY29uZmlnLCB7XG4gICAgICAgICd3ZWIzJzoge1xuICAgICAgICAgICAgdHlwZTogJ29iamVjdCcsXG4gICAgICAgICAgICBjb2RlOiBXRUIzX1JFUVVJUkVEXG4gICAgICAgIH0sXG4gICAgICAgICd3ZWIzLmN1cnJlbnRQcm92aWRlci5pc01ldGFNYXNrJzoge1xuICAgICAgICAgICAgdHlwZTogJ2Jvb2xlYW4nLFxuICAgICAgICAgICAgY29kZTogV0VCM19NRVRBTUFTS19SRVFVSVJFRFxuICAgICAgICB9XG4gICAgfSk7XG5cbiAgICBuZXcgY29uZmlnLndlYjMuZXRoLkNvbnRyYWN0KGNvbnRyYWN0LmFiaSlcbiAgICAgICAgLmRlcGxveSh7XG4gICAgICAgICAgICBkYXRhOiBjb250cmFjdC5ieXRlY29kZSxcbiAgICAgICAgICAgIGFyZ3VtZW50czogYXJnc1xuICAgICAgICB9KVxuICAgICAgICAuc2VuZCh7XG4gICAgICAgICAgICBmcm9tLFxuICAgICAgICAgICAgZ2FzXG4gICAgICAgIH0pXG4gICAgICAgIC5vbignZXJyb3InLCByZWplY3QpXG4gICAgICAgIC5vbigncmVjZWlwdCcsIHJlY2VpcHQgPT4ge1xuXG4gICAgICAgICAgICBpZiAoTnVtYmVyKHJlY2VpcHQuc3RhdHVzKSA9PT0gMCkge1xuXG4gICAgICAgICAgICAgICAgcmV0dXJuIHJlamVjdChwanNFcnJvcihUUkFOU0FDVElPTl9VTlNVQ0NFU1NGVUwpKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgcmVzb2x2ZShyZWNlaXB0LmNvbnRyYWN0QWRkcmVzcyk7XG4gICAgICAgIH0pO1xufSk7XG4iXX0=