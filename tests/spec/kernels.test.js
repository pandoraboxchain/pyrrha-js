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
        .then(pjs => {
            return pjs.kernels.deploy(kernelIpfsHash, kernelOptions);
        })
        .then(address => {
            kernelContractAddress = address;
        }));

    after(done => server.close(done));

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

    it('#eventKernelAdded should handle KernelAdded event', () => new Promise((resolve, reject) => {
        let addressAdded;

        pjs.kernels.eventKernelAdded(
            result => {
                expect(result.address === addressAdded).to.be.true;
                resolve();
            },
            reject);

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
});
