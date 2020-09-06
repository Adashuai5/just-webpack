const { RawSource } = require("webpack-sources");

module.exports = class DemoPlugin {
  constructor(options) {
    this.options = options;
  }
  apply(compiler) {
    const { name } = this.options;
    console.log("applying", this.options);
    compiler.plugin("emit", (compilation, next) => {
      console.log(compilation);

      compilation.assets[name] = new RawSource("demo");
      compilation.errors.push("error");
      compilation.warnings.push("warning");
      next();
    });
  }
};
