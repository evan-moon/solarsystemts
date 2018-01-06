/**
 * @class
 * @name StarSystem
 * @desc 항성을 기준으로 공전하는 행성을 가진 계
 */
import { Object3D } from 'three';
import { StarData, PlanetData } from 'src/lib/interfaces/astro.interface';
import { Star } from 'src/lib/astronomical/Star';
import { Planet } from 'src/lib/astronomical/Planet';
import { System } from 'src/lib/systems/System';

export interface StarSystemData {
    id: string;
    name: string;
    type: string;
    star: StarData;
    planets: PlanetData[]
}

export class StarSystem extends System {
    private star: Star;
    private planets: Planet[] = [];

    constructor (data: StarSystemData) {
        super(data.id, data.name, data.type);
        this.star = new Star(data.star);
        data.planets.forEach( planetData => this.planets.push(new Planet(planetData)) );
    }

    public getCenter (): Star {
        return this.star;
    }

    public getCenterBody (): Object3D {
        return this.star.get3DBody();
    }

    public getPlanets (): Planet[] {
        return this.planets;
    }

    public getPlanetById (id: string): Planet {
        return this.planets.filter(planet => planet.id === id)[0];
    }

    public getPlanetByName (name: string): Planet {
        return this.planets.filter(planet => planet.name === name)[0];
    }

    public getPlanetBodies (): Object3D[] {
        let arr: Object3D[] = [];
        this.planets.forEach(planet => arr.push(planet.get3DBody()));
        return arr;
    }

    public setPlanetsPosition (): void {
        let date = new Date(); // 추후 외부에서 인자로 받는 날짜로 바꿀 것
        this.planets.forEach((planet: Planet) => planet.setPositionByDate(date));
    }
}
