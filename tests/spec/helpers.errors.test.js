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
});
