const { createProxyMiddleware } = require("http-proxy-middleware");

module.exports = function (app) {
  app.use(
    "/api",
    createProxyMiddleware({
      target: "https://api.dhan.co",
      changeOrigin: true,
      pathRewrite: { "^/api": "" },
    })
  );
};
