/**
 * Errors definition and helpers
 * This file it is a part of the Pandora Pyrrha Javascript library
 * 
 * @file errors.js
 * @author Kostiantyn Smyrnov <kostysh@gmail.com>
 * @date 2018
 */
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.EXPECT_TYPE_OPTIONS_REQUIRED = exports.EXPECT_NOT_A_MEMBER = exports.FAILURE_EVENT = exports.TRANSACTION_UNSUCCESSFUL = exports.WEB3_METAMASK_REQUIRED = exports.IPFS_NOT_CONNECTED = exports.IPFS_REQUIRED = exports.CONTRACT_REQUIRED = exports.WEB3_NOT_CONNECTED = exports.WEB3_REQUIRED = exports.ADDRESS_REQUIRED = exports.WRONG_TYPE = exports.OPTIONS_REQUIRED = void 0;
const OPTIONS_REQUIRED = 'OPTIONS_REQUIRED';
exports.OPTIONS_REQUIRED = OPTIONS_REQUIRED;
const WRONG_TYPE = 'WRONG_TYPE';
exports.WRONG_TYPE = WRONG_TYPE;
const ADDRESS_REQUIRED = 'ADDRESS_REQUIRED';
exports.ADDRESS_REQUIRED = ADDRESS_REQUIRED;
const WEB3_REQUIRED = 'WEB3_REQUIRED';
exports.WEB3_REQUIRED = WEB3_REQUIRED;
const WEB3_NOT_CONNECTED = 'WEB3_NOT_CONNECTED';
exports.WEB3_NOT_CONNECTED = WEB3_NOT_CONNECTED;
const CONTRACT_REQUIRED = 'CONTRACT_REQUIRED';
exports.CONTRACT_REQUIRED = CONTRACT_REQUIRED;
const IPFS_REQUIRED = 'IPFS_REQUIRED';
exports.IPFS_REQUIRED = IPFS_REQUIRED;
const IPFS_NOT_CONNECTED = 'IPFS_NOT_CONNECTED';
exports.IPFS_NOT_CONNECTED = IPFS_NOT_CONNECTED;
const WEB3_METAMASK_REQUIRED = 'WEB3_METAMASK_REQUIRED';
exports.WEB3_METAMASK_REQUIRED = WEB3_METAMASK_REQUIRED;
const TRANSACTION_UNSUCCESSFUL = 'TRANSACTION_UNSUCCESSFUL';
exports.TRANSACTION_UNSUCCESSFUL = TRANSACTION_UNSUCCESSFUL;
const FAILURE_EVENT = 'FAILURE_EVENT';
exports.FAILURE_EVENT = FAILURE_EVENT;
const EXPECT_NOT_A_MEMBER = 'EXPECT_NOT_A_MEMBER';
exports.EXPECT_NOT_A_MEMBER = EXPECT_NOT_A_MEMBER;
const EXPECT_TYPE_OPTIONS_REQUIRED = 'EXPECT_TYPE_OPTIONS_REQUIRED';
exports.EXPECT_TYPE_OPTIONS_REQUIRED = EXPECT_TYPE_OPTIONS_REQUIRED;

var _default = (code, key, type, value, ...args) => {
  let message = 'Unknown error';

  switch (code) {
    case OPTIONS_REQUIRED:
      message = 'Config options is required and expected to be an object';
      break;

    case WRONG_TYPE:
      message = `Wrong property type. Expected '${key}' to be: '${type}', but got: '${value}'`;
      break;

    case WEB3_REQUIRED:
      message = 'Web3 API required';
      break;

    case WEB3_NOT_CONNECTED:
      message = 'Web3 not connected to provider';
      break;

    case WEB3_METAMASK_REQUIRED:
      message = 'MetaMask is required to perform this operation';
      break;

    case CONTRACT_REQUIRED:
      message = `Contract '${args[0]}' is required`;
      break;

    case ADDRESS_REQUIRED:
      message = `Address of '${args[0] || key}' is required. Wrong ethereum address: ${value}`;
      break;

    case IPFS_REQUIRED:
      message = 'IPFS API required';
      break;

    case IPFS_NOT_CONNECTED:
      message = 'No connection to IPFS server';
      break;

    case TRANSACTION_UNSUCCESSFUL:
      message = 'Transaction was unsuccessful';
      break;

    case FAILURE_EVENT:
      message = 'Contract returns an failure event';
      break;
  }

  const err = new Error(message);
  err.code = code || 'UNKNOWN';
  err.args = args;
  return err;
};

