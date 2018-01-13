<template>
<div :id="rendererID" ref="renderer"></div>
</template>

<script lang="ts">
import { Vue, Component, Watch } from 'vue-property-decorator';
import { Action, Getter } from 'vuex-class';
import LoaderService from 'src/lib/services/Loader.service';
import { World } from 'src/lib/graphics/World';

@Component({
    name: 'GLRenderer'
})
export default class GLRenderer extends Vue {
    rendererID: string = 'renderer';
    world: World;

    @Action('setCurrentDate') setCurrentDate: any;
    @Getter('currentScenario') currentScenario: any;
    @Getter('isPlaying') isPlaying: boolean;

    tick () {
        this.world.render();
        this.setCurrentDate(this.world.date);
        window.requestAnimationFrame(() => {
            this.tick();
        });
    }

    loadWorld () {
        LoaderService.load().then(res => {
            this.world = new World(`#${this.rendererID}`);
            this.world.setScenario(this.currentScenario);
            this.world.create();
            this.setCurrentDate(this.world.date);
            this.tick();
        });
    }

    @Watch('isPlaying')
    onChangeIsPlaying (isPlaying: boolean): void {
        this.world.isPlaying = isPlaying;
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
