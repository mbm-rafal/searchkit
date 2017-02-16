var path = require('path');
var webpack = require('webpack');

module.exports = {
  entry: [
    './app.js'
  ],
  output: { path: __dirname, filename: 'bundle.js' },
  resolve: {
    extensions: ['.js', '.jsx']
  },
  module: {
    loaders: [
      {
        test: /\.(js|jsx)$/,
        loaders: 'babel-loader',
        // exclude: /node_modules/,
        query: {
          presets: ['es2015', 'react', 'stage-1']
        }
      },
      {
        test: /\.(css)$/,
        include: path.join (__dirname, 'styles'),
        use: [ 'style-loader', 'css-loader' ]
      }
    ]
  },
};