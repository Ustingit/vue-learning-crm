import Vue from 'vue';
import App from './App.vue';
import Vuelidate from 'vuelidate'
import Paginate from 'vuejs-paginate'
import firebase from 'firebase/app';
import Loader from './components/app/Loader.vue'
import router from './router';
import store from './store';
import messagePlugin from './common/message.plugin'
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
Vue.use(messagePlugin)
Vue.component('Loader', Loader)
Vue.component('Paginate', Paginate)

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
