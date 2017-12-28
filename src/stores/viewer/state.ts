import { Scenario, SolarSystemScenario } from 'src/constants/scenario.constant';

export class ViewerState {
    public scenarios: Scenario[];
    public currentScenario: Scenario;
    public isPlaying: boolean;

    constructor () {
        this.scenarios = [ SolarSystemScenario ];
        this.currentScenario = this.scenarios[0];
        this.isPlaying = false;
    }
}
