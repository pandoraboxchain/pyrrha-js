/**
 * WorkerNodes related methods
 * This file it is a part of the Pandora Pyrrha Javascript library
 * 
 * @file workers.js
 * @author Kostiantyn Smyrnov <kostysh@gmail.com>
 * @date 2018
 */
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.alive = exports.eventWorkerNodeStateChanged = exports.eventWorkerNodeCreated = exports.fetchIdleCount = exports.fetchAll = exports.fetchWorkerById = exports.fetchWorker = exports.fetchActiveJobAddress = exports.fetchState = exports.fetchAddressById = exports.fetchCount = void 0;

var expect = _interopRequireWildcard(require("./helpers/expect"));

var _errors = _interopRequireWildcard(require("./helpers/errors"));

var _jobs = require("./jobs");

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; var ownKeys = Object.keys(source); if (typeof Object.getOwnPropertySymbols === 'function') { ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) { return Object.getOwnPropertyDescriptor(source, sym).enumerable; })); } ownKeys.forEach(function (key) { _defineProperty(target, key, source[key]); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

/**
 * Get worker nodes count from Pandora contract
 * 
 * @param {Object} config Library config (provided by the proxy but can be overridden)
 * @returns {Promise} A Promise object represents the {number} 
 */
var fetchCount =
/*#__PURE__*/
function () {
  var _ref = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee() {
    var config,
        pan,
        count,
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
            return pan.methods.workerNodesCount().call();

          case 5:
            count = _context.sent;
            return _context.abrupt("return", Number.parseInt(count, 10));

          case 7:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, this);
  }));

  return function fetchCount() {
    return _ref.apply(this, arguments);
  };
}();
/**
 * Get worker address from Pandora contract by the worker Id
 * 
 * @param {integer} id Worker Id
 * @param {Object} config Library config (provided by the proxy but can be overridden)
 * @returns {Promise} A Promise object represents the {string} 
 */


exports.fetchCount = fetchCount;

var fetchAddressById =
/*#__PURE__*/
function () {
  var _ref2 = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee2(id) {
    var config,
        pan,
        address,
        _args2 = arguments;
    return regeneratorRuntime.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            config = _args2.length > 1 && _args2[1] !== undefined ? _args2[1] : {};
            expect.all({
              id: id
            }, {
              'id': {
                type: 'number'
              }
            });
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
            _context2.next = 6;
            return pan.methods.workerNodes(id).call();

          case 6:
            address = _context2.sent;
            return _context2.abrupt("return", String(address));

          case 8:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2, this);
  }));

  return function fetchAddressById(_x) {
    return _ref2.apply(this, arguments);
  };
}();
/**
 * Get worker state from Worker contract by the worker address
 * 
 * @param {string} address 
 * @param {Object} config Library config (provided by the proxy but can be overridden)
 * @returns {Promise} A Promise object represents the {number}
 */


exports.fetchAddressById = fetchAddressById;

var fetchState =
/*#__PURE__*/
function () {
  var _ref3 = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee3() {
    var address,
        config,
        wor,
        state,
        _args3 = arguments;
    return regeneratorRuntime.wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            address = _args3.length > 0 && _args3[0] !== undefined ? _args3[0] : '';
            config = _args3.length > 1 && _args3[1] !== undefined ? _args3[1] : {};
            expect.all({
              address: address
            }, {
              'address': {
                type: 'address'
              }
            });
            expect.all(config, {
              'web3': {
                type: 'object',
                code: _errors.WEB3_REQUIRED
              },
              'contracts.WorkerNode.abi': {
                type: 'object',
                code: _errors.CONTRACT_REQUIRED,
                args: ['WorkerNode']
              }
            });
            wor = new config.web3.eth.Contract(config.contracts.WorkerNode.abi, address);
            _context3.next = 7;
            return wor.methods.currentState().call();

          case 7:
            state = _context3.sent;
            return _context3.abrupt("return", Number.parseInt(state, 10));

          case 9:
          case "end":
            return _context3.stop();
        }
      }
    }, _callee3, this);
  }));

  return function fetchState() {
    return _ref3.apply(this, arguments);
  };
}();
/**
 * Get worker's active job from Worker contract by the worker address
 * 
 * @param {string} address 
 * @param {Object} config Library config (provided by the proxy but can be overridden)
 * @returns {Promise} A Promise object represents the {string}
 */


exports.fetchState = fetchState;

var fetchActiveJobAddress =
/*#__PURE__*/
function () {
  var _ref4 = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee4() {
    var address,
        config,
        wor,
        activeJob,
        _args4 = arguments;
    return regeneratorRuntime.wrap(function _callee4$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            address = _args4.length > 0 && _args4[0] !== undefined ? _args4[0] : '';
            config = _args4.length > 1 && _args4[1] !== undefined ? _args4[1] : {};
            expect.all({
              address: address
            }, {
              'address': {
                type: 'address'
              }
            });
            expect.all(config, {
              'web3': {
                type: 'object',
                code: _errors.WEB3_REQUIRED
              },
              'contracts.WorkerNode.abi': {
                type: 'object',
                code: _errors.CONTRACT_REQUIRED,
                args: ['WorkerNode']
              }
            });
            wor = new config.web3.eth.Contract(config.contracts.WorkerNode.abi, address);
            _context4.next = 7;
            return wor.methods.activeJob().call();

          case 7:
            activeJob = _context4.sent;
            return _context4.abrupt("return", String(activeJob, 10));

          case 9:
          case "end":
            return _context4.stop();
        }
      }
    }, _callee4, this);
  }));

  return function fetchActiveJobAddress() {
    return _ref4.apply(this, arguments);
  };
}();
/**
 * Get worker by the worker's address
 * 
 * @param {string} address
 * @param {Object} config Library config (provided by the proxy but can be overridden)
 * @returns {Promise} A Promise object represents the {Object}
 */


exports.fetchActiveJobAddress = fetchActiveJobAddress;

var fetchWorker =
/*#__PURE__*/
function () {
  var _ref5 = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee5() {
    var address,
        config,
        _ref6,
        _ref7,
        currentState,
        activeJob,
        currentJob,
        jobState,
        jobDetails,
        _args5 = arguments;

    return regeneratorRuntime.wrap(function _callee5$(_context5) {
      while (1) {
        switch (_context5.prev = _context5.next) {
          case 0:
            address = _args5.length > 0 && _args5[0] !== undefined ? _args5[0] : '';
            config = _args5.length > 1 && _args5[1] !== undefined ? _args5[1] : {};
            _context5.next = 4;
            return Promise.all([fetchState(address, config), fetchActiveJobAddress(address, config)]);

          case 4:
            _ref6 = _context5.sent;
            _ref7 = _slicedToArray(_ref6, 2);
            currentState = _ref7[0];
            activeJob = _ref7[1];
            currentJob = activeJob;

            if (!(+activeJob !== 0)) {
              _context5.next = 16;
              break;
            }

            _context5.next = 12;
            return (0, _jobs.fetchJobDetails)(activeJob, config);

          case 12:
            jobDetails = _context5.sent;
            jobState = jobDetails.state;
            _context5.next = 18;
            break;

          case 16:
            currentJob = null;
            jobState = -1;

          case 18:
            return _context5.abrupt("return", {
              address: address,
              currentState: currentState,
              currentJob: currentJob,
              currentJobStatus: jobState
            });

          case 19:
          case "end":
            return _context5.stop();
        }
      }
    }, _callee5, this);
  }));

  return function fetchWorker() {
    return _ref5.apply(this, arguments);
  };
}();
/**
 * Get worker by the worker's id
 * 
 * @param {integer} id 
 * @param {Object} config Library config (provided by the proxy but can be overridden)
 * @returns {Promise} A Promise object represents the {Object}
 */


