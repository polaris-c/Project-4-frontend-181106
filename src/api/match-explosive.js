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

/** exploMatchXRD */
export function getExploMatchXRDList(params) {
  return request({
    url: '/exploMatchXRDs/',
    method: 'get',
    params
  })
}
export function getExploMatchXRDInfo(id) {
  return request({
    url: '/exploMatchXRDs/' + id + '/',
    method: 'get'
  })
}

/** exploMatchXRF */
export function getExploMatchXRFList(params) {
  return request({
    url: '/exploMatchXRFs/',
    method: 'get',
    params
  })
}
export function getExploMatchXRFInfo(id) {
  return request({
    url: '/exploMatchXRFs/' + id + '/',
    method: 'get'
  })
}

/** exploMatchGCMS */
export function getExploMatchGCMSList(params) {
  return request({
    url: '/exploMatchGCMSs/',
    method: 'get',
    params
  })
}
export function getExploMatchGCMSInfo(id) {
  return request({
    url: '/exploMatchGCMSs/' + id + '/',
    method: 'get'
  })
}

/** exploSynMatch */
export function getExploSynMatchList(params) {
  return request({
    url: '/exploSynMatchs/',
    method: 'get',
    params
  })
}

export function getExploSynMatchInfo(id) {
  return request({
    url: '/exploSynMatchs/' + id + '/',
    method: 'get'
  })
}

const check = {
  Check: true
}
export function updateExploSynMatch(id, data) {
  return request({
    url: '/exploSynMatchs/' + id + '/',
    method: 'put',
    data
  })
}

