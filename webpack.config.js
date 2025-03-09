const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const webpack = require('webpack');
const dotenv = require('dotenv');

// Load .env variables
const env = dotenv.config().parsed || {};
console.log("Loaded Env Variables:", env);

// Prepare environment variables for DefinePlugin
const envKeys = Object.keys(env).reduce((prev, next) => {
  prev[`process.env.${next}`] = JSON.stringify(env[next]);
  return prev;
}, {});
console.log("Prepared Env Keys:", envKeys);


module.exports = {
  mode: "development",
  entry: "./src/index.tsx",
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "bundle.js",
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "./public/index.html", // Ensures HTML is generated properly
    }),
    new webpack.DefinePlugin({
      'process.env': envKeys
    }),
  ],
  devServer: {
    static: {
      directory: path.join(__dirname, "dist"), // Serves static files
    },
    port: 8080, // Dev server port
    historyApiFallback: true, // Ensures React routing works correctly
  },
  module: {
    rules: [
      {
        test: /\.(ts|tsx)$/, // Handles TypeScript files
        use: "babel-loader",
        exclude: /node_modules/,
      },
      {
        test: /\.css$/, // Handles CSS files
        use: ["style-loader", "css-loader"], // Adds support for styling
      },
    ],
  },
  resolve: {
    extensions: [".js", ".jsx", ".ts", ".tsx"], // Resolves file extensions
  },
};
