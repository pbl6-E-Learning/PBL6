class Account < ApplicationRecord
  before_create :generate_activation_token
  VALID_ATTRIBUTES = %i(email password id_token).freeze
  VALID_ATTRIBUTES_ACCOUNT = %i(email password password_confirmation).freeze
  VALID_ATTRIBUTES_USER = %i(full_name sex).freeze
  enum roles: {user: 0, teacher: 1, admin: 2}

  mail_regex = Regexp.new(Settings.VALID_EMAIL_REGEX)
  validates :email, presence: true,
                    length: {maximum: Settings.email_max_length},
                    format: {with: mail_regex}
  validates :password, presence: true,
                    length: {minimum: Settings.min_password_length},
                    allow_nil: true

  has_secure_password
  has_one :user, dependent: :destroy
  has_one :teacher, dependent: :destroy
  has_many :comments, dependent: :destroy

  def generate_activation_token
    self.activation_token = SecureRandom.urlsafe_base64(10)
    self.activated = false
  end
end
