/**
 * Datasets related methods
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
 * Get Dataset address by kernel id
 * 
 * @param {number} id
 * @param {Object} config Library config (provided by the proxy but can be overridden)
 * @returns {Promise} A Promise object represents the {string}
 */
export const fetchAddressById = async (id, config = {}) => {

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
    const datasetContract = await mar.methods
        .datasets(id)
        .call();
    return datasetContract;
};

/**
 * Get IPFS address from Dataset contract by the dataset address
 * 
 * @param {string} address
 * @param {Object} config Library config (provided by the proxy but can be overridden)
 * @returns {Promise} A Promise object represents the {string}
 */
export const fetchIpfsAddress = async (address = '', config = {}) => {

    if (!config.web3) {
        throw pjsError(WEB3_REQUIRED);
    }

    if (!config.contracts || !config.contracts.Dataset || !config.contracts.Dataset.abi) {
        throw pjsError(CONTRACT_REQUIRED, 'Dataset');
    }

    const dat = new config.web3.eth.Contract(config.contracts.Dataset.abi, address);
    const ipfsAddress = await dat.methods
        .ipfsAddress()
        .call();
    return String(ipfsAddress);
};

/**
 * Get data dim from Dataset contract by the dataset address
 * 
 * @param {string} address
 * @param {Object} config Library config (provided by the proxy but can be overridden)
 * @returns {Promise} A Promise object represents the {number}
 */
export const fetchDataDim = async (address = '', config = {}) => {

    if (!config.web3) {
        throw pjsError(WEB3_REQUIRED);
    }

    if (!config.contracts || !config.contracts.Dataset || !config.contracts.Dataset.abi) {
        throw pjsError(CONTRACT_REQUIRED, 'Dataset');
    }

    const dat = new config.web3.eth.Contract(config.contracts.Dataset.abi, address);
    const dataDim = await dat.methods
        .dataDim()
        .call();
    return Number.parseInt(dataDim, 10);
};

/**
 * Get current price from Dataset contract by the dataset address
 * 
 * @param {string} address
 * @param {Object} config Library config (provided by the proxy but can be overridden)
 * @returns {Promise} A Promise object represents the {number}
 */
export const fetchCurrentPrice = async (address = '', config = {}) => {

    if (!config.web3) {
        throw pjsError(WEB3_REQUIRED);
    }

    if (!config.contracts || !config.contracts.Dataset || !config.contracts.Dataset.abi) {
        throw pjsError(CONTRACT_REQUIRED, 'Dataset');
    }

    const dat = new config.web3.eth.Contract(config.contracts.Dataset.abi, address);
    const currentPrice = await dat.methods
        .currentPrice()
        .call();
    return Number.parseInt(currentPrice, 10);
};

/**
 * Get data samples count from Dataset contract by the dataset address
 * 
 * @param {string} address
 * @param {Object} config Library config (provided by the proxy but can be overridden)
 * @returns {Promise} A Promise object represents the {number}
 */
export const fetchSamplesCount = async (address = '', config = {}) => {

    if (!config.web3) {
        throw pjsError(WEB3_REQUIRED);
    }

    if (!config.contracts || !config.contracts.Dataset || !config.contracts.Dataset.abi) {
        throw pjsError(CONTRACT_REQUIRED, 'Dataset');
    }

    const dat = new config.web3.eth.Contract(config.contracts.Dataset.abi, address);
    const samplesCount = await dat.methods
        .samplesCount()
        .call();
    return Number.parseInt(samplesCount, 10);
};

/**
 * Get data batches count from Dataset contract by the dataset address
 * 
 * @param {string} address
 * @param {Object} config Library config (provided by the proxy but can be overridden)
 * @returns {Promise} A Promise object represents the {number}
 */
export const fetchBatchesCount = async (address = '', config = {}) => {

    if (!config.web3) {
        throw pjsError(WEB3_REQUIRED);
    }

    if (!config.contracts || !config.contracts.Dataset || !config.contracts.Dataset.abi) {
        throw pjsError(CONTRACT_REQUIRED, 'Dataset');
    }

    const dat = new config.web3.eth.Contract(config.contracts.Dataset.abi, address);
    const batchesCount = await dat.methods
        .batchesCount()
        .call();
    return Number.parseInt(batchesCount, 10);
};

