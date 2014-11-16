var gulp          = require('gulp');
var react         = require('gulp-react');
var gulpFilter    = require('gulp-filter');

gulp.task('compile-dependencies', function() {
  return gulp.src([
    'node_modules/react/dist/react.js'
  ])
  .pipe(gulp.dest('.'));
});

gulp.task('compile-app-js', function () {
  var reactTempFilter = gulpFilter('**/*.jsx');
  var jsFilter        = gulpFilter('**/*.js');

  return gulp.src([
      'src/template.jsx',
      'src/app.js'
    ])
    .pipe(reactTempFilter)
    .pipe(react())
    .pipe(reactTempFilter.restore())
    .pipe(gulp.dest('.'));
});

gulp.task('default', ['compile-dependencies', 'compile-app-js']);
