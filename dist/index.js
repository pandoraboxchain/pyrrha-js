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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9pbmRleC5qcyJdLCJuYW1lcyI6WyJQanMiLCJXZWIzIiwiaXBmc0FQSSIsInZlcnNpb24iLCJwanNQYWNrYWdlIiwiX3dlYjMiLCJ2YWx1ZSIsImN1cnJlbnRQcm92aWRlciIsIldFQjNfTk9UX0NPTk5FQ1RFRCIsImNvbmZpZyIsIndlYjMiLCJfaXBmcyIsImlwZnMiLCJjb25zdHJ1Y3RvciIsIm9wdGlvbnMiLCJpc01ldGFNYXNrIiwiZXRoIiwicHJvdmlkZXIiLCJwcm92aWRlcnMiLCJIdHRwUHJvdmlkZXIiLCJwcm90b2NvbCIsImhvc3QiLCJwb3J0IiwiY29udHJhY3RzIiwiYWRkcmVzc2VzIiwiX2FkZE1lbWJlcnMiLCJwYW5kb3JhIiwia2VybmVscyIsImRhdGFzZXRzIiwiam9icyIsIndvcmtlcnMiLCJfYWRkQXBpTWVtYmVycyIsIk9iamVjdCIsImRlZmluZVByb3BlcnR5Iiwid3JpdGFibGUiLCJlbnVtZXJhYmxlIiwiY29uZmlndXJhYmxlIiwiUHJveHkiLCJnZXQiLCJ0YXJnZXQiLCJwcm9wZXJ0eSIsInJlY2VpdmVyIiwiUmVmbGVjdCIsImFwaSIsInN1YmplY3QiLCJtZW1iZXJzIiwic2VsZiIsImtleSIsIm1lbWJlciIsImFwcGx5IiwidGhhdCIsImFyZ3MiLCJwdXNoIiwibW9kdWxlIiwiZXhwb3J0cyJdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7Ozs7O0FBU0E7O0FBRUE7O0FBQ0E7O0FBRUE7O0FBQ0E7O0FBSUE7O0FBQ0E7O0FBQ0E7O0FBQ0E7O0FBQ0E7O0FBQ0E7Ozs7OztBQUVBO0FBQ0EsTUFBTUEsR0FBTixDQUFVO0FBRU47QUFDQSxhQUFXQyxJQUFYLEdBQWtCO0FBQ2QsV0FBT0EsWUFBUDtBQUNILEdBTEssQ0FPTjs7O0FBQ0EsYUFBV0MsT0FBWCxHQUFxQjtBQUNqQixXQUFPQSxnQkFBUDtBQUNILEdBVkssQ0FZTjs7O0FBQ0EsYUFBV0MsT0FBWCxHQUFxQjtBQUNqQixXQUFPQyxpQkFBV0QsT0FBbEI7QUFDSCxH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UUFBM0IsRUFBcUM7QUFDdEMsbUJBQU9DLE9BQU8sQ0FBQ0osR0FBUixDQUFZQyxNQUFaLEVBQW9CQyxRQUFwQixFQUE4QkMsUUFBOUIsQ0FBUDtBQUNIO0FBSDRCLFNBQXhCLENBQVQ7QUFLSDs7QUFFRFQsTUFBQUEsTUFBTSxDQUFDQyxjQUFQLENBQXNCLEtBQUtXLE9BQUwsQ0FBdEIsRUFBcUNHLEdBQXJDLEVBQTBDO0FBQ3RDekMsUUFBQUEsS0FBSyxFQUFFMEMsTUFEK0I7QUFFdENkLFFBQUFBLFFBQVEsRUFBRSxLQUY0QjtBQUd0Q0MsUUFBQUEsVUFBVSxFQUFFLEtBSDBCO0FBSXRDQyxRQUFBQSxZQUFZLEVBQUU7QUFKd0IsT0FBMUM7QUFNSDtBQUNKOztBQXBNSzs7QUF1TVZpQixNQUFNLENBQUNDLE9BQVAsR0FBaUJ0RCxHQUFqQiIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogUHlycmhhIEpzXG4gKiBQYW5kb3JhIFB5cnJoYSBKYXZhc2NyaXB0IGxpYnJhcnlcbiAqIFxuICogQGZpbGUgaW5kZXguanNcbiAqIEBhdXRob3IgS29zdGlhbnR5biBTbXlybm92IDxrb3N0eXNoQGdtYWlsLmNvbT5cbiAqIEBkYXRlIDIwMThcbiAqL1xuXG4ndXNlIHN0cmljdCc7XG5cbmltcG9ydCBXZWIzIGZyb20gJ3dlYjMnO1xuaW1wb3J0IGlwZnNBUEkgZnJvbSAnaXBmcy1hcGknO1xuXG5pbXBvcnQgcGpzUGFja2FnZSBmcm9tICcuLi9wYWNrYWdlLmpzb24nO1xuaW1wb3J0IHBqc0Vycm9yLCB7XG4gICAgV0VCM19OT1RfQ09OTkVDVEVEXG59IGZyb20gJy4vaGVscGVycy9lcnJvcnMnO1xuXG5pbXBvcnQgKiBhcyBwYW5kb3JhIGZyb20gJy4vcGFuZG9yYSc7XG5pbXBvcnQgKiBhcyBrZXJuZWxzIGZyb20gJy4va2VybmVscyc7XG5pbXBvcnQgKiBhcyBkYXRhc2V0cyBmcm9tICcuL2RhdGFzZXRzJztcbmltcG9ydCAqIGFzIGpvYnMgZnJvbSAnLi9qb2JzJztcbmltcG9ydCAqIGFzIHdvcmtlcnMgZnJvbSAnLi93b3JrZXJzJztcbmltcG9ydCAqIGFzIGlwZnMgZnJvbSAnLi9pcGZzJztcblxuLyoqIFBqcyBjbGFzcyAqL1xuY2xhc3MgUGpzIHtcblxuICAgIC8vIE5hdGl2ZSBXZWIzIG9iamVjdFxuICAgIHN0YXRpYyBnZXQgV2ViMygpIHtcbiAgICAgICAgcmV0dXJuIFdlYjM7XG4gICAgfVxuXG4gICAgLy8gTmF0aXZlIGlwZnNBUEkgb2JqZWN0XG4gICAgc3RhdGljIGdldCBpcGZzQVBJKCkge1xuICAgICAgICByZXR1cm4gaXBmc0FQSTtcbiAgICB9XG5cbiAgICAvLyBMaWJyYXJ5IHZlcnNpb25cbiAgICBzdGF0aWMgZ2V0IHZlcnNpb24oKSB7XG4gICAgICAgIHJldHVybiBwanNQYWNrYWdlLnZlcnNpb247XG4gICAgfVxuXG4gICAgLy8gd2ViMyBzZXR0ZXJcbiAgICBzZXQgX3dlYjModmFsdWUpIHtcblxuICAgICAgICBpZiAoIXZhbHVlIHx8ICF2YWx1ZS5jdXJyZW50UHJvdmlkZXIpIHtcbiAgICAgICAgICAgIHRocm93IHBqc0Vycm9yKFdFQjNfTk9UX0NPTk5FQ1RFRCk7XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLmNvbmZpZy53ZWIzID0gdmFsdWU7XG4gICAgfVxuXG4gICAgLy8gaXBmcyBzZXR0ZXJcbiAgICBzZXQgX2lwZnModmFsdWUpIHtcblxuICAgICAgICAvLyBAdG9kbyBBZGQgaXBmcyBjb25uZWN0aW9uIHZhbGlkYXRpb25cbiAgICAgICAgdGhpcy5jb25maWcuaXBmcyA9IHZhbHVlO1xuICAgIH1cblxuICAgIC8qKiBPcHRpb25zIGV4YW1wbGVcbiAgICBcbiAgICB7XG4gICAgICAgIGV0aDoge1xuICAgICAgICAgICAgcHJvdmlkZXI6IDxleHRlcm5hbF9wcm92aWRlcj4sXG4gICAgICAgICAgICAvLyBvclxuICAgICAgICAgICAgcHJvdG9jb2w6ICdodHRwJyxcbiAgICAgICAgICAgIGhvc3Q6ICdsb2NhbGhvc3QnLFxuICAgICAgICAgICAgcG9ydDogJydcbiAgICAgICAgfSxcbiAgICAgICAgaXBmczoge1xuICAgICAgICAgICAgcHJvdG9jb2w6ICdodHRwJyxcbiAgICAgICAgICAgIGhvc3Q6ICdsb2NhbGhvc3QnLFxuICAgICAgICAgICAgcG9ydDogNTAwMVxuICAgICAgICB9LFxuICAgICAgICBjb250cmFjdHM6IHtcbiAgICAgICAgICAgIEtlcm5lbCwgIC8vIGNvbnRyYWN0IGpzb25cbiAgICAgICAgICAgIERhdGFzZXQgIC8vIGNvbnRyYWN0IGpzb25cbiAgICAgICAgfSxcbiAgICAgICAgYWRkcmVzc2VzOiB7XG4gICAgICAgICAgICBQYW5kb3JhOiAnMHg1OGU2NmI3OTkyOGNmYjM2MmI1M2MxODVhNmExZmRlZDg4MmJiMDdkJyxcbiAgICAgICAgICAgIFBhbmRvcmFNYXJrZXQ6ICcweDYxNDIwMjlhYmIyMWVmMmUwYmZmZGU4ZDQzZjE1YzY0ZjM3NTBmZTYnXG4gICAgICAgIH1cbiAgICB9XG4gICAgIFxuICAgICovXG4gICAgLyoqXG4gICAgICogQ3JlYXRlcyBhbiBpbnN0YW5jZSBvZiBQanMuXG4gICAgICogQHBhcmFtIHtPYmplY3R9IG9wdGlvbnNcbiAgICAgKiBAbWVtYmVyb2YgUGpzXG4gICAgICovXG4gICAgY29uc3RydWN0b3Iob3B0aW9ucyA9IHt9KSB7XG4gICAgICAgIC8vIEB0b2RvIEltcGxlbWVudCBvcHRpb25zIG9iamVjdCB2YWxpZGF0aW9uXG4gICAgICAgIHRoaXMudmVyc2lvbiA9IHBqc1BhY2thZ2UudmVyc2lvbjtcbiAgICAgICAgdGhpcy5jb25maWcgPSB7fTtcbiAgICAgICAgdGhpcy5pc01ldGFNYXNrID0gZmFsc2U7XG5cbiAgICAgICAgaWYgKG9wdGlvbnMuZXRoKSB7XG5cbiAgICAgICAgICAgIGlmIChvcHRpb25zLmV0aC5wcm92aWRlcikge1xuXG4gICAgICAgICAgICAgICAgdGhpcy5fd2ViMyA9IG5ldyBQanMuV2ViMyhvcHRpb25zLmV0aC5wcm92aWRlcik7XG5cbiAgICAgICAgICAgICAgICBpZiAob3B0aW9ucy5ldGgucHJvdmlkZXIuaXNNZXRhTWFzaykge1xuICAgICAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5pc01ldGFNYXNrID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgIFxuICAgICAgICAgICAgICAgIHRoaXMuX3dlYjMgPSBuZXcgUGpzLldlYjMobmV3IFBqcy5XZWIzLnByb3ZpZGVycy5IdHRwUHJvdmlkZXIoYCR7b3B0aW9ucy5ldGgucHJvdG9jb2wgfHwgJ2h0dHAnfTovLyR7b3B0aW9ucy5ldGguaG9zdCB8fCAnbG9jYWxob3N0J306JHtvcHRpb25zLmV0aC5wb3J0IHx8ICcnfWApKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgdGhpcy5jb25maWcuY29udHJhY3RzID0gb3B0aW9ucy5jb250cmFjdHMgfHwge307Ly8gQHRvZG8gVmFsaWRhdGUgbWluaW11bSBcInJlcXVpcmVkXCIgY29udHJhY3RzIHNldCBcbiAgICAgICAgICAgIHRoaXMuY29uZmlnLmFkZHJlc3NlcyA9IG9wdGlvbnMuYWRkcmVzc2VzIHx8IHt9Oy8vIEB0b2RvIFZhbGlkYXRlIGFkZHJlc3NlcyBcInJlcXVpcmVkXCIgb3B0aW9uXG5cbiAgICAgICAgICAgIHRoaXMuX2FkZE1lbWJlcnMoJ3BhbmRvcmEnLCBwYW5kb3JhKTtcbiAgICAgICAgICAgIHRoaXMuX2FkZE1lbWJlcnMoJ2tlcm5lbHMnLCBrZXJuZWxzKTtcbiAgICAgICAgICAgIHRoaXMuX2FkZE1lbWJlcnMoJ2RhdGFzZXRzJywgZGF0YXNldHMpO1xuICAgICAgICAgICAgdGhpcy5fYWRkTWVtYmVycygnam9icycsIGpvYnMpO1xuICAgICAgICAgICAgdGhpcy5fYWRkTWVtYmVycygnd29ya2VycycsIHdvcmtlcnMpO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKG9wdGlvbnMuaXBmcykge1xuXG4gICAgICAgICAgICB0aGlzLl9pcGZzID0gUGpzLmlwZnNBUEkoXG4gICAgICAgICAgICAgICAgb3B0aW9ucy5pcGZzLmhvc3QsIFxuICAgICAgICAgICAgICAgIG9wdGlvbnMuaXBmcy5wb3J0LCBcbiAgICAgICAgICAgICAgICB7IFxuICAgICAgICAgICAgICAgICAgICBwcm90b2NvbDogb3B0aW9ucy5pcGZzLnByb3RvY29sXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgKTtcblxuICAgICAgICAgICAgdGhpcy5fYWRkTWVtYmVycygnaXBmcycsIGlwZnMpO1xuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy5fYWRkQXBpTWVtYmVycygpO1xuICAgIH1cblxuICAgIC8vIGRpcmVjdCBhcGlzIHJlZmVyZW5jZXNcbiAgICBfYWRkQXBpTWVtYmVycygpIHtcblxuICAgICAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkodGhpcywgJ2FwaScsIHtcbiAgICAgICAgICAgIHZhbHVlOiB7fSxcbiAgICAgICAgICAgIHdyaXRhYmxlOiBmYWxzZSxcbiAgICAgICAgICAgIGVudW1lcmFibGU6IGZhbHNlLFxuICAgICAgICAgICAgY29uZmlndXJhYmxlOiBmYWxzZVxuICAgICAgICB9KTtcblxuICAgICAgICBpZiAodGhpcy5jb25maWcud2ViMykge1xuXG4gICAgICAgICAgICBsZXQgd2ViMyA9IG5ldyBQcm94eSh0aGlzLmNvbmZpZy53ZWIzLCB7XG4gICAgICAgICAgICAgICAgZ2V0OiBmdW5jdGlvbih0YXJnZXQsIHByb3BlcnR5LCByZWNlaXZlcikge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gUmVmbGVjdC5nZXQodGFyZ2V0LCBwcm9wZXJ0eSwgcmVjZWl2ZXIpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkodGhpcy5hcGksICd3ZWIzJywge1xuICAgICAgICAgICAgICAgIHZhbHVlOiB3ZWIzLFxuICAgICAgICAgICAgICAgIHdyaXRhYmxlOiBmYWxzZSxcbiAgICAgICAgICAgICAgICBlbnVtZXJhYmxlOiBmYWxzZSxcbiAgICAgICAgICAgICAgICBjb25maWd1cmFibGU6IGZhbHNlXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmICh0aGlzLmNvbmZpZy5pcGZzKSB7XG5cbiAgICAgICAgICAgIGxldCBpcGZzID0gbmV3IFByb3h5KHRoaXMuY29uZmlnLmlwZnMsIHtcbiAgICAgICAgICAgICAgICBnZXQ6IGZ1bmN0aW9uKHRhcmdldCwgcHJvcGVydHksIHJlY2VpdmVyKSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBSZWZsZWN0LmdldCh0YXJnZXQsIHByb3BlcnR5LCByZWNlaXZlcik7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eSh0aGlzLmFwaSwgJ2lwZnMnLCB7XG4gICAgICAgICAgICAgICAgdmFsdWU6IGlwZnMsXG4gICAgICAgICAgICAgICAgd3JpdGFibGU6IGZhbHNlLFxuICAgICAgICAgICAgICAgIGVudW1lcmFibGU6IGZhbHNlLFxuICAgICAgICAgICAgICAgIGNvbmZpZ3VyYWJsZTogZmFsc2VcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgLy8gUG9wdWxhdGUgbGlicmFyeSBtZXRob2RzXG4gICAgX2FkZE1lbWJlcnMoc3ViamVjdCwgbWVtYmVycykge1xuICAgICAgICBsZXQgc2VsZiA9IHRoaXM7XG5cbiAgICAgICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KHNlbGYsIHN1YmplY3QsIHtcbiAgICAgICAgICAgIHZhbHVlOiB7fSxcbiAgICAgICAgICAgIHdyaXRhYmxlOiBmYWxzZSxcbiAgICAgICAgICAgIGVudW1lcmFibGU6IHRydWUsXG4gICAgICAgICAgICBjb25maWd1cmFibGU6IGZhbHNlXG4gICAgICAgIH0pO1xuXG4gICAgICAgIC8qIGlzdGFuYnVsIGlnbm9yZSBuZXh0ICovXG4gICAgICAgIGZvciAobGV0IGtleSBpbiBtZW1iZXJzKSB7XG4gICAgICAgICAgICBsZXQgbWVtYmVyO1xuICAgICAgICAgICAgXG4gICAgICAgICAgICBpZiAodHlwZW9mIG1lbWJlcnNba2V5XSA9PT0gJ2Z1bmN0aW9uJykge1xuXG4gICAgICAgICAgICAgICAgbWVtYmVyID0gbmV3IFByb3h5KG1lbWJlcnNba2V5XSwge1xuICAgICAgICAgICAgICAgICAgICBhcHBseTogZnVuY3Rpb24odGFyZ2V0LCB0aGF0LCBhcmdzKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAvLyBhZGQgY29uZmlnIG9iamVjdCB0byBldmVyeSBtZXRob2RzIGNhbGxzXG4gICAgICAgICAgICAgICAgICAgICAgICBhcmdzLnB1c2goc2VsZi5jb25maWcpO1xuXG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gUmVmbGVjdC5hcHBseSh0YXJnZXQsIHNlbGYsIGFyZ3MpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9IGVsc2UgaWYgKGtleSkge1xuXG4gICAgICAgICAgICAgICAgbWVtYmVyID0gbmV3IFByb3h5KG1lbWJlcnNba2V5XSwge1xuICAgICAgICAgICAgICAgICAgICBnZXQ6IGZ1bmN0aW9uKHRhcmdldCwgcHJvcGVydHksIHJlY2VpdmVyKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gUmVmbGVjdC5nZXQodGFyZ2V0LCBwcm9wZXJ0eSwgcmVjZWl2ZXIpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eSh0aGlzW3N1YmplY3RdLCBrZXksIHtcbiAgICAgICAgICAgICAgICB2YWx1ZTogbWVtYmVyLFxuICAgICAgICAgICAgICAgIHdyaXRhYmxlOiBmYWxzZSxcbiAgICAgICAgICAgICAgICBlbnVtZXJhYmxlOiBmYWxzZSxcbiAgICAgICAgICAgICAgICBjb25maWd1cmFibGU6IGZhbHNlXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgIH1cbn1cblxubW9kdWxlLmV4cG9ydHMgPSBQanM7XG4iXX0=