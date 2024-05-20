// jest.config.js
module.exports = {
  testEnvironment: "jest-environment-jsdom",
  transform: {
    // Transpile TypeScript and JS files
    "^.+\\.(js|jsx|ts|tsx)$": "babel-jest",
  },
  moduleFileExtensions: ["ts", "tsx", "js", "jsx", "json", "node"],
  testPathIgnorePatterns: ["<rootDir>/.next/", "<rootDir>/node_modules/"],
};
