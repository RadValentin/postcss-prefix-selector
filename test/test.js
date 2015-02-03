
var postcss = require('postcss')
var assert = require('assert')

var prefix = require('..')

it('should prefix a selector', function () {
  var out = postcss().use(prefix({
    prefix: '.hello '
  })).process('.a {}\n .b {}').css

  assert(~out.indexOf('.hello .a'))
  assert(~out.indexOf('.hello .b'))
})
