class AccountMailer < ApplicationMailer
  def account_activation account
    @account = account
    mail to: account.email, subject: "Kích hoạt tài khoản Return_E-Learning"
  end
end
