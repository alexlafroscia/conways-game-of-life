var gulp          = require('gulp');
var react         = require('gulp-react');
var gulpFilter    = require('gulp-filter');

gulp.task('compile-dependencies', function() {
  return gulp.src([
    'node_modules/react/dist/react.js'
  ])
  .pipe(gulp.dest('dist'));
});

gulp.task('compile-app-js', function () {
  var reactTempFilter = gulpFilter('**/*.jax');
  var jsFilter        = gulpFilter('**/*.js');

  return gulp.src([
      'src/template.jax',
      'src/app.js'
    ])
    .pipe(reactTempFilter)
    .pipe(react())
    .pipe(reactTempFilter.restore())
    .pipe(gulp.dest('dist'));
});

gulp.task('default', ['compile-dependencies', 'compile-app-js']);
