import { GetterTree } from 'vuex';
import { ViewerState } from './state';
import { GET_CURRENT_SCENARIO_SECONDS_PER_TICK } from './config';

export default <GetterTree<ViewerState, any>> {
    [GET_CURRENT_SCENARIO_SECONDS_PER_TICK] (state) {
        return state.currentScenario.secondsPerTick;
    }
}
