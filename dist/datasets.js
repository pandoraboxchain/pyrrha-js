/**
 * Datasets related methods
 * This file it is a part of the Pandora Pyrrha Javascript library
 * 
 * @file datasets.js
 * @author Kostiantyn Smyrnov <kostysh@gmail.com>
 * @date 2018
 */
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.eventDatasetRemoved = exports.eventDatasetAdded = exports.removeDataset = exports.addToMarket = exports.deploy = exports.fetchAll = exports.fetchDatasetById = exports.fetchDataset = exports.fetchMetadata = exports.fetchDescription = exports.fetchBatchesCount = exports.fetchCurrentPrice = exports.fetchDataDim = exports.fetchIpfsAddress = exports.fetchAddressById = exports.fetchCount = void 0;

require("core-js/modules/es6.array.for-each");

require("core-js/modules/es6.array.filter");

require("core-js/modules/es6.object.keys");

require("core-js/modules/es6.object.define-property");

require("core-js/modules/es7.symbol.async-iterator");

require("core-js/modules/es6.symbol");

require("core-js/modules/es6.array.is-array");

require("core-js/modules/es6.promise");

require("core-js/modules/web.dom.iterable");

require("core-js/modules/es6.array.iterator");

require("core-js/modules/es6.string.iterator");

require("core-js/modules/es6.number.constructor");

require("core-js/modules/es6.number.parse-int");

require("regenerator-runtime/runtime");

var expect = _interopRequireWildcard(require("./helpers/expect"));

var _errors = _interopRequireWildcard(require("./helpers/errors"));

var web3Helpers = _interopRequireWildcard(require("./helpers/web3"));

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
 * Get datasets count from PandoraMarket contract
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
        mar,
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
              'contracts.PandoraMarket.abi': {
                type: 'object',
                code: _errors.CONTRACT_REQUIRED,
                args: ['PandoraMarket']
              },
              'addresses.PandoraMarket': {
                type: 'address',
                code: _errors.ADDRESS_REQUIRED,
                args: ['PandoraMarket']
              }
            });
            mar = new config.web3.eth.Contract(config.contracts.PandoraMarket.abi, config.addresses.PandoraMarket);
            _context.next = 5;
            return mar.methods.datasetsCount().call();

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
 * Get Dataset address by dataset id
 * 
 * @param {number} id
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
        mar,
        datasetContract,
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
              'contracts.PandoraMarket.abi': {
                type: 'object',
                code: _errors.CONTRACT_REQUIRED,
                args: ['PandoraMarket']
              },
              'addresses.PandoraMarket': {
                type: 'address',
                code: _errors.ADDRESS_REQUIRED,
                args: ['Market']
              }
            });
            mar = new config.web3.eth.Contract(config.contracts.PandoraMarket.abi, config.addresses.PandoraMarket);
            _context2.next = 6;
            return mar.methods.datasets(id).call();

          case 6:
            datasetContract = _context2.sent;
            return _context2.abrupt("return", datasetContract);

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
 * Get IPFS address from Dataset contract by the dataset address
 * 
 * @param {String} address
 * @param {Object} config Library config (provided by the proxy but can be overridden)
 * @returns {Promise} A Promise object represents the {String}
 */


exports.fetchAddressById = fetchAddressById;

var fetchIpfsAddress =
/*#__PURE__*/
function () {
  var _ref3 = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee3() {
    var address,
        config,
        dat,
        ipfsAddress,
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
              'contracts.Dataset.abi': {
                type: 'object',
                code: _errors.CONTRACT_REQUIRED,
                args: ['Dataset']
              }
            });
            dat = new config.web3.eth.Contract(config.contracts.Dataset.abi, address);
            _context3.next = 7;
            return dat.methods.ipfsAddress().call();

          case 7:
            ipfsAddress = _context3.sent;
            return _context3.abrupt("return", config.web3.utils.hexToAscii(ipfsAddress));

          case 9:
          case "end":
            return _context3.stop();
        }
      }
    }, _callee3, this);
  }));

  return function fetchIpfsAddress() {
    return _ref3.apply(this, arguments);
  };
}();
/**
 * Get data dim from Dataset contract by the dataset address
 * 
 * @param {String} address
 * @param {Object} config Library config (provided by the proxy but can be overridden)
 * @returns {Promise} A Promise object represents the {number}
 */


exports.fetchIpfsAddress = fetchIpfsAddress;

var fetchDataDim =
/*#__PURE__*/
function () {
  var _ref4 = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee4() {
    var address,
        config,
        dat,
        dataDim,
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
              'contracts.Dataset.abi': {
                type: 'object',
                code: _errors.CONTRACT_REQUIRED,
                args: ['Dataset']
              }
            });
            dat = new config.web3.eth.Contract(config.contracts.Dataset.abi, address);
            _context4.next = 7;
            return dat.methods.dataDim().call();

          case 7:
            dataDim = _context4.sent;
            return _context4.abrupt("return", Number.parseInt(dataDim, 10));

          case 9:
          case "end":
            return _context4.stop();
        }
      }
    }, _callee4, this);
  }));

  return function fetchDataDim() {
    return _ref4.apply(this, arguments);
  };
}();
/**
 * Get current price from Dataset contract by the dataset address
 * 
 * @param {String} address
 * @param {Object} config Library config (provided by the proxy but can be overridden)
 * @returns {Promise} A Promise object represents the {number}
 */


exports.fetchDataDim = fetchDataDim;

var fetchCurrentPrice =
/*#__PURE__*/
function () {
  var _ref5 = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee5() {
    var address,
        config,
        dat,
        currentPrice,
        _args5 = arguments;
    return regeneratorRuntime.wrap(function _callee5$(_context5) {
      while (1) {
        switch (_context5.prev = _context5.next) {
          case 0:
            address = _args5.length > 0 && _args5[0] !== undefined ? _args5[0] : '';
            config = _args5.length > 1 && _args5[1] !== undefined ? _args5[1] : {};
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
              'contracts.Dataset.abi': {
                type: 'object',
                code: _errors.CONTRACT_REQUIRED,
                args: ['Dataset']
              }
            });
            dat = new config.web3.eth.Contract(config.contracts.Dataset.abi, address);
            _context5.next = 7;
            return dat.methods.currentPrice().call();

          case 7:
            currentPrice = _context5.sent;
            return _context5.abrupt("return", Number.parseInt(currentPrice, 10));

          case 9:
          case "end":
            return _context5.stop();
        }
      }
    }, _callee5, this);
  }));

  return function fetchCurrentPrice() {
    return _ref5.apply(this, arguments);
  };
}();
/**
 * Get data batches count from Dataset contract by the dataset address
 * 
 * @param {String} address
 * @param {Object} config Library config (provided by the proxy but can be overridden)
 * @returns {Promise} A Promise object represents the {number}
 */


exports.fetchCurrentPrice = fetchCurrentPrice;

var fetchBatchesCount =
/*#__PURE__*/
function () {
  var _ref6 = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee6() {
    var address,
        config,
        dat,
        batchesCount,
        _args6 = arguments;
    return regeneratorRuntime.wrap(function _callee6$(_context6) {
      while (1) {
        switch (_context6.prev = _context6.next) {
          case 0:
            address = _args6.length > 0 && _args6[0] !== undefined ? _args6[0] : '';
            config = _args6.length > 1 && _args6[1] !== undefined ? _args6[1] : {};
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
              'contracts.Dataset.abi': {
                type: 'object',
                code: _errors.CONTRACT_REQUIRED,
                args: ['Dataset']
              }
            });
            dat = new config.web3.eth.Contract(config.contracts.Dataset.abi, address);
            _context6.next = 7;
            return dat.methods.batchesCount().call();

          case 7:
            batchesCount = _context6.sent;
            return _context6.abrupt("return", Number.parseInt(batchesCount, 10));

          case 9:
          case "end":
            return _context6.stop();
        }
      }
    }, _callee6, this);
  }));

  return function fetchBatchesCount() {
    return _ref6.apply(this, arguments);
  };
}();
/**
 * Get description from Dataset contract by the dataset address
 * 
 * @param {String} address
 * @param {Object} config Library config (provided by the proxy but can be overridden)
 * @returns {Promise} A Promise object represents the {number}
 */


exports.fetchBatchesCount = fetchBatchesCount;

var fetchDescription =
/*#__PURE__*/
function () {
  var _ref7 = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee7() {
    var address,
        config,
        dat,
        description,
        _args7 = arguments;
    return regeneratorRuntime.wrap(function _callee7$(_context7) {
      while (1) {
        switch (_context7.prev = _context7.next) {
          case 0:
            address = _args7.length > 0 && _args7[0] !== undefined ? _args7[0] : '';
            config = _args7.length > 1 && _args7[1] !== undefined ? _args7[1] : {};
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
              'contracts.Dataset.abi': {
                type: 'object',
                code: _errors.CONTRACT_REQUIRED,
                args: ['Dataset']
              }
            });
            dat = new config.web3.eth.Contract(config.contracts.Dataset.abi, address);
            _context7.next = 7;
            return dat.methods.description().call();

          case 7:
            description = _context7.sent;
            return _context7.abrupt("return", config.web3.utils.hexToUtf8(description));

          case 9:
          case "end":
            return _context7.stop();
        }
      }
    }, _callee7, this);
  }));

  return function fetchDescription() {
    return _ref7.apply(this, arguments);
  };
}();
/**
 * Get metadata from Dataset contract by the dataset address
 * 
 * @param {String} address
 * @param {Object} config Library config (provided by the proxy but can be overridden)
 * @returns {Promise} A Promise object represents the {number}
 */


exports.fetchDescription = fetchDescription;

var fetchMetadata =
/*#__PURE__*/
function () {
  var _ref8 = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee8() {
    var address,
        config,
        dat,
        metadata,
        _args8 = arguments;
    return regeneratorRuntime.wrap(function _callee8$(_context8) {
      while (1) {
        switch (_context8.prev = _context8.next) {
          case 0:
            address = _args8.length > 0 && _args8[0] !== undefined ? _args8[0] : '';
            config = _args8.length > 1 && _args8[1] !== undefined ? _args8[1] : {};
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
              'contracts.Dataset.abi': {
                type: 'object',
                code: _errors.CONTRACT_REQUIRED,
                args: ['Dataset']
              }
            });
            dat = new config.web3.eth.Contract(config.contracts.Dataset.abi, address);
            _context8.next = 7;
            return dat.methods.metadata().call();

          case 7:
            metadata = _context8.sent;
            return _context8.abrupt("return", config.web3.utils.hexToUtf8(metadata));

          case 9:
          case "end":
            return _context8.stop();
        }
      }
    }, _callee8, this);
  }));

  return function fetchMetadata() {
    return _ref8.apply(this, arguments);
  };
}();
/**
 * Get dataset by the dataset address
 * 
 * @param {String} address
 * @param {Object} config Library config (provided by the proxy but can be overridden)
 * @returns {Promise} Promise object represents the {Object[]}
 */


exports.fetchMetadata = fetchMetadata;

var fetchDataset =
/*#__PURE__*/
function () {
  var _ref9 = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee9() {
    var address,
        config,
        _ref10,
        _ref11,
        ipfsAddress,
        dataDim,
        currentPrice,
        batchesCount,
        metadata,
        description,
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
            _context9.next = 5;
            return Promise.all([fetchIpfsAddress(address, config), fetchDataDim(address, config), fetchCurrentPrice(address, config), fetchBatchesCount(address, config), fetchMetadata(address, config), fetchDescription(address, config)]);

          case 5:
            _ref10 = _context9.sent;
            _ref11 = _slicedToArray(_ref10, 6);
            ipfsAddress = _ref11[0];
            dataDim = _ref11[1];
            currentPrice = _ref11[2];
            batchesCount = _ref11[3];
            metadata = _ref11[4];
            description = _ref11[5];
            return _context9.abrupt("return", {
              address: address,
              ipfsAddress: ipfsAddress,
              dataDim: dataDim,
              currentPrice: currentPrice,
              batchesCount: batchesCount,
              metadata: metadata,
              description: description
            });

          case 14:
          case "end":
            return _context9.stop();
        }
      }
    }, _callee9, this);
  }));

  return function fetchDataset() {
    return _ref9.apply(this, arguments);
  };
}();
/**
 * Get dataset by id
 * 
 * @param {number} id 
 * @param {Object} config Library config (provided by the proxy but can be overridden)
 * @returns {Promise} A Promise object represents the {Object}
 */


