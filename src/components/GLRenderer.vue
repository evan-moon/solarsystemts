<template>
<div :id="rendererID" ref="renderer"></div>
</template>

<script lang="ts">
import { Vue, Component, Watch } from 'vue-property-decorator';
import { Mutation, State, Getter } from 'vuex-class';
import LoaderService from 'src/lib/services/Loader.service';
import { World } from 'src/lib/graphics/World';
import { SET_CURRENT_DATE, GET_CURRENT_SCENARIO_SECONDS_PER_TICK } from 'src/stores/viewer/config';

@Component({
    name: 'GLRenderer'
})
export default class GLRenderer extends Vue {
    rendererID: string = 'renderer';
    world: World;

    @Mutation(SET_CURRENT_DATE) setCurrentDate: any;
    @State(state => state.viewer.currentScenario) currentScenario: any;
    @State(state => state.viewer.isPlaying) isPlaying: boolean;
    @State(state => state.viewer.currentCameraPosition) currentCameraPosition: string;
    @Getter(GET_CURRENT_SCENARIO_SECONDS_PER_TICK) currentSecondsPerTick: number;

    tick () {
        this.world.render();
        window.requestAnimationFrame(() => this.tick());
        if (this.isPlaying) {
            this.setCurrentDate(this.world.date);
        }
    }

    loadWorld () {
        LoaderService.load().then(res => {
            this.world = new World(`#${this.rendererID}`);
            this.world.isPlaying = this.isPlaying;
            this.world.setScenario(this.currentScenario);
            this.world.create();
            this.world.setCameraPosition(this.currentCameraPosition);
            this.setCurrentDate(this.world.date);
            this.tick();
        });
    }

    @Watch('isPlaying')
    onChangeIsPlaying (isPlaying: boolean): void {
        this.world.isPlaying = isPlaying;
    }
    @Watch('currentCameraPosition')
    onChangeCurrentCameraPosition (planetId: string): void {
        this.world.setCameraPosition(planetId);
    }
    @Watch('currentSecondsPerTick')
    onChangeCurrentSecondsPerTick (tick: number): void {
        this.world.setSecondsPerTick(tick);
    }

    mounted () {
        this.$nextTick(() => {
            this.loadWorld();
        });
    }
}
</script>

<style lang="scss" scoped>
#renderer {
    width: 100%;
    height: 100vh;
}
</style>
