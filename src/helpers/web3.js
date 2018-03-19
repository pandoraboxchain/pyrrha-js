/**
 * Web3 helpers
 * This file it is a part of the Pandora Pyrrha Javascript library
 * 
 * @file errors.js
 * @author Kostiantyn Smyrnov <kostysh@gmail.com>
 * @date 2018
 */
'use strict';

import pjsError, {
    WEB3_REQUIRED,
    WEB3_METAMASK_REQUIRED
} from './errors';

/**
 * Estimate required gas amount
 * 
 * @param {String} bytecode Contract bytecode
 * @param {Array} args Contract arguments
 * @returns {Number} hex
 */
export const estimateGas = async (bytecode, args, config = {}) => {

    if (!config.web3) {
        throw pjsError(WEB3_REQUIRED);
    }

    return await config.web3.eth.estimateGas({
        data: bytecode,
        arguments: args
    });
};

/**
 * Deploy contract
 * 
 * @param {Object} contract Contract json
 * @param {Object} options { args, from, gas } 
 * @returns {Promise} Promise object resolved to contract address
 */
export const deployContract = (web3, contract, { args, from, gas }, config = {}) => new Promise((resolve, reject) => {
    
    if (!config.web3) {
        throw pjsError(WEB3_REQUIRED);
    }

    if (!config.web3.currentProvider.isMetaMask) {
        throw pjsError(WEB3_METAMASK_REQUIRED);
    }

    new config.web3.eth.Contract(contract.abi)
        .deploy({
            data: contract.bytecode,
            arguments: args
        })
        .send({
            from,
            gas
        })
        .on('error', reject)
        .on('receipt', receipt => resolve(receipt.contractAddress));
});
