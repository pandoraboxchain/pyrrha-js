/**
 * Pyrrha Js
 * Pandora Pyrrha Javascript library
 * 
 * @file index.js
 * @author Kostiantyn Smyrnov <kostysh@gmail.com>
 * @date 2018
 */
'use strict';

var _web = _interopRequireDefault(require("web3"));

var _ipfsApi = _interopRequireDefault(require("ipfs-api"));

var _package = _interopRequireDefault(require("../package.json"));

var _errors = _interopRequireWildcard(require("./helpers/errors"));

var kernels = _interopRequireWildcard(require("./kernels"));

var datasets = _interopRequireWildcard(require("./datasets"));

var jobs = _interopRequireWildcard(require("./jobs"));

var workers = _interopRequireWildcard(require("./workers"));

var ipfs = _interopRequireWildcard(require("./ipfs"));

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/** Pjs class */
class Pjs {
  // Native Web3 object
  static get Web3() {
    return _web.default;
  } // Native ipfsAPI object


  static get ipfsAPI() {
    return _ipfsApi.default;
  } // web3 setter


  set _web3(value) {
    if (!value.currentProvider) {
      throw (0, _errors.default)(_errors.WEB3_NOT_CONNECTED);
    }

    return value;
  } // ipfs setter


  set _ipfs(value) {
    // @todo Add ipfs connection validation
    return value;
  } // web3 getter


  get web3() {
    if (!this._web3) {
      throw (0, _errors.default)(_errors.WEB3_REQUIRED);
    }

    return this._web3;
  }
  /** Options example
  
  {
      eth: {
          protocol: 'http',
          host: 'localhost',
          port: ''
      },
      ipfs: {
          protocol: 'http',
          host: 'localhost',
          port: 5001
      },
      contracts: {
          Kernel,  // contract json
          Dataset  // contract json
      },
      addresses: {
          pandora: '0x58e66b79928cfb362b53c185a6a1fded882bb07d',
          market: '0x6142029abb21ef2e0bffde8d43f15c64f3750fe6'
      }
  }
   
  */

  /**
   * Creates an instance of Pjs.
   * @param {Object} options
   * @memberof Pjs
   */


  constructor(options = {}) {
    this.version = _package.default.version;

    if (options.eth) {
      this._contracts = options.contracts || {}; // @todo Validate minimum "reqiored" contracts set 

      this._addresses = options.addresses || {}; // @todo Validate addresses "required" option

      this._web3 = this._connectWeb3Provider(options);

      this._addMembers('kernels', kernels);

      this._addMembers('datasets', datasets);

      this._addMembers('jobs', jobs);

      this._addMembers('workers', workers);
    }

    if (options.ipfs) {
      this._ipfs = this._connectIpfs(options);

      this._addMembers('ipfs', ipfs);
    }
  }
  /**
   * Web3 connection helper
   * 
   * @param {Object} config
   * @returns {Web3} Web3 instance
   * @memberof Pjs
   */


  _connectWeb3Provider(options) {
    if (window && window.web3 && window.web3.currentProvider && window.web3.currentProvider.isMetaMask) {
      this._web3 = new Pjs.Web3(window.web3.currentProvider);
    } else {
      this._web3 = new Pjs.Web3(`${options.eth.protocol || 'http'}://${options.eth.Host || 'localhost'}:${options.eth.port || ''}`);
    }

    return this._web3;
  }
  /**
   * IPFS connection helper
   * 
   * @param {Object} config
   * @returns {ipfsAPI} ipfsAPI instance
   * @memberof Pjs
   */


  _connectIpfs(options) {
    this.ipfs = Pjs.ipfsAPI(options.ipfs.host, options.ipfs.port, {
      protocol: options.ipfs.protocol
    });
    return this._ipfs;
  } // Populate library methods


  _addMembers(subject, members) {
    let self = this;
    Object.defineProperty(self, subject, {
      value: {},
      writable: false,
      enumerable: true,
      configurable: false
    });

    for (let key in members) {
      let member;

      if (typeof members[key] === 'function') {
        member = new Proxy(members[key], {
          apply: function (target, that, args) {
            // add config object to every methods calls
            args.push({
              web3: self._web3,
              ipfs: self._ipfs,
              contracts: self._contracts,
              addresses: self._addresses
            });
            return Reflect.apply(target, self, args);
          }
        });
      } else if (key) {
        member = new Proxy(members[key], {
          get: function (target, property, receiver) {
            return Reflect.get(target, property, receiver);
          }
        });
      }

      Object.defineProperty(this[subject], key, {
        value: member,
        writable: false,
        enumerable: false,
        configurable: false
      });
    }
  }

}

module.exports = Pjs;