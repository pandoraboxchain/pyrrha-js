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
        return this.pjs;
    }

    get lastBlock() {
        return this.lastBlock;
    }

    get readyState() {

        if (this.connecting) {

            return CONNECTING;
        }

        if (this.connected) {

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

        this.config = {
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
        this.lastBlock = 0;
        this.Pjs = Pjs;
        this.pjs = null;

        this.on('timeout', () => this._connect());

        if (connectOnSetup) {

            this._connect();
        }        
    }

    // Set STOPPED state
    _setStopped(silent = false) {
        this.connected = false;
        this.connecting = false;
        this.shouldStopped = false;
        this.stopped = true;
        clearInterval(this.watchingInterval);
        this.watchingInterval = null;

        if (!silent) {

            this.emit('stopped', {
                date: Date.now()
            });
        }        
    }

    // Set CONNECTING state
    _setConnecting() {
        this.stopped = false;
        this.connected = false;
        this.connecting = true;
        this.emit('connecting', {
            date: Date.now()
        });
    }

    // Set DISCONNECTED state and emit timeout event
    _setTimeoutExceeded() {
        this.stopped = false;
        this.connected = false;
        this.connecting = false;
        this.emit('timeout', PjsError(WEB3_CONNECTION_TIMEOUT, this.config.wstimeout));        
    }

    // Set CONNECTED state
    _setConnected() {
        this.stopped = false;
        this.connected = true;
        this.connecting = false;
        this.emit('connected', {
            date: Date.now()
        });
        this.config.provider.on('error', err => this.emit('error', err));
        this.config.provider.on('end', () => this._connect());
        this._watchConnection();
    }

    // Watch for connection via getting last block number
    _watchConnection() {

        this.watchingInterval = setInterval(() => {

            if (this.shouldStopped) {

                this.config.provider.connection.on('close', () => this._setStopped());
                this.config.provider.connection.close();
                return;
            }

            const timeout = setTimeout(() => this._setTimeoutExceeded(), this.config.wstimeout);

            this.pjs.api.web3.getBlockNumber()
                .then(blockNumber => {
                    this.lastBlock = blockNumber;
                    clearTimeout(timeout);
                    this.emit('lastBlockNumber', this.lastBlock);
                })
                .catch(err => {
                    this.emit('error', err);
                    clearTimeout(timeout);
                    this._setTimeoutExceeded();                    
                });
        }, this.config.wstimeout * 1.1);
    }

    // Trying to establish connection using websocket provider
    _connect() {

        if (this.connecting) {

            return;
        }

        // Disable previous watching interval
        clearInterval(this.watchingInterval);

        let url = `${this.config.protocol}://${this.config.host}${this.config.port ? ':' + this.config.port : ''}`;

        // Override url for testing purposes
        if (process.env.NODE_ENV === 'testing' && process.env.TESTING_PROVIDER_URL) {

            url = process.env.TESTING_PROVIDER_URL;
        }

        // Moving to CONNECTING state
        this._setConnecting();

        // Create new WS provider
        this.config.provider = new this.Pjs.Web3.providers.WebsocketProvider(url);

        if (!this.pjs) {

            this.pjs = new this.Pjs({
                eth: {
                    provider: this.config.provider
                },
                contracts: this.config.contracts,
                addresses: this.config.addresses
            });
        } else {

            this.pjs.api.web3.setProvider(this.config.provider);
        }
        
        if (this.config.provider.connection.readyState === this.config.provider.connection.OPEN) {

            return this._setConnected();
        }

        const connectionTimeout = setTimeout(() => this._setTimeoutExceeded(), this.config.wstimeout);
        
        this.config.provider.on('connect', () => {
            clearTimeout(connectionTimeout);                        
            this._setConnected();// Moving to CONNECTED state
        });
    }

    async connect() {
        return new Promise((resolve, reject) => {

            if (this.connected) {

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

            if (!this.connecting) {

                this._connect();
            }
        });
    }

    async close() {
        return new Promise((resolve, reject) => {

            if (this.stopped) {

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

            if (!this.shouldStopped) {

                this.shouldStopped = true;
            }            
        });
    }
}
