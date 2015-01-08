class ShelvesController < ApplicationController
  def new

  end

  def create
    
  end

  private
  def shelf_params
    params.require(:shelf).permit(:titl)
  end
end
