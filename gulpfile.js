'use strict';

var gulp   = require('gulp');
var plugins = require('gulp-load-plugins')();

var paths = {
  lint: ['./gulpfile.js', './app/**/*.js'],
  watch: ['./gulpfile.js', './app/**', './test/**/*.js', '!test/{temp,temp/**}'],
  tests: ['./test/**/*.js', '!test/{temp,temp/**}'],
  source: ['./app/js/*.js']
};

var plumberConf = {};

if (process.env.CI) {
  plumberConf.errorHandler = function(err) {
    throw err;
  };
}

gulp.task('lint', function () {
  return gulp.src(paths.lint)
    .pipe(plugins.jshint('.jshintrc'))
    .pipe(plugins.plumber(plumberConf))
    .pipe(plugins.jscs())
    .pipe(plugins.jshint.reporter('jshint-stylish'));
});

gulp.task('istanbul', function (cb) {
  gulp.src(paths.source)
    .pipe(plugins.istanbul()) // Covering files
    .pipe(plugins.istanbul.hookRequire()) // Force `require` to return covered files
    .on('finish', function () {
      gulp.src(paths.tests)
        .pipe(plugins.plumber(plumberConf))
        .pipe(plugins.mocha())
        .pipe(plugins.istanbul.writeReports()) // Creating the reports after tests runned
        .on('finish', function() {
          process.chdir(__dirname);
          cb();
        });
    });
});

gulp.task('watch', ['test'], function () {
  gulp.watch(paths.watch, ['test']);
});

gulp.task('test', ['lint', 'istanbul']);

gulp.task('default', ['test']);
