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

var _errors = _interopRequireWildcard(require("./helpers/errors"));

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

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

var add = async function add(buffer, loadedFile) {
  var progressCb = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : function () {};
  var config = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : {};

  if (!config.ipfs) {
    throw (0, _errors.default)(_errors.IPFS_REQUIRED);
  }

  try {
    var response = await config.ipfs.add(buffer, {
      progress: function progress(_progress) {
        return progressCb({
          file: loadedFile.name,
          size: buffer.length,
          type: loadedFile.type,
          progress: _progress
        });
      }
    });
    return response[0].hash;
  } catch (err) {
    return Promise.reject(err);
  }
};
/**
 * Upload binary file to IPFS
 * 
 * @param {File} file 
 * @param {Function} [progressCb=() => {}] 
 * @returns {String}
 */


exports.add = add;

var submitFile = async function submitFile(file) {
  var progressCb = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : function () {};
  var config = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};

  if (!config.ipfs) {
    throw (0, _errors.default)(_errors.IPFS_REQUIRED);
  }

  try {
    var loadedFile = await loadFile(file);
    var buffer = Buffer.from(loadedFile.result);
    var hash = await add(buffer, loadedFile, progressCb, config);
    return hash;
  } catch (err) {
    return Promise.reject(err);
  }
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

var submitJson = async function submitJson(jsonString, fileInfo) {
  var progressCb = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : function () {};
  var config = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : {};

  try {
    var buffer = Buffer.from(jsonString);
    fileInfo.size = buffer.length;
    var hash = await add(buffer, fileInfo, progressCb, config);
    return hash;
  } catch (err) {
    return Promise.reject(err);
  }
};

