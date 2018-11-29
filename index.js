import stylelint from 'stylelint';
import loaderUtils from 'loader-utils';
import { join } from 'path';

/**
 * Class representing a StylelintError.
 * @extends Error
 */
class StylelintError extends Error {
  /**
   * Create a StylelintError.
   * @param {string} messages - Formatted stylelint errors.
   */
  constructor(messages) {
    super();
    this.name = 'StylelintError';
    this.message = messages;
    this.stack = '';
  }

  /**
   * Returns a stringified representation of our error. This is called
   * when an error is consumed by console methods
   * ex: console.error(new StylelintError(formattedMessage))
   * @return {string} error - A stringified representation of the error.
   */
  inspect() {
    return this.message;
  }
}

const projectRoot = process.cwd();
function resolveConfigPath(configPath) {
  return (
    require.resolve(join(projectRoot, configPath)) ||
    require.resolve(configPath)
  );
}

// eslint-disable-next-line func-names
module.exports = function(content) {
  const options = loaderUtils.getOptions(this);
  const lintArgument = {
    code: content,
    codeFilename: this.resourcePath,
    formatter: 'string',
  };

  // shortcut for emitWarning option
  const emitWarning = options && options.emitWarning;

  if (options && options.configPath) {
    try {
      options.configPath = resolveConfigPath(options.config);
    } catch (error) {
      let processedPath = loaderUtils.stringifyRequest(
        this,
        options.configPath
      );
      processedPath = processedPath.substring(1, processedPath.length - 1);
      lintArgument.configFile = processedPath;
    }
  }
  const callback = this.async();
  stylelint
    .lint(lintArgument)
    .then(resultObject => {
      const { output } = resultObject;
      if (resultObject.errored && !emitWarning) {
        this.emitError(new StylelintError(output));
      } else if (output) {
        this.emitWarning(new StylelintError(output));
      }
      callback(null, content);
    })
    .catch(e => {
      callback(e);
    });
};
