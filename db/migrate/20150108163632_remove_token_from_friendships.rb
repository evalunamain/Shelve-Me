class RemoveTokenFromFriendships < ActiveRecord::Migration
  def change
    remove_column :friendships, :token, :string
    add_column :friendships, :activation_token, :string
  end
end