exports.fetchDataset = fetchDataset;

var fetchDatasetById =
/*#__PURE__*/
function () {
  var _ref12 = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee10(id) {
    var config,
        address,
        dataset,
        _args10 = arguments;
    return regeneratorRuntime.wrap(function _callee10$(_context10) {
      while (1) {
        switch (_context10.prev = _context10.next) {
          case 0:
            config = _args10.length > 1 && _args10[1] !== undefined ? _args10[1] : {};
            _context10.next = 3;
            return fetchAddressById(id, config);

          case 3:
            address = _context10.sent;
            _context10.next = 6;
            return fetchDataset(address, config);

          case 6:
            dataset = _context10.sent;
            return _context10.abrupt("return", dataset);

          case 8:
          case "end":
            return _context10.stop();
        }
      }
    }, _callee10, this);
  }));

  return function fetchDatasetById(_x2) {
    return _ref12.apply(this, arguments);
  };
}();
/**
 * Get all datasets
 * 
 * @param {Object} config Library config (provided by the proxy but can be overridden)
 * @returns {Promise} Promise object represents the {Object[]}
 */


exports.fetchDatasetById = fetchDatasetById;

var fetchAll =
/*#__PURE__*/
function () {
  var _ref13 = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee11() {
    var config,
        records,
        error,
        count,
        i,
        dataset,
        _args11 = arguments;
    return regeneratorRuntime.wrap(function _callee11$(_context11) {
      while (1) {
        switch (_context11.prev = _context11.next) {
          case 0:
            config = _args11.length > 0 && _args11[0] !== undefined ? _args11[0] : {};
            records = [];
            error = [];
            _context11.prev = 3;
            _context11.next = 6;
            return fetchCount(config);

          case 6:
            count = _context11.sent;
            i = 0;

          case 8:
            if (!(i < count)) {
              _context11.next = 22;
              break;
            }

            _context11.prev = 9;
            _context11.next = 12;
            return fetchDatasetById(i, config);

          case 12:
            dataset = _context11.sent;
            records.push(_objectSpread({
              id: i
            }, dataset));
            _context11.next = 19;
            break;

          case 16:
            _context11.prev = 16;
            _context11.t0 = _context11["catch"](9);
            error.push({
              id: i,
              message: _context11.t0.message
            });

          case 19:
            i++;
            _context11.next = 8;
            break;

          case 22:
            _context11.next = 27;
            break;

          case 24:
            _context11.prev = 24;
            _context11.t1 = _context11["catch"](3);
            error.push({
              error: _context11.t1.message
            });

          case 27:
            return _context11.abrupt("return", {
              records: records,
              error: error
            });

          case 28:
          case "end":
            return _context11.stop();
        }
      }
    }, _callee11, this, [[3, 24], [9, 16]]);
  }));

  return function fetchAll() {
    return _ref13.apply(this, arguments);
  };
}();
/**
 * Deploy Datset contract to the network
 * 
 * @param {String} datasetIpfsHash 
 * @param {Number} batchesCount Count of batches in dataset
 * @param {Object} options { dimension, price, metadata, description } 
 * @param {String} publisher Publisher address
 * @param {Object} config Library config (provided by the proxy but can be overridden)
 * @returns {Promise} Promise object resolved to contract address
 */


exports.fetchAll = fetchAll;

var deploy =
/*#__PURE__*/
function () {
  var _ref15 = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee12(datasetIpfsHash, batchesCount, _ref14, publisher) {
    var dimension,
        price,
        metadata,
        description,
        config,
        args,
        gas,
        datasetContractAddress,
        _args12 = arguments;
    return regeneratorRuntime.wrap(function _callee12$(_context12) {
      while (1) {
        switch (_context12.prev = _context12.next) {
          case 0:
            dimension = _ref14.dimension, price = _ref14.price, metadata = _ref14.metadata, description = _ref14.description;
            config = _args12.length > 4 && _args12[4] !== undefined ? _args12[4] : {};
            expect.all({
              datasetIpfsHash: datasetIpfsHash,
              batchesCount: batchesCount,
              publisher: publisher,
              dimension: dimension,
              price: price,
              metadata: metadata,
              description: description
            }, {
              'datasetIpfsHash': {
                type: 'string'
              },
              'batchesCount': {
                type: 'number'
              },
              'publisher': {
                type: 'address'
              },
              'dimension': {
                type: 'number'
              },
              'price': {
                type: 'number'
              },
              'metadata': {
                type: 'string'
              },
              'description': {
                type: 'string'
              }
            });
            expect.all(config, {
              'web3': {
                type: 'object',
                code: _errors.WEB3_REQUIRED
              },
              'contracts.Dataset': {
                type: 'object',
                code: _errors.CONTRACT_REQUIRED,
                args: ['Dataset']
              },
              'web3.currentProvider.isMetaMask': {
                type: 'boolean',
                code: _errors.WEB3_METAMASK_REQUIRED
              }
            });
            args = [config.web3.utils.utf8ToHex(datasetIpfsHash), dimension, batchesCount, config.web3.utils.toHex(price), config.web3.utils.utf8ToHex(metadata), config.web3.utils.utf8ToHex(description)]; // Estimate required amount of gas

            _context12.next = 7;
            return web3Helpers.estimateGas(config.contracts.Dataset.bytecode, args, config);

          case 7:
            gas = _context12.sent;
            _context12.next = 10;
            return web3Helpers.deployContract(config.contracts.Dataset, {
              args: args,
              from: publisher,
              gas: Number.parseInt(gas * 1.5, 10)
            }, config);

          case 10:
            datasetContractAddress = _context12.sent;
            return _context12.abrupt("return", datasetContractAddress);

          case 12:
          case "end":
            return _context12.stop();
        }
      }
    }, _callee12, this);
  }));

  return function deploy(_x3, _x4, _x5, _x6) {
    return _ref15.apply(this, arguments);
  };
}();
/**
 * Add dataset to market
 * 
 * @param {String} datasetContractAddress 
 * @param {String} publisherAddress 
 * @param {Object} config Library config (provided by the proxy but can be overridden)
 * @returns {Promise} Promise object resolved to {String} contractAddress
 */


exports.deploy = deploy;

var addToMarket = function addToMarket(datasetContractAddress, publisherAddress) {
  var config = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
  return new Promise(
  /*#__PURE__*/
  function () {
    var _ref16 = _asyncToGenerator(
    /*#__PURE__*/
    regeneratorRuntime.mark(function _callee13(resolve, reject) {
      var market, gasPrice;
      return regeneratorRuntime.wrap(function _callee13$(_context13) {
        while (1) {
          switch (_context13.prev = _context13.next) {
            case 0:
              expect.all({
                datasetContractAddress: datasetContractAddress,
                publisherAddress: publisherAddress
              }, {
                'datasetContractAddress': {
                  type: 'address'
                },
                'publisherAddress': {
                  type: 'address'
                }
              });
              expect.all(config, {
                'web3': {
                  type: 'object',
                  code: _errors.WEB3_REQUIRED
                },
                'contracts.PandoraMarket.abi': {
                  type: 'object',
                  code: _errors.CONTRACT_REQUIRED,
                  args: ['PandoraMarket']
                },
                'addresses.PandoraMarket': {
                  type: 'address',
                  code: _errors.ADDRESS_REQUIRED,
                  args: ['Market']
                },
                'web3.currentProvider.isMetaMask': {
                  type: 'boolean',
                  code: _errors.WEB3_METAMASK_REQUIRED
                }
              });
              market = new config.web3.eth.Contract(config.contracts.PandoraMarket.abi, config.addresses.PandoraMarket);
              _context13.next = 5;
              return config.web3.eth.getGasPrice();

            case 5:
              gasPrice = _context13.sent;
              market.methods.addDataset(datasetContractAddress).send({
                from: publisherAddress,
                gasPrice: gasPrice
              }).on('error', reject).on('receipt', function (receipt) {
                if (Number(receipt.status) === 0) {
                  return reject((0, _errors.default)(_errors.TRANSACTION_UNSUCCESSFUL));
                }

                resolve(receipt.contractAddress || receipt.events.DatasetAdded.returnValues.dataset);
              }); // @note In case of ganache-cli blockchain "contractAddress" always will be equal to null

            case 7:
            case "end":
              return _context13.stop();
          }
        }
      }, _callee13, this);
    }));

    return function (_x7, _x8) {
      return _ref16.apply(this, arguments);
    };
  }());
};
/**
 * Remove dataset from PandoraMarket
 * 
 * @param {String} datasetAddress
 * @param {String} publisherAddress 
 * @param {Object} config Library config (provided by the proxy but can be overridden) 
 */


exports.addToMarket = addToMarket;

var removeDataset = function removeDataset(datasetAddress, publisherAddress) {
  var config = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
  return new Promise(
  /*#__PURE__*/
  function () {
    var _ref17 = _asyncToGenerator(
    /*#__PURE__*/
    regeneratorRuntime.mark(function _callee14(resolve, reject) {
      var market, gasPrice;
      return regeneratorRuntime.wrap(function _callee14$(_context14) {
        while (1) {
          switch (_context14.prev = _context14.next) {
            case 0:
              expect.all({
                datasetAddress: datasetAddress,
                publisherAddress: publisherAddress
              }, {
                'datasetAddress': {
                  type: 'address'
                },
                'publisherAddress': {
                  type: 'address'
                }
              });
              expect.all(config, {
                'web3': {
                  type: 'object',
                  code: _errors.WEB3_REQUIRED
                },
                'contracts.PandoraMarket.abi': {
                  type: 'object',
                  code: _errors.CONTRACT_REQUIRED,
                  args: ['PandoraMarket']
                },
                'addresses.PandoraMarket': {
                  type: 'address',
                  code: _errors.ADDRESS_REQUIRED,
                  args: ['PandoraMarket']
                }
              });
              market = new config.web3.eth.Contract(config.contracts.PandoraMarket.abi, config.addresses.PandoraMarket);
              _context14.next = 5;
              return config.web3.eth.getGasPrice();

            case 5:
              gasPrice = _context14.sent;
              market.methods.removeDataset(datasetAddress).send({
                from: publisherAddress,
                gasPrice: gasPrice
              }).on('error', reject).on('receipt', function (receipt) {
                if (Number(receipt.status) === 0) {
                  return reject((0, _errors.default)(_errors.TRANSACTION_UNSUCCESSFUL));
                }

                resolve(receipt.contractAddress);
              });

            case 7:
            case "end":
              return _context14.stop();
          }
        }
      }, _callee14, this);
    }));

    return function (_x9, _x10) {
      return _ref17.apply(this, arguments);
    };
  }());
};
/**
 * Handle event DatasetAdded
 * 
 * @param {Object} options Event handler options
 * @param {Object} config Library config (provided by the proxy but can be overridden)
 * @returns {Promise<{Object}>} PPromise object resolved to the object with chained callbacks #data and #error
 */


exports.removeDataset = removeDataset;

