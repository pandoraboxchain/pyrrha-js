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

    this.config.web3 = value;
  } // ipfs setter


  set _ipfs(value) {
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


  constructor(options = {}) {
    this.version = _package.default.version;
    this.config = {};

    if (options.eth) {
      this.config.contracts = options.contracts || {}; // @todo Validate minimum "required" contracts set 

      this.config.addresses = options.addresses || {}; // @todo Validate addresses "required" option

      if (window && window.web3 && window.web3.currentProvider && window.web3.currentProvider.isMetaMask) {
        this._web3 = new Pjs.Web3(window.web3.currentProvider);
      } else {
        this._web3 = new Pjs.Web3(`${options.eth.protocol || 'http'}://${options.eth.host || 'localhost'}:${options.eth.port || ''}`);
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9pbmRleC5qcyJdLCJuYW1lcyI6WyJQanMiLCJXZWIzIiwiaXBmc0FQSSIsIl93ZWIzIiwidmFsdWUiLCJjdXJyZW50UHJvdmlkZXIiLCJXRUIzX05PVF9DT05ORUNURUQiLCJjb25maWciLCJ3ZWIzIiwiX2lwZnMiLCJpcGZzIiwiY29uc3RydWN0b3IiLCJvcHRpb25zIiwidmVyc2lvbiIsInBqc1BhY2thZ2UiLCJldGgiLCJjb250cmFjdHMiLCJhZGRyZXNzZXMiLCJ3aW5kb3ciLCJpc01ldGFNYXNrIiwicHJvdG9jb2wiLCJob3N0IiwicG9ydCIsIl9hZGRNZW1iZXJzIiwia2VybmVscyIsImRhdGFzZXRzIiwiam9icyIsIndvcmtlcnMiLCJfYWRkQXBpTWVtYmVycyIsIk9iamVjdCIsImRlZmluZVByb3BlcnR5Iiwid3JpdGFibGUiLCJlbnVtZXJhYmxlIiwiY29uZmlndXJhYmxlIiwiUHJveHkiLCJnZXQiLCJ0YXJnZXQiLCJwcm9wZXJ0eSIsInJlY2VpdmVyIiwiUmVmbGVjdCIsImFwaSIsInN1YmplY3QiLCJtZW1iZXJzIiwic2VsZiIsImtleSIsIm1lbWJlciIsImFwcGx5IiwidGhhdCIsImFyZ3MiLCJwdXNoIiwibW9kdWxlIiwiZXhwb3J0cyJdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7Ozs7O0FBU0E7O0FBRUE7O0FBQ0E7O0FBRUE7O0FBQ0E7O0FBSUE7O0FBQ0E7O0FBQ0E7O0FBQ0E7O0FBQ0E7Ozs7OztBQUVBO0FBQ0EsTUFBTUEsR0FBTixDQUFVO0FBRU47QUFDQSxhQUFXQyxJQUFYLEdBQWtCO0FBQ2QsV0FBT0EsWUFBUDtBQUNILEdBTEssQ0FPTjs7O0FBQ0EsYUFBV0MsT0FBWCxHQUFxQjtBQUNqQixXQUFPQSxnQkFBUDtBQUNILEdBVkssQ0FZTjs7O0FBQ0EsTUFBSUMsS0FBSixDQUFVQyxLQUFWLEVBQWlCO0FBRWIsUUFBSSxDQUFDQSxNQUFNQyxlQUFYLEVBQTRCO0FBQ3hCLFlBQU0scUJBQVNDLDBCQUFULENBQU47QUFD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UDtBQUNIO0FBUDRCLFNBQXhCLENBQVQ7QUFTSCxPQVhELE1BV08sSUFBSUosR0FBSixFQUFTO0FBRVpDLGlCQUFTLElBQUlYLEtBQUosQ0FBVVEsUUFBUUUsR0FBUixDQUFWLEVBQXdCO0FBQzdCVCxlQUFLLFVBQVNDLE1BQVQsRUFBaUJDLFFBQWpCLEVBQTJCQyxRQUEzQixFQUFxQztBQUN0QyxtQkFBT0MsUUFBUUosR0FBUixDQUFZQyxNQUFaLEVBQW9CQyxRQUFwQixFQUE4QkMsUUFBOUIsQ0FBUDtBQUNIO0FBSDRCLFNBQXhCLENBQVQ7QUFLSDs7QUFFRFQsYUFBT0MsY0FBUCxDQUFzQixLQUFLVyxPQUFMLENBQXRCLEVBQXFDRyxHQUFyQyxFQUEwQztBQUN0Q3hDLGVBQU95QyxNQUQrQjtBQUV0Q2Qsa0JBQVUsS0FGNEI7QUFHdENDLG9CQUFZLEtBSDBCO0FBSXRDQyxzQkFBYztBQUp3QixPQUExQztBQU1IO0FBQ0o7O0FBdkxLOztBQTBMVmlCLE9BQU9DLE9BQVAsR0FBaUJuRCxHQUFqQiIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogUHlycmhhIEpzXG4gKiBQYW5kb3JhIFB5cnJoYSBKYXZhc2NyaXB0IGxpYnJhcnlcbiAqIFxuICogQGZpbGUgaW5kZXguanNcbiAqIEBhdXRob3IgS29zdGlhbnR5biBTbXlybm92IDxrb3N0eXNoQGdtYWlsLmNvbT5cbiAqIEBkYXRlIDIwMThcbiAqL1xuXG4ndXNlIHN0cmljdCc7XG5cbmltcG9ydCBXZWIzIGZyb20gJ3dlYjMnO1xuaW1wb3J0IGlwZnNBUEkgZnJvbSAnaXBmcy1hcGknO1xuXG5pbXBvcnQgcGpzUGFja2FnZSBmcm9tICcuLi9wYWNrYWdlLmpzb24nO1xuaW1wb3J0IHBqc0Vycm9yLCB7XG4gICAgV0VCM19OT1RfQ09OTkVDVEVEXG59IGZyb20gJy4vaGVscGVycy9lcnJvcnMnO1xuXG5pbXBvcnQgKiBhcyBrZXJuZWxzIGZyb20gJy4va2VybmVscyc7XG5pbXBvcnQgKiBhcyBkYXRhc2V0cyBmcm9tICcuL2RhdGFzZXRzJztcbmltcG9ydCAqIGFzIGpvYnMgZnJvbSAnLi9qb2JzJztcbmltcG9ydCAqIGFzIHdvcmtlcnMgZnJvbSAnLi93b3JrZXJzJztcbmltcG9ydCAqIGFzIGlwZnMgZnJvbSAnLi9pcGZzJztcblxuLyoqIFBqcyBjbGFzcyAqL1xuY2xhc3MgUGpzIHtcblxuICAgIC8vIE5hdGl2ZSBXZWIzIG9iamVjdFxuICAgIHN0YXRpYyBnZXQgV2ViMygpIHtcbiAgICAgICAgcmV0dXJuIFdlYjM7XG4gICAgfVxuXG4gICAgLy8gTmF0aXZlIGlwZnNBUEkgb2JqZWN0XG4gICAgc3RhdGljIGdldCBpcGZzQVBJKCkge1xuICAgICAgICByZXR1cm4gaXBmc0FQSTtcbiAgICB9XG5cbiAgICAvLyB3ZWIzIHNldHRlclxuICAgIHNldCBfd2ViMyh2YWx1ZSkge1xuXG4gICAgICAgIGlmICghdmFsdWUuY3VycmVudFByb3ZpZGVyKSB7XG4gICAgICAgICAgICB0aHJvdyBwanNFcnJvcihXRUIzX05PVF9DT05ORUNURUQpO1xuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy5jb25maWcud2ViMyA9IHZhbHVlO1xuICAgIH1cblxuICAgIC8vIGlwZnMgc2V0dGVyXG4gICAgc2V0IF9pcGZzKHZhbHVlKSB7XG5cbiAgICAgICAgLy8gQHRvZG8gQWRkIGlwZnMgY29ubmVjdGlvbiB2YWxpZGF0aW9uXG4gICAgICAgIHRoaXMuY29uZmlnLmlwZnMgPSB2YWx1ZTtcbiAgICB9XG5cbiAgICAvKiogT3B0aW9ucyBleGFtcGxlXG4gICAgXG4gICAge1xuICAgICAgICBldGg6IHtcbiAgICAgICAgICAgIHByb3RvY29sOiAnaHR0cCcsXG4gICAgICAgICAgICBob3N0OiAnbG9jYWxob3N0JyxcbiAgICAgICAgICAgIHBvcnQ6ICcnXG4gICAgICAgIH0sXG4gICAgICAgIGlwZnM6IHtcbiAgICAgICAgICAgIHByb3RvY29sOiAnaHR0cCcsXG4gICAgICAgICAgICBob3N0OiAnbG9jYWxob3N0JyxcbiAgICAgICAgICAgIHBvcnQ6IDUwMDFcbiAgICAgICAgfSxcbiAgICAgICAgY29udHJhY3RzOiB7XG4gICAgICAgICAgICBLZXJuZWwsICAvLyBjb250cmFjdCBqc29uXG4gICAgICAgICAgICBEYXRhc2V0ICAvLyBjb250cmFjdCBqc29uXG4gICAgICAgIH0sXG4gICAgICAgIGFkZHJlc3Nlczoge1xuICAgICAgICAgICAgcGFuZG9yYTogJzB4NThlNjZiNzk5MjhjZmIzNjJiNTNjMTg1YTZhMWZkZWQ4ODJiYjA3ZCcsXG4gICAgICAgICAgICBtYXJrZXQ6ICcweDYxNDIwMjlhYmIyMWVmMmUwYmZmZGU4ZDQzZjE1YzY0ZjM3NTBmZTYnXG4gICAgICAgIH1cbiAgICB9XG4gICAgIFxuICAgICovXG4gICAgLyoqXG4gICAgICogQ3JlYXRlcyBhbiBpbnN0YW5jZSBvZiBQanMuXG4gICAgICogQHBhcmFtIHtPYmplY3R9IG9wdGlvbnNcbiAgICAgKiBAbWVtYmVyb2YgUGpzXG4gICAgICovXG4gICAgY29uc3RydWN0b3Iob3B0aW9ucyA9IHt9KSB7XG4gICAgICAgIHRoaXMudmVyc2lvbiA9IHBqc1BhY2thZ2UudmVyc2lvbjtcbiAgICAgICAgdGhpcy5jb25maWcgPSB7fTtcblxuICAgICAgICBpZiAob3B0aW9ucy5ldGgpIHtcblxuICAgICAgICAgICAgdGhpcy5jb25maWcuY29udHJhY3RzID0gb3B0aW9ucy5jb250cmFjdHMgfHwge307Ly8gQHRvZG8gVmFsaWRhdGUgbWluaW11bSBcInJlcXVpcmVkXCIgY29udHJhY3RzIHNldCBcbiAgICAgICAgICAgIHRoaXMuY29uZmlnLmFkZHJlc3NlcyA9IG9wdGlvbnMuYWRkcmVzc2VzIHx8IHt9Oy8vIEB0b2RvIFZhbGlkYXRlIGFkZHJlc3NlcyBcInJlcXVpcmVkXCIgb3B0aW9uXG5cbiAgICAgICAgICAgIGlmICh3aW5kb3cgJiYgd2luZG93LndlYjMgJiYgXG4gICAgICAgICAgICAgICAgd2luZG93LndlYjMuY3VycmVudFByb3ZpZGVyICYmIFxuICAgICAgICAgICAgICAgIHdpbmRvdy53ZWIzLmN1cnJlbnRQcm92aWRlci5pc01ldGFNYXNrKSB7XG4gICAgICAgICAgICAgICAgXG4gICAgICAgICAgICAgICAgdGhpcy5fd2ViMyA9IG5ldyBQanMuV2ViMyh3aW5kb3cud2ViMy5jdXJyZW50UHJvdmlkZXIpOyAgICAgICAgICAgIFxuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICBcbiAgICAgICAgICAgICAgICB0aGlzLl93ZWIzID0gbmV3IFBqcy5XZWIzKGAke29wdGlvbnMuZXRoLnByb3RvY29sIHx8ICdodHRwJ306Ly8ke29wdGlvbnMuZXRoLmhvc3QgfHwgJ2xvY2FsaG9zdCd9OiR7b3B0aW9ucy5ldGgucG9ydCB8fCAnJ31gKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgdGhpcy5fYWRkTWVtYmVycygna2VybmVscycsIGtlcm5lbHMpO1xuICAgICAgICAgICAgdGhpcy5fYWRkTWVtYmVycygnZGF0YXNldHMnLCBkYXRhc2V0cyk7XG4gICAgICAgICAgICB0aGlzLl9hZGRNZW1iZXJzKCdqb2JzJywgam9icyk7XG4gICAgICAgICAgICB0aGlzLl9hZGRNZW1iZXJzKCd3b3JrZXJzJywgd29ya2Vycyk7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAob3B0aW9ucy5pcGZzKSB7XG5cbiAgICAgICAgICAgIHRoaXMuX2lwZnMgPSBQanMuaXBmc0FQSShcbiAgICAgICAgICAgICAgICBvcHRpb25zLmlwZnMuaG9zdCwgXG4gICAgICAgICAgICAgICAgb3B0aW9ucy5pcGZzLnBvcnQsIFxuICAgICAgICAgICAgICAgIHsgXG4gICAgICAgICAgICAgICAgICAgIHByb3RvY29sOiBvcHRpb25zLmlwZnMucHJvdG9jb2xcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICApO1xuXG4gICAgICAgICAgICB0aGlzLl9hZGRNZW1iZXJzKCdpcGZzJywgaXBmcyk7XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLl9hZGRBcGlNZW1iZXJzKCk7XG4gICAgfVxuXG4gICAgLy8gZGlyZWN0IGFwaXMgcmVmZXJlbmNlc1xuICAgIF9hZGRBcGlNZW1iZXJzKCkge1xuXG4gICAgICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eSh0aGlzLCAnYXBpJywge1xuICAgICAgICAgICAgdmFsdWU6IHt9LFxuICAgICAgICAgICAgd3JpdGFibGU6IGZhbHNlLFxuICAgICAgICAgICAgZW51bWVyYWJsZTogZmFsc2UsXG4gICAgICAgICAgICBjb25maWd1cmFibGU6IGZhbHNlXG4gICAgICAgIH0pO1xuXG4gICAgICAgIGlmICh0aGlzLmNvbmZpZy53ZWIzKSB7XG5cbiAgICAgICAgICAgIGxldCB3ZWIzID0gbmV3IFByb3h5KHRoaXMuY29uZmlnLndlYjMsIHtcbiAgICAgICAgICAgICAgICBnZXQ6IGZ1bmN0aW9uKHRhcmdldCwgcHJvcGVydHksIHJlY2VpdmVyKSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBSZWZsZWN0LmdldCh0YXJnZXQsIHByb3BlcnR5LCByZWNlaXZlcik7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eSh0aGlzLmFwaSwgJ3dlYjMnLCB7XG4gICAgICAgICAgICAgICAgdmFsdWU6IHdlYjMsXG4gICAgICAgICAgICAgICAgd3JpdGFibGU6IGZhbHNlLFxuICAgICAgICAgICAgICAgIGVudW1lcmFibGU6IGZhbHNlLFxuICAgICAgICAgICAgICAgIGNvbmZpZ3VyYWJsZTogZmFsc2VcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHRoaXMuY29uZmlnLmlwZnMpIHtcblxuICAgICAgICAgICAgbGV0IGlwZnMgPSBuZXcgUHJveHkodGhpcy5jb25maWcuaXBmcywge1xuICAgICAgICAgICAgICAgIGdldDogZnVuY3Rpb24odGFyZ2V0LCBwcm9wZXJ0eSwgcmVjZWl2ZXIpIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIFJlZmxlY3QuZ2V0KHRhcmdldCwgcHJvcGVydHksIHJlY2VpdmVyKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KHRoaXMuYXBpLCAnaXBmcycsIHtcbiAgICAgICAgICAgICAgICB2YWx1ZTogaXBmcyxcbiAgICAgICAgICAgICAgICB3cml0YWJsZTogZmFsc2UsXG4gICAgICAgICAgICAgICAgZW51bWVyYWJsZTogZmFsc2UsXG4gICAgICAgICAgICAgICAgY29uZmlndXJhYmxlOiBmYWxzZVxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICAvLyBQb3B1bGF0ZSBsaWJyYXJ5IG1ldGhvZHNcbiAgICBfYWRkTWVtYmVycyhzdWJqZWN0LCBtZW1iZXJzKSB7XG4gICAgICAgIGxldCBzZWxmID0gdGhpcztcblxuICAgICAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkoc2VsZiwgc3ViamVjdCwge1xuICAgICAgICAgICAgdmFsdWU6IHt9LFxuICAgICAgICAgICAgd3JpdGFibGU6IGZhbHNlLFxuICAgICAgICAgICAgZW51bWVyYWJsZTogdHJ1ZSxcbiAgICAgICAgICAgIGNvbmZpZ3VyYWJsZTogZmFsc2VcbiAgICAgICAgfSk7XG5cbiAgICAgICAgZm9yIChsZXQga2V5IGluIG1lbWJlcnMpIHtcbiAgICAgICAgICAgIGxldCBtZW1iZXI7XG4gICAgICAgICAgICBcbiAgICAgICAgICAgIGlmICh0eXBlb2YgbWVtYmVyc1trZXldID09PSAnZnVuY3Rpb24nKSB7XG5cbiAgICAgICAgICAgICAgICBtZW1iZXIgPSBuZXcgUHJveHkobWVtYmVyc1trZXldLCB7XG4gICAgICAgICAgICAgICAgICAgIGFwcGx5OiBmdW5jdGlvbih0YXJnZXQsIHRoYXQsIGFyZ3MpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgICAgICAgICAgICAgLy8gYWRkIGNvbmZpZyBvYmplY3QgdG8gZXZlcnkgbWV0aG9kcyBjYWxsc1xuICAgICAgICAgICAgICAgICAgICAgICAgYXJncy5wdXNoKHNlbGYuY29uZmlnKTtcblxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIFJlZmxlY3QuYXBwbHkodGFyZ2V0LCBzZWxmLCBhcmdzKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfSBlbHNlIGlmIChrZXkpIHtcblxuICAgICAgICAgICAgICAgIG1lbWJlciA9IG5ldyBQcm94eShtZW1iZXJzW2tleV0sIHtcbiAgICAgICAgICAgICAgICAgICAgZ2V0OiBmdW5jdGlvbih0YXJnZXQsIHByb3BlcnR5LCByZWNlaXZlcikge1xuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIFJlZmxlY3QuZ2V0KHRhcmdldCwgcHJvcGVydHksIHJlY2VpdmVyKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkodGhpc1tzdWJqZWN0XSwga2V5LCB7XG4gICAgICAgICAgICAgICAgdmFsdWU6IG1lbWJlcixcbiAgICAgICAgICAgICAgICB3cml0YWJsZTogZmFsc2UsXG4gICAgICAgICAgICAgICAgZW51bWVyYWJsZTogZmFsc2UsXG4gICAgICAgICAgICAgICAgY29uZmlndXJhYmxlOiBmYWxzZVxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICB9XG59XG5cbm1vZHVsZS5leHBvcnRzID0gUGpzO1xuIl19