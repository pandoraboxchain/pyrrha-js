'use strict';

const { expect } = require('chai');
const codes = require('../../src/helpers/errors');
const errorHelper = require('../../src/helpers/errors').default;


describe('Helper #errors tests:', () => {

    it('Module should expose a function as default value', () => {
        expect(errorHelper).to.be.a('function');
    });

    it('Module should expose a bunch of error codes', () => {
        expect(codes.OPTIONS_REQUIRED).to.be.equal('OPTIONS_REQUIRED');
        expect(codes.WEB3_REQUIRED).to.be.equal('WEB3_REQUIRED');
        expect(codes.WEB3_NOT_CONNECTED).to.be.equal('WEB3_NOT_CONNECTED');
        expect(codes.CONTRACT_REQUIRED).to.be.equal('CONTRACT_REQUIRED');
        expect(codes.ADDRESS_REQUIRED).to.be.equal('ADDRESS_REQUIRED');
        expect(codes.IPFS_REQUIRED).to.be.equal('IPFS_REQUIRED');
        expect(codes.IPFS_NOT_CONNECTED).to.be.equal('IPFS_NOT_CONNECTED');
        expect(codes.WEB3_METAMASK_REQUIRED).to.be.equal('WEB3_METAMASK_REQUIRED');
    });

    it('errorHelper should return an appropriate Error instance', () => {
        let err = errorHelper(codes.OPTIONS_REQUIRED);
        expect(err).to.be.an.instanceof(Error);
        expect(err.code).to.be.equal(codes.OPTIONS_REQUIRED);
    });

    it('errorHelper should return an Error with appropriate code', () => {
        let errs = {
            OPTIONS_REQUIRED: errorHelper(codes.OPTIONS_REQUIRED),
            WEB3_REQUIRED: errorHelper(codes.WEB3_REQUIRED),
            WEB3_NOT_CONNECTED: errorHelper(codes.WEB3_NOT_CONNECTED),
            CONTRACT_REQUIRED: errorHelper(codes.CONTRACT_REQUIRED),
            ADDRESS_REQUIRED: errorHelper(codes.ADDRESS_REQUIRED),
            IPFS_REQUIRED: errorHelper(codes.IPFS_REQUIRED),
            IPFS_NOT_CONNECTED: errorHelper(codes.IPFS_NOT_CONNECTED),
            WEB3_METAMASK_REQUIRED: errorHelper(codes.WEB3_METAMASK_REQUIRED)
        };
        
        expect(errs.OPTIONS_REQUIRED).to.have.property('code', codes.OPTIONS_REQUIRED);
        expect(errs.WEB3_REQUIRED).to.have.property('code', codes.WEB3_REQUIRED);
        expect(errs.WEB3_NOT_CONNECTED).to.have.property('code', codes.WEB3_NOT_CONNECTED);
        expect(errs.CONTRACT_REQUIRED).to.have.property('code', codes.CONTRACT_REQUIRED);
        expect(errs.ADDRESS_REQUIRED).to.have.property('code', codes.ADDRESS_REQUIRED);
        expect(errs.IPFS_REQUIRED).to.have.property('code', codes.IPFS_REQUIRED);
        expect(errs.IPFS_NOT_CONNECTED).to.have.property('code', codes.IPFS_NOT_CONNECTED);
        expect(errs.WEB3_METAMASK_REQUIRED).to.have.property('code', codes.WEB3_METAMASK_REQUIRED);
    });
});
