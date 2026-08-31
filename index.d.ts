export = prefixPlugin;
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
declare const prefixPlugin: import("postcss").PluginCreator<{
    prefix: string;
    exclude?: (string | RegExp)[];
    transform?: (prefix: string, selector: string, prefixedSelector: string, filePath: string, rule: import("postcss").Rule) => void;
    ignoreFiles?: (string | RegExp)[];
    includeFiles?: (string | RegExp)[];
    skipGlobalSelectors?: boolean;
}>;
