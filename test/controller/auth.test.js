const controller = require('../../src/controller/auth');
const http_mocks = require('node-mocks-http');

const buildResponse =  () =>
    http_mocks.createResponse({eventEmitter: require('events').EventEmitter});

describe('Auth controller', () => {
    it('200', (done) => {
        var response = buildResponse()
        var request  = http_mocks.createRequest({
            method: 'GET',
            url: '/monitor',
        });
    
        response.on('end', () => {
            if (response.statusCode === 401) {
                done();
            }
        });
    
        controller(request, response);
    })
});