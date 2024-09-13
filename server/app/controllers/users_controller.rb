class UsersController < ApplicationController
  include Response
  before_action :authenticate, only: %i(enrolled_courses)

  def enrolled_courses
    enrolled_courses = current_user.courses.as_json(
      include: %i(teacher category)
    )
    json_response(message: {courses: enrolled_courses}, status: :ok)
  end
end
