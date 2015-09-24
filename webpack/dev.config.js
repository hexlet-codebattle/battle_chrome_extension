import path from "path";
import webpack from "webpack";

const PORT = 3000;
const ENTRY = [
  `webpack-dev-server/client?https://localhost:${PORT}`,
  "webpack/hot/only-dev-server"
];

export default {
  devtool: "inline-source-map",
  entry: {
    popup: [ path.join(__dirname, "../chrome/app/popup/index"), ...ENTRY ],
    background: [ path.join(__dirname, "../chrome/app/background/index"), ...ENTRY ],
  },
  output: {
    path: path.join(__dirname, "../dev/js"),
    filename: "[name].bundle.js",
    chunkFilename: "[id].chunk.js",
    publicPath: `https://localhost:${PORT}/js/`
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.DefinePlugin({
      __DEVELOPMENT__: true
    }),
    new webpack.ProvidePlugin({
      $: "jquery",
      jQuery: "jquery",
      React: "react"
    })
  ],
  resolve: {
    extensions: ["", ".js"]
  },
  resolveLoader: { root: path.join(__dirname, "../node_modules") },
  module: {
    preLoaders: [
      {
        test: /\.js$/,
        loader: "eslint-loader",
        exclude: /(node_modules|webpack|dev|build|bullet.js)/
      }
    ],

    loaders: [{
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
