module.exports = function(config) {
  // Set Env for ChromeHeadless from puppeteer
  process.env.CHROME_BIN = require('puppeteer').executablePath();

  config.set({
    jasmineNodeOpts: {
      defaultTimeoutInterval: 150000,
      showColors: true
    },
    basePath: '',
    frameworks: ['jasmine', '@angular-devkit/build-angular'],
    plugins: [
      require('karma-parallel'),
      require('karma-jasmine'),
      require('karma-chrome-launcher'),
      require('karma-spec-reporter'),
      require('karma-verbose-reporter'),
      require('karma-jasmine-html-reporter'),
      require('karma-coverage-istanbul-reporter'),
      require('karma-junit-reporter'),
      require('@angular-devkit/build-angular/plugins/karma'),
      require('karma-phantomjs-launcher'),
      require('puppeteer')
    ],
    parallelOptions: {
      executors: Math.ceil(require('os').cpus().length / 2),
      shardStrategy: 'round-robin'
    },
    client: {
      clearContext: false // leave Jasmine Spec Runner output visible in browser
    },
    coverageIstanbulReporter: {
      dir: require('path').join(__dirname, 'coverage'),
      reports: ['html', 'lcovonly', 'text-summary'],
      fixWebpackSourcePaths: true,
      combineBrowserReports: true
    },
    reporters: ['progress', 'kjhtml', 'spec'],
    port: 9876,
    colors: true,
    logLevel: config.LOG_INFO,
    autoWatch: true,
    browsers: ['ChromeHeadlessCI'],
    customLaunchers: {
      ChromeHeadlessCI: {
        base: 'ChromeHeadless',
        flags: ['--no-sandbox', '--disable-gpu']
      }
    },
    singleRun: false,
    captureTimeout: 210000,
    browserDisconnectTolerance: 3,
    browserDisconnectTimeout: 210000,
    browserNoActivityTimeout: 210000,
    defaultTimeoutInterval: 210000,
    allScriptsTimeout: 2000000
  });
};
