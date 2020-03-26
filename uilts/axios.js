import axios from 'axios'

const config = {
  baseUrl: 'https://insurance-api.heshecar.com',
  timeout: 10000,
}

const api = axios.create(config)

api.interceptors.request.use(config => {
  config.headers['HSCInsuranceApiKey'] = 'cms'
  return config
})

export default api