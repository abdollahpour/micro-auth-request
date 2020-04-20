const middleware = require('../../src/middleware/jwt');
const jwt = require('../../src/service/jwt');
const http_mocks = require('node-mocks-http');

const buildResponse =  () =>
    http_mocks.createResponse({eventEmitter: require('events').EventEmitter});

describe('jwt middleware', () => {
    it('without cookie', (done) => {
        const response = buildResponse()
        const request  = http_mocks.createRequest({
            method: 'GET',
            url: '/test',
        });

        const next = () => {
            done();
        };
    
        middleware(request, response, next);
    });

    it('with cookie, get 200', (done) => {
        const object = {key1: 'value1', key2: 'value', email: 'me@domain.com'};
        const response = buildResponse()
        const request  = http_mocks.createRequest({
            method: 'GET',
            url: '/test',
            cookies: {jwt: jwt.sign(object)},
        });

        const next = () => {
            done('Should not pass');
        };

        response.on('end', () => {
            expect(response.statusCode).toBe(200);
            expect(response._headers['x-auth-request-email']).toBe('me@domain.com');
            expect(Object.fromEntries(new URLSearchParams(response._headers['x-auth-request-user']))).toMatchObject(object);
            done();
        });
    
        middleware(request, response, next);
    });
});