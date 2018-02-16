module.exports = function (paths) {
	return function runTask() {
        return Promise.resolve()
            .then(() => paths.runDir.dirAsync('.', {empty: true}))
            .then(() => paths.destDir.copyAsync('.', paths.runDir.path('.'), {overwrite: true}));
	};
};