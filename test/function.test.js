import webpack from 'webpack';
import fs from 'fs';

describe('general functionality', () => {
  it('works', done => {
    webpack({
      entry: './test/fixtures/styled-components-example.js',
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
    }).run((err, stats) => {
      if (err) {
        const dummyThrower = e => {
          throw e;
        };
        expect(dummyThrower.bind(null, err)).not.toThrow();
        done();
        return;
      }
      const json = stats.toJson();
      if (stats.hasErrors()) {
        // eslint-disable-next-line no-console
        json.errors.forEach(stylelintError => console.log(stylelintError));
      }
      if (stats.hasWarnings()) {
        // eslint-disable-next-line no-console
        json.warnings.forEach(warn => console.log(warn));
      }
      done();
    });
  });

  afterAll(() => {
    fs.unlinkSync('./test/webpack-test.out.js');
  });
});
