
export default class CSInterface {
    static Instance: CSInterface = new CSInterface();

    public hostEnvironment: HostEnvironment = JSON.parse(window.__adobe_cep__.getHostEnvironment());

    private constructor() {
        console.log(this.hostEnvironment.appSkinInfo.appBarBackgroundColor.color.blue);
    }
    
    public evalScript(script: string): Promise<string> {
        return new Promise((resolve, reject) => {
            window.__adobe_cep__.evalScript(script, function (result) {
                console.log(arguments, arguments.callee, result == 'EvalScript error.');
            });
        });
    }
}
