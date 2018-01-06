/**
 * @class
 * @name PlanetSystem
 * @desc 행성을 기준으로 공전하는 위성을 가진 계
 */
import { Object3D } from 'three';
import { PlanetData } from 'src/lib/interfaces/astro.interface';
import { Planet } from 'src/lib/astronomical/Planet';
import { System } from 'src/lib/systems/System';

export interface PlanetSystemData {
    id: string;
    name: string;
    type: string;
    centralPlanet: PlanetData;
    moons: PlanetData[];
}

export class PlanetSystem extends System {
    private centralPlanet: Planet;
    private moons: Planet[] = [];

    constructor (data: PlanetSystemData) {
        super(data.id, data.name, data.type);
        this.centralPlanet = new Planet(data.centralPlanet);
        data.moons.forEach( moonData => this.moons.push(new Planet(moonData)) );
    }

    public getCenter (): Planet {
        return this.centralPlanet;
    }

    public getCenterBody (): Object3D {
        return this.centralPlanet.get3DBody();
    }

    public getMoons (): Planet[] {
        return this.moons;
    }

    public getMoonById (id: string): Planet {
        return this.moons.filter(moon => moon.id === id)[0];
    }

    public getMoonByName (name: string): Planet {
        return this.moons.filter(moon => moon.name === name)[0];
    }

    public getMoonBodies (): Object3D[] {
        let arr: Object3D[] = [];
        this.moons.forEach(moon => arr.push(moon.get3DBody()));
        return arr;
    }

    public setMoonsPosition (): void {
        let date = new Date(); // 추후 외부에서 인자로 받는 날짜로 바꿀 것
        this.moons.forEach((moon: Planet) => moon.setPositionByDate(date));
    }
}
