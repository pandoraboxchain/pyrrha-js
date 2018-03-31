const { expect } = require('chai');
const ContractsNode = require('../contracts')();
const ContractsNodeServer = require('../contracts')(true);// with ws support, needed for events handling
const Pjs = require('../../src');

describe('Kernels', () => {

    let pjs;
    let provider;
    let contracts;
    let addresses;
    let publisher;

    let serverPjs;
    let serverProvider;
    let serverContracts;
    let serverAddresses;
    let serverPublisher;

    let kernelIpfsHash = 'QmVDqZiZspRJLb5d5UjBmGfVsXwxWB3Pga2n33eWovtjV7';
    
    before(() => ContractsNode
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

            return;
        }));

    before(() => ContractsNodeServer
        .then(node => {

            serverProvider = node.provider;
            serverContracts = node.contracts;
            serverAddresses = node.addresses;
            serverPublisher = node.publisher;

            serverPjs = new Pjs({
                eth: {
                    provider: {
                        ...serverProvider,
                        isMetaMask: true
                    }
                },
                contracts: serverContracts,
                addresses: serverAddresses
            });

            return;
        }));

    it('#deploy should resolved to an address of the deployed contract', async () => {
        let options = {
            publisher, 
            dimension: 100, 
            complexity: 100, 
            price: 100
        };

        let kernelContractAddress = await pjs.kernels.deploy(kernelIpfsHash, options);
        expect(kernelContractAddress).to.be.a('string');
        return;
    });

    it('#addToMarket should resolved to an address of the added to the PandoraMarket contract', async () => {
        let options = {
            publisher, 
            dimension: 100, 
            complexity: 100, 
            price: 100
        };

        let kernelContractAddress = await pjs.kernels.deploy(kernelIpfsHash, options);
        return await pjs.kernels.addToMarket(kernelContractAddress, publisher);
    });

    it('#eventKernelAdded should handle KernelAdded event', done => {
        let addressAdded;
        let timeout = setTimeout(() => done(new Error('Timeout exceeded')), 10000);

        serverPjs.kernels.eventKernelAdded(
            ({
                address,
                kernel,
                status,
                event
            }) => {
                console.log('>>>>>>>>>', {
                    address,
                    kernel,
                    status,
                    event
                });
                expect(address === addressAdded).to.be.true;
                clearTimeout(timeout);
                done();
            },
            done);

        let options = {
            publisher: serverPublisher, 
            dimension: 100, 
            complexity: 100, 
            price: 100
        };

        pjs.kernels.deploy(kernelIpfsHash, options)
            .then(kernelContractAddress => {
                addressAdded = kernelContractAddress;
                return pjs.kernels.addToMarket(kernelContractAddress, publisher);
            })
            .catch(done);
    });
});
