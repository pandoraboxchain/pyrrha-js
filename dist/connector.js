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
      if (this._stopped) {
        return STOPPED;
      }

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
  }

  _createClass(PjsWsConnector, [{
    key: "_getBlockNumber",
    value: function _getBlockNumber() {
      var _this2 = this;

      var cb = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : function () {};
      var timeout = setTimeout(function () {
        return _this2._setTimeoutExceeded();
      }, this._config.wstimeout);

      this._pjs.api.web3.eth.getBlockNumber().then(function (blockNumber) {
        _this2._lastBlock = blockNumber;
        clearTimeout(timeout);
        cb(null, blockNumber);
      }).catch(cb);
    } // Set STOPPED state

  }, {
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

      if (!this._shouldStopped) {
        this.emit('timeout', (0, _errors.default)(_errors.WEB3_CONNECTION_TIMEOUT, this._config.wstimeout));
      }
    } // Set CONNECTED state

  }, {
    key: "_setConnected",
    value: function _setConnected() {
      var _this3 = this;

      this._stopped = false;
      this._connected = true;
      this._connecting = false;

      this._watchConnection();

      this._getBlockNumber(function (err, blockNumber) {
        if (err) {
          _this3.emit('error', err);

          _this3._setTimeoutExceeded();

          return;
        }

        _this3.emit('connected', {
          date: Date.now(),
          blockNumber: blockNumber
        });
      });
    } // Watch for connection via getting last block number

  }, {
    key: "_watchConnection",
    value: function _watchConnection() {
      var _this4 = this;

      this._watchingInterval = setInterval(function () {
        if (_this4._shouldStopped) {
          _this4._config.provider.on('close', function () {
            return _this4._setStopped();
          });

          _this4._config.provider.connection.close();

          return;
        }

        _this4._getBlockNumber(function (err, blockNumber) {
          if (err) {
            _this4.emit('error', err);

            _this4._setTimeoutExceeded();

            return;
          }

          _this4.emit('lastBlockNumber', blockNumber);
        });
      }, this._config.wstimeout * 1.1);
    } // Trying to establish connection using websocket provider

  }, {
    key: "_connect",
    value: function _connect() {
      var _this5 = this;

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

      this._config.provider.on('error', function (err) {
        return _this5.emit('error', err);
      });

      this._config.provider.on('end', function () {
        return _this5._setTimeoutExceeded();
      });

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
        return _this5._setTimeoutExceeded();
      }, this._config.wstimeout);

      this._config.provider.on('connect', function () {
        clearTimeout(connectionTimeout);

        _this5._setConnected(); // Moving to CONNECTED state

      });
    }
  }, {
    key: "connect",
    value: function () {
      var _connect2 = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee() {
        var _this6 = this;

        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                return _context.abrupt("return", new Promise(function (resolve, reject) {
                  if (_this6._connected) {
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

                  _this6.once('connected', onConnected);

                  _this6.once('error', onError);

                  if (!_this6._connecting) {
                    _this6._connect();
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
        var _this7 = this;

        return regeneratorRuntime.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                return _context2.abrupt("return", new Promise(function (resolve, reject) {
                  if (_this7._stopped) {
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

                  _this7.once('stopped', onStopped);

                  _this7.once('error', onError);

                  if (!_this7._shouldStopped) {
                    _this7._shouldStopped = true;
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9jb25uZWN0b3IuanMiXSwibmFtZXMiOlsiU1RPUFBFRCIsIkNPTk5FQ1RJTkciLCJDT05ORUNURUQiLCJESVNDT05ORUNURUQiLCJQanNXc0Nvbm5lY3RvciIsIl9wanMiLCJfbGFzdEJsb2NrIiwiX3N0b3BwZWQiLCJfY29ubmVjdGluZyIsIl9jb25uZWN0ZWQiLCJQanMiLCJvcHRpb25zIiwiY29ubmVjdE9uU2V0dXAiLCJQSlNfUkVRVUlSRUQiLCJfY29uZmlnIiwicHJvdG9jb2wiLCJob3N0IiwicG9ydCIsIndzdGltZW91dCIsInByb3ZpZGVyIiwidW5kZWZpbmVkIiwiY29udHJhY3RzIiwiYWRkcmVzc2VzIiwiY29uZmlnIiwiX3NldFN0b3BwZWQiLCJfUGpzIiwib24iLCJfY29ubmVjdCIsImNiIiwidGltZW91dCIsInNldFRpbWVvdXQiLCJfc2V0VGltZW91dEV4Y2VlZGVkIiwiYXBpIiwid2ViMyIsImV0aCIsImdldEJsb2NrTnVtYmVyIiwidGhlbiIsImJsb2NrTnVtYmVyIiwiY2xlYXJUaW1lb3V0IiwiY2F0Y2giLCJzaWxlbnQiLCJfc2hvdWxkU3RvcHBlZCIsImNsZWFySW50ZXJ2YWwiLCJfd2F0Y2hpbmdJbnRlcnZhbCIsImVtaXQiLCJkYXRlIiwiRGF0ZSIsIm5vdyIsIldFQjNfQ09OTkVDVElPTl9USU1FT1VUIiwiX3dhdGNoQ29ubmVjdGlvbiIsIl9nZXRCbG9ja051bWJlciIsImVyciIsInNldEludGVydmFsIiwiY29ubmVjdGlvbiIsImNsb3NlIiwidXJsIiwicHJvY2VzcyIsImVudiIsIk5PREVfRU5WIiwiVEVTVElOR19QUk9WSURFUl9VUkwiLCJfc2V0Q29ubmVjdGluZyIsIldlYjMiLCJwcm92aWRlcnMiLCJXZWJzb2NrZXRQcm92aWRlciIsInNldFByb3ZpZGVyIiwicmVhZHlTdGF0ZSIsIk9QRU4iLCJfc2V0Q29ubmVjdGVkIiwiY29ubmVjdGlvblRpbWVvdXQiLCJQcm9taXNlIiwicmVzb2x2ZSIsInJlamVjdCIsIm9uQ29ubmVjdGVkIiwicmVtb3ZlTGlzdGVuZXIiLCJvbkVycm9yIiwib25jZSIsIm9uU3RvcHBlZCIsIkV2ZW50RW1pdHRlciJdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7Ozs7O0FBUUE7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBRUE7O0FBQ0E7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUVPLElBQU1BLE9BQU8sR0FBRyxTQUFoQjs7QUFDQSxJQUFNQyxVQUFVLEdBQUcsWUFBbkI7O0FBQ0EsSUFBTUMsU0FBUyxHQUFHLFdBQWxCOztBQUNBLElBQU1DLFlBQVksR0FBRyxjQUFyQjtBQUVQOzs7Ozs7Ozs7Ozs7Ozs7O0lBYXFCQyxjOzs7Ozs7O3dCQUVQO0FBQ04sYUFBTyxLQUFLQyxJQUFaO0FBQ0g7Ozt3QkFFZTtBQUNaLGFBQU8sS0FBS0MsVUFBWjtBQUNIOzs7d0JBRWdCO0FBRWIsVUFBSSxLQUFLQyxRQUFULEVBQW1CO0FBRWYsZUFBT1AsT0FBUDtBQUNIOztBQUVELFVBQUksS0FBS1EsV0FBVCxFQUFzQjtBQUVsQixlQUFPUCxVQUFQO0FBQ0g7O0FBRUQsVUFBSSxLQUFLUSxVQUFULEVBQXFCO0FBRWpCLGVBQU9QLFNBQVA7QUFDSDs7QUFFRCxhQUFPQyxZQUFQO0FBQ0g7QUFFRDs7Ozs7Ozs7O0FBTUEsMEJBQVlPLEdBQVosRUFBdUQ7QUFBQTs7QUFBQSxRQUF0Q0MsT0FBc0MsdUVBQTVCLEVBQTRCO0FBQUEsUUFBeEJDLGNBQXdCLHVFQUFQLEtBQU87O0FBQUE7O0FBQ25EOztBQUVBLFFBQUksQ0FBQ0YsR0FBTCxFQUFVO0FBRU4sWUFBTSxxQkFBU0csb0JBQVQsQ0FBTjtBQUNIOztBQUVELFVBQUtDLE9BQUw7QUFDSUMsTUFBQUEsUUFBUSxFQUFFLEtBRGQ7QUFFSUMsTUFBQUEsSUFBSSxFQUFFLFdBRlY7QUFHSUMsTUFBQUEsSUFBSSxFQUFFLElBSFY7QUFJSUMsTUFBQUEsU0FBUyxFQUFFLElBSmY7QUFLSUMsTUFBQUEsUUFBUSxFQUFFQyxTQUxkO0FBTUlDLE1BQUFB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RUFBbUJELE9BQW5COztBQUVBLHNCQUFJLENBQUMsTUFBSSxDQUFDbEUsV0FBVixFQUF1QjtBQUVuQixvQkFBQSxNQUFJLENBQUNtQixRQUFMO0FBQ0g7QUFDSixpQkF4Qk0sQzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7a0RBNEJBLElBQUkwQyxPQUFKLENBQVksVUFBQ0MsT0FBRCxFQUFVQyxNQUFWLEVBQXFCO0FBRXBDLHNCQUFJLE1BQUksQ0FBQ2hFLFFBQVQsRUFBbUI7QUFFZiwyQkFBTytELE9BQU8sRUFBZDtBQUNIOztBQUVELDJCQUFTTSxTQUFULEdBQXFCO0FBQ2pCLHlCQUFLSCxjQUFMLENBQW9CLE9BQXBCLEVBQTZCQyxPQUE3QjtBQUNBSixvQkFBQUEsT0FBTztBQUNWOztBQUVELDJCQUFTSSxPQUFULEdBQW1CO0FBQ2YseUJBQUtELGNBQUwsQ0FBb0IsU0FBcEIsRUFBK0JHLFNBQS9CO0FBQ0FMLG9CQUFBQSxNQUFNO0FBQ1Q7O0FBRUQsa0JBQUEsTUFBSSxDQUFDSSxJQUFMLENBQVUsU0FBVixFQUFxQkMsU0FBckI7O0FBQ0Esa0JBQUEsTUFBSSxDQUFDRCxJQUFMLENBQVUsT0FBVixFQUFtQkQsT0FBbkI7O0FBRUEsc0JBQUksQ0FBQyxNQUFJLENBQUNqQyxjQUFWLEVBQTBCO0FBRXRCLG9CQUFBLE1BQUksQ0FBQ0EsY0FBTCxHQUFzQixJQUF0QjtBQUNIO0FBQ0osaUJBeEJNLEM7Ozs7Ozs7Ozs7Ozs7Ozs7O0VBM1A2Qm9DLG9CIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBXZWJzb2NrZXQgY29ubmVjdGlvbiBtYW5hZ2VyIGZvciBOb2RlLmpzXG4gKiBUaGlzIGZpbGUgaXQgaXMgYSBwYXJ0IG9mIHRoZSBQYW5kb3JhIFB5cnJoYSBKYXZhc2NyaXB0IGxpYnJhcnlcbiAqIFxuICogQGZpbGUgY29ubmVjdG9yLmpzXG4gKiBAYXV0aG9yIEtvc3RpYW50eW4gU215cm5vdiA8a29zdHlzaEBnbWFpbC5jb20+XG4gKiBAZGF0ZSAyMDE4XG4gKi9cbid1c2Ugc3RyaWN0JztcblxuaW1wb3J0IHsgRXZlbnRFbWl0dGVyIH0gZnJvbSAnZXZlbnRzJztcbmltcG9ydCBQanNFcnJvciwgeyBQSlNfUkVRVUlSRUQsIFdFQjNfQ09OTkVDVElPTl9USU1FT1VUIH0gZnJvbSAnLi9oZWxwZXJzL2Vycm9ycyc7XG5cbmV4cG9ydCBjb25zdCBTVE9QUEVEID0gJ1NUT1BQRUQnO1xuZXhwb3J0IGNvbnN0IENPTk5FQ1RJTkcgPSAnQ09OTkVDVElORyc7XG5leHBvcnQgY29uc3QgQ09OTkVDVEVEID0gJ0NPTk5FQ1RFRCc7XG5leHBvcnQgY29uc3QgRElTQ09OTkVDVEVEID0gJ0RJU0NPTk5FQ1RFRCc7XG5cbi8qKlxuICogV2Vic29ja2V0IGNvbm5lY3Rpb24gbWFuYWdlciBjbGFzcyBmb3IgUGpzXG4gKlxuICogQGV4cG9ydFxuICogQGNsYXNzIFBqc1dzQ29ubmVjdG9yXG4gKiBAZXh0ZW5kcyB7RXZlbnRFbWl0dGVyfVxuICogQGV2ZW50IGVycm9yXG4gKiBAZXZlbnQgY29ubmVjdGluZ1xuICogQGV2ZW50IGNvbm5lY3RlZFxuICogQGV2ZW50IHRpbWVvdXRcbiAqIEBldmVudCBzdG9wcGVkXG4gKiBAZXZlbnQgbGFzdEJsb2NrTnVtYmVyXG4gKi9cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFBqc1dzQ29ubmVjdG9yIGV4dGVuZHMgRXZlbnRFbWl0dGVyIHtcblxuICAgIGdldCBwanMoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLl9wanM7XG4gICAgfVxuXG4gICAgZ2V0IGxhc3RCbG9jaygpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX2xhc3RCbG9jaztcbiAgICB9XG5cbiAgICBnZXQgcmVhZHlTdGF0ZSgpIHtcblxuICAgICAgICBpZiAodGhpcy5fc3RvcHBlZCkge1xuXG4gICAgICAgICAgICByZXR1cm4gU1RPUFBFRDtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmICh0aGlzLl9jb25uZWN0aW5nKSB7XG5cbiAgICAgICAgICAgIHJldHVybiBDT05ORUNUSU5HO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHRoaXMuX2Nvbm5lY3RlZCkge1xuXG4gICAgICAgICAgICByZXR1cm4gQ09OTkVDVEVEO1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIERJU0NPTk5FQ1RFRDtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKkNyZWF0ZXMgYW4gaW5zdGFuY2Ugb2YgUGpzV3NDb25uZWN0b3IuXG4gICAgKiBAcGFyYW0ge0Z1bmN0aW9ufSBQanNcbiAgICAqIEBwYXJhbSB7T2JqZWN0fSBbb3B0aW9ucz17fV1cbiAgICAqIEBtZW1iZXJvZiBQanNXc0Nvbm5lY3RvclxuICAgICovXG4gICAgY29uc3RydWN0b3IoUGpzLCBvcHRpb25zID0ge30sIGNvbm5lY3RPblNldHVwID0gZmFsc2UpIHtcbiAgICAgICAgc3VwZXIoKTtcblxuICAgICAgICBpZiAoIVBqcykge1xuXG4gICAgICAgICAgICB0aHJvdyBQanNFcnJvcihQSlNfUkVRVUlSRUQpO1xuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy5fY29uZmlnID0ge1xuICAgICAgICAgICAgcHJvdG9jb2w6ICd3c3MnLFxuICAgICAgICAgICAgaG9zdDogJ2xvY2FsaG9zdCcsXG4gICAgICAgICAgICBwb3J0OiA4NTQ1LFxuICAgICAgICAgICAgd3N0aW1lb3V0OiAyMDAwLFxuICAgICAgICAgICAgcHJvdmlkZXI6IHVuZGVmaW5lZCxcbiAgICAgICAgICAgIGNvbnRyYWN0czogdW5kZWZpbmVkLFxuICAgICAgICAgICAgYWRkcmVzc2VzOiB1bmRlZmluZWQsXG4gICAgICAgICAgICAuLi5vcHRpb25zLmNvbmZpZ1xuICAgICAgICB9O1xuXG4gICAgICAgIHRoaXMuX3NldFN0b3BwZWQodHJ1ZSk7XG4gICAgICAgIHRoaXMuX2xhc3RCbG9jayA9IDA7XG4gICAgICAgIHRoaXMuX1BqcyA9IFBqcztcbiAgICAgICAgdGhpcy5fcGpzID0gbnVsbDtcblxuICAgICAgICB0aGlzLm9uKCd0aW1lb3V0JywgKCkgPT4gdGhpcy5fY29ubmVjdCgpKTtcblxuICAgICAgICBpZiAoY29ubmVjdE9uU2V0dXApIHtcblxuICAgICAgICAgICAgdGhpcy5fY29ubmVjdCgpO1xuICAgICAgICB9ICAgICAgICBcbiAgICB9XG5cbiAgICBfZ2V0QmxvY2tOdW1iZXIoY2IgPSAoKSA9PiB7fSkge1xuXG4gICAgICAgIGNvbnN0IHRpbWVvdXQgPSBzZXRUaW1lb3V0KCgpID0+IHRoaXMuX3NldFRpbWVvdXRFeGNlZWRlZCgpLCB0aGlzLl9jb25maWcud3N0aW1lb3V0KTtcblxuICAgICAgICB0aGlzLl9wanMuYXBpLndlYjMuZXRoLmdldEJsb2NrTnVtYmVyKClcbiAgICAgICAgICAgIC50aGVuKGJsb2NrTnVtYmVyID0+IHtcbiAgICAgICAgICAgICAgICB0aGlzLl9sYXN0QmxvY2sgPSBibG9ja051bWJlcjtcbiAgICAgICAgICAgICAgICBjbGVhclRpbWVvdXQodGltZW91dCk7XG4gICAgICAgICAgICAgICAgY2IobnVsbCwgYmxvY2tOdW1iZXIpO1xuICAgICAgICAgICAgfSlcbiAgICAgICAgICAgIC5jYXRjaChjYik7XG4gICAgfVxuXG4gICAgLy8gU2V0IFNUT1BQRUQgc3RhdGVcbiAgICBfc2V0U3RvcHBlZChzaWxlbnQgPSBmYWxzZSkge1xuICAgICAgICB0aGlzLl9jb25uZWN0ZWQgPSBmYWxzZTtcbiAgICAgICAgdGhpcy5fY29ubmVjdGluZyA9IGZhbHNlO1xuICAgICAgICB0aGlzLl9zaG91bGRTdG9wcGVkID0gZmFsc2U7XG4gICAgICAgIHRoaXMuX3N0b3BwZWQgPSB0cnVlO1xuICAgICAgICBjbGVhckludGVydmFsKHRoaXMuX3dhdGNoaW5nSW50ZXJ2YWwpO1xuICAgICAgICB0aGlzLl93YXRjaGluZ0ludGVydmFsID0gbnVsbDtcblxuICAgICAgICBpZiAoIXNpbGVudCkge1xuXG4gICAgICAgICAgICB0aGlzLmVtaXQoJ3N0b3BwZWQnLCB7XG4gICAgICAgICAgICAgICAgZGF0ZTogRGF0ZS5ub3coKVxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH0gICAgICAgIFxuICAgIH1cblxuICAgIC8vIFNldCBDT05ORUNUSU5HIHN0YXRlXG4gICAgX3NldENvbm5lY3RpbmcoKSB7XG4gICAgICAgIHRoaXMuX3N0b3BwZWQgPSBmYWxzZTtcbiAgICAgICAgdGhpcy5fY29ubmVjdGVkID0gZmFsc2U7XG4gICAgICAgIHRoaXMuX2Nvbm5lY3RpbmcgPSB0cnVlO1xuICAgICAgICB0aGlzLmVtaXQoJ2Nvbm5lY3RpbmcnLCB7XG4gICAgICAgICAgICBkYXRlOiBEYXRlLm5vdygpXG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIC8vIFNldCBESVNDT05ORUNURUQgc3RhdGUgYW5kIGVtaXQgdGltZW91dCBldmVudFxuICAgIF9zZXRUaW1lb3V0RXhjZWVkZWQoKSB7XG4gICAgICAgIHRoaXMuX3N0b3BwZWQgPSBmYWxzZTtcbiAgICAgICAgdGhpcy5fY29ubmVjdGVkID0gZmFsc2U7XG4gICAgICAgIHRoaXMuX2Nvbm5lY3RpbmcgPSBmYWxzZTtcblxuICAgICAgICBpZiAoIXRoaXMuX3Nob3VsZFN0b3BwZWQpIHtcblxuICAgICAgICAgICAgdGhpcy5lbWl0KCd0aW1lb3V0JywgUGpzRXJyb3IoV0VCM19DT05ORUNUSU9OX1RJTUVPVVQsIHRoaXMuX2NvbmZpZy53c3RpbWVvdXQpKTtcbiAgICAgICAgfSAgICAgICAgICAgICAgICBcbiAgICB9XG5cbiAgICAvLyBTZXQgQ09OTkVDVEVEIHN0YXRlXG4gICAgX3NldENvbm5lY3RlZCgpIHtcbiAgICAgICAgdGhpcy5fc3RvcHBlZCA9IGZhbHNlO1xuICAgICAgICB0aGlzLl9jb25uZWN0ZWQgPSB0cnVlO1xuICAgICAgICB0aGlzLl9jb25uZWN0aW5nID0gZmFsc2U7XG4gICAgICAgIHRoaXMuX3dhdGNoQ29ubmVjdGlvbigpO1xuICAgICAgICB0aGlzLl9nZXRCbG9ja051bWJlcigoZXJyLCBibG9ja051bWJlcikgPT4ge1xuXG4gICAgICAgICAgICBpZiAoZXJyKSB7XG5cbiAgICAgICAgICAgICAgICB0aGlzLmVtaXQoJ2Vycm9yJywgZXJyKTtcbiAgICAgICAgICAgICAgICB0aGlzLl9zZXRUaW1lb3V0RXhjZWVkZWQoKTtcbiAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHRoaXMuZW1pdCgnY29ubmVjdGVkJywge1xuICAgICAgICAgICAgICAgIGRhdGU6IERhdGUubm93KCksXG4gICAgICAgICAgICAgICAgYmxvY2tOdW1iZXJcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICAvLyBXYXRjaCBmb3IgY29ubmVjdGlvbiB2aWEgZ2V0dGluZyBsYXN0IGJsb2NrIG51bWJlclxuICAgIF93YXRjaENvbm5lY3Rpb24oKSB7XG5cbiAgICAgICAgdGhpcy5fd2F0Y2hpbmdJbnRlcnZhbCA9IHNldEludGVydmFsKCgpID0+IHtcblxuICAgICAgICAgICAgaWYgKHRoaXMuX3Nob3VsZFN0b3BwZWQpIHtcblxuICAgICAgICAgICAgICAgIHRoaXMuX2NvbmZpZy5wcm92aWRlci5vbignY2xvc2UnLCAoKSA9PiB0aGlzLl9zZXRTdG9wcGVkKCkpO1xuICAgICAgICAgICAgICAgIHRoaXMuX2NvbmZpZy5wcm92aWRlci5jb25uZWN0aW9uLmNsb3NlKCk7XG4gICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICB0aGlzLl9nZXRCbG9ja051bWJlcigoZXJyLCBibG9ja051bWJlcikgPT4ge1xuXG4gICAgICAgICAgICAgICAgaWYgKGVycikge1xuICAgIFxuICAgICAgICAgICAgICAgICAgICB0aGlzLmVtaXQoJ2Vycm9yJywgZXJyKTtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5fc2V0VGltZW91dEV4Y2VlZGVkKCk7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgICAgICB9XG4gICAgXG4gICAgICAgICAgICAgICAgdGhpcy5lbWl0KCdsYXN0QmxvY2tOdW1iZXInLCBibG9ja051bWJlcik7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfSwgdGhpcy5fY29uZmlnLndzdGltZW91dCAqIDEuMSk7XG4gICAgfVxuXG4gICAgLy8gVHJ5aW5nIHRvIGVzdGFibGlzaCBjb25uZWN0aW9uIHVzaW5nIHdlYnNvY2tldCBwcm92aWRlclxuICAgIF9jb25uZWN0KCkge1xuXG4gICAgICAgIGlmICh0aGlzLl9jb25uZWN0aW5nKSB7XG5cbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIERpc2FibGUgcHJldmlvdXMgd2F0Y2hpbmcgaW50ZXJ2YWxcbiAgICAgICAgY2xlYXJJbnRlcnZhbCh0aGlzLl93YXRjaGluZ0ludGVydmFsKTtcblxuICAgICAgICBsZXQgdXJsID0gYCR7dGhpcy5fY29uZmlnLnByb3RvY29sfTovLyR7dGhpcy5fY29uZmlnLmhvc3R9JHt0aGlzLl9jb25maWcucG9ydCA/ICc6JyArIHRoaXMuX2NvbmZpZy5wb3J0IDogJyd9YDtcblxuICAgICAgICAvLyBPdmVycmlkZSB1cmwgZm9yIHRlc3RpbmcgcHVycG9zZXNcbiAgICAgICAgaWYgKHByb2Nlc3MuZW52Lk5PREVfRU5WID09PSAndGVzdGluZycgJiYgcHJvY2Vzcy5lbnYuVEVTVElOR19QUk9WSURFUl9VUkwpIHtcblxuICAgICAgICAgICAgdXJsID0gcHJvY2Vzcy5lbnYuVEVTVElOR19QUk9WSURFUl9VUkw7XG4gICAgICAgIH1cblxuICAgICAgICAvLyBNb3ZpbmcgdG8gQ09OTkVDVElORyBzdGF0ZVxuICAgICAgICB0aGlzLl9zZXRDb25uZWN0aW5nKCk7XG5cbiAgICAgICAgLy8gQ3JlYXRlIG5ldyBXUyBwcm92aWRlclxuICAgICAgICB0aGlzLl9jb25maWcucHJvdmlkZXIgPSBuZXcgdGhpcy5fUGpzLldlYjMucHJvdmlkZXJzLldlYnNvY2tldFByb3ZpZGVyKHVybCk7XG4gICAgICAgIHRoaXMuX2NvbmZpZy5wcm92aWRlci5vbignZXJyb3InLCBlcnIgPT4gdGhpcy5lbWl0KCdlcnJvcicsIGVycikpO1xuICAgICAgICB0aGlzLl9jb25maWcucHJvdmlkZXIub24oJ2VuZCcsICgpID0+IHRoaXMuX3NldFRpbWVvdXRFeGNlZWRlZCgpKTtcblxuICAgICAgICBpZiAoIXRoaXMuX3Bqcykge1xuXG4gICAgICAgICAgICB0aGlzLl9wanMgPSBuZXcgdGhpcy5fUGpzKHtcbiAgICAgICAgICAgICAgICBldGg6IHtcbiAgICAgICAgICAgICAgICAgICAgcHJvdmlkZXI6IHRoaXMuX2NvbmZpZy5wcm92aWRlclxuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgY29udHJhY3RzOiB0aGlzLl9jb25maWcuY29udHJhY3RzLFxuICAgICAgICAgICAgICAgIGFkZHJlc3NlczogdGhpcy5fY29uZmlnLmFkZHJlc3Nlc1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH0gZWxzZSB7XG5cbiAgICAgICAgICAgIHRoaXMuX3Bqcy5hcGkud2ViMy5zZXRQcm92aWRlcih0aGlzLl9jb25maWcucHJvdmlkZXIpO1xuICAgICAgICB9XG4gICAgICAgIFxuICAgICAgICBpZiAodGhpcy5fY29uZmlnLnByb3ZpZGVyLmNvbm5lY3Rpb24ucmVhZHlTdGF0ZSA9PT0gdGhpcy5fY29uZmlnLnByb3ZpZGVyLmNvbm5lY3Rpb24uT1BFTikge1xuXG4gICAgICAgICAgICByZXR1cm4gdGhpcy5fc2V0Q29ubmVjdGVkKCk7XG4gICAgICAgIH1cblxuICAgICAgICBjb25zdCBjb25uZWN0aW9uVGltZW91dCA9IHNldFRpbWVvdXQoKCkgPT4gdGhpcy5fc2V0VGltZW91dEV4Y2VlZGVkKCksIHRoaXMuX2NvbmZpZy53c3RpbWVvdXQpO1xuICAgICAgICBcbiAgICAgICAgdGhpcy5fY29uZmlnLnByb3ZpZGVyLm9uKCdjb25uZWN0JywgKCkgPT4ge1xuICAgICAgICAgICAgY2xlYXJUaW1lb3V0KGNvbm5lY3Rpb25UaW1lb3V0KTsgICAgICAgICAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgIHRoaXMuX3NldENvbm5lY3RlZCgpOy8vIE1vdmluZyB0byBDT05ORUNURUQgc3RhdGVcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgYXN5bmMgY29ubmVjdCgpIHtcbiAgICAgICAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcblxuICAgICAgICAgICAgaWYgKHRoaXMuX2Nvbm5lY3RlZCkge1xuXG4gICAgICAgICAgICAgICAgcmV0dXJuIHJlc29sdmUoKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgZnVuY3Rpb24gb25Db25uZWN0ZWQoKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5yZW1vdmVMaXN0ZW5lcignZXJyb3InLCBvbkVycm9yKTtcbiAgICAgICAgICAgICAgICByZXNvbHZlKCk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGZ1bmN0aW9uIG9uRXJyb3IoKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5yZW1vdmVMaXN0ZW5lcignY29ubmVjdGVkJywgb25Db25uZWN0ZWQpO1xuICAgICAgICAgICAgICAgIHJlamVjdCgpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICB0aGlzLm9uY2UoJ2Nvbm5lY3RlZCcsIG9uQ29ubmVjdGVkKTtcbiAgICAgICAgICAgIHRoaXMub25jZSgnZXJyb3InLCBvbkVycm9yKTtcblxuICAgICAgICAgICAgaWYgKCF0aGlzLl9jb25uZWN0aW5nKSB7XG5cbiAgICAgICAgICAgICAgICB0aGlzLl9jb25uZWN0KCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIGFzeW5jIGNsb3NlKCkge1xuICAgICAgICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuXG4gICAgICAgICAgICBpZiAodGhpcy5fc3RvcHBlZCkge1xuXG4gICAgICAgICAgICAgICAgcmV0dXJuIHJlc29sdmUoKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgZnVuY3Rpb24gb25TdG9wcGVkKCkge1xuICAgICAgICAgICAgICAgIHRoaXMucmVtb3ZlTGlzdGVuZXIoJ2Vycm9yJywgb25FcnJvcik7XG4gICAgICAgICAgICAgICAgcmVzb2x2ZSgpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBmdW5jdGlvbiBvbkVycm9yKCkge1xuICAgICAgICAgICAgICAgIHRoaXMucmVtb3ZlTGlzdGVuZXIoJ3N0b3BwZWQnLCBvblN0b3BwZWQpO1xuICAgICAgICAgICAgICAgIHJlamVjdCgpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICB0aGlzLm9uY2UoJ3N0b3BwZWQnLCBvblN0b3BwZWQpO1xuICAgICAgICAgICAgdGhpcy5vbmNlKCdlcnJvcicsIG9uRXJyb3IpO1xuXG4gICAgICAgICAgICBpZiAoIXRoaXMuX3Nob3VsZFN0b3BwZWQpIHtcblxuICAgICAgICAgICAgICAgIHRoaXMuX3Nob3VsZFN0b3BwZWQgPSB0cnVlO1xuICAgICAgICAgICAgfSAgICAgICAgICAgIFxuICAgICAgICB9KTtcbiAgICB9XG59XG4iXX0=