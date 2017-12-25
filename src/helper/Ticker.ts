export class Ticker {
    public date: Date;
    public startDate: Date;

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
    }

    get currentTime (): Date {
        const date: Date = this.date;
        const m: number = date.getTime();
        const nextDate: number = m + this.secondsPerTick;

        return new Date(nextDate);
    }

    get deltaT (): number {
        return this.secondsPerTick;
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
