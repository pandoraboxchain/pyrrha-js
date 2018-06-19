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
    TRANSACTION_UNSUCCESSFUL,
    FAILURE_EVENT
} from './helpers/errors';

import {
    fetchIpfsAddress as fetchIpfsAddressByKernelAddress
} from './kernels';

import {
    fetchDataset as fetchDatasetByDatasetAddress
} from './datasets';

/**
 * Get job count from Pandora contract
 * 
 * @param {Object} config Library config (provided by the proxy but can be overridden)
 * @returns {Promise} A Promise object represents the {number} 
 */
export const fetchCognitiveJobsCount = async (config = {}) => {

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
    const count = await pan.methods
        .cognitiveJobsCount()
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

    expect.all({ id }, {
        'id': {
            type: 'number'
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
    const jobAddress = await pan.methods
        .cognitiveJobs(id)
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
export const fetchState = async (address = '', config = {}) => {

    expect.all({ address }, {
        'address': {
            type: 'address'
        }
    });

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
export const fetchKernel = async (address = '', config = {}) => {

    expect.all({ address }, {
        'address': {
            type: 'address'
        }
    });

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
export const fetchDataset = async (address = '', config = {}) => {

    expect.all({ address }, {
        'address': {
            type: 'address'
        }
    });

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
export const fetchBatches = async (address = '', config = {}) => {

    expect.all({ address }, {
        'address': {
            type: 'address'
        }
    });

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
export const fetchProgress = async (address = '', config = {}) => {

    expect.all({ address }, {
        'address': {
            type: 'address'
        }
    });

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
export const fetchIpfsResults = async (address = '', config = {}) => {

    expect.all({ address }, {
        'address': {
            type: 'address'
        }
    });

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

    const ipfsResultsCount = await cog.methods
        .ipfsResultsCount()
        .call();

    let ipfsResults = [];

    for (let i=0; i < ipfsResultsCount; i++) {
        
        const result = await cog.methods
            .ipfsResults(i)
            .call();

        ipfsResults.push(result);        
    }    

    return ipfsResults;
};

/**
 * Get description from Job contract by the kernel address
 * 
 * @param {string} address
 * @param {Object} config Library config (provided by the proxy but can be overridden)
 * @returns {Promise} A Promise object represents the {number}
 */
export const fetchDescription = async (address = '', config = {}) => {

    expect.all({ address }, {
        'address': {
            type: 'address'
        }
    });

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
    const description = await cog.methods
        .description()
        .call();

    return config.web3.utils.hexToUtf8(description);
};

/**
 * Get job by the job address
 * 
 * @param {string} address 
 * @param {Object} config Library config (provided by the proxy but can be overridden)
 * @returns {Promise} A Promise object represents the {Object} 
 */
export const fetchJob = async (address = '', config = {}) => {

    const [
        state,
        kernel,
        dataset,
        batches,
        progress,
        ipfsResults,
        description
    ] = await Promise.all([
        fetchState(address, config),
        fetchKernel(address, config),
        fetchDataset(address, config),
        fetchBatches(address, config),
        fetchProgress(address, config),
        fetchIpfsResults(address, config),
        fetchDescription(address, config)
    ]);
    
    return {
        address: address,
        jobStatus: state,
        kernel: kernel,
        dataset: dataset,
        batches: batches,
        progress: progress,
        ipfsResults: ipfsResults,
        activeWorkersCount: batches,
        description
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
export const fetchJobStore = async (address = '', config = {}) => {

    const job = await fetchJob(address, config);

    const [
        kernel,
        dataset
    ] = await Promise.all([
        fetchIpfsAddressByKernelAddress(job.kernel, config),
        fetchDatasetByDatasetAddress(job.dataset, config)
    ]);
    
    return {
        job,
        kernel,
        dataset
    };
};

/**
 * Create cognitive job contract
 * 
 * @param {Object} options
 * @param {String} from Publisher address
 * @param {Object} config Library config (provided by the proxy but can be overridden)
 * @returns {Promise} Promise object resolved to add status (boolean)
 */
export const create = ({kernel, dataset, complexity, jobType, description}, from, config = {}) => new Promise((resolve, reject) => {

    expect.all({ kernel, dataset, complexity, jobType, description, from }, {
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
            type: 'number'
        },
        'description': {
            type: 'string'
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
            from,
            gas: 6700000// because this workflow is too greedy
        })
        .on('error', reject)
        .on('receipt', receipt => {

            if (Number(receipt.status) === 0) {

                return reject(pjsError(TRANSACTION_UNSUCCESSFUL));
            }

            if (receipt.events.CognitiveJobCreateFailed) {

                return reject(pjsError(FAILURE_EVENT, {
                    'CognitiveJobCreateFailed': receipt.events.CognitiveJobCreateFailed
                }));
            }

            resolve(receipt.events.CognitiveJobCreated.returnValues.cognitiveJob);
        });
});

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
    pan.events.CognitiveJobCreated(options)
        .on('data', async res => {

            try {

                const store = await fetchJobStore(res.returnValues.cognitiveJob);
                callbacks.onData({
                    address: res.returnValues.cognitiveJob,
                    store,
                    status: 'created',
                    event: 'Pandora.CognitiveJobCreated'
                });
            } catch(err) {
                callbacks.onError(err);
            }            
        })
        .on('error', callbacks.onError);

    return chain;
};

/**
 * Handle event StateChanged for CognitiveJob
 * 
 * @param {string} address
 * @param {Object} config Library config (provided by the proxy but can be overridden)
 * @returns {Object} Object with chained callbacks #data and #error
 */
export const eventCognitiveJobStateChanged = (address, config = {}) => {

    expect.all({ address }, {
        'address': {
            type: 'address'
        }
    });

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

    const cog = new config.web3.eth.Contract(config.contracts.CognitiveJob.abi, address);
    cog.events.StateChanged()
        .on('data', async res => {

            try {

                const store = await fetchJobStore(res.returnValues.cognitiveJob);
                callbacks.onData({
                    address: res.returnValues.cognitiveJob,
                    store,
                    status: 'changed',
                    event: 'CognitiveJob.StateChanged'
                });
            } catch(err) {
                callbacks.onError(err);
            }
        })
        .on('error', callbacks.onError);

    return chain;
};
