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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9pbmRleC5qcyJdLCJuYW1lcyI6WyJQanMiLCJXZWIzIiwiaXBmc0FQSSIsInZlcnNpb24iLCJwanNQYWNrYWdlIiwiX3dlYjMiLCJ2YWx1ZSIsImN1cnJlbnRQcm92aWRlciIsIldFQjNfTk9UX0NPTk5FQ1RFRCIsImNvbmZpZyIsIndlYjMiLCJfaXBmcyIsImlwZnMiLCJjb25zdHJ1Y3RvciIsIm9wdGlvbnMiLCJpc01ldGFNYXNrIiwiZXRoIiwicHJvdmlkZXIiLCJwcm92aWRlcnMiLCJIdHRwUHJvdmlkZXIiLCJwcm90b2NvbCIsImhvc3QiLCJwb3J0IiwiY29udHJhY3RzIiwiYWRkcmVzc2VzIiwiX2FkZE1lbWJlcnMiLCJwYW5kb3JhIiwia2VybmVscyIsImRhdGFzZXRzIiwiam9icyIsIndvcmtlcnMiLCJfYWRkQXBpTWVtYmVycyIsIk9iamVjdCIsImRlZmluZVByb3BlcnR5Iiwid3JpdGFibGUiLCJlbnVtZXJhYmxlIiwiY29uZmlndXJhYmxlIiwiUHJveHkiLCJnZXQiLCJ0YXJnZXQiLCJwcm9wZXJ0eSIsInJlY2VpdmVyIiwiUmVmbGVjdCIsImFwaSIsInN1YmplY3QiLCJtZW1iZXJzIiwic2VsZiIsImtleSIsIm1lbWJlciIsImFwcGx5IiwidGhhdCIsImFyZ3MiLCJwdXNoIiwibW9kdWxlIiwiZXhwb3J0cyJdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7Ozs7O0FBU0E7O0FBRUE7O0FBQ0E7O0FBRUE7O0FBQ0E7O0FBSUE7O0FBQ0E7O0FBQ0E7O0FBQ0E7O0FBQ0E7O0FBQ0E7Ozs7OztBQUVBO0FBQ0EsTUFBTUEsR0FBTixDQUFVO0FBRU47QUFDQSxhQUFXQyxJQUFYLEdBQWtCO0FBQ2QsV0FBT0EsWUFBUDtBQUNILEdBTEssQ0FPTjs7O0FBQ0EsYUFBV0MsT0FBWCxHQUFxQjtBQUNqQixXQUFPQSxnQkFBUDtBQUNILEdBVkssQ0FZTjs7O0FBQ0EsYUFBV0MsT0FBWCxHQUFxQjtBQUNqQixXQUFPQyxpQkFBV0QsT0FBbEI7QUFDSCxH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QXlCO0FBQ3JCLFVBQUlHLE1BQUo7O0FBRUEsVUFBSSxPQUFPSCxRQUFRRSxHQUFSLENBQVAsS0FBd0IsVUFBNUIsRUFBd0M7QUFFcENDLGlCQUFTLElBQUlYLEtBQUosQ0FBVVEsUUFBUUUsR0FBUixDQUFWLEVBQXdCO0FBQzdCRSxpQkFBTyxVQUFTVixNQUFULEVBQWlCVyxJQUFqQixFQUF1QkMsSUFBdkIsRUFBNkI7QUFDaEM7QUFDQUEsaUJBQUtDLElBQUwsQ0FBVU4sS0FBS3JDLE1BQWY7QUFFQSxtQkFBT2lDLFFBQVFPLEtBQVIsQ0FBY1YsTUFBZCxFQUFzQk8sSUFBdEIsRUFBNEJLLElBQTVCLENBQVA7QUFDSDtBQU40QixTQUF4QixDQUFUO0FBUUgsT0FWRCxNQVVPLElBQUlKLEdBQUosRUFBUztBQUVaQyxpQkFBUyxJQUFJWCxLQUFKLENBQVVRLFFBQVFFLEdBQVIsQ0FBVixFQUF3QjtBQUM3QlQsZUFBSyxVQUFTQyxNQUFULEVBQWlCQyxRQUFqQixFQUEyQkMsUUFBM0IsRUFBcUM7QUFDdEMsbUJBQU9DLFFBQVFKLEdBQVIsQ0FBWUMsTUFBWixFQUFvQkMsUUFBcEIsRUFBOEJDLFFBQTlCLENBQVA7QUFDSDtBQUg0QixTQUF4QixDQUFUO0FBS0g7O0FBRURULGFBQU9DLGNBQVAsQ0FBc0IsS0FBS1csT0FBTCxDQUF0QixFQUFxQ0csR0FBckMsRUFBMEM7QUFDdEN6QyxlQUFPMEMsTUFEK0I7QUFFdENkLGtCQUFVLEtBRjRCO0FBR3RDQyxvQkFBWSxLQUgwQjtBQUl0Q0Msc0JBQWM7QUFKd0IsT0FBMUM7QUFNSDtBQUNKOztBQXBNSzs7QUF1TVZpQixPQUFPQyxPQUFQLEdBQWlCdEQsR0FBakIiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIFB5cnJoYSBKc1xuICogUGFuZG9yYSBQeXJyaGEgSmF2YXNjcmlwdCBsaWJyYXJ5XG4gKiBcbiAqIEBmaWxlIGluZGV4LmpzXG4gKiBAYXV0aG9yIEtvc3RpYW50eW4gU215cm5vdiA8a29zdHlzaEBnbWFpbC5jb20+XG4gKiBAZGF0ZSAyMDE4XG4gKi9cblxuJ3VzZSBzdHJpY3QnO1xuXG5pbXBvcnQgV2ViMyBmcm9tICd3ZWIzJztcbmltcG9ydCBpcGZzQVBJIGZyb20gJ2lwZnMtYXBpJztcblxuaW1wb3J0IHBqc1BhY2thZ2UgZnJvbSAnLi4vcGFja2FnZS5qc29uJztcbmltcG9ydCBwanNFcnJvciwge1xuICAgIFdFQjNfTk9UX0NPTk5FQ1RFRFxufSBmcm9tICcuL2hlbHBlcnMvZXJyb3JzJztcblxuaW1wb3J0ICogYXMgcGFuZG9yYSBmcm9tICcuL3BhbmRvcmEnO1xuaW1wb3J0ICogYXMga2VybmVscyBmcm9tICcuL2tlcm5lbHMnO1xuaW1wb3J0ICogYXMgZGF0YXNldHMgZnJvbSAnLi9kYXRhc2V0cyc7XG5pbXBvcnQgKiBhcyBqb2JzIGZyb20gJy4vam9icyc7XG5pbXBvcnQgKiBhcyB3b3JrZXJzIGZyb20gJy4vd29ya2Vycyc7XG5pbXBvcnQgKiBhcyBpcGZzIGZyb20gJy4vaXBmcyc7XG5cbi8qKiBQanMgY2xhc3MgKi9cbmNsYXNzIFBqcyB7XG5cbiAgICAvLyBOYXRpdmUgV2ViMyBvYmplY3RcbiAgICBzdGF0aWMgZ2V0IFdlYjMoKSB7XG4gICAgICAgIHJldHVybiBXZWIzO1xuICAgIH1cblxuICAgIC8vIE5hdGl2ZSBpcGZzQVBJIG9iamVjdFxuICAgIHN0YXRpYyBnZXQgaXBmc0FQSSgpIHtcbiAgICAgICAgcmV0dXJuIGlwZnNBUEk7XG4gICAgfVxuXG4gICAgLy8gTGlicmFyeSB2ZXJzaW9uXG4gICAgc3RhdGljIGdldCB2ZXJzaW9uKCkge1xuICAgICAgICByZXR1cm4gcGpzUGFja2FnZS52ZXJzaW9uO1xuICAgIH1cblxuICAgIC8vIHdlYjMgc2V0dGVyXG4gICAgc2V0IF93ZWIzKHZhbHVlKSB7XG5cbiAgICAgICAgaWYgKCF2YWx1ZSB8fCAhdmFsdWUuY3VycmVudFByb3ZpZGVyKSB7XG4gICAgICAgICAgICB0aHJvdyBwanNFcnJvcihXRUIzX05PVF9DT05ORUNURUQpO1xuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy5jb25maWcud2ViMyA9IHZhbHVlO1xuICAgIH1cblxuICAgIC8vIGlwZnMgc2V0dGVyXG4gICAgc2V0IF9pcGZzKHZhbHVlKSB7XG5cbiAgICAgICAgLy8gQHRvZG8gQWRkIGlwZnMgY29ubmVjdGlvbiB2YWxpZGF0aW9uXG4gICAgICAgIHRoaXMuY29uZmlnLmlwZnMgPSB2YWx1ZTtcbiAgICB9XG5cbiAgICAvKiogT3B0aW9ucyBleGFtcGxlXG4gICAgXG4gICAge1xuICAgICAgICBldGg6IHtcbiAgICAgICAgICAgIHByb3ZpZGVyOiA8ZXh0ZXJuYWxfcHJvdmlkZXI+LFxuICAgICAgICAgICAgLy8gb3JcbiAgICAgICAgICAgIHByb3RvY29sOiAnaHR0cCcsXG4gICAgICAgICAgICBob3N0OiAnbG9jYWxob3N0JyxcbiAgICAgICAgICAgIHBvcnQ6ICcnXG4gICAgICAgIH0sXG4gICAgICAgIGlwZnM6IHtcbiAgICAgICAgICAgIHByb3RvY29sOiAnaHR0cCcsXG4gICAgICAgICAgICBob3N0OiAnbG9jYWxob3N0JyxcbiAgICAgICAgICAgIHBvcnQ6IDUwMDFcbiAgICAgICAgfSxcbiAgICAgICAgY29udHJhY3RzOiB7XG4gICAgICAgICAgICBLZXJuZWwsICAvLyBjb250cmFjdCBqc29uXG4gICAgICAgICAgICBEYXRhc2V0ICAvLyBjb250cmFjdCBqc29uXG4gICAgICAgIH0sXG4gICAgICAgIGFkZHJlc3Nlczoge1xuICAgICAgICAgICAgcGFuZG9yYTogJzB4NThlNjZiNzk5MjhjZmIzNjJiNTNjMTg1YTZhMWZkZWQ4ODJiYjA3ZCcsXG4gICAgICAgICAgICBtYXJrZXQ6ICcweDYxNDIwMjlhYmIyMWVmMmUwYmZmZGU4ZDQzZjE1YzY0ZjM3NTBmZTYnXG4gICAgICAgIH1cbiAgICB9XG4gICAgIFxuICAgICovXG4gICAgLyoqXG4gICAgICogQ3JlYXRlcyBhbiBpbnN0YW5jZSBvZiBQanMuXG4gICAgICogQHBhcmFtIHtPYmplY3R9IG9wdGlvbnNcbiAgICAgKiBAbWVtYmVyb2YgUGpzXG4gICAgICovXG4gICAgY29uc3RydWN0b3Iob3B0aW9ucyA9IHt9KSB7XG4gICAgICAgIC8vIEB0b2RvIEltcGxlbWVudCBvcHRpb25zIG9iamVjdCB2YWxpZGF0aW9uXG4gICAgICAgIHRoaXMudmVyc2lvbiA9IHBqc1BhY2thZ2UudmVyc2lvbjtcbiAgICAgICAgdGhpcy5jb25maWcgPSB7fTtcbiAgICAgICAgdGhpcy5pc01ldGFNYXNrID0gZmFsc2U7XG5cbiAgICAgICAgaWYgKG9wdGlvbnMuZXRoKSB7XG5cbiAgICAgICAgICAgIGlmIChvcHRpb25zLmV0aC5wcm92aWRlcikge1xuXG4gICAgICAgICAgICAgICAgdGhpcy5fd2ViMyA9IG5ldyBQanMuV2ViMyhvcHRpb25zLmV0aC5wcm92aWRlcik7XG5cbiAgICAgICAgICAgICAgICBpZiAob3B0aW9ucy5ldGgucHJvdmlkZXIuaXNNZXRhTWFzaykge1xuICAgICAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5pc01ldGFNYXNrID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgIFxuICAgICAgICAgICAgICAgIHRoaXMuX3dlYjMgPSBuZXcgUGpzLldlYjMobmV3IFBqcy5XZWIzLnByb3ZpZGVycy5IdHRwUHJvdmlkZXIoYCR7b3B0aW9ucy5ldGgucHJvdG9jb2wgfHwgJ2h0dHAnfTovLyR7b3B0aW9ucy5ldGguaG9zdCB8fCAnbG9jYWxob3N0J306JHtvcHRpb25zLmV0aC5wb3J0IHx8ICcnfWApKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgdGhpcy5jb25maWcuY29udHJhY3RzID0gb3B0aW9ucy5jb250cmFjdHMgfHwge307Ly8gQHRvZG8gVmFsaWRhdGUgbWluaW11bSBcInJlcXVpcmVkXCIgY29udHJhY3RzIHNldCBcbiAgICAgICAgICAgIHRoaXMuY29uZmlnLmFkZHJlc3NlcyA9IG9wdGlvbnMuYWRkcmVzc2VzIHx8IHt9Oy8vIEB0b2RvIFZhbGlkYXRlIGFkZHJlc3NlcyBcInJlcXVpcmVkXCIgb3B0aW9uXG5cbiAgICAgICAgICAgIHRoaXMuX2FkZE1lbWJlcnMoJ3BhbmRvcmEnLCBwYW5kb3JhKTtcbiAgICAgICAgICAgIHRoaXMuX2FkZE1lbWJlcnMoJ2tlcm5lbHMnLCBrZXJuZWxzKTtcbiAgICAgICAgICAgIHRoaXMuX2FkZE1lbWJlcnMoJ2RhdGFzZXRzJywgZGF0YXNldHMpO1xuICAgICAgICAgICAgdGhpcy5fYWRkTWVtYmVycygnam9icycsIGpvYnMpO1xuICAgICAgICAgICAgdGhpcy5fYWRkTWVtYmVycygnd29ya2VycycsIHdvcmtlcnMpO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKG9wdGlvbnMuaXBmcykge1xuXG4gICAgICAgICAgICB0aGlzLl9pcGZzID0gUGpzLmlwZnNBUEkoXG4gICAgICAgICAgICAgICAgb3B0aW9ucy5pcGZzLmhvc3QsIFxuICAgICAgICAgICAgICAgIG9wdGlvbnMuaXBmcy5wb3J0LCBcbiAgICAgICAgICAgICAgICB7IFxuICAgICAgICAgICAgICAgICAgICBwcm90b2NvbDogb3B0aW9ucy5pcGZzLnByb3RvY29sXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgKTtcblxuICAgICAgICAgICAgdGhpcy5fYWRkTWVtYmVycygnaXBmcycsIGlwZnMpO1xuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy5fYWRkQXBpTWVtYmVycygpO1xuICAgIH1cblxuICAgIC8vIGRpcmVjdCBhcGlzIHJlZmVyZW5jZXNcbiAgICBfYWRkQXBpTWVtYmVycygpIHtcblxuICAgICAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkodGhpcywgJ2FwaScsIHtcbiAgICAgICAgICAgIHZhbHVlOiB7fSxcbiAgICAgICAgICAgIHdyaXRhYmxlOiBmYWxzZSxcbiAgICAgICAgICAgIGVudW1lcmFibGU6IGZhbHNlLFxuICAgICAgICAgICAgY29uZmlndXJhYmxlOiBmYWxzZVxuICAgICAgICB9KTtcblxuICAgICAgICBpZiAodGhpcy5jb25maWcud2ViMykge1xuXG4gICAgICAgICAgICBsZXQgd2ViMyA9IG5ldyBQcm94eSh0aGlzLmNvbmZpZy53ZWIzLCB7XG4gICAgICAgICAgICAgICAgZ2V0OiBmdW5jdGlvbih0YXJnZXQsIHByb3BlcnR5LCByZWNlaXZlcikge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gUmVmbGVjdC5nZXQodGFyZ2V0LCBwcm9wZXJ0eSwgcmVjZWl2ZXIpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkodGhpcy5hcGksICd3ZWIzJywge1xuICAgICAgICAgICAgICAgIHZhbHVlOiB3ZWIzLFxuICAgICAgICAgICAgICAgIHdyaXRhYmxlOiBmYWxzZSxcbiAgICAgICAgICAgICAgICBlbnVtZXJhYmxlOiBmYWxzZSxcbiAgICAgICAgICAgICAgICBjb25maWd1cmFibGU6IGZhbHNlXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmICh0aGlzLmNvbmZpZy5pcGZzKSB7XG5cbiAgICAgICAgICAgIGxldCBpcGZzID0gbmV3IFByb3h5KHRoaXMuY29uZmlnLmlwZnMsIHtcbiAgICAgICAgICAgICAgICBnZXQ6IGZ1bmN0aW9uKHRhcmdldCwgcHJvcGVydHksIHJlY2VpdmVyKSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBSZWZsZWN0LmdldCh0YXJnZXQsIHByb3BlcnR5LCByZWNlaXZlcik7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eSh0aGlzLmFwaSwgJ2lwZnMnLCB7XG4gICAgICAgICAgICAgICAgdmFsdWU6IGlwZnMsXG4gICAgICAgICAgICAgICAgd3JpdGFibGU6IGZhbHNlLFxuICAgICAgICAgICAgICAgIGVudW1lcmFibGU6IGZhbHNlLFxuICAgICAgICAgICAgICAgIGNvbmZpZ3VyYWJsZTogZmFsc2VcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgLy8gUG9wdWxhdGUgbGlicmFyeSBtZXRob2RzXG4gICAgX2FkZE1lbWJlcnMoc3ViamVjdCwgbWVtYmVycykge1xuICAgICAgICBsZXQgc2VsZiA9IHRoaXM7XG5cbiAgICAgICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KHNlbGYsIHN1YmplY3QsIHtcbiAgICAgICAgICAgIHZhbHVlOiB7fSxcbiAgICAgICAgICAgIHdyaXRhYmxlOiBmYWxzZSxcbiAgICAgICAgICAgIGVudW1lcmFibGU6IHRydWUsXG4gICAgICAgICAgICBjb25maWd1cmFibGU6IGZhbHNlXG4gICAgICAgIH0pO1xuXG4gICAgICAgIC8qIGlzdGFuYnVsIGlnbm9yZSBuZXh0ICovXG4gICAgICAgIGZvciAobGV0IGtleSBpbiBtZW1iZXJzKSB7XG4gICAgICAgICAgICBsZXQgbWVtYmVyO1xuICAgICAgICAgICAgXG4gICAgICAgICAgICBpZiAodHlwZW9mIG1lbWJlcnNba2V5XSA9PT0gJ2Z1bmN0aW9uJykge1xuXG4gICAgICAgICAgICAgICAgbWVtYmVyID0gbmV3IFByb3h5KG1lbWJlcnNba2V5XSwge1xuICAgICAgICAgICAgICAgICAgICBhcHBseTogZnVuY3Rpb24odGFyZ2V0LCB0aGF0LCBhcmdzKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAvLyBhZGQgY29uZmlnIG9iamVjdCB0byBldmVyeSBtZXRob2RzIGNhbGxzXG4gICAgICAgICAgICAgICAgICAgICAgICBhcmdzLnB1c2goc2VsZi5jb25maWcpO1xuXG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gUmVmbGVjdC5hcHBseSh0YXJnZXQsIHNlbGYsIGFyZ3MpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9IGVsc2UgaWYgKGtleSkge1xuXG4gICAgICAgICAgICAgICAgbWVtYmVyID0gbmV3IFByb3h5KG1lbWJlcnNba2V5XSwge1xuICAgICAgICAgICAgICAgICAgICBnZXQ6IGZ1bmN0aW9uKHRhcmdldCwgcHJvcGVydHksIHJlY2VpdmVyKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gUmVmbGVjdC5nZXQodGFyZ2V0LCBwcm9wZXJ0eSwgcmVjZWl2ZXIpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eSh0aGlzW3N1YmplY3RdLCBrZXksIHtcbiAgICAgICAgICAgICAgICB2YWx1ZTogbWVtYmVyLFxuICAgICAgICAgICAgICAgIHdyaXRhYmxlOiBmYWxzZSxcbiAgICAgICAgICAgICAgICBlbnVtZXJhYmxlOiBmYWxzZSxcbiAgICAgICAgICAgICAgICBjb25maWd1cmFibGU6IGZhbHNlXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgIH1cbn1cblxubW9kdWxlLmV4cG9ydHMgPSBQanM7XG4iXX0=