// Karma configuration file, see link for more information
// https://karma-runner.github.io/0.13/config/configuration-file.html

module.exports = function (config) {
  config.set({
    basePath: '',
    frameworks: ['jasmine', '@angular/cli'],
    plugins: [
      require('karma-jasmine'),
//      require('karma-chrome-launcher'),
//      require('karma-phantomjs-launcher'),
      require('karma-selenium-launcher'),
      require('karma-coverage-istanbul-reporter'),
      require('karma-spec-reporter'),
      require('@angular/cli/plugins/karma')
    ],
    files: [
      { pattern: './src/test.ts', watched: false }
    ],
    preprocessors: {
      './src/test.ts': ['@angular/cli']
    },
    mime: {
      'text/x-typescript': ['ts','tsx']
    },
    coverageIstanbulReporter: {
      reports: [ 'html', 'lcovonly' ],
      fixWebpackSourcePaths: true
    },
    angularCli: {
      config: './angular-cli.json',
      environment: 'dev'
    },
    reporters: config.angularCli && config.angularCli.codeCoverage
              ? ['spec', 'coverage-istanbul']
              : ['spec'],
    port: 9876,
    colors: true,
    logLevel: config.LOG_INFO,
    autoWatch: true,
    browserNoActivityTimeout: 10000,
    browserDisconnectTimeout: 10000,
    browserDisconnectTolerance: 3,
//    browsers: ['PhantomJS'],
//    browsers: ['Chrome'],
    customLaunchers: {
      selenium_chrome: {
        base: 'Selenium',
        config: {
          desiredCapabilities: {
            //capabilities of driver 
          },
          host: 'selenium',
          port: 4444,
          path: '/wd/hub'
        },
        name: 'Karma Test',
        browserName: 'chrome'
      }
    },
    browsers: ['selenium_chrome'],
    hostname: "test",
    singleRun: false
  });
};
