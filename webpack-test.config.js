module.exports = {
  entry: './test/fixtures/styled-components/valid.js',
  module: {
    rules: [
      {
        test: /\.js/,
        exclude: /node_modules/,
        use: [{
          loader: './dist/index',
          options: {
            configPath: './test/configs/styled-components.json',
          },
        }],
      },
    ],
  },
  output: {
    filename: 'webpack-test.out.js',
  },
};
