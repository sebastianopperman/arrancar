const path = require('path');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const ImageminPlugin = require('imagemin-webpack-plugin').default;
const ImageminWebpWebpackPlugin= require("imagemin-webp-webpack-plugin");
const UglifyWebpackPlugin = require('uglifyjs-webpack-plugin');

module.exports = {
  entry: ['./src/js/main.js', './src/css/main.css'],
  mode: 'production',
  stats: 'errors-only',
  optimization: {
    minimize: true,
    minimizer: [new UglifyWebpackPlugin({ sourceMap: false })],
  },
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
              options: {importLoaders: 1},
            },
            {
              loader: 'postcss-loader',
              options: {
                plugins: loader => [
                  require('postcss-partial-import'),
                  require('postcss-hexrgba'),
                  require('autoprefixer'),
                  require('postcss-nested'),
                  require('iconfont-webpack-plugin')({
                    resolve: loader.resolve,
                    enforcedSvgHeight: 100,
                  }),
                  require('postcss-preset-env')({
                    stage: 0
                  }),
                  require('cssnano')
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
    new ImageminPlugin({
      pngquant: {
        quality: '80'
      }
    }),
    new CopyWebpackPlugin([{
      from: 'src/images',
      to: 'images'
    }]),
    new ImageminWebpWebpackPlugin({
      config: [{
        test: /\.(jpe?g|png)/,
        options: {
          quality:  80
        }
      }],
      overrideExtension: true,
      detailedLogs: false,
      strict: true
    }),
    new CopyWebpackPlugin([{
      from: 'src/fonts',
      to: 'fonts'
    }]),
    new ExtractTextPlugin('css/bundle.css'),
  ],
  output: {
    filename: 'js/bundle.js',
    path: path.resolve(__dirname, '../theme/dist')
  },
};