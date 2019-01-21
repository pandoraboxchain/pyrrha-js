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

require("core-js/modules/es6.array.for-each");

require("core-js/modules/es6.array.filter");

require("core-js/modules/es6.object.keys");

require("core-js/modules/es6.object.define-property");

require("core-js/modules/es7.symbol.async-iterator");

require("core-js/modules/es6.symbol");

require("core-js/modules/es6.array.is-array");

require("core-js/modules/es6.array.reduce");

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy93b3JrZXJzLmpzIl0sIm5hbWVzIjpbImZldGNoQ291bnQiLCJjb25maWciLCJleHBlY3QiLCJhbGwiLCJ0eXBlIiwiY29kZSIsIldFQjNfUkVRVUlSRUQiLCJDT05UUkFDVF9SRVFVSVJFRCIsImFyZ3MiLCJBRERSRVNTX1JFUVVJUkVEIiwicGFuIiwid2ViMyIsImV0aCIsIkNvbnRyYWN0IiwiY29udHJhY3RzIiwiUGFuZG9yYSIsImFiaSIsImFkZHJlc3NlcyIsIm1ldGhvZHMiLCJ3b3JrZXJOb2Rlc0NvdW50IiwiY2FsbCIsImNvdW50IiwiTnVtYmVyIiwicGFyc2VJbnQiLCJmZXRjaEFkZHJlc3NCeUlkIiwiaWQiLCJ3b3JrZXJOb2RlcyIsImFkZHJlc3MiLCJTdHJpbmciLCJmZXRjaFN0YXRlIiwid29yIiwiV29ya2VyTm9kZSIsImN1cnJlbnRTdGF0ZSIsInN0YXRlIiwiZmV0Y2hBY3RpdmVKb2JBZGRyZXNzIiwiYWN0aXZlSm9iIiwiZmV0Y2hXb3JrZXIiLCJQcm9taXNlIiwiY3VycmVudEpvYiIsImpvYkRldGFpbHMiLCJqb2JTdGF0ZSIsImN1cnJlbnRKb2JTdGF0dXMiLCJmZXRjaFdvcmtlckJ5SWQiLCJ3b3JrZXIiLCJmZXRjaEFsbCIsInJlY29yZHMiLCJlcnJvciIsImkiLCJwdXNoIiwibWVzc2FnZSIsImZldGNoSWRsZUNvdW50IiwicmVkdWNlIiwiYWNjIiwiY3VyciIsImZldGNoSm9iUHJvZ3Jlc3MiLCJqb2JQcm9ncmVzcyIsIk1hdGgiLCJjZWlsIiwiZXZlbnRXb3JrZXJOb2RlQ3JlYXRlZCIsIm9wdGlvbnMiLCJjYWxsYmFja3MiLCJvbkRhdGEiLCJvbkVycm9yIiwiY2hhaW4iLCJkYXRhIiwiY2IiLCJldmVudCIsImV2ZW50cyIsIldvcmtlck5vZGVDcmVhdGVkIiwib24iLCJyZXR1cm5WYWx1ZXMiLCJ3b3JrZXJOb2RlIiwibmFtZSIsImV2ZW50V29ya2VyTm9kZVN0YXRlQ2hhbmdlZCIsIlN0YXRlQ2hhbmdlZCIsImFsaXZlIiwid29ya2VyTm9kZUFkZHJlc3MiLCJmcm9tIiwicmVzb2x2ZSIsInJlamVjdCIsIndybiIsImdldEdhc1ByaWNlIiwiZ2FzUHJpY2UiLCJzZW5kIiwiZ2FzIiwicmVjZWlwdCIsInN0YXR1cyIsIlRSQU5TQUNUSU9OX1VOU1VDQ0VTU0ZVTCJdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7Ozs7O0FBU0E7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFFQTs7QUFDQTs7QUFPQTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFFQTs7Ozs7O0FBTU8sSUFBTUEsVUFBVTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUEsMEJBQUc7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQU9DLFlBQUFBLE1BQVAsMkRBQWdCLEVBQWhCO0FBRXRCQyxZQUFBQSxNQUFNLENBQUNDLEdBQVAsQ0FBV0YsTUFBWCxFQUFtQjtBQUNmLHNCQUFRO0FBQ0pHLGdCQUFBQSxJQUFJLEVBQUUsUUFERjtBQUVKQyxnQkFBQUEsSUFBSSxFQUFFQztBQUZGLGVBRE87QUFLZix1Q0FBeUI7QUFDckJGLGdCQUFBQSxJQUFJLEVBQUUsUUFEZTtBQUVyQkMsZ0JBQUFBLElBQUksRUFBRUUseUJBRmU7QUFHckJDLGdCQUFBQSxJQUFJLEVBQUUsQ0FBQyxTQUFEO0FBSGUsZUFMVjtBQVVmLG1DQUFxQjtBQUNqQkosZ0JBQUFBLElBQUksRUFBRSxTQURXO0FBRWpCQyxnQkFBQUEsSUFBSSxFQUFFSSx3QkFGVztBQUdqQkQsZ0JBQUFBLElBQUksRUFBRSxDQUFDLFNBQUQ7QUFIVztBQVZOLGFBQW5CO0FBaUJNRSxZQUFBQSxHQW5CZ0IsR0FtQlYsSUFBSVQsTUFBTSxDQUFDVSxJQUFQLENBQVlDLEdBQVosQ0FBZ0JDLFFBQXBCLENBQTZCWixNQUFNLENBQUNhLFNBQVAsQ0FBaUJDLE9BQWpCLENBQXlCQyxHQUF0RCxFQUEyRGYsTUFBTSxDQUFDZ0IsU0FBUCxDQUFpQkYsT0FBNUUsQ0FuQlU7QUFBQTtB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QUFFO0FBSEgsZUFGVixFQU9LZixFQVBMLENBT1EsT0FQUixFQU9pQlUsTUFQakIsRUFRS1YsRUFSTCxDQVFRLFNBUlIsRUFRbUIsVUFBQWdCLE9BQU8sRUFBSTtBQUV0QixvQkFBSS9ELE1BQU0sQ0FBQytELE9BQU8sQ0FBQ0MsTUFBVCxDQUFOLEtBQTJCLENBQS9CLEVBQWtDO0FBRTlCLHlCQUFPUCxNQUFNLENBQUMscUJBQVNRLGdDQUFULENBQUQsQ0FBYjtBQUNIOztBQUVEVCxnQkFBQUEsT0FBTyxDQUFDTyxPQUFELENBQVA7QUFDSCxlQWhCTDs7QUF6QnVFO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBLEtBQVo7O0FBQUE7QUFBQTtBQUFBO0FBQUEsTUFBMUM7QUFBQSxDQUFkIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBXb3JrZXJOb2RlcyByZWxhdGVkIG1ldGhvZHNcbiAqIFRoaXMgZmlsZSBpdCBpcyBhIHBhcnQgb2YgdGhlIFBhbmRvcmEgUHlycmhhIEphdmFzY3JpcHQgbGlicmFyeVxuICogXG4gKiBAZmlsZSB3b3JrZXJzLmpzXG4gKiBAYXV0aG9yIEtvc3RpYW50eW4gU215cm5vdiA8a29zdHlzaEBnbWFpbC5jb20+XG4gKiBAZGF0ZSAyMDE4XG4gKi9cblxuJ3VzZSBzdHJpY3QnO1xuXG5pbXBvcnQgKiBhcyBleHBlY3QgZnJvbSAnLi9oZWxwZXJzL2V4cGVjdCc7XG5pbXBvcnQgcGpzRXJyb3IsIHtcbiAgICBDT05UUkFDVF9SRVFVSVJFRCxcbiAgICBBRERSRVNTX1JFUVVJUkVELFxuICAgIFdFQjNfUkVRVUlSRUQsXG4gICAgVFJBTlNBQ1RJT05fVU5TVUNDRVNTRlVMXG59IGZyb20gJy4vaGVscGVycy9lcnJvcnMnO1xuXG5pbXBvcnQgeyBmZXRjaEpvYkRldGFpbHMgfSBmcm9tICcuL2pvYnMnO1xuXG4vKipcbiAqIEdldCB3b3JrZXIgbm9kZXMgY291bnQgZnJvbSBQYW5kb3JhIGNvbnRyYWN0XG4gKiBcbiAqIEBwYXJhbSB7T2JqZWN0fSBjb25maWcgTGlicmFyeSBjb25maWcgKHByb3ZpZGVkIGJ5IHRoZSBwcm94eSBidXQgY2FuIGJlIG92ZXJyaWRkZW4pXG4gKiBAcmV0dXJucyB7UHJvbWlzZX0gQSBQcm9taXNlIG9iamVjdCByZXByZXNlbnRzIHRoZSB7bnVtYmVyfSBcbiAqL1xuZXhwb3J0IGNvbnN0IGZldGNoQ291bnQgPSBhc3luYyAoY29uZmlnID0ge30pID0+IHtcblxuICAgIGV4cGVjdC5hbGwoY29uZmlnLCB7XG4gICAgICAgICd3ZWIzJzoge1xuICAgICAgICAgICAgdHlwZTogJ29iamVjdCcsXG4gICAgICAgICAgICBjb2RlOiBXRUIzX1JFUVVJUkVEXG4gICAgICAgIH0sXG4gICAgICAgICdjb250cmFjdHMuUGFuZG9yYS5hYmknOiB7XG4gICAgICAgICAgICB0eXBlOiAnb2JqZWN0JyxcbiAgICAgICAgICAgIGNvZGU6IENPTlRSQUNUX1JFUVVJUkVELFxuICAgICAgICAgICAgYXJnczogWydQYW5kb3JhJ11cbiAgICAgICAgfSxcbiAgICAgICAgJ2FkZHJlc3Nlcy5QYW5kb3JhJzoge1xuICAgICAgICAgICAgdHlwZTogJ2FkZHJlc3MnLFxuICAgICAgICAgICAgY29kZTogQUREUkVTU19SRVFVSVJFRCxcbiAgICAgICAgICAgIGFyZ3M6IFsnUGFuZG9yYSddXG4gICAgICAgIH1cbiAgICB9KTtcblxuICAgIGNvbnN0IHBhbiA9IG5ldyBjb25maWcud2ViMy5ldGguQ29udHJhY3QoY29uZmlnLmNvbnRyYWN0cy5QYW5kb3JhLmFiaSwgY29uZmlnLmFkZHJlc3Nlcy5QYW5kb3JhKTtcbiAgICBjb25zdCBjb3VudCA9IGF3YWl0IHBhbi5tZXRob2RzXG4gICAgICAgIC53b3JrZXJOb2Rlc0NvdW50KClcbiAgICAgICAgLmNhbGwoKTtcblxuICAgIHJldHVybiBOdW1iZXIucGFyc2VJbnQoY291bnQsIDEwKTtcbn07XG5cbi8qKlxuICogR2V0IHdvcmtlciBhZGRyZXNzIGZyb20gUGFuZG9yYSBjb250cmFjdCBieSB0aGUgd29ya2VyIElkXG4gKiBcbiAqIEBwYXJhbSB7aW50ZWdlcn0gaWQgV29ya2VyIElkXG4gKiBAcGFyYW0ge09iamVjdH0gY29uZmlnIExpYnJhcnkgY29uZmlnIChwcm92aWRlZCBieSB0aGUgcHJveHkgYnV0IGNhbiBiZSBvdmVycmlkZGVuKVxuICogQHJldHVybnMge1Byb21pc2V9IEEgUHJvbWlzZSBvYmplY3QgcmVwcmVzZW50cyB0aGUge1N0cmluZ30gXG4gKi9cbmV4cG9ydCBjb25zdCBmZXRjaEFkZHJlc3NCeUlkID0gYXN5bmMgKGlkLCBjb25maWcgPSB7fSkgPT4ge1xuXG4gICAgZXhwZWN0LmFsbCh7IGlkIH0sIHtcbiAgICAgICAgJ2lkJzoge1xuICAgICAgICAgICAgdHlwZTogJ251bWJlcidcbiAgICAgICAgfVxuICAgIH0pO1xuXG4gICAgZXhwZWN0LmFsbChjb25maWcsIHtcbiAgICAgICAgJ3dlYjMnOiB7XG4gICAgICAgICAgICB0eXBlOiAnb2JqZWN0JyxcbiAgICAgICAgICAgIGNvZGU6IFdFQjNfUkVRVUlSRURcbiAgICAgICAgfSxcbiAgICAgICAgJ2NvbnRyYWN0cy5QYW5kb3JhLmFiaSc6IHtcbiAgICAgICAgICAgIHR5cGU6ICdvYmplY3QnLFxuICAgICAgICAgICAgY29kZTogQ09OVFJBQ1RfUkVRVUlSRUQsXG4gICAgICAgICAgICBhcmdzOiBbJ1BhbmRvcmEnXVxuICAgICAgICB9LFxuICAgICAgICAnYWRkcmVzc2VzLlBhbmRvcmEnOiB7XG4gICAgICAgICAgICB0eXBlOiAnYWRkcmVzcycsXG4gICAgICAgICAgICBjb2RlOiBBRERSRVNTX1JFUVVJUkVELFxuICAgICAgICAgICAgYXJnczogWydQYW5kb3JhJ11cbiAgICAgICAgfVxuICAgIH0pO1xuXG4gICAgY29uc3QgcGFuID0gbmV3IGNvbmZpZy53ZWIzLmV0aC5Db250cmFjdChjb25maWcuY29udHJhY3RzLlBhbmRvcmEuYWJpLCBjb25maWcuYWRkcmVzc2VzLlBhbmRvcmEpO1xuICAgIGNvbnN0IGFkZHJlc3MgPSBhd2FpdCBwYW4ubWV0aG9kc1xuICAgICAgICAud29ya2VyTm9kZXMoaWQpXG4gICAgICAgIC5jYWxsKCk7XG5cbiAgICByZXR1cm4gU3RyaW5nKGFkZHJlc3MpO1xufTtcblxuLyoqXG4gKiBHZXQgd29ya2VyIHN0YXRlIGZyb20gV29ya2VyIGNvbnRyYWN0IGJ5IHRoZSB3b3JrZXIgYWRkcmVzc1xuICogXG4gKiBAcGFyYW0ge1N0cmluZ30gYWRkcmVzcyBcbiAqIEBwYXJhbSB7T2JqZWN0fSBjb25maWcgTGlicmFyeSBjb25maWcgKHByb3ZpZGVkIGJ5IHRoZSBwcm94eSBidXQgY2FuIGJlIG92ZXJyaWRkZW4pXG4gKiBAcmV0dXJucyB7UHJvbWlzZX0gQSBQcm9taXNlIG9iamVjdCByZXByZXNlbnRzIHRoZSB7bnVtYmVyfVxuICovXG5leHBvcnQgY29uc3QgZmV0Y2hTdGF0ZSA9IGFzeW5jIChhZGRyZXNzID0gJycsIGNvbmZpZyA9IHt9KSA9PiB7XG5cbiAgICBleHBlY3QuYWxsKHsgYWRkcmVzcyB9LCB7XG4gICAgICAgICdhZGRyZXNzJzoge1xuICAgICAgICAgICAgdHlwZTogJ2FkZHJlc3MnXG4gICAgICAgIH1cbiAgICB9KTtcblxuICAgIGV4cGVjdC5hbGwoY29uZmlnLCB7XG4gICAgICAgICd3ZWIzJzoge1xuICAgICAgICAgICAgdHlwZTogJ29iamVjdCcsXG4gICAgICAgICAgICBjb2RlOiBXRUIzX1JFUVVJUkVEXG4gICAgICAgIH0sXG4gICAgICAgICdjb250cmFjdHMuV29ya2VyTm9kZS5hYmknOiB7XG4gICAgICAgICAgICB0eXBlOiAnb2JqZWN0JyxcbiAgICAgICAgICAgIGNvZGU6IENPTlRSQUNUX1JFUVVJUkVELFxuICAgICAgICAgICAgYXJnczogWydXb3JrZXJOb2RlJ11cbiAgICAgICAgfVxuICAgIH0pO1xuXG4gICAgY29uc3Qgd29yID0gbmV3IGNvbmZpZy53ZWIzLmV0aC5Db250cmFjdChjb25maWcuY29udHJhY3RzLldvcmtlck5vZGUuYWJpLCBhZGRyZXNzKTsgICAgXG4gICAgY29uc3Qgc3RhdGUgPSBhd2FpdCB3b3IubWV0aG9kc1xuICAgICAgICAuY3VycmVudFN0YXRlKClcbiAgICAgICAgLmNhbGwoKTtcblxuICAgIHJldHVybiBOdW1iZXIucGFyc2VJbnQoc3RhdGUsIDEwKTtcbn07XG5cbi8qKlxuICogR2V0IHdvcmtlcidzIGFjdGl2ZSBqb2IgZnJvbSBXb3JrZXIgY29udHJhY3QgYnkgdGhlIHdvcmtlciBhZGRyZXNzXG4gKiBcbiAqIEBwYXJhbSB7U3RyaW5nfSBhZGRyZXNzIFxuICogQHBhcmFtIHtPYmplY3R9IGNvbmZpZyBMaWJyYXJ5IGNvbmZpZyAocHJvdmlkZWQgYnkgdGhlIHByb3h5IGJ1dCBjYW4gYmUgb3ZlcnJpZGRlbilcbiAqIEByZXR1cm5zIHtQcm9taXNlfSBBIFByb21pc2Ugb2JqZWN0IHJlcHJlc2VudHMgdGhlIHtTdHJpbmd9XG4gKi9cbmV4cG9ydCBjb25zdCBmZXRjaEFjdGl2ZUpvYkFkZHJlc3MgPSBhc3luYyAoYWRkcmVzcyA9ICcnLCBjb25maWcgPSB7fSkgPT4ge1xuXG4gICAgZXhwZWN0LmFsbCh7IGFkZHJlc3MgfSwge1xuICAgICAgICAnYWRkcmVzcyc6IHtcbiAgICAgICAgICAgIHR5cGU6ICdhZGRyZXNzJ1xuICAgICAgICB9XG4gICAgfSk7XG5cbiAgICBleHBlY3QuYWxsKGNvbmZpZywge1xuICAgICAgICAnd2ViMyc6IHtcbiAgICAgICAgICAgIHR5cGU6ICdvYmplY3QnLFxuICAgICAgICAgICAgY29kZTogV0VCM19SRVFVSVJFRFxuICAgICAgICB9LFxuICAgICAgICAnY29udHJhY3RzLldvcmtlck5vZGUuYWJpJzoge1xuICAgICAgICAgICAgdHlwZTogJ29iamVjdCcsXG4gICAgICAgICAgICBjb2RlOiBDT05UUkFDVF9SRVFVSVJFRCxcbiAgICAgICAgICAgIGFyZ3M6IFsnV29ya2VyTm9kZSddXG4gICAgICAgIH1cbiAgICB9KTtcblxuICAgIGNvbnN0IHdvciA9IG5ldyBjb25maWcud2ViMy5ldGguQ29udHJhY3QoY29uZmlnLmNvbnRyYWN0cy5Xb3JrZXJOb2RlLmFiaSwgYWRkcmVzcyk7XG4gICAgY29uc3QgYWN0aXZlSm9iID0gYXdhaXQgd29yLm1ldGhvZHNcbiAgICAgICAgLmFjdGl2ZUpvYigpXG4gICAgICAgIC5jYWxsKCk7XG5cbiAgICByZXR1cm4gU3RyaW5nKGFjdGl2ZUpvYiwgMTApO1xufTtcblxuLyoqXG4gKiBHZXQgd29ya2VyIGJ5IHRoZSB3b3JrZXIncyBhZGRyZXNzXG4gKiBcbiAqIEBwYXJhbSB7U3RyaW5nfSBhZGRyZXNzXG4gKiBAcGFyYW0ge09iamVjdH0gY29uZmlnIExpYnJhcnkgY29uZmlnIChwcm92aWRlZCBieSB0aGUgcHJveHkgYnV0IGNhbiBiZSBvdmVycmlkZGVuKVxuICogQHJldHVybnMge1Byb21pc2V9IEEgUHJvbWlzZSBvYmplY3QgcmVwcmVzZW50cyB0aGUge09iamVjdH1cbiAqL1xuZXhwb3J0IGNvbnN0IGZldGNoV29ya2VyID0gYXN5bmMgKGFkZHJlc3MgPSAnJywgY29uZmlnID0ge30pID0+IHtcbiAgICBcbiAgICBjb25zdCBbXG4gICAgICAgIGN1cnJlbnRTdGF0ZSxcbiAgICAgICAgYWN0aXZlSm9iXG4gICAgXSA9IGF3YWl0IFByb21pc2UuYWxsKFtcbiAgICAgICAgZmV0Y2hTdGF0ZShhZGRyZXNzLCBjb25maWcpLFxuICAgICAgICBmZXRjaEFjdGl2ZUpvYkFkZHJlc3MoYWRkcmVzcywgY29uZmlnKVxuICAgIF0pO1xuXG5cbiAgICBsZXQgY3VycmVudEpvYiA9IGFjdGl2ZUpvYjtcbiAgICBsZXQgam9iU3RhdGU7ICAgIFxuXG4gICAgLy8gQ2hlY2sgaXMgbm90IDB4MFxuICAgIGlmICgrYWN0aXZlSm9iICE9PSAwKSB7XG5cbiAgICAgICAgY29uc3Qgam9iRGV0YWlscyA9IGF3YWl0IGZldGNoSm9iRGV0YWlscyhhY3RpdmVKb2IsIGNvbmZpZyk7XG4gICAgICAgIGpvYlN0YXRlID0gam9iRGV0YWlscy5zdGF0ZTtcbiAgICB9IGVsc2Uge1xuICAgICAgICBjdXJyZW50Sm9iID0gbnVsbDtcbiAgICAgICAgam9iU3RhdGUgPSAtMTtcbiAgICB9XG5cbiAgICByZXR1cm4ge1xuICAgICAgICBhZGRyZXNzLFxuICAgICAgICBjdXJyZW50U3RhdGUsXG4gICAgICAgIGN1cnJlbnRKb2IsXG4gICAgICAgIGN1cnJlbnRKb2JTdGF0dXM6IGpvYlN0YXRlXG4gICAgfTtcbn07XG5cbi8qKlxuICogR2V0IHdvcmtlciBieSB0aGUgd29ya2VyJ3MgaWRcbiAqIFxuICogQHBhcmFtIHtpbnRlZ2VyfSBpZCBcbiAqIEBwYXJhbSB7T2JqZWN0fSBjb25maWcgTGlicmFyeSBjb25maWcgKHByb3ZpZGVkIGJ5IHRoZSBwcm94eSBidXQgY2FuIGJlIG92ZXJyaWRkZW4pXG4gKiBAcmV0dXJucyB7UHJvbWlzZX0gQSBQcm9taXNlIG9iamVjdCByZXByZXNlbnRzIHRoZSB7T2JqZWN0fVxuICovXG5leHBvcnQgY29uc3QgZmV0Y2hXb3JrZXJCeUlkID0gYXN5bmMgKGlkLCBjb25maWcgPSB7fSkgPT4ge1xuICAgIFxuICAgIGNvbnN0IGFkZHJlc3MgPSBhd2FpdCBmZXRjaEFkZHJlc3NCeUlkKGlkLCBjb25maWcpO1xuICAgIGNvbnN0IHdvcmtlciA9IGF3YWl0IGZldGNoV29ya2VyKGFkZHJlc3MsIGNvbmZpZyk7XG5cbiAgICByZXR1cm4ge1xuICAgICAgICBpZDogaWQsXG4gICAgICAgIC4uLndvcmtlclxuICAgIH07XG59O1xuXG4vKipcbiAqIEdldCBhbGwgd29ya2Vyc1xuICogXG4gKiBAcGFyYW0ge09iamVjdH0gY29uZmlnIExpYnJhcnkgY29uZmlnIChwcm92aWRlZCBieSB0aGUgcHJveHkgYnV0IGNhbiBiZSBvdmVycmlkZGVuKVxuICogQHJldHVybnMge1Byb21pc2V9IEEgUHJvbWlzZSBvYmplY3QgcmVwcmVzZW50cyB0aGUge251bWJlcn1cbiAqL1xuZXhwb3J0IGNvbnN0IGZldGNoQWxsID0gYXN5bmMgKGNvbmZpZyA9IHt9KSA9PiB7XG4gICAgbGV0IHJlY29yZHMgPSBbXTtcbiAgICBsZXQgZXJyb3IgPSBbXTtcblxuICAgIHRyeSB7XG5cbiAgICAgICAgY29uc3QgY291bnQgPSBhd2FpdCBmZXRjaENvdW50KGNvbmZpZyk7ICAgIFxuXG4gICAgICAgIGZvciAobGV0IGk9MDsgaSA8IGNvdW50OyBpKyspIHtcbiAgICAgICAgICAgIFxuICAgICAgICAgICAgdHJ5IHtcblxuICAgICAgICAgICAgICAgIGNvbnN0IHdvcmtlciA9IGF3YWl0IGZldGNoV29ya2VyQnlJZChpLCBjb25maWcpO1xuXG4gICAgICAgICAgICAgICAgcmVjb3Jkcy5wdXNoKHtcbiAgICAgICAgICAgICAgICAgICAgaWQ6IGksXG4gICAgICAgICAgICAgICAgICAgIC4uLndvcmtlclxuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfSBjYXRjaChlcnIpIHtcbiAgICAgICAgICAgICAgICBlcnJvci5wdXNoKHtcbiAgICAgICAgICAgICAgICAgICAgaWQ6IGksXG4gICAgICAgICAgICAgICAgICAgIG1lc3NhZ2U6IGVyci5tZXNzYWdlXG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9ICAgICAgICBcbiAgICAgICAgfVxuICAgIH0gY2F0Y2goZXJyKSB7XG4gICAgICAgIGVycm9yLnB1c2goe1xuICAgICAgICAgICAgZXJyb3I6IGVyci5tZXNzYWdlXG4gICAgICAgIH0pO1xuICAgIH0gICBcblxuICAgIHJldHVybiB7XG4gICAgICAgIHJlY29yZHMsXG4gICAgICAgIGVycm9yXG4gICAgfTtcbn07XG5cbi8qKlxuICogR2V0IGNvdW50IG9mIHdvcmtlcnMgd2l0aCBcImlkbGVcIiBzdGF0dXNcbiAqIFxuICogQHBhcmFtIHtPYmplY3R9IGNvbmZpZyBMaWJyYXJ5IGNvbmZpZyAocHJvdmlkZWQgYnkgdGhlIHByb3h5IGJ1dCBjYW4gYmUgb3ZlcnJpZGRlbilcbiAqIEByZXR1cm5zIHtQcm9taXNlfSBBIFByb21pc2Ugb2JqZWN0IHJlcHJlc2VudHMgdGhlIHtudW1iZXJ9XG4gKi9cbmV4cG9ydCBjb25zdCBmZXRjaElkbGVDb3VudCA9IGFzeW5jIChjb25maWcgPSB7fSkgPT4ge1xuICAgIGNvbnN0IGFsbCA9IGF3YWl0IGZldGNoQWxsKGNvbmZpZyk7XG4gICAgcmV0dXJuIGFsbC5yZWNvcmRzLnJlZHVjZSgoYWNjLCBjdXJyKSA9PiAoY3Vyci5jdXJyZW50U3RhdGUgPT09IDIgPyBhY2MrMSA6IGFjYyksIDApO1xufTtcblxuLyoqXG4gKiBGZXRjaCBwcm9ncmVzcyBvZiBhY3RpdmUgam9iIGZvciB0aGUgd29ya2VyXG4gKlxuICogQHBhcmFtIHtTdHJpbmd9IGFkZHJlc3MgV29ya2VyJ3MgYWRkcmVzc1xuICogQHBhcmFtIHtPYmplY3R9IGNvbmZpZyBMaWJyYXJ5IGNvbmZpZyAocHJvdmlkZWQgYnkgdGhlIHByb3h5IGJ1dCBjYW4gYmUgb3ZlcnJpZGRlbilcbiAqIEByZXR1cm5zIHtQcm9taXNlPHtOdW1iZXJ9Pn0gQSBQcm9taXNlIG9iamVjdCByZXByZXNlbnRzIHRoZSBwcm9ncmVzcyB2YWx1ZVxuICovXG5leHBvcnQgY29uc3QgZmV0Y2hKb2JQcm9ncmVzcyA9IGFzeW5jIChhZGRyZXNzID0gJycsIGNvbmZpZyA9IHt9KSA9PiB7XG5cbiAgICBleHBlY3QuYWxsKHsgYWRkcmVzcyB9LCB7XG4gICAgICAgICdhZGRyZXNzJzoge1xuICAgICAgICAgICAgdHlwZTogJ2FkZHJlc3MnXG4gICAgICAgIH1cbiAgICB9KTtcblxuICAgIGV4cGVjdC5hbGwoY29uZmlnLCB7XG4gICAgICAgICd3ZWIzJzoge1xuICAgICAgICAgICAgdHlwZTogJ29iamVjdCcsXG4gICAgICAgICAgICBjb2RlOiBXRUIzX1JFUVVJUkVEXG4gICAgICAgIH0sXG4gICAgICAgICdjb250cmFjdHMuV29ya2VyTm9kZS5hYmknOiB7XG4gICAgICAgICAgICB0eXBlOiAnb2JqZWN0JyxcbiAgICAgICAgICAgIGNvZGU6IENPTlRSQUNUX1JFUVVJUkVELFxuICAgICAgICAgICAgYXJnczogWydXb3JrZXJOb2RlJ11cbiAgICAgICAgfVxuICAgIH0pO1xuXG4gICAgY29uc3Qgd29yID0gbmV3IGNvbmZpZy53ZWIzLmV0aC5Db250cmFjdChjb25maWcuY29udHJhY3RzLldvcmtlck5vZGUuYWJpLCBhZGRyZXNzKTsgICAgXG4gICAgY29uc3Qgc3RhdGUgPSBhd2FpdCB3b3IubWV0aG9kc1xuICAgICAgICAuam9iUHJvZ3Jlc3MoKVxuICAgICAgICAuY2FsbCgpO1xuXG4gICAgcmV0dXJuIE1hdGguY2VpbChOdW1iZXIucGFyc2VJbnQoc3RhdGUsIDEwKSk7XG59O1xuXG4vKipcbiAqIEhhbmRsZSBldmVudCBXb3JrZXJOb2RlQ3JlYXRlZFxuICogXG4gKiBAcGFyYW0ge09iamVjdH0gb3B0aW9ucyBFdmVudCBoYW5kbGVyIG9wdGlvbnNcbiAqIEBwYXJhbSB7T2JqZWN0fSBjb25maWcgTGlicmFyeSBjb25maWcgKHByb3ZpZGVkIGJ5IHRoZSBwcm94eSBidXQgY2FuIGJlIG92ZXJyaWRkZW4pXG4gKiBAcmV0dXJucyB7UHJvbWlzZTx7T2JqZWN0fT59IFBQcm9taXNlIG9iamVjdCByZXNvbHZlZCB0byB0aGUgb2JqZWN0IHdpdGggY2hhaW5lZCBjYWxsYmFja3MgI2RhdGEgYW5kICNlcnJvclxuICovXG5leHBvcnQgY29uc3QgZXZlbnRXb3JrZXJOb2RlQ3JlYXRlZCA9IGFzeW5jIChvcHRpb25zID0ge30sIGNvbmZpZyA9IHt9KSA9PiB7XG5cbiAgICBleHBlY3QuYWxsKHsgb3B0aW9ucyB9LCB7XG4gICAgICAgICdvcHRpb25zJzoge1xuICAgICAgICAgICAgdHlwZTogJ29iamVjdCdcbiAgICAgICAgfVxuICAgIH0pO1xuXG4gICAgZXhwZWN0LmFsbChjb25maWcsIHtcbiAgICAgICAgJ3dlYjMnOiB7XG4gICAgICAgICAgICB0eXBlOiAnb2JqZWN0JyxcbiAgICAgICAgICAgIGNvZGU6IFdFQjNfUkVRVUlSRURcbiAgICAgICAgfSxcbiAgICAgICAgJ2NvbnRyYWN0cy5QYW5kb3JhLmFiaSc6IHtcbiAgICAgICAgICAgIHR5cGU6ICdvYmplY3QnLFxuICAgICAgICAgICAgY29kZTogQ09OVFJBQ1RfUkVRVUlSRUQsXG4gICAgICAgICAgICBhcmdzOiBbJ1BhbmRvcmEnXVxuICAgICAgICB9LFxuICAgICAgICAnYWRkcmVzc2VzLlBhbmRvcmEnOiB7XG4gICAgICAgICAgICB0eXBlOiAnYWRkcmVzcycsXG4gICAgICAgICAgICBjb2RlOiBBRERSRVNTX1JFUVVJUkVELFxuICAgICAgICAgICAgYXJnczogWydQYW5kb3JhJ11cbiAgICAgICAgfVxuICAgIH0pO1xuXG4gICAgY29uc3QgY2FsbGJhY2tzID0ge1xuICAgICAgICBvbkRhdGE6ICgpID0+IHt9LFxuICAgICAgICBvbkVycm9yOiAoKSA9PiB7fVxuICAgIH07XG5cbiAgICBjb25zdCBjaGFpbiA9IHtcbiAgICAgICAgZGF0YTogKGNiID0gKCkgPT4ge30pID0+IHtcbiAgICAgICAgICAgIGNhbGxiYWNrcy5vbkRhdGEgPSBjYjtcbiAgICAgICAgICAgIHJldHVybiBjaGFpbjtcbiAgICAgICAgfSxcbiAgICAgICAgZXJyb3I6IChjYiA9ICgpID0+IHt9KSA9PiB7XG4gICAgICAgICAgICBjYWxsYmFja3Mub25FcnJvciA9IGNiO1xuICAgICAgICAgICAgcmV0dXJuIGNoYWluO1xuICAgICAgICB9XG4gICAgfTtcblxuICAgIGNvbnN0IHBhbiA9IG5ldyBjb25maWcud2ViMy5ldGguQ29udHJhY3QoY29uZmlnLmNvbnRyYWN0cy5QYW5kb3JhLmFiaSwgY29uZmlnLmFkZHJlc3Nlcy5QYW5kb3JhKTtcbiAgICBjaGFpbi5ldmVudCA9IFtdO1xuICAgIGNoYWluLmV2ZW50WzBdID0gcGFuLmV2ZW50cy5Xb3JrZXJOb2RlQ3JlYXRlZChvcHRpb25zKVxuICAgICAgICAub24oJ2RhdGEnLCBhc3luYyBldmVudCA9PiB7XG5cbiAgICAgICAgICAgIHRyeSB7XG5cbiAgICAgICAgICAgICAgICBjb25zdCB3b3JrZXIgPSBhd2FpdCBmZXRjaFdvcmtlcihldmVudC5yZXR1cm5WYWx1ZXMud29ya2VyTm9kZSwgY29uZmlnKTtcbiAgICAgICAgICAgICAgICBjYWxsYmFja3Mub25EYXRhKHtcbiAgICAgICAgICAgICAgICAgICAgcmVjb3JkczogW3dvcmtlcl0sXG4gICAgICAgICAgICAgICAgICAgIGV2ZW50XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9IGNhdGNoKGVycikge1xuICAgICAgICAgICAgICAgIGNhbGxiYWNrcy5vbkVycm9yKGVycik7XG4gICAgICAgICAgICB9ICAgICAgICAgICAgXG4gICAgICAgIH0pXG4gICAgICAgIC5vbignZXJyb3InLCBjYWxsYmFja3Mub25FcnJvcik7XG4gICAgY2hhaW4uZXZlbnRbMF0ubmFtZSA9ICdXb3JrZXJOb2RlQ3JlYXRlZCc7XG5cbiAgICByZXR1cm4gY2hhaW47XG59O1xuXG4vKipcbiAqIEhhbmRsZSBldmVudCBTdGF0ZUNoYW5nZWQgZm9yIFdvcmtlck5vZGVcbiAqIFxuICogQHBhcmFtIHtTdHJpbmd9IGFkZHJlc3NcbiAqIEBwYXJhbSB7T2JqZWN0fSBvcHRpb25zXG4gKiBAcGFyYW0ge09iamVjdH0gY29uZmlnIExpYnJhcnkgY29uZmlnIChwcm92aWRlZCBieSB0aGUgcHJveHkgYnV0IGNhbiBiZSBvdmVycmlkZGVuKVxuICogQHJldHVybnMge1Byb21pc2U8e09iamVjdH0+fSBQUHJvbWlzZSBvYmplY3QgcmVzb2x2ZWQgdG8gdGhlIG9iamVjdCB3aXRoIGNoYWluZWQgY2FsbGJhY2tzICNkYXRhIGFuZCAjZXJyb3JcbiAqL1xuZXhwb3J0IGNvbnN0IGV2ZW50V29ya2VyTm9kZVN0YXRlQ2hhbmdlZCA9IGFzeW5jIChhZGRyZXNzID0gJycsIG9wdGlvbnMgPSB7fSwgY29uZmlnID0ge30pID0+IHtcblxuICAgIGV4cGVjdC5hbGwoeyBhZGRyZXNzIH0sIHtcbiAgICAgICAgJ2FkZHJlc3MnOiB7XG4gICAgICAgICAgICB0eXBlOiAnYWRkcmVzcydcbiAgICAgICAgfVxuICAgIH0pO1xuXG4gICAgZXhwZWN0LmFsbChjb25maWcsIHtcbiAgICAgICAgJ3dlYjMnOiB7XG4gICAgICAgICAgICB0eXBlOiAnb2JqZWN0JyxcbiAgICAgICAgICAgIGNvZGU6IFdFQjNfUkVRVUlSRURcbiAgICAgICAgfSxcbiAgICAgICAgJ2NvbnRyYWN0cy5Xb3JrZXJOb2RlLmFiaSc6IHtcbiAgICAgICAgICAgIHR5cGU6ICdvYmplY3QnLFxuICAgICAgICAgICAgY29kZTogQ09OVFJBQ1RfUkVRVUlSRUQsXG4gICAgICAgICAgICBhcmdzOiBbJ1dvcmtlck5vZGUnXVxuICAgICAgICB9XG4gICAgfSk7XG5cbiAgICBjb25zdCBjYWxsYmFja3MgPSB7XG4gICAgICAgIG9uRGF0YTogKCkgPT4ge30sXG4gICAgICAgIG9uRXJyb3I6ICgpID0+IHt9XG4gICAgfTtcblxuICAgIGNvbnN0IGNoYWluID0ge1xuICAgICAgICBkYXRhOiAoY2IgPSAoKSA9PiB7fSkgPT4ge1xuICAgICAgICAgICAgY2FsbGJhY2tzLm9uRGF0YSA9IGNiO1xuICAgICAgICAgICAgcmV0dXJuIGNoYWluO1xuICAgICAgICB9LFxuICAgICAgICBlcnJvcjogKGNiID0gKCkgPT4ge30pID0+IHtcbiAgICAgICAgICAgIGNhbGxiYWNrcy5vbkVycm9yID0gY2I7XG4gICAgICAgICAgICByZXR1cm4gY2hhaW47XG4gICAgICAgIH1cbiAgICB9O1xuXG4gICAgY29uc3Qgd29yID0gbmV3IGNvbmZpZy53ZWIzLmV0aC5Db250cmFjdChjb25maWcuY29udHJhY3RzLldvcmtlck5vZGUuYWJpLCBhZGRyZXNzKTtcbiAgICBjaGFpbi5ldmVudCA9IFtdO1xuICAgIGNoYWluLmV2ZW50WzBdID0gd29yLmV2ZW50cy5TdGF0ZUNoYW5nZWQob3B0aW9ucylcbiAgICAgICAgLm9uKCdkYXRhJywgYXN5bmMgZXZlbnQgPT4ge1xuXG4gICAgICAgICAgICB0cnkge1xuXG4gICAgICAgICAgICAgICAgY29uc3Qgd29ya2VyID0gYXdhaXQgZmV0Y2hXb3JrZXIoYWRkcmVzcywgY29uZmlnKTtcbiAgICAgICAgICAgICAgICBjYWxsYmFja3Mub25EYXRhKHtcbiAgICAgICAgICAgICAgICAgICAgcmVjb3JkczogW3dvcmtlcl0sXG4gICAgICAgICAgICAgICAgICAgIGV2ZW50XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9IGNhdGNoKGVycikge1xuICAgICAgICAgICAgICAgIGNhbGxiYWNrcy5vbkVycm9yKGVycik7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pXG4gICAgICAgIC5vbignZXJyb3InLCBjYWxsYmFja3Mub25FcnJvcik7XG4gICAgY2hhaW4uZXZlbnRbMF0ubmFtZSA9ICdTdGF0ZUNoYW5nZWQnO1xuXG4gICAgcmV0dXJuIGNoYWluO1xufTtcblxuLyoqXG4gKiBUcmFuc2l0aW9uIG9mIGEgV29ya2VyTm9kZSB0byB0aGUgSWRsZSBzdGF0ZVxuICogXG4gKiBAcGFyYW0ge1N0cmluZ30gd29ya2VyTm9kZUFkZHJlc3MgXG4gKiBAcGFyYW0ge1N0cmluZ30gZnJvbVxuICogQHBhcmFtIHtPYmplY3R9IGNvbmZpZyBMaWJyYXJ5IGNvbmZpZyAocHJvdmlkZWQgYnkgdGhlIHByb3h5IGJ1dCBjYW4gYmUgb3ZlcnJpZGRlbilcbiAqIEByZXR1cm5zIHtQcm9taXNlfSBQcm9taXNlIG9iamVjdCByZXNvbHZlZCB0byBhZGQgc3RhdHVzIChib29sZWFuKVxuICovXG5leHBvcnQgY29uc3QgYWxpdmUgPSAod29ya2VyTm9kZUFkZHJlc3MsIGZyb20sIGNvbmZpZyA9IHt9KSA9PiBuZXcgUHJvbWlzZShhc3luYyAocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG5cbiAgICBleHBlY3QuYWxsKHsgd29ya2VyTm9kZUFkZHJlc3MsIGZyb20gfSwge1xuICAgICAgICAnd29ya2VyTm9kZUFkZHJlc3MnOiB7XG4gICAgICAgICAgICB0eXBlOiAnYWRkcmVzcydcbiAgICAgICAgfSxcbiAgICAgICAgJ2Zyb20nOiB7XG4gICAgICAgICAgICB0eXBlOiAnYWRkcmVzcydcbiAgICAgICAgfVxuICAgIH0pO1xuXG4gICAgZXhwZWN0LmFsbChjb25maWcsIHtcbiAgICAgICAgJ3dlYjMnOiB7XG4gICAgICAgICAgICB0eXBlOiAnb2JqZWN0JyxcbiAgICAgICAgICAgIGNvZGU6IFdFQjNfUkVRVUlSRURcbiAgICAgICAgfSxcbiAgICAgICAgJ2NvbnRyYWN0cy5Xb3JrZXJOb2RlLmFiaSc6IHtcbiAgICAgICAgICAgIHR5cGU6ICdvYmplY3QnLFxuICAgICAgICAgICAgY29kZTogQ09OVFJBQ1RfUkVRVUlSRUQsXG4gICAgICAgICAgICBhcmdzOiBbJ1dvcmtlck5vZGUnXVxuICAgICAgICB9XG4gICAgfSk7XG5cbiAgICBjb25zdCB3cm4gPSBuZXcgY29uZmlnLndlYjMuZXRoLkNvbnRyYWN0KGNvbmZpZy5jb250cmFjdHMuV29ya2VyTm9kZS5hYmksIHdvcmtlck5vZGVBZGRyZXNzKTtcbiAgICBjb25zdCBnYXNQcmljZSA9IGF3YWl0IGNvbmZpZy53ZWIzLmV0aC5nZXRHYXNQcmljZSgpO1xuICAgIHdybi5tZXRob2RzXG4gICAgICAgIC5hbGl2ZSgpXG4gICAgICAgIC5zZW5kKHtcbiAgICAgICAgICAgIGZyb20sXG4gICAgICAgICAgICBnYXNQcmljZSxcbiAgICAgICAgICAgIGdhczogNjcwMDAwMFxuICAgICAgICB9KVxuICAgICAgICAub24oJ2Vycm9yJywgcmVqZWN0KVxuICAgICAgICAub24oJ3JlY2VpcHQnLCByZWNlaXB0ID0+IHtcblxuICAgICAgICAgICAgaWYgKE51bWJlcihyZWNlaXB0LnN0YXR1cykgPT09IDApIHtcblxuICAgICAgICAgICAgICAgIHJldHVybiByZWplY3QocGpzRXJyb3IoVFJBTlNBQ1RJT05fVU5TVUNDRVNTRlVMKSk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHJlc29sdmUocmVjZWlwdCk7XG4gICAgICAgIH0pO1xufSk7XG4iXX0=