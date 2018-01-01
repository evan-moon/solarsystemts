import { Scenario, SolarSystem } from 'src/constants/scenario.constant';

export class ViewerState {
    public scenarios: Scenario[];
    public currentScenario: Scenario;
    public isPlaying: boolean;

    constructor () {
        this.scenarios = [ SolarSystem ];
        this.currentScenario = this.scenarios[0];
        this.isPlaying = false;
    }
}
