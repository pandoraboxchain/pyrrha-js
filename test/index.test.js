var assert = require('assert');
const Pjs = require('../src');

describe('Core tests', () => {

    describe('Pjs', () => {

        it('Should be constructor', function () {
            assert.equal(typeof Pjs.constructor, 'function');
        });
    });
});
