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
