<template>
<div :id="rendererID" ref="renderer"></div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator';
import { Scenario } from 'src/constants/scenario.constant';
import LoaderService from 'src/services/Loader.service';
import WorldService from 'src/services/World.service';

@Component({
    name: 'GLRenderer'
})
export default class GLRenderer extends Vue {
    @Prop() isPlaying: boolean;
    currentScenario: Scenario|null = null;
    rendererID: string = 'renderer';

    setScenario (scenario: Scenario) {
        this.currentScenario = scenario;
    }

    mounted () {
        if (this.currentScenario) {
            LoaderService.load(this.currentScenario).then(res => {
                WorldService.setRenderer(`#${this.rendererID}`);
            });
        }
        else {
            // Do nothing
        }
    }
}
</script>

<style lang="scss" scoped>
#renderer {
    width: 100%;
    height: 100vh;
}
</style>
