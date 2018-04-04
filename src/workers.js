/**
 * WorkerNodes related methods
 * This file it is a part of the Pandora Pyrrha Javascript library
 * 
 * @file workers.js
 * @author Kostiantyn Smyrnov <kostysh@gmail.com>
 * @date 2018
 */

'use strict';

import * as expect from './helpers/expect';
import {
    CONTRACT_REQUIRED,
    ADDRESS_REQUIRED,
    WEB3_REQUIRED
} from './helpers/errors';

import { fetchState as fetchJobState } from './jobs';

/**
 * Get worker nodes count from Pandora contract
 * 
 * @param {Object} config Library config (provided by the proxy but can be overridden)
 * @returns {Promise} A Promise object represents the {number} 
 */
export const fetchCount = async (config = {}) => {

    expect.all(config, {
        'web3': {
            type: 'object',
            code: WEB3_REQUIRED
        },
        'contracts.Pandora.abi': {
            type: 'object',
            code: CONTRACT_REQUIRED,
            args: ['Pandora']
        },
        'addresses.Pandora': {
            type: 'string',
            code: ADDRESS_REQUIRED,
            args: ['Pandora']
        }
    });

    const pan = new config.web3.eth.Contract(config.contracts.Pandora.abi, config.addresses.Pandora);
    const count = await pan.methods
        .workerNodesCount()
        .call();

    return Number.parseInt(count, 10);
};

/**
 * Get worker address from Pandora contract by the worker Id
 * 
 * @param {integer} id Worker Id
 * @param {Object} config Library config (provided by the proxy but can be overridden)
 * @returns {Promise} A Promise object represents the {string} 
 */
export const fetchAddressById = async (id, config = {}) => {

    expect.all(config, {
        'web3': {
            type: 'object',
            code: WEB3_REQUIRED
        },
        'contracts.Pandora.abi': {
            type: 'object',
            code: CONTRACT_REQUIRED,
            args: ['Pandora']
        },
        'addresses.Pandora': {
            type: 'string',
            code: ADDRESS_REQUIRED,
            args: ['Pandora']
        }
    });

    const pan = new config.web3.eth.Contract(config.contracts.Pandora.abi, config.addresses.Pandora);
    const address = await pan.methods
        .workerNodes(id)
        .call();

    return String(address);
};

/**
 * Get worker state from Worker contract by the worker address
 * 
 * @param {string} address 
 * @param {Object} config Library config (provided by the proxy but can be overridden)
 * @returns {Promise} A Promise object represents the {number}
 */
export const fetchState = async (address, config = {}) => {

    expect.all(config, {
        'web3': {
            type: 'object',
            code: WEB3_REQUIRED
        },
        'contracts.WorkerNode.abi': {
            type: 'object',
            code: CONTRACT_REQUIRED,
            args: ['WorkerNode']
        }
    });

    const wor = new config.web3.eth.Contract(config.contracts.WorkerNode.abi, address);    
    const state = await wor.methods
        .currentState()
        .call();

    return Number.parseInt(state, 10);
};

/**
 * Get worker reputation from Worker contract by the worker address
 * 
 * @param {string} address 
 * @param {Object} config Library config (provided by the proxy but can be overridden)
 * @returns {Promise} A Promise object represents the {number}
 */
export const fetchReputation = async (address, config = {}) => {

    expect.all(config, {
        'web3': {
            type: 'object',
            code: WEB3_REQUIRED
        },
        'contracts.WorkerNode.abi': {
            type: 'object',
            code: CONTRACT_REQUIRED,
            args: ['WorkerNode']
        }
    });

    const wor = new config.web3.eth.Contract(config.contracts.WorkerNode.abi, address);
    const reputation = await wor.methods
        .reputation()
        .call();

    return Number.parseInt(reputation, 10);
};

/**
 * Get worker's active job from Worker contract by the worker address
 * 
 * @param {string} address 
 * @param {Object} config Library config (provided by the proxy but can be overridden)
 * @returns {Promise} A Promise object represents the {string}
 */
export const fetchActiveJobAddress = async (address, config = {}) => {

    expect.all(config, {
        'web3': {
            type: 'object',
            code: WEB3_REQUIRED
        },
        'contracts.WorkerNode.abi': {
            type: 'object',
            code: CONTRACT_REQUIRED,
            args: ['WorkerNode']
        }
    });

    const wor = new config.web3.eth.Contract(config.contracts.WorkerNode.abi, address);
    const activeJob = await wor.methods
        .activeJob()
        .call();

    return String(activeJob, 10);
};

