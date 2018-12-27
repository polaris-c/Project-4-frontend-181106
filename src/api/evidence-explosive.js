import request from '@/utils/request'

/** ExplosiveEvi */
export function getExplosiveEviList(params) {
  return request({
    url: '/exploEvis/',
    method: 'get',
    params
  })
}
export function getExplosiveEviInfo(id) {
  return request({
    url: '/exploEvis/' + id + '/',
    method: 'get'
  })
}
export function createExplosiveEvi(data) {
  return request({
    url: '/exploEvis/',
    method: 'post',
    data
  })
}
export function updateExplosiveEvi(id, data) {
  return request({
    url: '/exploEvis/' + id + '/',
    method: 'patch',
    data
  })
}
export function deleteExplosiveEvi(id) {
  return request({
    url: '/exploEvis/' + id + '/',
    method: 'delete'
  })
}

/** FTIR **** **** **** **** **** **** **** **** **** **** **** **** **** **** **** **** */
/** exploEviFTIRs */
export function getExploEviFTIRsList(params) {
  return request({
    url: '/exploEviFTIRs/',
    method: 'get',
    params
  })
}
export function getExploEviFTIRsInfo(id) {
  return request({
    url: '/exploEviFTIRs/' + id + '/',
    method: 'get'
  })
}
export function createExploEviFTIRs(data) {
  return request({
    url: '/exploEviFTIRs/',
    method: 'post',
    data
  })
}
export function updateExploEviFTIRs(id, data) {
  return request({
    url: '/exploEviFTIRs/' + id + '/',
    method: 'patch',
    data
  })
}
export function deleteExploEviFTIRs(id) {
  return request({
    url: '/exploEviFTIRs/' + id + '/',
    method: 'delete'
  })
}
/** exploEviFTIRTestFiles */
export function getExploEviFTIRTestFilesList(params) {
  return request({
    url: '/exploEviFTIRTestFiles/',
    method: 'get',
    params
  })
}
export function getExploEviFTIRTestFilesInfo(id) {
  return request({
    url: '/exploEviFTIRTestFiles/' + id + '/',
    method: 'get'
  })
}
export function createExploEviFTIRTestFiles(data) {
  return request({
    url: '/exploEviFTIRTestFiles/',
    method: 'post',
    data
  })
}
export function updateExploEviFTIRTestFiles(id, data) {
  return request({
    url: '/exploEviFTIRTestFiles/' + id + '/',
    method: 'patch',
    data
  })
}
export function deleteExploEviFTIRTestFiles(id) {
  return request({
    url: '/exploEviFTIRTestFiles/' + id + '/',
    method: 'delete'
  })
}

/** Raman **** **** **** **** **** **** **** **** **** **** **** **** **** **** **** **** */
/** exploEviRamans */
export function getExploEviRamansList(params) {
  return request({
    url: '/exploEviRamans/',
    method: 'get',
    params
  })
}
export function getExploEviRamansInfo(id) {
  return request({
    url: '/exploEviRamans/' + id + '/',
    method: 'get'
  })
}
export function createExploEviRamans(data) {
  return request({
    url: '/exploEviRamans/',
    method: 'post',
    data
  })
}
export function updateExploEviRamans(id, data) {
  return request({
    url: '/exploEviRamans/' + id + '/',
    method: 'patch',
    data
  })
}
export function deleteExploEviRamans(id) {
  return request({
    url: '/exploEviRamans/' + id + '/',
    method: 'delete'
  })
}
/** exploEviRamanTestFiles */
export function getExploEviRamanTestFilesList(params) {
  return request({
    url: '/exploEviRamanTestFiles/',
    method: 'get',
    params
  })
}
export function getExploEviRamanTestFilesInfo(id) {
  return request({
    url: '/exploEviRamanTestFiles/' + id + '/',
    method: 'get'
  })
}
export function createExploEviRamanTestFiles(data) {
  return request({
    url: '/exploEviRamanTestFiles/',
    method: 'post',
    data
  })
}
export function updateExploEviRamanTestFiles(id, data) {
  return request({
    url: '/exploEviRamanTestFiles/' + id + '/',
    method: 'patch',
    data
  })
}
export function deleteExploEviRamanTestFiles(id) {
  return request({
    url: '/exploEviRamanTestFiles/' + id + '/',
    method: 'delete'
  })
}

