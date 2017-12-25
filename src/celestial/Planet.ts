/**
 * @name Planet
 * @author Evan Moon
 */

import { Vector3 } from 'three';
import { J200, RAD_TO_DEG, CIRCLE } from 'src/constants';
import { PlanetData } from 'src/constants/planets.constants';

export class Planet {
    public planetData: PlanetData;

    private invMass: number;
    private angle: number;
    private force: Vector3;
    private movement: Vector3;

    private position: Vector3;
    private relativePos: Vector3;
    private prevPos: Vector3;

    private absoluteVel: Vector3;
    private relativeVel: Vector3;

    private currentEpochTime: Date;

    constructor ( data: PlanetData ) {
        this.reset();
        this.planetData = data;
        this.invMass = 1 / this.planetData.mass;
    }

    public reset (): void {
        this.angle = 0;
        this.force = new Vector3();
        this.movement = new Vector3();
        this.prevPos = new Vector3();
    }

    public setPositionFromDate (epochTime: Date): void {
        this.position = new Vector3();
        this.relativePos = this.position.clone();
        this.currentEpochTime = epochTime;
    }

    public getPosition (): Vector3 {
        return this.position.clone();
    }

    public getRelativePos (): Vector3 {
        return this.relativePos.clone();
    }
}
