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

function _instanceof(left, right) { if (right != null && typeof Symbol !== "undefined" && right[Symbol.hasInstance]) { return right[Symbol.hasInstance](left); } else { return left instanceof right; } }

function _classCallCheck(instance, Constructor) { if (!_instanceof(instance, Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

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
      if (!value.currentProvider) {
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
    }
  }]);

  function Pjs() {
    var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

    _classCallCheck(this, Pjs);

    this.version = _package.default.version;
    this.config = {};

    if (options.eth) {
      this.config.contracts = options.contracts || {}; // @todo Validate minimum "required" contracts set 

      this.config.addresses = options.addresses || {}; // @todo Validate addresses "required" option

      if (window && window.web3 && window.web3.currentProvider && window.web3.currentProvider.isMetaMask) {
        this._web3 = new Pjs.Web3(window.web3.currentProvider);
      } else {
        this._web3 = new Pjs.Web3("".concat(options.eth.protocol || 'http', "://").concat(options.eth.Host || 'localhost', ":").concat(options.eth.port || ''));
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

module.exports = Pjs;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9pbmRleC5qcyJdLCJuYW1lcyI6WyJQanMiLCJ2YWx1ZSIsImN1cnJlbnRQcm92aWRlciIsIldFQjNfTk9UX0NPTk5FQ1RFRCIsImNvbmZpZyIsIndlYjMiLCJpcGZzIiwiV2ViMyIsImlwZnNBUEkiLCJvcHRpb25zIiwidmVyc2lvbiIsInBqc1BhY2thZ2UiLCJldGgiLCJjb250cmFjdHMiLCJhZGRyZXNzZXMiLCJ3aW5kb3ciLCJpc01ldGFNYXNrIiwiX3dlYjMiLCJwcm90b2NvbCIsIkhvc3QiLCJwb3J0IiwiX2FkZE1lbWJlcnMiLCJrZXJuZWxzIiwiZGF0YXNldHMiLCJqb2JzIiwid29ya2VycyIsIl9pcGZzIiwiaG9zdCIsIl9hZGRBcGlNZW1iZXJzIiwiT2JqZWN0IiwiZGVmaW5lUHJvcGVydHkiLCJ3cml0YWJsZSIsImVudW1lcmFibGUiLCJjb25maWd1cmFibGUiLCJQcm94eSIsImdldCIsInRhcmdldCIsInByb3BlcnR5IiwicmVjZWl2ZXIiLCJSZWZsZWN0IiwiYXBpIiwic3ViamVjdCIsIm1lbWJlcnMiLCJzZWxmIiwia2V5IiwibWVtYmVyIiwiYXBwbHkiLCJ0aGF0IiwiYXJncyIsInB1c2giLCJtb2R1bGUiLCJleHBvcnRzIl0sIm1hcHBpbmdzIjoiQUFBQTs7Ozs7Ozs7QUFTQTs7QUFFQTs7QUFDQTs7QUFFQTs7QUFDQTs7QUFJQTs7QUFDQTs7QUFDQTs7QUFDQTs7QUFDQTs7Ozs7Ozs7Ozs7Ozs7QUFFQTtJQUNNQSxHOzs7OztBQVlGO3NCQUNVQyxLLEVBQU87QUFFYixVQUFJLENBQUNBLE1BQU1DLGVBQVgsRUFBNEI7QUFDeEIsY0FBTSxxQkFBU0MsMEJBQVQsQ0FBTjtBQUNIOztBQUVELFdBQUtDLE1BQUwsQ0FBWUMsSUFBWixHQUFtQkosS0FBbkI7QUFDSCxLLENBRUQ7Ozs7c0JBQ1VBLEssRUFBTztBQUViO0FBQ0EsV0FBS0csTUFBTCxDQUFZRSxJQUFaLEdBQW1CTCxLQUFuQjtBQUNIO0FBRUQ7Ozs7Ozs7Ozs7Ozs7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QUFSLENBQVYsRUFBd0I7QUFDN0JULGlCQUFLLGFBQVNDLE1BQVQsRUFBaUJDLFFBQWpCLEVBQTJCQyxRQUEzQixFQUFxQztBQUN0QyxxQkFBT0MsUUFBUUosR0FBUixDQUFZQyxNQUFaLEVBQW9CQyxRQUFwQixFQUE4QkMsUUFBOUIsQ0FBUDtBQUNIO0FBSDRCLFdBQXhCLENBQVQ7QUFLSDs7QUFFRFQsZUFBT0MsY0FBUCxDQUFzQixLQUFLVyxPQUFMLENBQXRCLEVBQXFDRyxHQUFyQyxFQUEwQztBQUN0QzNDLGlCQUFPNEMsTUFEK0I7QUFFdENkLG9CQUFVLEtBRjRCO0FBR3RDQyxzQkFBWSxLQUgwQjtBQUl0Q0Msd0JBQWM7QUFKd0IsU0FBMUM7QUFNSDtBQUNKOzs7Ozs7QUFHTGlCLE9BQU9DLE9BQVAsR0FBaUJuRCxHQUFqQiIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogUHlycmhhIEpzXG4gKiBQYW5kb3JhIFB5cnJoYSBKYXZhc2NyaXB0IGxpYnJhcnlcbiAqIFxuICogQGZpbGUgaW5kZXguanNcbiAqIEBhdXRob3IgS29zdGlhbnR5biBTbXlybm92IDxrb3N0eXNoQGdtYWlsLmNvbT5cbiAqIEBkYXRlIDIwMThcbiAqL1xuXG4ndXNlIHN0cmljdCc7XG5cbmltcG9ydCBXZWIzIGZyb20gJ3dlYjMnO1xuaW1wb3J0IGlwZnNBUEkgZnJvbSAnaXBmcy1hcGknO1xuXG5pbXBvcnQgcGpzUGFja2FnZSBmcm9tICcuLi9wYWNrYWdlLmpzb24nO1xuaW1wb3J0IHBqc0Vycm9yLCB7XG4gICAgV0VCM19OT1RfQ09OTkVDVEVEXG59IGZyb20gJy4vaGVscGVycy9lcnJvcnMnO1xuXG5pbXBvcnQgKiBhcyBrZXJuZWxzIGZyb20gJy4va2VybmVscyc7XG5pbXBvcnQgKiBhcyBkYXRhc2V0cyBmcm9tICcuL2RhdGFzZXRzJztcbmltcG9ydCAqIGFzIGpvYnMgZnJvbSAnLi9qb2JzJztcbmltcG9ydCAqIGFzIHdvcmtlcnMgZnJvbSAnLi93b3JrZXJzJztcbmltcG9ydCAqIGFzIGlwZnMgZnJvbSAnLi9pcGZzJztcblxuLyoqIFBqcyBjbGFzcyAqL1xuY2xhc3MgUGpzIHtcblxuICAgIC8vIE5hdGl2ZSBXZWIzIG9iamVjdFxuICAgIHN0YXRpYyBnZXQgV2ViMygpIHtcbiAgICAgICAgcmV0dXJuIFdlYjM7XG4gICAgfVxuXG4gICAgLy8gTmF0aXZlIGlwZnNBUEkgb2JqZWN0XG4gICAgc3RhdGljIGdldCBpcGZzQVBJKCkge1xuICAgICAgICByZXR1cm4gaXBmc0FQSTtcbiAgICB9XG5cbiAgICAvLyB3ZWIzIHNldHRlclxuICAgIHNldCBfd2ViMyh2YWx1ZSkge1xuXG4gICAgICAgIGlmICghdmFsdWUuY3VycmVudFByb3ZpZGVyKSB7XG4gICAgICAgICAgICB0aHJvdyBwanNFcnJvcihXRUIzX05PVF9DT05ORUNURUQpO1xuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy5jb25maWcud2ViMyA9IHZhbHVlO1xuICAgIH1cblxuICAgIC8vIGlwZnMgc2V0dGVyXG4gICAgc2V0IF9pcGZzKHZhbHVlKSB7XG5cbiAgICAgICAgLy8gQHRvZG8gQWRkIGlwZnMgY29ubmVjdGlvbiB2YWxpZGF0aW9uXG4gICAgICAgIHRoaXMuY29uZmlnLmlwZnMgPSB2YWx1ZTtcbiAgICB9XG5cbiAgICAvKiogT3B0aW9ucyBleGFtcGxlXG4gICAgXG4gICAge1xuICAgICAgICBldGg6IHtcbiAgICAgICAgICAgIHByb3RvY29sOiAnaHR0cCcsXG4gICAgICAgICAgICBob3N0OiAnbG9jYWxob3N0JyxcbiAgICAgICAgICAgIHBvcnQ6ICcnXG4gICAgICAgIH0sXG4gICAgICAgIGlwZnM6IHtcbiAgICAgICAgICAgIHByb3RvY29sOiAnaHR0cCcsXG4gICAgICAgICAgICBob3N0OiAnbG9jYWxob3N0JyxcbiAgICAgICAgICAgIHBvcnQ6IDUwMDFcbiAgICAgICAgfSxcbiAgICAgICAgY29udHJhY3RzOiB7XG4gICAgICAgICAgICBLZXJuZWwsICAvLyBjb250cmFjdCBqc29uXG4gICAgICAgICAgICBEYXRhc2V0ICAvLyBjb250cmFjdCBqc29uXG4gICAgICAgIH0sXG4gICAgICAgIGFkZHJlc3Nlczoge1xuICAgICAgICAgICAgcGFuZG9yYTogJzB4NThlNjZiNzk5MjhjZmIzNjJiNTNjMTg1YTZhMWZkZWQ4ODJiYjA3ZCcsXG4gICAgICAgICAgICBtYXJrZXQ6ICcweDYxNDIwMjlhYmIyMWVmMmUwYmZmZGU4ZDQzZjE1YzY0ZjM3NTBmZTYnXG4gICAgICAgIH1cbiAgICB9XG4gICAgIFxuICAgICovXG4gICAgLyoqXG4gICAgICogQ3JlYXRlcyBhbiBpbnN0YW5jZSBvZiBQanMuXG4gICAgICogQHBhcmFtIHtPYmplY3R9IG9wdGlvbnNcbiAgICAgKiBAbWVtYmVyb2YgUGpzXG4gICAgICovXG4gICAgY29uc3RydWN0b3Iob3B0aW9ucyA9IHt9KSB7XG4gICAgICAgIHRoaXMudmVyc2lvbiA9IHBqc1BhY2thZ2UudmVyc2lvbjtcbiAgICAgICAgdGhpcy5jb25maWcgPSB7fTtcblxuICAgICAgICBpZiAob3B0aW9ucy5ldGgpIHtcblxuICAgICAgICAgICAgdGhpcy5jb25maWcuY29udHJhY3RzID0gb3B0aW9ucy5jb250cmFjdHMgfHwge307Ly8gQHRvZG8gVmFsaWRhdGUgbWluaW11bSBcInJlcXVpcmVkXCIgY29udHJhY3RzIHNldCBcbiAgICAgICAgICAgIHRoaXMuY29uZmlnLmFkZHJlc3NlcyA9IG9wdGlvbnMuYWRkcmVzc2VzIHx8IHt9Oy8vIEB0b2RvIFZhbGlkYXRlIGFkZHJlc3NlcyBcInJlcXVpcmVkXCIgb3B0aW9uXG5cbiAgICAgICAgICAgIGlmICh3aW5kb3cgJiYgd2luZG93LndlYjMgJiYgXG4gICAgICAgICAgICAgICAgd2luZG93LndlYjMuY3VycmVudFByb3ZpZGVyICYmIFxuICAgICAgICAgICAgICAgIHdpbmRvdy53ZWIzLmN1cnJlbnRQcm92aWRlci5pc01ldGFNYXNrKSB7XG4gICAgICAgICAgICAgICAgXG4gICAgICAgICAgICAgICAgdGhpcy5fd2ViMyA9IG5ldyBQanMuV2ViMyh3aW5kb3cud2ViMy5jdXJyZW50UHJvdmlkZXIpOyAgICAgICAgICAgIFxuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICBcbiAgICAgICAgICAgICAgICB0aGlzLl93ZWIzID0gbmV3IFBqcy5XZWIzKGAke29wdGlvbnMuZXRoLnByb3RvY29sIHx8ICdodHRwJ306Ly8ke29wdGlvbnMuZXRoLkhvc3QgfHwgJ2xvY2FsaG9zdCd9OiR7b3B0aW9ucy5ldGgucG9ydCB8fCAnJ31gKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgdGhpcy5fYWRkTWVtYmVycygna2VybmVscycsIGtlcm5lbHMpO1xuICAgICAgICAgICAgdGhpcy5fYWRkTWVtYmVycygnZGF0YXNldHMnLCBkYXRhc2V0cyk7XG4gICAgICAgICAgICB0aGlzLl9hZGRNZW1iZXJzKCdqb2JzJywgam9icyk7XG4gICAgICAgICAgICB0aGlzLl9hZGRNZW1iZXJzKCd3b3JrZXJzJywgd29ya2Vycyk7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAob3B0aW9ucy5pcGZzKSB7XG5cbiAgICAgICAgICAgIHRoaXMuX2lwZnMgPSBQanMuaXBmc0FQSShcbiAgICAgICAgICAgICAgICBvcHRpb25zLmlwZnMuaG9zdCwgXG4gICAgICAgICAgICAgICAgb3B0aW9ucy5pcGZzLnBvcnQsIFxuICAgICAgICAgICAgICAgIHsgXG4gICAgICAgICAgICAgICAgICAgIHByb3RvY29sOiBvcHRpb25zLmlwZnMucHJvdG9jb2xcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICApO1xuXG4gICAgICAgICAgICB0aGlzLl9hZGRNZW1iZXJzKCdpcGZzJywgaXBmcyk7XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLl9hZGRBcGlNZW1iZXJzKCk7XG4gICAgfVxuXG4gICAgLy8gZGlyZWN0IGFwaXMgcmVmZXJlbmNlc1xuICAgIF9hZGRBcGlNZW1iZXJzKCkge1xuXG4gICAgICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eSh0aGlzLCAnYXBpJywge1xuICAgICAgICAgICAgdmFsdWU6IHt9LFxuICAgICAgICAgICAgd3JpdGFibGU6IGZhbHNlLFxuICAgICAgICAgICAgZW51bWVyYWJsZTogZmFsc2UsXG4gICAgICAgICAgICBjb25maWd1cmFibGU6IGZhbHNlXG4gICAgICAgIH0pO1xuXG4gICAgICAgIGlmICh0aGlzLmNvbmZpZy53ZWIzKSB7XG5cbiAgICAgICAgICAgIGxldCB3ZWIzID0gbmV3IFByb3h5KHRoaXMuY29uZmlnLndlYjMsIHtcbiAgICAgICAgICAgICAgICBnZXQ6IGZ1bmN0aW9uKHRhcmdldCwgcHJvcGVydHksIHJlY2VpdmVyKSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBSZWZsZWN0LmdldCh0YXJnZXQsIHByb3BlcnR5LCByZWNlaXZlcik7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eSh0aGlzLmFwaSwgJ3dlYjMnLCB7XG4gICAgICAgICAgICAgICAgdmFsdWU6IHdlYjMsXG4gICAgICAgICAgICAgICAgd3JpdGFibGU6IGZhbHNlLFxuICAgICAgICAgICAgICAgIGVudW1lcmFibGU6IGZhbHNlLFxuICAgICAgICAgICAgICAgIGNvbmZpZ3VyYWJsZTogZmFsc2VcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHRoaXMuY29uZmlnLmlwZnMpIHtcblxuICAgICAgICAgICAgbGV0IGlwZnMgPSBuZXcgUHJveHkodGhpcy5jb25maWcuaXBmcywge1xuICAgICAgICAgICAgICAgIGdldDogZnVuY3Rpb24odGFyZ2V0LCBwcm9wZXJ0eSwgcmVjZWl2ZXIpIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIFJlZmxlY3QuZ2V0KHRhcmdldCwgcHJvcGVydHksIHJlY2VpdmVyKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KHRoaXMuYXBpLCAnaXBmcycsIHtcbiAgICAgICAgICAgICAgICB2YWx1ZTogaXBmcyxcbiAgICAgICAgICAgICAgICB3cml0YWJsZTogZmFsc2UsXG4gICAgICAgICAgICAgICAgZW51bWVyYWJsZTogZmFsc2UsXG4gICAgICAgICAgICAgICAgY29uZmlndXJhYmxlOiBmYWxzZVxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICAvLyBQb3B1bGF0ZSBsaWJyYXJ5IG1ldGhvZHNcbiAgICBfYWRkTWVtYmVycyhzdWJqZWN0LCBtZW1iZXJzKSB7XG4gICAgICAgIGxldCBzZWxmID0gdGhpcztcblxuICAgICAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkoc2VsZiwgc3ViamVjdCwge1xuICAgICAgICAgICAgdmFsdWU6IHt9LFxuICAgICAgICAgICAgd3JpdGFibGU6IGZhbHNlLFxuICAgICAgICAgICAgZW51bWVyYWJsZTogdHJ1ZSxcbiAgICAgICAgICAgIGNvbmZpZ3VyYWJsZTogZmFsc2VcbiAgICAgICAgfSk7XG5cbiAgICAgICAgZm9yIChsZXQga2V5IGluIG1lbWJlcnMpIHtcbiAgICAgICAgICAgIGxldCBtZW1iZXI7XG4gICAgICAgICAgICBcbiAgICAgICAgICAgIGlmICh0eXBlb2YgbWVtYmVyc1trZXldID09PSAnZnVuY3Rpb24nKSB7XG5cbiAgICAgICAgICAgICAgICBtZW1iZXIgPSBuZXcgUHJveHkobWVtYmVyc1trZXldLCB7XG4gICAgICAgICAgICAgICAgICAgIGFwcGx5OiBmdW5jdGlvbih0YXJnZXQsIHRoYXQsIGFyZ3MpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgICAgICAgICAgICAgLy8gYWRkIGNvbmZpZyBvYmplY3QgdG8gZXZlcnkgbWV0aG9kcyBjYWxsc1xuICAgICAgICAgICAgICAgICAgICAgICAgYXJncy5wdXNoKHNlbGYuY29uZmlnKTtcblxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIFJlZmxlY3QuYXBwbHkodGFyZ2V0LCBzZWxmLCBhcmdzKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfSBlbHNlIGlmIChrZXkpIHtcblxuICAgICAgICAgICAgICAgIG1lbWJlciA9IG5ldyBQcm94eShtZW1iZXJzW2tleV0sIHtcbiAgICAgICAgICAgICAgICAgICAgZ2V0OiBmdW5jdGlvbih0YXJnZXQsIHByb3BlcnR5LCByZWNlaXZlcikge1xuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIFJlZmxlY3QuZ2V0KHRhcmdldCwgcHJvcGVydHksIHJlY2VpdmVyKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkodGhpc1tzdWJqZWN0XSwga2V5LCB7XG4gICAgICAgICAgICAgICAgdmFsdWU6IG1lbWJlcixcbiAgICAgICAgICAgICAgICB3cml0YWJsZTogZmFsc2UsXG4gICAgICAgICAgICAgICAgZW51bWVyYWJsZTogZmFsc2UsXG4gICAgICAgICAgICAgICAgY29uZmlndXJhYmxlOiBmYWxzZVxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICB9XG59XG5cbm1vZHVsZS5leHBvcnRzID0gUGpzO1xuIl19