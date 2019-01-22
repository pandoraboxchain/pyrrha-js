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

var _events = require("events");

var _errors = _interopRequireWildcard(require("./helpers/errors"));

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; var ownKeys = Object.keys(source); if (typeof Object.getOwnPropertySymbols === 'function') { ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) { return Object.getOwnPropertyDescriptor(source, sym).enumerable; })); } ownKeys.forEach(function (key) { _defineProperty(target, key, source[key]); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (call && (typeof call === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

const STOPPED = 'STOPPED';
exports.STOPPED = STOPPED;
const CONNECTING = 'CONNECTING';
exports.CONNECTING = CONNECTING;
const CONNECTED = 'CONNECTED';
exports.CONNECTED = CONNECTED;
const DISCONNECTED = 'DISCONNECTED';
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

let PjsWsConnector =
/*#__PURE__*/
function (_EventEmitter) {
  _inherits(PjsWsConnector, _EventEmitter);

  _createClass(PjsWsConnector, [{
    key: "pjs",
    get: function () {
      return this._pjs;
    }
  }, {
    key: "lastBlock",
    get: function () {
      return this._lastBlock;
    }
  }, {
    key: "readyState",
    get: function () {
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

  function PjsWsConnector(Pjs, options = {}, connectOnSetup = false) {
    var _this;

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

    _this.on('timeout', () => _this._connect());

    if (connectOnSetup) {
      _this._connect();
    }

    return _this;
  }

  _createClass(PjsWsConnector, [{
    key: "_getBlockNumber",
    value: function _getBlockNumber(cb = () => {}) {
      const timeout = setTimeout(() => this._setTimeoutExceeded(), this._config.wstimeout);

      this._pjs.api.web3.eth.getBlockNumber().then(blockNumber => {
        this._lastBlock = blockNumber;
        clearTimeout(timeout);
        cb(null, blockNumber);
      }).catch(cb);
    } // Set STOPPED state

  }, {
    key: "_setStopped",
    value: function _setStopped(silent = false) {
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
      this._stopped = false;
      this._connected = true;
      this._connecting = false;

      this._watchConnection();

      this._getBlockNumber((err, blockNumber) => {
        if (err) {
          this.emit('error', err);

          this._setTimeoutExceeded();

          return;
        }

        this.emit('connected', {
          date: Date.now(),
          blockNumber
        });
      });
    } // Watch for connection via getting last block number

  }, {
    key: "_watchConnection",
    value: function _watchConnection() {
      this._watchingInterval = setInterval(() => {
        if (this._shouldStopped) {
          if (this._config.provider.connection.readyState === this._config.provider.connection.OPEN) {
            this._config.provider.on('close', () => this._setStopped());

            this._config.provider.connection.close();
          } else {
            this._setStopped();
          }

          return;
        }

        this._getBlockNumber((err, blockNumber) => {
          if (err) {
            this.emit('error', err);

            this._setTimeoutExceeded();

            return;
          }

          this.emit('lastBlockNumber', blockNumber);
        });
      }, this._config.wstimeout * 1.1);
    } // Trying to establish connection using websocket provider

  }, {
    key: "_connect",
    value: function _connect() {
      if (this._connecting) {
        return;
      } // Disable previous watching interval


      clearInterval(this._watchingInterval);
      let url = `${this._config.protocol}://${this._config.host}${this._config.port ? ':' + this._config.port : ''}`; // Override url for testing purposes

      if (process.env.NODE_ENV === 'testing' && process.env.TESTING_PROVIDER_URL) {
        url = process.env.TESTING_PROVIDER_URL;
      } // Moving to CONNECTING state


      this._setConnecting(); // Create new WS provider


      this._config.provider = new this._Pjs.Web3.providers.WebsocketProvider(url);

      this._config.provider.on('error', err => this.emit('error', err));

      this._config.provider.on('end', () => this._setTimeoutExceeded());

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

      const connectionTimeout = setTimeout(() => this._setTimeoutExceeded(), this._config.wstimeout);

      this._config.provider.on('connect', () => {
        clearTimeout(connectionTimeout);

        this._setConnected(); // Moving to CONNECTED state

      });
    }
  }, {
    key: "connect",
    value: async function connect() {
      return new Promise((resolve, reject) => {
        if (this._connected) {
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

        this.once('connected', onConnected);
        this.once('error', onError);

        if (!this._connecting) {
          this._connect();
        }
      });
    }
  }, {
    key: "close",
    value: async function close() {
      return new Promise((resolve, reject) => {
        if (this._stopped) {
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

        this.once('stopped', onStopped);
        this.once('error', onError);

        if (!this._shouldStopped) {
          this._shouldStopped = true;
        }
      });
    }
  }]);

  return PjsWsConnector;
}(_events.EventEmitter);

exports.default = PjsWsConnector;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9jb25uZWN0b3IuanMiXSwibmFtZXMiOlsiU1RPUFBFRCIsIkNPTk5FQ1RJTkciLCJDT05ORUNURUQiLCJESVNDT05ORUNURUQiLCJQanNXc0Nvbm5lY3RvciIsIl9wanMiLCJfbGFzdEJsb2NrIiwiX3N0b3BwZWQiLCJfY29ubmVjdGluZyIsIl9jb25uZWN0ZWQiLCJQanMiLCJvcHRpb25zIiwiY29ubmVjdE9uU2V0dXAiLCJQSlNfUkVRVUlSRUQiLCJfY29uZmlnIiwicHJvdG9jb2wiLCJob3N0IiwicG9ydCIsIndzdGltZW91dCIsInByb3ZpZGVyIiwidW5kZWZpbmVkIiwiY29udHJhY3RzIiwiYWRkcmVzc2VzIiwiY29uZmlnIiwiX3NldFN0b3BwZWQiLCJfUGpzIiwib24iLCJfY29ubmVjdCIsImNiIiwidGltZW91dCIsInNldFRpbWVvdXQiLCJfc2V0VGltZW91dEV4Y2VlZGVkIiwiYXBpIiwid2ViMyIsImV0aCIsImdldEJsb2NrTnVtYmVyIiwidGhlbiIsImJsb2NrTnVtYmVyIiwiY2xlYXJUaW1lb3V0IiwiY2F0Y2giLCJzaWxlbnQiLCJfc2hvdWxkU3RvcHBlZCIsImNsZWFySW50ZXJ2YWwiLCJfd2F0Y2hpbmdJbnRlcnZhbCIsImVtaXQiLCJkYXRlIiwiRGF0ZSIsIm5vdyIsIldFQjNfQ09OTkVDVElPTl9USU1FT1VUIiwiX3dhdGNoQ29ubmVjdGlvbiIsIl9nZXRCbG9ja051bWJlciIsImVyciIsInNldEludGVydmFsIiwiY29ubmVjdGlvbiIsInJlYWR5U3RhdGUiLCJPUEVOIiwiY2xvc2UiLCJ1cmwiLCJwcm9jZXNzIiwiZW52IiwiTk9ERV9FTlYiLCJURVNUSU5HX1BST1ZJREVSX1VSTCIsIl9zZXRDb25uZWN0aW5nIiwiV2ViMyIsInByb3ZpZGVycyIsIldlYnNvY2tldFByb3ZpZGVyIiwic2V0UHJvdmlkZXIiLCJfc2V0Q29ubmVjdGVkIiwiY29ubmVjdGlvblRpbWVvdXQiLCJQcm9taXNlIiwicmVzb2x2ZSIsInJlamVjdCIsIm9uQ29ubmVjdGVkIiwicmVtb3ZlTGlzdGVuZXIiLCJvbkVycm9yIiwib25jZSIsIm9uU3RvcHBlZCIsIkV2ZW50RW1pdHRlciJdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7Ozs7O0FBUUE7Ozs7Ozs7QUFFQTs7QUFDQTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBRU8sTUFBTUEsT0FBTyxHQUFHLFNBQWhCOztBQUNBLE1BQU1DLFVBQVUsR0FBRyxZQUFuQjs7QUFDQSxNQUFNQyxTQUFTLEdBQUcsV0FBbEI7O0FBQ0EsTUFBTUMsWUFBWSxHQUFHLGNBQXJCO0FBRVA7Ozs7Ozs7Ozs7Ozs7Ozs7SUFhcUJDLGM7Ozs7Ozs7cUJBRVA7QUFDTixhQUFPLEtBQUtDLElBQVo7QUFDSDs7O3FCQUVlO0FBQ1osYUFBTyxLQUFLQyxVQUFaO0FBQ0g7OztxQkFFZ0I7QUFFYixVQUFJLEtBQUtDLFFBQVQsRUFBbUI7QUFFZixlQUFPUCxPQUFQO0FBQ0g7O0FBRUQsVUFBSSxLQUFLUSxXQUFULEVBQXNCO0FBRWxCLGVBQU9QLFVBQVA7QUFDSDs7QUFFRCxVQUFJLEtBQUtRLFVBQVQsRUFBcUI7QUFFakIsZUFBT1AsU0FBUDtBQUNIOztBQUVELGFBQU9DLFlBQVA7QUFDSDtBQUVEOzs7Ozs7Ozs7QUFNQSwwQkFBWU8sR0FBWixFQUFpQkMsT0FBTyxHQUFHLEVBQTNCLEVBQStCQyxjQUFjLEdBQUcsS0FBaEQsRUFBdUQ7QUFBQTs7QUFBQTs7QUFDbkQ7O0FBRUEsUUFBSSxDQUFDRixHQUFMLEVBQVU7QUFFTixZQUFNLHFCQUFTRyxvQkFBVCxDQUFOO0FBQ0g7O0FBRUQsVUFBS0MsT0FBTDtBQUNJQyxNQUFBQSxRQUFRLEVBQUUsS0FEZDtBQUVJQyxNQUFBQSxJQUFJLEVBQUUsV0FGVjtBQUdJQyxNQUFBQSxJQUFJLEVBQUUsSUFIVjtBQUlJQyxNQUFBQSxTQUFTLEVBQUUsSUFKZjtBQUtJQyxNQUFBQSxRQUFRLEVBQUVDLFNBTGQ7QUFNSUMsTUFBQUEsU0FBUyxFQUFFRCxTQU5mO0FBT0lFLE1BQUFBLFNBQVMsRUFB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RUFBZDtBQUNIOztBQUVELGlCQUFTTSxTQUFULEdBQXFCO0FBQ2pCLGVBQUtILGNBQUwsQ0FBb0IsT0FBcEIsRUFBNkJDLE9BQTdCO0FBQ0FKLFVBQUFBLE9BQU87QUFDVjs7QUFFRCxpQkFBU0ksT0FBVCxHQUFtQjtBQUNmLGVBQUtELGNBQUwsQ0FBb0IsU0FBcEIsRUFBK0JHLFNBQS9CO0FBQ0FMLFVBQUFBLE1BQU07QUFDVDs7QUFFRCxhQUFLSSxJQUFMLENBQVUsU0FBVixFQUFxQkMsU0FBckI7QUFDQSxhQUFLRCxJQUFMLENBQVUsT0FBVixFQUFtQkQsT0FBbkI7O0FBRUEsWUFBSSxDQUFDLEtBQUtqQyxjQUFWLEVBQTBCO0FBRXRCLGVBQUtBLGNBQUwsR0FBc0IsSUFBdEI7QUFDSDtBQUNKLE9BeEJNLENBQVA7QUF5Qkg7Ozs7RUEzUnVDb0Msb0IiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIFdlYnNvY2tldCBjb25uZWN0aW9uIG1hbmFnZXIgZm9yIE5vZGUuanNcbiAqIFRoaXMgZmlsZSBpdCBpcyBhIHBhcnQgb2YgdGhlIFBhbmRvcmEgUHlycmhhIEphdmFzY3JpcHQgbGlicmFyeVxuICogXG4gKiBAZmlsZSBjb25uZWN0b3IuanNcbiAqIEBhdXRob3IgS29zdGlhbnR5biBTbXlybm92IDxrb3N0eXNoQGdtYWlsLmNvbT5cbiAqIEBkYXRlIDIwMThcbiAqL1xuJ3VzZSBzdHJpY3QnO1xuXG5pbXBvcnQgeyBFdmVudEVtaXR0ZXIgfSBmcm9tICdldmVudHMnO1xuaW1wb3J0IFBqc0Vycm9yLCB7IFBKU19SRVFVSVJFRCwgV0VCM19DT05ORUNUSU9OX1RJTUVPVVQgfSBmcm9tICcuL2hlbHBlcnMvZXJyb3JzJztcblxuZXhwb3J0IGNvbnN0IFNUT1BQRUQgPSAnU1RPUFBFRCc7XG5leHBvcnQgY29uc3QgQ09OTkVDVElORyA9ICdDT05ORUNUSU5HJztcbmV4cG9ydCBjb25zdCBDT05ORUNURUQgPSAnQ09OTkVDVEVEJztcbmV4cG9ydCBjb25zdCBESVNDT05ORUNURUQgPSAnRElTQ09OTkVDVEVEJztcblxuLyoqXG4gKiBXZWJzb2NrZXQgY29ubmVjdGlvbiBtYW5hZ2VyIGNsYXNzIGZvciBQanNcbiAqXG4gKiBAZXhwb3J0XG4gKiBAY2xhc3MgUGpzV3NDb25uZWN0b3JcbiAqIEBleHRlbmRzIHtFdmVudEVtaXR0ZXJ9XG4gKiBAZXZlbnQgZXJyb3JcbiAqIEBldmVudCBjb25uZWN0aW5nXG4gKiBAZXZlbnQgY29ubmVjdGVkXG4gKiBAZXZlbnQgdGltZW91dFxuICogQGV2ZW50IHN0b3BwZWRcbiAqIEBldmVudCBsYXN0QmxvY2tOdW1iZXJcbiAqL1xuZXhwb3J0IGRlZmF1bHQgY2xhc3MgUGpzV3NDb25uZWN0b3IgZXh0ZW5kcyBFdmVudEVtaXR0ZXIge1xuXG4gICAgZ2V0IHBqcygpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX3BqcztcbiAgICB9XG5cbiAgICBnZXQgbGFzdEJsb2NrKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5fbGFzdEJsb2NrO1xuICAgIH1cblxuICAgIGdldCByZWFkeVN0YXRlKCkge1xuXG4gICAgICAgIGlmICh0aGlzLl9zdG9wcGVkKSB7XG5cbiAgICAgICAgICAgIHJldHVybiBTVE9QUEVEO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHRoaXMuX2Nvbm5lY3RpbmcpIHtcblxuICAgICAgICAgICAgcmV0dXJuIENPTk5FQ1RJTkc7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAodGhpcy5fY29ubmVjdGVkKSB7XG5cbiAgICAgICAgICAgIHJldHVybiBDT05ORUNURUQ7XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gRElTQ09OTkVDVEVEO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqQ3JlYXRlcyBhbiBpbnN0YW5jZSBvZiBQanNXc0Nvbm5lY3Rvci5cbiAgICAqIEBwYXJhbSB7RnVuY3Rpb259IFBqc1xuICAgICogQHBhcmFtIHtPYmplY3R9IFtvcHRpb25zPXt9XVxuICAgICogQG1lbWJlcm9mIFBqc1dzQ29ubmVjdG9yXG4gICAgKi9cbiAgICBjb25zdHJ1Y3RvcihQanMsIG9wdGlvbnMgPSB7fSwgY29ubmVjdE9uU2V0dXAgPSBmYWxzZSkge1xuICAgICAgICBzdXBlcigpO1xuXG4gICAgICAgIGlmICghUGpzKSB7XG5cbiAgICAgICAgICAgIHRocm93IFBqc0Vycm9yKFBKU19SRVFVSVJFRCk7XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLl9jb25maWcgPSB7XG4gICAgICAgICAgICBwcm90b2NvbDogJ3dzcycsXG4gICAgICAgICAgICBob3N0OiAnbG9jYWxob3N0JyxcbiAgICAgICAgICAgIHBvcnQ6IDg1NDUsXG4gICAgICAgICAgICB3c3RpbWVvdXQ6IDIwMDAsXG4gICAgICAgICAgICBwcm92aWRlcjogdW5kZWZpbmVkLFxuICAgICAgICAgICAgY29udHJhY3RzOiB1bmRlZmluZWQsXG4gICAgICAgICAgICBhZGRyZXNzZXM6IHVuZGVmaW5lZCxcbiAgICAgICAgICAgIC4uLm9wdGlvbnMuY29uZmlnXG4gICAgICAgIH07XG5cbiAgICAgICAgdGhpcy5fc2V0U3RvcHBlZCh0cnVlKTtcbiAgICAgICAgdGhpcy5fbGFzdEJsb2NrID0gMDtcbiAgICAgICAgdGhpcy5fUGpzID0gUGpzO1xuICAgICAgICB0aGlzLl9wanMgPSBudWxsO1xuXG4gICAgICAgIHRoaXMub24oJ3RpbWVvdXQnLCAoKSA9PiB0aGlzLl9jb25uZWN0KCkpO1xuXG4gICAgICAgIGlmIChjb25uZWN0T25TZXR1cCkge1xuXG4gICAgICAgICAgICB0aGlzLl9jb25uZWN0KCk7XG4gICAgICAgIH0gICAgICAgIFxuICAgIH1cblxuICAgIF9nZXRCbG9ja051bWJlcihjYiA9ICgpID0+IHt9KSB7XG5cbiAgICAgICAgY29uc3QgdGltZW91dCA9IHNldFRpbWVvdXQoKCkgPT4gdGhpcy5fc2V0VGltZW91dEV4Y2VlZGVkKCksIHRoaXMuX2NvbmZpZy53c3RpbWVvdXQpO1xuXG4gICAgICAgIHRoaXMuX3Bqcy5hcGkud2ViMy5ldGguZ2V0QmxvY2tOdW1iZXIoKVxuICAgICAgICAgICAgLnRoZW4oYmxvY2tOdW1iZXIgPT4ge1xuICAgICAgICAgICAgICAgIHRoaXMuX2xhc3RCbG9jayA9IGJsb2NrTnVtYmVyO1xuICAgICAgICAgICAgICAgIGNsZWFyVGltZW91dCh0aW1lb3V0KTtcbiAgICAgICAgICAgICAgICBjYihudWxsLCBibG9ja051bWJlcik7XG4gICAgICAgICAgICB9KVxuICAgICAgICAgICAgLmNhdGNoKGNiKTtcbiAgICB9XG5cbiAgICAvLyBTZXQgU1RPUFBFRCBzdGF0ZVxuICAgIF9zZXRTdG9wcGVkKHNpbGVudCA9IGZhbHNlKSB7XG4gICAgICAgIHRoaXMuX2Nvbm5lY3RlZCA9IGZhbHNlO1xuICAgICAgICB0aGlzLl9jb25uZWN0aW5nID0gZmFsc2U7XG4gICAgICAgIHRoaXMuX3Nob3VsZFN0b3BwZWQgPSBmYWxzZTtcbiAgICAgICAgdGhpcy5fc3RvcHBlZCA9IHRydWU7XG4gICAgICAgIGNsZWFySW50ZXJ2YWwodGhpcy5fd2F0Y2hpbmdJbnRlcnZhbCk7XG4gICAgICAgIHRoaXMuX3dhdGNoaW5nSW50ZXJ2YWwgPSBudWxsO1xuXG4gICAgICAgIGlmICghc2lsZW50KSB7XG5cbiAgICAgICAgICAgIHRoaXMuZW1pdCgnc3RvcHBlZCcsIHtcbiAgICAgICAgICAgICAgICBkYXRlOiBEYXRlLm5vdygpXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfSAgICAgICAgXG4gICAgfVxuXG4gICAgLy8gU2V0IENPTk5FQ1RJTkcgc3RhdGVcbiAgICBfc2V0Q29ubmVjdGluZygpIHtcbiAgICAgICAgdGhpcy5fc3RvcHBlZCA9IGZhbHNlO1xuICAgICAgICB0aGlzLl9jb25uZWN0ZWQgPSBmYWxzZTtcbiAgICAgICAgdGhpcy5fY29ubmVjdGluZyA9IHRydWU7XG4gICAgICAgIHRoaXMuZW1pdCgnY29ubmVjdGluZycsIHtcbiAgICAgICAgICAgIGRhdGU6IERhdGUubm93KClcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgLy8gU2V0IERJU0NPTk5FQ1RFRCBzdGF0ZSBhbmQgZW1pdCB0aW1lb3V0IGV2ZW50XG4gICAgX3NldFRpbWVvdXRFeGNlZWRlZCgpIHtcbiAgICAgICAgdGhpcy5fc3RvcHBlZCA9IGZhbHNlO1xuICAgICAgICB0aGlzLl9jb25uZWN0ZWQgPSBmYWxzZTtcbiAgICAgICAgdGhpcy5fY29ubmVjdGluZyA9IGZhbHNlO1xuXG4gICAgICAgIGlmICghdGhpcy5fc2hvdWxkU3RvcHBlZCkge1xuXG4gICAgICAgICAgICB0aGlzLmVtaXQoJ3RpbWVvdXQnLCBQanNFcnJvcihXRUIzX0NPTk5FQ1RJT05fVElNRU9VVCwgdGhpcy5fY29uZmlnLndzdGltZW91dCkpO1xuICAgICAgICB9ICAgICAgICAgICAgICAgIFxuICAgIH1cblxuICAgIC8vIFNldCBDT05ORUNURUQgc3RhdGVcbiAgICBfc2V0Q29ubmVjdGVkKCkge1xuICAgICAgICB0aGlzLl9zdG9wcGVkID0gZmFsc2U7XG4gICAgICAgIHRoaXMuX2Nvbm5lY3RlZCA9IHRydWU7XG4gICAgICAgIHRoaXMuX2Nvbm5lY3RpbmcgPSBmYWxzZTtcbiAgICAgICAgdGhpcy5fd2F0Y2hDb25uZWN0aW9uKCk7XG4gICAgICAgIHRoaXMuX2dldEJsb2NrTnVtYmVyKChlcnIsIGJsb2NrTnVtYmVyKSA9PiB7XG5cbiAgICAgICAgICAgIGlmIChlcnIpIHtcblxuICAgICAgICAgICAgICAgIHRoaXMuZW1pdCgnZXJyb3InLCBlcnIpO1xuICAgICAgICAgICAgICAgIHRoaXMuX3NldFRpbWVvdXRFeGNlZWRlZCgpO1xuICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgdGhpcy5lbWl0KCdjb25uZWN0ZWQnLCB7XG4gICAgICAgICAgICAgICAgZGF0ZTogRGF0ZS5ub3coKSxcbiAgICAgICAgICAgICAgICBibG9ja051bWJlclxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIC8vIFdhdGNoIGZvciBjb25uZWN0aW9uIHZpYSBnZXR0aW5nIGxhc3QgYmxvY2sgbnVtYmVyXG4gICAgX3dhdGNoQ29ubmVjdGlvbigpIHtcblxuICAgICAgICB0aGlzLl93YXRjaGluZ0ludGVydmFsID0gc2V0SW50ZXJ2YWwoKCkgPT4ge1xuXG4gICAgICAgICAgICBpZiAodGhpcy5fc2hvdWxkU3RvcHBlZCkge1xuXG4gICAgICAgICAgICAgICAgaWYgKHRoaXMuX2NvbmZpZy5wcm92aWRlci5jb25uZWN0aW9uLnJlYWR5U3RhdGUgPT09IHRoaXMuX2NvbmZpZy5wcm92aWRlci5jb25uZWN0aW9uLk9QRU4pIHtcblxuICAgICAgICAgICAgICAgICAgICB0aGlzLl9jb25maWcucHJvdmlkZXIub24oJ2Nsb3NlJywgKCkgPT4gdGhpcy5fc2V0U3RvcHBlZCgpKTtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5fY29uZmlnLnByb3ZpZGVyLmNvbm5lY3Rpb24uY2xvc2UoKTtcbiAgICAgICAgICAgICAgICB9IGVsc2UgIHtcblxuICAgICAgICAgICAgICAgICAgICB0aGlzLl9zZXRTdG9wcGVkKCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgdGhpcy5fZ2V0QmxvY2tOdW1iZXIoKGVyciwgYmxvY2tOdW1iZXIpID0+IHtcblxuICAgICAgICAgICAgICAgIGlmIChlcnIpIHtcbiAgICBcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5lbWl0KCdlcnJvcicsIGVycik7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuX3NldFRpbWVvdXRFeGNlZWRlZCgpO1xuICAgICAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICAgICAgfVxuICAgIFxuICAgICAgICAgICAgICAgIHRoaXMuZW1pdCgnbGFzdEJsb2NrTnVtYmVyJywgYmxvY2tOdW1iZXIpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH0sIHRoaXMuX2NvbmZpZy53c3RpbWVvdXQgKiAxLjEpO1xuICAgIH1cblxuICAgIC8vIFRyeWluZyB0byBlc3RhYmxpc2ggY29ubmVjdGlvbiB1c2luZyB3ZWJzb2NrZXQgcHJvdmlkZXJcbiAgICBfY29ubmVjdCgpIHtcblxuICAgICAgICBpZiAodGhpcy5fY29ubmVjdGluZykge1xuXG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cblxuICAgICAgICAvLyBEaXNhYmxlIHByZXZpb3VzIHdhdGNoaW5nIGludGVydmFsXG4gICAgICAgIGNsZWFySW50ZXJ2YWwodGhpcy5fd2F0Y2hpbmdJbnRlcnZhbCk7XG5cbiAgICAgICAgbGV0IHVybCA9IGAke3RoaXMuX2NvbmZpZy5wcm90b2NvbH06Ly8ke3RoaXMuX2NvbmZpZy5ob3N0fSR7dGhpcy5fY29uZmlnLnBvcnQgPyAnOicgKyB0aGlzLl9jb25maWcucG9ydCA6ICcnfWA7XG5cbiAgICAgICAgLy8gT3ZlcnJpZGUgdXJsIGZvciB0ZXN0aW5nIHB1cnBvc2VzXG4gICAgICAgIGlmIChwcm9jZXNzLmVudi5OT0RFX0VOViA9PT0gJ3Rlc3RpbmcnICYmIHByb2Nlc3MuZW52LlRFU1RJTkdfUFJPVklERVJfVVJMKSB7XG5cbiAgICAgICAgICAgIHVybCA9IHByb2Nlc3MuZW52LlRFU1RJTkdfUFJPVklERVJfVVJMO1xuICAgICAgICB9XG5cbiAgICAgICAgLy8gTW92aW5nIHRvIENPTk5FQ1RJTkcgc3RhdGVcbiAgICAgICAgdGhpcy5fc2V0Q29ubmVjdGluZygpO1xuXG4gICAgICAgIC8vIENyZWF0ZSBuZXcgV1MgcHJvdmlkZXJcbiAgICAgICAgdGhpcy5fY29uZmlnLnByb3ZpZGVyID0gbmV3IHRoaXMuX1Bqcy5XZWIzLnByb3ZpZGVycy5XZWJzb2NrZXRQcm92aWRlcih1cmwpO1xuICAgICAgICB0aGlzLl9jb25maWcucHJvdmlkZXIub24oJ2Vycm9yJywgZXJyID0+IHRoaXMuZW1pdCgnZXJyb3InLCBlcnIpKTtcbiAgICAgICAgdGhpcy5fY29uZmlnLnByb3ZpZGVyLm9uKCdlbmQnLCAoKSA9PiB0aGlzLl9zZXRUaW1lb3V0RXhjZWVkZWQoKSk7XG5cbiAgICAgICAgaWYgKCF0aGlzLl9wanMpIHtcblxuICAgICAgICAgICAgdGhpcy5fcGpzID0gbmV3IHRoaXMuX1Bqcyh7XG4gICAgICAgICAgICAgICAgZXRoOiB7XG4gICAgICAgICAgICAgICAgICAgIHByb3ZpZGVyOiB0aGlzLl9jb25maWcucHJvdmlkZXJcbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIGNvbnRyYWN0czogdGhpcy5fY29uZmlnLmNvbnRyYWN0cyxcbiAgICAgICAgICAgICAgICBhZGRyZXNzZXM6IHRoaXMuX2NvbmZpZy5hZGRyZXNzZXNcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9IGVsc2Uge1xuXG4gICAgICAgICAgICB0aGlzLl9wanMuYXBpLndlYjMuc2V0UHJvdmlkZXIodGhpcy5fY29uZmlnLnByb3ZpZGVyKTtcbiAgICAgICAgfVxuICAgICAgICBcbiAgICAgICAgaWYgKHRoaXMuX2NvbmZpZy5wcm92aWRlci5jb25uZWN0aW9uLnJlYWR5U3RhdGUgPT09IHRoaXMuX2NvbmZpZy5wcm92aWRlci5jb25uZWN0aW9uLk9QRU4pIHtcblxuICAgICAgICAgICAgcmV0dXJuIHRoaXMuX3NldENvbm5lY3RlZCgpO1xuICAgICAgICB9XG5cbiAgICAgICAgY29uc3QgY29ubmVjdGlvblRpbWVvdXQgPSBzZXRUaW1lb3V0KCgpID0+IHRoaXMuX3NldFRpbWVvdXRFeGNlZWRlZCgpLCB0aGlzLl9jb25maWcud3N0aW1lb3V0KTtcbiAgICAgICAgXG4gICAgICAgIHRoaXMuX2NvbmZpZy5wcm92aWRlci5vbignY29ubmVjdCcsICgpID0+IHtcbiAgICAgICAgICAgIGNsZWFyVGltZW91dChjb25uZWN0aW9uVGltZW91dCk7ICAgICAgICAgICAgICAgICAgICAgICAgXG4gICAgICAgICAgICB0aGlzLl9zZXRDb25uZWN0ZWQoKTsvLyBNb3ZpbmcgdG8gQ09OTkVDVEVEIHN0YXRlXG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIGFzeW5jIGNvbm5lY3QoKSB7XG4gICAgICAgIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG5cbiAgICAgICAgICAgIGlmICh0aGlzLl9jb25uZWN0ZWQpIHtcblxuICAgICAgICAgICAgICAgIHJldHVybiByZXNvbHZlKCk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGZ1bmN0aW9uIG9uQ29ubmVjdGVkKCkge1xuICAgICAgICAgICAgICAgIHRoaXMucmVtb3ZlTGlzdGVuZXIoJ2Vycm9yJywgb25FcnJvcik7XG4gICAgICAgICAgICAgICAgcmVzb2x2ZSgpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBmdW5jdGlvbiBvbkVycm9yKCkge1xuICAgICAgICAgICAgICAgIHRoaXMucmVtb3ZlTGlzdGVuZXIoJ2Nvbm5lY3RlZCcsIG9uQ29ubmVjdGVkKTtcbiAgICAgICAgICAgICAgICByZWplY3QoKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgdGhpcy5vbmNlKCdjb25uZWN0ZWQnLCBvbkNvbm5lY3RlZCk7XG4gICAgICAgICAgICB0aGlzLm9uY2UoJ2Vycm9yJywgb25FcnJvcik7XG5cbiAgICAgICAgICAgIGlmICghdGhpcy5fY29ubmVjdGluZykge1xuXG4gICAgICAgICAgICAgICAgdGhpcy5fY29ubmVjdCgpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICBhc3luYyBjbG9zZSgpIHtcbiAgICAgICAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcblxuICAgICAgICAgICAgaWYgKHRoaXMuX3N0b3BwZWQpIHtcblxuICAgICAgICAgICAgICAgIHJldHVybiByZXNvbHZlKCk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGZ1bmN0aW9uIG9uU3RvcHBlZCgpIHtcbiAgICAgICAgICAgICAgICB0aGlzLnJlbW92ZUxpc3RlbmVyKCdlcnJvcicsIG9uRXJyb3IpO1xuICAgICAgICAgICAgICAgIHJlc29sdmUoKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgZnVuY3Rpb24gb25FcnJvcigpIHtcbiAgICAgICAgICAgICAgICB0aGlzLnJlbW92ZUxpc3RlbmVyKCdzdG9wcGVkJywgb25TdG9wcGVkKTtcbiAgICAgICAgICAgICAgICByZWplY3QoKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgdGhpcy5vbmNlKCdzdG9wcGVkJywgb25TdG9wcGVkKTtcbiAgICAgICAgICAgIHRoaXMub25jZSgnZXJyb3InLCBvbkVycm9yKTtcblxuICAgICAgICAgICAgaWYgKCF0aGlzLl9zaG91bGRTdG9wcGVkKSB7XG5cbiAgICAgICAgICAgICAgICB0aGlzLl9zaG91bGRTdG9wcGVkID0gdHJ1ZTtcbiAgICAgICAgICAgIH0gICAgICAgICAgICBcbiAgICAgICAgfSk7XG4gICAgfVxufVxuIl19