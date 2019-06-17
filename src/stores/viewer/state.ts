import { ScenarioData, SolarSystem } from 'src/constants/scenario.constant';
import { Timeset } from './config';
import { REALTIME, HOUR_PER_SECOND, DAY_PER_SECOND, MONTH_PER_SECOND, HALF_YEAR_PER_SECOND, YEAR_PER_SECOND } from 'src/constants';

export class ViewerState {
    public scenarios: ScenarioData[] = [];
    public currentScenario: ScenarioData;
    public isPlaying: boolean;
    public currentDate: Date;
    public currentCameraPosition: string;
    public timesets: Timeset[];

    constructor () {
        this.scenarios = [ SolarSystem ];
        this.currentScenario = this.scenarios[0];
        this.isPlaying = false;
        this.currentDate = new Date();
        this.currentCameraPosition = 'root';
        this.timesets = [
            { time: REALTIME, name: 'Real-time' },
            { time: HOUR_PER_SECOND, name: 'Hour/s'},
            { time: DAY_PER_SECOND, name: 'Day/s' },
            { time: MONTH_PER_SECOND, name: 'Month/s' },
            { time: HALF_YEAR_PER_SECOND, name: '6Months/s' },
            { time: YEAR_PER_SECOND, name: 'Year/s' }
        ];
    }
}
