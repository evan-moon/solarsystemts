import { StarSystemData } from 'src/lib/systems/StarSystem.ts';
import { PlanetSystemData } from 'src/lib/systems/PlanetSystem.ts';
import {
    SUN, MERCURY, VENUS, EARTH, MARS,
    JUPITER, SATURN, URANUS, NEPTUNE, PLUTO
} from 'src/constants/planets.constant';
import { DEFAULT_CALC_PER_TICK, MONTH_PER_SECOND } from 'src/constants';

export interface ScenarioData {
    name: string;
    id: string;
    system: StarSystemData|PlanetSystemData,
    startDate: Date,
    secondsPerTick: number,
    calcPerTick: number
};

export const SolarSystem = {
    id: 'solarSystemScene',
    name: 'Solar System',
    system: {
        id: 'solarSystem',
        name: 'Solar System',
        type: 'starsystem',
        star: SUN,
        planets: [ MERCURY, VENUS, EARTH, MARS, JUPITER, SATURN, URANUS, NEPTUNE, PLUTO ]
    },
    startDate: new Date(),
    secondsPerTick: MONTH_PER_SECOND,
    calcPerTick: DEFAULT_CALC_PER_TICK
};
