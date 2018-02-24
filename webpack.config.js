const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');

if (!process.env.NODE_ENV) process.env.NODE_ENV = 'development';

const config = {
  // input
  entry: './src',
  // output
  output: {
    path: path.join(__dirname, '/docs'),
    filename: 'bundle.js'
  },
  // transformations
  module: {
    rules: [
      {
        test: /\.jsx?/i,
        loader: 'babel-loader',
        exclude: /node_modules/,
        options: {
          presets: ['env'],
          plugins: [['transform-react-jsx', { pragma: 'h' }]]
        }
      },
      {
        test: /src\/font\.js/,
        use: ['style-loader', 'css-loader', 'webfonts-loader']
      }
    ]
  },
  // sourcemaps
  devtool: 'source-map',
  // server
  devServer: {
    contentBase: path.join(__dirname, 'src'),
    compress: true,
    historyApiFallback: true,
    port: 9002
  },
  resolve: {
    alias: {
      react: 'preact-compat',
      'react-dom': 'preact-compat'
    }
  },
  plugins: [new BundleAnalyzerPlugin()]
};

if (process.env.NODE_ENV === 'production') {
  config.plugins = [
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false,
        unused: true,
        dead_code: true,
        drop_console: true
      },
      output: { comments: false },
      mangle: true
    }),
    new HtmlWebpackPlugin({
      inject: false,
      template: './src/index.html'
    }),
    new CopyWebpackPlugin([
      {
        from: 'src/fonts',
        to: 'fonts'
      }
    ])
  ];
}

module.exports = config;
