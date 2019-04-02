import request from '@/utils/request'

/** userMessages */
export function getUserMessagesList(params) {
  return request({
    url: '/userMessages/',
    method: 'get',
    params
  })
}

export function getUserMessagesInfo(id) {
  return request({
    url: '/userMessages/' + id + '/',
    method: 'get'
  })
}

export function createUserMessages(data) {
  return request({
    url: '/userMessages/',
    method: 'post',
    data
  })
}

export function deleteUserMessages(id) {
  return request({
    url: '/userMessages/' + id + '/',
    method: 'delete'
  })
}

