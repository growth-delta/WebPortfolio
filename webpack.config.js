const path = require('path');

module.exports = {
  entry: {
    site: './frontend/javascript/site.js',
    MarineTraffic: './frontend/javascript/applications/MarineTraffic.jsx',
    Table_Ai: './frontend/javascript/applications/Table_Ai.jsx',
    Table_Securities: './frontend/javascript/applications/Table_Securities.jsx',
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
