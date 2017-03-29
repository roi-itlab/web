[![Build Status](https://travis-ci.org/roi-itlab/web.svg?branch=master)](https://travis-ci.org/roi-itlab/web)

# Cassandra Premium Web

This project was generated with [angular-cli](https://github.com/angular/angular-cli).

## Start
Run `npm install`

## Development server
Run `npm run start` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Build

Run `npm run build` to build the project. The build artifacts will be stored in the `dist/` directory.

## Running unit tests

Run `npm run test-once` or `npm run test-chrome` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `npm run e2e` or `npm run e2e-chrome` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/). 

## Docker
Run once `docker-compose up install` (or `docker-compose run install`). On Windows you may need to add `-d` option and run `docker-compose logs install` to see the output.

Run `docker-compose up test` for unit tests.

Run `docker-compose up -d e2e stubby selenium` and `docker-compose up test-e2e` for E2E tests.

## Download Intensity Map geojson files
Run `npm run routes`.

## Further help

Check scripts in package.json for more options to run with `npm run`.
To get more help on the `angular-cli` use `npm run help` or go check out the [Angular-CLI README](https://github.com/angular/angular-cli/blob/master/README.md).


