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

function _instanceof(left, right) { if (right != null && typeof Symbol !== "undefined" && right[Symbol.hasInstance]) { return right[Symbol.hasInstance](left); } else { return left instanceof right; } }

function _classCallCheck(instance, Constructor) { if (!_instanceof(instance, Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

/** Pjs class */
var Pjs =
/*#__PURE__*/
function () {
  _createClass(Pjs, [{
    key: "_web3",
    // web3 setter
    set: function set(value) {
      if (!value.currentProvider) {
        throw (0, _errors.default)(_errors.WEB3_NOT_CONNECTED);
      }

      this.config.web3 = value;
    } // ipfs setter

  }, {
    key: "_ipfs",
    set: function set(value) {
      // @todo Add ipfs connection validation
      this.config.ipfs = value;
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

  }], [{
    key: "Web3",
    // Native Web3 object
    get: function get() {
      return _web.default;
    } // Native ipfsAPI object

  }, {
    key: "ipfsAPI",
    get: function get() {
      return _ipfsApi.default;
    }
  }]);

  function Pjs() {
    var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

    _classCallCheck(this, Pjs);

    this.version = _package.default.version;
    this.config = {};

    if (options.eth) {
      this.config.contracts = options.contracts || {}; // @todo Validate minimum "required" contracts set 

      this.config.addresses = options.addresses || {}; // @todo Validate addresses "required" option

      if (window && window.web3 && window.web3.currentProvider && window.web3.currentProvider.isMetaMask) {
        this._web3 = new Pjs.Web3(window.web3.currentProvider);
      } else {
        this._web3 = new Pjs.Web3("".concat(options.eth.protocol || 'http', "://").concat(options.eth.Host || 'localhost', ":").concat(options.eth.port || ''));
      }

      this._addMembers('kernels', kernels);

      this._addMembers('datasets', datasets);

      this._addMembers('jobs', jobs);

      this._addMembers('workers', workers);
    }

    if (options.ipfs) {
      this._ipfs = Pjs.ipfsAPI(options.ipfs.host, options.ipfs.port, {
        protocol: options.ipfs.protocol
      });

      this._addMembers('ipfs', ipfs);
    }

    this._addApiMembers();
  } // direct apis references


  _createClass(Pjs, [{
    key: "_addApiMembers",
    value: function _addApiMembers() {
      Object.defineProperty(this, 'api', {
        value: {},
        writable: false,
        enumerable: false,
        configurable: false
      });

      if (this.config.web3) {
        var web3 = new Proxy(this.config.web3, {
          get: function get(target, property, receiver) {
            return Reflect.get(target, property, receiver);
          }
        });
        Object.defineProperty(this.api, 'web3', {
          value: web3,
          writable: false,
          enumerable: false,
          configurable: false
        });
      }

      if (this.config.ipfs) {
        var _ipfs = new Proxy(this.config.ipfs, {
          get: function get(target, property, receiver) {
            return Reflect.get(target, property, receiver);
          }
        });

        Object.defineProperty(this.api, 'ipfs', {
          value: _ipfs,
          writable: false,
          enumerable: false,
          configurable: false
        });
      }
    } // Populate library methods

  }, {
    key: "_addMembers",
    value: function _addMembers(subject, members) {
      var self = this;
      Object.defineProperty(self, subject, {
        value: {},
        writable: false,
        enumerable: true,
        configurable: false
      });

      for (var key in members) {
        var member = void 0;

        if (typeof members[key] === 'function') {
          member = new Proxy(members[key], {
            apply: function apply(target, that, args) {
              // add config object to every methods calls
              args.push(self.config);
              return Reflect.apply(target, self, args);
            }
          });
        } else if (key) {
          member = new Proxy(members[key], {
            get: function get(target, property, receiver) {
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
  }]);

  return Pjs;
}();

module.exports = Pjs;