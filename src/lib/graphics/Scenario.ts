/**
 * @class
 * @name Scenario
 * @desc 시나리오 클래스
 */
import { ScenarioData, Tick } from 'src/constants/scenario.constant';
import { StarSystemData, StarSystem } from 'src/lib/systems/StarSystem';
import { PlanetSystemData, PlanetSystem } from 'src/lib/systems/PlanetSystem';
export class Scenario {
    id: string;
    name: string;
    startDate: Date;
    secondsPerTick: Tick;
    calcPerTick: number;
    system: StarSystem|PlanetSystem;

    constructor (data: ScenarioData) {
        this.id = data.id;
        this.name = data.name;
        this.startDate = data.startDate;
        this.secondsPerTick = data.secondsPerTick;
        this.calcPerTick = data.calcPerTick;
        this.system = this.getSystem(data.system);
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

    private getSystem (system: StarSystemData|PlanetSystemData): StarSystem|PlanetSystem {
        if (system.type === 'starsystem') {
            return new StarSystem(system as StarSystemData);
        }
        else if (system.type === 'planetsystem') {
            return new PlanetSystem(system as PlanetSystemData);
        }
        else {
            throw new Error('Please check your scenario type: Scenario Class');
        }
    }
}
