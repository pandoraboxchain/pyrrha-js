'use strict';

const { expect } = require('chai');
const ContractsNode = require('../contracts');
const Pjs = require('../../src');

describe('Jobs tests:', () => {

    let pjs;
    let server;
    let provider;
    let contracts;
    let addresses;
    let accounts;
    let publisher;
    
    const kernelIpfsHash = 'QmVDqZiZspRJLb5d5UjBmGfVsXwxWB3Pga2n33eWovtjV7';
    const kernelOptions = {
        dimension: 1, 
        complexity: 1, 
        price: 1,
        metadata: 'test',
        description: 'test'
    };
    let kernelContractAddress;

    const datasetIpfsHash = 'QmVDqZiZspRJLb5d5UjBmGfVsXwxWB3Pga2n33eWovtjV7';
    const batchesCount = 1;
    const datasetOptions = {
        dimension: 1, 
        samples: 1, 
        price: 1,
        metadata: 'test',
        description: 'test'
    };
    let datasetContractAddress;

    before('Setup', async () => {
        const node = await ContractsNode();

        server = node.node;
        provider = node.provider;
        contracts = node.contracts;
        addresses = node.addresses;
        accounts = node.accounts;
        publisher = node.publisher;
        datasetOptions.publisher = publisher;
        kernelOptions.publisher = publisher;

        pjs = new Pjs({
            eth: {
                provider
            },
            contracts,
            addresses
        });

        kernelContractAddress = await pjs.kernels.deploy(kernelIpfsHash, kernelOptions);
        await pjs.kernels.addToMarket(kernelContractAddress, publisher);

        datasetContractAddress = await pjs.datasets.deploy(datasetIpfsHash, batchesCount, datasetOptions);
        await pjs.datasets.addToMarket(datasetContractAddress, publisher);
    });

    after(done => server.close(done));

    it('#fetchActiveCount should return a number', async () => {
        const count = await pjs.jobs.fetchActiveCount();
        expect(count).to.be.a('number');
    });

    it('#whitelistWorkerOwner should resolve to an object', async () => {
        const receipt = await pjs.pandora.whitelistWorkerOwner(publisher, publisher);
        expect(receipt).to.be.an('object');//resolved to transaction receipt
    });

    it('#createWorkerNode should create a workerNode contract', async () => {
        await pjs.pandora.whitelistWorkerOwner(publisher, accounts[1]);
        const workerNodeAddress = await pjs.pandora.createWorkerNode(accounts[1]);
        expect(workerNodeAddress).to.be.a('string');
    });

    it('#create should create a cognitive job', async () => {
        await pjs.pandora.whitelistWorkerOwner(publisher, accounts[2]);
        const workerNodeAddress = await pjs.pandora.createWorkerNode(accounts[2]);
        await pjs.workers.alive(workerNodeAddress, accounts[2]);
        const jobContractAddress = await pjs.jobs.create({
            kernelAddress: kernelContractAddress, 
            datasetAddress: datasetContractAddress,
            complexity: 1,
            jobType: 0, 
            description: 'test job'
        }, accounts[3]);
        expect(jobContractAddress).to.be.a('string');
    });
});
