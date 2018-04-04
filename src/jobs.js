/**
 * Cognitive Jobs related methods
 * This file it is a part of the Pandora Pyrrha Javascript library
 * 
 * @file jobs.js
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

import {
    fetchIpfsAddress as fetchIpfsAddressByKernelAddress
} from './kernels';

import {
    fetchDataset as fetchDatasetByDatasetAddress
} from './datasets';

/**
 * Get active job count from Pandora contract
 * 
 * @param {Object} config Library config (provided by the proxy but can be overridden)
 * @returns {Promise} A Promise object represents the {number} 
 */
export const fetchActiveCount = async (config = {}) => {

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
        .activeJobsCount()
        .call();
        
    return Number.parseInt(count, 10);
};

/**
 * Get worker by the worker's id
 * 
 * @param {integer} id 
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
    const jobAddress = await pan.methods
        .activeJobs(id)
        .call();

    return String(jobAddress);
};

/**
 * Get job state from Cognitive Job contract by the job address
 * 
 * @param {string} address 
 * @param {Object} config Library config (provided by the proxy but can be overridden)
 * @returns {Promise} A Promise object represents the {integer} 
 */
export const fetchState = async (address, config = {}) => {

    expect.all(config, {
        'web3': {
            type: 'object',
            code: WEB3_REQUIRED
        },
        'contracts.CognitiveJob.abi': {
            type: 'object',
            code: CONTRACT_REQUIRED,
            args: ['CognitiveJob']
        }
    });

    const cog = new config.web3.eth.Contract(config.contracts.CognitiveJob.abi, address);
    const state = await cog.methods
        .currentState()
        .call();

    return Number.parseInt(state, 10);
};

/**
 * Get job kernel from Cognitive Job contract by the job address
 * 
 * @param {string} address 
 * @param {Object} config Library config (provided by the proxy but can be overridden)
 * @returns {Promise} A Promise object represents the {string} 
 */
export const fetchKernel = async (address, config = {}) => {

    expect.all(config, {
        'web3': {
            type: 'object',
            code: WEB3_REQUIRED
        },
        'contracts.CognitiveJob.abi': {
            type: 'object',
            code: CONTRACT_REQUIRED,
            args: ['CognitiveJob']
        }
    });

    const cog = new config.web3.eth.Contract(config.contracts.CognitiveJob.abi, address);
    const kernel = await cog.methods
        .kernel()
        .call();

    return String(kernel);
};

/**
 * Get job dataset from Cognitive Job contract by the job address
 * 
 * @param {string} address 
 * @param {Object} config Library config (provided by the proxy but can be overridden)
 * @returns {Promise} A Promise object represents the {string} 
 */
export const fetchDataset = async (address, config = {}) => {

    expect.all(config, {
        'web3': {
            type: 'object',
            code: WEB3_REQUIRED
        },
        'contracts.CognitiveJob.abi': {
            type: 'object',
            code: CONTRACT_REQUIRED,
            args: ['CognitiveJob']
        }
    });

    const cog = new config.web3.eth.Contract(config.contracts.CognitiveJob.abi, address);
    const dataset = await cog.methods
        .dataset()
        .call();

    return String(dataset);
};

/**
 * Get job batches count from Cognitive Job contract by the job address
 * 
 * @param {string} address 
 * @param {Object} config Library config (provided by the proxy but can be overridden)
 * @returns {Promise} A Promise object represents the {number} 
 */
export const fetchBatches = async (address, config = {}) => {

    expect.all(config, {
        'web3': {
            type: 'object',
            code: WEB3_REQUIRED
        },
        'contracts.CognitiveJob.abi': {
            type: 'object',
            code: CONTRACT_REQUIRED,
            args: ['CognitiveJob']
        }
    });

    const cog = new config.web3.eth.Contract(config.contracts.CognitiveJob.abi, address);
    const batches = await cog.methods
        .batches()
        .call();

    return Number.parseInt(batches, 10);
};

/**
 * Get job progress from Cognitive Job contract by the job address
 * 
 * @param {string} address 
 * @param {Object} config Library config (provided by the proxy but can be overridden)
 * @returns {Promise} A Promise object represents the {number} 
 */
export const fetchProgress = async (address, config = {}) => {

    expect.all(config, {
        'web3': {
            type: 'object',
            code: WEB3_REQUIRED
        },
        'contracts.CognitiveJob.abi': {
            type: 'object',
            code: CONTRACT_REQUIRED,
            args: ['CognitiveJob']
        }
    });

    const cog = new config.web3.eth.Contract(config.contracts.CognitiveJob.abi, address);
    const progress = await cog.methods
        .progress()
        .call();

    return Number.parseInt(progress, 10);
};

/**
 * Get job's ipfsResults from Cognitive Job contract by the job address
 * 
 * @param {string} address 
 * @param {Object} config Library config (provided by the proxy but can be overridden)
 * @returns {Promise} A Promise object represents the {string[]} 
 */
