'use strict';

const { expect } = require('chai');
const ContractsNode = require('../contracts')();
const Pjs = require('../../src');

describe('Pandora tests:', () => {

    let pjs;
    let server;
    let provider;
    let contracts;
    let addresses;
    
    before(() => ContractsNode
        .then(node => {

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

            return;
        }));

    after(done => server.close(done));

    it('#version should return version string', async () => {
        const version = await pjs.pandora.version();
        expect(version).to.be.a('string');
    });
});
