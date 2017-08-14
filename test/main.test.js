import webpack from 'webpack';
import fs from 'fs';

describe('stylelint-custom-processor', () => {
  let prepWebpack;
  let dummyThrower;
  beforeAll(() => {
    prepWebpack = entry =>
      webpack({
        entry,
        module: {
          rules: [
            {
              test: /\.js$/,
              loader: './index',
              exclude: /node_modules/,
            },
          ],
        },
        output: {
          filename: './test/webpack-test.out.js',
        },
      });

    dummyThrower = e => {
      throw e;
    };
  });

  it('finds errors', done => {
    const webpackInstance = prepWebpack(
      './test/fixtures/styled-components/invalid.js'
    );
    webpackInstance.run((err, stats) => {
      if (err) {
        expect(dummyThrower.bind(null, err)).not.toThrow();
      }

      const json = stats.toJson();
      expect(stats.hasErrors()).toBe(true);
      expect(json.errors.length).toBe(1);
      expect(stats.hasWarnings()).toBe(false);
      done();
    });
  });

  it('handles correct file', done => {
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

  afterAll(() => {
    fs.unlinkSync('./test/webpack-test.out.js');
  });
});
