Rails.application.routes.draw do
  root to: "sessions#new"
  resources :users
  resource :session, only: [:new, :create, :destroy]
  resources :books
  resources :authors, only: [:show]
end
