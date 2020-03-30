import api from '@utils/axios'

export const login = (loginId, password) => {
  return api({
    url: `/v1/cms/login/${loginId}`,
    method: 'put',
    data: {
      loginPasswordMD5: password
    }
  })
}

export const getDashboardData = () => {
  return api({
    url: '/v1/cms/dashboard',
    method: 'get',
    headers: {
      'Authorization': 'Bearer ' +localStorage.getItem('CmsJWT')
    }
  })
}

export const getDashboardDataByPeriod = (fromDate, toDate ) => {
  return api({
    url: '/v1/cms/dashboard',
    method: 'get',
    params: {
      fromDate,
      toDate
    },
    headers: {
      'Authorization': 'Bearer ' +localStorage.getItem('CmsJWT')
    }
  })
}

export const getBrokerList = () => {
  return api({
    url: '/v1/cms/brokerList',
    method: 'get',
    headers: {
      'Authorization': 'Bearer ' +localStorage.getItem('CmsJWT')
    }
  })
}

export const addBroker = data => {
  return api({
    url: '/v1/cms/broker',
    method: 'post',
    headers: {
      'Authorization': 'Bearer ' +localStorage.getItem('CmsJWT')
    },
    data
  })
}

export const updateBroker = data => {
  return api({
    url: '/v1/cms/broker',
    method: 'put',
    headers: {
      'Authorization': 'Bearer ' +localStorage.getItem('CmsJWT')
    },
    data
  })
}

export const getCompanyList = () => {
  return api({
    url: `/v1/broker/companyList`,
    method: 'get',
    headers: {
      'Authorization': 'Bearer ' +localStorage.getItem('CmsJWT')
    },
  })
}

export const getClosingRecordList = () => {
  return api({
    url: `/v1/cms/closingRecordList`,
    method: 'get',
    headers: {
      'Authorization': 'Bearer ' +localStorage.getItem('CmsJWT')
    },
  })
}

export const updateClosingRecordList = (closingRecordId, data) => {
  return api({
    url: `/v1/cms/closingRecord/${closingRecordId}`,
    method: 'put',
    headers: {
      'Authorization': 'Bearer ' +localStorage.getItem('CmsJWT')
    },
    data
  })
}

export const getGiftRecordList = () => {
  return api({
    url: `/v1/cms/giftRecordList`,
    method: 'get',
    headers: {
      'Authorization': 'Bearer ' +localStorage.getItem('CmsJWT')
    },
  })
}

export const createGiftRecord = (fileObj, date) => {
  let fd = new FormData()
  fd.append('giftImg', fileObj)
  fd.append('releaseDate', date)
  return api({
    url: `/v1/cms/giftRecord`,
    method: 'post',
    headers: {
      'Authorization': 'Bearer ' +localStorage.getItem('CmsJWT')
    },
    data: fd
  })
}

export const updateGiftRecord = (giftRecordId, fileObj, date) => {
  let fd = new FormData()
  fd.append('giftImg', fileObj)
  fd.append('releaseDate', date)
  return api({
    url: `/v1/cms/giftRecord/${giftRecordId}`,
    method: 'put',
    headers: {
      'Authorization': 'Bearer ' +localStorage.getItem('CmsJWT')
    },
    data: fd
  })
}

export const getTandC = (typeId) => {
  return api({
    url: `/v1/misc/termsAndConditions/${typeId}`,
    method: 'get'
  })
}

export const UpdateTandC = (typeId, data) => {
  return api({
    url: `/v1/cms/termsAndConditions/${typeId}`,
    method: 'put',
    headers: {
      'Authorization': 'Bearer ' +localStorage.getItem('CmsJWT')
    },
    data
  })
}

export const getSetting = () => {
  return api({
    url: `/v1/cms/setting`,
    method: 'get',
    headers: {
      'Authorization': 'Bearer ' +localStorage.getItem('CmsJWT')
    },
  })
}

export const createSeting = data => {
  return api({
    url: `/v1/cms/setting`,
    method: 'post',
    headers: {
      'Authorization': 'Bearer ' +localStorage.getItem('CmsJWT')
    },
    data
  })
}


