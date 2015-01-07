class Book < ActiveRecord::Base
  validates :title, :author_id, :isbn, presence: true

  
end
