/**
 * @class
 * @name System
 * @desc 하나의 '계'를 추상화한 클래스
 */
import { Object3D } from 'three';

export class System {
    public id: string;
    public name: string;
    public type: string;
    public root: Object3D;

    constructor (id: string, name: string, type: string) {
        this.id = id;
        this.name = name;
        this.type = type;
        this.root = new Object3D();
    }
}
