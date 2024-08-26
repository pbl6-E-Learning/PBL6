class User < ApplicationRecord
  belongs_to :account

  has_many :course_assignments, dependent: :destroy
  has_many :follows, dependent: :destroy
end
