const path = require('path');
const GanacheNode = require('./ganache');
const Contracts = new GanacheNode(path.join(__dirname, '../'));

module.exports = async () => {

    try {

        const provider = await Contracts.provider;
        const contracts = await Contracts.contracts;
        const addresses = await Contracts.addresses;
        const publisher = await Contracts.publisher;

        return {
            Contracts,
            provider,
            contracts,
            addresses,
            publisher
        };
    } catch(err) {

        return Promise.reject(err);
    }
};
