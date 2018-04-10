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

var _errors = _interopRequireWildcard(require("./errors"));

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

const all = (options = {}, model = {}) => {
  if (typeof options !== 'object' || Object.keys(options).length === 0) {
    throw (0, _errors.default)(_errors.OPTIONS_REQUIRED);
  }

  for (let key of Object.keys(model)) {
    let value = key.split('.').reduce((acc, part) => {
      return acc[part] ? acc[part] : null;
    }, options);

    if (!value || model[key].type && typeof value !== model[key].type) {
      throw _errors.default.apply(undefined, [...[model[key].code], ...(model[key].args ? model[key].args : [])]);
    }
  }
};

exports.all = all;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9oZWxwZXJzL2V4cGVjdC5qcyJdLCJuYW1lcyI6WyJhbGwiLCJvcHRpb25zIiwibW9kZWwiLCJPYmplY3QiLCJrZXlzIiwibGVuZ3RoIiwiT1BUSU9OU19SRVFVSVJFRCIsImtleSIsInZhbHVlIiwic3BsaXQiLCJyZWR1Y2UiLCJhY2MiLCJwYXJ0IiwidHlwZSIsIlBqc0Vycm9yIiwiYXBwbHkiLCJ1bmRlZmluZWQiLCJjb2RlIiwiYXJncyJdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7Ozs7O0FBU0E7Ozs7Ozs7QUFFQTs7OztBQUlPLE1BQU1BLE1BQU0sQ0FBQ0MsVUFBVSxFQUFYLEVBQWVDLFFBQVEsRUFBdkIsS0FBOEI7QUFFN0MsTUFBSSxPQUFPRCxPQUFQLEtBQW1CLFFBQW5CLElBQStCRSxPQUFPQyxJQUFQLENBQVlILE9BQVosRUFBcUJJLE1BQXJCLEtBQWdDLENBQW5FLEVBQXNFO0FBRWxFLFVBQU0scUJBQVNDLHdCQUFULENBQU47QUFDSDs7QUFFRCxPQUFLLElBQUlDLEdBQVQsSUFBZ0JKLE9BQU9DLElBQVAsQ0FBWUYsS0FBWixDQUFoQixFQUFvQztBQUVoQyxRQUFJTSxRQUFRRCxJQUFJRSxLQUFKLENBQVUsR0FBVixFQUFlQyxNQUFmLENBQXNCLENBQUNDLEdBQUQsRUFBTUMsSUFBTixLQUFlO0FBQzdDLGFBQU9ELElBQUlDLElBQUosSUFBWUQsSUFBSUMsSUFBSixDQUFaLEdBQXdCLElBQS9CO0FBQ0gsS0FGVyxFQUVUWCxPQUZTLENBQVo7O0FBSUEsUUFBSSxDQUFDTyxLQUFELElBQVdOLE1BQU1LLEdBQU4sRUFBV00sSUFBWCxJQUFtQixPQUFPTCxLQUFQLEtBQWlCTixNQUFNSyxHQUFOLEVBQVdNLElBQTlELEVBQXFFO0FBRWpFLFlBQU1DLGdCQUFTQyxLQUFULENBQWVDLFNBQWYsRUFBMEIsQ0FBQyxHQUFHLENBQUNkLE1BQU1LLEdBQU4sRUFBV1UsSUFBWixDQUFKLEVBQXVCLElBQUlmLE1BQU1LLEdBQU4sRUFBV1csSUFBWCxHQUFrQmhCLE1BQU1LLEdBQU4sRUFBV1csSUFBN0IsR0FBb0MsRUFBeEMsQ0FBdkIsQ0FBMUIsQ0FBTjtBQUNIO0FBQ0o7QUFDSixDQWxCTSIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogRW5zdXJpbmcgZXhwZWN0ZWQgcGFyYW1ldGVycyBoZWxwZXJcbiAqIFRoaXMgZmlsZSBpdCBpcyBhIHBhcnQgb2YgdGhlIFBhbmRvcmEgUHlycmhhIEphdmFzY3JpcHQgbGlicmFyeVxuICogXG4gKiBAZmlsZSBleHBlY3QuanNcbiAqIEBhdXRob3IgS29zdGlhbnR5biBTbXlybm92IDxrb3N0eXNoQGdtYWlsLmNvbT5cbiAqIEBkYXRlIDIwMThcbiAqL1xuXG4ndXNlIHN0cmljdCc7XG5cbmltcG9ydCBQanNFcnJvciwge1xuICAgIE9QVElPTlNfUkVRVUlSRURcbn0gZnJvbSAnLi9lcnJvcnMnO1xuXG5leHBvcnQgY29uc3QgYWxsID0gKG9wdGlvbnMgPSB7fSwgbW9kZWwgPSB7fSkgPT4ge1xuXG4gICAgaWYgKHR5cGVvZiBvcHRpb25zICE9PSAnb2JqZWN0JyB8fCBPYmplY3Qua2V5cyhvcHRpb25zKS5sZW5ndGggPT09IDApIHtcblxuICAgICAgICB0aHJvdyBQanNFcnJvcihPUFRJT05TX1JFUVVJUkVEKTtcbiAgICB9XG5cbiAgICBmb3IgKGxldCBrZXkgb2YgT2JqZWN0LmtleXMobW9kZWwpKSB7XG5cbiAgICAgICAgbGV0IHZhbHVlID0ga2V5LnNwbGl0KCcuJykucmVkdWNlKChhY2MsIHBhcnQpID0+IHtcbiAgICAgICAgICAgIHJldHVybiBhY2NbcGFydF0gPyBhY2NbcGFydF0gOiBudWxsO1xuICAgICAgICB9LCBvcHRpb25zKTtcblxuICAgICAgICBpZiAoIXZhbHVlIHx8IChtb2RlbFtrZXldLnR5cGUgJiYgdHlwZW9mIHZhbHVlICE9PSBtb2RlbFtrZXldLnR5cGUpKSB7XG5cbiAgICAgICAgICAgIHRocm93IFBqc0Vycm9yLmFwcGx5KHVuZGVmaW5lZCwgWy4uLlttb2RlbFtrZXldLmNvZGVdLCAuLi4obW9kZWxba2V5XS5hcmdzID8gbW9kZWxba2V5XS5hcmdzIDogW10pXSk7XG4gICAgICAgIH1cbiAgICB9XG59O1xuIl19