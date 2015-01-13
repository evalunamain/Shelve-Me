class AddStatusToFriendships < ActiveRecord::Migration
  def change
    add_column :friendships, :status, :string, null: false
  end
end
