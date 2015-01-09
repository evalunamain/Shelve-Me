class RootController < ApplicationController
  def index
    @books = Book.all
  end
end
