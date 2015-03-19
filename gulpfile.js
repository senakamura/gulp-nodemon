var gulp = require('gulp');
var debug = require('gulp-debug');
var jade = require('gulp-jade');
var less = require('gulp-less');

var minify = require('gulp-minify');
var notify = require('gulp-notify');

var browserSync = require('browser-sync');

gulp.task('jade', function() {
  gulp.src('assets/jade/*')
    .pipe(debug())
    .pipe(jade())
    .pipe(gulp.dest('public'));
});

gulp.task('javascript', function() {
  gulp.src('assets/js/**/*.js')
    .pipe(debug())
    .pipe(minify())
    .pipe(gulp.dest('public/js'));
});

gulp.task('browserSync', function() {
  browserSync({
    proxy: 'localhost:8080',
    open: false
  });
});

gulp.task('less', function() {
  gulp.src('assets/less/styles.less')
    .pipe(debug())
    .pipe(less())
      .on('error', handleError)
    .pipe(gulp.dest('public/css'));
});

gulp.task('watch', ['jade', 'less', 'javascript', 'browserSync'], function() {
  gulp.watch('assets/jade/**/*.jade', ['jade']);
  gulp.watch('assets/less/**/*.less', ['less']);
  gulp.watch('assets/js/**/*.js', ['javascript']);
  gulp.watch('assets/**/*', function() {
    browserSync.reload();
  });
});

gulp.task('default', ['watch']);

function handleError(error) {
  this.emit('end');
}
