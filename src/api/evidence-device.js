import request from '@/utils/request'

/** devEvi */
export function getDevEviList(params) {
  return request({
    url: '/devEvis/',
    method: 'get',
    params
  })
}
export function getDevEviInfo(id) {
  return request({
    url: '/devEvis/' + id + '/',
    method: 'get'
  })
}
export function createDevEvi(data) {
  return request({
    url: '/devEvis/',
    method: 'post',
    data
  })
}
export function updateDevEvi(id, data) {
  return request({
    url: '/devEvis/' + id + '/',
    method: 'patch',
    data
  })
}
export function deleteDevEvi(id) {
  return request({
    url: '/devEvis/' + id + '/',
    method: 'delete'
  })
}

/** FTIR **** **** **** **** **** **** **** **** **** **** **** **** **** **** **** **** */
/** devEviFTIRs */
export function getDevEviFTIRsList(params) {
  return request({
    url: '/devEviFTIRs/',
    method: 'get',
    params
  })
}
export function getDevEviFTIRsInfo(id) {
  return request({
    url: '/devEviFTIRs/' + id + '/',
    method: 'get'
  })
}
export function createDevEviFTIRs(data) {
  return request({
    url: '/devEviFTIRs/',
    method: 'post',
    data
  })
}
export function updateDevEviFTIRs(id, data) {
  return request({
    url: '/devEviFTIRs/' + id + '/',
    method: 'patch',
    data
  })
}
export function deleteDevEviFTIRs(id) {
  return request({
    url: '/devEviFTIRs/' + id + '/',
    method: 'delete'
  })
}
/** devEviFTIRTestFiles */
export function getDevEviFTIRTestFilesList(params) {
  return request({
    url: '/devEviFTIRTestFiles/',
    method: 'get',
    params
  })
}
export function getDevEviFTIRTestFilesInfo(id) {
  return request({
    url: '/devEviFTIRTestFiles/' + id + '/',
    method: 'get'
  })
}
export function createDevEviFTIRTestFiles(data) {
  return request({
    url: '/devEviFTIRTestFiles/',
    method: 'post',
    data
  })
}
export function updateDevEviFTIRTestFiles(id, data) {
  return request({
    url: '/devEviFTIRTestFiles/' + id + '/',
    method: 'patch',
    data
  })
}
export function deleteDevEviFTIRTestFiles(id) {
  return request({
    url: '/devEviFTIRTestFiles/' + id + '/',
    method: 'delete'
  })
}

/** Raman **** **** **** **** **** **** **** **** **** **** **** **** **** **** **** **** */
/** devEviRamans */
export function getDevEviRamansList(params) {
  return request({
    url: '/devEviRamans/',
    method: 'get',
    params
  })
}
export function getDevEviRamansInfo(id) {
  return request({
    url: '/devEviRamans/' + id + '/',
    method: 'get'
  })
}
export function createDevEviRamans(data) {
  return request({
    url: '/devEviRamans/',
    method: 'post',
    data
  })
}
export function updateDevEviRamans(id, data) {
  return request({
    url: '/devEviRamans/' + id + '/',
    method: 'patch',
    data
  })
}
export function deleteDevEviRamans(id) {
  return request({
    url: '/devEviRamans/' + id + '/',
    method: 'delete'
  })
}
/** devEviRamanTestFiles  */
export function getDevEviRamanTestFilesList(params) {
  return request({
    url: '/devEviRamanTestFiles/',
    method: 'get',
    params
  })
}
export function getDevEviRamanTestFilesInfo(id) {
  return request({
    url: '/devEviRamanTestFiles/' + id + '/',
    method: 'get'
  })
}
export function createDevEviRamanTestFiles(data) {
  return request({
    url: '/devEviRamanTestFiles/',
    method: 'post',
    data
  })
}
export function updateDevEviRamanTestFiles(id, data) {
  return request({
    url: '/devEviRamanTestFiles/' + id + '/',
    method: 'patch',
    data
  })
}
export function deleteDevEviRamanTestFiles(id) {
  return request({
    url: '/devEviRamanTestFiles/' + id + '/',
    method: 'delete'
  })
}

/** XRF **** **** **** **** **** **** **** **** **** **** **** **** **** **** **** **** */
/** devEviXRFs */
export function getDevEviXRFsList(params) {
  return request({
    url: '/devEviXRFs/',
    method: 'get',
    params
  })
}
export function getDevEviXRFsInfo(id) {
  return request({
    url: '/devEviXRFs/' + id + '/',
    method: 'get'
  })
}
export function createDevEviXRFs(data) {
  return request({
    url: '/devEviXRFs/',
    method: 'post',
    data
  })
}
export function updateDevEviXRFs(id, data) {
  return request({
    url: '/devEviXRFs/' + id + '/',
    method: 'patch',
    data
  })
}
export function deleteDevEviXRFs(id) {
  return request({
    url: '/devEviXRFs/' + id + '/',
    method: 'delete'
  })
}
/** devEviXRFTestFiles */
export function getDevEviXRFTestFilesList(params) {
  return request({
    url: '/devEviXRFTestFiles/',
    method: 'get',
    params
  })
}
export function getDevEviXRFTestFilesInfo(id) {
  return request({
    url: '/devEviXRFTestFiles/' + id + '/',
    method: 'get'
  })
}
export function createDevEviXRFTestFiles(data) {
  return request({
    url: '/devEviXRFTestFiles/',
    method: 'post',
    data
  })
}
export function updateDevEviXRFTestFiles(id, data) {
  return request({
    url: '/devEviXRFTestFiles/' + id + '/',
    method: 'patch',
    data
  })
}
export function deleteDevEviXRFTestFiles(id) {
  return request({
    url: '/devEviXRFTestFiles/' + id + '/',
    method: 'delete'
  })
}

/** IMG **** **** **** **** **** **** **** **** **** **** **** **** **** **** **** **** */
/** devShapeEvis  */
export function getDevShapeEvisList(params) {
  return request({
    url: '/devShapeEvis/',
    method: 'get',
    params
  })
}
export function getDevShapeEvisInfo(id) {
  return request({
    url: '/devShapeEvis/' + id + '/',
    method: 'get'
  })
}
export function createDevShapeEvis(data) {
  return request({
    url: '/devShapeEvis/',
    method: 'post',
    data
  })
}
export function updateDevShapeEvis(id, data) {
  return request({
    url: '/devShapeEvis/' + id + '/',
    method: 'patch',
    data
  })
}
export function deleteDevShapeEvis(id) {
  return request({
    url: '/devShapeEvis/' + id + '/',
    method: 'delete'
  })
}

/** nomEviPicture */
export function nomEviPicture(data) {
  return request({
    url: '/nomEviPicture/',
    method: 'post',
    data
  })
}
