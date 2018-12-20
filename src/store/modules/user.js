import { login, logout, getInfo } from '@/api/login'
import { getToken, setToken, removeToken } from '@/utils/auth'
import { Message, MessageBox } from 'element-ui'

const user = {
  state: {
    token: getToken(),
    name: '',
    avatar: '',
    roles: []
  },

  mutations: {
    SET_TOKEN: (state, token) => {
      state.token = token
      // console.log('* * * * store * * SET_TOKEN:', state.token)
    },
    SET_NAME: (state, name) => {
      state.name = name
      // console.log('* * * * store * * SET_NAME:', state.name)
    },
    SET_AVATAR: (state, avatar) => {
      state.avatar = avatar
    },
    SET_ROLES: (state, roles) => {
      state.roles = roles
      console.log('* * * * store * * SET_ROLES:', state.roles)
    }
  },

  actions: {
    // 登录
    Login({ commit }, userInfo) {
      const username = userInfo.username.trim()
      return new Promise((resolve, reject) => {
        // let token = 'MockToken'
        // setToken(token)
        // commit('SET_TOKEN', token)
        // resolve()
        login(username, userInfo.password).then(response => {
          console.log('* * * * store * * Login:', response)
          const data = response.data
          setToken(data.token)
          commit('SET_TOKEN', data.token)
          commit('SET_NAME', userInfo.username)
          resolve()
        }).catch(error => {
          console.log('* * * * store * * Login: 登录失败 ', error)
          Message({
            message: '登录失败 ' + error.message,
            type: 'error',
            duration: 5 * 1000
          })
          reject()
        })
      })
    },

    // 获取用户信息
    GetInfo({ commit, state }) {
      return new Promise((resolve, reject) => {
        // commit('SET_ROLES', 'admin')
        // commit('SET_NAME', 'admin')
        // commit('SET_AVATAR', '')
        // resolve()
        getInfo(state.token, state.name).then(response => {
          console.log('* * * * store * * GetInfo:', response)
          const data = response.data
          // if (data.roles && data.roles.length > 0) { // 验证返回的roles是否是一个非空数组
          //   commit('SET_ROLES', data.roles)
          // } else {
          //   reject('getInfo: roles must be a non-null array !')
          // }
          commit('SET_NAME', data.name)
          commit('SET_AVATAR', data.avatar)
          resolve(response)
        }).catch(error => {
          console.log('* * * * store * * GetInfo: 获取用户信息失败 ', error)
          Message({
            message: '获取用户信息失败 ' + error.message,
            type: 'error',
            duration: 5 * 1000
          })
          reject()
        })
      })
    },

    // 登出
    LogOut({ commit, state }) {
      return new Promise((resolve, reject) => {
        commit('SET_TOKEN', '')
        removeToken()
        resolve()
        // logout(state.token).then(() => {
        //   commit('SET_TOKEN', '')
        //   commit('SET_ROLES', [])
        //   removeToken()
        //   resolve()
        // }).catch(error => {
        //   reject(error)
        // })
      })
    },

    // 前端 登出
    FedLogOut({ commit }) {
      return new Promise(resolve => {
        commit('SET_TOKEN', '')
        removeToken()
        resolve()
      })
    }
  }
}

export default user
