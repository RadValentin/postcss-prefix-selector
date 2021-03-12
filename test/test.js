const postcss = require('postcss');
const assert = require('assert');
const fs = require('fs');
const prefixer = require('../index.js');

it('should prefix a selector', () => {
  const out = postcss()
    .use(
      prefixer({
        prefix: '.hello ',
      })
    )
    .process(getFixtureContents('single-selector.css')).css;

  const expected = getFixtureContents('single-selector.expected.css');

  assert.equal(out, expected);
});

it('should prefix a group of selectors', () => {
  const out = postcss()
    .use(
      prefixer({
        prefix: '.hello ',
      })
    )
    .process(getFixtureContents('group-selectors.css')).css;

  const expected = getFixtureContents('group-selectors.expected.css');

  assert.equal(out, expected);
});

it('should avoid prefixing excluded selectors', () => {
  const out = postcss()
    .use(
      prefixer({
        prefix: '.hello ',
        exclude: ['body', '.a *:not(.b)', /class-/],
      })
    )
    .process(getFixtureContents('exclude-selectors.css')).css;

  const expected = getFixtureContents('exclude-selectors.expected.css');

  assert.equal(out, expected);
});

it('should skip @keyframes selectors', () => {
  const out = postcss()
    .use(
      prefixer({
        prefix: '.hello ',
      })
    )
    .process(getFixtureContents('keyframes.css')).css;

  const expected = getFixtureContents('keyframes.expected.css');

  assert.equal(out, expected);
});

it('should support an additional callback for prefix transformation', () => {
  const out = postcss()
    .use(
      prefixer({
        prefix: '.hello',
        transform(prefix, selector, prefixedSelector) {
          if (selector === 'body') {
            return `body${prefix}`;
          }

          return prefixedSelector;
        },
      })
    )
    .process(getFixtureContents('transform.css')).css;

  const expected = getFixtureContents('transform.expected.css');

  assert.equal(out, expected);
});

it('should not prefix selectors in ignored file', () => {
  const out = postcss()
    .use(
      prefixer({
        prefix: '.hello ',
        ignoreFiles: ['ignore-files.css'],
      })
    )
    .process(getFixtureContents('ignore-files.css'), {
      from: 'ignore-files.css',
    }).css;

  const expected = getFixtureContents('ignore-files.expected.css');

  assert.equal(out, expected);
});

it('should prefix selectors in unignored files', () => {
  const out = postcss()
    .use(
      prefixer({
        prefix: '.hello ',
        ignoreFiles: ['ignore-files.css'],
      })
    )
    .process(getFixtureContents('single-selector.css'), {
      from: 'single-selector.css',
    }).css;

  const expected = getFixtureContents('single-selector.expected.css');

  assert.equal(out, expected);
});

it('should prefix selectors in included file', () => {
  const out = postcss()
    .use(
      prefixer({
        prefix: '.hello ',
        includeFiles: ['include-files.css'],
      })
    )
    .process(getFixtureContents('include-files.css'), {
      from: 'include-files.css',
    }).css;

  const expected = getFixtureContents('include-files.expected.css');

  assert.equal(out, expected);
});

it('should work as expected when included array is empty', () => {
  const out = postcss()
    .use(
      prefixer({
        prefix: '.hello ',
        includeFiles: [],
      })
    )
    .process(getFixtureContents('include-files.css'), {
      from: 'include-files.css',
    }).css;

  const expected = getFixtureContents('include-files.expected.css');

  assert.equal(out, expected);
});

it('should work as expected when included two items and mmore in array', () => {
  const out = postcss()
    .use(
      prefixer({
        prefix: '.hello ',
        includeFiles: [
          'include-files.css',
          'single-selector.css',
          'undefined.css',
        ],
      })
    )
    .process(getFixtureContents('include-files.css'), {
      from: 'include-files.css',
    }).css;

  const expected = getFixtureContents('include-files.expected.css');

  assert.equal(out, expected);
});

it('should not prefix selectors in unincluded files', () => {
  const out = postcss()
    .use(
      prefixer({
        prefix: '.hello ',
        includeFiles: ['include-files.css'],
      })
    )
    .process(getFixtureContents('single-selector.css'), {
      from: 'single-selector.css',
    }).css;

  const expected = getFixtureContents('single-selector.css');

  assert.equal(out, expected);
});

it('should use custom symbol between prefix and selector. Use empty to glue', () => {
  const out = postcss()
    .use(
      prefixer({
        prefix: '.hello',
        transform(prefix, selector) {
          return prefix + selector;
        },
      })
    )
    .process(getFixtureContents('between-symbol-selector.css')).css;

  const expected = getFixtureContents('between-symbol-selector.expected.css');

  assert.equal(out, expected);
});

it('should prefix a selector. Use ".hello .world"', () => {
  const out = postcss()
    .use(
      prefixer({
        prefix: '.hello .world',
      })
    )
    .process(getFixtureContents('single-long-selector.css')).css;

  const expected = getFixtureContents('single-long-selector.expected.css');

  assert.equal(out, expected);
});

function getFixtureContents(name) {
  return fs.readFileSync(`test/fixtures/${name}`, 'utf8').trim();
}
