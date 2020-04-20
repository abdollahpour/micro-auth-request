const DEFAULT_REDIRECT_URL = process.env.GOOGLE_REDIRECT_URL;

/**
 * If not login redirect to loging page if path is "/redirect"
 */
module.exports = (req, res) => {
    const reqUrl = new URL(req.url, DEFAULT_REDIRECT_URL || req.headers['x-forwarded-url'] || `http://${req.headers.host}`);

    res.writeHead(302, { Location: req.oauth.getAuthUrl(reqUrl) });
    res.end();
}