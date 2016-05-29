const gulp = require('gulp');
const babel = require('gulp-babel');

gulp.task('default', () =>
    gulp.src('src/javascript-live-runner.js')
        .pipe(babel())
        .pipe(gulp.dest('dist'))
);
