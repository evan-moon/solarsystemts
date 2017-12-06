/**
 * @name Dimension.service
 * @author Evan Moon
 */

import { Vector3 } from 'three';

class DimensionService {
    scale: number;

    constructor () {
        this.scale = 1;
    }

    setLargestDimension (dim: number) {
        this.scale = 1000 / dim;
    }

    getScaledVector (obj: Vector3): Vector3 {
        return obj.multiplyScalar(this.scale);
    }

    getScaled (obj: number): number {
        return obj * this.scale;
    }
}

const instance = new DimensionService();
export default instance;