exports.fetchWorker = fetchWorker;

var fetchWorkerById =
/*#__PURE__*/
function () {
  var _ref8 = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee6(id) {
    var config,
        address,
        worker,
        _args6 = arguments;
    return regeneratorRuntime.wrap(function _callee6$(_context6) {
      while (1) {
        switch (_context6.prev = _context6.next) {
          case 0:
            config = _args6.length > 1 && _args6[1] !== undefined ? _args6[1] : {};
            _context6.next = 3;
            return fetchAddressById(id, config);

          case 3:
            address = _context6.sent;
            _context6.next = 6;
            return fetchWorker(address, config);

          case 6:
            worker = _context6.sent;
            return _context6.abrupt("return", _objectSpread({
              id: id
            }, worker));

          case 8:
          case "end":
            return _context6.stop();
        }
      }
    }, _callee6, this);
  }));

  return function fetchWorkerById(_x2) {
    return _ref8.apply(this, arguments);
  };
}();
/**
 * Get all workers
 * 
 * @param {Object} config Library config (provided by the proxy but can be overridden)
 * @returns {Promise} A Promise object represents the {number}
 */


exports.fetchWorkerById = fetchWorkerById;

var fetchAll =
/*#__PURE__*/
function () {
  var _ref9 = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee7() {
    var config,
        records,
        error,
        count,
        i,
        worker,
        _args7 = arguments;
    return regeneratorRuntime.wrap(function _callee7$(_context7) {
      while (1) {
        switch (_context7.prev = _context7.next) {
          case 0:
            config = _args7.length > 0 && _args7[0] !== undefined ? _args7[0] : {};
            records = [];
            error = [];
            _context7.prev = 3;
            _context7.next = 6;
            return fetchCount(config);

          case 6:
            count = _context7.sent;
            i = 0;

          case 8:
            if (!(i < count)) {
              _context7.next = 22;
              break;
            }

            _context7.prev = 9;
            _context7.next = 12;
            return fetchWorkerById(i, config);

          case 12:
            worker = _context7.sent;
            records.push(_objectSpread({
              id: i
            }, worker));
            _context7.next = 19;
            break;

          case 16:
            _context7.prev = 16;
            _context7.t0 = _context7["catch"](9);
            error.push({
              id: i,
              message: _context7.t0.message
            });

          case 19:
            i++;
            _context7.next = 8;
            break;

          case 22:
            _context7.next = 27;
            break;

          case 24:
            _context7.prev = 24;
            _context7.t1 = _context7["catch"](3);
            error.push({
              error: _context7.t1.message
            });

          case 27:
            return _context7.abrupt("return", {
              records: records,
              error: error
            });

          case 28:
          case "end":
            return _context7.stop();
        }
      }
    }, _callee7, this, [[3, 24], [9, 16]]);
  }));

  return function fetchAll() {
    return _ref9.apply(this, arguments);
  };
}();
/**
 * Get count of workers with "idle" status
 * 
 * @param {Object} config Library config (provided by the proxy but can be overridden)
 * @returns {Promise} A Promise object represents the {number}
 */


exports.fetchAll = fetchAll;

var fetchIdleCount =
/*#__PURE__*/
function () {
  var _ref10 = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee8() {
    var config,
        all,
        _args8 = arguments;
    return regeneratorRuntime.wrap(function _callee8$(_context8) {
      while (1) {
        switch (_context8.prev = _context8.next) {
          case 0:
            config = _args8.length > 0 && _args8[0] !== undefined ? _args8[0] : {};
            _context8.next = 3;
            return fetchAll(config);

          case 3:
            all = _context8.sent;
            return _context8.abrupt("return", all.records.reduce(function (acc, curr) {
              return curr.currentState === 2 ? acc + 1 : acc;
            }, 0));

          case 5:
          case "end":
            return _context8.stop();
        }
      }
    }, _callee8, this);
  }));

  return function fetchIdleCount() {
    return _ref10.apply(this, arguments);
  };
}();
/**
 * Handle event WorkerNodeCreated
 * 
 * @param {Object} options Event handler options
 * @param {Object} config Library config (provided by the proxy but can be overridden)
 * @returns {Object} Object with chained callbacks #data and #error
 */


exports.fetchIdleCount = fetchIdleCount;

var eventWorkerNodeCreated = function eventWorkerNodeCreated() {
  var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  var config = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  expect.all({
    options: options
  }, {
    'options': {
      type: 'object'
    }
  });
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
  var callbacks = {
    onData: function onData() {},
    onError: function onError() {}
  };
  var chain = {
    data: function data() {
      var cb = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : function () {};
      callbacks.onData = cb;
      return chain;
    },
    error: function error() {
      var cb = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : function () {};
      callbacks.onError = cb;
      return chain;
    }
  };
  var pan = new config.web3.eth.Contract(config.contracts.Pandora.abi, config.addresses.Pandora);
  chain.event = pan.events.WorkerNodeCreated(options).on('data',
  /*#__PURE__*/
  function () {
    var _ref11 = _asyncToGenerator(
    /*#__PURE__*/
    regeneratorRuntime.mark(function _callee9(event) {
      var worker;
      return regeneratorRuntime.wrap(function _callee9$(_context9) {
        while (1) {
          switch (_context9.prev = _context9.next) {
            case 0:
              _context9.prev = 0;
              _context9.next = 3;
              return fetchWorker(event.returnValues.workerNode, config);

            case 3:
              worker = _context9.sent;
              callbacks.onData({
                records: [worker],
                event: event
              });
              _context9.next = 10;
              break;

            case 7:
              _context9.prev = 7;
              _context9.t0 = _context9["catch"](0);
              callbacks.onError(_context9.t0);

            case 10:
            case "end":
              return _context9.stop();
          }
        }
      }, _callee9, this, [[0, 7]]);
    }));

    return function (_x3) {
      return _ref11.apply(this, arguments);
    };
  }()).on('error', callbacks.onError);
  return chain;
};
/**
 * Handle event StateChanged for WorkerNode
 * 
 * @param {String} address
 * @param {Object} options
 * @param {Object} config Library config (provided by the proxy but can be overridden)
 * @returns {Object} Object with chained callbacks #data and #error
 */


exports.eventWorkerNodeCreated = eventWorkerNodeCreated;

var eventWorkerNodeStateChanged = function eventWorkerNodeStateChanged() {
  var address = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';
  var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  var config = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
  expect.all({
    address: address
  }, {
    'address': {
      type: 'address'
    }
  });
  expect.all(config, {
    'web3': {
      type: 'object',
      code: _errors.WEB3_REQUIRED
    },
    'contracts.WorkerNode.abi': {
      type: 'object',
      code: _errors.CONTRACT_REQUIRED,
      args: ['WorkerNode']
    }
  });
  var callbacks = {
    onData: function onData() {},
    onError: function onError() {}
  };
  var chain = {
    data: function data() {
      var cb = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : function () {};
      callbacks.onData = cb;
      return chain;
    },
    error: function error() {
      var cb = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : function () {};
      callbacks.onError = cb;
      return chain;
    }
  };
  var wor = new config.web3.eth.Contract(config.contracts.WorkerNode.abi, address);
  chain.event = wor.events.StateChanged(options).on('data',
  /*#__PURE__*/
  function () {
    var _ref12 = _asyncToGenerator(
    /*#__PURE__*/
    regeneratorRuntime.mark(function _callee10(event) {
      var worker;
      return regeneratorRuntime.wrap(function _callee10$(_context10) {
        while (1) {
          switch (_context10.prev = _context10.next) {
            case 0:
              _context10.prev = 0;
              _context10.next = 3;
              return fetchWorker(address, config);

            case 3:
              worker = _context10.sent;
              callbacks.onData({
                records: [worker],
                event: event
              });
              _context10.next = 10;
              break;

            case 7:
              _context10.prev = 7;
              _context10.t0 = _context10["catch"](0);
              callbacks.onError(_context10.t0);

            case 10:
            case "end":
              return _context10.stop();
          }
        }
      }, _callee10, this, [[0, 7]]);
    }));

    return function (_x4) {
      return _ref12.apply(this, arguments);
    };
  }()).on('error', callbacks.onError);
  return chain;
};
/**
 * Transition of a WorkerNode to the Idle state
 * 
 * @param {String} workerNodeAddress 
 * @param {String} from
 * @param {Object} config Library config (provided by the proxy but can be overridden)
 * @returns {Promise} Promise object resolved to add status (boolean)
 */


