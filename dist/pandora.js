/**
 * Common Pandora contract methods
 * This file it is a part of the Pandora Pyrrha Javascript library
 * 
 * @file pandora.js
 * @author Kostiantyn Smyrnov <kostysh@gmail.com>
 * @date 2018
 */
'use strict';

require("core-js/modules/es6.object.define-property");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getMaximumWorkerPrice = exports.createWorkerNode = exports.whitelistWorkerOwner = exports.version = void 0;

require("core-js/modules/es6.number.parse-int");

require("core-js/modules/es6.number.constructor");

require("core-js/modules/es6.promise");

require("regenerator-runtime/runtime");

var expect = _interopRequireWildcard(require("./helpers/expect"));

var _errors = _interopRequireWildcard(require("./helpers/errors"));

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

/**
 * Get deployed contracts version
 * 
 * @param {Object} config Library config (provided by the proxy but can be overridden)
 * @returns {Promise}
 */
var version =
/*#__PURE__*/
function () {
  var _ref = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee() {
    var config,
        pan,
        version,
        _args = arguments;
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            config = _args.length > 0 && _args[0] !== undefined ? _args[0] : {};
            expect.all(config, {
              'web3': {
                type: 'object',
                code: _errors.WEB3_REQUIRED
              },
              'contracts.Pandora.abi': {
                type: 'object',
                code: _errors.CONTRACT_REQUIRED,
                args: ['Pandora']
              },
              'addresses.Pandora': {
                type: 'address',
                code: _errors.ADDRESS_REQUIRED,
                args: ['Pandora']
              }
            });
            pan = new config.web3.eth.Contract(config.contracts.Pandora.abi, config.addresses.Pandora);
            _context.next = 5;
            return pan.methods.version().call();

          case 5:
            version = _context.sent;
            return _context.abrupt("return", version);

          case 7:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, this);
  }));

  return function version() {
    return _ref.apply(this, arguments);
  };
}();
/**
 * Public and externalAdds address to the whitelist of owners allowed to create WorkerNodes contracts
 * 
 * @param {String} publisher 
 * @param {String} ownerAddress 
 * @param {Object} config Library config (provided by the proxy but can be overridden) 
 */


exports.version = version;

var whitelistWorkerOwner = function whitelistWorkerOwner(publisher, ownerAddress) {
  var config = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
  return new Promise(function (resolve, reject) {
    expect.all({
      publisher: publisher,
      ownerAddress: ownerAddress
    }, {
      'publisher': {
        type: 'address',
        code: _errors.ADDRESS_REQUIRED,
        args: ['Pandora contract owner']
      },
      'ownerAddress': {
        type: 'address',
        code: _errors.ADDRESS_REQUIRED,
        args: ['WorkerNode owner']
      }
    });
    expect.all(config, {
      'web3': {
        type: 'object',
        code: _errors.WEB3_REQUIRED
      }
    });
    var pan = new config.web3.eth.Contract(config.contracts.Pandora.abi, config.addresses.Pandora);
    pan.methods.whitelistWorkerOwner(ownerAddress).send({
      from: publisher
    }).on('error', reject).on('receipt', function (receipt) {
      if (Number(receipt.status) === 0) {
        return reject((0, _errors.default)(_errors.TRANSACTION_UNSUCCESSFUL));
      }

      resolve(receipt);
    });
  });
};
/**
 * Creates, registers and returns a new worker node owned by the caller of the contract. 
 * Can be called only by the whitelisted node owner address
 * 
 * @param {Number} computingPrice
 * @param {String} publisher 
 * @param {Object} config
 */


exports.whitelistWorkerOwner = whitelistWorkerOwner;

var createWorkerNode = function createWorkerNode(computingPrice, publisher) {
  var config = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
  return new Promise(function (resolve, reject) {
    expect.all({
      publisher: publisher
    }, {
      'publisher': {
        type: 'address',
        code: _errors.ADDRESS_REQUIRED,
        args: ['Pandora contract owner']
      }
    });
    expect.all(config, {
      'web3': {
        type: 'object',
        code: _errors.WEB3_REQUIRED
      },
      'contracts.WorkerNode': {
        type: 'object',
        code: _errors.CONTRACT_REQUIRED,
        args: ['WorkerNode']
      }
    });
    var pan = new config.web3.eth.Contract(config.contracts.Pandora.abi, config.addresses.Pandora);
    pan.methods.createWorkerNode(config.web3.utils.toHex(computingPrice)).send({
      from: publisher,
      gas: 6700000 // because this workflow is too greedy

    }).on('error', reject).on('receipt', function (receipt) {
      if (Number(receipt.status) === 0) {
        return reject((0, _errors.default)(_errors.TRANSACTION_UNSUCCESSFUL));
      } // console.log('>>>>> worker node result', receipt.events.WorkerNodeCreated.returnValues)
      // console.log('>>>>> worker node address', receipt.events.WorkerNodeCreated.address)


      resolve(receipt.events.WorkerNodeCreated.returnValues.workerNode); // address of created WorkerNode
    });
  });
};
/**
 * Return maximum value of the computing price
 * 
 * @param {Object} config Library config (provided by the proxy but can be overridden)
 */


