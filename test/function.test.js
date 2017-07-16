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
    })
    .run((err, stats) => {
      if (err) {
        const dummyThrower = e => {
          throw e;
        }
        expect(dummyThrower.bind(null, err)).not.toThrow();
        return done();
      }
      const json = stats.toJson();
      if (stats.hasErrors()) {
        json.errors.forEach(err => console.log(err));
      }
      if (stats.hasWarnings()) {
        json.warnings.forEach(warn => console.log(warn));
      }
      done();
    });
  });

  afterAll(() => {
    fs.unlinkSync('./test/webpack-test.out.js');
  });
});
