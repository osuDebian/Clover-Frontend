import Vue from 'vue'
import axios from 'axios'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import store from './store'
import ElementUI from 'element-ui';
import VueOdometer from 'v-odometer/src'

Vue.prototype.$axios = axios;
Vue.component('vue-odometer', VueOdometer);
Vue.use(ElementUI);
Vue.config.productionTip = true

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
