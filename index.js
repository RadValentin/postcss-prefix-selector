
var assert = require('assert')

module.exports = function (options) {
  assert(options)
  var prefix = options.prefix
  assert(prefix)
  if (!/\s+$/.test(prefix)) prefix += ' '
  return function (root) {
    root.walkRules(function (rule) {
      rule.selectors = rule.selectors.map(function (selector) {
        if (options.exclude && ~options.exclude.indexOf(selector)) {
          return selector;
        }
        return prefix + selector
      })
    })
  }
}