/** XRD **** **** **** **** **** **** **** **** **** **** **** **** **** **** **** **** */
/** exploEviXRDs */
export function getExploEviXRDsList(params) {
  return request({
    url: '/exploEviXRDs/',
    method: 'get',
    params
  })
}
export function getExploEviXRDsInfo(id) {
  return request({
    url: '/exploEviXRDs/' + id + '/',
    method: 'get'
  })
}
export function createExploEviXRDs(data) {
  return request({
    url: '/exploEviXRDs/',
    method: 'post',
    data
  })
}
export function updateExploEviXRDs(id, data) {
  return request({
    url: '/exploEviXRDs/' + id + '/',
    method: 'patch',
    data
  })
}
export function deleteExploEviXRDs(id) {
  return request({
    url: '/exploEviXRDs/' + id + '/',
    method: 'delete'
  })
}
/** exploEviXRDTestFiles */
export function getExploEviXRDTestFilesList(params) {
  return request({
    url: '/exploEviXRDTestFiles/',
    method: 'get',
    params
  })
}
export function getExploEviXRDTestFilesInfo(id) {
  return request({
    url: '/exploEviXRDTestFiles/' + id + '/',
    method: 'get'
  })
}
export function createExploEviXRDTestFiles(data) {
  return request({
    url: '/exploEviXRDTestFiles/',
    method: 'post',
    data
  })
}
export function updateExploEviXRDTestFiles(id, data) {
  return request({
    url: '/exploEviXRDTestFiles/' + id + '/',
    method: 'patch',
    data
  })
}
export function deleteExploEviXRDTestFiles(id) {
  return request({
    url: '/exploEviXRDTestFiles/' + id + '/',
    method: 'delete'
  })
}

/** XRF **** **** **** **** **** **** **** **** **** **** **** **** **** **** **** **** */
/** exploEviXRFs */
export function getExploEviXRFsList(params) {
  return request({
    url: '/exploEviXRFs/',
    method: 'get',
    params
  })
}
export function getExploEviXRFsInfo(id) {
  return request({
    url: '/exploEviXRFs/' + id + '/',
    method: 'get'
  })
}
export function createExploEviXRFs(data) {
  return request({
    url: '/exploEviXRFs/',
    method: 'post',
    data
  })
}
export function updateExploEviXRFs(id, data) {
  return request({
    url: '/exploEviXRFs/' + id + '/',
    method: 'patch',
    data
  })
}
export function deleteExploEviXRFs(id) {
  return request({
    url: '/exploEviXRFs/' + id + '/',
    method: 'delete'
  })
}
/** exploEviXRFTestFiles */
export function getExploEviXRFTestFilesList(params) {
  return request({
    url: '/exploEviXRFTestFiles/',
    method: 'get',
    params
  })
}
export function getExploEviXRFTestFilesInfo(id) {
  return request({
    url: '/exploEviXRFTestFiles/' + id + '/',
    method: 'get'
  })
}
export function createExploEviXRFTestFiles(data) {
  return request({
    url: '/exploEviXRFTestFiles/',
    method: 'post',
    data
  })
}
export function updateExploEviXRFTestFiles(id, data) {
  return request({
    url: '/exploEviXRFTestFiles/' + id + '/',
    method: 'patch',
    data
  })
}
export function deleteExploEviXRFTestFiles(id) {
  return request({
    url: '/exploEviXRFTestFiles/' + id + '/',
    method: 'delete'
  })
}

/** GCMS **** **** **** **** **** **** **** **** **** **** **** **** **** **** **** **** */