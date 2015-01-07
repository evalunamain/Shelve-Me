class CreateAuthors < ActiveRecord::Migration
  def change
    create_table :authors do |t|
      t.text :name, presence: true

      t.timestamps
    end
  end
end
