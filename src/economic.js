/**
 * Economic related methods
 * This file it is a part of the Pandora Pyrrha Javascript library
 * 
 * @file economic.js
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
 * Get minimum worker node stake value
 * 
 * @param {Object} config Library config (provided by the proxy but can be overridden) 
 */
export const minimumWorkerNodeStake = async (config = {}) => {

    expect.all(config, {
        'web3': {
            type: 'object',
            code: WEB3_REQUIRED
        },
        'contracts.EconomicController.abi': {
            type: 'object',
            code: CONTRACT_REQUIRED,
            args: ['EconomicController']
        },
        'addresses.EconomicController': {
            type: 'address',
            code: ADDRESS_REQUIRED,
            args: ['EconomicController']
        }
    });

    const eco = new config.web3.eth.Contract(config.contracts.EconomicController.abi, config.addresses.EconomicController);
    const stake = await eco.methods
        .minimumWorkerNodeStake()
        .call();
        
    return Number.parseInt(stake, 10);
};
