const path = require('path');
const webpack = require("webpack");
const HtmlWebPackPlugin = require("html-webpack-plugin");

module.exports = {
  module: {
    rules: [
      {
        test: /\.js?$/,
        loader: 'babel-loader',
        exclude: /node_modules/,
      },
      {
        test: /\.scss$/,
        use: [
          'style-loader', // creates style nodes from JS strings
          'css-loader', // translates CSS into CommonJS
          'sass-loader', // compiles Sass to CSS, using Node Sass by default
        ],
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader'],
      },
    ],
  },
  entry: {
    app: [
      "webpack-hot-middleware/client?path=/__webpack_hmr&timeout=20000",
      path.resolve(__dirname, 'src', 'app', 'index.js')
    ]
  },
  mode: 'development',
  devtool: 'inline-source-map',
  watch: true,
  output: {
    path: path.resolve(__dirname, 'build'),
    publicPath: `http://${process.env["IP"] || '0.0.0.0'}:8080/`,
  },
  plugins: [
    new HtmlWebPackPlugin({
      template: "./src/app/index.html",
      filename: "app.html"
    }),
    new webpack.HotModuleReplacementPlugin()]
};
