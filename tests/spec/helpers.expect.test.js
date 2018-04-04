'use strict';

const { expect } = require('chai');
const expectHelper = require('../../src/helpers/expect');

describe('Helper #expect tests:', () => {

    it('Module should expose method "all" as a function', () => {
        expect(expectHelper.all).to.be.a('function');
    });

    it('#all should validate options keys existance by model', () => {
        let options = {
            key1: 'value1',
            key2: true,
            key3: {
                deepKey: 'value2'
            }
        };

        let testAllHelper = () => {
            expectHelper.all(options, {
                'key1': {
                    type: 'string'
                },
                'key2': {
                    type: 'boolean'
                },
                'key3.deepKey': {
                    type: 'string'
                }
            });
        };

        expect(testAllHelper).to.not.throw(Error);
    });

    it('#all should throw an Error if key not exist in the options', () => {
        let options = {
            key1: 'value1'
        };

        let testAllHelper = () => {
            expectHelper.all(options, {
                'key1': {
                    type: 'string'
                },
                'key2': {
                    type: 'boolean'
                }
            });
        };

        expect(testAllHelper).to.throw(Error);
    });

    it('#all should throw an Error if key in the options has a wrong type', () => {
        let options = {
            key1: 'value1'
        };

        let testAllHelper = () => {
            expectHelper.all(options, {
                'key1': {
                    type: 'boolean'
                }
            });
        };

        expect(testAllHelper).to.throw(Error);
    });
});