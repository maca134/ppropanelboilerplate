const gulp = require('gulp');
const sass = require('gulp-sass');

module.exports = function (paths) {
	return function scssTask() {
		return gulp.src(paths.srcDir.path('./scss/styles.scss'))
            .pipe(sass().on('error', sass.logError))
            .pipe(gulp.dest(paths.destDir.path('./css')));
	};
};