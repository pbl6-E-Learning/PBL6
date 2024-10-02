class Api::CoursesController < Api::ApplicationController
  authorize_resource
  include Response
  before_action :set_course, only: :show

  def index
    courses_query = Course.by_category(params[:category_id])
                          .sorted_by(params[:sort])
                          .includes(:lessons, :teacher, :category)
    @pagy, courses = pagy(courses_query)

    json_response(
      message: {
        courses: courses.as_json(include: %i(lessons teacher category)),
        pagy: {
          count: @pagy.count,
          pages: @pagy.pages,
          current_page: @pagy.page,
          next_page: @pagy.next,
          prev_page: @pagy.prev
        }
      },
      status: :ok
    )
  end

  def show
    course_with_lessons = @course.as_json(include: %i(lessons teacher category))
    if @course.present?
      json_response(message: {course: course_with_lessons}, status: :ok)
    else
      error_response(message: "Course not found", status: :not_found)
    end
  end

  private

  def set_course
    @course = Course.find_by id: params[:id]
  end
end
