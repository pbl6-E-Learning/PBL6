import { Course } from './course'

export interface Category {
  id?: number
  name?: string
  description?: string
  created_at?: string
  updated_at?: string
  courses: Course[]
}