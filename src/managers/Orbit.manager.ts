/**
 * @name Orbit.manager
 * @author Evan Moon
 * @desc 각 Planet들의 궤도 계산 매니저 클래스
 */

import * as $ from 'jquery';
import { Vector3, Euler, Quaternion } from 'three';
import { G, CENTURY, DAY, KM, DEG_TO_RAD, CIRCLE, AU } from 'src/constants';
import { OrbitData } from 'src/constants/planets.constant';
import Kepler from 'src/services/Kepler.service';

interface ComputedOrbitData {
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
}

class OrbitManager {
    public orbitData: OrbitData;
    private name: string;

    constructor (orbitData: OrbitData) {
        this.orbitData = orbitData;
    }

    public setName (name: string) {
        this.name = name;
    }

    public calcElements (timeEpoch: Date) {
        if (!this.orbitData) {
            throw new Error('There is no orbit data in this Orbit manager');
        }

        const orbitData = this.orbitData;
        const tDays = timeEpoch.getTime() / DAY;
        const tCentury = tDays / CENTURY;
        let computed: any = {};

        if (orbitData.base) {
            const keys: string[] = Object.keys(orbitData.base);
            let variation: number;
            computed = keys.reduce((carry: string, el: string) => {
                // cy: variation by century
                // day: variation by day
                variation = orbitData.cy ? orbitData.cy[el] : (orbitData.day[el] * CENTURY);
                if (!variation) variation = 0;

                carry[el] = orbitData.base[el] + (variation * tCentury);
                return carry;
            }, computed);
        }
        else {
            computed = $.extend({}, orbitData);
        }

        if (!computed.w) {
            computed.w = computed.lp - computed.o;
        }
        if (!computed.M) {
            computed.M = computed.l - computed.lp;
        }

        computed.a *= KM;
        computed.i *= DEG_TO_RAD;
        computed.o *= DEG_TO_RAD;
        computed.w *= DEG_TO_RAD;
        computed.M *= DEG_TO_RAD;

        computed.E = this.getEccentricAnomaly(computed.e, computed.M);

        computed.E %= CIRCLE;
        computed.i %= CIRCLE;
        computed.o %= CIRCLE;
        computed.w %= CIRCLE;
        computed.M %= CIRCLE;

        computed.pos = new Vector3(
            computed.a * (Math.cos(computed.E) - computed.e),
            computed.a * (Math.sqrt(1 - (computed.e ** 2))) * Math.sin(computed.E)
        );

        computed.r = computed.pos.length();
        computed.v = Math.atan2(computed.pos.y, computed.pos.x);

        return computed;
    }

    public calcPosition (timeEpoch: Date) {
        if (!this.orbitData) {
            return new Vector3();
        }
        const computed = this.calcElements(timeEpoch);
        // return this.getPosFromElements(computed);
    }

    private getEccentricAnomaly (e: number, M: number) {
        /**
         * @desc If 0.0 >= e, it is not ellipse
         */
        if (0.0 >= e) {
            return M;
        }
        /**
         * @desc 0.0 < e < 0.9
         * 타원 궤도, 뉴턴랩슨메소드 maxIter = 6
         */
        else if (0.0 < e && e < 0.9) {
            return Kepler.getEccentricity(Kepler.compute(e, M), M, 6);
        }
        /**
         * @desc 0.9 <= e < 1.0
         * 거의 Circle에 가까운 궤도일 경우, 뉴턴랩슨메소드 maxIter = 8
         */
        else if (0.9 <= e && e < 1.0) {
            const E = M + 0.85 * e * (Math.sign(Math.sin(M)));
            return Kepler.getEccentricity(Kepler.computeWithLaguerre(e, M), E, 8);
        }
        /**
         * @desc 1.0 <= e
         * 궤도가 포물선일 경우
         */
        else if (1.0 <= e) {
            return M;
        }
    }
}

export default OrbitManager;
