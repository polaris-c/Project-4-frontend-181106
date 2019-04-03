import { login, logout, getInfo } from '@/api/login'
import { getToken, setToken, removeToken, getUserName, setUserName, removeUserName } from '@/utils/auth'
import { Message, MessageBox } from 'element-ui'

const user = {
  state: {
    token: getToken(),
    username: getUserName(),
    id: '',
    name: '',
    avatar: '',
    roles: [],
    role: 0
  },

  mutations: {
    SET_TOKEN: (state, token) => {
      state.token = token
      // console.log('* * * * store * * SET_TOKEN:', state.token)
    },
    SET_USERNAME: (state, username) => {
      state.username = username
      // console.log('* * * * store * * SET_NAME:', state.name)
    },
    SET_ID: (state, id) => {
      state.id = id
      // console.log('* * * * store * * SET_ID:', state.id)
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
      // console.log('* * * * store * * SET_ROLES:', state.roles)
    },
    SET_ROLE: (state, role) => {
      state.role = role
      console.log('* * * * store * * SET_ROLE:', state.role)
    }
  },

  actions: {
    // 登录
    Login({ commit }, userInfo) {
      const username = userInfo.username.trim()
      return new Promise((resolve, reject) => {
        login(username, userInfo.password).then(res => {
          console.log('* * * * store * * Login:', res)
          /** Cookies */
          setToken(res.token)
          setUserName(userInfo.username)
          /** Vuex store state*/
          commit('SET_TOKEN', res.token)
          commit('SET_USERNAME', userInfo.username)
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
        getInfo(state.username).then(res => {
          console.log('* * * * store * * GetInfo:', res)
          commit('SET_ID', res.id)
          commit('SET_NAME', res.name)
          commit('SET_ROLE', res.role)
          commit('SET_AVATAR', res.picUrl)
          resolve(res)
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
        removeUserName()
        console.log('* * * * store * * LogOut')
        resolve()
      })
    },

    // 前端 登出
    FedLogOut({ commit }) {
      return new Promise(resolve => {
        commit('SET_TOKEN', '')
        removeToken()
        removeUserName()
        console.log('* * * * store * * FedLogOut')
        resolve()
      })
    }
  }
}

export default user
