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

/** FTIR **** **** **** **** **** **** **** **** **** **** **** **** **** **** **** **** */
/** exploSampleFTIRs */
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

/** Raman **** **** **** **** **** **** **** **** **** **** **** **** **** **** **** **** */
/** exploSampleRamans */
export function getExploSampleRamansList(params) {
  return request({
    url: '/exploSampleRamans/',
    method: 'get',
    params
  })
}
export function getExploSampleRamansInfo(id) {
  return request({
    url: '/exploSampleRamans/' + id + '/',
    method: 'get'
  })
}
export function createExploSampleRamans(data) {
  return request({
    url: '/exploSampleRamans/',
    method: 'post',
    data
  })
}
export function updateExploSampleRamans(id, data) {
  return request({
    url: '/exploSampleRamans/' + id + '/',
    method: 'patch',
    data
  })
}
export function deleteExploSampleRamans(id) {
  return request({
    url: '/exploSampleRamans/' + id + '/',
    method: 'delete'
  })
}
/** exploSampleRamanTestFiles */
export function getExploSampleRamanTestFilesList(params) {
  return request({
    url: '/exploSampleRamanTestFiles/',
    method: 'get',
    params
  })
}
export function getExploSampleRamanTestFilesInfo(id) {
  return request({
    url: '/exploSampleRamanTestFiles/' + id + '/',
    method: 'get'
  })
}
export function createExploSampleRamanTestFiles(data) {
  return request({
    url: '/exploSampleRamanTestFiles/',
    method: 'post',
    data
  })
}
export function updateExploSampleRamanTestFiles(id, data) {
  return request({
    url: '/exploSampleRamanTestFiles/' + id + '/',
    method: 'patch',
    data
  })
}
export function deleteExploSampleRamanTestFiles(id) {
  return request({
    url: '/exploSampleRamanTestFiles/' + id + '/',
    method: 'delete'
  })
}

/** XRD **** **** **** **** **** **** **** **** **** **** **** **** **** **** **** **** */
/** exploSampleXRDs */
export function getExploSampleXRDsList(params) {
  return request({
    url: '/exploSampleXRDs/',
    method: 'get',
    params
  })
}
export function getExploSampleXRDsInfo(id) {
  return request({
    url: '/exploSampleXRDs/' + id + '/',
    method: 'get'
  })
}
export function createExploSampleXRDs(data) {
  return request({
    url: '/exploSampleXRDs/',
    method: 'post',
    data
  })
}
export function updateExploSampleXRDs(id, data) {
  return request({
    url: '/exploSampleXRDs/' + id + '/',
    method: 'patch',
    data
  })
}
export function deleteExploSampleXRDs(id) {
  return request({
    url: '/exploSampleXRDs/' + id + '/',
    method: 'delete'
  })
}
/** exploSampleXRDTestFiles */
export function getExploSampleXRDTestFilesList(params) {
  return request({
    url: '/exploSampleXRDTestFiles/',
    method: 'get',
    params
  })
}
export function getExploSampleXRDTestFilesInfo(id) {
  return request({
    url: '/exploSampleXRDTestFiles/' + id + '/',
    method: 'get'
  })
}
export function createExploSampleXRDTestFiles(data) {
  return request({
    url: '/exploSampleXRDTestFiles/',
    method: 'post',
    data
  })
}
export function updateExploSampleXRDTestFiles(id, data) {
  return request({
    url: '/exploSampleXRDTestFiles/' + id + '/',
    method: 'patch',
    data
  })
}
export function deleteExploSampleXRDTestFiles(id) {
  return request({
    url: '/exploSampleXRDTestFiles/' + id + '/',
    method: 'delete'
  })
}

/** XRF **** **** **** **** **** **** **** **** **** **** **** **** **** **** **** **** */

/** GCMS **** **** **** **** **** **** **** **** **** **** **** **** **** **** **** **** */