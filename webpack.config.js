const path = require('path');

module.exports = {
  entry: {
    site: './frontend/javascript/site.js',
    AiTable: './frontend/javascript/applications/AiTable.jsx',
  },
  output: {
    filename: '[name]-bundle.js',
    path: path.resolve(__dirname, './static/javascript/bundles'),
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        loader: "babel-loader",
        options: { presets: ["@babel/preset-env", "@babel/preset-react"] }
      },
    ]
  },
};
