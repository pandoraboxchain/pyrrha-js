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
exports.eventJobStateChanged = exports.eventCognitiveJobCreated = exports.create = exports.fetchAll = exports.fetchJobsIds = exports.fetchJobDetails = exports.fetchServiceInfo = exports.fetchCompletedJobsCount = exports.fetchActiveJobsCount = exports.fetchJobControllerAddress = void 0;

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

require("core-js/modules/es6.string.iterator");

require("core-js/modules/es6.map");

var expect = _interopRequireWildcard(require("./helpers/expect"));

var _errors = _interopRequireWildcard(require("./helpers/errors"));

var _kernels = require("./kernels");

var _datasets = require("./datasets");

var _workers = require("./workers");

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
 * Get job service info 
 * 
 * @param {String} address Job address
 * @param {Object} config Library config (provided by the proxy but can be overridden)
 * @returns {Promise<{Number}>} 
 */


exports.fetchCompletedJobsCount = fetchCompletedJobsCount;

var fetchServiceInfo =
/*#__PURE__*/
function () {
  var _ref4 = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee4(address) {
    var config,
        jobController,
        jctrl,
        _ref5,
        responseTimestamps,
        responseFlags,
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
            return jctrl.methods.getCognitiveJobServiceInfo(address).call();

          case 10:
            _ref5 = _context4.sent;
            responseTimestamps = _ref5.responseTimestamps;
            responseFlags = _ref5.responseFlags;
            return _context4.abrupt("return", {
              responseTimestamps: responseTimestamps,
              responseFlags: responseFlags
            });

          case 14:
          case "end":
            return _context4.stop();
        }
      }
    }, _callee4, this);
  }));

  return function fetchServiceInfo(_x) {
    return _ref4.apply(this, arguments);
  };
}();
/**
 * Get job details 
 * 
 * @param {String} address Job address
 * @param {Object} config Library config (provided by the proxy but can be overridden)
 * @returns {Promise<{Number}>} 
 */


exports.fetchServiceInfo = fetchServiceInfo;

var fetchJobDetails =
/*#__PURE__*/
function () {
  var _ref6 = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee6(address) {
    var config,
        jobController,
        jctrl,
        _ref7,
        kernel,
        dataset,
        complexity,
        description,
        activeWorkers,
        state,
        kernelIpfs,
        datasetIpfs,
        ipfsResults,
        utf8description,
        serviceInfo,
        progress,
        _args6 = arguments;

    return regeneratorRuntime.wrap(function _callee6$(_context6) {
      while (1) {
        switch (_context6.prev = _context6.next) {
          case 0:
            config = _args6.length > 1 && _args6[1] !== undefined ? _args6[1] : {};
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
              _context6.next = 7;
              break;
            }

            _context6.next = 6;
            return fetchJobControllerAddress(config);

          case 6:
            jobController = _context6.sent;

          case 7:
            jctrl = new config.web3.eth.Contract(config.contracts.CognitiveJobController.abi, jobController);
            _context6.next = 10;
            return jctrl.methods.getCognitiveJobDetails(address).call();

          case 10:
            _ref7 = _context6.sent;
            kernel = _ref7.kernel;
            dataset = _ref7.dataset;
            complexity = _ref7.complexity;
            description = _ref7.description;
            activeWorkers = _ref7.activeWorkers;
            state = _ref7.state;
            _context6.next = 19;
            return (0, _kernels.fetchIpfsAddress)(kernel, config);

          case 19:
            kernelIpfs = _context6.sent;
            _context6.next = 22;
            return (0, _datasets.fetchIpfsAddress)(dataset, config);

          case 22:
            datasetIpfs = _context6.sent;
            _context6.next = 25;
            return Promise.all(activeWorkers.map(function (_, index) {
              return jctrl.methods.getCognitiveJobResults(address, index).call();
            }));

          case 25:
            ipfsResults = _context6.sent;
            utf8description = description ? config.web3.utils.hexToUtf8(description) : '';
            _context6.next = 29;
            return fetchServiceInfo(address, config);

          case 29:
            serviceInfo = _context6.sent;
            _context6.t0 = Math;
            _context6.next = 33;
            return ipfsResults.reduce(
            /*#__PURE__*/
            function () {
              var _ref8 = _asyncToGenerator(
              /*#__PURE__*/
              regeneratorRuntime.mark(function _callee5(progressPromise, result, index) {
                var commonProgress, partProgress;
                return regeneratorRuntime.wrap(function _callee5$(_context5) {
                  while (1) {
                    switch (_context5.prev = _context5.next) {
                      case 0:
                        _context5.next = 2;
                        return progressPromise;

                      case 2:
                        commonProgress = _context5.sent;
                        partProgress = 100 / ipfsResults.length;

                        if (result) {
                          _context5.next = 8;
                          break;
                        }

                        _context5.next = 7;
                        return (0, _workers.fetchJobProgress)(activeWorkers[index], config);

                      case 7:
                        partProgress = _context5.sent;

                      case 8:
                        return _context5.abrupt("return", commonProgress + partProgress);

                      case 9:
                      case "end":
                        return _context5.stop();
                    }
                  }
                }, _callee5, this);
              }));

              return function (_x3, _x4, _x5) {
                return _ref8.apply(this, arguments);
              };
            }(), Promise.resolve(0));

          case 33:
            _context6.t1 = _context6.sent;
            progress = _context6.t0.ceil.call(_context6.t0, _context6.t1);
            return _context6.abrupt("return", {
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
              progress: progress > 100 ? 100 : progress,
              state: Number(state),
              description: utf8description.substr(2),
              jobType: utf8description.substr(0, 1),
              serviceInfo: serviceInfo
            });

          case 36:
          case "end":
            return _context6.stop();
        }
      }
    }, _callee6, this);
  }));

  return function fetchJobDetails(_x2) {
    return _ref6.apply(this, arguments);
  };
}();
/**
 * Get jobs Id from the "source"
 * 
 * @param {String} from source activeJobs or completedJobs
 * @param {Number} count
 * @param {Object} options
 * @returns {Promise<{String[]}>} 
 */


exports.fetchJobDetails = fetchJobDetails;

var fetchJobsIds =
/*#__PURE__*/
function () {
  var _ref9 = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee7(source) {
    var count,
        config,
        jobController,
        counts,
        jctrl,
        addresses,
        _args7 = arguments;
    return regeneratorRuntime.wrap(function _callee7$(_context7) {
      while (1) {
        switch (_context7.prev = _context7.next) {
          case 0:
            count = _args7.length > 1 && _args7[1] !== undefined ? _args7[1] : 0;
            config = _args7.length > 2 && _args7[2] !== undefined ? _args7[2] : {};
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
              _context7.next = 9;
              break;
            }

            _context7.next = 8;
            return fetchJobControllerAddress(config);

          case 8:
            jobController = _context7.sent;

          case 9:
            // numbers sequence from 0 to count
            counts = _toConsumableArray(Array(count).keys());
            jctrl = new config.web3.eth.Contract(config.contracts.CognitiveJobController.abi, jobController);
            _context7.next = 13;
            return Promise.all(counts.map(function (index) {
              return jctrl.methods.getJobId(index, source === 'activeJobs').call();
            }));

          case 13:
            addresses = _context7.sent;
            return _context7.abrupt("return", addresses);

          case 15:
          case "end":
            return _context7.stop();
        }
      }
    }, _callee7, this);
  }));

  return function fetchJobsIds(_x6) {
    return _ref9.apply(this, arguments);
  };
}();
/**
 * Get all jobs
 * 
 * @param {Object} config Library config (provided by the proxy but can be overridden)
 * @returns {Promise} A Promise object represents the {Object[]} 
 */


exports.fetchJobsIds = fetchJobsIds;

