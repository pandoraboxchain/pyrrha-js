/**
 * This file is part of Pyrrha Js
 * Pandora Pyrrha Javascript library
 * 
 * @file base.js
 * @author Kostiantyn Smyrnov <kostysh@gmail.com>
 * @date 2018
 */
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.Base = exports.CONTRACT_REQUIRED = exports.WEB3_NOT_CONNECTED = exports.WEB3_REQUIRED = void 0;

var _package = _interopRequireDefault(require("../package.json"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const WEB3_REQUIRED = 'WEB3_REQUIRED';
exports.WEB3_REQUIRED = WEB3_REQUIRED;
const WEB3_NOT_CONNECTED = 'WEB3_NOT_CONNECTED';
exports.WEB3_NOT_CONNECTED = WEB3_NOT_CONNECTED;
const CONTRACT_REQUIRED = 'CONTRACT_REQUIRED';
/** Base class */

exports.CONTRACT_REQUIRED = CONTRACT_REQUIRED;

class Base {
  constructor() {
    this.version = _package.default.version;
  }

  static copyProperties(target = {}, source = {}, name) {
    const props = class Subject {};
    const ownPropertyNames = Object.getOwnPropertyNames(source);
    ownPropertyNames.filter(key => !/^(prototype|name|constructor)$/.test(key)).forEach(key => {
      const desc = Object.getOwnPropertyDescriptor(source, key);
      Object.defineProperty(props, key, desc);
      Object.defineProperty(props.prototype, key, desc);
    });
    Object.defineProperty(target, name, {
      get: function () {
        return new props(this);
      }
    });
  }

  static error(code, ...args) {
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
    }

    const err = new Error(message);
    err.code = code || 'UNKNOWN';
    return err;
  }

}

exports.Base = Base;

var _default = (...mixins) => {
  for (let i in mixins) {
    const mixin = mixins[i];
    Base.copyProperties(Base, mixin, mixin.name);
    Base.copyProperties(Base.prototype, mixin.prototype, mixin.name);
  }

  return Base;
};

exports.default = _default;