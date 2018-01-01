import { Color } from 'three';

export interface Material {
    emissive?: Color;
    color: string;
    map: string;
};

export interface Kepler6Elements {
    a: number;
    e: number;
    o: number;
    i?: number;
    l: number;
    lp: number;
    w?: number;
    M?: number;
};

export interface OrbitData {
    base: Kepler6Elements;
    cy?: Kepler6Elements;
    day?: Kepler6Elements;
};

export interface AtmoSphereComponent {
    title: string;
    name: string;
    ratio: number;
};

export interface AtmoSphere {
    atmospherePressure: number;
    components: AtmoSphereComponent[];
};

export interface Ring {
    innerRadius: number;
    outerRadius: number;
    map: string;
};

export interface PlanetData {
    title: string;
    name: string;
    mass: number;
    radius: number;
    sideralDay?: number;
    k?: number;
    orbit?: OrbitData;
    tilt?: number;
    atmosphere?: AtmoSphere;
    ring?: Ring;
    material: Material;
    isStar: boolean;
};
