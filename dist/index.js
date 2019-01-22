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
let Pjs =
/*#__PURE__*/
function () {
  _createClass(Pjs, [{
    key: "_web3",
    // web3 setter
    set: function (value) {
      if (!value || !value.currentProvider) {
        throw (0, _errors.default)(_errors.WEB3_NOT_CONNECTED);
      }

      this.config.web3 = value;
    } // ipfs setter

  }, {
    key: "_ipfs",
    set: function (value) {
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
    get: function () {
      return _web.default;
    } // Native ipfsAPI object

  }, {
    key: "ipfsAPI",
    get: function () {
      return _ipfsApi.default;
    } // Library version

  }, {
    key: "version",
    get: function () {
      return _package.default.version;
    }
  }]);

  function Pjs(options = {}) {
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
        this._web3 = new Pjs.Web3(new Pjs.Web3.providers.HttpProvider(`${options.eth.protocol || 'http'}://${options.eth.host || 'localhost'}:${options.eth.port || ''}`));
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
      let self = this;
      Object.defineProperty(self, 'api', {
        value: {},
        writable: false,
        enumerable: true,
        configurable: false
      });

      if (self.config.web3) {
        let web3 = new Proxy(self.config.web3, {
          get: function (target, property, receiver) {
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
        let ipfs = new Proxy(self.config.ipfs, {
          get: function (target, property, receiver) {
            return Reflect.get(target, property, receiver);
          }
        });
        Object.defineProperty(self.api, 'ipfs', {
          value: ipfs,
          writable: false,
          enumerable: true,
          configurable: false
        });
      }
    } // Populate library methods

  }, {
    key: "_addMembers",
    value: function _addMembers(subject, members) {
      let self = this;
      Object.defineProperty(self, subject, {
        value: {},
        writable: false,
        enumerable: true,
        configurable: false
      });
      /* istanbul ignore next */

      for (let key in members) {
        let member;

        if (typeof members[key] === 'function') {
          member = new Proxy(members[key], {
            apply: function (target, that, args) {
              // add config object to every methods calls
              args.push(self.config);
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9pbmRleC5qcyJdLCJuYW1lcyI6WyJQanMiLCJ2YWx1ZSIsImN1cnJlbnRQcm92aWRlciIsIldFQjNfTk9UX0NPTk5FQ1RFRCIsImNvbmZpZyIsIndlYjMiLCJpcGZzIiwiV2ViMyIsImlwZnNBUEkiLCJwanNQYWNrYWdlIiwidmVyc2lvbiIsIm9wdGlvbnMiLCJpc01ldGFNYXNrIiwiZXRoIiwicHJvdmlkZXIiLCJfd2ViMyIsInByb3ZpZGVycyIsIkh0dHBQcm92aWRlciIsInByb3RvY29sIiwiaG9zdCIsInBvcnQiLCJjb250cmFjdHMiLCJhZGRyZXNzZXMiLCJfYWRkTWVtYmVycyIsInBhbmRvcmEiLCJrZXJuZWxzIiwiZGF0YXNldHMiLCJqb2JzIiwid29ya2VycyIsInBhbiIsImVjb25vbWljIiwiX2lwZnMiLCJfYWRkQXBpTWVtYmVycyIsInNlbGYiLCJPYmplY3QiLCJkZWZpbmVQcm9wZXJ0eSIsIndyaXRhYmxlIiwiZW51bWVyYWJsZSIsImNvbmZpZ3VyYWJsZSIsIlByb3h5IiwiZ2V0IiwidGFyZ2V0IiwicHJvcGVydHkiLCJyZWNlaXZlciIsIlJlZmxlY3QiLCJhcGkiLCJzdWJqZWN0IiwibWVtYmVycyIsImtleSIsIm1lbWJlciIsImFwcGx5IiwidGhhdCIsImFyZ3MiLCJwdXNoIl0sIm1hcHBpbmdzIjoiQUFBQTs7Ozs7Ozs7QUFTQTs7Ozs7OztBQUVBOztBQUNBOztBQUVBOztBQUNBOztBQUlBOztBQUNBOztBQUNBOztBQUNBOztBQUNBOztBQUNBOztBQUNBOztBQUNBOzs7Ozs7Ozs7Ozs7QUFFQTtJQUNxQkEsRzs7Ozs7QUFpQmpCO21CQUNVQyxLLEVBQU87QUFFYixVQUFJLENBQUNBLEtBQUQsSUFBVSxDQUFDQSxLQUFLLENBQUNDLGVBQXJCLEVBQXNDO0FBQ2xDLGNBQU0scUJBQVNDLDBCQUFULENBQU47QUFDSDs7QUFFRCxXQUFLQyxNQUFMLENBQVlDLElBQVosR0FBbUJKLEtBQW5CO0FBQ0gsSyxDQUVEOzs7O21CQUNV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QUFqQixFQUEyQkMsUUFBM0IsRUFBcUM7QUFDdEMscUJBQU9DLE9BQU8sQ0FBQ0osR0FBUixDQUFZQyxNQUFaLEVBQW9CQyxRQUFwQixFQUE4QkMsUUFBOUIsQ0FBUDtBQUNIO0FBSDRCLFdBQXhCLENBQVQ7QUFLSDs7QUFFRFQsUUFBQUEsTUFBTSxDQUFDQyxjQUFQLENBQXNCRixJQUFJLENBQUNhLE9BQUQsQ0FBMUIsRUFBcUNFLEdBQXJDLEVBQTBDO0FBQ3RDL0MsVUFBQUEsS0FBSyxFQUFFZ0QsTUFEK0I7QUFFdENiLFVBQUFBLFFBQVEsRUFBRSxLQUY0QjtBQUd0Q0MsVUFBQUEsVUFBVSxFQUFFLElBSDBCO0FBSXRDQyxVQUFBQSxZQUFZLEVBQUU7QUFKd0IsU0FBMUM7QUFNSDtBQUNKIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBQeXJyaGEgSnNcbiAqIFBhbmRvcmEgUHlycmhhIEphdmFzY3JpcHQgbGlicmFyeVxuICogXG4gKiBAZmlsZSBpbmRleC5qc1xuICogQGF1dGhvciBLb3N0aWFudHluIFNteXJub3YgPGtvc3R5c2hAZ21haWwuY29tPlxuICogQGRhdGUgMjAxOFxuICovXG5cbid1c2Ugc3RyaWN0JztcblxuaW1wb3J0IFdlYjMgZnJvbSAnd2ViMyc7XG5pbXBvcnQgaXBmc0FQSSBmcm9tICdpcGZzLWFwaSc7XG5cbmltcG9ydCBwanNQYWNrYWdlIGZyb20gJy4uL3BhY2thZ2UuanNvbic7XG5pbXBvcnQgcGpzRXJyb3IsIHtcbiAgICBXRUIzX05PVF9DT05ORUNURURcbn0gZnJvbSAnLi9oZWxwZXJzL2Vycm9ycyc7XG5cbmltcG9ydCAqIGFzIHBhbmRvcmEgZnJvbSAnLi9wYW5kb3JhJztcbmltcG9ydCAqIGFzIGtlcm5lbHMgZnJvbSAnLi9rZXJuZWxzJztcbmltcG9ydCAqIGFzIGRhdGFzZXRzIGZyb20gJy4vZGF0YXNldHMnO1xuaW1wb3J0ICogYXMgam9icyBmcm9tICcuL2pvYnMnO1xuaW1wb3J0ICogYXMgd29ya2VycyBmcm9tICcuL3dvcmtlcnMnO1xuaW1wb3J0ICogYXMgaXBmcyBmcm9tICcuL2lwZnMnO1xuaW1wb3J0ICogYXMgcGFuIGZyb20gJy4vcGFuJztcbmltcG9ydCAqIGFzIGVjb25vbWljIGZyb20gJy4vZWNvbm9taWMnO1xuXG4vKiogUGpzIGNsYXNzICovXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBQanMge1xuXG4gICAgLy8gTmF0aXZlIFdlYjMgb2JqZWN0XG4gICAgc3RhdGljIGdldCBXZWIzKCkge1xuICAgICAgICByZXR1cm4gV2ViMztcbiAgICB9XG5cbiAgICAvLyBOYXRpdmUgaXBmc0FQSSBvYmplY3RcbiAgICBzdGF0aWMgZ2V0IGlwZnNBUEkoKSB7XG4gICAgICAgIHJldHVybiBpcGZzQVBJO1xuICAgIH1cblxuICAgIC8vIExpYnJhcnkgdmVyc2lvblxuICAgIHN0YXRpYyBnZXQgdmVyc2lvbigpIHtcbiAgICAgICAgcmV0dXJuIHBqc1BhY2thZ2UudmVyc2lvbjtcbiAgICB9XG5cbiAgICAvLyB3ZWIzIHNldHRlclxuICAgIHNldCBfd2ViMyh2YWx1ZSkge1xuXG4gICAgICAgIGlmICghdmFsdWUgfHwgIXZhbHVlLmN1cnJlbnRQcm92aWRlcikge1xuICAgICAgICAgICAgdGhyb3cgcGpzRXJyb3IoV0VCM19OT1RfQ09OTkVDVEVEKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMuY29uZmlnLndlYjMgPSB2YWx1ZTtcbiAgICB9XG5cbiAgICAvLyBpcGZzIHNldHRlclxuICAgIHNldCBfaXBmcyh2YWx1ZSkge1xuXG4gICAgICAgIC8vIEB0b2RvIEFkZCBpcGZzIGNvbm5lY3Rpb24gdmFsaWRhdGlvblxuICAgICAgICB0aGlzLmNvbmZpZy5pcGZzID0gdmFsdWU7XG4gICAgfVxuXG4gICAgLyoqIE9wdGlvbnMgZXhhbXBsZVxuICAgIFxuICAgIHtcbiAgICAgICAgZXRoOiB7XG4gICAgICAgICAgICBwcm92aWRlcjogPGV4dGVybmFsX3Byb3ZpZGVyPixcbiAgICAgICAgICAgIC8vIG9yXG4gICAgICAgICAgICBwcm90b2NvbDogJ2h0dHAnLFxuICAgICAgICAgICAgaG9zdDogJ2xvY2FsaG9zdCcsXG4gICAgICAgICAgICBwb3J0OiAnJ1xuICAgICAgICB9LFxuICAgICAgICBpcGZzOiB7XG4gICAgICAgICAgICBwcm90b2NvbDogJ2h0dHAnLFxuICAgICAgICAgICAgaG9zdDogJ2xvY2FsaG9zdCcsXG4gICAgICAgICAgICBwb3J0OiA1MDAxXG4gICAgICAgIH0sXG4gICAgICAgIGNvbnRyYWN0czoge1xuICAgICAgICAgICAgS2VybmVsLCAgLy8gY29udHJhY3QganNvblxuICAgICAgICAgICAgRGF0YXNldCAgLy8gY29udHJhY3QganNvblxuICAgICAgICB9LFxuICAgICAgICBhZGRyZXNzZXM6IHtcbiAgICAgICAgICAgIFBhbmRvcmE6ICcweDU4ZTY2Yjc5OTI4Y2ZiMzYyYjUzYzE4NWE2YTFmZGVkODgyYmIwN2QnLFxuICAgICAgICAgICAgUGFuZG9yYU1hcmtldDogJzB4NjE0MjAyOWFiYjIxZWYyZTBiZmZkZThkNDNmMTVjNjRmMzc1MGZlNidcbiAgICAgICAgfVxuICAgIH1cbiAgICAgXG4gICAgKi9cbiAgICAvKipcbiAgICAgKiBDcmVhdGVzIGFuIGluc3RhbmNlIG9mIFBqcy5cbiAgICAgKiBAcGFyYW0ge09iamVjdH0gb3B0aW9uc1xuICAgICAqIEBtZW1iZXJvZiBQanNcbiAgICAgKi9cbiAgICBjb25zdHJ1Y3RvcihvcHRpb25zID0ge30pIHtcbiAgICAgICAgLy8gQHRvZG8gSW1wbGVtZW50IG9wdGlvbnMgb2JqZWN0IHZhbGlkYXRpb25cbiAgICAgICAgdGhpcy52ZXJzaW9uID0gcGpzUGFja2FnZS52ZXJzaW9uO1xuICAgICAgICB0aGlzLmNvbmZpZyA9IHt9O1xuICAgICAgICB0aGlzLmlzTWV0YU1hc2sgPSBmYWxzZTtcblxuICAgICAgICBpZiAob3B0aW9ucy5ldGgpIHtcblxuICAgICAgICAgICAgaWYgKG9wdGlvbnMuZXRoLnByb3ZpZGVyKSB7XG5cbiAgICAgICAgICAgICAgICB0aGlzLl93ZWIzID0gbmV3IFBqcy5XZWIzKG9wdGlvbnMuZXRoLnByb3ZpZGVyKTtcblxuICAgICAgICAgICAgICAgIGlmIChvcHRpb25zLmV0aC5wcm92aWRlci5pc01ldGFNYXNrKSB7XG4gICAgICAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgICAgICAgICB0aGlzLmlzTWV0YU1hc2sgPSB0cnVlO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgXG4gICAgICAgICAgICAgICAgdGhpcy5fd2ViMyA9IG5ldyBQanMuV2ViMyhuZXcgUGpzLldlYjMucHJvdmlkZXJzLkh0dHBQcm92aWRlcihgJHtvcHRpb25zLmV0aC5wcm90b2NvbCB8fCAnaHR0cCd9Oi8vJHtvcHRpb25zLmV0aC5ob3N0IHx8ICdsb2NhbGhvc3QnfToke29wdGlvbnMuZXRoLnBvcnQgfHwgJyd9YCkpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICB0aGlzLmNvbmZpZy5jb250cmFjdHMgPSBvcHRpb25zLmNvbnRyYWN0cyB8fCB7fTsvLyBAdG9kbyBWYWxpZGF0ZSBtaW5pbXVtIFwicmVxdWlyZWRcIiBjb250cmFjdHMgc2V0IFxuICAgICAgICAgICAgdGhpcy5jb25maWcuYWRkcmVzc2VzID0gb3B0aW9ucy5hZGRyZXNzZXMgfHwge307Ly8gQHRvZG8gVmFsaWRhdGUgYWRkcmVzc2VzIFwicmVxdWlyZWRcIiBvcHRpb25cblxuICAgICAgICAgICAgdGhpcy5fYWRkTWVtYmVycygncGFuZG9yYScsIHBhbmRvcmEpO1xuICAgICAgICAgICAgdGhpcy5fYWRkTWVtYmVycygna2VybmVscycsIGtlcm5lbHMpO1xuICAgICAgICAgICAgdGhpcy5fYWRkTWVtYmVycygnZGF0YXNldHMnLCBkYXRhc2V0cyk7XG4gICAgICAgICAgICB0aGlzLl9hZGRNZW1iZXJzKCdqb2JzJywgam9icyk7XG4gICAgICAgICAgICB0aGlzLl9hZGRNZW1iZXJzKCd3b3JrZXJzJywgd29ya2Vycyk7XG4gICAgICAgICAgICB0aGlzLl9hZGRNZW1iZXJzKCdwYW4nLCBwYW4pO1xuICAgICAgICAgICAgdGhpcy5fYWRkTWVtYmVycygnZWNvbm9taWMnLCBlY29ub21pYyk7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAob3B0aW9ucy5pcGZzKSB7XG5cbiAgICAgICAgICAgIHRoaXMuX2lwZnMgPSBQanMuaXBmc0FQSShcbiAgICAgICAgICAgICAgICBvcHRpb25zLmlwZnMuaG9zdCwgXG4gICAgICAgICAgICAgICAgb3B0aW9ucy5pcGZzLnBvcnQsIFxuICAgICAgICAgICAgICAgIHsgXG4gICAgICAgICAgICAgICAgICAgIHByb3RvY29sOiBvcHRpb25zLmlwZnMucHJvdG9jb2xcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICApO1xuXG4gICAgICAgICAgICB0aGlzLl9hZGRNZW1iZXJzKCdpcGZzJywgaXBmcyk7XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLl9hZGRBcGlNZW1iZXJzKCk7XG4gICAgfVxuXG4gICAgLy8gZGlyZWN0IGFwaXMgcmVmZXJlbmNlc1xuICAgIF9hZGRBcGlNZW1iZXJzKCkge1xuICAgICAgICBsZXQgc2VsZiA9IHRoaXM7XG5cbiAgICAgICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KHNlbGYsICdhcGknLCB7XG4gICAgICAgICAgICB2YWx1ZToge30sXG4gICAgICAgICAgICB3cml0YWJsZTogZmFsc2UsXG4gICAgICAgICAgICBlbnVtZXJhYmxlOiB0cnVlLFxuICAgICAgICAgICAgY29uZmlndXJhYmxlOiBmYWxzZVxuICAgICAgICB9KTtcblxuICAgICAgICBpZiAoc2VsZi5jb25maWcud2ViMykge1xuXG4gICAgICAgICAgICBsZXQgd2ViMyA9IG5ldyBQcm94eShzZWxmLmNvbmZpZy53ZWIzLCB7XG4gICAgICAgICAgICAgICAgZ2V0OiBmdW5jdGlvbih0YXJnZXQsIHByb3BlcnR5LCByZWNlaXZlcikge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gUmVmbGVjdC5nZXQodGFyZ2V0LCBwcm9wZXJ0eSwgcmVjZWl2ZXIpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkoc2VsZi5hcGksICd3ZWIzJywge1xuICAgICAgICAgICAgICAgIHZhbHVlOiB3ZWIzLFxuICAgICAgICAgICAgICAgIHdyaXRhYmxlOiBmYWxzZSxcbiAgICAgICAgICAgICAgICBlbnVtZXJhYmxlOiB0cnVlLFxuICAgICAgICAgICAgICAgIGNvbmZpZ3VyYWJsZTogZmFsc2VcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHNlbGYuY29uZmlnLmlwZnMpIHtcblxuICAgICAgICAgICAgbGV0IGlwZnMgPSBuZXcgUHJveHkoc2VsZi5jb25maWcuaXBmcywge1xuICAgICAgICAgICAgICAgIGdldDogZnVuY3Rpb24odGFyZ2V0LCBwcm9wZXJ0eSwgcmVjZWl2ZXIpIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIFJlZmxlY3QuZ2V0KHRhcmdldCwgcHJvcGVydHksIHJlY2VpdmVyKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KHNlbGYuYXBpLCAnaXBmcycsIHtcbiAgICAgICAgICAgICAgICB2YWx1ZTogaXBmcyxcbiAgICAgICAgICAgICAgICB3cml0YWJsZTogZmFsc2UsXG4gICAgICAgICAgICAgICAgZW51bWVyYWJsZTogdHJ1ZSxcbiAgICAgICAgICAgICAgICBjb25maWd1cmFibGU6IGZhbHNlXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIC8vIFBvcHVsYXRlIGxpYnJhcnkgbWV0aG9kc1xuICAgIF9hZGRNZW1iZXJzKHN1YmplY3QsIG1lbWJlcnMpIHtcbiAgICAgICAgbGV0IHNlbGYgPSB0aGlzO1xuXG4gICAgICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShzZWxmLCBzdWJqZWN0LCB7XG4gICAgICAgICAgICB2YWx1ZToge30sXG4gICAgICAgICAgICB3cml0YWJsZTogZmFsc2UsXG4gICAgICAgICAgICBlbnVtZXJhYmxlOiB0cnVlLFxuICAgICAgICAgICAgY29uZmlndXJhYmxlOiBmYWxzZVxuICAgICAgICB9KTtcblxuICAgICAgICAvKiBpc3RhbmJ1bCBpZ25vcmUgbmV4dCAqL1xuICAgICAgICBmb3IgKGxldCBrZXkgaW4gbWVtYmVycykge1xuICAgICAgICAgICAgbGV0IG1lbWJlcjtcbiAgICAgICAgICAgIFxuICAgICAgICAgICAgaWYgKHR5cGVvZiBtZW1iZXJzW2tleV0gPT09ICdmdW5jdGlvbicpIHtcblxuICAgICAgICAgICAgICAgIG1lbWJlciA9IG5ldyBQcm94eShtZW1iZXJzW2tleV0sIHtcbiAgICAgICAgICAgICAgICAgICAgYXBwbHk6IGZ1bmN0aW9uKHRhcmdldCwgdGhhdCwgYXJncykge1xuICAgICAgICAgICAgICAgICAgICAgICAgLy8gYWRkIGNvbmZpZyBvYmplY3QgdG8gZXZlcnkgbWV0aG9kcyBjYWxsc1xuICAgICAgICAgICAgICAgICAgICAgICAgYXJncy5wdXNoKHNlbGYuY29uZmlnKTtcblxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIFJlZmxlY3QuYXBwbHkodGFyZ2V0LCBzZWxmLCBhcmdzKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfSBlbHNlIGlmIChrZXkpIHtcblxuICAgICAgICAgICAgICAgIG1lbWJlciA9IG5ldyBQcm94eShtZW1iZXJzW2tleV0sIHtcbiAgICAgICAgICAgICAgICAgICAgZ2V0OiBmdW5jdGlvbih0YXJnZXQsIHByb3BlcnR5LCByZWNlaXZlcikge1xuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIFJlZmxlY3QuZ2V0KHRhcmdldCwgcHJvcGVydHksIHJlY2VpdmVyKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkoc2VsZltzdWJqZWN0XSwga2V5LCB7XG4gICAgICAgICAgICAgICAgdmFsdWU6IG1lbWJlcixcbiAgICAgICAgICAgICAgICB3cml0YWJsZTogZmFsc2UsXG4gICAgICAgICAgICAgICAgZW51bWVyYWJsZTogdHJ1ZSxcbiAgICAgICAgICAgICAgICBjb25maWd1cmFibGU6IGZhbHNlXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgIH1cbn1cbiJdfQ==