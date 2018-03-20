/**
 * Errors definition and helpers
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
exports.default = exports.WEB3_METAMASK_REQUIRED = exports.IPFS_NOT_CONNECTED = exports.IPFS_REQUIRED = exports.ADDRESS_REQUIRED = exports.CONTRACT_REQUIRED = exports.WEB3_NOT_CONNECTED = exports.WEB3_REQUIRED = void 0;
var WEB3_REQUIRED = 'WEB3_REQUIRED';
exports.WEB3_REQUIRED = WEB3_REQUIRED;
var WEB3_NOT_CONNECTED = 'WEB3_NOT_CONNECTED';
exports.WEB3_NOT_CONNECTED = WEB3_NOT_CONNECTED;
var CONTRACT_REQUIRED = 'CONTRACT_REQUIRED';
exports.CONTRACT_REQUIRED = CONTRACT_REQUIRED;
var ADDRESS_REQUIRED = 'ADDRESS_REQUIRED';
exports.ADDRESS_REQUIRED = ADDRESS_REQUIRED;
var IPFS_REQUIRED = 'IPFS_REQUIRED';
exports.IPFS_REQUIRED = IPFS_REQUIRED;
var IPFS_NOT_CONNECTED = 'IPFS_NOT_CONNECTED';
exports.IPFS_NOT_CONNECTED = IPFS_NOT_CONNECTED;
var WEB3_METAMASK_REQUIRED = 'WEB3_METAMASK_REQUIRED';
exports.WEB3_METAMASK_REQUIRED = WEB3_METAMASK_REQUIRED;

var _default = function _default(code) {
  var message = 'Unknown error';

  switch (code) {
    case WEB3_REQUIRED:
      message = 'Web3 API required';
      break;

    case WEB3_NOT_CONNECTED:
      message = 'Web3 not connected to provider';
      break;

    case WEB3_METAMASK_REQUIRED:
      message = 'MetaMask is required to perform this operation';
      break;

    case CONTRACT_REQUIRED:
      message = "Contract \"".concat(arguments.length <= 1 ? undefined : arguments[1], "\" is required");
      break;

    case ADDRESS_REQUIRED:
      message = "Address of \"".concat(arguments.length <= 1 ? undefined : arguments[1], "\" contract is required");
      break;

    case IPFS_REQUIRED:
      message = 'IPFS API required';
      break;

    case IPFS_NOT_CONNECTED:
      message = 'No connection to IPFS server';
  }

  var err = new Error(message);
  err.code = code || 'UNKNOWN';
  return err;
};

exports.default = _default;