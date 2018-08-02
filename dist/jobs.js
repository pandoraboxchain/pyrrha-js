/**
 * Cognitive Jobs related methods
 * This file it is a part of the Pandora Pyrrha Javascript library
 * 
 * @file jobs.js
 * @author Kostiantyn Smyrnov <kostysh@gmail.com>
 * @date 2018
 */
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.eventJobStateChanged = exports.eventCognitiveJobCreated = exports.fetchAll = exports.create = exports.fetchJobsIds = exports.fetchJobDetails = exports.fetchCompletedJobsCount = exports.fetchActiveJobsCount = exports.fetchJobControllerAddress = void 0;

require("core-js/modules/es6.array.from");

require("core-js/modules/es6.regexp.to-string");

require("core-js/modules/es7.symbol.async-iterator");

require("core-js/modules/es6.symbol");

require("core-js/modules/es6.promise");

require("core-js/modules/es6.number.constructor");

require("core-js/modules/es6.number.parse-int");

require("regenerator-runtime/runtime");

require("core-js/modules/web.dom.iterable");

require("core-js/modules/es6.array.iterator");

require("core-js/modules/es6.map");

var expect = _interopRequireWildcard(require("./helpers/expect"));

var _errors = _interopRequireWildcard(require("./helpers/errors"));

var _kernels = require("./kernels");

var _datasets = require("./datasets");

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var localCache = new Map();
/**
 * Get job controller address
 * 
 * @param {Object} config Library config (provided by the proxy but can be overridden)
 * @returns {Promise<{String}>} 
 */

var fetchJobControllerAddress =
/*#__PURE__*/
function () {
  var _ref = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee() {
    var config,
        pan,
        jobController,
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
              'addresses.Pandora': {
                type: 'address',
                code: _errors.ADDRESS_REQUIRED,
                args: ['Pandora']
              },
              'contracts.Pandora.abi': {
                type: 'object',
                code: _errors.CONTRACT_REQUIRED,
                args: ['Pandora']
              }
            });
            pan = new config.web3.eth.Contract(config.contracts.Pandora.abi, config.addresses.Pandora);
            _context.next = 5;
            return pan.methods.jobController().call();

          case 5:
            jobController = _context.sent;
            // save for later use
            localCache.set('jobController', jobController);
            return _context.abrupt("return", jobController);

          case 8:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, this);
  }));

  return function fetchJobControllerAddress() {
    return _ref.apply(this, arguments);
  };
}();
/**
 * Get active jobs count 
 * 
 * @param {Object} config Library config (provided by the proxy but can be overridden)
 * @returns {Promise<{Number}>} 
 */


exports.fetchJobControllerAddress = fetchJobControllerAddress;

var fetchActiveJobsCount =
/*#__PURE__*/
function () {
  var _ref2 = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee2() {
    var config,
        jobController,
        jctrl,
        count,
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
              'contracts.CognitiveJobController.abi': {
                type: 'object',
                code: _errors.CONTRACT_REQUIRED,
                args: ['CognitiveJobController']
              }
            });
            jobController = localCache.get('jobController');

            if (jobController) {
              _context2.next = 7;
              break;
            }

            _context2.next = 6;
            return fetchJobControllerAddress(config);

          case 6:
            jobController = _context2.sent;

          case 7:
            jctrl = new config.web3.eth.Contract(config.contracts.CognitiveJobController.abi, jobController);
            _context2.next = 10;
            return jctrl.methods.activeJobsCount().call();

          case 10:
            count = _context2.sent;
            return _context2.abrupt("return", Number.parseInt(count, 10));

          case 12:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2, this);
  }));

  return function fetchActiveJobsCount() {
    return _ref2.apply(this, arguments);
  };
}();
/**
 * Get completed jobs count 
 * 
 * @param {Object} config Library config (provided by the proxy but can be overridden)
 * @returns {Promise<{Number}>} 
 */


exports.fetchActiveJobsCount = fetchActiveJobsCount;

var fetchCompletedJobsCount =
/*#__PURE__*/
function () {
  var _ref3 = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee3() {
    var config,
        jobController,
        jctrl,
        count,
        _args3 = arguments;
    return regeneratorRuntime.wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            config = _args3.length > 0 && _args3[0] !== undefined ? _args3[0] : {};
            expect.all(config, {
              'web3': {
                type: 'object',
                code: _errors.WEB3_REQUIRED
              },
              'contracts.CognitiveJobController.abi': {
                type: 'object',
                code: _errors.CONTRACT_REQUIRED,
                args: ['CognitiveJobController']
              }
            });
            jobController = localCache.get('jobController');

            if (jobController) {
              _context3.next = 7;
              break;
            }

            _context3.next = 6;
            return fetchJobControllerAddress(config);

          case 6:
            jobController = _context3.sent;

          case 7:
            jctrl = new config.web3.eth.Contract(config.contracts.CognitiveJobController.abi, jobController);
            _context3.next = 10;
            return jctrl.methods.completedJobsCount().call();

          case 10:
            count = _context3.sent;
            return _context3.abrupt("return", Number.parseInt(count, 10));

          case 12:
          case "end":
            return _context3.stop();
        }
      }
    }, _callee3, this);
  }));

  return function fetchCompletedJobsCount() {
    return _ref3.apply(this, arguments);
  };
}();
/**
 * Get job details 
 * 
 * @param {String} address Job address
 * @param {Object} config Library config (provided by the proxy but can be overridden)
 * @returns {Promise<{Number}>} 
 */


exports.fetchCompletedJobsCount = fetchCompletedJobsCount;

var fetchJobDetails =
/*#__PURE__*/
function () {
  var _ref4 = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee4(address) {
    var config,
        jobController,
        jctrl,
        _ref5,
        kernel,
        dataset,
        complexity,
        description,
        activeWorkers,
        progress,
        state,
        kernelIpfs,
        datasetIpfs,
        ipfsResults,
        utf8description,
        _args4 = arguments;

    return regeneratorRuntime.wrap(function _callee4$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            config = _args4.length > 1 && _args4[1] !== undefined ? _args4[1] : {};
            expect.all(config, {
              'web3': {
                type: 'object',
                code: _errors.WEB3_REQUIRED
              },
              'contracts.CognitiveJobController.abi': {
                type: 'object',
                code: _errors.CONTRACT_REQUIRED,
                args: ['CognitiveJobController']
              }
            });
            jobController = localCache.get('jobController');

            if (jobController) {
              _context4.next = 7;
              break;
            }

            _context4.next = 6;
            return fetchJobControllerAddress(config);

          case 6:
            jobController = _context4.sent;

          case 7:
            jctrl = new config.web3.eth.Contract(config.contracts.CognitiveJobController.abi, jobController);
            _context4.next = 10;
            return jctrl.methods.getCognitiveJobDetails(address).call();

          case 10:
            _ref5 = _context4.sent;
            kernel = _ref5.kernel;
            dataset = _ref5.dataset;
            complexity = _ref5.complexity;
            description = _ref5.description;
            activeWorkers = _ref5.activeWorkers;
            progress = _ref5.progress;
            state = _ref5.state;
            _context4.next = 20;
            return (0, _kernels.fetchIpfsAddress)(kernel, config);

          case 20:
            kernelIpfs = _context4.sent;
            _context4.next = 23;
            return (0, _datasets.fetchIpfsAddress)(dataset, config);

          case 23:
            datasetIpfs = _context4.sent;
            _context4.next = 26;
            return Promise.all(activeWorkers.map(function (_, index) {
              return jctrl.methods.getCognitiveJobResults(address, index).call();
            }));

          case 26:
            ipfsResults = _context4.sent;
            utf8description = description ? config.web3.utils.hexToUtf8(description) : '';
            return _context4.abrupt("return", {
              address: address,
              kernel: kernel,
              kernelIpfs: kernelIpfs,
              dataset: dataset,
              datasetIpfs: datasetIpfs,
              activeWorkers: activeWorkers,
              ipfsResults: ipfsResults.map(function (result) {
                return result ? config.web3.utils.hexToUtf8(result) : result;
              }).filter(function (res) {
                return res;
              }),
              complexity: Number(complexity),
              progress: Number(progress),
              state: Number(state),
              description: utf8description.substr(2),
              jobType: utf8description.substr(0, 1)
            });

          case 29:
          case "end":
            return _context4.stop();
        }
      }
    }, _callee4, this);
  }));

  return function fetchJobDetails(_x) {
    return _ref4.apply(this, arguments);
  };
}();
/**
 * Get jobs Id from the "source"
 * 
 * @param {String} from source activeJobs or completedJobs
 * @param {Number} count
 * @param {Object} options
 * @returns {Promise<[{String}]>} 
 */


