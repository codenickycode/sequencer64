const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function (app) {
  app.use(
    '/api',
    createProxyMiddleware({
      target: 'https://drumnickydrum-sequencer.herokuapp.com',
      changeOrigin: true,
    })
  );
};
