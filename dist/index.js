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
        this._web3 = new Pjs.Web3.providers.HttpProvider(`${options.eth.protocol || 'http'}://${options.eth.host || 'localhost'}:${options.eth.port || ''}`);
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9pbmRleC5qcyJdLCJuYW1lcyI6WyJQanMiLCJXZWIzIiwiaXBmc0FQSSIsIl93ZWIzIiwidmFsdWUiLCJjdXJyZW50UHJvdmlkZXIiLCJXRUIzX05PVF9DT05ORUNURUQiLCJjb25maWciLCJ3ZWIzIiwiX2lwZnMiLCJpcGZzIiwiY29uc3RydWN0b3IiLCJvcHRpb25zIiwidmVyc2lvbiIsInBqc1BhY2thZ2UiLCJpc01ldGFNYXNrIiwiZXRoIiwicHJvdmlkZXIiLCJwcm92aWRlcnMiLCJIdHRwUHJvdmlkZXIiLCJwcm90b2NvbCIsImhvc3QiLCJwb3J0IiwiY29udHJhY3RzIiwiYWRkcmVzc2VzIiwiX2FkZE1lbWJlcnMiLCJwYW5kb3JhIiwia2VybmVscyIsImRhdGFzZXRzIiwiam9icyIsIndvcmtlcnMiLCJfYWRkQXBpTWVtYmVycyIsIk9iamVjdCIsImRlZmluZVByb3BlcnR5Iiwid3JpdGFibGUiLCJlbnVtZXJhYmxlIiwiY29uZmlndXJhYmxlIiwiUHJveHkiLCJnZXQiLCJ0YXJnZXQiLCJwcm9wZXJ0eSIsInJlY2VpdmVyIiwiUmVmbGVjdCIsImFwaSIsInN1YmplY3QiLCJtZW1iZXJzIiwic2VsZiIsImtleSIsIm1lbWJlciIsImFwcGx5IiwidGhhdCIsImFyZ3MiLCJwdXNoIiwibW9kdWxlIiwiZXhwb3J0cyJdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7Ozs7O0FBU0E7O0FBRUE7O0FBQ0E7O0FBRUE7O0FBQ0E7O0FBSUE7O0FBQ0E7O0FBQ0E7O0FBQ0E7O0FBQ0E7O0FBQ0E7Ozs7OztBQUVBO0FBQ0EsTUFBTUEsR0FBTixDQUFVO0FBRU47QUFDQSxhQUFXQyxJQUFYLEdBQWtCO0FBQ2QsV0FBT0EsWUFBUDtBQUNILEdBTEssQ0FPTjs7O0FBQ0EsYUFBV0MsT0FBWCxHQUFxQjtBQUNqQixXQUFPQSxnQkFBUDtBQUNILEdBVkssQ0FZTjs7O0FBQ0EsTUFBSUMsS0FBSixDQUFVQyxLQUFWLEVBQWlCO0FBRWIsUUFBSSxDQUFDQSxLQUFE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WCxLQUFKLENBQVVRLFFBQVFFLEdBQVIsQ0FBVixFQUF3QjtBQUM3QkUsaUJBQU8sVUFBU1YsTUFBVCxFQUFpQlcsSUFBakIsRUFBdUJDLElBQXZCLEVBQTZCO0FBQ2hDO0FBQ0FBLGlCQUFLQyxJQUFMLENBQVVOLEtBQUt2QyxNQUFmO0FBRUEsbUJBQU9tQyxRQUFRTyxLQUFSLENBQWNWLE1BQWQsRUFBc0JPLElBQXRCLEVBQTRCSyxJQUE1QixDQUFQO0FBQ0g7QUFONEIsU0FBeEIsQ0FBVDtBQVFILE9BVkQsTUFVTyxJQUFJSixHQUFKLEVBQVM7QUFFWkMsaUJBQVMsSUFBSVgsS0FBSixDQUFVUSxRQUFRRSxHQUFSLENBQVYsRUFBd0I7QUFDN0JULGVBQUssVUFBU0MsTUFBVCxFQUFpQkMsUUFBakIsRUFBMkJDLFFBQTNCLEVBQXFDO0FBQ3RDLG1CQUFPQyxRQUFRSixHQUFSLENBQVlDLE1BQVosRUFBb0JDLFFBQXBCLEVBQThCQyxRQUE5QixDQUFQO0FBQ0g7QUFINEIsU0FBeEIsQ0FBVDtBQUtIOztBQUVEVCxhQUFPQyxjQUFQLENBQXNCLEtBQUtXLE9BQUwsQ0FBdEIsRUFBcUNHLEdBQXJDLEVBQTBDO0FBQ3RDM0MsZUFBTzRDLE1BRCtCO0FBRXRDZCxrQkFBVSxLQUY0QjtBQUd0Q0Msb0JBQVksS0FIMEI7QUFJdENDLHNCQUFjO0FBSndCLE9BQTFDO0FBTUg7QUFDSjs7QUEvTEs7O0FBa01WaUIsT0FBT0MsT0FBUCxHQUFpQnRELEdBQWpCIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBQeXJyaGEgSnNcbiAqIFBhbmRvcmEgUHlycmhhIEphdmFzY3JpcHQgbGlicmFyeVxuICogXG4gKiBAZmlsZSBpbmRleC5qc1xuICogQGF1dGhvciBLb3N0aWFudHluIFNteXJub3YgPGtvc3R5c2hAZ21haWwuY29tPlxuICogQGRhdGUgMjAxOFxuICovXG5cbid1c2Ugc3RyaWN0JztcblxuaW1wb3J0IFdlYjMgZnJvbSAnd2ViMyc7XG5pbXBvcnQgaXBmc0FQSSBmcm9tICdpcGZzLWFwaSc7XG5cbmltcG9ydCBwanNQYWNrYWdlIGZyb20gJy4uL3BhY2thZ2UuanNvbic7XG5pbXBvcnQgcGpzRXJyb3IsIHtcbiAgICBXRUIzX05PVF9DT05ORUNURURcbn0gZnJvbSAnLi9oZWxwZXJzL2Vycm9ycyc7XG5cbmltcG9ydCAqIGFzIHBhbmRvcmEgZnJvbSAnLi9wYW5kb3JhJztcbmltcG9ydCAqIGFzIGtlcm5lbHMgZnJvbSAnLi9rZXJuZWxzJztcbmltcG9ydCAqIGFzIGRhdGFzZXRzIGZyb20gJy4vZGF0YXNldHMnO1xuaW1wb3J0ICogYXMgam9icyBmcm9tICcuL2pvYnMnO1xuaW1wb3J0ICogYXMgd29ya2VycyBmcm9tICcuL3dvcmtlcnMnO1xuaW1wb3J0ICogYXMgaXBmcyBmcm9tICcuL2lwZnMnO1xuXG4vKiogUGpzIGNsYXNzICovXG5jbGFzcyBQanMge1xuXG4gICAgLy8gTmF0aXZlIFdlYjMgb2JqZWN0XG4gICAgc3RhdGljIGdldCBXZWIzKCkge1xuICAgICAgICByZXR1cm4gV2ViMztcbiAgICB9XG5cbiAgICAvLyBOYXRpdmUgaXBmc0FQSSBvYmplY3RcbiAgICBzdGF0aWMgZ2V0IGlwZnNBUEkoKSB7XG4gICAgICAgIHJldHVybiBpcGZzQVBJO1xuICAgIH1cblxuICAgIC8vIHdlYjMgc2V0dGVyXG4gICAgc2V0IF93ZWIzKHZhbHVlKSB7XG5cbiAgICAgICAgaWYgKCF2YWx1ZSB8fCAhdmFsdWUuY3VycmVudFByb3ZpZGVyKSB7XG4gICAgICAgICAgICB0aHJvdyBwanNFcnJvcihXRUIzX05PVF9DT05ORUNURUQpO1xuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy5jb25maWcud2ViMyA9IHZhbHVlO1xuICAgIH1cblxuICAgIC8vIGlwZnMgc2V0dGVyXG4gICAgc2V0IF9pcGZzKHZhbHVlKSB7XG5cbiAgICAgICAgLy8gQHRvZG8gQWRkIGlwZnMgY29ubmVjdGlvbiB2YWxpZGF0aW9uXG4gICAgICAgIHRoaXMuY29uZmlnLmlwZnMgPSB2YWx1ZTtcbiAgICB9XG5cbiAgICAvKiogT3B0aW9ucyBleGFtcGxlXG4gICAgXG4gICAge1xuICAgICAgICBldGg6IHtcbiAgICAgICAgICAgIHByb3ZpZGVyOiA8ZXh0ZXJuYWxfcHJvdmlkZXI+LFxuICAgICAgICAgICAgLy8gb3JcbiAgICAgICAgICAgIHByb3RvY29sOiAnaHR0cCcsXG4gICAgICAgICAgICBob3N0OiAnbG9jYWxob3N0JyxcbiAgICAgICAgICAgIHBvcnQ6ICcnXG4gICAgICAgIH0sXG4gICAgICAgIGlwZnM6IHtcbiAgICAgICAgICAgIHByb3RvY29sOiAnaHR0cCcsXG4gICAgICAgICAgICBob3N0OiAnbG9jYWxob3N0JyxcbiAgICAgICAgICAgIHBvcnQ6IDUwMDFcbiAgICAgICAgfSxcbiAgICAgICAgY29udHJhY3RzOiB7XG4gICAgICAgICAgICBLZXJuZWwsICAvLyBjb250cmFjdCBqc29uXG4gICAgICAgICAgICBEYXRhc2V0ICAvLyBjb250cmFjdCBqc29uXG4gICAgICAgIH0sXG4gICAgICAgIGFkZHJlc3Nlczoge1xuICAgICAgICAgICAgcGFuZG9yYTogJzB4NThlNjZiNzk5MjhjZmIzNjJiNTNjMTg1YTZhMWZkZWQ4ODJiYjA3ZCcsXG4gICAgICAgICAgICBtYXJrZXQ6ICcweDYxNDIwMjlhYmIyMWVmMmUwYmZmZGU4ZDQzZjE1YzY0ZjM3NTBmZTYnXG4gICAgICAgIH1cbiAgICB9XG4gICAgIFxuICAgICovXG4gICAgLyoqXG4gICAgICogQ3JlYXRlcyBhbiBpbnN0YW5jZSBvZiBQanMuXG4gICAgICogQHBhcmFtIHtPYmplY3R9IG9wdGlvbnNcbiAgICAgKiBAbWVtYmVyb2YgUGpzXG4gICAgICovXG4gICAgY29uc3RydWN0b3Iob3B0aW9ucyA9IHt9KSB7XG4gICAgICAgIC8vIEB0b2RvIEltcGxlbWVudCBvcHRpb25zIG9iamVjdCB2YWxpZGF0aW9uXG4gICAgICAgIHRoaXMudmVyc2lvbiA9IHBqc1BhY2thZ2UudmVyc2lvbjtcbiAgICAgICAgdGhpcy5jb25maWcgPSB7fTtcbiAgICAgICAgdGhpcy5pc01ldGFNYXNrID0gZmFsc2U7XG5cbiAgICAgICAgaWYgKG9wdGlvbnMuZXRoKSB7XG5cbiAgICAgICAgICAgIGlmIChvcHRpb25zLmV0aC5wcm92aWRlcikge1xuXG4gICAgICAgICAgICAgICAgdGhpcy5fd2ViMyA9IG5ldyBQanMuV2ViMyhvcHRpb25zLmV0aC5wcm92aWRlcik7XG5cbiAgICAgICAgICAgICAgICBpZiAob3B0aW9ucy5ldGgucHJvdmlkZXIuaXNNZXRhTWFzaykge1xuICAgICAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5pc01ldGFNYXNrID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgIFxuICAgICAgICAgICAgICAgIHRoaXMuX3dlYjMgPSBuZXcgUGpzLldlYjMucHJvdmlkZXJzLkh0dHBQcm92aWRlcihgJHtvcHRpb25zLmV0aC5wcm90b2NvbCB8fCAnaHR0cCd9Oi8vJHtvcHRpb25zLmV0aC5ob3N0IHx8ICdsb2NhbGhvc3QnfToke29wdGlvbnMuZXRoLnBvcnQgfHwgJyd9YCk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHRoaXMuY29uZmlnLmNvbnRyYWN0cyA9IG9wdGlvbnMuY29udHJhY3RzIHx8IHt9Oy8vIEB0b2RvIFZhbGlkYXRlIG1pbmltdW0gXCJyZXF1aXJlZFwiIGNvbnRyYWN0cyBzZXQgXG4gICAgICAgICAgICB0aGlzLmNvbmZpZy5hZGRyZXNzZXMgPSBvcHRpb25zLmFkZHJlc3NlcyB8fCB7fTsvLyBAdG9kbyBWYWxpZGF0ZSBhZGRyZXNzZXMgXCJyZXF1aXJlZFwiIG9wdGlvblxuXG4gICAgICAgICAgICB0aGlzLl9hZGRNZW1iZXJzKCdwYW5kb3JhJywgcGFuZG9yYSk7XG4gICAgICAgICAgICB0aGlzLl9hZGRNZW1iZXJzKCdrZXJuZWxzJywga2VybmVscyk7XG4gICAgICAgICAgICB0aGlzLl9hZGRNZW1iZXJzKCdkYXRhc2V0cycsIGRhdGFzZXRzKTtcbiAgICAgICAgICAgIHRoaXMuX2FkZE1lbWJlcnMoJ2pvYnMnLCBqb2JzKTtcbiAgICAgICAgICAgIHRoaXMuX2FkZE1lbWJlcnMoJ3dvcmtlcnMnLCB3b3JrZXJzKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChvcHRpb25zLmlwZnMpIHtcblxuICAgICAgICAgICAgdGhpcy5faXBmcyA9IFBqcy5pcGZzQVBJKFxuICAgICAgICAgICAgICAgIG9wdGlvbnMuaXBmcy5ob3N0LCBcbiAgICAgICAgICAgICAgICBvcHRpb25zLmlwZnMucG9ydCwgXG4gICAgICAgICAgICAgICAgeyBcbiAgICAgICAgICAgICAgICAgICAgcHJvdG9jb2w6IG9wdGlvbnMuaXBmcy5wcm90b2NvbFxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICk7XG5cbiAgICAgICAgICAgIHRoaXMuX2FkZE1lbWJlcnMoJ2lwZnMnLCBpcGZzKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMuX2FkZEFwaU1lbWJlcnMoKTtcbiAgICB9XG5cbiAgICAvLyBkaXJlY3QgYXBpcyByZWZlcmVuY2VzXG4gICAgX2FkZEFwaU1lbWJlcnMoKSB7XG5cbiAgICAgICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KHRoaXMsICdhcGknLCB7XG4gICAgICAgICAgICB2YWx1ZToge30sXG4gICAgICAgICAgICB3cml0YWJsZTogZmFsc2UsXG4gICAgICAgICAgICBlbnVtZXJhYmxlOiBmYWxzZSxcbiAgICAgICAgICAgIGNvbmZpZ3VyYWJsZTogZmFsc2VcbiAgICAgICAgfSk7XG5cbiAgICAgICAgaWYgKHRoaXMuY29uZmlnLndlYjMpIHtcblxuICAgICAgICAgICAgbGV0IHdlYjMgPSBuZXcgUHJveHkodGhpcy5jb25maWcud2ViMywge1xuICAgICAgICAgICAgICAgIGdldDogZnVuY3Rpb24odGFyZ2V0LCBwcm9wZXJ0eSwgcmVjZWl2ZXIpIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIFJlZmxlY3QuZ2V0KHRhcmdldCwgcHJvcGVydHksIHJlY2VpdmVyKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KHRoaXMuYXBpLCAnd2ViMycsIHtcbiAgICAgICAgICAgICAgICB2YWx1ZTogd2ViMyxcbiAgICAgICAgICAgICAgICB3cml0YWJsZTogZmFsc2UsXG4gICAgICAgICAgICAgICAgZW51bWVyYWJsZTogZmFsc2UsXG4gICAgICAgICAgICAgICAgY29uZmlndXJhYmxlOiBmYWxzZVxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAodGhpcy5jb25maWcuaXBmcykge1xuXG4gICAgICAgICAgICBsZXQgaXBmcyA9IG5ldyBQcm94eSh0aGlzLmNvbmZpZy5pcGZzLCB7XG4gICAgICAgICAgICAgICAgZ2V0OiBmdW5jdGlvbih0YXJnZXQsIHByb3BlcnR5LCByZWNlaXZlcikge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gUmVmbGVjdC5nZXQodGFyZ2V0LCBwcm9wZXJ0eSwgcmVjZWl2ZXIpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkodGhpcy5hcGksICdpcGZzJywge1xuICAgICAgICAgICAgICAgIHZhbHVlOiBpcGZzLFxuICAgICAgICAgICAgICAgIHdyaXRhYmxlOiBmYWxzZSxcbiAgICAgICAgICAgICAgICBlbnVtZXJhYmxlOiBmYWxzZSxcbiAgICAgICAgICAgICAgICBjb25maWd1cmFibGU6IGZhbHNlXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIC8vIFBvcHVsYXRlIGxpYnJhcnkgbWV0aG9kc1xuICAgIF9hZGRNZW1iZXJzKHN1YmplY3QsIG1lbWJlcnMpIHtcbiAgICAgICAgbGV0IHNlbGYgPSB0aGlzO1xuXG4gICAgICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShzZWxmLCBzdWJqZWN0LCB7XG4gICAgICAgICAgICB2YWx1ZToge30sXG4gICAgICAgICAgICB3cml0YWJsZTogZmFsc2UsXG4gICAgICAgICAgICBlbnVtZXJhYmxlOiB0cnVlLFxuICAgICAgICAgICAgY29uZmlndXJhYmxlOiBmYWxzZVxuICAgICAgICB9KTtcblxuICAgICAgICAvKiBpc3RhbmJ1bCBpZ25vcmUgbmV4dCAqL1xuICAgICAgICBmb3IgKGxldCBrZXkgaW4gbWVtYmVycykge1xuICAgICAgICAgICAgbGV0IG1lbWJlcjtcbiAgICAgICAgICAgIFxuICAgICAgICAgICAgaWYgKHR5cGVvZiBtZW1iZXJzW2tleV0gPT09ICdmdW5jdGlvbicpIHtcblxuICAgICAgICAgICAgICAgIG1lbWJlciA9IG5ldyBQcm94eShtZW1iZXJzW2tleV0sIHtcbiAgICAgICAgICAgICAgICAgICAgYXBwbHk6IGZ1bmN0aW9uKHRhcmdldCwgdGhhdCwgYXJncykge1xuICAgICAgICAgICAgICAgICAgICAgICAgLy8gYWRkIGNvbmZpZyBvYmplY3QgdG8gZXZlcnkgbWV0aG9kcyBjYWxsc1xuICAgICAgICAgICAgICAgICAgICAgICAgYXJncy5wdXNoKHNlbGYuY29uZmlnKTtcblxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIFJlZmxlY3QuYXBwbHkodGFyZ2V0LCBzZWxmLCBhcmdzKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfSBlbHNlIGlmIChrZXkpIHtcblxuICAgICAgICAgICAgICAgIG1lbWJlciA9IG5ldyBQcm94eShtZW1iZXJzW2tleV0sIHtcbiAgICAgICAgICAgICAgICAgICAgZ2V0OiBmdW5jdGlvbih0YXJnZXQsIHByb3BlcnR5LCByZWNlaXZlcikge1xuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIFJlZmxlY3QuZ2V0KHRhcmdldCwgcHJvcGVydHksIHJlY2VpdmVyKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkodGhpc1tzdWJqZWN0XSwga2V5LCB7XG4gICAgICAgICAgICAgICAgdmFsdWU6IG1lbWJlcixcbiAgICAgICAgICAgICAgICB3cml0YWJsZTogZmFsc2UsXG4gICAgICAgICAgICAgICAgZW51bWVyYWJsZTogZmFsc2UsXG4gICAgICAgICAgICAgICAgY29uZmlndXJhYmxlOiBmYWxzZVxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICB9XG59XG5cbm1vZHVsZS5leHBvcnRzID0gUGpzO1xuIl19