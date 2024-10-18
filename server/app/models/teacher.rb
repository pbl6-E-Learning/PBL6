class Teacher < ApplicationRecord
  belongs_to :account

  has_many :courses, dependent: :destroy
  has_many :follows, dependent: :destroy
  has_many :followers, through: :follows, source: :user
  has_many :request_courses, dependent: :destroy
  delegate :email, to: :account

  def notify_followers_of_new_course course
    followers.each do |follower|
      UserMailer.with(user: follower, teacher: self,
                      course:).new_course_notification.deliver_later
    end
  end

  class << self
    def ransackable_attributes _auth_object = nil
      %w(name job_title bio created_at updated_at)
    end

    def self.ransackable_associations _auth_object = nil
      %w(account courses follows request_courses)
    end
  end
end
