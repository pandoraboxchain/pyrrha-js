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

    if (model[key].type && model[key].type === 'address' && !new RegExp('^0x[a-fA-F0-9]{40}$').test(value)) {
      throw _errors.default.apply(undefined, [model[key].code || _errors.ADDRESS_REQUIRED, key, model[key].type, value, ...(model[key].args ? model[key].args : [undefined])]);
    }

    if (!value || model[key].type && model[key].type !== 'address' && typeof value !== model[key].type) {
      throw _errors.default.apply(undefined, [model[key].code || _errors.WRONG_TYPE, key, model[key].type, value, ...(model[key].args ? model[key].args : [undefined])]);
    }
  }
};

exports.all = all;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9oZWxwZXJzL2V4cGVjdC5qcyJdLCJuYW1lcyI6WyJhbGwiLCJvcHRpb25zIiwibW9kZWwiLCJPYmplY3QiLCJrZXlzIiwibGVuZ3RoIiwiT1BUSU9OU19SRVFVSVJFRCIsImtleSIsInZhbHVlIiwic3BsaXQiLCJyZWR1Y2UiLCJhY2MiLCJwYXJ0IiwidHlwZSIsIlJlZ0V4cCIsInRlc3QiLCJQanNFcnJvciIsImFwcGx5IiwidW5kZWZpbmVkIiwiY29kZSIsIkFERFJFU1NfUkVRVUlSRUQiLCJhcmdzIiwiV1JPTkdfVFlQRSJdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7Ozs7O0FBU0E7Ozs7Ozs7QUFFQTs7OztBQU1PLE1BQU1BLE1BQU0sQ0FBQ0MsVUFBVSxFQUFYLEVBQWVDLFFBQVEsRUFBdkIsS0FBOEI7QUFFN0MsTUFBSSxPQUFPRCxPQUFQLEtBQW1CLFFBQW5CLElBQStCRSxPQUFPQyxJQUFQLENBQVlILE9BQVosRUFBcUJJLE1BQXJCLEtBQWdDLENBQW5FLEVBQXNFO0FBRWxFLFVBQU0scUJBQVNDLHdCQUFULENBQU47QUFDSDs7QUFFRCxPQUFLLElBQUlDLEdBQVQsSUFBZ0JKLE9BQU9DLElBQVAsQ0FBWUYsS0FBWixDQUFoQixFQUFvQztBQUVoQyxRQUFJTSxRQUFRRCxJQUFJRSxLQUFKLENBQVUsR0FBVixFQUFlQyxNQUFmLENBQXNCLENBQUNDLEdBQUQsRUFBTUMsSUFBTixLQUFlO0FBQzdDLGFBQU9ELElBQUlDLElBQUosSUFBWUQsSUFBSUMsSUFBSixDQUFaLEdBQXdCLElBQS9CO0FBQ0gsS0FGVyxFQUVUWCxPQUZTLENBQVo7O0FBSUEsUUFBSUMsTUFBTUssR0FBTixFQUFXTSxJQUFYLElBQW1CWCxNQUFNSyxHQUFOLEVBQVdNLElBQVgsS0FBb0IsU0FBdkMsSUFBb0QsQ0FBRSxJQUFJQyxNQUFKLENBQVcscUJBQVgsRUFBa0NDLElBQWxDLENBQXVDUCxLQUF2QyxDQUExRCxFQUEwRztBQUV0RyxZQUFNUSxnQkFBU0MsS0FBVCxDQUFlQyxTQUFmLEVBQTBCLENBQzVCaEIsTUFBTUssR0FBTixFQUFXWSxJQUFYLElBQW1CQyx3QkFEUyxFQUU1QmIsR0FGNEIsRUFHNUJMLE1BQU1LLEdBQU4sRUFBV00sSUFIaUIsRUFJNUJMLEtBSjRCLEVBSzVCLElBQUlOLE1BQU1LLEdBQU4sRUFBV2MsSUFBWCxHQUFrQm5CLE1BQU1LLEdBQU4sRUFBV2MsSUFBN0IsR0FBb0MsQ0FBQ0gsU0FBRCxDQUF4QyxDQUw0QixDQUExQixDQUFOO0FBT0g7O0FBRUQsUUFBSSxDQUFDVixLQUFELElBQVdOLE1BQU1LLEdBQU4sRUFBV00sSUFBWCxJQUFtQlgsTUFBTUssR0FBTixFQUFXTSxJQUFYLEtBQW9CLFNBQXZDLElBQW9ELE9BQU9MLEtBQVAsS0FBaUJOLE1BQU1LLEdBQU4sRUFBV00sSUFBL0YsRUFBc0c7QUFFbEcsWUFBTUcsZ0JBQVNDLEtBQVQsQ0FBZUMsU0FBZixFQUEwQixDQUM1QmhCLE1BQU1LLEdBQU4sRUFBV1ksSUFBWCxJQUFtQkcsa0JBRFMsRUFFNUJmLEdBRjRCLEVBRzVCTCxNQUFNSyxHQUFOLEVBQVdNLElBSGlCLEVBSTVCTCxLQUo0QixFQUs1QixJQUFJTixNQUFNSyxHQUFOLEVBQVdjLElBQVgsR0FBa0JuQixNQUFNSyxHQUFOLEVBQVdjLElBQTdCLEdBQW9DLENBQUNILFNBQUQsQ0FBeEMsQ0FMNEIsQ0FBMUIsQ0FBTjtBQU9IO0FBQ0o7QUFDSixDQW5DTSIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogRW5zdXJpbmcgZXhwZWN0ZWQgcGFyYW1ldGVycyBoZWxwZXJcbiAqIFRoaXMgZmlsZSBpdCBpcyBhIHBhcnQgb2YgdGhlIFBhbmRvcmEgUHlycmhhIEphdmFzY3JpcHQgbGlicmFyeVxuICogXG4gKiBAZmlsZSBleHBlY3QuanNcbiAqIEBhdXRob3IgS29zdGlhbnR5biBTbXlybm92IDxrb3N0eXNoQGdtYWlsLmNvbT5cbiAqIEBkYXRlIDIwMThcbiAqL1xuXG4ndXNlIHN0cmljdCc7XG5cbmltcG9ydCBQanNFcnJvciwge1xuICAgIE9QVElPTlNfUkVRVUlSRUQsXG4gICAgV1JPTkdfVFlQRSxcbiAgICBBRERSRVNTX1JFUVVJUkVEXG59IGZyb20gJy4vZXJyb3JzJztcblxuZXhwb3J0IGNvbnN0IGFsbCA9IChvcHRpb25zID0ge30sIG1vZGVsID0ge30pID0+IHtcblxuICAgIGlmICh0eXBlb2Ygb3B0aW9ucyAhPT0gJ29iamVjdCcgfHwgT2JqZWN0LmtleXMob3B0aW9ucykubGVuZ3RoID09PSAwKSB7XG5cbiAgICAgICAgdGhyb3cgUGpzRXJyb3IoT1BUSU9OU19SRVFVSVJFRCk7XG4gICAgfVxuXG4gICAgZm9yIChsZXQga2V5IG9mIE9iamVjdC5rZXlzKG1vZGVsKSkge1xuXG4gICAgICAgIGxldCB2YWx1ZSA9IGtleS5zcGxpdCgnLicpLnJlZHVjZSgoYWNjLCBwYXJ0KSA9PiB7XG4gICAgICAgICAgICByZXR1cm4gYWNjW3BhcnRdID8gYWNjW3BhcnRdIDogbnVsbDtcbiAgICAgICAgfSwgb3B0aW9ucyk7XG5cbiAgICAgICAgaWYgKG1vZGVsW2tleV0udHlwZSAmJiBtb2RlbFtrZXldLnR5cGUgPT09ICdhZGRyZXNzJyAmJiAhKG5ldyBSZWdFeHAoJ14weFthLWZBLUYwLTldezQwfSQnKS50ZXN0KHZhbHVlKSkpIHtcblxuICAgICAgICAgICAgdGhyb3cgUGpzRXJyb3IuYXBwbHkodW5kZWZpbmVkLCBbXG4gICAgICAgICAgICAgICAgbW9kZWxba2V5XS5jb2RlIHx8IEFERFJFU1NfUkVRVUlSRUQsIFxuICAgICAgICAgICAgICAgIGtleSwgXG4gICAgICAgICAgICAgICAgbW9kZWxba2V5XS50eXBlLCBcbiAgICAgICAgICAgICAgICB2YWx1ZSxcbiAgICAgICAgICAgICAgICAuLi4obW9kZWxba2V5XS5hcmdzID8gbW9kZWxba2V5XS5hcmdzIDogW3VuZGVmaW5lZF0pXG4gICAgICAgICAgICBdKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmICghdmFsdWUgfHwgKG1vZGVsW2tleV0udHlwZSAmJiBtb2RlbFtrZXldLnR5cGUgIT09ICdhZGRyZXNzJyAmJiB0eXBlb2YgdmFsdWUgIT09IG1vZGVsW2tleV0udHlwZSkpIHtcblxuICAgICAgICAgICAgdGhyb3cgUGpzRXJyb3IuYXBwbHkodW5kZWZpbmVkLCBbXG4gICAgICAgICAgICAgICAgbW9kZWxba2V5XS5jb2RlIHx8IFdST05HX1RZUEUsIFxuICAgICAgICAgICAgICAgIGtleSwgXG4gICAgICAgICAgICAgICAgbW9kZWxba2V5XS50eXBlLCBcbiAgICAgICAgICAgICAgICB2YWx1ZSxcbiAgICAgICAgICAgICAgICAuLi4obW9kZWxba2V5XS5hcmdzID8gbW9kZWxba2V5XS5hcmdzIDogW3VuZGVmaW5lZF0pXG4gICAgICAgICAgICBdKTtcbiAgICAgICAgfVxuICAgIH1cbn07XG4iXX0=