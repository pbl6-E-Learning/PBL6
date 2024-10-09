class Progress < ApplicationRecord
  belongs_to :user
  belongs_to :lesson
  enum status: {not_started: 0, in_progress: 1, completed: 2}
  validates :user_id, :lesson_id, presence: true
  scope :completed_by_user, lambda {|user_id|
    where(user_id:, completed: true)
  }
  scope :with_status, ->(status){where(status:)}
end
