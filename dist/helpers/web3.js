/**
 * Web3 helpers
 * This file it is a part of the Pandora Pyrrha Javascript library
 * 
 * @file errors.js
 * @author Kostiantyn Smyrnov <kostysh@gmail.com>
 * @date 2018
 */
'use strict';Object.defineProperty(exports, "__esModule", { value: true });exports.deployContract = exports.estimateGas = void 0;

var _errors = _interopRequireWildcard(require("./errors"));function _interopRequireWildcard(obj) {if (obj && obj.__esModule) {return obj;} else {var newObj = {};if (obj != null) {for (var key in obj) {if (Object.prototype.hasOwnProperty.call(obj, key)) {var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {};if (desc.get || desc.set) {Object.defineProperty(newObj, key, desc);} else {newObj[key] = obj[key];}}}}newObj.default = obj;return newObj;}}




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
    arguments: args });

};

/**
    * Deploy contract
    * 
    * @param {Object} contract Contract json
    * @param {Object} options { args, from, gas } 
    * @returns {Promise} Promise object resolved to contract address
    */exports.estimateGas = estimateGas;
const deployContract = (contract, { args, from, gas }, config = {}) => new Promise((resolve, reject) => {

  if (!config.web3) {
    throw (0, _errors.default)(_errors.WEB3_REQUIRED);
  }

  if (!config.web3.currentProvider.isMetaMask) {
    throw (0, _errors.default)(_errors.WEB3_METAMASK_REQUIRED);
  }

  new config.web3.eth.Contract(contract.abi).
  deploy({
    data: contract.bytecode,
    arguments: args }).

  send({
    from,
    gas }).

  on('error', reject).
  on('receipt', receipt => resolve(receipt.contractAddress));
});exports.deployContract = deployContract;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9oZWxwZXJzL3dlYjMuanMiXSwibmFtZXMiOlsiZXN0aW1hdGVHYXMiLCJieXRlY29kZSIsImFyZ3MiLCJjb25maWciLCJ3ZWIzIiwiV0VCM19SRVFVSVJFRCIsImV0aCIsImRhdGEiLCJhcmd1bWVudHMiLCJkZXBsb3lDb250cmFjdCIsImNvbnRyYWN0IiwiZnJvbSIsImdhcyIsIlByb21pc2UiLCJyZXNvbHZlIiwicmVqZWN0IiwiY3VycmVudFByb3ZpZGVyIiwiaXNNZXRhTWFzayIsIldFQjNfTUVUQU1BU0tfUkVRVUlSRUQiLCJDb250cmFjdCIsImFiaSIsImRlcGxveSIsInNlbmQiLCJvbiIsInJlY2VpcHQiLCJjb250cmFjdEFkZHJlc3MiXSwibWFwcGluZ3MiOiJBQUFBOzs7Ozs7OztBQVFBLGE7O0FBRUEsMkQ7Ozs7O0FBS0E7Ozs7Ozs7QUFPTyxNQUFNQSxjQUFjLE9BQU9DLFFBQVAsRUFBaUJDLElBQWpCLEVBQXVCQyxTQUFTLEVBQWhDLEtBQXVDOztBQUU5RCxNQUFJLENBQUNBLE9BQU9DLElBQVosRUFBa0I7QUFDZCxVQUFNLHFCQUFTQyxxQkFBVCxDQUFOO0FBQ0g7O0FBRUQsU0FBTyxNQUFNRixPQUFPQyxJQUFQLENBQVlFLEdBQVosQ0FBZ0JOLFdBQWhCLENBQTRCO0FBQ3JDTyxVQUFNTixRQUQrQjtBQUVyQ08sZUFBV04sSUFGMEIsRUFBNUIsQ0FBYjs7QUFJSCxDQVZNOztBQVlQOzs7Ozs7O0FBT08sTUFBTU8saUJBQWlCLENBQUNDLFFBQUQsRUFBVyxFQUFFUixJQUFGLEVBQVFTLElBQVIsRUFBY0MsR0FBZCxFQUFYLEVBQWdDVCxTQUFTLEVBQXpDLEtBQWdELElBQUlVLE9BQUosQ0FBWSxDQUFDQyxPQUFELEVBQVVDLE1BQVYsS0FBcUI7O0FBRTNHLE1BQUksQ0FBQ1osT0FBT0MsSUFBWixFQUFrQjtBQUNkLFVBQU0scUJBQVNDLHFCQUFULENBQU47QUFDSDs7QUFFRCxNQUFJLENBQUNGLE9BQU9DLElBQVAsQ0FBWVksZUFBWixDQUE0QkMsVUFBakMsRUFBNkM7QUFDekMsVUFBTSxxQkFBU0MsOEJBQVQsQ0FBTjtBQUNIOztBQUVELE1BQUlmLE9BQU9DLElBQVAsQ0FBWUUsR0FBWixDQUFnQmEsUUFBcEIsQ0FBNkJULFNBQVNVLEdBQXRDO0FBQ0tDLFFBREwsQ0FDWTtBQUNKZCxVQUFNRyxTQUFTVCxRQURYO0FBRUpPLGVBQVdOLElBRlAsRUFEWjs7QUFLS29CLE1BTEwsQ0FLVTtBQUNGWCxRQURFO0FBRUZDLE9BRkUsRUFMVjs7QUFTS1csSUFUTCxDQVNRLE9BVFIsRUFTaUJSLE1BVGpCO0FBVUtRLElBVkwsQ0FVUSxTQVZSLEVBVW1CQyxXQUFXVixRQUFRVSxRQUFRQyxlQUFoQixDQVY5QjtBQVdILENBckI2RSxDQUF2RSxDIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBXZWIzIGhlbHBlcnNcbiAqIFRoaXMgZmlsZSBpdCBpcyBhIHBhcnQgb2YgdGhlIFBhbmRvcmEgUHlycmhhIEphdmFzY3JpcHQgbGlicmFyeVxuICogXG4gKiBAZmlsZSBlcnJvcnMuanNcbiAqIEBhdXRob3IgS29zdGlhbnR5biBTbXlybm92IDxrb3N0eXNoQGdtYWlsLmNvbT5cbiAqIEBkYXRlIDIwMThcbiAqL1xuJ3VzZSBzdHJpY3QnO1xuXG5pbXBvcnQgcGpzRXJyb3IsIHtcbiAgICBXRUIzX1JFUVVJUkVELFxuICAgIFdFQjNfTUVUQU1BU0tfUkVRVUlSRURcbn0gZnJvbSAnLi9lcnJvcnMnO1xuXG4vKipcbiAqIEVzdGltYXRlIHJlcXVpcmVkIGdhcyBhbW91bnRcbiAqIFxuICogQHBhcmFtIHtTdHJpbmd9IGJ5dGVjb2RlIENvbnRyYWN0IGJ5dGVjb2RlXG4gKiBAcGFyYW0ge0FycmF5fSBhcmdzIENvbnRyYWN0IGFyZ3VtZW50c1xuICogQHJldHVybnMge051bWJlcn0gaGV4XG4gKi9cbmV4cG9ydCBjb25zdCBlc3RpbWF0ZUdhcyA9IGFzeW5jIChieXRlY29kZSwgYXJncywgY29uZmlnID0ge30pID0+IHtcblxuICAgIGlmICghY29uZmlnLndlYjMpIHtcbiAgICAgICAgdGhyb3cgcGpzRXJyb3IoV0VCM19SRVFVSVJFRCk7XG4gICAgfVxuXG4gICAgcmV0dXJuIGF3YWl0IGNvbmZpZy53ZWIzLmV0aC5lc3RpbWF0ZUdhcyh7XG4gICAgICAgIGRhdGE6IGJ5dGVjb2RlLFxuICAgICAgICBhcmd1bWVudHM6IGFyZ3NcbiAgICB9KTtcbn07XG5cbi8qKlxuICogRGVwbG95IGNvbnRyYWN0XG4gKiBcbiAqIEBwYXJhbSB7T2JqZWN0fSBjb250cmFjdCBDb250cmFjdCBqc29uXG4gKiBAcGFyYW0ge09iamVjdH0gb3B0aW9ucyB7IGFyZ3MsIGZyb20sIGdhcyB9IFxuICogQHJldHVybnMge1Byb21pc2V9IFByb21pc2Ugb2JqZWN0IHJlc29sdmVkIHRvIGNvbnRyYWN0IGFkZHJlc3NcbiAqL1xuZXhwb3J0IGNvbnN0IGRlcGxveUNvbnRyYWN0ID0gKGNvbnRyYWN0LCB7IGFyZ3MsIGZyb20sIGdhcyB9LCBjb25maWcgPSB7fSkgPT4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuICAgIFxuICAgIGlmICghY29uZmlnLndlYjMpIHtcbiAgICAgICAgdGhyb3cgcGpzRXJyb3IoV0VCM19SRVFVSVJFRCk7XG4gICAgfVxuXG4gICAgaWYgKCFjb25maWcud2ViMy5jdXJyZW50UHJvdmlkZXIuaXNNZXRhTWFzaykge1xuICAgICAgICB0aHJvdyBwanNFcnJvcihXRUIzX01FVEFNQVNLX1JFUVVJUkVEKTtcbiAgICB9XG5cbiAgICBuZXcgY29uZmlnLndlYjMuZXRoLkNvbnRyYWN0KGNvbnRyYWN0LmFiaSlcbiAgICAgICAgLmRlcGxveSh7XG4gICAgICAgICAgICBkYXRhOiBjb250cmFjdC5ieXRlY29kZSxcbiAgICAgICAgICAgIGFyZ3VtZW50czogYXJnc1xuICAgICAgICB9KVxuICAgICAgICAuc2VuZCh7XG4gICAgICAgICAgICBmcm9tLFxuICAgICAgICAgICAgZ2FzXG4gICAgICAgIH0pXG4gICAgICAgIC5vbignZXJyb3InLCByZWplY3QpXG4gICAgICAgIC5vbigncmVjZWlwdCcsIHJlY2VpcHQgPT4gcmVzb2x2ZShyZWNlaXB0LmNvbnRyYWN0QWRkcmVzcykpO1xufSk7XG4iXX0=