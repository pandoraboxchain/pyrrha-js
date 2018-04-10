/**
 * Pyrrha Js
 * Pandora Pyrrha Javascript library
 * 
 * @file index.js
 * @author Kostiantyn Smyrnov <kostysh@gmail.com>
 * @date 2018
 */

'use strict';

import Web3 from 'web3';
import ipfsAPI from 'ipfs-api';

import pjsPackage from '../package.json';
import pjsError, {
    WEB3_NOT_CONNECTED
} from './helpers/errors';

import * as pandora from './pandora';
import * as kernels from './kernels';
import * as datasets from './datasets';
import * as jobs from './jobs';
import * as workers from './workers';
import * as ipfs from './ipfs';

/** Pjs class */
class Pjs {

    // Native Web3 object
    static get Web3() {
        return Web3;
    }

    // Native ipfsAPI object
    static get ipfsAPI() {
        return ipfsAPI;
    }

    // web3 setter
    set _web3(value) {

        if (!value || !value.currentProvider) {
            throw pjsError(WEB3_NOT_CONNECTED);
        }

        this.config.web3 = value;
    }

    // ipfs setter
    set _ipfs(value) {

        // @todo Add ipfs connection validation
        this.config.ipfs = value;
    }

    /** Options example
    
    {
        eth: {
            provider: <external_provider>,
            // or
            protocol: 'http',
            host: 'localhost',
            port: ''
        },
        ipfs: {
            protocol: 'http',
            host: 'localhost',
            port: 5001
        },
        contracts: {
            Kernel,  // contract json
            Dataset  // contract json
        },
        addresses: {
            pandora: '0x58e66b79928cfb362b53c185a6a1fded882bb07d',
            market: '0x6142029abb21ef2e0bffde8d43f15c64f3750fe6'
        }
    }
     
    */
    /**
     * Creates an instance of Pjs.
     * @param {Object} options
     * @memberof Pjs
     */
    constructor(options = {}) {
        // @todo Implement options object validation
        this.version = pjsPackage.version;
        this.config = {};
        this.isMetaMask = false;

        if (options.eth) {

            if (options.eth.provider) {

                this._web3 = new Pjs.Web3(options.eth.provider);

                if (options.eth.provider.isMetaMask) {
                    
                    this.isMetaMask = true;
                }
            } else {
    
                this._web3 = new Pjs.Web3.providers.HttpProvider(`${options.eth.protocol || 'http'}://${options.eth.host || 'localhost'}:${options.eth.port || ''}`);
            }

            this.config.contracts = options.contracts || {};// @todo Validate minimum "required" contracts set 
            this.config.addresses = options.addresses || {};// @todo Validate addresses "required" option

            this._addMembers('pandora', pandora);
            this._addMembers('kernels', kernels);
            this._addMembers('datasets', datasets);
            this._addMembers('jobs', jobs);
            this._addMembers('workers', workers);
        }

        if (options.ipfs) {

            this._ipfs = Pjs.ipfsAPI(
                options.ipfs.host, 
                options.ipfs.port, 
                { 
                    protocol: options.ipfs.protocol
                }
            );

            this._addMembers('ipfs', ipfs);
        }

        this._addApiMembers();
    }

    // direct apis references
    _addApiMembers() {

        Object.defineProperty(this, 'api', {
            value: {},
            writable: false,
            enumerable: false,
            configurable: false
        });

        if (this.config.web3) {

            let web3 = new Proxy(this.config.web3, {
                get: function(target, property, receiver) {
                    return Reflect.get(target, property, receiver);
                }
            });

            Object.defineProperty(this.api, 'web3', {
                value: web3,
                writable: false,
                enumerable: false,
                configurable: false
            });
        }

        if (this.config.ipfs) {

            let ipfs = new Proxy(this.config.ipfs, {
                get: function(target, property, receiver) {
                    return Reflect.get(target, property, receiver);
                }
            });

            Object.defineProperty(this.api, 'ipfs', {
                value: ipfs,
                writable: false,
                enumerable: false,
                configurable: false
            });
        }
    }

    // Populate library methods
    _addMembers(subject, members) {
        let self = this;

        Object.defineProperty(self, subject, {
            value: {},
            writable: false,
            enumerable: true,
            configurable: false
        });

        /* istanbul ignore next */
        for (let key in members) {
            let member;
            
            if (typeof members[key] === 'function') {

                member = new Proxy(members[key], {
                    apply: function(target, that, args) {
                        // add config object to every methods calls
                        args.push(self.config);

                        return Reflect.apply(target, self, args);
                    }
                });
            } else if (key) {

                member = new Proxy(members[key], {
                    get: function(target, property, receiver) {
                        return Reflect.get(target, property, receiver);
                    }
                });
            }

            Object.defineProperty(this[subject], key, {
                value: member,
                writable: false,
                enumerable: false,
                configurable: false
            });
        }
    }
}

module.exports = Pjs;
