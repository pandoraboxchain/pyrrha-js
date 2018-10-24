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
            args = [config.web3.utils.utf8ToHex(datasetIpfsHash), dimension, batchesCount, price, config.web3.utils.utf8ToHex(metadata), config.web3.utils.utf8ToHex(description)]; // Estimate required amount of gas

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9kYXRhc2V0cy5qcyJdLCJuYW1lcyI6WyJmZXRjaENvdW50IiwiY29uZmlnIiwiZXhwZWN0IiwiYWxsIiwidHlwZSIsImNvZGUiLCJXRUIzX1JFUVVJUkVEIiwiQ09OVFJBQ1RfUkVRVUlSRUQiLCJhcmdzIiwiQUREUkVTU19SRVFVSVJFRCIsIm1hciIsIndlYjMiLCJldGgiLCJDb250cmFjdCIsImNvbnRyYWN0cyIsIlBhbmRvcmFNYXJrZXQiLCJhYmkiLCJhZGRyZXNzZXMiLCJtZXRob2RzIiwiZGF0YXNldHNDb3VudCIsImNhbGwiLCJjb3VudCIsIk51bWJlciIsInBhcnNlSW50IiwiZmV0Y2hBZGRyZXNzQnlJZCIsImlkIiwiZGF0YXNldHMiLCJkYXRhc2V0Q29udHJhY3QiLCJmZXRjaElwZnNBZGRyZXNzIiwiYWRkcmVzcyIsImRhdCIsIkRhdGFzZXQiLCJpcGZzQWRkcmVzcyIsInV0aWxzIiwiaGV4VG9Bc2NpaSIsImZldGNoRGF0YURpbSIsImRhdGFEaW0iLCJmZXRjaEN1cnJlbnRQcmljZSIsImN1cnJlbnRQcmljZSIsImZldGNoQmF0Y2hlc0NvdW50IiwiYmF0Y2hlc0NvdW50IiwiZmV0Y2hEZXNjcmlwdGlvbiIsImRlc2NyaXB0aW9uIiwiaGV4VG9VdGY4IiwiZmV0Y2hNZXRhZGF0YSIsIm1ldGFkYXRhIiwiZmV0Y2hEYXRhc2V0IiwiUHJvbWlzZSIsImZldGNoRGF0YXNldEJ5SWQiLCJkYXRhc2V0IiwiZmV0Y2hBbGwiLCJyZWNvcmRzIiwiZXJyb3IiLCJpIiwicHVzaCIsIm1lc3NhZ2UiLCJkZXBsb3kiLCJkYXRhc2V0SXBmc0hhc2giLCJwdWJsaXNoZXIiLCJkaW1lbnNpb24iLCJwcmljZSIsIldFQjNfTUVUQU1BU0tfUkVRVUlSRUQiLCJ1dGY4VG9IZXgiLCJ3ZWIzSGVscGVycyIsImVzdGltYXRlR2FzIiwiYnl0ZWNvZGUiLCJnYXMiLCJkZXBsb3lDb250cmFjdCIsImZyb20iLCJkYXRhc2V0Q29udHJhY3RBZGRyZXNzIiwiYWRkVG9NYXJrZXQiLCJwdWJsaXNoZXJBZGRyZXNzIiwicmVzb2x2ZSIsInJlamVjdCIsIm1hcmtldCIsImdldEdhc1ByaWNlIiwiZ2FzUHJpY2UiLCJhZGREYXRhc2V0Iiwic2VuZCIsIm9uIiwicmVjZWlwdCIsInN0YXR1cyIsIlRSQU5TQUNUSU9OX1VOU1VDQ0VTU0ZVTCIsImNvbnRyYWN0QWRkcmVzcyIsImV2ZW50cyIsIkRhdGFzZXRBZGRlZCIsInJldHVyblZhbHVlcyIsInJlbW92ZURhdGFzZXQiLCJkYXRhc2V0QWRkcmVzcyIsImV2ZW50RGF0YXNldEFkZGVkIiwib3B0aW9ucyIsImNhbGxiYWNrcyIsIm9uRGF0YSIsIm9uRXJyb3IiLCJjaGFpbiIsImRhdGEiLCJjYiIsImV2ZW50IiwibmFtZSIsImV2ZW50RGF0YXNldFJlbW92ZWQiLCJEYXRhc2V0UmVtb3ZlZCJdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7Ozs7O0FBU0E7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUVBOztBQUNBOztBQU9BOzs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUVBOzs7Ozs7QUFNTyxJQUFNQSxVQUFVO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQSwwQkFBRztBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBT0MsWUFBQUEsTUFBUCwyREFBZ0IsRUFBaEI7QUFFdEJDLFlBQUFBLE1BQU0sQ0FBQ0MsR0FBUCxDQUFXRixNQUFYLEVBQW1CO0FBQ2Ysc0JBQVE7QUFDSkcsZ0JBQUFBLElBQUksRUFBRSxRQURGO0FBRUpDLGdCQUFBQSxJQUFJLEVBQUVDO0FBRkYsZUFETztBQUtmLDZDQUErQjtBQUMzQkYsZ0JBQUFBLElBQUksRUFBRSxRQURxQjtBQUUzQkMsZ0JBQUFBLElBQUksRUFBRUUseUJBRnFCO0FBRzNCQyxnQkFBQUEsSUFBSSxFQUFFLENBQUMsZUFBRDtBQUhxQixlQUxoQjtBQVVmLHlDQUEyQjtBQUN2QkosZ0JBQUFBLElBQUksRUFBRSxTQURpQjtBQUV2QkMsZ0JBQUFBLElBQUks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TixHQUFjLEVBQWQ7QUFDQUgsWUFBQUEsS0FBSyxDQUFDRyxLQUFOLENBQVksQ0FBWixJQUFpQnZGLEdBQUcsQ0FBQzBFLE1BQUosQ0FBV2dCLGNBQVgsQ0FBMEJWLE9BQTFCLEVBQ1pYLEVBRFksQ0FDVCxNQURTO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQSxzQ0FDRCxtQkFBTWtCLEtBQU47QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUVSTix3QkFBQUEsU0FBUyxDQUFDQyxNQUFWLENBQWlCO0FBQ2J6QywwQkFBQUEsT0FBTyxFQUFFLENBQUM7QUFBQ3RCLDRCQUFBQSxPQUFPLEVBQUVvRSxLQUFLLENBQUNYLFlBQU4sQ0FBbUJyQztBQUE3QiwyQkFBRCxDQURJO0FBRWJnRCwwQkFBQUEsS0FBSyxFQUFMQTtBQUZhLHlCQUFqQjs7QUFGUTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQSxlQURDOztBQUFBO0FBQUE7QUFBQTtBQUFBLGlCQVFabEIsRUFSWSxDQVFULE9BUlMsRUFRQVksU0FBUyxDQUFDRSxPQVJWLENBQWpCO0FBU0FDLFlBQUFBLEtBQUssQ0FBQ0csS0FBTixDQUFZLENBQVosRUFBZUMsSUFBZixHQUFzQixnQkFBdEI7QUFwRCtCLCtDQXNEeEJKLEtBdER3Qjs7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQSxHQUFIOztBQUFBLGtCQUFuQkssbUJBQW1CO0FBQUE7QUFBQTtBQUFBLEdBQXpCIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBEYXRhc2V0cyByZWxhdGVkIG1ldGhvZHNcbiAqIFRoaXMgZmlsZSBpdCBpcyBhIHBhcnQgb2YgdGhlIFBhbmRvcmEgUHlycmhhIEphdmFzY3JpcHQgbGlicmFyeVxuICogXG4gKiBAZmlsZSBkYXRhc2V0cy5qc1xuICogQGF1dGhvciBLb3N0aWFudHluIFNteXJub3YgPGtvc3R5c2hAZ21haWwuY29tPlxuICogQGRhdGUgMjAxOFxuICovXG5cbid1c2Ugc3RyaWN0JztcblxuaW1wb3J0ICogYXMgZXhwZWN0IGZyb20gJy4vaGVscGVycy9leHBlY3QnO1xuaW1wb3J0IHBqc0Vycm9yLCB7XG4gICAgQ09OVFJBQ1RfUkVRVUlSRUQsXG4gICAgQUREUkVTU19SRVFVSVJFRCxcbiAgICBXRUIzX1JFUVVJUkVELFxuICAgIFdFQjNfTUVUQU1BU0tfUkVRVUlSRUQsXG4gICAgVFJBTlNBQ1RJT05fVU5TVUNDRVNTRlVMXG59IGZyb20gJy4vaGVscGVycy9lcnJvcnMnO1xuaW1wb3J0ICogYXMgd2ViM0hlbHBlcnMgZnJvbSAnLi9oZWxwZXJzL3dlYjMnO1xuXG4vKipcbiAqIEdldCBkYXRhc2V0cyBjb3VudCBmcm9tIFBhbmRvcmFNYXJrZXQgY29udHJhY3RcbiAqIFxuICogQHBhcmFtIHtPYmplY3R9IGNvbmZpZyBMaWJyYXJ5IGNvbmZpZyAocHJvdmlkZWQgYnkgdGhlIHByb3h5IGJ1dCBjYW4gYmUgb3ZlcnJpZGRlbilcbiAqIEByZXR1cm5zIHtQcm9taXNlfSBBIFByb21pc2Ugb2JqZWN0IHJlcHJlc2VudHMgdGhlIHtudW1iZXJ9IFxuICovXG5leHBvcnQgY29uc3QgZmV0Y2hDb3VudCA9IGFzeW5jIChjb25maWcgPSB7fSkgPT4ge1xuXG4gICAgZXhwZWN0LmFsbChjb25maWcsIHtcbiAgICAgICAgJ3dlYjMnOiB7XG4gICAgICAgICAgICB0eXBlOiAnb2JqZWN0JyxcbiAgICAgICAgICAgIGNvZGU6IFdFQjNfUkVRVUlSRURcbiAgICAgICAgfSxcbiAgICAgICAgJ2NvbnRyYWN0cy5QYW5kb3JhTWFya2V0LmFiaSc6IHtcbiAgICAgICAgICAgIHR5cGU6ICdvYmplY3QnLFxuICAgICAgICAgICAgY29kZTogQ09OVFJBQ1RfUkVRVUlSRUQsXG4gICAgICAgICAgICBhcmdzOiBbJ1BhbmRvcmFNYXJrZXQnXVxuICAgICAgICB9LFxuICAgICAgICAnYWRkcmVzc2VzLlBhbmRvcmFNYXJrZXQnOiB7XG4gICAgICAgICAgICB0eXBlOiAnYWRkcmVzcycsXG4gICAgICAgICAgICBjb2RlOiBBRERSRVNTX1JFUVVJUkVELFxuICAgICAgICAgICAgYXJnczogWydQYW5kb3JhTWFya2V0J11cbiAgICAgICAgfVxuICAgIH0pO1xuXG4gICAgY29uc3QgbWFyID0gbmV3IGNvbmZpZy53ZWIzLmV0aC5Db250cmFjdChjb25maWcuY29udHJhY3RzLlBhbmRvcmFNYXJrZXQuYWJpLCBjb25maWcuYWRkcmVzc2VzLlBhbmRvcmFNYXJrZXQpO1xuICAgIGNvbnN0IGNvdW50ID0gYXdhaXQgbWFyLm1ldGhvZHNcbiAgICAgICAgLmRhdGFzZXRzQ291bnQoKVxuICAgICAgICAuY2FsbCgpO1xuXG4gICAgcmV0dXJuIE51bWJlci5wYXJzZUludChjb3VudCwgMTApO1xufTtcblxuLyoqXG4gKiBHZXQgRGF0YXNldCBhZGRyZXNzIGJ5IGRhdGFzZXQgaWRcbiAqIFxuICogQHBhcmFtIHtudW1iZXJ9IGlkXG4gKiBAcGFyYW0ge09iamVjdH0gY29uZmlnIExpYnJhcnkgY29uZmlnIChwcm92aWRlZCBieSB0aGUgcHJveHkgYnV0IGNhbiBiZSBvdmVycmlkZGVuKVxuICogQHJldHVybnMge1Byb21pc2V9IEEgUHJvbWlzZSBvYmplY3QgcmVwcmVzZW50cyB0aGUge1N0cmluZ31cbiAqL1xuZXhwb3J0IGNvbnN0IGZldGNoQWRkcmVzc0J5SWQgPSBhc3luYyAoaWQsIGNvbmZpZyA9IHt9KSA9PiB7XG5cbiAgICBleHBlY3QuYWxsKHsgaWQgfSwge1xuICAgICAgICAnaWQnOiB7XG4gICAgICAgICAgICB0eXBlOiAnbnVtYmVyJ1xuICAgICAgICB9XG4gICAgfSk7XG5cbiAgICBleHBlY3QuYWxsKGNvbmZpZywge1xuICAgICAgICAnd2ViMyc6IHtcbiAgICAgICAgICAgIHR5cGU6ICdvYmplY3QnLFxuICAgICAgICAgICAgY29kZTogV0VCM19SRVFVSVJFRFxuICAgICAgICB9LFxuICAgICAgICAnY29udHJhY3RzLlBhbmRvcmFNYXJrZXQuYWJpJzoge1xuICAgICAgICAgICAgdHlwZTogJ29iamVjdCcsXG4gICAgICAgICAgICBjb2RlOiBDT05UUkFDVF9SRVFVSVJFRCxcbiAgICAgICAgICAgIGFyZ3M6IFsnUGFuZG9yYU1hcmtldCddXG4gICAgICAgIH0sXG4gICAgICAgICdhZGRyZXNzZXMuUGFuZG9yYU1hcmtldCc6IHtcbiAgICAgICAgICAgIHR5cGU6ICdhZGRyZXNzJyxcbiAgICAgICAgICAgIGNvZGU6IEFERFJFU1NfUkVRVUlSRUQsXG4gICAgICAgICAgICBhcmdzOiBbJ01hcmtldCddXG4gICAgICAgIH1cbiAgICB9KTtcblxuICAgIGNvbnN0IG1hciA9IG5ldyBjb25maWcud2ViMy5ldGguQ29udHJhY3QoY29uZmlnLmNvbnRyYWN0cy5QYW5kb3JhTWFya2V0LmFiaSwgY29uZmlnLmFkZHJlc3Nlcy5QYW5kb3JhTWFya2V0KTtcbiAgICBjb25zdCBkYXRhc2V0Q29udHJhY3QgPSBhd2FpdCBtYXIubWV0aG9kc1xuICAgICAgICAuZGF0YXNldHMoaWQpXG4gICAgICAgIC5jYWxsKCk7XG5cbiAgICByZXR1cm4gZGF0YXNldENvbnRyYWN0O1xufTtcblxuLyoqXG4gKiBHZXQgSVBGUyBhZGRyZXNzIGZyb20gRGF0YXNldCBjb250cmFjdCBieSB0aGUgZGF0YXNldCBhZGRyZXNzXG4gKiBcbiAqIEBwYXJhbSB7U3RyaW5nfSBhZGRyZXNzXG4gKiBAcGFyYW0ge09iamVjdH0gY29uZmlnIExpYnJhcnkgY29uZmlnIChwcm92aWRlZCBieSB0aGUgcHJveHkgYnV0IGNhbiBiZSBvdmVycmlkZGVuKVxuICogQHJldHVybnMge1Byb21pc2V9IEEgUHJvbWlzZSBvYmplY3QgcmVwcmVzZW50cyB0aGUge1N0cmluZ31cbiAqL1xuZXhwb3J0IGNvbnN0IGZldGNoSXBmc0FkZHJlc3MgPSBhc3luYyAoYWRkcmVzcyA9ICcnLCBjb25maWcgPSB7fSkgPT4ge1xuXG4gICAgZXhwZWN0LmFsbCh7IGFkZHJlc3MgfSwge1xuICAgICAgICAnYWRkcmVzcyc6IHtcbiAgICAgICAgICAgIHR5cGU6ICdhZGRyZXNzJ1xuICAgICAgICB9XG4gICAgfSk7XG5cbiAgICBleHBlY3QuYWxsKGNvbmZpZywge1xuICAgICAgICAnd2ViMyc6IHtcbiAgICAgICAgICAgIHR5cGU6ICdvYmplY3QnLFxuICAgICAgICAgICAgY29kZTogV0VCM19SRVFVSVJFRFxuICAgICAgICB9LFxuICAgICAgICAnY29udHJhY3RzLkRhdGFzZXQuYWJpJzoge1xuICAgICAgICAgICAgdHlwZTogJ29iamVjdCcsXG4gICAgICAgICAgICBjb2RlOiBDT05UUkFDVF9SRVFVSVJFRCxcbiAgICAgICAgICAgIGFyZ3M6IFsnRGF0YXNldCddXG4gICAgICAgIH1cbiAgICB9KTtcblxuICAgIGNvbnN0IGRhdCA9IG5ldyBjb25maWcud2ViMy5ldGguQ29udHJhY3QoY29uZmlnLmNvbnRyYWN0cy5EYXRhc2V0LmFiaSwgYWRkcmVzcyk7XG4gICAgY29uc3QgaXBmc0FkZHJlc3MgPSBhd2FpdCBkYXQubWV0aG9kc1xuICAgICAgICAuaXBmc0FkZHJlc3MoKVxuICAgICAgICAuY2FsbCgpO1xuXG4gICAgcmV0dXJuIGNvbmZpZy53ZWIzLnV0aWxzLmhleFRvQXNjaWkoaXBmc0FkZHJlc3MpO1xufTtcblxuLyoqXG4gKiBHZXQgZGF0YSBkaW0gZnJvbSBEYXRhc2V0IGNvbnRyYWN0IGJ5IHRoZSBkYXRhc2V0IGFkZHJlc3NcbiAqIFxuICogQHBhcmFtIHtTdHJpbmd9IGFkZHJlc3NcbiAqIEBwYXJhbSB7T2JqZWN0fSBjb25maWcgTGlicmFyeSBjb25maWcgKHByb3ZpZGVkIGJ5IHRoZSBwcm94eSBidXQgY2FuIGJlIG92ZXJyaWRkZW4pXG4gKiBAcmV0dXJucyB7UHJvbWlzZX0gQSBQcm9taXNlIG9iamVjdCByZXByZXNlbnRzIHRoZSB7bnVtYmVyfVxuICovXG5leHBvcnQgY29uc3QgZmV0Y2hEYXRhRGltID0gYXN5bmMgKGFkZHJlc3MgPSAnJywgY29uZmlnID0ge30pID0+IHtcblxuICAgIGV4cGVjdC5hbGwoeyBhZGRyZXNzIH0sIHtcbiAgICAgICAgJ2FkZHJlc3MnOiB7XG4gICAgICAgICAgICB0eXBlOiAnYWRkcmVzcydcbiAgICAgICAgfVxuICAgIH0pO1xuXG4gICAgZXhwZWN0LmFsbChjb25maWcsIHtcbiAgICAgICAgJ3dlYjMnOiB7XG4gICAgICAgICAgICB0eXBlOiAnb2JqZWN0JyxcbiAgICAgICAgICAgIGNvZGU6IFdFQjNfUkVRVUlSRURcbiAgICAgICAgfSxcbiAgICAgICAgJ2NvbnRyYWN0cy5EYXRhc2V0LmFiaSc6IHtcbiAgICAgICAgICAgIHR5cGU6ICdvYmplY3QnLFxuICAgICAgICAgICAgY29kZTogQ09OVFJBQ1RfUkVRVUlSRUQsXG4gICAgICAgICAgICBhcmdzOiBbJ0RhdGFzZXQnXVxuICAgICAgICB9XG4gICAgfSk7XG5cbiAgICBjb25zdCBkYXQgPSBuZXcgY29uZmlnLndlYjMuZXRoLkNvbnRyYWN0KGNvbmZpZy5jb250cmFjdHMuRGF0YXNldC5hYmksIGFkZHJlc3MpO1xuICAgIGNvbnN0IGRhdGFEaW0gPSBhd2FpdCBkYXQubWV0aG9kc1xuICAgICAgICAuZGF0YURpbSgpXG4gICAgICAgIC5jYWxsKCk7XG5cbiAgICByZXR1cm4gTnVtYmVyLnBhcnNlSW50KGRhdGFEaW0sIDEwKTtcbn07XG5cbi8qKlxuICogR2V0IGN1cnJlbnQgcHJpY2UgZnJvbSBEYXRhc2V0IGNvbnRyYWN0IGJ5IHRoZSBkYXRhc2V0IGFkZHJlc3NcbiAqIFxuICogQHBhcmFtIHtTdHJpbmd9IGFkZHJlc3NcbiAqIEBwYXJhbSB7T2JqZWN0fSBjb25maWcgTGlicmFyeSBjb25maWcgKHByb3ZpZGVkIGJ5IHRoZSBwcm94eSBidXQgY2FuIGJlIG92ZXJyaWRkZW4pXG4gKiBAcmV0dXJucyB7UHJvbWlzZX0gQSBQcm9taXNlIG9iamVjdCByZXByZXNlbnRzIHRoZSB7bnVtYmVyfVxuICovXG5leHBvcnQgY29uc3QgZmV0Y2hDdXJyZW50UHJpY2UgPSBhc3luYyAoYWRkcmVzcyA9ICcnLCBjb25maWcgPSB7fSkgPT4ge1xuXG4gICAgZXhwZWN0LmFsbCh7IGFkZHJlc3MgfSwge1xuICAgICAgICAnYWRkcmVzcyc6IHtcbiAgICAgICAgICAgIHR5cGU6ICdhZGRyZXNzJ1xuICAgICAgICB9XG4gICAgfSk7XG5cbiAgICBleHBlY3QuYWxsKGNvbmZpZywge1xuICAgICAgICAnd2ViMyc6IHtcbiAgICAgICAgICAgIHR5cGU6ICdvYmplY3QnLFxuICAgICAgICAgICAgY29kZTogV0VCM19SRVFVSVJFRFxuICAgICAgICB9LFxuICAgICAgICAnY29udHJhY3RzLkRhdGFzZXQuYWJpJzoge1xuICAgICAgICAgICAgdHlwZTogJ29iamVjdCcsXG4gICAgICAgICAgICBjb2RlOiBDT05UUkFDVF9SRVFVSVJFRCxcbiAgICAgICAgICAgIGFyZ3M6IFsnRGF0YXNldCddXG4gICAgICAgIH1cbiAgICB9KTtcblxuICAgIGNvbnN0IGRhdCA9IG5ldyBjb25maWcud2ViMy5ldGguQ29udHJhY3QoY29uZmlnLmNvbnRyYWN0cy5EYXRhc2V0LmFiaSwgYWRkcmVzcyk7XG4gICAgY29uc3QgY3VycmVudFByaWNlID0gYXdhaXQgZGF0Lm1ldGhvZHNcbiAgICAgICAgLmN1cnJlbnRQcmljZSgpXG4gICAgICAgIC5jYWxsKCk7XG5cbiAgICByZXR1cm4gTnVtYmVyLnBhcnNlSW50KGN1cnJlbnRQcmljZSwgMTApO1xufTtcblxuLyoqXG4gKiBHZXQgZGF0YSBiYXRjaGVzIGNvdW50IGZyb20gRGF0YXNldCBjb250cmFjdCBieSB0aGUgZGF0YXNldCBhZGRyZXNzXG4gKiBcbiAqIEBwYXJhbSB7U3RyaW5nfSBhZGRyZXNzXG4gKiBAcGFyYW0ge09iamVjdH0gY29uZmlnIExpYnJhcnkgY29uZmlnIChwcm92aWRlZCBieSB0aGUgcHJveHkgYnV0IGNhbiBiZSBvdmVycmlkZGVuKVxuICogQHJldHVybnMge1Byb21pc2V9IEEgUHJvbWlzZSBvYmplY3QgcmVwcmVzZW50cyB0aGUge251bWJlcn1cbiAqL1xuZXhwb3J0IGNvbnN0IGZldGNoQmF0Y2hlc0NvdW50ID0gYXN5bmMgKGFkZHJlc3MgPSAnJywgY29uZmlnID0ge30pID0+IHtcblxuICAgIGV4cGVjdC5hbGwoeyBhZGRyZXNzIH0sIHtcbiAgICAgICAgJ2FkZHJlc3MnOiB7XG4gICAgICAgICAgICB0eXBlOiAnYWRkcmVzcydcbiAgICAgICAgfVxuICAgIH0pO1xuXG4gICAgZXhwZWN0LmFsbChjb25maWcsIHtcbiAgICAgICAgJ3dlYjMnOiB7XG4gICAgICAgICAgICB0eXBlOiAnb2JqZWN0JyxcbiAgICAgICAgICAgIGNvZGU6IFdFQjNfUkVRVUlSRURcbiAgICAgICAgfSxcbiAgICAgICAgJ2NvbnRyYWN0cy5EYXRhc2V0LmFiaSc6IHtcbiAgICAgICAgICAgIHR5cGU6ICdvYmplY3QnLFxuICAgICAgICAgICAgY29kZTogQ09OVFJBQ1RfUkVRVUlSRUQsXG4gICAgICAgICAgICBhcmdzOiBbJ0RhdGFzZXQnXVxuICAgICAgICB9XG4gICAgfSk7XG5cbiAgICBjb25zdCBkYXQgPSBuZXcgY29uZmlnLndlYjMuZXRoLkNvbnRyYWN0KGNvbmZpZy5jb250cmFjdHMuRGF0YXNldC5hYmksIGFkZHJlc3MpO1xuICAgIGNvbnN0IGJhdGNoZXNDb3VudCA9IGF3YWl0IGRhdC5tZXRob2RzXG4gICAgICAgIC5iYXRjaGVzQ291bnQoKVxuICAgICAgICAuY2FsbCgpO1xuICAgICAgICBcbiAgICByZXR1cm4gTnVtYmVyLnBhcnNlSW50KGJhdGNoZXNDb3VudCwgMTApO1xufTtcblxuLyoqXG4gKiBHZXQgZGVzY3JpcHRpb24gZnJvbSBEYXRhc2V0IGNvbnRyYWN0IGJ5IHRoZSBkYXRhc2V0IGFkZHJlc3NcbiAqIFxuICogQHBhcmFtIHtTdHJpbmd9IGFkZHJlc3NcbiAqIEBwYXJhbSB7T2JqZWN0fSBjb25maWcgTGlicmFyeSBjb25maWcgKHByb3ZpZGVkIGJ5IHRoZSBwcm94eSBidXQgY2FuIGJlIG92ZXJyaWRkZW4pXG4gKiBAcmV0dXJucyB7UHJvbWlzZX0gQSBQcm9taXNlIG9iamVjdCByZXByZXNlbnRzIHRoZSB7bnVtYmVyfVxuICovXG5leHBvcnQgY29uc3QgZmV0Y2hEZXNjcmlwdGlvbiA9IGFzeW5jIChhZGRyZXNzID0gJycsIGNvbmZpZyA9IHt9KSA9PiB7XG5cbiAgICBleHBlY3QuYWxsKHsgYWRkcmVzcyB9LCB7XG4gICAgICAgICdhZGRyZXNzJzoge1xuICAgICAgICAgICAgdHlwZTogJ2FkZHJlc3MnXG4gICAgICAgIH1cbiAgICB9KTtcblxuICAgIGV4cGVjdC5hbGwoY29uZmlnLCB7XG4gICAgICAgICd3ZWIzJzoge1xuICAgICAgICAgICAgdHlwZTogJ29iamVjdCcsXG4gICAgICAgICAgICBjb2RlOiBXRUIzX1JFUVVJUkVEXG4gICAgICAgIH0sXG4gICAgICAgICdjb250cmFjdHMuRGF0YXNldC5hYmknOiB7XG4gICAgICAgICAgICB0eXBlOiAnb2JqZWN0JyxcbiAgICAgICAgICAgIGNvZGU6IENPTlRSQUNUX1JFUVVJUkVELFxuICAgICAgICAgICAgYXJnczogWydEYXRhc2V0J11cbiAgICAgICAgfVxuICAgIH0pO1xuXG4gICAgY29uc3QgZGF0ID0gbmV3IGNvbmZpZy53ZWIzLmV0aC5Db250cmFjdChjb25maWcuY29udHJhY3RzLkRhdGFzZXQuYWJpLCBhZGRyZXNzKTtcbiAgICBjb25zdCBkZXNjcmlwdGlvbiA9IGF3YWl0IGRhdC5tZXRob2RzXG4gICAgICAgIC5kZXNjcmlwdGlvbigpXG4gICAgICAgIC5jYWxsKCk7XG5cbiAgICByZXR1cm4gY29uZmlnLndlYjMudXRpbHMuaGV4VG9VdGY4KGRlc2NyaXB0aW9uKTtcbn07XG5cbi8qKlxuICogR2V0IG1ldGFkYXRhIGZyb20gRGF0YXNldCBjb250cmFjdCBieSB0aGUgZGF0YXNldCBhZGRyZXNzXG4gKiBcbiAqIEBwYXJhbSB7U3RyaW5nfSBhZGRyZXNzXG4gKiBAcGFyYW0ge09iamVjdH0gY29uZmlnIExpYnJhcnkgY29uZmlnIChwcm92aWRlZCBieSB0aGUgcHJveHkgYnV0IGNhbiBiZSBvdmVycmlkZGVuKVxuICogQHJldHVybnMge1Byb21pc2V9IEEgUHJvbWlzZSBvYmplY3QgcmVwcmVzZW50cyB0aGUge251bWJlcn1cbiAqL1xuZXhwb3J0IGNvbnN0IGZldGNoTWV0YWRhdGEgPSBhc3luYyAoYWRkcmVzcyA9ICcnLCBjb25maWcgPSB7fSkgPT4ge1xuXG4gICAgZXhwZWN0LmFsbCh7IGFkZHJlc3MgfSwge1xuICAgICAgICAnYWRkcmVzcyc6IHtcbiAgICAgICAgICAgIHR5cGU6ICdhZGRyZXNzJ1xuICAgICAgICB9XG4gICAgfSk7XG5cbiAgICBleHBlY3QuYWxsKGNvbmZpZywge1xuICAgICAgICAnd2ViMyc6IHtcbiAgICAgICAgICAgIHR5cGU6ICdvYmplY3QnLFxuICAgICAgICAgICAgY29kZTogV0VCM19SRVFVSVJFRFxuICAgICAgICB9LFxuICAgICAgICAnY29udHJhY3RzLkRhdGFzZXQuYWJpJzoge1xuICAgICAgICAgICAgdHlwZTogJ29iamVjdCcsXG4gICAgICAgICAgICBjb2RlOiBDT05UUkFDVF9SRVFVSVJFRCxcbiAgICAgICAgICAgIGFyZ3M6IFsnRGF0YXNldCddXG4gICAgICAgIH1cbiAgICB9KTtcblxuICAgIGNvbnN0IGRhdCA9IG5ldyBjb25maWcud2ViMy5ldGguQ29udHJhY3QoY29uZmlnLmNvbnRyYWN0cy5EYXRhc2V0LmFiaSwgYWRkcmVzcyk7XG4gICAgY29uc3QgbWV0YWRhdGEgPSBhd2FpdCBkYXQubWV0aG9kc1xuICAgICAgICAubWV0YWRhdGEoKVxuICAgICAgICAuY2FsbCgpO1xuXG4gICAgcmV0dXJuIGNvbmZpZy53ZWIzLnV0aWxzLmhleFRvVXRmOChtZXRhZGF0YSk7XG59O1xuXG4vKipcbiAqIEdldCBkYXRhc2V0IGJ5IHRoZSBkYXRhc2V0IGFkZHJlc3NcbiAqIFxuICogQHBhcmFtIHtTdHJpbmd9IGFkZHJlc3NcbiAqIEBwYXJhbSB7T2JqZWN0fSBjb25maWcgTGlicmFyeSBjb25maWcgKHByb3ZpZGVkIGJ5IHRoZSBwcm94eSBidXQgY2FuIGJlIG92ZXJyaWRkZW4pXG4gKiBAcmV0dXJucyB7UHJvbWlzZX0gUHJvbWlzZSBvYmplY3QgcmVwcmVzZW50cyB0aGUge09iamVjdFtdfVxuICovXG5leHBvcnQgY29uc3QgZmV0Y2hEYXRhc2V0ID0gYXN5bmMgKGFkZHJlc3MgPSAnJywgY29uZmlnID0ge30pID0+IHtcblxuICAgIGV4cGVjdC5hbGwoeyBhZGRyZXNzIH0sIHtcbiAgICAgICAgJ2FkZHJlc3MnOiB7XG4gICAgICAgICAgICB0eXBlOiAnYWRkcmVzcydcbiAgICAgICAgfVxuICAgIH0pO1xuXG4gICAgY29uc3QgW1xuICAgICAgICBpcGZzQWRkcmVzcyxcbiAgICAgICAgZGF0YURpbSxcbiAgICAgICAgY3VycmVudFByaWNlLFxuICAgICAgICBiYXRjaGVzQ291bnQsXG4gICAgICAgIG1ldGFkYXRhLCBcbiAgICAgICAgZGVzY3JpcHRpb25cbiAgICBdID0gYXdhaXQgUHJvbWlzZS5hbGwoW1xuICAgICAgICBmZXRjaElwZnNBZGRyZXNzKGFkZHJlc3MsIGNvbmZpZyksXG4gICAgICAgIGZldGNoRGF0YURpbShhZGRyZXNzLCBjb25maWcpLFxuICAgICAgICBmZXRjaEN1cnJlbnRQcmljZShhZGRyZXNzLCBjb25maWcpLFxuICAgICAgICBmZXRjaEJhdGNoZXNDb3VudChhZGRyZXNzLCBjb25maWcpLFxuICAgICAgICBmZXRjaE1ldGFkYXRhKGFkZHJlc3MsIGNvbmZpZyksXG4gICAgICAgIGZldGNoRGVzY3JpcHRpb24oYWRkcmVzcywgY29uZmlnKVxuICAgIF0pO1xuXG4gICAgcmV0dXJuIHtcbiAgICAgICAgYWRkcmVzcyxcbiAgICAgICAgaXBmc0FkZHJlc3MsXG4gICAgICAgIGRhdGFEaW0sXG4gICAgICAgIGN1cnJlbnRQcmljZSxcbiAgICAgICAgYmF0Y2hlc0NvdW50LFxuICAgICAgICBtZXRhZGF0YSxcbiAgICAgICAgZGVzY3JpcHRpb25cbiAgICB9O1xufTtcblxuLyoqXG4gKiBHZXQgZGF0YXNldCBieSBpZFxuICogXG4gKiBAcGFyYW0ge251bWJlcn0gaWQgXG4gKiBAcGFyYW0ge09iamVjdH0gY29uZmlnIExpYnJhcnkgY29uZmlnIChwcm92aWRlZCBieSB0aGUgcHJveHkgYnV0IGNhbiBiZSBvdmVycmlkZGVuKVxuICogQHJldHVybnMge1Byb21pc2V9IEEgUHJvbWlzZSBvYmplY3QgcmVwcmVzZW50cyB0aGUge09iamVjdH1cbiAqL1xuZXhwb3J0IGNvbnN0IGZldGNoRGF0YXNldEJ5SWQgPSBhc3luYyAoaWQsIGNvbmZpZyA9IHt9KSA9PiB7XG5cbiAgICBjb25zdCBhZGRyZXNzID0gYXdhaXQgZmV0Y2hBZGRyZXNzQnlJZChpZCwgY29uZmlnKTtcbiAgICBjb25zdCBkYXRhc2V0ID0gYXdhaXQgZmV0Y2hEYXRhc2V0KGFkZHJlc3MsIGNvbmZpZyk7XG5cbiAgICByZXR1cm4gZGF0YXNldDtcbn07XG5cbi8qKlxuICogR2V0IGFsbCBkYXRhc2V0c1xuICogXG4gKiBAcGFyYW0ge09iamVjdH0gY29uZmlnIExpYnJhcnkgY29uZmlnIChwcm92aWRlZCBieSB0aGUgcHJveHkgYnV0IGNhbiBiZSBvdmVycmlkZGVuKVxuICogQHJldHVybnMge1Byb21pc2V9IFByb21pc2Ugb2JqZWN0IHJlcHJlc2VudHMgdGhlIHtPYmplY3RbXX1cbiAqL1xuZXhwb3J0IGNvbnN0IGZldGNoQWxsID0gYXN5bmMgKGNvbmZpZyA9IHt9KSA9PiB7XG5cbiAgICBsZXQgcmVjb3JkcyA9IFtdO1xuICAgIGxldCBlcnJvciA9IFtdO1xuXG4gICAgdHJ5IHtcblxuICAgICAgICBjb25zdCBjb3VudCA9IGF3YWl0IGZldGNoQ291bnQoY29uZmlnKTtcblxuICAgICAgICBmb3IgKGxldCBpPTA7IGkgPCBjb3VudDsgaSsrKSB7XG4gICAgICAgICAgICBcbiAgICAgICAgICAgIHRyeSB7XG5cbiAgICAgICAgICAgICAgICBjb25zdCBkYXRhc2V0ID0gYXdhaXQgZmV0Y2hEYXRhc2V0QnlJZChpLCBjb25maWcpO1xuXG4gICAgICAgICAgICAgICAgcmVjb3Jkcy5wdXNoKHtcbiAgICAgICAgICAgICAgICAgICAgaWQ6IGksXG4gICAgICAgICAgICAgICAgICAgIC4uLmRhdGFzZXRcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH0gY2F0Y2goZXJyKSB7XG4gICAgICAgICAgICAgICAgZXJyb3IucHVzaCh7XG4gICAgICAgICAgICAgICAgICAgIGlkOiBpLFxuICAgICAgICAgICAgICAgICAgICBtZXNzYWdlOiBlcnIubWVzc2FnZVxuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfSAgICAgICAgXG4gICAgICAgIH1cbiAgICB9IGNhdGNoKGVycikge1xuICAgICAgICBlcnJvci5wdXNoKHtcbiAgICAgICAgICAgIGVycm9yOiBlcnIubWVzc2FnZVxuICAgICAgICB9KTtcbiAgICB9ICAgXG5cbiAgICByZXR1cm4ge1xuICAgICAgICByZWNvcmRzLFxuICAgICAgICBlcnJvclxuICAgIH07XG59O1xuXG4vKipcbiAqIERlcGxveSBEYXRzZXQgY29udHJhY3QgdG8gdGhlIG5ldHdvcmtcbiAqIFxuICogQHBhcmFtIHtTdHJpbmd9IGRhdGFzZXRJcGZzSGFzaCBcbiAqIEBwYXJhbSB7TnVtYmVyfSBiYXRjaGVzQ291bnQgQ291bnQgb2YgYmF0Y2hlcyBpbiBkYXRhc2V0XG4gKiBAcGFyYW0ge09iamVjdH0gb3B0aW9ucyB7IGRpbWVuc2lvbiwgcHJpY2UsIG1ldGFkYXRhLCBkZXNjcmlwdGlvbiB9IFxuICogQHBhcmFtIHtTdHJpbmd9IHB1Ymxpc2hlciBQdWJsaXNoZXIgYWRkcmVzc1xuICogQHBhcmFtIHtPYmplY3R9IGNvbmZpZyBMaWJyYXJ5IGNvbmZpZyAocHJvdmlkZWQgYnkgdGhlIHByb3h5IGJ1dCBjYW4gYmUgb3ZlcnJpZGRlbilcbiAqIEByZXR1cm5zIHtQcm9taXNlfSBQcm9taXNlIG9iamVjdCByZXNvbHZlZCB0byBjb250cmFjdCBhZGRyZXNzXG4gKi9cbmV4cG9ydCBjb25zdCBkZXBsb3kgPSBhc3luYyAoZGF0YXNldElwZnNIYXNoLCBiYXRjaGVzQ291bnQsIHsgZGltZW5zaW9uLCBwcmljZSwgbWV0YWRhdGEsIGRlc2NyaXB0aW9uIH0sIHB1Ymxpc2hlciwgY29uZmlnID0ge30pID0+IHtcblxuICAgIGV4cGVjdC5hbGwoeyBkYXRhc2V0SXBmc0hhc2gsIGJhdGNoZXNDb3VudCwgcHVibGlzaGVyLCBkaW1lbnNpb24sIHByaWNlLCBtZXRhZGF0YSwgZGVzY3JpcHRpb24gfSwge1xuICAgICAgICAnZGF0YXNldElwZnNIYXNoJzoge1xuICAgICAgICAgICAgdHlwZTogJ3N0cmluZydcbiAgICAgICAgfSxcbiAgICAgICAgJ2JhdGNoZXNDb3VudCc6IHtcbiAgICAgICAgICAgIHR5cGU6ICdudW1iZXInXG4gICAgICAgIH0sXG4gICAgICAgICdwdWJsaXNoZXInOiB7XG4gICAgICAgICAgICB0eXBlOiAnYWRkcmVzcydcbiAgICAgICAgfSxcbiAgICAgICAgJ2RpbWVuc2lvbic6IHtcbiAgICAgICAgICAgIHR5cGU6ICdudW1iZXInXG4gICAgICAgIH0sXG4gICAgICAgICdwcmljZSc6IHtcbiAgICAgICAgICAgIHR5cGU6ICdudW1iZXInXG4gICAgICAgIH0sXG4gICAgICAgICdtZXRhZGF0YSc6IHtcbiAgICAgICAgICAgIHR5cGU6ICdzdHJpbmcnXG4gICAgICAgIH0sXG4gICAgICAgICdkZXNjcmlwdGlvbic6IHtcbiAgICAgICAgICAgIHR5cGU6ICdzdHJpbmcnXG4gICAgICAgIH0gICAgICAgIFxuICAgIH0pO1xuXG4gICAgZXhwZWN0LmFsbChjb25maWcsIHtcbiAgICAgICAgJ3dlYjMnOiB7XG4gICAgICAgICAgICB0eXBlOiAnb2JqZWN0JyxcbiAgICAgICAgICAgIGNvZGU6IFdFQjNfUkVRVUlSRURcbiAgICAgICAgfSxcbiAgICAgICAgJ2NvbnRyYWN0cy5EYXRhc2V0Jzoge1xuICAgICAgICAgICAgdHlwZTogJ29iamVjdCcsXG4gICAgICAgICAgICBjb2RlOiBDT05UUkFDVF9SRVFVSVJFRCxcbiAgICAgICAgICAgIGFyZ3M6IFsnRGF0YXNldCddXG4gICAgICAgIH0sXG4gICAgICAgICd3ZWIzLmN1cnJlbnRQcm92aWRlci5pc01ldGFNYXNrJzoge1xuICAgICAgICAgICAgdHlwZTogJ2Jvb2xlYW4nLFxuICAgICAgICAgICAgY29kZTogV0VCM19NRVRBTUFTS19SRVFVSVJFRFxuICAgICAgICB9XG4gICAgfSk7XG5cbiAgICBjb25zdCBhcmdzID0gW1xuICAgICAgICBjb25maWcud2ViMy51dGlscy51dGY4VG9IZXgoZGF0YXNldElwZnNIYXNoKSwgXG4gICAgICAgIGRpbWVuc2lvbiwgXG4gICAgICAgIGJhdGNoZXNDb3VudCwgXG4gICAgICAgIHByaWNlLCBcbiAgICAgICAgY29uZmlnLndlYjMudXRpbHMudXRmOFRvSGV4KG1ldGFkYXRhKSxcbiAgICAgICAgY29uZmlnLndlYjMudXRpbHMudXRmOFRvSGV4KGRlc2NyaXB0aW9uKVxuICAgIF07XG4gICAgICAgIFxuICAgIC8vIEVzdGltYXRlIHJlcXVpcmVkIGFtb3VudCBvZiBnYXNcbiAgICBjb25zdCBnYXMgPSBhd2FpdCB3ZWIzSGVscGVycy5lc3RpbWF0ZUdhcyhjb25maWcuY29udHJhY3RzLkRhdGFzZXQuYnl0ZWNvZGUsIGFyZ3MsIGNvbmZpZyk7XG5cbiAgICAvLyBDcmVhdGUgYW5kIGRlcGxveSBkYXRhc2V0IGNvbnRyYWN0XG4gICAgY29uc3QgZGF0YXNldENvbnRyYWN0QWRkcmVzcyA9IGF3YWl0IHdlYjNIZWxwZXJzLmRlcGxveUNvbnRyYWN0KGNvbmZpZy5jb250cmFjdHMuRGF0YXNldCwge1xuICAgICAgICBhcmdzLFxuICAgICAgICBmcm9tOiBwdWJsaXNoZXIsXG4gICAgICAgIGdhczogTnVtYmVyLnBhcnNlSW50KGdhcyAqIDEuNSwgMTApXG4gICAgfSwgY29uZmlnKTtcblxuICAgIHJldHVybiBkYXRhc2V0Q29udHJhY3RBZGRyZXNzO1xufTtcblxuLyoqXG4gKiBBZGQgZGF0YXNldCB0byBtYXJrZXRcbiAqIFxuICogQHBhcmFtIHtTdHJpbmd9IGRhdGFzZXRDb250cmFjdEFkZHJlc3MgXG4gKiBAcGFyYW0ge1N0cmluZ30gcHVibGlzaGVyQWRkcmVzcyBcbiAqIEBwYXJhbSB7T2JqZWN0fSBjb25maWcgTGlicmFyeSBjb25maWcgKHByb3ZpZGVkIGJ5IHRoZSBwcm94eSBidXQgY2FuIGJlIG92ZXJyaWRkZW4pXG4gKiBAcmV0dXJucyB7UHJvbWlzZX0gUHJvbWlzZSBvYmplY3QgcmVzb2x2ZWQgdG8ge1N0cmluZ30gY29udHJhY3RBZGRyZXNzXG4gKi9cbmV4cG9ydCBjb25zdCBhZGRUb01hcmtldCA9IChkYXRhc2V0Q29udHJhY3RBZGRyZXNzLCBwdWJsaXNoZXJBZGRyZXNzLCBjb25maWcgPSB7fSkgPT4gbmV3IFByb21pc2UoYXN5bmMgKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuXG4gICAgZXhwZWN0LmFsbCh7IGRhdGFzZXRDb250cmFjdEFkZHJlc3MsIHB1Ymxpc2hlckFkZHJlc3MgfSwge1xuICAgICAgICAnZGF0YXNldENvbnRyYWN0QWRkcmVzcyc6IHtcbiAgICAgICAgICAgIHR5cGU6ICdhZGRyZXNzJ1xuICAgICAgICB9LFxuICAgICAgICAncHVibGlzaGVyQWRkcmVzcyc6IHtcbiAgICAgICAgICAgIHR5cGU6ICdhZGRyZXNzJ1xuICAgICAgICB9XG4gICAgfSk7XG5cbiAgICBleHBlY3QuYWxsKGNvbmZpZywge1xuICAgICAgICAnd2ViMyc6IHtcbiAgICAgICAgICAgIHR5cGU6ICdvYmplY3QnLFxuICAgICAgICAgICAgY29kZTogV0VCM19SRVFVSVJFRFxuICAgICAgICB9LFxuICAgICAgICAnY29udHJhY3RzLlBhbmRvcmFNYXJrZXQuYWJpJzoge1xuICAgICAgICAgICAgdHlwZTogJ29iamVjdCcsXG4gICAgICAgICAgICBjb2RlOiBDT05UUkFDVF9SRVFVSVJFRCxcbiAgICAgICAgICAgIGFyZ3M6IFsnUGFuZG9yYU1hcmtldCddXG4gICAgICAgIH0sXG4gICAgICAgICdhZGRyZXNzZXMuUGFuZG9yYU1hcmtldCc6IHtcbiAgICAgICAgICAgIHR5cGU6ICdhZGRyZXNzJyxcbiAgICAgICAgICAgIGNvZGU6IEFERFJFU1NfUkVRVUlSRUQsXG4gICAgICAgICAgICBhcmdzOiBbJ01hcmtldCddXG4gICAgICAgIH0sXG4gICAgICAgICd3ZWIzLmN1cnJlbnRQcm92aWRlci5pc01ldGFNYXNrJzoge1xuICAgICAgICAgICAgdHlwZTogJ2Jvb2xlYW4nLFxuICAgICAgICAgICAgY29kZTogV0VCM19NRVRBTUFTS19SRVFVSVJFRFxuICAgICAgICB9XG4gICAgfSk7XG5cbiAgICBjb25zdCBtYXJrZXQgPSBuZXcgY29uZmlnLndlYjMuZXRoLkNvbnRyYWN0KGNvbmZpZy5jb250cmFjdHMuUGFuZG9yYU1hcmtldC5hYmksIGNvbmZpZy5hZGRyZXNzZXMuUGFuZG9yYU1hcmtldCk7XG4gICAgY29uc3QgZ2FzUHJpY2UgPSBhd2FpdCBjb25maWcud2ViMy5ldGguZ2V0R2FzUHJpY2UoKTtcbiAgICBtYXJrZXQubWV0aG9kc1xuICAgICAgICAuYWRkRGF0YXNldChkYXRhc2V0Q29udHJhY3RBZGRyZXNzKVxuICAgICAgICAuc2VuZCh7XG4gICAgICAgICAgICBmcm9tOiBwdWJsaXNoZXJBZGRyZXNzLFxuICAgICAgICAgICAgZ2FzUHJpY2VcbiAgICAgICAgfSlcbiAgICAgICAgLm9uKCdlcnJvcicsIHJlamVjdClcbiAgICAgICAgLm9uKCdyZWNlaXB0JywgcmVjZWlwdCA9PiB7XG5cbiAgICAgICAgICAgIGlmIChOdW1iZXIocmVjZWlwdC5zdGF0dXMpID09PSAwKSB7XG5cbiAgICAgICAgICAgICAgICByZXR1cm4gcmVqZWN0KHBqc0Vycm9yKFRSQU5TQUNUSU9OX1VOU1VDQ0VTU0ZVTCkpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICByZXNvbHZlKHJlY2VpcHQuY29udHJhY3RBZGRyZXNzIHx8IHJlY2VpcHQuZXZlbnRzLkRhdGFzZXRBZGRlZC5yZXR1cm5WYWx1ZXMuZGF0YXNldCk7XG4gICAgICAgIH0pO1xuICAgIC8vIEBub3RlIEluIGNhc2Ugb2YgZ2FuYWNoZS1jbGkgYmxvY2tjaGFpbiBcImNvbnRyYWN0QWRkcmVzc1wiIGFsd2F5cyB3aWxsIGJlIGVxdWFsIHRvIG51bGxcbn0pO1xuXG4vKipcbiAqIFJlbW92ZSBkYXRhc2V0IGZyb20gUGFuZG9yYU1hcmtldFxuICogXG4gKiBAcGFyYW0ge1N0cmluZ30gZGF0YXNldEFkZHJlc3NcbiAqIEBwYXJhbSB7U3RyaW5nfSBwdWJsaXNoZXJBZGRyZXNzIFxuICogQHBhcmFtIHtPYmplY3R9IGNvbmZpZyBMaWJyYXJ5IGNvbmZpZyAocHJvdmlkZWQgYnkgdGhlIHByb3h5IGJ1dCBjYW4gYmUgb3ZlcnJpZGRlbikgXG4gKi9cbmV4cG9ydCBjb25zdCByZW1vdmVEYXRhc2V0ID0gKGRhdGFzZXRBZGRyZXNzLCBwdWJsaXNoZXJBZGRyZXNzLCBjb25maWcgPSB7fSkgPT4gbmV3IFByb21pc2UoYXN5bmMgKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuXG4gICAgZXhwZWN0LmFsbCh7IGRhdGFzZXRBZGRyZXNzLCBwdWJsaXNoZXJBZGRyZXNzIH0sIHtcbiAgICAgICAgJ2RhdGFzZXRBZGRyZXNzJzoge1xuICAgICAgICAgICAgdHlwZTogJ2FkZHJlc3MnXG4gICAgICAgIH0sXG4gICAgICAgICdwdWJsaXNoZXJBZGRyZXNzJzoge1xuICAgICAgICAgICAgdHlwZTogJ2FkZHJlc3MnXG4gICAgICAgIH1cbiAgICB9KTtcblxuICAgIGV4cGVjdC5hbGwoY29uZmlnLCB7XG4gICAgICAgICd3ZWIzJzoge1xuICAgICAgICAgICAgdHlwZTogJ29iamVjdCcsXG4gICAgICAgICAgICBjb2RlOiBXRUIzX1JFUVVJUkVEXG4gICAgICAgIH0sXG4gICAgICAgICdjb250cmFjdHMuUGFuZG9yYU1hcmtldC5hYmknOiB7XG4gICAgICAgICAgICB0eXBlOiAnb2JqZWN0JyxcbiAgICAgICAgICAgIGNvZGU6IENPTlRSQUNUX1JFUVVJUkVELFxuICAgICAgICAgICAgYXJnczogWydQYW5kb3JhTWFya2V0J11cbiAgICAgICAgfSxcbiAgICAgICAgJ2FkZHJlc3Nlcy5QYW5kb3JhTWFya2V0Jzoge1xuICAgICAgICAgICAgdHlwZTogJ2FkZHJlc3MnLFxuICAgICAgICAgICAgY29kZTogQUREUkVTU19SRVFVSVJFRCxcbiAgICAgICAgICAgIGFyZ3M6IFsnUGFuZG9yYU1hcmtldCddXG4gICAgICAgIH1cbiAgICB9KTtcblxuICAgIGNvbnN0IG1hcmtldCA9IG5ldyBjb25maWcud2ViMy5ldGguQ29udHJhY3QoY29uZmlnLmNvbnRyYWN0cy5QYW5kb3JhTWFya2V0LmFiaSwgY29uZmlnLmFkZHJlc3Nlcy5QYW5kb3JhTWFya2V0KTtcbiAgICBjb25zdCBnYXNQcmljZSA9IGF3YWl0IGNvbmZpZy53ZWIzLmV0aC5nZXRHYXNQcmljZSgpO1xuICAgIG1hcmtldC5tZXRob2RzXG4gICAgICAgIC5yZW1vdmVEYXRhc2V0KGRhdGFzZXRBZGRyZXNzKVxuICAgICAgICAuc2VuZCh7XG4gICAgICAgICAgICBmcm9tOiBwdWJsaXNoZXJBZGRyZXNzLFxuICAgICAgICAgICAgZ2FzUHJpY2VcbiAgICAgICAgfSlcbiAgICAgICAgLm9uKCdlcnJvcicsIHJlamVjdClcbiAgICAgICAgLm9uKCdyZWNlaXB0JywgcmVjZWlwdCA9PiB7XG5cbiAgICAgICAgICAgIGlmIChOdW1iZXIocmVjZWlwdC5zdGF0dXMpID09PSAwKSB7XG5cbiAgICAgICAgICAgICAgICByZXR1cm4gcmVqZWN0KHBqc0Vycm9yKFRSQU5TQUNUSU9OX1VOU1VDQ0VTU0ZVTCkpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICByZXNvbHZlKHJlY2VpcHQuY29udHJhY3RBZGRyZXNzKTtcbiAgICAgICAgfSk7XG59KTtcblxuLyoqXG4gKiBIYW5kbGUgZXZlbnQgRGF0YXNldEFkZGVkXG4gKiBcbiAqIEBwYXJhbSB7T2JqZWN0fSBvcHRpb25zIEV2ZW50IGhhbmRsZXIgb3B0aW9uc1xuICogQHBhcmFtIHtPYmplY3R9IGNvbmZpZyBMaWJyYXJ5IGNvbmZpZyAocHJvdmlkZWQgYnkgdGhlIHByb3h5IGJ1dCBjYW4gYmUgb3ZlcnJpZGRlbilcbiAqIEByZXR1cm5zIHtQcm9taXNlPHtPYmplY3R9Pn0gUFByb21pc2Ugb2JqZWN0IHJlc29sdmVkIHRvIHRoZSBvYmplY3Qgd2l0aCBjaGFpbmVkIGNhbGxiYWNrcyAjZGF0YSBhbmQgI2Vycm9yXG4gKi9cbmV4cG9ydCBjb25zdCBldmVudERhdGFzZXRBZGRlZCA9IGFzeW5jIChvcHRpb25zID0ge30sIGNvbmZpZyA9IHt9KSA9PiB7XG5cbiAgICBleHBlY3QuYWxsKHsgb3B0aW9ucyB9LCB7XG4gICAgICAgICdvcHRpb25zJzoge1xuICAgICAgICAgICAgdHlwZTogJ29iamVjdCdcbiAgICAgICAgfVxuICAgIH0pO1xuXG4gICAgZXhwZWN0LmFsbChjb25maWcsIHtcbiAgICAgICAgJ3dlYjMnOiB7XG4gICAgICAgICAgICB0eXBlOiAnb2JqZWN0JyxcbiAgICAgICAgICAgIGNvZGU6IFdFQjNfUkVRVUlSRURcbiAgICAgICAgfSxcbiAgICAgICAgJ2NvbnRyYWN0cy5QYW5kb3JhTWFya2V0LmFiaSc6IHtcbiAgICAgICAgICAgIHR5cGU6ICdvYmplY3QnLFxuICAgICAgICAgICAgY29kZTogQ09OVFJBQ1RfUkVRVUlSRUQsXG4gICAgICAgICAgICBhcmdzOiBbJ1BhbmRvcmFNYXJrZXQnXVxuICAgICAgICB9LFxuICAgICAgICAnYWRkcmVzc2VzLlBhbmRvcmFNYXJrZXQnOiB7XG4gICAgICAgICAgICB0eXBlOiAnYWRkcmVzcycsXG4gICAgICAgICAgICBjb2RlOiBBRERSRVNTX1JFUVVJUkVELFxuICAgICAgICAgICAgYXJnczogWydNYXJrZXQnXVxuICAgICAgICB9XG4gICAgfSk7XG5cbiAgICBjb25zdCBjYWxsYmFja3MgPSB7XG4gICAgICAgIG9uRGF0YTogKCkgPT4ge30sXG4gICAgICAgIG9uRXJyb3I6ICgpID0+IHt9XG4gICAgfTtcblxuICAgIGNvbnN0IGNoYWluID0ge1xuICAgICAgICBkYXRhOiAoY2IgPSAoKSA9PiB7fSkgPT4ge1xuICAgICAgICAgICAgY2FsbGJhY2tzLm9uRGF0YSA9IGNiO1xuICAgICAgICAgICAgcmV0dXJuIGNoYWluO1xuICAgICAgICB9LFxuICAgICAgICBlcnJvcjogKGNiID0gKCkgPT4ge30pID0+IHtcbiAgICAgICAgICAgIGNhbGxiYWNrcy5vbkVycm9yID0gY2I7XG4gICAgICAgICAgICByZXR1cm4gY2hhaW47XG4gICAgICAgIH1cbiAgICB9O1xuXG4gICAgY29uc3QgbWFyID0gbmV3IGNvbmZpZy53ZWIzLmV0aC5Db250cmFjdChjb25maWcuY29udHJhY3RzLlBhbmRvcmFNYXJrZXQuYWJpLCBjb25maWcuYWRkcmVzc2VzLlBhbmRvcmFNYXJrZXQpO1xuICAgIGNoYWluLmV2ZW50ID0gW107XG4gICAgY2hhaW4uZXZlbnRbMF0gPSBtYXIuZXZlbnRzLkRhdGFzZXRBZGRlZChvcHRpb25zKVxuICAgICAgICAub24oJ2RhdGEnLCBhc3luYyBldmVudCA9PiB7XG5cbiAgICAgICAgICAgIHRyeSB7XG5cbiAgICAgICAgICAgICAgICBjb25zdCBkYXRhc2V0ID0gYXdhaXQgZmV0Y2hEYXRhc2V0KGV2ZW50LnJldHVyblZhbHVlcy5kYXRhc2V0LCBjb25maWcpO1xuICAgICAgICAgICAgICAgIGNhbGxiYWNrcy5vbkRhdGEoe1xuICAgICAgICAgICAgICAgICAgICByZWNvcmRzOiBbZGF0YXNldF0sXG4gICAgICAgICAgICAgICAgICAgIGV2ZW50XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9IGNhdGNoKGVycikge1xuICAgICAgICAgICAgICAgIGNhbGxiYWNrcy5vbkVycm9yKGVycik7XG4gICAgICAgICAgICB9ICAgICAgICAgICAgXG4gICAgICAgIH0pXG4gICAgICAgIC5vbignZXJyb3InLCBjYWxsYmFja3Mub25FcnJvcik7XG4gICAgY2hhaW4uZXZlbnRbMF0ubmFtZSA9ICdEYXRhc2V0QWRkZWQnO1xuXG4gICAgcmV0dXJuIGNoYWluO1xufTtcblxuLyoqXG4gKiBIYW5kbGUgZXZlbnQgRGF0YXNldFJlbW92ZWRcbiAqIFxuICogQHBhcmFtIHtPYmplY3R9IG9wdGlvbnMgRXZlbnQgaGFuZGxlciBvcHRpb25zXG4gKiBAcGFyYW0ge09iamVjdH0gY29uZmlnIExpYnJhcnkgY29uZmlnIChwcm92aWRlZCBieSB0aGUgcHJveHkgYnV0IGNhbiBiZSBvdmVycmlkZGVuKVxuICogQHJldHVybnMge1Byb21pc2U8e09iamVjdH0+fSBQUHJvbWlzZSBvYmplY3QgcmVzb2x2ZWQgdG8gdGhlIG9iamVjdCB3aXRoIGNoYWluZWQgY2FsbGJhY2tzICNkYXRhIGFuZCAjZXJyb3JcbiAqL1xuZXhwb3J0IGNvbnN0IGV2ZW50RGF0YXNldFJlbW92ZWQgPSBhc3luYyAob3B0aW9ucyA9IHt9LCBjb25maWcgPSB7fSkgPT4ge1xuXG4gICAgZXhwZWN0LmFsbCh7IG9wdGlvbnMgfSwge1xuICAgICAgICAnb3B0aW9ucyc6IHtcbiAgICAgICAgICAgIHR5cGU6ICdvYmplY3QnXG4gICAgICAgIH1cbiAgICB9KTtcblxuICAgIGV4cGVjdC5hbGwoY29uZmlnLCB7XG4gICAgICAgICd3ZWIzJzoge1xuICAgICAgICAgICAgdHlwZTogJ29iamVjdCcsXG4gICAgICAgICAgICBjb2RlOiBXRUIzX1JFUVVJUkVEXG4gICAgICAgIH0sXG4gICAgICAgICdjb250cmFjdHMuUGFuZG9yYU1hcmtldC5hYmknOiB7XG4gICAgICAgICAgICB0eXBlOiAnb2JqZWN0JyxcbiAgICAgICAgICAgIGNvZGU6IENPTlRSQUNUX1JFUVVJUkVELFxuICAgICAgICAgICAgYXJnczogWydQYW5kb3JhTWFya2V0J11cbiAgICAgICAgfSxcbiAgICAgICAgJ2FkZHJlc3Nlcy5QYW5kb3JhTWFya2V0Jzoge1xuICAgICAgICAgICAgdHlwZTogJ2FkZHJlc3MnLFxuICAgICAgICAgICAgY29kZTogQUREUkVTU19SRVFVSVJFRCxcbiAgICAgICAgICAgIGFyZ3M6IFsnUGFuZG9yYU1hcmtldCddXG4gICAgICAgIH1cbiAgICB9KTtcblxuICAgIGNvbnN0IGNhbGxiYWNrcyA9IHtcbiAgICAgICAgb25EYXRhOiAoKSA9PiB7fSxcbiAgICAgICAgb25FcnJvcjogKCkgPT4ge31cbiAgICB9O1xuXG4gICAgY29uc3QgY2hhaW4gPSB7XG4gICAgICAgIGRhdGE6IChjYiA9ICgpID0+IHt9KSA9PiB7XG4gICAgICAgICAgICBjYWxsYmFja3Mub25EYXRhID0gY2I7XG4gICAgICAgICAgICByZXR1cm4gY2hhaW47XG4gICAgICAgIH0sXG4gICAgICAgIGVycm9yOiAoY2IgPSAoKSA9PiB7fSkgPT4ge1xuICAgICAgICAgICAgY2FsbGJhY2tzLm9uRXJyb3IgPSBjYjtcbiAgICAgICAgICAgIHJldHVybiBjaGFpbjtcbiAgICAgICAgfVxuICAgIH07XG5cbiAgICBjb25zdCBtYXIgPSBuZXcgY29uZmlnLndlYjMuZXRoLkNvbnRyYWN0KGNvbmZpZy5jb250cmFjdHMuUGFuZG9yYU1hcmtldC5hYmksIGNvbmZpZy5hZGRyZXNzZXMuUGFuZG9yYU1hcmtldCk7XG4gICAgY2hhaW4uZXZlbnQgPSBbXTtcbiAgICBjaGFpbi5ldmVudFswXSA9IG1hci5ldmVudHMuRGF0YXNldFJlbW92ZWQob3B0aW9ucylcbiAgICAgICAgLm9uKCdkYXRhJywgYXN5bmMgZXZlbnQgPT4ge1xuXG4gICAgICAgICAgICBjYWxsYmFja3Mub25EYXRhKHtcbiAgICAgICAgICAgICAgICByZWNvcmRzOiBbe2FkZHJlc3M6IGV2ZW50LnJldHVyblZhbHVlcy5kYXRhc2V0fV0sXG4gICAgICAgICAgICAgICAgZXZlbnRcbiAgICAgICAgICAgIH0pOyAgICAgICAgICAgIFxuICAgICAgICB9KVxuICAgICAgICAub24oJ2Vycm9yJywgY2FsbGJhY2tzLm9uRXJyb3IpO1xuICAgIGNoYWluLmV2ZW50WzBdLm5hbWUgPSAnRGF0YXNldFJlbW92ZWQnO1xuXG4gICAgcmV0dXJuIGNoYWluO1xufTtcbiJdfQ==