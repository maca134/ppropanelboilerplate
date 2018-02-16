interface AdobeCep {
    evalScript(script: string, callback: (result: string) => any): void;
    getHostEnvironment(): string;
}

interface HostEnvironment {
    readonly appId: string;
    readonly appLocale: string;
    readonly appName: string;
    readonly appSkinInfo: AppSkinInfo;
    readonly appUILocale: string;
    readonly appVersion: string;
    readonly isAppOnline: boolean;
}

interface AppSkinInfo {
    readonly appBarBackgroundColor: UIColor;
    readonly appBarBackgroundColorSRGB: UIColor;
    readonly baseFontFamily: string;
    readonly baseFontSize: number;
    readonly panelBackgroundColor: UIColor;
    readonly panelBackgroundColorSRGB: UIColor;
    readonly systemHighlightColor: RGBColor;
}

interface UIColor {
    readonly antialiasLevel: number;
    readonly color: RGBColor;
    readonly type: number;
}

interface RGBColor {
    readonly alpha: number;
    readonly blue: number;
    readonly green: number;
    readonly red: number;
}

interface Window {
    readonly __adobe_cep__: AdobeCep;
}