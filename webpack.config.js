module.exports = {
  entry: {
    'vf.status': './src/js/vf.status.js',
    'demo': './src/js/demo.js',
  },
  mode: 'production',
  module: {
    rules: [
      {
        test: /\.sass/,
        use: ['style-loader', 'css-loader', 'sass-loader'],
      }
    ]
  }
}