const { google } = require('googleapis');
const { download } = require('../util/net');

const GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID;
const GOOGLE_CLIENT_SECRET = process.env.GOOGLE_CLIENT_SECRET;

let oauth2Client, authUrl;

const init = (reqUrl) => {
    const url = new URL('/oauth2/redirect', reqUrl);

    if (!oauth2Client) {
        oauth2Client = new google.auth.OAuth2(
            GOOGLE_CLIENT_ID,
            GOOGLE_CLIENT_SECRET,
            url.toString()
        );
        
        const scopes = [
            'https://www.googleapis.com/auth/userinfo.email'
        ];
        
        authUrl = oauth2Client.generateAuthUrl({
            access_type: 'offline',
            scope: scopes
        });
    }
}

module.exports = {
    getAuthUrl: (reqUrl) => {
        init(reqUrl);
        return authUrl;
    },
    getToken: async (reqUrl) => {
        init(reqUrl);
        const { tokens } = await oauth2Client.getToken(reqUrl.searchParams.get('code'));
        return tokens;
    },
    getUser: async (token) => {
        const body = await download('https://www.googleapis.com/oauth2/v1/userinfo?access_token=' + token);
        return JSON.parse(body);
    }
}