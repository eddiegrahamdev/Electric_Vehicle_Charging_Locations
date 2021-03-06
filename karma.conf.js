//jshint strict: false
module.exports = function (config) {
    config.set({
        basePath: './app',

        files: [
            'bower_components/angular/angular.min.js',
            'bower_components/angular-route/angular-route.min.js',
            'bower_components/angular-mocks/angular-mocks.js',
            'bower_components/lodash/dist/lodash.js',
            'components/**/*.js',
            'views/**/*.js',
            'components/**/*.html'
        ],

        autoWatch: true,

        frameworks: ['jasmine'],

        browsers: ['Chrome'],

        plugins: [
            'karma-chrome-launcher',
            'karma-firefox-launcher',
            'karma-jasmine',
            'karma-junit-reporter',
            'karma-ng-html2js-preprocessor'
        ],

        junitReporter: {
            outputFile: 'test_out/unit.xml',
            suite: 'unit'
        },

        preprocessors: {
            'components/**/*.html': ['ng-html2js']
        },

        ngHtml2JsPreprocessor: {
            moduleName: 'templates'
        }
    });
};
