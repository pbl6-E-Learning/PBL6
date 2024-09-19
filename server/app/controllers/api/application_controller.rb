class Api::ApplicationController < ActionController::API
  def logged_in?
    !!current_user
  end

  def current_user
    return unless auth_present?

    account = Account.find_by(id: auth["payload"]["account"])
    @current_user ||= account&.user if account&.user
  end

  def authenticate
    return if logged_in?

    render json: {error: "unauthorized"}, status: :unauthorized
  end

  private

  def token
    request.headers["Authorization"]&.scan(/Bearer (.*)$/)&.flatten&.last
  end

  def auth
    Auth.decode(token) if token.present?
  end

  def auth_present?
    request.headers["Authorization"]&.match?(/Bearer/)
  end
end
