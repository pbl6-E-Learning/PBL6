class Teacher < ApplicationRecord
  belongs_to :account

  has_many :courses, dependent: :destroy
  has_many :follows, dependent: :destroy
  has_many :request_courses, dependent: :destroy

  class << self
    def ransackable_attributes _auth_object = nil
      %w(name job_title bio created_at updated_at)
    end
  end
end
