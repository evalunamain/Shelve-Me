class Review < ActiveRecord::Base
	validates :user_id, :book_id, :content, presence: true
	validates :user_id, uniqueness: {:scope => :book_id, :message => "double reviews not allowed"}
end

