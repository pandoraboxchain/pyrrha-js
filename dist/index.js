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

var pandora = _interopRequireWildcard(require("./pandora"));

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
  } // Library version


  static get version() {
    return _package.default.version;
  } // web3 setter


  set _web3(value) {
    if (!value || !value.currentProvider) {
      throw (0, _errors.default)(_errors.WEB3_NOT_CONNECTED);
    }

    this.config.web3 = value;
  } // ipfs setter


  set _ipfs(value) {
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


  constructor(options = {}) {
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
    }

    if (options.ipfs) {
      this._ipfs = Pjs.ipfsAPI(options.ipfs.host, options.ipfs.port, {
        protocol: options.ipfs.protocol
      });

      this._addMembers('ipfs', ipfs);
    }

    this._addApiMembers();
  } // direct apis references


  _addApiMembers() {
    Object.defineProperty(this, 'api', {
      value: {},
      writable: false,
      enumerable: false,
      configurable: false
    });

    if (this.config.web3) {
      let web3 = new Proxy(this.config.web3, {
        get: function (target, property, receiver) {
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
      let ipfs = new Proxy(this.config.ipfs, {
        get: function (target, property, receiver) {
          return Reflect.get(target, property, receiver);
        }
      });
      Object.defineProperty(this.api, 'ipfs', {
        value: ipfs,
        writable: false,
        enumerable: false,
        configurable: false
      });
    }
  } // Populate library methods


  _addMembers(subject, members) {
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9pbmRleC5qcyJdLCJuYW1lcyI6WyJQanMiLCJXZWIzIiwiaXBmc0FQSSIsInZlcnNpb24iLCJwanNQYWNrYWdlIiwiX3dlYjMiLCJ2YWx1ZSIsImN1cnJlbnRQcm92aWRlciIsIldFQjNfTk9UX0NPTk5FQ1RFRCIsImNvbmZpZyIsIndlYjMiLCJfaXBmcyIsImlwZnMiLCJjb25zdHJ1Y3RvciIsIm9wdGlvbnMiLCJpc01ldGFNYXNrIiwiZXRoIiwicHJvdmlkZXIiLCJwcm92aWRlcnMiLCJIdHRwUHJvdmlkZXIiLCJwcm90b2NvbCIsImhvc3QiLCJwb3J0IiwiY29udHJhY3RzIiwiYWRkcmVzc2VzIiwiX2FkZE1lbWJlcnMiLCJwYW5kb3JhIiwia2VybmVscyIsImRhdGFzZXRzIiwiam9icyIsIndvcmtlcnMiLCJfYWRkQXBpTWVtYmVycyIsIk9iamVjdCIsImRlZmluZVByb3BlcnR5Iiwid3JpdGFibGUiLCJlbnVtZXJhYmxlIiwiY29uZmlndXJhYmxlIiwiUHJveHkiLCJnZXQiLCJ0YXJnZXQiLCJwcm9wZXJ0eSIsInJlY2VpdmVyIiwiUmVmbGVjdCIsImFwaSIsInN1YmplY3QiLCJtZW1iZXJzIiwic2VsZiIsImtleSIsIm1lbWJlciIsImFwcGx5IiwidGhhdCIsImFyZ3MiLCJwdXNoIiwibW9kdWxlIiwiZXhwb3J0cyJdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7Ozs7O0FBU0E7O0FBRUE7O0FBQ0E7O0FBRUE7O0FBQ0E7O0FBSUE7O0FBQ0E7O0FBQ0E7O0FBQ0E7O0FBQ0E7O0FBQ0E7Ozs7OztBQUVBO0FBQ0EsTUFBTUEsR0FBTixDQUFVO0FBRU47QUFDQSxhQUFXQyxJQUFYLEdBQWtCO0FBQ2QsV0FBT0EsWUFBUDtBQUNILEdBTEssQ0FPTjs7O0FBQ0EsYUFBV0MsT0FBWCxHQUFxQjtBQUNqQixXQUFPQSxnQkFBUDtBQUNILEdBVkssQ0FZTjs7O0FBQ0EsYUFBV0MsT0FBWCxHQUFxQjtBQUNqQixXQUFPQyxpQkFBV0QsT0FBbEI7QUFDSCxH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QXlCO0FBQ3JCLFVBQUlHLE1BQUo7O0FBRUEsVUFBSSxPQUFPSCxRQUFRRSxHQUFSLENBQVAsS0FBd0IsVUFBNUIsRUFBd0M7QUFFcENDLGlCQUFTLElBQUlYLEtBQUosQ0FBVVEsUUFBUUUsR0FBUixDQUFWLEVBQXdCO0FBQzdCRSxpQkFBTyxVQUFTVixNQUFULEVBQWlCVyxJQUFqQixFQUF1QkMsSUFBdkIsRUFBNkI7QUFDaEM7QUFDQUEsaUJBQUtDLElBQUwsQ0FBVU4sS0FBS3JDLE1BQWY7QUFFQSxtQkFBT2lDLFFBQVFPLEtBQVIsQ0FBY1YsTUFBZCxFQUFzQk8sSUFBdEIsRUFBNEJLLElBQTVCLENBQVA7QUFDSDtBQU40QixTQUF4QixDQUFUO0FBUUgsT0FWRCxNQVVPLElBQUlKLEdBQUosRUFBUztBQUVaQyxpQkFBUyxJQUFJWCxLQUFKLENBQVVRLFFBQVFFLEdBQVIsQ0FBVixFQUF3QjtBQUM3QlQsZUFBSyxVQUFTQyxNQUFULEVBQWlCQyxRQUFqQixFQUEyQkMsUUFBM0IsRUFBcUM7QUFDdEMsbUJBQU9DLFFBQVFKLEdBQVIsQ0FBWUMsTUFBWixFQUFvQkMsUUFBcEIsRUFBOEJDLFFBQTlCLENBQVA7QUFDSDtBQUg0QixTQUF4QixDQUFUO0FBS0g7O0FBRURULGFBQU9DLGNBQVAsQ0FBc0IsS0FBS1csT0FBTCxDQUF0QixFQUFxQ0csR0FBckMsRUFBMEM7QUFDdEN6QyxlQUFPMEMsTUFEK0I7QUFFdENkLGtCQUFVLEtBRjRCO0FBR3RDQyxvQkFBWSxLQUgwQjtBQUl0Q0Msc0JBQWM7QUFKd0IsT0FBMUM7QUFNSDtBQUNKOztBQXBNSzs7QUF1TVZpQixPQUFPQyxPQUFQLEdBQWlCdEQsR0FBakIiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIFB5cnJoYSBKc1xuICogUGFuZG9yYSBQeXJyaGEgSmF2YXNjcmlwdCBsaWJyYXJ5XG4gKiBcbiAqIEBmaWxlIGluZGV4LmpzXG4gKiBAYXV0aG9yIEtvc3RpYW50eW4gU215cm5vdiA8a29zdHlzaEBnbWFpbC5jb20+XG4gKiBAZGF0ZSAyMDE4XG4gKi9cblxuJ3VzZSBzdHJpY3QnO1xuXG5pbXBvcnQgV2ViMyBmcm9tICd3ZWIzJztcbmltcG9ydCBpcGZzQVBJIGZyb20gJ2lwZnMtYXBpJztcblxuaW1wb3J0IHBqc1BhY2thZ2UgZnJvbSAnLi4vcGFja2FnZS5qc29uJztcbmltcG9ydCBwanNFcnJvciwge1xuICAgIFdFQjNfTk9UX0NPTk5FQ1RFRFxufSBmcm9tICcuL2hlbHBlcnMvZXJyb3JzJztcblxuaW1wb3J0ICogYXMgcGFuZG9yYSBmcm9tICcuL3BhbmRvcmEnO1xuaW1wb3J0ICogYXMga2VybmVscyBmcm9tICcuL2tlcm5lbHMnO1xuaW1wb3J0ICogYXMgZGF0YXNldHMgZnJvbSAnLi9kYXRhc2V0cyc7XG5pbXBvcnQgKiBhcyBqb2JzIGZyb20gJy4vam9icyc7XG5pbXBvcnQgKiBhcyB3b3JrZXJzIGZyb20gJy4vd29ya2Vycyc7XG5pbXBvcnQgKiBhcyBpcGZzIGZyb20gJy4vaXBmcyc7XG5cbi8qKiBQanMgY2xhc3MgKi9cbmNsYXNzIFBqcyB7XG5cbiAgICAvLyBOYXRpdmUgV2ViMyBvYmplY3RcbiAgICBzdGF0aWMgZ2V0IFdlYjMoKSB7XG4gICAgICAgIHJldHVybiBXZWIzO1xuICAgIH1cblxuICAgIC8vIE5hdGl2ZSBpcGZzQVBJIG9iamVjdFxuICAgIHN0YXRpYyBnZXQgaXBmc0FQSSgpIHtcbiAgICAgICAgcmV0dXJuIGlwZnNBUEk7XG4gICAgfVxuXG4gICAgLy8gTGlicmFyeSB2ZXJzaW9uXG4gICAgc3RhdGljIGdldCB2ZXJzaW9uKCkge1xuICAgICAgICByZXR1cm4gcGpzUGFja2FnZS52ZXJzaW9uO1xuICAgIH1cblxuICAgIC8vIHdlYjMgc2V0dGVyXG4gICAgc2V0IF93ZWIzKHZhbHVlKSB7XG5cbiAgICAgICAgaWYgKCF2YWx1ZSB8fCAhdmFsdWUuY3VycmVudFByb3ZpZGVyKSB7XG4gICAgICAgICAgICB0aHJvdyBwanNFcnJvcihXRUIzX05PVF9DT05ORUNURUQpO1xuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy5jb25maWcud2ViMyA9IHZhbHVlO1xuICAgIH1cblxuICAgIC8vIGlwZnMgc2V0dGVyXG4gICAgc2V0IF9pcGZzKHZhbHVlKSB7XG5cbiAgICAgICAgLy8gQHRvZG8gQWRkIGlwZnMgY29ubmVjdGlvbiB2YWxpZGF0aW9uXG4gICAgICAgIHRoaXMuY29uZmlnLmlwZnMgPSB2YWx1ZTtcbiAgICB9XG5cbiAgICAvKiogT3B0aW9ucyBleGFtcGxlXG4gICAgXG4gICAge1xuICAgICAgICBldGg6IHtcbiAgICAgICAgICAgIHByb3ZpZGVyOiA8ZXh0ZXJuYWxfcHJvdmlkZXI+LFxuICAgICAgICAgICAgLy8gb3JcbiAgICAgICAgICAgIHByb3RvY29sOiAnaHR0cCcsXG4gICAgICAgICAgICBob3N0OiAnbG9jYWxob3N0JyxcbiAgICAgICAgICAgIHBvcnQ6ICcnXG4gICAgICAgIH0sXG4gICAgICAgIGlwZnM6IHtcbiAgICAgICAgICAgIHByb3RvY29sOiAnaHR0cCcsXG4gICAgICAgICAgICBob3N0OiAnbG9jYWxob3N0JyxcbiAgICAgICAgICAgIHBvcnQ6IDUwMDFcbiAgICAgICAgfSxcbiAgICAgICAgY29udHJhY3RzOiB7XG4gICAgICAgICAgICBLZXJuZWwsICAvLyBjb250cmFjdCBqc29uXG4gICAgICAgICAgICBEYXRhc2V0ICAvLyBjb250cmFjdCBqc29uXG4gICAgICAgIH0sXG4gICAgICAgIGFkZHJlc3Nlczoge1xuICAgICAgICAgICAgUGFuZG9yYTogJzB4NThlNjZiNzk5MjhjZmIzNjJiNTNjMTg1YTZhMWZkZWQ4ODJiYjA3ZCcsXG4gICAgICAgICAgICBQYW5kb3JhTWFya2V0OiAnMHg2MTQyMDI5YWJiMjFlZjJlMGJmZmRlOGQ0M2YxNWM2NGYzNzUwZmU2J1xuICAgICAgICB9XG4gICAgfVxuICAgICBcbiAgICAqL1xuICAgIC8qKlxuICAgICAqIENyZWF0ZXMgYW4gaW5zdGFuY2Ugb2YgUGpzLlxuICAgICAqIEBwYXJhbSB7T2JqZWN0fSBvcHRpb25zXG4gICAgICogQG1lbWJlcm9mIFBqc1xuICAgICAqL1xuICAgIGNvbnN0cnVjdG9yKG9wdGlvbnMgPSB7fSkge1xuICAgICAgICAvLyBAdG9kbyBJbXBsZW1lbnQgb3B0aW9ucyBvYmplY3QgdmFsaWRhdGlvblxuICAgICAgICB0aGlzLnZlcnNpb24gPSBwanNQYWNrYWdlLnZlcnNpb247XG4gICAgICAgIHRoaXMuY29uZmlnID0ge307XG4gICAgICAgIHRoaXMuaXNNZXRhTWFzayA9IGZhbHNlO1xuXG4gICAgICAgIGlmIChvcHRpb25zLmV0aCkge1xuXG4gICAgICAgICAgICBpZiAob3B0aW9ucy5ldGgucHJvdmlkZXIpIHtcblxuICAgICAgICAgICAgICAgIHRoaXMuX3dlYjMgPSBuZXcgUGpzLldlYjMob3B0aW9ucy5ldGgucHJvdmlkZXIpO1xuXG4gICAgICAgICAgICAgICAgaWYgKG9wdGlvbnMuZXRoLnByb3ZpZGVyLmlzTWV0YU1hc2spIHtcbiAgICAgICAgICAgICAgICAgICAgXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuaXNNZXRhTWFzayA9IHRydWU7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICBcbiAgICAgICAgICAgICAgICB0aGlzLl93ZWIzID0gbmV3IFBqcy5XZWIzKG5ldyBQanMuV2ViMy5wcm92aWRlcnMuSHR0cFByb3ZpZGVyKGAke29wdGlvbnMuZXRoLnByb3RvY29sIHx8ICdodHRwJ306Ly8ke29wdGlvbnMuZXRoLmhvc3QgfHwgJ2xvY2FsaG9zdCd9OiR7b3B0aW9ucy5ldGgucG9ydCB8fCAnJ31gKSk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHRoaXMuY29uZmlnLmNvbnRyYWN0cyA9IG9wdGlvbnMuY29udHJhY3RzIHx8IHt9Oy8vIEB0b2RvIFZhbGlkYXRlIG1pbmltdW0gXCJyZXF1aXJlZFwiIGNvbnRyYWN0cyBzZXQgXG4gICAgICAgICAgICB0aGlzLmNvbmZpZy5hZGRyZXNzZXMgPSBvcHRpb25zLmFkZHJlc3NlcyB8fCB7fTsvLyBAdG9kbyBWYWxpZGF0ZSBhZGRyZXNzZXMgXCJyZXF1aXJlZFwiIG9wdGlvblxuXG4gICAgICAgICAgICB0aGlzLl9hZGRNZW1iZXJzKCdwYW5kb3JhJywgcGFuZG9yYSk7XG4gICAgICAgICAgICB0aGlzLl9hZGRNZW1iZXJzKCdrZXJuZWxzJywga2VybmVscyk7XG4gICAgICAgICAgICB0aGlzLl9hZGRNZW1iZXJzKCdkYXRhc2V0cycsIGRhdGFzZXRzKTtcbiAgICAgICAgICAgIHRoaXMuX2FkZE1lbWJlcnMoJ2pvYnMnLCBqb2JzKTtcbiAgICAgICAgICAgIHRoaXMuX2FkZE1lbWJlcnMoJ3dvcmtlcnMnLCB3b3JrZXJzKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChvcHRpb25zLmlwZnMpIHtcblxuICAgICAgICAgICAgdGhpcy5faXBmcyA9IFBqcy5pcGZzQVBJKFxuICAgICAgICAgICAgICAgIG9wdGlvbnMuaXBmcy5ob3N0LCBcbiAgICAgICAgICAgICAgICBvcHRpb25zLmlwZnMucG9ydCwgXG4gICAgICAgICAgICAgICAgeyBcbiAgICAgICAgICAgICAgICAgICAgcHJvdG9jb2w6IG9wdGlvbnMuaXBmcy5wcm90b2NvbFxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICk7XG5cbiAgICAgICAgICAgIHRoaXMuX2FkZE1lbWJlcnMoJ2lwZnMnLCBpcGZzKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMuX2FkZEFwaU1lbWJlcnMoKTtcbiAgICB9XG5cbiAgICAvLyBkaXJlY3QgYXBpcyByZWZlcmVuY2VzXG4gICAgX2FkZEFwaU1lbWJlcnMoKSB7XG5cbiAgICAgICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KHRoaXMsICdhcGknLCB7XG4gICAgICAgICAgICB2YWx1ZToge30sXG4gICAgICAgICAgICB3cml0YWJsZTogZmFsc2UsXG4gICAgICAgICAgICBlbnVtZXJhYmxlOiBmYWxzZSxcbiAgICAgICAgICAgIGNvbmZpZ3VyYWJsZTogZmFsc2VcbiAgICAgICAgfSk7XG5cbiAgICAgICAgaWYgKHRoaXMuY29uZmlnLndlYjMpIHtcblxuICAgICAgICAgICAgbGV0IHdlYjMgPSBuZXcgUHJveHkodGhpcy5jb25maWcud2ViMywge1xuICAgICAgICAgICAgICAgIGdldDogZnVuY3Rpb24odGFyZ2V0LCBwcm9wZXJ0eSwgcmVjZWl2ZXIpIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIFJlZmxlY3QuZ2V0KHRhcmdldCwgcHJvcGVydHksIHJlY2VpdmVyKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KHRoaXMuYXBpLCAnd2ViMycsIHtcbiAgICAgICAgICAgICAgICB2YWx1ZTogd2ViMyxcbiAgICAgICAgICAgICAgICB3cml0YWJsZTogZmFsc2UsXG4gICAgICAgICAgICAgICAgZW51bWVyYWJsZTogZmFsc2UsXG4gICAgICAgICAgICAgICAgY29uZmlndXJhYmxlOiBmYWxzZVxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAodGhpcy5jb25maWcuaXBmcykge1xuXG4gICAgICAgICAgICBsZXQgaXBmcyA9IG5ldyBQcm94eSh0aGlzLmNvbmZpZy5pcGZzLCB7XG4gICAgICAgICAgICAgICAgZ2V0OiBmdW5jdGlvbih0YXJnZXQsIHByb3BlcnR5LCByZWNlaXZlcikge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gUmVmbGVjdC5nZXQodGFyZ2V0LCBwcm9wZXJ0eSwgcmVjZWl2ZXIpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkodGhpcy5hcGksICdpcGZzJywge1xuICAgICAgICAgICAgICAgIHZhbHVlOiBpcGZzLFxuICAgICAgICAgICAgICAgIHdyaXRhYmxlOiBmYWxzZSxcbiAgICAgICAgICAgICAgICBlbnVtZXJhYmxlOiBmYWxzZSxcbiAgICAgICAgICAgICAgICBjb25maWd1cmFibGU6IGZhbHNlXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIC8vIFBvcHVsYXRlIGxpYnJhcnkgbWV0aG9kc1xuICAgIF9hZGRNZW1iZXJzKHN1YmplY3QsIG1lbWJlcnMpIHtcbiAgICAgICAgbGV0IHNlbGYgPSB0aGlzO1xuXG4gICAgICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShzZWxmLCBzdWJqZWN0LCB7XG4gICAgICAgICAgICB2YWx1ZToge30sXG4gICAgICAgICAgICB3cml0YWJsZTogZmFsc2UsXG4gICAgICAgICAgICBlbnVtZXJhYmxlOiB0cnVlLFxuICAgICAgICAgICAgY29uZmlndXJhYmxlOiBmYWxzZVxuICAgICAgICB9KTtcblxuICAgICAgICAvKiBpc3RhbmJ1bCBpZ25vcmUgbmV4dCAqL1xuICAgICAgICBmb3IgKGxldCBrZXkgaW4gbWVtYmVycykge1xuICAgICAgICAgICAgbGV0IG1lbWJlcjtcbiAgICAgICAgICAgIFxuICAgICAgICAgICAgaWYgKHR5cGVvZiBtZW1iZXJzW2tleV0gPT09ICdmdW5jdGlvbicpIHtcblxuICAgICAgICAgICAgICAgIG1lbWJlciA9IG5ldyBQcm94eShtZW1iZXJzW2tleV0sIHtcbiAgICAgICAgICAgICAgICAgICAgYXBwbHk6IGZ1bmN0aW9uKHRhcmdldCwgdGhhdCwgYXJncykge1xuICAgICAgICAgICAgICAgICAgICAgICAgLy8gYWRkIGNvbmZpZyBvYmplY3QgdG8gZXZlcnkgbWV0aG9kcyBjYWxsc1xuICAgICAgICAgICAgICAgICAgICAgICAgYXJncy5wdXNoKHNlbGYuY29uZmlnKTtcblxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIFJlZmxlY3QuYXBwbHkodGFyZ2V0LCBzZWxmLCBhcmdzKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfSBlbHNlIGlmIChrZXkpIHtcblxuICAgICAgICAgICAgICAgIG1lbWJlciA9IG5ldyBQcm94eShtZW1iZXJzW2tleV0sIHtcbiAgICAgICAgICAgICAgICAgICAgZ2V0OiBmdW5jdGlvbih0YXJnZXQsIHByb3BlcnR5LCByZWNlaXZlcikge1xuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIFJlZmxlY3QuZ2V0KHRhcmdldCwgcHJvcGVydHksIHJlY2VpdmVyKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkodGhpc1tzdWJqZWN0XSwga2V5LCB7XG4gICAgICAgICAgICAgICAgdmFsdWU6IG1lbWJlcixcbiAgICAgICAgICAgICAgICB3cml0YWJsZTogZmFsc2UsXG4gICAgICAgICAgICAgICAgZW51bWVyYWJsZTogZmFsc2UsXG4gICAgICAgICAgICAgICAgY29uZmlndXJhYmxlOiBmYWxzZVxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICB9XG59XG5cbm1vZHVsZS5leHBvcnRzID0gUGpzO1xuIl19