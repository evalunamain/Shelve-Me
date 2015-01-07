class AddUserIdToBooks < ActiveRecord::Migration
  def change
    add_column :books, :submitter_id, :integer
  end
end
