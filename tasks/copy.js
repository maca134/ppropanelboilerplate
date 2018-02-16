module.exports = function (paths) {
	return function copyTask() {
		return paths.srcDir.copyAsync('.', paths.destDir.path(), {
			overwrite: true,
			matching: [
				'./font/**/*',
				'./img/**/*',
				'./*.html'
			]
		});
	};
};