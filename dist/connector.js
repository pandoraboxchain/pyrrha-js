/**
 * Websocket connection manager for Node.js
 * This file it is a part of the Pandora Pyrrha Javascript library
 * 
 * @file connector.js
 * @author Kostiantyn Smyrnov <kostysh@gmail.com>
 * @date 2018
 */
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.DISCONNECTED = exports.CONNECTED = exports.CONNECTING = exports.STOPPED = void 0;

require("core-js/modules/es7.symbol.async-iterator");

require("core-js/modules/es6.symbol");

require("core-js/modules/web.dom.iterable");

require("core-js/modules/es6.array.iterator");

require("core-js/modules/es6.object.keys");

require("core-js/modules/es6.object.set-prototype-of");

require("core-js/modules/es6.promise");

require("regenerator-runtime/runtime");

var _events = require("events");

var _errors = _interopRequireWildcard(require("./helpers/errors"));

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; var ownKeys = Object.keys(source); if (typeof Object.getOwnPropertySymbols === 'function') { ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) { return Object.getOwnPropertyDescriptor(source, sym).enumerable; })); } ownKeys.forEach(function (key) { _defineProperty(target, key, source[key]); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

var STOPPED = 'STOPPED';
exports.STOPPED = STOPPED;
var CONNECTING = 'CONNECTING';
exports.CONNECTING = CONNECTING;
var CONNECTED = 'CONNECTED';
exports.CONNECTED = CONNECTED;
var DISCONNECTED = 'DISCONNECTED';
/**
 * Websocket connection manager class for Pjs
 *
 * @export
 * @class PjsWsConnector
 * @extends {EventEmitter}
 * @event error
 * @event connecting
 * @event connected
 * @event timeout
 * @event stopped
 * @event lastBlockNumber
 */

exports.DISCONNECTED = DISCONNECTED;

var PjsWsConnector =
/*#__PURE__*/
function (_EventEmitter) {
  _inherits(PjsWsConnector, _EventEmitter);

  _createClass(PjsWsConnector, [{
    key: "pjs",
    get: function get() {
      return this._pjs;
    }
  }, {
    key: "lastBlock",
    get: function get() {
      return this._lastBlock;
    }
  }, {
    key: "readyState",
    get: function get() {
      if (this._connecting) {
        return CONNECTING;
      }

      if (this._connected) {
        return CONNECTED;
      }

      return DISCONNECTED;
    }
    /**
     *Creates an instance of PjsWsConnector.
    * @param {Function} Pjs
    * @param {Object} [options={}]
    * @memberof PjsWsConnector
    */

  }]);

  function PjsWsConnector(Pjs) {
    var _this;

    var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
    var connectOnSetup = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;

    _classCallCheck(this, PjsWsConnector);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(PjsWsConnector).call(this));

    if (!Pjs) {
      throw (0, _errors.default)(_errors.PJS_REQUIRED);
    }

    _this._config = _objectSpread({
      protocol: 'wss',
      host: 'localhost',
      port: 8545,
      wstimeout: 2000,
      provider: undefined,
      contracts: undefined,
      addresses: undefined
    }, options.config);

    _this._setStopped(true);

    _this._lastBlock = 0;
    _this._Pjs = Pjs;
    _this._pjs = null;

    _this.on('timeout', function () {
      return _this._connect();
    });

    if (connectOnSetup) {
      _this._connect();
    }

    return _this;
  } // Set STOPPED state


  _createClass(PjsWsConnector, [{
    key: "_setStopped",
    value: function _setStopped() {
      var silent = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;
      this._connected = false;
      this._connecting = false;
      this._shouldStopped = false;
      this._stopped = true;
      clearInterval(this._watchingInterval);
      this._watchingInterval = null;

      if (!silent) {
        this.emit('stopped', {
          date: Date.now()
        });
      }
    } // Set CONNECTING state

  }, {
    key: "_setConnecting",
    value: function _setConnecting() {
      this._stopped = false;
      this._connected = false;
      this._connecting = true;
      this.emit('connecting', {
        date: Date.now()
      });
    } // Set DISCONNECTED state and emit timeout event

  }, {
    key: "_setTimeoutExceeded",
    value: function _setTimeoutExceeded() {
      this._stopped = false;
      this._connected = false;
      this._connecting = false;
      this.emit('timeout', (0, _errors.default)(_errors.WEB3_CONNECTION_TIMEOUT, this._config.wstimeout));
    } // Set CONNECTED state

  }, {
    key: "_setConnected",
    value: function _setConnected() {
      var _this2 = this;

      this._stopped = false;
      this._connected = true;
      this._connecting = false;
      this.emit('connected', {
        date: Date.now()
      });

      this._config.provider.on('error', function (err) {
        return _this2.emit('error', err);
      });

      this._config.provider.on('end', function () {
        return _this2._connect();
      });

      this._watchConnection();
    } // Watch for connection via getting last block number

  }, {
    key: "_watchConnection",
    value: function _watchConnection() {
      var _this3 = this;

      this._watchingInterval = setInterval(function () {
        if (_this3._shouldStopped) {
          _this3._config.provider.connection.on('close', function () {
            return _this3._setStopped();
          });

          _this3._config.provider.connection.close();

          return;
        }

        var timeout = setTimeout(function () {
          return _this3._setTimeoutExceeded();
        }, _this3._config.wstimeout);

        _this3._pjs.api.web3.getBlockNumber().then(function (blockNumber) {
          _this3._lastBlock = blockNumber;
          clearTimeout(timeout);

          _this3.emit('lastBlockNumber', _this3._lastBlock);
        }).catch(function (err) {
          _this3.emit('error', err);

          clearTimeout(timeout);

          _this3._setTimeoutExceeded();
        });
      }, this._config.wstimeout * 1.1);
    } // Trying to establish connection using websocket provider

  }, {
    key: "_connect",
    value: function _connect() {
      var _this4 = this;

      if (this._connecting) {
        return;
      } // Disable previous watching interval


      clearInterval(this._watchingInterval);
      var url = "".concat(this._config.protocol, "://").concat(this._config.host).concat(this._config.port ? ':' + this._config.port : ''); // Override url for testing purposes

      if (process.env.NODE_ENV === 'testing' && process.env.TESTING_PROVIDER_URL) {
        url = process.env.TESTING_PROVIDER_URL;
      } // Moving to CONNECTING state


      this._setConnecting(); // Create new WS provider


      this._config.provider = new this._Pjs.Web3.providers.WebsocketProvider(url);

      if (!this._pjs) {
        this._pjs = new this._Pjs({
          eth: {
            provider: this._config.provider
          },
          contracts: this._config.contracts,
          addresses: this._config.addresses
        });
      } else {
        this._pjs.api.web3.setProvider(this._config.provider);
      }

      if (this._config.provider.connection.readyState === this._config.provider.connection.OPEN) {
        return this._setConnected();
      }

      var connectionTimeout = setTimeout(function () {
        return _this4._setTimeoutExceeded();
      }, this._config.wstimeout);

      this._config.provider.on('connect', function () {
        clearTimeout(connectionTimeout);

        _this4._setConnected(); // Moving to CONNECTED state

      });
    }
  }, {
    key: "connect",
    value: function () {
      var _connect2 = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee() {
        var _this5 = this;

        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                return _context.abrupt("return", new Promise(function (resolve, reject) {
                  if (_this5._connected) {
                    return resolve();
                  }

                  function onConnected() {
                    this.removeListener('error', onError);
                    resolve();
                  }

                  function onError() {
                    this.removeListener('connected', onConnected);
                    reject();
                  }

                  _this5.once('connected', onConnected);

                  _this5.once('error', onError);

                  if (!_this5._connecting) {
                    _this5._connect();
                  }
                }));

              case 1:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, this);
      }));

      return function connect() {
        return _connect2.apply(this, arguments);
      };
    }()
  }, {
    key: "close",
    value: function () {
      var _close = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee2() {
        var _this6 = this;

        return regeneratorRuntime.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                return _context2.abrupt("return", new Promise(function (resolve, reject) {
                  if (_this6._stopped) {
                    return resolve();
                  }

                  function onStopped() {
                    this.removeListener('error', onError);
                    resolve();
                  }

                  function onError() {
                    this.removeListener('stopped', onStopped);
                    reject();
                  }

                  _this6.once('stopped', onStopped);

                  _this6.once('error', onError);

                  if (!_this6._shouldStopped) {
                    _this6._shouldStopped = true;
                  }
                }));

              case 1:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2, this);
      }));

      return function close() {
        return _close.apply(this, arguments);
      };
    }()
  }]);

  return PjsWsConnector;
}(_events.EventEmitter);

