/**
 * @name World.service
 * @author Evan Moon
 */

import * as $ from 'jquery';
import { Scenario } from 'src/constants/scenario.constant';
import DimensionService from 'src/services/dimension.service';

interface RenderConfig {
    antialias?: boolean;
    preserveDrawingBuffer?: boolean;
    alpha?: boolean;
}
interface SMA {
    smallest: number,
    largest: number
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

    protected renderConfig: RenderConfig;
    protected smallestSMA: number;

    constructor () {
        // Do nothing
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
    }

    setWindow (w: number, h: number): void {
        this.rendererWidth = w;
        this.rendererHeight = h;
    }

    setDimension ({ smallest, largest }: SMA): void {
        DimensionService.setLargestDimension(largest);
        this.stageSize = DimensionService.getScaled(largest);
        this.smallestSMA = smallest;
    }

    setRenderer (selector: string): void {
        this.rendererDOMjQuery = $(selector);
        this.rendererDOM = this.rendererDOMjQuery[0];
        this.rendererWidth = this.rendererDOMjQuery.width();
        this.rendererHeight = this.rendererDOMjQuery.height();
    }

    setScenario (scenario: Scenario): void {
        this.scenario = scenario;
    }

    getScenario (): Scenario {
        return this.scenario;
    }

    render (): void {

    }

    play (): void {}
    pause (): void {}
    destroy (): void {}
}

const instance = new WorldService();
export default instance;
