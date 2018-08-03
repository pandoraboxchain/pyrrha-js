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

/**
 * Load file from web browser fs
 * 
 * @param {File} file 
 * @returns {Promise}
 */
const loadFile = file => {
  const reader = new FileReader();
  return new Promise((resolve, reject) => {
    reader.onerror = error => {
      reader.abort();
      reject(error);
    };

    reader.onloadend = () => resolve({
      result: reader.result,
      name: file.name,
      type: file.type
    });

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

const add = async (buffer, loadedFile, progressCb = () => {}, config = {}) => {
  expect.all({
    buffer,
    loadedFile,
    progressCb
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
  const response = await config.ipfs.add(buffer, {
    progress: progress => progressCb({
      file: loadedFile.name,
      size: buffer.length,
      type: loadedFile.type,
      progress
    })
  });
  return response[0].hash;
};
/**
 * Upload binary file to IPFS
 * 
 * @param {File} file 
 * @param {Function} [progressCb=() => {}] 
 * @returns {String}
 */


exports.add = add;

const submitFile = async (file, progressCb = () => {}, config = {}) => {
  expect.all({
    file,
    progressCb
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
  const loadedFile = await loadFile(file);
  const buffer = Buffer.from(loadedFile.result);
  const hash = await add(buffer, loadedFile, progressCb, config);
  return hash;
};
/**
 * Upload json file to IPFS
 * 
 * @param {String} jsonString 
 * @param {any} fileInfo 
 * @param {any} [progressCb=() => {}] 
 * @returns 
 */


exports.submitFile = submitFile;

const submitJson = async (jsonString, fileInfo, progressCb = () => {}, config = {}) => {
  expect.all({
    jsonString,
    fileInfo,
    progressCb
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
  const buffer = Buffer.from(jsonString);
  fileInfo.size = buffer.length;
  const hash = await add(buffer, fileInfo, progressCb, config);
  return hash;
};

exports.submitJson = submitJson;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9pcGZzLmpzIl0sIm5hbWVzIjpbImxvYWRGaWxlIiwiZmlsZSIsInJlYWRlciIsIkZpbGVSZWFkZXIiLCJQcm9taXNlIiwicmVzb2x2ZSIsInJlamVjdCIsIm9uZXJyb3IiLCJlcnJvciIsImFib3J0Iiwib25sb2FkZW5kIiwicmVzdWx0IiwibmFtZSIsInR5cGUiLCJyZWFkQXNBcnJheUJ1ZmZlciIsImFkZCIsImJ1ZmZlciIsImxvYWRlZEZpbGUiLCJwcm9ncmVzc0NiIiwiY29uZmlnIiwiZXhwZWN0IiwiYWxsIiwiY29kZSIsIklQRlNfUkVRVUlSRUQiLCJyZXNwb25zZSIsImlwZnMiLCJwcm9ncmVzcyIsInNpemUiLCJsZW5ndGgiLCJoYXNoIiwic3VibWl0RmlsZSIsIkJ1ZmZlciIsImZyb20iLCJzdWJtaXRKc29uIiwianNvblN0cmluZyIsImZpbGVJbmZvIl0sIm1hcHBpbmdzIjoiQUFBQTs7Ozs7Ozs7QUFRQTs7Ozs7OztBQUVBOztBQUNBOzs7O0FBSUE7Ozs7OztBQU1PLE1BQU1BLFFBQVEsR0FBSUMsSUFBRCxJQUFVO0FBQzlCLFFBQU1DLE1BQU0sR0FBRyxJQUFJQyxVQUFKLEVBQWY7QUFFQSxTQUFPLElBQUlDLE9BQUosQ0FBWSxDQUFDQyxPQUFELEVBQVVDLE1BQVYsS0FBcUI7QUFDcENKLElBQUFBLE1BQU0sQ0FBQ0ssT0FBUCxHQUFrQkMsS0FBRCxJQUFXO0FBQ3hCTixNQUFBQSxNQUFNLENBQUNPLEtBQVA7QUFDQUgsTUFBQUEsTUFBTSxDQUFDRSxLQUFELENBQU47QUFDSCxLQUhEOztBQUtBTixJQUFBQSxNQUFNLENBQUNRLFNBQVAsR0FBbUIsTUFBTUwsT0FBTyxDQUFDO0FBQzdCTSxNQUFBQSxNQUFNLEVBQUVULE1BQU0sQ0FBQ1MsTUFEYztBQUU3QkMsTUFBQUEsSUFBSSxFQUFFWCxJQUFJLENBQUNXLElBRmtCO0FBRzdCQyxNQUFBQSxJQUFJLEVBQUVaLElBQUksQ0FBQ1k7QUFIa0IsS0FBRCxDQUFoQzs7QUFLQVgs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Q1JBLE1BQUFBLElBQUksRUFBRTtBQURFLEtBSmlDO0FBTzdDLGtCQUFjO0FBQ1ZBLE1BQUFBLElBQUksRUFBRTtBQURJO0FBUCtCLEdBQWpEO0FBWUEsUUFBTUcsTUFBTSxHQUFHZSxNQUFNLENBQUNDLElBQVAsQ0FBWUUsVUFBWixDQUFmO0FBQ0FDLEVBQUFBLFFBQVEsQ0FBQ1IsSUFBVCxHQUFnQlgsTUFBTSxDQUFDWSxNQUF2QjtBQUNBLFFBQU1DLElBQUksR0FBRyxNQUFNZCxHQUFHLENBQUNDLE1BQUQsRUFBU21CLFFBQVQsRUFBbUJqQixVQUFuQixFQUErQkMsTUFBL0IsQ0FBdEI7QUFFQSxTQUFPVSxJQUFQO0FBQ0gsQ0FuQk0iLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIElQRlMgaW50ZXJhY3Rpb24gcmVsYXRlZCBtZXRob2RzXG4gKiBUaGlzIGZpbGUgaXQgaXMgYSBwYXJ0IG9mIHRoZSBQYW5kb3JhIFB5cnJoYSBKYXZhc2NyaXB0IGxpYnJhcnlcbiAqIFxuICogQGZpbGUgaXBmcy5qc1xuICogQGF1dGhvciBLb3N0aWFudHluIFNteXJub3YgPGtvc3R5c2hAZ21haWwuY29tPlxuICogQGRhdGUgMjAxOFxuICovXG4ndXNlIHN0cmljdCc7XG5cbmltcG9ydCAqIGFzIGV4cGVjdCBmcm9tICcuL2hlbHBlcnMvZXhwZWN0JztcbmltcG9ydCB7XG4gICAgSVBGU19SRVFVSVJFRFxufSBmcm9tICcuL2hlbHBlcnMvZXJyb3JzJztcblxuLyoqXG4gKiBMb2FkIGZpbGUgZnJvbSB3ZWIgYnJvd3NlciBmc1xuICogXG4gKiBAcGFyYW0ge0ZpbGV9IGZpbGUgXG4gKiBAcmV0dXJucyB7UHJvbWlzZX1cbiAqL1xuZXhwb3J0IGNvbnN0IGxvYWRGaWxlID0gKGZpbGUpID0+IHtcbiAgICBjb25zdCByZWFkZXIgPSBuZXcgRmlsZVJlYWRlcigpO1xuXG4gICAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcbiAgICAgICAgcmVhZGVyLm9uZXJyb3IgPSAoZXJyb3IpID0+IHtcbiAgICAgICAgICAgIHJlYWRlci5hYm9ydCgpO1xuICAgICAgICAgICAgcmVqZWN0KGVycm9yKTtcbiAgICAgICAgfTtcblxuICAgICAgICByZWFkZXIub25sb2FkZW5kID0gKCkgPT4gcmVzb2x2ZSh7XG4gICAgICAgICAgICByZXN1bHQ6IHJlYWRlci5yZXN1bHQsXG4gICAgICAgICAgICBuYW1lOiBmaWxlLm5hbWUsXG4gICAgICAgICAgICB0eXBlOiBmaWxlLnR5cGVcbiAgICAgICAgfSk7XG4gICAgICAgIHJlYWRlci5yZWFkQXNBcnJheUJ1ZmZlcihmaWxlKTtcbiAgICB9KTsgICAgXG59O1xuXG4vKipcbiAqIFNlbmQgZmlsZSB0byBJUEZTXG4gKiBcbiAqIEBwYXJhbSB7QnVmZmVyfSBidWZmZXIgXG4gKiBAcGFyYW0ge0FycmF5QnVmZmVyfSBsb2FkZWRGaWxlIFxuICogQHBhcmFtIHtGdW5jdGlvbn0gcHJvZ3Jlc3NDYiBTYXZpbmcgcHJvZ3Jlc3MgY2FsbGJhY2sgd2l0aCB7IGZpbGUsIHNpemUsIHR5cGUsIHByb2dyZXNzIH1cbiAqIEBwYXJhbSB7T2JqZWN0fSBjb25maWcgTGlicmFyeSBjb25maWcgKHByb3ZpZGVkIGJ5IHRoZSBwcm94eSBidXQgY2FuIGJlIG92ZXJyaWRkZW4pIFxuICogQHJldHVybnMge1N0cmluZ31cbiAqL1xuZXhwb3J0IGNvbnN0IGFkZCA9IGFzeW5jIChidWZmZXIsIGxvYWRlZEZpbGUsIHByb2dyZXNzQ2IgPSAoKSA9PiB7fSwgY29uZmlnID0ge30pID0+IHtcblxuICAgIGV4cGVjdC5hbGwoeyBidWZmZXIsIGxvYWRlZEZpbGUsIHByb2dyZXNzQ2IgfSwge1xuICAgICAgICAnYnVmZmVyJzoge1xuICAgICAgICAgICAgdHlwZTogJ29iamVjdCdcbiAgICAgICAgfSxcbiAgICAgICAgJ2xvYWRlZEZpbGUnOiB7XG4gICAgICAgICAgICB0eXBlOiAnb2JqZWN0J1xuICAgICAgICB9LFxuICAgICAgICAncHJvZ3Jlc3NDYic6IHtcbiAgICAgICAgICAgIHR5cGU6ICdmdW5jdGlvbidcbiAgICAgICAgfVxuICAgIH0pO1xuXG4gICAgZXhwZWN0LmFsbChjb25maWcsIHtcbiAgICAgICAgJ2lwZnMnOiB7XG4gICAgICAgICAgICB0eXBlOiAnb2JqZWN0JyxcbiAgICAgICAgICAgIGNvZGU6IElQRlNfUkVRVUlSRURcbiAgICAgICAgfVxuICAgIH0pO1xuXG4gICAgY29uc3QgcmVzcG9uc2UgPSBhd2FpdCBjb25maWcuaXBmcy5hZGQoYnVmZmVyLCB7XG4gICAgICAgIHByb2dyZXNzOiBwcm9ncmVzcyA9PiBwcm9ncmVzc0NiKHtcbiAgICAgICAgICAgIGZpbGU6IGxvYWRlZEZpbGUubmFtZSxcbiAgICAgICAgICAgIHNpemU6IGJ1ZmZlci5sZW5ndGgsXG4gICAgICAgICAgICB0eXBlOiBsb2FkZWRGaWxlLnR5cGUsXG4gICAgICAgICAgICBwcm9ncmVzc1xuICAgICAgICB9KVxuICAgIH0pO1xuXG4gICAgcmV0dXJuIHJlc3BvbnNlWzBdLmhhc2g7XG59O1xuXG4vKipcbiAqIFVwbG9hZCBiaW5hcnkgZmlsZSB0byBJUEZTXG4gKiBcbiAqIEBwYXJhbSB7RmlsZX0gZmlsZSBcbiAqIEBwYXJhbSB7RnVuY3Rpb259IFtwcm9ncmVzc0NiPSgpID0+IHt9XSBcbiAqIEByZXR1cm5zIHtTdHJpbmd9XG4gKi9cbmV4cG9ydCBjb25zdCBzdWJtaXRGaWxlID0gYXN5bmMgKGZpbGUsIHByb2dyZXNzQ2IgPSAoKSA9PiB7fSwgY29uZmlnID0ge30pID0+IHtcblxuICAgIGV4cGVjdC5hbGwoeyBmaWxlLCBwcm9ncmVzc0NiIH0sIHtcbiAgICAgICAgJ2ZpbGUnOiB7XG4gICAgICAgICAgICB0eXBlOiAnb2JqZWN0J1xuICAgICAgICB9LFxuICAgICAgICAncHJvZ3Jlc3NDYic6IHtcbiAgICAgICAgICAgIHR5cGU6ICdmdW5jdGlvbidcbiAgICAgICAgfVxuICAgIH0pO1xuXG4gICAgZXhwZWN0LmFsbChjb25maWcsIHtcbiAgICAgICAgJ2lwZnMnOiB7XG4gICAgICAgICAgICB0eXBlOiAnb2JqZWN0JyxcbiAgICAgICAgICAgIGNvZGU6IElQRlNfUkVRVUlSRURcbiAgICAgICAgfVxuICAgIH0pO1xuICAgIFxuICAgIGNvbnN0IGxvYWRlZEZpbGUgPSBhd2FpdCBsb2FkRmlsZShmaWxlKTtcbiAgICBjb25zdCBidWZmZXIgPSBCdWZmZXIuZnJvbShsb2FkZWRGaWxlLnJlc3VsdCk7XG4gICAgY29uc3QgaGFzaCA9IGF3YWl0IGFkZChidWZmZXIsIGxvYWRlZEZpbGUsIHByb2dyZXNzQ2IsIGNvbmZpZyk7XG5cbiAgICByZXR1cm4gaGFzaDsgICAgXG59O1xuXG4vKipcbiAqIFVwbG9hZCBqc29uIGZpbGUgdG8gSVBGU1xuICogXG4gKiBAcGFyYW0ge1N0cmluZ30ganNvblN0cmluZyBcbiAqIEBwYXJhbSB7YW55fSBmaWxlSW5mbyBcbiAqIEBwYXJhbSB7YW55fSBbcHJvZ3Jlc3NDYj0oKSA9PiB7fV0gXG4gKiBAcmV0dXJucyBcbiAqL1xuZXhwb3J0IGNvbnN0IHN1Ym1pdEpzb24gPSBhc3luYyAoanNvblN0cmluZywgZmlsZUluZm8sIHByb2dyZXNzQ2IgPSAoKSA9PiB7fSwgY29uZmlnID0ge30pID0+IHtcblxuICAgIGV4cGVjdC5hbGwoeyBqc29uU3RyaW5nLCBmaWxlSW5mbywgcHJvZ3Jlc3NDYiB9LCB7XG4gICAgICAgICdqc29uU3RyaW5nJzoge1xuICAgICAgICAgICAgdHlwZTogJ3N0cmluZydcbiAgICAgICAgfSxcbiAgICAgICAgJ2ZpbGVJbmZvJzoge1xuICAgICAgICAgICAgdHlwZTogJ29iamVjdCdcbiAgICAgICAgfSxcbiAgICAgICAgJ3Byb2dyZXNzQ2InOiB7XG4gICAgICAgICAgICB0eXBlOiAnZnVuY3Rpb24nXG4gICAgICAgIH1cbiAgICB9KTtcblxuICAgIGNvbnN0IGJ1ZmZlciA9IEJ1ZmZlci5mcm9tKGpzb25TdHJpbmcpO1xuICAgIGZpbGVJbmZvLnNpemUgPSBidWZmZXIubGVuZ3RoO1xuICAgIGNvbnN0IGhhc2ggPSBhd2FpdCBhZGQoYnVmZmVyLCBmaWxlSW5mbywgcHJvZ3Jlc3NDYiwgY29uZmlnKTtcbiAgICBcbiAgICByZXR1cm4gaGFzaDsgXG59O1xuIl19