export const fetchIpfsResults = async (address, config = {}) => {

    expect.all(config, {
        'web3': {
            type: 'object',
            code: WEB3_REQUIRED
        },
        'contracts.CognitiveJob.abi': {
            type: 'object',
            code: CONTRACT_REQUIRED,
            args: ['CognitiveJob']
        }
    });

    const cog = new config.web3.eth.Contract(config.contracts.CognitiveJob.abi, address);
    const ipfsResults = await cog.methods
        .ipfsResults()
        .call();

    return ipfsResults;
};

/**
 * Get job by the job address
 * 
 * @param {string} address 
 * @param {Object} config Library config (provided by the proxy but can be overridden)
 * @returns {Promise} A Promise object represents the {Object} 
 */
export const fetchJob = async (address, config = {}) => {

    const state = await fetchState(address, config);
    const kernel = await fetchKernel(address, config);
    const dataset = await fetchDataset(address, config);
    const batches = await fetchBatches(address, config);
    const progress = await fetchProgress(address, config);
    const ipfsResults = await fetchIpfsResults(address, config);
    
    return {
        address: address,
        jobStatus: state,
        kernel: kernel,
        dataset: dataset,
        batches: batches,
        progress: progress,
        ipfsResults: ipfsResults,
        activeWorkersCount: batches
    };
};

/**
 * Get all jobs
 * 
 * @param {Object} config Library config (provided by the proxy but can be overridden)
 * @returns {Promise} A Promise object represents the {Object[]} 
 */
export const fetchAll = async (config = {}) => {
    let records = [];
    let error = [];

    try {

        const count = await fetchActiveCount(config);    

        for (let i=0; i < count; i++) {
            
            const address = await fetchAddressById(i, config);

            try {

                const job = await fetchJob(address, config);

                records.push({
                    id: i,
                    ...job
                });
            } catch(err) {
                error.push({
                    address,
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
 * Get job store
 * 
 * @param {string} address 
 * @param {Object} config Library config (provided by the proxy but can be overridden)
 * @returns {Promise} A Promise object represents the {Object} 
 */
export const fetchJobStore = async (address, config = {}) => {

    const job = await fetchJob(address, config);
    const kernel = await fetchIpfsAddressByKernelAddress(job.kernel, config);
    const dataset = await fetchDatasetByDatasetAddress(job.dataset, config);
    
    return {
        job,
        kernel,
        dataset
    };
};

/**
 * Create cognitive job contract
 * 
 * @param {String} kernelAddress 
 * @param {String} datasetAddress 
 * @param {String} from
 * @param {Object} config Library config (provided by the proxy but can be overridden)
 * @returns {Promise} Promise object resolved to add status (boolean)
 */
export const create = (kernelAddress, datasetAddress, from, config = {}) => new Promise((resolve, reject) => {

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
    pan.methods
        .createCognitiveJob(kernelAddress, datasetAddress)
        .send({
            from
        })
        .on('error', reject)
        .on('receipt', receipt => resolve(receipt.contractAddress));
});

/**
 * Handle event CognitiveJobCreated
 * 
 * @param {Function} storeCallback 
 * @param {Function} errorCallback
 * @param {Object} config Library config (provided by the proxy but can be overridden)
 */
export const eventCognitiveJobCreated = (storeCallback = () => {}, errorCallback = () => {}, config = {}) => {

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
    pan.events.CognitiveJobCreated()
        .on('data', async res => {

            try {

                const store = await fetchJobStore(res.returnValues.cognitiveJob);
                storeCallback({
                    address: res.returnValues.cognitiveJob,
                    store,
                    status: 'created',
                    event: 'Pandora.CognitiveJobCreated'
                });
            } catch(err) {
                errorCallback(err);
            }            
        })
        .on('error', errorCallback);
};

/**
 * Handle event StateChanged for CognitiveJob
 * 
 * @param {string} address
 * @param {Function} storeCallback 
 * @param {Function} errorCallback
 * @param {Object} config Library config (provided by the proxy but can be overridden)
 * @returns {Promise} A Promise object represents the {Object} 
 */
export const eventCognitiveJobStateChanged = (address, storeCallback = () => {}, errorCallback = () => {}, config = {}) => {

    expect.all(config, {
        'web3': {
            type: 'object',
            code: WEB3_REQUIRED
        },
        'contracts.CognitiveJob.abi': {
            type: 'object',
            code: CONTRACT_REQUIRED,
            args: ['CognitiveJob']
        }
    });

    const cog = new config.web3.eth.Contract(config.contracts.CognitiveJob.abi, address);
    cog.events.StateChanged()
        .on('data', async res => {

            try {

                const store = await fetchJobStore(res.returnValues.cognitiveJob);
                storeCallback({
                    address: res.returnValues.cognitiveJob,
                    store,
                    status: 'changed',
                    event: 'CognitiveJob.StateChanged'
                });
            } catch(err) {
                errorCallback(err);
            }
        })
        .on('error', errorCallback);
};
