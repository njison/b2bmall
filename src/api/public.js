import axios from 'axios'
// import {Message} from 'element-ui'

axios.defaults.timeout = 10000
axios.defaults.headers.post['Content-Type'] = 'application/x-www=form-urlencoded,multipart/form-data,text/plain'
axios.defaults.withCredentials = true

// axios.defaults.baseURL = 'http://192.168.1.161:8080/ln-web/'
// axios.defaults.baseURL = 'http://192.168.1.144:8088/rims/'
// axios.defaults.baseURL = 'http://192.168.1.120:9083/ln-web/'
axios.defaults.baseURL = 'http://192.168.1.192:8080'

// 判断访问地址
// 生产
// if(window.location.href.indexOf('221.180.247.82')>-1){
//
//   axios.defaults.baseURL = 'http://221.180.247.82:80/rims/'
//
// }else if(window.location.href.indexOf('10.68.76.20')>-1){
// // 内网
//   axios.defaults.baseURL = 'http://10.68.76.20:8000/rims/'
//
// }else if(window.location.href.indexOf('192.168.1.112')>-1){
// // 测试
//   axios.defaults.baseURL = 'http://192.168.1.112:9000/ln-web/'
//
// }else if(window.location.href.indexOf('localhost:8080')>-1){
// // 本地
//   axios.defaults.baseURL = 'http://192.168.1.120:9083/ln-web/'
// }
// 判断访问地址 end
// axios.interceptors.response.use(data => {
//   return data
// }, err => {
//   if (err.status == 500) {
//     // Message.error({message: '服务器被吃了⊙﹏⊙∥'})
//   } else {
//     // Message.error({message: '未知错误!'})
//
//   }
//   return Promise.resolve(err)
// })

export default {
  fetchGet (url, params = {}) {
    return new Promise((resolve, reject) => {
      axios.get(url, params).then(res => {
        resolve(res.data)
      }).catch(error => {
        reject(error)
      })
    })
  },
  fetchQuickSearch (url) {
    return new Promise((resolve, reject) => {
      axios.get(url).then(res => {
        resolve(res.data)
      }).catch(error => {
        reject(error)
      })
    })
  },
  fetchPost (url, params = {}) {
    return new Promise((resolve, reject) => {
      axios.post(url, params).then(res => {
        resolve(res.data)
      }).catch(error => {
        reject(error)
      })
    })
  }
}
