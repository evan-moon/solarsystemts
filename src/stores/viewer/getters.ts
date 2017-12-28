import { Getter, GetterTree } from 'vuex';
import { ViewerState } from './state';
import { Scenario } from 'src/constants/scenario.constant';

export function getCurrentScenario (state: ViewerState): Scenario {
    return state.currentScenario;
}

export default <GetterTree<ViewerState, any>> {
    getCurrentScenario,
}
