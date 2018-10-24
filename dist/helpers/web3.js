/**
 * Web3 helpers
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
exports.deployContract = exports.estimateGas = void 0;

require("core-js/modules/es6.number.constructor");

require("core-js/modules/es6.promise");

require("regenerator-runtime/runtime");

var expect = _interopRequireWildcard(require("./expect"));

var _errors = _interopRequireWildcard(require("./errors"));

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

/**
 * Estimate required gas amount
 * 
 * @param {String} bytecode Contract bytecode
 * @param {Array} args Contract arguments
 * @returns {Number} hex
 */
var estimateGas =
/*#__PURE__*/
function () {
  var _ref = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee(bytecode, args) {
    var config,
        _args = arguments;
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            config = _args.length > 2 && _args[2] !== undefined ? _args[2] : {};
            expect.all(config, {
              'web3': {
                type: 'object',
                code: _errors.WEB3_REQUIRED
              }
            });
            _context.next = 4;
            return config.web3.eth.estimateGas({
              data: bytecode,
              arguments: args // @fixme It seems latest web3 do not require arguments as option

            });

          case 4:
            return _context.abrupt("return", _context.sent);

          case 5:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, this);
  }));

  return function estimateGas(_x, _x2) {
    return _ref.apply(this, arguments);
  };
}();
/**
 * Deploy contract
 * 
 * @param {Object} contract Contract json
 * @param {Object} options { args, from, gas } 
 * @returns {Promise} Promise object resolved to contract address
 */


exports.estimateGas = estimateGas;

var deployContract = function deployContract(contract, _ref2) {
  var args = _ref2.args,
      from = _ref2.from,
      gas = _ref2.gas;
  var config = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
  return new Promise(function (resolve, reject) {
    expect.all(config, {
      'web3': {
        type: 'object',
        code: _errors.WEB3_REQUIRED
      },
      'web3.currentProvider.isMetaMask': {
        type: 'boolean',
        code: _errors.WEB3_METAMASK_REQUIRED
      }
    });
    new config.web3.eth.Contract(contract.abi).deploy({
      data: contract.bytecode,
      arguments: args
    }).send({
      from: from,
      gas: gas
    }).on('error', reject).on('receipt', function (receipt) {
      if (Number(receipt.status) === 0) {
        return reject((0, _errors.default)(_errors.TRANSACTION_UNSUCCESSFUL));
      }

      resolve(receipt.contractAddress);
    });
  });
};

