module Api::Instructor
  class AccountsController < ApplicationController
    include Response

    def create
      account = create_account
      return if account.nil?

      teacher = create_teacher(account)
      return if teacher.nil?

      json_response(
        message: {
          account_id: account.id,
          teacher_id: teacher.id,
          email: account.email,
          created_at: account.created_at
        },
        status: :ok
      )
    end

    private

    def create_account
      account_params = account_params_from_request
      account = Account.new(account_params.merge(roles: :teacher))

      if account.save
        AccountMailer.account_activation(account).deliver_now
        account
      else
        error_response(
          message: "Không thể tạo account: " \
                   "#{account.errors.full_messages.join(', ')}",
          status: :unprocessable_entity
        )
        nil
      end
    end

    def create_teacher account
      teacher_params = teacher_params_from_request
      teacher = Teacher.new(teacher_params.merge(account_id: account.id))

      if teacher.save
        teacher
      else
        account.destroy
        error_response(
          message: "Không thể tạo teacher: " \
                   "#{teacher.errors.full_messages.join(', ')}",
          status: :unprocessable_entity
        )
        nil
      end
    end

    def account_params_from_request
      params.require(:account).permit(Account::VALID_ATTRIBUTES_ACCOUNT)
    end

    def teacher_params_from_request
      params.require(:teacher).permit(Account::VALID_ATTRIBUTES_TEACHER)
    end
  end
end
