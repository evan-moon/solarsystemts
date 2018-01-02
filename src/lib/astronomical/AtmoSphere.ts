/**
 * @class
 * @name AtmoSphere
 * @desc 천체의 대기 클래스
 */

import { AtmoSphereComponent } from 'src/lib/interfaces/astro.interface';

export class AtmoSphere {
    public atmospherePressure: number;
    private components: AtmoSphereComponent[] = [];

    constructor (components: AtmoSphereComponent[]) {
        this.components = components;
    }

    public getAllComponents (): AtmoSphereComponent[] {
        return this.components;
    }

    public getComponentsById (id: string): AtmoSphereComponent {
        const component = this.components.filter(v => v.id === id);
        return component[0];
    }

    public getHighestRateComponent () {}

    public getLowestRateComponent () {}
}
