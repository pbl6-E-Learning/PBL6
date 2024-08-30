class AuthenticationController < ApplicationController
  include Response

  def login
    account = Account.find_by(email: auth_params[:email])

    if account&.authenticate(auth_params[:password])
      jwt = Auth.issue(payload: {account: account.id})
      json_response(message: {jwt:, roles: account.roles}, status: :ok)
    else
      error_response(message: "Invalid email or password",
                     status: :unauthorized)
    end
  end

  private
  def auth_params
    params.require(:auth).permit(Account::VALID_ATTRIBUTES)
  end
end
