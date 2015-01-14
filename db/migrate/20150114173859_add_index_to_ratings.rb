class AddIndexToRatings < ActiveRecord::Migration
  def change
    add_index :ratings, [:user_id, :book_id], unique: true
  end
end
