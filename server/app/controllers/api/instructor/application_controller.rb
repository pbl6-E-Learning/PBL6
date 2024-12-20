class Api::Instructor::ApplicationController < Api::ApplicationController
  def current_teacher
    return unless auth_present?

    account = Account.find_by(id: auth["payload"]["account"])
    @current_user ||= account&.teacher if account&.teacher
  end
end
