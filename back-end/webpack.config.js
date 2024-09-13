const path = require("path");

module.exports = {
  mode: "production",
  entry: "./server.js",
  target: "node",
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "server.js",
  },
  externals: [require('webpack-node-externals')()]
}
