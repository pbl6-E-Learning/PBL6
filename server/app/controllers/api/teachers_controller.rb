class Api::TeachersController < Api::ApplicationController
  authorize_resource
  include Response
  before_action :set_teacher, only: :show

  def show
    follower_count = Follow.count_for_teacher @teacher.id
    teacher_profile = @teacher.includes(courses: :category).as_json(
      include: {
        courses: {
          include: {
            category: {only: :name}
          }
        },
        account: {only: :email}
      }
    )

    json_response(
      message: {profile: teacher_profile, follower_count:}, status: :ok
    )
  end

  private

  def set_teacher
    @teacher = Teacher.find_by id: params[:id]
    return if @teacher

    error_response({message: "Teacher not found"}, :not_found)
  end
end
