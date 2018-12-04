import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store/'
import VueLazyload from 'vue-lazyload'
import infiniteScroll from 'vue-infinite-scroll'
import VueCookie from 'vue-cookie'
import { userInfo } from './api'
import { getStore, removeStore } from '/utils/storage'
import ElementUI from 'element-ui'
/*Vue.prototype.$loading = Loading.service
Vue.prototype.$notify = Notification
Vue.prototype.$message = Message*/
Vue.use(ElementUI)
Vue.use(infiniteScroll)
Vue.use(VueCookie)
Vue.use(VueLazyload, {
  // preLoad: 1.3,
  // error: 'dist/error.png',
  loading: './static/images/CMlogo1.png'
  // attempt: 1
})
Vue.config.productionTip = false
router.beforeEach(function (to, from, next) {
  let params = {
      userToken: getStore('token')
  }
  userInfo(params).then(res => {
    if (res && res.result.resultCode =="200") { // 登录了
      store.commit('RECORD_USERINFO', {info: res.result})
      if (to.path == '/login') { //  跳转到
        next({path: '/'})
      }
      next()
    } else {
      if (to.path == '/login') { //  跳转到
        next()
      } else {
        next('/login')
      }
    }
  })
})
/* eslint-disable no-new */
new Vue({
  el: '#app',
  store,
  router,
  render: h => h(App)
})
