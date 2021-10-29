import Vue from 'vue'
import App from './App.vue'
const moment = require("moment");

Vue.config.productionTip = false

moment.locale("ru");

const app = new Vue({
  render: h => h(App)
})


app.$mount('#app')
