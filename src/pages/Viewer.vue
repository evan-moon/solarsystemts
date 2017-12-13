<template lang="html">
<b-container fluid>
    <ViewerTool
        ref="toolbar"
        @onChangePlaying="onChangePlaying"
        @onChangeScenario="onChangeScenario"
    ></ViewerTool>
    <GLRenderer
        ref="renderer"
        :is-playing="isPlaying"
    ></GLRenderer>
</b-container>
</template>

<script lang="ts">
import Vue from 'vue';
import Component from 'vue-class-component';
import { Scenario } from 'src/constants/scenario.constant';

import GLRenderer from 'src/components/GLRenderer.vue';
import ViewerTool from 'src/components/ViewerTool.vue';

@Component({
    name: 'Viewer',
    components: { GLRenderer, ViewerTool }
})
export default class Viewer extends Vue {
    isPlaying: boolean = false;
    currentScenario: Scenario|null = null;

    $refs: {
        renderer: GLRenderer
    }

    onChangePlaying (isPlaying: boolean) {
        this.isPlaying = isPlaying;
    }

    onChangeScenario (scenario: Scenario) {
        this.currentScenario = scenario;
        this.$refs.renderer.setScenario(scenario);
    }
}
</script>

<style lang="scss">
.container-fluid {
    padding: 0;
}
</style>
