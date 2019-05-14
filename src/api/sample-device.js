import request from '@/utils/request'

/** DevSample */
export function getDevSampleList(params) {
  return request({
    url: '/devSamples/',
    method: 'get',
    params
  })
}
export function getDevSampleInfo(id) {
  return request({
    url: '/devSamples/' + id + '/',
    method: 'get'
  })
}
export function createDevSample(data) {
  return request({
    url: '/devSamples/',
    method: 'post',
    data
  })
}
export function updateDevSample(id, data) {
  return request({
    url: '/devSamples/' + id + '/',
    method: 'patch',
    data
  })
}
export function deleteDevSample(id) {
  return request({
    url: '/devSamples/' + id + '/',
    method: 'delete'
  })
}

/** DevPartSample */
export function getDevPartSampleList(params) {
  return request({
    url: '/devPartSamples/',
    method: 'get',
    params
  })
}
export function getDevPartSampleInfo(id) {
  return request({
    url: '/devPartSamples/' + id + '/',
    method: 'get'
  })
}
export function createDevPartSample(data) {
  return request({
    url: '/devPartSamples/',
    method: 'post',
    data
  })
}
export function updateDevPartSample(id, data) {
  return request({
    url: '/devPartSamples/' + id + '/',
    method: 'patch',
    data
  })
}
export function deleteDevPartSample(id) {
  return request({
    url: '/devPartSamples/' + id + '/',
    method: 'delete'
  })
}

/** FTIR **** **** **** **** **** **** **** **** **** **** **** **** **** **** **** **** */
/** devPartSampleFTIRs */
export function getDevPartSampleFTIRsList(params) {
  return request({
    url: '/devPartSampleFTIRs/',
    method: 'get',
    params
  })
}
export function getDevPartSampleFTIRsInfo(id) {
  return request({
    url: '/devPartSampleFTIRs/' + id + '/',
    method: 'get'
  })
}
export function createDevPartSampleFTIRs(data) {
  return request({
    url: '/devPartSampleFTIRs/',
    method: 'post',
    data
  })
}
export function updateDevPartSampleFTIRs(id, data) {
  return request({
    url: '/devPartSampleFTIRs/' + id + '/',
    method: 'patch',
    data
  })
}
export function deleteDevPartSampleFTIRs(id) {
  return request({
    url: '/devPartSampleFTIRs/' + id + '/',
    method: 'delete'
  })
}
/** devPartSampleFTIRTestFiles */
export function getDevPartSampleFTIRTestFilesList(params) {
  return request({
    url: '/devPartSampleFTIRTestFiles/',
    method: 'get',
    params
  })
}
export function getDevPartSampleFTIRTestFilesInfo(id) {
  return request({
    url: '/devPartSampleFTIRTestFiles/' + id + '/',
    method: 'get'
  })
}
export function createDevPartSampleFTIRTestFiles(data) {
  return request({
    url: '/devPartSampleFTIRTestFiles/',
    method: 'post',
    data
  })
}
export function updateDevPartSampleFTIRTestFiles(id, data) {
  return request({
    url: '/devPartSampleFTIRTestFiles/' + id + '/',
    method: 'patch',
    data
  })
}
export function deleteDevPartSampleFTIRTestFiles(id) {
  return request({
    url: '/devPartSampleFTIRTestFiles/' + id + '/',
    method: 'delete'
  })
}

/** Raman **** **** **** **** **** **** **** **** **** **** **** **** **** **** **** **** */
/** devPartSampleRamans */
export function getDevPartSampleRamansList(params) {
  return request({
    url: '/devPartSampleRamans/',
    method: 'get',
    params
  })
}
export function getDevPartSampleRamansInfo(id) {
  return request({
    url: '/devPartSampleRamans/' + id + '/',
    method: 'get'
  })
}
export function createDevPartSampleRamans(data) {
  return request({
    url: '/devPartSampleRamans/',
    method: 'post',
    data
  })
}
export function updateDevPartSampleRamans(id, data) {
  return request({
    url: '/devPartSampleRamans/' + id + '/',
    method: 'patch',
    data
  })
}
export function deleteDevPartSampleRamans(id) {
  return request({
    url: '/devPartSampleRamans/' + id + '/',
    method: 'delete'
  })
}
/** devPartSampleRamanTestFiles devPartRamanTestFiles */
export function getDevPartSampleRamanTestFilesList(params) {
  return request({
    url: '/devPartSampleRamanTestFiles/',
    method: 'get',
    params
  })
}
export function getDevPartSampleRamanTestFilesInfo(id) {
  return request({
    url: '/devPartSampleRamanTestFiles/' + id + '/',
    method: 'get'
  })
}
export function createDevPartSampleRamanTestFiles(data) {
  return request({
    url: '/devPartSampleRamanTestFiles/',
    method: 'post',
    data
  })
}
export function updateDevPartSampleRamanTestFiles(id, data) {
  return request({
    url: '/devPartSampleRamanTestFiles/' + id + '/',
    method: 'patch',
    data
  })
}
export function deleteDevPartSampleRamanTestFiles(id) {
  return request({
    url: '/devPartSampleRamanTestFiles/' + id + '/',
    method: 'delete'
  })
}

