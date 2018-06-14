/**
 * Datasets related methods
 * This file it is a part of the Pandora Pyrrha Javascript library
 * 
 * @file datasets.js
 * @author Kostiantyn Smyrnov <kostysh@gmail.com>
 * @date 2018
 */

'use strict';

import * as expect from './helpers/expect';
import pjsError, {
    CONTRACT_REQUIRED,
    ADDRESS_REQUIRED,
    WEB3_REQUIRED,
    WEB3_METAMASK_REQUIRED,
    TRANSACTION_UNSUCCESSFUL
} from './helpers/errors';
import * as web3Helpers from './helpers/web3';

/**
 * Get datasets count from PandoraMarket contract
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
            type: 'address',
            code: ADDRESS_REQUIRED,
            args: ['PandoraMarket']
        }
    });

    const mar = new config.web3.eth.Contract(config.contracts.PandoraMarket.abi, config.addresses.PandoraMarket);
    const count = await mar.methods
        .datasetsCount()
        .call();

    return Number.parseInt(count, 10);
};

/**
 * Get Dataset address by dataset id
 * 
 * @param {number} id
 * @param {Object} config Library config (provided by the proxy but can be overridden)
 * @returns {Promise} A Promise object represents the {string}
 */
export const fetchAddressById = async (id, config = {}) => {

    expect.all({ id }, {
        'id': {
            type: 'number'
        }
    });

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
            type: 'address',
            code: ADDRESS_REQUIRED,
            args: ['Market']
        }
    });

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

    expect.all({ address }, {
        'address': {
            type: 'address'
        }
    });

    expect.all(config, {
        'web3': {
            type: 'object',
            code: WEB3_REQUIRED
        },
        'contracts.Dataset.abi': {
            type: 'object',
            code: CONTRACT_REQUIRED,
            args: ['Dataset']
        }
    });

    const dat = new config.web3.eth.Contract(config.contracts.Dataset.abi, address);
    const ipfsAddress = await dat.methods
        .ipfsAddress()
        .call();

    return config.web3.utils.hexToAscii(ipfsAddress);
};

/**
 * Get data dim from Dataset contract by the dataset address
 * 
 * @param {string} address
 * @param {Object} config Library config (provided by the proxy but can be overridden)
 * @returns {Promise} A Promise object represents the {number}
 */
export const fetchDataDim = async (address = '', config = {}) => {

    expect.all({ address }, {
        'address': {
            type: 'address'
        }
    });

    expect.all(config, {
        'web3': {
            type: 'object',
            code: WEB3_REQUIRED
        },
        'contracts.Dataset.abi': {
            type: 'object',
            code: CONTRACT_REQUIRED,
            args: ['Dataset']
        }
    });

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

    expect.all({ address }, {
        'address': {
            type: 'address'
        }
    });

    expect.all(config, {
        'web3': {
            type: 'object',
            code: WEB3_REQUIRED
        },
        'contracts.Dataset.abi': {
            type: 'object',
            code: CONTRACT_REQUIRED,
            args: ['Dataset']
        }
    });

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

    expect.all({ address }, {
        'address': {
            type: 'address'
        }
    });

    expect.all(config, {
        'web3': {
            type: 'object',
            code: WEB3_REQUIRED
        },
        'contracts.Dataset.abi': {
            type: 'object',
            code: CONTRACT_REQUIRED,
            args: ['Dataset']
        }
    });

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

    expect.all({ address }, {
        'address': {
            type: 'address'
        }
    });

    expect.all(config, {
        'web3': {
            type: 'object',
            code: WEB3_REQUIRED
        },
        'contracts.Dataset.abi': {
            type: 'object',
            code: CONTRACT_REQUIRED,
            args: ['Dataset']
        }
    });

    const dat = new config.web3.eth.Contract(config.contracts.Dataset.abi, address);
    const batchesCount = await dat.methods
        .batchesCount()
        .call();
        
    return Number.parseInt(batchesCount, 10);
};

/**
 * Get description from Dataset contract by the dataset address
 * 
 * @param {string} address
 * @param {Object} config Library config (provided by the proxy but can be overridden)
 * @returns {Promise} A Promise object represents the {number}
 */
export const fetchDescription = async (address = '', config = {}) => {

    expect.all({ address }, {
        'address': {
            type: 'address'
        }
    });

    expect.all(config, {
        'web3': {
            type: 'object',
            code: WEB3_REQUIRED
        },
        'contracts.Dataset.abi': {
            type: 'object',
            code: CONTRACT_REQUIRED,
            args: ['Dataset']
        }
    });

    const dat = new config.web3.eth.Contract(config.contracts.Dataset.abi, address);
    const description = await dat.methods
        .description()
        .call();

    return Number.parseInt(description, 10);
};

