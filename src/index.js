/**
 * Pyrrha Js
 * Pandora Pyrrha Javascript library
 * 
 * @file index.js
 * @author Kostiantyn Smyrnov <kostysh@gmail.com>
 * @date 2018
 */

'use strict';

import pjsPackage from '../package.json';
import pjsError, {
    WEB3_REQUIRED,
    WEB3_NOT_CONNECTED
} from './helpers/errors';

import * as kernels from './kernels';
import * as datasets from './datasets';
import * as jobs from './jobs';
import * as workers from './workers';

/** Pjs class */
class Pjs {

    constructor(options) {
        this.version = pjsPackage.version;        

        this.init(options);

        this._addMembers('kernels', kernels);
        this._addMembers('datasets', datasets);
        this._addMembers('jobs', jobs);
        this._addMembers('workers', workers);
    }

    /**
     * Initialize Pjs
     * 
     * @param {Object} [options={}] 
     * @memberof Pjs
     */
    init(options = {}) {

        if (!options.web3) {
            throw pjsError(WEB3_REQUIRED);
        }

        if (!options.web3.currentProvider) {
            throw pjsError(WEB3_NOT_CONNECTED);
        }

        this.web3 = options.web3;
        this.contracts = options.contracts || {};
        this.addresses = options.addresses || {};
    }
    
    /** Populate library methods */
    _addMembers(subject, members) {
        let self = this;

        Object.defineProperty(self, subject, {
            value: {},
            writable: false,
            enumerable: true,
            configurable: false
        });

        for (let key in members) {
            let member;
            
            if (typeof members[key] === 'function') {

                member = new Proxy(members[key], {
                    apply: function(target, that, args) {
                        args.push(self);// add config object to every methods calls
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
