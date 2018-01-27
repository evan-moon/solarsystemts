/**
 * @class
 * @name Label
 * @author Evan Moon
 */
import * as $ from 'jquery';
import { Vector3, PerspectiveCamera } from 'three';

export class Label {
    name: string;
    planetName: string;
    elementString: string;
    elementDOM: any;
    position: Vector3;
    position2d: Vector3;
    
    constructor (name: string, planetName: string) {
        this.name = `${name}-label`;
        this.planetName = planetName;
        this.position = new Vector3();
        this.elementString = `<div class="planet-label"><h3>${planetName}</h3></div>`
        this.elementDOM = $(this.elementString);
        
        this.elementDOM.appendTo($('#renderer'));
    }

    public updatePosition (position: Vector3, camera: PerspectiveCamera) {
        this.position = position.clone();
        this.position2d = this.get2DPosition(camera);

        const alpha = 1 / this.position2d.z;
        this.setElementPosition(this.position2d, alpha);
    }

    private setElementPosition (position2d: Vector3, alpha: number) {
        const style = {
            transform: `translate(${position2d.x}px, ${position2d.y}px) scale(${position2d.z})`,
            opacity: alpha
        };
        this.elementDOM.css(style);
    }

    private get2DPosition (camera: PerspectiveCamera) {
        const position = this.position.clone();
        const position2d = position.project(camera);
        const w = window.innerWidth;
        const h = window.innerHeight;

        position2d.x = (position2d.x + 1) / 2 * w;
        position2d.y = -(position2d.y - 1) / 2 * h;
        
        if (position2d.z < 1 && position2d.x > 0 && position2d.x < w && position2d.y > 0 && position2d.y < h) {
            const distance = camera.position.distanceTo(position);
            const span = Math.atan(camera.fov / 2) * distance;
            const factor = 1 / (1 + Math.log10(span));
            position2d.z = 0.3 + factor;

            return position2d;
        }
        else {
            return new Vector3();
        }
    }
}