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
import pjsError, {
    CONTRACT_REQUIRED,
    ADDRESS_REQUIRED,
    WEB3_REQUIRED,
    TRANSACTION_UNSUCCESSFUL
} from './helpers/errors';

import {
    fetchIpfsAddress as fetchIpfsAddressByKernelAddress
} from './kernels';

import {
    fetchIpfsAddress as fetchIpfsAddressByDatasetAddress
} from './datasets';

const localCache = new Map();

/**
 * Get job controller address
 * 
 * @param {Object} config Library config (provided by the proxy but can be overridden)
 * @returns {Promise<{String}>} 
 */
export const fetchJobControllerAddress = async (config = {}) => {

    expect.all(config, {
        'web3': {
            type: 'object',
            code: WEB3_REQUIRED
        },
        'addresses.Pandora': {
            type: 'address',
            code: ADDRESS_REQUIRED,
            args: ['Pandora']
        },
        'contracts.Pandora.abi': {
            type: 'object',
            code: CONTRACT_REQUIRED,
            args: ['Pandora']
        }
    });

    const pan = new config.web3.eth.Contract(config.contracts.Pandora.abi, config.addresses.Pandora);
    const jobController = await pan.methods
        .jobController()
        .call();

    // save for later use
    localCache.set('jobController', jobController);
        
    return jobController;
};

/**
 * Get active jobs count 
 * 
 * @param {Object} config Library config (provided by the proxy but can be overridden)
 * @returns {Promise<{Number}>} 
 */
export const fetchActiveJobsCount = async (config = {}) => {

    expect.all(config, {
        'web3': {
            type: 'object',
            code: WEB3_REQUIRED
        },
        'contracts.CognitiveJobController.abi': {
            type: 'object',
            code: CONTRACT_REQUIRED,
            args: ['CognitiveJobController']
        }
    });

    let jobController = localCache.get('jobController');

    if (!jobController) {

        jobController = await fetchJobControllerAddress(config);
    }

    const jctrl = new config.web3.eth.Contract(config.contracts.CognitiveJobController.abi, jobController);
    const count = await jctrl.methods
        .activeJobsCount()
        .call();
        
    return Number.parseInt(count, 10);
};

/**
 * Get completed jobs count 
 * 
 * @param {Object} config Library config (provided by the proxy but can be overridden)
 * @returns {Promise<{Number}>} 
 */
export const fetchCompletedJobsCount = async (config = {}) => {

    expect.all(config, {
        'web3': {
            type: 'object',
            code: WEB3_REQUIRED
        },
        'contracts.CognitiveJobController.abi': {
            type: 'object',
            code: CONTRACT_REQUIRED,
            args: ['CognitiveJobController']
        }
    });

    let jobController = localCache.get('jobController');

    if (!jobController) {

        jobController = await fetchJobControllerAddress(config);
    }

    const jctrl = new config.web3.eth.Contract(config.contracts.CognitiveJobController.abi, jobController);
    const count = await jctrl.methods
        .completedJobsCount()
        .call();
        
    return Number.parseInt(count, 10);
};

/**
 * Get job details 
 * 
 * @param {String} address Job address
 * @param {Object} config Library config (provided by the proxy but can be overridden)
 * @returns {Promise<{Number}>} 
 */
export const fetchJobDetails = async (address, config = {}) => {

    expect.all(config, {
        'web3': {
            type: 'object',
            code: WEB3_REQUIRED
        },
        'contracts.CognitiveJobController.abi': {
            type: 'object',
            code: CONTRACT_REQUIRED,
            args: ['CognitiveJobController']
        }
    });

    let jobController = localCache.get('jobController');

    if (!jobController) {

        jobController = await fetchJobControllerAddress(config);
    }

    const jctrl = new config.web3.eth.Contract(config.contracts.CognitiveJobController.abi, jobController);
    
    const { kernel, dataset, complexity, description, activeWorkers, progress, state } = await jctrl.methods
        .getCognitiveJobDetails(address)
        .call();
    const kernelIpfs = await fetchIpfsAddressByKernelAddress(kernel, config);
    const datasetIpfs = await fetchIpfsAddressByDatasetAddress(dataset, config);
    const ipfsResults = await Promise.all(activeWorkers.map((_, index) => jctrl.methods.getCognitiveJobResults(address, index).call()));
    
    const utf8description = description ? config.web3.utils.hexToUtf8(description) : '';

    return {
        address, 
        kernel,
        kernelIpfs,
        dataset,
        datasetIpfs,
        activeWorkers,
        ipfsResults: ipfsResults.map(result => result ? config.web3.utils.hexToUtf8(result) : result).filter(res => res),
        complexity: Number(complexity),
        progress: Number(progress),
        state: Number(state),
        description: utf8description.substr(2),
        jobType: utf8description.substr(0, 1)
    };
};

/**
 * Get jobs Id from the "source"
 * 
 * @param {String} from source activeJobs or completedJobs
 * @param {Number} count
 * @param {Object} options
 * @returns {Promise<[{String}]>} 
 */
export const fetchJobsIds = async (source, count = 0, config = {}) => {

    expect.all({ source }, {
        'source': {
            type: 'enum',
            values: ['activeJobs', 'completedJobs']
        }
    });

    expect.all(config, {
        'web3': {
            type: 'object',
            code: WEB3_REQUIRED
        },
        'contracts.CognitiveJobController.abi': {
            type: 'object',
            code: CONTRACT_REQUIRED,
            args: ['CognitiveJobController']
        }
    });    

    let jobController = localCache.get('jobController');

    if (!jobController) {

        jobController = await fetchJobControllerAddress(config);
    }

    // numbers sequence from 0 to count
    const counts = [...Array(count).keys()];

    const jctrl = new config.web3.eth.Contract(config.contracts.CognitiveJobController.abi, jobController);
    const addresses = await Promise.all(counts.map(index => jctrl.methods.getJobId(index, source === 'activeJobs').call()));
        
    return addresses;
};

