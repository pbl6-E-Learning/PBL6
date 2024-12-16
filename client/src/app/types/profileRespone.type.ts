import { Teacher } from './teacher.type'

export type ProfileResponse = {
  data: {
    message: {
      profile?: Teacher
    }
  }
}
