import { expect } from 'chai';
import Pjs from '../../dist';
import { version } from '../../dist/package.json';

describe('Distribution tests:', () => {

    it('Dist version should be equal to current source version', () => {
        expect(Pjs.version).to.be.equal(version);
    });
});
