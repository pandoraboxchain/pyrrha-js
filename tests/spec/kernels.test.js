'use strict';

const { expect } = require('chai');
const ContractsNode = require('../contracts')();
const Pjs = require('../../src');

describe('Kernels tests:', () => {

    let pjs;
    let server;
    let provider;
    let contracts;
    let addresses;
    let publisher;
    
    const kernelIpfsHash = 'QmVDqZiZspRJLb5d5UjBmGfVsXwxWB3Pga2n33eWovtjV7';
    const kernelOptions = {
        dimension: 100, 
        complexity: 100, 
        price: 100
    };
    let kernelContractAddress;
    
    before(() => ContractsNode
        .then(node => {

            server = node.node;
            provider = node.provider;
            contracts = node.contracts;
            addresses = node.addresses;
            publisher = node.publisher;
            kernelOptions.publisher = publisher;

            pjs = new Pjs({
                eth: {
                    provider
                },
                contracts,
                addresses
            });

            return pjs;
        })
        .then(pjs => pjs.kernels.deploy(kernelIpfsHash, kernelOptions))
        .then(address => {
            kernelContractAddress = address;
        }));

    after(done => server.close(done));

    it('#fetchCount should return a number', async () => {
        const count = await pjs.kernels.fetchCount();
        expect(count).to.be.a('number');
    });

    it('#fetchAddressById', async () => {
        const kernelAddress = await pjs.kernels.fetchAddressById(0);
        expect(kernelAddress).to.be.a('string');
    });

    it('#deploy should resolved to an address of the deployed contract', () => {
        expect(kernelContractAddress).to.be.a('string');
    });

    it('#addToMarket should resolved to an address of the added to the PandoraMarket contract', async () => {
        const addedContractAddress = await pjs.kernels.addToMarket(kernelContractAddress, publisher);
        expect(kernelContractAddress).to.be.equal(addedContractAddress);
    });

    it('#fetchIpfsAddress shuld fetch a ipfs hash of a previously added kernel', async () => {
        const ipfsAddress = await pjs.kernels.fetchIpfsAddress(kernelContractAddress);
        expect(ipfsAddress).to.be.equal(kernelIpfsHash);
    });

    it('#fetchDataDim should fetch data dimension of a previously added kernel', async () => {
        const dataDim = await pjs.kernels.fetchDataDim(kernelContractAddress);
        expect(dataDim).to.be.a('number');
        expect(dataDim).to.be.equal(kernelOptions.dimension);
    });

    it('#fetchCurrentPrice should fetch current price of a previously added kernel', async () => {
        const currentPrice = await pjs.kernels.fetchCurrentPrice(kernelContractAddress);
        expect(currentPrice).to.be.a('number');
        expect(currentPrice).to.be.equal(kernelOptions.price);
    });

    it('#fetchComplexity should fetch complexity of a previously added kernel', async () => {
        const complexity = await pjs.kernels.fetchComplexity(kernelContractAddress);
        expect(complexity).to.be.equal(kernelOptions.complexity);
    });

    it('#fetchKernel should fetch a previously added kernel', async () => {
        const kernel = await pjs.kernels.fetchKernel(kernelContractAddress);
        expect(kernelContractAddress).to.be.equal(kernel.address);
    });

    it('#fetchAll should fetch kernels records', async () => {
        const kernels = await pjs.kernels.fetchAll();
        expect(kernels).to.be.a('object');
        expect(kernels).to.have.property('records').to.satisfy(val => Array.isArray(val));
        expect(kernels).to.have.property('error').to.satisfy(val => Array.isArray(val));
        expect(kernels.records.length).to.satisfy(val => val > 0);
    });

    it('#removeKernel should remove previously added kernel without errors', async () => {
        const options = {
            publisher, 
            dimension: 100, 
            complexity: 100, 
            price: 100
        };

        const kernelContractAddress = await pjs.kernels.deploy(kernelIpfsHash, options);
        await pjs.kernels.addToMarket(kernelContractAddress, publisher);
        await pjs.kernels.removeKernel(kernelContractAddress, publisher);
    });

    it('#eventKernelAdded should handle KernelAdded event', () => new Promise((resolve, reject) => {
        let addressAdded;
        let timeout = setTimeout(() => reject(new Error('Event timeout of 5 sec exceeded')), 5000);

        pjs.kernels.eventKernelAdded({})
            .then(result => {
                expect(result.address === addressAdded).to.be.true;
                clearTimeout(timeout);
                resolve();
            })
            .catch(reject);

        const options = {
            publisher, 
            dimension: 100, 
            complexity: 100, 
            price: 100
        };

        pjs.kernels.deploy(kernelIpfsHash, options)
            .then(kernelContractAddress => {
                addressAdded = kernelContractAddress;
                return pjs.kernels.addToMarket(kernelContractAddress, publisher);
            })
            .catch(reject);
    }));

    it('#eventKernelRemoved should handle KernelRemoved event', () => new Promise((resolve, reject) => {
        let addressAdded;
        let timeout = setTimeout(() => reject(new Error('Event timeout of 5 sec exceeded')), 5000);

        pjs.kernels.eventKernelRemoved({})
            .then(result => {
                expect(result.address === addressAdded).to.be.true;
                clearTimeout(timeout);
                resolve();
            })
            .catch(reject);

        const options = {
            publisher, 
            dimension: 100, 
            complexity: 100, 
            price: 100
        };

        pjs.kernels.deploy(kernelIpfsHash, options)
            .then(kernelContractAddress => {
                addressAdded = kernelContractAddress;
                return pjs.kernels.addToMarket(kernelContractAddress, publisher);
            })
            .then(() => pjs.kernels.removeKernel(addressAdded, publisher))
            .catch(reject);
    }));
});
