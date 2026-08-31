export = prefixPlugin;
/**
 * @type {import('postcss').PluginCreator<{
 *  prefix: string,
 *  exclude?: ReadonlyArray<string | RegExp>,
 *  transform?: (prefix: string, selector: string, prefixedSelector: string, filePath: string | undefined, rule: import('postcss').Rule) => string
 *  ignoreFiles?: ReadonlyArray<string|RegExp>,
 *  includeFiles?: ReadonlyArray<string|RegExp>,
 *  skipGlobalSelectors?: boolean
 * }>}
 */
declare const prefixPlugin: import("postcss").PluginCreator<{
    prefix: string;
    exclude?: ReadonlyArray<string | RegExp>;
    transform?: (prefix: string, selector: string, prefixedSelector: string, filePath: string | undefined, rule: import("postcss").Rule) => string;
    ignoreFiles?: ReadonlyArray<string | RegExp>;
    includeFiles?: ReadonlyArray<string | RegExp>;
    skipGlobalSelectors?: boolean;
}>;
