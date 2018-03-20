/**
 * Cognitive Jobs related methods
 * This file it is a part of the Pandora Pyrrha Javascript library
 * 
 * @file jobs.js
 * @author Kostiantyn Smyrnov <kostysh@gmail.com>
 * @date 2018
 */

'use strict';Object.defineProperty(exports, "__esModule", { value: true });exports.eventCognitiveJobStateChanged = exports.eventCognitiveJobCreated = exports.create = exports.fetchJobStore = exports.fetchAll = exports.fetchJob = exports.fetchIpfsResults = exports.fetchProgress = exports.fetchBatches = exports.fetchDataset = exports.fetchKernel = exports.fetchState = exports.fetchAddressById = exports.fetchActiveCount = void 0;

var _errors = _interopRequireWildcard(require("./helpers/errors"));





var _kernels = require("./kernels");



var _datasets = require("./datasets");function _interopRequireWildcard(obj) {if (obj && obj.__esModule) {return obj;} else {var newObj = {};if (obj != null) {for (var key in obj) {if (Object.prototype.hasOwnProperty.call(obj, key)) {var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {};if (desc.get || desc.set) {Object.defineProperty(newObj, key, desc);} else {newObj[key] = obj[key];}}}}newObj.default = obj;return newObj;}}function _objectSpread(target) {for (var i = 1; i < arguments.length; i++) {var source = arguments[i] != null ? arguments[i] : {};var ownKeys = Object.keys(source);if (typeof Object.getOwnPropertySymbols === 'function') {ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) {return Object.getOwnPropertyDescriptor(source, sym).enumerable;}));}ownKeys.forEach(function (key) {_defineProperty(target, key, source[key]);});}return target;}function _defineProperty(obj, key, value) {if (key in obj) {Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true });} else {obj[key] = value;}return obj;}



/**
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                         * Get active job count from Pandora contract
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                         * 
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                         * @param {Object} config Library config (provided by the proxy but can be overridden)
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                         * @returns {Promise} A Promise object represents the {number} 
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                         */
const fetchActiveCount = async (config = {}) => {

  if (!config.web3) {
    throw (0, _errors.default)(_errors.WEB3_REQUIRED);
  }

  if (!config.contracts || !config.contracts.Pandora || !config.contracts.Pandora.abi) {
    throw (0, _errors.default)(_errors.CONTRACT_REQUIRED, 'Pandora');
  }

  if (!config.addresses || !config.addresses.pandora) {
    throw (0, _errors.default)(_errors.ADDRESS_REQUIRED, 'Pandora');
  }

  const pan = new config.web3.eth.Contract(config.contracts.Pandora.abi, config.addresses.pandora);
  const count = await pan.methods.
  activeJobsCount().
  call();
  return Number.parseInt(count, 10);
};

/**
    * Get worker by the worker's id
    * 
    * @param {integer} id 
    * @param {Object} config Library config (provided by the proxy but can be overridden)
    * @returns {Promise} A Promise object represents the {string}
    */exports.fetchActiveCount = fetchActiveCount;
const fetchAddressById = async (id, config = {}) => {

  if (!config.web3) {
    throw (0, _errors.default)(_errors.WEB3_REQUIRED);
  }

  if (!config.contracts || !config.contracts.Pandora || !config.contracts.Pandora.abi) {
    throw (0, _errors.default)(_errors.CONTRACT_REQUIRED, 'Pandora');
  }

  if (!config.addresses || !config.addresses.pandora) {
    throw (0, _errors.default)(_errors.ADDRESS_REQUIRED, 'Pandora');
  }

  const pan = new config.web3.eth.Contract(config.contracts.Pandora.abi, config.addresses.pandora);
  const jobAddress = await pan.methods.
  activeJobs(id).
  call();
  return String(jobAddress);
};

/**
    * Get job state from Cognitive Job contract by the job address
    * 
    * @param {string} address 
    * @param {Object} config Library config (provided by the proxy but can be overridden)
    * @returns {Promise} A Promise object represents the {integer} 
    */exports.fetchAddressById = fetchAddressById;
const fetchState = async (address, config = {}) => {

  if (!config.web3) {
    throw (0, _errors.default)(_errors.WEB3_REQUIRED);
  }

  if (!config.contracts || !config.contracts.CognitiveJob || !config.contracts.CognitiveJob.abi) {
    throw (0, _errors.default)(_errors.CONTRACT_REQUIRED, 'CognitiveJob');
  }

  const cog = new config.web3.eth.Contract(config.contracts.CognitiveJob.abi, address);
  const state = await cog.methods.
  currentState().
  call();
  return Number.parseInt(state, 10);
};

/**
    * Get job kernel from Cognitive Job contract by the job address
    * 
    * @param {string} address 
    * @param {Object} config Library config (provided by the proxy but can be overridden)
    * @returns {Promise} A Promise object represents the {string} 
    */exports.fetchState = fetchState;
const fetchKernel = async (address, config = {}) => {

  if (!config.web3) {
    throw (0, _errors.default)(_errors.WEB3_REQUIRED);
  }

  if (!config.contracts || !config.contracts.CognitiveJob || !config.contracts.CognitiveJob.abi) {
    throw (0, _errors.default)(_errors.CONTRACT_REQUIRED, 'CognitiveJob');
  }

  const cog = new config.web3.eth.Contract(config.contracts.CognitiveJob.abi, address);
  const kernel = await cog.methods.
  kernel().
  call();
  return String(kernel);
};

/**
    * Get job dataset from Cognitive Job contract by the job address
    * 
    * @param {string} address 
    * @param {Object} config Library config (provided by the proxy but can be overridden)
    * @returns {Promise} A Promise object represents the {string} 
    */exports.fetchKernel = fetchKernel;
const fetchDataset = async (address, config = {}) => {

  if (!config.web3) {
    throw (0, _errors.default)(_errors.WEB3_REQUIRED);
  }

  if (!config.contracts || !config.contracts.CognitiveJob || !config.contracts.CognitiveJob.abi) {
    throw (0, _errors.default)(_errors.CONTRACT_REQUIRED, 'CognitiveJob');
  }

  const cog = new config.web3.eth.Contract(config.contracts.CognitiveJob.abi, address);
  const dataset = await cog.methods.
  dataset().
  call();
  return String(dataset);
};

/**
    * Get job batches count from Cognitive Job contract by the job address
    * 
    * @param {string} address 
    * @param {Object} config Library config (provided by the proxy but can be overridden)
    * @returns {Promise} A Promise object represents the {number} 
    */exports.fetchDataset = fetchDataset;
const fetchBatches = async (address, config = {}) => {

  if (!config.web3) {
    throw (0, _errors.default)(_errors.WEB3_REQUIRED);
  }

  if (!config.contracts || !config.contracts.CognitiveJob || !config.contracts.CognitiveJob.abi) {
    throw (0, _errors.default)(_errors.CONTRACT_REQUIRED, 'CognitiveJob');
  }

  const cog = new config.web3.eth.Contract(config.contracts.CognitiveJob.abi, address);
  const batches = await cog.methods.
  batches().
  call();
  return Number.parseInt(batches, 10);
};

/**
    * Get job progress from Cognitive Job contract by the job address
    * 
    * @param {string} address 
    * @param {Object} config Library config (provided by the proxy but can be overridden)
    * @returns {Promise} A Promise object represents the {number} 
    */exports.fetchBatches = fetchBatches;
const fetchProgress = async (address, config = {}) => {

  if (!config.web3) {
    throw (0, _errors.default)(_errors.WEB3_REQUIRED);
  }

  if (!config.contracts || !config.contracts.CognitiveJob || !config.contracts.CognitiveJob.abi) {
    throw (0, _errors.default)(_errors.CONTRACT_REQUIRED, 'CognitiveJob');
  }

  const cog = new config.web3.eth.Contract(config.contracts.CognitiveJob.abi, address);
  const progress = await cog.methods.
  progress().
  call();
  return Number.parseInt(progress, 10);
};

