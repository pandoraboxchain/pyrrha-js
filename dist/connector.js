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
  }

  _createClass(PjsWsConnector, [{
    key: "_getBlockNumber",
    value: function _getBlockNumber() {
      var _this2 = this;

      var cb = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : function () {};
      var timeout = setTimeout(function () {
        return _this2._setTimeoutExceeded();
      }, this._config.wstimeout);

      this._pjs.api.web3.getBlockNumber().then(function (blockNumber) {
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
      this.emit('timeout', (0, _errors.default)(_errors.WEB3_CONNECTION_TIMEOUT, this._config.wstimeout));
    } // Set CONNECTED state

  }, {
    key: "_setConnected",
    value: function _setConnected() {
      var _this3 = this;

      this._stopped = false;
      this._connected = true;
      this._connecting = false;

      this._config.provider.on('error', function (err) {
        return _this3.emit('error', err);
      });

      this._config.provider.on('end', function () {
        return _this3._setTimeoutExceeded();
      });

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
          _this4._config.provider.connection.on('close', function () {
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9jb25uZWN0b3IuanMiXSwibmFtZXMiOlsiU1RPUFBFRCIsIkNPTk5FQ1RJTkciLCJDT05ORUNURUQiLCJESVNDT05ORUNURUQiLCJQanNXc0Nvbm5lY3RvciIsIl9wanMiLCJfbGFzdEJsb2NrIiwiX2Nvbm5lY3RpbmciLCJfY29ubmVjdGVkIiwiUGpzIiwib3B0aW9ucyIsImNvbm5lY3RPblNldHVwIiwiUEpTX1JFUVVJUkVEIiwiX2NvbmZpZyIsInByb3RvY29sIiwiaG9zdCIsInBvcnQiLCJ3c3RpbWVvdXQiLCJwcm92aWRlciIsInVuZGVmaW5lZCIsImNvbnRyYWN0cyIsImFkZHJlc3NlcyIsImNvbmZpZyIsIl9zZXRTdG9wcGVkIiwiX1BqcyIsIm9uIiwiX2Nvbm5lY3QiLCJjYiIsInRpbWVvdXQiLCJzZXRUaW1lb3V0IiwiX3NldFRpbWVvdXRFeGNlZWRlZCIsImFwaSIsIndlYjMiLCJnZXRCbG9ja051bWJlciIsInRoZW4iLCJibG9ja051bWJlciIsImNsZWFyVGltZW91dCIsImNhdGNoIiwic2lsZW50IiwiX3Nob3VsZFN0b3BwZWQiLCJfc3RvcHBlZCIsImNsZWFySW50ZXJ2YWwiLCJfd2F0Y2hpbmdJbnRlcnZhbCIsImVtaXQiLCJkYXRlIiwiRGF0ZSIsIm5vdyIsIldFQjNfQ09OTkVDVElPTl9USU1FT1VUIiwiZXJyIiwiX3dhdGNoQ29ubmVjdGlvbiIsIl9nZXRCbG9ja051bWJlciIsInNldEludGVydmFsIiwiY29ubmVjdGlvbiIsImNsb3NlIiwidXJsIiwicHJvY2VzcyIsImVudiIsIk5PREVfRU5WIiwiVEVTVElOR19QUk9WSURFUl9VUkwiLCJfc2V0Q29ubmVjdGluZyIsIldlYjMiLCJwcm92aWRlcnMiLCJXZWJzb2NrZXRQcm92aWRlciIsImV0aCIsInNldFByb3ZpZGVyIiwicmVhZHlTdGF0ZSIsIk9QRU4iLCJfc2V0Q29ubmVjdGVkIiwiY29ubmVjdGlvblRpbWVvdXQiLCJQcm9taXNlIiwicmVzb2x2ZSIsInJlamVjdCIsIm9uQ29ubmVjdGVkIiwicmVtb3ZlTGlzdGVuZXIiLCJvbkVycm9yIiwib25jZSIsIm9uU3RvcHBlZCIsIkV2ZW50RW1pdHRlciJdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7Ozs7O0FBUUE7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBRUE7O0FBQ0E7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUVPLElBQU1BLE9BQU8sR0FBRyxTQUFoQjs7QUFDQSxJQUFNQyxVQUFVLEdBQUcsWUFBbkI7O0FBQ0EsSUFBTUMsU0FBUyxHQUFHLFdBQWxCOztBQUNBLElBQU1DLFlBQVksR0FBRyxjQUFyQjtBQUVQOzs7Ozs7Ozs7Ozs7Ozs7O0lBYXFCQyxjOzs7Ozs7O3dCQUVQO0FBQ04sYUFBTyxLQUFLQyxJQUFaO0FBQ0g7Ozt3QkFFZTtBQUNaLGFBQU8sS0FBS0MsVUFBWjtBQUNIOzs7d0JBRWdCO0FBRWIsVUFBSSxLQUFLQyxXQUFULEVBQXNCO0FBRWxCLGVBQU9OLFVBQVA7QUFDSDs7QUFFRCxVQUFJLEtBQUtPLFVBQVQsRUFBcUI7QUFFakIsZUFBT04sU0FBUDtBQUNIOztBQUVELGFBQU9DLFlBQVA7QUFDSDtBQUVEOzs7Ozs7Ozs7QUFNQSwwQkFBWU0sR0FBWixFQUF1RDtBQUFBOztBQUFBLFFBQXRDQyxPQUFzQyx1RUFBNUIsRUFBNEI7QUFBQSxRQUF4QkMsY0FBd0IsdUVBQVAsS0FBTzs7QUFBQTs7QUFDbkQ7O0FBRUEsUUFBSSxDQUFDRixHQUFMLEVBQVU7QUFFTixZQUFNLHFCQUFTRyxvQkFBVCxDQUFOO0FBQ0g7O0FBRUQsVUFBS0MsT0FBTDtBQUNJQyxNQUFBQSxRQUFRLEVBQUUsS0FEZDtBQUVJQyxNQUFBQSxJQUFJLEVBQUUsV0FGVjtBQUdJQyxNQUFBQSxJQUFJLEVBQUUsSUFIVjtBQUlJQyxNQUFBQSxTQUFTLEVBQUUsSUFKZjtBQUtJQyxNQUFBQSxRQUFRLEVBQUVDLFNBTGQ7QUFNSUMsTUFBQUEsU0FBUyxFQUFFRCxTQU5mO0FBT0lFLE1BQUFBLFNBQVMsRUFBRUY7QUFQZixPQVFP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SDtBQUNKLGlCQXhCTSxDOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztrREE0QkEsSUFBSTJDLE9BQUosQ0FBWSxVQUFDQyxPQUFELEVBQVVDLE1BQVYsRUFBcUI7QUFFcEMsc0JBQUksTUFBSSxDQUFDL0IsUUFBVCxFQUFtQjtBQUVmLDJCQUFPOEIsT0FBTyxFQUFkO0FBQ0g7O0FBRUQsMkJBQVNNLFNBQVQsR0FBcUI7QUFDakIseUJBQUtILGNBQUwsQ0FBb0IsT0FBcEIsRUFBNkJDLE9BQTdCO0FBQ0FKLG9CQUFBQSxPQUFPO0FBQ1Y7O0FBRUQsMkJBQVNJLE9BQVQsR0FBbUI7QUFDZix5QkFBS0QsY0FBTCxDQUFvQixTQUFwQixFQUErQkcsU0FBL0I7QUFDQUwsb0JBQUFBLE1BQU07QUFDVDs7QUFFRCxrQkFBQSxNQUFJLENBQUNJLElBQUwsQ0FBVSxTQUFWLEVBQXFCQyxTQUFyQjs7QUFDQSxrQkFBQSxNQUFJLENBQUNELElBQUwsQ0FBVSxPQUFWLEVBQW1CRCxPQUFuQjs7QUFFQSxzQkFBSSxDQUFDLE1BQUksQ0FBQ25DLGNBQVYsRUFBMEI7QUFFdEIsb0JBQUEsTUFBSSxDQUFDQSxjQUFMLEdBQXNCLElBQXRCO0FBQ0g7QUFDSixpQkF4Qk0sQzs7Ozs7Ozs7Ozs7Ozs7Ozs7RUFsUDZCc0Msb0IiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIFdlYnNvY2tldCBjb25uZWN0aW9uIG1hbmFnZXIgZm9yIE5vZGUuanNcbiAqIFRoaXMgZmlsZSBpdCBpcyBhIHBhcnQgb2YgdGhlIFBhbmRvcmEgUHlycmhhIEphdmFzY3JpcHQgbGlicmFyeVxuICogXG4gKiBAZmlsZSBjb25uZWN0b3IuanNcbiAqIEBhdXRob3IgS29zdGlhbnR5biBTbXlybm92IDxrb3N0eXNoQGdtYWlsLmNvbT5cbiAqIEBkYXRlIDIwMThcbiAqL1xuJ3VzZSBzdHJpY3QnO1xuXG5pbXBvcnQgeyBFdmVudEVtaXR0ZXIgfSBmcm9tICdldmVudHMnO1xuaW1wb3J0IFBqc0Vycm9yLCB7IFBKU19SRVFVSVJFRCwgV0VCM19DT05ORUNUSU9OX1RJTUVPVVQgfSBmcm9tICcuL2hlbHBlcnMvZXJyb3JzJztcblxuZXhwb3J0IGNvbnN0IFNUT1BQRUQgPSAnU1RPUFBFRCc7XG5leHBvcnQgY29uc3QgQ09OTkVDVElORyA9ICdDT05ORUNUSU5HJztcbmV4cG9ydCBjb25zdCBDT05ORUNURUQgPSAnQ09OTkVDVEVEJztcbmV4cG9ydCBjb25zdCBESVNDT05ORUNURUQgPSAnRElTQ09OTkVDVEVEJztcblxuLyoqXG4gKiBXZWJzb2NrZXQgY29ubmVjdGlvbiBtYW5hZ2VyIGNsYXNzIGZvciBQanNcbiAqXG4gKiBAZXhwb3J0XG4gKiBAY2xhc3MgUGpzV3NDb25uZWN0b3JcbiAqIEBleHRlbmRzIHtFdmVudEVtaXR0ZXJ9XG4gKiBAZXZlbnQgZXJyb3JcbiAqIEBldmVudCBjb25uZWN0aW5nXG4gKiBAZXZlbnQgY29ubmVjdGVkXG4gKiBAZXZlbnQgdGltZW91dFxuICogQGV2ZW50IHN0b3BwZWRcbiAqIEBldmVudCBsYXN0QmxvY2tOdW1iZXJcbiAqL1xuZXhwb3J0IGRlZmF1bHQgY2xhc3MgUGpzV3NDb25uZWN0b3IgZXh0ZW5kcyBFdmVudEVtaXR0ZXIge1xuXG4gICAgZ2V0IHBqcygpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX3BqcztcbiAgICB9XG5cbiAgICBnZXQgbGFzdEJsb2NrKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5fbGFzdEJsb2NrO1xuICAgIH1cblxuICAgIGdldCByZWFkeVN0YXRlKCkge1xuXG4gICAgICAgIGlmICh0aGlzLl9jb25uZWN0aW5nKSB7XG5cbiAgICAgICAgICAgIHJldHVybiBDT05ORUNUSU5HO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHRoaXMuX2Nvbm5lY3RlZCkge1xuXG4gICAgICAgICAgICByZXR1cm4gQ09OTkVDVEVEO1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIERJU0NPTk5FQ1RFRDtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKkNyZWF0ZXMgYW4gaW5zdGFuY2Ugb2YgUGpzV3NDb25uZWN0b3IuXG4gICAgKiBAcGFyYW0ge0Z1bmN0aW9ufSBQanNcbiAgICAqIEBwYXJhbSB7T2JqZWN0fSBbb3B0aW9ucz17fV1cbiAgICAqIEBtZW1iZXJvZiBQanNXc0Nvbm5lY3RvclxuICAgICovXG4gICAgY29uc3RydWN0b3IoUGpzLCBvcHRpb25zID0ge30sIGNvbm5lY3RPblNldHVwID0gZmFsc2UpIHtcbiAgICAgICAgc3VwZXIoKTtcblxuICAgICAgICBpZiAoIVBqcykge1xuXG4gICAgICAgICAgICB0aHJvdyBQanNFcnJvcihQSlNfUkVRVUlSRUQpO1xuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy5fY29uZmlnID0ge1xuICAgICAgICAgICAgcHJvdG9jb2w6ICd3c3MnLFxuICAgICAgICAgICAgaG9zdDogJ2xvY2FsaG9zdCcsXG4gICAgICAgICAgICBwb3J0OiA4NTQ1LFxuICAgICAgICAgICAgd3N0aW1lb3V0OiAyMDAwLFxuICAgICAgICAgICAgcHJvdmlkZXI6IHVuZGVmaW5lZCxcbiAgICAgICAgICAgIGNvbnRyYWN0czogdW5kZWZpbmVkLFxuICAgICAgICAgICAgYWRkcmVzc2VzOiB1bmRlZmluZWQsXG4gICAgICAgICAgICAuLi5vcHRpb25zLmNvbmZpZ1xuICAgICAgICB9O1xuXG4gICAgICAgIHRoaXMuX3NldFN0b3BwZWQodHJ1ZSk7XG4gICAgICAgIHRoaXMuX2xhc3RCbG9jayA9IDA7XG4gICAgICAgIHRoaXMuX1BqcyA9IFBqcztcbiAgICAgICAgdGhpcy5fcGpzID0gbnVsbDtcblxuICAgICAgICB0aGlzLm9uKCd0aW1lb3V0JywgKCkgPT4gdGhpcy5fY29ubmVjdCgpKTtcblxuICAgICAgICBpZiAoY29ubmVjdE9uU2V0dXApIHtcblxuICAgICAgICAgICAgdGhpcy5fY29ubmVjdCgpO1xuICAgICAgICB9ICAgICAgICBcbiAgICB9XG5cbiAgICBfZ2V0QmxvY2tOdW1iZXIoY2IgPSAoKSA9PiB7fSkge1xuXG4gICAgICAgIGNvbnN0IHRpbWVvdXQgPSBzZXRUaW1lb3V0KCgpID0+IHRoaXMuX3NldFRpbWVvdXRFeGNlZWRlZCgpLCB0aGlzLl9jb25maWcud3N0aW1lb3V0KTtcblxuICAgICAgICB0aGlzLl9wanMuYXBpLndlYjMuZ2V0QmxvY2tOdW1iZXIoKVxuICAgICAgICAgICAgLnRoZW4oYmxvY2tOdW1iZXIgPT4ge1xuICAgICAgICAgICAgICAgIHRoaXMuX2xhc3RCbG9jayA9IGJsb2NrTnVtYmVyO1xuICAgICAgICAgICAgICAgIGNsZWFyVGltZW91dCh0aW1lb3V0KTtcbiAgICAgICAgICAgICAgICBjYihudWxsLCBibG9ja051bWJlcik7XG4gICAgICAgICAgICB9KVxuICAgICAgICAgICAgLmNhdGNoKGNiKTtcbiAgICB9XG5cbiAgICAvLyBTZXQgU1RPUFBFRCBzdGF0ZVxuICAgIF9zZXRTdG9wcGVkKHNpbGVudCA9IGZhbHNlKSB7XG4gICAgICAgIHRoaXMuX2Nvbm5lY3RlZCA9IGZhbHNlO1xuICAgICAgICB0aGlzLl9jb25uZWN0aW5nID0gZmFsc2U7XG4gICAgICAgIHRoaXMuX3Nob3VsZFN0b3BwZWQgPSBmYWxzZTtcbiAgICAgICAgdGhpcy5fc3RvcHBlZCA9IHRydWU7XG4gICAgICAgIGNsZWFySW50ZXJ2YWwodGhpcy5fd2F0Y2hpbmdJbnRlcnZhbCk7XG4gICAgICAgIHRoaXMuX3dhdGNoaW5nSW50ZXJ2YWwgPSBudWxsO1xuXG4gICAgICAgIGlmICghc2lsZW50KSB7XG5cbiAgICAgICAgICAgIHRoaXMuZW1pdCgnc3RvcHBlZCcsIHtcbiAgICAgICAgICAgICAgICBkYXRlOiBEYXRlLm5vdygpXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfSAgICAgICAgXG4gICAgfVxuXG4gICAgLy8gU2V0IENPTk5FQ1RJTkcgc3RhdGVcbiAgICBfc2V0Q29ubmVjdGluZygpIHtcbiAgICAgICAgdGhpcy5fc3RvcHBlZCA9IGZhbHNlO1xuICAgICAgICB0aGlzLl9jb25uZWN0ZWQgPSBmYWxzZTtcbiAgICAgICAgdGhpcy5fY29ubmVjdGluZyA9IHRydWU7XG4gICAgICAgIHRoaXMuZW1pdCgnY29ubmVjdGluZycsIHtcbiAgICAgICAgICAgIGRhdGU6IERhdGUubm93KClcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgLy8gU2V0IERJU0NPTk5FQ1RFRCBzdGF0ZSBhbmQgZW1pdCB0aW1lb3V0IGV2ZW50XG4gICAgX3NldFRpbWVvdXRFeGNlZWRlZCgpIHtcbiAgICAgICAgdGhpcy5fc3RvcHBlZCA9IGZhbHNlO1xuICAgICAgICB0aGlzLl9jb25uZWN0ZWQgPSBmYWxzZTtcbiAgICAgICAgdGhpcy5fY29ubmVjdGluZyA9IGZhbHNlO1xuICAgICAgICB0aGlzLmVtaXQoJ3RpbWVvdXQnLCBQanNFcnJvcihXRUIzX0NPTk5FQ1RJT05fVElNRU9VVCwgdGhpcy5fY29uZmlnLndzdGltZW91dCkpOyAgICAgICAgXG4gICAgfVxuXG4gICAgLy8gU2V0IENPTk5FQ1RFRCBzdGF0ZVxuICAgIF9zZXRDb25uZWN0ZWQoKSB7XG4gICAgICAgIHRoaXMuX3N0b3BwZWQgPSBmYWxzZTtcbiAgICAgICAgdGhpcy5fY29ubmVjdGVkID0gdHJ1ZTtcbiAgICAgICAgdGhpcy5fY29ubmVjdGluZyA9IGZhbHNlO1xuICAgICAgICB0aGlzLl9jb25maWcucHJvdmlkZXIub24oJ2Vycm9yJywgZXJyID0+IHRoaXMuZW1pdCgnZXJyb3InLCBlcnIpKTtcbiAgICAgICAgdGhpcy5fY29uZmlnLnByb3ZpZGVyLm9uKCdlbmQnLCAoKSA9PiB0aGlzLl9zZXRUaW1lb3V0RXhjZWVkZWQoKSk7XG4gICAgICAgIHRoaXMuX3dhdGNoQ29ubmVjdGlvbigpO1xuICAgICAgICB0aGlzLl9nZXRCbG9ja051bWJlcigoZXJyLCBibG9ja051bWJlcikgPT4ge1xuXG4gICAgICAgICAgICBpZiAoZXJyKSB7XG5cbiAgICAgICAgICAgICAgICB0aGlzLmVtaXQoJ2Vycm9yJywgZXJyKTtcbiAgICAgICAgICAgICAgICB0aGlzLl9zZXRUaW1lb3V0RXhjZWVkZWQoKTtcbiAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHRoaXMuZW1pdCgnY29ubmVjdGVkJywge1xuICAgICAgICAgICAgICAgIGRhdGU6IERhdGUubm93KCksXG4gICAgICAgICAgICAgICAgYmxvY2tOdW1iZXJcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICAvLyBXYXRjaCBmb3IgY29ubmVjdGlvbiB2aWEgZ2V0dGluZyBsYXN0IGJsb2NrIG51bWJlclxuICAgIF93YXRjaENvbm5lY3Rpb24oKSB7XG5cbiAgICAgICAgdGhpcy5fd2F0Y2hpbmdJbnRlcnZhbCA9IHNldEludGVydmFsKCgpID0+IHtcblxuICAgICAgICAgICAgaWYgKHRoaXMuX3Nob3VsZFN0b3BwZWQpIHtcblxuICAgICAgICAgICAgICAgIHRoaXMuX2NvbmZpZy5wcm92aWRlci5jb25uZWN0aW9uLm9uKCdjbG9zZScsICgpID0+IHRoaXMuX3NldFN0b3BwZWQoKSk7XG4gICAgICAgICAgICAgICAgdGhpcy5fY29uZmlnLnByb3ZpZGVyLmNvbm5lY3Rpb24uY2xvc2UoKTtcbiAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHRoaXMuX2dldEJsb2NrTnVtYmVyKChlcnIsIGJsb2NrTnVtYmVyKSA9PiB7XG5cbiAgICAgICAgICAgICAgICBpZiAoZXJyKSB7XG4gICAgXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuZW1pdCgnZXJyb3InLCBlcnIpO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLl9zZXRUaW1lb3V0RXhjZWVkZWQoKTtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgICAgIH1cbiAgICBcbiAgICAgICAgICAgICAgICB0aGlzLmVtaXQoJ2xhc3RCbG9ja051bWJlcicsIGJsb2NrTnVtYmVyKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9LCB0aGlzLl9jb25maWcud3N0aW1lb3V0ICogMS4xKTtcbiAgICB9XG5cbiAgICAvLyBUcnlpbmcgdG8gZXN0YWJsaXNoIGNvbm5lY3Rpb24gdXNpbmcgd2Vic29ja2V0IHByb3ZpZGVyXG4gICAgX2Nvbm5lY3QoKSB7XG5cbiAgICAgICAgaWYgKHRoaXMuX2Nvbm5lY3RpbmcpIHtcblxuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG5cbiAgICAgICAgLy8gRGlzYWJsZSBwcmV2aW91cyB3YXRjaGluZyBpbnRlcnZhbFxuICAgICAgICBjbGVhckludGVydmFsKHRoaXMuX3dhdGNoaW5nSW50ZXJ2YWwpO1xuXG4gICAgICAgIGxldCB1cmwgPSBgJHt0aGlzLl9jb25maWcucHJvdG9jb2x9Oi8vJHt0aGlzLl9jb25maWcuaG9zdH0ke3RoaXMuX2NvbmZpZy5wb3J0ID8gJzonICsgdGhpcy5fY29uZmlnLnBvcnQgOiAnJ31gO1xuXG4gICAgICAgIC8vIE92ZXJyaWRlIHVybCBmb3IgdGVzdGluZyBwdXJwb3Nlc1xuICAgICAgICBpZiAocHJvY2Vzcy5lbnYuTk9ERV9FTlYgPT09ICd0ZXN0aW5nJyAmJiBwcm9jZXNzLmVudi5URVNUSU5HX1BST1ZJREVSX1VSTCkge1xuXG4gICAgICAgICAgICB1cmwgPSBwcm9jZXNzLmVudi5URVNUSU5HX1BST1ZJREVSX1VSTDtcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIE1vdmluZyB0byBDT05ORUNUSU5HIHN0YXRlXG4gICAgICAgIHRoaXMuX3NldENvbm5lY3RpbmcoKTtcblxuICAgICAgICAvLyBDcmVhdGUgbmV3IFdTIHByb3ZpZGVyXG4gICAgICAgIHRoaXMuX2NvbmZpZy5wcm92aWRlciA9IG5ldyB0aGlzLl9QanMuV2ViMy5wcm92aWRlcnMuV2Vic29ja2V0UHJvdmlkZXIodXJsKTtcblxuICAgICAgICBpZiAoIXRoaXMuX3Bqcykge1xuXG4gICAgICAgICAgICB0aGlzLl9wanMgPSBuZXcgdGhpcy5fUGpzKHtcbiAgICAgICAgICAgICAgICBldGg6IHtcbiAgICAgICAgICAgICAgICAgICAgcHJvdmlkZXI6IHRoaXMuX2NvbmZpZy5wcm92aWRlclxuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgY29udHJhY3RzOiB0aGlzLl9jb25maWcuY29udHJhY3RzLFxuICAgICAgICAgICAgICAgIGFkZHJlc3NlczogdGhpcy5fY29uZmlnLmFkZHJlc3Nlc1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH0gZWxzZSB7XG5cbiAgICAgICAgICAgIHRoaXMuX3Bqcy5hcGkud2ViMy5zZXRQcm92aWRlcih0aGlzLl9jb25maWcucHJvdmlkZXIpO1xuICAgICAgICB9XG4gICAgICAgIFxuICAgICAgICBpZiAodGhpcy5fY29uZmlnLnByb3ZpZGVyLmNvbm5lY3Rpb24ucmVhZHlTdGF0ZSA9PT0gdGhpcy5fY29uZmlnLnByb3ZpZGVyLmNvbm5lY3Rpb24uT1BFTikge1xuXG4gICAgICAgICAgICByZXR1cm4gdGhpcy5fc2V0Q29ubmVjdGVkKCk7XG4gICAgICAgIH1cblxuICAgICAgICBjb25zdCBjb25uZWN0aW9uVGltZW91dCA9IHNldFRpbWVvdXQoKCkgPT4gdGhpcy5fc2V0VGltZW91dEV4Y2VlZGVkKCksIHRoaXMuX2NvbmZpZy53c3RpbWVvdXQpO1xuICAgICAgICBcbiAgICAgICAgdGhpcy5fY29uZmlnLnByb3ZpZGVyLm9uKCdjb25uZWN0JywgKCkgPT4ge1xuICAgICAgICAgICAgY2xlYXJUaW1lb3V0KGNvbm5lY3Rpb25UaW1lb3V0KTsgICAgICAgICAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgIHRoaXMuX3NldENvbm5lY3RlZCgpOy8vIE1vdmluZyB0byBDT05ORUNURUQgc3RhdGVcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgYXN5bmMgY29ubmVjdCgpIHtcbiAgICAgICAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcblxuICAgICAgICAgICAgaWYgKHRoaXMuX2Nvbm5lY3RlZCkge1xuXG4gICAgICAgICAgICAgICAgcmV0dXJuIHJlc29sdmUoKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgZnVuY3Rpb24gb25Db25uZWN0ZWQoKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5yZW1vdmVMaXN0ZW5lcignZXJyb3InLCBvbkVycm9yKTtcbiAgICAgICAgICAgICAgICByZXNvbHZlKCk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGZ1bmN0aW9uIG9uRXJyb3IoKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5yZW1vdmVMaXN0ZW5lcignY29ubmVjdGVkJywgb25Db25uZWN0ZWQpO1xuICAgICAgICAgICAgICAgIHJlamVjdCgpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICB0aGlzLm9uY2UoJ2Nvbm5lY3RlZCcsIG9uQ29ubmVjdGVkKTtcbiAgICAgICAgICAgIHRoaXMub25jZSgnZXJyb3InLCBvbkVycm9yKTtcblxuICAgICAgICAgICAgaWYgKCF0aGlzLl9jb25uZWN0aW5nKSB7XG5cbiAgICAgICAgICAgICAgICB0aGlzLl9jb25uZWN0KCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIGFzeW5jIGNsb3NlKCkge1xuICAgICAgICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuXG4gICAgICAgICAgICBpZiAodGhpcy5fc3RvcHBlZCkge1xuXG4gICAgICAgICAgICAgICAgcmV0dXJuIHJlc29sdmUoKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgZnVuY3Rpb24gb25TdG9wcGVkKCkge1xuICAgICAgICAgICAgICAgIHRoaXMucmVtb3ZlTGlzdGVuZXIoJ2Vycm9yJywgb25FcnJvcik7XG4gICAgICAgICAgICAgICAgcmVzb2x2ZSgpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBmdW5jdGlvbiBvbkVycm9yKCkge1xuICAgICAgICAgICAgICAgIHRoaXMucmVtb3ZlTGlzdGVuZXIoJ3N0b3BwZWQnLCBvblN0b3BwZWQpO1xuICAgICAgICAgICAgICAgIHJlamVjdCgpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICB0aGlzLm9uY2UoJ3N0b3BwZWQnLCBvblN0b3BwZWQpO1xuICAgICAgICAgICAgdGhpcy5vbmNlKCdlcnJvcicsIG9uRXJyb3IpO1xuXG4gICAgICAgICAgICBpZiAoIXRoaXMuX3Nob3VsZFN0b3BwZWQpIHtcblxuICAgICAgICAgICAgICAgIHRoaXMuX3Nob3VsZFN0b3BwZWQgPSB0cnVlO1xuICAgICAgICAgICAgfSAgICAgICAgICAgIFxuICAgICAgICB9KTtcbiAgICB9XG59XG4iXX0=