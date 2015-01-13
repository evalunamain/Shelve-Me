class Api::FriendshipsController < ApplicationController
  before_action :require_log_in

  def create
    friendship = Friendship.new({
      user_id: current_user.id,
      friend_id: params[:friend_id],
      status: "pending"
    })

    inverse_friendship = Friendship.new({
      user_id: params[:friend_id],
      friend_id: current_user.id,
      status: "requested"
    })

    success = true
    Friendship.transaction do
      success = friendship.save
      success = inverse_friendship.save && success
    end

    if success
      render json: params
    else
      render json: friendship.errors.full_messages, status: :unprocessable_entity
    end

  end

  def destroy

    friendship = Friendship.find_by(friend_id: params[:friend_id], user_id: current_user.id)
    inv_friendship = Friendship.find_by(friend_id: current_user.id, user_id: params[:friend_id])

    success = true
    Friendship.transaction do
      success = friendship.destroy
      success = inv_friendship.destroy && success
    end

    if success
      render json: params
    else
      render json: friendship.errors.full_messages, status: :unprocessable_entity
    end
  end

end
