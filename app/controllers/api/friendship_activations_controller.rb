class Api::FriendshipActivationsController < ApplicationController
	before_action :require_log_in

  def create
    friendship = current_user.friendships.find(params[:friendship_id])
		inverse_friendship = Friendship.find_by({
			user_id: friendship.friend_id,
			friend_id: friendship.user_id
		})

		success = true

		Friendship.transaction do
			inverse_friendship.status = "accepted"
			success = inverse_friendship.save
			friendship.status = "accepted"
			success = success && friendship.save
		end

		if success
    	render json: nil
		else
			render json: friendship.errors.full_messages, status: :unprocessable_entity
  	end
	end
end
