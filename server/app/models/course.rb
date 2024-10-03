class Course < ApplicationRecord
  belongs_to :category
  belongs_to :teacher

  has_many :lessons, dependent: :destroy
  has_many :course_assignments, dependent: :destroy
  has_many :users, through: :course_assignments

  scope :hot, (lambda do
    left_joins(:course_assignments)
      .group("courses.id")
      .order("COUNT(course_assignments.id) DESC")
  end)
  scope :newest, ->{order(created_at: :desc)}
  scope :oldest, ->{order(created_at: :asc)}
  scope :default_order, ->{order(:title)}
  scope :by_category, ->(category_id){where(category_id:)}
  scope :sorted_by, lambda {|sort_param|
    case sort_param
    when "new"
      newest
    when "oldest"
      oldest
    when "hot"
      hot
    else
      default_order
    end
  }

  def assignment_exists_for_user? user
    user.course_assignments.exists?(course_id: id)
  end
end
