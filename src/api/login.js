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

export function getInfo(token, username) {
  return request({
    url: '/users/' + username + '/',
    method: 'get',
    // data: {
    //   token,
    //   username
    // }
  })
}

export function logout() {
  return request({
    url: '/login/',
    method: 'post'
  })
}
