import { expect } from 'chai';
import {
    OPTIONS_REQUIRED,
    WEB3_REQUIRED,
    WEB3_NOT_CONNECTED,
    CONTRACT_REQUIRED,
    ADDRESS_REQUIRED,
    IPFS_REQUIRED,
    IPFS_NOT_CONNECTED,
    WEB3_METAMASK_REQUIRED
} from '../../dist/helpers/errors';
import errorHelper from '../../dist/helpers/errors';

describe('Helper #errors tests:', () => {

    it('Module should expose a function as default value', () => {
        expect(errorHelper).to.be.a('function');
    });

    it('Module should expose a bunch of error codes', () => {
        expect(OPTIONS_REQUIRED).to.be.equal('OPTIONS_REQUIRED');
        expect(WEB3_REQUIRED).to.be.equal('WEB3_REQUIRED');
        expect(WEB3_NOT_CONNECTED).to.be.equal('WEB3_NOT_CONNECTED');
        expect(CONTRACT_REQUIRED).to.be.equal('CONTRACT_REQUIRED');
        expect(ADDRESS_REQUIRED).to.be.equal('ADDRESS_REQUIRED');
        expect(IPFS_REQUIRED).to.be.equal('IPFS_REQUIRED');
        expect(IPFS_NOT_CONNECTED).to.be.equal('IPFS_NOT_CONNECTED');
        expect(WEB3_METAMASK_REQUIRED).to.be.equal('WEB3_METAMASK_REQUIRED');
    });

    it('errorHelper should return an appropriate Error instance', () => {
        let err = errorHelper(OPTIONS_REQUIRED);
        expect(err).to.be.an.instanceof(Error);
        expect(err.code).to.be.equal(OPTIONS_REQUIRED);
    });

    it('errorHelper should return an Error with appropriate code', () => {
        let errs = {
            OPTIONS_REQUIRED: errorHelper(OPTIONS_REQUIRED),
            WEB3_REQUIRED: errorHelper(WEB3_REQUIRED),
            WEB3_NOT_CONNECTED: errorHelper(WEB3_NOT_CONNECTED),
            CONTRACT_REQUIRED: errorHelper(CONTRACT_REQUIRED),
            ADDRESS_REQUIRED: errorHelper(ADDRESS_REQUIRED),
            IPFS_REQUIRED: errorHelper(IPFS_REQUIRED),
            IPFS_NOT_CONNECTED: errorHelper(IPFS_NOT_CONNECTED),
            WEB3_METAMASK_REQUIRED: errorHelper(WEB3_METAMASK_REQUIRED)
        };
        
        expect(errs.OPTIONS_REQUIRED).to.have.property('code', OPTIONS_REQUIRED);
        expect(errs.WEB3_REQUIRED).to.have.property('code', WEB3_REQUIRED);
        expect(errs.WEB3_NOT_CONNECTED).to.have.property('code', WEB3_NOT_CONNECTED);
        expect(errs.CONTRACT_REQUIRED).to.have.property('code', CONTRACT_REQUIRED);
        expect(errs.ADDRESS_REQUIRED).to.have.property('code', ADDRESS_REQUIRED);
        expect(errs.IPFS_REQUIRED).to.have.property('code', IPFS_REQUIRED);
        expect(errs.IPFS_NOT_CONNECTED).to.have.property('code', IPFS_NOT_CONNECTED);
        expect(errs.WEB3_METAMASK_REQUIRED).to.have.property('code', WEB3_METAMASK_REQUIRED);
    });
});
