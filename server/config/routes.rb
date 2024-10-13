Rails.application.routes.draw do
  namespace :api do
    post "auth/login", to: "authentication#login"
    post "auth/google_oauth2", to: "authentication#login_oauth_google"
    
    resources :courses, only: %i(show index) do
      post 'assign', on: :member
      collection do
        get 'search'
      end
    end

    get "up" => "rails/health#show", as: :rails_health_check

    resource :accounts, only: %i(create) do
      collection do
        post "forgot_password"
        put "reset_password/:token", to: "accounts#reset_password"
        get "activate/:token", to: "accounts#activate", as: "activate"
      end
    end

    resources :users do
      collection do
        get "profile", to: "users#show"
        patch  "update_profile", to: "users#update"
        get "enrolled_courses", to: "users#enrolled_courses"
      end
    end

    resources :categories, only: %i(index)
    resources :teachers, only: %i(show)

    resources :progress do
      collection do
        get "myprogress", to: "progress#user_progress"
      end
    end
    namespace :admin do
      resources :users, only: %i(index)
      resources :courses, only: %i(index destroy)
      resources :accounts do
        patch :update_status, on: :member
      end
    end
  end
end
