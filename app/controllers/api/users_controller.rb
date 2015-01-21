class Api::UsersController < ApplicationController

  def index
    @users = User.all
    render json: @users
  end

  def new
    @user ||= User.new
  end

  def create
    @user = User.new(user_params)

    if @user.save
      sign_in(@user)
      render :show
    else
      render json: @user.errors.full_messages, status: :unprocessable_entity
    end
  end

  def show
    @user = User.includes(:friendships, :books, :shelves, :reviews, :ratings).find(params[:id])
  end

  def edit
    @user = User.find(params[:id])
  end

  def update
    @user = User.find(params[:id])
    if @user.update(user_params)
    else
      render :edit
    end
  end

  def destroy
    @user = User.find(params[:id])
  end

  private
  def user_params
    params.require(:user).permit(:name, :email, :password)
  end
end
