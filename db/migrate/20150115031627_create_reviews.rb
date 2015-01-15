class CreateReviews < ActiveRecord::Migration
  def change
    create_table :reviews do |t|
			t.integer :user_id, null: false
			t.integer :book_id, null: false
			t.text :content, null: false
      t.timestamps
    end
		
		add_index :reviews, :user_id
		add_index :reviews, :book_id
		add_index :reviews, [:book_id, :user_id], unique: true
  end
end
