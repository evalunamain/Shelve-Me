class AddIndexAndRemoveTokenFromFriendships < ActiveRecord::Migration
  def change
    remove_column :friendships, :activation_token, :string
    add_index :friendships, [:user_id, :friend_id], unique: true 
  end
end
