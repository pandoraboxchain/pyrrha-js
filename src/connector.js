/**
 * Websocket connection manager for Node.js
 * This file it is a part of the Pandora Pyrrha Javascript library
 * 
 * @file connector.js
 * @author Kostiantyn Smyrnov <kostysh@gmail.com>
 * @date 2018
 */
'use strict';

import { EventEmitter } from 'events';
import PjsError, { PJS_REQUIRED, WEB3_CONNECTION_TIMEOUT } from './helpers/errors';

export const STOPPED = 'STOPPED';
export const CONNECTING = 'CONNECTING';
export const CONNECTED = 'CONNECTED';
export const DISCONNECTED = 'DISCONNECTED';

/**
 * Websocket connection manager class for Pjs
 *
 * @export
 * @class PjsWsConnector
 * @extends {EventEmitter}
 * @event error
 * @event connecting
 * @event connected
 * @event timeout
 * @event stopped
 * @event lastBlockNumber
 */
export default class PjsWsConnector extends EventEmitter {

    get pjs() {
        return this._pjs;
    }

    get lastBlock() {
        return this._lastBlock;
    }

    get readyState() {

        if (this._connecting) {

            return CONNECTING;
        }

        if (this._connected) {

            return CONNECTED;
        }

        return DISCONNECTED;
    }

    /**
     *Creates an instance of PjsWsConnector.
    * @param {Function} Pjs
    * @param {Object} [options={}]
    * @memberof PjsWsConnector
    */
    constructor(Pjs, options = {}, connectOnSetup = false) {
        super();

        if (!Pjs) {

            throw PjsError(PJS_REQUIRED);
        }

        this._config = {
            protocol: 'wss',
            host: 'localhost',
            port: 8545,
            wstimeout: 2000,
            provider: undefined,
            contracts: undefined,
            addresses: undefined,
            ...options.config
        };

        this._setStopped(true);
        this._lastBlock = 0;
        this._Pjs = Pjs;
        this._pjs = null;

        this.on('timeout', () => this._connect());

        if (connectOnSetup) {

            this._connect();
        }        
    }

    _getBlockNumber(cb = () => {}) {

        const timeout = setTimeout(() => this._setTimeoutExceeded(), this._config.wstimeout);

        this._pjs.api.web3.getBlockNumber()
            .then(blockNumber => {
                this._lastBlock = blockNumber;
                clearTimeout(timeout);
                cb(null, blockNumber);
            })
            .catch(cb);
    }

    // Set STOPPED state
    _setStopped(silent = false) {
        this._connected = false;
        this._connecting = false;
        this._shouldStopped = false;
        this._stopped = true;
        clearInterval(this._watchingInterval);
        this._watchingInterval = null;

        if (!silent) {

            this.emit('stopped', {
                date: Date.now()
            });
        }        
    }

    // Set CONNECTING state
    _setConnecting() {
        this._stopped = false;
        this._connected = false;
        this._connecting = true;
        this.emit('connecting', {
            date: Date.now()
        });
    }

    // Set DISCONNECTED state and emit timeout event
    _setTimeoutExceeded() {
        this._stopped = false;
        this._connected = false;
        this._connecting = false;
        this.emit('timeout', PjsError(WEB3_CONNECTION_TIMEOUT, this._config.wstimeout));        
    }

    // Set CONNECTED state
    _setConnected() {
        this._stopped = false;
        this._connected = true;
        this._connecting = false;
        this._config.provider.on('error', err => this.emit('error', err));
        this._config.provider.on('end', () => this._setTimeoutExceeded());
        this._watchConnection();
        this._getBlockNumber((err, blockNumber) => {

            if (err) {

                this.emit('error', err);
                this._setTimeoutExceeded();
                return;
            }

            this.emit('connected', {
                date: Date.now(),
                blockNumber
            });
        });
    }

    // Watch for connection via getting last block number
    _watchConnection() {

        this._watchingInterval = setInterval(() => {

            if (this._shouldStopped) {

                this._config.provider.connection.on('close', () => this._setStopped());
                this._config.provider.connection.close();
                return;
            }

            this._getBlockNumber((err, blockNumber) => {

                if (err) {
    
                    this.emit('error', err);
                    this._setTimeoutExceeded();
                    return;
                }
    
                this.emit('lastBlockNumber', blockNumber);
            });
        }, this._config.wstimeout * 1.1);
    }

    // Trying to establish connection using websocket provider
    _connect() {

        if (this._connecting) {

            return;
        }

        // Disable previous watching interval
        clearInterval(this._watchingInterval);

        let url = `${this._config.protocol}://${this._config.host}${this._config.port ? ':' + this._config.port : ''}`;

        // Override url for testing purposes
        if (process.env.NODE_ENV === 'testing' && process.env.TESTING_PROVIDER_URL) {

            url = process.env.TESTING_PROVIDER_URL;
        }

        // Moving to CONNECTING state
        this._setConnecting();

        // Create new WS provider
        this._config.provider = new this._Pjs.Web3.providers.WebsocketProvider(url);

        if (!this._pjs) {

            this._pjs = new this._Pjs({
                eth: {
                    provider: this._config.provider
                },
                contracts: this._config.contracts,
                addresses: this._config.addresses
            });
        } else {

            this._pjs.api.web3.setProvider(this._config.provider);
        }
        
        if (this._config.provider.connection.readyState === this._config.provider.connection.OPEN) {

            return this._setConnected();
        }

        const connectionTimeout = setTimeout(() => this._setTimeoutExceeded(), this._config.wstimeout);
        
        this._config.provider.on('connect', () => {
            clearTimeout(connectionTimeout);                        
            this._setConnected();// Moving to CONNECTED state
        });
    }

    async connect() {
        return new Promise((resolve, reject) => {

            if (this._connected) {

                return resolve();
            }

            function onConnected() {
                this.removeListener('error', onError);
                resolve();
            }

            function onError() {
                this.removeListener('connected', onConnected);
                reject();
            }

            this.once('connected', onConnected);
            this.once('error', onError);

            if (!this._connecting) {

                this._connect();
            }
        });
    }

    async close() {
        return new Promise((resolve, reject) => {

            if (this._stopped) {

                return resolve();
            }

            function onStopped() {
                this.removeListener('error', onError);
                resolve();
            }

            function onError() {
                this.removeListener('stopped', onStopped);
                reject();
            }

            this.once('stopped', onStopped);
            this.once('error', onError);

            if (!this._shouldStopped) {

                this._shouldStopped = true;
            }            
        });
    }
}
