class Api::Admin::CoursesController < Api::Admin::ApplicationController
  authorize_resource
  include Response

  def index
    @q = Course.ransack(params[:q])
    @pagy, @courses = pagy @q.result.includes(:category, :teacher)

    json_response(
      message: {
        courses: formatted_courses,
        pagy: pagy_res(@pagy)
      },
      status: :ok
    )
  end

  private

  def formatted_courses
    @courses.map do |course|
      course.as_json.merge(
        category: course.category,
        teacher: course.teacher,
        assignments_count: assignments_count(course)
      )
    end
  end

  def assignments_count course
    {
      pending: course.pending_count,
      accepted: course.accepted_count,
      rejected: course.rejected_count
    }
  end
end
