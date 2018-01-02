/**
 * @class
 * @name PlanetSystem
 * @desc 행성을 기준으로 공전하는 위성을 가진 계
 */
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
    centralPlanet: Planet;
    moons: Planet[] = [];

    constructor (data: PlanetSystemData) {
        super(data.id, data.name, data.type);
        this.centralPlanet = new Planet(data.centralPlanet);
        data.moons.forEach( moonData => this.moons.push(new Planet(moonData)) );
    }

    public setCenter (): void {

    }

    public setPlanets (): void {

    }
}
