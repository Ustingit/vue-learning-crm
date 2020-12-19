import Vue from 'vue';
import App from './App.vue';
import Vuelidate from 'vuelidate'
import firebase from 'firebase/app';
import './registerServiceWorker';
import router from './router';
import store from './store';
import messagePlugin from './common/message.plugin'
import dateFilter from './filters/date.filter';
import 'materialize-css/dist/js/materialize.min';

import 'firebase/auth';
import 'firebase/database';

Vue.config.productionTip = false;
Vue.filter('dateFilter', dateFilter)
Vue.use(Vuelidate)
Vue.use(messagePlugin)

firebase.initializeApp({});

let app;

firebase.auth().onAuthStateChanged(() => {
  if (!app) {
    app = new Vue({
      router,
      store,
      render: (h) => h(App),
    }).$mount('#app');
  }
})
