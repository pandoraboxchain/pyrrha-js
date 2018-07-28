/**
 * Cognitive Jobs related methods
 * This file it is a part of the Pandora Pyrrha Javascript library
 * 
 * @file jobs.js
 * @author Kostiantyn Smyrnov <kostysh@gmail.com>
 * @date 2018
 */
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.eventJobStateChanged = exports.eventCognitiveJobCreated = exports.fetchAll = exports.create = exports.fetchJobsIds = exports.fetchJobDetails = exports.fetchCompletedJobsCount = exports.fetchActiveJobsCount = exports.fetchJobControllerAddress = void 0;

var expect = _interopRequireWildcard(require("./helpers/expect"));

var _errors = _interopRequireWildcard(require("./helpers/errors"));

var _kernels = require("./kernels");

var _datasets = require("./datasets");

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

const localCache = new Map();
/**
 * Get job controller address
 * 
 * @param {Object} config Library config (provided by the proxy but can be overridden)
 * @returns {Promise<{String}>} 
 */

const fetchJobControllerAddress = async (config = {}) => {
  expect.all(config, {
    'web3': {
      type: 'object',
      code: _errors.WEB3_REQUIRED
    },
    'addresses.Pandora': {
      type: 'address',
      code: _errors.ADDRESS_REQUIRED,
      args: ['Pandora']
    },
    'contracts.Pandora.abi': {
      type: 'object',
      code: _errors.CONTRACT_REQUIRED,
      args: ['Pandora']
    }
  });
  const pan = new config.web3.eth.Contract(config.contracts.Pandora.abi, config.addresses.Pandora);
  const jobController = await pan.methods.jobController().call(); // save for later use

  localCache.set('jobController', jobController);
  return jobController;
};
/**
 * Get active jobs count 
 * 
 * @param {Object} config Library config (provided by the proxy but can be overridden)
 * @returns {Promise<{Number}>} 
 */


exports.fetchJobControllerAddress = fetchJobControllerAddress;

const fetchActiveJobsCount = async (config = {}) => {
  expect.all(config, {
    'web3': {
      type: 'object',
      code: _errors.WEB3_REQUIRED
    },
    'contracts.CognitiveJobController.abi': {
      type: 'object',
      code: _errors.CONTRACT_REQUIRED,
      args: ['CognitiveJobController']
    }
  });
  let jobController = localCache.get('jobController');

  if (!jobController) {
    jobController = await fetchJobControllerAddress(config);
  }

  const jctrl = new config.web3.eth.Contract(config.contracts.CognitiveJobController.abi, jobController);
  const count = await jctrl.methods.activeJobsCount().call();
  return Number.parseInt(count, 10);
};
/**
 * Get completed jobs count 
 * 
 * @param {Object} config Library config (provided by the proxy but can be overridden)
 * @returns {Promise<{Number}>} 
 */


exports.fetchActiveJobsCount = fetchActiveJobsCount;

const fetchCompletedJobsCount = async (config = {}) => {
  expect.all(config, {
    'web3': {
      type: 'object',
      code: _errors.WEB3_REQUIRED
    },
    'contracts.CognitiveJobController.abi': {
      type: 'object',
      code: _errors.CONTRACT_REQUIRED,
      args: ['CognitiveJobController']
    }
  });
  let jobController = localCache.get('jobController');

  if (!jobController) {
    jobController = await fetchJobControllerAddress(config);
  }

  const jctrl = new config.web3.eth.Contract(config.contracts.CognitiveJobController.abi, jobController);
  const count = await jctrl.methods.completedJobsCount().call();
  return Number.parseInt(count, 10);
};
/**
 * Get job details 
 * 
 * @param {String} address Job address
 * @param {Object} config Library config (provided by the proxy but can be overridden)
 * @returns {Promise<{Number}>} 
 */


exports.fetchCompletedJobsCount = fetchCompletedJobsCount;

const fetchJobDetails = async (address, config = {}) => {
  expect.all(config, {
    'web3': {
      type: 'object',
      code: _errors.WEB3_REQUIRED
    },
    'contracts.CognitiveJobController.abi': {
      type: 'object',
      code: _errors.CONTRACT_REQUIRED,
      args: ['CognitiveJobController']
    }
  });
  let jobController = localCache.get('jobController');

  if (!jobController) {
    jobController = await fetchJobControllerAddress(config);
  }

  const jctrl = new config.web3.eth.Contract(config.contracts.CognitiveJobController.abi, jobController);
  const {
    kernel,
    dataset,
    complexity,
    description,
    activeWorkers,
    progress,
    state
  } = await jctrl.methods.getCognitiveJobDetails(address).call();
  const kernelIpfs = await (0, _kernels.fetchIpfsAddress)(kernel, config);
  const datasetIpfs = await (0, _datasets.fetchIpfsAddress)(dataset, config);
  const ipfsResults = await Promise.all(activeWorkers.map((_, index) => jctrl.methods.getCognitiveJobResults(address, index).call()));
  const utf8description = description ? config.web3.utils.hexToUtf8(description) : '';
  return {
    address,
    kernel,
    kernelIpfs,
    dataset,
    datasetIpfs,
    activeWorkers,
    ipfsResults: ipfsResults.map(result => result ? config.web3.utils.hexToUtf8(result) : result).filter(res => res),
    complexity: Number(complexity),
    progress: Number(progress),
    state: Number(state),
    description: utf8description.substr(2),
    jobType: utf8description.substr(0, 1)
  };
};
/**
 * Get jobs Id from the "source"
 * 
 * @param {String} from source activeJobs or completedJobs
 * @param {Number} count
 * @param {Object} options
 * @returns {Promise<[{String}]>} 
 */


exports.fetchJobDetails = fetchJobDetails;

const fetchJobsIds = async (source, count = 0, config = {}) => {
  expect.all({
    source
  }, {
    'source': {
      type: 'enum',
      values: ['activeJobs', 'completedJobs']
    }
  });
  expect.all(config, {
    'web3': {
      type: 'object',
      code: _errors.WEB3_REQUIRED
    },
    'contracts.CognitiveJobController.abi': {
      type: 'object',
      code: _errors.CONTRACT_REQUIRED,
      args: ['CognitiveJobController']
    }
  });
  let jobController = localCache.get('jobController');

  if (!jobController) {
    jobController = await fetchJobControllerAddress(config);
  } // numbers sequence from 0 to count


  const counts = [...Array(count).keys()];
  const jctrl = new config.web3.eth.Contract(config.contracts.CognitiveJobController.abi, jobController);
  const addresses = await Promise.all(counts.map(index => jctrl.methods.getJobId(index, source === 'activeJobs').call()));
  return addresses;
};
/**
 * Create cognitive job contract
 * 
 * @param {Object} options
 * @param {String} from Publisher address
 * @param {Object} config Library config (provided by the proxy but can be overridden)
 * @returns {Promise} Promise object resolved to add status (boolean)
 */


exports.fetchJobsIds = fetchJobsIds;

