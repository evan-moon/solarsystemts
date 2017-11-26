import Vue from 'vue';
import Router from 'vue-router';
import BootstrapVue from 'bootstrap-vue';
import Viewer from 'src/pages/Viewer.vue';

Vue.use(Router);
Vue.use(BootstrapVue);

export default new Router({
    routes: [{
        path: '/',
        name: 'Viewer',
        component: Viewer
    }]
});
