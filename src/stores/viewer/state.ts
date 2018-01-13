import { ScenarioData, SolarSystem } from 'src/constants/scenario.constant';

export class ViewerState {
    public scenarios: ScenarioData[] = [];
    public currentScenario: ScenarioData;
    public isPlaying: boolean;
    public currentDate: Date;

    constructor () {
        this.scenarios = [ SolarSystem ];
        this.currentScenario = this.scenarios[0];
        this.isPlaying = false;
        this.currentDate = new Date();
    }
}
