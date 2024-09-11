class Course < ApplicationRecord
  belongs_to :category
  belongs_to :teacher

  has_many :lessons, dependent: :destroy
  has_many :course_assignments, dependent: :destroy
  has_many :users, through: :course_assignments
end
