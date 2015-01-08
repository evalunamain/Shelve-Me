class FriendshipActivationsController < ApplicationController
  def edit
    friendship = Friendship.find_by({user_id: current_user.id})
    friendship.activate(params[:id])
    redirect_to user_url(current_user)
  end
end
