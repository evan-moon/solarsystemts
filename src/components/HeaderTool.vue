<template>
<div>

</div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import * as moment from 'moment';

@Component({
    name: 'HeaderToolbox',
    filters: {
        date (value: string) {
            return moment(value).format('YYYY-MM-DD HH:mm');
        }
    }
})
export default class HeaderToolbox extends Vue {
    menuList = null;
    planets = null;
    date: Date = new Date();

    mounted () {

    }
};
</script>

<style lang="scss" scoped>
#header-tool {
    background: {
        color: #222;
    }
    color: #eee;
    padding: 15px 10px;
}
</style>
