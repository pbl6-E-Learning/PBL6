class CoursesController < ApplicationController
  include Response
  before_action :set_course, only: :show

  def show
    if @course.present?
      json_response(message: {course: @course}, status: :ok)
    else
      error_response(message: "Course not found", status: :not_found)
    end
  end

  private

  def set_course
    @course = Course.find_by id: params[:id]
  end
end
