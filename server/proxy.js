const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = createProxyMiddleware({
  target: 'https://api.docue.com',
  pathRewrite: { '^/api/': '/public/documents' },
  changeOrigin: true,
});
