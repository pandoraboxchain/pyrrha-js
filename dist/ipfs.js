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
  const buffer = Buffer.from(jsonString);
  fileInfo.size = buffer.length;
  const hash = await add(buffer, fileInfo, progressCb, config);
  return hash;
};

exports.submitJson = submitJson;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9pcGZzLmpzIl0sIm5hbWVzIjpbImxvYWRGaWxlIiwiZmlsZSIsInJlYWRlciIsIkZpbGVSZWFkZXIiLCJQcm9taXNlIiwicmVzb2x2ZSIsInJlamVjdCIsIm9uZXJyb3IiLCJlcnJvciIsImFib3J0Iiwib25sb2FkZW5kIiwicmVzdWx0IiwibmFtZSIsInR5cGUiLCJyZWFkQXNBcnJheUJ1ZmZlciIsImFkZCIsImJ1ZmZlciIsImxvYWRlZEZpbGUiLCJwcm9ncmVzc0NiIiwiY29uZmlnIiwiZXhwZWN0IiwiYWxsIiwiY29kZSIsIklQRlNfUkVRVUlSRUQiLCJyZXNwb25zZSIsImlwZnMiLCJwcm9ncmVzcyIsInNpemUiLCJsZW5ndGgiLCJoYXNoIiwic3VibWl0RmlsZSIsIkJ1ZmZlciIsImZyb20iLCJzdWJtaXRKc29uIiwianNvblN0cmluZyIsImZpbGVJbmZvIl0sIm1hcHBpbmdzIjoiQUFBQTs7Ozs7Ozs7QUFRQTs7Ozs7OztBQUVBOztBQUNBOzs7O0FBSUE7Ozs7OztBQU1PLE1BQU1BLFdBQVlDLElBQUQsSUFBVTtBQUM5QixRQUFNQyxTQUFTLElBQUlDLFVBQUosRUFBZjtBQUVBLFNBQU8sSUFBSUMsT0FBSixDQUFZLENBQUNDLE9BQUQsRUFBVUMsTUFBVixLQUFxQjtBQUNwQ0osV0FBT0ssT0FBUCxHQUFrQkMsS0FBRCxJQUFXO0FBQ3hCTixhQUFPTyxLQUFQO0FBQ0FILGFBQU9FLEtBQVA7QUFDSCxLQUhEOztBQUtBTixXQUFPUSxTQUFQLEdBQW1CLE1BQU1MLFFBQVE7QUFDN0JNLGNBQVFULE9BQU9TLE1BRGM7QUFFN0JDLFlBQU1YLEtBQUtXLElBRmtCO0FBRzdCQyxZQUFNWixLQUFLWTtBQUhrQixLQUFSLENBQXpCOztBQUtBWCxXQUFPWSxpQkFBUCxDQUF5QmIsSUFBekI7QUFDSCxHQVpNLENBQVA7QUFhSCxDQWhCTTtBQWtCUDs7Ozs7Ozs7Ozs7OztBQVNPLE1BQU1jLE1BQU0sT0FBT0MsTUFBUCxFQUFlQyxVQUFmLEVBQTJCQyxhQUFhLE1BQU0sQ0FBRSxDQUFoRCxFQUFrREMsU0FBUyxFQUEzRCxLQUFrRTtBQUVqRkMsU0FBT0MsR0FBUCxDQUFXRixNQUFYLEVBQW1CO0FBQ2YsWUFBUTtBQUNKTixZQUFNLFFBREY7QUFFSlMsWUFBTUM7QUFGRjtBQURPLEdBQW5CO0FBT0EsUUFBTUMsV0FBVyxNQUFNTCxPQUFPTSxJQUFQLENBQVlWLEdBQVosQ0FBZ0JDLE1BQWhCLEVBQXdCO0FBQzNDVSxjQUFVQSxZQUFZUixXQUFXO0FBQzdCakIsWUFBTWdCLFdBQVdMLElBRFk7QUFFN0JlLFlBQU1YLE9BQU9ZLE1BRmdCO0FBRzdCZixZQUFNSSxXQUFXSixJQUhZO0FBSTdCYTtBQUo2QixLQUFYO0FBRHFCLEdBQXhCLENBQXZCO0FBU0EsU0FBT0YsU0FBUyxDQUFULEVBQVlLLElBQW5CO0FBQ0gsQ0FuQk07QUFxQlA7Ozs7Ozs7Ozs7O0FBT08sTUFBTUMsYUFBYSxPQUFPN0IsSUFBUCxFQUFhaUIsYUFBYSxNQUFNLENBQUUsQ0FBbEMsRUFBb0NDLFNBQVMsRUFBN0MsS0FBb0Q7QUFFMUVDLFNBQU9DLEdBQVAsQ0FBV0YsTUFBWCxFQUFtQjtBQUNmLFlBQVE7QUFDSk4sWUFBTSxRQURGO0FBRUpTLFlBQU1DO0FBRkY7QUFETyxHQUFuQjtBQU9BLFFBQU1OLGFBQWEsTUFBTWpCLFNBQVNDLElBQVQsQ0FBekI7QUFDQSxRQUFNZSxTQUFTZSxPQUFPQyxJQUFQLENBQVlmLFdBQVdOLE1BQXZCLENBQWY7QUFDQSxRQUFNa0IsT0FBTyxNQUFNZCxJQUFJQyxNQUFKLEVBQVlDLFVBQVosRUFBd0JDLFVBQXhCLEVBQW9DQyxNQUFwQyxDQUFuQjtBQUVBLFNBQU9VLElBQVA7QUFDSCxDQWRNO0FBZ0JQOzs7Ozs7Ozs7Ozs7QUFRTyxNQUFNSSxhQUFhLE9BQU9DLFVBQVAsRUFBbUJDLFFBQW5CLEVBQTZCakIsYUFBYSxNQUFNLENBQUUsQ0FBbEQsRUFBb0RDLFNBQVMsRUFBN0QsS0FBb0U7QUFFMUYsUUFBTUgsU0FBU2UsT0FBT0MsSUFBUCxDQUFZRSxVQUFaLENBQWY7QUFDQUMsV0FBU1IsSUFBVCxHQUFnQlgsT0FBT1ksTUFBdkI7QUFDQSxRQUFNQyxPQUFPLE1BQU1kLElBQUlDLE1BQUosRUFBWW1CLFFBQVosRUFBc0JqQixVQUF0QixFQUFrQ0MsTUFBbEMsQ0FBbkI7QUFFQSxTQUFPVSxJQUFQO0FBQ0gsQ0FQTSIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogSVBGUyBpbnRlcmFjdGlvbiByZWxhdGVkIG1ldGhvZHNcbiAqIFRoaXMgZmlsZSBpdCBpcyBhIHBhcnQgb2YgdGhlIFBhbmRvcmEgUHlycmhhIEphdmFzY3JpcHQgbGlicmFyeVxuICogXG4gKiBAZmlsZSBpcGZzLmpzXG4gKiBAYXV0aG9yIEtvc3RpYW50eW4gU215cm5vdiA8a29zdHlzaEBnbWFpbC5jb20+XG4gKiBAZGF0ZSAyMDE4XG4gKi9cbid1c2Ugc3RyaWN0JztcblxuaW1wb3J0ICogYXMgZXhwZWN0IGZyb20gJy4vaGVscGVycy9leHBlY3QnO1xuaW1wb3J0IHtcbiAgICBJUEZTX1JFUVVJUkVEXG59IGZyb20gJy4vaGVscGVycy9lcnJvcnMnO1xuXG4vKipcbiAqIExvYWQgZmlsZSBmcm9tIHdlYiBicm93c2VyIGZzXG4gKiBcbiAqIEBwYXJhbSB7RmlsZX0gZmlsZSBcbiAqIEByZXR1cm5zIHtQcm9taXNlfVxuICovXG5leHBvcnQgY29uc3QgbG9hZEZpbGUgPSAoZmlsZSkgPT4ge1xuICAgIGNvbnN0IHJlYWRlciA9IG5ldyBGaWxlUmVhZGVyKCk7XG5cbiAgICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuICAgICAgICByZWFkZXIub25lcnJvciA9IChlcnJvcikgPT4ge1xuICAgICAgICAgICAgcmVhZGVyLmFib3J0KCk7XG4gICAgICAgICAgICByZWplY3QoZXJyb3IpO1xuICAgICAgICB9O1xuXG4gICAgICAgIHJlYWRlci5vbmxvYWRlbmQgPSAoKSA9PiByZXNvbHZlKHtcbiAgICAgICAgICAgIHJlc3VsdDogcmVhZGVyLnJlc3VsdCxcbiAgICAgICAgICAgIG5hbWU6IGZpbGUubmFtZSxcbiAgICAgICAgICAgIHR5cGU6IGZpbGUudHlwZVxuICAgICAgICB9KTtcbiAgICAgICAgcmVhZGVyLnJlYWRBc0FycmF5QnVmZmVyKGZpbGUpO1xuICAgIH0pOyAgICBcbn07XG5cbi8qKlxuICogU2VuZCBmaWxlIHRvIElQRlNcbiAqIFxuICogQHBhcmFtIHtCdWZmZXJ9IGJ1ZmZlciBcbiAqIEBwYXJhbSB7QXJyYXlCdWZmZXJ9IGxvYWRlZEZpbGUgXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBwcm9ncmVzc0NiIFNhdmluZyBwcm9ncmVzcyBjYWxsYmFjayB3aXRoIHsgZmlsZSwgc2l6ZSwgdHlwZSwgcHJvZ3Jlc3MgfVxuICogQHBhcmFtIHtPYmplY3R9IGNvbmZpZyBMaWJyYXJ5IGNvbmZpZyAocHJvdmlkZWQgYnkgdGhlIHByb3h5IGJ1dCBjYW4gYmUgb3ZlcnJpZGRlbikgXG4gKiBAcmV0dXJucyB7U3RyaW5nfVxuICovXG5leHBvcnQgY29uc3QgYWRkID0gYXN5bmMgKGJ1ZmZlciwgbG9hZGVkRmlsZSwgcHJvZ3Jlc3NDYiA9ICgpID0+IHt9LCBjb25maWcgPSB7fSkgPT4ge1xuXG4gICAgZXhwZWN0LmFsbChjb25maWcsIHtcbiAgICAgICAgJ2lwZnMnOiB7XG4gICAgICAgICAgICB0eXBlOiAnb2JqZWN0JyxcbiAgICAgICAgICAgIGNvZGU6IElQRlNfUkVRVUlSRURcbiAgICAgICAgfVxuICAgIH0pO1xuXG4gICAgY29uc3QgcmVzcG9uc2UgPSBhd2FpdCBjb25maWcuaXBmcy5hZGQoYnVmZmVyLCB7XG4gICAgICAgIHByb2dyZXNzOiBwcm9ncmVzcyA9PiBwcm9ncmVzc0NiKHtcbiAgICAgICAgICAgIGZpbGU6IGxvYWRlZEZpbGUubmFtZSxcbiAgICAgICAgICAgIHNpemU6IGJ1ZmZlci5sZW5ndGgsXG4gICAgICAgICAgICB0eXBlOiBsb2FkZWRGaWxlLnR5cGUsXG4gICAgICAgICAgICBwcm9ncmVzc1xuICAgICAgICB9KVxuICAgIH0pO1xuXG4gICAgcmV0dXJuIHJlc3BvbnNlWzBdLmhhc2g7XG59O1xuXG4vKipcbiAqIFVwbG9hZCBiaW5hcnkgZmlsZSB0byBJUEZTXG4gKiBcbiAqIEBwYXJhbSB7RmlsZX0gZmlsZSBcbiAqIEBwYXJhbSB7RnVuY3Rpb259IFtwcm9ncmVzc0NiPSgpID0+IHt9XSBcbiAqIEByZXR1cm5zIHtTdHJpbmd9XG4gKi9cbmV4cG9ydCBjb25zdCBzdWJtaXRGaWxlID0gYXN5bmMgKGZpbGUsIHByb2dyZXNzQ2IgPSAoKSA9PiB7fSwgY29uZmlnID0ge30pID0+IHtcblxuICAgIGV4cGVjdC5hbGwoY29uZmlnLCB7XG4gICAgICAgICdpcGZzJzoge1xuICAgICAgICAgICAgdHlwZTogJ29iamVjdCcsXG4gICAgICAgICAgICBjb2RlOiBJUEZTX1JFUVVJUkVEXG4gICAgICAgIH1cbiAgICB9KTtcbiAgICBcbiAgICBjb25zdCBsb2FkZWRGaWxlID0gYXdhaXQgbG9hZEZpbGUoZmlsZSk7XG4gICAgY29uc3QgYnVmZmVyID0gQnVmZmVyLmZyb20obG9hZGVkRmlsZS5yZXN1bHQpO1xuICAgIGNvbnN0IGhhc2ggPSBhd2FpdCBhZGQoYnVmZmVyLCBsb2FkZWRGaWxlLCBwcm9ncmVzc0NiLCBjb25maWcpO1xuXG4gICAgcmV0dXJuIGhhc2g7ICAgIFxufTtcblxuLyoqXG4gKiBVcGxvYWQganNvbiBmaWxlIHRvIElQRlNcbiAqIFxuICogQHBhcmFtIHtTdHJpbmd9IGpzb25TdHJpbmcgXG4gKiBAcGFyYW0ge2FueX0gZmlsZUluZm8gXG4gKiBAcGFyYW0ge2FueX0gW3Byb2dyZXNzQ2I9KCkgPT4ge31dIFxuICogQHJldHVybnMgXG4gKi9cbmV4cG9ydCBjb25zdCBzdWJtaXRKc29uID0gYXN5bmMgKGpzb25TdHJpbmcsIGZpbGVJbmZvLCBwcm9ncmVzc0NiID0gKCkgPT4ge30sIGNvbmZpZyA9IHt9KSA9PiB7XG5cbiAgICBjb25zdCBidWZmZXIgPSBCdWZmZXIuZnJvbShqc29uU3RyaW5nKTtcbiAgICBmaWxlSW5mby5zaXplID0gYnVmZmVyLmxlbmd0aDtcbiAgICBjb25zdCBoYXNoID0gYXdhaXQgYWRkKGJ1ZmZlciwgZmlsZUluZm8sIHByb2dyZXNzQ2IsIGNvbmZpZyk7XG4gICAgXG4gICAgcmV0dXJuIGhhc2g7IFxufTtcbiJdfQ==