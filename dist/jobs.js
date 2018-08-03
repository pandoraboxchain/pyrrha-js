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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9qb2JzLmpzIl0sIm5hbWVzIjpbImxvY2FsQ2FjaGUiLCJNYXAiLCJmZXRjaEpvYkNvbnRyb2xsZXJBZGRyZXNzIiwiY29uZmlnIiwiZXhwZWN0IiwiYWxsIiwidHlwZSIsImNvZGUiLCJXRUIzX1JFUVVJUkVEIiwiQUREUkVTU19SRVFVSVJFRCIsImFyZ3MiLCJDT05UUkFDVF9SRVFVSVJFRCIsInBhbiIsIndlYjMiLCJldGgiLCJDb250cmFjdCIsImNvbnRyYWN0cyIsIlBhbmRvcmEiLCJhYmkiLCJhZGRyZXNzZXMiLCJtZXRob2RzIiwiam9iQ29udHJvbGxlciIsImNhbGwiLCJzZXQiLCJmZXRjaEFjdGl2ZUpvYnNDb3VudCIsImdldCIsImpjdHJsIiwiQ29nbml0aXZlSm9iQ29udHJvbGxlciIsImFjdGl2ZUpvYnNDb3VudCIsImNvdW50IiwiTnVtYmVyIiwicGFyc2VJbnQiLCJmZXRjaENvbXBsZXRlZEpvYnNDb3VudCIsImNvbXBsZXRlZEpvYnNDb3VudCIsImZldGNoSm9iRGV0YWlscyIsImFkZHJlc3MiLCJnZXRDb2duaXRpdmVKb2JEZXRhaWxzIiwia2VybmVsIiwiZGF0YXNldCIsImNvbXBsZXhpdHkiLCJkZXNjcmlwdGlvbiIsImFjdGl2ZVdvcmtlcnMiLCJwcm9ncmVzcyIsInN0YXRlIiwia2VybmVsSXBmcyIsImRhdGFzZXRJcGZzIiwiUHJvbWlzZSIsIm1hcCIsIl8iLCJpbmRleCIsImdldENvZ25pdGl2ZUpvYlJlc3VsdHMiLCJpcGZzUmVzdWx0cyIsInV0ZjhkZXNjcmlwdGlvbiIsInV0aWxzIiwiaGV4VG9VdGY4IiwicmVzdWx0IiwiZmlsdGVyIiwicmVzIiwic3Vic3RyIiwiam9iVHlwZSIsImZldGNoSm9ic0lkcyIsInNvdXJjZSIsInZhbHVlcyIsImNvdW50cyIsIkFycmF5Iiwia2V5cyIsImdldEpvYklkIiwiY3JlYXRlIiwiZnJvbSIsImRlcG9zaXQiLCJyZXNvbHZlIiwicmVqZWN0IiwiZ2V0R2FzUHJpY2UiLCJnYXNQcmljZSIsImNyZWF0ZUNvZ25pdGl2ZUpvYiIsInV0ZjhUb0hleCIsInNlbmQiLCJ2YWx1ZSIsInRvV2VpIiwiU3RyaW5nIiwiZ2FzIiwib24iLCJyZWNlaXB0Iiwic3RhdHVzIiwiVFJBTlNBQ1RJT05fVU5TVUNDRVNTRlVMIiwiZXZlbnRzIiwiQ29nbml0aXZlSm9iUXVldWVkIiwicmV0dXJuVmFsdWVzIiwiam9iSWQiLCJDb2duaXRpdmVKb2JDcmVhdGVkIiwiZXJyIiwiZmV0Y2hBbGwiLCJyZWNvcmRzIiwiZXJyb3IiLCJhY3RpdmVDb3VudCIsImNvbXBsZXRlZENvdW50IiwiYWN0aXZlSm9ic0lkcyIsImNvbXBsZXRlZEpvYnNJZHMiLCJhbGxKb2JzSWRzIiwicHVzaCIsIm1lc3NhZ2UiLCJldmVudENvZ25pdGl2ZUpvYkNyZWF0ZWQiLCJvcHRpb25zIiwiY2FsbGJhY2tzIiwib25EYXRhIiwib25FcnJvciIsImNoYWluIiwiZGF0YSIsImNiIiwiZXZlbnQiLCJqb2JEZXRhaWxzIiwiZXZlbnRKb2JTdGF0ZUNoYW5nZWQiLCJKb2JTdGF0ZUNoYW5nZWQiXSwibWFwcGluZ3MiOiJBQUFBOzs7Ozs7OztBQVNBOzs7Ozs7O0FBRUE7O0FBQ0E7O0FBT0E7O0FBSUE7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUlBLElBQU1BLFVBQVUsR0FBRyxJQUFJQyxHQUFKLEVBQW5CO0FBRUE7Ozs7Ozs7QUFNTyxJQUFNQyx5QkFBeUI7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBLDBCQUFHO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFPQyxZQUFBQSxNQUFQLDJEQUFnQixFQUFoQjtBQUVyQ0MsWUFBQUEsTUFBTSxDQUFDQyxHQUFQLENBQVdGLE1BQVgsRUFBbUI7QUFDZixzQkFBUTtBQUNKRyxnQkFBQUEsSUFBSSxFQUFFLFFBREY7QUFFSkMsZ0JBQUFBLElBQUksRUFBRUM7QUFGRixlQURPO0FBS2YsbUNBQXFCO0FBQ2pCRixnQkFBQUEsSUFBSSxFQUFFLFNBRFc7QUFF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Q0UsT0FkYixDQUFkOztBQVZIO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBLEdBQUQ7O0FBMkJBLFNBQU9DLEtBQVA7QUFDSCxDQXJFTSIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogQ29nbml0aXZlIEpvYnMgcmVsYXRlZCBtZXRob2RzXG4gKiBUaGlzIGZpbGUgaXQgaXMgYSBwYXJ0IG9mIHRoZSBQYW5kb3JhIFB5cnJoYSBKYXZhc2NyaXB0IGxpYnJhcnlcbiAqIFxuICogQGZpbGUgam9icy5qc1xuICogQGF1dGhvciBLb3N0aWFudHluIFNteXJub3YgPGtvc3R5c2hAZ21haWwuY29tPlxuICogQGRhdGUgMjAxOFxuICovXG5cbid1c2Ugc3RyaWN0JztcblxuaW1wb3J0ICogYXMgZXhwZWN0IGZyb20gJy4vaGVscGVycy9leHBlY3QnO1xuaW1wb3J0IHBqc0Vycm9yLCB7XG4gICAgQ09OVFJBQ1RfUkVRVUlSRUQsXG4gICAgQUREUkVTU19SRVFVSVJFRCxcbiAgICBXRUIzX1JFUVVJUkVELFxuICAgIFRSQU5TQUNUSU9OX1VOU1VDQ0VTU0ZVTFxufSBmcm9tICcuL2hlbHBlcnMvZXJyb3JzJztcblxuaW1wb3J0IHtcbiAgICBmZXRjaElwZnNBZGRyZXNzIGFzIGZldGNoSXBmc0FkZHJlc3NCeUtlcm5lbEFkZHJlc3Ncbn0gZnJvbSAnLi9rZXJuZWxzJztcblxuaW1wb3J0IHtcbiAgICBmZXRjaElwZnNBZGRyZXNzIGFzIGZldGNoSXBmc0FkZHJlc3NCeURhdGFzZXRBZGRyZXNzXG59IGZyb20gJy4vZGF0YXNldHMnO1xuXG5jb25zdCBsb2NhbENhY2hlID0gbmV3IE1hcCgpO1xuXG4vKipcbiAqIEdldCBqb2IgY29udHJvbGxlciBhZGRyZXNzXG4gKiBcbiAqIEBwYXJhbSB7T2JqZWN0fSBjb25maWcgTGlicmFyeSBjb25maWcgKHByb3ZpZGVkIGJ5IHRoZSBwcm94eSBidXQgY2FuIGJlIG92ZXJyaWRkZW4pXG4gKiBAcmV0dXJucyB7UHJvbWlzZTx7U3RyaW5nfT59IFxuICovXG5leHBvcnQgY29uc3QgZmV0Y2hKb2JDb250cm9sbGVyQWRkcmVzcyA9IGFzeW5jIChjb25maWcgPSB7fSkgPT4ge1xuXG4gICAgZXhwZWN0LmFsbChjb25maWcsIHtcbiAgICAgICAgJ3dlYjMnOiB7XG4gICAgICAgICAgICB0eXBlOiAnb2JqZWN0JyxcbiAgICAgICAgICAgIGNvZGU6IFdFQjNfUkVRVUlSRURcbiAgICAgICAgfSxcbiAgICAgICAgJ2FkZHJlc3Nlcy5QYW5kb3JhJzoge1xuICAgICAgICAgICAgdHlwZTogJ2FkZHJlc3MnLFxuICAgICAgICAgICAgY29kZTogQUREUkVTU19SRVFVSVJFRCxcbiAgICAgICAgICAgIGFyZ3M6IFsnUGFuZG9yYSddXG4gICAgICAgIH0sXG4gICAgICAgICdjb250cmFjdHMuUGFuZG9yYS5hYmknOiB7XG4gICAgICAgICAgICB0eXBlOiAnb2JqZWN0JyxcbiAgICAgICAgICAgIGNvZGU6IENPTlRSQUNUX1JFUVVJUkVELFxuICAgICAgICAgICAgYXJnczogWydQYW5kb3JhJ11cbiAgICAgICAgfVxuICAgIH0pO1xuXG4gICAgY29uc3QgcGFuID0gbmV3IGNvbmZpZy53ZWIzLmV0aC5Db250cmFjdChjb25maWcuY29udHJhY3RzLlBhbmRvcmEuYWJpLCBjb25maWcuYWRkcmVzc2VzLlBhbmRvcmEpO1xuICAgIGNvbnN0IGpvYkNvbnRyb2xsZXIgPSBhd2FpdCBwYW4ubWV0aG9kc1xuICAgICAgICAuam9iQ29udHJvbGxlcigpXG4gICAgICAgIC5jYWxsKCk7XG5cbiAgICAvLyBzYXZlIGZvciBsYXRlciB1c2VcbiAgICBsb2NhbENhY2hlLnNldCgnam9iQ29udHJvbGxlcicsIGpvYkNvbnRyb2xsZXIpO1xuICAgICAgICBcbiAgICByZXR1cm4gam9iQ29udHJvbGxlcjtcbn07XG5cbi8qKlxuICogR2V0IGFjdGl2ZSBqb2JzIGNvdW50IFxuICogXG4gKiBAcGFyYW0ge09iamVjdH0gY29uZmlnIExpYnJhcnkgY29uZmlnIChwcm92aWRlZCBieSB0aGUgcHJveHkgYnV0IGNhbiBiZSBvdmVycmlkZGVuKVxuICogQHJldHVybnMge1Byb21pc2U8e051bWJlcn0+fSBcbiAqL1xuZXhwb3J0IGNvbnN0IGZldGNoQWN0aXZlSm9ic0NvdW50ID0gYXN5bmMgKGNvbmZpZyA9IHt9KSA9PiB7XG5cbiAgICBleHBlY3QuYWxsKGNvbmZpZywge1xuICAgICAgICAnd2ViMyc6IHtcbiAgICAgICAgICAgIHR5cGU6ICdvYmplY3QnLFxuICAgICAgICAgICAgY29kZTogV0VCM19SRVFVSVJFRFxuICAgICAgICB9LFxuICAgICAgICAnY29udHJhY3RzLkNvZ25pdGl2ZUpvYkNvbnRyb2xsZXIuYWJpJzoge1xuICAgICAgICAgICAgdHlwZTogJ29iamVjdCcsXG4gICAgICAgICAgICBjb2RlOiBDT05UUkFDVF9SRVFVSVJFRCxcbiAgICAgICAgICAgIGFyZ3M6IFsnQ29nbml0aXZlSm9iQ29udHJvbGxlciddXG4gICAgICAgIH1cbiAgICB9KTtcblxuICAgIGxldCBqb2JDb250cm9sbGVyID0gbG9jYWxDYWNoZS5nZXQoJ2pvYkNvbnRyb2xsZXInKTtcblxuICAgIGlmICgham9iQ29udHJvbGxlcikge1xuXG4gICAgICAgIGpvYkNvbnRyb2xsZXIgPSBhd2FpdCBmZXRjaEpvYkNvbnRyb2xsZXJBZGRyZXNzKGNvbmZpZyk7XG4gICAgfVxuXG4gICAgY29uc3QgamN0cmwgPSBuZXcgY29uZmlnLndlYjMuZXRoLkNvbnRyYWN0KGNvbmZpZy5jb250cmFjdHMuQ29nbml0aXZlSm9iQ29udHJvbGxlci5hYmksIGpvYkNvbnRyb2xsZXIpO1xuICAgIGNvbnN0IGNvdW50ID0gYXdhaXQgamN0cmwubWV0aG9kc1xuICAgICAgICAuYWN0aXZlSm9ic0NvdW50KClcbiAgICAgICAgLmNhbGwoKTtcbiAgICAgICAgXG4gICAgcmV0dXJuIE51bWJlci5wYXJzZUludChjb3VudCwgMTApO1xufTtcblxuLyoqXG4gKiBHZXQgY29tcGxldGVkIGpvYnMgY291bnQgXG4gKiBcbiAqIEBwYXJhbSB7T2JqZWN0fSBjb25maWcgTGlicmFyeSBjb25maWcgKHByb3ZpZGVkIGJ5IHRoZSBwcm94eSBidXQgY2FuIGJlIG92ZXJyaWRkZW4pXG4gKiBAcmV0dXJucyB7UHJvbWlzZTx7TnVtYmVyfT59IFxuICovXG5leHBvcnQgY29uc3QgZmV0Y2hDb21wbGV0ZWRKb2JzQ291bnQgPSBhc3luYyAoY29uZmlnID0ge30pID0+IHtcblxuICAgIGV4cGVjdC5hbGwoY29uZmlnLCB7XG4gICAgICAgICd3ZWIzJzoge1xuICAgICAgICAgICAgdHlwZTogJ29iamVjdCcsXG4gICAgICAgICAgICBjb2RlOiBXRUIzX1JFUVVJUkVEXG4gICAgICAgIH0sXG4gICAgICAgICdjb250cmFjdHMuQ29nbml0aXZlSm9iQ29udHJvbGxlci5hYmknOiB7XG4gICAgICAgICAgICB0eXBlOiAnb2JqZWN0JyxcbiAgICAgICAgICAgIGNvZGU6IENPTlRSQUNUX1JFUVVJUkVELFxuICAgICAgICAgICAgYXJnczogWydDb2duaXRpdmVKb2JDb250cm9sbGVyJ11cbiAgICAgICAgfVxuICAgIH0pO1xuXG4gICAgbGV0IGpvYkNvbnRyb2xsZXIgPSBsb2NhbENhY2hlLmdldCgnam9iQ29udHJvbGxlcicpO1xuXG4gICAgaWYgKCFqb2JDb250cm9sbGVyKSB7XG5cbiAgICAgICAgam9iQ29udHJvbGxlciA9IGF3YWl0IGZldGNoSm9iQ29udHJvbGxlckFkZHJlc3MoY29uZmlnKTtcbiAgICB9XG5cbiAgICBjb25zdCBqY3RybCA9IG5ldyBjb25maWcud2ViMy5ldGguQ29udHJhY3QoY29uZmlnLmNvbnRyYWN0cy5Db2duaXRpdmVKb2JDb250cm9sbGVyLmFiaSwgam9iQ29udHJvbGxlcik7XG4gICAgY29uc3QgY291bnQgPSBhd2FpdCBqY3RybC5tZXRob2RzXG4gICAgICAgIC5jb21wbGV0ZWRKb2JzQ291bnQoKVxuICAgICAgICAuY2FsbCgpO1xuICAgICAgICBcbiAgICByZXR1cm4gTnVtYmVyLnBhcnNlSW50KGNvdW50LCAxMCk7XG59O1xuXG4vKipcbiAqIEdldCBqb2IgZGV0YWlscyBcbiAqIFxuICogQHBhcmFtIHtTdHJpbmd9IGFkZHJlc3MgSm9iIGFkZHJlc3NcbiAqIEBwYXJhbSB7T2JqZWN0fSBjb25maWcgTGlicmFyeSBjb25maWcgKHByb3ZpZGVkIGJ5IHRoZSBwcm94eSBidXQgY2FuIGJlIG92ZXJyaWRkZW4pXG4gKiBAcmV0dXJucyB7UHJvbWlzZTx7TnVtYmVyfT59IFxuICovXG5leHBvcnQgY29uc3QgZmV0Y2hKb2JEZXRhaWxzID0gYXN5bmMgKGFkZHJlc3MsIGNvbmZpZyA9IHt9KSA9PiB7XG5cbiAgICBleHBlY3QuYWxsKGNvbmZpZywge1xuICAgICAgICAnd2ViMyc6IHtcbiAgICAgICAgICAgIHR5cGU6ICdvYmplY3QnLFxuICAgICAgICAgICAgY29kZTogV0VCM19SRVFVSVJFRFxuICAgICAgICB9LFxuICAgICAgICAnY29udHJhY3RzLkNvZ25pdGl2ZUpvYkNvbnRyb2xsZXIuYWJpJzoge1xuICAgICAgICAgICAgdHlwZTogJ29iamVjdCcsXG4gICAgICAgICAgICBjb2RlOiBDT05UUkFDVF9SRVFVSVJFRCxcbiAgICAgICAgICAgIGFyZ3M6IFsnQ29nbml0aXZlSm9iQ29udHJvbGxlciddXG4gICAgICAgIH1cbiAgICB9KTtcblxuICAgIGxldCBqb2JDb250cm9sbGVyID0gbG9jYWxDYWNoZS5nZXQoJ2pvYkNvbnRyb2xsZXInKTtcblxuICAgIGlmICgham9iQ29udHJvbGxlcikge1xuXG4gICAgICAgIGpvYkNvbnRyb2xsZXIgPSBhd2FpdCBmZXRjaEpvYkNvbnRyb2xsZXJBZGRyZXNzKGNvbmZpZyk7XG4gICAgfVxuXG4gICAgY29uc3QgamN0cmwgPSBuZXcgY29uZmlnLndlYjMuZXRoLkNvbnRyYWN0KGNvbmZpZy5jb250cmFjdHMuQ29nbml0aXZlSm9iQ29udHJvbGxlci5hYmksIGpvYkNvbnRyb2xsZXIpO1xuICAgIFxuICAgIGNvbnN0IHsga2VybmVsLCBkYXRhc2V0LCBjb21wbGV4aXR5LCBkZXNjcmlwdGlvbiwgYWN0aXZlV29ya2VycywgcHJvZ3Jlc3MsIHN0YXRlIH0gPSBhd2FpdCBqY3RybC5tZXRob2RzXG4gICAgICAgIC5nZXRDb2duaXRpdmVKb2JEZXRhaWxzKGFkZHJlc3MpXG4gICAgICAgIC5jYWxsKCk7XG4gICAgY29uc3Qga2VybmVsSXBmcyA9IGF3YWl0IGZldGNoSXBmc0FkZHJlc3NCeUtlcm5lbEFkZHJlc3Moa2VybmVsLCBjb25maWcpO1xuICAgIGNvbnN0IGRhdGFzZXRJcGZzID0gYXdhaXQgZmV0Y2hJcGZzQWRkcmVzc0J5RGF0YXNldEFkZHJlc3MoZGF0YXNldCwgY29uZmlnKTtcbiAgICBjb25zdCBpcGZzUmVzdWx0cyA9IGF3YWl0IFByb21pc2UuYWxsKGFjdGl2ZVdvcmtlcnMubWFwKChfLCBpbmRleCkgPT4gamN0cmwubWV0aG9kcy5nZXRDb2duaXRpdmVKb2JSZXN1bHRzKGFkZHJlc3MsIGluZGV4KS5jYWxsKCkpKTsgICAgXG4gICAgY29uc3QgdXRmOGRlc2NyaXB0aW9uID0gZGVzY3JpcHRpb24gPyBjb25maWcud2ViMy51dGlscy5oZXhUb1V0ZjgoZGVzY3JpcHRpb24pIDogJyc7XG5cbiAgICByZXR1cm4ge1xuICAgICAgICBhZGRyZXNzLCBcbiAgICAgICAga2VybmVsLFxuICAgICAgICBrZXJuZWxJcGZzLFxuICAgICAgICBkYXRhc2V0LFxuICAgICAgICBkYXRhc2V0SXBmcyxcbiAgICAgICAgYWN0aXZlV29ya2VycyxcbiAgICAgICAgaXBmc1Jlc3VsdHM6IGlwZnNSZXN1bHRzLm1hcChyZXN1bHQgPT4gcmVzdWx0ID8gY29uZmlnLndlYjMudXRpbHMuaGV4VG9VdGY4KHJlc3VsdCkgOiByZXN1bHQpLmZpbHRlcihyZXMgPT4gcmVzKSxcbiAgICAgICAgY29tcGxleGl0eTogTnVtYmVyKGNvbXBsZXhpdHkpLFxuICAgICAgICBwcm9ncmVzczogTnVtYmVyKHByb2dyZXNzKSxcbiAgICAgICAgc3RhdGU6IE51bWJlcihzdGF0ZSksXG4gICAgICAgIGRlc2NyaXB0aW9uOiB1dGY4ZGVzY3JpcHRpb24uc3Vic3RyKDIpLFxuICAgICAgICBqb2JUeXBlOiB1dGY4ZGVzY3JpcHRpb24uc3Vic3RyKDAsIDEpXG4gICAgfTtcbn07XG5cbi8qKlxuICogR2V0IGpvYnMgSWQgZnJvbSB0aGUgXCJzb3VyY2VcIlxuICogXG4gKiBAcGFyYW0ge1N0cmluZ30gZnJvbSBzb3VyY2UgYWN0aXZlSm9icyBvciBjb21wbGV0ZWRKb2JzXG4gKiBAcGFyYW0ge051bWJlcn0gY291bnRcbiAqIEBwYXJhbSB7T2JqZWN0fSBvcHRpb25zXG4gKiBAcmV0dXJucyB7UHJvbWlzZTxbe1N0cmluZ31dPn0gXG4gKi9cbmV4cG9ydCBjb25zdCBmZXRjaEpvYnNJZHMgPSBhc3luYyAoc291cmNlLCBjb3VudCA9IDAsIGNvbmZpZyA9IHt9KSA9PiB7XG5cbiAgICBleHBlY3QuYWxsKHsgc291cmNlIH0sIHtcbiAgICAgICAgJ3NvdXJjZSc6IHtcbiAgICAgICAgICAgIHR5cGU6ICdlbnVtJyxcbiAgICAgICAgICAgIHZhbHVlczogWydhY3RpdmVKb2JzJywgJ2NvbXBsZXRlZEpvYnMnXVxuICAgICAgICB9XG4gICAgfSk7XG5cbiAgICBleHBlY3QuYWxsKGNvbmZpZywge1xuICAgICAgICAnd2ViMyc6IHtcbiAgICAgICAgICAgIHR5cGU6ICdvYmplY3QnLFxuICAgICAgICAgICAgY29kZTogV0VCM19SRVFVSVJFRFxuICAgICAgICB9LFxuICAgICAgICAnY29udHJhY3RzLkNvZ25pdGl2ZUpvYkNvbnRyb2xsZXIuYWJpJzoge1xuICAgICAgICAgICAgdHlwZTogJ29iamVjdCcsXG4gICAgICAgICAgICBjb2RlOiBDT05UUkFDVF9SRVFVSVJFRCxcbiAgICAgICAgICAgIGFyZ3M6IFsnQ29nbml0aXZlSm9iQ29udHJvbGxlciddXG4gICAgICAgIH1cbiAgICB9KTsgICAgXG5cbiAgICBsZXQgam9iQ29udHJvbGxlciA9IGxvY2FsQ2FjaGUuZ2V0KCdqb2JDb250cm9sbGVyJyk7XG5cbiAgICBpZiAoIWpvYkNvbnRyb2xsZXIpIHtcblxuICAgICAgICBqb2JDb250cm9sbGVyID0gYXdhaXQgZmV0Y2hKb2JDb250cm9sbGVyQWRkcmVzcyhjb25maWcpO1xuICAgIH1cblxuICAgIC8vIG51bWJlcnMgc2VxdWVuY2UgZnJvbSAwIHRvIGNvdW50XG4gICAgY29uc3QgY291bnRzID0gWy4uLkFycmF5KGNvdW50KS5rZXlzKCldO1xuXG4gICAgY29uc3QgamN0cmwgPSBuZXcgY29uZmlnLndlYjMuZXRoLkNvbnRyYWN0KGNvbmZpZy5jb250cmFjdHMuQ29nbml0aXZlSm9iQ29udHJvbGxlci5hYmksIGpvYkNvbnRyb2xsZXIpO1xuICAgIGNvbnN0IGFkZHJlc3NlcyA9IGF3YWl0IFByb21pc2UuYWxsKGNvdW50cy5tYXAoaW5kZXggPT4gamN0cmwubWV0aG9kcy5nZXRKb2JJZChpbmRleCwgc291cmNlID09PSAnYWN0aXZlSm9icycpLmNhbGwoKSkpO1xuICAgICAgICBcbiAgICByZXR1cm4gYWRkcmVzc2VzO1xufTtcblxuLyoqXG4gKiBDcmVhdGUgY29nbml0aXZlIGpvYiBjb250cmFjdFxuICogXG4gKiBAcGFyYW0ge09iamVjdH0gb3B0aW9uc1xuICogQHBhcmFtIHtTdHJpbmd9IGZyb20gUHVibGlzaGVyIGFkZHJlc3NcbiAqIEBwYXJhbSB7T2JqZWN0fSBjb25maWcgTGlicmFyeSBjb25maWcgKHByb3ZpZGVkIGJ5IHRoZSBwcm94eSBidXQgY2FuIGJlIG92ZXJyaWRkZW4pXG4gKiBAcmV0dXJucyB7UHJvbWlzZX0gUHJvbWlzZSBvYmplY3QgcmVzb2x2ZWQgdG8gYWRkIHN0YXR1cyAoYm9vbGVhbilcbiAqL1xuZXhwb3J0IGNvbnN0IGNyZWF0ZSA9ICh7a2VybmVsLCBkYXRhc2V0LCBjb21wbGV4aXR5LCBqb2JUeXBlLCBkZXNjcmlwdGlvbiwgZGVwb3NpdH0sIGZyb20sIGNvbmZpZyA9IHt9KSA9PiBuZXcgUHJvbWlzZShhc3luYyAocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG5cbiAgICBleHBlY3QuYWxsKHsga2VybmVsLCBkYXRhc2V0LCBjb21wbGV4aXR5LCBqb2JUeXBlLCBkZXNjcmlwdGlvbiwgZGVwb3NpdCwgZnJvbSB9LCB7XG4gICAgICAgICdrZXJuZWwnOiB7XG4gICAgICAgICAgICB0eXBlOiAnYWRkcmVzcydcbiAgICAgICAgfSxcbiAgICAgICAgJ2RhdGFzZXQnOiB7XG4gICAgICAgICAgICB0eXBlOiAnYWRkcmVzcydcbiAgICAgICAgfSxcbiAgICAgICAgJ2NvbXBsZXhpdHknOiB7XG4gICAgICAgICAgICB0eXBlOiAnbnVtYmVyJ1xuICAgICAgICB9LFxuICAgICAgICAnam9iVHlwZSc6IHtcbiAgICAgICAgICAgIHR5cGU6ICdzdHJpbmcnXG4gICAgICAgIH0sXG4gICAgICAgICdkZXNjcmlwdGlvbic6IHtcbiAgICAgICAgICAgIHR5cGU6ICdzdHJpbmcnXG4gICAgICAgIH0sXG4gICAgICAgICdkZXBvc2l0Jzoge1xuICAgICAgICAgICAgdHlwZTogJ251bWJlcidcbiAgICAgICAgfSxcbiAgICAgICAgJ2Zyb20nOiB7XG4gICAgICAgICAgICB0eXBlOiAnYWRkcmVzcydcbiAgICAgICAgfVxuICAgIH0pO1xuXG4gICAgZXhwZWN0LmFsbChjb25maWcsIHtcbiAgICAgICAgJ3dlYjMnOiB7XG4gICAgICAgICAgICB0eXBlOiAnb2JqZWN0JyxcbiAgICAgICAgICAgIGNvZGU6IFdFQjNfUkVRVUlSRURcbiAgICAgICAgfSxcbiAgICAgICAgJ2NvbnRyYWN0cy5QYW5kb3JhLmFiaSc6IHtcbiAgICAgICAgICAgIHR5cGU6ICdvYmplY3QnLFxuICAgICAgICAgICAgY29kZTogQ09OVFJBQ1RfUkVRVUlSRUQsXG4gICAgICAgICAgICBhcmdzOiBbJ1BhbmRvcmEnXVxuICAgICAgICB9LFxuICAgICAgICAnYWRkcmVzc2VzLlBhbmRvcmEnOiB7XG4gICAgICAgICAgICB0eXBlOiAnYWRkcmVzcycsXG4gICAgICAgICAgICBjb2RlOiBBRERSRVNTX1JFUVVJUkVELFxuICAgICAgICAgICAgYXJnczogWydQYW5kb3JhJ11cbiAgICAgICAgfVxuICAgIH0pO1xuXG4gICAgY29uc3QgcGFuID0gbmV3IGNvbmZpZy53ZWIzLmV0aC5Db250cmFjdChjb25maWcuY29udHJhY3RzLlBhbmRvcmEuYWJpLCBjb25maWcuYWRkcmVzc2VzLlBhbmRvcmEpO1xuICAgIGNvbnN0IGdhc1ByaWNlID0gYXdhaXQgY29uZmlnLndlYjMuZXRoLmdldEdhc1ByaWNlKCk7XG4gICAgcGFuLm1ldGhvZHNcbiAgICAgICAgLmNyZWF0ZUNvZ25pdGl2ZUpvYihrZXJuZWwsIGRhdGFzZXQsIGNvbXBsZXhpdHksIGNvbmZpZy53ZWIzLnV0aWxzLnV0ZjhUb0hleChgJHtqb2JUeXBlfTske2Rlc2NyaXB0aW9ufWApKVxuICAgICAgICAuc2VuZCh7XG4gICAgICAgICAgICB2YWx1ZTogY29uZmlnLndlYjMudXRpbHMudG9XZWkoU3RyaW5nKGRlcG9zaXQpKSxcbiAgICAgICAgICAgIGZyb20sXG4gICAgICAgICAgICBnYXNQcmljZSxcbiAgICAgICAgICAgIGdhczogNjcwMDAwMC8vIGJlY2F1c2UgdGhpcyB3b3JrZmxvdyBpcyB0b28gZ3JlZWR5XG4gICAgICAgIH0pXG4gICAgICAgIC5vbignZXJyb3InLCByZWplY3QpXG4gICAgICAgIC5vbigncmVjZWlwdCcsIHJlY2VpcHQgPT4ge1xuXG4gICAgICAgICAgICB0cnkge1xuXG4gICAgICAgICAgICAgICAgaWYgKE51bWJlcihyZWNlaXB0LnN0YXR1cykgPT09IDApIHtcblxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gcmVqZWN0KHBqc0Vycm9yKFRSQU5TQUNUSU9OX1VOU1VDQ0VTU0ZVTCkpO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIGlmIChyZWNlaXB0LmV2ZW50cy5Db2duaXRpdmVKb2JRdWV1ZWQpIHtcbiAgICBcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHJlc29sdmUocmVjZWlwdC5ldmVudHMuQ29nbml0aXZlSm9iUXVldWVkLnJldHVyblZhbHVlcy5qb2JJZCk7XG4gICAgICAgICAgICAgICAgfVxuICAgIFxuICAgICAgICAgICAgICAgIHJlc29sdmUocmVjZWlwdC5ldmVudHMuQ29nbml0aXZlSm9iQ3JlYXRlZC5yZXR1cm5WYWx1ZXMuam9iSWQpO1xuICAgICAgICAgICAgfSBjYXRjaCAoZXJyKSB7XG4gICAgICAgICAgICAgICAgcmVqZWN0KGVycik7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xufSk7XG5cbi8qKlxuICogR2V0IGFsbCBqb2JzXG4gKiBcbiAqIEBwYXJhbSB7T2JqZWN0fSBjb25maWcgTGlicmFyeSBjb25maWcgKHByb3ZpZGVkIGJ5IHRoZSBwcm94eSBidXQgY2FuIGJlIG92ZXJyaWRkZW4pXG4gKiBAcmV0dXJucyB7UHJvbWlzZX0gQSBQcm9taXNlIG9iamVjdCByZXByZXNlbnRzIHRoZSB7T2JqZWN0W119IFxuICovXG5leHBvcnQgY29uc3QgZmV0Y2hBbGwgPSBhc3luYyAoY29uZmlnID0ge30pID0+IHtcbiAgICBsZXQgcmVjb3JkcyA9IFtdO1xuICAgIGxldCBlcnJvciA9IFtdO1xuXG4gICAgdHJ5IHtcblxuICAgICAgICBjb25zdCBbXG4gICAgICAgICAgICBhY3RpdmVDb3VudCxcbiAgICAgICAgICAgIGNvbXBsZXRlZENvdW50XG4gICAgICAgIF0gPSBhd2FpdCBQcm9taXNlLmFsbChbXG4gICAgICAgICAgICBmZXRjaEFjdGl2ZUpvYnNDb3VudChjb25maWcpLFxuICAgICAgICAgICAgZmV0Y2hDb21wbGV0ZWRKb2JzQ291bnQoY29uZmlnKVxuICAgICAgICBdKTtcblxuICAgICAgICBjb25zdCBbXG4gICAgICAgICAgICBhY3RpdmVKb2JzSWRzLFxuICAgICAgICAgICAgY29tcGxldGVkSm9ic0lkc1xuICAgICAgICBdID0gYXdhaXQgUHJvbWlzZS5hbGwoW1xuICAgICAgICAgICAgZmV0Y2hKb2JzSWRzKCdhY3RpdmVKb2JzJywgYWN0aXZlQ291bnQsIGNvbmZpZyksXG4gICAgICAgICAgICBmZXRjaEpvYnNJZHMoJ2NvbXBsZXRlZEpvYnMnLCBjb21wbGV0ZWRDb3VudCwgY29uZmlnKVxuICAgICAgICBdKTtcblxuICAgICAgICBjb25zdCBhbGxKb2JzSWRzID0gW1xuICAgICAgICAgICAgLi4uYWN0aXZlSm9ic0lkcyxcbiAgICAgICAgICAgIC4uLmNvbXBsZXRlZEpvYnNJZHNcbiAgICAgICAgXTtcblxuICAgICAgICByZWNvcmRzID0gYXdhaXQgUHJvbWlzZS5hbGwoYWxsSm9ic0lkcy5tYXAoam9iSWQgPT4gZmV0Y2hKb2JEZXRhaWxzKGpvYklkLCBjb25maWcpKSk7XG4gICAgICAgIFxuICAgIH0gY2F0Y2goZXJyKSB7XG4gICAgICAgIGVycm9yLnB1c2goe1xuICAgICAgICAgICAgZXJyb3I6IGVyci5tZXNzYWdlXG4gICAgICAgIH0pO1xuICAgIH0gICBcblxuICAgIHJldHVybiB7XG4gICAgICAgIHJlY29yZHMsXG4gICAgICAgIGVycm9yXG4gICAgfTtcbn07XG5cbi8qKlxuICogSGFuZGxlIGV2ZW50IENvZ25pdGl2ZUpvYkNyZWF0ZWRcbiAqIFxuICogQHBhcmFtIHtPYmplY3R9IG9wdGlvbnMgRXZlbnQgaGFuZGxlciBvcHRpb25zXG4gKiBAcGFyYW0ge09iamVjdH0gY29uZmlnIExpYnJhcnkgY29uZmlnIChwcm92aWRlZCBieSB0aGUgcHJveHkgYnV0IGNhbiBiZSBvdmVycmlkZGVuKVxuICogQHJldHVybnMge09iamVjdH0gT2JqZWN0IHdpdGggY2hhaW5lZCBjYWxsYmFja3MgI2RhdGEgYW5kICNlcnJvclxuICovXG5leHBvcnQgY29uc3QgZXZlbnRDb2duaXRpdmVKb2JDcmVhdGVkID0gKG9wdGlvbnMgPSB7fSwgY29uZmlnID0ge30pID0+IHtcblxuICAgIGV4cGVjdC5hbGwoeyBvcHRpb25zIH0sIHtcbiAgICAgICAgJ29wdGlvbnMnOiB7XG4gICAgICAgICAgICB0eXBlOiAnb2JqZWN0J1xuICAgICAgICB9XG4gICAgfSk7XG5cbiAgICBleHBlY3QuYWxsKGNvbmZpZywge1xuICAgICAgICAnd2ViMyc6IHtcbiAgICAgICAgICAgIHR5cGU6ICdvYmplY3QnLFxuICAgICAgICAgICAgY29kZTogV0VCM19SRVFVSVJFRFxuICAgICAgICB9LFxuICAgICAgICAnY29udHJhY3RzLlBhbmRvcmEuYWJpJzoge1xuICAgICAgICAgICAgdHlwZTogJ29iamVjdCcsXG4gICAgICAgICAgICBjb2RlOiBDT05UUkFDVF9SRVFVSVJFRCxcbiAgICAgICAgICAgIGFyZ3M6IFsnUGFuZG9yYSddXG4gICAgICAgIH0sXG4gICAgICAgICdhZGRyZXNzZXMuUGFuZG9yYSc6IHtcbiAgICAgICAgICAgIHR5cGU6ICdhZGRyZXNzJyxcbiAgICAgICAgICAgIGNvZGU6IEFERFJFU1NfUkVRVUlSRUQsXG4gICAgICAgICAgICBhcmdzOiBbJ1BhbmRvcmEnXVxuICAgICAgICB9XG4gICAgfSk7XG5cbiAgICBjb25zdCBjYWxsYmFja3MgPSB7XG4gICAgICAgIG9uRGF0YTogKCkgPT4ge30sXG4gICAgICAgIG9uRXJyb3I6ICgpID0+IHt9XG4gICAgfTtcblxuICAgIGNvbnN0IGNoYWluID0ge1xuICAgICAgICBkYXRhOiAoY2IgPSAoKSA9PiB7fSkgPT4ge1xuICAgICAgICAgICAgY2FsbGJhY2tzLm9uRGF0YSA9IGNiO1xuICAgICAgICAgICAgcmV0dXJuIGNoYWluO1xuICAgICAgICB9LFxuICAgICAgICBlcnJvcjogKGNiID0gKCkgPT4ge30pID0+IHtcbiAgICAgICAgICAgIGNhbGxiYWNrcy5vbkVycm9yID0gY2I7XG4gICAgICAgICAgICByZXR1cm4gY2hhaW47XG4gICAgICAgIH1cbiAgICB9O1xuXG4gICAgY29uc3QgcGFuID0gbmV3IGNvbmZpZy53ZWIzLmV0aC5Db250cmFjdChjb25maWcuY29udHJhY3RzLlBhbmRvcmEuYWJpLCBjb25maWcuYWRkcmVzc2VzLlBhbmRvcmEpO1xuICAgIGNoYWluLmV2ZW50ID0gcGFuLmV2ZW50cy5Db2duaXRpdmVKb2JDcmVhdGVkKG9wdGlvbnMpXG4gICAgICAgIC5vbignZGF0YScsIGFzeW5jIChldmVudCkgPT4ge1xuXG4gICAgICAgICAgICB0cnkge1xuXG4gICAgICAgICAgICAgICAgY29uc3Qgam9iRGV0YWlscyA9IGF3YWl0IGZldGNoSm9iRGV0YWlscyhldmVudC5yZXR1cm5WYWx1ZXMuam9iSWQsIGNvbmZpZyk7XG4gICAgICAgICAgICAgICAgY2FsbGJhY2tzLm9uRGF0YSh7XG4gICAgICAgICAgICAgICAgICAgIHJlY29yZHM6IFtqb2JEZXRhaWxzXSxcbiAgICAgICAgICAgICAgICAgICAgZXZlbnRcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH0gY2F0Y2goZXJyKSB7XG4gICAgICAgICAgICAgICAgY2FsbGJhY2tzLm9uRXJyb3IoZXJyKTtcbiAgICAgICAgICAgIH0gICAgICAgICAgICBcbiAgICAgICAgfSlcbiAgICAgICAgLm9uKCdlcnJvcicsIGNhbGxiYWNrcy5vbkVycm9yKTtcblxuICAgIHJldHVybiBjaGFpbjtcbn07XG5cbi8qKlxuICogSGFuZGxlIGV2ZW50IEpvYlN0YXRlQ2hhbmdlZFxuICogXG4gKiBAcGFyYW0ge09iamVjdH0gb3B0aW9ucyBFdmVudCBoYW5kbGVyIG9wdGlvbnNcbiAqIEBwYXJhbSB7T2JqZWN0fSBjb25maWcgTGlicmFyeSBjb25maWcgKHByb3ZpZGVkIGJ5IHRoZSBwcm94eSBidXQgY2FuIGJlIG92ZXJyaWRkZW4pXG4gKiBAcmV0dXJucyB7T2JqZWN0fSBPYmplY3Qgd2l0aCBjaGFpbmVkIGNhbGxiYWNrcyAjZGF0YSBhbmQgI2Vycm9yXG4gKi9cbmV4cG9ydCBjb25zdCBldmVudEpvYlN0YXRlQ2hhbmdlZCA9IChvcHRpb25zID0ge30sIGNvbmZpZyA9IHt9KSA9PiB7XG5cbiAgICBleHBlY3QuYWxsKHsgb3B0aW9ucyB9LCB7XG4gICAgICAgICdvcHRpb25zJzoge1xuICAgICAgICAgICAgdHlwZTogJ29iamVjdCdcbiAgICAgICAgfVxuICAgIH0pO1xuXG4gICAgZXhwZWN0LmFsbChjb25maWcsIHtcbiAgICAgICAgJ3dlYjMnOiB7XG4gICAgICAgICAgICB0eXBlOiAnb2JqZWN0JyxcbiAgICAgICAgICAgIGNvZGU6IFdFQjNfUkVRVUlSRURcbiAgICAgICAgfSxcbiAgICAgICAgJ2NvbnRyYWN0cy5QYW5kb3JhLmFiaSc6IHtcbiAgICAgICAgICAgIHR5cGU6ICdvYmplY3QnLFxuICAgICAgICAgICAgY29kZTogQ09OVFJBQ1RfUkVRVUlSRUQsXG4gICAgICAgICAgICBhcmdzOiBbJ1BhbmRvcmEnXVxuICAgICAgICB9LFxuICAgICAgICAnYWRkcmVzc2VzLlBhbmRvcmEnOiB7XG4gICAgICAgICAgICB0eXBlOiAnYWRkcmVzcycsXG4gICAgICAgICAgICBjb2RlOiBBRERSRVNTX1JFUVVJUkVELFxuICAgICAgICAgICAgYXJnczogWydQYW5kb3JhJ11cbiAgICAgICAgfVxuICAgIH0pO1xuXG4gICAgY29uc3QgY2FsbGJhY2tzID0ge1xuICAgICAgICBvbkRhdGE6ICgpID0+IHt9LFxuICAgICAgICBvbkVycm9yOiAoKSA9PiB7fVxuICAgIH07XG5cbiAgICBjb25zdCBjaGFpbiA9IHtcbiAgICAgICAgZGF0YTogKGNiID0gKCkgPT4ge30pID0+IHtcbiAgICAgICAgICAgIGNhbGxiYWNrcy5vbkRhdGEgPSBjYjtcbiAgICAgICAgICAgIHJldHVybiBjaGFpbjtcbiAgICAgICAgfSxcbiAgICAgICAgZXJyb3I6IChjYiA9ICgpID0+IHt9KSA9PiB7XG4gICAgICAgICAgICBjYWxsYmFja3Mub25FcnJvciA9IGNiO1xuICAgICAgICAgICAgcmV0dXJuIGNoYWluO1xuICAgICAgICB9XG4gICAgfTtcblxuICAgIChhc3luYyAoKSA9PiB7XG5cbiAgICAgICAgbGV0IGpvYkNvbnRyb2xsZXIgPSBsb2NhbENhY2hlLmdldCgnam9iQ29udHJvbGxlcicpO1xuXG4gICAgICAgIGlmICgham9iQ29udHJvbGxlcikge1xuXG4gICAgICAgICAgICBqb2JDb250cm9sbGVyID0gYXdhaXQgZmV0Y2hKb2JDb250cm9sbGVyQWRkcmVzcyhjb25maWcpO1xuICAgICAgICB9XG4gICAgXG4gICAgICAgIGNvbnN0IGpjdHJsID0gbmV3IGNvbmZpZy53ZWIzLmV0aC5Db250cmFjdChjb25maWcuY29udHJhY3RzLkNvZ25pdGl2ZUpvYkNvbnRyb2xsZXIuYWJpLCBqb2JDb250cm9sbGVyKTtcbiAgICAgICAgY2hhaW4uZXZlbnQgPSBqY3RybC5ldmVudHMuSm9iU3RhdGVDaGFuZ2VkKG9wdGlvbnMpXG4gICAgICAgICAgICAub24oJ2RhdGEnLCBhc3luYyBldmVudCA9PiB7XG4gICAgXG4gICAgICAgICAgICAgICAgdHJ5IHtcbiAgICBcbiAgICAgICAgICAgICAgICAgICAgY29uc3Qgam9iRGV0YWlscyA9IGF3YWl0IGZldGNoSm9iRGV0YWlscyhldmVudC5yZXR1cm5WYWx1ZXMuam9iSWQsIGNvbmZpZyk7XG4gICAgICAgICAgICAgICAgICAgIGNhbGxiYWNrcy5vbkRhdGEoe1xuICAgICAgICAgICAgICAgICAgICAgICAgcmVjb3JkczogW2pvYkRldGFpbHNdLFxuICAgICAgICAgICAgICAgICAgICAgICAgZXZlbnRcbiAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgfSBjYXRjaChlcnIpIHtcbiAgICAgICAgICAgICAgICAgICAgY2FsbGJhY2tzLm9uRXJyb3IoZXJyKTtcbiAgICAgICAgICAgICAgICB9ICAgICAgICAgICAgXG4gICAgICAgICAgICB9KVxuICAgICAgICAgICAgLm9uKCdlcnJvcicsIGNhbGxiYWNrcy5vbkVycm9yKTtcbiAgICB9KSgpO1xuXG4gICAgcmV0dXJuIGNoYWluO1xufTtcbiJdfQ==