var fetchAll =
/*#__PURE__*/
function () {
  var _ref10 = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee8() {
    var config,
        records,
        error,
        _ref11,
        _ref12,
        activeCount,
        completedCount,
        _ref13,
        _ref14,
        activeJobsIds,
        completedJobsIds,
        allJobsIds,
        _args8 = arguments;

    return regeneratorRuntime.wrap(function _callee8$(_context8) {
      while (1) {
        switch (_context8.prev = _context8.next) {
          case 0:
            config = _args8.length > 0 && _args8[0] !== undefined ? _args8[0] : {};
            records = [];
            error = [];
            _context8.prev = 3;
            _context8.next = 6;
            return Promise.all([fetchActiveJobsCount(config), fetchCompletedJobsCount(config)]);

          case 6:
            _ref11 = _context8.sent;
            _ref12 = _slicedToArray(_ref11, 2);
            activeCount = _ref12[0];
            completedCount = _ref12[1];
            _context8.next = 12;
            return Promise.all([fetchJobsIds('activeJobs', activeCount, config), fetchJobsIds('completedJobs', completedCount, config)]);

          case 12:
            _ref13 = _context8.sent;
            _ref14 = _slicedToArray(_ref13, 2);
            activeJobsIds = _ref14[0];
            completedJobsIds = _ref14[1];
            allJobsIds = [].concat(_toConsumableArray(activeJobsIds), _toConsumableArray(completedJobsIds));
            _context8.next = 19;
            return Promise.all(allJobsIds.map(function (jobId) {
              return fetchJobDetails(jobId, config);
            }));

          case 19:
            records = _context8.sent;
            _context8.next = 25;
            break;

          case 22:
            _context8.prev = 22;
            _context8.t0 = _context8["catch"](3);
            error.push({
              error: _context8.t0.message
            });

          case 25:
            return _context8.abrupt("return", {
              records: records,
              error: error
            });

          case 26:
          case "end":
            return _context8.stop();
        }
      }
    }, _callee8, this, [[3, 22]]);
  }));

  return function fetchAll() {
    return _ref10.apply(this, arguments);
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


exports.fetchAll = fetchAll;

var create = function create(_ref15, from) {
  var kernel = _ref15.kernel,
      dataset = _ref15.dataset,
      complexity = _ref15.complexity,
      jobType = _ref15.jobType,
      description = _ref15.description,
      deposit = _ref15.deposit;
  var config = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
  return new Promise(
  /*#__PURE__*/
  function () {
    var _ref16 = _asyncToGenerator(
    /*#__PURE__*/
    regeneratorRuntime.mark(function _callee9(resolve, reject) {
      var pan, gasPrice;
      return regeneratorRuntime.wrap(function _callee9$(_context9) {
        while (1) {
          switch (_context9.prev = _context9.next) {
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
              _context9.next = 5;
              return config.web3.eth.getGasPrice();

            case 5:
              gasPrice = _context9.sent;
              pan.methods.createCognitiveJob(kernel, dataset, complexity, config.web3.utils.utf8ToHex("".concat(jobType, ";").concat(description.trim()))).send({
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
              return _context9.stop();
          }
        }
      }, _callee9, this);
    }));

    return function (_x7, _x8) {
      return _ref16.apply(this, arguments);
    };
  }());
};
/**
 * Handle event CognitiveJobCreated
 * 
 * @param {Object} options Event handler options
 * @param {Object} config Library config (provided by the proxy but can be overridden)
 * @returns {Promise<{Object}>} PPromise object resolved to the object with chained callbacks #data and #error
 */


exports.create = create;

var eventCognitiveJobCreated =
/*#__PURE__*/
function () {
  var _ref17 = _asyncToGenerator(
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
            chain.event[0] = pan.events.CognitiveJobCreated(options).on('data',
            /*#__PURE__*/
            function () {
              var _ref18 = _asyncToGenerator(
              /*#__PURE__*/
              regeneratorRuntime.mark(function _callee10(event) {
                var jobDetails;
                return regeneratorRuntime.wrap(function _callee10$(_context10) {
                  while (1) {
                    switch (_context10.prev = _context10.next) {
                      case 0:
                        _context10.prev = 0;
                        _context10.next = 3;
                        return fetchJobDetails(event.returnValues.jobId, config);

                      case 3:
                        jobDetails = _context10.sent;
                        callbacks.onData({
                          records: [jobDetails],
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

              return function (_x9) {
                return _ref18.apply(this, arguments);
              };
            }()).on('error', callbacks.onError);
            chain.event[0].name = 'CognitiveJobCreated';
            return _context11.abrupt("return", chain);

          case 11:
          case "end":
            return _context11.stop();
        }
      }
    }, _callee11, this);
  }));

  return function eventCognitiveJobCreated() {
    return _ref17.apply(this, arguments);
  };
}();
/**
 * Handle event JobStateChanged
 * 
 * @param {Object} options Event handler options
 * @param {Object} config Library config (provided by the proxy but can be overridden)
 * @returns {Promise<{Object}>} PPromise object resolved to the object with chained callbacks #data and #error
 */


exports.eventCognitiveJobCreated = eventCognitiveJobCreated;

var eventJobStateChanged =
/*#__PURE__*/
function () {
  var _ref19 = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee13() {
    var options,
        config,
        callbacks,
        chain,
        eventHandler,
        jobController,
        jctrl,
        _args13 = arguments;
    return regeneratorRuntime.wrap(function _callee13$(_context13) {
      while (1) {
        switch (_context13.prev = _context13.next) {
          case 0:
            options = _args13.length > 0 && _args13[0] !== undefined ? _args13[0] : {};
            config = _args13.length > 1 && _args13[1] !== undefined ? _args13[1] : {};
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

            eventHandler =
            /*#__PURE__*/
            function () {
              var _ref20 = _asyncToGenerator(
              /*#__PURE__*/
              regeneratorRuntime.mark(function _callee12(event) {
                var jobDetails;
                return regeneratorRuntime.wrap(function _callee12$(_context12) {
                  while (1) {
                    switch (_context12.prev = _context12.next) {
                      case 0:
                        _context12.prev = 0;
                        _context12.next = 3;
                        return fetchJobDetails(event.returnValues.jobId, config);

                      case 3:
                        jobDetails = _context12.sent;
                        callbacks.onData({
                          records: [jobDetails],
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

              return function eventHandler(_x10) {
                return _ref20.apply(this, arguments);
              };
            }();

            jobController = localCache.get('jobController');

            if (jobController) {
              _context13.next = 12;
              break;
            }

            _context13.next = 11;
            return fetchJobControllerAddress(config);

          case 11:
            jobController = _context13.sent;

          case 12:
            jctrl = new config.web3.eth.Contract(config.contracts.CognitiveJobController.abi, jobController); // We listen for two events because of their nature means almost the same

            chain.event = [];
            chain.event.push(jctrl.events.JobStateChanged(options).on('data', eventHandler).on('error', callbacks.onError));
            chain.event[0].name = 'JobStateChanged';
            chain.event.push(jctrl.events.CognitionProgressed(options).on('data', eventHandler).on('error', callbacks.onError));
            chain.event[1].name = 'CognitionProgressed';
            return _context13.abrupt("return", chain);

          case 19:
          case "end":
            return _context13.stop();
        }
      }
    }, _callee13, this);
  }));

  return function eventJobStateChanged() {
    return _ref19.apply(this, arguments);
  };
}();

exports.eventJobStateChanged = eventJobStateChanged;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9qb2JzLmpzIl0sIm5hbWVzIjpbImxvY2FsQ2FjaGUiLCJNYXAiLCJmZXRjaEpvYkNvbnRyb2xsZXJBZGRyZXNzIiwiY29uZmlnIiwiZXhwZWN0IiwiYWxsIiwidHlwZSIsImNvZGUiLCJXRUIzX1JFUVVJUkVEIiwiQUREUkVTU19SRVFVSVJFRCIsImFyZ3MiLCJDT05UUkFDVF9SRVFVSVJFRCIsInBhbiIsIndlYjMiLCJldGgiLCJDb250cmFjdCIsImNvbnRyYWN0cyIsIlBhbmRvcmEiLCJhYmkiLCJhZGRyZXNzZXMiLCJtZXRob2RzIiwiam9iQ29udHJvbGxlciIsImNhbGwiLCJzZXQiLCJmZXRjaEFjdGl2ZUpvYnNDb3VudCIsImdldCIsImpjdHJsIiwiQ29nbml0aXZlSm9iQ29udHJvbGxlciIsImFjdGl2ZUpvYnNDb3VudCIsImNvdW50IiwiTnVtYmVyIiwicGFyc2VJbnQiLCJmZXRjaENvbXBsZXRlZEpvYnNDb3VudCIsImNvbXBsZXRlZEpvYnNDb3VudCIsImZldGNoU2VydmljZUluZm8iLCJhZGRyZXNzIiwiZ2V0Q29nbml0aXZlSm9iU2VydmljZUluZm8iLCJyZXNwb25zZVRpbWVzdGFtcHMiLCJyZXNwb25zZUZsYWdzIiwiZmV0Y2hKb2JEZXRhaWxzIiwiZ2V0Q29nbml0aXZlSm9iRGV0YWlscyIsImtlcm5lbCIsImRhdGFzZXQiLCJjb21wbGV4aXR5IiwiZGVzY3JpcHRpb24iLCJhY3RpdmVXb3JrZXJzIiwic3RhdGUiLCJrZXJuZWxJcGZzIiwiZGF0YXNldElwZnMiLCJQcm9taXNlIiwibWFwIiwiXyIsImluZGV4IiwiZ2V0Q29nbml0aXZlSm9iUmVzdWx0cyIsImlwZnNSZXN1bHRzIiwidXRmOGRlc2NyaXB0aW9uIiwidXRpbHMiLCJoZXhUb1V0ZjgiLCJzZXJ2aWNlSW5mbyIsIk1hdGgiLCJyZWR1Y2UiLCJwcm9ncmVzc1Byb21pc2UiLCJyZXN1bHQiLCJjb21tb25Qcm9ncmVzcyIsInBhcnRQcm9ncmVzcyIsImxlbmd0aCIsInJlc29sdmUiLCJwcm9ncmVzcyIsImNlaWwiLCJmaWx0ZXIiLCJyZXMiLCJzdWJzdHIiLCJqb2JUeXBlIiwiZmV0Y2hKb2JzSWRzIiwic291cmNlIiwidmFsdWVzIiwiY291bnRzIiwiQXJyYXkiLCJrZXlzIiwiZ2V0Sm9iSWQiLCJmZXRjaEFsbCIsInJlY29yZHMiLCJlcnJvciIsImFjdGl2ZUNvdW50IiwiY29tcGxldGVkQ291bnQiLCJhY3RpdmVKb2JzSWRzIiwiY29tcGxldGVkSm9ic0lkcyIsImFsbEpvYnNJZHMiLCJqb2JJZCIsInB1c2giLCJtZXNzYWdlIiwiY3JlYXRlIiwiZnJvbSIsImRlcG9zaXQiLCJyZWplY3QiLCJnZXRHYXNQcmljZSIsImdhc1ByaWNlIiwiY3JlYXRlQ29nbml0aXZlSm9iIiwidXRmOFRvSGV4IiwidHJpbSIsInNlbmQiLCJ2YWx1ZSIsInRvV2VpIiwiU3RyaW5nIiwiZ2FzIiwib24iLCJyZWNlaXB0Iiwic3RhdHVzIiwiVFJBTlNBQ1RJT05fVU5TVUNDRVNTRlVMIiwiZXZlbnRzIiwiQ29nbml0aXZlSm9iUXVldWVkIiwicmV0dXJuVmFsdWVzIiwiQ29nbml0aXZlSm9iQ3JlYXRlZCIsImVyciIsImV2ZW50Q29nbml0aXZlSm9iQ3JlYXRlZCIsIm9wdGlvbnMiLCJjYWxsYmFja3MiLCJvbkRhdGEiLCJvbkVycm9yIiwiY2hhaW4iLCJkYXRhIiwiY2IiLCJldmVudCIsImpvYkRldGFpbHMiLCJuYW1lIiwiZXZlbnRKb2JTdGF0ZUNoYW5nZWQiLCJldmVudEhhbmRsZXIiLCJKb2JTdGF0ZUNoYW5nZWQiLCJDb2duaXRpb25Qcm9ncmVzc2VkIl0sIm1hcHBpbmdzIjoiQUFBQTs7Ozs7Ozs7QUFTQTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUVBOztBQUNBOztBQU9BOztBQUlBOztBQUdBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFJQSxJQUFNQSxVQUFVLEdBQUcsSUFBSUMsR0FBSixFQUFuQjtBQUVBOzs7Ozs7O0FBTU8sSUFBTUMseUJBQXlCO0FB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LEVBRlksQ0FFVCxPQUZTLEVBRUFXLFNBQVMsQ0FBQ0UsT0FGVixDQUFqQjtBQUdBQyxZQUFBQSxLQUFLLENBQUNHLEtBQU4sQ0FBWSxDQUFaLEVBQWVFLElBQWYsR0FBc0IscUJBQXRCO0FBMUVnQywrQ0E0RXpCTCxLQTVFeUI7O0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUEsR0FBSDs7QUFBQSxrQkFBcEJNLG9CQUFvQjtBQUFBO0FBQUE7QUFBQSxHQUExQiIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogQ29nbml0aXZlIEpvYnMgcmVsYXRlZCBtZXRob2RzXG4gKiBUaGlzIGZpbGUgaXQgaXMgYSBwYXJ0IG9mIHRoZSBQYW5kb3JhIFB5cnJoYSBKYXZhc2NyaXB0IGxpYnJhcnlcbiAqIFxuICogQGZpbGUgam9icy5qc1xuICogQGF1dGhvciBLb3N0aWFudHluIFNteXJub3YgPGtvc3R5c2hAZ21haWwuY29tPlxuICogQGRhdGUgMjAxOFxuICovXG5cbid1c2Ugc3RyaWN0JztcblxuaW1wb3J0ICogYXMgZXhwZWN0IGZyb20gJy4vaGVscGVycy9leHBlY3QnO1xuaW1wb3J0IHBqc0Vycm9yLCB7XG4gICAgQ09OVFJBQ1RfUkVRVUlSRUQsXG4gICAgQUREUkVTU19SRVFVSVJFRCxcbiAgICBXRUIzX1JFUVVJUkVELFxuICAgIFRSQU5TQUNUSU9OX1VOU1VDQ0VTU0ZVTFxufSBmcm9tICcuL2hlbHBlcnMvZXJyb3JzJztcblxuaW1wb3J0IHtcbiAgICBmZXRjaElwZnNBZGRyZXNzIGFzIGZldGNoSXBmc0FkZHJlc3NCeUtlcm5lbEFkZHJlc3Ncbn0gZnJvbSAnLi9rZXJuZWxzJztcblxuaW1wb3J0IHtcbiAgICBmZXRjaElwZnNBZGRyZXNzIGFzIGZldGNoSXBmc0FkZHJlc3NCeURhdGFzZXRBZGRyZXNzXG59IGZyb20gJy4vZGF0YXNldHMnO1xuaW1wb3J0IHtcbiAgICBmZXRjaEpvYlByb2dyZXNzIGFzIGZldGNoV29ya2Vyc0FjdGl2ZUpvYlByb2dyZXNzXG59IGZyb20gJy4vd29ya2Vycyc7XG5cbmNvbnN0IGxvY2FsQ2FjaGUgPSBuZXcgTWFwKCk7XG5cbi8qKlxuICogR2V0IGpvYiBjb250cm9sbGVyIGFkZHJlc3NcbiAqIFxuICogQHBhcmFtIHtPYmplY3R9IGNvbmZpZyBMaWJyYXJ5IGNvbmZpZyAocHJvdmlkZWQgYnkgdGhlIHByb3h5IGJ1dCBjYW4gYmUgb3ZlcnJpZGRlbilcbiAqIEByZXR1cm5zIHtQcm9taXNlPHtTdHJpbmd9Pn0gXG4gKi9cbmV4cG9ydCBjb25zdCBmZXRjaEpvYkNvbnRyb2xsZXJBZGRyZXNzID0gYXN5bmMgKGNvbmZpZyA9IHt9KSA9PiB7XG5cbiAgICBleHBlY3QuYWxsKGNvbmZpZywge1xuICAgICAgICAnd2ViMyc6IHtcbiAgICAgICAgICAgIHR5cGU6ICdvYmplY3QnLFxuICAgICAgICAgICAgY29kZTogV0VCM19SRVFVSVJFRFxuICAgICAgICB9LFxuICAgICAgICAnYWRkcmVzc2VzLlBhbmRvcmEnOiB7XG4gICAgICAgICAgICB0eXBlOiAnYWRkcmVzcycsXG4gICAgICAgICAgICBjb2RlOiBBRERSRVNTX1JFUVVJUkVELFxuICAgICAgICAgICAgYXJnczogWydQYW5kb3JhJ11cbiAgICAgICAgfSxcbiAgICAgICAgJ2NvbnRyYWN0cy5QYW5kb3JhLmFiaSc6IHtcbiAgICAgICAgICAgIHR5cGU6ICdvYmplY3QnLFxuICAgICAgICAgICAgY29kZTogQ09OVFJBQ1RfUkVRVUlSRUQsXG4gICAgICAgICAgICBhcmdzOiBbJ1BhbmRvcmEnXVxuICAgICAgICB9XG4gICAgfSk7XG5cbiAgICBjb25zdCBwYW4gPSBuZXcgY29uZmlnLndlYjMuZXRoLkNvbnRyYWN0KGNvbmZpZy5jb250cmFjdHMuUGFuZG9yYS5hYmksIGNvbmZpZy5hZGRyZXNzZXMuUGFuZG9yYSk7XG4gICAgY29uc3Qgam9iQ29udHJvbGxlciA9IGF3YWl0IHBhbi5tZXRob2RzXG4gICAgICAgIC5qb2JDb250cm9sbGVyKClcbiAgICAgICAgLmNhbGwoKTtcblxuICAgIC8vIHNhdmUgZm9yIGxhdGVyIHVzZVxuICAgIGxvY2FsQ2FjaGUuc2V0KCdqb2JDb250cm9sbGVyJywgam9iQ29udHJvbGxlcik7XG4gICAgICAgIFxuICAgIHJldHVybiBqb2JDb250cm9sbGVyO1xufTtcblxuLyoqXG4gKiBHZXQgYWN0aXZlIGpvYnMgY291bnQgXG4gKiBcbiAqIEBwYXJhbSB7T2JqZWN0fSBjb25maWcgTGlicmFyeSBjb25maWcgKHByb3ZpZGVkIGJ5IHRoZSBwcm94eSBidXQgY2FuIGJlIG92ZXJyaWRkZW4pXG4gKiBAcmV0dXJucyB7UHJvbWlzZTx7TnVtYmVyfT59IFxuICovXG5leHBvcnQgY29uc3QgZmV0Y2hBY3RpdmVKb2JzQ291bnQgPSBhc3luYyAoY29uZmlnID0ge30pID0+IHtcblxuICAgIGV4cGVjdC5hbGwoY29uZmlnLCB7XG4gICAgICAgICd3ZWIzJzoge1xuICAgICAgICAgICAgdHlwZTogJ29iamVjdCcsXG4gICAgICAgICAgICBjb2RlOiBXRUIzX1JFUVVJUkVEXG4gICAgICAgIH0sXG4gICAgICAgICdjb250cmFjdHMuQ29nbml0aXZlSm9iQ29udHJvbGxlci5hYmknOiB7XG4gICAgICAgICAgICB0eXBlOiAnb2JqZWN0JyxcbiAgICAgICAgICAgIGNvZGU6IENPTlRSQUNUX1JFUVVJUkVELFxuICAgICAgICAgICAgYXJnczogWydDb2duaXRpdmVKb2JDb250cm9sbGVyJ11cbiAgICAgICAgfVxuICAgIH0pO1xuXG4gICAgbGV0IGpvYkNvbnRyb2xsZXIgPSBsb2NhbENhY2hlLmdldCgnam9iQ29udHJvbGxlcicpO1xuXG4gICAgaWYgKCFqb2JDb250cm9sbGVyKSB7XG5cbiAgICAgICAgam9iQ29udHJvbGxlciA9IGF3YWl0IGZldGNoSm9iQ29udHJvbGxlckFkZHJlc3MoY29uZmlnKTtcbiAgICB9XG5cbiAgICBjb25zdCBqY3RybCA9IG5ldyBjb25maWcud2ViMy5ldGguQ29udHJhY3QoY29uZmlnLmNvbnRyYWN0cy5Db2duaXRpdmVKb2JDb250cm9sbGVyLmFiaSwgam9iQ29udHJvbGxlcik7XG4gICAgY29uc3QgY291bnQgPSBhd2FpdCBqY3RybC5tZXRob2RzXG4gICAgICAgIC5hY3RpdmVKb2JzQ291bnQoKVxuICAgICAgICAuY2FsbCgpO1xuICAgICAgICBcbiAgICByZXR1cm4gTnVtYmVyLnBhcnNlSW50KGNvdW50LCAxMCk7XG59O1xuXG4vKipcbiAqIEdldCBjb21wbGV0ZWQgam9icyBjb3VudCBcbiAqIFxuICogQHBhcmFtIHtPYmplY3R9IGNvbmZpZyBMaWJyYXJ5IGNvbmZpZyAocHJvdmlkZWQgYnkgdGhlIHByb3h5IGJ1dCBjYW4gYmUgb3ZlcnJpZGRlbilcbiAqIEByZXR1cm5zIHtQcm9taXNlPHtOdW1iZXJ9Pn0gXG4gKi9cbmV4cG9ydCBjb25zdCBmZXRjaENvbXBsZXRlZEpvYnNDb3VudCA9IGFzeW5jIChjb25maWcgPSB7fSkgPT4ge1xuXG4gICAgZXhwZWN0LmFsbChjb25maWcsIHtcbiAgICAgICAgJ3dlYjMnOiB7XG4gICAgICAgICAgICB0eXBlOiAnb2JqZWN0JyxcbiAgICAgICAgICAgIGNvZGU6IFdFQjNfUkVRVUlSRURcbiAgICAgICAgfSxcbiAgICAgICAgJ2NvbnRyYWN0cy5Db2duaXRpdmVKb2JDb250cm9sbGVyLmFiaSc6IHtcbiAgICAgICAgICAgIHR5cGU6ICdvYmplY3QnLFxuICAgICAgICAgICAgY29kZTogQ09OVFJBQ1RfUkVRVUlSRUQsXG4gICAgICAgICAgICBhcmdzOiBbJ0NvZ25pdGl2ZUpvYkNvbnRyb2xsZXInXVxuICAgICAgICB9XG4gICAgfSk7XG5cbiAgICBsZXQgam9iQ29udHJvbGxlciA9IGxvY2FsQ2FjaGUuZ2V0KCdqb2JDb250cm9sbGVyJyk7XG5cbiAgICBpZiAoIWpvYkNvbnRyb2xsZXIpIHtcblxuICAgICAgICBqb2JDb250cm9sbGVyID0gYXdhaXQgZmV0Y2hKb2JDb250cm9sbGVyQWRkcmVzcyhjb25maWcpO1xuICAgIH1cblxuICAgIGNvbnN0IGpjdHJsID0gbmV3IGNvbmZpZy53ZWIzLmV0aC5Db250cmFjdChjb25maWcuY29udHJhY3RzLkNvZ25pdGl2ZUpvYkNvbnRyb2xsZXIuYWJpLCBqb2JDb250cm9sbGVyKTtcbiAgICBjb25zdCBjb3VudCA9IGF3YWl0IGpjdHJsLm1ldGhvZHNcbiAgICAgICAgLmNvbXBsZXRlZEpvYnNDb3VudCgpXG4gICAgICAgIC5jYWxsKCk7XG4gICAgICAgIFxuICAgIHJldHVybiBOdW1iZXIucGFyc2VJbnQoY291bnQsIDEwKTtcbn07XG5cbi8qKlxuICogR2V0IGpvYiBzZXJ2aWNlIGluZm8gXG4gKiBcbiAqIEBwYXJhbSB7U3RyaW5nfSBhZGRyZXNzIEpvYiBhZGRyZXNzXG4gKiBAcGFyYW0ge09iamVjdH0gY29uZmlnIExpYnJhcnkgY29uZmlnIChwcm92aWRlZCBieSB0aGUgcHJveHkgYnV0IGNhbiBiZSBvdmVycmlkZGVuKVxuICogQHJldHVybnMge1Byb21pc2U8e051bWJlcn0+fSBcbiAqL1xuZXhwb3J0IGNvbnN0IGZldGNoU2VydmljZUluZm8gPSBhc3luYyAoYWRkcmVzcywgY29uZmlnID0ge30pID0+IHtcblxuICAgIGV4cGVjdC5hbGwoY29uZmlnLCB7XG4gICAgICAgICd3ZWIzJzoge1xuICAgICAgICAgICAgdHlwZTogJ29iamVjdCcsXG4gICAgICAgICAgICBjb2RlOiBXRUIzX1JFUVVJUkVEXG4gICAgICAgIH0sXG4gICAgICAgICdjb250cmFjdHMuQ29nbml0aXZlSm9iQ29udHJvbGxlci5hYmknOiB7XG4gICAgICAgICAgICB0eXBlOiAnb2JqZWN0JyxcbiAgICAgICAgICAgIGNvZGU6IENPTlRSQUNUX1JFUVVJUkVELFxuICAgICAgICAgICAgYXJnczogWydDb2duaXRpdmVKb2JDb250cm9sbGVyJ11cbiAgICAgICAgfVxuICAgIH0pO1xuXG4gICAgbGV0IGpvYkNvbnRyb2xsZXIgPSBsb2NhbENhY2hlLmdldCgnam9iQ29udHJvbGxlcicpO1xuXG4gICAgaWYgKCFqb2JDb250cm9sbGVyKSB7XG5cbiAgICAgICAgam9iQ29udHJvbGxlciA9IGF3YWl0IGZldGNoSm9iQ29udHJvbGxlckFkZHJlc3MoY29uZmlnKTtcbiAgICB9XG5cbiAgICBjb25zdCBqY3RybCA9IG5ldyBjb25maWcud2ViMy5ldGguQ29udHJhY3QoY29uZmlnLmNvbnRyYWN0cy5Db2duaXRpdmVKb2JDb250cm9sbGVyLmFiaSwgam9iQ29udHJvbGxlcik7XG5cbiAgICBjb25zdCB7IHJlc3BvbnNlVGltZXN0YW1wcywgcmVzcG9uc2VGbGFncyB9ID0gYXdhaXQgamN0cmwubWV0aG9kc1xuICAgICAgICAuZ2V0Q29nbml0aXZlSm9iU2VydmljZUluZm8oYWRkcmVzcylcbiAgICAgICAgLmNhbGwoKTtcblxuICAgIHJldHVybiB7IFxuICAgICAgICByZXNwb25zZVRpbWVzdGFtcHMsIFxuICAgICAgICByZXNwb25zZUZsYWdzIFxuICAgIH07XG59O1xuXG4vKipcbiAqIEdldCBqb2IgZGV0YWlscyBcbiAqIFxuICogQHBhcmFtIHtTdHJpbmd9IGFkZHJlc3MgSm9iIGFkZHJlc3NcbiAqIEBwYXJhbSB7T2JqZWN0fSBjb25maWcgTGlicmFyeSBjb25maWcgKHByb3ZpZGVkIGJ5IHRoZSBwcm94eSBidXQgY2FuIGJlIG92ZXJyaWRkZW4pXG4gKiBAcmV0dXJucyB7UHJvbWlzZTx7TnVtYmVyfT59IFxuICovXG5leHBvcnQgY29uc3QgZmV0Y2hKb2JEZXRhaWxzID0gYXN5bmMgKGFkZHJlc3MsIGNvbmZpZyA9IHt9KSA9PiB7XG5cbiAgICBleHBlY3QuYWxsKGNvbmZpZywge1xuICAgICAgICAnd2ViMyc6IHtcbiAgICAgICAgICAgIHR5cGU6ICdvYmplY3QnLFxuICAgICAgICAgICAgY29kZTogV0VCM19SRVFVSVJFRFxuICAgICAgICB9LFxuICAgICAgICAnY29udHJhY3RzLkNvZ25pdGl2ZUpvYkNvbnRyb2xsZXIuYWJpJzoge1xuICAgICAgICAgICAgdHlwZTogJ29iamVjdCcsXG4gICAgICAgICAgICBjb2RlOiBDT05UUkFDVF9SRVFVSVJFRCxcbiAgICAgICAgICAgIGFyZ3M6IFsnQ29nbml0aXZlSm9iQ29udHJvbGxlciddXG4gICAgICAgIH1cbiAgICB9KTtcblxuICAgIGxldCBqb2JDb250cm9sbGVyID0gbG9jYWxDYWNoZS5nZXQoJ2pvYkNvbnRyb2xsZXInKTtcblxuICAgIGlmICgham9iQ29udHJvbGxlcikge1xuXG4gICAgICAgIGpvYkNvbnRyb2xsZXIgPSBhd2FpdCBmZXRjaEpvYkNvbnRyb2xsZXJBZGRyZXNzKGNvbmZpZyk7XG4gICAgfVxuXG4gICAgY29uc3QgamN0cmwgPSBuZXcgY29uZmlnLndlYjMuZXRoLkNvbnRyYWN0KGNvbmZpZy5jb250cmFjdHMuQ29nbml0aXZlSm9iQ29udHJvbGxlci5hYmksIGpvYkNvbnRyb2xsZXIpO1xuICAgIFxuICAgIGNvbnN0IHsga2VybmVsLCBkYXRhc2V0LCBjb21wbGV4aXR5LCBkZXNjcmlwdGlvbiwgYWN0aXZlV29ya2Vycywgc3RhdGUgfSA9IGF3YWl0IGpjdHJsLm1ldGhvZHNcbiAgICAgICAgLmdldENvZ25pdGl2ZUpvYkRldGFpbHMoYWRkcmVzcylcbiAgICAgICAgLmNhbGwoKTtcbiAgICBjb25zdCBrZXJuZWxJcGZzID0gYXdhaXQgZmV0Y2hJcGZzQWRkcmVzc0J5S2VybmVsQWRkcmVzcyhrZXJuZWwsIGNvbmZpZyk7XG4gICAgY29uc3QgZGF0YXNldElwZnMgPSBhd2FpdCBmZXRjaElwZnNBZGRyZXNzQnlEYXRhc2V0QWRkcmVzcyhkYXRhc2V0LCBjb25maWcpO1xuICAgIGNvbnN0IGlwZnNSZXN1bHRzID0gYXdhaXQgUHJvbWlzZS5hbGwoYWN0aXZlV29ya2Vycy5tYXAoKF8sIGluZGV4KSA9PiBqY3RybC5tZXRob2RzLmdldENvZ25pdGl2ZUpvYlJlc3VsdHMoYWRkcmVzcywgaW5kZXgpLmNhbGwoKSkpOyAgICBcbiAgICBjb25zdCB1dGY4ZGVzY3JpcHRpb24gPSBkZXNjcmlwdGlvbiA/IGNvbmZpZy53ZWIzLnV0aWxzLmhleFRvVXRmOChkZXNjcmlwdGlvbikgOiAnJztcbiAgICBjb25zdCBzZXJ2aWNlSW5mbyA9IGF3YWl0IGZldGNoU2VydmljZUluZm8oYWRkcmVzcywgY29uZmlnKTtcblxuICAgIGNvbnN0IHByb2dyZXNzID0gTWF0aC5jZWlsKGF3YWl0IGlwZnNSZXN1bHRzLnJlZHVjZShhc3luYyAocHJvZ3Jlc3NQcm9taXNlLCByZXN1bHQsIGluZGV4KSA9PiB7XG4gICAgICAgIGNvbnN0IGNvbW1vblByb2dyZXNzID0gYXdhaXQgcHJvZ3Jlc3NQcm9taXNlO1xuICAgICAgICBsZXQgcGFydFByb2dyZXNzID0gMTAwIC8gaXBmc1Jlc3VsdHMubGVuZ3RoO1xuXG4gICAgICAgIGlmICghcmVzdWx0KSB7XG5cbiAgICAgICAgICAgIC8vIElmIHJlc3VsdCBub3QgYmVlbiBwcm92aWRlZCBieSB0aGUgd29ya2VyIFxuICAgICAgICAgICAgLy8gdGhlbiB3ZSBmZXRjaGluZyBwcm9ncmVzcyB2YWx1ZSBmcm9tIGl0cyBjb250cmFjdFxuICAgICAgICAgICAgcGFydFByb2dyZXNzID0gYXdhaXQgZmV0Y2hXb3JrZXJzQWN0aXZlSm9iUHJvZ3Jlc3MoYWN0aXZlV29ya2Vyc1tpbmRleF0sIGNvbmZpZyk7XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gY29tbW9uUHJvZ3Jlc3MgKyBwYXJ0UHJvZ3Jlc3M7XG4gICAgfSwgUHJvbWlzZS5yZXNvbHZlKDApKSk7XG5cbiAgICByZXR1cm4ge1xuICAgICAgICBhZGRyZXNzLCBcbiAgICAgICAga2VybmVsLFxuICAgICAgICBrZXJuZWxJcGZzLFxuICAgICAgICBkYXRhc2V0LFxuICAgICAgICBkYXRhc2V0SXBmcyxcbiAgICAgICAgYWN0aXZlV29ya2VycyxcbiAgICAgICAgaXBmc1Jlc3VsdHM6IGlwZnNSZXN1bHRzLm1hcChyZXN1bHQgPT4gcmVzdWx0ID8gY29uZmlnLndlYjMudXRpbHMuaGV4VG9VdGY4KHJlc3VsdCkgOiByZXN1bHQpLmZpbHRlcihyZXMgPT4gcmVzKSxcbiAgICAgICAgY29tcGxleGl0eTogTnVtYmVyKGNvbXBsZXhpdHkpLFxuICAgICAgICBwcm9ncmVzczogcHJvZ3Jlc3MgPiAxMDAgPyAxMDAgOiBwcm9ncmVzcyxcbiAgICAgICAgc3RhdGU6IE51bWJlcihzdGF0ZSksXG4gICAgICAgIGRlc2NyaXB0aW9uOiB1dGY4ZGVzY3JpcHRpb24uc3Vic3RyKDIpLFxuICAgICAgICBqb2JUeXBlOiB1dGY4ZGVzY3JpcHRpb24uc3Vic3RyKDAsIDEpLFxuICAgICAgICBzZXJ2aWNlSW5mb1xuICAgIH07XG59O1xuXG4vKipcbiAqIEdldCBqb2JzIElkIGZyb20gdGhlIFwic291cmNlXCJcbiAqIFxuICogQHBhcmFtIHtTdHJpbmd9IGZyb20gc291cmNlIGFjdGl2ZUpvYnMgb3IgY29tcGxldGVkSm9ic1xuICogQHBhcmFtIHtOdW1iZXJ9IGNvdW50XG4gKiBAcGFyYW0ge09iamVjdH0gb3B0aW9uc1xuICogQHJldHVybnMge1Byb21pc2U8e1N0cmluZ1tdfT59IFxuICovXG5leHBvcnQgY29uc3QgZmV0Y2hKb2JzSWRzID0gYXN5bmMgKHNvdXJjZSwgY291bnQgPSAwLCBjb25maWcgPSB7fSkgPT4ge1xuXG4gICAgZXhwZWN0LmFsbCh7IHNvdXJjZSB9LCB7XG4gICAgICAgICdzb3VyY2UnOiB7XG4gICAgICAgICAgICB0eXBlOiAnZW51bScsXG4gICAgICAgICAgICB2YWx1ZXM6IFsnYWN0aXZlSm9icycsICdjb21wbGV0ZWRKb2JzJ11cbiAgICAgICAgfVxuICAgIH0pO1xuXG4gICAgZXhwZWN0LmFsbChjb25maWcsIHtcbiAgICAgICAgJ3dlYjMnOiB7XG4gICAgICAgICAgICB0eXBlOiAnb2JqZWN0JyxcbiAgICAgICAgICAgIGNvZGU6IFdFQjNfUkVRVUlSRURcbiAgICAgICAgfSxcbiAgICAgICAgJ2NvbnRyYWN0cy5Db2duaXRpdmVKb2JDb250cm9sbGVyLmFiaSc6IHtcbiAgICAgICAgICAgIHR5cGU6ICdvYmplY3QnLFxuICAgICAgICAgICAgY29kZTogQ09OVFJBQ1RfUkVRVUlSRUQsXG4gICAgICAgICAgICBhcmdzOiBbJ0NvZ25pdGl2ZUpvYkNvbnRyb2xsZXInXVxuICAgICAgICB9XG4gICAgfSk7ICAgIFxuXG4gICAgbGV0IGpvYkNvbnRyb2xsZXIgPSBsb2NhbENhY2hlLmdldCgnam9iQ29udHJvbGxlcicpO1xuXG4gICAgaWYgKCFqb2JDb250cm9sbGVyKSB7XG5cbiAgICAgICAgam9iQ29udHJvbGxlciA9IGF3YWl0IGZldGNoSm9iQ29udHJvbGxlckFkZHJlc3MoY29uZmlnKTtcbiAgICB9XG5cbiAgICAvLyBudW1iZXJzIHNlcXVlbmNlIGZyb20gMCB0byBjb3VudFxuICAgIGNvbnN0IGNvdW50cyA9IFsuLi5BcnJheShjb3VudCkua2V5cygpXTtcblxuICAgIGNvbnN0IGpjdHJsID0gbmV3IGNvbmZpZy53ZWIzLmV0aC5Db250cmFjdChjb25maWcuY29udHJhY3RzLkNvZ25pdGl2ZUpvYkNvbnRyb2xsZXIuYWJpLCBqb2JDb250cm9sbGVyKTtcbiAgICBjb25zdCBhZGRyZXNzZXMgPSBhd2FpdCBQcm9taXNlLmFsbChjb3VudHMubWFwKGluZGV4ID0+IGpjdHJsLm1ldGhvZHMuZ2V0Sm9iSWQoaW5kZXgsIHNvdXJjZSA9PT0gJ2FjdGl2ZUpvYnMnKS5jYWxsKCkpKTtcbiAgICAgICAgXG4gICAgcmV0dXJuIGFkZHJlc3Nlcztcbn07XG5cbi8qKlxuICogR2V0IGFsbCBqb2JzXG4gKiBcbiAqIEBwYXJhbSB7T2JqZWN0fSBjb25maWcgTGlicmFyeSBjb25maWcgKHByb3ZpZGVkIGJ5IHRoZSBwcm94eSBidXQgY2FuIGJlIG92ZXJyaWRkZW4pXG4gKiBAcmV0dXJucyB7UHJvbWlzZX0gQSBQcm9taXNlIG9iamVjdCByZXByZXNlbnRzIHRoZSB7T2JqZWN0W119IFxuICovXG5leHBvcnQgY29uc3QgZmV0Y2hBbGwgPSBhc3luYyAoY29uZmlnID0ge30pID0+IHtcbiAgICBsZXQgcmVjb3JkcyA9IFtdO1xuICAgIGxldCBlcnJvciA9IFtdO1xuXG4gICAgdHJ5IHtcblxuICAgICAgICBjb25zdCBbXG4gICAgICAgICAgICBhY3RpdmVDb3VudCxcbiAgICAgICAgICAgIGNvbXBsZXRlZENvdW50XG4gICAgICAgIF0gPSBhd2FpdCBQcm9taXNlLmFsbChbXG4gICAgICAgICAgICBmZXRjaEFjdGl2ZUpvYnNDb3VudChjb25maWcpLFxuICAgICAgICAgICAgZmV0Y2hDb21wbGV0ZWRKb2JzQ291bnQoY29uZmlnKVxuICAgICAgICBdKTtcblxuICAgICAgICBjb25zdCBbXG4gICAgICAgICAgICBhY3RpdmVKb2JzSWRzLFxuICAgICAgICAgICAgY29tcGxldGVkSm9ic0lkc1xuICAgICAgICBdID0gYXdhaXQgUHJvbWlzZS5hbGwoW1xuICAgICAgICAgICAgZmV0Y2hKb2JzSWRzKCdhY3RpdmVKb2JzJywgYWN0aXZlQ291bnQsIGNvbmZpZyksXG4gICAgICAgICAgICBmZXRjaEpvYnNJZHMoJ2NvbXBsZXRlZEpvYnMnLCBjb21wbGV0ZWRDb3VudCwgY29uZmlnKVxuICAgICAgICBdKTtcblxuICAgICAgICBjb25zdCBhbGxKb2JzSWRzID0gW1xuICAgICAgICAgICAgLi4uYWN0aXZlSm9ic0lkcyxcbiAgICAgICAgICAgIC4uLmNvbXBsZXRlZEpvYnNJZHNcbiAgICAgICAgXTtcblxuICAgICAgICByZWNvcmRzID0gYXdhaXQgUHJvbWlzZS5hbGwoYWxsSm9ic0lkcy5tYXAoam9iSWQgPT4gZmV0Y2hKb2JEZXRhaWxzKGpvYklkLCBjb25maWcpKSk7XG4gICAgICAgIFxuICAgIH0gY2F0Y2goZXJyKSB7XG4gICAgICAgIGVycm9yLnB1c2goe1xuICAgICAgICAgICAgZXJyb3I6IGVyci5tZXNzYWdlXG4gICAgICAgIH0pO1xuICAgIH0gICBcblxuICAgIHJldHVybiB7XG4gICAgICAgIHJlY29yZHMsXG4gICAgICAgIGVycm9yXG4gICAgfTtcbn07XG5cbi8qKlxuICogQ3JlYXRlIGNvZ25pdGl2ZSBqb2IgY29udHJhY3RcbiAqIFxuICogQHBhcmFtIHtPYmplY3R9IG9wdGlvbnNcbiAqIEBwYXJhbSB7U3RyaW5nfSBmcm9tIFB1Ymxpc2hlciBhZGRyZXNzXG4gKiBAcGFyYW0ge09iamVjdH0gY29uZmlnIExpYnJhcnkgY29uZmlnIChwcm92aWRlZCBieSB0aGUgcHJveHkgYnV0IGNhbiBiZSBvdmVycmlkZGVuKVxuICogQHJldHVybnMge1Byb21pc2V9IFByb21pc2Ugb2JqZWN0IHJlc29sdmVkIHRvIGFkZCBzdGF0dXMgKGJvb2xlYW4pXG4gKi9cbmV4cG9ydCBjb25zdCBjcmVhdGUgPSAoe2tlcm5lbCwgZGF0YXNldCwgY29tcGxleGl0eSwgam9iVHlwZSwgZGVzY3JpcHRpb24sIGRlcG9zaXR9LCBmcm9tLCBjb25maWcgPSB7fSkgPT4gbmV3IFByb21pc2UoYXN5bmMgKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuXG4gICAgZXhwZWN0LmFsbCh7IGtlcm5lbCwgZGF0YXNldCwgY29tcGxleGl0eSwgam9iVHlwZSwgZGVzY3JpcHRpb24sIGRlcG9zaXQsIGZyb20gfSwge1xuICAgICAgICAna2VybmVsJzoge1xuICAgICAgICAgICAgdHlwZTogJ2FkZHJlc3MnXG4gICAgICAgIH0sXG4gICAgICAgICdkYXRhc2V0Jzoge1xuICAgICAgICAgICAgdHlwZTogJ2FkZHJlc3MnXG4gICAgICAgIH0sXG4gICAgICAgICdjb21wbGV4aXR5Jzoge1xuICAgICAgICAgICAgdHlwZTogJ251bWJlcidcbiAgICAgICAgfSxcbiAgICAgICAgJ2pvYlR5cGUnOiB7XG4gICAgICAgICAgICB0eXBlOiAnc3RyaW5nJ1xuICAgICAgICB9LFxuICAgICAgICAnZGVzY3JpcHRpb24nOiB7XG4gICAgICAgICAgICB0eXBlOiAnc3RyaW5nJ1xuICAgICAgICB9LFxuICAgICAgICAnZGVwb3NpdCc6IHtcbiAgICAgICAgICAgIHR5cGU6ICdudW1iZXInXG4gICAgICAgIH0sXG4gICAgICAgICdmcm9tJzoge1xuICAgICAgICAgICAgdHlwZTogJ2FkZHJlc3MnXG4gICAgICAgIH1cbiAgICB9KTtcblxuICAgIGV4cGVjdC5hbGwoY29uZmlnLCB7XG4gICAgICAgICd3ZWIzJzoge1xuICAgICAgICAgICAgdHlwZTogJ29iamVjdCcsXG4gICAgICAgICAgICBjb2RlOiBXRUIzX1JFUVVJUkVEXG4gICAgICAgIH0sXG4gICAgICAgICdjb250cmFjdHMuUGFuZG9yYS5hYmknOiB7XG4gICAgICAgICAgICB0eXBlOiAnb2JqZWN0JyxcbiAgICAgICAgICAgIGNvZGU6IENPTlRSQUNUX1JFUVVJUkVELFxuICAgICAgICAgICAgYXJnczogWydQYW5kb3JhJ11cbiAgICAgICAgfSxcbiAgICAgICAgJ2FkZHJlc3Nlcy5QYW5kb3JhJzoge1xuICAgICAgICAgICAgdHlwZTogJ2FkZHJlc3MnLFxuICAgICAgICAgICAgY29kZTogQUREUkVTU19SRVFVSVJFRCxcbiAgICAgICAgICAgIGFyZ3M6IFsnUGFuZG9yYSddXG4gICAgICAgIH1cbiAgICB9KTtcblxuICAgIGNvbnN0IHBhbiA9IG5ldyBjb25maWcud2ViMy5ldGguQ29udHJhY3QoY29uZmlnLmNvbnRyYWN0cy5QYW5kb3JhLmFiaSwgY29uZmlnLmFkZHJlc3Nlcy5QYW5kb3JhKTtcbiAgICBjb25zdCBnYXNQcmljZSA9IGF3YWl0IGNvbmZpZy53ZWIzLmV0aC5nZXRHYXNQcmljZSgpO1xuICAgIHBhbi5tZXRob2RzXG4gICAgICAgIC5jcmVhdGVDb2duaXRpdmVKb2Ioa2VybmVsLCBkYXRhc2V0LCBjb21wbGV4aXR5LCBjb25maWcud2ViMy51dGlscy51dGY4VG9IZXgoYCR7am9iVHlwZX07JHtkZXNjcmlwdGlvbi50cmltKCl9YCkpXG4gICAgICAgIC5zZW5kKHtcbiAgICAgICAgICAgIHZhbHVlOiBjb25maWcud2ViMy51dGlscy50b1dlaShTdHJpbmcoZGVwb3NpdCkpLFxuICAgICAgICAgICAgZnJvbSxcbiAgICAgICAgICAgIGdhc1ByaWNlLFxuICAgICAgICAgICAgZ2FzOiA2NzAwMDAwLy8gYmVjYXVzZSB0aGlzIHdvcmtmbG93IGlzIHRvbyBncmVlZHlcbiAgICAgICAgfSlcbiAgICAgICAgLm9uKCdlcnJvcicsIHJlamVjdClcbiAgICAgICAgLm9uKCdyZWNlaXB0JywgcmVjZWlwdCA9PiB7XG5cbiAgICAgICAgICAgIHRyeSB7XG5cbiAgICAgICAgICAgICAgICBpZiAoTnVtYmVyKHJlY2VpcHQuc3RhdHVzKSA9PT0gMCkge1xuXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiByZWplY3QocGpzRXJyb3IoVFJBTlNBQ1RJT05fVU5TVUNDRVNTRlVMKSk7XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgaWYgKHJlY2VpcHQuZXZlbnRzLkNvZ25pdGl2ZUpvYlF1ZXVlZCkge1xuICAgIFxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gcmVzb2x2ZShyZWNlaXB0LmV2ZW50cy5Db2duaXRpdmVKb2JRdWV1ZWQucmV0dXJuVmFsdWVzLmpvYklkKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgXG4gICAgICAgICAgICAgICAgcmVzb2x2ZShyZWNlaXB0LmV2ZW50cy5Db2duaXRpdmVKb2JDcmVhdGVkLnJldHVyblZhbHVlcy5qb2JJZCk7XG4gICAgICAgICAgICB9IGNhdGNoIChlcnIpIHtcbiAgICAgICAgICAgICAgICByZWplY3QoZXJyKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG59KTtcblxuLyoqXG4gKiBIYW5kbGUgZXZlbnQgQ29nbml0aXZlSm9iQ3JlYXRlZFxuICogXG4gKiBAcGFyYW0ge09iamVjdH0gb3B0aW9ucyBFdmVudCBoYW5kbGVyIG9wdGlvbnNcbiAqIEBwYXJhbSB7T2JqZWN0fSBjb25maWcgTGlicmFyeSBjb25maWcgKHByb3ZpZGVkIGJ5IHRoZSBwcm94eSBidXQgY2FuIGJlIG92ZXJyaWRkZW4pXG4gKiBAcmV0dXJucyB7UHJvbWlzZTx7T2JqZWN0fT59IFBQcm9taXNlIG9iamVjdCByZXNvbHZlZCB0byB0aGUgb2JqZWN0IHdpdGggY2hhaW5lZCBjYWxsYmFja3MgI2RhdGEgYW5kICNlcnJvclxuICovXG5leHBvcnQgY29uc3QgZXZlbnRDb2duaXRpdmVKb2JDcmVhdGVkID0gYXN5bmMgKG9wdGlvbnMgPSB7fSwgY29uZmlnID0ge30pID0+IHtcblxuICAgIGV4cGVjdC5hbGwoeyBvcHRpb25zIH0sIHtcbiAgICAgICAgJ29wdGlvbnMnOiB7XG4gICAgICAgICAgICB0eXBlOiAnb2JqZWN0J1xuICAgICAgICB9XG4gICAgfSk7XG5cbiAgICBleHBlY3QuYWxsKGNvbmZpZywge1xuICAgICAgICAnd2ViMyc6IHtcbiAgICAgICAgICAgIHR5cGU6ICdvYmplY3QnLFxuICAgICAgICAgICAgY29kZTogV0VCM19SRVFVSVJFRFxuICAgICAgICB9LFxuICAgICAgICAnY29udHJhY3RzLlBhbmRvcmEuYWJpJzoge1xuICAgICAgICAgICAgdHlwZTogJ29iamVjdCcsXG4gICAgICAgICAgICBjb2RlOiBDT05UUkFDVF9SRVFVSVJFRCxcbiAgICAgICAgICAgIGFyZ3M6IFsnUGFuZG9yYSddXG4gICAgICAgIH0sXG4gICAgICAgICdhZGRyZXNzZXMuUGFuZG9yYSc6IHtcbiAgICAgICAgICAgIHR5cGU6ICdhZGRyZXNzJyxcbiAgICAgICAgICAgIGNvZGU6IEFERFJFU1NfUkVRVUlSRUQsXG4gICAgICAgICAgICBhcmdzOiBbJ1BhbmRvcmEnXVxuICAgICAgICB9XG4gICAgfSk7XG5cbiAgICBjb25zdCBjYWxsYmFja3MgPSB7XG4gICAgICAgIG9uRGF0YTogKCkgPT4ge30sXG4gICAgICAgIG9uRXJyb3I6ICgpID0+IHt9XG4gICAgfTtcblxuICAgIGNvbnN0IGNoYWluID0ge1xuICAgICAgICBkYXRhOiAoY2IgPSAoKSA9PiB7fSkgPT4ge1xuICAgICAgICAgICAgY2FsbGJhY2tzLm9uRGF0YSA9IGNiO1xuICAgICAgICAgICAgcmV0dXJuIGNoYWluO1xuICAgICAgICB9LFxuICAgICAgICBlcnJvcjogKGNiID0gKCkgPT4ge30pID0+IHtcbiAgICAgICAgICAgIGNhbGxiYWNrcy5vbkVycm9yID0gY2I7XG4gICAgICAgICAgICByZXR1cm4gY2hhaW47XG4gICAgICAgIH1cbiAgICB9O1xuXG4gICAgY29uc3QgcGFuID0gbmV3IGNvbmZpZy53ZWIzLmV0aC5Db250cmFjdChjb25maWcuY29udHJhY3RzLlBhbmRvcmEuYWJpLCBjb25maWcuYWRkcmVzc2VzLlBhbmRvcmEpO1xuICAgIGNoYWluLmV2ZW50ID0gW107XG4gICAgY2hhaW4uZXZlbnRbMF0gPSBwYW4uZXZlbnRzLkNvZ25pdGl2ZUpvYkNyZWF0ZWQob3B0aW9ucylcbiAgICAgICAgLm9uKCdkYXRhJywgYXN5bmMgKGV2ZW50KSA9PiB7XG5cbiAgICAgICAgICAgIHRyeSB7XG5cbiAgICAgICAgICAgICAgICBjb25zdCBqb2JEZXRhaWxzID0gYXdhaXQgZmV0Y2hKb2JEZXRhaWxzKGV2ZW50LnJldHVyblZhbHVlcy5qb2JJZCwgY29uZmlnKTtcbiAgICAgICAgICAgICAgICBjYWxsYmFja3Mub25EYXRhKHtcbiAgICAgICAgICAgICAgICAgICAgcmVjb3JkczogW2pvYkRldGFpbHNdLFxuICAgICAgICAgICAgICAgICAgICBldmVudFxuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfSBjYXRjaChlcnIpIHtcbiAgICAgICAgICAgICAgICBjYWxsYmFja3Mub25FcnJvcihlcnIpO1xuICAgICAgICAgICAgfSAgICAgICAgICAgIFxuICAgICAgICB9KVxuICAgICAgICAub24oJ2Vycm9yJywgY2FsbGJhY2tzLm9uRXJyb3IpO1xuICAgIGNoYWluLmV2ZW50WzBdLm5hbWUgPSAnQ29nbml0aXZlSm9iQ3JlYXRlZCc7XG5cbiAgICByZXR1cm4gY2hhaW47XG59O1xuXG4vKipcbiAqIEhhbmRsZSBldmVudCBKb2JTdGF0ZUNoYW5nZWRcbiAqIFxuICogQHBhcmFtIHtPYmplY3R9IG9wdGlvbnMgRXZlbnQgaGFuZGxlciBvcHRpb25zXG4gKiBAcGFyYW0ge09iamVjdH0gY29uZmlnIExpYnJhcnkgY29uZmlnIChwcm92aWRlZCBieSB0aGUgcHJveHkgYnV0IGNhbiBiZSBvdmVycmlkZGVuKVxuICogQHJldHVybnMge1Byb21pc2U8e09iamVjdH0+fSBQUHJvbWlzZSBvYmplY3QgcmVzb2x2ZWQgdG8gdGhlIG9iamVjdCB3aXRoIGNoYWluZWQgY2FsbGJhY2tzICNkYXRhIGFuZCAjZXJyb3JcbiAqL1xuZXhwb3J0IGNvbnN0IGV2ZW50Sm9iU3RhdGVDaGFuZ2VkID0gYXN5bmMgKG9wdGlvbnMgPSB7fSwgY29uZmlnID0ge30pID0+IHtcblxuICAgIGV4cGVjdC5hbGwoeyBvcHRpb25zIH0sIHtcbiAgICAgICAgJ29wdGlvbnMnOiB7XG4gICAgICAgICAgICB0eXBlOiAnb2JqZWN0J1xuICAgICAgICB9XG4gICAgfSk7XG5cbiAgICBleHBlY3QuYWxsKGNvbmZpZywge1xuICAgICAgICAnd2ViMyc6IHtcbiAgICAgICAgICAgIHR5cGU6ICdvYmplY3QnLFxuICAgICAgICAgICAgY29kZTogV0VCM19SRVFVSVJFRFxuICAgICAgICB9LFxuICAgICAgICAnY29udHJhY3RzLlBhbmRvcmEuYWJpJzoge1xuICAgICAgICAgICAgdHlwZTogJ29iamVjdCcsXG4gICAgICAgICAgICBjb2RlOiBDT05UUkFDVF9SRVFVSVJFRCxcbiAgICAgICAgICAgIGFyZ3M6IFsnUGFuZG9yYSddXG4gICAgICAgIH0sXG4gICAgICAgICdhZGRyZXNzZXMuUGFuZG9yYSc6IHtcbiAgICAgICAgICAgIHR5cGU6ICdhZGRyZXNzJyxcbiAgICAgICAgICAgIGNvZGU6IEFERFJFU1NfUkVRVUlSRUQsXG4gICAgICAgICAgICBhcmdzOiBbJ1BhbmRvcmEnXVxuICAgICAgICB9XG4gICAgfSk7XG5cbiAgICBjb25zdCBjYWxsYmFja3MgPSB7XG4gICAgICAgIG9uRGF0YTogKCkgPT4ge30sXG4gICAgICAgIG9uRXJyb3I6ICgpID0+IHt9XG4gICAgfTtcblxuICAgIGNvbnN0IGNoYWluID0ge1xuICAgICAgICBkYXRhOiAoY2IgPSAoKSA9PiB7fSkgPT4ge1xuICAgICAgICAgICAgY2FsbGJhY2tzLm9uRGF0YSA9IGNiO1xuICAgICAgICAgICAgcmV0dXJuIGNoYWluO1xuICAgICAgICB9LFxuICAgICAgICBlcnJvcjogKGNiID0gKCkgPT4ge30pID0+IHtcbiAgICAgICAgICAgIGNhbGxiYWNrcy5vbkVycm9yID0gY2I7XG4gICAgICAgICAgICByZXR1cm4gY2hhaW47XG4gICAgICAgIH1cbiAgICB9O1xuXG4gICAgY29uc3QgZXZlbnRIYW5kbGVyID0gYXN5bmMgZXZlbnQgPT4ge1xuICAgIFxuICAgICAgICB0cnkge1xuXG4gICAgICAgICAgICBjb25zdCBqb2JEZXRhaWxzID0gYXdhaXQgZmV0Y2hKb2JEZXRhaWxzKGV2ZW50LnJldHVyblZhbHVlcy5qb2JJZCwgY29uZmlnKTtcbiAgICAgICAgICAgIGNhbGxiYWNrcy5vbkRhdGEoe1xuICAgICAgICAgICAgICAgIHJlY29yZHM6IFtqb2JEZXRhaWxzXSxcbiAgICAgICAgICAgICAgICBldmVudFxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH0gY2F0Y2goZXJyKSB7XG4gICAgICAgICAgICBjYWxsYmFja3Mub25FcnJvcihlcnIpO1xuICAgICAgICB9ICAgICAgICAgICAgXG4gICAgfTtcblxuICAgIGxldCBqb2JDb250cm9sbGVyID0gbG9jYWxDYWNoZS5nZXQoJ2pvYkNvbnRyb2xsZXInKTtcblxuICAgIGlmICgham9iQ29udHJvbGxlcikge1xuXG4gICAgICAgIGpvYkNvbnRyb2xsZXIgPSBhd2FpdCBmZXRjaEpvYkNvbnRyb2xsZXJBZGRyZXNzKGNvbmZpZyk7XG4gICAgfVxuXG4gICAgY29uc3QgamN0cmwgPSBuZXcgY29uZmlnLndlYjMuZXRoLkNvbnRyYWN0KGNvbmZpZy5jb250cmFjdHMuQ29nbml0aXZlSm9iQ29udHJvbGxlci5hYmksIGpvYkNvbnRyb2xsZXIpO1xuICAgIFxuICAgIC8vIFdlIGxpc3RlbiBmb3IgdHdvIGV2ZW50cyBiZWNhdXNlIG9mIHRoZWlyIG5hdHVyZSBtZWFucyBhbG1vc3QgdGhlIHNhbWVcbiAgICBjaGFpbi5ldmVudCA9IFtdOyAgICBcbiAgICBjaGFpbi5ldmVudC5wdXNoKGpjdHJsLmV2ZW50cy5Kb2JTdGF0ZUNoYW5nZWQob3B0aW9ucylcbiAgICAgICAgLm9uKCdkYXRhJywgZXZlbnRIYW5kbGVyKVxuICAgICAgICAub24oJ2Vycm9yJywgY2FsbGJhY2tzLm9uRXJyb3IpKTtcbiAgICBjaGFpbi5ldmVudFswXS5uYW1lID0gJ0pvYlN0YXRlQ2hhbmdlZCc7XG5cbiAgICBjaGFpbi5ldmVudC5wdXNoKGpjdHJsLmV2ZW50cy5Db2duaXRpb25Qcm9ncmVzc2VkKG9wdGlvbnMpXG4gICAgICAgIC5vbignZGF0YScsIGV2ZW50SGFuZGxlcilcbiAgICAgICAgLm9uKCdlcnJvcicsIGNhbGxiYWNrcy5vbkVycm9yKSk7XG4gICAgY2hhaW4uZXZlbnRbMV0ubmFtZSA9ICdDb2duaXRpb25Qcm9ncmVzc2VkJztcblxuICAgIHJldHVybiBjaGFpbjtcbn07XG4iXX0=