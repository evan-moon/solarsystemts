import { StarSystemData } from 'src/lib/systems/StarSystem.ts';
import { PlanetSystemData } from 'src/lib/systems/PlanetSystem.ts';
import {
    SUN, MERCURY, VENUS, EARTH, MARS,
    JUPITER, SATURN, URANUS, NEPTUNE, PLUTO
} from 'src/constants/planets.constant';

interface Tick {
    min: number;
    max: number;
    initial: number;
};

export interface Scenario {
    name: string;
    id: string;
    system: StarSystemData|PlanetSystemData
};

export const SolarSystem = {
    id: 'solarSystemScene',
    name: 'Solar System',
    system: {
        id: 'solarSystem',
        name: 'Solar System',
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
    secondsPerTick: {
        min: 3600 * 5,
        max: 3600 * 25,
        initial: 3600 * (1 / 60) * 1000
    }
};
