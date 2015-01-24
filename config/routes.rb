ShelveMe::Application.routes.draw do
  root to: "root#index"

  namespace :api, defaults: { format: :json } do
    resources :books
    resources :authors, only: [:show]
    resources :users, only: [:index, :create, :show]
    resources :friendships, only: [:create] do
      delete 'destroy', on: :collection
    end
    resources :friendship_activations, only: [:create]
		resources :ratings, only: [:create, :update]
		resources :reviews, only: [:index, :create, :show, :update]
    resources :shelves
    resources :shelved_books, only: [:create] do
			delete 'destroy', on: :collection
		end
    resource :session, only: [:show, :create, :destroy]
  end
end
