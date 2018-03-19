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
exports.submitJson = exports.submitFile = exports.add = exports.loadFile = exports.api = void 0;

var _errors = _interopRequireWildcard(require("./helpers/errors"));

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

/**
 * Load file from web browser fs
 * 
 * @returns {Object}
 */
const api = (config = {}) => {
  if (!config.ipfs) {
    throw (0, _errors.default)(_errors.IPFS_REQUIRED);
  }

  return config.ipfs;
};
/**
 * Load file from web browser fs
 * 
 * @param {File} file 
 * @returns {Promise}
 */


exports.api = api;

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
  if (!config.ipfs) {
    throw (0, _errors.default)(_errors.IPFS_REQUIRED);
  }

  try {
    const response = await config.ipfs.add(buffer, {
      progress: progress => progressCb({
        file: loadedFile.name,
        size: buffer.length,
        type: loadedFile.type,
        progress
      })
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
 */


exports.submitFile = submitFile;

const submitJson = async (jsonString, fileInfo, progressCb = () => {}, config = {}) => {
  try {
    const buffer = Buffer.from(jsonString);
    fileInfo.size = buffer.length;
    const hash = await add(buffer, fileInfo, progressCb, config);
    return hash;
  } catch (err) {
    return Promise.reject(err);
  }
};

exports.submitJson = submitJson;