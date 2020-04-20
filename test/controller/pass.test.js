const controller = require('../../src/controller/pass');
const http_mocks = require('node-mocks-http');

const buildResponse =  () =>
    http_mocks.createResponse({eventEmitter: require('events').EventEmitter});

describe('Pass controller', () => {
    it('200', (done) => {
        var response = buildResponse()
        var request  = http_mocks.createRequest({
            method: 'GET',
            url: '/pass',
        });
    
        response.on('end', () => {
            if (response.statusCode === 200) {
                done();
            }
        });
    
        controller(request, response);
    })
});