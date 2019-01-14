import { expect } from 'chai';
import ContractsNode from '../contracts';
import Pjs from '../../dist';

describe('Workers tests:', () => {

    let pjs;
    let server;
    let provider;
    let contracts;
    let addresses;
    
    before('Setup', async () => {
        const node = await ContractsNode();

        server = node.node;
        provider = node.provider;
        contracts = node.contracts;
        addresses = node.addresses;

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

    it('#fetchCount should return count of workers', async () => {
        const count = await pjs.workers.fetchCount();
        expect(count).to.be.a('number');
        expect(count >= 0).to.be.true;
    });
});
