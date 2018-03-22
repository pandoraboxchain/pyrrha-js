# pyrrha-js

[![Codacy Badge](https://api.codacy.com/project/badge/Grade/2d4e2b44ad06471c8e82a632b47041d7)](https://app.codacy.com/app/kostysh/pyrrha-js?utm_source=github.com&utm_medium=referral&utm_content=pandoraboxchain/pyrrha-js&utm_campaign=badger)[![Codacy Badge](https://api.codacy.com/project/badge/Coverage/4e475a28d513479d913a5cc4bcb3f096)](https://www.codacy.com/app/kostysh/pyrrha-js?utm_source=github.com&utm_medium=referral&utm_content=pandoraboxchain/pyrrha-js&utm_campaign=Badge_Coverage)

Pandora Pyrrha functions and utilities library for JavaScript-based applications

## Initialization and usage
```javascript
import Kernel from '../contracts/Kernel.json';
import Dataset from '../contracts/Dataset.json';
import Pjs from 'pyrrha-js';

const pjs = new Pjs({
    eth: {
        protocol: 'http',
        host: 'localhost',
        port: 8545
    },
    ipfs: {
        protocol: 'http',
        host: 'localhost',
        port: 5001
    },
    contracts: {
        Kernel,
        Dataset 
    },
    addresses: {
        pandora: '0x58e66b79928cfb362b53c185a6a1fded882bb07d',
        market: '0x6142029abb21ef2e0bffde8d43f15c64f3750fe6'
    }
});

pjs.kernels.fetchAll()
    .then(console.log)
    .catch(console.error);
```

## Running tests
```sh
git submodule update --recursive
npm run test
```
Tests and coverage results will be deployed to codacy and available on [Codacy Dashboard](https://www.codacy.com/app/kostysh/pyrrha-js?utm_source=github.com&utm_medium=referral&utm_content=pandoraboxchain/pyrrha-js&utm_campaign=Badge_Coverage)

For testing without coverage report use:
```sh
npm run test:dev
```
For generating local code coverage report use:
```sh
npm run test:dev:cov
```
Report will be created in folder `./coverage`
