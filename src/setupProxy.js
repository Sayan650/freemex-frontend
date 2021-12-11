const { createProxyMiddleware } = require('http-proxy-middleware');

//Backend URL
const BE_URL = process.env.BE_URL || 'http://localhost:8000'

module.exports = function(app) {
    app.use(
        /^\/(api|auth|socket.io)/,
        createProxyMiddleware({
            target: BE_URL,
            ws: true
        })
    )
};