exports.deployContract = deployContract;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9oZWxwZXJzL3dlYjMuanMiXSwibmFtZXMiOlsiZXN0aW1hdGVHYXMiLCJieXRlY29kZSIsImFyZ3MiLCJjb25maWciLCJleHBlY3QiLCJhbGwiLCJ0eXBlIiwiY29kZSIsIldFQjNfUkVRVUlSRUQiLCJ3ZWIzIiwiZXRoIiwiZGF0YSIsImFyZ3VtZW50cyIsImRlcGxveUNvbnRyYWN0IiwiY29udHJhY3QiLCJmcm9tIiwiZ2FzIiwiUHJvbWlzZSIsInJlc29sdmUiLCJyZWplY3QiLCJXRUIzX01FVEFNQVNLX1JFUVVJUkVEIiwiQ29udHJhY3QiLCJhYmkiLCJkZXBsb3kiLCJzZW5kIiwib24iLCJyZWNlaXB0IiwiTnVtYmVyIiwic3RhdHVzIiwiVFJBTlNBQ1RJT05fVU5TVUNDRVNTRlVMIiwiY29udHJhY3RBZGRyZXNzIl0sIm1hcHBpbmdzIjoiQUFBQTs7Ozs7Ozs7QUFRQTs7Ozs7Ozs7Ozs7OztBQUVBOztBQUNBOzs7Ozs7OztBQU1BOzs7Ozs7O0FBT08sSUFBTUEsV0FBVztBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUEsMEJBQUcsaUJBQU9DLFFBQVAsRUFBaUJDLElBQWpCO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQXVCQyxZQUFBQSxNQUF2QiwyREFBZ0MsRUFBaEM7QUFFdkJDLFlBQUFBLE1BQU0sQ0FBQ0MsR0FBUCxDQUFXRixNQUFYLEVBQW1CO0FBQ2Ysc0JBQVE7QUFDSkcsZ0JBQUFBLElBQUksRUFBRSxRQURGO0FBRUpDLGdCQUFBQSxJQUFJLEVBQUVDO0FBRkY7QUFETyxhQUFuQjtBQUZ1QjtBQUFBLG1CQVNWTCxNQUFNLENBQUNNLElBQVAsQ0FBWUMsR0FBWixDQUFnQlYsV0FBaEIsQ0FBNEI7QUFDckNXLGNBQUFBLElBQUksRUFBRVYsUUFEK0I7QUFFckNXLGNBQUFBLFNBQVMsRUFBRVYsSUFGMEIsQ0FFdEI7O0FBRnNCLGFBQTVCLENBVFU7O0FBQUE7QUFBQTs7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQSxHQUFIOztBQUFBLGtCQUFYRixXQUFXO0FBQUE7QUFBQTtBQUFBLEdBQWpCO0FBZVA7Ozs7Ozs7Ozs7O0FBT08sSUFBTWEsY0FBYyxHQUFHLFNBQWpCQSxjQUFpQixDQUFDQyxRQUFEO0FBQUEsTUFBYVosSUFBYixTQUFhQSxJQUFiO0FBQUEsTUFBbUJhLElBQW5CLFNBQW1CQSxJQUFuQjtBQUFBLE1BQXlCQyxHQUF6QixTQUF5QkEsR0FBekI7QUFBQSxNQUFnQ2IsTUFBaEMsdUVBQXlDLEVBQXpDO0FBQUEsU0FBZ0QsSUFBSWMsT0FBSixDQUFZLFVBQUNDLE9BQUQsRUFBVUMsTUFBVixFQUFxQjtBQUUzR2YsSUFBQUEsTUFBTSxDQUFDQyxHQUFQLENBQVdGLE1BQVgsRUFBbUI7QUFDZixjQUFRO0FBQ0pHLFFBQUFBLElBQUksRUFBRSxRQURGO0FBRUpDLFFBQUFBLElBQUksRUFBRUM7QUFGRixPQURPO0FBS2YseUNBQW1DO0FBQy9CRixRQUFBQSxJQUFJLEVBQUUsU0FEeUI7QUFFL0JDLFFBQUFBLElBQUksRUFBRWE7QUFGeUI7QUFMcEIsS0FBbkI7QUFXQSxRQUFJakIsTUFBTSxDQUFDTSxJQUFQLENBQVlDLEdBQVosQ0FBZ0JXLFFBQXBCLENBQTZCUCxRQUFRLENBQUNRLEdBQXRDLEVBQ0tDLE1BREwsQ0FDWTtBQUNKWixNQUFBQSxJQUFJLEVBQUVHLFFBQVEsQ0FBQ2IsUUFEWDtBQUVKVyxNQUFBQSxTQUFTLEVBQUVWO0FBRlAsS0FEWixFQUtLc0IsSUFMTCxDQUtVO0FBQ0ZULE1BQUFBLElBQUksRUFBSkEsSUFERTtBQUVGQyxNQUFBQSxHQUFHLEVBQUhBO0FBRkUsS0FMVixFQVNLUyxFQVRMLENBU1EsT0FUUixFQVNpQk4sTUFUakIsRUFVS00sRUFWTCxDQVVRLFNBVlIsRUFVbUIsVUFBQUMsT0FBTyxFQUFJO0FBRXRCLFVBQUlDLE1BQU0sQ0FBQ0QsT0FBTyxDQUFDRSxNQUFULENBQU4sS0FBMkIsQ0FBL0IsRUFBa0M7QUFFOUIsZUFBT1QsTUFBTSxDQUFDLHFCQUFTVSxnQ0FBVCxDQUFELENBQWI7QUFDSDs7QUFFRFgsTUFBQUEsT0FBTyxDQUFDUSxPQUFPLENBQUNJLGVBQVQsQ0FBUDtBQUNILEtBbEJMO0FBbUJILEdBaEM2RSxDQUFoRDtBQUFBLENBQXZCIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBXZWIzIGhlbHBlcnNcbiAqIFRoaXMgZmlsZSBpdCBpcyBhIHBhcnQgb2YgdGhlIFBhbmRvcmEgUHlycmhhIEphdmFzY3JpcHQgbGlicmFyeVxuICogXG4gKiBAZmlsZSBlcnJvcnMuanNcbiAqIEBhdXRob3IgS29zdGlhbnR5biBTbXlybm92IDxrb3N0eXNoQGdtYWlsLmNvbT5cbiAqIEBkYXRlIDIwMThcbiAqL1xuJ3VzZSBzdHJpY3QnO1xuXG5pbXBvcnQgKiBhcyBleHBlY3QgZnJvbSAnLi9leHBlY3QnO1xuaW1wb3J0IHBqc0Vycm9yLCB7XG4gICAgV0VCM19SRVFVSVJFRCxcbiAgICBXRUIzX01FVEFNQVNLX1JFUVVJUkVELFxuICAgIFRSQU5TQUNUSU9OX1VOU1VDQ0VTU0ZVTFxufSBmcm9tICcuL2Vycm9ycyc7XG5cbi8qKlxuICogRXN0aW1hdGUgcmVxdWlyZWQgZ2FzIGFtb3VudFxuICogXG4gKiBAcGFyYW0ge1N0cmluZ30gYnl0ZWNvZGUgQ29udHJhY3QgYnl0ZWNvZGVcbiAqIEBwYXJhbSB7QXJyYXl9IGFyZ3MgQ29udHJhY3QgYXJndW1lbnRzXG4gKiBAcmV0dXJucyB7TnVtYmVyfSBoZXhcbiAqL1xuZXhwb3J0IGNvbnN0IGVzdGltYXRlR2FzID0gYXN5bmMgKGJ5dGVjb2RlLCBhcmdzLCBjb25maWcgPSB7fSkgPT4ge1xuXG4gICAgZXhwZWN0LmFsbChjb25maWcsIHtcbiAgICAgICAgJ3dlYjMnOiB7XG4gICAgICAgICAgICB0eXBlOiAnb2JqZWN0JyxcbiAgICAgICAgICAgIGNvZGU6IFdFQjNfUkVRVUlSRURcbiAgICAgICAgfVxuICAgIH0pO1xuXG4gICAgcmV0dXJuIGF3YWl0IGNvbmZpZy53ZWIzLmV0aC5lc3RpbWF0ZUdhcyh7XG4gICAgICAgIGRhdGE6IGJ5dGVjb2RlLFxuICAgICAgICBhcmd1bWVudHM6IGFyZ3MvLyBAZml4bWUgSXQgc2VlbXMgbGF0ZXN0IHdlYjMgZG8gbm90IHJlcXVpcmUgYXJndW1lbnRzIGFzIG9wdGlvblxuICAgIH0pO1xufTtcblxuLyoqXG4gKiBEZXBsb3kgY29udHJhY3RcbiAqIFxuICogQHBhcmFtIHtPYmplY3R9IGNvbnRyYWN0IENvbnRyYWN0IGpzb25cbiAqIEBwYXJhbSB7T2JqZWN0fSBvcHRpb25zIHsgYXJncywgZnJvbSwgZ2FzIH0gXG4gKiBAcmV0dXJucyB7UHJvbWlzZX0gUHJvbWlzZSBvYmplY3QgcmVzb2x2ZWQgdG8gY29udHJhY3QgYWRkcmVzc1xuICovXG5leHBvcnQgY29uc3QgZGVwbG95Q29udHJhY3QgPSAoY29udHJhY3QsIHsgYXJncywgZnJvbSwgZ2FzIH0sIGNvbmZpZyA9IHt9KSA9PiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG5cbiAgICBleHBlY3QuYWxsKGNvbmZpZywge1xuICAgICAgICAnd2ViMyc6IHtcbiAgICAgICAgICAgIHR5cGU6ICdvYmplY3QnLFxuICAgICAgICAgICAgY29kZTogV0VCM19SRVFVSVJFRFxuICAgICAgICB9LFxuICAgICAgICAnd2ViMy5jdXJyZW50UHJvdmlkZXIuaXNNZXRhTWFzayc6IHtcbiAgICAgICAgICAgIHR5cGU6ICdib29sZWFuJyxcbiAgICAgICAgICAgIGNvZGU6IFdFQjNfTUVUQU1BU0tfUkVRVUlSRURcbiAgICAgICAgfVxuICAgIH0pO1xuXG4gICAgbmV3IGNvbmZpZy53ZWIzLmV0aC5Db250cmFjdChjb250cmFjdC5hYmkpXG4gICAgICAgIC5kZXBsb3koe1xuICAgICAgICAgICAgZGF0YTogY29udHJhY3QuYnl0ZWNvZGUsXG4gICAgICAgICAgICBhcmd1bWVudHM6IGFyZ3NcbiAgICAgICAgfSlcbiAgICAgICAgLnNlbmQoe1xuICAgICAgICAgICAgZnJvbSxcbiAgICAgICAgICAgIGdhc1xuICAgICAgICB9KVxuICAgICAgICAub24oJ2Vycm9yJywgcmVqZWN0KVxuICAgICAgICAub24oJ3JlY2VpcHQnLCByZWNlaXB0ID0+IHtcblxuICAgICAgICAgICAgaWYgKE51bWJlcihyZWNlaXB0LnN0YXR1cykgPT09IDApIHtcblxuICAgICAgICAgICAgICAgIHJldHVybiByZWplY3QocGpzRXJyb3IoVFJBTlNBQ1RJT05fVU5TVUNDRVNTRlVMKSk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHJlc29sdmUocmVjZWlwdC5jb250cmFjdEFkZHJlc3MpO1xuICAgICAgICB9KTtcbn0pO1xuIl19