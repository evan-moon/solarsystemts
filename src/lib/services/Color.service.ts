/**
 * @name Color.service
 * @author Evan Moon
 * @desc 색 관련 연산
 */
interface RGBColorFormat {
    r: number,
    g: number,
    b: number
}

class ColorService {
    constructor () {}

    public hexToRgb (hex: string): RGBColorFormat {
        const regex: RegExp = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i;
        const outputArr = regex.exec(hex);

        if (!outputArr || !outputArr.length) {
            throw new Error(`${hex} is not hex color format!`);
        }

        const output: RGBColorFormat = {
            r: parseInt(outputArr[1], 16),
            g: parseInt(outputArr[2], 16),
            b: parseInt(outputArr[3], 16)
        };

        return output;
    }

    public rgbToHex(color: RGBColorFormat): string {
        return ((color.r << 16) + (color.g << 8) + color.b).toString();
    }

    public darken (color: RGBColorFormat, factor: number): RGBColorFormat {
        let output = Object.assign({}, color);
        const parsedFactor: number = 1 - factor;
        Object.keys(color).forEach(color => output[color] *= parsedFactor);

        return output as RGBColorFormat;
    }
}

const instance = new ColorService();
export default instance;
