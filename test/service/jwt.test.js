const jwt = require('../../src/service/jwt');

describe('jwt service', () => {
    it('sign and verify cookie', async () => {
        const object = {key1: 'value1', key2: 'value', email: 'me@domain.com'};
        const token = await jwt.sign(object);
        expect(jwt.verify(token)).toMatchObject(object);
    });
});