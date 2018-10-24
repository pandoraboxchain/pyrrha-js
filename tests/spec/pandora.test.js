import { expect } from 'chai';
import ContractsNode from '../contracts';
import Pjs from '../../dist';

describe('Pandora tests:', () => {

    let pjs;
    let server;
    let provider;
    let contracts;
    let addresses;
    let accounts;
    let publisher;

    before('Setup', async () => {
        const node = await ContractsNode();

        server = node.node;
        provider = node.provider;
        contracts = node.contracts;
        addresses = node.addresses;
        accounts = node.accounts;
        publisher = node.publisher;

        pjs = new Pjs({
            eth: {
                provider
            },
            contracts,
            addresses
        });

        await new Promise(resolve => setTimeout(resolve, 500));
    });

    after(done => server.close(done));

    it('#version should return version string', async () => {
        const version = await pjs.pandora.version();
        expect(version).to.be.a('string');
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
});
