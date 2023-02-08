const { name } = require("./package.json");

module.exports = {
  apps: [
    {
      script: "./build/serve.js",
      name,
      env_development: {
        NODE_ENV: "development",
      },
      env_production: {
        NODE_ENV: "production",
      },
      max_memory_restart: "2G",
      log_date_format: "YYYY-MM-DD HH:mm Z",
    },
  ],
};
