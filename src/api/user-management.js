import request from '@/utils/request'

export function getList(params) {
  return request({
    url: '/users/',
    method: 'get',
    params
  })
}

export function getInfo(username) {
  return request({
    url: '/users/' + username + '/',
    method: 'get'
  })
}

export function createUser(data) {
  return request({
    url: '/users/',
    method: 'post',
    data
  })
}

export function updateUser(username, data) {
  return request({
    url: '/users/' + username + '/',
    method: 'patch',
    data
  })
}

export function deleteUser(username) {
  return request({
    url: '/users/' + username + '/',
    method: 'delete'
  })
}