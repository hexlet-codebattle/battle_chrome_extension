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
    new webpack.optimize.UglifyJsPlugin({
      compress: {
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
    extensions: ['.js']
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        enforce: "pre",
        use: "eslint-loader",
        exclude: /(node_modules|webpack|dev|build|bullet.js)/
      },
      {
        test: /\.js$/,
        use: {
          loader : "babel-loader",
          options: {
            presets: [
              "es2015",
              "stage-0",
              "react",
              "env",
            ],
          },
        },
        exclude: /node_modules/
      },
      {
        test: /\.css$/,
        use: [
          'style-loader',
          { loader: 'css-loader', options: { importLoaders: 1 } },
          'postcss-loader'
        ],
      },
      {
        test: /\.(png|svg|woff|woff2|eot|ttf|otf)$/,
        use: "url-loader?limit=100000"
      },
    ],
  }
};
