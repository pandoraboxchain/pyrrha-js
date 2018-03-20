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