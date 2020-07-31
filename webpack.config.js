const path = require('path');

module.exports = (env = {}, argv = {}) => {
  const isDev = argv.mode === 'development';

  return {
    entry: path.resolve(__dirname, 'src/index.js'),
    output: {
      path: path.resolve(__dirname, 'dist'),
      filename: 'dxf-composer.js',
      library: 'dxf-composer',
      libraryTarget: 'umd'
    },
    devtool: isDev ? 'source-map' : ''
  }
};