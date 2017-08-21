import webpack from 'webpack';
import fs from 'fs';

describe('options', () => {
  const prepWebpack = (entry, options) => {
    const rule = {
      loader: './index',
    };
    if (options) {
      Object.assign(rule, { options });
    }
    return webpack({
      entry,
      module: {
        rules: [
          {
            test: /\.css$/,
            exclude: /node_modules/,
            use: 'css-loader',
          },
          {
            exclude: /node_modules/,
            use: [rule],
          },
        ],
      },
      output: {
        filename: './test/webpack-test.out.js',
      },
    });
  };

  const dummyThrower = e => {
    throw e;
  };

  it('handles no options passed', done => {
    const webpackInstance = prepWebpack(
      './test/fixtures/styled-components/valid.js'
    );
    webpackInstance.run((err, stats) => {
      if (err) {
        expect(dummyThrower.bind(null, err)).not.toThrow();
      }

      expect(stats.hasErrors()).toBe(false);
      expect(stats.hasWarnings()).toBe(false);
      done();
    });
  });

  it('handles configPath option', done => {
    const webpackInstance = prepWebpack(
      './test/fixtures/styled-components/valid.js',
      {
        configPath: './test/configs/styled-components.json',
      }
    );
    webpackInstance.run((err, stats) => {
      if (err) {
        expect(dummyThrower.bind(null, err)).not.toThrow();
      }

      expect(stats.hasErrors()).toBe(false);
      expect(stats.hasWarnings()).toBe(false);
      done();
    });
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

    plainWebpack.run((err, stats) => {
      if (err) {
        expect(dummyThrower.bind(null, err)).not.toThrow();
      }

      expect(stats.hasErrors()).toBe(false);
      expect(stats.hasWarnings()).toBe(false);
      noNamedColorWebpack.run((err, stats) => {
        if (err) {
          expect(dummyThrower.bind(null, err)).not.toThrow();
        }

        expect(stats.hasErrors()).toBe(true);
        const errors = stats.toJson().errors;
        expect(errors.length).toBe(1);
        expect(/Unexpected named color/.test(errors[0])).toBe(true);
        expect(stats.hasWarnings()).toBe(false);
        done();
      });
    });
  });

  afterAll(() => {
    fs.unlinkSync('./test/webpack-test.out.js');
  });
});
