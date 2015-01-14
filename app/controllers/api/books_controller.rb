class Api::BooksController < ApplicationController
  before_action :require_log_in, only: [:create]
  before_action :ensure_owner, only: [:edit, :destroy]

  def index
    @books = Book.all
    render json: @books
  end

  def new
    @book ||= Book.new
    render json: @book
  end

  def create
	   @book = Book.find_by_isbn(params[:book][:isbn])

    if @book.save
      render json: @book
		else
      render json: @book.errors.full_messages, status: :unproccesable_entity
    end
  end

  def show
    @book = Book.includes(:shelved_books, :ratings).find(params[:id])
  end

  def edit
  end

  def update
  end

  def destroy
  end

  # private
  # def book_params
  #   params.require(:book).permit(:cover, :title, :author_id, :isbn)
  # end

  def ensure_owner
    unless current_user && current_user.id == params[:book][:user_id]
      redirect_to session_url
    end
  end
end
