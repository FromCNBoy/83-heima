import Vue from 'vue'
import App from './App.vue'
import router from './permission'
import ElementUI from 'element-ui'
import Component from './components/index'
import axios from './utils/axios.config'
import 'element-ui/lib/theme-chalk/index.css'
import './styles/index.less'

Vue.prototype.$axios = axios
Vue.config.productionTip = false
Vue.use(ElementUI) // 全局注册elementUI
Vue.use(Component) // 全局注册插件
// Vue.use(axios)

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
