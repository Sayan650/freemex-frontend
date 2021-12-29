const { createProxyMiddleware } = require('http-proxy-middleware');

//Backend URL
const BE_URL ='http://localhost:8000'

module.exports = function(app) {
    app.use(
        /^\/(api|auth|socket.io|sockjs-node)/,
        createProxyMiddleware({
            target: BE_URL,
            ws: true
        })
    )
};
