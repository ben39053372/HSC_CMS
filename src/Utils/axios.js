import axios from 'axios'

const api = axios.create({
  // setting
  baseURL: 'http://localhost:2222',
  timeoutL: 5000,
})

api.interceptors.request.use(
  config => {
    
  },
  error => {
    console.log(error)
    return Promise.reject(error)
  }
)