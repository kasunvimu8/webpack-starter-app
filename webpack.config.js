let path = require("path");
let MiniCssExtractPlugin = require("mini-css-extract-plugin");

// copy the index.html file to dist
let HtmlWebpackPlugin = require("html-webpack-plugin");

// cleaning the dist without manual clean
let { CleanWebpackPlugin } = require("clean-webpack-plugin");

let mode = "development";

if (process.env.NODE_ENV === "production") {
  mode = "production";
}

module.exports = {
  mode: mode,

  // extract the images to images folder
  output: {
    path: path.resolve(__dirname, "dist"),
    assetModuleFilename: "images/[hash][ext][query]",
  },

  module: {
    rules: [
      {
        test: /\.(png|jpg|jpeg|svg|gif)$/i,
        type: "asset/resource",
        // good for small icons,images build images to the javwscript bundle, bundle size get higher
        // type: "asset/inline"

        // webpack will determine inline or resource determine size also can set
        // type: "asset"
        // parser: {
        //   dataUrlCondition: {
        //     maxSize: 30 * 1024,
        //   }
        // }
      },
      {
        test: /\.(s[ac]|c)ss$/i, // not case sensitive
        use: [
          MiniCssExtractPlugin.loader,
          "css-loader",
          "postcss-loader",
          "sass-loader",
        ],
      },
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
        },
      },
    ],
  },

  plugins: [
    new CleanWebpackPlugin(),
    new MiniCssExtractPlugin(),
    new HtmlWebpackPlugin({
      template: "./src/index.html",
    }),
  ],

  resolve: {
    extensions: [".js", ".jsx"],
  },

  devtool: "source-map", // able to see js files as it is in browser
  devServer: {
    hot: true, // hot reloading enable
    static: {
      directory: path.join(__dirname, "dist"),
    },
  },
};
