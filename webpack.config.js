const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");

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
