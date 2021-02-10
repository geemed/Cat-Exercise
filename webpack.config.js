const path = require("path");
const HtmlWebPackPlugin = require("html-webpack-plugin");
const MiniCSSExtractPlugin = require("mini-css-extract-plugin");
const EventHooksPlugin = require("event-hooks-webpack-plugin");
const appDir = path.resolve(__dirname, "src/app");
const env = process.env.NODE_ENV === "production" ? "prod" : "dev";
const fs = require("fs-extra");

module.exports = {
  devtool: "source-map",
  devServer: {
    hot: true,
    historyApiFallback: true,
    open: true,
    port: 3000,
  },
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
    new EventHooksPlugin({
      compile: (compilation, done) => {
        console.log("beforeRun");
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
