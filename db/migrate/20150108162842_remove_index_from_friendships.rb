class RemoveIndexFromFriendships < ActiveRecord::Migration
  def change
    remove_index :friendships, column: ["user_id", "friend_id"]
  end
end
