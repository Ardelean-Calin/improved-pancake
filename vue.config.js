module.exports = {
  configureWebpack: {
    devServer: {
      watchOptions: {
        aggregateTimeout: 300,
        poll: 200
      }
    }
  },
  pwa: {
    name: "Master SSEA",
    themeColor: "#2196F3",
    msTileColor: "#FFFFFF"
  }
};
