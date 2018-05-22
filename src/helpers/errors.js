/**
 * Errors definition and helpers
 * This file it is a part of the Pandora Pyrrha Javascript library
 * 
 * @file errors.js
 * @author Kostiantyn Smyrnov <kostysh@gmail.com>
 * @date 2018
 */

'use strict';

export const OPTIONS_REQUIRED = 'OPTIONS_REQUIRED';
export const WRONG_TYPE = 'WRONG_TYPE';
export const ADDRESS_REQUIRED = 'ADDRESS_REQUIRED';
export const WEB3_REQUIRED = 'WEB3_REQUIRED';
export const WEB3_NOT_CONNECTED = 'WEB3_NOT_CONNECTED';
export const CONTRACT_REQUIRED = 'CONTRACT_REQUIRED';
export const IPFS_REQUIRED = 'IPFS_REQUIRED';
export const IPFS_NOT_CONNECTED = 'IPFS_NOT_CONNECTED';
export const WEB3_METAMASK_REQUIRED = 'WEB3_METAMASK_REQUIRED';
export const TRANSACTION_UNSUCCESSFUL = 'TRANSACTION_UNSUCCESSFUL';
export const FAILURE_EVENT = 'FAILURE_EVENT';

export default (code, key, type, value, ...args) => {
    let message = 'Unknown error';
        
    switch (code) {
        case OPTIONS_REQUIRED:
            message = 'Config options is required and expected to be an object';
            break;

        case WRONG_TYPE:
            message = `Wrong property type. Expected '${key}' to be: '${type}', but got: '${value}'`;
            break;

        case WEB3_REQUIRED:
            message = 'Web3 API required';
            break;

        case WEB3_NOT_CONNECTED:
            message = 'Web3 not connected to provider';
            break;

        case WEB3_METAMASK_REQUIRED:
            message = 'MetaMask is required to perform this operation';
            break;

        case CONTRACT_REQUIRED:
            message = `Contract '${args[0]}' is required`;
            break;

        case ADDRESS_REQUIRED:
            message = `Address of '${args[0] || key}' is required. Wrong ethereum address: ${value}`;
            break;

        case IPFS_REQUIRED:
            message = 'IPFS API required';
            break;

        case IPFS_NOT_CONNECTED:
            message = 'No connection to IPFS server';
            break;

        case TRANSACTION_UNSUCCESSFUL:
            message = 'Transaction was unsuccessful';
            break;

        case FAILURE_EVENT:
            message = 'Contract returns an failure event';
            break;
    }

    const err = new Error(message);
    err.code = code || 'UNKNOWN';
    err.args = args;
    return err;
};
