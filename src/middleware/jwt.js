const { verify } = require('../service/jwt');

module.exports = (req, res, next) => {
    // Try to check if it's login already
    try {
        const jwtCookie = req.cookies.jwt;
        if (jwtCookie) {
            const object = verify(jwtCookie);
            if (object.email) {
                res.writeHead(200, {
                    'X-Auth-Request-Email': object.email,
                    'X-Auth-Request-User': new URLSearchParams(object).toString()
                });
                return res.end();
            }
        }
    } catch (e) {
        console.error(e);
    }

    next();
}