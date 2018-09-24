import { Getter, GetterTree } from 'vuex';
import { ViewerState } from './state';
import { ScenarioData } from 'src/constants/scenario.constant';

export function getAllScenarios (state: ViewerState): ScenarioData[] {
    return state.scenarios;
}

export function currentScenario (state: ViewerState): ScenarioData {
    return state.currentScenario;
}

export function isPlaying (state: ViewerState): boolean {
    return state.isPlaying;
}

export function isDebug (state: ViewerState): boolean {
	return state.isDebug;
}

export function currentDate (state: ViewerState): Date {
    return state.currentDate;
}

export function currentLookAt (state: ViewerState): string {
    return state.currentLookAt;
}

export function currentCameraPosition (state: ViewerState): string {
    return state.currentCameraPosition;
}

export default <GetterTree<ViewerState, any>> {
    getAllScenarios,
    currentScenario,
    isPlaying,
	isDebug,
    currentDate,
    currentLookAt,
    currentCameraPosition,
}
