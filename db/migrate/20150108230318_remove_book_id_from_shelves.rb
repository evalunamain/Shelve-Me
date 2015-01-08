class RemoveBookIdFromShelves < ActiveRecord::Migration
  def change
    remove_column :shelves, :book_id, :integer
  end
end
