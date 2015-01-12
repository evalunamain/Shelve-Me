class Api::FriendshipActivationsController < ApplicationController
	before_action :require_log_in
	
  def create
    friendship = Friendship.find_by({
			friend_id: current_user.id, 
			id: params[:friendship_id]
		})
		
		if !friendship
			render json: nil, status: :unproccessable_entity
		elsif friendship.activate(params[:friendship_id])
    	render json: nil
		else
			render json: params, status: :unproccesable_entity
  	end
	end
end
