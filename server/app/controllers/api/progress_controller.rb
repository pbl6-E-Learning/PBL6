class Api::ProgressController < Api::ApplicationController
  before_action :authenticate

  def user_progress
    assignments = current_user.course_assignments.includes(:course)
    progress_data = calculate_progress assignments

    json_response(
      message: {
        progress: progress_data,
        assignment: assignments_as_json(assignments)
      },
      status: :ok
    )
  end

  private

  def calculate_progress assignments
    accepted_courses = filter_accepted_courses assignments
    accepted_courses.map{|assignment| progress_for_assignment(assignment)}
  end

  def filter_accepted_courses assignments
    assignments.accepted
  end

  def progress_for_assignment assignment
    course = assignment.course
    {
      course_title: course.title,
      total_lessons: total_lessons(course),
      in_progress: course.progresses.with_status(Settings.in_progress).count,
      completed: course.progresses.with_status(Settings.completed).count
    }
  end

  def total_lessons course
    course.lessons.count
  end

  def assignments_as_json assignments
    assignments.as_json(include: :course)
  end
end
