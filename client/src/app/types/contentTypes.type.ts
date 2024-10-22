export type ContentType = {
  type: 'video' | 'flashcard' | 'kanji' | null
  url?: string
  flashCardContent?: []
  kanjiContent?: []
}