/**
 * Get meta tags from Dataset contract by the dataset address
 * 
 * @param {string} address
 * @param {Object} config Library config (provided by the proxy but can be overridden)
 * @returns {Promise} A Promise object represents the {number}
 */
export const fetchTags = async (address = '', config = {}) => {

    expect.all({ address }, {
        'address': {
            type: 'address'
        }
    });

    expect.all(config, {
        'web3': {
            type: 'object',
            code: WEB3_REQUIRED
        },
        'contracts.Dataset.abi': {
            type: 'object',
            code: CONTRACT_REQUIRED,
            args: ['Dataset']
        }
    });

    const dat = new config.web3.eth.Contract(config.contracts.Dataset.abi, address);
    const tags = await dat.methods
        .tags()
        .call();

    return Number.parseInt(tags, 10);
};

/**
 * Get dataset by the dataset address
 * 
 * @param {string} address
 * @param {Object} config Library config (provided by the proxy but can be overridden)
 * @returns {Promise} Promise object represents the {Object[]}
 */
export const fetchDataset = async (address = '', config = {}) => {

    expect.all({ address }, {
        'address': {
            type: 'address'
        }
    });

    const [
        ipfsAddress,
        dataDim,
        currentPrice,
        samplesCount,
        batchesCount,
        description,
        tags
    ] = await Promise.all([
        fetchIpfsAddress(address, config),
        fetchDataDim(address, config),
        fetchCurrentPrice(address, config),
        fetchSamplesCount(address, config),
        fetchBatchesCount(address, config),
        fetchDescription(address, config),
        fetchTags(address, config)
    ]);

    return {
        address,
        ipfsAddress,
        dataDim,
        currentPrice,
        samplesCount,
        batchesCount,
        description,
        tags
    };
};

/**
 * Get dataset by id
 * 
 * @param {number} id 
 * @param {Object} config Library config (provided by the proxy but can be overridden)
 * @returns {Promise} A Promise object represents the {Object}
 */
export const fetchDatasetById = async (id, config = {}) => {

    const address = await fetchAddressById(id, config);
    const dataset = await fetchDataset(address, config);

    return dataset;
};

/**
 * Get all datasets
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

                const dataset = await fetchDatasetById(i, config);

                records.push({
                    id: i,
                    ...dataset
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
 * Deploy Datset contract to the network
 * 
 * @param {string} datasetIpfsHash 
 * @param {Object} options { publisher, dimension, samples, price } 
 * @param {Object} config Library config (provided by the proxy but can be overridden)
 * @returns {Promise} Promise object resolved to contract address
 */
export const deploy = async (datasetIpfsHash, batchesCount, { publisher, dimension, samples, price, description, tags }, config = {}) => {

    expect.all({ datasetIpfsHash, batchesCount, publisher, dimension, samples, price, description, tags }, {
        'datasetIpfsHash': {
            type: 'string'
        },
        'batchesCount': {
            type: 'number'
        },
        'publisher': {
            type: 'address'
        },
        'dimension': {
            type: 'number'
        },
        'samples': {
            type: 'number'
        },
        'price': {
            type: 'number'
        },
        'description': {
            type: 'string'
        },
        'tags': {
            type: 'string'
        }
    });

    expect.all(config, {
        'web3': {
            type: 'object',
            code: WEB3_REQUIRED
        },
        'contracts.Dataset': {
            type: 'object',
            code: CONTRACT_REQUIRED,
            args: ['Dataset']
        },
        'web3.currentProvider.isMetaMask': {
            type: 'boolean',
            code: WEB3_METAMASK_REQUIRED
        }
    });

    const args = [
        config.web3.utils.toHex(datasetIpfsHash), 
        dimension, 
        samples, 
        batchesCount, 
        price, 
        config.web3.utils.toHex(description), 
        config.web3.utils.toHex(tags)
    ];
        
    // Estimate required amount of gas
    const gas = await web3Helpers.estimateGas(config.contracts.Dataset.bytecode, args, config);

    // Create and deploy dataset contract
    const datasetContractAddress = await web3Helpers.deployContract(config.contracts.Dataset, {
        args,
        from: publisher,
        gas: Number.parseInt(gas * 1.5, 10)
    }, config);

    return datasetContractAddress;
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

    expect.all({ datasetContractAddress, publisherAddress }, {
        'datasetContractAddress': {
            type: 'address'
        },
        'publisherAddress': {
            type: 'address'
        }
    });

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
            type: 'address',
            code: ADDRESS_REQUIRED,
            args: ['Market']
        },
        'web3.currentProvider.isMetaMask': {
            type: 'boolean',
            code: WEB3_METAMASK_REQUIRED
        }
    });

    const market = new config.web3.eth.Contract(config.contracts.PandoraMarket.abi, config.addresses.PandoraMarket);
    market.methods
        .addDataset(datasetContractAddress)
        .send({
            from: publisherAddress
        })
        .on('error', reject)
        .on('receipt', receipt => {

            if (Number(receipt.status) === 0) {

                return reject(pjsError(TRANSACTION_UNSUCCESSFUL));
            }

            resolve(receipt.contractAddress || receipt.events.DatasetAdded.returnValues.dataset);
        });
    // @note In case of ganache-cli blockchain "contractAddress" always will be equal to null
});

