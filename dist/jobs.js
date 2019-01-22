/**
 * Cognitive Jobs related methods
 * This file it is a part of the Pandora Pyrrha Javascript library
 * 
 * @file jobs.js
 * @author Kostiantyn Smyrnov <kostysh@gmail.com>
 * @date 2018
 */
'use strict';

require("core-js/modules/es6.object.define-property");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.eventJobStateChanged = exports.eventCognitiveJobCreated = exports.create = exports.fetchAll = exports.fetchJobsIds = exports.fetchJobDetails = exports.fetchServiceInfo = exports.fetchCompletedJobsCount = exports.fetchActiveJobsCount = exports.fetchJobControllerAddress = void 0;

require("core-js/modules/es6.array.from");

require("core-js/modules/es6.regexp.to-string");

require("core-js/modules/es6.date.to-string");

require("core-js/modules/es7.symbol.async-iterator");

require("core-js/modules/es6.symbol");

require("core-js/modules/es6.array.is-array");

require("core-js/modules/es6.string.trim");

require("core-js/modules/es6.array.filter");

require("core-js/modules/es6.array.reduce");

require("core-js/modules/es6.array.map");

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9qb2JzLmpzIl0sIm5hbWVzIjpbImxvY2FsQ2FjaGUiLCJNYXAiLCJmZXRjaEpvYkNvbnRyb2xsZXJBZGRyZXNzIiwiY29uZmlnIiwiZXhwZWN0IiwiYWxsIiwidHlwZSIsImNvZGUiLCJXRUIzX1JFUVVJUkVEIiwiQUREUkVTU19SRVFVSVJFRCIsImFyZ3MiLCJDT05UUkFDVF9SRVFVSVJFRCIsInBhbiIsIndlYjMiLCJldGgiLCJDb250cmFjdCIsImNvbnRyYWN0cyIsIlBhbmRvcmEiLCJhYmkiLCJhZGRyZXNzZXMiLCJtZXRob2RzIiwiam9iQ29udHJvbGxlciIsImNhbGwiLCJzZXQiLCJmZXRjaEFjdGl2ZUpvYnNDb3VudCIsImdldCIsImpjdHJsIiwiQ29nbml0aXZlSm9iQ29udHJvbGxlciIsImFjdGl2ZUpvYnNDb3VudCIsImNvdW50IiwiTnVtYmVyIiwicGFyc2VJbnQiLCJmZXRjaENvbXBsZXRlZEpvYnNDb3VudCIsImNvbXBsZXRlZEpvYnNDb3VudCIsImZldGNoU2VydmljZUluZm8iLCJhZGRyZXNzIiwiZ2V0Q29nbml0aXZlSm9iU2VydmljZUluZm8iLCJyZXNwb25zZVRpbWVzdGFtcHMiLCJyZXNwb25zZUZsYWdzIiwiZmV0Y2hKb2JEZXRhaWxzIiwiZ2V0Q29nbml0aXZlSm9iRGV0YWlscyIsImtlcm5lbCIsImRhdGFzZXQiLCJjb21wbGV4aXR5IiwiZGVzY3JpcHRpb24iLCJhY3RpdmVXb3JrZXJzIiwic3RhdGUiLCJrZXJuZWxJcGZzIiwiZGF0YXNldElwZnMiLCJQcm9taXNlIiwibWFwIiwiXyIsImluZGV4IiwiZ2V0Q29nbml0aXZlSm9iUmVzdWx0cyIsImlwZnNSZXN1bHRzIiwidXRmOGRlc2NyaXB0aW9uIiwidXRpbHMiLCJoZXhUb1V0ZjgiLCJzZXJ2aWNlSW5mbyIsIk1hdGgiLCJyZWR1Y2UiLCJwcm9ncmVzc1Byb21pc2UiLCJyZXN1bHQiLCJjb21tb25Qcm9ncmVzcyIsInBhcnRQcm9ncmVzcyIsImxlbmd0aCIsInJlc29sdmUiLCJwcm9ncmVzcyIsImNlaWwiLCJmaWx0ZXIiLCJyZXMiLCJzdWJzdHIiLCJqb2JUeXBlIiwiZmV0Y2hKb2JzSWRzIiwic291cmNlIiwidmFsdWVzIiwiY291bnRzIiwiQXJyYXkiLCJrZXlzIiwiZ2V0Sm9iSWQiLCJmZXRjaEFsbCIsInJlY29yZHMiLCJlcnJvciIsImFjdGl2ZUNvdW50IiwiY29tcGxldGVkQ291bnQiLCJhY3RpdmVKb2JzSWRzIiwiY29tcGxldGVkSm9ic0lkcyIsImFsbEpvYnNJZHMiLCJqb2JJZCIsInB1c2giLCJtZXNzYWdlIiwiY3JlYXRlIiwiZnJvbSIsImRlcG9zaXQiLCJyZWplY3QiLCJnZXRHYXNQcmljZSIsImdhc1ByaWNlIiwiY3JlYXRlQ29nbml0aXZlSm9iIiwidXRmOFRvSGV4IiwidHJpbSIsInNlbmQiLCJ2YWx1ZSIsInRvV2VpIiwiU3RyaW5nIiwiZ2FzIiwib24iLCJyZWNlaXB0Iiwic3RhdHVzIiwiVFJBTlNBQ1RJT05fVU5TVUNDRVNTRlVMIiwiZXZlbnRzIiwiQ29nbml0aXZlSm9iUXVldWVkIiwicmV0dXJuVmFsdWVzIiwiQ29nbml0aXZlSm9iQ3JlYXRlZCIsImVyciIsImV2ZW50Q29nbml0aXZlSm9iQ3JlYXRlZCIsIm9wdGlvbnMiLCJjYWxsYmFja3MiLCJvbkRhdGEiLCJvbkVycm9yIiwiY2hhaW4iLCJkYXRhIiwiY2IiLCJldmVudCIsImpvYkRldGFpbHMiLCJuYW1lIiwiZXZlbnRKb2JTdGF0ZUNoYW5nZWQiLCJldmVudEhhbmRsZXIiLCJKb2JTdGF0ZUNoYW5nZWQiLCJDb2duaXRpb25Qcm9ncmVzc2VkIl0sIm1hcHBpbmdzIjoiQUFBQTs7Ozs7Ozs7QUFTQTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBRUE7O0FBQ0E7O0FBT0E7O0FBSUE7O0FBR0E7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUlBLElBQU1BLFVBQVUsR0FBRyxJQUFJQyxHQUFKLEVBQW5CO0FBRUE7Ozs7Ozs7QUFNTyxJ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cUIsWUFEQyxFQUVackIsRUFGWSxDQUVULE9BRlMsRUFFQVcsU0FBUyxDQUFDRSxPQUZWLENBQWpCO0FBR0FDLFlBQUFBLEtBQUssQ0FBQ0csS0FBTixDQUFZLENBQVosRUFBZUUsSUFBZixHQUFzQixxQkFBdEI7QUExRWdDLCtDQTRFekJMLEtBNUV5Qjs7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQSxHQUFIOztBQUFBLGtCQUFwQk0sb0JBQW9CO0FBQUE7QUFBQTtBQUFBLEdBQTFCIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBDb2duaXRpdmUgSm9icyByZWxhdGVkIG1ldGhvZHNcbiAqIFRoaXMgZmlsZSBpdCBpcyBhIHBhcnQgb2YgdGhlIFBhbmRvcmEgUHlycmhhIEphdmFzY3JpcHQgbGlicmFyeVxuICogXG4gKiBAZmlsZSBqb2JzLmpzXG4gKiBAYXV0aG9yIEtvc3RpYW50eW4gU215cm5vdiA8a29zdHlzaEBnbWFpbC5jb20+XG4gKiBAZGF0ZSAyMDE4XG4gKi9cblxuJ3VzZSBzdHJpY3QnO1xuXG5pbXBvcnQgKiBhcyBleHBlY3QgZnJvbSAnLi9oZWxwZXJzL2V4cGVjdCc7XG5pbXBvcnQgcGpzRXJyb3IsIHtcbiAgICBDT05UUkFDVF9SRVFVSVJFRCxcbiAgICBBRERSRVNTX1JFUVVJUkVELFxuICAgIFdFQjNfUkVRVUlSRUQsXG4gICAgVFJBTlNBQ1RJT05fVU5TVUNDRVNTRlVMXG59IGZyb20gJy4vaGVscGVycy9lcnJvcnMnO1xuXG5pbXBvcnQge1xuICAgIGZldGNoSXBmc0FkZHJlc3MgYXMgZmV0Y2hJcGZzQWRkcmVzc0J5S2VybmVsQWRkcmVzc1xufSBmcm9tICcuL2tlcm5lbHMnO1xuXG5pbXBvcnQge1xuICAgIGZldGNoSXBmc0FkZHJlc3MgYXMgZmV0Y2hJcGZzQWRkcmVzc0J5RGF0YXNldEFkZHJlc3Ncbn0gZnJvbSAnLi9kYXRhc2V0cyc7XG5pbXBvcnQge1xuICAgIGZldGNoSm9iUHJvZ3Jlc3MgYXMgZmV0Y2hXb3JrZXJzQWN0aXZlSm9iUHJvZ3Jlc3Ncbn0gZnJvbSAnLi93b3JrZXJzJztcblxuY29uc3QgbG9jYWxDYWNoZSA9IG5ldyBNYXAoKTtcblxuLyoqXG4gKiBHZXQgam9iIGNvbnRyb2xsZXIgYWRkcmVzc1xuICogXG4gKiBAcGFyYW0ge09iamVjdH0gY29uZmlnIExpYnJhcnkgY29uZmlnIChwcm92aWRlZCBieSB0aGUgcHJveHkgYnV0IGNhbiBiZSBvdmVycmlkZGVuKVxuICogQHJldHVybnMge1Byb21pc2U8e1N0cmluZ30+fSBcbiAqL1xuZXhwb3J0IGNvbnN0IGZldGNoSm9iQ29udHJvbGxlckFkZHJlc3MgPSBhc3luYyAoY29uZmlnID0ge30pID0+IHtcblxuICAgIGV4cGVjdC5hbGwoY29uZmlnLCB7XG4gICAgICAgICd3ZWIzJzoge1xuICAgICAgICAgICAgdHlwZTogJ29iamVjdCcsXG4gICAgICAgICAgICBjb2RlOiBXRUIzX1JFUVVJUkVEXG4gICAgICAgIH0sXG4gICAgICAgICdhZGRyZXNzZXMuUGFuZG9yYSc6IHtcbiAgICAgICAgICAgIHR5cGU6ICdhZGRyZXNzJyxcbiAgICAgICAgICAgIGNvZGU6IEFERFJFU1NfUkVRVUlSRUQsXG4gICAgICAgICAgICBhcmdzOiBbJ1BhbmRvcmEnXVxuICAgICAgICB9LFxuICAgICAgICAnY29udHJhY3RzLlBhbmRvcmEuYWJpJzoge1xuICAgICAgICAgICAgdHlwZTogJ29iamVjdCcsXG4gICAgICAgICAgICBjb2RlOiBDT05UUkFDVF9SRVFVSVJFRCxcbiAgICAgICAgICAgIGFyZ3M6IFsnUGFuZG9yYSddXG4gICAgICAgIH1cbiAgICB9KTtcblxuICAgIGNvbnN0IHBhbiA9IG5ldyBjb25maWcud2ViMy5ldGguQ29udHJhY3QoY29uZmlnLmNvbnRyYWN0cy5QYW5kb3JhLmFiaSwgY29uZmlnLmFkZHJlc3Nlcy5QYW5kb3JhKTtcbiAgICBjb25zdCBqb2JDb250cm9sbGVyID0gYXdhaXQgcGFuLm1ldGhvZHNcbiAgICAgICAgLmpvYkNvbnRyb2xsZXIoKVxuICAgICAgICAuY2FsbCgpO1xuXG4gICAgLy8gc2F2ZSBmb3IgbGF0ZXIgdXNlXG4gICAgbG9jYWxDYWNoZS5zZXQoJ2pvYkNvbnRyb2xsZXInLCBqb2JDb250cm9sbGVyKTtcbiAgICAgICAgXG4gICAgcmV0dXJuIGpvYkNvbnRyb2xsZXI7XG59O1xuXG4vKipcbiAqIEdldCBhY3RpdmUgam9icyBjb3VudCBcbiAqIFxuICogQHBhcmFtIHtPYmplY3R9IGNvbmZpZyBMaWJyYXJ5IGNvbmZpZyAocHJvdmlkZWQgYnkgdGhlIHByb3h5IGJ1dCBjYW4gYmUgb3ZlcnJpZGRlbilcbiAqIEByZXR1cm5zIHtQcm9taXNlPHtOdW1iZXJ9Pn0gXG4gKi9cbmV4cG9ydCBjb25zdCBmZXRjaEFjdGl2ZUpvYnNDb3VudCA9IGFzeW5jIChjb25maWcgPSB7fSkgPT4ge1xuXG4gICAgZXhwZWN0LmFsbChjb25maWcsIHtcbiAgICAgICAgJ3dlYjMnOiB7XG4gICAgICAgICAgICB0eXBlOiAnb2JqZWN0JyxcbiAgICAgICAgICAgIGNvZGU6IFdFQjNfUkVRVUlSRURcbiAgICAgICAgfSxcbiAgICAgICAgJ2NvbnRyYWN0cy5Db2duaXRpdmVKb2JDb250cm9sbGVyLmFiaSc6IHtcbiAgICAgICAgICAgIHR5cGU6ICdvYmplY3QnLFxuICAgICAgICAgICAgY29kZTogQ09OVFJBQ1RfUkVRVUlSRUQsXG4gICAgICAgICAgICBhcmdzOiBbJ0NvZ25pdGl2ZUpvYkNvbnRyb2xsZXInXVxuICAgICAgICB9XG4gICAgfSk7XG5cbiAgICBsZXQgam9iQ29udHJvbGxlciA9IGxvY2FsQ2FjaGUuZ2V0KCdqb2JDb250cm9sbGVyJyk7XG5cbiAgICBpZiAoIWpvYkNvbnRyb2xsZXIpIHtcblxuICAgICAgICBqb2JDb250cm9sbGVyID0gYXdhaXQgZmV0Y2hKb2JDb250cm9sbGVyQWRkcmVzcyhjb25maWcpO1xuICAgIH1cblxuICAgIGNvbnN0IGpjdHJsID0gbmV3IGNvbmZpZy53ZWIzLmV0aC5Db250cmFjdChjb25maWcuY29udHJhY3RzLkNvZ25pdGl2ZUpvYkNvbnRyb2xsZXIuYWJpLCBqb2JDb250cm9sbGVyKTtcbiAgICBjb25zdCBjb3VudCA9IGF3YWl0IGpjdHJsLm1ldGhvZHNcbiAgICAgICAgLmFjdGl2ZUpvYnNDb3VudCgpXG4gICAgICAgIC5jYWxsKCk7XG4gICAgICAgIFxuICAgIHJldHVybiBOdW1iZXIucGFyc2VJbnQoY291bnQsIDEwKTtcbn07XG5cbi8qKlxuICogR2V0IGNvbXBsZXRlZCBqb2JzIGNvdW50IFxuICogXG4gKiBAcGFyYW0ge09iamVjdH0gY29uZmlnIExpYnJhcnkgY29uZmlnIChwcm92aWRlZCBieSB0aGUgcHJveHkgYnV0IGNhbiBiZSBvdmVycmlkZGVuKVxuICogQHJldHVybnMge1Byb21pc2U8e051bWJlcn0+fSBcbiAqL1xuZXhwb3J0IGNvbnN0IGZldGNoQ29tcGxldGVkSm9ic0NvdW50ID0gYXN5bmMgKGNvbmZpZyA9IHt9KSA9PiB7XG5cbiAgICBleHBlY3QuYWxsKGNvbmZpZywge1xuICAgICAgICAnd2ViMyc6IHtcbiAgICAgICAgICAgIHR5cGU6ICdvYmplY3QnLFxuICAgICAgICAgICAgY29kZTogV0VCM19SRVFVSVJFRFxuICAgICAgICB9LFxuICAgICAgICAnY29udHJhY3RzLkNvZ25pdGl2ZUpvYkNvbnRyb2xsZXIuYWJpJzoge1xuICAgICAgICAgICAgdHlwZTogJ29iamVjdCcsXG4gICAgICAgICAgICBjb2RlOiBDT05UUkFDVF9SRVFVSVJFRCxcbiAgICAgICAgICAgIGFyZ3M6IFsnQ29nbml0aXZlSm9iQ29udHJvbGxlciddXG4gICAgICAgIH1cbiAgICB9KTtcblxuICAgIGxldCBqb2JDb250cm9sbGVyID0gbG9jYWxDYWNoZS5nZXQoJ2pvYkNvbnRyb2xsZXInKTtcblxuICAgIGlmICgham9iQ29udHJvbGxlcikge1xuXG4gICAgICAgIGpvYkNvbnRyb2xsZXIgPSBhd2FpdCBmZXRjaEpvYkNvbnRyb2xsZXJBZGRyZXNzKGNvbmZpZyk7XG4gICAgfVxuXG4gICAgY29uc3QgamN0cmwgPSBuZXcgY29uZmlnLndlYjMuZXRoLkNvbnRyYWN0KGNvbmZpZy5jb250cmFjdHMuQ29nbml0aXZlSm9iQ29udHJvbGxlci5hYmksIGpvYkNvbnRyb2xsZXIpO1xuICAgIGNvbnN0IGNvdW50ID0gYXdhaXQgamN0cmwubWV0aG9kc1xuICAgICAgICAuY29tcGxldGVkSm9ic0NvdW50KClcbiAgICAgICAgLmNhbGwoKTtcbiAgICAgICAgXG4gICAgcmV0dXJuIE51bWJlci5wYXJzZUludChjb3VudCwgMTApO1xufTtcblxuLyoqXG4gKiBHZXQgam9iIHNlcnZpY2UgaW5mbyBcbiAqIFxuICogQHBhcmFtIHtTdHJpbmd9IGFkZHJlc3MgSm9iIGFkZHJlc3NcbiAqIEBwYXJhbSB7T2JqZWN0fSBjb25maWcgTGlicmFyeSBjb25maWcgKHByb3ZpZGVkIGJ5IHRoZSBwcm94eSBidXQgY2FuIGJlIG92ZXJyaWRkZW4pXG4gKiBAcmV0dXJucyB7UHJvbWlzZTx7TnVtYmVyfT59IFxuICovXG5leHBvcnQgY29uc3QgZmV0Y2hTZXJ2aWNlSW5mbyA9IGFzeW5jIChhZGRyZXNzLCBjb25maWcgPSB7fSkgPT4ge1xuXG4gICAgZXhwZWN0LmFsbChjb25maWcsIHtcbiAgICAgICAgJ3dlYjMnOiB7XG4gICAgICAgICAgICB0eXBlOiAnb2JqZWN0JyxcbiAgICAgICAgICAgIGNvZGU6IFdFQjNfUkVRVUlSRURcbiAgICAgICAgfSxcbiAgICAgICAgJ2NvbnRyYWN0cy5Db2duaXRpdmVKb2JDb250cm9sbGVyLmFiaSc6IHtcbiAgICAgICAgICAgIHR5cGU6ICdvYmplY3QnLFxuICAgICAgICAgICAgY29kZTogQ09OVFJBQ1RfUkVRVUlSRUQsXG4gICAgICAgICAgICBhcmdzOiBbJ0NvZ25pdGl2ZUpvYkNvbnRyb2xsZXInXVxuICAgICAgICB9XG4gICAgfSk7XG5cbiAgICBsZXQgam9iQ29udHJvbGxlciA9IGxvY2FsQ2FjaGUuZ2V0KCdqb2JDb250cm9sbGVyJyk7XG5cbiAgICBpZiAoIWpvYkNvbnRyb2xsZXIpIHtcblxuICAgICAgICBqb2JDb250cm9sbGVyID0gYXdhaXQgZmV0Y2hKb2JDb250cm9sbGVyQWRkcmVzcyhjb25maWcpO1xuICAgIH1cblxuICAgIGNvbnN0IGpjdHJsID0gbmV3IGNvbmZpZy53ZWIzLmV0aC5Db250cmFjdChjb25maWcuY29udHJhY3RzLkNvZ25pdGl2ZUpvYkNvbnRyb2xsZXIuYWJpLCBqb2JDb250cm9sbGVyKTtcblxuICAgIGNvbnN0IHsgcmVzcG9uc2VUaW1lc3RhbXBzLCByZXNwb25zZUZsYWdzIH0gPSBhd2FpdCBqY3RybC5tZXRob2RzXG4gICAgICAgIC5nZXRDb2duaXRpdmVKb2JTZXJ2aWNlSW5mbyhhZGRyZXNzKVxuICAgICAgICAuY2FsbCgpO1xuXG4gICAgcmV0dXJuIHsgXG4gICAgICAgIHJlc3BvbnNlVGltZXN0YW1wcywgXG4gICAgICAgIHJlc3BvbnNlRmxhZ3MgXG4gICAgfTtcbn07XG5cbi8qKlxuICogR2V0IGpvYiBkZXRhaWxzIFxuICogXG4gKiBAcGFyYW0ge1N0cmluZ30gYWRkcmVzcyBKb2IgYWRkcmVzc1xuICogQHBhcmFtIHtPYmplY3R9IGNvbmZpZyBMaWJyYXJ5IGNvbmZpZyAocHJvdmlkZWQgYnkgdGhlIHByb3h5IGJ1dCBjYW4gYmUgb3ZlcnJpZGRlbilcbiAqIEByZXR1cm5zIHtQcm9taXNlPHtOdW1iZXJ9Pn0gXG4gKi9cbmV4cG9ydCBjb25zdCBmZXRjaEpvYkRldGFpbHMgPSBhc3luYyAoYWRkcmVzcywgY29uZmlnID0ge30pID0+IHtcblxuICAgIGV4cGVjdC5hbGwoY29uZmlnLCB7XG4gICAgICAgICd3ZWIzJzoge1xuICAgICAgICAgICAgdHlwZTogJ29iamVjdCcsXG4gICAgICAgICAgICBjb2RlOiBXRUIzX1JFUVVJUkVEXG4gICAgICAgIH0sXG4gICAgICAgICdjb250cmFjdHMuQ29nbml0aXZlSm9iQ29udHJvbGxlci5hYmknOiB7XG4gICAgICAgICAgICB0eXBlOiAnb2JqZWN0JyxcbiAgICAgICAgICAgIGNvZGU6IENPTlRSQUNUX1JFUVVJUkVELFxuICAgICAgICAgICAgYXJnczogWydDb2duaXRpdmVKb2JDb250cm9sbGVyJ11cbiAgICAgICAgfVxuICAgIH0pO1xuXG4gICAgbGV0IGpvYkNvbnRyb2xsZXIgPSBsb2NhbENhY2hlLmdldCgnam9iQ29udHJvbGxlcicpO1xuXG4gICAgaWYgKCFqb2JDb250cm9sbGVyKSB7XG5cbiAgICAgICAgam9iQ29udHJvbGxlciA9IGF3YWl0IGZldGNoSm9iQ29udHJvbGxlckFkZHJlc3MoY29uZmlnKTtcbiAgICB9XG5cbiAgICBjb25zdCBqY3RybCA9IG5ldyBjb25maWcud2ViMy5ldGguQ29udHJhY3QoY29uZmlnLmNvbnRyYWN0cy5Db2duaXRpdmVKb2JDb250cm9sbGVyLmFiaSwgam9iQ29udHJvbGxlcik7XG4gICAgXG4gICAgY29uc3QgeyBrZXJuZWwsIGRhdGFzZXQsIGNvbXBsZXhpdHksIGRlc2NyaXB0aW9uLCBhY3RpdmVXb3JrZXJzLCBzdGF0ZSB9ID0gYXdhaXQgamN0cmwubWV0aG9kc1xuICAgICAgICAuZ2V0Q29nbml0aXZlSm9iRGV0YWlscyhhZGRyZXNzKVxuICAgICAgICAuY2FsbCgpO1xuICAgIGNvbnN0IGtlcm5lbElwZnMgPSBhd2FpdCBmZXRjaElwZnNBZGRyZXNzQnlLZXJuZWxBZGRyZXNzKGtlcm5lbCwgY29uZmlnKTtcbiAgICBjb25zdCBkYXRhc2V0SXBmcyA9IGF3YWl0IGZldGNoSXBmc0FkZHJlc3NCeURhdGFzZXRBZGRyZXNzKGRhdGFzZXQsIGNvbmZpZyk7XG4gICAgY29uc3QgaXBmc1Jlc3VsdHMgPSBhd2FpdCBQcm9taXNlLmFsbChhY3RpdmVXb3JrZXJzLm1hcCgoXywgaW5kZXgpID0+IGpjdHJsLm1ldGhvZHMuZ2V0Q29nbml0aXZlSm9iUmVzdWx0cyhhZGRyZXNzLCBpbmRleCkuY2FsbCgpKSk7ICAgIFxuICAgIGNvbnN0IHV0ZjhkZXNjcmlwdGlvbiA9IGRlc2NyaXB0aW9uID8gY29uZmlnLndlYjMudXRpbHMuaGV4VG9VdGY4KGRlc2NyaXB0aW9uKSA6ICcnO1xuICAgIGNvbnN0IHNlcnZpY2VJbmZvID0gYXdhaXQgZmV0Y2hTZXJ2aWNlSW5mbyhhZGRyZXNzLCBjb25maWcpO1xuXG4gICAgY29uc3QgcHJvZ3Jlc3MgPSBNYXRoLmNlaWwoYXdhaXQgaXBmc1Jlc3VsdHMucmVkdWNlKGFzeW5jIChwcm9ncmVzc1Byb21pc2UsIHJlc3VsdCwgaW5kZXgpID0+IHtcbiAgICAgICAgY29uc3QgY29tbW9uUHJvZ3Jlc3MgPSBhd2FpdCBwcm9ncmVzc1Byb21pc2U7XG4gICAgICAgIGxldCBwYXJ0UHJvZ3Jlc3MgPSAxMDAgLyBpcGZzUmVzdWx0cy5sZW5ndGg7XG5cbiAgICAgICAgaWYgKCFyZXN1bHQpIHtcblxuICAgICAgICAgICAgLy8gSWYgcmVzdWx0IG5vdCBiZWVuIHByb3ZpZGVkIGJ5IHRoZSB3b3JrZXIgXG4gICAgICAgICAgICAvLyB0aGVuIHdlIGZldGNoaW5nIHByb2dyZXNzIHZhbHVlIGZyb20gaXRzIGNvbnRyYWN0XG4gICAgICAgICAgICBwYXJ0UHJvZ3Jlc3MgPSBhd2FpdCBmZXRjaFdvcmtlcnNBY3RpdmVKb2JQcm9ncmVzcyhhY3RpdmVXb3JrZXJzW2luZGV4XSwgY29uZmlnKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiBjb21tb25Qcm9ncmVzcyArIHBhcnRQcm9ncmVzcztcbiAgICB9LCBQcm9taXNlLnJlc29sdmUoMCkpKTtcblxuICAgIHJldHVybiB7XG4gICAgICAgIGFkZHJlc3MsIFxuICAgICAgICBrZXJuZWwsXG4gICAgICAgIGtlcm5lbElwZnMsXG4gICAgICAgIGRhdGFzZXQsXG4gICAgICAgIGRhdGFzZXRJcGZzLFxuICAgICAgICBhY3RpdmVXb3JrZXJzLFxuICAgICAgICBpcGZzUmVzdWx0czogaXBmc1Jlc3VsdHMubWFwKHJlc3VsdCA9PiByZXN1bHQgPyBjb25maWcud2ViMy51dGlscy5oZXhUb1V0ZjgocmVzdWx0KSA6IHJlc3VsdCkuZmlsdGVyKHJlcyA9PiByZXMpLFxuICAgICAgICBjb21wbGV4aXR5OiBOdW1iZXIoY29tcGxleGl0eSksXG4gICAgICAgIHByb2dyZXNzOiBwcm9ncmVzcyA+IDEwMCA/IDEwMCA6IHByb2dyZXNzLFxuICAgICAgICBzdGF0ZTogTnVtYmVyKHN0YXRlKSxcbiAgICAgICAgZGVzY3JpcHRpb246IHV0ZjhkZXNjcmlwdGlvbi5zdWJzdHIoMiksXG4gICAgICAgIGpvYlR5cGU6IHV0ZjhkZXNjcmlwdGlvbi5zdWJzdHIoMCwgMSksXG4gICAgICAgIHNlcnZpY2VJbmZvXG4gICAgfTtcbn07XG5cbi8qKlxuICogR2V0IGpvYnMgSWQgZnJvbSB0aGUgXCJzb3VyY2VcIlxuICogXG4gKiBAcGFyYW0ge1N0cmluZ30gZnJvbSBzb3VyY2UgYWN0aXZlSm9icyBvciBjb21wbGV0ZWRKb2JzXG4gKiBAcGFyYW0ge051bWJlcn0gY291bnRcbiAqIEBwYXJhbSB7T2JqZWN0fSBvcHRpb25zXG4gKiBAcmV0dXJucyB7UHJvbWlzZTx7U3RyaW5nW119Pn0gXG4gKi9cbmV4cG9ydCBjb25zdCBmZXRjaEpvYnNJZHMgPSBhc3luYyAoc291cmNlLCBjb3VudCA9IDAsIGNvbmZpZyA9IHt9KSA9PiB7XG5cbiAgICBleHBlY3QuYWxsKHsgc291cmNlIH0sIHtcbiAgICAgICAgJ3NvdXJjZSc6IHtcbiAgICAgICAgICAgIHR5cGU6ICdlbnVtJyxcbiAgICAgICAgICAgIHZhbHVlczogWydhY3RpdmVKb2JzJywgJ2NvbXBsZXRlZEpvYnMnXVxuICAgICAgICB9XG4gICAgfSk7XG5cbiAgICBleHBlY3QuYWxsKGNvbmZpZywge1xuICAgICAgICAnd2ViMyc6IHtcbiAgICAgICAgICAgIHR5cGU6ICdvYmplY3QnLFxuICAgICAgICAgICAgY29kZTogV0VCM19SRVFVSVJFRFxuICAgICAgICB9LFxuICAgICAgICAnY29udHJhY3RzLkNvZ25pdGl2ZUpvYkNvbnRyb2xsZXIuYWJpJzoge1xuICAgICAgICAgICAgdHlwZTogJ29iamVjdCcsXG4gICAgICAgICAgICBjb2RlOiBDT05UUkFDVF9SRVFVSVJFRCxcbiAgICAgICAgICAgIGFyZ3M6IFsnQ29nbml0aXZlSm9iQ29udHJvbGxlciddXG4gICAgICAgIH1cbiAgICB9KTsgICAgXG5cbiAgICBsZXQgam9iQ29udHJvbGxlciA9IGxvY2FsQ2FjaGUuZ2V0KCdqb2JDb250cm9sbGVyJyk7XG5cbiAgICBpZiAoIWpvYkNvbnRyb2xsZXIpIHtcblxuICAgICAgICBqb2JDb250cm9sbGVyID0gYXdhaXQgZmV0Y2hKb2JDb250cm9sbGVyQWRkcmVzcyhjb25maWcpO1xuICAgIH1cblxuICAgIC8vIG51bWJlcnMgc2VxdWVuY2UgZnJvbSAwIHRvIGNvdW50XG4gICAgY29uc3QgY291bnRzID0gWy4uLkFycmF5KGNvdW50KS5rZXlzKCldO1xuXG4gICAgY29uc3QgamN0cmwgPSBuZXcgY29uZmlnLndlYjMuZXRoLkNvbnRyYWN0KGNvbmZpZy5jb250cmFjdHMuQ29nbml0aXZlSm9iQ29udHJvbGxlci5hYmksIGpvYkNvbnRyb2xsZXIpO1xuICAgIGNvbnN0IGFkZHJlc3NlcyA9IGF3YWl0IFByb21pc2UuYWxsKGNvdW50cy5tYXAoaW5kZXggPT4gamN0cmwubWV0aG9kcy5nZXRKb2JJZChpbmRleCwgc291cmNlID09PSAnYWN0aXZlSm9icycpLmNhbGwoKSkpO1xuICAgICAgICBcbiAgICByZXR1cm4gYWRkcmVzc2VzO1xufTtcblxuLyoqXG4gKiBHZXQgYWxsIGpvYnNcbiAqIFxuICogQHBhcmFtIHtPYmplY3R9IGNvbmZpZyBMaWJyYXJ5IGNvbmZpZyAocHJvdmlkZWQgYnkgdGhlIHByb3h5IGJ1dCBjYW4gYmUgb3ZlcnJpZGRlbilcbiAqIEByZXR1cm5zIHtQcm9taXNlfSBBIFByb21pc2Ugb2JqZWN0IHJlcHJlc2VudHMgdGhlIHtPYmplY3RbXX0gXG4gKi9cbmV4cG9ydCBjb25zdCBmZXRjaEFsbCA9IGFzeW5jIChjb25maWcgPSB7fSkgPT4ge1xuICAgIGxldCByZWNvcmRzID0gW107XG4gICAgbGV0IGVycm9yID0gW107XG5cbiAgICB0cnkge1xuXG4gICAgICAgIGNvbnN0IFtcbiAgICAgICAgICAgIGFjdGl2ZUNvdW50LFxuICAgICAgICAgICAgY29tcGxldGVkQ291bnRcbiAgICAgICAgXSA9IGF3YWl0IFByb21pc2UuYWxsKFtcbiAgICAgICAgICAgIGZldGNoQWN0aXZlSm9ic0NvdW50KGNvbmZpZyksXG4gICAgICAgICAgICBmZXRjaENvbXBsZXRlZEpvYnNDb3VudChjb25maWcpXG4gICAgICAgIF0pO1xuXG4gICAgICAgIGNvbnN0IFtcbiAgICAgICAgICAgIGFjdGl2ZUpvYnNJZHMsXG4gICAgICAgICAgICBjb21wbGV0ZWRKb2JzSWRzXG4gICAgICAgIF0gPSBhd2FpdCBQcm9taXNlLmFsbChbXG4gICAgICAgICAgICBmZXRjaEpvYnNJZHMoJ2FjdGl2ZUpvYnMnLCBhY3RpdmVDb3VudCwgY29uZmlnKSxcbiAgICAgICAgICAgIGZldGNoSm9ic0lkcygnY29tcGxldGVkSm9icycsIGNvbXBsZXRlZENvdW50LCBjb25maWcpXG4gICAgICAgIF0pO1xuXG4gICAgICAgIGNvbnN0IGFsbEpvYnNJZHMgPSBbXG4gICAgICAgICAgICAuLi5hY3RpdmVKb2JzSWRzLFxuICAgICAgICAgICAgLi4uY29tcGxldGVkSm9ic0lkc1xuICAgICAgICBdO1xuXG4gICAgICAgIHJlY29yZHMgPSBhd2FpdCBQcm9taXNlLmFsbChhbGxKb2JzSWRzLm1hcChqb2JJZCA9PiBmZXRjaEpvYkRldGFpbHMoam9iSWQsIGNvbmZpZykpKTtcbiAgICAgICAgXG4gICAgfSBjYXRjaChlcnIpIHtcbiAgICAgICAgZXJyb3IucHVzaCh7XG4gICAgICAgICAgICBlcnJvcjogZXJyLm1lc3NhZ2VcbiAgICAgICAgfSk7XG4gICAgfSAgIFxuXG4gICAgcmV0dXJuIHtcbiAgICAgICAgcmVjb3JkcyxcbiAgICAgICAgZXJyb3JcbiAgICB9O1xufTtcblxuLyoqXG4gKiBDcmVhdGUgY29nbml0aXZlIGpvYiBjb250cmFjdFxuICogXG4gKiBAcGFyYW0ge09iamVjdH0gb3B0aW9uc1xuICogQHBhcmFtIHtTdHJpbmd9IGZyb20gUHVibGlzaGVyIGFkZHJlc3NcbiAqIEBwYXJhbSB7T2JqZWN0fSBjb25maWcgTGlicmFyeSBjb25maWcgKHByb3ZpZGVkIGJ5IHRoZSBwcm94eSBidXQgY2FuIGJlIG92ZXJyaWRkZW4pXG4gKiBAcmV0dXJucyB7UHJvbWlzZX0gUHJvbWlzZSBvYmplY3QgcmVzb2x2ZWQgdG8gYWRkIHN0YXR1cyAoYm9vbGVhbilcbiAqL1xuZXhwb3J0IGNvbnN0IGNyZWF0ZSA9ICh7a2VybmVsLCBkYXRhc2V0LCBjb21wbGV4aXR5LCBqb2JUeXBlLCBkZXNjcmlwdGlvbiwgZGVwb3NpdH0sIGZyb20sIGNvbmZpZyA9IHt9KSA9PiBuZXcgUHJvbWlzZShhc3luYyAocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG5cbiAgICBleHBlY3QuYWxsKHsga2VybmVsLCBkYXRhc2V0LCBjb21wbGV4aXR5LCBqb2JUeXBlLCBkZXNjcmlwdGlvbiwgZGVwb3NpdCwgZnJvbSB9LCB7XG4gICAgICAgICdrZXJuZWwnOiB7XG4gICAgICAgICAgICB0eXBlOiAnYWRkcmVzcydcbiAgICAgICAgfSxcbiAgICAgICAgJ2RhdGFzZXQnOiB7XG4gICAgICAgICAgICB0eXBlOiAnYWRkcmVzcydcbiAgICAgICAgfSxcbiAgICAgICAgJ2NvbXBsZXhpdHknOiB7XG4gICAgICAgICAgICB0eXBlOiAnbnVtYmVyJ1xuICAgICAgICB9LFxuICAgICAgICAnam9iVHlwZSc6IHtcbiAgICAgICAgICAgIHR5cGU6ICdzdHJpbmcnXG4gICAgICAgIH0sXG4gICAgICAgICdkZXNjcmlwdGlvbic6IHtcbiAgICAgICAgICAgIHR5cGU6ICdzdHJpbmcnXG4gICAgICAgIH0sXG4gICAgICAgICdkZXBvc2l0Jzoge1xuICAgICAgICAgICAgdHlwZTogJ251bWJlcidcbiAgICAgICAgfSxcbiAgICAgICAgJ2Zyb20nOiB7XG4gICAgICAgICAgICB0eXBlOiAnYWRkcmVzcydcbiAgICAgICAgfVxuICAgIH0pO1xuXG4gICAgZXhwZWN0LmFsbChjb25maWcsIHtcbiAgICAgICAgJ3dlYjMnOiB7XG4gICAgICAgICAgICB0eXBlOiAnb2JqZWN0JyxcbiAgICAgICAgICAgIGNvZGU6IFdFQjNfUkVRVUlSRURcbiAgICAgICAgfSxcbiAgICAgICAgJ2NvbnRyYWN0cy5QYW5kb3JhLmFiaSc6IHtcbiAgICAgICAgICAgIHR5cGU6ICdvYmplY3QnLFxuICAgICAgICAgICAgY29kZTogQ09OVFJBQ1RfUkVRVUlSRUQsXG4gICAgICAgICAgICBhcmdzOiBbJ1BhbmRvcmEnXVxuICAgICAgICB9LFxuICAgICAgICAnYWRkcmVzc2VzLlBhbmRvcmEnOiB7XG4gICAgICAgICAgICB0eXBlOiAnYWRkcmVzcycsXG4gICAgICAgICAgICBjb2RlOiBBRERSRVNTX1JFUVVJUkVELFxuICAgICAgICAgICAgYXJnczogWydQYW5kb3JhJ11cbiAgICAgICAgfVxuICAgIH0pO1xuXG4gICAgY29uc3QgcGFuID0gbmV3IGNvbmZpZy53ZWIzLmV0aC5Db250cmFjdChjb25maWcuY29udHJhY3RzLlBhbmRvcmEuYWJpLCBjb25maWcuYWRkcmVzc2VzLlBhbmRvcmEpO1xuICAgIGNvbnN0IGdhc1ByaWNlID0gYXdhaXQgY29uZmlnLndlYjMuZXRoLmdldEdhc1ByaWNlKCk7XG4gICAgcGFuLm1ldGhvZHNcbiAgICAgICAgLmNyZWF0ZUNvZ25pdGl2ZUpvYihrZXJuZWwsIGRhdGFzZXQsIGNvbXBsZXhpdHksIGNvbmZpZy53ZWIzLnV0aWxzLnV0ZjhUb0hleChgJHtqb2JUeXBlfTske2Rlc2NyaXB0aW9uLnRyaW0oKX1gKSlcbiAgICAgICAgLnNlbmQoe1xuICAgICAgICAgICAgdmFsdWU6IGNvbmZpZy53ZWIzLnV0aWxzLnRvV2VpKFN0cmluZyhkZXBvc2l0KSksXG4gICAgICAgICAgICBmcm9tLFxuICAgICAgICAgICAgZ2FzUHJpY2UsXG4gICAgICAgICAgICBnYXM6IDY3MDAwMDAvLyBiZWNhdXNlIHRoaXMgd29ya2Zsb3cgaXMgdG9vIGdyZWVkeVxuICAgICAgICB9KVxuICAgICAgICAub24oJ2Vycm9yJywgcmVqZWN0KVxuICAgICAgICAub24oJ3JlY2VpcHQnLCByZWNlaXB0ID0+IHtcblxuICAgICAgICAgICAgdHJ5IHtcblxuICAgICAgICAgICAgICAgIGlmIChOdW1iZXIocmVjZWlwdC5zdGF0dXMpID09PSAwKSB7XG5cbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHJlamVjdChwanNFcnJvcihUUkFOU0FDVElPTl9VTlNVQ0NFU1NGVUwpKTtcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICBpZiAocmVjZWlwdC5ldmVudHMuQ29nbml0aXZlSm9iUXVldWVkKSB7XG4gICAgXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiByZXNvbHZlKHJlY2VpcHQuZXZlbnRzLkNvZ25pdGl2ZUpvYlF1ZXVlZC5yZXR1cm5WYWx1ZXMuam9iSWQpO1xuICAgICAgICAgICAgICAgIH1cbiAgICBcbiAgICAgICAgICAgICAgICByZXNvbHZlKHJlY2VpcHQuZXZlbnRzLkNvZ25pdGl2ZUpvYkNyZWF0ZWQucmV0dXJuVmFsdWVzLmpvYklkKTtcbiAgICAgICAgICAgIH0gY2F0Y2ggKGVycikge1xuICAgICAgICAgICAgICAgIHJlamVjdChlcnIpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbn0pO1xuXG4vKipcbiAqIEhhbmRsZSBldmVudCBDb2duaXRpdmVKb2JDcmVhdGVkXG4gKiBcbiAqIEBwYXJhbSB7T2JqZWN0fSBvcHRpb25zIEV2ZW50IGhhbmRsZXIgb3B0aW9uc1xuICogQHBhcmFtIHtPYmplY3R9IGNvbmZpZyBMaWJyYXJ5IGNvbmZpZyAocHJvdmlkZWQgYnkgdGhlIHByb3h5IGJ1dCBjYW4gYmUgb3ZlcnJpZGRlbilcbiAqIEByZXR1cm5zIHtQcm9taXNlPHtPYmplY3R9Pn0gUFByb21pc2Ugb2JqZWN0IHJlc29sdmVkIHRvIHRoZSBvYmplY3Qgd2l0aCBjaGFpbmVkIGNhbGxiYWNrcyAjZGF0YSBhbmQgI2Vycm9yXG4gKi9cbmV4cG9ydCBjb25zdCBldmVudENvZ25pdGl2ZUpvYkNyZWF0ZWQgPSBhc3luYyAob3B0aW9ucyA9IHt9LCBjb25maWcgPSB7fSkgPT4ge1xuXG4gICAgZXhwZWN0LmFsbCh7IG9wdGlvbnMgfSwge1xuICAgICAgICAnb3B0aW9ucyc6IHtcbiAgICAgICAgICAgIHR5cGU6ICdvYmplY3QnXG4gICAgICAgIH1cbiAgICB9KTtcblxuICAgIGV4cGVjdC5hbGwoY29uZmlnLCB7XG4gICAgICAgICd3ZWIzJzoge1xuICAgICAgICAgICAgdHlwZTogJ29iamVjdCcsXG4gICAgICAgICAgICBjb2RlOiBXRUIzX1JFUVVJUkVEXG4gICAgICAgIH0sXG4gICAgICAgICdjb250cmFjdHMuUGFuZG9yYS5hYmknOiB7XG4gICAgICAgICAgICB0eXBlOiAnb2JqZWN0JyxcbiAgICAgICAgICAgIGNvZGU6IENPTlRSQUNUX1JFUVVJUkVELFxuICAgICAgICAgICAgYXJnczogWydQYW5kb3JhJ11cbiAgICAgICAgfSxcbiAgICAgICAgJ2FkZHJlc3Nlcy5QYW5kb3JhJzoge1xuICAgICAgICAgICAgdHlwZTogJ2FkZHJlc3MnLFxuICAgICAgICAgICAgY29kZTogQUREUkVTU19SRVFVSVJFRCxcbiAgICAgICAgICAgIGFyZ3M6IFsnUGFuZG9yYSddXG4gICAgICAgIH1cbiAgICB9KTtcblxuICAgIGNvbnN0IGNhbGxiYWNrcyA9IHtcbiAgICAgICAgb25EYXRhOiAoKSA9PiB7fSxcbiAgICAgICAgb25FcnJvcjogKCkgPT4ge31cbiAgICB9O1xuXG4gICAgY29uc3QgY2hhaW4gPSB7XG4gICAgICAgIGRhdGE6IChjYiA9ICgpID0+IHt9KSA9PiB7XG4gICAgICAgICAgICBjYWxsYmFja3Mub25EYXRhID0gY2I7XG4gICAgICAgICAgICByZXR1cm4gY2hhaW47XG4gICAgICAgIH0sXG4gICAgICAgIGVycm9yOiAoY2IgPSAoKSA9PiB7fSkgPT4ge1xuICAgICAgICAgICAgY2FsbGJhY2tzLm9uRXJyb3IgPSBjYjtcbiAgICAgICAgICAgIHJldHVybiBjaGFpbjtcbiAgICAgICAgfVxuICAgIH07XG5cbiAgICBjb25zdCBwYW4gPSBuZXcgY29uZmlnLndlYjMuZXRoLkNvbnRyYWN0KGNvbmZpZy5jb250cmFjdHMuUGFuZG9yYS5hYmksIGNvbmZpZy5hZGRyZXNzZXMuUGFuZG9yYSk7XG4gICAgY2hhaW4uZXZlbnQgPSBbXTtcbiAgICBjaGFpbi5ldmVudFswXSA9IHBhbi5ldmVudHMuQ29nbml0aXZlSm9iQ3JlYXRlZChvcHRpb25zKVxuICAgICAgICAub24oJ2RhdGEnLCBhc3luYyAoZXZlbnQpID0+IHtcblxuICAgICAgICAgICAgdHJ5IHtcblxuICAgICAgICAgICAgICAgIGNvbnN0IGpvYkRldGFpbHMgPSBhd2FpdCBmZXRjaEpvYkRldGFpbHMoZXZlbnQucmV0dXJuVmFsdWVzLmpvYklkLCBjb25maWcpO1xuICAgICAgICAgICAgICAgIGNhbGxiYWNrcy5vbkRhdGEoe1xuICAgICAgICAgICAgICAgICAgICByZWNvcmRzOiBbam9iRGV0YWlsc10sXG4gICAgICAgICAgICAgICAgICAgIGV2ZW50XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9IGNhdGNoKGVycikge1xuICAgICAgICAgICAgICAgIGNhbGxiYWNrcy5vbkVycm9yKGVycik7XG4gICAgICAgICAgICB9ICAgICAgICAgICAgXG4gICAgICAgIH0pXG4gICAgICAgIC5vbignZXJyb3InLCBjYWxsYmFja3Mub25FcnJvcik7XG4gICAgY2hhaW4uZXZlbnRbMF0ubmFtZSA9ICdDb2duaXRpdmVKb2JDcmVhdGVkJztcblxuICAgIHJldHVybiBjaGFpbjtcbn07XG5cbi8qKlxuICogSGFuZGxlIGV2ZW50IEpvYlN0YXRlQ2hhbmdlZFxuICogXG4gKiBAcGFyYW0ge09iamVjdH0gb3B0aW9ucyBFdmVudCBoYW5kbGVyIG9wdGlvbnNcbiAqIEBwYXJhbSB7T2JqZWN0fSBjb25maWcgTGlicmFyeSBjb25maWcgKHByb3ZpZGVkIGJ5IHRoZSBwcm94eSBidXQgY2FuIGJlIG92ZXJyaWRkZW4pXG4gKiBAcmV0dXJucyB7UHJvbWlzZTx7T2JqZWN0fT59IFBQcm9taXNlIG9iamVjdCByZXNvbHZlZCB0byB0aGUgb2JqZWN0IHdpdGggY2hhaW5lZCBjYWxsYmFja3MgI2RhdGEgYW5kICNlcnJvclxuICovXG5leHBvcnQgY29uc3QgZXZlbnRKb2JTdGF0ZUNoYW5nZWQgPSBhc3luYyAob3B0aW9ucyA9IHt9LCBjb25maWcgPSB7fSkgPT4ge1xuXG4gICAgZXhwZWN0LmFsbCh7IG9wdGlvbnMgfSwge1xuICAgICAgICAnb3B0aW9ucyc6IHtcbiAgICAgICAgICAgIHR5cGU6ICdvYmplY3QnXG4gICAgICAgIH1cbiAgICB9KTtcblxuICAgIGV4cGVjdC5hbGwoY29uZmlnLCB7XG4gICAgICAgICd3ZWIzJzoge1xuICAgICAgICAgICAgdHlwZTogJ29iamVjdCcsXG4gICAgICAgICAgICBjb2RlOiBXRUIzX1JFUVVJUkVEXG4gICAgICAgIH0sXG4gICAgICAgICdjb250cmFjdHMuUGFuZG9yYS5hYmknOiB7XG4gICAgICAgICAgICB0eXBlOiAnb2JqZWN0JyxcbiAgICAgICAgICAgIGNvZGU6IENPTlRSQUNUX1JFUVVJUkVELFxuICAgICAgICAgICAgYXJnczogWydQYW5kb3JhJ11cbiAgICAgICAgfSxcbiAgICAgICAgJ2FkZHJlc3Nlcy5QYW5kb3JhJzoge1xuICAgICAgICAgICAgdHlwZTogJ2FkZHJlc3MnLFxuICAgICAgICAgICAgY29kZTogQUREUkVTU19SRVFVSVJFRCxcbiAgICAgICAgICAgIGFyZ3M6IFsnUGFuZG9yYSddXG4gICAgICAgIH1cbiAgICB9KTtcblxuICAgIGNvbnN0IGNhbGxiYWNrcyA9IHtcbiAgICAgICAgb25EYXRhOiAoKSA9PiB7fSxcbiAgICAgICAgb25FcnJvcjogKCkgPT4ge31cbiAgICB9O1xuXG4gICAgY29uc3QgY2hhaW4gPSB7XG4gICAgICAgIGRhdGE6IChjYiA9ICgpID0+IHt9KSA9PiB7XG4gICAgICAgICAgICBjYWxsYmFja3Mub25EYXRhID0gY2I7XG4gICAgICAgICAgICByZXR1cm4gY2hhaW47XG4gICAgICAgIH0sXG4gICAgICAgIGVycm9yOiAoY2IgPSAoKSA9PiB7fSkgPT4ge1xuICAgICAgICAgICAgY2FsbGJhY2tzLm9uRXJyb3IgPSBjYjtcbiAgICAgICAgICAgIHJldHVybiBjaGFpbjtcbiAgICAgICAgfVxuICAgIH07XG5cbiAgICBjb25zdCBldmVudEhhbmRsZXIgPSBhc3luYyBldmVudCA9PiB7XG4gICAgXG4gICAgICAgIHRyeSB7XG5cbiAgICAgICAgICAgIGNvbnN0IGpvYkRldGFpbHMgPSBhd2FpdCBmZXRjaEpvYkRldGFpbHMoZXZlbnQucmV0dXJuVmFsdWVzLmpvYklkLCBjb25maWcpO1xuICAgICAgICAgICAgY2FsbGJhY2tzLm9uRGF0YSh7XG4gICAgICAgICAgICAgICAgcmVjb3JkczogW2pvYkRldGFpbHNdLFxuICAgICAgICAgICAgICAgIGV2ZW50XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfSBjYXRjaChlcnIpIHtcbiAgICAgICAgICAgIGNhbGxiYWNrcy5vbkVycm9yKGVycik7XG4gICAgICAgIH0gICAgICAgICAgICBcbiAgICB9O1xuXG4gICAgbGV0IGpvYkNvbnRyb2xsZXIgPSBsb2NhbENhY2hlLmdldCgnam9iQ29udHJvbGxlcicpO1xuXG4gICAgaWYgKCFqb2JDb250cm9sbGVyKSB7XG5cbiAgICAgICAgam9iQ29udHJvbGxlciA9IGF3YWl0IGZldGNoSm9iQ29udHJvbGxlckFkZHJlc3MoY29uZmlnKTtcbiAgICB9XG5cbiAgICBjb25zdCBqY3RybCA9IG5ldyBjb25maWcud2ViMy5ldGguQ29udHJhY3QoY29uZmlnLmNvbnRyYWN0cy5Db2duaXRpdmVKb2JDb250cm9sbGVyLmFiaSwgam9iQ29udHJvbGxlcik7XG4gICAgXG4gICAgLy8gV2UgbGlzdGVuIGZvciB0d28gZXZlbnRzIGJlY2F1c2Ugb2YgdGhlaXIgbmF0dXJlIG1lYW5zIGFsbW9zdCB0aGUgc2FtZVxuICAgIGNoYWluLmV2ZW50ID0gW107ICAgIFxuICAgIGNoYWluLmV2ZW50LnB1c2goamN0cmwuZXZlbnRzLkpvYlN0YXRlQ2hhbmdlZChvcHRpb25zKVxuICAgICAgICAub24oJ2RhdGEnLCBldmVudEhhbmRsZXIpXG4gICAgICAgIC5vbignZXJyb3InLCBjYWxsYmFja3Mub25FcnJvcikpO1xuICAgIGNoYWluLmV2ZW50WzBdLm5hbWUgPSAnSm9iU3RhdGVDaGFuZ2VkJztcblxuICAgIGNoYWluLmV2ZW50LnB1c2goamN0cmwuZXZlbnRzLkNvZ25pdGlvblByb2dyZXNzZWQob3B0aW9ucylcbiAgICAgICAgLm9uKCdkYXRhJywgZXZlbnRIYW5kbGVyKVxuICAgICAgICAub24oJ2Vycm9yJywgY2FsbGJhY2tzLm9uRXJyb3IpKTtcbiAgICBjaGFpbi5ldmVudFsxXS5uYW1lID0gJ0NvZ25pdGlvblByb2dyZXNzZWQnO1xuXG4gICAgcmV0dXJuIGNoYWluO1xufTtcbiJdfQ==