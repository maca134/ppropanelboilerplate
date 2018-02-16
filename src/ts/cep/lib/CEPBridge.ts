import ParameterlessConstructor from '../../shared/ParameterlessConstructor';
import IBridgeRequest from '../../shared/IBridgeRequest';
import Base64 from '../../shared/Base64';

export default class CEPBridge<T> {
    private instance: T;

    constructor(type: ParameterlessConstructor<T>) {
        this.instance = new type();
    }

    public invoke(request: string): string {
        debugger;
        const invokeRequest: IBridgeRequest = JSON.parse(Base64.decode(request));
        const fnc: Function = (this.instance as any)[invokeRequest.method];
        if (fnc === undefined || fnc == null)
            return Base64.encode(`Bridge(cep) Error: unknown method ${invokeRequest.method}`);
        let fncResult: any;
        try {
            fncResult = fnc.apply(this.instance, invokeRequest.args);
        } catch (e) {
            return Base64.encode(`Bridge(cep) Error: ${invokeRequest.method} threw exception: ${e}`);
        }
        return Base64.encode(JSON.stringify(fncResult));
    }
}