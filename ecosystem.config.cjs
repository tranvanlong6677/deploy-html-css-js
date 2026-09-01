module.exports = {
  apps: [
    {
      name: "deploy-html-css-js",
      script: "serve",
      env: {
        PM2_SERVE_PATH: ".",
        PM2_SERVE_PORT: 3000,
        PM2_SERVE_SPA: "true",
      },
    },
  ],
};