/**
    * Get job's ipfsResults from Cognitive Job contract by the job address
    * 
    * @param {string} address 
    * @param {Object} config Library config (provided by the proxy but can be overridden)
    * @returns {Promise} A Promise object represents the {string[]} 
    */exports.fetchProgress = fetchProgress;
const fetchIpfsResults = async (address, config = {}) => {

  if (!config.web3) {
    throw (0, _errors.default)(_errors.WEB3_REQUIRED);
  }

  if (!config.contracts || !config.contracts.CognitiveJob || !config.contracts.CognitiveJob.abi) {
    throw (0, _errors.default)(_errors.CONTRACT_REQUIRED, 'CognitiveJob');
  }

  const cog = new config.web3.eth.Contract(config.contracts.CognitiveJob.abi, address);
  const ipfsResults = await cog.methods.
  ipfsResults().
  call();
  return ipfsResults;
};

/**
    * Get job by the job address
    * 
    * @param {string} address 
    * @param {Object} config Library config (provided by the proxy but can be overridden)
    * @returns {Promise} A Promise object represents the {Object} 
    */exports.fetchIpfsResults = fetchIpfsResults;
const fetchJob = async (address, config = {}) => {

  try {

    const state = await fetchState(address, config);
    const kernel = await fetchKernel(address, config);
    const dataset = await fetchDataset(address, config);
    const batches = await fetchBatches(address, config);
    const progress = await fetchProgress(address, config);
    const ipfsResults = await fetchIpfsResults(address, config);

    return {
      address: address,
      jobStatus: state,
      kernel: kernel,
      dataset: dataset,
      batches: batches,
      progress: progress,
      ipfsResults: ipfsResults,
      activeWorkersCount: batches };

  } catch (err) {
    return Promise.reject(err);
  }
};

/**
    * Get all jobs
    * 
    * @param {Object} config Library config (provided by the proxy but can be overridden)
    * @returns {Promise} A Promise object represents the {Object[]} 
    */exports.fetchJob = fetchJob;
const fetchAll = async (config = {}) => {
  let records = [];
  let error = [];

  try {

    const count = await fetchActiveCount(config);

    for (let i = 0; i < count; i++) {

      const address = await fetchAddressById(i, config);

      try {

        const job = await fetchJob(address, config);

        records.push(_objectSpread({
          id: i },
        job));

      } catch (err) {
        error.push({
          address,
          message: err.message });

      }
    }
  } catch (err) {
    error.push({
      error: err.message });

  }

  return {
    records,
    error };

};

/**
    * Get job store
    * 
    * @param {string} address 
    * @param {Object} config Library config (provided by the proxy but can be overridden)
    * @returns {Promise} A Promise object represents the {Object} 
    */exports.fetchAll = fetchAll;
const fetchJobStore = async (address, config = {}) => {

  try {

    const job = await fetchJob(address, config);
    const kernel = await (0, _kernels.fetchIpfsAddress)(job.kernel, config);
    const dataset = await (0, _datasets.fetchDataset)(job.dataset, config);

    return {
      job,
      kernel,
      dataset };

  } catch (err) {
    return Promise.reject(err);
  }
};

/**
    * Create cognitive job contract
    * 
    * @param {String} kernelAddress 
    * @param {String} datasetAddress 
    * @param {String} from
    * @param {Object} config Library config (provided by the proxy but can be overridden)
    * @returns {Promise} Promise object resolved to add status (boolean)
    */exports.fetchJobStore = fetchJobStore;
const create = (kernelAddress, datasetAddress, from, config = {}) => new Promise((resolve, reject) => {

  if (!config.web3) {
    throw (0, _errors.default)(_errors.WEB3_REQUIRED);
  }

  if (!config.contracts || !config.contracts.Pandora || !config.contracts.Pandora.abi) {
    throw (0, _errors.default)(_errors.CONTRACT_REQUIRED, 'Pandora');
  }

  if (!config.addresses || !config.addresses.pandora) {
    throw (0, _errors.default)(_errors.ADDRESS_REQUIRED, 'Pandora');
  }

  const pan = new config.web3.eth.Contract(config.contracts.Pandora.abi, config.addresses.pandora);
  pan.methods.
  createCognitiveJob(kernelAddress, datasetAddress).
  send({
    from }).

  on('error', reject).
  on('receipt', receipt => resolve(receipt.contractAddress));
});

/**
     * Handle event CognitiveJobCreated
     * 
     * @param {Function} storeCallback 
     * @param {Function} errorCallback
     * @param {Object} config Library config (provided by the proxy but can be overridden)
     */exports.create = create;
const eventCognitiveJobCreated = (storeCallback = () => {}, errorCallback = () => {}, config = {}) => {

  if (!config.web3) {
    throw (0, _errors.default)(_errors.WEB3_REQUIRED);
  }

  if (!config.contracts || !config.contracts.Pandora || !config.contracts.Pandora.abi) {
    throw (0, _errors.default)(_errors.CONTRACT_REQUIRED, 'Pandora');
  }

  if (!config.addresses || !config.addresses.pandora) {
    throw (0, _errors.default)(_errors.ADDRESS_REQUIRED, 'Pandora');
  }

  const pan = new config.web3.eth.Contract(config.contracts.Pandora.abi, config.addresses.pandora);
  pan.events.CognitiveJobCreated({
    fromBlock: 0 }).

  on('data', async res => {

    try {

      const store = await fetchJobStore(res.args.cognitiveJob);
      storeCallback({
        address: res.args.cognitiveJob,
        store,
        status: 'created',
        event: 'Pandora.CognitiveJobCreated' });

    } catch (err) {
      errorCallback(err);
    }
  }).
  on('error', errorCallback);
};

/**
    * Handle event StateChanged for CognitiveJob
    * 
    * @param {string} address
    * @param {Function} storeCallback 
    * @param {Function} errorCallback
    * @param {Object} config Library config (provided by the proxy but can be overridden)
    * @returns {Promise} A Promise object represents the {Object} 
    */exports.eventCognitiveJobCreated = eventCognitiveJobCreated;
