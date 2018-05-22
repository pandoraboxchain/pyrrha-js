'use strict';

const { expect } = require('chai');
const web3Helper = require('../../src/helpers/web3');
const ContractsNode = require('../contracts');
const Pjs = require('../../src');

describe('Helper #web3 tests:', () => {

    let pjs;
    let server;
    let provider;
    let contracts;
    let addresses;
    let publisher;

    let kernelIpfsHash = 'QmVDqZiZspRJLb5d5UjBmGfVsXwxWB3Pga2n33eWovtjV7';
    let kernelOptions = {
        dimension: 100, 
        complexity: 100, 
        price: 100
    };

    before(async () => {
        const node = await ContractsNode();
        
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
    });

    after(done => server.close(done));

    it('Module should expose method "estimateGas" as a function', () => {
        expect(web3Helper.estimateGas).to.be.a('function');
    });

    it('Module should expose method "deployContract" as a function', () => {
        expect(web3Helper.deployContract).to.be.a('function');
    });

    it('#estimateGas should fetch possible required gas value', async () => {
        const args = [
            pjs.api.web3.utils.toHex(kernelIpfsHash), 
            kernelOptions.dimension, 
            kernelOptions.complexity, 
            kernelOptions.price
        ];

        const gas = await web3Helper.estimateGas(pjs.config.contracts.Kernel.bytecode, args, pjs.config);
        expect(gas).to.be.a('number');
    });

    it('#deployContract', async () => {
        const args = [
            pjs.api.web3.utils.toHex(kernelIpfsHash), 
            kernelOptions.dimension, 
            kernelOptions.complexity, 
            kernelOptions.price
        ];

        const gas = await web3Helper.estimateGas(pjs.config.contracts.Kernel.bytecode, args, pjs.config);
        const kernelContractAddress = await web3Helper.deployContract(pjs.config.contracts.Kernel, {
            args,
            from: publisher,
            gas: Number.parseInt(gas * 1.5, 10)
        }, pjs.config);
        expect(kernelContractAddress).to.be.a('string');
        expect(kernelContractAddress).to.satisfy(address => {
            return new RegExp('^0x[a-fA-F0-9]{40}$').test(address);
        }, 'math to ethereum address regexp');
    });
});
