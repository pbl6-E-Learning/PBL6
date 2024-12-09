class Api::CategoriesController < Api::ApplicationController
  authorize_resource
  include Response

  def index
    categories = Category.includes(courses: :teacher).all

    categories_with_ratings = format_categories_with_ratings(categories)

    json_response(
      message: categories_with_ratings,
      status: :ok
    )
  end

  private

  def format_categories_with_ratings categories
    categories.map do |category|
      category.as_json(
        include: {
          courses: {
            include: :teacher,
            methods: :average_rating
          }
        }
      )
    end
  end
end
