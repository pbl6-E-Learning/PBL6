class Teacher < ApplicationRecord
  belongs_to :account

  has_many :courses, dependent: :destroy
  has_many :follows, dependent: :destroy
  has_many :request_courses, dependent: :destroy
  delegate :email, to: :account

  class << self
    def ransackable_attributes _auth_object = nil
      %w(name job_title bio created_at updated_at)
    end

    def self.ransackable_associations _auth_object = nil
      %w(account courses follows request_courses)
    end
  end
end
