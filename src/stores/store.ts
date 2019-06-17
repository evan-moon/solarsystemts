import Vue from 'vue';
import Vuex from 'vuex';

/* STORES START */
import { ViewerStoreModule } from './viewer/';
/* STORES END */

Vue.use(Vuex);

export default new Vuex.Store({
    modules: {
        viewer: new ViewerStoreModule()
    },
});
