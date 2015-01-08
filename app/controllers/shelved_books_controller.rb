class ShelvedBooksController < ApplicationController
  def create
    shelf = current_user.shelves.first

    if (!shelf)
      shelf = current_user.shelves.new
    end

    @shelved_book = shelf.shelved_books.new(shelved_book_params)
    if @shelved_book.save
      redirect_to book_url(@shelved_book.book_id)
    else
      fail
    end
  end

  private
  def shelved_book_params
    params.require(:shelved_book).permit(:book_id)
  end
end