var eventDatasetAdded =
/*#__PURE__*/
function () {
  var _ref18 = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee16() {
    var options,
        config,
        callbacks,
        chain,
        mar,
        _args16 = arguments;
    return regeneratorRuntime.wrap(function _callee16$(_context16) {
      while (1) {
        switch (_context16.prev = _context16.next) {
          case 0:
            options = _args16.length > 0 && _args16[0] !== undefined ? _args16[0] : {};
            config = _args16.length > 1 && _args16[1] !== undefined ? _args16[1] : {};
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
              'contracts.PandoraMarket.abi': {
                type: 'object',
                code: _errors.CONTRACT_REQUIRED,
                args: ['PandoraMarket']
              },
              'addresses.PandoraMarket': {
                type: 'address',
                code: _errors.ADDRESS_REQUIRED,
                args: ['Market']
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
            mar = new config.web3.eth.Contract(config.contracts.PandoraMarket.abi, config.addresses.PandoraMarket);
            chain.event = [];
            chain.event[0] = mar.events.DatasetAdded(options).on('data',
            /*#__PURE__*/
            function () {
              var _ref19 = _asyncToGenerator(
              /*#__PURE__*/
              regeneratorRuntime.mark(function _callee15(event) {
                var dataset;
                return regeneratorRuntime.wrap(function _callee15$(_context15) {
                  while (1) {
                    switch (_context15.prev = _context15.next) {
                      case 0:
                        _context15.prev = 0;
                        _context15.next = 3;
                        return fetchDataset(event.returnValues.dataset, config);

                      case 3:
                        dataset = _context15.sent;
                        callbacks.onData({
                          records: [dataset],
                          event: event
                        });
                        _context15.next = 10;
                        break;

                      case 7:
                        _context15.prev = 7;
                        _context15.t0 = _context15["catch"](0);
                        callbacks.onError(_context15.t0);

                      case 10:
                      case "end":
                        return _context15.stop();
                    }
                  }
                }, _callee15, this, [[0, 7]]);
              }));

              return function (_x11) {
                return _ref19.apply(this, arguments);
              };
            }()).on('error', callbacks.onError);
            chain.event[0].name = 'DatasetAdded';
            return _context16.abrupt("return", chain);

          case 11:
          case "end":
            return _context16.stop();
        }
      }
    }, _callee16, this);
  }));

  return function eventDatasetAdded() {
    return _ref18.apply(this, arguments);
  };
}();
/**
 * Handle event DatasetRemoved
 * 
 * @param {Object} options Event handler options
 * @param {Object} config Library config (provided by the proxy but can be overridden)
 * @returns {Promise<{Object}>} PPromise object resolved to the object with chained callbacks #data and #error
 */


exports.eventDatasetAdded = eventDatasetAdded;

var eventDatasetRemoved =
/*#__PURE__*/
function () {
  var _ref20 = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee18() {
    var options,
        config,
        callbacks,
        chain,
        mar,
        _args18 = arguments;
    return regeneratorRuntime.wrap(function _callee18$(_context18) {
      while (1) {
        switch (_context18.prev = _context18.next) {
          case 0:
            options = _args18.length > 0 && _args18[0] !== undefined ? _args18[0] : {};
            config = _args18.length > 1 && _args18[1] !== undefined ? _args18[1] : {};
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
              'contracts.PandoraMarket.abi': {
                type: 'object',
                code: _errors.CONTRACT_REQUIRED,
                args: ['PandoraMarket']
              },
              'addresses.PandoraMarket': {
                type: 'address',
                code: _errors.ADDRESS_REQUIRED,
                args: ['PandoraMarket']
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
            mar = new config.web3.eth.Contract(config.contracts.PandoraMarket.abi, config.addresses.PandoraMarket);
            chain.event = [];
            chain.event[0] = mar.events.DatasetRemoved(options).on('data',
            /*#__PURE__*/
            function () {
              var _ref21 = _asyncToGenerator(
              /*#__PURE__*/
              regeneratorRuntime.mark(function _callee17(event) {
                return regeneratorRuntime.wrap(function _callee17$(_context17) {
                  while (1) {
                    switch (_context17.prev = _context17.next) {
                      case 0:
                        callbacks.onData({
                          records: [{
                            address: event.returnValues.dataset
                          }],
                          event: event
                        });

                      case 1:
                      case "end":
                        return _context17.stop();
                    }
                  }
                }, _callee17, this);
              }));

              return function (_x12) {
                return _ref21.apply(this, arguments);
              };
            }()).on('error', callbacks.onError);
            chain.event[0].name = 'DatasetRemoved';
            return _context18.abrupt("return", chain);

          case 11:
          case "end":
            return _context18.stop();
        }
      }
    }, _callee18, this);
  }));

  return function eventDatasetRemoved() {
    return _ref20.apply(this, arguments);
  };
}();

