const slsw = require('serverless-webpack');

module.exports = {
  entry: slsw.lib.entries,
  target: 'node',
  mode: slsw.lib.webpack.isLocal ? 'development' : 'production',
  module: {
    rules: [{
      test: /\.js$/,
      use: ['babel-loader'],
      include: __dirname,
      exclude: /node_modules/,
    }],
  },
};
