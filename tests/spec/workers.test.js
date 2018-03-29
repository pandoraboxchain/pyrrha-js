const { expect } = require('chai');
const ContractsNode = require('../contracts')();
const Pjs = require('../../src');

describe('Workers tests', () => {

    let pjs;
    let provider;
    let contracts;
    let addresses;
    
    before(done => {

        ContractsNode
            .then(node => {

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
                
                done();
            })
            .catch(err => done(err));            
    });

    it('#fetchCount should return count of workers', done => {

        pjs.workers.fetchCount()
            .then(count => {

                expect(count).to.be.a('number');
                expect(count >= 0).to.be.true;
                done();
            })
            .catch(done);
    });
});