const eventCognitiveJobStateChanged = (address, storeCallback = () => {}, errorCallback = () => {}, config = {}) => {

  if (!config.web3) {
    throw (0, _errors.default)(_errors.WEB3_REQUIRED);
  }

  if (!config.contracts || !config.contracts.CognitiveJob || !config.contracts.CognitiveJob.abi) {
    throw (0, _errors.default)(_errors.CONTRACT_REQUIRED, 'CognitiveJob');
  }

  const cog = new config.web3.eth.Contract(config.contracts.CognitiveJob.abi, address);
  cog.events.StateChanged({
    fromBlock: 0 }).

  on('data', async res => {

    try {

      const store = await fetchJobStore(res.args.cognitiveJob);
      storeCallback({
        address: res.args.cognitiveJob,
        store,
        status: 'changed',
        event: 'CognitiveJob.StateChanged' });

    } catch (err) {
      errorCallback(err);
    }
  }).
  on('error', errorCallback);
};exports.eventCognitiveJobStateChanged = eventCognitiveJobStateChanged;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9qb2JzLmpzIl0sIm5hbWVzIjpbImZldGNoQWN0aXZlQ291bnQiLCJjb25maWciLCJ3ZWIzIiwiV0VCM19SRVFVSVJFRCIsImNvbnRyYWN0cyIsIlBhbmRvcmEiLCJhYmkiLCJDT05UUkFDVF9SRVFVSVJFRCIsImFkZHJlc3NlcyIsInBhbmRvcmEiLCJBRERSRVNTX1JFUVVJUkVEIiwicGFuIiwiZXRoIiwiQ29udHJhY3QiLCJjb3VudCIsIm1ldGhvZHMiLCJhY3RpdmVKb2JzQ291bnQiLCJjYWxsIiwiTnVtYmVyIiwicGFyc2VJbnQiLCJmZXRjaEFkZHJlc3NCeUlkIiwiaWQiLCJqb2JBZGRyZXNzIiwiYWN0aXZlSm9icyIsIlN0cmluZyIsImZldGNoU3RhdGUiLCJhZGRyZXNzIiwiQ29nbml0aXZlSm9iIiwiY29nIiwic3RhdGUiLCJjdXJyZW50U3RhdGUiLCJmZXRjaEtlcm5lbCIsImtlcm5lbCIsImZldGNoRGF0YXNldCIsImRhdGFzZXQiLCJmZXRjaEJhdGNoZXMiLCJiYXRjaGVzIiwiZmV0Y2hQcm9ncmVzcyIsInByb2dyZXNzIiwiZmV0Y2hJcGZzUmVzdWx0cyIsImlwZnNSZXN1bHRzIiwiZmV0Y2hKb2IiLCJqb2JTdGF0dXMiLCJhY3RpdmVXb3JrZXJzQ291bnQiLCJlcnIiLCJQcm9taXNlIiwicmVqZWN0IiwiZmV0Y2hBbGwiLCJyZWNvcmRzIiwiZXJyb3IiLCJpIiwiam9iIiwicHVzaCIsIm1lc3NhZ2UiLCJmZXRjaEpvYlN0b3JlIiwiY3JlYXRlIiwia2VybmVsQWRkcmVzcyIsImRhdGFzZXRBZGRyZXNzIiwiZnJvbSIsInJlc29sdmUiLCJjcmVhdGVDb2duaXRpdmVKb2IiLCJzZW5kIiwib24iLCJyZWNlaXB0IiwiY29udHJhY3RBZGRyZXNzIiwiZXZlbnRDb2duaXRpdmVKb2JDcmVhdGVkIiwic3RvcmVDYWxsYmFjayIsImVycm9yQ2FsbGJhY2siLCJldmVudHMiLCJDb2duaXRpdmVKb2JDcmVhdGVkIiwiZnJvbUJsb2NrIiwicmVzIiwic3RvcmUiLCJhcmdzIiwiY29nbml0aXZlSm9iIiwic3RhdHVzIiwiZXZlbnQiLCJldmVudENvZ25pdGl2ZUpvYlN0YXRlQ2hhbmdlZCIsIlN0YXRlQ2hhbmdlZCJdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7Ozs7OztBQVNBLGE7O0FBRUE7Ozs7OztBQU1BOzs7O0FBSUEsc0M7Ozs7QUFJQTs7Ozs7O0FBTU8sTUFBTUEsbUJBQW1CLE9BQU9DLFNBQVMsRUFBaEIsS0FBdUI7O0FBRW5ELE1BQUksQ0FBQ0EsT0FBT0MsSUFBWixFQUFrQjtBQUNkLFVBQU0scUJBQVNDLHFCQUFULENBQU47QUFDSDs7QUFFRCxNQUFJLENBQUNGLE9BQU9HLFNBQVIsSUFBcUIsQ0FBQ0gsT0FBT0csU0FBUCxDQUFpQkMsT0FBdkMsSUFBa0QsQ0FBQ0osT0FBT0csU0FBUCxDQUFpQkMsT0FBakIsQ0FBeUJDLEdBQWhGLEVBQXFGO0FBQ2pGLFVBQU0scUJBQVNDLHlCQUFULEVBQTRCLFNBQTVCLENBQU47QUFDSDs7QUFFRCxNQUFJLENBQUNOLE9BQU9PLFNBQVIsSUFBcUIsQ0FBQ1AsT0FBT08sU0FBUCxDQUFpQkMsT0FBM0MsRUFBb0Q7QUFDaEQsVUFBTSxxQkFBU0Msd0JBQVQsRUFBMkIsU0FBM0IsQ0FBTjtBQUNIOztBQUVELFFBQU1DLE1BQU0sSUFBSVYsT0FBT0MsSUFBUCxDQUFZVSxHQUFaLENBQWdCQyxRQUFwQixDQUE2QlosT0FBT0csU0FBUCxDQUFpQkMsT0FBakIsQ0FBeUJDLEdBQXRELEVBQTJETCxPQUFPTyxTQUFQLENBQWlCQyxPQUE1RSxDQUFaO0FBQ0EsUUFBTUssUUFBUSxNQUFNSCxJQUFJSSxPQUFKO0FBQ2ZDLGlCQURlO0FBRWZDLE1BRmUsRUFBcEI7QUFHQSxTQUFPQyxPQUFPQyxRQUFQLENBQWdCTCxLQUFoQixFQUF1QixFQUF2QixDQUFQO0FBQ0gsQ0FuQk07O0FBcUJQOzs7Ozs7O0FBT08sTUFBTU0sbUJBQW1CLE9BQU9DLEVBQVAsRUFBV3BCLFNBQVMsRUFBcEIsS0FBMkI7O0FBRXZELE1B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U0FIRTtBQUlWQyxlQUFPLDJCQUpHLEVBQWQ7O0FBTUgsS0FURCxDQVNFLE9BQU1oQyxHQUFOLEVBQVc7QUFDVHVCLG9CQUFjdkIsR0FBZDtBQUNIO0FBQ0osR0FqQkw7QUFrQktrQixJQWxCTCxDQWtCUSxPQWxCUixFQWtCaUJLLGFBbEJqQjtBQW1CSCxDQTlCTSxDIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBDb2duaXRpdmUgSm9icyByZWxhdGVkIG1ldGhvZHNcbiAqIFRoaXMgZmlsZSBpdCBpcyBhIHBhcnQgb2YgdGhlIFBhbmRvcmEgUHlycmhhIEphdmFzY3JpcHQgbGlicmFyeVxuICogXG4gKiBAZmlsZSBqb2JzLmpzXG4gKiBAYXV0aG9yIEtvc3RpYW50eW4gU215cm5vdiA8a29zdHlzaEBnbWFpbC5jb20+XG4gKiBAZGF0ZSAyMDE4XG4gKi9cblxuJ3VzZSBzdHJpY3QnO1xuXG5pbXBvcnQgcGpzRXJyb3IsIHtcbiAgICBDT05UUkFDVF9SRVFVSVJFRCxcbiAgICBBRERSRVNTX1JFUVVJUkVELFxuICAgIFdFQjNfUkVRVUlSRURcbn0gZnJvbSAnLi9oZWxwZXJzL2Vycm9ycyc7XG5cbmltcG9ydCB7XG4gICAgZmV0Y2hJcGZzQWRkcmVzcyBhcyBmZXRjaElwZnNBZGRyZXNzQnlLZXJuZWxBZGRyZXNzXG59IGZyb20gJy4va2VybmVscyc7XG5cbmltcG9ydCB7XG4gICAgZmV0Y2hEYXRhc2V0IGFzIGZldGNoRGF0YXNldEJ5RGF0YXNldEFkZHJlc3Ncbn0gZnJvbSAnLi9kYXRhc2V0cyc7XG5cbi8qKlxuICogR2V0IGFjdGl2ZSBqb2IgY291bnQgZnJvbSBQYW5kb3JhIGNvbnRyYWN0XG4gKiBcbiAqIEBwYXJhbSB7T2JqZWN0fSBjb25maWcgTGlicmFyeSBjb25maWcgKHByb3ZpZGVkIGJ5IHRoZSBwcm94eSBidXQgY2FuIGJlIG92ZXJyaWRkZW4pXG4gKiBAcmV0dXJucyB7UHJvbWlzZX0gQSBQcm9taXNlIG9iamVjdCByZXByZXNlbnRzIHRoZSB7bnVtYmVyfSBcbiAqL1xuZXhwb3J0IGNvbnN0IGZldGNoQWN0aXZlQ291bnQgPSBhc3luYyAoY29uZmlnID0ge30pID0+IHtcblxuICAgIGlmICghY29uZmlnLndlYjMpIHtcbiAgICAgICAgdGhyb3cgcGpzRXJyb3IoV0VCM19SRVFVSVJFRCk7XG4gICAgfVxuXG4gICAgaWYgKCFjb25maWcuY29udHJhY3RzIHx8ICFjb25maWcuY29udHJhY3RzLlBhbmRvcmEgfHwgIWNvbmZpZy5jb250cmFjdHMuUGFuZG9yYS5hYmkpIHtcbiAgICAgICAgdGhyb3cgcGpzRXJyb3IoQ09OVFJBQ1RfUkVRVUlSRUQsICdQYW5kb3JhJyk7XG4gICAgfVxuXG4gICAgaWYgKCFjb25maWcuYWRkcmVzc2VzIHx8ICFjb25maWcuYWRkcmVzc2VzLnBhbmRvcmEpIHtcbiAgICAgICAgdGhyb3cgcGpzRXJyb3IoQUREUkVTU19SRVFVSVJFRCwgJ1BhbmRvcmEnKTtcbiAgICB9XG5cbiAgICBjb25zdCBwYW4gPSBuZXcgY29uZmlnLndlYjMuZXRoLkNvbnRyYWN0KGNvbmZpZy5jb250cmFjdHMuUGFuZG9yYS5hYmksIGNvbmZpZy5hZGRyZXNzZXMucGFuZG9yYSk7XG4gICAgY29uc3QgY291bnQgPSBhd2FpdCBwYW4ubWV0aG9kc1xuICAgICAgICAuYWN0aXZlSm9ic0NvdW50KClcbiAgICAgICAgLmNhbGwoKTtcbiAgICByZXR1cm4gTnVtYmVyLnBhcnNlSW50KGNvdW50LCAxMCk7XG59O1xuXG4vKipcbiAqIEdldCB3b3JrZXIgYnkgdGhlIHdvcmtlcidzIGlkXG4gKiBcbiAqIEBwYXJhbSB7aW50ZWdlcn0gaWQgXG4gKiBAcGFyYW0ge09iamVjdH0gY29uZmlnIExpYnJhcnkgY29uZmlnIChwcm92aWRlZCBieSB0aGUgcHJveHkgYnV0IGNhbiBiZSBvdmVycmlkZGVuKVxuICogQHJldHVybnMge1Byb21pc2V9IEEgUHJvbWlzZSBvYmplY3QgcmVwcmVzZW50cyB0aGUge3N0cmluZ31cbiAqL1xuZXhwb3J0IGNvbnN0IGZldGNoQWRkcmVzc0J5SWQgPSBhc3luYyAoaWQsIGNvbmZpZyA9IHt9KSA9PiB7XG5cbiAgICBpZiAoIWNvbmZpZy53ZWIzKSB7XG4gICAgICAgIHRocm93IHBqc0Vycm9yKFdFQjNfUkVRVUlSRUQpO1xuICAgIH1cblxuICAgIGlmICghY29uZmlnLmNvbnRyYWN0cyB8fCAhY29uZmlnLmNvbnRyYWN0cy5QYW5kb3JhIHx8ICFjb25maWcuY29udHJhY3RzLlBhbmRvcmEuYWJpKSB7XG4gICAgICAgIHRocm93IHBqc0Vycm9yKENPTlRSQUNUX1JFUVVJUkVELCAnUGFuZG9yYScpO1xuICAgIH1cblxuICAgIGlmICghY29uZmlnLmFkZHJlc3NlcyB8fCAhY29uZmlnLmFkZHJlc3Nlcy5wYW5kb3JhKSB7XG4gICAgICAgIHRocm93IHBqc0Vycm9yKEFERFJFU1NfUkVRVUlSRUQsICdQYW5kb3JhJyk7XG4gICAgfVxuXG4gICAgY29uc3QgcGFuID0gbmV3IGNvbmZpZy53ZWIzLmV0aC5Db250cmFjdChjb25maWcuY29udHJhY3RzLlBhbmRvcmEuYWJpLCBjb25maWcuYWRkcmVzc2VzLnBhbmRvcmEpO1xuICAgIGNvbnN0IGpvYkFkZHJlc3MgPSBhd2FpdCBwYW4ubWV0aG9kc1xuICAgICAgICAuYWN0aXZlSm9icyhpZClcbiAgICAgICAgLmNhbGwoKTtcbiAgICByZXR1cm4gU3RyaW5nKGpvYkFkZHJlc3MpO1xufTtcblxuLyoqXG4gKiBHZXQgam9iIHN0YXRlIGZyb20gQ29nbml0aXZlIEpvYiBjb250cmFjdCBieSB0aGUgam9iIGFkZHJlc3NcbiAqIFxuICogQHBhcmFtIHtzdHJpbmd9IGFkZHJlc3MgXG4gKiBAcGFyYW0ge09iamVjdH0gY29uZmlnIExpYnJhcnkgY29uZmlnIChwcm92aWRlZCBieSB0aGUgcHJveHkgYnV0IGNhbiBiZSBvdmVycmlkZGVuKVxuICogQHJldHVybnMge1Byb21pc2V9IEEgUHJvbWlzZSBvYmplY3QgcmVwcmVzZW50cyB0aGUge2ludGVnZXJ9IFxuICovXG5leHBvcnQgY29uc3QgZmV0Y2hTdGF0ZSA9IGFzeW5jIChhZGRyZXNzLCBjb25maWcgPSB7fSkgPT4ge1xuXG4gICAgaWYgKCFjb25maWcud2ViMykge1xuICAgICAgICB0aHJvdyBwanNFcnJvcihXRUIzX1JFUVVJUkVEKTtcbiAgICB9XG5cbiAgICBpZiAoIWNvbmZpZy5jb250cmFjdHMgfHwgIWNvbmZpZy5jb250cmFjdHMuQ29nbml0aXZlSm9iIHx8ICFjb25maWcuY29udHJhY3RzLkNvZ25pdGl2ZUpvYi5hYmkpIHtcbiAgICAgICAgdGhyb3cgcGpzRXJyb3IoQ09OVFJBQ1RfUkVRVUlSRUQsICdDb2duaXRpdmVKb2InKTtcbiAgICB9XG5cbiAgICBjb25zdCBjb2cgPSBuZXcgY29uZmlnLndlYjMuZXRoLkNvbnRyYWN0KGNvbmZpZy5jb250cmFjdHMuQ29nbml0aXZlSm9iLmFiaSwgYWRkcmVzcyk7XG4gICAgY29uc3Qgc3RhdGUgPSBhd2FpdCBjb2cubWV0aG9kc1xuICAgICAgICAuY3VycmVudFN0YXRlKClcbiAgICAgICAgLmNhbGwoKTtcbiAgICByZXR1cm4gTnVtYmVyLnBhcnNlSW50KHN0YXRlLCAxMCk7XG59O1xuXG4vKipcbiAqIEdldCBqb2Iga2VybmVsIGZyb20gQ29nbml0aXZlIEpvYiBjb250cmFjdCBieSB0aGUgam9iIGFkZHJlc3NcbiAqIFxuICogQHBhcmFtIHtzdHJpbmd9IGFkZHJlc3MgXG4gKiBAcGFyYW0ge09iamVjdH0gY29uZmlnIExpYnJhcnkgY29uZmlnIChwcm92aWRlZCBieSB0aGUgcHJveHkgYnV0IGNhbiBiZSBvdmVycmlkZGVuKVxuICogQHJldHVybnMge1Byb21pc2V9IEEgUHJvbWlzZSBvYmplY3QgcmVwcmVzZW50cyB0aGUge3N0cmluZ30gXG4gKi9cbmV4cG9ydCBjb25zdCBmZXRjaEtlcm5lbCA9IGFzeW5jIChhZGRyZXNzLCBjb25maWcgPSB7fSkgPT4ge1xuXG4gICAgaWYgKCFjb25maWcud2ViMykge1xuICAgICAgICB0aHJvdyBwanNFcnJvcihXRUIzX1JFUVVJUkVEKTtcbiAgICB9XG4gICAgXG4gICAgaWYgKCFjb25maWcuY29udHJhY3RzIHx8ICFjb25maWcuY29udHJhY3RzLkNvZ25pdGl2ZUpvYiB8fCAhY29uZmlnLmNvbnRyYWN0cy5Db2duaXRpdmVKb2IuYWJpKSB7XG4gICAgICAgIHRocm93IHBqc0Vycm9yKENPTlRSQUNUX1JFUVVJUkVELCAnQ29nbml0aXZlSm9iJyk7XG4gICAgfVxuXG4gICAgY29uc3QgY29nID0gbmV3IGNvbmZpZy53ZWIzLmV0aC5Db250cmFjdChjb25maWcuY29udHJhY3RzLkNvZ25pdGl2ZUpvYi5hYmksIGFkZHJlc3MpO1xuICAgIGNvbnN0IGtlcm5lbCA9IGF3YWl0IGNvZy5tZXRob2RzXG4gICAgICAgIC5rZXJuZWwoKVxuICAgICAgICAuY2FsbCgpO1xuICAgIHJldHVybiBTdHJpbmcoa2VybmVsKTtcbn07XG5cbi8qKlxuICogR2V0IGpvYiBkYXRhc2V0IGZyb20gQ29nbml0aXZlIEpvYiBjb250cmFjdCBieSB0aGUgam9iIGFkZHJlc3NcbiAqIFxuICogQHBhcmFtIHtzdHJpbmd9IGFkZHJlc3MgXG4gKiBAcGFyYW0ge09iamVjdH0gY29uZmlnIExpYnJhcnkgY29uZmlnIChwcm92aWRlZCBieSB0aGUgcHJveHkgYnV0IGNhbiBiZSBvdmVycmlkZGVuKVxuICogQHJldHVybnMge1Byb21pc2V9IEEgUHJvbWlzZSBvYmplY3QgcmVwcmVzZW50cyB0aGUge3N0cmluZ30gXG4gKi9cbmV4cG9ydCBjb25zdCBmZXRjaERhdGFzZXQgPSBhc3luYyAoYWRkcmVzcywgY29uZmlnID0ge30pID0+IHtcblxuICAgIGlmICghY29uZmlnLndlYjMpIHtcbiAgICAgICAgdGhyb3cgcGpzRXJyb3IoV0VCM19SRVFVSVJFRCk7XG4gICAgfVxuICAgIFxuICAgIGlmICghY29uZmlnLmNvbnRyYWN0cyB8fCAhY29uZmlnLmNvbnRyYWN0cy5Db2duaXRpdmVKb2IgfHwgIWNvbmZpZy5jb250cmFjdHMuQ29nbml0aXZlSm9iLmFiaSkge1xuICAgICAgICB0aHJvdyBwanNFcnJvcihDT05UUkFDVF9SRVFVSVJFRCwgJ0NvZ25pdGl2ZUpvYicpO1xuICAgIH1cblxuICAgIGNvbnN0IGNvZyA9IG5ldyBjb25maWcud2ViMy5ldGguQ29udHJhY3QoY29uZmlnLmNvbnRyYWN0cy5Db2duaXRpdmVKb2IuYWJpLCBhZGRyZXNzKTtcbiAgICBjb25zdCBkYXRhc2V0ID0gYXdhaXQgY29nLm1ldGhvZHNcbiAgICAgICAgLmRhdGFzZXQoKVxuICAgICAgICAuY2FsbCgpO1xuICAgIHJldHVybiBTdHJpbmcoZGF0YXNldCk7XG59O1xuXG4vKipcbiAqIEdldCBqb2IgYmF0Y2hlcyBjb3VudCBmcm9tIENvZ25pdGl2ZSBKb2IgY29udHJhY3QgYnkgdGhlIGpvYiBhZGRyZXNzXG4gKiBcbiAqIEBwYXJhbSB7c3RyaW5nfSBhZGRyZXNzIFxuICogQHBhcmFtIHtPYmplY3R9IGNvbmZpZyBMaWJyYXJ5IGNvbmZpZyAocHJvdmlkZWQgYnkgdGhlIHByb3h5IGJ1dCBjYW4gYmUgb3ZlcnJpZGRlbilcbiAqIEByZXR1cm5zIHtQcm9taXNlfSBBIFByb21pc2Ugb2JqZWN0IHJlcHJlc2VudHMgdGhlIHtudW1iZXJ9IFxuICovXG5leHBvcnQgY29uc3QgZmV0Y2hCYXRjaGVzID0gYXN5bmMgKGFkZHJlc3MsIGNvbmZpZyA9IHt9KSA9PiB7XG5cbiAgICBpZiAoIWNvbmZpZy53ZWIzKSB7XG4gICAgICAgIHRocm93IHBqc0Vycm9yKFdFQjNfUkVRVUlSRUQpO1xuICAgIH1cbiAgICBcbiAgICBpZiAoIWNvbmZpZy5jb250cmFjdHMgfHwgIWNvbmZpZy5jb250cmFjdHMuQ29nbml0aXZlSm9iIHx8ICFjb25maWcuY29udHJhY3RzLkNvZ25pdGl2ZUpvYi5hYmkpIHtcbiAgICAgICAgdGhyb3cgcGpzRXJyb3IoQ09OVFJBQ1RfUkVRVUlSRUQsICdDb2duaXRpdmVKb2InKTtcbiAgICB9XG5cbiAgICBjb25zdCBjb2cgPSBuZXcgY29uZmlnLndlYjMuZXRoLkNvbnRyYWN0KGNvbmZpZy5jb250cmFjdHMuQ29nbml0aXZlSm9iLmFiaSwgYWRkcmVzcyk7XG4gICAgY29uc3QgYmF0Y2hlcyA9IGF3YWl0IGNvZy5tZXRob2RzXG4gICAgICAgIC5iYXRjaGVzKClcbiAgICAgICAgLmNhbGwoKTtcbiAgICByZXR1cm4gTnVtYmVyLnBhcnNlSW50KGJhdGNoZXMsIDEwKTtcbn07XG5cbi8qKlxuICogR2V0IGpvYiBwcm9ncmVzcyBmcm9tIENvZ25pdGl2ZSBKb2IgY29udHJhY3QgYnkgdGhlIGpvYiBhZGRyZXNzXG4gKiBcbiAqIEBwYXJhbSB7c3RyaW5nfSBhZGRyZXNzIFxuICogQHBhcmFtIHtPYmplY3R9IGNvbmZpZyBMaWJyYXJ5IGNvbmZpZyAocHJvdmlkZWQgYnkgdGhlIHByb3h5IGJ1dCBjYW4gYmUgb3ZlcnJpZGRlbilcbiAqIEByZXR1cm5zIHtQcm9taXNlfSBBIFByb21pc2Ugb2JqZWN0IHJlcHJlc2VudHMgdGhlIHtudW1iZXJ9IFxuICovXG5leHBvcnQgY29uc3QgZmV0Y2hQcm9ncmVzcyA9IGFzeW5jIChhZGRyZXNzLCBjb25maWcgPSB7fSkgPT4ge1xuXG4gICAgaWYgKCFjb25maWcud2ViMykge1xuICAgICAgICB0aHJvdyBwanNFcnJvcihXRUIzX1JFUVVJUkVEKTtcbiAgICB9XG4gICAgXG4gICAgaWYgKCFjb25maWcuY29udHJhY3RzIHx8ICFjb25maWcuY29udHJhY3RzLkNvZ25pdGl2ZUpvYiB8fCAhY29uZmlnLmNvbnRyYWN0cy5Db2duaXRpdmVKb2IuYWJpKSB7XG4gICAgICAgIHRocm93IHBqc0Vycm9yKENPTlRSQUNUX1JFUVVJUkVELCAnQ29nbml0aXZlSm9iJyk7XG4gICAgfVxuXG4gICAgY29uc3QgY29nID0gbmV3IGNvbmZpZy53ZWIzLmV0aC5Db250cmFjdChjb25maWcuY29udHJhY3RzLkNvZ25pdGl2ZUpvYi5hYmksIGFkZHJlc3MpO1xuICAgIGNvbnN0IHByb2dyZXNzID0gYXdhaXQgY29nLm1ldGhvZHNcbiAgICAgICAgLnByb2dyZXNzKClcbiAgICAgICAgLmNhbGwoKTtcbiAgICByZXR1cm4gTnVtYmVyLnBhcnNlSW50KHByb2dyZXNzLCAxMCk7XG59O1xuXG4vKipcbiAqIEdldCBqb2IncyBpcGZzUmVzdWx0cyBmcm9tIENvZ25pdGl2ZSBKb2IgY29udHJhY3QgYnkgdGhlIGpvYiBhZGRyZXNzXG4gKiBcbiAqIEBwYXJhbSB7c3RyaW5nfSBhZGRyZXNzIFxuICogQHBhcmFtIHtPYmplY3R9IGNvbmZpZyBMaWJyYXJ5IGNvbmZpZyAocHJvdmlkZWQgYnkgdGhlIHByb3h5IGJ1dCBjYW4gYmUgb3ZlcnJpZGRlbilcbiAqIEByZXR1cm5zIHtQcm9taXNlfSBBIFByb21pc2Ugb2JqZWN0IHJlcHJlc2VudHMgdGhlIHtzdHJpbmdbXX0gXG4gKi9cbmV4cG9ydCBjb25zdCBmZXRjaElwZnNSZXN1bHRzID0gYXN5bmMgKGFkZHJlc3MsIGNvbmZpZyA9IHt9KSA9PiB7XG5cbiAgICBpZiAoIWNvbmZpZy53ZWIzKSB7XG4gICAgICAgIHRocm93IHBqc0Vycm9yKFdFQjNfUkVRVUlSRUQpO1xuICAgIH1cbiAgICBcbiAgICBpZiAoIWNvbmZpZy5jb250cmFjdHMgfHwgIWNvbmZpZy5jb250cmFjdHMuQ29nbml0aXZlSm9iIHx8ICFjb25maWcuY29udHJhY3RzLkNvZ25pdGl2ZUpvYi5hYmkpIHtcbiAgICAgICAgdGhyb3cgcGpzRXJyb3IoQ09OVFJBQ1RfUkVRVUlSRUQsICdDb2duaXRpdmVKb2InKTtcbiAgICB9XG5cbiAgICBjb25zdCBjb2cgPSBuZXcgY29uZmlnLndlYjMuZXRoLkNvbnRyYWN0KGNvbmZpZy5jb250cmFjdHMuQ29nbml0aXZlSm9iLmFiaSwgYWRkcmVzcyk7XG4gICAgY29uc3QgaXBmc1Jlc3VsdHMgPSBhd2FpdCBjb2cubWV0aG9kc1xuICAgICAgICAuaXBmc1Jlc3VsdHMoKVxuICAgICAgICAuY2FsbCgpO1xuICAgIHJldHVybiBpcGZzUmVzdWx0cztcbn07XG5cbi8qKlxuICogR2V0IGpvYiBieSB0aGUgam9iIGFkZHJlc3NcbiAqIFxuICogQHBhcmFtIHtzdHJpbmd9IGFkZHJlc3MgXG4gKiBAcGFyYW0ge09iamVjdH0gY29uZmlnIExpYnJhcnkgY29uZmlnIChwcm92aWRlZCBieSB0aGUgcHJveHkgYnV0IGNhbiBiZSBvdmVycmlkZGVuKVxuICogQHJldHVybnMge1Byb21pc2V9IEEgUHJvbWlzZSBvYmplY3QgcmVwcmVzZW50cyB0aGUge09iamVjdH0gXG4gKi9cbmV4cG9ydCBjb25zdCBmZXRjaEpvYiA9IGFzeW5jIChhZGRyZXNzLCBjb25maWcgPSB7fSkgPT4ge1xuXG4gICAgdHJ5IHtcblxuICAgICAgICBjb25zdCBzdGF0ZSA9IGF3YWl0IGZldGNoU3RhdGUoYWRkcmVzcywgY29uZmlnKTtcbiAgICAgICAgY29uc3Qga2VybmVsID0gYXdhaXQgZmV0Y2hLZXJuZWwoYWRkcmVzcywgY29uZmlnKTtcbiAgICAgICAgY29uc3QgZGF0YXNldCA9IGF3YWl0IGZldGNoRGF0YXNldChhZGRyZXNzLCBjb25maWcpO1xuICAgICAgICBjb25zdCBiYXRjaGVzID0gYXdhaXQgZmV0Y2hCYXRjaGVzKGFkZHJlc3MsIGNvbmZpZyk7XG4gICAgICAgIGNvbnN0IHByb2dyZXNzID0gYXdhaXQgZmV0Y2hQcm9ncmVzcyhhZGRyZXNzLCBjb25maWcpO1xuICAgICAgICBjb25zdCBpcGZzUmVzdWx0cyA9IGF3YWl0IGZldGNoSXBmc1Jlc3VsdHMoYWRkcmVzcywgY29uZmlnKTtcbiAgICAgICAgXG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICBhZGRyZXNzOiBhZGRyZXNzLFxuICAgICAgICAgICAgam9iU3RhdHVzOiBzdGF0ZSxcbiAgICAgICAgICAgIGtlcm5lbDoga2VybmVsLFxuICAgICAgICAgICAgZGF0YXNldDogZGF0YXNldCxcbiAgICAgICAgICAgIGJhdGNoZXM6IGJhdGNoZXMsXG4gICAgICAgICAgICBwcm9ncmVzczogcHJvZ3Jlc3MsXG4gICAgICAgICAgICBpcGZzUmVzdWx0czogaXBmc1Jlc3VsdHMsXG4gICAgICAgICAgICBhY3RpdmVXb3JrZXJzQ291bnQ6IGJhdGNoZXNcbiAgICAgICAgfTtcbiAgICB9IGNhdGNoKGVycikge1xuICAgICAgICByZXR1cm4gUHJvbWlzZS5yZWplY3QoZXJyKTtcbiAgICB9XG59O1xuXG4vKipcbiAqIEdldCBhbGwgam9ic1xuICogXG4gKiBAcGFyYW0ge09iamVjdH0gY29uZmlnIExpYnJhcnkgY29uZmlnIChwcm92aWRlZCBieSB0aGUgcHJveHkgYnV0IGNhbiBiZSBvdmVycmlkZGVuKVxuICogQHJldHVybnMge1Byb21pc2V9IEEgUHJvbWlzZSBvYmplY3QgcmVwcmVzZW50cyB0aGUge09iamVjdFtdfSBcbiAqL1xuZXhwb3J0IGNvbnN0IGZldGNoQWxsID0gYXN5bmMgKGNvbmZpZyA9IHt9KSA9PiB7XG4gICAgbGV0IHJlY29yZHMgPSBbXTtcbiAgICBsZXQgZXJyb3IgPSBbXTtcblxuICAgIHRyeSB7XG5cbiAgICAgICAgY29uc3QgY291bnQgPSBhd2FpdCBmZXRjaEFjdGl2ZUNvdW50KGNvbmZpZyk7ICAgIFxuXG4gICAgICAgIGZvciAobGV0IGk9MDsgaSA8IGNvdW50OyBpKyspIHtcbiAgICAgICAgICAgIFxuICAgICAgICAgICAgY29uc3QgYWRkcmVzcyA9IGF3YWl0IGZldGNoQWRkcmVzc0J5SWQoaSwgY29uZmlnKTtcblxuICAgICAgICAgICAgdHJ5IHtcblxuICAgICAgICAgICAgICAgIGNvbnN0IGpvYiA9IGF3YWl0IGZldGNoSm9iKGFkZHJlc3MsIGNvbmZpZyk7XG5cbiAgICAgICAgICAgICAgICByZWNvcmRzLnB1c2goe1xuICAgICAgICAgICAgICAgICAgICBpZDogaSxcbiAgICAgICAgICAgICAgICAgICAgLi4uam9iXG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9IGNhdGNoKGVycikge1xuICAgICAgICAgICAgICAgIGVycm9yLnB1c2goe1xuICAgICAgICAgICAgICAgICAgICBhZGRyZXNzLFxuICAgICAgICAgICAgICAgICAgICBtZXNzYWdlOiBlcnIubWVzc2FnZVxuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfSAgICAgICAgXG4gICAgICAgIH1cbiAgICB9IGNhdGNoKGVycikge1xuICAgICAgICBlcnJvci5wdXNoKHtcbiAgICAgICAgICAgIGVycm9yOiBlcnIubWVzc2FnZVxuICAgICAgICB9KTtcbiAgICB9ICAgXG5cbiAgICByZXR1cm4ge1xuICAgICAgICByZWNvcmRzLFxuICAgICAgICBlcnJvclxuICAgIH07XG59O1xuXG4vKipcbiAqIEdldCBqb2Igc3RvcmVcbiAqIFxuICogQHBhcmFtIHtzdHJpbmd9IGFkZHJlc3MgXG4gKiBAcGFyYW0ge09iamVjdH0gY29uZmlnIExpYnJhcnkgY29uZmlnIChwcm92aWRlZCBieSB0aGUgcHJveHkgYnV0IGNhbiBiZSBvdmVycmlkZGVuKVxuICogQHJldHVybnMge1Byb21pc2V9IEEgUHJvbWlzZSBvYmplY3QgcmVwcmVzZW50cyB0aGUge09iamVjdH0gXG4gKi9cbmV4cG9ydCBjb25zdCBmZXRjaEpvYlN0b3JlID0gYXN5bmMgKGFkZHJlc3MsIGNvbmZpZyA9IHt9KSA9PiB7XG5cbiAgICB0cnkge1xuXG4gICAgICAgIGNvbnN0IGpvYiA9IGF3YWl0IGZldGNoSm9iKGFkZHJlc3MsIGNvbmZpZyk7XG4gICAgICAgIGNvbnN0IGtlcm5lbCA9IGF3YWl0IGZldGNoSXBmc0FkZHJlc3NCeUtlcm5lbEFkZHJlc3Moam9iLmtlcm5lbCwgY29uZmlnKTtcbiAgICAgICAgY29uc3QgZGF0YXNldCA9IGF3YWl0IGZldGNoRGF0YXNldEJ5RGF0YXNldEFkZHJlc3Moam9iLmRhdGFzZXQsIGNvbmZpZyk7XG4gICAgICAgIFxuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgam9iLFxuICAgICAgICAgICAga2VybmVsLFxuICAgICAgICAgICAgZGF0YXNldFxuICAgICAgICB9O1xuICAgIH0gY2F0Y2goZXJyKSB7XG4gICAgICAgIHJldHVybiBQcm9taXNlLnJlamVjdChlcnIpO1xuICAgIH1cbn07XG5cbi8qKlxuICogQ3JlYXRlIGNvZ25pdGl2ZSBqb2IgY29udHJhY3RcbiAqIFxuICogQHBhcmFtIHtTdHJpbmd9IGtlcm5lbEFkZHJlc3MgXG4gKiBAcGFyYW0ge1N0cmluZ30gZGF0YXNldEFkZHJlc3MgXG4gKiBAcGFyYW0ge1N0cmluZ30gZnJvbVxuICogQHBhcmFtIHtPYmplY3R9IGNvbmZpZyBMaWJyYXJ5IGNvbmZpZyAocHJvdmlkZWQgYnkgdGhlIHByb3h5IGJ1dCBjYW4gYmUgb3ZlcnJpZGRlbilcbiAqIEByZXR1cm5zIHtQcm9taXNlfSBQcm9taXNlIG9iamVjdCByZXNvbHZlZCB0byBhZGQgc3RhdHVzIChib29sZWFuKVxuICovXG5leHBvcnQgY29uc3QgY3JlYXRlID0gKGtlcm5lbEFkZHJlc3MsIGRhdGFzZXRBZGRyZXNzLCBmcm9tLCBjb25maWcgPSB7fSkgPT4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuXG4gICAgaWYgKCFjb25maWcud2ViMykge1xuICAgICAgICB0aHJvdyBwanNFcnJvcihXRUIzX1JFUVVJUkVEKTtcbiAgICB9XG5cbiAgICBpZiAoIWNvbmZpZy5jb250cmFjdHMgfHwgIWNvbmZpZy5jb250cmFjdHMuUGFuZG9yYSB8fCAhY29uZmlnLmNvbnRyYWN0cy5QYW5kb3JhLmFiaSkge1xuICAgICAgICB0aHJvdyBwanNFcnJvcihDT05UUkFDVF9SRVFVSVJFRCwgJ1BhbmRvcmEnKTtcbiAgICB9XG5cbiAgICBpZiAoIWNvbmZpZy5hZGRyZXNzZXMgfHwgIWNvbmZpZy5hZGRyZXNzZXMucGFuZG9yYSkge1xuICAgICAgICB0aHJvdyBwanNFcnJvcihBRERSRVNTX1JFUVVJUkVELCAnUGFuZG9yYScpO1xuICAgIH1cblxuICAgIGNvbnN0IHBhbiA9IG5ldyBjb25maWcud2ViMy5ldGguQ29udHJhY3QoY29uZmlnLmNvbnRyYWN0cy5QYW5kb3JhLmFiaSwgY29uZmlnLmFkZHJlc3Nlcy5wYW5kb3JhKTtcbiAgICBwYW4ubWV0aG9kc1xuICAgICAgICAuY3JlYXRlQ29nbml0aXZlSm9iKGtlcm5lbEFkZHJlc3MsIGRhdGFzZXRBZGRyZXNzKVxuICAgICAgICAuc2VuZCh7XG4gICAgICAgICAgICBmcm9tXG4gICAgICAgIH0pXG4gICAgICAgIC5vbignZXJyb3InLCByZWplY3QpXG4gICAgICAgIC5vbigncmVjZWlwdCcsIHJlY2VpcHQgPT4gcmVzb2x2ZShyZWNlaXB0LmNvbnRyYWN0QWRkcmVzcykpO1xufSk7XG5cbi8qKlxuICogSGFuZGxlIGV2ZW50IENvZ25pdGl2ZUpvYkNyZWF0ZWRcbiAqIFxuICogQHBhcmFtIHtGdW5jdGlvbn0gc3RvcmVDYWxsYmFjayBcbiAqIEBwYXJhbSB7RnVuY3Rpb259IGVycm9yQ2FsbGJhY2tcbiAqIEBwYXJhbSB7T2JqZWN0fSBjb25maWcgTGlicmFyeSBjb25maWcgKHByb3ZpZGVkIGJ5IHRoZSBwcm94eSBidXQgY2FuIGJlIG92ZXJyaWRkZW4pXG4gKi9cbmV4cG9ydCBjb25zdCBldmVudENvZ25pdGl2ZUpvYkNyZWF0ZWQgPSAoc3RvcmVDYWxsYmFjayA9ICgpID0+IHt9LCBlcnJvckNhbGxiYWNrID0gKCkgPT4ge30sIGNvbmZpZyA9IHt9KSA9PiB7XG5cbiAgICBpZiAoIWNvbmZpZy53ZWIzKSB7XG4gICAgICAgIHRocm93IHBqc0Vycm9yKFdFQjNfUkVRVUlSRUQpO1xuICAgIH1cblxuICAgIGlmICghY29uZmlnLmNvbnRyYWN0cyB8fCAhY29uZmlnLmNvbnRyYWN0cy5QYW5kb3JhIHx8ICFjb25maWcuY29udHJhY3RzLlBhbmRvcmEuYWJpKSB7XG4gICAgICAgIHRocm93IHBqc0Vycm9yKENPTlRSQUNUX1JFUVVJUkVELCAnUGFuZG9yYScpO1xuICAgIH1cblxuICAgIGlmICghY29uZmlnLmFkZHJlc3NlcyB8fCAhY29uZmlnLmFkZHJlc3Nlcy5wYW5kb3JhKSB7XG4gICAgICAgIHRocm93IHBqc0Vycm9yKEFERFJFU1NfUkVRVUlSRUQsICdQYW5kb3JhJyk7XG4gICAgfVxuXG4gICAgY29uc3QgcGFuID0gbmV3IGNvbmZpZy53ZWIzLmV0aC5Db250cmFjdChjb25maWcuY29udHJhY3RzLlBhbmRvcmEuYWJpLCBjb25maWcuYWRkcmVzc2VzLnBhbmRvcmEpO1xuICAgIHBhbi5ldmVudHMuQ29nbml0aXZlSm9iQ3JlYXRlZCh7XG4gICAgICAgIGZyb21CbG9jazogMFxuICAgIH0pXG4gICAgICAgIC5vbignZGF0YScsIGFzeW5jIHJlcyA9PiB7XG5cbiAgICAgICAgICAgIHRyeSB7XG5cbiAgICAgICAgICAgICAgICBjb25zdCBzdG9yZSA9IGF3YWl0IGZldGNoSm9iU3RvcmUocmVzLmFyZ3MuY29nbml0aXZlSm9iKTtcbiAgICAgICAgICAgICAgICBzdG9yZUNhbGxiYWNrKHtcbiAgICAgICAgICAgICAgICAgICAgYWRkcmVzczogcmVzLmFyZ3MuY29nbml0aXZlSm9iLFxuICAgICAgICAgICAgICAgICAgICBzdG9yZSxcbiAgICAgICAgICAgICAgICAgICAgc3RhdHVzOiAnY3JlYXRlZCcsXG4gICAgICAgICAgICAgICAgICAgIGV2ZW50OiAnUGFuZG9yYS5Db2duaXRpdmVKb2JDcmVhdGVkJ1xuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfSBjYXRjaChlcnIpIHtcbiAgICAgICAgICAgICAgICBlcnJvckNhbGxiYWNrKGVycik7XG4gICAgICAgICAgICB9ICAgICAgICAgICAgXG4gICAgICAgIH0pXG4gICAgICAgIC5vbignZXJyb3InLCBlcnJvckNhbGxiYWNrKTtcbn07XG5cbi8qKlxuICogSGFuZGxlIGV2ZW50IFN0YXRlQ2hhbmdlZCBmb3IgQ29nbml0aXZlSm9iXG4gKiBcbiAqIEBwYXJhbSB7c3RyaW5nfSBhZGRyZXNzXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBzdG9yZUNhbGxiYWNrIFxuICogQHBhcmFtIHtGdW5jdGlvbn0gZXJyb3JDYWxsYmFja1xuICogQHBhcmFtIHtPYmplY3R9IGNvbmZpZyBMaWJyYXJ5IGNvbmZpZyAocHJvdmlkZWQgYnkgdGhlIHByb3h5IGJ1dCBjYW4gYmUgb3ZlcnJpZGRlbilcbiAqIEByZXR1cm5zIHtQcm9taXNlfSBBIFByb21pc2Ugb2JqZWN0IHJlcHJlc2VudHMgdGhlIHtPYmplY3R9IFxuICovXG5leHBvcnQgY29uc3QgZXZlbnRDb2duaXRpdmVKb2JTdGF0ZUNoYW5nZWQgPSAoYWRkcmVzcywgc3RvcmVDYWxsYmFjayA9ICgpID0+IHt9LCBlcnJvckNhbGxiYWNrID0gKCkgPT4ge30sIGNvbmZpZyA9IHt9KSA9PiB7XG5cbiAgICBpZiAoIWNvbmZpZy53ZWIzKSB7XG4gICAgICAgIHRocm93IHBqc0Vycm9yKFdFQjNfUkVRVUlSRUQpO1xuICAgIH1cblxuICAgIGlmICghY29uZmlnLmNvbnRyYWN0cyB8fCAhY29uZmlnLmNvbnRyYWN0cy5Db2duaXRpdmVKb2IgfHwgIWNvbmZpZy5jb250cmFjdHMuQ29nbml0aXZlSm9iLmFiaSkge1xuICAgICAgICB0aHJvdyBwanNFcnJvcihDT05UUkFDVF9SRVFVSVJFRCwgJ0NvZ25pdGl2ZUpvYicpO1xuICAgIH1cblxuICAgIGNvbnN0IGNvZyA9IG5ldyBjb25maWcud2ViMy5ldGguQ29udHJhY3QoY29uZmlnLmNvbnRyYWN0cy5Db2duaXRpdmVKb2IuYWJpLCBhZGRyZXNzKTtcbiAgICBjb2cuZXZlbnRzLlN0YXRlQ2hhbmdlZCh7XG4gICAgICAgIGZyb21CbG9jazogMFxuICAgIH0pXG4gICAgICAgIC5vbignZGF0YScsIGFzeW5jIHJlcyA9PiB7XG5cbiAgICAgICAgICAgIHRyeSB7XG5cbiAgICAgICAgICAgICAgICBjb25zdCBzdG9yZSA9IGF3YWl0IGZldGNoSm9iU3RvcmUocmVzLmFyZ3MuY29nbml0aXZlSm9iKTtcbiAgICAgICAgICAgICAgICBzdG9yZUNhbGxiYWNrKHtcbiAgICAgICAgICAgICAgICAgICAgYWRkcmVzczogcmVzLmFyZ3MuY29nbml0aXZlSm9iLFxuICAgICAgICAgICAgICAgICAgICBzdG9yZSxcbiAgICAgICAgICAgICAgICAgICAgc3RhdHVzOiAnY2hhbmdlZCcsXG4gICAgICAgICAgICAgICAgICAgIGV2ZW50OiAnQ29nbml0aXZlSm9iLlN0YXRlQ2hhbmdlZCdcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH0gY2F0Y2goZXJyKSB7XG4gICAgICAgICAgICAgICAgZXJyb3JDYWxsYmFjayhlcnIpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KVxuICAgICAgICAub24oJ2Vycm9yJywgZXJyb3JDYWxsYmFjayk7XG59O1xuIl19