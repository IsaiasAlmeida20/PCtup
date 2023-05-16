import axios, { AxiosInstance } from 'axios'

const auth = localStorage.getItem('accessToken')

const api: AxiosInstance = axios.create({
  baseURL: 'https://pctup-api.onrender.com/api/v1',
  headers: {
    'Content-Type': 'application/json',
    Authorization: auth
  }
})

export default api