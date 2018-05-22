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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9pcGZzLmpzIl0sIm5hbWVzIjpbImxvYWRGaWxlIiwiZmlsZSIsInJlYWRlciIsIkZpbGVSZWFkZXIiLCJQcm9taXNlIiwicmVzb2x2ZSIsInJlamVjdCIsIm9uZXJyb3IiLCJlcnJvciIsImFib3J0Iiwib25sb2FkZW5kIiwicmVzdWx0IiwibmFtZSIsInR5cGUiLCJyZWFkQXNBcnJheUJ1ZmZlciIsImFkZCIsImJ1ZmZlciIsImxvYWRlZEZpbGUiLCJwcm9ncmVzc0NiIiwiY29uZmlnIiwiZXhwZWN0IiwiYWxsIiwiY29kZSIsIklQRlNfUkVRVUlSRUQiLCJyZXNwb25zZSIsImlwZnMiLCJwcm9ncmVzcyIsInNpemUiLCJsZW5ndGgiLCJoYXNoIiwic3VibWl0RmlsZSIsIkJ1ZmZlciIsImZyb20iLCJzdWJtaXRKc29uIiwianNvblN0cmluZyIsImZpbGVJbmZvIl0sIm1hcHBpbmdzIjoiQUFBQTs7Ozs7Ozs7QUFRQTs7Ozs7OztBQUVBOztBQUNBOzs7O0FBSUE7Ozs7OztBQU1PLE1BQU1BLFdBQVlDLElBQUQsSUFBVTtBQUM5QixRQUFNQyxTQUFTLElBQUlDLFVBQUosRUFBZjtBQUVBLFNBQU8sSUFBSUMsT0FBSixDQUFZLENBQUNDLE9BQUQsRUFBVUMsTUFBVixLQUFxQjtBQUNwQ0osV0FBT0ssT0FBUCxHQUFrQkMsS0FBRCxJQUFXO0FBQ3hCTixhQUFPTyxLQUFQO0FBQ0FILGFBQU9FLEtBQVA7QUFDSCxLQUhEOztBQUtBTixXQUFPUSxTQUFQLEdBQW1CLE1BQU1MLFFBQVE7QUFDN0JNLGNBQVFULE9BQU9TLE1BRGM7QUFFN0JDLFlBQU1YLEtBQUtXLElBRmtCO0FBRzdCQyxZQUFNWixLQUFLWTtBQUhrQixLQUFSLENBQXpCOztBQUtBWCxXQUFPWSxpQkFBUCxDQUF5QmIsSUFBekI7QUFDSCxHQVpNLENBQVA7QUFhSCxDQWhCTTtBQWtCUDs7Ozs7Ozs7Ozs7OztBQVNPLE1BQU1jLE1BQU0sT0FBT0MsTUFBUCxFQUFlQyxVQUFmLEVBQTJCQyxhQUFhLE1BQU0sQ0FBRSxDQUFoRCxFQUFrREMsU0FBUyxFQUEzRCxLQUFrRTtBQUVqRkMsU0FBT0MsR0FBUCxDQUFXO0FBQUVMLFVBQUY7QUFBVUMsY0FBVjtBQUFzQkM7QUFBdEIsR0FBWCxFQUErQztBQUMzQyxjQUFVO0FBQ05MLFlBQU07QUFEQSxLQURpQztBQUkzQyxrQkFBYztBQUNWQSxZQUFNO0FBREksS0FKNkI7QUFPM0Msa0JBQWM7QUFDVkEsWUFBTTtBQURJO0FBUDZCLEdBQS9DO0FBWUFPLFNBQU9DLEdBQVAsQ0FBV0YsTUFBWCxFQUFtQjtBQUNmLFlBQVE7QUFDSk4sWUFBTSxRQURGO0FBRUpTLFlBQU1DO0FBRkY7QUFETyxHQUFuQjtBQU9BLFFBQU1DLFdBQVcsTUFBTUwsT0FBT00sSUFBUCxDQUFZVixHQUFaLENBQWdCQyxNQUFoQixFQUF3QjtBQUMzQ1UsY0FBVUEsWUFBWVIsV0FBVztBQUM3QmpCLFlBQU1nQixXQUFXTCxJQURZO0FBRTdCZSxZQUFNWCxPQUFPWSxNQUZnQjtBQUc3QmYsWUFBTUksV0FBV0osSUFIWTtBQUk3QmE7QUFKNkIsS0FBWDtBQURxQixHQUF4QixDQUF2QjtBQVNBLFNBQU9GLFNBQVMsQ0FBVCxFQUFZSyxJQUFuQjtBQUNILENBL0JNO0FBaUNQOzs7Ozs7Ozs7OztBQU9PLE1BQU1DLGFBQWEsT0FBTzdCLElBQVAsRUFBYWlCLGFBQWEsTUFBTSxDQUFFLENBQWxDLEVBQW9DQyxTQUFTLEVBQTdDLEtBQW9EO0FBRTFFQyxTQUFPQyxHQUFQLENBQVc7QUFBRXBCLFFBQUY7QUFBUWlCO0FBQVIsR0FBWCxFQUFpQztBQUM3QixZQUFRO0FBQ0pMLFlBQU07QUFERixLQURxQjtBQUk3QixrQkFBYztBQUNWQSxZQUFNO0FBREk7QUFKZSxHQUFqQztBQVNBTyxTQUFPQyxHQUFQLENBQVdGLE1BQVgsRUFBbUI7QUFDZixZQUFRO0FBQ0pOLFlBQU0sUUFERjtBQUVKUyxZQUFNQztBQUZGO0FBRE8sR0FBbkI7QUFPQSxRQUFNTixhQUFhLE1BQU1qQixTQUFTQyxJQUFULENBQXpCO0FBQ0EsUUFBTWUsU0FBU2UsT0FBT0MsSUFBUCxDQUFZZixXQUFXTixNQUF2QixDQUFmO0FBQ0EsUUFBTWtCLE9BQU8sTUFBTWQsSUFBSUMsTUFBSixFQUFZQyxVQUFaLEVBQXdCQyxVQUF4QixFQUFvQ0MsTUFBcEMsQ0FBbkI7QUFFQSxTQUFPVSxJQUFQO0FBQ0gsQ0F2Qk07QUF5QlA7Ozs7Ozs7Ozs7OztBQVFPLE1BQU1JLGFBQWEsT0FBT0MsVUFBUCxFQUFtQkMsUUFBbkIsRUFBNkJqQixhQUFhLE1BQU0sQ0FBRSxDQUFsRCxFQUFvREMsU0FBUyxFQUE3RCxLQUFvRTtBQUUxRkMsU0FBT0MsR0FBUCxDQUFXO0FBQUVhLGNBQUY7QUFBY0MsWUFBZDtBQUF3QmpCO0FBQXhCLEdBQVgsRUFBaUQ7QUFDN0Msa0JBQWM7QUFDVkwsWUFBTTtBQURJLEtBRCtCO0FBSTdDLGdCQUFZO0FBQ1JBLFlBQU07QUFERSxLQUppQztBQU83QyxrQkFBYztBQUNWQSxZQUFNO0FBREk7QUFQK0IsR0FBakQ7QUFZQSxRQUFNRyxTQUFTZSxPQUFPQyxJQUFQLENBQVlFLFVBQVosQ0FBZjtBQUNBQyxXQUFTUixJQUFULEdBQWdCWCxPQUFPWSxNQUF2QjtBQUNBLFFBQU1DLE9BQU8sTUFBTWQsSUFBSUMsTUFBSixFQUFZbUIsUUFBWixFQUFzQmpCLFVBQXRCLEVBQWtDQyxNQUFsQyxDQUFuQjtBQUVBLFNBQU9VLElBQVA7QUFDSCxDQW5CTSIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogSVBGUyBpbnRlcmFjdGlvbiByZWxhdGVkIG1ldGhvZHNcbiAqIFRoaXMgZmlsZSBpdCBpcyBhIHBhcnQgb2YgdGhlIFBhbmRvcmEgUHlycmhhIEphdmFzY3JpcHQgbGlicmFyeVxuICogXG4gKiBAZmlsZSBpcGZzLmpzXG4gKiBAYXV0aG9yIEtvc3RpYW50eW4gU215cm5vdiA8a29zdHlzaEBnbWFpbC5jb20+XG4gKiBAZGF0ZSAyMDE4XG4gKi9cbid1c2Ugc3RyaWN0JztcblxuaW1wb3J0ICogYXMgZXhwZWN0IGZyb20gJy4vaGVscGVycy9leHBlY3QnO1xuaW1wb3J0IHtcbiAgICBJUEZTX1JFUVVJUkVEXG59IGZyb20gJy4vaGVscGVycy9lcnJvcnMnO1xuXG4vKipcbiAqIExvYWQgZmlsZSBmcm9tIHdlYiBicm93c2VyIGZzXG4gKiBcbiAqIEBwYXJhbSB7RmlsZX0gZmlsZSBcbiAqIEByZXR1cm5zIHtQcm9taXNlfVxuICovXG5leHBvcnQgY29uc3QgbG9hZEZpbGUgPSAoZmlsZSkgPT4ge1xuICAgIGNvbnN0IHJlYWRlciA9IG5ldyBGaWxlUmVhZGVyKCk7XG5cbiAgICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuICAgICAgICByZWFkZXIub25lcnJvciA9IChlcnJvcikgPT4ge1xuICAgICAgICAgICAgcmVhZGVyLmFib3J0KCk7XG4gICAgICAgICAgICByZWplY3QoZXJyb3IpO1xuICAgICAgICB9O1xuXG4gICAgICAgIHJlYWRlci5vbmxvYWRlbmQgPSAoKSA9PiByZXNvbHZlKHtcbiAgICAgICAgICAgIHJlc3VsdDogcmVhZGVyLnJlc3VsdCxcbiAgICAgICAgICAgIG5hbWU6IGZpbGUubmFtZSxcbiAgICAgICAgICAgIHR5cGU6IGZpbGUudHlwZVxuICAgICAgICB9KTtcbiAgICAgICAgcmVhZGVyLnJlYWRBc0FycmF5QnVmZmVyKGZpbGUpO1xuICAgIH0pOyAgICBcbn07XG5cbi8qKlxuICogU2VuZCBmaWxlIHRvIElQRlNcbiAqIFxuICogQHBhcmFtIHtCdWZmZXJ9IGJ1ZmZlciBcbiAqIEBwYXJhbSB7QXJyYXlCdWZmZXJ9IGxvYWRlZEZpbGUgXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBwcm9ncmVzc0NiIFNhdmluZyBwcm9ncmVzcyBjYWxsYmFjayB3aXRoIHsgZmlsZSwgc2l6ZSwgdHlwZSwgcHJvZ3Jlc3MgfVxuICogQHBhcmFtIHtPYmplY3R9IGNvbmZpZyBMaWJyYXJ5IGNvbmZpZyAocHJvdmlkZWQgYnkgdGhlIHByb3h5IGJ1dCBjYW4gYmUgb3ZlcnJpZGRlbikgXG4gKiBAcmV0dXJucyB7U3RyaW5nfVxuICovXG5leHBvcnQgY29uc3QgYWRkID0gYXN5bmMgKGJ1ZmZlciwgbG9hZGVkRmlsZSwgcHJvZ3Jlc3NDYiA9ICgpID0+IHt9LCBjb25maWcgPSB7fSkgPT4ge1xuXG4gICAgZXhwZWN0LmFsbCh7IGJ1ZmZlciwgbG9hZGVkRmlsZSwgcHJvZ3Jlc3NDYiB9LCB7XG4gICAgICAgICdidWZmZXInOiB7XG4gICAgICAgICAgICB0eXBlOiAnb2JqZWN0J1xuICAgICAgICB9LFxuICAgICAgICAnbG9hZGVkRmlsZSc6IHtcbiAgICAgICAgICAgIHR5cGU6ICdvYmplY3QnXG4gICAgICAgIH0sXG4gICAgICAgICdwcm9ncmVzc0NiJzoge1xuICAgICAgICAgICAgdHlwZTogJ2Z1bmN0aW9uJ1xuICAgICAgICB9XG4gICAgfSk7XG5cbiAgICBleHBlY3QuYWxsKGNvbmZpZywge1xuICAgICAgICAnaXBmcyc6IHtcbiAgICAgICAgICAgIHR5cGU6ICdvYmplY3QnLFxuICAgICAgICAgICAgY29kZTogSVBGU19SRVFVSVJFRFxuICAgICAgICB9XG4gICAgfSk7XG5cbiAgICBjb25zdCByZXNwb25zZSA9IGF3YWl0IGNvbmZpZy5pcGZzLmFkZChidWZmZXIsIHtcbiAgICAgICAgcHJvZ3Jlc3M6IHByb2dyZXNzID0+IHByb2dyZXNzQ2Ioe1xuICAgICAgICAgICAgZmlsZTogbG9hZGVkRmlsZS5uYW1lLFxuICAgICAgICAgICAgc2l6ZTogYnVmZmVyLmxlbmd0aCxcbiAgICAgICAgICAgIHR5cGU6IGxvYWRlZEZpbGUudHlwZSxcbiAgICAgICAgICAgIHByb2dyZXNzXG4gICAgICAgIH0pXG4gICAgfSk7XG5cbiAgICByZXR1cm4gcmVzcG9uc2VbMF0uaGFzaDtcbn07XG5cbi8qKlxuICogVXBsb2FkIGJpbmFyeSBmaWxlIHRvIElQRlNcbiAqIFxuICogQHBhcmFtIHtGaWxlfSBmaWxlIFxuICogQHBhcmFtIHtGdW5jdGlvbn0gW3Byb2dyZXNzQ2I9KCkgPT4ge31dIFxuICogQHJldHVybnMge1N0cmluZ31cbiAqL1xuZXhwb3J0IGNvbnN0IHN1Ym1pdEZpbGUgPSBhc3luYyAoZmlsZSwgcHJvZ3Jlc3NDYiA9ICgpID0+IHt9LCBjb25maWcgPSB7fSkgPT4ge1xuXG4gICAgZXhwZWN0LmFsbCh7IGZpbGUsIHByb2dyZXNzQ2IgfSwge1xuICAgICAgICAnZmlsZSc6IHtcbiAgICAgICAgICAgIHR5cGU6ICdvYmplY3QnXG4gICAgICAgIH0sXG4gICAgICAgICdwcm9ncmVzc0NiJzoge1xuICAgICAgICAgICAgdHlwZTogJ2Z1bmN0aW9uJ1xuICAgICAgICB9XG4gICAgfSk7XG5cbiAgICBleHBlY3QuYWxsKGNvbmZpZywge1xuICAgICAgICAnaXBmcyc6IHtcbiAgICAgICAgICAgIHR5cGU6ICdvYmplY3QnLFxuICAgICAgICAgICAgY29kZTogSVBGU19SRVFVSVJFRFxuICAgICAgICB9XG4gICAgfSk7XG4gICAgXG4gICAgY29uc3QgbG9hZGVkRmlsZSA9IGF3YWl0IGxvYWRGaWxlKGZpbGUpO1xuICAgIGNvbnN0IGJ1ZmZlciA9IEJ1ZmZlci5mcm9tKGxvYWRlZEZpbGUucmVzdWx0KTtcbiAgICBjb25zdCBoYXNoID0gYXdhaXQgYWRkKGJ1ZmZlciwgbG9hZGVkRmlsZSwgcHJvZ3Jlc3NDYiwgY29uZmlnKTtcblxuICAgIHJldHVybiBoYXNoOyAgICBcbn07XG5cbi8qKlxuICogVXBsb2FkIGpzb24gZmlsZSB0byBJUEZTXG4gKiBcbiAqIEBwYXJhbSB7U3RyaW5nfSBqc29uU3RyaW5nIFxuICogQHBhcmFtIHthbnl9IGZpbGVJbmZvIFxuICogQHBhcmFtIHthbnl9IFtwcm9ncmVzc0NiPSgpID0+IHt9XSBcbiAqIEByZXR1cm5zIFxuICovXG5leHBvcnQgY29uc3Qgc3VibWl0SnNvbiA9IGFzeW5jIChqc29uU3RyaW5nLCBmaWxlSW5mbywgcHJvZ3Jlc3NDYiA9ICgpID0+IHt9LCBjb25maWcgPSB7fSkgPT4ge1xuXG4gICAgZXhwZWN0LmFsbCh7IGpzb25TdHJpbmcsIGZpbGVJbmZvLCBwcm9ncmVzc0NiIH0sIHtcbiAgICAgICAgJ2pzb25TdHJpbmcnOiB7XG4gICAgICAgICAgICB0eXBlOiAnc3RyaW5nJ1xuICAgICAgICB9LFxuICAgICAgICAnZmlsZUluZm8nOiB7XG4gICAgICAgICAgICB0eXBlOiAnb2JqZWN0J1xuICAgICAgICB9LFxuICAgICAgICAncHJvZ3Jlc3NDYic6IHtcbiAgICAgICAgICAgIHR5cGU6ICdmdW5jdGlvbidcbiAgICAgICAgfVxuICAgIH0pO1xuXG4gICAgY29uc3QgYnVmZmVyID0gQnVmZmVyLmZyb20oanNvblN0cmluZyk7XG4gICAgZmlsZUluZm8uc2l6ZSA9IGJ1ZmZlci5sZW5ndGg7XG4gICAgY29uc3QgaGFzaCA9IGF3YWl0IGFkZChidWZmZXIsIGZpbGVJbmZvLCBwcm9ncmVzc0NiLCBjb25maWcpO1xuICAgIFxuICAgIHJldHVybiBoYXNoOyBcbn07XG4iXX0=