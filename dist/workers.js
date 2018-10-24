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
exports.alive = exports.eventWorkerNodeStateChanged = exports.eventWorkerNodeCreated = exports.fetchJobProgress = exports.fetchIdleCount = exports.fetchAll = exports.fetchWorkerById = exports.fetchWorker = exports.fetchActiveJobAddress = exports.fetchState = exports.fetchAddressById = exports.fetchCount = void 0;

require("core-js/modules/es6.object.keys");

require("core-js/modules/es7.symbol.async-iterator");

require("core-js/modules/es6.symbol");

require("core-js/modules/es6.promise");

require("core-js/modules/web.dom.iterable");

require("core-js/modules/es6.array.iterator");

require("core-js/modules/es6.string.iterator");

require("core-js/modules/es6.number.constructor");

require("core-js/modules/es6.number.parse-int");

require("regenerator-runtime/runtime");

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
 * @returns {Promise} A Promise object represents the {String} 
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
 * @param {String} address 
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
 * @param {String} address 
 * @param {Object} config Library config (provided by the proxy but can be overridden)
 * @returns {Promise} A Promise object represents the {String}
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
 * @param {String} address
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
 * Fetch progress of active job for the worker
 *
 * @param {String} address Worker's address
 * @param {Object} config Library config (provided by the proxy but can be overridden)
 * @returns {Promise<{Number}>} A Promise object represents the progress value
 */


exports.fetchIdleCount = fetchIdleCount;

var fetchJobProgress =
/*#__PURE__*/
function () {
  var _ref11 = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee9() {
    var address,
        config,
        wor,
        state,
        _args9 = arguments;
    return regeneratorRuntime.wrap(function _callee9$(_context9) {
      while (1) {
        switch (_context9.prev = _context9.next) {
          case 0:
            address = _args9.length > 0 && _args9[0] !== undefined ? _args9[0] : '';
            config = _args9.length > 1 && _args9[1] !== undefined ? _args9[1] : {};
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
            _context9.next = 7;
            return wor.methods.jobProgress().call();

          case 7:
            state = _context9.sent;
            return _context9.abrupt("return", Math.ceil(Number.parseInt(state, 10)));

          case 9:
          case "end":
            return _context9.stop();
        }
      }
    }, _callee9, this);
  }));

  return function fetchJobProgress() {
    return _ref11.apply(this, arguments);
  };
}();
/**
 * Handle event WorkerNodeCreated
 * 
 * @param {Object} options Event handler options
 * @param {Object} config Library config (provided by the proxy but can be overridden)
 * @returns {Promise<{Object}>} PPromise object resolved to the object with chained callbacks #data and #error
 */


exports.fetchJobProgress = fetchJobProgress;

