import axios from 'axios'
import { Message, MessageBox } from 'element-ui'
import store from '../store'
import { getToken } from '@/utils/auth'

// 创建axios实例
const service = axios.create({
  baseURL: process.env.BASE_API, // api 的 base_url
  timeout: 600 * 1000 // 请求超时时间
})

// request拦截器
service.interceptors.request.use(
  config => {
    console.log('\n ==== ==== Axios interceptors start <<<<')
    /** 让每个请求携带自定义token */
    if (store.getters.token) {
      config.headers['Authorization'] = 'JWT ' + getToken()
      // console.log('* * * * request JWT is OK: ', config.headers['Authorization'])
    }
    return config
  },
  error => {
    // Do something with request error
    console.log('* * * * request error: ', error)  // for debug
    Promise.reject(error)
  }
)

// response 拦截器
service.interceptors.response.use(
  response => {
    console.log('>>>> Axios interceptors Over ==== ==== \n ')
    return response.data
  },
  error => {
    console.log('* * * * response error: ', error) // for debug
    // Message({
    //   message: error.message,
    //   type: 'error',
    //   duration: 5 * 1000
    // })
    return Promise.reject(error)
  }
)

export default service