/** XRF **** **** **** **** **** **** **** **** **** **** **** **** **** **** **** **** */
/** devPartSampleXRFs */
export function getDevPartSampleXRFsList(params) {
  return request({
    url: '/devPartSampleXRFs/',
    method: 'get',
    params
  })
}
export function getDevPartSampleXRFsInfo(id) {
  return request({
    url: '/devPartSampleXRFs/' + id + '/',
    method: 'get'
  })
}
export function createDevPartSampleXRFs(data) {
  return request({
    url: '/devPartSampleXRFs/',
    method: 'post',
    data
  })
}
export function updateDevPartSampleXRFs(id, data) {
  return request({
    url: '/devPartSampleXRFs/' + id + '/',
    method: 'patch',
    data
  })
}
export function deleteDevPartSampleXRFs(id) {
  return request({
    url: '/devPartSampleXRFs/' + id + '/',
    method: 'delete'
  })
}
/** devPartSampleXRFTestFiles */
export function getDevPartSampleXRFTestFilesList(params) {
  return request({
    url: '/devPartSampleXRFTestFiles/',
    method: 'get',
    params
  })
}
export function getDevPartSampleXRFTestFilesInfo(id) {
  return request({
    url: '/devPartSampleXRFTestFiles/' + id + '/',
    method: 'get'
  })
}
export function createDevPartSampleXRFTestFiles(data) {
  return request({
    url: '/devPartSampleXRFTestFiles/',
    method: 'post',
    data
  })
}
export function updateDevPartSampleXRFTestFiles(id, data) {
  return request({
    url: '/devPartSampleXRFTestFiles/' + id + '/',
    method: 'patch',
    data
  })
}
export function deleteDevPartSampleXRFTestFiles(id) {
  return request({
    url: '/devPartSampleXRFTestFiles/' + id + '/',
    method: 'delete'
  })
}

/** IMG **** **** **** **** **** **** **** **** **** **** **** **** **** **** **** **** */
/** devShapeSamples  */
export function getDevShapeSamplesList(params) {
  return request({
    url: '/devShapeSamples/',
    method: 'get',
    params
  })
}
export function getDevShapeSamplesInfo(id) {
  return request({
    url: '/devShapeSamples/' + id + '/',
    method: 'get'
  })
}
export function createDevShapeSamples(data) {
  return request({
    url: '/devShapeSamples/',
    method: 'post',
    data
  })
}
export function updateDevShapeSamples(id, data) {
  return request({
    url: '/devShapeSamples/' + id + '/',
    method: 'patch',
    data
  })
}
export function deleteDevShapeSamples(id) {
  return request({
    url: '/devShapeSamples/' + id + '/',
    method: 'delete'
  })
}

/** oPartImgSamples */
export function getOPartImgSamplesList(params) {
  return request({
    url: '/oPartImgSamples/',
    method: 'get',
    params
  })
}
export function getOPartImgSamplesInfo(id) {
  return request({
    url: '/oPartImgSamples/' + id + '/',
    method: 'get'
  })
}
export function createOPartImgSamples(data) {
  return request({
    url: '/oPartImgSamples/',
    method: 'post',
    data
  })
}
export function updateOPartImgSamples(id, data) {
  return request({
    url: '/oPartImgSamples/' + id + '/',
    method: 'patch',
    data
  })
}
export function deleteOPartImgSamples(id) {
  return request({
    url: '/oPartImgSamples/' + id + '/',
    method: 'delete'
  })
}

/** nomSamplePicture */
export function nomSamplePicture(data) {
  return request({
    url: '/nomSamplePicture/',
    method: 'post',
    data
  })
}
