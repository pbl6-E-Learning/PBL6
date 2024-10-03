class CourseAssignment < ApplicationRecord
  belongs_to :user
  belongs_to :course

  enum status: {pending: 0, accepted: 1, rejected: 2}

  scope :accepted, ->{where(status: :accepted)}
end
