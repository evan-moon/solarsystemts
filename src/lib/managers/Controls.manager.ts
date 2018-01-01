import * as $ from 'jquery';
import { PerspectiveCamera, Vector3 } from 'three';
import { OrbitControls } from 'src/plugin/Orbit-controls';

interface ControlsConfig {
    enableZoom?: boolean;
    enableDamping?: boolean;
    dampingFactor?: number;
    rotateSpeed?: number;
    zoomSpeed?: number;
}

class ControlsManager {
    private camera: PerspectiveCamera;
    private rendererDOM: HTMLElement;
    private config: ControlsConfig;
    private controlsCenter: Vector3;
    private controls: OrbitControls;

    constructor ( camera: PerspectiveCamera, rendererDOM: HTMLElement ) {
        this.camera = camera;
        this.rendererDOM = rendererDOM;
        this.config = {
            enableZoom: true,
            enableDamping: true,
            dampingFactor: 0.08,
            rotateSpeed: 0.3,
            zoomSpeed: 0.5,
        };
        this.controlsCenter = new Vector3();
    }

    public createControls (): OrbitControls {
        this.controls = new OrbitControls(this.camera, this.rendererDOM);
        this.updateCenter();
        this.setConfig();

        return this.controls;
    }

    public getControls (): OrbitControls {
        return this.controls;
    }

    private updateCenter (): void {
        if (!this.controls) {
            throw new Error('There is no controls!');
        };
        const { x, y, z } = this.controlsCenter;
        this.controls.target.set(x, y, z);
    }

    private setConfig (config: ControlsConfig = {}) {
        const newConfig = $.extend(this.config, config);
        $.extend(this.controls, this.config);
    }
}

export default ControlsManager;
