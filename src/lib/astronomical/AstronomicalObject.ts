/**
 * @class
 * @name AstronomicalObject
 * @desc 천체 클래스
 */
import {
    Object3D, Color, TextureLoader,
    Geometry, LineBasicMaterial, Vector3, Line,
    MeshPhongMaterial, SphereBufferGeometry, Mesh
} from 'three';
import { Material, AstronomicalObjectData } from 'src/lib/interfaces/astro.interface';
import { CIRCLE, KM } from 'src/constants';
import DimensionService from 'src/lib/services/Dimension.service';
import { Label } from 'src/lib/helpers/Label';

interface BodyQuality {
    segment: number;
    rings: number;
}

export class AstronomicalObject {
    public static bodyQuality: BodyQuality = {
        segment: 0,
        rings: 0
    };

    public id: string;
    public name: string;
    public mass: number;
    public radius: number;
    public renderedRadius: number;
    public material: Material;
    public sideralDay: number;
    public labelManager: Label;

    public position: Vector3;
    public compressedPos: Vector3;

    protected root: Object3D; // body, moons
    protected body: Object3D; // mesh, rigns

    protected bodyId: string;
    protected helperId: string;
    protected ringId: string;

    constructor (data: AstronomicalObjectData) {
        this.id = data.id;
        this.name = data.name;
        this.mass = data.mass;
        this.radius = data.radius;
        this.renderedRadius = 0;
        this.material = data.material;
        this.sideralDay = data.sideralDay;

        AstronomicalObject.bodyQuality.segment = 50;
        AstronomicalObject.bodyQuality.rings = 50;

        this.root = new Object3D();
        this.root.name = this.id;
        this.position = new Vector3();
        this.compressedPos = new Vector3();

        this.bodyId = `${this.id}-body`;
        this.helperId = `${this.id}-axis-helper`;
        this.ringId = `${this.id}-ring`;

        this.labelManager = new Label(this.id, this.name);

        this.createObjectBasicBody();
    }

	/**
	 * @method get3DBody
	 * @desc 현재 천체의 최상위 Object3D 객체를 반환한다.
	 * @returns { Object3D }
	 */
	public get3DBody () {
        return this.root;
    }

	/**
	 * @method setShowHelper
	 * @desc 현재 천체의 자전축 표시 여부를 set한다
	 * @param { boolean } val
	 */
	public setShowHelper (val: boolean): void {
        const helper = this.body.getObjectByName(this.helperId);
        if (helper) {
            helper.visible = val;
        }
        else {
            console.error('There is no axis helper in this Astronomical Object');
        }
    }

	/**
	 * @method getObjectCompressedSize
	 * @desc 특정 비율로 압축된 천체의 실제 반지름을 반환한다.
	 * @returns { number }
	 */
	public getObjectCompressedSize (): number {
        const toKM: number = this.radius * KM;
        return DimensionService.getScaled(toKM);
    }

	/**
	 * @method getObjectStageSize
	 * @desc 특정 비율로 압축된 렌더 스케일의 x사이즈를 반환한다.
	 * @returns { number }
	 */
	public getObjectStageSize () {
        return this.getObjectCompressedSize() * this.body.getObjectByName('mesh').scale.x;
    }

	/**
	 * @method moveRotating
	 * @desc 현재 시각 상 천체의 자전 각을 계산한다
	 * @param { Date } epochTime
	 */
	public moveRotating (epochTime: Date): void {
        this.body.getObjectByName('mesh').rotation.y = (epochTime.getTime() / this.sideralDay) * CIRCLE;
    }

	/**
	 * @method createObjectBasicBody
	 * @desc 천체의 3D 오브젝트를 생성한다
	 */
	private createObjectBasicBody (): void {
        const mat: any = Object.assign({}, this.material);

        const segment: number = AstronomicalObject.bodyQuality.segment;
        const rings: number = AstronomicalObject.bodyQuality.rings;
        this.renderedRadius = this.getObjectCompressedSize();

        this.body = new Object3D();

        if (mat.map) {
            mat.map = new TextureLoader().load(mat.map);
        }

        const geometry = new SphereBufferGeometry(this.renderedRadius, segment, rings);
        const material = new MeshPhongMaterial(mat);
        material.color = new Color(0xffffff);

        const mesh = new Mesh(geometry, material);
        mesh.name = 'mesh';
        this.body.add(mesh);
        this.body.name = this.bodyId;

        this.setHelper();
    }

	/**
	 * @method setHelper
	 * @desc 천체의 자전축 오브젝트를 생성한다
	 */
	protected setHelper (): void {
        const geometry = new Geometry();
        const material = new LineBasicMaterial({
            color: 0x00ff00
        });
        const centerPos = new Vector3();
        const tailPos = new Vector3(0, this.getObjectCompressedSize() * 2, 0);
        geometry.vertices.push(centerPos, tailPos);

        const mesh = new Line(geometry, material);
        mesh.name = this.helperId;

        this.body.getObjectByName('mesh').add(mesh);
    }
}
