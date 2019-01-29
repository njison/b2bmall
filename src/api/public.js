import axios from 'axios'
// import {Message} from 'element-ui'
axios.defaults.timeout = 10000
axios.defaults.headers.post['Content-Type'] = 'application/x-www=form-urlencoded'
axios.defaults.withCredentials = true
axios.defaults.baseURL = 'http://221.180.247.82:80/rims/'
// axios.defaults.baseURL = 'http://192.168.1.171:8089/ln-web/'
// axios.defaults.baseURL = 'http://192.168.1.112:9000/rims/'
// axios.defaults.baseURL = 'http://192.168.1.143:8080/rims/'
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
