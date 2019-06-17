/**
 * @name Camera.manager
 * @author Evan Moon
 * @desc 시뮬레이터의 카메라들을 관리하는 매니저
 */

import { DEG_TO_RAD } from 'src/constants';
import { Scene, Vector3, PerspectiveCamera } from 'three';
import { Scenario } from 'src/lib/graphics/Scenario';
import { StarSystem } from 'src/lib/systems/StarSystem';
import { PlanetSystem } from 'src/lib/systems/PlanetSystem';
import { Planet } from 'src/lib/astronomical/Planet';

interface CameraConfig {
    fov: number;
    near: number;
    lootAt?: Vector3;
    maxfov?: number;
    far?: number;
    aspect?: number;
}

const DEFAULT_CONFIG: CameraConfig = {
    fov: 45,
    maxfov: 90,
    near: 0.001,
    lootAt: new Vector3(),
};

class CameraManager {
    public globalCamera: PerspectiveCamera;
    public currentCamera: PerspectiveCamera;
    public allCams: PerspectiveCamera[] = [];

    private stageSize: number;
    private scene: Scene;

    protected cameraConfig: CameraConfig;
    private defaultVector = new Vector3();

    constructor (
        scene: Scene,
        stageSize: number,
        aspect: number,
        fov: number = DEFAULT_CONFIG.fov,
        near: number = DEFAULT_CONFIG.near
    ) {
        this.scene = scene;
        this.cameraConfig = { fov, aspect, near, far: stageSize * 100 };
        this.stageSize = stageSize;
        this.allCams = [];
    }

    public init (): void {
        this.globalCamera = this.createCamera('mainCam');
        this.globalCamera.position.set(0, -1, this.getDistanceFromFov(this.stageSize, this.globalCamera.fov));
        this.globalCamera.lookAt(this.defaultVector);

        this.scene.add(this.globalCamera);
    }

    public createCamera (name: string): PerspectiveCamera {
        const { fov, aspect, near, far } = this.cameraConfig;
        const camera = new PerspectiveCamera(fov, aspect, near, far);
        camera.name = name;
        camera.up = new Vector3(0, 0, 1);

        this.allCams.push(camera);
        this.currentCamera = camera;

        return camera;
    }

    public getCurrentCamera (): PerspectiveCamera {
        return this.currentCamera;
    }

    public setCameraPosition (scenario: Scenario, currentCameraPosition: string, planetId: string): void {
        const cam = this.currentCamera;

        if (currentCameraPosition === 'root') {
            this.scene.remove(cam);
        }
        else {
            this.scene.getObjectByName(currentCameraPosition).remove(cam);
        }

        if (planetId === 'root') {
            this.scene.add(cam);
            this.initCurrentCameraPosition();
        }
        else {
            let system: StarSystem|PlanetSystem = scenario.system;
            let target: Planet;

            if (system.type === 'starsystem') {
                system = system as StarSystem;
                target = system.getPlanetById(planetId);
            }
            else if (scenario){
                system = system as PlanetSystem;
                target = system.getMoonById(planetId);
            }
            else throw new Error(`There is no ${system.type} in system types`);

            const r: number = target.renderedRadius * 10;
            target.getPlanetBody().add(cam);
            cam.position.set(r, r, r);
        }
    }

    public initCurrentCameraPosition (): void {
        this.currentCamera.position.set(0, this.stageSize / 2, this.stageSize / 2);
    }

    public getAbsolutePosition (): Vector3 {
        const parent = this.currentCamera.parent;
        return parent.localToWorld(this.currentCamera.position.clone());
    }

    public getConfig (): CameraConfig {
        return this.cameraConfig;
    }

    private getDistanceFromFov (dimToSee: number, fov: number): number {
        return dimToSee * Math.atan(fov * 2 * DEG_TO_RAD);
    }
}

export default CameraManager;
