class Lesson < ApplicationRecord
  belongs_to :course

  has_many :flashcards, dependent: :destroy
  has_many :kanjis, dependent: :destroy
  has_many :comments, dependent: :destroy
  has_many :progresses, dependent: :destroy
  has_many :users, through: :progresses
  scope :completed_by_user, lambda {|user_id|
    joins(:progresses).merge(Progress.completed_by_user(user_id))
  }
end
