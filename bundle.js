import Webpack from './lib/webpack'
import webpackConfig from './webpack.config'

const webpack = new Webpack()

const exports = webpack(webpackConfig).run()

console.log(exports)
