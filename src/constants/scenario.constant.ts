import { StarSystemData } from 'src/lib/systems/StarSystem.ts';
import { PlanetSystemData } from 'src/lib/systems/PlanetSystem.ts';
import {
    SUN, MERCURY, VENUS, EARTH, MARS,
    JUPITER, SATURN, URANUS, NEPTUNE, PLUTO
} from 'src/constants/planets.constant';
import { DEFAULT_CALC_PER_TICK } from 'src/constants';

export interface Tick {
    min: number;
    max: number;
    initial: number;
};

export interface ScenarioData {
    name: string;
    id: string;
    system: StarSystemData|PlanetSystemData,
    startDate: Date,
    secondsPerTick: Tick,
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
        planets: [
            MERCURY,
            VENUS,
            EARTH,
            MARS,
            JUPITER,
            SATURN,
            URANUS,
            NEPTUNE,
            PLUTO
        ]
    },
    startDate: new Date(),
    secondsPerTick: {
        min: 3600 * 5,
        max: 3600 * 25,
        initial: 3600 * (1 / 60) * 1000
    },
    calcPerTick: DEFAULT_CALC_PER_TICK
};
