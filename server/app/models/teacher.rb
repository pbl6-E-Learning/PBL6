class Teacher < ApplicationRecord
  belongs_to :account

  has_many :courses, dependent: :destroy
  has_many :follows, dependent: :destroy
end
