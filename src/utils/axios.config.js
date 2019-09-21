import axios from 'axios'
axios.interceptors.request.use(function (config) {
  let token = window.localStorage.getItem('user-token')
  config.headers['Authorization'] = `Bearer${token}`
  return config
}, function (error) {
  return Promise.reject(error)
})

export default axios
