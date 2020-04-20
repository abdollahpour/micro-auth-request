const fs = require('fs');
const { generateKeyPairSync } = require('crypto');
const jwt = require('jsonwebtoken');

let privateKey = fs.existsSync('private.pem') && fs.readFileSync('private.pem');
let publicKey = fs.existsSync('public.pem') && fs.readFileSync('public.pem');

if (!privateKey || !publicKey) {
    console.warn("'private.pem' or 'public.pem' did not find. They system using generic one.");
    const keys = generateKeyPairSync('rsa', {
        modulusLength: 4096,
        publicKeyEncoding: {
            type: 'spki',
            format: 'pem'
        },
        privateKeyEncoding: {
            type: 'pkcs8',
            format: 'pem'
        }
    });
    privateKey = keys.privateKey;
    publicKey = keys.publicKey;
}

const sign = (user) => jwt.sign(user, privateKey, { algorithm: 'RS256' });
const verify = (token) =>  jwt.verify(token, publicKey);

module.exports = {
    sign,
    verify
}