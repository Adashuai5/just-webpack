const path = require("path");
const DemoPlugin = require("./plugins/deme-plugin");

const PATHS = {
  lib: path.join(__dirname, "index.js"),
  build: path.join(__dirname, "build"),
};

module.exports = {
  entry: {
    lib: PATHS.lib,
  },
  output: {
    path: PATHS.build,
    filename: "[name].js",
  },
  plugins: [new DemoPlugin({ name: "demo" })],
};
