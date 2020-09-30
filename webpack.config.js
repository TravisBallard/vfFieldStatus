const path = require('path');

module.exports = {
  entry: './src/fieldStatus.js',
  mode: 'production',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'vf.status.js'
  }
};