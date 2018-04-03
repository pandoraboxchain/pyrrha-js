'use strict';

const path = require('path');
const GanacheNode = require('./ganache');

module.exports = async (useServer = false) => {

    const node = new GanacheNode(path.join(__dirname, '../'), useServer);
    const server = await node.server;
    const provider = await node.provider;
    const contracts = await node.contracts;
    const addresses = await node.addresses;
    const publisher = await node.publisher;

    return {
        node,
        server,
        provider,
        contracts,
        addresses,
        publisher
    };
};
