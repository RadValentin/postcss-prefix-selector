
var assert = require('assert')

module.exports = function (options) {
  assert(options)
  var prefix = options.prefix 
  assert(prefix)
  
  var prefixWithSpace = /\s+$/.test(prefix) ? prefix : prefix + ' '
  var transform = options.transform || function(prefix, selector, both) {
    return both
  }

  return function (root) {
    root.walkRules(function (rule) {
      if (rule.parent && rule.parent.name == 'keyframes') {
        return
      }

      rule.selectors = rule.selectors.map(function (selector) {
        if (options.exclude && excludeSelector(selector, options.exclude)) {
          return selector
        }
        return transform(prefix, selector, prefixWithSpace + selector)
      })
    })
  }
}

function excludeSelector(selector, excludeArr) {
  return excludeArr.some(function(excludeRule) {
    if (excludeRule instanceof RegExp) {
      return excludeRule.test(selector)
    } else {
      return selector === excludeRule
    }
  })
}
