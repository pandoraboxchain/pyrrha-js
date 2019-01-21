/**
 * IPFS interaction related methods
 * This file it is a part of the Pandora Pyrrha Javascript library
 * 
 * @file ipfs.js
 * @author Kostiantyn Smyrnov <kostysh@gmail.com>
 * @date 2018
 */
'use strict';

require("core-js/modules/es6.object.define-property");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.submitJson = exports.submitFile = exports.add = exports.loadFile = void 0;

require("regenerator-runtime/runtime");

require("core-js/modules/es6.function.name");

require("core-js/modules/es6.promise");

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9pcGZzLmpzIl0sIm5hbWVzIjpbImxvYWRGaWxlIiwiZmlsZSIsInJlYWRlciIsIkZpbGVSZWFkZXIiLCJQcm9taXNlIiwicmVzb2x2ZSIsInJlamVjdCIsIm9uZXJyb3IiLCJlcnJvciIsImFib3J0Iiwib25sb2FkZW5kIiwicmVzdWx0IiwibmFtZSIsInR5cGUiLCJyZWFkQXNBcnJheUJ1ZmZlciIsImFkZCIsImJ1ZmZlciIsImxvYWRlZEZpbGUiLCJwcm9ncmVzc0NiIiwiY29uZmlnIiwiZXhwZWN0IiwiYWxsIiwiY29kZSIsIklQRlNfUkVRVUlSRUQiLCJpcGZzIiwicHJvZ3Jlc3MiLCJzaXplIiwibGVuZ3RoIiwicmVzcG9uc2UiLCJoYXNoIiwic3VibWl0RmlsZSIsIkJ1ZmZlciIsImZyb20iLCJzdWJtaXRKc29uIiwianNvblN0cmluZyIsImZpbGVJbmZvIl0sIm1hcHBpbmdzIjoiQUFBQTs7Ozs7Ozs7QUFRQTs7Ozs7Ozs7Ozs7Ozs7O0FBRUE7O0FBQ0E7Ozs7Ozs7O0FBSUE7Ozs7OztBQU1PLElBQU1BLFFBQVEsR0FBRyxTQUFYQSxRQUFXLENBQUNDLElBQUQsRUFBVTtBQUM5QixNQUFNQyxNQUFNLEdBQUcsSUFBSUMsVUFBSixFQUFmO0FBRUEsU0FBTyxJQUFJQyxPQUFKLENBQVksVUFBQ0MsT0FBRCxFQUFVQyxNQUFWLEVBQXFCO0FBQ3BDSixJQUFBQSxNQUFNLENBQUNLLE9BQVAsR0FBaUIsVUFBQ0MsS0FBRCxFQUFXO0FBQ3hCTixNQUFBQSxNQUFNLENBQUNPLEtBQVA7QUFDQUgsTUFBQUEsTUFBTSxDQUFDRSxLQUFELENBQU47QUFDSCxLQUhEOztBQUtBTixJQUFBQSxNQUFNLENBQUNRLFNBQVAsR0FBbUI7QUFBQSxhQUFNTCxPQUFPLENBQUM7QUFDN0JNLFFBQUFBLE1BQU0sRUFBRVQsTUFBTSxDQUFDUyxNQURjO0FBRTdCQyxRQUFBQSxJQUFJLEVBQUVYLElBQUksQ0FBQ1csSUFGa0I7QUFHN0JDLFFBQUFBLElBQUksRUFB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QyxNQUEvQixDQWhCQTs7QUFBQTtBQWdCaEJVLFlBQUFBLElBaEJnQjtBQUFBLDhDQWtCZkEsSUFsQmU7O0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUEsR0FBSDs7QUFBQSxrQkFBVkksVUFBVTtBQUFBO0FBQUE7QUFBQSxHQUFoQiIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogSVBGUyBpbnRlcmFjdGlvbiByZWxhdGVkIG1ldGhvZHNcbiAqIFRoaXMgZmlsZSBpdCBpcyBhIHBhcnQgb2YgdGhlIFBhbmRvcmEgUHlycmhhIEphdmFzY3JpcHQgbGlicmFyeVxuICogXG4gKiBAZmlsZSBpcGZzLmpzXG4gKiBAYXV0aG9yIEtvc3RpYW50eW4gU215cm5vdiA8a29zdHlzaEBnbWFpbC5jb20+XG4gKiBAZGF0ZSAyMDE4XG4gKi9cbid1c2Ugc3RyaWN0JztcblxuaW1wb3J0ICogYXMgZXhwZWN0IGZyb20gJy4vaGVscGVycy9leHBlY3QnO1xuaW1wb3J0IHtcbiAgICBJUEZTX1JFUVVJUkVEXG59IGZyb20gJy4vaGVscGVycy9lcnJvcnMnO1xuXG4vKipcbiAqIExvYWQgZmlsZSBmcm9tIHdlYiBicm93c2VyIGZzXG4gKiBcbiAqIEBwYXJhbSB7RmlsZX0gZmlsZSBcbiAqIEByZXR1cm5zIHtQcm9taXNlfVxuICovXG5leHBvcnQgY29uc3QgbG9hZEZpbGUgPSAoZmlsZSkgPT4ge1xuICAgIGNvbnN0IHJlYWRlciA9IG5ldyBGaWxlUmVhZGVyKCk7XG5cbiAgICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuICAgICAgICByZWFkZXIub25lcnJvciA9IChlcnJvcikgPT4ge1xuICAgICAgICAgICAgcmVhZGVyLmFib3J0KCk7XG4gICAgICAgICAgICByZWplY3QoZXJyb3IpO1xuICAgICAgICB9O1xuXG4gICAgICAgIHJlYWRlci5vbmxvYWRlbmQgPSAoKSA9PiByZXNvbHZlKHtcbiAgICAgICAgICAgIHJlc3VsdDogcmVhZGVyLnJlc3VsdCxcbiAgICAgICAgICAgIG5hbWU6IGZpbGUubmFtZSxcbiAgICAgICAgICAgIHR5cGU6IGZpbGUudHlwZVxuICAgICAgICB9KTtcbiAgICAgICAgcmVhZGVyLnJlYWRBc0FycmF5QnVmZmVyKGZpbGUpO1xuICAgIH0pOyAgICBcbn07XG5cbi8qKlxuICogU2VuZCBmaWxlIHRvIElQRlNcbiAqIFxuICogQHBhcmFtIHtCdWZmZXJ9IGJ1ZmZlciBcbiAqIEBwYXJhbSB7QXJyYXlCdWZmZXJ9IGxvYWRlZEZpbGUgXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBwcm9ncmVzc0NiIFNhdmluZyBwcm9ncmVzcyBjYWxsYmFjayB3aXRoIHsgZmlsZSwgc2l6ZSwgdHlwZSwgcHJvZ3Jlc3MgfVxuICogQHBhcmFtIHtPYmplY3R9IGNvbmZpZyBMaWJyYXJ5IGNvbmZpZyAocHJvdmlkZWQgYnkgdGhlIHByb3h5IGJ1dCBjYW4gYmUgb3ZlcnJpZGRlbikgXG4gKiBAcmV0dXJucyB7U3RyaW5nfVxuICovXG5leHBvcnQgY29uc3QgYWRkID0gYXN5bmMgKGJ1ZmZlciwgbG9hZGVkRmlsZSwgcHJvZ3Jlc3NDYiA9ICgpID0+IHt9LCBjb25maWcgPSB7fSkgPT4ge1xuXG4gICAgZXhwZWN0LmFsbCh7IGJ1ZmZlciwgbG9hZGVkRmlsZSwgcHJvZ3Jlc3NDYiB9LCB7XG4gICAgICAgICdidWZmZXInOiB7XG4gICAgICAgICAgICB0eXBlOiAnb2JqZWN0J1xuICAgICAgICB9LFxuICAgICAgICAnbG9hZGVkRmlsZSc6IHtcbiAgICAgICAgICAgIHR5cGU6ICdvYmplY3QnXG4gICAgICAgIH0sXG4gICAgICAgICdwcm9ncmVzc0NiJzoge1xuICAgICAgICAgICAgdHlwZTogJ2Z1bmN0aW9uJ1xuICAgICAgICB9XG4gICAgfSk7XG5cbiAgICBleHBlY3QuYWxsKGNvbmZpZywge1xuICAgICAgICAnaXBmcyc6IHtcbiAgICAgICAgICAgIHR5cGU6ICdvYmplY3QnLFxuICAgICAgICAgICAgY29kZTogSVBGU19SRVFVSVJFRFxuICAgICAgICB9XG4gICAgfSk7XG5cbiAgICBjb25zdCByZXNwb25zZSA9IGF3YWl0IGNvbmZpZy5pcGZzLmFkZChidWZmZXIsIHtcbiAgICAgICAgcHJvZ3Jlc3M6IHByb2dyZXNzID0+IHByb2dyZXNzQ2Ioe1xuICAgICAgICAgICAgZmlsZTogbG9hZGVkRmlsZS5uYW1lLFxuICAgICAgICAgICAgc2l6ZTogYnVmZmVyLmxlbmd0aCxcbiAgICAgICAgICAgIHR5cGU6IGxvYWRlZEZpbGUudHlwZSxcbiAgICAgICAgICAgIHByb2dyZXNzXG4gICAgICAgIH0pXG4gICAgfSk7XG5cbiAgICByZXR1cm4gcmVzcG9uc2VbMF0uaGFzaDtcbn07XG5cbi8qKlxuICogVXBsb2FkIGJpbmFyeSBmaWxlIHRvIElQRlNcbiAqIFxuICogQHBhcmFtIHtGaWxlfSBmaWxlIFxuICogQHBhcmFtIHtGdW5jdGlvbn0gW3Byb2dyZXNzQ2I9KCkgPT4ge31dIFxuICogQHJldHVybnMge1N0cmluZ31cbiAqL1xuZXhwb3J0IGNvbnN0IHN1Ym1pdEZpbGUgPSBhc3luYyAoZmlsZSwgcHJvZ3Jlc3NDYiA9ICgpID0+IHt9LCBjb25maWcgPSB7fSkgPT4ge1xuXG4gICAgZXhwZWN0LmFsbCh7IGZpbGUsIHByb2dyZXNzQ2IgfSwge1xuICAgICAgICAnZmlsZSc6IHtcbiAgICAgICAgICAgIHR5cGU6ICdvYmplY3QnXG4gICAgICAgIH0sXG4gICAgICAgICdwcm9ncmVzc0NiJzoge1xuICAgICAgICAgICAgdHlwZTogJ2Z1bmN0aW9uJ1xuICAgICAgICB9XG4gICAgfSk7XG5cbiAgICBleHBlY3QuYWxsKGNvbmZpZywge1xuICAgICAgICAnaXBmcyc6IHtcbiAgICAgICAgICAgIHR5cGU6ICdvYmplY3QnLFxuICAgICAgICAgICAgY29kZTogSVBGU19SRVFVSVJFRFxuICAgICAgICB9XG4gICAgfSk7XG4gICAgXG4gICAgY29uc3QgbG9hZGVkRmlsZSA9IGF3YWl0IGxvYWRGaWxlKGZpbGUpO1xuICAgIGNvbnN0IGJ1ZmZlciA9IEJ1ZmZlci5mcm9tKGxvYWRlZEZpbGUucmVzdWx0KTtcbiAgICBjb25zdCBoYXNoID0gYXdhaXQgYWRkKGJ1ZmZlciwgbG9hZGVkRmlsZSwgcHJvZ3Jlc3NDYiwgY29uZmlnKTtcblxuICAgIHJldHVybiBoYXNoOyAgICBcbn07XG5cbi8qKlxuICogVXBsb2FkIGpzb24gZmlsZSB0byBJUEZTXG4gKiBcbiAqIEBwYXJhbSB7U3RyaW5nfSBqc29uU3RyaW5nIFxuICogQHBhcmFtIHthbnl9IGZpbGVJbmZvIFxuICogQHBhcmFtIHthbnl9IFtwcm9ncmVzc0NiPSgpID0+IHt9XSBcbiAqIEByZXR1cm5zIFxuICovXG5leHBvcnQgY29uc3Qgc3VibWl0SnNvbiA9IGFzeW5jIChqc29uU3RyaW5nLCBmaWxlSW5mbywgcHJvZ3Jlc3NDYiA9ICgpID0+IHt9LCBjb25maWcgPSB7fSkgPT4ge1xuXG4gICAgZXhwZWN0LmFsbCh7IGpzb25TdHJpbmcsIGZpbGVJbmZvLCBwcm9ncmVzc0NiIH0sIHtcbiAgICAgICAgJ2pzb25TdHJpbmcnOiB7XG4gICAgICAgICAgICB0eXBlOiAnc3RyaW5nJ1xuICAgICAgICB9LFxuICAgICAgICAnZmlsZUluZm8nOiB7XG4gICAgICAgICAgICB0eXBlOiAnb2JqZWN0J1xuICAgICAgICB9LFxuICAgICAgICAncHJvZ3Jlc3NDYic6IHtcbiAgICAgICAgICAgIHR5cGU6ICdmdW5jdGlvbidcbiAgICAgICAgfVxuICAgIH0pO1xuXG4gICAgY29uc3QgYnVmZmVyID0gQnVmZmVyLmZyb20oanNvblN0cmluZyk7XG4gICAgZmlsZUluZm8uc2l6ZSA9IGJ1ZmZlci5sZW5ndGg7XG4gICAgY29uc3QgaGFzaCA9IGF3YWl0IGFkZChidWZmZXIsIGZpbGVJbmZvLCBwcm9ncmVzc0NiLCBjb25maWcpO1xuICAgIFxuICAgIHJldHVybiBoYXNoOyBcbn07XG4iXX0=