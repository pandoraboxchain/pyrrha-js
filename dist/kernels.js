/**
 * Kernels related methods
 * This file it is a part of the Pandora Pyrrha Javascript library
 * 
 * @file kernels.js
 * @author Kostiantyn Smyrnov <kostysh@gmail.com>
 * @date 2018
 */
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.eventKernelRemoved = exports.eventKernelAdded = exports.removeKernel = exports.addToMarket = exports.deploy = exports.fetchAll = exports.fetchKernelById = exports.fetchKernel = exports.fetchMetadata = exports.fetchDescription = exports.fetchComplexity = exports.fetchCurrentPrice = exports.fetchDataDim = exports.fetchIpfsAddress = exports.fetchAddressById = exports.fetchCount = void 0;

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
 * Get kernels count from PandoraMarket contract
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
            return mar.methods.kernelsCount().call();

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
 * Get Kernel address by kernel id
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
        kernelContract,
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
                args: ['PandoraMarket']
              }
            });
            mar = new config.web3.eth.Contract(config.contracts.PandoraMarket.abi, config.addresses.PandoraMarket);
            _context2.next = 6;
            return mar.methods.kernels(id).call();

          case 6:
            kernelContract = _context2.sent;
            return _context2.abrupt("return", kernelContract);

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
 * Get IPFS address from Kernel contract by the kernel address
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
        ker,
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
              'contracts.Kernel.abi': {
                type: 'object',
                code: _errors.CONTRACT_REQUIRED,
                args: ['Kernel']
              }
            });
            ker = new config.web3.eth.Contract(config.contracts.Kernel.abi, address);
            _context3.next = 7;
            return ker.methods.ipfsAddress().call();

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
 * Get data dim from Kernel contract by the kernel address
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
        ker,
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
              'contracts.Kernel.abi': {
                type: 'object',
                code: _errors.CONTRACT_REQUIRED,
                args: ['Kernel']
              }
            });
            ker = new config.web3.eth.Contract(config.contracts.Kernel.abi, address);
            _context4.next = 7;
            return ker.methods.dataDim().call();

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
 * Get current price from Kernel contract by the kernel address
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
        ker,
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
              'contracts.Kernel.abi': {
                type: 'object',
                code: _errors.CONTRACT_REQUIRED,
                args: ['Kernel']
              }
            });
            ker = new config.web3.eth.Contract(config.contracts.Kernel.abi, address);
            _context5.next = 7;
            return ker.methods.currentPrice().call();

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
 * Get complexity from Kernel contract by the kernel address
 * 
 * @param {String} address
 * @param {Object} config Library config (provided by the proxy but can be overridden)
 * @returns {Promise} A Promise object represents the {number}
 */


exports.fetchCurrentPrice = fetchCurrentPrice;

var fetchComplexity =
/*#__PURE__*/
function () {
  var _ref6 = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee6() {
    var address,
        config,
        ker,
        complexity,
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
              'contracts.Kernel.abi': {
                type: 'object',
                code: _errors.CONTRACT_REQUIRED,
                args: ['Kernel']
              }
            });
            ker = new config.web3.eth.Contract(config.contracts.Kernel.abi, address);
            _context6.next = 7;
            return ker.methods.complexity().call();

          case 7:
            complexity = _context6.sent;
            return _context6.abrupt("return", Number.parseInt(complexity, 10));

          case 9:
          case "end":
            return _context6.stop();
        }
      }
    }, _callee6, this);
  }));

  return function fetchComplexity() {
    return _ref6.apply(this, arguments);
  };
}();
/**
 * Get description from Kernel contract by the kernel address
 * 
 * @param {String} address
 * @param {Object} config Library config (provided by the proxy but can be overridden)
 * @returns {Promise} A Promise object represents the {number}
 */


exports.fetchComplexity = fetchComplexity;

var fetchDescription =
/*#__PURE__*/
function () {
  var _ref7 = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee7() {
    var address,
        config,
        ker,
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
              'contracts.Kernel.abi': {
                type: 'object',
                code: _errors.CONTRACT_REQUIRED,
                args: ['Kernel']
              }
            });
            ker = new config.web3.eth.Contract(config.contracts.Kernel.abi, address);
            _context7.next = 7;
            return ker.methods.description().call();

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
 * Get metadata from Kernel contract by the kernel address
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
        ker,
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
              'contracts.Kernel.abi': {
                type: 'object',
                code: _errors.CONTRACT_REQUIRED,
                args: ['Kernel']
              }
            });
            ker = new config.web3.eth.Contract(config.contracts.Kernel.abi, address);
            _context8.next = 7;
            return ker.methods.metadata().call();

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
 * Get Kernel by the kernel address
 * 
 * @param {String} address
 * @param {Object} config Library config (provided by the proxy but can be overridden)
 * @returns {Promise} Promise object represents the {Object[]}
 */


exports.fetchMetadata = fetchMetadata;

var fetchKernel =
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
        complexity,
        metadata,
        description,
        _args9 = arguments;

    return regeneratorRuntime.wrap(function _callee9$(_context9) {
      while (1) {
        switch (_context9.prev = _context9.next) {
          case 0:
            address = _args9.length > 0 && _args9[0] !== undefined ? _args9[0] : '';
            config = _args9.length > 1 && _args9[1] !== undefined ? _args9[1] : {};
            _context9.next = 4;
            return Promise.all([fetchIpfsAddress(address, config), fetchDataDim(address, config), fetchCurrentPrice(address, config), fetchComplexity(address, config), fetchMetadata(address, config), fetchDescription(address, config)]);

          case 4:
            _ref10 = _context9.sent;
            _ref11 = _slicedToArray(_ref10, 6);
            ipfsAddress = _ref11[0];
            dataDim = _ref11[1];
            currentPrice = _ref11[2];
            complexity = _ref11[3];
            metadata = _ref11[4];
            description = _ref11[5];
            return _context9.abrupt("return", {
              address: address,
              ipfsAddress: ipfsAddress,
              dataDim: dataDim,
              currentPrice: currentPrice,
              complexity: complexity,
              metadata: metadata,
              description: description
            });

          case 13:
          case "end":
            return _context9.stop();
        }
      }
    }, _callee9, this);
  }));

  return function fetchKernel() {
    return _ref9.apply(this, arguments);
  };
}();
/**
 * Get kernel by id
 * 
 * @param {integer} id 
 * @param {Object} config Library config (provided by the proxy but can be overridden)
 * @returns {Promise} A Promise object represents the {Object}
 */


exports.fetchKernel = fetchKernel;

var fetchKernelById =
/*#__PURE__*/
function () {
  var _ref12 = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee10(id) {
    var config,
        address,
        kernel,
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
            return fetchKernel(address, config);

          case 6:
            kernel = _context10.sent;
            return _context10.abrupt("return", kernel);

          case 8:
          case "end":
            return _context10.stop();
        }
      }
    }, _callee10, this);
  }));

  return function fetchKernelById(_x2) {
    return _ref12.apply(this, arguments);
  };
}();
/**
 * Get all kernels
 * 
 * @param {Object} config Library config (provided by the proxy but can be overridden)
 * @returns {Promise} Promise object represents the {Object[]}
 */


exports.fetchKernelById = fetchKernelById;

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
        kernel,
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
            return fetchKernelById(i, config);

          case 12:
            kernel = _context11.sent;
            records.push(_objectSpread({
              id: i
            }, kernel));
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
 * Deploy Kernel contract to the network
 * 
 * @param {String} kernelIpfsHash 
 * @param {Object} options { dimension, complexity, price, metadata, description } 
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
  regeneratorRuntime.mark(function _callee12(kernelIpfsHash, _ref14, publisher) {
    var dimension,
        complexity,
        price,
        metadata,
        description,
        config,
        args,
        gas,
        kernelContractAddress,
        _args12 = arguments;
    return regeneratorRuntime.wrap(function _callee12$(_context12) {
      while (1) {
        switch (_context12.prev = _context12.next) {
          case 0:
            dimension = _ref14.dimension, complexity = _ref14.complexity, price = _ref14.price, metadata = _ref14.metadata, description = _ref14.description;
            config = _args12.length > 3 && _args12[3] !== undefined ? _args12[3] : {};
            expect.all({
              kernelIpfsHash: kernelIpfsHash,
              publisher: publisher,
              dimension: dimension,
              complexity: complexity,
              price: price,
              metadata: metadata,
              description: description
            }, {
              'kernelIpfsHash': {
                type: 'string'
              },
              'publisher': {
                type: 'address'
              },
              'dimension': {
                type: 'number'
              },
              'complexity': {
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
              'contracts.Kernel.abi': {
                type: 'object',
                code: _errors.CONTRACT_REQUIRED,
                args: ['Kernel']
              }
            });
            args = [config.web3.utils.utf8ToHex(kernelIpfsHash), dimension, complexity, config.web3.utils.toHex(price), config.web3.utils.utf8ToHex(metadata), config.web3.utils.utf8ToHex(description)]; // Estimate required amount of gas

            _context12.next = 7;
            return web3Helpers.estimateGas(config.contracts.Kernel.bytecode, args, config);

          case 7:
            gas = _context12.sent;
            _context12.next = 10;
            return web3Helpers.deployContract(config.contracts.Kernel, {
              args: args,
              from: publisher,
              gas: Number.parseInt(gas * 1.5, 10)
            }, config);

          case 10:
            kernelContractAddress = _context12.sent;
            return _context12.abrupt("return", kernelContractAddress);

          case 12:
          case "end":
            return _context12.stop();
        }
      }
    }, _callee12, this);
  }));

  return function deploy(_x3, _x4, _x5) {
    return _ref15.apply(this, arguments);
  };
}();
/**
 * Add kernel to market
 * 
 * @param {String} kernelContractAddress 
 * @param {String} publisherAddress 
 * @param {Object} config Library config (provided by the proxy but can be overridden)
 * @returns {Promise} Promise object resolved to {String} contractAddress // can be null if used ganache-cli environment
 */


exports.deploy = deploy;

