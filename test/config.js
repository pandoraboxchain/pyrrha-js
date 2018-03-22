/**
 * Testing configuration for Pyrrha Js
 * Pandora Pyrrha Javascript library
 * 
 * @file config.js
 * @author Kostiantyn Smyrnov <kostysh@gmail.com>
 * @date 2018
 */
'use strict';

const Pandora = require('../pyrrha-abi/Pandora.json');
const PandoraMarket = require('../pyrrha-abi/PandoraMarket.json');
const WorkerNode = require('../pyrrha-abi/WorkerNode.json');
const CognitiveJob = require('../pyrrha-abi/CognitiveJob.json');
const Kernel = require('../pyrrha-abi/Kernel.json');
const Dataset = require('../pyrrha-abi/Dataset.json');

const config = {
    eth: {
        protocol: 'http',
        host: 'dockstation.pandora.network',
        port: 8545
    },    
    addresses: {
        pandora: '0x58e66b79928cfb362b53c185a6a1fded882bb07d',
        market: '0x6142029abb21ef2e0bffde8d43f15c64f3750fe6'
    },
    ipfs: {
        protocol: 'http',
        host: 'ipfs.pandora.network',
        port: 5001
    }
};

module.exports = {
    ...config,
    ...{
        addresses: {
            Pandora,
            PandoraMarket,
            WorkerNode,
            CognitiveJob,
            Kernel,
            Dataset
        }
    }
};
