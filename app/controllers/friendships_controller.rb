class FriendshipsController < ApplicationController
  def create
    friendship = Friendship.new({
      user_id: current_user.id,
      friend_id: params[:friendship][:friend_id]
    })

    inverse_friendship = Friendship.new({
      user_id: params[:friendship][:friend_id],
      friend_id: current_user.id
    })

    inverse_friendship.set_activation_token

    success = true
    Friendship.transaction do
      success = friendship.save
      success = inverse_friendship.save && success
    end

    if success
      redirect_to user_url(current_user)
    else
      fail
    end

  end

  def destroy
    
  end

  private
  def friendship_params
    {user_id: current_user.id, friend_id: params[:friendship][:friend_id]}
  end
end
