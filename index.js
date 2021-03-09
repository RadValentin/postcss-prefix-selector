module.exports = function postcssPrefixSelector(options) {
  const { prefix, bethSymbol = ' ' } = options;
  const prefixWithSymbol = prefix.trim() + bethSymbol;
  const ignoreFiles = options.ignoreFiles ? [].concat(options.ignoreFiles) : [];
  const includeFiles = options.includeFiles
    ? [].concat(options.includeFiles)
    : [];

  const searchSelector = (selector, searchArray) => {
    return searchArray.some((rule) => {
      if (rule instanceof RegExp) {
        return rule.test(selector);
      }

      return selector === rule;
    });
  };

  return function (root) {
    if (
      root.source.input.file &&
      ignoreFiles.some((file) => root.source.input.file.includes(file))
    ) {
      return;
    }
    if (
      root.source.input.file &&
      includeFiles.some((file) => !root.source.input.file.includes(file))
    ) {
      return;
    }

    root.walkRules((rule) => {
      const keyframeRules = [
        'keyframes',
        '-webkit-keyframes',
        '-moz-keyframes',
        '-o-keyframes',
      ];

      if (rule.parent && keyframeRules.includes(rule.parent.name)) {
        return;
      }

      rule.selectors = rule.selectors.map((selector) => {
        if (options.exclude && searchSelector(selector, options.exclude)) {
          return selector;
        }

        if (options.transform) {
          return options.transform(
            prefix,
            selector,
            prefixWithSymbol + selector
          );
        }

        return prefixWithSymbol + selector;
      });
    });
  };
};
