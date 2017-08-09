module.exports = {
  entry: './src/client.js',
  output: {
    path: './src/static/js/',
    filename: 'bundle.js'
  },
  module: {
    loaders: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
        query: {
          presets: [ 'react', 'es2015' ]
        }
      }
    ]
  },
  resolve: {
    extensions: ['', '.js', '.json']
  }
};
