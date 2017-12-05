import {
  prepWebpack,
  deleteWebpackOutput,
  assertNoErrorsOrWarnings,
  assertSpecificErrors,
  assertSpecificWarnings,
} from './helpers';

if (process.env.CIRCLECI) {
  jest.setTimeout(5000);
}

describe('stylelint-custom-processor', () => {
  afterAll(deleteWebpackOutput);

  it('finds errors', () => {
    const webpackInstance = prepWebpack(
      `${__dirname}/fixtures/styled-components/invalid.js`
    );
    const expectedErrorsRegex = /color-named[\s\S]*?max-empty-lines[\s\S]*?declaration-empty-line-before/;
    return webpackInstance
      .run()
      .then(assertSpecificErrors(expectedErrorsRegex));
  });

  it('finds warnings', () => {
    const webpackInstance = prepWebpack(
      `${__dirname}/fixtures/styled-components/warnings.js`
    );

    const expectedWarningsRegex = /block-no-empty[\s\S]*/;
    return webpackInstance
      .run()
      .then(assertSpecificWarnings(expectedWarningsRegex));
  });

  it('handles correct file', () => {
    const webpackInstance = prepWebpack(
      `${__dirname}/fixtures/styled-components/valid.js`
    );
    return webpackInstance.run().then(assertNoErrorsOrWarnings);
  });
});
