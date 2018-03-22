const should = require('should');
const config = require('./config');
const Pjs = require('../src');

import {
    WEB3_NOT_CONNECTED
} from '../src/helpers/errors';

const datasets = require('../src/datasets');
const kernels = require('../src/kernels');
const jobs = require('../src/jobs');
const ipfs = require('../src/ipfs');

const defaultEthConfig = {
    protocol: config.eth.protocol,
    host: config.eth.host,
    port: config.eth.port
};

const defaultIpfsConfig = {
    protocol: config.ipfs.protocol,
    host: config.ipfs.host,
    port: config.ipfs.port
};

const defaultContractsConfig = {
    Pandora: config.addresses.Pandora,
    PandoraMarket: config.addresses.PandoraMarket,
    WorkerNode: config.addresses.WorkerNode,
    CognitiveJob: config.addresses.CognitiveJob,
    Kernel: config.addresses.Kernel,
    Dataset: config.addresses.Dataset
};

const defaultAddressesConfig = {
    pandora: config.pandoraAddress,
    market: config.marketAddress
};

const withCurrentProvider = {
    currentProvider: {
        isMetaMask: true
    }
};

describe('Core tests', () => {
    
    describe('Pjs', () => {

        let pjs = new Pjs({
            eth: {
                ...defaultEthConfig
            },
            ipfs: {
                ...defaultIpfsConfig
            },
            contracts: {
                ...defaultContractsConfig
            },
            addresses: {
                ...defaultAddressesConfig
            }
        });

        it('Should be constructor', () => {
            (Pjs.constructor).should.be.type('function');
        });

        it('Should have static properties Web3 and ipfsAPI', () => {
            should.exist(Pjs.Web3);
            should.exist(Pjs.ipfsAPI);
        });

        it('Constructor should create an appropriate object', () => {
            should.exist(pjs.version);
        });

        it('Should have a version property', () => {
            (pjs).should.be.instanceof(Pjs);
        });

        it('Should expose web3 and ipfs APIs', () => {
            should.exist(pjs.api.web3);
            should.exist(pjs.api.ipfs);
            (pjs.api.web3).should.be.Object();
            (pjs.api.ipfs).should.be.Object();
        });

        it('Should be able to use currentProvider from MetaMask', () => {
            let pjsCurrent = new Pjs({
                ...{
                    eth: {
                        ...defaultEthConfig
                    },
                    ipfs: {
                        ...defaultIpfsConfig
                    },
                    contracts: {
                        ...defaultContractsConfig
                    },
                    addresses: {
                        ...defaultAddressesConfig
                    }
                },
                web3: withCurrentProvider
            });
            should.exist(pjsCurrent.isMetaMask);
            (pjsCurrent.isMetaMask).should.be.true();
        });

        it('Should have kernels functions as members', () => {
            should.exist(pjs.kernels);

            for (let key in kernels) {
                
                (pjs.kernels[key]).should.be.type('function');
            }
        });

        it('Should have datasets functions as members', () => {
            should.exist(pjs.datasets);

            for (let key in datasets) {
                
                (pjs.datasets[key]).should.be.type('function');
            }
        });

        it('Should have jobs functions as members', () => {
            should.exist(pjs.jobs);

            for (let key in jobs) {
                
                (pjs.jobs[key]).should.be.type('function');
            }
        });

        it('Should have ipfs functions as members', () => {
            should.exist(pjs.ipfs);

            for (let key in ipfs) {
                
                (pjs.ipfs[key]).should.be.type('function');
            }
        });

        it(`Should throw WEB3_NOT_CONNECTED in case of trying to assign 
        the wrong object as internal web3 representation property`, () => {
                        
            (() => { 
                pjs._web3 = null; 
            }).should.throw(Error, { code: WEB3_NOT_CONNECTED });
        });

        it('Should not have kernels/datasets/jobs members if not eth config option provided', () => {
            let pjsNoEth = new Pjs({
                ...{
                    eth: {
                        ...defaultEthConfig
                    },
                    contracts: {
                        ...defaultContractsConfig
                    },
                    addresses: {
                        ...defaultAddressesConfig
                    }
                }
            });

            for (let members of ['ipfs']) {

                should.not.exist(pjsNoEth[members]);
            }
        });

        it('Should not have ipfs member if not ipfs config option provided', () => {
            let pjsNoIpfs = new Pjs({
                ...{
                    ipfs: {
                        ...defaultIpfsConfig
                    },
                    contracts: {
                        ...defaultContractsConfig
                    },
                    addresses: {
                        ...defaultAddressesConfig
                    }
                }
            });

            for (let members of ['kernels', 'datasets', 'jobs']) {

                should.not.exist(pjsNoIpfs[members]);
            }
        });
    });
});
