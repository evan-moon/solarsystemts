import { Mutation, MutationTree } from 'vuex';
import { ViewerState } from './state';

export function SET_CURRENT_SCENARIO (state: ViewerState, scenarioId: string) {
    const idArr: string[] = state.scenarios.map(v => v.id);
    const idx: number = idArr.indexOf(scenarioId);
    state.currentScenario = state.scenarios[idx];
}

export default <MutationTree<ViewerState>> {
    SET_CURRENT_SCENARIO,
}
