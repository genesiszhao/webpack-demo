const { getOptions } = require('loader-utils')
const { validate } = require('schema-utils')
const schema = require('./schema.json')
const babel = require('@babel/core')
const util = require('util')

const transform = util.promisify(babel.transform)

function babelLoader(content, map, meta) {
  const options = getOptions(this)
  validate(schema, options, {
    name: 'babelLoader',
  })

  console.log('my babel loader run ')

  const callback = this.async()
  transform(content, options)
    .then(({ code, map }) => callback(null, code, map, meta))
    .catch((error) => callback(error))
}

module.exports = babelLoader
