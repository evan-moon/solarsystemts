/**
 * @class
 * @extends AstronomicalObject
 * @name Star
 * @desc 항성 클래스
 */
import {
    TextureLoader, Texture, Color, LensFlare,
    AdditiveBlending, PointLight, DirectionalLight
} from 'three';
import { AstronomicalObjectData, StarData } from 'src/lib/interfaces/astro.interface';
import { AstronomicalObject } from 'src/lib/astronomical/AstronomicalObject';

export class Star extends AstronomicalObject {
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

        this.flareMapResource = 'src/assets/images/effect/lensflare.png';
        this.setStarBody();
        this.setFlare();
    }

    public setStarBody (): void {
        this.root.add(this.body);
    }

    public setFlare (): void {
        this.flareMap = new TextureLoader().load(this.flareMapResource);
        const flareColor = new Color(0xffffff);
        const flareSize = 500;

        flareColor.setHSL(0.57, 0.80, 0.97); // #fce8e8
        this.lensFlare = new LensFlare(this.flareMap, flareSize, 0.0, AdditiveBlending, flareColor);
        this.lensFlare.customUpdateCallback = function (lensFlare: LensFlare) {
            const len: number = lensFlare.lensFlares.length;
            const vectorX: number = -lensFlare.positionScreen.x * 2;
            const vectorY: number = -lensFlare.positionScreen.y * 2;
            let f: number = 0;
            let flare: any;

            for (f; f < len; f++) {
                flare = lensFlare.lensFlares[f];
                flare.x = lensFlare.positionScreen.x + vectorX * flare.distance;
                flare.y = lensFlare.positionScreen.y + vectorY * flare.distance;
                flare.size = flareSize;
                flare.wantedRotation = flare.x * Math.PI * 0.5;
                flare.rotation += (flare.wantedRotation - flare.rotation) * 0.5;
            }
        };

        this.root.add(this.lensFlare);
    }
}
