// next.config.js
module.exports = {
  webpack: (config, { isServer }) => {
    if (!isServer) {
      config.module.rules.push({
        test: /\.(test.js|test.jsx|test.ts|test.tsx)$/,
        loader: "ignore-loader",
      });
    }
    return config;
  },
};
