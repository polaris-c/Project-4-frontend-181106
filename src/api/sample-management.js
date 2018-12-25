import request from '@/utils/request'

/** ExplosiveSample */
export function getExplosiveSampleList(params) {
  return request({
    url: '/exploSamples/',
    method: 'get',
    params
  })
}
export function getExplosiveSampleInfo(id) {
  return request({
    url: '/exploSamples/' + id + '/',
    method: 'get'
  })
}
export function createExplosiveSample(data) {
  return request({
    url: '/exploSamples/',
    method: 'post',
    data
  })
}
export function updateExplosiveSample(id, data) {
  return request({
    url: '/exploSamples/' + id + '/',
    method: 'patch',
    data
  })
}
export function deleteExplosiveSample(id) {
  return request({
    url: '/exploSamples/' + id + '/',
    method: 'delete'
  })
}

/** exploSampleFTIRs  */
export function getExploSampleFTIRsList(params) {
  return request({
    url: '/exploSampleFTIRs/',
    method: 'get',
    params
  })
}
export function getExploSampleFTIRsInfo(id) {
  return request({
    url: '/exploSampleFTIRs/' + id + '/',
    method: 'get'
  })
}
export function createExploSampleFTIRs(data) {
  return request({
    url: '/exploSampleFTIRs/',
    method: 'post',
    data
  })
}
export function updateExploSampleFTIRs(id, data) {
  return request({
    url: '/exploSampleFTIRs/' + id + '/',
    method: 'patch',
    data
  })
}
export function deleteExploSampleFTIRs(id) {
  return request({
    url: '/exploSampleFTIRs/' + id + '/',
    method: 'delete'
  })
}

/** exploSampleFTIRTestFiles */
export function getExploSampleFTIRTestFilesList(params) {
  return request({
    url: '/exploSampleFTIRTestFiles/',
    method: 'get',
    params
  })
}
export function getExploSampleFTIRTestFilesInfo(id) {
  return request({
    url: '/exploSampleFTIRTestFiles/' + id + '/',
    method: 'get'
  })
}
export function createExploSampleFTIRTestFiles(data) {
  return request({
    url: '/exploSampleFTIRTestFiles/',
    method: 'post',
    data
  })
}
export function updateExploSampleFTIRTestFiles(id, data) {
  return request({
    url: '/exploSampleFTIRTestFiles/' + id + '/',
    method: 'patch',
    data
  })
}
export function deleteExploSampleFTIRTestFiles(id) {
  return request({
    url: '/exploSampleFTIRTestFiles/' + id + '/',
    method: 'delete'
  })
}