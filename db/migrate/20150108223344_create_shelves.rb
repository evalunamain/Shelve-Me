class CreateShelves < ActiveRecord::Migration
  def change
    create_table :shelves do |t|
      t.text :title, default: "to-read"
      t.integer :user_id
      t.integer :book_id
      t.timestamps
    end

    add_index :shelves, :user_id
    add_index :shelves, :title
    add_index :shelves, :book_id
  end
end