exports.fetchJobDetails = fetchJobDetails;

var fetchJobsIds =
/*#__PURE__*/
function () {
  var _ref6 = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee5(source) {
    var count,
        config,
        jobController,
        counts,
        jctrl,
        addresses,
        _args5 = arguments;
    return regeneratorRuntime.wrap(function _callee5$(_context5) {
      while (1) {
        switch (_context5.prev = _context5.next) {
          case 0:
            count = _args5.length > 1 && _args5[1] !== undefined ? _args5[1] : 0;
            config = _args5.length > 2 && _args5[2] !== undefined ? _args5[2] : {};
            expect.all({
              source: source
            }, {
              'source': {
                type: 'enum',
                values: ['activeJobs', 'completedJobs']
              }
            });
            expect.all(config, {
              'web3': {
                type: 'object',
                code: _errors.WEB3_REQUIRED
              },
              'contracts.CognitiveJobController.abi': {
                type: 'object',
                code: _errors.CONTRACT_REQUIRED,
                args: ['CognitiveJobController']
              }
            });
            jobController = localCache.get('jobController');

            if (jobController) {
              _context5.next = 9;
              break;
            }

            _context5.next = 8;
            return fetchJobControllerAddress(config);

          case 8:
            jobController = _context5.sent;

          case 9:
            // numbers sequence from 0 to count
            counts = _toConsumableArray(Array(count).keys());
            jctrl = new config.web3.eth.Contract(config.contracts.CognitiveJobController.abi, jobController);
            _context5.next = 13;
            return Promise.all(counts.map(function (index) {
              return jctrl.methods.getJobId(index, source === 'activeJobs').call();
            }));

          case 13:
            addresses = _context5.sent;
            return _context5.abrupt("return", addresses);

          case 15:
          case "end":
            return _context5.stop();
        }
      }
    }, _callee5, this);
  }));

  return function fetchJobsIds(_x2) {
    return _ref6.apply(this, arguments);
  };
}();
/**
 * Create cognitive job contract
 * 
 * @param {Object} options
 * @param {String} from Publisher address
 * @param {Object} config Library config (provided by the proxy but can be overridden)
 * @returns {Promise} Promise object resolved to add status (boolean)
 */


exports.fetchJobsIds = fetchJobsIds;

var create = function create(_ref7, from) {
  var kernel = _ref7.kernel,
      dataset = _ref7.dataset,
      complexity = _ref7.complexity,
      jobType = _ref7.jobType,
      description = _ref7.description,
      deposit = _ref7.deposit;
  var config = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
  return new Promise(
  /*#__PURE__*/
  function () {
    var _ref8 = _asyncToGenerator(
    /*#__PURE__*/
    regeneratorRuntime.mark(function _callee6(resolve, reject) {
      var pan, gasPrice;
      return regeneratorRuntime.wrap(function _callee6$(_context6) {
        while (1) {
          switch (_context6.prev = _context6.next) {
            case 0:
              expect.all({
                kernel: kernel,
                dataset: dataset,
                complexity: complexity,
                jobType: jobType,
                description: description,
                deposit: deposit,
                from: from
              }, {
                'kernel': {
                  type: 'address'
                },
                'dataset': {
                  type: 'address'
                },
                'complexity': {
                  type: 'number'
                },
                'jobType': {
                  type: 'string'
                },
                'description': {
                  type: 'string'
                },
                'deposit': {
                  type: 'number'
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
              _context6.next = 5;
              return config.web3.eth.getGasPrice();

            case 5:
              gasPrice = _context6.sent;
              pan.methods.createCognitiveJob(kernel, dataset, complexity, config.web3.utils.utf8ToHex("".concat(jobType, ";").concat(description))).send({
                value: config.web3.utils.toWei(String(deposit)),
                from: from,
                gasPrice: gasPrice,
                gas: 6700000 // because this workflow is too greedy

              }).on('error', reject).on('receipt', function (receipt) {
                try {
                  if (Number(receipt.status) === 0) {
                    return reject((0, _errors.default)(_errors.TRANSACTION_UNSUCCESSFUL));
                  }

                  if (receipt.events.CognitiveJobQueued) {
                    return resolve(receipt.events.CognitiveJobQueued.returnValues.jobId);
                  }

                  resolve(receipt.events.CognitiveJobCreated.returnValues.jobId);
                } catch (err) {
                  reject(err);
                }
              });

            case 7:
            case "end":
              return _context6.stop();
          }
        }
      }, _callee6, this);
    }));

    return function (_x3, _x4) {
      return _ref8.apply(this, arguments);
    };
  }());
};
/**
 * Get all jobs
 * 
 * @param {Object} config Library config (provided by the proxy but can be overridden)
 * @returns {Promise} A Promise object represents the {Object[]} 
 */


exports.create = create;

var fetchAll =
/*#__PURE__*/
function () {
  var _ref9 = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee7() {
    var config,
        records,
        error,
        _ref10,
        _ref11,
        activeCount,
        completedCount,
        _ref12,
        _ref13,
        activeJobsIds,
        completedJobsIds,
        allJobsIds,
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
            return Promise.all([fetchActiveJobsCount(config), fetchCompletedJobsCount(config)]);

          case 6:
            _ref10 = _context7.sent;
            _ref11 = _slicedToArray(_ref10, 2);
            activeCount = _ref11[0];
            completedCount = _ref11[1];
            _context7.next = 12;
            return Promise.all([fetchJobsIds('activeJobs', activeCount, config), fetchJobsIds('completedJobs', completedCount, config)]);

          case 12:
            _ref12 = _context7.sent;
            _ref13 = _slicedToArray(_ref12, 2);
            activeJobsIds = _ref13[0];
            completedJobsIds = _ref13[1];
            allJobsIds = _toConsumableArray(activeJobsIds).concat(_toConsumableArray(completedJobsIds));
            _context7.next = 19;
            return Promise.all(allJobsIds.map(function (jobId) {
              return fetchJobDetails(jobId, config);
            }));

          case 19:
            records = _context7.sent;
            _context7.next = 25;
            break;

          case 22:
            _context7.prev = 22;
            _context7.t0 = _context7["catch"](3);
            error.push({
              error: _context7.t0.message
            });

          case 25:
            return _context7.abrupt("return", {
              records: records,
              error: error
            });

          case 26:
          case "end":
            return _context7.stop();
        }
      }
    }, _callee7, this, [[3, 22]]);
  }));

  return function fetchAll() {
    return _ref9.apply(this, arguments);
  };
}();
/**
 * Handle event CognitiveJobCreated
 * 
 * @param {Object} options Event handler options
 * @param {Object} config Library config (provided by the proxy but can be overridden)
 * @returns {Object} Object with chained callbacks #data and #error
 */


exports.fetchAll = fetchAll;

var eventCognitiveJobCreated = function eventCognitiveJobCreated() {
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
  chain.event = pan.events.CognitiveJobCreated(options).on('data',
  /*#__PURE__*/
  function () {
    var _ref14 = _asyncToGenerator(
    /*#__PURE__*/
    regeneratorRuntime.mark(function _callee8(event) {
      var jobDetails;
      return regeneratorRuntime.wrap(function _callee8$(_context8) {
        while (1) {
          switch (_context8.prev = _context8.next) {
            case 0:
              _context8.prev = 0;
              _context8.next = 3;
              return fetchJobDetails(event.returnValues.jobId, config);

            case 3:
              jobDetails = _context8.sent;
              callbacks.onData({
                records: [jobDetails],
                event: event
              });
              _context8.next = 10;
              break;

            case 7:
              _context8.prev = 7;
              _context8.t0 = _context8["catch"](0);
              callbacks.onError(_context8.t0);

            case 10:
            case "end":
              return _context8.stop();
          }
        }
      }, _callee8, this, [[0, 7]]);
    }));

    return function (_x5) {
      return _ref14.apply(this, arguments);
    };
  }()).on('error', callbacks.onError);
  return chain;
};
/**
 * Handle event JobStateChanged
 * 
 * @param {Object} options Event handler options
 * @param {Object} config Library config (provided by the proxy but can be overridden)
 * @returns {Object} Object with chained callbacks #data and #error
 */


