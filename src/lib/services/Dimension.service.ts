/**
 * @name Dimension.service
 * @author Evan Moon
 */

import { Vector3 } from 'three';

class DimensionService {
    private scale: number = 1;

    constructor () {}

    public setLargestDimension (dim: number) {
        this.scale = 1000 / dim;
    }

    public getScaledVector (obj: Vector3): Vector3 {
        return obj.multiplyScalar(this.scale);
    }

    public getScaled (obj: number): number {
        return obj * this.scale;
    }
}

const instance = new DimensionService();
export default instance;
