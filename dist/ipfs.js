/**
 * IPFS interaction related methods
 * This file it is a part of the Pandora Pyrrha Javascript library
 * 
 * @file ipfs.js
 * @author Kostiantyn Smyrnov <kostysh@gmail.com>
 * @date 2018
 */
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.submitJson = exports.submitFile = exports.add = exports.loadFile = void 0;

var expect = _interopRequireWildcard(require("./helpers/expect"));

var _errors = require("./helpers/errors");

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

/**
 * Load file from web browser fs
 * 
 * @param {File} file 
 * @returns {Promise}
 */
var loadFile = function loadFile(file) {
  var reader = new FileReader();
  return new Promise(function (resolve, reject) {
    reader.onerror = function (error) {
      reader.abort();
      reject(error);
    };

    reader.onloadend = function () {
      return resolve({
        result: reader.result,
        name: file.name,
        type: file.type
      });
    };

    reader.readAsArrayBuffer(file);
  });
};
/**
 * Send file to IPFS
 * 
 * @param {Buffer} buffer 
 * @param {ArrayBuffer} loadedFile 
 * @param {Function} progressCb Saving progress callback with { file, size, type, progress }
 * @param {Object} config Library config (provided by the proxy but can be overridden) 
 * @returns {String}
 */


exports.loadFile = loadFile;

var add =
/*#__PURE__*/
function () {
  var _ref = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee(buffer, loadedFile) {
    var progressCb,
        config,
        response,
        _args = arguments;
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            progressCb = _args.length > 2 && _args[2] !== undefined ? _args[2] : function () {};
            config = _args.length > 3 && _args[3] !== undefined ? _args[3] : {};
            expect.all({
              buffer: buffer,
              loadedFile: loadedFile,
              progressCb: progressCb
            }, {
              'buffer': {
                type: 'object'
              },
              'loadedFile': {
                type: 'object'
              },
              'progressCb': {
                type: 'function'
              }
            });
            expect.all(config, {
              'ipfs': {
                type: 'object',
                code: _errors.IPFS_REQUIRED
              }
            });
            _context.next = 6;
            return config.ipfs.add(buffer, {
              progress: function progress(_progress) {
                return progressCb({
                  file: loadedFile.name,
                  size: buffer.length,
                  type: loadedFile.type,
                  progress: _progress
                });
              }
            });

          case 6:
            response = _context.sent;
            return _context.abrupt("return", response[0].hash);

          case 8:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, this);
  }));

  return function add(_x, _x2) {
    return _ref.apply(this, arguments);
  };
}();
/**
 * Upload binary file to IPFS
 * 
 * @param {File} file 
 * @param {Function} [progressCb=() => {}] 
 * @returns {String}
 */


exports.add = add;

var submitFile =
/*#__PURE__*/
function () {
  var _ref2 = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee2(file) {
    var progressCb,
        config,
        loadedFile,
        buffer,
        hash,
        _args2 = arguments;
    return regeneratorRuntime.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            progressCb = _args2.length > 1 && _args2[1] !== undefined ? _args2[1] : function () {};
            config = _args2.length > 2 && _args2[2] !== undefined ? _args2[2] : {};
            expect.all({
              file: file,
              progressCb: progressCb
            }, {
              'file': {
                type: 'object'
              },
              'progressCb': {
                type: 'function'
              }
            });
            expect.all(config, {
              'ipfs': {
                type: 'object',
                code: _errors.IPFS_REQUIRED
              }
            });
            _context2.next = 6;
            return loadFile(file);

          case 6:
            loadedFile = _context2.sent;
            buffer = Buffer.from(loadedFile.result);
            _context2.next = 10;
            return add(buffer, loadedFile, progressCb, config);

          case 10:
            hash = _context2.sent;
            return _context2.abrupt("return", hash);

          case 12:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2, this);
  }));

  return function submitFile(_x3) {
    return _ref2.apply(this, arguments);
  };
}();
/**
 * Upload json file to IPFS
 * 
 * @param {String} jsonString 
 * @param {any} fileInfo 
 * @param {any} [progressCb=() => {}] 
 * @returns 
 */


exports.submitFile = submitFile;

