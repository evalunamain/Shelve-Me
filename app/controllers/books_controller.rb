class BooksController < ApplicationController
  before_action :require_log_in, only: [:create]
  before_action :ensure_owner, only: [:edit, :destroy]

  def index
    @books = Book.all
  end

  def new
    @book ||= Book.new
  end

  def create
    @book = Book.find_by_isbn(params[:book][:isbn])

    # if !@book
    #   @book = Book.new
    #   fail
    #   # @book.errors.messages[:isbn] = ["Please enter a valid ISBN10"]
    #   render :new
    # els
    if @book.save
      redirect_to book_url(@book)
    else

      render :new
    end
  end

  def show
    @book = Book.find(params[:id])
    @author = Author.find(@book.author_id)
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
