/**
 * @class
 * @name StarSystem
 * @desc 항성을 기준으로 공전하는 행성을 가진 계
 */
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
    star: Star;
    planets: Planet[] = [];

    constructor (data: StarSystemData) {
        super(data.id, data.name, data.type);
        this.star = new Star(data.star);
        data.planets.forEach( planetData => this.planets.push(new Planet(planetData)) );
    }

    private setCenter (): void {

    }

    private setPlanets (): void {

    }
}
