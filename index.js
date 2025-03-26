/**
 * @type {import('postcss').PluginCreator<{
 *  prefix: string,
 *  exclude?: (string|RegExp)[],
 *  transform?: (prefix: string, selector: string, prefixedSelector: string, filePath: string, rule: import('postcss').Rule) => void
 *  ignoreFiles?: (string|RegExp)[],
 *  includeFiles?: (string|RegExp)[],
 *  skipGlobalSelectors?: boolean
 * }>}
 */
const prefixPlugin = (options = {}) => {
  const prefix = options.prefix;
  const prefixWithSpace = /\s+$/.test(prefix) ? prefix : `${prefix} `;
  const ignoreFiles = options.ignoreFiles ? [].concat(options.ignoreFiles) : [];
  const includeFiles = options.includeFiles
    ? [].concat(options.includeFiles)
    : [];

  return {
    postcssPlugin: 'postcss-prefix-selector',
    prepare(result) { 
      const root = result.root;
      const file = root.source.input.file;

      // Skip ignored or non included files
      if (ignoreFiles.length && file && isFileInArray(file, ignoreFiles)) {
        return;
      } else if (includeFiles.length && file && !isFileInArray(file, includeFiles)) {
        return;
      }

      return {
        Rule(rule, { result }) {
          const keyframeRules = [
            'keyframes',
            '-webkit-keyframes',
            '-moz-keyframes',
            '-o-keyframes',
            '-ms-keyframes',
          ];

          if (rule.parent && keyframeRules.includes(rule.parent.name)) {
            return;
          }

          rule.selectors = rule.selectors.map((selector) => {
            if (options.exclude && excludeSelector(selector, options.exclude)) {
              return selector;
            }

            if (options.transform) {
              return options.transform(
                prefix,
                selector,
                prefixWithSpace + selector,
                root.source.input.file,
                rule
              );
            }

            // replace :root, body, html with the prefix
            if ([':root', 'body', 'html'].some(globalSel => selector.startsWith(globalSel))) {
              if (options.skipGlobalSelectors) {
                return selector;
              }

              return selector.replace(/(html\s+body|:root\s+body|html|:root|body)/gm, prefix);
            }

            return prefixWithSpace + selector;
          });
        }
      };
    }
  }
}

function isFileInArray(file, arr) {
  return arr.some((ruleOrString) => {
    if (ruleOrString instanceof RegExp) {
      return ruleOrString.test(file);
    }

    return file.includes(ruleOrString);
  });
}

function excludeSelector(selector, excludeArr) {
  return excludeArr.some((excludeRule) => {
    if (excludeRule instanceof RegExp) {
      return excludeRule.test(selector);
    }

    return selector === excludeRule;
  });
};

prefixPlugin.postcss = true

module.exports = prefixPlugin;
