# stylelint-custom-processor-loader 

A Webpack loader for stylelint used with custom processors

[![npm-version][npm-badge]][npm-url]
[![CircleCI][CircleCI-badge]][CircleCI-url]
[![Greenkeeper][Greenkeeper-badge]][Greenkeeper-url]

![Video of loader in use](https://i.imgur.com/4DVnnO8.gif)

## Motivation

I wrote this Webpack loader when I first encountered [Styled Components](https://www.styled-components.com/) and wanted to integrate my Styled Components Stylelint linting (using the [`stylelint-processor-styled-components`](https://github.com/styled-components/stylelint-processor-styled-components) processor) into my Webpack setup so I could have it show up in my Hot Reloading (as shown in the gif above) etc. The loader I found was [`stylelint-loader`](https://github.com/adrianhall/stylelint-loader) though, and it had been deprecated and was referring to [`postcss-loader`](https://www.npmjs.com/package/postcss-loader#stylelint) and another loader that both didn't work for javascript, but only css files, and therefore not Styled Components. Actually the deprecated loader itself supports custom processors for Stylelint, but due to it no longer being under development, and also the fact that when I looked at the code I disagreed with quite a few of the choices, I decided to write my own webpack loader for this use case.

## When should I use this loader?

If you just want to use normal Stylelint I would definitely suggest using the [`postcss-loader`](https://www.npmjs.com/package/postcss-loader#stylelint) instead of this package. This package was mainly written for Styled Components but also aims to support any other custom processor of Stylelint such as [`stylelint-processor-markdown`](https://github.com/mapbox/stylelint-processor-markdown) and [`stylelint-processor-html`](https://github.com/ccbikai/stylelint-processor-html).

## Installation

First install the loader and stylelint with your favourite package manager
```
yarn add -D stylelint-custom-processor-loader
```
Or with npm
```
npm i -D stylelint-custom-processor-loader
```

This package will not work without [stylelint](https://github.com/stylelint/stylelint) as it is a peer dependency in the `package.json` and it is just a development tool to connect webpack and stylelint together.

### Stylelint Config

Stylelint config can be added as a file in the default way as seen in [Stylelint's documentation](https://stylelint.io/user-guide/configuration/#loading-the-configuration-object). The recommended way is creating a `.stylelintrc` file in the root of your project, but if you want to use a custom file path you can also use the [configPath](https://github.com/emilgoldsmith/stylelint-custom-processor-loader/blob/master/README.md#configPath) option.

### Webpack Config

This package currently only aims at supporting Webpack 2+.

If you are for example using [Styled Components](https://www.styled-components.com/) you could simply add the following to your webpack config:
```js
module: {
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
module: {
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

## Options
### configPath
Give the path to a non-default named Stylelint config. The recommended way to specify it is in your Webpack config as follows:
```js
module: {
  rules: [
    {
      test: /\.jsx?/,
      use: [
        'babel-loader',
        {
          loader: 'stylelint-custom-processor-loader',
          options: {
            configPath: './path/to/stylelint/config',
          },
        },
      ],
      exclude: /node_modules/,
    },
  ],
}
```

### emitWarning (default: `false`)

Always return warnings if this option is set to `true`. If you're using hot module replacement, you may wish to enable this in development, or else updates will be skipped when there's a stylelint error.

## License

Licensed under the MIT License, Copyright © 2017 Emil Goldsmith Olesen. See [LICENSE](./LICENSE) for more information.

Thank you to [MoOx](https://github.com/MoOx) for his [`eslint-loader`](https://github.com/MoOx/eslint-loader) which was often referenced and used for inspiration during development of this project.


[CircleCI-badge]: https://img.shields.io/circleci/project/github/emilgoldsmith/stylelint-custom-processor-loader/master.svg
[CircleCI-url]: https://circleci.com/gh/emilgoldsmith/stylelint-custom-processor-loader/tree/master
[Greenkeeper-badge]: https://badges.greenkeeper.io/emilgoldsmith/stylelint-custom-processor-loader.svg
[Greenkeeper-url]: https://greenkeeper.io
[npm-badge]: https://img.shields.io/npm/v/stylelint-custom-processor-loader.svg
[npm-url]: https://www.npmjs.com/package/stylelint-custom-processor-loader
