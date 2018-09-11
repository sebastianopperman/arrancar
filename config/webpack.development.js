const path = require('path');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const BrowserSyncPlugin = require('browser-sync-webpack-plugin');

module.exports = {
  entry: ['./src/js/main.js', './src/css/main.css'],
  mode: 'development',
  watch: true,
  watchOptions: {
    ignored: /node_modules/
  },
  stats: 'errors-only',
  devtool: 'inline-source-map',
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['env']
          }
        }
      },
      {
        test: /\.css$/,
        exclude: /node_modules/,
        use: ExtractTextPlugin.extract({
          use: [
            {
              loader: 'css-loader',
              options: {importLoaders: 1},
            },
            {
              loader: 'postcss-loader',
              options: {
                plugins: [
                  require('postcss-partial-import'),
                  require('autoprefixer'),
                  require('postcss-nested'),
                  require('postcss-preset-env')
                ]
              },
            },
          ],
        }),
      }
    ]
  },
  plugins: [
    new CleanWebpackPlugin(['theme/dist']),
    new CopyWebpackPlugin([{
      from: 'src/images',
      to: 'images'
    }]),
    new CopyWebpackPlugin([{
      from: 'src/fonts',
      to: 'fonts'
    }]),
    new ExtractTextPlugin('css/bundle.css'),
    new BrowserSyncPlugin({
      host: 'localhost',
      port: 3000,
      open: false,
      ghostMode: false,
      notify: true,
      proxy: 'http://localhost:8000'
    })
  ],
  output: {
    filename: 'js/bundle.js',
    path: path.resolve(__dirname, '../theme/dist')
  },
};