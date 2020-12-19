import Vue from 'vue';
import App from './App.vue';
import Vuelidate from 'vuelidate'
import firebase from 'firebase/app';
import Loader from './components/app/Loader.vue'
import router from './router';
import store from './store';
import messagePlugin from './common/message.plugin'
import dateFilter from './filters/date.filter';
import currencyFilter from './filters/currency.filter';
import './registerServiceWorker';
import 'materialize-css/dist/js/materialize.min';

import 'firebase/auth';
import 'firebase/database';

Vue.config.productionTip = false;
Vue.filter('dateFilter', dateFilter)
Vue.filter('currencyfilter', currencyFilter)
Vue.use(Vuelidate)
Vue.use(messagePlugin)
Vue.component('Loader', Loader)

firebase.initializeApp({
  apiKey: "AIzaSyAm6I3DbEZoEUNlrhH6bjuUcnIPkXY9pAA",
  authDomain: "vue-crm-learn-b9979.firebaseapp.com",
  projectId: "vue-crm-learn-b9979",
  storageBucket: "vue-crm-learn-b9979.appspot.com",
  messagingSenderId: "506692574135",
  appId: "1:506692574135:web:e36c6372b72fcd7cb7a632",
  measurementId: "G-QL4YPBMVEP"
});

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
