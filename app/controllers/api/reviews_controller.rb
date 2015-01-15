class Api::ReviewsController < ApplicationController
	def create
	end
	
	def update
	end
	
	private
	def review_params
		params.require(:review).permit(:book_id, :content)
	end
end
