const fs = require('fs')
const path = require('path')
const util = require('util')
const { compilation, web } = require('webpack')
const webpack = require('webpack')
const sources = webpack.sources
const { RawSource } = sources

const readFile = util.promisify(fs.readFile)

class TestWebpackPlugin {
  constructor() {}
  apply(complier) {
    complier.hooks.emit.tap('TestWebpackPlugin', (compilation) => {
      debugger
      console.log('emit.tap')
    })

    complier.hooks.afterEmit.tap('TestWebpackPlugin', (compilation) => {
      console.log('afterEmit.tap')
    })

    complier.hooks.done.tap('TestWebpackPlugin', (stats) => {
      console.log('done.tap')
    })
    complier.hooks.thisCompilation.tap('TestWebpackPlugin', (compilation) => {
      compilation.hooks.additionalAssets.tapAsync(
        'TestWebpackPlugin',
        async (cb) => {
          const data = await readFile(path.resolve('package.json'))
          compilation.emitAsset('package.json', new RawSource(data))
          cb()
        }
      )
    })
  }
}

module.exports = TestWebpackPlugin
