/**
 * @name Camera.manager
 * @author Evan Moon
 * @desc 시뮬레이터의 카메라들을 관리하는 매니저
 */

import { DEG_TO_RAD } from 'src/constants';
import { Scene, Vector3, PerspectiveCamera } from 'three';

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
    public allCams: PerspectiveCamera[];

    private stageSize: number;
    private scene: Scene;

    protected cameraConfig: CameraConfig;

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
        this.globalCamera.lookAt(new Vector3());

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

    private getDistanceFromFov (dimToSee: number, fov: number): number {
        return dimToSee * Math.atan(fov * 2 * DEG_TO_RAD);
    }
}

export default CameraManager;
