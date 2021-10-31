/**
 * @class
 * @extends AstronomicalObject
 * @name Star
 * @desc 항성 클래스
 */
import { DEG_TO_RAD } from 'src/constants';
import {
    TextureLoader, Texture, Color, PointLight, Vector3
} from 'three';
import { Lensflare, LensflareElement } from 'three/examples/jsm/objects/Lensflare';
import { PlanetData, StarData } from 'src/lib/interfaces/astro.interface';
import { Planet } from 'src/lib/astronomical/Planet';

export class Star extends Planet {
    private flareSize: number;
    private flareMapResource: string;
    private flareMap: Texture;
    private lensFlare: PointLight;

    constructor (data: StarData) {
        let astronomical: PlanetData = {
            id: data.id,
            name: data.name,
            mass: data.mass,
            radius: data.radius,
            material: data.material,
            sideralDay:  data.sideralDay,
            orbit: data.orbit,
        };
        super(astronomical);

        this.flareSize = 100;
        this.flareMapResource = 'static/images/effect/lensflare.png';
        this.setStarBody();
        this.setFlare();
        this.setLight();
    }

    public setFlareSize (sizeRatio: number, screenHeight: number): void {
        const delta = 30;
        this.flareSize = sizeRatio * screenHeight * delta;
    }

    public setFlarePosition (pos: Vector3): void {
        this.lensFlare.position.copy(pos);
    }

    public getScreenSizeRatio (camPos: Vector3, fov: number) {
        const size: number = this.getObjectStageSize();
        const distance: number = new Vector3().sub(camPos).length();
        const height = 2 * Math.tan((fov * DEG_TO_RAD) / 2) * distance;
        return size / height;
    }

    private setStarBody (): void {
        this.root.add(this.body);
    }

    private setFlare (): void {
        const flareColor = new Color(0xffffff);
        flareColor.setHSL(0.57, 0.80, 0.97);

        const flareSize = this.flareSize;
        this.flareMap = new TextureLoader().load(this.flareMapResource);

        const newLensflare = new Lensflare();
        newLensflare.addElement(new LensflareElement(this.flareMap, flareSize, 0.0, flareColor));

        const light = new PointLight(0xffffff, 1.5, 100);
        light.add(newLensflare);

        this.lensFlare = light;
        this.root.add(light);
    }

    private setLight (): void {
        const color = 0xffffff;
        const light = new PointLight(color);
        this.root.add(light);
    }
}
