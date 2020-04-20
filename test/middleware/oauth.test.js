const middleware = require('../../src/middleware/oauth');
const http_mocks = require('node-mocks-http');

const buildResponse =  () =>
    http_mocks.createResponse({eventEmitter: require('events').EventEmitter});

describe('oauth middleware', () => {

    it('with cookie, get 200', (done) => {
        const response = buildResponse()
        const request  = http_mocks.createRequest({
            method: 'GET',
            url: '/test'
        });

        response.on('end', () => {
            expect(response.oauth).not.toBeUndefined();
        });

        const next = () => {
            done();
        };
    
        middleware(request, response, next);
    });
});