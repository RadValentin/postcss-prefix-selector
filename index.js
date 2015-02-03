
var assert = require('assert')

module.exports = function (options) {
  assert(options)
  var prefix = options.prefix
  assert(prefix)
  if (!/\s+$/.test(prefix)) prefix += ' '
  return function (root) {
    root.eachRule(function (rule) {
      rule.selector = prefix + rule.selector
    })
  }
}
