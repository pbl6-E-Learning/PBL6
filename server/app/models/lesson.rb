class Lesson < ApplicationRecord
  belongs_to :course

  has_many :flashcards, dependent: :destroy
  has_many :kanjis, dependent: :destroy
  has_many :comments, dependent: :destroy
end
