import axios from 'axios'

const config = {
  baseURL: 'https://insurance-api.heshecar.com',
  timeout: 10000,
  validateStatus: false
}

const api = axios.create(config)

api.interceptors.request.use(config => {
  config.headers['HSCInsuranceApiKey'] = 'cms'
  return config
})

export default api