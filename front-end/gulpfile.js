'use strict';
 
let gulp = require('gulp');
let sass = require('gulp-sass');
 
gulp.task('sass', () => {
  return gulp.src('styles/style.scss')
    .pipe(sass().on('error', sass.logError));
    .pipe(gulp.dest('./styles'));
});
 
gulp.task('sass:watch', () => {
  gulp.watch('styles/style.scss', ['sass']);
});