const CleanWebpackPlugin = require('clean-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const merge = require('webpack-merge');
const path = require('path');
const webpack = require('webpack');

const parts = require('./webpack.parts');

const commonConfig = {
  entry: ['@babel/polyfill', './src/index'],
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js',
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /(node_modules)/,
        use: {
          loader: 'babel-loader',
        },
      },
    ],
  },
  plugins: [
    new CleanWebpackPlugin(['dist']),
    new CopyWebpackPlugin([
      { from: path.join(__dirname, 'public'), to: 'public' },
      { from: path.join(__dirname, 'src/html/FAQs.html') },
    ]),
    new HtmlWebpackPlugin({
      template: './index.html',
      hash: true,
    }),
  ],
};

const productionConfig = merge([
  parts.minifyJavaScript(),
  parts.extractSCSS(),
  parts.minifyCSS(),
]);

const developmentConfig = merge([
  {
    devtool: 'inline-source-map',
    plugins: [
      new webpack.HotModuleReplacementPlugin(),
    ],
  },
  parts.loadSCSS(),
]);

module.exports = mode => {
  if (mode === 'production') {
    return merge(commonConfig, productionConfig, { mode });
  }

  return merge(commonConfig, developmentConfig, { mode });
};
