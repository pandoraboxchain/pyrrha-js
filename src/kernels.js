/**
 * Kernels related methods
 * This file it is a part of the Pandora Pyrrha Javascript library
 * 
 * @file kernels.js
 * @author Kostiantyn Smyrnov <kostysh@gmail.com>
 * @date 2018
 */

'use strict';

import pjsError, {
    CONTRACT_REQUIRED,
    ADDRESS_REQUIRED
} from './helpers/errors';

/**
 * Get Kernel address by kernel id
 * 
 * @param {number} id
 * @param {Object} config Library config (provided by the proxy but can be overridden)
 * @returns {Promise} A Promise object represents the {string}
 */
export const fetchAddressById = async (id, config) => {

    if (!config.contracts || !config.contracts.PandoraMarket || !config.contracts.PandoraMarket.abi) {
        throw pjsError(CONTRACT_REQUIRED, 'PandoraMarket');
    }

    if (!config.addresses || !config.addresses.market) {
        throw pjsError(ADDRESS_REQUIRED, 'Market');
    }

    const mar = new config.web3.eth.Contract(config.contracts.PandoraMarket.abi, config.addresses.market);
    const kernelContract = await mar.methods
        .kernels(id)
        .call();
    return kernelContract;
};

/**
 * Get IPFS address from Kernel contract by the kernel address
 * 
 * @param {string} address
 * @param {Object} config Library config (provided by the proxy but can be overridden)
 * @returns {Promise} A Promise object represents the {string}
 */
export const fetchIpfsAddress = async (address = '', config = {}) => {

    if (!config.contracts || !config.contracts.Kernel || !config.contracts.Kernel.abi) {
        throw pjsError(CONTRACT_REQUIRED, 'Kernel');
    }

    const ker = new config.web3.eth.Contract(config.contracts.Kernel.abi, address);
    const ipfsAddress = await ker.methods
        .ipfsAddress()
        .call();
    return String(ipfsAddress);
};

/**
 * Get data dim from Kernel contract by the kernel address
 * 
 * @param {string} address
 * @param {Object} config Library config (provided by the proxy but can be overridden)
 * @returns {Promise} A Promise object represents the {number}
 */
export const fetchDataDim = async (address = '', config = {}) => {

    if (!config.contracts || !config.contracts.Kernel || !config.contracts.Kernel.abi) {
        throw pjsError(CONTRACT_REQUIRED, 'Kernel');
    }

    const ker = new config.web3.eth.Contract(config.contracts.Kernel.abi, address);
    const dataDim = await ker.methods
        .dataDim()
        .call();
    return Number.parseInt(dataDim, 10);
};

/**
 * Get current price from Kernel contract by the kernel address
 * 
 * @param {string} address
 * @param {Object} config Library config (provided by the proxy but can be overridden)
 * @returns {Promise} A Promise object represents the {number}
 */
export const fetchCurrentPrice = async (address = '', config = {}) => {

    if (!config.contracts || !config.contracts.Kernel || !config.contracts.Kernel.abi) {
        throw pjsError(CONTRACT_REQUIRED, 'Kernel');
    }

    const ker = new config.web3.eth.Contract(config.contracts.Kernel.abi, address);
    const currentPrice = await ker.methods
        .currentPrice()
        .call();
    return Number.parseInt(currentPrice, 10);
};

/**
 * Get complexity from Kernel contract by the kernel address
 * 
 * @param {string} address
 * @param {Object} config Library config (provided by the proxy but can be overridden)
 * @returns {Promise} A Promise object represents the {number}
 */
export const fetchComplexity = async (address = '', config = {}) => {

    if (!config.contracts || !config.contracts.Kernel || !config.contracts.Kernel.abi) {
        throw pjsError(CONTRACT_REQUIRED, 'Kernel');
    }

    const ker = new config.web3.eth.Contract(config.contracts.Kernel.abi, address);
    const complexity = await ker.methods
        .complexity()
        .call();
    return Number.parseInt(complexity, 10);
};

/**
 * Get Kernel by the kernel address
 * 
 * @param {string} address
 * @param {Object} config Library config (provided by the proxy but can be overridden)
 * @returns {Promise} Promise object represents the {Object[]}
 */
export const fetchKernel = async (address = '', config = {}) => {

    try {

        const ipfsAddress = await fetchIpfsAddress(address, config);
        const dataDim = await fetchDataDim(address, config);
        const currentPrice = await fetchCurrentPrice(address, config);
        const complexity = await fetchComplexity(address, config);

        return {
            address,
            ipfsAddress,
            dataDim,
            currentPrice,
            complexity
        };
    } catch(err) {
        return Promise.reject(err);
    }
};

/**
 * Get all kernels
 * 
 * @param {Object} config Library config (provided by the proxy but can be overridden)
 * @returns {Promise} Promise object represents the {Object[]}
 */
export const fetchAll = async (config = {}) => {

    let id = 0;
    let records = [];
    let error = [];

    try {

        // @todo Add method getKernelsCount to the PandoraMarket contract for avoid iterating with "try catch"
        while (true) {
            
            const kernelAddress = await fetchAddressById(id++, config);// can be 0x0
            
            if (+kernelAddress === 0) {
                break;
            }

            try {

                const kernelObj = await fetchKernel(kernelAddress, config);

                records.push({
                    id: id,
                    ...kernelObj
                });
            } catch(err) {
                
                error.push({
                    address: kernelAddress,
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
 * Handle event KernelAdded
 * 
 * @param {Function} storeCallback 
 * @param {Function} errorCallback
 * @param {Object} config Library config (provided by the proxy but can be overridden)
 */
export const eventKernelAdded = (storeCallback = () => {}, errorCallback = () => {}, config = {}) => {

    if (!config.contracts || !config.contracts.PandoraMarket || !config.contracts.PandoraMarket.abi) {
        throw pjsError(CONTRACT_REQUIRED, 'PandoraMarket');
    }

    if (!config.addresses || !config.addresses.market) {
        throw pjsError(ADDRESS_REQUIRED, 'Market');
    }

    const mar = new config.web3.eth.Contract(config.contracts.PandoraMarket.abi, config.addresses.market);
    mar.events.KernelAdded({
        fromBlock: 0
    })
        .on('data', async res => {

            try {

                const kernel = await fetchKernel(res.args.kernel, config);
                storeCallback({
                    address: res.args.kernel,
                    kernel,
                    status: 'created'
                });
            } catch(err) {
                errorCallback(err);
            }            
        })
        .on('error', errorCallback);
};
