/**
 * @class
 * @extends AstronomicalObject
 * @name Planet
 * @desc 행성 클래스
 */
import {
    Object3D, Vector3, MeshLambertMaterial,
    RingGeometry, Mesh, TextureLoader, DoubleSide
} from 'three';
import {
    AstronomicalObjectData, PlanetData,
    ComputedOrbitData, Ring
} from 'src/lib/interfaces/astro.interface';
import { QUARTER_CIRCLE, DEG_TO_RAD } from 'src/constants';
import { AstronomicalObject } from 'src/lib/astronomical/AstronomicalObject';
import { AtmoSphere } from 'src/lib/astronomical/AtmoSphere';
import { OrbitManager } from 'src/lib/managers/Orbit.manager';
import { Tracer } from 'src/lib/helpers/Tracer';
import DimensionService from 'src/lib/services/Dimension.service';

export class Planet extends AstronomicalObject {
    public atmospherePressure?: number;
    public atmosphere?: AtmoSphere;
    public ring?: Ring;
    public tilt?: number;
    public hasTrace: boolean;

    private invMass: number;
    private orbitManager: OrbitManager;

    private angle: number;
    private force: Vector3;
    private movement: Vector3;

    private position: Vector3;
    private compressedPos: Vector3;
    private prevPosition: Vector3;
    private relPosition: Vector3;

    private absVelocity: Vector3;
    private relVelocity: Vector3;

    private traceManager: Tracer;

    constructor (data: PlanetData) {
        let astronomical: AstronomicalObjectData = {
            id: data.id,
            name: data.name,
            mass: data.mass,
            radius: data.radius,
            material: data.material,
            sideralDay: data.sideralDay,
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
        this.prevPosition = new Vector3();
        this.relPosition = new Vector3();

        this.absVelocity = new Vector3();
        this.relVelocity = new Vector3();

        const factor = 1.6;
        const orbitTraceLength = factor + Math.PI * DimensionService.getScaled(data.orbit.base.a);
        console.log(orbitTraceLength ** 10, this.name);
        this.traceManager = new Tracer(data.id, data.material.color, orbitTraceLength ** 10);
        this.hasTrace = true;

        if (data.atmosphere) {
            this.atmospherePressure = data.atmosphere.atmospherePressure;
            this.atmosphere = new AtmoSphere(data.atmosphere.components);
        }
        if (data.ring) {
            this.ring = data.ring;
        }
        if (data.tilt) {
            this.tilt = data.tilt;
        }

        this.setPlanetBody();
    }

    public setPlanetBody (): void {
        if (this.ring) {
            const innerSize = DimensionService.getScaled(this.ring.innerRadius);
            const outerSize = DimensionService.getScaled(this.ring.innerRadius);
            const segments = 30;

            const material: MeshLambertMaterial = new MeshLambertMaterial({
                map: new TextureLoader().load(this.ring.map),
                transparent: true,
                side: DoubleSide
            });
            const geometry: RingGeometry = new RingGeometry(outerSize, innerSize, segments);
            const mesh: Mesh = new Mesh(geometry, material);
            mesh.rotation.x = -1 * QUARTER_CIRCLE;
            mesh.name = this.ringId;
            this.body.add(mesh);
        }

        let tilt = QUARTER_CIRCLE;
        if (this.tilt) {
            tilt -= (this.tilt * DEG_TO_RAD);
        }
        this.body.getObjectByName('mesh').rotation.x = tilt;
        this.root.add(this.body);
        this.root.add(this.traceManager.getTracer());
    }

    public getPlanetRoot (): Object3D {
        return this.root;
    }

    public getPlanetBody (): Object3D {
        return this.body;
    }

    public setPositionByDate (date: Date): void {
        const epochTime: Date = date;
        this.prevPosition = this.position.clone();
        this.position = this.orbitManager.calcPosition(date);
        this.compressedPos = this.getPosition();
        this.relPosition = this.position.clone();

        const x = this.compressedPos.x;
        const y = this.compressedPos.y;
        const z = this.compressedPos.z;
        this.body.position.set(x, y, z);

        if (this.hasTrace) {
            this.traceManager.updateTrace(this.body.position);
        }
    }

    public getPosition (): Vector3 {
        const currentPosition = this.position.clone();
        return DimensionService.getScaledVector(currentPosition);
    }

    public getScreenSizeRatio (camPos: Vector3, fov: number) {
        const size: number = this.getObjectStageSize();
        const distance: number = this.getPosition().sub(camPos).length();
        const height = 2 * Math.tan((fov * DEG_TO_RAD) / 2) * distance;
        return size / height;
    }

    private reset () {
        this.angle = 0;
        this.force = new Vector3();
        this.movement = new Vector3();
        this.prevPosition = new Vector3();
    }
}
