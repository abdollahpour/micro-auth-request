const { google } = require('googleapis');
const fetch = require('node-fetch');

const GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID;
const GOOGLE_CLIENT_SECRET = process.env.GOOGLE_CLIENT_SECRET;

const getAuthClient = (reqUrl) => {
    const url = new URL('/oauth2/callback', reqUrl);
    return new google.auth.OAuth2(
        GOOGLE_CLIENT_ID,
        GOOGLE_CLIENT_SECRET,
        url.toString()
    );
}

const getAuthUrl = (reqUrl) => {
    const url = new URL(reqUrl);

    const scopes = [
        'https://www.googleapis.com/auth/userinfo.email'
    ];

    return getAuthClient(reqUrl).generateAuthUrl({
        access_type: 'offline',
        scope: scopes,
        state: JSON.stringify({rd: url.searchParams.get('rd')})
    });
}

module.exports = {
    getAuthUrl: (reqUrl) => {
        return getAuthUrl(reqUrl);
    },
    getToken: async (reqUrl) => {
        const { tokens } = await getAuthClient(reqUrl).getToken(reqUrl.searchParams.get('code'));
        return tokens;
    },
    getUser: async (token) => {
        const res = await fetch('https://www.googleapis.com/oauth2/v1/userinfo?access_token=' + token);
        return await res.json();
    }
}