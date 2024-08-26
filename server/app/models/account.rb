class Account < ApplicationRecord
  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :validatable

  has_one :user, dependent: :destroy
  has_one :teacher, dependent: :destroy
  has_many :comments, dependent: :destroy
  has_many :follows, dependent: :destroy
end
