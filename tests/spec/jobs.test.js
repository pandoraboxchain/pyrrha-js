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

        kernelContractAddress = await pjs.kernels.deploy(kernelIpfsHash, kernelOptions, publisher);
        await pjs.kernels.addToMarket(kernelContractAddress, publisher);

        datasetContractAddress = await pjs.datasets.deploy(datasetIpfsHash, batchesCount, datasetOptions, publisher);
        await pjs.datasets.addToMarket(datasetContractAddress, publisher);

        await pjs.pandora.whitelistWorkerOwner(publisher, accounts[2]);
        await pjs.pandora.whitelistWorkerOwner(publisher, accounts[4]);
        await pjs.pandora.whitelistWorkerOwner(publisher, accounts[5]);
        await pjs.pandora.whitelistWorkerOwner(publisher, accounts[6]);
    });

    after(done => server.close(done));

    it('#fetchJobControllerAddress should fetch jobConntroller address', async () => {
        const jobConntroller = await pjs.jobs.fetchJobControllerAddress();
        expect(jobConntroller).to.be.a('string');
    });

    it('#fetchActiveJobsCount should return a number', async () => {
        const activeJobsCount = await pjs.jobs.fetchActiveJobsCount();
        expect(activeJobsCount).to.be.a('number');
    });

    it('#fetchCompletedJobsCount should return a number', async () => {
        const completedJobsCount = await pjs.jobs.fetchCompletedJobsCount();
        expect(completedJobsCount).to.be.a('number');
    });

    it('#create should create a job', async () => {
        
        const queuedJobAddress = await pjs.jobs.create({
            kernel: kernelContractAddress, 
            dataset: datasetContractAddress,
            complexity: 1,
            jobType: '0', 
            description: 'test job',
            deposit: 1
        }, accounts[3]);
        expect(queuedJobAddress).to.be.a('string');
        
        const workerNodeAddress = await pjs.pandora.createWorkerNode(accounts[2]);
        await pjs.workers.alive(workerNodeAddress, accounts[2]);

        const jobContractAddress = await pjs.jobs.create({
            kernel: kernelContractAddress, 
            dataset: datasetContractAddress,
            complexity: 1,
            jobType: '0', 
            description: 'test job',
            deposit: 1
        }, accounts[3]);        
        expect(jobContractAddress).to.be.a('string');        
    });

    it('#fetchJobsIds<activeJobs> should return active jobs addresses', async () => {
        const workerNodeAddress = await pjs.pandora.createWorkerNode(accounts[4]);
        await pjs.workers.alive(workerNodeAddress, accounts[4]);

        const jobContractAddress = await pjs.jobs.create({
            kernel: kernelContractAddress, 
            dataset: datasetContractAddress,
            complexity: 1,
            jobType: '0', 
            description: 'test job',
            deposit: 1
        }, accounts[3]);
        
        const activeJobsCount = await pjs.jobs.fetchActiveJobsCount();
        const addresses = await pjs.jobs.fetchJobsIds('activeJobs', activeJobsCount);

        expect(addresses.includes(jobContractAddress)).to.be.true;
    });

    it('#fetchJobDetails should return job details by address', async () => {
        const workerNodeAddress = await pjs.pandora.createWorkerNode(accounts[5]);
        await pjs.workers.alive(workerNodeAddress, accounts[5]);

        const jobContractAddress = await pjs.jobs.create({
            kernel: kernelContractAddress, 
            dataset: datasetContractAddress,
            complexity: 1,
            jobType: '0', 
            description: 'test job',
            deposit: 1
        }, accounts[3]);

        const jobDetails = await pjs.jobs.fetchJobDetails(jobContractAddress);

        expect(jobDetails).to.be.an('object');
        expect(jobDetails.kernel).to.be.equal(kernelContractAddress);
        expect(jobDetails.dataset).to.be.equal(datasetContractAddress);
        expect(jobDetails.kernelIpfs).to.be.a('string');
        expect(jobDetails.datasetIpfs).to.be.a('string');
        expect(jobDetails.progress).to.be.a('number');
    });

    it('#fetchAll should fetch all jobs', async () => {
        const jobs = await pjs.jobs.fetchAll();
        expect(Array.isArray(jobs.records)).to.be.true;
    });

    it('#eventCognitiveJobCreated should handle new job creation', done => {
        const timeout = setTimeout(() => done(new Error('event CognitiveJobCreated not emmited during timeout')), 3000);
        let jobContractAddress;

        pjs.jobs.eventCognitiveJobCreated({})
            .error(err => {
                clearTimeout(timeout);
                done(err);
            })
            .data(data => {
                clearTimeout(timeout);
                expect(Array.isArray(data.records)).to.be.true;
                expect(data.records.length).to.be.equal(1);
                expect(data.records[0].address).to.be.equal(jobContractAddress);                
                done();
            });

        (async () => {
            const workerNodeAddress = await pjs.pandora.createWorkerNode(accounts[6]);
            await pjs.workers.alive(workerNodeAddress, accounts[6]);

            jobContractAddress = await pjs.jobs.create({
                kernel: kernelContractAddress, 
                dataset: datasetContractAddress,
                complexity: 1,
                jobType: '0', 
                description: 'test job',
                deposit: 1
            }, accounts[3]);

            expect(jobContractAddress).to.be.a('string');
        })();

    });
});
