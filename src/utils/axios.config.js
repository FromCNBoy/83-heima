import axios from 'axios'
axios.defaults.baseURL = 'http://ttapi.research.itcast.cn/mp/v1_0' // 将地址的常态值设置给baseUrl
// 请求拦截  请求到达后台之前拦截
axios.interceptors.request.use(function (config) {
  let token = window.localStorage.getItem('user-token')
  config.headers['Authorization'] = `Bearer${token}`
  return config
}, function (error) {
  return Promise.reject(error)
})
// 响应拦截 响应数据 回来 到达then方法之前
axios.interceptors.response.use(function (response) {
  // 对响应数据做处理 执行成功时进入
  return response.data ? response.data : {}
}, function () {
  // 执行失败时执行
})
export default axios
