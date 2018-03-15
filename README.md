# pyrrha-js
Pandora Pyrrha functions and utilities library for JavaScript-based applications

## Initialisation and usage
```javascript
import Web3 from 'web3';
import Kernel from '../contracts/Kernel.json';
import Dataset from '../contracts/Dataset.json';
import Pjs from 'pyrrha-js';

// web3 v1.0 and up is required
const web3 = new Web3(window.web3.currentProvider || '<protocol>://<host>:<port>');

const pjs = new Pjs({
    web3: web3
    contracts: {
        Kernel,
        Dataset 
    },
    addresses: {
        pandora: '0x58e66b79928cfb362b53c185a6a1fded882bb07d',
        market: '0x6142029abb21ef2e0bffde8d43f15c64f3750fe6'
    }
});

const fetchKernels = async () => {
    return await pjs.kernels.fetchAll();
};

console.log(fetchKernels());
```
