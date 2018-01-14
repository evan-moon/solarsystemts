/**
 * @class
 * @name Ticker
 * @author Evan Moon
 */

import { J2000 } from 'src/constants';

export class Ticker {
    public date: Date;
    public startDate: Date;

    private _epochTime: number // ms;
    private calcPerTick: number;
    private actualCalcPerTick: number;
    private secondsPerTick: number;
    private deltaTIncrement: number;

    constructor (date: Date) {
        this.date = date;
        this.startDate = date;
        this.calcPerTick = 1;
        this.actualCalcPerTick = 1;
        this.secondsPerTick = 1;
        this.deltaTIncrement = 1;
        this.epochTime = date.getTime();
    }

    get currentTime (): Date {
        const date: Date = this.date;
        const m: number = date.getTime();
        const nextDate: number = m + this.secondsPerTick;
        this.date = new Date(nextDate);
        this.epochTime = date.getTime();

        return this.date;
    }

    get deltaT (): number {
        return this.secondsPerTick;
    }

    set epochTime (date: number) {
        this._epochTime = (date - J2000.getTime()) / 1000;
    }

    get epochTime (): number {
        return this._epochTime;
    }

    public setDeltaT (): void {
        if (this.secondsPerTick < this.calcPerTick) {
            this.actualCalcPerTick = this.secondsPerTick;
        }
        else {
            this.actualCalcPerTick = this.calcPerTick;
        }

        this.deltaTIncrement = Math.round(this.secondsPerTick / this.actualCalcPerTick);
        this.secondsPerTick = this.deltaTIncrement * this.actualCalcPerTick;
    }

    public setCalcPerTick (tick: number = 1) {
        this.calcPerTick = tick;
        this.setDeltaT();
    }

    public setSecondsPerTick(tick: number = 1) {
        this.secondsPerTick = tick;
        this.setDeltaT();
    }
}
