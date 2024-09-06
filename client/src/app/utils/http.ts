import axios, { AxiosInstance } from 'axios'
import { getCookie } from 'cookies-next'

class Http {
  instance: AxiosInstance
  constructor() {
    this.instance = axios.create({
      baseURL: process.env.BACKEND_URL,
      timeout: 120000,
      headers: {
        Authorization: `Bearer ${getCookie('authToken')}`,
        'Content-Type': 'application/json'
      }
    })
  }
}

const http = new Http().instance

export default http
