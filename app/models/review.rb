class Review < ActiveRecord::Base
	validates :user_id, :book_id, :content, presence: true
	validates :user_id, uniqueness: {:scope => :book_id, :message => "double reviews not allowed"}

	belongs_to :author, foreign_key: :user_id, class_name: "User"
	belongs_to :book
end
