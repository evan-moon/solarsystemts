export const SET_PLAYING = 'viewer/SET_PLAYING';
export const SET_CURRENT_DATE = 'viewer/SET_CURRENT_DATE';
export const SET_CURRENT_CAMERA_POSITION = 'viewer/SET_CURRENT_CAMERA_POSITION';
export const SET_CURRENT_SCENARIO_SECONDS_PER_TICK = 'viewer/SET_CURRENT_SCENARIO_SECONDS_PER_TICK';
export const GET_CURRENT_SCENARIO_SECONDS_PER_TICK = 'viewer/GET_CURRENT_SCENARIO_SECONDS_PER_TICK';

export type Timeset = {
    time: number;
    name: string;
};
