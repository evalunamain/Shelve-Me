class Shelf < ActiveRecord::Base
  validates :user_id, :title, presence: true

  belongs_to :user
  has_many :shelved_books
  has_many :books, through: :shelved_books


end
