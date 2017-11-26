<template>
<row class="viewer-tool">
    <div class="tool-wrapper col-1">
        <b-button class="playing-button">
            <i v-show="!isPlaying" class="xi-play"></i>
            <i v-show="isPlaying" class="xi-pause"></i>
        </b-button>
    </div>
</row>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import * as moment from 'moment';

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

    mounted () {

    }
};
</script>

<style lang="scss" scoped>
@import '~src/styles/utils/colors';

.viewer-tool {
    position:  fixed;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 50px;
    background-color: $grey-900;
}

.tool-wrapper {
    padding: 0;
    height: 100%;
}

.btn {
    border-radius: 0;
    border: none;
    border-right: 1px solid $grey-600;
    background-color: transparent;
    width: 100%;
    height: 100%;
    cursor: pointer;
    &:not([disabled]):not(.disabled):active, &:not([disabled]):not(.disabled):focus {
        box-shadow: none;
    }
}

.playing-button {

}
</style>
