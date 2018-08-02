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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9oZWxwZXJzL2V4cGVjdC5qcyJdLCJuYW1lcyI6WyJhbGwiLCJvcHRpb25zIiwibW9kZWwiLCJPYmplY3QiLCJrZXlzIiwibGVuZ3RoIiwiT1BUSU9OU19SRVFVSVJFRCIsImtleSIsInZhbHVlIiwic3BsaXQiLCJyZWR1Y2UiLCJhY2MiLCJwYXJ0IiwidW5kZWZpbmVkIiwibWVtYmVyVmFsdWUiLCJ0eXBlIiwidmFsdWVzIiwiQXJyYXkiLCJpc0FycmF5IiwiUGpzRXJyb3IiLCJhcHBseSIsImNvZGUiLCJFWFBFQ1RfVFlQRV9PUFRJT05TX1JFUVVJUkVEIiwiYXJncyIsImluY2x1ZGVzIiwiV1JPTkdfVFlQRSIsIlJlZ0V4cCIsInRlc3QiLCJBRERSRVNTX1JFUVVJUkVEIiwicHJvdmlkZXIiLCJFWFBFQ1RfTk9UX0FfTUVNQkVSIiwicmVxdWlyZWQiXSwibWFwcGluZ3MiOiJBQUFBOzs7Ozs7OztBQVNBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUVBOzs7Ozs7Ozs7Ozs7OztBQVFPLElBQU1BLEdBQUcsR0FBRyxTQUFOQSxHQUFNLEdBQThCO0FBQUEsTUFBN0JDLE9BQTZCLHVFQUFuQixFQUFtQjtBQUFBLE1BQWZDLEtBQWUsdUVBQVAsRUFBTzs7QUFFN0MsTUFBSSxRQUFPRCxPQUFQLE1BQW1CLFFBQW5CLElBQStCRSxNQUFNLENBQUNDLElBQVAsQ0FBWUgsT0FBWixFQUFxQkksTUFBckIsS0FBZ0MsQ0FBbkUsRUFBc0U7QUFFbEUsVUFBTSxxQkFBU0Msd0JBQVQsQ0FBTjtBQUNIOztBQUw0QyxhQU83QkgsTUFBTSxDQUFDQyxJQUFQLENBQVlGLEtBQVosQ0FQNkI7O0FBTzdDLDJDQUFvQztBQUEvQixRQUFJSyxHQUFHLFdBQVA7QUFFRCxRQUFJQyxLQUFLLEdBQUdELEdBQUcsQ0FBQ0UsS0FBSixDQUFVLEdBQVYsRUFBZUMsTUFBZixDQUFzQixVQUFDQyxHQUFELEVBQU1DLElBQU4sRUFBZTtBQUM3QyxhQUFPRCxHQUFH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LCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIEVuc3VyaW5nIGV4cGVjdGVkIHBhcmFtZXRlcnMgaGVscGVyXG4gKiBUaGlzIGZpbGUgaXQgaXMgYSBwYXJ0IG9mIHRoZSBQYW5kb3JhIFB5cnJoYSBKYXZhc2NyaXB0IGxpYnJhcnlcbiAqIFxuICogQGZpbGUgZXhwZWN0LmpzXG4gKiBAYXV0aG9yIEtvc3RpYW50eW4gU215cm5vdiA8a29zdHlzaEBnbWFpbC5jb20+XG4gKiBAZGF0ZSAyMDE4XG4gKi9cblxuJ3VzZSBzdHJpY3QnO1xuXG5pbXBvcnQgUGpzRXJyb3IsIHtcbiAgICBPUFRJT05TX1JFUVVJUkVELFxuICAgIFdST05HX1RZUEUsXG4gICAgQUREUkVTU19SRVFVSVJFRCxcbiAgICBFWFBFQ1RfTk9UX0FfTUVNQkVSLFxuICAgIEVYUEVDVF9UWVBFX09QVElPTlNfUkVRVUlSRURcbn0gZnJvbSAnLi9lcnJvcnMnO1xuXG5leHBvcnQgY29uc3QgYWxsID0gKG9wdGlvbnMgPSB7fSwgbW9kZWwgPSB7fSkgPT4ge1xuXG4gICAgaWYgKHR5cGVvZiBvcHRpb25zICE9PSAnb2JqZWN0JyB8fCBPYmplY3Qua2V5cyhvcHRpb25zKS5sZW5ndGggPT09IDApIHtcblxuICAgICAgICB0aHJvdyBQanNFcnJvcihPUFRJT05TX1JFUVVJUkVEKTtcbiAgICB9XG5cbiAgICBmb3IgKGxldCBrZXkgb2YgT2JqZWN0LmtleXMobW9kZWwpKSB7XG5cbiAgICAgICAgbGV0IHZhbHVlID0ga2V5LnNwbGl0KCcuJykucmVkdWNlKChhY2MsIHBhcnQpID0+IHtcbiAgICAgICAgICAgIHJldHVybiBhY2NbcGFydF0gIT09IHVuZGVmaW5lZCA/IGFjY1twYXJ0XSA6IG51bGw7XG4gICAgICAgIH0sIG9wdGlvbnMpO1xuXG4gICAgICAgIGxldCBtZW1iZXJWYWx1ZTtcblxuICAgICAgICBzd2l0Y2ggKG1vZGVsW2tleV0udHlwZSkge1xuICAgICAgICAgICAgY2FzZSAnZW51bSc6XG5cbiAgICAgICAgICAgICAgICBpZiAoIW1vZGVsW2tleV0udmFsdWVzIHx8ICFBcnJheS5pc0FycmF5KG1vZGVsW2tleV0udmFsdWVzKSkge1xuXG4gICAgICAgICAgICAgICAgICAgIHRocm93IFBqc0Vycm9yLmFwcGx5KHVuZGVmaW5lZCwgW1xuICAgICAgICAgICAgICAgICAgICAgICAgbW9kZWxba2V5XS5jb2RlIHx8IEVYUEVDVF9UWVBFX09QVElPTlNfUkVRVUlSRUQsIFxuICAgICAgICAgICAgICAgICAgICAgICAga2V5LCBcbiAgICAgICAgICAgICAgICAgICAgICAgIG1vZGVsW2tleV0udHlwZSxcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhbHVlLFxuICAgICAgICAgICAgICAgICAgICAgICAgLi4uKG1vZGVsW2tleV0uYXJncyA/IG1vZGVsW2tleV0uYXJncyA6IFt1bmRlZmluZWRdKVxuICAgICAgICAgICAgICAgICAgICBdKTtcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICBpZiAoIW1vZGVsW2tleV0udmFsdWVzLmluY2x1ZGVzKHZhbHVlKSkge1xuXG4gICAgICAgICAgICAgICAgICAgIHRocm93IFBqc0Vycm9yLmFwcGx5KHVuZGVmaW5lZCwgW1xuICAgICAgICAgICAgICAgICAgICAgICAgbW9kZWxba2V5XS5jb2RlIHx8IFdST05HX1RZUEUsIFxuICAgICAgICAgICAgICAgICAgICAgICAga2V5LCBcbiAgICAgICAgICAgICAgICAgICAgICAgIG1vZGVsW2tleV0udHlwZSxcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhbHVlLFxuICAgICAgICAgICAgICAgICAgICAgICAgLi4uKG1vZGVsW2tleV0uYXJncyA/IG1vZGVsW2tleV0uYXJncyA6IFt1bmRlZmluZWRdKVxuICAgICAgICAgICAgICAgICAgICBdKTtcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICBicmVhaztcblxuICAgICAgICAgICAgY2FzZSAnYWRkcmVzcyc6XG5cbiAgICAgICAgICAgICAgICBpZiAoIW5ldyBSZWdFeHAoJ14weFthLWZBLUYwLTldezQwfSQnKS50ZXN0KHZhbHVlKSkge1xuXG4gICAgICAgICAgICAgICAgICAgIHRocm93IFBqc0Vycm9yLmFwcGx5KHVuZGVmaW5lZCwgW1xuICAgICAgICAgICAgICAgICAgICAgICAgbW9kZWxba2V5XS5jb2RlIHx8IEFERFJFU1NfUkVRVUlSRUQsIFxuICAgICAgICAgICAgICAgICAgICAgICAga2V5LCBcbiAgICAgICAgICAgICAgICAgICAgICAgIG1vZGVsW2tleV0udHlwZSwgXG4gICAgICAgICAgICAgICAgICAgICAgICB2YWx1ZSxcbiAgICAgICAgICAgICAgICAgICAgICAgIC4uLihtb2RlbFtrZXldLmFyZ3MgPyBtb2RlbFtrZXldLmFyZ3MgOiBbdW5kZWZpbmVkXSlcbiAgICAgICAgICAgICAgICAgICAgXSk7XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgYnJlYWs7XG5cbiAgICAgICAgICAgIGNhc2UgJ21lbWJlcic6XG4gICAgICAgICAgICAgICAgXG4gICAgICAgICAgICAgICAgaWYgKCFtb2RlbFtrZXldLnByb3ZpZGVyIHx8IHR5cGVvZiBtb2RlbFtrZXldLnByb3ZpZGVyICE9PSAnb2JqZWN0Jykge1xuXG4gICAgICAgICAgICAgICAgICAgIHRocm93IFBqc0Vycm9yLmFwcGx5KHVuZGVmaW5lZCwgW1xuICAgICAgICAgICAgICAgICAgICAgICAgbW9kZWxba2V5XS5jb2RlIHx8IGBQcm92aWRlciBvYmplY3QgbXVzdCBiZSBkZWZpbmVkIGFzIFwicHJvdmlkZXJcIiBtb2RlbCBvcHRpb24gZm9yIFwiJHtrZXl9XCJgLCBcbiAgICAgICAgICAgICAgICAgICAgICAgIGtleSwgXG4gICAgICAgICAgICAgICAgICAgICAgICBtb2RlbFtrZXldLnR5cGUsIFxuICAgICAgICAgICAgICAgICAgICAgICAgdmFsdWUsXG4gICAgICAgICAgICAgICAgICAgICAgICAuLi4obW9kZWxba2V5XS5hcmdzID8gbW9kZWxba2V5XS5hcmdzIDogW3VuZGVmaW5lZF0pXG4gICAgICAgICAgICAgICAgICAgIF0pO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIG1lbWJlclZhbHVlID0gdmFsdWUuc3BsaXQoJy4nKS5yZWR1Y2UoKGFjYywgcGFydCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gYWNjICYmIGFjY1twYXJ0XSAhPT0gdW5kZWZpbmVkID8gYWNjW3BhcnRdIDogbnVsbDtcbiAgICAgICAgICAgICAgICB9LCBtb2RlbFtrZXldLnByb3ZpZGVyKTtcblxuICAgICAgICAgICAgICAgIGlmICghbWVtYmVyVmFsdWUpIHtcblxuICAgICAgICAgICAgICAgICAgICB0aHJvdyBQanNFcnJvci5hcHBseSh1bmRlZmluZWQsIFtcbiAgICAgICAgICAgICAgICAgICAgICAgIG1vZGVsW2tleV0uY29kZSB8fCBFWFBFQ1RfTk9UX0FfTUVNQkVSLCBcbiAgICAgICAgICAgICAgICAgICAgICAgIGtleSwgXG4gICAgICAgICAgICAgICAgICAgICAgICBtb2RlbFtrZXldLnR5cGUsIFxuICAgICAgICAgICAgICAgICAgICAgICAgdmFsdWUsXG4gICAgICAgICAgICAgICAgICAgICAgICAuLi4obW9kZWxba2V5XS5hcmdzID8gbW9kZWxba2V5XS5hcmdzIDogW3VuZGVmaW5lZF0pXG4gICAgICAgICAgICAgICAgICAgIF0pO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIGJyZWFrO1xuXG4gICAgICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgICAgIGlmICh0eXBlb2YgdmFsdWUgIT09IG1vZGVsW2tleV0udHlwZSAmJiBcbiAgICAgICAgICAgICAgICAgICAgKG1vZGVsW2tleV0ucmVxdWlyZWQgPT09IHRydWUgfHwgbW9kZWxba2V5XS5yZXF1aXJlZCA9PT0gdW5kZWZpbmVkKSkge1xuXG4gICAgICAgICAgICAgICAgICAgIHRocm93IFBqc0Vycm9yLmFwcGx5KHVuZGVmaW5lZCwgW1xuICAgICAgICAgICAgICAgICAgICAgICAgbW9kZWxba2V5XS5jb2RlIHx8IFdST05HX1RZUEUsIFxuICAgICAgICAgICAgICAgICAgICAgICAga2V5LCBcbiAgICAgICAgICAgICAgICAgICAgICAgIG1vZGVsW2tleV0udHlwZSwgXG4gICAgICAgICAgICAgICAgICAgICAgICB2YWx1ZSxcbiAgICAgICAgICAgICAgICAgICAgICAgIC4uLihtb2RlbFtrZXldLmFyZ3MgPyBtb2RlbFtrZXldLmFyZ3MgOiBbdW5kZWZpbmVkXSlcbiAgICAgICAgICAgICAgICAgICAgXSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICB9ICAgICAgICBcbiAgICB9XG59O1xuIl19