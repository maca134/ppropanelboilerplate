const fp = require('path');
const jetpack = require('fs-jetpack');
const browserify = require('browserify');
const tsify = require('tsify');
const package = jetpack.read(fp.join(__dirname, '../package.json'), 'json');

module.exports = function (paths) {
    return function typescriptTask() {
        return Promise.all([
            new Promise((resolve, reject) => {
                const src = paths.srcDir.path('./ts/dom/main.ts');
                const dst = paths.destDir.path('main.js');
                browserify({
                    debug: package.cep.debug
                })
                    .add(src)
                    .plugin(tsify, {project: fp.join(fp.dirname(src), 'tsconfig.json')})
                    .bundle()
                    .pipe(jetpack.createWriteStream(dst).on('finish', () => resolve()));
            }),
            new Promise((resolve, reject) => {
                const src = paths.srcDir.path('./ts/cep/panel.ts');
                const dst = paths.destDir.path('panel.jsx');
                browserify({
                    debug: package.cep.debug
                })
                    .add(src)
                    .plugin(tsify, {project: fp.join(fp.dirname(src), 'tsconfig.json')})
                    .bundle()
                    .pipe(jetpack.createWriteStream(dst).on('finish', () => resolve()));
            }),
        ]);
    };
};