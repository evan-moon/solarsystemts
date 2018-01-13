/**
 * @class
 * @extends AstronomicalObject
 * @name Star
 * @desc 항성 클래스
 */
import { DEG_TO_RAD } from 'src/constants';
import {
    TextureLoader, Texture, Color, LensFlare,
    AdditiveBlending, PointLight, DirectionalLight,
    Vector3
} from 'three';
import { AstronomicalObjectData, StarData } from 'src/lib/interfaces/astro.interface';
import { AstronomicalObject } from 'src/lib/astronomical/AstronomicalObject';

export class Star extends AstronomicalObject {
    private flareSize: number;
    private flareMapResource: string;
    private flareMap: Texture;
    private lensFlare: LensFlare;

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

        this.flareSize = 500;
        this.flareMapResource = 'src/assets/images/effect/lensflare.png';
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
        this.flareMap = new TextureLoader().load(this.flareMapResource);
        const flareColor = new Color(0xffffff);
        let flareSize = this.flareSize;

        flareColor.setHSL(0.57, 0.80, 0.97); // #fce8e8
        this.lensFlare = new LensFlare(this.flareMap, flareSize, 0.0, AdditiveBlending, flareColor);
        this.lensFlare.customUpdateCallback = (lensFlare: LensFlare) => {
            const len: number = lensFlare.lensFlares.length;
            const vectorX: number = -lensFlare.positionScreen.x * 2;
            const vectorY: number = -lensFlare.positionScreen.y * 2;
            let f: number = 0;
            let flare: any;

            for (f; f < len; f++) {
                flare = lensFlare.lensFlares[f];
                flare.x = lensFlare.positionScreen.x + vectorX * flare.distance;
                flare.y = lensFlare.positionScreen.y + vectorY * flare.distance;
                flare.size = this.flareSize;
                flare.wantedRotation = flare.x * Math.PI * 0.5;
                flare.rotation += (flare.wantedRotation - flare.rotation) * 0.5;
            }
        };

        this.root.add(this.lensFlare);
    }

    private setLight (): void {
        const color = 0xfffff;
        const light = new PointLight(color);
        this.root.add(light);
    }
}
