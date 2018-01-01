/**
 * @name World.service
 * @author Evan Moon
 */

import * as $ from 'jquery';
import { Scenario } from 'src/constants/scenario.constant';
import DimensionService from 'src/services/dimension.service';
import {
    Scene, WebGLRenderer, AmbientLight, Vector3, Vector2,
    SphereBufferGeometry, MeshBasicMaterial, Mesh, Color, BackSide,
    TextureLoader, Euler, Raycaster, PerspectiveCamera,
    AxisHelper, GridHelper
} from 'three';
import { OrbitControls } from 'src/plugin/Orbit-controls';

import CameraManager from 'src/managers/Camera.manager';
import ControlsManager from 'src/managers/Controls.manager';

interface RenderConfig {
    antialias?: boolean;
    preserveDrawingBuffer?: boolean;
    alpha?: boolean;
}
interface SMA {
    smallest: number;
    largest: number;
}

interface Space {
    geometry: SphereBufferGeometry;
    material: MeshBasicMaterial;
    mesh?: Mesh;
}

class WorldService {
    public date: Date;
    public epochTime: number;

    private rendererSelector: string;
    private rendererDOM: HTMLElement;
    private rendererDOMjQuery: any;
    private rendererWidth: number;
    private rendererHeight: number;
    private rendererRatio: number;
    private stageSize: number;
    private scenario: Scenario;
    private currentSpaceTexture: string;

    protected renderConfig: RenderConfig;
    protected smallestSMA: number;

    protected scene: Scene;
    protected renderer: WebGLRenderer;
    protected raycaster: Raycaster;
    protected mousePos: Vector2;

    protected CameraManager: CameraManager;
    protected currentCamera: PerspectiveCamera;
    protected cameraPos: string;

    protected ControlsManager: ControlsManager;
    protected controls: OrbitControls;

    constructor () {
        this.rendererSelector = '';
        this.rendererWidth = window.innerWidth;
        this.rendererHeight = window.innerHeight;
        this.rendererRatio = window.devicePixelRatio;

        this.stageSize = 50000;

        this.renderConfig = {
            antialias: true,
            preserveDrawingBuffer: true,
            alpha: true
        };
        this.date = new Date;
        this.epochTime = 0;

        this.currentSpaceTexture = 'universe';
    }

    public setWindow (w: number, h: number): void {
        this.rendererWidth = w;
        this.rendererHeight = h;
    }

    public setDimension ({ smallest, largest }: SMA): void {
        DimensionService.setLargestDimension(largest);
        this.stageSize = DimensionService.getScaled(largest);
        this.smallestSMA = smallest;
    }

    public setRenderer (selector: string): void {
        this.rendererDOMjQuery = $(selector);
        this.rendererDOM = this.rendererDOMjQuery[0];
        this.rendererWidth = this.rendererDOMjQuery.width();
        this.rendererHeight = this.rendererDOMjQuery.height();
    }

    public setScenario (scenario: Scenario): void {
        this.scenario = scenario;
    }

    public getScenario (): Scenario {
        return this.scenario;
    }

    public create (): void {
        // set scene
        this.scene = new Scene();

        // set renderer
        if (!this.renderer) {
            this.renderer = new WebGLRenderer(this.renderConfig);
        }
        else {
            throw new Error('There is no renderer!');
        }
        this.renderer.setSize(this.rendererWidth, this.rendererHeight);
        this.renderer.setPixelRatio(this.rendererRatio);
        this.renderer.setClearColor(0x222222, 1);

        // set basic light
        let light: AmbientLight = new AmbientLight(0x111111);
        light.position.set(0, 0, 0,);
        this.scene.add(light);

        // set raycaster
        this.raycaster = new Raycaster();

        // set mouse position to 0, 0, 0
        this.mousePos = new Vector2();

        this.rendererDOMjQuery.append(this.renderer.domElement);
        $(document).on('click', e => {
            this.onClick(e);
        });

        this.initCamera();
        this.initControls();
        this.initSpacebox();
        this.initHelper();
    }

    public render (): void {
        this.controls.update();
        this.renderer.render(this.scene, this.currentCamera);
    }

    public play (): void {}
    public pause (): void {}
    public destroy (): void {}

    private initCamera (): void {
        const aspect = this.rendererWidth / this.rendererHeight;
        this.CameraManager = new CameraManager(this.scene, this.stageSize, aspect);
        this.CameraManager.init();

        this.currentCamera = this.CameraManager.globalCamera;
        this.cameraPos = 'root';
    }

    private initControls () {
        this.ControlsManager = new ControlsManager(this.currentCamera, this.rendererDOM);
        this.controls = this.ControlsManager.createControls();
    }

    private initSpacebox () {
        const name: string = 'spacebox';
        const d = 6;
        const r = this.stageSize * d;
        const widthSegments = 60;
        const heightSegments = 40;
        let space: Space = {
            geometry: new SphereBufferGeometry(this.stageSize * d, widthSegments, heightSegments),
            material: new MeshBasicMaterial({
                color: new Color(0xaaaaaa),
                side: BackSide,
                map: new TextureLoader().load(`src/assets/images/space/${this.currentSpaceTexture}.jpg`)
            })
        };

        space.mesh = new Mesh(space.geometry, space.material);
        space.mesh.name = name;

        if (this.scene.getObjectByName(name)) {
            this.scene.remove(this.scene.getObjectByName(name));
        }

        this.scene.add(space.mesh);
    }

    private initHelper () {
        let axisHelper: AxisHelper = new AxisHelper(this.stageSize);
        let gridHelper: GridHelper = new GridHelper(this.stageSize, this.stageSize / 2000);
        gridHelper.rotation.x = ( 90 / 180 ) * Math.PI;

        this.scene.add(axisHelper, gridHelper);
    }

    private onClick (e: any): void {
        e.preventDefault();
        this.mousePos.x = (e.clientX / this.renderer.domElement.clientWidth) * 2 - 1;
        this.mousePos.y = -(e.clientY / this.renderer.domElement.clientHeight) * 2 + 1;
        // this.raycaster.setFromCamera(this.mousePos, this.camera);

        let intersects: any[] = this.raycaster.intersectObjects(this.scene.children, true);
    }
}

const instance = new WorldService();
export default instance;
