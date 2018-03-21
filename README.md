# pyrrha-js
Pandora Pyrrha functions and utilities library for JavaScript-based applications

## Initialisation and usage
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