/**
 * Get worker by the worker's address
 * 
 * @param {string} address
 * @param {Object} config Library config (provided by the proxy but can be overridden)
 * @returns {Promise} A Promise object represents the {Object}
 */
export const fetchWorker = async (address, config = {}) => {
    
    const currentState = await fetchState(address, config);
    const reputation = await fetchReputation(address, config);

    let activeJob = await fetchActiveJobAddress(address, config);
    let jobState;

    // Check is not 0x0
    if (+activeJob !== 0) {

        jobState = await fetchJobState(activeJob, config);
    } else {
        activeJob = null;
        jobState = -1;
    }

    return {
        address,
        currentState,
        reputation,
        currentJob: activeJob,
        currentJobStatus: jobState
    };
};

/**
 * Get worker by the worker's id
 * 
 * @param {integer} id 
 * @param {Object} config Library config (provided by the proxy but can be overridden)
 * @returns {Promise} A Promise object represents the {Object}
 */
export const fetchWorkerById = async (id, config = {}) => {
    
    const address = await fetchAddressById(id, config);
    const worker = await fetchWorker(address, config);

    return {
        id: id,
        ...worker
    };
};

/**
 * Get all workers
 * 
 * @param {Object} config Library config (provided by the proxy but can be overridden)
 * @returns {Promise} A Promise object represents the {number}
 */
export const fetchAll = async (config = {}) => {
    let records = [];
    let error = [];

    try {

        const count = await fetchCount(config);    

        for (let i=0; i < count; i++) {
            
            try {

                const worker = await fetchWorkerById(i, config);

                records.push({
                    id: i,
                    ...worker
                });
            } catch(err) {
                error.push({
                    id: i,
                    message: err.message
                });
            }        
        }
    } catch(err) {
        error.push({
            error: err.message
        });
    }   

    return {
        records,
        error
    };
};

/**
 * Handle event WorkerNodeCreated
 * 
 * @param {Function} storeCallback 
 * @param {Function} errorCallback
 * @param {Object} config Library config (provided by the proxy but can be overridden)
 */
export const eventWorkerNodeCreated = (storeCallback = () => {}, errorCallback = () => {}, config = {}) => {

    expect.all(config, {
        'web3': {
            type: 'object',
            code: WEB3_REQUIRED
        },
        'contracts.Pandora.abi': {
            type: 'object',
            code: CONTRACT_REQUIRED,
            args: ['Pandora']
        },
        'addresses.Pandora': {
            type: 'string',
            code: ADDRESS_REQUIRED,
            args: ['Pandora']
        }
    });

    const pan = new config.web3.eth.Contract(config.contracts.Pandora.abi, config.addresses.Pandora);
    pan.events.WorkerNodeCreated()
        .on('data', async res => {

            try {

                const worker = await fetchWorker(res.returnValues.workerNode, config);
                storeCallback({
                    address: res.returnValues.workerNode,
                    worker,
                    status: 'created',
                    event: 'Pandora.WorkerNodeCreated'
                });
            } catch(err) {
                errorCallback(err);
            }            
        })
        .on('error', errorCallback);
};

/**
 * Handle event StateChanged for WorkerNode
 * 
 * @param {string} address
 * @param {Function} storeCallback 
 * @param {Function} errorCallback
 * @param {Object} config Library config (provided by the proxy but can be overridden)
 * @returns {Promise} A Promise object represents the {Object} 
 */
export const eventWorkerNodeStateChanged = (address, storeCallback = () => {}, errorCallback = () => {}, config = {}) => {

    expect.all(config, {
        'web3': {
            type: 'object',
            code: WEB3_REQUIRED
        },
        'contracts.WorkerNode.abi': {
            type: 'object',
            code: CONTRACT_REQUIRED,
            args: ['WorkerNode']
        }
    });

    const wor = new config.web3.eth.Contract(config.contracts.WorkerNode.abi, address);
    wor.events.StateChanged()
        .on('data', async res => {

            try {

                const worker = await fetchWorker(res.returnValues.workerNode, config);
                storeCallback({
                    address: res.returnValues.workerNode,
                    worker,
                    status: 'changed',
                    event: 'WorkerNode.StateChanged'
                });
            } catch(err) {
                errorCallback(err);
            }
        })
        .on('error', errorCallback);
};
