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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9pbmRleC5qcyJdLCJuYW1lcyI6WyJQanMiLCJ2YWx1ZSIsImN1cnJlbnRQcm92aWRlciIsIldFQjNfTk9UX0NPTk5FQ1RFRCIsImNvbmZpZyIsIndlYjMiLCJpcGZzIiwiV2ViMyIsImlwZnNBUEkiLCJwanNQYWNrYWdlIiwidmVyc2lvbiIsIm9wdGlvbnMiLCJpc01ldGFNYXNrIiwiZXRoIiwicHJvdmlkZXIiLCJfd2ViMyIsInByb3ZpZGVycyIsIkh0dHBQcm92aWRlciIsInByb3RvY29sIiwiaG9zdCIsInBvcnQiLCJjb250cmFjdHMiLCJhZGRyZXNzZXMiLCJfYWRkTWVtYmVycyIsInBhbmRvcmEiLCJrZXJuZWxzIiwiZGF0YXNldHMiLCJqb2JzIiwid29ya2VycyIsInBhbiIsImVjb25vbWljIiwiX2lwZnMiLCJfYWRkQXBpTWVtYmVycyIsIk9iamVjdCIsImRlZmluZVByb3BlcnR5Iiwid3JpdGFibGUiLCJlbnVtZXJhYmxlIiwiY29uZmlndXJhYmxlIiwiUHJveHkiLCJnZXQiLCJ0YXJnZXQiLCJwcm9wZXJ0eSIsInJlY2VpdmVyIiwiUmVmbGVjdCIsImFwaSIsInN1YmplY3QiLCJtZW1iZXJzIiwic2VsZiIsImtleSIsIm1lbWJlciIsImFwcGx5IiwidGhhdCIsImFyZ3MiLCJwdXNoIl0sIm1hcHBpbmdzIjoiQUFBQTs7Ozs7Ozs7QUFTQTs7Ozs7Ozs7Ozs7QUFFQTs7QUFDQTs7QUFFQTs7QUFDQTs7QUFJQTs7QUFDQTs7QUFDQTs7QUFDQTs7QUFDQTs7QUFDQTs7QUFDQTs7QUFDQTs7Ozs7Ozs7Ozs7O0FBRUE7SUFDcUJBLEc7Ozs7O0FBaUJqQjtzQkFDVUMsSyxFQUFPO0FBRWIsVUFBSSxDQUFDQSxLQUFELElBQVUsQ0FBQ0EsS0FBSyxDQUFDQyxlQUFyQixFQUFzQztBQUNsQyxjQUFNLHFCQUFTQywwQkFBVCxDQUFOO0FBQ0g7O0FBRUQsV0FBS0MsTUFBTCxDQUFZQyxJQUFaLEdBQW1CSixLQUFuQjtBQUNILEssQ0FFRDs7OztzQkFDVUEsSyxFQUFPO0FBRWI7QUFDQSxXQUFLRyxNQUFMLENBQVlFLElBQVosR0FBbUJMLEtBQW5CO0FBQ0g7QUFFRDs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBMEJBOzs7Ozs7OztBQTFEQTt3QkFDa0I7QUFDZCxhQUFPTSxZQUFQO0FBQ0gsSyxDQUVEOzs7O3dCQUNxQjtBQUNqQixhQUFPQyxnQkFBUDtBQUNILEssQ0FFRDs7Ozt3QkFDcUI7QUFDakIsYUFBT0MsaUJBQVdDLE9BQWxCO0FBQ0g7OztBQWtERCxpQkFBMEI7QUFBQSxRQUFkQyxPQUFjLHVFQUFKLEVBQUk7O0FBQUE7O0FBQ3RCO0FBQ0EsU0FBS0QsT0FBTCxHQUFlRCxpQkFBV0MsT0FBMUI7QUFDQSxTQUFLTixNQUFMLEdBQWMsRUFBZDtBQUNBLFNBQUtRLFVBQUwsR0FBa0IsS0FBbEI7O0FBRUEsUUFBSUQsT0FBTyxDQUFDRSxHQUFaLEVBQWlCO0FBRWIsVUFBSUYsT0FBTyxDQUFDRSxHQUFSLENBQVlDLFFBQWhCLEVBQTBCO0FBRXRCLGFBQUtDLEtBQUwsR0FBYSxJQUFJZixHQUFHLENBQUNPLElBQVIsQ0FBYUksT0FBTyxDQUFDRSxHQUFSLENBQVlDLFFBQXpCLENBQWI7O0FBRUEsWUFBSUgsT0FBTyxDQUFDRSxHQUFSLENBQVlDLFFBQVosQ0FBcUJGLFVBQXpCLEVBQXFDO0FBRWpDLGVBQUtBLFVBQUwsR0FBa0IsSUFBbEI7QUFDSDtBQUNKLE9BUkQsTUFRTztBQUVILGFBQUtHLEtBQUwsR0FBYSxJQUFJZixHQUFHLENBQUNPLElBQVIsQ0FBYSxJQUFJUCxHQUFHLENBQUNPLElBQUosQ0FBU1MsU0FBVCxDQUFtQkMsWUFBdkIsV0FBdUNOLE9BQU8sQ0FBQ0UsR0FBUixDQUFZSyxRQUFaLElBQXdCLE1BQS9ELGdCQUEyRVAsT0FBTyxDQUFDRSxHQUFSLENBQVlNLElBQVosSUFBb0IsV0FBL0YsY0FBOEdSLE9BQU8sQ0FBQ0UsR0FBUixDQUFZTyxJQUFaLElBQW9CLEVBQWxJLEVBQWIsQ0FBYjtBQUNIOztBQUVELFdBQUtoQixNQUFMLENBQVlpQixTQUFaLEdBQXdCVixPQUFPLENBQUNVLFNBQVIsSUFBcUIsRUFBN0MsQ0FmYSxDQWVtQzs7QUFDaEQsV0FBS2pCLE1BQUwsQ0FBWWtCLFNBQVosR0FBd0JYLE9BQU8sQ0FBQ1csU0FBUixJQUFxQixFQUE3QyxDQWhCYSxDQWdCbUM7O0FBRWhELFdBQUtDLFdBQUwsQ0FBaUIsU0FBakIsRUFBNEJDLE9BQTVCOztBQUNBLFdBQUtELFdBQUwsQ0FBaUIsU0FBakIsRUFBNEJFLE9BQTVCOztBQUNBLFdBQUtGLFdBQUwsQ0FBaUIsVUFBakIsRUFBNkJHLFFBQTdCOztBQUNBLFdBQUtILFdBQUwsQ0FBaUIsTUFBakIsRUFBeUJJLElBQXpCOztBQUNBLFdBQUtKLFdBQUwsQ0FBaUIsU0FBakIsRUFBNEJLLE9BQTVCOztBQUNBLFdBQUtMLFdBQUwsQ0FBaUIsS0FBakIsRUFBd0JNLEdBQXhCOztBQUNBLFdBQUtOLFdBQUwsQ0FBaUIsVUFBakIsRUFBNkJPLFFBQTdCO0FBQ0g7O0FBRUQsUUFBSW5CLE9BQU8sQ0FBQ0wsSUFBWixFQUFrQjtBQUVkLFdBQUt5QixLQUFMLEdBQWEvQixHQUFHLENBQUNRLE9BQUosQ0FDVEcsT0FBTyxDQUFDTCxJQUFSLENBQWFhLElBREosRUFFVFIsT0FBTyxDQUFDTCxJQUFSLENBQWFjLElBRkosRUFHVDtBQUNJRixRQUFBQSxRQUFRLEVBQUVQLE9BQU8sQ0FBQ0wsSUFBUixDQUFhWTtBQUQzQixPQUhTLENBQWI7O0FBUUEsV0FBS0ssV0FBTCxDQUFpQixNQUFqQixFQUF5QmpCLElBQXpCO0FBQ0g7O0FBRUQsU0FBSzBCLGNBQUw7QUFDSCxHLENBRUQ7Ozs7O3FDQUNpQjtBQUViQyxNQUFBQSxNQUFNLENBQUNDLGNBQVAsQ0FBc0IsSUFBdEIsRUFBNEIsS0FBNUIsRUFBbUM7QUFDL0JqQyxRQUFBQSxLQUFLLEVBQUUsRUFEd0I7QUFFL0JrQyxRQUFBQSxRQUFRLEVBQUUsS0FGcUI7QUFHL0JDLFFBQUFBLFVBQVUsRUFBRSxLQUhtQjtBQUkvQkMsUUFBQUEsWUFBWSxFQUFFO0FBSmlCLE9BQW5DOztBQU9BLFVBQUksS0FBS2pDLE1BQUwsQ0FBWUMsSUFBaEIsRUFBc0I7QUFFbEIsWUFBSUEsSUFBSSxHQUFHLElBQUlpQyxLQUFKLENBQVUsS0FBS2xDLE1BQUwsQ0FBWUMsSUFBdEIsRUFBNEI7QUFDbkNrQyxVQUFBQSxHQUFHLEVBQUUsYUFBU0MsTUFBVCxFQUFpQkMsUUFBakIsRUFBMkJDLFFBQTNCLEVBQXFDO0FBQ3RDLG1CQUFPQyxPQUFPLENBQUNKLEdBQVIsQ0FBWUMsTUFBWixFQUFvQkMsUUFBcEIsRUFBOEJDLFFBQTlCLENBQVA7QUFDSDtBQUhrQyxTQUE1QixDQUFYO0FBTUFULFFBQUFBLE1BQU0sQ0FBQ0MsY0FBUCxDQUFzQixLQUFLVSxHQUEzQixFQUFnQyxNQUFoQyxFQUF3QztBQUNwQzNDLFVBQUFBLEtBQUssRUFBRUksSUFENkI7QUFFcEM4QixVQUFBQSxRQUFRLEVBQUUsS0FGMEI7QUFHcENDLFVBQUFBLFVBQVUsRUFBRSxLQUh3QjtBQUlwQ0MsVUFBQUEsWUFBWSxFQUFFO0FBSnNCLFNBQXhDO0FBTUg7O0FBRUQsVUFBSSxLQUFLakMsTUFBTCxDQUFZRSxJQUFoQixFQUFzQjtBQUVsQixZQUFJQSxLQUFJLEdBQUcsSUFBSWdDLEtBQUosQ0FBVSxLQUFLbEMsTUFBTCxDQUFZRSxJQUF0QixFQUE0QjtBQUNuQ2lDLFVBQUFBLEdBQUcsRUFBRSxhQUFTQyxNQUFULEVBQWlCQyxRQUFqQixFQUEyQkMsUUFBM0IsRUFBcUM7QUFDdEMsbUJBQU9DLE9BQU8sQ0FBQ0osR0FBUixDQUFZQyxNQUFaLEVBQW9CQyxRQUFwQixFQUE4QkMsUUFBOUIsQ0FBUDtBQUNIO0FBSGtDLFNBQTVCLENBQVg7O0FBTUFULFFBQUFBLE1BQU0sQ0FBQ0MsY0FBUCxDQUFzQixLQUFLVSxHQUEzQixFQUFnQyxNQUFoQyxFQUF3QztBQUNwQzNDLFVBQUFBLEtBQUssRUFBRUssS0FENkI7QUFFcEM2QixVQUFBQSxRQUFRLEVBQUUsS0FGMEI7QUFHcENDLFVBQUFBLFVBQVUsRUFBRSxLQUh3QjtBQUlwQ0MsVUFBQUEsWUFBWSxFQUFFO0FBSnNCLFNBQXhDO0FBTUg7QUFDSixLLENBRUQ7Ozs7Z0NBQ1lRLE8sRUFBU0MsTyxFQUFTO0FBQzFCLFVBQUlDLElBQUksR0FBRyxJQUFYO0FBRUFkLE1BQUFBLE1BQU0sQ0FBQ0MsY0FBUCxDQUFzQmEsSUFBdEIsRUFBNEJGLE9BQTVCLEVBQXFDO0FBQ2pDNUMsUUFBQUEsS0FBSyxFQUFFLEVBRDBCO0FBRWpDa0MsUUFBQUEsUUFBUSxFQUFFLEtBRnVCO0FBR2pDQyxRQUFBQSxVQUFVLEVBQUUsSUFIcUI7QUFJakNDLFFBQUFBLFlBQVksRUFBRTtBQUptQixPQUFyQztBQU9BOztBQUNBLFdBQUssSUFBSVcsR0FBVCxJQUFnQkYsT0FBaEIsRUFBeUI7QUFDckIsWUFBSUcsTUFBTSxTQUFWOztBQUVBLFlBQUksT0FBT0gsT0FBTyxDQUFDRSxHQUFELENBQWQsS0FBd0IsVUFBNUIsRUFBd0M7QUFFcENDLFVBQUFBLE1BQU0sR0FBRyxJQUFJWCxLQUFKLENBQVVRLE9BQU8sQ0FBQ0UsR0FBRCxDQUFqQixFQUF3QjtBQUM3QkUsWUFBQUEsS0FBSyxFQUFFLGVBQVNWLE1BQVQsRUFBaUJXLElBQWpCLEVBQXVCQyxJQUF2QixFQUE2QjtBQUNoQztBQUNBQSxjQUFBQSxJQUFJLENBQUNDLElBQUwsQ0FBVU4sSUFBSSxDQUFDM0MsTUFBZjtBQUVBLHFCQUFPdUMsT0FBTyxDQUFDTyxLQUFSLENBQWNWLE1BQWQsRUFBc0JPLElBQXRCLEVBQTRCSyxJQUE1QixDQUFQO0FBQ0g7QUFONEIsV0FBeEIsQ0FBVDtBQVFILFNBVkQsTUFVTyxJQUFJSixHQUFKLEVBQVM7QUFFWkMsVUFBQUEsTUFBTSxHQUFHLElBQUlYLEtBQUosQ0FBVVEsT0FBTyxDQUFDRSxHQUFELENBQWpCLEVBQXdCO0FBQzdCVCxZQUFBQSxHQUFHLEVBQUUsYUFBU0MsTUFBVCxFQUFpQkMsUUFBakIsRUFBMkJDLFFBQTNCLEVBQXFDO0FBQ3RDLHFCQUFPQyxPQUFPLENBQUNKLEdBQVIsQ0FBWUMsTUFBWixFQUFvQkMsUUFBcEIsRUFBOEJDLFFBQTlCLENBQVA7QUFDSDtBQUg0QixXQUF4QixDQUFUO0FBS0g7O0FBRURULFFBQUFBLE1BQU0sQ0FBQ0MsY0FBUCxDQUFzQixLQUFLVyxPQUFMLENBQXRCLEVBQXFDRyxHQUFyQyxFQUEwQztBQUN0Qy9DLFVBQUFBLEtBQUssRUFBRWdELE1BRCtCO0FBRXRDZCxVQUFBQSxRQUFRLEVBQUUsS0FGNEI7QUFHdENDLFVBQUFBLFVBQVUsRUFBRSxLQUgwQjtBQUl0Q0MsVUFBQUEsWUFBWSxFQUFFO0FBSndCLFNBQTFDO0FBTUg7QUFDSiIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogUHlycmhhIEpzXG4gKiBQYW5kb3JhIFB5cnJoYSBKYXZhc2NyaXB0IGxpYnJhcnlcbiAqIFxuICogQGZpbGUgaW5kZXguanNcbiAqIEBhdXRob3IgS29zdGlhbnR5biBTbXlybm92IDxrb3N0eXNoQGdtYWlsLmNvbT5cbiAqIEBkYXRlIDIwMThcbiAqL1xuXG4ndXNlIHN0cmljdCc7XG5cbmltcG9ydCBXZWIzIGZyb20gJ3dlYjMnO1xuaW1wb3J0IGlwZnNBUEkgZnJvbSAnaXBmcy1hcGknO1xuXG5pbXBvcnQgcGpzUGFja2FnZSBmcm9tICcuLi9wYWNrYWdlLmpzb24nO1xuaW1wb3J0IHBqc0Vycm9yLCB7XG4gICAgV0VCM19OT1RfQ09OTkVDVEVEXG59IGZyb20gJy4vaGVscGVycy9lcnJvcnMnO1xuXG5pbXBvcnQgKiBhcyBwYW5kb3JhIGZyb20gJy4vcGFuZG9yYSc7XG5pbXBvcnQgKiBhcyBrZXJuZWxzIGZyb20gJy4va2VybmVscyc7XG5pbXBvcnQgKiBhcyBkYXRhc2V0cyBmcm9tICcuL2RhdGFzZXRzJztcbmltcG9ydCAqIGFzIGpvYnMgZnJvbSAnLi9qb2JzJztcbmltcG9ydCAqIGFzIHdvcmtlcnMgZnJvbSAnLi93b3JrZXJzJztcbmltcG9ydCAqIGFzIGlwZnMgZnJvbSAnLi9pcGZzJztcbmltcG9ydCAqIGFzIHBhbiBmcm9tICcuL3Bhbic7XG5pbXBvcnQgKiBhcyBlY29ub21pYyBmcm9tICcuL2Vjb25vbWljJztcblxuLyoqIFBqcyBjbGFzcyAqL1xuZXhwb3J0IGRlZmF1bHQgY2xhc3MgUGpzIHtcblxuICAgIC8vIE5hdGl2ZSBXZWIzIG9iamVjdFxuICAgIHN0YXRpYyBnZXQgV2ViMygpIHtcbiAgICAgICAgcmV0dXJuIFdlYjM7XG4gICAgfVxuXG4gICAgLy8gTmF0aXZlIGlwZnNBUEkgb2JqZWN0XG4gICAgc3RhdGljIGdldCBpcGZzQVBJKCkge1xuICAgICAgICByZXR1cm4gaXBmc0FQSTtcbiAgICB9XG5cbiAgICAvLyBMaWJyYXJ5IHZlcnNpb25cbiAgICBzdGF0aWMgZ2V0IHZlcnNpb24oKSB7XG4gICAgICAgIHJldHVybiBwanNQYWNrYWdlLnZlcnNpb247XG4gICAgfVxuXG4gICAgLy8gd2ViMyBzZXR0ZXJcbiAgICBzZXQgX3dlYjModmFsdWUpIHtcblxuICAgICAgICBpZiAoIXZhbHVlIHx8ICF2YWx1ZS5jdXJyZW50UHJvdmlkZXIpIHtcbiAgICAgICAgICAgIHRocm93IHBqc0Vycm9yKFdFQjNfTk9UX0NPTk5FQ1RFRCk7XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLmNvbmZpZy53ZWIzID0gdmFsdWU7XG4gICAgfVxuXG4gICAgLy8gaXBmcyBzZXR0ZXJcbiAgICBzZXQgX2lwZnModmFsdWUpIHtcblxuICAgICAgICAvLyBAdG9kbyBBZGQgaXBmcyBjb25uZWN0aW9uIHZhbGlkYXRpb25cbiAgICAgICAgdGhpcy5jb25maWcuaXBmcyA9IHZhbHVlO1xuICAgIH1cblxuICAgIC8qKiBPcHRpb25zIGV4YW1wbGVcbiAgICBcbiAgICB7XG4gICAgICAgIGV0aDoge1xuICAgICAgICAgICAgcHJvdmlkZXI6IDxleHRlcm5hbF9wcm92aWRlcj4sXG4gICAgICAgICAgICAvLyBvclxuICAgICAgICAgICAgcHJvdG9jb2w6ICdodHRwJyxcbiAgICAgICAgICAgIGhvc3Q6ICdsb2NhbGhvc3QnLFxuICAgICAgICAgICAgcG9ydDogJydcbiAgICAgICAgfSxcbiAgICAgICAgaXBmczoge1xuICAgICAgICAgICAgcHJvdG9jb2w6ICdodHRwJyxcbiAgICAgICAgICAgIGhvc3Q6ICdsb2NhbGhvc3QnLFxuICAgICAgICAgICAgcG9ydDogNTAwMVxuICAgICAgICB9LFxuICAgICAgICBjb250cmFjdHM6IHtcbiAgICAgICAgICAgIEtlcm5lbCwgIC8vIGNvbnRyYWN0IGpzb25cbiAgICAgICAgICAgIERhdGFzZXQgIC8vIGNvbnRyYWN0IGpzb25cbiAgICAgICAgfSxcbiAgICAgICAgYWRkcmVzc2VzOiB7XG4gICAgICAgICAgICBQYW5kb3JhOiAnMHg1OGU2NmI3OTkyOGNmYjM2MmI1M2MxODVhNmExZmRlZDg4MmJiMDdkJyxcbiAgICAgICAgICAgIFBhbmRvcmFNYXJrZXQ6ICcweDYxNDIwMjlhYmIyMWVmMmUwYmZmZGU4ZDQzZjE1YzY0ZjM3NTBmZTYnXG4gICAgICAgIH1cbiAgICB9XG4gICAgIFxuICAgICovXG4gICAgLyoqXG4gICAgICogQ3JlYXRlcyBhbiBpbnN0YW5jZSBvZiBQanMuXG4gICAgICogQHBhcmFtIHtPYmplY3R9IG9wdGlvbnNcbiAgICAgKiBAbWVtYmVyb2YgUGpzXG4gICAgICovXG4gICAgY29uc3RydWN0b3Iob3B0aW9ucyA9IHt9KSB7XG4gICAgICAgIC8vIEB0b2RvIEltcGxlbWVudCBvcHRpb25zIG9iamVjdCB2YWxpZGF0aW9uXG4gICAgICAgIHRoaXMudmVyc2lvbiA9IHBqc1BhY2thZ2UudmVyc2lvbjtcbiAgICAgICAgdGhpcy5jb25maWcgPSB7fTtcbiAgICAgICAgdGhpcy5pc01ldGFNYXNrID0gZmFsc2U7XG5cbiAgICAgICAgaWYgKG9wdGlvbnMuZXRoKSB7XG5cbiAgICAgICAgICAgIGlmIChvcHRpb25zLmV0aC5wcm92aWRlcikge1xuXG4gICAgICAgICAgICAgICAgdGhpcy5fd2ViMyA9IG5ldyBQanMuV2ViMyhvcHRpb25zLmV0aC5wcm92aWRlcik7XG5cbiAgICAgICAgICAgICAgICBpZiAob3B0aW9ucy5ldGgucHJvdmlkZXIuaXNNZXRhTWFzaykge1xuICAgICAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5pc01ldGFNYXNrID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgIFxuICAgICAgICAgICAgICAgIHRoaXMuX3dlYjMgPSBuZXcgUGpzLldlYjMobmV3IFBqcy5XZWIzLnByb3ZpZGVycy5IdHRwUHJvdmlkZXIoYCR7b3B0aW9ucy5ldGgucHJvdG9jb2wgfHwgJ2h0dHAnfTovLyR7b3B0aW9ucy5ldGguaG9zdCB8fCAnbG9jYWxob3N0J306JHtvcHRpb25zLmV0aC5wb3J0IHx8ICcnfWApKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgdGhpcy5jb25maWcuY29udHJhY3RzID0gb3B0aW9ucy5jb250cmFjdHMgfHwge307Ly8gQHRvZG8gVmFsaWRhdGUgbWluaW11bSBcInJlcXVpcmVkXCIgY29udHJhY3RzIHNldCBcbiAgICAgICAgICAgIHRoaXMuY29uZmlnLmFkZHJlc3NlcyA9IG9wdGlvbnMuYWRkcmVzc2VzIHx8IHt9Oy8vIEB0b2RvIFZhbGlkYXRlIGFkZHJlc3NlcyBcInJlcXVpcmVkXCIgb3B0aW9uXG5cbiAgICAgICAgICAgIHRoaXMuX2FkZE1lbWJlcnMoJ3BhbmRvcmEnLCBwYW5kb3JhKTtcbiAgICAgICAgICAgIHRoaXMuX2FkZE1lbWJlcnMoJ2tlcm5lbHMnLCBrZXJuZWxzKTtcbiAgICAgICAgICAgIHRoaXMuX2FkZE1lbWJlcnMoJ2RhdGFzZXRzJywgZGF0YXNldHMpO1xuICAgICAgICAgICAgdGhpcy5fYWRkTWVtYmVycygnam9icycsIGpvYnMpO1xuICAgICAgICAgICAgdGhpcy5fYWRkTWVtYmVycygnd29ya2VycycsIHdvcmtlcnMpO1xuICAgICAgICAgICAgdGhpcy5fYWRkTWVtYmVycygncGFuJywgcGFuKTtcbiAgICAgICAgICAgIHRoaXMuX2FkZE1lbWJlcnMoJ2Vjb25vbWljJywgZWNvbm9taWMpO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKG9wdGlvbnMuaXBmcykge1xuXG4gICAgICAgICAgICB0aGlzLl9pcGZzID0gUGpzLmlwZnNBUEkoXG4gICAgICAgICAgICAgICAgb3B0aW9ucy5pcGZzLmhvc3QsIFxuICAgICAgICAgICAgICAgIG9wdGlvbnMuaXBmcy5wb3J0LCBcbiAgICAgICAgICAgICAgICB7IFxuICAgICAgICAgICAgICAgICAgICBwcm90b2NvbDogb3B0aW9ucy5pcGZzLnByb3RvY29sXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgKTtcblxuICAgICAgICAgICAgdGhpcy5fYWRkTWVtYmVycygnaXBmcycsIGlwZnMpO1xuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy5fYWRkQXBpTWVtYmVycygpO1xuICAgIH1cblxuICAgIC8vIGRpcmVjdCBhcGlzIHJlZmVyZW5jZXNcbiAgICBfYWRkQXBpTWVtYmVycygpIHtcblxuICAgICAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkodGhpcywgJ2FwaScsIHtcbiAgICAgICAgICAgIHZhbHVlOiB7fSxcbiAgICAgICAgICAgIHdyaXRhYmxlOiBmYWxzZSxcbiAgICAgICAgICAgIGVudW1lcmFibGU6IGZhbHNlLFxuICAgICAgICAgICAgY29uZmlndXJhYmxlOiBmYWxzZVxuICAgICAgICB9KTtcblxuICAgICAgICBpZiAodGhpcy5jb25maWcud2ViMykge1xuXG4gICAgICAgICAgICBsZXQgd2ViMyA9IG5ldyBQcm94eSh0aGlzLmNvbmZpZy53ZWIzLCB7XG4gICAgICAgICAgICAgICAgZ2V0OiBmdW5jdGlvbih0YXJnZXQsIHByb3BlcnR5LCByZWNlaXZlcikge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gUmVmbGVjdC5nZXQodGFyZ2V0LCBwcm9wZXJ0eSwgcmVjZWl2ZXIpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkodGhpcy5hcGksICd3ZWIzJywge1xuICAgICAgICAgICAgICAgIHZhbHVlOiB3ZWIzLFxuICAgICAgICAgICAgICAgIHdyaXRhYmxlOiBmYWxzZSxcbiAgICAgICAgICAgICAgICBlbnVtZXJhYmxlOiBmYWxzZSxcbiAgICAgICAgICAgICAgICBjb25maWd1cmFibGU6IGZhbHNlXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmICh0aGlzLmNvbmZpZy5pcGZzKSB7XG5cbiAgICAgICAgICAgIGxldCBpcGZzID0gbmV3IFByb3h5KHRoaXMuY29uZmlnLmlwZnMsIHtcbiAgICAgICAgICAgICAgICBnZXQ6IGZ1bmN0aW9uKHRhcmdldCwgcHJvcGVydHksIHJlY2VpdmVyKSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBSZWZsZWN0LmdldCh0YXJnZXQsIHByb3BlcnR5LCByZWNlaXZlcik7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eSh0aGlzLmFwaSwgJ2lwZnMnLCB7XG4gICAgICAgICAgICAgICAgdmFsdWU6IGlwZnMsXG4gICAgICAgICAgICAgICAgd3JpdGFibGU6IGZhbHNlLFxuICAgICAgICAgICAgICAgIGVudW1lcmFibGU6IGZhbHNlLFxuICAgICAgICAgICAgICAgIGNvbmZpZ3VyYWJsZTogZmFsc2VcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgLy8gUG9wdWxhdGUgbGlicmFyeSBtZXRob2RzXG4gICAgX2FkZE1lbWJlcnMoc3ViamVjdCwgbWVtYmVycykge1xuICAgICAgICBsZXQgc2VsZiA9IHRoaXM7XG5cbiAgICAgICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KHNlbGYsIHN1YmplY3QsIHtcbiAgICAgICAgICAgIHZhbHVlOiB7fSxcbiAgICAgICAgICAgIHdyaXRhYmxlOiBmYWxzZSxcbiAgICAgICAgICAgIGVudW1lcmFibGU6IHRydWUsXG4gICAgICAgICAgICBjb25maWd1cmFibGU6IGZhbHNlXG4gICAgICAgIH0pO1xuXG4gICAgICAgIC8qIGlzdGFuYnVsIGlnbm9yZSBuZXh0ICovXG4gICAgICAgIGZvciAobGV0IGtleSBpbiBtZW1iZXJzKSB7XG4gICAgICAgICAgICBsZXQgbWVtYmVyO1xuICAgICAgICAgICAgXG4gICAgICAgICAgICBpZiAodHlwZW9mIG1lbWJlcnNba2V5XSA9PT0gJ2Z1bmN0aW9uJykge1xuXG4gICAgICAgICAgICAgICAgbWVtYmVyID0gbmV3IFByb3h5KG1lbWJlcnNba2V5XSwge1xuICAgICAgICAgICAgICAgICAgICBhcHBseTogZnVuY3Rpb24odGFyZ2V0LCB0aGF0LCBhcmdzKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAvLyBhZGQgY29uZmlnIG9iamVjdCB0byBldmVyeSBtZXRob2RzIGNhbGxzXG4gICAgICAgICAgICAgICAgICAgICAgICBhcmdzLnB1c2goc2VsZi5jb25maWcpO1xuXG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gUmVmbGVjdC5hcHBseSh0YXJnZXQsIHNlbGYsIGFyZ3MpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9IGVsc2UgaWYgKGtleSkge1xuXG4gICAgICAgICAgICAgICAgbWVtYmVyID0gbmV3IFByb3h5KG1lbWJlcnNba2V5XSwge1xuICAgICAgICAgICAgICAgICAgICBnZXQ6IGZ1bmN0aW9uKHRhcmdldCwgcHJvcGVydHksIHJlY2VpdmVyKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gUmVmbGVjdC5nZXQodGFyZ2V0LCBwcm9wZXJ0eSwgcmVjZWl2ZXIpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eSh0aGlzW3N1YmplY3RdLCBrZXksIHtcbiAgICAgICAgICAgICAgICB2YWx1ZTogbWVtYmVyLFxuICAgICAgICAgICAgICAgIHdyaXRhYmxlOiBmYWxzZSxcbiAgICAgICAgICAgICAgICBlbnVtZXJhYmxlOiBmYWxzZSxcbiAgICAgICAgICAgICAgICBjb25maWd1cmFibGU6IGZhbHNlXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgIH1cbn1cbiJdfQ==