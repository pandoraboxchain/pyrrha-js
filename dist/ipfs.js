/**
 * IPFS interaction related methods
 * This file it is a part of the Pandora Pyrrha Javascript library
 * 
 * @file ipfs.js
 * @author Kostiantyn Smyrnov <kostysh@gmail.com>
 * @date 2018
 */
'use strict';Object.defineProperty(exports, "__esModule", { value: true });exports.submitJson = exports.submitFile = exports.add = exports.loadFile = void 0;

var _errors = _interopRequireWildcard(require("./helpers/errors"));function _interopRequireWildcard(obj) {if (obj && obj.__esModule) {return obj;} else {var newObj = {};if (obj != null) {for (var key in obj) {if (Object.prototype.hasOwnProperty.call(obj, key)) {var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {};if (desc.get || desc.set) {Object.defineProperty(newObj, key, desc);} else {newObj[key] = obj[key];}}}}newObj.default = obj;return newObj;}}



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
      type: file.type });

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
    */exports.loadFile = loadFile;
const add = async (buffer, loadedFile, progressCb = () => {}, config = {}) => {

  if (!config.ipfs) {
    throw (0, _errors.default)(_errors.IPFS_REQUIRED);
  }

  try {
    const response = await config.ipfs.add(buffer, {
      progress: progress => progressCb({
        file: loadedFile.name,
        size: buffer.length,
        type: loadedFile.type,
        progress }) });


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
    */exports.add = add;
const submitFile = async (file, progressCb = () => {}, config = {}) => {

  if (!config.ipfs) {
    throw (0, _errors.default)(_errors.IPFS_REQUIRED);
  }

  try {
    const loadedFile = await loadFile(file);
    const buffer = Buffer.from(loadedFile.result);
    const hash = await add(buffer, loadedFile, progressCb, config);
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
    */exports.submitFile = submitFile;
const submitJson = async (jsonString, fileInfo, progressCb = () => {}, config = {}) => {

  try {
    const buffer = Buffer.from(jsonString);
    fileInfo.size = buffer.length;
    const hash = await add(buffer, fileInfo, progressCb, config);
    return hash;
  } catch (err) {
    return Promise.reject(err);
  }
};exports.submitJson = submitJson;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9pcGZzLmpzIl0sIm5hbWVzIjpbImxvYWRGaWxlIiwiZmlsZSIsInJlYWRlciIsIkZpbGVSZWFkZXIiLCJQcm9taXNlIiwicmVzb2x2ZSIsInJlamVjdCIsIm9uZXJyb3IiLCJlcnJvciIsImFib3J0Iiwib25sb2FkZW5kIiwicmVzdWx0IiwibmFtZSIsInR5cGUiLCJyZWFkQXNBcnJheUJ1ZmZlciIsImFkZCIsImJ1ZmZlciIsImxvYWRlZEZpbGUiLCJwcm9ncmVzc0NiIiwiY29uZmlnIiwiaXBmcyIsIklQRlNfUkVRVUlSRUQiLCJyZXNwb25zZSIsInByb2dyZXNzIiwic2l6ZSIsImxlbmd0aCIsImhhc2giLCJlcnIiLCJzdWJtaXRGaWxlIiwiQnVmZmVyIiwiZnJvbSIsInN1Ym1pdEpzb24iLCJqc29uU3RyaW5nIiwiZmlsZUluZm8iXSwibWFwcGluZ3MiOiJBQUFBOzs7Ozs7OztBQVFBLGE7O0FBRUEsbUU7Ozs7QUFJQTs7Ozs7O0FBTU8sTUFBTUEsV0FBWUMsSUFBRCxJQUFVO0FBQzlCLFFBQU1DLFNBQVMsSUFBSUMsVUFBSixFQUFmOztBQUVBLFNBQU8sSUFBSUMsT0FBSixDQUFZLENBQUNDLE9BQUQsRUFBVUMsTUFBVixLQUFxQjtBQUNwQ0osV0FBT0ssT0FBUCxHQUFrQkMsS0FBRCxJQUFXO0FBQ3hCTixhQUFPTyxLQUFQO0FBQ0FILGFBQU9FLEtBQVA7QUFDSCxLQUhEOztBQUtBTixXQUFPUSxTQUFQLEdBQW1CLE1BQU1MLFFBQVE7QUFDN0JNLGNBQVFULE9BQU9TLE1BRGM7QUFFN0JDLFlBQU1YLEtBQUtXLElBRmtCO0FBRzdCQyxZQUFNWixLQUFLWSxJQUhrQixFQUFSLENBQXpCOztBQUtBWCxXQUFPWSxpQkFBUCxDQUF5QmIsSUFBekI7QUFDSCxHQVpNLENBQVA7QUFhSCxDQWhCTTs7QUFrQlA7Ozs7Ozs7OztBQVNPLE1BQU1jLE1BQU0sT0FBT0MsTUFBUCxFQUFlQyxVQUFmLEVBQTJCQyxhQUFhLE1BQU0sQ0FBRSxDQUFoRCxFQUFrREMsU0FBUyxFQUEzRCxLQUFrRTs7QUFFakYsTUFBSSxDQUFDQSxPQUFPQyxJQUFaLEVBQWtCO0FBQ2QsVUFBTSxxQkFBU0MscUJBQVQsQ0FBTjtBQUNIOztBQUVELE1BQUk7QUFDQSxVQUFNQyxXQUFXLE1BQU1ILE9BQU9DLElBQVAsQ0FBWUwsR0FBWixDQUFnQkMsTUFBaEIsRUFBd0I7QUFDM0NPLGdCQUFVQSxZQUFZTCxXQUFXO0FBQzdCakIsY0FBTWdCLFdBQVdMLElBRFk7QUFFN0JZLGNBQU1SLE9BQU9TLE1BRmdCO0FBRzdCWixjQUFNSSxXQUFXSixJQUhZO0FBSTdCVSxnQkFKNkIsRUFBWCxDQURxQixFQUF4QixDQUF2Qjs7O0FBUUEsV0FBT0QsU0FBUyxDQUFULEVBQVlJLElBQW5CO0FBQ0gsR0FWRCxDQVVFLE9BQU1DLEdBQU4sRUFBVztBQUNULFdBQU92QixRQUFRRSxNQUFSLENBQWVxQixHQUFmLENBQVA7QUFDSDtBQUNKLENBbkJNOztBQXFCUDs7Ozs7OztBQU9PLE1BQU1DLGFBQWEsT0FBTzNCLElBQVAsRUFBYWlCLGFBQWEsTUFBTSxDQUFFLENBQWxDLEVBQW9DQyxTQUFTLEVBQTdDLEtBQW9EOztBQUUxRSxNQUFJLENBQUNBLE9BQU9DLElBQVosRUFBa0I7QUFDZCxVQUFNLHFCQUFTQyxxQkFBVCxDQUFOO0FBQ0g7O0FBRUQsTUFBSTtBQUNBLFVBQU1KLGFBQWEsTUFBTWpCLFNBQVNDLElBQVQsQ0FBekI7QUFDQSxVQUFNZSxTQUFTYSxPQUFPQyxJQUFQLENBQVliLFdBQVdOLE1BQXZCLENBQWY7QUFDQSxVQUFNZSxPQUFPLE1BQU1YLElBQUlDLE1BQUosRUFBWUMsVUFBWixFQUF3QkMsVUFBeEIsRUFBb0NDLE1BQXBDLENBQW5CO0FBQ0EsV0FBT08sSUFBUDtBQUNILEdBTEQsQ0FLRSxPQUFNQyxHQUFOLEVBQVc7QUFDVCxXQUFPdkIsUUFBUUUsTUFBUixDQUFlcUIsR0FBZixDQUFQO0FBQ0g7QUFDSixDQWRNOztBQWdCUDs7Ozs7Ozs7QUFRTyxNQUFNSSxhQUFhLE9BQU9DLFVBQVAsRUFBbUJDLFFBQW5CLEVBQTZCZixhQUFhLE1BQU0sQ0FBRSxDQUFsRCxFQUFvREMsU0FBUyxFQUE3RCxLQUFvRTs7QUFFMUYsTUFBSTtBQUNBLFVBQU1ILFNBQVNhLE9BQU9DLElBQVAsQ0FBWUUsVUFBWixDQUFmO0FBQ0FDLGFBQVNULElBQVQsR0FBZ0JSLE9BQU9TLE1BQXZCO0FBQ0EsVUFBTUMsT0FBTyxNQUFNWCxJQUFJQyxNQUFKLEVBQVlpQixRQUFaLEVBQXNCZixVQUF0QixFQUFrQ0MsTUFBbEMsQ0FBbkI7QUFDQSxXQUFPTyxJQUFQO0FBQ0gsR0FMRCxDQUtFLE9BQU1DLEdBQU4sRUFBVztBQUNULFdBQU92QixRQUFRRSxNQUFSLENBQWVxQixHQUFmLENBQVA7QUFDSDtBQUNKLENBVk0sQyIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogSVBGUyBpbnRlcmFjdGlvbiByZWxhdGVkIG1ldGhvZHNcbiAqIFRoaXMgZmlsZSBpdCBpcyBhIHBhcnQgb2YgdGhlIFBhbmRvcmEgUHlycmhhIEphdmFzY3JpcHQgbGlicmFyeVxuICogXG4gKiBAZmlsZSBpcGZzLmpzXG4gKiBAYXV0aG9yIEtvc3RpYW50eW4gU215cm5vdiA8a29zdHlzaEBnbWFpbC5jb20+XG4gKiBAZGF0ZSAyMDE4XG4gKi9cbid1c2Ugc3RyaWN0JztcblxuaW1wb3J0IHBqc0Vycm9yLCB7XG4gICAgSVBGU19SRVFVSVJFRFxufSBmcm9tICcuL2hlbHBlcnMvZXJyb3JzJztcblxuLyoqXG4gKiBMb2FkIGZpbGUgZnJvbSB3ZWIgYnJvd3NlciBmc1xuICogXG4gKiBAcGFyYW0ge0ZpbGV9IGZpbGUgXG4gKiBAcmV0dXJucyB7UHJvbWlzZX1cbiAqL1xuZXhwb3J0IGNvbnN0IGxvYWRGaWxlID0gKGZpbGUpID0+IHtcbiAgICBjb25zdCByZWFkZXIgPSBuZXcgRmlsZVJlYWRlcigpO1xuXG4gICAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcbiAgICAgICAgcmVhZGVyLm9uZXJyb3IgPSAoZXJyb3IpID0+IHtcbiAgICAgICAgICAgIHJlYWRlci5hYm9ydCgpO1xuICAgICAgICAgICAgcmVqZWN0KGVycm9yKTtcbiAgICAgICAgfTtcblxuICAgICAgICByZWFkZXIub25sb2FkZW5kID0gKCkgPT4gcmVzb2x2ZSh7XG4gICAgICAgICAgICByZXN1bHQ6IHJlYWRlci5yZXN1bHQsXG4gICAgICAgICAgICBuYW1lOiBmaWxlLm5hbWUsXG4gICAgICAgICAgICB0eXBlOiBmaWxlLnR5cGVcbiAgICAgICAgfSk7XG4gICAgICAgIHJlYWRlci5yZWFkQXNBcnJheUJ1ZmZlcihmaWxlKTtcbiAgICB9KTsgICAgXG59O1xuXG4vKipcbiAqIFNlbmQgZmlsZSB0byBJUEZTXG4gKiBcbiAqIEBwYXJhbSB7QnVmZmVyfSBidWZmZXIgXG4gKiBAcGFyYW0ge0FycmF5QnVmZmVyfSBsb2FkZWRGaWxlIFxuICogQHBhcmFtIHtGdW5jdGlvbn0gcHJvZ3Jlc3NDYiBTYXZpbmcgcHJvZ3Jlc3MgY2FsbGJhY2sgd2l0aCB7IGZpbGUsIHNpemUsIHR5cGUsIHByb2dyZXNzIH1cbiAqIEBwYXJhbSB7T2JqZWN0fSBjb25maWcgTGlicmFyeSBjb25maWcgKHByb3ZpZGVkIGJ5IHRoZSBwcm94eSBidXQgY2FuIGJlIG92ZXJyaWRkZW4pIFxuICogQHJldHVybnMge1N0cmluZ31cbiAqL1xuZXhwb3J0IGNvbnN0IGFkZCA9IGFzeW5jIChidWZmZXIsIGxvYWRlZEZpbGUsIHByb2dyZXNzQ2IgPSAoKSA9PiB7fSwgY29uZmlnID0ge30pID0+IHtcblxuICAgIGlmICghY29uZmlnLmlwZnMpIHtcbiAgICAgICAgdGhyb3cgcGpzRXJyb3IoSVBGU19SRVFVSVJFRCk7XG4gICAgfVxuXG4gICAgdHJ5IHtcbiAgICAgICAgY29uc3QgcmVzcG9uc2UgPSBhd2FpdCBjb25maWcuaXBmcy5hZGQoYnVmZmVyLCB7XG4gICAgICAgICAgICBwcm9ncmVzczogcHJvZ3Jlc3MgPT4gcHJvZ3Jlc3NDYih7XG4gICAgICAgICAgICAgICAgZmlsZTogbG9hZGVkRmlsZS5uYW1lLFxuICAgICAgICAgICAgICAgIHNpemU6IGJ1ZmZlci5sZW5ndGgsXG4gICAgICAgICAgICAgICAgdHlwZTogbG9hZGVkRmlsZS50eXBlLFxuICAgICAgICAgICAgICAgIHByb2dyZXNzXG4gICAgICAgICAgICB9KVxuICAgICAgICB9KTtcbiAgICAgICAgcmV0dXJuIHJlc3BvbnNlWzBdLmhhc2g7XG4gICAgfSBjYXRjaChlcnIpIHtcbiAgICAgICAgcmV0dXJuIFByb21pc2UucmVqZWN0KGVycik7XG4gICAgfVxufTtcblxuLyoqXG4gKiBVcGxvYWQgYmluYXJ5IGZpbGUgdG8gSVBGU1xuICogXG4gKiBAcGFyYW0ge0ZpbGV9IGZpbGUgXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBbcHJvZ3Jlc3NDYj0oKSA9PiB7fV0gXG4gKiBAcmV0dXJucyB7U3RyaW5nfVxuICovXG5leHBvcnQgY29uc3Qgc3VibWl0RmlsZSA9IGFzeW5jIChmaWxlLCBwcm9ncmVzc0NiID0gKCkgPT4ge30sIGNvbmZpZyA9IHt9KSA9PiB7XG5cbiAgICBpZiAoIWNvbmZpZy5pcGZzKSB7XG4gICAgICAgIHRocm93IHBqc0Vycm9yKElQRlNfUkVRVUlSRUQpO1xuICAgIH1cbiAgICBcbiAgICB0cnkge1xuICAgICAgICBjb25zdCBsb2FkZWRGaWxlID0gYXdhaXQgbG9hZEZpbGUoZmlsZSk7XG4gICAgICAgIGNvbnN0IGJ1ZmZlciA9IEJ1ZmZlci5mcm9tKGxvYWRlZEZpbGUucmVzdWx0KTtcbiAgICAgICAgY29uc3QgaGFzaCA9IGF3YWl0IGFkZChidWZmZXIsIGxvYWRlZEZpbGUsIHByb2dyZXNzQ2IsIGNvbmZpZyk7XG4gICAgICAgIHJldHVybiBoYXNoO1xuICAgIH0gY2F0Y2goZXJyKSB7XG4gICAgICAgIHJldHVybiBQcm9taXNlLnJlamVjdChlcnIpO1xuICAgIH0gICAgXG59O1xuXG4vKipcbiAqIFVwbG9hZCBqc29uIGZpbGUgdG8gSVBGU1xuICogXG4gKiBAcGFyYW0ge1N0cmluZ30ganNvblN0cmluZyBcbiAqIEBwYXJhbSB7YW55fSBmaWxlSW5mbyBcbiAqIEBwYXJhbSB7YW55fSBbcHJvZ3Jlc3NDYj0oKSA9PiB7fV0gXG4gKiBAcmV0dXJucyBcbiAqL1xuZXhwb3J0IGNvbnN0IHN1Ym1pdEpzb24gPSBhc3luYyAoanNvblN0cmluZywgZmlsZUluZm8sIHByb2dyZXNzQ2IgPSAoKSA9PiB7fSwgY29uZmlnID0ge30pID0+IHtcblxuICAgIHRyeSB7XG4gICAgICAgIGNvbnN0IGJ1ZmZlciA9IEJ1ZmZlci5mcm9tKGpzb25TdHJpbmcpO1xuICAgICAgICBmaWxlSW5mby5zaXplID0gYnVmZmVyLmxlbmd0aDtcbiAgICAgICAgY29uc3QgaGFzaCA9IGF3YWl0IGFkZChidWZmZXIsIGZpbGVJbmZvLCBwcm9ncmVzc0NiLCBjb25maWcpO1xuICAgICAgICByZXR1cm4gaGFzaDtcbiAgICB9IGNhdGNoKGVycikge1xuICAgICAgICByZXR1cm4gUHJvbWlzZS5yZWplY3QoZXJyKTtcbiAgICB9IFxufTtcbiJdfQ==