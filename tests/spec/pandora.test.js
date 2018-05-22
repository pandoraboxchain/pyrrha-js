'use strict';

const { expect } = require('chai');
const ContractsNode = require('../contracts');
const Pjs = require('../../src');

describe('Pandora tests:', () => {

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
    });

    after(done => server.close(done));

    it('#version should return version string', async () => {
        const version = await pjs.pandora.version();
        expect(version).to.be.a('string');
    });
});
