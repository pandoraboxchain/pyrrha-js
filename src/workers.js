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
import pjsError, {
    CONTRACT_REQUIRED,
    ADDRESS_REQUIRED,
    WEB3_REQUIRED,
    TRANSACTION_UNSUCCESSFUL
} from './helpers/errors';

import { fetchJobDetails } from './jobs';

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
            type: 'address',
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
 * Get worker's active job from Worker contract by the worker address
 * 
 * @param {string} address 
 * @param {Object} config Library config (provided by the proxy but can be overridden)
 * @returns {Promise} A Promise object represents the {string}
 */
export const fetchActiveJobAddress = async (address = '', config = {}) => {

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
export const fetchWorker = async (address = '', config = {}) => {
    
    const [
        currentState,
        activeJob
    ] = await Promise.all([
        fetchState(address, config),
        fetchActiveJobAddress(address, config)
    ]);


    let currentJob = activeJob;
    let jobState;    

    // Check is not 0x0
    if (+activeJob !== 0) {

        const jobDetails = await fetchJobDetails(activeJob, config);
        jobState = jobDetails.state;
    } else {
        currentJob = null;
        jobState = -1;
    }

    return {
        address,
        currentState,
        currentJob,
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
 * Get count of workers with "idle" status
 * 
 * @param {Object} config Library config (provided by the proxy but can be overridden)
 * @returns {Promise} A Promise object represents the {number}
 */
export const fetchIdleCount = async (config = {}) => {
    const all = await fetchAll(config);
    return all.records.reduce((acc, curr) => (curr.currentState === 2 ? acc+1 : acc), 0);
};

/**
 * Fetch progress of active job for the worker
 *
 * @param {String} address Worker's address
 * @param {Object} config Library config (provided by the proxy but can be overridden)
 * @returns {Promise<{Number}>} A Promise object represents the progress value
 */
export const fetchJobProgress = async (address = '', config = {}) => {

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
        'contracts.WorkerNode.abi': {
            type: 'object',
            code: CONTRACT_REQUIRED,
            args: ['WorkerNode']
        }
    });

    const wor = new config.web3.eth.Contract(config.contracts.WorkerNode.abi, address);    
    const state = await wor.methods
        .jobProgress()
        .call();

    return Math.ceil(Number.parseInt(state, 10));
};

/**
 * Handle event WorkerNodeCreated
 * 
 * @param {Object} options Event handler options
 * @param {Object} config Library config (provided by the proxy but can be overridden)
 * @returns {Object} Object with chained callbacks #data and #error
 */
export const eventWorkerNodeCreated = (options = {}, config = {}) => {

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
    chain.event = pan.events.WorkerNodeCreated(options)
        .on('data', async event => {

            try {

                const worker = await fetchWorker(event.returnValues.workerNode, config);
                callbacks.onData({
                    records: [worker],
                    event
                });
            } catch(err) {
                callbacks.onError(err);
            }            
        })
        .on('error', callbacks.onError);
    chain.event.name = 'WorkerNodeCreated';

    return chain;
};

/**
 * Handle event StateChanged for WorkerNode
 * 
 * @param {String} address
 * @param {Object} options
 * @param {Object} config Library config (provided by the proxy but can be overridden)
 * @returns {Object} Object with chained callbacks #data and #error
 */
export const eventWorkerNodeStateChanged = (address = '', options = {}, config = {}) => {

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
        'contracts.WorkerNode.abi': {
            type: 'object',
            code: CONTRACT_REQUIRED,
            args: ['WorkerNode']
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

    const wor = new config.web3.eth.Contract(config.contracts.WorkerNode.abi, address);
    chain.event = wor.events.StateChanged(options)
        .on('data', async event => {

            try {

                const worker = await fetchWorker(address, config);
                callbacks.onData({
                    records: [worker],
                    event
                });
            } catch(err) {
                callbacks.onError(err);
            }
        })
        .on('error', callbacks.onError);
    chain.event.name = 'StateChanged';

    return chain;
};

/**
 * Transition of a WorkerNode to the Idle state
 * 
 * @param {String} workerNodeAddress 
 * @param {String} from
 * @param {Object} config Library config (provided by the proxy but can be overridden)
 * @returns {Promise} Promise object resolved to add status (boolean)
 */
export const alive = (workerNodeAddress, from, config = {}) => new Promise(async (resolve, reject) => {

    expect.all({ workerNodeAddress, from }, {
        'workerNodeAddress': {
            type: 'address'
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
        'contracts.WorkerNode.abi': {
            type: 'object',
            code: CONTRACT_REQUIRED,
            args: ['WorkerNode']
        }
    });

    const wrn = new config.web3.eth.Contract(config.contracts.WorkerNode.abi, workerNodeAddress);
    const gasPrice = await config.web3.eth.getGasPrice();
    wrn.methods
        .alive()
        .send({
            from,
            gasPrice,
            gas: 6700000
        })
        .on('error', reject)
        .on('receipt', receipt => {

            if (Number(receipt.status) === 0) {

                return reject(pjsError(TRANSACTION_UNSUCCESSFUL));
            }

            resolve(receipt);
        });
});
