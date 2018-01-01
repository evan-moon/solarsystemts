/**
 * @class
 * @name System
 * @desc 하나의 '계'를 추상화한 클래스
 */

export class System {
    id: string;
    name: string;
    constructor (id: string, name: string) {
        this.id = id;
        this.name = name;
    }

    public getCenterObject () {
        console.log(this);
    }
}
