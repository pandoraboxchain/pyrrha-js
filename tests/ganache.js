const { EventEmitter } = require('events');
EventEmitter.defaultMaxListeners = 0;// disable MaxListenersExceededWarning
const path = require('path');
const Web3 = require('web3');
const Config = require('truffle-config');
const Contracts = require('truffle-workflow-compile');
const Migrate = require('truffle-migrate');
const ganache = require('ganache-cli');

class GanacheNode extends EventEmitter {

    _asyncGetter(prop) {
        return new Promise((resolve, reject) => {

            if (!this._isInitializing) {

                return resolve(this[prop]);
            }

            this.once('error', err => reject(err));
            this.once('initialized', () => resolve(this[prop]));
        });
    }

    get network() {
        return this._network;
    }

    get provider() {
        return this._asyncGetter('_provider');
    }

    get contracts() {
        return this._asyncGetter('_contracts');
    }

    get addresses() {
        return this._asyncGetter('_addresses');
    }

    get web3() {
        return this._asyncGetter('_web3');
    }

    get publisher() {
        return this._asyncGetter('_publisher');
    }

    constructor(basePath) {
        super();
        this.config = Config.load(path.join(basePath, 'truffle.js'), {
            reset: true
        });
        this._network = Web3.utils.randomHex(4);
        this._provider = {};
        this._contracts = {};
        this._addresses = {};
        this._web3 = {};
        this._publisher = '';
        this._isInitializing = true;
        this._init().catch(err => { throw err; });
    }

    async _init() {

        try {

            await this._createNetwork();
            await this._compile();
            await this._migrate();
            this._isInitializing = false;
            this.emit('initialized', this);
        } catch(err) {
            this._isInitializing = false;
            this.emit('error', err);
        }
    }

    _createNetwork() {
        return new Promise((resolve, reject) => {

            this._provider = ganache.provider({
                seed: this._network,
                gasLimit: this.config.gas
            });
            
            this._web3 = new Web3(this._provider);
        
            this._web3.eth.getAccounts((err, accounts) => {
                
                if (err) {
        
                    return reject(err);
                }

                this._publisher = accounts[0];
        
                this._web3.eth.net.getId((err, network_id) => {
                    
                    if (err) {
        
                        return reject(err);
                    }
        
                    this.config.networks[this._network] = {
                        provider: this._provider,
                        network_id: network_id + '',
                        from: this._publisher
                    };
                    this.config.network = this._network;
                    
                    resolve(this);
                });
            });
        });
    }

    _compile() {
        return new Promise((resolve, reject) => {
            
            this._contracts = {};

            Contracts.compile(this.config.with({
                all: true
            }), (err, contracts) => {
                        
                if (err) {
        
                    return reject(err);
                }

                this._contracts = contracts;        
                resolve(this);
            });    
        });
    }

    _migrate() {
        return new Promise((resolve, reject) => {
    
            this._addresses = {};
        
            Migrate.run(this.config.with({
                logger: {
                    log: text => {
                        text = String(text).trim();
        
                        if (new RegExp('Pandora:').test(text) || 
                            new RegExp('PandoraMarket:').test(text)) {
        
                            let keyVal = text.split(':');
                            this._addresses[keyVal[0].trim()] = keyVal[1].trim();
                        }
                    }
                }
            }), err => {
        
                if (err) {
        
                    return reject(err);
                }
        
                resolve(this);
            });    
        });
    }
}

module.exports = GanacheNode;
