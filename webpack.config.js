

var path = require('path');
var webpack = require('webpack');
var BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;


module.exports = {
  entry: {
    agent_dashboard: path.join(__dirname, '/index.js')
  },
  output: {
    path: path.join(__dirname, '/Build'),
    filename: 'carat_output.js',
    publicPath: '/',
  },
  devtool: 'source-map'
}
