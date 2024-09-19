class Api::CategoriesController < Api::ApplicationController
  include Response

  def index
    categories = Category.all

    json_response(
      message: categories.as_json(
        include: {
          courses: {
            include: :teacher
          }
        }
      ),
      status: :ok
    )
  end
end
