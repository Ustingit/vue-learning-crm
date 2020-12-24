import Vue from 'vue';
import App from './App.vue';
import Vuelidate from 'vuelidate'
import Paginate from 'vuejs-paginate'
import firebase from 'firebase/app';
import VueMeta from 'vue-meta'
import Loader from './components/app/Loader.vue'
import router from './router';
import store from './store';
import messagePlugin from './common/message.plugin'
import titlePlugin from './common/title.plugin'
import dateFilter from './filters/date.filter';
import localizeFilter from './filters/localize.filter';
import currencyFilter from './filters/currency.filter';
import tooltipDirective from './directives/tooltip.directive.js';
import './registerServiceWorker';
import 'materialize-css/dist/js/materialize.min';

import 'firebase/auth';
import 'firebase/database';

Vue.config.productionTip = false;
Vue.filter('dateFilter', dateFilter)
Vue.filter('currencyfilter', currencyFilter)
Vue.filter('localizeFilter', localizeFilter)
Vue.directive('tooltip', tooltipDirective) //can be called as 'v-tooltip' on views
Vue.use(Vuelidate)
Vue.use(VueMeta)
Vue.use(messagePlugin)
Vue.use(titlePlugin)
Vue.component('Loader', Loader)
Vue.component('Paginate', Paginate)

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
