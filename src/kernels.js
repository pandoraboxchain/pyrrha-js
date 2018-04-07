/**
 * Kernels related methods
 * This file it is a part of the Pandora Pyrrha Javascript library
 * 
 * @file kernels.js
 * @author Kostiantyn Smyrnov <kostysh@gmail.com>
 * @date 2018
 */

'use strict';

import * as expect from './helpers/expect';
import {
    CONTRACT_REQUIRED,
    ADDRESS_REQUIRED,
    WEB3_REQUIRED,
    WEB3_METAMASK_REQUIRED
} from './helpers/errors';
import * as web3Helpers from './helpers/web3';

/**
 * Get kernels count from PandoraMarket contract
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
        'contracts.PandoraMarket.abi': {
            type: 'object',
            code: CONTRACT_REQUIRED,
            args: ['PandoraMarket']
        },
        'addresses.PandoraMarket': {
            type: 'string',
            code: ADDRESS_REQUIRED,
            args: ['PandoraMarket']
        }
    });

    const mar = new config.web3.eth.Contract(config.contracts.PandoraMarket.abi, config.addresses.PandoraMarket);
    const count = await mar.methods
        .kernelsCount()
        .call();

    return Number.parseInt(count, 10);
};

/**
 * Get Kernel address by kernel id
 * 
 * @param {number} id
 * @param {Object} config Library config (provided by the proxy but can be overridden)
 * @returns {Promise} A Promise object represents the {string}
 */
export const fetchAddressById = async (id, config = {}) => {

    expect.all(config, {
        'web3': {
            type: 'object',
            code: WEB3_REQUIRED
        },
        'contracts.PandoraMarket.abi': {
            type: 'object',
            code: CONTRACT_REQUIRED,
            args: ['PandoraMarket']
        },
        'addresses.PandoraMarket': {
            type: 'string',
            code: ADDRESS_REQUIRED,
            args: ['PandoraMarket']
        }
    });

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

    expect.all(config, {
        'web3': {
            type: 'object',
            code: WEB3_REQUIRED
        },
        'contracts.Kernel.abi': {
            type: 'object',
            code: CONTRACT_REQUIRED,
            args: ['Kernel']
        }
    });

    const ker = new config.web3.eth.Contract(config.contracts.Kernel.abi, address);
    const ipfsAddress = await ker.methods
        .ipfsAddress()
        .call();

    return config.web3.utils.hexToAscii(ipfsAddress);
};

/**
 * Get data dim from Kernel contract by the kernel address
 * 
 * @param {string} address
 * @param {Object} config Library config (provided by the proxy but can be overridden)
 * @returns {Promise} A Promise object represents the {number}
 */
export const fetchDataDim = async (address = '', config = {}) => {

    expect.all(config, {
        'web3': {
            type: 'object',
            code: WEB3_REQUIRED
        },
        'contracts.Kernel.abi': {
            type: 'object',
            code: CONTRACT_REQUIRED,
            args: ['Kernel']
        }
    });

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

    expect.all(config, {
        'web3': {
            type: 'object',
            code: WEB3_REQUIRED
        },
        'contracts.Kernel.abi': {
            type: 'object',
            code: CONTRACT_REQUIRED,
            args: ['Kernel']
        }
    });

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

    expect.all(config, {
        'web3': {
            type: 'object',
            code: WEB3_REQUIRED
        },
        'contracts.Kernel.abi': {
            type: 'object',
            code: CONTRACT_REQUIRED,
            args: ['Kernel']
        }
    });

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
};

/**
 * Get kernel by id
 * 
 * @param {integer} id 
 * @param {Object} config Library config (provided by the proxy but can be overridden)
 * @returns {Promise} A Promise object represents the {Object}
 */
export const fetchKernelById = async (id, config = {}) => {
    
    const address = await fetchAddressById(id, config);
    const kernel = await fetchKernel(address, config);

    return kernel;
};

/**
 * Get all kernels
 * 
 * @param {Object} config Library config (provided by the proxy but can be overridden)
 * @returns {Promise} Promise object represents the {Object[]}
 */
