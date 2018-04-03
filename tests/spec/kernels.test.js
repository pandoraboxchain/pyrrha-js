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
    
    let kernelIpfsHash = 'QmVDqZiZspRJLb5d5UjBmGfVsXwxWB3Pga2n33eWovtjV7';
    
    before(() => ContractsNode
        .then(node => {

            server = node.node;
            provider = node.provider;
            contracts = node.contracts;
            addresses = node.addresses;
            publisher = node.publisher;
            
            pjs = new Pjs({
                eth: {
                    provider
                },
                contracts,
                addresses
            });

            return;
        }));

    after(done => server.close(done));

    it('#deploy should resolved to an address of the deployed contract', async () => {
        let options = {
            publisher, 
            dimension: 100, 
            complexity: 100, 
            price: 100
        };

        let kernelContractAddress = await pjs.kernels.deploy(kernelIpfsHash, options);
        expect(kernelContractAddress).to.be.a('string');
        return;
    });

    it('#addToMarket should resolved to an address of the added to the PandoraMarket contract', async () => {
        let options = {
            publisher, 
            dimension: 100, 
            complexity: 100, 
            price: 100
        };

        let kernelContractAddress = await pjs.kernels.deploy(kernelIpfsHash, options);
        let addedContractAddress = await pjs.kernels.addToMarket(kernelContractAddress, publisher);

        expect(kernelContractAddress).to.be.equal(addedContractAddress);
        return;
    });

    it('#fetchKernel should fetch a previously added kernel', async () => {
        let options = {
            publisher, 
            dimension: 100, 
            complexity: 100, 
            price: 100
        };

        let kernelContractAddress = await pjs.kernels.deploy(kernelIpfsHash, options);
        let kernel = await pjs.kernels.fetchKernel(kernelContractAddress);

        expect(kernelContractAddress).to.be.equal(kernel.address);
        return;
    });

    it('#eventKernelAdded should handle KernelAdded event', () => new Promise((resolve, reject) => {
        let addressAdded;

        pjs.kernels.eventKernelAdded(
            result => {
                expect(result.address === addressAdded).to.be.true;
                resolve();
            },
            reject);

        let options = {
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