/**
 * Create cognitive job contract
 * 
 * @param {Object} options
 * @param {String} from Publisher address
 * @param {Object} config Library config (provided by the proxy but can be overridden)
 * @returns {Promise} Promise object resolved to add status (boolean)
 */
export const create = ({kernel, dataset, complexity, jobType, description, deposit}, from, config = {}) => new Promise((resolve, reject) => {

    expect.all({ kernel, dataset, complexity, jobType, description, deposit, from }, {
        'kernel': {
            type: 'address'
        },
        'dataset': {
            type: 'address'
        },
        'complexity': {
            type: 'number'
        },
        'jobType': {
            type: 'string'
        },
        'description': {
            type: 'string'
        },
        'deposit': {
            type: 'number'
        },
        'from': {
            type: 'address'
        }
    });

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
            type: 'address',
            code: ADDRESS_REQUIRED,
            args: ['Pandora']
        }
    });

    const pan = new config.web3.eth.Contract(config.contracts.Pandora.abi, config.addresses.Pandora);
    pan.methods
        .createCognitiveJob(kernel, dataset, complexity, config.web3.utils.utf8ToHex(`${jobType};${description}`))
        .send({
            value: config.web3.utils.toWei(String(deposit)),
            from,
            gas: 6700000// because this workflow is too greedy
        })
        .on('error', reject)
        .on('receipt', receipt => {

            try {

                if (Number(receipt.status) === 0) {

                    return reject(pjsError(TRANSACTION_UNSUCCESSFUL));
                }

                if (receipt.events.CognitiveJobQueued) {
    
                    return resolve(receipt.events.CognitiveJobQueued.returnValues.jobId);
                }
    
                resolve(receipt.events.CognitiveJobCreated.returnValues.jobId);
            } catch (err) {
                reject(err);
            }
        });
});

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

        const [
            activeCount,
            completedCount
        ] = await Promise.all([
            fetchActiveJobsCount(config),
            fetchCompletedJobsCount(config)
        ]);

        const [
            activeJobsIds,
            completedJobsIds
        ] = await Promise.all([
            fetchJobsIds('activeJobs', activeCount, config),
            fetchJobsIds('completedJobs', completedCount, config)
        ]);

        const allJobsIds = [
            ...activeJobsIds,
            ...completedJobsIds
        ];

        records = await Promise.all(allJobsIds.map(jobId => fetchJobDetails(jobId, config)));
        
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
 * Handle event CognitiveJobCreated
 * 
 * @param {Object} options Event handler options
 * @param {Object} config Library config (provided by the proxy but can be overridden)
 * @returns {Object} Object with chained callbacks #data and #error
 */
export const eventCognitiveJobCreated = (options = {}, config = {}) => {

    expect.all({ options }, {
        'options': {
            type: 'object'
        }
    });

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
            type: 'address',
            code: ADDRESS_REQUIRED,
            args: ['Pandora']
        }
    });

    const callbacks = {
        onData: () => {},
        onError: () => {}
    };

    const chain = {
        data: (cb = () => {}) => {
            callbacks.onData = cb;
            return chain;
        },
        error: (cb = () => {}) => {
            callbacks.onError = cb;
            return chain;
        }
    };

    const pan = new config.web3.eth.Contract(config.contracts.Pandora.abi, config.addresses.Pandora);
    chain.event = pan.events.CognitiveJobCreated(options)
        .on('data', async res => {

            try {

                const jobDetails = await fetchJobDetails(res.returnValues.jobId, config);
                callbacks.onData({
                    records: [jobDetails]
                });
            } catch(err) {
                callbacks.onError(err);
            }            
        })
        .on('error', callbacks.onError);

    return chain;
};

/**
 * Handle event JobStateChanged
 * 
 * @param {Object} options Event handler options
 * @param {Object} config Library config (provided by the proxy but can be overridden)
 * @returns {Object} Object with chained callbacks #data and #error
 */
export const eventJobStateChanged = (options = {}, config = {}) => {

    expect.all({ options }, {
        'options': {
            type: 'object'
        }
    });

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
            type: 'address',
            code: ADDRESS_REQUIRED,
            args: ['Pandora']
        }
    });

    const callbacks = {
        onData: () => {},
        onError: () => {}
    };

    const chain = {
        data: (cb = () => {}) => {
            callbacks.onData = cb;
            return chain;
        },
        error: (cb = () => {}) => {
            callbacks.onError = cb;
            return chain;
        }
    };

    (async () => {
        
        let jobController = localCache.get('jobController');

        if (!jobController) {

            jobController = await fetchJobControllerAddress(config);
        }

        const jctrl = new config.web3.eth.Contract(config.contracts.CognitiveJobController.abi, jobController);
        chain.event = jctrl.events.JobStateChanged(options)
            .on('data', async res => {

                try {

                    const jobDetails = await fetchJobDetails(res.returnValues.jobId, config);
                    callbacks.onData({
                        records: [jobDetails]
                    });
                } catch(err) {
                    callbacks.onError(err);
                }            
            })
            .on('error', callbacks.onError);
    })();

    return chain;
};
