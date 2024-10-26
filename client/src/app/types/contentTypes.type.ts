import { Flashcard } from './flashcard.type'

export type ContentType = {
  type: 'video' | 'flashcard' | 'kanji' | null
  url?: string
  flashCardContent?: Flashcard[]
  kanjiContent?: []
}