export const fetchAll = async (config = {}) => {

    let records = [];
    let error = [];

    try {

        const count = await fetchCount(config);

        for (let i=0; i < count; i++) {
            
            try {

                const kernel = await fetchKernelById(i, config);

                records.push({
                    id: i,
                    ...kernel
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
 * Deploy Kernel contract to the network
 * 
 * @param {string} kernelIpfsHash 
 * @param {Object} options { publisher, dimension, complexity, price } 
 * @param {Object} config Library config (provided by the proxy but can be overridden)
 * @returns {Promise} Promise object resolved to contract address
 */
export const deploy = async (kernelIpfsHash, { publisher, dimension, complexity, price }, config = {}) => {

    expect.all(config, {
        'web3': {
            type: 'object',
            code: WEB3_REQUIRED
        },
        'contracts.Kernel.abi': {
            type: 'object',
            code: CONTRACT_REQUIRED,
            args: ['Kernel']
        }
    });

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

    expect.all(config, {
        'web3': {
            type: 'object',
            code: WEB3_REQUIRED
        },
        'contracts.PandoraMarket.abi': {
            type: 'object',
            code: CONTRACT_REQUIRED,
            args: ['PandoraMarket']
        },
        'addresses.PandoraMarket': {
            type: 'string',
            code: ADDRESS_REQUIRED,
            args: ['Kernel']
        },
        'web3.currentProvider.isMetaMask': {
            type: 'boolean',
            code: WEB3_METAMASK_REQUIRED
        }
    });

    const market = new config.web3.eth.Contract(config.contracts.PandoraMarket.abi, config.addresses.PandoraMarket);
    market.methods
        .addKernel(kernelContractAddress)
        .send({
            from: publisherAddress
        })
        .on('error', reject)
        .on('receipt', receipt => {

            if (Number(receipt.status) === 0) {

                return reject(new Error('Transaction was unsuccessful'));
            }

            resolve(receipt.contractAddress || receipt.events.KernelAdded.returnValues.kernel);
        });
    // @note In case of ganache-cli blockchain "contractAddress" always will be equal to null
});

/**
 * Remove kernel from PandoraMarket
 * 
 * @param {String} kernelAddress
 * @param {String} publisherAddress 
 * @param {Object} config Library config (provided by the proxy but can be overridden) 
 */
export const removeKernel = (kernelAddress, publisherAddress, config = {}) => new Promise((resolve, reject) => {

    expect.all(config, {
        'web3': {
            type: 'object',
            code: WEB3_REQUIRED
        },
        'contracts.PandoraMarket.abi': {
            type: 'object',
            code: CONTRACT_REQUIRED,
            args: ['PandoraMarket']
        },
        'addresses.PandoraMarket': {
            type: 'string',
            code: ADDRESS_REQUIRED,
            args: ['Kernel']
        }
    });

    const market = new config.web3.eth.Contract(config.contracts.PandoraMarket.abi, config.addresses.PandoraMarket);
    market.methods
        .removeKernel(kernelAddress)
        .send({
            from: publisherAddress
        })
        .on('error', reject)
        .on('receipt', receipt => {

            if (Number(receipt.status) === 0) {

                return reject(new Error('Transaction was unsuccessful'));
            }

            resolve(receipt.contractAddress);
        });
});

/**
 * Handle event KernelAdded
 * 
 * @param {Object} config Library config (provided by the proxy but can be overridden)
 */
export const eventKernelAdded = (config = {}) => new Promise((resolve, reject) => {

    expect.all(config, {
        'web3': {
            type: 'object',
            code: WEB3_REQUIRED
        },
        'contracts.PandoraMarket.abi': {
            type: 'object',
            code: CONTRACT_REQUIRED,
            args: ['PandoraMarket']
        },
        'addresses.PandoraMarket': {
            type: 'string',
            code: ADDRESS_REQUIRED,
            args: ['Kernel']
        }
    });

    const mar = new config.web3.eth.Contract(config.contracts.PandoraMarket.abi, config.addresses.PandoraMarket);
    mar.events.KernelAdded()
        .on('data', async res => {

            try {

                const kernel = await fetchKernel(res.returnValues.kernel, config);
                resolve({
                    address: res.returnValues.kernel,
                    kernel,
                    status: 'created',
                    event: 'PandoraMarket.KernelAdded'
                });
            } catch(err) {
                reject(err);
            }            
        })
        .on('error', reject);
});

/**
 * Handle event KernelRemoved
 * 
 * @param {Object} config Library config (provided by the proxy but can be overridden)
 */
export const eventKernelRemoved = (config = {}) => new Promise((resolve, reject) => {

    expect.all(config, {
        'web3': {
            type: 'object',
            code: WEB3_REQUIRED
        },
        'contracts.PandoraMarket.abi': {
            type: 'object',
            code: CONTRACT_REQUIRED,
            args: ['PandoraMarket']
        },
        'addresses.PandoraMarket': {
            type: 'string',
            code: ADDRESS_REQUIRED,
            args: ['Kernel']
        }
    });

    const mar = new config.web3.eth.Contract(config.contracts.PandoraMarket.abi, config.addresses.PandoraMarket);
    mar.events.KernelRemoved()
        .on('data', async res => {

            resolve({
                address: res.returnValues.kernel,
                status: 'removed',
                event: 'PandoraMarket.KernelRemoved'
            });            
        })
        .on('error', reject);
});
