const gulp = require('gulp');
const babel = require('gulp-babel');

gulp.task('js', () =>
    gulp.src('src/javascript-live-runner.js')
        .pipe(babel())
        .pipe(gulp.dest('dist'))
);

gulp.task('watch', ['js'], function () {
  gulp.watch('src/*.js', ['js']);
});

gulp.task('default', ['js']);
