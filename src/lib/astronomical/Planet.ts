/**
 * @class
 * @extends AstronomicalObject
 * @name Planet
 * @desc 행성 클래스
 */
import { Vector3 } from 'three';
import {
    AstronomicalObjectData, PlanetData,
    ComputedOrbitData, Ring
} from 'src/lib/interfaces/astro.interface';
import { AstronomicalObject } from 'src/lib/astronomical/AstronomicalObject';
import { AtmoSphere } from 'src/lib/astronomical/AtmoSphere';
import { OrbitManager } from 'src/lib/managers/Orbit.manager';

export class Planet extends AstronomicalObject {
    public atmospherePressure?: number;
    public atmosphere?: AtmoSphere;
    public ring?: Ring;

    private invMass: number;
    private orbitManager: OrbitManager;

    private angle: number;
    private force: Vector3;
    private movement: Vector3;

    private position: Vector3;
    private prevPos: Vector3;
    private relPosition: Vector3;

    private absVelocity: Vector3;
    private relVelocity: Vector3;

    constructor (data: PlanetData) {
        console.log(data);
        let astronomical: AstronomicalObjectData = {
            id: data.id,
            name: data.name,
            mass: data.mass,
            radius: data.radius,
            material: data.material
        };
        if (data.sideralDay) {
            astronomical.sideralDay = data.sideralDay;
        }
        super(astronomical);

        this.orbitManager = new OrbitManager(data.orbit);
        this.angle = 0;
        this.force = new Vector3();
        this.movement = new Vector3();

        this.position = new Vector3();
        this.prevPos = new Vector3();
        this.relPosition = new Vector3();

        this.absVelocity = new Vector3();
        this.relVelocity = new Vector3();

        if (data.atmosphere) {
            this.atmospherePressure = data.atmosphere.atmospherePressure;
            this.atmosphere = new AtmoSphere(data.atmosphere.components);
        }
        if (data.ring) {
            this.ring = data.ring;
        }

        this.setPlanetBody();
    }

    public setPlanetBody () {
        console.log(this);
    }

    public setPositionByDate (date: Date): void {
        const epochTime: Date = date;
        this.position = this.orbitManager.calcPosition(date);
        this.relPosition = this.position.clone();
    }

    public getPosition (): Vector3 {
        return this.position.clone();
    }

    private reset () {
        this.angle = 0;
        this.force = new Vector3();
        this.movement = new Vector3();
        this.prevPos = new Vector3();
    }
}