var addToMarket = function addToMarket(kernelContractAddress, publisherAddress) {
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
                kernelContractAddress: kernelContractAddress,
                publisherAddress: publisherAddress
              }, {
                'kernelContractAddress': {
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
                  args: ['Kernel']
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
              market.methods.addKernel(kernelContractAddress).send({
                from: publisherAddress,
                gasPrice: gasPrice
              }).on('error', reject).on('receipt', function (receipt) {
                if (Number(receipt.status) === 0) {
                  return reject((0, _errors.default)(_errors.TRANSACTION_UNSUCCESSFUL));
                }

                resolve(receipt.contractAddress || receipt.events.KernelAdded.returnValues.kernel);
              }); // @note In case of ganache-cli blockchain "contractAddress" always will be equal to null

            case 7:
            case "end":
              return _context13.stop();
          }
        }
      }, _callee13, this);
    }));

    return function (_x6, _x7) {
      return _ref16.apply(this, arguments);
    };
  }());
};
/**
 * Remove kernel from PandoraMarket
 * 
 * @param {String} kernelAddress
 * @param {String} publisherAddress 
 * @param {Object} config Library config (provided by the proxy but can be overridden) 
 * @returns {Promise} Promise object resolved to {String} contractAddress
 */


exports.addToMarket = addToMarket;

var removeKernel = function removeKernel(kernelAddress, publisherAddress) {
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
                kernelAddress: kernelAddress,
                publisherAddress: publisherAddress
              }, {
                'kernelAddress': {
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
                  args: ['Kernel']
                }
              });
              market = new config.web3.eth.Contract(config.contracts.PandoraMarket.abi, config.addresses.PandoraMarket);
              _context14.next = 5;
              return config.web3.eth.getGasPrice();

            case 5:
              gasPrice = _context14.sent;
              market.methods.removeKernel(kernelAddress).send({
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

    return function (_x8, _x9) {
      return _ref17.apply(this, arguments);
    };
  }());
};
/**
 * Handle event KernelAdded
 * 
 * @param {Object} options Event handler options
 * @param {Object} config Library config (provided by the proxy but can be overridden)
 * @returns {Promise<{Object}>} PPromise object resolved to the object with chained callbacks #data and #error
 */


exports.removeKernel = removeKernel;

var eventKernelAdded =
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
                args: ['Kernel']
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
              },
              subscribed: function subscribed() {
                var cb = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : function () {};
                // @todo Remove subscribed callback
                callbacks.onSubscribed = cb;
                return chain;
              }
            };
            mar = new config.web3.eth.Contract(config.contracts.PandoraMarket.abi, config.addresses.PandoraMarket);
            chain.event = [];
            chain.event[0] = mar.events.KernelAdded(options).on('data',
            /*#__PURE__*/
            function () {
              var _ref19 = _asyncToGenerator(
              /*#__PURE__*/
              regeneratorRuntime.mark(function _callee15(event) {
                var kernel;
                return regeneratorRuntime.wrap(function _callee15$(_context15) {
                  while (1) {
                    switch (_context15.prev = _context15.next) {
                      case 0:
                        _context15.prev = 0;
                        _context15.next = 3;
                        return fetchKernel(event.returnValues.kernel, config);

                      case 3:
                        kernel = _context15.sent;
                        callbacks.onData({
                          records: [kernel],
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

              return function (_x10) {
                return _ref19.apply(this, arguments);
              };
            }()).on('error', callbacks.onError);
            chain.event[0].name = 'KernelAdded';
            return _context16.abrupt("return", chain);

          case 11:
          case "end":
            return _context16.stop();
        }
      }
    }, _callee16, this);
  }));

  return function eventKernelAdded() {
    return _ref18.apply(this, arguments);
  };
}();
/**
 * Handle event KernelRemoved
 * 
 * @param {Object} options Event handler options
 * @param {Object} config Library config (provided by the proxy but can be overridden)
 * @returns {Promise<{Object}>} PPromise object resolved to the object with chained callbacks #data and #error
 */


exports.eventKernelAdded = eventKernelAdded;

var eventKernelRemoved =
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
            chain.event[0] = mar.events.KernelRemoved(options).on('data',
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
                            address: event.returnValues.kernel
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

              return function (_x11) {
                return _ref21.apply(this, arguments);
              };
            }()).on('error', callbacks.onError);
            chain.event[0].name = 'KernelRemoved';
            return _context18.abrupt("return", chain);

          case 11:
          case "end":
            return _context18.stop();
        }
      }
    }, _callee18, this);
  }));

  return function eventKernelRemoved() {
    return _ref20.apply(this, arguments);
  };
}();

