import { Getter, GetterTree } from 'vuex';
import { ViewerState } from './state';
import { Scenario } from 'src/constants/scenario.constant';

export function getAllScenarios (state: ViewerState): Scenario[] {
    return state.scenarios;
}

export function currentScenario (state: ViewerState): Scenario {
    return state.currentScenario;
}

export function isPlaying (state: ViewerState): boolean {
    return state.isPlaying;
}

export default <GetterTree<ViewerState, any>> {
    getAllScenarios,
    currentScenario,
    isPlaying
}
