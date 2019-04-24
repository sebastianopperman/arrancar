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
        test: /\.(woff|woff2|eot|ttf|otf)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
        loader: 'file-loader',
        options: {
          name: '[name].[ext]',
          outputPath: 'fonts/',
          publicPath: '../fonts'
        }
      },
      {
        test: /\.css$/,
        exclude: /node_modules/,
        use: ExtractTextPlugin.extract({
          use: [
            {
              loader: 'css-loader',
              options: {
                importLoaders: 1,
              },
            },
            {
              loader: 'postcss-loader',
              options: {
                plugins: loader => [
                  require('postcss-partial-import'),
                  require('postcss-preset-env')({
                    stage: 0
                  }),
                  require('postcss-hexrgba'),
                  require('autoprefixer'),
                  require('postcss-nested'),
                  require('iconfont-webpack-plugin')({
                    resolve: loader.resolve,
                    enforcedSvgHeight: 100,
                  })
                ]
              },
            },
          ],
        }),
      },
      {
        test: /\.(png|jpg|svg|webp|gif)$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: '[name].[ext]',
              outputPath: './images/',
              publicPath: '../images/',
            }
          }
        ]
      }
    ]
  },
  plugins: [
    new CleanWebpackPlugin(['theme/dist']),
    new CopyWebpackPlugin([{
      from: 'src/images',
      to: 'images'
    }]),
    new ExtractTextPlugin('css/bundle.css'),
    new BrowserSyncPlugin({
      host: 'localhost',
      port: 3000,
      open: false,
      ghostMode: false,
      notify: true,
      proxy: 'http://localhost:8000/'
    })
  ],
  output: {
    filename: 'js/bundle.js',
    path: path.resolve(__dirname, '../theme/dist')
  },
};