exports.eventWorkerNodeStateChanged = eventWorkerNodeStateChanged;

var alive = function alive(workerNodeAddress, from) {
  var config = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
  return new Promise(
  /*#__PURE__*/
  function () {
    var _ref13 = _asyncToGenerator(
    /*#__PURE__*/
    regeneratorRuntime.mark(function _callee11(resolve, reject) {
      var wrn, gasPrice;
      return regeneratorRuntime.wrap(function _callee11$(_context11) {
        while (1) {
          switch (_context11.prev = _context11.next) {
            case 0:
              expect.all({
                workerNodeAddress: workerNodeAddress,
                from: from
              }, {
                'workerNodeAddress': {
                  type: 'address'
                },
                'from': {
                  type: 'address'
                }
              });
              expect.all(config, {
                'web3': {
                  type: 'object',
                  code: _errors.WEB3_REQUIRED
                },
                'contracts.WorkerNode.abi': {
                  type: 'object',
                  code: _errors.CONTRACT_REQUIRED,
                  args: ['WorkerNode']
                }
              });
              wrn = new config.web3.eth.Contract(config.contracts.WorkerNode.abi, workerNodeAddress);
              _context11.next = 5;
              return config.web3.eth.getGasPrice();

            case 5:
              gasPrice = _context11.sent;
              wrn.methods.alive().send({
                from: from,
                gasPrice: gasPrice,
                gas: 6700000
              }).on('error', reject).on('receipt', function (receipt) {
                if (Number(receipt.status) === 0) {
                  return reject((0, _errors.default)(_errors.TRANSACTION_UNSUCCESSFUL));
                }

                resolve(receipt);
              });

            case 7:
            case "end":
              return _context11.stop();
          }
        }
      }, _callee11, this);
    }));

    return function (_x5, _x6) {
      return _ref13.apply(this, arguments);
    };
  }());
};

