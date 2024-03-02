const request = require('supertest');
const expect = require('chai').expect;
const baseConf = require('../config/base.config.json');

describe('GET API tests for bank-holidays', () => {

    it('verify that request should be successfully sent', (done) => {
        request(baseConf.baseUrl)
            .get('/bank-holidays.json')
            .redirects(1)
            .end(function (err, res) {
                expect(res.statusCode).to.be.equal(200);
                done();
            });
    });

    it('Verify that response should be not epmty', (done) => {
        request(baseConf.baseUrl)
            .get('/bank-holidays.json')
            .redirects(1)
            .end(function (err, res) {
                Object.keys(res.body).forEach((devision) => {
                    expect(res.body[devision].events).to.not.be.empty;
                });
                done();
            });
    });

    it('Verify that each devision have first event new year', (done) => {
        request(baseConf.baseUrl)
            .get('/bank-holidays.json')
            .redirects(1)
            .end(function (err, res) {
                for (const node in res.body) {
                    expect(res.body[node].events[0].title).to.equal("New Year’s Day");
                }
                done();
            });
    });

    it('Verify that all devisons are present', (done) => {
        request(baseConf.baseUrl)
            .get('/bank-holidays.json')
            .redirects(1)
            .end(function (err, res) {
                expect(Object.keys(res.body)).to.include("england-and-wales", "scotland", "northern-ireland");
                done();
            });
    });

});