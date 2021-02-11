const webpack = require("webpack");
const { merge } = require("webpack-merge");
const path = require("path");
const fs = require("fs-extra");
const HtmlWebPackPlugin = require("html-webpack-plugin");
const MiniCSSExtractPlugin = require("mini-css-extract-plugin");
const EventHooksPlugin = require("event-hooks-webpack-plugin");
const CleanWebpackPlugin = require("clean-webpack-plugin").CleanWebpackPlugin;

const appDir = path.resolve(__dirname, "src/app");
const env = process.env.NODE_ENV === "production" ? "prod" : "dev";

const devConfig = require("./webpack.dev"),
  prodConfig = require("./webpack.prod");
const envConfig =
  process.env.NODE_ENV === "production" ? prodConfig : devConfig;

const config = {
  entry: {
    app: "./src/app/index.js",
    style: "./src/styles/index.scss",
  },
  output: {
    path: path.resolve(__dirname, "dist"),
    publicPath: "/",
    filename: "js/[name].bundle.js",
  },
  resolve: {
    modules: ["node_modules", appDir],
    extensions: [".js", ".jsx", ".css", ".scss", ".json"],
    alias: {
      "app-component": path.resolve(__dirname, path.join(appDir, "component")),
      "app-base": path.resolve(__dirname, path.join(appDir, "infrastructure")),
      "app-config": path.resolve(__dirname, path.join(appDir, "configs")),
      "app-service": path.resolve(__dirname, path.join(appDir, "services")),
    },
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: { loader: "babel-loader" },
      },
      { test: /\.html$/, use: [{ loader: "html-loader" }] },
      {
        test: /\.(sc|c)ss$/,
        use: [
          { loader: MiniCSSExtractPlugin.loader },
          { loader: "css-loader" },
          { loader: "sass-loader" },
        ],
      },
      {
        test: /\.woff($|\?)|\.woff2($|\?)|\.ttf($|\?)|\.eot($|\?)|\.svg($|\?)/,
        loader: "url-loader",
      },
    ],
  },
  plugins: [
    new CleanWebpackPlugin({
      verbose: true,
      cleanOnceBeforeBuildPatterns: [path.resolve(__dirname, "dist")],
    }),
    new EventHooksPlugin({
      beforeRun: (compilation, done) => {
        fs.copy(
          path.resolve(__dirname, `environments/${env}/config`),
          path.join(appDir, "configs"),
          done
        );
      },
    }),
    new HtmlWebPackPlugin({
      template: path.join(__dirname, "src/index.html"),
      inject: "body",
    }),
    new MiniCSSExtractPlugin({
      filename: "css/[name].bundle.css",
    }),
  ],
};

module.exports = merge(config, envConfig);
