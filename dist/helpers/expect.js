/**
 * Ensuring expected parameters helper
 * This file it is a part of the Pandora Pyrrha Javascript library
 * 
 * @file expect.js
 * @author Kostiantyn Smyrnov <kostysh@gmail.com>
 * @date 2018
 */
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.all = void 0;

require("core-js/modules/es6.string.iterator");

require("core-js/modules/es6.array.from");

require("core-js/modules/es6.regexp.to-string");

require("core-js/modules/es7.symbol.async-iterator");

require("core-js/modules/es6.symbol");

require("core-js/modules/es6.regexp.constructor");

require("core-js/modules/es7.array.includes");

require("core-js/modules/es6.string.includes");

require("core-js/modules/es6.regexp.split");

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9oZWxwZXJzL2V4cGVjdC5qcyJdLCJuYW1lcyI6WyJhbGwiLCJvcHRpb25zIiwibW9kZWwiLCJPYmplY3QiLCJrZXlzIiwibGVuZ3RoIiwiT1BUSU9OU19SRVFVSVJFRCIsImtleSIsInZhbHVlIiwic3BsaXQiLCJyZWR1Y2UiLCJhY2MiLCJwYXJ0IiwidW5kZWZpbmVkIiwibWVtYmVyVmFsdWUiLCJ0eXBlIiwidmFsdWVzIiwiQXJyYXkiLCJpc0FycmF5IiwiUGpzRXJyb3IiLCJhcHBseSIsImNvZGUiLCJFWFBFQ1RfVFlQRV9PUFRJT05TX1JFUVVJUkVEIiwiYXJncyIsImluY2x1ZGVzIiwiV1JPTkdfVFlQRSIsIlJlZ0V4cCIsInRlc3QiLCJBRERSRVNTX1JFUVVJUkVEIiwicHJvdmlkZXIiLCJFWFBFQ1RfTk9UX0FfTUVNQkVSIiwicmVxdWlyZWQiXSwibWFwcGluZ3MiOiJBQUFBOzs7Ozs7OztBQVNBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBRUE7Ozs7Ozs7Ozs7Ozs7O0FBUU8sSUFBTUEsR0FBRyxHQUFHLFNBQU5BLEdBQU0sR0FBOEI7QUFBQSxNQUE3QkMsT0FBNkIsdUVBQW5CLEVBQW1CO0FBQUEsTUFBZkMsS0FBZSx1RUFBUCxFQUFPOztBQUU3QyxNQUFJLFFBQU9ELE9BQVAsTUFBbUIsUUFBbkIsSUFBK0JFLE1BQU0sQ0FBQ0MsSUFBUCxDQUFZSCxPQUFaLEVBQXFCSSxNQUFyQixLQUFnQyxDQUFuRSxFQUFzRTtBQUVsRSxVQUFNLHFCQUFTQyx3QkFBVCxDQUFOO0FBQ0g7O0FBTDRDLGFBTzdCSCxNQUFNLENBQUNDLElBQVAsQ0FBWUYsS0FBWixDQVA2Qjs7QUFPN0MsMkNBQW9DO0FBQS9CLFFBQUlLLEdBQUcsV0FBUDtBQUVELFFBQUlDLEtBQUssR0FBR0QsR0FBRyxDQUFDRSxLQUFKLENBQVUsR0FBVixFQUFlQyxNQUFmLENBQXNCLFVBQUNDLEdBQUQsRUFBTUMsSUFBTixFQUFlO0FBQzdDLGFBQU9ELEdB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TSIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogRW5zdXJpbmcgZXhwZWN0ZWQgcGFyYW1ldGVycyBoZWxwZXJcbiAqIFRoaXMgZmlsZSBpdCBpcyBhIHBhcnQgb2YgdGhlIFBhbmRvcmEgUHlycmhhIEphdmFzY3JpcHQgbGlicmFyeVxuICogXG4gKiBAZmlsZSBleHBlY3QuanNcbiAqIEBhdXRob3IgS29zdGlhbnR5biBTbXlybm92IDxrb3N0eXNoQGdtYWlsLmNvbT5cbiAqIEBkYXRlIDIwMThcbiAqL1xuXG4ndXNlIHN0cmljdCc7XG5cbmltcG9ydCBQanNFcnJvciwge1xuICAgIE9QVElPTlNfUkVRVUlSRUQsXG4gICAgV1JPTkdfVFlQRSxcbiAgICBBRERSRVNTX1JFUVVJUkVELFxuICAgIEVYUEVDVF9OT1RfQV9NRU1CRVIsXG4gICAgRVhQRUNUX1RZUEVfT1BUSU9OU19SRVFVSVJFRFxufSBmcm9tICcuL2Vycm9ycyc7XG5cbmV4cG9ydCBjb25zdCBhbGwgPSAob3B0aW9ucyA9IHt9LCBtb2RlbCA9IHt9KSA9PiB7XG5cbiAgICBpZiAodHlwZW9mIG9wdGlvbnMgIT09ICdvYmplY3QnIHx8IE9iamVjdC5rZXlzKG9wdGlvbnMpLmxlbmd0aCA9PT0gMCkge1xuXG4gICAgICAgIHRocm93IFBqc0Vycm9yKE9QVElPTlNfUkVRVUlSRUQpO1xuICAgIH1cblxuICAgIGZvciAobGV0IGtleSBvZiBPYmplY3Qua2V5cyhtb2RlbCkpIHtcblxuICAgICAgICBsZXQgdmFsdWUgPSBrZXkuc3BsaXQoJy4nKS5yZWR1Y2UoKGFjYywgcGFydCkgPT4ge1xuICAgICAgICAgICAgcmV0dXJuIGFjY1twYXJ0XSAhPT0gdW5kZWZpbmVkID8gYWNjW3BhcnRdIDogbnVsbDtcbiAgICAgICAgfSwgb3B0aW9ucyk7XG5cbiAgICAgICAgbGV0IG1lbWJlclZhbHVlO1xuXG4gICAgICAgIHN3aXRjaCAobW9kZWxba2V5XS50eXBlKSB7XG4gICAgICAgICAgICBjYXNlICdlbnVtJzpcblxuICAgICAgICAgICAgICAgIGlmICghbW9kZWxba2V5XS52YWx1ZXMgfHwgIUFycmF5LmlzQXJyYXkobW9kZWxba2V5XS52YWx1ZXMpKSB7XG5cbiAgICAgICAgICAgICAgICAgICAgdGhyb3cgUGpzRXJyb3IuYXBwbHkodW5kZWZpbmVkLCBbXG4gICAgICAgICAgICAgICAgICAgICAgICBtb2RlbFtrZXldLmNvZGUgfHwgRVhQRUNUX1RZUEVfT1BUSU9OU19SRVFVSVJFRCwgXG4gICAgICAgICAgICAgICAgICAgICAgICBrZXksIFxuICAgICAgICAgICAgICAgICAgICAgICAgbW9kZWxba2V5XS50eXBlLFxuICAgICAgICAgICAgICAgICAgICAgICAgdmFsdWUsXG4gICAgICAgICAgICAgICAgICAgICAgICAuLi4obW9kZWxba2V5XS5hcmdzID8gbW9kZWxba2V5XS5hcmdzIDogW3VuZGVmaW5lZF0pXG4gICAgICAgICAgICAgICAgICAgIF0pO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIGlmICghbW9kZWxba2V5XS52YWx1ZXMuaW5jbHVkZXModmFsdWUpKSB7XG5cbiAgICAgICAgICAgICAgICAgICAgdGhyb3cgUGpzRXJyb3IuYXBwbHkodW5kZWZpbmVkLCBbXG4gICAgICAgICAgICAgICAgICAgICAgICBtb2RlbFtrZXldLmNvZGUgfHwgV1JPTkdfVFlQRSwgXG4gICAgICAgICAgICAgICAgICAgICAgICBrZXksIFxuICAgICAgICAgICAgICAgICAgICAgICAgbW9kZWxba2V5XS50eXBlLFxuICAgICAgICAgICAgICAgICAgICAgICAgdmFsdWUsXG4gICAgICAgICAgICAgICAgICAgICAgICAuLi4obW9kZWxba2V5XS5hcmdzID8gbW9kZWxba2V5XS5hcmdzIDogW3VuZGVmaW5lZF0pXG4gICAgICAgICAgICAgICAgICAgIF0pO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIGJyZWFrO1xuXG4gICAgICAgICAgICBjYXNlICdhZGRyZXNzJzpcblxuICAgICAgICAgICAgICAgIGlmICghbmV3IFJlZ0V4cCgnXjB4W2EtZkEtRjAtOV17NDB9JCcpLnRlc3QodmFsdWUpKSB7XG5cbiAgICAgICAgICAgICAgICAgICAgdGhyb3cgUGpzRXJyb3IuYXBwbHkodW5kZWZpbmVkLCBbXG4gICAgICAgICAgICAgICAgICAgICAgICBtb2RlbFtrZXldLmNvZGUgfHwgQUREUkVTU19SRVFVSVJFRCwgXG4gICAgICAgICAgICAgICAgICAgICAgICBrZXksIFxuICAgICAgICAgICAgICAgICAgICAgICAgbW9kZWxba2V5XS50eXBlLCBcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhbHVlLFxuICAgICAgICAgICAgICAgICAgICAgICAgLi4uKG1vZGVsW2tleV0uYXJncyA/IG1vZGVsW2tleV0uYXJncyA6IFt1bmRlZmluZWRdKVxuICAgICAgICAgICAgICAgICAgICBdKTtcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICBicmVhaztcblxuICAgICAgICAgICAgY2FzZSAnbWVtYmVyJzpcbiAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgICAgICBpZiAoIW1vZGVsW2tleV0ucHJvdmlkZXIgfHwgdHlwZW9mIG1vZGVsW2tleV0ucHJvdmlkZXIgIT09ICdvYmplY3QnKSB7XG5cbiAgICAgICAgICAgICAgICAgICAgdGhyb3cgUGpzRXJyb3IuYXBwbHkodW5kZWZpbmVkLCBbXG4gICAgICAgICAgICAgICAgICAgICAgICBtb2RlbFtrZXldLmNvZGUgfHwgYFByb3ZpZGVyIG9iamVjdCBtdXN0IGJlIGRlZmluZWQgYXMgXCJwcm92aWRlclwiIG1vZGVsIG9wdGlvbiBmb3IgXCIke2tleX1cImAsIFxuICAgICAgICAgICAgICAgICAgICAgICAga2V5LCBcbiAgICAgICAgICAgICAgICAgICAgICAgIG1vZGVsW2tleV0udHlwZSwgXG4gICAgICAgICAgICAgICAgICAgICAgICB2YWx1ZSxcbiAgICAgICAgICAgICAgICAgICAgICAgIC4uLihtb2RlbFtrZXldLmFyZ3MgPyBtb2RlbFtrZXldLmFyZ3MgOiBbdW5kZWZpbmVkXSlcbiAgICAgICAgICAgICAgICAgICAgXSk7XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgbWVtYmVyVmFsdWUgPSB2YWx1ZS5zcGxpdCgnLicpLnJlZHVjZSgoYWNjLCBwYXJ0KSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBhY2MgJiYgYWNjW3BhcnRdICE9PSB1bmRlZmluZWQgPyBhY2NbcGFydF0gOiBudWxsO1xuICAgICAgICAgICAgICAgIH0sIG1vZGVsW2tleV0ucHJvdmlkZXIpO1xuXG4gICAgICAgICAgICAgICAgaWYgKCFtZW1iZXJWYWx1ZSkge1xuXG4gICAgICAgICAgICAgICAgICAgIHRocm93IFBqc0Vycm9yLmFwcGx5KHVuZGVmaW5lZCwgW1xuICAgICAgICAgICAgICAgICAgICAgICAgbW9kZWxba2V5XS5jb2RlIHx8IEVYUEVDVF9OT1RfQV9NRU1CRVIsIFxuICAgICAgICAgICAgICAgICAgICAgICAga2V5LCBcbiAgICAgICAgICAgICAgICAgICAgICAgIG1vZGVsW2tleV0udHlwZSwgXG4gICAgICAgICAgICAgICAgICAgICAgICB2YWx1ZSxcbiAgICAgICAgICAgICAgICAgICAgICAgIC4uLihtb2RlbFtrZXldLmFyZ3MgPyBtb2RlbFtrZXldLmFyZ3MgOiBbdW5kZWZpbmVkXSlcbiAgICAgICAgICAgICAgICAgICAgXSk7XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgYnJlYWs7XG5cbiAgICAgICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgICAgICAgXG4gICAgICAgICAgICAgICAgaWYgKHR5cGVvZiB2YWx1ZSAhPT0gbW9kZWxba2V5XS50eXBlICYmIFxuICAgICAgICAgICAgICAgICAgICAobW9kZWxba2V5XS5yZXF1aXJlZCA9PT0gdHJ1ZSB8fCBtb2RlbFtrZXldLnJlcXVpcmVkID09PSB1bmRlZmluZWQpKSB7XG5cbiAgICAgICAgICAgICAgICAgICAgdGhyb3cgUGpzRXJyb3IuYXBwbHkodW5kZWZpbmVkLCBbXG4gICAgICAgICAgICAgICAgICAgICAgICBtb2RlbFtrZXldLmNvZGUgfHwgV1JPTkdfVFlQRSwgXG4gICAgICAgICAgICAgICAgICAgICAgICBrZXksIFxuICAgICAgICAgICAgICAgICAgICAgICAgbW9kZWxba2V5XS50eXBlLCBcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhbHVlLFxuICAgICAgICAgICAgICAgICAgICAgICAgLi4uKG1vZGVsW2tleV0uYXJncyA/IG1vZGVsW2tleV0uYXJncyA6IFt1bmRlZmluZWRdKVxuICAgICAgICAgICAgICAgICAgICBdKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgIH0gICAgICAgIFxuICAgIH1cbn07XG4iXX0=