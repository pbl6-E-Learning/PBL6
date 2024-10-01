Rails.application.routes.draw do
  namespace :api do
    post "auth/login", to: "authentication#login"
    post "auth/google_oauth2", to: "authentication#login_oauth_google"
    resources :courses, only: %i(show)
    get "up" => "rails/health#show", as: :rails_health_check
    post "accounts", to: "account#create", as: "create_account"
    get "activate/:token", to: "account#activate", as: "activate_user"
    resources :users do
      collection do
        get "profile", to: "users#show"
        patch  "update_profile", to: "users#update"
        get "enrolled_courses", to: "users#enrolled_courses"
      end
    end
    resource :accounts do
      collection do
        post "forgot_password", to: "account#forgot_password"
        put "reset_password/:token", to: "account#reset_password"
      end
    end
    resources :categories, only: %i(index)
    namespace :admin do
      resources :users, only: %i(index)
    end
    namespace :admin do
      resources :users, only: %i(index)
    end
  end
end
