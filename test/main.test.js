import {
  prepWebpack,
  deleteWebpackOutput,
  assertNoErrorsOrWarnings,
  assertSpecificErrors,
  assertSpecificWarnings,
  handleCatch,
} from './helpers';

if (process.env.CIRCLECI) {
  jasmine.DEFAULT_TIMEOUT_INTERVAL = 30000; // eslint-disable-line no-undef
}

describe('stylelint-custom-processor', () => {
  afterAll(deleteWebpackOutput);

  it('finds errors', done => {
    const webpackInstance = prepWebpack(
      './test/fixtures/styled-components/invalid.js'
    );
    const expectedErrorsRegex = /color-named[\s\S]*?max-empty-lines[\s\S]*?declaration-empty-line-before/;
    webpackInstance
      .run()
      .then(assertSpecificErrors(expectedErrorsRegex))
      .then(done)
      .catch(handleCatch);
  });

  it('finds warnings', done => {
    const webpackInstance = prepWebpack(
      './test/fixtures/styled-components/warnings.js'
    );

    const expectedWarningsRegex = /block-no-empty[\s\S]*/;
    webpackInstance
      .run()
      .then(assertSpecificWarnings(expectedWarningsRegex))
      .then(done)
      .catch(handleCatch);
  });

  it('handles correct file', done => {
    const webpackInstance = prepWebpack(
      './test/fixtures/styled-components/valid.js'
    );
    webpackInstance
      .run()
      .then(assertNoErrorsOrWarnings)
      .then(done)
      .catch(handleCatch);
  });
});