var submitJson =
/*#__PURE__*/
function () {
  var _ref3 = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee3(jsonString, fileInfo) {
    var progressCb,
        config,
        buffer,
        hash,
        _args3 = arguments;
    return regeneratorRuntime.wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            progressCb = _args3.length > 2 && _args3[2] !== undefined ? _args3[2] : function () {};
            config = _args3.length > 3 && _args3[3] !== undefined ? _args3[3] : {};
            expect.all({
              jsonString: jsonString,
              fileInfo: fileInfo,
              progressCb: progressCb
            }, {
              'jsonString': {
                type: 'string'
              },
              'fileInfo': {
                type: 'object'
              },
              'progressCb': {
                type: 'function'
              }
            });
            buffer = Buffer.from(jsonString);
            fileInfo.size = buffer.length;
            _context3.next = 7;
            return add(buffer, fileInfo, progressCb, config);

          case 7:
            hash = _context3.sent;
            return _context3.abrupt("return", hash);

          case 9:
          case "end":
            return _context3.stop();
        }
      }
    }, _callee3, this);
  }));

  return function submitJson(_x4, _x5) {
    return _ref3.apply(this, arguments);
  };
}();

exports.submitJson = submitJson;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9pcGZzLmpzIl0sIm5hbWVzIjpbImxvYWRGaWxlIiwiZmlsZSIsInJlYWRlciIsIkZpbGVSZWFkZXIiLCJQcm9taXNlIiwicmVzb2x2ZSIsInJlamVjdCIsIm9uZXJyb3IiLCJlcnJvciIsImFib3J0Iiwib25sb2FkZW5kIiwicmVzdWx0IiwibmFtZSIsInR5cGUiLCJyZWFkQXNBcnJheUJ1ZmZlciIsImFkZCIsImJ1ZmZlciIsImxvYWRlZEZpbGUiLCJwcm9ncmVzc0NiIiwiY29uZmlnIiwiZXhwZWN0IiwiYWxsIiwiY29kZSIsIklQRlNfUkVRVUlSRUQiLCJpcGZzIiwicHJvZ3Jlc3MiLCJzaXplIiwibGVuZ3RoIiwicmVzcG9uc2UiLCJoYXNoIiwic3VibWl0RmlsZSIsIkJ1ZmZlciIsImZyb20iLCJzdWJtaXRKc29uIiwianNvblN0cmluZyIsImZpbGVJbmZvIl0sIm1hcHBpbmdzIjoiQUFBQTs7Ozs7Ozs7QUFRQTs7Ozs7OztBQUVBOztBQUNBOzs7Ozs7OztBQUlBOzs7Ozs7QUFNTyxJQUFNQSxRQUFRLEdBQUcsU0FBWEEsUUFBVyxDQUFDQyxJQUFELEVBQVU7QUFDOUIsTUFBTUMsTUFBTSxHQUFHLElBQUlDLFVBQUosRUFBZjtBQUVBLFNBQU8sSUFBSUMsT0FBSixDQUFZLFVBQUNDLE9BQUQsRUFBVUMsTUFBVixFQUFxQjtBQUNwQ0osSUFBQUEsTUFBTSxDQUFDSyxPQUFQLEdBQWlCLFVBQUNDLEtBQUQsRUFBVztBQUN4Qk4sTUFBQUEsTUFBTSxDQUFDTyxLQUFQO0FBQ0FILE1BQUFBLE1BQU0sQ0FBQ0UsS0FBRCxDQUFOO0FBQ0gsS0FIRDs7QUFLQU4sSUFBQUEsTUFBTSxDQUFDUSxTQUFQLEdBQW1CO0FBQUEsYUFBTUwsT0FBTyxDQUFDO0FBQzdCTSxRQUFBQSxNQUFNLEVBQUVULE1BQU0sQ0FBQ1MsTUFEYztBQUU3QkMsUUFBQUEsSUFBSSxFQUFFWCxJQUFJLENBQUNXLElBRmtCO0FBRzdCQyxRQUFBQSxJQUFJLEVBQUVaLElBQUks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Q0FoQkE7O0FBQUE7QUFnQmhCVSxZQUFBQSxJQWhCZ0I7QUFBQSw4Q0FrQmZBLElBbEJlOztBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBLEdBQUg7O0FBQUEsa0JBQVZJLFVBQVU7QUFBQTtBQUFBO0FBQUEsR0FBaEIiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIElQRlMgaW50ZXJhY3Rpb24gcmVsYXRlZCBtZXRob2RzXG4gKiBUaGlzIGZpbGUgaXQgaXMgYSBwYXJ0IG9mIHRoZSBQYW5kb3JhIFB5cnJoYSBKYXZhc2NyaXB0IGxpYnJhcnlcbiAqIFxuICogQGZpbGUgaXBmcy5qc1xuICogQGF1dGhvciBLb3N0aWFudHluIFNteXJub3YgPGtvc3R5c2hAZ21haWwuY29tPlxuICogQGRhdGUgMjAxOFxuICovXG4ndXNlIHN0cmljdCc7XG5cbmltcG9ydCAqIGFzIGV4cGVjdCBmcm9tICcuL2hlbHBlcnMvZXhwZWN0JztcbmltcG9ydCB7XG4gICAgSVBGU19SRVFVSVJFRFxufSBmcm9tICcuL2hlbHBlcnMvZXJyb3JzJztcblxuLyoqXG4gKiBMb2FkIGZpbGUgZnJvbSB3ZWIgYnJvd3NlciBmc1xuICogXG4gKiBAcGFyYW0ge0ZpbGV9IGZpbGUgXG4gKiBAcmV0dXJucyB7UHJvbWlzZX1cbiAqL1xuZXhwb3J0IGNvbnN0IGxvYWRGaWxlID0gKGZpbGUpID0+IHtcbiAgICBjb25zdCByZWFkZXIgPSBuZXcgRmlsZVJlYWRlcigpO1xuXG4gICAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcbiAgICAgICAgcmVhZGVyLm9uZXJyb3IgPSAoZXJyb3IpID0+IHtcbiAgICAgICAgICAgIHJlYWRlci5hYm9ydCgpO1xuICAgICAgICAgICAgcmVqZWN0KGVycm9yKTtcbiAgICAgICAgfTtcblxuICAgICAgICByZWFkZXIub25sb2FkZW5kID0gKCkgPT4gcmVzb2x2ZSh7XG4gICAgICAgICAgICByZXN1bHQ6IHJlYWRlci5yZXN1bHQsXG4gICAgICAgICAgICBuYW1lOiBmaWxlLm5hbWUsXG4gICAgICAgICAgICB0eXBlOiBmaWxlLnR5cGVcbiAgICAgICAgfSk7XG4gICAgICAgIHJlYWRlci5yZWFkQXNBcnJheUJ1ZmZlcihmaWxlKTtcbiAgICB9KTsgICAgXG59O1xuXG4vKipcbiAqIFNlbmQgZmlsZSB0byBJUEZTXG4gKiBcbiAqIEBwYXJhbSB7QnVmZmVyfSBidWZmZXIgXG4gKiBAcGFyYW0ge0FycmF5QnVmZmVyfSBsb2FkZWRGaWxlIFxuICogQHBhcmFtIHtGdW5jdGlvbn0gcHJvZ3Jlc3NDYiBTYXZpbmcgcHJvZ3Jlc3MgY2FsbGJhY2sgd2l0aCB7IGZpbGUsIHNpemUsIHR5cGUsIHByb2dyZXNzIH1cbiAqIEBwYXJhbSB7T2JqZWN0fSBjb25maWcgTGlicmFyeSBjb25maWcgKHByb3ZpZGVkIGJ5IHRoZSBwcm94eSBidXQgY2FuIGJlIG92ZXJyaWRkZW4pIFxuICogQHJldHVybnMge1N0cmluZ31cbiAqL1xuZXhwb3J0IGNvbnN0IGFkZCA9IGFzeW5jIChidWZmZXIsIGxvYWRlZEZpbGUsIHByb2dyZXNzQ2IgPSAoKSA9PiB7fSwgY29uZmlnID0ge30pID0+IHtcblxuICAgIGV4cGVjdC5hbGwoeyBidWZmZXIsIGxvYWRlZEZpbGUsIHByb2dyZXNzQ2IgfSwge1xuICAgICAgICAnYnVmZmVyJzoge1xuICAgICAgICAgICAgdHlwZTogJ29iamVjdCdcbiAgICAgICAgfSxcbiAgICAgICAgJ2xvYWRlZEZpbGUnOiB7XG4gICAgICAgICAgICB0eXBlOiAnb2JqZWN0J1xuICAgICAgICB9LFxuICAgICAgICAncHJvZ3Jlc3NDYic6IHtcbiAgICAgICAgICAgIHR5cGU6ICdmdW5jdGlvbidcbiAgICAgICAgfVxuICAgIH0pO1xuXG4gICAgZXhwZWN0LmFsbChjb25maWcsIHtcbiAgICAgICAgJ2lwZnMnOiB7XG4gICAgICAgICAgICB0eXBlOiAnb2JqZWN0JyxcbiAgICAgICAgICAgIGNvZGU6IElQRlNfUkVRVUlSRURcbiAgICAgICAgfVxuICAgIH0pO1xuXG4gICAgY29uc3QgcmVzcG9uc2UgPSBhd2FpdCBjb25maWcuaXBmcy5hZGQoYnVmZmVyLCB7XG4gICAgICAgIHByb2dyZXNzOiBwcm9ncmVzcyA9PiBwcm9ncmVzc0NiKHtcbiAgICAgICAgICAgIGZpbGU6IGxvYWRlZEZpbGUubmFtZSxcbiAgICAgICAgICAgIHNpemU6IGJ1ZmZlci5sZW5ndGgsXG4gICAgICAgICAgICB0eXBlOiBsb2FkZWRGaWxlLnR5cGUsXG4gICAgICAgICAgICBwcm9ncmVzc1xuICAgICAgICB9KVxuICAgIH0pO1xuXG4gICAgcmV0dXJuIHJlc3BvbnNlWzBdLmhhc2g7XG59O1xuXG4vKipcbiAqIFVwbG9hZCBiaW5hcnkgZmlsZSB0byBJUEZTXG4gKiBcbiAqIEBwYXJhbSB7RmlsZX0gZmlsZSBcbiAqIEBwYXJhbSB7RnVuY3Rpb259IFtwcm9ncmVzc0NiPSgpID0+IHt9XSBcbiAqIEByZXR1cm5zIHtTdHJpbmd9XG4gKi9cbmV4cG9ydCBjb25zdCBzdWJtaXRGaWxlID0gYXN5bmMgKGZpbGUsIHByb2dyZXNzQ2IgPSAoKSA9PiB7fSwgY29uZmlnID0ge30pID0+IHtcblxuICAgIGV4cGVjdC5hbGwoeyBmaWxlLCBwcm9ncmVzc0NiIH0sIHtcbiAgICAgICAgJ2ZpbGUnOiB7XG4gICAgICAgICAgICB0eXBlOiAnb2JqZWN0J1xuICAgICAgICB9LFxuICAgICAgICAncHJvZ3Jlc3NDYic6IHtcbiAgICAgICAgICAgIHR5cGU6ICdmdW5jdGlvbidcbiAgICAgICAgfVxuICAgIH0pO1xuXG4gICAgZXhwZWN0LmFsbChjb25maWcsIHtcbiAgICAgICAgJ2lwZnMnOiB7XG4gICAgICAgICAgICB0eXBlOiAnb2JqZWN0JyxcbiAgICAgICAgICAgIGNvZGU6IElQRlNfUkVRVUlSRURcbiAgICAgICAgfVxuICAgIH0pO1xuICAgIFxuICAgIGNvbnN0IGxvYWRlZEZpbGUgPSBhd2FpdCBsb2FkRmlsZShmaWxlKTtcbiAgICBjb25zdCBidWZmZXIgPSBCdWZmZXIuZnJvbShsb2FkZWRGaWxlLnJlc3VsdCk7XG4gICAgY29uc3QgaGFzaCA9IGF3YWl0IGFkZChidWZmZXIsIGxvYWRlZEZpbGUsIHByb2dyZXNzQ2IsIGNvbmZpZyk7XG5cbiAgICByZXR1cm4gaGFzaDsgICAgXG59O1xuXG4vKipcbiAqIFVwbG9hZCBqc29uIGZpbGUgdG8gSVBGU1xuICogXG4gKiBAcGFyYW0ge1N0cmluZ30ganNvblN0cmluZyBcbiAqIEBwYXJhbSB7YW55fSBmaWxlSW5mbyBcbiAqIEBwYXJhbSB7YW55fSBbcHJvZ3Jlc3NDYj0oKSA9PiB7fV0gXG4gKiBAcmV0dXJucyBcbiAqL1xuZXhwb3J0IGNvbnN0IHN1Ym1pdEpzb24gPSBhc3luYyAoanNvblN0cmluZywgZmlsZUluZm8sIHByb2dyZXNzQ2IgPSAoKSA9PiB7fSwgY29uZmlnID0ge30pID0+IHtcblxuICAgIGV4cGVjdC5hbGwoeyBqc29uU3RyaW5nLCBmaWxlSW5mbywgcHJvZ3Jlc3NDYiB9LCB7XG4gICAgICAgICdqc29uU3RyaW5nJzoge1xuICAgICAgICAgICAgdHlwZTogJ3N0cmluZydcbiAgICAgICAgfSxcbiAgICAgICAgJ2ZpbGVJbmZvJzoge1xuICAgICAgICAgICAgdHlwZTogJ29iamVjdCdcbiAgICAgICAgfSxcbiAgICAgICAgJ3Byb2dyZXNzQ2InOiB7XG4gICAgICAgICAgICB0eXBlOiAnZnVuY3Rpb24nXG4gICAgICAgIH1cbiAgICB9KTtcblxuICAgIGNvbnN0IGJ1ZmZlciA9IEJ1ZmZlci5mcm9tKGpzb25TdHJpbmcpO1xuICAgIGZpbGVJbmZvLnNpemUgPSBidWZmZXIubGVuZ3RoO1xuICAgIGNvbnN0IGhhc2ggPSBhd2FpdCBhZGQoYnVmZmVyLCBmaWxlSW5mbywgcHJvZ3Jlc3NDYiwgY29uZmlnKTtcbiAgICBcbiAgICByZXR1cm4gaGFzaDsgXG59O1xuIl19