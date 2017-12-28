<template>
<div :id="rendererID" ref="renderer"></div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import LoaderService from 'src/services/Loader.service';
import World from 'src/celestial/World';

@Component({
    name: 'GLRenderer'
})
export default class GLRenderer extends Vue {
    rendererID: string = 'renderer';
    world: any;

    tick () {
        this.world.render();
        window.requestAnimationFrame(() => {
            this.tick();
        });
    }

    loadWorld () {
        LoaderService.load().then(res => {
            this.world = new World(`#${this.rendererID}`);
            this.world.create();
            this.tick();
        });
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
