import { expect } from 'chai';
import toPan from '../helpers/toPan';
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
        expect(receipt.status).to.be.true;
    });

    it('#createWorkerNode should create a workerNode contract', async () => {
        await pjs.pandora.whitelistWorkerOwner(publisher, accounts[1]);
        const nodeStake = toPan(100);
        await pjs.pan.transfer(publisher, accounts[1], nodeStake);
        await pjs.pan.approve(accounts[1], addresses.EconomicController, nodeStake);
        const workerNodeAddress = await pjs.pandora.createWorkerNode(nodeStake, accounts[1]);
        expect(workerNodeAddress).to.be.a('string');
    });
});
