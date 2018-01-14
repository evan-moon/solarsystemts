import { Object3D, Vector3, Color } from 'three';
import { Planet } from 'src/lib/astronomical/Planet';
import { AstronomicalObject } from 'src/lib/astronomical/AstronomicalObject';

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

export interface ComputedOrbitData {
    time: Date; // 해당 데이터에 대한 시간
    a: number; // Semi-majot axis (장반경)
    e: number; // Eccentricity (이심률)
    i: number; // Inclination (궤도 기울기)
    o: number; // Longitude of Ascending Node (Ω)
    w: number; // Argument of periapsis (ω)

    E: number; // Eccentric Anomaly
    T: number; // Time at perihelion
    M: number; // Mean anomaly

    l: number; // Mean longitude
    lp: number; // Longitude of periapsis

    r: number; // Distance from center
    v: number; // True anomaly (through Kepler)

    P: number; // Sidereal period
    Pw: number; // Argument of periapsis precession period (mean value)
    Pn: number; // Longitude of the ascending node precession period (mean value)

    pos: Vector3;
    tilt?: number;
}

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
    sideralDay: number;
}

export interface PlanetData extends AstronomicalObjectData {
    orbit: OrbitData;
    tilt?: number;
    atmosphere?: AtmoSphere;
    ring?: Ring;
};

export interface StarData extends PlanetData {
    k?: number;
}

export interface SystemBodies {
    center: Object3D;
    others: Object3D[];
    type: string;
}

export interface SystemObjects {
    center: AstronomicalObject;
    others: Planet[];
    type: string;
}
