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
      var self = this;
      Object.defineProperty(self, 'api', {
        value: {},
        writable: false,
        enumerable: true,
        configurable: false
      });

      if (self.config.web3) {
        var web3 = new Proxy(self.config.web3, {
          get: function get(target, property, receiver) {
            return Reflect.get(target, property, receiver);
          }
        });
        Object.defineProperty(self.api, 'web3', {
          value: web3,
          writable: false,
          enumerable: true,
          configurable: false
        });
      }

      if (self.config.ipfs) {
        var _ipfs = new Proxy(self.config.ipfs, {
          get: function get(target, property, receiver) {
            return Reflect.get(target, property, receiver);
          }
        });

        Object.defineProperty(self.api, 'ipfs', {
          value: _ipfs,
          writable: false,
          enumerable: true,
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

        Object.defineProperty(self[subject], key, {
          value: member,
          writable: false,
          enumerable: true,
          configurable: false
        });
      }
    }
  }]);

  return Pjs;
}();

exports.default = Pjs;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9pbmRleC5qcyJdLCJuYW1lcyI6WyJQanMiLCJ2YWx1ZSIsImN1cnJlbnRQcm92aWRlciIsIldFQjNfTk9UX0NPTk5FQ1RFRCIsImNvbmZpZyIsIndlYjMiLCJpcGZzIiwiV2ViMyIsImlwZnNBUEkiLCJwanNQYWNrYWdlIiwidmVyc2lvbiIsIm9wdGlvbnMiLCJpc01ldGFNYXNrIiwiZXRoIiwicHJvdmlkZXIiLCJfd2ViMyIsInByb3ZpZGVycyIsIkh0dHBQcm92aWRlciIsInByb3RvY29sIiwiaG9zdCIsInBvcnQiLCJjb250cmFjdHMiLCJhZGRyZXNzZXMiLCJfYWRkTWVtYmVycyIsInBhbmRvcmEiLCJrZXJuZWxzIiwiZGF0YXNldHMiLCJqb2JzIiwid29ya2VycyIsInBhbiIsImVjb25vbWljIiwiX2lwZnMiLCJfYWRkQXBpTWVtYmVycyIsInNlbGYiLCJPYmplY3QiLCJkZWZpbmVQcm9wZXJ0eSIsIndyaXRhYmxlIiwiZW51bWVyYWJsZSIsImNvbmZpZ3VyYWJsZSIsIlByb3h5IiwiZ2V0IiwidGFyZ2V0IiwicHJvcGVydHkiLCJyZWNlaXZlciIsIlJlZmxlY3QiLCJhcGkiLCJzdWJqZWN0IiwibWVtYmVycyIsImtleSIsIm1lbWJlciIsImFwcGx5IiwidGhhdCIsImFyZ3MiLCJwdXNoIl0sIm1hcHBpbmdzIjoiQUFBQTs7Ozs7Ozs7QUFTQTs7Ozs7Ozs7Ozs7OztBQUVBOztBQUNBOztBQUVBOztBQUNBOztBQUlBOztBQUNBOztBQUNBOztBQUNBOztBQUNBOztBQUNBOztBQUNBOztBQUNBOzs7Ozs7Ozs7Ozs7QUFFQTtJQUNxQkEsRzs7Ozs7QUFpQmpCO3NCQUNVQyxLLEVBQU87QUFFYixVQUFJLENBQUNBLEtBQUQsSUFBVSxDQUFDQSxLQUFLLENBQUNDLGVBQXJCLEVBQXNDO0FBQ2xDLGNBQU0scUJBQVNDLDBCQUFULENBQU47QUFDSDs7QUFFRCxXQUFLQyxNQUFMLENBQVlDLElBQVosR0FBbUJKLEtBQW5CO0FBQ0gsSyxDQUVEOzs7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LE1BQVQsRUFBaUJDLFFBQWpCLEVBQTJCQyxRQUEzQixFQUFxQztBQUN0QyxxQkFBT0MsT0FBTyxDQUFDSixHQUFSLENBQVlDLE1BQVosRUFBb0JDLFFBQXBCLEVBQThCQyxRQUE5QixDQUFQO0FBQ0g7QUFINEIsV0FBeEIsQ0FBVDtBQUtIOztBQUVEVCxRQUFBQSxNQUFNLENBQUNDLGNBQVAsQ0FBc0JGLElBQUksQ0FBQ2EsT0FBRCxDQUExQixFQUFxQ0UsR0FBckMsRUFBMEM7QUFDdEMvQyxVQUFBQSxLQUFLLEVBQUVnRCxNQUQrQjtBQUV0Q2IsVUFBQUEsUUFBUSxFQUFFLEtBRjRCO0FBR3RDQyxVQUFBQSxVQUFVLEVBQUUsSUFIMEI7QUFJdENDLFVBQUFBLFlBQVksRUFBRTtBQUp3QixTQUExQztBQU1IO0FBQ0oiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIFB5cnJoYSBKc1xuICogUGFuZG9yYSBQeXJyaGEgSmF2YXNjcmlwdCBsaWJyYXJ5XG4gKiBcbiAqIEBmaWxlIGluZGV4LmpzXG4gKiBAYXV0aG9yIEtvc3RpYW50eW4gU215cm5vdiA8a29zdHlzaEBnbWFpbC5jb20+XG4gKiBAZGF0ZSAyMDE4XG4gKi9cblxuJ3VzZSBzdHJpY3QnO1xuXG5pbXBvcnQgV2ViMyBmcm9tICd3ZWIzJztcbmltcG9ydCBpcGZzQVBJIGZyb20gJ2lwZnMtYXBpJztcblxuaW1wb3J0IHBqc1BhY2thZ2UgZnJvbSAnLi4vcGFja2FnZS5qc29uJztcbmltcG9ydCBwanNFcnJvciwge1xuICAgIFdFQjNfTk9UX0NPTk5FQ1RFRFxufSBmcm9tICcuL2hlbHBlcnMvZXJyb3JzJztcblxuaW1wb3J0ICogYXMgcGFuZG9yYSBmcm9tICcuL3BhbmRvcmEnO1xuaW1wb3J0ICogYXMga2VybmVscyBmcm9tICcuL2tlcm5lbHMnO1xuaW1wb3J0ICogYXMgZGF0YXNldHMgZnJvbSAnLi9kYXRhc2V0cyc7XG5pbXBvcnQgKiBhcyBqb2JzIGZyb20gJy4vam9icyc7XG5pbXBvcnQgKiBhcyB3b3JrZXJzIGZyb20gJy4vd29ya2Vycyc7XG5pbXBvcnQgKiBhcyBpcGZzIGZyb20gJy4vaXBmcyc7XG5pbXBvcnQgKiBhcyBwYW4gZnJvbSAnLi9wYW4nO1xuaW1wb3J0ICogYXMgZWNvbm9taWMgZnJvbSAnLi9lY29ub21pYyc7XG5cbi8qKiBQanMgY2xhc3MgKi9cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFBqcyB7XG5cbiAgICAvLyBOYXRpdmUgV2ViMyBvYmplY3RcbiAgICBzdGF0aWMgZ2V0IFdlYjMoKSB7XG4gICAgICAgIHJldHVybiBXZWIzO1xuICAgIH1cblxuICAgIC8vIE5hdGl2ZSBpcGZzQVBJIG9iamVjdFxuICAgIHN0YXRpYyBnZXQgaXBmc0FQSSgpIHtcbiAgICAgICAgcmV0dXJuIGlwZnNBUEk7XG4gICAgfVxuXG4gICAgLy8gTGlicmFyeSB2ZXJzaW9uXG4gICAgc3RhdGljIGdldCB2ZXJzaW9uKCkge1xuICAgICAgICByZXR1cm4gcGpzUGFja2FnZS52ZXJzaW9uO1xuICAgIH1cblxuICAgIC8vIHdlYjMgc2V0dGVyXG4gICAgc2V0IF93ZWIzKHZhbHVlKSB7XG5cbiAgICAgICAgaWYgKCF2YWx1ZSB8fCAhdmFsdWUuY3VycmVudFByb3ZpZGVyKSB7XG4gICAgICAgICAgICB0aHJvdyBwanNFcnJvcihXRUIzX05PVF9DT05ORUNURUQpO1xuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy5jb25maWcud2ViMyA9IHZhbHVlO1xuICAgIH1cblxuICAgIC8vIGlwZnMgc2V0dGVyXG4gICAgc2V0IF9pcGZzKHZhbHVlKSB7XG5cbiAgICAgICAgLy8gQHRvZG8gQWRkIGlwZnMgY29ubmVjdGlvbiB2YWxpZGF0aW9uXG4gICAgICAgIHRoaXMuY29uZmlnLmlwZnMgPSB2YWx1ZTtcbiAgICB9XG5cbiAgICAvKiogT3B0aW9ucyBleGFtcGxlXG4gICAgXG4gICAge1xuICAgICAgICBldGg6IHtcbiAgICAgICAgICAgIHByb3ZpZGVyOiA8ZXh0ZXJuYWxfcHJvdmlkZXI+LFxuICAgICAgICAgICAgLy8gb3JcbiAgICAgICAgICAgIHByb3RvY29sOiAnaHR0cCcsXG4gICAgICAgICAgICBob3N0OiAnbG9jYWxob3N0JyxcbiAgICAgICAgICAgIHBvcnQ6ICcnXG4gICAgICAgIH0sXG4gICAgICAgIGlwZnM6IHtcbiAgICAgICAgICAgIHByb3RvY29sOiAnaHR0cCcsXG4gICAgICAgICAgICBob3N0OiAnbG9jYWxob3N0JyxcbiAgICAgICAgICAgIHBvcnQ6IDUwMDFcbiAgICAgICAgfSxcbiAgICAgICAgY29udHJhY3RzOiB7XG4gICAgICAgICAgICBLZXJuZWwsICAvLyBjb250cmFjdCBqc29uXG4gICAgICAgICAgICBEYXRhc2V0ICAvLyBjb250cmFjdCBqc29uXG4gICAgICAgIH0sXG4gICAgICAgIGFkZHJlc3Nlczoge1xuICAgICAgICAgICAgUGFuZG9yYTogJzB4NThlNjZiNzk5MjhjZmIzNjJiNTNjMTg1YTZhMWZkZWQ4ODJiYjA3ZCcsXG4gICAgICAgICAgICBQYW5kb3JhTWFya2V0OiAnMHg2MTQyMDI5YWJiMjFlZjJlMGJmZmRlOGQ0M2YxNWM2NGYzNzUwZmU2J1xuICAgICAgICB9XG4gICAgfVxuICAgICBcbiAgICAqL1xuICAgIC8qKlxuICAgICAqIENyZWF0ZXMgYW4gaW5zdGFuY2Ugb2YgUGpzLlxuICAgICAqIEBwYXJhbSB7T2JqZWN0fSBvcHRpb25zXG4gICAgICogQG1lbWJlcm9mIFBqc1xuICAgICAqL1xuICAgIGNvbnN0cnVjdG9yKG9wdGlvbnMgPSB7fSkge1xuICAgICAgICAvLyBAdG9kbyBJbXBsZW1lbnQgb3B0aW9ucyBvYmplY3QgdmFsaWRhdGlvblxuICAgICAgICB0aGlzLnZlcnNpb24gPSBwanNQYWNrYWdlLnZlcnNpb247XG4gICAgICAgIHRoaXMuY29uZmlnID0ge307XG4gICAgICAgIHRoaXMuaXNNZXRhTWFzayA9IGZhbHNlO1xuXG4gICAgICAgIGlmIChvcHRpb25zLmV0aCkge1xuXG4gICAgICAgICAgICBpZiAob3B0aW9ucy5ldGgucHJvdmlkZXIpIHtcblxuICAgICAgICAgICAgICAgIHRoaXMuX3dlYjMgPSBuZXcgUGpzLldlYjMob3B0aW9ucy5ldGgucHJvdmlkZXIpO1xuXG4gICAgICAgICAgICAgICAgaWYgKG9wdGlvbnMuZXRoLnByb3ZpZGVyLmlzTWV0YU1hc2spIHtcbiAgICAgICAgICAgICAgICAgICAgXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuaXNNZXRhTWFzayA9IHRydWU7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICBcbiAgICAgICAgICAgICAgICB0aGlzLl93ZWIzID0gbmV3IFBqcy5XZWIzKG5ldyBQanMuV2ViMy5wcm92aWRlcnMuSHR0cFByb3ZpZGVyKGAke29wdGlvbnMuZXRoLnByb3RvY29sIHx8ICdodHRwJ306Ly8ke29wdGlvbnMuZXRoLmhvc3QgfHwgJ2xvY2FsaG9zdCd9OiR7b3B0aW9ucy5ldGgucG9ydCB8fCAnJ31gKSk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHRoaXMuY29uZmlnLmNvbnRyYWN0cyA9IG9wdGlvbnMuY29udHJhY3RzIHx8IHt9Oy8vIEB0b2RvIFZhbGlkYXRlIG1pbmltdW0gXCJyZXF1aXJlZFwiIGNvbnRyYWN0cyBzZXQgXG4gICAgICAgICAgICB0aGlzLmNvbmZpZy5hZGRyZXNzZXMgPSBvcHRpb25zLmFkZHJlc3NlcyB8fCB7fTsvLyBAdG9kbyBWYWxpZGF0ZSBhZGRyZXNzZXMgXCJyZXF1aXJlZFwiIG9wdGlvblxuXG4gICAgICAgICAgICB0aGlzLl9hZGRNZW1iZXJzKCdwYW5kb3JhJywgcGFuZG9yYSk7XG4gICAgICAgICAgICB0aGlzLl9hZGRNZW1iZXJzKCdrZXJuZWxzJywga2VybmVscyk7XG4gICAgICAgICAgICB0aGlzLl9hZGRNZW1iZXJzKCdkYXRhc2V0cycsIGRhdGFzZXRzKTtcbiAgICAgICAgICAgIHRoaXMuX2FkZE1lbWJlcnMoJ2pvYnMnLCBqb2JzKTtcbiAgICAgICAgICAgIHRoaXMuX2FkZE1lbWJlcnMoJ3dvcmtlcnMnLCB3b3JrZXJzKTtcbiAgICAgICAgICAgIHRoaXMuX2FkZE1lbWJlcnMoJ3BhbicsIHBhbik7XG4gICAgICAgICAgICB0aGlzLl9hZGRNZW1iZXJzKCdlY29ub21pYycsIGVjb25vbWljKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChvcHRpb25zLmlwZnMpIHtcblxuICAgICAgICAgICAgdGhpcy5faXBmcyA9IFBqcy5pcGZzQVBJKFxuICAgICAgICAgICAgICAgIG9wdGlvbnMuaXBmcy5ob3N0LCBcbiAgICAgICAgICAgICAgICBvcHRpb25zLmlwZnMucG9ydCwgXG4gICAgICAgICAgICAgICAgeyBcbiAgICAgICAgICAgICAgICAgICAgcHJvdG9jb2w6IG9wdGlvbnMuaXBmcy5wcm90b2NvbFxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICk7XG5cbiAgICAgICAgICAgIHRoaXMuX2FkZE1lbWJlcnMoJ2lwZnMnLCBpcGZzKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMuX2FkZEFwaU1lbWJlcnMoKTtcbiAgICB9XG5cbiAgICAvLyBkaXJlY3QgYXBpcyByZWZlcmVuY2VzXG4gICAgX2FkZEFwaU1lbWJlcnMoKSB7XG4gICAgICAgIGxldCBzZWxmID0gdGhpcztcblxuICAgICAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkoc2VsZiwgJ2FwaScsIHtcbiAgICAgICAgICAgIHZhbHVlOiB7fSxcbiAgICAgICAgICAgIHdyaXRhYmxlOiBmYWxzZSxcbiAgICAgICAgICAgIGVudW1lcmFibGU6IHRydWUsXG4gICAgICAgICAgICBjb25maWd1cmFibGU6IGZhbHNlXG4gICAgICAgIH0pO1xuXG4gICAgICAgIGlmIChzZWxmLmNvbmZpZy53ZWIzKSB7XG5cbiAgICAgICAgICAgIGxldCB3ZWIzID0gbmV3IFByb3h5KHNlbGYuY29uZmlnLndlYjMsIHtcbiAgICAgICAgICAgICAgICBnZXQ6IGZ1bmN0aW9uKHRhcmdldCwgcHJvcGVydHksIHJlY2VpdmVyKSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBSZWZsZWN0LmdldCh0YXJnZXQsIHByb3BlcnR5LCByZWNlaXZlcik7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShzZWxmLmFwaSwgJ3dlYjMnLCB7XG4gICAgICAgICAgICAgICAgdmFsdWU6IHdlYjMsXG4gICAgICAgICAgICAgICAgd3JpdGFibGU6IGZhbHNlLFxuICAgICAgICAgICAgICAgIGVudW1lcmFibGU6IHRydWUsXG4gICAgICAgICAgICAgICAgY29uZmlndXJhYmxlOiBmYWxzZVxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoc2VsZi5jb25maWcuaXBmcykge1xuXG4gICAgICAgICAgICBsZXQgaXBmcyA9IG5ldyBQcm94eShzZWxmLmNvbmZpZy5pcGZzLCB7XG4gICAgICAgICAgICAgICAgZ2V0OiBmdW5jdGlvbih0YXJnZXQsIHByb3BlcnR5LCByZWNlaXZlcikge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gUmVmbGVjdC5nZXQodGFyZ2V0LCBwcm9wZXJ0eSwgcmVjZWl2ZXIpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkoc2VsZi5hcGksICdpcGZzJywge1xuICAgICAgICAgICAgICAgIHZhbHVlOiBpcGZzLFxuICAgICAgICAgICAgICAgIHdyaXRhYmxlOiBmYWxzZSxcbiAgICAgICAgICAgICAgICBlbnVtZXJhYmxlOiB0cnVlLFxuICAgICAgICAgICAgICAgIGNvbmZpZ3VyYWJsZTogZmFsc2VcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgLy8gUG9wdWxhdGUgbGlicmFyeSBtZXRob2RzXG4gICAgX2FkZE1lbWJlcnMoc3ViamVjdCwgbWVtYmVycykge1xuICAgICAgICBsZXQgc2VsZiA9IHRoaXM7XG5cbiAgICAgICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KHNlbGYsIHN1YmplY3QsIHtcbiAgICAgICAgICAgIHZhbHVlOiB7fSxcbiAgICAgICAgICAgIHdyaXRhYmxlOiBmYWxzZSxcbiAgICAgICAgICAgIGVudW1lcmFibGU6IHRydWUsXG4gICAgICAgICAgICBjb25maWd1cmFibGU6IGZhbHNlXG4gICAgICAgIH0pO1xuXG4gICAgICAgIC8qIGlzdGFuYnVsIGlnbm9yZSBuZXh0ICovXG4gICAgICAgIGZvciAobGV0IGtleSBpbiBtZW1iZXJzKSB7XG4gICAgICAgICAgICBsZXQgbWVtYmVyO1xuICAgICAgICAgICAgXG4gICAgICAgICAgICBpZiAodHlwZW9mIG1lbWJlcnNba2V5XSA9PT0gJ2Z1bmN0aW9uJykge1xuXG4gICAgICAgICAgICAgICAgbWVtYmVyID0gbmV3IFByb3h5KG1lbWJlcnNba2V5XSwge1xuICAgICAgICAgICAgICAgICAgICBhcHBseTogZnVuY3Rpb24odGFyZ2V0LCB0aGF0LCBhcmdzKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAvLyBhZGQgY29uZmlnIG9iamVjdCB0byBldmVyeSBtZXRob2RzIGNhbGxzXG4gICAgICAgICAgICAgICAgICAgICAgICBhcmdzLnB1c2goc2VsZi5jb25maWcpO1xuXG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gUmVmbGVjdC5hcHBseSh0YXJnZXQsIHNlbGYsIGFyZ3MpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9IGVsc2UgaWYgKGtleSkge1xuXG4gICAgICAgICAgICAgICAgbWVtYmVyID0gbmV3IFByb3h5KG1lbWJlcnNba2V5XSwge1xuICAgICAgICAgICAgICAgICAgICBnZXQ6IGZ1bmN0aW9uKHRhcmdldCwgcHJvcGVydHksIHJlY2VpdmVyKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gUmVmbGVjdC5nZXQodGFyZ2V0LCBwcm9wZXJ0eSwgcmVjZWl2ZXIpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShzZWxmW3N1YmplY3RdLCBrZXksIHtcbiAgICAgICAgICAgICAgICB2YWx1ZTogbWVtYmVyLFxuICAgICAgICAgICAgICAgIHdyaXRhYmxlOiBmYWxzZSxcbiAgICAgICAgICAgICAgICBlbnVtZXJhYmxlOiB0cnVlLFxuICAgICAgICAgICAgICAgIGNvbmZpZ3VyYWJsZTogZmFsc2VcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgfVxufVxuIl19