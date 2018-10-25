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
      return this.pjs;
    }
  }, {
    key: "lastBlock",
    get: function get() {
      return this.lastBlock;
    }
  }, {
    key: "readyState",
    get: function get() {
      if (this.connecting) {
        return CONNECTING;
      }

      if (this.connected) {
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

    _this.config = _objectSpread({
      protocol: 'wss',
      host: 'localhost',
      port: 8545,
      wstimeout: 2000,
      provider: undefined,
      contracts: undefined,
      addresses: undefined
    }, options.config);

    _this._setStopped(true);

    _this.lastBlock = 0;
    _this.Pjs = Pjs;
    _this.pjs = null;

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
      this.connected = false;
      this.connecting = false;
      this.shouldStopped = false;
      this.stopped = true;
      clearInterval(this.watchingInterval);
      this.watchingInterval = null;

      if (!silent) {
        this.emit('stopped', {
          date: Date.now()
        });
      }
    } // Set CONNECTING state

  }, {
    key: "_setConnecting",
    value: function _setConnecting() {
      this.stopped = false;
      this.connected = false;
      this.connecting = true;
      this.emit('connecting', {
        date: Date.now()
      });
    } // Set DISCONNECTED state and emit timeout event

  }, {
    key: "_setTimeoutExceeded",
    value: function _setTimeoutExceeded() {
      this.stopped = false;
      this.connected = false;
      this.connecting = false;
      this.emit('timeout', (0, _errors.default)(_errors.WEB3_CONNECTION_TIMEOUT, this.config.wstimeout));
    } // Set CONNECTED state

  }, {
    key: "_setConnected",
    value: function _setConnected() {
      var _this2 = this;

      this.stopped = false;
      this.connected = true;
      this.connecting = false;
      this.emit('connected', {
        date: Date.now()
      });
      this.config.provider.on('error', function (err) {
        return _this2.emit('error', err);
      });
      this.config.provider.on('end', function () {
        return _this2._connect();
      });

      this._watchConnection();
    } // Watch for connection via getting last block number

  }, {
    key: "_watchConnection",
    value: function _watchConnection() {
      var _this3 = this;

      this.watchingInterval = setInterval(function () {
        if (_this3.shouldStopped) {
          _this3.config.provider.connection.on('close', function () {
            return _this3._setStopped();
          });

          _this3.config.provider.connection.close();

          return;
        }

        var timeout = setTimeout(function () {
          return _this3._setTimeoutExceeded();
        }, _this3.config.wstimeout);

        _this3.pjs.api.web3.getBlockNumber().then(function (blockNumber) {
          _this3.lastBlock = blockNumber;
          clearTimeout(timeout);

          _this3.emit('lastBlockNumber', _this3.lastBlock);
        }).catch(function (err) {
          _this3.emit('error', err);

          clearTimeout(timeout);

          _this3._setTimeoutExceeded();
        });
      }, this.config.wstimeout * 1.1);
    } // Trying to establish connection using websocket provider

  }, {
    key: "_connect",
    value: function _connect() {
      var _this4 = this;

      if (this.connecting) {
        return;
      } // Disable previous watching interval


      clearInterval(this.watchingInterval);
      var url = "".concat(this.config.protocol, "://").concat(this.config.host).concat(this.config.port ? ':' + this.config.port : ''); // Override url for testing purposes

      if (process.env.NODE_ENV === 'testing' && process.env.TESTING_PROVIDER_URL) {
        url = process.env.TESTING_PROVIDER_URL;
      } // Moving to CONNECTING state


      this._setConnecting(); // Create new WS provider


      this.config.provider = new this.Pjs.Web3.providers.WebsocketProvider(url);

      if (!this.pjs) {
        this.pjs = new this.Pjs({
          eth: {
            provider: this.config.provider
          },
          contracts: this.config.contracts,
          addresses: this.config.addresses
        });
      } else {
        this.pjs.api.web3.setProvider(this.config.provider);
      }

      if (this.config.provider.connection.readyState === this.config.provider.connection.OPEN) {
        return this._setConnected();
      }

      var connectionTimeout = setTimeout(function () {
        return _this4._setTimeoutExceeded();
      }, this.config.wstimeout);
      this.config.provider.on('connect', function () {
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
                  if (_this5.connected) {
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

                  if (!_this5.connecting) {
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
                  if (_this6.stopped) {
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

                  if (!_this6.shouldStopped) {
                    _this6.shouldStopped = true;
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9jb25uZWN0b3IuanMiXSwibmFtZXMiOlsiU1RPUFBFRCIsIkNPTk5FQ1RJTkciLCJDT05ORUNURUQiLCJESVNDT05ORUNURUQiLCJQanNXc0Nvbm5lY3RvciIsInBqcyIsImxhc3RCbG9jayIsImNvbm5lY3RpbmciLCJjb25uZWN0ZWQiLCJQanMiLCJvcHRpb25zIiwiY29ubmVjdE9uU2V0dXAiLCJQSlNfUkVRVUlSRUQiLCJjb25maWciLCJwcm90b2NvbCIsImhvc3QiLCJwb3J0Iiwid3N0aW1lb3V0IiwicHJvdmlkZXIiLCJ1bmRlZmluZWQiLCJjb250cmFjdHMiLCJhZGRyZXNzZXMiLCJfc2V0U3RvcHBlZCIsIm9uIiwiX2Nvbm5lY3QiLCJzaWxlbnQiLCJzaG91bGRTdG9wcGVkIiwic3RvcHBlZCIsImNsZWFySW50ZXJ2YWwiLCJ3YXRjaGluZ0ludGVydmFsIiwiZW1pdCIsImRhdGUiLCJEYXRlIiwibm93IiwiV0VCM19DT05ORUNUSU9OX1RJTUVPVVQiLCJlcnIiLCJfd2F0Y2hDb25uZWN0aW9uIiwic2V0SW50ZXJ2YWwiLCJjb25uZWN0aW9uIiwiY2xvc2UiLCJ0aW1lb3V0Iiwic2V0VGltZW91dCIsIl9zZXRUaW1lb3V0RXhjZWVkZWQiLCJhcGkiLCJ3ZWIzIiwiZ2V0QmxvY2tOdW1iZXIiLCJ0aGVuIiwiYmxvY2tOdW1iZXIiLCJjbGVhclRpbWVvdXQiLCJjYXRjaCIsInVybCIsInByb2Nlc3MiLCJlbnYiLCJOT0RFX0VOViIsIlRFU1RJTkdfUFJPVklERVJfVVJMIiwiX3NldENvbm5lY3RpbmciLCJXZWIzIiwicHJvdmlkZXJzIiwiV2Vic29ja2V0UHJvdmlkZXIiLCJldGgiLCJzZXRQcm92aWRlciIsInJlYWR5U3RhdGUiLCJPUEVOIiwiX3NldENvbm5lY3RlZCIsImNvbm5lY3Rpb25UaW1lb3V0IiwiUHJvbWlzZSIsInJlc29sdmUiLCJyZWplY3QiLCJvbkNvbm5lY3RlZCIsInJlbW92ZUxpc3RlbmVyIiwib25FcnJvciIsIm9u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TUFBSSxDQUFDRCxJQUFMLENBQVUsT0FBVixFQUFtQkQsT0FBbkI7O0FBRUEsc0JBQUksQ0FBQyxNQUFJLENBQUM1QyxhQUFWLEVBQXlCO0FBRXJCLG9CQUFBLE1BQUksQ0FBQ0EsYUFBTCxHQUFxQixJQUFyQjtBQUNIO0FBQ0osaUJBeEJNLEM7Ozs7Ozs7Ozs7Ozs7Ozs7O0VBNU42QitDLG9CIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBXZWJzb2NrZXQgY29ubmVjdGlvbiBtYW5hZ2VyIGZvciBOb2RlLmpzXG4gKiBUaGlzIGZpbGUgaXQgaXMgYSBwYXJ0IG9mIHRoZSBQYW5kb3JhIFB5cnJoYSBKYXZhc2NyaXB0IGxpYnJhcnlcbiAqIFxuICogQGZpbGUgY29ubmVjdG9yLmpzXG4gKiBAYXV0aG9yIEtvc3RpYW50eW4gU215cm5vdiA8a29zdHlzaEBnbWFpbC5jb20+XG4gKiBAZGF0ZSAyMDE4XG4gKi9cbid1c2Ugc3RyaWN0JztcblxuaW1wb3J0IHsgRXZlbnRFbWl0dGVyIH0gZnJvbSAnZXZlbnRzJztcbmltcG9ydCBQanNFcnJvciwgeyBQSlNfUkVRVUlSRUQsIFdFQjNfQ09OTkVDVElPTl9USU1FT1VUIH0gZnJvbSAnLi9oZWxwZXJzL2Vycm9ycyc7XG5cbmV4cG9ydCBjb25zdCBTVE9QUEVEID0gJ1NUT1BQRUQnO1xuZXhwb3J0IGNvbnN0IENPTk5FQ1RJTkcgPSAnQ09OTkVDVElORyc7XG5leHBvcnQgY29uc3QgQ09OTkVDVEVEID0gJ0NPTk5FQ1RFRCc7XG5leHBvcnQgY29uc3QgRElTQ09OTkVDVEVEID0gJ0RJU0NPTk5FQ1RFRCc7XG5cbi8qKlxuICogV2Vic29ja2V0IGNvbm5lY3Rpb24gbWFuYWdlciBjbGFzcyBmb3IgUGpzXG4gKlxuICogQGV4cG9ydFxuICogQGNsYXNzIFBqc1dzQ29ubmVjdG9yXG4gKiBAZXh0ZW5kcyB7RXZlbnRFbWl0dGVyfVxuICogQGV2ZW50IGVycm9yXG4gKiBAZXZlbnQgY29ubmVjdGluZ1xuICogQGV2ZW50IGNvbm5lY3RlZFxuICogQGV2ZW50IHRpbWVvdXRcbiAqIEBldmVudCBzdG9wcGVkXG4gKiBAZXZlbnQgbGFzdEJsb2NrTnVtYmVyXG4gKi9cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFBqc1dzQ29ubmVjdG9yIGV4dGVuZHMgRXZlbnRFbWl0dGVyIHtcblxuICAgIGdldCBwanMoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLnBqcztcbiAgICB9XG5cbiAgICBnZXQgbGFzdEJsb2NrKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5sYXN0QmxvY2s7XG4gICAgfVxuXG4gICAgZ2V0IHJlYWR5U3RhdGUoKSB7XG5cbiAgICAgICAgaWYgKHRoaXMuY29ubmVjdGluZykge1xuXG4gICAgICAgICAgICByZXR1cm4gQ09OTkVDVElORztcbiAgICAgICAgfVxuXG4gICAgICAgIGlmICh0aGlzLmNvbm5lY3RlZCkge1xuXG4gICAgICAgICAgICByZXR1cm4gQ09OTkVDVEVEO1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIERJU0NPTk5FQ1RFRDtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKkNyZWF0ZXMgYW4gaW5zdGFuY2Ugb2YgUGpzV3NDb25uZWN0b3IuXG4gICAgKiBAcGFyYW0ge0Z1bmN0aW9ufSBQanNcbiAgICAqIEBwYXJhbSB7T2JqZWN0fSBbb3B0aW9ucz17fV1cbiAgICAqIEBtZW1iZXJvZiBQanNXc0Nvbm5lY3RvclxuICAgICovXG4gICAgY29uc3RydWN0b3IoUGpzLCBvcHRpb25zID0ge30sIGNvbm5lY3RPblNldHVwID0gZmFsc2UpIHtcbiAgICAgICAgc3VwZXIoKTtcblxuICAgICAgICBpZiAoIVBqcykge1xuXG4gICAgICAgICAgICB0aHJvdyBQanNFcnJvcihQSlNfUkVRVUlSRUQpO1xuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy5jb25maWcgPSB7XG4gICAgICAgICAgICBwcm90b2NvbDogJ3dzcycsXG4gICAgICAgICAgICBob3N0OiAnbG9jYWxob3N0JyxcbiAgICAgICAgICAgIHBvcnQ6IDg1NDUsXG4gICAgICAgICAgICB3c3RpbWVvdXQ6IDIwMDAsXG4gICAgICAgICAgICBwcm92aWRlcjogdW5kZWZpbmVkLFxuICAgICAgICAgICAgY29udHJhY3RzOiB1bmRlZmluZWQsXG4gICAgICAgICAgICBhZGRyZXNzZXM6IHVuZGVmaW5lZCxcbiAgICAgICAgICAgIC4uLm9wdGlvbnMuY29uZmlnXG4gICAgICAgIH07XG5cbiAgICAgICAgdGhpcy5fc2V0U3RvcHBlZCh0cnVlKTtcbiAgICAgICAgdGhpcy5sYXN0QmxvY2sgPSAwO1xuICAgICAgICB0aGlzLlBqcyA9IFBqcztcbiAgICAgICAgdGhpcy5wanMgPSBudWxsO1xuXG4gICAgICAgIHRoaXMub24oJ3RpbWVvdXQnLCAoKSA9PiB0aGlzLl9jb25uZWN0KCkpO1xuXG4gICAgICAgIGlmIChjb25uZWN0T25TZXR1cCkge1xuXG4gICAgICAgICAgICB0aGlzLl9jb25uZWN0KCk7XG4gICAgICAgIH0gICAgICAgIFxuICAgIH1cblxuICAgIC8vIFNldCBTVE9QUEVEIHN0YXRlXG4gICAgX3NldFN0b3BwZWQoc2lsZW50ID0gZmFsc2UpIHtcbiAgICAgICAgdGhpcy5jb25uZWN0ZWQgPSBmYWxzZTtcbiAgICAgICAgdGhpcy5jb25uZWN0aW5nID0gZmFsc2U7XG4gICAgICAgIHRoaXMuc2hvdWxkU3RvcHBlZCA9IGZhbHNlO1xuICAgICAgICB0aGlzLnN0b3BwZWQgPSB0cnVlO1xuICAgICAgICBjbGVhckludGVydmFsKHRoaXMud2F0Y2hpbmdJbnRlcnZhbCk7XG4gICAgICAgIHRoaXMud2F0Y2hpbmdJbnRlcnZhbCA9IG51bGw7XG5cbiAgICAgICAgaWYgKCFzaWxlbnQpIHtcblxuICAgICAgICAgICAgdGhpcy5lbWl0KCdzdG9wcGVkJywge1xuICAgICAgICAgICAgICAgIGRhdGU6IERhdGUubm93KClcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9ICAgICAgICBcbiAgICB9XG5cbiAgICAvLyBTZXQgQ09OTkVDVElORyBzdGF0ZVxuICAgIF9zZXRDb25uZWN0aW5nKCkge1xuICAgICAgICB0aGlzLnN0b3BwZWQgPSBmYWxzZTtcbiAgICAgICAgdGhpcy5jb25uZWN0ZWQgPSBmYWxzZTtcbiAgICAgICAgdGhpcy5jb25uZWN0aW5nID0gdHJ1ZTtcbiAgICAgICAgdGhpcy5lbWl0KCdjb25uZWN0aW5nJywge1xuICAgICAgICAgICAgZGF0ZTogRGF0ZS5ub3coKVxuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICAvLyBTZXQgRElTQ09OTkVDVEVEIHN0YXRlIGFuZCBlbWl0IHRpbWVvdXQgZXZlbnRcbiAgICBfc2V0VGltZW91dEV4Y2VlZGVkKCkge1xuICAgICAgICB0aGlzLnN0b3BwZWQgPSBmYWxzZTtcbiAgICAgICAgdGhpcy5jb25uZWN0ZWQgPSBmYWxzZTtcbiAgICAgICAgdGhpcy5jb25uZWN0aW5nID0gZmFsc2U7XG4gICAgICAgIHRoaXMuZW1pdCgndGltZW91dCcsIFBqc0Vycm9yKFdFQjNfQ09OTkVDVElPTl9USU1FT1VULCB0aGlzLmNvbmZpZy53c3RpbWVvdXQpKTsgICAgICAgIFxuICAgIH1cblxuICAgIC8vIFNldCBDT05ORUNURUQgc3RhdGVcbiAgICBfc2V0Q29ubmVjdGVkKCkge1xuICAgICAgICB0aGlzLnN0b3BwZWQgPSBmYWxzZTtcbiAgICAgICAgdGhpcy5jb25uZWN0ZWQgPSB0cnVlO1xuICAgICAgICB0aGlzLmNvbm5lY3RpbmcgPSBmYWxzZTtcbiAgICAgICAgdGhpcy5lbWl0KCdjb25uZWN0ZWQnLCB7XG4gICAgICAgICAgICBkYXRlOiBEYXRlLm5vdygpXG4gICAgICAgIH0pO1xuICAgICAgICB0aGlzLmNvbmZpZy5wcm92aWRlci5vbignZXJyb3InLCBlcnIgPT4gdGhpcy5lbWl0KCdlcnJvcicsIGVycikpO1xuICAgICAgICB0aGlzLmNvbmZpZy5wcm92aWRlci5vbignZW5kJywgKCkgPT4gdGhpcy5fY29ubmVjdCgpKTtcbiAgICAgICAgdGhpcy5fd2F0Y2hDb25uZWN0aW9uKCk7XG4gICAgfVxuXG4gICAgLy8gV2F0Y2ggZm9yIGNvbm5lY3Rpb24gdmlhIGdldHRpbmcgbGFzdCBibG9jayBudW1iZXJcbiAgICBfd2F0Y2hDb25uZWN0aW9uKCkge1xuXG4gICAgICAgIHRoaXMud2F0Y2hpbmdJbnRlcnZhbCA9IHNldEludGVydmFsKCgpID0+IHtcblxuICAgICAgICAgICAgaWYgKHRoaXMuc2hvdWxkU3RvcHBlZCkge1xuXG4gICAgICAgICAgICAgICAgdGhpcy5jb25maWcucHJvdmlkZXIuY29ubmVjdGlvbi5vbignY2xvc2UnLCAoKSA9PiB0aGlzLl9zZXRTdG9wcGVkKCkpO1xuICAgICAgICAgICAgICAgIHRoaXMuY29uZmlnLnByb3ZpZGVyLmNvbm5lY3Rpb24uY2xvc2UoKTtcbiAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGNvbnN0IHRpbWVvdXQgPSBzZXRUaW1lb3V0KCgpID0+IHRoaXMuX3NldFRpbWVvdXRFeGNlZWRlZCgpLCB0aGlzLmNvbmZpZy53c3RpbWVvdXQpO1xuXG4gICAgICAgICAgICB0aGlzLnBqcy5hcGkud2ViMy5nZXRCbG9ja051bWJlcigpXG4gICAgICAgICAgICAgICAgLnRoZW4oYmxvY2tOdW1iZXIgPT4ge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmxhc3RCbG9jayA9IGJsb2NrTnVtYmVyO1xuICAgICAgICAgICAgICAgICAgICBjbGVhclRpbWVvdXQodGltZW91dCk7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuZW1pdCgnbGFzdEJsb2NrTnVtYmVyJywgdGhpcy5sYXN0QmxvY2spO1xuICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgICAgLmNhdGNoKGVyciA9PiB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuZW1pdCgnZXJyb3InLCBlcnIpO1xuICAgICAgICAgICAgICAgICAgICBjbGVhclRpbWVvdXQodGltZW91dCk7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuX3NldFRpbWVvdXRFeGNlZWRlZCgpOyAgICAgICAgICAgICAgICAgICAgXG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgIH0sIHRoaXMuY29uZmlnLndzdGltZW91dCAqIDEuMSk7XG4gICAgfVxuXG4gICAgLy8gVHJ5aW5nIHRvIGVzdGFibGlzaCBjb25uZWN0aW9uIHVzaW5nIHdlYnNvY2tldCBwcm92aWRlclxuICAgIF9jb25uZWN0KCkge1xuXG4gICAgICAgIGlmICh0aGlzLmNvbm5lY3RpbmcpIHtcblxuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG5cbiAgICAgICAgLy8gRGlzYWJsZSBwcmV2aW91cyB3YXRjaGluZyBpbnRlcnZhbFxuICAgICAgICBjbGVhckludGVydmFsKHRoaXMud2F0Y2hpbmdJbnRlcnZhbCk7XG5cbiAgICAgICAgbGV0IHVybCA9IGAke3RoaXMuY29uZmlnLnByb3RvY29sfTovLyR7dGhpcy5jb25maWcuaG9zdH0ke3RoaXMuY29uZmlnLnBvcnQgPyAnOicgKyB0aGlzLmNvbmZpZy5wb3J0IDogJyd9YDtcblxuICAgICAgICAvLyBPdmVycmlkZSB1cmwgZm9yIHRlc3RpbmcgcHVycG9zZXNcbiAgICAgICAgaWYgKHByb2Nlc3MuZW52Lk5PREVfRU5WID09PSAndGVzdGluZycgJiYgcHJvY2Vzcy5lbnYuVEVTVElOR19QUk9WSURFUl9VUkwpIHtcblxuICAgICAgICAgICAgdXJsID0gcHJvY2Vzcy5lbnYuVEVTVElOR19QUk9WSURFUl9VUkw7XG4gICAgICAgIH1cblxuICAgICAgICAvLyBNb3ZpbmcgdG8gQ09OTkVDVElORyBzdGF0ZVxuICAgICAgICB0aGlzLl9zZXRDb25uZWN0aW5nKCk7XG5cbiAgICAgICAgLy8gQ3JlYXRlIG5ldyBXUyBwcm92aWRlclxuICAgICAgICB0aGlzLmNvbmZpZy5wcm92aWRlciA9IG5ldyB0aGlzLlBqcy5XZWIzLnByb3ZpZGVycy5XZWJzb2NrZXRQcm92aWRlcih1cmwpO1xuXG4gICAgICAgIGlmICghdGhpcy5wanMpIHtcblxuICAgICAgICAgICAgdGhpcy5wanMgPSBuZXcgdGhpcy5QanMoe1xuICAgICAgICAgICAgICAgIGV0aDoge1xuICAgICAgICAgICAgICAgICAgICBwcm92aWRlcjogdGhpcy5jb25maWcucHJvdmlkZXJcbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIGNvbnRyYWN0czogdGhpcy5jb25maWcuY29udHJhY3RzLFxuICAgICAgICAgICAgICAgIGFkZHJlc3NlczogdGhpcy5jb25maWcuYWRkcmVzc2VzXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfSBlbHNlIHtcblxuICAgICAgICAgICAgdGhpcy5wanMuYXBpLndlYjMuc2V0UHJvdmlkZXIodGhpcy5jb25maWcucHJvdmlkZXIpO1xuICAgICAgICB9XG4gICAgICAgIFxuICAgICAgICBpZiAodGhpcy5jb25maWcucHJvdmlkZXIuY29ubmVjdGlvbi5yZWFkeVN0YXRlID09PSB0aGlzLmNvbmZpZy5wcm92aWRlci5jb25uZWN0aW9uLk9QRU4pIHtcblxuICAgICAgICAgICAgcmV0dXJuIHRoaXMuX3NldENvbm5lY3RlZCgpO1xuICAgICAgICB9XG5cbiAgICAgICAgY29uc3QgY29ubmVjdGlvblRpbWVvdXQgPSBzZXRUaW1lb3V0KCgpID0+IHRoaXMuX3NldFRpbWVvdXRFeGNlZWRlZCgpLCB0aGlzLmNvbmZpZy53c3RpbWVvdXQpO1xuICAgICAgICBcbiAgICAgICAgdGhpcy5jb25maWcucHJvdmlkZXIub24oJ2Nvbm5lY3QnLCAoKSA9PiB7XG4gICAgICAgICAgICBjbGVhclRpbWVvdXQoY29ubmVjdGlvblRpbWVvdXQpOyAgICAgICAgICAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgdGhpcy5fc2V0Q29ubmVjdGVkKCk7Ly8gTW92aW5nIHRvIENPTk5FQ1RFRCBzdGF0ZVxuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICBhc3luYyBjb25uZWN0KCkge1xuICAgICAgICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuXG4gICAgICAgICAgICBpZiAodGhpcy5jb25uZWN0ZWQpIHtcblxuICAgICAgICAgICAgICAgIHJldHVybiByZXNvbHZlKCk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGZ1bmN0aW9uIG9uQ29ubmVjdGVkKCkge1xuICAgICAgICAgICAgICAgIHRoaXMucmVtb3ZlTGlzdGVuZXIoJ2Vycm9yJywgb25FcnJvcik7XG4gICAgICAgICAgICAgICAgcmVzb2x2ZSgpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBmdW5jdGlvbiBvbkVycm9yKCkge1xuICAgICAgICAgICAgICAgIHRoaXMucmVtb3ZlTGlzdGVuZXIoJ2Nvbm5lY3RlZCcsIG9uQ29ubmVjdGVkKTtcbiAgICAgICAgICAgICAgICByZWplY3QoKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgdGhpcy5vbmNlKCdjb25uZWN0ZWQnLCBvbkNvbm5lY3RlZCk7XG4gICAgICAgICAgICB0aGlzLm9uY2UoJ2Vycm9yJywgb25FcnJvcik7XG5cbiAgICAgICAgICAgIGlmICghdGhpcy5jb25uZWN0aW5nKSB7XG5cbiAgICAgICAgICAgICAgICB0aGlzLl9jb25uZWN0KCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIGFzeW5jIGNsb3NlKCkge1xuICAgICAgICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuXG4gICAgICAgICAgICBpZiAodGhpcy5zdG9wcGVkKSB7XG5cbiAgICAgICAgICAgICAgICByZXR1cm4gcmVzb2x2ZSgpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBmdW5jdGlvbiBvblN0b3BwZWQoKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5yZW1vdmVMaXN0ZW5lcignZXJyb3InLCBvbkVycm9yKTtcbiAgICAgICAgICAgICAgICByZXNvbHZlKCk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGZ1bmN0aW9uIG9uRXJyb3IoKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5yZW1vdmVMaXN0ZW5lcignc3RvcHBlZCcsIG9uU3RvcHBlZCk7XG4gICAgICAgICAgICAgICAgcmVqZWN0KCk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHRoaXMub25jZSgnc3RvcHBlZCcsIG9uU3RvcHBlZCk7XG4gICAgICAgICAgICB0aGlzLm9uY2UoJ2Vycm9yJywgb25FcnJvcik7XG5cbiAgICAgICAgICAgIGlmICghdGhpcy5zaG91bGRTdG9wcGVkKSB7XG5cbiAgICAgICAgICAgICAgICB0aGlzLnNob3VsZFN0b3BwZWQgPSB0cnVlO1xuICAgICAgICAgICAgfSAgICAgICAgICAgIFxuICAgICAgICB9KTtcbiAgICB9XG59XG4iXX0=