# postcss-prefix-selector

[![NPM version][npm-image]][npm-url]
[![Test coverage][coveralls-image]][coveralls-url]
[![License][license-image]][license-url]
[![Downloads][downloads-image]][downloads-url]
[![Gitpod ready-to-code][gitpod-image]][gitpod-url]

> Prefix every CSS selector with a custom namespace `.a => .prefix .a`

## Table of Contents

- [Install](#install)
- [Usage with PostCSS](#usage-with-postcss)
- [Usage with Webpack](#usage-with-webpack)
- [Usage with Vite](#usage-with-vite)
- [Options](#options)
- [Maintainer](#maintainer)
- [Contribute](#contribute)
- [License](#license)

## Install

```console
$ npm install postcss-prefix-selector
```

## Usage with PostCSS

A prefix is added before most selectors. Below is an example of how CSS will be transformed by adding a prefix called `.namespace`.

```js
const prefixer = require('postcss-prefix-selector')

// css to be processed
const css = fs.readFileSync("input.css", "utf8")

const out = postcss().use(prefixer({
  prefix: '.namespace',
  exclude: ['.c'],
})).process(css).css
```

```css
/* Input */
.a, .b {
  color: aqua;
}

.c {
  color: coral;
}

/* Output */
.namespace .a, .namespace .b {
  color: aqua;
}

.c {
  color: coral;
}
```

Please note that global selectors (`html`, `body`, `:root`) cannot be prefixed so instead they will be replaced with the prefix. This behaviour can be disabled with the `skipGlobalSelectors` option.

```css
/* Input */
:root { --bs-blue:#0d6efd; }
html { padding: 0; }
body { margin: 0; }

/* Output */
.namespace { --bs-blue:#0d6efd; }
.namespace { padding: 0; }
.namespace { margin: 0; }
```

It's also possible to customize the way prefixing is done by defining a transform function:

```js
const out = postcss().use(prefixer({
  prefix: '.namespace',
  // Optional transform callback for case-by-case overrides
  transform: function (prefix, selector, prefixedSelector, filePath, rule) {
    if (selector === 'body') {
      return 'body' + prefix;
    } else {
      return prefixedSelector;
    }
  }
})).process(css).css
```

```css
/* Input */
body {
  background: red;
}

/* Output */
body.namespace {
  background: red;
}
```

## Usage with webpack

Use it like you'd use any other PostCSS plugin. If you also have `autoprefixer` in your webpack config then make sure that `postcss-prefix-selector` is called first. This is needed to avoid running the prefixer twice on both standard selectors and vendor specific ones (ex: `@keyframes` and `@webkit-keyframes`).

```js
module: {
  rules: [{
    test: /\.css$/,
    use: [
      require.resolve('style-loader'),
      require.resolve('css-loader'),
      {
        loader: require.resolve('postcss-loader'),
        options: {
          postcssOptions: {
            plugins: {
              "postcss-prefix-selector": {
                prefix: '.my-prefix',
                transform(prefix, selector, prefixedSelector, filePath, rule) {
                  if (selector.match(/^(html|body)/)) {
                    return selector.replace(/^([^\s]*)/, `$1 ${prefix}`);
                  }
                  
                  if (filePath.match(/node_modules/)) {
                    return selector; // Do not prefix styles imported from node_modules
                  }
                  
                  const annotation = rule.prev();
                  if (annotation?.type === 'comment' && annotation.text.trim() === 'no-prefix') {
                    return selector; // Do not prefix style rules that are preceded by: /* no-prefix */
                  }

                  return prefixedSelector;
                },
              },
              autoprefixer: {
                browsers: ['last 4 versions']
              }
            }
          }
        }
      }
    ]
  }]
}
```


## Usage with Vite

Following the same way of Webpack but for Vite:

```js
import prefixer from 'postcss-prefix-selector';
import autoprefixer from 'autoprefixer';

...

export default defineConfig({
...
  css: {
    postcss: {
      plugins: [
        prefixer({
          prefix: '.my-prefix',
          transform(prefix, selector, prefixedSelector, filePath, rule) {
            if (selector.match(/^(html|body)/)) {
              return selector.replace(/^([^\s]*)/, `$1 ${prefix}`);
            }

            if (filePath.match(/node_modules/)) {
              return selector; // Do not prefix styles imported from node_modules
            }

            const annotation = rule.prev();
            if (annotation?.type === 'comment' && annotation.text.trim() === 'no-prefix') {
              return selector; // Do not prefix style rules that are preceded by: /* no-prefix */
            }

            return prefixedSelector;
          },
        }),

        autoprefixer({}) // add options if needed
      ],
    }
  },
...
});  
```

## Options

| Name | Type | Description |
|-|-|-|
| `prefix` | `string` | This string is added before every CSS selector |
| `exclude` | `string[]` or `RegExp[]` | It's possible to avoid prefixing some selectors by passing an array of selectors |
| `transform` | `Function` | In cases where you may want to use the prefix differently for different selectors, it is possible to pass in a custom transform method |
| `ignoreFiles` | `string[]` or `RegExp[]` | List of ignored files for processing |
| `includeFiles` | `string[]` or `RegExp[]` | List of included files for processing |
| `skipGlobalSelectors` | `boolean` |  When enabled, global selectors (`html`, `body`, `root`) won't be modified by the prefixer. Default: `false`. | 

## Maintainer

This project was originally created by [@jongleberry](https://github.com/jonathanong) and is being maintained by [@RadValentin](https://github.com/RadValentin). If you have any questions, feel free to ping the latter.

## Contribute

Please contribute! If you have any questions or bugs, [open an issue](https://github.com/RadValentin/postcss-prefix-selector/issues/new). Or, open a pull request with a fix.

This project uses Mocha. If you submit a PR, please add appropriate tests and make sure that everything is green for your branch.

## License

[MIT](LICENSE) © 2015-2024 Jonathan Ong.

[gitpod-image]: https://img.shields.io/badge/Gitpod-ready--to--code-blue?logo=gitpod
[gitpod-url]: https://gitpod.io/#https://github.com/RadValentin/postcss-prefix-selector
[npm-image]: https://img.shields.io/npm/v/postcss-prefix-selector.svg?style=flat-square
[npm-url]: https://npmjs.org/package/postcss-prefix-selector
[coveralls-image]: https://img.shields.io/coveralls/jonathanong/postcss-prefix-selector.svg?style=flat-square
[coveralls-url]: https://coveralls.io/r/jonathanong/postcss-prefix-selector
[license-image]: http://img.shields.io/npm/l/postcss-prefix-selector.svg?style=flat-square
[license-url]: LICENSE
[downloads-image]: http://img.shields.io/npm/dm/postcss-prefix-selector.svg?style=flat-square
[downloads-url]: https://npmjs.org/package/postcss-prefix-selector
