class Api::ShelvedBooksController < ApplicationController
  def create
    shelf = Shelf.find_by(title: params[:shelved_book][:shelf])

    if (!shelf)
      shelf = current_user.shelves.new({title: params[:shelved_book][:shelf]})
			shelf.save
    end

    @shelved_book = shelf.shelved_books.new(book_id: params[:shelved_book][:book_id])
    if @shelved_book.save
      render json: params
    else
     render json: params, status: :unprocessable_entity
    end
  end

  private
  def shelved_book_params
    params.require(:shelved_book).permit(:book_id, :shelf)
  end
end
