
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

it('should prefix a group of selectors', function () {
  var out = postcss().use(prefix({
    prefix: '.hello '
  })).process('.a, .b {}').css

  assert(~out.indexOf('.hello .a'))
  assert(~out.indexOf('.hello .b'))
})

it('should avoid prefixing excluded selectors', function () {
  var out = postcss().use(prefix({
    prefix: '.hello ',
    exclude: ['body', '.a *:not(.b)', /class-/]
  })).process('.a, .b {}\n body {}\n .a *:not(.b) {}\n .c {}\n .class-a{}\n .class-b{}').css

  assert(~out.indexOf('.hello .a'))
  assert(~out.indexOf('.hello .b'))
  assert(~out.indexOf('.hello .c'))
  assert(!~out.indexOf('.hello body'))
  assert(!~out.indexOf('.hello .a *:not(.b)'))
  assert(!~out.indexOf('.hello .class-a'))
  assert(!~out.indexOf('.hello .class-b'))
})

it('should skip @keyframes selectors', function () {
  var out = postcss().use(prefix({
    prefix: '.hello '
  })).process('@keyframes anim {from {} to {}}').css

  assert(!~out.indexOf('.hello from'))
  assert(!~out.indexOf('.hello to'))
})
