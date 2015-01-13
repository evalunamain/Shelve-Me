class Api::ShelvesController < ApplicationController
  def new

  end

  def create

  end

	def show
		@shelf = Shelf.includes(:books, :user).find(params[:id])
	end

  private
  def shelf_params
    params.require(:shelf).permit(:title)
  end
end
