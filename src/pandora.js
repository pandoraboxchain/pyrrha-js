/**
 * Common Pandora contract methods
 * This file it is a part of the Pandora Pyrrha Javascript library
 * 
 * @file pandora.js
 * @author Kostiantyn Smyrnov <kostysh@gmail.com>
 * @date 2018
 */
'use strict';

import * as expect from './helpers/expect';
import pjsError, {
    WEB3_REQUIRED,
    CONTRACT_REQUIRED,
    ADDRESS_REQUIRED,
    SPECIFIC_ADDRESS_REQUIRED,
    TRANSACTION_UNSUCCESSFUL
} from './helpers/errors';

/**
 * Get deployed contracts version
 * 
 * @param {Object} config Library config (provided by the proxy but can be overridden)
 * @returns {Promise}
 */
export const version = async (config = {}) => {

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
    const version = await pan.methods
        .version()
        .call();
        
    return version;
};

/**
 * Public and externalAdds address to the whitelist of owners allowed to create WorkerNodes contracts
 * 
 * @param {String} publisher 
 * @param {String} ownerAddress 
 * @param {Object} config Library config (provided by the proxy but can be overridden) 
 */
export const whitelistWorkerOwner = (publisher, ownerAddress, config = {}) => new Promise((resolve, reject) => {
    
    expect.all({ publisher, ownerAddress }, {
        'publisher': {
            type: 'string',
            code: SPECIFIC_ADDRESS_REQUIRED,
            args: ['Pandora contract owner']
        },
        'ownerAddress': {
            type: 'string',
            code: SPECIFIC_ADDRESS_REQUIRED,
            args: ['WorkerNode owner']
        }
    });

    expect.all(config, {
        'web3': {
            type: 'object',
            code: WEB3_REQUIRED
        }
    });

    const pan = new config.web3.eth.Contract(config.contracts.Pandora.abi, config.addresses.Pandora);
    pan.methods
        .whitelistWorkerOwner(ownerAddress)
        .send({
            from: publisher
        })
        .on('error', reject)
        .on('receipt', receipt => {

            if (Number(receipt.status) === 0) {

                return reject(pjsError(TRANSACTION_UNSUCCESSFUL));
            }

            resolve(receipt);
        });
});

/**
 * Creates, registers and returns a new worker node owned by the caller of the contract. 
 * Can be called only by the whitelisted node owner address
 * 
 * @param {any} publisher 
 * @param {any} [config={}] 
 */
export const createWorkerNode = (publisher, config = {}) => new Promise((resolve, reject) => {

    expect.all({ publisher }, {
        'publisher': {
            type: 'string',
            code: SPECIFIC_ADDRESS_REQUIRED,
            args: ['Pandora contract owner']
        }
    });

    expect.all(config, {
        'web3': {
            type: 'object',
            code: WEB3_REQUIRED
        },
        'contracts.WorkerNode': {
            type: 'object',
            code: CONTRACT_REQUIRED,
            args: ['WorkerNode']
        }
    });

    const pan = new config.web3.eth.Contract(config.contracts.Pandora.abi, config.addresses.Pandora);
    pan.methods
        .createWorkerNode()
        .send({
            from: publisher,
            gas: 6700000// because this workflow is too greedy
        })
        .on('error', reject)
        .on('receipt', receipt => {

            if (Number(receipt.status) === 0) {

                return reject(pjsError(TRANSACTION_UNSUCCESSFUL));
            }

            // console.log('>>>>> worker node result', receipt.events.WorkerNodeCreated.returnValues)
            // console.log('>>>>> worker node address', receipt.events.WorkerNodeCreated.address)

            resolve(receipt.events.WorkerNodeCreated.returnValues.workerNode);// address of created WorkerNode
        });
});
