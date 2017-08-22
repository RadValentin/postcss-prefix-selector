# postcss-prefix-selector

[![Greenkeeper badge](https://badges.greenkeeper.io/RadValentin/postcss-prefix-selector.svg)](https://greenkeeper.io/)
[![NPM version][npm-image]][npm-url]
[![Build status][travis-image]][travis-url]
[![Test coverage][coveralls-image]][coveralls-url]
[![Dependency Status][david-image]][david-url]
[![License][license-image]][license-url]
[![Downloads][downloads-image]][downloads-url]

> Prefix every rule with a selector

## Table of Contents

- [Install](#install)
- [Usage](#usage)
- [Options](#options)
- [Maintainer](#maintainer)
- [Contribute](#contribute)
- [License](#license)

## Install

```console
$ npm install postcss-prefix-selector
```

This project uses [node](https://nodejs.org) and [npm](https://npmjs.com).

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

You will get:

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

## Maintainer

This project is maintained by [@RadValentin](https://github.com/RadValentin). If you have any questions, feel free to ping me.

## Contribute

Please contribute! If you have any questions or bugs, [open an issue](https://github.com/RadValentin/postcss-prefix-selector). Or, open a pull request with a fix.

This project uses Mocha. If you submit a PR, please add appropriate tests and make sure that everything is green for your branch.

## License

[MIT](LICENSE) © 2015-2017 Jonathan Ong.

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
