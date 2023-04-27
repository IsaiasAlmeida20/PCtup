import axios, { AxiosInstance } from 'axios'

const auth = localStorage.getItem('accessToken')

const api: AxiosInstance = axios.create({
  baseURL: 'http://localhost:3333/api/v1',
  headers: {
    'Content-Type': 'application/json',
    Authorization: auth
  }
})

export default api