exports.default = PjsWsConnector;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9jb25uZWN0b3IuanMiXSwibmFtZXMiOlsiU1RPUFBFRCIsIkNPTk5FQ1RJTkciLCJDT05ORUNURUQiLCJESVNDT05ORUNURUQiLCJQanNXc0Nvbm5lY3RvciIsIl9wanMiLCJfbGFzdEJsb2NrIiwiX2Nvbm5lY3RpbmciLCJfY29ubmVjdGVkIiwiUGpzIiwib3B0aW9ucyIsImNvbm5lY3RPblNldHVwIiwiUEpTX1JFUVVJUkVEIiwiX2NvbmZpZyIsInByb3RvY29sIiwiaG9zdCIsInBvcnQiLCJ3c3RpbWVvdXQiLCJwcm92aWRlciIsInVuZGVmaW5lZCIsImNvbnRyYWN0cyIsImFkZHJlc3NlcyIsImNvbmZpZyIsIl9zZXRTdG9wcGVkIiwiX1BqcyIsIm9uIiwiX2Nvbm5lY3QiLCJzaWxlbnQiLCJfc2hvdWxkU3RvcHBlZCIsIl9zdG9wcGVkIiwiY2xlYXJJbnRlcnZhbCIsIl93YXRjaGluZ0ludGVydmFsIiwiZW1pdCIsImRhdGUiLCJEYXRlIiwibm93IiwiV0VCM19DT05ORUNUSU9OX1RJTUVPVVQiLCJlcnIiLCJfd2F0Y2hDb25uZWN0aW9uIiwic2V0SW50ZXJ2YWwiLCJjb25uZWN0aW9uIiwiY2xvc2UiLCJ0aW1lb3V0Iiwic2V0VGltZW91dCIsIl9zZXRUaW1lb3V0RXhjZWVkZWQiLCJhcGkiLCJ3ZWIzIiwiZ2V0QmxvY2tOdW1iZXIiLCJ0aGVuIiwiYmxvY2tOdW1iZXIiLCJjbGVhclRpbWVvdXQiLCJjYXRjaCIsInVybCIsInByb2Nlc3MiLCJlbnYiLCJOT0RFX0VOViIsIlRFU1RJTkdfUFJPVklERVJfVVJMIiwiX3NldENvbm5lY3RpbmciLCJXZWIzIiwicHJvdmlkZXJzIiwiV2Vic29ja2V0UHJvdmlkZXIiLCJldGgiLCJzZXRQcm92aWRlciIsInJlYWR5U3RhdGUiLCJPUEVOIiwiX3NldENvbm5lY3RlZCIsImNvbm5lY3Rpb25UaW1lb3V0IiwiUHJvbWlzZSIsInJlc29sdmUiLCJyZWplY3QiLCJvbkNvbm5lY3RlZCIsInJlbW92ZUxpc3RlbmVyIiwib25FcnJvciIsIm9uY2UiLCJvblN0b3BwZWQiLCJFdmVudEVtaXR0ZXIiXSwibWFwcGluZ3MiOiJBQUFBOzs7Ozs7OztBQVFBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUVBOztBQUNBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFFTyxJQUFNQSxPQUFPLEdBQUcsU0FBaEI7O0FBQ0EsSUFBTUMsVUFBVSxHQUFHLFlBQW5COztBQUNBLElBQU1DLFNBQVMsR0FBRyxXQUFsQjs7QUFDQSxJQUFNQyxZQUFZLEdBQUcsY0FBckI7QUFFUDs7Ozs7Ozs7Ozs7Ozs7OztJQWFxQkMsYzs7Ozs7Ozt3QkFFUDtBQUNOLGFBQU8sS0FBS0MsSUFBWjtBQUNIOzs7d0JBRWU7QUFDWixhQUFPLEtBQUtDLFVBQVo7QUFDSDs7O3dCQUVnQjtBQUViLFVBQUksS0FBS0MsV0FBVCxFQUFzQjtBQUVsQixlQUFPTixVQUFQO0FBQ0g7O0FBRUQsVUFBSSxLQUFLTyxVQUFULEVBQXFCO0FBRWpCLGVBQU9OLFNBQVA7QUFDSDs7QUFFRCxhQUFPQyxZQUFQO0FBQ0g7QUFFRDs7Ozs7Ozs7O0FBTUEsMEJBQVlNLEdBQVosRUFBdUQ7QUFBQTs7QUFBQSxRQUF0Q0MsT0FBc0MsdUVBQTVCLEVBQTRCO0FBQUEsUUFBeEJDLGNBQXdCLHVFQUFQLEtBQU87O0FBQUE7O0FBQ25EOztBQUVBLFFBQUksQ0FBQ0YsR0FBTCxFQUFVO0FBRU4sWUFBTSxxQkFBU0csb0JBQVQsQ0FBTjtBQUNIOztBQUVELFVBQUtDLE9BQUw7QUFDSUMsTUFBQUEsUUFBUSxFQUFFLEtBRGQ7QUFFSUMsTUFBQUEsSUFBSSxFQUFFLFdBRlY7QUFHSUMsTUFBQUEsSUFBSSxFQUFFLElBSFY7QUFJSUMsTUFBQUEsU0FBUyxFQUFFLElBSmY7QUFLSUMsTUFBQUEsUUFBUSxFQUFFQyxTQUxkO0FBTUlDLE1BQUFBLFNBQVMsRUFBRUQsU0FOZjtBQU9JRSxNQUFBQSxTQUFTLEVBQUVGO0FBUGYsT0FRT1QsT0FBTyxDQUFDWSxNQVJmOztBQVdB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QUFMLENBQVUsU0FBVixFQUFxQkMsU0FBckI7O0FBQ0Esa0JBQUEsTUFBSSxDQUFDRCxJQUFMLENBQVUsT0FBVixFQUFtQkQsT0FBbkI7O0FBRUEsc0JBQUksQ0FBQyxNQUFJLENBQUM1QyxjQUFWLEVBQTBCO0FBRXRCLG9CQUFBLE1BQUksQ0FBQ0EsY0FBTCxHQUFzQixJQUF0QjtBQUNIO0FBQ0osaUJBeEJNLEM7Ozs7Ozs7Ozs7Ozs7Ozs7O0VBNU42QitDLG9CIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBXZWJzb2NrZXQgY29ubmVjdGlvbiBtYW5hZ2VyIGZvciBOb2RlLmpzXG4gKiBUaGlzIGZpbGUgaXQgaXMgYSBwYXJ0IG9mIHRoZSBQYW5kb3JhIFB5cnJoYSBKYXZhc2NyaXB0IGxpYnJhcnlcbiAqIFxuICogQGZpbGUgY29ubmVjdG9yLmpzXG4gKiBAYXV0aG9yIEtvc3RpYW50eW4gU215cm5vdiA8a29zdHlzaEBnbWFpbC5jb20+XG4gKiBAZGF0ZSAyMDE4XG4gKi9cbid1c2Ugc3RyaWN0JztcblxuaW1wb3J0IHsgRXZlbnRFbWl0dGVyIH0gZnJvbSAnZXZlbnRzJztcbmltcG9ydCBQanNFcnJvciwgeyBQSlNfUkVRVUlSRUQsIFdFQjNfQ09OTkVDVElPTl9USU1FT1VUIH0gZnJvbSAnLi9oZWxwZXJzL2Vycm9ycyc7XG5cbmV4cG9ydCBjb25zdCBTVE9QUEVEID0gJ1NUT1BQRUQnO1xuZXhwb3J0IGNvbnN0IENPTk5FQ1RJTkcgPSAnQ09OTkVDVElORyc7XG5leHBvcnQgY29uc3QgQ09OTkVDVEVEID0gJ0NPTk5FQ1RFRCc7XG5leHBvcnQgY29uc3QgRElTQ09OTkVDVEVEID0gJ0RJU0NPTk5FQ1RFRCc7XG5cbi8qKlxuICogV2Vic29ja2V0IGNvbm5lY3Rpb24gbWFuYWdlciBjbGFzcyBmb3IgUGpzXG4gKlxuICogQGV4cG9ydFxuICogQGNsYXNzIFBqc1dzQ29ubmVjdG9yXG4gKiBAZXh0ZW5kcyB7RXZlbnRFbWl0dGVyfVxuICogQGV2ZW50IGVycm9yXG4gKiBAZXZlbnQgY29ubmVjdGluZ1xuICogQGV2ZW50IGNvbm5lY3RlZFxuICogQGV2ZW50IHRpbWVvdXRcbiAqIEBldmVudCBzdG9wcGVkXG4gKiBAZXZlbnQgbGFzdEJsb2NrTnVtYmVyXG4gKi9cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFBqc1dzQ29ubmVjdG9yIGV4dGVuZHMgRXZlbnRFbWl0dGVyIHtcblxuICAgIGdldCBwanMoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLl9wanM7XG4gICAgfVxuXG4gICAgZ2V0IGxhc3RCbG9jaygpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX2xhc3RCbG9jaztcbiAgICB9XG5cbiAgICBnZXQgcmVhZHlTdGF0ZSgpIHtcblxuICAgICAgICBpZiAodGhpcy5fY29ubmVjdGluZykge1xuXG4gICAgICAgICAgICByZXR1cm4gQ09OTkVDVElORztcbiAgICAgICAgfVxuXG4gICAgICAgIGlmICh0aGlzLl9jb25uZWN0ZWQpIHtcblxuICAgICAgICAgICAgcmV0dXJuIENPTk5FQ1RFRDtcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiBESVNDT05ORUNURUQ7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICpDcmVhdGVzIGFuIGluc3RhbmNlIG9mIFBqc1dzQ29ubmVjdG9yLlxuICAgICogQHBhcmFtIHtGdW5jdGlvbn0gUGpzXG4gICAgKiBAcGFyYW0ge09iamVjdH0gW29wdGlvbnM9e31dXG4gICAgKiBAbWVtYmVyb2YgUGpzV3NDb25uZWN0b3JcbiAgICAqL1xuICAgIGNvbnN0cnVjdG9yKFBqcywgb3B0aW9ucyA9IHt9LCBjb25uZWN0T25TZXR1cCA9IGZhbHNlKSB7XG4gICAgICAgIHN1cGVyKCk7XG5cbiAgICAgICAgaWYgKCFQanMpIHtcblxuICAgICAgICAgICAgdGhyb3cgUGpzRXJyb3IoUEpTX1JFUVVJUkVEKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMuX2NvbmZpZyA9IHtcbiAgICAgICAgICAgIHByb3RvY29sOiAnd3NzJyxcbiAgICAgICAgICAgIGhvc3Q6ICdsb2NhbGhvc3QnLFxuICAgICAgICAgICAgcG9ydDogODU0NSxcbiAgICAgICAgICAgIHdzdGltZW91dDogMjAwMCxcbiAgICAgICAgICAgIHByb3ZpZGVyOiB1bmRlZmluZWQsXG4gICAgICAgICAgICBjb250cmFjdHM6IHVuZGVmaW5lZCxcbiAgICAgICAgICAgIGFkZHJlc3NlczogdW5kZWZpbmVkLFxuICAgICAgICAgICAgLi4ub3B0aW9ucy5jb25maWdcbiAgICAgICAgfTtcblxuICAgICAgICB0aGlzLl9zZXRTdG9wcGVkKHRydWUpO1xuICAgICAgICB0aGlzLl9sYXN0QmxvY2sgPSAwO1xuICAgICAgICB0aGlzLl9QanMgPSBQanM7XG4gICAgICAgIHRoaXMuX3BqcyA9IG51bGw7XG5cbiAgICAgICAgdGhpcy5vbigndGltZW91dCcsICgpID0+IHRoaXMuX2Nvbm5lY3QoKSk7XG5cbiAgICAgICAgaWYgKGNvbm5lY3RPblNldHVwKSB7XG5cbiAgICAgICAgICAgIHRoaXMuX2Nvbm5lY3QoKTtcbiAgICAgICAgfSAgICAgICAgXG4gICAgfVxuXG4gICAgLy8gU2V0IFNUT1BQRUQgc3RhdGVcbiAgICBfc2V0U3RvcHBlZChzaWxlbnQgPSBmYWxzZSkge1xuICAgICAgICB0aGlzLl9jb25uZWN0ZWQgPSBmYWxzZTtcbiAgICAgICAgdGhpcy5fY29ubmVjdGluZyA9IGZhbHNlO1xuICAgICAgICB0aGlzLl9zaG91bGRTdG9wcGVkID0gZmFsc2U7XG4gICAgICAgIHRoaXMuX3N0b3BwZWQgPSB0cnVlO1xuICAgICAgICBjbGVhckludGVydmFsKHRoaXMuX3dhdGNoaW5nSW50ZXJ2YWwpO1xuICAgICAgICB0aGlzLl93YXRjaGluZ0ludGVydmFsID0gbnVsbDtcblxuICAgICAgICBpZiAoIXNpbGVudCkge1xuXG4gICAgICAgICAgICB0aGlzLmVtaXQoJ3N0b3BwZWQnLCB7XG4gICAgICAgICAgICAgICAgZGF0ZTogRGF0ZS5ub3coKVxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH0gICAgICAgIFxuICAgIH1cblxuICAgIC8vIFNldCBDT05ORUNUSU5HIHN0YXRlXG4gICAgX3NldENvbm5lY3RpbmcoKSB7XG4gICAgICAgIHRoaXMuX3N0b3BwZWQgPSBmYWxzZTtcbiAgICAgICAgdGhpcy5fY29ubmVjdGVkID0gZmFsc2U7XG4gICAgICAgIHRoaXMuX2Nvbm5lY3RpbmcgPSB0cnVlO1xuICAgICAgICB0aGlzLmVtaXQoJ2Nvbm5lY3RpbmcnLCB7XG4gICAgICAgICAgICBkYXRlOiBEYXRlLm5vdygpXG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIC8vIFNldCBESVNDT05ORUNURUQgc3RhdGUgYW5kIGVtaXQgdGltZW91dCBldmVudFxuICAgIF9zZXRUaW1lb3V0RXhjZWVkZWQoKSB7XG4gICAgICAgIHRoaXMuX3N0b3BwZWQgPSBmYWxzZTtcbiAgICAgICAgdGhpcy5fY29ubmVjdGVkID0gZmFsc2U7XG4gICAgICAgIHRoaXMuX2Nvbm5lY3RpbmcgPSBmYWxzZTtcbiAgICAgICAgdGhpcy5lbWl0KCd0aW1lb3V0JywgUGpzRXJyb3IoV0VCM19DT05ORUNUSU9OX1RJTUVPVVQsIHRoaXMuX2NvbmZpZy53c3RpbWVvdXQpKTsgICAgICAgIFxuICAgIH1cblxuICAgIC8vIFNldCBDT05ORUNURUQgc3RhdGVcbiAgICBfc2V0Q29ubmVjdGVkKCkge1xuICAgICAgICB0aGlzLl9zdG9wcGVkID0gZmFsc2U7XG4gICAgICAgIHRoaXMuX2Nvbm5lY3RlZCA9IHRydWU7XG4gICAgICAgIHRoaXMuX2Nvbm5lY3RpbmcgPSBmYWxzZTtcbiAgICAgICAgdGhpcy5lbWl0KCdjb25uZWN0ZWQnLCB7XG4gICAgICAgICAgICBkYXRlOiBEYXRlLm5vdygpXG4gICAgICAgIH0pO1xuICAgICAgICB0aGlzLl9jb25maWcucHJvdmlkZXIub24oJ2Vycm9yJywgZXJyID0+IHRoaXMuZW1pdCgnZXJyb3InLCBlcnIpKTtcbiAgICAgICAgdGhpcy5fY29uZmlnLnByb3ZpZGVyLm9uKCdlbmQnLCAoKSA9PiB0aGlzLl9jb25uZWN0KCkpO1xuICAgICAgICB0aGlzLl93YXRjaENvbm5lY3Rpb24oKTtcbiAgICB9XG5cbiAgICAvLyBXYXRjaCBmb3IgY29ubmVjdGlvbiB2aWEgZ2V0dGluZyBsYXN0IGJsb2NrIG51bWJlclxuICAgIF93YXRjaENvbm5lY3Rpb24oKSB7XG5cbiAgICAgICAgdGhpcy5fd2F0Y2hpbmdJbnRlcnZhbCA9IHNldEludGVydmFsKCgpID0+IHtcblxuICAgICAgICAgICAgaWYgKHRoaXMuX3Nob3VsZFN0b3BwZWQpIHtcblxuICAgICAgICAgICAgICAgIHRoaXMuX2NvbmZpZy5wcm92aWRlci5jb25uZWN0aW9uLm9uKCdjbG9zZScsICgpID0+IHRoaXMuX3NldFN0b3BwZWQoKSk7XG4gICAgICAgICAgICAgICAgdGhpcy5fY29uZmlnLnByb3ZpZGVyLmNvbm5lY3Rpb24uY2xvc2UoKTtcbiAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGNvbnN0IHRpbWVvdXQgPSBzZXRUaW1lb3V0KCgpID0+IHRoaXMuX3NldFRpbWVvdXRFeGNlZWRlZCgpLCB0aGlzLl9jb25maWcud3N0aW1lb3V0KTtcblxuICAgICAgICAgICAgdGhpcy5fcGpzLmFwaS53ZWIzLmdldEJsb2NrTnVtYmVyKClcbiAgICAgICAgICAgICAgICAudGhlbihibG9ja051bWJlciA9PiB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuX2xhc3RCbG9jayA9IGJsb2NrTnVtYmVyO1xuICAgICAgICAgICAgICAgICAgICBjbGVhclRpbWVvdXQodGltZW91dCk7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuZW1pdCgnbGFzdEJsb2NrTnVtYmVyJywgdGhpcy5fbGFzdEJsb2NrKTtcbiAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgICAgIC5jYXRjaChlcnIgPT4ge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmVtaXQoJ2Vycm9yJywgZXJyKTtcbiAgICAgICAgICAgICAgICAgICAgY2xlYXJUaW1lb3V0KHRpbWVvdXQpO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLl9zZXRUaW1lb3V0RXhjZWVkZWQoKTsgICAgICAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICB9LCB0aGlzLl9jb25maWcud3N0aW1lb3V0ICogMS4xKTtcbiAgICB9XG5cbiAgICAvLyBUcnlpbmcgdG8gZXN0YWJsaXNoIGNvbm5lY3Rpb24gdXNpbmcgd2Vic29ja2V0IHByb3ZpZGVyXG4gICAgX2Nvbm5lY3QoKSB7XG5cbiAgICAgICAgaWYgKHRoaXMuX2Nvbm5lY3RpbmcpIHtcblxuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG5cbiAgICAgICAgLy8gRGlzYWJsZSBwcmV2aW91cyB3YXRjaGluZyBpbnRlcnZhbFxuICAgICAgICBjbGVhckludGVydmFsKHRoaXMuX3dhdGNoaW5nSW50ZXJ2YWwpO1xuXG4gICAgICAgIGxldCB1cmwgPSBgJHt0aGlzLl9jb25maWcucHJvdG9jb2x9Oi8vJHt0aGlzLl9jb25maWcuaG9zdH0ke3RoaXMuX2NvbmZpZy5wb3J0ID8gJzonICsgdGhpcy5fY29uZmlnLnBvcnQgOiAnJ31gO1xuXG4gICAgICAgIC8vIE92ZXJyaWRlIHVybCBmb3IgdGVzdGluZyBwdXJwb3Nlc1xuICAgICAgICBpZiAocHJvY2Vzcy5lbnYuTk9ERV9FTlYgPT09ICd0ZXN0aW5nJyAmJiBwcm9jZXNzLmVudi5URVNUSU5HX1BST1ZJREVSX1VSTCkge1xuXG4gICAgICAgICAgICB1cmwgPSBwcm9jZXNzLmVudi5URVNUSU5HX1BST1ZJREVSX1VSTDtcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIE1vdmluZyB0byBDT05ORUNUSU5HIHN0YXRlXG4gICAgICAgIHRoaXMuX3NldENvbm5lY3RpbmcoKTtcblxuICAgICAgICAvLyBDcmVhdGUgbmV3IFdTIHByb3ZpZGVyXG4gICAgICAgIHRoaXMuX2NvbmZpZy5wcm92aWRlciA9IG5ldyB0aGlzLl9QanMuV2ViMy5wcm92aWRlcnMuV2Vic29ja2V0UHJvdmlkZXIodXJsKTtcblxuICAgICAgICBpZiAoIXRoaXMuX3Bqcykge1xuXG4gICAgICAgICAgICB0aGlzLl9wanMgPSBuZXcgdGhpcy5fUGpzKHtcbiAgICAgICAgICAgICAgICBldGg6IHtcbiAgICAgICAgICAgICAgICAgICAgcHJvdmlkZXI6IHRoaXMuX2NvbmZpZy5wcm92aWRlclxuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgY29udHJhY3RzOiB0aGlzLl9jb25maWcuY29udHJhY3RzLFxuICAgICAgICAgICAgICAgIGFkZHJlc3NlczogdGhpcy5fY29uZmlnLmFkZHJlc3Nlc1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH0gZWxzZSB7XG5cbiAgICAgICAgICAgIHRoaXMuX3Bqcy5hcGkud2ViMy5zZXRQcm92aWRlcih0aGlzLl9jb25maWcucHJvdmlkZXIpO1xuICAgICAgICB9XG4gICAgICAgIFxuICAgICAgICBpZiAodGhpcy5fY29uZmlnLnByb3ZpZGVyLmNvbm5lY3Rpb24ucmVhZHlTdGF0ZSA9PT0gdGhpcy5fY29uZmlnLnByb3ZpZGVyLmNvbm5lY3Rpb24uT1BFTikge1xuXG4gICAgICAgICAgICByZXR1cm4gdGhpcy5fc2V0Q29ubmVjdGVkKCk7XG4gICAgICAgIH1cblxuICAgICAgICBjb25zdCBjb25uZWN0aW9uVGltZW91dCA9IHNldFRpbWVvdXQoKCkgPT4gdGhpcy5fc2V0VGltZW91dEV4Y2VlZGVkKCksIHRoaXMuX2NvbmZpZy53c3RpbWVvdXQpO1xuICAgICAgICBcbiAgICAgICAgdGhpcy5fY29uZmlnLnByb3ZpZGVyLm9uKCdjb25uZWN0JywgKCkgPT4ge1xuICAgICAgICAgICAgY2xlYXJUaW1lb3V0KGNvbm5lY3Rpb25UaW1lb3V0KTsgICAgICAgICAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgIHRoaXMuX3NldENvbm5lY3RlZCgpOy8vIE1vdmluZyB0byBDT05ORUNURUQgc3RhdGVcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgYXN5bmMgY29ubmVjdCgpIHtcbiAgICAgICAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcblxuICAgICAgICAgICAgaWYgKHRoaXMuX2Nvbm5lY3RlZCkge1xuXG4gICAgICAgICAgICAgICAgcmV0dXJuIHJlc29sdmUoKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgZnVuY3Rpb24gb25Db25uZWN0ZWQoKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5yZW1vdmVMaXN0ZW5lcignZXJyb3InLCBvbkVycm9yKTtcbiAgICAgICAgICAgICAgICByZXNvbHZlKCk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGZ1bmN0aW9uIG9uRXJyb3IoKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5yZW1vdmVMaXN0ZW5lcignY29ubmVjdGVkJywgb25Db25uZWN0ZWQpO1xuICAgICAgICAgICAgICAgIHJlamVjdCgpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICB0aGlzLm9uY2UoJ2Nvbm5lY3RlZCcsIG9uQ29ubmVjdGVkKTtcbiAgICAgICAgICAgIHRoaXMub25jZSgnZXJyb3InLCBvbkVycm9yKTtcblxuICAgICAgICAgICAgaWYgKCF0aGlzLl9jb25uZWN0aW5nKSB7XG5cbiAgICAgICAgICAgICAgICB0aGlzLl9jb25uZWN0KCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIGFzeW5jIGNsb3NlKCkge1xuICAgICAgICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuXG4gICAgICAgICAgICBpZiAodGhpcy5fc3RvcHBlZCkge1xuXG4gICAgICAgICAgICAgICAgcmV0dXJuIHJlc29sdmUoKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgZnVuY3Rpb24gb25TdG9wcGVkKCkge1xuICAgICAgICAgICAgICAgIHRoaXMucmVtb3ZlTGlzdGVuZXIoJ2Vycm9yJywgb25FcnJvcik7XG4gICAgICAgICAgICAgICAgcmVzb2x2ZSgpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBmdW5jdGlvbiBvbkVycm9yKCkge1xuICAgICAgICAgICAgICAgIHRoaXMucmVtb3ZlTGlzdGVuZXIoJ3N0b3BwZWQnLCBvblN0b3BwZWQpO1xuICAgICAgICAgICAgICAgIHJlamVjdCgpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICB0aGlzLm9uY2UoJ3N0b3BwZWQnLCBvblN0b3BwZWQpO1xuICAgICAgICAgICAgdGhpcy5vbmNlKCdlcnJvcicsIG9uRXJyb3IpO1xuXG4gICAgICAgICAgICBpZiAoIXRoaXMuX3Nob3VsZFN0b3BwZWQpIHtcblxuICAgICAgICAgICAgICAgIHRoaXMuX3Nob3VsZFN0b3BwZWQgPSB0cnVlO1xuICAgICAgICAgICAgfSAgICAgICAgICAgIFxuICAgICAgICB9KTtcbiAgICB9XG59XG4iXX0=