exports.alive = alive;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy93b3JrZXJzLmpzIl0sIm5hbWVzIjpbImZldGNoQ291bnQiLCJjb25maWciLCJleHBlY3QiLCJhbGwiLCJ0eXBlIiwiY29kZSIsIldFQjNfUkVRVUlSRUQiLCJDT05UUkFDVF9SRVFVSVJFRCIsImFyZ3MiLCJBRERSRVNTX1JFUVVJUkVEIiwicGFuIiwid2ViMyIsImV0aCIsIkNvbnRyYWN0IiwiY29udHJhY3RzIiwiUGFuZG9yYSIsImFiaSIsImFkZHJlc3NlcyIsIm1ldGhvZHMiLCJ3b3JrZXJOb2Rlc0NvdW50IiwiY2FsbCIsImNvdW50IiwiTnVtYmVyIiwicGFyc2VJbnQiLCJmZXRjaEFkZHJlc3NCeUlkIiwiaWQiLCJ3b3JrZXJOb2RlcyIsImFkZHJlc3MiLCJTdHJpbmciLCJmZXRjaFN0YXRlIiwid29yIiwiV29ya2VyTm9kZSIsImN1cnJlbnRTdGF0ZSIsInN0YXRlIiwiZmV0Y2hBY3RpdmVKb2JBZGRyZXNzIiwiYWN0aXZlSm9iIiwiZmV0Y2hXb3JrZXIiLCJQcm9taXNlIiwiY3VycmVudEpvYiIsImpvYkRldGFpbHMiLCJqb2JTdGF0ZSIsImN1cnJlbnRKb2JTdGF0dXMiLCJmZXRjaFdvcmtlckJ5SWQiLCJ3b3JrZXIiLCJmZXRjaEFsbCIsInJlY29yZHMiLCJlcnJvciIsImkiLCJwdXNoIiwibWVzc2FnZSIsImZldGNoSWRsZUNvdW50IiwicmVkdWNlIiwiYWNjIiwiY3VyciIsImV2ZW50V29ya2VyTm9kZUNyZWF0ZWQiLCJvcHRpb25zIiwiY2FsbGJhY2tzIiwib25EYXRhIiwib25FcnJvciIsImNoYWluIiwiZGF0YSIsImNiIiwiZXZlbnQiLCJldmVudHMiLCJXb3JrZXJOb2RlQ3JlYXRlZCIsIm9uIiwicmV0dXJuVmFsdWVzIiwid29ya2VyTm9kZSIsImV2ZW50V29ya2VyTm9kZVN0YXRlQ2hhbmdlZCIsIlN0YXRlQ2hhbmdlZCIsImFsaXZlIiwid29ya2VyTm9kZUFkZHJlc3MiLCJmcm9tIiwicmVzb2x2ZSIsInJlamVjdCIsIndybiIsImdldEdhc1ByaWNlIiwiZ2FzUHJpY2UiLCJzZW5kIiwiZ2FzIiwicmVjZWlwdCIsInN0YXR1cyIsIlRSQU5TQUNUSU9OX1VOU1VDQ0VTU0ZVTCJdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7Ozs7O0FBU0E7Ozs7Ozs7QUFFQTs7QUFDQTs7QUFPQTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFFQTs7Ozs7O0FBTU8sSUFBTUEsVUFBVTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUEsMEJBQUc7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQU9DLFlBQUFBLE1BQVAsMkRBQWdCLEVBQWhCO0FBRXRCQyxZQUFBQSxNQUFNLENBQUNDLEdBQVAsQ0FBV0YsTUFBWCxFQUFtQjtBQUNmLHNCQUFRO0FBQ0pHLGdCQUFBQSxJQUFJLEVBQUUsUUFERjtBQUVKQyxnQkFBQUEsSUFBSSxFQUFFQztBQUZGLGVBRE87QUFLZix1Q0FBeUI7QUFDckJGLGdCQUFBQSxJQUFJLEVBQUUsUUFEZTtBQUVyQkMsZ0JBQUFBLElBQUksRUFBRUUseUJBRmU7QUFHckJDLGdCQUFBQSxJQUFJLEVBQUUsQ0FBQyxTQUFEO0FBSGUsZUFMVjtBQVVmLG1DQUFxQjtBQUNqQkosZ0JBQUFBLElBQUksRUFBRSxTQURXO0FBRWpCQyxnQkFBQUEsSUFBSSxFQUFFSSx3QkFGVztBQUdqQkQsZ0JBQUFBLElBQUksRUFBRSxDQUFDLFNBQUQ7QUFIVztBQVZOLGFBQW5CO0FBaUJNRSxZQUFBQSxHQW5CZ0IsR0FtQlYsSUFBSVQsTUFBTSxDQUFDVSxJQUFQLENBQVlDLEdBQVosQ0FBZ0JDLFFBQXBCLENBQTZCWixNQUFNLENBQUNhLFNBQVAsQ0FBaUJDLE9BQWpCLENBQXlCQyxHQUF0RCxFQUEyRGYsTUFBTSxDQUFDZ0IsU0FBUCxDQUFpQkYsT0FBNUUsQ0FuQlU7QUFBQTtBQUFBLG1CQW9CRkwsR0FBRyxDQUFDUSxPQUFKLENBQ2ZDLGdCQURlLEdBRWZDLElBRmUsRUFwQkU7O0FBQUE7QUFvQmhCQyxZQUFBQSxLQXBCZ0I7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QUFBO0FBd0JqRUMsY0FBQUEsUUF4QmlFO0FBeUJ2RUYsY0FBQUEsR0FBRyxDQUFDekQsT0FBSixDQUNLb0QsS0FETCxHQUVLUSxJQUZMLENBRVU7QUFDRk4sZ0JBQUFBLElBQUksRUFBSkEsSUFERTtBQUVGSyxnQkFBQUEsUUFBUSxFQUFSQSxRQUZFO0FBR0ZFLGdCQUFBQSxHQUFHLEVBQUU7QUFISCxlQUZWLEVBT0tkLEVBUEwsQ0FPUSxPQVBSLEVBT2lCUyxNQVBqQixFQVFLVCxFQVJMLENBUVEsU0FSUixFQVFtQixVQUFBZSxPQUFPLEVBQUk7QUFFdEIsb0JBQUkxRCxNQUFNLENBQUMwRCxPQUFPLENBQUNDLE1BQVQsQ0FBTixLQUEyQixDQUEvQixFQUFrQztBQUU5Qix5QkFBT1AsTUFBTSxDQUFDLHFCQUFTUSxnQ0FBVCxDQUFELENBQWI7QUFDSDs7QUFFRFQsZ0JBQUFBLE9BQU8sQ0FBQ08sT0FBRCxDQUFQO0FBQ0gsZUFoQkw7O0FBekJ1RTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQSxLQUFaOztBQUFBO0FBQUE7QUFBQTtBQUFBLE1BQTFDO0FBQUEsQ0FBZCIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogV29ya2VyTm9kZXMgcmVsYXRlZCBtZXRob2RzXG4gKiBUaGlzIGZpbGUgaXQgaXMgYSBwYXJ0IG9mIHRoZSBQYW5kb3JhIFB5cnJoYSBKYXZhc2NyaXB0IGxpYnJhcnlcbiAqIFxuICogQGZpbGUgd29ya2Vycy5qc1xuICogQGF1dGhvciBLb3N0aWFudHluIFNteXJub3YgPGtvc3R5c2hAZ21haWwuY29tPlxuICogQGRhdGUgMjAxOFxuICovXG5cbid1c2Ugc3RyaWN0JztcblxuaW1wb3J0ICogYXMgZXhwZWN0IGZyb20gJy4vaGVscGVycy9leHBlY3QnO1xuaW1wb3J0IHBqc0Vycm9yLCB7XG4gICAgQ09OVFJBQ1RfUkVRVUlSRUQsXG4gICAgQUREUkVTU19SRVFVSVJFRCxcbiAgICBXRUIzX1JFUVVJUkVELFxuICAgIFRSQU5TQUNUSU9OX1VOU1VDQ0VTU0ZVTFxufSBmcm9tICcuL2hlbHBlcnMvZXJyb3JzJztcblxuaW1wb3J0IHsgZmV0Y2hKb2JEZXRhaWxzIH0gZnJvbSAnLi9qb2JzJztcblxuLyoqXG4gKiBHZXQgd29ya2VyIG5vZGVzIGNvdW50IGZyb20gUGFuZG9yYSBjb250cmFjdFxuICogXG4gKiBAcGFyYW0ge09iamVjdH0gY29uZmlnIExpYnJhcnkgY29uZmlnIChwcm92aWRlZCBieSB0aGUgcHJveHkgYnV0IGNhbiBiZSBvdmVycmlkZGVuKVxuICogQHJldHVybnMge1Byb21pc2V9IEEgUHJvbWlzZSBvYmplY3QgcmVwcmVzZW50cyB0aGUge251bWJlcn0gXG4gKi9cbmV4cG9ydCBjb25zdCBmZXRjaENvdW50ID0gYXN5bmMgKGNvbmZpZyA9IHt9KSA9PiB7XG5cbiAgICBleHBlY3QuYWxsKGNvbmZpZywge1xuICAgICAgICAnd2ViMyc6IHtcbiAgICAgICAgICAgIHR5cGU6ICdvYmplY3QnLFxuICAgICAgICAgICAgY29kZTogV0VCM19SRVFVSVJFRFxuICAgICAgICB9LFxuICAgICAgICAnY29udHJhY3RzLlBhbmRvcmEuYWJpJzoge1xuICAgICAgICAgICAgdHlwZTogJ29iamVjdCcsXG4gICAgICAgICAgICBjb2RlOiBDT05UUkFDVF9SRVFVSVJFRCxcbiAgICAgICAgICAgIGFyZ3M6IFsnUGFuZG9yYSddXG4gICAgICAgIH0sXG4gICAgICAgICdhZGRyZXNzZXMuUGFuZG9yYSc6IHtcbiAgICAgICAgICAgIHR5cGU6ICdhZGRyZXNzJyxcbiAgICAgICAgICAgIGNvZGU6IEFERFJFU1NfUkVRVUlSRUQsXG4gICAgICAgICAgICBhcmdzOiBbJ1BhbmRvcmEnXVxuICAgICAgICB9XG4gICAgfSk7XG5cbiAgICBjb25zdCBwYW4gPSBuZXcgY29uZmlnLndlYjMuZXRoLkNvbnRyYWN0KGNvbmZpZy5jb250cmFjdHMuUGFuZG9yYS5hYmksIGNvbmZpZy5hZGRyZXNzZXMuUGFuZG9yYSk7XG4gICAgY29uc3QgY291bnQgPSBhd2FpdCBwYW4ubWV0aG9kc1xuICAgICAgICAud29ya2VyTm9kZXNDb3VudCgpXG4gICAgICAgIC5jYWxsKCk7XG5cbiAgICByZXR1cm4gTnVtYmVyLnBhcnNlSW50KGNvdW50LCAxMCk7XG59O1xuXG4vKipcbiAqIEdldCB3b3JrZXIgYWRkcmVzcyBmcm9tIFBhbmRvcmEgY29udHJhY3QgYnkgdGhlIHdvcmtlciBJZFxuICogXG4gKiBAcGFyYW0ge2ludGVnZXJ9IGlkIFdvcmtlciBJZFxuICogQHBhcmFtIHtPYmplY3R9IGNvbmZpZyBMaWJyYXJ5IGNvbmZpZyAocHJvdmlkZWQgYnkgdGhlIHByb3h5IGJ1dCBjYW4gYmUgb3ZlcnJpZGRlbilcbiAqIEByZXR1cm5zIHtQcm9taXNlfSBBIFByb21pc2Ugb2JqZWN0IHJlcHJlc2VudHMgdGhlIHtzdHJpbmd9IFxuICovXG5leHBvcnQgY29uc3QgZmV0Y2hBZGRyZXNzQnlJZCA9IGFzeW5jIChpZCwgY29uZmlnID0ge30pID0+IHtcblxuICAgIGV4cGVjdC5hbGwoeyBpZCB9LCB7XG4gICAgICAgICdpZCc6IHtcbiAgICAgICAgICAgIHR5cGU6ICdudW1iZXInXG4gICAgICAgIH1cbiAgICB9KTtcblxuICAgIGV4cGVjdC5hbGwoY29uZmlnLCB7XG4gICAgICAgICd3ZWIzJzoge1xuICAgICAgICAgICAgdHlwZTogJ29iamVjdCcsXG4gICAgICAgICAgICBjb2RlOiBXRUIzX1JFUVVJUkVEXG4gICAgICAgIH0sXG4gICAgICAgICdjb250cmFjdHMuUGFuZG9yYS5hYmknOiB7XG4gICAgICAgICAgICB0eXBlOiAnb2JqZWN0JyxcbiAgICAgICAgICAgIGNvZGU6IENPTlRSQUNUX1JFUVVJUkVELFxuICAgICAgICAgICAgYXJnczogWydQYW5kb3JhJ11cbiAgICAgICAgfSxcbiAgICAgICAgJ2FkZHJlc3Nlcy5QYW5kb3JhJzoge1xuICAgICAgICAgICAgdHlwZTogJ2FkZHJlc3MnLFxuICAgICAgICAgICAgY29kZTogQUREUkVTU19SRVFVSVJFRCxcbiAgICAgICAgICAgIGFyZ3M6IFsnUGFuZG9yYSddXG4gICAgICAgIH1cbiAgICB9KTtcblxuICAgIGNvbnN0IHBhbiA9IG5ldyBjb25maWcud2ViMy5ldGguQ29udHJhY3QoY29uZmlnLmNvbnRyYWN0cy5QYW5kb3JhLmFiaSwgY29uZmlnLmFkZHJlc3Nlcy5QYW5kb3JhKTtcbiAgICBjb25zdCBhZGRyZXNzID0gYXdhaXQgcGFuLm1ldGhvZHNcbiAgICAgICAgLndvcmtlck5vZGVzKGlkKVxuICAgICAgICAuY2FsbCgpO1xuXG4gICAgcmV0dXJuIFN0cmluZyhhZGRyZXNzKTtcbn07XG5cbi8qKlxuICogR2V0IHdvcmtlciBzdGF0ZSBmcm9tIFdvcmtlciBjb250cmFjdCBieSB0aGUgd29ya2VyIGFkZHJlc3NcbiAqIFxuICogQHBhcmFtIHtzdHJpbmd9IGFkZHJlc3MgXG4gKiBAcGFyYW0ge09iamVjdH0gY29uZmlnIExpYnJhcnkgY29uZmlnIChwcm92aWRlZCBieSB0aGUgcHJveHkgYnV0IGNhbiBiZSBvdmVycmlkZGVuKVxuICogQHJldHVybnMge1Byb21pc2V9IEEgUHJvbWlzZSBvYmplY3QgcmVwcmVzZW50cyB0aGUge251bWJlcn1cbiAqL1xuZXhwb3J0IGNvbnN0IGZldGNoU3RhdGUgPSBhc3luYyAoYWRkcmVzcyA9ICcnLCBjb25maWcgPSB7fSkgPT4ge1xuXG4gICAgZXhwZWN0LmFsbCh7IGFkZHJlc3MgfSwge1xuICAgICAgICAnYWRkcmVzcyc6IHtcbiAgICAgICAgICAgIHR5cGU6ICdhZGRyZXNzJ1xuICAgICAgICB9XG4gICAgfSk7XG5cbiAgICBleHBlY3QuYWxsKGNvbmZpZywge1xuICAgICAgICAnd2ViMyc6IHtcbiAgICAgICAgICAgIHR5cGU6ICdvYmplY3QnLFxuICAgICAgICAgICAgY29kZTogV0VCM19SRVFVSVJFRFxuICAgICAgICB9LFxuICAgICAgICAnY29udHJhY3RzLldvcmtlck5vZGUuYWJpJzoge1xuICAgICAgICAgICAgdHlwZTogJ29iamVjdCcsXG4gICAgICAgICAgICBjb2RlOiBDT05UUkFDVF9SRVFVSVJFRCxcbiAgICAgICAgICAgIGFyZ3M6IFsnV29ya2VyTm9kZSddXG4gICAgICAgIH1cbiAgICB9KTtcblxuICAgIGNvbnN0IHdvciA9IG5ldyBjb25maWcud2ViMy5ldGguQ29udHJhY3QoY29uZmlnLmNvbnRyYWN0cy5Xb3JrZXJOb2RlLmFiaSwgYWRkcmVzcyk7ICAgIFxuICAgIGNvbnN0IHN0YXRlID0gYXdhaXQgd29yLm1ldGhvZHNcbiAgICAgICAgLmN1cnJlbnRTdGF0ZSgpXG4gICAgICAgIC5jYWxsKCk7XG5cbiAgICByZXR1cm4gTnVtYmVyLnBhcnNlSW50KHN0YXRlLCAxMCk7XG59O1xuXG4vKipcbiAqIEdldCB3b3JrZXIncyBhY3RpdmUgam9iIGZyb20gV29ya2VyIGNvbnRyYWN0IGJ5IHRoZSB3b3JrZXIgYWRkcmVzc1xuICogXG4gKiBAcGFyYW0ge3N0cmluZ30gYWRkcmVzcyBcbiAqIEBwYXJhbSB7T2JqZWN0fSBjb25maWcgTGlicmFyeSBjb25maWcgKHByb3ZpZGVkIGJ5IHRoZSBwcm94eSBidXQgY2FuIGJlIG92ZXJyaWRkZW4pXG4gKiBAcmV0dXJucyB7UHJvbWlzZX0gQSBQcm9taXNlIG9iamVjdCByZXByZXNlbnRzIHRoZSB7c3RyaW5nfVxuICovXG5leHBvcnQgY29uc3QgZmV0Y2hBY3RpdmVKb2JBZGRyZXNzID0gYXN5bmMgKGFkZHJlc3MgPSAnJywgY29uZmlnID0ge30pID0+IHtcblxuICAgIGV4cGVjdC5hbGwoeyBhZGRyZXNzIH0sIHtcbiAgICAgICAgJ2FkZHJlc3MnOiB7XG4gICAgICAgICAgICB0eXBlOiAnYWRkcmVzcydcbiAgICAgICAgfVxuICAgIH0pO1xuXG4gICAgZXhwZWN0LmFsbChjb25maWcsIHtcbiAgICAgICAgJ3dlYjMnOiB7XG4gICAgICAgICAgICB0eXBlOiAnb2JqZWN0JyxcbiAgICAgICAgICAgIGNvZGU6IFdFQjNfUkVRVUlSRURcbiAgICAgICAgfSxcbiAgICAgICAgJ2NvbnRyYWN0cy5Xb3JrZXJOb2RlLmFiaSc6IHtcbiAgICAgICAgICAgIHR5cGU6ICdvYmplY3QnLFxuICAgICAgICAgICAgY29kZTogQ09OVFJBQ1RfUkVRVUlSRUQsXG4gICAgICAgICAgICBhcmdzOiBbJ1dvcmtlck5vZGUnXVxuICAgICAgICB9XG4gICAgfSk7XG5cbiAgICBjb25zdCB3b3IgPSBuZXcgY29uZmlnLndlYjMuZXRoLkNvbnRyYWN0KGNvbmZpZy5jb250cmFjdHMuV29ya2VyTm9kZS5hYmksIGFkZHJlc3MpO1xuICAgIGNvbnN0IGFjdGl2ZUpvYiA9IGF3YWl0IHdvci5tZXRob2RzXG4gICAgICAgIC5hY3RpdmVKb2IoKVxuICAgICAgICAuY2FsbCgpO1xuXG4gICAgcmV0dXJuIFN0cmluZyhhY3RpdmVKb2IsIDEwKTtcbn07XG5cbi8qKlxuICogR2V0IHdvcmtlciBieSB0aGUgd29ya2VyJ3MgYWRkcmVzc1xuICogXG4gKiBAcGFyYW0ge3N0cmluZ30gYWRkcmVzc1xuICogQHBhcmFtIHtPYmplY3R9IGNvbmZpZyBMaWJyYXJ5IGNvbmZpZyAocHJvdmlkZWQgYnkgdGhlIHByb3h5IGJ1dCBjYW4gYmUgb3ZlcnJpZGRlbilcbiAqIEByZXR1cm5zIHtQcm9taXNlfSBBIFByb21pc2Ugb2JqZWN0IHJlcHJlc2VudHMgdGhlIHtPYmplY3R9XG4gKi9cbmV4cG9ydCBjb25zdCBmZXRjaFdvcmtlciA9IGFzeW5jIChhZGRyZXNzID0gJycsIGNvbmZpZyA9IHt9KSA9PiB7XG4gICAgXG4gICAgY29uc3QgW1xuICAgICAgICBjdXJyZW50U3RhdGUsXG4gICAgICAgIGFjdGl2ZUpvYlxuICAgIF0gPSBhd2FpdCBQcm9taXNlLmFsbChbXG4gICAgICAgIGZldGNoU3RhdGUoYWRkcmVzcywgY29uZmlnKSxcbiAgICAgICAgZmV0Y2hBY3RpdmVKb2JBZGRyZXNzKGFkZHJlc3MsIGNvbmZpZylcbiAgICBdKTtcblxuXG4gICAgbGV0IGN1cnJlbnRKb2IgPSBhY3RpdmVKb2I7XG4gICAgbGV0IGpvYlN0YXRlOyAgICBcblxuICAgIC8vIENoZWNrIGlzIG5vdCAweDBcbiAgICBpZiAoK2FjdGl2ZUpvYiAhPT0gMCkge1xuXG4gICAgICAgIGNvbnN0IGpvYkRldGFpbHMgPSBhd2FpdCBmZXRjaEpvYkRldGFpbHMoYWN0aXZlSm9iLCBjb25maWcpO1xuICAgICAgICBqb2JTdGF0ZSA9IGpvYkRldGFpbHMuc3RhdGU7XG4gICAgfSBlbHNlIHtcbiAgICAgICAgY3VycmVudEpvYiA9IG51bGw7XG4gICAgICAgIGpvYlN0YXRlID0gLTE7XG4gICAgfVxuXG4gICAgcmV0dXJuIHtcbiAgICAgICAgYWRkcmVzcyxcbiAgICAgICAgY3VycmVudFN0YXRlLFxuICAgICAgICBjdXJyZW50Sm9iLFxuICAgICAgICBjdXJyZW50Sm9iU3RhdHVzOiBqb2JTdGF0ZVxuICAgIH07XG59O1xuXG4vKipcbiAqIEdldCB3b3JrZXIgYnkgdGhlIHdvcmtlcidzIGlkXG4gKiBcbiAqIEBwYXJhbSB7aW50ZWdlcn0gaWQgXG4gKiBAcGFyYW0ge09iamVjdH0gY29uZmlnIExpYnJhcnkgY29uZmlnIChwcm92aWRlZCBieSB0aGUgcHJveHkgYnV0IGNhbiBiZSBvdmVycmlkZGVuKVxuICogQHJldHVybnMge1Byb21pc2V9IEEgUHJvbWlzZSBvYmplY3QgcmVwcmVzZW50cyB0aGUge09iamVjdH1cbiAqL1xuZXhwb3J0IGNvbnN0IGZldGNoV29ya2VyQnlJZCA9IGFzeW5jIChpZCwgY29uZmlnID0ge30pID0+IHtcbiAgICBcbiAgICBjb25zdCBhZGRyZXNzID0gYXdhaXQgZmV0Y2hBZGRyZXNzQnlJZChpZCwgY29uZmlnKTtcbiAgICBjb25zdCB3b3JrZXIgPSBhd2FpdCBmZXRjaFdvcmtlcihhZGRyZXNzLCBjb25maWcpO1xuXG4gICAgcmV0dXJuIHtcbiAgICAgICAgaWQ6IGlkLFxuICAgICAgICAuLi53b3JrZXJcbiAgICB9O1xufTtcblxuLyoqXG4gKiBHZXQgYWxsIHdvcmtlcnNcbiAqIFxuICogQHBhcmFtIHtPYmplY3R9IGNvbmZpZyBMaWJyYXJ5IGNvbmZpZyAocHJvdmlkZWQgYnkgdGhlIHByb3h5IGJ1dCBjYW4gYmUgb3ZlcnJpZGRlbilcbiAqIEByZXR1cm5zIHtQcm9taXNlfSBBIFByb21pc2Ugb2JqZWN0IHJlcHJlc2VudHMgdGhlIHtudW1iZXJ9XG4gKi9cbmV4cG9ydCBjb25zdCBmZXRjaEFsbCA9IGFzeW5jIChjb25maWcgPSB7fSkgPT4ge1xuICAgIGxldCByZWNvcmRzID0gW107XG4gICAgbGV0IGVycm9yID0gW107XG5cbiAgICB0cnkge1xuXG4gICAgICAgIGNvbnN0IGNvdW50ID0gYXdhaXQgZmV0Y2hDb3VudChjb25maWcpOyAgICBcblxuICAgICAgICBmb3IgKGxldCBpPTA7IGkgPCBjb3VudDsgaSsrKSB7XG4gICAgICAgICAgICBcbiAgICAgICAgICAgIHRyeSB7XG5cbiAgICAgICAgICAgICAgICBjb25zdCB3b3JrZXIgPSBhd2FpdCBmZXRjaFdvcmtlckJ5SWQoaSwgY29uZmlnKTtcblxuICAgICAgICAgICAgICAgIHJlY29yZHMucHVzaCh7XG4gICAgICAgICAgICAgICAgICAgIGlkOiBpLFxuICAgICAgICAgICAgICAgICAgICAuLi53b3JrZXJcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH0gY2F0Y2goZXJyKSB7XG4gICAgICAgICAgICAgICAgZXJyb3IucHVzaCh7XG4gICAgICAgICAgICAgICAgICAgIGlkOiBpLFxuICAgICAgICAgICAgICAgICAgICBtZXNzYWdlOiBlcnIubWVzc2FnZVxuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfSAgICAgICAgXG4gICAgICAgIH1cbiAgICB9IGNhdGNoKGVycikge1xuICAgICAgICBlcnJvci5wdXNoKHtcbiAgICAgICAgICAgIGVycm9yOiBlcnIubWVzc2FnZVxuICAgICAgICB9KTtcbiAgICB9ICAgXG5cbiAgICByZXR1cm4ge1xuICAgICAgICByZWNvcmRzLFxuICAgICAgICBlcnJvclxuICAgIH07XG59O1xuXG4vKipcbiAqIEdldCBjb3VudCBvZiB3b3JrZXJzIHdpdGggXCJpZGxlXCIgc3RhdHVzXG4gKiBcbiAqIEBwYXJhbSB7T2JqZWN0fSBjb25maWcgTGlicmFyeSBjb25maWcgKHByb3ZpZGVkIGJ5IHRoZSBwcm94eSBidXQgY2FuIGJlIG92ZXJyaWRkZW4pXG4gKiBAcmV0dXJucyB7UHJvbWlzZX0gQSBQcm9taXNlIG9iamVjdCByZXByZXNlbnRzIHRoZSB7bnVtYmVyfVxuICovXG5leHBvcnQgY29uc3QgZmV0Y2hJZGxlQ291bnQgPSBhc3luYyAoY29uZmlnID0ge30pID0+IHtcbiAgICBjb25zdCBhbGwgPSBhd2FpdCBmZXRjaEFsbChjb25maWcpO1xuICAgIHJldHVybiBhbGwucmVjb3Jkcy5yZWR1Y2UoKGFjYywgY3VycikgPT4gKGN1cnIuY3VycmVudFN0YXRlID09PSAyID8gYWNjKzEgOiBhY2MpLCAwKTtcbn07XG5cbi8qKlxuICogSGFuZGxlIGV2ZW50IFdvcmtlck5vZGVDcmVhdGVkXG4gKiBcbiAqIEBwYXJhbSB7T2JqZWN0fSBvcHRpb25zIEV2ZW50IGhhbmRsZXIgb3B0aW9uc1xuICogQHBhcmFtIHtPYmplY3R9IGNvbmZpZyBMaWJyYXJ5IGNvbmZpZyAocHJvdmlkZWQgYnkgdGhlIHByb3h5IGJ1dCBjYW4gYmUgb3ZlcnJpZGRlbilcbiAqIEByZXR1cm5zIHtPYmplY3R9IE9iamVjdCB3aXRoIGNoYWluZWQgY2FsbGJhY2tzICNkYXRhIGFuZCAjZXJyb3JcbiAqL1xuZXhwb3J0IGNvbnN0IGV2ZW50V29ya2VyTm9kZUNyZWF0ZWQgPSAob3B0aW9ucyA9IHt9LCBjb25maWcgPSB7fSkgPT4ge1xuXG4gICAgZXhwZWN0LmFsbCh7IG9wdGlvbnMgfSwge1xuICAgICAgICAnb3B0aW9ucyc6IHtcbiAgICAgICAgICAgIHR5cGU6ICdvYmplY3QnXG4gICAgICAgIH1cbiAgICB9KTtcblxuICAgIGV4cGVjdC5hbGwoY29uZmlnLCB7XG4gICAgICAgICd3ZWIzJzoge1xuICAgICAgICAgICAgdHlwZTogJ29iamVjdCcsXG4gICAgICAgICAgICBjb2RlOiBXRUIzX1JFUVVJUkVEXG4gICAgICAgIH0sXG4gICAgICAgICdjb250cmFjdHMuUGFuZG9yYS5hYmknOiB7XG4gICAgICAgICAgICB0eXBlOiAnb2JqZWN0JyxcbiAgICAgICAgICAgIGNvZGU6IENPTlRSQUNUX1JFUVVJUkVELFxuICAgICAgICAgICAgYXJnczogWydQYW5kb3JhJ11cbiAgICAgICAgfSxcbiAgICAgICAgJ2FkZHJlc3Nlcy5QYW5kb3JhJzoge1xuICAgICAgICAgICAgdHlwZTogJ2FkZHJlc3MnLFxuICAgICAgICAgICAgY29kZTogQUREUkVTU19SRVFVSVJFRCxcbiAgICAgICAgICAgIGFyZ3M6IFsnUGFuZG9yYSddXG4gICAgICAgIH1cbiAgICB9KTtcblxuICAgIGNvbnN0IGNhbGxiYWNrcyA9IHtcbiAgICAgICAgb25EYXRhOiAoKSA9PiB7fSxcbiAgICAgICAgb25FcnJvcjogKCkgPT4ge31cbiAgICB9O1xuXG4gICAgY29uc3QgY2hhaW4gPSB7XG4gICAgICAgIGRhdGE6IChjYiA9ICgpID0+IHt9KSA9PiB7XG4gICAgICAgICAgICBjYWxsYmFja3Mub25EYXRhID0gY2I7XG4gICAgICAgICAgICByZXR1cm4gY2hhaW47XG4gICAgICAgIH0sXG4gICAgICAgIGVycm9yOiAoY2IgPSAoKSA9PiB7fSkgPT4ge1xuICAgICAgICAgICAgY2FsbGJhY2tzLm9uRXJyb3IgPSBjYjtcbiAgICAgICAgICAgIHJldHVybiBjaGFpbjtcbiAgICAgICAgfVxuICAgIH07XG5cbiAgICBjb25zdCBwYW4gPSBuZXcgY29uZmlnLndlYjMuZXRoLkNvbnRyYWN0KGNvbmZpZy5jb250cmFjdHMuUGFuZG9yYS5hYmksIGNvbmZpZy5hZGRyZXNzZXMuUGFuZG9yYSk7XG4gICAgY2hhaW4uZXZlbnQgPSBwYW4uZXZlbnRzLldvcmtlck5vZGVDcmVhdGVkKG9wdGlvbnMpXG4gICAgICAgIC5vbignZGF0YScsIGFzeW5jIGV2ZW50ID0+IHtcblxuICAgICAgICAgICAgdHJ5IHtcblxuICAgICAgICAgICAgICAgIGNvbnN0IHdvcmtlciA9IGF3YWl0IGZldGNoV29ya2VyKGV2ZW50LnJldHVyblZhbHVlcy53b3JrZXJOb2RlLCBjb25maWcpO1xuICAgICAgICAgICAgICAgIGNhbGxiYWNrcy5vbkRhdGEoe1xuICAgICAgICAgICAgICAgICAgICByZWNvcmRzOiBbd29ya2VyXSxcbiAgICAgICAgICAgICAgICAgICAgZXZlbnRcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH0gY2F0Y2goZXJyKSB7XG4gICAgICAgICAgICAgICAgY2FsbGJhY2tzLm9uRXJyb3IoZXJyKTtcbiAgICAgICAgICAgIH0gICAgICAgICAgICBcbiAgICAgICAgfSlcbiAgICAgICAgLm9uKCdlcnJvcicsIGNhbGxiYWNrcy5vbkVycm9yKTtcblxuICAgIHJldHVybiBjaGFpbjtcbn07XG5cbi8qKlxuICogSGFuZGxlIGV2ZW50IFN0YXRlQ2hhbmdlZCBmb3IgV29ya2VyTm9kZVxuICogXG4gKiBAcGFyYW0ge1N0cmluZ30gYWRkcmVzc1xuICogQHBhcmFtIHtPYmplY3R9IG9wdGlvbnNcbiAqIEBwYXJhbSB7T2JqZWN0fSBjb25maWcgTGlicmFyeSBjb25maWcgKHByb3ZpZGVkIGJ5IHRoZSBwcm94eSBidXQgY2FuIGJlIG92ZXJyaWRkZW4pXG4gKiBAcmV0dXJucyB7T2JqZWN0fSBPYmplY3Qgd2l0aCBjaGFpbmVkIGNhbGxiYWNrcyAjZGF0YSBhbmQgI2Vycm9yXG4gKi9cbmV4cG9ydCBjb25zdCBldmVudFdvcmtlck5vZGVTdGF0ZUNoYW5nZWQgPSAoYWRkcmVzcyA9ICcnLCBvcHRpb25zID0ge30sIGNvbmZpZyA9IHt9KSA9PiB7XG5cbiAgICBleHBlY3QuYWxsKHsgYWRkcmVzcyB9LCB7XG4gICAgICAgICdhZGRyZXNzJzoge1xuICAgICAgICAgICAgdHlwZTogJ2FkZHJlc3MnXG4gICAgICAgIH1cbiAgICB9KTtcblxuICAgIGV4cGVjdC5hbGwoY29uZmlnLCB7XG4gICAgICAgICd3ZWIzJzoge1xuICAgICAgICAgICAgdHlwZTogJ29iamVjdCcsXG4gICAgICAgICAgICBjb2RlOiBXRUIzX1JFUVVJUkVEXG4gICAgICAgIH0sXG4gICAgICAgICdjb250cmFjdHMuV29ya2VyTm9kZS5hYmknOiB7XG4gICAgICAgICAgICB0eXBlOiAnb2JqZWN0JyxcbiAgICAgICAgICAgIGNvZGU6IENPTlRSQUNUX1JFUVVJUkVELFxuICAgICAgICAgICAgYXJnczogWydXb3JrZXJOb2RlJ11cbiAgICAgICAgfVxuICAgIH0pO1xuXG4gICAgY29uc3QgY2FsbGJhY2tzID0ge1xuICAgICAgICBvbkRhdGE6ICgpID0+IHt9LFxuICAgICAgICBvbkVycm9yOiAoKSA9PiB7fVxuICAgIH07XG5cbiAgICBjb25zdCBjaGFpbiA9IHtcbiAgICAgICAgZGF0YTogKGNiID0gKCkgPT4ge30pID0+IHtcbiAgICAgICAgICAgIGNhbGxiYWNrcy5vbkRhdGEgPSBjYjtcbiAgICAgICAgICAgIHJldHVybiBjaGFpbjtcbiAgICAgICAgfSxcbiAgICAgICAgZXJyb3I6IChjYiA9ICgpID0+IHt9KSA9PiB7XG4gICAgICAgICAgICBjYWxsYmFja3Mub25FcnJvciA9IGNiO1xuICAgICAgICAgICAgcmV0dXJuIGNoYWluO1xuICAgICAgICB9XG4gICAgfTtcblxuICAgIGNvbnN0IHdvciA9IG5ldyBjb25maWcud2ViMy5ldGguQ29udHJhY3QoY29uZmlnLmNvbnRyYWN0cy5Xb3JrZXJOb2RlLmFiaSwgYWRkcmVzcyk7XG4gICAgY2hhaW4uZXZlbnQgPSB3b3IuZXZlbnRzLlN0YXRlQ2hhbmdlZChvcHRpb25zKVxuICAgICAgICAub24oJ2RhdGEnLCBhc3luYyBldmVudCA9PiB7XG5cbiAgICAgICAgICAgIHRyeSB7XG5cbiAgICAgICAgICAgICAgICBjb25zdCB3b3JrZXIgPSBhd2FpdCBmZXRjaFdvcmtlcihhZGRyZXNzLCBjb25maWcpO1xuICAgICAgICAgICAgICAgIGNhbGxiYWNrcy5vbkRhdGEoe1xuICAgICAgICAgICAgICAgICAgICByZWNvcmRzOiBbd29ya2VyXSxcbiAgICAgICAgICAgICAgICAgICAgZXZlbnRcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH0gY2F0Y2goZXJyKSB7XG4gICAgICAgICAgICAgICAgY2FsbGJhY2tzLm9uRXJyb3IoZXJyKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSlcbiAgICAgICAgLm9uKCdlcnJvcicsIGNhbGxiYWNrcy5vbkVycm9yKTtcblxuICAgIHJldHVybiBjaGFpbjtcbn07XG5cbi8qKlxuICogVHJhbnNpdGlvbiBvZiBhIFdvcmtlck5vZGUgdG8gdGhlIElkbGUgc3RhdGVcbiAqIFxuICogQHBhcmFtIHtTdHJpbmd9IHdvcmtlck5vZGVBZGRyZXNzIFxuICogQHBhcmFtIHtTdHJpbmd9IGZyb21cbiAqIEBwYXJhbSB7T2JqZWN0fSBjb25maWcgTGlicmFyeSBjb25maWcgKHByb3ZpZGVkIGJ5IHRoZSBwcm94eSBidXQgY2FuIGJlIG92ZXJyaWRkZW4pXG4gKiBAcmV0dXJucyB7UHJvbWlzZX0gUHJvbWlzZSBvYmplY3QgcmVzb2x2ZWQgdG8gYWRkIHN0YXR1cyAoYm9vbGVhbilcbiAqL1xuZXhwb3J0IGNvbnN0IGFsaXZlID0gKHdvcmtlck5vZGVBZGRyZXNzLCBmcm9tLCBjb25maWcgPSB7fSkgPT4gbmV3IFByb21pc2UoYXN5bmMgKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuXG4gICAgZXhwZWN0LmFsbCh7IHdvcmtlck5vZGVBZGRyZXNzLCBmcm9tIH0sIHtcbiAgICAgICAgJ3dvcmtlck5vZGVBZGRyZXNzJzoge1xuICAgICAgICAgICAgdHlwZTogJ2FkZHJlc3MnXG4gICAgICAgIH0sXG4gICAgICAgICdmcm9tJzoge1xuICAgICAgICAgICAgdHlwZTogJ2FkZHJlc3MnXG4gICAgICAgIH1cbiAgICB9KTtcblxuICAgIGV4cGVjdC5hbGwoY29uZmlnLCB7XG4gICAgICAgICd3ZWIzJzoge1xuICAgICAgICAgICAgdHlwZTogJ29iamVjdCcsXG4gICAgICAgICAgICBjb2RlOiBXRUIzX1JFUVVJUkVEXG4gICAgICAgIH0sXG4gICAgICAgICdjb250cmFjdHMuV29ya2VyTm9kZS5hYmknOiB7XG4gICAgICAgICAgICB0eXBlOiAnb2JqZWN0JyxcbiAgICAgICAgICAgIGNvZGU6IENPTlRSQUNUX1JFUVVJUkVELFxuICAgICAgICAgICAgYXJnczogWydXb3JrZXJOb2RlJ11cbiAgICAgICAgfVxuICAgIH0pO1xuXG4gICAgY29uc3Qgd3JuID0gbmV3IGNvbmZpZy53ZWIzLmV0aC5Db250cmFjdChjb25maWcuY29udHJhY3RzLldvcmtlck5vZGUuYWJpLCB3b3JrZXJOb2RlQWRkcmVzcyk7XG4gICAgY29uc3QgZ2FzUHJpY2UgPSBhd2FpdCBjb25maWcud2ViMy5ldGguZ2V0R2FzUHJpY2UoKTtcbiAgICB3cm4ubWV0aG9kc1xuICAgICAgICAuYWxpdmUoKVxuICAgICAgICAuc2VuZCh7XG4gICAgICAgICAgICBmcm9tLFxuICAgICAgICAgICAgZ2FzUHJpY2UsXG4gICAgICAgICAgICBnYXM6IDY3MDAwMDBcbiAgICAgICAgfSlcbiAgICAgICAgLm9uKCdlcnJvcicsIHJlamVjdClcbiAgICAgICAgLm9uKCdyZWNlaXB0JywgcmVjZWlwdCA9PiB7XG5cbiAgICAgICAgICAgIGlmIChOdW1iZXIocmVjZWlwdC5zdGF0dXMpID09PSAwKSB7XG5cbiAgICAgICAgICAgICAgICByZXR1cm4gcmVqZWN0KHBqc0Vycm9yKFRSQU5TQUNUSU9OX1VOU1VDQ0VTU0ZVTCkpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICByZXNvbHZlKHJlY2VpcHQpO1xuICAgICAgICB9KTtcbn0pO1xuIl19