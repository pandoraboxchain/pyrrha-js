import { expect } from 'chai';
import * as expectHelper from '../../dist/helpers/expect';
import * as errorsHelper from '../../dist/helpers/errors';

describe('Helper #expect tests:', () => {

    it('Module should expose method "all" as a function', () => {
        expect(expectHelper.all).to.be.a('function');
    });

    it('#all should throw a Error({code: OPTIONS_REQUIRED}) if no options was specified', () => {
        let testAllHelper = () => {
            expectHelper.all(undefined, {
                'key1': {
                    type: 'string'
                }
            });
        };

        expect(testAllHelper).to.throw(Error).with.property('code', errorsHelper.OPTIONS_REQUIRED);
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