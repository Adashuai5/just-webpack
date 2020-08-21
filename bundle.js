const Webpack = require('./lib/webpack')
const webpackConfig = require('./webpack.config')

new Webpack(webpackConfig).run()
