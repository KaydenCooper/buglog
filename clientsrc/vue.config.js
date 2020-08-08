module.exports = {
  outputDir: "../client",
  productionSourceMap: false,
  chainWebpack: (config) => {
    config.plugin("html")
      .tap((args) => {
        args[0].title = "BUGLOGGR"
        return args
      })
  }
};
