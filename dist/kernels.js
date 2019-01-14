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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9rZXJuZWxzLmpzIl0sIm5hbWVzIjpbImZldGNoQ291bnQiLCJjb25maWciLCJleHBlY3QiLCJhbGwiLCJ0eXBlIiwiY29kZSIsIldFQjNfUkVRVUlSRUQiLCJDT05UUkFDVF9SRVFVSVJFRCIsImFyZ3MiLCJBRERSRVNTX1JFUVVJUkVEIiwibWFyIiwid2ViMyIsImV0aCIsIkNvbnRyYWN0IiwiY29udHJhY3RzIiwiUGFuZG9yYU1hcmtldCIsImFiaSIsImFkZHJlc3NlcyIsIm1ldGhvZHMiLCJrZXJuZWxzQ291bnQiLCJjYWxsIiwiY291bnQiLCJOdW1iZXIiLCJwYXJzZUludCIsImZldGNoQWRkcmVzc0J5SWQiLCJpZCIsImtlcm5lbHMiLCJrZXJuZWxDb250cmFjdCIsImZldGNoSXBmc0FkZHJlc3MiLCJhZGRyZXNzIiwia2VyIiwiS2VybmVsIiwiaXBmc0FkZHJlc3MiLCJ1dGlscyIsImhleFRvQXNjaWkiLCJmZXRjaERhdGFEaW0iLCJkYXRhRGltIiwiZmV0Y2hDdXJyZW50UHJpY2UiLCJjdXJyZW50UHJpY2UiLCJmZXRjaENvbXBsZXhpdHkiLCJjb21wbGV4aXR5IiwiZmV0Y2hEZXNjcmlwdGlvbiIsImRlc2NyaXB0aW9uIiwiaGV4VG9VdGY4IiwiZmV0Y2hNZXRhZGF0YSIsIm1ldGFkYXRhIiwiZmV0Y2hLZXJuZWwiLCJQcm9taXNlIiwiZmV0Y2hLZXJuZWxCeUlkIiwia2VybmVsIiwiZmV0Y2hBbGwiLCJyZWNvcmRzIiwiZXJyb3IiLCJpIiwicHVzaCIsIm1lc3NhZ2UiLCJkZXBsb3kiLCJrZXJuZWxJcGZzSGFzaCIsInB1Ymxpc2hlciIsImRpbWVuc2lvbiIsInByaWNlIiwidXRmOFRvSGV4IiwidG9IZXgiLCJ3ZWIzSGVscGVycyIsImVzdGltYXRlR2FzIiwiYnl0ZWNvZGUiLCJnYXMiLCJkZXBsb3lDb250cmFjdCIsImZyb20iLCJrZXJuZWxDb250cmFjdEFkZHJlc3MiLCJhZGRUb01hcmtldCIsInB1Ymxpc2hlckFkZHJlc3MiLCJyZXNvbHZlIiwicmVqZWN0IiwiV0VCM19NRVRBTUFTS19SRVFVSVJFRCIsIm1hcmtldCIsImdldEdhc1ByaWNlIiwiZ2FzUHJpY2UiLCJhZGRLZXJuZWwiLCJzZW5kIiwib24iLCJyZWNlaXB0Iiwic3RhdHVzIiwiVFJBTlNBQ1RJT05fVU5TVUNDRVNTRlVMIiwiY29udHJhY3RBZGRyZXNzIiwiZXZlbnRzIiwiS2VybmVsQWRkZWQiLCJyZXR1cm5WYWx1ZXMiLCJyZW1vdmVLZXJuZWwiLCJrZXJuZWxBZGRyZXNzIiwiZXZlbnRLZXJuZWxBZGRlZCIsIm9wdGlvbnMiLCJjYWxsYmFja3MiLCJvbkRhdGEiLCJvbkVycm9yIiwiY2hhaW4iLCJkYXRhIiwiY2IiLCJzdWJzY3JpYmVkIiwib25TdWJzY3JpYmVkIiwiZXZlbnQiLCJuYW1lIiwiZXZlbnRLZXJuZWxSZW1vdmVkIiwiS2VybmVsUmVtb3ZlZCJdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7Ozs7O0FBU0E7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUVBOztBQUNBOztBQU9BOzs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUVBOzs7Ozs7QUFNTyxJQUFNQSxVQUFVO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQSwwQkFBRztBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBT0MsWUFBQUEsTUFBUCwyREFBZ0IsRUFBaEI7QUFFdEJDLFlBQUFBLE1BQU0sQ0FBQ0MsR0FBUCxDQUFXRixNQUFYLEVBQW1CO0FBQ2Ysc0JBQVE7QUFDSkcsZ0JBQUFBLElBQUksRUFBRSxRQURGO0FBRUpDLGdCQUFBQSxJQUFJLEVBQUVDO0FBRkYsZUFETztBQUtmLDZDQUErQjtBQUMzQkYsZ0JBQUFBLElBQUksRUFBRSxRQURxQjtBQUUzQkMsZ0JBQUFBLElBQUksRUFBRUUseUJBRnFCO0FBRzNCQyxnQkFBQUEsSUFBSSxFQUFFLENBQUMsZUFBRDtBQUhxQixlQUxoQjtBQVVmLHlDQUEyQjtBQUN2QkosZ0JBQUFBLElBQUksRUFBRSxTQURpQjtBQUV2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QU4sR0FBYyxFQUFkO0FBQ0FMLFlBQUFBLEtBQUssQ0FBQ0ssS0FBTixDQUFZLENBQVosSUFBaUIxRixHQUFHLENBQUMyRSxNQUFKLENBQVdrQixhQUFYLENBQXlCWixPQUF6QixFQUNaWCxFQURZLENBQ1QsTUFEUztBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUEsc0NBQ0QsbUJBQU1vQixLQUFOO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFFUlIsd0JBQUFBLFNBQVMsQ0FBQ0MsTUFBVixDQUFpQjtBQUNiMUMsMEJBQUFBLE9BQU8sRUFBRSxDQUFDO0FBQUN0Qiw0QkFBQUEsT0FBTyxFQUFFdUUsS0FBSyxDQUFDYixZQUFOLENBQW1CdEM7QUFBN0IsMkJBQUQsQ0FESTtBQUVibUQsMEJBQUFBLEtBQUssRUFBTEE7QUFGYSx5QkFBakI7O0FBRlE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUEsZUFEQzs7QUFBQTtBQUFBO0FBQUE7QUFBQSxpQkFRWnBCLEVBUlksQ0FRVCxPQVJTLEVBUUFZLFNBQVMsQ0FBQ0UsT0FSVixDQUFqQjtBQVNBQyxZQUFBQSxLQUFLLENBQUNLLEtBQU4sQ0FBWSxDQUFaLEVBQWVDLElBQWYsR0FBc0IsZUFBdEI7QUFwRDhCLCtDQXNEdkJOLEtBdER1Qjs7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQSxHQUFIOztBQUFBLGtCQUFsQk8sa0JBQWtCO0FBQUE7QUFBQTtBQUFBLEdBQXhCIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBLZXJuZWxzIHJlbGF0ZWQgbWV0aG9kc1xuICogVGhpcyBmaWxlIGl0IGlzIGEgcGFydCBvZiB0aGUgUGFuZG9yYSBQeXJyaGEgSmF2YXNjcmlwdCBsaWJyYXJ5XG4gKiBcbiAqIEBmaWxlIGtlcm5lbHMuanNcbiAqIEBhdXRob3IgS29zdGlhbnR5biBTbXlybm92IDxrb3N0eXNoQGdtYWlsLmNvbT5cbiAqIEBkYXRlIDIwMThcbiAqL1xuXG4ndXNlIHN0cmljdCc7XG5cbmltcG9ydCAqIGFzIGV4cGVjdCBmcm9tICcuL2hlbHBlcnMvZXhwZWN0JztcbmltcG9ydCBwanNFcnJvciwge1xuICAgIENPTlRSQUNUX1JFUVVJUkVELFxuICAgIEFERFJFU1NfUkVRVUlSRUQsXG4gICAgV0VCM19SRVFVSVJFRCxcbiAgICBXRUIzX01FVEFNQVNLX1JFUVVJUkVELFxuICAgIFRSQU5TQUNUSU9OX1VOU1VDQ0VTU0ZVTFxufSBmcm9tICcuL2hlbHBlcnMvZXJyb3JzJztcbmltcG9ydCAqIGFzIHdlYjNIZWxwZXJzIGZyb20gJy4vaGVscGVycy93ZWIzJztcblxuLyoqXG4gKiBHZXQga2VybmVscyBjb3VudCBmcm9tIFBhbmRvcmFNYXJrZXQgY29udHJhY3RcbiAqIFxuICogQHBhcmFtIHtPYmplY3R9IGNvbmZpZyBMaWJyYXJ5IGNvbmZpZyAocHJvdmlkZWQgYnkgdGhlIHByb3h5IGJ1dCBjYW4gYmUgb3ZlcnJpZGRlbilcbiAqIEByZXR1cm5zIHtQcm9taXNlfSBBIFByb21pc2Ugb2JqZWN0IHJlcHJlc2VudHMgdGhlIHtudW1iZXJ9IFxuICovXG5leHBvcnQgY29uc3QgZmV0Y2hDb3VudCA9IGFzeW5jIChjb25maWcgPSB7fSkgPT4ge1xuXG4gICAgZXhwZWN0LmFsbChjb25maWcsIHtcbiAgICAgICAgJ3dlYjMnOiB7XG4gICAgICAgICAgICB0eXBlOiAnb2JqZWN0JyxcbiAgICAgICAgICAgIGNvZGU6IFdFQjNfUkVRVUlSRURcbiAgICAgICAgfSxcbiAgICAgICAgJ2NvbnRyYWN0cy5QYW5kb3JhTWFya2V0LmFiaSc6IHtcbiAgICAgICAgICAgIHR5cGU6ICdvYmplY3QnLFxuICAgICAgICAgICAgY29kZTogQ09OVFJBQ1RfUkVRVUlSRUQsXG4gICAgICAgICAgICBhcmdzOiBbJ1BhbmRvcmFNYXJrZXQnXVxuICAgICAgICB9LFxuICAgICAgICAnYWRkcmVzc2VzLlBhbmRvcmFNYXJrZXQnOiB7XG4gICAgICAgICAgICB0eXBlOiAnYWRkcmVzcycsXG4gICAgICAgICAgICBjb2RlOiBBRERSRVNTX1JFUVVJUkVELFxuICAgICAgICAgICAgYXJnczogWydQYW5kb3JhTWFya2V0J11cbiAgICAgICAgfVxuICAgIH0pO1xuXG4gICAgY29uc3QgbWFyID0gbmV3IGNvbmZpZy53ZWIzLmV0aC5Db250cmFjdChjb25maWcuY29udHJhY3RzLlBhbmRvcmFNYXJrZXQuYWJpLCBjb25maWcuYWRkcmVzc2VzLlBhbmRvcmFNYXJrZXQpO1xuICAgIGNvbnN0IGNvdW50ID0gYXdhaXQgbWFyLm1ldGhvZHNcbiAgICAgICAgLmtlcm5lbHNDb3VudCgpXG4gICAgICAgIC5jYWxsKCk7XG5cbiAgICByZXR1cm4gTnVtYmVyLnBhcnNlSW50KGNvdW50LCAxMCk7XG59O1xuXG4vKipcbiAqIEdldCBLZXJuZWwgYWRkcmVzcyBieSBrZXJuZWwgaWRcbiAqIFxuICogQHBhcmFtIHtudW1iZXJ9IGlkXG4gKiBAcGFyYW0ge09iamVjdH0gY29uZmlnIExpYnJhcnkgY29uZmlnIChwcm92aWRlZCBieSB0aGUgcHJveHkgYnV0IGNhbiBiZSBvdmVycmlkZGVuKVxuICogQHJldHVybnMge1Byb21pc2V9IEEgUHJvbWlzZSBvYmplY3QgcmVwcmVzZW50cyB0aGUge1N0cmluZ31cbiAqL1xuZXhwb3J0IGNvbnN0IGZldGNoQWRkcmVzc0J5SWQgPSBhc3luYyAoaWQsIGNvbmZpZyA9IHt9KSA9PiB7XG5cbiAgICBleHBlY3QuYWxsKHsgaWQgfSwge1xuICAgICAgICAnaWQnOiB7XG4gICAgICAgICAgICB0eXBlOiAnbnVtYmVyJ1xuICAgICAgICB9XG4gICAgfSk7XG5cbiAgICBleHBlY3QuYWxsKGNvbmZpZywge1xuICAgICAgICAnd2ViMyc6IHtcbiAgICAgICAgICAgIHR5cGU6ICdvYmplY3QnLFxuICAgICAgICAgICAgY29kZTogV0VCM19SRVFVSVJFRFxuICAgICAgICB9LFxuICAgICAgICAnY29udHJhY3RzLlBhbmRvcmFNYXJrZXQuYWJpJzoge1xuICAgICAgICAgICAgdHlwZTogJ29iamVjdCcsXG4gICAgICAgICAgICBjb2RlOiBDT05UUkFDVF9SRVFVSVJFRCxcbiAgICAgICAgICAgIGFyZ3M6IFsnUGFuZG9yYU1hcmtldCddXG4gICAgICAgIH0sXG4gICAgICAgICdhZGRyZXNzZXMuUGFuZG9yYU1hcmtldCc6IHtcbiAgICAgICAgICAgIHR5cGU6ICdhZGRyZXNzJyxcbiAgICAgICAgICAgIGNvZGU6IEFERFJFU1NfUkVRVUlSRUQsXG4gICAgICAgICAgICBhcmdzOiBbJ1BhbmRvcmFNYXJrZXQnXVxuICAgICAgICB9XG4gICAgfSk7XG5cbiAgICBjb25zdCBtYXIgPSBuZXcgY29uZmlnLndlYjMuZXRoLkNvbnRyYWN0KGNvbmZpZy5jb250cmFjdHMuUGFuZG9yYU1hcmtldC5hYmksIGNvbmZpZy5hZGRyZXNzZXMuUGFuZG9yYU1hcmtldCk7XG4gICAgY29uc3Qga2VybmVsQ29udHJhY3QgPSBhd2FpdCBtYXIubWV0aG9kc1xuICAgICAgICAua2VybmVscyhpZClcbiAgICAgICAgLmNhbGwoKTtcblxuICAgIHJldHVybiBrZXJuZWxDb250cmFjdDtcbn07XG5cbi8qKlxuICogR2V0IElQRlMgYWRkcmVzcyBmcm9tIEtlcm5lbCBjb250cmFjdCBieSB0aGUga2VybmVsIGFkZHJlc3NcbiAqIFxuICogQHBhcmFtIHtTdHJpbmd9IGFkZHJlc3NcbiAqIEBwYXJhbSB7T2JqZWN0fSBjb25maWcgTGlicmFyeSBjb25maWcgKHByb3ZpZGVkIGJ5IHRoZSBwcm94eSBidXQgY2FuIGJlIG92ZXJyaWRkZW4pXG4gKiBAcmV0dXJucyB7UHJvbWlzZX0gQSBQcm9taXNlIG9iamVjdCByZXByZXNlbnRzIHRoZSB7U3RyaW5nfVxuICovXG5leHBvcnQgY29uc3QgZmV0Y2hJcGZzQWRkcmVzcyA9IGFzeW5jIChhZGRyZXNzID0gJycsIGNvbmZpZyA9IHt9KSA9PiB7XG5cbiAgICBleHBlY3QuYWxsKHsgYWRkcmVzcyB9LCB7XG4gICAgICAgICdhZGRyZXNzJzoge1xuICAgICAgICAgICAgdHlwZTogJ2FkZHJlc3MnXG4gICAgICAgIH1cbiAgICB9KTtcblxuICAgIGV4cGVjdC5hbGwoY29uZmlnLCB7XG4gICAgICAgICd3ZWIzJzoge1xuICAgICAgICAgICAgdHlwZTogJ29iamVjdCcsXG4gICAgICAgICAgICBjb2RlOiBXRUIzX1JFUVVJUkVEXG4gICAgICAgIH0sXG4gICAgICAgICdjb250cmFjdHMuS2VybmVsLmFiaSc6IHtcbiAgICAgICAgICAgIHR5cGU6ICdvYmplY3QnLFxuICAgICAgICAgICAgY29kZTogQ09OVFJBQ1RfUkVRVUlSRUQsXG4gICAgICAgICAgICBhcmdzOiBbJ0tlcm5lbCddXG4gICAgICAgIH1cbiAgICB9KTtcblxuICAgIGNvbnN0IGtlciA9IG5ldyBjb25maWcud2ViMy5ldGguQ29udHJhY3QoY29uZmlnLmNvbnRyYWN0cy5LZXJuZWwuYWJpLCBhZGRyZXNzKTtcbiAgICBjb25zdCBpcGZzQWRkcmVzcyA9IGF3YWl0IGtlci5tZXRob2RzXG4gICAgICAgIC5pcGZzQWRkcmVzcygpXG4gICAgICAgIC5jYWxsKCk7XG5cbiAgICByZXR1cm4gY29uZmlnLndlYjMudXRpbHMuaGV4VG9Bc2NpaShpcGZzQWRkcmVzcyk7XG59O1xuXG4vKipcbiAqIEdldCBkYXRhIGRpbSBmcm9tIEtlcm5lbCBjb250cmFjdCBieSB0aGUga2VybmVsIGFkZHJlc3NcbiAqIFxuICogQHBhcmFtIHtTdHJpbmd9IGFkZHJlc3NcbiAqIEBwYXJhbSB7T2JqZWN0fSBjb25maWcgTGlicmFyeSBjb25maWcgKHByb3ZpZGVkIGJ5IHRoZSBwcm94eSBidXQgY2FuIGJlIG92ZXJyaWRkZW4pXG4gKiBAcmV0dXJucyB7UHJvbWlzZX0gQSBQcm9taXNlIG9iamVjdCByZXByZXNlbnRzIHRoZSB7bnVtYmVyfVxuICovXG5leHBvcnQgY29uc3QgZmV0Y2hEYXRhRGltID0gYXN5bmMgKGFkZHJlc3MgPSAnJywgY29uZmlnID0ge30pID0+IHtcblxuICAgIGV4cGVjdC5hbGwoeyBhZGRyZXNzIH0sIHtcbiAgICAgICAgJ2FkZHJlc3MnOiB7XG4gICAgICAgICAgICB0eXBlOiAnYWRkcmVzcydcbiAgICAgICAgfVxuICAgIH0pO1xuXG4gICAgZXhwZWN0LmFsbChjb25maWcsIHtcbiAgICAgICAgJ3dlYjMnOiB7XG4gICAgICAgICAgICB0eXBlOiAnb2JqZWN0JyxcbiAgICAgICAgICAgIGNvZGU6IFdFQjNfUkVRVUlSRURcbiAgICAgICAgfSxcbiAgICAgICAgJ2NvbnRyYWN0cy5LZXJuZWwuYWJpJzoge1xuICAgICAgICAgICAgdHlwZTogJ29iamVjdCcsXG4gICAgICAgICAgICBjb2RlOiBDT05UUkFDVF9SRVFVSVJFRCxcbiAgICAgICAgICAgIGFyZ3M6IFsnS2VybmVsJ11cbiAgICAgICAgfVxuICAgIH0pO1xuXG4gICAgY29uc3Qga2VyID0gbmV3IGNvbmZpZy53ZWIzLmV0aC5Db250cmFjdChjb25maWcuY29udHJhY3RzLktlcm5lbC5hYmksIGFkZHJlc3MpO1xuICAgIGNvbnN0IGRhdGFEaW0gPSBhd2FpdCBrZXIubWV0aG9kc1xuICAgICAgICAuZGF0YURpbSgpXG4gICAgICAgIC5jYWxsKCk7XG5cbiAgICByZXR1cm4gTnVtYmVyLnBhcnNlSW50KGRhdGFEaW0sIDEwKTtcbn07XG5cbi8qKlxuICogR2V0IGN1cnJlbnQgcHJpY2UgZnJvbSBLZXJuZWwgY29udHJhY3QgYnkgdGhlIGtlcm5lbCBhZGRyZXNzXG4gKiBcbiAqIEBwYXJhbSB7U3RyaW5nfSBhZGRyZXNzXG4gKiBAcGFyYW0ge09iamVjdH0gY29uZmlnIExpYnJhcnkgY29uZmlnIChwcm92aWRlZCBieSB0aGUgcHJveHkgYnV0IGNhbiBiZSBvdmVycmlkZGVuKVxuICogQHJldHVybnMge1Byb21pc2V9IEEgUHJvbWlzZSBvYmplY3QgcmVwcmVzZW50cyB0aGUge251bWJlcn1cbiAqL1xuZXhwb3J0IGNvbnN0IGZldGNoQ3VycmVudFByaWNlID0gYXN5bmMgKGFkZHJlc3MgPSAnJywgY29uZmlnID0ge30pID0+IHtcblxuICAgIGV4cGVjdC5hbGwoeyBhZGRyZXNzIH0sIHtcbiAgICAgICAgJ2FkZHJlc3MnOiB7XG4gICAgICAgICAgICB0eXBlOiAnYWRkcmVzcydcbiAgICAgICAgfVxuICAgIH0pO1xuXG4gICAgZXhwZWN0LmFsbChjb25maWcsIHtcbiAgICAgICAgJ3dlYjMnOiB7XG4gICAgICAgICAgICB0eXBlOiAnb2JqZWN0JyxcbiAgICAgICAgICAgIGNvZGU6IFdFQjNfUkVRVUlSRURcbiAgICAgICAgfSxcbiAgICAgICAgJ2NvbnRyYWN0cy5LZXJuZWwuYWJpJzoge1xuICAgICAgICAgICAgdHlwZTogJ29iamVjdCcsXG4gICAgICAgICAgICBjb2RlOiBDT05UUkFDVF9SRVFVSVJFRCxcbiAgICAgICAgICAgIGFyZ3M6IFsnS2VybmVsJ11cbiAgICAgICAgfVxuICAgIH0pO1xuXG4gICAgY29uc3Qga2VyID0gbmV3IGNvbmZpZy53ZWIzLmV0aC5Db250cmFjdChjb25maWcuY29udHJhY3RzLktlcm5lbC5hYmksIGFkZHJlc3MpO1xuICAgIGNvbnN0IGN1cnJlbnRQcmljZSA9IGF3YWl0IGtlci5tZXRob2RzXG4gICAgICAgIC5jdXJyZW50UHJpY2UoKVxuICAgICAgICAuY2FsbCgpO1xuXG4gICAgcmV0dXJuIE51bWJlci5wYXJzZUludChjdXJyZW50UHJpY2UsIDEwKTtcbn07XG5cbi8qKlxuICogR2V0IGNvbXBsZXhpdHkgZnJvbSBLZXJuZWwgY29udHJhY3QgYnkgdGhlIGtlcm5lbCBhZGRyZXNzXG4gKiBcbiAqIEBwYXJhbSB7U3RyaW5nfSBhZGRyZXNzXG4gKiBAcGFyYW0ge09iamVjdH0gY29uZmlnIExpYnJhcnkgY29uZmlnIChwcm92aWRlZCBieSB0aGUgcHJveHkgYnV0IGNhbiBiZSBvdmVycmlkZGVuKVxuICogQHJldHVybnMge1Byb21pc2V9IEEgUHJvbWlzZSBvYmplY3QgcmVwcmVzZW50cyB0aGUge251bWJlcn1cbiAqL1xuZXhwb3J0IGNvbnN0IGZldGNoQ29tcGxleGl0eSA9IGFzeW5jIChhZGRyZXNzID0gJycsIGNvbmZpZyA9IHt9KSA9PiB7XG5cbiAgICBleHBlY3QuYWxsKHsgYWRkcmVzcyB9LCB7XG4gICAgICAgICdhZGRyZXNzJzoge1xuICAgICAgICAgICAgdHlwZTogJ2FkZHJlc3MnXG4gICAgICAgIH1cbiAgICB9KTtcblxuICAgIGV4cGVjdC5hbGwoY29uZmlnLCB7XG4gICAgICAgICd3ZWIzJzoge1xuICAgICAgICAgICAgdHlwZTogJ29iamVjdCcsXG4gICAgICAgICAgICBjb2RlOiBXRUIzX1JFUVVJUkVEXG4gICAgICAgIH0sXG4gICAgICAgICdjb250cmFjdHMuS2VybmVsLmFiaSc6IHtcbiAgICAgICAgICAgIHR5cGU6ICdvYmplY3QnLFxuICAgICAgICAgICAgY29kZTogQ09OVFJBQ1RfUkVRVUlSRUQsXG4gICAgICAgICAgICBhcmdzOiBbJ0tlcm5lbCddXG4gICAgICAgIH1cbiAgICB9KTtcblxuICAgIGNvbnN0IGtlciA9IG5ldyBjb25maWcud2ViMy5ldGguQ29udHJhY3QoY29uZmlnLmNvbnRyYWN0cy5LZXJuZWwuYWJpLCBhZGRyZXNzKTtcbiAgICBjb25zdCBjb21wbGV4aXR5ID0gYXdhaXQga2VyLm1ldGhvZHNcbiAgICAgICAgLmNvbXBsZXhpdHkoKVxuICAgICAgICAuY2FsbCgpO1xuXG4gICAgcmV0dXJuIE51bWJlci5wYXJzZUludChjb21wbGV4aXR5LCAxMCk7XG59O1xuXG4vKipcbiAqIEdldCBkZXNjcmlwdGlvbiBmcm9tIEtlcm5lbCBjb250cmFjdCBieSB0aGUga2VybmVsIGFkZHJlc3NcbiAqIFxuICogQHBhcmFtIHtTdHJpbmd9IGFkZHJlc3NcbiAqIEBwYXJhbSB7T2JqZWN0fSBjb25maWcgTGlicmFyeSBjb25maWcgKHByb3ZpZGVkIGJ5IHRoZSBwcm94eSBidXQgY2FuIGJlIG92ZXJyaWRkZW4pXG4gKiBAcmV0dXJucyB7UHJvbWlzZX0gQSBQcm9taXNlIG9iamVjdCByZXByZXNlbnRzIHRoZSB7bnVtYmVyfVxuICovXG5leHBvcnQgY29uc3QgZmV0Y2hEZXNjcmlwdGlvbiA9IGFzeW5jIChhZGRyZXNzID0gJycsIGNvbmZpZyA9IHt9KSA9PiB7XG5cbiAgICBleHBlY3QuYWxsKHsgYWRkcmVzcyB9LCB7XG4gICAgICAgICdhZGRyZXNzJzoge1xuICAgICAgICAgICAgdHlwZTogJ2FkZHJlc3MnXG4gICAgICAgIH1cbiAgICB9KTtcblxuICAgIGV4cGVjdC5hbGwoY29uZmlnLCB7XG4gICAgICAgICd3ZWIzJzoge1xuICAgICAgICAgICAgdHlwZTogJ29iamVjdCcsXG4gICAgICAgICAgICBjb2RlOiBXRUIzX1JFUVVJUkVEXG4gICAgICAgIH0sXG4gICAgICAgICdjb250cmFjdHMuS2VybmVsLmFiaSc6IHtcbiAgICAgICAgICAgIHR5cGU6ICdvYmplY3QnLFxuICAgICAgICAgICAgY29kZTogQ09OVFJBQ1RfUkVRVUlSRUQsXG4gICAgICAgICAgICBhcmdzOiBbJ0tlcm5lbCddXG4gICAgICAgIH1cbiAgICB9KTtcblxuICAgIGNvbnN0IGtlciA9IG5ldyBjb25maWcud2ViMy5ldGguQ29udHJhY3QoY29uZmlnLmNvbnRyYWN0cy5LZXJuZWwuYWJpLCBhZGRyZXNzKTtcbiAgICBjb25zdCBkZXNjcmlwdGlvbiA9IGF3YWl0IGtlci5tZXRob2RzXG4gICAgICAgIC5kZXNjcmlwdGlvbigpXG4gICAgICAgIC5jYWxsKCk7XG5cbiAgICByZXR1cm4gY29uZmlnLndlYjMudXRpbHMuaGV4VG9VdGY4KGRlc2NyaXB0aW9uKTtcbn07XG5cbi8qKlxuICogR2V0IG1ldGFkYXRhIGZyb20gS2VybmVsIGNvbnRyYWN0IGJ5IHRoZSBrZXJuZWwgYWRkcmVzc1xuICogXG4gKiBAcGFyYW0ge1N0cmluZ30gYWRkcmVzc1xuICogQHBhcmFtIHtPYmplY3R9IGNvbmZpZyBMaWJyYXJ5IGNvbmZpZyAocHJvdmlkZWQgYnkgdGhlIHByb3h5IGJ1dCBjYW4gYmUgb3ZlcnJpZGRlbilcbiAqIEByZXR1cm5zIHtQcm9taXNlfSBBIFByb21pc2Ugb2JqZWN0IHJlcHJlc2VudHMgdGhlIHtudW1iZXJ9XG4gKi9cbmV4cG9ydCBjb25zdCBmZXRjaE1ldGFkYXRhID0gYXN5bmMgKGFkZHJlc3MgPSAnJywgY29uZmlnID0ge30pID0+IHtcblxuICAgIGV4cGVjdC5hbGwoeyBhZGRyZXNzIH0sIHtcbiAgICAgICAgJ2FkZHJlc3MnOiB7XG4gICAgICAgICAgICB0eXBlOiAnYWRkcmVzcydcbiAgICAgICAgfVxuICAgIH0pO1xuXG4gICAgZXhwZWN0LmFsbChjb25maWcsIHtcbiAgICAgICAgJ3dlYjMnOiB7XG4gICAgICAgICAgICB0eXBlOiAnb2JqZWN0JyxcbiAgICAgICAgICAgIGNvZGU6IFdFQjNfUkVRVUlSRURcbiAgICAgICAgfSxcbiAgICAgICAgJ2NvbnRyYWN0cy5LZXJuZWwuYWJpJzoge1xuICAgICAgICAgICAgdHlwZTogJ29iamVjdCcsXG4gICAgICAgICAgICBjb2RlOiBDT05UUkFDVF9SRVFVSVJFRCxcbiAgICAgICAgICAgIGFyZ3M6IFsnS2VybmVsJ11cbiAgICAgICAgfVxuICAgIH0pO1xuXG4gICAgY29uc3Qga2VyID0gbmV3IGNvbmZpZy53ZWIzLmV0aC5Db250cmFjdChjb25maWcuY29udHJhY3RzLktlcm5lbC5hYmksIGFkZHJlc3MpO1xuICAgIGNvbnN0IG1ldGFkYXRhID0gYXdhaXQga2VyLm1ldGhvZHNcbiAgICAgICAgLm1ldGFkYXRhKClcbiAgICAgICAgLmNhbGwoKTtcblxuICAgIHJldHVybiBjb25maWcud2ViMy51dGlscy5oZXhUb1V0ZjgobWV0YWRhdGEpO1xufTtcblxuLyoqXG4gKiBHZXQgS2VybmVsIGJ5IHRoZSBrZXJuZWwgYWRkcmVzc1xuICogXG4gKiBAcGFyYW0ge1N0cmluZ30gYWRkcmVzc1xuICogQHBhcmFtIHtPYmplY3R9IGNvbmZpZyBMaWJyYXJ5IGNvbmZpZyAocHJvdmlkZWQgYnkgdGhlIHByb3h5IGJ1dCBjYW4gYmUgb3ZlcnJpZGRlbilcbiAqIEByZXR1cm5zIHtQcm9taXNlfSBQcm9taXNlIG9iamVjdCByZXByZXNlbnRzIHRoZSB7T2JqZWN0W119XG4gKi9cbmV4cG9ydCBjb25zdCBmZXRjaEtlcm5lbCA9IGFzeW5jIChhZGRyZXNzID0gJycsIGNvbmZpZyA9IHt9KSA9PiB7XG5cbiAgICBjb25zdCBbXG4gICAgICAgIGlwZnNBZGRyZXNzLFxuICAgICAgICBkYXRhRGltLFxuICAgICAgICBjdXJyZW50UHJpY2UsXG4gICAgICAgIGNvbXBsZXhpdHksXG4gICAgICAgIG1ldGFkYXRhLFxuICAgICAgICBkZXNjcmlwdGlvblxuICAgIF0gPSBhd2FpdCBQcm9taXNlLmFsbChbXG4gICAgICAgIGZldGNoSXBmc0FkZHJlc3MoYWRkcmVzcywgY29uZmlnKSxcbiAgICAgICAgZmV0Y2hEYXRhRGltKGFkZHJlc3MsIGNvbmZpZyksXG4gICAgICAgIGZldGNoQ3VycmVudFByaWNlKGFkZHJlc3MsIGNvbmZpZyksXG4gICAgICAgIGZldGNoQ29tcGxleGl0eShhZGRyZXNzLCBjb25maWcpLFxuICAgICAgICBmZXRjaE1ldGFkYXRhKGFkZHJlc3MsIGNvbmZpZyksXG4gICAgICAgIGZldGNoRGVzY3JpcHRpb24oYWRkcmVzcywgY29uZmlnKVxuICAgIF0pO1xuXG4gICAgcmV0dXJuIHtcbiAgICAgICAgYWRkcmVzcyxcbiAgICAgICAgaXBmc0FkZHJlc3MsXG4gICAgICAgIGRhdGFEaW0sXG4gICAgICAgIGN1cnJlbnRQcmljZSxcbiAgICAgICAgY29tcGxleGl0eSxcbiAgICAgICAgbWV0YWRhdGEsXG4gICAgICAgIGRlc2NyaXB0aW9uXG4gICAgfTtcbn07XG5cbi8qKlxuICogR2V0IGtlcm5lbCBieSBpZFxuICogXG4gKiBAcGFyYW0ge2ludGVnZXJ9IGlkIFxuICogQHBhcmFtIHtPYmplY3R9IGNvbmZpZyBMaWJyYXJ5IGNvbmZpZyAocHJvdmlkZWQgYnkgdGhlIHByb3h5IGJ1dCBjYW4gYmUgb3ZlcnJpZGRlbilcbiAqIEByZXR1cm5zIHtQcm9taXNlfSBBIFByb21pc2Ugb2JqZWN0IHJlcHJlc2VudHMgdGhlIHtPYmplY3R9XG4gKi9cbmV4cG9ydCBjb25zdCBmZXRjaEtlcm5lbEJ5SWQgPSBhc3luYyAoaWQsIGNvbmZpZyA9IHt9KSA9PiB7XG4gICAgXG4gICAgY29uc3QgYWRkcmVzcyA9IGF3YWl0IGZldGNoQWRkcmVzc0J5SWQoaWQsIGNvbmZpZyk7XG4gICAgY29uc3Qga2VybmVsID0gYXdhaXQgZmV0Y2hLZXJuZWwoYWRkcmVzcywgY29uZmlnKTtcblxuICAgIHJldHVybiBrZXJuZWw7XG59O1xuXG4vKipcbiAqIEdldCBhbGwga2VybmVsc1xuICogXG4gKiBAcGFyYW0ge09iamVjdH0gY29uZmlnIExpYnJhcnkgY29uZmlnIChwcm92aWRlZCBieSB0aGUgcHJveHkgYnV0IGNhbiBiZSBvdmVycmlkZGVuKVxuICogQHJldHVybnMge1Byb21pc2V9IFByb21pc2Ugb2JqZWN0IHJlcHJlc2VudHMgdGhlIHtPYmplY3RbXX1cbiAqL1xuZXhwb3J0IGNvbnN0IGZldGNoQWxsID0gYXN5bmMgKGNvbmZpZyA9IHt9KSA9PiB7XG5cbiAgICBsZXQgcmVjb3JkcyA9IFtdO1xuICAgIGxldCBlcnJvciA9IFtdO1xuXG4gICAgdHJ5IHtcblxuICAgICAgICBjb25zdCBjb3VudCA9IGF3YWl0IGZldGNoQ291bnQoY29uZmlnKTtcblxuICAgICAgICBmb3IgKGxldCBpPTA7IGkgPCBjb3VudDsgaSsrKSB7XG4gICAgICAgICAgICBcbiAgICAgICAgICAgIHRyeSB7XG5cbiAgICAgICAgICAgICAgICBjb25zdCBrZXJuZWwgPSBhd2FpdCBmZXRjaEtlcm5lbEJ5SWQoaSwgY29uZmlnKTtcblxuICAgICAgICAgICAgICAgIHJlY29yZHMucHVzaCh7XG4gICAgICAgICAgICAgICAgICAgIGlkOiBpLFxuICAgICAgICAgICAgICAgICAgICAuLi5rZXJuZWxcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH0gY2F0Y2goZXJyKSB7XG4gICAgICAgICAgICAgICAgZXJyb3IucHVzaCh7XG4gICAgICAgICAgICAgICAgICAgIGlkOiBpLFxuICAgICAgICAgICAgICAgICAgICBtZXNzYWdlOiBlcnIubWVzc2FnZVxuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfSAgICAgICAgXG4gICAgICAgIH1cbiAgICB9IGNhdGNoKGVycikge1xuICAgICAgICBlcnJvci5wdXNoKHtcbiAgICAgICAgICAgIGVycm9yOiBlcnIubWVzc2FnZVxuICAgICAgICB9KTtcbiAgICB9ICAgXG5cbiAgICByZXR1cm4ge1xuICAgICAgICByZWNvcmRzLFxuICAgICAgICBlcnJvclxuICAgIH07XG59O1xuXG4vKipcbiAqIERlcGxveSBLZXJuZWwgY29udHJhY3QgdG8gdGhlIG5ldHdvcmtcbiAqIFxuICogQHBhcmFtIHtTdHJpbmd9IGtlcm5lbElwZnNIYXNoIFxuICogQHBhcmFtIHtPYmplY3R9IG9wdGlvbnMgeyBkaW1lbnNpb24sIGNvbXBsZXhpdHksIHByaWNlLCBtZXRhZGF0YSwgZGVzY3JpcHRpb24gfSBcbiAqIEBwYXJhbSB7U3RyaW5nfSBwdWJsaXNoZXIgUHVibGlzaGVyIGFkZHJlc3NcbiAqIEBwYXJhbSB7T2JqZWN0fSBjb25maWcgTGlicmFyeSBjb25maWcgKHByb3ZpZGVkIGJ5IHRoZSBwcm94eSBidXQgY2FuIGJlIG92ZXJyaWRkZW4pXG4gKiBAcmV0dXJucyB7UHJvbWlzZX0gUHJvbWlzZSBvYmplY3QgcmVzb2x2ZWQgdG8gY29udHJhY3QgYWRkcmVzc1xuICovXG5leHBvcnQgY29uc3QgZGVwbG95ID0gYXN5bmMgKGtlcm5lbElwZnNIYXNoLCB7IGRpbWVuc2lvbiwgY29tcGxleGl0eSwgcHJpY2UsIG1ldGFkYXRhLCBkZXNjcmlwdGlvbiB9LCBwdWJsaXNoZXIsIGNvbmZpZyA9IHt9KSA9PiB7XG5cbiAgICBleHBlY3QuYWxsKHsga2VybmVsSXBmc0hhc2gsIHB1Ymxpc2hlciwgZGltZW5zaW9uLCBjb21wbGV4aXR5LCBwcmljZSwgbWV0YWRhdGEsIGRlc2NyaXB0aW9uIH0sIHtcbiAgICAgICAgJ2tlcm5lbElwZnNIYXNoJzoge1xuICAgICAgICAgICAgdHlwZTogJ3N0cmluZydcbiAgICAgICAgfSxcbiAgICAgICAgJ3B1Ymxpc2hlcic6IHtcbiAgICAgICAgICAgIHR5cGU6ICdhZGRyZXNzJ1xuICAgICAgICB9LFxuICAgICAgICAnZGltZW5zaW9uJzoge1xuICAgICAgICAgICAgdHlwZTogJ251bWJlcidcbiAgICAgICAgfSxcbiAgICAgICAgJ2NvbXBsZXhpdHknOiB7XG4gICAgICAgICAgICB0eXBlOiAnbnVtYmVyJ1xuICAgICAgICB9LFxuICAgICAgICAncHJpY2UnOiB7XG4gICAgICAgICAgICB0eXBlOiAnbnVtYmVyJ1xuICAgICAgICB9LFxuICAgICAgICAnbWV0YWRhdGEnOiB7XG4gICAgICAgICAgICB0eXBlOiAnc3RyaW5nJ1xuICAgICAgICB9LFxuICAgICAgICAnZGVzY3JpcHRpb24nOiB7XG4gICAgICAgICAgICB0eXBlOiAnc3RyaW5nJ1xuICAgICAgICB9XG4gICAgfSk7XG5cbiAgICBleHBlY3QuYWxsKGNvbmZpZywge1xuICAgICAgICAnd2ViMyc6IHtcbiAgICAgICAgICAgIHR5cGU6ICdvYmplY3QnLFxuICAgICAgICAgICAgY29kZTogV0VCM19SRVFVSVJFRFxuICAgICAgICB9LFxuICAgICAgICAnY29udHJhY3RzLktlcm5lbC5hYmknOiB7XG4gICAgICAgICAgICB0eXBlOiAnb2JqZWN0JyxcbiAgICAgICAgICAgIGNvZGU6IENPTlRSQUNUX1JFUVVJUkVELFxuICAgICAgICAgICAgYXJnczogWydLZXJuZWwnXVxuICAgICAgICB9XG4gICAgfSk7XG5cbiAgICBjb25zdCBhcmdzID0gW1xuICAgICAgICBjb25maWcud2ViMy51dGlscy51dGY4VG9IZXgoa2VybmVsSXBmc0hhc2gpLCBcbiAgICAgICAgZGltZW5zaW9uLCBcbiAgICAgICAgY29tcGxleGl0eSwgXG4gICAgICAgIGNvbmZpZy53ZWIzLnV0aWxzLnRvSGV4KHByaWNlKSwgXG4gICAgICAgIGNvbmZpZy53ZWIzLnV0aWxzLnV0ZjhUb0hleChtZXRhZGF0YSksXG4gICAgICAgIGNvbmZpZy53ZWIzLnV0aWxzLnV0ZjhUb0hleChkZXNjcmlwdGlvbilcbiAgICBdO1xuICAgICAgICBcbiAgICAvLyBFc3RpbWF0ZSByZXF1aXJlZCBhbW91bnQgb2YgZ2FzXG4gICAgY29uc3QgZ2FzID0gYXdhaXQgd2ViM0hlbHBlcnMuZXN0aW1hdGVHYXMoY29uZmlnLmNvbnRyYWN0cy5LZXJuZWwuYnl0ZWNvZGUsIGFyZ3MsIGNvbmZpZyk7XG5cbiAgICAvLyBDcmVhdGUgYW5kIGRlcGxveSBrZXJuZWwgY29udHJhY3RcbiAgICBjb25zdCBrZXJuZWxDb250cmFjdEFkZHJlc3MgPSBhd2FpdCB3ZWIzSGVscGVycy5kZXBsb3lDb250cmFjdChjb25maWcuY29udHJhY3RzLktlcm5lbCwge1xuICAgICAgICBhcmdzLFxuICAgICAgICBmcm9tOiBwdWJsaXNoZXIsXG4gICAgICAgIGdhczogTnVtYmVyLnBhcnNlSW50KGdhcyAqIDEuNSwgMTApXG4gICAgfSwgY29uZmlnKTtcblxuICAgIHJldHVybiBrZXJuZWxDb250cmFjdEFkZHJlc3M7XG59O1xuXG4vKipcbiAqIEFkZCBrZXJuZWwgdG8gbWFya2V0XG4gKiBcbiAqIEBwYXJhbSB7U3RyaW5nfSBrZXJuZWxDb250cmFjdEFkZHJlc3MgXG4gKiBAcGFyYW0ge1N0cmluZ30gcHVibGlzaGVyQWRkcmVzcyBcbiAqIEBwYXJhbSB7T2JqZWN0fSBjb25maWcgTGlicmFyeSBjb25maWcgKHByb3ZpZGVkIGJ5IHRoZSBwcm94eSBidXQgY2FuIGJlIG92ZXJyaWRkZW4pXG4gKiBAcmV0dXJucyB7UHJvbWlzZX0gUHJvbWlzZSBvYmplY3QgcmVzb2x2ZWQgdG8ge1N0cmluZ30gY29udHJhY3RBZGRyZXNzIC8vIGNhbiBiZSBudWxsIGlmIHVzZWQgZ2FuYWNoZS1jbGkgZW52aXJvbm1lbnRcbiAqL1xuZXhwb3J0IGNvbnN0IGFkZFRvTWFya2V0ID0gKGtlcm5lbENvbnRyYWN0QWRkcmVzcywgcHVibGlzaGVyQWRkcmVzcywgY29uZmlnID0ge30pID0+IG5ldyBQcm9taXNlKGFzeW5jIChyZXNvbHZlLCByZWplY3QpID0+IHtcblxuICAgIGV4cGVjdC5hbGwoeyBrZXJuZWxDb250cmFjdEFkZHJlc3MsIHB1Ymxpc2hlckFkZHJlc3MgfSwge1xuICAgICAgICAna2VybmVsQ29udHJhY3RBZGRyZXNzJzoge1xuICAgICAgICAgICAgdHlwZTogJ2FkZHJlc3MnXG4gICAgICAgIH0sXG4gICAgICAgICdwdWJsaXNoZXJBZGRyZXNzJzoge1xuICAgICAgICAgICAgdHlwZTogJ2FkZHJlc3MnXG4gICAgICAgIH1cbiAgICB9KTtcblxuICAgIGV4cGVjdC5hbGwoY29uZmlnLCB7XG4gICAgICAgICd3ZWIzJzoge1xuICAgICAgICAgICAgdHlwZTogJ29iamVjdCcsXG4gICAgICAgICAgICBjb2RlOiBXRUIzX1JFUVVJUkVEXG4gICAgICAgIH0sXG4gICAgICAgICdjb250cmFjdHMuUGFuZG9yYU1hcmtldC5hYmknOiB7XG4gICAgICAgICAgICB0eXBlOiAnb2JqZWN0JyxcbiAgICAgICAgICAgIGNvZGU6IENPTlRSQUNUX1JFUVVJUkVELFxuICAgICAgICAgICAgYXJnczogWydQYW5kb3JhTWFya2V0J11cbiAgICAgICAgfSxcbiAgICAgICAgJ2FkZHJlc3Nlcy5QYW5kb3JhTWFya2V0Jzoge1xuICAgICAgICAgICAgdHlwZTogJ2FkZHJlc3MnLFxuICAgICAgICAgICAgY29kZTogQUREUkVTU19SRVFVSVJFRCxcbiAgICAgICAgICAgIGFyZ3M6IFsnS2VybmVsJ11cbiAgICAgICAgfSxcbiAgICAgICAgJ3dlYjMuY3VycmVudFByb3ZpZGVyLmlzTWV0YU1hc2snOiB7XG4gICAgICAgICAgICB0eXBlOiAnYm9vbGVhbicsXG4gICAgICAgICAgICBjb2RlOiBXRUIzX01FVEFNQVNLX1JFUVVJUkVEXG4gICAgICAgIH1cbiAgICB9KTtcblxuICAgIGNvbnN0IG1hcmtldCA9IG5ldyBjb25maWcud2ViMy5ldGguQ29udHJhY3QoY29uZmlnLmNvbnRyYWN0cy5QYW5kb3JhTWFya2V0LmFiaSwgY29uZmlnLmFkZHJlc3Nlcy5QYW5kb3JhTWFya2V0KTtcbiAgICBjb25zdCBnYXNQcmljZSA9IGF3YWl0IGNvbmZpZy53ZWIzLmV0aC5nZXRHYXNQcmljZSgpO1xuICAgIG1hcmtldC5tZXRob2RzXG4gICAgICAgIC5hZGRLZXJuZWwoa2VybmVsQ29udHJhY3RBZGRyZXNzKVxuICAgICAgICAuc2VuZCh7XG4gICAgICAgICAgICBmcm9tOiBwdWJsaXNoZXJBZGRyZXNzLFxuICAgICAgICAgICAgZ2FzUHJpY2VcbiAgICAgICAgfSlcbiAgICAgICAgLm9uKCdlcnJvcicsIHJlamVjdClcbiAgICAgICAgLm9uKCdyZWNlaXB0JywgcmVjZWlwdCA9PiB7XG5cbiAgICAgICAgICAgIGlmIChOdW1iZXIocmVjZWlwdC5zdGF0dXMpID09PSAwKSB7XG5cbiAgICAgICAgICAgICAgICByZXR1cm4gcmVqZWN0KHBqc0Vycm9yKFRSQU5TQUNUSU9OX1VOU1VDQ0VTU0ZVTCkpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICByZXNvbHZlKHJlY2VpcHQuY29udHJhY3RBZGRyZXNzIHx8IHJlY2VpcHQuZXZlbnRzLktlcm5lbEFkZGVkLnJldHVyblZhbHVlcy5rZXJuZWwpO1xuICAgICAgICB9KTtcbiAgICAvLyBAbm90ZSBJbiBjYXNlIG9mIGdhbmFjaGUtY2xpIGJsb2NrY2hhaW4gXCJjb250cmFjdEFkZHJlc3NcIiBhbHdheXMgd2lsbCBiZSBlcXVhbCB0byBudWxsXG59KTtcblxuLyoqXG4gKiBSZW1vdmUga2VybmVsIGZyb20gUGFuZG9yYU1hcmtldFxuICogXG4gKiBAcGFyYW0ge1N0cmluZ30ga2VybmVsQWRkcmVzc1xuICogQHBhcmFtIHtTdHJpbmd9IHB1Ymxpc2hlckFkZHJlc3MgXG4gKiBAcGFyYW0ge09iamVjdH0gY29uZmlnIExpYnJhcnkgY29uZmlnIChwcm92aWRlZCBieSB0aGUgcHJveHkgYnV0IGNhbiBiZSBvdmVycmlkZGVuKSBcbiAqIEByZXR1cm5zIHtQcm9taXNlfSBQcm9taXNlIG9iamVjdCByZXNvbHZlZCB0byB7U3RyaW5nfSBjb250cmFjdEFkZHJlc3NcbiAqL1xuZXhwb3J0IGNvbnN0IHJlbW92ZUtlcm5lbCA9IChrZXJuZWxBZGRyZXNzLCBwdWJsaXNoZXJBZGRyZXNzLCBjb25maWcgPSB7fSkgPT4gbmV3IFByb21pc2UoYXN5bmMgKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuXG4gICAgZXhwZWN0LmFsbCh7IGtlcm5lbEFkZHJlc3MsIHB1Ymxpc2hlckFkZHJlc3MgfSwge1xuICAgICAgICAna2VybmVsQWRkcmVzcyc6IHtcbiAgICAgICAgICAgIHR5cGU6ICdhZGRyZXNzJ1xuICAgICAgICB9LFxuICAgICAgICAncHVibGlzaGVyQWRkcmVzcyc6IHtcbiAgICAgICAgICAgIHR5cGU6ICdhZGRyZXNzJ1xuICAgICAgICB9XG4gICAgfSk7XG5cbiAgICBleHBlY3QuYWxsKGNvbmZpZywge1xuICAgICAgICAnd2ViMyc6IHtcbiAgICAgICAgICAgIHR5cGU6ICdvYmplY3QnLFxuICAgICAgICAgICAgY29kZTogV0VCM19SRVFVSVJFRFxuICAgICAgICB9LFxuICAgICAgICAnY29udHJhY3RzLlBhbmRvcmFNYXJrZXQuYWJpJzoge1xuICAgICAgICAgICAgdHlwZTogJ29iamVjdCcsXG4gICAgICAgICAgICBjb2RlOiBDT05UUkFDVF9SRVFVSVJFRCxcbiAgICAgICAgICAgIGFyZ3M6IFsnUGFuZG9yYU1hcmtldCddXG4gICAgICAgIH0sXG4gICAgICAgICdhZGRyZXNzZXMuUGFuZG9yYU1hcmtldCc6IHtcbiAgICAgICAgICAgIHR5cGU6ICdhZGRyZXNzJyxcbiAgICAgICAgICAgIGNvZGU6IEFERFJFU1NfUkVRVUlSRUQsXG4gICAgICAgICAgICBhcmdzOiBbJ0tlcm5lbCddXG4gICAgICAgIH1cbiAgICB9KTtcblxuICAgIGNvbnN0IG1hcmtldCA9IG5ldyBjb25maWcud2ViMy5ldGguQ29udHJhY3QoY29uZmlnLmNvbnRyYWN0cy5QYW5kb3JhTWFya2V0LmFiaSwgY29uZmlnLmFkZHJlc3Nlcy5QYW5kb3JhTWFya2V0KTtcbiAgICBjb25zdCBnYXNQcmljZSA9IGF3YWl0IGNvbmZpZy53ZWIzLmV0aC5nZXRHYXNQcmljZSgpO1xuICAgIG1hcmtldC5tZXRob2RzXG4gICAgICAgIC5yZW1vdmVLZXJuZWwoa2VybmVsQWRkcmVzcylcbiAgICAgICAgLnNlbmQoe1xuICAgICAgICAgICAgZnJvbTogcHVibGlzaGVyQWRkcmVzcyxcbiAgICAgICAgICAgIGdhc1ByaWNlXG4gICAgICAgIH0pXG4gICAgICAgIC5vbignZXJyb3InLCByZWplY3QpXG4gICAgICAgIC5vbigncmVjZWlwdCcsIHJlY2VpcHQgPT4ge1xuXG4gICAgICAgICAgICBpZiAoTnVtYmVyKHJlY2VpcHQuc3RhdHVzKSA9PT0gMCkge1xuXG4gICAgICAgICAgICAgICAgcmV0dXJuIHJlamVjdChwanNFcnJvcihUUkFOU0FDVElPTl9VTlNVQ0NFU1NGVUwpKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgcmVzb2x2ZShyZWNlaXB0LmNvbnRyYWN0QWRkcmVzcyk7XG4gICAgICAgIH0pO1xufSk7XG5cbi8qKlxuICogSGFuZGxlIGV2ZW50IEtlcm5lbEFkZGVkXG4gKiBcbiAqIEBwYXJhbSB7T2JqZWN0fSBvcHRpb25zIEV2ZW50IGhhbmRsZXIgb3B0aW9uc1xuICogQHBhcmFtIHtPYmplY3R9IGNvbmZpZyBMaWJyYXJ5IGNvbmZpZyAocHJvdmlkZWQgYnkgdGhlIHByb3h5IGJ1dCBjYW4gYmUgb3ZlcnJpZGRlbilcbiAqIEByZXR1cm5zIHtQcm9taXNlPHtPYmplY3R9Pn0gUFByb21pc2Ugb2JqZWN0IHJlc29sdmVkIHRvIHRoZSBvYmplY3Qgd2l0aCBjaGFpbmVkIGNhbGxiYWNrcyAjZGF0YSBhbmQgI2Vycm9yXG4gKi9cbmV4cG9ydCBjb25zdCBldmVudEtlcm5lbEFkZGVkID0gYXN5bmMgKG9wdGlvbnMgPSB7fSwgY29uZmlnID0ge30pID0+IHtcblxuICAgIGV4cGVjdC5hbGwoeyBvcHRpb25zIH0sIHtcbiAgICAgICAgJ29wdGlvbnMnOiB7XG4gICAgICAgICAgICB0eXBlOiAnb2JqZWN0J1xuICAgICAgICB9XG4gICAgfSk7XG5cbiAgICBleHBlY3QuYWxsKGNvbmZpZywge1xuICAgICAgICAnd2ViMyc6IHtcbiAgICAgICAgICAgIHR5cGU6ICdvYmplY3QnLFxuICAgICAgICAgICAgY29kZTogV0VCM19SRVFVSVJFRFxuICAgICAgICB9LFxuICAgICAgICAnY29udHJhY3RzLlBhbmRvcmFNYXJrZXQuYWJpJzoge1xuICAgICAgICAgICAgdHlwZTogJ29iamVjdCcsXG4gICAgICAgICAgICBjb2RlOiBDT05UUkFDVF9SRVFVSVJFRCxcbiAgICAgICAgICAgIGFyZ3M6IFsnUGFuZG9yYU1hcmtldCddXG4gICAgICAgIH0sXG4gICAgICAgICdhZGRyZXNzZXMuUGFuZG9yYU1hcmtldCc6IHtcbiAgICAgICAgICAgIHR5cGU6ICdhZGRyZXNzJyxcbiAgICAgICAgICAgIGNvZGU6IEFERFJFU1NfUkVRVUlSRUQsXG4gICAgICAgICAgICBhcmdzOiBbJ0tlcm5lbCddXG4gICAgICAgIH1cbiAgICB9KTtcblxuICAgIGNvbnN0IGNhbGxiYWNrcyA9IHtcbiAgICAgICAgb25EYXRhOiAoKSA9PiB7fSxcbiAgICAgICAgb25FcnJvcjogKCkgPT4ge31cbiAgICB9O1xuXG4gICAgY29uc3QgY2hhaW4gPSB7XG4gICAgICAgIGRhdGE6IChjYiA9ICgpID0+IHt9KSA9PiB7XG4gICAgICAgICAgICBjYWxsYmFja3Mub25EYXRhID0gY2I7XG4gICAgICAgICAgICByZXR1cm4gY2hhaW47XG4gICAgICAgIH0sXG4gICAgICAgIGVycm9yOiAoY2IgPSAoKSA9PiB7fSkgPT4ge1xuICAgICAgICAgICAgY2FsbGJhY2tzLm9uRXJyb3IgPSBjYjtcbiAgICAgICAgICAgIHJldHVybiBjaGFpbjtcbiAgICAgICAgfSxcbiAgICAgICAgc3Vic2NyaWJlZDogKGNiID0gKCkgPT4ge30pID0+IHsvLyBAdG9kbyBSZW1vdmUgc3Vic2NyaWJlZCBjYWxsYmFja1xuICAgICAgICAgICAgY2FsbGJhY2tzLm9uU3Vic2NyaWJlZCA9IGNiO1xuICAgICAgICAgICAgcmV0dXJuIGNoYWluO1xuICAgICAgICB9XG4gICAgfTtcblxuICAgIGNvbnN0IG1hciA9IG5ldyBjb25maWcud2ViMy5ldGguQ29udHJhY3QoY29uZmlnLmNvbnRyYWN0cy5QYW5kb3JhTWFya2V0LmFiaSwgY29uZmlnLmFkZHJlc3Nlcy5QYW5kb3JhTWFya2V0KTtcbiAgICBjaGFpbi5ldmVudCA9IFtdO1xuICAgIGNoYWluLmV2ZW50WzBdID0gbWFyLmV2ZW50cy5LZXJuZWxBZGRlZChvcHRpb25zKVxuICAgICAgICAub24oJ2RhdGEnLCBhc3luYyBldmVudCA9PiB7XG5cbiAgICAgICAgICAgIHRyeSB7XG5cbiAgICAgICAgICAgICAgICBjb25zdCBrZXJuZWwgPSBhd2FpdCBmZXRjaEtlcm5lbChldmVudC5yZXR1cm5WYWx1ZXMua2VybmVsLCBjb25maWcpO1xuICAgICAgICAgICAgICAgIGNhbGxiYWNrcy5vbkRhdGEoe1xuICAgICAgICAgICAgICAgICAgICByZWNvcmRzOiBba2VybmVsXSxcbiAgICAgICAgICAgICAgICAgICAgZXZlbnRcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH0gY2F0Y2goZXJyKSB7XG4gICAgICAgICAgICAgICAgY2FsbGJhY2tzLm9uRXJyb3IoZXJyKTtcbiAgICAgICAgICAgIH0gICAgICAgICAgICBcbiAgICAgICAgfSlcbiAgICAgICAgLm9uKCdlcnJvcicsIGNhbGxiYWNrcy5vbkVycm9yKTtcbiAgICBjaGFpbi5ldmVudFswXS5uYW1lID0gJ0tlcm5lbEFkZGVkJztcblxuICAgIHJldHVybiBjaGFpbjtcbn07XG5cbi8qKlxuICogSGFuZGxlIGV2ZW50IEtlcm5lbFJlbW92ZWRcbiAqIFxuICogQHBhcmFtIHtPYmplY3R9IG9wdGlvbnMgRXZlbnQgaGFuZGxlciBvcHRpb25zXG4gKiBAcGFyYW0ge09iamVjdH0gY29uZmlnIExpYnJhcnkgY29uZmlnIChwcm92aWRlZCBieSB0aGUgcHJveHkgYnV0IGNhbiBiZSBvdmVycmlkZGVuKVxuICogQHJldHVybnMge1Byb21pc2U8e09iamVjdH0+fSBQUHJvbWlzZSBvYmplY3QgcmVzb2x2ZWQgdG8gdGhlIG9iamVjdCB3aXRoIGNoYWluZWQgY2FsbGJhY2tzICNkYXRhIGFuZCAjZXJyb3JcbiAqL1xuZXhwb3J0IGNvbnN0IGV2ZW50S2VybmVsUmVtb3ZlZCA9IGFzeW5jIChvcHRpb25zID0ge30sIGNvbmZpZyA9IHt9KSA9PiB7XG5cbiAgICBleHBlY3QuYWxsKHsgb3B0aW9ucyB9LCB7XG4gICAgICAgICdvcHRpb25zJzoge1xuICAgICAgICAgICAgdHlwZTogJ29iamVjdCdcbiAgICAgICAgfVxuICAgIH0pO1xuXG4gICAgZXhwZWN0LmFsbChjb25maWcsIHtcbiAgICAgICAgJ3dlYjMnOiB7XG4gICAgICAgICAgICB0eXBlOiAnb2JqZWN0JyxcbiAgICAgICAgICAgIGNvZGU6IFdFQjNfUkVRVUlSRURcbiAgICAgICAgfSxcbiAgICAgICAgJ2NvbnRyYWN0cy5QYW5kb3JhTWFya2V0LmFiaSc6IHtcbiAgICAgICAgICAgIHR5cGU6ICdvYmplY3QnLFxuICAgICAgICAgICAgY29kZTogQ09OVFJBQ1RfUkVRVUlSRUQsXG4gICAgICAgICAgICBhcmdzOiBbJ1BhbmRvcmFNYXJrZXQnXVxuICAgICAgICB9LFxuICAgICAgICAnYWRkcmVzc2VzLlBhbmRvcmFNYXJrZXQnOiB7XG4gICAgICAgICAgICB0eXBlOiAnYWRkcmVzcycsXG4gICAgICAgICAgICBjb2RlOiBBRERSRVNTX1JFUVVJUkVELFxuICAgICAgICAgICAgYXJnczogWydQYW5kb3JhTWFya2V0J11cbiAgICAgICAgfVxuICAgIH0pO1xuXG4gICAgY29uc3QgY2FsbGJhY2tzID0ge1xuICAgICAgICBvbkRhdGE6ICgpID0+IHt9LFxuICAgICAgICBvbkVycm9yOiAoKSA9PiB7fVxuICAgIH07XG5cbiAgICBjb25zdCBjaGFpbiA9IHtcbiAgICAgICAgZGF0YTogKGNiID0gKCkgPT4ge30pID0+IHtcbiAgICAgICAgICAgIGNhbGxiYWNrcy5vbkRhdGEgPSBjYjtcbiAgICAgICAgICAgIHJldHVybiBjaGFpbjtcbiAgICAgICAgfSxcbiAgICAgICAgZXJyb3I6IChjYiA9ICgpID0+IHt9KSA9PiB7XG4gICAgICAgICAgICBjYWxsYmFja3Mub25FcnJvciA9IGNiO1xuICAgICAgICAgICAgcmV0dXJuIGNoYWluO1xuICAgICAgICB9XG4gICAgfTtcblxuICAgIGNvbnN0IG1hciA9IG5ldyBjb25maWcud2ViMy5ldGguQ29udHJhY3QoY29uZmlnLmNvbnRyYWN0cy5QYW5kb3JhTWFya2V0LmFiaSwgY29uZmlnLmFkZHJlc3Nlcy5QYW5kb3JhTWFya2V0KTtcbiAgICBjaGFpbi5ldmVudCA9IFtdO1xuICAgIGNoYWluLmV2ZW50WzBdID0gbWFyLmV2ZW50cy5LZXJuZWxSZW1vdmVkKG9wdGlvbnMpXG4gICAgICAgIC5vbignZGF0YScsIGFzeW5jIGV2ZW50ID0+IHtcblxuICAgICAgICAgICAgY2FsbGJhY2tzLm9uRGF0YSh7XG4gICAgICAgICAgICAgICAgcmVjb3JkczogW3thZGRyZXNzOiBldmVudC5yZXR1cm5WYWx1ZXMua2VybmVsfV0sXG4gICAgICAgICAgICAgICAgZXZlbnRcbiAgICAgICAgICAgIH0pOyAgICAgICAgICAgIFxuICAgICAgICB9KVxuICAgICAgICAub24oJ2Vycm9yJywgY2FsbGJhY2tzLm9uRXJyb3IpO1xuICAgIGNoYWluLmV2ZW50WzBdLm5hbWUgPSAnS2VybmVsUmVtb3ZlZCc7XG5cbiAgICByZXR1cm4gY2hhaW47XG59O1xuIl19