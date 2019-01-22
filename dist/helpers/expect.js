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
    let memberValue;

    switch (model[key].type) {
      case 'enum':
        if (!model[key].values || !Array.isArray(model[key].values)) {
          throw _errors.default.apply(undefined, [model[key].code || _errors.EXPECT_TYPE_OPTIONS_REQUIRED, key, model[key].type, value, ...(model[key].args ? model[key].args : [undefined])]);
        }

        if (!model[key].values.includes(value)) {
          throw _errors.default.apply(undefined, [model[key].code || _errors.WRONG_TYPE, key, model[key].type, value, ...(model[key].args ? model[key].args : [undefined])]);
        }

        break;

      case 'address':
        if (!new RegExp('^0x[a-fA-F0-9]{40}$').test(value)) {
          throw _errors.default.apply(undefined, [model[key].code || _errors.ADDRESS_REQUIRED, key, model[key].type, value, ...(model[key].args ? model[key].args : [undefined])]);
        }

        break;

      case 'member':
        if (!model[key].provider || typeof model[key].provider !== 'object') {
          throw _errors.default.apply(undefined, [model[key].code || `Provider object must be defined as "provider" model option for "${key}"`, key, model[key].type, value, ...(model[key].args ? model[key].args : [undefined])]);
        }

        memberValue = value.split('.').reduce((acc, part) => {
          return acc && acc[part] !== undefined ? acc[part] : null;
        }, model[key].provider);

        if (!memberValue) {
          throw _errors.default.apply(undefined, [model[key].code || _errors.EXPECT_NOT_A_MEMBER, key, model[key].type, value, ...(model[key].args ? model[key].args : [undefined])]);
        }

        break;

      default:
        if (typeof value !== model[key].type && (model[key].required === true || model[key].required === undefined)) {
          throw _errors.default.apply(undefined, [model[key].code || _errors.WRONG_TYPE, key, model[key].type, value, ...(model[key].args ? model[key].args : [undefined])]);
        }

    }
  }
};

