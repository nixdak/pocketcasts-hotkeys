const CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = {
  entry: {
    background: './src/background.js',
  },
  output: {
    filename: '[name].js',
  },
  plugins: [new CopyWebpackPlugin([{ from: 'static' }])],
};