exports.eventCognitiveJobCreated = eventCognitiveJobCreated;

var eventJobStateChanged = function eventJobStateChanged() {
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

  _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee10() {
    var jobController, jctrl;
    return regeneratorRuntime.wrap(function _callee10$(_context10) {
      while (1) {
        switch (_context10.prev = _context10.next) {
          case 0:
            jobController = localCache.get('jobController');

            if (jobController) {
              _context10.next = 5;
              break;
            }

            _context10.next = 4;
            return fetchJobControllerAddress(config);

          case 4:
            jobController = _context10.sent;

          case 5:
            jctrl = new config.web3.eth.Contract(config.contracts.CognitiveJobController.abi, jobController);
            chain.event = jctrl.events.JobStateChanged(options).on('data',
            /*#__PURE__*/
            function () {
              var _ref16 = _asyncToGenerator(
              /*#__PURE__*/
              regeneratorRuntime.mark(function _callee9(event) {
                var jobDetails;
                return regeneratorRuntime.wrap(function _callee9$(_context9) {
                  while (1) {
                    switch (_context9.prev = _context9.next) {
                      case 0:
                        _context9.prev = 0;
                        _context9.next = 3;
                        return fetchJobDetails(event.returnValues.jobId, config);

                      case 3:
                        jobDetails = _context9.sent;
                        callbacks.onData({
                          records: [jobDetails],
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

              return function (_x6) {
                return _ref16.apply(this, arguments);
              };
            }()).on('error', callbacks.onError);

          case 7:
          case "end":
            return _context10.stop();
        }
      }
    }, _callee10, this);
  }))();

  return chain;
};

exports.eventJobStateChanged = eventJobStateChanged;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9qb2JzLmpzIl0sIm5hbWVzIjpbImxvY2FsQ2FjaGUiLCJNYXAiLCJmZXRjaEpvYkNvbnRyb2xsZXJBZGRyZXNzIiwiY29uZmlnIiwiZXhwZWN0IiwiYWxsIiwidHlwZSIsImNvZGUiLCJXRUIzX1JFUVVJUkVEIiwiQUREUkVTU19SRVFVSVJFRCIsImFyZ3MiLCJDT05UUkFDVF9SRVFVSVJFRCIsInBhbiIsIndlYjMiLCJldGgiLCJDb250cmFjdCIsImNvbnRyYWN0cyIsIlBhbmRvcmEiLCJhYmkiLCJhZGRyZXNzZXMiLCJtZXRob2RzIiwiam9iQ29udHJvbGxlciIsImNhbGwiLCJzZXQiLCJmZXRjaEFjdGl2ZUpvYnNDb3VudCIsImdldCIsImpjdHJsIiwiQ29nbml0aXZlSm9iQ29udHJvbGxlciIsImFjdGl2ZUpvYnNDb3VudCIsImNvdW50IiwiTnVtYmVyIiwicGFyc2VJbnQiLCJmZXRjaENvbXBsZXRlZEpvYnNDb3VudCIsImNvbXBsZXRlZEpvYnNDb3VudCIsImZldGNoSm9iRGV0YWlscyIsImFkZHJlc3MiLCJnZXRDb2duaXRpdmVKb2JEZXRhaWxzIiwia2VybmVsIiwiZGF0YXNldCIsImNvbXBsZXhpdHkiLCJkZXNjcmlwdGlvbiIsImFjdGl2ZVdvcmtlcnMiLCJwcm9ncmVzcyIsInN0YXRlIiwia2VybmVsSXBmcyIsImRhdGFzZXRJcGZzIiwiUHJvbWlzZSIsIm1hcCIsIl8iLCJpbmRleCIsImdldENvZ25pdGl2ZUpvYlJlc3VsdHMiLCJpcGZzUmVzdWx0cyIsInV0ZjhkZXNjcmlwdGlvbiIsInV0aWxzIiwiaGV4VG9VdGY4IiwicmVzdWx0IiwiZmlsdGVyIiwicmVzIiwic3Vic3RyIiwiam9iVHlwZSIsImZldGNoSm9ic0lkcyIsInNvdXJjZSIsInZhbHVlcyIsImNvdW50cyIsIkFycmF5Iiwia2V5cyIsImdldEpvYklkIiwiY3JlYXRlIiwiZnJvbSIsImRlcG9zaXQiLCJyZXNvbHZlIiwicmVqZWN0IiwiZ2V0R2FzUHJpY2UiLCJnYXNQcmljZSIsImNyZWF0ZUNvZ25pdGl2ZUpvYiIsInV0ZjhUb0hleCIsInNlbmQiLCJ2YWx1ZSIsInRvV2VpIiwiU3RyaW5nIiwiZ2FzIiwib24iLCJyZWNlaXB0Iiwic3RhdHVzIiwiVFJBTlNBQ1RJT05fVU5TVUNDRVNTRlVMIiwiZXZlbnRzIiwiQ29nbml0aXZlSm9iUXVldWVkIiwicmV0dXJuVmFsdWVzIiwiam9iSWQiLCJDb2duaXRpdmVKb2JDcmVhdGVkIiwiZXJyIiwiZmV0Y2hBbGwiLCJyZWNvcmRzIiwiZXJyb3IiLCJhY3RpdmVDb3VudCIsImNvbXBsZXRlZENvdW50IiwiYWN0aXZlSm9ic0lkcyIsImNvbXBsZXRlZEpvYnNJZHMiLCJhbGxKb2JzSWRzIiwicHVzaCIsIm1lc3NhZ2UiLCJldmVudENvZ25pdGl2ZUpvYkNyZWF0ZWQiLCJvcHRpb25zIiwiY2FsbGJhY2tzIiwib25EYXRhIiwib25FcnJvciIsImNoYWluIiwiZGF0YSIsImNiIiwiZXZlbnQiLCJqb2JEZXRhaWxzIiwiZXZlbnRKb2JTdGF0ZUNoYW5nZWQiLCJKb2JTdGF0ZUNoYW5nZWQiXSwibWFwcGluZ3MiOiJBQUFBOzs7Ozs7OztBQVNBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUVBOztBQUNBOztBQU9BOztBQUlBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFJQSxJQUFNQSxVQUFVLEdBQUcsSUFBSUMsR0FBSixFQUFuQjtBQUVBOzs7Ozs7O0FBTU8sSUFBTUMseUJBQXlCO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQSwwQkFBRztBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBT0MsWUFBQUEsTUFBUCwyREFBZ0IsRUFBaEI7QUFFckNDLFlBQUFBLE1BQU0sQ0FBQ0MsR0FBUCxDQUFXRixNQUFYLEVBQW1CO0FBQ2Ysc0JBQVE7QUFDSkcsZ0JBQUFBLElBQUksRUFBRSxRQURGO0FBRUpDLGdCQUFBQSxJQUFJLEVBQUVDO0FBRkYsZUFETztBQUtmLG1DQUFxQjtBQUNqQkYsZ0JB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TixPQWRNLEVBY0dzQixTQUFTLENBQUNFLE9BZGIsQ0FBZDs7QUFWSDtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQSxHQUFEOztBQTJCQSxTQUFPQyxLQUFQO0FBQ0gsQ0FyRU0iLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIENvZ25pdGl2ZSBKb2JzIHJlbGF0ZWQgbWV0aG9kc1xuICogVGhpcyBmaWxlIGl0IGlzIGEgcGFydCBvZiB0aGUgUGFuZG9yYSBQeXJyaGEgSmF2YXNjcmlwdCBsaWJyYXJ5XG4gKiBcbiAqIEBmaWxlIGpvYnMuanNcbiAqIEBhdXRob3IgS29zdGlhbnR5biBTbXlybm92IDxrb3N0eXNoQGdtYWlsLmNvbT5cbiAqIEBkYXRlIDIwMThcbiAqL1xuXG4ndXNlIHN0cmljdCc7XG5cbmltcG9ydCAqIGFzIGV4cGVjdCBmcm9tICcuL2hlbHBlcnMvZXhwZWN0JztcbmltcG9ydCBwanNFcnJvciwge1xuICAgIENPTlRSQUNUX1JFUVVJUkVELFxuICAgIEFERFJFU1NfUkVRVUlSRUQsXG4gICAgV0VCM19SRVFVSVJFRCxcbiAgICBUUkFOU0FDVElPTl9VTlNVQ0NFU1NGVUxcbn0gZnJvbSAnLi9oZWxwZXJzL2Vycm9ycyc7XG5cbmltcG9ydCB7XG4gICAgZmV0Y2hJcGZzQWRkcmVzcyBhcyBmZXRjaElwZnNBZGRyZXNzQnlLZXJuZWxBZGRyZXNzXG59IGZyb20gJy4va2VybmVscyc7XG5cbmltcG9ydCB7XG4gICAgZmV0Y2hJcGZzQWRkcmVzcyBhcyBmZXRjaElwZnNBZGRyZXNzQnlEYXRhc2V0QWRkcmVzc1xufSBmcm9tICcuL2RhdGFzZXRzJztcblxuY29uc3QgbG9jYWxDYWNoZSA9IG5ldyBNYXAoKTtcblxuLyoqXG4gKiBHZXQgam9iIGNvbnRyb2xsZXIgYWRkcmVzc1xuICogXG4gKiBAcGFyYW0ge09iamVjdH0gY29uZmlnIExpYnJhcnkgY29uZmlnIChwcm92aWRlZCBieSB0aGUgcHJveHkgYnV0IGNhbiBiZSBvdmVycmlkZGVuKVxuICogQHJldHVybnMge1Byb21pc2U8e1N0cmluZ30+fSBcbiAqL1xuZXhwb3J0IGNvbnN0IGZldGNoSm9iQ29udHJvbGxlckFkZHJlc3MgPSBhc3luYyAoY29uZmlnID0ge30pID0+IHtcblxuICAgIGV4cGVjdC5hbGwoY29uZmlnLCB7XG4gICAgICAgICd3ZWIzJzoge1xuICAgICAgICAgICAgdHlwZTogJ29iamVjdCcsXG4gICAgICAgICAgICBjb2RlOiBXRUIzX1JFUVVJUkVEXG4gICAgICAgIH0sXG4gICAgICAgICdhZGRyZXNzZXMuUGFuZG9yYSc6IHtcbiAgICAgICAgICAgIHR5cGU6ICdhZGRyZXNzJyxcbiAgICAgICAgICAgIGNvZGU6IEFERFJFU1NfUkVRVUlSRUQsXG4gICAgICAgICAgICBhcmdzOiBbJ1BhbmRvcmEnXVxuICAgICAgICB9LFxuICAgICAgICAnY29udHJhY3RzLlBhbmRvcmEuYWJpJzoge1xuICAgICAgICAgICAgdHlwZTogJ29iamVjdCcsXG4gICAgICAgICAgICBjb2RlOiBDT05UUkFDVF9SRVFVSVJFRCxcbiAgICAgICAgICAgIGFyZ3M6IFsnUGFuZG9yYSddXG4gICAgICAgIH1cbiAgICB9KTtcblxuICAgIGNvbnN0IHBhbiA9IG5ldyBjb25maWcud2ViMy5ldGguQ29udHJhY3QoY29uZmlnLmNvbnRyYWN0cy5QYW5kb3JhLmFiaSwgY29uZmlnLmFkZHJlc3Nlcy5QYW5kb3JhKTtcbiAgICBjb25zdCBqb2JDb250cm9sbGVyID0gYXdhaXQgcGFuLm1ldGhvZHNcbiAgICAgICAgLmpvYkNvbnRyb2xsZXIoKVxuICAgICAgICAuY2FsbCgpO1xuXG4gICAgLy8gc2F2ZSBmb3IgbGF0ZXIgdXNlXG4gICAgbG9jYWxDYWNoZS5zZXQoJ2pvYkNvbnRyb2xsZXInLCBqb2JDb250cm9sbGVyKTtcbiAgICAgICAgXG4gICAgcmV0dXJuIGpvYkNvbnRyb2xsZXI7XG59O1xuXG4vKipcbiAqIEdldCBhY3RpdmUgam9icyBjb3VudCBcbiAqIFxuICogQHBhcmFtIHtPYmplY3R9IGNvbmZpZyBMaWJyYXJ5IGNvbmZpZyAocHJvdmlkZWQgYnkgdGhlIHByb3h5IGJ1dCBjYW4gYmUgb3ZlcnJpZGRlbilcbiAqIEByZXR1cm5zIHtQcm9taXNlPHtOdW1iZXJ9Pn0gXG4gKi9cbmV4cG9ydCBjb25zdCBmZXRjaEFjdGl2ZUpvYnNDb3VudCA9IGFzeW5jIChjb25maWcgPSB7fSkgPT4ge1xuXG4gICAgZXhwZWN0LmFsbChjb25maWcsIHtcbiAgICAgICAgJ3dlYjMnOiB7XG4gICAgICAgICAgICB0eXBlOiAnb2JqZWN0JyxcbiAgICAgICAgICAgIGNvZGU6IFdFQjNfUkVRVUlSRURcbiAgICAgICAgfSxcbiAgICAgICAgJ2NvbnRyYWN0cy5Db2duaXRpdmVKb2JDb250cm9sbGVyLmFiaSc6IHtcbiAgICAgICAgICAgIHR5cGU6ICdvYmplY3QnLFxuICAgICAgICAgICAgY29kZTogQ09OVFJBQ1RfUkVRVUlSRUQsXG4gICAgICAgICAgICBhcmdzOiBbJ0NvZ25pdGl2ZUpvYkNvbnRyb2xsZXInXVxuICAgICAgICB9XG4gICAgfSk7XG5cbiAgICBsZXQgam9iQ29udHJvbGxlciA9IGxvY2FsQ2FjaGUuZ2V0KCdqb2JDb250cm9sbGVyJyk7XG5cbiAgICBpZiAoIWpvYkNvbnRyb2xsZXIpIHtcblxuICAgICAgICBqb2JDb250cm9sbGVyID0gYXdhaXQgZmV0Y2hKb2JDb250cm9sbGVyQWRkcmVzcyhjb25maWcpO1xuICAgIH1cblxuICAgIGNvbnN0IGpjdHJsID0gbmV3IGNvbmZpZy53ZWIzLmV0aC5Db250cmFjdChjb25maWcuY29udHJhY3RzLkNvZ25pdGl2ZUpvYkNvbnRyb2xsZXIuYWJpLCBqb2JDb250cm9sbGVyKTtcbiAgICBjb25zdCBjb3VudCA9IGF3YWl0IGpjdHJsLm1ldGhvZHNcbiAgICAgICAgLmFjdGl2ZUpvYnNDb3VudCgpXG4gICAgICAgIC5jYWxsKCk7XG4gICAgICAgIFxuICAgIHJldHVybiBOdW1iZXIucGFyc2VJbnQoY291bnQsIDEwKTtcbn07XG5cbi8qKlxuICogR2V0IGNvbXBsZXRlZCBqb2JzIGNvdW50IFxuICogXG4gKiBAcGFyYW0ge09iamVjdH0gY29uZmlnIExpYnJhcnkgY29uZmlnIChwcm92aWRlZCBieSB0aGUgcHJveHkgYnV0IGNhbiBiZSBvdmVycmlkZGVuKVxuICogQHJldHVybnMge1Byb21pc2U8e051bWJlcn0+fSBcbiAqL1xuZXhwb3J0IGNvbnN0IGZldGNoQ29tcGxldGVkSm9ic0NvdW50ID0gYXN5bmMgKGNvbmZpZyA9IHt9KSA9PiB7XG5cbiAgICBleHBlY3QuYWxsKGNvbmZpZywge1xuICAgICAgICAnd2ViMyc6IHtcbiAgICAgICAgICAgIHR5cGU6ICdvYmplY3QnLFxuICAgICAgICAgICAgY29kZTogV0VCM19SRVFVSVJFRFxuICAgICAgICB9LFxuICAgICAgICAnY29udHJhY3RzLkNvZ25pdGl2ZUpvYkNvbnRyb2xsZXIuYWJpJzoge1xuICAgICAgICAgICAgdHlwZTogJ29iamVjdCcsXG4gICAgICAgICAgICBjb2RlOiBDT05UUkFDVF9SRVFVSVJFRCxcbiAgICAgICAgICAgIGFyZ3M6IFsnQ29nbml0aXZlSm9iQ29udHJvbGxlciddXG4gICAgICAgIH1cbiAgICB9KTtcblxuICAgIGxldCBqb2JDb250cm9sbGVyID0gbG9jYWxDYWNoZS5nZXQoJ2pvYkNvbnRyb2xsZXInKTtcblxuICAgIGlmICgham9iQ29udHJvbGxlcikge1xuXG4gICAgICAgIGpvYkNvbnRyb2xsZXIgPSBhd2FpdCBmZXRjaEpvYkNvbnRyb2xsZXJBZGRyZXNzKGNvbmZpZyk7XG4gICAgfVxuXG4gICAgY29uc3QgamN0cmwgPSBuZXcgY29uZmlnLndlYjMuZXRoLkNvbnRyYWN0KGNvbmZpZy5jb250cmFjdHMuQ29nbml0aXZlSm9iQ29udHJvbGxlci5hYmksIGpvYkNvbnRyb2xsZXIpO1xuICAgIGNvbnN0IGNvdW50ID0gYXdhaXQgamN0cmwubWV0aG9kc1xuICAgICAgICAuY29tcGxldGVkSm9ic0NvdW50KClcbiAgICAgICAgLmNhbGwoKTtcbiAgICAgICAgXG4gICAgcmV0dXJuIE51bWJlci5wYXJzZUludChjb3VudCwgMTApO1xufTtcblxuLyoqXG4gKiBHZXQgam9iIGRldGFpbHMgXG4gKiBcbiAqIEBwYXJhbSB7U3RyaW5nfSBhZGRyZXNzIEpvYiBhZGRyZXNzXG4gKiBAcGFyYW0ge09iamVjdH0gY29uZmlnIExpYnJhcnkgY29uZmlnIChwcm92aWRlZCBieSB0aGUgcHJveHkgYnV0IGNhbiBiZSBvdmVycmlkZGVuKVxuICogQHJldHVybnMge1Byb21pc2U8e051bWJlcn0+fSBcbiAqL1xuZXhwb3J0IGNvbnN0IGZldGNoSm9iRGV0YWlscyA9IGFzeW5jIChhZGRyZXNzLCBjb25maWcgPSB7fSkgPT4ge1xuXG4gICAgZXhwZWN0LmFsbChjb25maWcsIHtcbiAgICAgICAgJ3dlYjMnOiB7XG4gICAgICAgICAgICB0eXBlOiAnb2JqZWN0JyxcbiAgICAgICAgICAgIGNvZGU6IFdFQjNfUkVRVUlSRURcbiAgICAgICAgfSxcbiAgICAgICAgJ2NvbnRyYWN0cy5Db2duaXRpdmVKb2JDb250cm9sbGVyLmFiaSc6IHtcbiAgICAgICAgICAgIHR5cGU6ICdvYmplY3QnLFxuICAgICAgICAgICAgY29kZTogQ09OVFJBQ1RfUkVRVUlSRUQsXG4gICAgICAgICAgICBhcmdzOiBbJ0NvZ25pdGl2ZUpvYkNvbnRyb2xsZXInXVxuICAgICAgICB9XG4gICAgfSk7XG5cbiAgICBsZXQgam9iQ29udHJvbGxlciA9IGxvY2FsQ2FjaGUuZ2V0KCdqb2JDb250cm9sbGVyJyk7XG5cbiAgICBpZiAoIWpvYkNvbnRyb2xsZXIpIHtcblxuICAgICAgICBqb2JDb250cm9sbGVyID0gYXdhaXQgZmV0Y2hKb2JDb250cm9sbGVyQWRkcmVzcyhjb25maWcpO1xuICAgIH1cblxuICAgIGNvbnN0IGpjdHJsID0gbmV3IGNvbmZpZy53ZWIzLmV0aC5Db250cmFjdChjb25maWcuY29udHJhY3RzLkNvZ25pdGl2ZUpvYkNvbnRyb2xsZXIuYWJpLCBqb2JDb250cm9sbGVyKTtcbiAgICBcbiAgICBjb25zdCB7IGtlcm5lbCwgZGF0YXNldCwgY29tcGxleGl0eSwgZGVzY3JpcHRpb24sIGFjdGl2ZVdvcmtlcnMsIHByb2dyZXNzLCBzdGF0ZSB9ID0gYXdhaXQgamN0cmwubWV0aG9kc1xuICAgICAgICAuZ2V0Q29nbml0aXZlSm9iRGV0YWlscyhhZGRyZXNzKVxuICAgICAgICAuY2FsbCgpO1xuICAgIGNvbnN0IGtlcm5lbElwZnMgPSBhd2FpdCBmZXRjaElwZnNBZGRyZXNzQnlLZXJuZWxBZGRyZXNzKGtlcm5lbCwgY29uZmlnKTtcbiAgICBjb25zdCBkYXRhc2V0SXBmcyA9IGF3YWl0IGZldGNoSXBmc0FkZHJlc3NCeURhdGFzZXRBZGRyZXNzKGRhdGFzZXQsIGNvbmZpZyk7XG4gICAgY29uc3QgaXBmc1Jlc3VsdHMgPSBhd2FpdCBQcm9taXNlLmFsbChhY3RpdmVXb3JrZXJzLm1hcCgoXywgaW5kZXgpID0+IGpjdHJsLm1ldGhvZHMuZ2V0Q29nbml0aXZlSm9iUmVzdWx0cyhhZGRyZXNzLCBpbmRleCkuY2FsbCgpKSk7ICAgIFxuICAgIGNvbnN0IHV0ZjhkZXNjcmlwdGlvbiA9IGRlc2NyaXB0aW9uID8gY29uZmlnLndlYjMudXRpbHMuaGV4VG9VdGY4KGRlc2NyaXB0aW9uKSA6ICcnO1xuXG4gICAgcmV0dXJuIHtcbiAgICAgICAgYWRkcmVzcywgXG4gICAgICAgIGtlcm5lbCxcbiAgICAgICAga2VybmVsSXBmcyxcbiAgICAgICAgZGF0YXNldCxcbiAgICAgICAgZGF0YXNldElwZnMsXG4gICAgICAgIGFjdGl2ZVdvcmtlcnMsXG4gICAgICAgIGlwZnNSZXN1bHRzOiBpcGZzUmVzdWx0cy5tYXAocmVzdWx0ID0+IHJlc3VsdCA/IGNvbmZpZy53ZWIzLnV0aWxzLmhleFRvVXRmOChyZXN1bHQpIDogcmVzdWx0KS5maWx0ZXIocmVzID0+IHJlcyksXG4gICAgICAgIGNvbXBsZXhpdHk6IE51bWJlcihjb21wbGV4aXR5KSxcbiAgICAgICAgcHJvZ3Jlc3M6IE51bWJlcihwcm9ncmVzcyksXG4gICAgICAgIHN0YXRlOiBOdW1iZXIoc3RhdGUpLFxuICAgICAgICBkZXNjcmlwdGlvbjogdXRmOGRlc2NyaXB0aW9uLnN1YnN0cigyKSxcbiAgICAgICAgam9iVHlwZTogdXRmOGRlc2NyaXB0aW9uLnN1YnN0cigwLCAxKVxuICAgIH07XG59O1xuXG4vKipcbiAqIEdldCBqb2JzIElkIGZyb20gdGhlIFwic291cmNlXCJcbiAqIFxuICogQHBhcmFtIHtTdHJpbmd9IGZyb20gc291cmNlIGFjdGl2ZUpvYnMgb3IgY29tcGxldGVkSm9ic1xuICogQHBhcmFtIHtOdW1iZXJ9IGNvdW50XG4gKiBAcGFyYW0ge09iamVjdH0gb3B0aW9uc1xuICogQHJldHVybnMge1Byb21pc2U8W3tTdHJpbmd9XT59IFxuICovXG5leHBvcnQgY29uc3QgZmV0Y2hKb2JzSWRzID0gYXN5bmMgKHNvdXJjZSwgY291bnQgPSAwLCBjb25maWcgPSB7fSkgPT4ge1xuXG4gICAgZXhwZWN0LmFsbCh7IHNvdXJjZSB9LCB7XG4gICAgICAgICdzb3VyY2UnOiB7XG4gICAgICAgICAgICB0eXBlOiAnZW51bScsXG4gICAgICAgICAgICB2YWx1ZXM6IFsnYWN0aXZlSm9icycsICdjb21wbGV0ZWRKb2JzJ11cbiAgICAgICAgfVxuICAgIH0pO1xuXG4gICAgZXhwZWN0LmFsbChjb25maWcsIHtcbiAgICAgICAgJ3dlYjMnOiB7XG4gICAgICAgICAgICB0eXBlOiAnb2JqZWN0JyxcbiAgICAgICAgICAgIGNvZGU6IFdFQjNfUkVRVUlSRURcbiAgICAgICAgfSxcbiAgICAgICAgJ2NvbnRyYWN0cy5Db2duaXRpdmVKb2JDb250cm9sbGVyLmFiaSc6IHtcbiAgICAgICAgICAgIHR5cGU6ICdvYmplY3QnLFxuICAgICAgICAgICAgY29kZTogQ09OVFJBQ1RfUkVRVUlSRUQsXG4gICAgICAgICAgICBhcmdzOiBbJ0NvZ25pdGl2ZUpvYkNvbnRyb2xsZXInXVxuICAgICAgICB9XG4gICAgfSk7ICAgIFxuXG4gICAgbGV0IGpvYkNvbnRyb2xsZXIgPSBsb2NhbENhY2hlLmdldCgnam9iQ29udHJvbGxlcicpO1xuXG4gICAgaWYgKCFqb2JDb250cm9sbGVyKSB7XG5cbiAgICAgICAgam9iQ29udHJvbGxlciA9IGF3YWl0IGZldGNoSm9iQ29udHJvbGxlckFkZHJlc3MoY29uZmlnKTtcbiAgICB9XG5cbiAgICAvLyBudW1iZXJzIHNlcXVlbmNlIGZyb20gMCB0byBjb3VudFxuICAgIGNvbnN0IGNvdW50cyA9IFsuLi5BcnJheShjb3VudCkua2V5cygpXTtcblxuICAgIGNvbnN0IGpjdHJsID0gbmV3IGNvbmZpZy53ZWIzLmV0aC5Db250cmFjdChjb25maWcuY29udHJhY3RzLkNvZ25pdGl2ZUpvYkNvbnRyb2xsZXIuYWJpLCBqb2JDb250cm9sbGVyKTtcbiAgICBjb25zdCBhZGRyZXNzZXMgPSBhd2FpdCBQcm9taXNlLmFsbChjb3VudHMubWFwKGluZGV4ID0+IGpjdHJsLm1ldGhvZHMuZ2V0Sm9iSWQoaW5kZXgsIHNvdXJjZSA9PT0gJ2FjdGl2ZUpvYnMnKS5jYWxsKCkpKTtcbiAgICAgICAgXG4gICAgcmV0dXJuIGFkZHJlc3Nlcztcbn07XG5cbi8qKlxuICogQ3JlYXRlIGNvZ25pdGl2ZSBqb2IgY29udHJhY3RcbiAqIFxuICogQHBhcmFtIHtPYmplY3R9IG9wdGlvbnNcbiAqIEBwYXJhbSB7U3RyaW5nfSBmcm9tIFB1Ymxpc2hlciBhZGRyZXNzXG4gKiBAcGFyYW0ge09iamVjdH0gY29uZmlnIExpYnJhcnkgY29uZmlnIChwcm92aWRlZCBieSB0aGUgcHJveHkgYnV0IGNhbiBiZSBvdmVycmlkZGVuKVxuICogQHJldHVybnMge1Byb21pc2V9IFByb21pc2Ugb2JqZWN0IHJlc29sdmVkIHRvIGFkZCBzdGF0dXMgKGJvb2xlYW4pXG4gKi9cbmV4cG9ydCBjb25zdCBjcmVhdGUgPSAoe2tlcm5lbCwgZGF0YXNldCwgY29tcGxleGl0eSwgam9iVHlwZSwgZGVzY3JpcHRpb24sIGRlcG9zaXR9LCBmcm9tLCBjb25maWcgPSB7fSkgPT4gbmV3IFByb21pc2UoYXN5bmMgKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuXG4gICAgZXhwZWN0LmFsbCh7IGtlcm5lbCwgZGF0YXNldCwgY29tcGxleGl0eSwgam9iVHlwZSwgZGVzY3JpcHRpb24sIGRlcG9zaXQsIGZyb20gfSwge1xuICAgICAgICAna2VybmVsJzoge1xuICAgICAgICAgICAgdHlwZTogJ2FkZHJlc3MnXG4gICAgICAgIH0sXG4gICAgICAgICdkYXRhc2V0Jzoge1xuICAgICAgICAgICAgdHlwZTogJ2FkZHJlc3MnXG4gICAgICAgIH0sXG4gICAgICAgICdjb21wbGV4aXR5Jzoge1xuICAgICAgICAgICAgdHlwZTogJ251bWJlcidcbiAgICAgICAgfSxcbiAgICAgICAgJ2pvYlR5cGUnOiB7XG4gICAgICAgICAgICB0eXBlOiAnc3RyaW5nJ1xuICAgICAgICB9LFxuICAgICAgICAnZGVzY3JpcHRpb24nOiB7XG4gICAgICAgICAgICB0eXBlOiAnc3RyaW5nJ1xuICAgICAgICB9LFxuICAgICAgICAnZGVwb3NpdCc6IHtcbiAgICAgICAgICAgIHR5cGU6ICdudW1iZXInXG4gICAgICAgIH0sXG4gICAgICAgICdmcm9tJzoge1xuICAgICAgICAgICAgdHlwZTogJ2FkZHJlc3MnXG4gICAgICAgIH1cbiAgICB9KTtcblxuICAgIGV4cGVjdC5hbGwoY29uZmlnLCB7XG4gICAgICAgICd3ZWIzJzoge1xuICAgICAgICAgICAgdHlwZTogJ29iamVjdCcsXG4gICAgICAgICAgICBjb2RlOiBXRUIzX1JFUVVJUkVEXG4gICAgICAgIH0sXG4gICAgICAgICdjb250cmFjdHMuUGFuZG9yYS5hYmknOiB7XG4gICAgICAgICAgICB0eXBlOiAnb2JqZWN0JyxcbiAgICAgICAgICAgIGNvZGU6IENPTlRSQUNUX1JFUVVJUkVELFxuICAgICAgICAgICAgYXJnczogWydQYW5kb3JhJ11cbiAgICAgICAgfSxcbiAgICAgICAgJ2FkZHJlc3Nlcy5QYW5kb3JhJzoge1xuICAgICAgICAgICAgdHlwZTogJ2FkZHJlc3MnLFxuICAgICAgICAgICAgY29kZTogQUREUkVTU19SRVFVSVJFRCxcbiAgICAgICAgICAgIGFyZ3M6IFsnUGFuZG9yYSddXG4gICAgICAgIH1cbiAgICB9KTtcblxuICAgIGNvbnN0IHBhbiA9IG5ldyBjb25maWcud2ViMy5ldGguQ29udHJhY3QoY29uZmlnLmNvbnRyYWN0cy5QYW5kb3JhLmFiaSwgY29uZmlnLmFkZHJlc3Nlcy5QYW5kb3JhKTtcbiAgICBjb25zdCBnYXNQcmljZSA9IGF3YWl0IGNvbmZpZy53ZWIzLmV0aC5nZXRHYXNQcmljZSgpO1xuICAgIHBhbi5tZXRob2RzXG4gICAgICAgIC5jcmVhdGVDb2duaXRpdmVKb2Ioa2VybmVsLCBkYXRhc2V0LCBjb21wbGV4aXR5LCBjb25maWcud2ViMy51dGlscy51dGY4VG9IZXgoYCR7am9iVHlwZX07JHtkZXNjcmlwdGlvbn1gKSlcbiAgICAgICAgLnNlbmQoe1xuICAgICAgICAgICAgdmFsdWU6IGNvbmZpZy53ZWIzLnV0aWxzLnRvV2VpKFN0cmluZyhkZXBvc2l0KSksXG4gICAgICAgICAgICBmcm9tLFxuICAgICAgICAgICAgZ2FzUHJpY2UsXG4gICAgICAgICAgICBnYXM6IDY3MDAwMDAvLyBiZWNhdXNlIHRoaXMgd29ya2Zsb3cgaXMgdG9vIGdyZWVkeVxuICAgICAgICB9KVxuICAgICAgICAub24oJ2Vycm9yJywgcmVqZWN0KVxuICAgICAgICAub24oJ3JlY2VpcHQnLCByZWNlaXB0ID0+IHtcblxuICAgICAgICAgICAgdHJ5IHtcblxuICAgICAgICAgICAgICAgIGlmIChOdW1iZXIocmVjZWlwdC5zdGF0dXMpID09PSAwKSB7XG5cbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHJlamVjdChwanNFcnJvcihUUkFOU0FDVElPTl9VTlNVQ0NFU1NGVUwpKTtcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICBpZiAocmVjZWlwdC5ldmVudHMuQ29nbml0aXZlSm9iUXVldWVkKSB7XG4gICAgXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiByZXNvbHZlKHJlY2VpcHQuZXZlbnRzLkNvZ25pdGl2ZUpvYlF1ZXVlZC5yZXR1cm5WYWx1ZXMuam9iSWQpO1xuICAgICAgICAgICAgICAgIH1cbiAgICBcbiAgICAgICAgICAgICAgICByZXNvbHZlKHJlY2VpcHQuZXZlbnRzLkNvZ25pdGl2ZUpvYkNyZWF0ZWQucmV0dXJuVmFsdWVzLmpvYklkKTtcbiAgICAgICAgICAgIH0gY2F0Y2ggKGVycikge1xuICAgICAgICAgICAgICAgIHJlamVjdChlcnIpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbn0pO1xuXG4vKipcbiAqIEdldCBhbGwgam9ic1xuICogXG4gKiBAcGFyYW0ge09iamVjdH0gY29uZmlnIExpYnJhcnkgY29uZmlnIChwcm92aWRlZCBieSB0aGUgcHJveHkgYnV0IGNhbiBiZSBvdmVycmlkZGVuKVxuICogQHJldHVybnMge1Byb21pc2V9IEEgUHJvbWlzZSBvYmplY3QgcmVwcmVzZW50cyB0aGUge09iamVjdFtdfSBcbiAqL1xuZXhwb3J0IGNvbnN0IGZldGNoQWxsID0gYXN5bmMgKGNvbmZpZyA9IHt9KSA9PiB7XG4gICAgbGV0IHJlY29yZHMgPSBbXTtcbiAgICBsZXQgZXJyb3IgPSBbXTtcblxuICAgIHRyeSB7XG5cbiAgICAgICAgY29uc3QgW1xuICAgICAgICAgICAgYWN0aXZlQ291bnQsXG4gICAgICAgICAgICBjb21wbGV0ZWRDb3VudFxuICAgICAgICBdID0gYXdhaXQgUHJvbWlzZS5hbGwoW1xuICAgICAgICAgICAgZmV0Y2hBY3RpdmVKb2JzQ291bnQoY29uZmlnKSxcbiAgICAgICAgICAgIGZldGNoQ29tcGxldGVkSm9ic0NvdW50KGNvbmZpZylcbiAgICAgICAgXSk7XG5cbiAgICAgICAgY29uc3QgW1xuICAgICAgICAgICAgYWN0aXZlSm9ic0lkcyxcbiAgICAgICAgICAgIGNvbXBsZXRlZEpvYnNJZHNcbiAgICAgICAgXSA9IGF3YWl0IFByb21pc2UuYWxsKFtcbiAgICAgICAgICAgIGZldGNoSm9ic0lkcygnYWN0aXZlSm9icycsIGFjdGl2ZUNvdW50LCBjb25maWcpLFxuICAgICAgICAgICAgZmV0Y2hKb2JzSWRzKCdjb21wbGV0ZWRKb2JzJywgY29tcGxldGVkQ291bnQsIGNvbmZpZylcbiAgICAgICAgXSk7XG5cbiAgICAgICAgY29uc3QgYWxsSm9ic0lkcyA9IFtcbiAgICAgICAgICAgIC4uLmFjdGl2ZUpvYnNJZHMsXG4gICAgICAgICAgICAuLi5jb21wbGV0ZWRKb2JzSWRzXG4gICAgICAgIF07XG5cbiAgICAgICAgcmVjb3JkcyA9IGF3YWl0IFByb21pc2UuYWxsKGFsbEpvYnNJZHMubWFwKGpvYklkID0+IGZldGNoSm9iRGV0YWlscyhqb2JJZCwgY29uZmlnKSkpO1xuICAgICAgICBcbiAgICB9IGNhdGNoKGVycikge1xuICAgICAgICBlcnJvci5wdXNoKHtcbiAgICAgICAgICAgIGVycm9yOiBlcnIubWVzc2FnZVxuICAgICAgICB9KTtcbiAgICB9ICAgXG5cbiAgICByZXR1cm4ge1xuICAgICAgICByZWNvcmRzLFxuICAgICAgICBlcnJvclxuICAgIH07XG59O1xuXG4vKipcbiAqIEhhbmRsZSBldmVudCBDb2duaXRpdmVKb2JDcmVhdGVkXG4gKiBcbiAqIEBwYXJhbSB7T2JqZWN0fSBvcHRpb25zIEV2ZW50IGhhbmRsZXIgb3B0aW9uc1xuICogQHBhcmFtIHtPYmplY3R9IGNvbmZpZyBMaWJyYXJ5IGNvbmZpZyAocHJvdmlkZWQgYnkgdGhlIHByb3h5IGJ1dCBjYW4gYmUgb3ZlcnJpZGRlbilcbiAqIEByZXR1cm5zIHtPYmplY3R9IE9iamVjdCB3aXRoIGNoYWluZWQgY2FsbGJhY2tzICNkYXRhIGFuZCAjZXJyb3JcbiAqL1xuZXhwb3J0IGNvbnN0IGV2ZW50Q29nbml0aXZlSm9iQ3JlYXRlZCA9IChvcHRpb25zID0ge30sIGNvbmZpZyA9IHt9KSA9PiB7XG5cbiAgICBleHBlY3QuYWxsKHsgb3B0aW9ucyB9LCB7XG4gICAgICAgICdvcHRpb25zJzoge1xuICAgICAgICAgICAgdHlwZTogJ29iamVjdCdcbiAgICAgICAgfVxuICAgIH0pO1xuXG4gICAgZXhwZWN0LmFsbChjb25maWcsIHtcbiAgICAgICAgJ3dlYjMnOiB7XG4gICAgICAgICAgICB0eXBlOiAnb2JqZWN0JyxcbiAgICAgICAgICAgIGNvZGU6IFdFQjNfUkVRVUlSRURcbiAgICAgICAgfSxcbiAgICAgICAgJ2NvbnRyYWN0cy5QYW5kb3JhLmFiaSc6IHtcbiAgICAgICAgICAgIHR5cGU6ICdvYmplY3QnLFxuICAgICAgICAgICAgY29kZTogQ09OVFJBQ1RfUkVRVUlSRUQsXG4gICAgICAgICAgICBhcmdzOiBbJ1BhbmRvcmEnXVxuICAgICAgICB9LFxuICAgICAgICAnYWRkcmVzc2VzLlBhbmRvcmEnOiB7XG4gICAgICAgICAgICB0eXBlOiAnYWRkcmVzcycsXG4gICAgICAgICAgICBjb2RlOiBBRERSRVNTX1JFUVVJUkVELFxuICAgICAgICAgICAgYXJnczogWydQYW5kb3JhJ11cbiAgICAgICAgfVxuICAgIH0pO1xuXG4gICAgY29uc3QgY2FsbGJhY2tzID0ge1xuICAgICAgICBvbkRhdGE6ICgpID0+IHt9LFxuICAgICAgICBvbkVycm9yOiAoKSA9PiB7fVxuICAgIH07XG5cbiAgICBjb25zdCBjaGFpbiA9IHtcbiAgICAgICAgZGF0YTogKGNiID0gKCkgPT4ge30pID0+IHtcbiAgICAgICAgICAgIGNhbGxiYWNrcy5vbkRhdGEgPSBjYjtcbiAgICAgICAgICAgIHJldHVybiBjaGFpbjtcbiAgICAgICAgfSxcbiAgICAgICAgZXJyb3I6IChjYiA9ICgpID0+IHt9KSA9PiB7XG4gICAgICAgICAgICBjYWxsYmFja3Mub25FcnJvciA9IGNiO1xuICAgICAgICAgICAgcmV0dXJuIGNoYWluO1xuICAgICAgICB9XG4gICAgfTtcblxuICAgIGNvbnN0IHBhbiA9IG5ldyBjb25maWcud2ViMy5ldGguQ29udHJhY3QoY29uZmlnLmNvbnRyYWN0cy5QYW5kb3JhLmFiaSwgY29uZmlnLmFkZHJlc3Nlcy5QYW5kb3JhKTtcbiAgICBjaGFpbi5ldmVudCA9IHBhbi5ldmVudHMuQ29nbml0aXZlSm9iQ3JlYXRlZChvcHRpb25zKVxuICAgICAgICAub24oJ2RhdGEnLCBhc3luYyAoZXZlbnQpID0+IHtcblxuICAgICAgICAgICAgdHJ5IHtcblxuICAgICAgICAgICAgICAgIGNvbnN0IGpvYkRldGFpbHMgPSBhd2FpdCBmZXRjaEpvYkRldGFpbHMoZXZlbnQucmV0dXJuVmFsdWVzLmpvYklkLCBjb25maWcpO1xuICAgICAgICAgICAgICAgIGNhbGxiYWNrcy5vbkRhdGEoe1xuICAgICAgICAgICAgICAgICAgICByZWNvcmRzOiBbam9iRGV0YWlsc10sXG4gICAgICAgICAgICAgICAgICAgIGV2ZW50XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9IGNhdGNoKGVycikge1xuICAgICAgICAgICAgICAgIGNhbGxiYWNrcy5vbkVycm9yKGVycik7XG4gICAgICAgICAgICB9ICAgICAgICAgICAgXG4gICAgICAgIH0pXG4gICAgICAgIC5vbignZXJyb3InLCBjYWxsYmFja3Mub25FcnJvcik7XG5cbiAgICByZXR1cm4gY2hhaW47XG59O1xuXG4vKipcbiAqIEhhbmRsZSBldmVudCBKb2JTdGF0ZUNoYW5nZWRcbiAqIFxuICogQHBhcmFtIHtPYmplY3R9IG9wdGlvbnMgRXZlbnQgaGFuZGxlciBvcHRpb25zXG4gKiBAcGFyYW0ge09iamVjdH0gY29uZmlnIExpYnJhcnkgY29uZmlnIChwcm92aWRlZCBieSB0aGUgcHJveHkgYnV0IGNhbiBiZSBvdmVycmlkZGVuKVxuICogQHJldHVybnMge09iamVjdH0gT2JqZWN0IHdpdGggY2hhaW5lZCBjYWxsYmFja3MgI2RhdGEgYW5kICNlcnJvclxuICovXG5leHBvcnQgY29uc3QgZXZlbnRKb2JTdGF0ZUNoYW5nZWQgPSAob3B0aW9ucyA9IHt9LCBjb25maWcgPSB7fSkgPT4ge1xuXG4gICAgZXhwZWN0LmFsbCh7IG9wdGlvbnMgfSwge1xuICAgICAgICAnb3B0aW9ucyc6IHtcbiAgICAgICAgICAgIHR5cGU6ICdvYmplY3QnXG4gICAgICAgIH1cbiAgICB9KTtcblxuICAgIGV4cGVjdC5hbGwoY29uZmlnLCB7XG4gICAgICAgICd3ZWIzJzoge1xuICAgICAgICAgICAgdHlwZTogJ29iamVjdCcsXG4gICAgICAgICAgICBjb2RlOiBXRUIzX1JFUVVJUkVEXG4gICAgICAgIH0sXG4gICAgICAgICdjb250cmFjdHMuUGFuZG9yYS5hYmknOiB7XG4gICAgICAgICAgICB0eXBlOiAnb2JqZWN0JyxcbiAgICAgICAgICAgIGNvZGU6IENPTlRSQUNUX1JFUVVJUkVELFxuICAgICAgICAgICAgYXJnczogWydQYW5kb3JhJ11cbiAgICAgICAgfSxcbiAgICAgICAgJ2FkZHJlc3Nlcy5QYW5kb3JhJzoge1xuICAgICAgICAgICAgdHlwZTogJ2FkZHJlc3MnLFxuICAgICAgICAgICAgY29kZTogQUREUkVTU19SRVFVSVJFRCxcbiAgICAgICAgICAgIGFyZ3M6IFsnUGFuZG9yYSddXG4gICAgICAgIH1cbiAgICB9KTtcblxuICAgIGNvbnN0IGNhbGxiYWNrcyA9IHtcbiAgICAgICAgb25EYXRhOiAoKSA9PiB7fSxcbiAgICAgICAgb25FcnJvcjogKCkgPT4ge31cbiAgICB9O1xuXG4gICAgY29uc3QgY2hhaW4gPSB7XG4gICAgICAgIGRhdGE6IChjYiA9ICgpID0+IHt9KSA9PiB7XG4gICAgICAgICAgICBjYWxsYmFja3Mub25EYXRhID0gY2I7XG4gICAgICAgICAgICByZXR1cm4gY2hhaW47XG4gICAgICAgIH0sXG4gICAgICAgIGVycm9yOiAoY2IgPSAoKSA9PiB7fSkgPT4ge1xuICAgICAgICAgICAgY2FsbGJhY2tzLm9uRXJyb3IgPSBjYjtcbiAgICAgICAgICAgIHJldHVybiBjaGFpbjtcbiAgICAgICAgfVxuICAgIH07XG5cbiAgICAoYXN5bmMgKCkgPT4ge1xuXG4gICAgICAgIGxldCBqb2JDb250cm9sbGVyID0gbG9jYWxDYWNoZS5nZXQoJ2pvYkNvbnRyb2xsZXInKTtcblxuICAgICAgICBpZiAoIWpvYkNvbnRyb2xsZXIpIHtcblxuICAgICAgICAgICAgam9iQ29udHJvbGxlciA9IGF3YWl0IGZldGNoSm9iQ29udHJvbGxlckFkZHJlc3MoY29uZmlnKTtcbiAgICAgICAgfVxuICAgIFxuICAgICAgICBjb25zdCBqY3RybCA9IG5ldyBjb25maWcud2ViMy5ldGguQ29udHJhY3QoY29uZmlnLmNvbnRyYWN0cy5Db2duaXRpdmVKb2JDb250cm9sbGVyLmFiaSwgam9iQ29udHJvbGxlcik7XG4gICAgICAgIGNoYWluLmV2ZW50ID0gamN0cmwuZXZlbnRzLkpvYlN0YXRlQ2hhbmdlZChvcHRpb25zKVxuICAgICAgICAgICAgLm9uKCdkYXRhJywgYXN5bmMgZXZlbnQgPT4ge1xuICAgIFxuICAgICAgICAgICAgICAgIHRyeSB7XG4gICAgXG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IGpvYkRldGFpbHMgPSBhd2FpdCBmZXRjaEpvYkRldGFpbHMoZXZlbnQucmV0dXJuVmFsdWVzLmpvYklkLCBjb25maWcpO1xuICAgICAgICAgICAgICAgICAgICBjYWxsYmFja3Mub25EYXRhKHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJlY29yZHM6IFtqb2JEZXRhaWxzXSxcbiAgICAgICAgICAgICAgICAgICAgICAgIGV2ZW50XG4gICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgIH0gY2F0Y2goZXJyKSB7XG4gICAgICAgICAgICAgICAgICAgIGNhbGxiYWNrcy5vbkVycm9yKGVycik7XG4gICAgICAgICAgICAgICAgfSAgICAgICAgICAgIFxuICAgICAgICAgICAgfSlcbiAgICAgICAgICAgIC5vbignZXJyb3InLCBjYWxsYmFja3Mub25FcnJvcik7XG4gICAgfSkoKTtcblxuICAgIHJldHVybiBjaGFpbjtcbn07XG4iXX0=