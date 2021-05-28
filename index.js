module.exports = function postcssPrefixSelector(options) {
  const prefix = options.prefix;
  const prefixWithSpace = /\s+$/.test(prefix) ? prefix : `${prefix} `;
  const ignoreFiles = options.ignoreFiles ? [].concat(options.ignoreFiles) : [];
  const includeFiles = options.includeFiles
    ? [].concat(options.includeFiles)
    : [];

  return function (root) {
    if (
      ignoreFiles.length &&
      root.source.input.file &&
      ignoreFile(root.source.input.file, ignoreFiles)
    ) {
      return;
    }
    if (
      includeFiles.length &&
      root.source.input.file &&
      !includeFile(root.source.input.file, includeFiles)
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
        if (options.exclude && excludeSelector(selector, options.exclude)) {
          return selector;
        }

        if (options.transform) {
          return options.transform(
            prefix,
            selector,
            prefixWithSpace + selector
          );
        }

        return prefixWithSpace + selector;
      });
    });
  };
};

function ignoreFile(file, ignoreArr) {
  return ignoreArr.some((ignoreRule) => {
    if (ignoreRule instanceof RegExp) {
      return ignoreRule.test(file);
    }

    return file.includes(ignoreRule);
  });
}

function includeFile(file, includeArr) {
  return includeArr.some((includeRule) => {
    if (includeRule instanceof RegExp) {
      return includeRule.test(file);
    }

    return file.includes(includeRule);
  });
}

function excludeSelector(selector, excludeArr) {
  return excludeArr.some((excludeRule) => {
    if (excludeRule instanceof RegExp) {
      return excludeRule.test(selector);
    }

    return selector === excludeRule;
  });
}
