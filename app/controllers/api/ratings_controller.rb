class Api::RatingsController < ApplicationController
  before_action :require_log_in

  def create
    rating = current_user.ratings.new(rating_params)
    if rating.save
      render json: params
    else
      render json: params, status: 422
    end
  end

  def update
    rating = current_user.ratings.find(params[:id])

    if rating.update(rating_params)
      render json: params
    else
      render json: params, status: 422
    end
  end

  private
  def rating_params
    params.require(:rating).permit(:book_id, :rating)
  end

end
