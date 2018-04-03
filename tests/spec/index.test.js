'use strict';

const { expect } = require('chai');
const ContractsNode = require('../contracts')();
const Pjs = require('../../src');

import {
    WEB3_NOT_CONNECTED
} from '../../src/helpers/errors';

const datasets = require('../../src/datasets');
const kernels = require('../../src/kernels');
const jobs = require('../../src/jobs');
const ipfs = require('../../src/ipfs');

const defaultIpfsConfig = {
    protocol: 'http',
    host: 'ipfs.pandora.network',
    port: 5001
};

describe('Core tests:', () => {

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
                ipfs: {
                    ...defaultIpfsConfig
                },
                contracts,
                addresses
            });

            return;
        }));

    after(done => server.close(done));

    it('Should be a constructor', () => {
        expect(Pjs.constructor).to.be.a('function');
    });

    it('Should have static properties Web3 and ipfsAPI', () => {
        expect(Pjs).to.have.property('Web3');
        expect(Pjs).to.have.property('ipfsAPI');
    });

    it('Constructor should create an appropriate object', () => {
        expect(pjs).to.be.instanceof(Pjs);
    });

    it('Should have a version property', () => {
        expect(pjs).to.to.have.property('version');
    });

    it('Should expose web3 and ipfs APIs', () => {
        expect(pjs.api).to.have.property('web3');
        expect(pjs.api).to.have.property('ipfs');
        expect(pjs.api.web3).to.be.an('object');
        expect(pjs.api.ipfs).to.be.an('object');
    });

    it('Should be able to use currentProvider from MetaMask', () => {

        let pjsCurrent = new Pjs({
            eth: {
                provider
            },
            ipfs: {
                ...defaultIpfsConfig
            },
            contracts,
            addresses
        });

        expect(pjsCurrent).to.have.property('isMetaMask');
        expect(pjsCurrent.isMetaMask).to.be.true;
    });

    it('Should have kernels functions as members', () => {
        expect(pjs).to.have.property('kernels');

        for (let key in kernels) {

            expect(pjs.kernels[key]).to.be.a('function');
        }
    });

    it('Should have datasets functions as members', () => {
        expect(pjs).to.have.property('datasets');

        for (let key in datasets) {

            expect(pjs.datasets[key]).to.be.a('function');
        }
    });

    it('Should have jobs functions as members', () => {
        expect(pjs).to.have.property('jobs');

        for (let key in jobs) {

            expect(pjs.jobs[key]).to.be.a('function');
        }
    });

    it('Should have ipfs functions as members', () => {
        expect(pjs).to.have.property('ipfs');

        for (let key in ipfs) {

            expect(pjs.ipfs[key]).to.be.a('function');
        }
    });

    it(`Should throw WEB3_NOT_CONNECTED in case of trying to assign 
        the wrong object as internal web3 representation property`, () => {

        expect(() => {
            pjs._web3 = null;
        }).to.throw(Error).with.property('code', WEB3_NOT_CONNECTED);
    });

    it('Should not have ipfs member if no ipfs config option provided', () => {

        let pjsNoIpfs = new Pjs({
            eth: {
                provider
            },
            contracts,
            addresses
        });

        expect(pjsNoIpfs).not.to.have.property(ipfs);
    });

    it('Should not have kernels/datasets/jobs members if no eth config option provided', () => {

        let pjsNoEth = new Pjs({
            contracts,
            addresses
        });

        for (let member of ['kernels', 'datasets', 'jobs']) {

            expect(pjsNoEth).not.to.have.property(member);
        }
    });
});
