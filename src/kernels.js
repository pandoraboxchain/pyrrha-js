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
    ADDRESS_REQUIRED,
    WEB3_REQUIRED,
    WEB3_METAMASK_REQUIRED
} from './helpers/errors';
import * as web3Helpers from './helpers/web3';

/**
 * Get Kernel address by kernel id
 * 
 * @param {number} id
 * @param {Object} config Library config (provided by the proxy but can be overridden)
 * @returns {Promise} A Promise object represents the {string}
 */
export const fetchAddressById = async (id, config) => {

    if (!config.web3) {
        throw pjsError(WEB3_REQUIRED);
    }

    if (!config.contracts || !config.contracts.PandoraMarket || !config.contracts.PandoraMarket.abi) {
        throw pjsError(CONTRACT_REQUIRED, 'PandoraMarket');
    }

    if (!config.addresses || !config.addresses.PandoraMarket) {
        throw pjsError(ADDRESS_REQUIRED, 'Market');
    }

    const mar = new config.web3.eth.Contract(config.contracts.PandoraMarket.abi, config.addresses.PandoraMarket);
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

    if (!config.web3) {
        throw pjsError(WEB3_REQUIRED);
    }

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

    if (!config.web3) {
        throw pjsError(WEB3_REQUIRED);
    }

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

    if (!config.web3) {
        throw pjsError(WEB3_REQUIRED);
    }

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

    if (!config.web3) {
        throw pjsError(WEB3_REQUIRED);
    }

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
 * Deploy Kernel contract to the network
 * 
 * @param {string} kernelIpfsHash 
 * @param {Object} options { publisher, dimension, complexity, price } 
 * @param {Object} config Library config (provided by the proxy but can be overridden)
 * @returns {Promise} Promise object resolved to contract address
 */
export const deploy = async (kernelIpfsHash, { publisher, dimension, complexity, price }, config = {}) => {

    if (!config.web3) {
        throw pjsError(WEB3_REQUIRED);
    }

    if (!config.contracts || !config.contracts.Kernel || !config.contracts.Kernel.abi) {
        throw pjsError(CONTRACT_REQUIRED, 'Kernel');
    }

    try {
        const args = [config.web3.utils.toHex(kernelIpfsHash), dimension, complexity, price];
        
        // Estimate required amount of gas
        const gas = await web3Helpers.estimateGas(config.contracts.Kernel.bytecode, args, config);

        // Create and deploy kernel contract
        const kernelContractAddress = await web3Helpers.deployContract(config.contracts.Kernel, {
            args,
            from: publisher,
            gas: Number.parseInt(gas * 1.5, 10)
        }, config);

        return kernelContractAddress;
    } catch(err) {
        return Promise.reject(err);
    }
};

/**
 * Add kernel to market
 * 
 * @param {String} kernelContractAddress 
 * @param {String} publisherAddress 
 * @param {Object} config Library config (provided by the proxy but can be overridden)
 * @returns {Promise} Promise object resolved to {string} contractAddress // can be null if used ganache-cli environment
 */
export const addToMarket = (kernelContractAddress, publisherAddress, config = {}) => new Promise((resolve, reject) => {

    if (!config.web3) {
        throw pjsError(WEB3_REQUIRED);
    }

    if (!config.contracts || !config.contracts.PandoraMarket || !config.contracts.PandoraMarket.abi) {
        throw pjsError(CONTRACT_REQUIRED, 'PandoraMarket');
    }

    if (!config.addresses || !config.addresses.PandoraMarket) {
        throw pjsError(ADDRESS_REQUIRED, 'Market');
    }

    if (!config.web3.currentProvider.isMetaMask) {
        throw pjsError(WEB3_METAMASK_REQUIRED);
    }

    const market = new config.web3.eth.Contract(config.contracts.PandoraMarket.abi, config.addresses.PandoraMarket);
    market.methods
        .addKernel(kernelContractAddress)
        .send({
            from: publisherAddress
        })
        .on('error', reject)
        .on('receipt', receipt => resolve(receipt.contractAddress));
});

/**
 * Handle event KernelAdded
 * 
 * @param {Function} storeCallback 
 * @param {Function} errorCallback
 * @param {Object} config Library config (provided by the proxy but can be overridden)
 */
export const eventKernelAdded = (storeCallback = () => {}, errorCallback = () => {}, config = {}) => {

    if (!config.web3) {
        throw pjsError(WEB3_REQUIRED);
    }

    if (!config.contracts || !config.contracts.PandoraMarket || !config.contracts.PandoraMarket.abi) {
        throw pjsError(CONTRACT_REQUIRED, 'PandoraMarket');
    }

    if (!config.addresses || !config.addresses.PandoraMarket) {
        throw pjsError(ADDRESS_REQUIRED, 'PandoraMarket');
    }

    const mar = new config.web3.eth.Contract(config.contracts.PandoraMarket.abi, config.addresses.PandoraMarket);
    mar.events.KernelAdded({
        fromBlock: 0
    }, errorCallback)
        .on('data', async res => {

            try {

                const kernel = await fetchKernel(res.args.kernel, config);
                storeCallback({
                    address: res.args.kernel,
                    kernel,
                    status: 'created',
                    event: 'PandoraMarket.KernelAdded'
                });
            } catch(err) {
                errorCallback(err);
            }            
        })
        .on('error', errorCallback);
};
