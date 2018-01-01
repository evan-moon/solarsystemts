/**
 * @class
 * @name AstronomicalObject
 * @desc 천체 클래스
 */
import {
    Object3D, Color, TextureLoader,
    MeshPhongMaterial, SphereBufferGeometry, Mesh
} from 'three';
import { Material, AstronomicalObjectData } from 'src/lib/interfaces/astro.interface';
import { KM } from 'src/constants';
import DimensionService from 'src/services/Dimension.service';

interface BodyQuality {
    segment: number;
    rings: number;
}



export class AstronomicalObject {
    public static bodyQuality: BodyQuality;

    public id: string;
    public name: string;
    public mass: number;
    public radius: number;
    public renderedRadius: number;
    public material: Material;
    public sideralDay?: number;

    private root: Object3D; // body, moons
    private body: Object3D; // mesh, rigns

    constructor (data: AstronomicalObjectData) {
        this.id = data.id;
        this.name = data.name;
        this.mass = data.mass;
        this.radius = data.radius;
        this.material = data.material;

        if (data.sideralDay) {
            this.sideralDay = data.sideralDay;
        }

        AstronomicalObject.bodyQuality.segment = 50;
        AstronomicalObject.bodyQuality.rings = 50;

        this.root = new Object3D();
        this.createPlanetBody();
    }

    private createPlanetBody (): void {
        const mat = this.material;
        const segment = AstronomicalObject.bodyQuality.segment;
        const rings = AstronomicalObject.bodyQuality.rings;
        this.renderedRadius = this.getPlanetSize(this.radius);

        console.log(this.name, 'Actual Radius -> ', this.radius);
        console.log(this.name, 'Rendered Radius -> ', this.renderedRadius);

        this.body = new Object3D();

        if (mat.map) {
            console.log(new TextureLoader().load(mat.map));
        }
    }

    private getPlanetSize (value: number): number {
        const toKM = value * KM;
        return DimensionService.getScaled(toKM);
    }
}