const create = ({
  kernel,
  dataset,
  complexity,
  jobType,
  description,
  deposit
}, from, config = {}) => new Promise((resolve, reject) => {
  expect.all({
    kernel,
    dataset,
    complexity,
    jobType,
    description,
    deposit,
    from
  }, {
    'kernel': {
      type: 'address'
    },
    'dataset': {
      type: 'address'
    },
    'complexity': {
      type: 'number'
    },
    'jobType': {
      type: 'string'
    },
    'description': {
      type: 'string'
    },
    'deposit': {
      type: 'number'
    },
    'from': {
      type: 'address'
    }
  });
  expect.all(config, {
    'web3': {
      type: 'object',
      code: _errors.WEB3_REQUIRED
    },
    'contracts.Pandora.abi': {
      type: 'object',
      code: _errors.CONTRACT_REQUIRED,
      args: ['Pandora']
    },
    'addresses.Pandora': {
      type: 'address',
      code: _errors.ADDRESS_REQUIRED,
      args: ['Pandora']
    }
  });
  const pan = new config.web3.eth.Contract(config.contracts.Pandora.abi, config.addresses.Pandora);
  pan.methods.createCognitiveJob(kernel, dataset, complexity, config.web3.utils.utf8ToHex(`${jobType};${description}`)).send({
    value: config.web3.utils.toWei(String(deposit)),
    from,
    gas: 6700000 // because this workflow is too greedy

  }).on('error', reject).on('receipt', receipt => {
    try {
      if (Number(receipt.status) === 0) {
        return reject((0, _errors.default)(_errors.TRANSACTION_UNSUCCESSFUL));
      }

      if (receipt.events.CognitiveJobQueued) {
        return resolve(receipt.events.CognitiveJobQueued.returnValues.jobId);
      }

      resolve(receipt.events.CognitiveJobCreated.returnValues.jobId);
    } catch (err) {
      reject(err);
    }
  });
});
/**
 * Get all jobs
 * 
 * @param {Object} config Library config (provided by the proxy but can be overridden)
 * @returns {Promise} A Promise object represents the {Object[]} 
 */


exports.create = create;

const fetchAll = async (config = {}) => {
  let records = [];
  let error = [];

  try {
    const [activeCount, completedCount] = await Promise.all([fetchActiveJobsCount(config), fetchCompletedJobsCount(config)]);
    const [activeJobsIds, completedJobsIds] = await Promise.all([fetchJobsIds('activeJobs', activeCount, config), fetchJobsIds('completedJobs', completedCount, config)]);
    const allJobsIds = [...activeJobsIds, ...completedJobsIds];
    records = await Promise.all(allJobsIds.map(jobId => fetchJobDetails(jobId, config)));
  } catch (err) {
    error.push({
      error: err.message
    });
  }

  return {
    records,
    error
  };
};
/**
 * Handle event CognitiveJobCreated
 * 
 * @param {Object} options Event handler options
 * @param {Object} config Library config (provided by the proxy but can be overridden)
 * @returns {Object} Object with chained callbacks #data and #error
 */


exports.fetchAll = fetchAll;

const eventCognitiveJobCreated = (options = {}, config = {}) => {
  expect.all({
    options
  }, {
    'options': {
      type: 'object'
    }
  });
  expect.all(config, {
    'web3': {
      type: 'object',
      code: _errors.WEB3_REQUIRED
    },
    'contracts.Pandora.abi': {
      type: 'object',
      code: _errors.CONTRACT_REQUIRED,
      args: ['Pandora']
    },
    'addresses.Pandora': {
      type: 'address',
      code: _errors.ADDRESS_REQUIRED,
      args: ['Pandora']
    }
  });
  const callbacks = {
    onData: () => {},
    onError: () => {}
  };
  const chain = {
    data: (cb = () => {}) => {
      callbacks.onData = cb;
      return chain;
    },
    error: (cb = () => {}) => {
      callbacks.onError = cb;
      return chain;
    }
  };
  const pan = new config.web3.eth.Contract(config.contracts.Pandora.abi, config.addresses.Pandora);
  chain.event = pan.events.CognitiveJobCreated(options).on('data', async res => {
    try {
      const jobDetails = await fetchJobDetails(res.returnValues.jobId, config);
      callbacks.onData({
        records: [jobDetails]
      });
    } catch (err) {
      callbacks.onError(err);
    }
  }).on('error', callbacks.onError);
  return chain;
};
/**
 * Handle event JobStateChanged
 * 
 * @param {Object} options Event handler options
 * @param {Object} config Library config (provided by the proxy but can be overridden)
 * @returns {Object} Object with chained callbacks #data and #error
 */


exports.eventCognitiveJobCreated = eventCognitiveJobCreated;

const eventJobStateChanged = (options = {}, config = {}) => {
  expect.all({
    options
  }, {
    'options': {
      type: 'object'
    }
  });
  expect.all(config, {
    'web3': {
      type: 'object',
      code: _errors.WEB3_REQUIRED
    },
    'contracts.Pandora.abi': {
      type: 'object',
      code: _errors.CONTRACT_REQUIRED,
      args: ['Pandora']
    },
    'addresses.Pandora': {
      type: 'address',
      code: _errors.ADDRESS_REQUIRED,
      args: ['Pandora']
    }
  });
  const callbacks = {
    onData: () => {},
    onError: () => {}
  };
  const chain = {
    data: (cb = () => {}) => {
      callbacks.onData = cb;
      return chain;
    },
    error: (cb = () => {}) => {
      callbacks.onError = cb;
      return chain;
    }
  };

  (async () => {
    let jobController = localCache.get('jobController');

    if (!jobController) {
      jobController = await fetchJobControllerAddress(config);
    }

    const jctrl = new config.web3.eth.Contract(config.contracts.CognitiveJobController.abi, jobController);
    chain.event = jctrl.events.JobStateChanged(options).on('data', async res => {
      try {
        const jobDetails = await fetchJobDetails(res.returnValues.jobId, config);
        callbacks.onData({
          records: [jobDetails]
        });
      } catch (err) {
        callbacks.onError(err);
      }
    }).on('error', callbacks.onError);
  })();

  return chain;
};

