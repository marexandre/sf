'use strict';

var gulp = require('gulp');
var nodemon = require('gulp-nodemon');
var jshint = require('gulp-jshint');
var jscs = require('gulp-jscs');
var sass = require('gulp-sass');

var paths = {
  js: ['./server.js', './app/**/*.js', './api/**/*.js'],
  sass: ['./sass/**/*.scss'],
};


// CSS
gulp.task('sass', function() {
  gulp.src(paths.sass)
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest('./public/css'));
});


// JS
gulp.task('lint', function() {
  return gulp.src(paths.js)
    .pipe(jscs())
    .pipe(jshint())
    .pipe(jshint.reporter('jshint-stylish'))
    .pipe(jshint.reporter('fail'));
});

gulp.task('nodemon', function() {
  nodemon({
    script: 'server.js',
    ext: 'handlebars js',
    env: {'NODE_ENV': 'development'}
  });
});


gulp.task('watch', function() {
  gulp.watch(paths.js, ['lint']);
  gulp.watch(paths.sass, ['sass']);
});


// Tasks
gulp.task('dev', ['nodemon', 'watch']);
gulp.task('default', ['lint', 'scss-lint']);