var eventWorkerNodeCreated =
/*#__PURE__*/
function () {
  var _ref12 = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee11() {
    var options,
        config,
        callbacks,
        chain,
        pan,
        _args11 = arguments;
    return regeneratorRuntime.wrap(function _callee11$(_context11) {
      while (1) {
        switch (_context11.prev = _context11.next) {
          case 0:
            options = _args11.length > 0 && _args11[0] !== undefined ? _args11[0] : {};
            config = _args11.length > 1 && _args11[1] !== undefined ? _args11[1] : {};
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
            callbacks = {
              onData: function onData() {},
              onError: function onError() {}
            };
            chain = {
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
            pan = new config.web3.eth.Contract(config.contracts.Pandora.abi, config.addresses.Pandora);
            chain.event = [];
            chain.event[0] = pan.events.WorkerNodeCreated(options).on('data',
            /*#__PURE__*/
            function () {
              var _ref13 = _asyncToGenerator(
              /*#__PURE__*/
              regeneratorRuntime.mark(function _callee10(event) {
                var worker;
                return regeneratorRuntime.wrap(function _callee10$(_context10) {
                  while (1) {
                    switch (_context10.prev = _context10.next) {
                      case 0:
                        _context10.prev = 0;
                        _context10.next = 3;
                        return fetchWorker(event.returnValues.workerNode, config);

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

              return function (_x3) {
                return _ref13.apply(this, arguments);
              };
            }()).on('error', callbacks.onError);
            chain.event[0].name = 'WorkerNodeCreated';
            return _context11.abrupt("return", chain);

          case 11:
          case "end":
            return _context11.stop();
        }
      }
    }, _callee11, this);
  }));

  return function eventWorkerNodeCreated() {
    return _ref12.apply(this, arguments);
  };
}();
/**
 * Handle event StateChanged for WorkerNode
 * 
 * @param {String} address
 * @param {Object} options
 * @param {Object} config Library config (provided by the proxy but can be overridden)
 * @returns {Promise<{Object}>} PPromise object resolved to the object with chained callbacks #data and #error
 */


exports.eventWorkerNodeCreated = eventWorkerNodeCreated;

var eventWorkerNodeStateChanged =
/*#__PURE__*/
function () {
  var _ref14 = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee13() {
    var address,
        options,
        config,
        callbacks,
        chain,
        wor,
        _args13 = arguments;
    return regeneratorRuntime.wrap(function _callee13$(_context13) {
      while (1) {
        switch (_context13.prev = _context13.next) {
          case 0:
            address = _args13.length > 0 && _args13[0] !== undefined ? _args13[0] : '';
            options = _args13.length > 1 && _args13[1] !== undefined ? _args13[1] : {};
            config = _args13.length > 2 && _args13[2] !== undefined ? _args13[2] : {};
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
            callbacks = {
              onData: function onData() {},
              onError: function onError() {}
            };
            chain = {
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
            wor = new config.web3.eth.Contract(config.contracts.WorkerNode.abi, address);
            chain.event = [];
            chain.event[0] = wor.events.StateChanged(options).on('data',
            /*#__PURE__*/
            function () {
              var _ref15 = _asyncToGenerator(
              /*#__PURE__*/
              regeneratorRuntime.mark(function _callee12(event) {
                var worker;
                return regeneratorRuntime.wrap(function _callee12$(_context12) {
                  while (1) {
                    switch (_context12.prev = _context12.next) {
                      case 0:
                        _context12.prev = 0;
                        _context12.next = 3;
                        return fetchWorker(address, config);

                      case 3:
                        worker = _context12.sent;
                        callbacks.onData({
                          records: [worker],
                          event: event
                        });
                        _context12.next = 10;
                        break;

                      case 7:
                        _context12.prev = 7;
                        _context12.t0 = _context12["catch"](0);
                        callbacks.onError(_context12.t0);

                      case 10:
                      case "end":
                        return _context12.stop();
                    }
                  }
                }, _callee12, this, [[0, 7]]);
              }));

              return function (_x4) {
                return _ref15.apply(this, arguments);
              };
            }()).on('error', callbacks.onError);
            chain.event[0].name = 'StateChanged';
            return _context13.abrupt("return", chain);

          case 12:
          case "end":
            return _context13.stop();
        }
      }
    }, _callee13, this);
  }));

  return function eventWorkerNodeStateChanged() {
    return _ref14.apply(this, arguments);
  };
}();
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
    var _ref16 = _asyncToGenerator(
    /*#__PURE__*/
    regeneratorRuntime.mark(function _callee14(resolve, reject) {
      var wrn, gasPrice;
      return regeneratorRuntime.wrap(function _callee14$(_context14) {
        while (1) {
          switch (_context14.prev = _context14.next) {
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
              _context14.next = 5;
              return config.web3.eth.getGasPrice();

            case 5:
              gasPrice = _context14.sent;
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
              return _context14.stop();
          }
        }
      }, _callee14, this);
    }));

    return function (_x5, _x6) {
      return _ref16.apply(this, arguments);
    };
  }());
};

exports.alive = alive;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy93b3JrZXJzLmpzIl0sIm5hbWVzIjpbImZldGNoQ291bnQiLCJjb25maWciLCJleHBlY3QiLCJhbGwiLCJ0eXBlIiwiY29kZSIsIldFQjNfUkVRVUlSRUQiLCJDT05UUkFDVF9SRVFVSVJFRCIsImFyZ3MiLCJBRERSRVNTX1JFUVVJUkVEIiwicGFuIiwid2ViMyIsImV0aCIsIkNvbnRyYWN0IiwiY29udHJhY3RzIiwiUGFuZG9yYSIsImFiaSIsImFkZHJlc3NlcyIsIm1ldGhvZHMiLCJ3b3JrZXJOb2Rlc0NvdW50IiwiY2FsbCIsImNvdW50IiwiTnVtYmVyIiwicGFyc2VJbnQiLCJmZXRjaEFkZHJlc3NCeUlkIiwiaWQiLCJ3b3JrZXJOb2RlcyIsImFkZHJlc3MiLCJTdHJpbmciLCJmZXRjaFN0YXRlIiwid29yIiwiV29ya2VyTm9kZSIsImN1cnJlbnRTdGF0ZSIsInN0YXRlIiwiZmV0Y2hBY3RpdmVKb2JBZGRyZXNzIiwiYWN0aXZlSm9iIiwiZmV0Y2hXb3JrZXIiLCJQcm9taXNlIiwiY3VycmVudEpvYiIsImpvYkRldGFpbHMiLCJqb2JTdGF0ZSIsImN1cnJlbnRKb2JTdGF0dXMiLCJmZXRjaFdvcmtlckJ5SWQiLCJ3b3JrZXIiLCJmZXRjaEFsbCIsInJlY29yZHMiLCJlcnJvciIsImkiLCJwdXNoIiwibWVzc2FnZSIsImZldGNoSWRsZUNvdW50IiwicmVkdWNlIiwiYWNjIiwiY3VyciIsImZldGNoSm9iUHJvZ3Jlc3MiLCJqb2JQcm9ncmVzcyIsIk1hdGgiLCJjZWlsIiwiZXZlbnRXb3JrZXJOb2RlQ3JlYXRlZCIsIm9wdGlvbnMiLCJjYWxsYmFja3MiLCJvbkRhdGEiLCJvbkVycm9yIiwiY2hhaW4iLCJkYXRhIiwiY2IiLCJldmVudCIsImV2ZW50cyIsIldvcmtlck5vZGVDcmVhdGVkIiwib24iLCJyZXR1cm5WYWx1ZXMiLCJ3b3JrZXJOb2RlIiwibmFtZSIsImV2ZW50V29ya2VyTm9kZVN0YXRlQ2hhbmdlZCIsIlN0YXRlQ2hhbmdlZCIsImFsaXZlIiwid29ya2VyTm9kZUFkZHJlc3MiLCJmcm9tIiwicmVzb2x2ZSIsInJlamVjdCIsIndybiIsImdldEdhc1ByaWNlIiwiZ2FzUHJpY2UiLCJzZW5kIiwiZ2FzIiwicmVjZWlwdCIsInN0YXR1cyIsIlRSQU5TQUNUSU9OX1VOU1VDQ0VTU0ZVTCJdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7Ozs7O0FBU0E7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUVBOztBQUNBOztBQU9BOzs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUVBOzs7Ozs7QUFNTyxJQUFNQSxVQUFVO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQSwwQkFBRztBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBT0MsWUFBQUEsTUFBUCwyREFBZ0IsRUFBaEI7QUFFdEJDLFlBQUFBLE1BQU0sQ0FBQ0MsR0FBUCxDQUFXRixNQUFYLEVBQW1CO0FBQ2Ysc0JBQVE7QUFDSkcsZ0JBQUFBLElBQUksRUFBRSxRQURGO0FBRUpDLGdCQUFBQSxJQUFJLEVBQUVDO0FBRkYsZUFETztBQUtmLHVDQUF5QjtBQUNyQkYsZ0JBQUFBLElBQUksRUFBRSxRQURlO0FBRXJCQyxnQkFBQUEsSUFBSSxFQUFFRSx5QkFGZTtBQUdyQkMsZ0JBQUFBLElBQUksRUFBRSxDQUFDLFNBQUQ7QUFIZSxlQUxWO0FBVWYsbUNBQXFCO0FBQ2pCSixnQkFBQUEsSUFBSSxFQUFFLFNBRFc7QUFFakJDLGdCQUFBQSxJQUFJLEVBQUVJLHdCQUZXO0FBR2pCRCxnQkFBQUEsSUFBSSxFQUFFLENBQUMsU0FBRDtBQUhXO0FBVk4sYUFBbkI7QUFpQk1FLFlBQUFBLEdBbkJnQixHQW1CVixJQUFJVCxNQUFNLENBQUNVLElBQVAsQ0FBWUMsR0FBWixDQUFnQkMsUUFBcEIsQ0FBNkJaLE1BQU0sQ0FBQ2EsU0FBUCxDQUFpQkMsT0FBakIsQ0FBeUJDLEdBQXRELEVBQTJEZixNQUFNLENBQUNnQixTQUFQLENBQWlCRixPQUE1RSxDQW5CVTtBQUFBO0FBQUEsbUJBb0JG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QUZWLEVBT0tmLEVBUEwsQ0FPUSxPQVBSLEVBT2lCVSxNQVBqQixFQVFLVixFQVJMLENBUVEsU0FSUixFQVFtQixVQUFBZ0IsT0FBTyxFQUFJO0FBRXRCLG9CQUFJL0QsTUFBTSxDQUFDK0QsT0FBTyxDQUFDQyxNQUFULENBQU4sS0FBMkIsQ0FBL0IsRUFBa0M7QUFFOUIseUJBQU9QLE1BQU0sQ0FBQyxxQkFBU1EsZ0NBQVQsQ0FBRCxDQUFiO0FBQ0g7O0FBRURULGdCQUFBQSxPQUFPLENBQUNPLE9BQUQsQ0FBUDtBQUNILGVBaEJMOztBQXpCdUU7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUEsS0FBWjs7QUFBQTtBQUFBO0FBQUE7QUFBQSxNQUExQztBQUFBLENBQWQiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIFdvcmtlck5vZGVzIHJlbGF0ZWQgbWV0aG9kc1xuICogVGhpcyBmaWxlIGl0IGlzIGEgcGFydCBvZiB0aGUgUGFuZG9yYSBQeXJyaGEgSmF2YXNjcmlwdCBsaWJyYXJ5XG4gKiBcbiAqIEBmaWxlIHdvcmtlcnMuanNcbiAqIEBhdXRob3IgS29zdGlhbnR5biBTbXlybm92IDxrb3N0eXNoQGdtYWlsLmNvbT5cbiAqIEBkYXRlIDIwMThcbiAqL1xuXG4ndXNlIHN0cmljdCc7XG5cbmltcG9ydCAqIGFzIGV4cGVjdCBmcm9tICcuL2hlbHBlcnMvZXhwZWN0JztcbmltcG9ydCBwanNFcnJvciwge1xuICAgIENPTlRSQUNUX1JFUVVJUkVELFxuICAgIEFERFJFU1NfUkVRVUlSRUQsXG4gICAgV0VCM19SRVFVSVJFRCxcbiAgICBUUkFOU0FDVElPTl9VTlNVQ0NFU1NGVUxcbn0gZnJvbSAnLi9oZWxwZXJzL2Vycm9ycyc7XG5cbmltcG9ydCB7IGZldGNoSm9iRGV0YWlscyB9IGZyb20gJy4vam9icyc7XG5cbi8qKlxuICogR2V0IHdvcmtlciBub2RlcyBjb3VudCBmcm9tIFBhbmRvcmEgY29udHJhY3RcbiAqIFxuICogQHBhcmFtIHtPYmplY3R9IGNvbmZpZyBMaWJyYXJ5IGNvbmZpZyAocHJvdmlkZWQgYnkgdGhlIHByb3h5IGJ1dCBjYW4gYmUgb3ZlcnJpZGRlbilcbiAqIEByZXR1cm5zIHtQcm9taXNlfSBBIFByb21pc2Ugb2JqZWN0IHJlcHJlc2VudHMgdGhlIHtudW1iZXJ9IFxuICovXG5leHBvcnQgY29uc3QgZmV0Y2hDb3VudCA9IGFzeW5jIChjb25maWcgPSB7fSkgPT4ge1xuXG4gICAgZXhwZWN0LmFsbChjb25maWcsIHtcbiAgICAgICAgJ3dlYjMnOiB7XG4gICAgICAgICAgICB0eXBlOiAnb2JqZWN0JyxcbiAgICAgICAgICAgIGNvZGU6IFdFQjNfUkVRVUlSRURcbiAgICAgICAgfSxcbiAgICAgICAgJ2NvbnRyYWN0cy5QYW5kb3JhLmFiaSc6IHtcbiAgICAgICAgICAgIHR5cGU6ICdvYmplY3QnLFxuICAgICAgICAgICAgY29kZTogQ09OVFJBQ1RfUkVRVUlSRUQsXG4gICAgICAgICAgICBhcmdzOiBbJ1BhbmRvcmEnXVxuICAgICAgICB9LFxuICAgICAgICAnYWRkcmVzc2VzLlBhbmRvcmEnOiB7XG4gICAgICAgICAgICB0eXBlOiAnYWRkcmVzcycsXG4gICAgICAgICAgICBjb2RlOiBBRERSRVNTX1JFUVVJUkVELFxuICAgICAgICAgICAgYXJnczogWydQYW5kb3JhJ11cbiAgICAgICAgfVxuICAgIH0pO1xuXG4gICAgY29uc3QgcGFuID0gbmV3IGNvbmZpZy53ZWIzLmV0aC5Db250cmFjdChjb25maWcuY29udHJhY3RzLlBhbmRvcmEuYWJpLCBjb25maWcuYWRkcmVzc2VzLlBhbmRvcmEpO1xuICAgIGNvbnN0IGNvdW50ID0gYXdhaXQgcGFuLm1ldGhvZHNcbiAgICAgICAgLndvcmtlck5vZGVzQ291bnQoKVxuICAgICAgICAuY2FsbCgpO1xuXG4gICAgcmV0dXJuIE51bWJlci5wYXJzZUludChjb3VudCwgMTApO1xufTtcblxuLyoqXG4gKiBHZXQgd29ya2VyIGFkZHJlc3MgZnJvbSBQYW5kb3JhIGNvbnRyYWN0IGJ5IHRoZSB3b3JrZXIgSWRcbiAqIFxuICogQHBhcmFtIHtpbnRlZ2VyfSBpZCBXb3JrZXIgSWRcbiAqIEBwYXJhbSB7T2JqZWN0fSBjb25maWcgTGlicmFyeSBjb25maWcgKHByb3ZpZGVkIGJ5IHRoZSBwcm94eSBidXQgY2FuIGJlIG92ZXJyaWRkZW4pXG4gKiBAcmV0dXJucyB7UHJvbWlzZX0gQSBQcm9taXNlIG9iamVjdCByZXByZXNlbnRzIHRoZSB7U3RyaW5nfSBcbiAqL1xuZXhwb3J0IGNvbnN0IGZldGNoQWRkcmVzc0J5SWQgPSBhc3luYyAoaWQsIGNvbmZpZyA9IHt9KSA9PiB7XG5cbiAgICBleHBlY3QuYWxsKHsgaWQgfSwge1xuICAgICAgICAnaWQnOiB7XG4gICAgICAgICAgICB0eXBlOiAnbnVtYmVyJ1xuICAgICAgICB9XG4gICAgfSk7XG5cbiAgICBleHBlY3QuYWxsKGNvbmZpZywge1xuICAgICAgICAnd2ViMyc6IHtcbiAgICAgICAgICAgIHR5cGU6ICdvYmplY3QnLFxuICAgICAgICAgICAgY29kZTogV0VCM19SRVFVSVJFRFxuICAgICAgICB9LFxuICAgICAgICAnY29udHJhY3RzLlBhbmRvcmEuYWJpJzoge1xuICAgICAgICAgICAgdHlwZTogJ29iamVjdCcsXG4gICAgICAgICAgICBjb2RlOiBDT05UUkFDVF9SRVFVSVJFRCxcbiAgICAgICAgICAgIGFyZ3M6IFsnUGFuZG9yYSddXG4gICAgICAgIH0sXG4gICAgICAgICdhZGRyZXNzZXMuUGFuZG9yYSc6IHtcbiAgICAgICAgICAgIHR5cGU6ICdhZGRyZXNzJyxcbiAgICAgICAgICAgIGNvZGU6IEFERFJFU1NfUkVRVUlSRUQsXG4gICAgICAgICAgICBhcmdzOiBbJ1BhbmRvcmEnXVxuICAgICAgICB9XG4gICAgfSk7XG5cbiAgICBjb25zdCBwYW4gPSBuZXcgY29uZmlnLndlYjMuZXRoLkNvbnRyYWN0KGNvbmZpZy5jb250cmFjdHMuUGFuZG9yYS5hYmksIGNvbmZpZy5hZGRyZXNzZXMuUGFuZG9yYSk7XG4gICAgY29uc3QgYWRkcmVzcyA9IGF3YWl0IHBhbi5tZXRob2RzXG4gICAgICAgIC53b3JrZXJOb2RlcyhpZClcbiAgICAgICAgLmNhbGwoKTtcblxuICAgIHJldHVybiBTdHJpbmcoYWRkcmVzcyk7XG59O1xuXG4vKipcbiAqIEdldCB3b3JrZXIgc3RhdGUgZnJvbSBXb3JrZXIgY29udHJhY3QgYnkgdGhlIHdvcmtlciBhZGRyZXNzXG4gKiBcbiAqIEBwYXJhbSB7U3RyaW5nfSBhZGRyZXNzIFxuICogQHBhcmFtIHtPYmplY3R9IGNvbmZpZyBMaWJyYXJ5IGNvbmZpZyAocHJvdmlkZWQgYnkgdGhlIHByb3h5IGJ1dCBjYW4gYmUgb3ZlcnJpZGRlbilcbiAqIEByZXR1cm5zIHtQcm9taXNlfSBBIFByb21pc2Ugb2JqZWN0IHJlcHJlc2VudHMgdGhlIHtudW1iZXJ9XG4gKi9cbmV4cG9ydCBjb25zdCBmZXRjaFN0YXRlID0gYXN5bmMgKGFkZHJlc3MgPSAnJywgY29uZmlnID0ge30pID0+IHtcblxuICAgIGV4cGVjdC5hbGwoeyBhZGRyZXNzIH0sIHtcbiAgICAgICAgJ2FkZHJlc3MnOiB7XG4gICAgICAgICAgICB0eXBlOiAnYWRkcmVzcydcbiAgICAgICAgfVxuICAgIH0pO1xuXG4gICAgZXhwZWN0LmFsbChjb25maWcsIHtcbiAgICAgICAgJ3dlYjMnOiB7XG4gICAgICAgICAgICB0eXBlOiAnb2JqZWN0JyxcbiAgICAgICAgICAgIGNvZGU6IFdFQjNfUkVRVUlSRURcbiAgICAgICAgfSxcbiAgICAgICAgJ2NvbnRyYWN0cy5Xb3JrZXJOb2RlLmFiaSc6IHtcbiAgICAgICAgICAgIHR5cGU6ICdvYmplY3QnLFxuICAgICAgICAgICAgY29kZTogQ09OVFJBQ1RfUkVRVUlSRUQsXG4gICAgICAgICAgICBhcmdzOiBbJ1dvcmtlck5vZGUnXVxuICAgICAgICB9XG4gICAgfSk7XG5cbiAgICBjb25zdCB3b3IgPSBuZXcgY29uZmlnLndlYjMuZXRoLkNvbnRyYWN0KGNvbmZpZy5jb250cmFjdHMuV29ya2VyTm9kZS5hYmksIGFkZHJlc3MpOyAgICBcbiAgICBjb25zdCBzdGF0ZSA9IGF3YWl0IHdvci5tZXRob2RzXG4gICAgICAgIC5jdXJyZW50U3RhdGUoKVxuICAgICAgICAuY2FsbCgpO1xuXG4gICAgcmV0dXJuIE51bWJlci5wYXJzZUludChzdGF0ZSwgMTApO1xufTtcblxuLyoqXG4gKiBHZXQgd29ya2VyJ3MgYWN0aXZlIGpvYiBmcm9tIFdvcmtlciBjb250cmFjdCBieSB0aGUgd29ya2VyIGFkZHJlc3NcbiAqIFxuICogQHBhcmFtIHtTdHJpbmd9IGFkZHJlc3MgXG4gKiBAcGFyYW0ge09iamVjdH0gY29uZmlnIExpYnJhcnkgY29uZmlnIChwcm92aWRlZCBieSB0aGUgcHJveHkgYnV0IGNhbiBiZSBvdmVycmlkZGVuKVxuICogQHJldHVybnMge1Byb21pc2V9IEEgUHJvbWlzZSBvYmplY3QgcmVwcmVzZW50cyB0aGUge1N0cmluZ31cbiAqL1xuZXhwb3J0IGNvbnN0IGZldGNoQWN0aXZlSm9iQWRkcmVzcyA9IGFzeW5jIChhZGRyZXNzID0gJycsIGNvbmZpZyA9IHt9KSA9PiB7XG5cbiAgICBleHBlY3QuYWxsKHsgYWRkcmVzcyB9LCB7XG4gICAgICAgICdhZGRyZXNzJzoge1xuICAgICAgICAgICAgdHlwZTogJ2FkZHJlc3MnXG4gICAgICAgIH1cbiAgICB9KTtcblxuICAgIGV4cGVjdC5hbGwoY29uZmlnLCB7XG4gICAgICAgICd3ZWIzJzoge1xuICAgICAgICAgICAgdHlwZTogJ29iamVjdCcsXG4gICAgICAgICAgICBjb2RlOiBXRUIzX1JFUVVJUkVEXG4gICAgICAgIH0sXG4gICAgICAgICdjb250cmFjdHMuV29ya2VyTm9kZS5hYmknOiB7XG4gICAgICAgICAgICB0eXBlOiAnb2JqZWN0JyxcbiAgICAgICAgICAgIGNvZGU6IENPTlRSQUNUX1JFUVVJUkVELFxuICAgICAgICAgICAgYXJnczogWydXb3JrZXJOb2RlJ11cbiAgICAgICAgfVxuICAgIH0pO1xuXG4gICAgY29uc3Qgd29yID0gbmV3IGNvbmZpZy53ZWIzLmV0aC5Db250cmFjdChjb25maWcuY29udHJhY3RzLldvcmtlck5vZGUuYWJpLCBhZGRyZXNzKTtcbiAgICBjb25zdCBhY3RpdmVKb2IgPSBhd2FpdCB3b3IubWV0aG9kc1xuICAgICAgICAuYWN0aXZlSm9iKClcbiAgICAgICAgLmNhbGwoKTtcblxuICAgIHJldHVybiBTdHJpbmcoYWN0aXZlSm9iLCAxMCk7XG59O1xuXG4vKipcbiAqIEdldCB3b3JrZXIgYnkgdGhlIHdvcmtlcidzIGFkZHJlc3NcbiAqIFxuICogQHBhcmFtIHtTdHJpbmd9IGFkZHJlc3NcbiAqIEBwYXJhbSB7T2JqZWN0fSBjb25maWcgTGlicmFyeSBjb25maWcgKHByb3ZpZGVkIGJ5IHRoZSBwcm94eSBidXQgY2FuIGJlIG92ZXJyaWRkZW4pXG4gKiBAcmV0dXJucyB7UHJvbWlzZX0gQSBQcm9taXNlIG9iamVjdCByZXByZXNlbnRzIHRoZSB7T2JqZWN0fVxuICovXG5leHBvcnQgY29uc3QgZmV0Y2hXb3JrZXIgPSBhc3luYyAoYWRkcmVzcyA9ICcnLCBjb25maWcgPSB7fSkgPT4ge1xuICAgIFxuICAgIGNvbnN0IFtcbiAgICAgICAgY3VycmVudFN0YXRlLFxuICAgICAgICBhY3RpdmVKb2JcbiAgICBdID0gYXdhaXQgUHJvbWlzZS5hbGwoW1xuICAgICAgICBmZXRjaFN0YXRlKGFkZHJlc3MsIGNvbmZpZyksXG4gICAgICAgIGZldGNoQWN0aXZlSm9iQWRkcmVzcyhhZGRyZXNzLCBjb25maWcpXG4gICAgXSk7XG5cblxuICAgIGxldCBjdXJyZW50Sm9iID0gYWN0aXZlSm9iO1xuICAgIGxldCBqb2JTdGF0ZTsgICAgXG5cbiAgICAvLyBDaGVjayBpcyBub3QgMHgwXG4gICAgaWYgKCthY3RpdmVKb2IgIT09IDApIHtcblxuICAgICAgICBjb25zdCBqb2JEZXRhaWxzID0gYXdhaXQgZmV0Y2hKb2JEZXRhaWxzKGFjdGl2ZUpvYiwgY29uZmlnKTtcbiAgICAgICAgam9iU3RhdGUgPSBqb2JEZXRhaWxzLnN0YXRlO1xuICAgIH0gZWxzZSB7XG4gICAgICAgIGN1cnJlbnRKb2IgPSBudWxsO1xuICAgICAgICBqb2JTdGF0ZSA9IC0xO1xuICAgIH1cblxuICAgIHJldHVybiB7XG4gICAgICAgIGFkZHJlc3MsXG4gICAgICAgIGN1cnJlbnRTdGF0ZSxcbiAgICAgICAgY3VycmVudEpvYixcbiAgICAgICAgY3VycmVudEpvYlN0YXR1czogam9iU3RhdGVcbiAgICB9O1xufTtcblxuLyoqXG4gKiBHZXQgd29ya2VyIGJ5IHRoZSB3b3JrZXIncyBpZFxuICogXG4gKiBAcGFyYW0ge2ludGVnZXJ9IGlkIFxuICogQHBhcmFtIHtPYmplY3R9IGNvbmZpZyBMaWJyYXJ5IGNvbmZpZyAocHJvdmlkZWQgYnkgdGhlIHByb3h5IGJ1dCBjYW4gYmUgb3ZlcnJpZGRlbilcbiAqIEByZXR1cm5zIHtQcm9taXNlfSBBIFByb21pc2Ugb2JqZWN0IHJlcHJlc2VudHMgdGhlIHtPYmplY3R9XG4gKi9cbmV4cG9ydCBjb25zdCBmZXRjaFdvcmtlckJ5SWQgPSBhc3luYyAoaWQsIGNvbmZpZyA9IHt9KSA9PiB7XG4gICAgXG4gICAgY29uc3QgYWRkcmVzcyA9IGF3YWl0IGZldGNoQWRkcmVzc0J5SWQoaWQsIGNvbmZpZyk7XG4gICAgY29uc3Qgd29ya2VyID0gYXdhaXQgZmV0Y2hXb3JrZXIoYWRkcmVzcywgY29uZmlnKTtcblxuICAgIHJldHVybiB7XG4gICAgICAgIGlkOiBpZCxcbiAgICAgICAgLi4ud29ya2VyXG4gICAgfTtcbn07XG5cbi8qKlxuICogR2V0IGFsbCB3b3JrZXJzXG4gKiBcbiAqIEBwYXJhbSB7T2JqZWN0fSBjb25maWcgTGlicmFyeSBjb25maWcgKHByb3ZpZGVkIGJ5IHRoZSBwcm94eSBidXQgY2FuIGJlIG92ZXJyaWRkZW4pXG4gKiBAcmV0dXJucyB7UHJvbWlzZX0gQSBQcm9taXNlIG9iamVjdCByZXByZXNlbnRzIHRoZSB7bnVtYmVyfVxuICovXG5leHBvcnQgY29uc3QgZmV0Y2hBbGwgPSBhc3luYyAoY29uZmlnID0ge30pID0+IHtcbiAgICBsZXQgcmVjb3JkcyA9IFtdO1xuICAgIGxldCBlcnJvciA9IFtdO1xuXG4gICAgdHJ5IHtcblxuICAgICAgICBjb25zdCBjb3VudCA9IGF3YWl0IGZldGNoQ291bnQoY29uZmlnKTsgICAgXG5cbiAgICAgICAgZm9yIChsZXQgaT0wOyBpIDwgY291bnQ7IGkrKykge1xuICAgICAgICAgICAgXG4gICAgICAgICAgICB0cnkge1xuXG4gICAgICAgICAgICAgICAgY29uc3Qgd29ya2VyID0gYXdhaXQgZmV0Y2hXb3JrZXJCeUlkKGksIGNvbmZpZyk7XG5cbiAgICAgICAgICAgICAgICByZWNvcmRzLnB1c2goe1xuICAgICAgICAgICAgICAgICAgICBpZDogaSxcbiAgICAgICAgICAgICAgICAgICAgLi4ud29ya2VyXG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9IGNhdGNoKGVycikge1xuICAgICAgICAgICAgICAgIGVycm9yLnB1c2goe1xuICAgICAgICAgICAgICAgICAgICBpZDogaSxcbiAgICAgICAgICAgICAgICAgICAgbWVzc2FnZTogZXJyLm1lc3NhZ2VcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH0gICAgICAgIFxuICAgICAgICB9XG4gICAgfSBjYXRjaChlcnIpIHtcbiAgICAgICAgZXJyb3IucHVzaCh7XG4gICAgICAgICAgICBlcnJvcjogZXJyLm1lc3NhZ2VcbiAgICAgICAgfSk7XG4gICAgfSAgIFxuXG4gICAgcmV0dXJuIHtcbiAgICAgICAgcmVjb3JkcyxcbiAgICAgICAgZXJyb3JcbiAgICB9O1xufTtcblxuLyoqXG4gKiBHZXQgY291bnQgb2Ygd29ya2VycyB3aXRoIFwiaWRsZVwiIHN0YXR1c1xuICogXG4gKiBAcGFyYW0ge09iamVjdH0gY29uZmlnIExpYnJhcnkgY29uZmlnIChwcm92aWRlZCBieSB0aGUgcHJveHkgYnV0IGNhbiBiZSBvdmVycmlkZGVuKVxuICogQHJldHVybnMge1Byb21pc2V9IEEgUHJvbWlzZSBvYmplY3QgcmVwcmVzZW50cyB0aGUge251bWJlcn1cbiAqL1xuZXhwb3J0IGNvbnN0IGZldGNoSWRsZUNvdW50ID0gYXN5bmMgKGNvbmZpZyA9IHt9KSA9PiB7XG4gICAgY29uc3QgYWxsID0gYXdhaXQgZmV0Y2hBbGwoY29uZmlnKTtcbiAgICByZXR1cm4gYWxsLnJlY29yZHMucmVkdWNlKChhY2MsIGN1cnIpID0+IChjdXJyLmN1cnJlbnRTdGF0ZSA9PT0gMiA/IGFjYysxIDogYWNjKSwgMCk7XG59O1xuXG4vKipcbiAqIEZldGNoIHByb2dyZXNzIG9mIGFjdGl2ZSBqb2IgZm9yIHRoZSB3b3JrZXJcbiAqXG4gKiBAcGFyYW0ge1N0cmluZ30gYWRkcmVzcyBXb3JrZXIncyBhZGRyZXNzXG4gKiBAcGFyYW0ge09iamVjdH0gY29uZmlnIExpYnJhcnkgY29uZmlnIChwcm92aWRlZCBieSB0aGUgcHJveHkgYnV0IGNhbiBiZSBvdmVycmlkZGVuKVxuICogQHJldHVybnMge1Byb21pc2U8e051bWJlcn0+fSBBIFByb21pc2Ugb2JqZWN0IHJlcHJlc2VudHMgdGhlIHByb2dyZXNzIHZhbHVlXG4gKi9cbmV4cG9ydCBjb25zdCBmZXRjaEpvYlByb2dyZXNzID0gYXN5bmMgKGFkZHJlc3MgPSAnJywgY29uZmlnID0ge30pID0+IHtcblxuICAgIGV4cGVjdC5hbGwoeyBhZGRyZXNzIH0sIHtcbiAgICAgICAgJ2FkZHJlc3MnOiB7XG4gICAgICAgICAgICB0eXBlOiAnYWRkcmVzcydcbiAgICAgICAgfVxuICAgIH0pO1xuXG4gICAgZXhwZWN0LmFsbChjb25maWcsIHtcbiAgICAgICAgJ3dlYjMnOiB7XG4gICAgICAgICAgICB0eXBlOiAnb2JqZWN0JyxcbiAgICAgICAgICAgIGNvZGU6IFdFQjNfUkVRVUlSRURcbiAgICAgICAgfSxcbiAgICAgICAgJ2NvbnRyYWN0cy5Xb3JrZXJOb2RlLmFiaSc6IHtcbiAgICAgICAgICAgIHR5cGU6ICdvYmplY3QnLFxuICAgICAgICAgICAgY29kZTogQ09OVFJBQ1RfUkVRVUlSRUQsXG4gICAgICAgICAgICBhcmdzOiBbJ1dvcmtlck5vZGUnXVxuICAgICAgICB9XG4gICAgfSk7XG5cbiAgICBjb25zdCB3b3IgPSBuZXcgY29uZmlnLndlYjMuZXRoLkNvbnRyYWN0KGNvbmZpZy5jb250cmFjdHMuV29ya2VyTm9kZS5hYmksIGFkZHJlc3MpOyAgICBcbiAgICBjb25zdCBzdGF0ZSA9IGF3YWl0IHdvci5tZXRob2RzXG4gICAgICAgIC5qb2JQcm9ncmVzcygpXG4gICAgICAgIC5jYWxsKCk7XG5cbiAgICByZXR1cm4gTWF0aC5jZWlsKE51bWJlci5wYXJzZUludChzdGF0ZSwgMTApKTtcbn07XG5cbi8qKlxuICogSGFuZGxlIGV2ZW50IFdvcmtlck5vZGVDcmVhdGVkXG4gKiBcbiAqIEBwYXJhbSB7T2JqZWN0fSBvcHRpb25zIEV2ZW50IGhhbmRsZXIgb3B0aW9uc1xuICogQHBhcmFtIHtPYmplY3R9IGNvbmZpZyBMaWJyYXJ5IGNvbmZpZyAocHJvdmlkZWQgYnkgdGhlIHByb3h5IGJ1dCBjYW4gYmUgb3ZlcnJpZGRlbilcbiAqIEByZXR1cm5zIHtQcm9taXNlPHtPYmplY3R9Pn0gUFByb21pc2Ugb2JqZWN0IHJlc29sdmVkIHRvIHRoZSBvYmplY3Qgd2l0aCBjaGFpbmVkIGNhbGxiYWNrcyAjZGF0YSBhbmQgI2Vycm9yXG4gKi9cbmV4cG9ydCBjb25zdCBldmVudFdvcmtlck5vZGVDcmVhdGVkID0gYXN5bmMgKG9wdGlvbnMgPSB7fSwgY29uZmlnID0ge30pID0+IHtcblxuICAgIGV4cGVjdC5hbGwoeyBvcHRpb25zIH0sIHtcbiAgICAgICAgJ29wdGlvbnMnOiB7XG4gICAgICAgICAgICB0eXBlOiAnb2JqZWN0J1xuICAgICAgICB9XG4gICAgfSk7XG5cbiAgICBleHBlY3QuYWxsKGNvbmZpZywge1xuICAgICAgICAnd2ViMyc6IHtcbiAgICAgICAgICAgIHR5cGU6ICdvYmplY3QnLFxuICAgICAgICAgICAgY29kZTogV0VCM19SRVFVSVJFRFxuICAgICAgICB9LFxuICAgICAgICAnY29udHJhY3RzLlBhbmRvcmEuYWJpJzoge1xuICAgICAgICAgICAgdHlwZTogJ29iamVjdCcsXG4gICAgICAgICAgICBjb2RlOiBDT05UUkFDVF9SRVFVSVJFRCxcbiAgICAgICAgICAgIGFyZ3M6IFsnUGFuZG9yYSddXG4gICAgICAgIH0sXG4gICAgICAgICdhZGRyZXNzZXMuUGFuZG9yYSc6IHtcbiAgICAgICAgICAgIHR5cGU6ICdhZGRyZXNzJyxcbiAgICAgICAgICAgIGNvZGU6IEFERFJFU1NfUkVRVUlSRUQsXG4gICAgICAgICAgICBhcmdzOiBbJ1BhbmRvcmEnXVxuICAgICAgICB9XG4gICAgfSk7XG5cbiAgICBjb25zdCBjYWxsYmFja3MgPSB7XG4gICAgICAgIG9uRGF0YTogKCkgPT4ge30sXG4gICAgICAgIG9uRXJyb3I6ICgpID0+IHt9XG4gICAgfTtcblxuICAgIGNvbnN0IGNoYWluID0ge1xuICAgICAgICBkYXRhOiAoY2IgPSAoKSA9PiB7fSkgPT4ge1xuICAgICAgICAgICAgY2FsbGJhY2tzLm9uRGF0YSA9IGNiO1xuICAgICAgICAgICAgcmV0dXJuIGNoYWluO1xuICAgICAgICB9LFxuICAgICAgICBlcnJvcjogKGNiID0gKCkgPT4ge30pID0+IHtcbiAgICAgICAgICAgIGNhbGxiYWNrcy5vbkVycm9yID0gY2I7XG4gICAgICAgICAgICByZXR1cm4gY2hhaW47XG4gICAgICAgIH1cbiAgICB9O1xuXG4gICAgY29uc3QgcGFuID0gbmV3IGNvbmZpZy53ZWIzLmV0aC5Db250cmFjdChjb25maWcuY29udHJhY3RzLlBhbmRvcmEuYWJpLCBjb25maWcuYWRkcmVzc2VzLlBhbmRvcmEpO1xuICAgIGNoYWluLmV2ZW50ID0gW107XG4gICAgY2hhaW4uZXZlbnRbMF0gPSBwYW4uZXZlbnRzLldvcmtlck5vZGVDcmVhdGVkKG9wdGlvbnMpXG4gICAgICAgIC5vbignZGF0YScsIGFzeW5jIGV2ZW50ID0+IHtcblxuICAgICAgICAgICAgdHJ5IHtcblxuICAgICAgICAgICAgICAgIGNvbnN0IHdvcmtlciA9IGF3YWl0IGZldGNoV29ya2VyKGV2ZW50LnJldHVyblZhbHVlcy53b3JrZXJOb2RlLCBjb25maWcpO1xuICAgICAgICAgICAgICAgIGNhbGxiYWNrcy5vbkRhdGEoe1xuICAgICAgICAgICAgICAgICAgICByZWNvcmRzOiBbd29ya2VyXSxcbiAgICAgICAgICAgICAgICAgICAgZXZlbnRcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH0gY2F0Y2goZXJyKSB7XG4gICAgICAgICAgICAgICAgY2FsbGJhY2tzLm9uRXJyb3IoZXJyKTtcbiAgICAgICAgICAgIH0gICAgICAgICAgICBcbiAgICAgICAgfSlcbiAgICAgICAgLm9uKCdlcnJvcicsIGNhbGxiYWNrcy5vbkVycm9yKTtcbiAgICBjaGFpbi5ldmVudFswXS5uYW1lID0gJ1dvcmtlck5vZGVDcmVhdGVkJztcblxuICAgIHJldHVybiBjaGFpbjtcbn07XG5cbi8qKlxuICogSGFuZGxlIGV2ZW50IFN0YXRlQ2hhbmdlZCBmb3IgV29ya2VyTm9kZVxuICogXG4gKiBAcGFyYW0ge1N0cmluZ30gYWRkcmVzc1xuICogQHBhcmFtIHtPYmplY3R9IG9wdGlvbnNcbiAqIEBwYXJhbSB7T2JqZWN0fSBjb25maWcgTGlicmFyeSBjb25maWcgKHByb3ZpZGVkIGJ5IHRoZSBwcm94eSBidXQgY2FuIGJlIG92ZXJyaWRkZW4pXG4gKiBAcmV0dXJucyB7UHJvbWlzZTx7T2JqZWN0fT59IFBQcm9taXNlIG9iamVjdCByZXNvbHZlZCB0byB0aGUgb2JqZWN0IHdpdGggY2hhaW5lZCBjYWxsYmFja3MgI2RhdGEgYW5kICNlcnJvclxuICovXG5leHBvcnQgY29uc3QgZXZlbnRXb3JrZXJOb2RlU3RhdGVDaGFuZ2VkID0gYXN5bmMgKGFkZHJlc3MgPSAnJywgb3B0aW9ucyA9IHt9LCBjb25maWcgPSB7fSkgPT4ge1xuXG4gICAgZXhwZWN0LmFsbCh7IGFkZHJlc3MgfSwge1xuICAgICAgICAnYWRkcmVzcyc6IHtcbiAgICAgICAgICAgIHR5cGU6ICdhZGRyZXNzJ1xuICAgICAgICB9XG4gICAgfSk7XG5cbiAgICBleHBlY3QuYWxsKGNvbmZpZywge1xuICAgICAgICAnd2ViMyc6IHtcbiAgICAgICAgICAgIHR5cGU6ICdvYmplY3QnLFxuICAgICAgICAgICAgY29kZTogV0VCM19SRVFVSVJFRFxuICAgICAgICB9LFxuICAgICAgICAnY29udHJhY3RzLldvcmtlck5vZGUuYWJpJzoge1xuICAgICAgICAgICAgdHlwZTogJ29iamVjdCcsXG4gICAgICAgICAgICBjb2RlOiBDT05UUkFDVF9SRVFVSVJFRCxcbiAgICAgICAgICAgIGFyZ3M6IFsnV29ya2VyTm9kZSddXG4gICAgICAgIH1cbiAgICB9KTtcblxuICAgIGNvbnN0IGNhbGxiYWNrcyA9IHtcbiAgICAgICAgb25EYXRhOiAoKSA9PiB7fSxcbiAgICAgICAgb25FcnJvcjogKCkgPT4ge31cbiAgICB9O1xuXG4gICAgY29uc3QgY2hhaW4gPSB7XG4gICAgICAgIGRhdGE6IChjYiA9ICgpID0+IHt9KSA9PiB7XG4gICAgICAgICAgICBjYWxsYmFja3Mub25EYXRhID0gY2I7XG4gICAgICAgICAgICByZXR1cm4gY2hhaW47XG4gICAgICAgIH0sXG4gICAgICAgIGVycm9yOiAoY2IgPSAoKSA9PiB7fSkgPT4ge1xuICAgICAgICAgICAgY2FsbGJhY2tzLm9uRXJyb3IgPSBjYjtcbiAgICAgICAgICAgIHJldHVybiBjaGFpbjtcbiAgICAgICAgfVxuICAgIH07XG5cbiAgICBjb25zdCB3b3IgPSBuZXcgY29uZmlnLndlYjMuZXRoLkNvbnRyYWN0KGNvbmZpZy5jb250cmFjdHMuV29ya2VyTm9kZS5hYmksIGFkZHJlc3MpO1xuICAgIGNoYWluLmV2ZW50ID0gW107XG4gICAgY2hhaW4uZXZlbnRbMF0gPSB3b3IuZXZlbnRzLlN0YXRlQ2hhbmdlZChvcHRpb25zKVxuICAgICAgICAub24oJ2RhdGEnLCBhc3luYyBldmVudCA9PiB7XG5cbiAgICAgICAgICAgIHRyeSB7XG5cbiAgICAgICAgICAgICAgICBjb25zdCB3b3JrZXIgPSBhd2FpdCBmZXRjaFdvcmtlcihhZGRyZXNzLCBjb25maWcpO1xuICAgICAgICAgICAgICAgIGNhbGxiYWNrcy5vbkRhdGEoe1xuICAgICAgICAgICAgICAgICAgICByZWNvcmRzOiBbd29ya2VyXSxcbiAgICAgICAgICAgICAgICAgICAgZXZlbnRcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH0gY2F0Y2goZXJyKSB7XG4gICAgICAgICAgICAgICAgY2FsbGJhY2tzLm9uRXJyb3IoZXJyKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSlcbiAgICAgICAgLm9uKCdlcnJvcicsIGNhbGxiYWNrcy5vbkVycm9yKTtcbiAgICBjaGFpbi5ldmVudFswXS5uYW1lID0gJ1N0YXRlQ2hhbmdlZCc7XG5cbiAgICByZXR1cm4gY2hhaW47XG59O1xuXG4vKipcbiAqIFRyYW5zaXRpb24gb2YgYSBXb3JrZXJOb2RlIHRvIHRoZSBJZGxlIHN0YXRlXG4gKiBcbiAqIEBwYXJhbSB7U3RyaW5nfSB3b3JrZXJOb2RlQWRkcmVzcyBcbiAqIEBwYXJhbSB7U3RyaW5nfSBmcm9tXG4gKiBAcGFyYW0ge09iamVjdH0gY29uZmlnIExpYnJhcnkgY29uZmlnIChwcm92aWRlZCBieSB0aGUgcHJveHkgYnV0IGNhbiBiZSBvdmVycmlkZGVuKVxuICogQHJldHVybnMge1Byb21pc2V9IFByb21pc2Ugb2JqZWN0IHJlc29sdmVkIHRvIGFkZCBzdGF0dXMgKGJvb2xlYW4pXG4gKi9cbmV4cG9ydCBjb25zdCBhbGl2ZSA9ICh3b3JrZXJOb2RlQWRkcmVzcywgZnJvbSwgY29uZmlnID0ge30pID0+IG5ldyBQcm9taXNlKGFzeW5jIChyZXNvbHZlLCByZWplY3QpID0+IHtcblxuICAgIGV4cGVjdC5hbGwoeyB3b3JrZXJOb2RlQWRkcmVzcywgZnJvbSB9LCB7XG4gICAgICAgICd3b3JrZXJOb2RlQWRkcmVzcyc6IHtcbiAgICAgICAgICAgIHR5cGU6ICdhZGRyZXNzJ1xuICAgICAgICB9LFxuICAgICAgICAnZnJvbSc6IHtcbiAgICAgICAgICAgIHR5cGU6ICdhZGRyZXNzJ1xuICAgICAgICB9XG4gICAgfSk7XG5cbiAgICBleHBlY3QuYWxsKGNvbmZpZywge1xuICAgICAgICAnd2ViMyc6IHtcbiAgICAgICAgICAgIHR5cGU6ICdvYmplY3QnLFxuICAgICAgICAgICAgY29kZTogV0VCM19SRVFVSVJFRFxuICAgICAgICB9LFxuICAgICAgICAnY29udHJhY3RzLldvcmtlck5vZGUuYWJpJzoge1xuICAgICAgICAgICAgdHlwZTogJ29iamVjdCcsXG4gICAgICAgICAgICBjb2RlOiBDT05UUkFDVF9SRVFVSVJFRCxcbiAgICAgICAgICAgIGFyZ3M6IFsnV29ya2VyTm9kZSddXG4gICAgICAgIH1cbiAgICB9KTtcblxuICAgIGNvbnN0IHdybiA9IG5ldyBjb25maWcud2ViMy5ldGguQ29udHJhY3QoY29uZmlnLmNvbnRyYWN0cy5Xb3JrZXJOb2RlLmFiaSwgd29ya2VyTm9kZUFkZHJlc3MpO1xuICAgIGNvbnN0IGdhc1ByaWNlID0gYXdhaXQgY29uZmlnLndlYjMuZXRoLmdldEdhc1ByaWNlKCk7XG4gICAgd3JuLm1ldGhvZHNcbiAgICAgICAgLmFsaXZlKClcbiAgICAgICAgLnNlbmQoe1xuICAgICAgICAgICAgZnJvbSxcbiAgICAgICAgICAgIGdhc1ByaWNlLFxuICAgICAgICAgICAgZ2FzOiA2NzAwMDAwXG4gICAgICAgIH0pXG4gICAgICAgIC5vbignZXJyb3InLCByZWplY3QpXG4gICAgICAgIC5vbigncmVjZWlwdCcsIHJlY2VpcHQgPT4ge1xuXG4gICAgICAgICAgICBpZiAoTnVtYmVyKHJlY2VpcHQuc3RhdHVzKSA9PT0gMCkge1xuXG4gICAgICAgICAgICAgICAgcmV0dXJuIHJlamVjdChwanNFcnJvcihUUkFOU0FDVElPTl9VTlNVQ0NFU1NGVUwpKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgcmVzb2x2ZShyZWNlaXB0KTtcbiAgICAgICAgfSk7XG59KTtcbiJdfQ==