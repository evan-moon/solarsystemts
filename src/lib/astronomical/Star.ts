/**
 * @class
 * @extends AstronomicalObject
 * @name Star
 * @desc 항성 클래스
 */
import { AstronomicalObjectData, StarData } from 'src/lib/interfaces/astro.interface';
import { AstronomicalObject } from 'src/lib/astronomical/AstronomicalObject';

export class Star extends AstronomicalObject {
    constructor (data: StarData) {
        let astronomical: AstronomicalObjectData = {
            id: data.id,
            name: data.name,
            mass: data.mass,
            radius: data.radius,
            material: data.material
        };
        if (data.sideralDay) {
            astronomical.sideralDay = data.sideralDay;
        }
        super(astronomical);
    }
}
