class RequestCourse < ApplicationRecord
  belongs_to :teacher
  belongs_to :category

  VALID_ATTRIBUTES = %i(category_id title level description image_url).freeze
  enum status: {pending: 0, approved: 1, rejected: 2}

  validates :title, presence: true
  validates :level, presence: true
  validates :description, presence: true
end
