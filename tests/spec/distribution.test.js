'use strict';

const { expect } = require('chai');
const Pjs = require('../../src');
const PjsDist = require('../../dist');

describe('Distribution tests:', () => {

    it('Dist version should be equal to current source version', () => {
        expect(Pjs.version).to.be.equal(PjsDist.version);
    });
});
