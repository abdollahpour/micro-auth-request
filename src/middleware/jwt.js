const { verify } = require('../service/jwt');
const { enrich } = require('../service/etcd');

module.exports = (req, res, next) => {
    // Try to check if it's login already
    try {
        const jwtCookie = req.cookies.jwt;
        if (jwtCookie) {
            const object = verify(jwtCookie);
            if (object.email) {
                const user = enrich(object);
                res.writeHead(200, {
                    'X-Auth-Request-Email': user.email,
                    'X-Auth-Request-User': new URLSearchParams(user).toString()
                });
                return res.end();
            }
        }
    } catch (e) {
        console.error(e);
    }

    next();
}