exports.eventJobStateChanged = eventJobStateChanged;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9qb2JzLmpzIl0sIm5hbWVzIjpbImxvY2FsQ2FjaGUiLCJNYXAiLCJmZXRjaEpvYkNvbnRyb2xsZXJBZGRyZXNzIiwiY29uZmlnIiwiZXhwZWN0IiwiYWxsIiwidHlwZSIsImNvZGUiLCJXRUIzX1JFUVVJUkVEIiwiQUREUkVTU19SRVFVSVJFRCIsImFyZ3MiLCJDT05UUkFDVF9SRVFVSVJFRCIsInBhbiIsIndlYjMiLCJldGgiLCJDb250cmFjdCIsImNvbnRyYWN0cyIsIlBhbmRvcmEiLCJhYmkiLCJhZGRyZXNzZXMiLCJqb2JDb250cm9sbGVyIiwibWV0aG9kcyIsImNhbGwiLCJzZXQiLCJmZXRjaEFjdGl2ZUpvYnNDb3VudCIsImdldCIsImpjdHJsIiwiQ29nbml0aXZlSm9iQ29udHJvbGxlciIsImNvdW50IiwiYWN0aXZlSm9ic0NvdW50IiwiTnVtYmVyIiwicGFyc2VJbnQiLCJmZXRjaENvbXBsZXRlZEpvYnNDb3VudCIsImNvbXBsZXRlZEpvYnNDb3VudCIsImZldGNoSm9iRGV0YWlscyIsImFkZHJlc3MiLCJrZXJuZWwiLCJkYXRhc2V0IiwiY29tcGxleGl0eSIsImRlc2NyaXB0aW9uIiwiYWN0aXZlV29ya2VycyIsInByb2dyZXNzIiwic3RhdGUiLCJnZXRDb2duaXRpdmVKb2JEZXRhaWxzIiwia2VybmVsSXBmcyIsImRhdGFzZXRJcGZzIiwiaXBmc1Jlc3VsdHMiLCJQcm9taXNlIiwibWFwIiwiXyIsImluZGV4IiwiZ2V0Q29nbml0aXZlSm9iUmVzdWx0cyIsInV0ZjhkZXNjcmlwdGlvbiIsInV0aWxzIiwiaGV4VG9VdGY4IiwicmVzdWx0IiwiZmlsdGVyIiwicmVzIiwic3Vic3RyIiwiam9iVHlwZSIsImZldGNoSm9ic0lkcyIsInNvdXJjZSIsInZhbHVlcyIsImNvdW50cyIsIkFycmF5Iiwia2V5cyIsImdldEpvYklkIiwiY3JlYXRlIiwiZGVwb3NpdCIsImZyb20iLCJyZXNvbHZlIiwicmVqZWN0IiwiY3JlYXRlQ29nbml0aXZlSm9iIiwidXRmOFRvSGV4Iiwic2VuZCIsInZhbHVlIiwidG9XZWkiLCJTdHJpbmciLCJnYXMiLCJvbiIsInJlY2VpcHQiLCJzdGF0dXMiLCJUUkFOU0FDVElPTl9VTlNVQ0NFU1NGVUwiLCJldmVudHMiLCJDb2duaXRpdmVKb2JRdWV1ZWQiLCJyZXR1cm5WYWx1ZXMiLCJqb2JJZCIsIkNvZ25pdGl2ZUpvYkNyZWF0ZWQiLCJlcnIiLCJmZXRjaEFsbCIsInJlY29yZHMiLCJlcnJvciIsImFjdGl2ZUNvdW50IiwiY29tcGxldGVkQ291bnQiLCJhY3RpdmVKb2JzSWRzIiwiY29tcGxldGVkSm9ic0lkcyIsImFsbEpvYnNJZHMiLCJwdXNoIiwibWVzc2FnZSIsImV2ZW50Q29nbml0aXZlSm9iQ3JlYXRlZCIsIm9wdGlvbnMiLCJjYWxsYmFja3MiLCJvbkRhdGEiLCJvbkVycm9yIiwiY2hhaW4iLCJkYXRhIiwiY2IiLCJldmVudCIsImpvYkRldGFpbHMiLCJldmVudEpvYlN0YXRlQ2hhbmdlZCIsIkpvYlN0YXRlQ2hhbmdlZCJdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7Ozs7O0FBU0E7Ozs7Ozs7QUFFQTs7QUFDQTs7QUFPQTs7QUFJQTs7OztBQUlBLE1BQU1BLGFBQWEsSUFBSUMsR0FBSixFQUFuQjtBQUVBOzs7Ozs7O0FBTU8sTUFBTUMsNEJBQTRCLE9BQU9DLFNBQVMsRUFBaEIsS0FBdUI7QUFFNURDLFNBQU9DLEdBQVAsQ0FBV0YsTUFBWCxFQUFtQjtBQUNmLFlBQVE7QUFDSkcsWUFBTSxRQURGO0FBRUpDLFlBQU1DO0FBRkYsS0FETztBQUtmLHlCQUFxQjtBQUNqQkYsWUFBTSxTQURXO0FBRWpCQyxZQUFNRSx3QkFGVztBQUdqQkMsWUFBTSxDQUFDLFNBQUQ7QUFIVyxLQUxOO0FBVWYsNkJBQXlCO0FBQ3JCSixZQUFNLFFBRGU7QUFFckJDLFlBQU1JLHlCQUZlO0FBR3JCRCxZQUFNLENBQUMsU0FBRDtBQUhlO0FBVlYsR0FBbkI7QUFpQkEsUUFBTUUsTUFBTSxJQUFJVCxPQUFPVSxJQUFQLENBQVlDLEdB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O0FBQ3RCTCxnQkFBVUUsT0FBVixHQUFvQkcsRUFBcEI7QUFDQSxhQUFPRixLQUFQO0FBQ0g7QUFSUyxHQUFkOztBQVdBLEdBQUMsWUFBWTtBQUVULFFBQUlwRixnQkFBZ0JwQixXQUFXeUIsR0FBWCxDQUFlLGVBQWYsQ0FBcEI7O0FBRUEsUUFBSSxDQUFDTCxhQUFMLEVBQW9CO0FBRWhCQSxzQkFBZ0IsTUFBTWxCLDBCQUEwQkMsTUFBMUIsQ0FBdEI7QUFDSDs7QUFFRCxVQUFNdUIsUUFBUSxJQUFJdkIsT0FBT1UsSUFBUCxDQUFZQyxHQUFaLENBQWdCQyxRQUFwQixDQUE2QlosT0FBT2EsU0FBUCxDQUFpQlcsc0JBQWpCLENBQXdDVCxHQUFyRSxFQUEwRUUsYUFBMUUsQ0FBZDtBQUNBb0YsVUFBTUcsS0FBTixHQUFjakYsTUFBTXlELE1BQU4sQ0FBYTJCLGVBQWIsQ0FBNkJWLE9BQTdCLEVBQ1RyQixFQURTLENBQ04sTUFETSxFQUNFLE1BQU10QixHQUFOLElBQWE7QUFFckIsVUFBSTtBQUVBLGNBQU1tRCxhQUFhLE1BQU0xRSxnQkFBZ0J1QixJQUFJNEIsWUFBSixDQUFpQkMsS0FBakMsRUFBd0NuRixNQUF4QyxDQUF6QjtBQUNBa0csa0JBQVVDLE1BQVYsQ0FBaUI7QUFDYlosbUJBQVMsQ0FBQ2tCLFVBQUQ7QUFESSxTQUFqQjtBQUdILE9BTkQsQ0FNRSxPQUFNcEIsR0FBTixFQUFXO0FBQ1RhLGtCQUFVRSxPQUFWLENBQWtCZixHQUFsQjtBQUNIO0FBQ0osS0FaUyxFQWFUVCxFQWJTLENBYU4sT0FiTSxFQWFHc0IsVUFBVUUsT0FiYixDQUFkO0FBY0gsR0F4QkQ7O0FBMEJBLFNBQU9DLEtBQVA7QUFDSCxDQXBFTSIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogQ29nbml0aXZlIEpvYnMgcmVsYXRlZCBtZXRob2RzXG4gKiBUaGlzIGZpbGUgaXQgaXMgYSBwYXJ0IG9mIHRoZSBQYW5kb3JhIFB5cnJoYSBKYXZhc2NyaXB0IGxpYnJhcnlcbiAqIFxuICogQGZpbGUgam9icy5qc1xuICogQGF1dGhvciBLb3N0aWFudHluIFNteXJub3YgPGtvc3R5c2hAZ21haWwuY29tPlxuICogQGRhdGUgMjAxOFxuICovXG5cbid1c2Ugc3RyaWN0JztcblxuaW1wb3J0ICogYXMgZXhwZWN0IGZyb20gJy4vaGVscGVycy9leHBlY3QnO1xuaW1wb3J0IHBqc0Vycm9yLCB7XG4gICAgQ09OVFJBQ1RfUkVRVUlSRUQsXG4gICAgQUREUkVTU19SRVFVSVJFRCxcbiAgICBXRUIzX1JFUVVJUkVELFxuICAgIFRSQU5TQUNUSU9OX1VOU1VDQ0VTU0ZVTFxufSBmcm9tICcuL2hlbHBlcnMvZXJyb3JzJztcblxuaW1wb3J0IHtcbiAgICBmZXRjaElwZnNBZGRyZXNzIGFzIGZldGNoSXBmc0FkZHJlc3NCeUtlcm5lbEFkZHJlc3Ncbn0gZnJvbSAnLi9rZXJuZWxzJztcblxuaW1wb3J0IHtcbiAgICBmZXRjaElwZnNBZGRyZXNzIGFzIGZldGNoSXBmc0FkZHJlc3NCeURhdGFzZXRBZGRyZXNzXG59IGZyb20gJy4vZGF0YXNldHMnO1xuXG5jb25zdCBsb2NhbENhY2hlID0gbmV3IE1hcCgpO1xuXG4vKipcbiAqIEdldCBqb2IgY29udHJvbGxlciBhZGRyZXNzXG4gKiBcbiAqIEBwYXJhbSB7T2JqZWN0fSBjb25maWcgTGlicmFyeSBjb25maWcgKHByb3ZpZGVkIGJ5IHRoZSBwcm94eSBidXQgY2FuIGJlIG92ZXJyaWRkZW4pXG4gKiBAcmV0dXJucyB7UHJvbWlzZTx7U3RyaW5nfT59IFxuICovXG5leHBvcnQgY29uc3QgZmV0Y2hKb2JDb250cm9sbGVyQWRkcmVzcyA9IGFzeW5jIChjb25maWcgPSB7fSkgPT4ge1xuXG4gICAgZXhwZWN0LmFsbChjb25maWcsIHtcbiAgICAgICAgJ3dlYjMnOiB7XG4gICAgICAgICAgICB0eXBlOiAnb2JqZWN0JyxcbiAgICAgICAgICAgIGNvZGU6IFdFQjNfUkVRVUlSRURcbiAgICAgICAgfSxcbiAgICAgICAgJ2FkZHJlc3Nlcy5QYW5kb3JhJzoge1xuICAgICAgICAgICAgdHlwZTogJ2FkZHJlc3MnLFxuICAgICAgICAgICAgY29kZTogQUREUkVTU19SRVFVSVJFRCxcbiAgICAgICAgICAgIGFyZ3M6IFsnUGFuZG9yYSddXG4gICAgICAgIH0sXG4gICAgICAgICdjb250cmFjdHMuUGFuZG9yYS5hYmknOiB7XG4gICAgICAgICAgICB0eXBlOiAnb2JqZWN0JyxcbiAgICAgICAgICAgIGNvZGU6IENPTlRSQUNUX1JFUVVJUkVELFxuICAgICAgICAgICAgYXJnczogWydQYW5kb3JhJ11cbiAgICAgICAgfVxuICAgIH0pO1xuXG4gICAgY29uc3QgcGFuID0gbmV3IGNvbmZpZy53ZWIzLmV0aC5Db250cmFjdChjb25maWcuY29udHJhY3RzLlBhbmRvcmEuYWJpLCBjb25maWcuYWRkcmVzc2VzLlBhbmRvcmEpO1xuICAgIGNvbnN0IGpvYkNvbnRyb2xsZXIgPSBhd2FpdCBwYW4ubWV0aG9kc1xuICAgICAgICAuam9iQ29udHJvbGxlcigpXG4gICAgICAgIC5jYWxsKCk7XG5cbiAgICAvLyBzYXZlIGZvciBsYXRlciB1c2VcbiAgICBsb2NhbENhY2hlLnNldCgnam9iQ29udHJvbGxlcicsIGpvYkNvbnRyb2xsZXIpO1xuICAgICAgICBcbiAgICByZXR1cm4gam9iQ29udHJvbGxlcjtcbn07XG5cbi8qKlxuICogR2V0IGFjdGl2ZSBqb2JzIGNvdW50IFxuICogXG4gKiBAcGFyYW0ge09iamVjdH0gY29uZmlnIExpYnJhcnkgY29uZmlnIChwcm92aWRlZCBieSB0aGUgcHJveHkgYnV0IGNhbiBiZSBvdmVycmlkZGVuKVxuICogQHJldHVybnMge1Byb21pc2U8e051bWJlcn0+fSBcbiAqL1xuZXhwb3J0IGNvbnN0IGZldGNoQWN0aXZlSm9ic0NvdW50ID0gYXN5bmMgKGNvbmZpZyA9IHt9KSA9PiB7XG5cbiAgICBleHBlY3QuYWxsKGNvbmZpZywge1xuICAgICAgICAnd2ViMyc6IHtcbiAgICAgICAgICAgIHR5cGU6ICdvYmplY3QnLFxuICAgICAgICAgICAgY29kZTogV0VCM19SRVFVSVJFRFxuICAgICAgICB9LFxuICAgICAgICAnY29udHJhY3RzLkNvZ25pdGl2ZUpvYkNvbnRyb2xsZXIuYWJpJzoge1xuICAgICAgICAgICAgdHlwZTogJ29iamVjdCcsXG4gICAgICAgICAgICBjb2RlOiBDT05UUkFDVF9SRVFVSVJFRCxcbiAgICAgICAgICAgIGFyZ3M6IFsnQ29nbml0aXZlSm9iQ29udHJvbGxlciddXG4gICAgICAgIH1cbiAgICB9KTtcblxuICAgIGxldCBqb2JDb250cm9sbGVyID0gbG9jYWxDYWNoZS5nZXQoJ2pvYkNvbnRyb2xsZXInKTtcblxuICAgIGlmICgham9iQ29udHJvbGxlcikge1xuXG4gICAgICAgIGpvYkNvbnRyb2xsZXIgPSBhd2FpdCBmZXRjaEpvYkNvbnRyb2xsZXJBZGRyZXNzKGNvbmZpZyk7XG4gICAgfVxuXG4gICAgY29uc3QgamN0cmwgPSBuZXcgY29uZmlnLndlYjMuZXRoLkNvbnRyYWN0KGNvbmZpZy5jb250cmFjdHMuQ29nbml0aXZlSm9iQ29udHJvbGxlci5hYmksIGpvYkNvbnRyb2xsZXIpO1xuICAgIGNvbnN0IGNvdW50ID0gYXdhaXQgamN0cmwubWV0aG9kc1xuICAgICAgICAuYWN0aXZlSm9ic0NvdW50KClcbiAgICAgICAgLmNhbGwoKTtcbiAgICAgICAgXG4gICAgcmV0dXJuIE51bWJlci5wYXJzZUludChjb3VudCwgMTApO1xufTtcblxuLyoqXG4gKiBHZXQgY29tcGxldGVkIGpvYnMgY291bnQgXG4gKiBcbiAqIEBwYXJhbSB7T2JqZWN0fSBjb25maWcgTGlicmFyeSBjb25maWcgKHByb3ZpZGVkIGJ5IHRoZSBwcm94eSBidXQgY2FuIGJlIG92ZXJyaWRkZW4pXG4gKiBAcmV0dXJucyB7UHJvbWlzZTx7TnVtYmVyfT59IFxuICovXG5leHBvcnQgY29uc3QgZmV0Y2hDb21wbGV0ZWRKb2JzQ291bnQgPSBhc3luYyAoY29uZmlnID0ge30pID0+IHtcblxuICAgIGV4cGVjdC5hbGwoY29uZmlnLCB7XG4gICAgICAgICd3ZWIzJzoge1xuICAgICAgICAgICAgdHlwZTogJ29iamVjdCcsXG4gICAgICAgICAgICBjb2RlOiBXRUIzX1JFUVVJUkVEXG4gICAgICAgIH0sXG4gICAgICAgICdjb250cmFjdHMuQ29nbml0aXZlSm9iQ29udHJvbGxlci5hYmknOiB7XG4gICAgICAgICAgICB0eXBlOiAnb2JqZWN0JyxcbiAgICAgICAgICAgIGNvZGU6IENPTlRSQUNUX1JFUVVJUkVELFxuICAgICAgICAgICAgYXJnczogWydDb2duaXRpdmVKb2JDb250cm9sbGVyJ11cbiAgICAgICAgfVxuICAgIH0pO1xuXG4gICAgbGV0IGpvYkNvbnRyb2xsZXIgPSBsb2NhbENhY2hlLmdldCgnam9iQ29udHJvbGxlcicpO1xuXG4gICAgaWYgKCFqb2JDb250cm9sbGVyKSB7XG5cbiAgICAgICAgam9iQ29udHJvbGxlciA9IGF3YWl0IGZldGNoSm9iQ29udHJvbGxlckFkZHJlc3MoY29uZmlnKTtcbiAgICB9XG5cbiAgICBjb25zdCBqY3RybCA9IG5ldyBjb25maWcud2ViMy5ldGguQ29udHJhY3QoY29uZmlnLmNvbnRyYWN0cy5Db2duaXRpdmVKb2JDb250cm9sbGVyLmFiaSwgam9iQ29udHJvbGxlcik7XG4gICAgY29uc3QgY291bnQgPSBhd2FpdCBqY3RybC5tZXRob2RzXG4gICAgICAgIC5jb21wbGV0ZWRKb2JzQ291bnQoKVxuICAgICAgICAuY2FsbCgpO1xuICAgICAgICBcbiAgICByZXR1cm4gTnVtYmVyLnBhcnNlSW50KGNvdW50LCAxMCk7XG59O1xuXG4vKipcbiAqIEdldCBqb2IgZGV0YWlscyBcbiAqIFxuICogQHBhcmFtIHtTdHJpbmd9IGFkZHJlc3MgSm9iIGFkZHJlc3NcbiAqIEBwYXJhbSB7T2JqZWN0fSBjb25maWcgTGlicmFyeSBjb25maWcgKHByb3ZpZGVkIGJ5IHRoZSBwcm94eSBidXQgY2FuIGJlIG92ZXJyaWRkZW4pXG4gKiBAcmV0dXJucyB7UHJvbWlzZTx7TnVtYmVyfT59IFxuICovXG5leHBvcnQgY29uc3QgZmV0Y2hKb2JEZXRhaWxzID0gYXN5bmMgKGFkZHJlc3MsIGNvbmZpZyA9IHt9KSA9PiB7XG5cbiAgICBleHBlY3QuYWxsKGNvbmZpZywge1xuICAgICAgICAnd2ViMyc6IHtcbiAgICAgICAgICAgIHR5cGU6ICdvYmplY3QnLFxuICAgICAgICAgICAgY29kZTogV0VCM19SRVFVSVJFRFxuICAgICAgICB9LFxuICAgICAgICAnY29udHJhY3RzLkNvZ25pdGl2ZUpvYkNvbnRyb2xsZXIuYWJpJzoge1xuICAgICAgICAgICAgdHlwZTogJ29iamVjdCcsXG4gICAgICAgICAgICBjb2RlOiBDT05UUkFDVF9SRVFVSVJFRCxcbiAgICAgICAgICAgIGFyZ3M6IFsnQ29nbml0aXZlSm9iQ29udHJvbGxlciddXG4gICAgICAgIH1cbiAgICB9KTtcblxuICAgIGxldCBqb2JDb250cm9sbGVyID0gbG9jYWxDYWNoZS5nZXQoJ2pvYkNvbnRyb2xsZXInKTtcblxuICAgIGlmICgham9iQ29udHJvbGxlcikge1xuXG4gICAgICAgIGpvYkNvbnRyb2xsZXIgPSBhd2FpdCBmZXRjaEpvYkNvbnRyb2xsZXJBZGRyZXNzKGNvbmZpZyk7XG4gICAgfVxuXG4gICAgY29uc3QgamN0cmwgPSBuZXcgY29uZmlnLndlYjMuZXRoLkNvbnRyYWN0KGNvbmZpZy5jb250cmFjdHMuQ29nbml0aXZlSm9iQ29udHJvbGxlci5hYmksIGpvYkNvbnRyb2xsZXIpO1xuICAgIFxuICAgIGNvbnN0IHsga2VybmVsLCBkYXRhc2V0LCBjb21wbGV4aXR5LCBkZXNjcmlwdGlvbiwgYWN0aXZlV29ya2VycywgcHJvZ3Jlc3MsIHN0YXRlIH0gPSBhd2FpdCBqY3RybC5tZXRob2RzXG4gICAgICAgIC5nZXRDb2duaXRpdmVKb2JEZXRhaWxzKGFkZHJlc3MpXG4gICAgICAgIC5jYWxsKCk7XG4gICAgY29uc3Qga2VybmVsSXBmcyA9IGF3YWl0IGZldGNoSXBmc0FkZHJlc3NCeUtlcm5lbEFkZHJlc3Moa2VybmVsLCBjb25maWcpO1xuICAgIGNvbnN0IGRhdGFzZXRJcGZzID0gYXdhaXQgZmV0Y2hJcGZzQWRkcmVzc0J5RGF0YXNldEFkZHJlc3MoZGF0YXNldCwgY29uZmlnKTtcbiAgICBjb25zdCBpcGZzUmVzdWx0cyA9IGF3YWl0IFByb21pc2UuYWxsKGFjdGl2ZVdvcmtlcnMubWFwKChfLCBpbmRleCkgPT4gamN0cmwubWV0aG9kcy5nZXRDb2duaXRpdmVKb2JSZXN1bHRzKGFkZHJlc3MsIGluZGV4KS5jYWxsKCkpKTtcbiAgICBcbiAgICBjb25zdCB1dGY4ZGVzY3JpcHRpb24gPSBkZXNjcmlwdGlvbiA/IGNvbmZpZy53ZWIzLnV0aWxzLmhleFRvVXRmOChkZXNjcmlwdGlvbikgOiAnJztcblxuICAgIHJldHVybiB7XG4gICAgICAgIGFkZHJlc3MsIFxuICAgICAgICBrZXJuZWwsXG4gICAgICAgIGtlcm5lbElwZnMsXG4gICAgICAgIGRhdGFzZXQsXG4gICAgICAgIGRhdGFzZXRJcGZzLFxuICAgICAgICBhY3RpdmVXb3JrZXJzLFxuICAgICAgICBpcGZzUmVzdWx0czogaXBmc1Jlc3VsdHMubWFwKHJlc3VsdCA9PiByZXN1bHQgPyBjb25maWcud2ViMy51dGlscy5oZXhUb1V0ZjgocmVzdWx0KSA6IHJlc3VsdCkuZmlsdGVyKHJlcyA9PiByZXMpLFxuICAgICAgICBjb21wbGV4aXR5OiBOdW1iZXIoY29tcGxleGl0eSksXG4gICAgICAgIHByb2dyZXNzOiBOdW1iZXIocHJvZ3Jlc3MpLFxuICAgICAgICBzdGF0ZTogTnVtYmVyKHN0YXRlKSxcbiAgICAgICAgZGVzY3JpcHRpb246IHV0ZjhkZXNjcmlwdGlvbi5zdWJzdHIoMiksXG4gICAgICAgIGpvYlR5cGU6IHV0ZjhkZXNjcmlwdGlvbi5zdWJzdHIoMCwgMSlcbiAgICB9O1xufTtcblxuLyoqXG4gKiBHZXQgam9icyBJZCBmcm9tIHRoZSBcInNvdXJjZVwiXG4gKiBcbiAqIEBwYXJhbSB7U3RyaW5nfSBmcm9tIHNvdXJjZSBhY3RpdmVKb2JzIG9yIGNvbXBsZXRlZEpvYnNcbiAqIEBwYXJhbSB7TnVtYmVyfSBjb3VudFxuICogQHBhcmFtIHtPYmplY3R9IG9wdGlvbnNcbiAqIEByZXR1cm5zIHtQcm9taXNlPFt7U3RyaW5nfV0+fSBcbiAqL1xuZXhwb3J0IGNvbnN0IGZldGNoSm9ic0lkcyA9IGFzeW5jIChzb3VyY2UsIGNvdW50ID0gMCwgY29uZmlnID0ge30pID0+IHtcblxuICAgIGV4cGVjdC5hbGwoeyBzb3VyY2UgfSwge1xuICAgICAgICAnc291cmNlJzoge1xuICAgICAgICAgICAgdHlwZTogJ2VudW0nLFxuICAgICAgICAgICAgdmFsdWVzOiBbJ2FjdGl2ZUpvYnMnLCAnY29tcGxldGVkSm9icyddXG4gICAgICAgIH1cbiAgICB9KTtcblxuICAgIGV4cGVjdC5hbGwoY29uZmlnLCB7XG4gICAgICAgICd3ZWIzJzoge1xuICAgICAgICAgICAgdHlwZTogJ29iamVjdCcsXG4gICAgICAgICAgICBjb2RlOiBXRUIzX1JFUVVJUkVEXG4gICAgICAgIH0sXG4gICAgICAgICdjb250cmFjdHMuQ29nbml0aXZlSm9iQ29udHJvbGxlci5hYmknOiB7XG4gICAgICAgICAgICB0eXBlOiAnb2JqZWN0JyxcbiAgICAgICAgICAgIGNvZGU6IENPTlRSQUNUX1JFUVVJUkVELFxuICAgICAgICAgICAgYXJnczogWydDb2duaXRpdmVKb2JDb250cm9sbGVyJ11cbiAgICAgICAgfVxuICAgIH0pOyAgICBcblxuICAgIGxldCBqb2JDb250cm9sbGVyID0gbG9jYWxDYWNoZS5nZXQoJ2pvYkNvbnRyb2xsZXInKTtcblxuICAgIGlmICgham9iQ29udHJvbGxlcikge1xuXG4gICAgICAgIGpvYkNvbnRyb2xsZXIgPSBhd2FpdCBmZXRjaEpvYkNvbnRyb2xsZXJBZGRyZXNzKGNvbmZpZyk7XG4gICAgfVxuXG4gICAgLy8gbnVtYmVycyBzZXF1ZW5jZSBmcm9tIDAgdG8gY291bnRcbiAgICBjb25zdCBjb3VudHMgPSBbLi4uQXJyYXkoY291bnQpLmtleXMoKV07XG5cbiAgICBjb25zdCBqY3RybCA9IG5ldyBjb25maWcud2ViMy5ldGguQ29udHJhY3QoY29uZmlnLmNvbnRyYWN0cy5Db2duaXRpdmVKb2JDb250cm9sbGVyLmFiaSwgam9iQ29udHJvbGxlcik7XG4gICAgY29uc3QgYWRkcmVzc2VzID0gYXdhaXQgUHJvbWlzZS5hbGwoY291bnRzLm1hcChpbmRleCA9PiBqY3RybC5tZXRob2RzLmdldEpvYklkKGluZGV4LCBzb3VyY2UgPT09ICdhY3RpdmVKb2JzJykuY2FsbCgpKSk7XG4gICAgICAgIFxuICAgIHJldHVybiBhZGRyZXNzZXM7XG59O1xuXG4vKipcbiAqIENyZWF0ZSBjb2duaXRpdmUgam9iIGNvbnRyYWN0XG4gKiBcbiAqIEBwYXJhbSB7T2JqZWN0fSBvcHRpb25zXG4gKiBAcGFyYW0ge1N0cmluZ30gZnJvbSBQdWJsaXNoZXIgYWRkcmVzc1xuICogQHBhcmFtIHtPYmplY3R9IGNvbmZpZyBMaWJyYXJ5IGNvbmZpZyAocHJvdmlkZWQgYnkgdGhlIHByb3h5IGJ1dCBjYW4gYmUgb3ZlcnJpZGRlbilcbiAqIEByZXR1cm5zIHtQcm9taXNlfSBQcm9taXNlIG9iamVjdCByZXNvbHZlZCB0byBhZGQgc3RhdHVzIChib29sZWFuKVxuICovXG5leHBvcnQgY29uc3QgY3JlYXRlID0gKHtrZXJuZWwsIGRhdGFzZXQsIGNvbXBsZXhpdHksIGpvYlR5cGUsIGRlc2NyaXB0aW9uLCBkZXBvc2l0fSwgZnJvbSwgY29uZmlnID0ge30pID0+IG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcblxuICAgIGV4cGVjdC5hbGwoeyBrZXJuZWwsIGRhdGFzZXQsIGNvbXBsZXhpdHksIGpvYlR5cGUsIGRlc2NyaXB0aW9uLCBkZXBvc2l0LCBmcm9tIH0sIHtcbiAgICAgICAgJ2tlcm5lbCc6IHtcbiAgICAgICAgICAgIHR5cGU6ICdhZGRyZXNzJ1xuICAgICAgICB9LFxuICAgICAgICAnZGF0YXNldCc6IHtcbiAgICAgICAgICAgIHR5cGU6ICdhZGRyZXNzJ1xuICAgICAgICB9LFxuICAgICAgICAnY29tcGxleGl0eSc6IHtcbiAgICAgICAgICAgIHR5cGU6ICdudW1iZXInXG4gICAgICAgIH0sXG4gICAgICAgICdqb2JUeXBlJzoge1xuICAgICAgICAgICAgdHlwZTogJ3N0cmluZydcbiAgICAgICAgfSxcbiAgICAgICAgJ2Rlc2NyaXB0aW9uJzoge1xuICAgICAgICAgICAgdHlwZTogJ3N0cmluZydcbiAgICAgICAgfSxcbiAgICAgICAgJ2RlcG9zaXQnOiB7XG4gICAgICAgICAgICB0eXBlOiAnbnVtYmVyJ1xuICAgICAgICB9LFxuICAgICAgICAnZnJvbSc6IHtcbiAgICAgICAgICAgIHR5cGU6ICdhZGRyZXNzJ1xuICAgICAgICB9XG4gICAgfSk7XG5cbiAgICBleHBlY3QuYWxsKGNvbmZpZywge1xuICAgICAgICAnd2ViMyc6IHtcbiAgICAgICAgICAgIHR5cGU6ICdvYmplY3QnLFxuICAgICAgICAgICAgY29kZTogV0VCM19SRVFVSVJFRFxuICAgICAgICB9LFxuICAgICAgICAnY29udHJhY3RzLlBhbmRvcmEuYWJpJzoge1xuICAgICAgICAgICAgdHlwZTogJ29iamVjdCcsXG4gICAgICAgICAgICBjb2RlOiBDT05UUkFDVF9SRVFVSVJFRCxcbiAgICAgICAgICAgIGFyZ3M6IFsnUGFuZG9yYSddXG4gICAgICAgIH0sXG4gICAgICAgICdhZGRyZXNzZXMuUGFuZG9yYSc6IHtcbiAgICAgICAgICAgIHR5cGU6ICdhZGRyZXNzJyxcbiAgICAgICAgICAgIGNvZGU6IEFERFJFU1NfUkVRVUlSRUQsXG4gICAgICAgICAgICBhcmdzOiBbJ1BhbmRvcmEnXVxuICAgICAgICB9XG4gICAgfSk7XG5cbiAgICBjb25zdCBwYW4gPSBuZXcgY29uZmlnLndlYjMuZXRoLkNvbnRyYWN0KGNvbmZpZy5jb250cmFjdHMuUGFuZG9yYS5hYmksIGNvbmZpZy5hZGRyZXNzZXMuUGFuZG9yYSk7XG4gICAgcGFuLm1ldGhvZHNcbiAgICAgICAgLmNyZWF0ZUNvZ25pdGl2ZUpvYihrZXJuZWwsIGRhdGFzZXQsIGNvbXBsZXhpdHksIGNvbmZpZy53ZWIzLnV0aWxzLnV0ZjhUb0hleChgJHtqb2JUeXBlfTske2Rlc2NyaXB0aW9ufWApKVxuICAgICAgICAuc2VuZCh7XG4gICAgICAgICAgICB2YWx1ZTogY29uZmlnLndlYjMudXRpbHMudG9XZWkoU3RyaW5nKGRlcG9zaXQpKSxcbiAgICAgICAgICAgIGZyb20sXG4gICAgICAgICAgICBnYXM6IDY3MDAwMDAvLyBiZWNhdXNlIHRoaXMgd29ya2Zsb3cgaXMgdG9vIGdyZWVkeVxuICAgICAgICB9KVxuICAgICAgICAub24oJ2Vycm9yJywgcmVqZWN0KVxuICAgICAgICAub24oJ3JlY2VpcHQnLCByZWNlaXB0ID0+IHtcblxuICAgICAgICAgICAgdHJ5IHtcblxuICAgICAgICAgICAgICAgIGlmIChOdW1iZXIocmVjZWlwdC5zdGF0dXMpID09PSAwKSB7XG5cbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHJlamVjdChwanNFcnJvcihUUkFOU0FDVElPTl9VTlNVQ0NFU1NGVUwpKTtcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICBpZiAocmVjZWlwdC5ldmVudHMuQ29nbml0aXZlSm9iUXVldWVkKSB7XG4gICAgXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiByZXNvbHZlKHJlY2VpcHQuZXZlbnRzLkNvZ25pdGl2ZUpvYlF1ZXVlZC5yZXR1cm5WYWx1ZXMuam9iSWQpO1xuICAgICAgICAgICAgICAgIH1cbiAgICBcbiAgICAgICAgICAgICAgICByZXNvbHZlKHJlY2VpcHQuZXZlbnRzLkNvZ25pdGl2ZUpvYkNyZWF0ZWQucmV0dXJuVmFsdWVzLmpvYklkKTtcbiAgICAgICAgICAgIH0gY2F0Y2ggKGVycikge1xuICAgICAgICAgICAgICAgIHJlamVjdChlcnIpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbn0pO1xuXG4vKipcbiAqIEdldCBhbGwgam9ic1xuICogXG4gKiBAcGFyYW0ge09iamVjdH0gY29uZmlnIExpYnJhcnkgY29uZmlnIChwcm92aWRlZCBieSB0aGUgcHJveHkgYnV0IGNhbiBiZSBvdmVycmlkZGVuKVxuICogQHJldHVybnMge1Byb21pc2V9IEEgUHJvbWlzZSBvYmplY3QgcmVwcmVzZW50cyB0aGUge09iamVjdFtdfSBcbiAqL1xuZXhwb3J0IGNvbnN0IGZldGNoQWxsID0gYXN5bmMgKGNvbmZpZyA9IHt9KSA9PiB7XG4gICAgbGV0IHJlY29yZHMgPSBbXTtcbiAgICBsZXQgZXJyb3IgPSBbXTtcblxuICAgIHRyeSB7XG5cbiAgICAgICAgY29uc3QgW1xuICAgICAgICAgICAgYWN0aXZlQ291bnQsXG4gICAgICAgICAgICBjb21wbGV0ZWRDb3VudFxuICAgICAgICBdID0gYXdhaXQgUHJvbWlzZS5hbGwoW1xuICAgICAgICAgICAgZmV0Y2hBY3RpdmVKb2JzQ291bnQoY29uZmlnKSxcbiAgICAgICAgICAgIGZldGNoQ29tcGxldGVkSm9ic0NvdW50KGNvbmZpZylcbiAgICAgICAgXSk7XG5cbiAgICAgICAgY29uc3QgW1xuICAgICAgICAgICAgYWN0aXZlSm9ic0lkcyxcbiAgICAgICAgICAgIGNvbXBsZXRlZEpvYnNJZHNcbiAgICAgICAgXSA9IGF3YWl0IFByb21pc2UuYWxsKFtcbiAgICAgICAgICAgIGZldGNoSm9ic0lkcygnYWN0aXZlSm9icycsIGFjdGl2ZUNvdW50LCBjb25maWcpLFxuICAgICAgICAgICAgZmV0Y2hKb2JzSWRzKCdjb21wbGV0ZWRKb2JzJywgY29tcGxldGVkQ291bnQsIGNvbmZpZylcbiAgICAgICAgXSk7XG5cbiAgICAgICAgY29uc3QgYWxsSm9ic0lkcyA9IFtcbiAgICAgICAgICAgIC4uLmFjdGl2ZUpvYnNJZHMsXG4gICAgICAgICAgICAuLi5jb21wbGV0ZWRKb2JzSWRzXG4gICAgICAgIF07XG5cbiAgICAgICAgcmVjb3JkcyA9IGF3YWl0IFByb21pc2UuYWxsKGFsbEpvYnNJZHMubWFwKGpvYklkID0+IGZldGNoSm9iRGV0YWlscyhqb2JJZCwgY29uZmlnKSkpO1xuICAgICAgICBcbiAgICB9IGNhdGNoKGVycikge1xuICAgICAgICBlcnJvci5wdXNoKHtcbiAgICAgICAgICAgIGVycm9yOiBlcnIubWVzc2FnZVxuICAgICAgICB9KTtcbiAgICB9ICAgXG5cbiAgICByZXR1cm4ge1xuICAgICAgICByZWNvcmRzLFxuICAgICAgICBlcnJvclxuICAgIH07XG59O1xuXG4vKipcbiAqIEhhbmRsZSBldmVudCBDb2duaXRpdmVKb2JDcmVhdGVkXG4gKiBcbiAqIEBwYXJhbSB7T2JqZWN0fSBvcHRpb25zIEV2ZW50IGhhbmRsZXIgb3B0aW9uc1xuICogQHBhcmFtIHtPYmplY3R9IGNvbmZpZyBMaWJyYXJ5IGNvbmZpZyAocHJvdmlkZWQgYnkgdGhlIHByb3h5IGJ1dCBjYW4gYmUgb3ZlcnJpZGRlbilcbiAqIEByZXR1cm5zIHtPYmplY3R9IE9iamVjdCB3aXRoIGNoYWluZWQgY2FsbGJhY2tzICNkYXRhIGFuZCAjZXJyb3JcbiAqL1xuZXhwb3J0IGNvbnN0IGV2ZW50Q29nbml0aXZlSm9iQ3JlYXRlZCA9IChvcHRpb25zID0ge30sIGNvbmZpZyA9IHt9KSA9PiB7XG5cbiAgICBleHBlY3QuYWxsKHsgb3B0aW9ucyB9LCB7XG4gICAgICAgICdvcHRpb25zJzoge1xuICAgICAgICAgICAgdHlwZTogJ29iamVjdCdcbiAgICAgICAgfVxuICAgIH0pO1xuXG4gICAgZXhwZWN0LmFsbChjb25maWcsIHtcbiAgICAgICAgJ3dlYjMnOiB7XG4gICAgICAgICAgICB0eXBlOiAnb2JqZWN0JyxcbiAgICAgICAgICAgIGNvZGU6IFdFQjNfUkVRVUlSRURcbiAgICAgICAgfSxcbiAgICAgICAgJ2NvbnRyYWN0cy5QYW5kb3JhLmFiaSc6IHtcbiAgICAgICAgICAgIHR5cGU6ICdvYmplY3QnLFxuICAgICAgICAgICAgY29kZTogQ09OVFJBQ1RfUkVRVUlSRUQsXG4gICAgICAgICAgICBhcmdzOiBbJ1BhbmRvcmEnXVxuICAgICAgICB9LFxuICAgICAgICAnYWRkcmVzc2VzLlBhbmRvcmEnOiB7XG4gICAgICAgICAgICB0eXBlOiAnYWRkcmVzcycsXG4gICAgICAgICAgICBjb2RlOiBBRERSRVNTX1JFUVVJUkVELFxuICAgICAgICAgICAgYXJnczogWydQYW5kb3JhJ11cbiAgICAgICAgfVxuICAgIH0pO1xuXG4gICAgY29uc3QgY2FsbGJhY2tzID0ge1xuICAgICAgICBvbkRhdGE6ICgpID0+IHt9LFxuICAgICAgICBvbkVycm9yOiAoKSA9PiB7fVxuICAgIH07XG5cbiAgICBjb25zdCBjaGFpbiA9IHtcbiAgICAgICAgZGF0YTogKGNiID0gKCkgPT4ge30pID0+IHtcbiAgICAgICAgICAgIGNhbGxiYWNrcy5vbkRhdGEgPSBjYjtcbiAgICAgICAgICAgIHJldHVybiBjaGFpbjtcbiAgICAgICAgfSxcbiAgICAgICAgZXJyb3I6IChjYiA9ICgpID0+IHt9KSA9PiB7XG4gICAgICAgICAgICBjYWxsYmFja3Mub25FcnJvciA9IGNiO1xuICAgICAgICAgICAgcmV0dXJuIGNoYWluO1xuICAgICAgICB9XG4gICAgfTtcblxuICAgIGNvbnN0IHBhbiA9IG5ldyBjb25maWcud2ViMy5ldGguQ29udHJhY3QoY29uZmlnLmNvbnRyYWN0cy5QYW5kb3JhLmFiaSwgY29uZmlnLmFkZHJlc3Nlcy5QYW5kb3JhKTtcbiAgICBjaGFpbi5ldmVudCA9IHBhbi5ldmVudHMuQ29nbml0aXZlSm9iQ3JlYXRlZChvcHRpb25zKVxuICAgICAgICAub24oJ2RhdGEnLCBhc3luYyByZXMgPT4ge1xuXG4gICAgICAgICAgICB0cnkge1xuXG4gICAgICAgICAgICAgICAgY29uc3Qgam9iRGV0YWlscyA9IGF3YWl0IGZldGNoSm9iRGV0YWlscyhyZXMucmV0dXJuVmFsdWVzLmpvYklkLCBjb25maWcpO1xuICAgICAgICAgICAgICAgIGNhbGxiYWNrcy5vbkRhdGEoe1xuICAgICAgICAgICAgICAgICAgICByZWNvcmRzOiBbam9iRGV0YWlsc11cbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH0gY2F0Y2goZXJyKSB7XG4gICAgICAgICAgICAgICAgY2FsbGJhY2tzLm9uRXJyb3IoZXJyKTtcbiAgICAgICAgICAgIH0gICAgICAgICAgICBcbiAgICAgICAgfSlcbiAgICAgICAgLm9uKCdlcnJvcicsIGNhbGxiYWNrcy5vbkVycm9yKTtcblxuICAgIHJldHVybiBjaGFpbjtcbn07XG5cbi8qKlxuICogSGFuZGxlIGV2ZW50IEpvYlN0YXRlQ2hhbmdlZFxuICogXG4gKiBAcGFyYW0ge09iamVjdH0gb3B0aW9ucyBFdmVudCBoYW5kbGVyIG9wdGlvbnNcbiAqIEBwYXJhbSB7T2JqZWN0fSBjb25maWcgTGlicmFyeSBjb25maWcgKHByb3ZpZGVkIGJ5IHRoZSBwcm94eSBidXQgY2FuIGJlIG92ZXJyaWRkZW4pXG4gKiBAcmV0dXJucyB7T2JqZWN0fSBPYmplY3Qgd2l0aCBjaGFpbmVkIGNhbGxiYWNrcyAjZGF0YSBhbmQgI2Vycm9yXG4gKi9cbmV4cG9ydCBjb25zdCBldmVudEpvYlN0YXRlQ2hhbmdlZCA9IChvcHRpb25zID0ge30sIGNvbmZpZyA9IHt9KSA9PiB7XG5cbiAgICBleHBlY3QuYWxsKHsgb3B0aW9ucyB9LCB7XG4gICAgICAgICdvcHRpb25zJzoge1xuICAgICAgICAgICAgdHlwZTogJ29iamVjdCdcbiAgICAgICAgfVxuICAgIH0pO1xuXG4gICAgZXhwZWN0LmFsbChjb25maWcsIHtcbiAgICAgICAgJ3dlYjMnOiB7XG4gICAgICAgICAgICB0eXBlOiAnb2JqZWN0JyxcbiAgICAgICAgICAgIGNvZGU6IFdFQjNfUkVRVUlSRURcbiAgICAgICAgfSxcbiAgICAgICAgJ2NvbnRyYWN0cy5QYW5kb3JhLmFiaSc6IHtcbiAgICAgICAgICAgIHR5cGU6ICdvYmplY3QnLFxuICAgICAgICAgICAgY29kZTogQ09OVFJBQ1RfUkVRVUlSRUQsXG4gICAgICAgICAgICBhcmdzOiBbJ1BhbmRvcmEnXVxuICAgICAgICB9LFxuICAgICAgICAnYWRkcmVzc2VzLlBhbmRvcmEnOiB7XG4gICAgICAgICAgICB0eXBlOiAnYWRkcmVzcycsXG4gICAgICAgICAgICBjb2RlOiBBRERSRVNTX1JFUVVJUkVELFxuICAgICAgICAgICAgYXJnczogWydQYW5kb3JhJ11cbiAgICAgICAgfVxuICAgIH0pO1xuXG4gICAgY29uc3QgY2FsbGJhY2tzID0ge1xuICAgICAgICBvbkRhdGE6ICgpID0+IHt9LFxuICAgICAgICBvbkVycm9yOiAoKSA9PiB7fVxuICAgIH07XG5cbiAgICBjb25zdCBjaGFpbiA9IHtcbiAgICAgICAgZGF0YTogKGNiID0gKCkgPT4ge30pID0+IHtcbiAgICAgICAgICAgIGNhbGxiYWNrcy5vbkRhdGEgPSBjYjtcbiAgICAgICAgICAgIHJldHVybiBjaGFpbjtcbiAgICAgICAgfSxcbiAgICAgICAgZXJyb3I6IChjYiA9ICgpID0+IHt9KSA9PiB7XG4gICAgICAgICAgICBjYWxsYmFja3Mub25FcnJvciA9IGNiO1xuICAgICAgICAgICAgcmV0dXJuIGNoYWluO1xuICAgICAgICB9XG4gICAgfTtcblxuICAgIChhc3luYyAoKSA9PiB7XG4gICAgICAgIFxuICAgICAgICBsZXQgam9iQ29udHJvbGxlciA9IGxvY2FsQ2FjaGUuZ2V0KCdqb2JDb250cm9sbGVyJyk7XG5cbiAgICAgICAgaWYgKCFqb2JDb250cm9sbGVyKSB7XG5cbiAgICAgICAgICAgIGpvYkNvbnRyb2xsZXIgPSBhd2FpdCBmZXRjaEpvYkNvbnRyb2xsZXJBZGRyZXNzKGNvbmZpZyk7XG4gICAgICAgIH1cblxuICAgICAgICBjb25zdCBqY3RybCA9IG5ldyBjb25maWcud2ViMy5ldGguQ29udHJhY3QoY29uZmlnLmNvbnRyYWN0cy5Db2duaXRpdmVKb2JDb250cm9sbGVyLmFiaSwgam9iQ29udHJvbGxlcik7XG4gICAgICAgIGNoYWluLmV2ZW50ID0gamN0cmwuZXZlbnRzLkpvYlN0YXRlQ2hhbmdlZChvcHRpb25zKVxuICAgICAgICAgICAgLm9uKCdkYXRhJywgYXN5bmMgcmVzID0+IHtcblxuICAgICAgICAgICAgICAgIHRyeSB7XG5cbiAgICAgICAgICAgICAgICAgICAgY29uc3Qgam9iRGV0YWlscyA9IGF3YWl0IGZldGNoSm9iRGV0YWlscyhyZXMucmV0dXJuVmFsdWVzLmpvYklkLCBjb25maWcpO1xuICAgICAgICAgICAgICAgICAgICBjYWxsYmFja3Mub25EYXRhKHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJlY29yZHM6IFtqb2JEZXRhaWxzXVxuICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICB9IGNhdGNoKGVycikge1xuICAgICAgICAgICAgICAgICAgICBjYWxsYmFja3Mub25FcnJvcihlcnIpO1xuICAgICAgICAgICAgICAgIH0gICAgICAgICAgICBcbiAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAub24oJ2Vycm9yJywgY2FsbGJhY2tzLm9uRXJyb3IpO1xuICAgIH0pKCk7XG5cbiAgICByZXR1cm4gY2hhaW47XG59O1xuIl19