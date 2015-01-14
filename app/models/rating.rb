class Rating < ActiveRecord::Base
  validates :user_id, :book_id, :rating, presence: true
  validates :rating, :inclusion => {:in => [1,2,3,4,5]}
  validates :user_id, uniqueness: {:scope => :book_id, :message => "you rated this already"}

  belongs_to :user
  belongs_to :book
end
