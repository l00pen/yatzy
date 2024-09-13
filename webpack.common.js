const path = require("path");
const CleanWebpackPlugin = require("clean-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const CopyWebpackPlugin = require("copy-webpack-plugin");
const { clean } = require("gh-pages");

module.exports = {
  entry: {
    app: "./src/index.js",
  },
  resolve: {
    alias: {
      Components: path.resolve(__dirname, "src/components/"),
      Reducers: path.resolve(__dirname, "src/reducers/"),
    },
    extensions: ["", ".js", ".jsx"],
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: "Development",
      template: "src/index.html",
    }),
    new CopyWebpackPlugin({
      patterns: [{ from: "public" }],
    }),
  ],
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,

        loader: "babel-loader",
      },
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader"],
      },
    ],
  },
  output: {
    filename: "[name].bundle.js",
    path: path.resolve(__dirname, "dist"),
    clean: true,
  },
};