exports.all = all;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9oZWxwZXJzL2V4cGVjdC5qcyJdLCJuYW1lcyI6WyJhbGwiLCJvcHRpb25zIiwibW9kZWwiLCJPYmplY3QiLCJrZXlzIiwibGVuZ3RoIiwiT1BUSU9OU19SRVFVSVJFRCIsImtleSIsInZhbHVlIiwic3BsaXQiLCJyZWR1Y2UiLCJhY2MiLCJwYXJ0IiwidW5kZWZpbmVkIiwibWVtYmVyVmFsdWUiLCJ0eXBlIiwidmFsdWVzIiwiQXJyYXkiLCJpc0FycmF5IiwiUGpzRXJyb3IiLCJhcHBseSIsImNvZGUiLCJFWFBFQ1RfVFlQRV9PUFRJT05TX1JFUVVJUkVEIiwiYXJncyIsImluY2x1ZGVzIiwiV1JPTkdfVFlQRSIsIlJlZ0V4cCIsInRlc3QiLCJBRERSRVNTX1JFUVVJUkVEIiwicHJvdmlkZXIiLCJFWFBFQ1RfTk9UX0FfTUVNQkVSIiwicmVxdWlyZWQiXSwibWFwcGluZ3MiOiJBQUFBOzs7Ozs7OztBQVNBOzs7Ozs7O0FBRUE7Ozs7QUFRTyxNQUFNQSxHQUFHLEdBQUcsQ0FBQ0MsT0FBTyxHQUFHLEVBQVgsRUFBZUMsS0FBSyxHQUFHLEVBQXZCLEtBQThCO0FBRTdDLE1BQUksT0FBT0QsT0FBUCxLQUFtQixRQUFuQixJQUErQkUsTUFBTSxDQUFDQyxJQUFQLENBQVlILE9BQVosRUFBcUJJLE1BQXJCLEtBQWdDLENBQW5FLEVBQXNFO0FBRWxFLFVBQU0scUJBQVNDLHdCQUFULENBQU47QUFDSDs7QUFFRCxPQUFLLElBQUlDLEdBQVQsSUFBZ0JKLE1BQU0sQ0FBQ0MsSUFBUCxDQUFZRixLQUFaLENBQWhCLEVBQW9DO0FBRWhDLFFBQUlNLEtBQUssR0FBR0QsR0FBRyxDQUFDRSxLQUFKLENBQVUsR0FBVixFQUFlQyxNQUFmLENBQXNCLENBQUNDLEdBQUQsRUFBTUMsSUFBTixLQUFlO0FBQzdDLGFBQU9ELEdBQUcsQ0FBQ0MsSUFBRCxDQUFILEtBQWNDLFNBQWQsR0FBMEJGLEdBQUcsQ0FBQ0MsSUFBRCxDQUE3QixHQUFzQyxJQUE3QztBQUNI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S0FBSyxDQUFDSyxHQUFELENBQUwsQ0FBV2dCLElBQTdCLEdBQW9DLENBQUNWLFNBQUQsQ0FBeEMsQ0FMNEIsQ0FBMUIsQ0FBTjtBQU9IOztBQXBGVDtBQXNGSDtBQUNKLENBdEdNIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBFbnN1cmluZyBleHBlY3RlZCBwYXJhbWV0ZXJzIGhlbHBlclxuICogVGhpcyBmaWxlIGl0IGlzIGEgcGFydCBvZiB0aGUgUGFuZG9yYSBQeXJyaGEgSmF2YXNjcmlwdCBsaWJyYXJ5XG4gKiBcbiAqIEBmaWxlIGV4cGVjdC5qc1xuICogQGF1dGhvciBLb3N0aWFudHluIFNteXJub3YgPGtvc3R5c2hAZ21haWwuY29tPlxuICogQGRhdGUgMjAxOFxuICovXG5cbid1c2Ugc3RyaWN0JztcblxuaW1wb3J0IFBqc0Vycm9yLCB7XG4gICAgT1BUSU9OU19SRVFVSVJFRCxcbiAgICBXUk9OR19UWVBFLFxuICAgIEFERFJFU1NfUkVRVUlSRUQsXG4gICAgRVhQRUNUX05PVF9BX01FTUJFUixcbiAgICBFWFBFQ1RfVFlQRV9PUFRJT05TX1JFUVVJUkVEXG59IGZyb20gJy4vZXJyb3JzJztcblxuZXhwb3J0IGNvbnN0IGFsbCA9IChvcHRpb25zID0ge30sIG1vZGVsID0ge30pID0+IHtcblxuICAgIGlmICh0eXBlb2Ygb3B0aW9ucyAhPT0gJ29iamVjdCcgfHwgT2JqZWN0LmtleXMob3B0aW9ucykubGVuZ3RoID09PSAwKSB7XG5cbiAgICAgICAgdGhyb3cgUGpzRXJyb3IoT1BUSU9OU19SRVFVSVJFRCk7XG4gICAgfVxuXG4gICAgZm9yIChsZXQga2V5IG9mIE9iamVjdC5rZXlzKG1vZGVsKSkge1xuXG4gICAgICAgIGxldCB2YWx1ZSA9IGtleS5zcGxpdCgnLicpLnJlZHVjZSgoYWNjLCBwYXJ0KSA9PiB7XG4gICAgICAgICAgICByZXR1cm4gYWNjW3BhcnRdICE9PSB1bmRlZmluZWQgPyBhY2NbcGFydF0gOiBudWxsO1xuICAgICAgICB9LCBvcHRpb25zKTtcblxuICAgICAgICBsZXQgbWVtYmVyVmFsdWU7XG5cbiAgICAgICAgc3dpdGNoIChtb2RlbFtrZXldLnR5cGUpIHtcbiAgICAgICAgICAgIGNhc2UgJ2VudW0nOlxuXG4gICAgICAgICAgICAgICAgaWYgKCFtb2RlbFtrZXldLnZhbHVlcyB8fCAhQXJyYXkuaXNBcnJheShtb2RlbFtrZXldLnZhbHVlcykpIHtcblxuICAgICAgICAgICAgICAgICAgICB0aHJvdyBQanNFcnJvci5hcHBseSh1bmRlZmluZWQsIFtcbiAgICAgICAgICAgICAgICAgICAgICAgIG1vZGVsW2tleV0uY29kZSB8fCBFWFBFQ1RfVFlQRV9PUFRJT05TX1JFUVVJUkVELCBcbiAgICAgICAgICAgICAgICAgICAgICAgIGtleSwgXG4gICAgICAgICAgICAgICAgICAgICAgICBtb2RlbFtrZXldLnR5cGUsXG4gICAgICAgICAgICAgICAgICAgICAgICB2YWx1ZSxcbiAgICAgICAgICAgICAgICAgICAgICAgIC4uLihtb2RlbFtrZXldLmFyZ3MgPyBtb2RlbFtrZXldLmFyZ3MgOiBbdW5kZWZpbmVkXSlcbiAgICAgICAgICAgICAgICAgICAgXSk7XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgaWYgKCFtb2RlbFtrZXldLnZhbHVlcy5pbmNsdWRlcyh2YWx1ZSkpIHtcblxuICAgICAgICAgICAgICAgICAgICB0aHJvdyBQanNFcnJvci5hcHBseSh1bmRlZmluZWQsIFtcbiAgICAgICAgICAgICAgICAgICAgICAgIG1vZGVsW2tleV0uY29kZSB8fCBXUk9OR19UWVBFLCBcbiAgICAgICAgICAgICAgICAgICAgICAgIGtleSwgXG4gICAgICAgICAgICAgICAgICAgICAgICBtb2RlbFtrZXldLnR5cGUsXG4gICAgICAgICAgICAgICAgICAgICAgICB2YWx1ZSxcbiAgICAgICAgICAgICAgICAgICAgICAgIC4uLihtb2RlbFtrZXldLmFyZ3MgPyBtb2RlbFtrZXldLmFyZ3MgOiBbdW5kZWZpbmVkXSlcbiAgICAgICAgICAgICAgICAgICAgXSk7XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgYnJlYWs7XG5cbiAgICAgICAgICAgIGNhc2UgJ2FkZHJlc3MnOlxuXG4gICAgICAgICAgICAgICAgaWYgKCFuZXcgUmVnRXhwKCdeMHhbYS1mQS1GMC05XXs0MH0kJykudGVzdCh2YWx1ZSkpIHtcblxuICAgICAgICAgICAgICAgICAgICB0aHJvdyBQanNFcnJvci5hcHBseSh1bmRlZmluZWQsIFtcbiAgICAgICAgICAgICAgICAgICAgICAgIG1vZGVsW2tleV0uY29kZSB8fCBBRERSRVNTX1JFUVVJUkVELCBcbiAgICAgICAgICAgICAgICAgICAgICAgIGtleSwgXG4gICAgICAgICAgICAgICAgICAgICAgICBtb2RlbFtrZXldLnR5cGUsIFxuICAgICAgICAgICAgICAgICAgICAgICAgdmFsdWUsXG4gICAgICAgICAgICAgICAgICAgICAgICAuLi4obW9kZWxba2V5XS5hcmdzID8gbW9kZWxba2V5XS5hcmdzIDogW3VuZGVmaW5lZF0pXG4gICAgICAgICAgICAgICAgICAgIF0pO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIGJyZWFrO1xuXG4gICAgICAgICAgICBjYXNlICdtZW1iZXInOlxuICAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgICAgIGlmICghbW9kZWxba2V5XS5wcm92aWRlciB8fCB0eXBlb2YgbW9kZWxba2V5XS5wcm92aWRlciAhPT0gJ29iamVjdCcpIHtcblxuICAgICAgICAgICAgICAgICAgICB0aHJvdyBQanNFcnJvci5hcHBseSh1bmRlZmluZWQsIFtcbiAgICAgICAgICAgICAgICAgICAgICAgIG1vZGVsW2tleV0uY29kZSB8fCBgUHJvdmlkZXIgb2JqZWN0IG11c3QgYmUgZGVmaW5lZCBhcyBcInByb3ZpZGVyXCIgbW9kZWwgb3B0aW9uIGZvciBcIiR7a2V5fVwiYCwgXG4gICAgICAgICAgICAgICAgICAgICAgICBrZXksIFxuICAgICAgICAgICAgICAgICAgICAgICAgbW9kZWxba2V5XS50eXBlLCBcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhbHVlLFxuICAgICAgICAgICAgICAgICAgICAgICAgLi4uKG1vZGVsW2tleV0uYXJncyA/IG1vZGVsW2tleV0uYXJncyA6IFt1bmRlZmluZWRdKVxuICAgICAgICAgICAgICAgICAgICBdKTtcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICBtZW1iZXJWYWx1ZSA9IHZhbHVlLnNwbGl0KCcuJykucmVkdWNlKChhY2MsIHBhcnQpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGFjYyAmJiBhY2NbcGFydF0gIT09IHVuZGVmaW5lZCA/IGFjY1twYXJ0XSA6IG51bGw7XG4gICAgICAgICAgICAgICAgfSwgbW9kZWxba2V5XS5wcm92aWRlcik7XG5cbiAgICAgICAgICAgICAgICBpZiAoIW1lbWJlclZhbHVlKSB7XG5cbiAgICAgICAgICAgICAgICAgICAgdGhyb3cgUGpzRXJyb3IuYXBwbHkodW5kZWZpbmVkLCBbXG4gICAgICAgICAgICAgICAgICAgICAgICBtb2RlbFtrZXldLmNvZGUgfHwgRVhQRUNUX05PVF9BX01FTUJFUiwgXG4gICAgICAgICAgICAgICAgICAgICAgICBrZXksIFxuICAgICAgICAgICAgICAgICAgICAgICAgbW9kZWxba2V5XS50eXBlLCBcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhbHVlLFxuICAgICAgICAgICAgICAgICAgICAgICAgLi4uKG1vZGVsW2tleV0uYXJncyA/IG1vZGVsW2tleV0uYXJncyA6IFt1bmRlZmluZWRdKVxuICAgICAgICAgICAgICAgICAgICBdKTtcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICBicmVhaztcblxuICAgICAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgICAgICBpZiAodHlwZW9mIHZhbHVlICE9PSBtb2RlbFtrZXldLnR5cGUgJiYgXG4gICAgICAgICAgICAgICAgICAgIChtb2RlbFtrZXldLnJlcXVpcmVkID09PSB0cnVlIHx8IG1vZGVsW2tleV0ucmVxdWlyZWQgPT09IHVuZGVmaW5lZCkpIHtcblxuICAgICAgICAgICAgICAgICAgICB0aHJvdyBQanNFcnJvci5hcHBseSh1bmRlZmluZWQsIFtcbiAgICAgICAgICAgICAgICAgICAgICAgIG1vZGVsW2tleV0uY29kZSB8fCBXUk9OR19UWVBFLCBcbiAgICAgICAgICAgICAgICAgICAgICAgIGtleSwgXG4gICAgICAgICAgICAgICAgICAgICAgICBtb2RlbFtrZXldLnR5cGUsIFxuICAgICAgICAgICAgICAgICAgICAgICAgdmFsdWUsXG4gICAgICAgICAgICAgICAgICAgICAgICAuLi4obW9kZWxba2V5XS5hcmdzID8gbW9kZWxba2V5XS5hcmdzIDogW3VuZGVmaW5lZF0pXG4gICAgICAgICAgICAgICAgICAgIF0pO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgfSAgICAgICAgXG4gICAgfVxufTtcbiJdfQ==