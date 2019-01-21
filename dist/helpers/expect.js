/**
 * Ensuring expected parameters helper
 * This file it is a part of the Pandora Pyrrha Javascript library
 * 
 * @file expect.js
 * @author Kostiantyn Smyrnov <kostysh@gmail.com>
 * @date 2018
 */
'use strict';

require("core-js/modules/es6.object.define-property");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.all = void 0;

require("core-js/modules/es6.string.iterator");

require("core-js/modules/es6.array.from");

require("core-js/modules/es6.regexp.to-string");

require("core-js/modules/es6.date.to-string");

require("core-js/modules/es7.symbol.async-iterator");

require("core-js/modules/es6.symbol");

require("core-js/modules/es6.regexp.constructor");

require("core-js/modules/es7.array.includes");

require("core-js/modules/es6.string.includes");

require("core-js/modules/es6.array.is-array");

require("core-js/modules/es6.regexp.split");

require("core-js/modules/es6.array.reduce");

require("core-js/modules/web.dom.iterable");

require("core-js/modules/es6.array.iterator");

require("core-js/modules/es6.object.keys");

var _errors = _interopRequireWildcard(require("./errors"));

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

var all = function all() {
  var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  var model = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

  if (_typeof(options) !== 'object' || Object.keys(options).length === 0) {
    throw (0, _errors.default)(_errors.OPTIONS_REQUIRED);
  }

  var _arr = Object.keys(model);

  for (var _i = 0; _i < _arr.length; _i++) {
    var key = _arr[_i];
    var value = key.split('.').reduce(function (acc, part) {
      return acc[part] !== undefined ? acc[part] : null;
    }, options);
    var memberValue = void 0;

    switch (model[key].type) {
      case 'enum':
        if (!model[key].values || !Array.isArray(model[key].values)) {
          throw _errors.default.apply(undefined, [model[key].code || _errors.EXPECT_TYPE_OPTIONS_REQUIRED, key, model[key].type, value].concat(_toConsumableArray(model[key].args ? model[key].args : [undefined])));
        }

        if (!model[key].values.includes(value)) {
          throw _errors.default.apply(undefined, [model[key].code || _errors.WRONG_TYPE, key, model[key].type, value].concat(_toConsumableArray(model[key].args ? model[key].args : [undefined])));
        }

        break;

      case 'address':
        if (!new RegExp('^0x[a-fA-F0-9]{40}$').test(value)) {
          throw _errors.default.apply(undefined, [model[key].code || _errors.ADDRESS_REQUIRED, key, model[key].type, value].concat(_toConsumableArray(model[key].args ? model[key].args : [undefined])));
        }

        break;

      case 'member':
        if (!model[key].provider || _typeof(model[key].provider) !== 'object') {
          throw _errors.default.apply(undefined, [model[key].code || "Provider object must be defined as \"provider\" model option for \"".concat(key, "\""), key, model[key].type, value].concat(_toConsumableArray(model[key].args ? model[key].args : [undefined])));
        }

        memberValue = value.split('.').reduce(function (acc, part) {
          return acc && acc[part] !== undefined ? acc[part] : null;
        }, model[key].provider);

        if (!memberValue) {
          throw _errors.default.apply(undefined, [model[key].code || _errors.EXPECT_NOT_A_MEMBER, key, model[key].type, value].concat(_toConsumableArray(model[key].args ? model[key].args : [undefined])));
        }

        break;

      default:
        if (_typeof(value) !== model[key].type && (model[key].required === true || model[key].required === undefined)) {
          throw _errors.default.apply(undefined, [model[key].code || _errors.WRONG_TYPE, key, model[key].type, value].concat(_toConsumableArray(model[key].args ? model[key].args : [undefined])));
        }

    }
  }
};

