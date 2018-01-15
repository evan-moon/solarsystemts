import { Store, ActionTree, ActionContext } from 'vuex';
import { ViewerState } from './state';
import * as Q from 'q';

export function setCurrentScenario (store: ActionContext<ViewerState, any>, scenarioId: string) {
    const defer = Q.defer();
    store.commit('SET_CURRENT_SCENARIO', scenarioId);
    defer.resolve();
    return defer.promise;
}

export function setPlaying (store: ActionContext<ViewerState, any>, isPlaying: boolean) {
    const defer = Q.defer();
    store.commit('SET_PLAYING', isPlaying);
    defer.resolve();
    return defer.promise;
}

export function setCurrentDate (store: ActionContext<ViewerState, any>, currentDate: Date) {
    const defer = Q.defer();
    store.commit('SET_CURRENT_DATE', currentDate);
    defer.resolve();
    return defer.promise;
}

export function setCurrentLookAt (store: ActionContext<ViewerState, any>, currentLookAt: string) {
    const defer = Q.defer();
    store.commit('SET_CURRENT_LOOK_AT', currentLookAt);
    defer.resolve();
    return defer.promise;
}

export function setCurrentCameraPosition (store: ActionContext<ViewerState, any>, currentCameraPosition: string) {
    const defer = Q.defer();
    store.commit('SET_CURRENT_CAMERA_POSITION', currentCameraPosition);
    defer.resolve();
    return defer.promise;
}

export default <ActionTree<ViewerState, any>> {
    setCurrentScenario,
    setPlaying,
    setCurrentDate,
    setCurrentLookAt,
    setCurrentCameraPosition,
}
