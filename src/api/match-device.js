import request from '@/utils/request'

export function startMatch(data) {
  return request({
    url: '/startMatch/',
    method: 'post',
    data
  })
}

/** devMatchFTIR */
export function getDevMatchFTIRList(params) {
  return request({
    url: '/devMatchFTIRs/',
    method: 'get',
    params
  })
}
export function getDevMatchFTIRInfo(id) {
  return request({
    url: '/devMatchFTIRs/' + id + '/',
    method: 'get'
  })
}

/** devMatchRaman */
export function getDevMatchRamanList(params) {
  return request({
    url: '/devMatchRamans/',
    method: 'get',
    params
  })
}
export function getDevMatchRamanInfo(id) {
  return request({
    url: '/devMatchRamans/' + id + '/',
    method: 'get'
  })
}

/** devMatchXRF */
export function getDevMatchXRFList(params) {
  return request({
    url: '/devMatchXRFs/',
    method: 'get',
    params
  })
}
export function getDevMatchXRFInfo(id) {
  return request({
    url: '/devMatchXRFs/' + id + '/',
    method: 'get'
  })
}

/** devCompMatchs */
export function getDevCompMatchsList(params) {
  return request({
    url: '/devCompMatchs/',
    method: 'get',
    params
  })
}

export function getDevCompMatchsInfo(id) {
  return request({
    url: '/devCompMatchs/' + id + '/',
    method: 'get'
  })
}

export function updateDevCompMatchs(id, data) {
  return request({
    url: '/devCompMatchs/' + id + '/',
    method: 'put',
    data
  })
}

/** 电路版 */
/** devShapeMatchs */
export function getDevShapeMatchsList(params) {
  return request({
    url: '/devShapeMatchs/',
    method: 'get',
    params
  })
}
export function getDevShapeMatchsInfo(id) {
  return request({
    url: '/devShapeMatchs/' + id + '/',
    method: 'get'
  })
}
/** devShapeMultiMatchs */
export function getDevShapeMultiMatchsList(params) {
  return request({
    url: '/devShapeMultiMatchs/',
    method: 'get',
    params
  })
}
export function getDevShapeMultiMatchsInfo(id) {
  return request({
    url: '/devShapeMultiMatchs/' + id + '/',
    method: 'get'
  })
}
export function updateDevShapeMultiMatchs(id, data) {
  return request({
    url: '/devShapeMultiMatchs/' + id + '/',
    method: 'put',
    data
  })
}

/** 其他零件 */
/** oPartImgMatchs */
export function getOPartImgMatchsList(params) {
  return request({
    url: '/oPartImgMatchs/',
    method: 'get',
    params
  })
}
export function getOPartImgMatchsInfo(id) {
  return request({
    url: '/oPartImgMatchs/' + id + '/',
    method: 'get'
  })
}
/** oPartImgMultiMatch */
export function getOPartImgMultiMatchList(params) {
  return request({
    url: '/oPartImgMultiMatch/',
    method: 'get',
    params
  })
}
export function getOPartImgMultiMatchInfo(id) {
  return request({
    url: '/oPartImgMultiMatch/' + id + '/',
    method: 'get'
  })
}
export function updateOPartImgMultiMatch(id, data) {
  return request({
    url: '/oPartImgMultiMatch/' + id + '/',
    method: 'put',
    data
  })
}