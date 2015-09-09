'use strict';

var gulp = require('gulp');
var nodemon = require('gulp-nodemon');
var jshint = require('gulp-jshint');
var jscs = require('gulp-jscs');
var sass = require('gulp-sass');
var autoprefixer = require('gulp-autoprefixer');

var paths = {
  js: ['./server.js', './app/**/*.js', './api/**/*.js'],
  sass: ['./sass/**/*.scss', './sass/**/_*.scss'],
  css: './public/css'
};


// CSS
gulp.task('sass', function() {
  gulp
    .src(paths.sass)
      .pipe(sass().on('error', sass.logError))
      .pipe(sass({outputStyle: 'expanded'}))
      .pipe(autoprefixer({
        browsers: ['last 2 versions'],
        cascade: false
      }))
      .pipe(gulp.dest(paths.css));
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


// Watch tasks
gulp.task('js-watch', function() {
  gulp.watch(paths.js, ['lint']);
});

gulp.task('sass-watch', function() {
  gulp.watch(paths.sass, ['sass']);
});


gulp.task('dev', ['nodemon', 'js-watch', 'sass-watch']);
gulp.task('default', ['lint', 'sass']);
