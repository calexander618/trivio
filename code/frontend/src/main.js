import Vue from 'vue';
import App from './App.vue';
import router from './router';

import {store} from './store.js';

import socketio from 'socket.io-client';
import VueSocketIO from 'vue-socket.io';

import VueMaterial from 'vue-material';
import 'vue-material/dist/vue-material.min.css';
import 'vue-material/dist/theme/default.css';

export const SocketInstance = socketio('http://localhost:3000');

Vue.use(VueSocketIO, SocketInstance);
Vue.use(VueMaterial);

Vue.config.productionTip = false;

new Vue({
  router,
  store, 
  render: h => h(App)
}).$mount('#app');