exports.default = _default;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9oZWxwZXJzL2Vycm9ycy5qcyJdLCJuYW1lcyI6WyJPUFRJT05TX1JFUVVJUkVEIiwiV1JPTkdfVFlQRSIsIkFERFJFU1NfUkVRVUlSRUQiLCJXRUIzX1JFUVVJUkVEIiwiV0VCM19OT1RfQ09OTkVDVEVEIiwiQ09OVFJBQ1RfUkVRVUlSRUQiLCJJUEZTX1JFUVVJUkVEIiwiSVBGU19OT1RfQ09OTkVDVEVEIiwiV0VCM19NRVRBTUFTS19SRVFVSVJFRCIsIlRSQU5TQUNUSU9OX1VOU1VDQ0VTU0ZVTCIsIkZBSUxVUkVfRVZFTlQiLCJFWFBFQ1RfTk9UX0FfTUVNQkVSIiwiRVhQRUNUX1RZUEVfT1BUSU9OU19SRVFVSVJFRCIsImNvZGUiLCJrZXkiLCJ0eXBlIiwidmFsdWUiLCJhcmdzIiwibWVzc2FnZSIsImVyciIsIkVycm9yIl0sIm1hcHBpbmdzIjoiQUFBQTs7Ozs7Ozs7QUFTQTs7Ozs7O0FBRU8sTUFBTUEsZ0JBQWdCLEdBQUcsa0JBQXpCOztBQUNBLE1BQU1DLFVBQVUsR0FBRyxZQUFuQjs7QUFDQSxNQUFNQyxnQkFBZ0IsR0FBRyxrQkFBekI7O0FBQ0EsTUFBTUMsYUFBYSxHQUFHLGVBQXRCOztBQUNBLE1BQU1DLGtCQUFrQixHQUFHLG9CQUEzQjs7QUFDQSxNQUFNQyxpQkFBaUIsR0FBRyxtQkFBMUI7O0FBQ0EsTUFBTUMsYUFBYSxHQUFHLGVBQXRCOztBQUNBLE1BQU1DLGtCQUFrQixHQUFHLG9CQUEzQjs7QUFDQSxNQUFNQyxzQkFBc0IsR0FBRyx3QkFBL0I7O0FBQ0EsTUFBTUMsd0JBQXdCLEdBQUcsMEJBQWpDOztBQUNBLE1BQU1DLGFBQWEsR0FBRyxlQUF0Qjs7QUFDQSxNQUFNQyxtQkFBbUIsR0FBRyxxQkFBNUI7O0FBQ0EsTUFBTUMsNEJBQTRCLEdBQUcsOEJBQXJDOzs7ZUFFUSxDQUFDQyxJQUFELEVBQU9DLEdBQVAsRUFBWUMsSUFBWixFQUFrQkMsS0FBbEIsRUFBeUIsR0FBR0MsSUFBNUIsS0FBcUM7QUFDaEQsTUFBSUMsT0FBTyxHQUFHLGVBQWQ7O0FBRUEsVUFBUUwsSUFBUjtBQUNJLFNBQUtiLGdCQUFMO0FBQ0lrQixNQUFBQSxPQUFPLEdBQUcseURBQVY7QUFDQTs7QUFFSixTQUFLakIsVUFBTDtBQUNJaUIsTUFBQUEsT0FBTyxHQUFJLGtDQUFpQ0osR0FBSSxhQUFZQyxJQUFLLGdCQUFlQyxLQUFNLEdBQXRGO0FBQ0E7O0FBRUosU0FBS2IsYUFBTDtBQUNJZSxNQUFBQSxPQUFPLEdBQUcsbUJBQVY7QUFDQTs7QUFFSixTQUFLZCxrQkFBTDtBQUNJYyxNQUFBQSxPQUFPLEdBQUcsZ0NBQVY7QUFDQTs7QUFFSixTQUFLVixzQkFBTDtBQUNJVSxNQUFBQSxPQUFPLEdBQUcsZ0RBQVY7QUFDQTs7QUFFSixTQUFLYixpQkFBTDtBQUNJYSxNQUFBQSxPQUFPLEdBQUksYUFBWUQsSUFBSSxDQUFDLENBQUQsQ0FBSSxlQUEvQjtBQUNBOztBQUVKLFNBQUtmLGdCQUFMO0FBQ0lnQixNQUFBQSxPQUFPLEdBQUksZUFBY0QsSUFBSSxDQUFDLENBQUQsQ0FBSixJQUFXSCxHQUFJLDBDQUF5Q0UsS0FBTSxFQUF2RjtBQUNBOztBQUVKLFNBQUtWLGFBQUw7QUFDSVksTUFBQUEsT0FBTyxHQUFHLG1CQUFWO0FBQ0E7O0FBRUosU0FBS1gsa0JBQUw7QUFDSVcsTUFBQUEsT0FBTyxHQUFHLDhCQUFWO0FBQ0E7O0FBRUosU0FBS1Qsd0JBQUw7QUFDSVMsTUFBQUEsT0FBTyxHQUFHLDhCQUFWO0FBQ0E7O0FBRUosU0FBS1IsYUFBTDtBQUNJUSxNQUFBQSxPQUFPLEdBQUcsbUNBQVY7QUFDQTtBQTNDUjs7QUE4Q0EsUUFBTUMsR0FBRyxHQUFHLElBQUlDLEtBQUosQ0FBVUYsT0FBVixDQUFaO0FBQ0FDLEVBQUFBLEdBQUcsQ0FBQ04sSUFBSixHQUFXQSxJQUFJLElBQUksU0FBbkI7QUFDQU0sRUFBQUEsR0FBRyxDQUFDRixJQUFKLEdBQVdBLElBQVg7QUFDQSxTQUFPRSxHQUFQO0FBQ0gsQyIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogRXJyb3JzIGRlZmluaXRpb24gYW5kIGhlbHBlcnNcbiAqIFRoaXMgZmlsZSBpdCBpcyBhIHBhcnQgb2YgdGhlIFBhbmRvcmEgUHlycmhhIEphdmFzY3JpcHQgbGlicmFyeVxuICogXG4gKiBAZmlsZSBlcnJvcnMuanNcbiAqIEBhdXRob3IgS29zdGlhbnR5biBTbXlybm92IDxrb3N0eXNoQGdtYWlsLmNvbT5cbiAqIEBkYXRlIDIwMThcbiAqL1xuXG4ndXNlIHN0cmljdCc7XG5cbmV4cG9ydCBjb25zdCBPUFRJT05TX1JFUVVJUkVEID0gJ09QVElPTlNfUkVRVUlSRUQnO1xuZXhwb3J0IGNvbnN0IFdST05HX1RZUEUgPSAnV1JPTkdfVFlQRSc7XG5leHBvcnQgY29uc3QgQUREUkVTU19SRVFVSVJFRCA9ICdBRERSRVNTX1JFUVVJUkVEJztcbmV4cG9ydCBjb25zdCBXRUIzX1JFUVVJUkVEID0gJ1dFQjNfUkVRVUlSRUQnO1xuZXhwb3J0IGNvbnN0IFdFQjNfTk9UX0NPTk5FQ1RFRCA9ICdXRUIzX05PVF9DT05ORUNURUQnO1xuZXhwb3J0IGNvbnN0IENPTlRSQUNUX1JFUVVJUkVEID0gJ0NPTlRSQUNUX1JFUVVJUkVEJztcbmV4cG9ydCBjb25zdCBJUEZTX1JFUVVJUkVEID0gJ0lQRlNfUkVRVUlSRUQnO1xuZXhwb3J0IGNvbnN0IElQRlNfTk9UX0NPTk5FQ1RFRCA9ICdJUEZTX05PVF9DT05ORUNURUQnO1xuZXhwb3J0IGNvbnN0IFdFQjNfTUVUQU1BU0tfUkVRVUlSRUQgPSAnV0VCM19NRVRBTUFTS19SRVFVSVJFRCc7XG5leHBvcnQgY29uc3QgVFJBTlNBQ1RJT05fVU5TVUNDRVNTRlVMID0gJ1RSQU5TQUNUSU9OX1VOU1VDQ0VTU0ZVTCc7XG5leHBvcnQgY29uc3QgRkFJTFVSRV9FVkVOVCA9ICdGQUlMVVJFX0VWRU5UJztcbmV4cG9ydCBjb25zdCBFWFBFQ1RfTk9UX0FfTUVNQkVSID0gJ0VYUEVDVF9OT1RfQV9NRU1CRVInO1xuZXhwb3J0IGNvbnN0IEVYUEVDVF9UWVBFX09QVElPTlNfUkVRVUlSRUQgPSAnRVhQRUNUX1RZUEVfT1BUSU9OU19SRVFVSVJFRCc7XG5cbmV4cG9ydCBkZWZhdWx0IChjb2RlLCBrZXksIHR5cGUsIHZhbHVlLCAuLi5hcmdzKSA9PiB7XG4gICAgbGV0IG1lc3NhZ2UgPSAnVW5rbm93biBlcnJvcic7XG4gICAgICAgIFxuICAgIHN3aXRjaCAoY29kZSkge1xuICAgICAgICBjYXNlIE9QVElPTlNfUkVRVUlSRUQ6XG4gICAgICAgICAgICBtZXNzYWdlID0gJ0NvbmZpZyBvcHRpb25zIGlzIHJlcXVpcmVkIGFuZCBleHBlY3RlZCB0byBiZSBhbiBvYmplY3QnO1xuICAgICAgICAgICAgYnJlYWs7XG5cbiAgICAgICAgY2FzZSBXUk9OR19UWVBFOlxuICAgICAgICAgICAgbWVzc2FnZSA9IGBXcm9uZyBwcm9wZXJ0eSB0eXBlLiBFeHBlY3RlZCAnJHtrZXl9JyB0byBiZTogJyR7dHlwZX0nLCBidXQgZ290OiAnJHt2YWx1ZX0nYDtcbiAgICAgICAgICAgIGJyZWFrO1xuXG4gICAgICAgIGNhc2UgV0VCM19SRVFVSVJFRDpcbiAgICAgICAgICAgIG1lc3NhZ2UgPSAnV2ViMyBBUEkgcmVxdWlyZWQnO1xuICAgICAgICAgICAgYnJlYWs7XG5cbiAgICAgICAgY2FzZSBXRUIzX05PVF9DT05ORUNURUQ6XG4gICAgICAgICAgICBtZXNzYWdlID0gJ1dlYjMgbm90IGNvbm5lY3RlZCB0byBwcm92aWRlcic7XG4gICAgICAgICAgICBicmVhaztcblxuICAgICAgICBjYXNlIFdFQjNfTUVUQU1BU0tfUkVRVUlSRUQ6XG4gICAgICAgICAgICBtZXNzYWdlID0gJ01ldGFNYXNrIGlzIHJlcXVpcmVkIHRvIHBlcmZvcm0gdGhpcyBvcGVyYXRpb24nO1xuICAgICAgICAgICAgYnJlYWs7XG5cbiAgICAgICAgY2FzZSBDT05UUkFDVF9SRVFVSVJFRDpcbiAgICAgICAgICAgIG1lc3NhZ2UgPSBgQ29udHJhY3QgJyR7YXJnc1swXX0nIGlzIHJlcXVpcmVkYDtcbiAgICAgICAgICAgIGJyZWFrO1xuXG4gICAgICAgIGNhc2UgQUREUkVTU19SRVFVSVJFRDpcbiAgICAgICAgICAgIG1lc3NhZ2UgPSBgQWRkcmVzcyBvZiAnJHthcmdzWzBdIHx8IGtleX0nIGlzIHJlcXVpcmVkLiBXcm9uZyBldGhlcmV1bSBhZGRyZXNzOiAke3ZhbHVlfWA7XG4gICAgICAgICAgICBicmVhaztcblxuICAgICAgICBjYXNlIElQRlNfUkVRVUlSRUQ6XG4gICAgICAgICAgICBtZXNzYWdlID0gJ0lQRlMgQVBJIHJlcXVpcmVkJztcbiAgICAgICAgICAgIGJyZWFrO1xuXG4gICAgICAgIGNhc2UgSVBGU19OT1RfQ09OTkVDVEVEOlxuICAgICAgICAgICAgbWVzc2FnZSA9ICdObyBjb25uZWN0aW9uIHRvIElQRlMgc2VydmVyJztcbiAgICAgICAgICAgIGJyZWFrO1xuXG4gICAgICAgIGNhc2UgVFJBTlNBQ1RJT05fVU5TVUNDRVNTRlVMOlxuICAgICAgICAgICAgbWVzc2FnZSA9ICdUcmFuc2FjdGlvbiB3YXMgdW5zdWNjZXNzZnVsJztcbiAgICAgICAgICAgIGJyZWFrO1xuXG4gICAgICAgIGNhc2UgRkFJTFVSRV9FVkVOVDpcbiAgICAgICAgICAgIG1lc3NhZ2UgPSAnQ29udHJhY3QgcmV0dXJucyBhbiBmYWlsdXJlIGV2ZW50JztcbiAgICAgICAgICAgIGJyZWFrO1xuICAgIH1cblxuICAgIGNvbnN0IGVyciA9IG5ldyBFcnJvcihtZXNzYWdlKTtcbiAgICBlcnIuY29kZSA9IGNvZGUgfHwgJ1VOS05PV04nO1xuICAgIGVyci5hcmdzID0gYXJncztcbiAgICByZXR1cm4gZXJyO1xufTtcbiJdfQ==