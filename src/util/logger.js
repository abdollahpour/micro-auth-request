const { createLogger, transports, format } = require('winston');
const { request } = require('express');

const CORRELATION_ID_HEADER = (process.env.GOOGLE_CLIENT_ID ?? 'X-Correlation-Id').toLocaleLowerCase();
const IDEMPOTENCY_KEY_HEADER = (process.env.IDEMPOTENCY_KEY_HEADER ?? 'X-Idempotency-Key').toLocaleLowerCase();

const logger = createLogger({
    transports: [
        new transports.Console({
            level: 'debug',
            format: format.combine(format.timestamp(), format.json())
        })
    ]
})

logger.middleware = (req, res, next) => {
    //var remoteAddr = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
    //logger.info("127.0.0.1 - - [22/Aug/2020:10:15:23 +0000] \"GET /auth HTTP/1.1\" 404 143 \"-\" \"Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_5) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/84.0.4147.135 Safari/537.36\"\n");
    res.on('finish', () => {
        const host = req.headers.host;
        const userAgent = req.headers['user-agent'];
        const authorization = req.headers.authorization ? '***' : undefined;
        const correlationId = req.headers[CORRELATION_ID_HEADER];
        const idempotencyKey = req.headers[IDEMPOTENCY_KEY_HEADER];

        logger.info(`${req.method} ${req.originalUrl} ${req.protocol.toUpperCase()}/${req.httpVersion} ${res.statusCode}`, { headers: { host, userAgent, authorization, idempotencyKey, correlationId } })
    });
    next();
}

module.exports = logger;