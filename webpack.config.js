module.exports = {
 devtool: 'source-map',
 entry: ['babel-polyfill', './src/index.js'],
  module: {
    rules: [
      {
        test: /\.js$/,
        loader: 'babel-loader',
        exclude: /node_modules/
      }
    ]
  }
};
