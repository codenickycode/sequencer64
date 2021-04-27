const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function (app) {
  app.use(
    'https://drumnickydrum-sequencer.herokuapp.com/',
    createProxyMiddleware({
      target: 'https://drumnickydrum-sequencer.herokuapp.com/',
      changeOrigin: true,
    })
  );
};