exports.all = all;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9oZWxwZXJzL2V4cGVjdC5qcyJdLCJuYW1lcyI6WyJhbGwiLCJvcHRpb25zIiwibW9kZWwiLCJPYmplY3QiLCJrZXlzIiwibGVuZ3RoIiwiT1BUSU9OU19SRVFVSVJFRCIsImtleSIsInZhbHVlIiwic3BsaXQiLCJyZWR1Y2UiLCJhY2MiLCJwYXJ0IiwidW5kZWZpbmVkIiwibWVtYmVyVmFsdWUiLCJ0eXBlIiwidmFsdWVzIiwiQXJyYXkiLCJpc0FycmF5IiwiUGpzRXJyb3IiLCJhcHBseSIsImNvZGUiLCJFWFBFQ1RfVFlQRV9PUFRJT05TX1JFUVVJUkVEIiwiYXJncyIsImluY2x1ZGVzIiwiV1JPTkdfVFlQRSIsIlJlZ0V4cCIsInRlc3QiLCJBRERSRVNTX1JFUVVJUkVEIiwicHJvdmlkZXIiLCJFWFBFQ1RfTk9UX0FfTUVNQkVSIiwicmVxdWlyZWQiXSwibWFwcGluZ3MiOiJBQUFBOzs7Ozs7OztBQVNBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFFQTs7Ozs7Ozs7Ozs7Ozs7QUFRTyxJQUFNQSxHQUFHLEdBQUcsU0FBTkEsR0FBTSxHQUE4QjtBQUFBLE1BQTdCQyxPQUE2Qix1RUFBbkIsRUFBbUI7QUFBQSxNQUFmQyxLQUFlLHVFQUFQLEVBQU87O0FBRTdDLE1BQUksUUFBT0QsT0FBUCxNQUFtQixRQUFuQixJQUErQkUsTUFBTSxDQUFDQyxJQUFQLENBQVlILE9BQVosRUFBcUJJLE1BQXJCLEtBQWdDLENBQW5FLEVBQXNFO0FBRWxFLFVBQU0scUJBQVNDLHdCQUFULENBQU47QUFDSDs7QUFMNEMsYUFPN0JILE1BQU0sQ0FBQ0MsSUFBUCxDQUFZRixLQUFaLENBUDZCOztBQU83QywyQ0FBb0M7QUFBL0IsUUFBSUssR0FBRyxXQUFQO0FBRUQsUUFBSUMsS0FBSyxHQUFHRCxHQUFHLENBQUNFLEtBQUosQ0FBVSxHQUFWLEVBQWVDLE1BQWYsQ0FBc0IsVUFBQ0MsR0FBRCxFQUFNQyxJQUFOLEVBQWU7QUFDN0MsYUFBT0QsR0FBRyxDQUFDQyxJQUFELENBQUgsS0FBY0MsU0FBZCxHQUEwQkYsR0FBRyxDQUFDQyxJQUFELENBQTdCLEdBQXNDLElBQTdDO0FBQ0gsS0FGVyxFQUVUWCxPQUZTLENBQVo7QUFJQSxRQUFJYSxXQUFXLFNBQWY7O0FBRUEsWUFBUVosS0FBSyxDQUFDSyxHQUFELENBQUwsQ0FBV1EsSUFBbkI7QUFDSSxXQUFLLE1BQUw7QUFFSSxZQUFJLENBQUNiLEtBQUssQ0FBQ0ssR0FBRCxDQUFMLENBQVdTLE1BQVosSUFBc0IsQ0FBQ0MsS0FBSyxDQUFDQyxPQUFOLENBQWNoQixLQUFLLENBQUNLLEdBQUQsQ0FBTCxDQUFXUyxNQUF6QixDQUEzQixFQUE2RDtBQUV6RCxnQkFBTUcsZ0JBQVNDLEtBQVQsQ0FBZVAsU0FBZixHQUNGWCxLQUFLLENBQUNLLEdBQUQsQ0FBTCxDQUFXYyxJQUFYLElBQW1CQyxvQ0FEakIsRUFFRmYsR0FGRSxFQUdGTCxLQUFLLENBQUNLLEdBQUQsQ0FBTCxDQUFXUSxJQUhULEVBSUZQLEtBSkUsNEJBS0VOLEtBQUssQ0FBQ0ssR0FBRCxDQUFMLENBQVdnQixJQUFYLEdBQWtCckIsS0FBSyxDQUFDSyxHQUFELENBQUwsQ0FBV2dCLElBQTdCLEdBQW9DLENBQUNWLFNBQUQsQ0FMdEMsR0FBTjtBQU9IOztBQUVELFlBQUksQ0FBQ1gsS0FBSyxDQUFDSyxHQUFELENBQUwsQ0FBV1MsTUFBWCxDQUFrQlEsUUFBbEIsQ0FBMkJoQixLQUEzQixDQUFMLEVBQXdDO0FBRXBDLGdCQUFNVyxnQkFBU0MsS0FBVCxDQUFlUCxTQUFmLEdBQ0ZYLEtBQUssQ0FBQ0ssR0FBRCxDQUFMLENBQVdjLElBQVgsSUFBbUJJLGtCQURqQixFQUVGbEIsR0FGRSxFQUdGTCxLQUFLLENBQUNLLEdBQUQsQ0FBTCxDQUFXUSxJQUhULEVBSUZQLEtBSkUsNEJBS0VOLEtBQUssQ0FBQ0ssR0FBRCxDQUFMLENBQVdnQixJQUFYLEdBQWtCckIsS0FBSyxDQUFDSyxHQUFELENBQUwsQ0FBV2dCLElBQTdCLEdBQW9DLENBQUNWLFNBQUQsQ0FMdEMsR0FBTjtBQU9IOztBQUVEOztBQUVKLFdBQUssU0FBTDtBQUVJLFlBQUksQ0FBQyxJQUFJYSxNQUFKLENBQVcscUJBQVgsRUFBa0NDLElBQWxDLENBQXVDbkIsS0FBdkMsQ0FBTCxFQUFvRDtBQUVoRCxnQkFBTVcsZ0JBQVNDLEtBQVQsQ0FBZVAsU0FBZixHQUNGWCxLQUFLLENBQUNLLEdBQUQsQ0FBTCxDQUFXYyxJQUFYLElBQW1CTyx3QkFEakIsRUFFRnJCLEdBRkUsRUFHRkwsS0FBSyxDQUFDSyxHQUFELENBQUwsQ0FBV1EsSUFIVCxFQUlGUCxLQUpFLDRCQUtFTixLQUFLLENBQUNLLEdBQUQsQ0FBTCxDQUFXZ0IsSUFBWCxHQUFrQnJCLEtBQUssQ0FBQ0ssR0FBRCxDQUFMLENBQVdnQixJQUE3QixHQUFvQyxDQUFDVixTQUFELENBTHRDLEdBQU47QUFPSDs7QUFFRDs7QUFFSixXQUFLLFFBQUw7QUFFSSxZQUFJLENBQUNYLEtBQUssQ0FBQ0ssR0FBRCxDQUFMLENBQVdzQixRQUFaLElBQXdCLFFBQU8zQixLQUFLLENBQUNLLEdBQUQsQ0FBTCxDQUFXc0IsUUFBbEIsTUFBK0IsUUFBM0QsRUFBcUU7QUFFakUsZ0JBQU1WLGdCQUFTQyxLQUFULENBQWVQLFNBQWYsR0FDRlgsS0FBSyxDQUFDSyxHQUFELENBQUwsQ0FBV2MsSUFBWCxpRkFBc0ZkLEdBQXRGLE9BREUsRUFFRkEsR0FGRSxFQUdGTCxLQUFLLENBQUNLLEdBQUQsQ0FBTCxDQUFXUSxJQUhULEVBSUZQLEtBSkUsNEJBS0VOLEtBQUssQ0FBQ0ssR0FBRCxDQUFMLENBQVdnQixJQUFYLEdBQWtCckIsS0FBSyxDQUFDSyxHQUFELENBQUwsQ0FBV2dCLElBQTdCLEdBQW9DLENBQUNWLFNBQUQsQ0FMdEMsR0FBTjtBQU9IOztBQUVEQyxRQUFBQSxXQUFXLEdBQUdOLEtBQUssQ0FBQ0MsS0FBTixDQUFZLEdBQVosRUFBaUJDLE1BQWpCLENBQXdCLFVBQUNDLEdBQUQsRUFBTUMsSUFBTixFQUFlO0FBQ2pELGlCQUFPRCxHQUFHLElBQUlBLEdBQUcsQ0FBQ0MsSUFBRCxDQUFILEtBQWNDLFNBQXJCLEdBQWlDRixHQUFHLENBQUNDLElBQUQsQ0FBcEMsR0FBNkMsSUFBcEQ7QUFDSCxTQUZhLEVBRVhWLEtBQUssQ0FBQ0ssR0FBRCxDQUFMLENBQVdzQixRQUZBLENBQWQ7O0FBSUEsWUFBSSxDQUFDZixXQUFMLEVBQWtCO0FBRWQsZ0JBQU1LLGdCQUFTQyxLQUFULENBQWVQLFNBQWYsR0FDRlgsS0FBSyxDQUFDSyxHQUFELENBQUwsQ0FBV2MsSUFBWCxJQUFtQlMsMkJBRGpCLEVBRUZ2QixHQUZFLEVBR0ZMLEtBQUssQ0FBQ0ssR0FBRCxDQUFMLENBQVdRLElBSFQsRUFJRlAsS0FKRSw0QkFLRU4sS0FBSyxDQUFDSyxHQUFELENBQUwsQ0FBV2dCLElBQVgsR0FBa0JyQixLQUFLLENBQUNLLEdBQUQsQ0FBTCxDQUFXZ0IsSUFBN0IsR0FBb0MsQ0FBQ1YsU0FBRCxDQUx0QyxHQUFOO0FBT0g7O0FBRUQ7O0FBRUo7QUFFSSxZQUFJLFFBQU9MLEtBQVAsTUFBaUJOLEtBQUssQ0FBQ0ssR0FBRCxDQUFMLENBQVdRLElBQTVCLEtBQ0NiLEtBQUssQ0FBQ0ssR0FBRCxDQUFMLENBQVd3QixRQUFYLEtBQXdCLElBQXhCLElBQWdDN0IsS0FBSyxDQUFDSyxHQUFELENBQUwsQ0FBV3dCLFFBQVgsS0FBd0JsQixTQUR6RCxDQUFKLEVBQ3lFO0FBRXJFLGdCQUFNTSxnQkFBU0MsS0FBVCxDQUFlUCxTQUFmLEdBQ0ZYLEtBQUssQ0FBQ0ssR0FBRCxDQUFMLENBQVdjLElBQVgsSUFBbUJJLGtCQURqQixFQUVGbEIsR0FGRSxFQUdGTCxLQUFLLENBQUNLLEdBQUQsQ0FBTCxDQUFXUSxJQUhULEVBSUZQLEtBSkUsNEJBS0VOLEtBQUssQ0FBQ0ssR0FBRCxDQUFMLENBQVdnQixJQUFYLEdBQWtCckIsS0FBSyxDQUFDSyxHQUFELENBQUwsQ0FBV2dCLElBQTdCLEdBQW9DLENBQUNWLFNBQUQsQ0FMdEMsR0FBTjtBQU9IOztBQXBGVDtBQXNGSDtBQUNKLENBdEdNIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBFbnN1cmluZyBleHBlY3RlZCBwYXJhbWV0ZXJzIGhlbHBlclxuICogVGhpcyBmaWxlIGl0IGlzIGEgcGFydCBvZiB0aGUgUGFuZG9yYSBQeXJyaGEgSmF2YXNjcmlwdCBsaWJyYXJ5XG4gKiBcbiAqIEBmaWxlIGV4cGVjdC5qc1xuICogQGF1dGhvciBLb3N0aWFudHluIFNteXJub3YgPGtvc3R5c2hAZ21haWwuY29tPlxuICogQGRhdGUgMjAxOFxuICovXG5cbid1c2Ugc3RyaWN0JztcblxuaW1wb3J0IFBqc0Vycm9yLCB7XG4gICAgT1BUSU9OU19SRVFVSVJFRCxcbiAgICBXUk9OR19UWVBFLFxuICAgIEFERFJFU1NfUkVRVUlSRUQsXG4gICAgRVhQRUNUX05PVF9BX01FTUJFUixcbiAgICBFWFBFQ1RfVFlQRV9PUFRJT05TX1JFUVVJUkVEXG59IGZyb20gJy4vZXJyb3JzJztcblxuZXhwb3J0IGNvbnN0IGFsbCA9IChvcHRpb25zID0ge30sIG1vZGVsID0ge30pID0+IHtcblxuICAgIGlmICh0eXBlb2Ygb3B0aW9ucyAhPT0gJ29iamVjdCcgfHwgT2JqZWN0LmtleXMob3B0aW9ucykubGVuZ3RoID09PSAwKSB7XG5cbiAgICAgICAgdGhyb3cgUGpzRXJyb3IoT1BUSU9OU19SRVFVSVJFRCk7XG4gICAgfVxuXG4gICAgZm9yIChsZXQga2V5IG9mIE9iamVjdC5rZXlzKG1vZGVsKSkge1xuXG4gICAgICAgIGxldCB2YWx1ZSA9IGtleS5zcGxpdCgnLicpLnJlZHVjZSgoYWNjLCBwYXJ0KSA9PiB7XG4gICAgICAgICAgICByZXR1cm4gYWNjW3BhcnRdICE9PSB1bmRlZmluZWQgPyBhY2NbcGFydF0gOiBudWxsO1xuICAgICAgICB9LCBvcHRpb25zKTtcblxuICAgICAgICBsZXQgbWVtYmVyVmFsdWU7XG5cbiAgICAgICAgc3dpdGNoIChtb2RlbFtrZXldLnR5cGUpIHtcbiAgICAgICAgICAgIGNhc2UgJ2VudW0nOlxuXG4gICAgICAgICAgICAgICAgaWYgKCFtb2RlbFtrZXldLnZhbHVlcyB8fCAhQXJyYXkuaXNBcnJheShtb2RlbFtrZXldLnZhbHVlcykpIHtcblxuICAgICAgICAgICAgICAgICAgICB0aHJvdyBQanNFcnJvci5hcHBseSh1bmRlZmluZWQsIFtcbiAgICAgICAgICAgICAgICAgICAgICAgIG1vZGVsW2tleV0uY29kZSB8fCBFWFBFQ1RfVFlQRV9PUFRJT05TX1JFUVVJUkVELCBcbiAgICAgICAgICAgICAgICAgICAgICAgIGtleSwgXG4gICAgICAgICAgICAgICAgICAgICAgICBtb2RlbFtrZXldLnR5cGUsXG4gICAgICAgICAgICAgICAgICAgICAgICB2YWx1ZSxcbiAgICAgICAgICAgICAgICAgICAgICAgIC4uLihtb2RlbFtrZXldLmFyZ3MgPyBtb2RlbFtrZXldLmFyZ3MgOiBbdW5kZWZpbmVkXSlcbiAgICAgICAgICAgICAgICAgICAgXSk7XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgaWYgKCFtb2RlbFtrZXldLnZhbHVlcy5pbmNsdWRlcyh2YWx1ZSkpIHtcblxuICAgICAgICAgICAgICAgICAgICB0aHJvdyBQanNFcnJvci5hcHBseSh1bmRlZmluZWQsIFtcbiAgICAgICAgICAgICAgICAgICAgICAgIG1vZGVsW2tleV0uY29kZSB8fCBXUk9OR19UWVBFLCBcbiAgICAgICAgICAgICAgICAgICAgICAgIGtleSwgXG4gICAgICAgICAgICAgICAgICAgICAgICBtb2RlbFtrZXldLnR5cGUsXG4gICAgICAgICAgICAgICAgICAgICAgICB2YWx1ZSxcbiAgICAgICAgICAgICAgICAgICAgICAgIC4uLihtb2RlbFtrZXldLmFyZ3MgPyBtb2RlbFtrZXldLmFyZ3MgOiBbdW5kZWZpbmVkXSlcbiAgICAgICAgICAgICAgICAgICAgXSk7XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgYnJlYWs7XG5cbiAgICAgICAgICAgIGNhc2UgJ2FkZHJlc3MnOlxuXG4gICAgICAgICAgICAgICAgaWYgKCFuZXcgUmVnRXhwKCdeMHhbYS1mQS1GMC05XXs0MH0kJykudGVzdCh2YWx1ZSkpIHtcblxuICAgICAgICAgICAgICAgICAgICB0aHJvdyBQanNFcnJvci5hcHBseSh1bmRlZmluZWQsIFtcbiAgICAgICAgICAgICAgICAgICAgICAgIG1vZGVsW2tleV0uY29kZSB8fCBBRERSRVNTX1JFUVVJUkVELCBcbiAgICAgICAgICAgICAgICAgICAgICAgIGtleSwgXG4gICAgICAgICAgICAgICAgICAgICAgICBtb2RlbFtrZXldLnR5cGUsIFxuICAgICAgICAgICAgICAgICAgICAgICAgdmFsdWUsXG4gICAgICAgICAgICAgICAgICAgICAgICAuLi4obW9kZWxba2V5XS5hcmdzID8gbW9kZWxba2V5XS5hcmdzIDogW3VuZGVmaW5lZF0pXG4gICAgICAgICAgICAgICAgICAgIF0pO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIGJyZWFrO1xuXG4gICAgICAgICAgICBjYXNlICdtZW1iZXInOlxuICAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgICAgIGlmICghbW9kZWxba2V5XS5wcm92aWRlciB8fCB0eXBlb2YgbW9kZWxba2V5XS5wcm92aWRlciAhPT0gJ29iamVjdCcpIHtcblxuICAgICAgICAgICAgICAgICAgICB0aHJvdyBQanNFcnJvci5hcHBseSh1bmRlZmluZWQsIFtcbiAgICAgICAgICAgICAgICAgICAgICAgIG1vZGVsW2tleV0uY29kZSB8fCBgUHJvdmlkZXIgb2JqZWN0IG11c3QgYmUgZGVmaW5lZCBhcyBcInByb3ZpZGVyXCIgbW9kZWwgb3B0aW9uIGZvciBcIiR7a2V5fVwiYCwgXG4gICAgICAgICAgICAgICAgICAgICAgICBrZXksIFxuICAgICAgICAgICAgICAgICAgICAgICAgbW9kZWxba2V5XS50eXBlLCBcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhbHVlLFxuICAgICAgICAgICAgICAgICAgICAgICAgLi4uKG1vZGVsW2tleV0uYXJncyA/IG1vZGVsW2tleV0uYXJncyA6IFt1bmRlZmluZWRdKVxuICAgICAgICAgICAgICAgICAgICBdKTtcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICBtZW1iZXJWYWx1ZSA9IHZhbHVlLnNwbGl0KCcuJykucmVkdWNlKChhY2MsIHBhcnQpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGFjYyAmJiBhY2NbcGFydF0gIT09IHVuZGVmaW5lZCA/IGFjY1twYXJ0XSA6IG51bGw7XG4gICAgICAgICAgICAgICAgfSwgbW9kZWxba2V5XS5wcm92aWRlcik7XG5cbiAgICAgICAgICAgICAgICBpZiAoIW1lbWJlclZhbHVlKSB7XG5cbiAgICAgICAgICAgICAgICAgICAgdGhyb3cgUGpzRXJyb3IuYXBwbHkodW5kZWZpbmVkLCBbXG4gICAgICAgICAgICAgICAgICAgICAgICBtb2RlbFtrZXldLmNvZGUgfHwgRVhQRUNUX05PVF9BX01FTUJFUiwgXG4gICAgICAgICAgICAgICAgICAgICAgICBrZXksIFxuICAgICAgICAgICAgICAgICAgICAgICAgbW9kZWxba2V5XS50eXBlLCBcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhbHVlLFxuICAgICAgICAgICAgICAgICAgICAgICAgLi4uKG1vZGVsW2tleV0uYXJncyA/IG1vZGVsW2tleV0uYXJncyA6IFt1bmRlZmluZWRdKVxuICAgICAgICAgICAgICAgICAgICBdKTtcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICBicmVhaztcblxuICAgICAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgICAgICBpZiAodHlwZW9mIHZhbHVlICE9PSBtb2RlbFtrZXldLnR5cGUgJiYgXG4gICAgICAgICAgICAgICAgICAgIChtb2RlbFtrZXldLnJlcXVpcmVkID09PSB0cnVlIHx8IG1vZGVsW2tleV0ucmVxdWlyZWQgPT09IHVuZGVmaW5lZCkpIHtcblxuICAgICAgICAgICAgICAgICAgICB0aHJvdyBQanNFcnJvci5hcHBseSh1bmRlZmluZWQsIFtcbiAgICAgICAgICAgICAgICAgICAgICAgIG1vZGVsW2tleV0uY29kZSB8fCBXUk9OR19UWVBFLCBcbiAgICAgICAgICAgICAgICAgICAgICAgIGtleSwgXG4gICAgICAgICAgICAgICAgICAgICAgICBtb2RlbFtrZXldLnR5cGUsIFxuICAgICAgICAgICAgICAgICAgICAgICAgdmFsdWUsXG4gICAgICAgICAgICAgICAgICAgICAgICAuLi4obW9kZWxba2V5XS5hcmdzID8gbW9kZWxba2V5XS5hcmdzIDogW3VuZGVmaW5lZF0pXG4gICAgICAgICAgICAgICAgICAgIF0pO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgfSAgICAgICAgXG4gICAgfVxufTtcbiJdfQ==