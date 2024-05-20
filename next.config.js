// next.config.js
module.exports = {
  webpack: (config, { buildId, dev, isServer, defaultLoaders, webpack }) => {
    // Prevent Next.js from compiling test files:
    config.module.rules.push({
      test: /\.test\.(js|jsx|ts|tsx)$/,
      loader: "ignore-loader",
    });
    return config;
  },
};
