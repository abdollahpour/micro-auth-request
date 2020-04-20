const oauth = require('../service/google');

module.exports = (req, res, next) => {
    req.oauth = oauth;
    next();
}