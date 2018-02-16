import Base64 from '../../shared/Base64';
import IBridgeRequest from '../../shared/IBridgeRequest';

class DOMBridgeRequest implements IBridgeRequest {
    readonly method: string;
    readonly args: any[];

    constructor(method: string, args: any[]) {
        this.method = method;
        this.args = args;
    }
}

export default class DOMBridge {
    public static invoke<T>(method: string, args: any[] = []) {
        return new Promise<T>((resolve, reject) => {
            window.__adobe_cep__.evalScript(
                `$._bridge.invoke("${Base64.encode(JSON.stringify(new DOMBridgeRequest(method, args)))}");`,
                res => {
                    let response: T;
                    try {
                        response = JSON.parse(Base64.decode(res)) as T;
                    } catch (e) {
                        return reject(new Error(`Bridge(dom) Error: ${Base64.decode(res)}`));
                    }
                    resolve(response);
                }
            );
        });
    }
}