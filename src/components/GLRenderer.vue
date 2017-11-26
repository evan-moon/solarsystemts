<template>
<div id="renderer" ref="renderer"></div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';

@Component({
    name: 'GLRenderer'
})
export default class GLRenderer extends Vue {
    mounted () {
        console.log('mounted GLRenderer');
    }
}
</script>

<style lang="scss" scoped>
#renderer {
    width: 100%;
    height: 100vh;
}
</style>
