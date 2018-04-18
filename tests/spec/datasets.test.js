'use strict';

const { expect } = require('chai');
const ContractsNode = require('../contracts')();
const Pjs = require('../../src');

describe('Datasets tests:', () => {

    let pjs;
    let server;
    let provider;
    let contracts;
    let addresses;
    let publisher;
    
    const datasetIpfsHash = 'QmVDqZiZspRJLb5d5UjBmGfVsXwxWB3Pga2n33eWovtjV7';
    const batchesCount = 10;
    const datasetOptions = {
        dimension: 100, 
        samples: 10, 
        price: 100
    };
    let datasetContractAddress;
    
    before(() => ContractsNode
        .then(node => {

            server = node.node;
            provider = node.provider;
            contracts = node.contracts;
            addresses = node.addresses;
            publisher = node.publisher;
            datasetOptions.publisher = publisher;

            pjs = new Pjs({
                eth: {
                    provider
                },
                contracts,
                addresses
            });

            return pjs;
        })
        .then(pjs => pjs.datasets.deploy(datasetIpfsHash, batchesCount, datasetOptions))
        .then(address => {
            datasetContractAddress = address;
        }));

    after(done => server.close(done));

    it('#fetchCount should return a number', async () => {
        const count = await pjs.datasets.fetchCount();
        expect(count).to.be.a('number');
    });

    it('#fetchAddressById', async () => {
        const datasetAddress = await pjs.datasets.fetchAddressById(0);
        expect(datasetAddress).to.be.a('string');
    });

    it('#deploy should resolved to an address of the deployed contract', () => {
        expect(datasetContractAddress).to.be.a('string');
    });

    it('#addToMarket should resolved to an address of the added to the PandoraMarket contract', async () => {
        const addedContractAddress = await pjs.datasets.addToMarket(datasetContractAddress, publisher);
        expect(datasetContractAddress).to.be.equal(addedContractAddress);
    });

    it('#fetchIpfsAddress shuld fetch a ipfs hash of a previously added dataset', async () => {
        const ipfsAddress = await pjs.datasets.fetchIpfsAddress(datasetContractAddress);
        expect(ipfsAddress).to.be.equal(datasetIpfsHash);
    });

    it('#fetchDataDim should fetch data dimension of a previously added dataset', async () => {
        const dataDim = await pjs.datasets.fetchDataDim(datasetContractAddress);
        expect(dataDim).to.be.a('number');
        expect(dataDim).to.be.equal(datasetOptions.dimension);
    });

    it('#fetchCurrentPrice should fetch current price of a previously added dataset', async () => {
        const currentPrice = await pjs.datasets.fetchCurrentPrice(datasetContractAddress);
        expect(currentPrice).to.be.a('number');
        expect(currentPrice).to.be.equal(datasetOptions.price);
    });

    it('#fetchSamplesCount should fetch samples count of a previously added dataset', async () => {
        const samplesCount = await pjs.datasets.fetchSamplesCount(datasetContractAddress);
        expect(samplesCount).to.be.equal(datasetOptions.samples);
    });

    it('#fetchDataset should fetch a previously added dataset', async () => {
        const dataset = await pjs.datasets.fetchDataset(datasetContractAddress);
        expect(datasetContractAddress).to.be.equal(dataset.address);
    });

    it('#fetchAll should fetch datasets records', async () => {
        const datasets = await pjs.datasets.fetchAll();
        expect(datasets).to.be.a('object');
        expect(datasets).to.have.property('records').to.satisfy(val => Array.isArray(val));
        expect(datasets).to.have.property('error').to.satisfy(val => Array.isArray(val));
        expect(datasets.records.length).to.satisfy(val => val > 0);
    });

    it('#removeDataset should remove previously added dataset without errors', async () => {
        const options = {
            publisher, 
            dimension: 100, 
            samples: 10, 
            price: 100
        };

        const datasetContractAddress = await pjs.datasets.deploy(datasetIpfsHash, batchesCount, options);
        await pjs.datasets.addToMarket(datasetContractAddress, publisher);
        await pjs.datasets.removeDataset(datasetContractAddress, publisher);
    });

    it('#eventDatasetAdded should handle DatasetAdded event', () => new Promise((resolve, reject) => {
        let addressAdded;
        let timeout = setTimeout(() => reject(new Error('Event timeout of 5 sec exceeded')), 5000);

        pjs.datasets.eventDatasetAdded({})
            .then(result => {
                expect(result.address === addressAdded).to.be.true;
                clearTimeout(timeout);
                resolve();
            })
            .catch(reject);

        const options = {
            publisher, 
            dimension: 100, 
            samples: 10, 
            price: 100
        };

        pjs.datasets.deploy(datasetIpfsHash, batchesCount, options)
            .then(datasetContractAddress => {
                addressAdded = datasetContractAddress;
                return pjs.datasets.addToMarket(datasetContractAddress, publisher);
            })
            .catch(reject);
    }));

    it('#eventDatasetRemoved should handle DatasetRemoved event', () => new Promise((resolve, reject) => {
        let addressAdded;
        let timeout = setTimeout(() => reject(new Error('Event timeout of 5 sec exceeded')), 5000);

        pjs.datasets.eventDatasetRemoved({})
            .then(result => {
                expect(result.address === addressAdded).to.be.true;
                clearTimeout(timeout);
                resolve();
            })
            .catch(reject);

        const options = {
            publisher, 
            dimension: 100, 
            samples: 10, 
            price: 100
        };

        pjs.datasets.deploy(datasetIpfsHash, batchesCount, options)
            .then(datasetContractAddress => {
                addressAdded = datasetContractAddress;
                return pjs.datasets.addToMarket(datasetContractAddress, publisher);
            })
            .then(() => pjs.datasets.removeDataset(addressAdded, publisher))
            .catch(reject);
    }));
});
