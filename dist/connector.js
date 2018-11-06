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
          if (_this4._config.provider.connection.readyState === _this4._config.provider.connection.OPEN) {
            _this4._config.provider.on('close', function () {
              return _this4._setStopped();
            });

            _this4._config.provider.connection.close();
          } else {
            _this4._setStopped();
          }

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9jb25uZWN0b3IuanMiXSwibmFtZXMiOlsiU1RPUFBFRCIsIkNPTk5FQ1RJTkciLCJDT05ORUNURUQiLCJESVNDT05ORUNURUQiLCJQanNXc0Nvbm5lY3RvciIsIl9wanMiLCJfbGFzdEJsb2NrIiwiX3N0b3BwZWQiLCJfY29ubmVjdGluZyIsIl9jb25uZWN0ZWQiLCJQanMiLCJvcHRpb25zIiwiY29ubmVjdE9uU2V0dXAiLCJQSlNfUkVRVUlSRUQiLCJfY29uZmlnIiwicHJvdG9jb2wiLCJob3N0IiwicG9ydCIsIndzdGltZW91dCIsInByb3ZpZGVyIiwidW5kZWZpbmVkIiwiY29udHJhY3RzIiwiYWRkcmVzc2VzIiwiY29uZmlnIiwiX3NldFN0b3BwZWQiLCJfUGpzIiwib24iLCJfY29ubmVjdCIsImNiIiwidGltZW91dCIsInNldFRpbWVvdXQiLCJfc2V0VGltZW91dEV4Y2VlZGVkIiwiYXBpIiwid2ViMyIsImV0aCIsImdldEJsb2NrTnVtYmVyIiwidGhlbiIsImJsb2NrTnVtYmVyIiwiY2xlYXJUaW1lb3V0IiwiY2F0Y2giLCJzaWxlbnQiLCJfc2hvdWxkU3RvcHBlZCIsImNsZWFySW50ZXJ2YWwiLCJfd2F0Y2hpbmdJbnRlcnZhbCIsImVtaXQiLCJkYXRlIiwiRGF0ZSIsIm5vdyIsIldFQjNfQ09OTkVDVElPTl9USU1FT1VUIiwiX3dhdGNoQ29ubmVjdGlvbiIsIl9nZXRCbG9ja051bWJlciIsImVyciIsInNldEludGVydmFsIiwiY29ubmVjdGlvbiIsInJlYWR5U3RhdGUiLCJPUEVOIiwiY2xvc2UiLCJ1cmwiLCJwcm9jZXNzIiwiZW52IiwiTk9ERV9FTlYiLCJURVNUSU5HX1BST1ZJREVSX1VSTCIsIl9zZXRDb25uZWN0aW5nIiwiV2ViMyIsInByb3ZpZGVycyIsIldlYnNvY2tldFByb3ZpZGVyIiwic2V0UHJvdmlkZXIiLCJfc2V0Q29ubmVjdGVkIiwiY29ubmVjdGlvblRpbWVvdXQiLCJQcm9taXNlIiwicmVzb2x2ZSIsInJlamVjdCIsIm9uQ29ubmVjdGVkIiwicmVtb3ZlTGlzdGVuZXIiLCJvbkVycm9yIiwib25jZSIsIm9uU3RvcHBlZCIsIkV2ZW50RW1pdHRlciJdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7Ozs7O0FBUUE7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBRUE7O0FBQ0E7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUVPLElBQU1BLE9BQU8sR0FBRyxTQUFoQjs7QUFDQSxJQUFNQyxVQUFVLEdBQUcsWUFBbkI7O0FBQ0EsSUFBTUMsU0FBUyxHQUFHLFdBQWxCOztBQUNBLElBQU1DLFlBQVksR0FBRyxjQUFyQjtBQUVQOzs7Ozs7Ozs7Ozs7Ozs7O0lBYXFCQyxjOzs7Ozs7O3dCQUVQO0FBQ04sYUFBTyxLQUFLQyxJQUFaO0FBQ0g7Ozt3QkFFZTtBQUNaLGFBQU8sS0FBS0MsVUFBWjtBQUNIOzs7d0JBRWdCO0FBRWIsVUFBSSxLQUFLQyxRQUFULEVBQW1CO0FBRWYsZUFBT1AsT0FBUDtBQUNIOztBQUVELFVBQUksS0FBS1EsV0FBVCxFQUFzQjtBQUVsQixlQUFPUCxVQUFQO0FBQ0g7O0FBRUQsVUFBSSxLQUFLUSxVQUFULEVBQXFCO0FBRWpCLGVBQU9QLFNBQVA7QUFDSDs7QUFFRCxhQUFPQyxZQUFQO0FBQ0g7QUFFRDs7Ozs7Ozs7O0FBTUEsMEJBQVlPLEdBQVosRUFBdUQ7QUFBQTs7QUFBQSxRQUF0Q0MsT0FBc0MsdUVBQTVCLEVBQTRCO0FBQUEsUUFBeEJDLGNBQXdCLHVFQUFQLEtBQU87O0FBQUE7O0FBQ25EOztBQUVBLFFBQUksQ0FBQ0YsR0FBTCxFQUFVO0FBRU4sWUFBTSxxQkFBU0csb0JBQVQsQ0FBTjtBQUNIOztBQUVELFVBQUtDLE9BQUw7QUFDSUMsTUFBQUEsUUFBUSxFQUFFLEtBRGQ7QUFFSUMsTUFBQUEsSUFBSSxFQUFFLFdBRlY7QUFHSUMsTUFBQUEsSUFBSSxFQUFFLElBSFY7QUFJSUMsTUFBQUEsU0FBUyxFQUFFLElBSmY7QUFLSUMsTUFBQUEsUUFBUSxFQUFFQyxTQUxkO0FBTUlDLE1BQUFB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Q1Y7O0FBRUQsMkJBQVNJLE9BQVQsR0FBbUI7QUFDZix5QkFBS0QsY0FBTCxDQUFvQixXQUFwQixFQUFpQ0QsV0FBakM7QUFDQUQsb0JBQUFBLE1BQU07QUFDVDs7QUFFRCxrQkFBQSxNQUFJLENBQUNJLElBQUwsQ0FBVSxXQUFWLEVBQXVCSCxXQUF2Qjs7QUFDQSxrQkFBQSxNQUFJLENBQUNHLElBQUwsQ0FBVSxPQUFWLEVBQW1CRCxPQUFuQjs7QUFFQSxzQkFBSSxDQUFDLE1BQUksQ0FBQ2xFLFdBQVYsRUFBdUI7QUFFbkIsb0JBQUEsTUFBSSxDQUFDbUIsUUFBTDtBQUNIO0FBQ0osaUJBeEJNLEM7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O2tEQTRCQSxJQUFJMEMsT0FBSixDQUFZLFVBQUNDLE9BQUQsRUFBVUMsTUFBVixFQUFxQjtBQUVwQyxzQkFBSSxNQUFJLENBQUNoRSxRQUFULEVBQW1CO0FBRWYsMkJBQU8rRCxPQUFPLEVBQWQ7QUFDSDs7QUFFRCwyQkFBU00sU0FBVCxHQUFxQjtBQUNqQix5QkFBS0gsY0FBTCxDQUFvQixPQUFwQixFQUE2QkMsT0FBN0I7QUFDQUosb0JBQUFBLE9BQU87QUFDVjs7QUFFRCwyQkFBU0ksT0FBVCxHQUFtQjtBQUNmLHlCQUFLRCxjQUFMLENBQW9CLFNBQXBCLEVBQStCRyxTQUEvQjtBQUNBTCxvQkFBQUEsTUFBTTtBQUNUOztBQUVELGtCQUFBLE1BQUksQ0FBQ0ksSUFBTCxDQUFVLFNBQVYsRUFBcUJDLFNBQXJCOztBQUNBLGtCQUFBLE1BQUksQ0FBQ0QsSUFBTCxDQUFVLE9BQVYsRUFBbUJELE9BQW5COztBQUVBLHNCQUFJLENBQUMsTUFBSSxDQUFDakMsY0FBVixFQUEwQjtBQUV0QixvQkFBQSxNQUFJLENBQUNBLGNBQUwsR0FBc0IsSUFBdEI7QUFDSDtBQUNKLGlCQXhCTSxDOzs7Ozs7Ozs7Ozs7Ozs7OztFQWxRNkJvQyxvQiIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogV2Vic29ja2V0IGNvbm5lY3Rpb24gbWFuYWdlciBmb3IgTm9kZS5qc1xuICogVGhpcyBmaWxlIGl0IGlzIGEgcGFydCBvZiB0aGUgUGFuZG9yYSBQeXJyaGEgSmF2YXNjcmlwdCBsaWJyYXJ5XG4gKiBcbiAqIEBmaWxlIGNvbm5lY3Rvci5qc1xuICogQGF1dGhvciBLb3N0aWFudHluIFNteXJub3YgPGtvc3R5c2hAZ21haWwuY29tPlxuICogQGRhdGUgMjAxOFxuICovXG4ndXNlIHN0cmljdCc7XG5cbmltcG9ydCB7IEV2ZW50RW1pdHRlciB9IGZyb20gJ2V2ZW50cyc7XG5pbXBvcnQgUGpzRXJyb3IsIHsgUEpTX1JFUVVJUkVELCBXRUIzX0NPTk5FQ1RJT05fVElNRU9VVCB9IGZyb20gJy4vaGVscGVycy9lcnJvcnMnO1xuXG5leHBvcnQgY29uc3QgU1RPUFBFRCA9ICdTVE9QUEVEJztcbmV4cG9ydCBjb25zdCBDT05ORUNUSU5HID0gJ0NPTk5FQ1RJTkcnO1xuZXhwb3J0IGNvbnN0IENPTk5FQ1RFRCA9ICdDT05ORUNURUQnO1xuZXhwb3J0IGNvbnN0IERJU0NPTk5FQ1RFRCA9ICdESVNDT05ORUNURUQnO1xuXG4vKipcbiAqIFdlYnNvY2tldCBjb25uZWN0aW9uIG1hbmFnZXIgY2xhc3MgZm9yIFBqc1xuICpcbiAqIEBleHBvcnRcbiAqIEBjbGFzcyBQanNXc0Nvbm5lY3RvclxuICogQGV4dGVuZHMge0V2ZW50RW1pdHRlcn1cbiAqIEBldmVudCBlcnJvclxuICogQGV2ZW50IGNvbm5lY3RpbmdcbiAqIEBldmVudCBjb25uZWN0ZWRcbiAqIEBldmVudCB0aW1lb3V0XG4gKiBAZXZlbnQgc3RvcHBlZFxuICogQGV2ZW50IGxhc3RCbG9ja051bWJlclxuICovXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBQanNXc0Nvbm5lY3RvciBleHRlbmRzIEV2ZW50RW1pdHRlciB7XG5cbiAgICBnZXQgcGpzKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5fcGpzO1xuICAgIH1cblxuICAgIGdldCBsYXN0QmxvY2soKSB7XG4gICAgICAgIHJldHVybiB0aGlzLl9sYXN0QmxvY2s7XG4gICAgfVxuXG4gICAgZ2V0IHJlYWR5U3RhdGUoKSB7XG5cbiAgICAgICAgaWYgKHRoaXMuX3N0b3BwZWQpIHtcblxuICAgICAgICAgICAgcmV0dXJuIFNUT1BQRUQ7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAodGhpcy5fY29ubmVjdGluZykge1xuXG4gICAgICAgICAgICByZXR1cm4gQ09OTkVDVElORztcbiAgICAgICAgfVxuXG4gICAgICAgIGlmICh0aGlzLl9jb25uZWN0ZWQpIHtcblxuICAgICAgICAgICAgcmV0dXJuIENPTk5FQ1RFRDtcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiBESVNDT05ORUNURUQ7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICpDcmVhdGVzIGFuIGluc3RhbmNlIG9mIFBqc1dzQ29ubmVjdG9yLlxuICAgICogQHBhcmFtIHtGdW5jdGlvbn0gUGpzXG4gICAgKiBAcGFyYW0ge09iamVjdH0gW29wdGlvbnM9e31dXG4gICAgKiBAbWVtYmVyb2YgUGpzV3NDb25uZWN0b3JcbiAgICAqL1xuICAgIGNvbnN0cnVjdG9yKFBqcywgb3B0aW9ucyA9IHt9LCBjb25uZWN0T25TZXR1cCA9IGZhbHNlKSB7XG4gICAgICAgIHN1cGVyKCk7XG5cbiAgICAgICAgaWYgKCFQanMpIHtcblxuICAgICAgICAgICAgdGhyb3cgUGpzRXJyb3IoUEpTX1JFUVVJUkVEKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMuX2NvbmZpZyA9IHtcbiAgICAgICAgICAgIHByb3RvY29sOiAnd3NzJyxcbiAgICAgICAgICAgIGhvc3Q6ICdsb2NhbGhvc3QnLFxuICAgICAgICAgICAgcG9ydDogODU0NSxcbiAgICAgICAgICAgIHdzdGltZW91dDogMjAwMCxcbiAgICAgICAgICAgIHByb3ZpZGVyOiB1bmRlZmluZWQsXG4gICAgICAgICAgICBjb250cmFjdHM6IHVuZGVmaW5lZCxcbiAgICAgICAgICAgIGFkZHJlc3NlczogdW5kZWZpbmVkLFxuICAgICAgICAgICAgLi4ub3B0aW9ucy5jb25maWdcbiAgICAgICAgfTtcblxuICAgICAgICB0aGlzLl9zZXRTdG9wcGVkKHRydWUpO1xuICAgICAgICB0aGlzLl9sYXN0QmxvY2sgPSAwO1xuICAgICAgICB0aGlzLl9QanMgPSBQanM7XG4gICAgICAgIHRoaXMuX3BqcyA9IG51bGw7XG5cbiAgICAgICAgdGhpcy5vbigndGltZW91dCcsICgpID0+IHRoaXMuX2Nvbm5lY3QoKSk7XG5cbiAgICAgICAgaWYgKGNvbm5lY3RPblNldHVwKSB7XG5cbiAgICAgICAgICAgIHRoaXMuX2Nvbm5lY3QoKTtcbiAgICAgICAgfSAgICAgICAgXG4gICAgfVxuXG4gICAgX2dldEJsb2NrTnVtYmVyKGNiID0gKCkgPT4ge30pIHtcblxuICAgICAgICBjb25zdCB0aW1lb3V0ID0gc2V0VGltZW91dCgoKSA9PiB0aGlzLl9zZXRUaW1lb3V0RXhjZWVkZWQoKSwgdGhpcy5fY29uZmlnLndzdGltZW91dCk7XG5cbiAgICAgICAgdGhpcy5fcGpzLmFwaS53ZWIzLmV0aC5nZXRCbG9ja051bWJlcigpXG4gICAgICAgICAgICAudGhlbihibG9ja051bWJlciA9PiB7XG4gICAgICAgICAgICAgICAgdGhpcy5fbGFzdEJsb2NrID0gYmxvY2tOdW1iZXI7XG4gICAgICAgICAgICAgICAgY2xlYXJUaW1lb3V0KHRpbWVvdXQpO1xuICAgICAgICAgICAgICAgIGNiKG51bGwsIGJsb2NrTnVtYmVyKTtcbiAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAuY2F0Y2goY2IpO1xuICAgIH1cblxuICAgIC8vIFNldCBTVE9QUEVEIHN0YXRlXG4gICAgX3NldFN0b3BwZWQoc2lsZW50ID0gZmFsc2UpIHtcbiAgICAgICAgdGhpcy5fY29ubmVjdGVkID0gZmFsc2U7XG4gICAgICAgIHRoaXMuX2Nvbm5lY3RpbmcgPSBmYWxzZTtcbiAgICAgICAgdGhpcy5fc2hvdWxkU3RvcHBlZCA9IGZhbHNlO1xuICAgICAgICB0aGlzLl9zdG9wcGVkID0gdHJ1ZTtcbiAgICAgICAgY2xlYXJJbnRlcnZhbCh0aGlzLl93YXRjaGluZ0ludGVydmFsKTtcbiAgICAgICAgdGhpcy5fd2F0Y2hpbmdJbnRlcnZhbCA9IG51bGw7XG5cbiAgICAgICAgaWYgKCFzaWxlbnQpIHtcblxuICAgICAgICAgICAgdGhpcy5lbWl0KCdzdG9wcGVkJywge1xuICAgICAgICAgICAgICAgIGRhdGU6IERhdGUubm93KClcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9ICAgICAgICBcbiAgICB9XG5cbiAgICAvLyBTZXQgQ09OTkVDVElORyBzdGF0ZVxuICAgIF9zZXRDb25uZWN0aW5nKCkge1xuICAgICAgICB0aGlzLl9zdG9wcGVkID0gZmFsc2U7XG4gICAgICAgIHRoaXMuX2Nvbm5lY3RlZCA9IGZhbHNlO1xuICAgICAgICB0aGlzLl9jb25uZWN0aW5nID0gdHJ1ZTtcbiAgICAgICAgdGhpcy5lbWl0KCdjb25uZWN0aW5nJywge1xuICAgICAgICAgICAgZGF0ZTogRGF0ZS5ub3coKVxuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICAvLyBTZXQgRElTQ09OTkVDVEVEIHN0YXRlIGFuZCBlbWl0IHRpbWVvdXQgZXZlbnRcbiAgICBfc2V0VGltZW91dEV4Y2VlZGVkKCkge1xuICAgICAgICB0aGlzLl9zdG9wcGVkID0gZmFsc2U7XG4gICAgICAgIHRoaXMuX2Nvbm5lY3RlZCA9IGZhbHNlO1xuICAgICAgICB0aGlzLl9jb25uZWN0aW5nID0gZmFsc2U7XG5cbiAgICAgICAgaWYgKCF0aGlzLl9zaG91bGRTdG9wcGVkKSB7XG5cbiAgICAgICAgICAgIHRoaXMuZW1pdCgndGltZW91dCcsIFBqc0Vycm9yKFdFQjNfQ09OTkVDVElPTl9USU1FT1VULCB0aGlzLl9jb25maWcud3N0aW1lb3V0KSk7XG4gICAgICAgIH0gICAgICAgICAgICAgICAgXG4gICAgfVxuXG4gICAgLy8gU2V0IENPTk5FQ1RFRCBzdGF0ZVxuICAgIF9zZXRDb25uZWN0ZWQoKSB7XG4gICAgICAgIHRoaXMuX3N0b3BwZWQgPSBmYWxzZTtcbiAgICAgICAgdGhpcy5fY29ubmVjdGVkID0gdHJ1ZTtcbiAgICAgICAgdGhpcy5fY29ubmVjdGluZyA9IGZhbHNlO1xuICAgICAgICB0aGlzLl93YXRjaENvbm5lY3Rpb24oKTtcbiAgICAgICAgdGhpcy5fZ2V0QmxvY2tOdW1iZXIoKGVyciwgYmxvY2tOdW1iZXIpID0+IHtcblxuICAgICAgICAgICAgaWYgKGVycikge1xuXG4gICAgICAgICAgICAgICAgdGhpcy5lbWl0KCdlcnJvcicsIGVycik7XG4gICAgICAgICAgICAgICAgdGhpcy5fc2V0VGltZW91dEV4Y2VlZGVkKCk7XG4gICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICB0aGlzLmVtaXQoJ2Nvbm5lY3RlZCcsIHtcbiAgICAgICAgICAgICAgICBkYXRlOiBEYXRlLm5vdygpLFxuICAgICAgICAgICAgICAgIGJsb2NrTnVtYmVyXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgLy8gV2F0Y2ggZm9yIGNvbm5lY3Rpb24gdmlhIGdldHRpbmcgbGFzdCBibG9jayBudW1iZXJcbiAgICBfd2F0Y2hDb25uZWN0aW9uKCkge1xuXG4gICAgICAgIHRoaXMuX3dhdGNoaW5nSW50ZXJ2YWwgPSBzZXRJbnRlcnZhbCgoKSA9PiB7XG5cbiAgICAgICAgICAgIGlmICh0aGlzLl9zaG91bGRTdG9wcGVkKSB7XG5cbiAgICAgICAgICAgICAgICBpZiAodGhpcy5fY29uZmlnLnByb3ZpZGVyLmNvbm5lY3Rpb24ucmVhZHlTdGF0ZSA9PT0gdGhpcy5fY29uZmlnLnByb3ZpZGVyLmNvbm5lY3Rpb24uT1BFTikge1xuXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuX2NvbmZpZy5wcm92aWRlci5vbignY2xvc2UnLCAoKSA9PiB0aGlzLl9zZXRTdG9wcGVkKCkpO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLl9jb25maWcucHJvdmlkZXIuY29ubmVjdGlvbi5jbG9zZSgpO1xuICAgICAgICAgICAgICAgIH0gZWxzZSAge1xuXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuX3NldFN0b3BwZWQoKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgXG4gICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICB0aGlzLl9nZXRCbG9ja051bWJlcigoZXJyLCBibG9ja051bWJlcikgPT4ge1xuXG4gICAgICAgICAgICAgICAgaWYgKGVycikge1xuICAgIFxuICAgICAgICAgICAgICAgICAgICB0aGlzLmVtaXQoJ2Vycm9yJywgZXJyKTtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5fc2V0VGltZW91dEV4Y2VlZGVkKCk7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgICAgICB9XG4gICAgXG4gICAgICAgICAgICAgICAgdGhpcy5lbWl0KCdsYXN0QmxvY2tOdW1iZXInLCBibG9ja051bWJlcik7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfSwgdGhpcy5fY29uZmlnLndzdGltZW91dCAqIDEuMSk7XG4gICAgfVxuXG4gICAgLy8gVHJ5aW5nIHRvIGVzdGFibGlzaCBjb25uZWN0aW9uIHVzaW5nIHdlYnNvY2tldCBwcm92aWRlclxuICAgIF9jb25uZWN0KCkge1xuXG4gICAgICAgIGlmICh0aGlzLl9jb25uZWN0aW5nKSB7XG5cbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIERpc2FibGUgcHJldmlvdXMgd2F0Y2hpbmcgaW50ZXJ2YWxcbiAgICAgICAgY2xlYXJJbnRlcnZhbCh0aGlzLl93YXRjaGluZ0ludGVydmFsKTtcblxuICAgICAgICBsZXQgdXJsID0gYCR7dGhpcy5fY29uZmlnLnByb3RvY29sfTovLyR7dGhpcy5fY29uZmlnLmhvc3R9JHt0aGlzLl9jb25maWcucG9ydCA/ICc6JyArIHRoaXMuX2NvbmZpZy5wb3J0IDogJyd9YDtcblxuICAgICAgICAvLyBPdmVycmlkZSB1cmwgZm9yIHRlc3RpbmcgcHVycG9zZXNcbiAgICAgICAgaWYgKHByb2Nlc3MuZW52Lk5PREVfRU5WID09PSAndGVzdGluZycgJiYgcHJvY2Vzcy5lbnYuVEVTVElOR19QUk9WSURFUl9VUkwpIHtcblxuICAgICAgICAgICAgdXJsID0gcHJvY2Vzcy5lbnYuVEVTVElOR19QUk9WSURFUl9VUkw7XG4gICAgICAgIH1cblxuICAgICAgICAvLyBNb3ZpbmcgdG8gQ09OTkVDVElORyBzdGF0ZVxuICAgICAgICB0aGlzLl9zZXRDb25uZWN0aW5nKCk7XG5cbiAgICAgICAgLy8gQ3JlYXRlIG5ldyBXUyBwcm92aWRlclxuICAgICAgICB0aGlzLl9jb25maWcucHJvdmlkZXIgPSBuZXcgdGhpcy5fUGpzLldlYjMucHJvdmlkZXJzLldlYnNvY2tldFByb3ZpZGVyKHVybCk7XG4gICAgICAgIHRoaXMuX2NvbmZpZy5wcm92aWRlci5vbignZXJyb3InLCBlcnIgPT4gdGhpcy5lbWl0KCdlcnJvcicsIGVycikpO1xuICAgICAgICB0aGlzLl9jb25maWcucHJvdmlkZXIub24oJ2VuZCcsICgpID0+IHRoaXMuX3NldFRpbWVvdXRFeGNlZWRlZCgpKTtcblxuICAgICAgICBpZiAoIXRoaXMuX3Bqcykge1xuXG4gICAgICAgICAgICB0aGlzLl9wanMgPSBuZXcgdGhpcy5fUGpzKHtcbiAgICAgICAgICAgICAgICBldGg6IHtcbiAgICAgICAgICAgICAgICAgICAgcHJvdmlkZXI6IHRoaXMuX2NvbmZpZy5wcm92aWRlclxuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgY29udHJhY3RzOiB0aGlzLl9jb25maWcuY29udHJhY3RzLFxuICAgICAgICAgICAgICAgIGFkZHJlc3NlczogdGhpcy5fY29uZmlnLmFkZHJlc3Nlc1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH0gZWxzZSB7XG5cbiAgICAgICAgICAgIHRoaXMuX3Bqcy5hcGkud2ViMy5zZXRQcm92aWRlcih0aGlzLl9jb25maWcucHJvdmlkZXIpO1xuICAgICAgICB9XG4gICAgICAgIFxuICAgICAgICBpZiAodGhpcy5fY29uZmlnLnByb3ZpZGVyLmNvbm5lY3Rpb24ucmVhZHlTdGF0ZSA9PT0gdGhpcy5fY29uZmlnLnByb3ZpZGVyLmNvbm5lY3Rpb24uT1BFTikge1xuXG4gICAgICAgICAgICByZXR1cm4gdGhpcy5fc2V0Q29ubmVjdGVkKCk7XG4gICAgICAgIH1cblxuICAgICAgICBjb25zdCBjb25uZWN0aW9uVGltZW91dCA9IHNldFRpbWVvdXQoKCkgPT4gdGhpcy5fc2V0VGltZW91dEV4Y2VlZGVkKCksIHRoaXMuX2NvbmZpZy53c3RpbWVvdXQpO1xuICAgICAgICBcbiAgICAgICAgdGhpcy5fY29uZmlnLnByb3ZpZGVyLm9uKCdjb25uZWN0JywgKCkgPT4ge1xuICAgICAgICAgICAgY2xlYXJUaW1lb3V0KGNvbm5lY3Rpb25UaW1lb3V0KTsgICAgICAgICAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgIHRoaXMuX3NldENvbm5lY3RlZCgpOy8vIE1vdmluZyB0byBDT05ORUNURUQgc3RhdGVcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgYXN5bmMgY29ubmVjdCgpIHtcbiAgICAgICAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcblxuICAgICAgICAgICAgaWYgKHRoaXMuX2Nvbm5lY3RlZCkge1xuXG4gICAgICAgICAgICAgICAgcmV0dXJuIHJlc29sdmUoKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgZnVuY3Rpb24gb25Db25uZWN0ZWQoKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5yZW1vdmVMaXN0ZW5lcignZXJyb3InLCBvbkVycm9yKTtcbiAgICAgICAgICAgICAgICByZXNvbHZlKCk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGZ1bmN0aW9uIG9uRXJyb3IoKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5yZW1vdmVMaXN0ZW5lcignY29ubmVjdGVkJywgb25Db25uZWN0ZWQpO1xuICAgICAgICAgICAgICAgIHJlamVjdCgpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICB0aGlzLm9uY2UoJ2Nvbm5lY3RlZCcsIG9uQ29ubmVjdGVkKTtcbiAgICAgICAgICAgIHRoaXMub25jZSgnZXJyb3InLCBvbkVycm9yKTtcblxuICAgICAgICAgICAgaWYgKCF0aGlzLl9jb25uZWN0aW5nKSB7XG5cbiAgICAgICAgICAgICAgICB0aGlzLl9jb25uZWN0KCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIGFzeW5jIGNsb3NlKCkge1xuICAgICAgICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuXG4gICAgICAgICAgICBpZiAodGhpcy5fc3RvcHBlZCkge1xuXG4gICAgICAgICAgICAgICAgcmV0dXJuIHJlc29sdmUoKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgZnVuY3Rpb24gb25TdG9wcGVkKCkge1xuICAgICAgICAgICAgICAgIHRoaXMucmVtb3ZlTGlzdGVuZXIoJ2Vycm9yJywgb25FcnJvcik7XG4gICAgICAgICAgICAgICAgcmVzb2x2ZSgpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBmdW5jdGlvbiBvbkVycm9yKCkge1xuICAgICAgICAgICAgICAgIHRoaXMucmVtb3ZlTGlzdGVuZXIoJ3N0b3BwZWQnLCBvblN0b3BwZWQpO1xuICAgICAgICAgICAgICAgIHJlamVjdCgpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICB0aGlzLm9uY2UoJ3N0b3BwZWQnLCBvblN0b3BwZWQpO1xuICAgICAgICAgICAgdGhpcy5vbmNlKCdlcnJvcicsIG9uRXJyb3IpO1xuXG4gICAgICAgICAgICBpZiAoIXRoaXMuX3Nob3VsZFN0b3BwZWQpIHtcblxuICAgICAgICAgICAgICAgIHRoaXMuX3Nob3VsZFN0b3BwZWQgPSB0cnVlO1xuICAgICAgICAgICAgfSAgICAgICAgICAgIFxuICAgICAgICB9KTtcbiAgICB9XG59XG4iXX0=