import { ScenarioData, SolarSystem } from 'src/constants/scenario.constant';

export class ViewerState {
    public scenarios: ScenarioData[] = [];
    public currentScenario: ScenarioData;
    public isPlaying: boolean;

    constructor () {
        this.scenarios = [ SolarSystem ];
        this.currentScenario = this.scenarios[0];
        this.isPlaying = false;
    }
}
