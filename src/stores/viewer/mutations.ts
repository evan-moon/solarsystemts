import { Mutation, MutationTree } from 'vuex';
import { ViewerState } from './state';

export function SET_CURRENT_SCENARIO (state: ViewerState, scenarioId: string) {
    const idArr: string[] = state.scenarios.map(v => v.id);
    const idx: number = idArr.indexOf(scenarioId);

    if(!~idx) {
        throw new Error(`There is no scenario which has id ${scenarioId}`);
    }
    state.currentScenario = state.scenarios[idx];
}

export function SET_PLAYING (state: ViewerState, isPlaying: boolean) {
    state.isPlaying = isPlaying;
}

export function SET_CURRENT_DATE (state: ViewerState, currentDate: Date)  {
    state.currentDate = currentDate;
}

export default <MutationTree<ViewerState>> {
    SET_CURRENT_SCENARIO,
    SET_PLAYING,
    SET_CURRENT_DATE,
}
