import axios, { AxiosInstance, AxiosResponse } from 'axios'
import { getCookie } from 'cookies-next'
import { useToast } from '../components/use-toast'

const useHttpClient = () => {
  const { toast } = useToast()

  // Tạo một instance axios với cấu hình mặc định
  const client: AxiosInstance = axios.create({
    baseURL: process.env.BACKEND_URL,
    headers: {
      'Content-Type': 'application/json'
    }
  })

  // Thêm token vào headers nếu có
  const authToken = getCookie('authToken')
  if (authToken) {
    client.defaults.headers.common['Authorization'] = `Bearer ${authToken}`
  }

  // Hàm GET request
  const get = async <T>(url: string, params?: Record<string, any>): Promise<T> => {
    try {
      const response: AxiosResponse<T> = await client.get(url, { params })
      return response.data
    } catch (error) {
      throw error
    }
  }

  // Hàm POST request
  const post = async <T>(url: string, data: any): Promise<T> => {
    try {
      const response: AxiosResponse<T> = await client.post(url, data)
      return response.data
    } catch (error) {
      throw error
    }
  }

  const put = async <T>(url: string, data: any): Promise<T> => {
    try {
      const response: AxiosResponse<T> = await client.put(url, data)
      return response.data
    } catch (error) {
      throw error
    }
  }

  // Hàm DELETE request
  const deleteRequest = async <T>(url: string): Promise<T> => {
    try {
      const response: AxiosResponse<T> = await client.delete(url)
      return response.data
    } catch (error) {
      throw error
    }
  }

  return { get, post, put, delete: deleteRequest }
}

export default useHttpClient
