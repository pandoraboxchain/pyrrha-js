/**
 * Pyrrha Js
 * Pandora Pyrrha Javascript library
 * 
 * @file index.js
 * @author Kostiantyn Smyrnov <kostysh@gmail.com>
 * @date 2018
 */
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

require("core-js/modules/es6.reflect.apply");

require("core-js/modules/es6.reflect.get");

require("core-js/modules/es6.object.define-property");

var _web = _interopRequireDefault(require("web3"));

var _ipfsApi = _interopRequireDefault(require("ipfs-api"));

var _package = _interopRequireDefault(require("../package.json"));

var _errors = _interopRequireWildcard(require("./helpers/errors"));

var pandora = _interopRequireWildcard(require("./pandora"));

var kernels = _interopRequireWildcard(require("./kernels"));

var datasets = _interopRequireWildcard(require("./datasets"));

var jobs = _interopRequireWildcard(require("./jobs"));

var workers = _interopRequireWildcard(require("./workers"));

var ipfs = _interopRequireWildcard(require("./ipfs"));

var pan = _interopRequireWildcard(require("./pan"));

var economic = _interopRequireWildcard(require("./economic"));

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

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
      if (!value || !value.currentProvider) {
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
            provider: <external_provider>,
            // or
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
            Pandora: '0x58e66b79928cfb362b53c185a6a1fded882bb07d',
            PandoraMarket: '0x6142029abb21ef2e0bffde8d43f15c64f3750fe6'
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
    } // Library version

  }, {
    key: "version",
    get: function get() {
      return _package.default.version;
    }
  }]);

  function Pjs() {
    var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

    _classCallCheck(this, Pjs);

    // @todo Implement options object validation
    this.version = _package.default.version;
    this.config = {};
    this.isMetaMask = false;

    if (options.eth) {
      if (options.eth.provider) {
        this._web3 = new Pjs.Web3(options.eth.provider);

        if (options.eth.provider.isMetaMask) {
          this.isMetaMask = true;
        }
      } else {
        this._web3 = new Pjs.Web3(new Pjs.Web3.providers.HttpProvider("".concat(options.eth.protocol || 'http', "://").concat(options.eth.host || 'localhost', ":").concat(options.eth.port || '')));
      }

      this.config.contracts = options.contracts || {}; // @todo Validate minimum "required" contracts set 

      this.config.addresses = options.addresses || {}; // @todo Validate addresses "required" option

      this._addMembers('pandora', pandora);

      this._addMembers('kernels', kernels);

      this._addMembers('datasets', datasets);

      this._addMembers('jobs', jobs);

      this._addMembers('workers', workers);

      this._addMembers('pan', pan);

      this._addMembers('economic', economic);
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
      /* istanbul ignore next */

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

exports.default = Pjs;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9pbmRleC5qcyJdLCJuYW1lcyI6WyJQanMiLCJ2YWx1ZSIsImN1cnJlbnRQcm92aWRlciIsIldFQjNfTk9UX0NPTk5FQ1RFRCIsImNvbmZpZyIsIndlYjMiLCJpcGZzIiwiV2ViMyIsImlwZnNBUEkiLCJwanNQYWNrYWdlIiwidmVyc2lvbiIsIm9wdGlvbnMiLCJpc01ldGFNYXNrIiwiZXRoIiwicHJvdmlkZXIiLCJfd2ViMyIsInByb3ZpZGVycyIsIkh0dHBQcm92aWRlciIsInByb3RvY29sIiwiaG9zdCIsInBvcnQiLCJjb250cmFjdHMiLCJhZGRyZXNzZXMiLCJfYWRkTWVtYmVycyIsInBhbmRvcmEiLCJrZXJuZWxzIiwiZGF0YXNldHMiLCJqb2JzIiwid29ya2VycyIsInBhbiIsImVjb25vbWljIiwiX2lwZnMiLCJfYWRkQXBpTWVtYmVycyIsIk9iamVjdCIsImRlZmluZVByb3BlcnR5Iiwid3JpdGFibGUiLCJlbnVtZXJhYmxlIiwiY29uZmlndXJhYmxlIiwiUHJveHkiLCJnZXQiLCJ0YXJnZXQiLCJwcm9wZXJ0eSIsInJlY2VpdmVyIiwiUmVmbGVjdCIsImFwaSIsInN1YmplY3QiLCJtZW1iZXJzIiwic2VsZiIsImtleSIsIm1lbWJlciIsImFwcGx5IiwidGhhdCIsImFyZ3MiLCJwdXNoIl0sIm1hcHBpbmdzIjoiQUFBQTs7Ozs7Ozs7QUFTQTs7Ozs7Ozs7Ozs7OztBQUVBOztBQUNBOztBQUVBOztBQUNBOztBQUlBOztBQUNBOztBQUNBOztBQUNBOztBQUNBOztBQUNBOztBQUNBOztBQUNBOzs7Ozs7Ozs7Ozs7QUFFQTtJQUNxQkEsRzs7Ozs7QUFpQmpCO3NCQUNVQyxLLEVBQU87QUFFYixVQUFJLENBQUNBLEtBQUQsSUFBVSxDQUFDQSxLQUFLLENBQUNDLGVBQXJCLEVBQXNDO0FBQ2xDLGNBQU0scUJBQVNDLDBCQUFULENBQU47QUFDSDs7QUFFRCxXQUFLQyxNQUFMLENBQVlDLElBQVosR0FBbUJKLEtBQW5CO0FBQ0gsSyxDQUVEOzs7O3NCQUNVQSxLLEVBQU87QUFFYjtBQUNBLFdBQUtHLE1BQUwsQ0FBWUUsSUFBWixHQUFtQkwsS0FBbkI7QUFDSDtBQUVEOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUEwQkE7Ozs7Ozs7O0FBMURBO3dCQUNrQjtBQUNkLGFBQU9NLFlBQVA7QUFDSCxLLENBRUQ7Ozs7d0JBQ3FCO0FBQ2pCLGFBQU9DLGdCQUFQO0FBQ0gsSyxDQUVEOzs7O3dCQUNxQjtBQUNqQixhQUFPQyxpQkFBV0MsT0FBbEI7QUFDSDs7O0FBa0RELGlCQUEwQjtBQUFBLFFBQWRDLE9BQWMsdUVBQUosRUFBSTs7QUFBQTs7QUFDdEI7QUFDQSxTQUFLRCxPQUFMLEdBQWVELGlCQUFXQyxPQUExQjtBQUNBLFNBQUtOLE1BQUwsR0FBYyxFQUFkO0FBQ0EsU0FBS1EsVUFBTCxHQUFrQixLQUFsQjs7QUFFQSxRQUFJRCxPQUFPLENBQUNFLEdBQVosRUFBaUI7QUFFYixVQUFJRixPQUFPLENBQUNFLEdBQVIsQ0FBWUMsUUFBaEIsRUFBMEI7QUFFdEIsYUFBS0MsS0FBTCxHQUFhLElBQUlmLEdBQUcsQ0FBQ08sSUFBUixDQUFhSSxPQUFPLENBQUNFLEdBQVIsQ0FBWUMsUUFBekIsQ0FBYjs7QUFFQSxZQUFJSCxPQUFPLENBQUNFLEdBQVIsQ0FBWUMsUUFBWixDQUFxQkYsVUFBekIsRUFBcUM7QUFFakMsZUFBS0EsVUFBTCxHQUFrQixJQUFsQjtBQUNIO0FBQ0osT0FSRCxNQVFPO0FBRUgsYUFBS0csS0FBTCxHQUFhLElBQUlmLEdBQUcsQ0FBQ08sSUFBUixDQUFhLElBQUlQLEdBQUcsQ0FBQ08sSUFBSixDQUFTUyxTQUFULENBQW1CQyxZQUF2QixXQUF1Q04sT0FBTyxDQUFDRSxHQUFSLENBQVlLLFFBQVosSUFBd0IsTUFBL0QsZ0JBQTJFUCxPQUFPLENBQUNFLEdBQVIsQ0FBWU0sSUFBWixJQUFvQixXQUEvRixjQUE4R1IsT0FBTyxDQUFDRSxHQUFSLENBQVlPLElBQVosSUFBb0IsRUFBbEksRUFBYixDQUFiO0FBQ0g7O0FBRUQsV0FBS2hCLE1BQUwsQ0FBWWlCLFNBQVosR0FBd0JWLE9BQU8sQ0FBQ1UsU0FBUixJQUFxQixFQUE3QyxDQWZhLENBZW1DOztBQUNoRCxXQUFLakIsTUFBTCxDQUFZa0IsU0FBWixHQUF3QlgsT0FBTyxDQUFDVyxTQUFSLElBQXFCLEVBQTdDLENBaEJhLENBZ0JtQzs7QUFFaEQsV0FBS0MsV0FBTCxDQUFpQixTQUFqQixFQUE0QkMsT0FBNUI7O0FBQ0EsV0FBS0QsV0FBTCxDQUFpQixTQUFqQixFQUE0QkUsT0FBNUI7O0FBQ0EsV0FBS0YsV0FBTCxDQUFpQixVQUFqQixFQUE2QkcsUUFBN0I7O0FBQ0EsV0FBS0gsV0FBTCxDQUFpQixNQUFqQixFQUF5QkksSUFBekI7O0FBQ0EsV0FBS0osV0FBTCxDQUFpQixTQUFqQixFQUE0QkssT0FBNUI7O0FBQ0EsV0FBS0wsV0FBTCxDQUFpQixLQUFqQixFQUF3Qk0sR0FBeEI7O0FBQ0EsV0FBS04sV0FBTCxDQUFpQixVQUFqQixFQUE2Qk8sUUFBN0I7QUFDSDs7QUFFRCxRQUFJbkIsT0FBTyxDQUFDTCxJQUFaLEVBQWtCO0FBRWQsV0FBS3lCLEtBQUwsR0FBYS9CLEdBQUcsQ0FBQ1EsT0FBSixDQUNURyxPQUFPLENBQUNMLElBQVIsQ0FBYWEsSUFESixFQUVUUixPQUFPLENBQUNMLElBQVIsQ0FBYWMsSUFGSixFQUdUO0FBQ0lGLFFBQUFBLFFBQVEsRUFBRVAsT0FBTyxDQUFDTCxJQUFSLENBQWFZO0FBRDNCLE9BSFMsQ0FBYjs7QUFRQSxXQUFLSyxXQUFMLENBQWlCLE1BQWpCLEVBQXlCakIsSUFBekI7QUFDSDs7QUFFRCxTQUFLMEIsY0FBTDtBQUNILEcsQ0FFRDs7Ozs7cUNBQ2lCO0FBRWJDLE1BQUFBLE1BQU0sQ0FBQ0MsY0FBUCxDQUFzQixJQUF0QixFQUE0QixLQUE1QixFQUFtQztBQUMvQmpDLFFBQUFBLEtBQUssRUFBRSxFQUR3QjtBQUUvQmtDLFFBQUFBLFFBQVEsRUFBRSxLQUZxQjtBQUcvQkMsUUFBQUEsVUFBVSxFQUFFLEtBSG1CO0FBSS9CQyxRQUFBQSxZQUFZLEVBQUU7QUFKaUIsT0FBbkM7O0FBT0EsVUFBSSxLQUFLakMsTUFBTCxDQUFZQyxJQUFoQixFQUFzQjtBQUVsQixZQUFJQSxJQUFJLEdBQUcsSUFBSWlDLEtBQUosQ0FBVSxLQUFLbEMsTUFBTCxDQUFZQyxJQUF0QixFQUE0QjtBQUNuQ2tDLFVBQUFBLEdBQUcsRUFBRSxhQUFTQyxNQUFULEVBQWlCQyxRQUFqQixFQUEyQkMsUUFBM0IsRUFBcUM7QUFDdEMsbUJBQU9DLE9BQU8sQ0FBQ0osR0FBUixDQUFZQyxNQUFaLEVBQW9CQyxRQUFwQixFQUE4QkMsUUFBOUIsQ0FBUDtBQUNIO0FBSGtDLFNBQTVCLENBQVg7QUFNQVQsUUFBQUEsTUFBTSxDQUFDQyxjQUFQLENBQXNCLEtBQUtVLEdBQTNCLEVBQWdDLE1BQWhDLEVBQXdDO0FBQ3BDM0MsVUFBQUEsS0FBSyxFQUFFSSxJQUQ2QjtBQUVwQzhCLFVBQUFBLFFBQVEsRUFBRSxLQUYwQjtBQUdwQ0MsVUFBQUEsVUFBVSxFQUFFLEtBSHdCO0FBSXBDQyxVQUFBQSxZQUFZLEVBQUU7QUFKc0IsU0FBeEM7QUFNSDs7QUFFRCxVQUFJLEtBQUtqQyxNQUFMLENBQVlFLElBQWhCLEVBQXNCO0FBRWxCLFlBQUlBLEtBQUksR0FBRyxJQUFJZ0MsS0FBSixDQUFVLEtBQUtsQyxNQUFMLENBQVlFLElBQXRCLEVBQTRCO0FBQ25DaUMsVUFBQUEsR0FBRyxFQUFFLGFBQVNDLE1BQVQsRUFBaUJDLFFBQWpCLEVBQTJCQyxRQUEzQixFQUFxQztBQUN0QyxtQkFBT0MsT0FBTyxDQUFDSixHQUFSLENBQVlDLE1BQVosRUFBb0JDLFFBQXBCLEVBQThCQyxRQUE5QixDQUFQO0FBQ0g7QUFIa0MsU0FBNUIsQ0FBWDs7QUFNQVQsUUFBQUEsTUFBTSxDQUFDQyxjQUFQLENBQXNCLEtBQUtVLEdBQTNCLEVBQWdDLE1BQWhDLEVBQXdDO0FBQ3BDM0MsVUFBQUEsS0FBSyxFQUFFSyxLQUQ2QjtBQUVwQzZCLFVBQUFBLFFBQVEsRUFBRSxLQUYwQjtBQUdwQ0MsVUFBQUEsVUFBVSxFQUFFLEtBSHdCO0FBSXBDQyxVQUFBQSxZQUFZLEVBQUU7QUFKc0IsU0FBeEM7QUFNSDtBQUNKLEssQ0FFRDs7OztnQ0FDWVEsTyxFQUFTQyxPLEVBQVM7QUFDMUIsVUFBSUMsSUFBSSxHQUFHLElBQVg7QUFFQWQsTUFBQUEsTUFBTSxDQUFDQyxjQUFQLENBQXNCYSxJQUF0QixFQUE0QkYsT0FBNUIsRUFBcUM7QUFDakM1QyxRQUFBQSxLQUFLLEVBQUUsRUFEMEI7QUFFakNrQyxRQUFBQSxRQUFRLEVBQUUsS0FGdUI7QUFHakNDLFFBQUFBLFVBQVUsRUFBRSxJQUhxQjtBQUlqQ0MsUUFBQUEsWUFBWSxFQUFFO0FBSm1CLE9BQXJDO0FBT0E7O0FBQ0EsV0FBSyxJQUFJVyxHQUFULElBQWdCRixPQUFoQixFQUF5QjtBQUNyQixZQUFJRyxNQUFNLFNBQVY7O0FBRUEsWUFBSSxPQUFPSCxPQUFPLENBQUNFLEdBQUQsQ0FBZCxLQUF3QixVQUE1QixFQUF3QztBQUVwQ0MsVUFBQUEsTUFBTSxHQUFHLElBQUlYLEtBQUosQ0FBVVEsT0FBTyxDQUFDRSxHQUFELENBQWpCLEVBQXdCO0FBQzdCRSxZQUFBQSxLQUFLLEVBQUUsZUFBU1YsTUFBVCxFQUFpQlcsSUFBakIsRUFBdUJDLElBQXZCLEVBQTZCO0FBQ2hDO0FBQ0FBLGNBQUFBLElBQUksQ0FBQ0MsSUFBTCxDQUFVTixJQUFJLENBQUMzQyxNQUFmO0FBRUEscUJBQU91QyxPQUFPLENBQUNPLEtBQVIsQ0FBY1YsTUFBZCxFQUFzQk8sSUFBdEIsRUFBNEJLLElBQTVCLENBQVA7QUFDSDtBQU40QixXQUF4QixDQUFUO0FBUUgsU0FWRCxNQVVPLElBQUlKLEdBQUosRUFBUztBQUVaQyxVQUFBQSxNQUFNLEdBQUcsSUFBSVgsS0FBSixDQUFVUSxPQUFPLENBQUNFLEdBQUQsQ0FBakIsRUFBd0I7QUFDN0JULFlBQUFBLEdBQUcsRUFBRSxhQUFTQyxNQUFULEVBQWlCQyxRQUFqQixFQUEyQkMsUUFBM0IsRUFBcUM7QUFDdEMscUJBQU9DLE9BQU8sQ0FBQ0osR0FBUixDQUFZQyxNQUFaLEVBQW9CQyxRQUFwQixFQUE4QkMsUUFBOUIsQ0FBUDtBQUNIO0FBSDRCLFdBQXhCLENBQVQ7QUFLSDs7QUFFRFQsUUFBQUEsTUFBTSxDQUFDQyxjQUFQLENBQXNCLEtBQUtXLE9BQUwsQ0FBdEIsRUFBcUNHLEdBQXJDLEVBQTBDO0FBQ3RDL0MsVUFBQUEsS0FBSyxFQUFFZ0QsTUFEK0I7QUFFdENkLFVBQUFBLFFBQVEsRUFBRSxLQUY0QjtBQUd0Q0MsVUFBQUEsVUFBVSxFQUFFLEtBSDBCO0FBSXRDQyxVQUFBQSxZQUFZLEVBQUU7QUFKd0IsU0FBMUM7QUFNSDtBQUNKIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBQeXJyaGEgSnNcbiAqIFBhbmRvcmEgUHlycmhhIEphdmFzY3JpcHQgbGlicmFyeVxuICogXG4gKiBAZmlsZSBpbmRleC5qc1xuICogQGF1dGhvciBLb3N0aWFudHluIFNteXJub3YgPGtvc3R5c2hAZ21haWwuY29tPlxuICogQGRhdGUgMjAxOFxuICovXG5cbid1c2Ugc3RyaWN0JztcblxuaW1wb3J0IFdlYjMgZnJvbSAnd2ViMyc7XG5pbXBvcnQgaXBmc0FQSSBmcm9tICdpcGZzLWFwaSc7XG5cbmltcG9ydCBwanNQYWNrYWdlIGZyb20gJy4uL3BhY2thZ2UuanNvbic7XG5pbXBvcnQgcGpzRXJyb3IsIHtcbiAgICBXRUIzX05PVF9DT05ORUNURURcbn0gZnJvbSAnLi9oZWxwZXJzL2Vycm9ycyc7XG5cbmltcG9ydCAqIGFzIHBhbmRvcmEgZnJvbSAnLi9wYW5kb3JhJztcbmltcG9ydCAqIGFzIGtlcm5lbHMgZnJvbSAnLi9rZXJuZWxzJztcbmltcG9ydCAqIGFzIGRhdGFzZXRzIGZyb20gJy4vZGF0YXNldHMnO1xuaW1wb3J0ICogYXMgam9icyBmcm9tICcuL2pvYnMnO1xuaW1wb3J0ICogYXMgd29ya2VycyBmcm9tICcuL3dvcmtlcnMnO1xuaW1wb3J0ICogYXMgaXBmcyBmcm9tICcuL2lwZnMnO1xuaW1wb3J0ICogYXMgcGFuIGZyb20gJy4vcGFuJztcbmltcG9ydCAqIGFzIGVjb25vbWljIGZyb20gJy4vZWNvbm9taWMnO1xuXG4vKiogUGpzIGNsYXNzICovXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBQanMge1xuXG4gICAgLy8gTmF0aXZlIFdlYjMgb2JqZWN0XG4gICAgc3RhdGljIGdldCBXZWIzKCkge1xuICAgICAgICByZXR1cm4gV2ViMztcbiAgICB9XG5cbiAgICAvLyBOYXRpdmUgaXBmc0FQSSBvYmplY3RcbiAgICBzdGF0aWMgZ2V0IGlwZnNBUEkoKSB7XG4gICAgICAgIHJldHVybiBpcGZzQVBJO1xuICAgIH1cblxuICAgIC8vIExpYnJhcnkgdmVyc2lvblxuICAgIHN0YXRpYyBnZXQgdmVyc2lvbigpIHtcbiAgICAgICAgcmV0dXJuIHBqc1BhY2thZ2UudmVyc2lvbjtcbiAgICB9XG5cbiAgICAvLyB3ZWIzIHNldHRlclxuICAgIHNldCBfd2ViMyh2YWx1ZSkge1xuXG4gICAgICAgIGlmICghdmFsdWUgfHwgIXZhbHVlLmN1cnJlbnRQcm92aWRlcikge1xuICAgICAgICAgICAgdGhyb3cgcGpzRXJyb3IoV0VCM19OT1RfQ09OTkVDVEVEKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMuY29uZmlnLndlYjMgPSB2YWx1ZTtcbiAgICB9XG5cbiAgICAvLyBpcGZzIHNldHRlclxuICAgIHNldCBfaXBmcyh2YWx1ZSkge1xuXG4gICAgICAgIC8vIEB0b2RvIEFkZCBpcGZzIGNvbm5lY3Rpb24gdmFsaWRhdGlvblxuICAgICAgICB0aGlzLmNvbmZpZy5pcGZzID0gdmFsdWU7XG4gICAgfVxuXG4gICAgLyoqIE9wdGlvbnMgZXhhbXBsZVxuICAgIFxuICAgIHtcbiAgICAgICAgZXRoOiB7XG4gICAgICAgICAgICBwcm92aWRlcjogPGV4dGVybmFsX3Byb3ZpZGVyPixcbiAgICAgICAgICAgIC8vIG9yXG4gICAgICAgICAgICBwcm90b2NvbDogJ2h0dHAnLFxuICAgICAgICAgICAgaG9zdDogJ2xvY2FsaG9zdCcsXG4gICAgICAgICAgICBwb3J0OiAnJ1xuICAgICAgICB9LFxuICAgICAgICBpcGZzOiB7XG4gICAgICAgICAgICBwcm90b2NvbDogJ2h0dHAnLFxuICAgICAgICAgICAgaG9zdDogJ2xvY2FsaG9zdCcsXG4gICAgICAgICAgICBwb3J0OiA1MDAxXG4gICAgICAgIH0sXG4gICAgICAgIGNvbnRyYWN0czoge1xuICAgICAgICAgICAgS2VybmVsLCAgLy8gY29udHJhY3QganNvblxuICAgICAgICAgICAgRGF0YXNldCAgLy8gY29udHJhY3QganNvblxuICAgICAgICB9LFxuICAgICAgICBhZGRyZXNzZXM6IHtcbiAgICAgICAgICAgIFBhbmRvcmE6ICcweDU4ZTY2Yjc5OTI4Y2ZiMzYyYjUzYzE4NWE2YTFmZGVkODgyYmIwN2QnLFxuICAgICAgICAgICAgUGFuZG9yYU1hcmtldDogJzB4NjE0MjAyOWFiYjIxZWYyZTBiZmZkZThkNDNmMTVjNjRmMzc1MGZlNidcbiAgICAgICAgfVxuICAgIH1cbiAgICAgXG4gICAgKi9cbiAgICAvKipcbiAgICAgKiBDcmVhdGVzIGFuIGluc3RhbmNlIG9mIFBqcy5cbiAgICAgKiBAcGFyYW0ge09iamVjdH0gb3B0aW9uc1xuICAgICAqIEBtZW1iZXJvZiBQanNcbiAgICAgKi9cbiAgICBjb25zdHJ1Y3RvcihvcHRpb25zID0ge30pIHtcbiAgICAgICAgLy8gQHRvZG8gSW1wbGVtZW50IG9wdGlvbnMgb2JqZWN0IHZhbGlkYXRpb25cbiAgICAgICAgdGhpcy52ZXJzaW9uID0gcGpzUGFja2FnZS52ZXJzaW9uO1xuICAgICAgICB0aGlzLmNvbmZpZyA9IHt9O1xuICAgICAgICB0aGlzLmlzTWV0YU1hc2sgPSBmYWxzZTtcblxuICAgICAgICBpZiAob3B0aW9ucy5ldGgpIHtcblxuICAgICAgICAgICAgaWYgKG9wdGlvbnMuZXRoLnByb3ZpZGVyKSB7XG5cbiAgICAgICAgICAgICAgICB0aGlzLl93ZWIzID0gbmV3IFBqcy5XZWIzKG9wdGlvbnMuZXRoLnByb3ZpZGVyKTtcblxuICAgICAgICAgICAgICAgIGlmIChvcHRpb25zLmV0aC5wcm92aWRlci5pc01ldGFNYXNrKSB7XG4gICAgICAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgICAgICAgICB0aGlzLmlzTWV0YU1hc2sgPSB0cnVlO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgXG4gICAgICAgICAgICAgICAgdGhpcy5fd2ViMyA9IG5ldyBQanMuV2ViMyhuZXcgUGpzLldlYjMucHJvdmlkZXJzLkh0dHBQcm92aWRlcihgJHtvcHRpb25zLmV0aC5wcm90b2NvbCB8fCAnaHR0cCd9Oi8vJHtvcHRpb25zLmV0aC5ob3N0IHx8ICdsb2NhbGhvc3QnfToke29wdGlvbnMuZXRoLnBvcnQgfHwgJyd9YCkpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICB0aGlzLmNvbmZpZy5jb250cmFjdHMgPSBvcHRpb25zLmNvbnRyYWN0cyB8fCB7fTsvLyBAdG9kbyBWYWxpZGF0ZSBtaW5pbXVtIFwicmVxdWlyZWRcIiBjb250cmFjdHMgc2V0IFxuICAgICAgICAgICAgdGhpcy5jb25maWcuYWRkcmVzc2VzID0gb3B0aW9ucy5hZGRyZXNzZXMgfHwge307Ly8gQHRvZG8gVmFsaWRhdGUgYWRkcmVzc2VzIFwicmVxdWlyZWRcIiBvcHRpb25cblxuICAgICAgICAgICAgdGhpcy5fYWRkTWVtYmVycygncGFuZG9yYScsIHBhbmRvcmEpO1xuICAgICAgICAgICAgdGhpcy5fYWRkTWVtYmVycygna2VybmVscycsIGtlcm5lbHMpO1xuICAgICAgICAgICAgdGhpcy5fYWRkTWVtYmVycygnZGF0YXNldHMnLCBkYXRhc2V0cyk7XG4gICAgICAgICAgICB0aGlzLl9hZGRNZW1iZXJzKCdqb2JzJywgam9icyk7XG4gICAgICAgICAgICB0aGlzLl9hZGRNZW1iZXJzKCd3b3JrZXJzJywgd29ya2Vycyk7XG4gICAgICAgICAgICB0aGlzLl9hZGRNZW1iZXJzKCdwYW4nLCBwYW4pO1xuICAgICAgICAgICAgdGhpcy5fYWRkTWVtYmVycygnZWNvbm9taWMnLCBlY29ub21pYyk7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAob3B0aW9ucy5pcGZzKSB7XG5cbiAgICAgICAgICAgIHRoaXMuX2lwZnMgPSBQanMuaXBmc0FQSShcbiAgICAgICAgICAgICAgICBvcHRpb25zLmlwZnMuaG9zdCwgXG4gICAgICAgICAgICAgICAgb3B0aW9ucy5pcGZzLnBvcnQsIFxuICAgICAgICAgICAgICAgIHsgXG4gICAgICAgICAgICAgICAgICAgIHByb3RvY29sOiBvcHRpb25zLmlwZnMucHJvdG9jb2xcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICApO1xuXG4gICAgICAgICAgICB0aGlzLl9hZGRNZW1iZXJzKCdpcGZzJywgaXBmcyk7XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLl9hZGRBcGlNZW1iZXJzKCk7XG4gICAgfVxuXG4gICAgLy8gZGlyZWN0IGFwaXMgcmVmZXJlbmNlc1xuICAgIF9hZGRBcGlNZW1iZXJzKCkge1xuXG4gICAgICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eSh0aGlzLCAnYXBpJywge1xuICAgICAgICAgICAgdmFsdWU6IHt9LFxuICAgICAgICAgICAgd3JpdGFibGU6IGZhbHNlLFxuICAgICAgICAgICAgZW51bWVyYWJsZTogZmFsc2UsXG4gICAgICAgICAgICBjb25maWd1cmFibGU6IGZhbHNlXG4gICAgICAgIH0pO1xuXG4gICAgICAgIGlmICh0aGlzLmNvbmZpZy53ZWIzKSB7XG5cbiAgICAgICAgICAgIGxldCB3ZWIzID0gbmV3IFByb3h5KHRoaXMuY29uZmlnLndlYjMsIHtcbiAgICAgICAgICAgICAgICBnZXQ6IGZ1bmN0aW9uKHRhcmdldCwgcHJvcGVydHksIHJlY2VpdmVyKSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBSZWZsZWN0LmdldCh0YXJnZXQsIHByb3BlcnR5LCByZWNlaXZlcik7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eSh0aGlzLmFwaSwgJ3dlYjMnLCB7XG4gICAgICAgICAgICAgICAgdmFsdWU6IHdlYjMsXG4gICAgICAgICAgICAgICAgd3JpdGFibGU6IGZhbHNlLFxuICAgICAgICAgICAgICAgIGVudW1lcmFibGU6IGZhbHNlLFxuICAgICAgICAgICAgICAgIGNvbmZpZ3VyYWJsZTogZmFsc2VcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHRoaXMuY29uZmlnLmlwZnMpIHtcblxuICAgICAgICAgICAgbGV0IGlwZnMgPSBuZXcgUHJveHkodGhpcy5jb25maWcuaXBmcywge1xuICAgICAgICAgICAgICAgIGdldDogZnVuY3Rpb24odGFyZ2V0LCBwcm9wZXJ0eSwgcmVjZWl2ZXIpIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIFJlZmxlY3QuZ2V0KHRhcmdldCwgcHJvcGVydHksIHJlY2VpdmVyKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KHRoaXMuYXBpLCAnaXBmcycsIHtcbiAgICAgICAgICAgICAgICB2YWx1ZTogaXBmcyxcbiAgICAgICAgICAgICAgICB3cml0YWJsZTogZmFsc2UsXG4gICAgICAgICAgICAgICAgZW51bWVyYWJsZTogZmFsc2UsXG4gICAgICAgICAgICAgICAgY29uZmlndXJhYmxlOiBmYWxzZVxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICAvLyBQb3B1bGF0ZSBsaWJyYXJ5IG1ldGhvZHNcbiAgICBfYWRkTWVtYmVycyhzdWJqZWN0LCBtZW1iZXJzKSB7XG4gICAgICAgIGxldCBzZWxmID0gdGhpcztcblxuICAgICAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkoc2VsZiwgc3ViamVjdCwge1xuICAgICAgICAgICAgdmFsdWU6IHt9LFxuICAgICAgICAgICAgd3JpdGFibGU6IGZhbHNlLFxuICAgICAgICAgICAgZW51bWVyYWJsZTogdHJ1ZSxcbiAgICAgICAgICAgIGNvbmZpZ3VyYWJsZTogZmFsc2VcbiAgICAgICAgfSk7XG5cbiAgICAgICAgLyogaXN0YW5idWwgaWdub3JlIG5leHQgKi9cbiAgICAgICAgZm9yIChsZXQga2V5IGluIG1lbWJlcnMpIHtcbiAgICAgICAgICAgIGxldCBtZW1iZXI7XG4gICAgICAgICAgICBcbiAgICAgICAgICAgIGlmICh0eXBlb2YgbWVtYmVyc1trZXldID09PSAnZnVuY3Rpb24nKSB7XG5cbiAgICAgICAgICAgICAgICBtZW1iZXIgPSBuZXcgUHJveHkobWVtYmVyc1trZXldLCB7XG4gICAgICAgICAgICAgICAgICAgIGFwcGx5OiBmdW5jdGlvbih0YXJnZXQsIHRoYXQsIGFyZ3MpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIGFkZCBjb25maWcgb2JqZWN0IHRvIGV2ZXJ5IG1ldGhvZHMgY2FsbHNcbiAgICAgICAgICAgICAgICAgICAgICAgIGFyZ3MucHVzaChzZWxmLmNvbmZpZyk7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBSZWZsZWN0LmFwcGx5KHRhcmdldCwgc2VsZiwgYXJncyk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH0gZWxzZSBpZiAoa2V5KSB7XG5cbiAgICAgICAgICAgICAgICBtZW1iZXIgPSBuZXcgUHJveHkobWVtYmVyc1trZXldLCB7XG4gICAgICAgICAgICAgICAgICAgIGdldDogZnVuY3Rpb24odGFyZ2V0LCBwcm9wZXJ0eSwgcmVjZWl2ZXIpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBSZWZsZWN0LmdldCh0YXJnZXQsIHByb3BlcnR5LCByZWNlaXZlcik7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KHRoaXNbc3ViamVjdF0sIGtleSwge1xuICAgICAgICAgICAgICAgIHZhbHVlOiBtZW1iZXIsXG4gICAgICAgICAgICAgICAgd3JpdGFibGU6IGZhbHNlLFxuICAgICAgICAgICAgICAgIGVudW1lcmFibGU6IGZhbHNlLFxuICAgICAgICAgICAgICAgIGNvbmZpZ3VyYWJsZTogZmFsc2VcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgfVxufVxuIl19