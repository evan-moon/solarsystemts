<template>
<b-row class="viewer-tool" align-h="start">

    <div class="tool-wrapper" data-name="play-button">
        <b-button class="playing-button" @click="togglePlaying">
            <i v-show="!isPlaying" class="xi-play"></i>
            <i v-show="isPlaying" class="xi-pause"></i>
        </b-button>
    </div>

    <b-col cols="2" class="tool-wrapper" data-name="time">
        <p>{{ date | date}}</p>
    </b-col>

    <b-col cols="2" class="tool-wrapper" data-name="scenarios">
        <b-form-select v-model="currentScenario">
            <option v-for="scenario in scenarios" :value="scenario">{{ scenario.name }}</option>
        </b-form-select>
    </b-col>

</b-row>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import * as moment from 'moment';

import { Scenario, SolarSystemScenario } from 'src/constants/scenario.constant';

@Component({
    name: 'ViewerTool',
    filters: {
        date (value: string) {
            return moment(value).format('YYYY-MM-DD HH:mm');
        }
    }
})
export default class ViewerTool extends Vue {
    isPlaying: boolean = false;
    date: Date = new Date();
    scenarios: Scenario[] = [ SolarSystemScenario ];
    currentScenario: Scenario = this.scenarios[0];

    togglePlaying (): void {
        this.isPlaying = !this.isPlaying;
        this.$emit('onChangePlaying', this.isPlaying);
    }

    onChangeScenario (): void {
        this.$emit('onChangeScenario', this.currentScenario);
    }

    mounted (): void {
        this.onChangeScenario();
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
    background-color: $grey-900;
}

.tool-wrapper {
    padding: 0;
    height: 100%;
    border-right: 1px solid $grey-800;

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

select.form-control {
    background-color: transparent;
    border: none;
    &:not([disabled]):not(.disabled):active, &:not([disabled]):not(.disabled):focus {
        box-shadow: none;
    }
}
</style>
