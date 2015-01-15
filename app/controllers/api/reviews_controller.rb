class Api::ReviewsController < ApplicationController
	before_action :require_log_in
	def index
		@reviews = Review.all
		render json: @reviews
	end

	def create
		review = current_user.reviews.new(review_params)
		if review.save
			render json: nil
		else
			render json: params, status: 422
		end
	end

	def show
		@review = Review.includes(:author).find(params[:id])
	end

	def update
		review = Review.find(params[:id])
		if review.update
			render json: nil
		else
			render json: params, status: 422
		end
	end

	private
	def review_params
		params.require(:review).permit(:book_id, :content)
	end
end
