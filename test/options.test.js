import {
  prepWebpack,
  deleteWebpackOutput,
  assertNoErrors,
  handleCatch,
  assertSpecificErrors,
} from './helpers';

if (process.env.CIRCLECI) {
  jasmine.DEFAULT_TIMEOUT_INTERVAL = 30000; // eslint-disable-line no-undef
}

describe('options', () => {
  afterAll(deleteWebpackOutput);

  it('handles no options passed', done => {
    const webpackInstance = prepWebpack(
      './test/fixtures/styled-components/valid.js'
    );
    webpackInstance.run().then(assertNoErrors).then(done).catch(handleCatch);
  });

  it('handles configPath option', done => {
    const webpackInstance = prepWebpack(
      './test/fixtures/styled-components/valid.js',
      {
        configPath: './test/configs/styled-components.json',
      }
    );
    webpackInstance.run().then(assertNoErrors).then(done).catch(handleCatch);
  });

  it('chooses correct config', done => {
    const plainWebpack = prepWebpack(
      './test/fixtures/config-tests/color-named.css',
      {
        configPath: './test/configs/plain.json',
      }
    );
    const noNamedColorWebpack = prepWebpack(
      './test/fixtures/config-tests/color-named.css',
      {
        configPath: './test/configs/color-named.json',
      }
    );

    const plainWebpackPromise = plainWebpack.run().then(assertNoErrors);
    const noNamedColorWebpackPromise = noNamedColorWebpack
      .run()
      .then(assertSpecificErrors(/color-named/));

    Promise.all([plainWebpackPromise, noNamedColorWebpackPromise])
      .then(done)
      .catch(handleCatch);
  });
});
