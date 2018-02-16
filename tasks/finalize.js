const fp = require('path');
const jetpack = require('fs-jetpack');
const xml2js = require('xml2js');
const util = require('util');
const package = jetpack.read(fp.join(__dirname, '../package.json'), 'json');

module.exports = function (paths) {
	return async function finalizeTask() {
        const parser = new xml2js.Parser();
        const builder = new xml2js.Builder();
        const parseStringAsync = util.promisify(parser.parseString);

        const manifestSrc = paths.srcDir.path('./CSXS/manifest.xml');
        const manifestDst = paths.destDir.path('./CSXS/manifest.xml');
        const manifest = await parseStringAsync(await jetpack.readAsync(manifestSrc));

        manifest.ExtensionManifest['$'].ExtensionBundleId = package.cep.packagename;
        manifest.ExtensionManifest['$'].ExtensionBundleName = package.cep.name;
        manifest.ExtensionManifest.ExtensionList[0].Extension[0]['$'].Id = package.cep.packagename;
        manifest.ExtensionManifest.ExtensionList[0].Extension[0]['$'].Version = package.version;
        manifest.ExtensionManifest.DispatchInfoList[0].Extension[0]['$'].Id = package.cep.packagename;
        manifest.ExtensionManifest.DispatchInfoList[0].Extension[0].DispatchInfo[0].UI[0].Menu[0] = package.cep.name;
        manifest.ExtensionManifest.DispatchInfoList[0].Extension[0].DispatchInfo[0].UI[0].Geometry[0].Size[0].Width[0] = package.cep.window.width;
        manifest.ExtensionManifest.DispatchInfoList[0].Extension[0].DispatchInfo[0].UI[0].Geometry[0].Size[0].Height[0] = package.cep.window.height;
        await jetpack.writeAsync(manifestDst, builder.buildObject(manifest));

        if (package.cep.debug) {
            const debugXmlSrc = paths.srcDir.path('./.debug');
            const debugXmlDst = paths.destDir.path('./.debug');
            const debugXml = await parseStringAsync(await jetpack.readAsync(debugXmlSrc));
            debugXml.ExtensionList.Extension[0]['$'].Id = package.cep.packagename;
            await jetpack.writeAsync(debugXmlDst, builder.buildObject(debugXml));
        }
    };
};