# Release Notes

## 1.7.x
- new properties for kernels and datasets: description, metadata
- new property for job: description
- removed samplesCount property from the kernel

## 1.6.x
- expectation helper improvement, added ethereum address validation
- new method: pandora.whitelistWorkerOwner
- new method: pandora.createWorkerNode
- new method: workers.alive

## 1.5.x
- added "options" argument to events handlers
- optimized async methods usage

## 1.4.x
- more tests added
- isMetaMask detection has moved from `window.web3` way. From now `web3` object should be provided as options property
- Implemented testing in docker container
- in "addresses" config "pandora" changed to "Pandora" and "market" to "PandoraMarket" (like related contracts names)
- added method kernels.fetchCount
- updated method kernels.fetchAll to use kernels.fetchCount (not iterating with while)
- added method kernels.removeKernel
- removed callbacks from the kernels.eventKernelAdded method