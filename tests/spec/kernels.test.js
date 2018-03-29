const { expect } = require('chai');
const ContractsNode = require('../contracts')();
const Pjs = require('../../src');

describe('Kernels tests', () => {

    let pjs;
    let provider;
    let contracts;
    let addresses;
    let publisher;
    
    before(done => {

        ContractsNode
            .then(node => {

                provider = node.provider;
                contracts = node.contracts;
                addresses = node.addresses;
                publisher = node.publisher;

                pjs = new Pjs({
                    eth: {
                        provider: {
                            ...provider,
                            isMetaMask: true
                        }
                    },
                    contracts,
                    addresses
                });
                
                done();
            })
            .catch(err => done(err));            
    });

    it('#deploy should return address of deployed contract', done => {
        let kernelIpfsHash = 'QmVDqZiZspRJLb5d5UjBmGfVsXwxWB3Pga2n33eWovtjV7';
        let options = {
            publisher, 
            dimension: 100, 
            complexity: 100, 
            price: 100
        };

        pjs.kernels.deploy(kernelIpfsHash, options)
            .then(address => {

                expect(address).to.be.a('string');
                done();
            })
            .catch(done);
    });
});
