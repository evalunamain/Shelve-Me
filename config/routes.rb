Rails.application.routes.draw do
  root to: "sessions#new"
  resources :users
  resource :session, only: [:new, :create, :destroy]
  resources :books
  resources :authors, only: [:show]
  resources :friendships, only: [:create, :destroy]
  resources :friendship_activations, only: [:edit]
  resources :shelves
  resources :shelved_books, only: [:create]
end
