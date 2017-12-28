// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import Component from 'vue-class-component';
import App from './App.vue';
import store from './stores/store';
import router from './router';

import 'src/polyfills/math.polyfill';

Vue.config.productionTip = false;

Component.registerHooks([
    'beforeRouteEnter',
    'beforeRouteLeave',
    'beforeRouteUpdate'
]);

/* eslint-disable no-new */
new Vue({
    el: '#app',
    store,
    router,
    template: '<App/>',
    components: { App }
});
