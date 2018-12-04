# Changelog
All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](http://keepachangelog.com/en/1.0.0/)
and this project adheres to [Semantic Versioning](http://semver.org/spec/v2.0.0.html).

## [Unreleased]

## [0.6.0] - 2018-12-04
### Fixed
- Rework resolution of config to fix #64 (see #65)

## [0.5.0] - 2018-04-09
### Added
- emitWarning option which instructs the loader to emit all errors as webpack warnings

## [0.4.0] - 2017-10-24
### Fixed
- Webpack now also outputs Stylelint warnings

### Added
- If there are only warnings Webpack will output a warning instead of an error

## [0.3.0] - 2017-10-02
### Changed
- Updated Stylelint peerDependency to >= 7.8
- Updated Webpack peerDependency to >= 2
- Updated recommended Node version to >= 6

## [0.2.1] - 2017-09-05
### Fixed
- Updated peerDependencies to be in sync with devDependencies

## [0.2.0] - 2017-08-23
### Added
- CODEOWNERS file
- configPath option

### Upgraded
- eslint
- stylelint-processor-styled-components

## [0.1.1] - 2017-08-15
### Added
- CircleCI
- Coveralls
- Greenkeeper
- Push + commit hooks for dev
- Completion of tests
- Completion of README.md

### Upgraded
- stylelint
- stylelint-config-standard
- styleling-processor-styled-components

## 0.1.0 - 2017-07-17
### Added
- Basic implementation


[Unreleased]: https://github.com/emilgoldsmith/stylelint-custom-processor-loader/compare/v0.6.0...HEAD
[0.6.0]: https://github.com/emilgoldsmith/stylelint-custom-processor-loader/compare/v0.5.0...v0.6.0
[0.5.0]: https://github.com/emilgoldsmith/stylelint-custom-processor-loader/compare/v0.4.0...v0.5.0
[0.4.0]: https://github.com/emilgoldsmith/stylelint-custom-processor-loader/compare/v0.3.0...v0.4.0
[0.3.0]: https://github.com/emilgoldsmith/stylelint-custom-processor-loader/compare/v0.2.1...v0.3.0
[0.2.1]: https://github.com/emilgoldsmith/stylelint-custom-processor-loader/compare/v0.2.0...v0.2.1
[0.2.0]: https://github.com/emilgoldsmith/stylelint-custom-processor-loader/compare/v0.1.1...v0.2.0
[0.1.1]: https://github.com/emilgoldsmith/stylelint-custom-processor-loader/compare/v0.1.0...v0.1.1
