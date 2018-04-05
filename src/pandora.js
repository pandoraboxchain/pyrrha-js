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
import {
    WEB3_REQUIRED,
    CONTRACT_REQUIRED,
    ADDRESS_REQUIRED
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
