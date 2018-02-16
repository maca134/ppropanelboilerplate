const fp = require('path');
const gulp = require('gulp');
const jetpack = require('fs-jetpack');
const package = jetpack.read('./package.json', 'json');

const paths = {
	srcDir: jetpack.cwd('./src'),
	destDir: jetpack.cwd(`./build`),
	runDir: jetpack.cwd(fp.join(package.cep.extensionsPath, package.cep.packagename)),
};

const cleanTask = require('./tasks/clean')(paths);
const copyTask = require('./tasks/copy')(paths);
const typescriptTask = require('./tasks/typescript')(paths);
const scssTask = require('./tasks/scss')(paths);
const finalizeTask = require('./tasks/finalize')(paths);
const runTask = require('./tasks/run')(paths);

gulp.task('clean', cleanTask);
gulp.task('copy', ['clean'], copyTask);
gulp.task('typescript', ['clean'], typescriptTask);
gulp.task('scss', ['clean'], scssTask);
gulp.task('finalize', ['copy', 'typescript', 'scss'], finalizeTask);
gulp.task('build', ['finalize']);
gulp.task('run', ['build'], runTask);
gulp.task('default', ['build']);