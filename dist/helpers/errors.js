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
exports.default = exports.ADDRESS_REQUIRED = exports.CONTRACT_REQUIRED = exports.WEB3_NOT_CONNECTED = exports.WEB3_REQUIRED = void 0;
const WEB3_REQUIRED = 'WEB3_REQUIRED';
exports.WEB3_REQUIRED = WEB3_REQUIRED;
const WEB3_NOT_CONNECTED = 'WEB3_NOT_CONNECTED';
exports.WEB3_NOT_CONNECTED = WEB3_NOT_CONNECTED;
const CONTRACT_REQUIRED = 'CONTRACT_REQUIRED';
exports.CONTRACT_REQUIRED = CONTRACT_REQUIRED;
const ADDRESS_REQUIRED = 'ADDRESS_REQUIRED';
exports.ADDRESS_REQUIRED = ADDRESS_REQUIRED;

var _default = (code, ...args) => {
  let message = 'Unknown error';

  switch (code) {
    case WEB3_REQUIRED:
      message = 'Web3 required';
      break;

    case WEB3_NOT_CONNECTED:
      message = 'Web3 not connected to provider';
      break;

    case CONTRACT_REQUIRED:
      message = `Contract "${args[0]}" is required`;
      break;

    case ADDRESS_REQUIRED:
      message = `Address of "${args[0]}" contract is required`;
      break;
  }

  const err = new Error(message);
  err.code = code || 'UNKNOWN';
  return err;
};

exports.default = _default;