
var postcss = require('postcss')
var assert = require('assert')
var fs = require('fs')

var prefix = require('..')

it('should prefix a selector', function () {
  var out = postcss().use(prefix({
    prefix: '.hello '
  })).process(getFixtureContents('single-selector.css')).css

  var expected = getFixtureContents('single-selector.expected.css')

  assert.equal(out, expected)
})

it('should prefix a group of selectors', function () {
  var out = postcss().use(prefix({
    prefix: '.hello '
  })).process(getFixtureContents('group-selectors.css')).css

  var expected = getFixtureContents('group-selectors.expected.css')

  assert.equal(out, expected)
})

it('should avoid prefixing excluded selectors', function () {
  var out = postcss().use(prefix({
    prefix: '.hello ',
    exclude: ['body', '.a *:not(.b)', /class-/]
  })).process(getFixtureContents('exclude-selectors.css')).css

  var expected = getFixtureContents('exclude-selectors.expected.css')

  assert.equal(out, expected)
})

it('should skip @keyframes selectors', function () {
  var out = postcss().use(prefix({
    prefix: '.hello '
  })).process(getFixtureContents('keyframes.css')).css

  var expected = getFixtureContents('keyframes.expected.css')

  assert.equal(out, expected)
})

function getFixtureContents(name) {
  return fs.readFileSync('test/fixtures/' + name, 'utf8').trim()
}
