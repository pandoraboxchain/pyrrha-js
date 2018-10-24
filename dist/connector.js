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
exports.default = exports.DISCONNECTED = exports.CONNECTED = exports.CONNECTING = void 0;

require("core-js/modules/es7.symbol.async-iterator");

require("core-js/modules/es6.symbol");

require("core-js/modules/web.dom.iterable");

require("core-js/modules/es6.array.iterator");

require("core-js/modules/es6.object.keys");

require("core-js/modules/es6.object.set-prototype-of");

var _events = require("events");

var _errors = _interopRequireWildcard(require("./helpers/errors"));

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

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
    _this.connected = false;
    _this.connecting = false;
    _this.watchingInterval = null;
    _this.lastBlock = 0;
    _this.Pjs = Pjs;
    _this.pjs = null;

    _this.on('timeout', _this._connect);

    _this._connect();

    return _this;
  } // Set CONNECTING state


  _createClass(PjsWsConnector, [{
    key: "_setConnecting",
    value: function _setConnecting() {
      this.connected = false;
      this.connecting = true;
      this.emit('connecting', {
        date: Date.now()
      });
    } // Set DISCONNECTED state and emit timeout event

  }, {
    key: "_setTimeoutExceeded",
    value: function _setTimeoutExceeded() {
      this.connected = false;
      this.connecting = false;
      this.emit('timeout', (0, _errors.default)(_errors.WEB3_CONNECTION_TIMEOUT, this.config.wstimeout));
    } // Set CONNECTED state

  }, {
    key: "_setConnected",
    value: function _setConnected() {
      var _this2 = this;

      this.connected = true;
      this.connecting = false;
      this.emit('connected', {
        date: Date.now()
      });
      this.config.provider.on('error', function (err) {
        return _this2.emit('error', err);
      });
      this.config.provider.on('end', this._connect);

      this._watchConnection();
    } // Watch for connection via getting last block number

  }, {
    key: "_watchConnection",
    value: function _watchConnection() {
      var _this3 = this;

      this.watchingInterval = setInterval(function () {
        var timeout = setTimeout(function () {
          _this3._setTimeoutExceeded();
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


      this._setConnecting();

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

      var connectionTimeout = setTimeout(this._setTimeoutExceeded, this.config.wstimeout);
      this.config.provider.on('connect', function () {
        clearTimeout(connectionTimeout);

        _this4._setConnected(); // Moving to CONNECTED state

      });
    }
  }]);

  return PjsWsConnector;
}(_events.EventEmitter);

exports.default = PjsWsConnector;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9jb25uZWN0b3IuanMiXSwibmFtZXMiOlsiQ09OTkVDVElORyIsIkNPTk5FQ1RFRCIsIkRJU0NPTk5FQ1RFRCIsIlBqc1dzQ29ubmVjdG9yIiwicGpzIiwibGFzdEJsb2NrIiwiY29ubmVjdGluZyIsImNvbm5lY3RlZCIsIlBqcyIsIm9wdGlvbnMiLCJQSlNfUkVRVUlSRUQiLCJjb25maWciLCJwcm90b2NvbCIsImhvc3QiLCJwb3J0Iiwid3N0aW1lb3V0IiwicHJvdmlkZXIiLCJ1bmRlZmluZWQiLCJjb250cmFjdHMiLCJhZGRyZXNzZXMiLCJ3YXRjaGluZ0ludGVydmFsIiwib24iLCJfY29ubmVjdCIsImVtaXQiLCJkYXRlIiwiRGF0ZSIsIm5vdyIsIldFQjNfQ09OTkVDVElPTl9USU1FT1VUIiwiZXJyIiwiX3dhdGNoQ29ubmVjdGlvbiIsInNldEludGVydmFsIiwidGltZW91dCIsInNldFRpbWVvdXQiLCJfc2V0VGltZW91dEV4Y2VlZGVkIiwiYXBpIiwid2ViMyIsImdldEJsb2NrTnVtYmVyIiwidGhlbiIsImJsb2NrTnVtYmVyIiwiY2xlYXJUaW1lb3V0IiwiY2F0Y2giLCJjbGVhckludGVydmFsIiwidXJsIiwicHJvY2VzcyIsImVudiIsIk5PREVfRU5WIiwiVEVTVElOR19QUk9WSURFUl9VUkwiLCJfc2V0Q29ubmVjdGluZyIsIldlYjMiLCJwcm92aWRlcnMiLCJXZWJzb2NrZXRQcm92aWRlciIsImV0aCIsInNldFByb3ZpZGVyIiwiY29ubmVjdGlvbiIsInJlYWR5U3RhdGUiLCJPUEVOIiwiX3NldENvbm5lY3RlZCIsImNvbm5lY3Rpb25UaW1lb3V0IiwiRXZlbnRFbWl0dGVyIl0sIm1hcHBpbmdzIjoiQUFBQTs7Ozs7Ozs7QUFRQTs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUVBOztBQUNBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUVPLElBQU1BLFVBQVUsR0FBRyxZQUFuQjs7QUFDQSxJQUFNQyxTQUFTLEdBQUcsV0FBbEI7O0FBQ0EsSUFBTUMsWUFBWSxHQUFHLGNBQXJCO0FBRVA7Ozs7Ozs7Ozs7Ozs7OztJQVlxQkMsYzs7Ozs7Ozt3QkFFUDtBQUNOLGFBQU8sS0FBS0MsR0FBWjtBQUNIOzs7d0JBRWU7QUFDWixhQUFPLEtBQUtDLFNBQVo7QUFDSDs7O3dCQUVnQjtBQUViLFVBQUksS0FBS0MsVUFBVCxFQUFxQjtBQUVqQixlQUFPTixVQUFQO0FBQ0g7O0FBRUQsVUFBSSxLQUFLTyxTQUFULEVBQW9CO0FBRWhCLGVBQU9OLFNBQVA7QUFDSDs7QUFFRCxhQUFPQyxZQUFQO0FBQ0g7QUFFRDs7Ozs7Ozs7O0FBTUEsMEJBQVlNLEdBQVosRUFBK0I7QUFBQTs7QUFBQSxRQUFkQyxPQUFjLHVFQUFKLEVBQUk7O0FBQUE7O0FBQzNCOztBQUVBLFFBQUksQ0FBQ0QsR0FBTCxFQUFVO0FBRU4sWUFBTSxxQkFBU0Usb0JBQVQsQ0FBTjtBQUNIOztBQUVELFVBQUtDLE1BQUw7QUFDSUMsTUFBQUEsUUFBUSxFQUFFLEtBRGQ7QUFFSUMsTUFBQUEsSUFBSSxFQUFFLFdBRlY7QUFHSUMsTUFBQUEsSUFBSSxFQUFFLElBSFY7QUFJSUMsTUFBQUEsU0FBUyxFQUFFLElBSmY7QUFLSUMsTUFBQUEsUUFBUSxFQUFFQyxTQUxkO0FBTUlDLE1BQUFBLFNBQVMsRUFBRUQsU0FOZjtBQU9JRSxNQUFBQSxTQUFTLEVBQUVGO0FBUGYsT0FRT1IsT0FBTyxDQUFDRSxNQVJmO0FBV0EsVUFBS0osU0FBTCxHQUFpQixLQUFqQjtBQUNBLFVBQUtELFVBQUwsR0FBa0IsS0FBbEI7QUFDQSxVQUFLYyxnQkFBTCxHQUF3QixJQUF4QjtBQUNBLFVBQUtmLFNBQUwsR0FBaUIsQ0FBakI7QUFDQSxVQUFLRyxHQUFMLEdBQVdBLEdBQVg7QUFDQSxVQUFLSixHQUFMLEdBQVcsSUFBWDs7QUFFQSxVQUFLaUIsRUFBTCxDQUFRLFNBQVIsRUFBbUIsTUFBS0MsUUFBeEI7O0FBQ0EsVUFBS0EsUUFBTDs7QUEzQjJCO0FBNEI5QixHLENBRUQ7Ozs7O3FDQUNpQjtBQUNiLFdBQUtmLFNBQUwsR0FBaUIsS0FBakI7QUFDQSxXQUFLRCxVQUFMLEdBQWtCLElBQWxCO0FBQ0EsV0FBS2lCLElBQUwsQ0FBVSxZQUFWLEVBQXdCO0FBQ3BCQyxRQUFBQSxJQUFJLEVBQUVDLElBQUksQ0FBQ0MsR0FBTDtBQURjLE9BQXhCO0FBR0gsSyxDQUVEOzs7OzBDQUNzQjtBQUNsQixXQUFLbkIsU0FBTCxHQUFpQixLQUFqQjtBQUNBLFdBQUtELFVBQUwsR0FBa0IsS0FBbEI7QUFDQSxXQUFLaUIsSUFBTCxDQUFVLFNBQVYsRUFBcUIscUJBQVNJLCtCQUFULEVBQWtDLEtBQUtoQixNQUFMLENBQVlJLFNBQTlDLENBQXJCO0FBQ0gsSyxDQUVEOzs7O29DQUNnQjtBQUFBOztBQUNaLFdBQUtSLFNBQUwsR0FBaUIsSUFBakI7QUFDQSxXQUFLRCxVQUFMLEdBQWtCLEtBQWxCO0FBQ0EsV0FBS2lCLElBQUwsQ0FBVSxXQUFWLEVBQXVCO0FBQ25CQyxRQUFBQSxJQUFJLEVBQUVDLElBQUksQ0FBQ0MsR0FBTDtBQURhLE9BQXZCO0FBR0EsV0FBS2YsTUFBTCxDQUFZSyxRQUFaLENBQXFCSyxFQUFyQixDQUF3QixPQUF4QixFQUFpQyxVQUFBTyxHQUFHO0FBQUEsZUFBSSxNQUFJLENBQUNMLElBQUwsQ0FBVSxPQUFWLEVBQW1CSyxHQUFuQixDQUFKO0FBQUEsT0FBcEM7QUFDQSxXQUFLakIsTUFBTCxDQUFZSyxRQUFaLENBQXFCSyxFQUFyQixDQUF3QixLQUF4QixFQUErQixLQUFLQyxRQUFwQzs7QUFDQSxXQUFLTyxnQkFBTDtBQUNILEssQ0FFRDs7Ozt1Q0FDbUI7QUFBQTs7QUFFZixXQUFLVCxnQkFBTCxHQUF3QlUsV0FBVyxDQUFDLFlBQU07QUFFdEMsWUFBTUMsT0FBTyxHQUFHQyxVQUFVLENBQUMsWUFBTTtBQUM3QixVQUFBLE1BQUksQ0FBQ0MsbUJBQUw7QUFDSCxTQUZ5QixFQUV2QixNQUFJLENBQUN0QixNQUFMLENBQVlJLFNBRlcsQ0FBMUI7O0FBSUEsUUFBQSxNQUFJLENBQUNYLEdBQUwsQ0FBUzhCLEdBQVQsQ0FBYUMsSUFBYixDQUFrQkMsY0FBbEIsR0FDS0MsSUFETCxDQUNVLFVBQUFDLFdBQVcsRUFBSTtBQUNqQixVQUFBLE1BQUksQ0FBQ2pDLFNBQUwsR0FBaUJpQyxXQUFqQjtBQUNBQyxVQUFBQSxZQUFZLENBQUNSLE9BQUQsQ0FBWjs7QUFDQSxVQUFBLE1BQUksQ0FBQ1IsSUFBTCxDQUFVLGlCQUFWLEVBQTZCLE1BQUksQ0FBQ2xCLFNBQWxDO0FBQ0gsU0FMTCxFQU1LbUMsS0FOTCxDQU1XLFVBQUFaLEdBQUcsRUFBSTtBQUNWLFVBQUEsTUFBSSxDQUFDTCxJQUFMLENBQVUsT0FBVixFQUFtQkssR0FBbkI7O0FBQ0FXLFVBQUFBLFlBQVksQ0FBQ1IsT0FBRCxDQUFaOztBQUNBLFVBQUEsTUFBSSxDQUFDRSxtQkFBTDtBQUNILFNBVkw7QUFXSCxPQWpCa0MsRUFpQmhDLEtBQUt0QixNQUFMLENBQVlJLFNBQVosR0FBd0IsR0FqQlEsQ0FBbkM7QUFrQkgsSyxDQUVEOzs7OytCQUNXO0FBQUE7O0FBRVAsVUFBSSxLQUFLVCxVQUFULEVBQXFCO0FBRWpCO0FBQ0gsT0FMTSxDQU9QOzs7QUFDQW1DLE1BQUFBLGFBQWEsQ0FBQyxLQUFLckIsZ0JBQU4sQ0FBYjtBQUVBLFVBQUlzQixHQUFHLGFBQU0sS0FBSy9CLE1BQUwsQ0FBWUMsUUFBbEIsZ0JBQWdDLEtBQUtELE1BQUwsQ0FBWUUsSUFBNUMsU0FBbUQsS0FBS0YsTUFBTCxDQUFZRyxJQUFaLEdBQW1CLE1BQU0sS0FBS0gsTUFBTCxDQUFZRyxJQUFyQyxHQUE0QyxFQUEvRixDQUFQLENBVk8sQ0FZUDs7QUFDQSxVQUFJNkIsT0FBTyxDQUFDQyxHQUFSLENBQVlDLFFBQVosS0FBeUIsU0FBekIsSUFBc0NGLE9BQU8sQ0FBQ0MsR0FBUixDQUFZRSxvQkFBdEQsRUFBNEU7QUFFeEVKLFFBQUFBLEdBQUcsR0FBR0MsT0FBTyxDQUFDQyxHQUFSLENBQVlFLG9CQUFsQjtBQUNILE9BaEJNLENBa0JQOzs7QUFDQSxXQUFLQyxjQUFMOztBQUVBLFdBQUtwQyxNQUFMLENBQVlLLFFBQVosR0FBdUIsSUFBSSxLQUFLUixHQUFMLENBQVN3QyxJQUFULENBQWNDLFNBQWQsQ0FBd0JDLGlCQUE1QixDQUE4Q1IsR0FBOUMsQ0FBdkI7O0FBRUEsVUFBSSxDQUFDLEtBQUt0QyxHQUFWLEVBQWU7QUFFWCxhQUFLQSxHQUFMLEdBQVcsSUFBSSxLQUFLSSxHQUFULENBQWE7QUFDcEIyQyxVQUFBQSxHQUFHLEVBQUU7QUFDRG5DLFlBQUFBLFFBQVEsRUFBRSxLQUFLTCxNQUFMLENBQVlLO0FBRHJCLFdBRGU7QUFJcEJFLFVBQUFBLFNBQVMsRUFBRSxLQUFLUCxNQUFMLENBQVlPLFNBSkg7QUFLcEJDLFVBQUFBLFNBQVMsRUFBRSxLQUFLUixNQUFMLENBQVlRO0FBTEgsU0FBYixDQUFYO0FBT0gsT0FURCxNQVNPO0FBRUgsYUFBS2YsR0FBTCxDQUFTOEIsR0FBVCxDQUFhQyxJQUFiLENBQWtCaUIsV0FBbEIsQ0FBOEIsS0FBS3pDLE1BQUwsQ0FBWUssUUFBMUM7QUFDSDs7QUFFRCxVQUFJLEtBQUtMLE1BQUwsQ0FBWUssUUFBWixDQUFxQnFDLFVBQXJCLENBQWdDQyxVQUFoQyxLQUErQyxLQUFLM0MsTUFBTCxDQUFZSyxRQUFaLENBQXFCcUMsVUFBckIsQ0FBZ0NFLElBQW5GLEVBQXlGO0FBRXJGLGVBQU8sS0FBS0MsYUFBTCxFQUFQO0FBQ0g7O0FBRUQsVUFBTUMsaUJBQWlCLEdBQUd6QixVQUFVLENBQUMsS0FBS0MsbUJBQU4sRUFBMkIsS0FBS3RCLE1BQUwsQ0FBWUksU0FBdkMsQ0FBcEM7QUFFQSxXQUFLSixNQUFMLENBQVlLLFFBQVosQ0FBcUJLLEVBQXJCLENBQXdCLFNBQXhCLEVBQW1DLFlBQU07QUFDckNrQixRQUFBQSxZQUFZLENBQUNrQixpQkFBRCxDQUFaOztBQUNBLFFBQUEsTUFBSSxDQUFDRCxhQUFMLEdBRnFDLENBRWhCOztBQUN4QixPQUhEO0FBSUg7Ozs7RUFqS3VDRSxvQiIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogV2Vic29ja2V0IGNvbm5lY3Rpb24gbWFuYWdlciBmb3IgTm9kZS5qc1xuICogVGhpcyBmaWxlIGl0IGlzIGEgcGFydCBvZiB0aGUgUGFuZG9yYSBQeXJyaGEgSmF2YXNjcmlwdCBsaWJyYXJ5XG4gKiBcbiAqIEBmaWxlIGNvbm5lY3Rvci5qc1xuICogQGF1dGhvciBLb3N0aWFudHluIFNteXJub3YgPGtvc3R5c2hAZ21haWwuY29tPlxuICogQGRhdGUgMjAxOFxuICovXG4ndXNlIHN0cmljdCc7XG5cbmltcG9ydCB7IEV2ZW50RW1pdHRlciB9IGZyb20gJ2V2ZW50cyc7XG5pbXBvcnQgUGpzRXJyb3IsIHsgUEpTX1JFUVVJUkVELCBXRUIzX0NPTk5FQ1RJT05fVElNRU9VVCB9IGZyb20gJy4vaGVscGVycy9lcnJvcnMnO1xuXG5leHBvcnQgY29uc3QgQ09OTkVDVElORyA9ICdDT05ORUNUSU5HJztcbmV4cG9ydCBjb25zdCBDT05ORUNURUQgPSAnQ09OTkVDVEVEJztcbmV4cG9ydCBjb25zdCBESVNDT05ORUNURUQgPSAnRElTQ09OTkVDVEVEJztcblxuLyoqXG4gKiBXZWJzb2NrZXQgY29ubmVjdGlvbiBtYW5hZ2VyIGNsYXNzIGZvciBQanNcbiAqXG4gKiBAZXhwb3J0XG4gKiBAY2xhc3MgUGpzV3NDb25uZWN0b3JcbiAqIEBleHRlbmRzIHtFdmVudEVtaXR0ZXJ9XG4gKiBAZXZlbnQgZXJyb3JcbiAqIEBldmVudCBjb25uZWN0aW5nXG4gKiBAZXZlbnQgY29ubmVjdGVkXG4gKiBAZXZlbnQgdGltZW91dFxuICogQGV2ZW50IGxhc3RCbG9ja051bWJlclxuICovXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBQanNXc0Nvbm5lY3RvciBleHRlbmRzIEV2ZW50RW1pdHRlciB7XG5cbiAgICBnZXQgcGpzKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5wanM7XG4gICAgfVxuXG4gICAgZ2V0IGxhc3RCbG9jaygpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMubGFzdEJsb2NrO1xuICAgIH1cblxuICAgIGdldCByZWFkeVN0YXRlKCkge1xuXG4gICAgICAgIGlmICh0aGlzLmNvbm5lY3RpbmcpIHtcblxuICAgICAgICAgICAgcmV0dXJuIENPTk5FQ1RJTkc7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAodGhpcy5jb25uZWN0ZWQpIHtcblxuICAgICAgICAgICAgcmV0dXJuIENPTk5FQ1RFRDtcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiBESVNDT05ORUNURUQ7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICpDcmVhdGVzIGFuIGluc3RhbmNlIG9mIFBqc1dzQ29ubmVjdG9yLlxuICAgICogQHBhcmFtIHtGdW5jdGlvbn0gUGpzXG4gICAgKiBAcGFyYW0ge09iamVjdH0gW29wdGlvbnM9e31dXG4gICAgKiBAbWVtYmVyb2YgUGpzV3NDb25uZWN0b3JcbiAgICAqL1xuICAgIGNvbnN0cnVjdG9yKFBqcywgb3B0aW9ucyA9IHt9KSB7XG4gICAgICAgIHN1cGVyKCk7XG5cbiAgICAgICAgaWYgKCFQanMpIHtcblxuICAgICAgICAgICAgdGhyb3cgUGpzRXJyb3IoUEpTX1JFUVVJUkVEKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMuY29uZmlnID0ge1xuICAgICAgICAgICAgcHJvdG9jb2w6ICd3c3MnLFxuICAgICAgICAgICAgaG9zdDogJ2xvY2FsaG9zdCcsXG4gICAgICAgICAgICBwb3J0OiA4NTQ1LFxuICAgICAgICAgICAgd3N0aW1lb3V0OiAyMDAwLFxuICAgICAgICAgICAgcHJvdmlkZXI6IHVuZGVmaW5lZCxcbiAgICAgICAgICAgIGNvbnRyYWN0czogdW5kZWZpbmVkLFxuICAgICAgICAgICAgYWRkcmVzc2VzOiB1bmRlZmluZWQsXG4gICAgICAgICAgICAuLi5vcHRpb25zLmNvbmZpZ1xuICAgICAgICB9O1xuXG4gICAgICAgIHRoaXMuY29ubmVjdGVkID0gZmFsc2U7XG4gICAgICAgIHRoaXMuY29ubmVjdGluZyA9IGZhbHNlO1xuICAgICAgICB0aGlzLndhdGNoaW5nSW50ZXJ2YWwgPSBudWxsO1xuICAgICAgICB0aGlzLmxhc3RCbG9jayA9IDA7XG4gICAgICAgIHRoaXMuUGpzID0gUGpzO1xuICAgICAgICB0aGlzLnBqcyA9IG51bGw7XG5cbiAgICAgICAgdGhpcy5vbigndGltZW91dCcsIHRoaXMuX2Nvbm5lY3QpO1xuICAgICAgICB0aGlzLl9jb25uZWN0KCk7XG4gICAgfVxuXG4gICAgLy8gU2V0IENPTk5FQ1RJTkcgc3RhdGVcbiAgICBfc2V0Q29ubmVjdGluZygpIHtcbiAgICAgICAgdGhpcy5jb25uZWN0ZWQgPSBmYWxzZTtcbiAgICAgICAgdGhpcy5jb25uZWN0aW5nID0gdHJ1ZTtcbiAgICAgICAgdGhpcy5lbWl0KCdjb25uZWN0aW5nJywge1xuICAgICAgICAgICAgZGF0ZTogRGF0ZS5ub3coKVxuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICAvLyBTZXQgRElTQ09OTkVDVEVEIHN0YXRlIGFuZCBlbWl0IHRpbWVvdXQgZXZlbnRcbiAgICBfc2V0VGltZW91dEV4Y2VlZGVkKCkge1xuICAgICAgICB0aGlzLmNvbm5lY3RlZCA9IGZhbHNlO1xuICAgICAgICB0aGlzLmNvbm5lY3RpbmcgPSBmYWxzZTtcbiAgICAgICAgdGhpcy5lbWl0KCd0aW1lb3V0JywgUGpzRXJyb3IoV0VCM19DT05ORUNUSU9OX1RJTUVPVVQsIHRoaXMuY29uZmlnLndzdGltZW91dCkpOyAgICAgICAgXG4gICAgfVxuXG4gICAgLy8gU2V0IENPTk5FQ1RFRCBzdGF0ZVxuICAgIF9zZXRDb25uZWN0ZWQoKSB7XG4gICAgICAgIHRoaXMuY29ubmVjdGVkID0gdHJ1ZTtcbiAgICAgICAgdGhpcy5jb25uZWN0aW5nID0gZmFsc2U7XG4gICAgICAgIHRoaXMuZW1pdCgnY29ubmVjdGVkJywge1xuICAgICAgICAgICAgZGF0ZTogRGF0ZS5ub3coKVxuICAgICAgICB9KTtcbiAgICAgICAgdGhpcy5jb25maWcucHJvdmlkZXIub24oJ2Vycm9yJywgZXJyID0+IHRoaXMuZW1pdCgnZXJyb3InLCBlcnIpKTtcbiAgICAgICAgdGhpcy5jb25maWcucHJvdmlkZXIub24oJ2VuZCcsIHRoaXMuX2Nvbm5lY3QpO1xuICAgICAgICB0aGlzLl93YXRjaENvbm5lY3Rpb24oKTtcbiAgICB9XG5cbiAgICAvLyBXYXRjaCBmb3IgY29ubmVjdGlvbiB2aWEgZ2V0dGluZyBsYXN0IGJsb2NrIG51bWJlclxuICAgIF93YXRjaENvbm5lY3Rpb24oKSB7XG5cbiAgICAgICAgdGhpcy53YXRjaGluZ0ludGVydmFsID0gc2V0SW50ZXJ2YWwoKCkgPT4ge1xuXG4gICAgICAgICAgICBjb25zdCB0aW1lb3V0ID0gc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICAgICAgICAgICAgdGhpcy5fc2V0VGltZW91dEV4Y2VlZGVkKCk7XG4gICAgICAgICAgICB9LCB0aGlzLmNvbmZpZy53c3RpbWVvdXQpO1xuXG4gICAgICAgICAgICB0aGlzLnBqcy5hcGkud2ViMy5nZXRCbG9ja051bWJlcigpXG4gICAgICAgICAgICAgICAgLnRoZW4oYmxvY2tOdW1iZXIgPT4ge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmxhc3RCbG9jayA9IGJsb2NrTnVtYmVyO1xuICAgICAgICAgICAgICAgICAgICBjbGVhclRpbWVvdXQodGltZW91dCk7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuZW1pdCgnbGFzdEJsb2NrTnVtYmVyJywgdGhpcy5sYXN0QmxvY2spO1xuICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgICAgLmNhdGNoKGVyciA9PiB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuZW1pdCgnZXJyb3InLCBlcnIpO1xuICAgICAgICAgICAgICAgICAgICBjbGVhclRpbWVvdXQodGltZW91dCk7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuX3NldFRpbWVvdXRFeGNlZWRlZCgpOyAgICAgICAgICAgICAgICAgICAgXG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgIH0sIHRoaXMuY29uZmlnLndzdGltZW91dCAqIDEuMSk7XG4gICAgfVxuXG4gICAgLy8gVHJ5aW5nIHRvIGVzdGFibGlzaCBjb25uZWN0aW9uIHVzaW5nIHdlYnNvY2tldCBwcm92aWRlclxuICAgIF9jb25uZWN0KCkge1xuXG4gICAgICAgIGlmICh0aGlzLmNvbm5lY3RpbmcpIHtcblxuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG5cbiAgICAgICAgLy8gRGlzYWJsZSBwcmV2aW91cyB3YXRjaGluZyBpbnRlcnZhbFxuICAgICAgICBjbGVhckludGVydmFsKHRoaXMud2F0Y2hpbmdJbnRlcnZhbCk7XG5cbiAgICAgICAgbGV0IHVybCA9IGAke3RoaXMuY29uZmlnLnByb3RvY29sfTovLyR7dGhpcy5jb25maWcuaG9zdH0ke3RoaXMuY29uZmlnLnBvcnQgPyAnOicgKyB0aGlzLmNvbmZpZy5wb3J0IDogJyd9YDtcblxuICAgICAgICAvLyBPdmVycmlkZSB1cmwgZm9yIHRlc3RpbmcgcHVycG9zZXNcbiAgICAgICAgaWYgKHByb2Nlc3MuZW52Lk5PREVfRU5WID09PSAndGVzdGluZycgJiYgcHJvY2Vzcy5lbnYuVEVTVElOR19QUk9WSURFUl9VUkwpIHtcblxuICAgICAgICAgICAgdXJsID0gcHJvY2Vzcy5lbnYuVEVTVElOR19QUk9WSURFUl9VUkw7XG4gICAgICAgIH1cblxuICAgICAgICAvLyBNb3ZpbmcgdG8gQ09OTkVDVElORyBzdGF0ZVxuICAgICAgICB0aGlzLl9zZXRDb25uZWN0aW5nKCk7XG5cbiAgICAgICAgdGhpcy5jb25maWcucHJvdmlkZXIgPSBuZXcgdGhpcy5QanMuV2ViMy5wcm92aWRlcnMuV2Vic29ja2V0UHJvdmlkZXIodXJsKTtcblxuICAgICAgICBpZiAoIXRoaXMucGpzKSB7XG5cbiAgICAgICAgICAgIHRoaXMucGpzID0gbmV3IHRoaXMuUGpzKHtcbiAgICAgICAgICAgICAgICBldGg6IHtcbiAgICAgICAgICAgICAgICAgICAgcHJvdmlkZXI6IHRoaXMuY29uZmlnLnByb3ZpZGVyXG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICBjb250cmFjdHM6IHRoaXMuY29uZmlnLmNvbnRyYWN0cyxcbiAgICAgICAgICAgICAgICBhZGRyZXNzZXM6IHRoaXMuY29uZmlnLmFkZHJlc3Nlc1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH0gZWxzZSB7XG5cbiAgICAgICAgICAgIHRoaXMucGpzLmFwaS53ZWIzLnNldFByb3ZpZGVyKHRoaXMuY29uZmlnLnByb3ZpZGVyKTtcbiAgICAgICAgfVxuICAgICAgICBcbiAgICAgICAgaWYgKHRoaXMuY29uZmlnLnByb3ZpZGVyLmNvbm5lY3Rpb24ucmVhZHlTdGF0ZSA9PT0gdGhpcy5jb25maWcucHJvdmlkZXIuY29ubmVjdGlvbi5PUEVOKSB7XG5cbiAgICAgICAgICAgIHJldHVybiB0aGlzLl9zZXRDb25uZWN0ZWQoKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGNvbnN0IGNvbm5lY3Rpb25UaW1lb3V0ID0gc2V0VGltZW91dCh0aGlzLl9zZXRUaW1lb3V0RXhjZWVkZWQsIHRoaXMuY29uZmlnLndzdGltZW91dCk7XG4gICAgICAgIFxuICAgICAgICB0aGlzLmNvbmZpZy5wcm92aWRlci5vbignY29ubmVjdCcsICgpID0+IHtcbiAgICAgICAgICAgIGNsZWFyVGltZW91dChjb25uZWN0aW9uVGltZW91dCk7ICAgICAgICAgICAgICAgICAgICAgICAgXG4gICAgICAgICAgICB0aGlzLl9zZXRDb25uZWN0ZWQoKTsvLyBNb3ZpbmcgdG8gQ09OTkVDVEVEIHN0YXRlXG4gICAgICAgIH0pO1xuICAgIH1cbn1cbiJdfQ==