'use strict';

import stylelint from 'stylelint';
import loaderUtils from 'loader-utils';

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
    this.name = "StylelintError";
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

module.exports = function(content) {
  const callback = this.async();
  stylelint
    .lint({
      code: content,
      codeFilename: this.resourcePath,
      formatter: 'string',
    })
    .then(resultObject => {
      const { output } = resultObject;
      if (resultObject.errored) {
        this.emitError(new StylelintError(output));
      }
      callback(null, content);
    })
    .catch(e => {
      callback(e);
    });
};
