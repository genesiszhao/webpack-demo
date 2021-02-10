const { getOptions } = require('loader-utils')
const { validate } = require('schema-utils')
const schema = require('./schema.json')

// loader本质上是个函数
function logLoader(content, map, meta) {
  const options = getOptions(this)
  validate(schema, options, {
    name: 'logLoader',
  })

  console.log(content, options)

  return content
}

module.exports = logLoader
