import request from '@/utils/request'

/** methodDetects */
export function getMethodDetectsList(params) {
  return request({
    url: '/methodDetects/',
    method: 'get',
    params
  })
}

export function getMethodDetectsInfo(id) {
  return request({
    url: '/methodDetects/' + id + '/',
    method: 'get'
  })
}

export function createMethodDetects(data) {
  return request({
    url: '/methodDetects/',
    method: 'post',
    data
  })
}

export function deleteMethodDetects(id) {
  return request({
    url: '/methodDetects/' + id + '/',
    method: 'delete'
  })
}

/** devDetects */
export function getDevDetectsList(params) {
  return request({
    url: '/devDetects/',
    method: 'get',
    params
  })
}

export function getDevDetectsInfo(id) {
  return request({
    url: '/devDetects/' + id + '/',
    method: 'get'
  })
}

export function createDevDetects(data) {
  return request({
    url: '/devDetects/',
    method: 'post',
    data
  })
}

export function deleteDevDetects(id) {
  return request({
    url: '/devDetects/' + id + '/',
    method: 'delete'
  })
}