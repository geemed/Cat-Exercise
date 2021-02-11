const webpack = require("webpack");
const CSSMinimizerWebpackPlugin = require("css-minimizer-webpack-plugin");
const TerserWebpackPlugin = require("terser-webpack-plugin");

module.exports = {
  optimization: {
    splitChunks: {
      cacheGroups: {
        react: {
          test: /[\\/]node_modules[\\/]((react).*)[\\/]/,
          name: "react",
          chunks: "all",
        },
        commons: {
          test: /[\\/]node_modules[\\/]((?!react).*)[\\/]/,
          name: "common",
          chunks: "all",
        },
      },
    },
    minimize: true,
    minimizer: [
      new TerserWebpackPlugin({
        parallel: true,
        terserOptions: {
          keep_classnames: false,
          compress: {
            drop_console: true,
          },
          output: {
            comments: false,
          },
        },
        extractComments: false,
      }),
      new CSSMinimizerWebpackPlugin(),
    ],
  },
};
