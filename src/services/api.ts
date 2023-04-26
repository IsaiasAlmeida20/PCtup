import axios, { AxiosInstance } from 'axios'

const api: AxiosInstance = axios.create({
  baseURL: 'http://localhost:3333/api/v1',
  headers: {
    'Content-Type': 'application/json'
  }
})

export default api