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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9oZWxwZXJzL3dlYjMuanMiXSwibmFtZXMiOlsiZXN0aW1hdGVHYXMiLCJieXRlY29kZSIsImFyZ3MiLCJjb25maWciLCJleHBlY3QiLCJhbGwiLCJ0eXBlIiwiY29kZSIsIldFQjNfUkVRVUlSRUQiLCJ3ZWIzIiwiZXRoIiwiZGF0YSIsImFyZ3VtZW50cyIsImRlcGxveUNvbnRyYWN0IiwiY29udHJhY3QiLCJmcm9tIiwiZ2FzIiwiUHJvbWlzZSIsInJlc29sdmUiLCJyZWplY3QiLCJXRUIzX01FVEFNQVNLX1JFUVVJUkVEIiwiQ29udHJhY3QiLCJhYmkiLCJkZXBsb3kiLCJzZW5kIiwib24iLCJyZWNlaXB0IiwiTnVtYmVyIiwic3RhdHVzIiwiVFJBTlNBQ1RJT05fVU5TVUNDRVNTRlVMIiwiY29udHJhY3RBZGRyZXNzIl0sIm1hcHBpbmdzIjoiQUFBQTs7Ozs7Ozs7QUFRQTs7Ozs7OztBQUVBOztBQUNBOzs7O0FBTUE7Ozs7Ozs7QUFPTyxNQUFNQSxXQUFXLEdBQUcsT0FBT0MsUUFBUCxFQUFpQkMsSUFBakIsRUFBdUJDLE1BQU0sR0FBRyxFQUFoQyxLQUF1QztBQUU5REMsRUFBQUEsTUFBTSxDQUFDQyxHQUFQLENBQVdGLE1BQVgsRUFBbUI7QUFDZixZQUFRO0FBQ0pHLE1BQUFBLElBQUksRUFBRSxRQURGO0FBRUpDLE1BQUFBLElBQUksRUFBRUM7QUFGRjtBQURPLEdBQW5CO0FBT0EsU0FBTyxNQUFNTCxNQUFNLENBQUNNLElBQVAsQ0FBWUMsR0FBWixDQUFnQlYsV0FBaEIsQ0FBNEI7QUFDckNXLElBQUFBLElBQUksRUFBRVYsUUFEK0I7QUFFckNXLElBQUFBLFNBQVMsRUFBRVYsSUFGMEIsQ0FFdEI7O0FBRnNCLEdBQTVCLENBQWI7QUFJSCxDQWJNO0FBZVA7Ozs7Ozs7Ozs7O0FBT08sTUFBTVcsY0FBYyxHQUFHLENBQUNDLFFBQUQsRUFBVztBQUFFWixFQUFBQSxJQUFGO0FBQVFhLEVBQUFBLElBQVI7QUFBY0MsRUFBQUE7QUFBZCxDQUFYLEVBQWdDYixNQUFNLEdBQUcsRUFBekMsS0FBZ0QsSUFBSWMsT0FBSixDQUFZLENBQUNDLE9BQUQsRUFBVUMsTUFBVixLQUFxQjtBQUUzR2YsRUFBQUEsTUFBTSxDQUFDQyxHQUFQLENBQVdGLE1BQVgsRUFBbUI7QUFDZixZQUFRO0FBQ0pHLE1BQUFBLElBQUksRUFBRSxRQURGO0FBRUpDLE1BQUFBLElBQUksRUFBRUM7QUFGRixLQURPO0FBS2YsdUNBQW1DO0FBQy9CRixNQUFBQSxJQUFJLEVBQUUsU0FEeUI7QUFFL0JDLE1BQUFBLElBQUksRUFBRWE7QUFGeUI7QUFMcEIsR0FBbkI7QUFXQSxNQUFJakIsTUFBTSxDQUFDTSxJQUFQLENBQVlDLEdBQVosQ0FBZ0JXLFFBQXBCLENBQTZCUCxRQUFRLENBQUNRLEdBQXRDLEVBQ0tDLE1BREwsQ0FDWTtBQUNKWixJQUFBQSxJQUFJLEVBQUVHLFFBQVEsQ0FBQ2IsUUFEWDtBQUVKVyxJQUFBQSxTQUFTLEVBQUVWO0FBRlAsR0FEWixFQUtLc0IsSUFMTCxDQUtVO0FBQ0ZULElBQUFBLElBREU7QUFFRkMsSUFBQUE7QUFGRSxHQUxWLEVBU0tTLEVBVEwsQ0FTUSxPQVRSLEVBU2lCTixNQVRqQixFQVVLTSxFQVZMLENBVVEsU0FWUixFQVVtQkMsT0FBTyxJQUFJO0FBRXRCLFFBQUlDLE1BQU0sQ0FBQ0QsT0FBTyxDQUFDRSxNQUFULENBQU4sS0FBMkIsQ0FBL0IsRUFBa0M7QUFFOUIsYUFBT1QsTUFBTSxDQUFDLHFCQUFTVSxnQ0FBVCxDQUFELENBQWI7QUFDSDs7QUFFRFgsSUFBQUEsT0FBTyxDQUFDUSxPQUFPLENBQUNJLGVBQVQsQ0FBUDtBQUNILEdBbEJMO0FBbUJILENBaEM2RSxDQUF2RSIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogV2ViMyBoZWxwZXJzXG4gKiBUaGlzIGZpbGUgaXQgaXMgYSBwYXJ0IG9mIHRoZSBQYW5kb3JhIFB5cnJoYSBKYXZhc2NyaXB0IGxpYnJhcnlcbiAqIFxuICogQGZpbGUgZXJyb3JzLmpzXG4gKiBAYXV0aG9yIEtvc3RpYW50eW4gU215cm5vdiA8a29zdHlzaEBnbWFpbC5jb20+XG4gKiBAZGF0ZSAyMDE4XG4gKi9cbid1c2Ugc3RyaWN0JztcblxuaW1wb3J0ICogYXMgZXhwZWN0IGZyb20gJy4vZXhwZWN0JztcbmltcG9ydCBwanNFcnJvciwge1xuICAgIFdFQjNfUkVRVUlSRUQsXG4gICAgV0VCM19NRVRBTUFTS19SRVFVSVJFRCxcbiAgICBUUkFOU0FDVElPTl9VTlNVQ0NFU1NGVUxcbn0gZnJvbSAnLi9lcnJvcnMnO1xuXG4vKipcbiAqIEVzdGltYXRlIHJlcXVpcmVkIGdhcyBhbW91bnRcbiAqIFxuICogQHBhcmFtIHtTdHJpbmd9IGJ5dGVjb2RlIENvbnRyYWN0IGJ5dGVjb2RlXG4gKiBAcGFyYW0ge0FycmF5fSBhcmdzIENvbnRyYWN0IGFyZ3VtZW50c1xuICogQHJldHVybnMge051bWJlcn0gaGV4XG4gKi9cbmV4cG9ydCBjb25zdCBlc3RpbWF0ZUdhcyA9IGFzeW5jIChieXRlY29kZSwgYXJncywgY29uZmlnID0ge30pID0+IHtcblxuICAgIGV4cGVjdC5hbGwoY29uZmlnLCB7XG4gICAgICAgICd3ZWIzJzoge1xuICAgICAgICAgICAgdHlwZTogJ29iamVjdCcsXG4gICAgICAgICAgICBjb2RlOiBXRUIzX1JFUVVJUkVEXG4gICAgICAgIH1cbiAgICB9KTtcblxuICAgIHJldHVybiBhd2FpdCBjb25maWcud2ViMy5ldGguZXN0aW1hdGVHYXMoe1xuICAgICAgICBkYXRhOiBieXRlY29kZSxcbiAgICAgICAgYXJndW1lbnRzOiBhcmdzLy8gQGZpeG1lIEl0IHNlZW1zIGxhdGVzdCB3ZWIzIGRvIG5vdCByZXF1aXJlIGFyZ3VtZW50cyBhcyBvcHRpb25cbiAgICB9KTtcbn07XG5cbi8qKlxuICogRGVwbG95IGNvbnRyYWN0XG4gKiBcbiAqIEBwYXJhbSB7T2JqZWN0fSBjb250cmFjdCBDb250cmFjdCBqc29uXG4gKiBAcGFyYW0ge09iamVjdH0gb3B0aW9ucyB7IGFyZ3MsIGZyb20sIGdhcyB9IFxuICogQHJldHVybnMge1Byb21pc2V9IFByb21pc2Ugb2JqZWN0IHJlc29sdmVkIHRvIGNvbnRyYWN0IGFkZHJlc3NcbiAqL1xuZXhwb3J0IGNvbnN0IGRlcGxveUNvbnRyYWN0ID0gKGNvbnRyYWN0LCB7IGFyZ3MsIGZyb20sIGdhcyB9LCBjb25maWcgPSB7fSkgPT4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuXG4gICAgZXhwZWN0LmFsbChjb25maWcsIHtcbiAgICAgICAgJ3dlYjMnOiB7XG4gICAgICAgICAgICB0eXBlOiAnb2JqZWN0JyxcbiAgICAgICAgICAgIGNvZGU6IFdFQjNfUkVRVUlSRURcbiAgICAgICAgfSxcbiAgICAgICAgJ3dlYjMuY3VycmVudFByb3ZpZGVyLmlzTWV0YU1hc2snOiB7XG4gICAgICAgICAgICB0eXBlOiAnYm9vbGVhbicsXG4gICAgICAgICAgICBjb2RlOiBXRUIzX01FVEFNQVNLX1JFUVVJUkVEXG4gICAgICAgIH1cbiAgICB9KTtcblxuICAgIG5ldyBjb25maWcud2ViMy5ldGguQ29udHJhY3QoY29udHJhY3QuYWJpKVxuICAgICAgICAuZGVwbG95KHtcbiAgICAgICAgICAgIGRhdGE6IGNvbnRyYWN0LmJ5dGVjb2RlLFxuICAgICAgICAgICAgYXJndW1lbnRzOiBhcmdzXG4gICAgICAgIH0pXG4gICAgICAgIC5zZW5kKHtcbiAgICAgICAgICAgIGZyb20sXG4gICAgICAgICAgICBnYXNcbiAgICAgICAgfSlcbiAgICAgICAgLm9uKCdlcnJvcicsIHJlamVjdClcbiAgICAgICAgLm9uKCdyZWNlaXB0JywgcmVjZWlwdCA9PiB7XG5cbiAgICAgICAgICAgIGlmIChOdW1iZXIocmVjZWlwdC5zdGF0dXMpID09PSAwKSB7XG5cbiAgICAgICAgICAgICAgICByZXR1cm4gcmVqZWN0KHBqc0Vycm9yKFRSQU5TQUNUSU9OX1VOU1VDQ0VTU0ZVTCkpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICByZXNvbHZlKHJlY2VpcHQuY29udHJhY3RBZGRyZXNzKTtcbiAgICAgICAgfSk7XG59KTtcbiJdfQ==