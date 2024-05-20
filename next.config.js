// next.config.js
module.exports = {
  webpack: (config, { isServer }) => {
    // This condition ensures the rule is only applied in production
    if (!isServer) {
      config.module.rules.push({
        test: /\.(test.js|test.jsx)$/,
        loader: "ignore-loader",
      });
    }
    return config;
  },
};
