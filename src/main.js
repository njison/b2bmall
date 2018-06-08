import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store/'
import VueLazyload from 'vue-lazyload'
import infiniteScroll from 'vue-infinite-scroll'
import VueCookie from 'vue-cookie'
import { userInfo } from './api'
import { getStore,removeStore } from '/utils/storage'
import ElementUI from 'element-ui';
/*Vue.prototype.$loading = Loading.service
Vue.prototype.$notify = Notification
Vue.prototype.$message = Message*/
Vue.use(ElementUI);
Vue.use(infiniteScroll)
Vue.use(VueCookie)
Vue.use(VueLazyload, {
  // preLoad: 1.3,
  // error: 'dist/error.png',
  loading: '/static/images/load.gif'
  // attempt: 1
})
Vue.config.productionTip = false
const whiteList = ['/home','/getBanner','/getPanel', '/getBrand', '/getVendor','/goods', '/login', '/register', '/goodsDetails', '/thanks', '/search', '/refreshsearch', '/refreshgoods' , '/cart'] // 不需要登陆的页面
router.beforeEach(function (to, from, next) {
  let params = {
      userToken: getStore('token')
  }
/*  userInfo(params).then(res => {
    if (res.result.state !== 1) { // 没登录
      if (whiteList.indexOf(to.path) !== -1) { // 白名单
        next()
      } else {
        nxt('/login')
      }
    } else {
      /!*store.commit('RECORD_USERINFO', {info: res.result})*!/
      store.commit('RECORD_USERINFO', {info: res})
      if (to.path === '/login') { //  跳转到
        next({path: '/'})
      }
      next()
    }
  })*/
  userInfo(params).then(res => {
    if (res.result.resultCode =="500") { // 没登录
      if (to.path == '/login') { //  跳转到
        next()
      } else {
        next('/login')
      }
    } else {
      store.commit('RECORD_USERINFO', {info: res.result})
      if (to.path == '/login') { //  跳转到
        next({path: '/'})
      }
      next()
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
