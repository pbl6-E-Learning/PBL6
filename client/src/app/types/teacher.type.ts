import { Course } from './course.type'

type resEmail = {
  email?: string
}
export interface Teacher {
  id?: number
  account_id?: number
  bio?: string
  image_url?: string
  experience?: string
  created_at?: string
  updated_at?: string
  job_title?: string
  name?: string
  courses?: Course[]
  account?: resEmail
}
