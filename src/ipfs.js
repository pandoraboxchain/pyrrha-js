/**
 * IPFS interaction related methods
 * This file it is a part of the Pandora Pyrrha Javascript library
 * 
 * @file ipfs.js
 * @author Kostiantyn Smyrnov <kostysh@gmail.com>
 * @date 2018
 */
'use strict';

import pjsError, {
    IPFS_REQUIRED
} from './helpers/errors';

/**
 * Load file from web browser fs
 * 
 * @param {File} file 
 * @returns {Promise}
 */
export const loadFile = (file) => {
    const reader = new FileReader();

    return new Promise((resolve, reject) => {
        reader.onerror = (error) => {
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
export const add = async (buffer, loadedFile, progressCb = () => {}, config = {}) => {

    if (!config.ipfs) {
        throw pjsError(IPFS_REQUIRED);
    }

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
export const submitFile = async (file, progressCb = () => {}, config = {}) => {

    if (!config.ipfs) {
        throw pjsError(IPFS_REQUIRED);
    }
    
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
export const submitJson = async (jsonString, fileInfo, progressCb = () => {}, config = {}) => {

    const buffer = Buffer.from(jsonString);
    fileInfo.size = buffer.length;
    const hash = await add(buffer, fileInfo, progressCb, config);
    
    return hash; 
};
