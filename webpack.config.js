let path = require("path");
let MiniCssExtractPlugin = require("mini-css-extract-plugin");

let mode = "development";

if (process.env.NODE_ENV === "production") {
  mode = "production";
}

module.exports = {
  mode: mode,

  module: {
    rules: [
      {
        test: /\.s?css$/i, // not case sensitive
        use: [
          MiniCssExtractPlugin.loader,
          "css-loader",
          "postcss-loader",
          "sass-loader",
        ],
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
        },
      },
    ],
  },

  plugins: [new MiniCssExtractPlugin()],

  devtool: "source-map", // able to see js files as it is in browser
  devServer: {
    hot: true, // hot reloading enable
    static: {
      directory: path.join(__dirname, "dist"),
    },
  },
};
