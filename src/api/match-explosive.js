import request from '@/utils/request'

export function startMatch(data) {
  return request({
    url: '/startMatch/',
    method: 'post',
    data
  })
}

/** exploMatchFTIR */
export function getExploMatchFTIRList(params) {
  return request({
    url: '/exploMatchFTIRs/',
    method: 'get',
    params
  })
}
export function getExploMatchFTIRInfo(id) {
  return request({
    url: '/exploMatchFTIRs/' + id + '/',
    method: 'get'
  })
}

/** exploMatchRaman */
export function getExploMatchRamanList(params) {
  return request({
    url: '/exploMatchRamans/',
    method: 'get',
    params
  })
}
export function getExploMatchRamanInfo(id) {
  return request({
    url: '/exploMatchRamans/' + id + '/',
    method: 'get'
  })
}
