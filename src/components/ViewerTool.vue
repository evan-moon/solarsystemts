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
    <b-col cols="2" class="tool-wrapper" data-name="scenarios">
        <b-form-select v-model="currentScenarioId">
            <option v-for="scenario in viewerState.scenarios" :value="scenario.id">
                {{ scenario.name }}
            </option>
        </b-form-select>
    </b-col>
    <b-col cols="2" class="tool-wrapper" data-name="camera-position">
        <b-form-select v-model="currentCameraPositionPlanetId">
            <option value="root">Default</option>
            <option v-for="planet in currentScenario.system.planets" :value="planet.id">
                {{ planet.name }}
            </option>
        </b-form-select>
    </b-col>
    <b-col cols="2" class="tool-wrapper" data-name="camera-lookat">
        <b-form-select v-model="currentCameraLookAtPlanetId">
            <option value="root">Default</option>
            <option v-for="planet in currentScenario.system.planets" :value="planet.id">
                {{ planet.name }}
            </option>
        </b-form-select>
    </b-col>
</b-row>
</template>

<script lang="ts">
import { Vue, Component, Watch } from 'vue-property-decorator';
import { State, Getter, Action } from 'vuex-class';
import { ScenarioData } from 'src/constants/scenario.constant';
import * as moment from 'moment';

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
    currentCameraLookAtPlanetId: string = '';
    planetIds: string[] = [];

    @State('Viewer') viewerState: any;
    @Getter('isPlaying') isPlaying: boolean;
    @Getter('currentDate') currentDate: Date;
    @Getter('currentScenario') currentScenario: ScenarioData;
    @Getter('currentCameraPosition') currentCameraPosition: string;
    @Getter('currentLookAt') currentLookAt: string;
    @Action('setCurrentScenario') setCurrentScenario: any;
    @Action('setCurrentCameraPosition') setCurrentCameraPosition: any;
    @Action('setCurrentLookAt') setCurrentLookAt: any;
    @Action('setPlaying') setPlaying: any;
    @Action('setDebug') setDebug: any;

    togglePlaying (): void {
        this.setPlaying(!this.isPlaying);
    }

    @Watch('currentScenarioId')
    onChangeScenarioId (scenarioId: string): void {
        this.setCurrentScenario(scenarioId);
    }
    @Watch('currentCameraPositionPlanetId')
    onChangeCurrentCameraPositionPlanetId (planetId: string): void {
        this.setCurrentCameraPosition(planetId);
    }
    @Watch('currentCameraLookAtPlanetId')
    onChangeCurrentCameraLookAtPlanetId (planetId: string): void {
        this.setCurrentLookAt(planetId);
    }

    created () {
        this.currentScenarioId = this.currentScenario.id;
        this.currentCameraPositionPlanetId = this.currentCameraPosition;
        this.currentCameraLookAtPlanetId = this.currentLookAt;
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
