import { Store, ActionTree, ActionContext } from 'vuex';
import { ViewerState } from './state';
import * as Q from 'q';

export function setCurrentScenario(store: ActionContext<ViewerState, any>, scenarioId: string) {
    let defer = Q.defer();
    store.commit('SET_CURRENT_SCENARIO', scenarioId);
    defer.resolve();
    return defer.promise;
}

export default <ActionTree<ViewerState, any>> {
    setCurrentScenario
}
