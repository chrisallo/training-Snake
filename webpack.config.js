
const path = require('path');

module.exports = {
  mode: 'production',
  entry: './client/play.jsx',
  output: {
    path: path.resolve(__dirname, 'public/js'),
    filename: 'snake.js'
  },
  module: {
    rules: [
      {
        test: /\.[js|jsx]$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: [
              '@babel/preset-env',
              '@babel/preset-react'
            ]
          }
        }
      }
    ]
  }
};