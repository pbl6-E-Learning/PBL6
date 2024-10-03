class Api::CoursesController < Api::ApplicationController
  authorize_resource
  include Response
  before_action :set_course, only: %i(show assign)
  before_action :authenticate

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
    if @course.present?
      json_response(
        message: course_details,
        status: :ok
      )
    else
      error_response(message: "Course not found", status: :not_found)
    end
  end

  def assign
    return already_assigned if @course.assignment_exists_for_user?(current_user)

    course_assignment = create_course_assignment
    return assignment_failed unless course_assignment.save

    json_response(
      message: {
        course_id: @course.id,
        status: course_assignment.status
      },
      status: :ok
    )
  end

  private

  def set_course
    @course = Course.find_by(id: params[:id])
  end

  def course_details
    {
      course: course_with_lessons,
      is_assigned: is_assigned?,
      status: assignment_status
    }
  end

  def course_with_lessons
    @course.as_json(include: %i(lessons teacher category))
  end

  def is_assigned?
    course_assignment.present?
  end

  def assignment_status
    course_assignment&.status
  end

  def course_assignment
    @course_assignment ||= CourseAssignment.find_by(user_id: current_user.id,
                                                    course_id: @course.id)
  end

  def create_course_assignment
    current_user.course_assignments.create(course: @course, status: :pending)
  end

  def already_assigned
    error_response(
      message: {
        course_id: @course.id,
        status: :pending
      },
      status: :not_found
    )
  end

  def assignment_failed
    error_response(message: "Failed to assign course",
                   status: :unprocessable_entity)
  end
end
