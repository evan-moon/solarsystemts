<template lang="html">
<div>
    <HeaderTool></HeaderTool>
    <GLRenderer></GLRenderer>
</div>
</template>

<script lang="ts">
import Vue from 'vue';
import Component from 'vue-class-component';
import GLRenderer from 'src/components/GLRenderer.vue';
import HeaderTool from 'src/components/HeaderTool.vue';

@Component({
    name: 'Home',
    components: { GLRenderer, HeaderTool }
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
