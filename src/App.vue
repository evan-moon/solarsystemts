<template>
    <div id="app">
        <router-view></router-view>
    </div>
</template>

<script lang="ts">
import Vue from 'vue';
import Component from 'vue-class-component';

@Component({})
export default class App extends Vue {
    name = 'App';
}
</script>

<style lang="scss">
@import '~src/styles/__module__';
</style>
