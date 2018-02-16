const fp = require('path');
const jetpack = require('fs-jetpack');
const browserify = require('browserify');
const tsify = require('tsify');
const package = jetpack.read(fp.join(__dirname, '../package.json'), 'json');

module.exports = function (paths) {
    return function typescriptTask() {
        return Promise.all([
            {
                src: paths.srcDir.path('./ts/dom/main.ts'),
                dst: paths.destDir.path('main.js')
            },
            {
                src: paths.srcDir.path('./ts/cep/panel.ts'),
                dst: paths.destDir.path('panel.jsx')
            },
        ].map(script => {
            return new Promise((resolve, reject) => {
                browserify({
                    debug: package.cep.debug
                })
                    .add(script.src)
                    .plugin(tsify, {project: fp.join(fp.dirname(script.src), 'tsconfig.json')})
                    .bundle()
                    .pipe(jetpack.createWriteStream(script.dst).on('finish', () => resolve()));
            });
        }));
    };
};