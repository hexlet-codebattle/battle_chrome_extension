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
    extensions: [".js"],
    modules: ['node_modules'],
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        enforce: "pre",
        use: ["eslint-loader"],
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
        use: ["url-loader?limit=100000"],
      },
    ],
  }
};
