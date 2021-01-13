const jwt = require('../../src/service/jwt');

describe('jwt service', () => {
    describe('when pass valid token', () =>
        it('should retrieve the claim object', async () => {
            const object = {key1: 'value1', key2: 'value', email: 'me@domain.com'};
            const token = jwt.sign(object);
            expect(jwt.verify(token)).toMatchObject(object);
        })
    );
    describe('when pass malformated token', () =>
        it('should throw an exception', async () => {
            try {
                jwt.verify('some malformated token');
            } catch(e) {
                console.log(e);
            }
        })
    );
});