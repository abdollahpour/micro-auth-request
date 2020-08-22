const { sign } = require('../service/jwt');

module.exports = async (req, res) => {
    const reqUrl = new URL(req.url, `http://${req.headers.host}`);

    const tokens = await req.oauth.getToken(reqUrl);
    const user = await req.oauth.getUser(tokens.access_token);

    // If you want to enrich the users with some extra info like roles, here is the right place
    const state = JSON.parse(reqUrl.searchParams.get('state') ?? '{}');
    const rd = state?.rd ?? '/';

    const token = sign(user);
    res.writeHead(302, { 'Set-Cookie': `jwt=${token}; Path=/; Secure; HttpOnly`, Location: rd });
    res.end();
}