import webpack from 'webpack';
import { promisify } from 'bluebird';
import fs from 'fs';

export const prepWebpack = (entry, options) => {
  const rule = {
    loader: './index',
  };
  if (options) {
    Object.assign(rule, { options });
  }
  const webpackInstance = webpack({
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

  webpackInstance.run = promisify(webpackInstance.run);
  return webpackInstance;
};

export const deleteWebpackOutput = () =>
  fs.unlinkSync('./test/webpack-test.out.js');

export const assertNoErrorsOrWarnings = stats => {
  expect(stats.hasErrors()).toBe(false);
  expect(stats.hasWarnings()).toBe(false);
};

/**
 * There should be one argument for each error expected and
 * the argument should be a regex that should match the error
 */
export const assertSpecificErrors = (...args) => stats => {
  expect(stats.hasErrors()).toBe(true);
  const errors = stats.toJson().errors;
  expect(errors.length).toBe(args.length);
  args.forEach((regex, index) => {
    expect(regex.test(errors[index])).toBe(true);
    expect(stats.hasWarnings()).toBe(false);
  });
};

export const assertSpecificWarnings = (...args) => stats => {
  expect(stats.hasWarnings()).toBe(true);
  const warnings = stats.toJson().warnings;
  expect(warnings.length).toBe(args.length);
  args.forEach((regex, index) => {
    expect(regex.test(warnings[index])).toBe(true);
    expect(stats.hasErrors()).toBe(false);
  });
};

const dummyThrower = e => {
  throw e;
};

export const handleCatch = err => {
  expect(dummyThrower.bind(null, err)).not.toThrow();
};
