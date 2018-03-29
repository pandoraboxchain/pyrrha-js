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
        this._web3 = new Pjs.Web3(`${options.eth.protocol || 'http'}://${options.eth.host || 'localhost'}:${options.eth.port || ''}`);
      }

      this.config.contracts = options.contracts || {}; // @todo Validate minimum "required" contracts set 

      this.config.addresses = options.addresses || {}; // @todo Validate addresses "required" option

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9pbmRleC5qcyJdLCJuYW1lcyI6WyJQanMiLCJXZWIzIiwiaXBmc0FQSSIsIl93ZWIzIiwidmFsdWUiLCJjdXJyZW50UHJvdmlkZXIiLCJXRUIzX05PVF9DT05ORUNURUQiLCJjb25maWciLCJ3ZWIzIiwiX2lwZnMiLCJpcGZzIiwiY29uc3RydWN0b3IiLCJvcHRpb25zIiwidmVyc2lvbiIsInBqc1BhY2thZ2UiLCJpc01ldGFNYXNrIiwiZXRoIiwicHJvdmlkZXIiLCJwcm90b2NvbCIsImhvc3QiLCJwb3J0IiwiY29udHJhY3RzIiwiYWRkcmVzc2VzIiwiX2FkZE1lbWJlcnMiLCJrZXJuZWxzIiwiZGF0YXNldHMiLCJqb2JzIiwid29ya2VycyIsIl9hZGRBcGlNZW1iZXJzIiwiT2JqZWN0IiwiZGVmaW5lUHJvcGVydHkiLCJ3cml0YWJsZSIsImVudW1lcmFibGUiLCJjb25maWd1cmFibGUiLCJQcm94eSIsImdldCIsInRhcmdldCIsInByb3BlcnR5IiwicmVjZWl2ZXIiLCJSZWZsZWN0IiwiYXBpIiwic3ViamVjdCIsIm1lbWJlcnMiLCJzZWxmIiwia2V5IiwibWVtYmVyIiwiYXBwbHkiLCJ0aGF0IiwiYXJncyIsInB1c2giLCJtb2R1bGUiLCJleHBvcnRzIl0sIm1hcHBpbmdzIjoiQUFBQTs7Ozs7Ozs7QUFTQTs7QUFFQTs7QUFDQTs7QUFFQTs7QUFDQTs7QUFJQTs7QUFDQTs7QUFDQTs7QUFDQTs7QUFDQTs7Ozs7O0FBRUE7QUFDQSxNQUFNQSxHQUFOLENBQVU7QUFFTjtBQUNBLGFBQVdDLElBQVgsR0FBa0I7QUFDZCxXQUFPQSxZQUFQO0FBQ0gsR0FMSyxDQU9OOzs7QUFDQSxhQUFXQyxPQUFYLEdBQXFCO0FBQ2pCLFdBQU9BLGdCQUFQO0FBQ0gsR0FWSyxDQVlOOzs7QUFDQSxNQUFJQyxLQUFKLENBQVVDLEtBQVYsRUFBaUI7QUFFYixRQUFJLENBQUNBLEtBQUQsSUFBVSxDQUFDQSxNQUFNQyxlQUFyQixFQUFzQztBQUNsQyxZQUFNLHFC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QVVOLEtBQUtwQyxNQUFmO0FBRUEsbUJBQU9nQyxRQUFRTyxLQUFSLENBQWNWLE1BQWQsRUFBc0JPLElBQXRCLEVBQTRCSyxJQUE1QixDQUFQO0FBQ0g7QUFONEIsU0FBeEIsQ0FBVDtBQVFILE9BVkQsTUFVTyxJQUFJSixHQUFKLEVBQVM7QUFFWkMsaUJBQVMsSUFBSVgsS0FBSixDQUFVUSxRQUFRRSxHQUFSLENBQVYsRUFBd0I7QUFDN0JULGVBQUssVUFBU0MsTUFBVCxFQUFpQkMsUUFBakIsRUFBMkJDLFFBQTNCLEVBQXFDO0FBQ3RDLG1CQUFPQyxRQUFRSixHQUFSLENBQVlDLE1BQVosRUFBb0JDLFFBQXBCLEVBQThCQyxRQUE5QixDQUFQO0FBQ0g7QUFINEIsU0FBeEIsQ0FBVDtBQUtIOztBQUVEVCxhQUFPQyxjQUFQLENBQXNCLEtBQUtXLE9BQUwsQ0FBdEIsRUFBcUNHLEdBQXJDLEVBQTBDO0FBQ3RDeEMsZUFBT3lDLE1BRCtCO0FBRXRDZCxrQkFBVSxLQUY0QjtBQUd0Q0Msb0JBQVksS0FIMEI7QUFJdENDLHNCQUFjO0FBSndCLE9BQTFDO0FBTUg7QUFDSjs7QUE1TEs7O0FBK0xWaUIsT0FBT0MsT0FBUCxHQUFpQm5ELEdBQWpCIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBQeXJyaGEgSnNcbiAqIFBhbmRvcmEgUHlycmhhIEphdmFzY3JpcHQgbGlicmFyeVxuICogXG4gKiBAZmlsZSBpbmRleC5qc1xuICogQGF1dGhvciBLb3N0aWFudHluIFNteXJub3YgPGtvc3R5c2hAZ21haWwuY29tPlxuICogQGRhdGUgMjAxOFxuICovXG5cbid1c2Ugc3RyaWN0JztcblxuaW1wb3J0IFdlYjMgZnJvbSAnd2ViMyc7XG5pbXBvcnQgaXBmc0FQSSBmcm9tICdpcGZzLWFwaSc7XG5cbmltcG9ydCBwanNQYWNrYWdlIGZyb20gJy4uL3BhY2thZ2UuanNvbic7XG5pbXBvcnQgcGpzRXJyb3IsIHtcbiAgICBXRUIzX05PVF9DT05ORUNURURcbn0gZnJvbSAnLi9oZWxwZXJzL2Vycm9ycyc7XG5cbmltcG9ydCAqIGFzIGtlcm5lbHMgZnJvbSAnLi9rZXJuZWxzJztcbmltcG9ydCAqIGFzIGRhdGFzZXRzIGZyb20gJy4vZGF0YXNldHMnO1xuaW1wb3J0ICogYXMgam9icyBmcm9tICcuL2pvYnMnO1xuaW1wb3J0ICogYXMgd29ya2VycyBmcm9tICcuL3dvcmtlcnMnO1xuaW1wb3J0ICogYXMgaXBmcyBmcm9tICcuL2lwZnMnO1xuXG4vKiogUGpzIGNsYXNzICovXG5jbGFzcyBQanMge1xuXG4gICAgLy8gTmF0aXZlIFdlYjMgb2JqZWN0XG4gICAgc3RhdGljIGdldCBXZWIzKCkge1xuICAgICAgICByZXR1cm4gV2ViMztcbiAgICB9XG5cbiAgICAvLyBOYXRpdmUgaXBmc0FQSSBvYmplY3RcbiAgICBzdGF0aWMgZ2V0IGlwZnNBUEkoKSB7XG4gICAgICAgIHJldHVybiBpcGZzQVBJO1xuICAgIH1cblxuICAgIC8vIHdlYjMgc2V0dGVyXG4gICAgc2V0IF93ZWIzKHZhbHVlKSB7XG5cbiAgICAgICAgaWYgKCF2YWx1ZSB8fCAhdmFsdWUuY3VycmVudFByb3ZpZGVyKSB7XG4gICAgICAgICAgICB0aHJvdyBwanNFcnJvcihXRUIzX05PVF9DT05ORUNURUQpO1xuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy5jb25maWcud2ViMyA9IHZhbHVlO1xuICAgIH1cblxuICAgIC8vIGlwZnMgc2V0dGVyXG4gICAgc2V0IF9pcGZzKHZhbHVlKSB7XG5cbiAgICAgICAgLy8gQHRvZG8gQWRkIGlwZnMgY29ubmVjdGlvbiB2YWxpZGF0aW9uXG4gICAgICAgIHRoaXMuY29uZmlnLmlwZnMgPSB2YWx1ZTtcbiAgICB9XG5cbiAgICAvKiogT3B0aW9ucyBleGFtcGxlXG4gICAgXG4gICAge1xuICAgICAgICBldGg6IHtcbiAgICAgICAgICAgIHByb3RvY29sOiAnaHR0cCcsXG4gICAgICAgICAgICBob3N0OiAnbG9jYWxob3N0JyxcbiAgICAgICAgICAgIHBvcnQ6ICcnXG4gICAgICAgIH0sXG4gICAgICAgIGlwZnM6IHtcbiAgICAgICAgICAgIHByb3RvY29sOiAnaHR0cCcsXG4gICAgICAgICAgICBob3N0OiAnbG9jYWxob3N0JyxcbiAgICAgICAgICAgIHBvcnQ6IDUwMDFcbiAgICAgICAgfSxcbiAgICAgICAgY29udHJhY3RzOiB7XG4gICAgICAgICAgICBLZXJuZWwsICAvLyBjb250cmFjdCBqc29uXG4gICAgICAgICAgICBEYXRhc2V0ICAvLyBjb250cmFjdCBqc29uXG4gICAgICAgIH0sXG4gICAgICAgIGFkZHJlc3Nlczoge1xuICAgICAgICAgICAgcGFuZG9yYTogJzB4NThlNjZiNzk5MjhjZmIzNjJiNTNjMTg1YTZhMWZkZWQ4ODJiYjA3ZCcsXG4gICAgICAgICAgICBtYXJrZXQ6ICcweDYxNDIwMjlhYmIyMWVmMmUwYmZmZGU4ZDQzZjE1YzY0ZjM3NTBmZTYnXG4gICAgICAgIH1cbiAgICB9XG4gICAgIFxuICAgICovXG4gICAgLyoqXG4gICAgICogQ3JlYXRlcyBhbiBpbnN0YW5jZSBvZiBQanMuXG4gICAgICogQHBhcmFtIHtPYmplY3R9IG9wdGlvbnNcbiAgICAgKiBAbWVtYmVyb2YgUGpzXG4gICAgICovXG4gICAgY29uc3RydWN0b3Iob3B0aW9ucyA9IHt9KSB7XG4gICAgICAgIC8vIEB0b2RvIEltcGxlbWVudCBvcHRpb25zIG9iamVjdCB2YWxpZGF0aW9uXG4gICAgICAgIHRoaXMudmVyc2lvbiA9IHBqc1BhY2thZ2UudmVyc2lvbjtcbiAgICAgICAgdGhpcy5jb25maWcgPSB7fTtcbiAgICAgICAgdGhpcy5pc01ldGFNYXNrID0gZmFsc2U7XG5cbiAgICAgICAgaWYgKG9wdGlvbnMuZXRoKSB7XG5cbiAgICAgICAgICAgIGlmIChvcHRpb25zLmV0aC5wcm92aWRlcikge1xuXG4gICAgICAgICAgICAgICAgdGhpcy5fd2ViMyA9IG5ldyBQanMuV2ViMyhvcHRpb25zLmV0aC5wcm92aWRlcik7XG5cbiAgICAgICAgICAgICAgICBpZiAob3B0aW9ucy5ldGgucHJvdmlkZXIuaXNNZXRhTWFzaykge1xuICAgICAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5pc01ldGFNYXNrID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgIFxuICAgICAgICAgICAgICAgIHRoaXMuX3dlYjMgPSBuZXcgUGpzLldlYjMoYCR7b3B0aW9ucy5ldGgucHJvdG9jb2wgfHwgJ2h0dHAnfTovLyR7b3B0aW9ucy5ldGguaG9zdCB8fCAnbG9jYWxob3N0J306JHtvcHRpb25zLmV0aC5wb3J0IHx8ICcnfWApO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICB0aGlzLmNvbmZpZy5jb250cmFjdHMgPSBvcHRpb25zLmNvbnRyYWN0cyB8fCB7fTsvLyBAdG9kbyBWYWxpZGF0ZSBtaW5pbXVtIFwicmVxdWlyZWRcIiBjb250cmFjdHMgc2V0IFxuICAgICAgICAgICAgdGhpcy5jb25maWcuYWRkcmVzc2VzID0gb3B0aW9ucy5hZGRyZXNzZXMgfHwge307Ly8gQHRvZG8gVmFsaWRhdGUgYWRkcmVzc2VzIFwicmVxdWlyZWRcIiBvcHRpb25cblxuICAgICAgICAgICAgdGhpcy5fYWRkTWVtYmVycygna2VybmVscycsIGtlcm5lbHMpO1xuICAgICAgICAgICAgdGhpcy5fYWRkTWVtYmVycygnZGF0YXNldHMnLCBkYXRhc2V0cyk7XG4gICAgICAgICAgICB0aGlzLl9hZGRNZW1iZXJzKCdqb2JzJywgam9icyk7XG4gICAgICAgICAgICB0aGlzLl9hZGRNZW1iZXJzKCd3b3JrZXJzJywgd29ya2Vycyk7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAob3B0aW9ucy5pcGZzKSB7XG5cbiAgICAgICAgICAgIHRoaXMuX2lwZnMgPSBQanMuaXBmc0FQSShcbiAgICAgICAgICAgICAgICBvcHRpb25zLmlwZnMuaG9zdCwgXG4gICAgICAgICAgICAgICAgb3B0aW9ucy5pcGZzLnBvcnQsIFxuICAgICAgICAgICAgICAgIHsgXG4gICAgICAgICAgICAgICAgICAgIHByb3RvY29sOiBvcHRpb25zLmlwZnMucHJvdG9jb2xcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICApO1xuXG4gICAgICAgICAgICB0aGlzLl9hZGRNZW1iZXJzKCdpcGZzJywgaXBmcyk7XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLl9hZGRBcGlNZW1iZXJzKCk7XG4gICAgfVxuXG4gICAgLy8gZGlyZWN0IGFwaXMgcmVmZXJlbmNlc1xuICAgIF9hZGRBcGlNZW1iZXJzKCkge1xuXG4gICAgICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eSh0aGlzLCAnYXBpJywge1xuICAgICAgICAgICAgdmFsdWU6IHt9LFxuICAgICAgICAgICAgd3JpdGFibGU6IGZhbHNlLFxuICAgICAgICAgICAgZW51bWVyYWJsZTogZmFsc2UsXG4gICAgICAgICAgICBjb25maWd1cmFibGU6IGZhbHNlXG4gICAgICAgIH0pO1xuXG4gICAgICAgIGlmICh0aGlzLmNvbmZpZy53ZWIzKSB7XG5cbiAgICAgICAgICAgIGxldCB3ZWIzID0gbmV3IFByb3h5KHRoaXMuY29uZmlnLndlYjMsIHtcbiAgICAgICAgICAgICAgICBnZXQ6IGZ1bmN0aW9uKHRhcmdldCwgcHJvcGVydHksIHJlY2VpdmVyKSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBSZWZsZWN0LmdldCh0YXJnZXQsIHByb3BlcnR5LCByZWNlaXZlcik7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eSh0aGlzLmFwaSwgJ3dlYjMnLCB7XG4gICAgICAgICAgICAgICAgdmFsdWU6IHdlYjMsXG4gICAgICAgICAgICAgICAgd3JpdGFibGU6IGZhbHNlLFxuICAgICAgICAgICAgICAgIGVudW1lcmFibGU6IGZhbHNlLFxuICAgICAgICAgICAgICAgIGNvbmZpZ3VyYWJsZTogZmFsc2VcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHRoaXMuY29uZmlnLmlwZnMpIHtcblxuICAgICAgICAgICAgbGV0IGlwZnMgPSBuZXcgUHJveHkodGhpcy5jb25maWcuaXBmcywge1xuICAgICAgICAgICAgICAgIGdldDogZnVuY3Rpb24odGFyZ2V0LCBwcm9wZXJ0eSwgcmVjZWl2ZXIpIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIFJlZmxlY3QuZ2V0KHRhcmdldCwgcHJvcGVydHksIHJlY2VpdmVyKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KHRoaXMuYXBpLCAnaXBmcycsIHtcbiAgICAgICAgICAgICAgICB2YWx1ZTogaXBmcyxcbiAgICAgICAgICAgICAgICB3cml0YWJsZTogZmFsc2UsXG4gICAgICAgICAgICAgICAgZW51bWVyYWJsZTogZmFsc2UsXG4gICAgICAgICAgICAgICAgY29uZmlndXJhYmxlOiBmYWxzZVxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICAvLyBQb3B1bGF0ZSBsaWJyYXJ5IG1ldGhvZHNcbiAgICBfYWRkTWVtYmVycyhzdWJqZWN0LCBtZW1iZXJzKSB7XG4gICAgICAgIGxldCBzZWxmID0gdGhpcztcblxuICAgICAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkoc2VsZiwgc3ViamVjdCwge1xuICAgICAgICAgICAgdmFsdWU6IHt9LFxuICAgICAgICAgICAgd3JpdGFibGU6IGZhbHNlLFxuICAgICAgICAgICAgZW51bWVyYWJsZTogdHJ1ZSxcbiAgICAgICAgICAgIGNvbmZpZ3VyYWJsZTogZmFsc2VcbiAgICAgICAgfSk7XG5cbiAgICAgICAgLyogaXN0YW5idWwgaWdub3JlIG5leHQgKi9cbiAgICAgICAgZm9yIChsZXQga2V5IGluIG1lbWJlcnMpIHtcbiAgICAgICAgICAgIGxldCBtZW1iZXI7XG4gICAgICAgICAgICBcbiAgICAgICAgICAgIGlmICh0eXBlb2YgbWVtYmVyc1trZXldID09PSAnZnVuY3Rpb24nKSB7XG5cbiAgICAgICAgICAgICAgICBtZW1iZXIgPSBuZXcgUHJveHkobWVtYmVyc1trZXldLCB7XG4gICAgICAgICAgICAgICAgICAgIGFwcGx5OiBmdW5jdGlvbih0YXJnZXQsIHRoYXQsIGFyZ3MpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIGFkZCBjb25maWcgb2JqZWN0IHRvIGV2ZXJ5IG1ldGhvZHMgY2FsbHNcbiAgICAgICAgICAgICAgICAgICAgICAgIGFyZ3MucHVzaChzZWxmLmNvbmZpZyk7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBSZWZsZWN0LmFwcGx5KHRhcmdldCwgc2VsZiwgYXJncyk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH0gZWxzZSBpZiAoa2V5KSB7XG5cbiAgICAgICAgICAgICAgICBtZW1iZXIgPSBuZXcgUHJveHkobWVtYmVyc1trZXldLCB7XG4gICAgICAgICAgICAgICAgICAgIGdldDogZnVuY3Rpb24odGFyZ2V0LCBwcm9wZXJ0eSwgcmVjZWl2ZXIpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBSZWZsZWN0LmdldCh0YXJnZXQsIHByb3BlcnR5LCByZWNlaXZlcik7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KHRoaXNbc3ViamVjdF0sIGtleSwge1xuICAgICAgICAgICAgICAgIHZhbHVlOiBtZW1iZXIsXG4gICAgICAgICAgICAgICAgd3JpdGFibGU6IGZhbHNlLFxuICAgICAgICAgICAgICAgIGVudW1lcmFibGU6IGZhbHNlLFxuICAgICAgICAgICAgICAgIGNvbmZpZ3VyYWJsZTogZmFsc2VcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgfVxufVxuXG5tb2R1bGUuZXhwb3J0cyA9IFBqcztcbiJdfQ==