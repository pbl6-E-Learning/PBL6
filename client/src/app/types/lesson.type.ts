import { Course } from './course.type'

export interface Lesson {
  id?: number
  course_id?: number
  title?: string
  content?: string
  video_url?: string
  created_at?: string
  updated_at?: string
  kanjis?: []
  flashcards?: []
  course?: Pick<Course, 'id' | 'teacher'>
  progresses?: [{ status: string }]
}
