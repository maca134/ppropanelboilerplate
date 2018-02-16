
export default class CSInterface {
    static Instance: CSInterface = new CSInterface();

    public hostEnvironment: HostEnvironment = JSON.parse(window.__adobe_cep__.getHostEnvironment());

    private constructor() {
        
    }
        
    public evalScript<T>(script: string): Promise<T> {
        return new Promise((resolve, reject) => {
            window.__adobe_cep__.evalScript(script, s => resolve(JSON.parse(s)));
        });
    }
}
