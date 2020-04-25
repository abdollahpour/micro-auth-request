const express = require('express');
const cookieParser = require('cookie-parser')
const jwtMiddleware = require('./src/middleware/jwt');
const oauthMiddleware = require('./src/middleware/oauth');
const redirectController = require('./src/controller/redirect');
const startController = require('./src/controller/start');
const passController = require('./src/controller/pass');
const authController = require('./src/controller/auth');

const HOST = process.env.HOST || '0.0.0.0';
const PORT = process.env.PORT || 8080;

const app = express();
app.use(cookieParser());
app.use(jwtMiddleware);
app.use(oauthMiddleware);
app.use((req, rest, next) => req.path.match(/\/oauth2\/(pass|auth)/) ? oauthMiddleware(req, rest, next) : next());
app.get('/oauth2/start', startController);
app.get('/oauth2/callback', redirectController);
app.get('/oauth2/pass', passController);
app.get('/oauth2/auth', authController);

app.listen(PORT, HOST, () => console.log(`Server is running one ${HOST}:${PORT}`));