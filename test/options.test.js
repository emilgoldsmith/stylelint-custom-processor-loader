import {
  prepWebpack,
  deleteWebpackOutput,
  assertNoErrors,
  assertSpecificErrors,
} from './helpers';

if (process.env.CIRCLECI) {
  jest.setTimeout(5000);
}

describe('options', () => {
  afterAll(deleteWebpackOutput);

  it('handles no options passed', () => {
    const webpackInstance = prepWebpack(
      `${__dirname}/fixtures/styled-components/valid.js`
    );
    return webpackInstance.run().then(assertNoErrors);
  });

  it('handles configPath option', () => {
    const webpackInstance = prepWebpack(
      `${__dirname}/fixtures/styled-components/valid.js`,
      {
        configPath: `${__dirname}/configs/styled-components.json`,
      }
    );
    return webpackInstance.run().then(assertNoErrors);
  });

  it('chooses correct config', () => {
    const plainWebpack = prepWebpack(
      `${__dirname}/fixtures/config-tests/color-named.css`,
      {
        configPath: `${__dirname}/configs/plain.json`,
      }
    );
    const noNamedColorWebpack = prepWebpack(
      `${__dirname}/fixtures/config-tests/color-named.css`,
      {
        configPath: `${__dirname}/configs/color-named.json`,
      }
    );

    const plainWebpackPromise = plainWebpack.run().then(assertNoErrors);
    const noNamedColorWebpackPromise = noNamedColorWebpack
      .run()
      .then(assertSpecificErrors(/color-named/));

    return Promise.all([plainWebpackPromise, noNamedColorWebpackPromise]);
  });
});
