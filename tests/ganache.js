const { EventEmitter } = require('events');
EventEmitter.defaultMaxListeners = 0;// disable MaxListenersExceededWarning
const fs = require('fs-extra');
const path = require('path');
const Web3 = require('web3');
const Config = require('truffle-config');
const Contracts = require('truffle-workflow-compile');
const Migrate = require('truffle-migrate');
const ganache = require('ganache-cli');

let ganachePort = 8545;

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

    constructor(basePath, useServer = false) {
        super();
        this._basePath = basePath;
        this._useServer = useServer;
        this._port = ganachePort++;
        this._network = Web3.utils.randomHex(4);// own network for each instance
        this._config = {};
        this._provider = {};
        this._server = {};
        this._contracts = {};
        this._addresses = {};
        this._web3 = {};
        this._publisher = '';
        this._isInitializing = true;

        this._init()
            .then(() => {
                this._isInitializing = false;
                this.emit('initialized', this);
            })
            .catch(err => {
                this._isInitializing = false;
                this.emit('error', err);
            });
    }

    async _init() {

        try {

            // Create contracts sandbox
            const tempDir = path.join('/', 'contracts-sandbox', this._network);
            await fs.copy(path.join(this._basePath, 'truffle.js'), path.join(tempDir, 'truffle.js'));
            await fs.copy(path.join(this._basePath, 'truffle-config.js'), path.join(tempDir, 'truffle-config.js'));
            await fs.copy(path.join(this._basePath, 'contracts'), tempDir);
            await fs.copy(path.join(this._basePath, 'migrations'), tempDir);
            await fs.copy(path.join(this._basePath, 'node_modules', 'zeppelin-solidity'), path.join(tempDir, 'node_modules', 'zeppelin-solidity'));
            
            // Create truffle config related to sandbox
            this._config = Config.load(path.join(tempDir, 'truffle.js'), {
                reset: true
            });
            this._config.network = this._network;

            // Create ganache network
            await this._createNetwork({
                seed: this._network,
                gasLimit: this._config.gas,
                locked: false
            });

            // Compile contracts
            await this._compile();

            // Deploy contracts to the network
            await this._migrate();
            return;
        } catch(err) {
            return Promise.reject(err);
        }
    }

    async _extractPublisherAddress() {

        try {

            const accounts = await this._web3.eth.getAccounts();
            this._publisher = accounts[0];
            const networkId = await this._web3.eth.net.getId();
            this._config.networks[this._network] = {
                provider: this._provider,
                network_id: networkId + '',
                from: this._publisher
            };
            return;
        } catch(err) {
            return Promise.reject(err);
        }
    }

    _startServer(defaultConfig) {
        return new Promise((resolve, reject) => {
            this._server = ganache.server({
                ...defaultConfig,
                logger: {
                    log: console
                },
                port: this._port,
                ws: true
            });
            this._server.listen((err, result) => {

                if (err) {

                    return reject(err);
                }

                resolve(result);
            });
        });
    }

    _createNetwork(networkConfig) {
        return new Promise((resolve, reject) => {

            if (this._useServer) {

                this._startServer(networkConfig)
                    .then(result => {
                        //console.log('Server:', this._server);
                        console.log(`Ganache server started on port ${this._port}`, result);

                        this._provider = new Web3.providers.WebsocketProvider(`ws://localhost:${this._port}`);
                        this._web3 = new Web3(this._provider);
                        return this._extractPublisherAddress();
                    })
                    .then(() => resolve(this))
                    .catch(reject);                
            } else {

                this._provider = ganache.provider(networkConfig);
                this._web3 = new Web3(this._provider);
                this._extractPublisherAddress()
                    .then(() => resolve(this))
                    .catch(reject);
            }
        });
    }

    _compile() {
        return new Promise((resolve, reject) => {
            
            this._contracts = {};

            Contracts.compile(this._config.with({
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

            Migrate.run(this._config.with({
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
