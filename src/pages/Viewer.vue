<template lang="html">
<b-container>
    <ViewerTool></ViewerTool>
    <GLRenderer></GLRenderer>
</b-container>
</template>

<script lang="ts">
import Vue from 'vue';
import Component from 'vue-class-component';
import GLRenderer from 'src/components/GLRenderer.vue';
import ViewerTool from 'src/components/ViewerTool.vue';

@Component({
    name: 'Home',
    components: { GLRenderer, ViewerTool }
})
export default class Home extends Vue {

}
</script>

<style lang="scss">
div {
    h1 {
        color: #aaaaaa;
    }
}
</style>
