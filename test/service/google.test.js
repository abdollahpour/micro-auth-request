const service = require('../../src/service/google');

describe('google service', () => {
    describe('getAuthUrl', () => {
        describe('when pass url', () => {
            it('should get google redirect url', async () => {
                expect(service.getAuthUrl('http://localhost/sample/path').startsWith('https://accounts.google.com/o/oauth2/v2/auth?')).toBe(true);
            });
        });
    });
});