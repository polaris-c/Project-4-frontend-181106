import request from '@/utils/request'

export function startMatch(data) {
  return request({
    url: '/startMatch/',
    method: 'post',
    data
  })
}
