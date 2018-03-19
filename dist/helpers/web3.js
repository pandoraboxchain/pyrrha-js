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

const deployContract = (web3, contract, {
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