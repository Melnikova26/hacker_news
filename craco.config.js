const CracoAlias = require("craco-alias");

module.exports = {
  plugins: [
    {
      plugin: CracoAlias,
      options: {
        source: "tsconfig",
        tsConfigPath: "./tsconfig.paths.json",
      },
    },
  ],
  webpack: {
    resolve: {
      alias: {
        "@mui/styled-engine": "@mui/styled-engine-sc",
      },
    },
  },
};
