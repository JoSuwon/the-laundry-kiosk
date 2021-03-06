import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import vuetify from './plugins/vuetify';

import './plugins/auto_reboot';
import './plugins/axios';
import './plugins/idle';
import './plugins/network_event';
import './plugins/sound';
import './plugins/hooks';


Vue.config.productionTip = false;

new Vue({
  router,
  store,
  vuetify,
  render: h => h(App),
}).$mount('#app');
