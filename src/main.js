import Vue from 'vue'
import App from './App.vue'
import router from './router'

import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';



import echarts from 'echarts'

import './assets/css/reset.css'
import $ from 'axios'

Vue.use(ElementUI);
Vue.prototype.$echarts = echarts

Vue.config.productionTip = false
Vue.prototype.$axios=$

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