exports.createWorkerNode = createWorkerNode;

var getMaximumWorkerPrice =
/*#__PURE__*/
function () {
  var _ref2 = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee2() {
    var config,
        pan,
        price,
        _args2 = arguments;
    return regeneratorRuntime.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            config = _args2.length > 0 && _args2[0] !== undefined ? _args2[0] : {};
            expect.all(config, {
              'web3': {
                type: 'object',
                code: _errors.WEB3_REQUIRED
              },
              'contracts.Pandora.abi': {
                type: 'object',
                code: _errors.CONTRACT_REQUIRED,
                args: ['Pandora']
              },
              'addresses.Pandora': {
                type: 'address',
                code: _errors.ADDRESS_REQUIRED,
                args: ['Pandora']
              }
            });
            pan = new config.web3.eth.Contract(config.contracts.Pandora.abi, config.addresses.Pandora);
            _context2.next = 5;
            return pan.methods.getMaximumWorkerPrice().call();

          case 5:
            price = _context2.sent;
            return _context2.abrupt("return", Number.parseInt(price, 10));

          case 7:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2, this);
  }));

  return function getMaximumWorkerPrice() {
    return _ref2.apply(this, arguments);
  };
}();

exports.getMaximumWorkerPrice = getMaximumWorkerPrice;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9wYW5kb3JhLmpzIl0sIm5hbWVzIjpbInZlcnNpb24iLCJjb25maWciLCJleHBlY3QiLCJhbGwiLCJ0eXBlIiwiY29kZSIsIldFQjNfUkVRVUlSRUQiLCJDT05UUkFDVF9SRVFVSVJFRCIsImFyZ3MiLCJBRERSRVNTX1JFUVVJUkVEIiwicGFuIiwid2ViMyIsImV0aCIsIkNvbnRyYWN0IiwiY29udHJhY3RzIiwiUGFuZG9yYSIsImFiaSIsImFkZHJlc3NlcyIsIm1ldGhvZHMiLCJjYWxsIiwid2hpdGVsaXN0V29ya2VyT3duZXIiLCJwdWJsaXNoZXIiLCJvd25lckFkZHJlc3MiLCJQcm9taXNlIiwicmVzb2x2ZSIsInJlamVjdCIsInNlbmQiLCJmcm9tIiwib24iLCJyZWNlaXB0IiwiTnVtYmVyIiwic3RhdHVzIiwiVFJBTlNBQ1RJT05fVU5TVUNDRVNTRlVMIiwiY3JlYXRlV29ya2VyTm9kZSIsImNvbXB1dGluZ1ByaWNlIiwidXRpbHMiLCJ0b0hleCIsImdhcyIsImV2ZW50cyIsIldvcmtlck5vZGVDcmVhdGVkIiwicmV0dXJuVmFsdWVzIiwid29ya2VyTm9kZSIsImdldE1heGltdW1Xb3JrZXJQcmljZSIsInByaWNlIiwicGFyc2VJbnQiXSwibWFwcGluZ3MiOiJBQUFBOzs7Ozs7OztBQVFBOzs7Ozs7Ozs7Ozs7Ozs7OztBQUVBOztBQUNBOzs7Ozs7OztBQU9BOzs7Ozs7QUFNTyxJQUFNQSxPQUFPO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQSwwQkFBRztBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBT0MsWUFBQUEsTUFBUCwyREFBZ0IsRUFBaEI7QUFFbkJDLFlBQUFBLE1BQU0sQ0FBQ0MsR0FBUCxDQUFXRixNQUFYLEVBQW1CO0FBQ2Ysc0JBQVE7QUFDSkcsZ0JBQUFBLElBQUksRUFBRSxRQURGO0FBRUpDLGdCQUFBQSxJQUFJLEVBQUVDO0FBRkYsZUFETztBQUtmLHVDQUF5QjtBQUNyQkYsZ0JBQUFBLElBQUksRUFBRSxRQURlO0FBRXJCQyxnQkFBQUEsSUFBSSxFQUFFRSx5QkFGZTtBQUdyQkMsZ0JBQUFBLElBQUksRUFBRSxDQUFDLFNBQUQ7QUFIZSxlQUxWO0FBVWYsbUNBQXFCO0FBQ2pCSixnQkFBQUEsSUFBSSxFQUFFLFNBRFc7QUFFakJDLGdCQUFBQSxJQUFJLEVBQUVJLHdCQUZXO0FBR2pCRCxnQkFBQUEsSUFBSSxFQUFFLENBQUMsU0FBRDtBQUhXO0FBVk4sYUFBbkI7QUFpQk1FLFlBQUFBLEdBbkJhLEdBbUJQLElBQUlULE1BQU0sQ0FBQ1UsSUFBUCxDQUFZQyxHQUFaLENBQWdCQyxRQUFwQixDQUE2QlosTUFBTSxDQUFDYSxTQUFQLENBQWlCQyxPQUFqQixDQUF5QkMsR0FBdEQsRUFBMkRmLE1BQU0sQ0FBQ2dCLFNBQVAsQ0FBaUJGLE9BQTVFLENBbkJPO0FBQUE7QUFBQSxtQkFvQkdMLEdBQUcsQ0FBQ1EsT0FBSixDQUNqQmxCLE9BRGlCLEdBRWpCbUIsSUFGaUIsRUFwQkg7O0FBQUE7QUFvQmJuQixZQUFBQSxPQXBCYTtBQUFBLDZDQXdCWkEsT0F4Qlk7O0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUEsR0FBSDs7QUFBQTtBQUFBO0FBQUE7QUFBQSxHQUFiO0FBMkJQOzs7Ozs7Ozs7OztBQU9PLElBQU1vQixvQkFBb0IsR0FBRyxTQUF2QkEsb0JBQXVCLENBQUNDLFNBQUQsRUFBWUMsWUFBWjtBQUFBLE1BQTBCckIsTUFBMUIsdUVBQW1DLEVBQW5DO0FBQUEsU0FBMEMsSUFBSXNCLE9BQUosQ0FBWSxVQUFDQyxPQUFELEVBQVVDLE1BQVYsRUFBcUI7QUFFM0d2QixJQUFBQSxNQUFNLENBQUNDLEdBQVAsQ0FBVztBQUFFa0IsTUFBQUEsU0FBUyxFQUFUQSxTQUFGO0FBQWFDLE1BQUFBLFlBQVksRUFBWkE7QUFBYixLQUFYLEVBQXdDO0FBQ3BDLG1CQUFhO0FBQ1RsQixRQUFBQSxJQUFJLEVBQUUsU0FERztBQUVUQyxRQUFBQSxJQUFJLEVBQUVJLHdCQUZHO0FBR1RELFFBQUFBLElBQUksRUFBRSxDQUFDLHdCQUFEO0FBSEcsT0FEdUI7QUFNcEMsc0JBQWdCO0FBQ1pKLFFBQUFBLElBQUksRUFBRSxTQURNO0FBRVpDLFFBQUFBLElBQUksRUFBRUksd0JBRk07QUFHWkQsUUFBQUEsSUFBSSxFQUFFLENBQUMsa0JBQUQ7QUFITTtBQU5vQixLQUF4QztBQWFBTixJQUFBQSxNQUFNLENBQUNDLEdBQVAsQ0FBV0YsTUFBWCxFQUFtQjtBQUNmLGNBQVE7QUFDSkcsUUFBQUEsSUFBSSxFQUFFLFFBREY7QUFFSkMsUUFBQUEsSUFBSSxFQUFFQztBQUZGO0FBRE8sS0FBbkI7QUFPQSxRQUFNSSxHQUFHLEdBQUcsSUFBSVQsTUFBTSxDQUFDVSxJQUFQLENBQVlDLEdBQVosQ0FBZ0JDLFFBQXBCLENBQTZCWixNQUFNLENBQUNhLFNBQVAsQ0FBaUJDLE9BQWpCLENBQXlCQyxHQUF0RCxFQUEyRGYsTUFBTSxDQUFDZ0IsU0FBUCxDQUFpQkYsT0FBNUUsQ0FBWjtBQUNBTCxJQUFBQSxHQUFHLENBQUNRLE9BQUosQ0FDS0Usb0JBREwsQ0FDMEJFLFlBRDFCLEVBRUtJLElBRkwsQ0FFVTtBQUNGQyxNQUFBQSxJQUFJLEVBQUVOO0FBREosS0FGVixFQUtLTyxFQUxMLENBS1EsT0FMUixFQUtpQkgsTUFMakIsRUFNS0csRUFOTCxDQU1RLFNBTlIsRUFNbUIsVUFBQUMsT0FBTyxFQUFJO0FBRXRCLFVBQUlDLE1BQU0sQ0FBQ0QsT0FBTyxDQUFDRSxNQUFULENBQU4sS0FBMkIsQ0FBL0IsRUFBa0M7QUFFOUIsZUFBT04sTUFBTSxDQUFDLHFCQUFTTyxnQ0FBVCxDQUFELENBQWI7QUFDSDs7QUFFRFIsTUFBQUEsT0FBTyxDQUFDSyxPQUFELENBQVA7QUFDSCxLQWRMO0FBZUgsR0F0QzZFLENBQTFDO0FBQUEsQ0FBN0I7QUF3Q1A7Ozs7Ozs7Ozs7OztBQVFPLElBQU1JLGdCQUFnQixHQUFHLFNBQW5CQSxnQkFBbUIsQ0FBQ0MsY0FBRCxFQUFpQmIsU0FBakI7QUFBQSxNQUE0QnBCLE1BQTVCLHVFQUFxQyxFQUFyQztBQUFBLFNBQTRDLElBQUlzQixPQUFKLENBQVksVUFBQ0MsT0FBRCxFQUFVQyxNQUFWLEVBQXFCO0FBRXpHdkIsSUFBQUEsTUFBTSxDQUFDQyxHQUFQLENBQVc7QUFBRWtCLE1BQUFBLFNBQVMsRUFBVEE7QUFBRixLQUFYLEVBQTBCO0FBQ3RCLG1CQUFhO0FBQ1RqQixRQUFBQSxJQUFJLEVBQUUsU0FERztBQUVUQyxRQUFBQSxJQUFJLEVBQUVJLHdCQUZHO0FBR1RELFFBQUFBLElBQUksRUFBRSxDQUFDLHdCQUFEO0FBSEc7QUFEUyxLQUExQjtBQVFBTixJQUFBQSxNQUFNLENBQUNDLEdBQVAsQ0FBV0YsTUFBWCxFQUFtQjtBQUNmLGNBQVE7QUFDSkcsUUFBQUEsSUFBSSxFQUFFLFFBREY7QUFFSkMsUUFBQUEsSUFBSSxFQUFFQztBQUZGLE9BRE87QUFLZiw4QkFBd0I7QUFDcEJGLFFBQUFBLElBQUksRUFBRSxRQURjO0FBRXBCQyxRQUFBQSxJQUFJLEVBQUVFLHlCQUZjO0FBR3BCQyxRQUFBQSxJQUFJLEVBQUUsQ0FBQyxZQUFEO0FBSGM7QUFMVCxLQUFuQjtBQVlBLFFBQU1FLEdBQUcsR0FBRyxJQUFJVCxNQUFNLENBQUNVLElBQVAsQ0FBWUMsR0FBWixDQUFnQkMsUUFBcEIsQ0FBNkJaLE1BQU0sQ0FBQ2EsU0FBUCxDQUFpQkMsT0FBakIsQ0FBeUJDLEdBQXRELEVBQTJEZixNQUFNLENBQUNnQixTQUFQLENBQWlCRixPQUE1RSxDQUFaO0FBQ0FMLElBQUFBLEdBQUcsQ0FBQ1EsT0FBSixDQUNLZSxnQkFETCxDQUNzQmhDLE1BQU0sQ0FBQ1UsSUFBUCxDQUFZd0IsS0FBWixDQUFrQkMsS0FBbEIsQ0FBd0JGLGNBQXhCLENBRHRCLEVBRUtSLElBRkwsQ0FFVTtBQUNGQyxNQUFBQSxJQUFJLEVBQUVOLFNBREo7QUFFRmdCLE1BQUFBLEdBQUcsRUFBRSxPQUZILENBRVU7O0FBRlYsS0FGVixFQU1LVCxFQU5MLENBTVEsT0FOUixFQU1pQkgsTUFOakIsRUFPS0csRUFQTCxDQU9RLFNBUFIsRUFPbUIsVUFBQUMsT0FBTyxFQUFJO0FBRXRCLFVBQUlDLE1BQU0sQ0FBQ0QsT0FBTyxDQUFDRSxNQUFULENBQU4sS0FBMkIsQ0FBL0IsRUFBa0M7QUFFOUIsZUFBT04sTUFBTSxDQUFDLHFCQUFTTyxnQ0FBVCxDQUFELENBQWI7QUFDSCxPQUxxQixDQU90QjtBQUNBOzs7QUFFQVIsTUFBQUEsT0FBTyxDQUFDSyxPQUFPLENBQUNTLE1BQVIsQ0FBZUMsaUJBQWYsQ0FBaUNDLFlBQWpDLENBQThDQyxVQUEvQyxDQUFQLENBVnNCLENBVTRDO0FBQ3JFLEtBbEJMO0FBbUJILEdBMUMyRSxDQUE1QztBQUFBLENBQXpCO0FBNENQOzs7Ozs7Ozs7QUFLTyxJQUFNQyxxQkFBcUI7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBLDBCQUFHO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFPekMsWUFBQUEsTUFBUCw4REFBZ0IsRUFBaEI7QUFFakNDLFlBQUFBLE1BQU0sQ0FBQ0MsR0FBUCxDQUFXRixNQUFYLEVBQW1CO0FBQ2Ysc0JBQVE7QUFDSkcsZ0JBQUFBLElBQUksRUFBRSxRQURGO0FBRUpDLGdCQUFBQSxJQUFJLEVBQUVDO0FBRkYsZUFETztBQUtmLHVDQUF5QjtBQUNyQkYsZ0JBQUFBLElBQUksRUFBRSxRQURlO0FBRXJCQyxnQkFBQUEsSUFBSSxFQUFFRSx5QkFGZTtBQUdyQkMsZ0JBQUFBLElBQUksRUFBRSxDQUFDLFNBQUQ7QUFIZSxlQUxWO0FBVWYsbUNBQXFCO0FBQ2pCSixnQkFBQUEsSUFBSSxFQUFFLFNBRFc7QUFFakJDLGdCQUFBQSxJQUFJLEVBQUVJLHdCQUZXO0FBR2pCRCxnQkFBQUEsSUFBSSxFQUFFLENBQUMsU0FBRDtBQUhXO0FBVk4sYUFBbkI7QUFpQk1FLFlBQUFBLEdBbkIyQixHQW1CckIsSUFBSVQsTUFBTSxDQUFDVSxJQUFQLENBQVlDLEdBQVosQ0FBZ0JDLFFBQXBCLENBQTZCWixNQUFNLENBQUNhLFNBQVAsQ0FBaUJDLE9BQWpCLENBQXlCQyxHQUF0RCxFQUEyRGYsTUFBTSxDQUFDZ0IsU0FBUCxDQUFpQkYsT0FBNUUsQ0FuQnFCO0FBQUE7QUFBQSxtQkFvQmJMLEdBQUcsQ0FBQ1EsT0FBSixDQUNmd0IscUJBRGUsR0FFZnZCLElBRmUsRUFwQmE7O0FBQUE7QUFvQjNCd0IsWUFBQUEsS0FwQjJCO0FBQUEsOENBd0IxQmIsTUFBTSxDQUFDYyxRQUFQLENBQWdCRCxLQUFoQixFQUF1QixFQUF2QixDQXhCMEI7O0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUEsR0FBSDs7QUFBQSxrQkFBckJELHFCQUFxQjtBQUFBO0FBQUE7QUFBQSxHQUEzQiIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogQ29tbW9uIFBhbmRvcmEgY29udHJhY3QgbWV0aG9kc1xuICogVGhpcyBmaWxlIGl0IGlzIGEgcGFydCBvZiB0aGUgUGFuZG9yYSBQeXJyaGEgSmF2YXNjcmlwdCBsaWJyYXJ5XG4gKiBcbiAqIEBmaWxlIHBhbmRvcmEuanNcbiAqIEBhdXRob3IgS29zdGlhbnR5biBTbXlybm92IDxrb3N0eXNoQGdtYWlsLmNvbT5cbiAqIEBkYXRlIDIwMThcbiAqL1xuJ3VzZSBzdHJpY3QnO1xuXG5pbXBvcnQgKiBhcyBleHBlY3QgZnJvbSAnLi9oZWxwZXJzL2V4cGVjdCc7XG5pbXBvcnQgcGpzRXJyb3IsIHtcbiAgICBXRUIzX1JFUVVJUkVELFxuICAgIENPTlRSQUNUX1JFUVVJUkVELFxuICAgIEFERFJFU1NfUkVRVUlSRUQsXG4gICAgVFJBTlNBQ1RJT05fVU5TVUNDRVNTRlVMXG59IGZyb20gJy4vaGVscGVycy9lcnJvcnMnO1xuXG4vKipcbiAqIEdldCBkZXBsb3llZCBjb250cmFjdHMgdmVyc2lvblxuICogXG4gKiBAcGFyYW0ge09iamVjdH0gY29uZmlnIExpYnJhcnkgY29uZmlnIChwcm92aWRlZCBieSB0aGUgcHJveHkgYnV0IGNhbiBiZSBvdmVycmlkZGVuKVxuICogQHJldHVybnMge1Byb21pc2V9XG4gKi9cbmV4cG9ydCBjb25zdCB2ZXJzaW9uID0gYXN5bmMgKGNvbmZpZyA9IHt9KSA9PiB7XG5cbiAgICBleHBlY3QuYWxsKGNvbmZpZywge1xuICAgICAgICAnd2ViMyc6IHtcbiAgICAgICAgICAgIHR5cGU6ICdvYmplY3QnLFxuICAgICAgICAgICAgY29kZTogV0VCM19SRVFVSVJFRFxuICAgICAgICB9LFxuICAgICAgICAnY29udHJhY3RzLlBhbmRvcmEuYWJpJzoge1xuICAgICAgICAgICAgdHlwZTogJ29iamVjdCcsXG4gICAgICAgICAgICBjb2RlOiBDT05UUkFDVF9SRVFVSVJFRCxcbiAgICAgICAgICAgIGFyZ3M6IFsnUGFuZG9yYSddXG4gICAgICAgIH0sXG4gICAgICAgICdhZGRyZXNzZXMuUGFuZG9yYSc6IHtcbiAgICAgICAgICAgIHR5cGU6ICdhZGRyZXNzJyxcbiAgICAgICAgICAgIGNvZGU6IEFERFJFU1NfUkVRVUlSRUQsXG4gICAgICAgICAgICBhcmdzOiBbJ1BhbmRvcmEnXVxuICAgICAgICB9XG4gICAgfSk7XG5cbiAgICBjb25zdCBwYW4gPSBuZXcgY29uZmlnLndlYjMuZXRoLkNvbnRyYWN0KGNvbmZpZy5jb250cmFjdHMuUGFuZG9yYS5hYmksIGNvbmZpZy5hZGRyZXNzZXMuUGFuZG9yYSk7XG4gICAgY29uc3QgdmVyc2lvbiA9IGF3YWl0IHBhbi5tZXRob2RzXG4gICAgICAgIC52ZXJzaW9uKClcbiAgICAgICAgLmNhbGwoKTtcbiAgICAgICAgXG4gICAgcmV0dXJuIHZlcnNpb247XG59O1xuXG4vKipcbiAqIFB1YmxpYyBhbmQgZXh0ZXJuYWxBZGRzIGFkZHJlc3MgdG8gdGhlIHdoaXRlbGlzdCBvZiBvd25lcnMgYWxsb3dlZCB0byBjcmVhdGUgV29ya2VyTm9kZXMgY29udHJhY3RzXG4gKiBcbiAqIEBwYXJhbSB7U3RyaW5nfSBwdWJsaXNoZXIgXG4gKiBAcGFyYW0ge1N0cmluZ30gb3duZXJBZGRyZXNzIFxuICogQHBhcmFtIHtPYmplY3R9IGNvbmZpZyBMaWJyYXJ5IGNvbmZpZyAocHJvdmlkZWQgYnkgdGhlIHByb3h5IGJ1dCBjYW4gYmUgb3ZlcnJpZGRlbikgXG4gKi9cbmV4cG9ydCBjb25zdCB3aGl0ZWxpc3RXb3JrZXJPd25lciA9IChwdWJsaXNoZXIsIG93bmVyQWRkcmVzcywgY29uZmlnID0ge30pID0+IG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcbiAgICBcbiAgICBleHBlY3QuYWxsKHsgcHVibGlzaGVyLCBvd25lckFkZHJlc3MgfSwge1xuICAgICAgICAncHVibGlzaGVyJzoge1xuICAgICAgICAgICAgdHlwZTogJ2FkZHJlc3MnLFxuICAgICAgICAgICAgY29kZTogQUREUkVTU19SRVFVSVJFRCxcbiAgICAgICAgICAgIGFyZ3M6IFsnUGFuZG9yYSBjb250cmFjdCBvd25lciddXG4gICAgICAgIH0sXG4gICAgICAgICdvd25lckFkZHJlc3MnOiB7XG4gICAgICAgICAgICB0eXBlOiAnYWRkcmVzcycsXG4gICAgICAgICAgICBjb2RlOiBBRERSRVNTX1JFUVVJUkVELFxuICAgICAgICAgICAgYXJnczogWydXb3JrZXJOb2RlIG93bmVyJ11cbiAgICAgICAgfVxuICAgIH0pO1xuXG4gICAgZXhwZWN0LmFsbChjb25maWcsIHtcbiAgICAgICAgJ3dlYjMnOiB7XG4gICAgICAgICAgICB0eXBlOiAnb2JqZWN0JyxcbiAgICAgICAgICAgIGNvZGU6IFdFQjNfUkVRVUlSRURcbiAgICAgICAgfVxuICAgIH0pO1xuXG4gICAgY29uc3QgcGFuID0gbmV3IGNvbmZpZy53ZWIzLmV0aC5Db250cmFjdChjb25maWcuY29udHJhY3RzLlBhbmRvcmEuYWJpLCBjb25maWcuYWRkcmVzc2VzLlBhbmRvcmEpO1xuICAgIHBhbi5tZXRob2RzXG4gICAgICAgIC53aGl0ZWxpc3RXb3JrZXJPd25lcihvd25lckFkZHJlc3MpXG4gICAgICAgIC5zZW5kKHtcbiAgICAgICAgICAgIGZyb206IHB1Ymxpc2hlclxuICAgICAgICB9KVxuICAgICAgICAub24oJ2Vycm9yJywgcmVqZWN0KVxuICAgICAgICAub24oJ3JlY2VpcHQnLCByZWNlaXB0ID0+IHtcblxuICAgICAgICAgICAgaWYgKE51bWJlcihyZWNlaXB0LnN0YXR1cykgPT09IDApIHtcblxuICAgICAgICAgICAgICAgIHJldHVybiByZWplY3QocGpzRXJyb3IoVFJBTlNBQ1RJT05fVU5TVUNDRVNTRlVMKSk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHJlc29sdmUocmVjZWlwdCk7XG4gICAgICAgIH0pO1xufSk7XG5cbi8qKlxuICogQ3JlYXRlcywgcmVnaXN0ZXJzIGFuZCByZXR1cm5zIGEgbmV3IHdvcmtlciBub2RlIG93bmVkIGJ5IHRoZSBjYWxsZXIgb2YgdGhlIGNvbnRyYWN0LiBcbiAqIENhbiBiZSBjYWxsZWQgb25seSBieSB0aGUgd2hpdGVsaXN0ZWQgbm9kZSBvd25lciBhZGRyZXNzXG4gKiBcbiAqIEBwYXJhbSB7TnVtYmVyfSBjb21wdXRpbmdQcmljZVxuICogQHBhcmFtIHtTdHJpbmd9IHB1Ymxpc2hlciBcbiAqIEBwYXJhbSB7T2JqZWN0fSBjb25maWdcbiAqL1xuZXhwb3J0IGNvbnN0IGNyZWF0ZVdvcmtlck5vZGUgPSAoY29tcHV0aW5nUHJpY2UsIHB1Ymxpc2hlciwgY29uZmlnID0ge30pID0+IG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcblxuICAgIGV4cGVjdC5hbGwoeyBwdWJsaXNoZXIgfSwge1xuICAgICAgICAncHVibGlzaGVyJzoge1xuICAgICAgICAgICAgdHlwZTogJ2FkZHJlc3MnLFxuICAgICAgICAgICAgY29kZTogQUREUkVTU19SRVFVSVJFRCxcbiAgICAgICAgICAgIGFyZ3M6IFsnUGFuZG9yYSBjb250cmFjdCBvd25lciddXG4gICAgICAgIH1cbiAgICB9KTtcblxuICAgIGV4cGVjdC5hbGwoY29uZmlnLCB7XG4gICAgICAgICd3ZWIzJzoge1xuICAgICAgICAgICAgdHlwZTogJ29iamVjdCcsXG4gICAgICAgICAgICBjb2RlOiBXRUIzX1JFUVVJUkVEXG4gICAgICAgIH0sXG4gICAgICAgICdjb250cmFjdHMuV29ya2VyTm9kZSc6IHtcbiAgICAgICAgICAgIHR5cGU6ICdvYmplY3QnLFxuICAgICAgICAgICAgY29kZTogQ09OVFJBQ1RfUkVRVUlSRUQsXG4gICAgICAgICAgICBhcmdzOiBbJ1dvcmtlck5vZGUnXVxuICAgICAgICB9XG4gICAgfSk7XG5cbiAgICBjb25zdCBwYW4gPSBuZXcgY29uZmlnLndlYjMuZXRoLkNvbnRyYWN0KGNvbmZpZy5jb250cmFjdHMuUGFuZG9yYS5hYmksIGNvbmZpZy5hZGRyZXNzZXMuUGFuZG9yYSk7XG4gICAgcGFuLm1ldGhvZHNcbiAgICAgICAgLmNyZWF0ZVdvcmtlck5vZGUoY29uZmlnLndlYjMudXRpbHMudG9IZXgoY29tcHV0aW5nUHJpY2UpKVxuICAgICAgICAuc2VuZCh7XG4gICAgICAgICAgICBmcm9tOiBwdWJsaXNoZXIsXG4gICAgICAgICAgICBnYXM6IDY3MDAwMDAvLyBiZWNhdXNlIHRoaXMgd29ya2Zsb3cgaXMgdG9vIGdyZWVkeVxuICAgICAgICB9KVxuICAgICAgICAub24oJ2Vycm9yJywgcmVqZWN0KVxuICAgICAgICAub24oJ3JlY2VpcHQnLCByZWNlaXB0ID0+IHtcblxuICAgICAgICAgICAgaWYgKE51bWJlcihyZWNlaXB0LnN0YXR1cykgPT09IDApIHtcblxuICAgICAgICAgICAgICAgIHJldHVybiByZWplY3QocGpzRXJyb3IoVFJBTlNBQ1RJT05fVU5TVUNDRVNTRlVMKSk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIC8vIGNvbnNvbGUubG9nKCc+Pj4+PiB3b3JrZXIgbm9kZSByZXN1bHQnLCByZWNlaXB0LmV2ZW50cy5Xb3JrZXJOb2RlQ3JlYXRlZC5yZXR1cm5WYWx1ZXMpXG4gICAgICAgICAgICAvLyBjb25zb2xlLmxvZygnPj4+Pj4gd29ya2VyIG5vZGUgYWRkcmVzcycsIHJlY2VpcHQuZXZlbnRzLldvcmtlck5vZGVDcmVhdGVkLmFkZHJlc3MpXG5cbiAgICAgICAgICAgIHJlc29sdmUocmVjZWlwdC5ldmVudHMuV29ya2VyTm9kZUNyZWF0ZWQucmV0dXJuVmFsdWVzLndvcmtlck5vZGUpOy8vIGFkZHJlc3Mgb2YgY3JlYXRlZCBXb3JrZXJOb2RlXG4gICAgICAgIH0pO1xufSk7XG5cbi8qKlxuICogUmV0dXJuIG1heGltdW0gdmFsdWUgb2YgdGhlIGNvbXB1dGluZyBwcmljZVxuICogXG4gKiBAcGFyYW0ge09iamVjdH0gY29uZmlnIExpYnJhcnkgY29uZmlnIChwcm92aWRlZCBieSB0aGUgcHJveHkgYnV0IGNhbiBiZSBvdmVycmlkZGVuKVxuICovXG5leHBvcnQgY29uc3QgZ2V0TWF4aW11bVdvcmtlclByaWNlID0gYXN5bmMgKGNvbmZpZyA9IHt9KSA9PiB7XG5cbiAgICBleHBlY3QuYWxsKGNvbmZpZywge1xuICAgICAgICAnd2ViMyc6IHtcbiAgICAgICAgICAgIHR5cGU6ICdvYmplY3QnLFxuICAgICAgICAgICAgY29kZTogV0VCM19SRVFVSVJFRFxuICAgICAgICB9LFxuICAgICAgICAnY29udHJhY3RzLlBhbmRvcmEuYWJpJzoge1xuICAgICAgICAgICAgdHlwZTogJ29iamVjdCcsXG4gICAgICAgICAgICBjb2RlOiBDT05UUkFDVF9SRVFVSVJFRCxcbiAgICAgICAgICAgIGFyZ3M6IFsnUGFuZG9yYSddXG4gICAgICAgIH0sXG4gICAgICAgICdhZGRyZXNzZXMuUGFuZG9yYSc6IHtcbiAgICAgICAgICAgIHR5cGU6ICdhZGRyZXNzJyxcbiAgICAgICAgICAgIGNvZGU6IEFERFJFU1NfUkVRVUlSRUQsXG4gICAgICAgICAgICBhcmdzOiBbJ1BhbmRvcmEnXVxuICAgICAgICB9XG4gICAgfSk7XG5cbiAgICBjb25zdCBwYW4gPSBuZXcgY29uZmlnLndlYjMuZXRoLkNvbnRyYWN0KGNvbmZpZy5jb250cmFjdHMuUGFuZG9yYS5hYmksIGNvbmZpZy5hZGRyZXNzZXMuUGFuZG9yYSk7XG4gICAgY29uc3QgcHJpY2UgPSBhd2FpdCBwYW4ubWV0aG9kc1xuICAgICAgICAuZ2V0TWF4aW11bVdvcmtlclByaWNlKClcbiAgICAgICAgLmNhbGwoKTtcbiAgICAgICAgXG4gICAgcmV0dXJuIE51bWJlci5wYXJzZUludChwcmljZSwgMTApO1xufTtcbiJdfQ==