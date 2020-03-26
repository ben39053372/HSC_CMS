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

export const getDashboardData = (fromDate, toDate ) => {
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