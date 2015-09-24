import path from 'path';
import webpack from 'webpack';

export default {
  entry: {
    popup: [ path.join(__dirname, '../chrome/app/popup/index') ],
    background: [ path.join(__dirname, '../chrome/app/background/index') ],
  },
  output: {
    path: path.join(__dirname, '../build/js'),
    filename: '[name].bundle.js',
    chunkFilename: '[id].chunk.js'
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: '"production"'
      },
      __DEVELOPMENT__: false
    }),
    new webpack.optimize.DedupePlugin(),
    new webpack.optimize.UglifyJsPlugin({
      comments: false,
      compressor: {
        warnings: false
      }
    }),
    new webpack.ProvidePlugin({
      $: "jquery",
      jQuery: "jquery",
      React: "react"
    })
  ],
  resolve: {
    extensions: ['', '.js']
  },
  module: {
    preLoaders: [
      {
        test: /\.js$/,
        loader: "eslint-loader",
        exclude: /(node_modules|webpack|dev|build|bullet.js)/
      }
    ],

    loaders: [
      {
        test: /\.js$/,
        loader: "babel?stage=0",
        exclude: /node_modules/
      },
      {
        test: /\.css$/,
        loader: "style!css!autoprefixer-loader"
      },
      {
        test: /\.(png|svg|woff|woff2|eot|ttf|otf)$/,
        loader: "url?limit=100000"
      },
    ]
  }
};
