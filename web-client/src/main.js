import '@/plugins/vue-composition-api'
import '@/styles/styles.scss'
import 'fullcalendar/dist/fullcalendar.css'
import Vue from 'vue'
import App from './App.vue'
import vuetify from './plugins/vuetify'
import router from './router'
import store from './store'
import VueLoading from 'vue-loading-overlay';
import VueApexCharts from 'vue-apexcharts'
import FullCalendar from 'vue-full-calendar'
Vue.use(FullCalendar)
Vue.use(VueApexCharts)
Vue.component('apexchart', VueApexCharts)
import 'vue-loading-overlay/dist/vue-loading.css';
export const config = {
  headers: {
    Authorization: `Bearer ${localStorage.getItem('token')}`,
  },
}
export const adminConfig = {
  headers: {
    Authorization: `Bearer ${localStorage.getItem('adminToken')}`,
  },
}
export const policeConfig = {
  headers: {
    Authorization: `Bearer ${localStorage.getItem('policeToken')}`,
  },
}
Vue.config.productionTip = false
Vue.use(VueLoading)

new Vue({
  router,
  store,
  vuetify,
  render: h => h(App),
}).$mount('#app')
