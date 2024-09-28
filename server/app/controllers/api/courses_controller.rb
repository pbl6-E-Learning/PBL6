class Api::CoursesController < Api::ApplicationController
  include Response
  before_action :set_course, only: :show

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