exports.eventDatasetRemoved = eventDatasetRemoved;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9kYXRhc2V0cy5qcyJdLCJuYW1lcyI6WyJmZXRjaENvdW50IiwiY29uZmlnIiwiZXhwZWN0IiwiYWxsIiwidHlwZSIsImNvZGUiLCJXRUIzX1JFUVVJUkVEIiwiQ09OVFJBQ1RfUkVRVUlSRUQiLCJhcmdzIiwiQUREUkVTU19SRVFVSVJFRCIsIm1hciIsIndlYjMiLCJldGgiLCJDb250cmFjdCIsImNvbnRyYWN0cyIsIlBhbmRvcmFNYXJrZXQiLCJhYmkiLCJhZGRyZXNzZXMiLCJtZXRob2RzIiwiZGF0YXNldHNDb3VudCIsImNhbGwiLCJjb3VudCIsIk51bWJlciIsInBhcnNlSW50IiwiZmV0Y2hBZGRyZXNzQnlJZCIsImlkIiwiZGF0YXNldHMiLCJkYXRhc2V0Q29udHJhY3QiLCJmZXRjaElwZnNBZGRyZXNzIiwiYWRkcmVzcyIsImRhdCIsIkRhdGFzZXQiLCJpcGZzQWRkcmVzcyIsInV0aWxzIiwiaGV4VG9Bc2NpaSIsImZldGNoRGF0YURpbSIsImRhdGFEaW0iLCJmZXRjaEN1cnJlbnRQcmljZSIsImN1cnJlbnRQcmljZSIsImZldGNoQmF0Y2hlc0NvdW50IiwiYmF0Y2hlc0NvdW50IiwiZmV0Y2hEZXNjcmlwdGlvbiIsImRlc2NyaXB0aW9uIiwiaGV4VG9VdGY4IiwiZmV0Y2hNZXRhZGF0YSIsIm1ldGFkYXRhIiwiZmV0Y2hEYXRhc2V0IiwiUHJvbWlzZSIsImZldGNoRGF0YXNldEJ5SWQiLCJkYXRhc2V0IiwiZmV0Y2hBbGwiLCJyZWNvcmRzIiwiZXJyb3IiLCJpIiwicHVzaCIsIm1lc3NhZ2UiLCJkZXBsb3kiLCJkYXRhc2V0SXBmc0hhc2giLCJwdWJsaXNoZXIiLCJkaW1lbnNpb24iLCJwcmljZSIsIldFQjNfTUVUQU1BU0tfUkVRVUlSRUQiLCJ1dGY4VG9IZXgiLCJ0b0hleCIsIndlYjNIZWxwZXJzIiwiZXN0aW1hdGVHYXMiLCJieXRlY29kZSIsImdhcyIsImRlcGxveUNvbnRyYWN0IiwiZnJvbSIsImRhdGFzZXRDb250cmFjdEFkZHJlc3MiLCJhZGRUb01hcmtldCIsInB1Ymxpc2hlckFkZHJlc3MiLCJyZXNvbHZlIiwicmVqZWN0IiwibWFya2V0IiwiZ2V0R2FzUHJpY2UiLCJnYXNQcmljZSIsImFkZERhdGFzZXQiLCJzZW5kIiwib24iLCJyZWNlaXB0Iiwic3RhdHVzIiwiVFJBTlNBQ1RJT05fVU5TVUNDRVNTRlVMIiwiY29udHJhY3RBZGRyZXNzIiwiZXZlbnRzIiwiRGF0YXNldEFkZGVkIiwicmV0dXJuVmFsdWVzIiwicmVtb3ZlRGF0YXNldCIsImRhdGFzZXRBZGRyZXNzIiwiZXZlbnREYXRhc2V0QWRkZWQiLCJvcHRpb25zIiwiY2FsbGJhY2tzIiwib25EYXRhIiwib25FcnJvciIsImNoYWluIiwiZGF0YSIsImNiIiwiZXZlbnQiLCJuYW1lIiwiZXZlbnREYXRhc2V0UmVtb3ZlZCIsIkRhdGFzZXRSZW1vdmVkIl0sIm1hcHBpbmdzIjoiQUFBQTs7Ozs7Ozs7QUFTQTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFFQTs7QUFDQTs7QUFPQTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFFQTs7Ozs7O0FBTU8sSUFBTUEsVUFBVTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUEsMEJBQUc7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQU9DLFlBQUFBLE1BQVAsMkRBQWdCLEVBQWhCO0FBRXRCQyxZQUFBQSxNQUFNLENBQUNDLEdBQVAsQ0FBV0YsTUFBWCxFQUFtQjtBQUNmLHNCQUFRO0FBQ0pHLGdCQUFBQSxJQUFJLEVBQUUsUUFERjtBQUVKQyxnQkFBQUEsSUFBSSxFQUFFQztBQUZGLGVBRE87QUFLZiw2Q0FBK0I7QUFDM0JGLGdCQUFBQSxJQUFJLEVBQUUsUUFEcUI7QUFFM0JDLGdCQUFBQSxJQUFJLEVBQUVFLHlCQUZxQjtBQUczQkMsZ0JBQUFBLElBQUksRUFBRSxDQUFDLGVBQUQ7QUFIcUIsZUFMaEI7QUFVZix5Q0FBMkI7QUFDdkJKLGdCQUFBQSxJQUFJLEVBQUUsU0FEaUI7QUFF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QWlFZixNQUFNLENBQUNnQixTQUFQLENBQWlCRixhQUFsRixDQXpDbUI7QUEwQy9CZ0YsWUFBQUEsS0FBSyxDQUFDRyxLQUFOLEdBQWMsRUFBZDtBQUNBSCxZQUFBQSxLQUFLLENBQUNHLEtBQU4sQ0FBWSxDQUFaLElBQWlCeEYsR0FBRyxDQUFDMkUsTUFBSixDQUFXZ0IsY0FBWCxDQUEwQlYsT0FBMUIsRUFDWlgsRUFEWSxDQUNULE1BRFM7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBLHNDQUNELG1CQUFNa0IsS0FBTjtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBRVJOLHdCQUFBQSxTQUFTLENBQUNDLE1BQVYsQ0FBaUI7QUFDYjFDLDBCQUFBQSxPQUFPLEVBQUUsQ0FBQztBQUFDdEIsNEJBQUFBLE9BQU8sRUFBRXFFLEtBQUssQ0FBQ1gsWUFBTixDQUFtQnRDO0FBQTdCLDJCQUFELENBREk7QUFFYmlELDBCQUFBQSxLQUFLLEVBQUxBO0FBRmEseUJBQWpCOztBQUZRO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBLGVBREM7O0FBQUE7QUFBQTtBQUFBO0FBQUEsaUJBUVpsQixFQVJZLENBUVQsT0FSUyxFQVFBWSxTQUFTLENBQUNFLE9BUlYsQ0FBakI7QUFTQUMsWUFBQUEsS0FBSyxDQUFDRyxLQUFOLENBQVksQ0FBWixFQUFlQyxJQUFmLEdBQXNCLGdCQUF0QjtBQXBEK0IsK0NBc0R4QkosS0F0RHdCOztBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBLEdBQUg7O0FBQUEsa0JBQW5CSyxtQkFBbUI7QUFBQTtBQUFBO0FBQUEsR0FBekIiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIERhdGFzZXRzIHJlbGF0ZWQgbWV0aG9kc1xuICogVGhpcyBmaWxlIGl0IGlzIGEgcGFydCBvZiB0aGUgUGFuZG9yYSBQeXJyaGEgSmF2YXNjcmlwdCBsaWJyYXJ5XG4gKiBcbiAqIEBmaWxlIGRhdGFzZXRzLmpzXG4gKiBAYXV0aG9yIEtvc3RpYW50eW4gU215cm5vdiA8a29zdHlzaEBnbWFpbC5jb20+XG4gKiBAZGF0ZSAyMDE4XG4gKi9cblxuJ3VzZSBzdHJpY3QnO1xuXG5pbXBvcnQgKiBhcyBleHBlY3QgZnJvbSAnLi9oZWxwZXJzL2V4cGVjdCc7XG5pbXBvcnQgcGpzRXJyb3IsIHtcbiAgICBDT05UUkFDVF9SRVFVSVJFRCxcbiAgICBBRERSRVNTX1JFUVVJUkVELFxuICAgIFdFQjNfUkVRVUlSRUQsXG4gICAgV0VCM19NRVRBTUFTS19SRVFVSVJFRCxcbiAgICBUUkFOU0FDVElPTl9VTlNVQ0NFU1NGVUxcbn0gZnJvbSAnLi9oZWxwZXJzL2Vycm9ycyc7XG5pbXBvcnQgKiBhcyB3ZWIzSGVscGVycyBmcm9tICcuL2hlbHBlcnMvd2ViMyc7XG5cbi8qKlxuICogR2V0IGRhdGFzZXRzIGNvdW50IGZyb20gUGFuZG9yYU1hcmtldCBjb250cmFjdFxuICogXG4gKiBAcGFyYW0ge09iamVjdH0gY29uZmlnIExpYnJhcnkgY29uZmlnIChwcm92aWRlZCBieSB0aGUgcHJveHkgYnV0IGNhbiBiZSBvdmVycmlkZGVuKVxuICogQHJldHVybnMge1Byb21pc2V9IEEgUHJvbWlzZSBvYmplY3QgcmVwcmVzZW50cyB0aGUge251bWJlcn0gXG4gKi9cbmV4cG9ydCBjb25zdCBmZXRjaENvdW50ID0gYXN5bmMgKGNvbmZpZyA9IHt9KSA9PiB7XG5cbiAgICBleHBlY3QuYWxsKGNvbmZpZywge1xuICAgICAgICAnd2ViMyc6IHtcbiAgICAgICAgICAgIHR5cGU6ICdvYmplY3QnLFxuICAgICAgICAgICAgY29kZTogV0VCM19SRVFVSVJFRFxuICAgICAgICB9LFxuICAgICAgICAnY29udHJhY3RzLlBhbmRvcmFNYXJrZXQuYWJpJzoge1xuICAgICAgICAgICAgdHlwZTogJ29iamVjdCcsXG4gICAgICAgICAgICBjb2RlOiBDT05UUkFDVF9SRVFVSVJFRCxcbiAgICAgICAgICAgIGFyZ3M6IFsnUGFuZG9yYU1hcmtldCddXG4gICAgICAgIH0sXG4gICAgICAgICdhZGRyZXNzZXMuUGFuZG9yYU1hcmtldCc6IHtcbiAgICAgICAgICAgIHR5cGU6ICdhZGRyZXNzJyxcbiAgICAgICAgICAgIGNvZGU6IEFERFJFU1NfUkVRVUlSRUQsXG4gICAgICAgICAgICBhcmdzOiBbJ1BhbmRvcmFNYXJrZXQnXVxuICAgICAgICB9XG4gICAgfSk7XG5cbiAgICBjb25zdCBtYXIgPSBuZXcgY29uZmlnLndlYjMuZXRoLkNvbnRyYWN0KGNvbmZpZy5jb250cmFjdHMuUGFuZG9yYU1hcmtldC5hYmksIGNvbmZpZy5hZGRyZXNzZXMuUGFuZG9yYU1hcmtldCk7XG4gICAgY29uc3QgY291bnQgPSBhd2FpdCBtYXIubWV0aG9kc1xuICAgICAgICAuZGF0YXNldHNDb3VudCgpXG4gICAgICAgIC5jYWxsKCk7XG5cbiAgICByZXR1cm4gTnVtYmVyLnBhcnNlSW50KGNvdW50LCAxMCk7XG59O1xuXG4vKipcbiAqIEdldCBEYXRhc2V0IGFkZHJlc3MgYnkgZGF0YXNldCBpZFxuICogXG4gKiBAcGFyYW0ge251bWJlcn0gaWRcbiAqIEBwYXJhbSB7T2JqZWN0fSBjb25maWcgTGlicmFyeSBjb25maWcgKHByb3ZpZGVkIGJ5IHRoZSBwcm94eSBidXQgY2FuIGJlIG92ZXJyaWRkZW4pXG4gKiBAcmV0dXJucyB7UHJvbWlzZX0gQSBQcm9taXNlIG9iamVjdCByZXByZXNlbnRzIHRoZSB7U3RyaW5nfVxuICovXG5leHBvcnQgY29uc3QgZmV0Y2hBZGRyZXNzQnlJZCA9IGFzeW5jIChpZCwgY29uZmlnID0ge30pID0+IHtcblxuICAgIGV4cGVjdC5hbGwoeyBpZCB9LCB7XG4gICAgICAgICdpZCc6IHtcbiAgICAgICAgICAgIHR5cGU6ICdudW1iZXInXG4gICAgICAgIH1cbiAgICB9KTtcblxuICAgIGV4cGVjdC5hbGwoY29uZmlnLCB7XG4gICAgICAgICd3ZWIzJzoge1xuICAgICAgICAgICAgdHlwZTogJ29iamVjdCcsXG4gICAgICAgICAgICBjb2RlOiBXRUIzX1JFUVVJUkVEXG4gICAgICAgIH0sXG4gICAgICAgICdjb250cmFjdHMuUGFuZG9yYU1hcmtldC5hYmknOiB7XG4gICAgICAgICAgICB0eXBlOiAnb2JqZWN0JyxcbiAgICAgICAgICAgIGNvZGU6IENPTlRSQUNUX1JFUVVJUkVELFxuICAgICAgICAgICAgYXJnczogWydQYW5kb3JhTWFya2V0J11cbiAgICAgICAgfSxcbiAgICAgICAgJ2FkZHJlc3Nlcy5QYW5kb3JhTWFya2V0Jzoge1xuICAgICAgICAgICAgdHlwZTogJ2FkZHJlc3MnLFxuICAgICAgICAgICAgY29kZTogQUREUkVTU19SRVFVSVJFRCxcbiAgICAgICAgICAgIGFyZ3M6IFsnTWFya2V0J11cbiAgICAgICAgfVxuICAgIH0pO1xuXG4gICAgY29uc3QgbWFyID0gbmV3IGNvbmZpZy53ZWIzLmV0aC5Db250cmFjdChjb25maWcuY29udHJhY3RzLlBhbmRvcmFNYXJrZXQuYWJpLCBjb25maWcuYWRkcmVzc2VzLlBhbmRvcmFNYXJrZXQpO1xuICAgIGNvbnN0IGRhdGFzZXRDb250cmFjdCA9IGF3YWl0IG1hci5tZXRob2RzXG4gICAgICAgIC5kYXRhc2V0cyhpZClcbiAgICAgICAgLmNhbGwoKTtcblxuICAgIHJldHVybiBkYXRhc2V0Q29udHJhY3Q7XG59O1xuXG4vKipcbiAqIEdldCBJUEZTIGFkZHJlc3MgZnJvbSBEYXRhc2V0IGNvbnRyYWN0IGJ5IHRoZSBkYXRhc2V0IGFkZHJlc3NcbiAqIFxuICogQHBhcmFtIHtTdHJpbmd9IGFkZHJlc3NcbiAqIEBwYXJhbSB7T2JqZWN0fSBjb25maWcgTGlicmFyeSBjb25maWcgKHByb3ZpZGVkIGJ5IHRoZSBwcm94eSBidXQgY2FuIGJlIG92ZXJyaWRkZW4pXG4gKiBAcmV0dXJucyB7UHJvbWlzZX0gQSBQcm9taXNlIG9iamVjdCByZXByZXNlbnRzIHRoZSB7U3RyaW5nfVxuICovXG5leHBvcnQgY29uc3QgZmV0Y2hJcGZzQWRkcmVzcyA9IGFzeW5jIChhZGRyZXNzID0gJycsIGNvbmZpZyA9IHt9KSA9PiB7XG5cbiAgICBleHBlY3QuYWxsKHsgYWRkcmVzcyB9LCB7XG4gICAgICAgICdhZGRyZXNzJzoge1xuICAgICAgICAgICAgdHlwZTogJ2FkZHJlc3MnXG4gICAgICAgIH1cbiAgICB9KTtcblxuICAgIGV4cGVjdC5hbGwoY29uZmlnLCB7XG4gICAgICAgICd3ZWIzJzoge1xuICAgICAgICAgICAgdHlwZTogJ29iamVjdCcsXG4gICAgICAgICAgICBjb2RlOiBXRUIzX1JFUVVJUkVEXG4gICAgICAgIH0sXG4gICAgICAgICdjb250cmFjdHMuRGF0YXNldC5hYmknOiB7XG4gICAgICAgICAgICB0eXBlOiAnb2JqZWN0JyxcbiAgICAgICAgICAgIGNvZGU6IENPTlRSQUNUX1JFUVVJUkVELFxuICAgICAgICAgICAgYXJnczogWydEYXRhc2V0J11cbiAgICAgICAgfVxuICAgIH0pO1xuXG4gICAgY29uc3QgZGF0ID0gbmV3IGNvbmZpZy53ZWIzLmV0aC5Db250cmFjdChjb25maWcuY29udHJhY3RzLkRhdGFzZXQuYWJpLCBhZGRyZXNzKTtcbiAgICBjb25zdCBpcGZzQWRkcmVzcyA9IGF3YWl0IGRhdC5tZXRob2RzXG4gICAgICAgIC5pcGZzQWRkcmVzcygpXG4gICAgICAgIC5jYWxsKCk7XG5cbiAgICByZXR1cm4gY29uZmlnLndlYjMudXRpbHMuaGV4VG9Bc2NpaShpcGZzQWRkcmVzcyk7XG59O1xuXG4vKipcbiAqIEdldCBkYXRhIGRpbSBmcm9tIERhdGFzZXQgY29udHJhY3QgYnkgdGhlIGRhdGFzZXQgYWRkcmVzc1xuICogXG4gKiBAcGFyYW0ge1N0cmluZ30gYWRkcmVzc1xuICogQHBhcmFtIHtPYmplY3R9IGNvbmZpZyBMaWJyYXJ5IGNvbmZpZyAocHJvdmlkZWQgYnkgdGhlIHByb3h5IGJ1dCBjYW4gYmUgb3ZlcnJpZGRlbilcbiAqIEByZXR1cm5zIHtQcm9taXNlfSBBIFByb21pc2Ugb2JqZWN0IHJlcHJlc2VudHMgdGhlIHtudW1iZXJ9XG4gKi9cbmV4cG9ydCBjb25zdCBmZXRjaERhdGFEaW0gPSBhc3luYyAoYWRkcmVzcyA9ICcnLCBjb25maWcgPSB7fSkgPT4ge1xuXG4gICAgZXhwZWN0LmFsbCh7IGFkZHJlc3MgfSwge1xuICAgICAgICAnYWRkcmVzcyc6IHtcbiAgICAgICAgICAgIHR5cGU6ICdhZGRyZXNzJ1xuICAgICAgICB9XG4gICAgfSk7XG5cbiAgICBleHBlY3QuYWxsKGNvbmZpZywge1xuICAgICAgICAnd2ViMyc6IHtcbiAgICAgICAgICAgIHR5cGU6ICdvYmplY3QnLFxuICAgICAgICAgICAgY29kZTogV0VCM19SRVFVSVJFRFxuICAgICAgICB9LFxuICAgICAgICAnY29udHJhY3RzLkRhdGFzZXQuYWJpJzoge1xuICAgICAgICAgICAgdHlwZTogJ29iamVjdCcsXG4gICAgICAgICAgICBjb2RlOiBDT05UUkFDVF9SRVFVSVJFRCxcbiAgICAgICAgICAgIGFyZ3M6IFsnRGF0YXNldCddXG4gICAgICAgIH1cbiAgICB9KTtcblxuICAgIGNvbnN0IGRhdCA9IG5ldyBjb25maWcud2ViMy5ldGguQ29udHJhY3QoY29uZmlnLmNvbnRyYWN0cy5EYXRhc2V0LmFiaSwgYWRkcmVzcyk7XG4gICAgY29uc3QgZGF0YURpbSA9IGF3YWl0IGRhdC5tZXRob2RzXG4gICAgICAgIC5kYXRhRGltKClcbiAgICAgICAgLmNhbGwoKTtcblxuICAgIHJldHVybiBOdW1iZXIucGFyc2VJbnQoZGF0YURpbSwgMTApO1xufTtcblxuLyoqXG4gKiBHZXQgY3VycmVudCBwcmljZSBmcm9tIERhdGFzZXQgY29udHJhY3QgYnkgdGhlIGRhdGFzZXQgYWRkcmVzc1xuICogXG4gKiBAcGFyYW0ge1N0cmluZ30gYWRkcmVzc1xuICogQHBhcmFtIHtPYmplY3R9IGNvbmZpZyBMaWJyYXJ5IGNvbmZpZyAocHJvdmlkZWQgYnkgdGhlIHByb3h5IGJ1dCBjYW4gYmUgb3ZlcnJpZGRlbilcbiAqIEByZXR1cm5zIHtQcm9taXNlfSBBIFByb21pc2Ugb2JqZWN0IHJlcHJlc2VudHMgdGhlIHtudW1iZXJ9XG4gKi9cbmV4cG9ydCBjb25zdCBmZXRjaEN1cnJlbnRQcmljZSA9IGFzeW5jIChhZGRyZXNzID0gJycsIGNvbmZpZyA9IHt9KSA9PiB7XG5cbiAgICBleHBlY3QuYWxsKHsgYWRkcmVzcyB9LCB7XG4gICAgICAgICdhZGRyZXNzJzoge1xuICAgICAgICAgICAgdHlwZTogJ2FkZHJlc3MnXG4gICAgICAgIH1cbiAgICB9KTtcblxuICAgIGV4cGVjdC5hbGwoY29uZmlnLCB7XG4gICAgICAgICd3ZWIzJzoge1xuICAgICAgICAgICAgdHlwZTogJ29iamVjdCcsXG4gICAgICAgICAgICBjb2RlOiBXRUIzX1JFUVVJUkVEXG4gICAgICAgIH0sXG4gICAgICAgICdjb250cmFjdHMuRGF0YXNldC5hYmknOiB7XG4gICAgICAgICAgICB0eXBlOiAnb2JqZWN0JyxcbiAgICAgICAgICAgIGNvZGU6IENPTlRSQUNUX1JFUVVJUkVELFxuICAgICAgICAgICAgYXJnczogWydEYXRhc2V0J11cbiAgICAgICAgfVxuICAgIH0pO1xuXG4gICAgY29uc3QgZGF0ID0gbmV3IGNvbmZpZy53ZWIzLmV0aC5Db250cmFjdChjb25maWcuY29udHJhY3RzLkRhdGFzZXQuYWJpLCBhZGRyZXNzKTtcbiAgICBjb25zdCBjdXJyZW50UHJpY2UgPSBhd2FpdCBkYXQubWV0aG9kc1xuICAgICAgICAuY3VycmVudFByaWNlKClcbiAgICAgICAgLmNhbGwoKTtcblxuICAgIHJldHVybiBOdW1iZXIucGFyc2VJbnQoY3VycmVudFByaWNlLCAxMCk7XG59O1xuXG4vKipcbiAqIEdldCBkYXRhIGJhdGNoZXMgY291bnQgZnJvbSBEYXRhc2V0IGNvbnRyYWN0IGJ5IHRoZSBkYXRhc2V0IGFkZHJlc3NcbiAqIFxuICogQHBhcmFtIHtTdHJpbmd9IGFkZHJlc3NcbiAqIEBwYXJhbSB7T2JqZWN0fSBjb25maWcgTGlicmFyeSBjb25maWcgKHByb3ZpZGVkIGJ5IHRoZSBwcm94eSBidXQgY2FuIGJlIG92ZXJyaWRkZW4pXG4gKiBAcmV0dXJucyB7UHJvbWlzZX0gQSBQcm9taXNlIG9iamVjdCByZXByZXNlbnRzIHRoZSB7bnVtYmVyfVxuICovXG5leHBvcnQgY29uc3QgZmV0Y2hCYXRjaGVzQ291bnQgPSBhc3luYyAoYWRkcmVzcyA9ICcnLCBjb25maWcgPSB7fSkgPT4ge1xuXG4gICAgZXhwZWN0LmFsbCh7IGFkZHJlc3MgfSwge1xuICAgICAgICAnYWRkcmVzcyc6IHtcbiAgICAgICAgICAgIHR5cGU6ICdhZGRyZXNzJ1xuICAgICAgICB9XG4gICAgfSk7XG5cbiAgICBleHBlY3QuYWxsKGNvbmZpZywge1xuICAgICAgICAnd2ViMyc6IHtcbiAgICAgICAgICAgIHR5cGU6ICdvYmplY3QnLFxuICAgICAgICAgICAgY29kZTogV0VCM19SRVFVSVJFRFxuICAgICAgICB9LFxuICAgICAgICAnY29udHJhY3RzLkRhdGFzZXQuYWJpJzoge1xuICAgICAgICAgICAgdHlwZTogJ29iamVjdCcsXG4gICAgICAgICAgICBjb2RlOiBDT05UUkFDVF9SRVFVSVJFRCxcbiAgICAgICAgICAgIGFyZ3M6IFsnRGF0YXNldCddXG4gICAgICAgIH1cbiAgICB9KTtcblxuICAgIGNvbnN0IGRhdCA9IG5ldyBjb25maWcud2ViMy5ldGguQ29udHJhY3QoY29uZmlnLmNvbnRyYWN0cy5EYXRhc2V0LmFiaSwgYWRkcmVzcyk7XG4gICAgY29uc3QgYmF0Y2hlc0NvdW50ID0gYXdhaXQgZGF0Lm1ldGhvZHNcbiAgICAgICAgLmJhdGNoZXNDb3VudCgpXG4gICAgICAgIC5jYWxsKCk7XG4gICAgICAgIFxuICAgIHJldHVybiBOdW1iZXIucGFyc2VJbnQoYmF0Y2hlc0NvdW50LCAxMCk7XG59O1xuXG4vKipcbiAqIEdldCBkZXNjcmlwdGlvbiBmcm9tIERhdGFzZXQgY29udHJhY3QgYnkgdGhlIGRhdGFzZXQgYWRkcmVzc1xuICogXG4gKiBAcGFyYW0ge1N0cmluZ30gYWRkcmVzc1xuICogQHBhcmFtIHtPYmplY3R9IGNvbmZpZyBMaWJyYXJ5IGNvbmZpZyAocHJvdmlkZWQgYnkgdGhlIHByb3h5IGJ1dCBjYW4gYmUgb3ZlcnJpZGRlbilcbiAqIEByZXR1cm5zIHtQcm9taXNlfSBBIFByb21pc2Ugb2JqZWN0IHJlcHJlc2VudHMgdGhlIHtudW1iZXJ9XG4gKi9cbmV4cG9ydCBjb25zdCBmZXRjaERlc2NyaXB0aW9uID0gYXN5bmMgKGFkZHJlc3MgPSAnJywgY29uZmlnID0ge30pID0+IHtcblxuICAgIGV4cGVjdC5hbGwoeyBhZGRyZXNzIH0sIHtcbiAgICAgICAgJ2FkZHJlc3MnOiB7XG4gICAgICAgICAgICB0eXBlOiAnYWRkcmVzcydcbiAgICAgICAgfVxuICAgIH0pO1xuXG4gICAgZXhwZWN0LmFsbChjb25maWcsIHtcbiAgICAgICAgJ3dlYjMnOiB7XG4gICAgICAgICAgICB0eXBlOiAnb2JqZWN0JyxcbiAgICAgICAgICAgIGNvZGU6IFdFQjNfUkVRVUlSRURcbiAgICAgICAgfSxcbiAgICAgICAgJ2NvbnRyYWN0cy5EYXRhc2V0LmFiaSc6IHtcbiAgICAgICAgICAgIHR5cGU6ICdvYmplY3QnLFxuICAgICAgICAgICAgY29kZTogQ09OVFJBQ1RfUkVRVUlSRUQsXG4gICAgICAgICAgICBhcmdzOiBbJ0RhdGFzZXQnXVxuICAgICAgICB9XG4gICAgfSk7XG5cbiAgICBjb25zdCBkYXQgPSBuZXcgY29uZmlnLndlYjMuZXRoLkNvbnRyYWN0KGNvbmZpZy5jb250cmFjdHMuRGF0YXNldC5hYmksIGFkZHJlc3MpO1xuICAgIGNvbnN0IGRlc2NyaXB0aW9uID0gYXdhaXQgZGF0Lm1ldGhvZHNcbiAgICAgICAgLmRlc2NyaXB0aW9uKClcbiAgICAgICAgLmNhbGwoKTtcblxuICAgIHJldHVybiBjb25maWcud2ViMy51dGlscy5oZXhUb1V0ZjgoZGVzY3JpcHRpb24pO1xufTtcblxuLyoqXG4gKiBHZXQgbWV0YWRhdGEgZnJvbSBEYXRhc2V0IGNvbnRyYWN0IGJ5IHRoZSBkYXRhc2V0IGFkZHJlc3NcbiAqIFxuICogQHBhcmFtIHtTdHJpbmd9IGFkZHJlc3NcbiAqIEBwYXJhbSB7T2JqZWN0fSBjb25maWcgTGlicmFyeSBjb25maWcgKHByb3ZpZGVkIGJ5IHRoZSBwcm94eSBidXQgY2FuIGJlIG92ZXJyaWRkZW4pXG4gKiBAcmV0dXJucyB7UHJvbWlzZX0gQSBQcm9taXNlIG9iamVjdCByZXByZXNlbnRzIHRoZSB7bnVtYmVyfVxuICovXG5leHBvcnQgY29uc3QgZmV0Y2hNZXRhZGF0YSA9IGFzeW5jIChhZGRyZXNzID0gJycsIGNvbmZpZyA9IHt9KSA9PiB7XG5cbiAgICBleHBlY3QuYWxsKHsgYWRkcmVzcyB9LCB7XG4gICAgICAgICdhZGRyZXNzJzoge1xuICAgICAgICAgICAgdHlwZTogJ2FkZHJlc3MnXG4gICAgICAgIH1cbiAgICB9KTtcblxuICAgIGV4cGVjdC5hbGwoY29uZmlnLCB7XG4gICAgICAgICd3ZWIzJzoge1xuICAgICAgICAgICAgdHlwZTogJ29iamVjdCcsXG4gICAgICAgICAgICBjb2RlOiBXRUIzX1JFUVVJUkVEXG4gICAgICAgIH0sXG4gICAgICAgICdjb250cmFjdHMuRGF0YXNldC5hYmknOiB7XG4gICAgICAgICAgICB0eXBlOiAnb2JqZWN0JyxcbiAgICAgICAgICAgIGNvZGU6IENPTlRSQUNUX1JFUVVJUkVELFxuICAgICAgICAgICAgYXJnczogWydEYXRhc2V0J11cbiAgICAgICAgfVxuICAgIH0pO1xuXG4gICAgY29uc3QgZGF0ID0gbmV3IGNvbmZpZy53ZWIzLmV0aC5Db250cmFjdChjb25maWcuY29udHJhY3RzLkRhdGFzZXQuYWJpLCBhZGRyZXNzKTtcbiAgICBjb25zdCBtZXRhZGF0YSA9IGF3YWl0IGRhdC5tZXRob2RzXG4gICAgICAgIC5tZXRhZGF0YSgpXG4gICAgICAgIC5jYWxsKCk7XG5cbiAgICByZXR1cm4gY29uZmlnLndlYjMudXRpbHMuaGV4VG9VdGY4KG1ldGFkYXRhKTtcbn07XG5cbi8qKlxuICogR2V0IGRhdGFzZXQgYnkgdGhlIGRhdGFzZXQgYWRkcmVzc1xuICogXG4gKiBAcGFyYW0ge1N0cmluZ30gYWRkcmVzc1xuICogQHBhcmFtIHtPYmplY3R9IGNvbmZpZyBMaWJyYXJ5IGNvbmZpZyAocHJvdmlkZWQgYnkgdGhlIHByb3h5IGJ1dCBjYW4gYmUgb3ZlcnJpZGRlbilcbiAqIEByZXR1cm5zIHtQcm9taXNlfSBQcm9taXNlIG9iamVjdCByZXByZXNlbnRzIHRoZSB7T2JqZWN0W119XG4gKi9cbmV4cG9ydCBjb25zdCBmZXRjaERhdGFzZXQgPSBhc3luYyAoYWRkcmVzcyA9ICcnLCBjb25maWcgPSB7fSkgPT4ge1xuXG4gICAgZXhwZWN0LmFsbCh7IGFkZHJlc3MgfSwge1xuICAgICAgICAnYWRkcmVzcyc6IHtcbiAgICAgICAgICAgIHR5cGU6ICdhZGRyZXNzJ1xuICAgICAgICB9XG4gICAgfSk7XG5cbiAgICBjb25zdCBbXG4gICAgICAgIGlwZnNBZGRyZXNzLFxuICAgICAgICBkYXRhRGltLFxuICAgICAgICBjdXJyZW50UHJpY2UsXG4gICAgICAgIGJhdGNoZXNDb3VudCxcbiAgICAgICAgbWV0YWRhdGEsIFxuICAgICAgICBkZXNjcmlwdGlvblxuICAgIF0gPSBhd2FpdCBQcm9taXNlLmFsbChbXG4gICAgICAgIGZldGNoSXBmc0FkZHJlc3MoYWRkcmVzcywgY29uZmlnKSxcbiAgICAgICAgZmV0Y2hEYXRhRGltKGFkZHJlc3MsIGNvbmZpZyksXG4gICAgICAgIGZldGNoQ3VycmVudFByaWNlKGFkZHJlc3MsIGNvbmZpZyksXG4gICAgICAgIGZldGNoQmF0Y2hlc0NvdW50KGFkZHJlc3MsIGNvbmZpZyksXG4gICAgICAgIGZldGNoTWV0YWRhdGEoYWRkcmVzcywgY29uZmlnKSxcbiAgICAgICAgZmV0Y2hEZXNjcmlwdGlvbihhZGRyZXNzLCBjb25maWcpXG4gICAgXSk7XG5cbiAgICByZXR1cm4ge1xuICAgICAgICBhZGRyZXNzLFxuICAgICAgICBpcGZzQWRkcmVzcyxcbiAgICAgICAgZGF0YURpbSxcbiAgICAgICAgY3VycmVudFByaWNlLFxuICAgICAgICBiYXRjaGVzQ291bnQsXG4gICAgICAgIG1ldGFkYXRhLFxuICAgICAgICBkZXNjcmlwdGlvblxuICAgIH07XG59O1xuXG4vKipcbiAqIEdldCBkYXRhc2V0IGJ5IGlkXG4gKiBcbiAqIEBwYXJhbSB7bnVtYmVyfSBpZCBcbiAqIEBwYXJhbSB7T2JqZWN0fSBjb25maWcgTGlicmFyeSBjb25maWcgKHByb3ZpZGVkIGJ5IHRoZSBwcm94eSBidXQgY2FuIGJlIG92ZXJyaWRkZW4pXG4gKiBAcmV0dXJucyB7UHJvbWlzZX0gQSBQcm9taXNlIG9iamVjdCByZXByZXNlbnRzIHRoZSB7T2JqZWN0fVxuICovXG5leHBvcnQgY29uc3QgZmV0Y2hEYXRhc2V0QnlJZCA9IGFzeW5jIChpZCwgY29uZmlnID0ge30pID0+IHtcblxuICAgIGNvbnN0IGFkZHJlc3MgPSBhd2FpdCBmZXRjaEFkZHJlc3NCeUlkKGlkLCBjb25maWcpO1xuICAgIGNvbnN0IGRhdGFzZXQgPSBhd2FpdCBmZXRjaERhdGFzZXQoYWRkcmVzcywgY29uZmlnKTtcblxuICAgIHJldHVybiBkYXRhc2V0O1xufTtcblxuLyoqXG4gKiBHZXQgYWxsIGRhdGFzZXRzXG4gKiBcbiAqIEBwYXJhbSB7T2JqZWN0fSBjb25maWcgTGlicmFyeSBjb25maWcgKHByb3ZpZGVkIGJ5IHRoZSBwcm94eSBidXQgY2FuIGJlIG92ZXJyaWRkZW4pXG4gKiBAcmV0dXJucyB7UHJvbWlzZX0gUHJvbWlzZSBvYmplY3QgcmVwcmVzZW50cyB0aGUge09iamVjdFtdfVxuICovXG5leHBvcnQgY29uc3QgZmV0Y2hBbGwgPSBhc3luYyAoY29uZmlnID0ge30pID0+IHtcblxuICAgIGxldCByZWNvcmRzID0gW107XG4gICAgbGV0IGVycm9yID0gW107XG5cbiAgICB0cnkge1xuXG4gICAgICAgIGNvbnN0IGNvdW50ID0gYXdhaXQgZmV0Y2hDb3VudChjb25maWcpO1xuXG4gICAgICAgIGZvciAobGV0IGk9MDsgaSA8IGNvdW50OyBpKyspIHtcbiAgICAgICAgICAgIFxuICAgICAgICAgICAgdHJ5IHtcblxuICAgICAgICAgICAgICAgIGNvbnN0IGRhdGFzZXQgPSBhd2FpdCBmZXRjaERhdGFzZXRCeUlkKGksIGNvbmZpZyk7XG5cbiAgICAgICAgICAgICAgICByZWNvcmRzLnB1c2goe1xuICAgICAgICAgICAgICAgICAgICBpZDogaSxcbiAgICAgICAgICAgICAgICAgICAgLi4uZGF0YXNldFxuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfSBjYXRjaChlcnIpIHtcbiAgICAgICAgICAgICAgICBlcnJvci5wdXNoKHtcbiAgICAgICAgICAgICAgICAgICAgaWQ6IGksXG4gICAgICAgICAgICAgICAgICAgIG1lc3NhZ2U6IGVyci5tZXNzYWdlXG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9ICAgICAgICBcbiAgICAgICAgfVxuICAgIH0gY2F0Y2goZXJyKSB7XG4gICAgICAgIGVycm9yLnB1c2goe1xuICAgICAgICAgICAgZXJyb3I6IGVyci5tZXNzYWdlXG4gICAgICAgIH0pO1xuICAgIH0gICBcblxuICAgIHJldHVybiB7XG4gICAgICAgIHJlY29yZHMsXG4gICAgICAgIGVycm9yXG4gICAgfTtcbn07XG5cbi8qKlxuICogRGVwbG95IERhdHNldCBjb250cmFjdCB0byB0aGUgbmV0d29ya1xuICogXG4gKiBAcGFyYW0ge1N0cmluZ30gZGF0YXNldElwZnNIYXNoIFxuICogQHBhcmFtIHtOdW1iZXJ9IGJhdGNoZXNDb3VudCBDb3VudCBvZiBiYXRjaGVzIGluIGRhdGFzZXRcbiAqIEBwYXJhbSB7T2JqZWN0fSBvcHRpb25zIHsgZGltZW5zaW9uLCBwcmljZSwgbWV0YWRhdGEsIGRlc2NyaXB0aW9uIH0gXG4gKiBAcGFyYW0ge1N0cmluZ30gcHVibGlzaGVyIFB1Ymxpc2hlciBhZGRyZXNzXG4gKiBAcGFyYW0ge09iamVjdH0gY29uZmlnIExpYnJhcnkgY29uZmlnIChwcm92aWRlZCBieSB0aGUgcHJveHkgYnV0IGNhbiBiZSBvdmVycmlkZGVuKVxuICogQHJldHVybnMge1Byb21pc2V9IFByb21pc2Ugb2JqZWN0IHJlc29sdmVkIHRvIGNvbnRyYWN0IGFkZHJlc3NcbiAqL1xuZXhwb3J0IGNvbnN0IGRlcGxveSA9IGFzeW5jIChkYXRhc2V0SXBmc0hhc2gsIGJhdGNoZXNDb3VudCwgeyBkaW1lbnNpb24sIHByaWNlLCBtZXRhZGF0YSwgZGVzY3JpcHRpb24gfSwgcHVibGlzaGVyLCBjb25maWcgPSB7fSkgPT4ge1xuXG4gICAgZXhwZWN0LmFsbCh7IGRhdGFzZXRJcGZzSGFzaCwgYmF0Y2hlc0NvdW50LCBwdWJsaXNoZXIsIGRpbWVuc2lvbiwgcHJpY2UsIG1ldGFkYXRhLCBkZXNjcmlwdGlvbiB9LCB7XG4gICAgICAgICdkYXRhc2V0SXBmc0hhc2gnOiB7XG4gICAgICAgICAgICB0eXBlOiAnc3RyaW5nJ1xuICAgICAgICB9LFxuICAgICAgICAnYmF0Y2hlc0NvdW50Jzoge1xuICAgICAgICAgICAgdHlwZTogJ251bWJlcidcbiAgICAgICAgfSxcbiAgICAgICAgJ3B1Ymxpc2hlcic6IHtcbiAgICAgICAgICAgIHR5cGU6ICdhZGRyZXNzJ1xuICAgICAgICB9LFxuICAgICAgICAnZGltZW5zaW9uJzoge1xuICAgICAgICAgICAgdHlwZTogJ251bWJlcidcbiAgICAgICAgfSxcbiAgICAgICAgJ3ByaWNlJzoge1xuICAgICAgICAgICAgdHlwZTogJ251bWJlcidcbiAgICAgICAgfSxcbiAgICAgICAgJ21ldGFkYXRhJzoge1xuICAgICAgICAgICAgdHlwZTogJ3N0cmluZydcbiAgICAgICAgfSxcbiAgICAgICAgJ2Rlc2NyaXB0aW9uJzoge1xuICAgICAgICAgICAgdHlwZTogJ3N0cmluZydcbiAgICAgICAgfSAgICAgICAgXG4gICAgfSk7XG5cbiAgICBleHBlY3QuYWxsKGNvbmZpZywge1xuICAgICAgICAnd2ViMyc6IHtcbiAgICAgICAgICAgIHR5cGU6ICdvYmplY3QnLFxuICAgICAgICAgICAgY29kZTogV0VCM19SRVFVSVJFRFxuICAgICAgICB9LFxuICAgICAgICAnY29udHJhY3RzLkRhdGFzZXQnOiB7XG4gICAgICAgICAgICB0eXBlOiAnb2JqZWN0JyxcbiAgICAgICAgICAgIGNvZGU6IENPTlRSQUNUX1JFUVVJUkVELFxuICAgICAgICAgICAgYXJnczogWydEYXRhc2V0J11cbiAgICAgICAgfSxcbiAgICAgICAgJ3dlYjMuY3VycmVudFByb3ZpZGVyLmlzTWV0YU1hc2snOiB7XG4gICAgICAgICAgICB0eXBlOiAnYm9vbGVhbicsXG4gICAgICAgICAgICBjb2RlOiBXRUIzX01FVEFNQVNLX1JFUVVJUkVEXG4gICAgICAgIH1cbiAgICB9KTtcblxuICAgIGNvbnN0IGFyZ3MgPSBbXG4gICAgICAgIGNvbmZpZy53ZWIzLnV0aWxzLnV0ZjhUb0hleChkYXRhc2V0SXBmc0hhc2gpLCBcbiAgICAgICAgZGltZW5zaW9uLCBcbiAgICAgICAgYmF0Y2hlc0NvdW50LCBcbiAgICAgICAgY29uZmlnLndlYjMudXRpbHMudG9IZXgocHJpY2UpLCBcbiAgICAgICAgY29uZmlnLndlYjMudXRpbHMudXRmOFRvSGV4KG1ldGFkYXRhKSxcbiAgICAgICAgY29uZmlnLndlYjMudXRpbHMudXRmOFRvSGV4KGRlc2NyaXB0aW9uKVxuICAgIF07XG4gICAgICAgIFxuICAgIC8vIEVzdGltYXRlIHJlcXVpcmVkIGFtb3VudCBvZiBnYXNcbiAgICBjb25zdCBnYXMgPSBhd2FpdCB3ZWIzSGVscGVycy5lc3RpbWF0ZUdhcyhjb25maWcuY29udHJhY3RzLkRhdGFzZXQuYnl0ZWNvZGUsIGFyZ3MsIGNvbmZpZyk7XG5cbiAgICAvLyBDcmVhdGUgYW5kIGRlcGxveSBkYXRhc2V0IGNvbnRyYWN0XG4gICAgY29uc3QgZGF0YXNldENvbnRyYWN0QWRkcmVzcyA9IGF3YWl0IHdlYjNIZWxwZXJzLmRlcGxveUNvbnRyYWN0KGNvbmZpZy5jb250cmFjdHMuRGF0YXNldCwge1xuICAgICAgICBhcmdzLFxuICAgICAgICBmcm9tOiBwdWJsaXNoZXIsXG4gICAgICAgIGdhczogTnVtYmVyLnBhcnNlSW50KGdhcyAqIDEuNSwgMTApXG4gICAgfSwgY29uZmlnKTtcblxuICAgIHJldHVybiBkYXRhc2V0Q29udHJhY3RBZGRyZXNzO1xufTtcblxuLyoqXG4gKiBBZGQgZGF0YXNldCB0byBtYXJrZXRcbiAqIFxuICogQHBhcmFtIHtTdHJpbmd9IGRhdGFzZXRDb250cmFjdEFkZHJlc3MgXG4gKiBAcGFyYW0ge1N0cmluZ30gcHVibGlzaGVyQWRkcmVzcyBcbiAqIEBwYXJhbSB7T2JqZWN0fSBjb25maWcgTGlicmFyeSBjb25maWcgKHByb3ZpZGVkIGJ5IHRoZSBwcm94eSBidXQgY2FuIGJlIG92ZXJyaWRkZW4pXG4gKiBAcmV0dXJucyB7UHJvbWlzZX0gUHJvbWlzZSBvYmplY3QgcmVzb2x2ZWQgdG8ge1N0cmluZ30gY29udHJhY3RBZGRyZXNzXG4gKi9cbmV4cG9ydCBjb25zdCBhZGRUb01hcmtldCA9IChkYXRhc2V0Q29udHJhY3RBZGRyZXNzLCBwdWJsaXNoZXJBZGRyZXNzLCBjb25maWcgPSB7fSkgPT4gbmV3IFByb21pc2UoYXN5bmMgKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuXG4gICAgZXhwZWN0LmFsbCh7IGRhdGFzZXRDb250cmFjdEFkZHJlc3MsIHB1Ymxpc2hlckFkZHJlc3MgfSwge1xuICAgICAgICAnZGF0YXNldENvbnRyYWN0QWRkcmVzcyc6IHtcbiAgICAgICAgICAgIHR5cGU6ICdhZGRyZXNzJ1xuICAgICAgICB9LFxuICAgICAgICAncHVibGlzaGVyQWRkcmVzcyc6IHtcbiAgICAgICAgICAgIHR5cGU6ICdhZGRyZXNzJ1xuICAgICAgICB9XG4gICAgfSk7XG5cbiAgICBleHBlY3QuYWxsKGNvbmZpZywge1xuICAgICAgICAnd2ViMyc6IHtcbiAgICAgICAgICAgIHR5cGU6ICdvYmplY3QnLFxuICAgICAgICAgICAgY29kZTogV0VCM19SRVFVSVJFRFxuICAgICAgICB9LFxuICAgICAgICAnY29udHJhY3RzLlBhbmRvcmFNYXJrZXQuYWJpJzoge1xuICAgICAgICAgICAgdHlwZTogJ29iamVjdCcsXG4gICAgICAgICAgICBjb2RlOiBDT05UUkFDVF9SRVFVSVJFRCxcbiAgICAgICAgICAgIGFyZ3M6IFsnUGFuZG9yYU1hcmtldCddXG4gICAgICAgIH0sXG4gICAgICAgICdhZGRyZXNzZXMuUGFuZG9yYU1hcmtldCc6IHtcbiAgICAgICAgICAgIHR5cGU6ICdhZGRyZXNzJyxcbiAgICAgICAgICAgIGNvZGU6IEFERFJFU1NfUkVRVUlSRUQsXG4gICAgICAgICAgICBhcmdzOiBbJ01hcmtldCddXG4gICAgICAgIH0sXG4gICAgICAgICd3ZWIzLmN1cnJlbnRQcm92aWRlci5pc01ldGFNYXNrJzoge1xuICAgICAgICAgICAgdHlwZTogJ2Jvb2xlYW4nLFxuICAgICAgICAgICAgY29kZTogV0VCM19NRVRBTUFTS19SRVFVSVJFRFxuICAgICAgICB9XG4gICAgfSk7XG5cbiAgICBjb25zdCBtYXJrZXQgPSBuZXcgY29uZmlnLndlYjMuZXRoLkNvbnRyYWN0KGNvbmZpZy5jb250cmFjdHMuUGFuZG9yYU1hcmtldC5hYmksIGNvbmZpZy5hZGRyZXNzZXMuUGFuZG9yYU1hcmtldCk7XG4gICAgY29uc3QgZ2FzUHJpY2UgPSBhd2FpdCBjb25maWcud2ViMy5ldGguZ2V0R2FzUHJpY2UoKTtcbiAgICBtYXJrZXQubWV0aG9kc1xuICAgICAgICAuYWRkRGF0YXNldChkYXRhc2V0Q29udHJhY3RBZGRyZXNzKVxuICAgICAgICAuc2VuZCh7XG4gICAgICAgICAgICBmcm9tOiBwdWJsaXNoZXJBZGRyZXNzLFxuICAgICAgICAgICAgZ2FzUHJpY2VcbiAgICAgICAgfSlcbiAgICAgICAgLm9uKCdlcnJvcicsIHJlamVjdClcbiAgICAgICAgLm9uKCdyZWNlaXB0JywgcmVjZWlwdCA9PiB7XG5cbiAgICAgICAgICAgIGlmIChOdW1iZXIocmVjZWlwdC5zdGF0dXMpID09PSAwKSB7XG5cbiAgICAgICAgICAgICAgICByZXR1cm4gcmVqZWN0KHBqc0Vycm9yKFRSQU5TQUNUSU9OX1VOU1VDQ0VTU0ZVTCkpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICByZXNvbHZlKHJlY2VpcHQuY29udHJhY3RBZGRyZXNzIHx8IHJlY2VpcHQuZXZlbnRzLkRhdGFzZXRBZGRlZC5yZXR1cm5WYWx1ZXMuZGF0YXNldCk7XG4gICAgICAgIH0pO1xuICAgIC8vIEBub3RlIEluIGNhc2Ugb2YgZ2FuYWNoZS1jbGkgYmxvY2tjaGFpbiBcImNvbnRyYWN0QWRkcmVzc1wiIGFsd2F5cyB3aWxsIGJlIGVxdWFsIHRvIG51bGxcbn0pO1xuXG4vKipcbiAqIFJlbW92ZSBkYXRhc2V0IGZyb20gUGFuZG9yYU1hcmtldFxuICogXG4gKiBAcGFyYW0ge1N0cmluZ30gZGF0YXNldEFkZHJlc3NcbiAqIEBwYXJhbSB7U3RyaW5nfSBwdWJsaXNoZXJBZGRyZXNzIFxuICogQHBhcmFtIHtPYmplY3R9IGNvbmZpZyBMaWJyYXJ5IGNvbmZpZyAocHJvdmlkZWQgYnkgdGhlIHByb3h5IGJ1dCBjYW4gYmUgb3ZlcnJpZGRlbikgXG4gKi9cbmV4cG9ydCBjb25zdCByZW1vdmVEYXRhc2V0ID0gKGRhdGFzZXRBZGRyZXNzLCBwdWJsaXNoZXJBZGRyZXNzLCBjb25maWcgPSB7fSkgPT4gbmV3IFByb21pc2UoYXN5bmMgKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuXG4gICAgZXhwZWN0LmFsbCh7IGRhdGFzZXRBZGRyZXNzLCBwdWJsaXNoZXJBZGRyZXNzIH0sIHtcbiAgICAgICAgJ2RhdGFzZXRBZGRyZXNzJzoge1xuICAgICAgICAgICAgdHlwZTogJ2FkZHJlc3MnXG4gICAgICAgIH0sXG4gICAgICAgICdwdWJsaXNoZXJBZGRyZXNzJzoge1xuICAgICAgICAgICAgdHlwZTogJ2FkZHJlc3MnXG4gICAgICAgIH1cbiAgICB9KTtcblxuICAgIGV4cGVjdC5hbGwoY29uZmlnLCB7XG4gICAgICAgICd3ZWIzJzoge1xuICAgICAgICAgICAgdHlwZTogJ29iamVjdCcsXG4gICAgICAgICAgICBjb2RlOiBXRUIzX1JFUVVJUkVEXG4gICAgICAgIH0sXG4gICAgICAgICdjb250cmFjdHMuUGFuZG9yYU1hcmtldC5hYmknOiB7XG4gICAgICAgICAgICB0eXBlOiAnb2JqZWN0JyxcbiAgICAgICAgICAgIGNvZGU6IENPTlRSQUNUX1JFUVVJUkVELFxuICAgICAgICAgICAgYXJnczogWydQYW5kb3JhTWFya2V0J11cbiAgICAgICAgfSxcbiAgICAgICAgJ2FkZHJlc3Nlcy5QYW5kb3JhTWFya2V0Jzoge1xuICAgICAgICAgICAgdHlwZTogJ2FkZHJlc3MnLFxuICAgICAgICAgICAgY29kZTogQUREUkVTU19SRVFVSVJFRCxcbiAgICAgICAgICAgIGFyZ3M6IFsnUGFuZG9yYU1hcmtldCddXG4gICAgICAgIH1cbiAgICB9KTtcblxuICAgIGNvbnN0IG1hcmtldCA9IG5ldyBjb25maWcud2ViMy5ldGguQ29udHJhY3QoY29uZmlnLmNvbnRyYWN0cy5QYW5kb3JhTWFya2V0LmFiaSwgY29uZmlnLmFkZHJlc3Nlcy5QYW5kb3JhTWFya2V0KTtcbiAgICBjb25zdCBnYXNQcmljZSA9IGF3YWl0IGNvbmZpZy53ZWIzLmV0aC5nZXRHYXNQcmljZSgpO1xuICAgIG1hcmtldC5tZXRob2RzXG4gICAgICAgIC5yZW1vdmVEYXRhc2V0KGRhdGFzZXRBZGRyZXNzKVxuICAgICAgICAuc2VuZCh7XG4gICAgICAgICAgICBmcm9tOiBwdWJsaXNoZXJBZGRyZXNzLFxuICAgICAgICAgICAgZ2FzUHJpY2VcbiAgICAgICAgfSlcbiAgICAgICAgLm9uKCdlcnJvcicsIHJlamVjdClcbiAgICAgICAgLm9uKCdyZWNlaXB0JywgcmVjZWlwdCA9PiB7XG5cbiAgICAgICAgICAgIGlmIChOdW1iZXIocmVjZWlwdC5zdGF0dXMpID09PSAwKSB7XG5cbiAgICAgICAgICAgICAgICByZXR1cm4gcmVqZWN0KHBqc0Vycm9yKFRSQU5TQUNUSU9OX1VOU1VDQ0VTU0ZVTCkpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICByZXNvbHZlKHJlY2VpcHQuY29udHJhY3RBZGRyZXNzKTtcbiAgICAgICAgfSk7XG59KTtcblxuLyoqXG4gKiBIYW5kbGUgZXZlbnQgRGF0YXNldEFkZGVkXG4gKiBcbiAqIEBwYXJhbSB7T2JqZWN0fSBvcHRpb25zIEV2ZW50IGhhbmRsZXIgb3B0aW9uc1xuICogQHBhcmFtIHtPYmplY3R9IGNvbmZpZyBMaWJyYXJ5IGNvbmZpZyAocHJvdmlkZWQgYnkgdGhlIHByb3h5IGJ1dCBjYW4gYmUgb3ZlcnJpZGRlbilcbiAqIEByZXR1cm5zIHtQcm9taXNlPHtPYmplY3R9Pn0gUFByb21pc2Ugb2JqZWN0IHJlc29sdmVkIHRvIHRoZSBvYmplY3Qgd2l0aCBjaGFpbmVkIGNhbGxiYWNrcyAjZGF0YSBhbmQgI2Vycm9yXG4gKi9cbmV4cG9ydCBjb25zdCBldmVudERhdGFzZXRBZGRlZCA9IGFzeW5jIChvcHRpb25zID0ge30sIGNvbmZpZyA9IHt9KSA9PiB7XG5cbiAgICBleHBlY3QuYWxsKHsgb3B0aW9ucyB9LCB7XG4gICAgICAgICdvcHRpb25zJzoge1xuICAgICAgICAgICAgdHlwZTogJ29iamVjdCdcbiAgICAgICAgfVxuICAgIH0pO1xuXG4gICAgZXhwZWN0LmFsbChjb25maWcsIHtcbiAgICAgICAgJ3dlYjMnOiB7XG4gICAgICAgICAgICB0eXBlOiAnb2JqZWN0JyxcbiAgICAgICAgICAgIGNvZGU6IFdFQjNfUkVRVUlSRURcbiAgICAgICAgfSxcbiAgICAgICAgJ2NvbnRyYWN0cy5QYW5kb3JhTWFya2V0LmFiaSc6IHtcbiAgICAgICAgICAgIHR5cGU6ICdvYmplY3QnLFxuICAgICAgICAgICAgY29kZTogQ09OVFJBQ1RfUkVRVUlSRUQsXG4gICAgICAgICAgICBhcmdzOiBbJ1BhbmRvcmFNYXJrZXQnXVxuICAgICAgICB9LFxuICAgICAgICAnYWRkcmVzc2VzLlBhbmRvcmFNYXJrZXQnOiB7XG4gICAgICAgICAgICB0eXBlOiAnYWRkcmVzcycsXG4gICAgICAgICAgICBjb2RlOiBBRERSRVNTX1JFUVVJUkVELFxuICAgICAgICAgICAgYXJnczogWydNYXJrZXQnXVxuICAgICAgICB9XG4gICAgfSk7XG5cbiAgICBjb25zdCBjYWxsYmFja3MgPSB7XG4gICAgICAgIG9uRGF0YTogKCkgPT4ge30sXG4gICAgICAgIG9uRXJyb3I6ICgpID0+IHt9XG4gICAgfTtcblxuICAgIGNvbnN0IGNoYWluID0ge1xuICAgICAgICBkYXRhOiAoY2IgPSAoKSA9PiB7fSkgPT4ge1xuICAgICAgICAgICAgY2FsbGJhY2tzLm9uRGF0YSA9IGNiO1xuICAgICAgICAgICAgcmV0dXJuIGNoYWluO1xuICAgICAgICB9LFxuICAgICAgICBlcnJvcjogKGNiID0gKCkgPT4ge30pID0+IHtcbiAgICAgICAgICAgIGNhbGxiYWNrcy5vbkVycm9yID0gY2I7XG4gICAgICAgICAgICByZXR1cm4gY2hhaW47XG4gICAgICAgIH1cbiAgICB9O1xuXG4gICAgY29uc3QgbWFyID0gbmV3IGNvbmZpZy53ZWIzLmV0aC5Db250cmFjdChjb25maWcuY29udHJhY3RzLlBhbmRvcmFNYXJrZXQuYWJpLCBjb25maWcuYWRkcmVzc2VzLlBhbmRvcmFNYXJrZXQpO1xuICAgIGNoYWluLmV2ZW50ID0gW107XG4gICAgY2hhaW4uZXZlbnRbMF0gPSBtYXIuZXZlbnRzLkRhdGFzZXRBZGRlZChvcHRpb25zKVxuICAgICAgICAub24oJ2RhdGEnLCBhc3luYyBldmVudCA9PiB7XG5cbiAgICAgICAgICAgIHRyeSB7XG5cbiAgICAgICAgICAgICAgICBjb25zdCBkYXRhc2V0ID0gYXdhaXQgZmV0Y2hEYXRhc2V0KGV2ZW50LnJldHVyblZhbHVlcy5kYXRhc2V0LCBjb25maWcpO1xuICAgICAgICAgICAgICAgIGNhbGxiYWNrcy5vbkRhdGEoe1xuICAgICAgICAgICAgICAgICAgICByZWNvcmRzOiBbZGF0YXNldF0sXG4gICAgICAgICAgICAgICAgICAgIGV2ZW50XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9IGNhdGNoKGVycikge1xuICAgICAgICAgICAgICAgIGNhbGxiYWNrcy5vbkVycm9yKGVycik7XG4gICAgICAgICAgICB9ICAgICAgICAgICAgXG4gICAgICAgIH0pXG4gICAgICAgIC5vbignZXJyb3InLCBjYWxsYmFja3Mub25FcnJvcik7XG4gICAgY2hhaW4uZXZlbnRbMF0ubmFtZSA9ICdEYXRhc2V0QWRkZWQnO1xuXG4gICAgcmV0dXJuIGNoYWluO1xufTtcblxuLyoqXG4gKiBIYW5kbGUgZXZlbnQgRGF0YXNldFJlbW92ZWRcbiAqIFxuICogQHBhcmFtIHtPYmplY3R9IG9wdGlvbnMgRXZlbnQgaGFuZGxlciBvcHRpb25zXG4gKiBAcGFyYW0ge09iamVjdH0gY29uZmlnIExpYnJhcnkgY29uZmlnIChwcm92aWRlZCBieSB0aGUgcHJveHkgYnV0IGNhbiBiZSBvdmVycmlkZGVuKVxuICogQHJldHVybnMge1Byb21pc2U8e09iamVjdH0+fSBQUHJvbWlzZSBvYmplY3QgcmVzb2x2ZWQgdG8gdGhlIG9iamVjdCB3aXRoIGNoYWluZWQgY2FsbGJhY2tzICNkYXRhIGFuZCAjZXJyb3JcbiAqL1xuZXhwb3J0IGNvbnN0IGV2ZW50RGF0YXNldFJlbW92ZWQgPSBhc3luYyAob3B0aW9ucyA9IHt9LCBjb25maWcgPSB7fSkgPT4ge1xuXG4gICAgZXhwZWN0LmFsbCh7IG9wdGlvbnMgfSwge1xuICAgICAgICAnb3B0aW9ucyc6IHtcbiAgICAgICAgICAgIHR5cGU6ICdvYmplY3QnXG4gICAgICAgIH1cbiAgICB9KTtcblxuICAgIGV4cGVjdC5hbGwoY29uZmlnLCB7XG4gICAgICAgICd3ZWIzJzoge1xuICAgICAgICAgICAgdHlwZTogJ29iamVjdCcsXG4gICAgICAgICAgICBjb2RlOiBXRUIzX1JFUVVJUkVEXG4gICAgICAgIH0sXG4gICAgICAgICdjb250cmFjdHMuUGFuZG9yYU1hcmtldC5hYmknOiB7XG4gICAgICAgICAgICB0eXBlOiAnb2JqZWN0JyxcbiAgICAgICAgICAgIGNvZGU6IENPTlRSQUNUX1JFUVVJUkVELFxuICAgICAgICAgICAgYXJnczogWydQYW5kb3JhTWFya2V0J11cbiAgICAgICAgfSxcbiAgICAgICAgJ2FkZHJlc3Nlcy5QYW5kb3JhTWFya2V0Jzoge1xuICAgICAgICAgICAgdHlwZTogJ2FkZHJlc3MnLFxuICAgICAgICAgICAgY29kZTogQUREUkVTU19SRVFVSVJFRCxcbiAgICAgICAgICAgIGFyZ3M6IFsnUGFuZG9yYU1hcmtldCddXG4gICAgICAgIH1cbiAgICB9KTtcblxuICAgIGNvbnN0IGNhbGxiYWNrcyA9IHtcbiAgICAgICAgb25EYXRhOiAoKSA9PiB7fSxcbiAgICAgICAgb25FcnJvcjogKCkgPT4ge31cbiAgICB9O1xuXG4gICAgY29uc3QgY2hhaW4gPSB7XG4gICAgICAgIGRhdGE6IChjYiA9ICgpID0+IHt9KSA9PiB7XG4gICAgICAgICAgICBjYWxsYmFja3Mub25EYXRhID0gY2I7XG4gICAgICAgICAgICByZXR1cm4gY2hhaW47XG4gICAgICAgIH0sXG4gICAgICAgIGVycm9yOiAoY2IgPSAoKSA9PiB7fSkgPT4ge1xuICAgICAgICAgICAgY2FsbGJhY2tzLm9uRXJyb3IgPSBjYjtcbiAgICAgICAgICAgIHJldHVybiBjaGFpbjtcbiAgICAgICAgfVxuICAgIH07XG5cbiAgICBjb25zdCBtYXIgPSBuZXcgY29uZmlnLndlYjMuZXRoLkNvbnRyYWN0KGNvbmZpZy5jb250cmFjdHMuUGFuZG9yYU1hcmtldC5hYmksIGNvbmZpZy5hZGRyZXNzZXMuUGFuZG9yYU1hcmtldCk7XG4gICAgY2hhaW4uZXZlbnQgPSBbXTtcbiAgICBjaGFpbi5ldmVudFswXSA9IG1hci5ldmVudHMuRGF0YXNldFJlbW92ZWQob3B0aW9ucylcbiAgICAgICAgLm9uKCdkYXRhJywgYXN5bmMgZXZlbnQgPT4ge1xuXG4gICAgICAgICAgICBjYWxsYmFja3Mub25EYXRhKHtcbiAgICAgICAgICAgICAgICByZWNvcmRzOiBbe2FkZHJlc3M6IGV2ZW50LnJldHVyblZhbHVlcy5kYXRhc2V0fV0sXG4gICAgICAgICAgICAgICAgZXZlbnRcbiAgICAgICAgICAgIH0pOyAgICAgICAgICAgIFxuICAgICAgICB9KVxuICAgICAgICAub24oJ2Vycm9yJywgY2FsbGJhY2tzLm9uRXJyb3IpO1xuICAgIGNoYWluLmV2ZW50WzBdLm5hbWUgPSAnRGF0YXNldFJlbW92ZWQnO1xuXG4gICAgcmV0dXJuIGNoYWluO1xufTtcbiJdfQ==