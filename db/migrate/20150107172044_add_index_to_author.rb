class AddIndexToAuthor < ActiveRecord::Migration
  def change
    add_index :authors, :name
  end
end
