class Api::ShelvedBooksController < ApplicationController
	before_action :require_log_in
	
  def create
    shelf = current_user.shelves.find(params[:shelf_id])

    @shelved_book = shelf.shelved_books.new(book_id: params[:book_id])
    if @shelved_book.save
      render json: params
    else
     render json: params, status: :unprocessable_entity
    end
  end
	
	def destroy
    @shelved_book = ShelvedBook.find_by(shelved_book_params)
    if @shelved_book.destroy
      render json: params
    else
     render json: params, status: :unprocessable_entity
    end
	end
	
	private
	def shelved_book_params
		params.permit(:book_id, :shelf_id)
	end
	
end
