const pkj = require('./package.json')
const webpack = require('webpack')
const path = require('path')
module.exports = {
  entry: './src/query.js',
  output: {
    filename: 'query.js',
    path: path.resolve(__dirname, './build'),
    library: 'Query',
    libraryTarget: 'umd',
    libraryExport: 'default',
    umdNamedDefine: true,
    globalObject: 'this'
  },
  mode: 'production',
  module: {
    rules: [{
      test: /\.js$/,
      exclude: /node_modules/,
      use: [
        {
          loader: 'babel-loader'
        },
        {
          loader: 'string-replace-loader',
          options: {
            search: '__VERSION__',
            replace: pkj.version,
          }
        }
      ],
      exclude: /node_modules/
    }
    ]
  },
  plugins: [
    new webpack.BannerPlugin(`${pkj.name} ${pkj.version}\n(c) 2018 Smohan<https://smohan.net>\nReleased under the ${pkj.license} License.`)
  ]
}
