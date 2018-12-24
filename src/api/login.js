import request from '@/utils/request'

export function login(username, password) {
  return request({
    url: '/login/',
    method: 'post',
    data: {
      username,
      password
    }
  })
}

export function getInfo(username) {
  return request({
    url: '/users/' + username + '/',
    method: 'get'
  })
}

export function logout() {
  return request({
    url: '/login/',
    method: 'post'
  })
}
