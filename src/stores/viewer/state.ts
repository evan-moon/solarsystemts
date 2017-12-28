import { Scenario, SolarSystemScenario } from 'src/constants/scenario.constant';

export class ViewerState {
    public scenarios: Scenario[];
    public currentScenario: Scenario;

    constructor () {
        this.scenarios = [ SolarSystemScenario ];
        this.currentScenario = this.scenarios[0];
    }
}
