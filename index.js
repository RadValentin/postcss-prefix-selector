
var assert = require('assert')

module.exports = function (options) {
  assert(options)
  var prefix = options.prefix
  assert(prefix)
  if (!/\s+$/.test(prefix)) prefix += ' '
  return function (root) {
    root.eachRule(function (rule) {
      // pretty sure this splitting breaks for certain selectors
      var selectors = rule.selector.split(/\s*,\s*/g)
      rule.selector = selectors.map(function (selector) {
        if (options.exclude && ~options.exclude.indexOf(selector)) {
          return selector;
        }
        return prefix + selector
      }).join(', ')
    })
  }
}