exports.eventKernelRemoved = eventKernelRemoved;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9rZXJuZWxzLmpzIl0sIm5hbWVzIjpbImZldGNoQ291bnQiLCJjb25maWciLCJleHBlY3QiLCJhbGwiLCJ0eXBlIiwiY29kZSIsIldFQjNfUkVRVUlSRUQiLCJDT05UUkFDVF9SRVFVSVJFRCIsImFyZ3MiLCJBRERSRVNTX1JFUVVJUkVEIiwibWFyIiwid2ViMyIsImV0aCIsIkNvbnRyYWN0IiwiY29udHJhY3RzIiwiUGFuZG9yYU1hcmtldCIsImFiaSIsImFkZHJlc3NlcyIsIm1ldGhvZHMiLCJrZXJuZWxzQ291bnQiLCJjYWxsIiwiY291bnQiLCJOdW1iZXIiLCJwYXJzZUludCIsImZldGNoQWRkcmVzc0J5SWQiLCJpZCIsImtlcm5lbHMiLCJrZXJuZWxDb250cmFjdCIsImZldGNoSXBmc0FkZHJlc3MiLCJhZGRyZXNzIiwia2VyIiwiS2VybmVsIiwiaXBmc0FkZHJlc3MiLCJ1dGlscyIsImhleFRvQXNjaWkiLCJmZXRjaERhdGFEaW0iLCJkYXRhRGltIiwiZmV0Y2hDdXJyZW50UHJpY2UiLCJjdXJyZW50UHJpY2UiLCJmZXRjaENvbXBsZXhpdHkiLCJjb21wbGV4aXR5IiwiZmV0Y2hEZXNjcmlwdGlvbiIsImRlc2NyaXB0aW9uIiwiaGV4VG9VdGY4IiwiZmV0Y2hNZXRhZGF0YSIsIm1ldGFkYXRhIiwiZmV0Y2hLZXJuZWwiLCJQcm9taXNlIiwiZmV0Y2hLZXJuZWxCeUlkIiwia2VybmVsIiwiZmV0Y2hBbGwiLCJyZWNvcmRzIiwiZXJyb3IiLCJpIiwicHVzaCIsIm1lc3NhZ2UiLCJkZXBsb3kiLCJrZXJuZWxJcGZzSGFzaCIsInB1Ymxpc2hlciIsImRpbWVuc2lvbiIsInByaWNlIiwidXRmOFRvSGV4IiwidG9IZXgiLCJ3ZWIzSGVscGVycyIsImVzdGltYXRlR2FzIiwiYnl0ZWNvZGUiLCJnYXMiLCJkZXBsb3lDb250cmFjdCIsImZyb20iLCJrZXJuZWxDb250cmFjdEFkZHJlc3MiLCJhZGRUb01hcmtldCIsInB1Ymxpc2hlckFkZHJlc3MiLCJyZXNvbHZlIiwicmVqZWN0IiwiV0VCM19NRVRBTUFTS19SRVFVSVJFRCIsIm1hcmtldCIsImdldEdhc1ByaWNlIiwiZ2FzUHJpY2UiLCJhZGRLZXJuZWwiLCJzZW5kIiwib24iLCJyZWNlaXB0Iiwic3RhdHVzIiwiVFJBTlNBQ1RJT05fVU5TVUNDRVNTRlVMIiwiY29udHJhY3RBZGRyZXNzIiwiZXZlbnRzIiwiS2VybmVsQWRkZWQiLCJyZXR1cm5WYWx1ZXMiLCJyZW1vdmVLZXJuZWwiLCJrZXJuZWxBZGRyZXNzIiwiZXZlbnRLZXJuZWxBZGRlZCIsIm9wdGlvbnMiLCJjYWxsYmFja3MiLCJvbkRhdGEiLCJvbkVycm9yIiwiY2hhaW4iLCJkYXRhIiwiY2IiLCJzdWJzY3JpYmVkIiwib25TdWJzY3JpYmVkIiwiZXZlbnQiLCJuYW1lIiwiZXZlbnRLZXJuZWxSZW1vdmVkIiwiS2VybmVsUmVtb3ZlZCJdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7Ozs7O0FBU0E7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBRUE7O0FBQ0E7O0FBT0E7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBRUE7Ozs7OztBQU1PLElBQU1BLFVBQVU7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBLDBCQUFHO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFPQyxZQUFBQSxNQUFQLDJEQUFnQixFQUFoQjtBQUV0QkMsWUFBQUEsTUFBTSxDQUFDQyxHQUFQLENBQVdGLE1BQVgsRUFBbUI7QUFDZixzQkFBUTtBQUNKRyxnQkFBQUEsSUFBSSxFQUFFLFFBREY7QUFFSkMsZ0JBQUFBLElBQUksRUFBRUM7QUFGRixlQURPO0FBS2YsNkNBQStCO0FBQzNCRixnQkFBQUEsSUFBSSxFQUFFLFFBRHFCO0FBRTNCQyxnQkFBQUEsSUFBSSxFQUFFRSx5QkFGcUI7QUFHM0JDLGdCQUFBQSxJQUFJLEVBQUUsQ0FBQyxlQUFEO0FBSHFCLGVBTGhCO0FBVWYseUNBQTJCO0FBQ3ZCSixnQkFBQUEsSUFBSSxFQUFFLFNB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Q0FBQ0ssS0FBTixHQUFjLEVBQWQ7QUFDQUwsWUFBQUEsS0FBSyxDQUFDSyxLQUFOLENBQVksQ0FBWixJQUFpQjFGLEdBQUcsQ0FBQzJFLE1BQUosQ0FBV2tCLGFBQVgsQ0FBeUJaLE9BQXpCLEVBQ1pYLEVBRFksQ0FDVCxNQURTO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQSxzQ0FDRCxtQkFBTW9CLEtBQU47QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUVSUix3QkFBQUEsU0FBUyxDQUFDQyxNQUFWLENBQWlCO0FBQ2IxQywwQkFBQUEsT0FBTyxFQUFFLENBQUM7QUFBQ3RCLDRCQUFBQSxPQUFPLEVBQUV1RSxLQUFLLENBQUNiLFlBQU4sQ0FBbUJ0QztBQUE3QiwyQkFBRCxDQURJO0FBRWJtRCwwQkFBQUEsS0FBSyxFQUFMQTtBQUZhLHlCQUFqQjs7QUFGUTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQSxlQURDOztBQUFBO0FBQUE7QUFBQTtBQUFBLGlCQVFacEIsRUFSWSxDQVFULE9BUlMsRUFRQVksU0FBUyxDQUFDRSxPQVJWLENBQWpCO0FBU0FDLFlBQUFBLEtBQUssQ0FBQ0ssS0FBTixDQUFZLENBQVosRUFBZUMsSUFBZixHQUFzQixlQUF0QjtBQXBEOEIsK0NBc0R2Qk4sS0F0RHVCOztBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBLEdBQUg7O0FBQUEsa0JBQWxCTyxrQkFBa0I7QUFBQTtBQUFBO0FBQUEsR0FBeEIiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIEtlcm5lbHMgcmVsYXRlZCBtZXRob2RzXG4gKiBUaGlzIGZpbGUgaXQgaXMgYSBwYXJ0IG9mIHRoZSBQYW5kb3JhIFB5cnJoYSBKYXZhc2NyaXB0IGxpYnJhcnlcbiAqIFxuICogQGZpbGUga2VybmVscy5qc1xuICogQGF1dGhvciBLb3N0aWFudHluIFNteXJub3YgPGtvc3R5c2hAZ21haWwuY29tPlxuICogQGRhdGUgMjAxOFxuICovXG5cbid1c2Ugc3RyaWN0JztcblxuaW1wb3J0ICogYXMgZXhwZWN0IGZyb20gJy4vaGVscGVycy9leHBlY3QnO1xuaW1wb3J0IHBqc0Vycm9yLCB7XG4gICAgQ09OVFJBQ1RfUkVRVUlSRUQsXG4gICAgQUREUkVTU19SRVFVSVJFRCxcbiAgICBXRUIzX1JFUVVJUkVELFxuICAgIFdFQjNfTUVUQU1BU0tfUkVRVUlSRUQsXG4gICAgVFJBTlNBQ1RJT05fVU5TVUNDRVNTRlVMXG59IGZyb20gJy4vaGVscGVycy9lcnJvcnMnO1xuaW1wb3J0ICogYXMgd2ViM0hlbHBlcnMgZnJvbSAnLi9oZWxwZXJzL3dlYjMnO1xuXG4vKipcbiAqIEdldCBrZXJuZWxzIGNvdW50IGZyb20gUGFuZG9yYU1hcmtldCBjb250cmFjdFxuICogXG4gKiBAcGFyYW0ge09iamVjdH0gY29uZmlnIExpYnJhcnkgY29uZmlnIChwcm92aWRlZCBieSB0aGUgcHJveHkgYnV0IGNhbiBiZSBvdmVycmlkZGVuKVxuICogQHJldHVybnMge1Byb21pc2V9IEEgUHJvbWlzZSBvYmplY3QgcmVwcmVzZW50cyB0aGUge251bWJlcn0gXG4gKi9cbmV4cG9ydCBjb25zdCBmZXRjaENvdW50ID0gYXN5bmMgKGNvbmZpZyA9IHt9KSA9PiB7XG5cbiAgICBleHBlY3QuYWxsKGNvbmZpZywge1xuICAgICAgICAnd2ViMyc6IHtcbiAgICAgICAgICAgIHR5cGU6ICdvYmplY3QnLFxuICAgICAgICAgICAgY29kZTogV0VCM19SRVFVSVJFRFxuICAgICAgICB9LFxuICAgICAgICAnY29udHJhY3RzLlBhbmRvcmFNYXJrZXQuYWJpJzoge1xuICAgICAgICAgICAgdHlwZTogJ29iamVjdCcsXG4gICAgICAgICAgICBjb2RlOiBDT05UUkFDVF9SRVFVSVJFRCxcbiAgICAgICAgICAgIGFyZ3M6IFsnUGFuZG9yYU1hcmtldCddXG4gICAgICAgIH0sXG4gICAgICAgICdhZGRyZXNzZXMuUGFuZG9yYU1hcmtldCc6IHtcbiAgICAgICAgICAgIHR5cGU6ICdhZGRyZXNzJyxcbiAgICAgICAgICAgIGNvZGU6IEFERFJFU1NfUkVRVUlSRUQsXG4gICAgICAgICAgICBhcmdzOiBbJ1BhbmRvcmFNYXJrZXQnXVxuICAgICAgICB9XG4gICAgfSk7XG5cbiAgICBjb25zdCBtYXIgPSBuZXcgY29uZmlnLndlYjMuZXRoLkNvbnRyYWN0KGNvbmZpZy5jb250cmFjdHMuUGFuZG9yYU1hcmtldC5hYmksIGNvbmZpZy5hZGRyZXNzZXMuUGFuZG9yYU1hcmtldCk7XG4gICAgY29uc3QgY291bnQgPSBhd2FpdCBtYXIubWV0aG9kc1xuICAgICAgICAua2VybmVsc0NvdW50KClcbiAgICAgICAgLmNhbGwoKTtcblxuICAgIHJldHVybiBOdW1iZXIucGFyc2VJbnQoY291bnQsIDEwKTtcbn07XG5cbi8qKlxuICogR2V0IEtlcm5lbCBhZGRyZXNzIGJ5IGtlcm5lbCBpZFxuICogXG4gKiBAcGFyYW0ge251bWJlcn0gaWRcbiAqIEBwYXJhbSB7T2JqZWN0fSBjb25maWcgTGlicmFyeSBjb25maWcgKHByb3ZpZGVkIGJ5IHRoZSBwcm94eSBidXQgY2FuIGJlIG92ZXJyaWRkZW4pXG4gKiBAcmV0dXJucyB7UHJvbWlzZX0gQSBQcm9taXNlIG9iamVjdCByZXByZXNlbnRzIHRoZSB7U3RyaW5nfVxuICovXG5leHBvcnQgY29uc3QgZmV0Y2hBZGRyZXNzQnlJZCA9IGFzeW5jIChpZCwgY29uZmlnID0ge30pID0+IHtcblxuICAgIGV4cGVjdC5hbGwoeyBpZCB9LCB7XG4gICAgICAgICdpZCc6IHtcbiAgICAgICAgICAgIHR5cGU6ICdudW1iZXInXG4gICAgICAgIH1cbiAgICB9KTtcblxuICAgIGV4cGVjdC5hbGwoY29uZmlnLCB7XG4gICAgICAgICd3ZWIzJzoge1xuICAgICAgICAgICAgdHlwZTogJ29iamVjdCcsXG4gICAgICAgICAgICBjb2RlOiBXRUIzX1JFUVVJUkVEXG4gICAgICAgIH0sXG4gICAgICAgICdjb250cmFjdHMuUGFuZG9yYU1hcmtldC5hYmknOiB7XG4gICAgICAgICAgICB0eXBlOiAnb2JqZWN0JyxcbiAgICAgICAgICAgIGNvZGU6IENPTlRSQUNUX1JFUVVJUkVELFxuICAgICAgICAgICAgYXJnczogWydQYW5kb3JhTWFya2V0J11cbiAgICAgICAgfSxcbiAgICAgICAgJ2FkZHJlc3Nlcy5QYW5kb3JhTWFya2V0Jzoge1xuICAgICAgICAgICAgdHlwZTogJ2FkZHJlc3MnLFxuICAgICAgICAgICAgY29kZTogQUREUkVTU19SRVFVSVJFRCxcbiAgICAgICAgICAgIGFyZ3M6IFsnUGFuZG9yYU1hcmtldCddXG4gICAgICAgIH1cbiAgICB9KTtcblxuICAgIGNvbnN0IG1hciA9IG5ldyBjb25maWcud2ViMy5ldGguQ29udHJhY3QoY29uZmlnLmNvbnRyYWN0cy5QYW5kb3JhTWFya2V0LmFiaSwgY29uZmlnLmFkZHJlc3Nlcy5QYW5kb3JhTWFya2V0KTtcbiAgICBjb25zdCBrZXJuZWxDb250cmFjdCA9IGF3YWl0IG1hci5tZXRob2RzXG4gICAgICAgIC5rZXJuZWxzKGlkKVxuICAgICAgICAuY2FsbCgpO1xuXG4gICAgcmV0dXJuIGtlcm5lbENvbnRyYWN0O1xufTtcblxuLyoqXG4gKiBHZXQgSVBGUyBhZGRyZXNzIGZyb20gS2VybmVsIGNvbnRyYWN0IGJ5IHRoZSBrZXJuZWwgYWRkcmVzc1xuICogXG4gKiBAcGFyYW0ge1N0cmluZ30gYWRkcmVzc1xuICogQHBhcmFtIHtPYmplY3R9IGNvbmZpZyBMaWJyYXJ5IGNvbmZpZyAocHJvdmlkZWQgYnkgdGhlIHByb3h5IGJ1dCBjYW4gYmUgb3ZlcnJpZGRlbilcbiAqIEByZXR1cm5zIHtQcm9taXNlfSBBIFByb21pc2Ugb2JqZWN0IHJlcHJlc2VudHMgdGhlIHtTdHJpbmd9XG4gKi9cbmV4cG9ydCBjb25zdCBmZXRjaElwZnNBZGRyZXNzID0gYXN5bmMgKGFkZHJlc3MgPSAnJywgY29uZmlnID0ge30pID0+IHtcblxuICAgIGV4cGVjdC5hbGwoeyBhZGRyZXNzIH0sIHtcbiAgICAgICAgJ2FkZHJlc3MnOiB7XG4gICAgICAgICAgICB0eXBlOiAnYWRkcmVzcydcbiAgICAgICAgfVxuICAgIH0pO1xuXG4gICAgZXhwZWN0LmFsbChjb25maWcsIHtcbiAgICAgICAgJ3dlYjMnOiB7XG4gICAgICAgICAgICB0eXBlOiAnb2JqZWN0JyxcbiAgICAgICAgICAgIGNvZGU6IFdFQjNfUkVRVUlSRURcbiAgICAgICAgfSxcbiAgICAgICAgJ2NvbnRyYWN0cy5LZXJuZWwuYWJpJzoge1xuICAgICAgICAgICAgdHlwZTogJ29iamVjdCcsXG4gICAgICAgICAgICBjb2RlOiBDT05UUkFDVF9SRVFVSVJFRCxcbiAgICAgICAgICAgIGFyZ3M6IFsnS2VybmVsJ11cbiAgICAgICAgfVxuICAgIH0pO1xuXG4gICAgY29uc3Qga2VyID0gbmV3IGNvbmZpZy53ZWIzLmV0aC5Db250cmFjdChjb25maWcuY29udHJhY3RzLktlcm5lbC5hYmksIGFkZHJlc3MpO1xuICAgIGNvbnN0IGlwZnNBZGRyZXNzID0gYXdhaXQga2VyLm1ldGhvZHNcbiAgICAgICAgLmlwZnNBZGRyZXNzKClcbiAgICAgICAgLmNhbGwoKTtcblxuICAgIHJldHVybiBjb25maWcud2ViMy51dGlscy5oZXhUb0FzY2lpKGlwZnNBZGRyZXNzKTtcbn07XG5cbi8qKlxuICogR2V0IGRhdGEgZGltIGZyb20gS2VybmVsIGNvbnRyYWN0IGJ5IHRoZSBrZXJuZWwgYWRkcmVzc1xuICogXG4gKiBAcGFyYW0ge1N0cmluZ30gYWRkcmVzc1xuICogQHBhcmFtIHtPYmplY3R9IGNvbmZpZyBMaWJyYXJ5IGNvbmZpZyAocHJvdmlkZWQgYnkgdGhlIHByb3h5IGJ1dCBjYW4gYmUgb3ZlcnJpZGRlbilcbiAqIEByZXR1cm5zIHtQcm9taXNlfSBBIFByb21pc2Ugb2JqZWN0IHJlcHJlc2VudHMgdGhlIHtudW1iZXJ9XG4gKi9cbmV4cG9ydCBjb25zdCBmZXRjaERhdGFEaW0gPSBhc3luYyAoYWRkcmVzcyA9ICcnLCBjb25maWcgPSB7fSkgPT4ge1xuXG4gICAgZXhwZWN0LmFsbCh7IGFkZHJlc3MgfSwge1xuICAgICAgICAnYWRkcmVzcyc6IHtcbiAgICAgICAgICAgIHR5cGU6ICdhZGRyZXNzJ1xuICAgICAgICB9XG4gICAgfSk7XG5cbiAgICBleHBlY3QuYWxsKGNvbmZpZywge1xuICAgICAgICAnd2ViMyc6IHtcbiAgICAgICAgICAgIHR5cGU6ICdvYmplY3QnLFxuICAgICAgICAgICAgY29kZTogV0VCM19SRVFVSVJFRFxuICAgICAgICB9LFxuICAgICAgICAnY29udHJhY3RzLktlcm5lbC5hYmknOiB7XG4gICAgICAgICAgICB0eXBlOiAnb2JqZWN0JyxcbiAgICAgICAgICAgIGNvZGU6IENPTlRSQUNUX1JFUVVJUkVELFxuICAgICAgICAgICAgYXJnczogWydLZXJuZWwnXVxuICAgICAgICB9XG4gICAgfSk7XG5cbiAgICBjb25zdCBrZXIgPSBuZXcgY29uZmlnLndlYjMuZXRoLkNvbnRyYWN0KGNvbmZpZy5jb250cmFjdHMuS2VybmVsLmFiaSwgYWRkcmVzcyk7XG4gICAgY29uc3QgZGF0YURpbSA9IGF3YWl0IGtlci5tZXRob2RzXG4gICAgICAgIC5kYXRhRGltKClcbiAgICAgICAgLmNhbGwoKTtcblxuICAgIHJldHVybiBOdW1iZXIucGFyc2VJbnQoZGF0YURpbSwgMTApO1xufTtcblxuLyoqXG4gKiBHZXQgY3VycmVudCBwcmljZSBmcm9tIEtlcm5lbCBjb250cmFjdCBieSB0aGUga2VybmVsIGFkZHJlc3NcbiAqIFxuICogQHBhcmFtIHtTdHJpbmd9IGFkZHJlc3NcbiAqIEBwYXJhbSB7T2JqZWN0fSBjb25maWcgTGlicmFyeSBjb25maWcgKHByb3ZpZGVkIGJ5IHRoZSBwcm94eSBidXQgY2FuIGJlIG92ZXJyaWRkZW4pXG4gKiBAcmV0dXJucyB7UHJvbWlzZX0gQSBQcm9taXNlIG9iamVjdCByZXByZXNlbnRzIHRoZSB7bnVtYmVyfVxuICovXG5leHBvcnQgY29uc3QgZmV0Y2hDdXJyZW50UHJpY2UgPSBhc3luYyAoYWRkcmVzcyA9ICcnLCBjb25maWcgPSB7fSkgPT4ge1xuXG4gICAgZXhwZWN0LmFsbCh7IGFkZHJlc3MgfSwge1xuICAgICAgICAnYWRkcmVzcyc6IHtcbiAgICAgICAgICAgIHR5cGU6ICdhZGRyZXNzJ1xuICAgICAgICB9XG4gICAgfSk7XG5cbiAgICBleHBlY3QuYWxsKGNvbmZpZywge1xuICAgICAgICAnd2ViMyc6IHtcbiAgICAgICAgICAgIHR5cGU6ICdvYmplY3QnLFxuICAgICAgICAgICAgY29kZTogV0VCM19SRVFVSVJFRFxuICAgICAgICB9LFxuICAgICAgICAnY29udHJhY3RzLktlcm5lbC5hYmknOiB7XG4gICAgICAgICAgICB0eXBlOiAnb2JqZWN0JyxcbiAgICAgICAgICAgIGNvZGU6IENPTlRSQUNUX1JFUVVJUkVELFxuICAgICAgICAgICAgYXJnczogWydLZXJuZWwnXVxuICAgICAgICB9XG4gICAgfSk7XG5cbiAgICBjb25zdCBrZXIgPSBuZXcgY29uZmlnLndlYjMuZXRoLkNvbnRyYWN0KGNvbmZpZy5jb250cmFjdHMuS2VybmVsLmFiaSwgYWRkcmVzcyk7XG4gICAgY29uc3QgY3VycmVudFByaWNlID0gYXdhaXQga2VyLm1ldGhvZHNcbiAgICAgICAgLmN1cnJlbnRQcmljZSgpXG4gICAgICAgIC5jYWxsKCk7XG5cbiAgICByZXR1cm4gTnVtYmVyLnBhcnNlSW50KGN1cnJlbnRQcmljZSwgMTApO1xufTtcblxuLyoqXG4gKiBHZXQgY29tcGxleGl0eSBmcm9tIEtlcm5lbCBjb250cmFjdCBieSB0aGUga2VybmVsIGFkZHJlc3NcbiAqIFxuICogQHBhcmFtIHtTdHJpbmd9IGFkZHJlc3NcbiAqIEBwYXJhbSB7T2JqZWN0fSBjb25maWcgTGlicmFyeSBjb25maWcgKHByb3ZpZGVkIGJ5IHRoZSBwcm94eSBidXQgY2FuIGJlIG92ZXJyaWRkZW4pXG4gKiBAcmV0dXJucyB7UHJvbWlzZX0gQSBQcm9taXNlIG9iamVjdCByZXByZXNlbnRzIHRoZSB7bnVtYmVyfVxuICovXG5leHBvcnQgY29uc3QgZmV0Y2hDb21wbGV4aXR5ID0gYXN5bmMgKGFkZHJlc3MgPSAnJywgY29uZmlnID0ge30pID0+IHtcblxuICAgIGV4cGVjdC5hbGwoeyBhZGRyZXNzIH0sIHtcbiAgICAgICAgJ2FkZHJlc3MnOiB7XG4gICAgICAgICAgICB0eXBlOiAnYWRkcmVzcydcbiAgICAgICAgfVxuICAgIH0pO1xuXG4gICAgZXhwZWN0LmFsbChjb25maWcsIHtcbiAgICAgICAgJ3dlYjMnOiB7XG4gICAgICAgICAgICB0eXBlOiAnb2JqZWN0JyxcbiAgICAgICAgICAgIGNvZGU6IFdFQjNfUkVRVUlSRURcbiAgICAgICAgfSxcbiAgICAgICAgJ2NvbnRyYWN0cy5LZXJuZWwuYWJpJzoge1xuICAgICAgICAgICAgdHlwZTogJ29iamVjdCcsXG4gICAgICAgICAgICBjb2RlOiBDT05UUkFDVF9SRVFVSVJFRCxcbiAgICAgICAgICAgIGFyZ3M6IFsnS2VybmVsJ11cbiAgICAgICAgfVxuICAgIH0pO1xuXG4gICAgY29uc3Qga2VyID0gbmV3IGNvbmZpZy53ZWIzLmV0aC5Db250cmFjdChjb25maWcuY29udHJhY3RzLktlcm5lbC5hYmksIGFkZHJlc3MpO1xuICAgIGNvbnN0IGNvbXBsZXhpdHkgPSBhd2FpdCBrZXIubWV0aG9kc1xuICAgICAgICAuY29tcGxleGl0eSgpXG4gICAgICAgIC5jYWxsKCk7XG5cbiAgICByZXR1cm4gTnVtYmVyLnBhcnNlSW50KGNvbXBsZXhpdHksIDEwKTtcbn07XG5cbi8qKlxuICogR2V0IGRlc2NyaXB0aW9uIGZyb20gS2VybmVsIGNvbnRyYWN0IGJ5IHRoZSBrZXJuZWwgYWRkcmVzc1xuICogXG4gKiBAcGFyYW0ge1N0cmluZ30gYWRkcmVzc1xuICogQHBhcmFtIHtPYmplY3R9IGNvbmZpZyBMaWJyYXJ5IGNvbmZpZyAocHJvdmlkZWQgYnkgdGhlIHByb3h5IGJ1dCBjYW4gYmUgb3ZlcnJpZGRlbilcbiAqIEByZXR1cm5zIHtQcm9taXNlfSBBIFByb21pc2Ugb2JqZWN0IHJlcHJlc2VudHMgdGhlIHtudW1iZXJ9XG4gKi9cbmV4cG9ydCBjb25zdCBmZXRjaERlc2NyaXB0aW9uID0gYXN5bmMgKGFkZHJlc3MgPSAnJywgY29uZmlnID0ge30pID0+IHtcblxuICAgIGV4cGVjdC5hbGwoeyBhZGRyZXNzIH0sIHtcbiAgICAgICAgJ2FkZHJlc3MnOiB7XG4gICAgICAgICAgICB0eXBlOiAnYWRkcmVzcydcbiAgICAgICAgfVxuICAgIH0pO1xuXG4gICAgZXhwZWN0LmFsbChjb25maWcsIHtcbiAgICAgICAgJ3dlYjMnOiB7XG4gICAgICAgICAgICB0eXBlOiAnb2JqZWN0JyxcbiAgICAgICAgICAgIGNvZGU6IFdFQjNfUkVRVUlSRURcbiAgICAgICAgfSxcbiAgICAgICAgJ2NvbnRyYWN0cy5LZXJuZWwuYWJpJzoge1xuICAgICAgICAgICAgdHlwZTogJ29iamVjdCcsXG4gICAgICAgICAgICBjb2RlOiBDT05UUkFDVF9SRVFVSVJFRCxcbiAgICAgICAgICAgIGFyZ3M6IFsnS2VybmVsJ11cbiAgICAgICAgfVxuICAgIH0pO1xuXG4gICAgY29uc3Qga2VyID0gbmV3IGNvbmZpZy53ZWIzLmV0aC5Db250cmFjdChjb25maWcuY29udHJhY3RzLktlcm5lbC5hYmksIGFkZHJlc3MpO1xuICAgIGNvbnN0IGRlc2NyaXB0aW9uID0gYXdhaXQga2VyLm1ldGhvZHNcbiAgICAgICAgLmRlc2NyaXB0aW9uKClcbiAgICAgICAgLmNhbGwoKTtcblxuICAgIHJldHVybiBjb25maWcud2ViMy51dGlscy5oZXhUb1V0ZjgoZGVzY3JpcHRpb24pO1xufTtcblxuLyoqXG4gKiBHZXQgbWV0YWRhdGEgZnJvbSBLZXJuZWwgY29udHJhY3QgYnkgdGhlIGtlcm5lbCBhZGRyZXNzXG4gKiBcbiAqIEBwYXJhbSB7U3RyaW5nfSBhZGRyZXNzXG4gKiBAcGFyYW0ge09iamVjdH0gY29uZmlnIExpYnJhcnkgY29uZmlnIChwcm92aWRlZCBieSB0aGUgcHJveHkgYnV0IGNhbiBiZSBvdmVycmlkZGVuKVxuICogQHJldHVybnMge1Byb21pc2V9IEEgUHJvbWlzZSBvYmplY3QgcmVwcmVzZW50cyB0aGUge251bWJlcn1cbiAqL1xuZXhwb3J0IGNvbnN0IGZldGNoTWV0YWRhdGEgPSBhc3luYyAoYWRkcmVzcyA9ICcnLCBjb25maWcgPSB7fSkgPT4ge1xuXG4gICAgZXhwZWN0LmFsbCh7IGFkZHJlc3MgfSwge1xuICAgICAgICAnYWRkcmVzcyc6IHtcbiAgICAgICAgICAgIHR5cGU6ICdhZGRyZXNzJ1xuICAgICAgICB9XG4gICAgfSk7XG5cbiAgICBleHBlY3QuYWxsKGNvbmZpZywge1xuICAgICAgICAnd2ViMyc6IHtcbiAgICAgICAgICAgIHR5cGU6ICdvYmplY3QnLFxuICAgICAgICAgICAgY29kZTogV0VCM19SRVFVSVJFRFxuICAgICAgICB9LFxuICAgICAgICAnY29udHJhY3RzLktlcm5lbC5hYmknOiB7XG4gICAgICAgICAgICB0eXBlOiAnb2JqZWN0JyxcbiAgICAgICAgICAgIGNvZGU6IENPTlRSQUNUX1JFUVVJUkVELFxuICAgICAgICAgICAgYXJnczogWydLZXJuZWwnXVxuICAgICAgICB9XG4gICAgfSk7XG5cbiAgICBjb25zdCBrZXIgPSBuZXcgY29uZmlnLndlYjMuZXRoLkNvbnRyYWN0KGNvbmZpZy5jb250cmFjdHMuS2VybmVsLmFiaSwgYWRkcmVzcyk7XG4gICAgY29uc3QgbWV0YWRhdGEgPSBhd2FpdCBrZXIubWV0aG9kc1xuICAgICAgICAubWV0YWRhdGEoKVxuICAgICAgICAuY2FsbCgpO1xuXG4gICAgcmV0dXJuIGNvbmZpZy53ZWIzLnV0aWxzLmhleFRvVXRmOChtZXRhZGF0YSk7XG59O1xuXG4vKipcbiAqIEdldCBLZXJuZWwgYnkgdGhlIGtlcm5lbCBhZGRyZXNzXG4gKiBcbiAqIEBwYXJhbSB7U3RyaW5nfSBhZGRyZXNzXG4gKiBAcGFyYW0ge09iamVjdH0gY29uZmlnIExpYnJhcnkgY29uZmlnIChwcm92aWRlZCBieSB0aGUgcHJveHkgYnV0IGNhbiBiZSBvdmVycmlkZGVuKVxuICogQHJldHVybnMge1Byb21pc2V9IFByb21pc2Ugb2JqZWN0IHJlcHJlc2VudHMgdGhlIHtPYmplY3RbXX1cbiAqL1xuZXhwb3J0IGNvbnN0IGZldGNoS2VybmVsID0gYXN5bmMgKGFkZHJlc3MgPSAnJywgY29uZmlnID0ge30pID0+IHtcblxuICAgIGNvbnN0IFtcbiAgICAgICAgaXBmc0FkZHJlc3MsXG4gICAgICAgIGRhdGFEaW0sXG4gICAgICAgIGN1cnJlbnRQcmljZSxcbiAgICAgICAgY29tcGxleGl0eSxcbiAgICAgICAgbWV0YWRhdGEsXG4gICAgICAgIGRlc2NyaXB0aW9uXG4gICAgXSA9IGF3YWl0IFByb21pc2UuYWxsKFtcbiAgICAgICAgZmV0Y2hJcGZzQWRkcmVzcyhhZGRyZXNzLCBjb25maWcpLFxuICAgICAgICBmZXRjaERhdGFEaW0oYWRkcmVzcywgY29uZmlnKSxcbiAgICAgICAgZmV0Y2hDdXJyZW50UHJpY2UoYWRkcmVzcywgY29uZmlnKSxcbiAgICAgICAgZmV0Y2hDb21wbGV4aXR5KGFkZHJlc3MsIGNvbmZpZyksXG4gICAgICAgIGZldGNoTWV0YWRhdGEoYWRkcmVzcywgY29uZmlnKSxcbiAgICAgICAgZmV0Y2hEZXNjcmlwdGlvbihhZGRyZXNzLCBjb25maWcpXG4gICAgXSk7XG5cbiAgICByZXR1cm4ge1xuICAgICAgICBhZGRyZXNzLFxuICAgICAgICBpcGZzQWRkcmVzcyxcbiAgICAgICAgZGF0YURpbSxcbiAgICAgICAgY3VycmVudFByaWNlLFxuICAgICAgICBjb21wbGV4aXR5LFxuICAgICAgICBtZXRhZGF0YSxcbiAgICAgICAgZGVzY3JpcHRpb25cbiAgICB9O1xufTtcblxuLyoqXG4gKiBHZXQga2VybmVsIGJ5IGlkXG4gKiBcbiAqIEBwYXJhbSB7aW50ZWdlcn0gaWQgXG4gKiBAcGFyYW0ge09iamVjdH0gY29uZmlnIExpYnJhcnkgY29uZmlnIChwcm92aWRlZCBieSB0aGUgcHJveHkgYnV0IGNhbiBiZSBvdmVycmlkZGVuKVxuICogQHJldHVybnMge1Byb21pc2V9IEEgUHJvbWlzZSBvYmplY3QgcmVwcmVzZW50cyB0aGUge09iamVjdH1cbiAqL1xuZXhwb3J0IGNvbnN0IGZldGNoS2VybmVsQnlJZCA9IGFzeW5jIChpZCwgY29uZmlnID0ge30pID0+IHtcbiAgICBcbiAgICBjb25zdCBhZGRyZXNzID0gYXdhaXQgZmV0Y2hBZGRyZXNzQnlJZChpZCwgY29uZmlnKTtcbiAgICBjb25zdCBrZXJuZWwgPSBhd2FpdCBmZXRjaEtlcm5lbChhZGRyZXNzLCBjb25maWcpO1xuXG4gICAgcmV0dXJuIGtlcm5lbDtcbn07XG5cbi8qKlxuICogR2V0IGFsbCBrZXJuZWxzXG4gKiBcbiAqIEBwYXJhbSB7T2JqZWN0fSBjb25maWcgTGlicmFyeSBjb25maWcgKHByb3ZpZGVkIGJ5IHRoZSBwcm94eSBidXQgY2FuIGJlIG92ZXJyaWRkZW4pXG4gKiBAcmV0dXJucyB7UHJvbWlzZX0gUHJvbWlzZSBvYmplY3QgcmVwcmVzZW50cyB0aGUge09iamVjdFtdfVxuICovXG5leHBvcnQgY29uc3QgZmV0Y2hBbGwgPSBhc3luYyAoY29uZmlnID0ge30pID0+IHtcblxuICAgIGxldCByZWNvcmRzID0gW107XG4gICAgbGV0IGVycm9yID0gW107XG5cbiAgICB0cnkge1xuXG4gICAgICAgIGNvbnN0IGNvdW50ID0gYXdhaXQgZmV0Y2hDb3VudChjb25maWcpO1xuXG4gICAgICAgIGZvciAobGV0IGk9MDsgaSA8IGNvdW50OyBpKyspIHtcbiAgICAgICAgICAgIFxuICAgICAgICAgICAgdHJ5IHtcblxuICAgICAgICAgICAgICAgIGNvbnN0IGtlcm5lbCA9IGF3YWl0IGZldGNoS2VybmVsQnlJZChpLCBjb25maWcpO1xuXG4gICAgICAgICAgICAgICAgcmVjb3Jkcy5wdXNoKHtcbiAgICAgICAgICAgICAgICAgICAgaWQ6IGksXG4gICAgICAgICAgICAgICAgICAgIC4uLmtlcm5lbFxuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfSBjYXRjaChlcnIpIHtcbiAgICAgICAgICAgICAgICBlcnJvci5wdXNoKHtcbiAgICAgICAgICAgICAgICAgICAgaWQ6IGksXG4gICAgICAgICAgICAgICAgICAgIG1lc3NhZ2U6IGVyci5tZXNzYWdlXG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9ICAgICAgICBcbiAgICAgICAgfVxuICAgIH0gY2F0Y2goZXJyKSB7XG4gICAgICAgIGVycm9yLnB1c2goe1xuICAgICAgICAgICAgZXJyb3I6IGVyci5tZXNzYWdlXG4gICAgICAgIH0pO1xuICAgIH0gICBcblxuICAgIHJldHVybiB7XG4gICAgICAgIHJlY29yZHMsXG4gICAgICAgIGVycm9yXG4gICAgfTtcbn07XG5cbi8qKlxuICogRGVwbG95IEtlcm5lbCBjb250cmFjdCB0byB0aGUgbmV0d29ya1xuICogXG4gKiBAcGFyYW0ge1N0cmluZ30ga2VybmVsSXBmc0hhc2ggXG4gKiBAcGFyYW0ge09iamVjdH0gb3B0aW9ucyB7IGRpbWVuc2lvbiwgY29tcGxleGl0eSwgcHJpY2UsIG1ldGFkYXRhLCBkZXNjcmlwdGlvbiB9IFxuICogQHBhcmFtIHtTdHJpbmd9IHB1Ymxpc2hlciBQdWJsaXNoZXIgYWRkcmVzc1xuICogQHBhcmFtIHtPYmplY3R9IGNvbmZpZyBMaWJyYXJ5IGNvbmZpZyAocHJvdmlkZWQgYnkgdGhlIHByb3h5IGJ1dCBjYW4gYmUgb3ZlcnJpZGRlbilcbiAqIEByZXR1cm5zIHtQcm9taXNlfSBQcm9taXNlIG9iamVjdCByZXNvbHZlZCB0byBjb250cmFjdCBhZGRyZXNzXG4gKi9cbmV4cG9ydCBjb25zdCBkZXBsb3kgPSBhc3luYyAoa2VybmVsSXBmc0hhc2gsIHsgZGltZW5zaW9uLCBjb21wbGV4aXR5LCBwcmljZSwgbWV0YWRhdGEsIGRlc2NyaXB0aW9uIH0sIHB1Ymxpc2hlciwgY29uZmlnID0ge30pID0+IHtcblxuICAgIGV4cGVjdC5hbGwoeyBrZXJuZWxJcGZzSGFzaCwgcHVibGlzaGVyLCBkaW1lbnNpb24sIGNvbXBsZXhpdHksIHByaWNlLCBtZXRhZGF0YSwgZGVzY3JpcHRpb24gfSwge1xuICAgICAgICAna2VybmVsSXBmc0hhc2gnOiB7XG4gICAgICAgICAgICB0eXBlOiAnc3RyaW5nJ1xuICAgICAgICB9LFxuICAgICAgICAncHVibGlzaGVyJzoge1xuICAgICAgICAgICAgdHlwZTogJ2FkZHJlc3MnXG4gICAgICAgIH0sXG4gICAgICAgICdkaW1lbnNpb24nOiB7XG4gICAgICAgICAgICB0eXBlOiAnbnVtYmVyJ1xuICAgICAgICB9LFxuICAgICAgICAnY29tcGxleGl0eSc6IHtcbiAgICAgICAgICAgIHR5cGU6ICdudW1iZXInXG4gICAgICAgIH0sXG4gICAgICAgICdwcmljZSc6IHtcbiAgICAgICAgICAgIHR5cGU6ICdudW1iZXInXG4gICAgICAgIH0sXG4gICAgICAgICdtZXRhZGF0YSc6IHtcbiAgICAgICAgICAgIHR5cGU6ICdzdHJpbmcnXG4gICAgICAgIH0sXG4gICAgICAgICdkZXNjcmlwdGlvbic6IHtcbiAgICAgICAgICAgIHR5cGU6ICdzdHJpbmcnXG4gICAgICAgIH1cbiAgICB9KTtcblxuICAgIGV4cGVjdC5hbGwoY29uZmlnLCB7XG4gICAgICAgICd3ZWIzJzoge1xuICAgICAgICAgICAgdHlwZTogJ29iamVjdCcsXG4gICAgICAgICAgICBjb2RlOiBXRUIzX1JFUVVJUkVEXG4gICAgICAgIH0sXG4gICAgICAgICdjb250cmFjdHMuS2VybmVsLmFiaSc6IHtcbiAgICAgICAgICAgIHR5cGU6ICdvYmplY3QnLFxuICAgICAgICAgICAgY29kZTogQ09OVFJBQ1RfUkVRVUlSRUQsXG4gICAgICAgICAgICBhcmdzOiBbJ0tlcm5lbCddXG4gICAgICAgIH1cbiAgICB9KTtcblxuICAgIGNvbnN0IGFyZ3MgPSBbXG4gICAgICAgIGNvbmZpZy53ZWIzLnV0aWxzLnV0ZjhUb0hleChrZXJuZWxJcGZzSGFzaCksIFxuICAgICAgICBkaW1lbnNpb24sIFxuICAgICAgICBjb21wbGV4aXR5LCBcbiAgICAgICAgY29uZmlnLndlYjMudXRpbHMudG9IZXgocHJpY2UpLCBcbiAgICAgICAgY29uZmlnLndlYjMudXRpbHMudXRmOFRvSGV4KG1ldGFkYXRhKSxcbiAgICAgICAgY29uZmlnLndlYjMudXRpbHMudXRmOFRvSGV4KGRlc2NyaXB0aW9uKVxuICAgIF07XG4gICAgICAgIFxuICAgIC8vIEVzdGltYXRlIHJlcXVpcmVkIGFtb3VudCBvZiBnYXNcbiAgICBjb25zdCBnYXMgPSBhd2FpdCB3ZWIzSGVscGVycy5lc3RpbWF0ZUdhcyhjb25maWcuY29udHJhY3RzLktlcm5lbC5ieXRlY29kZSwgYXJncywgY29uZmlnKTtcblxuICAgIC8vIENyZWF0ZSBhbmQgZGVwbG95IGtlcm5lbCBjb250cmFjdFxuICAgIGNvbnN0IGtlcm5lbENvbnRyYWN0QWRkcmVzcyA9IGF3YWl0IHdlYjNIZWxwZXJzLmRlcGxveUNvbnRyYWN0KGNvbmZpZy5jb250cmFjdHMuS2VybmVsLCB7XG4gICAgICAgIGFyZ3MsXG4gICAgICAgIGZyb206IHB1Ymxpc2hlcixcbiAgICAgICAgZ2FzOiBOdW1iZXIucGFyc2VJbnQoZ2FzICogMS41LCAxMClcbiAgICB9LCBjb25maWcpO1xuXG4gICAgcmV0dXJuIGtlcm5lbENvbnRyYWN0QWRkcmVzcztcbn07XG5cbi8qKlxuICogQWRkIGtlcm5lbCB0byBtYXJrZXRcbiAqIFxuICogQHBhcmFtIHtTdHJpbmd9IGtlcm5lbENvbnRyYWN0QWRkcmVzcyBcbiAqIEBwYXJhbSB7U3RyaW5nfSBwdWJsaXNoZXJBZGRyZXNzIFxuICogQHBhcmFtIHtPYmplY3R9IGNvbmZpZyBMaWJyYXJ5IGNvbmZpZyAocHJvdmlkZWQgYnkgdGhlIHByb3h5IGJ1dCBjYW4gYmUgb3ZlcnJpZGRlbilcbiAqIEByZXR1cm5zIHtQcm9taXNlfSBQcm9taXNlIG9iamVjdCByZXNvbHZlZCB0byB7U3RyaW5nfSBjb250cmFjdEFkZHJlc3MgLy8gY2FuIGJlIG51bGwgaWYgdXNlZCBnYW5hY2hlLWNsaSBlbnZpcm9ubWVudFxuICovXG5leHBvcnQgY29uc3QgYWRkVG9NYXJrZXQgPSAoa2VybmVsQ29udHJhY3RBZGRyZXNzLCBwdWJsaXNoZXJBZGRyZXNzLCBjb25maWcgPSB7fSkgPT4gbmV3IFByb21pc2UoYXN5bmMgKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuXG4gICAgZXhwZWN0LmFsbCh7IGtlcm5lbENvbnRyYWN0QWRkcmVzcywgcHVibGlzaGVyQWRkcmVzcyB9LCB7XG4gICAgICAgICdrZXJuZWxDb250cmFjdEFkZHJlc3MnOiB7XG4gICAgICAgICAgICB0eXBlOiAnYWRkcmVzcydcbiAgICAgICAgfSxcbiAgICAgICAgJ3B1Ymxpc2hlckFkZHJlc3MnOiB7XG4gICAgICAgICAgICB0eXBlOiAnYWRkcmVzcydcbiAgICAgICAgfVxuICAgIH0pO1xuXG4gICAgZXhwZWN0LmFsbChjb25maWcsIHtcbiAgICAgICAgJ3dlYjMnOiB7XG4gICAgICAgICAgICB0eXBlOiAnb2JqZWN0JyxcbiAgICAgICAgICAgIGNvZGU6IFdFQjNfUkVRVUlSRURcbiAgICAgICAgfSxcbiAgICAgICAgJ2NvbnRyYWN0cy5QYW5kb3JhTWFya2V0LmFiaSc6IHtcbiAgICAgICAgICAgIHR5cGU6ICdvYmplY3QnLFxuICAgICAgICAgICAgY29kZTogQ09OVFJBQ1RfUkVRVUlSRUQsXG4gICAgICAgICAgICBhcmdzOiBbJ1BhbmRvcmFNYXJrZXQnXVxuICAgICAgICB9LFxuICAgICAgICAnYWRkcmVzc2VzLlBhbmRvcmFNYXJrZXQnOiB7XG4gICAgICAgICAgICB0eXBlOiAnYWRkcmVzcycsXG4gICAgICAgICAgICBjb2RlOiBBRERSRVNTX1JFUVVJUkVELFxuICAgICAgICAgICAgYXJnczogWydLZXJuZWwnXVxuICAgICAgICB9LFxuICAgICAgICAnd2ViMy5jdXJyZW50UHJvdmlkZXIuaXNNZXRhTWFzayc6IHtcbiAgICAgICAgICAgIHR5cGU6ICdib29sZWFuJyxcbiAgICAgICAgICAgIGNvZGU6IFdFQjNfTUVUQU1BU0tfUkVRVUlSRURcbiAgICAgICAgfVxuICAgIH0pO1xuXG4gICAgY29uc3QgbWFya2V0ID0gbmV3IGNvbmZpZy53ZWIzLmV0aC5Db250cmFjdChjb25maWcuY29udHJhY3RzLlBhbmRvcmFNYXJrZXQuYWJpLCBjb25maWcuYWRkcmVzc2VzLlBhbmRvcmFNYXJrZXQpO1xuICAgIGNvbnN0IGdhc1ByaWNlID0gYXdhaXQgY29uZmlnLndlYjMuZXRoLmdldEdhc1ByaWNlKCk7XG4gICAgbWFya2V0Lm1ldGhvZHNcbiAgICAgICAgLmFkZEtlcm5lbChrZXJuZWxDb250cmFjdEFkZHJlc3MpXG4gICAgICAgIC5zZW5kKHtcbiAgICAgICAgICAgIGZyb206IHB1Ymxpc2hlckFkZHJlc3MsXG4gICAgICAgICAgICBnYXNQcmljZVxuICAgICAgICB9KVxuICAgICAgICAub24oJ2Vycm9yJywgcmVqZWN0KVxuICAgICAgICAub24oJ3JlY2VpcHQnLCByZWNlaXB0ID0+IHtcblxuICAgICAgICAgICAgaWYgKE51bWJlcihyZWNlaXB0LnN0YXR1cykgPT09IDApIHtcblxuICAgICAgICAgICAgICAgIHJldHVybiByZWplY3QocGpzRXJyb3IoVFJBTlNBQ1RJT05fVU5TVUNDRVNTRlVMKSk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHJlc29sdmUocmVjZWlwdC5jb250cmFjdEFkZHJlc3MgfHwgcmVjZWlwdC5ldmVudHMuS2VybmVsQWRkZWQucmV0dXJuVmFsdWVzLmtlcm5lbCk7XG4gICAgICAgIH0pO1xuICAgIC8vIEBub3RlIEluIGNhc2Ugb2YgZ2FuYWNoZS1jbGkgYmxvY2tjaGFpbiBcImNvbnRyYWN0QWRkcmVzc1wiIGFsd2F5cyB3aWxsIGJlIGVxdWFsIHRvIG51bGxcbn0pO1xuXG4vKipcbiAqIFJlbW92ZSBrZXJuZWwgZnJvbSBQYW5kb3JhTWFya2V0XG4gKiBcbiAqIEBwYXJhbSB7U3RyaW5nfSBrZXJuZWxBZGRyZXNzXG4gKiBAcGFyYW0ge1N0cmluZ30gcHVibGlzaGVyQWRkcmVzcyBcbiAqIEBwYXJhbSB7T2JqZWN0fSBjb25maWcgTGlicmFyeSBjb25maWcgKHByb3ZpZGVkIGJ5IHRoZSBwcm94eSBidXQgY2FuIGJlIG92ZXJyaWRkZW4pIFxuICogQHJldHVybnMge1Byb21pc2V9IFByb21pc2Ugb2JqZWN0IHJlc29sdmVkIHRvIHtTdHJpbmd9IGNvbnRyYWN0QWRkcmVzc1xuICovXG5leHBvcnQgY29uc3QgcmVtb3ZlS2VybmVsID0gKGtlcm5lbEFkZHJlc3MsIHB1Ymxpc2hlckFkZHJlc3MsIGNvbmZpZyA9IHt9KSA9PiBuZXcgUHJvbWlzZShhc3luYyAocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG5cbiAgICBleHBlY3QuYWxsKHsga2VybmVsQWRkcmVzcywgcHVibGlzaGVyQWRkcmVzcyB9LCB7XG4gICAgICAgICdrZXJuZWxBZGRyZXNzJzoge1xuICAgICAgICAgICAgdHlwZTogJ2FkZHJlc3MnXG4gICAgICAgIH0sXG4gICAgICAgICdwdWJsaXNoZXJBZGRyZXNzJzoge1xuICAgICAgICAgICAgdHlwZTogJ2FkZHJlc3MnXG4gICAgICAgIH1cbiAgICB9KTtcblxuICAgIGV4cGVjdC5hbGwoY29uZmlnLCB7XG4gICAgICAgICd3ZWIzJzoge1xuICAgICAgICAgICAgdHlwZTogJ29iamVjdCcsXG4gICAgICAgICAgICBjb2RlOiBXRUIzX1JFUVVJUkVEXG4gICAgICAgIH0sXG4gICAgICAgICdjb250cmFjdHMuUGFuZG9yYU1hcmtldC5hYmknOiB7XG4gICAgICAgICAgICB0eXBlOiAnb2JqZWN0JyxcbiAgICAgICAgICAgIGNvZGU6IENPTlRSQUNUX1JFUVVJUkVELFxuICAgICAgICAgICAgYXJnczogWydQYW5kb3JhTWFya2V0J11cbiAgICAgICAgfSxcbiAgICAgICAgJ2FkZHJlc3Nlcy5QYW5kb3JhTWFya2V0Jzoge1xuICAgICAgICAgICAgdHlwZTogJ2FkZHJlc3MnLFxuICAgICAgICAgICAgY29kZTogQUREUkVTU19SRVFVSVJFRCxcbiAgICAgICAgICAgIGFyZ3M6IFsnS2VybmVsJ11cbiAgICAgICAgfVxuICAgIH0pO1xuXG4gICAgY29uc3QgbWFya2V0ID0gbmV3IGNvbmZpZy53ZWIzLmV0aC5Db250cmFjdChjb25maWcuY29udHJhY3RzLlBhbmRvcmFNYXJrZXQuYWJpLCBjb25maWcuYWRkcmVzc2VzLlBhbmRvcmFNYXJrZXQpO1xuICAgIGNvbnN0IGdhc1ByaWNlID0gYXdhaXQgY29uZmlnLndlYjMuZXRoLmdldEdhc1ByaWNlKCk7XG4gICAgbWFya2V0Lm1ldGhvZHNcbiAgICAgICAgLnJlbW92ZUtlcm5lbChrZXJuZWxBZGRyZXNzKVxuICAgICAgICAuc2VuZCh7XG4gICAgICAgICAgICBmcm9tOiBwdWJsaXNoZXJBZGRyZXNzLFxuICAgICAgICAgICAgZ2FzUHJpY2VcbiAgICAgICAgfSlcbiAgICAgICAgLm9uKCdlcnJvcicsIHJlamVjdClcbiAgICAgICAgLm9uKCdyZWNlaXB0JywgcmVjZWlwdCA9PiB7XG5cbiAgICAgICAgICAgIGlmIChOdW1iZXIocmVjZWlwdC5zdGF0dXMpID09PSAwKSB7XG5cbiAgICAgICAgICAgICAgICByZXR1cm4gcmVqZWN0KHBqc0Vycm9yKFRSQU5TQUNUSU9OX1VOU1VDQ0VTU0ZVTCkpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICByZXNvbHZlKHJlY2VpcHQuY29udHJhY3RBZGRyZXNzKTtcbiAgICAgICAgfSk7XG59KTtcblxuLyoqXG4gKiBIYW5kbGUgZXZlbnQgS2VybmVsQWRkZWRcbiAqIFxuICogQHBhcmFtIHtPYmplY3R9IG9wdGlvbnMgRXZlbnQgaGFuZGxlciBvcHRpb25zXG4gKiBAcGFyYW0ge09iamVjdH0gY29uZmlnIExpYnJhcnkgY29uZmlnIChwcm92aWRlZCBieSB0aGUgcHJveHkgYnV0IGNhbiBiZSBvdmVycmlkZGVuKVxuICogQHJldHVybnMge1Byb21pc2U8e09iamVjdH0+fSBQUHJvbWlzZSBvYmplY3QgcmVzb2x2ZWQgdG8gdGhlIG9iamVjdCB3aXRoIGNoYWluZWQgY2FsbGJhY2tzICNkYXRhIGFuZCAjZXJyb3JcbiAqL1xuZXhwb3J0IGNvbnN0IGV2ZW50S2VybmVsQWRkZWQgPSBhc3luYyAob3B0aW9ucyA9IHt9LCBjb25maWcgPSB7fSkgPT4ge1xuXG4gICAgZXhwZWN0LmFsbCh7IG9wdGlvbnMgfSwge1xuICAgICAgICAnb3B0aW9ucyc6IHtcbiAgICAgICAgICAgIHR5cGU6ICdvYmplY3QnXG4gICAgICAgIH1cbiAgICB9KTtcblxuICAgIGV4cGVjdC5hbGwoY29uZmlnLCB7XG4gICAgICAgICd3ZWIzJzoge1xuICAgICAgICAgICAgdHlwZTogJ29iamVjdCcsXG4gICAgICAgICAgICBjb2RlOiBXRUIzX1JFUVVJUkVEXG4gICAgICAgIH0sXG4gICAgICAgICdjb250cmFjdHMuUGFuZG9yYU1hcmtldC5hYmknOiB7XG4gICAgICAgICAgICB0eXBlOiAnb2JqZWN0JyxcbiAgICAgICAgICAgIGNvZGU6IENPTlRSQUNUX1JFUVVJUkVELFxuICAgICAgICAgICAgYXJnczogWydQYW5kb3JhTWFya2V0J11cbiAgICAgICAgfSxcbiAgICAgICAgJ2FkZHJlc3Nlcy5QYW5kb3JhTWFya2V0Jzoge1xuICAgICAgICAgICAgdHlwZTogJ2FkZHJlc3MnLFxuICAgICAgICAgICAgY29kZTogQUREUkVTU19SRVFVSVJFRCxcbiAgICAgICAgICAgIGFyZ3M6IFsnS2VybmVsJ11cbiAgICAgICAgfVxuICAgIH0pO1xuXG4gICAgY29uc3QgY2FsbGJhY2tzID0ge1xuICAgICAgICBvbkRhdGE6ICgpID0+IHt9LFxuICAgICAgICBvbkVycm9yOiAoKSA9PiB7fVxuICAgIH07XG5cbiAgICBjb25zdCBjaGFpbiA9IHtcbiAgICAgICAgZGF0YTogKGNiID0gKCkgPT4ge30pID0+IHtcbiAgICAgICAgICAgIGNhbGxiYWNrcy5vbkRhdGEgPSBjYjtcbiAgICAgICAgICAgIHJldHVybiBjaGFpbjtcbiAgICAgICAgfSxcbiAgICAgICAgZXJyb3I6IChjYiA9ICgpID0+IHt9KSA9PiB7XG4gICAgICAgICAgICBjYWxsYmFja3Mub25FcnJvciA9IGNiO1xuICAgICAgICAgICAgcmV0dXJuIGNoYWluO1xuICAgICAgICB9LFxuICAgICAgICBzdWJzY3JpYmVkOiAoY2IgPSAoKSA9PiB7fSkgPT4gey8vIEB0b2RvIFJlbW92ZSBzdWJzY3JpYmVkIGNhbGxiYWNrXG4gICAgICAgICAgICBjYWxsYmFja3Mub25TdWJzY3JpYmVkID0gY2I7XG4gICAgICAgICAgICByZXR1cm4gY2hhaW47XG4gICAgICAgIH1cbiAgICB9O1xuXG4gICAgY29uc3QgbWFyID0gbmV3IGNvbmZpZy53ZWIzLmV0aC5Db250cmFjdChjb25maWcuY29udHJhY3RzLlBhbmRvcmFNYXJrZXQuYWJpLCBjb25maWcuYWRkcmVzc2VzLlBhbmRvcmFNYXJrZXQpO1xuICAgIGNoYWluLmV2ZW50ID0gW107XG4gICAgY2hhaW4uZXZlbnRbMF0gPSBtYXIuZXZlbnRzLktlcm5lbEFkZGVkKG9wdGlvbnMpXG4gICAgICAgIC5vbignZGF0YScsIGFzeW5jIGV2ZW50ID0+IHtcblxuICAgICAgICAgICAgdHJ5IHtcblxuICAgICAgICAgICAgICAgIGNvbnN0IGtlcm5lbCA9IGF3YWl0IGZldGNoS2VybmVsKGV2ZW50LnJldHVyblZhbHVlcy5rZXJuZWwsIGNvbmZpZyk7XG4gICAgICAgICAgICAgICAgY2FsbGJhY2tzLm9uRGF0YSh7XG4gICAgICAgICAgICAgICAgICAgIHJlY29yZHM6IFtrZXJuZWxdLFxuICAgICAgICAgICAgICAgICAgICBldmVudFxuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfSBjYXRjaChlcnIpIHtcbiAgICAgICAgICAgICAgICBjYWxsYmFja3Mub25FcnJvcihlcnIpO1xuICAgICAgICAgICAgfSAgICAgICAgICAgIFxuICAgICAgICB9KVxuICAgICAgICAub24oJ2Vycm9yJywgY2FsbGJhY2tzLm9uRXJyb3IpO1xuICAgIGNoYWluLmV2ZW50WzBdLm5hbWUgPSAnS2VybmVsQWRkZWQnO1xuXG4gICAgcmV0dXJuIGNoYWluO1xufTtcblxuLyoqXG4gKiBIYW5kbGUgZXZlbnQgS2VybmVsUmVtb3ZlZFxuICogXG4gKiBAcGFyYW0ge09iamVjdH0gb3B0aW9ucyBFdmVudCBoYW5kbGVyIG9wdGlvbnNcbiAqIEBwYXJhbSB7T2JqZWN0fSBjb25maWcgTGlicmFyeSBjb25maWcgKHByb3ZpZGVkIGJ5IHRoZSBwcm94eSBidXQgY2FuIGJlIG92ZXJyaWRkZW4pXG4gKiBAcmV0dXJucyB7UHJvbWlzZTx7T2JqZWN0fT59IFBQcm9taXNlIG9iamVjdCByZXNvbHZlZCB0byB0aGUgb2JqZWN0IHdpdGggY2hhaW5lZCBjYWxsYmFja3MgI2RhdGEgYW5kICNlcnJvclxuICovXG5leHBvcnQgY29uc3QgZXZlbnRLZXJuZWxSZW1vdmVkID0gYXN5bmMgKG9wdGlvbnMgPSB7fSwgY29uZmlnID0ge30pID0+IHtcblxuICAgIGV4cGVjdC5hbGwoeyBvcHRpb25zIH0sIHtcbiAgICAgICAgJ29wdGlvbnMnOiB7XG4gICAgICAgICAgICB0eXBlOiAnb2JqZWN0J1xuICAgICAgICB9XG4gICAgfSk7XG5cbiAgICBleHBlY3QuYWxsKGNvbmZpZywge1xuICAgICAgICAnd2ViMyc6IHtcbiAgICAgICAgICAgIHR5cGU6ICdvYmplY3QnLFxuICAgICAgICAgICAgY29kZTogV0VCM19SRVFVSVJFRFxuICAgICAgICB9LFxuICAgICAgICAnY29udHJhY3RzLlBhbmRvcmFNYXJrZXQuYWJpJzoge1xuICAgICAgICAgICAgdHlwZTogJ29iamVjdCcsXG4gICAgICAgICAgICBjb2RlOiBDT05UUkFDVF9SRVFVSVJFRCxcbiAgICAgICAgICAgIGFyZ3M6IFsnUGFuZG9yYU1hcmtldCddXG4gICAgICAgIH0sXG4gICAgICAgICdhZGRyZXNzZXMuUGFuZG9yYU1hcmtldCc6IHtcbiAgICAgICAgICAgIHR5cGU6ICdhZGRyZXNzJyxcbiAgICAgICAgICAgIGNvZGU6IEFERFJFU1NfUkVRVUlSRUQsXG4gICAgICAgICAgICBhcmdzOiBbJ1BhbmRvcmFNYXJrZXQnXVxuICAgICAgICB9XG4gICAgfSk7XG5cbiAgICBjb25zdCBjYWxsYmFja3MgPSB7XG4gICAgICAgIG9uRGF0YTogKCkgPT4ge30sXG4gICAgICAgIG9uRXJyb3I6ICgpID0+IHt9XG4gICAgfTtcblxuICAgIGNvbnN0IGNoYWluID0ge1xuICAgICAgICBkYXRhOiAoY2IgPSAoKSA9PiB7fSkgPT4ge1xuICAgICAgICAgICAgY2FsbGJhY2tzLm9uRGF0YSA9IGNiO1xuICAgICAgICAgICAgcmV0dXJuIGNoYWluO1xuICAgICAgICB9LFxuICAgICAgICBlcnJvcjogKGNiID0gKCkgPT4ge30pID0+IHtcbiAgICAgICAgICAgIGNhbGxiYWNrcy5vbkVycm9yID0gY2I7XG4gICAgICAgICAgICByZXR1cm4gY2hhaW47XG4gICAgICAgIH1cbiAgICB9O1xuXG4gICAgY29uc3QgbWFyID0gbmV3IGNvbmZpZy53ZWIzLmV0aC5Db250cmFjdChjb25maWcuY29udHJhY3RzLlBhbmRvcmFNYXJrZXQuYWJpLCBjb25maWcuYWRkcmVzc2VzLlBhbmRvcmFNYXJrZXQpO1xuICAgIGNoYWluLmV2ZW50ID0gW107XG4gICAgY2hhaW4uZXZlbnRbMF0gPSBtYXIuZXZlbnRzLktlcm5lbFJlbW92ZWQob3B0aW9ucylcbiAgICAgICAgLm9uKCdkYXRhJywgYXN5bmMgZXZlbnQgPT4ge1xuXG4gICAgICAgICAgICBjYWxsYmFja3Mub25EYXRhKHtcbiAgICAgICAgICAgICAgICByZWNvcmRzOiBbe2FkZHJlc3M6IGV2ZW50LnJldHVyblZhbHVlcy5rZXJuZWx9XSxcbiAgICAgICAgICAgICAgICBldmVudFxuICAgICAgICAgICAgfSk7ICAgICAgICAgICAgXG4gICAgICAgIH0pXG4gICAgICAgIC5vbignZXJyb3InLCBjYWxsYmFja3Mub25FcnJvcik7XG4gICAgY2hhaW4uZXZlbnRbMF0ubmFtZSA9ICdLZXJuZWxSZW1vdmVkJztcblxuICAgIHJldHVybiBjaGFpbjtcbn07XG4iXX0=