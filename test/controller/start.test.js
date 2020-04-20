const controller = require('../../src/controller/start');
const http_mocks = require('node-mocks-http');

const buildResponse =  () =>
    http_mocks.createResponse({eventEmitter: require('events').EventEmitter});

describe('start controller', () => {
    it('302', (done) => {
        var response = buildResponse()
        var request  = http_mocks.createRequest({
            method: 'GET',
            url: '/monitor',
        });
        // Middleware
        request.oauth = {
            getAuthUrl: () => 'http://sample.com'
        };
    
        response.on('end', () => {
            if (response.statusCode === 302 && response._getHeaders().location === 'http://sample.com') {
                done();
            }
        });
    
        controller(request, response);
    })
});