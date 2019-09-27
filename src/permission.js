import router from './router'
import nprogress from 'nprogress' // 引入模块
import 'nprogress/nprogress.css' // 引入css
router.beforeEach(function (to, from, next) {
  nprogress.start() // 开启进度条
  if (to.path.startsWith('/home')) {
    let token = window.localStorage.getItem('user-token')
    if (token) {
      next()
    } else {
      next('/login')
    }
  } else {
    next()
  }
})
// 全局后置守卫
router.afterEach(function () {
  // 关闭进度条
  nprogress.done()
})
export default router
