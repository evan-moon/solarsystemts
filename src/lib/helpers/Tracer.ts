/**
 * @class
 * @name Tracer
 * @author Evan Moon
 */

import {
    Vector3, LineBasicMaterial, Line,
    BufferGeometry, BufferAttribute, VertexColors
} from 'three';
import { QUARTER_CIRCLE } from 'src/constants';
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

        const maxLength = this.maxLength;

        this.vertices.push(vertex);
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

            colorArr[index] = colorRGB.r / 255;
            colorArr[index + 1] = colorRGB.g / 255;
            colorArr[index + 2] = colorRGB.b / 255;
        });

        const positionAttr = new BufferAttribute(positionArr, 3);
        const colorAttr = new BufferAttribute(colorArr, 3);
        this.geometry.addAttribute('position', positionAttr);
        this.geometry.addAttribute('color', colorAttr);

        console.log(this.geometry.attributes);

        // this.geometry.attributes['position'].needsUpdate = true;
    }

    private createTrace (): void {
        const maxLength = this.maxLength;
        const geometry = new BufferGeometry();
        const material = new LineBasicMaterial({
            vertexColors: VertexColors
        });
        const mesh = new Line(geometry, material);
        this.geometry = geometry;
        this.trace = mesh;
        this.trace.name = this.name;
    }
}
