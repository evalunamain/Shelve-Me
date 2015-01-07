class CreateBooks < ActiveRecord::Migration
  def change
    create_table :books do |t|
      t.text :cover
      t.text :author
      t.text :title
      t.text :isbn

      t.timestamps
    end

    add_index :books, :title
    add_index :books, :author
    add_index :books, :isbn, unique: true
  end
end
