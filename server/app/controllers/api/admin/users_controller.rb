class Api::Admin::UsersController < Api::Admin::ApplicationController
  authorize_resource
  include Response

  def index
    @q = User.ransack(params[:q])
    @pagy, @users = pagy @q.result(distinct: true)
                           .includes(:account)
                           .includes(:courses)
                           .activated
    json_response(
      message: {
        users: @users.as_json(include: {
                                account: {only: [:email, :created_at, :status]},
                                courses: {only: [:id, :name]}
                              }),
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
end
