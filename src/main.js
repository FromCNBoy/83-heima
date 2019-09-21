import Vue from 'vue'
import App from './App.vue'
import router from './permission'
import ElementUI from 'element-ui'
import Component from './components/index'
import axios from './utils/axios.config'
import 'element-ui/lib/theme-chalk/index.css'
import './styles/index.less'

axios.defaults.baseURL = 'http://ttapi.research.itcast.cn/mp/v1_0'
Vue.prototype.$axios = axios
Vue.config.productionTip = false
Vue.use(ElementUI)
Vue.use(Component)
Vue.use(axios)

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
