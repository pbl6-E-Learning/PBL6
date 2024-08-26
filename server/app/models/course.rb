class Course < ApplicationRecord
  belongs_to :category
  belongs_to :teacher

  has_many :lessons, dependent: :destroy
end
