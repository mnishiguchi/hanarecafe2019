const path = require("path");

module.exports = {
  mode: "production",
  watch: true,
  entry: {
    main: path.join(__dirname, "webpack", "main")
  },
  output: {
    filename: "[name]-bundle.js",
    path: path.resolve(__dirname, "js")
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: [
          path.resolve(__dirname, "node_modules"),
          path.resolve(__dirname, "bower_components")
        ],
        loader: "babel-loader",
        query: {
          presets: ["env"]
        }
      }
    ]
  },
  resolve: {
    extensions: [".json", ".js", ".jsx"]
  }
};
