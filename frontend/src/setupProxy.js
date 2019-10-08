//Looking up Proxy and Create React app will lead you down this route towards configuring a proxy
const proxy = require("http-proxy-middleware");

module.exports = function(app) {
  app.use(
    "/api/**",
    proxy({
      target: "http://localhost:3001",
      changeOrigin: true
    })
  );
};
