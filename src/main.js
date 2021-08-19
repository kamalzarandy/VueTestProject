import Vue from 'vue'
import App from './App.vue'
import vuetify from './plugins/vuetify'
import router from './router'
import store from './store/store'
import axios from 'axios';
import AlertBox from './components/AlertBox';
import customOverlay from "./components/customOverlay";
import MaterialCard from "./components/base/MaterialCard";
import i18n from './i18n'

Vue.config.productionTip = false;
axios.defaults.withCredentials = false;
axios.defaults.baseURL = 'http://127.0.0.1/api/v1/';
axios.defaults.headers.common = {
  'Authorization': 'Bearer ' + store.getters.getToken
};

Vue.prototype.$alertMessage = {visible:  true, message:'Alert!'  };

Vue.component('alert-box',AlertBox );
Vue.component('custom-overlay',customOverlay);
Vue.component('material-card',MaterialCard);



new Vue({
  vuetify,
  router,
  store,
  i18n,
  render: h => h(App),
}
).$mount('#app')


