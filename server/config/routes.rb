Rails.application.routes.draw do
  post "auth/login", to: "authentication#login"
  get "up" => "rails/health#show", as: :rails_health_check
end
