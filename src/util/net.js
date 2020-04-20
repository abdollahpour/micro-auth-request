const https = require('https');

const download = (url) => {
    return new Promise((resolve, reject) => {
        https.get(url, (res) => {
            let data = [];
            res.on('data', d => data.push(d));
            res.on('end', () => resolve(Buffer.concat(data).toString()));
            res.on('error', (error) => reject(error));
        });
    })
};

module.exports = {
    download
}