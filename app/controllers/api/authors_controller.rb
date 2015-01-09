class Api::AuthorsController < ApplicationController

  def show
    @author = Author.includes(:books).find(params[:id])
  end
end
