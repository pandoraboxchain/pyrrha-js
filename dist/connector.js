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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9jb25uZWN0b3IuanMiXSwibmFtZXMiOlsiU1RPUFBFRCIsIkNPTk5FQ1RJTkciLCJDT05ORUNURUQiLCJESVNDT05ORUNURUQiLCJQanNXc0Nvbm5lY3RvciIsIl9wanMiLCJfbGFzdEJsb2NrIiwiX3N0b3BwZWQiLCJfY29ubmVjdGluZyIsIl9jb25uZWN0ZWQiLCJQanMiLCJvcHRpb25zIiwiY29ubmVjdE9uU2V0dXAiLCJQSlNfUkVRVUlSRUQiLCJfY29uZmlnIiwicHJvdG9jb2wiLCJob3N0IiwicG9ydCIsIndzdGltZW91dCIsInByb3ZpZGVyIiwidW5kZWZpbmVkIiwiY29udHJhY3RzIiwiYWRkcmVzc2VzIiwiY29uZmlnIiwiX3NldFN0b3BwZWQiLCJfUGpzIiwib24iLCJfY29ubmVjdCIsImNiIiwidGltZW91dCIsInNldFRpbWVvdXQiLCJfc2V0VGltZW91dEV4Y2VlZGVkIiwiYXBpIiwid2ViMyIsImV0aCIsImdldEJsb2NrTnVtYmVyIiwidGhlbiIsImJsb2NrTnVtYmVyIiwiY2xlYXJUaW1lb3V0IiwiY2F0Y2giLCJzaWxlbnQiLCJfc2hvdWxkU3RvcHBlZCIsImNsZWFySW50ZXJ2YWwiLCJfd2F0Y2hpbmdJbnRlcnZhbCIsImVtaXQiLCJkYXRlIiwiRGF0ZSIsIm5vdyIsIldFQjNfQ09OTkVDVElPTl9USU1FT1VUIiwiZXJyIiwiX3dhdGNoQ29ubmVjdGlvbiIsIl9nZXRCbG9ja051bWJlciIsInNldEludGVydmFsIiwiY29ubmVjdGlvbiIsImNsb3NlIiwidXJsIiwicHJvY2VzcyIsImVudiIsIk5PREVfRU5WIiwiVEVTVElOR19QUk9WSURFUl9VUkwiLCJfc2V0Q29ubmVjdGluZyIsIldlYjMiLCJwcm92aWRlcnMiLCJXZWJzb2NrZXRQcm92aWRlciIsInNldFByb3ZpZGVyIiwicmVhZHlTdGF0ZSIsIk9QRU4iLCJfc2V0Q29ubmVjdGVkIiwiY29ubmVjdGlvblRpbWVvdXQiLCJQcm9taXNlIiwicmVzb2x2ZSIsInJlamVjdCIsIm9uQ29ubmVjdGVkIiwicmVtb3ZlTGlzdGVuZXIiLCJvbkVycm9yIiwib25jZSIsIm9uU3RvcHBlZCIsIkV2ZW50RW1pdHRlciJdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7Ozs7O0FBUUE7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBRUE7O0FBQ0E7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUVPLElBQU1BLE9BQU8sR0FBRyxTQUFoQjs7QUFDQSxJQUFNQyxVQUFVLEdBQUcsWUFBbkI7O0FBQ0EsSUFBTUMsU0FBUyxHQUFHLFdBQWxCOztBQUNBLElBQU1DLFlBQVksR0FBRyxjQUFyQjtBQUVQOzs7Ozs7Ozs7Ozs7Ozs7O0lBYXFCQyxjOzs7Ozs7O3dCQUVQO0FBQ04sYUFBTyxLQUFLQyxJQUFaO0FBQ0g7Ozt3QkFFZTtBQUNaLGFBQU8sS0FBS0MsVUFBWjtBQUNIOzs7d0JBRWdCO0FBRWIsVUFBSSxLQUFLQyxRQUFULEVBQW1CO0FBRWYsZUFBT1AsT0FBUDtBQUNIOztBQUVELFVBQUksS0FBS1EsV0FBVCxFQUFzQjtBQUVsQixlQUFPUCxVQUFQO0FBQ0g7O0FBRUQsVUFBSSxLQUFLUSxVQUFULEVBQXFCO0FBRWpCLGVBQU9QLFNBQVA7QUFDSDs7QUFFRCxhQUFPQyxZQUFQO0FBQ0g7QUFFRDs7Ozs7Ozs7O0FBTUEsMEJBQVlPLEdBQVosRUFBdUQ7QUFBQTs7QUFBQSxRQUF0Q0MsT0FBc0MsdUVBQTVCLEVBQTRCO0FBQUEsUUFBeEJDLGNBQXdCLHVFQUFQLEtBQU87O0FBQUE7O0FBQ25EOztBQUVBLFFBQUksQ0FBQ0YsR0FBTCxFQUFVO0FBRU4sWUFBTSxxQkFBU0csb0JBQVQsQ0FBTjtBQUNIOztBQUVELFVBQUtDLE9BQUw7QUFDSUMsTUFBQUEsUUFBUSxFQUFFLEtBRGQ7QUFFSUMsTUFBQUEsSUFBSSxFQUFFLFdBRlY7QUFHSUMsTUFBQUEsSUFBSSxFQUFFLElBSFY7QUFJSUMsTUFBQUEsU0FBUyxFQUFFLElBSmY7QUFLSUMsTUFBQUEsUUFBUSxFQUFFQyxTQUxkO0FBTUlDLE1BQUFB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RSxXQUFWLEVBQXVCO0FBRW5CLG9CQUFBLE1BQUksQ0FBQ21CLFFBQUw7QUFDSDtBQUNKLGlCQXhCTSxDOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztrREE0QkEsSUFBSTBDLE9BQUosQ0FBWSxVQUFDQyxPQUFELEVBQVVDLE1BQVYsRUFBcUI7QUFFcEMsc0JBQUksTUFBSSxDQUFDaEUsUUFBVCxFQUFtQjtBQUVmLDJCQUFPK0QsT0FBTyxFQUFkO0FBQ0g7O0FBRUQsMkJBQVNNLFNBQVQsR0FBcUI7QUFDakIseUJBQUtILGNBQUwsQ0FBb0IsT0FBcEIsRUFBNkJDLE9BQTdCO0FBQ0FKLG9CQUFBQSxPQUFPO0FBQ1Y7O0FBRUQsMkJBQVNJLE9BQVQsR0FBbUI7QUFDZix5QkFBS0QsY0FBTCxDQUFvQixTQUFwQixFQUErQkcsU0FBL0I7QUFDQUwsb0JBQUFBLE1BQU07QUFDVDs7QUFFRCxrQkFBQSxNQUFJLENBQUNJLElBQUwsQ0FBVSxTQUFWLEVBQXFCQyxTQUFyQjs7QUFDQSxrQkFBQSxNQUFJLENBQUNELElBQUwsQ0FBVSxPQUFWLEVBQW1CRCxPQUFuQjs7QUFFQSxzQkFBSSxDQUFDLE1BQUksQ0FBQ2pDLGNBQVYsRUFBMEI7QUFFdEIsb0JBQUEsTUFBSSxDQUFDQSxjQUFMLEdBQXNCLElBQXRCO0FBQ0g7QUFDSixpQkF4Qk0sQzs7Ozs7Ozs7Ozs7Ozs7Ozs7RUF2UDZCb0Msb0IiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIFdlYnNvY2tldCBjb25uZWN0aW9uIG1hbmFnZXIgZm9yIE5vZGUuanNcbiAqIFRoaXMgZmlsZSBpdCBpcyBhIHBhcnQgb2YgdGhlIFBhbmRvcmEgUHlycmhhIEphdmFzY3JpcHQgbGlicmFyeVxuICogXG4gKiBAZmlsZSBjb25uZWN0b3IuanNcbiAqIEBhdXRob3IgS29zdGlhbnR5biBTbXlybm92IDxrb3N0eXNoQGdtYWlsLmNvbT5cbiAqIEBkYXRlIDIwMThcbiAqL1xuJ3VzZSBzdHJpY3QnO1xuXG5pbXBvcnQgeyBFdmVudEVtaXR0ZXIgfSBmcm9tICdldmVudHMnO1xuaW1wb3J0IFBqc0Vycm9yLCB7IFBKU19SRVFVSVJFRCwgV0VCM19DT05ORUNUSU9OX1RJTUVPVVQgfSBmcm9tICcuL2hlbHBlcnMvZXJyb3JzJztcblxuZXhwb3J0IGNvbnN0IFNUT1BQRUQgPSAnU1RPUFBFRCc7XG5leHBvcnQgY29uc3QgQ09OTkVDVElORyA9ICdDT05ORUNUSU5HJztcbmV4cG9ydCBjb25zdCBDT05ORUNURUQgPSAnQ09OTkVDVEVEJztcbmV4cG9ydCBjb25zdCBESVNDT05ORUNURUQgPSAnRElTQ09OTkVDVEVEJztcblxuLyoqXG4gKiBXZWJzb2NrZXQgY29ubmVjdGlvbiBtYW5hZ2VyIGNsYXNzIGZvciBQanNcbiAqXG4gKiBAZXhwb3J0XG4gKiBAY2xhc3MgUGpzV3NDb25uZWN0b3JcbiAqIEBleHRlbmRzIHtFdmVudEVtaXR0ZXJ9XG4gKiBAZXZlbnQgZXJyb3JcbiAqIEBldmVudCBjb25uZWN0aW5nXG4gKiBAZXZlbnQgY29ubmVjdGVkXG4gKiBAZXZlbnQgdGltZW91dFxuICogQGV2ZW50IHN0b3BwZWRcbiAqIEBldmVudCBsYXN0QmxvY2tOdW1iZXJcbiAqL1xuZXhwb3J0IGRlZmF1bHQgY2xhc3MgUGpzV3NDb25uZWN0b3IgZXh0ZW5kcyBFdmVudEVtaXR0ZXIge1xuXG4gICAgZ2V0IHBqcygpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX3BqcztcbiAgICB9XG5cbiAgICBnZXQgbGFzdEJsb2NrKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5fbGFzdEJsb2NrO1xuICAgIH1cblxuICAgIGdldCByZWFkeVN0YXRlKCkge1xuXG4gICAgICAgIGlmICh0aGlzLl9zdG9wcGVkKSB7XG5cbiAgICAgICAgICAgIHJldHVybiBTVE9QUEVEO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHRoaXMuX2Nvbm5lY3RpbmcpIHtcblxuICAgICAgICAgICAgcmV0dXJuIENPTk5FQ1RJTkc7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAodGhpcy5fY29ubmVjdGVkKSB7XG5cbiAgICAgICAgICAgIHJldHVybiBDT05ORUNURUQ7XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gRElTQ09OTkVDVEVEO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqQ3JlYXRlcyBhbiBpbnN0YW5jZSBvZiBQanNXc0Nvbm5lY3Rvci5cbiAgICAqIEBwYXJhbSB7RnVuY3Rpb259IFBqc1xuICAgICogQHBhcmFtIHtPYmplY3R9IFtvcHRpb25zPXt9XVxuICAgICogQG1lbWJlcm9mIFBqc1dzQ29ubmVjdG9yXG4gICAgKi9cbiAgICBjb25zdHJ1Y3RvcihQanMsIG9wdGlvbnMgPSB7fSwgY29ubmVjdE9uU2V0dXAgPSBmYWxzZSkge1xuICAgICAgICBzdXBlcigpO1xuXG4gICAgICAgIGlmICghUGpzKSB7XG5cbiAgICAgICAgICAgIHRocm93IFBqc0Vycm9yKFBKU19SRVFVSVJFRCk7XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLl9jb25maWcgPSB7XG4gICAgICAgICAgICBwcm90b2NvbDogJ3dzcycsXG4gICAgICAgICAgICBob3N0OiAnbG9jYWxob3N0JyxcbiAgICAgICAgICAgIHBvcnQ6IDg1NDUsXG4gICAgICAgICAgICB3c3RpbWVvdXQ6IDIwMDAsXG4gICAgICAgICAgICBwcm92aWRlcjogdW5kZWZpbmVkLFxuICAgICAgICAgICAgY29udHJhY3RzOiB1bmRlZmluZWQsXG4gICAgICAgICAgICBhZGRyZXNzZXM6IHVuZGVmaW5lZCxcbiAgICAgICAgICAgIC4uLm9wdGlvbnMuY29uZmlnXG4gICAgICAgIH07XG5cbiAgICAgICAgdGhpcy5fc2V0U3RvcHBlZCh0cnVlKTtcbiAgICAgICAgdGhpcy5fbGFzdEJsb2NrID0gMDtcbiAgICAgICAgdGhpcy5fUGpzID0gUGpzO1xuICAgICAgICB0aGlzLl9wanMgPSBudWxsO1xuXG4gICAgICAgIHRoaXMub24oJ3RpbWVvdXQnLCAoKSA9PiB0aGlzLl9jb25uZWN0KCkpO1xuXG4gICAgICAgIGlmIChjb25uZWN0T25TZXR1cCkge1xuXG4gICAgICAgICAgICB0aGlzLl9jb25uZWN0KCk7XG4gICAgICAgIH0gICAgICAgIFxuICAgIH1cblxuICAgIF9nZXRCbG9ja051bWJlcihjYiA9ICgpID0+IHt9KSB7XG5cbiAgICAgICAgY29uc3QgdGltZW91dCA9IHNldFRpbWVvdXQoKCkgPT4gdGhpcy5fc2V0VGltZW91dEV4Y2VlZGVkKCksIHRoaXMuX2NvbmZpZy53c3RpbWVvdXQpO1xuXG4gICAgICAgIHRoaXMuX3Bqcy5hcGkud2ViMy5ldGguZ2V0QmxvY2tOdW1iZXIoKVxuICAgICAgICAgICAgLnRoZW4oYmxvY2tOdW1iZXIgPT4ge1xuICAgICAgICAgICAgICAgIHRoaXMuX2xhc3RCbG9jayA9IGJsb2NrTnVtYmVyO1xuICAgICAgICAgICAgICAgIGNsZWFyVGltZW91dCh0aW1lb3V0KTtcbiAgICAgICAgICAgICAgICBjYihudWxsLCBibG9ja051bWJlcik7XG4gICAgICAgICAgICB9KVxuICAgICAgICAgICAgLmNhdGNoKGNiKTtcbiAgICB9XG5cbiAgICAvLyBTZXQgU1RPUFBFRCBzdGF0ZVxuICAgIF9zZXRTdG9wcGVkKHNpbGVudCA9IGZhbHNlKSB7XG4gICAgICAgIHRoaXMuX2Nvbm5lY3RlZCA9IGZhbHNlO1xuICAgICAgICB0aGlzLl9jb25uZWN0aW5nID0gZmFsc2U7XG4gICAgICAgIHRoaXMuX3Nob3VsZFN0b3BwZWQgPSBmYWxzZTtcbiAgICAgICAgdGhpcy5fc3RvcHBlZCA9IHRydWU7XG4gICAgICAgIGNsZWFySW50ZXJ2YWwodGhpcy5fd2F0Y2hpbmdJbnRlcnZhbCk7XG4gICAgICAgIHRoaXMuX3dhdGNoaW5nSW50ZXJ2YWwgPSBudWxsO1xuXG4gICAgICAgIGlmICghc2lsZW50KSB7XG5cbiAgICAgICAgICAgIHRoaXMuZW1pdCgnc3RvcHBlZCcsIHtcbiAgICAgICAgICAgICAgICBkYXRlOiBEYXRlLm5vdygpXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfSAgICAgICAgXG4gICAgfVxuXG4gICAgLy8gU2V0IENPTk5FQ1RJTkcgc3RhdGVcbiAgICBfc2V0Q29ubmVjdGluZygpIHtcbiAgICAgICAgdGhpcy5fc3RvcHBlZCA9IGZhbHNlO1xuICAgICAgICB0aGlzLl9jb25uZWN0ZWQgPSBmYWxzZTtcbiAgICAgICAgdGhpcy5fY29ubmVjdGluZyA9IHRydWU7XG4gICAgICAgIHRoaXMuZW1pdCgnY29ubmVjdGluZycsIHtcbiAgICAgICAgICAgIGRhdGU6IERhdGUubm93KClcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgLy8gU2V0IERJU0NPTk5FQ1RFRCBzdGF0ZSBhbmQgZW1pdCB0aW1lb3V0IGV2ZW50XG4gICAgX3NldFRpbWVvdXRFeGNlZWRlZCgpIHtcbiAgICAgICAgdGhpcy5fc3RvcHBlZCA9IGZhbHNlO1xuICAgICAgICB0aGlzLl9jb25uZWN0ZWQgPSBmYWxzZTtcbiAgICAgICAgdGhpcy5fY29ubmVjdGluZyA9IGZhbHNlO1xuICAgICAgICB0aGlzLmVtaXQoJ3RpbWVvdXQnLCBQanNFcnJvcihXRUIzX0NPTk5FQ1RJT05fVElNRU9VVCwgdGhpcy5fY29uZmlnLndzdGltZW91dCkpOyAgICAgICAgXG4gICAgfVxuXG4gICAgLy8gU2V0IENPTk5FQ1RFRCBzdGF0ZVxuICAgIF9zZXRDb25uZWN0ZWQoKSB7XG4gICAgICAgIHRoaXMuX3N0b3BwZWQgPSBmYWxzZTtcbiAgICAgICAgdGhpcy5fY29ubmVjdGVkID0gdHJ1ZTtcbiAgICAgICAgdGhpcy5fY29ubmVjdGluZyA9IGZhbHNlO1xuICAgICAgICB0aGlzLl9jb25maWcucHJvdmlkZXIub24oJ2Vycm9yJywgZXJyID0+IHRoaXMuZW1pdCgnZXJyb3InLCBlcnIpKTtcbiAgICAgICAgdGhpcy5fY29uZmlnLnByb3ZpZGVyLm9uKCdlbmQnLCAoKSA9PiB0aGlzLl9zZXRUaW1lb3V0RXhjZWVkZWQoKSk7XG4gICAgICAgIHRoaXMuX3dhdGNoQ29ubmVjdGlvbigpO1xuICAgICAgICB0aGlzLl9nZXRCbG9ja051bWJlcigoZXJyLCBibG9ja051bWJlcikgPT4ge1xuXG4gICAgICAgICAgICBpZiAoZXJyKSB7XG5cbiAgICAgICAgICAgICAgICB0aGlzLmVtaXQoJ2Vycm9yJywgZXJyKTtcbiAgICAgICAgICAgICAgICB0aGlzLl9zZXRUaW1lb3V0RXhjZWVkZWQoKTtcbiAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHRoaXMuZW1pdCgnY29ubmVjdGVkJywge1xuICAgICAgICAgICAgICAgIGRhdGU6IERhdGUubm93KCksXG4gICAgICAgICAgICAgICAgYmxvY2tOdW1iZXJcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICAvLyBXYXRjaCBmb3IgY29ubmVjdGlvbiB2aWEgZ2V0dGluZyBsYXN0IGJsb2NrIG51bWJlclxuICAgIF93YXRjaENvbm5lY3Rpb24oKSB7XG5cbiAgICAgICAgdGhpcy5fd2F0Y2hpbmdJbnRlcnZhbCA9IHNldEludGVydmFsKCgpID0+IHtcblxuICAgICAgICAgICAgaWYgKHRoaXMuX3Nob3VsZFN0b3BwZWQpIHtcblxuICAgICAgICAgICAgICAgIHRoaXMuX2NvbmZpZy5wcm92aWRlci5vbignY2xvc2UnLCAoKSA9PiB0aGlzLl9zZXRTdG9wcGVkKCkpO1xuICAgICAgICAgICAgICAgIHRoaXMuX2NvbmZpZy5wcm92aWRlci5jb25uZWN0aW9uLmNsb3NlKCk7XG4gICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICB0aGlzLl9nZXRCbG9ja051bWJlcigoZXJyLCBibG9ja051bWJlcikgPT4ge1xuXG4gICAgICAgICAgICAgICAgaWYgKGVycikge1xuICAgIFxuICAgICAgICAgICAgICAgICAgICB0aGlzLmVtaXQoJ2Vycm9yJywgZXJyKTtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5fc2V0VGltZW91dEV4Y2VlZGVkKCk7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgICAgICB9XG4gICAgXG4gICAgICAgICAgICAgICAgdGhpcy5lbWl0KCdsYXN0QmxvY2tOdW1iZXInLCBibG9ja051bWJlcik7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfSwgdGhpcy5fY29uZmlnLndzdGltZW91dCAqIDEuMSk7XG4gICAgfVxuXG4gICAgLy8gVHJ5aW5nIHRvIGVzdGFibGlzaCBjb25uZWN0aW9uIHVzaW5nIHdlYnNvY2tldCBwcm92aWRlclxuICAgIF9jb25uZWN0KCkge1xuXG4gICAgICAgIGlmICh0aGlzLl9jb25uZWN0aW5nKSB7XG5cbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIERpc2FibGUgcHJldmlvdXMgd2F0Y2hpbmcgaW50ZXJ2YWxcbiAgICAgICAgY2xlYXJJbnRlcnZhbCh0aGlzLl93YXRjaGluZ0ludGVydmFsKTtcblxuICAgICAgICBsZXQgdXJsID0gYCR7dGhpcy5fY29uZmlnLnByb3RvY29sfTovLyR7dGhpcy5fY29uZmlnLmhvc3R9JHt0aGlzLl9jb25maWcucG9ydCA/ICc6JyArIHRoaXMuX2NvbmZpZy5wb3J0IDogJyd9YDtcblxuICAgICAgICAvLyBPdmVycmlkZSB1cmwgZm9yIHRlc3RpbmcgcHVycG9zZXNcbiAgICAgICAgaWYgKHByb2Nlc3MuZW52Lk5PREVfRU5WID09PSAndGVzdGluZycgJiYgcHJvY2Vzcy5lbnYuVEVTVElOR19QUk9WSURFUl9VUkwpIHtcblxuICAgICAgICAgICAgdXJsID0gcHJvY2Vzcy5lbnYuVEVTVElOR19QUk9WSURFUl9VUkw7XG4gICAgICAgIH1cblxuICAgICAgICAvLyBNb3ZpbmcgdG8gQ09OTkVDVElORyBzdGF0ZVxuICAgICAgICB0aGlzLl9zZXRDb25uZWN0aW5nKCk7XG5cbiAgICAgICAgLy8gQ3JlYXRlIG5ldyBXUyBwcm92aWRlclxuICAgICAgICB0aGlzLl9jb25maWcucHJvdmlkZXIgPSBuZXcgdGhpcy5fUGpzLldlYjMucHJvdmlkZXJzLldlYnNvY2tldFByb3ZpZGVyKHVybCk7XG5cbiAgICAgICAgaWYgKCF0aGlzLl9wanMpIHtcblxuICAgICAgICAgICAgdGhpcy5fcGpzID0gbmV3IHRoaXMuX1Bqcyh7XG4gICAgICAgICAgICAgICAgZXRoOiB7XG4gICAgICAgICAgICAgICAgICAgIHByb3ZpZGVyOiB0aGlzLl9jb25maWcucHJvdmlkZXJcbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIGNvbnRyYWN0czogdGhpcy5fY29uZmlnLmNvbnRyYWN0cyxcbiAgICAgICAgICAgICAgICBhZGRyZXNzZXM6IHRoaXMuX2NvbmZpZy5hZGRyZXNzZXNcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9IGVsc2Uge1xuXG4gICAgICAgICAgICB0aGlzLl9wanMuYXBpLndlYjMuc2V0UHJvdmlkZXIodGhpcy5fY29uZmlnLnByb3ZpZGVyKTtcbiAgICAgICAgfVxuICAgICAgICBcbiAgICAgICAgaWYgKHRoaXMuX2NvbmZpZy5wcm92aWRlci5jb25uZWN0aW9uLnJlYWR5U3RhdGUgPT09IHRoaXMuX2NvbmZpZy5wcm92aWRlci5jb25uZWN0aW9uLk9QRU4pIHtcblxuICAgICAgICAgICAgcmV0dXJuIHRoaXMuX3NldENvbm5lY3RlZCgpO1xuICAgICAgICB9XG5cbiAgICAgICAgY29uc3QgY29ubmVjdGlvblRpbWVvdXQgPSBzZXRUaW1lb3V0KCgpID0+IHRoaXMuX3NldFRpbWVvdXRFeGNlZWRlZCgpLCB0aGlzLl9jb25maWcud3N0aW1lb3V0KTtcbiAgICAgICAgXG4gICAgICAgIHRoaXMuX2NvbmZpZy5wcm92aWRlci5vbignY29ubmVjdCcsICgpID0+IHtcbiAgICAgICAgICAgIGNsZWFyVGltZW91dChjb25uZWN0aW9uVGltZW91dCk7ICAgICAgICAgICAgICAgICAgICAgICAgXG4gICAgICAgICAgICB0aGlzLl9zZXRDb25uZWN0ZWQoKTsvLyBNb3ZpbmcgdG8gQ09OTkVDVEVEIHN0YXRlXG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIGFzeW5jIGNvbm5lY3QoKSB7XG4gICAgICAgIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG5cbiAgICAgICAgICAgIGlmICh0aGlzLl9jb25uZWN0ZWQpIHtcblxuICAgICAgICAgICAgICAgIHJldHVybiByZXNvbHZlKCk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGZ1bmN0aW9uIG9uQ29ubmVjdGVkKCkge1xuICAgICAgICAgICAgICAgIHRoaXMucmVtb3ZlTGlzdGVuZXIoJ2Vycm9yJywgb25FcnJvcik7XG4gICAgICAgICAgICAgICAgcmVzb2x2ZSgpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBmdW5jdGlvbiBvbkVycm9yKCkge1xuICAgICAgICAgICAgICAgIHRoaXMucmVtb3ZlTGlzdGVuZXIoJ2Nvbm5lY3RlZCcsIG9uQ29ubmVjdGVkKTtcbiAgICAgICAgICAgICAgICByZWplY3QoKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgdGhpcy5vbmNlKCdjb25uZWN0ZWQnLCBvbkNvbm5lY3RlZCk7XG4gICAgICAgICAgICB0aGlzLm9uY2UoJ2Vycm9yJywgb25FcnJvcik7XG5cbiAgICAgICAgICAgIGlmICghdGhpcy5fY29ubmVjdGluZykge1xuXG4gICAgICAgICAgICAgICAgdGhpcy5fY29ubmVjdCgpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICBhc3luYyBjbG9zZSgpIHtcbiAgICAgICAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcblxuICAgICAgICAgICAgaWYgKHRoaXMuX3N0b3BwZWQpIHtcblxuICAgICAgICAgICAgICAgIHJldHVybiByZXNvbHZlKCk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGZ1bmN0aW9uIG9uU3RvcHBlZCgpIHtcbiAgICAgICAgICAgICAgICB0aGlzLnJlbW92ZUxpc3RlbmVyKCdlcnJvcicsIG9uRXJyb3IpO1xuICAgICAgICAgICAgICAgIHJlc29sdmUoKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgZnVuY3Rpb24gb25FcnJvcigpIHtcbiAgICAgICAgICAgICAgICB0aGlzLnJlbW92ZUxpc3RlbmVyKCdzdG9wcGVkJywgb25TdG9wcGVkKTtcbiAgICAgICAgICAgICAgICByZWplY3QoKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgdGhpcy5vbmNlKCdzdG9wcGVkJywgb25TdG9wcGVkKTtcbiAgICAgICAgICAgIHRoaXMub25jZSgnZXJyb3InLCBvbkVycm9yKTtcblxuICAgICAgICAgICAgaWYgKCF0aGlzLl9zaG91bGRTdG9wcGVkKSB7XG5cbiAgICAgICAgICAgICAgICB0aGlzLl9zaG91bGRTdG9wcGVkID0gdHJ1ZTtcbiAgICAgICAgICAgIH0gICAgICAgICAgICBcbiAgICAgICAgfSk7XG4gICAgfVxufVxuIl19