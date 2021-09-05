module.exports = function postcssPrefixSelector(options) {
  const prefix = options.prefix;
  const prefixWithSpace = /\s+$/.test(prefix) ? prefix : `${prefix} `;
  const ignoreFiles = options.ignoreFiles ? [].concat(options.ignoreFiles) : [];
  const includeFiles = options.includeFiles
    ? [].concat(options.includeFiles)
    : [];

  return {
    postcssPlugin: 'postcss-prefix-selector',
    Root(root, { result }) {
      const isFileIgnored =
        ignoreFiles.length &&
        root.source.input.file &&
        isFileInArray(root.source.input.file, ignoreFiles);
      const isFileNotIncluded =
        includeFiles.length &&
        root.source.input.file &&
        !isFileInArray(root.source.input.file, includeFiles);

      if (isFileIgnored || isFileNotIncluded) {
        // TODO: 'skip' should be a symbol or constant
        // NOTE: check how 'messages' works, is there some performance penalty?
        result.messages.push('skip');
      }
    },
    RootExit(root, { result }) {
      // TODO: other plugins might be sending messages. Need to add/remove only our constant.
      result.messages.pop();
    },
    Rule(rule, { result }) {
      // NOTE: other plugins might be sending messages.
      if (result.messages[0] === 'skip') {
        return;
      }

      // NOTE: other plugins might be sending messages.
      if (result.messages.length > 1) {
        console.warn('more than one skip message found!');
      }

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
            prefixWithSpace + selector,
            rule.source.input.file
          );
        }

        return prefixWithSpace + selector;
      });
    },
  };
};

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
}
