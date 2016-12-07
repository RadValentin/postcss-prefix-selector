const postcss = require('postcss');
const assert = require('assert');
const fs = require('fs');
const prefixer = require('../index.js');

it('should prefix a selector', () => {
  const out = postcss().use(prefixer({
    prefix: '.hello ',
  })).process(getFixtureContents('single-selector.css')).css;

  const expected = getFixtureContents('single-selector.expected.css');

  assert.equal(out, expected);
});

it('should prefix a group of selectors', () => {
  const out = postcss().use(prefixer({
    prefix: '.hello ',
  })).process(getFixtureContents('group-selectors.css')).css;

  const expected = getFixtureContents('group-selectors.expected.css');

  assert.equal(out, expected);
});

it('should avoid prefixing excluded selectors', () => {
  const out = postcss().use(prefixer({
    prefix: '.hello ',
    exclude: ['body', '.a *:not(.b)', /class-/],
  })).process(getFixtureContents('exclude-selectors.css')).css;

  const expected = getFixtureContents('exclude-selectors.expected.css');

  assert.equal(out, expected);
});

it('should skip @keyframes selectors', () => {
  const out = postcss().use(prefixer({
    prefix: '.hello ',
  })).process(getFixtureContents('keyframes.css')).css;

  const expected = getFixtureContents('keyframes.expected.css');

  assert.equal(out, expected);
});

it('should support an additional callback for prefix transformation', () => {
  const out = postcss().use(prefixer({
    prefix: '.hello',
    transform(prefix, selector, prefixedSelector) {
      if (selector === 'body') {
        return `body${prefix}`;
      }

      return prefixedSelector;
    },
  })).process(getFixtureContents('transform.css')).css;

  const expected = getFixtureContents('transform.expected.css');

  assert.equal(out, expected);
});

function getFixtureContents(name) {
  return fs.readFileSync(`test/fixtures/${name}`, 'utf8').trim();
}
