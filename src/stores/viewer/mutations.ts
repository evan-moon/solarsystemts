import { MutationTree } from 'vuex';
import { ViewerState } from './state';
import { SET_PLAYING, SET_CURRENT_DATE, SET_CURRENT_CAMERA_POSITION } from './config';

export default <MutationTree<ViewerState>> {
    [SET_PLAYING] (state, isPlaying: boolean) {
        state.isPlaying = isPlaying;
    },
    [SET_CURRENT_DATE] (state, currentDate: Date) {
        state.currentDate = currentDate;
    },
    [SET_CURRENT_CAMERA_POSITION] (state, currentCameraPosition: string) {
        state.currentCameraPosition = currentCameraPosition;
    },
}
