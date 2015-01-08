class CreateShelvedBooks < ActiveRecord::Migration
  def change
    create_table :shelved_books do |t|

      t.integer :shelf_id
      t.integer :book_id

      t.timestamps
    end

    add_index :shelved_books, :shelf_id
    add_index :shelved_books, :book_id
  end
end
