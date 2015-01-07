class AddDescriptionToBooks < ActiveRecord::Migration
  def change
    add_column :books, :description, :text, null: false
  end
end
