
var assert = require('assert')

module.exports = function (options) {
  assert(options)
  var prefix = options.prefix.trim() // trim as we no longer need a space in the options
  assert(prefix)
  return function (root) {
    root.walkRules(function (rule) {
      if (rule.parent && rule.parent.name == 'keyframes') {
        return
      }

      rule.selectors = rule.selectors.map(function (selector) {
        // IF THE SELECTOR IS EXCLUDED, DO EARLY RETURNS
        if (options.exclude && excludeSelector(selector, options.exclude)) {
          return selector
        }

        // REPLACE DESCENDANT COMBINATORS THAT CAN'T BE PREFIXED
        selector = selector.replace(/^html body|^html|^body/, '').trim()

        if (!selector.length) {
          // avoid double spaces when selector length is zero
          return prefix
        }

        if (/^:/.test(selector)) {
          // ensure there is no space for pseudo element selectors
          return prefix + selector
        }

        return prefix + ' ' + selector
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
  });
}
