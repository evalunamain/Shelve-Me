class BooksController < ApplicationController
  before_action :ensure_owner, only: [:edit, :destroy]

  def new

  end

  def create
    @book = Book.new(book_params)
    if @book.save
      redirect_to book_url(@book)
    else
      render :new
    end
  end

  def show
  end

  def edit
  end

  def update
  end

  def destroy
  end

  private
  def book_params
    params.require(:book).permit(:cover, :title, :author_id, :isbn)
  end

  def ensure_owner
    unless current_user && current_user.id == params[:book][:user_id]
      redirect_to session_url
    end
  end
end
