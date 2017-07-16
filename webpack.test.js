module.exports = {
  entry: './test/fixtures/styled-components-example.js',
  module: {
    rules: [
      {
        test: /\.js/,
        loader: './dist/index',
        exclude: /node_modules/,
      },
    ],
  },
  output: {
    filename: 'test-webpack.js',
  },
};
