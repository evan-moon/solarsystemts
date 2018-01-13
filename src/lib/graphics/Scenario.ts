/**
 * @class
 * @name Scenario
 * @desc 시나리오 클래스
 */
import { SystemBodies, SystemObjects } from 'src/lib/interfaces/astro.interface';
import { ScenarioData, Tick } from 'src/constants/scenario.constant';
import { StarSystemData, StarSystem } from 'src/lib/systems/StarSystem';
import { PlanetSystemData, PlanetSystem } from 'src/lib/systems/PlanetSystem';

export class Scenario {
    public id: string;
    public name: string;
    public systemType: string;
    public system: StarSystem|PlanetSystem;
    private startDate: Date;
    private secondsPerTick: Tick;
    private calcPerTick: number;

    constructor (data: ScenarioData) {
        this.id = data.id;
        this.name = data.name;
        this.systemType = data.system.type;
        this.startDate = data.startDate;
        this.secondsPerTick = data.secondsPerTick;
        this.calcPerTick = data.calcPerTick;
        this.setSystem(data.system);
    }

    public getStartDate (): Date {
        return this.startDate;
    }

    public getSecondsPerTick(): Tick {
        return this.secondsPerTick;
    }

    public getCalcPerTick(): number {
        return this.calcPerTick;
    }

    public getBodies (): SystemBodies {
        if (!this.system) {
            throw new Error('There is no system in this Scenario! : Scenario::getBodies');
        }
        if (this.system.type === 'starsystem') {
            let system = this.system as StarSystem;
            const bodies: SystemBodies = {
                center: system.getCenterBody(),
                others: system.getPlanetBodies(),
                type: system.type
            };
            return bodies;
        }
        else if (this.system.type === 'planetsystem') {
            let system = this.system as PlanetSystem;
            const bodies: SystemBodies = {
                center: system.getCenterBody(),
                others: system.getMoonBodies(),
                type: system.type
            };
            return bodies;
        }
        else {
            throw new Error('invalid system type: Scenario::getBodies');
        }
    }

    public getAstronomicalObjects (): SystemObjects {
        if (!this.system) {
            throw new Error('There is no system in this Scenario! : Scenario::getBodies');
        }
        let system = this.system;
        if (this.system.type === 'starsystem') {
            system = system as StarSystem;
            const objects: SystemObjects = {
                center: system.getCenter(),
                others: system.getPlanets(),
                type: system.type
            };
            return objects;
        }
        else if (this.system.type === 'planetsystem') {
            system = system as PlanetSystem;
            const objects: SystemObjects = {
                center: system.getCenter(),
                others: system.getMoons(),
                type: system.type
            };
            return objects;
        }
        else {
            throw new Error('invalid system type: Scenario::getAstronomicalObjects');
        }
    }

    private setSystem (system: StarSystemData|PlanetSystemData): void {
        if (system.type === 'starsystem') {
            this.system = new StarSystem(system as StarSystemData);
            this.system.setPlanetsPosition();
        }
        else if (system.type === 'planetsystem') {
            this.system = new PlanetSystem(system as PlanetSystemData);
            this.system.setMoonsPosition();
        }
        else {
            throw new Error('Please check your scenario type: Scenario Class');
        }
    }
}
