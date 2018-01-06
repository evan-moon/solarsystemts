import { Object3D, Color } from 'three';

export interface Material {
    emissive?: Color;
    color: string;
    map?: string;
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
    id: string;
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

export interface AstronomicalObjectData {
    id: string;
    name: string;
    mass: number;
    radius: number;
    material: Material;
    sideralDay?: number;
}

export interface PlanetData extends AstronomicalObjectData {
    orbit?: OrbitData;
    tilt?: number;
    atmosphere?: AtmoSphere;
    ring?: Ring;
};

export interface StarData extends AstronomicalObjectData {
    k?: number;
}

export interface SystemBodies {
    center: Object3D;
    others: Object3D[];
    type: string;
}
