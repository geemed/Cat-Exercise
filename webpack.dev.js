const webpack = require("webpack");

module.exports = {
  devtool: "source-map",
  devServer: {
    hot: true,
    historyApiFallback: true,
    open: true,
    port: 3000,
    host: "localhost",
  },
};
