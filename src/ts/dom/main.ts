import DOMBridge from './lib/DOMBridge';

async function IsDocumentOpen() {
    return await DOMBridge.invoke<boolean>("isDocumentOpen", []);
}

IsDocumentOpen()
    .then(isDocumentOpen => console.log(`isDocumentOpen: ${isDocumentOpen}`))
    .catch(e => console.log(`error: ${e}`));