/**
 * Get dataset by the dataset address
 * 
 * @param {string} address
 * @param {Object} config Library config (provided by the proxy but can be overridden)
 * @returns {Promise} Promise object represents the {Object[]}
 */
export const fetchDataset = async (address = '', config = {}) => {

    try {

        const ipfsAddress = await fetchIpfsAddress(address, config);
        const dataDim = await fetchDataDim(address, config);
        const currentPrice = await fetchCurrentPrice(address, config);
        const samplesCount = await fetchSamplesCount(address, config);
        const batchesCount = await fetchBatchesCount(address, config);

        return {
            address,
            ipfsAddress,
            dataDim,
            currentPrice,
            samplesCount,
            batchesCount
        };
    } catch(err) {
        return Promise.reject(err);
    }
};

/**
 * Get all datasets
 * 
 * @param {Object} config Library config (provided by the proxy but can be overridden)
 * @returns {Promise} Promise object represents the {Object[]}
 */
export const fetchAll = async (config = {}) => {

    let id = 0;
    let records = [];
    let error = [];

    try {

        // @todo Add method getDatasetsCount to the PandoraMarket contract for avoid iterating with "while"
        while (true) {

            const datasetAddress = await fetchAddressById(id++, config);// can be 0x0

            if (+datasetAddress === 0) {
                break;
            }
            
            try {

                const datasetObj = await fetchDataset(datasetAddress, config);
                records.push({
                    id: id,
                    ...datasetObj
                });
            } catch(err) {
                
                error.push({
                    address: datasetAddress,
                    error: err.message
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
 * Deploy Datset contract to the network
 * 
 * @param {string} datasetIpfsHash 
 * @param {Object} options { publisher, dimension, samples, price } 
 * @param {Object} config Library config (provided by the proxy but can be overridden)
 * @returns {Promise} Promise object resolved to contract address
 */
export const deploy = async (datasetIpfsHash, batchesCount, { publisher, dimension, samples, price }, config = {}) => {

    if (!config.web3) {
        throw pjsError(WEB3_REQUIRED);
    }

    if (!config.contracts || !config.contracts.Dataset || !config.contracts.Dataset.abi) {
        throw pjsError(CONTRACT_REQUIRED, 'Dataset');
    }

    try {
        const args = [config.web3.utils.toHex(datasetIpfsHash), dimension, samples, batchesCount, price];
        
        // Estimate required amount of gas
        const gas = await web3Helpers.estimateGas(config.contracts.Dataset.bytecode, args, config);

        // Create and deploy dataset contract
        const datasetContractAddress = await web3Helpers.deployContract(config.contracts.Dataset, {
            args,
            from: publisher,
            gas: Number.parseInt(gas * 1.5, 10)
        }, config);

        return datasetContractAddress;
    } catch(err) {
        return Promise.reject(err);
    }
};

/**
 * Add dataset to market
 * 
 * @param {String} datasetContractAddress 
 * @param {String} publisherAddress 
 * @param {Object} config Library config (provided by the proxy but can be overridden)
 * @returns {Promise} Promise object resolved to {string} contractAddress
 */
export const addToMarket = (datasetContractAddress, publisherAddress, config = {}) => new Promise((resolve, reject) => {

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
        .addDataset(datasetContractAddress)
        .send({
            from: publisherAddress
        })
        .on('error', reject)
        .on('receipt', receipt => resolve(receipt.contractAddress));
});

/**
 * Handle event DatasetAdded
 * 
 * @param {Function} storeCallback 
 * @param {Function} errorCallback
 * @param {Object} config Library config (provided by the proxy but can be overridden)
 */
export const eventDatasetAdded = (storeCallback = () => {}, errorCallback = () => {}, config = {}) => {

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
    mar.events.DatasetAdded({
        fromBlock: 0
    })
        .on('data', async res => {

            try {

                const dataset = await fetchDataset(res.args.dataset, config);
                storeCallback({
                    address: res.args.dataset,
                    dataset,
                    status: 'created',
                    event: 'PandoraMarket.DatasetAdded'
                });
            } catch(err) {
                errorCallback(err);
            }            
        })
        .on('error', errorCallback);
};
