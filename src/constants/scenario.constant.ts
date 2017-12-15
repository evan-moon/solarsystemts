import {
    SUN, MERCURY, VENUS, EARTH, MARS,
    JUPITER, SATURN, URANUS, NEPTUNE, PLUTO,
    PlanetData
} from 'src/constants/planets.constant';

interface Tick {
    min: number;
    max: number;
    initial: number;
};

export interface Scenario {
    name: string;
    id: string;
    planets: PlanetData[],
    secondsPerTick: Tick
};

export const SolarSystemScenario = {
    name: 'Solar System',
    id: 'solarSystem',
    planets: [
        SUN,
        MERCURY,
        VENUS,
        EARTH,
        MARS,
        JUPITER,
        SATURN,
        URANUS,
        NEPTUNE,
        PLUTO
    ],
    secondsPerTick: {
        min: 3600 * 5,
        max: 3600 * 25,
        initial: 3600 * (1 / 60) * 1000
    }
};
