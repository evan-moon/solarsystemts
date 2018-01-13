/**
 * @class
 * @name World
 * @author Evan Moon
 */

import * as $ from 'jquery';
import { KM } from 'src/constants';
import { ScenarioData } from 'src/constants/scenario.constant';
import { Scenario } from 'src/lib/graphics/Scenario';
import { StarSystemData, StarSystem } from 'src/lib/systems/StarSystem';
import { PlanetSystemData, PlanetSystem } from 'src/lib/systems/PlanetSystem';
import { Star } from 'src/lib/astronomical/Star';
import { Planet } from 'src/lib/astronomical/Planet';
import { SystemBodies, PlanetData } from 'src/lib/interfaces/astro.interface';
import DimensionService from 'src/lib/services/Dimension.service';
import {
    Scene, WebGLRenderer, AmbientLight, Vector3, Vector2,
    SphereBufferGeometry, MeshBasicMaterial, Mesh, Color, BackSide,
    TextureLoader, Raycaster, PerspectiveCamera,
    AxisHelper, GridHelper
} from 'three';
import { OrbitControls } from 'src/plugin/Orbit-controls';
import CameraManager from 'src/lib/managers/Camera.manager';
import ControlsManager from 'src/lib/managers/Controls.manager';
import { Ticker } from 'src/lib/helpers/Ticker';

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

export class World {
    public startDate: Date;
    public date: Date;
    public ticker: Ticker;
    public isPlaying: boolean;

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

    constructor (rendererSelector: string) {
        this.rendererSelector = rendererSelector;
        this.rendererWidth = window.innerWidth;
        this.rendererHeight = window.innerHeight;
        this.rendererRatio = window.devicePixelRatio;
        this.setRenderer(rendererSelector);

        this.stageSize = 50000;

        this.renderConfig = {
            antialias: true,
            preserveDrawingBuffer: true,
            alpha: true
        };
        this.date = new Date();
        this.scene = new Scene();

        this.currentSpaceTexture = 'universe';
        this.isPlaying = false;
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

    private calcDimension (scenarioData: ScenarioData): SMA {
        let sma: SMA = {
            largest: 0,
            smallest: 0
        };
        if (scenarioData.system.type === 'starsystem') {
            const system = scenarioData.system as StarSystemData;
            sma.largest = system.planets.reduce((a: number, b: PlanetData) => {
                return (b.orbit && b.orbit.base.a > a) ? b.orbit.base.a : a;
            }, 0);
            sma.smallest = system.planets.reduce((a: number, b: PlanetData) => {
                return (b.orbit && (!a || b.orbit.base.a < a)) ? b.orbit.base.a : a;
            }, 0);
        }
        else if (scenarioData.system.type === 'planetsystem') {
            const system = scenarioData.system as PlanetSystemData;
            sma.largest = system.moons.reduce((a: number, b: PlanetData) => {
                return (b.orbit && b.orbit.base.a > a) ? b.orbit.base.a : a;
            }, 0);
            sma.smallest = system.moons.reduce((a: number, b: PlanetData) => {
                return (b.orbit && (!a || b.orbit.base.a < a)) ? b.orbit.base.a : a;
            }, 0);
        }
        else throw new Error('Please check the scenario type!: calcDimension::World');

        sma.largest *= KM;
        sma.smallest *= KM;

        console.log('=========== CALCED DIMENSION ==========');
        console.log('largest SMA => ', sma.largest);
        console.log('smallest SMA => ', sma.smallest);
        console.log('=======================================');

        return sma;
    }

    public setRenderer (selector: string): void {
        this.rendererDOMjQuery = $(selector);
        this.rendererDOM = this.rendererDOMjQuery[0];
        this.rendererWidth = this.rendererDOMjQuery.width();
        this.rendererHeight = this.rendererDOMjQuery.height();
    }

    public setScenario (scenarioData: ScenarioData): void {
        this.date = scenarioData.startDate;
        this.startDate = scenarioData.startDate;
        this.setDimension(this.calcDimension(scenarioData));
        this.scenario = new Scenario(scenarioData);

        let planetBodies: SystemBodies = this.scenario.getBodies();
        this.scene.add(planetBodies.center);
        planetBodies.others.forEach(planetBody => this.scene.add(planetBody));
        // 각 행성 위치에 맞게 오브젝트 배치
    }

    public getScenario (): Scenario {
        return this.scenario;
    }

    public create (): void {
        if (!this.scenario) {
            console.error('You have to set any scenario first. use setScenario()');
        }

        // set renderer
        if (!this.renderer) {
            this.renderer = new WebGLRenderer(this.renderConfig);
        }
        else {
            console.error('There is no renderer!');
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

        this.ticker = new Ticker(this.scenario.getStartDate());
        this.ticker.setSecondsPerTick(this.scenario.getSecondsPerTick().initial);
        this.ticker.setCalcPerTick(this.scenario.getCalcPerTick());

        this.setPlanets();
    }

    public render (): void {
        const centerObject = this.scenario.system.getCenter();
        const cameraAbsolutePosition = this.CameraManager.getAbsolutePosition();

        this.controls.update();
        this.renderer.render(this.scene, this.currentCamera);

        if (centerObject instanceof Star) {
            const star = centerObject as Star;
            const starPosition = new Vector3();
            const flarePosition = cameraAbsolutePosition.clone().sub(starPosition).multiplyScalar(0.1);
            const flareSize = star.getScreenSizeRatio(cameraAbsolutePosition, this.CameraManager.getConfig().fov);

            star.setFlarePosition(flarePosition);
            star.setFlareSize(flareSize, this.rendererHeight);
        }
        if (this.isPlaying) {
            this.date = this.ticker.currentTime;

            const bodies = this.scenario.getAstronomicalObjects();
            bodies.center.moveRotating(this.date);
            bodies.others.forEach(planet => {
                planet.moveRotating(this.date);
                planet.setPositionByDate(this.date);
            });
        }
    }

    public setLookAt(planetId: string): void {
        this.CameraManager.setLookAt(this.scenario, this.cameraPos, planetId);
        this.cameraPos = planetId;
    }

    private initCamera (): void {
        const aspect = this.rendererWidth / this.rendererHeight;
        this.CameraManager = new CameraManager(this.scene, this.stageSize, aspect);
        this.CameraManager.init();

        this.currentCamera = this.CameraManager.globalCamera;
        this.cameraPos = 'root';
        this.CameraManager.initCurrentCameraPosition();
    }

    private initCameraPosition (): void {
        this.currentCamera.position.set(this.stageSize, this.stageSize, this.stageSize * 1.5);
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
        let gridHelper: GridHelper = new GridHelper(this.stageSize, this.stageSize / 10);
        gridHelper.rotation.x = ( 90 / 180 ) * Math.PI;

        this.scene.add(axisHelper, gridHelper);
    }

    private setPlanets () {
        if (!this.scenario) {
            throw new Error('There is no scenario: setPlanets::World');
        }

        const bodies = this.scenario.getBodies();
        this.scene.add(bodies.center);
        bodies.others.forEach(planet => this.scene.add(planet));
    }

    private onClick (e: any): void {
        e.preventDefault();
        this.mousePos.x = (e.clientX / this.renderer.domElement.clientWidth) * 2 - 1;
        this.mousePos.y = -(e.clientY / this.renderer.domElement.clientHeight) * 2 + 1;
        // this.raycaster.setFromCamera(this.mousePos, this.camera);

        let intersects: any[] = this.raycaster.intersectObjects(this.scene.children, true);
    }
}