/**
 * Remove dataset from PandoraMarket
 * 
 * @param {String} datasetAddress
 * @param {String} publisherAddress 
 * @param {Object} config Library config (provided by the proxy but can be overridden) 
 */
export const removeDataset = (datasetAddress, publisherAddress, config = {}) => new Promise((resolve, reject) => {

    expect.all({ datasetAddress, publisherAddress }, {
        'datasetAddress': {
            type: 'address'
        },
        'publisherAddress': {
            type: 'address'
        }
    });

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
            type: 'address',
            code: ADDRESS_REQUIRED,
            args: ['PandoraMarket']
        }
    });

    const market = new config.web3.eth.Contract(config.contracts.PandoraMarket.abi, config.addresses.PandoraMarket);
    market.methods
        .removeDataset(datasetAddress)
        .send({
            from: publisherAddress
        })
        .on('error', reject)
        .on('receipt', receipt => {

            if (Number(receipt.status) === 0) {

                return reject(pjsError(TRANSACTION_UNSUCCESSFUL));
            }

            resolve(receipt.contractAddress);
        });
});

/**
 * Handle event DatasetAdded
 * 
 * @param {Object} options Event handler options
 * @param {Object} config Library config (provided by the proxy but can be overridden)
 * @returns {Object} Object with chained callbacks #data and #error
 */
export const eventDatasetAdded = (options = {}, config = {}) => {

    expect.all({ options }, {
        'options': {
            type: 'object'
        }
    });

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
            type: 'address',
            code: ADDRESS_REQUIRED,
            args: ['Market']
        }
    });

    const callbacks = {
        onData: () => {},
        onError: () => {}
    };

    const chain = {
        data: (cb = () => {}) => {
            callbacks.onData = cb;
            return chain;
        },
        error: (cb = () => {}) => {
            callbacks.onError = cb;
            return chain;
        }
    };

    const mar = new config.web3.eth.Contract(config.contracts.PandoraMarket.abi, config.addresses.PandoraMarket);
    mar.events.DatasetAdded(options)
        .on('data', async res => {

            try {

                const dataset = await fetchDataset(res.returnValues.dataset, config);
                callbacks.onData({
                    address: res.returnValues.dataset,
                    dataset,
                    status: 'created',
                    event: 'PandoraMarket.DatasetAdded'
                });
            } catch(err) {
                callbacks.onError(err);
            }            
        })
        .on('error', callbacks.onError);

    return chain;
};

/**
 * Handle event DatasetRemoved
 * 
 * @param {Object} options Event handler options
 * @param {Object} config Library config (provided by the proxy but can be overridden)
 * @returns {Object} Object with chained callbacks #data and #error
 */
export const eventDatasetRemoved = (options = {}, config = {}) => {

    expect.all({ options }, {
        'options': {
            type: 'object'
        }
    });

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
            type: 'address',
            code: ADDRESS_REQUIRED,
            args: ['PandoraMarket']
        }
    });

    const callbacks = {
        onData: () => {},
        onError: () => {}
    };

    const chain = {
        data: (cb = () => {}) => {
            callbacks.onData = cb;
            return chain;
        },
        error: (cb = () => {}) => {
            callbacks.onError = cb;
            return chain;
        }
    };

    const mar = new config.web3.eth.Contract(config.contracts.PandoraMarket.abi, config.addresses.PandoraMarket);
    mar.events.DatasetRemoved(options)
        .on('data', async res => {

            callbacks.onData({
                address: res.returnValues.dataset,
                status: 'removed',
                event: 'PandoraMarket.DatasetRemoved'
            });            
        })
        .on('error', callbacks.onError);

    return chain;
};
