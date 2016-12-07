
# postcss-prefix-selector

[![NPM version][npm-image]][npm-url]
[![Build status][travis-image]][travis-url]
[![Test coverage][coveralls-image]][coveralls-url]
[![Dependency Status][david-image]][david-url]
[![License][license-image]][license-url]
[![Downloads][downloads-image]][downloads-url]
[![Gittip][gittip-image]][gittip-url]

Prefix every rule with a selector.

## Installation

```console
$ npm install postcss-prefix-selector
```

## Usage

```js
const prefixer = require('postcss-prefix-selector')

// css to be processed
const css = fs.readFileSync("input.css", "utf8")

const out = postcss().use(prefixer({
  prefix: '.some-selector',
  exclude: ['.c'],

  // Optional transform callback for case-by-case overrides
  transform: function (prefix, selector, prefixedSelector) {
    if (selector === 'body') {
      return 'body.' + prefix;
    } else {
      return prefixedSelector;
    }
  }
})).process(css).css
```

Using this `input.css`:

```css
body {
  background: red;
}

.a, .b {
  color: aqua;
}

.c {
  color: coral;
}
```

you will get:

```css
body.some-selector {
  background: red;
}

.some-selector .a, .some-selector .b {
  color: aqua;
}

.c {
  color: coral;
}
```


## Options

- `exclude` - It's possible to avoid prefixing some selectors by passing an array of selectors (strings or regular expressions).
- `transform` - In cases where you may want to use the prefix differently for different selectors, it is possible to pass in a custom transform method.


[npm-image]: https://img.shields.io/npm/v/postcss-prefix-selector.svg?style=flat-square
[npm-url]: https://npmjs.org/package/postcss-prefix-selector
[travis-image]: https://img.shields.io/travis/RadValentin/postcss-prefix-selector.svg?style=flat-square
[travis-url]: https://travis-ci.org/RadValentin/postcss-prefix-selector
[coveralls-image]: https://img.shields.io/coveralls/jonathanong/postcss-prefix-selector.svg?style=flat-square
[coveralls-url]: https://coveralls.io/r/jonathanong/postcss-prefix-selector
[david-image]: http://img.shields.io/david/RadValentin/postcss-prefix-selector.svg?style=flat-square
[david-url]: https://david-dm.org/RadValentin/postcss-prefix-selector
[license-image]: http://img.shields.io/npm/l/postcss-prefix-selector.svg?style=flat-square
[license-url]: LICENSE
[downloads-image]: http://img.shields.io/npm/dm/postcss-prefix-selector.svg?style=flat-square
[downloads-url]: https://npmjs.org/package/postcss-prefix-selector
[gittip-image]: https://img.shields.io/gratipay/jonathanong.svg?style=flat-square
[gittip-url]: https://gratipay.com/jonathanong/
