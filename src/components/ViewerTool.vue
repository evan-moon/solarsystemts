<template>
<b-row class="viewer-tool" align-h="start">
    <div class="tool-wrapper" data-name="play-button">
        <b-button class="playing-button" @click="togglePlaying">
            <i v-show="!isPlaying" class="xi-play"></i>
            <i v-show="isPlaying" class="xi-pause"></i>
        </b-button>
    </div>
    <b-col cols="2" class="tool-wrapper" data-name="time">
        <p>{{ currentDate | date }}</p>
    </b-col>
    <b-col cols="2" class="tool-wrapper" data-name="timesets">
        <b-form-select v-model="currentTimesetIndex" @change="onChangeCurrentTimeIndex">
            <option v-for="(timeset, index) in timesets" :key="timeset.name" :value="index">
                {{ timeset.name }}
            </option>
        </b-form-select>
    </b-col>
    <b-col cols="2" class="tool-wrapper" data-name="camera-position">
        <b-form-select v-model="currentCameraPositionPlanetId" @change="onChangeCurrentCameraPositionPlanetId">
            <option value="root">All Planets</option>
            <option v-for="planet in currentScenario.system.planets" :value="planet.id">
                {{ planet.name }}
            </option>
        </b-form-select>
    </b-col>
</b-row>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator';
import { State, Mutation } from 'vuex-class';
import { ScenarioData } from 'src/constants/scenario.constant';
import * as moment from 'moment';
import { SET_PLAYING, SET_CURRENT_CAMERA_POSITION, SET_CURRENT_SCENARIO_SECONDS_PER_TICK, Timeset } from 'src/stores/viewer/config';

@Component({
    name: 'ViewerTool',
    filters: {
        date (value: string) {
            return moment(value).format('YYYY-MM-DD HH:mm');
        }
    }
})
export default class ViewerTool extends Vue {
    currentScenarioId: string = '';
    currentCameraPositionPlanetId: string = '';
    currentTimesetIndex: number = -1;

    @State('Viewer') viewerState: any;
    @State(state => state.viewer.isPlaying) isPlaying: boolean;
    @State(state => state.viewer.currentDate) currentDate: Date;
    @State(state => state.viewer.currentScenario) currentScenario: ScenarioData;
    @State(state => state.viewer.currentCameraPosition) currentCameraPosition: string;
    @State(state => state.viewer.timesets) timesets: Timeset[];
    @Mutation(SET_CURRENT_CAMERA_POSITION) setCurrentCameraPosition: any;
    @Mutation(SET_PLAYING) setPlaying: any;
    @Mutation(SET_CURRENT_SCENARIO_SECONDS_PER_TICK) setCurrentScenarioSecondsPerTick: any;

    get currentTimeset () {
        return this.timesets[this.currentTimesetIndex];
    }

    togglePlaying (): void {
        this.setPlaying(!this.isPlaying);
    }

    onChangeCurrentCameraPositionPlanetId (planetId: string): void {
        this.setCurrentCameraPosition(planetId);
    }

    onChangeCurrentTimeIndex (): void {
        if (!this.currentTimeset) {
            return;
        }
        this.setCurrentScenarioSecondsPerTick(this.currentTimeset.time);
    }

    created () {
        this.currentScenarioId = this.currentScenario.id;
        this.currentCameraPositionPlanetId = this.currentCameraPosition;
        this.currentTimesetIndex = this.timesets.findIndex(timeset => {
            return timeset.time === this.currentScenario.secondsPerTick;
        });
    }
};
</script>

<style lang="scss" scoped>
@import '~src/styles/utils/colors';

$toolbar-height: 45px;

.viewer-tool {
    position: fixed;
    bottom: 0;
    left: 0;
    width: 100%;
    height: $toolbar-height;
    margin: 0;
    background-color: $grey900;
}

.tool-wrapper {
    padding: 0;
    height: 100%;
    border-right: 1px solid $grey800;

    %vertical-align-center {
        margin-top: $toolbar-height / 2;
        transform: translateY(-50%);
    }

    &[data-name="play-button"] {
        width: $toolbar-height;
    }

    * {
        color: $white;
        font-weight: 200;
    }

    p, select {
        margin-bottom: 0;
        @extend %vertical-align-center;
    }
}

.btn {
    border-radius: 0;
    border: none;
    background-color: transparent;
    width: 100%;
    height: 100%;
    cursor: pointer;
    &:not([disabled]):not(.disabled):active, &:not([disabled]):not(.disabled):focus {
        box-shadow: none;
    }
}

select.custom-select {
    background-color: transparent;
    border: none;
    &:not([disabled]):not(.disabled):active, &:not([disabled]):not(.disabled):focus {
        box-shadow: none;
    }
}
</style>
