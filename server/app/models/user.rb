class User < ApplicationRecord
  belongs_to :account

  has_many :course_assignments, dependent: :destroy
  has_many :follows, dependent: :destroy

  enum sex: {male: 0, female: 1, other: 2}

  validates :full_name, presence: true,
                   length: {maximum: Settings.maximum_name_length}
  validates :sex, presence: true, inclusion: {in: sexes.keys}
end
