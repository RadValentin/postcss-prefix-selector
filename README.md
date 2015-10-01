
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
var prefix = require('postcss-prefix-selector')

// css to be processed
var css = fs.readFileSync("input.css", "utf8")

var out = postcss().use(prefix({
  prefix: '.some-selector ', // <--- notice the traililng space!
  exclude: ['.c']
})).process(css).css
```

Using this `input.css`:

```css
.a, .b {
  color: aqua;
}

.c {
  color: coral;
}
```

you will get:

```css
.some-selector .a, .some-selector .b {
  color: aqua;
}

.c {
  color: coral;
}
```


## Options

It's possible to avoid prefixing some selectors by using the `exclude` option which takes an array of selectors as a parameter.


[gitter-image]: https://badges.gitter.im/jonathanong/postcss-prefix-selector.png
[gitter-url]: https://gitter.im/jonathanong/postcss-prefix-selector
[npm-image]: https://img.shields.io/npm/v/postcss-prefix-selector.svg?style=flat-square
[npm-url]: https://npmjs.org/package/postcss-prefix-selector
[github-tag]: http://img.shields.io/github/tag/jonathanong/postcss-prefix-selector.svg?style=flat-square
[github-url]: https://github.com/jonathanong/postcss-prefix-selector/tags
[travis-image]: https://img.shields.io/travis/jonathanong/postcss-prefix-selector.svg?style=flat-square
[travis-url]: https://travis-ci.org/jonathanong/postcss-prefix-selector
[coveralls-image]: https://img.shields.io/coveralls/jonathanong/postcss-prefix-selector.svg?style=flat-square
[coveralls-url]: https://coveralls.io/r/jonathanong/postcss-prefix-selector
[david-image]: http://img.shields.io/david/jonathanong/postcss-prefix-selector.svg?style=flat-square
[david-url]: https://david-dm.org/jonathanong/postcss-prefix-selector
[license-image]: http://img.shields.io/npm/l/postcss-prefix-selector.svg?style=flat-square
[license-url]: LICENSE
[downloads-image]: http://img.shields.io/npm/dm/postcss-prefix-selector.svg?style=flat-square
[downloads-url]: https://npmjs.org/package/postcss-prefix-selector
[gittip-image]: https://img.shields.io/gratipay/jonathanong.svg?style=flat-square
[gittip-url]: https://gratipay.com/jonathanong/
