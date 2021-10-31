/**
 * @class
 * @name Tracer
 * @author Evan Moon
 */

import {
    Vector3, LineBasicMaterial, Line,
    BufferGeometry, BufferAttribute
} from 'three';
import ColorService from 'src/lib/services/Color.service';

export class Tracer {
    private vertices: Vector3[] = [];
    private geometry: BufferGeometry;
    private trace: Line;
    private name: string;
    private color: string;
    private maxLength: number; // max trace vertices length

    constructor (name: string, color: string, maxLength: number) {
        this.name = `${name}-trace`;
        this.color = color;
        this.maxLength = maxLength;
        this.createTrace();
    }

    public getTracer (): Line {
        if (!this.trace) throw new Error(`You must create ${this.name} Trace first :: getTracer`);
        return this.trace;
    }

    public updateTrace (vertex: Vector3): void {
        if (!this.trace) throw new Error(`There is no trace in ${this.name}! :: updateTrace`);

        this.vertices.push(vertex.clone());
        if (this.vertices.length > this.maxLength) {
            this.vertices.shift();
        }

        const attrArrLength = (this.vertices.length * 3);
        const positionArr = new Float32Array(attrArrLength);
        const colorArr = new Float32Array(attrArrLength);
        const colorRGB = ColorService.hexToRgb(this.color);

        this.vertices.forEach((vertex: Vector3, index: number) => {
            index *= 3;

            positionArr[index] = vertex.x;
            positionArr[index + 1] = vertex.y;
            positionArr[index + 2] = vertex.z;

            const factor = 1 - (index / this.vertices.length);
            const computedColor = ColorService.darken(colorRGB, factor);
            colorArr[index] = computedColor.r / 255;
            colorArr[index + 1] = computedColor.g / 255;
            colorArr[index + 2] = computedColor.b / 255;
        });

        const positionAttr = new BufferAttribute(positionArr, 3);
        const colorAttr = new BufferAttribute(colorArr, 3);
        this.geometry.addAttribute('position', positionAttr);
        this.geometry.addAttribute('color', colorAttr);

        this.geometry.attributes['position'].needsUpdate = true;
    }

    private createTrace (): void {
        const geometry = new BufferGeometry();
        geometry.addAttribute('position', new BufferAttribute(new Float32Array(0), 3));
        geometry.addAttribute('color', new BufferAttribute(new Float32Array(0), 3));
        const material = new LineBasicMaterial({
            vertexColors: true
        });
        const mesh = new Line(geometry, material);
        this.geometry = geometry;
        this.trace = mesh;
        this.trace.name = this.name;
    }
}
