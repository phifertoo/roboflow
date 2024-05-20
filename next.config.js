// next.config.js
const path = require("path");

module.exports = {
  webpack: (config, { isServer }) => {
    if (!isServer) {
      // Configure Webpack to ignore test files
      config.module.rules.push({
        test: /\.test\.(js|jsx|ts|tsx)$/,
        loader: "ignore-loader",
      });
    }
    return config;
  },
};
