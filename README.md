# stylelint-custom-processor-loader [![CircleCI][CircleCI-badge]][CircleCI-url]


A Webpack loader for stylelint used with custom processors

## Installation

First install the loader with your favourite package manager
```
yarn add -D stylelint-custom-processor-loader
```
Or with npm
```
npm i -D stylelint-custom-processor-loader
```

### Stylelint Config

As of this early stage stylelint config is loaded only be the default method of `stylelint` as seen in [their documentation](https://stylelint.io/user-guide/configuration/#loading-the-configuration-object). The recommended way is creating a `.stylelintrc` file in the root of your project.

### Webpack Config

This package currently only aims at supporting Webpack 2+
If you are for example using [Styled Components](https://www.styled-components.com/) you could simply add the following to your webpack config:
```js
modules: {
  rules: [
    {
      test: /\.jsx?/,
      loader: 'stylelint-custom-processor-loader',
      exclude: /node_modules/,
    },
  ],
}
```
And you should now have linting your Styled Components css integrated with Webpack!
> NOTE: You would of course have to install and use [`stylelint-processor-styled-components`](https://github.com/styled-components/stylelint-processor-styled-components) as your custom processor in this example.

#### Webpack Babel Example

```js
modules: {
  rules: [
    {
      test: /\.jsx?/,
      use: [
        'babel-loader',
        'stylelint-custom-processor-loader',
       ],
      exclude: /node_modules/,
    },
  ],
}
```
> NOTE: As always with Webpack loaders order can be very important, in general this loader should always be the first one loaded (which means the last one in the list) as seen above in the babel-loader example.

## License

Licensed under the MIT License, Copyright © 2017 Emil Goldsmith Olesen. See [LICENSE](./LICENSE) for more information.

Thank you to [MoOx](https://github.com/MoOx) for his [`eslint-loader`](https://github.com/MoOx/eslint-loader) which was often referenced and used for inspiration during development of this project.


[CircleCI-badge]: https://circleci.com/gh/emilgoldsmith/stylelint-custom-processor-loader/tree/master.svg?style=svg
[CircleCI-url]: https://circleci.com/gh/emilgoldsmith/stylelint-custom-processor-loader/tree/master