exports.submitJson = submitJson;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9pcGZzLmpzIl0sIm5hbWVzIjpbImxvYWRGaWxlIiwiZmlsZSIsInJlYWRlciIsIkZpbGVSZWFkZXIiLCJQcm9taXNlIiwicmVzb2x2ZSIsInJlamVjdCIsIm9uZXJyb3IiLCJlcnJvciIsImFib3J0Iiwib25sb2FkZW5kIiwicmVzdWx0IiwibmFtZSIsInR5cGUiLCJyZWFkQXNBcnJheUJ1ZmZlciIsImFkZCIsImJ1ZmZlciIsImxvYWRlZEZpbGUiLCJwcm9ncmVzc0NiIiwiY29uZmlnIiwiaXBmcyIsIklQRlNfUkVRVUlSRUQiLCJyZXNwb25zZSIsInByb2dyZXNzIiwic2l6ZSIsImxlbmd0aCIsImhhc2giLCJlcnIiLCJzdWJtaXRGaWxlIiwiQnVmZmVyIiwiZnJvbSIsInN1Ym1pdEpzb24iLCJqc29uU3RyaW5nIiwiZmlsZUluZm8iXSwibWFwcGluZ3MiOiJBQUFBOzs7Ozs7OztBQVFBOzs7Ozs7O0FBRUE7Ozs7QUFJQTs7Ozs7O0FBTU8sSUFBTUEsV0FBVyxTQUFYQSxRQUFXLENBQUNDLElBQUQsRUFBVTtBQUM5QixNQUFNQyxTQUFTLElBQUlDLFVBQUosRUFBZjtBQUVBLFNBQU8sSUFBSUMsT0FBSixDQUFZLFVBQUNDLE9BQUQsRUFBVUMsTUFBVixFQUFxQjtBQUNwQ0osV0FBT0ssT0FBUCxHQUFpQixVQUFDQyxLQUFELEVBQVc7QUFDeEJOLGFBQU9PLEtBQVA7QUFDQUgsYUFBT0UsS0FBUDtBQUNILEtBSEQ7O0FBS0FOLFdBQU9RLFNBQVAsR0FBbUI7QUFBQSxhQUFNTCxRQUFRO0FBQzdCTSxnQkFBUVQsT0FBT1MsTUFEYztBQUU3QkMsY0FBTVgsS0FBS1csSUFGa0I7QUFHN0JDLGNBQU1aLEtBQUtZO0FBSGtCLE9BQVIsQ0FBTjtBQUFBLEtBQW5COztBQUtBWCxXQUFPWSxpQkFBUCxDQUF5QmIsSUFBekI7QUFDSCxHQVpNLENBQVA7QUFhSCxDQWhCTTtBQWtCUDs7Ozs7Ozs7Ozs7OztBQVNPLElBQU1jLE1BQU0sZUFBTkEsR0FBTSxDQUFPQyxNQUFQLEVBQWVDLFVBQWYsRUFBa0U7QUFBQSxNQUF2Q0MsVUFBdUMsdUVBQTFCLFlBQU0sQ0FBRSxDQUFrQjtBQUFBLE1BQWhCQyxNQUFnQix1RUFBUCxFQUFPOztBQUVqRixNQUFJLENBQUNBLE9BQU9DLElBQVosRUFBa0I7QUFDZCxVQUFNLHFCQUFTQyxxQkFBVCxDQUFOO0FBQ0g7O0FBRUQsTUFBSTtBQUNBLFFBQU1DLFdBQVcsTUFBTUgsT0FBT0MsSUFBUCxDQUFZTCxHQUFaLENBQWdCQyxNQUFoQixFQUF3QjtBQUMzQ08sZ0JBQVU7QUFBQSxlQUFZTCxXQUFXO0FBQzdCakIsZ0JBQU1nQixXQUFXTCxJQURZO0FBRTdCWSxnQkFBTVIsT0FBT1MsTUFGZ0I7QUFHN0JaLGdCQUFNSSxXQUFXSixJQUhZO0FBSTdCVTtBQUo2QixTQUFYLENBQVo7QUFBQTtBQURpQyxLQUF4QixDQUF2QjtBQVFBLFdBQU9ELFNBQVMsQ0FBVCxFQUFZSSxJQUFuQjtBQUNILEdBVkQsQ0FVRSxPQUFNQyxHQUFOLEVBQVc7QUFDVCxXQUFPdkIsUUFBUUUsTUFBUixDQUFlcUIsR0FBZixDQUFQO0FBQ0g7QUFDSixDQW5CTTtBQXFCUDs7Ozs7Ozs7Ozs7QUFPTyxJQUFNQyxhQUFhLGVBQWJBLFVBQWEsQ0FBTzNCLElBQVAsRUFBb0Q7QUFBQSxNQUF2Q2lCLFVBQXVDLHVFQUExQixZQUFNLENBQUUsQ0FBa0I7QUFBQSxNQUFoQkMsTUFBZ0IsdUVBQVAsRUFBTzs7QUFFMUUsTUFBSSxDQUFDQSxPQUFPQyxJQUFaLEVBQWtCO0FBQ2QsVUFBTSxxQkFBU0MscUJBQVQsQ0FBTjtBQUNIOztBQUVELE1BQUk7QUFDQSxRQUFNSixhQUFhLE1BQU1qQixTQUFTQyxJQUFULENBQXpCO0FBQ0EsUUFBTWUsU0FBU2EsT0FBT0MsSUFBUCxDQUFZYixXQUFXTixNQUF2QixDQUFmO0FBQ0EsUUFBTWUsT0FBTyxNQUFNWCxJQUFJQyxNQUFKLEVBQVlDLFVBQVosRUFBd0JDLFVBQXhCLEVBQW9DQyxNQUFwQyxDQUFuQjtBQUNBLFdBQU9PLElBQVA7QUFDSCxHQUxELENBS0UsT0FBTUMsR0FBTixFQUFXO0FBQ1QsV0FBT3ZCLFFBQVFFLE1BQVIsQ0FBZXFCLEdBQWYsQ0FBUDtBQUNIO0FBQ0osQ0FkTTtBQWdCUDs7Ozs7Ozs7Ozs7O0FBUU8sSUFBTUksYUFBYSxlQUFiQSxVQUFhLENBQU9DLFVBQVAsRUFBbUJDLFFBQW5CLEVBQW9FO0FBQUEsTUFBdkNmLFVBQXVDLHVFQUExQixZQUFNLENBQUUsQ0FBa0I7QUFBQSxNQUFoQkMsTUFBZ0IsdUVBQVAsRUFBTzs7QUFFMUYsTUFBSTtBQUNBLFFBQU1ILFNBQVNhLE9BQU9DLElBQVAsQ0FBWUUsVUFBWixDQUFmO0FBQ0FDLGFBQVNULElBQVQsR0FBZ0JSLE9BQU9TLE1BQXZCO0FBQ0EsUUFBTUMsT0FBTyxNQUFNWCxJQUFJQyxNQUFKLEVBQVlpQixRQUFaLEVBQXNCZixVQUF0QixFQUFrQ0MsTUFBbEMsQ0FBbkI7QUFDQSxXQUFPTyxJQUFQO0FBQ0gsR0FMRCxDQUtFLE9BQU1DLEdBQU4sRUFBVztBQUNULFdBQU92QixRQUFRRSxNQUFSLENBQWVxQixHQUFmLENBQVA7QUFDSDtBQUNKLENBVk0iLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIElQRlMgaW50ZXJhY3Rpb24gcmVsYXRlZCBtZXRob2RzXG4gKiBUaGlzIGZpbGUgaXQgaXMgYSBwYXJ0IG9mIHRoZSBQYW5kb3JhIFB5cnJoYSBKYXZhc2NyaXB0IGxpYnJhcnlcbiAqIFxuICogQGZpbGUgaXBmcy5qc1xuICogQGF1dGhvciBLb3N0aWFudHluIFNteXJub3YgPGtvc3R5c2hAZ21haWwuY29tPlxuICogQGRhdGUgMjAxOFxuICovXG4ndXNlIHN0cmljdCc7XG5cbmltcG9ydCBwanNFcnJvciwge1xuICAgIElQRlNfUkVRVUlSRURcbn0gZnJvbSAnLi9oZWxwZXJzL2Vycm9ycyc7XG5cbi8qKlxuICogTG9hZCBmaWxlIGZyb20gd2ViIGJyb3dzZXIgZnNcbiAqIFxuICogQHBhcmFtIHtGaWxlfSBmaWxlIFxuICogQHJldHVybnMge1Byb21pc2V9XG4gKi9cbmV4cG9ydCBjb25zdCBsb2FkRmlsZSA9IChmaWxlKSA9PiB7XG4gICAgY29uc3QgcmVhZGVyID0gbmV3IEZpbGVSZWFkZXIoKTtcblxuICAgIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG4gICAgICAgIHJlYWRlci5vbmVycm9yID0gKGVycm9yKSA9PiB7XG4gICAgICAgICAgICByZWFkZXIuYWJvcnQoKTtcbiAgICAgICAgICAgIHJlamVjdChlcnJvcik7XG4gICAgICAgIH07XG5cbiAgICAgICAgcmVhZGVyLm9ubG9hZGVuZCA9ICgpID0+IHJlc29sdmUoe1xuICAgICAgICAgICAgcmVzdWx0OiByZWFkZXIucmVzdWx0LFxuICAgICAgICAgICAgbmFtZTogZmlsZS5uYW1lLFxuICAgICAgICAgICAgdHlwZTogZmlsZS50eXBlXG4gICAgICAgIH0pO1xuICAgICAgICByZWFkZXIucmVhZEFzQXJyYXlCdWZmZXIoZmlsZSk7XG4gICAgfSk7ICAgIFxufTtcblxuLyoqXG4gKiBTZW5kIGZpbGUgdG8gSVBGU1xuICogXG4gKiBAcGFyYW0ge0J1ZmZlcn0gYnVmZmVyIFxuICogQHBhcmFtIHtBcnJheUJ1ZmZlcn0gbG9hZGVkRmlsZSBcbiAqIEBwYXJhbSB7RnVuY3Rpb259IHByb2dyZXNzQ2IgU2F2aW5nIHByb2dyZXNzIGNhbGxiYWNrIHdpdGggeyBmaWxlLCBzaXplLCB0eXBlLCBwcm9ncmVzcyB9XG4gKiBAcGFyYW0ge09iamVjdH0gY29uZmlnIExpYnJhcnkgY29uZmlnIChwcm92aWRlZCBieSB0aGUgcHJveHkgYnV0IGNhbiBiZSBvdmVycmlkZGVuKSBcbiAqIEByZXR1cm5zIHtTdHJpbmd9XG4gKi9cbmV4cG9ydCBjb25zdCBhZGQgPSBhc3luYyAoYnVmZmVyLCBsb2FkZWRGaWxlLCBwcm9ncmVzc0NiID0gKCkgPT4ge30sIGNvbmZpZyA9IHt9KSA9PiB7XG5cbiAgICBpZiAoIWNvbmZpZy5pcGZzKSB7XG4gICAgICAgIHRocm93IHBqc0Vycm9yKElQRlNfUkVRVUlSRUQpO1xuICAgIH1cblxuICAgIHRyeSB7XG4gICAgICAgIGNvbnN0IHJlc3BvbnNlID0gYXdhaXQgY29uZmlnLmlwZnMuYWRkKGJ1ZmZlciwge1xuICAgICAgICAgICAgcHJvZ3Jlc3M6IHByb2dyZXNzID0+IHByb2dyZXNzQ2Ioe1xuICAgICAgICAgICAgICAgIGZpbGU6IGxvYWRlZEZpbGUubmFtZSxcbiAgICAgICAgICAgICAgICBzaXplOiBidWZmZXIubGVuZ3RoLFxuICAgICAgICAgICAgICAgIHR5cGU6IGxvYWRlZEZpbGUudHlwZSxcbiAgICAgICAgICAgICAgICBwcm9ncmVzc1xuICAgICAgICAgICAgfSlcbiAgICAgICAgfSk7XG4gICAgICAgIHJldHVybiByZXNwb25zZVswXS5oYXNoO1xuICAgIH0gY2F0Y2goZXJyKSB7XG4gICAgICAgIHJldHVybiBQcm9taXNlLnJlamVjdChlcnIpO1xuICAgIH1cbn07XG5cbi8qKlxuICogVXBsb2FkIGJpbmFyeSBmaWxlIHRvIElQRlNcbiAqIFxuICogQHBhcmFtIHtGaWxlfSBmaWxlIFxuICogQHBhcmFtIHtGdW5jdGlvbn0gW3Byb2dyZXNzQ2I9KCkgPT4ge31dIFxuICogQHJldHVybnMge1N0cmluZ31cbiAqL1xuZXhwb3J0IGNvbnN0IHN1Ym1pdEZpbGUgPSBhc3luYyAoZmlsZSwgcHJvZ3Jlc3NDYiA9ICgpID0+IHt9LCBjb25maWcgPSB7fSkgPT4ge1xuXG4gICAgaWYgKCFjb25maWcuaXBmcykge1xuICAgICAgICB0aHJvdyBwanNFcnJvcihJUEZTX1JFUVVJUkVEKTtcbiAgICB9XG4gICAgXG4gICAgdHJ5IHtcbiAgICAgICAgY29uc3QgbG9hZGVkRmlsZSA9IGF3YWl0IGxvYWRGaWxlKGZpbGUpO1xuICAgICAgICBjb25zdCBidWZmZXIgPSBCdWZmZXIuZnJvbShsb2FkZWRGaWxlLnJlc3VsdCk7XG4gICAgICAgIGNvbnN0IGhhc2ggPSBhd2FpdCBhZGQoYnVmZmVyLCBsb2FkZWRGaWxlLCBwcm9ncmVzc0NiLCBjb25maWcpO1xuICAgICAgICByZXR1cm4gaGFzaDtcbiAgICB9IGNhdGNoKGVycikge1xuICAgICAgICByZXR1cm4gUHJvbWlzZS5yZWplY3QoZXJyKTtcbiAgICB9ICAgIFxufTtcblxuLyoqXG4gKiBVcGxvYWQganNvbiBmaWxlIHRvIElQRlNcbiAqIFxuICogQHBhcmFtIHtTdHJpbmd9IGpzb25TdHJpbmcgXG4gKiBAcGFyYW0ge2FueX0gZmlsZUluZm8gXG4gKiBAcGFyYW0ge2FueX0gW3Byb2dyZXNzQ2I9KCkgPT4ge31dIFxuICogQHJldHVybnMgXG4gKi9cbmV4cG9ydCBjb25zdCBzdWJtaXRKc29uID0gYXN5bmMgKGpzb25TdHJpbmcsIGZpbGVJbmZvLCBwcm9ncmVzc0NiID0gKCkgPT4ge30sIGNvbmZpZyA9IHt9KSA9PiB7XG5cbiAgICB0cnkge1xuICAgICAgICBjb25zdCBidWZmZXIgPSBCdWZmZXIuZnJvbShqc29uU3RyaW5nKTtcbiAgICAgICAgZmlsZUluZm8uc2l6ZSA9IGJ1ZmZlci5sZW5ndGg7XG4gICAgICAgIGNvbnN0IGhhc2ggPSBhd2FpdCBhZGQoYnVmZmVyLCBmaWxlSW5mbywgcHJvZ3Jlc3NDYiwgY29uZmlnKTtcbiAgICAgICAgcmV0dXJuIGhhc2g7XG4gICAgfSBjYXRjaChlcnIpIHtcbiAgICAgICAgcmV0dXJuIFByb21pc2UucmVqZWN0KGVycik7XG4gICAgfSBcbn07XG4iXX0=