module.exports = {
  configureWebpack: {
    devServer: {
      watchOptions: {
        aggregateTimeout: 300,
        poll: 1000
      }
    }
  }
};