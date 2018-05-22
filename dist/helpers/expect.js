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
      return acc[part] !== undefined ? acc[part] : null;
    }, options);

    if (model[key].type && model[key].type === 'address' && !new RegExp('^0x[a-fA-F0-9]{40}$').test(value)) {
      throw _errors.default.apply(undefined, [model[key].code || _errors.ADDRESS_REQUIRED, key, model[key].type, value, ...(model[key].args ? model[key].args : [undefined])]);
    }

    if (model[key].type && model[key].type !== 'address' && typeof value !== model[key].type) {
      throw _errors.default.apply(undefined, [model[key].code || _errors.WRONG_TYPE, key, model[key].type, value, ...(model[key].args ? model[key].args : [undefined])]);
    }
  }
};

exports.all = all;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9oZWxwZXJzL2V4cGVjdC5qcyJdLCJuYW1lcyI6WyJhbGwiLCJvcHRpb25zIiwibW9kZWwiLCJPYmplY3QiLCJrZXlzIiwibGVuZ3RoIiwiT1BUSU9OU19SRVFVSVJFRCIsImtleSIsInZhbHVlIiwic3BsaXQiLCJyZWR1Y2UiLCJhY2MiLCJwYXJ0IiwidW5kZWZpbmVkIiwidHlwZSIsIlJlZ0V4cCIsInRlc3QiLCJQanNFcnJvciIsImFwcGx5IiwiY29kZSIsIkFERFJFU1NfUkVRVUlSRUQiLCJhcmdzIiwiV1JPTkdfVFlQRSJdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7Ozs7O0FBU0E7Ozs7Ozs7QUFFQTs7OztBQU1PLE1BQU1BLE1BQU0sQ0FBQ0MsVUFBVSxFQUFYLEVBQWVDLFFBQVEsRUFBdkIsS0FBOEI7QUFFN0MsTUFBSSxPQUFPRCxPQUFQLEtBQW1CLFFBQW5CLElBQStCRSxPQUFPQyxJQUFQLENBQVlILE9BQVosRUFBcUJJLE1BQXJCLEtBQWdDLENBQW5FLEVBQXNFO0FBRWxFLFVBQU0scUJBQVNDLHdCQUFULENBQU47QUFDSDs7QUFFRCxPQUFLLElBQUlDLEdBQVQsSUFBZ0JKLE9BQU9DLElBQVAsQ0FBWUYsS0FBWixDQUFoQixFQUFvQztBQUVoQyxRQUFJTSxRQUFRRCxJQUFJRSxLQUFKLENBQVUsR0FBVixFQUFlQyxNQUFmLENBQXNCLENBQUNDLEdBQUQsRUFBTUMsSUFBTixLQUFlO0FBQzdDLGFBQU9ELElBQUlDLElBQUosTUFBY0MsU0FBZCxHQUEwQkYsSUFBSUMsSUFBSixDQUExQixHQUFzQyxJQUE3QztBQUNILEtBRlcsRUFFVFgsT0FGUyxDQUFaOztBQUlBLFFBQUlDLE1BQU1LLEdBQU4sRUFBV08sSUFBWCxJQUFtQlosTUFBTUssR0FBTixFQUFXTyxJQUFYLEtBQW9CLFNBQXZDLElBQW9ELENBQUUsSUFBSUMsTUFBSixDQUFXLHFCQUFYLEVBQWtDQyxJQUFsQyxDQUF1Q1IsS0FBdkMsQ0FBMUQsRUFBMEc7QUFFdEcsWUFBTVMsZ0JBQVNDLEtBQVQsQ0FBZUwsU0FBZixFQUEwQixDQUM1QlgsTUFBTUssR0FBTixFQUFXWSxJQUFYLElBQW1CQyx3QkFEUyxFQUU1QmIsR0FGNEIsRUFHNUJMLE1BQU1LLEdBQU4sRUFBV08sSUFIaUIsRUFJNUJOLEtBSjRCLEVBSzVCLElBQUlOLE1BQU1LLEdBQU4sRUFBV2MsSUFBWCxHQUFrQm5CLE1BQU1LLEdBQU4sRUFBV2MsSUFBN0IsR0FBb0MsQ0FBQ1IsU0FBRCxDQUF4QyxDQUw0QixDQUExQixDQUFOO0FBT0g7O0FBRUQsUUFBSVgsTUFBTUssR0FBTixFQUFXTyxJQUFYLElBQW1CWixNQUFNSyxHQUFOLEVBQVdPLElBQVgsS0FBb0IsU0FBdkMsSUFBb0QsT0FBT04sS0FBUCxLQUFpQk4sTUFBTUssR0FBTixFQUFXTyxJQUFwRixFQUEwRjtBQUV0RixZQUFNRyxnQkFBU0MsS0FBVCxDQUFlTCxTQUFmLEVBQTBCLENBQzVCWCxNQUFNSyxHQUFOLEVBQVdZLElBQVgsSUFBbUJHLGtCQURTLEVBRTVCZixHQUY0QixFQUc1QkwsTUFBTUssR0FBTixFQUFXTyxJQUhpQixFQUk1Qk4sS0FKNEIsRUFLNUIsSUFBSU4sTUFBTUssR0FBTixFQUFXYyxJQUFYLEdBQWtCbkIsTUFBTUssR0FBTixFQUFXYyxJQUE3QixHQUFvQyxDQUFDUixTQUFELENBQXhDLENBTDRCLENBQTFCLENBQU47QUFPSDtBQUNKO0FBQ0osQ0FuQ00iLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIEVuc3VyaW5nIGV4cGVjdGVkIHBhcmFtZXRlcnMgaGVscGVyXG4gKiBUaGlzIGZpbGUgaXQgaXMgYSBwYXJ0IG9mIHRoZSBQYW5kb3JhIFB5cnJoYSBKYXZhc2NyaXB0IGxpYnJhcnlcbiAqIFxuICogQGZpbGUgZXhwZWN0LmpzXG4gKiBAYXV0aG9yIEtvc3RpYW50eW4gU215cm5vdiA8a29zdHlzaEBnbWFpbC5jb20+XG4gKiBAZGF0ZSAyMDE4XG4gKi9cblxuJ3VzZSBzdHJpY3QnO1xuXG5pbXBvcnQgUGpzRXJyb3IsIHtcbiAgICBPUFRJT05TX1JFUVVJUkVELFxuICAgIFdST05HX1RZUEUsXG4gICAgQUREUkVTU19SRVFVSVJFRFxufSBmcm9tICcuL2Vycm9ycyc7XG5cbmV4cG9ydCBjb25zdCBhbGwgPSAob3B0aW9ucyA9IHt9LCBtb2RlbCA9IHt9KSA9PiB7XG5cbiAgICBpZiAodHlwZW9mIG9wdGlvbnMgIT09ICdvYmplY3QnIHx8IE9iamVjdC5rZXlzKG9wdGlvbnMpLmxlbmd0aCA9PT0gMCkge1xuXG4gICAgICAgIHRocm93IFBqc0Vycm9yKE9QVElPTlNfUkVRVUlSRUQpO1xuICAgIH1cblxuICAgIGZvciAobGV0IGtleSBvZiBPYmplY3Qua2V5cyhtb2RlbCkpIHtcblxuICAgICAgICBsZXQgdmFsdWUgPSBrZXkuc3BsaXQoJy4nKS5yZWR1Y2UoKGFjYywgcGFydCkgPT4ge1xuICAgICAgICAgICAgcmV0dXJuIGFjY1twYXJ0XSAhPT0gdW5kZWZpbmVkID8gYWNjW3BhcnRdIDogbnVsbDtcbiAgICAgICAgfSwgb3B0aW9ucyk7XG5cbiAgICAgICAgaWYgKG1vZGVsW2tleV0udHlwZSAmJiBtb2RlbFtrZXldLnR5cGUgPT09ICdhZGRyZXNzJyAmJiAhKG5ldyBSZWdFeHAoJ14weFthLWZBLUYwLTldezQwfSQnKS50ZXN0KHZhbHVlKSkpIHtcblxuICAgICAgICAgICAgdGhyb3cgUGpzRXJyb3IuYXBwbHkodW5kZWZpbmVkLCBbXG4gICAgICAgICAgICAgICAgbW9kZWxba2V5XS5jb2RlIHx8IEFERFJFU1NfUkVRVUlSRUQsIFxuICAgICAgICAgICAgICAgIGtleSwgXG4gICAgICAgICAgICAgICAgbW9kZWxba2V5XS50eXBlLCBcbiAgICAgICAgICAgICAgICB2YWx1ZSxcbiAgICAgICAgICAgICAgICAuLi4obW9kZWxba2V5XS5hcmdzID8gbW9kZWxba2V5XS5hcmdzIDogW3VuZGVmaW5lZF0pXG4gICAgICAgICAgICBdKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChtb2RlbFtrZXldLnR5cGUgJiYgbW9kZWxba2V5XS50eXBlICE9PSAnYWRkcmVzcycgJiYgdHlwZW9mIHZhbHVlICE9PSBtb2RlbFtrZXldLnR5cGUpIHtcblxuICAgICAgICAgICAgdGhyb3cgUGpzRXJyb3IuYXBwbHkodW5kZWZpbmVkLCBbXG4gICAgICAgICAgICAgICAgbW9kZWxba2V5XS5jb2RlIHx8IFdST05HX1RZUEUsIFxuICAgICAgICAgICAgICAgIGtleSwgXG4gICAgICAgICAgICAgICAgbW9kZWxba2V5XS50eXBlLCBcbiAgICAgICAgICAgICAgICB2YWx1ZSxcbiAgICAgICAgICAgICAgICAuLi4obW9kZWxba2V5XS5hcmdzID8gbW9kZWxba2V5XS5hcmdzIDogW3VuZGVmaW5lZF0pXG4gICAgICAgICAgICBdKTtcbiAgICAgICAgfVxuICAgIH1cbn07XG4iXX0=