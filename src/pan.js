/**
 * Pan token methods
 * This file it is a part of the Pandora Pyrrha Javascript library
 * 
 * @file pan.js
 * @author Kostiantyn Smyrnov <kostysh@gmail.com>
 * @date 2019
 */

import * as expect from './helpers/expect';
import pjsError, {
    WEB3_REQUIRED,
    CONTRACT_REQUIRED,
    ADDRESS_REQUIRED,
    TRANSACTION_UNSUCCESSFUL
} from './helpers/errors';

/**
 * Get tokens balance
 * 
 * @param {String} address Tokens owner address
 * @param {Object} config Library config (provided by the proxy but can be overridden) 
 */
export const balanceOf = async (address = '', config = {}) => {

    expect.all({ address }, {
        'address': {
            type: 'address',
            code: ADDRESS_REQUIRED,
            args: ['Tokens owner address']
        }
    });

    expect.all(config, {
        'web3': {
            type: 'object',
            code: WEB3_REQUIRED
        },
        'contracts.Pan.abi': {
            type: 'object',
            code: CONTRACT_REQUIRED,
            args: ['Pan']
        },
        'addresses.Pan': {
            type: 'address',
            code: ADDRESS_REQUIRED,
            args: ['Pan']
        }
    });

    const eco = new config.web3.eth.Contract(config.contracts.Pan.abi, config.addresses.Pan);
    const balance = await eco.methods
        .balanceOf(address)
        .call();
        
    return Number.parseInt(balance, 10);
};

/**
 * Approve specific amount of tokens to be spent
 * 
 * @param {String} ownerAddress 
 * @param {String} spenderAddress 
 * @param {Number} value
 * @param {Object} config Library config (provided by the proxy but can be overridden) 
 */
export const approve = (ownerAddress, spenderAddress, value, config = {}) => new Promise((resolve, reject) => {
    
    expect.all({ ownerAddress, spenderAddress, value }, {
        'ownerAddress': {
            type: 'address',
            code: ADDRESS_REQUIRED,
            args: ['Tokens owner address']
        },
        'spenderAddress': {
            type: 'address',
            code: ADDRESS_REQUIRED,
            args: ['Tokens spender address']
        },
        'value': {
            type: 'number',
            args: ['Amount of tokens']
        }
    });

    expect.all(config, {
        'web3': {
            type: 'object',
            code: WEB3_REQUIRED
        },
        'contracts.Pan.abi': {
            type: 'object',
            code: CONTRACT_REQUIRED,
            args: ['Pan']
        },
        'addresses.Pan': {
            type: 'address',
            code: ADDRESS_REQUIRED,
            args: ['Pan']
        }
    });

    const pan = new config.web3.eth.Contract(config.contracts.Pan.abi, config.addresses.Pan);
    pan.methods
        .approve(spenderAddress, config.web3.utils.toHex(value))
        .send({
            from: ownerAddress
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
 * Transfer tokens to the address
 * 
 * @param {String} ownerAddress 
 * @param {String} destinationAddress 
 * @param {Number} value
 * @param {Object} config Library config (provided by the proxy but can be overridden) 
 */
export const transfer = (ownerAddress, destinationAddress, value, config = {}) => new Promise((resolve, reject) => {
    
    expect.all({ ownerAddress, destinationAddress, value }, {
        'ownerAddress': {
            type: 'address',
            code: ADDRESS_REQUIRED,
            args: ['Tokens owner address']
        },
        'destinationAddress': {
            type: 'address',
            code: ADDRESS_REQUIRED,
            args: ['Tokens destination address']
        },
        'value': {
            type: 'number',
            args: ['Amount of tokens']
        }
    });

    expect.all(config, {
        'web3': {
            type: 'object',
            code: WEB3_REQUIRED
        },
        'contracts.Pan.abi': {
            type: 'object',
            code: CONTRACT_REQUIRED,
            args: ['Pan']
        },
        'addresses.Pan': {
            type: 'address',
            code: ADDRESS_REQUIRED,
            args: ['Pan']
        }
    });

    const pan = new config.web3.eth.Contract(config.contracts.Pan.abi, config.addresses.Pan);
    pan.methods
        .transfer(destinationAddress, config.web3.utils.toHex(value))
        .send({
            from: ownerAddress
        })
        .on('error', reject)
        .on('receipt', receipt => {

            if (Number(receipt.status) === 0) {

                return reject(pjsError(TRANSACTION_UNSUCCESSFUL));
            }

            resolve(receipt);
        });
});
