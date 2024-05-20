const withTM = require("next-transpile-modules")([]);

module.exports = withTM({
  webpack: (config, { isServer }) => {
    if (!isServer) {
      config.module.rules.push({
        test: /\.(test|spec)\.(js|jsx|ts|tsx)$/,
        use: "ignore-loader",
      });
    }
    return config;
  },
});
