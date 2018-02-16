export default class Base64 {

    private static chars: string = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";

    /**
     * encode
     */
    public static encode(str: string) {
        const encoded = [];
        let c = 0;
        while (c < str.length) {
            const b0 = str.charCodeAt(c++);
            const b1 = str.charCodeAt(c++);
            const b2 = str.charCodeAt(c++);
            const buf = (b0 << 16) + ((b1 || 0) << 8) + (b2 || 0);
            const i0 = (buf & (63 << 18)) >> 18;
            const i1 = (buf & (63 << 12)) >> 12;
            const i2 = isNaN(b1) ? 64 : (buf & (63 << 6)) >> 6;
            const i3 = isNaN(b2) ? 64 : (buf & 63);
            encoded[encoded.length] = this.chars.charAt(i0);
            encoded[encoded.length] = this.chars.charAt(i1);
            encoded[encoded.length] = this.chars.charAt(i2);
            encoded[encoded.length] = this.chars.charAt(i3);
        }
        return encoded.join('');
    }

    /**
     * decode
     */
    public static decode(str: string) {
        const decoded = [];
        let c = 0;
        while (c < str.length) {
            const i0 = this.chars.indexOf(str.charAt(c++));
            const i1 = this.chars.indexOf(str.charAt(c++));
            const i2 = this.chars.indexOf(str.charAt(c++));
            const i3 = this.chars.indexOf(str.charAt(c++));
            const buf = (i0 << 18) + (i1 << 12) + ((i2 & 63) << 6) + (i3 & 63);
            const b0 = (buf & (255 << 16)) >> 16;
            const b1 = (i2 == 64) ? -1 : (buf & (255 << 8)) >> 8;
            const b2 = (i3 == 64) ? -1 : (buf & 255);
            decoded[decoded.length] = String.fromCharCode(b0);
            if (b1 >= 0) decoded[decoded.length] = String.fromCharCode(b1);
            if (b2 >= 0) decoded[decoded.length] = String.fromCharCode(b2);
        }
        return decoded.join('');
    }
}